/* Universal generators: implicit surfaces (marching tetrahedra), ODE systems (RK4), 3D field lines, L-systems, IFS fractals,
   crystal lattices, molecules, polyhedra, 4D projections, parametric curves, noise and special functions. Pure functions, no DOM.
   Every generator returns a mesh-like object: { ok, kind: 'tri'|'lines'|'points'|'atoms', V, good, F|segs, stats, issues, info }.
   Each result states its method honestly: exact | numerical | procedural | simulation | artistic. */
(function (root) {
'use strict';
const MX = root.MX, TAU = Math.PI * 2, PHI = (1 + Math.sqrt(5)) / 2;
const n2 = (v, d) => (isFinite(v) ? +(+v).toPrecision(d || 5) : v);

/* ---------- noise and special functions, added to the safe expression engine (never JavaScript eval) ---------- */
function h3(i, j, k) { let h = Math.imul(i | 0, 0x27d4eb2d) ^ Math.imul(j | 0, 0x165667b1) ^ Math.imul(k | 0, 0x9e3779b1); h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 2147483648 - 1; }
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10), lerp = (a, b, t) => a + (b - a) * t;
function noise3(x, y, z) { const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), u = fade(x - xi), v = fade(y - yi), w = fade(z - zi); return lerp(lerp(lerp(h3(xi, yi, zi), h3(xi + 1, yi, zi), u), lerp(h3(xi, yi + 1, zi), h3(xi + 1, yi + 1, zi), u), v), lerp(lerp(h3(xi, yi, zi + 1), h3(xi + 1, yi, zi + 1), u), lerp(h3(xi, yi + 1, zi + 1), h3(xi + 1, yi + 1, zi + 1), u), v), w); }
const noise2 = (x, y) => noise3(x, y, 0.37);
function fbm(x, y, o) { o = Math.max(1, Math.min(8, Math.round(o))); let s = 0, a = 1, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * noise3(x * f, y * f, i * 7.3); n += a; a *= 0.5; f *= 2; } return s / n; }
function erf(x) { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); }
if (MX && MX.FUNCS) Object.assign(MX.FUNCS, { noise: [2, noise2], noise3: [3, noise3], fbm: [3, fbm], erf: [1, erf], gauss: [1, (x) => Math.exp(-x * x / 2) / Math.sqrt(TAU)] });
function rng(seed) { let s = (seed || 1) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 1) / 4294967297; }; }

/* ---------- triangle mesh statistics (same quantities as the parametric builder) ---------- */
function triStats(V, F) {
  const nF = F.length / 3, nV = V.length / 3, lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], used = new Set(); let area = 0, vol = 0, degenerate = 0;
  for (let f = 0; f < nF; f++) {
    const a = F[f * 3], b = F[f * 3 + 1], c = F[f * 3 + 2]; used.add(a); used.add(b); used.add(c);
    const ax = V[a * 3], ay = V[a * 3 + 1], az = V[a * 3 + 2], bx = V[b * 3], by = V[b * 3 + 1], bz = V[b * 3 + 2], cx = V[c * 3], cy = V[c * 3 + 1], cz = V[c * 3 + 2];
    const ux = bx - ax, uy = by - ay, uz = bz - az, vx = cx - ax, vy = cy - ay, vz = cz - az, nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.hypot(nx, ny, nz);
    if (l < 1e-14) degenerate++; area += l / 2; vol += ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx);
  }
  used.forEach((k) => { for (let q = 0; q < 3; q++) { const v = V[k * 3 + q]; if (v < lo[q]) lo[q] = v; if (v > hi[q]) hi[q] = v; } });
  const edges = new Map(); const add = (a, b) => { if (a === b) return; const l = Math.min(a, b), h = Math.max(a, b), k = l * (nV + 1) + h, e = edges.get(k) || { n: 0, fw: 0 }; e.n++; if (a < b) e.fw++; edges.set(k, e); };
  for (let f = 0; f < nF; f++) { add(F[f * 3], F[f * 3 + 1]); add(F[f * 3 + 1], F[f * 3 + 2]); add(F[f * 3 + 2], F[f * 3]); }
  let boundary = 0, nonManifold = 0, orientBad = 0; edges.forEach((e) => { if (e.n === 1) boundary++; else if (e.n > 2) nonManifold++; else if (e.fw !== 1) orientBad++; });
  const closed = boundary === 0 && nonManifold === 0 && nF > 0, orientable = orientBad === 0, chi = closed ? used.size - edges.size + nF : null;
  let volume = null, volumeWhy = '';
  if (!closed) volumeWhy = boundary ? 'the surface has an open edge (' + boundary + ' boundary edges), so it does not enclose a volume' : nonManifold ? 'three or more faces meet along an edge' : 'there are no faces'; else if (!orientable) volumeWhy = 'the faces are not consistently oriented (' + orientBad + ' edges disagree)'; else volume = Math.abs(vol / 6);
  const diag = Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) || 1;
  return { vertices: used.size, faces: nF, quads: nF / 2, bbox: { lo, hi, size: [hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]] }, diag, area, degenerate, folds: 0, welded: used.size, edges: edges.size, boundary, closed, orientable, nonManifold, chi, volume, volumeWhy };
}
function bboxOf(V, good) { const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], n = V.length / 3; for (let k = 0; k < n; k++) { if (good && !good[k]) continue; for (let q = 0; q < 3; q++) { const v = V[k * 3 + q]; if (v < lo[q]) lo[q] = v; if (v > hi[q]) hi[q] = v; } } if (lo[0] === Infinity) { lo[0] = lo[1] = lo[2] = 0; hi[0] = hi[1] = hi[2] = 0; } return { lo, hi, size: [hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]], diag: Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) || 1 }; }
const fail = (code, msg, region, fix) => ({ ok: false, issues: [{ sev: 'error', code, msg, region: region || 'whole model', fix: fix || '' }], stats: null });
const compileAll = (srcs, vars, names) => { const out = [], issues = []; srcs.forEach((s, i) => { const nm = names ? names[i] : 'equation ' + (i + 1); if (typeof s !== 'string' || !s.trim()) { issues.push({ sev: 'error', code: 'empty-' + nm, msg: nm + ' is empty.', region: 'equation ' + nm, fix: 'Type a formula using ' + vars.join(', ') + '.' }); return; } try { out.push(MX.compile(s, vars)); } catch (e) { issues.push({ sev: 'error', code: 'parse-' + nm, msg: nm + ': ' + e.message, region: 'equation ' + nm, fix: 'Use only ' + vars.join(', ') + ', numbers, + - * / ^ and functions such as sin, cos, sqrt, exp, noise.' }); } }); return { fns: out, issues }; };

