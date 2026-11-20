/* =====================================================================
   TNS English Explorers — Progress saved in THIS browser only
   ---------------------------------------------------------------------
   Storage key: "tns-english-explorers-v1" (separate from every other
   website, including NVS English Quest). Nothing here leaves the device.
   Record:
     sets[id]  = { done, best, stars, scored, correct, attempts, first }
     practice  = { speak: {setId: n}, write: {setId: n} }
     last      = { route, title, section }   (Continue Exploring)
     ach[id]   = timestamp earned
     check     = { level, at }                (Find Your Level result)
   ===================================================================== */
(function () {
  "use strict";
  var KEY = "tns-english-explorers-v1";
  var ok = true;

  function fresh() { return { v: 1, sets: {}, practice: { speak: {}, write: {} }, last: null, ach: {}, check: null }; }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      var d = JSON.parse(raw);
      if (!d || d.v !== 1) return fresh();
      var s = fresh();
      s.sets = d.sets || {}; s.practice = Object.assign({ speak: {}, write: {} }, d.practice || {});
      s.last = d.last || null; s.ach = d.ach || {}; s.check = d.check || null;
      return s;
    } catch (e) { ok = false; return fresh(); }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); ok = true; } catch (e) { ok = false; } }

  function starsFor(result) {
    if (!result.scored) return 3;                      /* practice-only set, all tasks finished */
    var pct = result.correct / result.scored;
    return pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
  }

  /* Record a finished set. Returns { first, stars, newAch:[...] }. */
  function complete(setId, sectionId, result) {
    var prev = S.sets[setId];
    var first = !prev || !prev.done;
    var stars = starsFor(result);
    var pct = result.scored ? Math.round(100 * result.correct / result.scored) : null;
    var r = prev || { attempts: 0 };
    r.done = true; r.sec = sectionId; r.attempts = (r.attempts || 0) + 1;
    if (first) r.first = Date.now();
    r.stars = Math.max(r.stars || 0, stars);
    if (pct !== null && (r.best == null || pct > r.best)) { r.best = pct; r.correct = result.correct; r.scored = result.scored; }
    S.sets[setId] = r;
    if (result.speak) S.practice.speak[setId] = (S.practice.speak[setId] || 0) + 1;
    if (result.write) S.practice.write[setId] = (S.practice.write[setId] || 0) + 1;
    var newAch = checkAchievements();
    save();
    return { first: first, stars: stars, pct: pct, newAch: newAch };
  }

  function sectionStats(sectionId) {
    var n = 0, stars = 0, two = 0;
    Object.keys(S.sets).forEach(function (id) { var r = S.sets[id]; if (r.sec === sectionId && r.done) { n++; stars += r.stars || 0; if ((r.stars || 0) >= 2) two++; } });
    return { done: n, stars: stars, twoPlus: two };
  }
  function totals() {
    var n = 0, stars = 0;
    Object.keys(S.sets).forEach(function (id) { if (S.sets[id].done) { n++; stars += S.sets[id].stars || 0; } });
    return { done: n, stars: stars };
  }
  function meets(rule) {
    if (rule.everySection) return (window.TNS.SECTIONS || []).every(function (s) { return sectionStats(s.id).done >= rule.everySection; });
    if (rule.section) { var st = sectionStats(rule.section); return (rule.minStars ? st.twoPlus : st.done) >= rule.sets; }
    return totals().done >= rule.sets;
  }
  function checkAchievements() {
    var earned = [];
    (window.TNS.ACHIEVEMENTS || []).forEach(function (a) { if (!S.ach[a.id] && meets(a.rule)) { S.ach[a.id] = Date.now(); earned.push(a); } });
    return earned;
  }
  function setLast(route, title, section) { S.last = { route: route, title: title, section: section }; save(); }
  function setCheck(level) { S.check = { level: level, at: Date.now() }; save(); }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} S = fresh(); }

  window.TNSProgress = {
    KEY: KEY, get: function () { return S; }, set: function (id) { return S.sets[id] || null; },
    complete: complete, sectionStats: sectionStats, totals: totals, starsFor: starsFor,
    setLast: setLast, setCheck: setCheck, reset: reset, ok: function () { return ok; }
  };
})();
