# ADP WEB EXPERIENCE — Rapport 02B-01 : Audit de l'Architecture Technique

**Date :** 27 octobre 2026  
**Auteurs :** Architecte Logiciel, Développeur Frontend, Développeur Backend  
**Projet :** ADP WEB EXPERIENCE  
**Cible analysée :** `01_LEGACY/paul-boubert-portfolio/` (commit `31b07753ac643074dcc1d8dcc67b8b6ba76fe882`)  
**Statut de vérification :** Vérification statique sur l'intégralité des 117 fichiers sources récupérés  

---

## 1. Synthèse exécutive de l'architecture

Le site historique des Ateliers de Paul (`ateliersdepaul.com`) est un **site statique pur multi-pages (MPA - Multi-Page Application)** hébergé sur Vercel, composé de **62 fichiers HTML autonomes**, **12 feuilles de style CSS**, **6 scripts JavaScript front-end**, sans aucun framework d'application (ni React, ni Vue, ni Svelte) ni moteur de template serveur (pas de PHP, ni Python, ni Node.js à l'exécution).

L'analyse démontre que le projet a démarré comme un portfolio personnel mono-page ou multi-pages léger, avant de grandir par ajouts successifs (ajout des pôles, ajout de 38 projets d'architecture, ajout d'un catalogue 3D, ajout de scripts de publication). Pour tenter de maintenir la cohérence de l'en-tête et du pied de page à travers les 62 pages, des **scripts utilitaires Node.js en ligne de commande basés sur des expressions régulières (Regex)** ont été conçus localement pour réécrire en masse les fichiers HTML bruts.

Cette architecture présente une dette technique critique qui bloque toute évolution vers une expérience immersive dynamique (*The Possibility Machine*) et vers une administration centralisée (*ADP Control / ADP Connect*).

---

## 2. Cartographie technique détaillée des fichiers et flux

### 2.1. Arborescence fonctionnelle des sources (117 fichiers vérifiés)

```text
01_LEGACY/paul-boubert-portfolio/
├── Pages racines
│   ├── index.html                   # Accueil (493 lignes, 32 Ko)
│   ├── 404.html                     # Page d'erreur personnalisée
│   └── scraper.html                 # Outil ponctuel de scraping de modèles 3D
│
├── Feuilles de style racines
│   ├── adp-shared.css               # Core CSS : reset, variables, navbar, footer (751 lignes)
│   ├── adp-home.css                 # Styles de la page d'accueil (351 lignes)
│   ├── adp-pole.css                 # Template générique des pôles (383 lignes)
│   ├── adp-project.css              # Styles détaillés des pages projets (414 lignes)
│   ├── brand-pages.css              # Styles injectés des 7 identités (154 lignes)
│   └── legal.css                    # Styles des pages juridiques
│
├── Scripts JavaScript front-end racines
│   ├── adp-shared.js                # Curseur personnalisé, navbar sticky, mobile toggle, observer
│   └── adp-home.js                  # Script spécifique accueil (3 lignes, quasi-vide)
│
├── Pôles d'activité & 7 identités
│   ├── adp/index.html               # Hub de présentation des pôles
│   ├── adp-tools/index.html         # Outils digitaux & calculateurs
│   ├── adp-studio/index.html        # Conception assistée & dessin technique
│   ├── adp-brief/index.html         # Rédaction de programmes & CCTP (sert de template maître)
│   ├── adp-academy/index.html       # Formation & montée en compétences
│   ├── adp-lab/index.html           # Recherche & expérimentation
│   ├── adp-project/index.html       # Accompagnement de projets (généré par build-brand-pages.cjs)
│   ├── rosbri-design/index.html     # Mode & textile wax (généré par build-brand-pages.cjs)
│   ├── adp-flow/ & apd-flow/        # Pages de flux / confidentialité produit
│
├── Catalogue de réalisations (Portfolio)
│   ├── portfolio/index.html         # Grille principale avec 37 projets listés (795 lignes)
│   ├── portfolio/portfolio.css      # Styles des grilles, cartes et filtres
│   ├── portfolio/portfolio.js       # Moteur de filtrage dynamique par attributs data-filter
│   └── portfolio/{slug}/index.html  # 38 dossiers projets contenant chacun leur page index.html
│
├── Ressources & Outils
│   ├── ressources/index.html        # Guides téléchargeables & catalogue SketchUp (2 402 lignes)
│   ├── ressources/ressources.css    # Styles des filtres et grilles ressources
│   └── ressources/sketchup-models.json # Base statique de 802 modèles 3D avec liens Google Drive
│
├── Carte de visite numérique
│   ├── paul/index.html              # Carte interactive de Paul Boubert (générée)
│   ├── paul/card.css & card.js      # Styles et tracker d'événements sans cookie
│   └── paul/README.md               # Documentation de la page vCard
│
├── Gestion éditoriale & Social Media (Embryon ADP Connect)
│   ├── POST/index.html              # Dashboard calendrier éditorial local
│   ├── POST/dashboard.css & .js     # Interface du calendrier
│   ├── POST/posts-data.js           # Données des posts et stockage en localStorage
│   └── POST/*.md                    # 6 fichiers Markdown éditoriaux (LinkedIn, Instagram, etc.)
│
├── Outils de build & synchronisation (Node.js)
│   ├── scripts/build-brand-pages.cjs # Générateur HTML des pôles par regex
│   ├── scripts/sync-identities.cjs   # Synchroniseur des menus et logos dans tous les HTML
│   ├── scripts/build-paul.cjs       # Générateur de la page /paul et de la vCard
│   ├── scripts/check-identities.cjs # Vérificateur d'intégrité
│   ├── scripts/check-brand-pages.cjs
│   ├── scripts/check-paul.cjs
│   └── scripts/preview-paul.cjs     # Serveur local de prévisualisation (port 4173)
│
├── Scripts de maintenance et nettoyage (Python dans scratch/)
│   ├── scratch/find_broken_links.py # Détection des liens d'images cassés
│   ├── scratch/optimize_images.py   # Conversion en WebP
│   ├── scratch/push_folders.py      # Script de contournement de timeout Git
│   └── scratch/*.py                 # Outils de minification et nettoyage
│
└── Configuration & Déploiement
    ├── vercel.json                  # Routage, redirections 301, headers de sécurité et cache
    ├── CNAME                        # Domaine ateliersdepaul.com
    ├── sitemap.xml                  # 69 URL indexées
    ├── robots.txt                   # Directives d'indexation
    └── public/contact/Paul_Boubert.vcf # Fichier vCard 3.0
```

