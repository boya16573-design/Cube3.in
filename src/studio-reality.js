/* Reality Engine workspace: unit-aware calculator, physics models with documented equations and assumptions,
   uncertainty, model-versus-measurement fitting, validation suite, 3D/2D views and project export.
   Every number shown comes from UNITS / PHYS / NLQ. Nothing is typed in by hand. */
(function () {
'use strict';
const U = window.UNITS, P = window.PHYS, Q = window.NLQ, MCU = window.MCU;
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const toast = (m) => { try { MCU.toast(m); } catch (e) { /* ignore */ } };
const fmt = (v) => (typeof v === 'number' ? U.fmtNum(v, 6) : String(v));
const TAG = { exact: ['Exact under assumptions', 'ex'], numerical: ['Numerical approximation', 'nu'], empirical: ['Empirical estimate', 'em'], unvalidated: ['Unvalidated prediction', 'un'] };
const css = `
#rl{position:fixed;inset:0;z-index:2147483000;background:#070b14;color:#d5def0;font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:auto;--bg:#070b14;--pn:#0f1626;--ln:#1f2a44;--ac:#3b82f6;--ac2:#22d3ee;--ok:#34d399;--wr:#fbbf24;--bad:#f87171;--mut:#8b9bbd}
#rl[hidden]{display:none}#rl *{box-sizing:border-box}
#rl .hd{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--ln);position:sticky;top:0;background:#070b14ee;backdrop-filter:blur(6px);z-index:5;flex-wrap:wrap}
#rl .logo{font-weight:800;font-size:20px;letter-spacing:.2px}#rl .logo b{color:var(--ac2)}#rl .sub{color:var(--mut);font-size:12px}
#rl nav.ws{display:flex;gap:4px;flex-wrap:wrap;margin-left:auto}#rl nav.ws button{background:transparent;border:1px solid var(--ln);color:#b8c6e4;border-radius:8px;padding:6px 10px;cursor:pointer;font:inherit;font-size:13px}
#rl nav.ws button[aria-selected=true]{background:var(--ac);border-color:var(--ac);color:#fff}
#rl .x{background:#1a2440;border:1px solid var(--ln);color:#fff;border-radius:8px;padding:6px 12px;cursor:pointer;font:inherit}
#rl .wrap{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:12px;padding:12px 16px 40px;max-width:1500px;margin:0 auto}
@media (max-width:900px){#rl .wrap{grid-template-columns:minmax(0,1fr);padding:10px 10px 40px}}
#rl section{background:var(--pn);border:1px solid var(--ln);border-radius:12px;padding:12px 14px;margin-bottom:12px;min-width:0}
#rl h2{margin:0 0 8px;font-size:12px;letter-spacing:.9px;text-transform:uppercase;color:var(--ac2);font-weight:700}
#rl h3{margin:10px 0 4px;font-size:13px;color:#e5ecff;text-transform:none;letter-spacing:0}
#rl label{display:block;font-size:12px;color:var(--mut);margin:6px 0 2px}
#rl input,#rl select,#rl textarea{width:100%;background:#0a1020;border:1px solid var(--ln);border-radius:8px;color:#e8eefc;padding:8px 10px;font:inherit;min-height:38px}
#rl textarea{resize:vertical;min-height:70px}
#rl input:focus,#rl select:focus,#rl textarea:focus,#rl button:focus-visible{outline:2px solid var(--ac2);outline-offset:1px}
#rl .btn{background:var(--ac);border:0;color:#fff;border-radius:8px;padding:9px 14px;cursor:pointer;font:inherit;font-weight:600;min-height:38px}
#rl .btn.g{background:#1a2440;border:1px solid var(--ln);font-weight:500}#rl .btns{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
#rl .row2{display:grid;grid-template-columns:1fr 1fr;gap:8px}#rl .row3{display:grid;grid-template-columns:1fr 70px;gap:8px;align-items:end}
#rl .tag{display:inline-block;border-radius:999px;padding:1px 9px;font-size:11px;font-weight:700;border:1px solid}
#rl .tag.ex{color:#34d399;border-color:#065f46;background:#06281f}#rl .tag.nu{color:#60a5fa;border-color:#1e3a8a;background:#0a1a3d}#rl .tag.em{color:#fbbf24;border-color:#713f12;background:#2b1d06}#rl .tag.un{color:#f87171;border-color:#7f1d1d;background:#2a0f14}
#rl table{width:100%;border-collapse:collapse;font-size:13px}#rl td,#rl th{padding:5px 6px;border-bottom:1px solid #16203a;text-align:left;vertical-align:top}#rl td.v{text-align:right;font-family:ui-monospace,Menlo,monospace;white-space:nowrap}
#rl .msg{border-radius:8px;padding:8px 10px;margin-top:8px;font-size:13px}#rl .msg.bad{background:#2a0f14;border:1px solid #7f1d1d;color:#fecaca}#rl .msg.warn{background:#2b1d06;border:1px solid #713f12;color:#fde68a}#rl .msg.ok{background:#06281f;border:1px solid #065f46;color:#a7f3d0}#rl .msg.info{background:#0a1a3d;border:1px solid #1e3a8a;color:#bfdbfe}
#rl ul{margin:4px 0 0 18px;padding:0}#rl li{margin:2px 0}#rl code,#rl .eq{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:#cbe3ff}
#rl .eq{display:block;background:#0a1020;border:1px solid var(--ln);border-radius:6px;padding:4px 8px;margin:3px 0}
#rl canvas{width:100%;background:#080d1a;border:1px solid var(--ln);border-radius:8px;display:block;touch-action:none}
#rl .big{font:700 22px ui-monospace,Menlo,monospace;color:#fff;word-break:break-all}
#rl details summary{cursor:pointer;color:#b8c6e4;margin:6px 0}#rl .mut{color:var(--mut);font-size:12px}
@media (max-width:640px){#rl td.v{white-space:normal;word-break:break-word}#rl td,#rl th{padding:4px 3px;font-size:12px}#rl .big{font-size:18px}#rl .hd{padding:8px 10px}#rl nav.ws{margin-left:0;width:100%}}
#rl .st li b{display:inline-block;min-width:112px}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
const root = document.createElement('div'); root.id = 'rl'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Math3D Reality Engine');
const groups = {}; P.MODULES.forEach((m) => { (groups[m.group] = groups[m.group] || []).push(m); });
root.innerHTML = `
<header class="hd"><div><div class="logo">Math<b>3D</b> Reality Engine</div><div class="sub">Measure, model, calculate and compare. Every number comes from the equations shown.</div></div>
<nav class="ws" id="rlWs" role="tablist" aria-label="Workspaces"><button role="tab" data-ws="design">Design</button><button role="tab" data-ws="photo">Photo Lab</button><button role="tab" data-ws="video">Video Lab</button><button role="tab" data-ws="calib">Calibration</button><button role="tab" data-ws="3d">3D Lab</button><button role="tab" data-ws="const">Constants</button><button role="tab" data-ws="reality" aria-selected="true">Reality Engine</button></nav>
<button class="x" id="rlClose" type="button">Close</button></header>
<main class="wrap">
<div id="rlL">
 <section aria-labelledby="rlAskH"><h2 id="rlAskH">Ask in plain language</h2>
  <label for="rlAsk">Describe a problem. I pick a model, read your numbers and units, and the engine calculates. I will not invent measurements.</label>
  <textarea id="rlAsk" placeholder="A ball is thrown at 20 m/s at 40 degrees from a 2 m high wall"></textarea>
  <div class="btns"><button class="btn" id="rlAskGo" type="button">Calculate</button><button class="btn g" data-ex="A ball is thrown at 20 m/s at 40 degrees from a 2 m high wall">Example: ball</button><button class="btn g" data-ex="A 1.5 m pendulum is released at 60 degrees">Example: pendulum</button><button class="btn g" data-ex="Time dilation for a particle at 0.9c over 1 s">Example: relativity</button></div>
  <div id="rlAskOut" aria-live="polite"></div></section>
 <section aria-labelledby="rlCalcH"><h2 id="rlCalcH">Unit-aware calculator</h2>
  <label for="rlCalc">Type a formula with units. Add "in unit" to convert. Constants: pi, phi, alpha, cLight, gGrav…</label>
  <div class="row3"><input id="rlCalc" autocomplete="off" spellcheck="false" value="0.5 * 2 kg * (3 m/s)^2 in J"><button class="btn" id="rlCalcGo" type="button">=</button></div>
  <div id="rlCalcOut" aria-live="polite"></div></section>
 <section aria-labelledby="rlModH"><h2 id="rlModH">Physics model</h2>
  <label for="rlModel">Model</label><select id="rlModel">${Object.keys(groups).map((g) => `<optgroup label="${g}">${groups[g].map((m) => `<option value="${m.id}">${m.title}</option>`).join('')}</optgroup>`).join('')}</select>
  <div id="rlInputs"></div>
  <details><summary>Input uncertainty (optional, for Monte Carlo)</summary><div class="mut">Enter one standard deviation with units for any input. The engine re-runs the model 400 times with random draws (fixed seed, so repeatable).</div><div id="rlSig"></div></details>
  <div class="btns"><button class="btn" id="rlRun" type="button">Calculate</button><button class="btn g" id="rlReset" type="button">Reset to defaults</button></div>
  <div id="rlErr"></div></section>
 <section aria-labelledby="rlCmpH"><h2 id="rlCmpH">Compare with measurements</h2>
  <div class="mut">Fits a projectile (line in x, parabola in y) to observed positions and compares the result with the model and with standard gravity.</div>
  <div class="btns"><button class="btn g" id="rlObsLab" type="button">Use tracked point from Video Lab</button><button class="btn g" id="rlObsDemo" type="button">Load SYNTHETIC demo data</button></div>
  <label for="rlObs">Or paste observations: time, x, y (metres, y upward), one per line</label><textarea id="rlObs" placeholder="0, 0, 2&#10;0.1, 1.5, 2.6&#10;0.2, 3.0, 3.1"></textarea>
  <div class="btns"><button class="btn" id="rlFit" type="button">Fit and compare</button></div><div id="rlFitOut" aria-live="polite"></div></section>
</div>
<div id="rlR">
 <section aria-labelledby="rlResH"><h2 id="rlResH">Result</h2><div id="rlRes"><div class="mut">Choose a model and press Calculate, or ask a question.</div></div></section>
 <section aria-labelledby="rlVizH"><h2 id="rlVizH">Visualization</h2><div class="mut" id="rlVizNote"></div>
  <canvas id="rlPlot" width="900" height="420" aria-label="Plot of the calculated result"></canvas>
  <div id="rlViz3" hidden><h3>3D view (drag to rotate, wheel or pinch to zoom)</h3><canvas id="rl3d" width="900" height="420" aria-label="Interactive 3D view"></canvas></div></section>
 <section aria-labelledby="rlValH"><h2 id="rlValH">Validation against known solutions</h2>
  <div class="mut">Compares the engine with closed-form results and published values, and checks that numerical error shrinks as it should.</div>
  <div class="btns"><button class="btn g" id="rlVal" type="button">Run validation suite</button></div><div id="rlValOut"></div></section>
 <section aria-labelledby="rlExpH"><h2 id="rlExpH">Project and export</h2>
  <div class="btns"><button class="btn g" id="rlSaveLS" type="button">Save in this browser</button><button class="btn g" id="rlLoadLS" type="button">Load saved</button><button class="btn g" id="rlExJson" type="button">Project (.json)</button><button class="btn g" id="rlExCsv" type="button">Data (.csv)</button><button class="btn g" id="rlExRep" type="button">Report (.md)</button><button class="btn g" id="rlExPng" type="button">Plot (.png)</button><button class="btn g" id="rlImp" type="button">Open project…</button><input type="file" id="rlImpF" accept=".json,application/json" hidden></div></section>
 <section aria-labelledby="rlStH"><h2 id="rlStH">What is complete, approximate, experimental, not implemented</h2><div id="rlStatus"></div></section>
</div></main>`;
document.body.appendChild(root);
const A = { model: 'projectile', res: null, fit: null, obs: [], sig: null, ask: '', valRun: null, view: { yaw: -0.7, pit: 0.4, z: 1 } };
const mod = () => P.BY[A.model];
/* ---------------- inputs ---------------- */
function buildInputs(vals) {
  const m = mod(); $('#rlInputs').innerHTML = m.inputs.map((i) => `<label for="rli-${i.id}">${esc(i.label)}${i.note ? ' <span class="mut">(' + esc(i.note) + ')</span>' : ''}</label><input id="rli-${i.id}" data-id="${i.id}" inputmode="decimal" autocomplete="off" placeholder="${i.def}${i.unit ? ' ' + i.unit : ''}" value="${vals && vals[i.id] !== undefined ? esc(vals[i.id]) : ''}">`).join('');
  $('#rlSig').innerHTML = m.inputs.filter((i) => i.min !== 0 || true).map((i) => `<label for="rls-${i.id}">± ${esc(i.label)}</label><input id="rls-${i.id}" data-sid="${i.id}" inputmode="decimal" placeholder="e.g. 0.5 ${i.unit || ''}">`).join('');
  $$('#rlInputs input').forEach((e) => e.addEventListener('keydown', (k) => { if (k.key === 'Enter') run(); }));
}
const readRaw = () => { const raw = {}; $$('#rlInputs input').forEach((e) => { if (e.value.trim()) raw[e.dataset.id] = e.value.trim(); }); return raw; };
function readSig() { const sig = {}, errs = []; const m = mod(); m.inputs.forEach((i) => { const e = $('#rls-' + i.id); if (!e || !e.value.trim()) return; try { const q = U.parseQuantity(e.value.trim(), { d: i.dim.slice(), unit: i.unit || '' }); if (q.v < 0) throw new Error('must not be negative'); if (q.v > 0) sig[i.id] = q.v; } catch (er) { errs.push('Uncertainty of ' + i.label + ': ' + er.message); } }); return { sig, errs }; }
/* ---------------- result rendering ---------------- */
function tagHTML(t) { const x = TAG[t] || TAG.unvalidated; return `<span class="tag ${x[1]}">${x[0]}</span>`; }
function showResult(res, mc) {
  A.res = res; const R = $('#rlRes');
  if (!res.ok) { R.innerHTML = '<div class="msg bad"><b>Cannot calculate yet.</b><ul>' + res.errors.map((e) => '<li>' + esc(e) + '</li>').join('') + '</ul></div>'; return; }
  const m = P.BY[res.id]; let banner = '';
  if (res.id === 'projectile' && res.inputs.drag > 0) banner = '<div class="msg warn"><b>Unvalidated prediction.</b> The drag coefficient, area, mass and air density are assumed values, not measurements of your object. The numerical solver is accurate; the physical drag model is not verified for your ball.</div>';
  const rows = res.outputs.map((o) => { const mcv = mc && mc.out[o.name]; return `<tr><td>${esc(o.name)}${o.note ? '<div class="mut">' + esc(o.note) + '</div>' : ''}</td><td class="v">${typeof o.v === 'number' ? fmt(o.v) : esc(o.v)} <span class="mut">${esc(o.unit)}</span>${mcv ? '<div class="mut">Monte Carlo: ' + esc(U.sigfig(mcv.mean, mcv.sd)) + ' (1σ, n=' + mcv.n + ')</div>' : ''}</td><td>${tagHTML(o.tag)}</td></tr>`; }).join('');
  const v = A.valRun; const vtxt = v ? (v.every((r) => r.pass) ? `Validation suite: ${v.length}/${v.length} checks passed in this session.` : `Validation suite: ${v.filter((r) => r.pass).length}/${v.length} passed; see failures below.`) : 'Validation suite not yet run in this session.';
  R.innerHTML = `<div>${tagHTML(res.tag)} <b>${esc(res.title)}</b></div>${banner}
  ${res.defaults.length ? '<div class="msg info"><b>Defaults used (you did not give these):</b><ul>' + res.defaults.map((d) => '<li>' + esc(d) + '</li>').join('') + '</ul>Change any value on the left to replace the default.</div>' : ''}
  <table aria-label="Results"><thead><tr><th>Quantity</th><th style="text-align:right">Value</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
  ${mc ? `<div class="mut">Monte Carlo propagates only the input uncertainties you entered, assuming independent normal errors. It does not include model error.</div>` : ''}
  ${res.errorEstimate !== undefined && res.errorEstimate !== null ? `<div class="mut">Numerical error estimate for the main result: ${fmt(res.errorEstimate)}</div>` : ''}
  <div class="mut">Digits shown are display precision (6 significant), not measurement accuracy.</div>
  <details open><summary>Governing equations</summary>${res.equations.map((e) => '<span class="eq">' + esc(e) + '</span>').join('')}</details>
  <details open><summary>Assumptions</summary><ul>${res.assumptions.map((a) => '<li>' + esc(a) + '</li>').join('')}</ul></details>
  <details><summary>Numerical method</summary><div>${esc(res.method)}</div></details>
  <details><summary>Limits of this model</summary><div>${esc(res.limits || '')}</div></details>
  <details><summary>Inputs in SI units</summary><div class="eq">${m.inputs.map((i) => esc(i.id) + ' = ' + fmt(res.inputs[i.id])).join('<br>')}</div></details>
  <div class="mut">${esc(vtxt)}</div>`;
  draw();
}
function run(noScroll) {
  const raw = readRaw(); const { sig, errs } = readSig(); $('#rlErr').innerHTML = errs.length ? '<div class="msg bad">' + errs.map(esc).join('<br>') + '</div>' : '';
  const res = P.solve(A.model, raw); let mc = null;
  if (res.ok && Object.keys(sig).length) { try { mc = P.propagate(A.model, res.inputs, sig, 400, 12345); } catch (e) { mc = null; } }
  A.sig = sig; showResult(res, mc); return res;
}
/* ---------------- plots ---------------- */
const COL = { a: '#22d3ee', b: '#fbbf24', c: '#f87171', g: '#334155', t: '#8b9bbd' };
function plot2D(cv, curves, xl, yl, equal) {
  const c = cv.getContext('2d'), W = cv.width, H = cv.height; c.clearRect(0, 0, W, H); c.fillStyle = '#080d1a'; c.fillRect(0, 0, W, H);
  const all = curves.flatMap((k) => k.pts).filter((p) => isFinite(p[0]) && isFinite(p[1])); if (!all.length) return;
  let x0 = Math.min(...all.map((p) => p[0])), x1 = Math.max(...all.map((p) => p[0])), y0 = Math.min(...all.map((p) => p[1])), y1 = Math.max(...all.map((p) => p[1]));
  if (x1 === x0) { x1 += 1; x0 -= 1; } if (y1 === y0) { y1 += 1; y0 -= 1; }
  const L = 70, Rr = 16, T = 16, B = 46, pw = W - L - Rr, ph = H - T - B; let sx = pw / (x1 - x0), sy = ph / (y1 - y0);
  if (equal) { const s = Math.min(sx, sy); sx = sy = s; }
  const X = (v) => L + (v - x0) * sx, Y = (v) => T + ph - (v - y0) * sy; c.font = '12px system-ui'; c.fillStyle = COL.t; c.strokeStyle = COL.g; c.lineWidth = 1;
  const tk = (a, b, n) => { const st = (b - a) / n, mag = Math.pow(10, Math.floor(Math.log10(st))), f = st / mag, s = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * mag, o = []; for (let v = Math.ceil(a / s) * s; v <= b + s * 1e-9; v += s) o.push(+v.toPrecision(10)); return o; };
  tk(x0, x1, 6).forEach((v) => { c.beginPath(); c.moveTo(X(v), T); c.lineTo(X(v), T + ph); c.stroke(); c.textAlign = 'center'; c.fillText(U.fmtNum(v, 3), X(v), T + ph + 16); });
  tk(y0, y1, 5).forEach((v) => { c.beginPath(); c.moveTo(L, Y(v)); c.lineTo(L + pw, Y(v)); c.stroke(); c.textAlign = 'right'; c.fillText(U.fmtNum(v, 3), L - 6, Y(v) + 4); });
  c.textAlign = 'center'; c.fillStyle = '#b8c6e4'; c.fillText(xl, L + pw / 2, H - 8); c.save(); c.translate(14, T + ph / 2); c.rotate(-Math.PI / 2); c.fillText(yl, 0, 0); c.restore();
  curves.forEach((k, i) => { c.strokeStyle = k.color; c.fillStyle = k.color; c.lineWidth = 2; if (k.dots) { k.pts.forEach((p) => { c.beginPath(); c.arc(X(p[0]), Y(p[1]), 3.2, 0, 7); c.fill(); }); } else { c.beginPath(); k.pts.forEach((p, j) => { j ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1])); }); c.stroke(); } c.textAlign = 'left'; c.fillRect(L + 8, T + 8 + i * 16, 12, 3); c.fillStyle = '#d5def0'; c.fillText(k.label, L + 26, T + 14 + i * 16); });
}
function curvesFor() {
  const r = A.res, id = A.model; const cur = []; if (!r || !r.ok || !r.series || !r.series.length) return { cur, xl: '', yl: '', equal: false, note: '' };
  const s = r.series; let xl = '', yl = '', equal = false, note = 'Plotted from the calculated model (not a drawing).';
  if (id === 'projectile' || id === 'orbit') { cur.push({ pts: s.map((p) => [p[1], p[2]]), color: COL.a, label: id === 'orbit' ? 'orbit (numerical check)' : 'model trajectory' }); xl = 'x (m)'; yl = id === 'orbit' ? 'y (m)' : 'height (m)'; equal = true; }
  else if (id === 'pendulum') { cur.push({ pts: s, color: COL.a, label: 'θ(t) (RK4)' }); xl = 'time (s)'; yl = 'angle (rad)'; }
  else if (id === 'heat') { cur.push({ pts: s.map((p) => [p[0], p[1]]), color: COL.a, label: 'numerical' }, { pts: s.map((p) => [p[0], p[2]]), color: COL.b, label: 'exact' }); xl = 'position (m)'; yl = 'temperature rise (K)'; }
  else if (id === 'waves') { cur.push({ pts: s.map((p) => [p[0], p[1]]), color: COL.a, label: 'sum of two sources (snapshot)' }); xl = 'distance (m)'; yl = 'relative displacement'; }
  else if (id === 'quantum') { cur.push({ pts: s, color: COL.a, label: '|ψ|² shape (unnormalised)' }); xl = 'position (m)'; yl = 'relative probability density'; }
  if (A.fit && (id === 'projectile') && A.obs.length) {
    const f = A.fit, o = A.obs, t0 = o[0].t; cur.push({ pts: o.map((p) => [p.x - o[0].x, p.y - 0]), color: COL.c, label: 'observations (x shifted to start at 0)', dots: true });
  }
  return { cur, xl, yl, equal, note: id === 'orbit' ? 'Orbit drawn from the numerical velocity-Verlet check, one full period.' : note };
}
function draw() {
  const { cur, xl, yl, equal, note } = curvesFor(); $('#rlVizNote').textContent = note;
  if (!cur.length) { const c = $('#rlPlot').getContext('2d'); c.clearRect(0, 0, 900, 420); c.fillStyle = '#080d1a'; c.fillRect(0, 0, 900, 420); } else plot2D($('#rlPlot'), cur, xl, yl, equal);
  const has3 = A.res && A.res.ok && (A.model === 'projectile' || A.model === 'orbit'); $('#rlViz3').hidden = !has3; if (has3) draw3();
}
function draw3() {
  const cv = $('#rl3d'), c = cv.getContext('2d'), W = cv.width, H = cv.height; c.fillStyle = '#080d1a'; c.fillRect(0, 0, W, H); const r = A.res, s = r.series, orbit = A.model === 'orbit';
  const P3 = s.map((p) => (orbit ? [p[1], 0, p[2]] : [p[1], p[2], 0])); const obs = A.obs.length && !orbit ? A.obs.map((p) => [p.x - A.obs[0].x, p.y, 0]) : [];
  const all = P3.concat(obs).concat([[0, 0, 0]]); const mn = [0, 1, 2].map((i) => Math.min(...all.map((p) => p[i]))), mx = [0, 1, 2].map((i) => Math.max(...all.map((p) => p[i])));
  const ext = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2], 1e-9), cen = [0, 1, 2].map((i) => (mn[i] + mx[i]) / 2); const k = Math.min(W, H) * 0.62 / ext * A.view.z, cy = Math.cos(A.view.yaw), sy = Math.sin(A.view.yaw), cp = Math.cos(A.view.pit), sp = Math.sin(A.view.pit);
  const pr = (p) => { const x = p[0] - cen[0], y = p[1] - cen[1], z = p[2] - cen[2]; const x1 = x * cy - z * sy, z1 = x * sy + z * cy; const y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp; const d = 1 + z2 * k * 0.0006; return [W / 2 + x1 * k / d, H / 2 - y2 * k / d]; };
  c.strokeStyle = '#1e2a47'; c.lineWidth = 1; const gy = orbit ? 0 : mn[1], n = 8, gx0 = orbit ? mn[0] : mn[0], gx1 = mx[0], gz0 = orbit ? mn[2] : -ext / 2, gz1 = orbit ? mx[2] : ext / 2;
  for (let i = 0; i <= n; i++) { const a = gx0 + (gx1 - gx0) * i / n, b = gz0 + (gz1 - gz0) * i / n; let p = pr([a, gy, gz0]), q = pr([a, gy, gz1]); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); p = pr([gx0, gy, b]); q = pr([gx1, gy, b]); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); }
  const ax = (a, b, col, lab) => { const p = pr(a), q = pr(b); c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); c.fillStyle = col; c.font = '12px system-ui'; c.fillText(lab, q[0] + 4, q[1] - 4); };
  const o = [orbit ? 0 : mn[0], orbit ? 0 : 0, 0], L = ext * 0.25; ax(o, [o[0] + L, o[1], o[2]], '#f87171', 'x ' + U.fmtNum(L, 3) + ' m'); ax(o, [o[0], o[1] + L, o[2]], '#34d399', 'up'); if (orbit) ax(o, [o[0], o[1], o[2] + L], '#60a5fa', 'y');
  c.strokeStyle = COL.a; c.lineWidth = 2.5; c.beginPath(); P3.forEach((p, i) => { const q = pr(p); i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); }); c.stroke();
  c.fillStyle = COL.c; obs.forEach((p) => { const q = pr(p); c.beginPath(); c.arc(q[0], q[1], 3, 0, 7); c.fill(); });
  if (orbit) { const rb = r.inputs.rBody; if (rb > 0) { c.strokeStyle = '#475569'; c.beginPath(); for (let i = 0; i <= 64; i++) { const a = i / 64 * 2 * Math.PI, q = pr([rb * Math.cos(a), 0, rb * Math.sin(a)]); i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); } c.stroke(); c.fillStyle = '#8b9bbd'; c.fillText('central body surface', W / 2 - 50, 20); } }
  c.fillStyle = '#8b9bbd'; c.fillText('Scale: the longest side of the box is ' + U.fmtNum(ext, 4) + ' m. Real coordinates in metres.', 10, H - 8);
}
(function bind3d() { const cv = $('#rl3d'); const pts = new Map(); let d0 = 0;
  cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); });
  cv.addEventListener('pointermove', (e) => { if (!pts.has(e.pointerId)) return; const o = pts.get(e.pointerId); if (pts.size === 1) { A.view.yaw += (e.clientX - o[0]) * 0.01; A.view.pit = Math.max(-1.5, Math.min(1.5, A.view.pit + (e.clientY - o[1]) * 0.01)); } pts.set(e.pointerId, [e.clientX, e.clientY]); if (pts.size === 2) { const v = [...pts.values()], d = Math.hypot(v[0][0] - v[1][0], v[0][1] - v[1][1]); if (d0) A.view.z = Math.max(0.3, Math.min(6, A.view.z * d / d0)); d0 = d; } draw3(); });
  const up = (e) => { pts.delete(e.pointerId); d0 = 0; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', (e) => { e.preventDefault(); A.view.z = Math.max(0.3, Math.min(6, A.view.z * (e.deltaY < 0 ? 1.1 : 0.9))); draw3(); }, { passive: false }); })();
/* ---------------- ask ---------------- */
function applyRaw(model, raw) { A.model = model; $('#rlModel').value = model; buildInputs(raw); }
function ask() {
  const t = $('#rlAsk').value.trim(); A.ask = t; const out = $('#rlAskOut'); if (!t) { out.innerHTML = '<div class="msg warn">Type a question first.</div>'; return; }
  const q = Q.parse(t); if (!q.ok) { out.innerHTML = '<div class="msg warn">' + esc(q.reason) + '</div>'; return; }
  applyRaw(q.model, q.raw);
  const u = q.understood.map((x) => '<li><code>' + esc(x.text) + '</code> → ' + esc(P.BY[q.model].inputs.find((i) => i.id === x.slot).label) + '</li>').join('');
  let html = '<div class="msg info"><b>Model chosen:</b> ' + esc(P.BY[q.model].title) + (u ? '<br><b>I read:</b><ul>' + u + '</ul>' : '') + (q.unmatched.length ? '<br>Numbers I could not place: ' + esc(q.unmatched.join(', ')) : '') + '</div>';
  if (q.missing.length) { html += '<div class="msg bad"><b>Missing:</b> ' + esc(q.missingLabels.join(' and ')) + '. I will not guess a measurement; fill it in on the left, then press Calculate.</div>'; out.innerHTML = html; showResult({ ok: false, errors: ['Missing: ' + q.missingLabels.join(', ')] }); return; }
  out.innerHTML = html; run();
}
/* ---------------- calculator ---------------- */
function calcGo() { const out = $('#rlCalcOut'); try { const r = U.calc($('#rlCalc').value); const shown = r.target ? U.fmtNum(r.vt, 8) + ' ' + r.target : U.fmtNum(r.v, 8) + (U.dimZero(r.d) ? '' : ' ' + r.si);
  out.innerHTML = '<div class="big" style="margin-top:8px">= ' + esc(shown) + '</div><div class="mut">Dimension: ' + esc(r.dim) + '. SI value: ' + esc(U.fmtNum(r.v, 10)) + ' ' + esc(U.dimZero(r.d) ? '' : r.si) + '. Exact arithmetic on double-precision numbers; constants use CODATA 2018/2019 values from the Constants tab.</div>'; }
  catch (e) { out.innerHTML = '<div class="msg bad">' + esc(e.message) + '</div>'; } }
/* ---------------- observations & fitting ---------------- */
function parseObs(txt) { const rows = []; txt.split(/\n+/).forEach((ln) => { const p = ln.trim().split(/[,;\t ]+/).map(Number); if (p.length >= 3 && p.slice(0, 3).every(isFinite)) rows.push({ t: p[0], x: p[1], y: p[2] }); }); return rows; }
function fitGo() {
  const out = $('#rlFitOut'); let rows = A.obsUnit === 'px' && A.obs.length ? A.obs : parseObs($('#rlObs').value); if (A.obsUnit !== 'px') A.obs = rows;
  if (rows.length < 5) { out.innerHTML = '<div class="msg bad">Need at least 5 observations (time, x, y). Found ' + rows.length + '.</div>'; return; }
  let fit; try { fit = P.fitTrajectory(rows); } catch (e) { out.innerHTML = '<div class="msg bad">' + esc(e.message) + '</div>'; return; }
  A.fit = fit; const px = A.obsUnit === 'px'; let html = ''; const tb = [];
  if (fit.g < 0 && !px) html += '<div class="msg warn">The fitted curve opens upward (negative gravity). Check that y points up, or flip the sign of y.</div>';
  const row = (n, v, se, u, tag) => tb.push(`<tr><td>${n}</td><td class="v">${esc(se ? U.sigfig(v, se) : fmt(v))} <span class="mut">${u}</span></td><td>${tagHTML(tag)}</td></tr>`);
  if (!px) { row('Horizontal speed vₓ', fit.vx, fit.vxSE, 'm/s', 'empirical'); row('Launch speed (at first sample)', fit.speed, null, 'm/s', 'empirical'); row('Launch angle', fit.angle * 180 / Math.PI, null, 'deg', 'empirical'); row('Fitted gravity g', fit.g, fit.gSE, 'm/s²', 'empirical'); }
  else { const sc = fit.g / P.G0; row('Fitted acceleration', fit.g, fit.gSE, 'px/s²', 'empirical'); row('Scale IF only gravity acts (assumption)', sc, fit.gSE / P.G0, 'px per m', 'unvalidated'); row('Launch speed under that assumption', fit.speed / sc, null, 'm/s', 'unvalidated'); }
  row('RMS residual x', fit.rmsX, null, px ? 'px' : 'm', 'empirical'); row('RMS residual y', fit.rmsY, null, px ? 'px' : 'm', 'empirical');
  html += `<table aria-label="Fit results"><tbody>${tb.join('')}</tbody></table><div class="mut">${fit.n} observations. ${esc(fit.method)}.</div>`;
  const notes = [];
  if (!px) { const z = fit.gZ; notes.push(Math.abs(z) < 3 ? `Fitted g = ${fit.g.toFixed(3)} ± ${fit.gSE.toFixed(3)} m/s² is consistent with standard gravity ${P.G0} m/s² (${z.toFixed(1)} standard errors apart). Consistency does not prove the calibration is right.` : `Fitted g = ${fit.g.toFixed(3)} ± ${fit.gSE.toFixed(3)} m/s² differs from ${P.G0} m/s² by ${Math.abs(z).toFixed(1)} standard errors. Likely causes, most probable first: wrong length scale in the calibration (g scales with it), wrong frame rate, camera not square-on to the plane of motion, lens distortion, air drag, tracking drift.`); }
  notes.push(fit.caveat);
  const r = A.res; if (r && r.ok && A.model === 'projectile') { const I = r.inputs; const pred = rows.map((o) => { const tt = o.t - rows[0].t; return (rows[0].y) + I.speed * Math.sin(I.angle) * tt - 0.5 * I.g * tt * tt; }); const cmp = P.compare(pred, rows.map((o) => o.y)); const sp = Math.hypot(fit.vx, fit.vy0);
    notes.push(`Model vs observation: the model entered on the left (${fmt(I.speed)} m/s at ${(I.angle * 180 / Math.PI).toFixed(1)}°), started at the first observed height, differs from the observed heights by RMS ${fmt(cmp.rms)} m (largest ${fmt(cmp.max)} m). Measured launch speed ${fmt(sp)} m/s at ${(fit.angle * 180 / Math.PI).toFixed(1)}°. This compares vertical motion only and ignores drag.`); }
  notes.push('To improve this: include a reference length of known size in the same plane as the motion; confirm the true frame rate; track more frames; film square-on with the camera far away and zoomed in; remove lens distortion.');
  html += '<div class="msg info"><ul>' + notes.map((n) => '<li>' + esc(n) + '</li>').join('') + '</ul></div>';
  const rp = fit.resid; html += '<details><summary>Residuals by sample</summary><div class="eq">' + rp.slice(0, 60).map((q) => 't=' + q.t.toFixed(3) + '  dx=' + q.rx.toExponential(2) + '  dy=' + q.ry.toExponential(2)).join('<br>') + '</div></details>';
  out.innerHTML = html;
  if (A.model === 'projectile' && A.res && A.res.ok) {
    const cur = curvesFor(); const o = rows, tt = o.map((p) => p.t - o[0].t); const fitPts = tt.map((t, i) => [o[i].x - o[0].x, fit.rmsY * 0 + (o[0].y + fit.vy0 * t + 0.5 * -fit.g * t * t)]); cur.cur.push({ pts: fitPts, color: COL.b, label: 'fitted curve' }); plot2D($('#rlPlot'), cur.cur, cur.xl, cur.yl, true);
  }
}
function labObs() {
  if (!window.MLAB || !MLAB.trackObservations) { toast('Video Lab is not available.'); return; }
  const o = MLAB.trackObservations(0); const out = $('#rlFitOut'); if (!o.ok) { out.innerHTML = '<div class="msg warn">' + esc(o.reason) + '</div>'; return; }
  A.obsUnit = o.unit; let rows = o.samples;
  if (o.unit === 'm') { const g = P.polyFit(rows.map((r) => r.t), rows.map((r) => r.y), 2); if (g.c[2] > 0) { rows = rows.map((r) => ({ t: r.t, x: r.x, y: -r.y })); } }
  A.obs = rows; A.obsUnit = o.unit; $('#rlObs').value = rows.map((r) => [r.t, r.x, r.y].map((v) => +v.toPrecision(7)).join(', ')).join('\n');
  out.innerHTML = '<div class="msg info">Loaded ' + rows.length + ' tracked frames. ' + esc(o.source) + (o.unit === 'm' ? ' Vertical sign chosen so the parabola opens downward (gravity down); this orientation choice is an assumption.' : '') + '</div>'; if (o.unit === 'px') A.obsUnit = 'px'; fitGo();
}
function demoObs() {
  const r = P.rng(2024), n = 36, rows = []; for (let i = 0; i < n; i++) { const t = i / 30; rows.push({ t: +t.toFixed(4), x: +(0.4 + 6.2 * t + 0.004 * P.gauss(r)).toFixed(5), y: +(1.1 + 7.4 * t - 0.5 * P.G0 * t * t + 0.004 * P.gauss(r)).toFixed(5) }); }
  A.ask = ''; A.obsUnit = 'm'; A.obs = rows; $('#rlObs').value = rows.map((q) => [q.t, q.x, q.y].join(', ')).join('\n'); $('#rlFitOut').innerHTML = '<div class="msg warn"><b>SYNTHETIC data.</b> Generated by this page from a known parabola (6.2 m/s horizontal, 7.4 m/s vertical, g = 9.80665) plus 4 mm of random noise at 30 frames/s. It demonstrates the fitting; it is not an experiment.</div>'; applyRaw('projectile', { speed: '9.65 m/s', angle: '50.0 deg', h0: '1.1 m' }); run(); fitGo();
}
/* ---------------- validation ---------------- */
function validate() { const out = $('#rlValOut'); let v; try { v = P.validate(); } catch (e) { out.innerHTML = '<div class="msg bad">' + esc(e.message) + '</div>'; return; } A.valRun = v; const ok = v.filter((r) => r.pass).length;
  out.innerHTML = `<div class="msg ${ok === v.length ? 'ok' : 'bad'}"><b>${ok} of ${v.length} checks passed.</b></div><table aria-label="Validation results"><thead><tr><th>Check</th><th>Engine</th><th>Reference</th><th>Result</th></tr></thead><tbody>${v.map((r) => `<tr><td>${esc(r.name)}${r.note ? '<div class="mut">' + esc(r.note) + '</div>' : ''}</td><td class="v">${fmt(r.got)}</td><td class="v">${fmt(r.ref)}</td><td>${r.pass ? '✔ pass' : '✘ FAIL'}<div class="mut">rel. diff ${r.relErr.toExponential(1)}</div></td></tr>`).join('')}</tbody></table><div class="mut">References are closed-form solutions or published constants. A passing check shows the code matches that reference, not that a real object behaves that way.</div>`; return v; }
/* ---------------- export / project ---------------- */
const project = () => ({ app: 'Math3D Reality Engine', version: 1, saved: new Date().toISOString(), model: A.model, inputsRaw: readRaw(), question: A.ask, observations: A.obs, obsUnit: A.obsUnit || 'm', result: A.res && A.res.ok ? { title: A.res.title, tag: A.res.tag, method: A.res.method, equations: A.res.equations, assumptions: A.res.assumptions, limits: A.res.limits, defaultsUsed: A.res.defaults, inputsSI: A.res.inputs, outputs: A.res.outputs } : null, fit: A.fit ? { n: A.fit.n, vx: A.fit.vx, vxSE: A.fit.vxSE, speed: A.fit.speed, angle_rad: A.fit.angle, g: A.fit.g, gSE: A.fit.gSE, rmsX: A.fit.rmsX, rmsY: A.fit.rmsY } : null });
const save = (txt, name, type) => { const b = new Blob([txt], { type }); MCU.saveFile(b, name); };
function loadProject(p) { if (!p || p.app !== 'Math3D Reality Engine' || !P.BY[p.model]) throw new Error('This is not a Reality Engine project file.'); A.ask = p.question || ''; $('#rlAsk').value = A.ask; applyRaw(p.model, p.inputsRaw || {}); A.obs = p.observations || []; A.obsUnit = p.obsUnit || 'm'; $('#rlObs').value = A.obs.map((r) => [r.t, r.x, r.y].join(', ')).join('\n'); A.fit = null; run(); if (A.obs.length >= 5) fitGo(); }
function report() {
  const r = A.res; if (!r || !r.ok) return null; const L = ['# ' + r.title + ' (Math3D Reality Engine report)', '', 'Generated: ' + new Date().toISOString(), '', '**Result status:** ' + (TAG[r.tag] || TAG.unvalidated)[0], '', A.ask ? '**Question:** ' + A.ask + '\n' : '', '## Results', '', '| Quantity | Value | Status |', '|---|---|---|'];
  r.outputs.forEach((o) => L.push(`| ${o.name} | ${typeof o.v === 'number' ? fmt(o.v) : o.v} ${o.unit} | ${(TAG[o.tag] || TAG.unvalidated)[0]} |`));
  L.push('', '## Governing equations', '', ...r.equations.map((e) => '- `' + e + '`'), '', '## Assumptions', '', ...r.assumptions.map((a) => '- ' + a), '', '## Method', '', r.method, '', '## Limits', '', r.limits || '', '');
  if (r.defaults.length) L.push('## Defaults used (not supplied by the user)', '', ...r.defaults.map((d) => '- ' + d), '');
  L.push('## Inputs (SI)', '', ...P.BY[r.id].inputs.map((i) => `- ${i.label}: ${fmt(r.inputs[i.id])}`), '');
  if (A.fit) L.push('## Comparison with measurements', '', `${A.fit.n} observations. Fitted g = ${A.fit.g.toFixed(4)} ± ${A.fit.gSE.toFixed(4)} (standard gravity ${P.G0}). Launch speed ${fmt(A.fit.speed)}, angle ${(A.fit.angle * 180 / Math.PI).toFixed(2)} deg. RMS residuals x ${fmt(A.fit.rmsX)}, y ${fmt(A.fit.rmsY)}. ${A.fit.caveat}`, '');
  if (A.valRun) L.push('## Validation suite', '', `${A.valRun.filter((x) => x.pass).length}/${A.valRun.length} checks passed.`, '');
  L.push('---', 'Digits are display precision, not accuracy. Standard errors cover scatter only, not calibration or model error.'); return L.join('\n');
}
function csv() { const r = A.res; if (!r || !r.ok || !r.series.length) return null; const hdr = { projectile: 't_s,x_m,y_m', orbit: 't_s,x_m,y_m', pendulum: 't_s,theta_rad', heat: 'x_m,T_numerical_K,T_exact_K', waves: 'x_m,displacement,unused', quantum: 'x_m,relative_density' }[r.id] || 'a,b,c'; let t = hdr + '\n' + r.series.map((p) => p.join(',')).join('\n'); if (A.obs.length) t += '\n\n# observations (' + (A.obsUnit || 'm') + ')\nt,x,y\n' + A.obs.map((o) => [o.t, o.x, o.y].join(',')).join('\n'); return t; }
/* ---------------- status ---------------- */
$('#rlStatus').innerHTML = `<ul class="st">
<li><b style="color:#34d399">Complete</b> Unit-aware calculator with dimension checks; projectile (closed form and RK4 drag), 1-D collision, pendulum, two-body orbit and escape speed, wave superposition and string harmonics, 1-D heat conduction, special relativity, particle in a box and hydrogen levels; Monte Carlo input uncertainty; least-squares trajectory fit with standard errors; validation suite; plain-language parsing of these eight models; JSON, CSV, Markdown and PNG export.</li>
<li><b style="color:#60a5fa">Approximate</b> Drag uses an assumed coefficient; heat is explicit finite differences in 1-D; orbits ignore other bodies and oblateness; fit errors cover scatter only, not calibration.</li>
<li><b style="color:#fbbf24">Experimental</b> Using calibrated tracks as observations (assumes the motion lies in the calibrated plane); pixel-only fits with an assumed g.</li>
<li><b style="color:#f87171">Not implemented</b> Rigid-body multi-contact simulation, N-body orbits, electric and magnetic field solvers, fluid dynamics, stress and deformation, general relativity, multi-electron quantum, true multi-view 3D reconstruction, background workers or GPU acceleration, Three.js (a built-in software renderer is used).</li></ul>`;
/* ---------------- wiring ---------------- */
$('#rlModel').onchange = () => { A.model = $('#rlModel').value; A.ask = ''; A.res = null; A.fit = null; buildInputs(); $('#rlRes').innerHTML = '<div class="mut">Press Calculate.</div>'; draw(); };
$('#rlRun').onclick = () => run(); $('#rlReset').onclick = () => { buildInputs(); run(); };
$('#rlAskGo').onclick = ask; $('#rlAsk').addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ask(); });
$$('[data-ex]', root).forEach((b) => { b.onclick = () => { $('#rlAsk').value = b.dataset.ex; ask(); }; });
$('#rlCalcGo').onclick = calcGo; $('#rlCalc').addEventListener('keydown', (e) => { if (e.key === 'Enter') calcGo(); });
$('#rlFit').onclick = () => { A.obsUnit = 'm'; fitGo(); }; $('#rlObsLab').onclick = labObs; $('#rlObsDemo').onclick = demoObs; $('#rlVal').onclick = () => { validate(); if (A.res && A.res.ok) showResult(A.res); };
$('#rlObs').addEventListener('input', () => { A.obsUnit = 'm'; });
$('#rlExJson').onclick = () => save(JSON.stringify(project(), null, 2), 'reality-project.json', 'application/json');
$('#rlExCsv').onclick = () => { const t = csv(); t ? save(t, 'reality-data.csv', 'text/csv') : toast('Calculate something first.'); };
$('#rlExRep').onclick = () => { const t = report(); t ? save(t, 'reality-report.md', 'text/markdown') : toast('Calculate something first.'); };
$('#rlExPng').onclick = () => { $('#rlPlot').toBlob((b) => b && MCU.saveFile(b, 'reality-plot.png')); };
$('#rlSaveLS').onclick = () => { try { localStorage.setItem('mc-reality-v1', JSON.stringify(project())); toast('Saved in this browser.'); } catch (e) { toast('This browser blocked saving. Use Project (.json) instead.'); } };
$('#rlLoadLS').onclick = () => { try { const t = localStorage.getItem('mc-reality-v1'); if (!t) { toast('Nothing saved yet.'); return; } loadProject(JSON.parse(t)); } catch (e) { toast('Could not load: ' + e.message); } };
$('#rlImp').onclick = () => $('#rlImpF').click(); $('#rlImpF').onchange = async (e) => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; try { loadProject(JSON.parse(await f.text())); } catch (er) { toast('Could not open: ' + er.message); } };
$('#rlWs').onclick = (e) => { const b = e.target.closest('[data-ws]'); if (!b || b.dataset.ws === 'reality') return; close(); if (window.HUB) window.HUB.go(b.dataset.ws); };
function open() { root.hidden = false; document.body.style.overflow = 'hidden'; if (!A.init) { A.init = true; buildInputs(); calcGo(); try { validate(); } catch (e) { /* ignore */ } run(); } setTimeout(() => $('#rlClose').focus(), 0); }
function close() { root.hidden = true; document.body.style.overflow = ''; }
$('#rlClose').onclick = close; root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !e.defaultPrevented && document.activeElement && document.activeElement.tagName !== 'TEXTAREA') close(); });
document.addEventListener('click', (e) => { if (e.target.closest('#rlBtn') || e.target.closest('[data-openreality]')) open(); });
window.REAL = { open, close, state: A, run, ask, calc: calcGo, validate, fit: fitGo, project, report, csv, loadProject, setModel: (m, raw) => applyRaw(m, raw || {}) };
})();
