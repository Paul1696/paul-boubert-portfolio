import { FeaturedProject } from "@/types/possibility-machine";

export type ProjectStatus = "Réalisé" | "En cours" | "Prototype" | "Concept" | "Recherche" | "Réalisé/livré" | "Suspendu/abandonné" | "En chantier" | "Inconnu";

export type InterventionType =
  | "Architecture & Construction"
  | "BIM & Documentation Technique"
  | "Design Intérieur & Mobilier"
  | "Développement Numérique & Outils"
  | "Recherche & Publications";

export interface ArchitecturalProject extends FeaturedProject {
  slug: string;
  mediaFolder: string;
  typology: "Tertiaire" | "Résidentiel" | "Hôtellerie" | "Commerce" | "Équipement";
  surface?: string;
  missionType?: string;
  bioclimaticHighlights?: string[];
  bimLOD?: string;
  // Métadonnées professionnelles enrichies (Refonte Portfolio Paul Boubert)
  status?: ProjectStatus;
  interventionType?: InterventionType;
  responsibleEntity?: string;
  paulRole?: string;
  toolsUsed?: string[];
  projectType?: "architecture" | "digital" | "design";
  featuredEditorial?: boolean;
  programme?: string;
  particularities?: string[];
  documentarySource?: string;
  credits?: string;
}

