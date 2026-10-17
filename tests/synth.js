// synthetic image of lines converging on two known vanishing points (ground-truth focal length)
module.exports = function synth(f, v1, v2, w, h) {
  const d = new Uint8ClampedArray(w * h * 4).fill(255); const cx = w / 2, cy = h / 2;
  const put = (x, y) => { for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) { const X = Math.round(x) + i, Y = Math.round(y) + j; if (X >= 0 && X < w && Y >= 0 && Y < h) { const k = (Y * w + X) * 4; d[k] = d[k + 1] = d[k + 2] = 0; } } };
  [v1, v2].forEach((v) => { const vx = v[0] + cx, vy = v[1] + cy;
    for (let n = 0; n < 9; n++) { const px = (n + 0.5) / 9 * w, py = h * (n % 2 ? 0.15 : 0.85) + (n * 37 % 60 - 30); // a point in the image
      const dx = px - vx, dy = py - vy, L = Math.hypot(dx, dy), steps = Math.ceil(L); for (let s = 0; s <= steps; s++) { put(vx + dx * s / steps, vy + dy * s / steps); } } });
  return d;
};
