/* =====================================================================
   TNS English Explorers — Find Your Level page (#/check)
   Uses the same activity engine. The suggested level is the highest
   level where the student answered most questions correctly, counting
   up from Level 1. It never locks anything.
   ===================================================================== */
(function () {
  "use strict";
  var T = window.TNS;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* results = [{ level, ok }] → suggested level 1–5 */
  function suggest(results) {
    var lvl = 1;
    for (var L = 1; L <= 5; L++) {
      var qs = results.filter(function (r) { return r.level === L; });
      var ok = qs.filter(function (r) { return r.ok; }).length;
      if (qs.length && ok / qs.length >= 0.6) lvl = L; else break;
    }
    return lvl;
  }

  function intro(main) {
    main.innerHTML = '<div class="act" style="--c:#1B2A4A;--t:#EEF1F7"><a class="back" href="#/">← Home</a>' +
      '<div class="card"><h1>🧭 Find Your Level</h1><p class="lead">Answer 18 short questions. They start easy and get a little harder. This will <strong>suggest</strong> a good place to start.</p>' +
      '<ul><li>It is <strong>optional</strong>. You can skip it.</li><li>There is no timer. Do your best!</li><li>It is not a test and it does not give a grade.</li><li>You can still choose <strong>any level</strong> in <strong>any place</strong>, and use different levels in different places.</li></ul>' +
      '<div class="btn-row"><button type="button" class="btn primary big" id="ckGo">Start →</button><a class="btn ghost" href="#/">Not now</a></div></div></div>';
    document.getElementById("ckGo").onclick = function () { run(main); };
  }
  function run(main) {
    main.innerHTML = '<div class="act" style="--c:#1B2A4A;--t:#EEF1F7"><a class="back" href="#/">← Home</a><div id="actRoot"></div></div>';
    window.TNSEngine.run(document.getElementById("actRoot"), T.CHECK, {
      mode: "check", section: "check", sectionName: "Find Your Level", level: "1–5", levelName: "a short check", backHref: "#/",
      onFinish: function (results) { done(main, results); }
    });
  }
  function done(main, results) {
    var lvl = suggest(results);
    window.TNSProgress.setCheck(lvl);
    if (window.TNSAnalytics) window.TNSAnalytics.track({ t: "check_complete", rec: lvl });
    var name = T.LEVEL_NAMES[lvl - 1];
    var h = '<div class="act" style="--c:#1B2A4A;--t:#EEF1F7"><div class="card results"><h1 tabindex="-1" id="ckRes">Well done, explorer! 🎉</h1>' +
      '<p class="lead">A good place to start is:</p><p class="ck-level"><span>Level ' + lvl + "</span>" + esc(name) + "</p>" +
      '<p>This is only a suggestion. If it feels too easy, try the next level. If it feels too hard, try the level before. You can use <strong>different levels in different places</strong> — for example, Level ' + Math.min(5, lvl + 1) + " in Word World and Level " + lvl + " in Spelling Station.</p>" +
      '<h2 class="sec-h">Start exploring at Level ' + lvl + '</h2><ul class="sec-grid compact">';
    T.SECTIONS.forEach(function (s) {
      h += '<li><a class="sec-card" href="#/s/' + s.id + "/" + lvl + '" style="--c:' + s.color + ";--t:" + s.tint + '"><span class="sec-ic" aria-hidden="true">' + s.icon + '</span><span class="sec-name">' + esc(s.name) + '</span><span class="sec-go">Level ' + lvl + " →</span></a></li>";
    });
    h += '</ul><div class="btn-row center"><button type="button" class="btn ghost" id="ckAgain">Do it again</button><a class="btn primary" href="#/">Home</a></div></div></div>';
    main.innerHTML = h;
    document.getElementById("ckAgain").onclick = function () { intro(main); window.scrollTo(0, 0); };
    var f = document.getElementById("ckRes"); if (f) f.focus();
  }

  T.Check = intro;
  T.checkSuggest = suggest;
})();
