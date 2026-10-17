/* Measurement engine: pure functions, no DOM. Tested in tests/meas.test.js.
   Every result carries a "kind": measured | calculated | calibrated | estimated | assumed | unknown | invalid. */
(function (root) {
'use strict';
const KINDS = ['measured', 'calculated', 'calibrated', 'estimated', 'assumed', 'unknown', 'invalid'];
const fin = (v) => typeof v === 'number' && isFinite(v);
const isPt = (p) => Array.isArray(p) && p.length >= 2 && fin(p[0]) && fin(p[1]);

/* ---------- geometry ---------- */
function dist(p, q) { if (!isPt(p) || !isPt(q)) return NaN; return Math.hypot(p[0] - q[0], p[1] - q[1]); }
function angle(a, b, c) { // angle at b between rays b->a and b->c, degrees in [0, 180]; NaN if a ray has zero length
  if (![a, b, c].every(isPt)) return NaN; const ux = a[0] - b[0], uy = a[1] - b[1], vx = c[0] - b[0], vy = c[1] - b[1], nu = Math.hypot(ux, uy), nv = Math.hypot(vx, vy);
  if (nu < 1e-12 || nv < 1e-12) return NaN; return Math.atan2(Math.abs(ux * vy - uy * vx), ux * vx + uy * vy) * 180 / Math.PI;
}
function polygonArea(P) { if (!P || P.length < 3 || !P.every(isPt)) return NaN; let s = 0; for (let i = 0; i < P.length; i++) { const q = P[(i + 1) % P.length]; s += P[i][0] * q[1] - q[0] * P[i][1]; } return Math.abs(s) / 2; }
function perimeter(P, closed) { if (!P || P.length < 2 || !P.every(isPt)) return NaN; let s = 0; for (let i = 0; i + 1 < P.length; i++) s += dist(P[i], P[i + 1]); if (closed && P.length > 2) s += dist(P[P.length - 1], P[0]); return s; }
function segInter(a, b, c, d) { const o = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]), d1 = o(a, b, c), d2 = o(a, b, d), d3 = o(c, d, a), d4 = o(c, d, b); return d1 * d2 < 0 && d3 * d4 < 0; }
function isSimple(P) { const n = P.length; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { if (j === i + 1 || (i === 0 && j === n - 1)) continue; if (segInter(P[i], P[(i + 1) % n], P[j], P[(j + 1) % n])) return false; } return true; }
function circleFrom3(a, b, c) { // circumcircle; null if the points are (nearly) collinear
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])); const scale = Math.max(1, dist(a, b) * dist(b, c)); if (Math.abs(d) < 1e-9 * scale) return null;
  const a2 = a[0] * a[0] + a[1] * a[1], b2 = b[0] * b[0] + b[1] * b[1], c2 = c[0] * c[0] + c[1] * c[1];
  const x = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d, y = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d; return { cx: x, cy: y, r: Math.hypot(a[0] - x, a[1] - y) };
}
function fitCircle(P) { // Kasa algebraic least squares: x^2 + y^2 + Dx + Ey + F = 0
  if (!P || P.length < 3) return null; let sx = 0, sy = 0; P.forEach((p) => { sx += p[0]; sy += p[1]; }); const mx = sx / P.length, my = sy / P.length; let Suu = 0, Suv = 0, Svv = 0, Suuu = 0, Svvv = 0, Suvv = 0, Svuu = 0;
  P.forEach((p) => { const u = p[0] - mx, v = p[1] - my; Suu += u * u; Suv += u * v; Svv += v * v; Suuu += u * u * u; Svvv += v * v * v; Suvv += u * v * v; Svuu += v * u * u; });
  const det = Suu * Svv - Suv * Suv; if (Math.abs(det) < 1e-12 * Math.max(1, Suu * Svv)) return null; const r1 = 0.5 * (Suuu + Suvv), r2 = 0.5 * (Svvv + Svuu), uc = (r1 * Svv - r2 * Suv) / det, vc = (Suu * r2 - Suv * r1) / det;
  const r = Math.sqrt(uc * uc + vc * vc + (Suu + Svv) / P.length); let res = 0; P.forEach((p) => { res += Math.pow(Math.hypot(p[0] - mx - uc, p[1] - my - vc) - r, 2); });
  return { cx: mx + uc, cy: my + vc, r, rms: Math.sqrt(res / P.length) };
}

/* ---------- units ---------- */
const LEN = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 };
function convert(v, from, to, power) { // power 1 = length, 2 = area
  const pw = power || 1; if (!fin(v)) return NaN; if (!(from in LEN) || !(to in LEN)) return NaN; return v * Math.pow(LEN[from] / LEN[to], pw);
}

/* ---------- view <-> image coordinates (zoom, pan, crop) ---------- */
function fitView(iw, ih, vw, vh, pad) { const p = pad || 0, s = Math.min((vw - 2 * p) / iw, (vh - 2 * p) / ih); return { s, tx: (vw - iw * s) / 2, ty: (vh - ih * s) / 2 }; }
const toScreen = (V, p) => [p[0] * V.s + V.tx, p[1] * V.s + V.ty];
const toImage = (V, p) => [(p[0] - V.tx) / V.s, (p[1] - V.ty) / V.s];
function zoomAt(V, cx, cy, f, smin, smax) { const s2 = Math.min(smax || 64, Math.max(smin || 0.02, V.s * f)), k = s2 / V.s; return { s: s2, tx: cx - (cx - V.tx) * k, ty: cy - (cy - V.ty) * k }; }
function cropToImage(crop, p) { return [p[0] + crop.x, p[1] + crop.y]; } // a point in cropped-image pixels -> original-image pixels