/* ---------- implicit surface F(x, y, z) = level by marching tetrahedra ---------- */
const IMPVARS = ['x', 'y', 'z', 't', 'a', 'b', 'c', 'R', 'r'];
const TETS = [[0, 1, 3, 7], [0, 3, 2, 7], [0, 2, 6, 7], [0, 6, 4, 7], [0, 4, 5, 7], [0, 5, 1, 7]];
function isosurface(f, box, n, level) {
  const nx = n + 1, N = nx * nx * nx, dx = (box[1] - box[0]) / n, dy = (box[3] - box[2]) / n, dz = (box[5] - box[4]) / n, val = new Float64Array(N); let nan = 0, mn = Infinity, mx = -Infinity;
  for (let k = 0; k <= n; k++) for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) { const v = f(box[0] + i * dx, box[2] + j * dy, box[4] + k * dz); val[i + nx * (j + nx * k)] = v; if (isFinite(v)) { if (v < mn) mn = v; if (v > mx) mx = v; } else nan++; }
  const P = [], F = [], map = new Map(); let skippedCells = 0;
  const pos = (id) => { const i = id % nx, j = ((id / nx) | 0) % nx, k = (id / (nx * nx)) | 0; return [box[0] + i * dx, box[2] + j * dy, box[4] + k * dz]; };
  const ev = (a, b) => { const lo = a < b ? a : b, hi = a < b ? b : a, key = lo * N + hi; let id = map.get(key); if (id !== undefined) return id; const fa = val[lo], fb = val[hi], t = (level - fa) / (fb - fa), pa = pos(lo), pb = pos(hi); id = P.length / 3; P.push(pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t, pa[2] + (pb[2] - pa[2]) * t); map.set(key, id); return id; };
  for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const b0 = i + nx * (j + nx * k), c = [b0, b0 + 1, b0 + nx, b0 + 1 + nx, b0 + nx * nx, b0 + 1 + nx * nx, b0 + nx + nx * nx, b0 + 1 + nx + nx * nx];
    let bad = false; for (let q = 0; q < 8; q++) if (!isFinite(val[c[q]])) { bad = true; break; } if (bad) { skippedCells++; continue; }
    for (let t = 0; t < 6; t++) {
      const w = [c[TETS[t][0]], c[TETS[t][1]], c[TETS[t][2]], c[TETS[t][3]]], s = w.map((id) => val[id] < level), cnt = s[0] + s[1] + s[2] + s[3]; if (cnt === 0 || cnt === 4) continue;
      if (cnt === 1 || cnt === 3) { const lone = s.findIndex((v) => v === (cnt === 1)), oth = [0, 1, 2, 3].filter((q) => q !== lone); F.push(ev(w[lone], w[oth[0]]), ev(w[lone], w[oth[1]]), ev(w[lone], w[oth[2]])); }
      else { const ins = [0, 1, 2, 3].filter((q) => s[q]), out = [0, 1, 2, 3].filter((q) => !s[q]), a = ins[0], b = ins[1], cc = out[0], d = out[1]; const e1 = ev(w[a], w[cc]), e2 = ev(w[a], w[d]), e3 = ev(w[b], w[d]), e4 = ev(w[b], w[cc]); F.push(e1, e2, e3, e1, e3, e4); }
    }
  }
  /* orient every triangle toward increasing F (outward when the inside has F below the level) using the numerical gradient */
  const h = 0.5 * Math.min(dx, dy, dz); let flipped = 0;
  for (let q = 0; q < F.length; q += 3) {
    const a = F[q] * 3, b = F[q + 1] * 3, c = F[q + 2] * 3, cx = (P[a] + P[b] + P[c]) / 3, cy = (P[a + 1] + P[b + 1] + P[c + 1]) / 3, cz = (P[a + 2] + P[b + 2] + P[c + 2]) / 3;
    const gx = f(cx + h, cy, cz) - f(cx - h, cy, cz), gy = f(cx, cy + h, cz) - f(cx, cy - h, cz), gz = f(cx, cy, cz + h) - f(cx, cy, cz - h);
    const ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], uz = P[b + 2] - P[a + 2], vx = P[c] - P[a], vy = P[c + 1] - P[a + 1], vz = P[c + 2] - P[a + 2];
    const d = (uy * vz - uz * vy) * gx + (uz * vx - ux * vz) * gy + (ux * vy - uy * vx) * gz; if (d < 0) { const t = F[q + 1]; F[q + 1] = F[q + 2]; F[q + 2] = t; flipped++; }
  }
  return { V: Float64Array.from(P), F: Uint32Array.from(F), min: mn, max: mx, nan, skippedCells, cells: n * n * n, h: Math.max(dx, dy, dz) };
}
function buildImplicit(L, t) {
  const c = compileAll([L.fimp], IMPVARS, ['F(x, y, z)']); const issues = c.issues.slice(); if (!c.fns.length) return { ok: false, issues, stats: null };
  const box = (L.box3 || [-2, 2, -2, 2, -2, 2]).map(Number), n = Math.max(8, Math.min(100, L.nvox | 0 || 48));
  if (box.some((v) => !isFinite(v)) || !(box[1] > box[0] && box[3] > box[2] && box[5] > box[4])) return fail('box', 'The search box is not valid: each maximum must be larger than its minimum, and all six numbers must be finite.', 'search box', 'Enter xmin < xmax, ymin < ymax, zmin < zmax.');
  const P = L.P || {}, fn = c.fns[0].fn, arg = [0, 0, 0, t || 0, P.a || 0, P.b || 0, P.c || 0, P.R || 0, P.r || 0], f = (x, y, z) => { arg[0] = x; arg[1] = y; arg[2] = z; return fn(arg); };
  /* the level can be a fixed number or a fraction of the maximum of F in the box */
  let level = Number(L.lvl); if (L.lvlAuto) { let mx = -Infinity; const m = 24, dxx = (box[1] - box[0]) / m, dyy = (box[3] - box[2]) / m, dzz = (box[5] - box[4]) / m; for (let k = 0; k <= m; k++) for (let j = 0; j <= m; j++) for (let i = 0; i <= m; i++) { const v = f(box[0] + i * dxx, box[2] + j * dyy, box[4] + k * dzz); if (isFinite(v) && v > mx) mx = v; } level = Number(L.lvlAuto) * mx; }
  if (!isFinite(level)) return fail('level', 'The level value is not a finite number.', 'level', 'Enter a number.');
  const iso = isosurface(f, box, n, level);
  if (iso.nan) issues.push({ sev: iso.nan === (n + 1) ** 3 ? 'error' : 'warn', code: 'nonfinite', msg: iso.nan + ' of ' + (n + 1) ** 3 + ' grid points give a value that is not a finite number, so ' + iso.skippedCells + ' cells were skipped.', region: 'where the formula is undefined (division by zero, square root of a negative, logarithm of a non-positive number)', fix: 'Shrink the box away from the singularity or change the formula.' });
  if (!iso.F.length) { issues.push({ sev: 'error', code: 'no-surface', msg: 'F never crosses the level ' + n2(level, 4) + ' inside the box: F ranges from ' + n2(iso.min, 4) + ' to ' + n2(iso.max, 4) + ', so there is no surface to draw.', region: 'search box', fix: 'Pick a level between ' + n2(iso.min, 3) + ' and ' + n2(iso.max, 3) + ' or enlarge the box.' }); return { ok: false, issues, stats: null }; }
  const st = triStats(iso.V, iso.F), nV = iso.V.length / 3, good = new Uint8Array(nV).fill(1);
  if (st.boundary) issues.push({ sev: 'warn', code: 'cut-by-box', msg: 'The surface runs into the edge of the search box (' + st.boundary + ' open edges), so it is cut off there.', region: 'faces of the search box', fix: 'Enlarge the box until the surface closes.' });
  issues.push({ sev: 'info', code: 'sampling', msg: 'Marching tetrahedra on a ' + n + '³ grid, cell size ' + n2(iso.h, 3) + ' units: any feature thinner than about one cell can be missed, and edges are rounded by about one cell.', region: 'whole surface', fix: 'Raise the grid resolution to see finer detail.' });
  return { ok: true, kind: 'tri', smooth: true, V: iso.V, F: iso.F, good, W: 0, H: 0, nu: 0, nv: 0, issues, stats: st, info: { method: 'numerical', level, fmin: iso.min, fmax: iso.max, grid: n, cell: iso.h } };
}

/* ---------- ODE systems: RK4 with a step-halving error report, optional conserved quantity ---------- */
const ODEVARS = ['x', 'y', 'z', 'vx', 'vy', 'vz', 't', 'a', 'b', 'c', 'R', 'r'];
function odeSetup(L) {
  const O = L.ode || {}, eq = (O.eq || []).slice(), n = eq.length === 6 ? 6 : 3; const names = n === 6 ? ['dx/dt', 'dy/dt', 'dz/dt', 'dvx/dt', 'dvy/dt', 'dvz/dt'] : ['dx/dt', 'dy/dt', 'dz/dt']; const c = compileAll(eq.slice(0, n), ODEVARS, names);
  let inv = null; if (O.inv && String(O.inv).trim()) { try { inv = MX.compile(O.inv, ODEVARS).fn; } catch (e) { c.issues.push({ sev: 'warn', code: 'parse-inv', msg: 'Conserved quantity: ' + e.message, region: 'conserved quantity', fix: 'Fix the formula or clear it.' }); } }
  return { n, fns: c.fns.map((q) => q.fn), issues: c.issues, inv, O };
}
function rk4run(S, y0, t0, dt, steps, P, sample) {
  const n = S.n, arg = [0, 0, 0, 0, 0, 0, 0, P.a || 0, P.b || 0, P.c || 0, P.R || 0, P.r || 0], y = y0.slice(), k1 = new Array(n), k2 = new Array(n), k3 = new Array(n), k4 = new Array(n), tmp = new Array(n);
  const rhs = (yy, tt, out) => { arg[0] = yy[0]; arg[1] = yy[1]; arg[2] = yy[2]; arg[3] = n === 6 ? yy[3] : 0; arg[4] = n === 6 ? yy[4] : 0; arg[5] = n === 6 ? yy[5] : 0; arg[6] = tt; for (let i = 0; i < n; i++) out[i] = S.fns[i](arg); };
  let t = t0; sample(0, t, y);
  for (let s = 1; s <= steps; s++) {
    rhs(y, t, k1); for (let i = 0; i < n; i++) tmp[i] = y[i] + dt / 2 * k1[i]; rhs(tmp, t + dt / 2, k2); for (let i = 0; i < n; i++) tmp[i] = y[i] + dt / 2 * k2[i]; rhs(tmp, t + dt / 2, k3); for (let i = 0; i < n; i++) tmp[i] = y[i] + dt * k3[i]; rhs(tmp, t + dt, k4);
    for (let i = 0; i < n; i++) y[i] += dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]); t = t0 + s * dt;
    let bad = false; for (let i = 0; i < n; i++) if (!isFinite(y[i]) || Math.abs(y[i]) > 1e7) bad = true; if (bad) return { stopped: s, t, y: y.slice() };
    sample(s, t, y);
  }
  return { stopped: null, t, y: y.slice() };
}
function buildOde(L, tShift) {
  const S = odeSetup(L), issues = S.issues.slice(); if (issues.some((i) => i.sev === 'error')) return { ok: false, issues, stats: null };
  const O = S.O, P = L.P || {}, dt = Number(O.dt), steps = Math.max(10, Math.min(200000, O.steps | 0)), y0 = (O.y0 || [1, 1, 1]).slice(0, S.n).map(Number); while (y0.length < S.n) y0.push(0);
  if (!(dt > 0) || !isFinite(dt)) return fail('dt', 'The time step must be a positive number.', 'step size', 'Try 0.005 to 0.02.'); if (y0.some((v) => !isFinite(v))) return fail('y0', 'An initial value is not a finite number.', 'initial conditions', 'Enter numbers.');
  const stride = Math.max(1, Math.ceil(steps / 20000)), pts = [], times = [], I = []; const arg = [0, 0, 0, 0, 0, 0, 0, P.a || 0, P.b || 0, P.c || 0, P.R || 0, P.r || 0];
  const invAt = (t, y) => { if (!S.inv) return NaN; arg[0] = y[0]; arg[1] = y[1]; arg[2] = y[2]; arg[3] = S.n === 6 ? y[3] : 0; arg[4] = S.n === 6 ? y[4] : 0; arg[5] = S.n === 6 ? y[5] : 0; arg[6] = t; return S.inv(arg); };
  const r1 = rk4run(S, y0, 0, dt, steps, P, (s, t, y) => { if (s % stride === 0) { pts.push(y[0], y[1], y[2]); times.push(t); if (S.inv) I.push(invAt(t, y)); } });
  if (r1.stopped !== null) issues.push({ sev: 'warn', code: 'blowup', msg: 'The solution grew beyond 10^7 or became non-finite at t = ' + n2(r1.t, 4) + ' (step ' + r1.stopped + '). Only the part before that is drawn.', region: 'after t = ' + n2(r1.t, 3), fix: 'Use a smaller time step, change the parameters or initial values, or accept that the system is unstable.' });
  const npts = pts.length / 3; if (npts < 3) return { ok: false, issues, stats: null };
  /* convergence: same span with dt/2, compare at the common sample times */
  const half = [], steps2 = Math.min(400000, (r1.stopped !== null ? r1.stopped : steps) * 2), stride2 = stride * 2; rk4run(S, y0, 0, dt / 2, steps2, P, (s, t, y) => { if (s % stride2 === 0) half.push(y[0], y[1], y[2]); });
  const bb = bboxOf(Float64Array.from(pts)), scale = bb.diag; let maxSep = 0, tTrust = times[npts - 1], found = false; const m = Math.min(npts, half.length / 3);
  for (let k = 0; k < m; k++) { const s = Math.hypot(pts[k * 3] - half[k * 3], pts[k * 3 + 1] - half[k * 3 + 1], pts[k * 3 + 2] - half[k * 3 + 2]); if (s > maxSep) maxSep = s; if (!found && s > 1e-3 * scale) { found = true; tTrust = times[k]; } }
  /* observed order on a short non-chaotic horizon: error ratio between dt, dt/2, dt/4 */
  const T0 = Math.min(0.5, steps * dt * 0.2), runEnd = (h) => { let e = null; rk4run(S, y0, 0, h, Math.max(1, Math.round(T0 / h)), P, () => {}).y.forEach(() => {}); const q = rk4run(S, y0, 0, h, Math.max(1, Math.round(T0 / h)), P, () => {}); return q.y; };
  let order = null; try { const hh = T0 / 40, a = runEnd(hh), b = runEnd(hh / 2), c3 = runEnd(hh / 4), e1 = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]), e2 = Math.hypot(b[0] - c3[0], b[1] - c3[1], b[2] - c3[2]); if (e1 > 1e-14 && e2 > 1e-16) order = Math.log2(e1 / e2); } catch (e) { order = null; }
  let drift = null; if (S.inv && I.length > 1 && isFinite(I[0])) { let m2 = 0; const ref = Math.max(Math.abs(I[0]), 1e-12); I.forEach((v) => { m2 = Math.max(m2, Math.abs(v - I[0])); }); drift = m2 / ref; }
  if (found) issues.push({ sev: 'info', code: 'chaos', msg: 'Solutions with step ' + dt + ' and ' + dt / 2 + ' separate by more than 0.1% of the picture size after t = ' + n2(tTrust, 3) + '. For a chaotic system that is expected: the exact path cannot be trusted beyond that time, but the overall shape of the attractor is still meaningful.', region: 'after t = ' + n2(tTrust, 3), fix: 'This is a property of the equations, not an error. A smaller step delays it only slightly.' });
  if (drift !== null && drift > 1e-3) issues.push({ sev: 'warn', code: 'drift', msg: 'The conserved quantity changed by ' + (drift * 100).toExponential(2) + '% of its starting value, so the numerical solution is losing accuracy.', region: 'whole trajectory', fix: 'Use a smaller time step.' });
  const V = Float64Array.from(pts), segs = new Uint32Array((npts - 1) * 2); for (let k = 0; k + 1 < npts; k++) { segs[k * 2] = k; segs[k * 2 + 1] = k + 1; }
  let len = 0; for (let k = 0; k + 1 < npts; k++) len += Math.hypot(pts[k * 3 + 3] - pts[k * 3], pts[k * 3 + 4] - pts[k * 3 + 1], pts[k * 3 + 5] - pts[k * 3 + 2]);
  issues.push({ sev: 'info', code: 'method', msg: 'Classical Runge-Kutta 4 with a fixed step ' + dt + ' for ' + steps + ' steps (to t = ' + n2(steps * dt, 4) + ').' + (order !== null ? ' Observed order of accuracy ' + n2(order, 3) + ' (theory: 4).' : ''), region: 'whole trajectory', fix: '' });
  return { ok: true, kind: 'lines', V, good: new Uint8Array(npts).fill(1), segs, times: Float64Array.from(times), issues, stats: { vertices: npts, segments: npts - 1, length: len, bbox: bb, diag: bb.diag, faces: 0, closed: false, volume: null, volumeWhy: 'a trajectory is a curve, not a closed surface', chi: null, area: 0, edges: npts - 1, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'numerical', dt, steps, order, drift, tTrust: found ? tTrust : null, maxSep, final: r1.y } };
}