---

## 3. Analyse des composants et styles partagés

### 3.1. Système de Design CSS (`adp-shared.css` et `brand-pages.css`)
- **Variables CSS (`:root`) :** Présence d'un jeu de tokens sémantiques de base :
  - Palette primaire : `--adp-blue: #1E73D8`, `--adp-blue-dark: #0B2F5B`, `--adp-blue-light: #3B8EE8`.
  - Neutres : `--adp-black: #111827`, `--adp-gray-text: #4B5563`, `--adp-gray-light: #F3F6FA`.
  - Typographie : `--adp-font-heading: 'Outfit'`, `--adp-font-body: 'Inter'`.
  - Rayons de courbure : `--adp-radius: 6px`, `--adp-radius-lg: 12px`, `--adp-radius-xl: 20px`.
  - Transitions : courbes de Bézier standards (`cubic-bezier(0.4, 0, 0.2, 1)`).
- **Thématisation des 7 identités (`brand-pages.css`) :**
  Les 7 pôles disposent de variables surchargées par classe parente sur le `<body>` :
  - `brand-brief` : Vert (`#08763c`)
  - `brand-project` : Rouge (`#cf1230`)
  - `brand-studio` : Brun/Ocre (`#926719`)
  - `brand-tools` : Ardoise (`#42494d`)
  - `brand-academy` : Violet (`#8539c6`)
  - `brand-lab` : Orange (`#bd4d00`)
  - `brand-rosbri` : Ambre/Wax (`#855409`)
- **Limites architecturales du CSS :**
  - **Absence de modularité :** Pas de préprocesseur ni de CSS Modules. Risques fréquents de collisions de styles (ex. surcharge globale via `brand-pages.css` réécrivant `.adp-logo-img` ou `.adp-dropdown-item`).
  - **Duplication de règles :** Les boutons et grilles sont redéfinis à la fois dans `adp-shared.css`, `portfolio.css`, `adp-pole.css` et `contact.css`.

---

## 4. Analyse des scripts JavaScript et interactions

1. **`adp-shared.js` (165 lignes) :**
   - **Curseur personnalisé :** Anime `.adp-cursor` et `.adp-cursor-follower` via `requestAnimationFrame` et un lerp (facteur 0.12). Ce script est couplé à la règle CSS `* { cursor: none }` pour les pointeurs fins.
   - **Sticky Navbar :** Bascule la classe `.scrolled` sur dépassement du scroll > 40px (écouteur passif conforme).
   - **Menu Mobile :** Gestion classique de la classe `.open` sur clic burger.
   - **Intersection Observer :** Gère le fondu d'apparition `.fade-in-up` avec un seuil de 0.1 et une marge négative de -40px.
   - **BFCache :** Écouteur `pageshow` pour réactiver les éléments visibles lors de la navigation arrière dans l'historique du navigateur.
2. **`portfolio/portfolio.js` (56 lignes) :**
   - Filtre les cartes de projets en inspectant `data-type` et `data-filter`. Gère une apparition en cascade via `setTimeout(..., i * 40)`. Logique purement DOM, simple mais non réactive.
