# ADP WEB EXPERIENCE — Rapport 03A-12 : Synthèse des Décisions et Arbitrages Soumis à Validation

**Date :** 27 octobre 2026  
**Auteurs :** Le Comité des Dix Experts Réuni  
**Projet :** ADP WEB EXPERIENCE (`ateliersdepaul.com`)  
**Destinataire :** Paul Boubert, Direction Générale des Ateliers de Paul  
**Statut :** Document décisionnel préliminaire — Fin de l'Étape 03A (Arrêt avant l'Étape 03B)  

---

## 1. Contexte et Clôture de l'Étape 03A

L'étape 03A a permis d'achever la conception technique intégrale de la plateforme **ADP WEB EXPERIENCE**.

L'ensemble des 12 rapports rédigés dans `02_AUDIT/` pose les fondations d'un système robuste, haut de gamme, sécurisé et réaliste, prêt pour le démarrage du développement applicatif à l'étape 03B.

Avant d'initier le code, **huit arbitrages structurants** sont formellement soumis à la validation de la direction.

---

## 2. Tableau Récapitulatif des Huit Arbitrages Stratégiques

| N° | Sujet de la Décision | Option Recommandée par le Comité | Option Alternative | Impact & Enjeu |
|:---:|---|---|---|---|
| **01** | **Architecture globale** | **Monolithe Modulaire Next.js 15 + Payload 3.0** | Architecture découplée Frontend / CMS séparés | Réduction drastique des coûts d'hébergement et des pannes réseau inter-serveurs. |
| **02** | **Fournisseur de Base de Données** | **Neon Serverless PostgreSQL ou Supabase** | VPS Linux dédié auto-hébergé | Fiabilité maximale, sauvegardes continues automatiques, 0 maintenance système au lancement. |
| **03** | **Stockage des Médias** | **Cloudflare R2 (Compatible S3)** | AWS S3 Standard | **0 $ de frais de bande passante** lors des téléchargements par les visiteurs (Zero Egress). |
| **04** | **Thème visuel principal** | **Thème Clair Minéral Sophistiqué (Par défaut)** + Mode Sombre optionnel | Thème Sombre d'Atelier imposé à tous | Alignement avec la préférence de direction : élégance noble et clarté architecturale. |
| **05** | **Routage des Devis & Contacts** | **WhatsApp Prioritaire + BDD Locale** | Formulaire email traditionnel seul | Canal de conversion n°1 en Afrique centrale avec pré-remplissage dynamique. |
| **06** | **Emailing & Newsletter** | **Resend API ou Brevo API** | Maintien de Web3Forms gratuit | Vraie gestion de liste avec double opt-in conforme et zéro clé API exposée dans le navigateur. |
| **07** | **Périmètre des Réseaux Sociaux** | **Hub Éditorial 1 Sujet ➔ 6 Formats (MVP)** | Automatisation API complète immédiate | Réalisme opérationnel : pas de blocage lié aux autorisations strictes de Meta et LinkedIn. |
| **08** | **Périmètre Financier MVP** | **Zéro compte client & Zéro paiement en ligne** | Intégration e-commerce et passerelle MTN/Orange | Fluidité totale de devis, pas de complexité bancaire prématurée. |

---

## 3. Analyse Détaillée des Décisions Soumises à Arbitrage

---

### Décision 01 — Choix de l'Architecture Applicative
- **Recommandation du Comité :** Adopter le **Monolithe Modulaire Next.js 15 avec Payload CMS 3.0 embarqué**.
- **Justification :** Payload 3.0 s'exécute directement dans le même runtime que le site public. Les types TypeScript sont synchronisés instantanément, l'accès à la BDD ne subit aucune latence réseau, et un seul déploiement sur Vercel gère à la fois le site public et le back-office.
- **Alternative écartée :** Maintenir deux serveurs distincts (un Next.js sur Vercel + un Strapi sur Render) double la charge de maintenance DevOps et les risques de coupure.
- 👉 **Décision attendue :** *Approbation du Monolithe Modulaire.*

---

### Décision 02 — Fournisseur PostgreSQL
- **Recommandation du Comité :** Utiliser **Neon Serverless PostgreSQL** ou **Supabase**.
- **Justification :** Offre gratuite généreuse couvrant l'ensemble des besoins de développement et de lancement. Mise à l'échelle transparente, sauvegardes continues (Point-in-Time Recovery), et portabilité intégrale via exports SQL standard (`pg_dump`).
- **Alternative écartée :** Installer PostgreSQL sur un VPS Linux non managé exige des compétences d'administration système quotidiennes et comporte des risques de perte de données en cas d'incident serveur.
- 👉 **Décision attendue :** *Confirmation du choix d'un service PostgreSQL infogéré.*

---

### Décision 03 — Hébergement des Médias & Photos de Projets
- **Recommandation du Comité :** Héberger les visuels sur **Cloudflare R2**.
- **Justification :** Cloudflare R2 est strictement compatible avec l'API Amazon S3 mais **ne facture aucun frais de bande passante sortante**. Sur un portfolio d'architecture riche en photographies haute définition, ce choix protège la trésorerie de l'atelier contre toute explosion de facture en cas de pic de trafic.
- **Alternative :** AWS S3 classique (plus coûteux sur la bande passante).
- 👉 **Décision attendue :** *Approbation de Cloudflare R2.*

