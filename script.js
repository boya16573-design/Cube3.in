let category="all",timer;const grid=document.getElementById("creatorGrid"),count=document.getElementById("creatorCount"),campaignGrid=document.getElementById("campaignGrid");const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));function fmt(n){n=Number(n||0);return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(0)+"K":n}
function card(c){let name=c.full_name||c.handle||"Creator",initials=name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();return `<article class="card"><div class="avatar">${esc(initials)}</div><h3>${esc(name)} ${c.verified?'<span class="verified">✓ Verified</span>':''}</h3><div class="handle">@${esc(c.handle||"creator")}</div><p class="desc">${esc(c.description||"Creator profile")}</p><div class="stats"><div class="stat"><strong>${fmt(c.youtube_followers)}</strong><span>YouTube</span></div><div class="stat"><strong>${fmt(c.instagram_followers)}</strong><span>Instagram</span></div><div class="stat"><strong>${fmt(c.x_followers)}</strong><span>X</span></div></div><button class="primary" onclick="alert('Creator profile page can be connected next')">View Profile</button></article>`}
async function loadCreators(){grid.innerHTML='<p class="muted">Loading creators...</p>';try{let d=await getCreators(category,document.getElementById("searchInput").value);count.textContent=d.length+" creators";grid.innerHTML=d.length?d.map(card).join(""):'<p class="muted">No creators found.</p>'}catch(e){console.error(e);grid.innerHTML='<p class="muted">Could not load creators. Check Supabase configuration and RLS.</p>'}}
async function loadCampaigns(){try{let d=await getCampaigns();campaignGrid.innerHTML=d.length?d.map(c=>`<article class="card"><small>${esc(c.category)}</small><h3>${esc(c.title)}</h3><p class="desc">${esc(c.description)}</p><p class="muted">Budget: ${esc(c.currency||"INR")} ${esc(c.budget_min||0)} - ${esc(c.budget_max||0)}</p></article>`).join(""):'<p class="muted">No open campaigns yet.</p>'}catch(e){console.error(e);campaignGrid.innerHTML='<p class="muted">Campaigns unavailable.</p>'}}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.category;loadCreators()});document.getElementById("searchInput").oninput=()=>{clearTimeout(timer);timer=setTimeout(loadCreators,300)};
const modal=document.getElementById("modal");function openAuth(login){modal.classList.remove("hidden");document.getElementById("authTitle").textContent=login?"Login to Cube3":"Join Cube3";document.getElementById("fullName").style.display=login?"none":"block";document.getElementById("role").style.display=login?"none":"block";document.getElementById("switch").textContent=login?"Need an account? Sign up":"Already have an account? Login";modal.dataset.login=login?"1":"0"}document.getElementById("loginBtn").onclick=()=>openAuth(true);document.getElementById("signupBtn").onclick=()=>openAuth(false);document.getElementById("close").onclick=()=>modal.classList.add("hidden");document.getElementById("switch").onclick=()=>openAuth(modal.dataset.login!=="1");
document.getElementById("authForm").onsubmit=async e=>{e.preventDefault();let m=document.getElementById("authMessage");m.textContent="Working...";try{if(modal.dataset.login==="1")await loginUser(email.value,password.value);else await signUpUser(fullName.value,email.value,password.value,role.value);m.textContent="Success. Check email verification if enabled.";setTimeout(()=>modal.classList.add("hidden"),1200)}catch(err){m.textContent=err.message}};loadCreators();loadCampaigns()
    async function loadCreators() {
  const grid = document.getElementById("creatorGrid");
  const count = document.getElementById("creatorCount");

  try {
    const response = await fetch("/api/creators");
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to load creators");
    }

    const creators = result.creators || [];

    count.textContent = `${creators.length} creators`;

    if (creators.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>No creators yet</h3>
          <p>Add creators in your Supabase dashboard.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = creators.map(creator => `
      <article
        class="creator-card"
        data-name="${escapeHTML(creator.full_name || "")}"
        data-category="${escapeHTML(creator.category || "other")}"
      >

        <div class="creator-cover">
          <div class="creator-avatar">
            ${getInitials(creator.full_name)}
          </div>

          ${creator.verified
            ? `<span class="verified">✓ Verified</span>`
            : ""}
        </div>

        <div class="creator-content">

          <h3 class="creator-name">
            ${escapeHTML(creator.full_name || "Unknown Creator")}
          </h3>

          <div class="creator-handle">
            @${escapeHTML(creator.handle || "")}
          </div>

          <p class="creator-description">
            ${escapeHTML(creator.description || "")}
          </p>

          <span class="category">
            ${escapeHTML((creator.category || "OTHER").toUpperCase())}
          </span>

          <div class="stats">

            <div class="stat">
              <strong>${formatNumber(creator.youtube_followers)}</strong>
              <span>YouTube</span>
            </div>

            <div class="stat">
              <strong>${formatNumber(creator.instagram_followers)}</strong>
              <span>Instagram</span>
            </div>

            <div class="stat">
              <strong>${formatNumber(creator.x_followers)}</strong>
              <span>X</span>
            </div>

          </div>

          <div class="social-links">

            ${creator.youtube_url
              ? `<a class="social" href="${safeURL(creator.youtube_url)}" target="_blank" rel="noopener">▶ YouTube</a>`
              : ""}

            ${creator.instagram_url
              ? `<a class="social" href="${safeURL(creator.instagram_url)}" target="_blank" rel="noopener">◎ Instagram</a>`
              : ""}

            ${creator.x_url
              ? `<a class="social" href="${safeURL(creator.x_url)}" target="_blank" rel="noopener">𝕏 X</a>`
              : ""}

          </div>

          <a
            href="mailto:hello@cube3.in?subject=Creator Collaboration"
            class="collab"
          >
            Contact for Collaboration
          </a>

        </div>
      </article>
    `).join("");

  } catch (error) {
    console.error("Creator loading error:", error);

    grid.innerHTML = `
      <div class="empty-state">
        <h3>Unable to load creators</h3>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

function formatNumber(value) {
  const number = Number(value) || 0;

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toString();
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeURL(value) {
  try {
    const url = new URL(value);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.href;
    }

    return "#";
  } catch {
    return "#";
  }
}

document.addEventListener("DOMContentLoaded", loadCreators);