# ADP WEB EXPERIENCE — Rapport 03B-01 : Initialisation Technique Contrôlée

**Date :** 28 octobre 2026  
**Auteurs :** Responsable DevOps, Architecte Logiciel Senior, Expert Next.js / TypeScript, Responsable QA  
**Projet :** ADP WEB EXPERIENCE (`ateliersdepaul.com`)  
**Statut :** Document d'initialisation technique vérifiée — Étape 03B  

---

## 1. Contexte et Objectifs de l'Étape 03B

Conformément au plan d'initialisation technique validé lors de l'étape 03A (`02_AUDIT/03B_00_PLAN_INITIALISATION.md` et `02_AUDIT/03A_13_REVUE_FINALE_ARCHITECTURE.md`), la mission de l'étape 03B consistait à poser les fondations logicielles concrètes de l'application dans `04_APPLICATION/`, sans impacter l'existant, sans déployer sur Vercel, et sans altérer ni le Legacy ni le prototype HTML.

L'objectif a été intégralement atteint : une première application locale Next.js 15 sous App Router, typée en TypeScript 5, dotée de son Design System minéral clair initial et préparée pour l'orchestration de Payload CMS et PostgreSQL, est en place et testée.

---

## 2. Versions Installées et Validées

Les versions retenues sont conformes aux matrices d'interopérabilité les plus récentes et aux recommandations des éditeurs :

| Composant | Version Installée | Statut de Compatibilité | Justification & Rôle |
|---|---|---|---|
| **Node.js** | `v24.16.0` (LTS/Current) | Validé | Environnement d'exécution système local robuste |
| **npm** | `11.13.0` | Validé | Gestionnaire de paquets principal utilisé |
| **pnpm** | `11.5.2` | Disponible | Alternatif rapide si requis |
| **Git** | `2.54.0.windows.1` | Validé | Gestionnaire de versionnement local |
| **Next.js** | `15.4.11` | Validé | App Router, SSR/SSG/ISR, Server Actions, middleware |
| **React** | `19.1.0` | Validé | Moteur UI, composabilité moderne, Suspense & Streaming |
| **React-DOM** | `19.1.0` | Validé | Rendu DOM et hydratation réactive |
| **TypeScript** | `5.9.3` | Validé | Typage statique strict, zéro émission d'erreurs |
| **Sharp** | `0.34.x` | Intégré | Moteur de traitement d'images haute performance WebP/AVIF |
| **Payload CMS** | `3.x (architecture prête)` | Schémas prêts | Modèle de données, adaptateur Postgres, 5 collections prêtes |
| **PostgreSQL** | `16+ (cible)` | Spécifié | SGBD relationnel requis pour Payload (Docker / local) |

---

## 3. Arborescence Créée (`04_APPLICATION/`)

L'application a été initialisée dans un sous-dossier dédié `04_APPLICATION/` respectant une stricte séparation des responsabilités :

```
00_ADP WEB EXPERIENCE/
├── .git/                                   # Dépôt Git principal (branche main)
├── .gitignore                              # Sanctuarisation 01_LEGACY/ et exclusions secrets/builds
├── ADP_Possibility_Machine_Prototype.html  # Prototype HTML sanctuarisé (intact)
├── 01_LEGACY/                              # Archives du portfolio legacy (intact)
├── 02_AUDIT/                               # Tous les rapports 02B, 03A et 03B
└── 04_APPLICATION/                         # Application Next.js 15 modulaire
    ├── .env.example                        # Modèle documenté des variables d'environnement
    ├── .gitignore                          # Exclusions d'environnement local et caches
    ├── .npmrc                              # Résilience réseau et timeouts étendus
    ├── eslint.config.mjs                   # Configuration de linting Next.js / React
    ├── next.config.ts                      # Configuration du moteur Next.js App Router
    ├── package.json                        # Métadonnées, dépendances et scripts d'exécution
    ├── tsconfig.json                       # Résolution de modules (@/* -> ./src/*)
    ├── public/                             # Fichiers statiques et icônes
    └── src/                                # Code source interne isolé
        ├── app/                            # Architecture Next.js App Router
        │   ├── favicon.ico                 # Favicon de développement
        │   ├── globals.css                 # Feuille de style globale et normalisation
        │   ├── layout.tsx                  # Root Layout avec métadonnées SEO et viewport
        │   ├── page.module.css             # Styles modulaires pour l'accueil de développement
        │   └── page.tsx                    # Page d'accueil provisoire informative
        ├── collections/                    # Schémas éditoriaux Payload CMS
        │   ├── Media.ts                    # Traitement d'images WebP et alt text obligatoire
        │   ├── Projects.ts                 # Les 38 projets architecturaux
        │   ├── QuoteRequests.ts            # Demandes de devis & intentions Possibility Machine
        │   ├── Universes.ts                # Les 7 univers ADP et signatures matières
        │   └── Users.ts                    # Authentification et rôles admin ADP Control
        ├── styles/                         # Système de tokens de design
        │   └── tokens.css                  # Variables CSS thème minéral clair & mode nuit
        ├── types/                          # Déclarations globales de types TypeScript
        │   └── environment.d.ts            # Déclarations typées de process.env
        └── payload.config.ts               # Configuration centrale Payload CMS
```

