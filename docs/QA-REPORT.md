# QA report — TNS English Explorers

Generated: 2026-11-20 12:15 UTC

**Release status: RELEASE CANDIDATE — not yet launch-ready.** All automated checks below were actually run. Launch also needs the
items under “Outstanding (needs a person)”, which cannot be done from the build machine.

## Summary
| Area | Result | Evidence |
|---|---|---|
| Content structure (9 sections, 45 levels, 250 sets, 50 passages, Find Your Level) | ✅ Passed | `node tools/validate.mjs --require-all` |
| Audio files (1294 recordings) | ✅ Passed — 1294/1294 valid, 57.1 min | `python3 tools/validate_audio.py` |
| Every scored activity completed from its answer key (simulated browser) | ✅ Passed — 250/250 sets at 100% / 3 stars | `python3 tools/e2e.py` |
| Wrong-answer runs (feedback, scoring, best score kept) | ✅ Passed — 45 runs | `python3 tools/e2e.py` |
| App checks (progress, reset, audio, Find Your Level, certificate, layouts) | ✅ Passed — 79/79 | `python3 tools/e2e.py` |
| Analytics database (real SQL on PostgreSQL/PGlite) | ✅ Passed — 64/64 | `node --experimental-strip-types tools/test-analytics.mjs` |
| Events sent by the real site pass server validation | ✅ Passed — 8 events | `python3 tools/e2e_analytics_client.py` |
| Admin dashboard (simulated Supabase server) | ✅ Passed — 29/29 | `python3 tools/e2e_admin.py` |

## Kinds of testing (what each one does and does not prove)
- **Automated browser testing** — headless Chromium (Playwright) on this build machine. Proves the logic and pages work.
- **Simulated mobile** — the same engine with phone/tablet screen sizes and touch. Proves layouts do not overflow. It is **not** Safari on an iPhone.
- **Physical devices** — **not done**. iPhone/iPad Safari audio must be checked by a person (Outstanding, below).
- **Database** — the real migration SQL ran on PostgreSQL (PGlite) with a stand-in for Supabase's auth. Not the live Supabase project.
- **Dashboard** — the real dashboard code, with Supabase's responses simulated from the real SQL report output.

## App checks (browser)
| Check | Result | Detail |
|---|---|---|
| Home shows 9 section cards | ✅ | 9 |
| Header shows National Track | Grades 1–5 | ✅ |  |
| Official logo loads | ✅ |  |
| ph-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ph-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ph-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ph-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ph-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sp-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sp-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sp-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sp-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sp-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sk-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sk-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sk-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sk-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| sk-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| st-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| st-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| st-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| st-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| st-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| li-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| li-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| li-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| li-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| li-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wd-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wd-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wd-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wd-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wd-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| gr-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| gr-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| gr-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| gr-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| gr-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wr-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wr-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wr-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wr-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| wr-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ch-1-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ch-2-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ch-3-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ch-4-1: repeating with a lower score keeps best stars | ✅ | 3 |
| ch-5-1: repeating with a lower score keeps best stars | ✅ | 3 |
| Progress survives reload | ✅ | 250 |
| Reset clears progress | ✅ |  |
| Reset leaves other sites' data alone | ✅ |  |
| Storage key is TNS-specific | ✅ |  |
| Audio plays after a tap | ✅ |  |
| Only one recording plays at a time | ✅ | {"n": 1, "on": 1} |
| Leaving a page stops audio | ✅ |  |
| Missing audio shows 'Try again' | ✅ |  |
| Find Your Level perfect suggests Level 5 | ✅ | Level 5
Super Explorers |
| Find Your Level all wrong suggests Level 1 | ✅ | Level 1
Little Explorers |
| Find Your Level never locks levels (all 5 level tabs still open) | ✅ |  |
| All five levels are reachable without completing earlier ones | ✅ |  |
| No horizontal overflow: iphone-se home | ✅ | 0px |
| No horizontal overflow: iphone-se section | ✅ | 0px |
| No horizontal overflow: iphone-se activity | ✅ | 0px |
| No horizontal overflow: iphone-14 home | ✅ | 0px |
| No horizontal overflow: iphone-14 section | ✅ | 0px |
| No horizontal overflow: iphone-14 activity | ✅ | 0px |
| No horizontal overflow: ipad-portrait home | ✅ | 0px |
| No horizontal overflow: ipad-portrait section | ✅ | 0px |
| No horizontal overflow: ipad-portrait activity | ✅ | 0px |
| No horizontal overflow: ipad-landscape home | ✅ | 0px |
| No horizontal overflow: ipad-landscape section | ✅ | 0px |
| No horizontal overflow: ipad-landscape activity | ✅ | 0px |
| No horizontal overflow: android-small home | ✅ | 0px |
| No horizontal overflow: android-small section | ✅ | 0px |
| No horizontal overflow: android-small activity | ✅ | 0px |
| No horizontal overflow: desktop home | ✅ | 0px |
| No horizontal overflow: desktop section | ✅ | 0px |
| No horizontal overflow: desktop activity | ✅ | 0px |
| No console errors | ✅ |  |

