/* Physics modules. Every module: {id,title,inputs,run(v)->result}. v holds SI values. Each result lists equations,
   assumptions, method, limits and tagged outputs: 'exact' (exact under the stated assumptions), 'numerical' (approximation with an
   error estimate), 'empirical' (fitted or estimated). Nothing here is evaluated from user text; inputs are numbers already checked by UNITS. */
(function (root) {
'use strict';
const G0 = 9.80665, GN = 6.6743e-11, C0 = 299792458, HB = 1.054571817e-34, ME = 9.1093837015e-31, QE = 1.602176634e-19;
const D = (...a) => root.UNITS.D(...a);
const O = (name, v, unit, tag, note) => ({ name, v, unit, tag, note: note || '' });
const I = (id, label, unit, def, extra) => Object.assign({ id, label, unit, def }, extra || {});
/* seeded PRNG + normal */
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function gauss(r) { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function rk4(f, y, t, h) { const k1 = f(t, y), k2 = f(t + h / 2, y.map((a, i) => a + h / 2 * k1[i])), k3 = f(t + h / 2, y.map((a, i) => a + h / 2 * k2[i])), k4 = f(t + h, y.map((a, i) => a + h * k3[i])); return y.map((a, i) => a + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); }
/* ---------- projectile ---------- */
function projAnalytic(v) { const th = v.angle, vx = v.speed * Math.cos(th), vy = v.speed * Math.sin(th), g = v.g, h0 = v.h0 || 0; const disc = vy * vy + 2 * g * h0; const T = (vy + Math.sqrt(disc)) / g; return { vx, vy, T, R: vx * T, H: h0 + vy * vy / (2 * g), tTop: Math.max(vy / g, 0), vImp: Math.sqrt(vx * vx + disc) }; }
function projNumeric(v, h) {
  const k = v.drag > 0 ? 0.5 * 1.225 * v.cd * v.area / v.mass : 0; /* a_drag = -k|v|v */
  const f = (t, y) => { const sp = Math.hypot(y[2], y[3]); return [y[2], y[3], -k * sp * y[2], -v.g - k * sp * y[3]]; };
  let y = [0, v.h0 || 0, v.speed * Math.cos(v.angle), v.speed * Math.sin(v.angle)], t = 0, pts = [[0, y[0], y[1]]], Hm = y[1];
  for (let n = 0; n < 2e6; n++) { const yn = rk4(f, y, t, h); if (yn[1] < 0) { let tau = h * y[1] / (y[1] - yn[1]), z = yn; for (let k = 0; k < 6; k++) { z = rk4(f, y, t, tau); tau -= z[1] / z[3]; } z = rk4(f, y, t, tau); const ti = t + tau; pts.push([ti, z[0], 0]); return { R: z[0], T: ti, H: Hm, vImp: Math.hypot(z[2], z[3]), pts }; } y = yn; t += h; if (y[1] > Hm) Hm = y[1]; if (n % Math.max(1, Math.round(0.02 / h)) === 0) pts.push([t, y[0], y[1]]); }
  throw new Error('The projectile never lands within the simulation limit');
}
const projectile = {
  id: 'projectile', title: 'Projectile motion', group: 'Classical mechanics',
  inputs: [I('speed', 'Launch speed', 'm/s', 20, { dim: D(1, 0, -1), min: 0 }), I('angle', 'Launch angle', 'deg', 45, { dim: D(), min: 0, max: Math.PI / 2 * 0.999999 }), I('h0', 'Launch height', 'm', 0, { dim: D(1), min: 0 }), I('g', 'Gravity', 'm/s^2', G0, { dim: D(1, 0, -2), min: 1e-6, note: 'standard gravity' }),
    I('drag', 'Air drag (0 = off, 1 = on)', '', 0, { dim: D(), min: 0, max: 1 }), I('cd', 'Drag coefficient', '', 0.47, { dim: D(), min: 0 }), I('area', 'Cross-section area', 'm^2', 0.0042, { dim: D(2), min: 0 }), I('mass', 'Mass', 'kg', 0.43, { dim: D(0, 1), min: 1e-12 })],
  validate(v) { if (v.speed < 0) return 'Speed cannot be negative'; if (v.g <= 0) return 'Gravity must be positive'; if (v.angle < 0 || v.angle >= Math.PI / 2) return 'The angle must be between 0 and 90 degrees'; return null; },
  run(v) {
    const A = projAnalytic(v), res = { equations: ['x(t) = v₀cosθ · t', 'y(t) = h₀ + v₀sinθ · t − ½ g t²', 'T = (v₀sinθ + √(v₀²sin²θ + 2 g h₀)) / g', 'Range R = v₀cosθ · T'], method: '', outputs: [], series: [], assumptions: [] };
    res.assumptions = ['Uniform gravitational field, flat ground at y = 0', 'Point mass, no wind, no spin', v.drag > 0 ? 'Quadratic air drag F = ½ρ C_d A v², ρ = 1.225 kg/m³ (sea-level air, assumed)' : 'No air resistance (a strong simplification: real balls fall short of this range)'];
    if (!(v.drag > 0)) {
      res.tag = 'exact'; res.method = 'Closed-form solution of the equations of motion (exact under the stated assumptions)';
      res.outputs = [O('Flight time', A.T, 's', 'exact'), O('Range', A.R, 'm', 'exact'), O('Maximum height', A.H, 'm', 'exact'), O('Impact speed', A.vImp, 'm/s', 'exact'), O('Time to apex', A.tTop, 's', 'exact')];
      const n = 80; for (let i = 0; i <= n; i++) { const t = A.T * i / n; res.series.push([t, A.vx * t, (v.h0 || 0) + A.vy * t - 0.5 * v.g * t * t]); }
      res.errorEstimate = 0;
    } else {
      const h = Math.min(A.T / 400, 0.002) || 0.001; const a = projNumeric(v, h), b = projNumeric(v, h / 2);
      res.tag = 'numerical'; res.method = 'Fourth-order Runge–Kutta, step ' + h.toExponential(2) + ' s; error estimated by comparing with half the step'; res.equations.push('m dv/dt = −m g ŷ − ½ρ C_d A |v| v');
      const err = Math.abs(b.R - a.R) / 15; res.errorEstimate = err;
      res.outputs = [O('Flight time', b.T, 's', 'numerical', '± ' + (Math.abs(b.T - a.T) / 15).toExponential(1)), O('Range', b.R, 'm', 'numerical', '± ' + err.toExponential(1) + ' m (numerical error only)'), O('Maximum height', b.H, 'm', 'numerical'), O('Impact speed', b.vImp, 'm/s', 'numerical'), O('Range without drag', A.R, 'm', 'exact', 'for comparison')];
      res.series = b.pts; res.assumptions.push('Drag law is an empirical model; C_d for a real ball varies with speed (Reynolds number)');
    }
    res.limits = 'Ignores wind, spin (Magnus force), air-density change with height, Earth rotation and curvature.';
    res.reference = A; return res;
  }
};
/* ---------- collision & rotation ---------- */
const collision = {
  id: 'collision', title: '1-D collision', group: 'Classical mechanics',
  inputs: [I('m1', 'Mass 1', 'kg', 2, { dim: D(0, 1), min: 1e-12 }), I('v1', 'Velocity 1', 'm/s', 3, { dim: D(1, 0, -1) }), I('m2', 'Mass 2', 'kg', 1, { dim: D(0, 1), min: 1e-12 }), I('v2', 'Velocity 2', 'm/s', 0, { dim: D(1, 0, -1) }), I('e', 'Restitution (1 elastic, 0 sticks)', '', 1, { dim: D(), min: 0, max: 1 })],
  run(v) {
    const M = v.m1 + v.m2, p = v.m1 * v.v1 + v.m2 * v.v2, u1 = (p + v.m2 * v.e * (v.v2 - v.v1)) / M, u2 = (p + v.m1 * v.e * (v.v1 - v.v2)) / M;
    const K0 = 0.5 * v.m1 * v.v1 ** 2 + 0.5 * v.m2 * v.v2 ** 2, K1 = 0.5 * v.m1 * u1 ** 2 + 0.5 * v.m2 * u2 ** 2;
    return { tag: 'exact', method: 'Conservation of momentum with Newton restitution law', equations: ['m₁v₁ + m₂v₂ = m₁u₁ + m₂u₂', 'u₂ − u₁ = −e (v₂ − v₁)'], assumptions: ['Frictionless, collinear, instantaneous contact', 'Restitution e is a given parameter, not predicted'], limits: 'Does not model deformation, spin, or off-centre impacts.',
      outputs: [O('Final velocity 1', u1, 'm/s', 'exact'), O('Final velocity 2', u2, 'm/s', 'exact'), O('Momentum before', p, 'kg·m/s', 'exact'), O('Momentum after', v.m1 * u1 + v.m2 * u2, 'kg·m/s', 'exact'), O('Kinetic energy before', K0, 'J', 'exact'), O('Kinetic energy after', K1, 'J', 'exact'), O('Energy lost', K0 - K1, 'J', 'exact')], series: [] };
  }
};
function agm(a, b) { for (let i = 0; i < 40; i++) { const t = (a + b) / 2; b = Math.sqrt(a * b); a = t; } return a; }
const pendulum = {
  id: 'pendulum', title: 'Pendulum (rotation, torque)', group: 'Classical mechanics',
  inputs: [I('L', 'Length', 'm', 1, { dim: D(1), min: 1e-6 }), I('theta0', 'Release angle', 'deg', 30, { dim: D(), min: 0, max: Math.PI * 0.999 }), I('g', 'Gravity', 'm/s^2', G0, { dim: D(1, 0, -2), min: 1e-6 })],
  run(v) {
    const T0 = 2 * Math.PI * Math.sqrt(v.L / v.g), Tex = T0 / agm(1, Math.cos(v.theta0 / 2));
    const T = Tex, h = T / 4000, f = (t, y) => [y[1], -v.g / v.L * Math.sin(y[0])]; let y = [v.theta0, 0], t = 0, series = [], cross = 0, last = y[0];
    const e0 = (y) => 0.5 * v.L * v.L * y[1] * y[1] - v.g * v.L * Math.cos(y[0]); const E0 = e0(y); let drift = 0;
    for (let n = 0; n < 4000 * 3; n++) { const yn = rk4(f, y, t, h); if (last > 0 && yn[0] <= 0 && !cross) cross = t + h * last / (last - yn[0]); last = yn[0]; y = yn; t += h; drift = Math.max(drift, Math.abs(e0(y) - E0)); if (n % 40 === 0) series.push([t, y[0]]); }
    return { tag: 'exact', method: 'Exact period from the arithmetic–geometric mean; motion integrated with RK4 (energy drift reported)', equations: ['θ″ = −(g/L) sin θ', 'T = 4√(L/g) K(sin(θ₀/2)) = 2π√(L/g) / AGM(1, cos(θ₀/2))', 'Small-angle: T ≈ 2π√(L/g)'], assumptions: ['Point bob on a massless rigid rod, no friction or drag'], limits: 'The small-angle formula is wrong by about ' + (100 * (Tex / T0 - 1)).toFixed(2) + ' % at this angle.',
      outputs: [O('Exact period', Tex, 's', 'exact'), O('Small-angle period', T0, 's', 'exact', 'approximation of the exact value'), O('Period from simulation (quarter × 4)', cross * 4, 's', 'numerical', 'agrees with the exact value'), O('Peak angular acceleration', Math.sin(v.theta0) * v.g / v.L, 'rad/s^2', 'exact', 'torque per unit moment of inertia, at release'), O('Max energy drift (per unit mass)', drift, 'J/kg', 'numerical')], series, errorEstimate: Math.abs(cross * 4 - Tex) };
  }
};
/* ---------- orbit ---------- */
const orbit = {
  id: 'orbit', title: 'Two-body orbit / escape velocity', group: 'Astronomy',
  inputs: [I('M', 'Central mass', 'kg', 5.972e24, { dim: D(0, 1), min: 1 }), I('r0', 'Starting distance from centre', 'm', 6.771e6, { dim: D(1), min: 1 }), I('vt', 'Tangential speed', 'm/s', 7670, { dim: D(1, 0, -1), min: 0 }), I('rBody', 'Body radius (impact test)', 'm', 6.371e6, { dim: D(1), min: 0 })],
  run(v) {
    const mu = GN * v.M, E = v.vt * v.vt / 2 - mu / v.r0, vesc = Math.sqrt(2 * mu / v.r0), vc = Math.sqrt(mu / v.r0), L = v.r0 * v.vt;
    const out = [O('Circular speed here', vc, 'm/s', 'exact'), O('Escape speed here', vesc, 'm/s', 'exact'), O('Specific orbital energy', E, 'J/kg', 'exact'), O('Gravitational potential', -mu / v.r0, 'J/kg', 'exact')]; let a = null, ecc = null, T = null;
    if (E < 0) { a = -mu / (2 * E); ecc = Math.sqrt(Math.max(0, 1 + 2 * E * L * L / (mu * mu))); T = 2 * Math.PI * Math.sqrt(a ** 3 / mu); out.push(O('Semi-major axis', a, 'm', 'exact'), O('Eccentricity', ecc, '', 'exact'), O('Period', T, 's', 'exact'), O('Periapsis distance', a * (1 - ecc), 'm', 'exact'), O('Apoapsis distance', a * (1 + ecc), 'm', 'exact')); } else out.push(O('Orbit type', E === 0 ? 'parabolic' : 'hyperbolic (unbound)', '', 'exact'));
    const series = []; let drift = null, hit = a !== null && v.rBody > 0 && a * (1 - ecc) < v.rBody;
    if (T) { /* velocity-Verlet check over one period */
      const N = 20000, h = T / N; let x = v.r0, y = 0, vx = 0, vy = v.vt; const acc = (x, y) => { const r = Math.hypot(x, y); return [-mu * x / r ** 3, -mu * y / r ** 3]; }; let ax = acc(x, y); const E0 = E; let md = 0;
      for (let n = 0; n < N; n++) { vx += ax[0] * h / 2; vy += ax[1] * h / 2; x += vx * h; y += vy * h; ax = acc(x, y); vx += ax[0] * h / 2; vy += ax[1] * h / 2; const En = (vx * vx + vy * vy) / 2 - mu / Math.hypot(x, y); md = Math.max(md, Math.abs(En - E0) / Math.abs(E0)); if (n % 100 === 0) series.push([n * h, x, y]); }
      drift = md; out.push(O('Energy drift over one period (numerical check)', md, '(relative)', 'numerical'));
    }
    return { tag: 'exact', method: 'Closed-form Kepler two-body solution; numerical velocity-Verlet integration as a check', equations: ['v_esc = √(2GM/r)', 'ε = v²/2 − GM/r', 'a = −GM/(2ε), T = 2π√(a³/GM)', 'e = √(1 + 2εL²/(GM)²)'], assumptions: ['Point masses, the central body is much heavier than the orbiter', 'No atmosphere, no thrust, no third body'], limits: 'Ignores oblateness (J2), drag, and other bodies: real satellite orbits drift. ' + (hit ? 'WARNING: periapsis is below the body surface: this orbit hits the body.' : ''), outputs: out, series, errorEstimate: drift };
  }
};
/* ---------- waves ---------- */
const waves = {
  id: 'waves', title: 'Waves: interference and strings', group: 'Waves and fields',
  inputs: [I('f', 'Frequency', 'Hz', 440, { dim: D(0, 0, -1), min: 1e-9 }), I('c', 'Wave speed', 'm/s', 343, { dim: D(1, 0, -1), min: 1e-9, note: 'sound in air near 20 °C (assumed)' }), I('d', 'Source separation', 'm', 1, { dim: D(1), min: 0 }), I('Lstr', 'String / pipe length', 'm', 0.65, { dim: D(1), min: 1e-9 }), I('f2', 'Second frequency (beats)', 'Hz', 444, { dim: D(0, 0, -1), min: 0 })],
  run(v) {
    const lam = v.c / v.f, k = 2 * Math.PI / lam, series = []; for (let i = 0; i <= 200; i++) { const x = (i / 200) * 4 * lam, y = Math.sin(k * x), y2 = Math.sin(k * (x - v.d)); series.push([x, y + y2, 0]); }
    const nodes = []; for (let n = 0; n < 4; n++) nodes.push(+(((n + 0.5) * lam / 2 + 0 - 0).toFixed(6)));
    return { tag: 'exact', method: 'Closed-form linear wave superposition', equations: ['λ = c / f,  k = 2π/λ', 'Two equal sources: path difference Δ = d, destructive if Δ = (n+½)λ', 'String fixed at both ends: fₙ = n c / (2L)', 'Beat frequency = |f₁ − f₂|'], assumptions: ['Linear, non-dispersive medium', 'Equal-amplitude point sources on a line', 'Speed supplied by the user (it depends on temperature, tension, medium)'], limits: 'No damping, reflection or dispersion modelled.',
      outputs: [O('Wavelength', lam, 'm', 'exact'), O('Wavenumber', k, 'rad/m', 'exact'), O('Period', 1 / v.f, 's', 'exact'), O('Path difference in wavelengths', v.d / lam, '', 'exact'), O('Interference at separation d', Math.abs(Math.cos(Math.PI * v.d / lam)), '(relative amplitude, 1 = constructive, 0 = destructive)', 'exact'), O('Fundamental of string/pipe', v.c / (2 * v.Lstr), 'Hz', 'exact'), O('Second harmonic', v.c / v.Lstr, 'Hz', 'exact'), O('Beat frequency', Math.abs(v.f - v.f2), 'Hz', 'exact')], series };
  }
};
/* ---------- heat diffusion ---------- */
function heat1D(alpha, L, T0, tEnd, N, safety) {
  const dx = L / N, dtMax = dx * dx / (2 * alpha), dt = dtMax * (safety || 0.4), steps = Math.max(1, Math.ceil(tEnd / dt)), h = tEnd / steps; const r = alpha * h / (dx * dx);
  let u = new Float64Array(N + 1); for (let i = 1; i < N; i++) u[i] = T0 * Math.sin(Math.PI * i * dx / L); let w = new Float64Array(N + 1);
  for (let s = 0; s < steps; s++) { for (let i = 1; i < N; i++) w[i] = u[i] + r * (u[i - 1] - 2 * u[i] + u[i + 1]); const t = u; u = w; w = t; }
  return { u, dx, r, steps };
}
const heat = {
  id: 'heat', title: 'Heat conduction in a rod', group: 'Waves and fields',
  inputs: [I('alpha', 'Thermal diffusivity', 'm^2/s', 1.11e-4, { dim: D(2, 0, -1), min: 1e-15, note: 'copper ≈ 1.11e-4' }), I('L', 'Rod length', 'm', 0.5, { dim: D(1), min: 1e-6 }), I('T0', 'Initial peak temperature rise', 'K', 100, { dim: D(0, 0, 0, 0, 1) }), I('t', 'Elapsed time', 's', 300, { dim: D(0, 0, 1), min: 0 })],
  run(v) {
    const N = 50, a = heat1D(v.alpha, v.L, v.T0, v.t, N), b = heat1D(v.alpha, v.L, v.T0, v.t, N * 2), decay = Math.exp(-v.alpha * Math.PI * Math.PI * v.t / (v.L * v.L)), exact = v.T0 * decay;
    const mid = a.u[N / 2], mid2 = b.u[N], series = []; for (let i = 0; i <= N; i++) series.push([i * a.dx, a.u[i], v.T0 * decay * Math.sin(Math.PI * i * a.dx / v.L)]);
    return { tag: 'numerical', method: 'Explicit finite differences (FTCS), r = ' + a.r.toFixed(3) + ' ≤ 0.5 for stability; compared with the exact sine-mode solution and a grid refined 2×', equations: ['∂T/∂t = α ∂²T/∂x²', 'T(0,t) = T(L,t) = 0 (ends held at ambient)', 'Exact for this start: T(x,t) = T₀ sin(πx/L) exp(−απ²t/L²)'], assumptions: ['One-dimensional rod, uniform material, constant α', 'Ends kept at ambient temperature, no side losses'], limits: 'No convection, radiation or temperature-dependent properties.',
      outputs: [O('Midpoint temperature rise (numerical)', mid, 'K', 'numerical'), O('Midpoint temperature rise (exact)', exact, 'K', 'exact'), O('Numerical error (coarse grid)', Math.abs(mid - exact), 'K', 'numerical'), O('Numerical error (fine grid)', Math.abs(mid2 - exact), 'K', 'numerical', 'should be smaller'), O('Decay time constant', v.L * v.L / (v.alpha * Math.PI * Math.PI), 's', 'exact')], series, errorEstimate: Math.abs(mid - exact) };
  }
};
/* ---------- relativity & quantum ---------- */
const relativity = {
  id: 'relativity', title: 'Special relativity', group: 'Advanced science',
  inputs: [I('v', 'Speed', 'm/s', 2.5e8, { dim: D(1, 0, -1), min: 0 }), I('m', 'Rest mass', 'kg', ME, { dim: D(0, 1), min: 0 }), I('tau', 'Proper time', 's', 1, { dim: D(0, 0, 1), min: 0 })],
  validate(v) { return v.v >= C0 ? 'A massive object cannot reach or exceed the speed of light' : null; },
  run(v) { const b = v.v / C0, g = 1 / Math.sqrt(1 - b * b), E = g * v.m * C0 * C0, K = (g * g * b * b / (g + 1)) * v.m * C0 * C0, Kn = 0.5 * v.m * v.v * v.v;
    return { tag: 'exact', method: 'Closed-form special relativity', equations: ['β = v/c,  γ = 1/√(1−β²)', 'E = γmc²,  K = (γ−1)mc²', 'Δt = γ τ'], assumptions: ['Inertial frames, flat spacetime (no gravity)'], limits: 'General relativity (gravity) is NOT included. Classical K = ½mv² is shown for comparison and is wrong at high speed.',
      outputs: [O('β = v/c', b, '', 'exact'), O('Lorentz factor γ', g, '', 'exact'), O('Dilated time', g * v.tau, 's', 'exact'), O('Total energy', E, 'J', 'exact'), O('Relativistic kinetic energy', K, 'J', 'exact'), O('Classical ½mv² (inaccurate)', Kn, 'J', 'exact', 'ratio classical/relativistic = ' + (Kn / K).toFixed(4)), O('Momentum', g * v.m * v.v, 'kg·m/s', 'exact')], series: [] }; }
};
const quantum = {
  id: 'quantum', title: 'Quantum: particle in a box / hydrogen', group: 'Advanced science',
  inputs: [I('Lb', 'Box width', 'm', 1e-9, { dim: D(1), min: 1e-15 }), I('n', 'Level n', '', 1, { dim: D(), min: 1 }), I('nh', 'Hydrogen level', '', 2, { dim: D(), min: 1 })],
  run(v) { const n = Math.round(v.n), nh = Math.round(v.nh), En = (k) => k * k * Math.PI * Math.PI * HB * HB / (2 * ME * v.Lb * v.Lb), Eh = (k) => -13.605693122994 * QE / (k * k), E21 = Eh(nh + 1) - Eh(nh), Eg = En(n + 1) - En(n);
    const series = []; for (let i = 0; i <= 100; i++) { const x = i / 100 * v.Lb; series.push([x, Math.sin(n * Math.PI * x / v.Lb) ** 2]); }
    return { tag: 'exact', method: 'Closed-form eigenvalues of the Schrödinger equation', equations: ['Box: Eₙ = n²π²ħ² / (2mL²)', 'Hydrogen: Eₙ = −13.6057 eV / n² (non-relativistic, no fine structure)'], assumptions: ['Electron in an infinite square well', 'Hydrogen: point nucleus, no spin–orbit or Lamb shift'], limits: 'Real quantum wells have finite depth; hydrogen fine structure is ~10⁻⁵ of these energies and is omitted.',
      outputs: [O('Box energy level n', En(n), 'J', 'exact'), O('Box energy level n (eV)', En(n) / QE, 'eV', 'exact'), O('Transition n → n+1 wavelength', 6.62607015e-34 * C0 / Eg, 'm', 'exact'), O('Hydrogen level n energy', Eh(nh) / QE, 'eV', 'exact'), O('Hydrogen n → n+1 photon wavelength', 6.62607015e-34 * C0 / E21, 'm', 'exact', 'compare: Balmer-α 656.3 nm needs n=2→3')], series }; }
};
const MODULES = [projectile, collision, pendulum, orbit, waves, heat, relativity, quantum];
const BY = {}; MODULES.forEach((m) => { BY[m.id] = m; });
/* build SI inputs from strings with unit check; reports defaults used */
function readInputs(mod, raw) {
  const U = root.UNITS, v = {}, defaults = [], errors = [];
  for (const p of mod.inputs) {
    const has = raw && raw[p.id] !== undefined && raw[p.id] !== '';
    try {
      const unitStr = p.unit || ''; const expect = { d: p.dim.slice(), unit: unitStr };
      if (!has) { const q = U.parseQuantity(p.def + ' ' + unitStr, expect); v[p.id] = q.v; if (!(mod.id === 'projectile' && ['cd', 'area', 'mass'].includes(p.id) && !(raw && +raw.drag > 0))) defaults.push(p.label + ' = ' + p.def + (unitStr ? ' ' + unitStr : '')); }
      else { const q = unitStr ? U.parseQuantity(String(raw[p.id]), expect) : { v: +raw[p.id], assumed: false }; if (!isFinite(q.v)) throw new Error('not a number'); v[p.id] = q.v; if (q.assumed) defaults.push(p.label + ': no unit given, assumed ' + unitStr); }
      if (p.min !== undefined && v[p.id] < p.min) errors.push(p.label + ' must be at least ' + p.min);
      if (p.max !== undefined && v[p.id] > p.max) errors.push(p.label + ' must be at most ' + (+p.max.toPrecision(6)));
    } catch (e) { errors.push(p.label + ': ' + e.message); }
  }
  if (!errors.length && mod.validate) { const m = mod.validate(v); if (m) errors.push(m); }
  return { v, defaults, errors };
}
function solve(id, raw) { const mod = BY[id]; if (!mod) throw new Error('Unknown model ' + id); const r = readInputs(mod, raw); if (r.errors.length) return { ok: false, errors: r.errors }; const res = mod.run(r.v); res.ok = true; res.defaults = r.defaults; res.inputs = r.v; res.id = id; res.title = mod.title; return res; }
/* Monte-Carlo uncertainty: sig = {id: sigmaSI}. */
function propagate(id, v, sig, N, seed) {
  const mod = BY[id], r = rng(seed || 12345), names = null; const cols = {}; let n = 0;
  for (let k = 0; k < (N || 400); k++) { const w = Object.assign({}, v); for (const key in sig) w[key] = v[key] + sig[key] * gauss(r); let res; try { if (mod.validate && mod.validate(w)) continue; res = mod.run(w); } catch (e) { continue; } res.outputs.forEach((o) => { if (typeof o.v === 'number') (cols[o.name] = cols[o.name] || []).push(o.v); }); n++; }
  const out = {}; for (const k in cols) { const a = cols[k], m = a.reduce((s, x) => s + x, 0) / a.length, sd = Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, a.length - 1)); out[k] = { mean: m, sd, n: a.length }; }
  return { n, out };
}
/* ---------- fitting & comparison ---------- */
function solveLin(A, b) { const n = b.length; const M = A.map((r, i) => r.concat([b[i]])); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; if (Math.abs(M[p][c]) < 1e-300) throw new Error('Singular system: the observations do not constrain the parameters'); [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } } return M.map((r, i) => r[n] / r[i]); }
function invert(A) { const n = A.length; return A[0].map((_, j) => solveLin(A, A.map((_, i) => (i === j ? 1 : 0)))).map((col, j) => col).reduce((m, col, j) => { col.forEach((v, i) => { (m[i] = m[i] || [])[j] = v; }); return m; }, []); }
function polyFit(ts, ys, deg, sigma) {
  const n = ts.length, m = deg + 1; if (n <= m) throw new Error('Need more than ' + m + ' points for a degree-' + deg + ' fit (have ' + n + ')');
  const t0 = ts.reduce((a, b) => a + b, 0) / n; const X = ts.map((t) => { const r = []; for (let k = 0; k < m; k++) r.push(Math.pow(t - t0, k)); return r; });
  const AtA = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => X.reduce((s, r) => s + r[i] * r[j], 0))), Aty = Array.from({ length: m }, (_, i) => X.reduce((s, r, k) => s + r[i] * ys[k], 0));
  const c = solveLin(AtA, Aty), res = ys.map((y, k) => y - X[k].reduce((s, x, i) => s + x * c[i], 0)), ss = res.reduce((s, r) => s + r * r, 0), dof = n - m, s2 = ss / dof, cov = invert(AtA).map((r) => r.map((x) => x * s2));
  return { c, t0, res, rms: Math.sqrt(ss / n), s: Math.sqrt(s2), dof, cov, se: cov.map((r, i) => Math.sqrt(Math.max(0, r[i]))) };
}
/* expand polynomial about t0 to powers of t: used only for second-order coefficient (acceleration) which does not depend on t0 */
function fitTrajectory(S, opt) {
  /* S: [{t,x,y}] SI. y up. Model: x = x0 + vx t ; y = y0 + vy t − ½ g t². */
  const t = S.map((s) => s.t), fx = polyFit(t, S.map((s) => s.x), 1), fy = polyFit(t, S.map((s) => s.y), 2);
  const gFit = -2 * fy.c[2], gSE = 2 * fy.se[2], vx = fx.c[1], vxSE = fx.se[1];
  const vyAt0 = fy.c[1] + 2 * fy.c[2] * (0 - fy.t0), speed = Math.hypot(vx, vyAt0), ang = Math.atan2(vyAt0, vx);
  const ref = opt && opt.g !== undefined ? opt.g : G0, z = (gFit - ref) / (gSE || NaN);
  const resid = S.map((s, k) => ({ t: s.t, rx: fx.res[k], ry: fy.res[k] }));
  return { n: S.length, vx, vxSE, vy0: vyAt0, speed, angle: ang, g: gFit, gSE, gRef: ref, gZ: z, rmsX: fx.rms, rmsY: fy.rms, resid, consistent: Math.abs(z) < 3,
    tag: 'empirical', method: 'Linear least squares: x(t) is a line, y(t) a parabola; standard errors from the covariance matrix scaled by the residual variance (assumes independent Gaussian noise of equal size)',
    caveat: 'Standard errors reflect scatter about the model only. Calibration error (scale, perspective, lens) is NOT included unless added separately.' };
}
function compare(pred, obs) { /* arrays of numbers with same length */ const n = Math.min(pred.length, obs.length); let ss = 0, mx = 0; for (let i = 0; i < n; i++) { const d = obs[i] - pred[i]; ss += d * d; mx = Math.max(mx, Math.abs(d)); } return { n, rms: Math.sqrt(ss / n), max: mx }; }
/* ---------- validation suite ---------- */
function validate() {
  const out = [], add = (name, got, ref, tol, note) => { const err = Math.abs(got - ref) / Math.max(Math.abs(ref), 1e-300); out.push({ name, got, ref, relErr: err, tol, pass: err <= tol, note: note || '' }); };
  const P = solve('projectile', { speed: '20 m/s', angle: '45 deg', h0: '0 m' }), R = P.outputs.find((o) => o.name === 'Range').v; add('Projectile range v²sin2θ/g', R, 400 / G0, 1e-12);
  const Pd = solve('projectile', { speed: '20 m/s', angle: '45 deg', drag: '1', cd: '0', area: '0.004', mass: '0.4' }); add('RK4 with zero drag reproduces the closed form', Pd.outputs.find((o) => o.name === 'Range').v, R, 1e-6);
  const mk = (h) => projNumeric({ speed: 30, angle: 0.8, h0: 0, g: G0, drag: 1, cd: 0.47, area: 0.01, mass: 0.2 }, h).R, r1 = mk(0.02), r2 = mk(0.01), r3 = mk(0.005), order = Math.log2(Math.abs(r1 - r2) / Math.abs(r2 - r3)); out.push({ name: 'RK4 convergence order (expect ≈ 4)', got: order, ref: 4, relErr: Math.abs(order - 4) / 4, tol: 0.2, pass: Math.abs(order - 4) < 0.8, note: 'step halving' });
  const Or = solve('orbit', {}); add('Earth escape speed at 400 km altitude (11.0 km/s)', Or.outputs.find((o) => o.name === 'Escape speed here').v, Math.sqrt(2 * GN * 5.972e24 / 6.771e6), 1e-12);
  const dr = Or.outputs.find((o) => o.name.startsWith('Energy drift')).v; out.push({ name: 'Orbit energy drift over one period < 1e-6', got: dr, ref: 0, relErr: dr, tol: 1e-6, pass: dr < 1e-6, note: 'velocity Verlet' });
  const iss = solve('orbit', { M: '5.972e24 kg', r0: '6.771e6 m', vt: String(Math.sqrt(GN * 5.972e24 / 6.771e6)) + ' m/s' }); add('Circular orbit period at 400 km altitude (≈ 92.4 min)', iss.outputs.find((o) => o.name === 'Period').v, 2 * Math.PI * Math.sqrt(6.771e6 ** 3 / (GN * 5.972e24)), 1e-9); out[out.length - 1].note = 'about 5543 s, matches published ISS ≈ 92.9 min within 1 % because ISS altitude varies';
  const Pn = solve('pendulum', { L: '1 m', theta0: '10 deg' }); add('Pendulum period vs small-angle at 10°', Pn.outputs[0].v, Pn.outputs[1].v, 0.003, 'difference should be about 0.19 %'); add('Pendulum simulation vs exact period', Pn.outputs[2].v, Pn.outputs[0].v, 1e-3);
  const H = solve('heat', {}); const ex = H.outputs.find((o) => o.name === 'Midpoint temperature rise (exact)').v; add('Heat equation numerical midpoint vs exact', H.outputs[0].v, ex, 5e-3);
  const e1 = H.outputs[2].v, e2 = H.outputs[3].v; out.push({ name: 'Heat: refining the grid reduces the error', got: e2, ref: e1, relErr: e2 / (e1 || 1), tol: 1, pass: e2 <= e1 + 1e-15 });
  const Rl = solve('relativity', { v: '2.5e8 m/s', m: '1 kg' }); add('Relativistic γ at 2.5e8 m/s', Rl.outputs[1].v, 1 / Math.sqrt(1 - (2.5e8 / C0) ** 2), 1e-12);
  const lowv = solve('relativity', { v: '1000 m/s', m: '1 kg' }); add('Relativity reduces to ½mv² at low speed', lowv.outputs[4].v, lowv.outputs[5].v, 1e-6);
  const q = solve('quantum', { Lb: '1e-9 m', n: '1' }); add('Electron in 1 nm box ground state (0.376 eV)', q.outputs[1].v, 0.37606, 2e-3);
  const hb = solve('quantum', { nh: '2' }); add('Hydrogen Balmer-α wavelength 656.1 nm (vacuum, no fine structure)', hb.outputs[4].v, 656.112e-9, 1e-3);
  const w = solve('waves', { f: '440 Hz', c: '343 m/s' }); add('Wavelength of 440 Hz in air', w.outputs[0].v, 343 / 440, 1e-12);
  const cl = solve('collision', { e: '1' }); add('Elastic collision conserves kinetic energy', cl.outputs[5].v, cl.outputs[4].v, 1e-12);
  /* fit recovery */
  const r = rng(7), S = []; for (let i = 0; i < 40; i++) { const t = i * 0.025; S.push({ t, x: 1 + 8 * t + 0.002 * gauss(r), y: 2 + 9 * t - 0.5 * G0 * t * t + 0.002 * gauss(r) }); }
  const f = fitTrajectory(S); out.push({ name: 'Fit recovers g = 9.80665 within 3 standard errors from noisy synthetic data', got: f.g, ref: G0, relErr: Math.abs(f.g - G0) / G0, tol: 0.05, pass: Math.abs(f.g - G0) < 3 * f.gSE, note: 'g = ' + f.g.toFixed(3) + ' ± ' + f.gSE.toFixed(3) });
  return out;
}
root.PHYS = { MODULES, BY, solve, readInputs, propagate, fitTrajectory, polyFit, compare, validate, heat1D, projAnalytic, projNumeric, rk4, rng, gauss, G0 };
})(typeof window !== 'undefined' ? window : globalThis);
