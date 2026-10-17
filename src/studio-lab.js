/* Measurement Lab: a scientific workstation on top of the measurement engine (meas.js) and photo geometry (geo.js).
   Dark workspace: tools on the left, zoom/pan viewer in the middle, numbers and uncertainty on the right, frame bar below. */
(function () {
'use strict';
const X = window.MEAS, G = window.GEO, MCU = window.MCU, MC = window.MC;
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fin = (v) => typeof v === 'number' && isFinite(v);
const fmt = (v, d) => { if (!fin(v)) return '–'; const a = Math.abs(v); const p = d || 4; return a >= 1000 ? v.toFixed(1) : a >= 100 ? v.toFixed(2) : a >= 1 ? v.toFixed(Math.max(1, p - 1 - Math.floor(Math.log10(a)))) : v.toPrecision(p); };

/* ------------------------------------------------------------------ styles */
const css = `
#lab{position:fixed;inset:0;z-index:90;display:grid;grid-template-columns:56px 1fr 340px;grid-template-rows:48px 1fr auto;grid-template-areas:"top top top" "tools stage side" "tools time side";background:#080c11;color:#d6e2ee;font:13px/1.45 var(--f-body);--lb-bg:#080c11;--lb-panel:#0e141b;--lb-panel2:#121a23;--lb-line:#1d2936;--lb-muted:#7f92a7;--lb-acc:#22d3ee;--lb-acc2:#0e7490}
#lab[hidden]{display:none}
#lab *{box-sizing:border-box}
#lab button{font:inherit;color:inherit;background:var(--lb-panel2);border:1px solid var(--lb-line);border-radius:6px;padding:5px 10px;cursor:pointer;min-height:30px}
#lab button:hover{border-color:#2d4256}#lab button:focus-visible,#lab input:focus-visible,#lab select:focus-visible{outline:2px solid var(--lb-acc);outline-offset:1px}
#lab button[aria-pressed=true],#lab button.on{background:#0b3a46;border-color:var(--lb-acc);color:#c9f6ff}
#lab button:disabled{opacity:.4;cursor:default}
#lab{overflow:hidden}
#lab .lb-top{grid-area:top;display:flex;align-items:center;gap:8px;padding:0 10px;overflow-x:auto;white-space:nowrap;background:var(--lb-panel);border-bottom:1px solid var(--lb-line);min-width:0}
#lab .lb-brand{font:600 13px var(--f-body);letter-spacing:.04em;color:#e8f3ff;display:flex;align-items:center;gap:8px;margin-right:6px;white-space:nowrap}
#lab .lb-brand i{width:9px;height:9px;border-radius:50%;background:var(--lb-acc);box-shadow:0 0 10px var(--lb-acc)}
#lab .lb-sp{flex:1}
#lab .lb-tools{grid-area:tools;display:flex;flex-direction:column;gap:4px;padding:8px 6px;background:var(--lb-panel);border-right:1px solid var(--lb-line);overflow:auto}
#lab .lb-tools button{width:44px;min-height:44px;padding:2px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;gap:1px;line-height:1.1}
#lab .lb-tools button b{font:600 17px var(--f-data);color:#9fe9f7}
#lab .lb-stage{grid-area:stage;position:relative;overflow:hidden;background:#05080c;touch-action:none;min-width:0;min-height:0}
#lab canvas#lbCv{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair}
#lab .lb-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:20px;color:var(--lb-muted)}
#lab .lb-empty h2{margin:0;color:#e8f3ff;font:600 18px var(--f-body)}
#lab .lb-top button{flex:none}
#lab .lb-hint{position:absolute;left:10px;bottom:10px;max-width:calc(100% - 20px);background:rgba(8,12,17,.88);border:1px solid var(--lb-line);border-radius:6px;padding:6px 10px;color:#bcd0e2;pointer-events:none}
#lab .lb-coord{position:absolute;right:10px;top:8px;font:11px var(--f-data);color:var(--lb-muted);background:rgba(8,12,17,.8);padding:2px 6px;border-radius:4px;pointer-events:none}
#lab .lb-zoom{position:absolute;right:10px;bottom:10px;display:flex;gap:4px}
#lab .lb-zoom button{min-width:34px}
#lab .lb-time{grid-area:time;display:flex;align-items:center;gap:8px;padding:0 10px;background:var(--lb-panel);border-top:1px solid var(--lb-line);min-width:0}
#lab .lb-time input[type=range]{flex:1;min-width:60px;accent-color:var(--lb-acc)}
#lab .lb-time .t{font:12px var(--f-data);color:#9fe9f7;white-space:nowrap}
#lab .lb-side{grid-area:side;display:flex;flex-direction:column;background:var(--lb-panel);border-left:1px solid var(--lb-line);min-height:0;min-width:0}
#lab .lb-tabs{display:flex;border-bottom:1px solid var(--lb-line)}
#lab .lb-tabs button{flex:1;border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:10px 4px;font-size:12px}
#lab .lb-tabs button[aria-selected=true]{border-bottom-color:var(--lb-acc);color:#c9f6ff;background:#0b1620}
#lab .lb-pane{flex:1;overflow:auto;padding:12px;display:none}
#lab .lb-pane.on{display:block}
#lab h3{margin:14px 0 6px;font:600 11px var(--f-body);letter-spacing:.09em;text-transform:uppercase;color:var(--lb-muted)}
#lab h3:first-child{margin-top:0}
#lab label{display:block;color:#b6c7d8;margin:8px 0 2px}
#lab input[type=number],#lab input[type=text],#lab select{width:100%;background:#0a1017;color:#e8f3ff;border:1px solid var(--lb-line);border-radius:6px;padding:6px 8px;min-height:30px;font:12px var(--f-data)}
#lab input[type=range]{width:100%;accent-color:var(--lb-acc)}
#lab .row2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#lab .fine{color:var(--lb-muted);font-size:12px;margin:4px 0}
#lab .card{background:var(--lb-panel2);border:1px solid var(--lb-line);border-radius:8px;padding:10px;margin:8px 0}
#lab .card.sel{border-color:var(--lb-acc)}
#lab .card .big{font:600 17px var(--f-data);color:#f2fbff}
#lab .k{display:inline-block;font:600 10px var(--f-body);letter-spacing:.05em;text-transform:uppercase;padding:1px 7px;border-radius:999px;border:1px solid currentColor;vertical-align:1px}
#lab .k-measured{color:#22d3ee}#lab .k-calculated{color:#a78bfa}#lab .k-calibrated{color:#34d399}#lab .k-estimated{color:#fbbf24}#lab .k-assumed{color:#fb923c}#lab .k-unknown{color:#94a3b8}#lab .k-invalid{color:#f87171}
#lab .warn{color:#fbbf24;font-size:12px;margin:3px 0}#lab .err{color:#f87171;font-size:12px;margin:3px 0}
#lab table{width:100%;border-collapse:collapse;font:11.5px var(--f-data)}#lab td,#lab th{padding:3px 5px;border-bottom:1px solid var(--lb-line);text-align:left;vertical-align:top}
#lab details{margin:6px 0}#lab summary{cursor:pointer;color:#9fe9f7}
#lab .modal{position:absolute;inset:0;background:rgba(3,6,9,.82);z-index:5;display:flex;align-items:center;justify-content:center;padding:14px}
#lab .modal[hidden]{display:none}
#lab .mbox{background:var(--lb-panel);border:1px solid var(--lb-line);border-radius:10px;max-width:min(1100px,100%);max-height:100%;overflow:auto;padding:14px;width:100%}
#lab .mbox canvas{max-width:100%;background:#05080c;border-radius:6px;display:block;touch-action:none}
#lab .spin{display:inline-block;width:12px;height:12px;border:2px solid #1d2936;border-top-color:var(--lb-acc);border-radius:50%;animation:lbs .8s linear infinite;vertical-align:-2px;margin-right:6px}
#lab .lb-hub{display:flex;gap:2px;margin:0 6px}#lab .lb-hub button{border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:6px 12px;min-height:44px;font-size:13px}#lab .lb-hub button[aria-selected=true]{border-bottom-color:var(--lb-acc);color:#e6f0ff;background:#0d1a38}
#lab .lb-strip{flex-basis:100%;display:none;height:52px;gap:2px;overflow-x:auto;align-items:stretch}#lab .lb-strip.on{display:flex}#lab .lb-strip canvas{flex:1 0 64px;min-width:64px;height:100%;border:1px solid var(--lb-line);border-radius:4px;cursor:pointer;background:#05080c}#lab .lb-strip canvas.cur{border-color:var(--lb-acc);box-shadow:0 0 0 1px var(--lb-acc)}
#lab .lb-time{flex-wrap:wrap;padding-top:4px;padding-bottom:4px}
#lab .tabs2{display:flex;gap:2px;border-bottom:1px solid var(--lb-line);margin:6px 0}#lab .tabs2 button{border:0;border-radius:0;background:transparent;border-bottom:2px solid transparent;padding:4px 10px;min-height:28px}#lab .tabs2 button[aria-selected=true]{border-bottom-color:var(--lb-acc)}
#lab canvas.perv{width:100%;border:1px solid var(--lb-line);border-radius:6px;background:#05080c;display:block}
@keyframes lbs{to{transform:rotate(360deg)}}
#lab .tip{position:relative}
.lb-launch{margin-left:0}
@media (max-width:860px){
 #lab{grid-template-columns:1fr;grid-template-rows:44px 1fr 52px auto auto;grid-template-areas:"top" "stage" "tools" "time" "side"}
 #lab .lb-tools{flex-direction:row;overflow-x:auto;border-right:0;border-top:1px solid var(--lb-line);padding:4px 6px}
 #lab .lb-tools button{min-width:44px;min-height:40px}
 #lab .lb-side{max-height:44vh;border-left:0;border-top:1px solid var(--lb-line)}
 #lab .lb-hint{font-size:12px;top:8px;bottom:auto}
 #lab .lb-coord{display:none}
 #lab .lb-stage{min-height:200px}
 #lab .lb-brand span{display:none}
}
@media (prefers-reduced-motion:reduce){#lab .spin{animation:none}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

/* ------------------------------------------------------------------ DOM */
const lab = document.createElement('div'); lab.id = 'lab'; lab.hidden = true; lab.setAttribute('role', 'dialog'); lab.setAttribute('aria-modal', 'true'); lab.setAttribute('aria-label', 'Measurement Lab');
lab.innerHTML = `
<header class="lb-top">
  <div class="lb-brand"><i></i><span>Scientific Reality Editor</span></div>
  <nav class="lb-hub" id="lbHub" role="tablist" aria-label="Workspaces"><button role="tab" data-hub="design" aria-selected="false">Design</button><button role="tab" data-hub="photo" aria-selected="true">Photo Lab</button><button role="tab" data-hub="video" aria-selected="false">Video Lab</button><button role="tab" data-hub="calib" aria-selected="false">Calibration</button><button role="tab" data-hub="3d" aria-selected="false">3D Lab</button><button role="tab" data-hub="const" aria-selected="false">Constants</button></nav>
  <button type="button" id="lbOpen" title="Open a photo or video file">Open</button>
  <button type="button" data-guide title="Open the quick guide">Guide</button>
  <button type="button" id="lbFromDesign" title="Use the photo selected in the design">From design</button>
  <input type="file" id="lbFile" accept="image/*,video/*" hidden>
  <span class="lb-sp"></span>
  <button type="button" id="lbUndo" disabled aria-label="Undo">Undo</button><button type="button" id="lbRedo" disabled aria-label="Redo">Redo</button><button type="button" id="lbReset" title="Remove all measurements and settings for this file">Reset</button>
  <button type="button" id="lbExport" aria-haspopup="true">Export</button>
  <button type="button" id="lbClose" aria-label="Close the Measurement Lab">Close</button>
</header>
<nav class="lb-tools" aria-label="Tools" id="lbTools">
  <button type="button" data-tool="pan" title="Move and zoom (H). Drag any point to edit it."><b>✥</b>Move</button>
  <button type="button" data-tool="dist" title="Distance between two points (D)"><b>↔</b>Distance</button>
  <button type="button" data-tool="angle" title="Angle at the middle of three points (A)"><b>∠</b>Angle</button>
  <button type="button" data-tool="poly" title="Polygon: area and perimeter (P). Double-click to finish."><b>⬡</b>Area</button>
  <button type="button" data-tool="box" title="Rectangle: width, height and area from two opposite corners (B)"><b>▭</b>Rectangle</button>
  <button type="button" data-tool="circle" title="Circle through 3 or more points (C)"><b>○</b>Circle</button>
  <button type="button" data-tool="plane" title="Mark a flat object of known size to get real units (R)"><b>▦</b>Scale</button>
  <button type="button" data-tool="rect" title="Four-corner perspective correction (F)"><b>▱</b>Flatten</button>
  <button type="button" data-tool="crop" title="Crop view (X)"><b>⮶</b>Crop</button>
  <button type="button" data-tool="track" title="Place a point to track through the video (T)"><b>◎</b>Track</button>
</nav>
<main class="lb-stage" id="lbStage">
  <canvas id="lbCv" tabindex="0" aria-label="Measurement workspace. Use the tools on the left, then click or tap the picture."></canvas>
  <div class="lb-empty" id="lbEmpty"><h2>Measure a photo or video</h2><p>Everything runs on this device. Nothing is uploaded.</p><p><button type="button" id="lbOpen2" class="on">Open photo or video</button></p><p class="fine">Pixel distances are measured directly. Real-world units appear only after you mark a flat object of known size or calibrate the camera, and every result is labelled with how it was obtained and how uncertain it is.</p></div>
  <div class="lb-hint" id="lbHint" hidden></div><div class="lb-coord" id="lbCoord" hidden></div>
  <div class="lb-zoom"><button type="button" id="lbZm" aria-label="Zoom out">−</button><button type="button" id="lbZf" aria-label="Fit to screen">Fit</button><button type="button" id="lbZ1" aria-label="Actual pixels">1:1</button><button type="button" id="lbZp" aria-label="Zoom in">+</button></div>
</main>
<footer class="lb-time" id="lbTime">
  <button type="button" id="lbPlay" aria-label="Play or pause" disabled>▶</button><button type="button" id="lbPrev" aria-label="Previous frame" disabled>◀▮</button><input type="range" id="lbScrub" min="0" max="1" step="0.001" value="0" disabled aria-label="Video position"><button type="button" id="lbNext" aria-label="Next frame" disabled>▮▶</button><span class="t" id="lbTt">no video</span><div class="lb-strip" id="lbStrip" aria-label="Video frames. Click a frame to jump there."></div>
</footer>
<aside class="lb-side" aria-label="Properties and results">
  <div class="lb-tabs" role="tablist"><button role="tab" aria-selected="true" data-pane="res">Results</button><button role="tab" aria-selected="false" data-pane="cal">Scale</button><button role="tab" aria-selected="false" data-pane="adj">Adjust</button><button role="tab" aria-selected="false" data-pane="per">Persp.</button><button role="tab" aria-selected="false" data-pane="trk">Track</button><button role="tab" aria-selected="false" data-pane="help">Help</button></div>
  <div class="lb-pane on" id="pane-res"></div><div class="lb-pane" id="pane-cal"></div><div class="lb-pane" id="pane-adj"></div><div class="lb-pane" id="pane-per"></div><div class="lb-pane" id="pane-trk"></div><div class="lb-pane" id="pane-help"></div>
</aside>
<div class="modal" id="lbModal" hidden><div class="mbox" id="lbMBox"></div></div>
`;
document.body.appendChild(lab);

/* ------------------------------------------------------------------ state */
const S = { hub: 'photo', src: null, view: { s: 1, tx: 0, ty: 0 }, tool: 'pan', pts: [], items: [], sel: -1, plane: null, quad: null, adjust: { ev: 0, c: 0, b: 0, sat: 0, sh: 0 }, crop: null, cmp: { on: false, pos: 0.5 }, sigma: 1.5, disp: 'auto', prof: null, undist: true, tracks: [], fps: null, fpsAssumed: 30, tracking: false, camViews: [], camRes: null, n: 0, hist: [], redo: [], busy: '' };
let cv, ctx, W = 0, H = 0, DPR = 1, proc = null, procKey = '', raf = 0, drag = null, hover = null;
const toast = (m) => { try { MCU.toast(m); } catch (e) { /* ignore */ } };
const cvx = () => $('#lbCv');

/* ------------------------------------------------------------------ undo / redo */
const snapState = () => JSON.stringify({ items: S.items, plane: S.plane, quad: S.quad, adjust: S.adjust, crop: S.crop, n: S.n });
function pushHist() { S.hist.push(snapState()); if (S.hist.length > 80) S.hist.shift(); S.redo = []; updHist(); }
function restore(js) { const o = JSON.parse(js); S.items = o.items; S.plane = o.plane; S.quad = o.quad; S.adjust = Object.assign({ ev: 0, c: 0, b: 0, sat: 0, sh: 0 }, o.adjust); S.crop = o.crop; S.n = o.n; if (S.plane) S.plane.H = planeH(); S.sel = -1; S.pts = []; remeasure(); renderAll(); }
function updHist() { $('#lbUndo').disabled = !S.hist.length; $('#lbRedo').disabled = !S.redo.length; }
$('#lbUndo').onclick = () => { if (!S.hist.length) return; S.redo.push(snapState()); restore(S.hist.pop()); updHist(); };
$('#lbRedo').onclick = () => { if (!S.redo.length) return; S.hist.push(snapState()); restore(S.redo.pop()); updHist(); };
$('#lbReset').onclick = () => { if (!S.src) return; if (!S.items.length && !S.plane && !S.quad && !S.crop && !S.adjust.ev && !S.adjust.c && !S.adjust.b && !S.adjust.sat && !S.adjust.sh) return; pushHist(); S.items = []; S.plane = null; S.quad = null; S.crop = null; S.adjust = { ev: 0, c: 0, b: 0, sat: 0, sh: 0 }; S.pts = []; S.sel = -1; S.tracks = []; renderAll(); toast('Measurements and settings for this file were cleared. Undo brings them back.'); };

/* ------------------------------------------------------------------ source handling */
function setSource(src) {
  if (S.src && S.src.kind === 'video' && S.src.url) { try { S.src.v.pause(); S.src.v.removeAttribute('src'); S.src.v.load(); URL.revokeObjectURL(S.src.url); } catch (e) { /* ignore */ } }
  S.src = src; S.items = []; S.plane = null; S.quad = null; S.crop = null; S.adjust = { ev: 0, c: 0, b: 0, sat: 0, sh: 0 }; S.pts = []; S.sel = -1; S.tracks = []; S.hist = []; S.redo = []; S.fps = null; S.n = 0; proc = null; procKey = ''; updHist();
  $('#lbEmpty').hidden = true; fitView(); setTool('pan'); renderAll();
  S.per = null; buildStrip(); if (S.hub !== 'calib') setHub(src.kind === 'video' ? 'video' : 'photo', true); if (S.hub === 'video' && src.kind === 'video') { const tb = $$('.lb-tabs button').find((b) => b.dataset.pane === 'res'); if (tb) tb.click(); }
  const isV = src.kind === 'video'; ['#lbPlay', '#lbPrev', '#lbNext', '#lbScrub'].forEach((q) => { $(q).disabled = !isV; }); $('#lbScrub').max = isV ? src.dur : 1; syncTime();
  if (isV) { estimateFps(src.v); }
}
function readFile(file) {
  if (!file) return; const isV = /^video\//.test(file.type) || /\.(mp4|mov|webm|m4v)$/i.test(file.name);
  busy('Opening ' + file.name + '…');
  if (isV) {
    const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.preload = 'auto'; const url = URL.createObjectURL(file); v.src = url;
    v.onloadeddata = () => { busy(''); setSource({ kind: 'video', v, url, w: v.videoWidth, h: v.videoHeight, dur: v.duration, name: file.name, size: file.size, type: file.type, file }); v.onerror = null; };
    v.onerror = () => { busy(''); URL.revokeObjectURL(url); toast('This browser cannot decode ' + file.name + '. Try an MP4 (H.264) or WebM file.'); };
  } else {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => { busy(''); const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0); URL.revokeObjectURL(url);
      const meta = {}; file.arrayBuffer().then((b) => { try { Object.assign(meta, G.exif(b)); } catch (e) { /* none */ } renderPanes(); }); setSource({ kind: 'image', el: c, w: c.width, h: c.height, name: file.name, size: file.size, type: file.type, meta, file }); };
    im.onerror = () => { busy(''); URL.revokeObjectURL(url); toast('Could not read ' + file.name + ' as a picture. Try a JPG, PNG or WebP file.'); };
    im.src = url;
  }
}
function busy(msg) { S.busy = msg; const h = $('#lbHint'); if (msg) { h.hidden = false; h.innerHTML = '<span class="spin"></span>' + esc(msg); } else updateHint(); }
function estimateFps(v) { if (!('requestVideoFrameCallback' in v)) return; const t = []; let n = 0; const cb = (now, md) => { t.push(md.mediaTime); if (++n < 12) v.requestVideoFrameCallback(cb); else { v.pause(); const d = []; for (let i = 1; i < t.length; i++) if (t[i] > t[i - 1]) d.push(t[i] - t[i - 1]); if (d.length >= 4) { d.sort((a, b) => a - b); S.fps = 1 / d[Math.floor(d.length / 2)]; renderPanes(); } v.currentTime = 0; } }; try { v.requestVideoFrameCallback(cb); v.playbackRate = 1; v.play().catch(() => {}); } catch (e) { /* ignore */ } }
const frameDt = () => 1 / (S.fps || S.fpsAssumed);
$('#lbOpen').onclick = $('#lbOpen2').onclick = () => $('#lbFile').click();
$('#lbFile').onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; readFile(f); };
$('#lbFromDesign').onclick = () => { try { const L = MCU.selLayer(); const m = L && L.src && MC.MEDIA[L.src]; if (!m || m.kind !== 'image') { toast('Select a photo in the design first, then press this again.'); return; } const c = document.createElement('canvas'); c.width = m.w; c.height = m.h; c.getContext('2d').drawImage(m.el, 0, 0); setSource({ kind: 'image', el: c, w: c.width, h: c.height, name: (m.file && m.file.name) || 'photo from the design', size: m.file ? m.file.size : 0, type: m.file ? m.file.type : '', meta: m.exif || {}, file: m.file || null }); } catch (e) { toast('Could not use that photo: ' + e.message); } };

/* ------------------------------------------------------------------ view */
function cropRect() { const s = S.src; return S.crop ? S.crop : s ? { x: 0, y: 0, w: s.w, h: s.h } : null; }
function fitView() { if (!S.src || !W) return; const c = cropRect(), f = X.fitView(c.w, c.h, W, H, 12); S.view = { s: f.s, tx: f.tx - c.x * f.s, ty: f.ty - c.y * f.s }; }
const sc = (p) => X.toScreen(S.view, p), im = (p) => X.toImage(S.view, p);
function resize() { const st = $('#lbStage'); if (!st || lab.hidden) return; DPR = Math.min(2, window.devicePixelRatio || 1); const w = st.clientWidth, h = st.clientHeight; if (!w || !h) return; const first = !W; W = w; H = h; cv = cvx(); cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR); ctx = cv.getContext('2d'); if (first) fitView(); draw(); }
window.addEventListener('resize', () => { const old = W; resize(); if (old && S.src) { /* keep centre */ } });
function zoomBy(f, cx, cy) { S.view = X.zoomAt(S.view, cx === undefined ? W / 2 : cx, cy === undefined ? H / 2 : cy, f, 0.02, 80); draw(); }
$('#lbZp').onclick = () => zoomBy(1.4); $('#lbZm').onclick = () => zoomBy(1 / 1.4); $('#lbZf').onclick = () => { fitView(); draw(); }; $('#lbZ1').onclick = () => { if (!S.src) return; const c = cropRect(), cx = c.x + c.w / 2, cy = c.y + c.h / 2; S.view = { s: 1 / DPR * DPR, tx: W / 2 - cx, ty: H / 2 - cy }; draw(); };

/* ------------------------------------------------------------------ pixels: adjustments */
const adjDefault = () => !S.adjust.ev && !S.adjust.c && !S.adjust.b && !S.adjust.sat && !S.adjust.sh;
function lut() { const a = S.adjust, k = Math.pow(2, a.ev), cf = 1 + a.c / 100, o = new Uint8ClampedArray(256); for (let i = 0; i < 256; i++) { let v = i / 255; v = v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); v *= k; v = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; v = v * 255; v = (v - 128) * cf + 128 + a.b * 2.55; o[i] = v; } return o; }
/* unsharp mask: out = in + amount * (in - 3x3 box blur), alpha untouched. A display aid only; it adds no real detail. */
function sharpenData(d, w, h, amt) { const a = d.data, o = new Uint8ClampedArray(a); for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = (y * w + x) * 4; for (let c = 0; c < 3; c++) { const b = (a[i + c - 4 - w * 4] + a[i + c - w * 4] + a[i + c + 4 - w * 4] + a[i + c - 4] + a[i + c] + a[i + c + 4] + a[i + c - 4 + w * 4] + a[i + c + w * 4] + a[i + c + 4 + w * 4]) / 9; o[i + c] = a[i + c] + amt * (a[i + c] - b); } } a.set(o); }
function adjustedCanvas(srcEl, w, h, cw, ch, sx, sy, sw, sh) { const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d', { willReadFrequently: true }); x.imageSmoothingEnabled = true; x.drawImage(srcEl, sx, sy, sw, sh, 0, 0, cw, ch); if (!adjDefault()) { const d = x.getImageData(0, 0, cw, ch), L = lut(); const sk = 1 + (S.adjust.sat || 0) / 100, dd = d.data; for (let i = 0; i < dd.length; i += 4) { let r = L[dd[i]], g = L[dd[i + 1]], b2 = L[dd[i + 2]]; if (sk !== 1) { const y = 0.2126 * r + 0.7152 * g + 0.0722 * b2; r = y + (r - y) * sk; g = y + (g - y) * sk; b2 = y + (b2 - y) * sk; } dd[i] = r; dd[i + 1] = g; dd[i + 2] = b2; } if (S.adjust.sh) sharpenData(d, cw, ch, S.adjust.sh / 100 * 1.6); x.putImageData(d, 0, 0); } return c; }
const srcEl = () => (S.src.kind === 'video' ? S.src.v : S.src.el);

/* ------------------------------------------------------------------ plane (reference) and measurement */
function ptsForGeometry(pts) { if (S.prof && S.undist && sameSize()) return pts.map((p) => X.undistortPt(S.prof.cal, p)); return pts; }
const sameSize = () => S.prof && S.src && S.prof.cal.size && S.prof.cal.size.w === S.src.w && S.prof.cal.size.h === S.src.h;
function planeH() { if (!S.plane) return null; const c = ptsForGeometry(S.plane.corners), w = S.plane.w, h = S.plane.h; return X.fitHomography(c, [[0, 0], [w, 0], [w, h], [0, h]]); }
function planeObj() { return S.plane && S.plane.H ? { H: S.plane.H, unit: S.plane.unit } : null; }
function remeasure() { if (S.plane) S.plane.H = planeH(); S.items = S.items.map((m) => makeItem(m.type, m.pts, m)); }
function makeItem(type, pts, old) {
  const geo = ptsForGeometry(pts); const r = X.measure(type, geo, planeObj(), S.sigma); r.pts = pts.map((p) => p.slice(0, 2)); r.id = old ? old.id : 'M' + (++S.n); r.label = old ? old.label : ''; if (S.src && S.src.kind === 'video') r.t = old && old.t !== undefined ? old.t : S.src.v.currentTime; return r;
}
function addItem(type, pts) { pushHist(); const m = makeItem(type, pts); S.items.push(m); S.sel = S.items.length - 1; S.pts = []; renderAll(); if (m.kind === 'invalid') toast('Not a valid ' + type + ': ' + (m.issues[0] || 'degenerate shape') + ' It is listed in Results so you can see why.'); }
function valueText(m) {
  if (m.kind === 'invalid') return { main: 'Invalid', sub: m.issues.join(' ') };
  const isPx = m.value === null || m.value === undefined; const unit = isPx ? (m.px ? m.px.unit : '') : m.unit; let v = isPx ? (m.px ? m.px.value : NaN) : m.value, unc = isPx ? (m.px ? m.px.unc : null) : m.unc;
  // display unit conversion for plane units
  if (!isPx && S.disp !== 'auto' && S.plane && X.LEN[S.plane.unit] && m.type !== 'angle') { const pw = m.type === 'polygon' ? 2 : 1; const f = X.convert(1, S.plane.unit, S.disp, pw); v *= f; if (unc) unc = { sd: unc.sd * f, lo: unc.lo * f, hi: unc.hi * f }; return { main: fmt(v) + ' ' + S.disp + (m.type === 'polygon' ? '²' : ''), unc, v, pxline: m.px ? fmt(m.px.value) + ' ' + m.px.unit : '' }; }
  return { main: fmt(v) + ' ' + unit, unc, v, pxline: !isPx && m.px ? fmt(m.px.value) + ' ' + m.px.unit : '' };
}

/* ------------------------------------------------------------------ drawing */
function schedule() { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); }
function draw() {
  if (!ctx || lab.hidden) return; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#05080c'; ctx.fillRect(0, 0, cv.width, cv.height); if (!S.src) return;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); const V = S.view, c = cropRect();
  // visible region of the source in image coordinates
  const a = im([0, 0]), b = im([W, H]); const x0 = Math.max(c.x, Math.floor(a[0])), y0 = Math.max(c.y, Math.floor(a[1])), x1 = Math.min(c.x + c.w, Math.ceil(b[0])), y1 = Math.min(c.y + c.h, Math.ceil(b[1]));
  if (x1 > x0 && y1 > y0) {
    const sw = x1 - x0, sh = y1 - y0, cw = Math.max(1, Math.min(Math.ceil(sw * V.s), W)), ch = Math.max(1, Math.min(Math.ceil(sh * V.s), H)), el = srcEl();
    const key = [S.src.kind === 'video' ? S.src.v.currentTime : 0, x0, y0, x1, y1, cw, ch, S.adjust.ev, S.adjust.c, S.adjust.b, S.adjust.sat || 0, S.adjust.sh || 0].join('|');
    try { ctx.imageSmoothingEnabled = V.s < 3; const dx = x0 * V.s + V.tx, dy = y0 * V.s + V.ty, dw = sw * V.s, dh = sh * V.s;
      if (S.cmp.on && !adjDefault()) { const px = S.cmp.pos * W; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, px, H); ctx.clip(); ctx.drawImage(el, x0, y0, sw, sh, dx, dy, dw, dh); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(px, 0, W - px, H); ctx.clip(); ctx.drawImage(adjCached(key, el, cw, ch, x0, y0, sw, sh), dx, dy, dw, dh); ctx.restore(); ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke(); ctx.fillStyle = '#22d3ee'; ctx.fillRect(px - 12, H / 2 - 14, 24, 28); ctx.fillStyle = '#05080c'; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('◀▶', px, H / 2 + 4); ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.fillText('ORIGINAL', 10, 18); ctx.fillText('ADJUSTED', W - 70, 18); }
      else if (adjDefault()) ctx.drawImage(el, x0, y0, sw, sh, dx, dy, dw, dh); else ctx.drawImage(adjCached(key, el, cw, ch, x0, y0, sw, sh), dx, dy, dw, dh);
    } catch (e) { /* frame not ready */ }
  }
  if (S.crop) { ctx.save(); ctx.strokeStyle = 'rgba(34,211,238,.6)'; ctx.setLineDash([5, 4]); const p = sc([c.x, c.y]); ctx.strokeRect(p[0], p[1], c.w * V.s, c.h * V.s); ctx.restore(); }
  overlays();
}
function adjCached(key, el, cw, ch, sx, sy, sw, sh) { if (procKey !== key || !proc) { proc = adjustedCanvas(el, 0, 0, cw, ch, sx, sy, sw, sh); procKey = key; } return proc; }

const COL = { pt: '#22d3ee', line: '#22d3ee', ref: '#34d399', quad: '#fbbf24', pend: '#ffffff', sel: '#ffffff', inv: '#f87171' };
function cross(c, p, col, r) { c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.moveTo(p[0] - r, p[1]); c.lineTo(p[0] + r, p[1]); c.moveTo(p[0], p[1] - r); c.lineTo(p[0], p[1] + r); c.stroke(); c.beginPath(); c.arc(p[0], p[1], r * 0.45, 0, 7); c.stroke(); }
function label(c, text, p, col, scale) { const f = 12 * (scale || 1); c.font = '600 ' + f + 'px ' + (getComputedStyle(lab).getPropertyValue('--f-data') || 'monospace'); const w = c.measureText(text).width + 10 * (scale || 1); c.fillStyle = 'rgba(5,8,12,.82)'; c.fillRect(p[0], p[1] - f - 3, w, f + 8); c.fillStyle = col; c.fillText(text, p[0] + 5 * (scale || 1), p[1] - 1); }
function drawItem(c, m, T, selected, k) { // T maps image point -> screen/export point
  const P = m.pts.map(T), col = m.kind === 'invalid' ? COL.inv : selected ? COL.sel : m.kind === 'calibrated' ? COL.ref : COL.line, r = 6 * (k || 1); c.lineWidth = (selected ? 2.4 : 1.6) * (k || 1); c.strokeStyle = col; c.fillStyle = col;
  if (m.type === 'dist' || m.type === 'distance') { c.beginPath(); c.moveTo(P[0][0], P[0][1]); c.lineTo(P[1][0], P[1][1]); c.stroke(); }
  else if (m.type === 'angle') { c.beginPath(); c.moveTo(P[0][0], P[0][1]); c.lineTo(P[1][0], P[1][1]); c.lineTo(P[2][0], P[2][1]); c.stroke(); const a1 = Math.atan2(P[0][1] - P[1][1], P[0][0] - P[1][0]), a2 = Math.atan2(P[2][1] - P[1][1], P[2][0] - P[1][0]); let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; c.beginPath(); c.arc(P[1][0], P[1][1], 22 * (k || 1), a1, a1 + d, d < 0); c.stroke(); }
  else if (m.type === 'polygon') { c.beginPath(); P.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.globalAlpha = 0.14; c.fill(); c.globalAlpha = 1; c.stroke(); }
  else if (m.type === 'circle') { const q = m.pts.length === 3 ? X.circleFrom3(m.pts[0], m.pts[1], m.pts[2]) : X.fitCircle(m.pts); if (q) { const ct = T([q.cx, q.cy]), e = T([q.cx + q.r, q.cy]); c.beginPath(); c.arc(ct[0], ct[1], Math.hypot(e[0] - ct[0], e[1] - ct[1]), 0, 7); c.stroke(); c.beginPath(); c.arc(ct[0], ct[1], 2 * (k || 1), 0, 7); c.fill(); } }
  P.forEach((p) => cross(c, p, col, r)); const vt = valueText(m); const top = P.reduce((a, p) => (p[1] < a[1] ? p : a), P[0]); label(c, (m.id) + '  ' + vt.main + (vt.unc && m.kind !== 'invalid' ? ' ±' + fmt(vt.unc.sd, 2) : ''), [top[0] + 8 * (k || 1), top[1] - 8 * (k || 1)], col, k || 1);
}
function overlays() {
  const c = ctx; S.items.forEach((m, i) => { if (m.t !== undefined && S.src.kind === 'video' && Math.abs(m.t - S.src.v.currentTime) > frameDt() * 0.6) return; drawItem(c, m, sc, i === S.sel, 1); });
  if (S.plane) { const P = S.plane.corners.map(sc); c.strokeStyle = COL.ref; c.lineWidth = 1.8; c.setLineDash([6, 3]); c.beginPath(); P.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.stroke(); c.setLineDash([]); P.forEach((p) => cross(c, p, COL.ref, 6)); label(c, 'scale reference ' + fmt(S.plane.w) + ' × ' + fmt(S.plane.h) + ' ' + S.plane.unit, [P[0][0], P[0][1] - 4], COL.ref); }
  if (S.quad) { const P = S.quad.map(sc); c.strokeStyle = COL.quad; c.lineWidth = 1.8; c.beginPath(); P.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.stroke(); P.forEach((p, i) => { cross(c, p, COL.quad, 6); c.fillStyle = COL.quad; c.font = '11px sans-serif'; c.fillText(['TL', 'TR', 'BR', 'BL'][i], p[0] + 8, p[1] - 6); }); }
  S.tracks.forEach((t) => { if (!t.samples.length) return; c.strokeStyle = t.color; c.lineWidth = 1.5; c.beginPath(); t.samples.forEach((s, i) => { const p = sc([s.x, s.y]); i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.stroke(); const cur = currentSample(t); if (cur) { const p = sc([cur.x, cur.y]); cross(c, p, cur.ok ? t.color : COL.inv, 9); label(c, t.name + (cur.ok ? '' : ' LOST'), [p[0] + 10, p[1] - 10], cur.ok ? t.color : COL.inv); } });
  if (S.pts.length) { const P = S.pts.map(sc); c.strokeStyle = COL.pend; c.lineWidth = 1.4; c.setLineDash([4, 3]); c.beginPath(); P.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); if (hover && S.pts.length && ['dist', 'angle', 'poly', 'circle', 'plane', 'rect'].includes(S.tool)) c.lineTo(hover[0], hover[1]); c.stroke(); c.setLineDash([]); P.forEach((p) => cross(c, p, COL.pend, 6)); }
  if (drag && drag.kind === 'crop') { const a = sc(drag.a), b = sc(drag.b); c.strokeStyle = '#22d3ee'; c.setLineDash([5, 4]); c.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); c.setLineDash([]); }
  // magnifier while placing a point
  if (hover && ['box', 'dist', 'angle', 'poly', 'circle', 'plane', 'rect', 'track'].includes(S.tool) && !drag) magnifier(c, hover);
}
function magnifier(c, h) { if (!S.src || S.view.s > 6) return; const p = im(h), R = 44, z = 4; const x = h[0] > W - 120 ? h[0] - 100 : h[0] + 30, y = h[1] < 110 ? h[1] + 30 : h[1] - 100; c.save(); c.beginPath(); c.arc(x + R / 2 + 20, y + R / 2 + 20, R, 0, 7); c.clip(); c.fillStyle = '#000'; c.fillRect(x - 30, y - 30, 2 * R + 20, 2 * R + 20); c.imageSmoothingEnabled = false; try { c.drawImage(srcEl(), p[0] - R / z, p[1] - R / z, 2 * R / z, 2 * R / z, x + 20 - R / 2, y + 20 - R / 2, 2 * R, 2 * R); } catch (e) { /* ignore */ } c.restore(); const cx = x + R / 2 + 20, cy = y + R / 2 + 20; c.strokeStyle = '#22d3ee'; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.moveTo(cx - 8, cy); c.lineTo(cx + 8, cy); c.moveTo(cx, cy - 8); c.lineTo(cx, cy + 8); c.stroke(); }

/* ------------------------------------------------------------------ interaction */
const need = { box: 2, dist: 2, angle: 3, plane: 4, rect: 4, poly: 0, circle: 0 };
const HINT = { box: 'Click two opposite corners of the rectangle. Its width, height, area and perimeter are measured.', pan: 'Drag to move. Scroll or pinch to zoom. Drag any point to adjust it.', dist: 'Click the two ends of the distance.', angle: 'Click the first arm end, the corner of the angle, then the second arm end.', poly: 'Click the corners. Double-click, Enter or the Finish button closes the shape.', circle: 'Click 3 or more points on the circle edge, then double-click or press Enter.', plane: 'Click the four corners of a flat object of known size: top-left, top-right, bottom-right, bottom-left.', rect: 'Click four corners of a flat region: top-left, top-right, bottom-right, bottom-left. Drag them to fine-tune.', crop: 'Drag a rectangle to crop the view. Measurements keep their original-picture coordinates.', track: 'Click the point to follow. It must sit on a corner or textured spot, not a flat area.' };
function setTool(t) { S.tool = t; S.pts = []; $$('#lbTools button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tool === t))); cvx().style.cursor = t === 'pan' ? 'grab' : 'crosshair'; updateHint(); if (t === 'plane' || t === 'rect') { renderPanes(); } draw(); }
function updateHint() { const h = $('#lbHint'); if (S.busy || !S.src) { h.hidden = !S.busy; return; } const n = S.pts.length, need2 = need[S.tool]; h.hidden = false; h.textContent = HINT[S.tool] + (need2 ? '  (' + n + ' of ' + need2 + ')' : n ? '  (' + n + ' placed)' : ''); }
$$('#lbTools button').forEach((b) => { b.onclick = () => setTool(b.dataset.tool); });
function evPoint(e) { const r = cvx().getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
function handles() { const out = []; S.items.forEach((m, i) => m.pts.forEach((p, j) => out.push({ ref: m.pts, j, kind: 'item', i }))); if (S.plane) S.plane.corners.forEach((p, j) => out.push({ ref: S.plane.corners, j, kind: 'plane' })); if (S.quad) S.quad.forEach((p, j) => out.push({ ref: S.quad, j, kind: 'quad' })); S.tracks.forEach((t) => { const s = currentSample(t); if (s && t.manualOK) out.push({ ref: s, j: -1, kind: 'trk', t }); }); return out; }
function hit(pt) { let best = null, bd = 12; handles().forEach((h) => { const p = h.j < 0 ? [h.ref.x, h.ref.y] : h.ref[h.j]; const q = sc(p), d = Math.hypot(q[0] - pt[0], q[1] - pt[1]); if (d < bd) { bd = d; best = h; } }); return best; }
const pointers = new Map(); let pinch = null, downAt = 0, moved = 0, lastTap = 0;
const stage = $('#lbStage');
stage.addEventListener('pointerdown', (e) => {
  if (!S.src || e.target.closest('.lb-zoom,.lb-empty button')) return; stage.setPointerCapture(e.pointerId); const p = evPoint(e); pointers.set(e.pointerId, p); moved = 0; downAt = Date.now();
  if (pointers.size === 2) { const a = [...pointers.values()]; pinch = { d: Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]), mx: (a[0][0] + a[1][0]) / 2, my: (a[0][1] + a[1][1]) / 2 }; drag = null; return; }
  if (S.cmp.on && !adjDefault() && Math.abs(p[0] - S.cmp.pos * W) < 16) { drag = { kind: 'cmp' }; return; }
  const h = hit(p); if (h && (S.tool === 'pan' || true)) { drag = { kind: 'handle', h, before: snapState() }; return; }
  if (S.tool === 'crop') { drag = { kind: 'crop', a: im(p), b: im(p) }; return; }
  drag = { kind: 'pan', x: p[0], y: p[1], tx: S.view.tx, ty: S.view.ty };
});
stage.addEventListener('pointermove', (e) => {
  if (!S.src) return; const p = evPoint(e); const prev = pointers.get(e.pointerId); if (prev) { moved += Math.abs(p[0] - prev[0]) + Math.abs(p[1] - prev[1]); pointers.set(e.pointerId, p); }
  const q = im(p); const cd = $('#lbCoord'); cd.hidden = false; cd.textContent = 'x ' + q[0].toFixed(1) + '  y ' + q[1].toFixed(1) + ' px'; hover = e.pointerType === 'mouse' || drag ? p : p;
  if (pointers.size === 2 && pinch) { const a = [...pointers.values()], d = Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]), mx = (a[0][0] + a[1][0]) / 2, my = (a[0][1] + a[1][1]) / 2; S.view = X.zoomAt(S.view, mx, my, d / pinch.d, 0.02, 80); S.view.tx += mx - pinch.mx; S.view.ty += my - pinch.my; pinch = { d, mx, my }; schedule(); return; }
  if (drag) {
    if (drag.kind === 'pan') { if (S.tool !== 'pan' && moved < 6) { schedule(); return; } S.view.tx = drag.tx + p[0] - drag.x; S.view.ty = drag.ty + p[1] - drag.y; drag.panned = true; }
    else if (drag.kind === 'handle') { if (!drag.active) { if (moved < 5) { schedule(); return; } drag.active = true; } const i2 = im(p), h = drag.h; if (h.j < 0) { h.ref.x = i2[0]; h.ref.y = i2[1]; h.ref.manual = true; } else h.ref[h.j] = [i2[0], i2[1]]; drag.moved = true; if (h.kind === 'item') { S.items[h.i] = makeItem(S.items[h.i].type, S.items[h.i].pts, S.items[h.i]); } else if (h.kind === 'plane') { S.plane.H = planeH(); S.items = S.items.map((m) => makeItem(m.type, m.pts, m)); } }
    else if (drag.kind === 'crop') drag.b = im(p); else if (drag.kind === 'cmp') S.cmp.pos = Math.max(0.02, Math.min(0.98, p[0] / W));
  }
  schedule();
});
function finishPointer(e) {
  const p = evPoint(e); const had = pointers.delete(e.pointerId); if (!had) return; if (pointers.size < 2) pinch = null; const d = drag; drag = null; if (!d) return;
  if (d.kind === 'handle') { if (!d.active) { if (moved < 6 && Date.now() - downAt < 500) clickAt(p, e); draw(); return; } if (d.moved) { S.hist.push(d.before); if (S.hist.length > 80) S.hist.shift(); S.redo = []; updHist(); renderAll(); } return; }
  if (d.kind === 'crop') { const a = d.a, b = d.b, x = Math.max(0, Math.min(a[0], b[0])), y = Math.max(0, Math.min(a[1], b[1])), w = Math.min(S.src.w, Math.max(a[0], b[0])) - x, h = Math.min(S.src.h, Math.max(a[1], b[1])) - y; if (w > 8 && h > 8) { pushHist(); S.crop = { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) }; fitView(); renderAll(); toast('Cropped the view to ' + S.crop.w + ' × ' + S.crop.h + ' px. Measurements keep original-picture coordinates.'); } draw(); return; }
  if (d.kind === 'cmp') { draw(); return; }
  if (d.kind === 'pan' && !d.panned && moved < 6 && Date.now() - downAt < 500) clickAt(p, e);
  draw();
}
stage.addEventListener('pointerup', finishPointer); stage.addEventListener('pointercancel', (e) => { pointers.delete(e.pointerId); drag = null; pinch = null; });
stage.addEventListener('pointerleave', () => { hover = null; $('#lbCoord').hidden = true; schedule(); });
stage.addEventListener('wheel', (e) => { if (!S.src) return; e.preventDefault(); const p = evPoint(e); zoomBy(Math.exp(-e.deltaY * 0.0015), p[0], p[1]); }, { passive: false });
function clickAt(p, e) {
  const q = im(p).map((v) => Math.round(v * 100) / 100); const t = S.tool; if (t === 'pan' || t === 'crop') { if (t === 'pan') { const idx = pickItem(p); if (idx !== S.sel) { S.sel = idx; renderPanes(); } } return; }
  if (q[0] < 0 || q[1] < 0 || q[0] > S.src.w || q[1] > S.src.h) { toast('That point is outside the picture.'); return; }
  const now = Date.now(); const lp = S.pts.length ? sc(S.pts[S.pts.length - 1]) : null; const dbl = !!lp && now - lastTap < 400 && Math.hypot(lp[0] - p[0], lp[1] - p[1]) < 8; lastTap = now;
  if (t === 'track') { addTrack(q); return; }
  S.pts.push(q); const n = S.pts.length;
  if (t === 'dist' && n === 2) addItem('distance', S.pts.slice());
  else if (t === 'angle' && n === 3) addItem('angle', S.pts.slice());
  else if (t === 'box' && n === 2) { const a = S.pts[0], b = S.pts[1]; if (Math.abs(a[0] - b[0]) < 2 || Math.abs(a[1] - b[1]) < 2) { S.pts = []; toast('A rectangle needs two corners that differ in both directions.'); } else addItem('polygon', [a, [b[0], a[1]], b, [a[0], b[1]]]); }
  else if (t === 'plane' && n === 4) { startPlane(S.pts.slice()); S.pts = []; }
  else if (t === 'rect' && n === 4) { pushHist(); S.quad = S.pts.slice(); S.pts = []; setTool('pan'); renderAll(); $$('.lb-tabs button')[1].click(); }
  else if ((t === 'poly' || t === 'circle') && dbl && n >= 4) { S.pts.pop(); finishShape(); }
  updateHint(); draw();
}
function finishShape() { const t = S.tool, need3 = 3; if (S.pts.length < need3) { toast('A ' + (t === 'poly' ? 'polygon' : 'circle') + ' needs at least 3 points.'); return; } addItem(t === 'poly' ? 'polygon' : 'circle', S.pts.slice()); }
function pickItem(p) { let best = -1, bd = 14; S.items.forEach((m, i) => m.pts.forEach((q) => { const s = sc(q), d = Math.hypot(s[0] - p[0], s[1] - p[1]); if (d < bd) { bd = d; best = i; } })); return best; }
window.addEventListener('keydown', (e) => {
  if (lab.hidden) return; if (e.target.matches('input,select,textarea')) return;
  const k = e.key.toLowerCase(); if (k === 'escape') { if (!$('#lbModal').hidden) { closeModal(); return; } if (S.pts.length) { S.pts = []; updateHint(); draw(); } else if (S.tool !== 'pan') setTool('pan'); else closeLab(); e.preventDefault(); return; }
  if (k === 'enter' && (S.tool === 'poly' || S.tool === 'circle')) { finishShape(); e.preventDefault(); return; }
  if ((e.ctrlKey || e.metaKey) && k === 'z') { e.shiftKey ? $('#lbRedo').click() : $('#lbUndo').click(); e.preventDefault(); return; }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const map = { b: 'box', h: 'pan', d: 'dist', a: 'angle', p: 'poly', c: 'circle', r: 'plane', f: 'rect', x: 'crop', t: 'track' }; if (map[k]) { setTool(map[k]); e.preventDefault(); return; }
  if (k === 'delete' || k === 'backspace') { if (S.sel >= 0) { pushHist(); S.items.splice(S.sel, 1); S.sel = -1; renderAll(); e.preventDefault(); } return; }
  if (S.src && S.src.kind === 'video') { if (k === ',' || k === 'arrowleft') { stepFrame(-1); e.preventDefault(); } else if (k === '.' || k === 'arrowright') { stepFrame(1); e.preventDefault(); } else if (k === ' ') { togglePlay(); e.preventDefault(); } }
  if (k === '0') { fitView(); draw(); } else if (k === '+' || k === '=') zoomBy(1.4); else if (k === '-') zoomBy(1 / 1.4);
});

/* ------------------------------------------------------------------ video transport */
function syncTime() { markStrip(); const s = S.src; if (!s || s.kind !== 'video') { $('#lbTt').textContent = s ? 'photo' : 'no video'; return; } const t = s.v.currentTime; $('#lbScrub').value = t; $('#lbTt').textContent = t.toFixed(3) + ' s / ' + s.dur.toFixed(2) + ' s  frame ≈ ' + Math.round(t / frameDt()) + '  ' + (S.fps ? S.fps.toFixed(2) + ' fps measured' : S.fpsAssumed + ' fps assumed'); }
function seekTo(t) { return new Promise((res) => { const v = S.src.v; t = Math.max(0, Math.min(S.src.dur, t)); if (Math.abs(v.currentTime - t) < 1e-6) { res(); return; } const done = () => { v.removeEventListener('seeked', done); res(); }; v.addEventListener('seeked', done); v.currentTime = t; }); }
async function stepFrame(n) { if (!S.src || S.src.kind !== 'video') return; S.src.v.pause(); await seekTo(S.src.v.currentTime + n * frameDt()); syncTime(); draw(); renderPanes(true); }
function togglePlay() { const v = S.src && S.src.v; if (!v) return; if (v.paused) { v.play(); $('#lbPlay').textContent = '❚❚'; loop(); } else { v.pause(); $('#lbPlay').textContent = '▶'; } }
function loop() { const v = S.src && S.src.v; if (!v || v.paused || lab.hidden) { $('#lbPlay').textContent = '▶'; return; } syncTime(); draw(); requestAnimationFrame(loop); }
$('#lbPlay').onclick = togglePlay; $('#lbPrev').onclick = () => stepFrame(-1); $('#lbNext').onclick = () => stepFrame(1);
$('#lbScrub').oninput = async (e) => { if (!S.src || S.src.kind !== 'video') return; S.src.v.pause(); await seekTo(+e.target.value); syncTime(); draw(); };

/* ------------------------------------------------------------------ tracking */
const TCOL = ['#22d3ee', '#f472b6', '#a3e635', '#fbbf24'];
function currentSample(t) { if (!S.src || S.src.kind !== 'video') return t.samples[t.samples.length - 1]; const ct = S.src.v.currentTime; let best = null, bd = Infinity; t.samples.forEach((s) => { const d = Math.abs(s.t - ct); if (d < bd) { bd = d; best = s; } }); return bd <= frameDt() * 0.6 ? best : null; }
function addTrack(q) { if (!S.src || S.src.kind !== 'video') { toast('Tracking needs a video. Open an MP4 or WebM file.'); return; }
  if (S.reseed) { const t = S.reseed; S.reseed = null; t.samples = t.samples.filter((s) => s.t < S.src.v.currentTime - 1e-6); t.samples.push({ t: S.src.v.currentTime, x: q[0], y: q[1], ok: true, fb: 0, residual: 0, minEig: NaN, manual: true, seed: true }); t.lost = null; setTool('pan'); renderPanes(); draw(); toast('Position corrected by hand (marked "manual" in the export). Press Track forward to continue.'); return; }
  if (S.tracks.length >= 4) { toast('Up to 4 tracks at once. Delete one in the Track tab first.'); return; }
  const g = grabGray(); const r = X.refineCorner(g.gray, [q[0] * g.k, q[1] * g.k], 5); const p = r.ok ? [r.x / g.k, r.y / g.k] : q; const t = { name: 'P' + (S.tracks.length + 1), color: TCOL[S.tracks.length % 4], seed: p, samples: [{ t: S.src.v.currentTime, x: p[0], y: p[1], ok: true, fb: 0, residual: 0, minEig: NaN, manual: true, seed: true }], lost: null };
  S.tracks.push(t); setTool('pan'); renderPanes(); draw(); $$('.lb-tabs button')[3].click(); toast(r.ok ? 'Track point placed and snapped to the nearest corner (moved ' + r.moved.toFixed(1) + ' px).' : 'Track point placed. No sharp corner nearby, so it was not moved; tracking may fail on flat areas.'); }
function grabGray() { const s = S.src, k = Math.min(1, 960 / Math.max(s.w, s.h)), w = Math.max(8, Math.round(s.w * k)), h = Math.max(8, Math.round(s.h * k)); const c = grabGray.c || (grabGray.c = document.createElement('canvas')); c.width = w; c.height = h; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(s.v, 0, 0, w, h); const d = x.getImageData(0, 0, w, h).data; const gray = X.toGrayFull(d, w, h); return { gray, pyr: X.pyramid(gray, 4), k }; }
async function runTrack(maxFrames) {
  const s = S.src; if (!s || s.kind !== 'video' || !S.tracks.length || S.tracking) return; S.tracking = true; s.v.pause(); const live = S.tracks.filter((t) => !t.lost); if (!live.length) { S.tracking = false; toast('All tracks are lost. Re-seed a point with the Track tool.'); return; }
  const win = +($('#trWin') ? $('#trWin').value : 9) || 9; let prev = grabGray(), n = 0; const stat = $('#trStat');
  while (S.tracking && n < (maxFrames || 1e9)) {
    const t0 = s.v.currentTime; if (t0 + frameDt() > s.dur + 1e-6) break; await seekTo(t0 + frameDt()); const cur = grabGray(); n++;
    live.forEach((tr) => { if (tr.lost) return; const last = tr.samples[tr.samples.length - 1]; const r = X.track(prev.pyr, cur.pyr, [last.x * prev.k, last.y * prev.k], { win }); const sm = { t: s.v.currentTime, x: r.x / cur.k, y: r.y / cur.k, ok: r.ok, fb: r.fb, residual: r.residual, minEig: r.minEig, why: r.why, manual: false }; tr.samples.push(sm); if (!r.ok) { tr.lost = { t: sm.t, why: r.why }; } });
    prev = cur; syncTime(); draw(); if (stat) stat.innerHTML = '<span class="spin"></span>Tracked ' + n + ' frame' + (n > 1 ? 's' : '') + ' (t = ' + s.v.currentTime.toFixed(3) + ' s)';
    if (live.every((t) => t.lost)) break; await new Promise((r) => setTimeout(r, 0));
  }
  S.tracking = false; renderPanes(); draw();
}
function stopTrack() { S.tracking = false; }
function trackCSV() {
  const rows = []; const names = S.tracks.map((t) => t.name); const ts = new Set(); S.tracks.forEach((t) => t.samples.forEach((s) => ts.add(s.t.toFixed(6)))); const T = [...ts].map(Number).sort((a, b) => a - b);
  const useP = S.plane && S.plane.H; const head = ['time_s', 'frame_index_est']; S.tracks.forEach((t) => { head.push(t.name + '_x_px', t.name + '_y_px'); if (useP) head.push(t.name + '_x_' + S.plane.unit, t.name + '_y_' + S.plane.unit); head.push(t.name + '_status', t.name + '_fwd_bwd_err_px', t.name + '_residual', t.name + '_min_eig', t.name + '_manual'); }); if (S.tracks.length === 2) head.push('distance_px'); if (S.tracks.length === 2 && useP) head.push('distance_' + S.plane.unit);
  T.forEach((tt) => { const r = [tt.toFixed(6), Math.round(tt / frameDt())]; const pos = []; S.tracks.forEach((t) => { const s = t.samples.find((q) => Math.abs(q.t - tt) < 1e-6); if (!s) { r.push('', ''); if (useP) r.push('', ''); r.push('', '', '', '', ''); pos.push(null); return; } r.push(s.x.toFixed(3), s.y.toFixed(3)); if (useP) { const q = X.applyH(S.plane.H, ptsForGeometry([[s.x, s.y]])[0]); r.push(q[0].toFixed(4), q[1].toFixed(4)); } r.push(s.ok ? (s.seed ? 'seed' : 'tracked') : 'lost', fin(s.fb) ? s.fb.toFixed(3) : '', fin(s.residual) ? s.residual.toFixed(2) : '', fin(s.minEig) ? s.minEig.toFixed(2) : '', s.manual ? 'yes' : 'no'); pos.push(s); }); if (S.tracks.length === 2) { const a = pos[0], b = pos[1]; r.push(a && b ? X.dist([a.x, a.y], [b.x, b.y]).toFixed(3) : ''); if (useP) { if (a && b) { const A = X.applyH(S.plane.H, [a.x, a.y]), B = X.applyH(S.plane.H, [b.x, b.y]); r.push(X.dist(A, B).toFixed(4)); } else r.push(''); } } rows.push(r.join(',')); });
  const meta = ['# Math Canvas Measurement Lab: tracking export', '# source: ' + S.src.name, '# size_px: ' + S.src.w + 'x' + S.src.h, '# fps: ' + (S.fps ? S.fps.toFixed(3) + ' (measured from decoded frame timestamps)' : S.fpsAssumed + ' (ASSUMED; the real frame rate was not measured)'), '# tracker: pyramidal Lucas-Kanade, window ' + (+($('#trWin') ? $('#trWin').value : 9) || 9) + ' px, forward-backward check', '# real units: ' + (useP ? 'plane ' + S.plane.unit + ' (valid only for points on the calibrated flat surface; the camera must not move)' : 'none (pixels only)'), '# status lost = the algorithm rejected the point; values after a lost point are not tracked'];
  return meta.concat([head.join(',')], rows).join('\n') + '\n';
}

/* ------------------------------------------------------------------ rectify */
function doRectify() {
  if (!S.quad) return; const iss = X.checkQuad(S.quad, S.src.w, S.src.h); if (iss.some((i) => i.sev === 'error')) { toast('Fix the corner selection first: ' + iss.find((i) => i.sev === 'error').msg); return; }
  const wU = +$('#rcW').value, hU = +$('#rcH').value; let ow, oh, assumed = false; const q = ptsForGeometry(S.quad); const top = X.dist(q[0], q[1]), bot = X.dist(q[3], q[2]), le = X.dist(q[0], q[3]), ri = X.dist(q[1], q[2]);
  if (wU > 0 && hU > 0) { const asp = wU / hU; ow = Math.round(Math.max(top, bot)); oh = Math.round(ow / asp); } else { ow = Math.round(Math.max(top, bot)); oh = Math.round(Math.max(le, ri)); assumed = true; }
  const cap = 3000, k = Math.min(1, cap / Math.max(ow, oh)); ow = Math.max(8, Math.round(ow * k)); oh = Math.max(8, Math.round(oh * k)); busy('Rectifying…');
  setTimeout(() => { try { const c = document.createElement('canvas'); c.width = S.src.w; c.height = S.src.h; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(srcEl(), 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; const out = X.rectify(d, c.width, c.height, q, ow, oh); busy(''); if (!out) { toast('Could not compute the correction for these corners.'); return; } showRectified(c, out, assumed, iss, wU > 0 && hU > 0); } catch (e) { busy(''); toast('Rectification failed: ' + e.message); } }, 30);
}
function showRectified(orig, out, assumed, iss, known) {
  const m = $('#lbModal'), box = $('#lbMBox'); m.hidden = false; const maxW = Math.min(1000, box.clientWidth - 30 || 900); const k = Math.min(1, maxW / out.w); const cw = Math.round(out.w * k), ch = Math.round(out.h * k);
  box.innerHTML = '<h3>Flattened view (homography)</h3><canvas id="rcCv" width="' + cw + '" height="' + ch + '" aria-label="Before and after comparison. Drag the divider."></canvas><div class="row2" style="margin-top:8px"><button type="button" id="rcDl">Save flattened PNG</button><button type="button" id="rcX">Close</button></div>' + iss.map((i) => '<p class="' + (i.sev === 'error' ? 'err' : 'warn') + '">' + esc(i.msg) + '</p>').join('') + '<p class="fine">' + (known ? 'Output proportions come from the real size you entered (assumed correct).' : '<b>Output proportions are guessed from the picture edges</b> because no real size was given, so shapes in the flattened picture can still be stretched.') + ' The left side shows the original photo, the right the flattened plane. This corrects the perspective of one flat surface only. It does not recover the 3D scene, hidden surfaces or anything off that surface, and detail that the camera never captured is not restored.</p><p class="fine">Method: H maps the four corners to a rectangle (direct linear transform); each output pixel samples the photo at H⁻¹(x, y) with bilinear interpolation.</p>';
  const cvr = $('#rcCv'), c2 = cvr.getContext('2d'); const tmp = document.createElement('canvas'); tmp.width = out.w; tmp.height = out.h; tmp.getContext('2d').putImageData(new ImageData(out.data, out.w, out.h), 0, 0);
  const quad = S.quad; let pos = 0.5; const paint = () => { c2.clearRect(0, 0, cw, ch); c2.fillStyle = '#05080c'; c2.fillRect(0, 0, cw, ch); c2.drawImage(tmp, 0, 0, cw, ch); const px = pos * cw; c2.save(); c2.beginPath(); c2.rect(0, 0, px, ch); c2.clip(); const bb = quad.reduce((a, p) => ({ x0: Math.min(a.x0, p[0]), y0: Math.min(a.y0, p[1]), x1: Math.max(a.x1, p[0]), y1: Math.max(a.y1, p[1]) }), { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 }); const sw = bb.x1 - bb.x0, sh = bb.y1 - bb.y0, s2 = Math.min(cw / sw, ch / sh); c2.drawImage(orig, bb.x0, bb.y0, sw, sh, (cw - sw * s2) / 2, (ch - sh * s2) / 2, sw * s2, sh * s2); c2.restore(); c2.strokeStyle = '#22d3ee'; c2.lineWidth = 2; c2.beginPath(); c2.moveTo(px, 0); c2.lineTo(px, ch); c2.stroke(); c2.fillStyle = '#fff'; c2.font = '600 11px sans-serif'; c2.fillText('ORIGINAL', 8, 16); c2.fillText('FLATTENED', cw - 70, 16); };
  paint(); const mv = (e) => { const r = cvr.getBoundingClientRect(); pos = Math.max(0.02, Math.min(0.98, (e.clientX - r.left) / r.width)); paint(); }; cvr.onpointerdown = (e) => { cvr.setPointerCapture(e.pointerId); mv(e); cvr.onpointermove = mv; }; cvr.onpointerup = () => { cvr.onpointermove = null; };
  $('#rcX').onclick = closeModal; $('#rcDl').onclick = () => { tmp.toBlob((b) => saveBlob(b, (S.src.name || 'photo').replace(/\.[^.]+$/, '') + '-flattened.png'), 'image/png'); };
}
function closeModal() { $('#lbModal').hidden = true; $('#lbMBox').innerHTML = ''; }

/* ------------------------------------------------------------------ export */
function saveBlob(blob, name) { const d = window.claude && window.claude.use && (() => { try { return window.claude.use('downloads'); } catch (e) { return null; } })(); if (d && d.save) { d.save({ filename: name, data: blob }).then(() => toast('Saved ' + name), (e) => { if (!(e && e.code === 'declined')) MCU.lastExportError = 'Saving ' + name + ' failed: ' + ((e && e.message) || 'not available here'); toast(e && e.code === 'declined' ? 'Save cancelled.' : 'Could not save: ' + ((e && e.message) || 'not available here')); }); return; } const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); toast('Saved ' + name); }
function metaObj() { const s = S.src; return { app: 'Math Canvas Measurement Lab', source: s ? s.name : '', width_px: s ? s.w : '', height_px: s ? s.h : '', crop: S.crop ? JSON.stringify(S.crop) : 'none', scale_reference: S.plane ? S.plane.w + ' x ' + S.plane.h + ' ' + S.plane.unit + ' flat object (assumed correct, user supplied)' : 'none: real-world size unknown', camera_profile: S.prof ? (S.prof.name + ', RMS reprojection error ' + S.prof.cal.rms.toFixed(3) + ' px, lens correction ' + (S.undist && sameSize() ? 'applied' : 'not applied')) : 'none', click_sigma_px: S.sigma, interval: '95% from 300 Monte Carlo repeats with Gaussian click error', created: new Date().toISOString() }; }
function exportData(kind) {
  if (!S.src) { toast('Open a photo or video first.'); return; } const base = (S.src.name || 'measurements').replace(/\.[^.]+$/, '');
  if (kind === 'csv' || kind === 'json') { if (!S.items.length) { toast('No measurements yet. Use a tool on the left to measure something.'); return; } const meta = metaObj(), list = S.items; const data = kind === 'csv' ? X.exportCSV(list, meta) : X.exportJSON(list, meta); saveBlob(new Blob([data], { type: kind === 'csv' ? 'text/csv' : 'application/json' }), base + '-measurements.' + kind); }
  else if (kind === 'tracks') { if (!S.tracks.some((t) => t.samples.length > 1)) { toast('Nothing tracked yet. Place a point with the Track tool, then press Track forward.'); return; } saveBlob(new Blob([trackCSV()], { type: 'text/csv' }), base + '-tracks.csv'); }
  else if (kind === 'png') {
    const c = cropRect(), k = 1, out = document.createElement('canvas'); out.width = Math.round(c.w); out.height = Math.round(c.h); const x = out.getContext('2d');
    try { const ac = adjustedCanvas(srcEl(), 0, 0, out.width, out.height, c.x, c.y, c.w, c.h); x.drawImage(ac, 0, 0); } catch (e) { MCU.lastExportError = 'Annotated PNG: ' + e.message; toast('Could not draw the picture: ' + e.message); return; }
    const T = (p) => [p[0] - c.x, p[1] - c.y], kk = Math.max(1, Math.max(c.w, c.h) / 900); S.items.forEach((m) => { if (m.t !== undefined && S.src.kind === 'video' && Math.abs(m.t - S.src.v.currentTime) > frameDt() * 0.6) return; drawItem(x, m, T, false, kk); });
    if (S.plane) { x.strokeStyle = COL.ref; x.lineWidth = 2 * kk; x.setLineDash([6 * kk, 3 * kk]); x.beginPath(); S.plane.corners.map(T).forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.closePath(); x.stroke(); x.setLineDash([]); }
    const note = S.plane ? 'Real units from a ' + fmt(S.plane.w) + ' × ' + fmt(S.plane.h) + ' ' + S.plane.unit + ' flat reference (valid on that plane only). ± = 1 standard deviation from click error ' + S.sigma + ' px.' : 'No scale reference: values are pixels (size in real units unknown).'; x.font = '600 ' + 12 * kk + 'px sans-serif'; const w = x.measureText(note).width + 16 * kk; x.fillStyle = 'rgba(5,8,12,.85)'; x.fillRect(0, out.height - 24 * kk, Math.min(out.width, w), 24 * kk); x.fillStyle = '#d6e2ee'; x.fillText(note, 8 * kk, out.height - 8 * kk);
    out.toBlob((b) => { if (!b) { MCU.lastExportError = 'Annotated PNG could not be encoded (picture too large for this browser).'; toast('Could not encode the PNG. The picture may be too large for this browser.'); return; } saveBlob(b, base + '-annotated.png'); }, 'image/png');
  }
}
$('#lbExport').onclick = (e) => { const ex = $('#lbMenu'); if (ex) { ex.remove(); return; } const m = document.createElement('div'); m.id = 'lbMenu'; m.style.cssText = 'position:absolute;right:10px;top:50px;background:#0e141b;border:1px solid #1d2936;border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;z-index:6;min-width:230px'; m.innerHTML = '<button data-x="png">Annotated picture (PNG)</button><button data-x="csv">Measurements (CSV)</button><button data-x="json">Measurements (JSON)</button><button data-x="tracks">Tracking data with timestamps (CSV)</button>'; lab.appendChild(m); m.onclick = (ev) => { const b = ev.target.closest('button[data-x]'); if (b) { exportData(b.dataset.x); m.remove(); } }; setTimeout(() => document.addEventListener('click', function f(ev) { if (!m.contains(ev.target) && ev.target.id !== 'lbExport') { m.remove(); document.removeEventListener('click', f); } }), 0); };

/* ------------------------------------------------------------------ panes */
const tag = (k) => '<span class="k k-' + k + '" title="' + { measured: 'Read directly from pixels or the player', calculated: 'Computed exactly from measured numbers by a formula', calibrated: 'Converted with your scale reference or a camera calibration', estimated: 'Inferred with a model; has an interval', assumed: 'A default or a number you supplied', unknown: 'Cannot be determined from what is known', invalid: 'The input is not a valid shape' }[k] + '">' + k + '</span>';
function startPlane(corners) { pushHist(); S.plane = { corners, w: 29.7, h: 21, unit: 'cm' }; S.plane.H = planeH(); const q = X.checkQuad(corners, S.src.w, S.src.h); S.planeIssues = q; setTool('pan'); $$('.lb-tabs button')[1].click(); renderAll(); }
function renderAll() { renderPanes(); updateHint(); draw(); }
function renderPanes(light) { if (lab.hidden) return; renderRes(); if (!light || true) { renderCal(); renderAdj(); renderPer(); renderTrk(); renderHelp(); } }
function renderRes() {
  const p = $('#pane-res'); if (!S.src) { p.innerHTML = '<p class="fine">Open a photo or video to begin.</p>'; return; }
  const s = S.src; let h = '<h3>File</h3><table><tr><td>Name</td><td>' + esc(s.name) + '</td></tr><tr><td>Size</td><td>' + s.w + ' × ' + s.h + ' px  (' + (s.w / s.h).toFixed(4) + ')</td></tr>' + (s.size ? '<tr><td>File</td><td>' + esc(s.type || '?') + ', ' + (s.size / 1048576).toFixed(2) + ' MB</td></tr>' : '') + (s.kind === 'video' ? '<tr><td>Length</td><td>' + s.dur.toFixed(3) + ' s</td></tr><tr><td>Frame rate</td><td>' + (S.fps ? S.fps.toFixed(2) + ' fps ' + tag('measured') : S.fpsAssumed + ' fps ' + tag('assumed')) + '</td></tr>' : '');
  const m = s.meta || {}; if (m.make || m.model) h += '<tr><td>Camera</td><td>' + esc((m.make || '') + ' ' + (m.model || '')) + ' ' + tag('measured') + '</td></tr>'; if (m.focalLength) h += '<tr><td>Focal length</td><td>' + fmt(m.focalLength) + ' mm' + (m.focalLength35 ? ' (' + m.focalLength35 + ' mm equiv.)' : '') + ' ' + tag('measured') + '</td></tr>'; if (m.dateTimeOriginal) h += '<tr><td>Taken</td><td>' + esc(m.dateTimeOriginal) + '</td></tr>'; h += '<tr><td>Colour space</td><td>sRGB assumed ' + tag('assumed') + '</td></tr></table>';
  h += '<h3>Scale</h3>' + (S.plane ? '<p>Flat reference ' + fmt(S.plane.w) + ' × ' + fmt(S.plane.h) + ' ' + esc(S.plane.unit) + ' ' + tag('assumed') + '. Real units are ' + tag('calibrated') + ' and valid only on that surface.</p>' : '<p>' + tag('unknown') + ' No scale reference. Measurements are in pixels only. Use <b>Scale</b> on the left.</p>');
  if (S.prof) h += '<p>Lens profile: ' + esc(S.prof.name) + ' (RMS ' + S.prof.cal.rms.toFixed(2) + ' px) ' + (sameSize() ? (S.undist ? tag('calibrated') + ' lens distortion removed from points' : 'not applied') : '<span class="warn">different picture size from the calibration, so it is not applied</span>') + '</p>';
  const canConv = S.plane && X.LEN[S.plane.unit]; if (canConv) h += '<label for="lbDisp">Show lengths in</label><select id="lbDisp"><option value="auto">' + esc(S.plane.unit) + ' (as set)</option>' + Object.keys(X.LEN).filter((u) => u !== S.plane.unit).map((u) => '<option value="' + u + '"' + (S.disp === u ? ' selected' : '') + '>' + u + '</option>').join('') + '</select>';
  h += '<h3>Measurements (' + S.items.length + ')</h3>';
  if (!S.items.length) h += '<p class="fine">Nothing measured yet. Pick Distance, Angle, Area or Circle on the left and click the picture.</p>';
  S.items.forEach((m, i) => { const v = valueText(m); h += '<div class="card' + (i === S.sel ? ' sel' : '') + '" data-i="' + i + '"><div style="display:flex;gap:6px;align-items:center"><b>' + esc(m.id) + '</b> <span class="fine" style="margin:0">' + ({ distance: 'Distance', angle: 'Angle', polygon: 'Area', circle: 'Circle', polyline: 'Path' }[m.type] || m.type) + (m.t !== undefined ? ' @ ' + m.t.toFixed(3) + ' s' : '') + '</span><span style="flex:1"></span>' + tag(m.kind) + '<button type="button" data-del="' + i + '" aria-label="Delete ' + esc(m.id) + '" style="min-height:24px;padding:0 7px">×</button></div><div class="big">' + esc(v.main) + '</div>';
    if (m.kind === 'invalid') h += '<p class="err">' + esc(v.sub) + '</p>'; else { if (v.unc) h += '<div>95% interval ' + fmt(v.unc.lo) + ' to ' + fmt(v.unc.hi) + ' ' + tag('estimated') + '</div><div class="fine">± ' + fmt(v.unc.sd, 2) + ' (1 sd) from click error σ = ' + m.sigma + ' px</div>'; if (v.pxline && m.value !== null) h += '<div class="fine">in the picture: ' + esc(v.pxline) + ' ' + tag('measured') + '</div>'; if (m.value2) h += '<div class="fine">' + (m.type === 'polygon' ? 'perimeter' : 'area') + ': ' + fmt(m.value2.value) + ' ' + esc(m.value2.unit) + '</div>'; else if (m.px2) h += '<div class="fine">' + (m.type === 'polygon' ? 'perimeter' : 'area') + ' in pixels: ' + fmt(m.px2.value) + ' ' + esc(m.px2.unit) + '</div>';
      (m.issues || []).forEach((t) => { h += '<div class="warn">' + esc(t) + '</div>'; }); if (m.notes && m.notes.length) h += '<details><summary>Assumptions and limits</summary>' + m.notes.map((t) => '<p class="fine">' + esc(t) + '</p>').join('') + '</details>'; }
    h += '</div>'; });
  if (S.sel >= 0 && S.items[S.sel]) h += detailsHTML(S.items[S.sel]);
  if (S.items.length) h += '<div class="row2"><button type="button" id="lbCsv">Export CSV</button><button type="button" id="lbPng">Annotated PNG</button></div>';
  p.innerHTML = h; $$('.card[data-i]', p).forEach((c) => { c.onclick = (e) => { if (e.target.closest('[data-del]')) return; S.sel = +c.dataset.i; renderPanes(); draw(); }; }); $$('[data-del]', p).forEach((b) => { b.onclick = () => { pushHist(); S.items.splice(+b.dataset.del, 1); S.sel = -1; renderAll(); }; });
  bindDetails(p); const d = $('#lbDisp'); if (d) d.onchange = () => { S.disp = d.value; renderAll(); }; const c1 = $('#lbCsv'); if (c1) c1.onclick = () => exportData('csv'); const c2 = $('#lbPng'); if (c2) c2.onclick = () => exportData('png');
}
function renderCal() {
  const p = $('#pane-cal'); if (!S.src) { p.innerHTML = '<p class="fine">Open a photo or video first.</p>'; return; }
  const pl = S.plane; let h = '<h3>Scale from a flat object</h3><p class="fine">Mark the four corners of a flat object of known size (a sheet of paper, a card, a tile) lying on the same flat surface as what you want to measure. Lengths, areas and angles are then computed on that plane. A single scale for the whole picture would be wrong for things at other depths.</p><button type="button" id="calMark" ' + (S.tool === 'plane' ? 'class="on"' : '') + '>' + (pl ? 'Mark the corners again' : 'Mark four corners') + '</button>';
  if (pl) { h += '<div class="row2"><div><label for="plW">Width (top edge)</label><input type="number" id="plW" min="0" step="any" value="' + pl.w + '"></div><div><label for="plH">Height (side edge)</label><input type="number" id="plH" min="0" step="any" value="' + pl.h + '"></div></div><label for="plU">Unit</label><select id="plU">' + ['mm', 'cm', 'm', 'in', 'ft'].map((u) => '<option' + (pl.unit === u ? ' selected' : '') + '>' + u + '</option>').join('') + '</select><label for="plPre">Or pick a standard size</label><select id="plPre"><option value="">Choose…</option><option value="297,210">A4 paper, 297 × 210 mm</option><option value="420,297">A3 paper, 420 × 297 mm</option><option value="210,148">A5 paper, 210 × 148 mm</option><option value="279.4,215.9">US Letter, 279.4 × 215.9 mm</option><option value="85.6,53.98">Bank / ID card (ISO 7810 ID-1), 85.60 × 53.98 mm</option></select><p class="fine">The default is an A4 sheet, 29.7 × 21 cm. Enter your real object’s size. If it is wrong, every real-world number is wrong by the same factor.</p>'; (S.planeIssues || []).forEach((i) => { h += '<p class="' + (i.sev === 'error' ? 'err' : 'warn') + '">' + esc(i.msg) + '</p>'; }); if (pl && !pl.H) h += '<p class="err">These four corners do not define a plane mapping (degenerate). Mark them again.</p>'; h += '<button type="button" id="plClear">Remove the scale</button>'; }
  h += '<h3>Click accuracy</h3><label for="sig">Typical error when placing a point (pixels)</label><input type="number" id="sig" min="0.1" max="20" step="0.1" value="' + S.sigma + '"><p class="fine">Used for the 95% intervals. About 0.5 to 1 px when zoomed in on sharp corners, 2 px or more on soft edges or a phone screen. The intervals do not include lens distortion, a wrong reference size, or points that are not on the reference surface.</p>';
  h += '<h3>Camera calibration (checkerboard)</h3>' + (S.prof ? '<div class="card"><b>' + esc(S.prof.name) + '</b> ' + tag('calibrated') + '<br><span class="fine">fx ' + fmt(S.prof.cal.K.fx, 5) + ', fy ' + fmt(S.prof.cal.K.fy, 5) + ', cx ' + fmt(S.prof.cal.K.cx, 5) + ', cy ' + fmt(S.prof.cal.K.cy, 5) + ' px; k1 ' + fmt(S.prof.cal.dist.k1, 3) + ', k2 ' + fmt(S.prof.cal.dist.k2, 3) + '; RMS reprojection error ' + S.prof.cal.rms.toFixed(3) + ' px; ' + S.prof.cal.size.w + ' × ' + S.prof.cal.size.h + '</span><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="undistOn" ' + (S.undist ? 'checked' : '') + ' style="width:auto"> Remove lens distortion from measured points</label>' + (sameSize() ? '' : '<p class="warn">This picture is ' + S.src.w + ' × ' + S.src.h + ' but the calibration is ' + S.prof.cal.size.w + ' × ' + S.prof.cal.size.h + ', so it is NOT applied. A calibration is only valid for the same camera, lens, zoom and resolution.</p>') + '<button type="button" id="profDrop">Stop using this profile</button></div>' : '<p class="fine">No camera profile. Calibration measures the lens: focal length, optical centre and radial distortion, with a reprojection-error report.</p>');
  h += '<button type="button" id="camOpen">' + (S.prof ? 'Calibrate again' : 'Calibrate a camera…') + '</button> <button type="button" id="profLoad">Load profile…</button><input type="file" id="profFile" accept=".json,application/json" hidden>' + profilesHTML();
  if (S.quad) { const iss = X.checkQuad(S.quad, S.src.w, S.src.h); h += '<h3>Flatten perspective</h3><p class="fine">Four corners of a flat region are selected (amber outline). Drag them to adjust. Optionally enter the real size so the flattened picture has the right proportions.</p><div class="row2"><div><label for="rcW">Real width</label><input type="number" id="rcW" min="0" step="any" placeholder="optional"></div><div><label for="rcH">Real height</label><input type="number" id="rcH" min="0" step="any" placeholder="optional"></div></div>' + iss.map((i) => '<p class="' + (i.sev === 'error' ? 'err' : 'warn') + '">' + esc(i.msg) + '</p>').join('') + '<div class="row2"><button type="button" id="rcGo" class="on">Flatten</button><button type="button" id="rcClr">Remove corners</button></div>'; }
  else h += '<h3>Flatten perspective</h3><p class="fine">Use <b>Flatten</b> on the left, click four corners of a flat region, and see it straightened with a before/after slider.</p>';
  p.innerHTML = h;
  const on = (id, f) => { const e = $(id, p); if (e) e.onclick = f; };
  on('#calMark', () => setTool('plane')); on('#plClear', () => { pushHist(); S.plane = null; S.planeIssues = null; remeasure(); renderAll(); }); on('#profDrop', () => { S.prof = null; remeasure(); renderAll(); }); on('#camOpen', openCam); on('#profLoad', () => $('#profFile', p).click()); on('#rcGo', doRectify); on('#rcClr', () => { pushHist(); S.quad = null; renderAll(); });
  const chg = (id, f) => { const e = $(id, p); if (e) e.onchange = f; };
  const plChange = () => { const w = +$('#plW').value, hh = +$('#plH').value; if (!(w > 0 && hh > 0)) { toast('Width and height must both be greater than zero.'); renderCal(); return; } pushHist(); S.plane.w = w; S.plane.h = hh; S.plane.unit = $('#plU').value; remeasure(); renderAll(); };
  const pre = $('#plPre'); if (pre) pre.onchange = () => { if (!pre.value) return; const [w, hh] = pre.value.split(',').map(Number); pushHist(); S.plane.w = w; S.plane.h = hh; S.plane.unit = 'mm'; remeasure(); renderAll(); };
  chg('#plW', plChange); chg('#plH', plChange); chg('#plU', plChange); chg('#sig', () => { const v = +$('#sig').value; if (!(v > 0)) return; S.sigma = v; remeasure(); renderAll(); }); chg('#undistOn', () => { S.undist = $('#undistOn').checked; remeasure(); renderAll(); });
  const pf = $('#profFile', p); if (pf) pf.onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; f.text().then((t) => { try { const o = JSON.parse(t); if (!o.cal || !o.cal.K || !o.cal.dist) throw new Error('This is not a camera profile file.'); S.prof = o; remeasure(); renderAll(); toast('Loaded camera profile ' + o.name + '.'); } catch (er) { toast('Could not load that profile: ' + er.message); } }); };
  $$('[data-prof]', p).forEach((b) => { b.onclick = () => { const l = loadProfiles(); const o = l[+b.dataset.prof]; if (o) { S.prof = o; remeasure(); renderAll(); } }; });
}
function loadProfiles() { try { return JSON.parse(localStorage.getItem('mc-cam-profiles') || '[]'); } catch (e) { return []; } }
function saveProfile(o) { try { const l = loadProfiles(); l.unshift(o); localStorage.setItem('mc-cam-profiles', JSON.stringify(l.slice(0, 8))); return true; } catch (e) { return false; } }
function profilesHTML() { const l = loadProfiles(); if (!l.length) return ''; return '<h3>Saved profiles on this device</h3>' + l.map((o, i) => '<div class="card"><b>' + esc(o.name) + '</b><div class="fine">' + esc(o.date || '') + ', ' + o.cal.size.w + ' × ' + o.cal.size.h + ', RMS ' + o.cal.rms.toFixed(2) + ' px</div><button type="button" data-prof="' + i + '">Use</button></div>').join(''); }
function renderAdj() {
  const p = $('#pane-adj'); if (!S.src) { p.innerHTML = '<p class="fine">Open a photo or video first.</p>'; return; } const a = S.adjust;
  const sl = (id, lab2, min, max, step, v, unit) => '<label for="' + id + '">' + lab2 + ' <output id="o-' + id + '" style="float:right;color:#9fe9f7">' + v + unit + '</output></label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + v + '">';
  p.innerHTML = '<h3>Display adjustments</h3>' + sl('adEv', 'Exposure (stops)', -3, 3, 0.05, a.ev, ' EV') + sl('adC', 'Contrast', -80, 80, 1, a.c, '') + sl('adB', 'Brightness', -80, 80, 1, a.b, '') + sl('adS', 'Saturation', -100, 100, 1, a.sat || 0, '') + sl('adSh', 'Sharpness', 0, 100, 1, a.sh || 0, '') + '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="adCmp" style="width:auto" ' + (S.cmp.on ? 'checked' : '') + '> Before / after slider</label><button type="button" id="adReset">Reset adjustments</button><p class="fine">These change how the picture looks on screen and in the annotated export. They do <b>not</b> change any measurement, and they cannot recover detail the camera never captured: brightening a dark photo raises noise along with the signal. Exposure is applied in linear light.</p><h3>Crop</h3><p class="fine">' + (S.crop ? 'Cropped to ' + S.crop.w + ' × ' + S.crop.h + ' px starting at (' + S.crop.x + ', ' + S.crop.y + '). Measurements keep original-picture coordinates.' : 'Use the Crop tool on the left and drag a rectangle.') + '</p>' + (S.crop ? '<button type="button" id="cropClr">Remove crop</button>' : '');
  const bindS = (id, key) => { const e = $(id, p); if (!e) return; e.oninput = () => { S.adjust[key] = +e.value; $('#o-' + e.id).textContent = e.value + (key === 'ev' ? ' EV' : ''); proc = null; schedule(); }; e.onchange = () => { pushHist(); }; };
  bindS('#adEv', 'ev'); bindS('#adC', 'c'); bindS('#adB', 'b'); bindS('#adS', 'sat'); bindS('#adSh', 'sh'); const cm = $('#adCmp', p); cm.onchange = () => { S.cmp.on = cm.checked; draw(); }; $('#adReset', p).onclick = () => { pushHist(); S.adjust = { ev: 0, c: 0, b: 0, sat: 0, sh: 0 }; proc = null; renderAll(); }; const cc = $('#cropClr', p); if (cc) cc.onclick = () => { pushHist(); S.crop = null; fitView(); renderAll(); };
}
function renderTrk() {
  const p = $('#pane-trk'); if (!S.src) { p.innerHTML = '<p class="fine">Open a video first.</p>'; return; } if (S.src.kind !== 'video') { p.innerHTML = '<h3>Tracking</h3><p class="fine">Open a video (MP4 or WebM) to track points through its frames.</p>'; return; }
  let h = '<h3>Point tracking</h3><p class="fine">Pyramidal Lucas-Kanade optical flow follows a textured point from frame to frame. Every frame is checked by tracking backwards; if that does not return to the start, the point is declared lost.</p><label for="trWin">Window half-size (px)</label><input type="number" id="trWin" min="3" max="30" value="' + (+($('#trWin') ? $('#trWin').value : 9) || 9) + '"><label for="trFps">Frame rate used for stepping</label><input type="number" id="trFps" min="1" max="240" step="0.001" value="' + (S.fps || S.fpsAssumed).toFixed(3) + '"><p class="fine">' + (S.fps ? 'Measured from decoded frame times.' : '<b>Assumed</b>: this browser could not measure it. Enter the real frame rate if you know it.') + '</p><div class="row2"><button type="button" id="trGo" class="on" ' + (S.tracks.length && !S.tracking ? '' : 'disabled') + '>Track forward</button><button type="button" id="trStop" ' + (S.tracking ? '' : 'disabled') + '>Stop</button></div><div class="row2" style="margin-top:6px"><button type="button" id="trOne" ' + (S.tracks.length && !S.tracking ? '' : 'disabled') + '>Step one frame</button><button type="button" id="trAdd">Add a point…</button></div><div id="trStat" class="fine"></div>';
  if (!S.tracks.length) h += '<p class="fine">No points yet. Choose the Track tool on the left, then click a corner or textured spot on the current frame.</p>';
  S.tracks.forEach((t, i) => { const ok = t.samples.filter((s) => s.ok).length, cur = currentSample(t); h += '<div class="card"><div style="display:flex;gap:6px;align-items:center"><b style="color:' + t.color + '">' + esc(t.name) + '</b><span style="flex:1"></span>' + (t.lost ? '<span class="k k-invalid">lost</span>' : '<span class="k k-measured">tracking</span>') + '<button type="button" data-tdel="' + i + '" aria-label="Delete ' + esc(t.name) + '" style="min-height:24px;padding:0 7px">×</button></div><div class="fine">' + ok + ' good of ' + t.samples.length + ' frames, from t = ' + t.samples[0].t.toFixed(3) + ' s</div>';
    if (cur) { h += '<table><tr><td>This frame</td><td>' + (cur.ok ? (cur.seed ? 'seed (you placed it)' : 'tracked') : 'LOST') + '</td></tr><tr><td>x, y (px)</td><td>' + cur.x.toFixed(2) + ', ' + cur.y.toFixed(2) + '</td></tr>' + (fin(cur.fb) && !cur.seed ? '<tr><td>fwd–bwd error</td><td>' + cur.fb.toFixed(3) + ' px</td></tr><tr><td>residual</td><td>' + cur.residual.toFixed(2) + ' gray levels</td></tr><tr><td>texture (min eig.)</td><td>' + fmt(cur.minEig, 3) + '</td></tr>' : '') + (S.plane && S.plane.H ? '<tr><td>on the plane</td><td>' + (() => { const q = X.applyH(S.plane.H, ptsForGeometry([[cur.x, cur.y]])[0]); return fmt(q[0]) + ', ' + fmt(q[1]) + ' ' + S.plane.unit; })() + '</td></tr>' : '') + '</table>'; }
    if (t.lost) h += '<p class="err">Lost at t = ' + t.lost.t.toFixed(3) + ' s. ' + esc(t.lost.why || '') + '</p><button type="button" data-treseed="' + i + '">Fix: click the correct position on the current frame</button>'; h += '</div>'; });
  if (S.tracks.length) { h += '<button type="button" id="trCsv">Export tracking data (CSV)</button><p class="fine">The tracker’s confidence is shown as its raw outputs (forward–backward error, residual, texture strength) with documented thresholds, not as an invented percentage. Positions are 2D in the picture. A single video does not give 3D motion unless the camera and scene are known. With a scale reference, positions are given on that flat plane and are valid only if the camera did not move.</p>'; }
  p.innerHTML = h; const on = (id, f) => { const e = $(id, p); if (e) e.onclick = f; };
  on('#trGo', () => runTrack()); on('#trStop', stopTrack); on('#trOne', () => runTrack(1)); on('#trAdd', () => setTool('track')); on('#trCsv', () => exportData('tracks'));
  const fp = $('#trFps', p); if (fp) fp.onchange = () => { const v = +fp.value; if (v > 0) { S.fps = v; S.fpsMeasured = false; renderAll(); syncTime(); } };
  $$('[data-tdel]', p).forEach((b) => { b.onclick = () => { S.tracks.splice(+b.dataset.tdel, 1); renderAll(); }; });
  $$('[data-treseed]', p).forEach((b) => { b.onclick = () => { const t = S.tracks[+b.dataset.treseed]; S.reseed = t; setTool('track'); const orig = addTrack; toast('Click the true position of ' + t.name + ' on this frame.'); }; });
}
function renderHelp() {
  $('#pane-help').innerHTML = '<h3>How to read the labels</h3><p>' + tag('measured') + ' read directly from pixels or the player.</p><p>' + tag('calculated') + ' an exact formula applied to measured numbers (such as an angle in the picture).</p><p>' + tag('calibrated') + ' converted into real units using your scale reference or a camera calibration.</p><p>' + tag('estimated') + ' inferred with a model, and shown with an interval.</p><p>' + tag('assumed') + ' a default or a number you typed.</p><p>' + tag('unknown') + ' cannot be known from what has been provided, for example centimetres from a photo with no reference.</p><p>' + tag('invalid') + ' the input is not a valid shape, such as a zero-length line.</p>'
    + '<h3>Getting accurate real-world numbers</h3><ol style="padding-left:18px"><li>Put a flat object of known size (paper, card, tile) on the same flat surface as the thing you measure.</li><li>Photograph straight on if you can. The camera must not zoom between the reference and the measurement.</li><li>Mark its four corners with <b>Scale</b>, enter its true size.</li><li>Measure only things that lie on that same surface. Objects raised above it will read wrong.</li><li>Zoom in before placing points, and set the click accuracy honestly.</li></ol>'
    + '<h3>Capturing checkerboard photos for lens calibration</h3><ol style="padding-left:18px"><li>Print a checkerboard (for example 10 × 7 squares, giving 9 × 6 inner corners) and glue it to something perfectly flat.</li><li>Measure one square with a ruler and use that number.</li><li>Take 10 to 20 photos with the same camera, lens, zoom and resolution you will measure with. Do not use auto-zoom or digital stabilisation.</li><li>Tilt the board about 20 to 45 degrees in different directions, and place it in the centre, the corners and the edges of the frame.</li><li>Keep it sharp, evenly lit, without glare, and fully visible.</li></ol>'
    + '<h3>What this does not do</h3><p class="fine">It does not recover 3D scenes, hidden surfaces, or real sizes from a single photo without a reference. Brightness and contrast do not add detail. Flattening corrects one plane only. There is no cloud processing: everything stays on your device.</p><h3>Keys</h3><p class="fine">H move, D distance, A angle, P area, C circle, R scale, F flatten, X crop, T track, Enter finish shape, Esc cancel, Delete remove, Ctrl+Z undo, , and . step frames, 0 fit, + and − zoom.</p>';
}

/* ------------------------------------------------------------------ measurement details (Value / Uncertainty / Info) */
let detTab = 'v';
function detailsHTML(m) {
  const v = valueText(m), typ = { distance: 'Distance', angle: 'Angle', polygon: 'Area', circle: 'Circle', polyline: 'Path' }[m.type] || m.type;
  let h = '<h3>Measurement details: ' + esc(m.id) + '</h3><div class="tabs2" id="lbDetT"><button data-dt="v" aria-selected="' + (detTab === 'v') + '">Value</button><button data-dt="u" aria-selected="' + (detTab === 'u') + '">Uncertainty</button><button data-dt="i" aria-selected="' + (detTab === 'i') + '">Info</button></div>';
  if (m.kind === 'invalid') return h + '<p class="err">' + esc(v.sub) + '</p>';
  const isPx = m.value === null || m.value === undefined;
  if (detTab === 'v') h += '<table><tr><td>' + typ + '</td><td><b>' + esc(v.main) + '</b></td></tr>' + (!isPx && m.px ? '<tr><td>In the picture</td><td>' + fmt(m.px.value) + ' ' + esc(m.px.unit) + '</td></tr>' : '') + (S.plane ? '<tr><td>Scale used</td><td>flat reference ' + fmt(S.plane.w) + ' × ' + fmt(S.plane.h) + ' ' + esc(S.plane.unit) + '</td></tr>' : '<tr><td>Scale used</td><td>none (pixels only)</td></tr>') + '<tr><td>Result</td><td>' + tag(m.kind) + '</td></tr></table>';
  else if (detTab === 'u') h += v.unc ? '<table><tr><td>Uncertainty (1 sd)</td><td>± ' + fmt(v.unc.sd, 2) + (v.v ? ' (' + (v.unc.sd / Math.abs(v.v) * 100).toFixed(2) + '%)' : '') + '</td></tr><tr><td>95% interval</td><td>' + fmt(v.unc.lo) + ' … ' + fmt(v.unc.hi) + '</td></tr><tr><td>Click error σ</td><td>' + m.sigma + ' px ' + tag('assumed') + '</td></tr></table><p class="fine">Found by repeating the measurement many times with every clicked point nudged by random error of σ pixels (Monte Carlo). It covers clicking error only, not lens distortion or a wrong reference size.</p>' : '<p class="fine">No uncertainty is shown for this value.</p>';
  else h += '<p class="fine">' + (m.notes && m.notes.length ? m.notes.map(esc).join('</p><p class="fine">') : 'Computed from the picture coordinates of ' + m.pts.length + ' clicked points.') + '</p>' + (m.issues && m.issues.length ? m.issues.map((t) => '<div class="warn">' + esc(t) + '</div>').join('') : '');
  if (m.type === 'distance' && !isPx && X.LEN[m.unit] && m.value > 0) h += '<button type="button" id="lbTo3D" style="width:100%;margin-top:8px" title="Open the 3D Lab with a sphere whose diameter is this measured distance">Make a 3D sphere from this distance</button>';
  return h;
}
function sendTo3D(m) { if (!window.M3LAB || !(m.value > 0) || !X.LEN[m.unit]) return; const metres = m.value * X.LEN[m.unit], u = m.unc ? m.unc.sd * X.LEN[m.unit] : 0; closeLab(); window.M3LAB.useMeasured(metres, u, m.id); }
function bindDetails(p) { const sb = $('#lbTo3D', p); if (sb) sb.onclick = () => sendTo3D(S.items[S.sel]);  $$('#lbDetT button', p).forEach((b) => { b.onclick = () => { detTab = b.dataset.dt; renderRes(); }; }); }

/* ------------------------------------------------------------------ perspective analysis (vanishing points from detected straight lines) */
function renderPer() {
  const p = $('#pane-per'); if (!p) return; if (!S.src) { p.innerHTML = '<p class="fine">Open a photo or video first.</p>'; return; }
  let h = '<h3>Perspective analysis</h3><p class="fine">Detects straight edges in the current picture and finds where parallel lines in the real scene appear to meet (vanishing points). It works best on boxy scenes: rooms, buildings, tables.</p><button type="button" id="perGo" class="on">' + (S.per ? 'Analyze again' : 'Analyze perspective') + '</button>';
  if (S.perBusy) h += ' <span class="fine"><span class="spin"></span>analyzing…</span>';
  const r = S.per;
  if (r) {
    h += '<canvas class="perv" id="perCv" width="640" height="' + Math.round(640 * r.h / r.w) + '" aria-label="Detected lines and vanishing points"></canvas><table><tr><td>Straight lines found</td><td>' + r.lines.length + '</td></tr><tr><td>Edge pixels</td><td>' + r.edges + '</td></tr></table><h3>Vanishing points</h3>';
    if (!r.vps.length) h += '<p class="fine">None found. ' + tag('unknown') + '</p>';
    r.vps.forEach((q, i) => { const pct = q.of ? Math.round(q.inliers / q.of * 100) : 0; h += '<div class="card"><b style="color:' + PCOL[i % 3] + '">VP' + (i + 1) + '</b> ' + (q.finite ? '' : '<span class="k k-estimated">at infinity: lines nearly parallel</span>') + '<table><tr><td>Position (px)</td><td>' + (q.finite ? fmt(q.x, 5) + ', ' + fmt(q.y, 5) : 'beyond the picture') + '</td></tr><tr><td>Supporting lines</td><td>' + q.inliers + ' of ' + q.of + ' (' + pct + '%)</td></tr><tr><td>Fit residual</td><td>' + (q.rms * 1000).toFixed(1) + ' / 1000</td></tr></table></div>'; });
    h += '<p class="fine">“Supporting lines” is the share of detected lines that agree with that point. It is a consistency score, not a probability.</p>';
    if (r.focal) h += '<table><tr><td>Focal length (35 mm equiv.)</td><td>≈ ' + fmt(r.focal.mm35, 3) + ' mm ' + tag('estimated') + '</td></tr>' + (r.exifFocal ? '<tr><td>From file metadata</td><td>' + fmt(r.exifFocal.px / Math.max(S.src.w, S.src.h) * 36, 3) + ' mm ' + tag('measured') + '</td></tr>' : '') + '</table>';
    h += '<details><summary>Show details</summary>' + (r.issues || []).map((i) => '<p class="' + (i.sev === 'warn' ? 'warn' : 'fine') + '">' + esc(i.msg) + ' <i>' + esc(i.fix || '') + '</i></p>').join('') + '</details>';
  }
  p.innerHTML = h; const go = $('#perGo', p); if (go) go.onclick = runPer; if (r) drawPer(r);
}
const PCOL = ['#f87171', '#4ade80', '#60a5fa'];
function runPer() {
  if (!S.src || S.perBusy) return; S.perBusy = true; renderPer();
  setTimeout(() => {
    try {
      const el = srcEl(), k = Math.min(1, 960 / Math.max(S.src.w, S.src.h)), cw = Math.max(8, Math.round(S.src.w * k)), ch = Math.max(8, Math.round(S.src.h * k)), c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(el, 0, 0, cw, ch);
      const rep = G.analyze(x.getImageData(0, 0, cw, ch).data, cw, ch, S.src.meta || {}), sc2 = S.src.w / cw;
      const thumb = document.createElement('canvas'); thumb.width = 640; thumb.height = Math.round(640 * S.src.h / S.src.w); thumb.getContext('2d').drawImage(c, 0, 0, thumb.width, thumb.height);
      S.per = { w: S.src.w, h: S.src.h, gW: rep.W, gH: rep.H, lines: rep.lines, edges: rep.edges, issues: rep.issues, thumb, focal: rep.focal ? { mm35: rep.focal.mm35 } : null, exifFocal: rep.exifFocal ? { px: rep.exifFocal.px * (S.src.w / S.src.w) } : null, vps: rep.vpsPx.map((q) => ({ x: q.x * sc2, y: q.y * sc2, finite: q.finite && isFinite(q.x) && isFinite(q.y), inliers: q.inliers, of: q.of, rms: q.rms })) };
    } catch (e) { toast('Perspective analysis failed: ' + e.message); }
    S.perBusy = false; renderPer();
  }, 30);
}
function drawPer(r) {
  const cvp = $('#perCv'); if (!cvp) return; const c = cvp.getContext('2d'), W2 = cvp.width, H2 = cvp.height; c.drawImage(r.thumb, 0, 0); c.fillStyle = 'rgba(5,8,12,.35)'; c.fillRect(0, 0, W2, H2);
  const k = W2 / r.gW, cx = W2 / 2, cy = H2 / 2; c.lineWidth = 1; c.strokeStyle = 'rgba(34,211,238,.55)';
  r.lines.slice(0, 60).forEach((l) => { const ct = Math.cos(l.theta), st2 = Math.sin(l.theta), rho = l.rho * k, d = Math.max(W2, H2) * 2; c.beginPath(); c.moveTo(cx + ct * rho - st2 * d, cy + st2 * rho + ct * d); c.lineTo(cx + ct * rho + st2 * d, cy + st2 * rho - ct * d); c.stroke(); });
  r.vps.forEach((q, i) => { if (!q.finite) return; const x = q.x / r.w * W2, y = q.y / r.h * H2; if (x < -W2 || x > 2 * W2 || y < -H2 || y > 2 * H2) return; const xx = Math.max(8, Math.min(W2 - 8, x)), yy = Math.max(8, Math.min(H2 - 8, y)); c.fillStyle = PCOL[i % 3]; c.beginPath(); c.arc(xx, yy, 7, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = '600 11px sans-serif'; c.fillText('VP' + (i + 1) + (xx !== x || yy !== y ? ' →' : ''), xx + 10, yy + 4); });
}

/* ------------------------------------------------------------------ video frame strip */
let stripTok = 0;
function buildStrip() {
  const el = $('#lbStrip'); el.innerHTML = ''; el.classList.remove('on'); const s = S.src; if (!s || s.kind !== 'video' || !s.url) return;
  el.classList.add('on'); const tok = ++stripTok, N = 14, v2 = document.createElement('video'); v2.muted = true; v2.preload = 'auto'; v2.src = s.url;
  const cvs = []; for (let i = 0; i < N; i++) { const c = document.createElement('canvas'); c.width = 96; c.height = Math.max(24, Math.round(96 * s.h / s.w)); c.dataset.t = String(s.dur * (i + 0.5) / N); c.title = (+c.dataset.t).toFixed(2) + ' s'; c.onclick = async () => { if (!S.src || S.src !== s) return; s.v.pause(); await seekTo(+c.dataset.t); syncTime(); draw(); }; el.appendChild(c); cvs.push(c); }
  const seekOnce = (t) => new Promise((res) => { let done = false; const f = () => { if (done) return; done = true; v2.removeEventListener('seeked', f); res(); }; v2.addEventListener('seeked', f); v2.currentTime = t; setTimeout(f, 1500); });
  (async () => { try { if (v2.readyState < 2) await new Promise((r) => { v2.onloadeddata = r; v2.onerror = r; setTimeout(r, 4000); }); for (let i = 0; i < N; i++) { if (tok !== stripTok || S.src !== s) break; await seekOnce(+cvs[i].dataset.t); try { cvs[i].getContext('2d').drawImage(v2, 0, 0, cvs[i].width, cvs[i].height); } catch (e) { /* skip */ } } } catch (e) { /* strip is optional */ } v2.removeAttribute('src'); v2.load(); })();
}
function markStrip() { const el = $('#lbStrip'); if (!el.classList.contains('on') || !S.src || S.src.kind !== 'video') return; const t = S.src.v.currentTime; let best = null, bd = 1e9; Array.from(el.children).forEach((c) => { const d = Math.abs(+c.dataset.t - t); if (d < bd) { bd = d; best = c; } c.classList.remove('cur'); }); if (best) best.classList.add('cur'); }

/* ------------------------------------------------------------------ workspace tabs (Photo Lab / Video Lab / Calibration / 3D Lab) */
function setHub(h, quiet) {
  if (h === '3d' || h === 'design' || h === 'const') { if (window.HUB) window.HUB.go(h); else closeLab(); return; }
  S.hub = h; $$('#lbHub button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.hub === h))); $('#lbFile').accept = h === 'video' ? 'video/*' : h === 'photo' ? 'image/*' : 'image/*,video/*';
  const pane = { photo: 'res', video: 'trk', calib: 'cal' }[h]; const tb = $$('.lb-tabs button').find((b) => b.dataset.pane === pane); if (tb) tb.click();
  if (!quiet && h === 'video' && S.src && S.src.kind !== 'video') toast('Open a video file to use the Video Lab. Photos can be measured in the Photo Lab.');
}
$$('#lbHub button').forEach((b) => { b.onclick = () => setHub(b.dataset.hub); });
$$('.lb-tabs button').forEach((b) => { b.onclick = () => { $$('.lb-tabs button').forEach((x) => x.setAttribute('aria-selected', String(x === b))); $$('.lb-pane').forEach((x) => x.classList.toggle('on', x.id === 'pane-' + b.dataset.pane)); }; });

/* ------------------------------------------------------------------ camera calibration dialog */
const CV = { cols: 9, rows: 6, sq: 25, views: [], cur: -1, busyMsg: '' };
function openCam() { const m = $('#lbModal'), box = $('#lbMBox'); m.hidden = false; renderCam(); }
function renderCam() {
  const box = $('#lbMBox'), V = CV.views, cur = V[CV.cur]; const res = S.camRes;
  box.innerHTML = '<h3>Camera calibration</h3><div class="row2"><div><label for="cvC">Inner corners across</label><input type="number" id="cvC" min="3" max="30" value="' + CV.cols + '"></div><div><label for="cvR">Inner corners down</label><input type="number" id="cvR" min="3" max="30" value="' + CV.rows + '"></div></div><label for="cvS">Size of one square (mm)</label><input type="number" id="cvS" min="0.1" step="any" value="' + CV.sq + '"><p class="fine">Inner corners are where four squares meet. A board with 10 × 7 squares has 9 × 6 inner corners. Capture advice is in the Help tab.</p><div class="row2"><button type="button" id="cvAdd" class="on">Add checkerboard photos…</button><button type="button" id="cvClose">Close</button></div><input type="file" id="cvFile" accept="image/*" multiple hidden>'
    + (V.length ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">' + V.map((v, i) => '<button type="button" data-cv="' + i + '" ' + (i === CV.cur ? 'class="on"' : '') + ' style="min-width:96px;text-align:left">#' + (i + 1) + '<br><span class="fine" style="margin:0">' + (v.corners ? (v.err !== undefined ? v.err.toFixed(2) + ' px RMS' : 'corners found') : (v.quad ? v.quad.length + ' of 4 marked' : 'mark corners')) + '</span></button>').join('') + '</div>' : '<p class="fine">Add at least 3 photos (10 to 20 is better).</p>')
    + (cur ? '<p class="fine">Photo #' + (CV.cur + 1) + ' ' + cur.w + ' × ' + cur.h + ': click the four <b>outer inner corners</b> of the board: first corner of the top row, last corner of the top row, last corner of the bottom row, first corner of the bottom row, in that order. The rest of the grid is predicted and snapped to the real corners.</p><canvas id="cvCv"></canvas><div class="row2"><button type="button" id="cvRedo">Re-mark this photo</button><button type="button" id="cvDel">Remove this photo</button></div>' : '')
    + '<div class="row2" style="margin-top:8px"><button type="button" id="cvGo" class="on" ' + (V.filter((v) => v.corners).length >= 3 ? '' : 'disabled') + '>Calibrate (' + V.filter((v) => v.corners).length + ' usable)</button><span class="fine" id="cvMsg"></span></div>' + camReport(res);
  const on = (id, f) => { const e = $(id, box); if (e) e.onclick = f; }; on('#cvClose', closeModal); on('#cvAdd', () => $('#cvFile', box).click());
  $('#cvC', box).onchange = (e) => { CV.cols = Math.max(3, +e.target.value | 0); CV.views.forEach((v) => { v.corners = null; v.err = undefined; if (v.quad && v.quad.length === 4) detectGrid(v); }); renderCam(); }; $('#cvR', box).onchange = (e) => { CV.rows = Math.max(3, +e.target.value | 0); CV.views.forEach((v) => { v.corners = null; v.err = undefined; if (v.quad && v.quad.length === 4) detectGrid(v); }); renderCam(); }; $('#cvS', box).onchange = (e) => { CV.sq = +e.target.value > 0 ? +e.target.value : CV.sq; };
  $('#cvFile', box).onchange = async (e) => { const fs = [...e.target.files]; e.target.value = ''; for (const f of fs) { try { const im2 = await createImageBitmap(f); const c = document.createElement('canvas'); c.width = im2.width; c.height = im2.height; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im2, 0, 0); const d = x.getImageData(0, 0, c.width, c.height); CV.views.push({ name: f.name, w: c.width, h: c.height, canvas: c, gray: X.toGrayFull(d.data, c.width, c.height), quad: [], corners: null }); } catch (er) { toast('Could not read ' + f.name + '.'); } } if (CV.cur < 0 && CV.views.length) CV.cur = 0; renderCam(); };
  $$('[data-cv]', box).forEach((b) => { b.onclick = () => { CV.cur = +b.dataset.cv; renderCam(); }; });
  on('#cvRedo', () => { cur.quad = []; cur.corners = null; cur.err = undefined; renderCam(); }); on('#cvDel', () => { V.splice(CV.cur, 1); CV.cur = V.length ? 0 : -1; S.camRes = null; renderCam(); });
  const cvc = $('#cvCv', box); if (cvc) paintCam(cvc, cur);
  on('#cvGo', runCalib); on('#cvSave', () => { const o = S.camProfile; if (!o) return; const nm = ($('#cvName', box) || {}).value || o.name; o.name = nm; saveProfile(o) ? toast('Profile saved on this device.') : toast('Could not save in this browser. Use Export instead.'); S.prof = o; remeasure(); renderPanes(); }); on('#cvExp', () => { const o = S.camProfile; if (o) saveBlob(new Blob([JSON.stringify(o, null, 2)], { type: 'application/json' }), (o.name || 'camera-profile').replace(/[^\w-]+/g, '_') + '.json'); }); on('#cvUse', () => { if (S.camProfile) { S.prof = S.camProfile; remeasure(); renderAll(); closeModal(); toast('Camera profile is now active.'); } });
}
function paintCam(c, v) {
  const maxW = Math.min(900, $('#lbMBox').clientWidth - 30 || 700), k = Math.min(1, maxW / v.w); c.width = Math.round(v.w * k); c.height = Math.round(v.h * k); const x = c.getContext('2d'); x.drawImage(v.canvas, 0, 0, c.width, c.height);
  (v.quad || []).forEach((p, i) => { x.strokeStyle = '#fbbf24'; x.lineWidth = 2; x.beginPath(); x.arc(p[0] * k, p[1] * k, 6, 0, 7); x.stroke(); x.fillStyle = '#fbbf24'; x.fillText(String(i + 1), p[0] * k + 8, p[1] * k - 6); });
  if (v.corners) { x.fillStyle = '#22d3ee'; v.corners.forEach((p, i) => { x.beginPath(); x.arc(p[0] * k, p[1] * k, 3, 0, 7); x.fill(); }); x.strokeStyle = 'rgba(34,211,238,.6)'; x.lineWidth = 1; x.beginPath(); v.corners.forEach((p, i) => { (i % CV.cols === 0) ? x.moveTo(p[0] * k, p[1] * k) : x.lineTo(p[0] * k, p[1] * k); }); x.stroke(); }
  c.style.cursor = 'crosshair'; c.onclick = (e) => { if (v.quad.length >= 4) return; const r = c.getBoundingClientRect(); v.quad.push([(e.clientX - r.left) / r.width * v.w, (e.clientY - r.top) / r.height * v.h]); if (v.quad.length === 4) detectGrid(v); renderCam(); };
}
function detectGrid(v) {
  const pred = X.predictGrid(v.quad, CV.cols, CV.rows); if (!pred) { v.corners = null; return; } const out = []; let maxMove = 0, bad = 0; const spacing = Math.hypot(v.quad[1][0] - v.quad[0][0], v.quad[1][1] - v.quad[0][1]) / Math.max(1, CV.cols - 1), win = Math.max(3, Math.min(12, Math.round(spacing * 0.3)));
  pred.forEach((p) => { const r = X.refineCorner(v.gray, p, win); if (r.ok && r.moved < spacing * 0.45) { out.push([r.x, r.y]); maxMove = Math.max(maxMove, r.moved); } else { out.push(p); bad++; } }); v.corners = out; v.refineBad = bad; v.maxMove = maxMove;
}
function runCalib() {
  const used = CV.views.filter((v) => v.corners); if (used.length < 3) return; const size = { w: used[0].w, h: used[0].h }; if (used.some((v) => v.w !== size.w || v.h !== size.h)) { toast('All calibration photos must have the same size (same camera and resolution).'); return; }
  const obj = []; for (let j = 0; j < CV.rows; j++) for (let i = 0; i < CV.cols; i++) obj.push([i * CV.sq, j * CV.sq]); $('#cvMsg').innerHTML = '<span class="spin"></span>Calibrating…';
  setTimeout(() => { let r; try { r = X.calibrate(used.map((v) => ({ img: v.corners, obj })), size); } catch (e) { r = { ok: false, reason: 'Internal error: ' + e.message }; } if (r.ok) { r.perView.forEach((e, i) => { used[i].err = e; }); const name = 'Camera ' + new Date().toISOString().slice(0, 10) + ' ' + size.w + 'x' + size.h; S.camProfile = { name, date: new Date().toLocaleString(), board: { cols: CV.cols, rows: CV.rows, square_mm: CV.sq }, cal: r, views: used.length, method: 'Zhang closed form, then Levenberg-Marquardt on reprojection error, radial distortion k1 k2' }; S.camRes = { ok: true, r, bad: used.map((v) => v.refineBad) }; } else { S.camProfile = null; S.camRes = { ok: false, reason: r.reason }; } renderCam(); }, 40);
}
function camReport(res) {
  if (!res) return ''; if (!res.ok) return '<div class="card"><p class="err"><b>Calibration failed.</b> ' + esc(res.reason) + '</p></div>'; const r = res.r, sd = r.sd || {}; const pm = (k, d) => (sd[k] ? ' ± ' + fmt(sd[k], 2) : '');
  return '<div class="card"><b>Result</b> ' + tag('calibrated') + '<table><tr><td>Focal length fx</td><td>' + fmt(r.K.fx, 6) + pm('fx') + ' px</td></tr><tr><td>Focal length fy</td><td>' + fmt(r.K.fy, 6) + pm('fy') + ' px</td></tr><tr><td>Optical centre cx, cy</td><td>' + fmt(r.K.cx, 6) + pm('cx') + ', ' + fmt(r.K.cy, 6) + pm('cy') + ' px</td></tr><tr><td>Skew</td><td>' + fmt(r.K.s, 3) + ' px</td></tr><tr><td>Radial distortion k1, k2</td><td>' + fmt(r.dist.k1, 4) + pm('k1') + ', ' + fmt(r.dist.k2, 4) + pm('k2') + '</td></tr><tr><td>Image size</td><td>' + r.size.w + ' × ' + r.size.h + '</td></tr><tr><td><b>RMS reprojection error</b></td><td><b>' + r.rms.toFixed(3) + ' px</b> over ' + r.points + ' corners in ' + r.views + ' photos</td></tr><tr><td>Per photo</td><td>' + r.perView.map((e, i) => '#' + (i + 1) + ': ' + e.toFixed(2)).join(', ') + ' px</td></tr><tr><td>Solver</td><td>' + r.iterations + ' iterations; stopped: ' + esc(r.converged) + '; cost ' + r.costStart.toFixed(3) + ' → ' + r.rms.toFixed(3) + ' px RMS</td></tr></table><p class="fine">± values are 1 standard error from the fit covariance (Gauss-Newton), valid if the residuals are random noise. Model: pinhole + radial k1, k2; no tangential distortion. Closed-form start: fx ' + fmt(r.closed.fx, 5) + ', fy ' + fmt(r.closed.fy, 5) + '.</p>' + r.warnings.map((w) => '<p class="warn">' + esc(w) + '</p>').join('') + (res.bad.some((b) => b > 0) ? '<p class="warn">In some photos, ' + res.bad.reduce((a, b) => a + b, 0) + ' corners could not be snapped to a sharp corner and kept their predicted position. Check those photos.</p>' : '') + '<label for="cvName">Profile name</label><input type="text" id="cvName" value="' + esc(S.camProfile.name) + '"><div class="row2" style="margin-top:6px"><button type="button" id="cvUse" class="on">Use now</button><button type="button" id="cvSave">Save on this device</button></div><button type="button" id="cvExp" style="margin-top:6px">Export profile (JSON)</button></div>';
}

/* ------------------------------------------------------------------ open / close */
function openLab() { lab.hidden = false; document.body.style.overflow = 'hidden'; W = 0; setTimeout(() => { resize(); renderPanes(); $('#lbClose').focus(); }, 0); }
function closeLab() { lab.hidden = true; document.body.style.overflow = ''; if (S.src && S.src.kind === 'video') S.src.v.pause(); S.tracking = false; const b = $('#labBtn'); if (b) b.focus(); }
$('#lbClose').onclick = closeLab;
document.addEventListener('click', (e) => { if (e.target.closest('#labBtn') || e.target.closest('[data-openlab]')) openLab(); });
new ResizeObserver(() => { if (!lab.hidden) { const had = W; resize(); if (!had) fitView(); } }).observe($('#lbStage'));
(function () { const b = document.getElementById('labBtn'); const mq = window.matchMedia('(max-width:760px)'); const f = () => { if (b) b.textContent = mq.matches ? 'Lab' : 'Photo & Video Lab'; }; f(); (mq.addEventListener ? mq.addEventListener('change', f) : mq.addListener(f)); })();
window.MLAB = { setHub, open: openLab, close: closeLab, state: S, setSource, readFile, setTool, exportData, trackCSV, runTrack, addTrack, detectGrid, CV, renderPanes, makeItem, addItem, lab };
})();
