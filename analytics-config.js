/* =====================================================================
   TNS English Explorers — Analytics settings
   ---------------------------------------------------------------------
   Everything in this file is PUBLIC (anyone can read it in a browser).
   Never put a password, a Supabase secret key, or a service_role key here.

   To turn analytics on (see docs/DEPLOYMENT.md):
     1. Paste the address of YOUR TNS Supabase "ingest" function into ingestUrl.
        Format: "https://YOUR-PROJECT-REF.supabase.co/functions/v1/ingest"
     2. Change enabled to true.
   The website works normally whether analytics are on, off, or unavailable.
   ===================================================================== */
window.TNS_ANALYTICS_CONFIG = {
  enabled: false,
  ingestUrl: ""
};
