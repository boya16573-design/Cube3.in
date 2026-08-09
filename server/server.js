import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Cube3 API",
    status: "online"
  });
});

app.get("/api/creators", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("creators")
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
      .select("*");

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

app.listen(PORT, () => {
  console.log(`Cube3 API running on port ${PORT}`);
});
