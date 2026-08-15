// Cube3 API — replaces server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const required = ["SUPABASE_URL", "SUPABASE_SECRET_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(
    `Missing required environment variable(s): ${missing.join(", ")}. ` +
    `Set these in Render's Environment settings, not in your code or GitHub.`
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1);

// --- CORS -----------------------------------------------------------------
// Previously any request with no Origin header (curl, scripts, scrapers) was
// allowed. Browsers always send Origin on cross-site requests, so only the
// health check needs to work without one.
const ALLOWED_ORIGINS = new Set([
  "https://cube3.in",
  "https://www.cube3.in",
  "http://localhost:3000",
  "http://127.0.0.1:5500"
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, false);        // no CORS headers, request still served
    if (ALLOWED_ORIGINS.has(origin)) return callback(null, true);
    return callback(null, false);                      // deny quietly, don't throw
  },
  methods: ["GET", "POST"],
  maxAge: 86400
}));

app.use(express.json({ limit: "100kb" }));

app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "no-referrer");
  next();
});

// --- Simple in-memory rate limit -----------------------------------------
// Good enough for a single Render instance. Move to Redis if you scale out.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const hits = new Map();

setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [ip, list] of hits) {
    const kept = list.filter((t) => t > cutoff);
    if (kept.length) hits.set(ip, kept); else hits.delete(ip);
  }
}, WINDOW_MS).unref();

app.use("/api", (req, res, next) => {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => t > now - WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (list.length > MAX_REQUESTS) {
    return res.status(429).json({ success: false, error: "Too many requests. Wait a minute and try again." });
  }
  next();
});

// --- Supabase (service role — server only) -------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

// The service key bypasses RLS, so every query below names its columns
// explicitly. Never use select("*") on a service-role client behind a
// public endpoint — it ships email addresses and anything else you add later.
const CREATOR_FIELDS =
  "id,handle,category,youtube_url,instagram_url,x_url,portfolio_url,created_at,profiles!inner(full_name,avatar_url,bio)";
const CAMPAIGN_FIELDS =
  "id,title,description,budget,category,platform,location,requirements,deadline,status,created_at,profiles!inner(full_name,avatar_url)";

function fail(res, error, status = 500) {
  console.error(error);
  res.status(status).json({ success: false, error: "Something went wrong on our side. Try again." });
}

function pageParams(req) {
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 24, 1), 50);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const from = (page - 1) * limit;
  return { limit, page, from, to: from + limit - 1 };
}

app.get("/", (req, res) => {
  res.json({
    service: "Cube3 API",
    status: "online",
    endpoints: ["/api/health", "/api/creators", "/api/campaigns"]
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "Cube3 API", status: "online" });
});

app.get("/api/creators", async (req, res) => {
  try {
    const { limit, page, from, to } = pageParams(req);
    let query = supabase
      .from("creator_profiles")
      .select(CREATOR_FIELDS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (req.query.category) query = query.eq("category", String(req.query.category).slice(0, 60));

    const { data, error, count } = await query;
    if (error) return fail(res, error);

    // Flatten the join so the front end gets one clean shape.
    const creators = (data || []).map(({ profiles, ...c }) => ({
      ...c,
      full_name: profiles?.full_name || null,
      avatar_url: profiles?.avatar_url || null,
      bio: profiles?.bio || null
    }));

    res.json({ success: true, creators, page, limit, total: count ?? creators.length });
  } catch (error) {
    fail(res, error);
  }
});

app.get("/api/campaigns", async (req, res) => {
  try {
    const { limit, page, from, to } = pageParams(req);
    let query = supabase
      .from("campaigns")
      .select(CAMPAIGN_FIELDS, { count: "exact" })
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (req.query.category) query = query.eq("category", String(req.query.category).slice(0, 60));
    if (req.query.platform) query = query.eq("platform", String(req.query.platform).slice(0, 60));

    const { data, error, count } = await query;
    if (error) return fail(res, error);

    const campaigns = (data || []).map(({ profiles, ...c }) => ({
      ...c,
      brand_name: profiles?.full_name || "Brand",
      brand_avatar_url: profiles?.avatar_url || null
    }));

    res.json({ success: true, campaigns, page, limit, total: count ?? campaigns.length });
  } catch (error) {
    fail(res, error);
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Cube3 API running on port ${PORT}`);
});
