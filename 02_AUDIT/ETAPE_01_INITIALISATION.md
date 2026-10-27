# ADP WEB EXPERIENCE — Compte Rendu Étape 01 : Initialisation & Récupération du Legacy

**Projet :** ADP WEB EXPERIENCE  
**Concept :** The Possibility Machine  
**Direction artistique :** Fusion Atelier vivant + Matière en mouvement  
**Nom de domaine cible :** ateliersdepaul.com  
**Date d'exécution :** 27 octobre 2026  
**Auteur :** Assistant Antigravity  

---

## 1. Chemin du nouveau projet et vérification de l'environnement

- **Chemin absolu du dossier de travail :**  
  `D:\05_ADP_SOFTWARE\00_ADP WEB EXPERIENCE`
- **Statut Git initial :**  
  Le dossier n'est pas initialisé comme dépôt Git (`fatal: not a git repository`).
- **Fichiers préexistants à la racine :**  
  - `ADP_Possibility_Machine_Prototype.html` (taille : 21 872 octets).  
  *Aucun autre fichier ou dossier caché n'était présent.*

---

## 2. État du prototype HTML

- **Fichier :** `ADP_Possibility_Machine_Prototype.html`
- **Statut d'intégrité :** Intact, non modifié, préservé à la racine du projet.
- **Rôle :** Maquette / référence conceptuelle et visuelle du nouveau concept *The Possibility Machine*.

---

## 3. Structure des répertoires créés

Conformément à la consigne stricte de ne créer **que** les répertoires nécessaires :
- Création de `01_LEGACY/`
- Création de `02_AUDIT/`

Aucun autre dossier n'a été créé à ce stade.

---

## 4. État du clonage et rapport d'incident réseau / Git

- **Dépôt cible :** `https://github.com/Paul1696/paul-boubert-portfolio.git`
- **Dossier de destination prévu :** `01_LEGACY/paul-boubert-portfolio/`
- **Résultat :** **Arrêt de l'opération suite à une coupure réseau / Git (Incident Documenté)**.

### Détail des tentatives et cause racine :
1. **Tentative de clone standard (`git clone`) :**
   - Échec après ~4,5 minutes :
     ```text
     error: RPC failed; curl 56 Recv failure: Connection was reset
     error: 5 bytes of body are still expected
     fetch-pack: unexpected disconnect while reading sideband packet
     fatal: early EOF
     fatal: fetch-pack: invalid index-pack output
     ```
2. **Tentative de clone restreint (`git clone --depth 1`) :**
   - Échec après ~14 minutes :
     ```text
     error: RPC failed; curl 56 schannel: server closed abruptly (missing close_notify)
     error: 9412 bytes of body are still expected
     fetch-pack: unexpected disconnect while reading sideband packet
     fatal: early EOF
     fatal: fetch-pack: invalid index-pack output
     ```
