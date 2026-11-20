/* =====================================================================
   TNS English Explorers — Learning sections (the master list)
   IDs here are permanent: progress and analytics depend on them.
   Each section's activities live in data/<file>.js and are loaded
   only when a student opens that section.
   ===================================================================== */
window.TNS = window.TNS || {};
window.TNS.LEVEL_NAMES = ["Little Explorers", "Word Explorers", "Sentence Explorers", "Story Explorers", "Super Explorers"];
window.TNS.SECTIONS = [
  { id: "phonics",   code: "ph", file: "data/phonics.js",   name: "Phonics Planet",     icon: "🪐", color: "#6B47B8", tint: "#F1ECFA", setsPerLevel: 5,
    desc: "Learn letter sounds and read new words." },
  { id: "spelling",  code: "sp", file: "data/spelling.js",  name: "Spelling Station",   icon: "🚉", color: "#0E7A86", tint: "#E5F4F5", setsPerLevel: 5,
    desc: "Listen, then spell words and sentences." },
  { id: "speak",     code: "sk", file: "data/speak.js",     name: "Speak & Shine",      icon: "🌟", color: "#C2571A", tint: "#FBEEE5", setsPerLevel: 5,
    desc: "Listen, repeat, and speak with confidence." },
  { id: "story",     code: "st", file: "data/story.js",     name: "Story Corner",       icon: "📚", color: "#B8365F", tint: "#F9E9EF", setsPerLevel: 10,
    desc: "Read and listen to stories, then answer questions." },
  { id: "listening", code: "li", file: "data/listening.js", name: "Listening Island",   icon: "🏝️", color: "#2463C9", tint: "#E8EFFB", setsPerLevel: 5,
    desc: "Listen carefully and show what you understand." },
  { id: "words",     code: "wd", file: "data/words.js",     name: "Word World",         icon: "🌍", color: "#23804D", tint: "#E6F3EB", setsPerLevel: 5,
    desc: "Learn new words with pictures and sounds." },
  { id: "grammar",   code: "gr", file: "data/grammar.js",   name: "Grammar Playground", icon: "🧩", color: "#9A5B00", tint: "#FBF0DF", setsPerLevel: 5,
    desc: "Build correct sentences step by step." },
  { id: "writing",   code: "wr", file: "data/writing.js",   name: "Writing Workshop",   icon: "✏️", color: "#4A3FC4", tint: "#ECEBFA", setsPerLevel: 5,
    desc: "Write letters, words, sentences, and stories." },
  { id: "challenge", code: "ch", file: "data/challenge.js", name: "Challenge Zone",     icon: "🏆", color: "#B42828", tint: "#FAE8E8", setsPerLevel: 5,
    desc: "Mix all your skills in fun challenges." }
];
