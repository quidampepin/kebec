# Kebec

*Et si on pouvait réécrire l'histoire?* Un jeu de stratégie historique bilingue (FR/EN) au Québec et en Amérique française, de 1608 à 2000.

*What if you could rewrite history?* A bilingual (French/English) historical strategy game set in Québec and French America, from 1608 to 2000.

**Jouer / Play:** https://www.davidpepin.ca/kebec/

## Le jeu

La partie traverse cinq périodes :

| | Période |
|---|---|
| I | 1608–1663 |
| II | 1663–1760 |
| III | 1760–1867 |
| IV | 1867–1960 |
| V | 1960–2000 |

Les décisions arrivent par la carte et la carte montre leurs conséquences. Les choix historiques sont marqués : les suivre tend à reproduire l'histoire, s'en écarter ouvre d'autres avenirs. La partie est sauvegardée automatiquement dans le navigateur.

## Lancer le jeu localement

Double-cliquez sur `index.html`. Aucun serveur ni installation : le jeu tourne dans n'importe quel navigateur récent. Les scripts sont de simples fichiers JavaScript chargés dans l'ordre par `index.html` (pas de modules), pour que le double-clic fonctionne.

## Structure

| Chemin | Contenu |
|---|---|
| `index.html` | La page |
| `css/style.css` | Styles, thèmes clair et sombre |
| `js/i18n.js` | Textes de l'interface FR/EN |
| `js/state.js`, `js/sim.js` | État d'une partie et simulation (saisons, population, économie) |
| `js/p2.js` … `js/p5.js` | Mécaniques propres à chaque période |
| `js/events/` | Événements historiques, imprévus et arcs narratifs, par période |
| `js/map.js`, `js/geo.js`, `js/territory.js` | Carte et territoire |
| `js/media.js` | Illustrations et contextes historiques |
| `js/credits.js` | Crédits et bibliographie |
| `js/calibration.js` | Banc de calibration (`index.html#calibration`) |
| `assets/img/` | Illustrations de Wikimedia Commons (liste dans `index.json`) |

## Crédits

Conception, recherche et direction : David Pepin. Code écrit avec Claude (Anthropic). Les illustrations viennent de Wikimedia Commons ; chaque légende renvoie à sa source. Les crédits complets et la bibliographie sont dans le jeu. Fait partie de [davidpepin.ca/projets](https://www.davidpepin.ca/projets/).

La page publiée charge Google Analytics (pages vues seulement, même propriété que davidpepin.ca). La balise ne s'exécute que sur davidpepin.ca, pas quand on ouvre le fichier localement.
