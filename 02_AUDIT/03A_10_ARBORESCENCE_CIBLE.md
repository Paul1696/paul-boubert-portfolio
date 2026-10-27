# ADP WEB EXPERIENCE — Rapport 03A-10 : Arborescence Technique Cible du Répertoire

**Date :** 27 octobre 2026  
**Auteurs :** Architecte Logiciel Senior, Responsable DevOps, Expert Next.js / TypeScript  
**Projet :** ADP WEB EXPERIENCE (`ateliersdepaul.com`)  
**Statut :** Spécification de la structure de code cible — Étape 03A  

---

## 1. Principes d'Organisation de l'Espace de Travail

Conformément aux interdictions strictes de l'étape 03A, **aucun dossier applicatif n'est créé à ce stade**. Le présent document fige la structure formelle qui sera scaffoldée lors de l'étape 03B.

L'organisation repose sur 5 piliers :
1. **Sanctuarisation de l'existant :** Les répertoires `01_LEGACY/` et `02_AUDIT/` demeurent intacts et isolés du code de production.
2. **Modularité par domaine métier (`src/modules/`) :** Les 7 univers, le panier de devis et le CRM possèdent chacun leur logique, leurs composants spécifiques et leurs types isolés.
3. **Intégration native de Payload CMS (`src/payload/`) :** Les collections, champs, crochets de cycle de vie (hooks) et contrôles d'accès sont regroupés dans un sous-ensemble étanche.
4. **Design System & Tokens (`src/styles/` & `src/components/ui/`) :** Séparation nette entre les composants d'interface génériques réutilisables (Boutons, Modales, Tiroirs) et les vues de pages.
5. **Outillage de fiabilité (`scripts/`, `tests/`) :** Scripts de migration ETL, tests E2E Playwright et configurations CI/CD à la racine.

---

## 2. Arborescence Détaillée Complète

