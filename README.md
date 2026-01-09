# Pokédexia - SAÉ 105

Ce projet est un Pokédex interactif réalisé dans le cadre de la **SAÉ 105** (Conception et développement de sites web). Il permet de consulter les informations détaillées de la première génération de Pokémon au travers d'une interface dynamique et thématique.

Le site est conçu en **HTML, CSS et JavaScript pur**, et s'appuie sur une base de données locale (`data.js`).

## 🚀 Fonctionnalités Principales

### 🔍 Navigation et Recherche

* **Liste complète** : Affichage dynamique de tous les Pokémon de la première génération (de Bulbizarre à MissingNo.) sur la page d'accueil.
* **Barre de recherche en temps réel** : Un champ de saisie permet de filtrer instantanément les Pokémon par leur nom (sans rechargement de page).
* **Menu déroulant interactif** : La barre de navigation inclut un menu "Types de Pokémon" généré dynamiquement, affichant les icônes des types pour une navigation rapide.

### 📄 Fiches Détaillées (Single Page)

Chaque Pokémon possède sa propre page dédiée (`pokemon.html`) générée dynamiquement via des paramètres d'URL (`?id=Name`), affichant :

* **Données complètes** : Nom, image (PNG), description, taille et poids.
* **Noms internationaux** : Affichage des noms en Français, Anglais et Japonais (Katakana/Romaji).
* **Types** : Liste des types du Pokémon avec liens cliquables vers la page de catégorie.
* **Chaîne d'évolution** : Affichage des différentes évolutions du Pokémon sous forme d'images cliquables (GIFs) pour naviguer facilement dans la famille.

### ⚡ Filtrage par Type

* Une page dédiée (`type.html`) permet de lister uniquement les Pokémon appartenant à un type spécifique (ex: Eau, Feu, Spectre).

## 🎨 Fonctionnalités Visuelles et UX

### 🌈 Thème Dynamique (Adaptive Coloring)

L'interface s'adapte automatiquement au type du Pokémon consulté. Grâce à un script JS et des variables CSS, l'ambiance colorée change sur la page de détail :

* **Background** : Dégradé de couleur correspondant au type principal (ex: Rouge/Orange pour Feu, Bleu pour Eau).
* **Interface** : Les titres et cadres s'harmonisent avec la couleur dominante du type.

### ✨ Animations et Style

* **Font Retro** : Utilisation de la police personnalisée "Pokemon Classic" pour un aspect authentique jeu vidéo.
* **Effets de survol (Hover)** :
* Agrandissement (`scale`) et ombres portées sur les cartes Pokémon.
* Apparition fluide du menu déroulant dans la navbar.


* **Images & GIFs** : Utilisation mixte d'images statiques pour les listes et de GIFs animés pour les évolutions.

## 🛠️ Structure du Projet

```
.
├── index.html          # Page d'accueil (Liste + Recherche)
├── pokemon.html        # Page de détail d'un Pokémon
├── type.html           # Page de filtrage par type
├── include/
│   ├── css/
│   │   └── style.css   # Styles globaux et thèmes par type
│   ├── js/
│   │   ├── data.js     # Base de données (JSON array)
│   │   ├── main.js     # Logique page d'accueil (Recherche, Liste)
│   │   ├── pokemon.js  # Logique page détail (Affichage infos, Thèmes)
│   │   └── type.js     # Logique page types (Filtrage)
│   └── fonts/          # Polices d'écriture
└── img/                # Images, Logos, GIFs et icônes de types

```

## 💻 Technologies utilisées

* **HTML5** : Structure sémantique.
* **CSS3** : Flexbox pour la mise en page, CSS Variables pour le theming dynamique, `@font-face`.
* **JavaScript (ES6+)** :
* Manipulation du DOM.
* Gestion des paramètres d'URL (`URLSearchParams`).
* Boucles et conditions pour le tri de données.



## 🔧 Installation

Ce projet est un site statique. Aucune installation de serveur (Node.js, PHP) n'est nécessaire.

1. Cloner le dépôt ou télécharger les fichiers.
2. Ouvrir le fichier `index.html` dans n'importe quel navigateur web moderne (Chrome, Firefox, Edge).

## 📝 Auteurs

Projet réalisé dans le cadre de la SAÉ 105.
Ulysse SOUCARET
Mathis Roberdeau

profs :

*Gotta Catch 'Em All!*