/* ---------- 3D field lines (streamlines) ---------- */
function buildField(L, t) {
  const F = L.fld || {}, c = compileAll([F.P, F.Q, F.R], IMPVARS, ['P(x, y, z)', 'Q(x, y, z)', 'R(x, y, z)']), issues = c.issues.slice(); if (issues.length) return { ok: false, issues, stats: null };
  const PR = L.P || {}, fn = c.fns.map((q) => q.fn), arg = [0, 0, 0, t || 0, PR.a || 0, PR.b || 0, PR.c || 0, PR.R || 0, PR.r || 0], ds = Number(F.h) || 0.05, steps = Math.min(4000, F.steps | 0 || 400), bound = Number(F.bound) || 6, unit = F.unit !== false;
  const vec = (x, y, z) => { arg[0] = x; arg[1] = y; arg[2] = z; return [fn[0](arg), fn[1](arg), fn[2](arg)]; };
  const nrm = (v) => { if (!unit) return v; const l = Math.hypot(v[0], v[1], v[2]); return l > 0 ? [v[0] / l, v[1] / l, v[2] / l] : [NaN, NaN, NaN]; };
  const seeds = []; const sd = F.seeds || { type: 'ring', n: 12, r: 1, cx: 0, cy: 0, cz: 0 };
  if (sd.type === 'ring') for (let i = 0; i < sd.n; i++) { const a = TAU * i / sd.n; seeds.push([sd.cx + sd.r * Math.cos(a), sd.cy + sd.r * Math.sin(a), sd.cz]); }
  else if (sd.type === 'sphere') for (let i = 0; i < sd.n; i++) { const z = 1 - 2 * (i + 0.5) / sd.n, rr = Math.sqrt(Math.max(0, 1 - z * z)), a = i * TAU / PHI; seeds.push([sd.cx + sd.r * rr * Math.cos(a), sd.cy + sd.r * rr * Math.sin(a), sd.cz + sd.r * z]); }
  else if (sd.type === 'grid') { const m = Math.max(2, sd.n | 0); for (let k = 0; k < m; k++) for (let j = 0; j < m; j++) for (let i = 0; i < m; i++) seeds.push([sd.cx + sd.r * (2 * i / (m - 1) - 1), sd.cy + sd.r * (2 * j / (m - 1) - 1), sd.cz + sd.r * (2 * k / (m - 1) - 1)]); }
  else for (let i = 0; i < sd.n; i++) seeds.push([sd.cx, sd.cy + sd.r * (2 * i / Math.max(1, sd.n - 1) - 1), sd.cz]);
  if (seeds.length > 400) return fail('seeds', 'More than 400 seed points were requested.', 'seeds', 'Use fewer seed points.');
  const P = [], segs = [], ends = { bound: 0, steps: 0, singular: 0, nonfinite: 0 }; let totalLen = 0;
  const dirs = unit ? [1, -1] : [1];
  seeds.forEach((s0) => {
    dirs.forEach((dir) => {
      let p = s0.slice(), prev = -1, reason = 'steps', pts = 0;
      for (let k = 0; k < steps; k++) {
        const k1 = nrm(vec(p[0], p[1], p[2])); if (!k1.every(isFinite)) { reason = 'singular'; break; }
        const h = ds * dir, q2 = [p[0] + h / 2 * k1[0], p[1] + h / 2 * k1[1], p[2] + h / 2 * k1[2]], k2 = nrm(vec(q2[0], q2[1], q2[2])), q3 = [p[0] + h / 2 * k2[0], p[1] + h / 2 * k2[1], p[2] + h / 2 * k2[2]], k3 = nrm(vec(q3[0], q3[1], q3[2])), q4 = [p[0] + h * k3[0], p[1] + h * k3[1], p[2] + h * k3[2]], k4 = nrm(vec(q4[0], q4[1], q4[2]));
        if (![k2, k3, k4].every((q) => q.every(isFinite))) { reason = 'singular'; break; }
        const np = [p[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), p[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]), p[2] + h / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])];
        if (!np.every(isFinite)) { reason = 'nonfinite'; break; } if (Math.hypot(np[0], np[1], np[2]) > bound) { reason = 'bound'; break; }
        const id = P.length / 3; if (prev < 0) { P.push(p[0], p[1], p[2]); prev = id; pts = 1; } P.push(np[0], np[1], np[2]); segs.push(prev, P.length / 3 - 1); prev = P.length / 3 - 1; totalLen += Math.hypot(np[0] - p[0], np[1] - p[1], np[2] - p[2]); p = np; pts++;
      }
      ends[reason]++;
    });
  });
  if (!segs.length) return { ok: false, issues: issues.concat([{ sev: 'error', code: 'no-lines', msg: 'No field line could be traced: the field is zero, undefined or non-finite at every seed point.', region: 'seed points', fix: 'Move the seeds or change the field.' }]), stats: null };
  const V = Float64Array.from(P), bb = bboxOf(V);
  if (ends.singular) issues.push({ sev: 'info', code: 'singular', msg: ends.singular + ' lines stopped where the field is zero or undefined (a point source, sink or singular point).', region: 'near singular points of the field', fix: '' });
  issues.push({ sev: 'info', code: 'method', msg: 'Lines follow dr/ds = ' + (unit ? 'F/|F|' : 'F') + ' with RK4, step ' + ds + ', up to ' + steps + ' steps in each direction' + (unit ? '. Line spacing says nothing about field strength (unit-speed tracing).' : '.'), region: 'whole field', fix: '' });
  return { ok: true, kind: 'lines', V, good: new Uint8Array(V.length / 3).fill(1), segs: Uint32Array.from(segs), issues, stats: { vertices: V.length / 3, segments: segs.length / 2, length: totalLen, bbox: bb, diag: bb.diag, faces: 0, closed: false, volume: null, volumeWhy: 'field lines are curves', chi: null, area: 0, edges: segs.length / 2, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0, lines: seeds.length * dirs.length }, info: { method: 'numerical', ends } };
}