export const ALL_PROJECTS: ArchitecturalProject[] = [
  {
    "id": "proj-018-studio",
    "slug": "018-studio",
    "mediaFolder": "018_studio",
    "title": "Studio Graphite",
    "subtitle": "Habitat modulaire en conteneurs maritimes",
    "category": "RÉSIDENTIEL & HABITAT",
    "typology": "Résidentiel",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Studio Graphite à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-bahemeck",
    "slug": "bahemeck",
    "mediaFolder": "bahemeck_final",
    "title": "Appartement Bonanjo",
    "subtitle": "Habiter autour d'un cœur paysager",
    "category": "ARCHITECTURE RÉSIDENTIELLE",
    "typology": "Résidentiel",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "Janvier–septembre 2023",
    "specs": "Études ESQ, APS, APD, permis et DQE • Projet suspendu",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Terrain 1 500 m² • 3 bâtiments R+1 • 10 appartements",
    "missionType": "Conception architecturale, BIM, dossier de permis et DQE",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-bicec-bafoussam",
    "slug": "bicec-bafoussam",
    "mediaFolder": "bicec_bafoussam",
    "title": "BICEC Bafoussam",
    "subtitle": "Réhabilitation et modernisation d'une agence bancaire",
    "category": "ARCHITECTURE BANCAIRE & INSTITUTIONNELLE",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Bafoussam, Cameroun",
    "year": "2023–2026",
    "specs": "Réhabilitation en site occupé • Projet livré",
    "accentColor": "#7DB9DC",
    "symbol": "■",
    "missionType": "Développement architectural, coordination technique et suivi de chantier",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Réhabilitation et modernisation d'une agence BICEC à Bafoussam, réalisée au sein de BARLABARLA Architectes et menée jusqu'à la levée des réserves de réception.",
    "badge": "Projet livré — réserves levées",
    "isVerifiedLegacy": true,
    "status": "Réalisé",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "BARLABARLA Architectes",
    "paulRole": "Développement architectural, études, coordination technique et suivi de chantier",
    "toolsUsed": ["Revit", "Enscape", "Excel", "Word"],
    "projectType": "architecture"
  },
  {
    "id": "proj-bicec-usca",
    "slug": "bicec-usca",
    "mediaFolder": "bicec_usca",
    "title": "BICEC USCA",
    "subtitle": "Élégance intemporelle",
    "category": "ARCHITECTURE INTÉRIEURE / RÉSIDENTIEL",
    "typology": "Résidentiel",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Étude APS validée • Réalisation non confirmée",
    "accentColor": "#7DB9DC",
    "symbol": "●",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Conception des aménagements, mobilier sur mesure et visualisations 3D",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "BICEC USCA à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-boj",
    "slug": "boj",
    "mediaFolder": "boj",
    "title": "Le Bojolais",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◈",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Le Bojolais à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-boutique-biyem-assi",
    "slug": "boutique-biyem-assi",
    "mediaFolder": "boutique_biyem_assi",
    "title": "Boutique Biyem",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Yaoundé, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◇",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Boutique Biyem-Assi à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-bureau-dsi",
    "slug": "bureau-dsi",
    "mediaFolder": "bureau_dsi",
    "title": "Bureaux DSI",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◎",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Bureaux DSI à Douala — aménagement et design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-cabinet-elena",
    "slug": "cabinet-elena",
    "mediaFolder": "cabinet_elena",
    "title": "Cabinet Dentaire Elena",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Cabinet Dentaire Elena à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-croissanterie",
    "slug": "croissanterie",
    "mediaFolder": "croissanterie",
    "title": "La Croissanterie",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "La Croissanterie à Douala — aménagement et design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-duplex-domegne",
    "slug": "duplex-domegne",
    "mediaFolder": "duplex_domegne",
    "title": "Duplex Domegne",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2022",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "■",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Design et aménagement intérieur d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-emeraude",
    "slug": "emeraude",
    "mediaFolder": "emeraude",
    "title": "Villa Emeraude",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2021",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "●",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Villa Emeraude à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-enem",
    "slug": "enem",
    "mediaFolder": "enem",
    "title": "Concession Enem",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◈",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Concession Enem à Douala — aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-entrepot",
    "slug": "entrepot",
    "mediaFolder": "entrepot",
    "title": "Entrepôt Logistique",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2024",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◇",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Entrepôt logistique à Douala — aménagement fonctionnel et optimisation des flux d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-grill-way",
    "slug": "grill-way",
    "mediaFolder": "grill_way",
    "title": "Grill Way",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2024",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◎",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Grill Way à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-harmony",
    "slug": "harmony",
    "mediaFolder": "harmony",
    "title": "Villa Harmony",
    "subtitle": "Transformer l'existant",
    "category": "RÉAMÉNAGEMENT ARCHITECTURAL",
    "typology": "Résidentiel",
    "universeSlug": "adp-project",
    "location": "Édéa, Cameroun",
    "year": "Septembre–décembre 2024",
    "specs": "Villa de plain-pied • Gros œuvre réalisé, finitions inachevées",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "missionType": "Relevé architectural, études APS/APD, BIM, permis et DQE",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Réaménagement architectural d'une villa de plain-pied dont le gros œuvre était réalisé mais dont les finitions restaient à achever. Le projet repense la distribution intérieure et crée une chambre supplémentaire sans extension majeure.",
    "badge": "Études achevées — permis non déposé",
    "isVerifiedLegacy": true,
    "status": "Concept",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "Mission personnelle pour un client privé",
    "paulRole": "Relevé architectural, conception, études APS/APD, BIM, dossier de permis et DQE",
    "toolsUsed": ["Revit", "Enscape", "Excel", "Word", "PowerPoint"],
    "projectType": "architecture"
  },
  {
    "id": "proj-horizon",
    "slug": "horizon",
    "mediaFolder": "horizon",
    "title": "Villa Horizon",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Villa Horizon à Douala — étude préliminaire d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-hotel-bertoua",
    "slug": "hotel-bertoua",
    "mediaFolder": "hotel_bertoua",
    "title": "Hôtel de Bertoua",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Bertoua, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "■",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Hôtel de Bertoua — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-hunter",
    "slug": "hunter",
    "mediaFolder": "hunter",
    "title": "Résidence Hunter",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Bonapriso, Douala — Cameroun",
    "year": "2024",
    "specs": "Deux appartements T2 • Conteneurs maritimes 40 pieds • R+1",
    "accentColor": "#7DB9DC",
    "symbol": "●",
    "surface": "Environ 55 m² par logement, terrasses comprises",
    "missionType": "Conception principale, études et coordination",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Double toiture ventilée et dispositifs favorisant la circulation naturelle de l'air",
      "Claustras en bois et surélévation sur plots en béton",
      "Isolation intérieure à base de sciure récupérée et habillage en contreplaqué"
    ],
    "excerpt": "Projet résidentiel modulaire conçu pour accueillir deux appartements T2 destinés à la location meublée. La réalisation transforme deux conteneurs de 40 pieds superposés en un bâtiment R+1 à Bonapriso.",
    "badge": "Réalisé — décembre 2024",
    "isVerifiedLegacy": true,
    "status": "Réalisé",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "BARLABARLA Architectes",
    "paulRole": "Conception principale, études et coordination — au sein du cabinet",
    "toolsUsed": ["Revit", "Enscape", "Excel"],
    "projectType": "architecture",
    "featuredEditorial": true
  },
  {
    "id": "proj-lipem",
    "slug": "lipem",
    "mediaFolder": "lipem",
    "title": "Résidence Lipem",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2024",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◈",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Résidence Lipem — aménagement et design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-mandeng",
    "slug": "mandeng",
    "mediaFolder": "mandeng",
    "title": "Villa Mandeng",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◇",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Villa Mandeng à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-mbella",
    "slug": "mbella",
    "mediaFolder": "mbella",
    "title": "Résidence Mbella",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◎",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Résidence Mbella — conception des espaces intérieurs et coordination de chantier à Douala, Cameroun. Une réalisation ADP Ateliers de Paul en design résidentiel.",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-meeting-room",
    "slug": "meeting-room",
    "mediaFolder": "meeting_room",
    "title": "Meeting Room Corporate",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Meeting Room Corporate à Douala — aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-mme-edzigui",
    "slug": "mme-edzigui",
    "mediaFolder": "mme_edzigui",
    "title": "Résidence Mme Edzigui",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2021",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Résidence Mme Edzigui à Douala — aménagement intérieur sur-mesure, optimisation des volumes et suivi de travaux. Réalisation ADP Ateliers de Paul, Cameroun.",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-oasis",
    "slug": "oasis",
    "mediaFolder": "oasis",
    "title": "Résidence Oasis",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Kribi, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "■",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Implantation des trois bâtiments autour d'un cœur paysager",
      "Dispositifs de confort bioclimatique étudiés pour le climat de Kribi",
      "Piscine, stationnement central et espaces extérieurs intégrés au parti d'ensemble"
    ],
    "excerpt": "Ensemble résidentiel de dix appartements répartis dans trois bâtiments R+1, implantés autour d'un cœur d'îlot paysager à Kribi. Les études ont été menées jusqu'au dossier de permis de construire et au DQE avant suspension pour raisons financières.",
    "badge": "Études achevées — projet suspendu",
    "isVerifiedLegacy": true,
    "status": "Concept",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "Mission personnelle pour un maître d'ouvrage privé",
    "paulRole": "Conception architecturale, études APS/APD, modélisation BIM, dossier de permis et DQE",
    "toolsUsed": ["Revit", "Enscape", "Excel", "PowerPoint", "Word"],
    "projectType": "architecture"
  },
  {
    "id": "proj-owona",
    "slug": "owona",
    "mediaFolder": "owona",
    "title": "Villa M. Owona",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "●",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Villa M. Owona à Douala — accompagnement en design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-perenco-offices",
    "slug": "perenco-offices",
    "mediaFolder": "perenco_offices",
    "title": "Bureaux Perenco",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◈",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Bureaux Perenco-Petrofor à Douala — design et aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-petrofor-base",
    "slug": "petrofor-base",
    "mediaFolder": "petrofor_base_tcp",
    "title": "Base Industrielle Petrofor",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2023",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◇",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Base industrielle Petrofor à Douala — aménagement et coordination d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-pharmacie-studio",
    "slug": "pharmacie-studio",
    "mediaFolder": "pharmacie_studio",
    "title": "Pharmacie & Studio",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◎",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Pharmacie & Studio à Douala — aménagement mixte espace pharmaceutique et studio. Design intérieur, optimisation des zones et coordination des travaux par ADP Ateliers de Paul.",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-residence-h",
    "slug": "residence-h",
    "mediaFolder": "residence_h",
    "title": "Résidence H",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Yaoundé, Cameroun",
    "year": "2025",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Étude de rénovation intérieure d'un duplex haut de gamme à Yaoundé, développée en collaboration avec une designeuse d'intérieur.",
    "badge": "Étude APS validée",
    "isVerifiedLegacy": true,
    "status": "Concept",
    "interventionType": "Design Intérieur & Mobilier",
    "responsibleEntity": "Collaboration avec une designeuse d'intérieur",
    "paulRole": "Conception des aménagements, mobilier sur mesure et visualisations 3D",
    "toolsUsed": ["Revit", "Enscape", "PowerPoint"],
    "projectType": "architecture"
  },
  {
    "id": "proj-residence-soa",
    "slug": "residence-soa",
    "mediaFolder": "residence_soa",
    "title": "Résidence Universitaire SOA",
    "subtitle": "L'agilité modulaire",
    "category": "TERTIAIRE & BUREAUX",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Résidence Universitaire SOA — design fonctionnel d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-salle-de-fete",
    "slug": "salle-de-fete",
    "mediaFolder": "salle_de_fete",
    "title": "Salle de Fêtes & Événements",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Bonanjo, Douala, Cameroun",
    "year": "Juin 2024",
    "specs": "Projet personnel • Étude architecturale non réalisée",
    "accentColor": "#7DB9DC",
    "symbol": "■",
    "missionType": "Conception architecturale, études et visualisations 3D",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Salle de fêtes & événements à Douala — aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-sequoia",
    "slug": "sequoia",
    "mediaFolder": "sequoia",
    "title": "Duplex Séquoia",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "●",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Duplex Séquoia à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-showroom-kotto",
    "slug": "showroom-kotto",
    "mediaFolder": "showroom_kotto",
    "title": "Showroom Kotto",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◈",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Showroom Kotto à Douala — conception et aménagement d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-suka-cafe",
    "slug": "suka-cafe",
    "mediaFolder": "suka_cafe",
    "title": "SUKA Café Terrasse",
    "subtitle": "Un écrin tribal au cœur du dynamisme urbain de Douala.",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◇",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "SUKA Café Terrasse à Douala — design d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-tonye",
    "slug": "tonye",
    "mediaFolder": "tonye",
    "title": "Immeuble Tonye",
    "subtitle": "Densifier la ville",
    "category": "ARCHITECTURE RÉSIDENTIELLE",
    "typology": "Résidentiel",
    "universeSlug": "adp-project",
    "location": "Bonapriso, Douala, Cameroun",
    "year": "2022 — provisoire",
    "specs": "Immeuble résidentiel R+5 • Études APD et permis déposé",
    "accentColor": "#7DB9DC",
    "symbol": "◎",
    "surface": "Emprise annoncée : 108 m²",
    "missionType": "Participation à la conception, développement APD, permis et consultation",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Immeuble résidentiel R+5 conçu sur une parcelle contrainte, avec trois appartements T3 et un duplex aux deux derniers niveaux. La façade à double peau pixelisée filtre le rayonnement solaire et préserve l'intimité des logements.",
    "badge": "Études APD achevées — consultation suspendue",
    "isVerifiedLegacy": true,
    "status": "Concept",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "BARLABARLA Architectes",
    "paulRole": "Participation à la conception, développement APD, dossier de permis, modélisation BIM, détails architecturaux, consultation et analyse des offres",
    "toolsUsed": ["Revit", "Enscape", "Excel", "Word"],
    "projectType": "architecture"
  },
  {
    "id": "proj-web-tower",
    "slug": "web-tower",
    "mediaFolder": "web_tower",
    "title": "D",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2026",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "▲",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "D-Web Holding Tower à Douala — design et optimisation des espaces d",
    "badge": "Référence Certifiée Legacy",
    "isVerifiedLegacy": true
  },
  {
    "id": "proj-workbox",
    "slug": "workbox",
    "mediaFolder": "workbox",
    "title": "Workbox",
    "subtitle": "Conception & Réalisation Architecturale",
    "category": "Tertiaire / Architecture",
    "typology": "Tertiaire",
    "universeSlug": "adp-project",
    "location": "Douala, Cameroun",
    "year": "2024",
    "specs": "Tertiaire • Maîtrise d'œuvre & Modélisation",
    "accentColor": "#7DB9DC",
    "symbol": "◆",
    "surface": "Surface d'étude adaptée au programme",
    "missionType": "Assistance Maîtrise d'Œuvre & Coordination BIM",
    "bimLOD": "LOD 300",
    "bioclimaticHighlights": [
      "Optimisation de la ventilation naturelle et du confort hygrothermique tropical",
      "Protection solaire passive par casquettes et brise-soleil adaptés",
      "Mise en œuvre prioritaire de matériaux locaux et durables"
    ],
    "excerpt": "Proposition personnelle de bureaux modulaires en conteneurs maritimes, développée pour une consultation relayée par un intermédiaire agissant comme AMO. Aucune réponse connue n'a été reçue.",
    "badge": "Étude non réalisée",
    "isVerifiedLegacy": true,
    "status": "Concept",
    "interventionType": "Architecture & Construction",
    "responsibleEntity": "Projet personnel — Paul Boubert",
    "paulRole": "Conception architecturale, études et visualisations 3D",
    "toolsUsed": ["Revit", "Enscape", "Excel"],
    "projectType": "architecture"
  }
];

