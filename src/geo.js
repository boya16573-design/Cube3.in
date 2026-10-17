/* Photo geometry: metadata, Sobel edges, Harris corners, Hough lines, RANSAC vanishing points, focal length.
   Pure functions (no DOM). Every output carries a tag: Measured / Estimated / Assumed / Unknown. */
(function (root) {
'use strict';
const TAGS = { M: 'Measured', E: 'Estimated', A: 'Assumed', U: 'Unknown' };

/* ---- grayscale, downscaled so the work stays fast ---- */
function toGray(rgba, w, h, maxSide) {
  const s = Math.min(1, (maxSide || 480) / Math.max(w, h)), W = Math.max(8, Math.round(w * s)), H = Math.max(8, Math.round(h * s)), g = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const sx = Math.min(w - 1, Math.floor((x + 0.5) / s)), sy = Math.min(h - 1, Math.floor((y + 0.5) / s)), i = (sy * w + sx) * 4;
    g[y * W + x] = 0.2126 * rgba[i] + 0.7152 * rgba[i + 1] + 0.0722 * rgba[i + 2];
  }
  return { g, W, H, scale: s };
}
/* ---- Sobel gradient: Gx, Gy kernels, magnitude sqrt(Gx^2+Gy^2) ---- */
function sobel(G) {
  const { g, W, H } = G, mag = new Float32Array(W * H), gx = new Float32Array(W * H), gy = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x, a = g[i - W - 1], b = g[i - W], c = g[i - W + 1], d = g[i - 1], f = g[i + 1], p = g[i + W - 1], q = g[i + W], r = g[i + W + 1];
    const X = (c + 2 * f + r) - (a + 2 * d + p), Y = (p + 2 * q + r) - (a + 2 * b + c);
    gx[i] = X; gy[i] = Y; mag[i] = Math.hypot(X, Y);
  }
  return { mag, gx, gy };
}
function edgeMap(G, S) {
  const { W, H } = G, m = S.mag, sorted = Float32Array.from(m).sort(), thr = Math.max(40, sorted[Math.floor(sorted.length * 0.9)]), E = new Uint8Array(W * H); let n = 0;
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x, v = m[i]; if (v < thr) continue;
    const horiz = Math.abs(S.gx[i]) >= Math.abs(S.gy[i]); // thin: keep only local maxima across the edge
    if (horiz ? (v >= m[i - 1] && v > m[i + 1]) : (v >= m[i - W] && v > m[i + W])) { E[i] = 1; n++; }
  }
  return { E, count: n, thr };
}
/* ---- Harris corners: R = det(M) - k trace(M)^2, M = window sum of [Ix^2 IxIy; IxIy Iy^2] ---- */
function harris(G, S, maxN) {
  const { W, H } = G, k = 0.04, R = new Float32Array(W * H), r = 2; let mx = 0;
  for (let y = r + 1; y < H - r - 1; y++) for (let x = r + 1; x < W - r - 1; x++) {
    let a = 0, b = 0, c = 0;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const q = (y + j) * W + x + i, X = S.gx[q], Y = S.gy[q]; a += X * X; b += X * Y; c += Y * Y; }
    const v = a * c - b * b - k * (a + c) * (a + c); R[y * W + x] = v; if (v > mx) mx = v;
  }
  const pts = [], thr = mx * 0.01;
  for (let y = 4; y < H - 4; y++) for (let x = 4; x < W - 4; x++) {
    const v = R[y * W + x]; if (v < thr) continue; let ok = true;
    for (let j = -3; j <= 3 && ok; j++) for (let i = -3; i <= 3; i++) if ((i || j) && R[(y + j) * W + x + i] > v) { ok = false; break; }
    if (ok) pts.push({ x, y, r: v });
  }
  pts.sort((p, q) => q.r - p.r); return pts.slice(0, maxN || 80);
}
/* ---- Hough lines: x cos(t) + y sin(t) = rho, in coordinates centred on the image and divided by f0 ---- */
function hough(G, ed, nLines) {
  const { W, H } = G, f0 = Math.max(W, H), NT = 180, maxR = Math.ceil(Math.hypot(W, H) / 2) + 1, NR = maxR * 2 + 1, A = new Int32Array(NT * NR);
  const cs = [], sn = []; for (let t = 0; t < NT; t++) { cs.push(Math.cos(t * Math.PI / NT)); sn.push(Math.sin(t * Math.PI / NT)); }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (ed.E[y * W + x]) {
    const X = x - W / 2, Y = y - H / 2; for (let t = 0; t < NT; t++) A[t * NR + Math.round(X * cs[t] + Y * sn[t]) + maxR]++;
  }
  const lines = [], used = new Uint8Array(NT * NR), minV = Math.max(18, Math.round(Math.min(W, H) * 0.12));
  for (let n = 0; n < (nLines || 40); n++) {
    let bv = 0, bi = -1; for (let i = 0; i < A.length; i++) if (!used[i] && A[i] > bv) { bv = A[i]; bi = i; }
    if (bv < minV) break; const t = (bi / NR) | 0, rr = bi % NR;
    for (let dt = -4; dt <= 4; dt++) for (let dr = -6; dr <= 6; dr++) { const tt = ((t + dt) % NT + NT) % NT, r2 = rr + dr; if (r2 >= 0 && r2 < NR) used[tt * NR + r2] = 1; }
    const rho = rr - maxR; lines.push({ theta: t * Math.PI / NT, rho, votes: bv, l: [cs[t], sn[t], -rho / f0] });
  }
  return { lines, f0 };
}
/* ---- vanishing points: v = l1 x l2 (homogeneous), RANSAC; residual |l . v/|v||  ---- */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function vanishing(lines, seed, thr) {
  const T = thr || 0.012; let rest = lines.map((l, i) => i), out = [], rnd = (seed || 7) >>> 0;
  const rand = () => { rnd = (rnd * 1664525 + 1013904223) >>> 0; return rnd / 4294967296; };
  for (let k = 0; k < 3 && rest.length >= 3; k++) {
    let best = null;
    for (let it = 0; it < 400; it++) {
      const a = rest[(rand() * rest.length) | 0], b = rest[(rand() * rest.length) | 0]; if (a === b) continue;
      const la = lines[a], lb = lines[b]; if (Math.abs(Math.sin(la.theta - lb.theta)) < 0.05) continue;
      let v = cross(la.l, lb.l); const nv = Math.hypot(v[0], v[1], v[2]); if (nv < 1e-9) continue; v = v.map((q) => q / nv);
      const inl = rest.filter((i) => Math.abs(lines[i].l[0] * v[0] + lines[i].l[1] * v[1] + lines[i].l[2] * v[2]) < T);
      if (!best || inl.length > best.inl.length) best = { v, inl };
    }
    if (!best || best.inl.length < 3) break;
    // refine: least squares, the unit v minimizing sum (l.v)^2 is the smallest eigenvector of sum l l^T (power iteration on trace*I - M)
    const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; best.inl.forEach((i) => { const l = lines[i].l; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) M[r][c] += l[r] * l[c]; });
    const tr = M[0][0] + M[1][1] + M[2][2]; let v = best.v.slice();
    for (let it = 0; it < 60; it++) { const nv = [0, 1, 2].map((r) => tr * v[r] - (M[r][0] * v[0] + M[r][1] * v[1] + M[r][2] * v[2])), n = Math.hypot(nv[0], nv[1], nv[2]) || 1; v = nv.map((q) => q / n); }
    const res = best.inl.map((i) => Math.abs(lines[i].l[0] * v[0] + lines[i].l[1] * v[1] + lines[i].l[2] * v[2])), rms = Math.sqrt(res.reduce((s, q) => s + q * q, 0) / res.length);
    out.push({ v, inliers: best.inl.length, of: lines.length, rms, finite: Math.abs(v[2]) > 1e-4 });
    const set = new Set(best.inl); rest = rest.filter((i) => !set.has(i));
  }
  return out;
}
/* two orthogonal vanishing points, principal point at the centre, square pixels, zero skew:
   (v1 - p).(v2 - p) + f^2 = 0  =>  f = sqrt( -(x1 x2 + y1 y2) ) */