/* ---------- L-system plant (3D turtle) ---------- */
function buildLsys(L) {
  const S = L.ls || {}, rules = {}; String(S.rules || '').split(/\n|;/).forEach((ln) => { const m = /^\s*([A-Za-z])\s*=\s*(\S.*)$/.exec(ln); if (m) rules[m[1]] = m[2].trim(); });
  const iter = Math.max(0, Math.min(8, S.iter | 0)), issues = []; let s = String(S.axiom || 'F'); if (!/^[A-Za-z+\-&^\\/\[\]!|]+$/.test(s)) return fail('axiom', 'The axiom may only use letters and the symbols + - & ^ \\ / [ ] ! |.', 'axiom', 'Try F.');
  for (let i = 0; i < iter; i++) { let o = ''; for (const ch of s) { o += rules[ch] !== undefined ? rules[ch] : ch; if (o.length > 400000) { issues.push({ sev: 'warn', code: 'too-long', msg: 'The string grew beyond 400,000 symbols, so growth stopped after ' + i + ' of ' + iter + ' iterations.', region: 'iterations', fix: 'Lower the iteration count.' }); i = iter; break; } } s = o; }
  const ang = (Number(S.angle) || 25) * Math.PI / 180, len0 = (Number(S.len) || 1) * Math.pow(Number(S.scale) || 1, iter), shrink = Number(S.shrink) || 0.9;
  const P = [], segs = [], lev = []; let pos = [0, 0, 0], H = [0, 0, 1], Lf = [-1, 0, 0], U = [0, 1, 0], len = len0; const stack = []; const rot = (a, b, ang2) => { const c = Math.cos(ang2), sn = Math.sin(ang2); const na = [a[0] * c + b[0] * sn, a[1] * c + b[1] * sn, a[2] * c + b[2] * sn], nb = [-a[0] * sn + b[0] * c, -a[1] * sn + b[1] * c, -a[2] * sn + b[2] * c]; return [na, nb]; };
  let depth = 0, maxDepth = 0;
  for (const ch of s) {
    if (ch === 'F' || ch === 'G') { const np = [pos[0] + H[0] * len, pos[1] + H[1] * len, pos[2] + H[2] * len]; const a = P.length / 3; P.push(pos[0], pos[1], pos[2], np[0], np[1], np[2]); segs.push(a, a + 1); lev.push(depth); pos = np; if (P.length / 3 > 600000) { issues.push({ sev: 'warn', code: 'too-many', msg: 'Stopped at 300,000 branches.', region: 'whole plant', fix: 'Lower the iteration count.' }); break; } }
    else if (ch === 'f') pos = [pos[0] + H[0] * len, pos[1] + H[1] * len, pos[2] + H[2] * len];
    else if (ch === '+') [H, Lf] = rot(H, Lf, ang); else if (ch === '-') [H, Lf] = rot(H, Lf, -ang);
    else if (ch === '&') [H, U] = rot(H, U, ang); else if (ch === '^') [H, U] = rot(H, U, -ang);
    else if (ch === '\\') [Lf, U] = rot(Lf, U, ang); else if (ch === '/') [Lf, U] = rot(Lf, U, -ang);
    else if (ch === '|') { H = H.map((v) => -v); Lf = Lf.map((v) => -v); }
    else if (ch === '!') len *= shrink;
    else if (ch === '[') { stack.push([pos.slice(), H.slice(), Lf.slice(), U.slice(), len, depth]); depth++; if (depth > maxDepth) maxDepth = depth; }
    else if (ch === ']') { const q = stack.pop(); if (q) { pos = q[0]; H = q[1]; Lf = q[2]; U = q[3]; len = q[4]; depth = q[5]; } }
  }
  if (!segs.length) return fail('empty', 'The rules produced no drawing steps (no F in the final string).', 'rules', 'Include F in the axiom or rules.');
  const V = Float64Array.from(P), bb = bboxOf(V);
  issues.push({ sev: 'info', code: 'method', msg: 'L-system with ' + iter + ' iterations gives ' + s.length + ' symbols and ' + segs.length / 2 + ' branches, drawn by a 3D turtle with turn angle ' + n2(S.angle, 3) + '°. This is a procedural model of branching growth, not a simulation of how a real plant grows.', region: 'whole plant', fix: '' });
  return { ok: true, kind: 'lines', V, good: new Uint8Array(V.length / 3).fill(1), segs: Uint32Array.from(segs), lev: Uint8Array.from(lev), maxLev: maxDepth, issues, stats: { vertices: V.length / 3, segments: segs.length / 2, length: segs.length / 2 * len0, bbox: bb, diag: bb.diag, faces: 0, closed: false, volume: null, volumeWhy: 'a plant skeleton is made of curves', chi: null, area: 0, edges: segs.length / 2, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'procedural', symbols: s.length } };
}

/* ---------- IFS fractals (chaos game) ---------- */
function buildIfs(L) {
  const S = L.ifs || {}, maps = S.maps || []; if (!maps.length) return fail('maps', 'No maps are defined.', 'maps'); const n = Math.min(200000, Math.max(1000, L.gp && L.gp.n ? L.gp.n | 0 : 30000)), r = rng(5), issues = [];
  const ps = maps.map((m) => (m.p !== undefined ? m.p : 1 / maps.length)), tot = ps.reduce((a, b) => a + b, 0), cum = []; let acc = 0; ps.forEach((p) => { acc += p / tot; cum.push(acc); });
  let p = [0, 0, 0]; const V = new Float64Array(n * 3);
  for (let i = -30; i < n; i++) { const u = r(); let k = 0; while (k < cum.length - 1 && u > cum[k]) k++; const m = maps[k].m; p = [m[0] * p[0] + m[1] * p[1] + m[2] * p[2] + m[9], m[3] * p[0] + m[4] * p[1] + m[5] * p[2] + m[10], m[6] * p[0] + m[7] * p[1] + m[8] * p[2] + m[11]]; if (i >= 0) { V[i * 3] = p[0]; V[i * 3 + 1] = p[1]; V[i * 3 + 2] = p[2]; } if (!p.every(isFinite)) return fail('diverge', 'The maps are not contractions: the points flew off to infinity.', 'maps', 'Scale factors must be smaller than 1 in size.'); }
  const bb = bboxOf(V); let dim = null; const sc = maps.map((m) => Math.cbrt(Math.abs(m.m[0] * (m.m[4] * m.m[8] - m.m[5] * m.m[7]) - m.m[1] * (m.m[3] * m.m[8] - m.m[5] * m.m[6]) + m.m[2] * (m.m[3] * m.m[7] - m.m[4] * m.m[6])))); if (sc.every((s) => Math.abs(s - sc[0]) < 1e-9) && sc[0] > 0 && sc[0] < 1 && maps.length > 1) dim = Math.log(maps.length) / Math.log(1 / sc[0]);
  issues.push({ sev: 'info', code: 'method', msg: 'Chaos game: ' + n + ' points from ' + maps.length + ' contracting affine maps chosen at random (fixed seed, so the picture is repeatable). ' + (dim !== null ? 'All maps scale by ' + n2(sc[0], 5) + ', so the similarity dimension is ln ' + maps.length + ' ÷ ln ' + n2(1 / sc[0], 5) + ' = ' + n2(dim, 5) + ' (exact for a self-similar set with no overlaps).' : 'The maps have different scales, so no single similarity dimension is given.') + ' The picture is a finite sample of the fractal, not the fractal itself.', region: 'whole set', fix: '' });
  return { ok: true, kind: 'points', V, good: new Uint8Array(n).fill(1), issues, stats: { vertices: n, faces: 0, bbox: bb, diag: bb.diag, closed: false, volume: null, volumeWhy: 'a point set', chi: null, area: 0, edges: 0, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'exact', dimension: dim, maps: maps.length } };
}

