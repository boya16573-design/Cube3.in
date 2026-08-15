/* Cube3 messaging.js
   Load after supabase-client.js on any page that needs to start or show a chat:
       <script src="/messaging.js"></script>

   Provides window.Cube3Chat:
     startInquiry(creatorId)            -> { id }  opens (or reuses) a thread
     uploadAttachment(threadId, file)   -> { path, type, name, size }
     signedUrl(path)                    -> temporary URL, valid 1 hour
     renderAttachment(message)          -> HTML string for a bubble
     fileLimits                         -> the accepted types and size cap
*/
(function () {
  "use strict";

  var sb = window.cube3Supabase;
  var BUCKET = "message-attachments";

  // 50 MB. Supabase's default per-file cap is 50 MB on the free tier —
  // raise it in Storage → Settings before raising this number.
  var MAX_BYTES = 50 * 1024 * 1024;

  // Blocked because a browser will happily execute or auto-run some of these
  // if they ever get served from your domain. Everything else is allowed.
  var BLOCKED_EXT = [
    "exe","msi","bat","cmd","com","scr","pif","cpl","jar",
    "js","mjs","html","htm","svg","xhtml","php","sh","ps1","vbs","apk","dmg"
  ];

  function extOf(name) {
    var parts = String(name || "").split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  }

  function kindOf(file) {
    if (file.type.indexOf("image/") === 0) return "image";
    if (file.type.indexOf("video/") === 0) return "video";
    if (file.type.indexOf("audio/") === 0) return "audio";
    return "file";
  }

  function humanSize(bytes) {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function randomName(file) {
    var ext = extOf(file.name);
    var id = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now() + "-" + Math.random().toString(36).slice(2);
    return ext ? id + "." + ext : id;
  }

  /* --- open a conversation with a creator ------------------------------ */
  async function startInquiry(creatorId) {
    var session = await sb.auth.getUser();
    var me = session.data && session.data.user;
    if (!me) { location.href = "/pages/login.html"; return null; }
    if (me.id === creatorId) throw new Error("You can't message yourself.");

    // Reuse the existing thread if there is one — otherwise every click
    // would create a duplicate conversation.
    var existing = await sb.from("creator_inquiries")
      .select("id")
      .eq("brand_id", me.id)
      .eq("creator_id", creatorId)
      .maybeSingle();

    if (existing.data) return existing.data;

    var created = await sb.from("creator_inquiries")
      .insert({ brand_id: me.id, creator_id: creatorId })
      .select("id")
      .single();

    if (created.error) {
      if (created.error.code === "23505") {           // raced with another tab
        var again = await sb.from("creator_inquiries")
          .select("id").eq("brand_id", me.id).eq("creator_id", creatorId).single();
        return again.data;
      }
      if (created.error.code === "42501") {
        throw new Error("Only brand accounts can start a conversation.");
      }
      throw new Error(created.error.message);
    }
    return created.data;
  }

  /* --- upload any file type -------------------------------------------- */
  async function uploadAttachment(threadId, file) {
    if (!file) return null;
    if (!threadId) throw new Error("No conversation selected.");

    if (file.size > MAX_BYTES) {
      throw new Error("That file is " + humanSize(file.size) +
                      ". The limit is " + humanSize(MAX_BYTES) + ".");
    }
    if (file.size === 0) throw new Error("That file is empty.");
    if (BLOCKED_EXT.indexOf(extOf(file.name)) !== -1) {
      throw new Error("." + extOf(file.name) + " files can't be shared here. " +
                      "Zip it first, or send a link.");
    }

    // Path starts with the thread id so the storage policy can check
    // membership. Don't change this shape without changing the SQL.
    var path = threadId + "/" + randomName(file);

    var up = await sb.storage.from(BUCKET).upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });
    if (up.error) throw new Error("Upload failed: " + up.error.message);

    return {
      path: path,
      type: kindOf(file),
      name: file.name.slice(0, 200),
      size: file.size
    };
  }

  /* --- private files need a signed URL --------------------------------- */
  var urlCache = {};
  async function signedUrl(path) {
    if (!path) return null;
    var hit = urlCache[path];
    if (hit && hit.expires > Date.now()) return hit.url;

    var res = await sb.storage.from(BUCKET).createSignedUrl(path, 3600);
    if (res.error) return null;
    urlCache[path] = { url: res.data.signedUrl, expires: Date.now() + 55 * 60 * 1000 };
    return res.data.signedUrl;
  }

  /* --- render a bubble's attachment ------------------------------------ */
  // Returns a placeholder immediately, then fills in the signed URL.
  function renderAttachment(m) {
    if (!m.attachment_path) return "";
    var id = "att-" + (m.id || Math.random().toString(36).slice(2));

    setTimeout(async function () {
      var el = document.getElementById(id);
      if (!el) return;
      var url = await signedUrl(m.attachment_path);
      if (!url) { el.innerHTML = '<span class="muted">Attachment unavailable</span>'; return; }

      if (m.attachment_type === "image") {
        el.innerHTML = '<a href="' + esc(url) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(url) + '" alt="' + esc(m.attachment_name || "Image") +
          '" style="max-width:230px;border:1.5px solid var(--ink);border-radius:4px;display:block"></a>';
      } else if (m.attachment_type === "video") {
        el.innerHTML = '<video src="' + esc(url) + '" controls preload="metadata" ' +
          'style="max-width:230px;border:1.5px solid var(--ink);border-radius:4px;display:block"></video>';
      } else if (m.attachment_type === "audio") {
        el.innerHTML = '<audio src="' + esc(url) + '" controls style="max-width:230px;display:block"></audio>';
      } else {
        el.innerHTML = '<a class="btn btn-ghost btn-sm" href="' + esc(url) + '" target="_blank" rel="noopener" ' +
          'download="' + esc(m.attachment_name || "file") + '" style="max-width:230px">' +
          '<span aria-hidden="true">↓</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
          esc(m.attachment_name || "Download") + '</span></a>' +
          '<div class="mono muted" style="margin-top:4px">' + esc(humanSize(m.attachment_size)) + '</div>';
      }
    }, 0);

    return '<div id="' + id + '" style="margin-bottom:6px"><span class="muted">Loading…</span></div>';
  }

  window.Cube3Chat = {
    startInquiry: startInquiry,
    uploadAttachment: uploadAttachment,
    signedUrl: signedUrl,
    renderAttachment: renderAttachment,
    humanSize: humanSize,
    fileLimits: { maxBytes: MAX_BYTES, blocked: BLOCKED_EXT }
  };
})();
