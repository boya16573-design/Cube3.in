// Measurement engine tests. Run: node tests/meas.test.js
require('../src/meas.js'); const X = globalThis.MEAS; let pass = 0, fail = 0;
const t = (n, f) => { try { f(); pass++; console.log('  ok   ' + n); } catch (e) { fail++; console.log('  FAIL ' + n + '\n       ' + e.message); } };
const eq = (a, b, tol, m) => { if (!(Math.abs(a - b) <= tol)) throw new Error((m || '') + ' expected ' + b + ' ± ' + tol + ', got ' + a); };
const ok = (c, m) => { if (!c) throw new Error(m || 'assertion failed'); };

console.log('Geometry');
t('distance 3-4-5', () => eq(X.dist([0, 0], [3, 4]), 5, 1e-12));
t('distance with a bad coordinate is NaN', () => ok(isNaN(X.dist([0, NaN], [1, 1]))));
t('angles: 90, 45, 180', () => { eq(X.angle([1, 0], [0, 0], [0, 1]), 90, 1e-9); eq(X.angle([1, 0], [0, 0], [1, 1]), 45, 1e-9); eq(X.angle([1, 0], [0, 0], [-1, 0]), 180, 1e-9); });
t('angle with a zero-length arm is NaN, not 0', () => ok(isNaN(X.angle([0, 0], [0, 0], [1, 1]))));
t('polygon area: unit square, triangle, L-shape, orientation independent', () => { eq(X.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1]]), 1, 1e-12); eq(X.polygonArea([[0, 0], [4, 0], [0, 3]]), 6, 1e-12); eq(X.polygonArea([[0, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2]]), 3, 1e-12); eq(X.polygonArea([[0, 1], [1, 1], [1, 0], [0, 0]]), 1, 1e-12); });
t('perimeter open vs closed', () => { eq(X.perimeter([[0, 0], [3, 0], [3, 4]], false), 7, 1e-12); eq(X.perimeter([[0, 0], [3, 0], [3, 4]], true), 12, 1e-12); });
t('self-crossing polygon is detected', () => { ok(!X.isSimple([[0, 0], [1, 1], [1, 0], [0, 1]])); ok(X.isSimple([[0, 0], [1, 0], [1, 1], [0, 1]])); });
t('circle through 3 points; collinear points give null', () => { const c = X.circleFrom3([1, 0], [0, 1], [-1, 0]); eq(c.r, 1, 1e-12); eq(c.cx, 0, 1e-12); ok(X.circleFrom3([0, 0], [1, 1], [2, 2]) === null); });
t('least-squares circle recovers centre and radius from noisy points', () => { const r = X.rng(5), P = []; for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283; P.push([100 + 40 * Math.cos(a) + 0.2 * X.gauss(r), 50 + 40 * Math.sin(a) + 0.2 * X.gauss(r)]); } const c = X.fitCircle(P); eq(c.cx, 100, 0.3); eq(c.cy, 50, 0.3); eq(c.r, 40, 0.3); });

console.log('Units');
t('1 in = 2.54 cm; 1 m = 1000 mm; area 1 m² = 10000 cm²', () => { eq(X.convert(1, 'in', 'cm'), 2.54, 1e-12); eq(X.convert(1, 'm', 'mm'), 1000, 1e-9); eq(X.convert(1, 'm', 'cm', 2), 10000, 1e-6); });
t('unknown unit and NaN give NaN', () => { ok(isNaN(X.convert(1, 'furlong', 'm'))); ok(isNaN(X.convert(NaN, 'm', 'cm'))); });

console.log('Coordinate mapping (zoom, pan, crop)');
t('screen<->image round trip', () => { const V = { s: 1.7, tx: 33, ty: -12 }, p = [123.4, 56.7], q = X.toImage(V, X.toScreen(V, p)); eq(q[0], p[0], 1e-9); eq(q[1], p[1], 1e-9); });
t('zoom keeps the point under the cursor fixed', () => { const V = X.fitView(4000, 3000, 800, 600), cur = [410, 250], img = X.toImage(V, cur), V2 = X.zoomAt(V, cur[0], cur[1], 3.3), back = X.toScreen(V2, img); eq(back[0], cur[0], 1e-9); eq(back[1], cur[1], 1e-9); });
t('fit view centres the picture and fits inside', () => { const V = X.fitView(2000, 1000, 800, 600), a = X.toScreen(V, [0, 0]), b = X.toScreen(V, [2000, 1000]); eq(a[0], 0, 1e-9); eq(b[0], 800, 1e-9); eq(a[1] + b[1], 600, 1e-9); });
t('measurement points stay in original-image pixels when the picture is cropped', () => { const c = X.cropToImage({ x: 100, y: 50 }, [10, 20]); eq(c[0], 110, 0); eq(c[1], 70, 0); });
t('same measurement at different screen sizes (phone vs desktop)', () => { const p = [1234, 567], q = [2345, 1000]; const d = (vw, vh) => { const V = X.fitView(4000, 3000, vw, vh), a = X.toImage(V, X.toScreen(V, p)), b = X.toImage(V, X.toScreen(V, q)); return X.dist(a, b); }; eq(d(390, 300), d(1600, 900), 1e-9); });

