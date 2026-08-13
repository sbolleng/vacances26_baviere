# Bavière 2026

Le guide de nos vacances, du 8 au 20 août 2026. Site statique, pensé pour être
consulté depuis un téléphone : il s'ouvre tout seul sur la journée en cours.

**En ligne :** https://sbolleng.github.io/vacances26_baviere/

## Ce qu'il y a dedans

| Fichier | Rôle |
|---|---|
| `index.html` | La structure : barre du haut, bloc « À faire », récap des logements |
| `style.css` | Les styles, thème clair et thème sombre |
| `app.js` | Construit le bandeau de dates et les cartes, détecte le jour en cours |
| `data/jours.js` | **Le planning.** C'est le seul fichier à toucher pour changer le contenu |

## Modifier le planning

Tout est dans `data/jours.js`, une entrée par journée :

```js
{
  n: 6, date: "2026-08-13", jour: "Jeudi 13", mois: "août", base: "Siegsdorf",
  alerte: "Message rouge en tête de journée.",
  acts: [
    {
      nm: "Wimbachklamm — gorges",
      leg: { from: "Siegsdorf", to: "Wimbachklamm", dur: "~55 min", km: "63 km",
             maps: "Parkplatz Wimbachbrücke, Ramsau" },
      tags: [["p", "4 €"], ["h", "1 h aller-retour"]],
      note: "Précision pratique, en gris sous les étiquettes.",
      guide: "<p>Le texte du guide, en HTML.</p>"
    }
  ],
  retour: { from: "Obersalzberg", to: "Siegsdorf", dur: "~55 min", km: "58 km" },
  stay: { same: true, nm: "Airbnb Siegsdorf" }
}
```

- `date` sert à détecter le jour en cours — c'est elle qui met la carte en vert.
- Dans `tags`, le premier élément donne la couleur : `"h"` pour un horaire,
  `"p"` pour un prix, `"warn"` pour une alerte, `""` pour du neutre.
- `leg` affiche le trajet **depuis le point précédent**, avec un bouton
  « Y aller » qui ouvre l'itinéraire dans Maps. `retour` fait la même chose
  pour le trajet du soir.
- `guide` accepte du HTML (`<p>`, `<strong>`, `<em>`) et s'affiche dans un bloc
  rétractable « Le mot du guide ». C'est le seul champ inséré sans échappement,
  parce qu'il est rédigé à la main dans ce fichier.
- `alerte` met un bandeau rouge en tête de journée.
- `stay: { same: true, nm: "…" }` quand on ne change pas d'hébergement.
- `maps: "adresse"` ajoute un bouton « Ouvrir dans Maps ».

Pas de build, pas de dépendance : on modifie, on commit, GitHub Pages publie.

## Source

Les données viennent du planning `Baviere_1.xlsx`.