3. **Diagnostic technique :**
   - Interrogation de l'API GitHub (`https://api.github.com/repos/Paul1696/paul-boubert-portfolio`) :
     - **Taille totale du dépôt :** **1 112 715 Ko (~1,11 Go)**.
     - Le dépôt distant héberge un volume très important de données (médias haute résolution, rendus ou assets dans l'historique ou dans `assets/`/`portfolio/`).
     - Sous Windows, la couche TLS native de Git (`schannel`) subit une coupure de socket TCP (*server closed abruptly / connection reset*) lors du streaming continu de ce packfile volumineux.
   - En application de la règle de sécurité impérative :  
     > *"En cas d'erreur réseau ou Git, arrêter l'opération et expliquer le problème."*  
     les tentatives ont été interrompues. Le répertoire `01_LEGACY/` est propre et vide. Le dépôt distant n'a subi aucune modification.

---

## 5. Inspection et inventaire technique du dépôt legacy (via API GitHub)

Bien que le téléchargement du packfile complet de 1,1 Go ait été interrompu, l'inspection complète du dépôt distant a été réalisée avec succès via l'API GitHub sans risque de corruption :

### Informations Git du dépôt legacy :
- **Branche par défaut :** `main`
- **Dernier commit SHA :** `31b07753ac643074dcc1d8dcc67b8b6ba76fe882`
- **Auteur du dernier commit :** `Paul1696`
- **Date du dernier commit :** `2026-09-18T18:02:42Z`
- **Message du dernier commit :** `Add ADP Flow privacy page`
- **Documentation :** Absence de `README.md` à la racine. Présence d'un dossier `.claude/` et de pages juridiques/déontologiques.

### Arborescence distante identifiée à la racine :
- **Pages et composants statiques :**
  - `index.html` (31 536 octets)
  - `404.html` (5 750 octets)
  - `scraper.html` (5 913 octets)
- **Feuilles de style & scripts JavaScript :**
  - `adp-home.css` (20 200 octets), `adp-home.js` (96 octets)
  - `adp-shared.css` (18 414 octets), `adp-shared.js` (6 994 octets)
  - `adp-pole.css` (8 504 octets), `adp-project.css` (5 182 octets)
  - `brand-pages.css` (6 063 octets), `legal.css` (1 724 octets)
- **Configuration & SEO :**
  - `CNAME` : pointe vers `ateliersdepaul.com`
  - `vercel.json` : configuration de routage Vercel (`cleanUrls`, redirections de `ateliersdepaul.com` vers `www.ateliersdepaul.com`, règles de redirection d'anciennes URL vers `/portfolio/`, règles de cache pour `/assets/`).
  - `robots.txt`, `sitemap.xml`, `.nojekyll`, `.gitignore`
- **Dossiers métiers & pôles identifiés :**
  - `assets/`, `portfolio/`, `public/`, `ressources/`, `scratch/`, `scripts/`
  - `adp-studio/`, `adp-lab/`, `adp-academy/`, `adp-flow/`, `adp-tools/`, `adp-project/`, `adp/`, `apd-flow/`
  - `a-propos/`, `contact/`, `paul/`, `cadre-deontologique/`, `mentions-legales/`, `politique-confidentialite/`, `rosbri-design/`, `POST/`

### Technologies apparentes :
- **Architecture :** Site statique Vanilla (HTML5 / CSS3 / JavaScript natif).
- **Gestionnaire de dépendances :** Aucun `package.json` détecté à la racine (pas de build Node/Webpack/Vite apparent pour le site racine).
- **Hébergement & Déploiement :** Vercel (`vercel.json`), domaine personnalisé OVH/autre configuré sur Vercel avec sous-domaine `www`.

---

## 6. Arborescence locale actuelle

```text
D:\05_ADP_SOFTWARE\00_ADP WEB EXPERIENCE\
├── ADP_Possibility_Machine_Prototype.html   [Prototype intact]
├── 01_LEGACY\                              [Dossier créé, en attente de validation]
└── 02_AUDIT\                               [Dossier créé]
    └── ETAPE_01_INITIALISATION.md          [Présent compte rendu]
```

---

## 7. Options et recommandations pour la validation de l'utilisateur

Conformément à l'arrêt obligatoire, voici les options proposées pour finaliser la récupération du code legacy avant d'entamer l'audit détaillé :

1. **Option 1 (Recommandée - Clone sans les blobs lourds) :**  
   Utiliser `git clone --filter=blob:none` (ou `--filter=tree:0`). Cela télécharge l'historique et tous les fichiers de code (HTML, CSS, JS, config) instantanément sans bloquer sur les ~1 Go de fichiers binaires/médias.
2. **Option 2 (Archive ZIP) :**  
   Télécharger l'archive ZIP directe de la branche `main` sans l'historique Git volumineux (`https://github.com/Paul1696/paul-boubert-portfolio/archive/refs/heads/main.zip`) et l'extraire dans `01_LEGACY/paul-boubert-portfolio/`.
3. **Option 3 (Poursuivre l'audit directement à partir des fichiers clés) :**  
   Si les médias lourds ne sont pas indispensables à l'audit fonctionnel et architectural, auditer le code HTML/CSS/JS récupéré sélectivement.
