# ADP WEB EXPERIENCE — Rapport 03B-00 : Plan d'Exécution et Protocole d'Initialisation Technique

**Date :** 27 octobre 2026  
**Auteurs :** Responsable DevOps, Architecte Logiciel Senior, Responsable QA, Ingénieur Cybersécurité  
**Projet :** ADP WEB EXPERIENCE (`ateliersdepaul.com`)  
**Statut :** Protocole d'exécution pré-approuvé pour l'étape 03B — En attente de validation  

---

## 1. Principes Directeurs et Précautions Préalables

Le présent document constitue le guide opérationnel pas-à-pas pour l'**Étape 03B (Initialisation Technique et Fondations Applicatives)**.

Conformément aux interdictions formelles de l'étape 03A :
- **Aucune commande ci-dessous ne doit être exécutée à ce stade.**
- Les répertoires `01_LEGACY/` et `02_AUDIT/` ainsi que le prototype `ADP_Possibility_Machine_Prototype.html` sont sanctuarisés et protégés contre toute écrasement accidentel.
- L'ensemble des opérations prévues fait l'objet de points de contrôle bloquants (*Quality Gates*) et d'un plan de retour arrière (*Rollback*) documenté.

---

## 2. Prérequis Logiciels et Environnement Système

Avant de lancer la moindre commande de l'étape 03B, la machine hôte doit satisfaire aux exigences suivantes :

| Prérequis | Version Minimale | Commande de Vérification | Statut Requis |
|---|:---:|---|---|
| **Système d'Exploitation** | Windows 10/11 64-bit | `Get-CimInstance Win32_OperatingSystem` | Support PowerShell natif |
| **Node.js** | **v20.9.0+ LTS** (ou v22.x) | `node --version` | Requis pour Next.js 15 & Payload 3 |
| **npm** | **v10.x+** | `npm --version` | Gestionnaire de paquets officiel |
| **Git** | **v2.40.0+** | `git --version` | Versioning et isolation des branches |
| **Compilateur C++ / Python** | Visual Studio Build Tools / Python 3.10+ | `python --version` | Requis pour la compilation native de `sharp` si pré-compilé absent |
| **Accès Réseau** | Registre npm & GitHub | `curl -I https://registry.npmjs.org` | HTTP 200 sans proxy bloquant |

---

## 3. Emplacement Cible et Topologie du Répertoire

### 3.1. Règle de Non-Écrasement de la Racine
Le projet est situé dans :
`D:\05_ADP_SOFTWARE\00_ADP WEB EXPERIENCE`

Pour ne pas entrer en conflit avec les dossiers existants (`01_LEGACY/`, `02_AUDIT/`, prototype), l'initialisation Next.js sera effectuée directement à la racine **avec ciblage sélectif des fichiers** ou dans une arborescence structurée `src/`, tout en excluant explicitement les dossiers d'archives dans `.gitignore` et `.eslintignore`.

---

## 4. Protocole d'Exécution Pas-à-Pas (Étape 03B)

```mermaid
sequenceDiagram
    autonumber
    actor DEV as Ingénieur DevOps
    participant GIT as Dépôt Git Local
    participant NPM as Registre npm
    participant APP as Socle Next.js 15
    participant CMS as Payload CMS 3.0
    participant QA as Suite de Tests de Fumée

    DEV->>GIT: Jalon 1 : Sauvegarde & Branche feature/03b-scaffolding
    DEV->>NPM: Jalon 2 : Scaffolding Next.js 15 avec TypeScript & App Router
    DEV->>NPM: Jalon 3 : Installation des dépendances Payload 3 & Utilitaires
    DEV->>APP: Jalon 4 : Configuration Tokens CSS (Thème Clair Minéral)
    DEV->>CMS: Jalon 5 : Intégration payload.config.ts & Collections MVP
    DEV->>QA: Jalon 6 : Exécution des tests de build et de démarrage
    QA-->>DEV: Rapport de validation (Build OK, Serveur OK, Port 3000)
```

---

### Jalon 1 — Sécurisation Git et Branche de Travail
1. Vérification du statut de l'espace de travail :
   ```powershell
   git status
   ```
2. Création et bascule sur la branche dédiée :
   ```powershell
   git checkout -b feature/03b-scaffolding
   ```