```text
D:\05_ADP_SOFTWARE\00_ADP WEB EXPERIENCE\
│
├── 00_DOCS/                                  # Documentation de référence du projet
│   ├── CHARTE_GRAPHIQUE.md                   # Spécifications visuelles et tokens
│   ├── CONFORMITE_ONAC.md                    # Cadre légal et déontologique Cameroun
│   └── GUIDE_CONTRIBUTION.md                 # Règles de code et workflow Git
│
├── 01_LEGACY/                                # ARCHIVES HISTORIQUES (SANCTUARISÉES - NE PAS TOUCHER)
│   └── paul-boubert-portfolio/               # Code source du site historique (62 fichiers HTML, 38 projets)
│
├── 02_AUDIT/                                 # RAPPORTS D'AUDIT ET DE CONCEPTION FORMELLE
│   ├── 02B_01_AUDIT_ARCHITECTURE.md          # Audit architecture legacy
│   ├── ...                                   # Rapports 02B-02 à 02B-08
│   ├── 03A_01_VISION_ARCHITECTURE.md         # Vision globale et principes directeurs
│   ├── 03A_02_STACK_TECHNIQUE.md             # Benchmark et sélection technologique
│   ├── 03A_03_MODELE_DONNEES.md              # Schéma relationnel PostgreSQL exhaustif
│   ├── 03A_04_MODULES_METIERS.md             # Spécifications des 7 univers et devis
│   ├── 03A_05_ADP_CONTROL.md                 # Back-office Payload CMS unifié
│   ├── 03A_06_ADP_CONNECT.md                 # Hub de communication, WhatsApp et CRM
│   ├── 03A_07_POSSIBILITY_MACHINE.md         # Scénographie interactive et The Possibility Core
│   ├── 03A_08_STRATEGIE_MIGRATION.md         # Plan de migration des 38 projets et 802 modèles
│   ├── 03A_09_SECURITE_DEPLOIEMENT.md        # Sécurité, RGPD/Loi CM, DevOps et sauvegardes
│   ├── 03A_10_ARBORESCENCE_CIBLE.md          # Le présent document de structure
│   ├── 03A_11_FEUILLE_ROUTE_MVP.md           # Jalons opérationnels et planning
│   └── 03A_12_DECISIONS_A_VALIDER.md         # Arbitrages soumis à validation humaine
│
├── ADP_Possibility_Machine_Prototype.html    # Prototype interactif validé de référence créative
│
├── .github/                                  # Intégration Continue & Déploiement (CI/CD)
│   └── workflows/
│       ├── quality-check.yml                 # Lint, TypeCheck TypeScript, Tests Vitest
│       └── e2e-playwright.yml                # Tests de non-régression de l'expérience interactive
│
├── public/                                   # Actifs statiques publics servis à la racine
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt                            # Directives d'exploration pour les moteurs
│   ├── sitemap.xml                           # Sitemap dynamique ou statique
│   ├── contact/
│   │   └── Paul_Boubert.vcf                  # Fichier vCard 3.0 normalisé
│   └── images/
│       ├── branding/                         # Logos officiels vectoriels SVG et WebP
│       └── placeholders/                     # Visuels de repli temporaires
│
├── scripts/                                  # Scripts d'ingénierie et d'exploitation
│   ├── migrate-legacy-projects.ts            # Extraction ETL des 38 projets legacy vers PostgreSQL
│   ├── migrate-sketchup-models.ts            # Ingestion des 802 modèles de sketchup-models.json
│   ├── seed-database.ts                      # Peuplement initial des 7 univers et rôles
│   ├── backup-database.sh                    # Procédure de snapshot pg_dump vers S3
│   └── restore-database.sh                   # Script de reprise après sinistre (Disaster Recovery)
│
├── tests/                                    # Suites de tests automatisés
│   ├── e2e/                                  # Tests End-to-End Playwright
│   │   ├── home-possibility-core.spec.ts     # Vérification du noyau 3D et des intentions
│   │   ├── quote-cart-flow.spec.ts           # Parcours de sélection multi-univers et devis
│   │   ├── paul-vcard-download.spec.ts       # Téléchargement vCard et liens rapides
│   │   └── redirects-legacy.spec.ts          # Validation des 69 redirections 301 sans 404
│   └── unit/                                 # Tests unitaires Vitest
│       ├── quote-calculator.test.ts          # Logique d'agrégation du panier de devis
│       └── validation-schemas.test.ts        # Validation des formulaires Zod
│
├── src/                                      # CODE SOURCE DE L'APPLICATION (Scaffoldé en 03B)
│   │
│   ├── app/                                  # Next.js 15 App Router (Routage et Rendu)
│   │   ├── (payload)/                        # Sous-arbre réservé au back-office Payload CMS
│   │   │   └── admin/
│   │   │       ├── [[...segments]]/
│   │   │       │   └── page.tsx              # Interface d'administration ADP Control
│   │   │       └── layout.tsx                # Layout sécurisé du back-office
│   │   │
│   │   ├── (public)/                         # Sous-arbre du Site Public
│   │   │   ├── layout.tsx                    # Enveloppe globale (Navbar, Footer, Dock de Devis)
│   │   │   ├── page.tsx                      # Accueil — THE POSSIBILITY MACHINE
│   │   │   │
│   │   │   ├── (universes)/                  # Pages des 7 univers ADP
│   │   │   │   ├── adp-project/page.tsx      # Univers 01 : Architecture, BIM, 3D
│   │   │   │   ├── adp-studio/page.tsx       # Univers 02 : Branding, Print & Design
│   │   │   │   ├── rosbri-design/page.tsx    # Univers 03 : Mode contemporaine & Wax
│   │   │   │   ├── adp-brief/page.tsx        # Univers 04 : Rédaction & Mémoires techniques
│   │   │   │   ├── adp-lab/page.tsx          # Univers 05 : R&D, Bioclimatique & Innovation
│   │   │   │   ├── adp-academy/page.tsx      # Univers 06 : Formations & Pédagogie
│   │   │   │   └── adp-tools/page.tsx        # Univers 07 : Logiciels & Scripts d'ingénierie
│   │   │   │
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx                  # Galerie filtrable des 38 projets
│   │   │   │   └── [slug]/page.tsx           # Fiche détaillée d'une étude de cas
│   │   │   │
│   │   │   ├── ressources/page.tsx           # Bibliothèque des 802 modèles 3D & guides
│   │   │   ├── a-propos/page.tsx             # Manifeste, philosophie et équipe ADP
│   │   │   ├── paul/page.tsx                 # Carte de visite numérique & QR Code interactif
│   │   │   ├── contact/
│   │   │   │   ├── page.tsx                  # Formulaire de contact général
│   │   │   │   └── merci/page.tsx            # Page de confirmation après contact
│   │   │   │
│   │   │   ├── cadre-deontologique/page.tsx  # Engagement réglementaire ONAC Cameroun
│   │   │   ├── mentions-legales/page.tsx     # Mentions légales et hébergement
│   │   │   ├── politique-confidentialite/page.tsx # Protection des données (Loi 2010 CM)
│   │   │   └── not-found.tsx                 # Page 404 avec moteur d'intentions de repli
│   │   │
│   │   └── api/                              # Routes d'API Serveur (Next.js Route Handlers)
│   │       ├── quotes/route.ts               # Traitement et archivage des paniers de devis
│   │       ├── contact/route.ts              # Réception des formulaires de contact
│   │       ├── newsletter/route.ts           # Inscription et confirmation double opt-in
│   │       └── revalidate/route.ts           # Webhook de purge du cache ISR à la demande
│   │
│   ├── modules/                              # LOGIQUE MÉTIER MODULAIRE DÉCOUPLÉE
│   │   ├── universes/                        # Gestionnaires des 7 identités
│   │   │   ├── components/UniverseCard.tsx
│   │   │   ├── components/RegulatoryNotice.tsx # Encart obligatoire ONAC
│   │   │   └── types.ts
│   │   ├── projects/                         # Module Études de cas & Portfolio
│   │   │   ├── components/ProjectGallery.tsx
│   │   │   ├── components/ProjectFilter.tsx
│   │   │   └── queries.ts                    # Requêtes PostgreSQL optimisées
│   │   ├── quotes/                           # Module Panier de Devis Multi-Univers
│   │   │   ├── components/QuoteDrawer.tsx    # Tiroir latéral de sélection
│   │   │   ├── components/QuoteItemRow.tsx
│   │   │   ├── store/useQuoteStore.ts        # État réactif client (Zustand)
│   │   │   └── utils/whatsappFormatter.ts    # Générateur du message structuré wa.me
│   │   ├── connect/                          # Module ADP Connect
│   │   │   ├── components/SocialCalendar.tsx
│   │   │   ├── components/LeadPipeline.tsx
│   │   │   └── services/emailService.ts      # Client Resend / Brevo
│   │   └── possibility-machine/              # Moteur de l'Accueil Immersif
│   │       ├── components/PossibilityCore.tsx # Noyau 3D CSS matériellement accéléré
│   │       ├── components/IntentGrid.tsx      # Sélecteur réactif des 6 intentions
│   │       ├── components/DynamicBrief.tsx    # Parcours interactif généré
│   │       └── state/useMachineStore.ts
│   │
│   ├── components/                           # COMPOSANTS UI PARTAGÉS ET DESIGN SYSTEM
│   │   ├── ui/                               # Composants élémentaires sans dépendance métier
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── MotionToggle.tsx              # Bascule 'prefers-reduced-motion'
│   │   ├── layout/                           # Composants d'encadrement structurels
│   │   │   ├── Navbar.tsx                    # Barre de navigation universelle réactive
│   │   │   ├── MobileMenu.tsx                # Menu tactile plein écran
│   │   │   ├── Footer.tsx                    # Pied de page avec newsletter intégrée
│   │   │   └── ContactDock.tsx               # Pastille flottante d'action rapide
│   │   └── media/
│   │       ├── OptimizedImage.tsx            # Enveloppe next/image avec blurhash
│   │       └── SvgGrain.tsx                  # Filtre de grain tactile d'atelier
│   │
│   ├── payload/                              # CONFIGURATION COMPLÈTE DE PAYLOAD CMS 3.0
│   │   ├── payload.config.ts                 # Point d'entrée de configuration du CMS
│   │   ├── collections/                      # Définitions des 25 collections
│   │   │   ├── Users.ts
│   │   │   ├── Roles.ts
│   │   │   ├── Universes.ts
│   │   │   ├── Projects.ts
│   │   │   ├── Services.ts
│   │   │   ├── Media.ts
│   │   │   ├── Resources.ts
│   │   │   ├── QuoteRequests.ts
│   │   │   ├── Contacts.ts
│   │   │   ├── NewsletterSubscribers.ts
│   │   │   ├── Redirects.ts
│   │   │   ├── SiteSettings.ts
│   │   │   └── AuditLogs.ts
│   │   ├── hooks/                            # Crochets de cycle de vie automatisés
│   │   │   ├── revalidatePageHook.ts         # Purge automatique du cache public
│   │   │   └── logAuditActionHook.ts         # Inscription indélébile dans audit_logs
│   │   └── access/                           # Fonctions d'autorisation RBAC
│   │       ├── isAdmin.ts
│   │       └── isEditor.ts
│   │
│   ├── lib/                                  # UTILITAIRES ET CONNECTEURS TECHNIQUES
│   │   ├── db.ts                             # Client PostgreSQL (@payloadcms/db-postgres)
│   │   ├── s3.ts                             # Connecteur Cloudflare R2 / AWS S3
│   │   ├── validators/                       # Schémas de validation Zod
│   │   │   ├── contactSchema.ts
│   │   │   └── quoteSchema.ts
│   │   └── utils.ts                          # Fonctions d'aide (formatage dates, devises XAF)
│   │
│   └── styles/                               # SYSTÈME DE STYLES ET VARIABLES CSS
│       ├── tokens.css                        # Tokens de design (Espacements, Rayons, Typo)
│       ├── theme-light.css                   # Thème Clair Minéral Sophistiqué (Par défaut)
│       ├── theme-dark.css                    # Thème Sombre d'Atelier (Optionnel)
│       ├── animations.css                    # Keyframes du Possibility Core et transitions
│       └── globals.css                       # Reset CSS et styles universels
│
├── .env.example                              # Modèle documenté des variables d'environnement
├── .gitignore                                # Exclusions Git (node_modules, .next, dist)
├── next.config.ts                            # Configuration Next.js (Redirections, Headers CSP)
├── package.json                              # Manifeste des dépendances et scripts
├── tsconfig.json                             # Configuration TypeScript stricte
└── vercel.json                               # Configuration de déploiement Vercel Edge
```
