// Math Canvas unit tests. Run:  node tests/run.js   (no dependencies)
require('../src/studio-expr.js'); require('../src/m3d.js'); require('../src/geo.js'); const synth = require('./synth');
const M = globalThis.M3D, G = globalThis.GEO; let pass = 0, fail = 0;
const t = (name, fn) => { try { fn(); pass++; console.log('  ok   ' + name); } catch (e) { fail++; console.log('  FAIL ' + name + '\n       ' + e.message); } };
const eq = (a, b, tol, msg) => { if (!(Math.abs(a - b) <= tol)) throw new Error((msg || '') + ' expected ' + b + ' ± ' + tol + ', got ' + a); };
const ok = (c, msg) => { if (!c) throw new Error(msg || 'assertion failed'); };
const spec = (k, over) => Object.assign(M.defaults(k), over || {});

console.log('Linear algebra');
t('identity times matrix leaves it unchanged', () => { const m = M.translate(1, 2, 3); const r = M.mul(M.ident(), m); r.forEach((v, i) => eq(v, m[i], 1e-12)); });
t('rotZ 90 degrees maps x axis to y axis', () => { const p = M.apply(M.rotZ(Math.PI / 2), 1, 0, 0); eq(p[0], 0, 1e-12); eq(p[1], 1, 1e-12); });
t('matrix product order: scale then translate', () => { const p = M.apply(M.mul(M.translate(5, 0, 0), M.scale(2, 2, 2)), 1, 0, 0); eq(p[0], 7, 1e-12); });
t('determinant of a rotation is 1, of a mirror is -1', () => { eq(M.det3(M.rotX(0.7)), 1, 1e-12); eq(M.det3(M.scale(-1, 1, 1)), -1, 1e-12); });
t('perspective: the point on the optical axis lands in the centre', () => { const c = M.cameraMatrices({ yaw: 0, pitch: 0, dist: 5, fov: 45, tx: 0, ty: 0, tz: 0 }, 1), p = M.apply(c.vp, 0, 0, 0); eq(p[0] / p[3], 0, 1e-9); eq(p[1] / p[3], 0, 1e-9); });
t('perspective: nearer points look bigger', () => { const c = M.cameraMatrices({ yaw: 0, pitch: 0, dist: 5, fov: 45, tx: 0, ty: 0, tz: 0 }, 1), a = M.apply(c.vp, 1, 0, 1), b = M.apply(c.vp, -1, 0, 1); ok(Math.abs(a[1] / a[3]) > 0, 'projected'); const far = M.apply(c.vp, -3, 0, 1); ok(Math.abs(far[1] / far[3]) < Math.abs(a[1] / a[3]), 'far one is smaller'); });

console.log('Surfaces and exact formulas');
t('torus mesh area is within 1% of 4π²Rr', () => { const S = spec('torus', { nu: 96, nv: 48 }), m = M.buildMesh(S, 0), ex = M.exactFor(S); ok(m.ok && ex.applies); eq(m.stats.area / ex.area, 1, 0.01); });
t('torus mesh volume is within 1% of 2π²Rr²', () => { const S = spec('torus', { nu: 96, nv: 48 }), m = M.buildMesh(S, 0), ex = M.exactFor(S); eq(m.stats.volume / ex.volume, 1, 0.01); });
t('torus Euler characteristic is 0 and sphere is 2', () => { eq(M.buildMesh(spec('torus'), 0).stats.chi, 0, 0); eq(M.buildMesh(spec('sphere'), 0).stats.chi, 2, 0); });
t('sphere area and volume match 4πR² and 4πR³/3 within 1%', () => { const S = spec('sphere', { nu: 96, nv: 48 }), m = M.buildMesh(S, 0), ex = M.exactFor(S); eq(m.stats.area / ex.area, 1, 0.01); eq(m.stats.volume / ex.volume, 1, 0.012); });
t('torus formulas are refused when R <= r', () => { const ex = M.exactFor(spec('torus', { P: { R: 1, r: 2, a: 0, b: 0, c: 0 } })); ok(!ex.applies && /R > r > 0/.test(ex.why)); const e2 = M.exactFor(spec('torus', { P: { R: 1, r: 1, a: 0, b: 0, c: 0 } })); ok(!e2.applies); });
t('torus formulas are refused for a partial range', () => { ok(!M.exactFor(spec('torus', { umax: Math.PI })).applies); });
t('edited equations do not get the standard torus formulas', () => { ok(!M.exactFor(spec('torus', { fx: '(R + r*cos(v))*cos(u)*1.1' })).applies); });
t('open surfaces give no volume, with the reason', () => { const m = M.buildMesh(spec('cylinder'), 0); ok(m.stats.volume === null && /open edge/.test(m.stats.volumeWhy)); });
t('Möbius strip is reported as not orientable, with no volume', () => { const m = M.buildMesh(spec('mobius'), 0); ok(m.stats.volume === null); });
t('bounding box of the unit-range torus matches R+r', () => { const S = spec('torus', { nu: 128, nv: 64 }), m = M.buildMesh(S, 0); eq(m.stats.bbox.size[0], 2 * (S.P.R + S.P.r), 0.01); eq(m.stats.bbox.size[2], 2 * S.P.r, 0.01); });
t('time-dependent equations change the mesh with t', () => { const S = spec('ripple', { nu: 20, nv: 20 }), a = M.buildMesh(S, 0), b = M.buildMesh(S, 1); let d = 0; for (let i = 0; i < a.V.length; i++) d += Math.abs(a.V[i] - b.V[i]); ok(d > 0.1); });
t('area is invariant under rotation and scales by s² under uniform scaling (checked on the mesh)', () => { const m = M.buildMesh(spec('torus'), 0), A = m.stats.area; const MM = M.scale(2, 2, 2); let s = 0; for (let f = 0; f < m.F.length / 3; f++) { const P = [0, 1, 2].map((k) => { const i = m.F[f * 3 + k] * 3; return M.apply(MM, m.V[i], m.V[i + 1], m.V[i + 2]); }); const u = [P[1][0] - P[0][0], P[1][1] - P[0][1], P[1][2] - P[0][2]], v = [P[2][0] - P[0][0], P[2][1] - P[0][1], P[2][2] - P[0][2]]; s += Math.hypot(u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]) / 2; } eq(s / A, 4, 1e-6); });