function focalFrom(vps, f0) {
  const fin = vps.filter((q) => q.finite);
  if (fin.length < 2) return { ok: false, reason: 'Fewer than two finite vanishing points were found, so a focal length cannot be computed. Photos of straight-edged objects shot at an angle (a corner of a room or a building) usually give two.' };
  let best = null;
  for (let i = 0; i < fin.length; i++) for (let j = i + 1; j < fin.length; j++) {
    const a = fin[i].v, b = fin[j].v, x1 = a[0] / a[2] * f0, y1 = a[1] / a[2] * f0, x2 = b[0] / b[2] * f0, y2 = b[1] / b[2] * f0, d = -(x1 * x2 + y1 * y2);
    if (d > 0) { const f = Math.sqrt(d); if (!best || fin[i].inliers + fin[j].inliers > best.w) best = { f, w: fin[i].inliers + fin[j].inliers, a: [x1, y1], b: [x2, y2] }; }
  }
  if (!best) return { ok: false, reason: 'The two vanishing directions do not behave like perpendicular directions under these assumptions (the product (v1 - p) . (v2 - p) is not negative), so the photo is not a clean two-perpendicular-directions scene or the lines were mis-grouped.' };
  return { ok: true, f: best.f, vp: [best.a, best.b] };
}
/* ---- EXIF (JPEG APP1) ---- */
function exif(buf) {
  try { return exifRaw(buf); } catch (e) { return {}; }
}
function exifRaw(buf) {
  const u = new Uint8Array(buf), out = {}; if (u[0] !== 0xFF || u[1] !== 0xD8) return out;
  let p = 2; const dv = new DataView(buf);
  while (p + 4 < u.length) {
    if (u[p] !== 0xFF) break; const m = u[p + 1], len = dv.getUint16(p + 2);
    if (m === 0xE1 && String.fromCharCode(u[p + 4], u[p + 5], u[p + 6], u[p + 7]) === 'Exif') { readTiff(dv, p + 10, out); break; }
    if (m === 0xDA) break; p += 2 + len;
  }
  return out;
}
function readTiff(dv, o, out) {
  const le = dv.getUint16(o) === 0x4949, g16 = (a) => dv.getUint16(a, le), g32 = (a) => dv.getUint32(a, le);
  const str = (a, n) => { let s = ''; for (let i = 0; i < n; i++) { const c = dv.getUint8(a + i); if (!c) break; s += String.fromCharCode(c); } return s.trim(); };
  const rat = (a) => { const d = g32(a + 4); return d ? g32(a) / d : NaN; };
  const NAMES = { 0x010F: 'make', 0x0110: 'model', 0x0112: 'orientation', 0x829A: 'exposureTime', 0x829D: 'fNumber', 0x8827: 'iso', 0x920A: 'focalLength', 0x9003: 'dateTimeOriginal', 0xA405: 'focalLength35' };
  function ifd(off, depth) {
    if (off + 2 > dv.byteLength - o) return; const n = g16(o + off);
    for (let i = 0; i < n; i++) {
      const e = o + off + 2 + i * 12; if (e + 12 > dv.byteLength) return; const tag = g16(e), type = g16(e + 2), cnt = g32(e + 4), valOff = (type === 3 && cnt === 1) ? e + 8 : (type === 4 && cnt === 1) ? e + 8 : o + g32(e + 8);
      if ((tag === 0x8769 || tag === 0x8825) && depth < 2) { ifd(g32(e + 8), depth + 1); continue; }
      const nm = NAMES[tag]; if (!nm) continue;
      if (type === 2) out[nm] = str(cnt <= 4 ? e + 8 : valOff, cnt);
      else if (type === 3) out[nm] = g16(valOff);
      else if (type === 4) out[nm] = g32(valOff);
      else if (type === 5) out[nm] = rat(valOff);
    }
  }
  try { ifd(g32(o + 4), 0); } catch (e) { /* truncated EXIF: report what was read */ }
}
/* ---- two-point measurement with an optional calibration ---- */
function measure(p, q, cal) { // p, q in image pixels; cal = { px, units, name } meaning "px pixels = units"
  const px = Math.hypot(p[0] - q[0], p[1] - q[1]); const r = { px, tagPx: 'Measured', units: null };
  if (cal && cal.px > 0 && cal.units > 0) { r.units = px * cal.units / cal.px; r.unit = cal.name || 'units'; r.note = 'Estimated: valid only for distances lying in the same plane, at the same depth, and facing the camera as your reference. Perspective makes it wrong otherwise.'; r.tagUnits = 'Estimated'; }
  else r.note = 'Unknown real size: no reference length has been given. Set a reference to convert pixels into real units.';
  return r;
}