/**
 * PROJETS NUMÉRIQUES & CRÉATIFS PERSONNELS (SECTION 08)
 * Distincts des références architecturales d'agences, avec statuts vérifiés.
 */
const DOCUMENTARY_OVERRIDES: Record<string, Partial<ArchitecturalProject>> = {
  "018-studio": { year: "2024", location: "Logpom, Douala", responsibleEntity: "Personnel", status: "Réalisé/livré", paulRole: "Contribution principale : conception, BIM/3D, plans EXE, APS/APD, rendus, DQE/DCE", programme: "Studio résidentiel compact : séjour, coin nuit, espace de travail et rangements.", particularities: ["Optimisation de l’espace", "Mobilier intégré", "Palette bleue et éclairage indirect"], credits: "Projet personnel de Paul Boubert" },
  "bahemeck": { year: "2025", location: "Bonanjo, Douala", responsibleEntity: "BARLABARLA", status: "Réalisé/livré", paulRole: "Contribution principale : conception, BIM/3D, études et livrables", programme: "Aménagement intérieur résidentiel avec séjour, salle à manger et sanitaires visibles.", particularities: ["Moulures", "Éclairage indirect", "Revêtements effet bois et finitions décoratives"], credits: "BARLABARLA Architectes" },
  "bicec-usca": { year: "2023", location: "Bonapriso, Douala", responsibleEntity: "BARLABARLA", status: "Réalisé/livré", paulRole: "Contribution principale : conception, APS/APD, rendus, DQE/DCE, coordination et réception", programme: "Réhabilitation et aménagement d’espaces professionnels bancaires.", particularities: ["Espaces d’accueil et de travail à vérifier", "Traitement des accès", "Aménagement intérieur"], credits: "BARLABARLA Architectes" },
  "boj": { year: "2023", location: "Bonanjo, Douala", responsibleEntity: "BARLABARLA", status: "Réalisé/livré", paulRole: "Contribution secondaire : conception, BIM/3D, études, rendus, suivi et coordination", programme: "Rénovation du restaurant Le Bojolais avec bar, restauration, lounge et espace de représentation selon la documentation disponible.", particularities: ["Recomposition de façade", "Parements minéraux", "Tons terracotta", "Claustras métalliques"], documentarySource: "Portfolio 2025, PDF p. 20", credits: "BARLABARLA Architectes" },
  "boutique-biyem-assi": { year: "2020", location: "Biyem-Assi, Yaoundé", responsibleEntity: "Autre cabinet", status: "Inconnu", paulRole: "Contribution secondaire : APS/APD, BIM/3D, conception et rendus", programme: "Bâtiment à vocation commerciale avec vitrines et circulations verticales apparentes.", particularities: ["Composition d’angle", "Lames horizontales", "Façades vitrées" ] },
  "bureau-dsi": { year: "2024", location: "Limbé", responsibleEntity: "Personnel", status: "Réalisé/livré", paulRole: "Contribution principale : conception, APS/APD, rendus, BIM/3D, plans EXE et DQE/DCE", programme: "Aménagement de bureau professionnel avec poste principal et sièges visiteurs.", particularities: ["Bois clair", "Plafond lumineux", "Mur décoratif bleu", "Mobilier intégré"] },
  "cabinet-elena": { year: "2024", location: "Douala", responsibleEntity: "Personnel", status: "Inconnu", paulRole: "Contribution principale : conception, APS/APD, rendus et BIM/3D", programme: "Cabinet dentaire avec salle de soins et espace d’attente visibles.", particularities: ["Mobilier clinique vert et blanc", "Rangements intégrés", "Salle d’attente contrastée"] },
  "croissanterie": { year: "2020", location: "Bonapriso, Douala", responsibleEntity: "Autre cabinet", status: "Suspendu/abandonné", paulRole: "Contribution secondaire : APS/APD, conception, BIM/3D et rendus", programme: "Programme commercial ou de restauration à confirmer.", particularities: ["Façade vitrée", "Bandeaux clairs et jaunes", "Stationnement extérieur"], credits: "Correspondance des médias à vérifier" },
  "duplex-domegne": { year: "2022", location: "Yaoundé", responsibleEntity: "Collaboration", status: "Réalisé/livré", paulRole: "Contribution secondaire : APS/APD, conception, BIM/3D, rendus et plans EXE", programme: "Habitation individuelle de type duplex.", particularities: ["Volumes décalés", "Parements", "Façades gris-violet", "Implantation en pente à confirmer"] },
  "emeraude": { year: "2021", location: "Yaoundé", responsibleEntity: "Autre cabinet", status: "Réalisé/livré", paulRole: "Contribution secondaire : APS/APD, conception, BIM/3D et rendus", programme: "Résidence individuelle avec terrasse couverte et espace de détente extérieur.", particularities: ["Sous-face bois", "Garde-corps vitrés", "Jardinières", "Continuité intérieur/extérieur"] },
  "enem": { year: "2022", location: "Bonaberi, Douala", responsibleEntity: "BARLABARLA", status: "Suspendu/abandonné", paulRole: "Contribution principale : conception, APS/APD, rendus et BIM/3D", programme: "Concession ENEM/SITRAK avec showroom, ateliers, stockage, administration, cantine et équipements annexes.", particularities: ["Showroom annoncé à 580 m² dans le PDF", "Façade vitrée", "Volume d’exposition", "Accès industriels"], documentarySource: "Portfolio 2025, PDF pp. 22–23", credits: "BARLABARLA Architectes / ENEM Cameroun / SITRAK" },
  "entrepot": { year: "2024", location: "Édéa", responsibleEntity: "Personnel", status: "Suspendu/abandonné", paulRole: "Contribution principale : APS/APD, rendus, BIM/3D et conception", programme: "Programme logistique non vérifiable à partir des médias associés.", particularities: ["Correspondance des médias à vérifier"], credits: "Ne pas présenter les visuels comme ceux d’un entrepôt sans validation" },
  "grill-way": { year: "2024", location: "Douala", responsibleEntity: "Personnel", status: "Réalisé/livré", paulRole: "Contribution principale : APS/APD, conception et rendus", programme: "Aménagement de restauration semi-ouvert avec assises et jardin.", particularities: ["Structure légère", "Bois", "Banquettes", "Végétation et cheminements extérieurs"] },
  "horizon": { year: "2021", location: "Yaoundé", responsibleEntity: "Collaboration", status: "Réalisé/livré", paulRole: "Contribution secondaire : conception, APS/APD, rendus et BIM/3D", programme: "Villa individuelle apparemment R+1 avec cour et stationnement.", particularities: ["Toitures inclinées", "Porche à colonnes", "Balcons", "Accents jaunes"] },
  "hotel-bertoua": { year: "2020", location: "Bertoua", responsibleEntity: "Autre cabinet", status: "Inconnu", paulRole: "Contribution secondaire : APS/APD", programme: "Complexe hôtelier de plusieurs volumes bas avec espaces extérieurs.", particularities: ["Implantation pavillonnaire", "Toitures rouges", "Piscine apparente", "Espaces paysagers"] },
  "lipem": { year: "2021", location: "Douala", responsibleEntity: "Autre cabinet", status: "En chantier", paulRole: "Contribution secondaire : conception, APS/APD, rendus et BIM/3D", programme: "Résidence individuelle à plusieurs volumes et espace extérieur aménagé.", particularities: ["Briques apparentes", "Toitures inclinées", "Balcon", "Terrasse couverte"] },
  "mandeng": { year: "2021", location: "Yaoundé", responsibleEntity: "Autre cabinet", status: "Inconnu", paulRole: "Contribution principale : conception, APS/APD, rendus et BIM/3D", programme: "Villa individuelle apparemment R+1 avec terrasses et cour.", particularities: ["Volumes horizontaux", "Débords", "Vitrages", "Accents bois"] },
  "mbella": { year: "2024", location: "Nfandena, Yaoundé", responsibleEntity: "BARLABARLA", status: "Suspendu/abandonné", paulRole: "Contribution principale : conception, BIM/3D, APS/APD et rendus", programme: "Immeuble résidentiel R+3 avec stationnement au rez-de-chaussée et logements aux niveaux supérieurs.", particularities: ["Noyau central", "Loggias et séjours traversants", "Parements bois", "Garde-corps vitrés"], documentarySource: "Portfolio 2025, PDF pp. 18–19", credits: "BARLABARLA Architectes" },
  "meeting-room": { year: "2024", location: "Limbé", responsibleEntity: "Personnel", status: "Inconnu", paulRole: "Contribution principale : conception, BIM/3D, APS/APD, rendus et aménagement intérieur", programme: "Salle de réunion/formation avec tables, assises et présentation audiovisuelle.", particularities: ["Plafond lumineux", "Moquette graphique bleue", "Panneaux bois", "Écran"] },
  "mme-edzigui": { year: "2021", location: "Yaoundé", responsibleEntity: "Autre cabinet", status: "Réalisé/livré", paulRole: "Contribution principale : conception, APS/APD, rendus, BIM/3D, DQE/DCE et plans EXE", programme: "Maison individuelle apparemment de plain-pied avec terrasse et jardin.", particularities: ["Toiture à plusieurs pans", "Parements pierre", "Porche", "Cheminements"] },
  "owona": { year: "2020", location: "Yaoundé", responsibleEntity: "Autre cabinet", status: "Inconnu", paulRole: "Contribution secondaire : conception, APS/APD, rendus et BIM/3D", programme: "Villa individuelle apparemment R+1 avec terrasse à l’étage.", particularities: ["Balcon semi-circulaire", "Colonnes", "Vitrage d’angle", "Toiture inclinée"] },
  "perenco-offices": { year: "2022", location: "Douala", responsibleEntity: "BARLABARLA", status: "Réalisé/livré", paulRole: "Contribution principale : conception, APS/APD, rendus et BIM/3D", programme: "Aménagement d’une salle de réunion dans des bureaux d’entreprise.", particularities: ["Grande table", "Cloisons vitrées", "Mur à lames", "Éclairage intégré"], credits: "BARLABARLA Architectes / Perenco — confidentialité à vérifier" },
  "petrofor-base": { year: "2023", location: "Douala", responsibleEntity: "BARLABARLA", status: "Réalisé/livré", paulRole: "Contribution principale : conception, APS/APD, rendus, BIM/3D, plans EXE, DQE/DCE et aménagement intérieur", programme: "Installation industrielle avec plateforme, passerelles et accès techniques.", particularities: ["Charpente métallique bleue", "Bardage", "Garde-corps", "Équipement de levage visible"], credits: "BARLABARLA Architectes / Petrofor — données techniques à vérifier" },
  "pharmacie-studio": { year: "2022", location: "Yaoundé", responsibleEntity: "Collaboration", status: "Inconnu", paulRole: "Contribution secondaire : conception et APS/APD", programme: "Immeuble mixte avec commerce au rez-de-chaussée et logements/studios envisagés aux étages.", particularities: ["Façade vitrée", "Porte-à-faux", "Balcons", "Composition verticale compacte"] },
  "residence-soa": { year: "2025", location: "Yaoundé", responsibleEntity: "Collaboration", status: "Réalisé/livré", paulRole: "Contribution secondaire : conception, APS/APD, BIM/3D et rendus", programme: "Résidence collective destinée à l’hébergement étudiant.", particularities: ["Parcelle d’angle", "Façade régulière", "Accès clôturé", "Éléments terre cuite"] },
  "salle-de-fete": { year: "2024", location: "Édéa", responsibleEntity: "Personnel", status: "Suspendu/abandonné", paulRole: "Contribution principale : conception, BIM/3D, APS/APD et rendus", programme: "Équipement de réception et d’événements avec cour et accès clôturé.", particularities: ["Façade symétrique", "Portail", "Volumes à acrotère"] },
  "sequoia": { year: "2022", location: "Yaoundé", responsibleEntity: "Autre cabinet", status: "Réalisé/livré", paulRole: "Contribution principale : conception, rendus, APS/APD et BIM/3D", programme: "Villa individuelle de type duplex avec porche, terrasses et jardin.", particularities: ["Toiture à pans", "Arcades", "Parements gris", "Terrain apparemment dénivelé"] },
  "showroom-kotto": { year: "2024", location: "Douala", responsibleEntity: "Personnel", status: "Réalisé/livré", paulRole: "Contribution principale : APS/APD, conception, BIM/3D et rendus", programme: "Aménagement de boutique de vêtements et accessoires.", particularities: ["Portants", "Étagères", "Présentoir central", "Éclairage intégré", "Mobilier sur mesure"] },
  "suka-cafe": { year: "2026", location: "Douala", responsibleEntity: "Collaboration", status: "Suspendu/abandonné", paulRole: "Contribution principale : APS/APD, rendus, DQE/DCE, plans EXE, BIM/3D et conception", programme: "Café-restaurant avec terrasse, bar et espaces de consommation.", particularities: ["Banquettes", "Arches", "Éclairage chaud", "Végétation", "Pergola"] },
  "web-tower": { year: "2025", location: "Douala", responsibleEntity: "BARLABARLA", status: "Suspendu/abandonné", paulRole: "Contribution secondaire : conception, APS/APD, BIM/3D, rendus, DQE/DCE et plans EXE", programme: "Tour tertiaire avec espaces de bureaux et hall d’accueil.", particularities: ["Façade vitrée", "Socle", "Banque d’accueil", "Identité graphique bleue"], credits: "BARLABARLA Architectes" },
};

