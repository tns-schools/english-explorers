/* =====================================================================
   TNS English Explorers — Admin Analytics Dashboard
   ---------------------------------------------------------------------
   • Sign-in: Supabase Auth (email + password). Public sign-up must be OFF;
     administrators are added by hand (see docs/DEPLOYMENT.md).
   • Data: ONLY aggregates from public.admin_report(from, to), which
     refuses anyone not listed in analytics.admin_users (server check).
     A hidden URL is not the security — the database is.
   • Dates are Asia/Riyadh calendar days. Filters apply to every number,
     chart and drill-down view on the page.
   • Nothing is invented: no data → empty states and zeros.
   Views (hash): #overview · #s=<section> · #s=<section>&l=<level>
   ===================================================================== */
(function () {
  "use strict";
  var CFG = window.TNS_ADMIN_CONFIG || {};
  var $ = function (s) { return document.querySelector(s); };
  var app = $("#app");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var fmt = function (n) { return Number(n || 0).toLocaleString("en-US"); };
  var pct = function (a, b) { return b > 0 ? Math.round(100 * a / b) + "%" : "—"; };
  var score = function (v) { return v == null ? "—" : Number(v).toFixed(0) + "%"; };
  var say = function (t) { var s = $("#status"); if (s) s.textContent = t; };
  var LEVELS = ["Little Explorers", "Word Explorers", "Sentence Explorers", "Story Explorers", "Super Explorers"];

  /* ---------- Riyadh dates ---------- */
  function riyadhToday() { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
  function addDays(iso, n) { var d = new Date(iso + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function isISO(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s + "T00:00:00Z")); }
  function rangeFor(preset) {
    var t = riyadhToday();
    if (preset === "today") return { preset: preset, from: t, to: t };
    if (preset === "7") return { preset: preset, from: addDays(t, -6), to: t };
    if (preset === "30") return { preset: preset, from: addDays(t, -29), to: t };
    return { preset: "all", from: null, to: t };
  }
  function rangeText(r) { return r.from ? (r.from === r.to ? r.from : r.from + " to " + r.to) : "All time (up to " + r.to + ")"; }

  /* ---------- Setup checks ---------- */
  if (CFG.supabasePublishableKey && /^sb_secret_|service_role/i.test(CFG.supabasePublishableKey)) {
    app.innerHTML = '<div class="card login-card"><h1>Security warning</h1><p class="err">A secret key was pasted into admin-config.js. Remove it now and rotate (replace) that key in Supabase. Only the publishable key belongs here.</p></div>';
    return;
  }
  var configured = /^https:\/\/[a-z0-9.-]+$/i.test(String(CFG.supabaseUrl || "").replace(/\/$/, "")) && String(CFG.supabasePublishableKey || "").length > 20;
  if (!configured || !window.supabase || !window.supabase.createClient) {
    app.innerHTML = '<div class="card login-card"><h1>Not set up yet</h1><p>Connect this dashboard to the <strong>TNS</strong> Supabase project: enter the Project URL and the publishable key in <code>admin/admin-config.js</code> (see <strong>docs/DEPLOYMENT.md</strong>).</p><p class="muted">No analytics data is available yet.</p></div>';
    return;
  }
  /* The session lives only in this tab (sessionStorage), so shared school computers do not stay signed in. */
  var sb = window.supabase.createClient(CFG.supabaseUrl.replace(/\/$/, ""), CFG.supabasePublishableKey, {
    auth: { persistSession: true, storage: window.sessionStorage, autoRefreshToken: true, detectSessionInUrl: false }
  });

  var range = rangeFor("30"), report = null, loadedAt = null, loading = false;

  /* ---------- Sign-in ---------- */
  function viewLogin(msg) {
    $("#signOut").hidden = true;
    app.innerHTML = '<form class="card login-card" id="login" novalidate><h1>Administrator sign-in</h1><p class="muted">For authorised TNS staff only.</p>' +
      (msg ? '<p class="err" role="alert">' + esc(msg) + "</p>" : "") +
      '<label for="em">Email</label><input id="em" type="email" autocomplete="username" required>' +
      '<label for="pw">Password</label><input id="pw" type="password" autocomplete="current-password" required>' +
      '<div class="btn-row"><button class="btn primary" type="submit" id="loginBtn">Sign in</button></div></form>';
    $("#login").addEventListener("submit", async function (e) {
      e.preventDefault();
      var em = $("#em").value.trim(), pw = $("#pw").value;
      if (!em || !pw) { viewLogin("Please enter your email and password."); return; }
      $("#loginBtn").disabled = true; $("#loginBtn").textContent = "Signing in…";
      try {
        var r = await sb.auth.signInWithPassword({ email: em, password: pw });
        if (r.error) { viewLogin("Sign-in failed. Check your email and password."); return; }
        await afterSignIn();
      } catch (x) { viewLogin("Could not reach the server. Check your connection and try again."); }
    });
    var f = $("#em"); if (f) f.focus();
  }
  async function afterSignIn() {
    var isAdmin = false;
    try { var r = await sb.rpc("admin_whoami"); isAdmin = !r.error && r.data === true; } catch (x) {}
    if (!isAdmin) { try { await sb.auth.signOut(); } catch (x) {} viewLogin("This account is not an administrator for TNS English Explorers."); return; }
    $("#signOut").hidden = false;
    await load();
  }

  /* ---------- Data ---------- */
  async function load() {
    if (loading) return; loading = true;
    renderShell('<div class="card state" aria-busy="true"><p class="loading">Loading statistics…</p></div>');
    try {
      var r = await sb.rpc("admin_report", { p_from: range.from, p_to: range.to });
      if (r.error) throw r.error;
      report = r.data; loadedAt = new Date();
      say("Statistics updated for " + rangeText(range) + ".");
      route();
    } catch (x) {
      var denied = x && (x.code === "42501" || /not authorized/i.test(x.message || ""));
      if (denied) { viewLogin("Your session has ended or this account is not an administrator."); return; }
      renderShell('<div class="card state"><p class="err">The statistics could not be loaded.</p><p class="muted">' + esc((x && x.message) || "Network error") + '</p><button class="btn primary" type="button" data-refresh>Try again</button></div>');
    } finally { loading = false; }
  }

  /* ---------- Shell: date filters + refresh + last updated ---------- */
  function toolbar() {
    var b = function (p, t) { return '<button type="button" data-preset="' + p + '" aria-pressed="' + (range.preset === p) + '">' + t + "</button>"; };
    return '<div class="toolbar" role="group" aria-label="Date range"><span class="seg">' + b("today", "Today") + b("7", "Last 7 days") + b("30", "Last 30 days") + b("all", "All time") + b("custom", "Custom") + "</span>" +
      '<span id="customBox"' + (range.preset === "custom" ? "" : " hidden") + '><label class="sr-only" for="dFrom">From</label><input type="date" id="dFrom" value="' + (range.from || "") + '"> to <label class="sr-only" for="dTo">To</label><input type="date" id="dTo" value="' + range.to + '"> <button type="button" class="btn ghost" id="applyCustom">Apply</button></span>' +
      '<button type="button" class="btn ghost" data-refresh>↻ Refresh</button>' +
      '<span class="meta">Showing: <strong>' + esc(rangeText(range)) + "</strong> (Riyadh time)" + (loadedAt ? " · Last updated " + loadedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "") + "</span></div>";
  }
  function renderShell(body) { app.innerHTML = "<h1>Admin Analytics Dashboard</h1>" + toolbar() + '<div id="view">' + body + "</div>"; }

  app.addEventListener("click", function (e) {
    var p = e.target.closest("[data-preset]");
    if (p) {
      var v = p.getAttribute("data-preset");
      if (v === "custom") { range = { preset: "custom", from: range.from || addDays(riyadhToday(), -29), to: range.to }; renderShell($("#view") ? $("#view").innerHTML : ""); return; }
      range = rangeFor(v); load(); return;
    }
    if (e.target.closest("[data-refresh]")) { load(); return; }
    if (e.target.id === "applyCustom") {
      var f = $("#dFrom").value, t = $("#dTo").value;
      if (!isISO(f) || !isISO(t)) { say("Please choose both dates."); alertBox("Please choose both a start date and an end date."); return; }
      if (f > t) { alertBox("The start date must be before the end date."); return; }
      range = { preset: "custom", from: f, to: t }; load(); return;
    }
    var row = e.target.closest("tr[data-href]");
    if (row && !e.target.closest("a")) location.hash = row.getAttribute("data-href");
  });
  function alertBox(m) { var v = $("#view"); if (v) v.insertAdjacentHTML("afterbegin", '<p class="err" role="alert">' + esc(m) + "</p>"); }

  /* ---------- Charts (plain SVG, no external libraries) ---------- */
  function lineChart(title, rows, key, opt) {
    opt = opt || {};
    var vals = rows.map(function (r) { return r[key] == null ? null : Number(r[key]); });
    var has = vals.some(function (v) { return v; });
    var h = '<div class="card chart"><h3>' + esc(title) + "</h3>";
    if (!rows.length || !has) return h + '<p class="empty">No data in this period yet.</p></div>';
    var W = 520, H = 200, L = 34, B = 26, T = 12, R = 10, max = opt.max || Math.max.apply(null, vals.map(function (v) { return v || 0; })) || 1;
    var x = function (i) { return L + (rows.length === 1 ? (W - L - R) / 2 : i * (W - L - R) / (rows.length - 1)); };
    var y = function (v) { return T + (H - T - B) * (1 - v / max); };
    var bars = opt.bar;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(title) + '"><line class="axis" x1="' + L + '" y1="' + (H - B) + '" x2="' + (W - R) + '" y2="' + (H - B) + '"/>' +
      '<text class="lbl" x="' + (L - 6) + '" y="' + (T + 4) + '" text-anchor="end">' + fmt(max) + (opt.unit || "") + '</text><text class="lbl" x="' + (L - 6) + '" y="' + (H - B) + '" text-anchor="end">0</text>';
    if (bars) {
      var bw = Math.max(2, (W - L - R) / rows.length * 0.7);
      vals.forEach(function (v, i) { if (v) s += '<rect x="' + (x(i) - bw / 2) + '" y="' + y(v) + '" width="' + bw + '" height="' + (H - B - y(v)) + '" rx="2" fill="' + (opt.color || "#1B2A4A") + '"><title>' + esc(rows[i].d) + ": " + fmt(v) + "</title></rect>"; });
    } else {
      var pts = []; vals.forEach(function (v, i) { if (v != null) pts.push(x(i) + "," + y(v)); });
      s += '<polyline fill="none" stroke="' + (opt.color || "#C28B15") + '" stroke-width="2.5" points="' + pts.join(" ") + '"/>';
      vals.forEach(function (v, i) { if (v != null) s += '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="3" fill="' + (opt.color || "#C28B15") + '"><title>' + esc(rows[i].d) + ": " + fmt(v) + (opt.unit || "") + "</title></circle>"; });
    }
    var step = Math.ceil(rows.length / 6);
    rows.forEach(function (r, i) { if (i % step === 0 || i === rows.length - 1) s += '<text class="lbl" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(String(r.d).slice(5)) + "</text>"; });
    return h + s + "</svg></div>";
  }
  function barList(title, items, opt) {
    opt = opt || {};
    var h = '<div class="card chart"><h3>' + esc(title) + "</h3>";
    var max = Math.max.apply(null, items.map(function (i) { return i.v || 0; }));
    if (!items.length || !max) return h + '<p class="empty">No data in this period yet.</p></div>';
    var W = 520, rowH = 24, L = 150, H = items.length * rowH + 6;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(title) + '">';
    items.forEach(function (it, k) {
      var w = (W - L - 60) * (it.v || 0) / max, yy = k * rowH + 4;
      s += '<text class="lbl" x="' + (L - 8) + '" y="' + (yy + 14) + '" text-anchor="end">' + esc(it.label) + '</text><rect x="' + L + '" y="' + yy + '" width="' + Math.max(0, w) + '" height="16" rx="3" fill="' + (it.color || "#1B2A4A") + '"/>' +
        '<text class="val" x="' + (L + w + 6) + '" y="' + (yy + 13) + '">' + (opt.fmt ? opt.fmt(it.v) : fmt(it.v)) + "</text>";
    });
    return h + s + "</svg></div>";
  }

  /* ---------- Views ---------- */
  var COLORS = { phonics: "#6B47B8", spelling: "#0E7A86", speak: "#C2571A", story: "#B8365F", listening: "#2463C9", words: "#23804D", grammar: "#9A5B00", writing: "#4A3FC4", challenge: "#B42828" };
  function kpiCard(v, l, d, gold) { return '<div class="kpi' + (gold ? " gold" : "") + '"><div class="v">' + v + '</div><div class="l">' + esc(l) + '</div><div class="d">' + esc(d) + "</div></div>"; }
  function overview() {
    var R = report, k = R.kpi;
    var total = R.activities.length;
    var h = '<h2 class="sec-h">Overview</h2><div class="kpis">' +
      kpiCard(fmt(k.visits), "Website visits", "Page loads of the student site", true) +
      kpiCard(fmt(k.est_browsers), "Estimated anonymous visitors", "Distinct browsers (not a student count)", true) +
      kpiCard(fmt(k.sessions), "Learning sessions", "New after 30 idle minutes") +
      kpiCard(fmt(k.starts), "Activity starts", "Every attempt counts") +
      kpiCard(fmt(k.completions), "Activity completions", "Every attempt counts", true) +
      kpiCard(fmt(k.first_completions), "First-time completions", "First time a browser finished that activity") +
      kpiCard(fmt(k.repeat_completions), "Repeat practice", "Completions of an activity done before") +
      kpiCard(pct(k.completions, k.starts), "Activity completion rate", "Completions ÷ starts") +
      kpiCard(score(k.avg_score), "Average objective performance", "Scored questions only", true) +
      kpiCard(fmt(k.speaking), "Speaking practice completions", "Self-reported practice, not pronunciation scores") +
      kpiCard(fmt(k.writing), "Writing practice completions", "Self-checked; writing is never sent") +
      kpiCard(fmt(k.checks), "Find Your Level checks", "Optional starting-point check") + "</div>";
    h += '<h2 class="sec-h">Engagement trends</h2><div class="charts">' +
      lineChart("Daily website visits", R.daily, "visits") + lineChart("Daily activity completions", R.daily, "completions", { bar: true }) +
      lineChart("Learning sessions over time", R.daily, "sessions", { color: "#2463C9" }) + lineChart("Repeat practice (daily)", R.daily, "repeats", { bar: true, color: "#C28B15" }) +
      barList("Completions by learning section", R.sections.map(function (s) { return { label: s.name, v: s.completions, color: COLORS[s.id] }; })) +
      barList("Completion rate by section", R.sections.map(function (s) { return { label: s.name, v: s.starts ? Math.round(100 * s.completions / s.starts) : 0, color: COLORS[s.id] }; }), { fmt: function (v) { return v + "%"; } }) +
      lineChart("Average objective performance (daily)", R.daily, "avg_score", { max: 100, unit: "%", color: "#23804D" }) +
      barList("Completions by proficiency level", R.level_distribution.map(function (l) { return { label: "Level " + l.level, v: l.completions }; })) + "</div>";
    h += '<h2 class="sec-h">Learning sections <span class="pill">click a row for levels</span></h2><div class="card tbl-wrap"><table class="tbl"><thead><tr><th>Section</th><th>Opens</th><th>Starts</th><th>Completions</th><th>Repeats</th><th>Completion rate</th><th>Avg. score</th></tr></thead><tbody>';
    R.sections.forEach(function (s) {
      h += '<tr class="click" data-href="#s=' + s.id + '"><td><a href="#s=' + s.id + '">' + esc(s.name) + "</a></td><td>" + fmt(s.opens) + "</td><td>" + fmt(s.starts) + "</td><td>" + fmt(s.completions) + "</td><td>" + fmt(s.completions - s.firsts) + "</td><td>" + pct(s.completions, s.starts) + "</td><td>" + score(s.avg_score) + "</td></tr>";
    });
    h += "</tbody></table></div>";
    var acts = R.activities.slice(), byComp = acts.slice().sort(function (a, b) { return b.completions - a.completions || a.id.localeCompare(b.id); });
    var secName = {}; R.sections.forEach(function (s) { secName[s.id] = s.name; });
    var li = function (a) { return "<li><a href=\"#s=" + a.section + "&l=" + a.level + '">' + esc(a.title) + "</a> <span class=\"small muted\">(" + esc(secName[a.section]) + ", L" + a.level + ")</span> — " + fmt(a.completions) + "</li>"; };
    var opened = R.sections.slice().sort(function (a, b) { return b.opens - a.opens; });
    var sp = acts.filter(function (a) { return a.has_speaking; }), wr = acts.filter(function (a) { return a.has_writing; });
    var used = function (list) { return list.filter(function (a) { return a.completions > 0; }).length; };
    var cd = R.check_distribution, ctot = cd.reduce(function (n, c) { return n + c.count; }, 0);
    h += '<h2 class="sec-h">Insights</h2><div class="insights">' +
      '<div class="card"><h3>Most opened sections</h3><ol>' + opened.slice(0, 5).map(function (s) { return "<li>" + esc(s.name) + " — " + fmt(s.opens) + "</li>"; }).join("") + "</ol></div>" +
      '<div class="card"><h3>Most practiced activities</h3>' + (byComp[0] && byComp[0].completions ? "<ol>" + byComp.filter(function (a) { return a.completions > 0; }).slice(0, 5).map(li).join("") + "</ol>" : '<p class="muted">No completions in this period yet.</p>') + "</div>" +
      '<div class="card"><h3>Least practiced activities</h3><ol>' + byComp.slice(-5).reverse().map(li).join("") + "</ol><p class=\"small muted\">" + fmt(total - used(acts)) + " of " + total + " activities had no completions in this period.</p></div>" +
      '<div class="card"><h3>Speaking & writing practice</h3><p>Speaking: <strong>' + fmt(k.speaking) + "</strong> completions across " + used(sp) + " of " + sp.length + " speaking activities.</p><p>Writing: <strong>" + fmt(k.writing) + "</strong> completions across " + used(wr) + " of " + wr.length + " writing activities.</p><p class=\"small muted\">These are self-reported practice tasks. They are never scored for accuracy.</p></div>" +
      '<div class="card"><h3>Find Your Level</h3><p>' + fmt(ctot) + " checks completed.</p>" + (ctot ? "<ol>" + cd.map(function (c) { return "<li>Level " + c.level + " (" + LEVELS[c.level - 1] + "): " + fmt(c.count) + " (" + pct(c.count, ctot) + ")</li>"; }).join("") + "</ol>" : "") + "</div></div>";
    h += definitions();
    return h;
  }
  function sectionView(id) {
    var s = report.sections.filter(function (x) { return x.id === id; })[0]; if (!s) return overview();
    var h = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#overview">Overview</a> › <span>' + esc(s.name) + "</span></nav><h2>" + esc(s.name) + "</h2>" +
      '<div class="kpis">' + kpiCard(fmt(s.opens), "Section opens", "") + kpiCard(fmt(s.starts), "Activity starts", "") + kpiCard(fmt(s.completions), "Completions", "") + kpiCard(fmt(s.completions - s.firsts), "Repeat practice", "") + kpiCard(pct(s.completions, s.starts), "Completion rate", "") + kpiCard(score(s.avg_score), "Avg. objective score", "") + "</div>";
    h += '<div class="charts">' + barList("Completions by level", s.levels.map(function (l) { return { label: "Level " + l.level, v: l.completions, color: COLORS[id] }; })) + "</div>";
    h += '<h3 class="sec-h">Levels <span class="pill">click a row for activities</span></h3><div class="card tbl-wrap"><table class="tbl"><thead><tr><th>Level</th><th>Opens</th><th>Starts</th><th>First completions</th><th>Repeats</th><th>Total completions</th><th>Completion rate</th><th>Avg. score</th></tr></thead><tbody>';
    s.levels.forEach(function (l) {
      var href = "#s=" + id + "&l=" + l.level;
      h += '<tr class="click" data-href="' + href + '"><td><a href="' + href + '">Level ' + l.level + " — " + LEVELS[l.level - 1] + "</a></td><td>" + fmt(l.opens) + "</td><td>" + fmt(l.starts) + "</td><td>" + fmt(l.firsts) + "</td><td>" + fmt(l.completions - l.firsts) + "</td><td>" + fmt(l.completions) + "</td><td>" + pct(l.completions, l.starts) + "</td><td>" + score(l.avg_score) + "</td></tr>";
    });
    return h + '</tbody></table></div><p><a class="btn ghost" href="#overview">← Back to overview</a></p>';
  }
  function levelView(id, lvl) {
    var s = report.sections.filter(function (x) { return x.id === id; })[0]; if (!s) return overview();
    var acts = report.activities.filter(function (a) { return a.section === id && a.level === lvl; });
    var showPractice = acts.some(function (a) { return a.has_speaking || a.has_writing; });
    var h = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#overview">Overview</a> › <a href="#s=' + id + '">' + esc(s.name) + "</a> › <span>Level " + lvl + "</span></nav><h2>" + esc(s.name) + " — Level " + lvl + " (" + LEVELS[lvl - 1] + ")</h2>";
    h += '<div class="card tbl-wrap"><table class="tbl"><thead><tr><th>Activity</th><th>Starts</th><th>First completions</th><th>Repeats</th><th>Total completions</th><th>Completion rate</th><th>Avg. score</th>' + (showPractice ? "<th>Practice completions</th>" : "") + "</tr></thead><tbody>";
    acts.forEach(function (a, k) {
      h += "<tr><td>" + (k + 1) + ". " + esc(a.title) + ' <span class="small muted">(' + esc(a.id) + ")</span></td><td>" + fmt(a.starts) + "</td><td>" + fmt(a.firsts) + "</td><td>" + fmt(a.repeats) + "</td><td>" + fmt(a.completions) + "</td><td>" + pct(a.completions, a.starts) + "</td><td>" + (a.scored_items ? score(a.avg_score) : "—") + "</td>" +
        (showPractice ? "<td>" + (a.has_speaking || a.has_writing ? fmt(a.completions) + (a.has_speaking ? " speaking" : " writing") : "—") + "</td>" : "") + "</tr>";
    });
    h += '</tbody></table></div><p class="small muted">Average score counts only scored questions. Speaking and writing tasks are self-reported practice and are never scored.</p>';
    return h + '<p><a class="btn ghost" href="#s=' + id + '">← Back to ' + esc(s.name) + '</a> <a class="btn ghost" href="#overview">Overview</a></p>';
  }
  function definitions() {
    return '<details class="card defs"><summary><strong>What do these numbers mean?</strong></summary><dl>' +
      "<dt>Dates</dt><dd>Riyadh calendar days (Asia/Riyadh). \"Last 7 days\" includes today. Every number, chart and table follows the selected dates.</dd>" +
      "<dt>Website visits</dt><dd>Each time the student website is opened or reloaded.</dd>" +
      "<dt>Estimated anonymous visitors</dt><dd>Distinct random browser codes. One student can use several devices, and several students can share one device, so this is an estimate — not a count of students.</dd>" +
      "<dt>Learning sessions</dt><dd>A session starts when a browser is used after 30 minutes or more of no activity.</dd>" +
      "<dt>Starts and completions</dt><dd>Every attempt counts. Completion rate = completions ÷ starts.</dd>" +
      "<dt>First-time and repeat completions</dt><dd>A first-time completion is the first time a browser finished that activity, worked out by the server. Later completions of the same activity are repeat practice.</dd>" +
      "<dt>Average objective performance</dt><dd>The average percentage of correct answers in completed activities, counting only automatically checked questions.</dd>" +
      "<dt>Speaking and writing practice</dt><dd>Completions of activities with speaking or writing practice. Students confirm their own practice. No voices or writing are collected, and they are never scored.</dd></dl></details>";
  }
  function route() {
    if (!report) return;
    var m = /^#s=([a-z]+)(?:&l=([1-5]))?$/.exec(location.hash || "");
    var body = m ? (m[2] ? levelView(m[1], Number(m[2])) : sectionView(m[1])) : overview();
    renderShell(body);
    var h = $("#view h2"); if (h && m) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }
  window.addEventListener("hashchange", route);

  $("#signOut").addEventListener("click", async function () { try { await sb.auth.signOut(); } catch (x) {} report = null; viewLogin(); say("Signed out."); });
  (async function () {
    try { var r = await sb.auth.getSession(); if (r.data && r.data.session) { await afterSignIn(); return; } } catch (x) {}
    viewLogin();
  })();
})();
