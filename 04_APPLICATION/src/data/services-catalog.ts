/**
 * ADP WEB EXPERIENCE — Catalogue des Services par Univers
 * Règles de rigueur : Zéro prix arbitraire inventé, mention explicite "Sur étude d'atelier".
 * Respect strict du cadre déontologique et réglementaire (Loi n° 90/039 de l'Ordre National des Architectes du Cameroun).
 */

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  universeSlug: string;
  universeName: string;
  accentColor: string;
  shortDescription: string;
  deliverables: string[];
  typicalDuration: string;
  pricingModel: "Sur Devis Personnalisé" | "Forfait d'Atelier" | "Mission d'Étude" | "Pack Clé en Main";
  suggestedQuestions?: string[];
}

export const SERVICES_CATALOG: ServiceItem[] = [
  // --- UNIVERS 01 : ADP PROJECT ---
  {
    id: "srv-proj-amo",
    slug: "assistance-maitrise-oeuvre",
    title: "Assistance au Cadrage Spatial & Faisabilité",
    universeSlug: "adp-project",
    universeName: "ADP Project",
    accentColor: "#7DB9DC",
    shortDescription: "Accompagnement méthodologique et spatial pour cadrer les programmes, formaliser les intentions volumétriques et préparer la concertation technique.",
    deliverables: ["Note de cadrage programmatique", "Rapport d'analyse volumétrique", "Schéma directeur prévisionnel"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé",
    suggestedQuestions: ["Quelle est la destination principale de votre ouvrage (résidence, bureaux, commerce) ?", "Disposez-vous déjà des données foncières et topographiques du terrain ?"]
  },
  {
    id: "srv-proj-bim",
    slug: "modelisation-bim-lod300",
    title: "Modélisation Spatiale & Maquette Numérique 3D",
    universeSlug: "adp-project",
    universeName: "ADP Project",
    accentColor: "#7DB9DC",
    shortDescription: "Création de la maquette numérique paramétrique sous logiciel d'atelier intégrant la volumétrie architecturale et les détails d'organisation spatiale.",
    deliverables: ["Maquette numérique 3D d'atelier", "Exports géométriques standardisés", "Jeux de vues perspectives et plans d'agencement"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé",
    suggestedQuestions: ["Quels sont les objectifs prioritaires de la modélisation (visualisation, agencement intérieur, coordination) ?"]
  },
  {
    id: "srv-proj-visu",
    slug: "visualisation-rendus-4k",
    title: "Visualisation 3D d'Ambiance & Perspectives Photoréalistes",
    universeSlug: "adp-project",
    universeName: "ADP Project",
    accentColor: "#7DB9DC",
    shortDescription: "Rendus d'ambiance extérieure et intérieure haute fidélité restituant la matérialité, la lumière tropicale et l'intégration dans l'environnement.",
    deliverables: ["Série de perspectives d'ambiance", "Insertions paysagères d'atelier", "Vues immersives de cadrage"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Forfait d'Atelier",
    suggestedQuestions: ["De quelles vues prioritaires avez-vous besoin (façades jour, ambiance nuit, espaces intérieurs) ?"]
  },

  // --- UNIVERS 02 : ADP STUDIO ---
  {
    id: "srv-studio-cards",
    slug: "cartes-affaires-adp-digital-cards",
    title: "Cartes d'Affaires Prestige & Connectées ADP Digital Cards",
    universeSlug: "adp-studio",
    universeName: "ADP Studio",
    accentColor: "#C59B53",
    shortDescription: "Impression d'exception sur papiers d'art épais, finitions de luxe (dorure, vernis 3D) et QR code permanent certifié BAT vers profil interactif.",
    deliverables: ["Tirage physique certifié d'atelier", "Fichiers BAT vectoriels SVG et 300 DPI", "Profil web permanent et téléchargement vCard"],
    typicalDuration: "5 à 8 jours ouvrés",
    pricingModel: "Pack Clé en Main",
    suggestedQuestions: ["Quel volume de tirage prévoyez-vous ?", "Souhaitez-vous intégrer le module numérique interactif ADP Digital Cards ?"]
  },
  {
    id: "srv-studio-brand",
    slug: "identite-visuelle-branding",
    title: "Identité Visuelle & Image de Marque",
    universeSlug: "adp-studio",
    universeName: "ADP Studio",
    accentColor: "#F3A66D",
    shortDescription: "Création de l'univers visuel de votre marque ou projet : logotype vectoriel, typographies d'autorité, palette chromatique et charte graphique.",
    deliverables: ["Logotype vectoriel complet", "Charte graphique d'atelier", "Directives d'application visuelle"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Pack Clé en Main",
    suggestedQuestions: ["S'agit-il d'un projet immobilier spécifique ou de l'image de marque globale d'une structure ?"]
  },
  {
    id: "srv-studio-edition",
    slug: "supports-edition-plaquettes-prestige",
    title: "Édition Commerciale, Plaquettes & Livres de Marque",
    universeSlug: "adp-studio",
    universeName: "ADP Studio",
    accentColor: "#C59B53",
    shortDescription: "Mise en page éditoriale soignée pour la présentation de projets d'architecture, plaquettes de vente et rapports d'investissement.",
    deliverables: ["Plaquette commerciale imprimée certifiée", "Fichiers PDF interactifs optimisés pour diffusion numérique"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Forfait d'Atelier",
    suggestedQuestions: ["Quel est le format visé (A4, carré, dépliant) et la pagination estimée ?"]
  },
  {
    id: "srv-studio-sign",
    slug: "signaletique-habillage-mural",
    title: "Design de Signalétique Spatiale & Habillages Muraux",
    universeSlug: "adp-studio",
    universeName: "ADP Studio",
    accentColor: "#7DB9DC",
    shortDescription: "Parcours usagers intérieur/extérieur, totems d'accueil, plaques de repérage et fresques graphiques intégrées à l'architecture.",
    deliverables: ["Plans d'implantation signalétique", "Fiches techniques de fabrication", "Recommandations matières d'atelier"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé"
  },

  // --- UNIVERS 03 : ROSBRI DESIGN ---
  {
    id: "srv-rosbri-ceremonie",
    slug: "confection-ceremonie-sur-mesure",
    title: "Haute Couture Wax de Cérémonie & Sur-Mesure",
    universeSlug: "rosbri-design",
    universeName: "Rosbri Wax Design",
    accentColor: "#E68AB3",
    shortDescription: "Création vestimentaire exclusive alliant coupes architecturales rigoureuses et tissus Wax grand teint de premier choix.",
    deliverables: ["Pièce sur-mesure ajustée en atelier", "Housse de protection respirante Rosbri", "Recommandations d'entretien textile"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé",
    suggestedQuestions: ["Pour quelle échéance ou événement la tenue est-elle envisagée ?"]
  },
  {
    id: "srv-rosbri-deco",
    slug: "coussins-architecte-design-textile",
    title: "Coussins d'Architecte & Linge de Maison Textile Wax",
    universeSlug: "rosbri-design",
    universeName: "Rosbri Wax Design",
    accentColor: "#E68AB3",
    shortDescription: "Éléments textiles d'ameublement contemporain : coussins géométriques, chemins de table et tentures pour intérieurs soignés.",
    deliverables: ["Ensemble coordonné de pièces textiles d'atelier", "Finitions soignées confectionnées à la main"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Forfait d'Atelier"
  },

  // --- UNIVERS 04 : ADP BRIEF ---
  {
    id: "srv-brief-cctp",
    slug: "redaction-cctp-tce",
    title: "Cahier de Prescriptions Techniques d'Atelier (CCTP)",
    universeSlug: "adp-brief",
    universeName: "ADP Brief",
    accentColor: "#B1CE9A",
    shortDescription: "Description méthodique des exigences techniques et matériaux recommandés pour la consultation d'entreprises.",
    deliverables: ["Cahier de prescriptions d'atelier", "Références techniques et normes applicables"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé"
  },
  {
    id: "srv-brief-dpgf",
    slug: "cadre-bordereau-dpgf-dqe",
    title: "Cadre de Bordereau Quantitatif & Estimatif (DPGF / DQE)",
    universeSlug: "adp-brief",
    universeName: "ADP Brief",
    accentColor: "#B1CE9A",
    shortDescription: "Décomposition structurée des ouvrages avec formules de métrés vérifiées, prête pour la consultation des intervenants.",
    deliverables: ["Cadre de métrés formulé", "Bordereau descriptif des prestations", "Synthèse estimative prévisionnelle"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé"
  },

  // --- UNIVERS 05 : ADP LAB ---
  {
    id: "srv-lab-btc",
    slug: "etude-materiaux-locaux-btc",
    title: "Étude Constructive Terre Crue & Matériaux Locaux",
    universeSlug: "adp-lab",
    universeName: "ADP Lab",
    accentColor: "#B8A0F4",
    shortDescription: "Conseils techniques sur l'intégration de la terre stabilisée (BTC), de la pierre et des matériaux biosourcés adaptés au climat tropical.",
    deliverables: ["Fiche de recommandations techniques", "Détails constructifs d'assemblage d'atelier", "Principes d'isolation et d'inertie"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Sur Devis Personnalisé"
  },

  // --- UNIVERS 06 : ADP ACADEMY ---
  {
    id: "srv-acad-revit",
    slug: "formation-revit-architecture-bim",
    title: "Accompagnement & Formation Autodesk Revit",
    universeSlug: "adp-academy",
    universeName: "ADP Academy",
    accentColor: "#E8C56F",
    shortDescription: "Formation professionnelle axée sur la modélisation spatiale, les composants paramétriques et la mise en page d'atelier.",
    deliverables: ["Parcours d'apprentissage pratique", "Gabarits et ressources pédagogiques d'atelier", "Attestation de participation ADP"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Forfait d'Atelier"
  },

  // --- UNIVERS 07 : ADP TOOLS ---
  {
    id: "srv-tools-pack",
    slug: "pack-familles-revit-claustras-afrique",
    title: "Composants Paramétriques & Claustras Tropicaux",
    universeSlug: "adp-tools",
    universeName: "ADP Tools",
    accentColor: "#7BDED8",
    shortDescription: "Bibliothèque de composants 3D paramétriques (persiennes, claustras, moucharabiehs) conçus pour l'architecture tropicale.",
    deliverables: ["Bibliothèque de familles numériques paramétriques", "Documentation technique illustrée"],
    typicalDuration: "Sur étude d'atelier",
    pricingModel: "Pack Clé en Main"
  }
];