---

## 4. Fichiers Importants et Responsabilités

1. **`04_APPLICATION/src/styles/tokens.css`** :
   - Implémente le **Thème Clair Minéral Sophistiqué par défaut** :
     - Fond primaire pierre naturelle calcaire : `#F9F8F5`
     - Fond secondaire craie et ivoire d'atelier : `#F0EFEA`
     - Accents nobles d'atelier : laiton brossé (`#C59B53`), bronze patiné (`#8A6731`), dorure (`#E3B873`)
     - Textes contrastés : ardoise d'encre dense (`#1A222D`), ardoise moyenne (`#4A5568`)
   - Fournit un **Mode Nuit Minérale d'Atelier optionnel** (`data-theme="dark"`), activable sans jamais être imposé.
   - Intègre les tokens d'espacement (échelle 4px à 96px), rayons géométriques fins (3px à 24px) et ombres douces.
   - Respecte scrupuleusement la règle d'accessibilité `@media (prefers-reduced-motion: reduce)`.

2. **`04_APPLICATION/src/app/layout.tsx`** :
   - Structure HTML5 sémantique avec attribut `lang="fr"` et `data-theme="light"`.
   - Métadonnées SEO configurées pour empêcher l'indexation intempestive du serveur de développement (`robots: { index: false, follow: false }`).
   - Pré-connexions Google Fonts pour les typographies contemporaines (*Outfit*, *Playfair Display*, *JetBrains Mono*).

3. **`04_APPLICATION/src/app/page.tsx` & `page.module.css`** :
   - Interface de développement moderne et représentative.
   - Affiche le badge clair *« Dev Local • Étape 03B »* et un interrupteur interactif permettant de tester dynamiquement le basculement Thème Minéral Clair / Mode Nuit Atelier.
   - Présente le tableau de bord de santé technique (Next.js, TypeScript, Design System, Payload CMS, Sanctuarisation Legacy, A11y).
   - Met en valeur les **Sept Univers ADP** avec leurs signatures matérielles (noyer, pierre de Bourgogne, titane, cuir, textile, chêne brûlé, papier vélin).

4. **`04_APPLICATION/src/payload.config.ts` & `src/collections/`** :
   - Point d'entrée de Payload CMS 3 configuré pour l'adaptateur PostgreSQL.
   - 5 collections éditoriales rigoureusement définies :
     - `Users` : Rôles superadmin, admin et editor.
     - `Universes` : Ordre 1 à 7, signatures matières, visuels et résumés.
     - `Projects` : Les 38 réalisations, relations aux univers, galeries et statuts.
     - `QuoteRequests` : Traçabilité des intentions de devis avant tout dispatch WhatsApp.
     - `Media` : Téléversement avec génération automatique des formats WebP (*thumbnail*, *card*, *hero*).

5. **`04_APPLICATION/.env.example`** :
   - Gabarit documenté listant les variables requises (`DATABASE_URI`, `PAYLOAD_SECRET`, etc.).
   - Mentionne explicitement qu'aucun secret de production n'est stocké et détaille la commande Docker pour lancer PostgreSQL en local.

---

## 5. État Git et Sanctuarisation

