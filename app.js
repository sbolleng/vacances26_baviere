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

  function svg(d) {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }
  var CAR = svg('<path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm18 0a2 2 0 1 1-4 0 ' +
    '2 2 0 0 1 4 0ZM3 17v-4l2-5h11l3 5h2v4"/>');
  // U-Bahn : une rame vue de face.
  var METRO = svg('<rect x="5" y="3" width="14" height="14" rx="3"/>' +
    '<path d="M5 11h14M8.5 20l-2 2M15.5 20l2 2"/><circle cx="8.5" cy="14.5" r=".6"/>' +
    '<circle cx="15.5" cy="14.5" r=".6"/>');
  var PIED = svg('<circle cx="13" cy="4" r="1.6"/>' +
    '<path d="M11 21l1.5-5 2.5-2-1-5-3 1-2 3M14 14l3 3 1 4"/>');
  var ICONES = { voiture: CAR, metro: METRO, pied: PIED };

  function tagsHTML(list) {
    if (!list || !list.length) return "";
    return '<div class="meta">' + list.map(function (t) {
      var kind = Array.isArray(t) ? t[0] : "";
      var txt = Array.isArray(t) ? t[1] : t;
      return '<span class="tag' + (kind ? " " + kind : "") + '">' + esc(txt) + "</span>";
    }).join("") + "</div>";
  }

  // Waze : le lien universel https://waze.com/ul ouvre l'application si elle
  // est installée (iPhone comme Android) et bascule sur le site sinon.
  function wazeURL(query) {
    return "https://waze.com/ul?q=" + encodeURIComponent(query) + "&navigate=yes";
  }
  function gmapsURL(query) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(query);
  }

  // En voiture : Waze puis Maps. À pied ou en métro : Maps seul, dans le bon mode.
  function navHTML(query, dest, compact, mode) {
    if (!query) return "";
    var cls = compact ? "legm" : "maps";
    var m = mode || "voiture";
    if (m === "voiture") {
      return '<a class="' + cls + '" target="_blank" rel="noopener" href="' + wazeURL(query) +
        '" aria-label="Naviguer vers ' + esc(dest) + ' avec Waze">Waze</a>' +
        '<a class="' + cls + ' alt" target="_blank" rel="noopener" href="' + gmapsURL(query) +
        '" aria-label="Itinéraire vers ' + esc(dest) + ' avec Google Maps">Maps</a>';
    }
    var travel = m === "metro" ? "transit" : "walking";
    return '<a class="' + cls + '" target="_blank" rel="noopener" href="' +
      gmapsURL(query) + "&travelmode=" + travel +
      '" aria-label="Itinéraire vers ' + esc(dest) + '">Maps</a>';
  }

  // Trajet entre deux points de la journée.
  function legHTML(leg, arrivee) {
    if (!leg) return "";
    var dest = leg.to || arrivee;
    var mode = leg.mode || "voiture";
    return '<div class="leg">' + (ICONES[mode] || CAR) +
      "<span>" + esc(leg.from) + " → " + esc(dest) + "</span>" +
      '<span class="legd">' + esc(leg.dur) +
      (leg.km ? ' <i>' + esc(leg.km) + "</i>" : "") + "</span>" +
      navHTML(leg.maps, dest, true, mode) +
      "</div>";
  }

  // Le texte de guide est du HTML rédigé dans data/jours.js — pas une saisie
  // utilisateur. Il est donc inséré tel quel, contrairement au reste.
  function guideHTML(txt, titre) {
    if (!txt) return "";
    return "<details class=\"guide\"><summary><span>Le mot du guide</span>" +
      '<span class="chev" aria-hidden="true">▾</span></summary>' +
      '<div class="guide-body">' + txt + "</div></details>";
  }

  // Bande de vignettes sous une étape. Le clic ouvre la visionneuse.
  function photosHTML(list) {
    if (!list || !list.length) return "";
    return '<div class="shots">' + list.map(function (ph, i) {
      return '<button type="button" class="shot" data-src="' + esc(ph.src) +
        '" data-leg="' + esc(ph.leg) + '">' +
        '<img src="' + esc(ph.thumb) + '" alt="' + esc(ph.leg) +
        '" loading="lazy" width="520" height="390">' +
        "</button>";
    }).join("") + "</div>";
  }

  // Renvoi vers une page dédiée quand une étape en a une.
  function pageHTML(page) {
    if (!page) return "";
    return '<a class="gopage" href="' + esc(page.href) + '">' +
      esc(page.libelle) + '<span aria-hidden="true">→</span></a>';
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

    if (j.carte && typeof CARTE_ALPES !== "undefined") {
      h += '<div class="mapwrap">' + CARTE_ALPES +
        '<p class="maphint">Schéma de l\'itinéraire — faites glisser</p></div>';
      if (j.carte.page) {
        h += '<a class="gopage mapgo" href="' + esc(j.carte.page) + '">' +
          esc(j.carte.libelle) + '<span aria-hidden="true">→</span></a>';
      }
    }

    if (j.alerte) {
      h += '<p class="alerte">' + esc(j.alerte) + "</p>";
    }

    if (j.acts && j.acts.length) {
      h += '<ul class="acts">' + j.acts.map(function (a) {
        return "<li>" +
          legHTML(a.leg, a.nm) +
          '<div class="act-in"><span class="dot"></span><div class="act-txt">' +
          '<div class="nm">' + esc(a.nm) + "</div>" +
          tagsHTML(a.tags) +
          (a.note ? '<div class="note">' + esc(a.note) + "</div>" : "") +
          photosHTML(a.photos) +
          pageHTML(a.page) +
          guideHTML(a.guide, a.nm) +
          "</div></div></li>";
      }).join("") + "</ul>";

      if (j.retour) {
        h += '<div class="retour">' + legHTML(j.retour) + "</div>";
      }
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
          (j.stay.maps ? '<div class="navrow">' + navHTML(j.stay.maps, j.stay.nm, false, "voiture") + "</div>" : "") +
          "</div>";
      }
    }

    sec.innerHTML = h;
    wrap.appendChild(sec);
  });

  // ----- visionneuse -----
  // On y entre par une vignette ; on circule ensuite dans toute la bande de
  // l'\u00e9tape, aux fl\u00e8ches, au doigt ou au clavier. La liste boucle sur elle-m\u00eame.
  var vue = document.createElement("div");
  vue.className = "viewer";
  vue.setAttribute("hidden", "");
  vue.innerHTML = '<button type="button" class="vclose" aria-label="Fermer">\u00d7</button>' +
    '<button type="button" class="vprev" aria-label="Photo pr\u00e9c\u00e9dente">\u2039</button>' +
    '<button type="button" class="vnext" aria-label="Photo suivante">\u203a</button>' +
    '<img alt=""><p class="vleg"></p><p class="vcount"></p>';
  document.body.appendChild(vue);

  var vimg = vue.querySelector("img");
  var album = [];   // [{ src, leg }] \u2014 la bande d'o\u00f9 l'on vient
  var pos = 0;
  var tx = 0, ty = 0, balaye = false;

  // Charger en avance les voisines : le passage d'une photo \u00e0 l'autre est
  // alors instantan\u00e9, m\u00eame en 4G.
  function precharger(i) {
    [i - 1, i + 1].forEach(function (k) {
      var p = album[(k + album.length) % album.length];
      if (p) { var im = new Image(); im.src = p.src; }
    });
  }

  function afficher(i) {
    pos = (i + album.length) % album.length;
    var p = album[pos];
    vimg.src = p.src;
    vimg.alt = p.leg;
    vue.querySelector(".vleg").textContent = p.leg;
    vue.querySelector(".vcount").textContent = album.length > 1
      ? pos + 1 + " / " + album.length : "";
    precharger(pos);
  }

  function ouvrir(bande, i) {
    album = bande;
    vue.classList.toggle("solo", album.length < 2);
    afficher(i);
    vue.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }
  function fermer() {
    vue.setAttribute("hidden", "");
    vimg.src = "";
    album = [];
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest) return;
    var b = e.target.closest(".shot");
    if (b) {
      var boutons = [].slice.call(b.parentNode.querySelectorAll(".shot"));
      ouvrir(boutons.map(function (x) {
        return { src: x.dataset.src, leg: x.dataset.leg };
      }), boutons.indexOf(b));
      return;
    }
    if (!e.target.closest(".viewer")) return;
    if (balaye) { balaye = false; return; } // le clic qui suit un balayage
    if (e.target.closest(".vprev")) { afficher(pos - 1); return; }
    if (e.target.closest(".vnext")) { afficher(pos + 1); return; }
    if (e.target === vimg) { if (album.length > 1) afficher(pos + 1); return; }
    fermer(); // le fond et la croix ferment
  });

  document.addEventListener("keydown", function (e) {
    if (vue.hasAttribute("hidden")) return;
    if (e.key === "Escape") fermer();
    else if (e.key === "ArrowLeft") afficher(pos - 1);
    else if (e.key === "ArrowRight") afficher(pos + 1);
  });

  // Balayage horizontal, comme dans l'application Photos. Le geste est suivi
  // d'un clic synthétique, qu'on neutralise pour ne pas fermer dans la foulée.
  vue.addEventListener("touchstart", function (e) {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });
  vue.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (album.length > 1 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      balaye = true;
      afficher(pos + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  // ----- se placer sur aujourd'hui -----
  function cadrer() {
    if (location.hash) return; // l'utilisateur vise un jour précis
    var cible = document.querySelector(".day.is-today") || document.querySelector(".day");
    if (cible) cible.scrollIntoView({ block: "start", behavior: "auto" });
    var pip = document.querySelector(".pip.is-today");
    if (pip) pip.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
  }

  document.querySelectorAll(".mapwrap").forEach(function (m) { m.scrollLeft = m.scrollWidth; });

  if (document.readyState === "complete") cadrer();
  else window.addEventListener("load", cadrer);
})();