/* ---------- deterministic Gaussian noise, Monte Carlo ---------- */
function rng(seed) { let s = (seed || 1) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 1) / 4294967297; }; }
function gauss(r) { const u = r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function monteCarlo(fn, pts, sigma, N, seed) { // fn(points) -> number; each point displaced by N(0, sigma^2) in x and y
  const r = rng(seed || 99), n = N || 400, out = []; for (let i = 0; i < n; i++) { const v = fn(pts.map((p) => [p[0] + sigma * gauss(r), p[1] + sigma * gauss(r)])); if (fin(v)) out.push(v); }
  if (out.length < 10) return null; out.sort((a, b) => a - b); const mean = out.reduce((s, v) => s + v, 0) / out.length, sd = Math.sqrt(out.reduce((s, v) => s + (v - mean) * (v - mean), 0) / (out.length - 1));
  return { mean, sd, lo: out[Math.floor(out.length * 0.025)], hi: out[Math.min(out.length - 1, Math.floor(out.length * 0.975))], n: out.length };
}
/* first-order result for a distance between two independent points, each with isotropic click error sigma (px): sd = sigma * sqrt(2) */
const distanceSd = (sigma) => sigma * Math.SQRT2;

/* ---------- 3x3 homography helpers ---------- */
function inv3(h) { const [a, b, c, d, e, f, g, i, j] = h, A = e * j - f * i, B = -(d * j - f * g), C = d * i - e * g, det = a * A + b * B + c * C; if (Math.abs(det) < 1e-14) return null; const k = 1 / det; return [A * k, -(b * j - c * i) * k, (b * f - c * e) * k, B * k, (a * j - c * g) * k, -(a * f - c * d) * k, C * k, -(a * i - b * g) * k, (a * e - b * d) * k]; }
const applyH = (h, p) => { const w = h[6] * p[0] + h[7] * p[1] + h[8]; return [(h[0] * p[0] + h[1] * p[1] + h[2]) / w, (h[3] * p[0] + h[4] * p[1] + h[5]) / w, w]; };
function solveLin(A, b) { const n = b.length, M = A.map((r, i) => r.concat([b[i]])); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; if (Math.abs(M[p][c]) < 1e-14) return null; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } } return M.map((r, i) => r[n] / r[i]); }
/* homography from >= 4 correspondences (least squares, Hartley-normalised DLT with h33 fixed to 1 after normalisation) */
function fitHomography(src, dst) {
  const n = src.length; if (n < 4 || dst.length !== n) return null;
  const nt = (P) => { let cx = 0, cy = 0; P.forEach((p) => { cx += p[0]; cy += p[1]; }); cx /= n; cy /= n; let d = 0; P.forEach((p) => { d += Math.hypot(p[0] - cx, p[1] - cy); }); d = d / n || 1; return { s: Math.SQRT2 / d, cx, cy }; };
  const Ts = nt(src), Td = nt(dst), N = (T, p) => [(p[0] - T.cx) * T.s, (p[1] - T.cy) * T.s];
  const AtA = Array.from({ length: 8 }, () => new Array(8).fill(0)), Atb = new Array(8).fill(0);
  for (let i = 0; i < n; i++) { const [x, y] = N(Ts, src[i]), [X, Y] = N(Td, dst[i]); [[[x, y, 1, 0, 0, 0, -X * x, -X * y], X], [[0, 0, 0, x, y, 1, -Y * x, -Y * y], Y]].forEach(([r, v]) => { for (let a = 0; a < 8; a++) { Atb[a] += r[a] * v; for (let b = 0; b < 8; b++) AtA[a][b] += r[a] * r[b]; } }); }
  const h = solveLin(AtA, Atb); if (!h) return null; const Hn = h.concat([1]);
  // H = Td^-1 * Hn * Ts
  const Tsm = [Ts.s, 0, -Ts.s * Ts.cx, 0, Ts.s, -Ts.s * Ts.cy, 0, 0, 1], Tdi = [1 / Td.s, 0, Td.cx, 0, 1 / Td.s, Td.cy, 0, 0, 1];
  const mul3 = (a, b) => { const o = new Array(9).fill(0); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) for (let k = 0; k < 3; k++) o[r * 3 + c] += a[r * 3 + k] * b[k * 3 + c]; return o; };
  const H = mul3(Tdi, mul3(Hn, Tsm)); const k = H[8]; return H.map((v) => v / (Math.abs(k) > 1e-12 ? k : 1));
}

/* ---------- measurements in the plane of a calibrated reference ---------- */
/* plane = { H: 3x3 mapping image px -> plane units, unit } ; all geometry is then computed in plane units. Angles are preserved
   exactly only if the plane is viewed without lens distortion; lengths and areas are valid only for points that lie on the plane. */
