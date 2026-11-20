/* =====================================================================
   TNS English Explorers — Achievements and the star system
   ---------------------------------------------------------------------
   STARS (each activity set can give at most 3 stars; only the BEST
   result counts, so repeating a set never adds extra stars):
     • Scored sets:   finish = 1 star · 70% or more = 2 stars · 90% or more = 3 stars
     • Practice sets (speaking or writing practice with no scored questions):
                      finish every practice task = 3 stars
   ACHIEVEMENTS count DIFFERENT sets, never repeats of the same set.
   ===================================================================== */
window.TNS = window.TNS || {};
window.TNS.ACHIEVEMENTS = [
  { id: "first-adventure",   name: "First Adventure",   icon: "🧭", desc: "Finish your first activity.",                         rule: { sets: 1 } },
  { id: "sound-explorer",    name: "Sound Explorer",    icon: "🪐", desc: "Finish 10 Phonics Planet activities.",                rule: { section: "phonics", sets: 10 } },
  { id: "spelling-star",     name: "Spelling Star",     icon: "🚉", desc: "Get 2 or more stars in 10 Spelling Station activities.", rule: { section: "spelling", sets: 10, minStars: 2 } },
  { id: "speaking-explorer", name: "Speaking Explorer", icon: "🌟", desc: "Finish 10 Speak & Shine activities.",                 rule: { section: "speak", sets: 10 } },
  { id: "reading-explorer",  name: "Reading Explorer",  icon: "📚", desc: "Finish 10 Story Corner stories.",                     rule: { section: "story", sets: 10 } },
  { id: "listening-star",    name: "Listening Star",    icon: "🏝️", desc: "Get 2 or more stars in 10 Listening Island activities.", rule: { section: "listening", sets: 10, minStars: 2 } },
  { id: "word-master",       name: "Word Master",       icon: "🌍", desc: "Get 2 or more stars in 10 Word World activities.",    rule: { section: "words", sets: 10, minStars: 2 } },
  { id: "grammar-explorer",  name: "Grammar Explorer",  icon: "🧩", desc: "Finish 10 Grammar Playground activities.",            rule: { section: "grammar", sets: 10 } },
  { id: "writing-champion",  name: "Writing Champion",  icon: "✏️", desc: "Finish 10 Writing Workshop activities.",              rule: { section: "writing", sets: 10 } },
  { id: "super-explorer",    name: "Super Explorer",    icon: "🏆", desc: "Finish at least 3 activities in every section.",      rule: { everySection: 3 } }
];