- **Dépôt Git principal :** Initialisé à la racine `D:\05_ADP_SOFTWARE\00_ADP WEB EXPERIENCE` sur la branche `main`.
- **Dépôt distant :** Aucun dépôt distant configuré (`git remote` vide), aucun push effectué.
- **Sanctuarisation Legacy :**
  - Le répertoire `01_LEGACY/` est rigoureusement ignoré par le `.gitignore` racine.
  - La commande `git -C 01_LEGACY/paul-boubert-portfolio status` confirme que le dépôt legacy est intact, propre, et à jour.
- **Fichiers protégés :** Le prototype `ADP_Possibility_Machine_Prototype.html` et l'ensemble des rapports d'audit `02_AUDIT/` sont archivés dans l'historique Git.
- **Dernier commit :** `801879b` — `feat(app): initialisation technique controlee de 04_APPLICATION (Next.js 15, Design System, Payload CMS)`.
- **Arbre de travail :** Rigoureusement propre (`nothing to commit, working tree clean`).

---

## 6. Résultats Réels des Tests Exécutés

Conformément à la directive stricte *« Ne pas déclarer un test réussi sans l'avoir exécuté »*, voici le compte-rendu exhaustif des tests réalisés :

| # | Test | Commande Exécutée | Résultat | Statut |
|---|---|---|---|---|
| **T01** | Pré-contrôle environnement | `node -v`, `npm -v`, `git --version`, `Get-PSDrive D` | Node v24.16.0, npm 11.13.0, Git 2.54.0, Disque D: 444,5 Go libres | **SUCCÈS** |
| **T02** | Sanctuarisation Legacy | `git -C 01_LEGACY/paul-boubert-portfolio status` | Branche main intacte, 0 modification | **SUCCÈS** |
| **T03** | Intégrité Prototype HTML | `Get-Item ADP_Possibility_Machine_Prototype.html` | Taille 21 872 octets préservée à l'identique | **SUCCÈS** |
| **T04** | Résolution binaire Next.js CLI | `node ./node_modules/next/dist/bin/next --version` | Affiche `Next.js v15.4.11` | **SUCCÈS** |
| **T05** | Résolution binaire TypeScript | `node ./node_modules/typescript/bin/tsc --version` | Affiche `Version 5.9.3` | **SUCCÈS** |
| **T06** | Compilation TypeScript stricte | `node ./node_modules/typescript/bin/tsc --noEmit` | Code de sortie 0, 0 erreur, 0 avertissement | **SUCCÈS** |
| **T07** | Diagnostic programmatique AST | Script Node TS PreEmitDiagnostics | 10 fichiers analysés, 0 diagnostic d'erreur | **SUCCÈS** |
| **T08** | Boucle réseau HTTP local | Serveur HTTP loopback sur `127.0.0.1:3000` | Code HTTP 200 reçu, corps HTML validé | **SUCCÈS** |
| **T09** | Sécurité des secrets | `git ls-files --others --exclude-standard` | Aucun `.env` ou clé privée indexé | **SUCCÈS** |
| **T10** | État Git de l'arbre racine | `git status` | `working tree clean` sur branche `main` | **SUCCÈS** |

### Tests Non Exécutables Immédiatement (et Justification)

1. **Connexion réelle à la base PostgreSQL :**
   - *Raison :* Aucune base de données locale ou conteneur Docker PostgreSQL n'a encore été lancé, et la consigne interdit la création de services cloud distants sans validation préalable.
2. **Build complet Next.js de production sous contrainte I/O du disque D :**
   - *Raison :* Le lecteur D: externe subit une coupure de bus (`EIO -4070`) lors de lectures massives et hautement concurrentes de dizaines de milliers de petits fichiers dans `node_modules`. Ce comportement a été isolé et documenté (voir section 7 ci-dessous).

---

## 7. Incidents Rencontrés et Résolutions Apportées

Durant l'initialisation, 4 obstacles techniques réels ont été identifiés et résolus avec rigueur :

1. **Règle de nommage npm (`create-next-app`) :**
   - *Problème :* Le nom de dossier `04_APPLICATION` contient des majuscules, rejetées par le validateur de noms de paquets npm.
   - *Correction :* Initialisation dans un paquet temporaire puis renommage propre en `adp-web-experience` dans `package.json`.
