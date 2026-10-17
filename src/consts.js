/* Real-world constants for Math Canvas. Values are CODATA 2022 (NIST) or exact by definition; mathematical constants to 12+ digits.
   Each entry: id (the name usable inside equations), name, value, u (standard uncertainty, same unit; 0 when exact), unit, kind. */
(function (root) {
'use strict';
const PHI = (1 + Math.sqrt(5)) / 2;
const LIST = [
  /* mathematical */
  { id: 'pi', sym: 'π', name: 'Pi', v: Math.PI, u: 0, unit: '', cat: 'Mathematical', note: 'circumference ÷ diameter of any circle' },
  { id: 'e', sym: 'e', name: "Euler's number", v: Math.E, u: 0, unit: '', cat: 'Mathematical', note: 'base of natural growth: lim (1 + 1/n)ⁿ' },
  { id: 'phi', sym: 'φ', name: 'Golden ratio', v: PHI, u: 0, unit: '', cat: 'Mathematical', note: '(1 + √5) ÷ 2; satisfies φ² = φ + 1; ratio of consecutive Fibonacci numbers' },
  { id: 'tau', sym: 'τ', name: 'Tau', v: 2 * Math.PI, u: 0, unit: '', cat: 'Mathematical', note: '2π, one full turn in radians' },
  { id: 'sqrt2', sym: '√2', name: 'Pythagoras’ constant', v: Math.SQRT2, u: 0, unit: '', cat: 'Mathematical', note: 'diagonal of a unit square' },
  { id: 'sqrt5', sym: '√5', name: 'Square root of 5', v: Math.sqrt(5), u: 0, unit: '', cat: 'Mathematical', note: 'appears in the golden ratio' },
  { id: 'gammaE', sym: 'γ', name: 'Euler–Mascheroni constant', v: 0.5772156649015329, u: 0, unit: '', cat: 'Mathematical', note: 'lim (1 + 1/2 + … + 1/n − ln n)' },
  { id: 'feigD', sym: 'δ', name: 'Feigenbaum constant', v: 4.669201609102990, u: 0, unit: '', cat: 'Mathematical', note: 'ratio of successive period-doubling gaps on the road to chaos' },
  { id: 'zeta3', sym: 'ζ(3)', name: "Apéry's constant", v: 1.2020569031595942, u: 0, unit: '', cat: 'Mathematical', note: '1 + 1/8 + 1/27 + …' },
  { id: 'catalan', sym: 'G', name: "Catalan's constant", v: 0.915965594177219, u: 0, unit: '', cat: 'Mathematical', note: '1 − 1/9 + 1/25 − 1/49 + …' },
  { id: 'khinchin', sym: 'K₀', name: "Khinchin's constant", v: 2.6854520010653064, u: 0, unit: '', cat: 'Mathematical', note: 'geometric mean of continued-fraction terms of almost every number' },
  /* dimensionless physical */
  { id: 'alpha', sym: 'α', name: 'Fine-structure constant', v: 7.2973525643e-3, u: 1.1e-12, unit: '', cat: 'Dimensionless', note: 'strength of electromagnetism: α = e² ÷ (4π ε₀ ħ c) ≈ 1/137.036' },
  { id: 'mpOverMe', sym: 'mₚ/mₑ', name: 'Proton-to-electron mass ratio', v: 1836.152673426, u: 3.2e-8, unit: '', cat: 'Dimensionless', note: 'how much heavier a proton is than an electron' },
  /* defined exactly by the SI */
  { id: 'cLight', sym: 'c', name: 'Speed of light in vacuum', v: 299792458, u: 0, unit: 'm/s', cat: 'Fundamental (exact)', note: 'defines the metre' },
  { id: 'planck', sym: 'h', name: 'Planck constant', v: 6.62607015e-34, u: 0, unit: 'J·s', cat: 'Fundamental (exact)', note: 'energy of a photon = h × frequency' },
  { id: 'qElec', sym: 'e', name: 'Elementary charge', v: 1.602176634e-19, u: 0, unit: 'C', cat: 'Fundamental (exact)', note: 'charge of a proton' },
  { id: 'kBoltz', sym: 'k_B', name: 'Boltzmann constant', v: 1.380649e-23, u: 0, unit: 'J/K', cat: 'Fundamental (exact)', note: 'links temperature to energy' },
  { id: 'nAvog', sym: 'N_A', name: 'Avogadro constant', v: 6.02214076e23, u: 0, unit: '1/mol', cat: 'Fundamental (exact)', note: 'particles in one mole' },
  { id: 'gStd', sym: 'g₀', name: 'Standard gravity', v: 9.80665, u: 0, unit: 'm/s²', cat: 'Fundamental (exact)', note: 'conventional value of gravity at Earth’s surface' },
  /* measured */
  { id: 'hbar', sym: 'ħ', name: 'Reduced Planck constant', v: 6.62607015e-34 / (2 * Math.PI), u: 0, unit: 'J·s', cat: 'Derived (exact)', note: 'h ÷ 2π' },
  { id: 'gGrav', sym: 'G', name: 'Newtonian gravitational constant', v: 6.67430e-11, u: 1.5e-15, unit: 'm³/(kg·s²)', cat: 'Measured', note: 'the least precisely known fundamental constant' },
  { id: 'mElec', sym: 'mₑ', name: 'Electron mass', v: 9.1093837139e-31, u: 2.8e-40, unit: 'kg', cat: 'Measured', note: '' },
  { id: 'mProt', sym: 'mₚ', name: 'Proton mass', v: 1.67262192595e-27, u: 5.2e-37, unit: 'kg', cat: 'Measured', note: '' },
  { id: 'eps0', sym: 'ε₀', name: 'Vacuum electric permittivity', v: 8.8541878188e-12, u: 1.4e-21, unit: 'F/m', cat: 'Measured', note: 'now measured because α is measured' },
  { id: 'mu0', sym: 'μ₀', name: 'Vacuum magnetic permeability', v: 1.25663706127e-6, u: 2.0e-16, unit: 'N/A²', cat: 'Measured', note: '' },
  { id: 'bohrR', sym: 'a₀', name: 'Bohr radius', v: 5.29177210544e-11, u: 8.2e-21, unit: 'm', cat: 'Measured', note: 'size of the lowest hydrogen orbit' },
  { id: 'rydberg', sym: 'R∞', name: 'Rydberg constant', v: 10973731.568157, u: 1.2e-5, unit: '1/m', cat: 'Measured', note: 'sets the wavelengths of hydrogen light' },
];
const BY = {}; LIST.forEach((c) => { BY[c.id] = c; });
/* make every constant usable inside equations (constants cannot clash with the variables u v t a b c R r x y z, which are single letters) */
if (root.MX && root.MX.CONST) LIST.forEach((c) => { if (!(c.id in root.MX.CONST)) root.MX.CONST[c.id] = c.v; });

/* Consistency checks: recompute one constant from others and compare with the stored value. Differences are in parts per million. */
function checks() {
  const V = (id) => BY[id].v, ppm = (a, b) => (a - b) / b * 1e6, out = [];
  const add = (name, formula, calc, ref, unit, tol) => { const z = ref === 0; out.push({ name, formula, calc, ref, unit, ppm: z ? 0 : ppm(calc, ref), abs: z, ok: z ? Math.abs(calc) < 1e-12 : Math.abs(ppm(calc, ref)) <= (tol || 1), tol: tol || 1 }); };
  const c = V('cLight'), h = V('planck'), hb = V('hbar'), q = V('qElec'), e0 = V('eps0'), me = V('mElec'), al = V('alpha');
  add('Fine-structure constant α', 'e² ÷ (4π ε₀ ħ c)', q * q / (4 * Math.PI * e0 * hb * c), al, '');
  add('Bohr radius a₀', '4π ε₀ ħ² ÷ (mₑ e²)', 4 * Math.PI * e0 * hb * hb / (me * q * q), V('bohrR'), 'm');
  add('Bohr radius a₀ (via α)', 'ħ ÷ (mₑ c α)', hb / (me * c * al), V('bohrR'), 'm');
  add('Rydberg constant R∞', 'α² mₑ c ÷ (2h)', al * al * me * c / (2 * h), V('rydberg'), '1/m');
  add('Hydrogen ground-state energy', '½ mₑ c² α²', 0.5 * me * c * c * al * al / q, 13.605693122990, 'eV', 1);
  add('Electron speed in the lowest Bohr orbit', 'α c', al * c, 2187691.26379, 'm/s', 1);
  add('Vacuum permeability μ₀', '1 ÷ (ε₀ c²)', 1 / (e0 * c * c), V('mu0'), 'N/A²');
  const GMsun = 1.32712440018e20, AU = 1.495978707e11, Tsid = 2 * Math.PI * Math.sqrt(AU * AU * AU / GMsun) / 86400;
  add('Earth orbital period (Kepler)', '2π √(a³ ÷ GM☉), a = 1 AU', Tsid, 365.25636, 'days', 300);
  add('Golden ratio identity', 'φ² − φ − 1', PHI * PHI - PHI - 1, 0, '', 1e9);
  let a = 1, b = 1; for (let i = 0; i < 40; i++) { const t = a + b; a = b; b = t; }
  add('Fibonacci ratio F₄₁ ÷ F₄₀ → φ', 'F(n+1) ÷ F(n)', b / a, PHI, '', 1);
  return out;
}
/* Golden angle and Bohr-model numbers used by the simulation panel */
const goldenAngle = () => 2 * Math.PI / (PHI * PHI);
function bohr(n) { const c = V0('cLight'), al = V0('alpha'), a0 = V0('bohrR'); return { n, r: n * n * a0, v: al * c / n, E: -13.605693122990 / (n * n), beta: al / n }; }
function V0(id) { return BY[id].v; }
function fmt(c) { const x = c.v, s = Math.abs(x) >= 1e5 || Math.abs(x) < 1e-3 ? x.toExponential(10).replace(/\.?0+e/, 'e') : String(+x.toPrecision(13)); return s; }
root.CONSTS = { LIST, BY, checks, goldenAngle, bohr, fmt, PHI };
})(typeof window !== 'undefined' ? window : globalThis);
