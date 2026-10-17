/* Plain-language question -> structured calculation. This file never computes a physical result. It only (1) picks a model,
   (2) pulls numbers WITH their units out of the text, (3) reports what is missing. PHYS.solve produces every number. */
(function (root) {
'use strict';
const U = () => root.UNITS;
const MODELS = [
  ['projectile', /\b(ball|throw|thrown|throws|projectile|launch|launched|cannon|kick|kicked|trajectory|shot|fired|arrow|stone)\b/i],
  ['pendulum', /\b(pendulum|swing|swings)\b/i],
  ['orbit', /\b(orbit|orbits|orbiting|satellite|escape (velocity|speed)|circular speed)\b/i],
  ['collision', /\b(collide|collides|collision|crash|crashes|bump)\b/i],
  ['relativity', /\b(relativ\w*|time dilation|lorentz|speed of light|near light|lightspeed)\b/i],
  ['quantum', /\b(quantum|particle in a box|hydrogen|energy level|electron in)\b/i],
  ['heat', /\b(heat|conduct\w*|thermal|rod|diffus\w*)\b/i],
  ['waves', /\b(wave|waves|wavelength|sound|beat|beats|interfer\w*|string|vibrat\w*|frequency)\b/i],
];
const SLOTS = {
  projectile: [{ id: 'speed', kind: 'velocity', kw: /speed|velocity|at|with/i, req: true }, { id: 'angle', kind: 'angle', req: true }, { id: 'h0', kind: 'length', kw: /height|tall|cliff|from|off|above|roof|building|high/i }, { id: 'mass', kind: 'mass' }],
  pendulum: [{ id: 'L', kind: 'length', req: true }, { id: 'theta0', kind: 'angle' }],
  orbit: [{ id: 'r0', kind: 'length', kw: /distance|radius|centre|center|altitude|orbit/i }, { id: 'vt', kind: 'velocity' }, { id: 'M', kind: 'mass' }],
  collision: [{ id: 'm1', kind: 'mass', req: true }, { id: 'm2', kind: 'mass', req: true }, { id: 'v1', kind: 'velocity', req: true }, { id: 'v2', kind: 'velocity' }],
  relativity: [{ id: 'v', kind: 'velocity', req: true }, { id: 'm', kind: 'mass' }, { id: 'tau', kind: 'time' }],
  quantum: [{ id: 'Lb', kind: 'length' }, { id: 'n', kind: 'count' }],
  heat: [{ id: 'L', kind: 'length' }, { id: 't', kind: 'time' }, { id: 'T0', kind: 'temp' }],
  waves: [{ id: 'f', kind: 'freq' }, { id: 'c', kind: 'velocity' }, { id: 'd', kind: 'length' }],
};
function kindOf(unitStr) { const u = U(); let p; try { p = u.parseUnit(unitStr); } catch (e) { return null; } const d = p.d; const same = (x) => u.dimEq(d, x);
  if (same(u.D(1, 0, -1))) return 'velocity'; if (same(u.D(1))) return 'length'; if (same(u.D(0, 1))) return 'mass'; if (same(u.D(0, 0, 1))) return 'time'; if (same(u.D(0, 0, -1))) return 'freq'; if (same(u.D(0, 0, 0, 0, 1))) return 'temp';
  if (u.dimZero(d) && /^(deg|degree|degrees|°|rad|radian|radians)$/i.test(unitStr.trim())) return 'angle'; return null; }
function parse(text) {
  const t = String(text || ''), found = [], notes = [];
  /* "0.8c" or "80% of the speed of light" */
  let m; const reC = /(\d*\.?\d+)\s*c\b(?![a-z])/g; while ((m = reC.exec(t))) found.push({ idx: m.index, kind: 'velocity', value: (+m[1] * 299792458) + ' m/s', text: m[0] });
  const rePct = /(\d*\.?\d+)\s*%\s*(?:of\s+)?(?:the\s+)?speed of light/gi; while ((m = rePct.exec(t))) found.push({ idx: m.index, kind: 'velocity', value: (+m[1] / 100 * 299792458) + ' m/s', text: m[0] });
  const re = /([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s*(°C|°F|°|[A-Za-zµΩ]+(?:\s*[\/·*]\s*[A-Za-z]+(?:\^?-?\d)?)?(?:\^-?\d)?)/g;
  while ((m = re.exec(t))) { if (found.some((f) => Math.abs(f.idx - m.index) < 3)) continue; let us = m[2].replace(/\s+/g, ''); if (/^(degrees?|deg|°)$/i.test(us)) us = 'deg'; const k = kindOf(us); if (k) found.push({ idx: m.index, kind: k, value: m[1] + ' ' + us, text: m[0].trim() }); }
  /* a bare level number: "n = 2" or "level 3" */
  const rn = /(?:\bn\s*=\s*|\blevel\s+|\bstate\s+)(\d+)/gi; while ((m = rn.exec(t))) found.push({ idx: m.index, kind: 'count', value: m[1], text: m[0] });
  found.sort((a, b) => a.idx - b.idx);
  let model = null; for (const [id, rx] of MODELS) if (rx.test(t)) { model = id; break; }
  if (!model) return { ok: false, reason: 'I could not tell which physical model fits. Supported: projectile motion, pendulum, orbit and escape speed, collisions, waves and sound, heat conduction, special relativity, quantum energy levels. Try for example: "A ball is thrown at 20 m/s at 40 degrees".' };
  const slots = SLOTS[model], raw = {}, used = new Set(), understood = [];
  const near = (f, rx) => rx && rx.test(t.slice(Math.max(0, f.idx - 28), f.idx + f.text.length + 4));
  /* keyword slots first, then order */
  for (const f of found) { const cand = slots.filter((s) => s.kind === f.kind && !raw[s.id]); if (!cand.length) continue; let s = cand.find((c) => near(f, c.kw)); if (!s) s = cand.find((c) => !c.kw) || cand[0]; if (cand.length > 1 && f.kind === 'length' && model === 'projectile') s = cand.find((c) => c.id === 'h0'); raw[s.id] = f.value; used.add(f); understood.push({ slot: s.id, text: f.text, value: f.value }); }
  const unmatched = found.filter((f) => !used.has(f)).map((f) => f.text);
  const missing = slots.filter((s) => s.req && !raw[s.id]).map((s) => s.id);
  const P = root.PHYS && root.PHYS.BY[model];
  const label = {}; if (P) P.inputs.forEach((i) => { label[i.id] = i.label; });
  return { ok: true, model, raw, understood, unmatched, missing, missingLabels: missing.map((id) => label[id] || id), text: t };
}
function answer(text) { const q = parse(text); if (!q.ok) return q; if (q.missing.length) { q.ok = false; q.reason = 'I need ' + q.missingLabels.join(' and ') + ' to answer this. I will not guess a measurement for you.'; return q; } const r = root.PHYS.solve(q.model, q.raw); q.result = r; if (!r.ok) { q.ok = false; q.reason = r.errors.join('; '); } return q; }
root.NLQ = { parse, answer, MODELS };
})(typeof window !== 'undefined' ? window : globalThis);
