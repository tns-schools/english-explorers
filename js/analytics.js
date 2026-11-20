/* =====================================================================
   TNS English Explorers — Anonymous usage statistics (client side)
   ---------------------------------------------------------------------
   • Sends NOTHING unless analytics-config.js sets enabled: true.
   • Never sends names, answers, written text, or saved progress.
   • Uses two random codes so totals can be counted without knowing who:
       browser code  — random, saved in this browser ("tns-english-explorers-anon-v1")
       session code  — random, new after 30 minutes without activity
     No cookies, no fingerprinting, no location.
   • Every event gets a random event ID so the server can ignore duplicates.
   • Failures are silent. Learning never waits for statistics.
   Event types (the server accepts only these):
     visit, session_start, section_open, level_open, activity_start,
     activity_complete, check_complete
   ===================================================================== */
(function () {
  "use strict";
  var cfg = window.TNS_ANALYTICS_CONFIG || {};
  var url = (cfg.enabled === true && typeof cfg.ingestUrl === "string" &&
    /^(https:\/\/[a-z0-9.-]+\/functions\/v1\/[a-z0-9_-]+|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/[^\s"'<>]*)$/i.test(cfg.ingestUrl)) ? cfg.ingestUrl : null;
  var BKEY = "tns-english-explorers-anon-v1", SKEY = "tns-english-explorers-session-v1", IDLE = 30 * 60 * 1000;
  var TYPES = ["visit", "session_start", "section_open", "level_open", "activity_start", "activity_complete", "check_complete"];
  var sent = {}, count = 0, MAX = 400;

  function rnd(n) {
    var a = new Uint8Array(n);
    try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256); }
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }
  function browserId() {
    try { var b = localStorage.getItem(BKEY); if (!/^[0-9a-f]{24}$/.test(b || "")) { b = rnd(12); localStorage.setItem(BKEY, b); } return b; }
    catch (e) { return null; }
  }
  /* Returns { id, isNew } — a new session starts after 30 idle minutes. */
  function session() {
    var now = Date.now(), s = null;
    try { s = JSON.parse(sessionStorage.getItem(SKEY) || "null"); } catch (e) {}
    var isNew = !s || !/^[0-9a-f]{24}$/.test(s.id || "") || now - (s.t || 0) > IDLE;
    if (isNew) s = { id: rnd(12) };
    s.t = now;
    try { sessionStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {}
    return { id: s.id, isNew: isNew };
  }
  function post(body) {
    try {
      fetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "text/plain;charset=UTF-8" },
        keepalive: true, mode: "cors", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" }).then(function () {}, function () {});
    } catch (e) {}
  }
  /* e = { t, sec, lvl, act, attempt, scored, correct, rec }  ·  key = once-per-page-load guard */
  function track(e, key) {
    try {
      if (!url || !e || TYPES.indexOf(e.t) < 0) return false;
      if (key) { if (sent[key]) return false; sent[key] = 1; }
      if (++count > MAX) return false;
      var ss = session(), b = browserId();
      if (ss.isNew && e.t !== "session_start") post({ id: rnd(16), t: "session_start", b: b, s: ss.id });
      var ev = { id: rnd(16), t: e.t, b: b, s: ss.id };
      ["sec", "lvl", "act", "attempt", "scored", "correct", "rec"].forEach(function (k) { if (e[k] !== undefined && e[k] !== null) ev[k] = e[k]; });
      post(ev);
      return true;
    } catch (x) { return false; }
  }
  window.TNSAnalytics = { track: track, enabled: function () { return !!url; } };
  track({ t: "visit" }, "visit");
})();
