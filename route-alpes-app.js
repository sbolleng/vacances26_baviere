// ===== Rendu des étapes de la route des Alpes =====
// Lit ETAPES et SEGMENTS (data/route-alpes.js), construit la liste kilométrée
// avec un bouton Waze et un bouton Maps par étape, puis les itinéraires groupés.

(function () {
  "use strict";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Waze n'accepte qu'une destination : un lien par étape.
  function waze(dest) {
    return "https://waze.com/ul?q=" + encodeURIComponent(dest) + "&navigate=yes";
  }
  function maps(dest) {
    return "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(dest) + "&travelmode=driving";
  }
  // Maps accepte jusqu'à neuf étapes intermédiaires par itinéraire.
  function mapsSegment(seg) {
    return "https://www.google.com/maps/dir/?api=1" +
      "&origin=" + encodeURIComponent(seg.origin) +
      "&destination=" + encodeURIComponent(seg.destination) +
      "&waypoints=" + seg.waypoints.map(encodeURIComponent).join("%7C") +
      "&travelmode=driving";
  }

  function tags(list) {
    if (!list || !list.length) return "";
    return '<div class="meta">' + list.map(function (t) {
      var k = t[0] === "stop" ? "stop2" : t[0];
      return '<span class="t' + (k ? " " + k : "") + '">' + esc(t[1]) + "</span>";
    }).join("") + "</div>";
  }

  var PLAN = {
    dej: "Arrêt déjeuner retenu",
    bain: "Baignade retenue"
  };

  var liste = document.getElementById("stops");
  ETAPES.forEach(function (e) {
    var li = document.createElement("li");
    li.className = "stop" + (e.swim ? " swim" : "") + (e.plan ? " chosen" : "");

    li.innerHTML =
      '<div class="km">' + e.km + "<span>km</span></div>" +
      "<div>" +
        (e.plan ? '<span class="pin">' + PLAN[e.plan] + "</span>" : "") +
        "<h4>" + esc(e.nm) + "</h4>" +
        "<p>" + esc(e.texte) + "</p>" +
        tags(e.tags) +
        '<div class="nav">' +
          '<a class="go" target="_blank" rel="noopener" href="' + waze(e.dest) +
            '" aria-label="Naviguer vers ' + esc(e.nm) + ' avec Waze">Waze</a>' +
          '<a class="go alt" target="_blank" rel="noopener" href="' + maps(e.dest) +
            '" aria-label="Itinéraire vers ' + esc(e.nm) + ' avec Google Maps">Maps</a>' +
        "</div>" +
      "</div>";

    liste.appendChild(li);
  });

  var segs = document.getElementById("segs");
  SEGMENTS.forEach(function (s) {
    var a = document.createElement("a");
    a.className = "seg";
    a.target = "_blank";
    a.rel = "noopener";
    a.href = mapsSegment(s);
    a.innerHTML =
      "<span>" +
        "<b>" + esc(s.nm) + "</b>" +
        '<i>' + esc(s.detail) + "</i>" +
        '<em>' + (s.waypoints.length + 2) + " étapes enchaînées</em>" +
      "</span><span class=\"arr\" aria-hidden=\"true\">→</span>";
    segs.appendChild(a);
  });
})();
