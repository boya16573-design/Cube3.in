/* Math Canvas 3D maths: matrices, parametric surface meshes, validation and exact formulas.
   Pure functions with no browser dependency, so they can be unit tested in Node.
   Every number that leaves this file is tagged by the caller as Measured (counted or summed from the mesh),
   Estimated (a model or an assumption was needed) or Unknown. */
(function (root) {
'use strict';
const MX = root.MX || (typeof require !== 'undefined' ? require('./studio-expr.js') : null);
const TAU = Math.PI * 2;

/* ---------- 4 x 4 matrices, row-major, column vectors: p' = M p ---------- */
const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function mul(a, b) { const o = new Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[i * 4 + k] * b[k * 4 + j]; o[i * 4 + j] = s; } return o; }
const translate = (x, y, z) => [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
const scale = (x, y, z) => [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
function rotX(d) { const c = Math.cos(d), s = Math.sin(d); return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]; }
function rotY(d) { const c = Math.cos(d), s = Math.sin(d); return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]; }
function rotZ(d) { const c = Math.cos(d), s = Math.sin(d); return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
function perspective(fovY, aspect, near, far) { const f = 1 / Math.tan(fovY / 2); return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0]; }
function lookAt(eye, tgt, up) {
  let f = [tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]]; const fl = Math.hypot(f[0], f[1], f[2]) || 1; f = f.map((v) => v / fl);
  let s = [f[1] * up[2] - f[2] * up[1], f[2] * up[0] - f[0] * up[2], f[0] * up[1] - f[1] * up[0]]; const sl = Math.hypot(s[0], s[1], s[2]) || 1; s = s.map((v) => v / sl);
  const u = [s[1] * f[2] - s[2] * f[1], s[2] * f[0] - s[0] * f[2], s[0] * f[1] - s[1] * f[0]];
  return [s[0], s[1], s[2], -(s[0] * eye[0] + s[1] * eye[1] + s[2] * eye[2]), u[0], u[1], u[2], -(u[0] * eye[0] + u[1] * eye[1] + u[2] * eye[2]), -f[0], -f[1], -f[2], f[0] * eye[0] + f[1] * eye[1] + f[2] * eye[2], 0, 0, 0, 1];
}
function apply(m, x, y, z) { const w = m[12] * x + m[13] * y + m[14] * z + m[15]; return [m[0] * x + m[1] * y + m[2] * z + m[3], m[4] * x + m[5] * y + m[6] * z + m[7], m[8] * x + m[9] * y + m[10] * z + m[11], w]; }
function det3(m) { return m[0] * (m[5] * m[10] - m[6] * m[9]) - m[1] * (m[4] * m[10] - m[6] * m[8]) + m[2] * (m[4] * m[9] - m[5] * m[8]); }
function modelMatrix(tr) { const d = Math.PI / 180; return mul(translate(tr.tx, tr.ty, tr.tz), mul(rotZ(tr.rz * d), mul(rotY(tr.ry * d), mul(rotX(tr.rx * d), scale(tr.sx, tr.sy, tr.sz))))); }
function cameraMatrices(cam, aspect) {
  const d = Math.PI / 180, yaw = cam.yaw * d, pit = cam.pitch * d, cp = Math.cos(pit);
  const eye = [cam.tx + cam.dist * cp * Math.cos(yaw), cam.ty + cam.dist * cp * Math.sin(yaw), cam.tz + cam.dist * Math.sin(pit)];
  const view = lookAt(eye, [cam.tx, cam.ty, cam.tz], [0, 0, 1]), proj = perspective(cam.fov * d, aspect, Math.max(0.01, cam.dist * 0.02), cam.dist * 40 + 100);
  return { eye, view, proj, vp: mul(proj, view) };
}

