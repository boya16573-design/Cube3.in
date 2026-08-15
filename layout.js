/* Cube3 layout.js — renders the header and footer on every page.
   Load it once per page, just before </body>:
       <script src="/layout.js"></script>
   Then delete the hand-written <header class="site-header"> and
   <footer class="site-footer"> blocks from that page's HTML.
   If you leave them in, this script replaces them anyway.

   Optional per-page override:
       <body data-nav="app">   app nav  (default when signed in)
       <body data-nav="public"> marketing nav
       <body data-side="brand"> switches the accent colour to ultramarine
*/
(function () {
  "use strict";

  var PUBLIC_LINKS = [
    { href: "/index.html#how", label: "How it works" },
    { href: "/pages/campaigns.html", label: "Campaigns" },
    { href: "/pages/how-to-use.html", label: "Guide" },
    { href: "/pages/login.html", label: "Log in" },
    { href: "/pages/signup.html", label: "Get started", btn: true }
  ];

  var APP_LINKS = [
    { href: "/pages/dashboard.html", label: "Dashboard" },
    { href: "/pages/campaigns.html", label: "Campaigns" },
    { href: "/pages/creators.html", label: "Creators" },
    { href: "/pages/my-applications.html", label: "Applications" },
    { href: "/pages/inbox.html", label: "Messages" },
    { href: "/pages/profile.html", label: "Profile" }
  ];

  var FOOTER_LINKS = [
    { href: "/pages/how-to-use.html", label: "Guide" },
    { href: "/pages/terms.html", label: "Terms" },
    { href: "/pages/login.html", label: "Log in" }
  ];

  var MARK =
    '<svg class="mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<rect x="3" y="7" width="13" height="13" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M8 7L11 3H21V14L17 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
    "</svg>";

  function currentFile() {
    var p = location.pathname.replace(/\/$/, "/index.html");
    return p.substring(p.lastIndexOf("/") + 1).toLowerCase();
  }

  function isActive(href) {
    var target = href.split("#")[0];
    return target.substring(target.lastIndexOf("/") + 1).toLowerCase() === currentFile();
  }

  function pickNav() {
    var declared = document.body.getAttribute("data-nav");
    if (declared === "app" || declared === "public") return declared;
    // Anything inside /pages/ that isn't auth or marketing gets the app nav.
    var marketing = ["login.html", "signup.html", "forgot-password.html",
                     "update-password.html", "terms.html", "how-to-use.html", "index.html"];
    return marketing.indexOf(currentFile()) === -1 ? "app" : "public";
  }

  function buildHeader() {
    var links = pickNav() === "app" ? APP_LINKS : PUBLIC_LINKS;

    var items = links.map(function (l) {
      if (l.btn) return '<a class="btn btn-sm btn-primary" href="' + l.href + '">' + l.label + "</a>";
      return '<a href="' + l.href + '"' + (isActive(l.href) ? ' class="active" aria-current="page"' : "") +
             ">" + l.label + "</a>";
    });

    if (pickNav() === "app") {
      items.push('<a href="#" data-action="signout">Sign out</a>');
    }

    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<nav class="wrap" aria-label="Main">' +
        '<a class="brand" href="/index.html">' + MARK + "Cube3</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="cube3-nav" aria-label="Menu"><span></span></button>' +
        '<div class="nav-links" id="cube3-nav">' + items.join("") + "</div>" +
      "</nav>";
    return header;
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap">' +
        '<span>© ' + new Date().getFullYear() + " Cube3</span>" +
        "<span>" + FOOTER_LINKS.map(function (l) {
          return '<a href="' + l.href + '" style="margin-left:16px">' + l.label + "</a>";
        }).join("") + "</span>" +
      "</div>";
    return footer;
  }

  function mount() {
    // Header: replace an existing one, or insert at the top.
    var header = buildHeader();
    var existingHeader = document.querySelector("header.site-header");
    if (existingHeader) existingHeader.replaceWith(header);
    else document.body.insertBefore(header, document.body.firstChild);

    // Footer: replace or append.
    var footer = buildFooter();
    var existingFooter = document.querySelector("footer.site-footer");
    if (existingFooter) existingFooter.replaceWith(footer);
    else document.body.appendChild(footer);

    // Mobile menu
    var toggle = header.querySelector(".nav-toggle");
    var panel = header.querySelector(".nav-links");
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    // Close after tapping a link (same-page anchors would otherwise leave it open)
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Sign out
    var out = header.querySelector('[data-action="signout"]');
    if (out) {
      out.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.Cube3Auth && window.Cube3Auth.signOut) window.Cube3Auth.signOut();
        else location.href = "/pages/login.html";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