// Harmonisation éditoriale validée pour les cartes publiques.
const PUBLIC_EDITORIAL_OVERRIDES: Record<string, Partial<ArchitecturalProject>> = {
  "018-studio": { category: "Résidentiel", programme: "Studio résidentiel compact avec séjour, espace nuit, travail et rangements." },
  "bahemeck": { category: "Résidentiel", programme: "Aménagement intérieur résidentiel comprenant séjour, salle à manger et sanitaires." },
  "bicec-usca": { category: "Architecture bancaire", programme: "Réhabilitation et aménagement d’espaces professionnels bancaires." },
  "boj": { category: "Restauration & hôtellerie", programme: "Réhabilitation d’un restaurant intégrant bar, espaces de restauration et lounge." },
  "boutique-biyem-assi": { category: "Commerce & showroom", programme: "Bâtiment commercial avec vitrines et circulations verticales apparentes." },
  "bureau-dsi": { category: "Bureaux & espaces professionnels", programme: "Aménagement de bureaux professionnels avec postes de travail et espaces visiteurs." },
  "cabinet-elena": { category: "Santé", programme: "Cabinet dentaire comprenant une salle de soins et un espace d’attente." },
  "croissanterie": { category: "Restauration & hôtellerie", programme: "Projet commercial ou de restauration avec espace intérieur aménagé." },
  "duplex-domegne": { category: "Résidentiel", programme: "Habitation individuelle de type duplex avec espaces extérieurs aménagés." },
  "emeraude": { category: "Résidentiel", programme: "Résidence individuelle avec terrasse couverte et espace extérieur." },
  "enem": { category: "Architecture automobile", programme: "Ensemble automobile associant showroom, ateliers, stockage, administration et espaces annexes." },
  "entrepot": { category: "Industriel & logistique", programme: "Projet destiné à des fonctions logistiques et de stockage." },
  "grill-way": { category: "Restauration & hôtellerie", programme: "Aménagement d’un espace de restauration semi-ouvert avec assises et jardin." },
  "horizon": { category: "Résidentiel", programme: "Projet résidentiel individuel avec cour et espace de stationnement." },
  "hotel-bertoua": { category: "Restauration & hôtellerie", programme: "Complexe hôtelier composé de plusieurs volumes bas et d’espaces extérieurs." },
  "lipem": { category: "Résidentiel", programme: "Résidence individuelle composée de plusieurs volumes et d’un espace extérieur." },
  "mandeng": { category: "Résidentiel", programme: "Projet résidentiel individuel avec terrasses et cour." },
  "mbella": { category: "Résidentiel", programme: "Immeuble résidentiel R+3 avec stationnement au rez-de-chaussée et logements aux niveaux supérieurs." },
  "meeting-room": { category: "Bureaux & espaces professionnels", programme: "Salle de réunion ou de formation avec tables, assises et présentation audiovisuelle." },
  "mme-edzigui": { category: "Résidentiel", programme: "Maison individuelle avec terrasse et jardin." },
  "owona": { category: "Résidentiel", programme: "Projet résidentiel individuel avec terrasse et espace extérieur." },
  "perenco-offices": { category: "Bureaux & espaces professionnels", programme: "Aménagement d’espaces professionnels comprenant une salle de réunion." },
  "petrofor-base": { category: "Industriel & logistique", programme: "Installation industrielle comprenant plateformes métalliques, passerelles et accès techniques." },
  "pharmacie-studio": { category: "Programme mixte", programme: "Immeuble à programme mixte associant commerce au rez-de-chaussée et logements ou studios aux étages." },
  "residence-soa": { category: "Résidentiel", programme: "Résidence collective destinée à l’hébergement étudiant." },
  "salle-de-fete": { category: "Équipements & événements", programme: "Équipement de réception et d’événements avec cour et accès clôturé." },
  "sequoia": { category: "Résidentiel", programme: "Villa individuelle de type duplex avec porche, terrasses et jardin." },
  "showroom-kotto": { category: "Commerce & showroom", programme: "Aménagement d’une boutique de vêtements et accessoires." },
  "suka-cafe": { category: "Restauration & hôtellerie", programme: "Café-restaurant avec terrasse, bar et espaces de consommation." },
  "web-tower": { category: "Bureaux & espaces professionnels", programme: "Tour tertiaire comprenant des espaces de bureaux et un hall d’accueil." },
  "hunter": { category: "Résidentiel", programme: "Résidence individuelle développée autour d’espaces d’habitation et d’espaces extérieurs." },
  "residence-h": { category: "Résidentiel", programme: "Projet résidentiel individuel à expression néo-classique." },
  "oasis": { category: "Résidentiel", programme: "Projet résidentiel individuel avec espaces extérieurs aménagés." },
  "harmony": { category: "Résidentiel", programme: "Projet résidentiel individuel avec espaces extérieurs aménagés." },
  "tonye": { category: "Résidentiel", programme: "Projet résidentiel urbain comprenant plusieurs espaces d’habitation." },
  "workbox": { category: "Bureaux & espaces professionnels", programme: "Bâtiment modulaire destiné à accueillir un espace de travail et des fonctions associées." },
  "bicec-bafoussam": { category: "Architecture bancaire", programme: "Réhabilitation et modernisation d’une agence bancaire à Bafoussam." },
};