/* ---------- presets (all with u, v in [0, 2 pi] unless the shape needs less) ---------- */
const PRESETS = {
  torus: { name: 'Torus', fx: '(R + r*cos(v))*cos(u)', fy: '(R + r*cos(v))*sin(u)', fz: 'r*sin(v)', umin: 0, umax: TAU, vmin: 0, vmax: TAU, nu: 64, nv: 32, P: { R: 1.5, r: 0.6, a: 0, b: 0, c: 0 } },
  sphere: { name: 'Sphere', fx: 'R*sin(v)*cos(u)', fy: 'R*sin(v)*sin(u)', fz: 'R*cos(v)', umin: 0, umax: TAU, vmin: 0, vmax: Math.PI, nu: 48, nv: 24, P: { R: 1.6, r: 0.6, a: 0, b: 0, c: 0 } },
  cylinder: { name: 'Cylinder', fx: 'R*cos(u)', fy: 'R*sin(u)', fz: 'v', umin: 0, umax: TAU, vmin: -1.2, vmax: 1.2, nu: 48, nv: 6, P: { R: 1, r: 0.6, a: 0, b: 0, c: 0 } },
  mobius: { name: 'Möbius strip', fx: '(R + v*cos(u/2))*cos(u)', fy: '(R + v*cos(u/2))*sin(u)', fz: 'v*sin(u/2)', umin: 0, umax: TAU, vmin: -0.6, vmax: 0.6, nu: 96, nv: 8, P: { R: 1.5, r: 0.6, a: 0, b: 0, c: 0 } },
  helicoid: { name: 'Helicoid', fx: 'v*cos(u)', fy: 'v*sin(u)', fz: 'a*u/2 + 0*t', umin: -TAU, umax: TAU, vmin: -1.6, vmax: 1.6, nu: 80, nv: 8, P: { R: 1.5, r: 0.6, a: 0.5, b: 0, c: 0 } },
  ripple: { name: 'Rippling surface', fx: 'u', fy: 'v', fz: 'a*sin(2*sqrt(u^2 + v^2) - 3*t)/(1 + sqrt(u^2 + v^2))', umin: -4, umax: 4, vmin: -4, vmax: 4, nu: 64, nv: 64, P: { R: 1.5, r: 0.6, a: 1.4, b: 0, c: 0 } },
  klein: { name: 'Klein bottle', fx: '(R + r*cos(u/2)*sin(v) - r*sin(u/2)*sin(2*v))*cos(u)', fy: '(R + r*cos(u/2)*sin(v) - r*sin(u/2)*sin(2*v))*sin(u)', fz: 'r*sin(u/2)*sin(v) + r*cos(u/2)*sin(2*v)', umin: 0, umax: TAU, vmin: 0, vmax: TAU, nu: 80, nv: 40, P: { R: 2, r: 0.9, a: 0, b: 0, c: 0 } },
};
const VARS = ['u', 'v', 't', 'a', 'b', 'c', 'R', 'r'];
function defaults(kind) { const p = PRESETS[kind] || PRESETS.torus; return JSON.parse(JSON.stringify(Object.assign({ kind: PRESETS[kind] ? kind : 'torus' }, p))); }
const norm = (s) => String(s).toLowerCase().replace(/\s+/g, '');

/* ---------- validation of the inputs, before any mesh is built ---------- */
function validate(S) {
  const issues = [], add = (sev, code, msg, region, fix) => issues.push({ sev, code, msg, region: region || 'whole surface', fix: fix || '' });
  ['x', 'y', 'z'].forEach((k) => {
    const src = S['f' + k];
    if (typeof src !== 'string' || !src.trim()) { add('error', 'empty-' + k, k + '(u, v) is empty.', 'equation ' + k, 'Type a formula using u, v, t, a, b, c, R, r.'); return; }
    try { MX.compile(src, VARS); } catch (e) { add('error', 'parse-' + k, k + '(u, v): ' + e.message, 'equation ' + k, 'Use only u, v, t, a, b, c, R, r, numbers, + − * / ^ and functions such as sin, cos, sqrt.'); }
  });
  [['umin', 'umax', 'u'], ['vmin', 'vmax', 'v']].forEach(([lo, hi, nm]) => {
    if (!isFinite(S[lo]) || !isFinite(S[hi])) add('error', 'range-' + nm, nm + ' range is not a finite number.', nm + ' range', 'Enter numbers for both ends.');
    else if (!(S[hi] > S[lo])) add('error', 'range-' + nm, nm + ' must run from a smaller to a larger value, but ' + nm + ' goes from ' + S[lo] + ' to ' + S[hi] + '.', nm + ' range', 'Make the end larger than the start.');
  });
  [['nu', 'u'], ['nv', 'v']].forEach(([k, nm]) => {
    if (!(S[k] >= 2) || S[k] !== Math.round(S[k])) add('error', 'samples-' + nm, 'The number of samples along ' + nm + ' must be a whole number of at least 2 (it is ' + S[k] + ').', 'sampling', 'Set it between 2 and 200.');
  });
  if (S.nu * S.nv > 40000) add('warn', 'too-dense', 'The mesh has ' + (S.nu * S.nv) + ' quads, which is slow to draw.', 'sampling', 'Lower the samples to keep the quad count under 40 000.');
  if (S.kind === 'torus' && S.P && !(S.P.R > S.P.r && S.P.r > 0)) add('error', 'torus-params', 'A ring torus needs R > r > 0, but R = ' + S.P.R + ' and r = ' + S.P.r + '. The surface crosses itself, so exact area and volume formulas do not apply.', 'parameters R, r', 'Make R larger than r, and r larger than 0.');
  return issues;
}

