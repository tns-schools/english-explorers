/* =====================================================================
   TNS English Explorers — Letter formation demonstrations
   ---------------------------------------------------------------------
   Simple print ("ball and stick") letters drawn on writing lines.
   Each letter is a list of strokes IN WRITING ORDER. A numbered dot
   shows where each stroke starts, and the strokes draw themselves one
   after another (no animation if the device asks for reduced motion).
   Grid: top line y=10 · dashed middle line y=45 · base line y=80 · tail y=98
   ===================================================================== */
(function () {
  "use strict";
  var U = {
    A: ["M50 10 L22 80", "M50 10 L78 80", "M33 56 L67 56"],
    B: ["M26 10 L26 80", "M26 10 L54 10 Q72 10 72 27 Q72 44 54 44 L26 44", "M26 44 L57 44 Q76 44 76 62 Q76 80 57 80 L26 80"],
    C: ["M75 20 A30 35 0 1 0 75 70"],
    D: ["M26 10 L26 80", "M26 10 L44 10 Q78 10 78 45 Q78 80 44 80 L26 80"],
    E: ["M28 10 L28 80", "M28 10 L72 10", "M28 45 L64 45", "M28 80 L72 80"],
    F: ["M28 10 L28 80", "M28 10 L72 10", "M28 45 L64 45"],
    G: ["M75 20 A30 35 0 1 0 78 60 L78 48 L57 48"],
    H: ["M25 10 L25 80", "M75 10 L75 80", "M25 45 L75 45"],
    I: ["M50 10 L50 80", "M32 10 L68 10", "M32 80 L68 80"],
    J: ["M60 10 L60 62 Q60 80 43 80 Q28 80 26 66"],
    K: ["M28 10 L28 80", "M74 10 L28 52", "M43 40 L76 80"],
    L: ["M30 10 L30 80 L72 80"],
    M: ["M22 80 L22 10 L50 56 L78 10 L78 80"],
    N: ["M25 80 L25 10 L75 80 L75 10"],
    O: ["M50 10 A28 35 0 1 0 49.9 10"],
    P: ["M28 10 L28 80", "M28 10 L56 10 Q74 10 74 28 Q74 46 56 46 L28 46"],
    Q: ["M50 10 A28 35 0 1 0 49.9 10", "M58 62 L80 86"],
    R: ["M28 10 L28 80", "M28 10 L56 10 Q74 10 74 28 Q74 46 56 46 L28 46", "M50 46 L76 80"],
    S: ["M74 20 Q66 10 50 10 Q28 10 28 27 Q28 42 50 45 Q74 48 74 64 Q74 80 50 80 Q32 80 25 70"],
    T: ["M22 10 L78 10", "M50 10 L50 80"],
    U: ["M25 10 L25 58 Q25 80 50 80 Q75 80 75 58 L75 10"],
    V: ["M22 10 L50 80 L78 10"],
    W: ["M14 10 L32 80 L50 30 L68 80 L86 10"],
    X: ["M24 10 L76 80", "M76 10 L24 80"],
    Y: ["M22 10 L50 45 L78 10", "M50 45 L50 80"],
    Z: ["M24 10 L76 10 L24 80 L76 80"]
  };
  var L = {
    a: ["M68 52 Q60 45 50 45 Q30 45 30 62 Q30 80 50 80 Q62 80 68 70", "M68 45 L68 80"],
    b: ["M30 10 L30 80", "M30 62 Q30 45 50 45 Q70 45 70 62 Q70 80 50 80 Q30 80 30 66"],
    c: ["M68 51 Q60 45 50 45 Q30 45 30 62 Q30 80 50 80 Q60 80 68 74"],
    d: ["M68 52 Q60 45 50 45 Q30 45 30 62 Q30 80 50 80 Q62 80 68 70", "M68 10 L68 80"],
    e: ["M30 62 L70 62 Q70 45 50 45 Q30 45 30 62 Q30 80 50 80 Q62 80 68 74"],
    f: ["M66 14 Q60 10 54 10 Q42 10 42 24 L42 80", "M30 45 L60 45"],
    g: ["M68 52 Q60 45 50 45 Q30 45 30 62 Q30 79 50 79 Q62 79 68 70", "M68 45 L68 88 Q68 98 52 98 Q40 98 34 92"],
    h: ["M30 10 L30 80", "M30 58 Q34 45 50 45 Q68 45 68 60 L68 80"],
    i: ["M50 45 L50 80", "M50 29 L50 31"],
    j: ["M56 45 L56 90 Q56 98 46 98 Q38 98 34 93", "M56 29 L56 31"],
    k: ["M32 10 L32 80", "M66 45 L32 66", "M45 58 L68 80"],
    l: ["M50 10 L50 80"],
    m: ["M22 45 L22 80", "M22 56 Q26 45 37 45 Q50 45 50 58 L50 80", "M50 56 Q54 45 65 45 Q78 45 78 58 L78 80"],
    n: ["M30 45 L30 80", "M30 58 Q34 45 50 45 Q68 45 68 60 L68 80"],
    o: ["M50 45 Q30 45 30 62 Q30 80 50 80 Q70 80 70 62 Q70 45 50 45"],
    p: ["M30 45 L30 98", "M30 62 Q30 45 50 45 Q70 45 70 62 Q70 80 50 80 Q30 80 30 66"],
    q: ["M68 52 Q60 45 50 45 Q30 45 30 62 Q30 80 50 80 Q62 80 68 70", "M68 45 L68 98"],
    r: ["M34 45 L34 80", "M34 60 Q38 45 54 45 Q62 45 66 49"],
    s: ["M66 50 Q60 45 50 45 Q34 45 34 54 Q34 62 50 63 Q66 64 66 72 Q66 80 50 80 Q38 80 32 75"],
    t: ["M46 22 L46 74 Q46 80 54 80 Q60 80 64 77", "M32 45 L62 45"],
    u: ["M30 45 L30 66 Q30 80 48 80 Q68 80 68 64", "M68 45 L68 80"],
    v: ["M30 45 L50 80 L70 45"],
    w: ["M18 45 L32 80 L50 52 L68 80 L82 45"],
    x: ["M32 45 L68 80", "M68 45 L32 80"],
    y: ["M30 45 L50 80", "M70 45 L42 98"],
    z: ["M32 45 L68 45 L32 80 L68 80"]
  };
  function strokes(ch) { return U[ch] || L[ch] || null; }
  function html(ch) {
    var s = strokes(ch); if (!s) return "";
    var h = '<span class="letter-demo" role="img" aria-label="How to write ' + (U[ch] ? "capital " : "small ") + ch + ": " + s.length + " stroke" + (s.length > 1 ? "s" : "") + '">' +
      '<svg viewBox="0 0 100 104" aria-hidden="true" focusable="false"><line x1="4" y1="10" x2="96" y2="10" class="ln"/><line x1="4" y1="45" x2="96" y2="45" class="ln mid"/><line x1="4" y1="80" x2="96" y2="80" class="ln base"/>';
    s.forEach(function (d, k) { h += '<path d="' + d + '" pathLength="1" class="stk" style="animation-delay:' + (k * 1.1) + 's"/>'; });
    s.forEach(function (d, k) {
      var m = /M\s*([\d.]+)\s+([\d.]+)/.exec(d); if (!m) return;
      h += '<circle cx="' + m[1] + '" cy="' + m[2] + '" r="5.5" class="dot"/><text x="' + m[1] + '" y="' + (+m[2] + 2.8) + '" class="num">' + (k + 1) + "</text>";
    });
    return h + '</svg><button type="button" class="replay small" data-replay aria-label="Show how to write ' + ch + ' again">↻ Again</button></span>';
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-replay]"); if (!b) return;
    var svg = b.parentNode.querySelector("svg"); if (!svg) return;
    var clone = svg.cloneNode(true); svg.parentNode.replaceChild(clone, svg);
  });
  window.TNSLetters = { html: html, strokes: strokes, UPPER: U, LOWER: L };
})();