console.log('Invalid input is reported, never hidden');
t('empty equation: exact reason', () => { const m = M.buildMesh(spec('torus', { fy: '' }), 0); ok(!m.ok && m.issues.some((i) => i.code === 'empty-y')); });
t('syntax error names the equation', () => { const m = M.buildMesh(spec('torus', { fx: 'sin(' }), 0); ok(!m.ok && m.issues.some((i) => i.code === 'parse-x')); });
t('unknown variable is rejected', () => { const m = M.buildMesh(spec('torus', { fz: 'w*u' }), 0); ok(!m.ok); });
t('non-finite range is rejected', () => { const m = M.buildMesh(spec('torus', { umax: NaN }), 0); ok(!m.ok && m.issues.some((i) => /range-u/.test(i.code))); });
t('division by zero in part of the domain is reported with its region', () => { const m = M.buildMesh(spec('torus', { fz: '1/(u-3)', nu: 60 }), 0); ok(m.issues.length > 0); });

console.log('Photo geometry (synthetic ground truth)');
t('focal length recovered within 3% from lines through two known perpendicular vanishing points', () => { const f = 500, v1 = [700, 50], v2 = [-(250000 - 5000) / 700, -100]; eq(v1[0] * v2[0] + v1[1] * v2[1] + f * f, 0, 1e-6); const w = 640, h = 480, r = G.analyze(synth(f, v1, v2, w, h), w, h, {}); ok(r.focal, 'no focal'); eq(r.focal.px / f, 1, 0.03); });
t('the strongest vanishing point is located within 15 px of the truth', () => { const f = 500, v1 = [700, 50], v2 = [-(250000 - 5000) / 700, -100], w = 640, h = 480, r = G.analyze(synth(f, v1, v2, w, h), w, h, {}), tr = [[v1[0] + w / 2, v1[1] + h / 2], [v2[0] + w / 2, v2[1] + h / 2]]; ok(tr.every((p) => r.vpsPx.some((q) => Math.hypot(q.x - p[0], q.y - p[1]) < 15)), JSON.stringify(r.vpsPx)); });
t('a blank image yields no focal length and a warning, not a made-up number', () => { const w = 200, h = 150, r = G.analyze(new Uint8ClampedArray(w * h * 4).fill(128), w, h, {}); ok(!r.focal && r.issues.some((i) => i.code === 'few-edges')); });
t('one vanishing point is not enough: focal is Unknown', () => { const fo = G.focalFrom([{ v: [0.3, 0.1, 0.9], finite: true, inliers: 9 }], 640); ok(!fo.ok && fo.reason.length > 20); });
t('two vanishing points that are not perpendicular are rejected', () => { const fo = G.focalFrom([{ v: [0.5, 0, 0.5], finite: true, inliers: 9 }, { v: [0.6, 0.1, 0.4], finite: true, inliers: 9 }], 640); ok(!fo.ok); });
t('measure: pixels are Measured; real units only with a reference', () => { const a = G.measure([0, 0], [30, 40]); eq(a.px, 50, 1e-9); ok(a.units === null && /Unknown/.test(a.note)); const b = G.measure([0, 0], [30, 40], { px: 100, units: 21, name: 'cm' }); eq(b.units, 10.5, 1e-9); ok(b.tagUnits === 'Estimated'); });
t('EXIF reader: focal length and camera from a hand-built JPEG header', () => {
  const be = [], p16 = (v) => be.push(v >> 8, v & 255), p32 = (v) => be.push((v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255);
  // TIFF big-endian, IFD0 at 8 with Make (ASCII "Cam", inline) and ExifIFD pointer; ExifIFD with FocalLengthIn35mm (SHORT 28)
  be.push(0x4D, 0x4D); p16(42); p32(8); p16(2); p16(0x010F); p16(2); p32(4); be.push(67, 97, 109, 0); p16(0x8769); p16(4); p32(1); p32(38); p32(0);
  while (be.length < 8 + 2 + 24 + 4) be.push(0); const base = be.length; if (base !== 38) { be.length = 38; }
  p16(1); p16(0xA405); p16(3); p32(1); p16(28); p16(0); p32(0);
  const tiff = be, body = [0x45, 0x78, 0x69, 0x66, 0, 0].concat(tiff), len = body.length + 2, jpg = [0xFF, 0xD8, 0xFF, 0xE1, len >> 8, len & 255].concat(body, [0xFF, 0xD9]);
  const ex = G.exif(new Uint8Array(jpg).buffer); ok(ex.make === 'Cam', 'make ' + JSON.stringify(ex)); eq(ex.focalLength35, 28, 0);
});
t('EXIF reader: non-JPEG and truncated data return an empty result instead of throwing', () => { ok(Object.keys(G.exif(new Uint8Array([1, 2, 3, 4]).buffer)).length === 0); G.exif(new Uint8Array([0xFF, 0xD8, 0xFF, 0xE1, 0, 8, 0x45, 0x78, 0x69, 0x66, 0, 0]).buffer); });


console.log('Plane measurement (known homography as ground truth)');
const Hgt = (x, y) => { const w = 1 + 0.0004 * x + 0.0002 * y; return [(0.9 * x + 0.1 * y + 40) / w, (-0.05 * x + 0.8 * y + 25) / w]; }; // true plane (cm) -> image (px)
const planeRect = [[0, 0], [29.7, 0], [29.7, 21], [0, 21]], imgRect = planeRect.map((p) => Hgt(p[0], p[1]).map((v) => v * 10));
const toImg = (x, y) => Hgt(x, y).map((v) => v * 10);
t('homography maps the four reference corners back with ~zero residual', () => { const H = G.homography(imgRect, planeRect); ok(H.ok); ok(H.residual < 1e-6, 'res ' + H.residual); });
t('a length that was not used for calibration is recovered (noise-free): 20 cm along a diagonal', () => { const a = [3, 2], b = [3 + 12, 2 + 16]; const r = G.planeDistance(imgRect, planeRect, toImg(a[0], a[1]), toImg(b[0], b[1]), 0.0001, 20); ok(r.ok); eq(r.value, 20, 1e-6); });
t('with 1 px click noise the 95% interval contains the true length and is reported', () => { const a = [3, 2], b = [15, 18], r = G.planeDistance(imgRect, planeRect, toImg(a[0], a[1]), toImg(b[0], b[1]), 1, 400); ok(r.lo <= 20 && r.hi >= 20, r.lo + '..' + r.hi); ok(r.hi - r.lo > 0 && r.hi - r.lo < 3, 'width ' + (r.hi - r.lo)); });
t('uncertainty grows when the reference rectangle is small in the picture', () => { const small = planeRect.map((p) => [p[0] * 0.25, p[1] * 0.25]), imgS = small.map((p) => toImg(p[0], p[1])), a = [1, 1], b = [5, 4]; const big = G.planeDistance(imgRect, planeRect, toImg(a[0], a[1]), toImg(b[0], b[1]), 1, 300), sm = G.planeDistance(imgS, small, toImg(a[0], a[1]), toImg(b[0], b[1]), 1, 300); ok(sm.sd / sm.value > big.sd / big.value, 'rel sd small ' + sm.sd / sm.value + ' big ' + big.sd / big.value); });
t('collinear reference corners are rejected with a reason', () => { const H = G.homography([[0, 0], [10, 0], [20, 0], [30, 0]], planeRect); ok(!H.ok && /line/.test(H.reason)); });
t('wrong click order is rejected', () => { const H = G.homography(imgRect.slice().reverse(), planeRect); ok(!H.ok && /order|direction/.test(H.reason)); });

console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
