/* Math Canvas formula engine: parse, evaluate, differentiate and solve. No eval; the formula becomes a tree of closures. */
(function (root) {
'use strict';
const PI = Math.PI;
const CONST = { pi: PI, e: Math.E, tau: 2 * PI, phi: (1 + Math.sqrt(5)) / 2 };
const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const FUNCS = {
  sin: [1, Math.sin], cos: [1, Math.cos], tan: [1, Math.tan], asin: [1, Math.asin], acos: [1, Math.acos], atan: [1, Math.atan],
  sinh: [1, Math.sinh], cosh: [1, Math.cosh], tanh: [1, Math.tanh], exp: [1, Math.exp], ln: [1, Math.log], log: [1, Math.log10], log2: [1, Math.log2],
  sqrt: [1, Math.sqrt], cbrt: [1, Math.cbrt], abs: [1, Math.abs], floor: [1, Math.floor], ceil: [1, Math.ceil], round: [1, Math.round],
  sign: [1, Math.sign], fract: [1, (x) => x - Math.floor(x)],
  atan2: [2, Math.atan2], pow: [2, Math.pow], mod: [2, (a, b) => ((a % b) + b) % b], min: [2, Math.min], max: [2, Math.max], hypot: [2, Math.hypot], step: [2, (a, x) => (x < a ? 0 : 1)],
  clamp: [3, (x, a, b) => Math.min(b, Math.max(a, x))], mix: [3, (a, b, t) => a + (b - a) * t], smoothstep: [3, sstep],
};

/* ---- parser: text -> tree ---- */
function tokenize(src) {
  const out = []; let i = 0; const s = String(src);
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) { const m = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(s.slice(i)); if (!m) throw new Error('Bad number at position ' + (i + 1)); out.push({ k: 'n', v: parseFloat(m[0]), p: i }); i += m[0].length; continue; }
    if (/[A-Za-z_]/.test(ch)) { const m = /^[A-Za-z_][A-Za-z_0-9]*/.exec(s.slice(i)); out.push({ k: 'id', v: m[0], p: i }); i += m[0].length; continue; }
    if ('+-*/^%(),'.indexOf(ch) >= 0) { out.push({ k: ch, p: i }); i++; continue; }
    if (ch === '×' || ch === '·') { out.push({ k: '*', p: i }); i++; continue; }
    if (ch === '−') { out.push({ k: '-', p: i }); i++; continue; }
    if (ch === '÷') { out.push({ k: '/', p: i }); i++; continue; }
    throw new Error('Unexpected "' + ch + '" at position ' + (i + 1));
  }
  return out;
}
function parse(src, vars) {
  const tk = tokenize(src); let i = 0;
  const peek = () => tk[i], next = () => tk[i++];
  const fail = (msg, t) => { throw new Error(msg + (t ? ' at position ' + (t.p + 1) : ' at the end')); };
  function primary() {
    const t = next(); if (!t) fail('The formula ends too early');
    if (t.k === 'n') return { t: 'num', v: t.v };
    if (t.k === 'id') {
      const nm = t.v;
      if (FUNCS[nm] && peek() && peek().k === '(') {
        next(); const args = [];
        if (peek() && peek().k === ')') fail('"' + nm + '" needs a value inside the brackets', peek());
        for (;;) { args.push(expr()); const q = next(); if (!q) fail('Missing ")"'); if (q.k === ')') break; if (q.k !== ',') fail('Expected "," or ")"', q); }
        if (args.length !== FUNCS[nm][0]) fail('"' + nm + '" needs ' + FUNCS[nm][0] + ' value' + (FUNCS[nm][0] > 1 ? 's' : ''), t);
        return { t: 'call', f: nm, a: args };
      }
      if (FUNCS[nm]) fail('"' + nm + '" needs brackets, like ' + nm + '(x)', t);
      if (nm in CONST) return { t: 'num', v: CONST[nm], name: nm };
      if (vars.indexOf(nm) >= 0) return { t: 'var', n: nm };
      fail('Unknown name "' + nm + '". You can use ' + vars.join(', ') + ', pi, e and functions like sin(x)', t);
    }
    if (t.k === '(') { const e = expr(); const q = next(); if (!q || q.k !== ')') fail('Missing ")"', q); return e; }
    fail('Unexpected "' + t.k + '"', t);
  }
  function power() {
    const b = primary();
    if (peek() && peek().k === '^') { next(); const e = unary(); return { t: 'bin', o: '^', a: b, b: e }; }
    return b;
  }
  function unary() {
    if (peek() && peek().k === '-') { next(); return { t: 'neg', a: unary() }; }
    if (peek() && peek().k === '+') { next(); return unary(); }
    return power();
  }
  function term() {
    let a = unary();
    for (;;) {
      const t = peek(); if (!t) break;
      if (t.k === '*' || t.k === '/' || t.k === '%') { next(); a = { t: 'bin', o: t.k, a, b: unary() }; }
      else if (t.k === 'n' || t.k === 'id' || t.k === '(') { a = { t: 'bin', o: '*', a, b: unary() }; } /* 2x, 3(x+1), x sin(x) */
      else break;
    }
    return a;
  }
  function expr() {
    let a = term();
    for (;;) { const t = peek(); if (t && (t.k === '+' || t.k === '-')) { next(); a = { t: 'bin', o: t.k, a, b: term() }; } else break; }
    return a;
  }
  if (!tk.length) throw new Error('Type a formula, like sin(x) or x^2 - 3');
  const e = expr();
  if (i < tk.length) fail('Unexpected "' + (tk[i].k === 'n' ? tk[i].v : tk[i].k === 'id' ? tk[i].v : tk[i].k) + '"', tk[i]);
  return e;
}