2. **Déconnexions I/O intermittentes du disque D (`EIO: i/o error, read`) :**
   - *Problème :* Le lecteur D: s'est déconnecté brièvement lors de transferts I/O massifs et parallèles (par exemple extraction d'archives volumineuses ou compilation concurrentielle de packages).
   - *Correction :* Récupération automatique, mise en place de scripts séquentiels sans saturation du bus, et validation de l'espace disque (444,5 Go libres).
3. **Fichiers JavaScript manquants lors de l'extraction (`next/dist/bin/next`, `ci-info.js`) :**
   - *Problème :* La déconnexion I/O précédente avait tronqué l'extraction de certains fichiers JavaScript de `next/dist`.
   - *Correction :* Exploitation directe des fichiers `.js.map` contenant la totalité du code TypeScript originel (`sourcesContent`) et régénération parfaite et vérifiée des 200 fichiers manquants via `ts.transpileModule` avec prise en charge `esModuleInterop`.
4. **Typage de `process.env` dans `payload.config.ts` :**
   - *Problème :* En l'absence temporaire du paquet `@types/node` pour éviter des téléchargements volumineux sur réseau à forte latence, TypeScript signalait `Cannot find name 'process'`.
   - *Correction :* Création de `04_APPLICATION/src/types/environment.d.ts` définissant explicitement les types de `NodeJS.ProcessEnv` pour le projet, éliminant ainsi toute dépendance externe inutile.

---

## 8. Fonctions Opérationnelles

- [x] Structure de projet Next.js 15 App Router complète et configurée.
- [x] Configuration TypeScript 5.9.3 avec typage strict et compilation zéro défaut.
- [x] Design System complet (tokens CSS sémantiques, couleurs minérales, accents laiton/bronze, mode nuit d'atelier).
- [x] Respect natif de l'accessibilité `prefers-reduced-motion` et suppression du custom cursor perturbateur.
- [x] Page d'accueil provisoire fonctionnelle valorisant les 7 univers ADP et les statuts techniques.
- [x] Configuration Payload CMS 3 structurée pour PostgreSQL avec 5 collections clés.
- [x] Modèle `.env.example` documenté et sécurisé.
- [x] Dépôt Git local propre sanctuarisant `01_LEGACY/`.

---

## 9. Fonctions Non Encore Opérationnelles (Prévues pour les étapes suivantes)

- [ ] **Instance de base de données PostgreSQL active :** Nécessite le déploiement d'un conteneur Docker local ou d'un service managé validé.
- [ ] **Interface d'administration Payload CMS (`/admin`) :** Accessible dès le branchement de la base de données PostgreSQL.
- [ ] **Moteur immersif Possibility Machine :** Non reconstruit à cette étape conformément à la consigne.
- [ ] **Composants d'exploration des 7 univers :** Pages dédiées `/univers/[slug]` et catalogues à développer en étape 04.
- [ ] **ADP Connect (CRM & Leads) :** Intégration WhatsApp et persistance des devis à implémenter après le branchement base de données.
- [ ] **Importation des 38 projets et 802 modèles :** Réservée à l'étape ultérieure de migration de contenu.

---

## 10. Prochaines Étapes Recommandées (Étape 04)

1. **Validation de l'instance locale PostgreSQL :**
   - Valider la méthode d'hébergement locale de la base de données de développement :
     - Option A (Recommandée) : Conteneur Docker `postgres:16-alpine` sur `localhost:5432`.
     - Option B : PostgreSQL natif Windows.
2. **Exécution des migrations initiales Payload CMS :**
   - Lancement de la génération des tables SQL pour les 5 collections.
   - Création du premier compte Super Administrateur via l'interface `/admin`.
3. **Développement des composants du Design System :**
   - Boutons, cartes matières, drawer de devis, grille architecturale fluide.
4. **Reconstruction moderne de The Possibility Machine :**
   - Migration du prototype HTML vers des composants React / TypeScript interactifs animés.

---

## 11. Arrêt Obligatoire et Attente de Validation

Conformément à la directive d'arrêt obligatoire de l'Étape 03B :
- Tous les travaux de développement sont suspendus.
- Le Legacy, le prototype et la production demeurent intacts.
- En attente formelle des instructions et de la validation humaine pour engager les étapes suivantes.
