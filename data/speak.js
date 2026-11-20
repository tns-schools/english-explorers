/* =====================================================================
   TNS English Explorers — SPEAK & SHINE (25 activity sets)
   Listen → Repeat → Practice → Check.  NO microphone, NO recording.
   "I practiced saying it" records PRACTICE only — never a pronunciation score.
   Sound-discrimination and "best expression" questions ARE scored, because
   they test listening and understanding, not the student's own speech.
   Voices: f = main female narrator, m = male dialogue voice.
   ===================================================================== */
(function () {
  "use strict";
  function say(text, vis, extra) { var o = { type: "speak", q: "Listen. Then say it 3 times.", say: text, prompt: text, vis: vis, visAlt: text }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  function sent(text) { return { type: "speak", q: "Listen to the sentence. Then say it aloud.", say: text, text: '<p class="say-big">' + text + "</p>", times: 2 }; }
  function which(word, options, explain) { return { type: "choice", q: "Listen carefully. Which word do you hear?", say: word, hide: true, options: options, answer: word, explain: explain }; }
  function pair(a, b, note) { return { type: "speak", q: "Listen to the two words. Say them: first, second, first, second.", say: a + " ... " + b, prompt: a + "  ·  " + b, times: 2, explain: note, slowAuto: true }; }
  function best(q, options, answer, explain) { return { type: "choice", q: q, options: options, answer: answer, sayOptions: true, explain: explain }; }
  function stress(word, syll, idx) { return { type: "speak", q: "Listen. Say the word. Make the big part strong.", say: word, syll: syll, stress: idx }; }
  function stressQ(word, syll, idx) { return { type: "choice", q: "Listen. Which part of the word is strong (stressed)?", say: word, prompt: syll.join(" · "), options: syll.map(function (s, k) { return (k + 1) + ". " + s; }), answer: (idx + 1) + ". " + syll[idx], fixed: true, explain: syll.map(function (s, k) { return k === idx ? "<strong>" + s.toUpperCase() + "</strong>" : s; }).join(" · ") }; }
  /* Two speakers of the same gender get two different voices (f/f2, m/m2). */
  function voices(lines) { var seen = { f: [], m: [] }; lines.forEach(function (l) { var g = l.voice, list = seen[g]; if (list.indexOf(l.sp) < 0) list.push(l.sp); if (list.indexOf(l.sp) === 1) l.voice = g + "2"; }); return lines; }
  function talk(q, lines, practice) { return { type: "dialogue", q: q, lines: voices(lines), practice: practice }; }
  function F(sp, t) { return { sp: sp, t: t, voice: "f" }; }
  function M(sp, t) { return { sp: sp, t: t, voice: "m" }; }
  function ex(t, vis, note) { return { t: t, vis: vis, note: note }; }

  TNS.register("speak", {
    intro: "Listen, repeat and speak with confidence. No microphone is needed — you practice out loud, then tap the green button.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "sk-1-1", title: "Basic English Sounds", goal: "Say short words with clear English sounds.",
          learn: [{ title: "Listen, then say", text: "Listen to each word. Look at the picture. Then say the word clearly. Move your mouth a lot — English sounds need big, clear lips!",
            examples: [ex("map", "🗺️"), ex("sun", "☀️"), ex("fish", "🐟"), ex("bed", "🛏️")],
            tip: "You can tap <strong>Slow</strong> to hear the word more slowly." }],
          items: [say("map", "🗺️"), say("sun", "☀️"), say("fish", "🐟"), say("bed", "🛏️"), which("pig", ["pig", "peg", "pug"]), say("cup"), say("dog", "🐶"), which("hat", ["hat", "hot", "hut"])] },

        { id: "sk-1-2", title: "Everyday One-Syllable Words", goal: "Say short words we use every day.",
          learn: [{ title: "Little words, used a lot", text: "These short words are very useful. Say each one in one beat.",
            examples: [ex("yes", null, "✔"), ex("no", null, "✖"), ex("hi"), ex("book", "📖"), ex("door", "🚪"), ex("ball", "⚽")] }],
          items: [say("yes"), say("no"), say("book", "📖"), say("door", "🚪"), say("ball", "⚽"), say("chair", "🪑"), which("book", ["book", "box", "back"]), which("door", ["door", "dog", "day"])] },

        { id: "sk-1-3", title: "Numbers and Colors", goal: "Say numbers one to ten and color words.",
          learn: [{ title: "Numbers and colors", text: "Listen and repeat. Count with your fingers as you say the numbers!",
            examples: [ex("one, two, three, four, five"), ex("six, seven, eight, nine, ten"), { t: "red", vis: "svg:color-red" }, { t: "blue", vis: "svg:color-blue" }, { t: "green", vis: "svg:color-green" }, { t: "yellow", vis: "svg:color-yellow" }] }],
          items: [say("one, two, three, four, five", null, { prompt: "1 2 3 4 5" }), say("six, seven, eight, nine, ten", null, { prompt: "6 7 8 9 10" }), say("red", "svg:color-red"), say("blue", "svg:color-blue"), say("yellow", "svg:color-yellow"),
            which("seven", ["seven", "eleven", "six"]), which("green", ["green", "gray", "red"]), say("thirteen")] },

        { id: "sk-1-4", title: "Familiar Classroom Words", goal: "Say the names of things in your classroom.",
          learn: [{ title: "In my classroom", text: "Point to each thing in your classroom as you say its name.",
            examples: [ex("pencil", "✏️"), ex("book", "📖"), ex("bag", "🎒"), ex("ruler", "📏"), ex("scissors", "✂️"), ex("teacher")] }],
          items: [say("pencil", "✏️"), say("ruler", "📏"), say("scissors", "✂️"), say("eraser"), say("teacher"), say("board"), which("ruler", ["ruler", "rubber", "rule"]), which("desk", ["desk", "disk", "dusk"])] },

        { id: "sk-1-5", title: "Listen and Repeat Challenge", goal: "Say short phrases clearly.",
          learn: [{ title: "Words together", text: "Now say two or three words together, smoothly, like one long word.",
            examples: [ex("a red ball"), ex("two cats"), ex("my blue bag")] }],
          items: [say("a red ball", "⚽"), say("two cats"), say("my blue bag"), say("a big dog", "🐶"), say("three green trees", "🌳"), which("two cats", ["two cats", "two hats", "too fat"]), which("a big bag", ["a big bag", "a pig bag", "a big back"]), say("I like apples.", "🍎")] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "sk-2-1", title: "Greetings", goal: "Say hello and goodbye at different times of day.",
          learn: [{ title: "Hello and goodbye", text: "We greet people when we meet them. The greeting changes with the time of day.",
            examples: [ex("Good morning!", "🌅", "before 12 o'clock"), ex("Good afternoon!", "☀️", "after 12 o'clock"), ex("Good evening!", "🌆", "after sunset"), ex("Goodbye! See you tomorrow!", "👋")] }],
          items: [say("Good morning!", "🌅"), say("Good afternoon!", "☀️"), say("Hello! How are you?"), say("I'm fine, thank you. And you?"),
            best("It is 8 o'clock in the morning. What do you say to your teacher?", ["Good morning!", "Good evening!", "Good night!"], "Good morning!"),
            best("You are leaving school. What do you say to your friend?", ["See you tomorrow!", "Nice to meet you!", "Good morning!"], "See you tomorrow!"),
            talk("Listen to the conversation. Then practice Sara's lines.", [F("Sara", "Good morning, Ms. Huda!"), F("Ms. Huda", "Good morning, Sara! How are you today?"), F("Sara", "I'm fine, thank you. And you?"), F("Ms. Huda", "I'm very well, thank you.")], "Sara"),
            say("Goodbye! See you tomorrow!", "👋")] },

        { id: "sk-2-2", title: "Introducing Yourself", goal: "Say your name, age and where you are from.",
          learn: [{ title: "All about me", text: "When you meet someone new, you can tell them about yourself. Change the words to talk about <strong>you</strong>.",
            examples: [ex("My name is Omar."), ex("I am eight years old."), ex("I am from Saudi Arabia."), ex("Nice to meet you!")],
            tip: "You do not have to use your real name when you practice. You can use a name from the examples." }],
          items: [say("My name is Omar."), say("I am eight years old."), say("I am from Saudi Arabia."), say("Nice to meet you!"),
            best("Someone asks, \"What's your name?\" What is a good answer?", ["My name is Lina.", "I am fine.", "I am eight."], "My name is Lina."),
            best("Someone asks, \"How old are you?\" What is a good answer?", ["I am nine years old.", "I am from Riyadh.", "Nice to meet you."], "I am nine years old."),
            talk("Listen to the conversation. Then practice Omar's lines.", [M("Omar", "Hi! My name is Omar. What's your name?"), M("Yusuf", "Hi, Omar! My name is Yusuf."), M("Omar", "Nice to meet you, Yusuf!"), M("Yusuf", "Nice to meet you, too!")], "Omar"),
            say("What's your name?")] },

        { id: "sk-2-3", title: "Polite Expressions", goal: "Use please, thank you, sorry and excuse me.",
          learn: [{ title: "Magic words", text: "Polite words make people happy. Use them every day!",
            examples: [ex("Please."), ex("Thank you."), ex("You're welcome."), ex("Sorry."), ex("Excuse me.")] }],
          items: [say("Please."), say("Thank you very much."), say("You're welcome."), say("Excuse me."), say("I'm sorry."),
            best("Your friend gives you a pencil. What do you say?", ["Thank you!", "Sorry!", "Excuse me!"], "Thank you!"),
            best("You step on someone's foot by mistake. What do you say?", ["I'm sorry!", "You're welcome!", "Please!"], "I'm sorry!"),
            best("Someone says \"Thank you\" to you. What do you say?", ["You're welcome.", "Excuse me.", "Goodbye."], "You're welcome.")] },

        { id: "sk-2-4", title: "Everyday Requests", goal: "Ask for things politely.",
          learn: [{ title: "Asking for things", text: "Start with <strong>Can I…</strong> or <strong>Can you…</strong> and end with <strong>please</strong>.",
            examples: [ex("Can I have some water, please?", "💧"), ex("Can you help me, please?"), ex("Can I borrow your eraser, please?")],
            tip: "Your voice goes <strong>up</strong> at the end of these questions." }],
          items: [say("Can I have some water, please?", "💧"), say("Can you help me, please?"), say("Can I borrow your eraser, please?"), say("Can I open the window, please?", "🪟"),
            best("You are thirsty. What do you say?", ["Can I have some water, please?", "Can you open the door?", "I am hungry."], "Can I have some water, please?"),
            best("Your bag is very heavy. What do you say to your friend?", ["Can you help me, please?", "Can I have your bag?", "Thank you, goodbye."], "Can you help me, please?"),
            talk("Listen to the conversation. Then practice Lina's lines.", [F("Lina", "Excuse me, Mom. Can I have an apple, please?"), F("Mom", "Of course. Here you are."), F("Lina", "Thank you!")], "Lina"),
            say("Here you are.")] },

        { id: "sk-2-5", title: "Useful Classroom Expressions", goal: "Speak English with your teacher in class.",
          learn: [{ title: "Talking in class", text: "Use these sentences to talk with your teacher in English.",
            examples: [ex("Can you say that again, please?"), ex("I don't understand."), ex("How do you say this in English?"), ex("I'm finished!")] }],
          items: [say("Can you say that again, please?"), say("I don't understand."), say("How do you say this in English?"), say("I'm finished!"), say("May I come in?"),
            best("You did not hear your teacher. What do you say?", ["Can you say that again, please?", "I'm finished!", "May I come in?"], "Can you say that again, please?"),
            best("You are late. You are at the classroom door. What do you say?", ["May I come in?", "Goodbye!", "I don't understand."], "May I come in?"),
            best("You finished your work. What do you tell your teacher?", ["I'm finished!", "I'm sorry!", "Excuse me!"], "I'm finished!")] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "sk-3-1", title: "P and B Sound Distinction", goal: "Hear and say the difference between /p/ and /b/.",
          learn: [{ title: "/p/ and /b/", text: "Both sounds use your lips. For <strong>p</strong>, push out a puff of air — hold your hand in front of your mouth and feel it! For <strong>b</strong>, there is no puff, and your voice is on.",
            examples: [ex("pen"), ex("Ben"), ex("pig", "🐷"), ex("big"), ex("pear", "🍐"), ex("bear", "🐻")],
            tip: "Try with a small piece of paper in front of your mouth. On <strong>p</strong>, the paper moves!" }],
          items: [which("pen", ["pen", "Ben"]), which("big", ["pig", "big"]), which("bear", ["pear", "bear"]), which("park", ["park", "bark"]), pair("pen", "Ben"), pair("pear", "bear"), which("cab", ["cap", "cab"]), say("Please pass the blue pen.")] },

        { id: "sk-3-2", title: "F and V Sound Distinction", goal: "Hear and say the difference between /f/ and /v/.",
          learn: [{ title: "/f/ and /v/", text: "Put your top teeth on your bottom lip for both sounds. For <strong>f</strong>, just blow air. For <strong>v</strong>, turn your voice on — your lip will buzz!",
            examples: [ex("fan"), ex("van"), ex("fine"), ex("vine"), ex("safe"), ex("save")],
            tip: "Touch your throat. On <strong>v</strong>, you can feel it buzz. On <strong>f</strong>, it is quiet." }],
          items: [which("van", ["fan", "van"]), which("fine", ["fine", "vine"]), which("save", ["safe", "save"]), which("ferry", ["ferry", "very"]), pair("fan", "van"), pair("fine", "vine"), which("leaf", ["leaf", "leave"]), say("I have five very funny videos.")] },

        { id: "sk-3-3", title: "Voiced and Voiceless TH Sounds", goal: "Say th in think and in this.",
          learn: [{ title: "Two th sounds", text: "Put your tongue between your teeth for <strong>th</strong>. In <em>think</em>, just blow air (no voice). In <em>this</em>, turn your voice on.",
            examples: [ex("think", null, "no voice"), ex("three", "3️⃣", "no voice"), ex("thank you", null, "no voice"), ex("this", null, "voice on"), ex("mother", null, "voice on"), ex("brother", null, "voice on")],
            tip: "Do not say <em>tree</em> for <em>three</em>, or <em>dis</em> for <em>this</em>. Show your tongue!" }],
          items: [which("three", ["three", "tree"]), which("thin", ["thin", "tin"]), which("they", ["they", "day"]), which("mouth", ["mouth", "mouse"]), pair("three", "tree"), pair("they", "day"), say("Thank you, brother."), say("I think this is the third one.")] },

        { id: "sk-3-4", title: "Similar Vowel Sounds", goal: "Hear the difference between short and long vowels.",
          learn: [{ title: "Short or long?", text: "Some English words are almost the same — only the vowel is a little shorter or longer. <em>ship</em> is short. <em>sheep</em> is long: smile and stretch it!",
            examples: [ex("ship", "🚢", "short"), ex("sheep", "🐑", "long"), ex("sit", null, "short"), ex("seat", null, "long"), ex("full", null, "short"), ex("fool", null, "long")] }],
          items: [which("sheep", ["ship", "sheep"]), which("sit", ["sit", "seat"]), which("full", ["full", "fool"]), which("bad", ["bed", "bad"]), which("cup", ["cap", "cup"]), pair("ship", "sheep"), pair("sit", "seat"), say("The sheep is on the ship.")] },

        { id: "sk-3-5", title: "Sound Discrimination Challenge", goal: "Use all your listening skills to tell similar words apart.",
          learn: [{ title: "Listen like a detective", text: "Listen very carefully. Only <strong>one sound</strong> is different in each pair. Remember: <em>p/b</em>, <em>f/v</em>, <em>th/t</em>, and short/long vowels.",
            examples: [ex("pear · bear"), ex("fan · van"), ex("thin · tin"), ex("ship · sheep")] }],
          items: [which("bear", ["pear", "bear"]), which("vine", ["fine", "vine"]), which("tin", ["thin", "tin"]), which("seat", ["sit", "seat"]), which("pig", ["pig", "big"]), which("three", ["free", "three", "tree"]), pair("thin", "tin"), say("Ben has a very big brown bear.")] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "sk-4-1", title: "Two-Syllable Words", goal: "Say two-beat words with the right strong part.",
          learn: [{ title: "Two beats", text: "These words have <strong>two syllables</strong>. One part is <strong>strong</strong>: say it a little louder and longer. The strong part is in <strong>big letters</strong>.",
            examples: [{ t: "teacher", html: "<span class=\"hl\">TEA</span>·cher" }, { t: "pencil", html: "<span class=\"hl\">PEN</span>·cil" }, { t: "window", html: "<span class=\"hl\">WIN</span>·dow" }, { t: "hello", html: "hel·<span class=\"hl\">LO</span>" }],
            tip: "Most two-syllable <strong>things</strong> (nouns) are strong at the start: <em>TEAcher, PENcil</em>." }],
          items: [stress("teacher", ["tea", "cher"], 0), stress("pencil", ["pen", "cil"], 0), stress("window", ["win", "dow"], 0), stress("hello", ["hel", "lo"], 1), stressQ("rabbit", ["rab", "bit"], 0), stressQ("begin", ["be", "gin"], 1), stress("hotel", ["ho", "tel"], 1), stressQ("monkey", ["mon", "key"], 0)] },

        { id: "sk-4-2", title: "Three-Syllable Words", goal: "Say three-beat words clearly.",
          learn: [{ title: "Three beats", text: "Clap three times as you say these words. Make the strong part louder.",
            examples: [{ t: "banana", html: "ba·<span class=\"hl\">NA</span>·na", vis: "🍌" }, { t: "elephant", html: "<span class=\"hl\">EL</span>·e·phant", vis: "🐘" }, { t: "computer", html: "com·<span class=\"hl\">PU</span>·ter", vis: "💻" }, { t: "tomato", html: "to·<span class=\"hl\">MA</span>·to", vis: "🍅" }] }],
          items: [stress("banana", ["ba", "na", "na"], 1), stress("elephant", ["el", "e", "phant"], 0), stress("computer", ["com", "pu", "ter"], 1), stressQ("tomato", ["to", "ma", "to"], 1), stressQ("dinosaur", ["di", "no", "saur"], 0), stress("together", ["to", "geth", "er"], 1), stressQ("hospital", ["hos", "pi", "tal"], 0), stress("umbrella", ["um", "brel", "la"], 1)] },

        { id: "sk-4-3", title: "Word Stress", goal: "Find the strong syllable in longer words.",
          learn: [{ title: "Stress changes how a word sounds", text: "If you put the stress in the wrong place, a word can be hard to understand. Listen for the <strong>loudest, longest</strong> part.",
            examples: [{ t: "important", html: "im·<span class=\"hl\">POR</span>·tant" }, { t: "beautiful", html: "<span class=\"hl\">BEAU</span>·ti·ful" }, { t: "tomorrow", html: "to·<span class=\"hl\">MOR</span>·row" }, { t: "afternoon", html: "af·ter·<span class=\"hl\">NOON</span>" }] }],
          items: [stressQ("important", ["im", "por", "tant"], 1), stressQ("beautiful", ["beau", "ti", "ful"], 0), stressQ("tomorrow", ["to", "mor", "row"], 1), stressQ("afternoon", ["af", "ter", "noon"], 2), stress("important", ["im", "por", "tant"], 1), stress("afternoon", ["af", "ter", "noon"], 2), stressQ("kangaroo", ["kan", "ga", "roo"], 2), stress("vegetables", ["veg", "e", "ta", "bles"], 0)] },

        { id: "sk-4-4", title: "Speaking in Complete Sentences", goal: "Say full sentences smoothly.",
          learn: [{ title: "Full sentences", text: "A complete sentence has a <strong>who</strong> and a <strong>doing word</strong>. Say the whole sentence smoothly, without stopping between words.",
            examples: [ex("I have a brown cat."), ex("My school is big."), ex("We play football on Friday.")],
            tip: "Instead of answering “Football.”, try “<strong>I like football.</strong>”" }],
          items: [sent("I have a brown cat."), sent("My school is very big."), sent("We play football on Friday."), sent("My brother can swim fast."),
            best("Which answer is a complete sentence?", ["I like pizza.", "Pizza.", "Like pizza."], "I like pizza.", "<strong>I like pizza.</strong> has a who (I) and a doing word (like)."),
            best("Which answer is a complete sentence?", ["My sister is ten.", "Ten.", "Sister ten."], "My sister is ten."),
            sent("There are twenty students in my class."), sent("I eat breakfast at seven o'clock.")] },

        { id: "sk-4-5", title: "Asking and Answering Questions", goal: "Ask questions and give full answers.",
          learn: [{ title: "Questions and answers", text: "Questions often start with <strong>What, Where, When, Who</strong> or <strong>Do you…?</strong> Answer with a full sentence.",
            examples: [ex("What is your favorite color? — My favorite color is blue."), ex("Where do you live? — I live in Riyadh."), ex("Do you like milk? — Yes, I do.")] }],
          items: [sent("What is your favorite color?"), sent("My favorite color is blue."), sent("Where do you live?"), sent("Do you have a pet?"),
            best("\"Where do you live?\" Choose the best answer.", ["I live in Jeddah.", "I like Jeddah.", "Yes, I do."], "I live in Jeddah."),
            best("\"Do you like milk?\" Choose the best answer.", ["Yes, I do.", "Yes, I am.", "Milk is white."], "Yes, I do."),
            best("\"When do you go to bed?\" Choose the best answer.", ["At nine o'clock.", "In my bedroom.", "With my brother."], "At nine o'clock."),
            talk("Listen to the conversation. Then practice Noura's lines.", [F("Noura", "Do you have a pet, Huda?"), F("Huda", "Yes, I do. I have a white cat."), F("Noura", "What is its name?"), F("Huda", "Its name is Snowy.")], "Noura")] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "sk-5-1", title: "At School", goal: "Talk with teachers and friends at school.",
          learn: [{ title: "Talking at school", text: "Listen to how students talk at school. Notice the polite words.",
            examples: [ex("Excuse me, where is the library?"), ex("Can I sit here?"), ex("Let's work together.")] }],
          items: [talk("Listen to the conversation. Then practice Faisal's lines.", [M("Faisal", "Excuse me, Mr. Khalid. Where is the library?"), M("Mr. Khalid", "It's on the second floor, next to the computer room."), M("Faisal", "Thank you. Is it open now?"), M("Mr. Khalid", "Yes, it's open until two o'clock.")], "Faisal"),
            talk("Listen to the conversation. Then practice Reem's lines.", [F("Reem", "Hi, Dana! Can I sit with you?"), F("Dana", "Of course! Let's do the project together."), F("Reem", "Great idea! I can draw the pictures."), F("Dana", "And I can write the sentences.")], "Reem"),
            best("Where is the library?", ["On the second floor.", "In the playground.", "Next to the gate."], "On the second floor.", "Mr. Khalid said: <em>It's on the second floor, next to the computer room.</em>"),
            best("You want to join two friends at lunch. What do you say?", ["Can I sit with you?", "Go away, please.", "Where is the library?"], "Can I sit with you?"),
            sent("Let's work together."), sent("Can I borrow your ruler, please?"), sent("Excuse me, where is the nurse's office?"), sent("I forgot my homework. I'm sorry.")] },

        { id: "sk-5-2", title: "At a Shop", goal: "Buy things and talk about prices.",
          learn: [{ title: "Shopping words", text: "At a shop, you can ask <strong>How much is it?</strong> and say <strong>I'd like…</strong>.",
            examples: [ex("I'd like some apples, please.", "🍎"), ex("How much is it?"), ex("It's ten riyals."), ex("Here you are.")] }],
          items: [talk("Listen to the conversation. Then practice the Customer's lines.", [F("Customer", "Good afternoon. I'd like some oranges, please."), M("Shopkeeper", "Of course. How many would you like?"), F("Customer", "Six, please. How much are they?"), M("Shopkeeper", "They're twelve riyals."), F("Customer", "Here you are. Thank you!")], "Customer"),
            best("How many oranges does the customer want?", ["six", "twelve", "two"], "six"),
            best("How much are the oranges?", ["twelve riyals", "six riyals", "ten riyals"], "twelve riyals"),
            best("You want to know the price. What do you ask?", ["How much is it?", "How old is it?", "Where is it?"], "How much is it?"),
            sent("I'd like a bottle of water, please."), sent("How much is this notebook?"), sent("It's five riyals."), sent("Do you have a bigger one?")] },

        { id: "sk-5-3", title: "Talking About Daily Routines", goal: "Describe what you do every day.",
          learn: [{ title: "My day", text: "Use time words to talk about your day: <strong>first, then, after that, finally</strong>.",
            examples: [ex("I wake up at six o'clock.", "⏰"), ex("Then I brush my teeth.", "🪥"), ex("After school, I do my homework."), ex("I go to bed at nine.", "🛏️")] }],
          items: [sent("I wake up at six o'clock."), sent("First, I wash my face. Then I eat breakfast."), sent("After school, I do my homework."), sent("I go to bed at nine o'clock."),
            talk("Listen to the conversation. Then practice Ali's lines.", [M("Ali", "What time do you wake up, Sami?"), M("Sami", "I wake up at six thirty. What about you?"), M("Ali", "I wake up at six. Then I pray and have breakfast."), M("Sami", "Me too! I love breakfast.")], "Ali"),
            best("What time does Sami wake up?", ["at six thirty", "at six", "at seven"], "at six thirty"),
            best("Which word shows the order of actions?", ["then", "happy", "very"], "then"),
            sent("Finally, I read a story and go to sleep.")] },

        { id: "sk-5-4", title: "Talking About Likes and Dislikes", goal: "Say what you like and do not like, with reasons.",
          learn: [{ title: "I like… because…", text: "Say what you like or don't like, and add a reason with <strong>because</strong>.",
            examples: [ex("I like swimming because it's fun.", "🏊"), ex("I don't like rainy days because I can't play outside.", "🌧️"), ex("My favorite food is rice.", "🍚"), ex("I love reading stories.", "📚")] }],
          items: [sent("I like swimming because it's fun."), sent("I don't like rainy days."), sent("My favorite food is chicken and rice."), sent("I love reading stories because I learn new things."),
            talk("Listen to the conversation. Then practice Maha's lines.", [F("Maha", "What's your favorite sport, Joud?"), F("Joud", "I love basketball! What about you?"), F("Maha", "I don't like basketball very much. I like swimming."), F("Joud", "Why do you like swimming?"), F("Maha", "Because it's fun, and it keeps me healthy.")], "Maha"),
            best("What does Joud love?", ["basketball", "swimming", "football"], "basketball"),
            best("Why does Maha like swimming?", ["Because it's fun and healthy.", "Because it's easy.", "Because her friend swims."], "Because it's fun and healthy."),
            best("Which sentence gives a reason?", ["I like cats because they are soft.", "I like cats.", "Cats are animals."], "I like cats because they are soft.")] },

        { id: "sk-5-5", title: "Everyday Conversation Challenge", goal: "Use greetings, questions and answers in longer conversations.",
          learn: [{ title: "Keep the conversation going", text: "A good speaker answers, then asks a question back: <em>“I'm fine, thanks. <strong>And you?</strong>”</em>",
            examples: [ex("And you?"), ex("What about you?"), ex("That sounds great!"), ex("Really? Tell me more!")] }],
          items: [talk("Listen to the conversation. Then practice Hamad's lines.", [M("Hamad", "Hi, Turki! How was your weekend?"), M("Turki", "It was great! I visited my grandparents in Abha."), M("Hamad", "Really? What did you do there?"), M("Turki", "We walked in the mountains. It was cool and green."), M("Hamad", "That sounds wonderful!")], "Hamad"),
            best("Where did Turki go?", ["to Abha", "to the beach", "to Jeddah"], "to Abha"),
            best("What was the weather like in the mountains?", ["cool and green", "hot and sunny", "rainy and windy"], "cool and green"),
            best("Your friend says, \"I went to the zoo yesterday.\" What is a good reply?", ["Really? What did you see?", "I am nine years old.", "Goodbye!"], "Really? What did you see?"),
            best("Which question keeps a conversation going?", ["What about you?", "No.", "Okay."], "What about you?"),
            sent("How was your weekend?"), sent("That sounds great! Tell me more."), sent("It was nice to talk to you. See you soon!")] }
      ] }
    ]
  });
})();
