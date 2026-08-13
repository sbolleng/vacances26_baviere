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
    alerte: "Avec le bateau à 13 h 30, le Kehlsteinhaus ne tient pas dans la journée : la dernière montée en bus est vers 16 h et vous serez encore sur le lac. Voir la note en bas de journée.",
    acts: [
      {
        nm: "Wimbachklamm — gorges",
        leg: { from: "Siegsdorf", to: "Wimbachklamm", dur: "~55 min", km: "63 km", maps: "Parkplatz Wimbachbrücke, Ramsau bei Berchtesgaden" },
        tags: [["p", "4 €"], ["h", "1 h aller-retour"], ["", "Pkg payant Wimbachbrücke"]],
        note: "Le jeton d'entrée s'achète à l'automate de la dernière maison (Wimbachlehen) avant l'entrée — prévoir de la monnaie. Les gorges elles-mêmes font 10 min de marche ; compter 1 h avec l'aller-retour depuis le parking.",
        guide: "<p>Vous entrez ici par la plus courte des gorges de Bavière — et sans doute la plus étrange. La Wimbachklamm ne fait que deux cents mètres de passerelles, mais elle donne accès à l'un des phénomènes géologiques les plus singuliers des Alpes.</p><p><strong>Une rivière qui disparaît.</strong> Regardez l'eau en contrebas : elle jaillit littéralement des parois, en cascades latérales, plutôt que de couler du fond de la vallée. C'est que la Wimbach, en amont, ne coule pas en surface. Elle se perd dans le <em>Wimbachgries</em>, un immense fleuve de pierre — sept kilomètres de gravats calcaires et dolomitiques, épais de trois cents mètres par endroits, arrachés depuis des millénaires aux flancs du Watzmann et du Hochkalter. L'eau circule à l'intérieur de ce gigantesque filtre, puis ressurgit ici sous pression, d'une pureté rare. C'est un des rares endroits d'Europe où l'on voit une rivière renaître au lieu de couler.</p><p><strong>Les passerelles.</strong> Elles datent de 1927 : des planches de bois boulonnées à la roche, refaites chaque printemps parce que l'hiver les démolit. Elles suivent la paroi au-dessus du torrent, sous une pluie permanente d'embruns — vous allez être mouillés, c'est le principe. Les mousses et les fougères qui tapissent les parois vivent dans un microclimat saturé d'humidité, dix degrés plus frais que le parking.</p><p><strong>Où vous êtes.</strong> Ramsau est ce qu'on appelle en Allemagne un <em>Bergsteigerdorf</em>, un « village d'alpinistes » — un label qui interdit les remontées mécaniques et le tourisme de masse. À deux kilomètres, l'église Sankt Sebastian, avec son clocher blanc devant le torrent et les sommets, est réputée l'église la plus photographiée d'Allemagne : les peintres romantiques du XIX<sup>e</sup> siècle en ont fait un motif, et les cars s'arrêtent encore pour le même cadrage. Si vous avez dix minutes au retour, ça vaut le détour.</p><p><strong>Le Watzmann, au-dessus de vous.</strong> C'est le troisième sommet d'Allemagne, 2 713 m. La légende locale raconte qu'un roi cruel, chasseur forcené, lâcha ses chiens sur une famille de paysans ; Dieu le pétrifia avec sa femme et ses sept enfants. Le massif s'appelle encore ainsi : le Watzmann, la Watzmannfrau, et les <em>Watzmannkinder</em>, les sept enfants alignés entre eux. Vous les avez sous les yeux depuis la vallée.</p><p><strong>Si vous voulez marcher plus.</strong> Le sentier continue au-delà des gorges vers le Wimbachschloss, ancien pavillon de chasse des princes-évêques devenu refuge — une heure et demie depuis le parking, à travers le gries. Le contraste est saisissant : on passe de la gorge étroite et sombre à une vallée blanche, minérale, presque lunaire, cernée de parois. Mais avec le bateau à 13 h 30, gardez ça pour une autre fois.</p><p><strong>Avant les touristes, le bois.</strong> Ces gorges n'ont pas été ouvertes pour le paysage. Jusqu'au début du XX<sup>e</sup> siècle, on y pratiquait le flottage : les troncs coupés en amont étaient jetés dans le torrent, qui les charriait jusqu'à la vallée — une méthode brutale et meurtrière, et le seul moyen de sortir le bois d'une vallée sans route. Les premières passerelles servaient aux flotteurs, chargés de décoincer les embâcles au péril de leur vie. Ce n'est qu'en 1927, le flottage abandonné, qu'on a rouvert le passage au public.</p><p><strong>Ce que vous pourriez voir.</strong> Guettez le cincle plongeur, un petit oiseau brun à bavette blanche qui marche littéralement sous l'eau, sur le fond du torrent, pour y chercher des larves. Il est ici chez lui. Plus haut sur les pentes, les chamois descendent au crépuscule, et le parc abrite quelques bouquetins réintroduits ainsi que des aigles royaux — mais ceux-là se méritent aux jumelles.</p><p>Toute la zone est dans le parc national de Berchtesgaden, créé en 1978 — le seul parc national alpin d'Allemagne. Ce qui explique l'absence de buvette, de boutique et de tout aménagement : ici, on ne construit plus.</p>"
      },
      {
        nm: "Königssee — bateau 13 h 30",
        leg: { from: "Wimbachklamm", to: "Königssee", dur: "~20 min", km: "12 km", maps: "Schifffahrt Königssee, Seestraße 3, Schönau am Königssee" },
        tags: [["h", "Bateau 13 h 30"], ["p", "28,50 € A/R"], ["", "Départ Seelände, Schönau"], ["", "Salet ≈ 1 h de trajet"]],
        note: "Aller jusqu'à Salet, puis retour avec escale à l'église St-Barthélemy. Compter 4 h à 4 h 30 au total, retour au parking vers 17 h 30.",
        guide: "<p>Huit kilomètres de long, cent quatre-vingt-dix mètres de fond, coincés entre des parois qui tombent à pic dans l'eau : le Königssee est le plus proche cousin d'un fjord que l'Allemagne possède. C'est un surcreusement glaciaire, comblé après le retrait des glaces, et l'un des lacs les plus purs d'Europe — on peut y boire.</p><p><strong>Pourquoi le silence.</strong> Vous allez le remarquer dès le départ : les bateaux ne font aucun bruit. La navigation à moteur thermique est interdite depuis 1909, et la flotte est entièrement électrique — avant l'électricité, on ramait. Vingt-et-un bateaux se relaient aujourd'hui, et l'équipage vous demandera de parler bas. Ce n'est pas de la mise en scène : le lac renvoie tout.</p><p><strong>La trompette.</strong> Au tiers du parcours, le bateau coupe les moteurs devant l'Echowand, une paroi verticale, et un membre d'équipage sort un bugle. Il joue quelques notes, et la falaise les renvoie, nettes, avec deux à trois secondes de retard. La tradition remonte au XIX<sup>e</sup> siècle, où l'on tirait au canon pour la même démonstration. On fait passer le chapeau ensuite — c'est de bon cœur.</p><p><strong>Saint-Barthélemy.</strong> C'est la carte postale : une chapelle rouge à trois absides coiffées de bulbes, posée sur une presqu'île, écrasée par deux mille mètres de roche. L'église remonte au XII<sup>e</sup> siècle, mais la silhouette actuelle date de 1697 — le plan à trois conques est un écho de l'église du Saint-Sépulcre. À côté, l'ancien pavillon de chasse des princes-prévôts de Berchtesgaden, devenu auberge. On y fume l'omble chevalier du lac, le <em>Saibling</em>, servi entier avec une tranche de pain : c'est <em>le</em> plat de l'endroit, et il se mange dehors face à l'eau.</p><p><strong>La face est du Watzmann.</strong> Elle vous domine depuis St-Barthélemy : mille huit cents mètres d'un seul jet, la plus haute paroi des Alpes orientales. Plus d'une centaine d'alpinistes y sont morts depuis la première ascension en 1881, ce qui lui a valu le surnom de « mur de la mort ». En bas, à une heure de marche, l'<em>Eiskapelle</em> — un névé permanent que la fonte creuse chaque été en une voûte de glace, le point le plus bas d'Europe où la neige tient toute l'année.</p><p><strong>Salet et l'Obersee.</strong> C'est le terminus, et la raison d'aller au bout. Un quart d'heure de marche facile depuis le débarcadère mène à l'Obersee, un second lac, plus petit, plus sauvage, sans aucune construction. Par temps calme, le reflet des parois y est intégral — c'est l'image que tout le monde rapporte. En longeant la rive une demi-heure de plus, on atteint la Fischunkelalm, un alpage qui vend son lait caillé l'été, et l'on aperçoit le Röthbachfall : quatre cent soixante-dix mètres de chute, la plus haute d'Allemagne, si fine qu'elle se dissipe en brume avant d'arriver en bas.</p><p><strong>Un lac qui a fait sa réputation en peinture.</strong> Le tourisme ici est né au XIX<sup>e</sup> siècle, quand les rois de Bavière ont mis Berchtesgaden à la mode et que les paysagistes de l'école de Munich sont venus planter leurs chevalets. Le point de vue s'appelle encore le <em>Malerwinkel</em>, « le coin des peintres » : un sentier plat de vingt minutes depuis l'embarcadère, sur la rive ouest, qui donne la vue classique sur toute la longueur du lac. Si vous avez du temps avant le bateau, c'est là qu'il faut aller — et c'est gratuit.</p><p><strong>Le conseil pratique.</strong> Les bateaux du retour se prennent au fil de l'eau, mais ils se remplissent : ne visez pas le tout dernier. Gardez votre billet, il fait office de coupe-file à chaque escale. Prévoyez une petite laine même en août — sur l'eau, à l'ombre des parois, il fait facilement dix degrés de moins qu'au parking — et de l'espèce, car la buvette de St-Barthélemy et l'alpage de la Fischunkelalm ne prennent pas toujours la carte.</p>"
      },
      {
        nm: "Kehlsteinhaus — le nid d'aigle",
        leg: { from: "Königssee", to: "Kehlsteinhaus", dur: "~20 min", km: "10 km", maps: "Kehlstein Busabfahrt, Salzbergstraße 45, Berchtesgaden" },
        tags: [["warn", "Dernière montée ≈ 16 h"], ["p", "31,90 €"], ["h", "8 h 30 – 16 h 50"], ["", "Pkg Obersalzberg"]],
        note: "Accès uniquement par le bus 849 depuis le parking d'Obersalzberg — 20 min de montée, départs toutes les 25 min. Avec le bateau de 13 h 30, c'est infaisable aujourd'hui : à replacer demain matin avant de partir pour Oberammergau.",
        guide: "<p>Il faut le dire d'emblée, parce que le lieu ne le dit pas assez lui-même : ce belvédère est un cadeau d'anniversaire nazi. Martin Bormann l'a fait construire en 1937-38 pour les cinquante ans d'Hitler, et tout, ici, relève de la démonstration de puissance.</p><p><strong>Treize mois de chantier.</strong> Trois mille ouvriers, sept jours sur sept, à trois équipes. La route qui y mène — six kilomètres, cinq tunnels, un seul virage en épingle — a été taillée dans la falaise à l'explosif, et elle grimpe de sept cents mètres sans jamais dépasser 24 % de pente. Une douzaine d'ouvriers y ont laissé la vie. Le coût, trente millions de reichsmarks, représentait plusieurs centaines de millions d'euros actuels, ponctionnés sur les caisses du parti.</p><p><strong>L'ascenseur.</strong> C'est la pièce maîtresse. La route s'arrête au pied du sommet ; un tunnel de cent vingt-quatre mètres s'enfonce à l'horizontale dans la roche, puis une cabine remonte les cent vingt-quatre derniers mètres à l'intérieur de la montagne. L'intérieur est doublé de laiton poli, avec des miroirs vénitiens — Hitler, qui redoutait les espaces confinés et la foudre, s'en méfiait. Il n'est monté ici qu'une quinzaine de fois. Eva Braun, elle, y venait volontiers, et les rares films en couleur du lieu sont d'elle.</p><p><strong>Ce qui n'existe plus en bas.</strong> Obersalzberg, la terrasse où vous prenez le bus, était un village entier réquisitionné : Hitler y avait le Berghof, sa résidence principale, et Bormann, Göring, Speer leurs propres maisons, au milieu d'une zone interdite ceinturée de barbelés, de casernes SS et d'un réseau de bunkers souterrains. La RAF a tout écrasé le 25 avril 1945. Ce qui restait a été dynamité par la Bavière en 1952, précisément pour éviter que le site ne devienne un lieu de pèlerinage. Il ne reste que des fondations dans la forêt — et le Kehlsteinhaus, épargné pour sa valeur touristique.</p><p><strong>Ce qu'il est devenu.</strong> Depuis 1960, la maison est gérée par une fondation caritative : les bénéfices du restaurant vont à des œuvres sociales du Berchtesgadener Land. C'est une réponse assumée à l'embarras du lieu. Le musée de la Documentation Obersalzberg, en bas près du parking, complète honnêtement le tableau — c'est là qu'on trouve l'histoire, pas là-haut.</p><p><strong>La cheminée de Mussolini.</strong> Dans la grande salle, la cheminée de marbre rouge de Vérone est un cadeau du Duce. Regardez-en les angles : ils sont ébréchés, grossièrement. Ce sont les soldats américains qui, en mai 1945, en ont cassé des morceaux au couteau et à la crosse pour les rapporter en souvenir — on en retrouve encore aujourd'hui dans des greniers du Midwest. C'est à peu près le seul élément d'origine que vous verrez : le reste du mobilier a été pillé ou dispersé dans les semaines qui ont suivi la capitulation.</p><p><strong>La vue.</strong> Elle est, il faut l'admettre, extraordinaire. À 1 834 m, la terrasse ouvre plein nord sur le bassin de Salzbourg, quarante kilomètres de plaine autrichienne, et plein sud sur le Hoher Göll qui vous surplombe encore de six cents mètres. En face, l'Untersberg : la légende veut que l'empereur Frédéric Barberousse y dorme dans une caverne, sa barbe poussant autour d'une table de pierre, et qu'il se réveillera quand les corbeaux cesseront de tourner autour du sommet.</p><p><strong>Logistique.</strong> On ne monte pas en voiture — le bus 849 part du parking d'Obersalzberg, toutes les vingt-cinq minutes, vingt minutes de trajet. Le billet est aller-retour et l'on vous assigne une heure de descente à l'achat. La dernière montée est vers 16 h, la dernière descente vers 16 h 50. Comptez deux heures et demie sur place, minimum.</p>"
      }
    ],
    retour: { from: "Obersalzberg", to: "Siegsdorf", dur: "~55 min", km: "58 km", maps: "Weidenstrasse 19, Siegsdorf" },
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
