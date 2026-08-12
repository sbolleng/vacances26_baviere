// ===== Rendu du guide · Bavière 2026 =====
// Lit JOURS (data/jours.js), construit le bandeau de dates et les cartes,
// puis place la page sur le jour en cours.

(function () {
  "use strict";

  var iso = function (d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  };
  var TODAY = iso(new Date());

  function etat(date) {
    if (date === TODAY) return "today";
    return date < TODAY ? "past" : "todo";
  }

  // Tout texte venant des données passe par ici avant d'entrer dans le DOM.
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var CAR = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm18 0a2 2 0 1 1-4 0 ' +
    '2 2 0 0 1 4 0ZM3 17v-4l2-5h11l3 5h2v4"/></svg>';

  function tagsHTML(list) {
    if (!list || !list.length) return "";
    return '<div class="meta">' + list.map(function (t) {
      var kind = Array.isArray(t) ? t[0] : "";
      var txt = Array.isArray(t) ? t[1] : t;
      return '<span class="tag' + (kind ? " " + kind : "") + '">' + esc(txt) + "</span>";
    }).join("") + "</div>";
  }

  function mapsHTML(query) {
    if (!query) return "";
    return '<a class="maps" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(query) + '">Ouvrir dans Maps</a>';
  }

  // ----- bandeau des jours -----
  var strip = document.getElementById("strip");
  JOURS.forEach(function (j) {
    var e = etat(j.date);
    var a = document.createElement("a");
    a.className = "pip" + (e === "today" ? " is-today" : e === "past" ? " is-past" : "");
    a.href = "#j" + j.n;
    if (e === "today") a.setAttribute("aria-current", "date");
    var dd = j.date.split("-")[2];
    var abbr = j.jour.split(" ")[0].slice(0, 3);
    a.innerHTML = "<b>" + dd + "</b><i>" + esc(abbr) + "</i>";
    strip.appendChild(a);
  });

  // ----- cartes -----
  var wrap = document.getElementById("days");

  JOURS.forEach(function (j) {
    var e = etat(j.date);
    var sec = document.createElement("section");
    sec.className = "day" + (e === "today" ? " is-today" : e === "past" ? " is-past" : "");
    sec.id = "j" + j.n;

    var h = "";
    var titre = e === "today" ? "Aujourd'hui" : "Jour " + j.n;

    h += '<div class="day-head"><div class="lbl">' +
      '<span class="jn">' + titre + "</span>" +
      "<h2>" + esc(j.jour) + " " + esc(j.mois) + "</h2></div>" +
      '<span class="base">' + esc(j.base) + "</span></div>";

    if (j.route) {
      h += '<div class="route">' + CAR +
        "<span><b>" + esc(j.route.from) + "</b> → <b>" + esc(j.route.to) + "</b></span>" +
        '<span class="dur">' + esc(j.route.dur) + "</span></div>";
    }

    if (j.acts && j.acts.length) {
      h += '<ul class="acts">' + j.acts.map(function (a) {
        return '<li><span class="dot"></span><div>' +
          '<div class="nm">' + esc(a.nm) + "</div>" +
          tagsHTML(a.tags) +
          (a.note ? '<div class="note">' + esc(a.note) + "</div>" : "") +
          "</div></li>";
      }).join("") + "</ul>";
    } else if (j.stay) {
      h += '<p class="empty">Journée de route, rien de calé.</p>';
    }

    if (j.stay) {
      if (j.stay.same) {
        h += '<div class="stay same"><div class="nm">Même nuit — ' + esc(j.stay.nm) + "</div></div>";
      } else {
        h += '<div class="stay"><div class="k">Nuit' +
          (j.stay.nights > 1 ? " · " + j.stay.nights + " nuits" : "") + "</div>" +
          '<div class="nm">' + esc(j.stay.nm) +
          (j.stay.src ? ' <span class="tag">' + esc(j.stay.src) + "</span>" : "") + "</div>" +
          (j.stay.addr ? '<div class="addr">' + esc(j.stay.addr) + "</div>" : "") +
          tagsHTML(j.stay.tags) +
          (j.stay.note ? '<div class="note">' + esc(j.stay.note) + "</div>" : "") +
          mapsHTML(j.stay.maps) +
          "</div>";
      }
    }

    sec.innerHTML = h;
    wrap.appendChild(sec);
  });

  // ----- se placer sur aujourd'hui -----
  function cadrer() {
    if (location.hash) return; // l'utilisateur vise un jour précis
    var cible = document.querySelector(".day.is-today") || document.querySelector(".day");
    if (cible) cible.scrollIntoView({ block: "start", behavior: "auto" });
    var pip = document.querySelector(".pip.is-today");
    if (pip) pip.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
  }

  if (document.readyState === "complete") cadrer();
  else window.addEventListener("load", cadrer);
})();
