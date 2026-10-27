# ADP WEB EXPERIENCE — Rapport 02B-04 : Audit CMS, ADP Control & ADP Connect

**Date :** 27 octobre 2026  
**Auteurs :** Expert CMS, Développeur Backend, Spécialiste Marketing & Conversion  
**Projet :** ADP WEB EXPERIENCE  
**Cible :** `01_LEGACY/paul-boubert-portfolio/`  
**Objet :** Évaluation de la réalité technique de la gestion des données, de l'administration et des flux de communication  

---

## 1. Constat sans appel : Diagnostic des 9 piliers

À l'issue de l'inspection exhaustive des fichiers sources, le comité d'experts confirme que **le site historique ne dispose d'aucun système de gestion de contenu (CMS), d'aucun back-office d'administration, d'aucune base de données et d'aucune intégration API réelle**.

Le site repose exclusivement sur des fichiers HTML statiques modifiés manuellement ou via des scripts locaux Node.js, et délègue ses formulaires à un tiers gratuit (Web3Forms).

---

### Tableau d'évaluation de la maturité technique

| Pilier audité | Statut réel vérifié | Fichiers analysés | Réalité constatée sur le terrain |
|---|---|---|---|
| **1. Base de données** | **ABSENTE (0%)** | Tous les fichiers | Aucune base relationnelle (PostgreSQL, MySQL, SQLite) ni NoSQL (MongoDB, Firebase). Données codées en dur dans le HTML ou dans un fichier JSON statique (`sketchup-models.json`). |
| **2. Interface d'administration (ADP Control)** | **ABSENTE (0%)** | Aucun dossier admin / auth | Aucun système d'authentification, aucune session, aucun droit d'accès. Le dossier `POST/` est une simple page HTML locale sans contrôle d'accès. |
| **3. Gestion des contenus (CMS)** | **ABSENTE (0%)** | `scripts/build-brand-pages.cjs`, `scripts/sync-identities.cjs` | La modification d'un texte ou d'un projet exige l'édition manuelle de fichiers `.html` ou l'exécution de scripts de remplacement par expressions régulières (Regex). |
| **4. Médiathèque centralisée** | **ABSENTE (0%)** | `assets/` | Fichiers déposés en vrac sans indexation, sans métadonnées, sans gestionnaire d'upload, sans recadrage automatique. 287 images orphelines identifiées. |
| **5. Système de publication** | **ABSENT (0%)** | Aucun | Aucun cycle de vie des contenus (Brouillon -> En relecture -> Planifié -> Publié -> Archivé). Toute modification locale poussée sur Git va directement en production. |
| **6. Gestion des prospects (CRM)** | **INEXISTANTE (0%)** | `contact/index.html` | Les soumissions partent directement par e-mail via Web3Forms vers `abz9940@gmail.com`. Aucun tableau de bord de suivi, aucun statut de prospect (Qualifié, Rendez-vous, Devis en cours, Perdu). |
| **7. Stockage des devis** | **ABSENT (0%)** | Formulaire de contact | En cas de boîte mail pleine, de filtre anti-spam ou de panne de Web3Forms, les demandes clients sont **irrémédiablement perdues**. |
| **8. Newsletter** | **FAUSSE FONCTION (5%)** | `index.html` (lignes 349-385) | Le formulaire ne fait qu'envoyer un email avec l'adresse saisie. Aucune intégration avec un service d'emailing (Brevo, Mailchimp, Resend), aucune liste de diffusion, aucun respect des obligations légales de désabonnement. |
| **9. Intégrations API Réseaux Sociaux (ADP Connect)** | **ABSENTES (0%)** | `POST/posts-data.js`, `POST/dashboard.js` | Aucun jeton OAuth, aucune API Facebook/LinkedIn/Instagram/X connectée. Il s'agit uniquement de liens hypertextes qui ouvrent les interfaces web des réseaux sociaux dans un nouvel onglet. |

---

## 2. Analyse détaillée du dossier `POST/` (L'embryon d'ADP Connect)

Le dossier [POST/](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/01_LEGACY/paul-boubert-portfolio/POST) contient une tentative intéressante de rationalisation de la communication sur les réseaux sociaux, mais souffre de limites structurelles :

