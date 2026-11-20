/* =====================================================================
   TNS English Explorers — WORD WORLD (25 activity sets)
   Each set: a learning phase with 8–10 word cards (word + recording +
   picture where it is clear + meaning/example at higher levels), then
   8–10 practice questions. Pictures are emoji only when unmistakable,
   or local SVGs. Abstract words use meanings and sentences instead.
   ===================================================================== */
(function () {
  "use strict";
  function card(t, vis, note, sent) { return { t: t, say: t.replace(/ [·↔] /g, ", "), vis: vis, alt: t, note: note, sent: sent }; }
  function pic(t, vis) { return { t: t, vis: vis, alt: t, hideLabel: true }; }
  function hearPic(word, answer, opts) { return { type: "choice", q: "Listen. Choose the right picture.", say: word, hide: true, options: opts, answer: answer }; }
  function picWord(vis, alt, opts) { return { type: "choice", q: "Look at the picture. Which word is it?", vis: vis, visAlt: alt, options: opts, answer: opts[0] }; }
  function hearWord(word, opts) { return { type: "choice", q: "Listen. Which word do you hear?", say: word, hide: true, options: opts, answer: word }; }
  function mean(word, opts, explain) { return { type: "choice", q: "What does this word mean?", prompt: word, say: word, options: opts, answer: opts[0], explain: explain }; }
  function fill(sentence, opts, explain) { return { type: "choice", q: "Choose the best word to complete the sentence.", prompt: sentence, options: opts, answer: opts[0], explain: explain }; }
  function odd(opts, answer, explain) { return { type: "choice", q: "Which word does NOT belong?", options: opts, answer: answer, sayOptions: true, explain: explain }; }
  function which(q, opts, explain) { return { type: "choice", q: q, options: opts, answer: opts[0], explain: explain }; }
  function match(q, pairs) { return { type: "match", q: q, pairs: pairs }; }
  function L(title, text, cards, tip) { return [{ title: title, text: text, examples: cards, tip: tip }]; }

  TNS.register("words", {
    intro: "Learn new words with pictures and sounds. First look and listen, then practice.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "wd-1-1", title: "Colors and Shapes", goal: "Learn color and shape words.",
          learn: L("Colors and shapes", "Tap each card to hear the word. Say it after you listen.",
            [card("red", "svg:color-red"), card("blue", "svg:color-blue"), card("yellow", "svg:color-yellow"), card("green", "svg:color-green"), card("black", "svg:color-black"),
             card("circle", "svg:circle"), card("square", "svg:square"), card("triangle", "svg:triangle"), card("star", "svg:star"), card("heart", "svg:heart")]),
          items: [hearPic("red", "red", [pic("red", "svg:color-red"), pic("blue", "svg:color-blue"), pic("green", "svg:color-green")]),
            hearPic("yellow", "yellow", [pic("yellow", "svg:color-yellow"), pic("orange", "svg:color-orange"), pic("black", "svg:color-black")]),
            hearPic("triangle", "triangle", [pic("triangle", "svg:triangle"), pic("circle", "svg:circle"), pic("square", "svg:square")]),
            hearPic("star", "star", [pic("star", "svg:star"), pic("heart", "svg:heart"), pic("circle", "svg:circle")]),
            picWord("svg:square", "a shape", ["square", "circle", "triangle"]), picWord("svg:color-green", "a color", ["green", "blue", "black"]), picWord("svg:heart", "a shape", ["heart", "star", "square"]),
            match("Match each word to its picture.", [["circle", pic("circle", "svg:circle")], ["blue", pic("blue", "svg:color-blue")], ["star", pic("star", "svg:star")], ["black", pic("black", "svg:color-black")]]),
            which("The sun is…", ["yellow", "blue", "black"]), which("Grass is…", ["green", "red", "black"])] },

        { id: "wd-1-2", title: "Numbers", goal: "Learn number words from one to twelve.",
          learn: L("Numbers 1 to 12", "Listen and count with your fingers.",
            [card("one", "1️⃣"), card("two", "2️⃣"), card("three", "3️⃣"), card("four", "4️⃣"), card("five", "5️⃣"), card("six", "6️⃣"), card("seven", "7️⃣"), card("eight", "8️⃣"), card("nine", "9️⃣"), card("ten", "🔟"), card("eleven", null, "11"), card("twelve", null, "12")]),
          items: [{ type: "choice", q: "Listen. Which number do you hear?", say: "eight", hide: true, options: ["8", "3", "6"], answer: "8" }, { type: "choice", q: "Listen. Which number do you hear?", say: "twelve", hide: true, options: ["12", "20", "2"], answer: "12" },
            { type: "choice", q: "Listen. Which number do you hear?", say: "five", hide: true, options: ["5", "9", "4"], answer: "5" },
            which("How many apples?  🍎🍎🍎", ["three", "two", "four"]), which("How many stars?  ⭐⭐⭐⭐⭐⭐", ["six", "five", "seven"]), which("What is 2 + 2?", ["four", "two", "five"]),
            match("Match each number word to its number.", [["one", "1"], ["seven", "7"], ["nine", "9"], ["eleven", "11"]]),
            which("Which number comes after six?", ["seven", "five", "eight"]), hearWord("ten", ["ten", "two", "nine"]), which("How many fingers are on one hand?", ["five", "ten", "four"])] },

        { id: "wd-1-3", title: "Animals", goal: "Learn the names of animals.",
          learn: L("Animals", "Listen to each animal name.",
            [card("cat", "🐱"), card("dog", "🐶"), card("bird", "🐦"), card("fish", "🐟"), card("lion", "🦁"), card("elephant", "🐘"), card("camel", "🐫"), card("horse", "🐴"), card("monkey", "🐒"), card("rabbit", "🐰")]),
          items: [hearPic("monkey", "monkey", [pic("monkey", "🐒"), pic("lion", "🦁"), pic("dog", "🐶")]), hearPic("horse", "horse", [pic("horse", "🐴"), pic("camel", "🐫"), pic("rabbit", "🐰")]),
            hearPic("bird", "bird", [pic("bird", "🐦"), pic("fish", "🐟"), pic("cat", "🐱")]),
            picWord("🐘", "an animal", ["elephant", "camel", "lion"]), picWord("🐰", "an animal", ["rabbit", "cat", "monkey"]), picWord("🐫", "an animal", ["camel", "horse", "dog"]),
            match("Match each word to its picture.", [["lion", pic("lion", "🦁")], ["fish", pic("fish", "🐟")], ["dog", pic("dog", "🐶")], ["cat", pic("cat", "🐱")]]),
            which("Which animal can fly?", ["bird", "fish", "camel"]), which("Which animal lives in water?", ["fish", "horse", "lion"]), which("Which animal lives in the desert?", ["camel", "fish", "monkey"])] },

        { id: "wd-1-4", title: "Classroom Objects", goal: "Learn the names of things in your classroom.",
          learn: L("In the classroom", "Point to the real thing in your classroom when you hear the word.",
            [card("book", "📖"), card("pencil", "✏️"), card("pen", "🖊️"), card("ruler", "📏"), card("scissors", "✂️"), card("school bag", "🎒"), card("computer", "💻"), card("clock", "⏰"), card("paper", "📄"), card("crayon", "🖍️")]),
          items: [hearPic("ruler", "ruler", [pic("ruler", "📏"), pic("pencil", "✏️"), pic("book", "📖")]), hearPic("crayon", "crayon", [pic("crayon", "🖍️"), pic("pen", "🖊️"), pic("scissors", "✂️")]),
            hearPic("clock", "clock", [pic("clock", "⏰"), pic("computer", "💻"), pic("paper", "📄")]),
            picWord("✂️", "a classroom object", ["scissors", "ruler", "pen"]), picWord("🎒", "a classroom object", ["school bag", "book", "computer"]), picWord("📄", "a classroom object", ["paper", "book", "clock"]),
            match("Match each word to its picture.", [["pencil", pic("pencil", "✏️")], ["book", pic("book", "📖")], ["computer", pic("computer", "💻")], ["pen", pic("pen", "🖊️")]]),
            which("What do you use to cut paper?", ["scissors", "a ruler", "a crayon"]), which("What tells you the time?", ["a clock", "a book", "a pen"]), which("What do you use to draw a straight line?", ["a ruler", "scissors", "paper"])] },

        { id: "wd-1-5", title: "Common Objects and Toys", goal: "Learn words for toys and things at home.",
          learn: L("Toys and things", "Listen to each word. Which toys do you have at home?",
            [card("ball", "⚽"), card("kite", "🪁"), card("teddy bear", "🧸"), card("car", "🚗"), card("balloon", "🎈"), card("robot", "🤖"), card("puzzle", "🧩"), card("umbrella", "☂️"), card("key", "🔑"), card("drum", "🥁")]),
          items: [hearPic("balloon", "balloon", [pic("balloon", "🎈"), pic("ball", "⚽"), pic("kite", "🪁")]), hearPic("robot", "robot", [pic("robot", "🤖"), pic("teddy bear", "🧸"), pic("car", "🚗")]),
            hearPic("key", "key", [pic("key", "🔑"), pic("drum", "🥁"), pic("umbrella", "☂️")]),
            picWord("🧩", "a toy", ["puzzle", "robot", "ball"]), picWord("☂️", "an object", ["umbrella", "kite", "key"]), picWord("🥁", "a toy", ["drum", "ball", "car"]),
            match("Match each word to its picture.", [["kite", pic("kite", "🪁")], ["teddy bear", pic("teddy bear", "🧸")], ["car", pic("car", "🚗")], ["ball", pic("ball", "⚽")]]),
            which("What do you use when it rains?", ["an umbrella", "a kite", "a drum"]), which("What do you use to open a door?", ["a key", "a balloon", "a puzzle"]), which("Which toy flies in the wind?", ["a kite", "a teddy bear", "a drum"])] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "wd-2-1", title: "Family", goal: "Learn words for people in your family.",
          learn: L("My family", "Listen to each family word.",
            [card("mother", "👩", "mom"), card("father", "👨", "dad"), card("sister", "👧"), card("brother", "👦"), card("grandmother", "👵", "your mother's or father's mother"), card("grandfather", "👴", "your mother's or father's father"),
             card("baby", "👶"), card("aunt", null, "your mother's or father's sister"), card("uncle", null, "your mother's or father's brother"), card("cousin", null, "your aunt's or uncle's child")]),
          items: [hearPic("grandmother", "grandmother", [pic("grandmother", "👵"), pic("mother", "👩"), pic("sister", "👧")]), hearPic("baby", "baby", [pic("baby", "👶"), pic("brother", "👦"), pic("grandfather", "👴")]),
            picWord("👴", "a family member", ["grandfather", "father", "brother"]), picWord("👧", "a family member", ["sister", "mother", "aunt"]),
            which("Your father's brother is your…", ["uncle", "cousin", "grandfather"]), which("Your mother's sister is your…", ["aunt", "grandmother", "sister"]), which("Your uncle's son is your…", ["cousin", "brother", "father"]),
            which("Your father's mother is your…", ["grandmother", "aunt", "sister"]),
            match("Match the pairs.", [["mother", "father"], ["sister", "brother"], ["aunt", "uncle"], ["grandmother", "grandfather"]]),
            hearWord("cousin", ["cousin", "uncle", "aunt"])] },

        { id: "wd-2-2", title: "Food and Drinks", goal: "Learn words for food and drinks.",
          learn: L("Food and drinks", "Listen to each word. Which ones do you like?",
            [card("bread", "🍞"), card("rice", "🍚"), card("milk", "🥛"), card("water", "💧"), card("juice", "🧃"), card("egg", "🥚"), card("cheese", "🧀"), card("chicken", "🍗"), card("orange", "🍊"), card("carrot", "🥕")]),
          items: [hearPic("cheese", "cheese", [pic("cheese", "🧀"), pic("bread", "🍞"), pic("egg", "🥚")]), hearPic("carrot", "carrot", [pic("carrot", "🥕"), pic("orange", "🍊"), pic("chicken", "🍗")]),
            hearPic("milk", "milk", [pic("milk", "🥛"), pic("juice", "🧃"), pic("rice", "🍚")]),
            picWord("🍚", "food", ["rice", "bread", "milk"]), picWord("🍊", "food", ["orange", "carrot", "cheese"]),
            which("Which one is a drink?", ["juice", "bread", "chicken"]), which("Which one is a vegetable?", ["carrot", "orange", "egg"]), which("Which one is a fruit?", ["orange", "rice", "cheese"]),
            odd(["milk", "water", "juice", "bread"], "bread", "milk, water and juice are drinks. <strong>bread</strong> is food."),
            match("Match each word to its picture.", [["egg", pic("egg", "🥚")], ["chicken", pic("chicken", "🍗")], ["bread", pic("bread", "🍞")], ["water", pic("water", "💧")]])] },

        { id: "wd-2-3", title: "Clothes", goal: "Learn words for clothes.",
          learn: L("Clothes", "Listen to each word. What are you wearing today?",
            [card("shirt", "👕"), card("dress", "👗"), card("shoes", "👟"), card("socks", "🧦"), card("cap", "🧢"), card("coat", "🧥"), card("scarf", "🧣"), card("gloves", "🧤"), card("jeans", "👖"), card("glasses", "👓")]),
          items: [hearPic("socks", "socks", [pic("socks", "🧦"), pic("shoes", "👟"), pic("gloves", "🧤")]), hearPic("scarf", "scarf", [pic("scarf", "🧣"), pic("coat", "🧥"), pic("cap", "🧢")]),
            hearPic("glasses", "glasses", [pic("glasses", "👓"), pic("gloves", "🧤"), pic("jeans", "👖")]),
            picWord("👗", "clothes", ["dress", "shirt", "coat"]), picWord("🧤", "clothes", ["gloves", "socks", "shoes"]),
            which("What do you wear on your feet?", ["shoes", "a cap", "gloves"]), which("What do you wear on your hands when it is cold?", ["gloves", "socks", "glasses"]), which("What do you wear on your head?", ["a cap", "a scarf", "jeans"]),
            which("What helps you see better?", ["glasses", "a coat", "a dress"]),
            match("Match each word to its picture.", [["shirt", pic("shirt", "👕")], ["coat", pic("coat", "🧥")], ["jeans", pic("jeans", "👖")], ["cap", pic("cap", "🧢")]])] },

        { id: "wd-2-4", title: "Body Parts", goal: "Learn words for parts of the body.",
          learn: L("My body", "Touch each part of your body when you hear the word.",
            [card("eye", "👁️"), card("ear", "👂"), card("nose", "👃"), card("mouth", "👄"), card("hand", "✋"), card("foot", "🦶"), card("leg", "🦵"), card("arm", "💪"), card("tooth", "🦷"), card("head")]),
          items: [hearPic("ear", "ear", [pic("ear", "👂"), pic("eye", "👁️"), pic("nose", "👃")]), hearPic("foot", "foot", [pic("foot", "🦶"), pic("hand", "✋"), pic("leg", "🦵")]),
            hearPic("tooth", "tooth", [pic("tooth", "🦷"), pic("mouth", "👄"), pic("ear", "👂")]),
            picWord("👃", "a body part", ["nose", "mouth", "eye"]), picWord("✋", "a body part", ["hand", "foot", "arm"]),
            which("You see with your…", ["eyes", "ears", "feet"]), which("You hear with your…", ["ears", "nose", "hands"]), which("You smell with your…", ["nose", "mouth", "legs"]),
            which("You walk with your…", ["legs and feet", "arms and hands", "eyes and ears"]),
            match("Match each word to its picture.", [["mouth", pic("mouth", "👄")], ["arm", pic("arm", "💪")], ["leg", pic("leg", "🦵")], ["eye", pic("eye", "👁️")]])] },

        { id: "wd-2-5", title: "Rooms and Home Objects", goal: "Learn words for rooms and things at home.",
          learn: L("At home", "Listen to the names of rooms and things in a house.",
            [card("kitchen", null, "where we cook food"), card("bedroom", null, "where we sleep"), card("bathroom", null, "where we wash"), card("living room", null, "where the family sits together"),
             card("bed", "🛏️"), card("sofa", "🛋️"), card("door", "🚪"), card("window", "🪟"), card("chair", "🪑"), card("lamp", null, "it gives us light")]),
          items: [hearPic("sofa", "sofa", [pic("sofa", "🛋️"), pic("bed", "🛏️"), pic("chair", "🪑")]), hearPic("window", "window", [pic("window", "🪟"), pic("door", "🚪"), pic("bed", "🛏️")]),
            picWord("🚪", "a home object", ["door", "window", "sofa"]),
            which("Where do you cook food?", ["in the kitchen", "in the bedroom", "in the bathroom"]), which("Where do you sleep?", ["in the bedroom", "in the kitchen", "in the living room"]),
            which("Where do you brush your teeth?", ["in the bathroom", "in the living room", "in the kitchen"]), which("What gives light in a room?", ["a lamp", "a sofa", "a door"]),
            which("Where is a bed usually?", ["in the bedroom", "in the kitchen", "in the garden"]),
            odd(["kitchen", "bedroom", "bathroom", "sofa"], "sofa", "kitchen, bedroom and bathroom are rooms. A <strong>sofa</strong> is furniture."),
            match("Match each thing to its room.", [["bed", "bedroom"], ["oven", "kitchen"], ["shower", "bathroom"], ["sofa", "living room"]])] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "wd-3-1", title: "Daily Routines", goal: "Learn phrases for things you do every day.",
          learn: L("My day", "These phrases describe things we do every day.",
            [card("wake up", "⏰", "stop sleeping", "I wake up at six."), card("brush my teeth", "🪥", null, "I brush my teeth twice a day."), card("get dressed", "👕", "put on clothes", "I get dressed for school."), card("eat breakfast", "🥣", "the first meal of the day", "I eat breakfast with my family."),
             card("go to school", "🏫", null, "I go to school by bus."), card("do homework", "📝", "school work at home", "I do my homework after lunch."), card("take a shower", "🚿", null, "I take a shower every evening."), card("go to bed", "🛏️", null, "I go to bed at nine.")]),
          items: [hearPic("brush my teeth", "brush my teeth", [pic("brush my teeth", "🪥"), pic("take a shower", "🚿"), pic("eat breakfast", "🥣")]), hearPic("do homework", "do homework", [pic("do homework", "📝"), pic("go to bed", "🛏️"), pic("wake up", "⏰")]),
            picWord("⏰", "a routine", ["wake up", "go to bed", "get dressed"]),
            fill("In the morning, I ___ my school uniform on.", ["put", "eat", "brush"]), fill("I eat ___ in the morning.", ["breakfast", "dinner", "homework"]), fill("At night, I go to ___.", ["bed", "school", "breakfast"]),
            which("Which comes first in the morning?", ["wake up", "go to school", "do homework"]), which("What does \"get dressed\" mean?", ["put on clothes", "eat food", "go to sleep"]),
            match("Match each action to the picture.", [["take a shower", pic("take a shower", "🚿")], ["eat breakfast", pic("eat breakfast", "🥣")], ["go to school", pic("go to school", "🏫")], ["go to bed", pic("go to bed", "🛏️")]]),
            { type: "words", q: "Put the day in order. Tap the words.", answer: "wake breakfast school homework bed" }] },

        { id: "wd-3-2", title: "Action Verbs", goal: "Learn words for actions.",
          learn: L("Doing words", "These words tell us what someone is doing. Act them out!",
            [card("run", "🏃", null, "I run in the playground."), card("jump", null, "push off the ground with your legs", "Frogs can jump high."), card("swim", "🏊", null, "Fish swim in the sea."), card("read", "📖", null, "I read a story every night."),
             card("write", "✍️", null, "I write my name."), card("climb", "🧗", "go up using hands and feet", "Monkeys climb trees."), card("ride", "🚴", null, "I ride my bike."), card("cook", "🍳", "make food", "Dad cooks dinner."), card("throw", null, "send through the air with your hand", "Throw the ball to me."), card("catch", null, "take something that is moving through the air", "Can you catch the ball?")]),
          items: [hearPic("swim", "swim", [pic("swim", "🏊"), pic("run", "🏃"), pic("ride", "🚴")]), hearPic("climb", "climb", [pic("climb", "🧗"), pic("cook", "🍳"), pic("write", "✍️")]),
            picWord("🚴", "an action", ["ride", "run", "swim"]), picWord("✍️", "an action", ["write", "read", "cook"]),
            fill("Birds can ___ in the sky.", ["fly", "swim", "cook"]), fill("Please ___ the ball to me.", ["throw", "read", "sleep"]), fill("Mom ___ rice in the kitchen.", ["cooks", "climbs", "jumps"]),
            fill("I ___ a book before bed.", ["read", "ride", "run"]), odd(["run", "jump", "swim", "happy"], "happy", "run, jump and swim are actions. <strong>happy</strong> is a feeling."),
            match("Match the action to the picture.", [["run", pic("run", "🏃")], ["read", pic("read", "📖")], ["cook", pic("cook", "🍳")], ["swim", pic("swim", "🏊")]])] },

        { id: "wd-3-3", title: "Places in Town", goal: "Learn the names of places in a town.",
          learn: L("Around town", "Listen to the names of places. What can you do there?",
            [card("hospital", "🏥", "where doctors help sick people"), card("school", "🏫", "where children learn"), card("bank", "🏦", "where people keep money"), card("mosque", "🕌", "where Muslims pray"),
             card("supermarket", "🛒", "a big shop for food and other things"), card("library", null, "where you can borrow books"), card("restaurant", null, "where you buy and eat meals"), card("park", "🌳", "a green place to play and walk"), card("airport", "✈️", "where planes take off and land"), card("post office", "🏤", "where you send letters")]),
          items: [hearPic("hospital", "hospital", [pic("hospital", "🏥"), pic("bank", "🏦"), pic("school", "🏫")]), hearPic("mosque", "mosque", [pic("mosque", "🕌"), pic("post office", "🏤"), pic("hospital", "🏥")]),
            which("Where do you borrow books?", ["the library", "the bank", "the airport"]), which("Where do you go when you are very sick?", ["the hospital", "the park", "the restaurant"]),
            which("Where do you buy food for your home?", ["the supermarket", "the post office", "the mosque"]), which("Where do planes take off?", ["the airport", "the hospital", "the library"]),
            fill("We had dinner at a nice ___.", ["restaurant", "bank", "airport"]), fill("Dad keeps his money in the ___.", ["bank", "park", "library"]),
            match("Match each place to what people do there.", [["school", "learn"], ["park", "play"], ["post office", "send letters"], ["mosque", "pray"]]),
            mean("library", ["a place where you can borrow books", "a place where you buy food", "a place where planes land"])] },

        { id: "wd-3-4", title: "Weather and Seasons", goal: "Learn weather words and the four seasons.",
          learn: L("Weather and seasons", "Listen to the weather words. What is the weather like today?",
            [card("sunny", "☀️", null, "It is sunny and hot."), card("rainy", "🌧️", null, "Take an umbrella. It's rainy."), card("cloudy", "☁️", null, "The sky is gray and cloudy."), card("windy", "🌬️", null, "It's windy. My hat flew away!"),
             card("snowy", "❄️", null, "It is snowy in the mountains."), card("stormy", "⛈️", "with strong wind, rain and thunder"), card("summer", null, "the hottest season"), card("winter", null, "the coldest season"), card("spring", null, "the season after winter, when flowers grow"), card("autumn", null, "the season after summer, when leaves fall")]),
          items: [hearPic("cloudy", "cloudy", [pic("cloudy", "☁️"), pic("sunny", "☀️"), pic("snowy", "❄️")]), hearPic("stormy", "stormy", [pic("stormy", "⛈️"), pic("rainy", "🌧️"), pic("windy", "🌬️")]),
            picWord("🌧️", "weather", ["rainy", "sunny", "snowy"]), picWord("☀️", "weather", ["sunny", "cloudy", "windy"]),
            which("Which is the hottest season?", ["summer", "winter", "autumn"]), which("In which season do leaves fall from trees?", ["autumn", "spring", "summer"]),
            fill("It's ___ today. Let's fly a kite!", ["windy", "snowy", "stormy"]), fill("It's ___, so wear your coat and gloves.", ["cold", "hot", "sunny"]),
            match("Match the weather to what you need.", [["rainy", "umbrella"], ["sunny", "sunglasses"], ["snowy", "warm coat"], ["windy", "kite"]]),
            odd(["summer", "winter", "spring", "cloudy"], "cloudy", "summer, winter and spring are seasons. <strong>cloudy</strong> is weather.")] },

        { id: "wd-3-5", title: "Hobbies and Games", goal: "Learn words for hobbies and games.",
          learn: L("Free time", "A <strong>hobby</strong> is something you enjoy doing in your free time.",
            [card("football", "⚽"), card("basketball", "🏀"), card("swimming", "🏊"), card("reading", "📚"), card("chess", "♟️"), card("cycling", "🚴"), card("fishing", "🎣"), card("camping", "⛺"), card("painting", "🎨"), card("gardening", null, "growing plants and flowers")]),
          items: [hearPic("chess", "chess", [pic("chess", "♟️"), pic("football", "⚽"), pic("painting", "🎨")]), hearPic("camping", "camping", [pic("camping", "⛺"), pic("fishing", "🎣"), pic("cycling", "🚴")]),
            picWord("🏀", "a game", ["basketball", "football", "chess"]), picWord("🎣", "a hobby", ["fishing", "swimming", "camping"]),
            which("Which hobby needs a book?", ["reading", "cycling", "fishing"]), which("Which hobby needs a bike?", ["cycling", "chess", "painting"]),
            fill("I like ___. I grow tomatoes and flowers.", ["gardening", "swimming", "chess"]), fill("We sleep in a tent when we go ___.", ["camping", "reading", "painting"]),
            mean("hobby", ["something you enjoy doing in your free time", "a kind of food", "a school subject"]),
            match("Match each hobby to the picture.", [["swimming", pic("swimming", "🏊")], ["painting", pic("painting", "🎨")], ["reading", pic("reading", "📚")], ["football", pic("football", "⚽")]])] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "wd-4-1", title: "Feelings and Emotions", goal: "Learn words to describe how people feel.",
          learn: L("How do you feel?", "Feelings words help us tell others how we feel.",
            [card("happy", "😀", null, "I'm happy when I play with friends."), card("sad", "😢", null, "He is sad because he lost his toy."), card("angry", "😠", null, "She was angry when her brother broke her pencil."), card("scared", "😨", "afraid", "I am scared of the dark."),
             card("tired", "😴", "needing rest or sleep", "I am tired after football."), card("surprised", "😮", "feeling something you did not expect", "I was surprised by the party."), card("excited", "🤩", "very happy about something that will happen", "I'm excited about the trip!"),
             card("worried", null, "thinking something bad may happen", "Mom is worried because I am late."), card("proud", null, "happy about something good you did", "I'm proud of my drawing."), card("bored", null, "not interested; nothing to do", "I'm bored. Let's play a game.")]),
          items: [picWord("😢", "a face", ["sad", "happy", "angry"]), picWord("😴", "a face", ["tired", "surprised", "excited"]),
            which("Lina won a prize for her story. How does she feel?", ["proud", "bored", "scared"]), which("Omar hears a loud noise in the dark. How does he feel?", ["scared", "proud", "bored"]),
            which("Tomorrow is the school trip! How do the children feel?", ["excited", "angry", "tired"]), which("Sami has nothing to do on a rainy day. How does he feel?", ["bored", "proud", "surprised"]),
            which("Dad is late and not answering the phone. How does Mom feel?", ["worried", "excited", "proud"]),
            mean("surprised", ["feeling something you did not expect", "needing sleep", "very angry"]),
            match("Match the opposite feelings.", [["happy", "sad"], ["excited", "bored"], ["calm", "angry"], ["brave", "scared"]]),
            hearWord("worried", ["worried", "tired", "excited"])] },

        { id: "wd-4-2", title: "Jobs and Occupations", goal: "Learn the names of jobs and what people do.",
          learn: L("Jobs", "An <strong>occupation</strong> is a job. Listen to each job and what that person does.",
            [card("doctor", null, "helps sick people get better"), card("teacher", null, "helps students learn"), card("pilot", "✈️", "flies a plane"), card("farmer", "🚜", "grows food and looks after animals"), card("chef", "🍳", "cooks food in a restaurant"),
             card("firefighter", "🚒", "puts out fires"), card("police officer", "🚓", "keeps people safe"), card("dentist", "🦷", "looks after teeth"), card("engineer", null, "designs and builds things"), card("mechanic", "🔧", "fixes cars")]),
          items: [which("Who flies a plane?", ["a pilot", "a farmer", "a dentist"]), which("Who looks after your teeth?", ["a dentist", "a chef", "a mechanic"]), which("Who fixes cars?", ["a mechanic", "a teacher", "a pilot"]),
            which("Who puts out fires?", ["a firefighter", "a doctor", "an engineer"]), which("Who grows vegetables and keeps animals?", ["a farmer", "a police officer", "a chef"]),
            fill("The ___ cooked a delicious meal in the restaurant.", ["chef", "pilot", "dentist"]), fill("The ___ helped me feel better when I was sick.", ["doctor", "mechanic", "farmer"]),
            fill("An ___ designed this new bridge.", ["engineer", "teacher", "chef"]),
            match("Match each job to its place of work.", [["teacher", "school"], ["doctor", "hospital"], ["pilot", "airport"], ["farmer", "farm"]]),
            mean("occupation", ["a job", "a hobby", "a holiday"])] },

        { id: "wd-4-3", title: "Transportation", goal: "Learn words for ways to travel.",
          learn: L("Getting around", "<strong>Transportation</strong> means ways of moving people and things from place to place.",
            [card("car", "🚗"), card("bus", "🚌"), card("train", "🚆"), card("plane", "✈️"), card("ship", "🚢"), card("bicycle", "🚲"), card("motorbike", "🏍️"), card("helicopter", "🚁"), card("taxi", "🚕"), card("truck", "🚚")]),
          items: [hearPic("helicopter", "helicopter", [pic("helicopter", "🚁"), pic("plane", "✈️"), pic("ship", "🚢")]), hearPic("truck", "truck", [pic("truck", "🚚"), pic("bus", "🚌"), pic("taxi", "🚕")]),
            picWord("🚲", "transportation", ["bicycle", "motorbike", "car"]), picWord("🚆", "transportation", ["train", "bus", "truck"]),
            which("Which one travels on water?", ["a ship", "a train", "a taxi"]), which("Which one flies?", ["a plane", "a bicycle", "a bus"]), which("Which one has no engine?", ["a bicycle", "a motorbike", "a truck"]),
            fill("We paid the driver at the end of our ___ ride.", ["taxi", "bicycle", "ship"]),
            match("Match each one to where it travels.", [["ship", "on the sea"], ["plane", "in the sky"], ["train", "on rails"], ["car", "on the road"]]),
            mean("transportation", ["ways of moving people and things", "kinds of food", "places in a town"])] },

        { id: "wd-4-4", title: "Nature and the Environment", goal: "Learn words about the natural world.",
          learn: L("Our world", "The <strong>environment</strong> is the natural world around us: land, water, air, plants and animals.",
            [card("mountain", "⛰️", "a very high hill"), card("river", null, "water that flows across the land to the sea"), card("desert", "🏜️", "a very dry place with little rain"), card("forest", "🌲", "a large area full of trees"), card("ocean", "🌊", "a very big sea"),
             card("island", "🏝️", "land with water all around it"), card("volcano", "🌋", "a mountain that can send out hot melted rock"), card("valley", null, "low land between hills or mountains"), card("pollution", null, "dirt or harmful things in the air, water or land"), card("environment", null, "the natural world around us")]),
          items: [hearPic("volcano", "volcano", [pic("volcano", "🌋"), pic("mountain", "⛰️"), pic("island", "🏝️")]), picWord("🏝️", "nature", ["island", "desert", "forest"]), picWord("🌲", "nature", ["forest", "valley", "ocean"]),
            mean("island", ["land with water all around it", "a very dry place", "a very high hill"]), mean("pollution", ["dirt or harmful things in the air, water or land", "a big group of trees", "a kind of mountain"]),
            fill("Camels live in the ___.", ["desert", "ocean", "forest"]), fill("The ___ flows from the mountains to the sea.", ["river", "desert", "island"]), fill("Whales and dolphins live in the ___.", ["ocean", "valley", "volcano"]),
            which("What can we do to reduce pollution?", ["walk or ride a bike instead of driving", "throw rubbish in the river", "leave the lights on"]),
            match("Match each word to its meaning.", [["mountain", "a very high hill"], ["valley", "low land between hills"], ["forest", "lots of trees"], ["desert", "a very dry place"]])] },

        { id: "wd-4-5", title: "Describing People and Places", goal: "Learn adjectives to describe people and places.",
          learn: L("Describing words", "<strong>Adjectives</strong> describe people and places.",
            [card("tall", null, "high from top to bottom", "My brother is very tall."), card("short", null, "not tall", "My little sister is short."), card("young", null, "not old", "The baby is very young."), card("old", null, "has lived for a long time", "Our house is old."),
             card("curly", null, "with lots of curves", "She has curly hair."), card("crowded", null, "full of people", "The market is crowded on Friday."), card("quiet", null, "with little or no noise", "The library is quiet."), card("noisy", null, "very loud", "The playground is noisy."), card("modern", null, "new and up to date", "Riyadh has many modern buildings."), card("beautiful", null, "very nice to look at", "What a beautiful garden!")]),
          items: [which("The opposite of \"tall\" is…", ["short", "old", "quiet"]), which("The opposite of \"noisy\" is…", ["quiet", "crowded", "modern"]), which("The opposite of \"young\" is…", ["old", "short", "curly"]),
            fill("The library is very ___. Everyone is reading silently.", ["quiet", "noisy", "crowded"]), fill("There were so many people. The shop was very ___.", ["crowded", "quiet", "curly"]),
            fill("This new building is very ___.", ["modern", "old", "short"]), mean("crowded", ["full of people", "very quiet", "very old"]),
            which("Which word describes hair?", ["curly", "crowded", "noisy"]),
            match("Match the opposites.", [["old", "modern"], ["tall", "short"], ["noisy", "quiet"], ["empty", "crowded"]]),
            hearWord("beautiful", ["beautiful", "bored", "busy"])] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "wd-5-1", title: "Descriptive Vocabulary", goal: "Use strong, interesting describing words.",
          learn: L("Wow words", "Strong describing words make your speaking and writing more interesting. Instead of <em>very big</em>, say <strong>enormous</strong>!",
            [card("enormous", null, "very, very big", "An elephant is enormous."), card("tiny", null, "very, very small", "An ant is tiny."), card("delicious", null, "tastes very good", "This kabsa is delicious!"), card("ancient", null, "very, very old", "We visited ancient tombs in AlUla."),
             card("brilliant", null, "very clever, or very bright", "That's a brilliant idea!"), card("fierce", null, "strong and frightening", "The lion gave a fierce roar."), card("gentle", null, "kind and soft", "Be gentle with the baby kitten."), card("freezing", null, "very, very cold", "The water was freezing!"),
             card("exhausted", null, "very, very tired", "I was exhausted after the race."), card("furious", null, "very, very angry", "He was furious when someone broke his bike.")]),
          items: [mean("enormous", ["very big", "very small", "very old"]), mean("ancient", ["very old", "very new", "very cold"]), mean("exhausted", ["very tired", "very happy", "very hungry"]),
            fill("The mouse was ___. It could hide in my shoe.", ["tiny", "enormous", "fierce"]), fill("Mmm! This cake is ___!", ["delicious", "furious", "freezing"]),
            fill("Please be ___ when you hold the baby bird.", ["gentle", "fierce", "ancient"]), fill("It was ___ outside, so we wore our warmest coats.", ["freezing", "delicious", "brilliant"]),
            which("Which word is a stronger way to say \"very angry\"?", ["furious", "gentle", "tiny"]),
            match("Match each strong word to its meaning.", [["brilliant", "very clever"], ["fierce", "strong and frightening"], ["furious", "very angry"], ["tiny", "very small"]]),
            hearWord("delicious", ["delicious", "difficult", "dangerous"])] },

        { id: "wd-5-2", title: "Synonyms", goal: "Find words with the same or similar meaning.",
          learn: L("Synonyms", "<strong>Synonyms</strong> are words that mean the same, or almost the same.",
            [card("big · large", null, "same meaning"), card("small · little", null, "same meaning"), card("happy · glad", null, "same meaning"), card("fast · quick", null, "same meaning"),
             card("begin · start", null, "same meaning"), card("end · finish", null, "same meaning"), card("shout · yell", null, "same meaning"), card("clever · smart", null, "same meaning")],
            "Using synonyms helps you not to repeat the same word again and again."),
          items: [which("Which word is a synonym for \"big\"?", ["large", "tiny", "short"]), which("Which word is a synonym for \"fast\"?", ["quick", "slow", "late"]), which("Which word is a synonym for \"begin\"?", ["start", "finish", "stop"]),
            which("Which word is a synonym for \"glad\"?", ["happy", "sad", "angry"]), which("Which word is a synonym for \"shout\"?", ["yell", "whisper", "listen"]),
            fill("Please ___ your work before the bell. (= finish)", ["complete", "begin", "forget"], "<strong>complete</strong> means finish."),
            fill("Saad is very ___. He solves hard puzzles. (= smart)", ["clever", "lazy", "noisy"]),
            match("Match the synonyms.", [["small", "little"], ["end", "finish"], ["clever", "smart"], ["shout", "yell"]]),
            which("Which pair are synonyms?", ["big – large", "big – small", "fast – slow"]), which("Which word means the same as \"look at\"?", ["watch", "hear", "touch"])] },

        { id: "wd-5-3", title: "Antonyms", goal: "Find words with opposite meanings.",
          learn: L("Antonyms", "<strong>Antonyms</strong> are words with opposite meanings.",
            [card("hot ↔ cold"), card("open ↔ close"), card("early ↔ late"), card("heavy ↔ light"), card("empty ↔ full"), card("ancient ↔ modern"), card("brave ↔ afraid"), card("arrive ↔ leave")]),
          items: [which("What is the antonym of \"early\"?", ["late", "quick", "first"]), which("What is the antonym of \"heavy\"?", ["light", "big", "strong"]), which("What is the antonym of \"empty\"?", ["full", "open", "clean"]),
            which("What is the antonym of \"arrive\"?", ["leave", "come", "stay"]), which("What is the antonym of \"ancient\"?", ["modern", "old", "huge"]),
            fill("The glass was full, but now it is ___.", ["empty", "heavy", "late"]), fill("The shop opens at eight and ___ at ten.", ["closes", "starts", "arrives"]),
            match("Match the antonyms.", [["hot", "cold"], ["brave", "afraid"], ["open", "close"], ["win", "lose"]]),
            which("Which pair are antonyms?", ["noisy – quiet", "big – large", "happy – glad"]), which("Which sentence uses an antonym of \"strong\"?", ["The little kitten was weak.", "The man was powerful.", "The wind was fierce."])] },

        { id: "wd-5-4", title: "Words in Context", goal: "Use the sentence to understand what a word means.",
          learn: L("Clues in the sentence", "Some words have more than one meaning. Read the <strong>whole sentence</strong> to find the right meaning.",
            [card("bat", null, "1. an animal that flies at night  ·  2. a stick for hitting a ball"), card("light", null, "1. not heavy  ·  2. what helps us see"), card("watch", null, "1. look at something  ·  2. a small clock on your wrist"), card("ring", null, "1. jewelry for your finger  ·  2. the sound a bell makes"), card("kind", null, "1. nice and caring  ·  2. a type of something")],
            "Ask yourself: Which meaning makes sense here?"),
          items: [which("\"The bat flew out of the cave at night.\" Here, bat means…", ["an animal", "a stick for hitting a ball", "a cave"]), which("\"This box is light. I can carry it.\" Here, light means…", ["not heavy", "bright", "a lamp"]),
            which("\"Grandpa gave me a new watch for my birthday.\" Here, watch means…", ["a small clock you wear", "to look at", "a TV show"]), which("\"Lions are a kind of big cat.\" Here, kind means…", ["a type", "nice and caring", "a game"]),
            which("\"Please turn on the light. It's dark.\" Here, light means…", ["something that helps us see", "not heavy", "a color"]),
            which("\"The hikers were weary after walking for six hours.\" What does weary mean?", ["very tired", "very happy", "very fast"], "Walking for six hours makes you tired."),
            which("\"The desert was so arid that no plants could grow.\" What does arid mean?", ["very dry", "very wet", "very busy"]),
            which("\"Huda was delighted with her gift and smiled all day.\" What does delighted mean?", ["very pleased", "very angry", "very bored"]),
            which("\"The cookies were scrumptious, so I ate three!\" What does scrumptious mean?", ["very tasty", "very hard", "very old"]),
            which("\"Be cautious when you cross the road.\" What does cautious mean?", ["careful", "fast", "noisy"])] },

        { id: "wd-5-5", title: "Everyday Academic Vocabulary", goal: "Learn words you see in school instructions.",
          learn: L("School instruction words", "These words appear in questions and instructions in many subjects. Knowing them helps you understand what to do.",
            [card("compare", null, "find what is the same and what is different"), card("describe", null, "say what something is like"), card("explain", null, "tell how or why"), card("predict", null, "say what you think will happen"),
             card("observe", null, "look carefully"), card("measure", null, "find the size, weight or amount"), card("list", null, "write things one after another"), card("example", null, "one thing that shows what you mean"), card("main idea", null, "what a text is mostly about"), card("detail", null, "a small piece of information")]),
          items: [mean("compare", ["find what is the same and different", "say what will happen", "write a list"]), mean("predict", ["say what you think will happen", "look carefully", "find the size"]),
            which("\"Describe your bedroom.\" What should you do?", ["say what your bedroom is like", "draw a map of the school", "count your toys"]), which("\"Explain why plants need water.\" What should you do?", ["tell why", "tell where", "tell who"]),
            which("\"Measure the table.\" What do you need?", ["a ruler or tape measure", "a pencil sharpener", "a book"]), which("\"List three fruits.\" Which answer is correct?", ["apple, banana, orange", "I like apples.", "Fruit is healthy."]),
            which("Scientists ___ animals carefully to learn about them.", ["observe", "list", "predict"]), which("What is the main idea of a story?", ["what the story is mostly about", "the last word", "the title page"]),
            match("Match each word to its meaning.", [["observe", "look carefully"], ["explain", "tell how or why"], ["detail", "a small piece of information"], ["example", "one thing that shows what you mean"]]),
            hearWord("describe", ["describe", "decide", "deliver"])] }
      ] }
    ]
  });
})();
