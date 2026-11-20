/* =====================================================================
   TNS English Explorers — FIND YOUR LEVEL (optional starting-point check)
   18 short questions that get a little harder (Levels 1 → 5).
   It only SUGGESTS a place to start. It does not lock anything, and
   students can choose any level in any section at any time.
   It is not a standardized or formally validated placement test.
   ===================================================================== */
window.TNS = window.TNS || {};
window.TNS.CHECK = {
  id: "check",
  title: "Find Your Level",
  goal: "A short, optional check to help you choose where to start.",
  items: [
    /* Level 1: letters, sounds, simple words */
    { level: 1, type: "choice", q: "Listen. Which letter do you hear?", say: "The letter B.", hide: true, options: ["B", "D", "P"], answer: "B" },
    { level: 1, type: "choice", q: "Listen. What is the first sound?", say: "moon", hide: true, vis: "🌙", visAlt: "picture", options: ["m", "n", "w"], answer: "m" },
    { level: 1, type: "choice", q: "Listen. Choose the right picture.", say: "a fish", hide: true, options: [{ t: "fish", vis: "🐟", alt: "fish", hideLabel: true }, { t: "bird", vis: "🐦", alt: "bird", hideLabel: true }, { t: "cat", vis: "🐱", alt: "cat", hideLabel: true }], answer: "fish" },
    { level: 1, type: "choice", q: "How many?  ⭐⭐⭐", options: ["three", "two", "four"], answer: "three" },
    /* Level 2: short vowels, spelling, everyday words, simple grammar */
    { level: 2, type: "choice", q: "Listen. Which word do you hear?", say: "pen", hide: true, options: ["pen", "pin", "pan"], answer: "pen" },
    { level: 2, type: "letters", q: "Listen. Tap the letters to spell the word.", say: "dog", hide: true, vis: "🐶", visAlt: "picture", answer: "dog", extra: "a" },
    { level: 2, type: "choice", q: "Your mother's mother is your…", options: ["grandmother", "sister", "aunt"], answer: "grandmother" },
    { level: 2, type: "choice", q: "Choose the correct word.", prompt: "They ___ my friends.", options: ["are", "is", "am"], answer: "are" },
    /* Level 3: digraphs, present tense, short reading, listening */
    { level: 3, type: "type", q: "Listen and type the word.", say: "ship", hide: true, answer: "ship" },
    { level: 3, type: "choice", q: "Choose the correct word.", prompt: "She ___ to school every day.", options: ["walks", "walk", "walking"], answer: "walks" },
    { level: 3, type: "choice", q: "Read. Then answer the question.", text: "<p class=\"mini-read\">Sami has a small garden. He grows tomatoes and mint. He waters the plants every evening.</p>", options: ["every evening", "every morning", "once a week"], answer: "every evening", explain: "When does Sami water the plants? <em>every evening</em>." },
    { level: 3, type: "choice", q: "Listen. Where is the cat?", say: "The cat is under the table.", hide: true, options: ["under the table", "on the table", "next to the table"], answer: "under the table" },
    /* Level 4: past tense, vocabulary in context, longer listening */
    { level: 4, type: "choice", q: "Choose the correct word.", prompt: "Yesterday, we ___ to the museum.", options: ["went", "go", "goes"], answer: "went" },
    { level: 4, type: "choice", q: "Read. What does \"exhausted\" mean?", text: "<p class=\"mini-read\">After running for an hour, Lina was exhausted. She sat down and drank some water.</p>", options: ["very tired", "very happy", "very fast"], answer: "very tired" },
    { level: 4, type: "choice", q: "Listen. Why is the boy late?", say: "Sorry I'm late. I missed the bus, so I walked to school.", hide: true, voice: "m", options: ["He missed the bus.", "He was sick.", "He forgot his bag."], answer: "He missed the bus." },
    /* Level 5: inference, comparatives, academic reading */
    { level: 5, type: "choice", q: "Read. How does Faris probably feel?", text: "<p class=\"mini-read\">Faris looked at his test. He had practiced every day for two weeks, and now he saw the score: 20 out of 20. He could not stop smiling.</p>", options: ["proud", "worried", "bored"], answer: "proud" },
    { level: 5, type: "choice", q: "Choose the correct word.", prompt: "Jupiter is the ___ planet in our solar system.", options: ["largest", "larger", "most large"], answer: "largest" },
    { level: 5, type: "choice", q: "Read. What is the main idea?", text: "<p class=\"mini-read\">Bees carry pollen from flower to flower. This helps plants make fruit and seeds. Without bees, many of the foods we eat would be hard to grow.</p>", options: ["Bees are very important for growing food.", "Bees make loud noises.", "Flowers are colorful."], answer: "Bees are very important for growing food." }
  ]
};