const PUBLIC_ARCHITECTURAL_TITLES: Record<string, string> = {
  "bicec-usca": "Agence Bancaire Moderne",
  "bureau-dsi": "Bureaux Contemporains",
  "boj": "Restaurant Urbain",
  "018-studio": "Studio Épure",
  "bahemeck": "Intérieur Signature",
  "duplex-domegne": "Villa des Volumes",
  "emeraude": "Villa Canopée",
  "horizon": "Villa Panorama",
  "lipem": "Résidence Terracotta",
  "mandeng": "Villa Géométrique",
  "mbella": "Résidence Verticale",
  "mme-edzigui": "Villa Héritage",
  "owona": "Villa des Courbes",
  "residence-soa": "Résidence Étudiante",
  "sequoia": "Villa Arcades",
  "enem": "Halle Automobile",
  "petrofor-base": "Pôle Industriel",
  "suka-cafe": "Café Terrasse",
  "web-tower": "Tour de Verre",
  "grill-way": "Restaurant Tropical",
  "showroom-kotto": "Showroom Élégance",
  "cabinet-elena": "Espace Dentaire",
  "hotel-bertoua": "Hôtel des Pavillons",
  "salle-de-fete": "Espace Cérémoniel",
  "perenco-offices": "Bureaux Prestige",
  "meeting-room": "Salle de Conférence",
  "pharmacie-studio": "Immeuble Mixte",
  "boutique-biyem-assi": "Boutique Design",
  "croissanterie": "La Croissanterie",
  "entrepot": "Halle Logistique",
  "hunter": "Résidence Hunter",
  "residence-h": "Résidence Néo-Classique",
  "oasis": "Résidence Tropicale",
  "harmony": "Villa Californienne",
  "tonye": "Résidence Urbaine",
  "workbox": "Atelier Modulaire",
  "bicec-bafoussam": "Agence Bancaire Régionale",
};

