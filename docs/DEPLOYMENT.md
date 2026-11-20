# Deployment guide — TNS English Explorers

This sets up three things, all **separate from NVS English Quest**:

1. the student website on **GitHub Pages**
2. a **new Supabase project** for anonymous analytics
3. the **Admin Analytics Dashboard** at `/admin/`

The website works even before step 2. Analytics stay off until you finish step 2 and switch them on.

You will need: a GitHub account (school account preferred) and a Supabase account. Allow about 45 minutes.

---

## Part A — Website on GitHub Pages (≈10 minutes)

1. On GitHub, create a **new repository**, e.g. `tns-english-explorers`. Public is fine (no secrets are in the files). **Do not reuse the NVS repository.**
2. Upload the **contents** of the project folder (not the folder itself) so `index.html` is at the top level. Upload everything **except** `tools/models/` (large voice-model files, only needed to make audio) and `node_modules/` if present.
   - Easiest: on your computer, unzip the release, then drag the files into GitHub's **Add file → Upload files** page. GitHub accepts up to 100 files per upload, so upload the `audio` folder in a few batches, or use GitHub Desktop (recommended: one commit, no limits).
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
4. After 1–2 minutes the site is live at `https://YOUR-ACCOUNT.github.io/tns-english-explorers/`.

Size check: the whole site is about 40 MB (1,294 recordings, about 57 minutes of audio). GitHub Pages allows sites up to 1 GB, and every file is far below GitHub's 100 MB file limit.

---

## Part B — Supabase analytics (≈25 minutes)

### B1. Create the project
1. Go to supabase.com → **New project**. Name: `tns-english-explorers`. Region: closest to Saudi Arabia (e.g. *Middle East* or *Frankfurt*). Save the database password in a safe place (it is **not** needed in any website file).
2. Wait until the project is ready.

### B2. Create the database
1. **SQL Editor → New query**. Paste all of `supabase/migrations/001_tns_analytics.sql` and click **Run**.
2. New query: paste all of `supabase/seed/activities.sql` and click **Run**. (It is safe to run again later if activities are added.)
3. Check: **Table Editor → schema `analytics`** shows `activities` with **250 rows** and `sections` with **9 rows**.

### B3. Deploy the ingest function — and avoid the NVS 401 problem
The student site never signs in, so this function **must not require a JWT**. In NVS English Quest, the setting *Verify JWT with legacy secret* was ON, and every event failed with **HTTP 401**. Here it is switched off **for this one function only**.

**Option 1 — Supabase dashboard (no tools needed)**
1. **Edge Functions → Deploy a new function → Via editor**. Name it exactly `ingest`.
2. Create three files in the editor with the same names and contents as in `supabase/functions/ingest/`: `index.ts`, `validate.ts`, `catalog.json`. Deploy.
3. Open the function → **Details** (or Settings) → turn **OFF** “**Verify JWT with legacy secret**” (it may be called *Enforce JWT verification*). Save.

**Option 2 — Supabase CLI**
```
supabase link --project-ref YOUR-PROJECT-REF
supabase functions deploy ingest --no-verify-jwt
```
(`supabase/config.toml` also sets `verify_jwt = false` for `ingest`.) Then still check the dashboard switch above is OFF.

### B4. Function secrets
**Edge Functions → Secrets** (or *Manage secrets*), add:

| Name | Value |
|---|---|
| `ALLOWED_ORIGINS` | your site's **origin only**, e.g. `https://YOUR-ACCOUNT.github.io` |
| `IP_HASH_SALT` | any long random text (e.g. 40 random letters and numbers) |

**Origin, not page address.** ✅ `https://tns-school.github.io` ❌ `https://tns-school.github.io/tns-english-explorers/` (no path, no trailing slash). If you later use a custom domain, add it too, separated by a comma.

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided to the function automatically. **Never** put the service-role key in any website file.

### B5. Switch analytics on in the website
Edit `analytics-config.js`:
```js
window.TNS_ANALYTICS_CONFIG = {
  enabled: true,
  ingestUrl: "https://YOUR-PROJECT-REF.supabase.co/functions/v1/ingest"
};
```
Commit the change on GitHub.

---

## Part C — Admin dashboard (≈10 minutes)

### C1. Turn off public sign-up
**Authentication → Sign In / Providers** (or *Settings*) → turn **OFF** “Allow new users to sign up”. Keep the Email provider enabled.

### C2. Create the administrator account(s)
1. **Authentication → Users → Add user → Create new user**: enter the admin's email and a strong password. Tick *Auto confirm*.
2. Copy the new user's **UID**.
3. **SQL Editor**, run (replace the values):
```sql
insert into analytics.admin_users (user_id, email)
values ('PASTE-THE-UID-HERE', 'admin@example.com');
```
Repeat for each administrator. To remove access: `delete from analytics.admin_users where email = 'admin@example.com';`

### C3. Connect the dashboard
Edit `admin/admin-config.js`:
```js
window.TNS_ADMIN_CONFIG = {
  supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
  supabasePublishableKey: "sb_publishable_..."   // Project Settings → API Keys → Publishable key
};
```
The publishable key is public by design; data is protected by the database. The dashboard refuses to run if a secret key is pasted by mistake.

Open `https://YOUR-ACCOUNT.github.io/tns-english-explorers/admin/` and sign in.

---

## Part D — Live verification (≈10 minutes, do this once)

A local test is **not** proof that production works. Please do these checks on the live site:

1. Open the student site in a **private/incognito** window. Open any activity and finish it.
2. In Supabase **Table Editor → analytics → events**, you should see new rows (`visit`, `session_start`, `section_open`, `level_open`, `activity_start`, `activity_complete`).
   - No rows? Open the browser's developer tools → **Network**, filter “ingest”:
     - **401** → JWT verification is still ON (Part B3, step 3).
     - **403** → `ALLOWED_ORIGINS` does not exactly match the site origin (Part B4).
     - **400** → the seed (Part B2, step 2) was not run, or content changed — re-run `activities.sql`.
     - **No request at all** → `analytics-config.js` still has `enabled: false` or the wrong address.
3. Open the **Admin dashboard**, choose **Today**, click **Refresh**. The completed activity appears in the KPIs, in its section, and in **section → level → activity**.
4. Complete the **same** activity again and refresh: *Repeat practice* goes up by 1, *First-time completions* stays the same.

Then tick these:

| ✓ | Check |
|---|---|
| ☐ | Student site opens, logo and “National Track \| Grades 1–5” visible |
| ☐ | Events arrive in `analytics.events` |
| ☐ | Dashboard sign-in works; a non-admin account is refused |
| ☐ | New completion appears in the dashboard (overview + drill-down) |
| ☐ | iPhone: audio plays on tap, Stop works, switching recordings stops the previous one |
| ☐ | iPad: same audio checks, portrait and landscape |
| ☐ | Audio listening checklist reviewed (`docs/AUDIO-LISTENING-CHECKLIST.md`) |

## Security summary
- No secrets are in any website file. The service-role key lives only inside Supabase.
- Analytics tables have Row Level Security on with no public policies: the public cannot read them.
- The ingest function accepts only known event types and real activity IDs, limits size and rate, ignores duplicates, and rejects other origins. CORS alone is not treated as security.
- The admin report checks the admin list on the server for every request.