console.log('Homography and plane measurement');
const Htrue = [0.9, 0.1, 40, -0.05, 0.8, 25, 0.0004, 0.0002, 1];
const planePts = [[0, 0], [29.7, 0], [29.7, 21], [0, 21], [15, 10], [5, 18]].map((p) => p), imgPts = planePts.map((p) => X.applyH(Htrue, p).slice(0, 2));
t('fitHomography recovers a known homography from 6 points', () => { const H = X.fitHomography(planePts, imgPts); planePts.forEach((p, i) => { const q = X.applyH(H, p); eq(q[0], imgPts[i][0], 1e-6); eq(q[1], imgPts[i][1], 1e-6); }); });
const Himg2plane = X.fitHomography(imgPts.slice(0, 4), planePts.slice(0, 4)), plane = { H: Himg2plane, unit: 'cm' };
const toImg = (p) => X.applyH(Htrue, p).slice(0, 2);
t('calibrated distance: 20 cm recovered', () => { const m = X.measure('distance', [toImg([3, 2]), toImg([15, 18])], plane, 0.0001); eq(m.value, 20, 1e-5); ok(m.kind === 'calibrated' && m.unit === 'cm'); });
t('a right angle on the plane is recovered even though the picture shows it differently', () => { const a = toImg([5, 5]), b = toImg([5, 15]), c = toImg([20, 15]); ok(Math.abs(X.angle(a, b, c) - 90) > 1, 'picture angle should differ'); const m = X.measure('angle', [a, b, c], plane, 0.0001); eq(m.value, 90, 1e-4); });
t('calibrated polygon area: 10 x 5 cm rectangle = 50 cm², perimeter 30 cm', () => { const m = X.measure('polygon', [[2, 2], [12, 2], [12, 7], [2, 7]].map(toImg), plane, 0.0001); eq(m.value, 50, 1e-4); eq(m.value2.value, 30, 1e-4); ok(m.unit === 'cm²'); });
t('circle of radius 4 cm on the plane', () => { const P = [0, 1.57, 3.14, 4.71].map((a) => toImg([15 + 4 * Math.cos(a), 10 + 4 * Math.sin(a)])); const m = X.measure('circle', P, plane, 0.0001); eq(m.value, 4, 0.01); });
t('with 1 px click noise the 95% interval contains the truth', () => { const m = X.measure('distance', [toImg([3, 2]), toImg([15, 18])], plane, 1); ok(m.unc.lo <= 20 && m.unc.hi >= 20, m.unc.lo + '..' + m.unc.hi); });
t('no calibration: value is Unknown, never presented in cm', () => { const m = X.measure('distance', [[0, 0], [30, 40]], null, 1); ok(m.kind === 'unknown' && m.value === null && m.px.value === 50 && m.px.kind === 'measured'); });
t('zero-length line, collinear polygon, collinear circle are invalid with reasons', () => { ok(X.measure('distance', [[1, 1], [1, 1]], null).kind === 'invalid'); ok(X.measure('polygon', [[0, 0], [1, 1], [2, 2]], null).kind === 'invalid'); ok(X.measure('circle', [[0, 0], [1, 1], [2, 2]], null).kind === 'invalid'); ok(X.measure('angle', [[0, 0], [0, 0], [1, 1]], null).kind === 'invalid'); });
t('too few points and non-numeric points are invalid', () => { ok(X.measure('polygon', [[0, 0], [1, 1]], null).kind === 'invalid'); ok(X.measure('distance', [[0, NaN], [1, 1]], null).kind === 'invalid'); });
t('a bow-tie polygon gets a warning', () => { const m = X.measure('polygon', [[0, 0], [10, 12], [10, 0], [0, 10]], null); ok(m.issues.some((s) => /crosses/.test(s))); });
t('a point beyond the plane horizon is rejected', () => { const Hh = [1, 0, 0, 0, 1, 0, 0.01, 0, 1], m = X.measure('distance', [[10, 10], [-200, 10]], { H: Hh, unit: 'cm' }, 1); ok(m.kind === 'invalid' && /horizon/.test(m.issues[0])); });
t('Monte Carlo sd of a distance equals sigma*sqrt(2) within 12%', () => { const r = X.monteCarlo((P) => X.dist(P[0], P[1]), [[0, 0], [100, 0]], 1.5, 4000, 3); eq(r.sd / X.distanceSd(1.5), 1, 0.12); });