const PUBLIC_ARCHITECTURAL_SLUGS: Record<string, string> = {
  "bicec-usca": "agence-bancaire-moderne",
  "bureau-dsi": "bureaux-contemporains",
  "boj": "restaurant-urbain",
  "018-studio": "studio-epure",
  "bahemeck": "interieur-signature",
  "duplex-domegne": "villa-des-volumes",
  "emeraude": "villa-canopee",
  "horizon": "villa-panorama",
  "lipem": "residence-terracotta",
  "mandeng": "villa-geometrique",
  "mbella": "residence-verticale",
  "mme-edzigui": "villa-heritage",
  "owona": "villa-des-courbes",
  "residence-soa": "residence-etudiante",
  "sequoia": "villa-arcades",
  "enem": "halle-automobile",
  "petrofor-base": "pole-industriel",
  "suka-cafe": "cafe-terrasse",
  "web-tower": "tour-de-verre",
  "grill-way": "restaurant-tropical",
  "showroom-kotto": "showroom-elegance",
  "cabinet-elena": "espace-dentaire",
  "hotel-bertoua": "hotel-des-pavillons",
  "salle-de-fete": "espace-ceremoniel",
  "perenco-offices": "bureaux-prestige",
  "meeting-room": "salle-de-conference",
  "pharmacie-studio": "immeuble-mixte",
  "boutique-biyem-assi": "boutique-design",
  "croissanterie": "la-croissanterie",
  "entrepot": "halle-logistique",
  "hunter": "residence-hunter",
  "residence-h": "residence-neo-classique",
  "oasis": "residence-tropicale",
  "harmony": "villa-californienne",
  "tonye": "residence-urbaine",
  "workbox": "atelier-modulaire",
  "bicec-bafoussam": "agence-bancaire-regionale",
};

