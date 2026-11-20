/* =====================================================================
   TNS English Explorers — SPELLING STATION (25 activity sets)
   Listening questions never show the target spelling before the answer.
   Capital letters and end punctuation are not marked unless the item says so.
   ===================================================================== */
(function () {
  "use strict";
  function dict(word, vis) { return { type: "type", q: "Listen and type the word.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word }; }
  function tap(word, extra, vis) { return { type: "letters", q: "Listen. Tap the letters to spell the word.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word, extra: extra }; }
  function scr(word, vis) { return { type: "letters", q: "Unscramble the letters to spell the word you hear.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word }; }
  function pick(word, wrongs, vis) { return { type: "choice", q: "Listen. Which spelling is correct?", say: word, hide: true, vis: vis, visAlt: "picture", options: [word].concat(wrongs), answer: word }; }
  function gap(pattern, word, opts, vis) { return { type: "choice", q: "Listen. Which letter is missing?", say: word, hide: true, prompt: pattern, vis: vis, visAlt: "picture", options: opts, answer: opts[0], explain: "The word is <strong>" + word + "</strong>." }; }
  function gaps(pattern, word, opts, vis) { var g = gap(pattern, word, opts, vis); g.q = "Listen. Which letters are missing?"; return g; }
  function phr(text, accept) { return { type: "type", q: "Listen and type the words you hear.", say: text, hide: true, answer: text, accept: accept, long: true }; }
  function sen(text, accept) { return { type: "type", q: "Listen and type the sentence.", say: text, hide: true, answer: text, accept: accept, long: true, explain: "Check your spelling, spaces and full stop." }; }
  function ctx(sentence, options, answer, explain) { return { type: "choice", q: "Choose the correct word to complete the sentence.", text: sentence.replace("__", '<span class="blank" aria-label="blank">___</span>'), say: sentence.replace("__", answer), options: options, answer: answer, explain: explain, fixed: false }; }
  function ex(t, html, vis) { return { t: t, html: html, vis: vis }; }

  TNS.register("spelling", {
    intro: "Listen carefully, then spell words, phrases and sentences.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "sp-1-1", title: "Three-Letter Words with Short A", goal: "Spell short a words like cat and map.",
          learn: [{ title: "Short a words", text: "These words have three letters. The middle letter is <strong>a</strong>. Say each sound as you spell: <em>c – a – t</em>.",
            examples: [ex("cat", "c<b>a</b>t", "🐱"), ex("hat", "h<b>a</b>t", "🎩"), ex("bat", "b<b>a</b>t", "🦇"), ex("rat", "r<b>a</b>t", "🐀")],
            tip: "Say the word slowly. Write one letter for each sound." }],
          items: [tap("map", "o", "🗺️"), tap("bag", "e"), tap("fan", "u"), dict("cat", "🐱"), dict("jam"), dict("ham"), gap("d _ d", "dad", ["a", "i", "o"]), gap("_ an", "van", ["v", "f", "b"]), pick("cap", ["kap", "cep"]), dict("ran")] },

        { id: "sp-1-2", title: "Three-Letter Words with Short E and I", goal: "Spell words like pen, bed, pig and six.",
          learn: [{ title: "Short e and short i", text: "Listen to the middle sound. Is it <strong>e</strong> as in <em>pen</em>, or <strong>i</strong> as in <em>pin</em>?",
            examples: [ex("pen", "p<b>e</b>n", "🖊️"), ex("bed", "b<b>e</b>d", "🛏️"), ex("pig", "p<b>i</b>g", "🐷"), ex("six", "s<b>i</b>x", "6️⃣")] }],
          items: [tap("ten", "i", "🔟"), tap("leg", "a"), tap("win", "e"), dict("pen", "🖊️"), dict("lip"), dict("wet"), gap("b _ d", "bed", ["e", "i", "a"], "🛏️"), gap("s _ t", "sit", ["i", "e", "a"]), pick("big", ["beg", "bigg"]), dict("hen")] },

        { id: "sp-1-3", title: "Three-Letter Words with Short O and U", goal: "Spell words like dog, box, sun and cup.",
          learn: [{ title: "Short o and short u", text: "Listen to the middle sound. Is it <strong>o</strong> as in <em>hot</em>, or <strong>u</strong> as in <em>hut</em>?",
            examples: [ex("dog", "d<b>o</b>g", "🐶"), ex("box", "b<b>o</b>x", "📦"), ex("sun", "s<b>u</b>n", "☀️"), ex("bus", "b<b>u</b>s", "🚌")] }],
          items: [tap("hot", "u"), tap("cup", "o"), tap("top", "a"), dict("sun", "☀️"), dict("mud"), dict("pot"), gap("b _ x", "box", ["o", "u", "a"], "📦"), gap("r _ n", "run", ["u", "a", "o"]), pick("bug", ["bog", "bugg"], "🐞"), dict("fox", "🦊")] },

        { id: "sp-1-4", title: "Missing Letters", goal: "Find the missing first, middle or last letter.",
          learn: [{ title: "Find the missing letter", text: "Listen to the whole word. Then listen for the sound that is missing: the <strong>first</strong>, <strong>middle</strong> or <strong>last</strong> sound.",
            examples: [ex("_ en → hen", "<b>h</b>en"), ex("c _ p → cup", "c<b>u</b>p"), ex("ma _ → map", "ma<b>p</b>")] }],
          items: [gap("_ og", "log", ["l", "d", "f"]), gap("_ ish", "fish", ["f", "d", "w"], "🐟"), gap("c _ t", "cut", ["u", "a", "o"]), gap("p _ n", "pin", ["i", "e", "a"], "📌"), gap("we _", "web", ["b", "d", "t"], "🕸️"), gap("ne _", "net", ["t", "d", "p"]), gap("ja _", "jar", ["r", "m", "n"]), gap("_ es", "yes", ["y", "w", "l"]), gap("ki _", "kid", ["d", "t", "b"]), gap("g _ m", "gum", ["u", "o", "a"])] },

        { id: "sp-1-5", title: "Basic Spelling Challenge", goal: "Spell short vowel words on your own.",
          learn: [{ title: "Spell it!", text: "Listen. Say the word. Say each sound. Write a letter for each sound. Then read your word to check.",
            examples: [ex("sun", "s – u – n", "☀️"), ex("pig", "p – i – g", "🐷"), ex("bed", "b – e – d", "🛏️")] }],
          items: [dict("bat", "🦇"), dict("pig", "🐷"), dict("red"), dict("hop"), dict("tub"), dict("van"), dict("dig"), scr("jet"), scr("nut"), pick("sock", ["sok", "soc"], "🧦")] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "sp-2-1", title: "Family and Home Words", goal: "Spell words about family and home.",
          learn: [{ title: "Family and home", text: "These are words we use every day at home.",
            examples: [ex("mom", "mom", "👩"), ex("dad", "dad", "👨"), ex("baby", "baby", "👶"), ex("home", "home", "🏠"), ex("door", "door", "🚪"), ex("brother", "brother"), ex("sister", "sister")],
            tip: "<strong>brother</strong>, <strong>mother</strong> and <strong>father</strong> all end in <strong>-er</strong>." }],
          items: [dict("mom"), dict("baby", "👶"), dict("home", "🏠"), tap("door", "a", "🚪"), tap("bed", "i", "🛏️"), pick("sister", ["sistar", "sistr"]), pick("brother", ["bruther", "brothar"]), gaps("fa _ _ er", "father", ["th", "sh", "ch"]), scr("room"), dict("family")] },

        { id: "sp-2-2", title: "Food and Drink Words", goal: "Spell words for food and drinks.",
          learn: [{ title: "Food and drink", text: "Look carefully at each word. Some have double letters: <em>apple, dinner</em>.",
            examples: [ex("milk", "milk", "🥛"), ex("rice", "rice", "🍚"), ex("egg", "e<b>gg</b>", "🥚"), ex("apple", "a<b>pp</b>le", "🍎"), ex("bread", "bread", "🍞"), ex("water", "water", "💧"), ex("dates", "dates")] }],
          items: [dict("milk", "🥛"), dict("egg", "🥚"), dict("rice", "🍚"), tap("fish", "c", "🐟"), tap("cake", "o", "🍰"), pick("apple", ["aple", "appel"], "🍎"), pick("water", ["watar", "wotter"]), pick("bread", ["bred", "braed"], "🍞"), scr("juice"), dict("dates")] },

        { id: "sp-2-3", title: "School and Classroom Words", goal: "Spell words you use at school.",
          learn: [{ title: "At school", text: "These words help you talk about your classroom.",
            examples: [ex("book", "b<b>oo</b>k", "📖"), ex("pen", "pen", "🖊️"), ex("desk", "desk"), ex("bag", "bag", "🎒"), ex("chair", "ch<b>air</b>", "🪑"), ex("teacher", "t<b>ea</b>cher"), ex("school", "s<b>ch</b>ool", "🏫")],
            tip: "In <strong>school</strong>, the letters <strong>ch</strong> sound like <strong>k</strong>." }],
          items: [dict("book", "📖"), dict("desk"), dict("pencil", "✏️"), tap("bag", "e"), tap("chair", "e", "🪑"), pick("teacher", ["teecher", "teachar"]), pick("school", ["skool", "scool"], "🏫"), gaps("cl _ _ s", "class", ["as", "us", "es"]), scr("ruler"), dict("board")] },

        { id: "sp-2-4", title: "Animals and Nature Words", goal: "Spell words for animals and nature.",
          learn: [{ title: "Animals and nature", text: "Animals and nature are all around us — in the desert, at the sea, and in the garden.",
            examples: [ex("camel", "camel", "🐫"), ex("bird", "bird", "🐦"), ex("tree", "tr<b>ee</b>", "🌳"), ex("sea", "s<b>ea</b>", "🌊"), ex("flower", "flower", "🌸"), ex("horse", "horse", "🐴")] }],
          items: [dict("bird", "🐦"), dict("tree", "🌳"), dict("camel", "🐫"), tap("sea", "o", "🌊"), tap("sand", "e"), pick("flower", ["flowr", "flouer"], "🌸"), pick("horse", ["hors", "horce"], "🐴"), gap("ra _ bit", "rabbit", ["b", "d", "p"], "🐰"), scr("moon", "🌙"), dict("star", "⭐")] },

        { id: "sp-2-5", title: "Everyday Spelling Challenge", goal: "Spell everyday words from home, school and nature.",
          learn: [{ title: "Check your spelling", text: "After you spell a word, <strong>read it back</strong>. Does it look right? Does every sound have a letter?",
            examples: [ex("look", "l<b>oo</b>k"), ex("play", "pl<b>ay</b>"), ex("good", "g<b>oo</b>d")] }],
          items: [dict("play"), dict("look"), dict("good"), dict("friend"), tap("park", "e"), tap("ball", "o", "⚽"), pick("happy", ["hapy", "happi"]), pick("green", ["grean", "gren"]), scr("shoes", "👟"), dict("garden")] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "sp-3-1", title: "Words with Consonant Blends", goal: "Spell words with two consonants together: fr, st, nd, mp.",
          learn: [{ title: "Hear both sounds", text: "In a blend you can hear <strong>both</strong> consonants, so write <strong>both</strong> letters.",
            examples: [ex("frog", "<b>fr</b>og", "🐸"), ex("stop", "<b>st</b>op", "🛑"), ex("hand", "ha<b>nd</b>", "✋"), ex("lamp", "la<b>mp</b>")],
            tip: "A common mistake is to miss one letter: <em>fog</em> instead of <em>frog</em>. Listen for both sounds!" }],
          items: [dict("frog", "🐸"), dict("stop"), dict("hand", "✋"), dict("drum", "🥁"), tap("swim", "a"), tap("nest", "o"), pick("crab", ["carb", "crabb"], "🦀"), pick("gift", ["gitf", "gif"], "🎁"), gaps("_ _ ag", "flag", ["fl", "fr", "pl"], "🚩"), dict("plant")] },

        { id: "sp-3-2", title: "Words with Digraphs", goal: "Spell words with sh, ch, th, wh and ck.",
          learn: [{ title: "Two letters, one sound", text: "<strong>sh, ch, th, wh</strong> and <strong>ck</strong> are two letters that make one sound.",
            examples: [ex("ship", "<b>sh</b>ip", "🚢"), ex("chin", "<b>ch</b>in"), ex("bath", "ba<b>th</b>", "🛁"), ex("when", "<b>wh</b>en"), ex("duck", "du<b>ck</b>", "🦆")],
            tip: "<strong>ck</strong> comes right after a short vowel at the end of a word: <em>duck, sock, back</em>." }],
          items: [dict("ship", "🚢"), dict("fish", "🐟"), dict("chop"), dict("thin"), tap("shop", "c"), tap("back", "e"), pick("lunch", ["lunsh", "luntch"]), pick("whale", ["wale", "whail"], "🐋"), gaps("so _ _", "sock", ["ck", "sh", "ch"], "🧦"), dict("thank")] },

        { id: "sp-3-3", title: "Silent E Words", goal: "Spell words with a silent e at the end.",
          learn: [{ title: "Do not forget the e!", text: "You cannot hear the e at the end, but it makes the vowel say its name. <em>cap → cape</em>.",
            examples: [ex("cake", "cak<b>e</b>", "🍰"), ex("bike", "bik<b>e</b>", "🚲"), ex("home", "hom<b>e</b>", "🏠"), ex("cube", "cub<b>e</b>", "🧊")] }],
          items: [dict("cake", "🍰"), dict("bike", "🚲"), dict("nose", "👃"), dict("time"), tap("lake", "i"), tap("ride", "o"), pick("five", ["fiv", "fyve"], "5️⃣"), pick("bone", ["bon", "boan"], "🦴"), { type: "choice", q: "Add silent e. Which new word do you make?", prompt: "hop + e", options: ["hope", "hoop", "hip"], answer: "hope", sayOptions: true }, dict("smile")] },

        { id: "sp-3-4", title: "Common Sight Words", goal: "Spell important words that do not follow the usual rules.",
          learn: [{ title: "Tricky words", text: "Some words do not sound the way they look. We learn them by heart. <strong>Look, say, cover, write, check!</strong>",
            examples: [ex("said", "said"), ex("they", "they"), ex("have", "have"), ex("come", "come"), ex("some", "some"), ex("was", "was"), ex("one", "one")] }],
          items: [dict("said"), dict("they"), dict("was"), dict("have"), pick("come", ["cum", "kome"]), pick("some", ["sum", "som"]), pick("one", ["won", "wun"]), ctx("I have __ brothers.", ["two", "to", "too"], "two", "<strong>two</strong> is the number 2."), tap("were", "a"), dict("there")] },

        { id: "sp-3-5", title: "Spelling Pattern Review", goal: "Use blends, digraphs, silent e and sight words.",
          learn: [{ title: "Remember the patterns", text: "Blends (<em>st</em>), digraphs (<em>sh</em>), silent e (<em>cake</em>) and tricky words (<em>said</em>).",
            examples: [ex("stone", "<b>st</b>on<b>e</b>"), ex("shape", "<b>sh</b>ap<b>e</b>"), ex("white", "<b>wh</b>it<b>e</b>")] }],
          items: [dict("stone"), dict("shape"), dict("white"), dict("black"), tap("plate", "o"), tap("chest", "a"), pick("brush", ["bruch", "brushe"]), pick("they", ["thay", "thei"]), phr("a big ship", ["a big ship"]), phr("the red flag")] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "sp-4-1", title: "Long Vowel Spelling Patterns", goal: "Choose the right spelling for long vowel sounds.",
          learn: [{ title: "Same sound, different spellings", text: "A long vowel sound can be spelled in different ways. Look at where the sound is in the word.",
            examples: [ex("rain", "r<b>ai</b>n"), ex("play", "pl<b>ay</b>"), ex("tree", "tr<b>ee</b>"), ex("beach", "b<b>ea</b>ch"), ex("night", "n<b>igh</b>t"), ex("boat", "b<b>oa</b>t"), ex("snow", "sn<b>ow</b>"), ex("blue", "bl<b>ue</b>")],
            tip: "<strong>ay</strong> and <strong>ow</strong> often come at the <strong>end</strong> of a word. <strong>ai</strong> and <strong>oa</strong> come in the middle." }],
          items: [dict("rain", "🌧️"), dict("boat", "⛵"), dict("night"), dict("beach", "🏖️"), pick("play", ["plai", "pley"]), pick("snow", ["snoa", "sno"], "❄️"), pick("sleep", ["sleap", "slep"]), gaps("tr _ _ n", "train", ["ai", "ay", "a"], "🚂"), gaps("l _ _ _ t", "light", ["igh", "ite", "ie"], "💡"), dict("queen")] },

        { id: "sp-4-2", title: "Plural Endings", goal: "Add -s, -es or -ies to make more than one.",
          learn: [{ title: "More than one", text: "Most words add <strong>-s</strong>. Words ending in <strong>s, x, sh, ch</strong> add <strong>-es</strong>. Words ending in a consonant + <strong>y</strong> change y to <strong>-ies</strong>.",
            examples: [ex("cat → cats", "cat<b>s</b>"), ex("box → boxes", "box<b>es</b>"), ex("dish → dishes", "dish<b>es</b>"), ex("baby → babies", "bab<b>ies</b>"), ex("toy → toys", "toy<b>s</b>", null)],
            tip: "<em>toy</em> has a vowel before the y, so just add -s: <strong>toys</strong>." }],
          items: [
            { type: "choice", q: "How do you spell more than one?", prompt: "one bus → two ___", options: ["buses", "buss", "busies"], answer: "buses", explain: "bus ends in s, so add <strong>-es</strong>." },
            { type: "choice", q: "How do you spell more than one?", prompt: "one baby → two ___", options: ["babies", "babys", "babyes"], answer: "babies", explain: "Consonant + y → change y to <strong>ies</strong>." },
            { type: "choice", q: "How do you spell more than one?", prompt: "one boy → two ___", options: ["boys", "boies", "boyes"], answer: "boys", explain: "Vowel + y → just add <strong>-s</strong>." },
            { type: "choice", q: "How do you spell more than one?", prompt: "one watch → two ___", options: ["watches", "watchs", "watchies"], answer: "watches" },
            dict("dogs"), dict("foxes"), dict("dishes"), dict("cities"), dict("pencils"), phr("three red boxes")] },

        { id: "sp-4-3", title: "Words Ending in -ing", goal: "Add -ing to verbs, with the right spelling changes.",
          learn: [{ title: "Adding -ing", text: "Most words just add <strong>-ing</strong>. If a word ends in silent <strong>e</strong>, drop the e. If a short word ends in one vowel + one consonant, <strong>double</strong> the last letter.",
            examples: [ex("play → playing", "play<b>ing</b>"), ex("make → making", "mak<b>ing</b>"), ex("run → running", "ru<b>nn</b>ing"), ex("swim → swimming", "swi<b>mm</b>ing")] }],
          items: [
            { type: "choice", q: "Add -ing. Which spelling is correct?", prompt: "ride + ing", options: ["riding", "rideing", "ridding"], answer: "riding", explain: "Drop the silent e: <strong>riding</strong>." },
            { type: "choice", q: "Add -ing. Which spelling is correct?", prompt: "sit + ing", options: ["sitting", "siting", "sitteing"], answer: "sitting", explain: "Short vowel + one consonant: double it → <strong>sitting</strong>." },
            { type: "choice", q: "Add -ing. Which spelling is correct?", prompt: "read + ing", options: ["reading", "readding", "reeding"], answer: "reading" },
            dict("playing"), dict("jumping"), dict("running"), dict("making"), dict("swimming"), dict("writing"), sen("The boys are playing.")] },

        { id: "sp-4-4", title: "Words Ending in -ed", goal: "Add -ed to talk about the past.",
          learn: [{ title: "Adding -ed", text: "Add <strong>-ed</strong> for the past. Words ending in <strong>e</strong> just add <strong>-d</strong>. Short words like <em>stop</em> double the last letter.",
            examples: [ex("jump → jumped", "jump<b>ed</b>"), ex("like → liked", "like<b>d</b>"), ex("stop → stopped", "sto<b>pp</b>ed"), ex("cry → cried", "cr<b>ied</b>")],
            tip: "-ed can sound like /t/ (jumped), /d/ (played) or /id/ (wanted), but it is always spelled <strong>-ed</strong>." }],
          items: [
            { type: "choice", q: "Add -ed. Which spelling is correct?", prompt: "hop + ed", options: ["hopped", "hoped", "hopt"], answer: "hopped", explain: "<strong>hopped</strong> (jumped). <em>hoped</em> comes from <em>hope</em>." },
            { type: "choice", q: "Add -ed. Which spelling is correct?", prompt: "smile + ed", options: ["smiled", "smileed", "smilled"], answer: "smiled" },
            { type: "choice", q: "Add -ed. Which spelling is correct?", prompt: "carry + ed", options: ["carried", "carryed", "caried"], answer: "carried" },
            dict("played"), dict("jumped"), dict("wanted"), dict("stopped"), dict("liked"), dict("cleaned"), sen("We walked to school.")] },

        { id: "sp-4-5", title: "Longer Word Challenge", goal: "Spell two-syllable words one part at a time.",
          learn: [{ title: "Spell in parts", text: "Clap the syllables. Spell one syllable at a time: <em>gar · den → garden</em>.",
            examples: [ex("garden", "gar · den"), ex("window", "win · dow", "🪟"), ex("rabbit", "rab · bit", "🐰"), ex("basket", "bas · ket", "🧺")] }],
          items: [dict("garden"), dict("window"), dict("rabbit", "🐰"), dict("kitten"), dict("basket"), dict("monkey", "🐒"), pick("yellow", ["yelow", "yello"]), pick("dinner", ["diner", "dinnar"]), pick("happen", ["hapen", "happan"]), sen("My sister has a kitten.")] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "sp-5-1", title: "Multisyllabic Words", goal: "Spell long words with three or more syllables.",
          learn: [{ title: "Long words, small parts", text: "Break long words into syllables. Say each part clearly as you spell it.",
            examples: [ex("butterfly", "but · ter · fly", "🦋"), ex("elephant", "el · e · phant", "🐘"), ex("computer", "com · pu · ter", "💻"), ex("umbrella", "um · brel · la", "☂️")] }],
          items: [dict("butterfly", "🦋"), dict("elephant", "🐘"), dict("computer", "💻"), dict("umbrella", "☂️"), dict("hospital", "🏥"), dict("remember"), pick("tomorrow", ["tommorow", "tomorow"]), pick("important", ["importent", "inportant"]), pick("together", ["togather", "togeter"]), dict("banana", "🍌")] },

        { id: "sp-5-2", title: "Irregularly Spelled Words", goal: "Spell common words with unusual spellings.",
          learn: [{ title: "Tricky spellings", text: "These words have letters you do not hear clearly. Look closely and remember them.",
            examples: [ex("friend", "fr<b>ie</b>nd"), ex("people", "p<b>eo</b>ple"), ex("because", "bec<b>au</b>se"), ex("laugh", "lau<b>gh</b>"), ex("eight", "<b>eigh</b>t", "8️⃣"), ex("beautiful", "b<b>eau</b>tiful")],
            tip: "Memory trick: <em>a <strong>fri</strong>end is there to the <strong>end</strong></em>." }],
          items: [dict("friend"), dict("because"), dict("people"), dict("eight", "8️⃣"), pick("laugh", ["laff", "lagh"]), pick("beautiful", ["beautifull", "butiful"]), pick("answer", ["anser", "ansir"]), pick("enough", ["enuf", "enogh"]), dict("again"), dict("busy")] },

        { id: "sp-5-3", title: "Commonly Confused Spellings", goal: "Choose between words that sound the same but are spelled differently.",
          learn: [{ title: "Sound the same, different meaning", text: "Some words sound the same but have different spellings and meanings. Use the <strong>sentence</strong> to choose.",
            examples: [ex("there / their", "<b>there</b> = a place · <b>their</b> = belongs to them"), ex("to / two / too", "<b>two</b> = 2 · <b>too</b> = also"), ex("hear / here", "<b>hear</b> with your <b>ear</b>"), ex("write / right", "<b>write</b> a story · the <b>right</b> answer")] }],
          items: [
            ctx("The children put on __ coats.", ["their", "there", "they're"], "their", "<strong>their</strong> = belonging to them."),
            ctx("Your bag is over __.", ["there", "their"], "there", "<strong>there</strong> = in that place."),
            ctx("I can __ the birds singing.", ["hear", "here"], "hear", "You <strong>hear</strong> with your ear."),
            ctx("Please come __ and sit down.", ["here", "hear"], "here"),
            ctx("I want to __ a letter to my grandma.", ["write", "right"], "write"),
            ctx("This tea is __ hot to drink.", ["too", "two", "to"], "too", "<strong>too</strong> = more than is good."),
            ctx("We swam in the __ last summer.", ["sea", "see"], "sea"),
            ctx("Mom will __ some fruit at the shop.", ["buy", "by"], "buy"),
            ctx("__ is your new school?", ["Where", "Were", "Wear"], "Where"),
            ctx("I __ a big piece of cake.", ["ate", "eight"], "ate")] },

        { id: "sp-5-4", title: "Word and Phrase Dictation", goal: "Listen and write words and short phrases correctly.",
          learn: [{ title: "Dictation tips", text: "<strong>1.</strong> Listen to the whole phrase. <strong>2.</strong> Say it quietly. <strong>3.</strong> Write it. <strong>4.</strong> Listen again and check every word.",
            examples: [ex("in the morning", "in the morning"), ex("my best friend", "my best friend")] }],
          items: [dict("library"), dict("favorite"), phr("a glass of water"), phr("in the morning"), phr("my best friend"), phr("under the table"), phr("after school"), phr("a beautiful garden"), phr("next to the window"), phr("three yellow birds")] },

        { id: "sp-5-5", title: "Sentence Dictation Challenge", goal: "Listen and write complete sentences.",
          learn: [{ title: "Writing a sentence", text: "Start with a <strong>capital letter</strong>. Leave a <strong>space</strong> between words. End with a <strong>full stop</strong>. Listen as many times as you need.",
            examples: [ex("The cat is sleeping.", "<b>T</b>he cat is sleeping<b>.</b>")] }],
          items: [sen("We play football after school."), sen("My father works in a hospital."), sen("The sun is very hot today."), sen("I read a book before bed."), sen("Our teacher is kind and funny."), sen("The birds are flying over the trees."), sen("She bought three apples at the market."), sen("We visited our grandparents on Friday."), sen("My brother is taller than me."), sen("Please close the door quietly.")] }
      ] }
    ]
  });
})();