console.log('Export');
t('CSV escapes commas, quotes and newlines and carries units and kinds', () => { const m = X.measure('distance', [[0, 0], [30, 40]], null, 1); m.id = 'M1'; m.label = 'a "b", c\nd'; const csv = X.exportCSV([m], { source: 'x.jpg' }); ok(/"a ""b"", c\nd"/.test(csv)); ok(/unknown/.test(csv) && /^# source: x.jpg/.test(csv)); const rows = csv.trim().split('\n'); ok(rows[1].startsWith('id,type')); });
t('JSON export round-trips, with null (not 0) for unknown values', () => { const m = X.measure('distance', [[0, 0], [30, 40]], null, 1); m.id = 'M1'; const j = JSON.parse(X.exportJSON([m], { a: 1 })); ok(j.measurements[0].value === null && j.measurements[0].kind === 'unknown' && j.measurements[0].pixel.value === 50 && j.kinds.length === 7); });

console.log('Perspective rectification');
function pattern(x, y) { return ((Math.floor(x / 5) + Math.floor(y / 5)) & 1) ? 230 : 40; } // checker on the plane, 5-unit squares, 0..100
t('rectified image matches the plane texture (ground truth) away from edges', () => {
  const Hp2i = [1.1, 0.25, 60, -0.1, 0.95, 40, 0.0006, 0.0003, 1], w = 320, h = 240, img = new Uint8ClampedArray(w * h * 4), Hi = X.inv3(Hp2i);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const q = X.applyH(Hi, [x + 0.5, y + 0.5]), v = (q[0] >= 0 && q[0] < 100 && q[1] >= 0 && q[1] < 100) ? pattern(q[0], q[1]) : 128; const o = (y * w + x) * 4; img[o] = img[o + 1] = img[o + 2] = v; img[o + 3] = 255; }
  const quad = [[0, 0], [100, 0], [100, 100], [0, 100]].map((p) => X.applyH(Hp2i, [p[0], p[1]]).slice(0, 2)), out = X.rectify(img, w, h, quad, 200, 200); ok(out);
  let bad = 0, n = 0; for (let y = 8; y < 192; y++) for (let x = 8; x < 192; x++) { const gx = (x + 0.5) / 2, gy = (y + 0.5) / 2; const near = Math.abs(gx % 5 - 2.5) > 2.0 || Math.abs(gy % 5 - 2.5) > 2.0; if (near) continue; n++; if (Math.abs(out.data[(y * 200 + x) * 4] - pattern(gx, gy)) > 40) bad++; } ok(bad / n < 0.03, 'mismatch ' + (bad / n * 100).toFixed(2) + '% of ' + n);
});
t('quad validation: bow-tie, concave, tiny, extreme', () => { ok(X.checkQuad([[0, 0], [100, 100], [100, 0], [0, 100]], 640, 480).some((i) => i.sev === 'error')); ok(X.checkQuad([[0, 0], [100, 0], [20, 20], [0, 100]], 640, 480).some((i) => /convex/.test(i.msg))); ok(X.checkQuad([[10, 10], [20, 10], [20, 20], [10, 20]], 640, 480).some((i) => /only/.test(i.msg))); ok(X.checkQuad([[0, 0], [600, 0], [600, 40], [0, 40]], 640, 480).some((i) => /extreme/.test(i.msg))); ok(X.checkQuad([[100, 100], [400, 100], [400, 400], [100, 400]], 640, 480).length === 0); });

console.log('Video tracking (Lucas-Kanade)');
function texture(w, h, seed) { const r = X.rng(seed), base = new Float32Array(w * h); for (let i = 0; i < w * h; i++) base[i] = r() * 255; const g = new Float32Array(w * h); for (let pass = 0; pass < 2; pass++) { const src = pass ? g.slice() : base, dst = pass ? g : g; for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { let s = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) s += src[(y + j) * w + x + i]; dst[y * w + x] = s / 9; } if (!pass) g.set(base); } return g; }
function smoothField(x, y) { return 128 + 60 * Math.sin(x * 0.21 + 0.3) * Math.cos(y * 0.17) + 40 * Math.sin((x + y) * 0.09) + 25 * Math.cos(x * 0.43 - y * 0.31); }
function frame(w, h, dx, dy) { const rgba = new Uint8ClampedArray(w * h * 4); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const v = smoothField(x - dx, y - dy), o = (y * w + x) * 4; rgba[o] = rgba[o + 1] = rgba[o + 2] = v; rgba[o + 3] = 255; } return rgba; }
t('recovers a sub-pixel shift (2.37, -1.62) within 0.1 px, with small forward-backward error', () => { const w = 200, h = 160, A = X.pyramid(X.toGrayFull(frame(w, h, 0, 0), w, h), 3), B = X.pyramid(X.toGrayFull(frame(w, h, 2.37, -1.62), w, h), 3), r = X.track(A, B, [100, 80]); ok(r.ok, r.why); eq(r.x - 100, 2.37, 0.1); eq(r.y - 80, -1.62, 0.1); ok(r.fb < 0.2, 'fb ' + r.fb); });
t('recovers a large shift (11, 7) with the pyramid', () => { const w = 200, h = 160, A = X.pyramid(X.toGrayFull(frame(w, h, 0, 0), w, h), 4), B = X.pyramid(X.toGrayFull(frame(w, h, 11, 7), w, h), 4), r = X.track(A, B, [100, 80]); ok(r.ok, r.why); eq(r.x - 100, 11, 0.3); eq(r.y - 80, 7, 0.3); });
t('a flat region is reported lost with a reason (no texture)', () => { const w = 100, h = 100, f = new Uint8ClampedArray(w * h * 4).fill(120), A = X.pyramid(X.toGrayFull(f, w, h), 3), r = X.track(A, A, [50, 50]); ok(!r.ok && /texture|window/i.test(r.why), r.why); });
t('a point near the border is lost instead of extrapolated', () => { const w = 100, h = 100, A = X.pyramid(X.toGrayFull(frame(w, h, 0, 0), w, h), 3), r = X.track(A, A, [2, 50]); ok(!r.ok); });
t('an unrelated next frame is rejected by the forward-backward check or residual', () => { const w = 200, h = 160, A = X.pyramid(X.toGrayFull(frame(w, h, 0, 0), w, h), 3), rr = X.rng(8), g = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) { const v = rr() * 255; g[i * 4] = g[i * 4 + 1] = g[i * 4 + 2] = v; g[i * 4 + 3] = 255; } const B = X.pyramid(X.toGrayFull(g, w, h), 3), r = X.track(A, B, [100, 80]); ok(!r.ok, 'should be lost'); });

