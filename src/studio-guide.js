/* First-run guide: three short steps (Measure, Build, Combine) with buttons that jump straight to the right workspace.
   A small card is offered on a person's first visit; the Guide buttons reopen the full guide any time. Nothing blocks the app. */
(function () {
'use strict';
const KEY = 'mc-guide-seen-v1';
const css = `
#guide{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(3,6,12,.78);font:14px/1.5 var(--f-body,system-ui,sans-serif);color:#d5def0}
#guide[hidden]{display:none}#guide *{box-sizing:border-box}
#guide .gbox{width:min(920px,100%);max-height:100%;overflow:auto;background:#0f1626;border:1px solid #1f2a44;border-radius:14px;padding:18px 20px}
#guide h2{text-transform:none;letter-spacing:0;margin:0 0 2px;font:700 22px var(--f-body,system-ui);color:#fff}#guide .gsub{color:#8696b6;margin:0 0 14px}
#guide .gsteps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
#guide .gcard{background:#141c30;border:1px solid #1f2a44;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px}
#guide .gn{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center}
#guide h3{text-transform:none;letter-spacing:0;margin:0;font:600 16px var(--f-body,system-ui);color:#e6f0ff}
#guide ol{margin:0;padding-left:18px;color:#b4c3df}#guide li{margin:3px 0}
#guide .gnote{color:#8696b6;font-size:12.5px;margin:0}
#guide button{font:inherit;color:inherit;background:#141c30;border:1px solid #1f2a44;border-radius:8px;padding:8px 12px;cursor:pointer;min-height:36px}
#guide button:hover{border-color:#34508a}#guide button:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}
#guide button.go{background:linear-gradient(90deg,#2563eb,#7c3aed);border-color:transparent;color:#fff;font-weight:600;margin-top:auto}
#guide .gfoot{display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap}#guide .gfoot span{flex:1;color:#8696b6;font-size:12.5px;min-width:200px}
#gnudge{position:fixed;left:14px;bottom:14px;z-index:60;max-width:300px;background:#0f1626;border:1px solid #34508a;border-radius:12px;padding:12px 14px;color:#d5def0;font:13px/1.45 var(--f-body,system-ui,sans-serif);box-shadow:0 8px 30px rgba(0,0,0,.4)}
#gnudge[hidden]{display:none}#gnudge b{color:#fff}#gnudge .r{display:flex;gap:8px;margin-top:8px}
#gnudge button{font:inherit;color:inherit;background:#141c30;border:1px solid #1f2a44;border-radius:8px;padding:6px 10px;cursor:pointer;min-height:32px}#gnudge button.go{background:#2563eb;border-color:transparent;color:#fff}
#gnudge button:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}
@media (max-width:760px){#guide .gsteps{grid-template-columns:minmax(0,1fr)}#guide h2{font-size:19px}#gnudge{left:10px;right:10px;max-width:none;bottom:70px}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
const g = document.createElement('div'); g.id = 'guide'; g.hidden = true; g.setAttribute('role', 'dialog'); g.setAttribute('aria-modal', 'true'); g.setAttribute('aria-label', 'Quick guide');
g.innerHTML = `<div class="gbox"><h2>Welcome. Three things you can do here</h2><p class="gsub">Everything runs on your device. Nothing is uploaded. About one minute to read.</p>
<div class="gsteps">
 <div class="gcard"><div class="gn">1</div><h3>Measure something real</h3><ol><li>Open a photo (or a video).</li><li>Put a flat object of known size on the same surface, such as an A4 sheet or a bank card.</li><li><b>Scale</b> tool: click its four corners and pick the size.</li><li><b>Distance</b> tool: click the two ends of what you want to measure.</li></ol><p class="gnote">You get a number with an honest ± range, not a guess.</p><button type="button" class="go" data-g="photo">Open the Photo Lab</button></div>
 <div class="gcard"><div class="gn">2</div><h3>Build a shape from maths</h3><ol><li>Pick a shape, or choose <b>Custom Equation</b> and type x, y, z.</li><li>Drag the sliders and spin it.</li><li>Watch area and volume, with the exact formula beside them.</li><li>Open <b>Constants</b> to use φ, α, c and more in your equations.</li></ol><p class="gnote">Every number is computed from the equations you can see.</p><button type="button" class="go" data-g="3d">Open the 3D Lab</button></div>
 <div class="gcard"><div class="gn">3</div><h3>Combine them</h3><ol><li>In the Photo Lab, select a distance and press <b>Make a 3D sphere from this distance</b>.</li><li>In the 3D Lab, press <b>Measure this view</b> to measure a render.</li><li>Press <b>Add to design</b> to put the shape on your poster or video.</li></ol><p class="gnote">The tab bar at the top moves between all workspaces.</p><button type="button" class="go" data-g="design">Go to the design editor</button></div>
</div>
<div class="gfoot"><span>Tip: the Guide button in the top bar brings this back any time.</span><button type="button" data-g="close">Close</button></div></div>`;
document.body.appendChild(g);
const nudge = document.createElement('div'); nudge.id = 'gnudge'; nudge.hidden = true; nudge.setAttribute('role', 'region'); nudge.setAttribute('aria-label', 'First visit tip');
nudge.innerHTML = '<b>New here?</b> A one-minute guide shows how to measure a photo, build a 3D shape from equations, and combine them.<div class="r"><button type="button" class="go" data-g="open">Show the guide</button><button type="button" data-g="later">Not now</button></div>';
document.body.appendChild(nudge);
const seen = () => { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } };
const mark = () => { try { localStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ } };
let prevFocus = null;
function open() { prevFocus = document.activeElement; nudge.hidden = true; g.hidden = false; mark(); const b = g.querySelector('.go'); if (b) b.focus(); }
function close() { g.hidden = true; if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { /* ignore */ } } }
function go(n) { close(); if (n === 'design') { if (window.HUB) window.HUB.go('design'); return; } if (window.HUB) window.HUB.go(n); }
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-g],[data-guide],#guideBtn'); if (!t) return;
  if (t.id === 'guideBtn' || t.hasAttribute('data-guide')) { open(); return; }
  const k = t.dataset.g; if (k === 'open') open(); else if (k === 'later') { nudge.hidden = true; mark(); } else if (k === 'close') close(); else go(k);
});
g.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); e.stopPropagation(); } if (e.key === 'Tab') { const f = Array.from(g.querySelectorAll('button')); if (!f.length) return; const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { f[f.length - 1].focus(); e.preventDefault(); } else if (!e.shiftKey && i === f.length - 1) { f[0].focus(); e.preventDefault(); } } });
/* offer once, only to a real first-time visitor (never during automated tests) */
if (!navigator.webdriver && !seen()) setTimeout(() => { if (g.hidden && !seen()) nudge.hidden = false; }, 1500);
window.GUIDE = { open, close, go };
})();