1. **Fonctionnement interne :**
   - Le fichier `POST/posts-data.js` pré-remplit des créneaux de publication à partir de juin 2026 pour 6 réseaux (LinkedIn, Instagram, Facebook, X, TikTok, WhatsApp).
   - Les modifications saisies par l'utilisateur sont enregistrées dans le `localStorage` du navigateur :
     ```javascript
     localStorage.setItem('adp_posts_content', JSON.stringify(saved));
     ```
2. **Vulnérabilités & Limites :**
   - **Volatilité des données :** Si le cache du navigateur est vidé, ou si l'utilisateur change d'ordinateur, l'ensemble des textes préparés est effacé.
   - **Absence de multi-utilisateur :** Impossible de faire collaborer un rédacteur et un valideur.
   - **Déconnexion complète du site web :** Les actualités publiées sur les réseaux sociaux ne sont pas automatiquement réinjectées sur le site web sous forme de flux d'actualités.
   - **Boutons "Publier" :** Se contentent d'appeler `window.open('https://www.linkedin.com/feed/')`. L'utilisateur doit copier-coller manuellement son texte.

---

## 3. Spécifications requises pour la cible : ADP Control & ADP Connect

Pour répondre au cahier des charges de la refonte, deux modules essentiels doivent être conçus :

### 3.1. ADP Control (Le Back-Office d'Administration Centralisé)
- **Authentification sécurisée :** Accès restreint par identifiant/mot de passe avec hachage moderne ou authentification par lien magique / OAuth sécurisé.
- **Gestion des 7 Univers :** Interface dédiée pour modifier la description, les livrables clés, la couleur d'accentuation et les créations phares de chaque identité.
- **Gestion du Catalogue de Projets :** 
  - Fiches projets structurées (Titre, Pôle rattaché, Catégorie, Année, Localisation, Client, Logiciels utilisés, Galerie d'images réordonnable, Description markdown).
  - Statut de publication (Brouillon / Publié).
- **Médiathèque intelligente :** Upload drag-and-drop, conversion automatique en WebP responsive, stockage sur stockage objet (S3, Vercel Blob ou Supabase Storage), interdiction des doublons orphelins.
- **Boîte de réception des Devis & Contacts :** Tableau de bord listant chaque demande avec date, coordonnées, intentions sélectionnées lors de la visite, statut de traitement et export CSV.

### 3.2. ADP Connect (La Plateforme de Communication Unifiée)
- **Gestionnaire de Newsletter :** Intégration via API d'un fournisseur transactionnel/marketing moderne (ex. Brevo ou Resend) avec stockage des abonnés, historique des campagnes et lien de désinscription automatique.
- **Hub Réseaux Sociaux & Actualités :**
  - Calendrier éditorial synchronisé en base de données.
  - Système "1 sujet -> 6 déclinaisons" connecté à une table de données persistante.
  - Génération de cartes de partage Open Graph dynamiques à l'effigie des Ateliers de Paul.
- **Flux d'actualités sur le site :** Possibilité d'afficher sur la page d'accueil ou dans chaque univers les 3 dernières actualités publiées sans retoucher au code.

---

## 4. Recommandation technologique pour le CMS

Trois options réalistes s'offrent au projet :
1. **CMS Headless intégré (ex: Decap CMS / TinaCMS / Contentful) :** Stockage des contenus dans le dépôt Git au format Markdown/JSON avec interface d'administration WYSIWYG. Léger, zéro coût de serveur, mais limité pour la gestion dynamique des devis et contacts.
2. **Backend BaaS unifié (ex: Supabase / PocketBase) :** Base de données PostgreSQL ou SQLite embarquée avec API REST/GraphQL instantanée, gestion des utilisateurs, authentification, stockage de fichiers et webhooks.
3. **Framework Full-Stack avec Back-Office intégré (ex: Astro / Next.js avec base SQLite/Postgres) :** Solution hautement recommandée pour concilier performance statique d'affichage et fonctionnalités dynamiques pour ADP Control et ADP Connect.