const ENRICHED_ARCHITECTURAL_PROJECTS = ALL_PROJECTS.map((project) => ({
  ...project,
  ...(DOCUMENTARY_OVERRIDES[project.slug] ?? {}),
  ...(PUBLIC_EDITORIAL_OVERRIDES[project.slug] ?? {}),
  ...(PUBLIC_ARCHITECTURAL_TITLES[project.slug] ? { title: PUBLIC_ARCHITECTURAL_TITLES[project.slug] } : {}),
  ...(PUBLIC_ARCHITECTURAL_SLUGS[project.slug] ? { slug: PUBLIC_ARCHITECTURAL_SLUGS[project.slug] } : {}),
}));

export const DIGITAL_CREATIVE_PROJECTS: ArchitecturalProject[] = [
  {
    id: "proj-adp-bim-architect",
    slug: "adp-bim-architect",
    mediaFolder: "tools",
    title: "ADP BIM ARCHITECT",
    subtitle: "Extension Native Multi-Hôtes Revit & SketchUp / Copilot IA",
    category: "Développement Numérique & BIM",
    typology: "Équipement",
    universeSlug: "adp-tools",
    location: "Douala & R&D Cloud",
    year: "2024-2026",
    specs: "Interopérabilité C# .NET 10 • Ruby API • Moteur Géométrique",
    accentColor: "#38BDF8",
    symbol: "⚙",
    surface: "Système logiciel distribué",
    missionType: "Architecture Logicielle & Ingénierie BIM Autonome",
    bimLOD: "LOD 400",
    bioclimaticHighlights: [
      "Extraction automatique des métrés et bilan carbone des matériaux",
      "Génération paramétrique des protections solaires et claustras",
      "Contrôle de conformité spatiale et détection d'interférences en temps réel"
    ],
    excerpt: "Suite logicielle native développée par Paul Boubert pour coordonner Revit, SketchUp et le desktop autour d'un modèle spatial unifié.",
    badge: "En cours de développement",
    isVerifiedLegacy: false,
    status: "En cours",
    interventionType: "Développement Numérique & Outils",
    responsibleEntity: "Paul Boubert / Les Ateliers de Paul R&D",
    paulRole: "Concepteur, Architecte Logiciel & Développeur Principal",
    toolsUsed: [".NET 10", "C#", "Revit API", "SketchUp Ruby API", "IPC", "BIM IFC"],
    projectType: "digital",
    featuredEditorial: true,
  },
  {
    id: "proj-adp-flow",
    slug: "adp-flow",
    mediaFolder: "brief",
    title: "ADP FLOW",
    subtitle: "Moteur de Cadrage Budgétaire & Chiffrage d'Atelier",
    category: "Développement Numérique & Outils",
    typology: "Tertiaire",
    universeSlug: "adp-brief",
    location: "Douala, Cameroun",
    year: "2023-2025",
    specs: "Application Desktop • Estimation CCTP • Matrice de Prix",
    accentColor: "#7DB9DC",
    symbol: "⚡",
    surface: "Application d'ingénierie financière",
    missionType: "Développement Produit & Méthodologie d'Atelier",
    bimLOD: "LOD 300",
    bioclimaticHighlights: [
      "Intégration des coefficients d'impact thermique dans les métrés",
      "Valorisation des circuits courts d'approvisionnement en matériaux",
      "Optimisation des coûts d'assemblage et de main-d'œuvre locale"
    ],
    excerpt: "Outil d'automatisation de devis et de gestion de la relation client pour les projets d'architecture et de design mobilier.",
    badge: "Version Stable 3.0",
    isVerifiedLegacy: false,
    status: "Réalisé",
    interventionType: "Développement Numérique & Outils",
    responsibleEntity: "Les Ateliers de Paul",
    paulRole: "Concepteur Système & Développeur",
    toolsUsed: ["Electron", "TypeScript", "Node.js", "Zustand", "SQLite"],
    projectType: "digital",
    featuredEditorial: false,
  },
  {
    id: "proj-adp-web-experience",
    slug: "adp-web-experience",
    mediaFolder: "project",
    title: "ADP Web Experience — The Possibility Machine",
    subtitle: "Plateforme Numérique Haute Fidélité & Monolithe Next.js 15",
    category: "Développement Numérique & Web",
    typology: "Tertiaire",
    universeSlug: "adp-studio",
    location: "Douala / Yaoundé",
    year: "2025-2026",
    specs: "Next.js 15 App Router • React 19 • Design System Minéral",
    accentColor: "#C59B53",
    symbol: "◈",
    surface: "Architecture web intégrale",
    missionType: "Direction Artistique, Architecture Front-End & Code",
    bimLOD: "LOD 300",
    bioclimaticHighlights: [
      "Éco-conception numérique et optimisation extrême des assets",
      "Génération statique SSG pour empreinte énergétique minimale",
      "Accessibilité WCAG 2.1 AA et adaptation aux préférences de mouvement"
    ],
    excerpt: "Monolithe Next.js 15 présentant l'écosystème créatif des Ateliers de Paul, son catalogue de 37 références et sa gouvernance de marque.",
    badge: "En Ligne v1.0",
    isVerifiedLegacy: false,
    status: "Réalisé",
    interventionType: "Développement Numérique & Outils",
    responsibleEntity: "Les Ateliers de Paul",
    paulRole: "Directeur de Création & Lead Développeur Front-End",
    toolsUsed: ["Next.js 15", "React 19", "TypeScript", "CSS Modules", "WASM SWC"],
    projectType: "digital",
    featuredEditorial: true,
  },
  {
    id: "proj-rosbri-wax-design",
    slug: "rosbri-wax-design",
    mediaFolder: "rosbri",
    title: "Rosbri Wax Design",
    subtitle: "Ligne de Mobilier Contemporain & Étoffes Africaines Sélectionnées",
    category: "Design Mobilier & Agencement",
    typology: "Commerce",
    universeSlug: "rosbri-design",
    location: "Douala & Ateliers d'Ébénisterie",
    year: "2022-2026",
    specs: "Essences de Bois Locales • Acier Thermo-laqué • Textiles Wax",
    accentColor: "#E68AB3",
    symbol: "✿",
    surface: "Pièces uniques & Séries limitées",
    missionType: "Design de Produit, Modélisation 3D & Suivi de Fabrication",
    bimLOD: "LOD 350",
    bioclimaticHighlights: [
      "Utilisation exclusive de bois issus de filières camerounaises responsables",
      "Finitions naturelles à base d'huiles végétales sans COV",
      "Assemblages traditionnels démontables et durables"
    ],
    excerpt: "Marque et collection de mobilier hybride créées par Paul Boubert, alliant lignes minimalistes et motifs textiles patrimoniaux.",
    badge: "Collection Active",
    isVerifiedLegacy: false,
    status: "Réalisé",
    interventionType: "Design Intérieur & Mobilier",
    responsibleEntity: "Les Ateliers de Paul / Rosbri",
    paulRole: "Designer Principal & Direction de Fabrication",
    toolsUsed: ["SketchUp Pro", "Lumion", "Plans d'Ébénisterie", "Prototypes"],
    projectType: "design",
    featuredEditorial: true,
  },
];