/* ---------- mesh ---------- */
function buildMesh(S, t) {
  const issues = validate(S), hard = issues.some((i) => i.sev === 'error');
  if (hard) return { ok: false, issues, stats: null };
  const nu = Math.min(200, S.nu | 0), nv = Math.min(200, S.nv | 0), W = nu + 1, H = nv + 1, n = W * H;
  const fx = MX.compile(S.fx, VARS).fn, fy = MX.compile(S.fy, VARS).fn, fz = MX.compile(S.fz, VARS).fn, P = S.P || {};
  const V = new Float64Array(n * 3), good = new Uint8Array(n); let bad = 0, firstBad = null, badU = [Infinity, -Infinity], badV = [Infinity, -Infinity], badWhich = {};
  const arg = [0, 0, t || 0, P.a || 0, P.b || 0, P.c || 0, P.R || 0, P.r || 0];
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const u = S.umin + (S.umax - S.umin) * i / nu, v = S.vmin + (S.vmax - S.vmin) * j / nv; arg[0] = u; arg[1] = v;
    const x = fx(arg), y = fy(arg), z = fz(arg), k = j * W + i;
    if (isFinite(x) && isFinite(y) && isFinite(z) && Math.abs(x) < 1e9 && Math.abs(y) < 1e9 && Math.abs(z) < 1e9) { V[k * 3] = x; V[k * 3 + 1] = y; V[k * 3 + 2] = z; good[k] = 1; }
    else { bad++; if (!firstBad) firstBad = [u, v]; badU[0] = Math.min(badU[0], u); badU[1] = Math.max(badU[1], u); badV[0] = Math.min(badV[0], v); badV[1] = Math.max(badV[1], v); [['x', x], ['y', y], ['z', z]].forEach(([nm, val]) => { if (!isFinite(val) || Math.abs(val) >= 1e9) badWhich[nm] = 1; }); }
  }
  if (bad) issues.push({ sev: bad === n ? 'error' : 'warn', code: 'nonfinite', msg: bad + ' of ' + n + ' sample points give a value that is not a finite number (' + Object.keys(badWhich).join(', ') + ' is NaN, infinite or beyond 10^9). The first is at u = ' + +firstBad[0].toFixed(4) + ', v = ' + +firstBad[1].toFixed(4) + '. Typical causes: dividing by zero, sqrt or ln of a negative number, asin or acos outside −1…1.', region: 'u in [' + +badU[0].toFixed(3) + ', ' + +badU[1].toFixed(3) + '], v in [' + +badV[0].toFixed(3) + ', ' + +badV[1].toFixed(3) + ']', fix: 'Change the parameter range so the formula stays defined, or rewrite the formula.' });
  if (bad === n) return { ok: false, issues, stats: null };
  const F = []; let skipped = 0;
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * W + i, b2 = a + 1, c = a + W + 1, d = a + W;
    if (good[a] && good[b2] && good[c] && good[d]) F.push(a, b2, c, a, c, d); else skipped++;
  }
  const nF = F.length / 3; if (skipped) issues.push({ sev: 'warn', code: 'holes', msg: skipped + ' quads were left out because a corner has no valid value, so the surface has holes.', region: 'near the invalid points above', fix: 'Restrict the range to where the formula is defined.' });
  /* bounding box, centroid */
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let k = 0; k < n; k++) if (good[k]) for (let q = 0; q < 3; q++) { const v = V[k * 3 + q]; if (v < lo[q]) lo[q] = v; if (v > hi[q]) hi[q] = v; }
  const diag = Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) || 1;
  /* face normals, area, degenerate triangles */
  const FN = new Float64Array(nF * 3); let area = 0, degenerate = 0; const tiny = 1e-10 * diag * diag;
  for (let f = 0; f < nF; f++) {
    const a = F[f * 3] * 3, b2 = F[f * 3 + 1] * 3, c = F[f * 3 + 2] * 3;
    const ux = V[b2] - V[a], uy = V[b2 + 1] - V[a + 1], uz = V[b2 + 2] - V[a + 2], vx = V[c] - V[a], vy = V[c + 1] - V[a + 1], vz = V[c + 2] - V[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.hypot(nx, ny, nz);
    if (l / 2 < tiny) { degenerate++; continue; }
    FN[f * 3] = nx / l; FN[f * 3 + 1] = ny / l; FN[f * 3 + 2] = nz / l; area += l / 2;
  }
  if (degenerate) issues.push({ sev: 'warn', code: 'degenerate', msg: degenerate + ' triangles have (almost) zero area, because two corners coincide. This happens at the poles of a sphere or where the surface pinches to a point. Normals there are undefined.', region: 'where the surface pinches', fix: 'This is normal at poles. Otherwise change the formula or ranges.' });
  /* folds: neighbouring quads whose normals point in nearly opposite directions */
  let folds = 0;
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const q = (j * nu + i) * 2; if (q * 3 + 5 >= FN.length) break;
    const f0 = q, f1 = (j * nu + i + 1) * 2; if (i + 1 < nu && f1 * 3 + 2 < FN.length) { const d = FN[f0 * 3] * FN[f1 * 3] + FN[f0 * 3 + 1] * FN[f1 * 3 + 1] + FN[f0 * 3 + 2] * FN[f1 * 3 + 2]; if (d < -0.5 && (FN[f0 * 3] || FN[f0 * 3 + 1] || FN[f0 * 3 + 2]) && (FN[f1 * 3] || FN[f1 * 3 + 1] || FN[f1 * 3 + 2])) folds++; }
  }
  if (folds && !skipped) issues.push({ sev: 'warn', code: 'folds', msg: folds + ' places where neighbouring faces point in nearly opposite directions (angle over about 120°). The surface folds back on itself or the sampling is too coarse there, so shading and normals are unreliable.', region: 'at the folds', fix: 'Raise the samples, or accept the fold if the shape really has a sharp crease.' });
  /* weld vertices, then edge topology */
  const q = 1e-6 * diag, key = (k) => Math.round(V[k * 3] / q) + ',' + Math.round(V[k * 3 + 1] / q) + ',' + Math.round(V[k * 3 + 2] / q), map = new Map(), id = new Int32Array(n).fill(-1); let nw = 0;
  for (let k = 0; k < n; k++) if (good[k]) { const s = key(k); let w = map.get(s); if (w === undefined) { w = nw++; map.set(s, w); } id[k] = w; }
  const edges = new Map(); let orientBad = 0, nonManifold = 0, usedF = 0;
  const add = (a, b2) => { if (a === b2) return; const lo2 = Math.min(a, b2), hi2 = Math.max(a, b2), k = lo2 * 1e7 + hi2, e = edges.get(k) || { n: 0, fw: 0 }; e.n++; if (a < b2) e.fw++; edges.set(k, e); };
  for (let f = 0; f < nF; f++) { if (!(FN[f * 3] || FN[f * 3 + 1] || FN[f * 3 + 2])) continue; usedF++; const a = id[F[f * 3]], b2 = id[F[f * 3 + 1]], c = id[F[f * 3 + 2]]; add(a, b2); add(b2, c); add(c, a); }
  let boundary = 0; edges.forEach((e) => { if (e.n === 1) boundary++; else if (e.n > 2) nonManifold++; else if (e.n === 2 && e.fw !== 1) orientBad++; });
  const closed = boundary === 0 && nonManifold === 0 && !skipped && usedF > 0, orientable = orientBad === 0;
  const chi = closed ? nw - edges.size + usedF : null;
  /* volume by the divergence theorem, valid only for a closed, consistently oriented surface */
  let volume = null, volumeWhy = '';
  if (!closed) volumeWhy = boundary ? 'the surface has an open edge (' + boundary + ' boundary edges), so it does not enclose a volume' : nonManifold ? 'three or more faces meet along an edge' : 'some faces are missing';
  else if (!orientable) volumeWhy = 'the faces are not consistently oriented (' + orientBad + ' edges disagree), which happens for one-sided surfaces such as a Klein bottle';
  else { let s = 0; for (let f = 0; f < nF; f++) { const a = F[f * 3] * 3, b2 = F[f * 3 + 1] * 3, c = F[f * 3 + 2] * 3; s += V[a] * (V[b2 + 1] * V[c + 2] - V[b2 + 2] * V[c + 1]) - V[a + 1] * (V[b2] * V[c + 2] - V[b2 + 2] * V[c]) + V[a + 2] * (V[b2] * V[c + 1] - V[b2 + 1] * V[c]); } volume = Math.abs(s) / 6; }
  if (orientBad && boundary === 0 && !nonManifold) issues.push({ sev: 'info', code: 'nonorientable', msg: 'The faces cannot all be given a consistent inside/outside direction (' + orientBad + ' edges disagree). That is a property of the shape, such as a Möbius strip or Klein bottle, not necessarily a mistake.', region: 'whole surface', fix: 'No action needed unless you expected a normal closed shape.' });
  if (nonManifold) issues.push({ sev: 'warn', code: 'nonmanifold', msg: nonManifold + ' edges are shared by three or more faces. The surface passes through itself or touches itself (an immersed Klein bottle must do this in 3D), so it is not a simple surface.', region: 'along those edges', fix: 'Check the formula for places where the surface touches itself.' });
  return { ok: true, issues, V, F: new Uint32Array(F), good, nu, nv, W, H, FN, stats: { vertices: n - bad, faces: nF, quads: nF / 2, bbox: { lo, hi, size: [hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]] }, diag, area, degenerate, folds, welded: nw, edges: edges.size, boundary, closed, orientable, nonManifold, chi, volume, volumeWhy } };
}