/* ---- plane measurement: homography H maps image pixels to plane units from 4 known corners (DLT, normalised) ---- */
function solveLin(A, b) { const n = b.length, M = A.map((r, i) => r.concat([b[i]]));
  for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; if (Math.abs(M[p][c]) < 1e-12) return null; [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } }
  return M.map((r, i) => r[n] / r[i]); }
function normT(P) { let cx = 0, cy = 0; P.forEach((p) => { cx += p[0]; cy += p[1]; }); cx /= P.length; cy /= P.length; let d = 0; P.forEach((p) => { d += Math.hypot(p[0] - cx, p[1] - cy); }); d = d / P.length || 1; const s = Math.SQRT2 / d; return { s, cx, cy, f: (p) => [(p[0] - cx) * s, (p[1] - cy) * s] }; }
function homography(img, plane) {
  if (img.length !== 4 || plane.length !== 4) return { ok: false, reason: 'Exactly four reference corners are needed.' };
  const area = (P) => { let a = 0; for (let i = 0; i < 4; i++) { const q = P[(i + 1) % 4]; a += P[i][0] * q[1] - q[0] * P[i][1]; } return a / 2; };
  for (let i = 0; i < 4; i++) { const a = img[i], b = img[(i + 1) % 4], c = img[(i + 2) % 4], t = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); if (Math.abs(t) < 1e-3 * Math.max(1, Math.hypot(b[0] - a[0], b[1] - a[1]) * Math.hypot(c[0] - a[0], c[1] - a[1]))) return { ok: false, reason: 'Three of the four corners lie almost on one straight line, so the plane is not determined. Mark the four real corners of the object.' }; }
  if (area(img) * area(plane) < 0) return { ok: false, reason: 'The corners were marked in the opposite direction to the object. Click top-left, top-right, bottom-right, bottom-left, in that order (or the same cyclic order seen on the object).' };
  const Ti = normT(img), Tp = normT(plane), A = [], b = [];
  for (let i = 0; i < 4; i++) { const [x, y] = Ti.f(img[i]), [X, Y] = Tp.f(plane[i]); A.push([x, y, 1, 0, 0, 0, -X * x, -X * y]); b.push(X); A.push([0, 0, 0, x, y, 1, -Y * x, -Y * y]); b.push(Y); }
  const h = solveLin(A, b); if (!h) return { ok: false, reason: 'The four points are degenerate (the system has no unique solution).' };
  const Hn = [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
  const map = (p) => { const [x, y] = Ti.f(p), w = Hn[6] * x + Hn[7] * y + 1, X = (Hn[0] * x + Hn[1] * y + Hn[2]) / w, Y = (Hn[3] * x + Hn[4] * y + Hn[5]) / w; return [X / Tp.s + Tp.cx, Y / Tp.s + Tp.cy, w]; };
  const res = img.map((p, i) => Math.hypot(map(p)[0] - plane[i][0], map(p)[1] - plane[i][1]));
  return { ok: true, map, residual: Math.max.apply(null, res) };
}
function gauss(r) { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
/* distance on the plane between two image points, with a Monte Carlo interval from click uncertainty sigma (pixels) */
function planeDistance(refImg, refPlane, p, q, sigma, N) {
  const sg = sigma > 0 ? sigma : 1, n = N || 400; let rnd = 12345; const r = () => { rnd = (rnd * 1664525 + 1013904223) >>> 0; return (rnd + 1) / 4294967297; };
  const H0 = homography(refImg, refPlane); if (!H0.ok) return H0;
  const d = (H, a, b) => { const A = H.map(a), B = H.map(b); if (A[2] <= 0 || B[2] <= 0) return NaN; return Math.hypot(A[0] - B[0], A[1] - B[1]); };
  const best = d(H0, p, q); if (!isFinite(best)) return { ok: false, reason: 'One of the points is on or beyond the horizon line of the reference plane, so it cannot be a point on that plane.' };
  const ds = []; for (let i = 0; i < n; i++) { const J = (a) => [a[0] + sg * gauss(r), a[1] + sg * gauss(r)]; const H = homography(refImg.map(J), refPlane); if (!H.ok) continue; const v = d(H, J(p), J(q)); if (isFinite(v)) ds.push(v); }
  ds.sort((a, b) => a - b); const mean = ds.reduce((s, v) => s + v, 0) / (ds.length || 1), sd = Math.sqrt(ds.reduce((s, v) => s + (v - mean) * (v - mean), 0) / Math.max(1, ds.length - 1));
  return { ok: true, value: best, sd, lo: ds[Math.floor(ds.length * 0.025)] || best, hi: ds[Math.min(ds.length - 1, Math.floor(ds.length * 0.975))] || best, n: ds.length, residual: H0.residual, sigma: sg };
}
/* ---- full analysis ---- */
function analyze(rgba, w, h, meta) {
  const t0 = Date.now(), G = toGray(rgba, w, h, 480), S = sobel(G), ed = edgeMap(G, S), cor = harris(G, S, 80), hl = hough(G, ed, 40), vps = vanishing(hl.lines, 7), fo = focalFrom(vps, hl.f0);
  const sc = G.scale, rep = { w, h, aspect: w / h, W: G.W, H: G.H, scale: sc, edges: ed.count, edgeDensity: ed.count / (G.W * G.H), corners: cor, lines: hl.lines, vps, focal: null, ms: Date.now() - t0, meta: meta || {}, issues: [] };
  rep.vpsPx = vps.map((q) => ({ x: q.v[0] / q.v[2] * hl.f0 / sc + w / 2, y: q.v[1] / q.v[2] * hl.f0 / sc + h / 2, finite: q.finite, inliers: q.inliers, of: q.of, rms: q.rms }));
  if (fo.ok) rep.focal = { px: fo.f / sc, tag: 'Estimated', mm35: fo.f / sc / Math.max(w, h) * 36 };
  const m = rep.meta, longPx = Math.max(w, h);
  if (m.focalLength35) rep.exifFocal = { px: m.focalLength35 / 36 * longPx, tag: 'Measured', note: 'from the file\'s 35 mm-equivalent focal length; assumes the picture was not cropped after shooting' };
  if (rep.focal && rep.exifFocal) { rep.focalAgree = (rep.focal.px - rep.exifFocal.px) / rep.exifFocal.px; }
  if (ed.count < 150) rep.issues.push({ sev: 'warn', code: 'few-edges', msg: 'Only ' + ed.count + ' edge pixels were found.', region: 'whole photo', fix: 'Use a sharper photo with clear straight edges; blurry, dark or very smooth photos give nothing to measure.' });
  if (hl.lines.length < 4) rep.issues.push({ sev: 'warn', code: 'few-lines', msg: 'Only ' + hl.lines.length + ' straight lines were found, so perspective cannot be estimated.', region: 'whole photo', fix: 'Photograph something with straight edges (buildings, rooms, furniture, a table).' });
  else if (!fo.ok) rep.issues.push({ sev: 'info', code: 'no-focal', msg: fo.reason, region: 'perspective', fix: 'Tilt the camera so two horizontal directions are both visible, or enter the focal length manually.' });
  vps.forEach((q, i) => { if (q.rms > 0.01) rep.issues.push({ sev: 'warn', code: 'vp-residual-' + (i + 1), msg: 'Vanishing point ' + (i + 1) + ' fits its ' + q.inliers + ' lines with an RMS residual of ' + (q.rms * 1000).toFixed(1) + '/1000, which is loose.', region: 'lines pointing at that vanishing point', fix: 'Treat the position as rough. Straighter, longer lines improve it (lens distortion bends lines near the edges).' }); });
  rep.issues.push({ sev: 'info', code: 'assumptions', msg: 'Focal length assumes the principal point is at the centre, pixels are square, there is no skew and no lens distortion, and that two of the line groups are perpendicular in the real scene.', region: 'camera model', fix: 'If the photo was cropped, shot with a fisheye, or the scene is not box-like, ignore the focal length.' });
  return rep;
}
root.GEO = { TAGS, toGray, sobel, edgeMap, harris, hough, vanishing, focalFrom, exif, measure, analyze, cross, homography, planeDistance };
})(typeof window !== 'undefined' ? window : globalThis);