function onPlane(plane, pts) { const out = pts.map((p) => applyH(plane.H, p)); if (out.some((q) => !(q[2] > 0) && !(q[2] < 0) )) return null; return out; }
function measure(type, pts, plane, sigma) {
  const sg = sigma > 0 ? sigma : 1, rec = { type, pts: pts.map((p) => p.slice(0, 2)), sigma: sg, notes: [], issues: [] };
  const need = { distance: 2, angle: 3, polygon: 3, circle: 3, polyline: 2 }[type]; if (!need || pts.length < need) { rec.kind = 'invalid'; rec.issues.push('Needs at least ' + (need || '?') + ' points.'); return rec; }
  if (!pts.every(isPt)) { rec.kind = 'invalid'; rec.issues.push('A point has a non-numeric coordinate.'); return rec; }
  const geom = (P) => { // returns the primary value in the units of P, plus secondary value
    if (type === 'distance') return dist(P[0], P[1]);
    if (type === 'angle') return angle(P[0], P[1], P[2]);
    if (type === 'polygon') return polygonArea(P);
    if (type === 'polyline') return perimeter(P, false);
    if (type === 'circle') { const c = P.length === 3 ? circleFrom3(P[0], P[1], P[2]) : fitCircle(P); return c ? c.r : NaN; }
    return NaN;
  };
  const sec = (P) => (type === 'polygon' ? perimeter(P, true) : type === 'circle' ? (() => { const c = P.length === 3 ? circleFrom3(P[0], P[1], P[2]) : fitCircle(P); return c ? Math.PI * c.r * c.r : NaN; })() : NaN);
  // degenerate shape checks (in image pixels)
  if (type === 'distance' && dist(pts[0], pts[1]) < 1e-9) { rec.kind = 'invalid'; rec.issues.push('Zero-length line: both points are the same.'); return rec; }
  if (type === 'angle' && !fin(angle(pts[0], pts[1], pts[2]))) { rec.kind = 'invalid'; rec.issues.push('An arm of the angle has zero length.'); return rec; }
  if (type === 'polygon') { if (polygonArea(pts) < 1e-9) { rec.kind = 'invalid'; rec.issues.push('The polygon has no area (all points on one line).'); return rec; } if (!isSimple(pts)) rec.issues.push('The polygon crosses itself, so its area is not the area of a single region.'); }
  if (type === 'circle' && !(pts.length === 3 ? circleFrom3(pts[0], pts[1], pts[2]) : fitCircle(pts))) { rec.kind = 'invalid'; rec.issues.push('The points lie on a straight line, so no circle passes through them.'); return rec; }
  const px = geom(pts), px2 = sec(pts); const unitPx = type === 'angle' ? 'deg' : type === 'polygon' ? 'px²' : 'px';
  rec.px = { value: px, unit: unitPx, kind: 'measured' }; if (fin(px2)) rec.px2 = { value: px2, unit: type === 'polygon' ? 'px' : 'px²', kind: 'calculated' };
  const mcPx = monteCarlo(geom, pts, sg, 300, 11); if (mcPx) rec.px.unc = mcPx;
  if (type === 'angle') { rec.value = px; rec.unit = 'deg'; rec.kind = 'calculated'; rec.unc = mcPx; rec.notes.push('An angle drawn in the picture is not the real angle between objects unless they lie on one plane facing the camera, or the plane has been calibrated.'); }
  if (plane && plane.H) {
    const F = (P) => { const Q = P.map((p) => applyH(plane.H, p)); if (Q.some((q) => !(q[2] > 0))) return NaN; return geom(Q); };
    const Fs = (P) => { const Q = P.map((p) => applyH(plane.H, p)); if (Q.some((q) => !(q[2] > 0))) return NaN; return sec(Q); };
    const v = F(pts);
    if (!fin(v)) { rec.kind = 'invalid'; rec.issues.push('A point is on or beyond the horizon of the reference plane, so it cannot lie on that plane.'); return rec; }
    rec.value = v; rec.unit = type === 'angle' ? 'deg' : type === 'polygon' ? plane.unit + '²' : plane.unit; rec.kind = type === 'angle' ? 'calibrated' : 'calibrated';
    const mc = monteCarlo(F, pts, sg, 300, 7); rec.unc = mc || null; const v2 = Fs(pts); if (fin(v2)) rec.value2 = { value: v2, unit: type === 'polygon' ? plane.unit : plane.unit + '²' };
    rec.notes.push('Computed on the calibrated reference plane. Valid only for points on that plane. Not included in the interval: lens distortion, errors in the reference size, and points off the plane.');
    if (plane.refErr !== undefined) rec.notes.push('Calibration residual at the reference corners: ' + plane.refErr.toExponential(2) + ' ' + plane.unit + '.');
  } else if (type !== 'angle') { rec.value = null; rec.kind = 'unknown'; rec.unit = null; rec.notes.push('Real-world size is unknown: no calibrated reference. The pixel value above is the only measured quantity.'); }
  return rec;
}