/* ---------- exact formulas, only when their assumptions hold ---------- */
function exactFor(S) {
  const full = (a, b2) => Math.abs(a) < 1e-9 && Math.abs(b2 - TAU) < 1e-9;
  if (S.kind === 'torus' && norm(S.fx) === norm(PRESETS.torus.fx) && norm(S.fy) === norm(PRESETS.torus.fy) && norm(S.fz) === norm(PRESETS.torus.fz)) {
    const R = S.P.R, r = S.P.r;
    if (!(R > r && r > 0)) return { applies: false, why: 'The torus formulas need R > r > 0 (here R = ' + R + ', r = ' + r + ').' };
    if (!full(S.umin, S.umax) || !full(S.vmin, S.vmax)) return { applies: false, why: 'The torus formulas are for the whole ring: u and v must both run from 0 to 2π.' };
    return { applies: true, name: 'ring torus', area: 4 * Math.PI * Math.PI * R * r, volume: 2 * Math.PI * Math.PI * R * r * r, eqA: 'A = 4π²Rr', eqV: 'V = 2π²Rr²' };
  }
  if (S.kind === 'sphere' && norm(S.fx) === norm(PRESETS.sphere.fx) && norm(S.fy) === norm(PRESETS.sphere.fy) && norm(S.fz) === norm(PRESETS.sphere.fz)) {
    const R = S.P.R; if (!(R > 0)) return { applies: false, why: 'A sphere needs R > 0.' };
    if (!full(S.umin, S.umax) || Math.abs(S.vmin) > 1e-9 || Math.abs(S.vmax - Math.PI) > 1e-9) return { applies: false, why: 'The sphere formulas need u from 0 to 2π and v from 0 to π.' };
    return { applies: true, name: 'sphere', area: 4 * Math.PI * R * R, volume: 4 / 3 * Math.PI * R * R * R, eqA: 'A = 4πR²', eqV: 'V = 4πR³ ÷ 3' };
  }
  return { applies: false, why: 'No standard closed-form area or volume is known for this equation, so only the mesh estimates are shown.' };
}

