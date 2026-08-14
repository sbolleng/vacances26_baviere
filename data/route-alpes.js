// ===== Route des Alpes · étapes kilométrées =====
//
// Siegsdorf → Oberammergau par la Deutsche Alpenstraße, dans l'ordre de passage.
//
//   km    : point kilométrique depuis Siegsdorf
//   nm    : nom de l'étape
//   dest  : adresse envoyée à Waze et à Maps
//   tags  : [type, texte] — "swim", "view", "stop", "p" (prix), "" (neutre)
//   swim  : true = bloc mis en avant (baignade)
//   plan  : "dej" ou "bain" = arrêt retenu pour aujourd'hui
//   texte : description courte, toujours visible
//   guide : texte long, dans le dépliant. HTML, rédigé à la main.

const ETAPES = [
  {
    km: 0, h: "10:18", nm: "Siegsdorf", dest: "Siegsdorf, Bayern",
    tags: [["", "Départ"], ["", "Carburant"]],
    texte: "Départ. Le plein se fait ici : le gazole est nettement moins cher en vallée qu'au bord de la B305.",
    guide: "<p>Vous prenez ici la <em>Deutsche Alpenstraße</em>, la route des Alpes allemandes, et il vaut la peine de savoir ce que c'est.</p><p><strong>Une idée de 1927.</strong> Dans les années 1920, l'Autriche a sa Grossglockner Hochalpenstraße en projet, la Suisse ses cols mythiques, l'Italie ses routes dolomitiques — et l'Allemagne, qui ne possède qu'une mince bande alpine large de quarante kilomètres, n'a rien à montrer. Un ingénieur munichois propose alors une route qui suivrait la ligne des Alpes d'un bout à l'autre du territoire : de Lindau, sur le lac de Constance, à Berchtesgaden. Quatre cent cinquante kilomètres, vingt-cinq lacs, une vingtaine de cols.</p><p>Le principe est explicitement l'inverse de celui d'une route ordinaire. Il ne s'agit pas d'aller d'un point à un autre, mais de passer par le plus grand nombre possible de beaux endroits. La route monte pour monter, contourne pour montrer, et perd volontairement du temps. C'est l'une des premières routes-promenades d'Europe, contemporaine de la Blue Ridge Parkway américaine, et elle repose sur une intuition alors neuve : que la voiture puisse être un moyen de contemplation et pas seulement de transport.</p><p><strong>Un chantier récupéré, puis abandonné.</strong> Les travaux démarrent en 1933 et sont immédiatement captés par le nouveau régime, qui en fait un symbole de la conquête technique du territoire. Puis la guerre arrive et tout s'arrête. Le tracé prévu ne sera jamais achevé : plusieurs sections, notamment dans l'Allgäu, n'ont jamais été construites, et l'itinéraire officiel d'aujourd'hui consiste à relier bout à bout des routes départementales existantes, avec un fléchage discret. D'où ce paradoxe : la route des Alpes allemandes est célèbre, elle figure dans tous les guides, et pratiquement personne ne la parcourt en entier. Elle se pratique par morceaux — et vous vous apprêtez à en faire l'un des meilleurs.</p>"
  },
  {
    km: 11, h: "10:33", nm: "Inzell", dest: "Inzell, Bayern",
    tags: [["", "Ravitaillement"]],
    texte: "Dernier vrai supermarché avant la montagne. Station connue pour son anneau de patinage de vitesse couvert."
  },
  {
    km: 22, h: "10:48", nm: "Weitsee", dest: "Weitsee Parkplatz, Reit im Winkl", swim: true,
    tags: [["swim", "Baignade"], ["view", "Vue"], ["", "Pique-nique"]],
    texte: "Le premier des trois lacs de la Chiemgauer Seenplatte, en réserve naturelle. Eau turquoise à 19 °C, galets clairs, sapins jusqu'à la rive.",
    guide: "<p>La route longe ici trois lacs alignés dans un couloir glaciaire — le Weitsee, le Mittersee et le Lödensee — et l'on voit l'eau depuis le pare-brise. Ce sont des lacs de fonte, très clairs, bordés de galets blancs. La réserve naturelle interdit tout aménagement : ni buvette, ni sanitaires, seulement des tables de bois.</p><p><strong>Pourquoi tous ces lacs.</strong> Vous allez en longer une douzaine en une journée, et ce n'est pas un hasard de parcours : c'est la signature d'un glacier. Il y a vingt mille ans, la glace descendait des Alpes jusqu'aux portes de Munich en langues épaisses de plusieurs centaines de mètres. Chacune a creusé sa vallée, poussé devant elle un bourrelet de débris, puis fondu sur place en laissant un barrage naturel derrière lequel l'eau s'est accumulée.</p><p>D'où deux familles de lacs très différentes, et vous verrez les deux. Les lacs de vallée surcreusée — Walchensee, Tegernsee — sont étroits, profonds, encaissés, avec une eau froide qui ne se réchauffe jamais parce que le volume est trop grand. Les lacs de moraine — Chiemsee, Kochelsee, Barmsee — occupent des cuvettes peu profondes, s'étalent largement, et l'été les rend tièdes. C'est toute la différence entre une baignade d'une heure au Chiemsee et cinq minutes en criant au Walchensee.</p><p><strong>Et pourquoi ils sont turquoise.</strong> Les Alpes bavaroises sont majoritairement calcaires — des sédiments déposés au fond d'une mer tropicale il y a deux cents millions d'années, puis soulevés lors de la collision entre l'Afrique et l'Europe. Le calcaire se dissout lentement dans l'eau et libère des particules d'une finesse extrême, qui restent en suspension et diffusent la lumière bleue. C'est cela, et rien d'autre, qui donne à ces lacs leur couleur irréelle. Les lacs de granit, dans les Vosges ou en Scandinavie, sont noirs pour exactement la raison inverse.</p>"
  },
  {
    km: 28, h: "10:56", nm: "Mittersee et Lödensee", dest: "Lödensee, Reit im Winkl", swim: true,
    tags: [["swim", "Baignade"], ["", "Calme"]],
    texte: "Les deux petits frères du Weitsee, souvent déserts en semaine. Le Lödensee a une plage de sable au bout d'un sentier de cinq minutes."
  },
  {
    km: 40, h: "11:11", nm: "Reit im Winkl", dest: "Reit im Winkl, Bayern",
    tags: [["stop", "Pause"], ["", "Carburant"]],
    texte: "Station familiale au fond d'un cul-de-sac collé à la frontière. Terrasses et boulangeries sur la rue principale.",
    guide: "<p>Le village est un cul-de-sac collé à la frontière autrichienne, cerné par les Alpes du Chiemgau. Sa particularité tient à la météo : la configuration de la cuvette y piège les perturbations et y accumule des quantités de neige sans rapport avec l'altitude — c'est régulièrement l'endroit le plus enneigé d'Allemagne, avec des hivers à plusieurs mètres.</p><p>D'où une tradition de ski qui a produit Rosi Mittermaier, double championne olympique en 1976, enfant du pays et l'une des sportives les plus populaires de l'histoire allemande jusqu'à sa mort en 2023. Le village vit du tourisme depuis un siècle et l'assume pleinement : chalets fleuris, fresques peintes, et une densité de <em>Gasthof</em> au mètre carré assez remarquable.</p><p><strong>Où s'arrêter manger, dans les grandes lignes.</strong> Le <em>Gasthof</em> est l'auberge de village, ouverte midi et soir avec une interruption l'après-midi — arriver à quinze heures en espérant déjeuner ne fonctionne pas. La <em>Alm</em> est le refuge d'alpage, souvent accessible en voiture sur cette route, service continu et carte réduite. Le <em>Biergarten</em>, enfin, obéit à une coutume bavaroise inscrite dans la loi depuis 1812 : on a le droit d'y apporter sa propre nourriture, à condition de consommer les boissons sur place. C'est parfaitement légal, personne ne vous regardera de travers, et c'est la solution la moins chère avec des enfants.</p>"
  },
  {
    km: 55, h: "11:25", nm: "Marquartstein", dest: "Marquartstein, Bayern",
    tags: [["view", "Vue"]],
    texte: "Château perché au-dessus du village, et la vallée de l'Achen qui s'ouvre : le paysage passe des gorges boisées aux prairies larges."
  },
  {
    km: 65, h: "11:40", nm: "Bernau am Chiemsee", dest: "Strandbad Felden, Bernau am Chiemsee",
    swim: true,
    tags: [["swim", "Baignade ★"], ["", "24 °C"]],
    texte: "Le Chiemsee, la « mer bavaroise » — l'eau la plus chaude de tout l'itinéraire, 23 à 24 °C. Plage de Felden à deux kilomètres de la sortie.",
    guide: "<p>La montagne s'écarte d'un coup et le plus grand lac de Bavière apparaît : quatre-vingts kilomètres carrés, deux îles, et une lumière complètement différente. On l'appelle le <em>Bayerisches Meer</em>, la mer bavaroise.</p><p><strong>Les deux îles.</strong> Sur l'île des Hommes, Louis II a fait bâtir Herrenchiemsee, une réplique de Versailles dont il n'a achevé qu'un tiers et où il n'a dormi que dix nuits — vous croiserez le même personnage dimanche à Linderhof et à Neuschwanstein, et vous commencerez à comprendre le motif. Sur l'île des Dames, un couvent bénédictin fondé au VIII<sup>e</sup> siècle produit une liqueur et un pain d'épices vendus au débarcadère.</p><p><strong>Pour vous.</strong> L'intérêt est plus simple : c'est le seul plan d'eau vraiment chaud de la journée. Vingt-trois à vingt-quatre degrés en août, des plages de gazon, des pontons, des pédalos. C'est un lac de moraine, large et peu profond, qui emmagasine la chaleur tout l'été — l'inverse exact du Walchensee où vous finirez la journée.</p>"
  },
  {
    km: 75, h: "11:55", nm: "Aschau im Chiemgau", dest: "Schloss Hohenaschau, Aschau im Chiemgau",
    tags: [["view", "Vue"], ["", "Téléphérique"]],
    texte: "Le château de Hohenaschau domine la vallée depuis un éperon rocheux. Au-dessus, le téléphérique de la Kampenwand monte à 1 460 m.",
    guide: "<p>Après Aschau, la route s'enfonce dans le Priental, une vallée étroite qui se vide à mesure qu'on avance. C'est la partie secrète du parcours : plus de cars, plus de stations, quelques fermes et des prés.</p><p>Le château de Hohenaschau, planté sur son éperon, gardait l'entrée de la vallée depuis le XII<sup>e</sup> siècle. Au-dessus, la Kampenwand et son téléphérique offrent l'un des plus beaux panoramas sur le Chiemsee — mais c'est deux heures aller-retour, ce qui ne rentre pas dans la journée d'aujourd'hui.</p>"
  },
  {
    km: 86, h: "12:15", nm: "Sachrang", dest: "Sachrang, Aschau im Chiemgau",
    tags: [["", "Hameau"]],
    texte: "Un hameau au fond du Priental, à un kilomètre de l'Autriche, avec une église baroque isolée dans les prés. Le point le plus reculé de la journée.",
    guide: "<p>Quelques centaines d'habitants, une église baroque seule au milieu des prés, et le silence. Sachrang est le bout du Priental, à un kilomètre de la frontière autrichienne.</p><p>Le village entretient la mémoire du « Müllner Peter », un meunier du XIX<sup>e</sup> siècle qui était aussi compositeur, guérisseur et herboriste — une de ces figures de sagesse rurale dont la Bavière raffole. Son moulin se visite.</p>"
  },
  {
    km: 92, h: "12:25", nm: "Col de Wildbichl · frontière", dest: "Wildbichl, Niederndorf, Tirol",
    tags: [["", "Frontière"]],
    texte: "On passe en Autriche sans s'en rendre compte, puis on revient en Allemagne vingt kilomètres plus loin. Gardez les papiers accessibles."
  },
  {
    km: 106, h: "12:45", nm: "Oberaudorf", dest: "Oberaudorf, Bayern",
    tags: [["", "Vallée de l'Inn"]],
    texte: "Descente sur l'axe Munich-Innsbruck : autoroute et voie ferrée côte à côte, après une vallée silencieuse. Le contraste dure quelques kilomètres."
  },
  {
    km: 116, h: "13:05", nm: "Tatzelwurm", dest: "Tatzelwurm Wasserfall, Oberaudorf",
    tags: [["view", "Cascade"], ["p", "2 €"]],
    texte: "Une cascade dans une gorge étroite, à cent mètres de la route, par un escalier. Dix minutes. Frais et ombragé.",
    guide: "<p>La remontée vers le Sudelfeld est le premier vrai morceau de bravoure routier de la journée : des lacets serrés dans la forêt, et cette gorge où gronde une cascade à cent mètres de la chaussée.</p><p><strong>Le nom.</strong> Le <em>Tatzelwurm</em>, le « ver à pattes », est une créature du folklore alpin — une sorte de lézard-dragon trapu que les bergers juraient avoir vu jusqu'au XIX<sup>e</sup> siècle. Les récits sont assez nombreux et concordants pour que des naturalistes s'y soient sérieusement intéressés ; on n'a jamais rien trouvé. Le nom est resté sur la cascade, sur l'auberge et sur la route.</p>"
  },
  {
    km: 122, h: "13:20", nm: "Col du Sudelfeld · 1 123 m", dest: "Sudelfeld, Bayrischzell",
    plan: "dej",
    tags: [["view", "Vue ★"], ["stop", "Pique-nique"]],
    texte: "Le point culminant de la journée. Plateau d'alpages ouvert, le Wendelstein en face, plusieurs aires de stationnement panoramiques.",
    guide: "<p>À 1 123 mètres, le paysage s'ouvre d'un coup sur un plateau d'alpages. C'est le point haut de la journée, et de loin le meilleur endroit pour sortir les sandwiches : plusieurs aires de stationnement panoramiques, de l'herbe, et une vue qui porte loin.</p><p><strong>Le Wendelstein, en face.</strong> Reconnaissable à la petite église et à l'observatoire plantés à son sommet. C'est l'église la plus haute d'Allemagne, bâtie en 1890 par des ouvriers qui montaient le matériel à dos de mulet. Un train à crémaillère y grimpe depuis 1912 — le plus ancien chemin de fer de montagne du pays encore en service. L'observatoire, lui, mesure l'atmosphère depuis plus d'un siècle.</p><p><strong>Si vous préférez une table.</strong> Des auberges d'altitude bordent la route au col et servent en continu la <em>Brotzeit</em> — cette collation froide de charcuteries, fromage, radis et pain noir qui est l'institution la plus fiable de Bavière. Elles acceptent qu'on s'installe en terrasse avec ses propres sandwiches si l'on consomme les boissons sur place : c'est la coutume du Biergarten, et elle vaut aussi ici.</p><p><strong>Un mot pratique.</strong> Beaucoup d'établissements de campagne n'acceptent toujours pas la carte bancaire, ou seulement au-delà d'un certain montant. Gardez cinquante à cent euros en espèces pour la journée — c'est également vrai pour les parkings des lacs, souvent équipés d'horodateurs à pièces uniquement.</p>"
  },
  {
    km: 128, h: "14:45", nm: "Bayrischzell", dest: "Bayrischzell, Bayern",
    tags: [["", "Village"]],
    texte: "Village-carte-postale au pied du Wendelstein, au débouché de la descente du Sudelfeld."
  },
  {
    km: 142, h: "15:10", nm: "Schliersee", dest: "Strandbad Schliersee",
    tags: [["swim", "Baignade"]],
    texte: "Petit lac encaissé, très fréquenté par les Munichois. Strandbad municipal avec pelouse et plongeoir, eau autour de 21 °C.",
    guide: "<p>Schliersee puis Tegernsee : on entre dans l'arrière-cour de Munich, à une heure de la ville, et cela change tout. Ces deux lacs sont le lieu de villégiature de la bourgeoisie bavaroise depuis le XIX<sup>e</sup> siècle, et l'un des mètres carrés les plus chers d'Allemagne.</p><p>On y croise des maisons de famille à colombages repeints, des cliniques privées, et une densité de voitures allemandes récentes assez frappante après le silence du Priental. Le Schliersee lui-même reste le plus modeste des deux : un petit lac encaissé, avec un Strandbad municipal simple et des accès libres plus discrets sur la rive est.</p>"
  },
  {
    km: 154, h: "15:35", nm: "Tegernsee", dest: "Herzogliches Bräustüberl Tegernsee",
    tags: [["swim", "Baignade"], ["stop", "Brasserie"]],
    texte: "Le lac chic de la Bavière. La brasserie ducale, dans l'ancienne abbaye au bord de l'eau, est une institution.",
    guide: "<p>Le Tegernsee mérite l'arrêt pour une raison précise : le <em>Herzogliches Bräustüberl</em>, la brasserie ducale installée dans l'ancienne abbaye au bord de l'eau.</p><p>C'est une salle voûtée où l'on se sert soi-même, où l'on boit debout ou sur de longues tables communes, où la chope de litre coûte moins cher que partout ailleurs en Bavière, et où le duc de Bavière reste officiellement propriétaire des lieux. C'est bruyant, populaire, et parfaitement authentique — l'inverse exact de la station huppée qui l'entoure.</p><p>Côté baignade, les accès libres sont au Point de Gmund, à la pointe nord, et à Bad Wiessee sur la rive ouest.</p>"
  },
  {
    km: 174, h: "16:06", nm: "Bad Tölz", dest: "Marktstraße, Bad Tölz",
    tags: [["stop", "Pause ★"], ["view", "Vieille ville"]],
    texte: "La plus jolie halte urbaine du parcours. La Marktstraße, large comme une place, bordée de façades peintes à fresque.",
    guide: "<p>La Marktstraße descend en pente douce vers l'Isar, large comme une place, bordée de maisons à pignons plats et à façades peintes — ocre, rose pâle, vert d'eau, avec des encadrements en trompe-l'œil. C'est probablement la plus jolie petite ville que vous verrez avant Lindau, et les parkings en contrebas sont faciles.</p><p><strong>D'où vient l'argent.</strong> La ville a fait fortune au Moyen Âge grâce au flottage du bois et au commerce du sel, qui descendaient l'Isar jusqu'à Munich. Puis elle s'est reconvertie en 1846, quand on y a découvert une source iodée — la plus riche d'Europe. Elle vit depuis du thermalisme, ce qui explique les grands établissements en périphérie et la moyenne d'âge élevée sur les bancs publics.</p><p>Pour les Allemands, Bad Tölz est aussi le décor d'une série policière culte diffusée pendant vingt ans, ce qui lui vaut une notoriété sans rapport avec sa taille.</p>"
  },
  {
    km: 189, h: "16:53", nm: "Benediktbeuern", dest: "Kloster Benediktbeuern",
    tags: [["view", "Abbaye"], ["p", "Gratuit"]],
    texte: "Abbaye bénédictine de 739. C'est ici qu'on a découvert le manuscrit des Carmina Burana. Église et cour en accès libre.",
    guide: "<p>Cette abbaye bénédictine, fondée en 739, cache une histoire qui dépasse largement le cadre local.</p><p>Elle possédait dans sa bibliothèque un manuscrit oublié depuis des siècles. Quand les biens du clergé sont saisis en 1803, un bibliothécaire le retrouve et le transfère à Munich : c'est le recueil des <em>Carmina Burana</em>, deux cent cinquante-quatre poèmes latins et allemands du XIII<sup>e</sup> siècle, écrits par des clercs vagabonds, célébrant le vin, le jeu, l'amour et la roue de la Fortune.</p><p>Carl Orff en a mis vingt-quatre en musique en 1936. Le chœur d'ouverture, <em>O Fortuna</em>, est devenu l'un des morceaux les plus utilisés au cinéma et à la télévision — tout le monde le connaît sans savoir d'où il vient. Il vient d'ici, de cette abbaye que vous longez.</p>"
  },
  {
    km: 197, h: "17:05", nm: "Kochelsee", dest: "Strandbad Kochel am See",
    tags: [["swim", "Baignade"], ["", "Musée Franz Marc"]],
    texte: "Grand lac plat au débouché de la montagne, le plus chaud du secteur — 21 à 22 °C. Plage municipale gratuite.",
    guide: "<p>Un lac de moraine, large et peu profond, posé exactement là où la montagne s'arrête et où la plaine commence. Il se réchauffe vite : 21 à 22 °C en août, contre 18 au Walchensee qui le surplombe de deux cents mètres.</p><p>Le peintre Franz Marc, l'un des fondateurs du Cavalier bleu avec Kandinsky, a vécu et travaillé ici. Ses chevaux bleus et ses cerfs jaunes sont nés dans ces paysages. Un musée lui est consacré à cent mètres de la rive — petit, lumineux, et une bonne demi-heure si le temps le permet.</p>"
  },
  {
    km: 202, h: "17:15", nm: "Col du Kesselberg", dest: "Kesselbergstraße, Kochel am See",
    tags: [["view", "Vue ★"], ["stop", "Prudence"]],
    texte: "Neuf virages en épingle sur cinq kilomètres. Le belvédère du sommet, à droite en montant, donne la vue sur le Walchensee.",
    guide: "<p>La dernière partie du trajet est la meilleure, et elle commence ici. Du Kochelsee, la route grimpe le col du Kesselberg en neuf épingles serrées sur cinq kilomètres, avec deux cents mètres de dénivelé.</p><p>Le passage est un mythe pour les motards allemands, au point que l'administration l'a fermé aux deux-roues certains dimanches d'été après une série d'accidents mortels. Un vendredi d'août, vous en croiserez beaucoup, souvent vite et sur l'angle : gardez votre trajectoire et n'hésitez pas à vous laisser doubler.</p><p>Le belvédère du sommet, sur la droite en montant, donne la vue de carte postale sur le Walchensee. Arrêtez-vous : c'est de là que la couleur du lac est la plus spectaculaire, vue de haut.</p>"
  },
  {
    km: 206, h: "17:25", nm: "Walchensee", dest: "Einsiedl, Walchensee, Kochel am See",
    swim: true, plan: "bain",
    tags: [["swim", "Baignade ★★"], ["view", "Vue ★"], ["", "18 °C"]],
    texte: "Le clou de la journée. Lac de haute montagne à 800 m, turquoise saturé, cerné de sommets. La Sandbucht près d'Einsiedl est le meilleur accès.",
    guide: "<p>Le Walchensee apparaît d'un coup au sommet du col : huit cents mètres au-dessus du niveau de la mer, d'un turquoise dense qui paraît artificiel. C'est l'un des plus grands et des plus profonds lacs alpins d'Allemagne — cent quatre-vingt-dix mètres de fond — et sa couleur vient des fines particules calcaires en suspension.</p><p><strong>L'électricité.</strong> En 1924, on a construit une centrale hydroélectrique qui utilise les deux cents mètres de dénivelé entre le Walchensee et le Kochelsee. Elle fut longtemps la plus puissante d'Europe et alimente encore le réseau ferroviaire bavarois. Les conduites forcées descendent la montagne juste à côté de la route que vous venez de monter.</p><p><strong>L'or.</strong> En avril 1945, dans les derniers jours du régime, des convois de la Reichsbank ont dispersé les réserves d'or et de devises dans les Alpes bavaroises. Une partie a été enterrée dans la région, et l'on a longtemps affirmé que des caisses avaient été immergées dans ce lac. Des plongeurs, des chercheurs de trésor et quelques expéditions officielles s'y sont succédé pendant des décennies ; on a effectivement remonté des billets, jamais l'or. L'affaire alimente encore les conversations locales.</p><p><strong>La baignade.</strong> La rive nord, à Urfeld, offre plusieurs accès libres, et l'anse de sable près d'Einsiedl est le meilleur endroit du lac. L'eau est à dix-huit degrés : c'est court, c'est vif, et c'est exactement le genre de bain dont on se souvient vingt ans plus tard. C'est aussi un spot de planche à voile réputé, grâce à un vent thermique qui se lève l'après-midi.</p><p><strong>La lumière.</strong> Les crêtes coupent le soleil bien avant le coucher : en août, la rive nord bascule progressivement à l'ombre à partir de 18 h 30 environ. À 17 h 25 vous avez encore l'eau en pleine lumière, mais ne traînez pas trop — c'est plus agréable au soleil, et l'eau est à dix-huit degrés.</p>"
  },
  {
    km: 214, h: "18:20", nm: "Route de l'Isar · péage", dest: "Mautstraße Wallgau Vorderriss",
    tags: [["", "Détour"], ["", "Péage"]],
    texte: "Une route privée part vers Vorderriss et longe l'Isar sauvage sur quinze kilomètres. C'est un détour, pas un raccourci."
  },
  {
    km: 226, h: "18:40", nm: "Krün · Barmsee", dest: "Barmsee, Krün",
    swim: true,
    tags: [["swim", "Baignade"], ["view", "Vue ★"], ["", "22 °C"]],
    texte: "Petit lac tiède à l'écart de la route, avec le Wetterstein et la Zugspitze en toile de fond. Parking gratuit, cinq minutes de marche.",
    guide: "<p>Après Wallgau et Krün, la vallée s'élargit une dernière fois et le massif du Wetterstein ferme l'horizon — avec, au milieu, la Zugspitze que vous monterez demain.</p><p>Le Barmsee, minuscule et peu profond, offre le point de vue le plus photographié de Haute-Bavière : le lac au premier plan, la chaîne entière derrière. Il se réchauffe vite, autour de vingt-deux degrés, et le parking est gratuit à cinq minutes de marche.</p><p>Si le Walchensee a été trop froid pour les enfants, c'est ici qu'il faut leur offrir la revanche.</p>"
  },
  {
    km: 240, h: "19:00", nm: "Garmisch-Partenkirchen", dest: "Zugspitzestrasse 51, Garmisch-Partenkirchen",
    tags: [["stop", "Logement"]],
    texte: "L'appartement, Zugspitzestrasse 51, appartement 9 au 2e étage. Boîte à clefs, parking, lave-linge au sous-sol."
  },
  {
    km: 255, h: "19:20", nm: "Abbaye d'Ettal", dest: "Kloster Ettal, Kaiser-Ludwig-Platz 1, Ettal",
    tags: [["view", "Abbaye"], ["stop", "Ferme à 18 h"]],
    texte: "Coupole baroque, Madone de marbre, boutique des moines. Si vous arrivez après 18 h, c'est pour demain matin ou pour dimanche."
  },
  {
    km: 260, h: "19:30", nm: "Oberammergau", dest: "Oberammergau, Bayern",
    tags: [["stop", "Arrivée"]],
    texte: "Les façades peintes, les ateliers de sculpture et le théâtre de la Passion. Les rues se visitent à toute heure."
  }
];

// Itinéraires groupés pour Google Maps (neuf étapes intermédiaires maximum par lien).
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
