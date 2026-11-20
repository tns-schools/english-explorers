/* =====================================================================
   TNS English Explorers — Audio manager
   ---------------------------------------------------------------------
   Based on the approach proven in NVS English Quest, with these rules:
   • ONE shared <audio> element for the whole site (most reliable on
     iPhone/iPad: it is unlocked by the first tap and then reused).
   • Audio only starts from a tap or click. Nothing autoplays.
   • Starting a new recording always stops the previous one (no overlap).
   • Leaving a page stops audio (App calls TNSAudio.stop()).
   • Only prerecorded MP3 files. No device text-to-speech fallback.
   • If a file cannot play, the button says "Try again" — learning goes on.
   Any button with data-audio="<path>" becomes a play/stop button.
   Helpers build those buttons: TNSAudio.button(text, opts).
   ===================================================================== */
(function () {
  "use strict";
  var el = null, current = null, token = 0;

  function status(msg) { var s = document.getElementById("audioStatus"); if (s) s.textContent = msg; }
  function player() {
    if (!el) {
      el = document.createElement("audio");
      el.preload = "none";
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      el.addEventListener("ended", function () { finish("done"); });
      el.addEventListener("error", function () { if (current) finish("error"); });
      document.body.appendChild(el);
    }
    return el;
  }
  function setBtn(btn, state) {
    if (!btn) return;
    btn.classList.remove("is-playing", "is-error", "is-loading");
    var label = btn.querySelector(".a-label"), base = btn.getAttribute("data-label") || "Listen";
    if (state === "playing") { btn.classList.add("is-playing"); btn.setAttribute("aria-pressed", "true"); if (label) label.textContent = "Stop"; }
    else if (state === "loading") { btn.classList.add("is-loading", "is-playing"); btn.setAttribute("aria-pressed", "true"); if (label) label.textContent = "Loading…"; }
    else if (state === "error") { btn.classList.add("is-error"); btn.setAttribute("aria-pressed", "false"); if (label) label.textContent = "Try again"; }
    else { btn.setAttribute("aria-pressed", "false"); if (label) label.textContent = base; }
  }
  function finish(state) {
    var c = current; current = null;
    if (!c) return;
    setBtn(c.btn, state === "error" ? "error" : "idle");
    if (state === "error") status("The audio could not play. Check your sound and tap Try again.");
    if (c.onEnd) { try { c.onEnd(state); } catch (e) {} }
    document.dispatchEvent(new CustomEvent("tns-audio", { detail: { state: state, src: c.src, btn: c.btn } }));
  }

  /* Play a file. Must be called from inside a tap/click handler. */
  function play(src, btn, onEnd) {
    stop();
    var a = player(), my = ++token;
    current = { src: src, btn: btn, onEnd: onEnd };
    setBtn(btn, "loading");
    a.src = src;
    var p;
    try { p = a.play(); } catch (e) { finish("error"); return; }
    if (p && typeof p.then === "function") {
      p.then(function () { if (my === token && current) setBtn(btn, "playing"); },
             function (err) { if (my !== token || (err && err.name === "AbortError")) return; finish("error"); });
    } else setBtn(btn, "playing");
    document.dispatchEvent(new CustomEvent("tns-audio", { detail: { state: "start", src: src, btn: btn } }));
  }
  function stop() {
    token++;
    if (el) { try { el.pause(); } catch (e) {} }
    if (current) finish("stopped");
  }
  function isPlaying(btn) { return !!(current && current.btn === btn); }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* Button HTML for spoken text (voice f, fs or m) or a fixed file (opts.src). */
  function button(text, opts) {
    opts = opts || {};
    var src = opts.src || TNSAudioId.path(text, opts.voice || "f");
    var label = opts.label || "Listen";
    var cls = "audio-btn" + (opts.big ? " big" : "") + (opts.small ? " small" : "") + (opts.cls ? " " + opts.cls : "");
    var aria = opts.aria || (label + (opts.ariaText ? ": " + opts.ariaText : ""));
    return '<button type="button" class="' + cls + '" data-audio="' + esc(src) + '" data-label="' + esc(label) + '" aria-pressed="false" aria-label="' + esc(aria) + '">' +
      '<span class="a-ic" aria-hidden="true"></span><span class="a-label">' + esc(label) + "</span></button>";
  }

  /* One click handler for every audio button on the site. */
  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest ? ev.target.closest("[data-audio]") : null;
    if (!btn) return;
    ev.preventDefault();
    if (isPlaying(btn)) { stop(); return; }
    play(btn.getAttribute("data-audio"), btn);
  });

  window.TNSAudio = { play: play, stop: stop, button: button, isPlaying: isPlaying };
})();
