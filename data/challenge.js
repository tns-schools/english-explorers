/* =====================================================================
   TNS English Explorers — CHALLENGE ZONE (25 mixed-skill challenges)
   Each challenge mixes ~10 tasks from different skills, using NEW
   words, sentences and texts (not copies of other sections).
   No timers, no rankings — just stars and achievements.
   ===================================================================== */
(function () {
  "use strict";
  function pic(t, vis) { return { t: t, vis: vis, alt: t, hideLabel: true }; }
  function C(q, opts, explain, extra) { var o = { type: "choice", q: q, options: opts, answer: opts[0], explain: explain }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  function hear(q, sayText, opts, explain, voice) { return { type: "choice", q: q, say: sayText, hide: true, voice: voice, options: opts, answer: opts[0], explain: explain }; }
  function heard(word, opts) { return { type: "choice", q: "Listen. Which word do you hear?", say: word, hide: true, options: opts, answer: word }; }
  function dict(word, vis) { return { type: "type", q: "Listen and type the word.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word }; }
  function sen(text, accept) { return { type: "type", q: "Listen and type the sentence.", say: text, hide: true, answer: text, accept: accept, long: true }; }
  function tap(word, extra, vis) { return { type: "letters", q: "Listen. Tap the letters to spell the word.", say: word, hide: true, vis: vis, visAlt: "picture", answer: word, extra: extra }; }
  function order(s) { return { type: "words", q: "Put the words in order to make a sentence.", answer: s }; }
  function read(text, q, opts, explain) { return { type: "choice", q: q, text: '<p class="mini-read">' + text + "</p>", options: opts, answer: opts[0], explain: explain }; }
  function match(q, pairs) { return { type: "match", q: q, pairs: pairs }; }
  function intro(text) { return [{ title: "Challenge time!", text: text, tip: "There is no timer. Take your time, listen again if you need to, and do your best!" }]; }

  TNS.register("challenge", {
    intro: "Mix all your skills in fun challenges. There is no timer — just do your best and collect stars!",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "ch-1-1", title: "Alphabet Explorer", goal: "Letters, letter names and alphabet order.", learn: intro("Show what you know about the alphabet: letter names, capital and small letters, and ABC order."),
          items: [hear("Listen. Which letter do you hear?", "The letter K.", ["K", "C", "Q"]), hear("Listen. Which letter do you hear?", "The letter J.", ["J", "G", "Y"]), C("What letter comes before D?", ["C", "E", "B"]),
            C("What letter comes between L and N?", ["M", "K", "O"]), match("Match the capital and small letters.", [["K", "k"], ["F", "f"], ["U", "u"], ["V", "v"]]), C("Which letter is the first letter of the alphabet?", ["A", "Z", "B"]),
            C("Which word starts with the letter T?", ["tiger", "dog", "pig"], null, { sayOptions: true }), C("Put in ABC order. Which comes first?", ["ant", "cat", "bee"]), C("How many letters are in the English alphabet?", ["26", "28", "24"]),
            hear("Listen. Which letter do you hear?", "The letter H.", ["H", "A", "K"])] },
        { id: "ch-1-2", title: "Sound Explorer", goal: "First and last sounds in words.", learn: intro("Listen for the first and last sounds in new words."),
          items: [hear("Listen. What is the first sound?", "rabbit", ["r", "l", "w"]), hear("Listen. What is the first sound?", "window", ["w", "v", "y"]), hear("Listen. What is the last sound?", "bag", ["g", "k", "d"]),
            hear("Listen. What is the last sound?", "sit", ["t", "d", "s"]), C("Which picture starts like ball?", ["bear", "pear", "deer"], null, { say: "ball", listenLabel: "Listen: ball", sayOptions: true, options: [pic("bear", "🐻"), pic("pear", "🍐"), pic("deer", "🦌")] }),
            C("Which two words start with the same sound?", ["sun – sock", "sun – moon", "map – cap"], null, { fixed: false }), hear("Listen. What is the first sound?", "jelly", ["j", "g", "y"]),
            match("Match each letter to a picture that starts with its sound.", [["b", pic("bee", "🐝")], ["m", pic("monkey", "🐒")], ["t", pic("tiger", "🐯")], ["h", pic("horse", "🐴")]]),
            hear("Listen. What is the last sound?", "drum", ["m", "n", "p"]), C("Which word rhymes with cat?", ["hat", "cup", "dog"], null, { sayOptions: true })] },
        { id: "ch-1-3", title: "Word Explorer", goal: "Colors, numbers, animals and objects.", learn: intro("Use the words you know for colors, numbers, animals and things."),
          items: [C("How many?  🐟🐟🐟🐟", ["four", "three", "five"]), C("Look. What color is it?", ["purple", "pink", "blue"], null, { vis: "svg:color-purple", visAlt: "a color" }),
            C("Which one is an animal?", ["zebra", "kite", "pencil"]), C("Which one can you read?", ["a book", "a ball", "a cup"]), C("Which one is a shape?", ["circle", "camel", "car"]),
            { type: "choice", q: "Listen. Choose the right picture.", say: "a horse", hide: true, options: [pic("horse", "🐴"), pic("cow", "🐮"), pic("goat", "🐐")], answer: "horse" },
            C("What is 3 + 3?", ["six", "five", "seven"]), match("Match each color to its picture.", [["red", pic("red", "svg:color-red")], ["brown", pic("brown", "svg:color-brown")], ["pink", pic("pink", "svg:color-pink")]]),
            C("Bananas are…", ["yellow", "blue", "purple"]), C("Which one is a toy?", ["teddy bear", "bread", "chair"])] },
        { id: "ch-1-4", title: "Listen and Find", goal: "Listen to words and short phrases.", learn: intro("Listen carefully and find the right answer."),
          items: [{ type: "choice", q: "Listen. Choose the right picture.", say: "a red car", hide: true, options: [pic("red car", "🚗"), pic("bus", "🚌"), pic("bike", "🚲")], answer: "red car" },
            { type: "choice", q: "Listen. Choose the right picture.", say: "a big tree", hide: true, options: [pic("tree", "🌳"), pic("flower", "🌸"), pic("leaf", "🍃")], answer: "tree" },
            hear("Listen. How many?", "five birds", ["5", "4", "9"]), heard("bed", ["bed", "bad", "bud"]), heard("cup", ["cup", "cap", "cop"]),
            { type: "choice", q: "Listen. Choose the right picture.", say: "The ball is in the box.", hide: true, options: [pic("in the box", "svg:ball-in-box"), pic("on the box", "svg:ball-on-box"), pic("next to the box", "svg:ball-next-to-box")], answer: "in the box", explain: "The ball is <strong>in</strong> the box." },
            hear("Listen. What color is the ball?", "My ball is green.", ["green", "red", "blue"]), hear("Listen. Who is it?", "This is my grandmother.", ["grandmother", "grandfather", "sister"]),
            heard("six", ["six", "sit", "sick"]), hear("Listen. What does the girl like?", "I like grapes.", ["grapes", "cakes", "games"])] },
        { id: "ch-1-5", title: "Little Explorer Challenge", goal: "Mix letters, sounds, words and listening.", learn: intro("This is the big Level 1 challenge. Use everything you learned!"),
          items: [hear("Listen. What is the first sound?", "nest", ["n", "m", "s"]), tap("cat", "o", "🐱"), tap("sun", "i", "☀️"), C("Which letter is missing?  d _ g", ["o", "a", "e"], "The word is <strong>dog</strong>.", { vis: "🐶", visAlt: "a dog" }),
            C("Which one is a fruit?", ["apple", "egg", "fish"]), heard("hat", ["hat", "hot", "hit"]), C("Which one is small?", ["ant", "elephant", "camel"]),
            match("Match each word to its picture.", [["bus", pic("bus", "🚌")], ["key", pic("key", "🔑")], ["moon", pic("moon", "🌙")]]), C("What letter comes after R?", ["S", "Q", "T"]),
            hear("Listen. How many?", "two cats", ["2", "3", "10"])] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "ch-2-1", title: "Spelling Explorer", goal: "Spell short and everyday words.", learn: intro("Listen and spell. Say each sound as you spell."),
          items: [dict("van"), dict("ship", "🚢"), dict("milk", "🥛"), tap("frog", "l", "🐸"), tap("tree", "a", "🌳"), C("Listen. Which spelling is correct?", ["rain", "rane", "rayn"], null, { say: "rain", hide: true }),
            C("Listen. Which spelling is correct?", ["chair", "chare", "shair"], null, { say: "chair", hide: true }), C("Which letters are missing?  _ _ ip", ["sh", "ch", "th"], "The word is <strong>ship</strong>.", { say: "ship", hide: true, vis: "🚢", visAlt: "picture" }),
            dict("hand", "✋"), dict("school", "🏫")] },
        { id: "ch-2-2", title: "Sentence Builder", goal: "Build sentences with the right word order.", learn: intro("Put words in order and choose the right word to build good sentences."),
          items: [order("I have a blue pen."), order("The cat is under the bed."), order("We are good friends."), C("Choose the correct word.  \"She ___ a teacher.\"", ["is", "am", "are"]),
            C("Choose the correct word.  \"They ___ happy.\"", ["are", "is", "am"]), C("Which sentence is correct?", ["I am seven.", "I is seven.", "I are seven."]), order("My sister has long hair."),
            C("Choose the correct word.  \"I have ___ orange.\"", ["an", "a"]), order("Can you help me?"), C("Which sentence is correct?", ["These are my shoes.", "This are my shoes.", "These is my shoes."])] },
        { id: "ch-2-3", title: "Vocabulary Explorer", goal: "Family, food, clothes, body and home words.", learn: intro("Show what you know about everyday words."),
          items: [C("Your mother's brother is your…", ["uncle", "cousin", "aunt"]), C("What do you wear on your head?", ["a cap", "socks", "gloves"]), C("You hear with your…", ["ears", "eyes", "nose"]),
            C("Where do you cook?", ["in the kitchen", "in the bedroom", "in the bathroom"]), C("Which one is a drink?", ["water", "rice", "cheese"]),
            C("Which word does NOT belong?", ["shirt", "dress", "coat", "carrot"], "shirt, dress and coat are clothes. <strong>carrot</strong> is food.", { sayOptions: true }),
            match("Match each word to its picture.", [["glasses", pic("glasses", "👓")], ["sofa", pic("sofa", "🛋️")], ["cheese", pic("cheese", "🧀")], ["baby", pic("baby", "👶")]]),
            C("What do you use to see better?", ["glasses", "a scarf", "a sofa"]), C("Where do you sleep?", ["in a bed", "on a table", "in a cup"]), C("Which one is a body part?", ["knee", "kite", "key"])] },
        { id: "ch-2-4", title: "Listening Explorer", goal: "Understand instructions and short descriptions.", learn: intro("Listen to instructions and descriptions."),
          items: [hear("Listen to the teacher. What should you do?", "Please close the window.", ["Close the window.", "Open the window.", "Close the door."]),
            hear("Listen to the teacher. What should you do?", "Take out your red pencil.", ["Take out your red pencil.", "Take out your blue pen.", "Put away your pencil."]),
            hear("Listen. How old is Reem?", "My name is Reem. I'm nine years old.", ["nine", "five", "nineteen"]), hear("Listen. Where is the cat?", "The cat is on the chair.", ["on the chair", "under the chair", "next to the chair"]),
            hear("Listen. What color are Ali's shoes?", "Ali's shoes are black and white.", ["black and white", "blue and white", "black and red"], null, "m"), hear("Listen. Which way?", "Turn right, then go straight.", ["➡️ then ⬆️", "⬅️ then ⬆️", "⬆️ then ➡️"]),
            hear("Listen. What does Omar have?", "Omar has a big brown dog.", ["a big brown dog", "a small black cat", "a big brown horse"], null, "m"), hear("Listen. What day is it?", "Today is Monday.", ["Monday", "Sunday", "Friday"]),
            hear("Listen. What does the boy want?", "Can I have some juice, please?", ["juice", "milk", "water"], null, "m"), hear("Listen. What is the weather like?", "It's cold and windy today.", ["cold and windy", "hot and sunny", "rainy"])] },
        { id: "ch-2-5", title: "Word Explorer Challenge", goal: "Mix spelling, sentences, vocabulary and listening.", learn: intro("This is the big Level 2 challenge!"),
          items: [dict("door", "🚪"), order("My dad is very tall."), C("Choose the correct word.  \"We ___ a big garden.\"", ["have", "has"]), C("Your father's father is your…", ["grandfather", "uncle", "brother"]),
            hear("Listen. Where is Huda?", "Huda is in the library.", ["in the library", "in the kitchen", "in the park"]), heard("shop", ["shop", "chop", "stop"]),
            C("Which word is spelled correctly?", ["friend", "frend", "freind"]), C("Which one is a polite word?", ["please", "go", "give"]), tap("star", "o", "⭐"), C("Which sentence is correct?", ["He has a red bike.", "He have a red bike.", "He is a red bike."])] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "ch-3-1", title: "Grammar Explorer", goal: "Present tense, prepositions, adjectives and can.", learn: intro("Choose the right words to make correct sentences."),
          items: [C("Choose the correct word.  \"My mom ___ tea every morning.\"", ["drinks", "drink", "drinking"]), C("Choose the correct word.  \"The keys are ___ the table.\" (on top)", ["on", "under", "between"]),
            C("Which sentence is correct?", ["I have a small black cat.", "I have a cat small black.", "I have a black small cat cat."]), C("Choose the correct word.  \"A fish can ___.\"", ["swim", "swims", "swimming"]),
            C("Choose the correct word.  \"They ___ to school by bus.\"", ["go", "goes", "going"]), C("Look at the picture. Where is the ball?", ["behind the box", "on the box", "in the box"], null, { vis: "svg:ball-behind-box", visAlt: "a ball and a box" }),
            { type: "type", q: "Find the mistake. Type the correct sentence.", prompt: "He play football every day.", answer: "He plays football every day.", long: true }, order("Can you ride a bike?"),
            C("Which word is an adjective?", ["soft", "jump", "door"]), C("Choose the correct word.  \"Penguins ___ fly.\"", ["cannot", "can", "does"])] },
        { id: "ch-3-2", title: "Sound and Spelling Challenge", goal: "Blends, digraphs, silent e and sound pairs.", learn: intro("Listen closely to sounds, then spell."),
          items: [heard("sheep", ["sheep", "ship", "cheap"]), heard("van", ["van", "fan", "ban"]), heard("think", ["think", "sink", "tink"]), dict("smile"), dict("brush"),
            C("Add silent e. What is the new word?", ["kite", "kit", "cat"], null, { prompt: "kit + e", sayOptions: true }), tap("clock", "a", "⏰"), dict("thank"),
            C("Listen. Which spelling is correct?", ["white", "wite", "whit"], null, { say: "white", hide: true }), C("Which word has a digraph (two letters, one sound)?", ["chop", "crop", "clap"], null, { sayOptions: true })] },
        { id: "ch-3-3", title: "Read and Understand", goal: "Read short texts and answer questions.", learn: intro("Read each short text carefully, then answer."),
          items: [read("Tariq has a pet parrot. It is green and red. It can say \"hello\"!", "What can the parrot say?", ["hello", "goodbye", "thank you"]), read("Tariq has a pet parrot. It is green and red. It can say \"hello\"!", "What colors is the parrot?", ["green and red", "blue and yellow", "green and yellow"]),
            read("The shop opens at nine o'clock. It closes at five o'clock. It is closed on Friday.", "When does the shop close?", ["at five o'clock", "at nine o'clock", "on Friday"]), read("The shop opens at nine o'clock. It closes at five o'clock. It is closed on Friday.", "Can you go to the shop on Friday?", ["No", "Yes", "Only in the morning"]),
            read("Dalia was cold, so she put on her coat and gloves.", "Why did Dalia put on her coat?", ["She was cold.", "She was going to school.", "It was raining."]),
            read("Ahmed planted a seed. He watered it every day. After two weeks, a small green plant grew.", "What did Ahmed do every day?", ["watered the seed", "picked flowers", "ate vegetables"]),
            read("Ahmed planted a seed. He watered it every day. After two weeks, a small green plant grew.", "How long did it take for the plant to grow?", ["two weeks", "two days", "two months"]),
            read("Owls sleep in the day. At night, they hunt for food. They can see very well in the dark.", "When do owls hunt?", ["at night", "in the morning", "at lunchtime"]),
            read("Owls sleep in the day. At night, they hunt for food. They can see very well in the dark.", "What is the text mostly about?", ["owls", "the night sky", "food"]), order("Owls can see in the dark.")] },
        { id: "ch-3-4", title: "Everyday English Challenge", goal: "Polite expressions, requests and daily life.", learn: intro("Choose what people say in everyday situations."),
          items: [C("You want to borrow a pencil. What do you say?", ["Can I borrow your pencil, please?", "Give me pencil.", "Pencil!"], null, { sayOptions: true }), C("Someone gives you a gift. What do you say?", ["Thank you so much!", "Excuse me.", "Goodbye."]),
            C("You did not hear your friend. What do you say?", ["Sorry, can you say that again?", "I'm finished.", "You're welcome."]), C("It is 8 p.m. You meet your neighbor. What do you say?", ["Good evening!", "Good morning!", "Good night!"], "In the evening, we say <strong>Good evening</strong> when we meet someone. <em>Good night</em> is for going to bed."),
            hear("Listen. What is the problem?", "Oh no! I forgot my lunch at home.", ["She forgot her lunch.", "She lost her bag.", "She is late."]), hear("Listen. What does the man want?", "Excuse me, where is the bus station?", ["to find the bus station", "to buy a bus", "to find his bag"], null, "m"),
            C("\"How much is this book?\" — What is a good answer?", ["It's fifteen riyals.", "It's blue.", "It's on the shelf."]), C("\"Do you like swimming?\" — What is a good answer?", ["Yes, I do. It's fun!", "Yes, I am.", "I swimming."]),
            C("Which is the most polite?", ["Could you open the door, please?", "Open the door.", "Door!"]), order("Excuse me, where is the library?")] },
        { id: "ch-3-5", title: "Sentence Explorer Challenge", goal: "Mix grammar, reading, spelling and listening.", learn: intro("This is the big Level 3 challenge!"),
          items: [sen("I like to read books."), order("She brushes her teeth every morning."), C("Choose the correct word.  \"The cat is ___ the two chairs.\"", ["between", "on", "in"]),
            read("Every Saturday, Faris helps his grandfather on the farm. They feed the goats and pick dates.", "What do they pick?", ["dates", "apples", "flowers"]), heard("thin", ["thin", "tin", "fin"]),
            C("Which word is spelled correctly?", ["bike", "biek", "bik"]), C("Choose the correct word.  \"My brother ___ ride a horse.\"", ["can", "cans", "is"]), dict("bread", "🍞"),
            C("What does \"weekend\" mean?", ["Friday and Saturday — days with no school", "the first day of school", "a kind of food"]), hear("Listen. What time does Noura wake up?", "Noura wakes up at half past six.", ["at half past six", "at six o'clock", "at seven thirty"])] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "ch-4-1", title: "Reading Explorer", goal: "Read longer texts and understand details, vocabulary and the main idea.", learn: intro("Read each text carefully. You can read it again as many times as you need."),
          items: [read("Hamsters are small, furry animals. They sleep in the day and are busy at night. They store food in their cheeks, which can stretch like bags. A hamster needs a clean cage, fresh water and a wheel to run on.", "When are hamsters busy?", ["at night", "in the morning", "all day"]),
            read("Hamsters are small, furry animals. They sleep in the day and are busy at night. They store food in their cheeks, which can stretch like bags. A hamster needs a clean cage, fresh water and a wheel to run on.", "Where do hamsters store food?", ["in their cheeks", "under their bed", "in their wheel"]),
            read("Hamsters are small, furry animals. They sleep in the day and are busy at night. They store food in their cheeks, which can stretch like bags. A hamster needs a clean cage, fresh water and a wheel to run on.", "In this text, \"stretch\" means…", ["become bigger", "become smaller", "break"]),
            read("Hamsters are small, furry animals. They sleep in the day and are busy at night. They store food in their cheeks, which can stretch like bags. A hamster needs a clean cage, fresh water and a wheel to run on.", "What is the text mostly about?", ["hamsters and how to care for them", "how to build a cage", "night animals in the desert"]),
            read("Last week, Jood lost her new watch at school. She looked everywhere. The next day, the cleaner found it in the playground and gave it to the office. Jood was so relieved.", "Who found the watch?", ["the cleaner", "Jood", "the teacher"]),
            read("Last week, Jood lost her new watch at school. She looked everywhere. The next day, the cleaner found it in the playground and gave it to the office. Jood was so relieved.", "\"Relieved\" means…", ["happy because a worry is gone", "very angry", "very tired"]),
            read("Last week, Jood lost her new watch at school. She looked everywhere. The next day, the cleaner found it in the playground and gave it to the office. Jood was so relieved.", "Where was the watch found?", ["in the playground", "in the office", "in her bag"]),
            read("A rainbow appears when sunlight shines through raindrops. The light splits into seven colors: red, orange, yellow, green, blue, indigo and violet.", "What do we need to see a rainbow?", ["sunlight and raindrops", "clouds and wind", "snow and ice"]),
            read("A rainbow appears when sunlight shines through raindrops. The light splits into seven colors: red, orange, yellow, green, blue, indigo and violet.", "How many colors are in a rainbow?", ["seven", "five", "ten"]),
            read("A rainbow appears when sunlight shines through raindrops. The light splits into seven colors: red, orange, yellow, green, blue, indigo and violet.", "Which color comes after green?", ["blue", "yellow", "red"])] },
        { id: "ch-4-2", title: "Listening Adventure", goal: "Understand conversations and short talks.", learn: intro("Listen to short conversations and talks. Listen as many times as you need."),
          items: [hear("Listen. Where are they going?", "Let's go to the museum on Saturday. It opens at ten.", ["to the museum", "to the zoo", "to school"]), hear("Listen. What time does it open?", "Let's go to the museum on Saturday. It opens at ten.", ["at ten", "at two", "at seven"]),
            hear("Listen. Why is the boy late?", "Sorry I'm late. The bus was very slow this morning.", ["The bus was slow.", "He woke up late.", "He forgot his bag."], null, "m"),
            hear("Listen. What does the girl want to be?", "When I grow up, I want to be a doctor, because I like helping people.", ["a doctor", "a teacher", "a pilot"]),
            hear("Listen. Why does she want to be a doctor?", "When I grow up, I want to be a doctor, because I like helping people.", ["She likes helping people.", "Doctors are rich.", "Her mother is a doctor."]),
            hear("Listen. How does the man travel to work?", "I usually take the metro to work. It's fast and I can read on the way.", ["by metro", "by car", "on foot"], null, "m"),
            hear("Listen. What is the weather going to be like tomorrow?", "Tomorrow will be cloudy in the morning and rainy in the afternoon.", ["cloudy, then rainy", "sunny all day", "windy and cold"]),
            hear("Listen. What does the boy need for the project?", "For the project, I need glue, scissors and some colored paper.", ["glue, scissors and colored paper", "a ruler and a pen", "paint and brushes"], null, "m"),
            hear("Listen. How many students are in the class?", "There are twenty-four students in my class: twelve boys and twelve girls.", ["24", "12", "42"]),
            hear("Listen. What did the girl do yesterday?", "Yesterday, I visited my aunt and we baked cookies together.", ["She baked cookies with her aunt.", "She went to the beach.", "She watched TV."])] },
        { id: "ch-4-3", title: "Grammar and Vocabulary Challenge", goal: "Tenses, questions and new words.", learn: intro("Choose the right tense and the right word."),
          items: [C("Choose the correct word.  \"Look! The children ___ in the rain.\"", ["are playing", "play", "played"]), C("Choose the correct word.  \"Yesterday, we ___ a camel race.\"", ["watched", "watch", "are watching"]),
            C("Choose the correct word.  \"___ you finish your homework?\" (past)", ["Did", "Do", "Does"]), C("Choose the correct word.  \"She doesn't ___ spicy food.\"", ["like", "likes", "liked"]),
            C("Choose the correct word.  \"Last summer, I ___ to Taif.\"", ["went", "go", "goes"]), C("Who flies a plane?", ["a pilot", "a chef", "a farmer"]), C("What does \"crowded\" mean?", ["full of people", "very quiet", "very clean"]),
            C("How do you feel when you win a prize?", ["proud", "bored", "scared"]), { type: "type", q: "Find the mistake. Type the correct sentence.", prompt: "We eated dinner at seven.", answer: "We ate dinner at seven.", long: true },
            order("Did you see the rainbow?")] },
        { id: "ch-4-4", title: "Sentence Master", goal: "Build, join and correct sentences.", learn: intro("Show you can write strong, correct sentences."),
          items: [order("It was raining, so we stayed inside."), order("My brother is reading a book now."), C("Join the sentences.  \"I was thirsty. I drank water.\"", ["I was thirsty, so I drank water.", "I was thirsty but I drank water.", "I was thirsty or I drank water."]),
            C("Which sentence is correct?", ["Where did you go yesterday?", "Where you went yesterday?", "Where did you went yesterday?"]),
            { type: "type", q: "Rewrite the sentence correctly.", prompt: "my cousin lives in dammam", answer: "My cousin lives in Dammam.", long: true, check: { case: true, punct: true } },
            { type: "type", q: "Rewrite the sentence correctly.", prompt: "what time is it", answer: "What time is it?", long: true, check: { case: true, punct: true } }, sen("We are going to the park today."),
            C("Which sentence gives a reason?", ["I stayed home because I was sick.", "I stayed home.", "I was at home on Monday."]), C("Which word best completes the sentence?  \"First, mix the flour. ___, add the eggs.\"", ["Then", "Because", "But"]),
            order("The tall girl won the race.")] },
        { id: "ch-4-5", title: "Story Explorer Challenge", goal: "Mix reading, listening, grammar and vocabulary.", learn: intro("This is the big Level 4 challenge!"),
          items: [read("Bandar wanted to buy a gift for his mother. He saved his pocket money for two months. Then he bought her a beautiful scarf. When she opened it, she smiled and hugged him.", "How long did Bandar save money?", ["two months", "two weeks", "two years"]),
            read("Bandar wanted to buy a gift for his mother. He saved his pocket money for two months. Then he bought her a beautiful scarf. When she opened it, she smiled and hugged him.", "What does this story show about Bandar?", ["He is thoughtful and patient.", "He is lazy.", "He does not like gifts."]),
            hear("Listen. What will they do after school?", "After school, let's practice for the reading competition in the library.", ["practice in the library", "play football", "go home"]),
            C("Choose the correct word.  \"Mom ___ dinner right now.\"", ["is cooking", "cooks", "cooked"]), C("What does \"enormous\" mean?", ["very big", "very small", "very fast"]), sen("My grandmother tells funny stories."),
            C("Choose the correct word.  \"Did you ___ your new shoes?\"", ["wear", "wore", "wearing"]), heard("leave", ["leave", "leaf", "live"]), order("They visited the museum last week."),
            C("Which word is the opposite of \"arrive\"?", ["leave", "come", "reach"])] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "ch-5-1", title: "Advanced Word Challenge", goal: "Synonyms, antonyms, word meanings and spelling.", learn: intro("Use strong vocabulary and careful spelling."),
          items: [C("Which word is a synonym for \"quick\"?", ["fast", "slow", "late"]), C("Which word is an antonym for \"ancient\"?", ["modern", "old", "huge"]), C("\"The soup was so hot that it was steaming.\" What does steaming mean?", ["giving off hot air", "very cold", "very salty"]),
            C("Which word is spelled correctly?", ["beautiful", "beatiful", "beutiful"]), C("Which word is spelled correctly?", ["because", "becuse", "becaus"]), dict("important"), dict("tomorrow"),
            C("Choose the best word.  \"After the marathon, the runners were ___.\"", ["exhausted", "delicious", "ancient"]), match("Match the synonyms.", [["begin", "start"], ["glad", "happy"], ["yell", "shout"], ["finish", "complete"]]),
            C("\"The kitten was timid and hid under the sofa.\" What does timid mean?", ["shy and easily scared", "brave and loud", "hungry and angry"])] },
        { id: "ch-5-2", title: "Reading Detective", goal: "Find clues, make inferences and identify the main idea.", learn: intro("A reading detective looks for clues in the text. Some answers are not written directly — you need to think!"),
          items: [read("Maha looked out of the window. The sky was dark gray, and people on the street were opening their umbrellas. She took her raincoat from the cupboard.", "What is the weather probably like?", ["rainy", "sunny", "snowy"], "Clues: dark gray sky, umbrellas, raincoat."),
            read("Maha looked out of the window. The sky was dark gray, and people on the street were opening their umbrellas. She took her raincoat from the cupboard.", "Why did Maha take her raincoat?", ["She did not want to get wet.", "She was going to sleep.", "It was a gift."]),
            read("The waiter brought the menu. Yazan looked at the pictures of burgers and pizza. His stomach was making loud noises.", "Where is Yazan?", ["in a restaurant", "in a library", "in a hospital"]),
            read("The waiter brought the menu. Yazan looked at the pictures of burgers and pizza. His stomach was making loud noises.", "How does Yazan probably feel?", ["hungry", "sleepy", "angry"]),
            read("Every night, Nada writes in her notebook about what happened that day. She has filled three notebooks already. She wants to keep them forever.", "What is Nada's notebook?", ["a diary", "a math book", "a shopping list"]),
            read("Coral reefs cover a very small part of the ocean floor, but about a quarter of all sea animals live on or near them.", "What is the main idea?", ["Many sea animals depend on coral reefs.", "Coral reefs cover most of the ocean.", "Sea animals do not like coral."]),
            read("Saad trained every day for three months. On the day of the race, he did not come first, but he finished faster than ever before. He smiled the whole way home.", "Why did Saad smile?", ["He did better than ever before.", "He came first.", "The race was canceled."]),
            read("Saad trained every day for three months. On the day of the race, he did not come first, but he finished faster than ever before. He smiled the whole way home.", "What is the lesson?", ["Doing your best is a kind of success.", "Only winning matters.", "Training is boring."]),
            read("The little plant on the windowsill grew toward the light. Its leaves turned to face the sun.", "What do we learn about plants?", ["They grow toward light.", "They grow away from light.", "They do not need light."]),
            read("The little plant on the windowsill grew toward the light. Its leaves turned to face the sun.", "What is a windowsill?", ["the shelf at the bottom of a window", "a kind of flower", "a garden tool"])] },
        { id: "ch-5-3", title: "Listening Detective", goal: "Listen for details, reasons and inferences.", learn: intro("Listen for details. Some answers need you to think about what the speaker means."),
          items: [hear("Listen. Where is the speaker?", "Please fasten your seat belts. We will land in Jeddah in twenty minutes.", ["on a plane", "on a bus", "in a classroom"], null, "m"),
            hear("Listen. How long until they land?", "Please fasten your seat belts. We will land in Jeddah in twenty minutes.", ["twenty minutes", "two hours", "ten minutes"], null, "m"),
            hear("Listen. How does the girl feel?", "I studied so hard, and I got full marks on my science test!", ["proud and happy", "worried", "bored"]),
            hear("Listen. What will the boy probably do next?", "I'm so thirsty. Is there any cold water in the fridge?", ["get a drink of water", "go to sleep", "do his homework"], null, "m"),
            hear("Listen. Why can't they go to the beach?", "We wanted to go to the beach, but there's a strong wind and big waves today.", ["The weather is dangerous.", "The car is broken.", "They are tired."]),
            hear("Listen. What is the speaker's job?", "Open wide, please. Let me check your teeth. Good — no holes today!", ["a dentist", "a chef", "a pilot"], null, "m"),
            hear("Listen. What does the woman mean?", "Wow, it's freezing in here! Can someone close the window?", ["The room is very cold.", "She wants ice cream.", "The window is broken."]),
            hear("Listen. Which day is the trip?", "The trip was on Tuesday, but now it's on Thursday because of the rain.", ["Thursday", "Tuesday", "Wednesday"]),
            hear("Listen. What did the boy forget?", "Oh no! I packed my bag, but I left my homework on my desk!", ["his homework", "his bag", "his lunch"], null, "m"),
            hear("Listen. How many people are coming to dinner?", "Grandma, Grandpa and my two aunts are coming to dinner tonight.", ["four", "two", "three"], "Grandma + Grandpa + two aunts = <strong>four</strong>.")] },
        { id: "ch-5-4", title: "Grammar Master", goal: "Future, comparatives, superlatives and conjunctions.", learn: intro("Use all your grammar knowledge."),
          items: [C("Choose the correct word.  \"Next week, we ___ visit the science center.\"", ["are going to", "went to", "visited"]), C("Choose the correct word.  \"A tiger is ___ than a cat.\"", ["bigger", "biggest", "more big"]),
            C("Choose the correct word.  \"This is the ___ day of my life!\"", ["best", "better", "goodest"]), C("Choose the correct word.  \"I wanted to go out, ___ it was too hot.\"", ["but", "so", "because"]),
            C("Choose the correct word.  \"Riyadh is the ___ city in Saudi Arabia.\"", ["largest", "larger", "most large"]), C("Which sentence is correct?", ["I think it will rain tomorrow.", "I think it rains tomorrow yesterday.", "I think it will rains tomorrow."]),
            { type: "type", q: "Find the mistake. Type the correct sentence.", prompt: "This puzzle is more easy than that one.", answer: "This puzzle is easier than that one.", long: true },
            { type: "type", q: "Find the mistake. Type the correct sentence.", prompt: "She is the most fast runner in the school.", answer: "She is the fastest runner in the school.", long: true },
            order("We stayed inside because it was very windy."), C("Choose the correct word.  \"Would you like tea ___ juice?\"", ["or", "but", "so"])] },
        { id: "ch-5-5", title: "Super Explorer Challenge", goal: "The final challenge: every skill together!", learn: intro("This is the biggest challenge of all. Use everything you have learned. You are a Super Explorer!"),
          items: [read("The falcon is the national bird of Saudi Arabia. Falcons have amazing eyesight and can spot small animals from very high in the sky. When a falcon dives, it can fly faster than a car on a highway.", "What makes falcons good hunters?", ["amazing eyesight and great speed", "long legs", "loud voices"]),
            read("The falcon is the national bird of Saudi Arabia. Falcons have amazing eyesight and can spot small animals from very high in the sky. When a falcon dives, it can fly faster than a car on a highway.", "In this text, \"spot\" means…", ["see", "paint", "clean"]),
            hear("Listen. What does the speaker suggest?", "If you want to remember new words, write them in a notebook and use them in your own sentences.", ["writing new words and using them in sentences", "reading only one book", "never asking questions"]),
            sen("Learning English opens many doors."), C("Choose the correct word.  \"By the end of the year, I ___ read twenty books.\"", ["will have", "had", "has"], "We use <strong>will have</strong> for something that will be finished by a time in the future."),
            C("Which word is a synonym for \"brave\"?", ["courageous", "afraid", "careless"]), heard("through", ["through", "throw", "true"]),
            C("Which sentence is the best topic sentence for a paragraph about friendship?", ["A true friend is someone who helps you in good times and bad.", "My friend has a bike.", "Friends."]),
            { type: "type", q: "Rewrite the sentence correctly.", prompt: "my friends and i visited alula last winter", answer: "My friends and I visited AlUla last winter.", accept: ["My friends and I visited Al Ula last winter.", "My friends and I visited Alula last winter."], long: true, check: { case: true, punct: true } },
            C("What have you become after finishing all the challenges?", ["a Super Explorer!", "a Little Explorer", "a Word Explorer"], "Congratulations, Super Explorer! 🏆")] }
      ] }
    ]
  });
})();
