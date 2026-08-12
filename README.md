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
  n: 5, date: "2026-08-12", jour: "Mercredi 12", mois: "août", base: "Siegsdorf",
  route: { from: "München", to: "Burghausen", dur: "1 h 25" },
  acts: [
    { nm: "Burghausen", tags: [["h", "9 h – 18 h"], ["p", "6 €"]], note: "…" }
  ],
  stay: { nm: "Airbnb Siegsdorf", addr: "Weidenstrasse 19", nights: 2 }
}
```

- `date` sert à détecter le jour en cours — c'est elle qui met la carte en vert.
- Dans `tags`, le premier élément donne la couleur : `"h"` pour un horaire,
  `"p"` pour un prix, `"warn"` pour une alerte, `""` pour du neutre.
- `stay: { same: true, nm: "…" }` quand on ne change pas d'hébergement.
- `maps: "adresse"` ajoute un bouton « Ouvrir dans Maps ».

Pas de build, pas de dépendance : on modifie, on commit, GitHub Pages publie.

## Source

Les données viennent du planning `Baviere_1.xlsx`.