export const FULL_PORTFOLIO_REFERENCES: ArchitecturalProject[] = [
  ...ENRICHED_ARCHITECTURAL_PROJECTS,
  ...DIGITAL_CREATIVE_PROJECTS,
];

/**
 * Fonctions d'enrichissement dynamique garantissant le respect de la déontologie ONAC
 * et la rigueur des données pour chaque projet sans modifier l'intégrité du fichier original.
 */
export function getProjectStatus(project: ArchitecturalProject): ProjectStatus {
  if (project.status) return project.status;
  return "Réalisé";
}

export function getProjectIntervention(project: ArchitecturalProject): InterventionType {
  if (project.interventionType) return project.interventionType;
  const t = project.title.toLowerCase();
  if (t.includes("bicec") || t.includes("banque")) {
    return "BIM & Documentation Technique";
  }
  if (
    t.includes("boutique") ||
    t.includes("showroom") ||
    t.includes("café") ||
    t.includes("croissanterie") ||
    t.includes("grill")
  ) {
    return "Design Intérieur & Mobilier";
  }
  return "Architecture & Construction";
}

export function getProjectPaulRole(project: ArchitecturalProject): string {
  if (project.paulRole) return project.paulRole;
  const t = project.title.toLowerCase();
  if (t.includes("bicec") || t.includes("banque")) {
    return "Projeteur BIM & Synthèse d'Agencement (Au sein du cabinet partenaire)";
  }
  if (
    t.includes("appartement") ||
    t.includes("studio") ||
    t.includes("résidence") ||
    t.includes("duplex") ||
    t.includes("villa")
  ) {
    return "Concepteur Principal & Coordination Technique";
  }
  if (
    t.includes("boutique") ||
    t.includes("showroom") ||
    t.includes("café") ||
    t.includes("croissanterie")
  ) {
    return "Design d'Espace & Détails Menuiserie d'Atelier";
  }
  return "Assistance Maîtrise d'Œuvre & Modélisation BIM 3D";
}

export function getProjectResponsibleEntity(project: ArchitecturalProject): string {
  if (project.responsibleEntity) return project.responsibleEntity;
  const t = project.title.toLowerCase();
  if (t.includes("bicec") || t.includes("perenco") || t.includes("petrofor")) {
    return "Cabinet d'Architecture Mandataire & Maîtrise d'Œuvre";
  }
  return "Les Ateliers de Paul & Partenaires";
}

export function getProjectTools(project: ArchitecturalProject): string[] {
  if (project.toolsUsed && project.toolsUsed.length > 0) return project.toolsUsed;
  const t = project.title.toLowerCase();
  if (t.includes("bicec")) {
    return ["Autodesk Revit", "AutoCAD", "Normes Bancaires", "Synthèse"];
  }
  if (project.typology === "Résidentiel") {
    return ["Revit", "SketchUp Pro", "Lumion 12", "Détails Exécution"];
  }
  return ["Revit BIM", "AutoCAD", "SketchUp", "Lumion"];
}

