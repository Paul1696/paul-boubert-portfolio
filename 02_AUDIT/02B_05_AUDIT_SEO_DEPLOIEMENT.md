# ADP WEB EXPERIENCE — Rapport 02B-05 : Audit SEO, Cybersécurité & Déploiement

**Date :** 27 octobre 2026  
**Auteurs :** Expert SEO, Expert Cybersécurité, Architecte Logiciel  
**Projet :** ADP WEB EXPERIENCE  
**Fichiers inspectés :**
- `index.html`, `portfolio/index.html`, `contact/index.html`
- `vercel.json`, `sitemap.xml`, `robots.txt`, `CNAME`  
**Statut de vérification :** Audit de conformité technique et analyse différentielle des URL  

---

## 1. Audit SEO Technique

### 1.1. Balisage sémantique et balises Meta
- **Titres et Meta Descriptions :**
  - Toutes les pages principales disposent de balises `<title>` descriptives et de balises `<meta name="description">` personnalisées incluant des mots-clés stratégiques ciblés sur le marché camerounais (*Douala, Cameroun, architecture, aménagement, design d'espace, BIM, suivi de chantier*).
  - Longueur moyenne des titres : 50 à 65 caractères (conforme aux préconisations Google).
  - Longueur des descriptions : 140 à 160 caractères (conforme).
- **Balises Canoniques (`<link rel="canonical">`) :**
  - Présentes sur l'ensemble des pages vérifiées, pointant avec cohérence vers la version HTTPS avec trailing slash ou slug exact sur `https://ateliersdepaul.com/`.
- **Données structurées (Schema.org / JSON-LD) :**
  - Sur la page d'accueil : `@type: "ProfessionalService"` avec raison sociale (*ADP — Ateliers de Paul*), adresse (*Douala, CM*), types de services (*Design d'intérieur, Coordination de chantier, Formation*).
  - Sur les pages projets : `@type: "BreadcrumbList"` structurant le fil d'Ariane (`Accueil > Portfolio > {Nom_Projet}`).
  - *Constat d'expert :* Le balisage Schema.org est de très bonne facture et doit être intégralement conservé et enrichi dans la nouvelle application.

### 1.2. Exploration et Indexation (`sitemap.xml` & `robots.txt`)
- **`robots.txt` :**
  ```text
  User-agent: *
  Allow: /
  Sitemap: https://ateliersdepaul.com/sitemap.xml
  ```
  Simple, propre et permissif.
- **`sitemap.xml` :**
  - 69 URL déclarées (Accueil, 4 pages corporate, 6 pôles initiaux + 2 nouveaux, 3 pages légales, carte /paul, page ressources, et 37 projets de portfolio).
  - Présence des balises `<lastmod>`, `<changefreq>`, et `<priority>`.
  - *Anomalie constatée :* La page `/adp-flow` (et sa version avec faute de frappe `apd-flow`) n'est pas répertoriée dans le sitemap officiel.

### 1.3. Réseaux Sociaux & Open Graph (Anomalie Majeure)
- **Constat d'incident :** 
  Sur quasiment toutes les pages, les balises `<meta property="og:image">` et `<meta name="twitter:image">` font référence à des images de partage social qui **n'existent pas dans le dépôt Git** :
  - `https://ateliersdepaul.com/assets/og/og-home.jpg` (Introuvable)
  - `https://ateliersdepaul.com/assets/og/og-portfolio.jpg` (Introuvable)
  - `https://ateliersdepaul.com/assets/og/og-contact.jpg` (Introuvable)
  - `https://ateliersdepaul.com/assets/og/og-ressources.jpg` (Introuvable)
  - `https://ateliersdepaul.com/assets/og/og-apropos.jpg`, `og-brief.jpg`, `og-studio.jpg`, etc.
- **Conséquence :** Lors d'un partage de lien sur WhatsApp, LinkedIn, Facebook ou Twitter/X, aucun aperçu visuel (carte enrichie) ne s'affiche, dégradant fortement le taux de clic et l'image de marque.
- **Seule exception conforme :** La page `/paul` dispose d'une image réelle dédiée `assets/paul/og-paul.png`.

---

## 2. Audit du Déploiement et de la Sécurité (`vercel.json`)

Le fichier [vercel.json](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/01_LEGACY/paul-boubert-portfolio/vercel.json) pilote le comportement de Vercel en production :