/* ---------- history and exports ---------- */
function csvCell(v) { if (v === null || v === undefined) return ''; const s = String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
const num = (v, d) => (fin(v) ? +v.toPrecision(d || 7) : '');
function exportCSV(list, meta) {
  const head = ['id', 'type', 'label', 'frame_time_s', 'points_px', 'pixel_value', 'pixel_unit', 'value', 'unit', 'kind', 'sd', 'ci95_low', 'ci95_high', 'click_sigma_px', 'issues', 'notes'];
  const rows = list.map((m) => [m.id, m.type, m.label || '', m.t === undefined ? '' : num(m.t, 6), m.pts.map((p) => num(p[0], 6) + ' ' + num(p[1], 6)).join(' | '), m.px ? num(m.px.value) : '', m.px ? m.px.unit : '', num(m.value), m.unit || '', m.kind, m.unc ? num(m.unc.sd) : '', m.unc ? num(m.unc.lo) : '', m.unc ? num(m.unc.hi) : '', m.sigma, (m.issues || []).join(' / '), (m.notes || []).join(' / ')]);
  const pre = meta ? Object.keys(meta).map((k) => '# ' + k + ': ' + String(meta[k]).replace(/[\r\n]+/g, ' ')) : [];
  return pre.concat([head.join(',')], rows.map((r) => r.map(csvCell).join(','))).join('\n') + '\n';
}
function exportJSON(list, meta) { return JSON.stringify({ format: 'math-canvas-measurements', version: 1, meta: meta || {}, kinds: KINDS, measurements: list.map((m) => ({ id: m.id, type: m.type, label: m.label || null, t: m.t === undefined ? null : m.t, points_px: m.pts, pixel: m.px || null, value: fin(m.value) ? m.value : null, unit: m.unit || null, kind: m.kind, uncertainty: m.unc || null, click_sigma_px: m.sigma, issues: m.issues || [], notes: m.notes || [] })) }, null, 2); }

/* ---------- planar rectification: warp by the inverse homography with bilinear sampling ---------- */
function rectify(rgba, w, h, quad, outW, outH) { // quad = 4 image points (TL, TR, BR, BL) mapped to the output rectangle
  const H = fitHomography(quad, [[0, 0], [outW, 0], [outW, outH], [0, outH]]); if (!H) return null; const Hi = inv3(H); if (!Hi) return null; const out = new Uint8ClampedArray(outW * outH * 4);
  for (let y = 0; y < outH; y++) for (let x = 0; x < outW; x++) {
    const q = applyH(Hi, [x + 0.5, y + 0.5]), sx = q[0] - 0.5, sy = q[1] - 0.5, o = (y * outW + x) * 4;
    if (sx < 0 || sy < 0 || sx > w - 1 || sy > h - 1) { out[o + 3] = 0; continue; }
    const x0 = Math.floor(sx), y0 = Math.floor(sy), x1 = Math.min(w - 1, x0 + 1), y1 = Math.min(h - 1, y0 + 1), fx = sx - x0, fy = sy - y0;
    for (let c = 0; c < 4; c++) { const a = rgba[(y0 * w + x0) * 4 + c], b = rgba[(y0 * w + x1) * 4 + c], d = rgba[(y1 * w + x0) * 4 + c], e = rgba[(y1 * w + x1) * 4 + c]; out[o + c] = (a * (1 - fx) + b * fx) * (1 - fy) + (d * (1 - fx) + e * fx) * fy; }
  }
  return { data: out, w: outW, h: outH, H };
}
function checkQuad(quad, w, h) { // geometric validation of a four-corner selection
  const issues = []; if (!quad || quad.length !== 4 || !quad.every(isPt)) return [{ sev: 'error', msg: 'Four corner points are needed.' }];
  const area = polygonArea(quad), tot = w * h; if (area < 1e-6) issues.push({ sev: 'error', msg: 'The corners enclose no area.' });
  if (!isSimple(quad)) issues.push({ sev: 'error', msg: 'The corners are in the wrong order: the outline crosses itself. Click them around the shape, top-left, top-right, bottom-right, bottom-left.' });
  for (let i = 0; i < 4; i++) { const a = quad[i], b = quad[(i + 1) % 4], c = quad[(i + 2) % 4], cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]); const q = (i ? 1 : 0); if (i === 0) var s0 = Math.sign(cr); else if (Math.sign(cr) !== s0 && Math.abs(cr) > 1e-9) { issues.push({ sev: 'error', msg: 'The four corners do not form a convex shape, so a flat rectangle cannot appear like this in a photograph.' }); break; } }
  if (area > 0 && area < tot * 0.005) issues.push({ sev: 'warn', msg: 'The selected region covers only ' + (area / tot * 100).toFixed(2) + '% of the picture, so there are few pixels to rectify and errors are magnified.' });
  const ed = [0, 1, 2, 3].map((i) => dist(quad[i], quad[(i + 1) % 4])), mx = Math.max.apply(null, ed), mn = Math.min.apply(null, ed); if (mn < 1e-6) issues.push({ sev: 'error', msg: 'Two corners coincide.' }); else if (mx / mn > 8) issues.push({ sev: 'warn', msg: 'The longest edge is ' + (mx / mn).toFixed(1) + ' times the shortest, which means extreme perspective. The rectified result will be badly stretched and unreliable.' });
  if (quad.some((p) => p[0] < -w * 0.05 || p[0] > w * 1.05 || p[1] < -h * 0.05 || p[1] > h * 1.05)) issues.push({ sev: 'warn', msg: 'A corner lies outside the picture.' });
  return issues;
}

