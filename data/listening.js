/* =====================================================================
   TNS English Explorers — LISTENING ISLAND (25 activity sets)
   Levels 1–2: one short recording per question (item.say).
   Levels 3–5: one longer recording per set (set.clip), saved as
   audio/listening/<id>.mp3, with a different voice for each speaker.
   The transcript is shown ONLY after the activity is finished.
   ===================================================================== */
(function () {
  "use strict";
  function pic(t, vis) { return { t: t, vis: vis, alt: t, hideLabel: true }; }
  function look(sayText, answer, opts, voice) { return { type: "choice", q: "Listen. Choose the right picture.", say: sayText, hide: true, voice: voice, options: opts, answer: answer }; }
  function lc(q, sayText, opts, voice, explain) { return { type: "choice", q: q, say: sayText, hide: true, voice: voice, options: opts, answer: opts[0], explain: explain }; }
  function q(question, opts, explain) { return { type: "choice", q: question, options: opts, answer: opts[0], explain: explain }; }
  function tf(statement, isTrue, explain) { return { type: "choice", q: "True or false?", text: "<p class=\"say-big\">" + statement + "</p>", options: ["True", "False"], answer: isTrue ? "True" : "False", fixed: true, explain: explain }; }
  /* Two speakers of the same gender get different voices (f/f2, m/m2). */
  function clip(intro, words, lines) {
    var seen = { f: [], m: [] };
    lines = lines.map(function (l) { var o = { sp: l[0], voice: l[1], t: l[2] }; var list = seen[o.voice]; if (list.indexOf(o.sp) < 0) list.push(o.sp); if (list.indexOf(o.sp) === 1) o.voice += "2"; return o; });
    return { intro: intro, words: words, lines: lines };
  }
  function S(id, title, goal, c, items) { return { id: id, title: title, goal: goal, clip: c, items: items }; }

  TNS.register("listening", {
    intro: "Listen carefully and show what you understand. You can listen again as many times as you need.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "li-1-1", title: "Numbers and Colors", goal: "Listen for numbers and colors.",
          learn: [{ title: "Listen first", text: "Tap <strong>Listen</strong>. Then tap the right answer. You can listen again." }],
          items: [lc("Listen. Which number do you hear?", "seven", ["7", "1", "9"]), lc("Listen. Which number do you hear?", "four", ["4", "5", "14"]),
            look("blue", "blue", [pic("blue", "svg:color-blue"), pic("green", "svg:color-green"), pic("purple", "svg:color-purple")]),
            look("orange", "orange", [pic("orange", "svg:color-orange"), pic("yellow", "svg:color-yellow"), pic("red", "svg:color-red")]),
            lc("Listen. How many apples?", "I have three apples.", ["3", "2", "13"])] },
        { id: "li-1-2", title: "Animals and Objects", goal: "Listen for the names of animals and things.",
          learn: [{ title: "Listen first", text: "Listen to the word. Find the picture." }],
          items: [look("an elephant", "elephant", [pic("elephant", "🐘"), pic("lion", "🦁"), pic("horse", "🐴")]),
            look("a duck", "duck", [pic("duck", "🦆"), pic("dog", "🐶"), pic("fish", "🐟")]),
            look("a key", "key", [pic("key", "🔑"), pic("cup", "☕"), pic("clock", "⏰")]),
            look("an umbrella", "umbrella", [pic("umbrella", "☂️"), pic("hat", "🎩"), pic("bag", "👜")]),
            look("a camel", "camel", [pic("camel", "🐫"), pic("goat", "🐐"), pic("cow", "🐮")])] },
        { id: "li-1-3", title: "Familiar Classroom Words", goal: "Listen for things in the classroom.",
          learn: [{ title: "Listen first", text: "Listen to the word. Find the classroom object." }],
          items: [look("scissors", "scissors", [pic("scissors", "✂️"), pic("ruler", "📏"), pic("pencil", "✏️")]),
            look("a ruler", "ruler", [pic("ruler", "📏"), pic("book", "📖"), pic("scissors", "✂️")]),
            look("a book", "book", [pic("book", "📖"), pic("bag", "🎒"), pic("pencil", "✏️")]),
            look("a computer", "computer", [pic("computer", "💻"), pic("book", "📖"), pic("clock", "⏰")]),
            look("a school bag", "school bag", [pic("school bag", "🎒"), pic("ruler", "📏"), pic("computer", "💻")])] },
        { id: "li-1-4", title: "Food and Toys", goal: "Listen for food and toy words.",
          learn: [{ title: "Listen first", text: "Is it food or a toy? Listen and find the picture." }],
          items: [look("a banana", "banana", [pic("banana", "🍌"), pic("apple", "🍎"), pic("grapes", "🍇")]),
            look("a teddy bear", "teddy bear", [pic("teddy bear", "🧸"), pic("ball", "⚽"), pic("kite", "🪁")]),
            look("a kite", "kite", [pic("kite", "🪁"), pic("car", "🚗"), pic("ball", "⚽")]),
            look("an egg", "egg", [pic("egg", "🥚"), pic("bread", "🍞"), pic("cheese", "🧀")]),
            look("carrots", "carrots", [pic("carrots", "🥕"), pic("corn", "🌽"), pic("tomatoes", "🍅")])] },
        { id: "li-1-5", title: "Listen and Identify", goal: "Listen to short phrases and find the picture.",
          learn: [{ title: "More words", text: "Now listen to two or three words together." }],
          items: [look("a big red apple", "red apple", [pic("red apple", "🍎"), pic("green apple", "🍏"), pic("banana", "🍌")]),
            look("a cat and a dog", "cat and dog", [{ t: "cat and dog", vis: "🐱🐶", alt: "a cat and a dog", hideLabel: true }, { t: "two cats", vis: "🐱🐱", alt: "two cats", hideLabel: true }, { t: "two dogs", vis: "🐶🐶", alt: "two dogs", hideLabel: true }]),
            lc("Listen. Which one do you hear?", "two green birds", ["two green birds", "two red birds", "three green birds"]),
            look("the moon and stars", "moon and stars", [pic("moon and stars", "🌙"), pic("sun", "☀️"), pic("rain", "🌧️")]),
            lc("Listen. What color is the car?", "I have a little yellow car.", ["yellow", "little", "red"])] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "li-2-1", title: "Classroom Instructions", goal: "Understand what the teacher asks you to do.",
          learn: [{ title: "Teacher talk", text: "Teachers give instructions. Listen for the <strong>action word</strong>: open, close, sit, stand, write." }],
          items: [lc("Listen to the teacher. What should you do?", "Please open your books.", ["Open your book.", "Close your book.", "Open the door."]),
            lc("Listen to the teacher. What should you do?", "Stand up, please.", ["Stand up.", "Sit down.", "Line up."]),
            lc("Listen to the teacher. What should you do?", "Write your name on the paper.", ["Write your name.", "Draw a picture.", "Read your name."]),
            lc("Listen to the teacher. What should you do?", "Put your pencils down and look at the board.", ["Look at the board.", "Pick up your pencils.", "Clean the board."]),
            lc("Listen to the teacher. What should you do?", "Work with a partner.", ["Work with a friend.", "Work alone.", "Go home."])] },
        { id: "li-2-2", title: "Greetings and Introductions", goal: "Understand people when they introduce themselves.",
          learn: [{ title: "Meeting people", text: "Listen for the person's <strong>name</strong>, <strong>age</strong> and <strong>where they are from</strong>." }],
          items: [lc("Listen. What is the boy's name?", "Hello! My name is Fahad. I'm seven years old.", ["Fahad", "Faisal", "Fares"], "m"),
            lc("Listen. How old is Fahad?", "Hello! My name is Fahad. I'm seven years old.", ["seven", "six", "eleven"], "m"),
            lc("Listen. Where is Dana from?", "Hi, I'm Dana. I'm from Jeddah. I'm in Grade three.", ["Jeddah", "Riyadh", "Dammam"]),
            lc("Listen. What grade is Dana in?", "Hi, I'm Dana. I'm from Jeddah. I'm in Grade three.", ["Grade 3", "Grade 2", "Grade 5"]),
            lc("Listen. How is the girl today?", "Good morning! I'm very happy today. It's my birthday!", ["happy", "tired", "sad"])] },
        { id: "li-2-3", title: "Family and Friends", goal: "Listen to descriptions of people.",
          learn: [{ title: "Describing people", text: "Listen for family words (<em>grandfather, aunt, cousin</em>) and describing words (<em>tall, short, curly</em>)." }],
          items: [lc("Listen. Who is the speaker talking about?", "This is my grandfather. He has a white beard and he wears glasses.", ["her grandfather", "her father", "her brother"]),
            lc("Listen. What does the grandfather wear?", "This is my grandfather. He has a white beard and he wears glasses.", ["glasses", "a hat", "a watch"]),
            lc("Listen. What does Maha's hair look like?", "My friend Maha has short, curly hair.", ["short and curly", "long and straight", "long and curly"]),
            lc("Listen. How many cousins does the boy have?", "I have five cousins. We play football together every Friday.", ["five", "four", "nine"], "m"),
            lc("Listen. When do they play football?", "I have five cousins. We play football together every Friday.", ["every Friday", "every day", "on Saturday"], "m")] },
        { id: "li-2-4", title: "Simple Directions", goal: "Listen for where things are.",
          learn: [{ title: "Where is it?", text: "Listen for place words: <strong>in, on, under, next to, behind</strong>.",
            examples: [{ t: "in", vis: "svg:ball-in-box" }, { t: "on", vis: "svg:ball-on-box" }, { t: "under", vis: "svg:ball-under-table" }, { t: "next to", vis: "svg:ball-next-to-box" }] }],
          items: [look("The ball is in the box.", "in", [pic("in", "svg:ball-in-box"), pic("on", "svg:ball-on-box"), pic("next to", "svg:ball-next-to-box")]),
            look("The ball is under the table.", "under", [pic("under", "svg:ball-under-table"), pic("on", "svg:ball-on-box"), pic("in", "svg:ball-in-box")]),
            look("The ball is next to the box.", "next to", [pic("next to", "svg:ball-next-to-box"), pic("behind", "svg:ball-behind-box"), pic("in", "svg:ball-in-box")]),
            lc("Listen. Which way should you go?", "Turn left at the door.", ["⬅️ left", "➡️ right", "⬆️ straight"]),
            lc("Listen. Which way should you go?", "Go straight, then turn right.", ["⬆️ then ➡️", "⬆️ then ⬅️", "➡️ then ⬆️"])] },
        { id: "li-2-5", title: "Listen and Follow", goal: "Follow instructions with two steps.",
          learn: [{ title: "Two steps", text: "Some instructions have two parts. Listen to the <strong>whole</strong> instruction before you answer." }],
          items: [look("Find the red circle.", "red circle", [pic("red circle", "svg:color-red"), pic("orange square", "svg:square"), pic("green triangle", "svg:triangle")]),
            look("Find the green triangle.", "green triangle", [pic("green triangle", "svg:triangle"), pic("blue circle", "svg:circle"), pic("purple rectangle", "svg:rectangle")]),
            lc("Listen. What should you do first?", "First wash your hands, then eat your lunch.", ["Wash your hands.", "Eat your lunch.", "Go outside."]),
            lc("Listen. What should you do second?", "Take out your book, then turn to page ten.", ["Turn to page 10.", "Take out your book.", "Close your book."]),
            look("Draw a star and a heart.", "star and heart", [{ t: "star and heart", vis: "⭐❤️", alt: "a star and a heart", hideLabel: true }, { t: "two stars", vis: "⭐⭐", alt: "two stars", hideLabel: true }, { t: "two hearts", vis: "❤️❤️", alt: "two hearts", hideLabel: true }])] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        S("li-3-1", "Morning Routines", "Listen to a girl talk about her morning.", clip("Jana is talking about her morning.", ["wake up", "uniform", "breakfast"], [
          ["Jana", "f", "Hi, I'm Jana. Every morning, I wake up at half past six."], ["Jana", "f", "First, I wash my face and brush my teeth."], ["Jana", "f", "Then I put on my school uniform."],
          ["Jana", "f", "For breakfast, I eat an egg and some bread, and I drink a glass of milk."], ["Jana", "f", "My dad drives me to school at a quarter past seven."]]), [
          q("What time does Jana wake up?", ["at half past six", "at six o'clock", "at seven fifteen"]), q("What does Jana do first?", ["She washes her face and brushes her teeth.", "She eats breakfast.", "She puts on her uniform."]),
          q("What does Jana drink?", ["milk", "juice", "water"]), q("Who takes Jana to school?", ["her dad", "her mom", "a bus driver"]), tf("Jana goes to school at a quarter past seven.", true)]),
        S("li-3-2", "At School", "Listen to a teacher and a student.", clip("Ms. Mona is talking to a student, Lulu.", ["forgot", "homework", "tomorrow"], [
          ["Ms. Mona", "f", "Good morning, Lulu. Where is your homework?"], ["Lulu", "f", "I'm sorry, Ms. Mona. I finished it, but I forgot it at home."],
          ["Ms. Mona", "f", "That's okay. Can you bring it tomorrow?"], ["Lulu", "f", "Yes, I will. I'll put it in my bag tonight."], ["Ms. Mona", "f", "Good idea. Now please open your book to page twenty."]]), [
          q("What is the problem?", ["Lulu forgot her homework at home.", "Lulu did not do her homework.", "Lulu lost her book."]), q("When will Lulu bring the homework?", ["tomorrow", "today", "next week"]),
          q("What will Lulu do tonight?", ["put her homework in her bag", "do her homework again", "call her teacher"]), q("Which page does Ms. Mona ask about?", ["page 20", "page 12", "page 2"]), q("How does Ms. Mona feel?", ["calm and kind", "very angry", "sad"], "She says \"That's okay\" and asks kindly.")]),
        S("li-3-3", "At the Park", "Listen to a boy describe a day at the park.", clip("Bader is telling us about the park.", ["slide", "kite", "picnic"], [
          ["Bader", "m", "On Saturday, I went to the park with my family."], ["Bader", "m", "My little sister played on the slide, and I flew my new kite."],
          ["Bader", "m", "It was very windy, so my kite went very high."], ["Bader", "m", "At lunchtime, we had a picnic under a tree. We ate sandwiches and fruit."], ["Bader", "m", "In the evening, we went home. I was tired but happy."]]), [
          q("When did Bader go to the park?", ["on Saturday", "on Friday", "on Monday"]), q("What did Bader's sister play on?", ["the slide", "the swings", "a bike"]),
          q("Why did the kite go very high?", ["It was very windy.", "It was a new kite.", "Bader ran fast."]), q("Where did they have a picnic?", ["under a tree", "next to the lake", "in the car"]), q("How did Bader feel at the end?", ["tired but happy", "sad and bored", "angry"])]),
        S("li-3-4", "Shopping for Food", "Listen to a mother and son at the supermarket.", clip("Mom and Saad are at the supermarket.", ["list", "kilo", "basket"], [
          ["Mom", "f", "Saad, can you read the shopping list, please?"], ["Saad", "m", "Sure. We need milk, eggs, rice and some apples."], ["Mom", "f", "Good. Let's get the apples first. How many do we need?"],
          ["Saad", "m", "The list says one kilo. Can I choose them?"], ["Mom", "f", "Yes, choose red ones, please. I'll get the milk and the eggs."], ["Saad", "m", "Mom, can we buy some dates too? Grandma is visiting tomorrow."], ["Mom", "f", "That's a lovely idea. Yes, we can."]]), [
          q("Who reads the shopping list?", ["Saad", "Mom", "Grandma"]), q("Which of these is NOT on the list?", ["bread", "milk", "rice"]), q("How many apples do they need?", ["one kilo", "one apple", "ten apples"]),
          q("Why does Saad want to buy dates?", ["Grandma is visiting tomorrow.", "He is hungry.", "Dates are on the list."]), q("What color apples does Mom want?", ["red", "green", "yellow"])]),
        S("li-3-5", "Weather and Activities", "Listen to a weather report.", clip("Listen to today's weather report.", ["cloudy", "degrees", "windy"], [
          ["Weather reporter", "f", "Good morning! Here is the weather for today."], ["Weather reporter", "f", "In Riyadh, it will be sunny and very hot, with a temperature of thirty-eight degrees. Remember to drink lots of water."],
          ["Weather reporter", "f", "In Abha, it will be cloudy and cool, with some rain in the afternoon. Take an umbrella!"], ["Weather reporter", "f", "In Jeddah, it will be warm and windy. It's a great day to fly a kite at the beach."], ["Weather reporter", "f", "Have a wonderful day!"]]), [
          q("What will the weather be like in Riyadh?", ["sunny and very hot", "cloudy and cool", "warm and windy"]), q("What is the temperature in Riyadh?", ["38 degrees", "28 degrees", "18 degrees"]),
          q("Where should people take an umbrella?", ["Abha", "Riyadh", "Jeddah"]), q("What is a good activity in Jeddah today?", ["flying a kite at the beach", "staying inside", "building a snowman"]), q("When will it rain in Abha?", ["in the afternoon", "in the morning", "at night"])])
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        S("li-4-1", "A Conversation Between Friends", "Listen to two friends making plans.", clip("Omar and Yazan are talking after school.", ["free", "match", "pick you up"], [
          ["Omar", "m", "Hi, Yazan! Are you free on Thursday afternoon?"], ["Yazan", "m", "I think so. Why?"], ["Omar", "m", "My dad has tickets for a football match. Do you want to come with us?"],
          ["Yazan", "m", "Wow, yes! I'd love to. What time does it start?"], ["Omar", "m", "It starts at five o'clock. We can pick you up at four."], ["Yazan", "m", "Great! I'll ask my mom tonight and tell you tomorrow."], ["Omar", "m", "Okay. Don't forget to wear your blue team shirt!"]]), [
          q("What is Omar inviting Yazan to?", ["a football match", "a birthday party", "a school trip"]), q("When is the match?", ["on Thursday afternoon", "on Friday morning", "on Saturday evening"]),
          q("What time will they pick Yazan up?", ["at four o'clock", "at five o'clock", "at six o'clock"]), q("What must Yazan do first?", ["ask his mom", "buy a ticket", "call his dad"]), q("What should Yazan wear?", ["his blue team shirt", "a red hat", "his school uniform"])]),
        S("li-4-2", "Planning a School Activity", "Listen to a teacher plan a class trip.", clip("Ms. Hessa is telling her class about a trip.", ["trip", "museum", "permission"], [
          ["Ms. Hessa", "f", "Listen, everyone. Next Wednesday, our class is going on a trip to the science museum."], ["Ms. Hessa", "f", "We will leave school by bus at eight thirty and come back at one o'clock."],
          ["Ms. Hessa", "f", "Please bring a packed lunch and a bottle of water. You do not need money."], ["Student", "f", "Ms. Hessa, can we take photos in the museum?"],
          ["Ms. Hessa", "f", "Yes, you can, but please don't touch the exhibits unless a sign says you can."], ["Ms. Hessa", "f", "And remember: your parents must sign the permission form by Monday."]]), [
          q("Where is the class going?", ["to the science museum", "to the zoo", "to the park"]), q("How will they travel?", ["by bus", "by car", "on foot"]),
          q("What do students NOT need to bring?", ["money", "a packed lunch", "a bottle of water"]), q("Can students take photos?", ["Yes, they can.", "No, they can't.", "Only the teacher can."]), q("What must parents do by Monday?", ["sign the permission form", "pay for the bus", "call the museum"])]),
        S("li-4-3", "Following Directions", "Listen to directions to find a place.", clip("A man is asking a woman for directions.", ["straight", "bakery", "between"], [
          ["Man", "m", "Excuse me. Can you tell me how to get to the library?"], ["Woman", "f", "Of course. Go straight along this street until you see a bakery."],
          ["Woman", "f", "Turn left at the bakery. Then walk past the school."], ["Woman", "f", "The library is on your right, between the bank and the park."], ["Man", "m", "Is it far?"], ["Woman", "f", "No, it's only about five minutes on foot."], ["Man", "m", "Thank you very much!"]]), [
          q("Where does the man want to go?", ["the library", "the bakery", "the bank"]), q("Where should he turn left?", ["at the bakery", "at the school", "at the park"]),
          q("Where is the library?", ["between the bank and the park", "next to the bakery", "behind the school"]), q("How long does it take to walk there?", ["about five minutes", "about fifteen minutes", "about an hour"]), tf("The library is on the left.", false, "The woman says: <em>The library is on your right.</em>")]),
        S("li-4-4", "Talking About Hobbies", "Listen to a brother and sister talk about their hobbies.", clip("Leen and her brother Hamza are talking.", ["hobby", "collect", "stamps"], [
          ["Hamza", "m", "Leen, what are you doing?"], ["Leen", "f", "I'm painting a picture of the sea. Painting is my favorite hobby."],
          ["Hamza", "m", "It's beautiful! I can't paint very well."], ["Leen", "f", "What's your favorite hobby, Hamza?"],
          ["Hamza", "m", "I collect stamps from different countries. I have more than two hundred now."], ["Leen", "f", "That's a lot! Which one is your favorite?"], ["Hamza", "m", "A stamp from Japan with a red bird on it. Grandpa gave it to me."]]), [
          q("What is Leen painting?", ["the sea", "a red bird", "her brother"]), q("What is Hamza's hobby?", ["collecting stamps", "painting", "playing football"]),
          q("How many stamps does Hamza have?", ["more than two hundred", "about twenty", "two"]), q("Where is Hamza's favorite stamp from?", ["Japan", "Egypt", "Saudi Arabia"]), q("Who gave Hamza his favorite stamp?", ["Grandpa", "Leen", "his teacher"])]),
        S("li-4-5", "Everyday Conversations", "Listen to a phone call.", clip("Aunt Nawal is calling Dalia's family.", ["invite", "dinner", "bring"], [
          ["Dalia", "f", "Hello?"], ["Aunt Nawal", "f", "Hello, Dalia! It's Aunt Nawal. How are you?"], ["Dalia", "f", "I'm fine, thank you, Auntie!"],
          ["Aunt Nawal", "f", "I'm calling to invite your family to dinner on Friday evening at seven."], ["Dalia", "f", "That sounds lovely. Should we bring anything?"],
          ["Aunt Nawal", "f", "Maybe some dessert? Your mom's cake is delicious!"], ["Dalia", "f", "Okay! I'll tell Mom. See you on Friday!"]]), [
          q("Who is calling?", ["Aunt Nawal", "Dalia's mom", "Dalia's teacher"]), q("Why is Aunt Nawal calling?", ["to invite the family to dinner", "to ask for a cake recipe", "to say she is sick"]),
          q("When is the dinner?", ["Friday at seven", "Friday at eleven", "Thursday at seven"]), q("What should the family bring?", ["dessert", "drinks", "nothing"]), q("Who makes delicious cake?", ["Dalia's mom", "Aunt Nawal", "Dalia"])])
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        S("li-5-1", "A Short Adventure Story", "Listen to a story and understand what happens.", clip("Listen to a short adventure story.", ["sandstorm", "shelter", "compass"], [
          ["Narrator", "f", "Rashed and his uncle were driving across the desert to visit their family's farm."], ["Narrator", "f", "Suddenly, the sky turned orange, and a strong wind began to blow. It was a sandstorm!"],
          ["Narrator", "f", "Rashed's uncle stopped the car. \"We must wait here until it passes,\" he said. \"The car is our shelter.\""], ["Narrator", "f", "They closed the windows and waited. Outside, they could not see anything but sand."],
          ["Narrator", "f", "After one hour, the wind stopped. But the road was covered with sand. Rashed took out his compass. \"The farm is to the north,\" he said."], ["Narrator", "f", "They drove slowly north and arrived at the farm just before sunset. Everyone was happy to see them."]]), [
          q("Where were Rashed and his uncle going?", ["to their family's farm", "to the beach", "to the city"]), q("What made the sky turn orange?", ["a sandstorm", "the sunset", "a fire"]),
          q("Why did they stay in the car?", ["The car was a safe shelter during the storm.", "The car was broken.", "They were tired."]), q("How did Rashed find the way?", ["He used a compass.", "He asked a man.", "He followed a camel."]),
          q("When did they arrive at the farm?", ["just before sunset", "at midnight", "in the morning"]), q("Which word best describes Rashed?", ["clever", "lazy", "scared"], "He used his compass to find the way.")]),
        S("li-5-2", "An Informational Talk", "Listen to a zoo guide talk about giraffes.", clip("A zoo guide is talking to a group of students.", ["tallest", "tongue", "leaves"], [
          ["Zoo guide", "m", "Welcome to the giraffe house, everyone! Giraffes are the tallest animals in the world."], ["Zoo guide", "m", "An adult giraffe can be more than five meters tall. That's taller than a bus!"],
          ["Zoo guide", "m", "Giraffes use their long necks to reach leaves at the tops of trees. Their tongues are about fifty centimeters long, and they are dark purple."],
          ["Zoo guide", "m", "Giraffes only sleep for a short time each day, often just a few minutes at a time."], ["Zoo guide", "m", "Each giraffe has its own special pattern of spots, just like your fingerprints. No two giraffes are the same."]]), [
          q("What is the talk mostly about?", ["giraffes", "zoo buses", "trees"]), q("How tall can an adult giraffe be?", ["more than five meters", "about two meters", "fifty centimeters"]),
          q("Why do giraffes have long necks?", ["to reach leaves at the tops of trees", "to see the zoo guide", "to sleep better"]), q("What color is a giraffe's tongue?", ["dark purple", "pink", "red"]),
          q("Why does the guide compare spots to fingerprints?", ["Every giraffe's pattern is different.", "Giraffes have fingers.", "Spots are very small."]), tf("Giraffes sleep for many hours at a time.", false)]),
        S("li-5-3", "A Weekend Conversation", "Listen to two friends talk about their weekends.", clip("Ghada and Shahad are talking on Sunday morning.", ["volunteered", "charity", "proud"], [
          ["Ghada", "f", "Hi, Shahad! How was your weekend?"], ["Shahad", "f", "It was busy! On Friday, I volunteered with my mom at a charity. We packed food boxes for families."],
          ["Ghada", "f", "That's wonderful! How many boxes did you pack?"], ["Shahad", "f", "More than one hundred! My arms were tired, but I felt proud. What about you?"],
          ["Ghada", "f", "I stayed at home on Friday because I had a cold. But on Saturday, I felt better, so we went to the new science center."],
          ["Shahad", "f", "Oh, I want to go there! Was it good?"], ["Ghada", "f", "It was amazing. Let's go together next weekend!"]]), [
          q("What did Shahad do on Friday?", ["She packed food boxes at a charity.", "She went to the science center.", "She stayed at home."]), q("How many boxes did Shahad pack?", ["more than one hundred", "about ten", "fifty"]),
          q("Why did Ghada stay at home on Friday?", ["She had a cold.", "She was busy.", "It was raining."]), q("How did Shahad feel after volunteering?", ["proud", "angry", "bored"]),
          q("What does \"volunteered\" mean?", ["helped without being paid", "went shopping", "played a game"]), q("What will the girls probably do next weekend?", ["visit the science center together", "pack food boxes", "stay at home"])]),
        S("li-5-4", "A Description of a Place", "Listen to someone describe a special place.", clip("Asma is describing her grandparents' village.", ["village", "valley", "terraces"], [
          ["Asma", "f", "My grandparents live in a small village in the mountains of Al Baha. I visit them every summer."], ["Asma", "f", "Their stone house is at the top of a green valley. From the window, you can see farms built like steps on the hillside. These are called terraces."],
          ["Asma", "f", "In the morning, the air is cool and there is often fog between the mountains. My grandmother grows pomegranates and roses in her garden."],
          ["Asma", "f", "In the evening, the whole family sits outside and drinks tea. We can see thousands of stars because there are no city lights."], ["Asma", "f", "It is my favorite place in the world."]]), [
          q("Where do Asma's grandparents live?", ["in a village in the mountains", "in a big city", "near the sea"]), q("What are terraces?", ["farms built like steps on a hillside", "tall buildings", "kinds of trees"]),
          q("What is the morning weather like?", ["cool, often with fog", "hot and sunny", "rainy and windy"]), q("What does Asma's grandmother grow?", ["pomegranates and roses", "dates and lemons", "tomatoes and carrots"]),
          q("Why can they see thousands of stars?", ["There are no city lights.", "They have a telescope.", "The stars are very close."]), q("How does Asma feel about the village?", ["It is her favorite place.", "She finds it boring.", "She is afraid of it."])]),
        S("li-5-5", "Listening Comprehension Challenge", "Listen to a school announcement and find the important details.", clip("Listen to the principal's morning announcement.", ["announcement", "canceled", "hall"], [
          ["Principal", "m", "Good morning, students. Here are this week's announcements."], ["Principal", "m", "First, the English reading competition will be on Tuesday at ten o'clock in the school hall. Grades three, four and five will take part."],
          ["Principal", "m", "Second, because of the hot weather, the football match on Wednesday afternoon is canceled. It will happen next week instead."],
          ["Principal", "m", "Third, the school library will now be open after school until three thirty every day except Thursday."], ["Principal", "m", "Finally, congratulations to Class Four B for having the cleanest classroom this month. Well done, everyone!"]]), [
          q("When is the reading competition?", ["Tuesday at ten o'clock", "Wednesday afternoon", "Thursday at three thirty"]), q("Where is the reading competition?", ["in the school hall", "in the library", "in the playground"]),
          q("Why is the football match canceled?", ["because of the hot weather", "because of rain", "because the team is sick"]), q("On which day does the library NOT stay open after school?", ["Thursday", "Tuesday", "Monday"]),
          q("Which class had the cleanest classroom?", ["Class Four B", "Class Three A", "Class Five B"]), q("Who can take part in the reading competition?", ["Grades 3, 4 and 5", "all grades", "only Grade 5"])])
      ] }
    ]
  });
})();