3. Création du fichier `.gitignore` sanctuarisant les actifs existants :
   ```gitignore
   # Dépendances et builds
   node_modules/
   .next/
   out/
   dist/
   build/

   # Environnement & Secrets
   .env
   .env.local
   .env.production
   *.pem

   # Cache et logs
   .npm/
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   .turbo/

   # Sanctuarisation Legacy (Ne pas re-tracker dans l'app)
   # 01_LEGACY/ reste tracké selon son propre historique
   ```

---

### Jalon 2 — Scaffolding du Projet Next.js 15
La commande officielle recommandée pour initialiser le projet sans invite interactive bloquante est :

```powershell
npx -y create-next-app@15.1.0 ./ --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*" --use-npm
```

#### Explication des options choisies :
- `./` : Initialisation dans le répertoire courant sans créer de sous-dossier superflu ;
- `--typescript` : Configuration immédiate de TypeScript en mode strict ;
- `--no-tailwind` : Respect de la directive d'architecture retenant le **Vanilla CSS / CSS Modules** pour une finesse visuelle optimale ;
- `--src-dir` : Regroupement de l'ensemble du code applicatif dans `src/` ;
- `--app` : Activation exclusive du Next.js App Router (Rejet du Pages Router obsolète) ;
- `--import-alias "@/*"` : Configuration du chemin d'accès absolu pointant vers `src/*`.

---

### Jalon 3 — Installation des Dépendances Officielles

#### A. Dépendances de Production
```powershell
npm install @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-s3 payload sharp zod zustand lucide-react
```

- `@payloadcms/next` : Moteur de Payload CMS embarqué dans Next.js App Router ;
- `@payloadcms/db-postgres` : Adaptateur officiel PostgreSQL (Drizzle) ;
- `@payloadcms/richtext-lexical` : Éditeur de texte enrichi moderne ;
- `@payloadcms/storage-s3` : Connecteur officiel pour le stockage Cloudflare R2 / S3 ;
- `sharp` : Traitement haute performance des images (WebP, focal point) ;
- `zod` : Schémas de validation partagés client/serveur ;
- `zustand` : Gestionnaire d'état léger pour le panier de devis multi-sélection ;
- `lucide-react` : Bibliothèque d'icônes vectorielles légères.

#### B. Dépendances de Développement et QA
```powershell
npm install -D @types/node @types/react @types/react-dom eslint prettier vitest @playwright/test
```

---

### Jalon 4 — Configuration des Variables d'Environnement
Création du gabarit `.env.example` rigoureusement cloisonné :

```env
# ==============================================================================
# ADP WEB EXPERIENCE — CONFIGURATION D'ENVIRONNEMENT (GABARIT)
# ==============================================================================

# --- BASE DE DONNÉES POSTGRESQL (NEON / SUPABASE) ---
# Utiliser obligatoirement le pooler de transactions pour le serverless
DATABASE_URI=postgresql://user:password@ep-sample-pooler.eu-central-1.aws.neon.tech/adp_db?sslmode=require

# --- SÉCURITÉ ET AUTHENTIFICATION PAYLOAD CMS ---
PAYLOAD_SECRET=CHANGE_ME_GENERATE_WITH_OPENSSL_RAND_HEX_32
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# --- STOCKAGE MÉDIAS (CLOUDFLARE R2 / S3) ---
R2_BUCKET_NAME=adp-web-media
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_PUBLIC_ENDPOINT=https://cdn.ateliersdepaul.com

# --- EMAILING ET NOTIFICATIONS (RESEND / BREVO) ---
RESEND_API_KEY=re_your_api_key_here
ADMIN_NOTIFICATION_EMAIL=paul@ateliersdepaul.com

# --- PARAMÈTRES PUBLICS (ACCESSIBLES AU CLIENT FRONTEND) ---
NEXT_PUBLIC_SITE_NAME="ADP — Ateliers de Paul"
NEXT_PUBLIC_OFFICIAL_WHATSAPP="+237690087213"
NEXT_PUBLIC_DEFAULT_THEME="light"
```

*Contrôle de sécurité : Le fichier `.env.local` contenant les clés réelles ne sera jamais commité sur Git.*

---

