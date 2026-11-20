/* =====================================================================
   TNS English Explorers — Local visual library
   ---------------------------------------------------------------------
   Content refers to a picture in one of two ways:
     "🍎"          a native emoji (only when it clearly shows the word)
     "svg:circle"  an original local SVG drawing from the list below
   No picture is ever loaded from another website.
   TNSVisual.html(vis, alt) returns accessible markup for either kind.
   ===================================================================== */
(function () {
  "use strict";
  var S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" focusable="false" aria-hidden="true"';
  function shape(inner) { return "<svg " + S + ">" + inner + "</svg>"; }
  var LIB = {
    /* shapes */
    circle:    shape('<circle cx="50" cy="50" r="36" fill="#2463C9"/>'),
    square:    shape('<rect x="16" y="16" width="68" height="68" rx="3" fill="#C2571A"/>'),
    triangle:  shape('<polygon points="50,12 88,84 12,84" fill="#23804D"/>'),
    rectangle: shape('<rect x="8" y="28" width="84" height="44" rx="3" fill="#6B47B8"/>'),
    star:      shape('<polygon points="50,8 61,38 93,38 67,57 77,89 50,70 23,89 33,57 7,38 39,38" fill="#E0A800"/>'),
    heart:     shape('<path d="M50 86 C20 64 8 46 14 30 C20 14 42 12 50 28 C58 12 80 14 86 30 C92 46 80 64 50 86Z" fill="#C8324B"/>'),
    oval:      shape('<ellipse cx="50" cy="50" rx="42" ry="28" fill="#0E7A86"/>'),
    diamond:   shape('<polygon points="50,8 88,50 50,92 12,50" fill="#B8365F"/>'),
    /* simple objects (no clear emoji exists) */
    igloo:     shape('<path d="M10 80 A40 40 0 0 1 90 80Z" fill="#EAF4FB" stroke="#5A8BB0" stroke-width="3"/><path d="M38 80 V64 A12 12 0 0 1 62 64 V80Z" fill="#2F4F6B"/><path d="M14 66 H86 M22 52 H78 M34 40 H66 M30 66 V52 M50 52 V40 M70 66 V52" stroke="#5A8BB0" stroke-width="2" fill="none"/>'),
    /* prepositions: a ball and a box */
    "ball-in-box":    shape('<path d="M18 40 H82 V86 H18Z" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><circle cx="50" cy="60" r="14" fill="#C8324B"/><path d="M18 40 H82 V52 H18Z" fill="#C9A06A" opacity=".55"/>'),
    "ball-on-box":    shape('<rect x="18" y="52" width="64" height="38" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><circle cx="50" cy="36" r="15" fill="#C8324B"/>'),
    "ball-under-table": shape('<rect x="10" y="30" width="80" height="8" fill="#7A5A2E"/><rect x="16" y="38" width="7" height="50" fill="#7A5A2E"/><rect x="77" y="38" width="7" height="50" fill="#7A5A2E"/><circle cx="50" cy="76" r="12" fill="#C8324B"/>'),
    "ball-next-to-box": shape('<rect x="14" y="44" width="44" height="44" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><circle cx="76" cy="74" r="14" fill="#C8324B"/>'),
    "ball-behind-box":  shape('<circle cx="62" cy="42" r="15" fill="#C8324B"/><rect x="20" y="46" width="56" height="44" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/>'),
    "ball-in-front-of-box": shape('<rect x="24" y="22" width="56" height="48" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><circle cx="46" cy="72" r="16" fill="#C8324B" stroke="#7a1c2c" stroke-width="2"/>'),
    "ball-between-boxes": shape('<rect x="4" y="50" width="30" height="38" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><rect x="66" y="50" width="30" height="38" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/><circle cx="50" cy="76" r="12" fill="#C8324B"/>')
  };
  /* Color swatches: svg:color-red etc. */
  var COLORS = { red: "#D62828", blue: "#1F5FD1", yellow: "#F2C230", green: "#2A9D3F", orange: "#F07F13", purple: "#7B3FB5", pink: "#F28DB2", brown: "#7A4A21", black: "#1A1A1A", white: "#FFFFFF", gray: "#8C8C8C" };
  Object.keys(COLORS).forEach(function (c) {
    LIB["color-" + c] = shape('<circle cx="50" cy="50" r="38" fill="' + COLORS[c] + '" stroke="#555" stroke-width="' + (c === "white" ? 3 : 1) + '"/>');
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function has(vis) { return typeof vis === "string" && vis.indexOf("svg:") === 0 ? !!LIB[vis.slice(4)] : !!vis; }
  function html(vis, alt, cls) {
    if (!vis) return "";
    var c = "vis" + (cls ? " " + cls : "");
    if (vis.indexOf("svg:") === 0) {
      var svg = LIB[vis.slice(4)];
      if (!svg) return "";
      return '<span class="' + c + ' vis-svg" role="img" aria-label="' + esc(alt || "") + '">' + svg + "</span>";
    }
    return '<span class="' + c + ' vis-emoji" role="img" aria-label="' + esc(alt || "") + '">' + esc(vis) + "</span>";
  }
  window.TNSVisual = { html: html, has: has, LIB: LIB };
})();
