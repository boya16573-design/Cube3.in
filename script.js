// ================================
// CUBE3 + SUPABASE
// ================================

const SUPABASE_URL =
  "https://zjgtceurzsvjkspkvroz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_q9x-cmieOqpj3_rw3AGcEA_K-uynMSm"

let supabaseClient;
let creators = [];

// ================================
// INITIALIZE SUPABASE
// ================================

function initializeSupabase() {

  if (!window.supabase) {
    console.error("Supabase library was not loaded.");
    return false;
  }

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("✅ Supabase initialized");

  return true;
}


// ================================
// LOAD CREATORS
// ================================

async function loadCreators() {

  if (!supabaseClient) {
    console.error("Supabase is not initialized.");
    return;
  }

  console.log("Loading Cube3 creators...");

  const {
    data,
    error
  } = await supabaseClient
    .from("creators")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {

    console.error(
      "❌ Supabase database error:",
      error
    );

    return;
  }

  creators = data || [];

  console.log(
    "✅ Creators loaded:",
    creators
  );

  displayCreators(creators);
}


// ================================
// DISPLAY CREATORS
// ================================

function displayCreators(list) {

  const grid =
    document.getElementById("creatorGrid");

  if (!grid) {
    console.warn(
      "creatorGrid element not found."
    );

    return;
  }

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty">
        No creators found.
      </div>
    `;

    return;
  }

  grid.innerHTML = list.map(
    creator => {

      const youtube =
        formatNumber(
          creator.youtube_subscribers
        );

      const instagram =
        formatNumber(
          creator.instagram_followers
        );

      const facebook =
        formatNumber(
          creator.facebook_followers
        );

      const x =
        formatNumber(
          creator.x_followers
        );

      return `

        <article class="creator-card">

          <div class="creator-cover">

            <div class="creator-avatar">
              ${getInitials(creator.name)}
            </div>

            ${
              creator.verified
                ? `<span class="verified">
                     ✓ Verified
                   </span>`
                : ""
            }

          </div>


          <div class="creator-content">

            <h3>
              ${escapeHTML(
                creator.name
              )}
            </h3>


            <div class="creator-handle">
              ${
                escapeHTML(
                  creator.username || ""
                )
              }
            </div>


            <p class="creator-description">

              ${
                escapeHTML(
                  creator.description ||
                  "Cube3 creator"
                )
              }

            </p>


            <span class="category">

              ${
                escapeHTML(
                  creator.category ||
                  "Creator"
                ).toUpperCase()
              }

            </span>


            <div class="stats">

              <div class="stat">

                <strong>
                  ${youtube}
                </strong>

                <span>
                  YouTube
                </span>

              </div>


              <div class="stat">

                <strong>
                  ${instagram}
                </strong>

                <span>
                  Instagram
                </span>

              </div>


              <div class="stat">

                <strong>
                  ${x}
                </strong>

                <span>
                  X
                </span>

              </div>

            </div>


            <div class="social-links">

              ${
                creator.youtube_url
                  ? `
                    <a
                      class="social"
                      href="${safeURL(
                        creator.youtube_url
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▶ YouTube
                    </a>
                  `
                  : ""
              }


              ${
                creator.instagram_url
                  ? `
                    <a
                      class="social"
                      href="${safeURL(
                        creator.instagram_url
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ◎ Instagram
                    </a>
                  `
                  : ""
              }


              ${
                creator.x_url
                  ? `
                    <a
                      class="social"
                      href="${safeURL(
                        creator.x_url
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      𝕏 X
                    </a>
                  `
                  : ""
              }

            </div>


            <a
              class="collab"
              href="mailto:hello@cube3.in?subject=Creator Collaboration"
            >
              Contact for Collaboration
            </a>

          </div>

        </article>

      `;

    }
  ).join("");

}


// ================================
// SEARCH
// ================================

function searchCreators() {

  const input =
    document.getElementById(
      "creatorSearch"
    );

  if (!input) return;

  const search =
    input.value
      .toLowerCase()
      .trim();


  const results =
    creators.filter(
      creator => {

        const text = [

          creator.name,
          creator.username,
          creator.category,
          creator.description

        ]
          .join(" ")
          .toLowerCase();


        return text.includes(search);

      }
    );


  displayCreators(results);

}


// ================================
// NUMBER FORMAT
// ================================

function formatNumber(number) {

  const n =
    Number(number || 0);


  if (n >= 1000000) {

    return (
      (n / 1000000)
        .toFixed(1)
        .replace(".0", "")
      + "M"
    );

  }


  if (n >= 1000) {

    return (
      (n / 1000)
        .toFixed(1)
        .replace(".0", "")
      + "K"
    );

  }


  return String(n);
}


// ================================
// INITIALS
// ================================

function getInitials(name) {

  if (!name) return "C3";


  return name
    .split(" ")
    .slice(0, 2)
    .map(
      word => word.charAt(0)
    )
    .join("")
    .toUpperCase();

}


// ================================
// SECURITY
// ================================

function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ================================
// SAFE URL
// ================================

function safeURL(value) {

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
      "Invalid URL:",
      value
    );

  }


  return "#";
}


// ================================
// START
// ================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    console.log(
      "🚀 Cube3 starting..."
    );


    const connected =
      initializeSupabase();


    if (!connected) return;


    await loadCreators();


    const search =
      document.getElementById(
        "creatorSearch"
      );


    if (search) {

      search.addEventListener(
        "input",
        searchCreators
      );

    }

  }
);