/* ---------- pyramidal Lucas-Kanade tracker with forward-backward check ---------- */
function toGrayFull(rgba, w, h) { const g = new Float32Array(w * h); for (let i = 0; i < w * h; i++) g[i] = 0.2126 * rgba[i * 4] + 0.7152 * rgba[i * 4 + 1] + 0.0722 * rgba[i * 4 + 2]; return { g, w, h }; }
function down2(I) { const w = Math.max(1, I.w >> 1), h = Math.max(1, I.h >> 1), g = new Float32Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const x0 = Math.min(I.w - 1, 2 * x), y0 = Math.min(I.h - 1, 2 * y), x1 = Math.min(I.w - 1, x0 + 1), y1 = Math.min(I.h - 1, y0 + 1); g[y * w + x] = (I.g[y0 * I.w + x0] + I.g[y0 * I.w + x1] + I.g[y1 * I.w + x0] + I.g[y1 * I.w + x1]) / 4; } return { g, w, h }; }
function pyramid(I, L) { const P = [I]; for (let l = 1; l < L; l++) { const p = P[l - 1]; if (p.w < 32 || p.h < 32) break; P.push(down2(p)); } return P; }
function samp(I, x, y) { if (x < 0 || y < 0 || x > I.w - 1 || y > I.h - 1) return NaN; const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(I.w - 1, x0 + 1), y1 = Math.min(I.h - 1, y0 + 1), fx = x - x0, fy = y - y0; return (I.g[y0 * I.w + x0] * (1 - fx) + I.g[y0 * I.w + x1] * fx) * (1 - fy) + (I.g[y1 * I.w + x0] * (1 - fx) + I.g[y1 * I.w + x1] * fx) * fy; }
function lkOne(PA, PB, pt, opt) { // track pt from pyramid PA to PB; returns { x, y, ok, residual, minEig }
  const win = opt.win, iters = opt.iters, eps = opt.eps; let gx = 0, gy = 0; const L = PA.length; let minEig = 0, resid = 0, ok = true;
  for (let l = L - 1; l >= 0; l--) {
    const A = PA[l], B = PB[l], s = Math.pow(2, l), px = pt[0] / s, py = pt[1] / s; let dx = gx, dy = gy;
    // spatial gradients and structure tensor at the template window
    let Gxx = 0, Gxy = 0, Gyy = 0; const T = [];
    for (let j = -win; j <= win; j++) for (let i = -win; i <= win; i++) {
      const x = px + i, y = py + j, v = samp(A, x, y); if (isNaN(v)) { T.push(null); continue; }
      const ix = (samp(A, x + 1, y) - samp(A, x - 1, y)) / 2, iy = (samp(A, x, y + 1) - samp(A, x, y - 1)) / 2; if (isNaN(ix) || isNaN(iy)) { T.push(null); continue; }
      T.push([v, ix, iy]); Gxx += ix * ix; Gxy += ix * iy; Gyy += iy * iy;
    }
    const n = T.filter(Boolean).length; if (n < (2 * win + 1) * (2 * win + 1) * 0.6) { ok = false; break; }
    const tr = Gxx + Gyy, det = Gxx * Gyy - Gxy * Gxy, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)), lmin = (tr / 2 - disc) / n; if (l === 0) minEig = lmin;
    if (det < 1e-9) { ok = false; break; }
    for (let it = 0; it < iters; it++) {
      let bx = 0, by = 0, r2 = 0, m = 0, k = 0;
      for (let j = -win; j <= win; j++) for (let i = -win; i <= win; i++) { const t = T[k++]; if (!t) continue; const v = samp(B, px + i + dx, py + j + dy); if (isNaN(v)) continue; const e = t[0] - v; bx += e * t[1]; by += e * t[2]; r2 += e * e; m++; }
      if (m < n * 0.6) { ok = false; break; }
      const ux = (Gyy * bx - Gxy * by) / det, uy = (-Gxy * bx + Gxx * by) / det; dx += ux; dy += uy; resid = Math.sqrt(r2 / m);
      if (Math.hypot(ux, uy) < eps) break; if (Math.abs(dx) > 4 * win * s || Math.abs(dy) > 4 * win * s) { ok = false; break; }
    }
    if (!ok) break; if (l > 0) { gx = dx * 2; gy = dy * 2; } else { gx = dx; gy = dy; }
  }
  return { x: pt[0] + gx, y: pt[1] + gy, ok, residual: resid, minEig };
}
function track(PA, PB, pt, o) {
  const opt = Object.assign({ win: 9, iters: 25, eps: 0.01, fbMax: 1.0, eigMin: 1, resMax: 25 }, o || {});
  const f = lkOne(PA, PB, pt, opt); if (!f.ok) return { ok: false, reason: 'lost', x: pt[0], y: pt[1], fb: NaN, residual: f.residual, minEig: f.minEig, why: 'The window around the point has too little texture, or it left the picture.' };
  const b = lkOne(PB, PA, [f.x, f.y], opt); const fb = b.ok ? Math.hypot(b.x - pt[0], b.y - pt[1]) : Infinity;
  let ok = true, why = ''; if (!(fb <= opt.fbMax)) { ok = false; why = 'Forward-backward error ' + (isFinite(fb) ? fb.toFixed(2) : 'infinite') + ' px exceeds ' + opt.fbMax + ' px: tracking forward and back does not return to the start.'; } else if (f.minEig < opt.eigMin) { ok = false; why = 'Texture too weak (smallest structure-tensor eigenvalue ' + f.minEig.toFixed(2) + ' < ' + opt.eigMin + '): the point is on a flat or single-edge region.'; } else if (f.residual > opt.resMax) { ok = false; why = 'Residual intensity difference ' + f.residual.toFixed(1) + ' > ' + opt.resMax + ': the appearance changed (blur, occlusion, lighting).'; }
  return { ok, reason: ok ? 'tracked' : 'lost', x: f.x, y: f.y, fb, residual: f.residual, minEig: f.minEig, why };
}

