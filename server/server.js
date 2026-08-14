import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// --- Startup validation -----------------------------------------------
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

// --- CORS -----------------------------------------------------------------
const ALLOWED_ORIGINS = ["https://cube3.in", "https://www.cube3.in"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// --- Supabase client --------------------------------------------------
// Uses the SECRET (service_role) key -- safe here because this code only
// ever runs on the server (Render), never in a browser, and this key is
// never committed to GitHub. Only set it in Render's Environment tab.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

app.get("/", (req, res) => {
  res.json({
    service: "Cube3 API",
    status: "online",
    endpoints: ["/api/health", "/api/creators", "/api/campaigns"]
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Cube3 API",
    status: "online"
  });
});

app.get("/api/creators", async (req, res) => {
  try {
    // Fixed: was querying "creators" (empty leftover table).
    // Real creator data lives in "creator_profiles".
    const { data, error } = await supabase
      .from("creator_profiles")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      creators: data || []
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/api/campaigns", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("status", "open");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      campaigns: data || []
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not found"
  });
});

app.listen(PORT, () => {
  console.log(`Cube3 API running on port ${PORT}`);
});