/* ---------- camera pipeline: model, view, projection, screen ---------- */
function projectAll(mesh, M, cam, W, H) {
  const { view, proj, vp } = cameraMatrices(cam, W / H), MV = mul(view, M), n = mesh.V.length / 3, out = new Float32Array(n * 4), ve = new Float32Array(n * 3);
  const full = mul(vp, M);
  for (let k = 0; k < n; k++) {
    if (!mesh.good[k]) { out[k * 4 + 3] = NaN; continue; }
    const x = mesh.V[k * 3], y = mesh.V[k * 3 + 1], z = mesh.V[k * 3 + 2], c = apply(full, x, y, z), e = apply(MV, x, y, z);
    if (c[3] <= 1e-6) { out[k * 4 + 3] = NaN; continue; }
    ve[k * 3] = e[0]; ve[k * 3 + 1] = e[1]; ve[k * 3 + 2] = e[2]; out[k * 4] = (c[0] / c[3] * 0.5 + 0.5) * W; out[k * 4 + 1] = (1 - (c[1] / c[3] * 0.5 + 0.5)) * H; out[k * 4 + 2] = -e[2]; out[k * 4 + 3] = 1;
  }
  return { s: out, ve, view, proj, vp, MV };
}

root.M3D = { ident, mul, translate, scale, rotX, rotY, rotZ, perspective, lookAt, apply, det3, modelMatrix, cameraMatrices, PRESETS, VARS, defaults, validate, buildMesh, exactFor, projectAll, TAU };
if (typeof module !== 'undefined') module.exports = root.M3D;
})(typeof window !== 'undefined' ? window : globalThis);