/* ---------- camera calibration (Zhang): closed form, then Levenberg-Marquardt on reprojection error ---------- */
function eigSym(A) { // Jacobi eigen-decomposition of a symmetric matrix; returns { vals, vecs (columns) }
  const n = A.length, a = A.map((r) => r.slice()), V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 60; sweep++) { let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] * a[i][j]; if (off < 1e-24) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) { if (Math.abs(a[p][q]) < 1e-300) continue; const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; } for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
      for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; } } }
  return { vals: a.map((r, i) => r[i]), vecs: V };
}
function rodrigues(r) { const th = Math.hypot(r[0], r[1], r[2]); if (th < 1e-12) return [1, 0, 0, 0, 1, 0, 0, 0, 1]; const k = [r[0] / th, r[1] / th, r[2] / th], c = Math.cos(th), s = Math.sin(th), v = 1 - c; return [c + k[0] * k[0] * v, k[0] * k[1] * v - k[2] * s, k[0] * k[2] * v + k[1] * s, k[1] * k[0] * v + k[2] * s, c + k[1] * k[1] * v, k[1] * k[2] * v - k[0] * s, k[2] * k[0] * v - k[1] * s, k[2] * k[1] * v + k[0] * s, c + k[2] * k[2] * v]; }
function rotToVec(R) { const tr = R[0] + R[4] + R[8], c = Math.max(-1, Math.min(1, (tr - 1) / 2)), th = Math.acos(c); if (th < 1e-9) return [0, 0, 0]; const s = 2 * Math.sin(th); return [(R[7] - R[5]) / s * th, (R[2] - R[6]) / s * th, (R[3] - R[1]) / s * th]; }
function projectPt(K, k1, k2, R, t, P) { // P = [X, Y, 0] on the board; returns distorted pixel
  const x = R[0] * P[0] + R[1] * P[1] + t[0], y = R[3] * P[0] + R[4] * P[1] + t[1], z = R[6] * P[0] + R[7] * P[1] + t[2]; const a = x / z, b = y / z, r2 = a * a + b * b, d = 1 + k1 * r2 + k2 * r2 * r2;
  return [K.fx * a * d + K.s * b * d + K.cx, K.fy * b * d + K.cy]; }