3. **`paul/card.js` (21 lignes) :**
   - Système de télémétrie locale sans cookie émettant l'événement `adp:card-event` sur `window` (respecte `navigator.doNotTrack` et `navigator.globalPrivacyControl`).
4. **`POST/dashboard.js` & `POST/posts-data.js` :**
   - Logique applicative isolée stockant les statuts de posts dans le `localStorage` du navigateur de l'administrateur.

---

## 5. Scripts de build artisanaux et dette technique majeure

L'un des constats les plus marquants de l'audit réside dans le fichier [scripts/sync-identities.cjs](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/01_LEGACY/paul-boubert-portfolio/scripts/sync-identities.cjs) et [scripts/build-brand-pages.cjs](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/01_LEGACY/paul-boubert-portfolio/scripts/build-brand-pages.cjs) :

```javascript
// Extrait de scripts/sync-identities.cjs :
function walk(dir) {
  // Parcours récursif de tous les fichiers .html du projet
  // ...
  s = s.replace(re, `$1<img class="identity-menu-logo" src="/assets/identities/${id}.webp" ...`);
  s = s.replace(/(<ul class="adp-footer-links">)([\s\S]*?)(<\/ul>)/g, ...);
  if (s !== old) fs.writeFileSync(f, s);
}
```

### Problèmes critiques identifiés :
1. **Fragilité extrême :** Une simple modification d'espacement ou d'attribut dans un fichier HTML empêche l'expression régulière de matcher, créant des désynchronisations silencieuses entre pages.
2. **Duplication massive :** Chaque mise à jour du menu de navigation a nécessité la réécriture physique de 62 fichiers HTML distincts.
3. **Absence d'abstraction de composants :** Tout composant (header, footer, carte projet, carte pôle) est dupliqué en dur dans le balisage de chaque page.
4. **Maintenance prohibitive :** L'ajout d'une 8e identité ou la modification de la navigation exige d'exécuter un script custom en local, sous peine d'avoir un site incohérent.

---

## 6. Dépendances externes et intégrations

Le site historique repose sur quatre dépendances tierces :
1. **Google Fonts (CDN externe) :**
   - Polices `Outfit` et `Inter` chargées depuis `fonts.googleapis.com` et `fonts.gstatic.com`.
   - *Impact :* Dépendance réseau externe, appel DNS supplémentaire, non-conformité stricte aux recommandations RGPD sans proxy local de polices.
2. **Font Awesome 6.4.0 (CDN cdnjs) :**
   - Feuille de style complète préchargée (`all.min.css`) avec fallback `<noscript>`.
   - *Impact :* Chargement d'une bibliothèque d'icônes entière (~150 Ko) pour n'utiliser qu'une dizaine de glyphes.
3. **Google Analytics 4 :**
   - Tag `G-89V1WZL52D` chargé de manière asynchrone sur toutes les pages principales.
   - *Impact :* Télémétrie en production, actif.
4. **Web3Forms API (`api.web3forms.com/submit`) :**
   - Formulaire de newsletter d'accueil et formulaire de contact complet (`contact/index.html`).
   - Clé publique : `d4c50b39-bbfc-42c4-a02f-8cfe7f03b507`.
   - *Impact :* Dépendance totale à un tiers pour la réception des demandes clients.

---

## 7. Grille d'évaluation de la dette technique

| Domaine | Niveau de dette | Criticité | Justification vérifiée |
|---|---|---|---|
| **Architecture de templating** | Très élevé | **BLOQUANT** | 62 pages statiques réécrites par Regex Node.js (`sync-identities.cjs`). Incompatible avec un CMS. |
| **Gestion des données** | Totalement absent | **BLOQUANT** | Aucun modèle de données, aucun schéma structuré pour les 38 projets et 7 univers. |
| **Front-end / Interactivité** | Modéré | **MOYEN** | Vanilla JS fonctionnel mais limité à des micro-animations DOM. Impossible d'orchestrer la "Possibility Machine". |
| **Styles & Design System** | Élevé | **ÉLEVÉ** | Variables éparpillées, collisions de styles, absence de dark mode natif, curseur invasif. |
| **Build & Tooling** | Élevé | **ÉLEVÉ** | Scripts Node custom non standardisés, aucun bundler (Vite, Rollup, Webpack), pas de minification automatisée. |

---

## 8. Limites de vérification

- L'audit a été mené sur le code source sans exécution de serveur local ni émulation de navigateur.
- Les scripts Python dans `scratch/` indiquent des manipulations passées sur un environnement Windows distinct (`c:\Users\JEREMY\APPS\Portfolio Paul Boubert`), confirmant que le code n'était pas standardisé sur une chaîne d'intégration continue (CI/CD).
