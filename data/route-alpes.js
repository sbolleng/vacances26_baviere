// ===== Route des Alpes · étapes kilométrées =====
//
// Siegsdorf → Oberammergau par la Deutsche Alpenstraße, dans l'ordre de passage.
//
//   km    : point kilométrique depuis Siegsdorf
//   nm    : nom de l'étape
//   dest  : adresse envoyée à Waze et à Maps
//   tags  : [type, texte] — "swim", "view", "stop", "" (neutre)
//   swim  : true = bloc mis en avant (baignade)
//   plan  : "dej" ou "bain" = arrêt retenu pour aujourd'hui
//   texte : description

const ETAPES = [
  {
    km: 0, nm: "Siegsdorf", dest: "Siegsdorf, Bayern",
    tags: [["", "Départ"], ["", "Carburant"]],
    texte: "Départ. Le plein se fait ici : le gazole est nettement moins cher en vallée qu'au bord de la B305, et les stations se raréfient dès qu'on monte."
  },
  {
    km: 11, nm: "Inzell", dest: "Inzell, Bayern",
    tags: [["", "Ravitaillement"]],
    texte: "Station de sports d'hiver connue pour son anneau de patinage de vitesse couvert. Dernier vrai supermarché avant la montagne — c'est le moment d'acheter le pique-nique."
  },
  {
    km: 22, nm: "Weitsee", dest: "Weitsee Parkplatz, Reit im Winkl", swim: true,
    tags: [["swim", "Baignade"], ["view", "Vue"], ["", "Pique-nique"]],
    texte: "Le premier des trois lacs de la Chiemgauer Seenplatte, alignés le long de la route dans une réserve naturelle. Eau turquoise, fond de galets clairs, sapins jusqu'à la rive. Stationnement payant en bord de route, accès libre à l'eau. Autour de 19 °C en août."
  },
  {
    km: 28, nm: "Mittersee et Lödensee", dest: "Lödensee, Reit im Winkl", swim: true,
    tags: [["swim", "Baignade"], ["", "Calme"]],
    texte: "Les deux petits frères du Weitsee, à quelques centaines de mètres, souvent déserts en semaine. Le Lödensee a une petite plage de sable au bout d'un sentier de cinq minutes — le meilleur des trois pour des enfants."
  },
  {
    km: 40, nm: "Reit im Winkl", dest: "Reit im Winkl, Bayern",
    tags: [["stop", "Pause"], ["", "Carburant"]],
    texte: "Le village le plus enneigé d'Allemagne en hiver, station familiale l'été. Terrasses et boulangeries sur la rue principale."
  },
  {
    km: 55, nm: "Marquartstein", dest: "Marquartstein, Bayern",
    tags: [["view", "Vue"]],
    texte: "Château perché au-dessus du village, et surtout la vallée de l'Achen qui s'ouvre : le paysage passe des gorges boisées aux prairies larges."
  },
  {
    km: 65, nm: "Bernau am Chiemsee", dest: "Strandbad Felden, Bernau am Chiemsee",
    swim: true, plan: "dej",
    tags: [["swim", "Baignade ★"], ["stop", "Déjeuner"]],
    texte: "Le Chiemsee, la « mer bavaroise » — et surtout l'eau la plus chaude de tout l'itinéraire, 23 à 24 °C en août. Plage de Felden à deux kilomètres de la sortie : gazon, pontons, buvette, location de pédalos. C'est le seul point du parcours où la baignade est une vraie baignade de vacances."
  },
  {
    km: 75, nm: "Aschau im Chiemgau", dest: "Schloss Hohenaschau, Aschau im Chiemgau",
    tags: [["view", "Vue"], ["", "Téléphérique"]],
    texte: "Le château de Hohenaschau domine la vallée depuis un éperon rocheux. Au-dessus, le téléphérique de la Kampenwand monte à 1 460 m — deux heures aller-retour si vous le tentez, ce qui n'est pas au programme aujourd'hui."
  },
  {
    km: 86, nm: "Sachrang", dest: "Sachrang, Aschau im Chiemgau",
    tags: [["", "Hameau"]],
    texte: "Un hameau au fond du Priental, à un kilomètre de la frontière autrichienne, avec une église baroque isolée dans les prés. Le point le plus reculé de la journée."
  },
  {
    km: 92, nm: "Col de Wildbichl · frontière", dest: "Wildbichl, Niederndorf, Tirol",
    tags: [["", "Frontière"]],
    texte: "On passe en Autriche sans s'en rendre compte, puis on revient en Allemagne vingt kilomètres plus loin. Aucun contrôle, mais gardez les papiers accessibles : la police allemande fait des contrôles mobiles dans la vallée de l'Inn."
  },
  {
    km: 106, nm: "Oberaudorf", dest: "Oberaudorf, Bayern",
    tags: [["", "Vallée de l'Inn"]],
    texte: "Descente sur l'axe Munich-Innsbruck : autoroute et voie ferrée côte à côte, après une vallée silencieuse. Le contraste dure quelques kilomètres seulement."
  },
  {
    km: 116, nm: "Tatzelwurm", dest: "Tatzelwurm Wasserfall, Oberaudorf",
    tags: [["view", "Cascade"], ["p", "2 €"]],
    texte: "Une cascade dans une gorge étroite, à cent mètres de la route, accessible par un escalier — dix minutes. Le nom vient d'une créature du folklore alpin, mi-lézard mi-dragon, censée hanter ces gorges."
  },
  {
    km: 122, nm: "Col du Sudelfeld · 1 123 m", dest: "Sudelfeld, Bayrischzell",
    tags: [["view", "Vue ★"], ["stop", "Arrêt photo"]],
    texte: "Le point culminant de la journée. Un plateau d'alpages ouvert, avec le Wendelstein en face et son observatoire au sommet. Plusieurs aires de stationnement panoramiques. Si vous ne descendez de voiture qu'une fois entre Bernau et le Walchensee, c'est ici."
  },
  {
    km: 128, nm: "Bayrischzell", dest: "Bayrischzell, Bayern",
    tags: [["", "Village"]],
    texte: "Village-carte-postale au pied du Wendelstein, dont le train à crémaillère de 1912 est le plus ancien chemin de fer de montagne d'Allemagne encore en service."
  },
  {
    km: 142, nm: "Schliersee", dest: "Strandbad Schliersee",
    tags: [["swim", "Baignade"]],
    texte: "Petit lac encaissé, très fréquenté le week-end par les Munichois. Strandbad municipal avec pelouse et plongeoir, accès libres plus discrets sur la rive est. Eau autour de 21 °C."
  },
  {
    km: 154, nm: "Tegernsee", dest: "Herzogliches Bräustüberl Tegernsee",
    tags: [["swim", "Baignade"], ["stop", "Brasserie"]],
    texte: "Le lac chic de la Bavière. La brasserie ducale, installée dans l'ancienne abbaye au bord de l'eau, est une institution : salle voûtée, service au comptoir, chope de litre moins chère que partout ailleurs."
  },
  {
    km: 174, nm: "Bad Tölz", dest: "Marktstraße, Bad Tölz",
    tags: [["stop", "Pause ★"], ["view", "Vieille ville"]],
    texte: "La plus jolie halte urbaine du parcours. La Marktstraße descend en pente douce vers l'Isar, large comme une place, bordée de façades peintes à fresque du XVIIIe siècle. Parkings faciles en contrebas."
  },
  {
    km: 189, nm: "Benediktbeuern", dest: "Kloster Benediktbeuern",
    tags: [["view", "Abbaye"], ["p", "Gratuit"]],
    texte: "Abbaye bénédictine de 739. C'est dans sa bibliothèque qu'on a découvert en 1803 le manuscrit des Carmina Burana, que Carl Orff a mis en musique. Église et cour en accès libre."
  },
  {
    km: 197, nm: "Kochelsee", dest: "Strandbad Kochel am See",
    tags: [["swim", "Baignade"], ["", "Musée Franz Marc"]],
    texte: "Grand lac plat au débouché de la montagne, et le plus chaud des lacs alpins du secteur — 21 à 22 °C. Plage municipale gratuite avec pelouse et buvette."
  },
  {
    km: 202, nm: "Col du Kesselberg", dest: "Kesselbergstraße, Kochel am See",
    tags: [["view", "Vue ★"], ["stop", "Prudence"]],
    texte: "Neuf virages en épingle sur cinq kilomètres. Lieu de pèlerinage pour les motards, au point que la route leur est fermée certains dimanches d'été. Le belvédère du sommet, sur la droite en montant, donne la vue de carte postale sur le Walchensee."
  },
  {
    km: 206, nm: "Walchensee", dest: "Einsiedl, Walchensee, Kochel am See",
    swim: true, plan: "bain",
    tags: [["swim", "Baignade ★★"], ["view", "Vue ★"]],
    texte: "Le clou de la journée. Un lac de haute montagne à 800 m, d'un turquoise saturé, entouré de sommets. La rive nord a plusieurs accès libres ; le meilleur est la Sandbucht près d'Einsiedl, une anse de sable clair. L'eau tourne autour de 18 °C — c'est vif, et c'est la baignade dont les enfants se souviendront."
  },
  {
    km: 214, nm: "Route de l'Isar · péage", dest: "Mautstraße Wallgau Vorderriss",
    tags: [["", "Détour"], ["", "Péage"]],
    texte: "Une route à péage privée part vers Vorderriss et longe l'Isar sauvage sur une quinzaine de kilomètres. C'est un détour, pas un raccourci — à garder pour un autre jour."
  },
  {
    km: 226, nm: "Krün · Barmsee", dest: "Barmsee, Krün",
    swim: true,
    tags: [["swim", "Baignade"], ["view", "Vue ★"]],
    texte: "Un petit lac tiède à l'écart de la route, avec le Wetterstein et la Zugspitze en toile de fond — l'un des points de vue les plus photographiés de Haute-Bavière. Autour de 22 °C. Parking gratuit, cinq minutes de marche."
  },
  {
    km: 240, nm: "Garmisch-Partenkirchen", dest: "Zugspitzestrasse 51, Garmisch-Partenkirchen",
    tags: [["stop", "Logement"]],
    texte: "L'appartement, Zugspitzestrasse 51, appartement 9 au 2e étage. Boîte à clefs, parking, lave-linge au sous-sol."
  },
  {
    km: 255, nm: "Abbaye d'Ettal", dest: "Kloster Ettal, Kaiser-Ludwig-Platz 1, Ettal",
    tags: [["view", "Abbaye"], ["stop", "Ferme à 18 h"]],
    texte: "La coupole baroque, la Madone de marbre, la boutique des moines. Si vous arrivez après 18 h, c'est pour demain matin ou pour dimanche — la route de Linderhof passe par la même vallée."
  },
  {
    km: 260, nm: "Oberammergau", dest: "Oberammergau, Bayern",
    tags: [["stop", "Arrivée"]],
    texte: "Les façades peintes, les ateliers de sculpture et le théâtre de la Passion. Les rues se visitent à toute heure."
  }
];