function calibrate(views, size, opt) {
  const o = Object.assign({ maxIter: 100, tol: 1e-10, distortion: true }, opt || {}); const V = views.filter((v) => v.img && v.obj && v.img.length === v.obj.length && v.img.length >= 6);
  if (V.length < 3) return { ok: false, reason: 'At least 3 usable views are needed (each with at least 6 corners); only ' + V.length + ' were given. Capture the board at clearly different tilts and positions.' };
  const Hs = V.map((v) => fitHomography(v.obj, v.img)); if (Hs.some((h) => !h)) return { ok: false, reason: 'A view has degenerate corner positions (the homography could not be computed).' };
  const vij = (h, i, j) => [h[0 + i] * h[0 + j], h[0 + i] * h[3 + j] + h[3 + i] * h[0 + j], h[3 + i] * h[3 + j], h[6 + i] * h[0 + j] + h[0 + i] * h[6 + j], h[6 + i] * h[3 + j] + h[3 + i] * h[6 + j], h[6 + i] * h[6 + j]];
  const rows = []; Hs.forEach((h) => { const a = vij(h, 0, 1), b = vij(h, 0, 0), c = vij(h, 1, 1); rows.push(a); rows.push(b.map((v, i) => v - c[i])); });
  const AtA = Array.from({ length: 6 }, () => new Array(6).fill(0)); rows.forEach((r) => { for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) AtA[i][j] += r[i] * r[j]; });
  const E = eigSym(AtA); let imin = 0; E.vals.forEach((v, i) => { if (v < E.vals[imin]) imin = i; }); let B = E.vecs.map((r) => r[imin]); if (B[0] < 0) B = B.map((v) => -v);
  const [B11, B12, B22, B13, B23, B33] = B, den = B11 * B22 - B12 * B12; if (!(den > 0) || !(B11 > 0)) return { ok: false, reason: 'The views do not constrain the camera: they are probably nearly parallel to each other. Use stronger tilts (about 20 to 45 degrees) in different directions.' };
  const cy = (B12 * B13 - B11 * B23) / den, lam = B33 - (B13 * B13 + cy * (B12 * B13 - B11 * B23)) / B11, fx2 = lam / B11, fy2 = lam * B11 / den; if (!(fx2 > 0) || !(fy2 > 0)) return { ok: false, reason: 'Closed-form solution gave a non-physical focal length (negative square). The views are inconsistent or the corner positions are wrong.' };
  const fx = Math.sqrt(fx2), fy = Math.sqrt(fy2), sk = -B12 * fx * fx * fy / lam, cx = sk * cy / fy - B13 * fx * fx / lam; let K = { fx, fy, cx, cy, s: sk };
  const Kinv = (h) => { const a = h[0], b = h[1], c = h[2]; const y1 = (b - K.cy * c) / K.fy, x1 = (a - K.s * y1 - K.cx * c) / K.fx; return [x1, y1, c]; };
  const poses = Hs.map((h) => { const c1 = [h[0], h[3], h[6]], c2 = [h[1], h[4], h[7]], c3 = [h[2], h[5], h[8]], a1 = Kinv([c1[0], c1[1], c1[2]]), a2 = Kinv(c2), a3 = Kinv(c3); const l = 1 / Math.hypot(a1[0], a1[1], a1[2]); let r1 = a1.map((v) => v * l), r2 = a2.map((v) => v * l), t = a3.map((v) => v * l); if (t[2] < 0) { r1 = r1.map((v) => -v); r2 = r2.map((v) => -v); t = t.map((v) => -v); }
    const r3 = [r1[1] * r2[2] - r1[2] * r2[1], r1[2] * r2[0] - r1[0] * r2[2], r1[0] * r2[1] - r1[1] * r2[0]]; const R = [r1[0], r2[0], r3[0], r1[1], r2[1], r3[1], r1[2], r2[2], r3[2]]; return { r: rotToVec(R), t }; });
  // parameters: fx, fy, cx, cy, s, k1, k2, then per view r(3), t(3)
  let p = [K.fx, K.fy, K.cx, K.cy, K.s, 0, 0]; poses.forEach((q) => { p = p.concat(q.r, q.t); });
  const free = o.distortion ? 7 : 5;
  const resid = (pp) => { const Kk = { fx: pp[0], fy: pp[1], cx: pp[2], cy: pp[3], s: pp[4] }, k1 = o.distortion ? pp[5] : 0, k2 = o.distortion ? pp[6] : 0, out = []; V.forEach((v, vi) => { const b = 7 + vi * 6, R = rodrigues([pp[b], pp[b + 1], pp[b + 2]]), t = [pp[b + 3], pp[b + 4], pp[b + 5]]; for (let i = 0; i < v.obj.length; i++) { const q = projectPt(Kk, k1, k2, R, t, [v.obj[i][0], v.obj[i][1], 0]); out.push(q[0] - v.img[i][0], q[1] - v.img[i][1]); } }); return out; };
  const idx = []; for (let i = 0; i < p.length; i++) if (i < free || i >= 7) idx.push(i);
  let r = resid(p), cost = r.reduce((s, v) => s + v * v, 0), lamLM = 1e-3, iters = 0, conv = 'max iterations reached', cost0 = cost;
  for (; iters < o.maxIter; iters++) {
    const n = idx.length, J = []; for (let c = 0; c < n; c++) { const i = idx[c], h = 1e-6 * Math.max(1, Math.abs(p[i])), pp = p.slice(); pp[i] += h; const r2 = resid(pp); J.push(r2.map((v, k) => (v - r[k]) / h)); }
    const A = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0); for (let a = 0; a < n; a++) { for (let k = 0; k < r.length; k++) g[a] += J[a][k] * r[k]; for (let b = a; b < n; b++) { let s = 0; const ja = J[a], jb = J[b]; for (let k = 0; k < r.length; k++) s += ja[k] * jb[k]; A[a][b] = s; A[b][a] = s; } }
    let improved = false; for (let tries = 0; tries < 12; tries++) { const Ad = A.map((row, i) => row.map((v, j) => (i === j ? v * (1 + lamLM) + 1e-12 : v))), d = solveLin(Ad, g.map((v) => -v)); if (!d) { lamLM *= 10; continue; } const pn = p.slice(); idx.forEach((i, c) => { pn[i] += d[c]; }); const rn = resid(pn), cn = rn.reduce((s, v) => s + v * v, 0); if (cn < cost) { const rel = (cost - cn) / cost; p = pn; r = rn; cost = cn; lamLM = Math.max(1e-9, lamLM / 5); improved = true; if (rel < o.tol) { conv = 'relative cost decrease below ' + o.tol; iters++; tries = 99; } break; } lamLM *= 10; }
    if (!improved) { conv = 'no step reduced the cost (local minimum reached)'; iters++; break; } if (conv.indexOf('relative') === 0) break;
  }
  const nPts = r.length / 2, rms = Math.sqrt(cost / nPts); const per = V.map((v, vi) => { let s = 0; const st = V.slice(0, vi).reduce((a, b) => a + b.obj.length, 0); for (let i = 0; i < v.obj.length; i++) s += r[(st + i) * 2] ** 2 + r[(st + i) * 2 + 1] ** 2; return Math.sqrt(s / v.obj.length); });
  const dof = 2 * nPts - (idx.length); // residual degrees of freedom
  // parameter standard errors from (J^T J)^-1 * sigma^2
  let sd = null; try { const n = idx.length, J = []; for (let c = 0; c < n; c++) { const i = idx[c], h = 1e-6 * Math.max(1, Math.abs(p[i])), pp = p.slice(); pp[i] += h; const r2 = resid(pp); J.push(r2.map((v, k) => (v - r[k]) / h)); } const A = Array.from({ length: n }, (_, a) => Array.from({ length: n }, (_, b) => { let s = 0; for (let k = 0; k < r.length; k++) s += J[a][k] * J[b][k]; return s; })); const s2 = dof > 0 ? cost / dof : NaN; const names = ['fx', 'fy', 'cx', 'cy', 's', 'k1', 'k2']; sd = {}; for (let q = 0; q < Math.min(n, free); q++) { const e = new Array(n).fill(0); e[q] = 1; const col = solveLin(A, e); sd[names[q]] = col && col[q] > 0 && isFinite(s2) ? Math.sqrt(col[q] * s2) : null; } } catch (e) { sd = null; }
  const out = { ok: true, K: { fx: p[0], fy: p[1], cx: p[2], cy: p[3], s: p[4] }, dist: { k1: o.distortion ? p[5] : 0, k2: o.distortion ? p[6] : 0, model: 'radial k1, k2' }, rms, perView: per, views: V.length, points: nPts, iterations: iters, converged: conv, costStart: Math.sqrt(cost0 / nPts), sd, size, closed: { fx, fy, cx, cy, s: sk }, dof };
  out.warnings = []; if (V.length < 8) out.warnings.push('Only ' + V.length + ' views. Fewer than about 10 views at varied tilts gives poorly constrained distortion and principal point.');
  if (Math.abs(out.K.s) > 0.01 * out.K.fx) out.warnings.push('Skew is ' + out.K.s.toFixed(2) + ' px, which is unusually large for a modern camera. This usually means the corner positions are inaccurate.');
  if (Math.abs(out.K.fx / out.K.fy - 1) > 0.03) out.warnings.push('fx and fy differ by ' + (Math.abs(out.K.fx / out.K.fy - 1) * 100).toFixed(1) + '%, which is unusual (most cameras have square pixels).');
  if (size && (out.K.cx < size.w * 0.3 || out.K.cx > size.w * 0.7 || out.K.cy < size.h * 0.3 || out.K.cy > size.h * 0.7)) out.warnings.push('The principal point is far from the image centre, which usually indicates poorly constrained data.');
  if (rms > 1) out.warnings.push('RMS reprojection error of ' + rms.toFixed(2) + ' px is high. Typical good calibrations are below 0.5 px. Check for blurry images or mis-marked corners.');
  const worst = Math.max.apply(null, per); if (worst > 2 * rms && V.length > 3) out.warnings.push('One view has an error of ' + worst.toFixed(2) + ' px, more than twice the average. It may contain a bad corner and could be removed.');
  return out;
}
/* undistort a pixel (iterative inverse of the radial model) */
function undistortPt(cal, p) { const K = cal.K, k1 = cal.dist.k1, k2 = cal.dist.k2; const y = (p[1] - K.cy) / K.fy, x = (p[0] - K.cx - K.s * y) / K.fx; let a = x, b = y; for (let i = 0; i < 20; i++) { const r2 = a * a + b * b, d = 1 + k1 * r2 + k2 * r2 * r2; a = x / d; b = y / d; } return [K.fx * a + K.s * b + K.cx, K.fy * b + K.cy]; }


