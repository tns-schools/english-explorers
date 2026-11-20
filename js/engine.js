/* =====================================================================
   TNS English Explorers — Activity engine
   ---------------------------------------------------------------------
   One engine runs every activity set on the site:
       Learn → (examples) → Practice, one question at a time → Results
   Question types (see docs/CONTENT-GUIDE.md for the full format):
     SCORED       choice · type · letters · words · match
     PRACTICE     speak · dialogue · write   (never given a correct/incorrect score)
   Scores use ONLY scored questions. Practice tasks count as practice.
   Student answers and writing stay in memory on this page only.
   ===================================================================== */
(function () {
  "use strict";
  var SCORED = { choice: 1, type: 1, letters: 1, words: 1, match: 1 };
  var PRACTICE = { speak: 1, dialogue: 1, write: 1 };
  var PRAISE = ["Great job!", "Well done!", "Excellent work!", "Super!", "You got it!", "Fantastic!"];
  var RETRY = ["Good try!", "Nice effort!", "Keep going!"];
  var CHECKLIST = ["I used capital letters.", "I used full stops.", "I wrote complete sentences.", "I checked my spelling.", "My ideas are clear."];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function optText(o) { return typeof o === "string" ? o : o.t; }
  function A(text, opts) { return window.TNSAudio.button(text, opts); }
  function V(vis, alt, cls) { return window.TNSVisual.html(vis, alt, cls); }
  function soundBtn(sound) {
    var rec = (window.TNS && window.TNS.RECORDED_SOUNDS) || [];
    if (!sound || rec.indexOf(sound) < 0) return "";
    return A("", { src: TNSAudioId.soundPath(sound), label: "Hear the sound", aria: "Hear the sound /" + sound + "/", small: true, cls: "sound" });
  }
  /* Normalise typed answers. Capitals and end punctuation are ignored unless the item tests them. */
  function norm(s, item) {
    s = String(s || "").replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
    if (!(item.check && item.check.punct)) s = s.replace(/[.!?,;:]+$/g, "").replace(/\s+([.!?,;:])/g, "$1");
    if (!(item.check && item.check.case)) s = s.toLowerCase();
    return s;
  }
  function isScored(it) { return !!SCORED[it.type]; }

  function run(root, set, ctx) {
    var items = set.items || [];
    var hasIntro = !!((set.learn && set.learn.length) || set.passage || set.clip);
    var READ_SRC = set.passage ? "audio/reading/" + set.id + ".mp3" : null;
    var CLIP_SRC = set.clip ? "audio/listening/" + set.id + ".mp3" : null;
    var st = { phase: hasIntro ? "learn" : "practice", i: 0, answers: [], locked: false, started: false };
    var scoredTotal = items.filter(isScored).length;

    function header() {
      var pct = st.phase === "practice" ? Math.round(100 * st.i / items.length) : st.phase === "results" ? 100 : 0;
      return '<div class="act-head">' +
        '<p class="act-crumb">' + esc(ctx.sectionName) + " · Level " + ctx.level + " — " + esc(ctx.levelName) + "</p>" +
        "<h1>" + esc(set.title) + "</h1>" +
        (set.goal ? '<p class="act-goal">' + esc(set.goal) + "</p>" : "") +
        
        '<div class="bar" role="progressbar" aria-label="Activity progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div></div>';
    }
    function render() {
      window.TNSAudio.stop();
      var h = header();
      if (st.phase === "learn") h += renderLearn();
      else if (st.phase === "practice") h += renderItem(items[st.i]);
      else h += renderResults();
      root.innerHTML = h;
      bind();
      var f = root.querySelector("[data-focus]") || root.querySelector("h1");
      if (f) { f.setAttribute("tabindex", "-1"); try { f.focus({ preventScroll: false }); } catch (e) { f.focus(); } }
    }

    /* ---------- Learn ---------- */
    function passageHtml(p) {
      return '<div class="passage-head"><h2 class="passage-title">' + esc(p.title || set.title) + "</h2>" +
        A("", { src: READ_SRC, big: true, label: "Listen to the story", aria: "Listen to the story: " + (p.title || set.title) }) + "</div>" +
        (p.vis ? '<div class="q-vis">' + V(p.vis, p.visAlt || "", "big") + "</div>" : "") +
        '<div class="passage-text">' + p.paras.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") + "</div>";
    }
    function renderLearn() {
      var h = '<section class="learn" aria-label="Learn">';
      if (set.passage) {
        h += '<div class="card passage">' + passageHtml(set.passage) + "</div>";
        if (set.passage.words && set.passage.words.length) h += '<div class="card"><h3>Words to know</h3><p>' + set.passage.words.map(function (w) { return '<span class="chip">' + esc(w) + "</span>"; }).join(" ") + "</p></div>";
        h += '<p class="tip"><span aria-hidden="true">📖</span> Read the story. You can listen as you read. Then answer the questions. You can look at the story again during the questions.</p>';
      }
      if (set.clip) {
        h += '<div class="card learn-card"><h2>Before you listen</h2>' + (set.clip.intro ? '<p class="learn-text">' + esc(set.clip.intro) + "</p>" : "") +
          (set.clip.words && set.clip.words.length ? '<p class="wb-h">Words to know</p><p>' + set.clip.words.map(function (w) { return '<span class="chip">' + esc(w) + "</span>"; }).join(" ") + "</p>" : "") +
          '<ol class="steps"><li>Read the first question.</li><li>Tap <strong>Listen</strong>. You can listen again as many times as you need.</li><li>Choose your answer.</li></ol>' +
          '<p class="small muted">You can read the words you heard (the transcript) after you finish.</p></div>';
      }
      (set.learn || []).forEach(function (c) {
        h += '<div class="card learn-card">' + (c.title ? "<h2>" + esc(c.title) + "</h2>" : "") +
          (c.text ? '<p class="learn-text">' + c.text + "</p>" : "");
        if (c.examples && c.examples.length) {
          h += '<ul class="examples">';
          c.examples.forEach(function (x) {
            var say = x.say === false ? null : (x.say || x.t);
            h += '<li class="example' + (x.letter ? " letter-ex" : "") + '">' + (x.letter && window.TNSLetters ? window.TNSLetters.html(x.letter) : "") + (x.vis ? V(x.vis, x.alt || x.t, "ex-vis") : "") +
              '<span class="ex-word">' + (x.html || esc(x.t)) + "</span>" +
              (x.note ? '<span class="ex-note">' + esc(x.note) + "</span>" : "") +
              (x.sent ? '<span class="ex-sent">“' + esc(x.sent) + "”</span>" : "") +
              '<span class="ex-btns">' + (say ? A(say, { small: true, voice: x.voice, ariaText: x.t }) : "") + soundBtn(x.sound) + "</span></li>";
          });
          h += "</ul>";
        }
        if (c.tip) h += '<p class="tip"><span aria-hidden="true">💡</span> ' + c.tip + "</p>";
        h += "</div>";
      });
      h += '<div class="btn-row"><button class="btn primary big" type="button" data-act="start" data-focus>' + (set.passage || set.clip ? "Start the Questions" : "Start Practice") + ' <span aria-hidden="true">→</span></button></div></section>';
      return h;
    }

    /* ---------- One question ---------- */
    function promptBlock(it) {
      var h = "";
      if (it.vis) h += '<div class="q-vis">' + V(it.vis, it.visAlt || "", "big") + "</div>";
      if (it.prompt) h += '<p class="q-prompt">' + it.promptHtml + "</p>";
      if (it.text) h += '<div class="q-text">' + it.text + "</div>";
      var btns = "";
      if (it.say || it.src) btns += A(it.say || "", { src: it.src, voice: it.voice, big: true, label: it.listenLabel || "Listen", ariaText: it.hide ? "" : it.say });
      if ((it.slow || (it.type === "speak" && it.slowAuto !== false)) && it.say) btns += A(it.say, { voice: "fs", label: "Slow", cls: "slow", ariaText: "slow" });
      btns += soundBtn(it.sound);
      if (btns) h += '<div class="q-audio">' + btns + "</div>";
      return h;
    }
    function renderItem(it) {
      if (it.prompt && !it.promptHtml) it.promptHtml = esc(it.prompt).replace(/_{2,}|＿/g, '<span class="blank" aria-label="blank">___</span>');
      var n = st.i + 1, h = '<section class="q card" aria-labelledby="qh">';
      h += '<p class="q-count">' + (isScored(it) ? "Question" : "Practice") + " " + n + " of " + items.length + "</p>";
      if (set.passage) h += '<details class="again"><summary>📖 Read the story again</summary>' + passageHtml(set.passage) + "</details>";
      h += '<h2 id="qh" class="q-title" data-focus>' + esc(it.q) + "</h2>";
      if (set.clip && !it.say && !it.src) h += '<div class="q-audio">' + A("", { src: CLIP_SRC, big: true, label: set.clip.label || "Listen", aria: "Listen to the recording" }) + "</div>";
      h += promptBlock(it);
      var t = it.type;
      if (t === "choice") h += renderChoice(it);
      else if (t === "type") h += '<form class="type-form" data-act="typeform" autocomplete="off"><label class="sr-only" for="typeIn">Your answer</label>' +
        '<input id="typeIn" class="type-in' + (it.long ? " long" : "") + '" type="text" inputmode="text" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="Type here">' +
        '<button class="btn primary" type="submit" data-act="check">Check</button></form>';
      else if (t === "letters" || t === "words") h += renderTiles(it);
      else if (t === "match") h += renderMatch(it);
      else if (t === "speak") h += renderSpeak(it);
      else if (t === "dialogue") h += renderDialogue(it);
      else if (t === "write") h += renderWrite(it);
      h += '<div class="feedback" id="fb" aria-live="polite"></div><div class="btn-row next-row" id="nextRow"></div></section>';
      h += '<p class="quit"><a href="' + esc(ctx.backHref) + '">Leave this activity</a></p>';
      return h;
    }
    function renderChoice(it) {
      var opts = it.fixed ? it.options.slice() : shuffle(it.options);
      it._opts = opts;
      var pics = opts.some(function (o) { return typeof o !== "string" && o.vis; });
      var h = '<div class="choices' + (pics ? " pics" : "") + (opts.length === 2 ? " two" : "") + '" role="group" aria-label="Answer choices">';
      opts.forEach(function (o, k) {
        var t = optText(o), lab = typeof o !== "string" && o.hideLabel;
        h += '<div class="choice-wrap"><button type="button" class="choice" data-act="choose" data-k="' + k + '" data-t="' + esc(t) + '"' + (lab ? ' aria-label="' + esc(o.alt || t) + '"' : "") + ">" +
          (typeof o !== "string" && o.vis ? V(o.vis, lab ? "" : (o.alt || t), "opt-vis") : "") +
          (lab ? "" : '<span class="opt-t">' + esc(t) + "</span>") + '<span class="mark" aria-hidden="true"></span></button>' +
          (it.sayOptions ? A(typeof o === "string" ? o : (o.say || t), { small: true, label: "Listen", ariaText: t }) : "") + "</div>";
      });
      return h + "</div>";
    }
    function renderTiles(it) {
      var parts = it.type === "letters" ? it.answer.replace(/\s/g, "").split("") : it.answer.split(" ");
      var extra = it.extra ? (it.type === "letters" ? it.extra.split("") : it.extra) : [];
      it._tiles = shuffle(parts.concat(extra));
      it._picked = [];
      var h = '<div class="build" aria-live="polite"><p class="sr-only">Your answer so far:</p><div class="slots' + (it.type === "words" ? " words" : "") + '" id="slots"></div></div>' +
        '<div class="tiles' + (it.type === "words" ? " words" : "") + '" role="group" aria-label="' + (it.type === "letters" ? "Letters" : "Words") + ' to tap">';
      it._tiles.forEach(function (x, k) { h += '<button type="button" class="tile" data-act="tile" data-k="' + k + '">' + esc(x) + "</button>"; });
      h += '</div><div class="btn-row"><button type="button" class="btn ghost" data-act="undo">↶ Undo</button><button type="button" class="btn ghost" data-act="clear">Clear</button><button type="button" class="btn primary" data-act="check">Check</button></div>';
      return h;
    }
    function renderMatch(it) {
      it._left = it.pairs.map(function (p, k) { return { k: k, v: p[0] }; });
      it._right = shuffle(it.pairs.map(function (p, k) { return { k: k, v: p[1] }; }));
      it._links = {}; it._sel = null;
      function cell(side, x, idx) {
        var v = x.v, t = typeof v === "string" ? v : v.t, vis = typeof v === "string" ? null : v.vis, hide = typeof v !== "string" && v.hideLabel;
        return '<button type="button" class="m-item" data-act="m" data-side="' + side + '" data-i="' + idx + '" data-t="' + esc(t) + '"' + (hide ? ' aria-label="' + esc(v.alt || t) + '"' : "") + ">" +
          (vis ? V(vis, hide ? "" : (v.alt || t), "opt-vis") : "") + (hide ? "" : '<span class="opt-t">' + esc(t) + "</span>") + '<span class="m-badge" aria-hidden="true"></span></button>';
      }
      var h = '<p class="small muted">Tap one on the left, then its partner on the right. Tap again to undo.</p><div class="match"><div class="m-col">';
      it._left.forEach(function (x, i) { h += cell("L", x, i); });
      h += '</div><div class="m-col">';
      it._right.forEach(function (x, i) { h += cell("R", x, i); });
      return h + '</div></div><div class="btn-row"><button type="button" class="btn primary" data-act="check">Check</button></div>';
    }
    function renderSpeak(it) {
      var h = '<div class="speak">';
      if (it.syll) {
        h += '<p class="syll" aria-label="Syllables: ' + esc(it.syll.join(" - ")) + (it.stress != null ? ". Stress on " + esc(it.syll[it.stress]) : "") + '">';
        it.syll.forEach(function (s, k) { h += (k ? '<span class="dot" aria-hidden="true">·</span>' : "") + '<span class="' + (k === it.stress ? "stress" : "") + '">' + esc(s) + "</span>"; });
        h += "</p>" + (it.stress != null ? '<p class="small muted">The <strong class="stress-key">big part</strong> is said a little louder and longer.</p>' : "");
      }
      h += '<ol class="steps"><li>Listen.</li><li>Say it ' + (it.times || 3) + " times.</li><li>Tap the green button when you finish.</li></ol>";
      return h + '<div class="btn-row"><button type="button" class="btn go big" data-act="practiced">✔ I practiced saying it</button></div></div>';
    }
    function renderDialogue(it) {
      var all = it.lines.map(function (l) { return TNSAudioId.DIRS[l.voice] ? l.voice : "f"; });
      var h = '<div class="dialogue"><div class="btn-row"><button type="button" class="btn primary" data-act="playall" aria-pressed="false">▶ Listen to the whole conversation</button></div><ol class="lines">';
      it.lines.forEach(function (l, k) {
        var mine = it.practice && l.sp === it.practice;
        h += '<li class="line' + (mine ? " mine" : "") + '" data-line="' + k + '"><span class="sp">' + esc(l.sp) + (mine ? ' <span class="you">(You)</span>' : "") + "</span>" +
          '<span class="lt">' + esc(l.t) + "</span>" + A(l.t, { small: true, voice: all[k], ariaText: l.sp + ": " + l.t }) + "</li>";
      });
      h += "</ol>" + (it.practice ? '<p class="tip"><span aria-hidden="true">🎭</span> Now practice <strong>' + esc(it.practice) + "</strong>'s lines aloud. Listen to the other person, then say your line.</p>" : "");
      return h + '<div class="btn-row"><button type="button" class="btn go big" data-act="practiced">✔ I practiced the conversation</button></div></div>';
    }
    function renderWrite(it) {
      var h = '<div class="write">';
      if (it.words && it.words.length) h += '<div class="word-bank"><p class="wb-h">Useful words</p><p>' + it.words.map(function (w) { return '<span class="chip">' + esc(w) + "</span>"; }).join(" ") + "</p></div>";
      if (it.starters && it.starters.length) h += '<div class="starters"><p class="wb-h">Sentence starters</p><ul>' + it.starters.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
      if (it.frame) h += '<div class="frame"><p class="wb-h">Writing frame</p><p>' + esc(it.frame).replace(/_{2,}/g, '<span class="blank">______</span>') + "</p></div>";
      h += '<label class="wb-h" for="writeBox">Your writing <span class="small muted">(it stays on this screen only — it is not saved or sent)</span></label>' +
        '<textarea id="writeBox" class="write-box" rows="' + (it.rows || 5) + '" spellcheck="true" placeholder="Write here, or write in your notebook."></textarea>';
      if (it.model) h += '<details class="model"><summary>Show a model answer</summary><p>' + esc(it.model) + "</p></details>";
      var cl = it.checklist || CHECKLIST;
      h += '<fieldset class="checklist"><legend>Check your writing</legend>' + cl.map(function (c, k) { return '<label><input type="checkbox" data-cl="' + k + '"> ' + esc(c) + "</label>"; }).join("") + "</fieldset>";
      return h + '<div class="btn-row"><button type="button" class="btn go big" data-act="practiced">✔ I finished my writing</button></div></div>';
    }

    /* ---------- Checking ---------- */
    function feedback(ok, it, given, correctText) {
      var fb = root.querySelector("#fb");
      var h = '<div class="fb ' + (ok ? "ok" : "no") + '"><p class="fb-h"><span class="fb-ic" aria-hidden="true">' + (ok ? "✔" : "➜") + "</span> " +
        (ok ? pick(PRAISE) : pick(RETRY) + " Let's look at the correct answer.") + "</p>";
      if (!ok && correctText != null) h += '<p>The correct answer is: <strong class="correct-ans">' + esc(correctText) + "</strong></p>";
      if (it.explain) h += '<p class="fb-ex">' + it.explain + "</p>";
      fb.innerHTML = h + "</div>";
      showNext();
    }
    function showNext() {
      var last = st.i === items.length - 1;
      root.querySelector("#nextRow").innerHTML = '<button type="button" class="btn primary big" data-act="next">' + (last ? "See My Results ★" : "Next →") + "</button>";
      var b = root.querySelector('[data-act="next"]'); if (b) b.focus();
    }
    function record(it, ok, given, correctText) {
      st.answers[st.i] = { scored: true, ok: ok, given: given, correct: correctText };
      st.locked = true;
      root.querySelectorAll(".q button:not([data-audio]), .q input, .q textarea").forEach(function (b) { if (b.getAttribute("data-act") !== "next") b.disabled = true; });
      feedback(ok, it, given, correctText);
    }
    function check() {
      if (st.locked) return;
      var it = items[st.i];
      if (it.type === "type") {
        var v = root.querySelector("#typeIn").value;
        if (!v.trim()) { hint("Type your answer first."); return; }
        var good = [it.answer].concat(it.accept || []).map(function (a) { return norm(a, it); });
        var ok = good.indexOf(norm(v, it)) >= 0;
        root.querySelector("#typeIn").classList.add(ok ? "right" : "wrong");
        record(it, ok, v.trim(), it.answer);
      } else if (it.type === "letters" || it.type === "words") {
        if (!it._picked.length) { hint("Tap the " + (it.type === "letters" ? "letters" : "words") + " first."); return; }
        var built = it._picked.map(function (k) { return it._tiles[k]; }).join(it.type === "letters" ? "" : " ");
        var target = it.type === "letters" ? it.answer.replace(/\s/g, "") : it.answer;
        var okk = it.type === "letters" ? (it.check && it.check.case ? built === target : built.toLowerCase() === target.toLowerCase()) : norm(built, { check: { punct: true, case: true } }) === norm(target, { check: { punct: true, case: true } });
        root.querySelector("#slots").classList.add(okk ? "right" : "wrong");
        record(it, okk, built, target);
      } else if (it.type === "match") {
        var n = it._left.length, linked = Object.keys(it._links).length;
        if (linked < n) { hint("Match all " + n + " pairs first."); return; }
        var allOk = true;
        Object.keys(it._links).forEach(function (li) {
          var ri = it._links[li], good2 = it._left[li].k === it._right[ri].k; if (!good2) allOk = false;
          var L = root.querySelector('[data-side="L"][data-i="' + li + '"]'), R = root.querySelector('[data-side="R"][data-i="' + ri + '"]');
          [L, R].forEach(function (b) { b.classList.add(good2 ? "right" : "wrong"); b.querySelector(".m-badge").textContent = good2 ? "✔" : "✖"; });
        });
        var key = it.pairs.map(function (p) { return (typeof p[0] === "string" ? p[0] : (p[0].alt || p[0].t)) + " → " + (typeof p[1] === "string" ? p[1] : (p[1].alt || p[1].t)); }).join(";  ");
        record(it, allOk, "", key);
      }
    }
    function hint(msg) { var fb = root.querySelector("#fb"); fb.innerHTML = '<p class="hint">' + esc(msg) + "</p>"; }
    function drawSlots(it) {
      var s = root.querySelector("#slots");
      s.innerHTML = it._picked.map(function (k, pos) { return '<button type="button" class="slot" data-act="unpick" data-pos="' + pos + '" aria-label="Remove ' + esc(it._tiles[k]) + '">' + esc(it._tiles[k]) + "</button>"; }).join("") ||
        '<span class="slot-empty">' + (it.type === "letters" ? "Tap the letters in order" : "Tap the words in order") + "</span>";
      root.querySelectorAll(".tile").forEach(function (b) { var used = it._picked.indexOf(+b.getAttribute("data-k")) >= 0; b.disabled = used; b.classList.toggle("used", used); });
    }
    function drawLinks(it) {
      var colors = ["c1", "c2", "c3", "c4", "c5", "c6"];
      root.querySelectorAll(".m-item").forEach(function (b) { b.classList.remove("sel", "c1", "c2", "c3", "c4", "c5", "c6"); b.querySelector(".m-badge").textContent = ""; b.setAttribute("aria-pressed", "false"); });
      var n = 0;
      Object.keys(it._links).forEach(function (li) {
        var c = colors[n % colors.length]; n++;
        var L = root.querySelector('[data-side="L"][data-i="' + li + '"]'), R = root.querySelector('[data-side="R"][data-i="' + it._links[li] + '"]');
        [L, R].forEach(function (b) { b.classList.add(c); b.querySelector(".m-badge").textContent = n; b.setAttribute("aria-pressed", "true"); });
      });
      if (it._sel) { var s = root.querySelector('[data-side="' + it._sel.side + '"][data-i="' + it._sel.i + '"]'); if (s) { s.classList.add("sel"); s.setAttribute("aria-pressed", "true"); } }
    }
    function matchTap(it, side, i) {
      var links = it._links;
      var linkedL = side === "L" ? (links[i] !== undefined ? i : null) : Object.keys(links).filter(function (k) { return links[k] === i; })[0];
      if (linkedL != null && linkedL !== undefined) { delete links[linkedL]; it._sel = null; drawLinks(it); return; }
      if (!it._sel || it._sel.side === side) { it._sel = { side: side, i: i }; drawLinks(it); return; }
      var l = side === "L" ? i : it._sel.i, r = side === "R" ? i : it._sel.i;
      links[l] = r; it._sel = null; drawLinks(it);
    }

    /* Play every line of a conversation in order. */
    function playAll(btn) {
      var it = items[st.i], k = 0;
      if (btn.getAttribute("aria-pressed") === "true") { window.TNSAudio.stop(); return; }
      function done() { btn.setAttribute("aria-pressed", "false"); btn.textContent = "▶ Listen to the whole conversation"; root.querySelectorAll(".line").forEach(function (l) { l.classList.remove("now"); }); }
      function next() {
        if (k >= it.lines.length) { done(); return; }
        var l = it.lines[k], li = root.querySelector('[data-line="' + k + '"]');
        root.querySelectorAll(".line").forEach(function (x) { x.classList.remove("now"); }); if (li) li.classList.add("now");
        k++;
        window.TNSAudio.play(TNSAudioId.path(l.t, TNSAudioId.DIRS[l.voice] ? l.voice : "f"), null, function (state) { if (state === "done") next(); else done(); });
        btn.setAttribute("aria-pressed", "true"); btn.textContent = "■ Stop";
      }
      next();
    }

    /* ---------- Results ---------- */
    function finish() {
      var correct = 0, scored = 0, speak = false, write = false;
      items.forEach(function (it, k) {
        var a = st.answers[k];
        if (isScored(it)) { scored++; if (a && a.ok) correct++; }
        if (it.type === "speak" || it.type === "dialogue") speak = true;
        if (it.type === "write") write = true;
      });
      if (ctx.mode === "check") { ctx.onFinish(items.map(function (it, k) { return { level: it.level, ok: !!(st.answers[k] && st.answers[k].ok) }; })); return; }
      var res = window.TNSProgress.complete(set.id, ctx.section, { scored: scored, correct: correct, speak: speak, write: write });
      st.result = { correct: correct, scored: scored, stars: res.stars, pct: res.pct, first: res.first, newAch: res.newAch };
      if (window.TNSAnalytics) window.TNSAnalytics.track({ t: "activity_complete", sec: ctx.section, lvl: ctx.level, act: set.id, attempt: res.first ? "first" : "repeat", scored: scored, correct: correct });
      st.phase = "results"; render();
    }
    function renderResults() {
      var r = st.result, h = '<section class="results card" aria-labelledby="rh">';
      h += '<h2 id="rh" data-focus>' + (r.scored ? (r.pct >= 90 ? "Amazing work!" : r.pct >= 70 ? "Great job!" : "You finished! Keep practicing!") : "Practice complete! Well done!") + "</h2>";
      h += '<p class="stars" aria-label="' + r.stars + ' out of 3 stars">' + [1, 2, 3].map(function (n) { return '<span class="' + (n <= r.stars ? "on" : "off") + '" aria-hidden="true">★</span>'; }).join("") + "</p>";
      if (r.scored) h += '<p class="score"><strong>' + r.correct + " out of " + r.scored + "</strong> correct · " + r.pct + "%</p>";
      var practice = items.length - r.scored;
      if (practice > 0) h += '<p class="small muted">' + (r.scored ? "Your score counts the " + r.scored + " checked questions. " : "") + "You also finished " + practice + " practice task" + (practice > 1 ? "s" : "") + ".</p>";
      if (r.newAch && r.newAch.length) h += '<div class="new-ach" role="status">' + r.newAch.map(function (a) { return '<p><span aria-hidden="true">' + a.icon + "</span> New achievement: <strong>" + esc(a.name) + "</strong></p>"; }).join("") + "</div>";
      h += '<div class="btn-row center">' + (r.scored ? '<button type="button" class="btn ghost" data-act="review">Review Answers</button>' : "") +
        '<button type="button" class="btn ghost" data-act="again">↻ Try Again</button><a class="btn primary" href="' + esc(ctx.backHref) + '">Continue Exploring →</a></div>';
      h += '<div id="review"></div>';
      if (set.after) h += '<div class="after">' + set.after + "</div>";
      if (set.clip) h += '<details class="after transcript"><summary>Show the transcript (the words you heard)</summary><div class="lines">' +
        set.clip.lines.map(function (l) { return '<p class="tline">' + (l.sp ? "<strong>" + esc(l.sp) + ":</strong> " : "") + esc(l.t) + "</p>"; }).join("") + "</div>" +
        '<div class="btn-row">' + A("", { src: CLIP_SRC, label: "Listen again", aria: "Listen again" }) + "</div></details>";
      return h + "</section>";
    }
    function renderReview() {
      var h = '<h3>Your answers</h3><ol class="review">';
      items.forEach(function (it, k) {
        var a = st.answers[k];
        if (!isScored(it)) return;
        var shown = it.hide ? (it.q) : (it.prompt || it.q);
        h += '<li class="' + (a && a.ok ? "ok" : "no") + '"><span class="rv-ic" aria-hidden="true">' + (a && a.ok ? "✔" : "➜") + "</span> <span class='sr-only'>" + (a && a.ok ? "Correct." : "Not correct.") + "</span> " +
          "<span>" + esc(shown) + (it.hide && it.say ? " <em>(" + esc(it.say) + ")</em>" : "") + "</span>" +
          (a && a.given ? '<br><span class="small">Your answer: ' + esc(a.given) + "</span>" : "") +
          (a && !a.ok ? '<br><span class="small">Correct answer: <strong>' + esc(a.correct) + "</strong></span>" : "") + "</li>";
      });
      return h + "</ol>";
    }

    /* ---------- Events ---------- */
    function bind() {
      root.onclick = function (ev) {
        var b = ev.target.closest("[data-act]"); if (!b || b.disabled || b.tagName === "FORM") return;
        var act = b.getAttribute("data-act"), it = items[st.i];
        if (act === "start") { st.phase = "practice"; st.i = 0; startEvent(); render(); }
        else if (act === "choose") {
          if (st.locked) return;
          var o = it._opts[+b.getAttribute("data-k")], t = optText(o), ok = t === it.answer;
          b.classList.add(ok ? "right" : "wrong"); b.querySelector(".mark").textContent = ok ? "✔" : "✖";
          if (!ok) root.querySelectorAll(".choice").forEach(function (c) { if (optText(it._opts[+c.getAttribute("data-k")]) === it.answer) { c.classList.add("right", "reveal"); c.querySelector(".mark").textContent = "✔"; } });
          var ansOpt = it.options.filter(function (x) { return optText(x) === it.answer; })[0];
          var ansLabel = it.answerLabel || (ansOpt && typeof ansOpt !== "string" && ansOpt.hideLabel ? (ansOpt.alt || ansOpt.t) : it.answer);
          record(it, ok, typeof o !== "string" && o.hideLabel ? (o.alt || t) : t, ansLabel);
        }
        else if (act === "tile") { if (st.locked) return; it._picked.push(+b.getAttribute("data-k")); drawSlots(it); root.querySelector("#fb").innerHTML = ""; }
        else if (act === "unpick") { if (st.locked) return; it._picked.splice(+b.getAttribute("data-pos"), 1); drawSlots(it); }
        else if (act === "undo") { if (st.locked) return; it._picked.pop(); drawSlots(it); }
        else if (act === "clear") { if (st.locked) return; it._picked = []; drawSlots(it); }
        else if (act === "m") { if (st.locked) return; matchTap(it, b.getAttribute("data-side"), +b.getAttribute("data-i")); }
        else if (act === "check") { ev.preventDefault(); check(); }
        else if (act === "practiced") {
          if (st.locked) return;
          st.answers[st.i] = { scored: false, done: true }; st.locked = true; b.disabled = true;
          root.querySelector("#fb").innerHTML = '<div class="fb ok"><p class="fb-h"><span class="fb-ic" aria-hidden="true">✔</span> ' + pick(["Great practice!", "Well done!", "Super speaking!", "Keep it up!"]) + "</p>" + (it.type === "write" ? "<p>Remember: you can always improve your writing. Read it one more time.</p>" : "") + "</div>";
          showNext();
        }
        else if (act === "playall") playAll(b);
        else if (act === "next") { if (st.i < items.length - 1) { st.i++; st.locked = false; render(); } else finish(); }
        else if (act === "review") { var rv = root.querySelector("#review"); rv.innerHTML = rv.innerHTML ? "" : renderReview(); }
        else if (act === "again") { st = { phase: hasIntro ? "learn" : "practice", i: 0, answers: [], locked: false, started: false }; if (st.phase === "practice") startEvent(); render(); }
      };
      var form = root.querySelector('[data-act="typeform"]');
      if (form) form.addEventListener("submit", function (ev) { ev.preventDefault(); check(); });
      if (st.phase === "practice") { var it = items[st.i]; if (it.type === "letters" || it.type === "words") drawSlots(it); }
    }
    function startEvent() {
      if (st.started || ctx.mode === "check") return; st.started = true;
      if (window.TNSAnalytics) window.TNSAnalytics.track({ t: "activity_start", sec: ctx.section, lvl: ctx.level, act: set.id });
    }

    if (st.phase === "practice") startEvent();
    render();
    return { stop: function () { window.TNSAudio.stop(); } };
  }

  window.TNSEngine = { run: run, SCORED: SCORED, PRACTICE: PRACTICE, norm: norm, isScored: isScored };
})();
