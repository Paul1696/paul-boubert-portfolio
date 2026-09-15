# Carte de visite de Paul Boubert

Page statique : `/paul`. Aucun framework, aucune police externe, aucune dépendance côté navigateur. Déploiement avec le site existant ; aucune publication effectuée par cette modification.

## Fichiers

- `index.html`, `card.css`, `card.js` : contenu, présentation, événements optionnels.
- `/public/contact/Paul_Boubert.vcf` : vCard 3.0 UTF-8, CRLF, lignes repliées à 75 octets. Dans ce dépôt statique, `public` reste dans l’URL ; ne pas appliquer la convention d’un framework qui le retire.
- `/assets/paul/brand` : logo fourni et version WebP.
- `/assets/paul/identities` : PNG originaux fournis et WebP optimisés, proportions et couleurs conservées.
- `/assets/paul/decor` : A décoratif embossé, distinct des fichiers des logos officiels.
- `/assets/paul/icons` : sprite SVG local.
- `/assets/paul/og-paul.png` : image de partage 1200 × 630.
- `/assets/paul/qr-paul.svg` : QR vectoriel avec marge de sécurité ; contient uniquement `https://ateliersdepaul.com/paul`.

ADP Project et Rosbri Wax Design renvoient vers /adp-project/ et /rosbri-design/. Les cinq autres pôles renvoient vers leurs pages existantes.

## Modification

Modifier `scripts/build-paul.cjs`, puis exécuter `node scripts/build-paul.cjs` pour régénérer HTML et vCard ensemble. La feuille de style reste éditable directement. Actualiser l’image de partage si les coordonnées ou l’identité changent. Les assets sont mis en cache durablement par le site : utiliser un nouveau nom de fichier pour toute nouvelle version d’un logo.

## Mesure anonyme

`card.js` émet sur `window` un événement `adp:card-event`, avec uniquement `{page: '/paul', action}`. Actions : `card_open`, `contact_save`, `call`, `whatsapp`, `email`, `site`, `linkedin`, `instagram`, `facebook`. Le collecteur éventuel doit être chargé avant le script différé pour recevoir `card_open`. Aucun stockage, cookie, identifiant ou appel réseau n’est effectué. Do Not Track et Global Privacy Control désactivent les événements. Le raccordement à un collecteur anonyme reste à configurer ; ne pas journaliser IP, URL de provenance ou identifiants.

## Vérification effectuée

Chrome automatisé : largeurs 320, 360, 390, 430, 768, 1024, 1440 px ; aucun débordement horizontal, images disponibles, cibles de liens ≥ 44 px, liens locaux HTTP 200, téléchargement nommé Paul_Boubert.vcf, absence d’erreur JavaScript, préférence de mouvement réduit respectée. Inspection visuelle mobile effectuée. Les liens tel, mailto, WhatsApp et sociaux reprennent les valeurs exactes du brief.

Les plateformes sociales n’ont pas permis de vérifier leurs pages via l’outil de consultation. L’ouverture effective dans les applications et l’import vCard sur iPhone/Samsung nécessitent un essai sur appareils réels. Aucun score Lighthouse n’est annoncé sans audit : HTML/CSS/JS légers, ressources locales, images des pôles différées. Avant impression du QR, publier la page puis contrôler l’URL finale et scanner une épreuve papier.

## Aperçu local

`node scripts/preview-paul.cjs`, puis ouvrir `http://127.0.0.1:4173/paul/`.

`scripts/check-paul.cjs` utilise le Playwright du runtime Codex et Chrome installé ; adapter le chemin de dépendance sur une autre machine. Il produit également les captures de contrôle et l’image Open Graph.