/* ---- tree -> fast closure ---- */
function compileTree(n, vars) {
  switch (n.t) {
    case 'num': { const v = n.v; return () => v; }
    case 'var': { const k = vars.indexOf(n.n); return (a) => a[k]; }
    case 'neg': { const f = compileTree(n.a, vars); return (a) => -f(a); }
    case 'bin': {
      const f = compileTree(n.a, vars), g = compileTree(n.b, vars);
      switch (n.o) {
        case '+': return (a) => f(a) + g(a);
        case '-': return (a) => f(a) - g(a);
        case '*': return (a) => f(a) * g(a);
        case '/': return (a) => f(a) / g(a);
        case '%': return (a) => { const y = g(a); return ((f(a) % y) + y) % y; };
        default: return (a) => Math.pow(f(a), g(a));
      }
    }
    default: {
      const fn = FUNCS[n.f][1], as = n.a.map((q) => compileTree(q, vars));
      if (as.length === 1) { const f = as[0]; return (a) => fn(f(a)); }
      if (as.length === 2) { const f = as[0], g = as[1]; return (a) => fn(f(a), g(a)); }
      const f = as[0], g = as[1], h = as[2]; return (a) => fn(f(a), g(a), h(a));
    }
  }
}
function usesVar(n, name) {
  if (n.t === 'var') return n.n === name;
  if (n.t === 'num') return false;
  if (n.t === 'neg') return usesVar(n.a, name);
  if (n.t === 'bin') return usesVar(n.a, name) || usesVar(n.b, name);
  return n.a.some((q) => usesVar(q, name));
}
function compile(src, vars) {
  const tree = parse(src, vars), fn = compileTree(tree, vars);
  return { tree, fn, src, uses: (nm) => usesVar(tree, nm) };
}

