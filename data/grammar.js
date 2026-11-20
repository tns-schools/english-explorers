/* =====================================================================
   TNS English Explorers — GRAMMAR PLAYGROUND (25 activity sets)
   Every set: short explanation → modeled examples → 8–10 practice items.
   Item types are mixed: choose, build a sentence (tap words), correct a
   mistake (type), pick the correct sentence, match, and picture questions.
   Every blank has exactly ONE correct answer.
   ===================================================================== */
(function () {
  "use strict";
  function ch(sentence, opts, explain) { return { type: "choice", q: "Choose the correct word.", prompt: sentence, options: opts, answer: opts[0], explain: explain }; }
  function build(sentence, explain) { return { type: "words", q: "Tap the words to build the sentence.", answer: sentence, explain: explain }; }
  function fix(wrong, right, accept, explain) { return { type: "type", q: "Find the mistake. Type the correct sentence.", prompt: wrong, answer: right, accept: accept, long: true, explain: explain }; }
  function right(opts, explain) { return { type: "choice", q: "Which sentence is correct?", options: opts, answer: opts[0], explain: explain }; }
  function picQ(vis, alt, opts) { return { type: "choice", q: "Look at the picture. Where is the ball?", vis: vis, visAlt: alt, options: opts, answer: opts[0] }; }
  function which(q, opts, explain) { return { type: "choice", q: q, options: opts, answer: opts[0], explain: explain }; }
  function match(q, pairs) { return { type: "match", q: q, pairs: pairs }; }
  function ex(t, note) { return { t: t, note: note }; }
  function L(title, text, examples, tip) { return [{ title: title, text: text, examples: examples, tip: tip }]; }

  TNS.register("grammar", {
    intro: "Learn how English sentences work, one small rule at a time.",
    levels: [
      /* =================== LEVEL 1 =================== */
      { sets: [
        { id: "gr-1-1", title: "A and An", goal: "Use a and an before a noun.",
          learn: L("a or an?", "Use <strong>a</strong> before a word that starts with a consonant sound. Use <strong>an</strong> before a word that starts with a vowel sound (a, e, i, o, u).",
            [{ t: "a cat", vis: "🐱" }, { t: "a ball", vis: "⚽" }, { t: "an apple", vis: "🍎" }, { t: "an egg", vis: "🥚" }, { t: "an orange", vis: "🍊" }, { t: "a banana", vis: "🍌" }]),
          items: [ch("___ apple", ["an", "a"]), ch("___ dog", ["a", "an"]), ch("___ elephant", ["an", "a"]), ch("___ book", ["a", "an"]), ch("___ umbrella", ["an", "a"]),
            ch("I have ___ orange.", ["an", "a"]), ch("She has ___ red bag.", ["a", "an"], "<strong>red</strong> starts with a consonant sound, so we use <strong>a</strong>."),
            match("Match a or an to each word.", [["a", "pencil"], ["an", "ice cream"]]), right(["This is an egg.", "This is a egg."]), build("I have a cat.")] },

        { id: "gr-1-2", title: "Singular and Plural Nouns", goal: "Talk about one thing or more than one.",
          learn: L("One or more?", "<strong>Singular</strong> means one. <strong>Plural</strong> means more than one. To make most nouns plural, add <strong>-s</strong>.",
            [{ t: "one cat → two cats", vis: "🐱" }, { t: "one book → three books", vis: "📖" }, { t: "one box → two boxes", vis: "📦", note: "add -es after x, s, sh, ch" }, { t: "one child → two children", note: "a special plural" }]),
          items: [ch("one ___", ["dog", "dogs"]), ch("two ___", ["apples", "apple"]), ch("three ___", ["boxes", "boxs"]), ch("one ___", ["bird", "birds"]),
            ch("I have four ___.", ["pencils", "pencil"]), ch("There are two ___ in the class.", ["children", "childs"], "<strong>children</strong> is the plural of <em>child</em>."),
            which("Which word is plural?", ["cars", "car", "bus"]), match("Match singular to plural.", [["cat", "cats"], ["bus", "buses"], ["man", "men"], ["foot", "feet"]]),
            right(["I see three birds.", "I see three bird."]), build("I have two brothers.")] },

        { id: "gr-1-3", title: "I and You", goal: "Use I for yourself and you for the person you talk to.",
          learn: L("I and you", "Use <strong>I</strong> when you talk about yourself. Use <strong>you</strong> for the person you are talking to. <strong>I</strong> is always a capital letter!",
            [ex("I am Sara.", "talking about me"), ex("You are my friend.", "talking to my friend"), ex("I like milk."), ex("You have a red pen.")]),
          items: [ch("Hello! ___ am Fahad.", ["I", "You"]), ch("Lina, ___ are my best friend!", ["you", "I"]), ch("___ like to read books. (me)", ["I", "You"]),
            ch("Thank you! ___ are very kind. (talking to Mom)", ["You", "I"]), which("Which is always written with a capital letter?", ["I", "you", "we"]),
            right(["I have a new bag.", "i have a new bag."], "<strong>I</strong> is always a capital letter."), fix("i am seven years old.", "I am seven years old.", null, "Write <strong>I</strong> with a capital letter."),
            build("You are my friend."), build("I can swim."), ch("Omar, ___ have a nice bike!", ["you", "I"])] },

        { id: "gr-1-4", title: "Am and Is", goal: "Use I am and he/she/it is.",
          learn: L("am and is", "Use <strong>am</strong> with <strong>I</strong>. Use <strong>is</strong> with one person or thing: <strong>he, she, it</strong>, or a name.",
            [ex("I am happy."), ex("He is tall."), ex("She is my sister."), ex("It is a cat."), ex("Sami is eight.")]),
          items: [ch("I ___ a student.", ["am", "is"]), ch("She ___ my teacher.", ["is", "am"]), ch("It ___ a big dog.", ["is", "am"]), ch("I ___ seven years old.", ["am", "is"]),
            ch("Huda ___ my friend.", ["is", "am"]), ch("He ___ hungry.", ["is", "am"]), right(["I am tired.", "I is tired."]), match("Match each word to am or is.", [["I", "am"], ["she", "is"]]),
            fix("My cat am white.", "My cat is white.", null, "My cat = it, so we use <strong>is</strong>."), build("She is my sister.")] },

        { id: "gr-1-5", title: "Basic Grammar Review", goal: "Use a/an, plurals, I/you, am/is.",
          learn: L("Let's review", "Remember: <strong>a</strong> / <strong>an</strong> · one cat / two <strong>cats</strong> · <strong>I am</strong> · <strong>he/she/it is</strong> · <strong>I</strong> is a capital letter.",
            [ex("I am a boy."), ex("She is an artist."), ex("You have three pens.")]),
          items: [ch("I have ___ egg.", ["an", "a"]), ch("He ___ my brother.", ["is", "am"]), ch("There are five ___.", ["cars", "car"]), ch("___ am happy today.", ["I", "You"]),
            right(["It is an orange.", "It is a orange.", "It am an orange."]), right(["I am nine.", "I is nine.", "I nine."]),
            fix("She is a ant.", "She is an ant.", ["It is an ant."], "Use <strong>an</strong> before a vowel sound: <em>an ant</em>."),
            build("He is a doctor."), build("I have two cats."), which("Which word is plural?", ["boxes", "box", "an"])] }
      ] },

      /* =================== LEVEL 2 =================== */
      { sets: [
        { id: "gr-2-1", title: "Personal Pronouns", goal: "Use I, you, he, she, it, we and they.",
          learn: L("Pronouns", "A <strong>pronoun</strong> takes the place of a noun, so we do not repeat it.",
            [ex("Omar → he"), ex("Lina → she"), ex("the cat → it"), ex("Lina and I → we"), ex("the boys → they")],
            "Ali is tall. <strong>He</strong> plays basketball. (He = Ali)"),
          items: [ch("Noura is kind. ___ helps everyone.", ["She", "He", "It"]), ch("My dad is a pilot. ___ flies planes.", ["He", "She", "They"]), ch("The dog is hungry. ___ wants food.", ["It", "He", "We"]),
            ch("Sara and Reem are sisters. ___ live in Jeddah.", ["They", "She", "We"]), ch("My brother and I play football. ___ play every day.", ["We", "They", "He"]),
            match("Match each noun to its pronoun.", [["Khalid", "he"], ["Maha", "she"], ["the book", "it"], ["the girls", "they"]]),
            right(["The students are happy. They won the game.", "The students are happy. It won the game."]), fix("My mom is a doctor. He works in a hospital.", "My mom is a doctor. She works in a hospital.", null, "Mom = <strong>she</strong>."),
            build("They are my friends."), which("Which word can replace \"the apples\"?", ["they", "it", "he"])] },

        { id: "gr-2-2", title: "Am, Is and Are", goal: "Use am, is and are correctly.",
          learn: L("am, is, are", "<strong>I am</strong> · <strong>he / she / it is</strong> · <strong>you / we / they are</strong>.",
            [ex("I am happy."), ex("She is at school."), ex("We are friends."), ex("They are in the garden."), ex("You are funny.")]),
          items: [ch("We ___ in Grade 3.", ["are", "is", "am"]), ch("The children ___ in the park.", ["are", "is", "am"]), ch("My mother ___ a teacher.", ["is", "are", "am"]),
            ch("I ___ ready.", ["am", "are", "is"]), ch("You ___ a good student.", ["are", "is", "am"]), ch("The cat and the dog ___ friends.", ["are", "is", "am"]),
            right(["They are happy.", "They is happy.", "They am happy."]), fix("The boys is tall.", "The boys are tall.", null, "The boys = they, so we use <strong>are</strong>."),
            build("We are in the classroom."), match("Match each word to am, is or are.", [["I", "am"], ["it", "is"], ["they", "are"]])] },

        { id: "gr-2-3", title: "This, That, These and Those", goal: "Point to things near and far.",
          learn: L("Near or far?", "<strong>This</strong> (one, near) · <strong>That</strong> (one, far) · <strong>These</strong> (more than one, near) · <strong>Those</strong> (more than one, far).",
            [ex("This is my pen.", "one, near me"), ex("That is a plane.", "one, far away"), ex("These are my books.", "many, near me"), ex("Those are birds.", "many, far away")]),
          items: [ch("___ is my bag. (one, in my hand)", ["This", "These", "Those"]), ch("___ are my shoes. (two, near me)", ["These", "This", "That"]), ch("Look at ___ bird in the sky! (one, far)", ["that", "these", "those"]),
            ch("___ are stars. (many, far away)", ["Those", "This", "That"]), ch("___ apples are delicious. (many, on my plate)", ["These", "That", "This"]),
            right(["These are my pencils.", "This are my pencils."]), right(["That is a camel.", "Those is a camel."]),
            fix("Those is my house over there.", "That is my house over there.", null, "One house, far away: <strong>That</strong>."),
            build("This is my brother."), match("Match each word to its meaning.", [["this", "one, near"], ["that", "one, far"], ["these", "many, near"], ["those", "many, far"]])] },

        { id: "gr-2-4", title: "Have and Has", goal: "Use have and has to talk about things people own.",
          learn: L("have or has?", "Use <strong>has</strong> with <strong>he, she, it</strong> or one person. Use <strong>have</strong> with <strong>I, you, we, they</strong>.",
            [ex("I have a bike."), ex("She has long hair."), ex("We have a big garden."), ex("The cat has green eyes.")]),
          items: [ch("I ___ two sisters.", ["have", "has"]), ch("Faisal ___ a new phone.", ["has", "have"]), ch("They ___ a red car.", ["have", "has"]), ch("The bird ___ blue wings.", ["has", "have"]),
            ch("We ___ English on Monday.", ["have", "has"]), ch("My grandmother ___ a beautiful garden.", ["has", "have"]),
            right(["She has a cat.", "She have a cat."]), fix("He have a big dog.", "He has a big dog.", null, "He → <strong>has</strong>."),
            build("My brother has a bike."), which("Which word is correct? \"My parents ___ a small shop.\"", ["have", "has"], "My parents = they → <strong>have</strong>.")] },

        { id: "gr-2-5", title: "Grammar Review", goal: "Use pronouns, am/is/are, this/these and have/has.",
          learn: L("Let's review", "Pronouns (<em>he, she, they</em>) · <em>am / is / are</em> · <em>this / that / these / those</em> · <em>have / has</em>.",
            [ex("They are happy."), ex("This is my cat. It has white fur."), ex("We have a test today.")]),
          items: [ch("My friends ___ at the park.", ["are", "is", "am"]), ch("___ are my new shoes. (near me)", ["These", "This", "That"]), ch("She ___ a pink dress.", ["has", "have"]),
            ch("Ahmed is my cousin. ___ is ten.", ["He", "She", "They"]), right(["We have a big family.", "We has a big family.", "We is a big family."]), right(["That is my school.", "Those is my school."]),
            fix("They has two cats.", "They have two cats.", null, "They → <strong>have</strong>."), fix("This are my books.", "These are my books.", null, "Many books → <strong>These are</strong>."),
            build("She has a red bag."), build("Those are big trees.")] }
      ] },

      /* =================== LEVEL 3 =================== */
      { sets: [
        { id: "gr-3-1", title: "Simple Present", goal: "Talk about habits and things that are always true.",
          learn: L("Every day", "Use the <strong>simple present</strong> for things we do often, and for facts.",
            [ex("I go to school every day."), ex("We eat dinner at seven."), ex("They play football on Fridays."), ex("The sun rises in the east.", "a fact")],
            "Time words like <strong>every day, always, usually, often, never</strong> are clues for the simple present."),
          items: [ch("I ___ my teeth every morning.", ["brush", "brushes", "brushing"]), ch("We ___ to the mosque on Fridays.", ["go", "goes", "going"]), ch("They ___ milk every day.", ["drink", "drinks", "drinking"]),
            ch("I always ___ my homework after lunch.", ["do", "does", "doing"]), which("Which sentence talks about a habit?", ["I read every night.", "I am reading now.", "I read yesterday."]),
            right(["We play outside after school.", "We plays outside after school."]), fix("I plays football every day.", "I play football every day.", null, "I → <strong>play</strong> (no -s)."),
            build("I go to bed at nine."), build("They walk to school every day."), ch("Fish ___ in water.", ["live", "lives", "living"])] },

        { id: "gr-3-2", title: "Third-Person Singular", goal: "Add -s to the verb after he, she and it.",
          learn: L("he / she / it + s", "In the simple present, add <strong>-s</strong> to the verb after <strong>he, she, it</strong> or one person. Some verbs add <strong>-es</strong>: go → goes, watch → watches.",
            [ex("He plays football."), ex("She reads books."), ex("It eats leaves."), ex("My dad goes to work at seven."), ex("Mom watches the news.")]),
          items: [ch("She ___ to school by bus.", ["goes", "go", "going"]), ch("My brother ___ basketball.", ["plays", "play", "playing"]), ch("The cat ___ fish.", ["likes", "like", "liking"]),
            ch("Dad ___ the car every Saturday.", ["washes", "wash", "washs"]), ch("Rana ___ English very well.", ["speaks", "speak", "speaking"]),
            right(["He drinks water.", "He drink water."]), fix("My sister read every night.", "My sister reads every night.", null, "My sister = she → <strong>reads</strong>."),
            fix("He go to the park.", "He goes to the park."), build("She watches TV after dinner."), match("Match each verb to its -s form.", [["go", "goes"], ["play", "plays"], ["watch", "watches"], ["fly", "flies"]])] },

        { id: "gr-3-3", title: "Prepositions of Place", goal: "Say where things are: in, on, under, next to, behind, in front of, between.",
          learn: [{ title: "Where is it?", text: "Prepositions tell us <strong>where</strong> something is.",
            examples: [{ t: "in", vis: "svg:ball-in-box", say: "The ball is in the box." }, { t: "on", vis: "svg:ball-on-box", say: "The ball is on the box." }, { t: "under", vis: "svg:ball-under-table", say: "The ball is under the table." }, { t: "next to", vis: "svg:ball-next-to-box", say: "The ball is next to the box." },
              { t: "behind", vis: "svg:ball-behind-box", say: "The ball is behind the box." }, { t: "in front of", vis: "svg:ball-in-front-of-box", say: "The ball is in front of the box." }, { t: "between", vis: "svg:ball-between-boxes", say: "The ball is between the boxes." }] }],
          items: [picQ("svg:ball-on-box", "a ball and a box", ["on the box", "in the box", "under the box"]), picQ("svg:ball-under-table", "a ball and a table", ["under the table", "on the table", "next to the table"]),
            picQ("svg:ball-behind-box", "a ball and a box", ["behind the box", "in front of the box", "in the box"]), picQ("svg:ball-between-boxes", "a ball and two boxes", ["between the boxes", "on the boxes", "behind the boxes"]),
            picQ("svg:ball-in-front-of-box", "a ball and a box", ["in front of the box", "behind the box", "on the box"]),
            ch("My books are ___ my school bag. (inside)", ["in", "on", "under"]), ch("The cat is sleeping ___ the bed. (below it)", ["under", "on", "between"]),
            right(["The picture is on the wall.", "The picture is in the wall."]), build("The ball is next to the box."), which("Look: 🐱📦. Where is the cat?", ["next to the box", "in the box", "under the box"])] },

        { id: "gr-3-4", title: "Adjectives", goal: "Use describing words before a noun.",
          learn: L("Describing words", "<strong>Adjectives</strong> describe nouns: color, size, shape, feeling. In English, the adjective comes <strong>before</strong> the noun.",
            [ex("a red car", "not: a car red"), ex("a big house"), ex("a happy girl"), ex("tall trees"), ex("The soup is hot.", "after is/are, too")]),
          items: [which("Which word is an adjective?", ["blue", "run", "table"]), which("Which word is an adjective?", ["happy", "sing", "pencil"]), right(["I have a black cat.", "I have a cat black."], "The adjective comes before the noun."),
            right(["She lives in a big house.", "She lives in a house big."]), ch("An elephant is ___. (not small)", ["big", "tiny", "short"]),
            ch("I'm wearing my ___ shoes.", ["new", "slowly", "run"]), fix("He has a bike red.", "He has a red bike.", null, "Adjective before noun: <strong>a red bike</strong>."),
            build("She has long black hair."), build("We saw a tall giraffe."), match("Match the opposite adjectives.", [["hot", "cold"], ["big", "small"], ["fast", "slow"], ["happy", "sad"]])] },

        { id: "gr-3-5", title: "Can and Cannot", goal: "Talk about what people can and cannot do.",
          learn: L("can / cannot", "Use <strong>can</strong> + verb for ability. Use <strong>cannot</strong> (or <strong>can't</strong>) for no ability. The verb does <strong>not</strong> change.",
            [ex("I can swim."), ex("Birds can fly."), ex("Fish cannot walk."), ex("She can't ride a bike yet."), ex("Can you speak English? — Yes, I can.")]),
          items: [ch("A bird ___ fly.", ["can", "cannot"]), ch("A fish ___ climb a tree.", ["cannot", "can"]), ch("She can ___ very fast.", ["run", "runs", "running"]),
            ch("Can you swim? — Yes, I ___.", ["can", "do", "am"]), right(["He can play the drum.", "He can plays the drum.", "He cans play the drum."]), right(["Babies cannot drive.", "Babies can drive."]),
            fix("My sister can sings well.", "My sister can sing well.", null, "After <strong>can</strong>, use the base verb: <em>sing</em>."),
            build("I can ride a bike."), build("Penguins cannot fly."), which("Which question is correct?", ["Can you help me?", "You can help me?", "Can you helps me?"])] }
      ] },

      /* =================== LEVEL 4 =================== */
      { sets: [
        { id: "gr-4-1", title: "Present Continuous", goal: "Talk about actions happening now.",
          learn: L("Happening now", "Use <strong>am / is / are + verb-ing</strong> for actions happening <strong>now</strong>.",
            [ex("I am reading a book."), ex("She is playing outside."), ex("They are eating lunch."), ex("Look! It is raining.")],
            "Clue words: <strong>now, right now, look!, listen!</strong>"),
          items: [ch("Look! The baby ___ sleeping.", ["is", "are", "am"]), ch("We ___ watching a film now.", ["are", "is", "am"]), ch("I am ___ my homework right now.", ["doing", "do", "does"]),
            ch("Listen! Someone ___ singing.", ["is", "are", "am"]), ch("The children are ___ in the pool.", ["swimming", "swim", "swims"]),
            which("Which sentence is about now?", ["She is cooking dinner.", "She cooks dinner every day.", "She cooked dinner."]),
            fix("He are playing football.", "He is playing football."), fix("They is running.", "They are running."), build("My mom is reading a book."), build("We are cleaning our classroom.")] },

        { id: "gr-4-2", title: "Simple Past — Regular Verbs", goal: "Talk about the past with -ed verbs.",
          learn: L("Yesterday", "For finished actions in the past, add <strong>-ed</strong> to regular verbs. The verb is the same for all people.",
            [ex("I played football yesterday."), ex("She cleaned her room."), ex("We visited Grandma last week."), ex("They walked to school.")],
            "Clue words: <strong>yesterday, last week, ago, in 2020</strong>"),
          items: [ch("Yesterday, I ___ my grandmother.", ["visited", "visit", "visiting"]), ch("We ___ a film last night.", ["watched", "watch", "watches"]), ch("She ___ the window an hour ago.", ["opened", "opens", "open"]),
            ch("They ___ to the park last Friday.", ["walked", "walk", "walking"]), which("Which sentence is in the past?", ["He cleaned the car.", "He cleans the car.", "He is cleaning the car."]),
            right(["I helped my dad yesterday.", "I help my dad yesterday."]), fix("Last week, we play basketball.", "Last week, we played basketball.", ["Last week we played basketball."]),
            build("She cooked dinner last night."), build("We visited the zoo yesterday."), match("Match each verb to its past form.", [["jump", "jumped"], ["stop", "stopped"], ["cry", "cried"], ["like", "liked"]])] },

        { id: "gr-4-3", title: "Simple Past — Common Irregular Verbs", goal: "Learn past forms that do not end in -ed.",
          learn: L("Irregular verbs", "Some verbs have special past forms. You need to learn them.",
            [ex("go → went"), ex("eat → ate"), ex("see → saw"), ex("have → had"), ex("make → made"), ex("come → came"), ex("write → wrote"), ex("buy → bought")]),
          items: [ch("Yesterday, we ___ to the beach.", ["went", "goed", "go"]), ch("I ___ a big sandwich for lunch.", ["ate", "eated", "eat"]), ch("She ___ a camel at the farm.", ["saw", "seed", "see"]),
            ch("Dad ___ a new car last month.", ["bought", "buyed", "buys"]), ch("We ___ a cake for Mom's birthday.", ["made", "maked", "make"]),
            match("Match each verb to its past form.", [["write", "wrote"], ["come", "came"], ["have", "had"], ["give", "gave"]]),
            fix("Last night, I goed to bed early.", "Last night, I went to bed early.", ["Last night I went to bed early."]), fix("He eated all the dates.", "He ate all the dates."),
            build("We went to Abha last summer."), right(["I saw a rainbow yesterday.", "I seed a rainbow yesterday.", "I see a rainbow yesterday."])] },

        { id: "gr-4-4", title: "Questions and Negatives", goal: "Make questions and negative sentences.",
          learn: L("Questions and no", "Present: <strong>Do / Does</strong> … ? and <strong>don't / doesn't</strong>. Past: <strong>Did</strong> … ? and <strong>didn't</strong>. After do/does/did, use the <strong>base verb</strong>.",
            [ex("Do you like milk? — I don't like milk."), ex("Does she play tennis? — She doesn't play tennis."), ex("Did they go to school? — They didn't go to school.")]),
          items: [ch("___ you like pizza?", ["Do", "Does", "Is"]), ch("___ your brother play football?", ["Does", "Do", "Are"]), ch("___ you see the film yesterday?", ["Did", "Do", "Does"]),
            ch("She doesn't ___ coffee.", ["drink", "drinks", "drank"]), ch("We ___ go to school on Friday.", ["don't", "doesn't", "isn't"]),
            right(["Did you eat breakfast?", "Did you ate breakfast?", "Do you ate breakfast?"]), fix("He don't like carrots.", "He doesn't like carrots.", ["He does not like carrots."]),
            fix("Does she plays the piano?", "Does she play the piano?"), build("Do you have a pet?"), build("I didn't watch TV yesterday.")] },

        { id: "gr-4-5", title: "Time Expressions", goal: "Use time words to show when something happens.",
          learn: L("When?", "Time expressions tell us <strong>when</strong>. They also help us choose the tense.",
            [ex("every day, usually, always", "→ simple present"), ex("now, right now, at the moment", "→ present continuous"), ex("yesterday, last week, two days ago", "→ simple past"), ex("in the morning, on Monday, at 7 o'clock")],
            "<strong>at</strong> + time (at 7 o'clock) · <strong>on</strong> + day (on Monday) · <strong>in</strong> + part of day / month (in the morning, in May)"),
          items: [ch("I wake up ___ six o'clock.", ["at", "on", "in"]), ch("We have art ___ Tuesday.", ["on", "at", "in"]), ch("My birthday is ___ June.", ["in", "on", "at"]), ch("I do my homework ___ the evening.", ["in", "on", "at"]),
            ch("She visited her aunt ___.", ["last week", "every day", "now"]), ch("Look! They are playing ___.", ["right now", "yesterday", "last year"]),
            ch("I ___ to school every day.", ["walk", "walked", "am walking"]), ch("We ___ a test two days ago.", ["had", "have", "are having"]),
            match("Match the time words to the tense.", [["yesterday", "past"], ["every day", "present habit"], ["right now", "happening now"]]),
            build("We played football last Friday.")] }
      ] },

      /* =================== LEVEL 5 =================== */
      { sets: [
        { id: "gr-5-1", title: "Future with Will and Going To", goal: "Talk about the future.",
          learn: L("The future", "Use <strong>going to</strong> + verb for plans. Use <strong>will</strong> + verb for predictions and quick decisions.",
            [ex("I am going to visit my cousins next week.", "a plan"), ex("It will rain tomorrow.", "a prediction"), ex("The phone is ringing. I will answer it!", "a quick decision"), ex("She won't be late.", "won't = will not")]),
          items: [ch("Next summer, we ___ going to travel to Abha.", ["are", "will", "is"]), ch("Look at those dark clouds! It ___ rain.", ["is going to", "goes to", "rained"]),
            ch("I think robots ___ help people in the future.", ["will", "are", "did"]), ch("She is going to ___ a cake tomorrow.", ["bake", "bakes", "baked"]),
            ch("I'm hungry. — I ___ make you a sandwich!", ["will", "am going", "did"], "A quick decision → <strong>will</strong>."), right(["They will win the match.", "They will wins the match.", "They wills win the match."]),
            fix("I going to read a book tonight.", "I am going to read a book tonight.", ["I'm going to read a book tonight."]), fix("Tomorrow, we will went to the zoo.", "Tomorrow, we will go to the zoo.", ["Tomorrow we will go to the zoo."]),
            build("We are going to plant a tree."), which("Which sentence is about the future?", ["I will call you tomorrow.", "I called you yesterday.", "I call you every day."])] },

        { id: "gr-5-2", title: "Comparatives", goal: "Compare two things.",
          learn: L("Comparing two things", "Short adjectives: add <strong>-er</strong> + <strong>than</strong>. Long adjectives: <strong>more</strong> + adjective + <strong>than</strong>. Special: good → <strong>better</strong>, bad → <strong>worse</strong>.",
            [ex("A camel is taller than a goat."), ex("Summer is hotter than winter.", "hot → hotter"), ex("This book is more interesting than that one."), ex("My painting is better than last time.")]),
          items: [ch("An elephant is ___ than a horse.", ["bigger", "big", "biggest"]), ch("Riyadh is ___ than Abha in summer.", ["hotter", "hoter", "more hot"]),
            ch("This puzzle is ___ than that one.", ["more difficult", "difficulter", "most difficult"]), ch("My handwriting is ___ now than last year.", ["better", "gooder", "more good"]),
            ch("A plane is faster ___ a car.", ["than", "then", "that"]), right(["Ali is taller than Omar.", "Ali is more tall than Omar.", "Ali is taller then Omar."]),
            fix("The sea is more big than the lake.", "The sea is bigger than the lake."), match("Match each adjective to its comparative.", [["happy", "happier"], ["good", "better"], ["beautiful", "more beautiful"], ["small", "smaller"]]),
            build("My sister is younger than me."), which("Which is correct?", ["Lemons are sourer than apples.", "Lemons are sour than apples.", "Lemons are more sour then apples."])] },

        { id: "gr-5-3", title: "Superlatives", goal: "Compare three or more things.",
          learn: L("The most!", "Short adjectives: <strong>the</strong> + adjective + <strong>-est</strong>. Long adjectives: <strong>the most</strong> + adjective. Special: <strong>the best</strong>, <strong>the worst</strong>.",
            [ex("The giraffe is the tallest animal."), ex("August is the hottest month."), ex("This is the most beautiful garden in town."), ex("She is the best player on the team.")]),
          items: [ch("The cheetah is the ___ land animal.", ["fastest", "faster", "most fast"]), ch("Mount Everest is the ___ mountain in the world.", ["highest", "higher", "most high"]),
            ch("That was the ___ film I have ever seen!", ["most exciting", "excitingest", "more exciting"]), ch("Khalid is the ___ player in our class.", ["best", "goodest", "better"]),
            ch("This is ___ smallest box.", ["the", "a", "than"]), right(["Jupiter is the biggest planet.", "Jupiter is the bigger planet.", "Jupiter is the most big planet."]),
            fix("She is the most tall girl in the class.", "She is the tallest girl in the class."),
            match("Match each adjective to its superlative.", [["big", "the biggest"], ["good", "the best"], ["easy", "the easiest"], ["important", "the most important"]]),
            build("This is the longest river."), which("Comparing ONE thing with ALL the others, we use…", ["a superlative (the -est)", "a comparative (-er than)", "a plural (-s)"])] },

        { id: "gr-5-4", title: "Conjunctions", goal: "Join ideas with and, but, so, because and or.",
          learn: L("Joining words", "<strong>and</strong> adds · <strong>but</strong> shows a difference · <strong>so</strong> shows a result · <strong>because</strong> gives a reason · <strong>or</strong> gives a choice.",
            [ex("I like apples and bananas."), ex("I like tea, but I don't like coffee."), ex("It was raining, so we stayed inside."), ex("I was tired because I ran a lot."), ex("Do you want juice or water?")]),
          items: [ch("I was hungry, ___ I ate a sandwich.", ["so", "but", "or"]), ch("She is small, ___ she is very strong.", ["but", "so", "because"]), ch("We stayed home ___ it was very hot.", ["because", "so", "or"]),
            ch("Would you like rice ___ bread?", ["or", "but", "so"]), ch("I have a cat ___ a rabbit.", ["and", "but", "because"]),
            ch("He didn't study, ___ he did not pass the test.", ["so", "because", "and"], "Not studying → the result: he did not pass. <strong>so</strong> shows a result."),
            which("Which word gives a reason?", ["because", "or", "and"]), build("I took an umbrella because it was raining."),
            match("Join the two halves.", [["I wanted to play,", "but it was dark."], ["It was cold,", "so I wore a coat."], ["I'm happy", "because it's my birthday."]]),
            right(["I like football, but my sister likes tennis.", "I like football, because my sister likes tennis."])] },

        { id: "gr-5-5", title: "Mixed Grammar Challenge", goal: "Use all your grammar skills.",
          learn: L("Grammar champion!", "Think about: <strong>When</strong> is it happening (tense)? <strong>Who</strong> is doing it (he/she → -s)? How many (plural)? Are we comparing?",
            [ex("Yesterday, she went to the library."), ex("He usually walks to school."), ex("Tomorrow, we are going to visit the museum."), ex("This is the best day ever!")]),
          items: [ch("Right now, my brothers ___ football.", ["are playing", "play", "played"]), ch("Last year, we ___ to Jeddah.", ["went", "go", "will go"]), ch("My dad ___ to work every day.", ["drives", "drive", "driving"]),
            ch("Next week, I ___ visit my grandmother.", ["am going to", "went to", "visited"]), ch("A cheetah is ___ than a lion.", ["faster", "fastest", "more fast"]),
            right(["She doesn't like cold weather.", "She don't like cold weather.", "She doesn't likes cold weather."]),
            fix("There is three apples on the table.", "There are three apples on the table."), fix("Yesterday I see a big camel.", "Yesterday I saw a big camel.", ["Yesterday, I saw a big camel."]),
            build("We are going to win the competition."), which("Which sentence is correct?", ["The children are happy because it is Friday.", "The children is happy because it is Friday.", "The childs are happy because it is Friday."])] }
      ] }
    ]
  });
})();