// Itinéraires groupés pour Google Maps (9 étapes intermédiaires maximum par lien).
const SEGMENTS = [
  {
    nm: "1 · Reit im Winkl → Bernau",
    detail: "25 km · 35 min · par la B305",
    origin: "Reit im Winkl, Bayern",
    destination: "Strandbad Felden, Bernau am Chiemsee",
    waypoints: ["Marquartstein, Bayern", "Grassau, Bayern"]
  },
  {
    nm: "2 · Bernau → Bayrischzell",
    detail: "63 km · 1 h 40 · le Priental et le Sudelfeld",
    origin: "Strandbad Felden, Bernau am Chiemsee",
    destination: "Bayrischzell, Bayern",
    waypoints: [
      "Schloss Hohenaschau, Aschau im Chiemgau",
      "Sachrang, Aschau im Chiemgau",
      "Oberaudorf, Bayern",
      "Tatzelwurm Wasserfall, Oberaudorf",
      "Sudelfeld, Bayrischzell"
    ]
  },
  {
    nm: "3 · Bayrischzell → Garmisch",
    detail: "112 km · 2 h 30 · les lacs et le Kesselberg",
    origin: "Bayrischzell, Bayern",
    destination: "Zugspitzestrasse 51, Garmisch-Partenkirchen",
    waypoints: [
      "Schliersee, Bayern",
      "Tegernsee, Bayern",
      "Bad Tölz, Bayern",
      "Kloster Benediktbeuern",
      "Kochel am See, Bayern",
      "Kesselbergstraße, Kochel am See",
      "Einsiedl, Walchensee, Kochel am See",
      "Barmsee, Krün"
    ]
  }
];
