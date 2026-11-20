/* =====================================================================
   TNS English Explorers — PHONICS PLANET (25 activity sets)
   ---------------------------------------------------------------------
   Every scored question uses WHOLE-WORD recordings (natural and clear).
   "sound" on an example = the matching teacher-recorded letter sound.
   That "Hear the sound" button appears only after the teacher recording
   has been added (see tools/import_teacher_sounds.py). No question ever
   depends on it.
   Letter sounds are written like this: /m/ — the SOUND, not the letter name.
   ===================================================================== */
(function () {
  "use strict";
  /* ---- small helpers that build questions ---- */
  function first(word, letters, vis) { return { type: "choice", q: "Listen. What is the first sound? Choose the letter.", say: word, hide: true, vis: vis, visAlt: "picture", options: letters, answer: letters[0], explain: "<strong>" + word + "</strong> starts with the letter <strong>" + letters[0] + "</strong>." }; }
  function last(word, letters, vis) { return { type: "choice", q: "Listen. What is the last sound? Choose the letter.", say: word, hide: true, vis: vis, visAlt: "picture", options: letters, answer: letters[0], explain: "<strong>" + word + "</strong> ends with the letter <strong>" + letters[0] + "</strong>." }; }
  function hear(word, options, explain) { return { type: "choice", q: "Listen. Which word do you hear?", say: word, hide: true, options: options, answer: word, explain: explain }; }
  function miss(pattern, word, letters, vis, explain) { return { type: "choice", q: "Listen. Which letter is missing?", say: word, hide: true, prompt: pattern, vis: vis, visAlt: "picture", options: letters, answer: letters[0], explain: explain || "The word is <strong>" + word + "</strong>." }; }
  function build(word, extra, vis) { return { type: "letters", q: "Listen. Tap the letters to spell the word.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word, extra: extra }; }
  function pic(t, vis) { return { t: t, vis: vis, alt: t, hideLabel: true, say: t }; }
  /* Pictures with Listen buttons: "Which one starts like moon?" */
  function like(q, key, answer, opts) { return { type: "choice", q: q, say: key, listenLabel: "Listen: " + key, options: opts, answer: answer, sayOptions: true, explain: "<strong>" + answer + "</strong> — " + q.replace(/^Which (one|picture) /, "").replace(/\?$/, "") + "." }; }
  function blend(letters, answer, opts) { return { type: "choice", q: "Blend the sounds. Which picture is it?", prompt: letters, options: opts, answer: answer, explain: letters + " → <strong>" + answer + "</strong>" }; }
  function ex(t, html, vis, sound, note) { return { t: t, html: html, vis: vis, sound: sound, note: note }; }

  TNS.register("phonics", {
    intro: "Learn the sounds that letters make, then use them to read new words.",
    levels: [
      /* =================== LEVEL 1 — Little Explorers =================== */
      { sets: [
        { id: "ph-1-1", title: "Alphabet Recognition", goal: "Know the 26 letters and their names.",
          learn: [
            { title: "The alphabet", text: "English has <strong>26 letters</strong>. Every letter has a <strong>capital letter</strong> (big) and a <strong>small letter</strong>. Tap Listen to hear each letter’s <strong>name</strong>.",
              examples: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function (L) { return { t: L + " " + L.toLowerCase(), say: "The letter " + L + "." }; }),
              tip: "A letter has a <strong>name</strong> (like “bee” for B) and a <strong>sound</strong>. In the next sets you will learn the sounds." }
          ],
          items: [
            { type: "choice", q: "Listen. Which letter do you hear?", say: "The letter M.", hide: true, options: ["M", "N", "W"], answer: "M" },
            { type: "choice", q: "Listen. Which letter do you hear?", say: "The letter B.", hide: true, options: ["B", "D", "P"], answer: "B" },
            { type: "match", q: "Match each capital letter to its small letter.", pairs: [["A", "a"], ["B", "b"], ["D", "d"], ["G", "g"]] },
            { type: "choice", q: "What letter comes next?", prompt: "A  B  C  __", options: ["D", "E", "G"], answer: "D", explain: "A, B, C, <strong>D</strong>." },
            { type: "choice", q: "Listen. Which letter do you hear?", say: "The letter E.", hide: true, options: ["E", "I", "A"], answer: "E" },
            { type: "choice", q: "Find the small letter for H.", prompt: "H", options: ["h", "n", "b"], answer: "h" },
            { type: "match", q: "Match each capital letter to its small letter.", pairs: [["M", "m"], ["N", "n"], ["Q", "q"], ["R", "r"]] },
            { type: "choice", q: "Listen. Which letter do you hear?", say: "The letter G.", hide: true, options: ["G", "J", "Z"], answer: "G" },
            { type: "choice", q: "What letter comes next?", prompt: "W  X  Y  __", options: ["Z", "V", "U"], answer: "Z", explain: "W, X, Y, <strong>Z</strong>. Z is the last letter." },
            { type: "choice", q: "Listen. Which letter do you hear?", say: "The letter Y.", hide: true, options: ["Y", "W", "V"], answer: "Y" }
          ] },

        { id: "ph-1-2", title: "Beginning Letter Sounds", goal: "Hear the first sound: s, a, t, p, i, n, m.",
          learn: [
            { title: "Letters make sounds", text: "Listen to each word. Listen for the <strong>first sound</strong>. The coloured letter makes that sound.",
              examples: [ex("sun", "<b>s</b>un", "☀️", "s", "s says /s/"), ex("ant", "<b>a</b>nt", "🐜", "a", "a says /a/"), ex("ten", "<b>t</b>en", "🔟", "t", "t says /t/"), ex("pig", "<b>p</b>ig", "🐷", "p", "p says /p/"),
                ex("igloo", "<b>i</b>gloo", "svg:igloo", "i", "i says /i/"), ex("nose", "<b>n</b>ose", "👃", "n", "n says /n/"), ex("moon", "<b>m</b>oon", "🌙", "m", "m says /m/")],
              tip: "Say the word slowly. What do your lips and tongue do at the start?" }
          ],
          items: [
            first("sun", ["s", "m", "t"], "☀️"),
            first("map", ["m", "n", "p"], "🗺️"),
            first("ten", ["t", "d", "p"], "🔟"),
            first("pig", ["p", "b", "t"], "🐷"),
            first("nose", ["n", "m", "s"], "👃"),
            first("ant", ["a", "e", "i"], "🐜"),
            like("Which one starts like sun?", "sun", "sock", [pic("sock", "🧦"), pic("pig", "🐷"), pic("map", "🗺️")]),
            like("Which one starts like moon?", "moon", "mouse", [pic("mouse", "🐭"), pic("nose", "👃"), pic("ten", "🔟")]),
            { type: "match", q: "Match each letter to the picture that starts with its sound.", pairs: [["s", pic("sun", "☀️")], ["m", pic("moon", "🌙")], ["p", pic("pig", "🐷")], ["t", pic("ten", "🔟")]] },
            first("igloo", ["i", "a", "o"], "svg:igloo")
          ] },

        { id: "ph-1-3", title: "More Letter Sounds", goal: "Hear the first sound: b, c, d, f, g, h, j, k, l, r.",
          learn: [
            { title: "Ten more sounds", text: "Listen to each word and its <strong>first sound</strong>.",
              examples: [ex("bus", "<b>b</b>us", "🚌", "b"), ex("cat", "<b>c</b>at", "🐱", "c"), ex("dog", "<b>d</b>og", "🐶", "d"), ex("fish", "<b>f</b>ish", "🐟", "f"), ex("goat", "<b>g</b>oat", "🐐", "g"),
                ex("hat", "<b>h</b>at", "🎩", "h"), ex("jam", "<b>j</b>am", null, "j"), ex("key", "<b>k</b>ey", "🔑", "k"), ex("lion", "<b>l</b>ion", "🦁", "l"), ex("ring", "<b>r</b>ing", "💍", "r")],
              tip: "<strong>c</strong> in <em>cat</em> and <strong>k</strong> in <em>key</em> make the <strong>same sound</strong>." }
          ],
          items: [
            first("bus", ["b", "d", "p"], "🚌"),
            first("dog", ["d", "b", "g"], "🐶"),
            first("fish", ["f", "v", "h"], "🐟"),
            first("goat", ["g", "k", "j"], "🐐"),
            first("hat", ["h", "f", "l"], "🎩"),
            first("lion", ["l", "r", "n"], "🦁"),
            first("ring", ["r", "l", "w"], "💍"),
            like("Which one starts like bus?", "bus", "bed", [pic("bed", "🛏️"), pic("dog", "🐶"), pic("pig", "🐷")]),
            { type: "choice", q: "Cat and key start with the same sound. Which word also starts with this sound?", options: ["kite", "goat", "hat"], answer: "kite", sayOptions: true, explain: "<strong>c</strong>at, <strong>k</strong>ey and <strong>k</strong>ite all start with the same sound." },
            { type: "match", q: "Match each letter to the picture that starts with its sound.", pairs: [["d", pic("duck", "🦆")], ["f", pic("fish", "🐟")], ["h", pic("horse", "🐴")], ["l", pic("lion", "🦁")]] }
          ] },

        { id: "ph-1-4", title: "Ending Sounds", goal: "Hear the last sound in a word.",
          learn: [
            { title: "Listen to the end", text: "Words have a <strong>last sound</strong> too. Listen to the end of each word.",
              examples: [ex("cat", "ca<b>t</b>", "🐱", "t"), ex("bus", "bu<b>s</b>", "🚌", "s"), ex("sun", "su<b>n</b>", "☀️", "n"), ex("map", "ma<b>p</b>", "🗺️", "p"), ex("bed", "be<b>d</b>", "🛏️", "d"), ex("dog", "do<b>g</b>", "🐶", "g"), ex("web", "we<b>b</b>", "🕸️", "b")],
              tip: "Say the word slowly and stretch it out. Stop at the very end. What sound is it?" }
          ],
          items: [
            last("cat", ["t", "d", "k"], "🐱"),
            last("bus", ["s", "z", "t"], "🚌"),
            last("sun", ["n", "m", "s"], "☀️"),
            last("map", ["p", "b", "t"], "🗺️"),
            last("bed", ["d", "t", "b"], "🛏️"),
            last("dog", ["g", "k", "d"], "🐶"),
            last("web", ["b", "p", "d"], "🕸️"),
            last("ham", ["m", "n", "p"], null),
            like("Which one ends like cat?", "cat", "hat", [pic("hat", "🎩"), pic("bus", "🚌"), pic("dog", "🐶")]),
            like("Which one ends like sun?", "sun", "ten", [pic("ten", "🔟"), pic("map", "🗺️"), pic("bed", "🛏️")])
          ] },

        { id: "ph-1-5", title: "Alphabet and Sound Review", goal: "Review letters and learn o, u, e, v, w, y, z, x, qu.",
          learn: [
            { title: "The last sounds of the alphabet", text: "Here are more letter sounds. Now you know the sounds for the whole alphabet!",
              examples: [ex("egg", "<b>e</b>gg", "🥚", "e"), ex("octopus", "<b>o</b>ctopus", "🐙", "o"), ex("umbrella", "<b>u</b>mbrella", "☂️", "u"), ex("violin", "<b>v</b>iolin", "🎻", "v"), ex("web", "<b>w</b>eb", "🕸️", "w"),
                ex("yo-yo", "<b>y</b>o-yo", "🪀", "y", null), ex("zebra", "<b>z</b>ebra", "🦓", "z"), ex("box", "bo<b>x</b>", "📦", "x", "x is usually at the end"), ex("queen", "<b>qu</b>een", null, "qu", "q and u go together")],
              tip: "The letter <strong>x</strong> makes two sounds together: /k/ + /s/, like at the end of <em>box</em> and <em>fox</em>." }
          ],
          items: [
            first("egg", ["e", "a", "i"], "🥚"),
            first("octopus", ["o", "u", "a"], "🐙"),
            first("umbrella", ["u", "o", "a"], "☂️"),
            first("violin", ["v", "f", "w"], "🎻"),
            first("zebra", ["z", "s", "j"], "🦓"),
            first("web", ["w", "v", "y"], "🕸️"),
            last("fox", ["x", "s", "k"], "🦊"),
            { type: "choice", q: "Listen. Which letter do you hear? (letter name)", say: "The letter Q.", hide: true, options: ["Q", "K", "U"], answer: "Q", explain: "That is the letter <strong>Q</strong>. Q usually comes with U: <em>queen</em>." },
            { type: "match", q: "Match each letter to the picture that starts with its sound.", pairs: [["e", pic("egg", "🥚")], ["o", pic("octopus", "🐙")], ["u", pic("umbrella", "☂️")], ["a", pic("apple", "🍎")]] },
            like("Which one starts like yes?", "yes", "yo-yo", [pic("yo-yo", "🪀"), pic("web", "🕸️"), pic("violin", "🎻")])
          ] }
      ] },

      /* =================== LEVEL 2 — Word Explorers =================== */
      { sets: [
        { id: "ph-2-1", title: "Short A", goal: "Hear and read the short a sound, as in cat.",
          learn: [
            { title: "Short a", text: "The letter <strong>a</strong> in the middle of these words makes the <strong>short a</strong> sound.",
              examples: [ex("cat", "c<b>a</b>t", "🐱", "a"), ex("hat", "h<b>a</b>t", "🎩"), ex("map", "m<b>a</b>p", "🗺️"), ex("bat", "b<b>a</b>t", "🦇"), ex("jam", "j<b>a</b>m"), ex("van", "v<b>a</b>n"), ex("bag", "b<b>a</b>g")],
              tip: "Short a words often have three letters: a consonant, then <strong>a</strong>, then a consonant: <em>c-a-t</em>." }
          ],
          items: [
            hear("cap", ["cap", "cup", "cop"], "<strong>cap</strong> has the short a sound."),
            hear("bag", ["bag", "big", "bug"]),
            miss("c _ t", "cat", ["a", "o", "u"], "🐱"),
            miss("h _ t", "hat", ["a", "i", "o"], "🎩"),
            miss("b _ t", "bat", ["a", "e", "u"], "🦇"),
            { type: "choice", q: "Which word has the short a sound?", options: ["fan", "fin", "fun"], answer: "fan", sayOptions: true },
            build("map", "o", "🗺️"),
            build("jam", "e"),
            hear("pan", ["pan", "pen", "pin"]),
            { type: "choice", q: "Read the word. Which picture is it?", prompt: "rat", options: [pic("rat", "🐀"), pic("cat", "🐱"), pic("bat", "🦇")], answer: "rat", explain: "r-a-t → <strong>rat</strong>." }
          ] },

        { id: "ph-2-2", title: "Short E and Short I", goal: "Hear the difference between short e (pen) and short i (pin).",
          learn: [
            { title: "Short e", text: "The letter <strong>e</strong> makes the short e sound, as in <em>pen</em>.",
              examples: [ex("pen", "p<b>e</b>n", "🖊️", "e"), ex("bed", "b<b>e</b>d", "🛏️"), ex("ten", "t<b>e</b>n", "🔟"), ex("web", "w<b>e</b>b", "🕸️"), ex("net", "n<b>e</b>t")] },
            { title: "Short i", text: "The letter <strong>i</strong> makes the short i sound, as in <em>pin</em>.",
              examples: [ex("pin", "p<b>i</b>n", "📌", "i"), ex("pig", "p<b>i</b>g", "🐷"), ex("six", "s<b>i</b>x", "6️⃣"), ex("lip", "l<b>i</b>p", "👄"), ex("sit", "s<b>i</b>t")],
              tip: "Listen carefully: <em>pen</em> and <em>pin</em>, <em>ten</em> and <em>tin</em>. Only the middle sound changes." }
          ],
          items: [
            hear("pen", ["pen", "pin", "pan"]),
            hear("pin", ["pin", "pen", "pun"]),
            hear("tin", ["tin", "ten", "tan"]),
            hear("bed", ["bed", "bid", "bad"]),
            miss("s _ x", "six", ["i", "e", "a"], "6️⃣"),
            miss("w _ b", "web", ["e", "i", "a"], "🕸️"),
            build("pig", "e", "🐷"),
            build("ten", "i", "🔟"),
            { type: "choice", q: "Which word has the short i sound?", options: ["lip", "leg", "lap"], answer: "lip", sayOptions: true },
            { type: "choice", q: "Which word has the short e sound?", options: ["net", "nut", "not"], answer: "net", sayOptions: true }
          ] },

        { id: "ph-2-3", title: "Short O and Short U", goal: "Hear the difference between short o (hot) and short u (hut).",
          learn: [
            { title: "Short o", text: "The letter <strong>o</strong> makes the short o sound, as in <em>hot</em>.",
              examples: [ex("dog", "d<b>o</b>g", "🐶", "o"), ex("box", "b<b>o</b>x", "📦"), ex("fox", "f<b>o</b>x", "🦊"), ex("hot", "h<b>o</b>t"), ex("sock", "s<b>o</b>ck", "🧦")] },
            { title: "Short u", text: "The letter <strong>u</strong> makes the short u sound, as in <em>sun</em>.",
              examples: [ex("sun", "s<b>u</b>n", "☀️", "u"), ex("bus", "b<b>u</b>s", "🚌"), ex("cup", "c<b>u</b>p"), ex("bug", "b<b>u</b>g", "🐞"), ex("hut", "h<b>u</b>t")],
              tip: "Listen: <em>hot</em> – <em>hut</em>, <em>cot</em> – <em>cut</em>. Only the middle sound changes." }
          ],
          items: [
            hear("hut", ["hut", "hot", "hat"]),
            hear("cot", ["cot", "cut", "cat"]),
            hear("dug", ["dug", "dog", "dig"]),
            miss("b _ x", "box", ["o", "u", "a"], "📦"),
            miss("s _ n", "sun", ["u", "o", "i"], "☀️"),
            miss("b _ s", "bus", ["u", "a", "o"], "🚌"),
            build("fox", "u", "🦊"),
            build("bug", "o", "🐞"),
            { type: "choice", q: "Which word has the short o sound?", options: ["pot", "put", "pet"], answer: "pot", sayOptions: true },
            { type: "choice", q: "Which word has the short u sound?", options: ["cup", "cap", "cop"], answer: "cup", sayOptions: true }
          ] },

        { id: "ph-2-4", title: "Blending CVC Words", goal: "Put sounds together to read words.",
          learn: [
            { title: "Blend the sounds", text: "To read a word, say each sound, then <strong>blend</strong> them together fast. <br><em>s – u – n → sun</em>",
              examples: [ex("sun", "s · u · n", "☀️"), ex("pig", "p · i · g", "🐷"), ex("bed", "b · e · d", "🛏️"), ex("dog", "d · o · g", "🐶"), ex("map", "m · a · p", "🗺️")],
              tip: "Point to each letter as you say its sound. Then say the sounds faster and faster until you hear the word." }
          ],
          items: [
            blend("c · a · t", "cat", [pic("cat", "🐱"), pic("dog", "🐶"), pic("pig", "🐷")]),
            blend("b · u · s", "bus", [pic("bus", "🚌"), pic("bed", "🛏️"), pic("box", "📦")]),
            blend("f · o · x", "fox", [pic("fox", "🦊"), pic("fish", "🐟"), pic("six", "6️⃣")]),
            blend("w · e · b", "web", [pic("web", "🕸️"), pic("ten", "🔟"), pic("hat", "🎩")]),
            blend("p · i · n", "pin", [pic("pin", "📌"), pic("pen", "🖊️"), pic("pig", "🐷")]),
            build("hen", "a"),
            build("mug", "o"),
            build("lid", "e"),
            { type: "choice", q: "Read the word. Which word is it?", prompt: "j · e · t", options: ["jet", "get", "jut"], answer: "jet", sayOptions: true },
            { type: "choice", q: "Change the first letter of cat to h. What is the new word?", prompt: "cat → _at", options: ["hat", "hit", "cot"], answer: "hat", explain: "c-a-t → <strong>h</strong>-a-t = <strong>hat</strong>." }
          ] },

        { id: "ph-2-5", title: "Short Vowel Challenge", goal: "Use all five short vowels: a, e, i, o, u.",
          learn: [
            { title: "Five short vowels", text: "The letters <strong>a, e, i, o, u</strong> are <strong>vowels</strong>. Listen to the vowel in the middle of each word.",
              examples: [ex("bag", "b<b>a</b>g", null, null, "short a"), ex("bed", "b<b>e</b>d", "🛏️", null, "short e"), ex("big", "b<b>i</b>g", null, null, "short i"), ex("box", "b<b>o</b>x", "📦", null, "short o"), ex("bus", "b<b>u</b>s", "🚌", null, "short u")] }
          ],
          items: [
            hear("big", ["big", "bag", "bug"]),
            hear("pet", ["pet", "pit", "pat"]),
            hear("mop", ["mop", "map", "mud"]),
            hear("rug", ["rug", "rag", "rig"]),
            { type: "match", q: "Match each word to its vowel sound.", pairs: [["hat", "short a"], ["leg", "short e"], ["fin", "short i"], ["pot", "short o"], ["gum", "short u"]] },
            build("log", "a"),
            build("tub", "e"),
            { type: "type", q: "Listen and type the word.", say: "nest", hide: true, answer: "nest" },
            { type: "type", q: "Listen and type the word.", say: "lamp", hide: true, answer: "lamp" },
            { type: "choice", q: "Which word does NOT have the same vowel sound as the others?", options: ["sit", "lip", "win", "hot"], answer: "hot", fixed: true, sayOptions: true, explain: "sit, lip and win have short i. <strong>hot</strong> has short o." }
          ] }
      ] },

      /* =================== LEVEL 3 — Sentence Explorers =================== */
      { sets: [
        { id: "ph-3-1", title: "Beginning Consonant Blends", goal: "Read words that start with two consonants: fr, cr, dr, tr, st, sn, fl, pl.",
          learn: [
            { title: "Consonant blends", text: "In a <strong>blend</strong>, two consonants sit together and you hear <strong>both</strong> sounds: <em>f + r → fr</em>.",
              examples: [ex("frog", "<b>fr</b>og", "🐸"), ex("crab", "<b>cr</b>ab", "🦀"), ex("drum", "<b>dr</b>um", "🥁"), ex("tree", "<b>tr</b>ee", "🌳"), ex("star", "<b>st</b>ar", "⭐"), ex("snake", "<b>sn</b>ake", "🐍"), ex("flag", "<b>fl</b>ag", "🚩"), ex("plane", "<b>pl</b>ane", "✈️")] }
          ],
          items: [
            { type: "choice", q: "Listen. Which blend does the word start with?", say: "frog", hide: true, vis: "🐸", visAlt: "picture", options: ["fr", "fl", "dr"], answer: "fr" },
            { type: "choice", q: "Listen. Which blend does the word start with?", say: "drum", hide: true, vis: "🥁", visAlt: "picture", options: ["dr", "tr", "br"], answer: "dr" },
            { type: "choice", q: "Listen. Which blend does the word start with?", say: "star", hide: true, vis: "⭐", visAlt: "picture", options: ["st", "sn", "sp"], answer: "st" },
            { type: "choice", q: "Listen. Which blend does the word start with?", say: "plane", hide: true, vis: "✈️", visAlt: "picture", options: ["pl", "pr", "fl"], answer: "pl" },
            hear("crab", ["crab", "cab", "grab"], "<strong>cr</strong>ab: you hear /k/ and /r/."),
            hear("slip", ["slip", "sip", "lip"]),
            build("frog", "l", "🐸"),
            build("snap", "t"),
            like("Which picture starts like tree?", "tree", "train", [pic("train", "🚂"), pic("drum", "🥁"), pic("star", "⭐")]),
            { type: "match", q: "Match each blend to a picture.", pairs: [["cr", pic("crab", "🦀")], ["sn", pic("snake", "🐍")], ["fl", pic("flag", "🚩")], ["gr", pic("grapes", "🍇")]] }
          ] },

        { id: "ph-3-2", title: "Ending Consonant Blends", goal: "Read words that end with st, nd, mp, nk, ft, nt, lk.",
          learn: [
            { title: "Blends at the end", text: "Some words <strong>end</strong> with two consonant sounds. Say both sounds.",
              examples: [ex("nest", "ne<b>st</b>"), ex("hand", "ha<b>nd</b>", "✋"), ex("lamp", "la<b>mp</b>"), ex("pink", "pi<b>nk</b>"), ex("gift", "gi<b>ft</b>", "🎁"), ex("tent", "te<b>nt</b>", "⛺"), ex("milk", "mi<b>lk</b>", "🥛")] }
          ],
          items: [
            { type: "choice", q: "Listen. How does the word end?", say: "hand", hide: true, vis: "✋", visAlt: "picture", options: ["nd", "nt", "mp"], answer: "nd" },
            { type: "choice", q: "Listen. How does the word end?", say: "tent", hide: true, vis: "⛺", visAlt: "picture", options: ["nt", "nd", "st"], answer: "nt" },
            { type: "choice", q: "Listen. How does the word end?", say: "gift", hide: true, vis: "🎁", visAlt: "picture", options: ["ft", "st", "lt"], answer: "ft" },
            { type: "choice", q: "Listen. How does the word end?", say: "milk", hide: true, vis: "🥛", visAlt: "picture", options: ["lk", "nk", "sk"], answer: "lk" },
            hear("jump", ["jump", "junk", "just"]),
            hear("sink", ["sink", "sing", "silk"]),
            miss("ne _ t", "nest", ["s", "n", "l"], null, "The word is <strong>nest</strong>: n-e-s-t."),
            build("desk", "t"),
            build("lamp", "n"),
            { type: "type", q: "Listen and type the word.", say: "pond", hide: true, answer: "pond" }
          ] },

        { id: "ph-3-3", title: "SH and CH", goal: "Read words with sh (ship) and ch (chip).",
          learn: [
            { title: "Two letters, one sound", text: "<strong>sh</strong> and <strong>ch</strong> are <strong>digraphs</strong>: two letters that make <strong>one</strong> new sound.",
              examples: [ex("ship", "<b>sh</b>ip", "🚢", "sh"), ex("shell", "<b>sh</b>ell", "🐚"), ex("fish", "fi<b>sh</b>", "🐟"), ex("chair", "<b>ch</b>air", "🪑", "ch"), ex("cheese", "<b>ch</b>eese", "🧀"), ex("lunch", "lun<b>ch</b>")],
              tip: "For <strong>sh</strong>, push air out softly, like “Shhh! Be quiet!” For <strong>ch</strong>, the sound starts with a short stop, like a sneeze: “ch!”" }
          ],
          items: [
            hear("ship", ["ship", "chip", "sip"]),
            hear("chop", ["chop", "shop", "cop"]),
            hear("shoe", ["shoe", "chew", "sue"]),
            { type: "choice", q: "Listen. Does the word have sh or ch?", say: "cheese", hide: true, vis: "🧀", visAlt: "picture", options: ["ch", "sh"], answer: "ch", fixed: true },
            { type: "choice", q: "Listen. Does the word have sh or ch?", say: "shell", hide: true, vis: "🐚", visAlt: "picture", options: ["ch", "sh"], answer: "sh", fixed: true },
            { type: "choice", q: "Listen. Does the word have sh or ch?", say: "lunch", hide: true, options: ["ch", "sh"], answer: "ch", fixed: true },
            { type: "choice", q: "Listen. Does the word have sh or ch?", say: "dish", hide: true, options: ["ch", "sh"], answer: "sh", fixed: true },
            build("fish", "c", "🐟"),
            build("chin", "s"),
            { type: "match", q: "Match each word to its picture.", pairs: [["ship", pic("ship", "🚢")], ["chair", pic("chair", "🪑")], ["cherry", pic("cherry", "🍒")], ["sheep", pic("sheep", "🐑")]] }
          ] },

        { id: "ph-3-4", title: "TH, WH and PH", goal: "Read words with th, wh and ph.",
          learn: [
            { title: "th", text: "For <strong>th</strong>, put your tongue between your teeth and blow gently.",
              examples: [ex("three", "<b>th</b>ree", "3️⃣", "th"), ex("bath", "ba<b>th</b>", "🛁"), ex("this", "<b>th</b>is", null, "thv"), ex("mother", "mo<b>th</b>er")] },
            { title: "wh and ph", text: "<strong>wh</strong> sounds like <strong>w</strong>. <strong>ph</strong> sounds like <strong>f</strong>.",
              examples: [ex("whale", "<b>wh</b>ale", "🐋"), ex("wheel", "<b>wh</b>eel"), ex("white", "<b>wh</b>ite"), ex("phone", "<b>ph</b>one", "📱"), ex("dolphin", "dol<b>ph</b>in", "🐬"), ex("elephant", "ele<b>ph</b>ant", "🐘")],
              tip: "Question words often start with <strong>wh</strong>: <em>what, where, when, which, why</em>." }
          ],
          items: [
            hear("thin", ["thin", "tin", "fin"], "<strong>th</strong>in: tongue between your teeth."),
            hear("three", ["three", "tree", "free"]),
            { type: "choice", q: "Listen. Which letters make the f sound in this word?", say: "phone", hide: true, vis: "📱", visAlt: "picture", options: ["ph", "f", "th"], answer: "ph" },
            { type: "choice", q: "Listen. Which letters start this word?", say: "whale", hide: true, vis: "🐋", visAlt: "picture", options: ["wh", "w", "th"], answer: "wh", explain: "<strong>wh</strong>ale. wh and w sound the same, so you need to remember the spelling." },
            miss("_ _ ite", "white", ["wh", "th", "sh"], null, "<strong>wh</strong>ite."),
            miss("ba _ _", "bath", ["th", "sh", "ch"], "🛁", "ba<strong>th</strong>."),
            miss("dol _ _ in", "dolphin", ["ph", "th", "wh"], "🐬", "dol<strong>ph</strong>in."),
            { type: "choice", q: "Which word starts with wh?", options: ["when", "then", "hen"], answer: "when", sayOptions: true },
            build("moth", "f"),
            { type: "match", q: "Match each word to its picture.", pairs: [["whale", pic("whale", "🐋")], ["phone", pic("phone", "📱")], ["bath", pic("bath", "🛁")], ["elephant", pic("elephant", "🐘")]] }
          ] },

        { id: "ph-3-5", title: "Blends and Digraphs Review", goal: "Mix blends (fr, st) and digraphs (sh, ch, th).",
          learn: [
            { title: "Blend or digraph?", text: "In a <strong>blend</strong>, you hear two sounds (<em>st</em> in <em>star</em>). In a <strong>digraph</strong>, two letters make one sound (<em>sh</em> in <em>ship</em>).",
              examples: [ex("star", "<b>st</b>ar", "⭐", null, "blend"), ex("ship", "<b>sh</b>ip", "🚢", null, "digraph"), ex("crab", "<b>cr</b>ab", "🦀", null, "blend"), ex("chin", "<b>ch</b>in", null, null, "digraph"), ex("tooth", "too<b>th</b>", "🦷", null, "digraph")] }
          ],
          items: [
            hear("shrimp", ["shrimp", "shop", "chimp"]),
            hear("chest", ["chest", "chess", "rest"]),
            hear("flash", ["flash", "flag", "clash"]),
            { type: "choice", q: "Listen. Which letters start this word?", say: "sleep", hide: true, options: ["sl", "sh", "st"], answer: "sl" },
            { type: "choice", q: "Listen. Which letters end this word?", say: "tooth", hide: true, vis: "🦷", visAlt: "picture", options: ["th", "sh", "st"], answer: "th" },
            build("brush", "c"),
            build("chick", "s"),
            { type: "type", q: "Listen and type the word.", say: "thank", hide: true, answer: "thank" },
            { type: "type", q: "Listen and type the word.", say: "shelf", hide: true, answer: "shelf" },
            { type: "choice", q: "Which word has a digraph (two letters, one sound)?", options: ["shop", "stop", "spot"], answer: "shop", sayOptions: true, explain: "<strong>sh</strong> in shop is one sound. st and sp are blends." }
          ] }
      ] },

      /* =================== LEVEL 4 — Story Explorers =================== */
      { sets: [
        { id: "ph-4-1", title: "Silent E", goal: "See how a silent e at the end makes the vowel say its name.",
          learn: [
            { title: "Magic e", text: "When a word ends in <strong>e</strong>, the e is <strong>silent</strong>. It makes the vowel before it say its <strong>name</strong>.",
              examples: [ex("cap", "cap", null, null, "short a"), ex("cape", "cap<b>e</b>", null, "a_e", "long a"), ex("kit", "kit"), ex("kite", "kit<b>e</b>", "🪁", "i_e"), ex("hop", "hop"), ex("hope", "hop<b>e</b>", null, "o_e"), ex("cub", "cub"), ex("cube", "cub<b>e</b>", "🧊", "u_e")],
              tip: "Read the word without the e first. Then add the e and change the vowel to its name: <em>pin → pine</em>." }
          ],
          items: [
            hear("cape", ["cape", "cap", "cup"]),
            hear("kite", ["kite", "kit", "cat"]),
            hear("hope", ["hope", "hop", "hip"]),
            hear("tube", ["tube", "tub", "tab"]),
            { type: "choice", q: "Add silent e. What is the new word?", prompt: "pin + e", options: ["pine", "pin", "pane"], answer: "pine", sayOptions: true },
            { type: "choice", q: "Add silent e. What is the new word?", prompt: "can + e", options: ["cane", "cone", "can"], answer: "cane", sayOptions: true },
            { type: "choice", q: "Which word has a long vowel sound?", options: ["bike", "bit", "bat"], answer: "bike", sayOptions: true, explain: "In <strong>bike</strong>, i says its name because of the silent e." },
            build("bone", "a", "🦴"),
            { type: "type", q: "Listen and type the word.", say: "made", hide: true, answer: "made" },
            { type: "type", q: "Listen and type the word.", say: "rope", hide: true, answer: "rope" }
          ] },

        { id: "ph-4-2", title: "Long A and Long E", goal: "Read long a (ai, ay, a_e) and long e (ee, ea).",
          learn: [
            { title: "Long a", text: "Long a says its name. It can be spelled <strong>ai</strong>, <strong>ay</strong>, or <strong>a_e</strong>.",
              examples: [ex("rain", "r<b>ai</b>n", "🌧️", "a_e"), ex("snail", "sn<b>ai</b>l", "🐌"), ex("day", "d<b>ay</b>"), ex("play", "pl<b>ay</b>"), ex("cake", "c<b>a</b>k<b>e</b>", "🍰")],
              tip: "<strong>ay</strong> usually comes at the <strong>end</strong> of a word: <em>day, play, say</em>." },
            { title: "Long e", text: "Long e says its name. It is often spelled <strong>ee</strong> or <strong>ea</strong>.",
              examples: [ex("tree", "tr<b>ee</b>", "🌳", "ee"), ex("bee", "b<b>ee</b>", "🐝"), ex("sheep", "sh<b>ee</b>p", "🐑"), ex("leaf", "l<b>ea</b>f", "🍃"), ex("eat", "<b>ea</b>t"), ex("sea", "s<b>ea</b>")] }
          ],
          items: [
            hear("rain", ["rain", "ran", "run"]),
            hear("feet", ["feet", "fat", "fit"]),
            hear("tray", ["tray", "try", "tree"]),
            { type: "choice", q: "Which spelling completes the word?", prompt: "pl _ _", say: "play", hide: true, options: ["ay", "ai", "ee"], answer: "ay", explain: "pl<strong>ay</strong> — ay comes at the end of a word." },
            { type: "choice", q: "Which spelling completes the word?", prompt: "tr _ _ n", say: "train", hide: true, vis: "🚂", visAlt: "picture", options: ["ai", "ay", "ea"], answer: "ai" },
            { type: "choice", q: "Which spelling completes the word?", prompt: "b _ _", say: "bee", hide: true, vis: "🐝", visAlt: "picture", options: ["ee", "ea", "ai"], answer: "ee" },
            { type: "match", q: "Match each word to its picture.", pairs: [["snail", pic("snail", "🐌")], ["leaf", pic("leaf", "🍃")], ["cake", pic("cake", "🍰")], ["sheep", pic("sheep", "🐑")]] },
            { type: "choice", q: "Which word has the long e sound?", options: ["seat", "set", "sat"], answer: "seat", sayOptions: true },
            build("mail", "y"),
            { type: "type", q: "Listen and type the word.", say: "green", hide: true, answer: "green" }
          ] },

        { id: "ph-4-3", title: "Long I, O and U", goal: "Read long i (i_e, igh, y), long o (o_e, oa, ow) and long u (u_e, ue, ew).",
          learn: [
            { title: "Long i", text: "Long i can be spelled <strong>i_e</strong>, <strong>igh</strong>, or <strong>y</strong> at the end of a word.",
              examples: [ex("bike", "b<b>i</b>k<b>e</b>", "🚲", "i_e"), ex("five", "f<b>i</b>v<b>e</b>", "5️⃣"), ex("night", "n<b>igh</b>t", null, "igh"), ex("light", "l<b>igh</b>t", "💡"), ex("fly", "fl<b>y</b>")] },
            { title: "Long o", text: "Long o can be spelled <strong>o_e</strong>, <strong>oa</strong>, or <strong>ow</strong>.",
              examples: [ex("bone", "b<b>o</b>n<b>e</b>", "🦴", "oa"), ex("boat", "b<b>oa</b>t", "⛵"), ex("goat", "g<b>oa</b>t", "🐐"), ex("snow", "sn<b>ow</b>", "❄️"), ex("bowl", "b<b>ow</b>l")] },
            { title: "Long u", text: "Long u can be spelled <strong>u_e</strong>, <strong>ue</strong>, or <strong>ew</strong>.",
              examples: [ex("cube", "c<b>u</b>b<b>e</b>", "🧊"), ex("blue", "bl<b>ue</b>"), ex("glue", "gl<b>ue</b>"), ex("new", "n<b>ew</b>")] }
          ],
          items: [
            hear("light", ["light", "lit", "let"]),
            hear("coat", ["coat", "cot", "cut"]),
            hear("cute", ["cute", "cut", "cat"]),
            { type: "choice", q: "Which spelling completes the word?", prompt: "n _ _ _ t", say: "night", hide: true, options: ["igh", "ie", "y"], answer: "igh", explain: "n<strong>igh</strong>t." },
            { type: "choice", q: "Which spelling completes the word?", prompt: "b _ _ t", say: "boat", hide: true, vis: "⛵", visAlt: "picture", options: ["oa", "ow", "oe"], answer: "oa" },
            { type: "choice", q: "Which spelling completes the word?", prompt: "sn _ _", say: "snow", hide: true, vis: "❄️", visAlt: "picture", options: ["ow", "oa", "o"], answer: "ow" },
            { type: "choice", q: "Which word has the long i sound?", options: ["sky", "skip", "ski"], answer: "sky", sayOptions: true, explain: "In <strong>sky</strong>, the y at the end says long i." },
            { type: "match", q: "Match each word to its picture.", pairs: [["bike", pic("bike", "🚲")], ["goat", pic("goat", "🐐")], ["bone", pic("bone", "🦴")], ["light", pic("light", "💡")]] },
            build("glue", "w"),
            { type: "type", q: "Listen and type the word.", say: "road", hide: true, answer: "road" }
          ] },

        { id: "ph-4-4", title: "Common Vowel Teams", goal: "Read oo (moon), oo (book), ie (pie) and ea (bread).",
          learn: [
            { title: "oo has two sounds", text: "<strong>oo</strong> can make a long sound, as in <em>moon</em>, or a short sound, as in <em>book</em>.",
              examples: [ex("moon", "m<b>oo</b>n", "🌙", "oo"), ex("spoon", "sp<b>oo</b>n", "🥄"), ex("zoo", "z<b>oo</b>"), ex("book", "b<b>oo</b>k", "📖", "oo-short"), ex("foot", "f<b>oo</b>t", "🦶"), ex("cook", "c<b>oo</b>k")] },
            { title: "ie and ea", text: "<strong>ie</strong> can say long i, as in <em>pie</em>. <strong>ea</strong> can say short e, as in <em>bread</em>.",
              examples: [ex("pie", "p<b>ie</b>", "🥧"), ex("tie", "t<b>ie</b>", "👔"), ex("bread", "br<b>ea</b>d", "🍞"), ex("head", "h<b>ea</b>d")],
              tip: "If a word does not sound right, try the other sound! <em>br-ee-d?</em> No. <em>br-e-d</em>. Yes!" }
          ],
          items: [
            hear("spoon", ["spoon", "spin", "span"]),
            hear("look", ["look", "lock", "lake"]),
            { type: "choice", q: "Listen. Is the oo long (moon) or short (book)?", say: "food", hide: true, options: ["long, like moon", "short, like book"], answer: "long, like moon", fixed: true },
            { type: "choice", q: "Listen. Is the oo long (moon) or short (book)?", say: "wood", hide: true, options: ["long, like moon", "short, like book"], answer: "short, like book", fixed: true },
            { type: "choice", q: "Listen. Is the oo long (moon) or short (book)?", say: "room", hide: true, options: ["long, like moon", "short, like book"], answer: "long, like moon", fixed: true },
            { type: "choice", q: "Which word rhymes with pie?", options: ["tie", "pig", "pet"], answer: "tie", sayOptions: true },
            { type: "choice", q: "Which word has ea saying short e, like bread?", options: ["head", "heat", "hear"], answer: "head", sayOptions: true },
            { type: "match", q: "Match each word to its picture.", pairs: [["spoon", pic("spoon", "🥄")], ["book", pic("book", "📖")], ["pie", pic("pie", "🥧")], ["bread", pic("bread", "🍞")]] },
            build("cook", "u"),
            { type: "type", q: "Listen and type the word.", say: "moon", hide: true, answer: "moon" }
          ] },

        { id: "ph-4-5", title: "Long Vowel Challenge", goal: "Read and spell long vowel words.",
          learn: [
            { title: "Long vowels say their names", text: "Remember the long vowel spellings: <strong>a_e, ai, ay · ee, ea · i_e, igh, y · o_e, oa, ow · u_e, ue, ew</strong>.",
              examples: [ex("game", "g<b>a</b>m<b>e</b>"), ex("seed", "s<b>ee</b>d"), ex("high", "h<b>igh</b>"), ex("toast", "t<b>oa</b>st"), ex("flute", "fl<b>u</b>t<b>e</b>")] }
          ],
          items: [
            hear("toast", ["toast", "test", "taste"]),
            hear("smile", ["smile", "small", "smell"]),
            hear("pray", ["pray", "pry", "press"]),
            { type: "match", q: "Match words that have the same vowel sound.", pairs: [["rain", "cake"], ["seat", "feet"], ["night", "kite"], ["boat", "bone"]] },
            { type: "choice", q: "Which word does NOT have a long vowel sound?", options: ["flag", "flame", "float"], answer: "flag", sayOptions: true, explain: "<strong>flag</strong> has short a. flame and float have long vowels." },
            { type: "choice", q: "Which spelling is correct?", say: "dream", hide: true, options: ["dream", "dreem", "drem"], answer: "dream", explain: "<strong>dream</strong> is spelled with ea." },
            { type: "choice", q: "Which spelling is correct?", say: "stone", hide: true, options: ["stone", "stoan", "ston"], answer: "stone" },
            { type: "type", q: "Listen and type the word.", say: "wait", hide: true, answer: "wait" },
            { type: "type", q: "Listen and type the word.", say: "bright", hide: true, answer: "bright" },
            { type: "type", q: "Listen and type the word.", say: "grow", hide: true, answer: "grow" }
          ] }
      ] },

      /* =================== LEVEL 5 — Super Explorers =================== */
      { sets: [
        { id: "ph-5-1", title: "R-Controlled Vowels", goal: "Read ar, or, er, ir and ur.",
          learn: [
            { title: "Bossy r", text: "When <strong>r</strong> comes after a vowel, it changes the vowel sound.",
              examples: [ex("car", "c<b>ar</b>", "🚗", "ar"), ex("star", "st<b>ar</b>", "⭐"), ex("corn", "c<b>or</b>n", "🌽", "or"), ex("horse", "h<b>or</b>se", "🐴"), ex("bird", "b<b>ir</b>d", "🐦", "er"), ex("turtle", "t<b>ur</b>tle", "🐢"), ex("letter", "lett<b>er</b>")],
              tip: "<strong>er</strong>, <strong>ir</strong> and <strong>ur</strong> make the <strong>same sound</strong>: h<em>er</em>, b<em>ir</em>d, t<em>ur</em>n." }
          ],
          items: [
            hear("farm", ["farm", "form", "firm"]),
            hear("short", ["short", "shirt", "shot"]),
            hear("burn", ["burn", "barn", "born"]),
            { type: "choice", q: "Which letters complete the word?", prompt: "c _ _", say: "car", hide: true, vis: "🚗", visAlt: "picture", options: ["ar", "or", "er"], answer: "ar" },
            { type: "choice", q: "Which letters complete the word?", prompt: "f _ _ k", say: "fork", hide: true, options: ["or", "ar", "ur"], answer: "or" },
            { type: "choice", q: "Which letters complete the word?", prompt: "b _ _ d", say: "bird", hide: true, vis: "🐦", visAlt: "picture", options: ["ir", "ur", "er"], answer: "ir", explain: "b<strong>ir</strong>d. ir, ur and er sound the same, so remember the spelling." },
            { type: "match", q: "Match each word to its picture.", pairs: [["horse", pic("horse", "🐴")], ["turtle", pic("turtle", "🐢")], ["corn", pic("corn", "🌽")], ["shirt", pic("shirt", "👕")]] },
            { type: "choice", q: "Which word has the same vowel sound as girl?", options: ["nurse", "north", "park"], answer: "nurse", sayOptions: true },
            { type: "type", q: "Listen and type the word.", say: "dark", hide: true, answer: "dark" },
            { type: "type", q: "Listen and type the word.", say: "storm", hide: true, answer: "storm" }
          ] },

        { id: "ph-5-2", title: "Diphthongs", goal: "Read ou, ow (cow), oi and oy.",
          learn: [
            { title: "ou and ow", text: "<strong>ou</strong> and <strong>ow</strong> can make the sound you say when you are hurt: “Ow!”",
              examples: [ex("house", "h<b>ou</b>se", "🏠", "ou"), ex("cloud", "cl<b>ou</b>d", "☁️"), ex("mouth", "m<b>ou</b>th", "👄"), ex("cow", "c<b>ow</b>", "🐮"), ex("owl", "<b>ow</b>l", "🦉"), ex("crown", "cr<b>ow</b>n", "👑")] },
            { title: "oi and oy", text: "<strong>oi</strong> and <strong>oy</strong> make the same sound. <strong>oy</strong> usually comes at the end.",
              examples: [ex("coin", "c<b>oi</b>n", "🪙", "oi"), ex("oil", "<b>oi</b>l"), ex("boy", "b<b>oy</b>", "👦"), ex("toy", "t<b>oy</b>")],
              tip: "Careful! <strong>ow</strong> has two sounds: <em>cow</em> (ow!) and <em>snow</em> (long o)." }
          ],
          items: [
            hear("cloud", ["cloud", "clown", "club"]),
            hear("coin", ["coin", "cone", "can"]),
            hear("town", ["town", "tone", "ton"]),
            { type: "choice", q: "Which letters complete the word?", prompt: "b _ _", say: "boy", hide: true, vis: "👦", visAlt: "picture", options: ["oy", "oi", "ow"], answer: "oy", explain: "b<strong>oy</strong> — oy comes at the end." },
            { type: "choice", q: "Which letters complete the word?", prompt: "p _ _ nt", say: "point", hide: true, options: ["oi", "oy", "ou"], answer: "oi" },
            { type: "choice", q: "Which letters complete the word?", prompt: "m _ _ th", say: "mouth", hide: true, options: ["ou", "ow", "oa"], answer: "ou" },
            { type: "choice", q: "Listen. Does ow sound like cow or like snow?", say: "brown", hide: true, options: ["like cow", "like snow"], answer: "like cow", fixed: true },
            { type: "choice", q: "Listen. Does ow sound like cow or like snow?", say: "grow", hide: true, options: ["like cow", "like snow"], answer: "like snow", fixed: true },
            { type: "match", q: "Match each word to its picture.", pairs: [["owl", pic("owl", "🦉")], ["house", pic("house", "🏠")], ["coin", pic("coin", "🪙")], ["crown", pic("crown", "👑")]] },
            { type: "type", q: "Listen and type the word.", say: "enjoy", hide: true, answer: "enjoy" }
          ] },

        { id: "ph-5-3", title: "Complex Consonant Patterns", goal: "Read soft c, soft g, kn, wr, tch, dge and ck.",
          learn: [
            { title: "Soft c and soft g", text: "Before <strong>e, i</strong> or <strong>y</strong>, c often says /s/ and g often says /j/.",
              examples: [ex("city", "<b>c</b>ity", null, null, "c says /s/"), ex("rice", "ri<b>c</b>e", "🍚"), ex("giraffe", "<b>g</b>iraffe", "🦒", null, "g says /j/"), ex("page", "pa<b>g</b>e")] },
            { title: "Silent letters and endings", text: "In <strong>kn</strong>, the k is silent. In <strong>wr</strong>, the w is silent. <strong>tch</strong> says ch, <strong>dge</strong> says j, <strong>ck</strong> says k.",
              examples: [ex("knock", "<b>k</b>nock", null, null, "silent k"), ex("write", "<b>w</b>rite", "✍️", null, "silent w"), ex("watch", "wa<b>tch</b>", "⌚"), ex("bridge", "bri<b>dge</b>", "🌉"), ex("duck", "du<b>ck</b>", "🦆")] }
          ],
          items: [
            { type: "choice", q: "Listen. What sound does c make in this word?", say: "face", hide: true, options: ["/s/ like sun", "/k/ like cat"], answer: "/s/ like sun", fixed: true },
            { type: "choice", q: "Listen. What sound does g make in this word?", say: "gem", hide: true, options: ["/j/ like jam", "/g/ like goat"], answer: "/j/ like jam", fixed: true },
            { type: "choice", q: "Listen. What sound does g make in this word?", say: "garden", hide: true, options: ["/j/ like jam", "/g/ like goat"], answer: "/g/ like goat", fixed: true },
            { type: "choice", q: "Which letter is silent in knee?", prompt: "knee", options: ["k", "n", "e"], answer: "k", explain: "In <strong>kn</strong>, the <strong>k</strong> is silent: we say “nee”." },
            { type: "choice", q: "Which letter is silent in wrong?", prompt: "wrong", options: ["w", "r", "g"], answer: "w" },
            { type: "choice", q: "Which spelling is correct?", say: "catch", hide: true, options: ["catch", "cach", "catsh"], answer: "catch" },
            { type: "choice", q: "Which spelling is correct?", say: "badge", hide: true, options: ["badge", "bage", "batch"], answer: "badge" },
            { type: "match", q: "Match each word to its picture.", pairs: [["giraffe", pic("giraffe", "🦒")], ["watch", pic("watch", "⌚")], ["bridge", pic("bridge", "🌉")], ["duck", pic("duck", "🦆")]] },
            { type: "type", q: "Listen and type the word.", say: "clock", hide: true, answer: "clock" },
            { type: "type", q: "Listen and type the word.", say: "know", hide: true, answer: "know", explain: "<strong>know</strong> has a silent k." }
          ] },

        { id: "ph-5-4", title: "Syllables and Word Decoding", goal: "Break long words into syllables to read them.",
          learn: [
            { title: "Syllables are word beats", text: "A <strong>syllable</strong> is one beat in a word. Clap as you say the word!",
              examples: [ex("cat", "cat", "🐱", null, "1 beat"), ex("rabbit", "rab · bit", "🐰", null, "2 beats"), ex("banana", "ba · na · na", "🍌", null, "3 beats"), ex("watermelon", "wa · ter · mel · on", "🍉", null, "4 beats")],
              tip: "To read a long word, cover part of it. Read one syllable at a time, then put them together: <em>pic · nic → picnic</em>." }
          ],
          items: [
            { type: "choice", q: "Listen and clap. How many syllables?", say: "pencil", hide: true, options: ["1", "2", "3"], answer: "2", fixed: true, explain: "pen · cil = <strong>2</strong>." },
            { type: "choice", q: "Listen and clap. How many syllables?", say: "elephant", hide: true, vis: "🐘", visAlt: "picture", options: ["1", "2", "3"], answer: "3", fixed: true, explain: "el · e · phant = <strong>3</strong>." },
            { type: "choice", q: "Listen and clap. How many syllables?", say: "dog", hide: true, options: ["1", "2", "3"], answer: "1", fixed: true },
            { type: "choice", q: "Listen and clap. How many syllables?", say: "butterfly", hide: true, vis: "🦋", visAlt: "picture", options: ["2", "3", "4"], answer: "3", fixed: true, explain: "but · ter · fly = <strong>3</strong>." },
            { type: "choice", q: "Which is the correct way to split this word into syllables?", prompt: "sunset", options: ["sun · set", "su · nset", "suns · et"], answer: "sun · set", explain: "sunset = <strong>sun + set</strong>, two small words." },
            { type: "choice", q: "Which is the correct way to split this word into syllables?", prompt: "basket", options: ["bas · ket", "ba · sket", "bask · et"], answer: "bas · ket" },
            { type: "words", q: "Put the syllables in order to make a word you hear.", say: "dinosaur", hide: true, answer: "di no saur", answerShow: "dinosaur" },
            { type: "match", q: "Put two words together. Match to make a compound word.", pairs: [["rain", "bow"], ["foot", "ball"], ["cup", "cake"], ["sun", "flower"]] },
            { type: "type", q: "Listen and type the word.", say: "picnic", hide: true, answer: "picnic" },
            { type: "type", q: "Listen and type the word.", say: "rocket", hide: true, answer: "rocket" }
          ] },

        { id: "ph-5-5", title: "Advanced Phonics Review", goal: "Use all your phonics skills to read and spell longer words.",
          learn: [
            { title: "Use your phonics tools", text: "When you meet a new word: <strong>1.</strong> Look for patterns you know (sh, ai, ar, igh). <strong>2.</strong> Split it into syllables. <strong>3.</strong> Blend and check it makes sense.",
              examples: [ex("thunder", "<b>th</b>un · d<b>er</b>"), ex("rainbow", "r<b>ai</b>n · b<b>ow</b>", "🌈"), ex("chicken", "<b>ch</b>i · <b>ck</b>en"), ex("spaceship", "sp<b>a</b>c<b>e</b> · <b>sh</b>ip")] }
          ],
          items: [
            hear("thirsty", ["thirsty", "thirty", "forty"]),
            hear("crowded", ["crowded", "crowned", "crawled"]),
            { type: "choice", q: "Which word has a silent letter?", options: ["knight", "night", "nine"], answer: "knight", sayOptions: true, explain: "<strong>knight</strong> has a silent k (and silent gh)." },
            { type: "choice", q: "Which spelling is correct?", say: "sharp", hide: true, options: ["sharp", "shorp", "sharpe"], answer: "sharp" },
            { type: "choice", q: "Which spelling is correct?", say: "joy", hide: true, options: ["joy", "joi", "jow"], answer: "joy" },
            { type: "match", q: "Match each word to its sound pattern.", pairs: [["storm", "or"], ["cloud", "ou"], ["bridge", "dge"], ["city", "soft c"]] },
            { type: "choice", q: "How many syllables are in this word?", prompt: "fantastic", say: "fantastic", options: ["2", "3", "4"], answer: "3", fixed: true, explain: "fan · tas · tic = <strong>3</strong>." },
            { type: "type", q: "Listen and type the word.", say: "sandwich", hide: true, answer: "sandwich" },
            { type: "type", q: "Listen and type the word.", say: "teacher", hide: true, answer: "teacher" },
            { type: "type", q: "Listen and type the word.", say: "playground", hide: true, answer: "playground" }
          ] }
      ] }
    ]
  });
})();
