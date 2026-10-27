# ADP WEB EXPERIENCE — Rapport 02B-02 : Audit Fonctionnel Détaillé

**Date :** 27 octobre 2026  
**Auteurs :** Responsable QA, Développeur Frontend, Spécialiste Marketing & Conversion  
**Projet :** ADP WEB EXPERIENCE  
**Cible :** Code legacy dans `01_LEGACY/paul-boubert-portfolio/`  
**Méthodologie :** Inspection statique rigoureuse du DOM, des gestionnaires d'événements JavaScript et des flux de données  

---

## 1. Matrice d'évaluation fonctionnelle

Chaque fonctionnalité est classée selon l'un des cinq statuts stricts :
1. **Présente et vérifiée statiquement** : Le code complet de la fonction existe, est syntaxiquement cohérent et ses mécanismes sont clairs.
2. **Présente mais non testée** : Le code est en place mais dépend d'une interaction d'exécution ou d'un service externe non testé en environnement live.
3. **Incomplète** : Un début d'implémentation existe mais des briques essentielles manquent pour assurer un service réel.
4. **Absente** : Aucune trace dans la base de code.
5. **Non vérifiable** : Requiert un serveur actif, des identifiants privés ou un environnement inaccessible en audit statique.

---

### Tableau récapitulatif des 15 fonctions clés

| Fonctionnalité | Statut attribué | Fichiers justificatifs | Criticité |
|---|---|---|---|
| **1. Page d'accueil** | **Présente et vérifiée statiquement** | `index.html`, `adp-home.css`, `adp-shared.js` | Conforme aux standards vitrine statique |
| **2. Navigation principale & mobile** | **Présente et vérifiée statiquement** | `index.html`, `adp-shared.css`, `adp-shared.js` | Problème d'accessibilité mobile partiel |
| **3. Portfolio & Études de cas** | **Présente et vérifiée statiquement** | `portfolio/index.html`, `portfolio/portfolio.js` | 38 pages statiques isolées |
| **4. Catalogues de produits / modèles** | **Présente et vérifiée statiquement** | `ressources/index.html`, `sketchup-models.json` | 802 modèles SketchUp avec liens Drive |
| **5. Pages produits dédiées** | **Incomplète** | `adp-tools/index.html`, `adp-studio/index.html` | Pages de présentation, sans panier ni fiche produit détaillée |
| **6. Formulaires de contact** | **Présente mais non testée** | `contact/index.html`, `adp-home.css` | Dépend de l'API externe Web3Forms |
| **7. Contact direct & WhatsApp** | **Présente et vérifiée statiquement** | `paul/index.html`, `scripts/build-paul.cjs`, `vcf` | Liens `wa.me` et vCard 3.0 valides |
| **8. Recherche et filtres** | **Incomplète** | `portfolio/portfolio.js`, `ressources/index.html` | Filtrage par tags OK ; **Recherche textuelle globale absente** |
| **9. Responsive Design** | **Présente et vérifiée statiquement** | Breakpoints dans `adp-shared.css`, `adp-home.css` | Adapté desktop, tablette et smartphone |
| **10. Animations & Micro-interactions** | **Présente et vérifiée statiquement** | `adp-shared.js`, `adp-shared.css` | Fade-in-up OK ; **Curseur custom anti-ergonomique** |
| **11. Accessibilité (a11y)** | **Incomplète** | `adp-shared.css` (ligne 232), `index.html` | Skip-link présent mais `* { cursor: none }` handicapant |
| **12. Référencement naturel (SEO)** | **Présente et vérifiée statiquement** | `sitemap.xml`, `robots.txt`, balisage OpenGraph | Solide, mais 18 images OG manquantes |
| **13. Administration (Back-office)** | **Absente** | Aucun fichier serveur ni login | Aucune interface de gestion dynamique |
| **14. Newsletter** | **Incomplète** | `index.html` (lignes 349-385) | Simple envoi de formulaire, pas d'outil de mailing list |
| **15. Intégrations Réseaux Sociaux** | **Incomplète** | `POST/posts-data.js`, `index.html` | Liens sortants simples, pas d'API ni d'automatisation |

---

## 2. Analyse détaillée par domaine fonctionnel

### 2.1. Expérience d'accueil et Hero
- **Mécanisme constaté :** La section Hero de `index.html` comprend un titre d'accroche classique (*"Concevoir. Créer. Construire."*), un sous-titre et un script inline aléatoire (lignes 99-123) sélectionnant une image de fond parmi 11 visuels de projets.
- **Limites :** 
  - Expérience purement passive (lecture linéaire), éloignée de la vision interactive *The Possibility Machine*.
  - Le carrousel des réalisations récentes (lignes 204-260) est codé en dur sans pagination ni défilement automatisé.