/* ---------- crystal lattices and molecules (atoms + bonds) ---------- */
const ELEM = { H: { r: 31, color: '#f2f2f2' }, C: { r: 76, color: '#4a4f57' }, O: { r: 66, color: '#e5483b' }, N: { r: 71, color: '#3b6fe5' }, Na: { r: 166, color: '#9b6bff' }, Cl: { r: 102, color: '#33c46d' }, Fe: { r: 132, color: '#c97a3a' }, Cu: { r: 132, color: '#d8895a' }, Si: { r: 111, color: '#c9b49a' }, Au: { r: 144, color: '#f2c744' }, Xx: { r: 100, color: '#4f8cff' } };
const LATTICES = { sc: { name: 'Simple cubic', basis: [['Xx', 0, 0, 0]], pf: Math.PI / 6, pfEq: 'π/6', cn: 6 }, bcc: { name: 'Body-centred cubic', basis: [['Xx', 0, 0, 0], ['Xx', .5, .5, .5]], pf: Math.PI * Math.sqrt(3) / 8, pfEq: 'π√3/8', cn: 8 }, fcc: { name: 'Face-centred cubic', basis: [['Xx', 0, 0, 0], ['Xx', .5, .5, 0], ['Xx', .5, 0, .5], ['Xx', 0, .5, .5]], pf: Math.PI / (3 * Math.sqrt(2)), pfEq: 'π/(3√2)', cn: 12 }, diamond: { name: 'Diamond cubic', basis: [['C', 0, 0, 0], ['C', .5, .5, 0], ['C', .5, 0, .5], ['C', 0, .5, .5], ['C', .25, .25, .25], ['C', .75, .75, .25], ['C', .75, .25, .75], ['C', .25, .75, .75]], pf: Math.PI * Math.sqrt(3) / 16, pfEq: 'π√3/16', cn: 4 }, nacl: { name: 'Rock salt (NaCl)', basis: [['Na', 0, 0, 0], ['Na', .5, .5, 0], ['Na', .5, 0, .5], ['Na', 0, .5, .5], ['Cl', .5, 0, 0], ['Cl', 0, .5, 0], ['Cl', 0, 0, .5], ['Cl', .5, .5, .5]], pf: null, cn: 6 } };
function bondsFor(atoms, tol) { const n = atoms.length; let dmin = Infinity; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.hypot(atoms[i].x - atoms[j].x, atoms[i].y - atoms[j].y, atoms[i].z - atoms[j].z); if (d > 1e-9 && d < dmin) dmin = d; } const segs = []; if (!isFinite(dmin)) return { segs, dmin: 0 }; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.hypot(atoms[i].x - atoms[j].x, atoms[i].y - atoms[j].y, atoms[i].z - atoms[j].z); if (d < dmin * (1 + tol)) segs.push(i, j); } return { segs, dmin }; }
function atomsMesh(atoms, segs, issues, info) { const n = atoms.length, V = new Float64Array(n * 3), rad = new Float32Array(n), col = []; let dmin = Infinity, rmax = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.hypot(atoms[i].x - atoms[j].x, atoms[i].y - atoms[j].y, atoms[i].z - atoms[j].z); if (d > 1e-9 && d < dmin) dmin = d; } atoms.forEach((a) => { rmax = Math.max(rmax, (ELEM[a.el] || ELEM.Xx).r); }); const rs = isFinite(dmin) ? 0.3 * dmin / rmax : 1; atoms.forEach((a, i) => { V[i * 3] = a.x; V[i * 3 + 1] = a.y; V[i * 3 + 2] = a.z; const e = ELEM[a.el] || ELEM.Xx; rad[i] = (a.r || e.r) * rs; col.push(e.color); }); const bb = bboxOf(V); return { ok: true, kind: 'atoms', V, good: new Uint8Array(n).fill(1), segs: Uint32Array.from(segs), rad, col, els: atoms.map((a) => a.el), issues, stats: { vertices: n, segments: segs.length / 2, faces: 0, bbox: bb, diag: bb.diag, closed: false, volume: null, volumeWhy: 'a set of atoms', chi: null, area: 0, edges: segs.length / 2, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info }; }
function buildLattice(L) {
  const g = L.gp || {}, T = LATTICES[L.lat || 'fcc']; if (!T) return fail('lattice', 'Unknown lattice type.', 'lattice'); const nx = Math.max(1, Math.min(6, g.nx | 0 || 2)), ny = Math.max(1, Math.min(6, g.ny | 0 || 2)), nz = Math.max(1, Math.min(6, g.nz | 0 || 2)), a = Number(g.a) || 1;
  const atoms = []; for (let k = 0; k <= nz; k++) for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) T.basis.forEach((b) => { const x = (i + b[1]) * a, y = (j + b[2]) * a, z = (k + b[3]) * a; if (x <= nx * a + 1e-9 && y <= ny * a + 1e-9 && z <= nz * a + 1e-9) atoms.push({ el: b[0], x, y, z }); });
  if (atoms.length > 1500) return fail('too-many', atoms.length + ' atoms is too many to draw.', 'cells', 'Use fewer cells.');
  const bd = bondsFor(atoms, 0.02), issues = [{ sev: 'info', code: 'method', msg: T.name + ' unit cell repeated ' + nx + ' × ' + ny + ' × ' + nz + ' times with lattice constant a = ' + a + '. Atom positions are exact lattice points; bonds join nearest neighbours (distance ' + n2(bd.dmin, 4) + ' = ' + n2(bd.dmin / a, 4) + ' a). Atoms are drawn smaller than touching spheres. Real crystals also have thermal motion, defects and surfaces that are not modelled.', region: 'whole crystal', fix: '' }];
  return atomsMesh(atoms, bd.segs, issues, { method: 'exact', lattice: T.name, packingFraction: T.pf, packingEq: T.pfEq, coordination: T.cn, nearest: bd.dmin });
}
const MOLECULES = {
  h2o: { name: 'Water, H₂O', ref: 'O–H 95.72 pm, H–O–H 104.52° (gas-phase equilibrium geometry)', build: () => { const d = 95.72, th = 104.52 * Math.PI / 360; return { atoms: [{ el: 'O', x: 0, y: 0, z: 0 }, { el: 'H', x: d * Math.sin(th), y: 0, z: d * Math.cos(th) }, { el: 'H', x: -d * Math.sin(th), y: 0, z: d * Math.cos(th) }], bonds: [0, 1, 0, 2] }; } },
  ch4: { name: 'Methane, CH₄', ref: 'C–H 108.7 pm, tetrahedral angle 109.47°', build: () => { const d = 108.7, k = d / Math.sqrt(3); return { atoms: [{ el: 'C', x: 0, y: 0, z: 0 }, { el: 'H', x: k, y: k, z: k }, { el: 'H', x: k, y: -k, z: -k }, { el: 'H', x: -k, y: k, z: -k }, { el: 'H', x: -k, y: -k, z: k }], bonds: [0, 1, 0, 2, 0, 3, 0, 4] }; } },
  co2: { name: 'Carbon dioxide, CO₂', ref: 'C=O 116.3 pm, linear 180°', build: () => ({ atoms: [{ el: 'C', x: 0, y: 0, z: 0 }, { el: 'O', x: 116.3, y: 0, z: 0 }, { el: 'O', x: -116.3, y: 0, z: 0 }], bonds: [0, 1, 0, 2] }) },
  benzene: { name: 'Benzene, C₆H₆', ref: 'C–C 139.7 pm, C–H 108.4 pm, planar hexagon', build: () => { const atoms = [], bonds = [], rc = 139.7, rh = 139.7 + 108.4; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; atoms.push({ el: 'C', x: rc * Math.cos(a), y: rc * Math.sin(a), z: 0 }); } for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; atoms.push({ el: 'H', x: rh * Math.cos(a), y: rh * Math.sin(a), z: 0 }); } for (let i = 0; i < 6; i++) { bonds.push(i, (i + 1) % 6, i, 6 + i); } return { atoms, bonds }; } },
  nh3: { name: 'Ammonia, NH₃', ref: 'N–H 101.2 pm, H–N–H 106.7°', build: () => { const d = 101.2, th = 106.7 * Math.PI / 180, cosb = Math.cos(th), rr = d * Math.sqrt((1 - cosb) / 3 * 2 / 2 * 1), atoms = [{ el: 'N', x: 0, y: 0, z: 0 }]; const s = Math.sqrt((1 - cosb) / (3 * 0.5 * 3)); /* place three H on a cone with the right mutual angle */ const sinA = Math.sqrt((2 * (1 - cosb)) / 3), cosA = Math.sqrt(1 - sinA * sinA); for (let i = 0; i < 3; i++) { const a = i * TAU / 3; atoms.push({ el: 'H', x: d * sinA * Math.cos(a), y: d * sinA * Math.sin(a), z: -d * cosA }); } void rr; void s; return { atoms, bonds: [0, 1, 0, 2, 0, 3] }; } },
};
function buildMolecule(L) { const M = MOLECULES[L.mol || 'h2o']; if (!M) return fail('molecule', 'Unknown molecule.', 'molecule'); const b = M.build(); return atomsMesh(b.atoms, b.bonds, [{ sev: 'info', code: 'method', msg: M.name + ': atom positions from standard reference geometry (' + M.ref + '), in picometres. These are textbook equilibrium values, not a quantum-chemical calculation. Atom size is shown by covalent radius; drawing is simplified.', region: 'whole molecule', fix: '' }], { method: 'exact', ref: M.ref, molecule: M.name }); }

