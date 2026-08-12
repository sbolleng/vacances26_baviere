// ===== Planning du séjour · Bavière, 8 → 20 août 2026 =====
//
// Source : le fichier Baviere_1.xlsx.
// Une entrée par journée. Les champs optionnels peuvent être omis.
//
//   n     : numéro du jour
//   date  : AAAA-MM-JJ (sert à détecter le jour en cours)
//   base  : où on dort ce soir-là, affiché en haut à droite de la carte
//   route : trajet du jour { from, to, dur }
//   acts  : visites — tags = [type, texte] avec type "h" (horaires),
//           "p" (prix), "warn" (alerte) ou "" (neutre)
//   stay  : logement du soir. { same: true } = on ne bouge pas.

const JOURS = [
  {
    n: 1, date: "2026-08-08", jour: "Samedi 8", mois: "août", base: "Alsace",
    route: { from: "Clamart", to: "Obernai", dur: "5 h 09" },
    acts: [],
    stay: {
      nm: "Oneloft Hotel", src: "Hotel.com",
      addr: "1 rue de Gengenbach, 67210 Obernai",
      maps: "Oneloft Hotel, 1 rue de Gengenbach, 67210 Obernai",
      tags: ["Parking", "Pdéj 12,50 € · 6,25 € enfant"],
      note: "Station-service Leclerc à côté. FunBurger ou McDo à 5 min."
    }
  },
  {
    n: 2, date: "2026-08-09", jour: "Dimanche 9", mois: "août", base: "München",
    route: { from: "Obernai", to: "München", dur: "4 h 40" },
    acts: [
      { nm: "Jardin anglais", tags: [["", "Pédalo"], ["", "Métro Odeonsplatz"]] }
    ],
    stay: {
      nm: "H2 Hotel München Olympiapark", src: "Booking",
      addr: "Moosacher Strasse 82",
      maps: "H2 Hotel München Olympiapark, Moosacher Strasse 82",
      tags: ["Parking 22 €/j", "Arrivée 15 h", "Départ 12 h", "Pdéj inclus"],
      note: "Station-service Total à 3 min.", nights: 3
    }
  },
  {
    n: 3, date: "2026-08-10", jour: "Lundi 10", mois: "août", base: "München",
    acts: [
      {
        nm: "Mémorial de Dachau",
        tags: [["h", "9 h – 17 h"], ["p", "Gratuit"], ["", "Sans résa"], ["", "Pkg 3 € en monnaie"]],
        note: "Zone commerciale juste à côté — taper « Action Dachau-Ost »."
      },
      {
        nm: "Château de Nymphenburg",
        tags: [["h", "9 h – 18 h"], ["p", "10 € · 9 €"], ["", "Métro → Moosach, puis bus 51"]]
      }
    ],
    stay: { same: true, nm: "H2 Hotel München Olympiapark" }
  },
  {
    n: 4, date: "2026-08-11", jour: "Mardi 11", mois: "août", base: "München",
    acts: [
      { nm: "Asamkirche", tags: [["h", "9 h – 19 h"], ["warn", "Fermé le vendredi"]] },
      { nm: "Marienplatz", tags: [["h", "Carillon 11 h · 12 h · 17 h"]] },
      { nm: "Odeonsplatz / Ludwigstrasse", tags: [] },
      { nm: "Résidence de München", tags: [["p", "10 € / pers."]] },
      {
        nm: "Bavariafilmstadt",
        tags: [["h", "9 h – 18 h ?"], ["p", "23 € · 20 €"]],
        note: "Horaires à confirmer."
      }
    ],
    stay: { same: true, nm: "H2 Hotel München Olympiapark" }
  },
  {
    n: 5, date: "2026-08-12", jour: "Mercredi 12", mois: "août", base: "Siegsdorf",
    route: { from: "München", to: "Burghausen", dur: "1 h 25" },
    acts: [
      {
        nm: "Burghausen — ville et château fort",
        tags: [["h", "9 h – 18 h"], ["p", "6 € · gratuit"], ["", "1 km de château"], ["", "Pkg Curaplatz"]]
      },
      {
        nm: "Chiemsee",
        tags: [["p", "Bateau 8 € A/R"], ["p", "Château 8 €"], ["", "Baignade"], ["", "Pkg à Prien"]]
      }
    ],
    stay: {
      nm: "Airbnb Siegsdorf", addr: "Weidenstrasse 19",
      maps: "Weidenstrasse 19, Siegsdorf",
      tags: ["Arrivée 16 h", "Départ 10 h", "Lave-linge", "Lave-vaisselle"],
      note: "Parc Vorauf — voir les consignes. Boîte à clefs, parking.", nights: 2
    }
  },
  {
    n: 6, date: "2026-08-13", jour: "Jeudi 13", mois: "août", base: "Siegsdorf",
    acts: [
      {
        nm: "Königssee",
        tags: [["h", "Bateau 8 h – 16 h 45"], ["p", "28,50 € A/R"], ["", "Départ Schönau"]],
        note: "Aller jusqu'à Salet, puis retour avec escale à l'église St-Barthélemy."
      },
      { nm: "Kehlsteinhaus — le nid d'aigle", tags: [["p", "31,90 €"], ["", "Pkg Obersalzberg"]] },
      { nm: "Wimbachklamm — gorges", tags: [["p", "4 €"]] }
    ],
    stay: { same: true, nm: "Airbnb Siegsdorf" }
  },
  {
    n: 7, date: "2026-08-14", jour: "Vendredi 14", mois: "août", base: "Garmisch",
    route: { from: "Siegsdorf", to: "Oberammergau", dur: "2 h 50" },
    acts: [
      { nm: "Route des Alpes", tags: [["", "À prendre à Reit im Winkl"]] },
      { nm: "Oberammergau", tags: [["", "Façades peintes"]] },
      { nm: "Abbaye d'Ettal", tags: [["h", "8 h – 18 h"]] }
    ],
    stay: {
      nm: "Airbnb Garmisch-Partenkirchen",
      addr: "Zugspitzestrasse 51 — appt 9, 2ᵉ étage",
      maps: "Zugspitzestrasse 51, Garmisch-Partenkirchen",
      tags: ["Arrivée 16 h", "Départ 10 h", "Lave-linge", "Sèche-linge"],
      note: "Boîte à clefs, parking. Lave-linge / sèche-linge au sous-sol.", nights: 2
    }
  },
  {
    n: 8, date: "2026-08-15", jour: "Samedi 15", mois: "août", base: "Garmisch",
    acts: [
      { nm: "Zugspitze", tags: [["warn", "À RÉSERVER"], ["p", "273 € · 226 € early bird"]] },
      {
        nm: "Lac Eibsee",
        tags: [["", "Même pkg que la Zugspitze"], ["", "Pédalo · baignade"], ["", "Tour du lac 14 km"], ["p", "Bateau 22 € · 13 €"]],
        note: "Bateau 2×/h au départ de l'hôtel Fischer am See — payer en espèces à bord."
      },
      { nm: "Gorges de la Partnach", tags: [["h", "Après 15 h"]] }
    ],
    stay: { same: true, nm: "Airbnb Garmisch-Partenkirchen" }
  },
  {
    n: 9, date: "2026-08-16", jour: "Dimanche 16", mois: "août", base: "Oy Mittelberg",
    route: { from: "Garmisch", to: "Lac de Plansee", dur: "45 min" },
    acts: [
      { nm: "Lac de Plansee", tags: [["", "Autriche"]] },
      { nm: "Linderhof", tags: [["p", "9 € / pers."]] },
      {
        nm: "Neuschwanstein",
        tags: [["p", "Pkg 7 €"]],
        note: "Pont Marienbrücke pour la photo — 15 min de marche depuis le château."
      },
      { nm: "Füssen", tags: [] }
    ],
    stay: {
      nm: "Airbnb Oberzollhaus", addr: "Füssenerstrasse 8, Oy Mittelberg",
      maps: "Füssenerstrasse 8, Oy-Mittelberg",
      tags: ["Arrivée 15 h", "Départ 11 h"],
      note: "Boîte à clefs, parking.", nights: 1
    }
  },
  {
    n: 10, date: "2026-08-17", jour: "Lundi 17", mois: "août", base: "Tettnang",
    route: { from: "Oy Mittelberg", to: "Lindau", dur: "2 h 20" },
    acts: [
      { nm: "Hasenreuter Wasserfall", tags: [["", "Scheidegg"], ["warn", "Pkg non signalé"]] },
      { nm: "Lindau", tags: [] }
    ],
    stay: {
      nm: "Apartment M17 Tettnang", src: "Booking", addr: "17 Montfortstrasse",
      maps: "Montfortstrasse 17, Tettnang",
      tags: ["Parking public gratuit", "Arrivée 15 h", "Départ 10 h", "Lave-vaisselle"],
      note: "Se pré-enregistrer sur Booking — cf. le message.", nights: 2
    }
  },
  {
    n: 11, date: "2026-08-18", jour: "Mardi 18", mois: "août", base: "Tettnang",
    acts: [{ nm: "Constance", tags: [] }],
    stay: { same: true, nm: "Apartment M17 Tettnang" }
  },
  {
    n: 12, date: "2026-08-19", jour: "Mercredi 19", mois: "août", base: "Dijon",
    route: { from: "Tettnang", to: "Dijon", dur: "4 h 30" },
    acts: [{ nm: "Chutes du Rhin", tags: [["", "Sur la route"]] }],
    stay: {
      nm: "Campanile Dijon Centre", addr: "16 avenue R. Poincaré",
      maps: "Campanile Dijon Centre, 16 avenue Raymond Poincaré, Dijon",
      tags: ["Pkg 10 €", "Arrivée 14 h", "Départ 12 h", "Pdéj inclus"], nights: 1
    }
  },
  {
    n: 13, date: "2026-08-20", jour: "Jeudi 20", mois: "août", base: "Retour",
    route: { from: "Dijon", to: "Clamart", dur: "3 h 15" },
    acts: [],
    stay: null
  }
];
