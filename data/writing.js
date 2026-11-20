/* =====================================================================
   TNS English Explorers — WRITING WORKSHOP (25 activity sets)
   Scored items have ONE clear correct answer (letters, word order,
   capitals, punctuation). Independent writing is NEVER marked right or
   wrong: students get a task, useful words, sentence starters, a model
   to compare with, and a self-checklist. Their writing stays on the
   screen only — it is never saved or sent anywhere.
   Handwriting is practised on paper; letter demos show stroke order.
   ===================================================================== */
(function () {
  "use strict";
  function lt(ch, note) { return { t: (/[A-Z]/.test(ch) ? "capital " : "small ") + ch, letter: ch, say: "The letter " + ch.toUpperCase() + ".", note: note }; }
  function which(q, opts, explain, extra) { var o = { type: "choice", q: q, options: opts, answer: opts[0], explain: explain }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  function order(sentence, explain) { return { type: "words", q: "Put the words in order to make a sentence.", answer: sentence, explain: explain }; }
  function fix(wrong, right, accept, punct, explain) { return { type: "type", q: "Rewrite the sentence correctly.", prompt: wrong, answer: right, accept: accept, long: true, check: { case: true, punct: !!punct }, explain: explain }; }
  function spell(word, vis, extra) { return { type: "letters", q: "Look at the picture. Tap the letters to write the word.", vis: vis, visAlt: "picture", say: word, answer: word, extra: extra }; }
  function write(task, o) { o = o || {}; return { type: "write", q: task, task: task, words: o.words, starters: o.starters, frame: o.frame, model: o.model, checklist: o.checklist, rows: o.rows, vis: o.vis, visAlt: o.visAlt }; }
  function match(q, pairs) { return { type: "match", q: q, pairs: pairs }; }
  function L(title, text, examples, tip) { return [{ title: title, text: text, examples: examples, tip: tip }]; }
  var PAPER = ["I held my pencil correctly.", "I started each letter at the dot.", "My letters sit on the line.", "I left spaces between words."];

  TNS.register("writing", {
    intro: "Write letters, words, sentences and stories — one step at a time. Your writing stays on your screen; it is not saved or sent.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "wr-1-1", title: "Uppercase Letters", goal: "Recognize and form capital letters.",
          learn: L("Capital letters", "Watch how each capital letter is written. Start at dot <strong>1</strong>. Then practice in your notebook. Capital letters are all <strong>tall</strong>: they touch the top line.",
            [lt("A"), lt("B"), lt("E"), lt("H"), lt("M"), lt("S"), lt("T"), lt("W")], "Tap <strong>↻ Again</strong> to watch a letter again."),
          items: [which("Which one is a capital letter?", ["G", "g", "q"], null, { fixed: false }), which("Which one is a capital letter?", ["R", "r", "n"]), which("Find capital E.", ["E", "F", "e"]),
            which("Find capital M.", ["M", "W", "N"]), which("Which letter comes next? A B C D __", ["E", "F", "e"]),
            { type: "letters", q: "Tap the CAPITAL letters to write the word CAT.", answer: "CAT", extra: "cat", vis: "🐱", visAlt: "a cat", check: { case: true } },
            { type: "letters", q: "Tap the CAPITAL letters to write the word SUN.", answer: "SUN", extra: "sun", vis: "☀️", visAlt: "the sun", check: { case: true } },
            which("How many capital letters are there?  B a T m K", ["3", "2", "5"], "B, T and K are capital letters.", { fixed: true }),
            write("Copy these capital letters on paper, three times each: A B E H M S T W", { checklist: PAPER, rows: 3 })] },

        { id: "wr-1-2", title: "Lowercase Letters", goal: "Recognize and form small letters.",
          learn: L("Small letters", "Most writing uses small letters. Some are tall (<strong>b, d, h, k, l</strong>), some have tails (<strong>g, j, p, q, y</strong>), and some are short (<strong>a, c, e, o</strong>). Watch carefully: <strong>b</strong> and <strong>d</strong> are different!",
            [lt("a"), lt("b"), lt("d"), lt("e"), lt("g"), lt("p"), lt("q"), lt("y")], "<strong>b</strong>: line first, then the circle. <strong>d</strong>: circle first, then the line."),
          items: [which("Which letter is b?", ["b", "d", "p"], null), which("Which letter is d?", ["d", "b", "q"]), which("Which letter is p?", ["p", "q", "b"]), which("Which letter is q?", ["q", "p", "g"]),
            which("Which letter has a tail below the line?", ["g", "a", "c"]), which("Which letter is tall?", ["h", "n", "o"]),
            { type: "letters", q: "Tap the small letters to write the word bed.", answer: "bed", extra: "BED", vis: "🛏️", visAlt: "a bed", check: { case: true } },
            { type: "letters", q: "Tap the small letters to write the word dog.", answer: "dog", extra: "bp", vis: "🐶", visAlt: "a dog", check: { case: true } },
            which("Which word is written in small letters?", ["cat", "CAT", "Cat"]),
            write("Copy these small letters on paper, three times each: a b d e g p q y", { checklist: PAPER, rows: 3 })] },

        { id: "wr-1-3", title: "Matching Uppercase and Lowercase Letters", goal: "Match each capital letter to its small letter.",
          learn: L("Letter partners", "Every capital letter has a small letter partner. Some look the same (<strong>C c, O o, S s</strong>), and some look very different (<strong>A a, G g, R r</strong>).",
            [lt("G"), lt("g"), lt("R"), lt("r"), lt("Q"), lt("q")]),
          items: [match("Match the capital and small letters.", [["A", "a"], ["G", "g"], ["R", "r"], ["E", "e"]]), match("Match the capital and small letters.", [["B", "b"], ["D", "d"], ["P", "p"], ["Q", "q"]]),
            match("Match the capital and small letters.", [["H", "h"], ["N", "n"], ["M", "m"], ["T", "t"]]), which("Which is the small letter for F?", ["f", "t", "l"]), which("Which is the capital letter for y?", ["Y", "V", "X"]),
            which("Which pair is correct?", ["L l", "L i", "L t"]), which("Which pair is correct?", ["J j", "J i", "J g"]), which("Which is the small letter for D?", ["d", "b", "p"]),
            write("On paper, write each capital letter next to its small letter: Aa Bb Dd Gg Ee Rr", { checklist: PAPER, rows: 3 })] },

        { id: "wr-1-4", title: "Completing Simple Words", goal: "Add the missing letter to complete a word.",
          learn: L("Finish the word", "Look at the picture. Say the word. Which letter is missing?",
            [{ t: "c _ t → cat", vis: "🐱" }, { t: "_ en → pen", vis: "🖊️" }, { t: "su _ → sun", vis: "☀️" }]),
          items: [which("Which letter is missing?", ["a", "o", "u"], "The word is <strong>bag</strong>.", { prompt: "b _ g", vis: "🎒", visAlt: "a school bag" }),
            which("Which letter is missing?", ["d", "b", "p"], "The word is <strong>dog</strong>.", { prompt: "_ og", vis: "🐶", visAlt: "a dog" }),
            which("Which letter is missing?", ["x", "s", "k"], "The word is <strong>box</strong>.", { prompt: "bo _", vis: "📦", visAlt: "a box" }),
            which("Which letter is missing?", ["i", "e", "a"], "The word is <strong>pig</strong>.", { prompt: "p _ g", vis: "🐷", visAlt: "a pig" }),
            which("Which letter is missing?", ["f", "v", "h"], "The word is <strong>fish</strong>.", { prompt: "_ ish", vis: "🐟", visAlt: "a fish" }),
            which("Which letter is missing?", ["n", "m", "r"], "The word is <strong>ten</strong>.", { prompt: "te _", vis: "🔟", visAlt: "ten" }),
            spell("hat", "🎩", "o"), spell("bus", "🚌", "a"), spell("bed", "🛏️", "i"),
            write("On paper, draw three things in your room. Write a word under each picture.", { words: ["bed", "lamp", "bag", "book", "toy", "door"], checklist: ["I drew three pictures.", "I wrote a word under each one.", "I checked my letters."] })] },

        { id: "wr-1-5", title: "Copying and Building Words", goal: "Build and copy short words neatly.",
          learn: L("Build a word", "Say the word slowly. Write one letter for each sound. Leave a <strong>finger space</strong> between words.",
            [{ t: "sun", vis: "☀️" }, { t: "cup" }, { t: "red ball", vis: "⚽", note: "finger space between words" }]),
          items: [spell("sun", "☀️", "a"), spell("fox", "🦊", "s"), spell("egg", "🥚", "a"), spell("milk", "🥛", "e"), spell("star", "⭐", "o"), spell("frog", "🐸", "l"),
            which("Which one has a space between the two words?", ["red ball", "redball", "re dball"]), which("Which word is spelled correctly?", ["fish", "fsh", "fihs"], null, { vis: "🐟", visAlt: "a fish" }),
            write("Copy these words neatly on paper: cat · dog · sun · red ball · my book", { checklist: PAPER, rows: 3 })] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "wr-2-1", title: "Putting Words in Order", goal: "Make sentences with words in the right order.",
          learn: L("Word order", "English sentences have an order: <strong>who</strong> + <strong>doing word</strong> + <strong>more information</strong>.",
            [{ t: "I like apples.", note: "who: I · doing: like · what: apples" }, { t: "The cat is sleeping." }, { t: "We play football." }]),
          items: [order("I like apples."), order("The dog is big."), order("We go to school."), order("She has a red bag."), order("My brother can swim."), order("They play in the park."),
            which("Which sentence is in the right order?", ["The bird can fly.", "Fly the bird can.", "Can bird the fly."]), which("Which sentence is in the right order?", ["I have two cats.", "Two cats have I.", "I two have cats."]),
            order("My mom makes good cake."), order("The sun is very hot today.")] },

        { id: "wr-2-2", title: "Capital Letters", goal: "Use capital letters at the start of sentences, for names and for I.",
          learn: L("When do we use capital letters?", "Use a capital letter: <strong>1.</strong> at the start of a sentence, <strong>2.</strong> for names of people and places, <strong>3.</strong> for the word <strong>I</strong>.",
            [{ t: "My cat is white.", note: "start of a sentence" }, { t: "Omar lives in Riyadh.", note: "names of people and places" }, { t: "Sara and I are friends.", note: "the word I" }]),
          items: [which("Which sentence is correct?", ["My name is Lina.", "my name is lina.", "My name is lina."]), which("Which sentence is correct?", ["We live in Jeddah.", "we live in jeddah.", "We live in jeddah."]),
            which("Which sentence is correct?", ["Faisal and I play chess.", "faisal and i play chess.", "Faisal and i play chess."]), which("Which word needs a capital letter?", ["saudi arabia", "school", "garden"]),
            fix("the dog is brown.", "The dog is brown.", null, false, "A sentence starts with a capital letter."), fix("my friend is huda.", "My friend is Huda.", null, false, "Start of sentence + a name."),
            fix("i like to read.", "I like to read.", null, false, "<strong>I</strong> is always a capital letter."), fix("we visited abha on friday.", "We visited Abha on Friday.", null, false, "Places and days of the week start with capital letters."),
            which("Why does \"Riyadh\" start with a capital letter?", ["It is the name of a place.", "It is a doing word.", "It is at the end."])] },

        { id: "wr-2-3", title: "Full Stops and Question Marks", goal: "End sentences with a full stop or a question mark.",
          learn: L("Ending a sentence", "A <strong>telling</strong> sentence ends with a full stop <strong>.</strong>  A <strong>question</strong> ends with a question mark <strong>?</strong>",
            [{ t: "I am eight years old.", note: "telling → ." }, { t: "How old are you?", note: "asking → ?" }, { t: "Where is my pencil?", note: "asking → ?" }],
            "Questions often start with <strong>What, Where, When, Who, How, Can, Do, Is</strong>."),
          items: [which("Which mark ends this sentence?  \"Where do you live __\"", ["?", "."], null, { fixed: true }), which("Which mark ends this sentence?  \"I live in Dammam __\"", [".", "?"], null, { fixed: true }),
            which("Which mark ends this sentence?  \"Can you help me __\"", ["?", "."], null, { fixed: true }), which("Which mark ends this sentence?  \"My bag is blue __\"", [".", "?"], null, { fixed: true }),
            which("Which sentence is correct?", ["What is your name?", "What is your name.", "what is your name?"]), which("Which sentence is correct?", ["The cat is sleeping.", "The cat is sleeping?", "the cat is sleeping."]),
            fix("Do you like milk.", "Do you like milk?", null, true, "This is a question, so it ends with <strong>?</strong>"), fix("we play football", "We play football.", null, true, "Capital letter at the start, full stop at the end."),
            fix("how old is your sister", "How old is your sister?", null, true), which("Which one is a question?", ["Is it raining?", "It is raining.", "The rain is cold."])] },

        { id: "wr-2-4", title: "Writing Simple Sentences", goal: "Write your own simple sentences.",
          learn: L("A simple sentence", "A sentence has a <strong>capital letter</strong>, a <strong>who</strong>, a <strong>doing word</strong>, and a <strong>full stop</strong>.",
            [{ t: "The bird is singing.", vis: "🐦" }, { t: "I have a ball.", vis: "⚽" }, { t: "My dad is tall." }]),
          items: [order("The cat is on the bed."), order("I can see a big tree."), which("Which is a complete sentence?", ["The boy is happy.", "The boy happy.", "happy the boy"]),
            which("Look at the picture. Which sentence matches?", ["The fish is swimming.", "The fish is flying.", "The fish is sleeping in bed."], null, { vis: "🐟", visAlt: "a fish in water" }),
            fix("the sun is hot", "The sun is hot.", null, true),
            write("Look at the picture. Write one sentence about it.", { vis: "🐱", visAlt: "a cat", words: ["cat", "white", "small", "sleeping", "playing", "soft"], starters: ["This is a…", "The cat is…", "I see…"], model: "The cat is small and white.", checklist: ["I started with a capital letter.", "I ended with a full stop.", "My sentence makes sense."] }),
            write("Write two sentences about your favorite food.", { words: ["rice", "chicken", "pizza", "dates", "fruit", "delicious", "sweet"], starters: ["My favorite food is…", "It is…", "I eat it…"], model: "My favorite food is chicken and rice. It is delicious!", checklist: ["I started each sentence with a capital letter.", "I ended each sentence with a full stop.", "I checked my spelling."] })] },

        { id: "wr-2-5", title: "Complete and Correct Sentences", goal: "Check that every sentence is complete and correct.",
          learn: L("Check your sentence", "Ask: Does it start with a <strong>capital letter</strong>? Does it have a <strong>who</strong> and a <strong>doing word</strong>? Does it end with <strong>. or ?</strong> Does it make <strong>sense</strong>?",
            [{ t: "✔ We went to the beach.", say: "We went to the beach." }, { t: "✖ went to the beach", say: "went to the beach", note: "no capital, no who, no full stop" }]),
          items: [which("Which sentence is complete?", ["My sister reads books.", "My sister books.", "reads books"]), which("Which sentence is complete?", ["Ali plays football.", "Plays football.", "Ali football."]),
            which("Which sentence is correct?", ["Where is the library?", "where is the library?", "Where is the library."]), which("What is missing?  \"the bird is singing.\"", ["a capital letter", "a full stop", "a question mark"]),
            fix("my brother is ten", "My brother is ten.", null, true), fix("can you open the door", "Can you open the door?", null, true), fix("noura lives in mecca.", "Noura lives in Mecca.", ["Noura lives in Makkah."], true),
            order("We are going to the park."),
            write("Write three correct sentences about your school.", { words: ["school", "teacher", "classroom", "friends", "big", "kind", "learn"], starters: ["My school is…", "My teacher is…", "I like…"], model: "My school is big. My teacher is kind. I like reading in the library.", checklist: ["Every sentence has a capital letter.", "Every sentence ends with . or ?", "Every sentence makes sense.", "I checked my spelling."] })] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "wr-3-1", title: "Writing About Myself", goal: "Write sentences about yourself.",
          learn: L("All about me", "You can write about your age, family, hobbies and favorite things. You can use made-up details — you do not have to share real information.",
            [{ t: "I am nine years old." }, { t: "I have one brother." }, { t: "I like drawing and swimming." }, { t: "My favorite color is green." }]),
          items: [which("Which sentence is about a hobby?", ["I like drawing.", "I am nine.", "I live in a house."]), which("Which sentence is about family?", ["I have two sisters.", "My favorite color is red.", "I like cats."]),
            order("My favorite color is blue."), fix("i like to play football", "I like to play football.", null, true),
            write("Write 4–5 sentences about yourself. You can use a made-up name.", { words: ["years old", "brother", "sister", "hobby", "favorite", "like", "love", "enjoy"], starters: ["My name is…", "I am … years old.", "I have…", "I like…", "My favorite … is…"],
              model: "My name is Reem. I am eight years old. I have one sister and two brothers. I like reading and drawing. My favorite food is pizza.", rows: 6 })] },

        { id: "wr-3-2", title: "Describing an Object", goal: "Use adjectives to describe a thing.",
          learn: L("Describe it!", "To describe something, tell its <strong>color</strong>, <strong>size</strong>, <strong>shape</strong>, what it is <strong>made of</strong> and what it is <strong>used for</strong>.",
            [{ t: "My bag is blue and big.", vis: "🎒" }, { t: "It is made of cloth." }, { t: "I use it to carry my books." }]),
          items: [which("Which word describes size?", ["big", "red", "soft"]), which("Which word describes color?", ["green", "round", "small"]), which("Which word describes shape?", ["round", "yellow", "heavy"]),
            order("My ball is round and red."), which("Which sentence says what something is used for?", ["I use it to write.", "It is blue.", "It is small."]),
            write("Choose one object (a ball, a cup, a lamp, or your own idea). Write 4 sentences to describe it.", { words: ["big", "small", "round", "square", "soft", "hard", "plastic", "wood", "metal", "use"], starters: ["My … is…", "It is made of…", "It is…", "I use it to…"],
              model: "My lamp is small and white. It is made of metal and plastic. It is round at the top. I use it to read at night.", rows: 5 })] },

        { id: "wr-3-3", title: "Writing About My Family", goal: "Write about people in a family.",
          learn: L("My family", "Write about each person: who they are, what they look like, and what they like doing. Use <strong>he</strong> and <strong>she</strong> so you do not repeat names.",
            [{ t: "This is my father. He is tall." }, { t: "My grandmother tells funny stories." }, { t: "My little brother loves cars." }]),
          items: [which("\"My mother is a teacher. ___ works at a school.\"", ["She", "He", "They"]), which("\"My brothers love football. ___ play every day.\"", ["They", "He", "She"]),
            order("My grandfather has a white beard."), fix("my sister likes cats", "My sister likes cats.", null, true),
            write("Write 4–5 sentences about a family. It can be your family or a made-up family.", { words: ["mother", "father", "brother", "sister", "grandmother", "tall", "kind", "funny", "loves", "likes"], starters: ["There are … people in my family.", "My … is…", "He likes…", "She loves…"],
              model: "There are five people in my family. My father is tall and kind. My mother loves cooking. My little sister is funny. We all like going to the beach.", rows: 6 })] },

        { id: "wr-3-4", title: "Describing a Picture", goal: "Write what you can see in a picture.",
          learn: L("What can you see?", "Use <strong>There is / There are</strong> and place words (<strong>in, on, next to, under</strong>) to describe a picture.",
            [{ t: "There is a big tree.", vis: "🌳" }, { t: "There are two birds in the tree.", vis: "🐦" }, { t: "A cat is sleeping under the tree.", vis: "🐱" }]),
          items: [which("\"There ___ three apples.\"", ["are", "is", "am"]), which("\"There ___ a cat on the bed.\"", ["is", "are", "am"]), which("Look: ☀️🏖️⛵. What can you see?", ["a beach with a boat and the sun", "a snowy mountain", "a classroom"]),
            order("There are two birds in the tree."),
            write("Look at the picture: 🌳 🐦 🐦 ⚽ 👦. Write 4 sentences about it.", { words: ["tree", "birds", "ball", "boy", "park", "playing", "sunny", "next to", "under"], starters: ["There is…", "There are…", "The boy is…", "I can see…"],
              model: "There is a big tree in the park. There are two birds in the tree. A boy is playing with a ball. It is a sunny day.", rows: 5 })] },

        { id: "wr-3-5", title: "Writing About My Daily Routine", goal: "Write about your day in order.",
          learn: L("My day in order", "Use time words to show the order: <strong>First, Then, After that, Finally</strong>. Add times: <strong>at seven o'clock</strong>.",
            [{ t: "First, I wake up at six." }, { t: "Then, I eat breakfast." }, { t: "After that, I go to school." }, { t: "Finally, I go to bed at nine." }]),
          items: [which("Which word shows the LAST thing?", ["Finally", "First", "Then"]), which("Which word shows the FIRST thing?", ["First", "After that", "Finally"]),
            order("Then I brush my teeth."), fix("after school i do my homework", "After school I do my homework.", ["After school, I do my homework."], true),
            write("Write 5 sentences about your day. Use First, Then, After that, Finally.", { words: ["wake up", "breakfast", "school", "homework", "dinner", "bed", "o'clock"], starters: ["First, I…", "Then, I…", "After that, I…", "In the evening, I…", "Finally, I…"],
              model: "First, I wake up at six o'clock. Then, I wash my face and eat breakfast. After that, I go to school by bus. In the evening, I do my homework. Finally, I go to bed at nine.", rows: 6 })] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "wr-4-1", title: "Writing Connected Sentences", goal: "Join ideas with and, but, so and because.",
          learn: L("Join your ideas", "Short sentences can be joined: <strong>and</strong> (adding), <strong>but</strong> (different), <strong>so</strong> (result), <strong>because</strong> (reason).",
            [{ t: "I like cats. I like dogs. → I like cats and dogs." }, { t: "It was hot. We went swimming. → It was hot, so we went swimming." }, { t: "I was happy because I won." }]),
          items: [which("\"I was tired, ___ I went to bed early.\"", ["so", "but", "because"]), which("\"I like tea, ___ I don't like coffee.\"", ["but", "so", "and"]), which("\"We stayed inside ___ it was raining.\"", ["because", "so", "but"]),
            which("Which sentence joins the ideas correctly?", ["I have a cat and a rabbit.", "I have a cat but a rabbit.", "I have a cat because a rabbit."]), order("It was cold, so I wore a coat."),
            write("Join each pair of sentences, then write one more of your own: (1) I was hungry. I ate an apple. (2) The test was hard. I passed it. (3) We went to the park. It was sunny.",
              { words: ["and", "but", "so", "because"], model: "1. I was hungry, so I ate an apple. 2. The test was hard, but I passed it. 3. We went to the park because it was sunny.", rows: 5 })] },

        { id: "wr-4-2", title: "Describing a Place", goal: "Describe a place so the reader can imagine it.",
          learn: L("Paint a picture with words", "Describe what you can <strong>see</strong>, <strong>hear</strong> and <strong>feel</strong>. Use adjectives: <em>quiet, busy, green, sandy, cool</em>.",
            [{ t: "The beach is sandy and warm." }, { t: "I can hear the waves." }, { t: "There are colorful umbrellas everywhere." }]),
          items: [which("Which sentence tells what you can HEAR?", ["I can hear birds singing.", "The park is green.", "The air is cool."]), which("Which word best describes a market on Friday?", ["busy", "empty", "silent"]),
            order("The library is quiet and cool."), which("Which is the best describing sentence?", ["The garden is full of colorful flowers.", "The garden is nice.", "Garden."]),
            write("Describe a place you like (a park, a beach, your grandparents' house, or a made-up place). Write 5–6 sentences.", { words: ["quiet", "busy", "beautiful", "green", "sandy", "cool", "warm", "hear", "see", "smell"],
              starters: ["My favorite place is…", "It is…", "There is/are…", "I can see…", "I can hear…", "I feel … there because…"],
              model: "My favorite place is the beach in Jeddah. It is sandy and warm. There are families having picnics. I can see small boats on the blue water. I can hear the waves. I feel happy there because I can swim with my cousins.", rows: 7 })] },

        { id: "wr-4-3", title: "Writing About a Favorite Activity", goal: "Explain what you enjoy and why.",
          learn: L("What I enjoy", "Say <strong>what</strong> the activity is, <strong>when</strong> and <strong>where</strong> you do it, <strong>who</strong> you do it with, and <strong>why</strong> you enjoy it.",
            [{ t: "My favorite activity is swimming." }, { t: "I swim every Saturday at the club." }, { t: "I enjoy it because it makes me feel strong." }]),
          items: [which("Which sentence tells WHY?", ["I enjoy it because it is fun.", "I play on Friday.", "I play with my cousin."]), which("Which sentence tells WHERE?", ["I play in the garden.", "I play every day.", "I play because I like it."]),
            order("I enjoy reading because I learn new things."), fix("my favorite activity is drawing", "My favorite activity is drawing.", null, true),
            write("Write a short paragraph (5–6 sentences) about your favorite activity.", { words: ["favorite", "enjoy", "every", "weekend", "with", "because", "fun", "exciting", "relaxing"],
              starters: ["My favorite activity is…", "I usually … on/at…", "I do it with…", "I enjoy it because…", "One day, I want to…"],
              model: "My favorite activity is riding my bike. I usually ride it in the evening when it is cooler. I ride with my older brother in our neighborhood. I enjoy it because it is fast and exciting. It also keeps me healthy. One day, I want to ride in a race.", rows: 7 })] },

        { id: "wr-4-4", title: "Sequencing Events", goal: "Write events in the order they happened.",
          learn: L("What happened first?", "When you tell about events, put them in order. Use <strong>First, Next, Then, After that, Finally</strong>.",
            [{ t: "First, we packed our bags." }, { t: "Next, we drove to the desert." }, { t: "Then, we set up the tent." }, { t: "Finally, we watched the stars." }]),
          items: [{ type: "words", q: "Put the steps for making a sandwich in order. Tap the words.", answer: "bread butter cheese eat", explain: "Take bread → add butter → add cheese → eat!" },
            which("Which word shows the order of events?", ["Next", "Happy", "Very"]), which("\"___, we planted the seeds. Then we watered them.\"", ["First", "Finally", "Because"]),
            order("After that, we ate dinner together."),
            write("Write about a day out (real or made up) in 5 sentences. Use First, Next, Then, After that, Finally.", { words: ["First", "Next", "Then", "After that", "Finally", "went", "saw", "ate", "played"],
              starters: ["First, we…", "Next, we…", "Then, …", "After that, …", "Finally, …"],
              model: "First, we drove to the zoo early in the morning. Next, we saw the giraffes and the lions. Then, we had a picnic under a tree. After that, we watched the birds show. Finally, we went home tired but happy.", rows: 6 })] },

        { id: "wr-4-5", title: "Building a Short Paragraph", goal: "Write a paragraph with a topic sentence, details and an ending.",
          learn: L("A paragraph", "A paragraph is a group of sentences about <strong>one topic</strong>. <strong>1.</strong> Topic sentence (the main idea). <strong>2.</strong> Two or three detail sentences. <strong>3.</strong> An ending sentence.",
            [{ t: "Topic: Camels are amazing animals." }, { t: "Detail: They can walk for days without water." }, { t: "Detail: Their wide feet help them walk on sand." }, { t: "Ending: That is why camels are perfect for the desert." }]),
          items: [which("Which is the best topic sentence for a paragraph about the sea?", ["The sea is full of amazing life.", "Fish have fins.", "I went home."]),
            which("Which sentence does NOT belong in a paragraph about healthy food?", ["My cousin has a new bike.", "Vegetables give us vitamins.", "Fruit is a healthy snack."]),
            which("Which sentence is the best ending for a paragraph about reading?", ["That is why I love reading.", "First, I open the book.", "Books have pages."]),
            write("Write a paragraph about ONE topic: My School, My Pet, or Summer. Use a topic sentence, 2–3 details and an ending.", { words: ["Also,", "In addition,", "For example,", "That is why", "because"],
              frame: "Topic sentence: ______ . Detail 1: ______ . Detail 2: ______ . Detail 3: ______ . Ending: ______ .",
              model: "Summer is my favorite season. In summer, there is no school, so I have more time to read. My family also travels to the mountains where it is cool. I love eating ice cream with my cousins in the evening. That is why summer is the best time of the year.", rows: 7,
              checklist: ["I wrote a topic sentence.", "I wrote 2–3 details.", "I wrote an ending sentence.", "I used capital letters and full stops.", "I checked my spelling."] })] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "wr-5-1", title: "Writing a Descriptive Paragraph", goal: "Use the five senses and strong words to describe.",
          learn: L("Show, don't tell", "Instead of <em>The market was busy</em>, show it: <em>People were everywhere, shouting prices and carrying bags of fresh fruit.</em> Use the five senses: <strong>see, hear, smell, taste, touch</strong>.",
            [{ t: "see: golden sand, bright blue sky" }, { t: "hear: waves crashing, children laughing" }, { t: "smell: fresh bread, sweet perfume" }, { t: "touch: soft, rough, warm, freezing" }]),
          items: [which("Which sentence uses the sense of SMELL?", ["The smell of fresh bread filled the kitchen.", "The bread was brown.", "I heard the oven."]),
            which("Which sentence is more descriptive?", ["The enormous waves crashed onto the golden sand.", "The waves were big.", "There was a beach."]),
            which("Which word is a stronger choice than \"very cold\"?", ["freezing", "cool", "nice"]),
            write("Write a descriptive paragraph (6–8 sentences) about a market, a garden, a beach, or a rainy day. Use at least three senses.", { words: ["golden", "enormous", "tiny", "crowded", "fragrant", "delicious", "rough", "smooth", "crashing", "whispering"],
              starters: ["As I walked into…", "I could see…", "The air smelled of…", "I heard…", "It felt…"],
              model: "As I walked into the old market, I could see colorful carpets hanging everywhere. The air smelled of spices and sweet perfume. Sellers called out prices while children laughed and ran between the shops. I touched a soft, red scarf. Then I tasted a warm, sticky date that a kind man gave me. It was the most exciting place I had ever visited.", rows: 8,
              checklist: ["I used at least three senses.", "I used strong describing words.", "I started with a topic sentence.", "My sentences are complete.", "I checked capitals, punctuation and spelling."] })] },

        { id: "wr-5-2", title: "Writing About an Experience", goal: "Write about something that happened, with feelings.",
          learn: L("Telling about an experience", "Say <strong>when</strong> and <strong>where</strong> it happened, <strong>what</strong> happened in order, and <strong>how you felt</strong>. Write in the <strong>past tense</strong>.",
            [{ t: "Last summer, I visited AlUla with my family." }, { t: "We saw huge rocks shaped like animals." }, { t: "I felt amazed when I saw the ancient tombs." }]),
          items: [which("Which sentence is in the past tense?", ["We went to the museum.", "We go to the museum.", "We will go to the museum."]), which("Which sentence tells a feeling?", ["I felt nervous before the race.", "The race was at ten.", "There were six runners."]),
            fix("Yesterday we go to the beach.", "Yesterday we went to the beach.", ["Yesterday, we went to the beach."], true, "Past tense: <strong>went</strong>."),
            write("Write about an experience you remember (a trip, a special day, a first time). Write 6–8 sentences in the past tense. You can make it up.", { words: ["last week", "last year", "one day", "went", "saw", "felt", "excited", "nervous", "proud", "surprised"],
              starters: ["Last…, I…", "First, we…", "Then, something surprising happened…", "I felt…", "In the end,…", "I will never forget…"],
              model: "Last spring, I took part in my school's science fair. First, my partner and I built a small model of a volcano. I felt nervous when the judges came to our table. Then we mixed the vinegar and baking soda, and red foam poured out! Everyone clapped. In the end, we won second prize. I felt very proud. I will never forget that day.", rows: 8 })] },

        { id: "wr-5-3", title: "Writing a Short Story", goal: "Write a story with a beginning, middle and end.",
          learn: L("Story map", "A story has: <strong>Characters</strong> (who?) · <strong>Setting</strong> (where and when?) · <strong>Problem</strong> (what goes wrong?) · <strong>Solution</strong> (how is it fixed?) · <strong>Ending</strong>.",
            [{ t: "Beginning: Once upon a time, a little camel lived in the desert." }, { t: "Middle: One day, a sandstorm came and he got lost." }, { t: "End: A kind falcon showed him the way home." }]),
          items: [which("Which part of a story tells where and when it happens?", ["the setting", "the problem", "the ending"]), which("\"Suddenly, the boat started to sink!\" This is the…", ["problem", "setting", "title"]),
            which("Which is the best story opening?", ["One stormy night, Sami heard a strange noise outside his window.", "The end.", "Sami is a boy."]),
            write("Write a short story (8–10 sentences). Plan first: Who? Where? What problem? How is it solved?", { words: ["Once upon a time", "One day", "Suddenly", "Luckily", "In the end", "brave", "worried", "clever"],
              frame: "Characters: ______ . Setting: ______ . Problem: ______ . Solution: ______ . Ending: ______ .",
              model: "One hot afternoon, Lulu the little turtle wanted to visit her grandmother on the other side of the beach. Suddenly, a big wave pulled her into the sea. She was scared and could not see the shore. Luckily, a friendly dolphin swam by. \"Hold on to my fin,\" he said kindly. Together they swam back to the beach. Lulu thanked the dolphin and walked carefully to her grandmother's house. That night, she told everyone about her brave new friend.", rows: 10,
              checklist: ["My story has characters and a setting.", "There is a problem and a solution.", "My story has a clear ending.", "I used time words like One day, Suddenly, In the end.", "I checked capitals, punctuation and spelling."] })] },

        { id: "wr-5-4", title: "Writing an Opinion With a Reason", goal: "Give your opinion and support it with reasons.",
          learn: L("What do you think?", "Start with your <strong>opinion</strong>. Give <strong>reasons</strong> with <em>because</em>, <em>also</em> and <em>for example</em>. End by repeating your opinion.",
            [{ t: "Opinion: I think every school should have a garden." }, { t: "Reason: Students can learn how plants grow." }, { t: "Example: For example, they can grow tomatoes." }, { t: "Ending: That is why I believe gardens are great for schools." }]),
          items: [which("Which sentence is an opinion?", ["I think summer is the best season.", "Summer comes after spring.", "There are four seasons."]), which("Which sentence gives a reason?", ["because reading helps us learn new words", "I like reading", "Reading."]),
            which("Which word introduces an example?", ["For example", "However", "Finally"]),
            write("Choose ONE question and give your opinion with at least two reasons: Should children have pets? Is reading better than watching TV? Should students wear school uniforms?",
              { words: ["I think", "I believe", "because", "also", "for example", "in my opinion", "that is why"], frame: "In my opinion, ______ . First, ______ because ______ . Also, ______ . For example, ______ . That is why ______ .",
                model: "In my opinion, children should have pets. First, pets teach children to be responsible because they must feed them every day. Also, pets make people happy. For example, my cat always makes me smile after a long day. That is why I believe every child should have a pet.", rows: 8,
                checklist: ["I wrote my opinion clearly.", "I gave at least two reasons.", "I used because, also or for example.", "I ended by repeating my opinion.", "I checked capitals, punctuation and spelling."] })] },

        { id: "wr-5-5", title: "Revising and Improving a Paragraph", goal: "Make writing better by adding details and fixing mistakes.",
          learn: L("Make it better", "Good writers <strong>revise</strong>: they add details, use stronger words, join short sentences, and fix capitals, punctuation and spelling.",
            [{ t: "Before: The dog was big. It was nice." }, { t: "After: The enormous, fluffy dog was very gentle with the children." }]),
          items: [which("Which change makes this sentence better?  \"The food was good.\"", ["The rice was warm and delicious.", "The food was good good.", "Food good."]),
            which("Which is the best way to join these sentences?  \"I was late. The bus was slow.\"", ["I was late because the bus was slow.", "I was late and slow bus.", "I was late but the bus."]),
            fix("my friend and i went to the park on saturday", "My friend and I went to the park on Saturday.", null, true, "Capital letters: My, I, Saturday. Full stop at the end."),
            fix("we saw a big lion it was sleeping.", "We saw a big lion. It was sleeping.", ["We saw a big lion and it was sleeping.", "We saw a big lion, and it was sleeping."], true, "Two sentences need two full stops, or join them with <strong>and</strong>."),
            write("Revise this paragraph. Add details, use stronger words, and fix the mistakes:  \"yesterday i went to the zoo. it was fun. i saw a lion. it was big. then i saw a monkey. it was funny. i liked the zoo\"",
              { words: ["enormous", "playful", "fierce", "amazing", "because", "and", "then", "after that"],
                model: "Yesterday, my family and I went to the city zoo. It was an amazing day! First, I saw an enormous lion sleeping in the sun. Then I watched a playful monkey swinging from tree to tree, and it made everyone laugh. I liked the zoo because I learned so much about animals.", rows: 8,
                checklist: ["I fixed all the capital letters.", "I added full stops.", "I added details and stronger words.", "I joined some short sentences.", "I read my paragraph again to check it."] })] }
      ] }
    ]
  });
})();
