# ADP WEB EXPERIENCE — Rapport 02B-03 : Audit Design, Direction Artistique & Expérience Utilisateur

**Date :** 27 octobre 2026  
**Auteurs :** Designer UX/UI, Directeur Artistique  
**Projet :** ADP WEB EXPERIENCE  
**Objets analysés :**
- Site legacy dans `01_LEGACY/paul-boubert-portfolio/`
- Maquette conceptuelle [ADP_Possibility_Machine_Prototype.html](file:///d:/05_ADP_SOFTWARE/00_ADP%20WEB%20EXPERIENCE/ADP_Possibility_Machine_Prototype.html)  

---

## 1. Confrontation conceptuelle : Legacy vs The Possibility Machine

| Dimension créative | Site Historique (Legacy) | Nouveau Concept (*The Possibility Machine*) | Écart conceptuel (Gap) |
|---|---|---|---|
| **Philosophie & Posture** | Vitrine d'entreprise classique / portfolio d'architecte institutionnel. | **Atelier vivant & machine créative** : un écosystème interactif où les idées prennent forme. | **Rupture majeure** : passage d'un catalogue passif à un dispositif exploratoire. |
| **Ambiance visuelle (Mode)** | Light mode strict : fond blanc (`#FFFFFF`), gris clair (`#F3F6FA`), bleu corporate (`#1E73D8`). | **Dark mode noble** : fond nuit abyssal (`#0C1422`), reflets or chaud (`#E9BD7A`), matières en mouvement. | **Inversion totale** des contrastes et de l'univers sensoriel. |
| **Effet de matière** | Écrans plats sans texture, bordures légères, ombres portées douces (`box-shadow`). | **Grain argentique CSS (`.grain`)**, halos lumineux, reflets métalliques, géométries facettées. | Sensation tactile et organique d'un véritable atelier de fabrication. |
| **Point focal d'accueil (Hero)** | Image aléatoire de projet architectural en pleine largeur avec texte à gauche. | **The Possibility Core** : sculpture géométrique 3D en rotation avec halos imbriqués. | Création d'une signature visuelle mémorable et différenciante. |
| **Modèle de navigation** | Navigation hiérarchique traditionnelle par menus (Pôles, Portfolio, Ressources, Contact). | **Navigation par intentions** (6 parcours orientés besoin client : concevoir, créer, personnaliser, etc.). | Centrage utilisateur maximal : orientation par le besoin avant l'organisation interne. |
| **Structure des 7 pôles** | Menu déroulant textuel + cartes linéaires blanches dans la page d'accueil. | **Grille polygonale dynamique (`universe-grid`)** où chaque univers rayonne de sa propre couleur et matière. | Mise en valeur unifiée et équilibrée des 7 facettes de la marque. |

---

## 2. Évaluation détaillée des composantes graphiques et UX

### 2.1. Typographie & Rythme de lecture
- **Site legacy :**
  - Polices : `Outfit` (titres géométriques modernes) et `Inter` (texte courant lisible).
  - Évaluation : Le couple typographique est solide et bien choisi pour l'architecture. Cependant, les tailles de titres sont souvent rigides et les contrastes de graisses manquent de dramaturgie visuelle.
- **Prototype Possibility Machine :**
  - Utilise la typographie système fluide via des échelles dynamiques `clamp(52px, 6.5vw, 110px)` avec un interlettrage resserré (`letter-spacing: -0.075em`), combiné à des surtitres d'atelier espacés (`letter-spacing: 3px`).
  - *Recommandation DA :* Conserver `Outfit` pour les titres et `Inter` pour les textes longs dans la refonte, mais adopter l'échelle fluide `clamp()` et les variations de tracking introduites par la maquette.

### 2.2. Palette chromatique et gestion des identités
- **Legacy :**
  - Une couleur maîtresse bleue (#1E73D8) sur la racine, puis 7 couleurs distinctes assignées à chaque pôle dans `brand-pages.css`.
  - Problème : La coexistence des 7 couleurs était abrupte (changement brutal de palette au clic d'un pôle sans transition progressive).
- **Prototype :**
  - Socle commun sombre `#0C1422` rehaussé d'or `#E9BD7A`.
  - Les 7 univers interviennent comme des nuances d'énergie complémentaires :
    1. ADP Project : Bleu technique céruléen (`#7DB9DC`)
    2. ADP Studio : Cuivre / Ocre chaud (`#F3A66D`)
    3. Rosbri Wax Design : Amarante / Magenta textile (`#E68AB3`)
    4. ADP Brief : Vert sauge structurant (`#B1CE9A`)
    5. ADP Lab : Violet expérimental (`#B8A0F4`)
    6. ADP Academy : Or savant (`#E8C56F`)
    7. ADP Tools : Cyan numérique (`#7BDED8`)
  - *Bénéfice :* Les univers cohabitent harmonieusement sans cacophonie visuelle.

### 2.3. Transitions, Animations et Accessibilité Motrice
- **Défaut majeur du Legacy :**
  - Le curseur personnalisé (`adp-cursor`) désactive le curseur système (`* { cursor: none }`). Sur écran tactile ou avec pointeur haute précision, ce comportement crée de la friction et un sentiment de lourdeur.
- **Excellence du Prototype :**
  - Aucune modification du curseur natif.
  - Animations physiques fluides en CSS (`@keyframes float`, `@keyframes spin`).
  - Prise en charge native de l'accessibilité : respect de la préférence système `@media (prefers-reduced-motion: reduce)` ET bouton dédié de désactivation manuelle (`◌ Réduire les animations`).

### 2.4. Ergonomie Mobile
- **Legacy :** Menu burger standard déployant un panneau vertical. Pas d'accès rapide direct au contact pendant le scroll des longues pages projets.
- **Prototype :** Présence d'un "Dock flottant" permanent (`.dock` : `✦ Contacter ADP`) permettant d'ouvrir la modale de contact à tout moment sans remonter la page, particulièrement efficace sur smartphone.

---

## 3. Distinction entre limites des médias et défauts de conception

Il est crucial de ne pas imputer à la conception ce qui relève de l'absence des 734 médias :

1. **Ce qui relève de l'absence des médias (non-défaut) :**
   - Les cadres d'images gris ou vides sur les pages projets.
   - Les vignettes de modèles SketchUp dépendant du réseau distant.
2. **Ce qui relève de réels défauts de conception du Legacy :**
   - **Incohérence des styles :** Le fichier `brand-pages.css` a été superposé en urgence avec des sélecteurs `!important` ou des sélecteurs très spécifiques pour corriger la couleur des dropdowns.
   - **Monotonie de la mise en page des 38 projets :** Les 38 études de cas d'architecture sont coulées dans un moule identique (hero + bloc description 2 colonnes + galerie verticale de rectangles), sans variation narrative ni valorisation des spécificités du projet.
   - **Absence de storytelling de marque :** L'histoire des Ateliers de Paul, la philosophie de l'artisanat et de la rigueur camerounaise restent confinées à des paragraphes textuels statiques, sans mise en scène vivante.

---

## 4. Éléments patrimoniaux à conserver impérativement

Le directeur artistique et l'expert UX recommandent de préserver :
1. **L'emblème et le logo ADP :** Le symbole de la marque et son ancrage prestigieux doivent être le point de départ de l'expérience.
2. **Les 7 identités et leurs emblèmes :** Les logos WebP/SVG créés pour chaque pôle (`tools`, `studio`, `brief`, `academy`, `lab`, `project`, `rosbri`).
3. **La rigueur documentaire des projets :** La fiche technique systématique des réalisations (Type, Prestation, Phase, Logiciels utilisés : AutoCAD, Revit, Enscape) qui confère une autorité technique immédiate.
4. **Le sceau déontologique ONAC :** La mention et l'engagement envers l'Ordre National des Architectes du Cameroun, élément clé de réassurance institutionnelle.
5. **La carte vCard `/paul` :** L'ergonomie de prise de contact rapide en 1 clic pour les partenaires d'affaires.
