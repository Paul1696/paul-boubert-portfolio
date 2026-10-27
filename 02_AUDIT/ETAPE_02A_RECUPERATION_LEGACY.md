# ADP WEB EXPERIENCE — Compte Rendu Étape 02A : Récupération Optimisée du Legacy

**Projet :** ADP WEB EXPERIENCE  
**Concept :** The Possibility Machine  
**Direction artistique :** Fusion Atelier vivant + Matière en mouvement  
**Répertoire cible :** `01_LEGACY/paul-boubert-portfolio/`  
**Date d'exécution :** 27 octobre 2026  
**Auteur :** Assistant Antigravity  

---

## 1. Résultat du clonage

- **Statut :** **Succès complet**.
- **Temps d'exécution :** Moins de 10 secondes (contre les coupures réseau de 14 minutes subies lors des tentatives complètes).
- **Intégrité :** 100 % des fichiers de code source, pages HTML, styles CSS, scripts JS/CJS/Python, fichiers Markdown, schémas JSON et configurations de déploiement ont été récupérés sans altération.
- **Règles de sécurité :** Aucun fichier existant n'a été écrasé, aucun paquet n'a été installé, aucun serveur n'a été lancé, et le prototype HTML racine est resté intact.

---

## 2. Méthode utilisée

Afin de contourner l'échec de téléchargement des **1,11 Go** de médias binaires (photos haute résolution, rendus WebP/PNG/JPG/PDF) via la couche TLS Windows `schannel`, la stratégie en 3 phases suivante a été appliquée :

1. **Clonage partiel superficiel sans checkout (`blobless shallow clone`) :**
   ```powershell
   git clone --depth 1 --filter=blob:none --no-checkout --single-branch --branch main https://github.com/Paul1696/paul-boubert-portfolio.git "01_LEGACY/paul-boubert-portfolio"
   ```
   *Rôle :* Récupère la structure arborescente du commit HEAD de la branche `main` sans télécharger aucun objet binaire lourd.

2. **Configuration du sparse-checkout non-conique (`--no-cone`) :**
   ```powershell
   git sparse-checkout init --no-cone
   ```
   Règles définies dans `.git/info/sparse-checkout` pour sélectionner exhaustivement les fichiers de code et exclure les médias lourds :
   - **Inclusions :** `*.html`, `*.css`, `*.js`, `*.cjs`, `*.json`, `*.md`, `*.py`, `*.xml`, `*.txt`, `*.svg`, `*.vcf`, `CNAME`, `.gitignore`, `.nojekyll`, `.claude/**`.
   - **Exclusions explicites :** `!*.jpg`, `!*.jpeg`, `!*.png`, `!*.webp`, `!*.pdf`.

3. **Checkout ciblé de la branche principale :**
   ```powershell
   git checkout main
   ```
   Git a téléchargé uniquement les blobs nécessaires aux fichiers sélectionnés, en ignorant les 734 fichiers binaires lourds.

---

## 3. Fichiers récupérés et inventaire