console.log('Camera calibration (synthetic ground truth)');
function board(nx, ny, sq) { const o = []; for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) o.push([i * sq, j * sq]); return o; }
function makeViews(Kt, k1, k2, noise, seed, nviews) { const r = X.rng(seed), obj = board(9, 6, 25), poses = [[0.4, 0.1, 0.05, -100, -60, 520], [-0.3, 0.35, 0.1, -120, -70, 560], [0.2, -0.4, -0.1, -90, -50, 600], [0.5, -0.2, 0.2, -110, -80, 540], [-0.45, -0.25, 0.05, -100, -60, 580], [0.1, 0.5, -0.15, -130, -70, 610], [-0.15, -0.5, 0.25, -90, -70, 570], [0.35, 0.3, 0.4, -110, -60, 600], [-0.5, 0.1, -0.3, -100, -50, 640], [0.05, 0.0, 0.6, -100, -70, 500]].slice(0, nviews || 10);
  return poses.map((p) => { const R = X.rodrigues([p[0], p[1], p[2]]), t = [p[3], p[4], p[5]]; return { obj, img: obj.map((P) => { const q = X.projectPt(Kt, k1, k2, R, t, [P[0], P[1], 0]); return [q[0] + noise * X.gauss(r), q[1] + noise * X.gauss(r)]; }) }; }); }