/* ---------- polyhedra with exact formulas ---------- */
function hullFaces(P) {
  const n = P.length, faces = [], seen = new Set(), eps = 1e-7; const cen = [0, 1, 2].map((q) => P.reduce((s, p) => s + p[q], 0) / n);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    const u = [P[j][0] - P[i][0], P[j][1] - P[i][1], P[j][2] - P[i][2]], v = [P[k][0] - P[i][0], P[k][1] - P[i][1], P[k][2] - P[i][2]]; let nn = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; const l = Math.hypot(nn[0], nn[1], nn[2]); if (l < 1e-9) continue; nn = nn.map((x) => x / l); const d = nn[0] * P[i][0] + nn[1] * P[i][1] + nn[2] * P[i][2]; let pos = 0, neg = 0; const on = []; for (let m = 0; m < n; m++) { const s = nn[0] * P[m][0] + nn[1] * P[m][1] + nn[2] * P[m][2] - d; if (s > eps) pos++; else if (s < -eps) neg++; else on.push(m); } if (pos && neg) continue; const key = on.join(','); if (seen.has(key)) continue; seen.add(key);
    const sign = d - (nn[0] * cen[0] + nn[1] * cen[1] + nn[2] * cen[2]) >= 0 ? 1 : -1, nrm = nn.map((x) => x * sign), c0 = [0, 1, 2].map((q) => on.reduce((s, m) => s + P[m][q], 0) / on.length);
    let e1 = [P[on[0]][0] - c0[0], P[on[0]][1] - c0[1], P[on[0]][2] - c0[2]]; const el = Math.hypot(e1[0], e1[1], e1[2]); e1 = e1.map((x) => x / el); const e2 = [nrm[1] * e1[2] - nrm[2] * e1[1], nrm[2] * e1[0] - nrm[0] * e1[2], nrm[0] * e1[1] - nrm[1] * e1[0]];
    const ord = on.map((m) => { const q = [P[m][0] - c0[0], P[m][1] - c0[1], P[m][2] - c0[2]]; return { m, a: Math.atan2(q[0] * e2[0] + q[1] * e2[1] + q[2] * e2[2], q[0] * e1[0] + q[1] * e1[1] + q[2] * e1[2]) }; }).sort((p, q) => p.a - q.a).map((o) => o.m); faces.push(ord);
  }
  return faces;
}
const POLY = {
  tetra: { name: 'Tetrahedron', V: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], area: (a) => Math.sqrt(3) * a * a, vol: (a) => a ** 3 / (6 * Math.SQRT2), eqA: 'A = √3 a²', eqV: 'V = a³ ÷ (6√2)' },
  cube: { name: 'Cube', V: (() => { const o = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) o.push([x, y, z]); return o; })(), area: (a) => 6 * a * a, vol: (a) => a ** 3, eqA: 'A = 6a²', eqV: 'V = a³' },
  octa: { name: 'Octahedron', V: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], area: (a) => 2 * Math.sqrt(3) * a * a, vol: (a) => Math.SQRT2 / 3 * a ** 3, eqA: 'A = 2√3 a²', eqV: 'V = √2 a³ ÷ 3' },
  icosa: { name: 'Icosahedron', V: (() => { const o = []; for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) { o.push([0, s1, s2 * PHI], [s1, s2 * PHI, 0], [s2 * PHI, 0, s1]); } return o; })(), area: (a) => 5 * Math.sqrt(3) * a * a, vol: (a) => 5 * (3 + Math.sqrt(5)) / 12 * a ** 3, eqA: 'A = 5√3 a²', eqV: 'V = 5(3 + √5) a³ ÷ 12' },
  dodeca: { name: 'Dodecahedron', V: (() => { const o = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) o.push([x, y, z]); for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) { o.push([0, s1 / PHI, s2 * PHI], [s1 / PHI, s2 * PHI, 0], [s2 * PHI, 0, s1 / PHI]); } return o; })(), area: (a) => 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * a * a, vol: (a) => (15 + 7 * Math.sqrt(5)) / 4 * a ** 3, eqA: 'A = 3√(25 + 10√5) a²', eqV: 'V = (15 + 7√5) a³ ÷ 4' },
};
function buildPoly(L) {
  const T = POLY[L.poly || 'cube']; if (!T) return fail('poly', 'Unknown polyhedron.', 'polyhedron'); const a = Number((L.gp || {}).edge) || 1;
  let e0 = Infinity; for (let i = 0; i < T.V.length; i++) for (let j = i + 1; j < T.V.length; j++) e0 = Math.min(e0, Math.hypot(T.V[i][0] - T.V[j][0], T.V[i][1] - T.V[j][1], T.V[i][2] - T.V[j][2])); const k = a / e0, P = T.V.map((p) => p.map((x) => x * k));
  const faces = hullFaces(P), F = []; faces.forEach((f) => { for (let q = 1; q + 1 < f.length; q++) F.push(f[0], f[q], f[q + 1]); });
  const V = Float64Array.from([].concat.apply([], P)), st = triStats(V, Uint32Array.from(F)), ea = T.area(a), ev = T.vol(a);
  const edges = new Set(); faces.forEach((f) => { for (let q = 0; q < f.length; q++) { const x = f[q], y = f[(q + 1) % f.length]; edges.add(Math.min(x, y) + '-' + Math.max(x, y)); } }); const chi = P.length - edges.size + faces.length;
  st.areaExact = ea; st.volumeExact = ev; st.chiPoly = chi; st.polyFaces = faces.length; st.polyEdges = edges.size;
  return { ok: true, kind: 'tri', V, F: Uint32Array.from(F), good: new Uint8Array(P.length).fill(1), W: 0, H: 0, nu: 0, nv: 0, issues: [{ sev: 'info', code: 'method', msg: T.name + ' with edge length ' + a + ': ' + P.length + ' vertices, ' + edges.size + ' edges, ' + faces.length + ' faces, so V − E + F = ' + chi + ' (exactly 2 for any convex polyhedron). Faces found by an exact convex-hull test.', region: 'whole solid', fix: '' }], stats: st, info: { method: 'exact', name: T.name, exact: { area: ea, volume: ev, eqA: T.eqA, eqV: T.eqV } } };
}

/* ---------- 4D polytopes with rotation and projection ---------- */
const HYPER = {
  tesseract: { name: 'Tesseract (8-cell)', V: (() => { const o = []; for (let m = 0; m < 16; m++) o.push([m & 1 ? 1 : -1, m & 2 ? 1 : -1, m & 4 ? 1 : -1, m & 8 ? 1 : -1]); return o; })(), edgeLen: 2, facts: 'vertices 16, edges 32, square faces 24, cubic cells 8; V − E + F − C = 0' },
  cell16: { name: '16-cell', V: (() => { const o = []; for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { const v = [0, 0, 0, 0]; v[i] = s; o.push(v); } return o; })(), edgeLen: Math.SQRT2, facts: 'vertices 8, edges 24, triangular faces 32, tetrahedral cells 16; V − E + F − C = 0' },
  cell24: { name: '24-cell', V: (() => { const o = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) for (const s of [-1, 1]) for (const t of [-1, 1]) { const v = [0, 0, 0, 0]; v[i] = s; v[j] = t; o.push(v); } return o; })(), edgeLen: Math.SQRT2, facts: 'vertices 24, edges 96, triangular faces 96, octahedral cells 24; V − E + F − C = 0' },
};
function buildHyper(L, t) {
  const T = HYPER[L.hyper || 'tesseract']; if (!T) return fail('hyper', 'Unknown polytope.', 'polytope'); const g = L.gp || {}, w1 = Number(g.w1) || 0, w2 = Number(g.w2) || 0, ph1 = Number(g.p1) || 0, ph2 = Number(g.p2) || 0, d = Math.max(1.2, Number(g.d) || 3), ortho = !!g.ortho;
  const a1 = w1 * (t || 0) + ph1, a2 = w2 * (t || 0) + ph2, c1 = Math.cos(a1), s1 = Math.sin(a1), c2 = Math.cos(a2), s2 = Math.sin(a2);
  const R = T.V.map((v) => { let x = v[0], y = v[1], z = v[2], w = v[3]; const x2 = x * c1 - w * s1, w2b = x * s1 + w * c1; x = x2; w = w2b; const z2 = z * c2 - w * s2, w3 = z * s2 + w * c2; z = z2; w = w3; return [x, y, z, w]; });
  const V = new Float64Array(R.length * 3); let behind = 0; R.forEach((v, i) => { const s = ortho ? 1 : d / (d - v[3]); if (!ortho && d - v[3] <= 1e-6) behind++; V[i * 3] = v[0] * s; V[i * 3 + 1] = v[1] * s; V[i * 3 + 2] = v[2] * s; });
  const segs = [], tol = 1e-6; for (let i = 0; i < T.V.length; i++) for (let j = i + 1; j < T.V.length; j++) { let dd = 0; for (let q = 0; q < 4; q++) dd += (T.V[i][q] - T.V[j][q]) ** 2; if (Math.abs(Math.sqrt(dd) - T.edgeLen) < tol) segs.push(i, j); }
  const bb = bboxOf(V), issues = [{ sev: 'info', code: 'method', msg: T.name + ': ' + T.facts + '. Rotation is exact: in the x–w plane by ' + n2(a1 * 180 / Math.PI, 4) + '° and in the z–w plane by ' + n2(a2 * 180 / Math.PI, 4) + '°. Projection to 3D is ' + (ortho ? 'orthographic (drop w)' : 'perspective from distance ' + d + ' along w') + '. A 4D object cannot be seen directly: this is a 3D shadow, and lengths in it are not 4D lengths.', region: 'whole figure', fix: '' }];
  if (behind) issues.push({ sev: 'warn', code: 'behind', msg: behind + ' vertices are at or beyond the 4D camera, so they are projected incorrectly.', region: 'those vertices', fix: 'Raise the 4D camera distance.' });
  return { ok: true, kind: 'lines', V, good: new Uint8Array(R.length).fill(1), segs: Uint32Array.from(segs), issues, stats: { vertices: R.length, segments: segs.length / 2, length: 0, bbox: bb, diag: bb.diag, faces: 0, closed: false, volume: null, volumeWhy: 'a wireframe', chi: null, area: 0, edges: segs.length / 2, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'exact', facts: T.facts } };
}

