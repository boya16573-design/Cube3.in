/* Cube3 core — shared by every app page.
   Load order on each page:
     config.js → supabase CDN → supabase-client.js → auth.js → cube3.js
   Every query goes through q(), so a failure shows on screen instead of
   leaving the page stuck on "Loading...". */
(function () {
  "use strict";

  var sb = window.cube3Supabase;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function money(n) {
    if (n == null || n === "") return "";
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function when(ts) {
    if (!ts) return "";
    var d = new Date(ts), now = new Date();
    var mins = Math.round((now - d) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + "m ago";
    if (mins < 1440) return Math.round(mins / 60) + "h ago";
    if (mins < 10080) return Math.round(mins / 1440) + "d ago";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  function initials(name) {
    return String(name || "?").trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w[0]; }).join("").toUpperCase() || "?";
  }

  /* Every Supabase call goes through this.
     - names the step, so an error says which query failed
     - times out at 15s instead of hanging forever
     - turns Supabase's error object into a thrown Error */
  async function q(label, builder) {
    var timeout = new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(label + ": the server didn't respond in 15 seconds."));
      }, 15000);
    });

    var result = await Promise.race([builder, timeout]);

    if (result && result.error) {
      var e = result.error;
      var msg = label + ": " + (e.message || "unknown error");
      if (e.code) msg += " (" + e.code + ")";
      if (e.code === "42P01") msg += " — that table doesn't exist.";
      if (e.code === "42501") msg += " — blocked by a security policy.";
      if (e.code === "PGRST116") msg += " — no matching row.";
      throw new Error(msg);
    }
    return result ? result.data : null;
  }

  /* Renders a real error into a container instead of leaving it blank. */
  function fail(el, err) {
    if (typeof el === "string") el = document.getElementById(el);
    if (!el) { alert(err.message); return; }
    console.error(err);
    el.innerHTML =
      '<div class="empty-state" style="border-color:#BE3423;text-align:left">' +
      '<strong style="color:#BE3423">Something went wrong</strong>' +
      '<div style="font-family:ui-monospace,monospace;font-size:13px;margin-top:6px">' +
      esc(err.message) + "</div>" +
      '<button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="location.reload()">Try again</button>' +
      "</div>";
  }

  function empty(el, title, detail, ctaHref, ctaLabel) {
    if (typeof el === "string") el = document.getElementById(el);
    if (!el) return;
    el.innerHTML = '<div class="empty-state"><strong>' + esc(title) + "</strong>" +
      (detail ? "<div>" + esc(detail) + "</div>" : "") +
      (ctaHref ? '<a class="btn btn-primary btn-sm" style="margin-top:14px" href="' +
        esc(ctaHref) + '">' + esc(ctaLabel) + "</a>" : "") + "</div>";
  }

  function skeleton(el, count) {
    if (typeof el === "string") el = document.getElementById(el);
    if (!el) return;
    var one = '<div class="skeleton"><div class="bar mid"></div>' +
              '<div class="bar"></div><div class="bar short"></div></div>';
    el.innerHTML = new Array(count || 3).fill(one).join("");
  }

  /* Returns { user, profile, role } or sends the visitor to login. */
  var cached = null;
  async function me() {
    if (cached) return cached;

    var auth = await Promise.race([
      sb.auth.getUser(),
      new Promise(function (_, rej) {
        setTimeout(function () { rej(new Error("Checking your login timed out.")); }, 12000);
      })
    ]);

    if (!auth.data || !auth.data.user) {
      location.href = "/pages/login.html";
      throw new Error("Not signed in.");
    }

    var user = auth.data.user;
    var profile = await q("Loading your profile",
      sb.from("profiles").select("id, role, full_name, avatar_url, bio").eq("id", user.id).maybeSingle());

    if (!profile) {
      throw new Error("Your account has no profile row yet. Open Profile and save it once.");
    }

    cached = { user: user, profile: profile, role: profile.role, id: user.id };
    return cached;
  }

  window.C3 = {
    sb: sb, q: q, me: me,
    fail: fail, empty: empty, skeleton: skeleton,
    esc: esc, money: money, when: when, initials: initials
  };
})();
