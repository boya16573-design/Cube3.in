async function loadCreators(){
  const grid=document.querySelector("#creatorGrid"); if(!grid)return;
  try{
    const r=await Cube3API.apiFetch("/api/creators");
    const creators=r.creators||[];
    grid.innerHTML=creators.map(c=>`<article class="card"><div class="avatar">${initials(c.full_name||c.name||"Creator")}</div><h3>${esc(c.full_name||c.name||"Creator")}</h3><p>${esc(c.category||"Creator")}</p></article>`).join("")||"<p>No creators found.</p>";
  }catch(e){console.error(e);grid.innerHTML="<p class='error'>Could not load creators.</p>";}
}
function initials(n){return n.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join("")}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
document.addEventListener("DOMContentLoaded",loadCreators);
