/* =====================================================================
   TNS English Explorers — Admin dashboard settings
   ---------------------------------------------------------------------
   These two values are PUBLIC by design. The publishable key (formerly
   "anon" key) only allows sign-in; all data is protected in the database
   by Row Level Security and the administrator check in admin_report().
   NEVER paste a secret key (sb_secret_...), the service_role key, or a
   password here. Use the TNS Supabase project — never the NVS one.
   ===================================================================== */
window.TNS_ADMIN_CONFIG = {
  /* Supabase → Project Settings → API → Project URL, e.g. "https://abcdefghijkl.supabase.co" */
  supabaseUrl: "",
  /* Supabase → Project Settings → API Keys → Publishable key ("sb_publishable_...") */
  supabasePublishableKey: ""
};