/* ---------- parametric curves (with strands and rungs for helices) ---------- */
function buildCurve(L, t) {
  const C = L.crv || {}, c = compileAll([C.fx, C.fy, C.fz], ['u', 't', 'a', 'b', 'c', 'R', 'r'], ['x(u)', 'y(u)', 'z(u)']), issues = c.issues.slice(); if (issues.length) return { ok: false, issues, stats: null };
  const P = L.P || {}, n = Math.max(8, Math.min(20000, C.n | 0 || 400)), u0 = Number(C.umin), u1 = Number(C.umax); if (!(isFinite(u0) && isFinite(u1) && u1 !== u0)) return fail('range', 'The parameter range is not valid.', 'u range', 'Give two different finite numbers.');
  const strands = Math.max(1, Math.min(6, C.strands | 0 || 1)), arg = [0, t || 0, P.a || 0, P.b || 0, P.c || 0, P.R || 0, P.r || 0], pts = [], segs = []; let bad = 0;
  for (let s = 0; s < strands; s++) { const ph = TAU * s / strands, cs = Math.cos(ph), sn = Math.sin(ph), base = pts.length / 3; for (let i = 0; i <= n; i++) { arg[0] = u0 + (u1 - u0) * i / n; const x = c.fns[0].fn(arg), y = c.fns[1].fn(arg), z = c.fns[2].fn(arg); if (![x, y, z].every((v) => isFinite(v) && Math.abs(v) < 1e9)) { bad++; pts.push(0, 0, 0); } else pts.push(x * cs - y * sn, x * sn + y * cs, z); if (i > 0) segs.push(base + i - 1, base + i); } }
  if (bad) issues.push({ sev: 'warn', code: 'nonfinite', msg: bad + ' sample points are not finite numbers and were drawn at the origin.', region: 'where the formula is undefined', fix: 'Restrict the parameter range.' });
  if (C.rungs && strands >= 2) { const step = Math.max(1, Math.round(n / (C.rungs | 0 || 20))); for (let i = 0; i <= n; i += step) segs.push(i, (n + 1) + i); }
  const V = Float64Array.from(pts); let len = 0; for (let i = 0; i < n; i++) len += Math.hypot(pts[i * 3 + 3] - pts[i * 3], pts[i * 3 + 4] - pts[i * 3 + 1], pts[i * 3 + 5] - pts[i * 3 + 2]);
  let len2 = 0; { const m2 = Math.max(4, n >> 1); let px = null; for (let i = 0; i <= m2; i++) { arg[0] = u0 + (u1 - u0) * i / m2; const q = [c.fns[0].fn(arg), c.fns[1].fn(arg), c.fns[2].fn(arg)]; if (px) len2 += Math.hypot(q[0] - px[0], q[1] - px[1], q[2] - px[2]); px = q; } }
  const lenR = len + (len - len2) / 3; /* Richardson, polygon length error ~ h^2 */
  const bb = bboxOf(V); issues.push({ sev: 'info', code: 'method', msg: 'Curve sampled at ' + n + ' points. Length by polyline ' + n2(len, 6) + ' (' + n2(len2, 6) + ' with half the points; extrapolated ' + n2(lenR, 6) + ').', region: 'whole curve', fix: 'Raise the number of points for a smoother curve.' });
  return { ok: true, kind: 'lines', V, good: new Uint8Array(V.length / 3).fill(1), segs: Uint32Array.from(segs), issues, stats: { vertices: V.length / 3, segments: segs.length / 2, length: len * strands, bbox: bb, diag: bb.diag, faces: 0, closed: false, volume: null, volumeWhy: 'a curve', chi: null, area: 0, edges: segs.length / 2, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'exact', length: len, lengthExtrapolated: lenR } };
}

/* ---------- point clouds: spiral galaxy (procedural) ---------- */
function buildGalaxy(L) {
  const g = L.gp || {}, n = Math.min(100000, Math.max(1000, g.n | 0 || 20000)), arms = Math.max(1, Math.min(8, g.arms | 0 || 2)), tw = Number(g.twist) || 3, R = Number(g.R) || 3, r = rng(11), V = new Float64Array(n * 3);
  const gs = () => { let u = 0; for (let i = 0; i < 6; i++) u += r(); return (u - 3) / Math.sqrt(0.5); };
  for (let i = 0; i < n; i++) { const rad = R * Math.pow(r(), 0.7), arm = Math.floor(r() * arms), th = arm * TAU / arms + tw * Math.log(1 + rad) * 1.2 + gs() * 0.12 * (1 + 0.3 / (rad + 0.2)); V[i * 3] = rad * Math.cos(th) + gs() * 0.05; V[i * 3 + 1] = rad * Math.sin(th) + gs() * 0.05; V[i * 3 + 2] = gs() * 0.06 * Math.exp(-rad / R); }
  const bb = bboxOf(V); return { ok: true, kind: 'points', V, good: new Uint8Array(n).fill(1), issues: [{ sev: 'info', code: 'method', msg: 'Procedural galaxy: ' + n + ' points along ' + arms + ' logarithmic spiral arms with random scatter (fixed seed). It looks like a spiral galaxy; it is not a simulation of stars, gravity or dark matter, and the units are arbitrary.', region: 'whole cloud', fix: '' }], stats: { vertices: n, faces: 0, bbox: bb, diag: bb.diag, closed: false, volume: null, volumeWhy: 'a point cloud', chi: null, area: 0, edges: 0, boundary: 0, nonManifold: 0, orientable: true, degenerate: 0, folds: 0 }, info: { method: 'artistic' } };
}

/* ---------- dispatcher ---------- */
function build(L, t) {
  switch (L.mode) {
    case 'implicit': return buildImplicit(L, t);
    case 'ode': return buildOde(L, t);
    case 'field': return buildField(L, t);
    case 'lsys': return buildLsys(L);
    case 'ifs': return buildIfs(L);
    case 'lattice': return buildLattice(L);
    case 'molecule': return buildMolecule(L);
    case 'poly': return buildPoly(L);
    case 'hyper': return buildHyper(L, t);
    case 'curve': return buildCurve(L, t);
    case 'galaxy': return buildGalaxy(L);
    default: return null;
  }
}
const usesT = (L) => { try { if (L.mode === 'hyper') { const g = L.gp || {}; return !!(g.w1 || g.w2); } if (L.mode === 'implicit') return MX.compile(L.fimp, IMPVARS).uses('t'); if (L.mode === 'field') return ['P', 'Q', 'R'].some((k) => MX.compile((L.fld || {})[k], IMPVARS).uses('t')); if (L.mode === 'curve') return ['fx', 'fy', 'fz'].some((k) => MX.compile((L.crv || {})[k], ['u', 't', 'a', 'b', 'c', 'R', 'r']).uses('t')); } catch (e) { return false; } return false; };