const Kt = { fx: 800, fy: 805, cx: 322, cy: 238, s: 0 };
t('recovers focal length, principal point and distortion from 10 views (noise 0.2 px)', () => { const c = X.calibrate(makeViews(Kt, -0.15, 0.03, 0.2, 21), { w: 640, h: 480 }); ok(c.ok, c.reason); eq(c.K.fx / 800, 1, 0.01, 'fx'); eq(c.K.fy / 805, 1, 0.01, 'fy'); eq(c.K.cx, 322, 3, 'cx'); eq(c.K.cy, 238, 3, 'cy'); eq(c.dist.k1, -0.15, 0.04, 'k1'); ok(c.rms < 0.35, 'rms ' + c.rms); });
t('noise-free data gives ~zero reprojection error and exact parameters', () => { const c = X.calibrate(makeViews(Kt, -0.1, 0.02, 0, 22), { w: 640, h: 480 }); ok(c.ok); ok(c.rms < 1e-3, 'rms ' + c.rms); eq(c.K.fx, 800, 0.05); eq(c.K.cx, 322, 0.05); eq(c.dist.k1, -0.1, 1e-3); });
t('reported RMS equals the expected value for the injected noise: sigma*sqrt(2)*sqrt(dof/(2N)) (per-point Euclidean error, as OpenCV reports)', () => { const c = X.calibrate(makeViews(Kt, -0.12, 0.0, 0.5, 23), { w: 640, h: 480 }); ok(c.ok); eq(c.rms, 0.5 * Math.SQRT2 * Math.sqrt(c.dof / (2 * c.points)), 0.06); });
t('standard errors are produced and shrink with more views', () => { const a = X.calibrate(makeViews(Kt, -0.1, 0.0, 0.4, 24, 4), { w: 640, h: 480 }), b = X.calibrate(makeViews(Kt, -0.1, 0.0, 0.4, 24, 10), { w: 640, h: 480 }); ok(a.ok && b.ok && a.sd && b.sd); ok(b.sd.fx < a.sd.fx, 'sd 10 views ' + b.sd.fx + ' vs 4 views ' + a.sd.fx); });
t('fewer than 3 views is refused with an instruction', () => { const c = X.calibrate(makeViews(Kt, 0, 0, 0.1, 25, 2), { w: 640, h: 480 }); ok(!c.ok && /3 usable views/.test(c.reason)); });
t('views that are all parallel (no tilt) are refused or flagged, not silently wrong', () => { const obj = board(9, 6, 25), r = X.rng(2), views = [0, 1, 2, 3].map((k) => ({ obj, img: obj.map((P) => { const q = X.projectPt(Kt, 0, 0, X.rodrigues([0, 0, 0.1 * k]), [-100, -60, 500 + 30 * k], [P[0], P[1], 0]); return [q[0] + 0.1 * X.gauss(r), q[1] + 0.1 * X.gauss(r)]; }) })); const c = X.calibrate(views, { w: 640, h: 480 }); ok(!c.ok || c.warnings.length > 0 || c.sd.fx > 20, 'flat views must not look well-conditioned'); });
t('a corrupted view raises the per-view error warning', () => { const v = makeViews(Kt, -0.1, 0.0, 0.2, 26); v[4].img[10][0] += 25; v[4].img[30][1] -= 20; const c = X.calibrate(v, { w: 640, h: 480 }); ok(c.ok && c.perView[4] > 2 * c.perView[0] && c.warnings.some((w) => /view has an error/.test(w) || /high/.test(w))); });
t('undistort inverts the distortion model', () => { const c = X.calibrate(makeViews(Kt, -0.15, 0.03, 0, 27), { w: 640, h: 480 }), R = X.rodrigues([0.1, 0.2, 0]), tt = [-50, -30, 500], P = [20, 30, 0], d = X.projectPt(Kt, -0.15, 0.03, R, tt, P), u = X.projectPt(Kt, 0, 0, R, tt, P), q = X.undistortPt(c, d); eq(q[0], u[0], 0.05); eq(q[1], u[1], 0.05); });

console.log('Corner refinement');
t('sub-pixel corner of a soft checker is found within 0.06 px from a 3 px offset start', () => { const w = 60, h = 60, cx = 30.37, cy = 29.81, g = new Float32Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) g[y * w + x] = 128 + 100 * Math.tanh(0.7 * (x + 0.5 - cx - 0.5)) * Math.tanh(0.7 * (y + 0.5 - cy - 0.5)); const r = X.refineCorner({ g, w, h }, [33, 27], 6); ok(r.ok); eq(r.x, cx, 0.06); eq(r.y, cy, 0.06); });
t('a flat patch is not "refined" (returns ok=false)', () => { const w = 40, h = 40, g = new Float32Array(w * h).fill(100); ok(!X.refineCorner({ g, w, h }, [20, 20], 5).ok); });
t('predicted grid reproduces the board corners through perspective', () => { const Hh = [1.1, 0.25, 60, -0.1, 0.95, 40, 0.0006, 0.0003, 1], P = (i, j) => X.applyH(Hh, [i, j]).slice(0, 2), q = [P(0, 0), P(8, 0), P(8, 5), P(0, 5)], g = X.predictGrid(q, 9, 6); eq(g.length, 54, 0); eq(g[13][0], P(4, 1)[0], 1e-6); eq(g[13][1], P(4, 1)[1], 1e-6); });

console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