---

### Décision 04 — Confirmation de la Posture Visuelle (Clair Minéral)
- **Recommandation du Comité :** Établir le **Thème Clair Minéral Sophistiqué comme univers par défaut**, tout en proposant un **Mode Sombre d'Atelier en bascule optionnelle** respectant les préférences du visiteur (`prefers-color-scheme`).
- **Justification :** La clarté minérale (fond ivoire/pierre, lin, accents bronze/laiton brossé) reflète la lumière de l'atelier et la précision du dessin d'architecte. Elle offre un confort de lecture optimal en plein jour sur smartphone tout en évitant l'effet "site de jeu vidéo" parfois induit par un mode sombre imposé.
- 👉 **Décision attendue :** *Validation de la charte Clair Minéral par défaut.*

---

### Décision 05 — Traitement Prioritaire des Devis via WhatsApp
- **Recommandation du Comité :** Positionner **WhatsApp comme canal préférentiel d'échange direct**, complété par une sauvegarde silencieuse en base de données PostgreSQL.
- **Justification :** 90% des décideurs et maîtres d'ouvrage au Cameroun privilégient la réactivité de WhatsApp pour initier un échange. Le générateur de brief structuré pré-remplit les détails du projet et permet à Paul Boubert de répondre en quelques secondes avec une proposition de rendez-vous.
- 👉 **Décision attendue :** *Validation du canal WhatsApp prioritaire.*

---

### Décision 06 — Fournisseur de Messagerie et Newsletter
- **Recommandation du Comité :** Raccorder les envois d'emails à **Resend API** (ou **Brevo API**).
- **Justification :** Élimination définitive de Web3Forms. Authentification cryptographique du domaine `ateliersdepaul.com` (SPF, DKIM, DMARC), délivrabilité garantie en boîte de réception principale et double opt-in conforme pour la newsletter.
- 👉 **Décision attendue :** *Choix du fournisseur emailing (Resend ou Brevo).*

---

### Décision 07 — Approche Opérationnelle d'ADP Connect (Réseaux Sociaux)
- **Recommandation du Comité :** Déployer au lancement un **Hub de Préparation Éditoriale (1 Sujet ➔ 6 Formats Sociaux avec copie assistée)** plutôt que de retarder le projet pour des intégrations d'API d'automatisation complexes.
- **Justification :** Les API professionnelles de LinkedIn et Meta exigent des démarches de vérification d'entreprise pouvant prendre plusieurs semaines. Le hub assisté permet à l'équipe de communiquer dès le premier jour sur tous les réseaux sans dépendre d'accréditations tierces.
- 👉 **Décision attendue :** *Validation du calendrier éditorial assisté pour le MVP.*

---

### Décision 08 — Modèle Commercial du MVP
- **Recommandation du Comité :** Confirmer le modèle **sans compte client obligatoire et sans passerelle de paiement en ligne** pour le lancement.
- **Justification :** Les prestations d'architecture, de design d'espace, d'identité visuelle et de haute confection Rosbri s'inscrivent dans un temps d'échange personnalisé et d'évaluation sur-mesure. L'absence de panier marchand classique maximise le taux de prise de contact.
- 👉 **Décision attendue :** *Confirmation de l'orientation "Génération de Devis & Conseils sur-mesure".*

---

## 4. Matrice des Risques Techniques et Plans de Contingence

| Risque Identifié | Probabilité | Gravité | Mesure Préventive & Plan de Contingence |
|---|:---:|:---:|---|
| **Coupure réseau lors des migrations de données** | Moyenne | Faible | Script ETL 100% idempotent avec transactions atomiques PostgreSQL : reprise instantanée là où l'extraction s'est arrêtée. |
| **Ralentissement de l'animation 3D sur smartphones d'entrée de gamme** | Faible | Moyenne | Moteur 3D réalisé en CSS natif GPU (zéro WebGL lourd) avec coupure immédiate si `prefers-reduced-motion` est actif. |
| **Spam sur les formulaires de devis** | Moyenne | Moyenne | Piège invisible Honeypot côté serveur + limitation de débit par IP (Rate limiting) sans friction pour les visiteurs réels. |
| **Erreurs 404 sur d'anciennes URL de projets référencées sur Google** | Faible | Élevée | Cartographie exhaustive des 69 URL historiques injectée dans la table `redirects` avec redirections 301 permanentes. |
| **Rejet déontologique d'une mention architecturale** | Faible | Élevée | Encart légal standardisé et validé conforme aux dispositions de la Loi n° 90/071 régissant l'ONAC au Cameroun. |

---

## 5. Déclaration d'Arrêt Formel — Étape 03A

Le comité confirme que :
- Les **douze documents d'architecture** ont été intégralement rédigés et vérifiés ;
- Aucune ligne de code applicatif n'a été initialisée ;
- Aucun package n'a été installé ;
- Aucun fichier du legacy ni du prototype n'a été altéré ;
- La base de données et le domaine demeurent intacts.

**ARRÊT DES OPÉRATIONS CONFORMÉMENT AUX DIRECTIVES.**  
L'équipe se tient en attente de la validation formelle de ces orientations pour engager l'**Étape 03B (Initialisation du Projet & Développement des Fondations)**.
