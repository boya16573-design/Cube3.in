// ==========================================
// CUBE3 - SUPABASE CREATOR DIRECTORY
// ==========================================

const SUPABASE_URL =
  "https://zjgtceurzsvjkspkvroz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_q9x-cmieOqpj3_rw3AGcEA_K-uynMSm";

let supabaseClient;
let allCreators = [];

// ==========================================
// START
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  if (!window.supabase) {
    showMessage(
      "Supabase library did not load.",
      true
    );
    return;
  }

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("Cube3: Supabase connected");

  loadCreators();

  setupSearch();

  setupFilters();

});


// ==========================================
// LOAD CREATORS
// ==========================================

async function loadCreators() {

  showMessage("Loading creators...");

  const { data, error } = await supabaseClient
    .from("creators")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {

    console.error(error);

    showMessage(
      "Unable to load creators: " +
      error.message,
      true
    );

    return;
  }

  allCreators = data || [];

  console.log(
    "Cube3 creators:",
    allCreators
  );

  renderCreators(allCreators);

}


// ==========================================
// RENDER CREATORS
// ==========================================

function renderCreators(creators) {

  const grid =
    document.getElementById("creatorGrid");

  if (!grid) {

    console.error(
      "creatorGrid was not found in index.html"
    );

    return;
  }

  if (creators.length === 0) {

    grid.innerHTML = `
      <div class="empty-state">
        No creators found.
      </div>
    `;

    updateCount(0);

    return;
  }

  grid.innerHTML = creators
    .map(createCreatorCard)
    .join("");

  updateCount(creators.length);

}


// ==========================================
// CREATOR CARD
// ==========================================

function createCreatorCard(creator) {

  const initials =
    getInitials(creator.name);

  const category =
    creator.category || "Creator";

  const verified =
    creator.verified
      ? `
        <span class="verified">
          ✓ Verified
        </span>
      `
      : "";

  const youtube =
    formatNumber(
      creator.youtube_subscribers
    );

  const instagram =
    formatNumber(
      creator.instagram_followers
    );

  const xFollowers =
    formatNumber(
      creator.x_followers
    );

  const youtubeLink =
    creator.youtube_url
      ? `
        <a
          class="social"
          href="${safeUrl(creator.youtube_url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ YouTube
        </a>
      `
      : "";

  const instagramLink =
    creator.instagram_url
      ? `
        <a
          class="social"
          href="${safeUrl(creator.instagram_url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ◎ Instagram
        </a>
      `
      : "";

  const xLink =
    creator.x_url
      ? `
        <a
          class="social"
          href="${safeUrl(creator.x_url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          𝕏 X
        </a>
      `
      : "";

  return `
    <article
      class="creator-card"
      data-name="${escapeHTML(creator.name)}"
      data-category="${escapeHTML(category)}"
    >

      <div class="creator-cover">

        <div class="creator-avatar">
          ${escapeHTML(initials)}
        </div>

        ${verified}

      </div>


      <div class="creator-content">

        <h3 class="creator-name">
          ${escapeHTML(creator.name)}
        </h3>


        <div class="creator-handle">
          ${escapeHTML(
            creator.username || ""
          )}
        </div>


        <p class="creator-description">
          ${escapeHTML(
            creator.description ||
            "Creator on Cube3."
          )}
        </p>


        <span class="category">
          ${escapeHTML(
            category.toUpperCase()
          )}
        </span>


        <div class="stats">

          <div class="stat">
            <strong>
              ${youtube}
            </strong>
            <span>YouTube</span>
          </div>

          <div class="stat">
            <strong>
              ${instagram}
            </strong>
            <span>Instagram</span>
          </div>

          <div class="stat">
            <strong>
              ${xFollowers}
            </strong>
            <span>X</span>
          </div>

        </div>


        <div class="social-links">

          ${youtubeLink}

          ${instagramLink}

          ${xLink}

        </div>


        <a
          href="mailto:hello@cube3.in?subject=Creator Collaboration"
          class="collab"
        >
          Contact for Collaboration
        </a>

      </div>

    </article>
  `;
}


// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      const query =
        input.value
          .toLowerCase()
          .trim();

      const filtered =
        allCreators.filter(
          creator => {

            const text = [
              creator.name,
              creator.username,
              creator.category,
              creator.description
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return text.includes(query);
          }
        );

      renderCreators(filtered);

    }
  );

}


// ==========================================
// CATEGORY FILTERS
// ==========================================

function setupFilters() {

  const filters =
    document.querySelectorAll(".filter");

  filters.forEach(filter => {

    filter.addEventListener(
      "click",
      () => {

        filters.forEach(button => {
          button.classList.remove("active");
        });

        filter.classList.add("active");

        const category =
          filter.dataset.category;

        if (
          !category ||
          category === "all"
        ) {

          renderCreators(allCreators);

          return;
        }

        const filtered =
          allCreators.filter(
            creator =>
              String(
                creator.category || ""
              ).toLowerCase() ===
              category.toLowerCase()
          );

        renderCreators(filtered);

      }
    );

  });

}


// ==========================================
// COUNT
// ==========================================

function updateCount(count) {

  const counter =
    document.getElementById(
      "creatorCount"
    );

  if (!counter) return;

  counter.textContent =
    `${count} creator${count === 1 ? "" : "s"}`;

}


// ==========================================
// NUMBER FORMAT
// ==========================================

function formatNumber(value) {

  const number =
    Number(value || 0);

  if (number >= 1000000) {

    return (
      (number / 1000000)
        .toFixed(1)
        .replace(".0", "") +
      "M"
    );

  }

  if (number >= 1000) {

    return (
      (number / 1000)
        .toFixed(1)
        .replace(".0", "") +
      "K"
    );

  }

  return number.toString();

}


// ==========================================
// INITIALS
// ==========================================

function getInitials(name) {

  if (!name) return "C3";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();

}


// ==========================================
// HTML SECURITY
// ==========================================

function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ==========================================
// URL SECURITY
// ==========================================

function safeUrl(value) {

  try {

    const url =
      new URL(value);

    if (
      url.protocol === "https:" ||
      url.protocol === "http:"
    ) {

      return url.href;

    }

  } catch (error) {

    console.warn(
      "Invalid social URL:",
      value
    );

  }

  return "#";

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
  message,
  error = false
) {

  const grid =
    document.getElementById(
      "creatorGrid"
    );

  if (!grid) return;

  grid.innerHTML = `
    <div
      style="
        padding:30px;
        text-align:center;
        width:100%;
      "
    >
      ${error ? "❌" : "⏳"}
      ${escapeHTML(message)}
    </div>
  `;

}