/* ---- symbolic derivative ---- */
const N = (v) => ({ t: 'num', v });
const isNum = (n, v) => n.t === 'num' && (v === undefined || n.v === v);
function add(a, b) { if (isNum(a, 0)) return b; if (isNum(b, 0)) return a; if (isNum(a) && isNum(b)) return N(a.v + b.v); return { t: 'bin', o: '+', a, b }; }
function sub(a, b) { if (isNum(b, 0)) return a; if (isNum(a, 0)) return neg(b); if (isNum(a) && isNum(b)) return N(a.v - b.v); return { t: 'bin', o: '-', a, b }; }
function neg(a) { if (isNum(a)) return N(-a.v); if (a.t === 'neg') return a.a; return { t: 'neg', a }; }
function mul(a, b) { if (isNum(a, 0) || isNum(b, 0)) return N(0); if (isNum(a, 1)) return b; if (isNum(b, 1)) return a; if (isNum(a) && isNum(b)) return N(a.v * b.v); if (isNum(a, -1)) return neg(b); if (isNum(b, -1)) return neg(a); return { t: 'bin', o: '*', a, b }; }
function div(a, b) { if (isNum(a, 0)) return N(0); if (isNum(b, 1)) return a; return { t: 'bin', o: '/', a, b }; }
function pw(a, b) { if (isNum(b, 1)) return a; if (isNum(b, 0)) return N(1); return { t: 'bin', o: '^', a, b }; }
const call = (f, ...a) => ({ t: 'call', f, a });
function diff(n, v) {
  switch (n.t) {
    case 'num': return N(0);
    case 'var': return N(n.n === v ? 1 : 0);
    case 'neg': return neg(diff(n.a, v));
    case 'bin': {
      const a = n.a, b = n.b, da = diff(a, v), db = diff(b, v);
      switch (n.o) {
        case '+': return add(da, db);
        case '-': return sub(da, db);
        case '*': return add(mul(da, b), mul(a, db));
        case '/': return div(sub(mul(da, b), mul(a, db)), pw(b, N(2)));
        case '%': return da;
        default:
          if (isNum(b)) return mul(mul(b, pw(a, N(b.v - 1))), da);
          return mul(n, add(mul(db, call('ln', a)), div(mul(b, da), a)));
      }
    }
    default: {
      const a = n.a[0], da = diff(a, v);
      let d;
      switch (n.f) {
        case 'sin': d = call('cos', a); break;
        case 'cos': d = neg(call('sin', a)); break;
        case 'tan': d = div(N(1), pw(call('cos', a), N(2))); break;
        case 'asin': d = div(N(1), call('sqrt', sub(N(1), pw(a, N(2))))); break;
        case 'acos': d = neg(div(N(1), call('sqrt', sub(N(1), pw(a, N(2)))))); break;
        case 'atan': d = div(N(1), add(N(1), pw(a, N(2)))); break;
        case 'sinh': d = call('cosh', a); break;
        case 'cosh': d = call('sinh', a); break;
        case 'tanh': d = sub(N(1), pw(call('tanh', a), N(2))); break;
        case 'exp': d = n; break;
        case 'ln': d = div(N(1), a); break;
        case 'log': d = div(N(1), mul(a, N(Math.LN10))); break;
        case 'log2': d = div(N(1), mul(a, N(Math.LN2))); break;
        case 'sqrt': d = div(N(1), mul(N(2), n)); break;
        case 'cbrt': d = div(N(1), mul(N(3), pw(n, N(2)))); break;
        case 'abs': d = call('sign', a); break;
        case 'floor': case 'ceil': case 'round': case 'sign': case 'fract': d = n.f === 'fract' ? N(1) : N(0); break;
        case 'pow': return diff({ t: 'bin', o: '^', a: n.a[0], b: n.a[1] }, v);
        case 'hypot': { const b2 = n.a[1]; return div(add(mul(n.a[0], diff(n.a[0], v)), mul(b2, diff(b2, v))), n); }
        case 'min': case 'max': case 'atan2': case 'mod': case 'step': case 'clamp': case 'mix': case 'smoothstep': return null;
        default: return null;
      }
      return mul(d, da);
    }
  }
}
/* ---- tree -> text ---- */
const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 4 };
function show(n, parent) {
  parent = parent || 0; let s, p = 9;
  switch (n.t) {
    case 'num': s = n.name ? (n.name === 'pi' ? 'π' : n.name) : String(+n.v.toFixed(6)); if (n.v < 0 && !n.name) p = 3; break;
    case 'var': s = n.n; break;
    case 'neg': s = '−' + show(n.a, 3); p = 3; break;
    case 'bin': {
      p = PREC[n.o];
      const o = n.o === '*' ? ' · ' : n.o === '^' ? '' : ' ' + (n.o === '-' ? '−' : n.o) + ' ';
      if (n.o === '^') s = show(n.a, 5) + '<sup>' + show(n.b, 0) + '</sup>';
      else s = show(n.a, p) + o + show(n.b, p + (n.o === '-' || n.o === '/' ? 1 : 0));
      break;
    }
    default: s = n.f + '( ' + n.a.map((q) => show(q, 0)).join(', ') + ' )';
  }
  return p < parent ? '( ' + s + ' )' : s;
}

/* ---- numerical calculus ---- */
function simpson(f, a, b, n) {
  n = n || 400; if (n % 2) n++; const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
function roots(f, a, b, n) {
  n = n || 600; const out = []; let x0 = a, y0 = f(x0);
  for (let i = 1; i <= n; i++) {
    const x1 = a + (b - a) * i / n, y1 = f(x1);
    if (isFinite(y0) && isFinite(y1)) {
      if (y0 === 0) out.push(x0);
      else if (y0 * y1 < 0) {
        let lo = x0, hi = x1, flo = y0;
        for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2, fm = f(m); if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; } }
        out.push((lo + hi) / 2);
      }
    }
    x0 = x1; y0 = y1;
  }
  return out;
}
function numDeriv(f, x, h) { h = h || 1e-5; return (f(x + h) - f(x - h)) / (2 * h); }

root.MX = { compile, parse, diff, show, simpson, roots, numDeriv, FUNCS, CONST };
if (typeof module !== 'undefined') module.exports = root.MX;
})(typeof window !== 'undefined' ? window : globalThis);