### Jalon 5 — Mise en Place du Design System (Thème Clair Minéral)
Création des fichiers de styles fondamentaux dans `src/styles/` :
- `tokens.css` : Définition des variables de couleur, typographies, rayons et ombres ;
- `theme-light.css` : Définition du **Thème Clair Minéral Sophistiqué par défaut** ;
- `theme-dark.css` : Définition du **Mode Sombre d'Atelier optionnel** ;
- `globals.css` : Normalisation CSS et maintien strict du curseur natif.

---

### Jalon 6 — Intégration Fondatrice de Payload CMS 3.0
1. Création de `src/payload.config.ts` reliant PostgreSQL et Cloudflare R2 ;
2. Configuration de la route dynamique du panneau d'administration : `src/app/(payload)/admin/[[...segments]]/page.tsx` ;
3. Déclaration des collections prioritaires du MVP (`users`, `roles`, `universes`, `projects`, `quote_requests`, `site_settings`).

---

## 5. Points de Contrôle Bloquants (Quality Gates)

Chaque étape doit valider le test correspondant avant d'autoriser la phase suivante :

| Jalon | Point de Contrôle | Méthode de Validation | Critère de Succès |
|---|---|---|---|
| **QG 1** | **Intégrité Git** | `git status` | Zéro modification sur `01_LEGACY/` et prototype. |
| **QG 2** | **Compilation TypeScript** | `npm run type-check` (ou `npx tsc --noEmit`) | **0 erreur** détectée. |
| **QG 3** | **Audit des Dépendances** | `npm audit` | **0 vulnérabilité critique** ou élevée. |
| **QG 4** | **Build de Production** | `npm run build` | Génération réussie du bundle `.next` sans avertissement bloquant. |
| **QG 5** | **Démarrage Serveur** | `npm run start` (ou `npm run dev`) | Démarrage en < 3 secondes, réponse HTTP 200 sur `http://localhost:3000`. |
| **QG 6** | **Accès au Back-Office** | Requête sur `/admin` | Affichage propre de la mire de connexion Payload CMS. |

---

## 6. Procédure de Retour Arrière (Plan de Rollback)

En cas d'incident technique imprévu lors du scaffolding (conflit de paquets, corruption de node_modules, incompatibilité OS) :

```mermaid
flowchart TD
    FAIL["Échec détecté lors d'un Quality Gate"] --> STOP["Arrêt immédiat du script d'installation"]
    STOP --> CLEAN["Suppression des dossiers générés (node_modules, .next, src)"]
    CLEAN --> GIT_RESET["git reset --hard HEAD & git clean -fd"]
    GIT_RESET --> RETURN["git checkout main"]
    RETURN --> RESTORE["Vérification de l'intégrité de 01_LEGACY et 02_AUDIT"]
    RESTORE --> LOG["Rédaction du rapport d'incident technique"]
```

### Commandes de Restauration d'Urgence :
```powershell
# 1. Annuler toutes les modifications non commitées
git reset --hard HEAD

# 2. Nettoyer les fichiers et répertoires non suivis créés pendant l'étape 03B
git clean -fd -e "01_LEGACY" -e "02_AUDIT" -e "ADP_Possibility_Machine_Prototype.html"

# 3. Revenir sur la branche principale propre
git checkout main

# 4. Supprimer la branche de test défaillante
git branch -D feature/03b-scaffolding
```
*Garantie absolue : Les archives historiques et les documents d'audit demeurent mathématiquement impossibles à détruire.*

---

## 7. Critères d'Acceptation de Clôture de l'Étape 03B

L'étape 03B sera déclarée officiellement terminée lorsque les 5 conditions suivantes seront réunies :
1. ✅ Le serveur Next.js 15 démarre localement sans avertissement sur `localhost:3000` ;
2. ✅ La page d'accueil affiche la structure initiale de *The Possibility Machine* habillée du Thème Clair Minéral Sophistiqué ;
3. ✅ L'interface d'administration ADP Control est accessible sur `/admin` avec authentification sécurisée ;
4. ✅ La base de données PostgreSQL est connectée et le schéma des collections MVP est synchronisé ;
5. ✅ La suite de tests de fumée (Smoke Tests) s'exécute avec 100% de réussite.
