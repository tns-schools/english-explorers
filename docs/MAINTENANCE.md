# Maintenance and update guide — TNS English Explorers

## How the project is organised
```
index.html            student website (one page; hash addresses like #/s/phonics/2)
css/styles.css        all styles
js/                   app.js (pages) · engine.js (all activity types) · audio.js (playback)
                      progress.js (saved progress) · analytics.js (anonymous events)
                      audio-id.js (audio file names) · visuals.js (SVG pictures) · letters.js · check.js
data/                 CONTENT — one file per section, plus sections.js, achievements.js, check.js
audio/                speech/ slow/ male/ female2/ male2/ reading/ listening/  (+ phonics/sounds/ from the teacher)
                      manifest.json (every recording + exact script) · validation-report.json
admin/                Admin Analytics Dashboard
supabase/             database SQL, generated seed, ingest Edge Function
tools/                validators, audio generator, tests (not needed on the live site)
docs/                 this guide, deployment, checklists, QA report
```
Storage key in browsers: `tns-english-explorers-v1` (never change it, or students lose their progress).

## Changing or adding content
All learning content is in `data/<section>.js`. Each activity set looks like this:
```js
{ id: "sp-2-3", title: "School and Classroom Words", goal: "…",
  learn: [ { title: "…", text: "…", examples: [ { t: "book", vis: "📖" } ] } ],
  items: [ { type: "type", q: "Listen and type the word.", say: "desk", hide: true, answer: "desk" }, … ] }
```
Question types: `choice` · `type` · `letters` · `words` · `match` (scored) and `speak` · `dialogue` · `write` (practice, never scored).
- `say` = text spoken by the narrator. The audio file name is worked out automatically from the text.
- `hide: true` = do not show the spoken text (for listening and dictation).
- `vis` = an emoji, or `svg:name` for a local drawing in `js/visuals.js`. Never use web image links.
- Set IDs must follow `code-level-number` (e.g. `wd-3-2`). Do not rename IDs after launch (progress and analytics use them).
- Stories: `passage: { title, paras: [...] }`. Longer listening: `clip: { lines: [{ sp, voice: "f"|"m", t }] }`.

## After any content change — run these (on a computer with Node.js 22+ and Python 3)
```
node tools/validate.mjs --require-all       # structure, answers, counts, pictures
node tools/build-manifest.mjs               # updates audio/manifest.json from the content
python3 tools/generate_audio.py             # makes ONLY new/changed recordings (free, offline after first run)
python3 tools/validate_audio.py             # checks every recording
node tools/build-sql.mjs                    # if activities were added/renamed → re-run supabase/seed/activities.sql in Supabase
python3 tools/e2e.py                        # optional: full browser test
node tools/build-docs.mjs                   # refresh checklists and inventory
```
Audio generator setup (once): `pip install kokoro-onnx soundfile` and have `ffmpeg` installed. The script downloads the free voice model (~350 MB) to `tools/models/` the first time. No API key, no cost.

## Teacher letter sounds
See `docs/TEACHER-SOUND-RECORDING.md`, then run `python3 tools/import_teacher_sounds.py <folder>`. The buttons appear automatically.

## Analytics
- Switch on/off: `analytics-config.js` (`enabled`).
- Add/remove administrators: SQL in `docs/DEPLOYMENT.md`, Part C2.
- If you add activities, re-run `supabase/seed/activities.sql` **and** redeploy the `ingest` function with the new `catalog.json`. Otherwise new activities are rejected (the site keeps working; only those statistics are missing).
- Old events can be deleted any time, e.g. `delete from analytics.events where created_at < now() - interval '2 years';`

## Common questions
- **A student lost their progress** — progress is per device and browser; clearing browser data or using another device starts fresh.
- **Audio does not play on an iPhone** — check the silent switch and volume; audio always starts from a tap.
- **The dashboard says "not an administrator"** — the account is missing from `analytics.admin_users`.