/* ---------- exporters: world-space meshes in OBJ, STL, GLB, SVG ---------- */
function worldMesh(mesh, M, apply) { const n = mesh.V.length / 3, W = new Float64Array(n * 3); for (let k = 0; k < n; k++) { const p = apply(M, mesh.V[k * 3], mesh.V[k * 3 + 1], mesh.V[k * 3 + 2]); W[k * 3] = p[0]; W[k * 3 + 1] = p[1]; W[k * 3 + 2] = p[2]; } return W; }
function vertexNormals(W, F) { const n = W.length / 3, N = new Float64Array(n * 3); for (let f = 0; f < F.length; f += 3) { const a = F[f] * 3, b = F[f + 1] * 3, c = F[f + 2] * 3, ux = W[b] - W[a], uy = W[b + 1] - W[a + 1], uz = W[b + 2] - W[a + 2], vx = W[c] - W[a], vy = W[c + 1] - W[a + 1], vz = W[c + 2] - W[a + 2], nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; for (const k of [a, b, c]) { N[k] += nx; N[k + 1] += ny; N[k + 2] += nz; } } for (let k = 0; k < n; k++) { const l = Math.hypot(N[k * 3], N[k * 3 + 1], N[k * 3 + 2]) || 1; N[k * 3] /= l; N[k * 3 + 1] /= l; N[k * 3 + 2] /= l; } return N; }
function validFaces(mesh) { const out = []; if (!mesh.F) return out; for (let f = 0; f < mesh.F.length; f += 3) { const a = mesh.F[f], b = mesh.F[f + 1], c = mesh.F[f + 2]; if (mesh.good[a] && mesh.good[b] && mesh.good[c]) out.push(a, b, c); } return out; }
function toOBJ(mesh, W, name, meta) {
  const L = ['# ' + (meta || 'Math Canvas model'), '# units: arbitrary model units (no real-world scale)', 'o ' + String(name || 'model').replace(/\s+/g, '_')]; const n = W.length / 3; for (let k = 0; k < n; k++) L.push('v ' + n2(W[k * 3], 8) + ' ' + n2(W[k * 3 + 1], 8) + ' ' + n2(W[k * 3 + 2], 8));
  if (mesh.kind === 'tri') { const F = validFaces(mesh), N = vertexNormals(W, Uint32Array.from(F)); for (let k = 0; k < n; k++) L.push('vn ' + n2(N[k * 3], 6) + ' ' + n2(N[k * 3 + 1], 6) + ' ' + n2(N[k * 3 + 2], 6)); for (let f = 0; f < F.length; f += 3) L.push('f ' + (F[f] + 1) + '//' + (F[f] + 1) + ' ' + (F[f + 1] + 1) + '//' + (F[f + 1] + 1) + ' ' + (F[f + 2] + 1) + '//' + (F[f + 2] + 1)); }
  else if (mesh.segs) for (let s = 0; s < mesh.segs.length; s += 2) L.push('l ' + (mesh.segs[s] + 1) + ' ' + (mesh.segs[s + 1] + 1));
  else for (let k = 0; k < n; k++) L.push('p ' + (k + 1));
  return L.join('\n') + '\n';
}
function toSTL(mesh, W, binary, name) {
  if (mesh.kind !== 'tri') return null; const F = validFaces(mesh), nF = F.length / 3; const tri = (f) => { const a = F[f * 3] * 3, b = F[f * 3 + 1] * 3, c = F[f * 3 + 2] * 3, ux = W[b] - W[a], uy = W[b + 1] - W[a + 1], uz = W[b + 2] - W[a + 2], vx = W[c] - W[a], vy = W[c + 1] - W[a + 1], vz = W[c + 2] - W[a + 2]; let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; return { n: [nx / l, ny / l, nz / l], v: [[W[a], W[a + 1], W[a + 2]], [W[b], W[b + 1], W[b + 2]], [W[c], W[c + 1], W[c + 2]]] }; };
  if (binary) { const buf = new ArrayBuffer(84 + nF * 50), dv = new DataView(buf); const head = 'Math Canvas STL (arbitrary units)'; for (let i = 0; i < head.length && i < 80; i++) dv.setUint8(i, head.charCodeAt(i)); dv.setUint32(80, nF, true); for (let f = 0; f < nF; f++) { const t = tri(f), o = 84 + f * 50; t.n.forEach((v, i) => dv.setFloat32(o + i * 4, v, true)); t.v.forEach((p, j) => p.forEach((v, i) => dv.setFloat32(o + 12 + j * 12 + i * 4, v, true))); dv.setUint16(o + 48, 0, true); } return buf; }
  const L = ['solid ' + String(name || 'model').replace(/\s+/g, '_')]; for (let f = 0; f < nF; f++) { const t = tri(f); L.push(' facet normal ' + t.n.join(' '), '  outer loop'); t.v.forEach((p) => L.push('   vertex ' + p.join(' '))); L.push('  endloop', ' endfacet'); } L.push('endsolid'); return L.join('\n') + '\n';
}
function toGLB(mesh, W, name) {
  const n = W.length / 3; let idx, mode, nrm = null; if (mesh.kind === 'tri') { const F = validFaces(mesh); idx = Uint32Array.from(F); mode = 4; nrm = vertexNormals(W, idx); } else if (mesh.segs) { idx = Uint32Array.from(mesh.segs); mode = 1; } else { idx = Uint32Array.from({ length: n }, (_, i) => i); mode = 0; }
  const pos = new Float32Array(n * 3); for (let i = 0; i < pos.length; i++) pos[i] = W[i]; const nf = nrm ? Float32Array.from(nrm) : null; const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity]; for (let k = 0; k < n; k++) for (let q = 0; q < 3; q++) { const v = pos[k * 3 + q]; if (v < lo[q]) lo[q] = v; if (v > hi[q]) hi[q] = v; }
  const pad = (len) => (4 - (len % 4)) % 4, bin = []; let off = 0; const views = [], acc = []; const push = (arr, target, comp, type, count, extra) => { const bytes = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength); const p = pad(off); if (p) { bin.push(new Uint8Array(p)); off += p; } views.push({ buffer: 0, byteOffset: off, byteLength: bytes.length, target }); acc.push(Object.assign({ bufferView: views.length - 1, componentType: comp, count, type }, extra || {})); bin.push(bytes); off += bytes.length; return acc.length - 1; };
  const aPos = push(pos, 34962, 5126, 'VEC3', n, { min: lo, max: hi }), aNrm = nf ? push(nf, 34962, 5126, 'VEC3', n) : -1, aIdx = push(idx, 34963, 5125, 'SCALAR', idx.length);
  const prim = { attributes: Object.assign({ POSITION: aPos }, aNrm >= 0 ? { NORMAL: aNrm } : {}), indices: aIdx, mode };
  const json = { asset: { version: '2.0', generator: 'Math Canvas' }, scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0, name: String(name || 'model') }], meshes: [{ primitives: [prim] }], buffers: [{ byteLength: off }], bufferViews: views, accessors: acc };
  let js = JSON.stringify(json); js += ' '.repeat(pad(js.length)); const jb = new TextEncoder().encode(js), total = 12 + 8 + jb.length + 8 + off + pad(off), out = new Uint8Array(total), dv = new DataView(out.buffer); dv.setUint32(0, 0x46546C67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true); dv.setUint32(12, jb.length, true); dv.setUint32(16, 0x4E4F534A, true); out.set(jb, 20); let o = 20 + jb.length; dv.setUint32(o, off + pad(off), true); dv.setUint32(o + 4, 0x004E4942, true); o += 8; bin.forEach((b) => { out.set(b, o); o += b.length; }); return out.buffer;
}
function toSVG(mesh, S, w, h, style, color) { /* S = projected screen array (x, y, depth, flag) per vertex; faces drawn far to near with flat shading */
  const out = ['<?xml version="1.0" encoding="UTF-8"?>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '"><!-- Vector projection of the model for the current camera. Flat shading, painter\'s algorithm, no hidden-line removal for wireframes. -->'];
  if (mesh.kind === 'tri') { const F = validFaces(mesh), idx = []; for (let f = 0; f < F.length; f += 3) if (S[F[f] * 4 + 3] === 1 && S[F[f + 1] * 4 + 3] === 1 && S[F[f + 2] * 4 + 3] === 1) idx.push(f); idx.sort((p, q) => (S[F[q] * 4 + 2] + S[F[q + 1] * 4 + 2] + S[F[q + 2] * 4 + 2]) - (S[F[p] * 4 + 2] + S[F[p + 1] * 4 + 2] + S[F[p + 2] * 4 + 2]));
    idx.forEach((f) => { const a = F[f], b = F[f + 1], c = F[f + 2], ar = (S[b * 4] - S[a * 4]) * (S[c * 4 + 1] - S[a * 4 + 1]) - (S[b * 4 + 1] - S[a * 4 + 1]) * (S[c * 4] - S[a * 4]), sh = 0.45 + 0.55 * Math.min(1, Math.abs(ar) / 40), col = color.map((x) => Math.round(x * Math.min(1, sh)));
      out.push('<polygon points="' + [a, b, c].map((k) => n2(S[k * 4], 6) + ',' + n2(S[k * 4 + 1], 6)).join(' ') + '" fill="' + (style === 'wire' ? 'none' : 'rgb(' + col.join(',') + ')') + '" stroke="' + (style === 'solid' ? 'rgb(' + col.join(',') + ')' : 'rgba(255,255,255,.55)') + '" stroke-width="0.5"/>'); }); }
  else if (mesh.segs) { out.push('<g stroke="rgb(' + color.join(',') + ')" stroke-width="1.2" fill="none" stroke-linecap="round">'); for (let s = 0; s < mesh.segs.length; s += 2) { const a = mesh.segs[s], b = mesh.segs[s + 1]; if (S[a * 4 + 3] === 1 && S[b * 4 + 3] === 1) out.push('<line x1="' + n2(S[a * 4], 6) + '" y1="' + n2(S[a * 4 + 1], 6) + '" x2="' + n2(S[b * 4], 6) + '" y2="' + n2(S[b * 4 + 1], 6) + '"/>'); } out.push('</g>'); }
  else { out.push('<g fill="rgb(' + color.join(',') + ')">'); const n = mesh.V.length / 3; for (let k = 0; k < n; k++) if (S[k * 4 + 3] === 1) out.push('<circle cx="' + n2(S[k * 4], 6) + '" cy="' + n2(S[k * 4 + 1], 6) + '" r="1"/>'); out.push('</g>'); }
  out.push('</svg>'); return out.join('\n');
}

/* ---------- clipping (cross sections): triangles cut exactly by a plane ---------- */
function clipTriangles(V, F, axis, pos, flip) { // keeps the side where sign*(coord - pos) >= 0; returns { V, F } with new vertices where edges cross the plane
  const sg = flip ? -1 : 1, Vn = Array.from(V), Fn = [], cut = new Map(), d = (k) => sg * (V[k * 3 + axis] - pos);
  const edgeV = (a, b) => { const lo = Math.min(a, b), hi = Math.max(a, b), key = lo * (V.length / 3 + 1) + hi; let id = cut.get(key); if (id !== undefined) return id; const da = d(lo), db = d(hi), t = da / (da - db); id = Vn.length / 3; Vn.push(V[lo * 3] + (V[hi * 3] - V[lo * 3]) * t, V[lo * 3 + 1] + (V[hi * 3 + 1] - V[lo * 3 + 1]) * t, V[lo * 3 + 2] + (V[hi * 3 + 2] - V[lo * 3 + 2]) * t); cut.set(key, id); return id; };
  for (let f = 0; f < F.length; f += 3) {
    const t = [F[f], F[f + 1], F[f + 2]], s = t.map((k) => d(k) >= 0), keep = s[0] + s[1] + s[2]; if (keep === 3) Fn.push(t[0], t[1], t[2]); else if (keep === 0) continue;
    else if (keep === 1) { const i = s.findIndex(Boolean), a = t[i], b = t[(i + 1) % 3], c = t[(i + 2) % 3]; Fn.push(a, edgeV(a, b), edgeV(c, a)); }
    else { const i = s.findIndex((v) => !v), a = t[i], b = t[(i + 1) % 3], c = t[(i + 2) % 3]; const p = edgeV(a, b), q = edgeV(c, a); Fn.push(p, b, c, p, c, q); }
  }
  const Vf = Float64Array.from(Vn), Ff = Uint32Array.from(Fn), onP = (k) => Math.abs(Vf[k * 3 + axis] - pos) < 1e-9 * (1 + Math.abs(pos)), cnt = new Map(), dirs = [];
  const ax1 = (axis + 1) % 3, ax2 = (axis + 2) % 3;
  for (let f = 0; f < Ff.length; f += 3) for (let q = 0; q < 3; q++) { const a = Ff[f + q], b = Ff[f + (q + 1) % 3]; if (onP(a) && onP(b)) { const key = Math.min(a, b) + ',' + Math.max(a, b); cnt.set(key, (cnt.get(key) || 0) + 1); dirs.push([a, b, key]); } }
  let sa = 0, nseg = 0; const segs = []; dirs.forEach(([a, b, key]) => { if (cnt.get(key) === 1) { sa += Vf[a * 3 + ax1] * Vf[b * 3 + ax2] - Vf[b * 3 + ax1] * Vf[a * 3 + ax2]; nseg++; segs.push(a, b); } });
  return { V: Vf, F: Ff, sectionArea: Math.abs(sa) / 2, sectionSegs: Uint32Array.from(segs), nSection: nseg };
}

root.GEN = { noise3, noise2, fbm, erf, rng, isosurface, triStats, bboxOf, buildImplicit, buildOde, buildField, buildLsys, buildIfs, buildLattice, buildMolecule, buildPoly, buildHyper, buildCurve, buildGalaxy, build, usesT, LATTICES, MOLECULES, POLY, HYPER, ELEM, hullFaces, odeSetup, rk4run, worldMesh, vertexNormals, validFaces, toOBJ, toSTL, toGLB, toSVG, clipTriangles, IMPVARS, ODEVARS };
})(typeof window !== 'undefined' ? window : globalThis);