/* sub-pixel corner refinement (gradient-orthogonality, as in cornerSubPix): the corner q minimises sum over a window of ((p - q) . grad I(p))^2 */
function refineCorner(I, pt, win, iters) {
  const w = win || 5; let x = pt[0], y = pt[1];
  for (let it = 0; it < (iters || 20); it++) {
    let a = 0, b = 0, c = 0, e = 0, f = 0, n = 0;
    for (let j = -w; j <= w; j++) for (let i = -w; i <= w; i++) {
      const px = Math.round(x) + i, py = Math.round(y) + j; if (px < 2 || py < 2 || px > I.w - 3 || py > I.h - 3) continue;
      const gx = (I.g[py * I.w + px + 1] - I.g[py * I.w + px - 1]) / 2, gy = (I.g[(py + 1) * I.w + px] - I.g[(py - 1) * I.w + px]) / 2, wt = Math.exp(-(i * i + j * j) / (2 * (w / 2) * (w / 2)));
      const xx = gx * gx * wt, xy = gx * gy * wt, yy = gy * gy * wt; a += xx; b += xy; c += yy; e += xx * px + xy * py; f += xy * px + yy * py; n++;
    }
    const det = a * c - b * b; if (n < w * w || det < 1e-6 * Math.max(1, (a + c) * (a + c))) return { x: pt[0], y: pt[1], ok: false, moved: 0 };
    const nx = (c * e - b * f) / det, ny = (-b * e + a * f) / det; const d = Math.hypot(nx - x, ny - y); x = nx; y = ny; if (d < 1e-3) break;
    if (Math.hypot(x - pt[0], y - pt[1]) > w * 2) return { x: pt[0], y: pt[1], ok: false, moved: Math.hypot(x - pt[0], y - pt[1]) };
  }
  return { x, y, ok: true, moved: Math.hypot(x - pt[0], y - pt[1]) };
}
/* inner-corner grid predicted from the four outer inner-corners (TL, TR, BR, BL) of a cols x rows board via a homography */
function predictGrid(quad, cols, rows) {
  const H = fitHomography([[0, 0], [cols - 1, 0], [cols - 1, rows - 1], [0, rows - 1]], quad); if (!H) return null; const out = []; for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) out.push(applyH(H, [i, j]).slice(0, 2)); return out;
}

root.MEAS = { refineCorner, predictGrid, KINDS, dist, angle, polygonArea, perimeter, isSimple, circleFrom3, fitCircle, LEN, convert, fitView, toScreen, toImage, zoomAt, cropToImage, rng, gauss, monteCarlo, distanceSd, inv3, applyH, solveLin, fitHomography, measure, exportCSV, exportJSON, rectify, checkQuad, toGrayFull, pyramid, track, eigSym, rodrigues, rotToVec, projectPt, calibrate, undistortPt };
})(typeof window !== 'undefined' ? window : globalThis);
