/* Math3D 3D Lab: a dark dashboard for building a parametric surface from real equations, watching its numbers, animating and exporting it.
   Everything shown is computed from the actual mesh (area, volume, bounding box, Euler characteristic) with exact formulas beside it where they exist. */
(function () {
'use strict';
const MC = window.MC, M3 = window.M3D, MX = window.MX, MCU = window.MCU;
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const n2 = (v, d) => (typeof v === 'number' && isFinite(v) ? (v !== 0 && Math.abs(v) < Math.pow(10, -(d == null ? 2 : d)) * 5 ? v.toPrecision(3) : v.toFixed(d == null ? 2 : d)) : '–');
const toast = (m) => { try { MCU.toast(m); } catch (e) { /* ignore */ } };
const TAU = Math.PI * 2;
const evalExpr = (src, sc) => MX.compile(src, M3.VARS).fn(M3.VARS.map((k) => (sc && sc[k] != null ? sc[k] : 0)));

const css = `
#m3{position:fixed;inset:0;z-index:91;overflow:auto;background:#070b14;color:#d5def0;font:13px/1.45 var(--f-body,system-ui,sans-serif);--bg:#070b14;--pn:#0f1626;--pn2:#141c30;--ln:#1f2a44;--ac:#3b82f6;--ac2:#22d3ee;--mu:#8696b6;--ok:#34d399;--bad:#f87171;--wr:#fbbf24}
#m3[hidden]{display:none}#m3 *{box-sizing:border-box}
#m3 button{font:inherit;color:inherit;background:var(--pn2);border:1px solid var(--ln);border-radius:6px;padding:5px 10px;cursor:pointer;min-height:30px}
#m3 button:hover{border-color:#34508a}#m3 button:focus-visible,#m3 input:focus-visible,#m3 select:focus-visible,#m3 textarea:focus-visible{outline:2px solid var(--ac2);outline-offset:1px}
#m3 button.on,#m3 button[aria-pressed=true],#m3 button[aria-selected=true]{background:#13306b;border-color:var(--ac);color:#e6f0ff}
#m3 button.go{background:linear-gradient(90deg,#2563eb,#7c3aed);border-color:transparent;color:#fff;font-weight:600}
#m3 button:disabled{opacity:.45;cursor:default}
#m3 header.hd{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:14px;padding:8px 14px;background:rgba(10,15,28,.96);border-bottom:1px solid var(--ln);flex-wrap:wrap}
#m3 .logo{font:700 20px var(--f-body,system-ui);letter-spacing:.01em;color:#fff}#m3 .logo b{color:var(--ac)}
#m3 .sub{color:var(--mu);font-size:11.5px}
#m3 nav.ws{display:flex;gap:2px;flex-wrap:wrap}#m3 nav.ws button{border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:8px 10px}#m3 nav.ws button[aria-selected=true]{border-bottom-color:var(--ac2);background:#0b2a35;color:#d9f6ff}
#m3 nav.pills{display:flex;gap:2px;margin-left:auto;flex-wrap:wrap}
#m3 nav.pills button{border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:8px 12px}
#m3 nav.pills button[aria-selected=true]{border-bottom-color:var(--ac);background:#0d1a38}
#m3 .wrap{padding:10px 14px 24px;display:grid;gap:10px}
#m3 .main{display:grid;grid-template-columns:300px minmax(0,1fr) 340px;gap:10px}
#m3 .row2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
#m3 section.pn{background:var(--pn);border:1px solid var(--ln);border-radius:10px;padding:10px 12px;min-width:0}
#m3 section.pn[hidden]{display:none}
#m3 h3{margin:0 0 8px;font:600 12px var(--f-body,system-ui);letter-spacing:.05em;color:#cfe0ff}
#m3 h4{margin:10px 0 4px;font:600 11px var(--f-body,system-ui);color:var(--mu);letter-spacing:.06em;text-transform:uppercase}
#m3 label{display:block;color:#b4c3df;margin:6px 0 2px}
#m3 input[type=range]{width:100%;accent-color:var(--ac)}
#m3 input[type=number],#m3 input[type=text],#m3 select,#m3 textarea{width:100%;background:#0a1020;color:#e6eefc;border:1px solid var(--ln);border-radius:6px;padding:5px 8px;min-height:30px;font:12px ui-monospace,Menlo,Consolas,monospace}
#m3 textarea{min-height:112px;resize:vertical;line-height:1.5}
#m3 .shapes label{display:flex;align-items:center;gap:8px;margin:2px 0;padding:6px 8px;border-radius:7px;border:1px solid transparent;cursor:pointer}
#m3 .shapes label:has(input:checked){background:#10224a;border-color:var(--ac)}
#m3 .sl{display:flex;justify-content:space-between;color:#b4c3df;margin-top:6px}#m3 .sl output{color:#7dd3fc;font-family:ui-monospace,Menlo,monospace}
#m3 .view{position:relative;background:radial-gradient(ellipse at 50% 40%,#101a33,#070b14);border:1px solid var(--ln);border-radius:10px;min-height:380px;height:clamp(380px,52vh,560px);overflow:hidden;touch-action:none}
#m3 .view canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab}
#m3 .vtabs{position:absolute;left:8px;top:8px;display:flex;gap:3px;z-index:2}
#m3 .vtabs button{padding:3px 9px;min-height:26px;background:rgba(15,22,38,.88)}
#m3 .fps{position:absolute;right:10px;top:10px;font:11px ui-monospace,monospace;color:var(--ok);background:rgba(7,11,20,.8);padding:2px 7px;border-radius:5px;z-index:2}
#m3 .xyz{position:absolute;right:10px;bottom:48px;font:11px ui-monospace,monospace;color:#9fd0ff;background:rgba(7,11,20,.8);padding:2px 7px;border-radius:5px;z-index:2}
#m3 .tools{position:absolute;left:50%;transform:translateX(-50%);bottom:8px;display:flex;gap:3px;z-index:2;max-width:calc(100% - 16px);flex-wrap:wrap;justify-content:center}
#m3 .tools button{padding:3px 9px;min-height:28px;background:rgba(15,22,38,.9)}
#m3 .eq{font:13px/1.7 Cambria,'Times New Roman',serif;color:#e4ecff}#m3 .eq i{color:#93c5fd}
#m3 .mx{display:inline-block;font:12px/1.35 ui-monospace,Menlo,monospace;border-left:2px solid #4b5f8f;border-right:2px solid #4b5f8f;padding:1px 7px;margin:2px 4px;border-radius:4px;vertical-align:middle;white-space:pre;color:#cfe0ff}
#m3 table{width:100%;border-collapse:collapse;font-size:12px}#m3 td{padding:3px 0;border-bottom:1px solid #18223b}#m3 td:last-child{text-align:right;color:#8ec5ff;font-family:ui-monospace,Menlo,monospace}
#m3 .ok{color:var(--ok)}#m3 .bad{color:var(--bad)}#m3 .wr{color:var(--wr)}#m3 .mu{color:var(--mu)}
#m3 .tg{display:inline-block;font:600 10px var(--f-body,system-ui);padding:0 6px;border-radius:999px;border:1px solid currentColor;vertical-align:1px;margin-left:4px}
#m3 .tg.m{color:#22d3ee}#m3 .tg.c{color:#a78bfa}#m3 .tg.a{color:#fb923c}
#m3 .two{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#m3 .mtabs{display:flex;gap:2px;border-bottom:1px solid var(--ln);margin:-4px 0 8px}
#m3 .mtabs button{border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:5px 10px}
#m3 .mtabs button[aria-selected=true]{border-bottom-color:var(--ac)}
#m3 .log{font:11.5px/1.6 ui-monospace,Menlo,monospace;max-height:170px;overflow:auto;background:#080d1a;border:1px solid var(--ln);border-radius:6px;padding:6px 8px}
#m3 .log .e{color:var(--bad)}#m3 .log .w{color:var(--wr)}#m3 .log .i{color:#7dd3fc}
#m3 .errbox{border:1px solid #7f1d1d;background:#2a0f14;border-radius:6px;padding:7px 9px;margin-top:6px}
#m3 canvas.pv{width:100%;aspect-ratio:16/9;background:#080d1a;border:1px solid var(--ln);border-radius:6px;display:block}
#m3 .bar{height:6px;background:#0a1020;border-radius:4px;overflow:hidden;margin-top:6px}#m3 .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2563eb,#7c3aed)}
#m3 .crow{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:10px}#m3 .crow[hidden]{display:none}@media (max-width:900px){#m3 .crow{grid-template-columns:minmax(0,1fr)}}
#m3 td.n{text-align:left;color:#d5def0;font-family:inherit}#m3 .ct td{vertical-align:top}#m3 .ct td:nth-child(2){text-align:left;color:#d5def0;font-family:inherit}#m3 .ct td:nth-child(3){text-align:right;white-space:nowrap}#m3 .sim{display:block;width:100%;text-align:left;margin:4px 0;padding:8px 10px}#m3 .sim small{display:block;color:var(--mu)}
@media (min-width:1101px){#m3[data-cols=none] .main{grid-template-columns:minmax(0,1fr)}#m3[data-cols=l] .main{grid-template-columns:300px minmax(0,1fr)}#m3[data-cols=r] .main{grid-template-columns:minmax(0,1fr) 340px}}
#m3 .col[hidden]{display:none}
@media (max-width:1100px){#m3 .main{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#m3 .view{grid-column:1/-1;order:-1}#m3 .row2{grid-template-columns:minmax(0,1fr)}}
@media (max-width:640px){#m3 .xyz{bottom:auto;top:40px}#m3 .main{grid-template-columns:minmax(0,1fr)}#m3 .wrap{padding:8px 10px 20px}#m3 nav.pills{margin-left:0;width:100%}#m3 nav.pills button{flex:1;padding:8px 4px}#m3 .view{min-height:300px;height:56vh}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

const root = document.createElement('div'); root.id = 'm3'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Math3D 3D Lab');
root.innerHTML = `
<header class="hd">
  <div><div class="logo">Math<b>3D</b></div><div class="sub">Create 3D Objects • Visualize Real Mathematics • Edit • Animate</div></div>
  <span class="sub">Powered by real math</span>
  <nav class="ws" id="m3Ws" role="tablist" aria-label="Workspaces"><button role="tab" data-ws="design">Design</button><button role="tab" data-ws="photo">Photo Lab</button><button role="tab" data-ws="video">Video Lab</button><button role="tab" data-ws="calib">Calibration</button><button role="tab" data-ws="3d" aria-selected="true">3D Lab</button><button role="tab" data-ws="const">Constants</button><button role="tab" data-ws="reality">Reality Engine</button></nav>
  <nav class="pills" role="tablist" aria-label="Views">
    <button role="tab" data-view="3d" aria-selected="true">3D</button><button role="tab" data-view="anim" aria-selected="false">Animation</button><button role="tab" data-view="edit" aria-selected="false">Editor</button><button role="tab" data-view="math" aria-selected="false">Math</button><button role="tab" data-view="exp" aria-selected="false">Export</button>
  </nav>
  <button type="button" id="m3Measure" title="Send a picture of this view to the Photo Lab so you can measure it">Measure this view</button>
  <button type="button" data-guide title="Open the quick guide">Guide</button>
  <button type="button" id="m3Add" title="Put this model into your design">Add to design</button>
  <button type="button" id="m3Close" aria-label="Close the 3D Lab">Close</button>
</header>
<div class="wrap">
 <div class="main">
  <div id="colL" class="col" style="display:grid;gap:10px;align-content:start">
   <section class="pn" data-v="3d edit math anim"><h3>1. Choose Shape / Enter Equation</h3><div class="shapes" id="m3Shapes"></div></section>
   <section class="pn" data-v="3d edit math"><h3 id="m3PName">Parameters</h3><div id="m3Params"></div></section>
   <section class="pn" data-v="3d anim"><h3>Animation</h3><div id="m3Anim"></div></section>
  </div>
  <div class="view" id="m3View">
   <div class="vtabs" id="m3Mode"><button data-mode="both" class="on">3D View</button><button data-mode="wire">Wireframe</button><button data-mode="solid">Solid</button><button data-mode="points">Points</button></div>
   <div class="fps" id="m3Fps">FPS –</div><div class="xyz" id="m3Xyz">x: – y: – z: –</div>
   <canvas id="m3Cv" tabindex="0" aria-label="3D view. Drag to rotate, scroll to zoom."></canvas>
   <div class="tools" id="m3Tools"><button data-t="rot" class="on">Rotate</button><button data-t="pan">Pan</button><button data-t="zoom">Zoom</button><button data-t="reset">Reset</button><button data-t="shot">Screenshot</button></div>
  </div>
  <div id="colR" class="col" style="display:grid;gap:10px;align-content:start">
   <section class="pn" data-v="3d math"><h3>Mathematical Model</h3><div id="m3Model"></div></section>
   <section class="pn" data-v="3d math edit"><h3>Real-time Calculations</h3><div id="m3Calc"></div></section>
  </div>
 </div>
 <div class="crow" id="m3ConstRow">
  <section class="pn" data-v="const"><h3>Real-world constants</h3><p class="mu" style="margin:0 0 6px">Values: NIST CODATA 2022, or exact by definition. Click <b>Use</b> to type the name into the Live Math Editor, then press Apply Changes.</p>
   <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px"><input type="text" id="m3CSearch" placeholder="Search: alpha, golden, light…" aria-label="Search constants" style="flex:1;min-width:140px"><select id="m3CCat" aria-label="Category" style="width:auto"><option value="">All kinds</option></select></div>
   <div id="m3CList" style="max-height:420px;overflow:auto"></div></section>
  <div style="display:grid;gap:10px;align-content:start;min-width:0">
   <section class="pn" data-v="const"><h3>Simulations that use the constants</h3><div id="m3Sims"></div></section>
   <section class="pn" data-v="const"><h3>Sunflower seeds: the golden angle</h3><canvas class="pv" id="m3Sun" width="480" height="300" aria-label="Sunflower seed pattern"></canvas><div class="sl"><span>Turn per seed</span><output id="m3SunO"></output></div><input type="range" id="m3SunA" min="130" max="145" step="0.0005" aria-label="Turn per seed in degrees"><div class="sl"><span>Seeds</span><output id="m3SunNO">800</output></div><input type="range" id="m3SunN" min="100" max="2500" step="10" value="800" aria-label="Number of seeds"><div class="mu" id="m3SunT" style="margin-top:4px"></div></section>
   <section class="pn" data-v="const"><h3>Hydrogen atom (Bohr model) from the constants</h3><div id="m3Bohr"></div></section>
  </div>
 </div>
 <div class="row2">
  <section class="pn" data-v="3d anim exp"><h3>Animation Preview</h3><canvas class="pv" id="m3Pv" width="480" height="270"></canvas>
   <div style="display:flex;gap:8px;align-items:center;margin-top:6px"><button type="button" id="m3Play" aria-label="Play or pause" style="min-width:36px">⏸</button><span class="mu" id="m3Tm" style="font-family:ui-monospace,monospace">0:00 / 0:10</span></div>
   <h4>Frame Controls</h4><div class="sl"><span>Frame</span><output id="m3FrO">0 / 600</output></div><input type="range" id="m3Fr" min="0" max="600" step="1" value="0" aria-label="Frame">
   <div class="sl"><span>Speed</span><output id="m3SpO">1.0x</output></div><input type="range" id="m3Sp" min="0.1" max="3" step="0.1" value="1" aria-label="Playback speed">
   <h4>Video Export</h4><div class="two"><div><label for="m3Fmt">Format</label><select id="m3Fmt"><option value="mp4">MP4 (H.264)</option><option value="webm">WebM</option></select></div><div><label for="m3Res">Resolution</label><select id="m3Res"><option value="720">720p</option><option value="1080" selected>1080p</option><option value="480">480p</option></select></div></div>
   <button type="button" class="go" id="m3Vid" style="width:100%;margin-top:8px">Export Video</button><div class="bar"><i id="m3VidBar"></i></div><div class="mu" id="m3VidSt" style="margin-top:4px;font-size:12px" aria-live="polite"></div></section>
  <section class="pn" data-v="3d math"><h3>Real-time Math Measurement</h3><div class="mtabs" id="m3MTabs"><button data-mt="s" aria-selected="true">Surface</button><button data-mt="d" aria-selected="false">Dimensions</button><button data-mt="p" aria-selected="false">Properties</button></div><div id="m3Meas"></div></section>
  <section class="pn" data-v="3d edit const"><h3>Live Math Editor</h3><div id="m3Edit"></div></section>
 </div>
  <section class="pn" data-v="const"><h3>Consistency checks: can the constants rebuild each other?</h3><p class="mu" style="margin:0 0 6px">Each row recomputes one constant from others with the formula shown, then compares with the published value.</p><div id="m3Checks"></div></section>
 <section class="pn" data-v="3d edit anim math exp const"><h3>Math &amp; Rendering Logs</h3><div class="log" id="m3Log" role="log" aria-live="polite"></div><div id="m3Err"></div></section>
 <section class="pn" data-v="exp"><h3>Export the model</h3><p class="mu">Exports use the exact mesh shown on screen. STL and OBJ are in the model's own units.</p><div id="m3Exp" style="display:flex;gap:6px;flex-wrap:wrap"></div></section>
</div>`;
document.body.appendChild(root);

/* ------------------------------------------------------------------ shapes */
const SHAPES = [
  { k: 'torus', name: 'Torus (doughnut)', sl: [['R', 'Major Radius R', 0.5, 5, 0.05, 2.5], ['r', 'Minor Radius r', 0.1, 3, 0.05, 1.0]], seg: ['Tube Segments (u)', 'Radial Segments (v)', 64, 32] },
  { k: 'sphere', name: 'Sphere', sl: [['R', 'Radius R', 0.3, 4, 0.05, 1.8]], seg: ['Longitude Segments (u)', 'Latitude Segments (v)', 48, 24] },
  { k: 'klein', name: 'Klein Bottle', sl: [['R', 'Radius R', 0.8, 4, 0.05, 2], ['r', 'Tube size r', 0.3, 3, 0.05, 1]], seg: ['Segments (u)', 'Segments (v)', 80, 40] },
  { k: 'mobius', name: 'Möbius Strip', sl: [['R', 'Radius R', 0.8, 4, 0.05, 1.8], ['w', 'Strip width', 0.2, 2, 0.05, 0.8]], seg: ['Segments (u)', 'Segments (v)', 96, 8] },
  { k: 'cylinder', name: 'Cylinder', sl: [['R', 'Radius R', 0.3, 4, 0.05, 1.2], ['h', 'Height', 0.4, 6, 0.1, 2.4]], seg: ['Segments (u)', 'Segments (v)', 48, 6] },
  { k: 'custom', name: 'Custom Equation', sl: [['a', 'Parameter a', -3, 3, 0.05, 1], ['b', 'Parameter b', -3, 3, 0.05, 0.5]], seg: ['Segments (u)', 'Segments (v)', 64, 48] },
];
const CUSTOM0 = { fx: 'cos(u)*(2 + cos(v))', fy: 'sin(u)*(2 + cos(v))', fz: 'sin(v) + a*sin(3*u)*0.3', umin: 0, umax: TAU, vmin: 0, vmax: TAU };
const A = { shape: 'torus', vals: {}, nu: 64, nv: 32, mode: 'both', tool: 'rot', L: null, T: 0, playing: true, speed: 1, sp: [0.5, 0.5, 0.2], logs: [], custom: Object.assign({}, CUSTOM0), mt: 's', view: '3d', drag: null, frames: 0, fpsT: 0, fps: 0, vid: null, errs: [] };
const log = (lvl, msg) => { const d = new Date(), ts = [d.getHours(), d.getMinutes(), d.getSeconds()].map((v) => String(v).padStart(2, '0')).join(':'); A.logs.push({ lvl, msg, ts }); if (A.logs.length > 60) A.logs.shift(); renderLog(); };
function renderLog() { const el = $('#m3Log'); if (!el) return; el.innerHTML = A.logs.map((l) => '<div class="' + l.lvl + '">[' + l.ts + '] [' + { i: 'INFO', w: 'WARN', e: 'ERROR' }[l.lvl] + '] ' + esc(l.msg) + '</div>').join(''); el.scrollTop = el.scrollHeight; }
const shapeDef = (k) => SHAPES.find((s) => s.k === (k || A.shape));

function shapeEqs(k) {
  const P = A.vals;
  switch (k) {
    case 'torus': return { fx: '(R + r*cos(v))*cos(u)', fy: '(R + r*cos(v))*sin(u)', fz: 'r*sin(v)', umin: 0, umax: TAU, vmin: 0, vmax: TAU };
    case 'sphere': return { fx: 'R*sin(v)*cos(u)', fy: 'R*sin(v)*sin(u)', fz: 'R*cos(v)', umin: 0, umax: TAU, vmin: 0, vmax: Math.PI };
    case 'klein': return { fx: '(R + r*cos(u/2)*sin(v) - r*sin(u/2)*sin(2*v))*cos(u)', fy: '(R + r*cos(u/2)*sin(v) - r*sin(u/2)*sin(2*v))*sin(u)', fz: 'r*sin(u/2)*sin(v) + r*cos(u/2)*sin(2*v)', umin: 0, umax: TAU, vmin: 0, vmax: TAU };
    case 'mobius': return { fx: '(R + v*cos(u/2))*cos(u)', fy: '(R + v*cos(u/2))*sin(u)', fz: 'v*sin(u/2)', umin: 0, umax: TAU, vmin: -P.w / 2, vmax: P.w / 2 };
    case 'cylinder': return { fx: 'R*cos(u)', fy: 'R*sin(u)', fz: 'v', umin: 0, umax: TAU, vmin: -P.h / 2, vmax: P.h / 2 };
    default: return Object.assign({}, A.custom);
  }
}
function applyToLayer() {
  const L = A.L, e = shapeEqs(A.shape), P = A.vals;
  Object.assign(L, { fx: e.fx, fy: e.fy, fz: e.fz, umin: e.umin, umax: e.umax, vmin: e.vmin, vmax: e.vmax, nu: A.nu, nv: A.nv, kind: A.shape === 'custom' ? 'custom' : A.shape });
  L.P = { R: P.R != null ? P.R : 1, r: P.r != null ? P.r : 0.6, a: P.a != null ? P.a : 0, b: P.b != null ? P.b : 0, c: 0 };
  if (A.shape === 'mobius' || A.shape === 'cylinder') L.P.r = 0.6;
}
function fitCamera() {
  const rep = MC.solidReport(A.L, 0); if (!rep.mesh || !rep.mesh.ok) return; const s = rep.mesh.stats, bb = s.bbox;
  A.L.cam = Object.assign(A.L.cam, { dist: Math.max(1, (s.diag || 4) * 1.7), tx: (bb.lo[0] + bb.hi[0]) / 2, ty: (bb.lo[1] + bb.hi[1]) / 2, tz: (bb.lo[2] + bb.hi[2]) / 2 });
  A.cam0 = JSON.parse(JSON.stringify(A.L.cam));
}
function selectShape(k, keep) {
  A.shape = k; const d = shapeDef(); A.vals = {}; d.sl.forEach((s) => { A.vals[s[0]] = s[5]; }); A.nu = d.seg[2]; A.nv = d.seg[3];
  if (!A.L) { A.L = MC.newSolid({ kind: 'torus' }); Object.assign(A.L, { style: 'both', color: '#3b82f6', wire: '#bcd2ff', axes: false, grid: false, shadow: false, mat: 'plastic', colorBy: 'solid', bands: 0, spin: 0, showEq: false }); A.L.cam = { yaw: 35, pitch: 25, dist: 9, fov: 45, tx: 0, ty: 0, tz: 0, ortho: false }; }
  A.L.tr = { tx: 0, ty: 0, tz: 0, rx: 0, ry: 0, rz: 0, sx: 1, sy: 1, sz: 1 };
  applyToLayer(); if (!keep) fitCamera(); buildLeft(); refresh(true); log('i', 'Shape set to ' + d.name + '. Equations: ' + (A.shape === 'custom' ? 'custom (edit them in the Live Math Editor)' : 'exact parametric form'));
}

/* ------------------------------------------------------------------ left column */
const sv = (v, step) => (Math.abs(v) < 0.1 && v !== 0 && step < 1 ? (+v).toPrecision(3) : (+v).toFixed(step < 1 ? (step < 0.1 ? 2 : 1) : 0));
function slider(id, label, min, max, step, v, unit) { return '<div class="sl"><label for="' + id + '" style="margin:0">' + label + '</label><output id="o_' + id + '">' + sv(v, step) + (unit || '') + '</output></div><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + v + '">'; }
function buildLeft() {
  const d = shapeDef();
  $('#m3Shapes').innerHTML = SHAPES.map((s) => '<label><input type="radio" name="m3shape" value="' + s.k + '"' + (s.k === A.shape ? ' checked' : '') + '> ' + esc(s.name) + '</label>').join('');
  $('#m3PName').textContent = (d.k === 'custom' ? 'Custom' : d.name.replace(/ \(.*/, '')) + ' Parameters';
  $('#m3Params').innerHTML = d.sl.map((s) => { const v = A.vals[s[0]], tiny = v > 0 && v < s[2]; return slider('m3p_' + s[0], s[1], tiny ? v * 0.1 : s[2], Math.max(s[3], v * 1.2), tiny ? v / 200 : s[4], v); }).join('') + slider('m3nu', d.seg[0], 6, 160, 1, A.nu) + slider('m3nv', d.seg[1], 3, 96, 1, A.nv);
  $('#m3Anim').innerHTML = ['X', 'Y', 'Z'].map((a, i) => slider('m3s' + i, 'Rotation Speed ' + a, -3, 3, 0.05, A.sp[i], ' rad/s')).join('') + '<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="m3Auto" style="width:auto"' + (A.playing ? ' checked' : '') + '> Auto Rotate</label>';
  $$('input[name=m3shape]', root).forEach((r) => { r.onchange = () => selectShape(r.value); });
  d.sl.forEach((s) => { const e = $('#m3p_' + s[0]); e.oninput = () => { A.vals[s[0]] = +e.value; $('#o_m3p_' + s[0]).textContent = sv(+e.value, +e.step); applyToLayer(); refresh(true); }; e.onchange = () => { fitCamera(); refresh(true); A.logNow = true; }; });
  [['m3nu', 'nu'], ['m3nv', 'nv']].forEach(([id, key]) => { const e = $('#' + id); e.oninput = () => { A[key] = +e.value; $('#o_' + id).textContent = e.value; applyToLayer(); refresh(true); }; e.onchange = () => { A.logNow = true; refresh(true); }; });
  [0, 1, 2].forEach((i) => { const e = $('#m3s' + i); e.oninput = () => { A.sp[i] = +e.value; $('#o_m3s' + i).textContent = (+e.value).toFixed(2) + ' rad/s'; refresh(true); }; });
  $('#m3Auto').onchange = (e) => { A.playing = e.target.checked; syncPlay(); };
}

/* ------------------------------------------------------------------ mesh facts */
function meshFacts() {
  const rep = MC.solidReport(A.L, 0), m = rep.mesh; if (!m || !m.ok) return { rep, ok: false };
  const V = m.V, F = m.F, s = m.stats; let vol = 0, cx = 0, cy = 0, cz = 0, ar = 0, sx = 0, sy = 0, sz = 0;
  for (let i = 0; i < F.length; i += 3) {
    const a = F[i] * 3, b = F[i + 1] * 3, c = F[i + 2] * 3, ax = V[a], ay = V[a + 1], az = V[a + 2], bx = V[b], by = V[b + 1], bz = V[b + 2], qx = V[c], qy = V[c + 1], qz = V[c + 2];
    const dv = (ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx)) / 6; vol += dv; cx += dv * (ax + bx + qx) / 4; cy += dv * (ay + by + qy) / 4; cz += dv * (az + bz + qz) / 4;
    const ux = bx - ax, uy = by - ay, uz = bz - az, wx = qx - ax, wy = qy - ay, wz = qz - az, ca = Math.hypot(uy * wz - uz * wy, uz * wx - ux * wz, ux * wy - uy * wx) / 2; ar += ca; sx += ca * (ax + bx + qx) / 3; sy += ca * (ay + by + qy) / 3; sz += ca * (az + bz + qz) / 3;
  }
  const closed = !!s.closed, com = closed && Math.abs(vol) > 1e-9 ? [cx / vol, cy / vol, cz / vol] : [sx / ar, sy / ar, sz / ar];
  const nV = V.length / 3, nF = F.length / 3, bytes = V.byteLength + F.byteLength;
  const ex = A.shape === 'custom' ? { applies: false } : M3.exactFor(A.L);
  const chi = s.chi, genus = closed && isFinite(chi) ? (2 - chi) / 2 : null;
  return { rep, ok: true, m, s, nV, nF, bytes, closed, com, comKind: closed ? 'centre of volume' : 'centre of surface area', area: s.area, volume: closed ? Math.abs(s.volume != null ? s.volume : vol) : null, ex, chi, genus, bb: s.bbox };
}
const nf = (v, d) => (typeof v === 'number' && isFinite(v) ? v.toLocaleString('en-US', { maximumFractionDigits: d == null ? 0 : d }) : '–');

/* ------------------------------------------------------------------ right column */
function paramLine() { const P = A.vals, d = shapeDef(); return d.sl.map((s) => '<i>' + s[0] + '</i> = ' + n2(P[s[0]], 2)).join(', '); }
function renderModel(f) {
  const e = shapeEqs(A.shape), P = A.vals, nice = (s) => esc(s).replace(/\*/g, '·').replace(/\bpi\b/g, 'π');
  const ang = [A.sp[0], A.sp[1], A.sp[2]].map((w) => w * A.T), c = Math.cos(ang[0]), s = Math.sin(ang[0]), sc = 1;
  const rng = (a, b) => (Math.abs(b - TAU) < 1e-9 ? '2π' : Math.abs(b - Math.PI) < 1e-9 ? 'π' : n2(b, 2)) , lo = (a) => (Math.abs(a) < 1e-9 ? '0' : n2(a, 2));
  $('#m3Model').innerHTML = '<h4 style="margin-top:0">' + esc(shapeDef().name.replace(/ \(.*/, '')) + ' parametric equation</h4><div class="eq">x(u,v) = ' + nice(e.fx) + '<br>y(u,v) = ' + nice(e.fy) + '<br>z(u,v) = ' + nice(e.fz) + '</div>'
    + '<div class="mu">u ∈ [' + lo(e.umin) + ', ' + rng(e.umin, e.umax) + '], v ∈ [' + lo(e.vmin) + ', ' + rng(e.vmin, e.vmax) + '] &nbsp; ' + paramLine() + '</div>'
    + '<h4>Rotation Matrix R<sub>x</sub>(a) <span class="mu">for animation</span></h4><div class="eq"><span class="mx">1    0     0\n0   cos a  −sin a\n0   sin a   cos a</span><br>= <span class="mx">' + [['1.00', '0.00', '0.00'], ['0.00', n2(c), n2(-s)], ['0.00', n2(s), n2(c)]].map((r) => r.map((v) => v.padStart(5)).join('  ')).join('\n') + '</span></div><div class="mu">a = ' + n2(ang[0] % TAU, 3) + ' rad  (ω<sub>x</sub> × t, t = ' + n2(A.T, 2) + ' s)</div>'
    + '<h4>Scaling Matrix S(s)</h4><div class="eq"><span class="mx">s  0  0\n0  s  0\n0  0  s</span><br>= <span class="mx">' + ['1.00  0.00  0.00', '0.00  1.00  0.00', '0.00  0.00  1.00'].join('\n') + '</span></div><div class="mu">s = ' + n2(sc, 2) + ' (uniform scale; model matrix M = R<sub>z</sub>R<sub>y</sub>R<sub>x</sub>S)</div>';
}
function renderCalc(f) {
  if (!f.ok) { $('#m3Calc').innerHTML = '<div class="bad">Calculation failed. See the log below.</div>'; return; }
  $('#m3Calc').innerHTML = '<table><tr><td>Vertices</td><td>' + nf(f.nV) + '</td></tr><tr><td>Faces (triangles)</td><td>' + nf(f.nF) + '</td></tr><tr><td>Mesh memory <span class="tg a">Estimated</span></td><td>' + (f.bytes / 1048576).toFixed(2) + ' MB</td></tr><tr><td>Last build</td><td>' + n2(A.buildMs, 0) + ' ms</td></tr></table><div class="ok" style="margin-top:6px">✔ Calculation complete</div>';
}
function dimSvg(bb) {
  const w = bb.size[0], d = bb.size[1], h = bb.size[2], m = Math.max(w, d, h) || 1, k = 70 / m, X = w * k, Y = d * k, Z = h * k, ox = 14, oy = 24 + Z, c = 0.5;
  const p = (x, y, z) => [ox + x + y * c, oy - z - y * c * 0.6];
  const P = [p(0, 0, 0), p(X, 0, 0), p(X, Y, 0), p(0, Y, 0), p(0, 0, Z), p(X, 0, Z), p(X, Y, Z), p(0, Y, Z)];
  const ed = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return '<svg viewBox="0 0 150 130" width="100%" height="110" aria-label="Bounding box" style="max-width:190px"><g stroke="#4b6fc4" fill="none" stroke-width="1.2">' + ed.map((e) => '<line x1="' + P[e[0]][0].toFixed(1) + '" y1="' + P[e[0]][1].toFixed(1) + '" x2="' + P[e[1]][0].toFixed(1) + '" y2="' + P[e[1]][1].toFixed(1) + '"/>').join('') + '</g><g fill="#8ec5ff" font-size="9" font-family="monospace"><text x="' + (P[0][0] + X / 2 - 8).toFixed(0) + '" y="' + (P[0][1] + 11).toFixed(0) + '">' + n2(w, 2) + '</text><text x="' + (P[1][0] + 6).toFixed(0) + '" y="' + (P[1][1] - 2 - Y * 0.15).toFixed(0) + '">' + n2(d, 2) + '</text><text x="2" y="' + (P[0][1] - Z / 2).toFixed(0) + '">' + n2(h, 2) + '</text></g></svg>';
}
function renderMeas(f) {
  const el = $('#m3Meas'); if (!f.ok) { el.innerHTML = '<div class="bad">No mesh to measure.</div>'; return; }
  let h = '';
  if (A.mt === 's') {
    const ea = f.ex && f.ex.applies ? Math.abs(f.area - f.ex.area) / f.ex.area * 100 : null, ev = f.ex && f.ex.applies && f.volume != null ? Math.abs(f.volume - f.ex.volume) / f.ex.volume * 100 : null;
    h = '<table><tr><td>Surface Area <span class="tg m">Measured</span></td><td>≈ ' + n2(f.area, 3) + '</td></tr>'
      + '<tr><td>Volume ' + (f.volume != null ? '<span class="tg m">Measured</span>' : '') + '</td><td>' + (f.volume != null ? '≈ ' + n2(f.volume, 3) : 'not closed') + '</td></tr>'
      + '<tr><td>Center of Mass <span class="tg c">Calculated</span></td><td>(' + f.com.map((v) => n2(Math.abs(v) < 5e-4 ? 0 : v, 2)).join(', ') + ')</td></tr></table>'
      + '<div class="mu" style="margin-top:4px">' + f.comKind + (f.closed ? '' : ' (open surface, so it has no enclosed volume)') + '</div>'
      + (f.ex && f.ex.applies ? '<div style="margin-top:6px"><b>Exact:</b> ' + f.ex.eqA + ' = ' + n2(f.ex.area, 3) + ', ' + f.ex.eqV + ' = ' + n2(f.ex.volume, 3) + '<br><span class="mu">mesh error: area ' + n2(ea, 3) + '%, volume ' + n2(ev, 3) + '% (a polygon mesh sits slightly inside a curve; more segments shrink it)</span></div>' : '<div class="mu" style="margin-top:6px">No closed-form formula is known for this equation, so the numbers are mesh estimates.</div>');
  } else if (A.mt === 'd') {
    const b = f.bb; h = '<div class="two"><table><tr><td>Bounding box</td><td>' + b.size.map((v) => n2(v, 2)).join(' × ') + '</td></tr><tr><td>Diagonal</td><td>' + n2(f.s.diag || Math.hypot(...b.size), 3) + '</td></tr><tr><td>x range</td><td>' + n2(b.lo[0], 2) + ' … ' + n2(b.hi[0], 2) + '</td></tr><tr><td>y range</td><td>' + n2(b.lo[1], 2) + ' … ' + n2(b.hi[1], 2) + '</td></tr><tr><td>z range</td><td>' + n2(b.lo[2], 2) + ' … ' + n2(b.hi[2], 2) + '</td></tr></table><div>' + dimSvg(b) + '</div></div>';
  } else {
    h = '<table><tr><td>Closed surface</td><td>' + (f.closed ? 'yes' : 'no') + '</td></tr><tr><td>Euler characteristic χ</td><td>' + (isFinite(f.chi) ? f.chi : '–') + '</td></tr><tr><td>Genus</td><td>' + (f.genus != null ? f.genus : 'n/a') + '</td></tr><tr><td>Vertices − edges + faces</td><td>' + nf(f.s.vertices) + ' − ' + nf(f.s.edges) + ' + ' + nf(f.s.faces) + '</td></tr><tr><td>Orientable</td><td>' + (A.shape === 'mobius' || A.shape === 'klein' ? 'no (one-sided)' : 'yes') + '</td></tr></table>' + (A.shape === 'klein' ? '<div class="wr" style="margin-top:6px">A Klein bottle cannot exist in 3D without passing through itself, so its mesh self-intersects; area is meaningful, volume is not.</div>' : '');
  }
  el.innerHTML = h;
}

/* ------------------------------------------------------------------ editor */
function codeText() {
  const e = shapeEqs(A.shape), P = A.vals, names = shapeDef().sl.map((s) => s[0]);
  return 'x = ' + e.fx + '\ny = ' + e.fy + '\nz = ' + e.fz + '\nu = ' + n2(e.umin, 4) + ' .. ' + n2(e.umax, 4) + '\nv = ' + n2(e.vmin, 4) + ' .. ' + n2(e.vmax, 4);
}
function renderEdit() {
  const P = A.vals, names = ['R', 'r', 'a', 'b'];
  $('#m3Edit').innerHTML = '<div class="mu" style="margin-bottom:4px">function surface(u, v, R, r, a, b) → [x, y, z]</div><textarea id="m3Code" spellcheck="false" aria-label="Surface equations">' + esc(codeText()) + '</textarea>'
    + '<h4>Edit Values</h4><div class="two" style="grid-template-columns:repeat(4,1fr)"><div><label for="m3eR">R</label><input type="number" step="0.1" id="m3eR" value="' + (A.L.P.R) + '"></div><div><label for="m3er">r</label><input type="number" step="0.1" id="m3er" value="' + (A.L.P.r) + '"></div><div><label for="m3eu">u</label><input type="number" step="0.1" id="m3eu" value="1"></div><div><label for="m3ev">v</label><input type="number" step="0.1" id="m3ev" value="1"></div></div>'
    + '<div id="m3Pt" class="mu" style="margin-top:6px;font-family:ui-monospace,monospace"></div><div style="display:flex;gap:8px;align-items:center;margin-top:8px"><button type="button" class="go" id="m3Apply">Apply Changes</button><span id="m3Valid" aria-live="polite"></span></div>';
  const chk = () => { const r = parseCode($('#m3Code').value); $('#m3Valid').innerHTML = r.ok ? '<span class="ok">✔ Code is valid</span>' : '<span class="bad">✖ ' + esc(r.err) + '</span>'; return r; };
  $('#m3Code').oninput = chk; chk();
  const pt = () => { try { const u = +$('#m3eu').value, v = +$('#m3ev').value, R = +$('#m3eR').value, r = +$('#m3er').value, e = shapeEqs(A.shape), sc = { u, v, t: 0, R, r, a: A.L.P.a, b: A.L.P.b, c: 0 }, ev = (s) => evalExpr(s, sc); $('#m3Pt').textContent = 'S(u, v) = (' + [e.fx, e.fy, e.fz].map((s) => n2(ev(s), 4)).join(', ') + ')'; } catch (er) { $('#m3Pt').textContent = ''; } };
  ['m3eu', 'm3ev', 'm3eR', 'm3er'].forEach((id) => { $('#' + id).oninput = pt; }); pt();
  $('#m3Apply').onclick = () => {
    const r = chk(); const R = +$('#m3eR').value, rr = +$('#m3er').value;
    if (!r.ok) { log('e', 'Apply failed: ' + r.err); return; }
    if (isFinite(R)) { if (A.vals.R != null) A.vals.R = R; } if (isFinite(rr)) { if (A.vals.r != null) A.vals.r = rr; }
    const was = A.shape; if (r.changed || A.shape === 'custom') { A.custom = r.eq; if (A.shape !== 'custom') { A.shape = 'custom'; const d = shapeDef(); A.vals = { a: 1, b: 0.5 }; A.nu = A.nu || 64; } }
    if (A.shape === 'custom') { A.L.P.R = isFinite(R) ? R : 1; A.L.P.r = isFinite(rr) ? rr : 0.6; }
    applyToLayer(); if (A.shape === 'custom') { A.L.P.R = isFinite(R) ? R : A.L.P.R; A.L.P.r = isFinite(rr) ? rr : A.L.P.r; }
    fitCamera(); buildLeft(); refresh(true); log('i', 'Applied changes' + (was !== A.shape ? ' (switched to Custom Equation)' : '') + '.');
  };
}
function parseCode(txt) {
  const eq = Object.assign({}, shapeEqs(A.shape)), want = ['x', 'y', 'z']; let changed = false;
  const lines = txt.split(/\n/).map((s) => s.trim()).filter(Boolean);
  for (const ln of lines) {
    const m = /^([xyz])\s*=\s*(.+)$/i.exec(ln);
    if (m) { try { const c = MX.compile(m[2], M3.VARS); if (!c) throw new Error('empty'); } catch (e) { return { ok: false, err: 'Cannot read ' + m[1] + ' = … (' + String(e.message || e).slice(0, 70) + ')' }; } const key = 'f' + m[1].toLowerCase(); if (eq[key] !== m[2]) changed = true; eq[key] = m[2]; continue; }
    const r = /^([uv])\s*=\s*(.+?)\s*\.\.\s*(.+)$/i.exec(ln);
    if (r) { let lo, hi; try { lo = evalExpr(r[2], { }); hi = evalExpr(r[3], { }); } catch (e) { return { ok: false, err: 'Cannot read the range for ' + r[1] }; } if (!isFinite(lo) || !isFinite(hi) || lo >= hi) return { ok: false, err: r[1] + ' range must have a smaller start than end' }; const k1 = r[1].toLowerCase() + 'min', k2 = r[1].toLowerCase() + 'max'; if (Math.abs(eq[k1] - lo) > 1e-9 || Math.abs(eq[k2] - hi) > 1e-9) changed = true; eq[k1] = lo; eq[k2] = hi; continue; }
    return { ok: false, err: 'Line not understood: "' + ln.slice(0, 40) + '". Use x = …, y = …, z = …, u = a .. b, v = a .. b.' };
  }
  if (!want.every((k) => eq['f' + k])) return { ok: false, err: 'x, y and z are all needed' };
  return { ok: true, eq, changed };
}

/* ------------------------------------------------------------------ issues/log from real checks */
const torusFix = (i) => (A.shape === 'torus' && /R > r/.test(i.msg) ? () => { A.vals.r = +(A.vals.R * 0.4).toFixed(2); applyToLayer(); buildLeft(); refresh(true); } : null);
function checkIssues(f) {
  const out = [];
  if (!f.ok) { f.rep.issues.filter((i) => i.sev === 'error').forEach((i) => out.push({ sev: 'error', msg: i.msg, fix: i.fix, act: torusFix(i) })); if (!out.length) out.push({ sev: 'error', msg: 'The surface could not be built.', fix: 'Check the equations.' }); return out; }
  if (A.shape === 'klein') out.push({ sev: 'warn', msg: 'A Klein bottle in 3D self-intersects; its volume is not defined.', fix: '' });
  f.rep.issues.filter((i) => i.sev !== 'info' && i.code !== 'slow').forEach((i) => out.push({ sev: i.sev === 'error' ? 'error' : 'warn', msg: i.msg, fix: i.fix, act: torusFix(i) }));
  return out;
}
function renderIssues(list) {
  const el = $('#m3Err'); el.innerHTML = list.filter((i) => i.sev !== 'info').map((i, k) => '<div class="errbox"><b class="' + (i.sev === 'error' ? 'bad' : 'wr') + '">' + (i.sev === 'error' ? 'Real Error' : 'Warning') + ':</b> ' + esc(i.msg) + (i.fix ? '<div class="mu">' + esc(i.fix) + '</div>' : '') + (i.act ? '<button type="button" data-fix="' + k + '" style="margin-top:4px">Fix</button>' : '') + '</div>').join('');
  $$('[data-fix]', el).forEach((b) => { b.onclick = () => { list[+b.dataset.fix].act(); log('i', 'Fix applied.'); }; });
  const sig = list.map((i) => i.sev + i.msg).join('|'); if (sig !== A.issueSig) { A.issueSig = sig; list.forEach((i) => log(i.sev === 'error' ? 'e' : 'w', i.msg)); }
}

/* ------------------------------------------------------------------ viewer */
const cv = $('#m3Cv'), ctx = cv.getContext('2d'), pv = $('#m3Pv'), pctx = pv.getContext('2d');
function sizeCanvas() { const r = cv.parentElement.getBoundingClientRect(), k = Math.min(2, window.devicePixelRatio || 1), w = Math.max(200, Math.round(r.width * k)), h = Math.max(200, Math.round(r.height * k)); if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; } }
function applyRotation(T) { const d = 180 / Math.PI; A.L.tr.rx = (A.sp[0] * T * d) % 360; A.L.tr.ry = (A.sp[1] * T * d) % 360; A.L.tr.rz = (A.sp[2] * T * d) % 360; }
function floorGrid(c, L, W, H, ext) {
  const cm = M3.cameraMatrices(L.cam, W / H), z = -ext * 1.05, n = 8, step = ext * 2 / n; c.lineWidth = Math.max(1, W / 900);
  const pr = (x, y, zz) => { const a = M3.apply(cm.vp, x, y, zz); return a[3] > 1e-6 ? [(a[0] / a[3] * 0.5 + 0.5) * W, (1 - (a[1] / a[3] * 0.5 + 0.5)) * H] : null; };
  for (let i = -n / 2; i <= n / 2; i++) { c.strokeStyle = i === 0 ? 'rgba(96,130,210,.5)' : 'rgba(96,130,210,.22)'; [[[i * step, -ext, z], [i * step, ext, z]], [[-ext, i * step, z], [ext, i * step, z]]].forEach(([p, q]) => { const a = pr(...p), b = pr(...q); if (a && b) { c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); } }); }
}
function gizmo(c, W, H, cam) {
  const d = Math.PI / 180, th = cam.yaw * d, ph = cam.pitch * d, R = [-Math.sin(th), Math.cos(th), 0], U = [-Math.sin(ph) * Math.cos(th), -Math.sin(ph) * Math.sin(th), Math.cos(ph)], k = Math.min(W, H) * 0.07, ox = k * 1.9, oy = H - k * 1.9;
  [['X', [1, 0, 0], '#f87171'], ['Y', [0, 1, 0], '#4ade80'], ['Z', [0, 0, 1], '#60a5fa']].forEach(([n, v, col]) => { const x = ox + (v[0] * R[0] + v[1] * R[1] + v[2] * R[2]) * k, y = oy - (v[0] * U[0] + v[1] * U[1] + v[2] * U[2]) * k; c.strokeStyle = col; c.lineWidth = Math.max(2, W / 450); c.beginPath(); c.moveTo(ox, oy); c.lineTo(x, y); c.stroke(); c.fillStyle = col; c.font = '600 ' + Math.round(k * 0.5) + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n, x + (x - ox) * 0.22, y + (y - oy) * 0.22); });
}
function drawScene(c, W, H, draft) {
  const L = A.L; L.w = W; L.h = H;
  const g = c.createRadialGradient(W / 2, H * 0.4, 10, W / 2, H / 2, Math.max(W, H) * 0.75); g.addColorStop(0, '#12203f'); g.addColorStop(1, '#070b14'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  const rep0 = MC.solidReport(L, 0), ok = rep0.mesh && rep0.mesh.ok, ext = ok ? Math.max(1, (rep0.mesh.stats.diag || 4) * 0.5) : 3;
  floorGrid(c, L, W, H, ext);
  if (A.mode === 'points') {
    if (ok) { const M = M3.modelMatrix(L.tr), pr = M3.projectAll(rep0.mesh, M, L.cam, W, H), n = pr.s.length / 4, r = Math.max(1.4, W / 520); let zmin = Infinity, zmax = -Infinity; for (let k = 0; k < n; k++) if (pr.s[k * 4 + 3] === 1) { zmin = Math.min(zmin, pr.s[k * 4 + 2]); zmax = Math.max(zmax, pr.s[k * 4 + 2]); } const step = draft && n > 6000 ? 3 : 1; for (let k = 0; k < n; k += step) { if (pr.s[k * 4 + 3] !== 1) continue; const t = (pr.s[k * 4 + 2] - zmin) / (zmax - zmin || 1); c.fillStyle = 'rgba(' + Math.round(150 - 90 * t) + ',' + Math.round(210 - 80 * t) + ',255,' + (0.95 - 0.55 * t).toFixed(2) + ')'; c.fillRect(pr.s[k * 4] - r, pr.s[k * 4 + 1] - r, 2 * r, 2 * r); } }
  } else { L.style = A.mode; c.save(); c.translate(W / 2, H / 2); try { MC.drawSolid(c, L, 0, { draft }); } catch (e) { /* shown in log */ } c.restore(); }
  gizmo(c, W, H, L.cam);
}
let dirty = true, lastDraw = 0, raf = 0, lastT = 0;
function refresh(full) { dirty = true; A.full = A.full || !!full; }
function frame(ts) {
  raf = requestAnimationFrame(frame); if (root.hidden) return;
  const dt = lastT ? Math.min(0.1, (ts - lastT) / 1000) : 0; lastT = ts;
  if (A.playing && !A.vid) { A.T += dt * A.speed; if (A.T >= 10) A.T -= 10; syncFrame(); dirty = true; }
  if (!dirty) return; dirty = false;
  sizeCanvas(); applyRotation(A.T);
  const t0 = performance.now(); drawScene(ctx, cv.width, cv.height, !!A.drag);
  if (A.full) { A.full = false; const b0 = performance.now(); const f = meshFacts(); A.buildMs = performance.now() - b0; A.facts = f; renderModel(f); renderCalc(f); renderMeas(f); renderIssues(checkIssues(f)); if (f.ok && (A.logNow || !A.lastMeshLog || performance.now() - A.lastMeshLog > 3000)) { A.logNow = false; A.lastMeshLog = performance.now(); log('i', 'Mesh built: ' + nf(f.nV) + ' vertices, ' + nf(f.nF) + ' faces, area ≈ ' + n2(f.area, 3) + (f.volume != null ? ', volume ≈ ' + n2(f.volume, 3) : '')); } }
  else if (A.playing && ts - (A.mdl || 0) > 250) { A.mdl = ts; renderModel(A.facts || {}); }
  pctx.drawImage(cv, 0, 0, pv.width, pv.height);
  A.frames++; if (ts - A.fpsT > 700) { A.fps = A.frames * 1000 / (ts - A.fpsT); A.frames = 0; A.fpsT = ts; $('#m3Fps').textContent = 'FPS ' + Math.min(60, Math.round(A.fps)); }
}
function syncFrame() { const fr = Math.round(A.T * 60); $('#m3Fr').value = fr; $('#m3FrO').textContent = fr + ' / 600'; const s = Math.floor(A.T); $('#m3Tm').textContent = '0:' + String(s).padStart(2, '0') + ' / 0:10'; }
function syncPlay() { $('#m3Play').textContent = A.playing ? '⏸' : '▶'; const c = $('#m3Auto'); if (c) c.checked = A.playing; }
$('#m3Play').onclick = () => { A.playing = !A.playing; syncPlay(); };
$('#m3Fr').oninput = (e) => { A.T = +e.target.value / 60; A.playing = false; syncPlay(); syncFrame(); refresh(); renderModel(A.facts || {}); };
$('#m3Sp').oninput = (e) => { A.speed = +e.target.value; $('#m3SpO').textContent = A.speed.toFixed(1) + 'x'; };

/* interaction */
$('#m3Mode').onclick = (e) => { const b = e.target.closest('[data-mode]'); if (!b) return; A.mode = b.dataset.mode; $$('#m3Mode button').forEach((x) => x.classList.toggle('on', x === b)); refresh(); };
$('#m3Tools').onclick = (e) => {
  const b = e.target.closest('[data-t]'); if (!b) return; const t = b.dataset.t;
  if (t === 'reset') { A.L.cam = JSON.parse(JSON.stringify(A.cam0)); A.T = 0; syncFrame(); refresh(); return; }
  if (t === 'shot') { cv.toBlob((bl) => { if (bl) MCU.saveFile(bl, 'math3d-' + A.shape + '.png'); }, 'image/png'); log('i', 'Screenshot saved.'); return; }
  A.tool = t; $$('#m3Tools button').forEach((x) => x.classList.toggle('on', x.dataset.t === t));
};
const pt = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; };
cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); A.drag = { x: e.clientX, y: e.clientY, tool: e.shiftKey ? 'pan' : A.tool }; cv.style.cursor = 'grabbing'; });
cv.addEventListener('pointermove', (e) => {
  const c = A.L.cam;
  if (A.drag) { const dx = e.clientX - A.drag.x, dy = e.clientY - A.drag.y; A.drag.x = e.clientX; A.drag.y = e.clientY;
    if (A.drag.tool === 'rot') { c.yaw -= dx * 0.4; c.pitch = Math.max(-89, Math.min(89, c.pitch + dy * 0.4)); }
    else if (A.drag.tool === 'zoom') c.dist = Math.max(0.5, c.dist * Math.exp(dy * 0.01));
    else { const d = Math.PI / 180, th = c.yaw * d, ph = c.pitch * d, k = c.dist * 0.0022, R = [-Math.sin(th), Math.cos(th), 0], U = [-Math.sin(ph) * Math.cos(th), -Math.sin(ph) * Math.sin(th), Math.cos(ph)]; c.tx += (-dx * R[0] + dy * U[0]) * k * 1.6; c.ty += (-dx * R[1] + dy * U[1]) * k * 1.6; c.tz += (dy * U[2]) * k * 1.6; }
    refresh(); return; }
  try { const p = pt(e), k = MC.solidPickAt(A.L, 0, p[0], p[1]); if (k >= 0) { const v = MC.solidVertex(A.L, 0, k).world; $('#m3Xyz').textContent = 'x: ' + n2(v[0], 2) + ' y: ' + n2(v[1], 2) + ' z: ' + n2(v[2], 2); } } catch (er) { /* none */ }
});
const endDrag = () => { if (A.drag) { A.drag = null; cv.style.cursor = 'grab'; refresh(); } };
cv.addEventListener('pointerup', endDrag); cv.addEventListener('pointercancel', endDrag);
cv.addEventListener('wheel', (e) => { e.preventDefault(); const c = A.L.cam; c.dist = Math.max(0.5, c.dist * Math.exp(e.deltaY * 0.0012)); refresh(); }, { passive: false });
cv.addEventListener('keydown', (e) => { const c = A.L.cam; const k = { ArrowLeft: () => (c.yaw += 5), ArrowRight: () => (c.yaw -= 5), ArrowUp: () => (c.pitch = Math.min(89, c.pitch + 5)), ArrowDown: () => (c.pitch = Math.max(-89, c.pitch - 5)), '+': () => (c.dist *= 0.9), '-': () => (c.dist *= 1.1) }[e.key]; if (k) { e.preventDefault(); k(); refresh(); } });
if (window.ResizeObserver) new ResizeObserver(() => refresh()).observe(cv.parentElement);

/* tabs */
$('#m3MTabs').onclick = (e) => { const b = e.target.closest('[data-mt]'); if (!b) return; A.mt = b.dataset.mt; $$('#m3MTabs button').forEach((x) => x.setAttribute('aria-selected', String(x === b))); if (A.facts) renderMeas(A.facts); };
function setView(v) { A.view = v; $$('#m3Ws button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.ws === (v === 'const' ? 'const' : '3d')))); const cr = $('#m3ConstRow'); if (cr) cr.hidden = v !== 'const'; $$('nav.pills button', root).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === v))); $$('[data-v]', root).forEach((s) => { s.hidden = !s.dataset.v.split(' ').includes(v); }); const vis = (id) => $$('section.pn', $(id)).some((x) => !x.hidden); const l = vis('#colL'), r = vis('#colR'); $('#colL').hidden = !l; $('#colR').hidden = !r; root.dataset.cols = l && r ? 'lr' : l ? 'l' : r ? 'r' : 'none'; refresh(); }
root.querySelector('nav.pills').onclick = (e) => { const b = e.target.closest('[data-view]'); if (b) setView(b.dataset.view); };

/* ------------------------------------------------------------------ exports */
function buildExports() {
  const fm = [['obj', 'OBJ'], ['stl', 'STL (binary)'], ['glb', 'GLB'], ['svg', 'SVG'], ['json', 'JSON model'], ['report', 'HTML report']];
  $('#m3Exp').innerHTML = fm.map((f) => '<button type="button" data-ex="' + f[0] + '">' + f[1] + '</button>').join('') + '<button type="button" data-ex="png">PNG picture</button>';
  $('#m3Exp').onclick = (e) => {
    const b = e.target.closest('[data-ex]'); if (!b) return; const k = b.dataset.ex;
    if (k === 'png') { cv.toBlob((bl) => bl && MCU.saveFile(bl, 'math3d-' + A.shape + '.png')); return; }
    try { const r = MC.solidExport(A.L, 0, k); if (r.err) { log('e', r.err); toast(r.err); return; } MCU.saveFile(r.blob, r.name || ('math3d-' + A.shape + '.' + (k === 'report' ? 'html' : k))); log('i', 'Exported ' + k.toUpperCase() + '.'); } catch (er) { log('e', 'Export failed: ' + er.message); }
  };
}
async function exportVideo() {
  if (A.vid) { A.vid.cancel = true; return; }
  const H = +$('#m3Res').value, W = Math.round(H * 16 / 9 / 2) * 2, fps = 30, dur = 10, N = fps * dur, st = $('#m3VidSt'), bar = $('#m3VidBar'), want = $('#m3Fmt').value;
  A.vid = { cancel: false }; $('#m3Vid').textContent = 'Cancel export'; bar.style.width = '0'; st.textContent = 'Preparing…';
  const off = document.createElement('canvas'); off.width = W; off.height = H; const oc = off.getContext('2d'), keepW = A.L.w, keepH = A.L.h, saveT = A.T, wasPlaying = A.playing;
  try {
    if (!(window.VideoEncoder && window.VideoFrame)) throw new Error('This browser has no video encoder (WebCodecs). Try Chrome, Edge or Safari 16.4+.');
    const bitrate = Math.round(Math.min(30e6, Math.max(2e6, W * H * fps * 0.1)));
    const tries = (want === 'mp4' ? [['mp4', 'avc', 'avc1.640034'], ['mp4', 'avc', 'avc1.640028'], ['mp4', 'avc', 'avc1.4D0028']] : []).concat([['webm', 'V_VP9', 'vp09.00.10.08'], ['webm', 'V_VP8', 'vp8']]); let pick = null;
    for (const [box, mc, codec] of tries) { try { const s = await VideoEncoder.isConfigSupported({ codec, width: W, height: H, bitrate, framerate: fps }); if (s && s.supported) { pick = { box, mc, codec }; break; } } catch (e) { /* next */ } }
    if (!pick) throw new Error('No supported video codec for ' + W + '×' + H + '.');
    const MUX = pick.box === 'mp4' ? window.Mp4Muxer : window.WebMMuxer; if (!MUX) throw new Error('Video muxer missing.');
    const target = new MUX.ArrayBufferTarget(), muxer = new MUX.Muxer(pick.box === 'mp4' ? { target, video: { codec: 'avc', width: W, height: H, frameRate: fps }, fastStart: 'in-memory', firstTimestampBehavior: 'offset' } : { target, video: { codec: pick.mc, width: W, height: H, frameRate: fps }, firstTimestampBehavior: 'offset' });
    let encErr = null; const enc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => { encErr = e; } }); enc.configure(Object.assign({ codec: pick.codec, width: W, height: H, bitrate, framerate: fps }, pick.box === 'mp4' ? { avc: { format: 'avc' } } : {}));
    const frameCam = JSON.parse(JSON.stringify(A.L.cam));
    for (let f = 0; f < N; f++) {
      if (A.vid.cancel) throw new Error('cancelled'); if (encErr) throw encErr;
      applyRotation(f / fps); drawScene(oc, W, H, false);
      const vf = new VideoFrame(off, { timestamp: Math.round(f * 1e6 / fps), duration: Math.round(1e6 / fps) }); enc.encode(vf, { keyFrame: f % (fps * 2) === 0 }); vf.close();
      while (enc.encodeQueueSize > 6) await new Promise((r) => setTimeout(r, 3));
      if (f % 6 === 0) { bar.style.width = (f / N * 100).toFixed(0) + '%'; st.textContent = 'Rendering frame ' + (f + 1) + ' of ' + N + ' (' + W + '×' + H + ')'; await new Promise((r) => setTimeout(r, 0)); }
    }
    await enc.flush(); muxer.finalize(); const bl = new Blob([target.buffer], { type: pick.box === 'mp4' ? 'video/mp4' : 'video/webm' });
    bar.style.width = '100%'; st.textContent = 'Done: ' + (bl.size / 1048576).toFixed(1) + ' MB ' + pick.box.toUpperCase() + ', ' + W + '×' + H + ', ' + dur + ' s at ' + fps + ' fps' + (pick.box !== want ? ' (MP4 was not available here, so WebM was used)' : '');
    A.lastVideo = { size: bl.size, box: pick.box, W, H, N }; await MCU.saveFile(bl, 'math3d-' + A.shape + '.' + pick.box); log('i', 'Video exported: ' + pick.box + ' ' + W + '×' + H + ', ' + N + ' frames.');
  } catch (e) { if (String(e.message) === 'cancelled') { st.textContent = 'Export cancelled.'; log('w', 'Video export cancelled.'); } else { st.textContent = 'Could not export: ' + e.message; log('e', 'Video export failed: ' + e.message); } bar.style.width = '0'; }
  A.vid = null; A.L.w = keepW; A.L.h = keepH; A.T = saveT; $('#m3Vid').textContent = 'Export Video'; refresh();
}
$('#m3Vid').onclick = exportVideo;


/* ------------------------------------------------------------------ constants & real-world simulations */
const CN = window.CONSTS;
function renderConsts() {
  if (!CN) return; const q = ($('#m3CSearch').value || '').toLowerCase().trim(), cat = $('#m3CCat').value;
  const rows = CN.LIST.filter((c) => (!cat || c.cat === cat) && (!q || new RegExp('(^|[^a-z0-9])' + q.replace(/[^a-z0-9 ]/g, ''), 'i').test(c.id + ' ' + c.name + ' ' + c.sym + ' ' + c.note + ' ' + c.cat)));
  $('#m3CList').innerHTML = rows.length ? '<table class="ct">' + rows.map((c) => '<tr><td style="width:2.4em;font:600 15px Cambria,serif;color:#93c5fd">' + esc(c.sym) + '</td><td><b>' + esc(c.name) + '</b> <code style="color:var(--mu)">' + c.id + '</code><div class="mu" style="font-size:11.5px">' + esc(c.note) + '</div></td><td>' + CN.fmt(c) + (c.unit ? ' ' + esc(c.unit) : '') + '<div class="mu" style="font-size:11px">' + (c.u ? '± ' + c.u.toExponential(1) + ' (measured)' : (c.cat === 'Mathematical' ? 'exact math' : 'exact')) + '</div></td><td><button type="button" data-use="' + c.id + '">Use</button></td></tr>').join('') + '</table>' : '<p class="mu">No constant matches.</p>';
  $$('[data-use]', $('#m3CList')).forEach((b) => { b.onclick = () => { const ta = $('#m3Code'); if (!ta) return; const foc = document.activeElement === ta, i = foc ? ta.selectionStart : ta.value.length; ta.value = ta.value.slice(0, i) + b.dataset.use + ta.value.slice(foc ? ta.selectionEnd : i); ta.focus(); ta.dispatchEvent(new Event('input')); log('i', 'Inserted constant ' + b.dataset.use + ' = ' + CN.fmt(CN.BY[b.dataset.use]) + '.'); }; });
}
function renderChecks() {
  if (!CN) return; const f = (v, u) => (Math.abs(v) >= 1e5 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(9) : String(+v.toPrecision(11))) + (u ? ' ' + u : '');
  $('#m3Checks').innerHTML = '<table class="ct"><tr><td class="mu">Quantity</td><td class="mu">Formula</td><td class="mu">Rebuilt</td><td class="mu">Published</td><td class="mu">Difference</td></tr>' + CN.checks().map((k) => '<tr><td>' + esc(k.name) + '</td><td>' + esc(k.formula) + '</td><td style="text-align:right">' + f(k.calc, k.unit) + '</td><td style="text-align:right">' + f(k.ref, k.unit) + '</td><td style="text-align:right;white-space:nowrap" class="' + (k.ok ? 'ok' : 'bad') + '">' + (k.abs ? '|' + k.calc.toExponential(1) + '|' : (k.ppm >= 0 ? '+' : '') + k.ppm.toFixed(3) + ' ppm') + ' ' + (k.ok ? '✔' : '✖') + '</td></tr>').join('') + '</table><p class="mu" style="margin-top:6px">ppm = parts per million. The Earth-orbit row differs a little more because it uses a round published period and a simple two-body model.</p>';
}
function applyPreset(id) {
  if (id === 'torus') { selectShape('torus'); A.vals.R = +CN.PHI.toFixed(6); A.vals.r = 1; applyToLayer(); buildLeft(); refresh(true); log('i', 'Golden torus: R ÷ r = φ = ' + CN.PHI.toFixed(9) + '.'); return; }
  const sh = { fx: 'phi^(2*u/pi)*cos(u)*(1 + 0.35*cos(v))', fy: 'phi^(2*u/pi)*sin(u)*(1 + 0.35*cos(v))', fz: 'phi^(2*u/pi)*0.35*sin(v)', umin: 0, umax: 4 * Math.PI, vmin: 0, vmax: TAU };
  A.custom = sh; selectShape('custom'); A.nu = 160; A.nv = 28; applyToLayer(); fitCamera(); buildLeft(); refresh(true); log('i', 'Golden nautilus: each quarter turn multiplies the radius by φ = ' + CN.PHI.toFixed(9) + '.');
}
function renderSims() {
  $('#m3Sims').innerHTML = '<button type="button" class="sim" data-sim="torus"><b>Golden torus</b><small>A doughnut whose big radius is φ times its tube radius. Area and volume are compared with the exact formulas.</small></button><button type="button" class="sim" data-sim="shell"><b>Golden nautilus shell</b><small>A tube that follows a logarithmic spiral growing by exactly φ every quarter turn: radius = φ^(2u/π).</small></button><button type="button" class="sim" data-sim="fs"><b>Fine-structure ripple</b><small>An artistic use: a doughnut with round(1/α) = 137 ripples around it, amplitude 20α. It shows the equation can use α; it does not model physics.</small></button>';
  $$('[data-sim]', $('#m3Sims')).forEach((b) => { b.onclick = () => { const k = b.dataset.sim; if (k === 'fs') { A.custom = { fx: 'cos(u)*(2 + cos(v))', fy: 'sin(u)*(2 + cos(v))', fz: 'sin(v) + alpha*20*sin(round(1/alpha)*u)', umin: 0, umax: TAU, vmin: 0, vmax: TAU }; selectShape('custom'); A.nu = 720; A.nv = 48; applyToLayer(); fitCamera(); buildLeft(); refresh(true); log('i', 'Ripple count = round(1/α) = ' + Math.round(1 / CN.BY.alpha.v) + '.'); } else applyPreset(k === 'torus' ? 'torus' : 'shell'); renderEdit(); setTimeout(() => { A.L.cam.dist *= 1; refresh(true); }, 0); }; });
}
function renderBohr() {
  if (!CN) return; $('#m3Bohr').innerHTML = '<table class="ct"><tr><td class="mu">n</td><td class="mu" style="text-align:right">Radius n²a₀</td><td class="mu" style="text-align:right">Speed αc/n</td><td class="mu" style="text-align:right">Energy</td></tr>' + [1, 2, 3, 4, 5, 6].map((n) => { const b = CN.bohr(n); return '<tr><td>' + n + '</td><td style="text-align:right">' + (b.r * 1e9).toPrecision(5) + ' nm</td><td style="text-align:right">' + (b.v / 1000).toFixed(1) + ' km/s <span class="mu">(' + (b.beta * 100).toFixed(3) + '% of c)</span></td><td style="text-align:right">' + b.E.toFixed(4) + ' eV</td></tr>'; }).join('') + '</table><p class="mu" style="margin-top:6px">Built only from a₀ and α (and E₁ = ½mₑc²α²). The speed ratio in the lowest orbit is α itself: electron speed ÷ light speed = 1/137.036. Real atoms follow quantum mechanics; the Bohr model gives these radii and energies correctly for hydrogen but not the orbit pictures.</p>';
}
const sun = $('#m3Sun'), sx = sun.getContext('2d');
function drawSun() {
  const deg = +$('#m3SunA').value, N = +$('#m3SunN').value, W = sun.width, H = sun.height, R = Math.min(W, H) / 2 - 6; sx.fillStyle = '#080d1a'; sx.fillRect(0, 0, W, H); const th = deg * Math.PI / 180;
  for (let n = 1; n <= N; n++) { const r = R * Math.sqrt(n / N), a = n * th; sx.fillStyle = 'hsl(' + (200 + 140 * n / N) + ',85%,' + (45 + 25 * n / N) + '%)'; sx.beginPath(); sx.arc(W / 2 + r * Math.cos(a), H / 2 + r * Math.sin(a), Math.max(1.1, R * 0.018 * Math.sqrt(1 - n / N * 0.6)), 0, 7); sx.fill(); }
  const g = CN ? CN.goldenAngle() * 180 / Math.PI : 137.5077640500; $('#m3SunO').textContent = deg.toFixed(4) + '°'; $('#m3SunNO').textContent = N;
  $('#m3SunT').textContent = Math.abs(deg - g) < 0.002 ? 'This is the golden angle 360°/φ² = ' + g.toFixed(10) + '°: seeds fill the disc evenly with no gaps.' : 'Golden angle is ' + g.toFixed(4) + '°. Other angles line seeds up in spokes and leave gaps. Drag back to find it.';
}
function initConsts() {
  if (!CN) return; const cats = Array.from(new Set(CN.LIST.map((c) => c.cat))); $('#m3CCat').innerHTML = '<option value="">All kinds</option>' + cats.map((c) => '<option>' + esc(c) + '</option>').join('');
  $('#m3CSearch').oninput = renderConsts; $('#m3CCat').onchange = renderConsts; $('#m3SunA').value = (CN.goldenAngle() * 180 / Math.PI).toFixed(4); $('#m3SunA').oninput = $('#m3SunN').oninput = drawSun;
  renderConsts(); renderChecks(); renderSims(); renderBohr(); drawSun();
}

/* ------------------------------------------------------------------ open / close */
function open() {
  root.hidden = false; document.body.style.overflow = 'hidden';
  if (!A.L) { buildExports(); selectShape('torus'); renderEdit(); initConsts(); setView('3d'); syncFrame(); syncPlay(); log('i', 'Math3D 3D Lab ready. Every number here is computed from the equations you see.'); }
  A.L.cam && refresh(true); if (!raf) raf = requestAnimationFrame(frame); setTimeout(() => $('#m3Close').focus(), 0);
}
function close() { root.hidden = true; document.body.style.overflow = ''; if (A.vid) A.vid.cancel = true; const b = $('#m3Btn'); if (b) b.focus(); }
$('#m3Close').onclick = close;
$('#m3Ws').onclick = (e) => { const b = e.target.closest('[data-ws]'); if (b) HUB.go(b.dataset.ws); };
$('#m3Measure').onclick = () => { try { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; c.getContext('2d').drawImage(cv, 0, 0); close(); window.MLAB.open(); window.MLAB.setSource({ kind: 'image', el: c, w: c.width, h: c.height, name: 'math3d-' + A.shape + '-view.png', size: 0, type: 'image/png', meta: {} }); toast('This view is now in the Photo Lab. Distances are in picture pixels; mark a scale to turn them into real units.'); } catch (e) { toast('Could not send the view: ' + e.message); } };
function useMeasured(metres, unc, id) {
  open(); selectShape('sphere'); A.vals.R = +(metres / 2).toPrecision(6); applyToLayer(); buildLeft(); fitCamera(); refresh(true); setView('3d'); A.logNow = true;
  log('i', 'From your measurement ' + id + ': diameter = ' + metres.toPrecision(5) + ' m' + (unc ? ' ± ' + unc.toPrecision(2) + ' m (1 sd)' : '') + ', so sphere radius R = ' + A.vals.R + ' m.');
  toast('Sphere made from your measurement. Radius ' + A.vals.R + ' m.');
}
const HUB = { go(n) {
  if (n === 'design') { close(); if (window.MLAB) window.MLAB.close(); return; }
  if (n === 'reality') { close(); if (window.MLAB) window.MLAB.close(); if (window.REAL) window.REAL.open(); return; }
  if (window.REAL) window.REAL.close();
  if (n === '3d' || n === 'const') { if (window.MLAB) window.MLAB.close(); open(); setView(n === 'const' ? 'const' : '3d'); return; }
  close(); if (window.MLAB) { window.MLAB.open(); window.MLAB.setHub(n); }
} };
window.HUB = HUB;
$('#m3Add').onclick = () => { try { const L = JSON.parse(JSON.stringify(A.L)); const n = MCU.addSolid(A.shape === 'custom' ? 'torus' : A.shape, { fx: L.fx, fy: L.fy, fz: L.fz, umin: L.umin, umax: L.umax, vmin: L.vmin, vmax: L.vmax, nu: L.nu, nv: L.nv, P: L.P, kind: L.kind, name: 'Math3D ' + shapeDef().name.replace(/ \(.*/, '') }); close(); toast('Added to your design.'); } catch (e) { toast('Could not add: ' + e.message); } };
root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !e.defaultPrevented) close(); });
document.addEventListener('click', (e) => { if (e.target.closest('#m3Btn') || e.target.closest('[data-open3d]')) open(); });
window.M3LAB = { useMeasured, applyPreset, renderConsts, open, close, state: A, setShape: selectShape, facts: meshFacts, setView, refresh, exportVideo, parseCode };
})();
