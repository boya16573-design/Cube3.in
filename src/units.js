/* Units and dimensional analysis. A safe recursive-descent parser: nothing is ever evaluated as JavaScript.
   Every quantity is stored in SI base units with a 7-number dimension vector [length, mass, time, current, temperature, amount, luminous intensity]. */
(function (root) {
'use strict';
const Z = [0, 0, 0, 0, 0, 0, 0];
const D = (l, m, t, i, k, n, j) => [l || 0, m || 0, t || 0, i || 0, k || 0, n || 0, j || 0];
const dimAdd = (a, b) => a.map((v, i) => v + b[i]), dimSub = (a, b) => a.map((v, i) => v - b[i]), dimMul = (a, k) => a.map((v) => v * k);
const dimEq = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9), dimZero = (a) => a.every((v) => Math.abs(v) < 1e-9);
/* exact table (checked before any prefix splitting) */
const U = {};
const def = (names, f, d, o) => names.split(' ').forEach((n) => { U[n] = Object.assign({ f, d }, o || {}); });
/* SI base and derived: these accept SI prefixes */
const PREF = { Y: 1e24, Z: 1e21, E: 1e18, P: 1e15, T: 1e12, G: 1e9, M: 1e6, k: 1e3, m: 1e-3, c: 1e-2, d: 1e-1, u: 1e-6, 'µ': 1e-6, n: 1e-9, p: 1e-12, f: 1e-15, a: 1e-18 };
const PFX = {};
def('m metre meter', 1, D(1)); PFX.m = 1;
def('g gram', 1e-3, D(0, 1)); PFX.g = 1;
def('s sec second', 1, D(0, 0, 1)); PFX.s = 1;
def('A amp ampere', 1, D(0, 0, 0, 1)); PFX.A = 1;
def('K kelvin', 1, D(0, 0, 0, 0, 1)); PFX.K = 1;
def('mol', 1, D(0, 0, 0, 0, 0, 1)); PFX.mol = 1;
def('cd', 1, D(0, 0, 0, 0, 0, 0, 1)); PFX.cd = 1;
def('N newton', 1, D(1, 1, -2)); PFX.N = 1;
def('J joule', 1, D(2, 1, -2)); PFX.J = 1;
def('W watt', 1, D(2, 1, -3)); PFX.W = 1;
def('Pa pascal', 1, D(-1, 1, -2)); PFX.Pa = 1;
def('Hz hertz', 1, D(0, 0, -1)); PFX.Hz = 1;
def('C coulomb', 1, D(0, 0, 1, 1)); PFX.C = 1;
def('V volt', 1, D(2, 1, -3, -1)); PFX.V = 1;
def('F farad', 1, D(-2, -1, 4, 2)); PFX.F = 1;
def('T tesla', 1, D(0, 1, -2, -1)); PFX.T = 1;
def('ohm Ω Ohm', 1, D(2, 1, -3, -2)); PFX.ohm = 1; PFX['Ω'] = 1;
def('eV', 1.602176634e-19, D(2, 1, -2)); PFX.eV = 1;
def('L l liter litre', 1e-3, D(3)); PFX.L = 1; PFX.l = 1;
def('W·h Wh', 3600, D(2, 1, -2));
/* non-prefixing units */
def('min minute', 60, D(0, 0, 1)); def('h hr hour', 3600, D(0, 0, 1)); def('d day', 86400, D(0, 0, 1)); def('yr year', 365.25 * 86400, D(0, 0, 1));
def('in inch', 0.0254, D(1)); def('ft foot feet', 0.3048, D(1)); def('yd yard', 0.9144, D(1)); def('mi mile', 1609.344, D(1)); def('nmi', 1852, D(1));
def('AU au', 149597870700, D(1)); def('ly', 9460730472580800, D(1));
def('lb lbs pound', 0.45359237, D(0, 1)); def('oz ounce', 0.028349523125, D(0, 1)); def('t tonne', 1000, D(0, 1));
def('bar', 1e5, D(-1, 1, -2)); def('atm', 101325, D(-1, 1, -2)); def('psi', 6894.757293168, D(-1, 1, -2)); def('mmHg torr', 133.322387415, D(-1, 1, -2));
def('mph', 0.44704, D(1, 0, -1)); def('kn knot knots', 1852 / 3600, D(1, 0, -1));
def('rad radian', 1, Z); def('deg degree degrees °', Math.PI / 180, Z); def('rev turn', 2 * Math.PI, Z);
def('lbf', 4.4482216152605, D(1, 1, -2));
def('degC °C celsius', 1, D(0, 0, 0, 0, 1), { off: 273.15 }); def('degF °F fahrenheit', 5 / 9, D(0, 0, 0, 0, 1), { off: 255.3722222222222 });
def('percent %', 0.01, Z);
function lookup(name) {
  if (U[name]) return U[name];
  for (let i = 1; i <= 1 && i < name.length; i++) { const p = name[0], rest = name.slice(1); if (PREF[p] !== undefined && PFX[rest] && U[rest]) return { f: U[rest].f * PREF[p], d: U[rest].d }; }
  if (name.length > 2 && name.startsWith('da')) return null;
  return null;
}
const SUP = { '²': '^2', '³': '^3', '⁻¹': '^-1', '⁻²': '^-2', '⁻³': '^-3', '¹': '^1', '⁴': '^4', '·': '*', '×': '*', '−': '-' };
const norm = (s) => String(s).replace(/⁻[¹²³]|[²³¹⁴·×−]/g, (m) => SUP[m] || m).replace(/\s+/g, ' ').trim();

/* unit expression: left-to-right * and /, ^ integer power, parentheses */
function parseUnit(str) {
  const s = norm(str); let i = 0; const err = (m) => { throw new Error(m); };
  const ws = () => { while (s[i] === ' ') i++; };
  function atom() {
    ws();
    if (s[i] === '(') { i++; const v = expr(); ws(); if (s[i] !== ')') err('Missing ")" in the unit "' + str + '"'); i++; return v; }
    if (s[i] === '1' && !/[0-9.]/.test(s[i + 1] || '')) { i++; return { f: 1, d: Z.slice() }; }
    const m = /^[A-Za-zµΩ°%][A-Za-z0-9µΩ°%]*/.exec(s.slice(i)); if (!m) err('Cannot read the unit "' + str + '" at "' + s.slice(i, i + 6) + '"');
    let name = m[0]; /* a trailing digit belongs to the exponent only if no unit has it; units here never end in digits */
    name = name.replace(/[0-9]+$/, '');
    i += name.length; const u = lookup(name); if (!u) err('Unknown unit "' + name + '"');
    return { f: u.f, d: u.d.slice(), off: u.off, name };
  }
  function term() {
    let a = atom(); ws();
    if (s[i] === '^') { i++; ws(); const m = /^[+-]?[0-9]+(\.[0-9]+)?/.exec(s.slice(i)); if (!m) err('Missing exponent in "' + str + '"'); i += m[0].length; const p = +m[0]; a = { f: Math.pow(a.f, p), d: dimMul(a.d, p), off: undefined, comp: true }; }
    return a;
  }
  function expr() {
    let a = term(); ws();
    while (s[i] === '*' || s[i] === '/' || (s[i] && s[i] !== ')' && /[A-Za-zµΩ°%(]/.test(s[i]))) {
      let op = '*'; if (s[i] === '*' || s[i] === '/') { op = s[i]; i++; }
      const b = term(); if (a.off || b.off) err('Temperature units like °C can only be used alone, not combined with other units');
      a = op === '*' ? { f: a.f * b.f, d: dimAdd(a.d, b.d) } : { f: a.f / b.f, d: dimSub(a.d, b.d) }; ws();
    }
    return a;
  }
  ws(); const r = expr(); ws(); if (i < s.length) err('Cannot read "' + s.slice(i) + '" in the unit "' + str + '"');
  return { f: r.f, d: r.d, off: r.off };
}
function parseQuantity(str, expect) {
  const s = norm(str); const m = /^\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s*(.*)$/.exec(s);
  if (!m) throw new Error('Expected a number, like 20 or 9.81 m/s^2, but found "' + str + '"');
  const num = +m[1], ustr = m[2].trim();
  if (!ustr) { if (expect) return { v: num, d: expect.d.slice(), assumed: true, unit: expect.unit, text: num + ' ' + expect.unit }; return { v: num, d: Z.slice(), assumed: false, unit: '', text: String(num) }; }
  const u = parseUnit(ustr); const v = u.off !== undefined ? num * u.f + u.off : num * u.f;
  if (expect && !dimEq(u.d, expect.d)) throw new Error('"' + str + '" has dimension ' + dimName(u.d) + ', but a ' + dimName(expect.d) + ' is needed here');
  return { v, d: u.d, assumed: false, unit: ustr, text: num + ' ' + ustr };
}
function fromSI(v, ustr) { const u = parseUnit(ustr); return u.off !== undefined ? (v - u.off) / u.f : v / u.f; }
function convert(value, from, to) { const a = parseUnit(from), b = parseUnit(to); if (!dimEq(a.d, b.d)) throw new Error('Cannot convert ' + from + ' (' + dimName(a.d) + ') to ' + to + ' (' + dimName(b.d) + ')'); const si = a.off !== undefined ? value * a.f + a.off : value * a.f; return b.off !== undefined ? (si - b.off) / b.f : si / b.f; }
const NAMED = [
  ['dimensionless', Z], ['length', D(1)], ['mass', D(0, 1)], ['time', D(0, 0, 1)], ['current', D(0, 0, 0, 1)], ['temperature', D(0, 0, 0, 0, 1)], ['amount', D(0, 0, 0, 0, 0, 1)],
  ['area', D(2)], ['volume', D(3)], ['velocity', D(1, 0, -1)], ['acceleration', D(1, 0, -2)], ['force', D(1, 1, -2)], ['energy', D(2, 1, -2)], ['power', D(2, 1, -3)], ['pressure', D(-1, 1, -2)],
  ['frequency', D(0, 0, -1)], ['charge', D(0, 0, 1, 1)], ['voltage', D(2, 1, -3, -1)], ['capacitance', D(-2, -1, 4, 2)], ['magnetic field', D(0, 1, -2, -1)], ['resistance', D(2, 1, -3, -2)],
  ['momentum', D(1, 1, -1)], ['angular momentum', D(2, 1, -1)], ['density', D(-3, 1)], ['moment of inertia', D(2, 1)], ['electric field', D(1, 1, -3, -1)],
];
const SYM = [['N', D(1, 1, -2)], ['J', D(2, 1, -2)], ['W', D(2, 1, -3)], ['Pa', D(-1, 1, -2)], ['Hz', D(0, 0, -1)], ['C', D(0, 0, 1, 1)], ['V', D(2, 1, -3, -1)], ['F', D(-2, -1, 4, 2)], ['T', D(0, 1, -2, -1)], ['Ω', D(2, 1, -3, -2)]];
function dimName(d) { for (const [n, v] of NAMED) if (dimEq(d, v)) return n; return dimStr(d); }
const BASE = ['m', 'kg', 's', 'A', 'K', 'mol', 'cd'], SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '.': '·' };
const sup = (p) => (Math.abs(p - 1) < 1e-9 ? '' : String(+p.toFixed(3)).split('').map((c) => SUPS[c] || c).join(''));
function dimStr(d) { const n = d.map((p, i) => [p, i]).filter(([p]) => Math.abs(p) > 1e-9).map(([p, i]) => BASE[i] + sup(p)); return n.length ? n.join('·') : '1'; }
function unitOf(d) { for (const [s, v] of SYM) if (dimEq(d, v)) return s; return dimStr(d); }
function tokenize(src) {
  const s = norm(src), out = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ') { i++; continue; }
    let m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(s.slice(i)); if (m) { out.push({ k: 'num', v: +m[0] }); i += m[0].length; continue; }
    m = /^[A-Za-zµΩ°%][A-Za-z0-9_µΩ°%]*/.exec(s.slice(i)); if (m) { out.push({ k: 'id', v: m[0] }); i += m[0].length; continue; }
    if ('+-*/^(),'.includes(c)) { out.push({ k: c }); i++; continue; }
    throw new Error('Unexpected "' + c + '"');
  }
  return out;
}
function constQuantity(id) { const C = root.CONSTS; if (!C || !C.BY[id]) return null; const c = C.BY[id]; let d = Z.slice(), f = 1; if (c.unit) { try { const u = parseUnit(c.unit); d = u.d; f = u.f; } catch (e) { return null; } } return { v: c.v * f, d, name: id }; }
function calc(src) {
  let text = String(src).trim(), target = null; const mm = /\s+in\s+(.+)$/i.exec(text); if (mm) { target = mm[1].trim(); text = text.slice(0, mm.index); }
  const T = tokenize(text); let p = 0; const peek = () => T[p], nxt = () => T[p++]; const fail = (m) => { throw new Error(m); };
  const Q = (v, d) => ({ v, d: d || Z.slice() });
  const FN = { sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, exp: Math.exp, ln: Math.log, log: Math.log10, sqrt: Math.sqrt, abs: Math.abs, sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh };
  function expr() { let a = term(); while (peek() && (peek().k === '+' || peek().k === '-')) { const op = nxt().k, b = term(); if (!dimEq(a.d, b.d)) fail('Cannot ' + (op === '+' ? 'add' : 'subtract') + ' ' + dimName(a.d) + ' and ' + dimName(b.d) + ': the units do not match'); a = Q(op === '+' ? a.v + b.v : a.v - b.v, a.d); } return a; }
  function term() { let a = juxt(); for (;;) { const t = peek(); if (t && (t.k === '*' || t.k === '/')) { nxt(); const b = juxt(); a = t.k === '*' ? Q(a.v * b.v, dimAdd(a.d, b.d)) : Q(a.v / b.v, dimSub(a.d, b.d)); } else break; } return a; }
  function juxt() { let a = unary(); for (;;) { const t = peek(); if (t && (t.k === 'num' || t.k === 'id' || t.k === '(')) { const b = power(); a = Q(a.v * b.v, dimAdd(a.d, b.d)); } else break; } return a; }
  function unary() { const t = peek(); if (t && t.k === '-') { nxt(); const a = unary(); return Q(-a.v, a.d); } if (t && t.k === '+') { nxt(); return unary(); } return power(); }
  function power() { const a = atom(); if (peek() && peek().k === '^') { nxt(); const e = unary(); if (!dimZero(e.d)) fail('An exponent must be a plain number'); if (!dimZero(a.d) && !Number.isInteger(e.v) && Math.abs(e.v * 2 - Math.round(e.v * 2)) > 1e-9) fail('Fractional powers of quantities with units are only supported as halves'); return Q(Math.pow(a.v, e.v), dimMul(a.d, e.v)); } return a; }
  function atom() {
    const t = nxt(); if (!t) fail('The expression ends too early');
    if (t.k === 'num') return Q(t.v);
    if (t.k === '(') { const v = expr(); if (!peek() || nxt().k !== ')') fail('Missing ")"'); return v; }
    if (t.k === 'id') {
      const id = t.v;
      if (FN[id] && peek() && peek().k === '(') { nxt(); const a = expr(); if (!peek() || nxt().k !== ')') fail('Missing ")" after ' + id); if (id === 'sqrt') return Q(Math.sqrt(a.v), dimMul(a.d, 0.5)); if (id === 'abs') return Q(Math.abs(a.v), a.d); if (!dimZero(a.d)) fail(id + '() needs a plain number or an angle, but got ' + dimName(a.d)); return Q(FN[id](a.v)); }
      if (id === 'pi') return Q(Math.PI); if (id === 'e' && !lookup('e')) return Q(Math.E);
      const cq = constQuantity(id); if (cq && !lookup(id)) return Q(cq.v, cq.d);
      let u; try { u = parseUnit(id); } catch (e) { fail('Unknown name "' + id + '". Use a unit (m, kg, s, N…), a constant (pi, phi, alpha, cLight…) or a function like sqrt()'); }
      if (u.off !== undefined) fail('Write temperatures as a number then the unit, such as 25 degC, not inside a formula');
      return Q(u.f, u.d);
    }
    fail('Unexpected "' + t.k + '"');
  }
  const r = expr(); if (p < T.length) fail('Cannot read the expression near "' + (T[p].v !== undefined ? T[p].v : T[p].k) + '"');
  const out = { ok: true, v: r.v, d: r.d, dim: dimName(r.d), si: unitOf(r.d) };
  if (target) { const u = parseUnit(target); if (!dimEq(u.d, r.d)) fail('Cannot express ' + dimName(r.d) + ' in ' + target + ' (' + dimName(u.d) + ')'); out.target = target; out.vt = u.off !== undefined ? (r.v - u.off) / u.f : r.v / u.f; }
  return out;
}
function fmtNum(v, sig) { if (!isFinite(v)) return String(v); if (v === 0) return '0'; const a = Math.abs(v), s = sig || 6; return a >= 1e6 || a < 1e-3 ? v.toExponential(s - 1).replace(/\.?0+e/, 'e').replace('e+', '×10^').replace('e-', '×10^-').replace('e', '×10^') : String(+v.toPrecision(s)); }
function fmtQ(v, d, sig) { const u = unitOf(d); return fmtNum(v, sig) + (dimZero(d) ? '' : ' ' + u); }
const sigfig = (v, u, k) => { if (!isFinite(v) || v === 0) return String(v); if (!(u > 0)) return fmtNum(v, k || 6); const digs = Math.max(0, 1 - Math.floor(Math.log10(u))); return (digs > 12 ? v.toExponential(2) : v.toFixed(Math.min(12, digs))) + ' ± ' + (digs > 12 ? u.toExponential(1) : u.toFixed(Math.min(12, digs))); };
root.UNITS = { Z, D, dimAdd, dimSub, dimEq, dimZero, parseUnit, parseQuantity, fromSI, convert, dimName, dimStr, unitOf, calc, fmtNum, fmtQ, sigfig, table: U, lookup };
})(typeof window !== 'undefined' ? window : globalThis);