- **Nombre total de fichiers récupérés :** **117 fichiers**
- **Nombre de fichiers de code manquants :** **0** (Vérification par script différentiel entre l'arbre Git `HEAD` et le système de fichiers local).

### Répartition par extension :
| Type | Extension | Nombre | Description |
|---|---|---|---|
| **Pages Web** | `.html` | **62** | Page d'accueil, 404, scraper, 38 projets portfolio, pôles ADP, formulaires, mentions, etc. |
| **Styles** | `.css` | **12** | `adp-home.css`, `adp-shared.css`, `adp-pole.css`, `adp-project.css`, `brand-pages.css`, `legal.css`, `portfolio.css`, `contact.css`, `card.css`, `ressources.css`, `dashboard.css`, `a-propos.css` |
| **Scripts Navigateur** | `.js` | **6** | `adp-home.js`, `adp-shared.js`, `portfolio.js`, `card.js`, `dashboard.js`, `posts-data.js` |
| **Scripts Node.js** | `.cjs` | **7** | Scripts de build & preview dans `scripts/` (`build-paul.cjs`, `build-brand-pages.cjs`, `check-identities.cjs`, etc.) |
| **Scripts Utilitaires** | `.py` | **9** | Outils Python de maintenance/nettoyage dans `scratch/` (`cleanup_index.py`, `optimize_images.py`, etc.) |
| **Documentation & Contenu** | `.md` | **8** | Stratégie éditoriale et réseaux sociaux dans `POST/` (6 plateformes), documentation technique dans `paul/` |
| **Vecteurs légers** | `.svg` | **4** | `favicon.svg`, `qr-paul.svg`, `sprite.svg`, `a-embossed.svg` |
| **Données & Config** | `.json` | **3** | `vercel.json` (déploiement), `sketchup-models.json` (ressources 3D), `launch.json` |
| **Configuration & Déploiement** | Divers | **6** | `CNAME` (ateliersdepaul.com), `robots.txt`, `sitemap.xml`, `.gitignore`, `.nojekyll`, `Paul_Boubert.vcf` |

### Dossiers fonctionnels récupérés :
- `portfolio/` : 38 sous-dossiers de projets d'architecture & design avec leurs pages HTML dédiées.
- Pôles de marque ADP : `adp-studio/`, `adp-lab/`, `adp-academy/`, `adp-flow/`, `adp-tools/`, `adp-project/`, `rosbri-design/`.
- Pages corporate & contact : `a-propos/`, `contact/`, `contact/merci/`, `paul/`, `ressources/`.
- Pages légales : `cadre-deontologique/`, `mentions-legales/`, `politique-confidentialite/`.
- Gestion des contenus : `POST/` (calendrier et contenu multi-réseaux), `scratch/`, `scripts/`.

---

## 4. Taille téléchargée et gains de bande passante

| Composant | Taille | Commentaire |
|---|---|---|
| **Espace de travail (`Working tree`)** | **1,31 Mo** (1 371 347 octets) | L'intégralité du code source du site |
| **Dossier Git (`.git/`)** | **0,35 Mo** (368 471 octets) | Arbre Git optimisé pour commit unique |
| **Taille totale locale** | **1,65 Mo** | Sur disque |
| **Taille du dépôt distant complet** | **1 112,7 Mo (~1,11 Go)** | Dépôt avec images et historiques lourds |
| **Économie de transfert** | **> 99,85 %** | Élimination totale des risques de timeout |

---

## 5. Vérification Git

- **Branche active :** `main` (synchronisée avec `origin/main`)
- **Dernier commit SHA :** `31b07753ac643074dcc1d8dcc67b8b6ba76fe882`
- **Auteur :** `Paul1696 <abz9940@gmail.com>`
- **Date du commit :** `Fri Sep 18 20:02:42 2026 +0200`
- **Message du commit :** `Add ADP Flow privacy page`
- **État de l'arbre de travail :**
  ```text
  On branch main
  Your branch is up to date with 'origin/main'.
  You are in a sparse checkout with 14% of tracked files present.
  nothing to commit, working tree clean
  ```

---

## 6. Éléments non récupérés

Les éléments suivants ont été volontairement exclus pour préserver la stabilité du transfert et l'espace de stockage :
- **734 fichiers de médias binaires lourds :**
  - 325 images `.webp` (visuels de projets et bannières)
  - 218 images `.jpg`
  - 162 images `.png`
  - 27 images `.jpeg`
  - 2 documents `.pdf`
  - 1 photo de profil racine (`profile_paul.jpg`)
- **Historique Git antérieur au commit HEAD :**
  - Seul le snapshot de la dernière version en production a été récupéré (suffisant pour l'audit et la refonte).

---

## 7. Risques et limites

1. **Rendu visuel local incomplet :**  
   L'ouverture directe des fichiers HTML legacy dans un navigateur affichera des balises `<img>` sans source locale (images manquantes).  
   *Atténuation :* Les images sont toujours accessibles sur le site de production en ligne (`https://ateliersdepaul.com/assets/...`) ou peuvent être récupérées ponctuellement si un asset graphique spécifique doit être conservé.
2. **Absence d'impact sur l'audit technique :**  
   L'audit du code (qualité HTML5, sémantique, structure CSS, performance JS, routage Vercel, arborescence, architecture de contenu) n'est absolument pas bridé par l'absence des images lourdes.

---

## 8. Proposition pour l'Étape 02B : Démarrage de l'Audit Technique

Le terrain est parfaitement préparé pour l'audit complet du site existant :

1. **Axe 1 — Audit Architectural & Contenu :**
   - Cartographie des 62 pages, organisation des pôles de compétences et hiérarchie de l'information.
   - Analyse du catalogue de projets (38 études de cas dans `portfolio/`).
2. **Axe 2 — Audit CSS & Design System :**
   - Inventaire des variables CSS, de la palette de couleurs, des polices et des composants réutilisables.
   - Analyse du responsive design et des contraintes d'affichage.
3. **Axe 3 — Audit JavaScript & Expérience Utilisateur :**
   - Analyse des interactions (scripts d'accueil, filtres de portfolio, tracking minimaliste de la vCard).
4. **Axe 4 — Audit SEO, Performances & Déploiement :**
   - Analyse de `vercel.json` (redirections, en-têtes HTTP, cache).
   - Analyse du balisage sémantique, des balises Open Graph, du sitemap XML et de `robots.txt`.
5. **Axe 5 — Analyse de Gap avec le prototype "The Possibility Machine" :**
   - Confrontation entre l'architecture legacy et la maquette [ADP_Possibility_Machine_Prototype.html](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/ADP_Possibility_Machine_Prototype.html).
   - Définition de la feuille de route de refonte.
