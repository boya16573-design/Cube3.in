const SUPABASE_URL =
  "https://zjgtceurzsvjkspkvroz.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_q9x-cmieOqpj3_rw3AGcEA_K-uynMSm";

async function loadCreators() {
  const grid = document.getElementById("creatorGrid");

  if (!grid) {
    console.error("creatorGrid not found");
    return;
  }

  grid.innerHTML = "<p>Loading creators...</p>";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/creators?select=*&order=created_at.desc`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const creators = await response.json();

    console.log("Cube3 creators:", creators);

    if (creators.length === 0) {
      grid.innerHTML = "<p>No creators found.</p>";
      return;
    }

    grid.innerHTML = creators.map(creator => `
      <article class="creator-card">

        <div class="creator-cover">
          <div class="creator-avatar">
            ${getInitials(creator.name)}
          </div>

          ${
            creator.verified
              ? `<span class="verified">✓ Verified</span>`
              : ""
          }
        </div>

        <div class="creator-content">

          <h3 class="creator-name">
            ${escapeHTML(creator.name)}
          </h3>

          <div class="creator-handle">
            ${escapeHTML(creator.username || "")}
          </div>

          <p class="creator-description">
            ${escapeHTML(
              creator.description || ""
            )}
          </p>

          <span class="category">
            ${escapeHTML(
              creator.category || "Creator"
            )}
          </span>

          <div class="stats">

            <div class="stat">
              <strong>
                ${formatNumber(
                  creator.youtube_subscribers
                )}
              </strong>
              <span>YouTube</span>
            </div>

            <div class="stat">
              <strong>
                ${formatNumber(
                  creator.instagram_followers
                )}
              </strong>
              <span>Instagram</span>
            </div>

            <div class="stat">
              <strong>
                ${formatNumber(
                  creator.x_followers
                )}
              </strong>
              <span>X</span>
            </div>

          </div>

          <div class="social-links">

            ${
              creator.youtube_url
                ? `<a class="social"
                     href="${creator.youtube_url}"
                     target="_blank">
                     ▶ YouTube
                   </a>`
                : ""
            }

            ${
              creator.instagram_url
                ? `<a class="social"
                     href="${creator.instagram_url}"
                     target="_blank">
                     ◎ Instagram
                   </a>`
                : ""
            }

            ${
              creator.x_url
                ? `<a class="social"
                     href="${creator.x_url}"
                     target="_blank">
                     𝕏 X
                   </a>`
                : ""
            }

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

    console.error("Cube3 Supabase error:", error);

    grid.innerHTML = `
      <div style="padding:20px">
        ❌ Could not load creators.
        <br><br>
        ${escapeHTML(error.message)}
      </div>
    `;
  }
}

function getInitials(name) {
  if (!name) return "C3";

  return name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

function formatNumber(value) {
  const n = Number(value || 0);

  if (n >= 1000000)
    return (n / 1000000).toFixed(1).replace(".0", "") + "M";

  if (n >= 1000)
    return (n / 1000).toFixed(1).replace(".0", "") + "K";

  return n.toString();
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener(
  "DOMContentLoaded",
  loadCreators
);