### 2.2. Navigation et Pôles
- **Desktop :** Menu fixe avec menu déroulant (dropdown) sur l'onglet "ADP" déployant les 7 identités.
- **Mobile :** Menu burger toggle en accordéon.
- **Problème UX constaté :** Sur écran intermédiaire (tablette portrait), la largeur cumulée des logos des 7 identités dans le menu déroulant peut dépasser la hauteur du viewport sans ascenseur visible si la classe `.open` n'est pas optimisée.

### 2.3. Portfolio et Gestion des 38 Projets
- **Filtrage :** Implémenté dans `portfolio/portfolio.js` via l'attribut `data-type="residentiel|commercial|renovation"`.
- **Fiches projets :** 38 sous-dossiers disposant chacun d'un `index.html` complet.
- **Défaut fonctionnel :** Aucune pagination. Sur mobile, charger les 37 cartes de la grille principale impose un DOM lourd et des dizaines de balises images différées.

### 2.4. Catalogue 3D et Ressources
- **Fonctionnement :** `ressources/index.html` télécharge dynamiquement le fichier JSON `sketchup-models.json` (51 Ko, 802 modèles) via `fetch()` lorsque l'utilisateur clique sur le filtre "Modèles SketchUp".
- **Interaction :** Des filtres secondaires (Sièges, Chambres, Éclairage, Portes, etc.) affichent les modèles avec une vignette distante (`sketchup.cgtips.org`) et un lien de téléchargement direct vers Google Drive.
- **Risque de casse :** Les vignettes sont hébergées sur un domaine externe tiers non maîtrisé (`sketchup.cgtips.org`). Si ce site tiers modifie ses URL, l'ensemble du catalogue 3D se retrouve avec des images brisées.

### 2.5. Formulaires de contact et Newsletter
- **Contact (`contact/index.html`) :**
  - Champs : Prénom, Nom, Email, Objet (sélecteur avec 7 options), Message, Checkbox RGPD.
  - Soumission : `POST` direct vers `https://api.web3forms.com/submit`.
  - Redirection : Vers `https://ateliersdepaul.com/contact/merci`.
  - *Problème :* Si le visiteur n'a pas de connexion vers l'API Web3Forms ou si la clé atteint sa limite, le formulaire échoue sans mécanisme de secours (fallback).
- **Newsletter (`index.html`) :**
  - Utilise également la même clé d'API Web3Forms avec le sujet *"Nouvelle inscription newsletter ADP"*.
  - *Constat d'expert Marketing :* Ce n'est pas une newsletter. L'email est simplement transmis par courriel au propriétaire du site. Aucun double opt-in, aucune gestion des désabonnements, aucun stockage de liste de diffusion (Mailchimp, Brevo ou Sendgrid).

### 2.6. Contact direct, Téléphonie et vCard
- **Page `/paul` et vCard :**
  - Fichier `public/contact/Paul_Boubert.vcf` conforme à la norme vCard 3.0 avec repliement à 75 octets UTF-8.
  - Liens rapides `tel:+237690715403`, `https://wa.me/237690087213`, `mailto:paul@ateliersdepaul.com`.
  - Cette fonctionnalité est l'une des plus soignées du site historique et doit être conservée et modernisée.

### 2.7. Accessibilité numérique (a11y)
- **Points positifs :** Présence d'un lien d'évitement (`.skip-link`), présence de balises sémantiques (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`), attributs `aria-expanded` sur le menu mobile.
- **Anomalie critique :**
  - Dans `adp-shared.css`, ligne 232 :
    ```css
    @media (pointer: fine) {
        * { cursor: none; }
    }
    ```
    Cette règle masque le curseur système natif au profit d'un élément `div` animé en JavaScript. En cas de latence JS ou d'utilisation d'outils d'assistance ou de trackball, le pointeur devient invisible ou désynchronisé. **À proscrire dans la refonte.**

---

## 3. Synthèse des lacunes face aux exigences de la Possibility Machine

| Exigence future | Statut dans le legacy | Analyse d'impact pour la refonte |
|---|---|---|
| **Expérience immersive d'accueil** | Absente | Le legacy propose un site d'information classique. La Possibility Machine exige un noyau animé et une scénographie visuelle forte. |
| **Navigation par intentions** | Absente | Aucune orientation par besoin client. Le visiteur doit parcourir les menus manuellement. |
| **Pages dédiées aux 7 univers** | Incomplètes | Seuls 5 pôles étaient rédigés à l'origine ; les 2 derniers ont été greffés par scripts de templating sommaires. |
| **Générateur de devis interactif** | Absent | Uniquement un formulaire de contact textuel ouvert. |
| **CMS centralisé (ADP Control)** | Absent | Tout ajout de contenu impose une intervention dans le code source. |
| **Plateforme sociale (ADP Connect)** | Incomplète | Le dossier `POST/` est une maquette locale utilisant le `localStorage`, sans publication réelle. |
