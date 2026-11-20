/* =====================================================================
   TNS English Explorers — App: pages and navigation
   Addresses (hash routes, so the site works on GitHub Pages):
     #/                 Home
     #/s/<section>/<n>  A section, showing level n
     #/a/<setId>        An activity set
     #/progress  #/check  #/help  #/privacy
   ===================================================================== */
(function () {
  "use strict";
  var T = window.TNS, main = document.getElementById("main");
  var SEC = {}, CODE = {}, CONTENT = {}, LOADING = {};
  T.SECTIONS.forEach(function (s) { SEC[s.id] = s; CODE[s.code] = s; });
  var current = null;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function total(s) { return s.setsPerLevel * 5; }

  /* ---------- Content loading (one file per section, loaded on demand) ---------- */
  T.register = function (id, data) { CONTENT[id] = data; };
  function load(id) {
    if (CONTENT[id]) return Promise.resolve(CONTENT[id]);
    if (LOADING[id]) return LOADING[id];
    LOADING[id] = new Promise(function (resolve, reject) {
      var sc = document.createElement("script");
      sc.src = SEC[id].file + "?v=" + (T.VERSION || "1");
      sc.onload = function () { CONTENT[id] ? resolve(CONTENT[id]) : reject(new Error("empty")); };
      sc.onerror = function () { delete LOADING[id]; sc.remove(); reject(new Error("load")); };
      document.head.appendChild(sc);
    });
    return LOADING[id];
  }
  T.load = load;
  function findSet(setId) {
    var code = setId.split("-")[0], s = CODE[code];
    if (!s) return Promise.reject(new Error("unknown"));
    return load(s.id).then(function (c) {
      for (var l = 0; l < c.levels.length; l++) for (var k = 0; k < c.levels[l].sets.length; k++) if (c.levels[l].sets[k].id === setId) return { sec: s, level: l + 1, set: c.levels[l].sets[k] };
      throw new Error("missing");
    });
  }
  function loadError(back) {
    main.innerHTML = '<div class="card notice"><h1>Oops! This page could not open.</h1><p>Please check your internet connection and try again.</p>' +
      '<div class="btn-row"><button class="btn primary" type="button" onclick="location.reload()">Try again</button><a class="btn ghost" href="' + (back || "#/") + '">Go back</a></div></div>';
  }

  /* ---------- Home ---------- */
  function home() {
    var P = window.TNSProgress, last = P.get().last, tot = P.totals();
    var h = '<section class="hero">' +
      '<div class="hero-logo"><img src="assets/brand/tns-logo-trimmed.png" alt="Tarbyh Namouthajiyah Schools logo" width="507" height="388"></div>' +
      '<div class="hero-text"><h1>TNS English Explorers</h1><p class="hero-track">National Track | Grades 1–5</p>' +
      '<p class="hero-tag">Listen. Speak. Read. Spell. Explore.</p>' +
      "<p class=\"hero-welcome\">Welcome, explorer! Pick a place to explore, choose a level, and start learning English. You can go at your own pace.</p>" +
      (last ? '<a class="btn primary big" href="' + esc(last.route) + '">▶ Continue Exploring<span class="cont-t">' + esc(last.title) + "</span></a>" : '<a class="btn primary big" href="#/check">🧭 Find Your Level</a>') +
      "</div></section>";
    h += '<section aria-labelledby="exploreH"><h2 id="exploreH" class="sec-h">Where do you want to explore?</h2><ul class="sec-grid">';
    T.SECTIONS.forEach(function (s) {
      var st = P.sectionStats(s.id), n = total(s), pct = Math.round(100 * st.done / n);
      h += '<li><a class="sec-card" href="#/s/' + s.id + '" style="--c:' + s.color + ";--t:" + s.tint + '">' +
        '<span class="sec-ic" aria-hidden="true">' + s.icon + '</span><span class="sec-name">' + esc(s.name) + "</span>" +
        '<span class="sec-desc">' + esc(s.desc) + "</span>" +
        '<span class="sec-prog"><span class="bar sm" aria-hidden="true"><span style="width:' + pct + '%"></span></span><span class="small">' + st.done + " of " + n + " done · ★ " + st.stars + "</span></span>" +
        '<span class="sec-go">Explore →</span></a></li>';
    });
    h += "</ul></section>";
    h += '<section class="home-row">' +
      '<a class="card mini" href="#/progress"><span class="mini-ic" aria-hidden="true">⭐</span><span><strong>My Progress</strong><br><span class="small">' + tot.done + " activities · " + tot.stars + " stars</span></span></a>" +
      '<a class="card mini" href="#/check"><span class="mini-ic" aria-hidden="true">🧭</span><span><strong>Find Your Level</strong><br><span class="small">A short, optional check to help you choose where to start.</span></span></a>' +
      '<a class="card mini" href="#/help"><span class="mini-ic" aria-hidden="true">❓</span><span><strong>How to Use</strong><br><span class="small">Three easy steps.</span></span></a></section>';
    h += '<section class="card how" aria-labelledby="howH"><h2 id="howH">How to use TNS English Explorers</h2><ol class="how-steps">' +
      "<li><strong>Choose a place.</strong> Tap one of the nine places above.</li>" +
      "<li><strong>Choose a level.</strong> Levels go from 1 (easiest) to 5. You can use different levels in different places.</li>" +
      "<li><strong>Learn and practice.</strong> Tap <span class=\"kbd\">🔊 Listen</span> to hear English. Answer the questions and collect stars!</li></ol></section>";
    main.innerHTML = h;
  }

  /* ---------- Section page ---------- */
  function section(id, lvl) {
    var s = SEC[id]; if (!s) return notFound();
    lvl = Math.min(5, Math.max(1, parseInt(lvl, 10) || 1));
    main.innerHTML = '<p class="loading">Loading…</p>';
    load(id).then(function (c) {
      if (current !== "s/" + id + "/" + lvl) return;
      var P = window.TNSProgress;
      var h = '<div class="sec-head" style="--c:' + s.color + ";--t:" + s.tint + '"><a class="back" href="#/">← Home</a>' +
        '<h1><span aria-hidden="true">' + s.icon + "</span> " + esc(s.name) + '</h1><p class="sec-intro">' + esc(c.intro || s.desc) + "</p></div>";
      h += '<nav class="levels" aria-label="Levels" style="--c:' + s.color + '">';
      for (var L = 1; L <= 5; L++) {
        var doneL = c.levels[L - 1].sets.filter(function (x) { var r = P.set(x.id); return r && r.done; }).length;
        h += '<a class="lv' + (L === lvl ? " on" : "") + '" href="#/s/' + id + "/" + L + '"' + (L === lvl ? ' aria-current="page"' : "") + ">" +
          '<span class="lv-n">Level ' + L + '</span><span class="lv-name">' + T.LEVEL_NAMES[L - 1] + '</span><span class="lv-done">' + doneL + "/" + c.levels[L - 1].sets.length + "</span></a>";
      }
      h += "</nav>";
      var lv = c.levels[lvl - 1];
      h += '<section aria-labelledby="lvH"><h2 id="lvH" class="sec-h">Level ' + lvl + " — " + T.LEVEL_NAMES[lvl - 1] + "</h2>" + (lv.intro ? "<p>" + esc(lv.intro) + "</p>" : "") + '<ul class="set-grid">';
      lv.sets.forEach(function (x, k) {
        var r = P.set(x.id);
        h += '<li><a class="set-card' + (r && r.done ? " done" : "") + '" href="#/a/' + x.id + '" style="--c:' + s.color + '">' +
          '<span class="set-n">' + (k + 1) + '</span><span class="set-t">' + esc(x.title) + "</span>" +
          (x.goal ? '<span class="set-g small">' + esc(x.goal) + "</span>" : "") +
          '<span class="set-s" aria-label="' + (r ? r.stars + " of 3 stars" : "Not started") + '">' + (r ? [1, 2, 3].map(function (n) { return n <= r.stars ? "★" : "☆"; }).join("") : "Start") + "</span></a></li>";
      });
      h += "</ul></section>";
      main.innerHTML = h;
      if (window.TNSAnalytics) { window.TNSAnalytics.track({ t: "section_open", sec: id }, "sec:" + id); window.TNSAnalytics.track({ t: "level_open", sec: id, lvl: lvl }, "lvl:" + id + lvl); }
    }, function () { loadError("#/"); });
  }

  /* ---------- Activity ---------- */
  function activity(setId) {
    main.innerHTML = '<p class="loading">Loading…</p>';
    findSet(setId).then(function (f) {
      if (current !== "a/" + setId) return;
      var back = "#/s/" + f.sec.id + "/" + f.level;
      window.TNSProgress.setLast("#/a/" + setId, f.sec.name + " · Level " + f.level + " · " + f.set.title, f.sec.id);
      main.innerHTML = '<div class="act" style="--c:' + f.sec.color + ";--t:" + f.sec.tint + '"><a class="back" href="' + back + '">← ' + esc(f.sec.name) + ", Level " + f.level + '</a><div id="actRoot"></div></div>';
      window.TNSEngine.run(document.getElementById("actRoot"), f.set, { section: f.sec.id, sectionName: f.sec.name, level: f.level, levelName: T.LEVEL_NAMES[f.level - 1], backHref: back });
    }, function (e) { if (e && e.message === "load") loadError("#/"); else notFound(); });
  }

  /* ---------- My Progress ---------- */
  function progress() {
    var P = window.TNSProgress, S = P.get(), tot = P.totals(), all = 0;
    T.SECTIONS.forEach(function (s) { all += total(s); });
    var h = '<h1>My Progress</h1><p class="lead">Your progress is saved <strong>on this device, in this browser</strong>. It does not move to other devices.</p>';
    h += '<div class="stat-row"><div class="card stat"><span class="stat-n">' + tot.done + '</span><span>of ' + all + ' activities done</span></div>' +
      '<div class="card stat"><span class="stat-n">★ ' + tot.stars + '</span><span>stars earned</span></div>' +
      '<div class="card stat"><span class="stat-n">' + Object.keys(S.ach).length + '</span><span>of ' + T.ACHIEVEMENTS.length + " achievements</span></div></div>";
    h += '<h2 class="sec-h">By place</h2><ul class="prog-list">';
    T.SECTIONS.forEach(function (s) {
      var st = P.sectionStats(s.id), n = total(s);
      h += '<li><a href="#/s/' + s.id + '" class="prog-item" style="--c:' + s.color + '"><span aria-hidden="true" class="pi-ic">' + s.icon + '</span><span class="pi-name">' + esc(s.name) +
        '</span><span class="bar" aria-hidden="true"><span style="width:' + Math.round(100 * st.done / n) + '%"></span></span><span class="small">' + st.done + "/" + n + " · ★ " + st.stars + "</span></a></li>";
    });
    h += '</ul><h2 class="sec-h">Achievements</h2><ul class="ach-grid">';
    T.ACHIEVEMENTS.forEach(function (a) {
      var got = !!S.ach[a.id];
      h += '<li class="ach' + (got ? " got" : "") + '"><span class="ach-ic" aria-hidden="true">' + (got ? a.icon : "🔒") + "</span><strong>" + esc(a.name) + '</strong><span class="small">' + esc(a.desc) + '</span><span class="small ach-st">' + (got ? "Earned!" : "Not yet") + "</span>" +
        (got ? '<a class="btn ghost cert-btn" href="#/certificate/' + a.id + '">🏅 Certificate</a>' : "") + "</li>";
    });
    h += "</ul>";
    h += '<div class="card"><h2>How stars work</h2><ul class="small"><li>Finish a set: ★</li><li>Get 70% or more: ★★</li><li>Get 90% or more: ★★★</li><li>Speaking and writing practice sets: finish every task for ★★★</li><li>Only your best result counts, so try again any time to improve!</li></ul></div>';
    if (S.check) h += '<div class="card"><h2>Find Your Level</h2><p>Your suggested starting level: <strong>Level ' + S.check.level + " — " + T.LEVEL_NAMES[S.check.level - 1] + '</strong>. You can still choose any level in any place.</p><a class="btn ghost" href="#/check">Do it again</a></div>';
    h += '<div class="card reset"><h2>Start again</h2><p>This removes all your TNS English Explorers progress and stars <strong>on this device</strong>. It cannot be undone.</p>' +
      '<div id="resetBox"><button type="button" class="btn ghost" id="resetBtn">Reset My Progress</button></div></div>';
    main.innerHTML = h;
    document.getElementById("resetBtn").onclick = function () {
      var box = document.getElementById("resetBox");
      box.innerHTML = '<p role="alert"><strong>Are you sure?</strong> All your progress and stars will be removed.</p><div class="btn-row"><button type="button" class="btn danger" id="resetYes">Yes, reset</button><button type="button" class="btn ghost" id="resetNo">No, keep my progress</button></div>';
      document.getElementById("resetNo").onclick = progress;
      document.getElementById("resetYes").onclick = function () { P.reset(); progress(); var f = document.querySelector(".lead"); if (f) f.insertAdjacentHTML("afterend", '<p class="notice ok" role="status">Your progress has been reset.</p>'); };
      document.getElementById("resetNo").focus();
    };
  }

  /* ---------- Help and Privacy ---------- */
  function help() {
    main.innerHTML = '<article class="card prose"><h1>How to Use</h1>' +
      "<h2>1. Choose a place</h2><p>There are nine places to explore: Phonics Planet, Spelling Station, Speak &amp; Shine, Story Corner, Listening Island, Word World, Grammar Playground, Writing Workshop, and Challenge Zone.</p>" +
      "<h2>2. Choose a level</h2><p>Every place has five levels:</p><ol><li>Level 1 — Little Explorers</li><li>Level 2 — Word Explorers</li><li>Level 3 — Sentence Explorers</li><li>Level 4 — Story Explorers</li><li>Level 5 — Super Explorers</li></ol>" +
      "<p>You can choose <strong>any level</strong>. You can use different levels in different places. Not sure? Try <a href=\"#/check\">Find Your Level</a>.</p>" +
      "<h2>3. Learn, practice, and collect stars</h2><p>Tap <strong>Listen</strong> to hear English. Answer one question at a time. You will see if your answer is correct, and you can try every activity again.</p>" +
      "<h2>Speaking practice</h2><p>Speak &amp; Shine does <strong>not</strong> use a microphone. You listen, say the words aloud, and tap <strong>I practiced saying it</strong>.</p>" +
      "<h2>Sound</h2><p>Turn your sound on. Headphones are best in class. On iPhone and iPad, check that the silent switch is off.</p>" +
      "<h2>Your progress</h2><p>Your progress is saved on this device, in this browser. If you use another device, or clear your browser data, your progress will not be there.</p>" +
      "<h2>For teachers and parents</h2><p>Students can work alone at home or with a teacher in class. Speaking and writing tasks are practice tasks: the website does not check pronunciation or mark students’ own writing.</p></article>";
  }
  function privacy() {
    main.innerHTML = '<article class="card prose"><h1>Privacy</h1><p>TNS English Explorers is made for children, so we keep it simple and private.</p><ul>' +
      "<li><strong>No accounts.</strong> Students do not sign up or log in.</li>" +
      "<li><strong>No personal information.</strong> We never ask for a name, email, phone number, or address.</li>" +
      "<li><strong>No microphone.</strong> The website never records voices.</li>" +
      "<li><strong>Writing stays on the screen.</strong> What students type is not saved or sent anywhere.</li>" +
      "<li><strong>Progress is saved on this device.</strong> Stars and finished activities are kept in this browser only. A different device or browser will not show them. Clearing browser data removes them.</li>" +
      "<li><strong>General usage statistics.</strong> To help the school improve the website, it may send short, anonymous messages such as “an activity was finished” with the score. These use a random code made by the browser, not a name. They never include answers, writing, or personal information.</li></ul>" +
      "<p>Questions? Please contact the English Department at Tarbyh Namouthajiyah Schools.</p></article>";
  }
  /* ---------- Certificate (made on this device; the name is never saved or sent) ---------- */
  function certificate(id) {
    var a = T.ACHIEVEMENTS.filter(function (x) { return x.id === id; })[0], S = window.TNSProgress.get();
    if (!a || !S.ach[id]) return notFound();
    var date = new Date(S.ach[id]).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    main.innerHTML = '<div class="no-print"><a class="back" href="#/progress">← My Progress</a><div class="card"><label for="certName" class="wb-h">Type your name for the certificate (optional)</label>' +
      '<input id="certName" class="type-in long" type="text" maxlength="40" autocomplete="off" placeholder="Your name"><p class="small muted">Your name is only shown on this screen. It is not saved or sent anywhere.</p>' +
      '<div class="btn-row"><button type="button" class="btn primary" id="certPrint">🖨️ Print or save as PDF</button></div></div></div>' +
      '<section class="certificate" aria-label="Certificate"><img src="assets/brand/tns-logo.png" alt="Tarbyh Namouthajiyah Schools logo" width="588" height="471" class="cert-logo">' +
      '<p class="cert-kicker">TNS English Explorers · National Track | Grades 1–5</p><h1 class="cert-title">Certificate of Achievement</h1><p>This certificate is proudly presented to</p>' +
      '<p class="cert-name" id="certNameOut">an English Explorer</p><p>for earning the</p><p class="cert-ach"><span aria-hidden="true">' + a.icon + "</span> " + esc(a.name) + '</p><p class="small">' + esc(a.desc) + "</p>" +
      '<p class="cert-date">' + esc(date) + '</p><p class="cert-tag">Listen. Speak. Read. Spell. Explore.</p></section>';
    var inp = document.getElementById("certName"), out = document.getElementById("certNameOut");
    inp.addEventListener("input", function () { out.textContent = inp.value.trim() || "an English Explorer"; });
    document.getElementById("certPrint").onclick = function () { try { window.print(); } catch (e) {} };
  }
  function notFound() { main.innerHTML = '<div class="card notice"><h1>Page not found</h1><p>Let’s go back home.</p><a class="btn primary" href="#/">Home</a></div>'; }

  /* ---------- Router ---------- */
  function route() {
    window.TNSAudio.stop();
    var hsh = (location.hash || "#/").replace(/^#\/?/, ""), p = hsh.split("/");
    current = hsh;
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.removeAttribute("aria-current"); });
    if (!hsh) { current = ""; home(); mark("home"); }
    else if (p[0] === "s") { current = "s/" + p[1] + "/" + (Math.min(5, Math.max(1, parseInt(p[2], 10) || 1))); section(p[1], p[2]); }
    else if (p[0] === "a" && p[1]) activity(p[1]);
    else if (p[0] === "progress") { progress(); mark("progress"); }
    else if (p[0] === "check" && T.Check) T.Check(main);
    else if (p[0] === "certificate" && p[1]) certificate(p[1]);
    else if (p[0] === "help") help();
    else if (p[0] === "privacy") privacy();
    else notFound();
    window.scrollTo(0, 0);
    if (document.activeElement && document.activeElement !== document.body && !main.contains(document.activeElement)) { try { main.focus({ preventScroll: true }); } catch (e) {} }
  }
  function mark(n) { var a = document.querySelector('[data-nav="' + n + '"]'); if (a) a.setAttribute("aria-current", "page"); }
  window.addEventListener("hashchange", route);
  window.addEventListener("pagehide", function () { window.TNSAudio.stop(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) window.TNSAudio.stop(); });
  T.route = route;
  route();
})();