### 2.1. Redirections et Gestion des URL
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "ateliersdepaul.com" }],
      "destination": "https://www.ateliersdepaul.com/$1",
      "permanent": true
    },
    { "source": "/about", "destination": "/a-propos", "permanent": true },
    { "source": "/portfolio/bicec", "destination": "/portfolio/bicec_bafoussam", "permanent": true },
    { "source": "/about.html", "destination": "/a-propos", "permanent": true },
    { "source": "/projects/:slug", "destination": "/portfolio/:slug", "permanent": true },
    { "source": "/projects", "destination": "/portfolio", "permanent": true }
  ]
}
```
- **Points positifs :**
  - Redirection canonique 301 du domaine racine vers `www.ateliersdepaul.com`.
  - Préservation du jus de référencement des anciennes URL d'historique (`/projects` -> `/portfolio`).

### 2.2. En-têtes HTTP de Sécurité
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]
  }
]
```
- **Évaluation Cybersécurité :**
  - Bonnes pratiques de base respectées (protection contre le mime-sniffing et le clickjacking).
  - **Manques critiques identifiés :**
    1. **Absence de Content Security Policy (CSP) :** Le site charge des scripts et styles depuis Google Tag Manager, Google Fonts, cdnjs (Font Awesome) et poste vers Web3Forms sans politique CSP déclarée.
    2. **Absence de HSTS (HTTP Strict Transport Security) :** L'en-tête `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` est absent, laissant la porte ouverte aux attaques de type SSL-stripping sur les réseaux non sécurisés.
    3. **Exposition publique d'identifiants API :** La clé d'accès Web3Forms (`d4c50b39-bbfc-42c4-a02f-8cfe7f03b507`) est inscrite en clair dans le HTML public, permettant à quiconque de soumettre des milliers d'emails indésirables à son nom.

---

## 3. Cartographie des URL à préserver impérativement (Plan de protection SEO)

Tout changement d'URL lors de la refonte entraînerait une chute brutale du positionnement Google et des erreurs 404 sur les liens partagés ou indexés. Les URL suivantes doivent être **sanctuarisées** dans le nouveau routeur :

### 3.1. Pages Piliers & Corporate
- `https://www.ateliersdepaul.com/` (Accueil)
- `https://www.ateliersdepaul.com/a-propos/`
- `https://www.ateliersdepaul.com/contact/`
- `https://www.ateliersdepaul.com/ressources/`
- `https://www.ateliersdepaul.com/paul` (Lien présent sur les QR codes physiques imprimés !)
- `https://www.ateliersdepaul.com/public/contact/Paul_Boubert.vcf` (Lien direct de téléchargement vCard)

### 3.2. Les 7 Pôles / Univers
- `https://www.ateliersdepaul.com/adp-project/`
- `https://www.ateliersdepaul.com/adp-studio/`
- `https://www.ateliersdepaul.com/rosbri-design/`
- `https://www.ateliersdepaul.com/adp-brief/`
- `https://www.ateliersdepaul.com/adp-lab/`
- `https://www.ateliersdepaul.com/adp-academy/`
- `https://www.ateliersdepaul.com/adp-tools/`

### 3.3. Catalogue Réalisations (Les 38 projets d'architecture)
- `https://www.ateliersdepaul.com/portfolio/`
- Et l'ensemble des 38 sous-chemins :
  `/portfolio/018_studio/`, `/portfolio/bahemeck/`, `/portfolio/bicec_bafoussam/`, `/portfolio/bicec_usca/`, `/portfolio/boj/`, `/portfolio/boutique_biyem_assi/`, `/portfolio/bureau_dsi/`, `/portfolio/cabinet_elena/`, `/portfolio/croissanterie/`, `/portfolio/duplex_domegne/`, `/portfolio/emeraude/`, `/portfolio/enem/`, `/portfolio/entrepot/`, `/portfolio/grill_way/`, `/portfolio/harmony/`, `/portfolio/horizon/`, `/portfolio/hotel_bertoua/`, `/portfolio/hunter/`, `/portfolio/lipem/`, `/portfolio/mandeng/`, `/portfolio/mbella/`, `/portfolio/meeting_room/`, `/portfolio/mme_edzigui/`, `/portfolio/oasis/`, `/portfolio/owona/`, `/portfolio/perenco_offices/`, `/portfolio/petrofor_base/`, `/portfolio/pharmacie_studio/`, `/portfolio/residence_h/`, `/portfolio/residence_soa/`, `/portfolio/salle_de_fete/`, `/portfolio/sequoia/`, `/portfolio/showroom_kotto/`, `/portfolio/suka_cafe/`, `/portfolio/tonye/`, `/portfolio/web_tower/`, `/portfolio/workbox/`.

### 3.4. Pages Légales & Déontologiques
- `https://www.ateliersdepaul.com/cadre-deontologique/`
- `https://www.ateliersdepaul.com/mentions-legales/`
- `https://www.ateliersdepaul.com/politique-confidentialite/`
