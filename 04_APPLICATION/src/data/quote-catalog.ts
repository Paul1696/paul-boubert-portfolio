/**
 * ADP WEB EXPERIENCE — Catalogue des Prestations & Services des 7 Univers
 * Règles de rigueur : Zéro prix arbitraire inventé, mention explicite "Sur étude d'atelier".
 * Respect strict du cadre déontologique et réglementaire (Loi n° 90/039 de l'Ordre National des Architectes du Cameroun).
 */

import { QuoteCatalogItem } from "@/types/quote";

export const QUOTE_CATALOG: QuoteCatalogItem[] = [
  // =========================================================================
  // UNIVERS 01 : ADP PROJECT (Conception Spatiale · Modélisation 3D · Maquette)
  // =========================================================================
  {
    id: "proj-faisabilite",
    universeId: "adp-project",
    universeName: "ADP Project",
    universeColor: "var(--univ-project, #7DB9DC)",
    universeSymbol: "⌂",
    title: "Études Préliminaires & Cadrage Spatial",
    shortDescription: "Analyse d'ensoleillement, programmation volumétrique préliminaire et diagnostic bioclimatique de site.",
    category: "Conception Spatiale",
    defaultVariantId: "standard",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "esquisse", label: "Diagnostic préliminaire & orientation solaire", badge: "Esquisse" },
      { id: "standard", label: "Étude volumétrique et cadrage fonctionnel", badge: "Complet" },
      { id: "approfondie", label: "Cadrage spatial approfondi + analyse bioclimatique", badge: "Avancé" },
    ],
  },
  {
    id: "proj-bim-lod",
    universeId: "adp-project",
    universeName: "ADP Project",
    universeColor: "var(--univ-project, #7DB9DC)",
    universeSymbol: "⌂",
    title: "Modélisation Numérique Spatiale & Maquette 3D",
    shortDescription: "Maquette numérique paramétrique d'atelier pour la visualisation des volumes et l'organisation spatiale.",
    category: "Modélisation 3D",
    defaultVariantId: "detaillee",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "volumetrie", label: "Modélisation volumétrique globale et gabarit", badge: "Masse" },
      { id: "detaillee", label: "Maquette numérique détaillée des espaces", badge: "Détaillé" },
      { id: "coordination", label: "Maquette d'interface spatiale et repérage", badge: "Coordination" },
    ],
  },
  {
    id: "proj-plans-exec",
    universeId: "adp-project",
    universeName: "ADP Project",
    universeColor: "var(--univ-project, #7DB9DC)",
    universeSymbol: "⌂",
    title: "Dessins d'Atelier & Carnets de Détails Constructifs",
    shortDescription: "Calepinages de matériaux, coupes constructives d'atelier et carnets de finitions adaptés au climat tropical.",
    category: "Dossier Technique d'Atelier",
    defaultVariantId: "finitions",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "second-oeuvre", label: "Calepinages de sols et revêtements muraux", badge: "Calepinage" },
      { id: "finitions", label: "Carnets de détails de menuiseries et agencements", badge: "Finitions" },
      { id: "complet", label: "Dossier graphique complet de détails d'atelier", badge: "Complet" },
    ],
  },
  {
    id: "proj-rendus-3d",
    universeId: "adp-project",
    universeName: "ADP Project",
    universeColor: "var(--univ-project, #7DB9DC)",
    universeSymbol: "⌂",
    title: "Perspectives 3D d'Ambiance & Visuels d'Atmosphère",
    shortDescription: "Images de synthèse d'ambiance avec simulation soignée des textures, matières locales et lumières tropicales.",
    category: "Imagerie 3D",
    defaultVariantId: "serie",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "perspective-solo", label: "Perspective d'ambiance à l'unité", badge: "Unitaire" },
      { id: "serie", label: "Série d'ambiances (extérieures et intérieures)", badge: "Série" },
      { id: "animation", label: "Série d'ambiances + Animation vidéo immersive", badge: "Immersion" },
    ],
  },

  // =========================================================================
  // UNIVERS 02 : ADP STUDIO (Design · Image de marque · Édition)
  // =========================================================================
  {
    id: "studio-brand-identity",
    universeId: "adp-studio",
    universeName: "ADP Studio",
    universeColor: "var(--univ-studio, #F3A66D)",
    universeSymbol: "◈",
    title: "Création d'Identité Visuelle & Logotype",
    shortDescription: "Conception vectorielle maîtresse, typographies signatures, palette chromatique et charte graphique.",
    category: "Identité de Marque",
    defaultVariantId: "brandbook",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "logo-essentiel", label: "Logotype maître et déclinaisons vectorielles", badge: "Essentiel" },
      { id: "brandbook", label: "Logotype complet et charte graphique d'atelier", badge: "Complet" },
      { id: "programme-immo", label: "Identité visuelle de programme ou d'espace", badge: "Programme" },
    ],
  },
  {
    id: "studio-plaquette",
    universeId: "adp-studio",
    universeName: "ADP Studio",
    universeColor: "var(--univ-studio, #F3A66D)",
    universeSymbol: "◈",
    title: "Support d'Édition & Plaquette de Présentation",
    shortDescription: "Mise en page éditoriale soignée pour la présentation de projets d'architecture et de design.",
    category: "Édition & Print",
    defaultVariantId: "brochure",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "depliant", label: "Dépliant synthétique de présentation", badge: "Dépliant" },
      { id: "brochure", label: "Brochure de présentation de projet avec plans stylisés", badge: "Brochure" },
      { id: "livre-programme", label: "Édition de prestige pour programme d'exception", badge: "Prestige" },
    ],
  },
  {
    id: "studio-signaletique",
    universeId: "adp-studio",
    universeName: "ADP Studio",
    universeColor: "var(--univ-studio, #F3A66D)",
    universeSymbol: "◈",
    title: "Signalétique Spatiale & Habillages Graphiques",
    shortDescription: "Système d'orientation visuelle, marquages et totems intégrés à l'espace bâti.",
    category: "Signalétique",
    defaultVariantId: "espace",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "directionnelle", label: "Plaques directionnelles et repérage d'espaces", badge: "Signalétique" },
      { id: "espace", label: "Dispositif complet de signalétique intérieure et extérieure", badge: "Espace" },
    ],
  },

  // =========================================================================
  // UNIVERS 03 : ROSBRI WAX DESIGN (Haute Couture & Design Textile)
  // =========================================================================
  {
    id: "rosbri-sur-mesure",
    universeId: "rosbri-design",
    universeName: "Rosbri Wax Design",
    universeColor: "var(--univ-rosbri, #E68AB3)",
    universeSymbol: "✿",
    title: "Tenue de Cérémonie & Haute Couture Wax Sur-Mesure",
    shortDescription: "Confection artisanale sur-mesure combinant cotons Wax grand teint, lin et broderies d'atelier.",
    category: "Haute Couture",
    defaultVariantId: "costume",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "costume", label: "Ensemble veste architecturée & pantalon sur-mesure", badge: "Tailleur" },
      { id: "gala", label: "Robe de cérémonie avec découpes et incrustations Wax", badge: "Cérémonie" },
      { id: "capsule", label: "Tenue d'apparat complète de haute confection", badge: "Haute Couture" },
    ],
  },
  {
    id: "rosbri-ameublement",
    universeId: "rosbri-design",
    universeName: "Rosbri Wax Design",
    universeColor: "var(--univ-rosbri, #E68AB3)",
    universeSymbol: "✿",
    title: "Coussins d'Architecte & Design Textile d'Intérieur",
    shortDescription: "Éléments textiles d'ameublement alliant rigueur géométrique et motifs Wax d'exception.",
    category: "Design Textile",
    defaultVariantId: "set-coussins",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "set-coussins", label: "Ensemble de coussins d'architecte déhoussables", badge: "Coussins" },
      { id: "salon-complet", label: "Ensemble textile d'intérieur (coussins et chemins de table)", badge: "Ensemble" },
    ],
  },

  // =========================================================================
  // UNIVERS 04 : ADP BRIEF (Documents de Projet · Métrés & CCTP d'Atelier)
  // =========================================================================
  {
    id: "brief-cctp",
    universeId: "adp-brief",
    universeName: "ADP Brief",
    universeColor: "var(--univ-brief, #B1CE9A)",
    universeSymbol: "⚡",
    title: "Cahier de Prescriptions Techniques d'Atelier (CCTP)",
    shortDescription: "Description méthodique des exigences techniques et matériaux recommandés pour la consultation.",
    category: "Pièces Écrites d'Atelier",
    defaultVariantId: "cctp-second-oeuvre",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "cctp-second-oeuvre", label: "Prescriptions Second Œuvre & Finitions", badge: "Second Œuvre" },
      { id: "cctp-global", label: "Prescriptions techniques globales d'atelier", badge: "Global" },
    ],
  },
  {
    id: "brief-dpgf",
    universeId: "adp-brief",
    universeName: "ADP Brief",
    universeColor: "var(--univ-brief, #B1CE9A)",
    universeSymbol: "⚡",
    title: "Cadre de Métrés & Décomposition Estimative (DPGF / DQE)",
    shortDescription: "Structuration méthodique des quantités et cadres de chiffrage pour la consultation d'entreprises.",
    category: "Économie de Projet",
    defaultVariantId: "dpgf-cadre",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "dpgf-cadre", label: "Cadre de métrés et bordereau descriptif", badge: "Métrés" },
      { id: "dpgf-estimatif", label: "Cadre estimatif avec références de prix du marché local", badge: "Estimatif" },
    ],
  },
  {
    id: "brief-audit-devis",
    universeId: "adp-brief",
    universeName: "ADP Brief",
    universeColor: "var(--univ-brief, #B1CE9A)",
    universeSymbol: "⚡",
    title: "Assistance à l'Analyse Comparative des Offres",
    shortDescription: "Dépouillement technique et grille comparative des devis d'entreprises pour éclairer la décision du maître d'ouvrage.",
    category: "Assistance Maîtrise d'Ouvrage",
    defaultVariantId: "depouillement",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "depouillement", label: "Grille comparative analytique d'offres reçues", badge: "Comparatif" },
      { id: "synthese", label: "Grille comparative + Rapport de synthèse pour arbitrage", badge: "Synthèse" },
    ],
  },

  // =========================================================================
  // UNIVERS 05 : ADP LAB (Recherche Tropicale · Matériaux Locaux)
  // =========================================================================
  {
    id: "lab-bioclimatique",
    universeId: "adp-lab",
    universeName: "ADP Lab",
    universeColor: "var(--univ-lab, #B8A0F4)",
    universeSymbol: "⌬",
    title: "Étude de Confort Thermique & Ventilation Naturelle",
    shortDescription: "Étude d'orientation, de protections solaires et de dispositifs de ventilation naturelle passive en climat tropical.",
    category: "Recherche & Climat",
    defaultVariantId: "solaire-aeration",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "solaire", label: "Étude de trajectoires solaires et protections passives", badge: "Solaire" },
      { id: "solaire-aeration", label: "Étude combinée protections solaires et principes d'aération", badge: "Combiné" },
    ],
  },
  {
    id: "lab-terre-crue",
    universeId: "adp-lab",
    universeName: "ADP Lab",
    universeColor: "var(--univ-lab, #B8A0F4)",
    universeSymbol: "⌬",
    title: "Recommandations Matériaux Locaux & Terre Crue",
    shortDescription: "Conseils techniques sur l'utilisation du bloc de terre compressée (BTC), de la pierre et des essences locales.",
    category: "Matériaux Locaux",
    defaultVariantId: "btc-conseil",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "btc-conseil", label: "Fiche de recommandations techniques pour mise en œuvre BTC", badge: "BTC" },
      { id: "filiere-locale", label: "Étude d'opportunité d'intégration de filières locales de matériaux", badge: "Filière" },
    ],
  },

  // =========================================================================
  // UNIVERS 06 : ADP ACADEMY (Formations Professionnelles)
  // =========================================================================
  {
    id: "acad-revit",
    universeId: "adp-academy",
    universeName: "ADP Academy",
    universeColor: "var(--univ-academy, #E8C56F)",
    universeSymbol: "✦",
    title: "Accompagnement & Formation Autodesk Revit",
    shortDescription: "Parcours pratique d'apprentissage axé sur la modélisation spatiale et la documentation graphique d'atelier.",
    category: "Formation Logicielle",
    defaultVariantId: "perfectionnement",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "initiation", label: "Initiation aux fondamentaux de modélisation", badge: "Initiation" },
      { id: "perfectionnement", label: "Perfectionnement aux composants et familles d'atelier", badge: "Avancé" },
      { id: "equipe", label: "Session sur-mesure d'équipe en agence ou bureau d'études", badge: "Équipe" },
    ],
  },
  {
    id: "acad-dynamo",
    universeId: "adp-academy",
    universeName: "ADP Academy",
    universeColor: "var(--univ-academy, #E8C56F)",
    universeSymbol: "✦",
    title: "Atelier d'Automatisation & Scripting Dynamo",
    shortDescription: "Apprentissage des logiques visuelles de scripts pour optimiser les tâches répétitives de modélisation.",
    category: "Automatisation",
    defaultVariantId: "dynamo-atelier",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "dynamo-atelier", label: "Atelier pratique d'initiation au scripting visuel", badge: "Atelier" },
      { id: "dynamo-avance", label: "Perfectionnement aux flux de données et automatisations", badge: "Avancé" },
    ],
  },

  // =========================================================================
  // UNIVERS 07 : ADP TOOLS (Composants Numériques & Scripts)
  // =========================================================================
  {
    id: "tools-familles",
    universeId: "adp-tools",
    universeName: "ADP Tools",
    universeColor: "var(--univ-tools, #7BDED8)",
    universeSymbol: "⚙",
    title: "Composants & Familles Numériques Paramétriques",
    shortDescription: "Objets 3D paramétriques configurés pour l'agencement, les menuiseries et le mobilier sur-mesure.",
    category: "Bibliothèque Numérique",
    defaultVariantId: "serie-composants",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "unite", label: "Création de composant paramétrique à l'unité", badge: "Unitaire" },
      { id: "serie-composants", label: "Série de composants cohérents pour agencement", badge: "Série" },
      { id: "catalogue", label: "Développement d'une bibliothèque complète de fabricant", badge: "Bibliothèque" },
    ],
  },
  {
    id: "tools-script-sur-mesure",
    universeId: "adp-tools",
    universeName: "ADP Tools",
    universeColor: "var(--univ-tools, #7BDED8)",
    universeSymbol: "⚙",
    title: "Développement de Script d'Automatisation d'Atelier",
    shortDescription: "Script conçu pour fluidifier une tâche répétitive de production graphique ou d'organisation de données.",
    category: "Automatisation",
    defaultVariantId: "script-custom",
    pricingNotice: "Sur étude d'atelier",
    variants: [
      { id: "script-simple", label: "Script utilitaire pour traitement de données ou repérage", badge: "Utilitaire" },
      { id: "script-custom", label: "Script avancé avec paramètres adaptés aux besoins du projet", badge: "Avancé" },
    ],
  },
];