### Answer-key runs by section
| Section code | Passed |
|---|---|
| ph | 25/25 |
| sp | 25/25 |
| sk | 25/25 |
| st | 50/50 |
| li | 25/25 |
| wd | 25/25 |
| gr | 25/25 |
| wr | 25/25 |
| ch | 25/25 |

## Analytics database tests
| Check | Result |
|---|---|
| Migration and seed run without errors | ✅ |
| 250 activities seeded | ✅ |
| Seed can be re-run safely | ✅ |
| anon cannot read events | ✅ |
| authenticated (non-admin) cannot read events | ✅ |
| anon cannot call the ingest function directly | ✅ |
| anon cannot call admin_report | ✅ |
| non-admin user is refused by admin_report | ✅ |
| admin_whoami false for non-admin | ✅ |
| admin_whoami true for admin | ✅ |
| anon cannot insert events | ✅ |
| valid completion passes | ✅ |
| unknown activity rejected | ✅ |
| wrong section for activity rejected | ✅ |
| wrong scored count rejected | ✅ |
| correct > scored rejected | ✅ |
| unknown event type rejected | ✅ |
| bad browser code rejected | ✅ |
| extra fields are dropped (e.g. a name) | ✅ |
| array body rejected | ✅ |
| origins parse without paths | ✅ |
| ingest visit | ✅ |
| ingest visit | ✅ |
| ingest session_start | ✅ |
| ingest section_open phonics | ✅ |
| ingest level_open phonics | ✅ |
| ingest activity_start ph-1-1 | ✅ |
| ingest activity_complete ph-1-1 | ✅ |
| ingest activity_start ph-1-1 | ✅ |
| ingest activity_complete ph-1-1 | ✅ |
| ingest visit | ✅ |
| ingest activity_start sk-2-1 | ✅ |
| ingest activity_complete sk-2-1 | ✅ |
| ingest activity_start wr-3-1 | ✅ |
| ingest activity_complete wr-3-1 | ✅ |
| ingest check_complete | ✅ |
| first copy of an event is stored | ✅ |
| duplicate event ID is ignored | ✅ |
| DB rejects activity in the wrong section | ✅ |
| DB rejects wrong scored count | ✅ |
| DB rejects unknown type | ✅ |
| burst from one network is rate-limited | ✅ |
| raw IP addresses are never stored | ✅ |
| Today: visits = 2 (00:30 Riyadh counts as the 20th) | ✅ |
| Today: estimated browsers = 2 | ✅ |
| Today: completions = 3 | ✅ |
| Today: first completions = 2 (server ignores the browser's second 'first') | ✅ |
| Today: repeat completions = 1 | ✅ |
| Today: starts = 3 | ✅ |
| Today: speaking completions = 1 | ✅ |
| Today: writing completions = 0 | ✅ |
| Today: average score = (80 + 100 + 100) / 3 = 93.3 | ✅ |
| Drill-down: Phonics opens 1, completions 2 | ✅ |
| Drill-down: Phonics Level 1 completions 2, firsts 1 | ✅ |
| Drill-down: activity ph-1-1 starts 2, firsts 1, repeats 1, avg 90 | ✅ |
| Report lists all 9 sections × 5 levels | ✅ |
| Report lists all 250 activities (including zero-use ones) | ✅ |
| Yesterday: visits = 1 (23:30 Riyadh) | ✅ |
| Last 7 days excludes Nov 10 | ✅ |
| All time: visits = 4 | ✅ |
| All time: writing = 1, checks = 1, check distribution Level 3 = 1 | ✅ |
| All time: daily series starts at the first event day | ✅ |
| Zero-data range returns zeros, not errors | ✅ |
| Invalid range (from > to) is refused | ✅ |

## Admin dashboard tests
| Check | Result |
|---|---|
| Unconfigured dashboard shows 'Not set up yet' | ✅ |
| Secret key in config triggers a security warning | ✅ |
| Sign-in form appears | ✅ |
| Wrong password shows an error | ✅ |
| Non-admin account is refused | ✅ |
| Default range is the last 30 days | ✅ |
| All time sends p_from = null | ✅ |
| KPI: visits shown from the report | ✅ |
| KPI: completions shown from the report | ✅ |
| KPI: average score shown | ✅ |
| KPI: speaking and writing practice shown | ✅ |
| Charts are drawn | ✅ |
| All 9 sections in the table | ✅ |
| Today sends from = to = Riyadh today | ✅ |
| Last 7 days spans 7 calendar days | ✅ |
| Custom range with start after end is refused | ✅ |
| Custom range sends chosen dates | ✅ |
| Zero-data range shows empty chart states | ✅ |
| Clicking Phonics Planet opens its levels | ✅ |
| Section KPIs match the report | ✅ |
| Clicking Level 1 shows its 5 activities | ✅ |
| Activity row shows starts / first / repeats / total | ✅ |
| Breadcrumb goes back to the section | ✅ |
| Breadcrumb goes back to the overview | ✅ |
| Speaking activities show practice completions column | ✅ |
| Server error shows an error state with Try again | ✅ |
| Sign out returns to sign-in | ✅ |
| Dashboard has no page-level horizontal overflow on a phone | ✅ |
| No JavaScript errors | ✅ |

## Issue tracker (found and fixed during QA)
| # | Issue | Fix | Status |
|---|---|---|---|
| 1 | Header logo looked small because of the white margin in the supplied file | Header and homepage use a copy with only the white border removed; verified pixel-identical to the original artwork. The original file is kept unchanged for certificates | Fixed |
| 2 | Very new emoji (playground slide, nest, wheel) do not show on older iPads | Replaced with long-supported emoji; flag and polar-bear emoji also replaced (do not render on Windows) | Fixed |
| 3 | Two speakers of the same gender in a dialogue had the same voice | Added second female/male voices for dialogues only; main narrator unchanged | Fixed |
| 4 | Grammar match question had duplicate items in one column (have/has) — impossible to answer by tapping | Replaced with a single-answer question; validator now blocks duplicate match items | Fixed |
| 5 | Challenge item used homophones through/threw — identical audio, so unfair | Changed distractor to 'throw' | Fixed |
| 6 | Challenge picture question said 'a cat in a box' but showed a ball | Script changed to 'The ball is in the box' with matching pictures | Fixed |
| 7 | Listening question used an emoji that did not clearly show 'a sleeping cat' | Replaced with clear picture options (cat and dog / two cats / two dogs) | Fixed |
| 8 | Word-pair cards (e.g. 'big · large') would make the voice read symbols | Spoken text now 'big, large' | Fixed |
| 9 | Writing letter-tile items had no picture or audio prompt | Added pictures and audio; validator requires a prompt | Fixed |
| 10 | Dashboard 'most practiced' list padded with zero-use activities | Only activities with completions are listed | Fixed |
| 11 | Mobile header wrapped onto four lines; home page needed long scrolling on phones | Tighter header and a 2-column section grid on phones | Fixed |
| 12 | 'Start' text on activity cards had low contrast | Darker gold text | Fixed |
| 13 | Spelling lesson examples had text and display swapped, so the narrator would have read 's – u – n' as letter names instead of the word 'sun' (found by the audio length check) | Corrected the examples; recordings regenerated; old files removed | Fixed |
| 14 | Slow speaking models were only about 15% slower than normal — too little to help | Regenerated all 111 slow models at 0.75 speed | Fixed |
| 15 | 'Do it again' on the Find Your Level result did nothing (it linked to the page already open) | Now a button that restarts the check; covered by the browser test | Fixed |
| 16 | Story and listening pages said 'Start Practice' before the questions | Now 'Start the Questions' | Fixed |

## Outstanding (needs a person)
| # | Item | Why it cannot be automated here |
|---|---|---|
| 1 | Listen to the recordings in `docs/AUDIO-LISTENING-CHECKLIST.md` (groups 1–4 in full, 5–8 spot checks) | No speech-recognition tool is available on the build machine; a file existing is not proof it says the right thing |
| 2 | iPhone and iPad Safari: audio on tap, Stop, switching recordings, audio after changing pages | Needs real Apple devices |
| 3 | Create the GitHub repository and the TNS Supabase project, then follow `docs/DEPLOYMENT.md` | Needs the school's accounts |
| 4 | Live check: complete an activity on the live site and see it in the dashboard (Deployment Part D) | Needs the live deployment |
| 5 | Optional: teacher records the letter sounds (`docs/TEACHER-SOUND-RECORDING.md`) | Human recording; Phonics works without it |
| 6 | Optional: confirm the two new dialogue voices (af_bella, am_fenrir) are acceptable | Voice choice |
