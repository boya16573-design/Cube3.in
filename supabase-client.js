// Replace these two values with your Supabase project URL and PUBLISHABLE key.
// NEVER put a Supabase secret/service-role key in this file.
const SUPABASE_URL="https://YOUR_PROJECT.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="YOUR_PUBLISHABLE_KEY";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);