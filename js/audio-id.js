/* =====================================================================
   TNS English Explorers — Audio file naming (shared by the website AND
   the build tools, so file names always match).
   Content files only say WHAT is spoken; this file decides WHERE the
   recording lives. Identical text = one shared recording.
     voice "f"  → main female narrator      → audio/speech/<id>.mp3
     voice "fs" → main narrator, slower     → audio/slow/<id>.mp3
     voice "m"  → male dialogue voice       → audio/male/<id>.mp3
     voice "f2"/"m2" → second female/male voice, only so two speakers of
                 the same gender sound different in a conversation
   Long recordings (stories, listening) use fixed IDs instead:
     audio/reading/<setId>.mp3, audio/listening/<setId>-<n>.mp3
   Teacher-recorded letter sounds: audio/phonics/sounds/<sound>.mp3
   ===================================================================== */
(function (root) {
  "use strict";
  var DIRS = { f: "audio/speech/", fs: "audio/slow/", m: "audio/male/", f2: "audio/female2/", m2: "audio/male2/" };

  /* The spoken form: trimmed, single spaces, curly quotes made straight. */
  function spoken(text) {
    return String(text).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
  }
  function hash(t) {
    var h = 2166136261;
    for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return ("000000" + h.toString(36)).slice(-6);
  }
  /* Stable file ID: readable slug + short hash of the exact spoken text, so two different
     texts can never share a file by accident (for example "Cat." and "cat?"). */
  function id(text) {
    var s = spoken(text);
    var slug = s.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";
    if (slug.length > 36) slug = slug.slice(0, 36).replace(/-+$/, "");
    return slug + "-" + hash(s);
  }
  function path(text, voice) {
    var v = DIRS[voice] ? voice : "f";
    return DIRS[v] + id(text) + ".mp3";
  }
  function soundPath(sound) { return "audio/phonics/sounds/" + sound + ".mp3"; }

  var api = { spoken: spoken, id: id, path: path, soundPath: soundPath, DIRS: DIRS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TNSAudioId = api;
})(this);
