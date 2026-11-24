/**
 * ADP WEB EXPERIENCE — Catalogue Commercial ADP Studio 2026
 * Univers N° 3 : Design Graphique, Identité de Marque, Édition & Supports Connectés
 *
 * Règles déontologiques et commerciales :
 * - Aucune invention de prix arbitraire : mention rigoureuse "Sur étude d'atelier / Devis personnalisé".
 * - Aucune invention de délai non certifié : mention "Sur étude d'atelier" ou délais réels d'impression.
 * - Préservation intégrale des identifiants existants pour compatibilité devis et liens historiques.
 */

import {
  StudioFamily,
  StudioSubCategory,
  StudioProduct,
} from "@/types/studio-catalog";

export const STUDIO_FAMILIES: StudioFamily[] = [
  {
    id: "cartes-visite",
    slug: "cartes-de-visite-et-identifiants-connectes",
    name: "Cartes d'Affaires & Connectées",
    shortDescription: "Papeterie de prestige, cartes d'affaires physiques haut de gamme et cartes numériques hybrides QR ADP Digital Cards.",
    icon: "📇",
    accentColor: "#C59B53",
    subCategoryIds: ["sub-cartes-prestige", "sub-cartes-digitales", "sub-badges-pvc"],
  },
  {
    id: "identite-visuelle",
    slug: "identite-visuelle-et-image-de-marque",
    name: "Identité Visuelle & Branding",
    shortDescription: "Logotypes vectoriels d'autorité, chartes graphiques complètes, brand books et identités de programmes immobiliers.",
    icon: "✒️",
    accentColor: "#F3A66D",
    subCategoryIds: ["sub-logotype", "sub-charte-graphique", "sub-programme-immo"],
  },
  {
    id: "supports-edition",
    slug: "supports-d-edition-et-print-prestige",
    name: "Édition & Print de Prestige",
    shortDescription: "Plaquettes commerciales, brochures d'exception, rapports d'investissement et papeterie d'affaires coordonnée.",
    icon: "📑",
    accentColor: "#C59B53",
    subCategoryIds: ["sub-plaquettes", "sub-rapports", "sub-papeterie"],
  },
  {
    id: "signaletique",
    slug: "signaletique-spatiale-et-habillage-architectural",
    name: "Signalétique & Habillage Spatial",
    shortDescription: "Systèmes d'orientation, totems d'accueil, plaques professionnelles gravées et lettrages 3D en matériaux nobles.",
    icon: "🏢",
    accentColor: "#7DB9DC",
    subCategoryIds: ["sub-plaques", "sub-totems-lettrages", "sub-fresques-murales"],
  },
  {
    id: "textile-image",
    slug: "textiles-et-objets-d-image-professionnelle",
    name: "Textiles d'Image & Merchandising",
    shortDescription: "Vêtements d'image, polos d'entreprise brodés, tabliers professionnels confectionnés en synergie avec nos ateliers.",
    icon: "👕",
    accentColor: "#E68AB3",
    subCategoryIds: ["sub-polos-chemises", "sub-tabliers-pro"],
  },
  {
    id: "infographie-immobiliere",
    slug: "infographie-et-plans-commerciaux-immobiliers",
    name: "Infographie & Plans Commerciaux",
    shortDescription: "Plans de vente stylisés 2D/3D, axonométries décorées et dossiers de commercialisation pour promoteurs.",
    icon: "📐",
    accentColor: "#B1CE9A",
    subCategoryIds: ["sub-plans-vente", "sub-dossiers-commercialisation"],
  },
];

export const STUDIO_SUBCATEGORIES: StudioSubCategory[] = [
  // Cartes
  {
    id: "sub-cartes-prestige",
    slug: "cartes-prestige-papier-d-art",
    name: "Cartes de Visite Prestige",
    familyId: "cartes-visite",
    description: "Cartes imprimées sur papiers d'art épais, texturés et finitions de luxe.",
  },
  {
    id: "sub-cartes-digitales",
    slug: "cartes-connectees-adp-digital",
    name: "Cartes Hybrides ADP Digital Cards",
    familyId: "cartes-visite",
    description: "Le pont parfait entre la carte physique d'exception et le profil numérique QR certifié BAT.",
  },
  {
    id: "sub-badges-pvc",
    slug: "badges-et-cartes-pvc",
    name: "Badges & Cartes PVC Rigides",
    familyId: "cartes-visite",
    description: "Cartes rigides durables pour membres, résidences et accès corporate.",
  },

  // Identité
  {
    id: "sub-logotype",
    slug: "creation-logotype-maitre",
    name: "Logotype & Emblème Vectoriel",
    familyId: "identite-visuelle",
    description: "Conception sur-mesure de la signature graphique essentielle de l'entreprise.",
  },
  {
    id: "sub-charte-graphique",
    slug: "charte-graphique-brand-book",
    name: "Chartes Graphiques & Normes",
    familyId: "identite-visuelle",
    description: "Règles d'utilisation, gammes typographiques, palettes chromatiques et livrables vectoriels.",
  },
  {
    id: "sub-programme-immo",
    slug: "branding-programmes-immobiliers",
    name: "Branding de Programmes Immobiliers",
    familyId: "identite-visuelle",
    description: "Identités d'exception pour résidences, tours d'affaires et lotissements de standing.",
  },

  // Édition
  {
    id: "sub-plaquettes",
    slug: "plaquettes-commerciales-et-brochures",
    name: "Plaquettes & Brochures Commerciales",
    familyId: "supports-edition",
    description: "Documents de présentation commerciale conçus pour convaincre acquéreurs et partenaires.",
  },
  {
    id: "sub-rapports",
    slug: "rapports-annuels-et-dossiers-investisseurs",
    name: "Rapports Annuels & Dossiers d'Investissement",
    familyId: "supports-edition",
    description: "Édition corporate grand format pour assemblées générales et levées de fonds.",
  },
  {
    id: "sub-papeterie",
    slug: "papeterie-d-affaires-coordonnee",
    name: "Papeterie d'Affaires Coordonnée",
    familyId: "supports-edition",
    description: "Têtes de lettre filigranées, chemises à rabat, enveloppes imprimées et blocs-notes.",
  },

  // Signalétique
  {
    id: "sub-plaques",
    slug: "plaques-professionnelles-et-reperage",
    name: "Plaques Professionnelles & Repérage",
    familyId: "signaletique",
    description: "Plaques de façade, signalétique d'étage et repérage de bureaux en laiton, alu ou plexiglas.",
  },
  {
    id: "sub-totems-lettrages",
    slug: "totems-d-accueil-et-lettrages-3d",
    name: "Totems & Enseignes en Relief 3D",
    familyId: "signaletique",
    description: "Enseignes volumétriques découpées, totems d'entrée monumentaux et rétro-éclairage.",
  },
  {
    id: "sub-fresques-murales",
    slug: "habillages-muraux-et-vitrophanies",
    name: "Habillages Muraux & Vitrophanie",
    familyId: "signaletique",
    description: "Marquages adhésifs d'intimité, vitrophanies d'atelier et fresques spatiales.",
  },

  // Textile Image
  {
    id: "sub-polos-chemises",
    slug: "polos-et-chemises-brodees",
    name: "Polos & Chemises d'Entreprise Brodés",
    familyId: "textile-image",
    description: "Vêtements professionnels confortables avec broderie haute définition du logo.",
  },
  {
    id: "sub-tabliers-pro",
    slug: "tabliers-et-tenues-de-service",
    name: "Tabliers d'Atelier & Tenues Métiers",
    familyId: "textile-image",
    description: "Tabliers en lin et toile forte confectionnés pour ateliers, cafés et réceptions.",
  },

  // Infographie Immobilière
  {
    id: "sub-plans-vente",
    slug: "plans-de-vente-2d-3d",
    name: "Plans de Vente 2D & 3D Décorés",
    familyId: "infographie-immobiliere",
    description: "Plans d'étage et de logements valorisés pour la commercialisation foncière.",
  },
  {
    id: "sub-dossiers-commercialisation",
    slug: "packs-dossiers-de-commercialisation",
    name: "Dossiers de Commercialisation Clé en Main",
    familyId: "infographie-immobiliere",
    description: "Packs complets plans de vente, coupes et axonométries pour promoteurs.",
  },
];

export const STUDIO_PRODUCTS: StudioProduct[] = [
  // ---------------------------------------------------------------------------
  // 1. FAMILLE : CARTES DE VISITE & CONNECTÉES
  // ---------------------------------------------------------------------------
  {
    id: "studio-cartes-digitales",
    slug: "cartes-visite-connectees-adp-digital",
    name: "Cartes d'Affaires Connectées — ADP Digital Cards",
    subtitle: "L'alliance de l'impression physique de luxe et du QR code permanent certifié",
    familyId: "cartes-visite",
    subCategoryId: "sub-cartes-digitales",
    shortDescription: "La solution signature d'ADP Studio : cartes imprimées sur papier d'art 400g avec QR code définitif scannable reliant vers votre profil professionnel interactif et téléchargement vCard.",
    fullDescription: "Déployé avec succès pour des entreprises de référence telles que ETS TIFO, le système ADP Digital Cards réinvente la carte d'affaires. Chaque carte physique comporte un QR code gravé ou imprimé en haute définition qui renvoie sans expiration vers votre espace web d'entreprise (ex: https://ateliersdepaul.com/c/votre-id), avec coordonnées directes, WhatsApp pré-rempli, géolocalisation Google Maps et enregistrement instantané du contact au format vCard 3.0 dans le smartphone de votre interlocuteur.",
    highlights: [
      "URL permanente garantie sans expiration ni rupture de service",
      "Génération du BAT certifié imprimeur vectoriel SVG et matriciel 300 DPI",
      "Profil web personnalisé avec galerie de produits et charte chromatique",
      "Téléchargement direct vCard d'un simple toucher sans installation d'application",
      "Zéro abonnement récurrent obligatoire : formule atelier clé en main",
    ],
    materials: [
      "Papier création vergé 350g/m²",
      "Papier couché mat soyeux 400g/m²",
      "Support duplex contrecollé 600g/m² avec tranche colorée",
      "Carte composite PVC satinée indéchirable",
    ],
    finishes: [
      "Pelliculage soft-touch au toucher peau de pêche",
      "Vernis sélectif 3D brillant sur le logo et le QR code",
      "Dorure à chaud or ou cuivre sur monogramme",
      "Bords arrondis de précision d'atelier",
    ],
    dimensions: ["85 × 55 mm (Standard Européen)", "90 × 50 mm (Format Américain)", "55 × 55 mm (Carré Signature)"],
    quantities: [100, 250, 500, 1000, 2500],
    turnaround: "5 à 8 jours ouvrés après validation du BAT numérique",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon tirage et finitions",
    artworkSpecs: {
      formats: ["PDF haute définition (PDF/X-1a)", "Illustrator vectorisé (.AI / .EPS)"],
      colorProfile: "CMJN Fogra 39 ou ISO Coated v2",
      resolution: "300 DPI minimum à l'échelle 1:1",
      bleeds: "Fonds perdus de 2 mm sur les 4 côtés",
      safetyMargin: "Marge de sécurité intérieure de 3 mm",
      vectorizationRequirement: "Tous les textes doivent être impérativement vectorisés (courbes).",
      notes: "Le QR code permanent est généré directement par notre pôle studio pour garantir le respect des marges de silence et le contraste optimal de scan.",
    },
    configurationOptions: [
      {
        id: "format",
        label: "Format de la carte",
        type: "pills",
        choices: [
          { id: "std-85x55", label: "85 × 55 mm", description: "Format standard élégant", isDefault: true },
          { id: "us-90x50", label: "90 × 50 mm", description: "Format allongé type business" },
          { id: "carre-55x55", label: "55 × 55 mm", description: "Format carré architectural singulier" },
        ],
      },
      {
        id: "support",
        label: "Support papier & grammage",
        type: "select",
        choices: [
          { id: "mat-400g", label: "Couché mat premium 400g/m²", isDefault: true },
          { id: "verge-350g", label: "Papier d'art vergé texturé 350g/m²" },
          { id: "duplex-600g", label: "Contrecollé duplex prestige 600g/m² (épaisseur 1mm)" },
        ],
      },
      {
        id: "finition",
        label: "Finition de surface",
        type: "pills",
        choices: [
          { id: "soft-touch", label: "Pelliculage Soft-Touch", description: "Toucher soyeux mat", isDefault: true },
          { id: "vernis-3d", label: "Soft-Touch + Vernis 3D relief", description: "Surbrillance sélective" },
          { id: "dorure-or", label: "Dorure à chaud Or / Cuivre", description: "Élégance métallique" },
        ],
      },
      {
        id: "digitalModule",
        label: "Module numérique connecté",
        type: "radio",
        choices: [
          { id: "digital-cards-pack", label: "Pack complet ADP Digital Cards (URL pérenne + profil web + vCard)", isDefault: true },
          { id: "qr-seul", label: "Encodage QR standard vers site web existant" },
        ],
      },
      {
        id: "quantite",
        label: "Quantité d'exemplaires",
        type: "select",
        choices: [
          { id: "q-100", label: "100 exemplaires" },
          { id: "q-250", label: "250 exemplaires", isDefault: true },
          { id: "q-500", label: "500 exemplaires" },
          { id: "q-1000", label: "1 000 exemplaires" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: [
        "/assets/identities/studio.webp",
        "/assets/placeholders/project-placeholder.svg",
      ],
      isAuthenticMedia: true,
      caption: "Spécimen de carte connectée ETS TIFO générée par ADP Studio",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    digitalCardBridge: true,
    isPopular: true,
    isNew: true,
    status: "complete",
  },
  {
    id: "studio-cartes-prestige",
    slug: "cartes-de-visite-prestige-papier-d-art",
    name: "Cartes d'Affaires Prestige & Finitions d'Atelier",
    subtitle: "L'artisanat de l'imprimerie noble pour signatures de premier rang",
    familyId: "cartes-visite",
    subCategoryId: "sub-cartes-prestige",
    shortDescription: "Cartes de visite traditionnelles de haute facture : papiers de création Fedrigoni ou Arches, gaufrage en creux, marquage à chaud et tranche dorée.",
    fullDescription: "Conçues pour les architectes, avocats, dirigeants et créateurs exigeants, ces cartes d'affaires privilégient la sensualité de la matière et la rigueur typographique. Chaque élément est positionné au millimètre selon les grilles de composition des Ateliers de Paul.",
    highlights: [
      "Papiers d'art teints dans la masse jusqu'à 700g/m²",
      "Technique de marquage à chaud traditionnel par cliché métallique",
      "Gaufrage et débossage haute précision",
      "Teinte sur tranche artisanale coordonnée à la charte graphique",
    ],
    materials: [
      "Papier pur coton 450g",
      "Carton d'art texturé noir intense 600g",
      "Papier Kraft noble vergé 380g",
    ],
    finishes: ["Gaufrage aveugle", "Dorure à chaud cuivre / or", "Tranche métallisée", "Coins arrondis"],
    dimensions: ["85 × 55 mm", "90 × 55 mm", "55 × 55 mm"],
    quantities: [100, 250, 500, 1000],
    turnaround: "7 à 10 jours ouvrés d'atelier",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF certifié CMJN 300 DPI", "Fichiers vectoriels pour clichés de dorure"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI",
      bleeds: "2 mm",
      safetyMargin: "4 mm",
      vectorizationRequirement: "Typographies vectorisées, tracés de dorure sur calque séparé noir 100%.",
    },
    configurationOptions: [
      {
        id: "support",
        label: "Papier d'art sélectionné",
        type: "select",
        choices: [
          { id: "coton-450", label: "Coton naturel 450g", isDefault: true },
          { id: "noir-600", label: "Carton noir intense teinté masse 600g" },
          { id: "kraft-380", label: "Kraft noble vergé 380g" },
        ],
      },
      {
        id: "ennoblissement",
        label: "Ennoblissement principal",
        type: "pills",
        choices: [
          { id: "dorure-chaud", label: "Marquage à chaud Or / Cuivre", isDefault: true },
          { id: "gaufrage", label: "Gaufrage en creux (Letterpress)" },
          { id: "tranche-teintee", label: "Finition Tranche Teintée" },
        ],
      },
      {
        id: "quantite",
        label: "Tirage",
        type: "select",
        choices: [
          { id: "100", label: "100 exemplaires" },
          { id: "250", label: "250 exemplaires", isDefault: true },
          { id: "500", label: "500 exemplaires" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Finitions d'atelier avec marquage à chaud métallique",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-badges-pvc",
    slug: "badges-et-cartes-pvc-rigides",
    name: "Badges Membres & Cartes PVC Rigides",
    subtitle: "Cartes durables indéchirables pour résidences privées, clubs & accès corporate",
    familyId: "cartes-visite",
    subCategoryId: "sub-badges-pvc",
    shortDescription: "Cartes plastique PVC 760 microns (format carte bancaire) personnalisées avec QR code sécurisé, puce NFC optionnelle ou vernis sélectif.",
    fullDescription: "Idéales pour les programmes immobiliers résidentiels sécurisés, les badges d'accès de bureaux tertiaires ou les cartes de membre de prestige. Impression thermique haute résolution résistante à l'eau et aux frottements tropicaux.",
    highlights: [
      "Format standard ISO/CEI 7810 ID-1 (85.6 × 54 mm, épaisseur 0.76 mm)",
      "Matière PVC blanc brillant, mat ou transparent cristal",
      "Personnalisation unitaire possible (Nom, Prénom, Matricule, QR code individuel)",
      "Compatible cordons tour de cou et porte-badges de prestige",
    ],
    materials: ["PVC laminé blanc 760µ", "PVC transparent cristal", "PVC noir mat haute densité"],
    finishes: ["Lamination brillante protectrice", "Lamination mate anti-reflets", "Bandeau de signature"],
    dimensions: ["85.6 × 54 mm (Standard bancaire)"],
    quantities: [50, 100, 250, 500, 1000],
    turnaround: "5 à 8 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF haute définition vectorisé"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI",
      bleeds: "2.5 mm",
      safetyMargin: "3 mm",
      vectorizationRequirement: "Polices vectorisées obligatoires.",
    },
    configurationOptions: [
      {
        id: "materiau",
        label: "Type de PVC",
        type: "pills",
        choices: [
          { id: "pvc-blanc", label: "PVC Blanc 760µ", isDefault: true },
          { id: "pvc-mat-noir", label: "PVC Noir Mat" },
          { id: "pvc-cristal", label: "PVC Transparent" },
        ],
      },
      {
        id: "personnalisation",
        label: "Personnalisation unitaire",
        type: "radio",
        choices: [
          { id: "visuel-identique", label: "Série identique pour tous les badges", isDefault: true },
          { id: "nominative", label: "Personnalisation nominative (Nom + QR unitaire)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Badges d'accès d'atelier au format bancaire",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },

  // ---------------------------------------------------------------------------
  // 2. FAMILLE : IDENTITÉ VISUELLE & BRANDING
  // ---------------------------------------------------------------------------
  {
    id: "studio-brand-identity", // Identifiant historique conservé de quote-catalog
    slug: "creation-logotype-identite-visuelle",
    name: "Création de Logotype Maître & Emblème Vectoriel",
    subtitle: "La signature graphique essentielle de votre marque ou de votre cabinet",
    familyId: "identite-visuelle",
    subCategoryId: "sub-logotype",
    shortDescription: "Recherche sémantique approfondie, esquisses de géométrie sacrée et livrables vectoriels complets tous formats (SVG, EPS, PDF, PNG transparents HD).",
    fullDescription: "Un logotype d'atelier se construit sur des fondations solides : proportion dorée, lisibilité en réduction extrême (favicon, écran) comme en agrandissement architectural (enseigne, totem). Nous concevons l'emblème, le monogramme et la typographie d'accompagnement pour asseoir une autorité naturelle et durable.",
    highlights: [
      "3 axes créatifs distincts présentés en mise en situation réelle",
      "Épure géométrique et respect des règles typographiques strictes",
      "Fichiers sources vectoriels exploitables par tout prestataire futur",
      "Cession intégrale des droits patrimoniaux de reproduction",
    ],
    materials: ["Formats vectoriels numériques maîtres (AI, EPS, SVG, PDF)"],
    finishes: ["Versions positives, négatives, monochromes et polychromes"],
    dimensions: ["Vectoriel infini, adaptable de 16px à 10 mètres de façade"],
    quantities: [1],
    turnaround: "10 à 15 jours ouvrés avec phases d'échanges",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["Livrables maîtres vectoriels universels"],
      colorProfile: "Correspondances PANTONE, CMJN, RVB et Code Hexadécimal",
      resolution: "Vectoriel natif sans pixellisation",
      bleeds: "Sans objet",
      safetyMargin: "Zone d'exclusion définie dans la notice",
      vectorizationRequirement: "Tous tracés convertis en courbes définitives.",
    },
    configurationOptions: [
      {
        id: "formule",
        label: "Niveau d'accompagnement",
        type: "pills",
        choices: [
          { id: "logo-essentiel", label: "Logotype Maître & Monogramme", description: "Livrables vectoriels tous formats", isDefault: true },
          { id: "logo-complet", label: "Pack Identité Élargi (Logo + Mini-Charte)", description: "Palette chromatique & typographies" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: [
        "/assets/identities/studio.webp",
        "/assets/placeholders/project-placeholder.svg",
      ],
      isAuthenticMedia: true,
      caption: "Étude vectorielle d'identité visuelle d'atelier",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    isPopular: true,
    status: "complete",
  },
  {
    id: "studio-brandbook",
    slug: "charte-graphique-complete-brand-guidelines",
    name: "Charte Graphique Complète & Brand Guidelines d'Atelier",
    subtitle: "Le document d'autorité fixant l'intégralité des règles visuelles de l'entreprise",
    familyId: "identite-visuelle",
    subCategoryId: "sub-charte-graphique",
    shortDescription: "Ouvrage de référence de 30 à 60 pages détaillant les principes de construction, la grille de mise en page, les interdits et les applications multi-supports.",
    fullDescription: "La charte graphique garantit la cohérence absolue de votre marque à travers le temps et les intervenants. Elle codifie la hiérarchie typographique, les palettes principales et secondaires, la papeterie d'affaires, la signalétique et les gabarits digitaux.",
    highlights: [
      "Document de référence normatif PDF haute définition",
      "Système de grilles modulaires d'inspiration architecturale",
      "Exemples concrets de déclinaisons (print, digital, packaging, textile)",
      "Gabarits bureautiques prêts à l'emploi inclus (Word, PowerPoint)",
    ],
    materials: ["Livrable numérique PDF interactif + Gabarits sources"],
    finishes: ["Indexation cliquable, navigation ergonomique"],
    dimensions: ["Format paysage 16:9 haute définition"],
    quantities: [1],
    turnaround: "15 à 25 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF certifié interactif + InDesign / Illustrator sources"],
      colorProfile: "Codes PANTONE, CMJN, RVB, LAB, WEB",
      resolution: "Haute fidélité vectorielle et photographique",
      bleeds: "Sans objet",
      safetyMargin: "Conforme aux normes éditoriales d'atelier",
      vectorizationRequirement: "Directives de polices d'autorité spécifiées.",
    },
    configurationOptions: [
      {
        id: "etendue",
        label: "Périmètre de la charte",
        type: "select",
        choices: [
          { id: "standard-30p", label: "Charte Standard (30 pages — Principes & Papeterie)", isDefault: true },
          { id: "complete-60p", label: "Brand Book Complet (60 pages — Architecture, Signalétique, Flotte & Digital)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Extrait de Brand Book d'atelier",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-branding-programme",
    slug: "branding-de-programme-immobilier",
    name: "Pack Branding & Identité de Programme Immobilier",
    subtitle: "Valoriser vos opérations foncières et séduire acquéreurs et investisseurs",
    familyId: "identite-visuelle",
    subCategoryId: "sub-programme-immo",
    shortDescription: "Création complète de l'univers d'une opération immobilière : nommage (naming), identité visuelle du programme, charte des plans de vente et signalétique de chantier.",
    fullDescription: "Une résidence de standing ou un immeuble d'affaires se vend avant tout sur une promesse de qualité de vie et d'architecture. Nous concevons l'identité narrative et graphique du programme pour en faire une adresse convoitée dès le lancement commercial.",
    highlights: [
      "Atelier de naming et recherche sémantique territoriale",
      "Logotype signature du programme et armoiries volumétriques",
      "Gabarits pour panneaux de chantier grand format 4×3m",
      "Coordination directe avec les équipes de modélisation 3D d'ADP Project",
    ],
    materials: ["Fichiers PAO certifiés pour impression grand format et web"],
    finishes: ["Déclinaisons adaptées à l'affichage urbain et aux plaquettes de vente"],
    dimensions: ["Tous formats de l'affiche 4×3 au dossier A4"],
    quantities: [1],
    turnaround: "15 à 20 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF haute définition CMJN avec repères de coupe"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI pour print, 150 DPI pour affichage grand format",
      bleeds: "5 mm pour panneaux grands formats",
      safetyMargin: "10 mm",
      vectorizationRequirement: "Typographies vectorisées.",
    },
    configurationOptions: [
      {
        id: "pack",
        label: "Composition du pack programme",
        type: "pills",
        choices: [
          { id: "pack-essentiel", label: "Logo Programme + Panneau Chantier", isDefault: true },
          { id: "pack-complet", label: "Pack Global (Logo + Panneau + Gabarit Plaquette + Signalétique Vente)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Identité visuelle de programme résidentiel",
    },
    relatedProjectSlugs: ["showroom-kotto", "workbox"],
    isPopular: false,
    status: "complete",
  },

  // ---------------------------------------------------------------------------
  // 3. FAMILLE : SUPPORTS D'ÉDITION & PRINT COMMERCIAL
  // ---------------------------------------------------------------------------
  {
    id: "studio-plaquette", // Identifiant historique conservé de quote-catalog
    slug: "plaquettes-commerciales-et-brochures-de-vente",
    name: "Plaquettes Commerciales & Brochures de Vente",
    subtitle: "Mise en page éditoriale rigoureuse pour sublimer vos réalisations et produits",
    familyId: "supports-edition",
    subCategoryId: "sub-plaquettes",
    shortDescription: "Brochures agrafées (piqûre à cheval) ou 3 volets grand format, alliant photographies d'architecture, plans stylisés et typographie soignée.",
    fullDescription: "La plaquette commerciale d'atelier se distingue par son équilibre entre espaces blancs, respirations visuelles et rigueur informative. Chaque double-page est conçue comme un plan d'agencement pour guider le regard de l'investisseur vers les atouts majeurs du projet.",
    highlights: [
      "Mise en page sur grille de composition modulaire suisse",
      "Traitement colorimétrique expert des photographies d'atelier",
      "Fichiers certifiés pour l'imprimeur avec repères, fonds perdus et imposition",
      "Version PDF interactive allégée pour transmission rapide par email ou WhatsApp",
    ],
    materials: [
      "Couché moderne demi-mat 200g (pages intérieures)",
      "Couverture rigide 350g avec pelliculage mat",
      "Papier recyclé haut de gamme non blanchi",
    ],
    finishes: ["Pelliculage mat", "Vernis sélectif brillant", "Rainage anti-cassure", "Agrafes métalliques noires ou argent"],
    dimensions: ["A4 fermé (210 × 297 mm)", "A5 fermé (148 × 210 mm)", "Format Carré 210 × 210 mm"],
    quantities: [100, 250, 500, 1000, 2500],
    turnaround: "7 à 12 jours ouvrés après validation du BAT",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF haute définition avec pages en regard ou pages isolées"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI à l'échelle d'impression",
      bleeds: "3 mm sur tous les bords extérieurs",
      safetyMargin: "5 mm par rapport au pli et aux coupes",
      vectorizationRequirement: "Typographies intégrées ou vectorisées.",
    },
    configurationOptions: [
      {
        id: "format",
        label: "Format fermé",
        type: "pills",
        choices: [
          { id: "a4", label: "A4 (21 × 29.7 cm)", isDefault: true },
          { id: "carre-21", label: "Carré (21 × 21 cm)" },
          { id: "a5", label: "A5 (14.8 × 21 cm)" },
        ],
      },
      {
        id: "pagination",
        label: "Nombre de pages",
        type: "select",
        choices: [
          { id: "4p", label: "4 pages (1 pli / Dépliant)" },
          { id: "8p", label: "8 pages (Agrafé)", isDefault: true },
          { id: "16p", label: "16 pages (Brochure complète)" },
          { id: "24p", label: "24 pages (Dossier de prestige)" },
        ],
      },
      {
        id: "quantite",
        label: "Tirage souhaité",
        type: "select",
        choices: [
          { id: "100", label: "100 exemplaires" },
          { id: "250", label: "250 exemplaires", isDefault: true },
          { id: "500", label: "500 exemplaires" },
          { id: "1000", label: "1 000 exemplaires" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Brochure éditoriale et plaquette commerciale d'atelier",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    isPopular: true,
    status: "complete",
  },
  {
    id: "studio-rapport-annuel",
    slug: "rapports-annuels-et-dossiers-investisseurs",
    name: "Rapports Annuels & Dossiers d'Investissement",
    subtitle: "L'édition institutionnelle de prestige pour assemblées générales et bailleurs",
    familyId: "supports-edition",
    subCategoryId: "sub-rapports",
    shortDescription: "Mise en forme graphique de données complexes, infographies chiffrées, tableaux financiers et reliure dos carré collé de haute tenue.",
    fullDescription: "Nous transformons les bilans annuels et documents de gouvernance en véritables manifestes de marque. Les graphiques financiers sont redessinés, les photos d'équipes et de chantiers sont magnifiées et la reliure assure une manipulation digne d'un livre d'art.",
    highlights: [
      "Infographies sur-mesure de données financières et indicateurs clés",
      "Reliure dos carré collé PUR ou spirale métallique cachée",
      "Papier intérieur offset bouffant garantissant une lecture reposante",
      "Couverture rigide pelliculée avec marquage personnalisé",
    ],
    materials: ["Offset bouffant blanc naturel 120g", "Couverture carton 350g"],
    finishes: ["Dos carré collé", "Vernis sélectif 3D", "Pelliculage soyeux"],
    dimensions: ["A4 standard (210 × 297 mm)"],
    quantities: [50, 100, 250, 500],
    turnaround: "10 à 15 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF certifié CMJN haute résolution"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI",
      bleeds: "3 mm",
      safetyMargin: "10 mm côté pli pour dos carré collé",
      vectorizationRequirement: "Polices vectorisées.",
    },
    configurationOptions: [
      {
        id: "volume",
        label: "Pagination estimée",
        type: "select",
        choices: [
          { id: "32p", label: "32 pages", isDefault: true },
          { id: "48p", label: "48 pages" },
          { id: "64p", label: "64 pages et plus" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Édition de rapport annuel d'entreprise",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-papeterie-affaires",
    slug: "papeterie-d-affaires-coordonnee",
    name: "Pack Papeterie d'Affaires Coordonnée",
    subtitle: "Têtes de lettre, chemises à rabat, enveloppes filigranées et blocs-notes",
    familyId: "supports-edition",
    subCategoryId: "sub-papeterie",
    shortDescription: "L'ensemble indispensable des fournitures d'affaires de direction : chemises à rabat avec encoches pour cartes, papier à en-tête compatible imprimantes laser et enveloppes imprimées.",
    fullDescription: "Chaque interaction administrative ou commerciale engage l'image de votre atelier ou de votre cabinet. Nous concevons et imprimons une ligne complète de papeterie coordonnée respectant scrupuleusement les pantones de votre charte graphique.",
    highlights: [
      "Papier à en-tête garanti passage imprimante laser et jet d'encre",
      "Chemises à rabats grand format avec double rainage pour dossiers épais",
      "Enveloppes auto-adhésives avec impression logo et adresse retour",
      "Encoches normalisées pour cartes d'affaires physiques ou connectées",
    ],
    materials: ["Papier laser de tête 100g", "Carton chemise 350g mat", "Enveloppes kraft ou blanches 120g"],
    finishes: ["Pelliculage mat chemise", "Rainage professionnel"],
    dimensions: ["Chemise A4+ (215 × 305 mm)", "Tête de lettre A4", "Enveloppes DL & C4"],
    quantities: [250, 500, 1000],
    turnaround: "6 à 10 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF haute définition vectorisé"],
      colorProfile: "CMJN ou PANTONE direct",
      resolution: "300 DPI",
      bleeds: "2 mm",
      safetyMargin: "4 mm",
      vectorizationRequirement: "Typographies vectorisées.",
    },
    configurationOptions: [
      {
        id: "composition",
        label: "Composition du pack",
        type: "pills",
        choices: [
          { id: "pack-essentiel", label: "Têtes de lettre + Enveloppes", isDefault: true },
          { id: "pack-complet", label: "Pack Complet (Têtes + Chemises à rabats + Enveloppes)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Ensemble de papeterie d'affaires coordonnée",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },

  // ---------------------------------------------------------------------------
  // 4. FAMILLE : SIGNALÉTIQUE SPATIALE & HABILLAGE ARCHITECTURAL
  // ---------------------------------------------------------------------------
  {
    id: "studio-signaletique", // Identifiant historique conservé de quote-catalog
    slug: "signaletique-architecturale-et-plaques-de-reperage",
    name: "Signalétique Architecturale & Plaques de Repérage",
    subtitle: "Orientation spatiale, plaques d'étage et repérage élégant intégré au bâti",
    familyId: "signaletique",
    subCategoryId: "sub-plaques",
    shortDescription: "Système complet de guidage visuel pour sièges d'entreprises, résidences et cliniques : plaques de porte, repérage d'étages et plans d'évacuation esthétiques.",
    fullDescription: "La signalétique n'est pas un simple ajout d'information : c'est le prolongement direct de l'architecture. Nous choisissons les matériaux (verre feuilleté, laiton satiné, aluminium thermolaqué) pour qu'ils dialoguent avec les revêtements intérieurs et la lumière naturelle du lieu.",
    highlights: [
      "Étude complète des flux et plans d'implantation signalétique",
      "Matériaux durables résistant au climat tropical et aux nettoyages fréquents",
      "Fixations invisibles ou entretoises métalliques d'atelier",
      "Typographies d'autorité garantissant une lisibilité optimale à distance",
    ],
    materials: [
      "Aluminium brossé ou anodisé 2mm",
      "Laiton satiné verni anti-oxydation",
      "Verre acrylique transparent (Plexiglas) 5 à 8mm",
      "Bois massif d'essence locale traité",
    ],
    finishes: ["Gravure mécanique", "Impression UV directe haute tenue", "Champs polis miroir"],
    dimensions: ["150 × 150 mm", "300 × 200 mm", "400 × 300 mm", "Sur-mesure spatial"],
    quantities: [1, 5, 10, 25, 50],
    turnaround: "8 à 15 jours ouvrés selon usinage",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["Fichiers vectoriels à l'échelle (PDF vectoriel, DXF pour découpe laser)"],
      colorProfile: "PANTONE ou RAL architectural",
      resolution: "Tracés vectoriels fermés pour usinage",
      bleeds: "Sans objet",
      safetyMargin: "15 mm des bords pour perçage des entretoises",
      vectorizationRequirement: "Tous tracés vectorisés obligatoirement.",
    },
    configurationOptions: [
      {
        id: "matiere",
        label: "Support principal",
        type: "pills",
        choices: [
          { id: "alu-brosse", label: "Aluminium Brossé", isDefault: true },
          { id: "laiton", label: "Laiton Satiné Prestige" },
          { id: "plexi", label: "Plexiglas Acrylique Épais" },
        ],
      },
      {
        id: "fixation",
        label: "Système de fixation",
        type: "select",
        choices: [
          { id: "entretoises-inox", label: "Entretoises murales inox décollées du mur", isDefault: true },
          { id: "adhesif-structurel", label: "Adhésif double face haute adhérence 3M" },
          { id: "vis-masquees", label: "Fixation par vis avec cache-vis assortis" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Plaque signalétique architecturale en laiton satiné",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    isPopular: true,
    status: "complete",
  },
  {
    id: "studio-totems-lettrages",
    slug: "totems-d-accueil-et-lettrages-3d-en-relief",
    name: "Totems d'Accueil & Lettrages 3D en Relief",
    subtitle: "Enseignes volumétriques monumentales et signalétique extérieure d'autorité",
    familyId: "signaletique",
    subCategoryId: "sub-totems-lettrages",
    shortDescription: "Conception de totems directionnels extérieurs en aluminium dibond thermolaqué et lettrages métalliques en relief découpés au laser avec rétro-éclairage LED.",
    fullDescription: "Point d'entrée majestueux de votre siège social ou de votre clinique, le totem monumental affirme la présence de votre établissement dès la voirie. Nous concevons la structure métallique interne, le calepinage des tôles et le système d'éclairage pour une tenue exemplaire dans le temps.",
    highlights: [
      "Structure interne en profilés d'acier galvanisé anti-corrosion",
      "Faces en aluminium dibond ou tôle pliée thermolaquée teintes RAL",
      "Éclairage LED basse consommation étanche IP67",
      "Plans de fondation et de massifs béton d'ancrage fournis",
    ],
    materials: ["Acier galvanisé", "Aluminium composite Dibond 3mm", "Lettrages plexi diffusant"],
    finishes: ["Thermolaquage poudré au four", "Lettrages en relief rétro-éclairés"],
    dimensions: ["Hauteur 1.80m", "Hauteur 2.50m", "Hauteur 3.50m", "Sur-mesure de site"],
    quantities: [1, 2, 5],
    turnaround: "15 à 25 jours ouvrés de métallerie et finition",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["Plans DWG / DXF vectoriels et vues perspectives d'insertion"],
      colorProfile: "Teintes RAL certifiées",
      resolution: "Vectoriel pour découpe numérique CNC",
      bleeds: "Sans objet",
      safetyMargin: "Conforme aux contraintes de pliage tôlerie",
      vectorizationRequirement: "Vectorisation complète.",
    },
    configurationOptions: [
      {
        id: "hauteur",
        label: "Gabarit du totem",
        type: "pills",
        choices: [
          { id: "h-2m", label: "Hauteur 2,00 m (Entrée piétonne)", isDefault: true },
          { id: "h-3m", label: "Hauteur 3,00 m (Visible voirie)" },
          { id: "lettrage-seul", label: "Lettrage mural 3D seul (sans totem)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Totem d'entrée et lettrages architecturaux",
    },
    relatedProjectSlugs: ["showroom-kotto", "workbox"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-habillages-muraux",
    slug: "habillages-muraux-et-vitrophanies-d-atelier",
    name: "Habillages Muraux & Vitrophanie Décorative",
    subtitle: "Graphisme d'espace, vitrophanie d'intimité dépolie et fresques murales",
    familyId: "signaletique",
    subCategoryId: "sub-fresques-murales",
    shortDescription: "Films dépolis pour cloisons vitrées de bureaux, motifs géométriques architecturaux découpés et toiles murales grand format imprimées.",
    fullDescription: "Les cloisons vitrées des bureaux contemporains nécessitent souvent un équilibre subtil entre intimité des réunions et luminosité naturelle. Nous dessinons des trames dépolies personnalisées qui reprennent les motifs graphiques de votre entreprise.",
    highlights: [
      "Film adhésif dépoli aspect sablé laissant passer 85% de la lumière",
      "Découpe numérique de motifs architecturaux (claustras, trames, logos)",
      "Pose soignée sans bulles adaptée aux grandes baies vitrées",
      "Suppression et renouvellement faciles sans altérer le vitrage",
    ],
    materials: ["Vinyle polymère dépoli sablé longue durée", "Adhésif micro-perforé"],
    finishes: ["Découpe mi-chair", "Impression couleur sur dépoli"],
    dimensions: ["Sur-mesure au mètre linéaire ou à la surface vitrée"],
    quantities: [1, 5, 10],
    turnaround: "5 à 8 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF vectoriel à l'échelle ou métré d'atelier"],
      colorProfile: "Teintes monochromes dépolies ou CMJN",
      resolution: "Vectoriel pour plotter de découpe",
      bleeds: "10 mm pour ajustement sur site",
      safetyMargin: "Sans objet",
      vectorizationRequirement: "Tracés vectoriels obligatoires.",
    },
    configurationOptions: [
      {
        id: "type-application",
        label: "Type d'habillage",
        type: "pills",
        choices: [
          { id: "bande-depolie", label: "Bande d'intimité dépolie avec logo découpé", isDefault: true },
          { id: "motif-integral", label: "Motif géométrique intégral sur toute la baie" },
          { id: "toile-murale", label: "Toile murale imprimée sur mur plein" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Vitrophanie dépolie pour cloisons de bureaux",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: false,
    status: "complete",
  },

  // ---------------------------------------------------------------------------
  // 5. FAMILLE : TEXTILES & OBJETS D'IMAGE PRO
  // ---------------------------------------------------------------------------
  {
    id: "studio-polos-atelier",
    slug: "polos-et-chemises-d-entreprise-brodees",
    name: "Polos & Chemises d'Entreprise Brodés",
    subtitle: "Vêtements d'image corporate avec broderie de précision cœur et dos",
    familyId: "textile-image",
    subCategoryId: "sub-polos-chemises",
    shortDescription: "Polos en maille piquée 100% coton peigné lourd (220g) ou chemises de coupe soignée, personnalisés par broderie industrielle haute tenue.",
    fullDescription: "En étroite collaboration avec les compétences de confection de notre pôle textile (Rosbri Wax Design) et des partenaires spécialisés, ADP Studio supervise le patronage et l'application exacte de votre logotype en fils polyester grand teint lavables à haute température.",
    highlights: [
      "Maille piquée de qualité supérieure 100% coton lourd (220g/m²)",
      "Broderie industrielle haute précision jusqu'à 12 couleurs de fils",
      "Tenue irréprochable au lavage fréquent sans déformation de col",
      "Coupes coordonnées hommes, femmes et grandes tailles",
    ],
    materials: ["Coton peigné lourd 220g", "Popeline de coton pour chemises"],
    finishes: ["Broderie poitrine (cœur)", "Broderie dos grand format", "Écusson tissé cousu"],
    dimensions: ["Tailles S, M, L, XL, XXL, 3XL"],
    quantities: [25, 50, 100, 250, 500],
    turnaround: "8 à 12 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["Fichier vectoriel (.AI, .EPS, .PDF) pour numérisation de broderie"],
      colorProfile: "Nuancier de fils à broder Madeira / Isacord",
      resolution: "Vectoriel obligatoire",
      bleeds: "Sans objet",
      safetyMargin: "Détails minimum de 1 mm pour passage d'aiguille",
      vectorizationRequirement: "Typographies vectorisées.",
    },
    configurationOptions: [
      {
        id: "type-vetement",
        label: "Type de pièce",
        type: "pills",
        choices: [
          { id: "polo-piquet", label: "Polo maille piquée 220g", isDefault: true },
          { id: "chemise-popeline", label: "Chemise d'affaires manches longues" },
        ],
      },
      {
        id: "emplacement-marquage",
        label: "Emplacement de la broderie",
        type: "select",
        choices: [
          { id: "coeur-seul", label: "Broderie Cœur (8 à 10 cm)", isDefault: true },
          { id: "coeur-et-dos", label: "Broderie Cœur + Grand Marquage Dos" },
          { id: "coeur-et-manche", label: "Broderie Cœur + Manche" },
        ],
      },
      {
        id: "quantite",
        label: "Nombre de pièces",
        type: "select",
        choices: [
          { id: "25", label: "25 pièces" },
          { id: "50", label: "50 pièces", isDefault: true },
          { id: "100", label: "100 pièces" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Broderie d'atelier sur polo d'entreprise",
    },
    relatedProjectSlugs: ["tifo-0001"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-tabliers-pro",
    slug: "tabliers-d-atelier-et-tenues-de-service",
    name: "Tabliers d'Atelier & Tenues de Métier Stylisées",
    subtitle: "Confection artisanale robuste pour ateliers d'art, cafés, réceptions et hôtellerie",
    familyId: "textile-image",
    subCategoryId: "sub-tabliers-pro",
    shortDescription: "Tabliers à bavette en toile forte de coton, lin épais ou denim brut, avec lanières en cuir véritable ou attaches croisées dans le dos pour un port confortable prolongé.",
    fullDescription: "Le tablier professionnel est devenu un véritable emblème d'authenticité et d'expertise manuelle. Nous concevons des pièces robustes dotées de poches renforcées par rivets métalliques, spécialement adaptées aux métiers de bouche, aux galeries d'art et aux équipes d'accueil d'établissements hôteliers.",
    highlights: [
      "Toile épaisse déperlante 320g/m² très résistante à l'abrasion",
      "Sangles réglables en cuir véritable amovibles pour le lavage",
      "Poches multiples ergonomiques (poche stylos, poche carnet, boucle porte-torchon)",
      "Marquage au choix par broderie d'atelier ou écusson en cuir gravé",
    ],
    materials: ["Denim brut 340g", "Toile sergée de coton lourd 320g", "Lin lavé épais"],
    finishes: ["Rivets en cuivre", "Lanières en cuir véritable", "Coutures renforcées"],
    dimensions: ["Taille unique réglable (Hauteur 85 cm × Largeur 70 cm)"],
    quantities: [10, 25, 50, 100],
    turnaround: "10 à 15 jours ouvrés de confection",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé",
    artworkSpecs: {
      formats: ["PDF vectoriel pour gravure cuir ou broderie"],
      colorProfile: "Nuancier fils ou gravure monochrome",
      resolution: "Vectoriel natif",
      bleeds: "Sans objet",
      safetyMargin: "20 mm des coutures",
      vectorizationRequirement: "Tracés vectorisés.",
    },
    configurationOptions: [
      {
        id: "matiere-tablier",
        label: "Matière de la toile",
        type: "pills",
        choices: [
          { id: "toile-sergee", label: "Toile Sergée Coton 320g (Noir / Kaki)", isDefault: true },
          { id: "denim-brut", label: "Denim Brut Bleu Nuit" },
        ],
      },
      {
        id: "type-marquage",
        label: "Finition du logo",
        type: "select",
        choices: [
          { id: "ecusson-cuir", label: "Écusson en cuir véritable gravé au laser", isDefault: true },
          { id: "broderie-directe", label: "Broderie directe en fil satiné" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Tablier d'artisan confectionné sur-mesure",
    },
    relatedProjectSlugs: ["tifo-0001"],
    isPopular: false,
    status: "complete",
  },

  // ---------------------------------------------------------------------------
  // 6. FAMILLE : INFOGRAPHIE & PLANS COMMERCIAUX IMMOBILIERS
  // ---------------------------------------------------------------------------
  {
    id: "studio-plans-vente",
    slug: "plans-de-vente-2d-et-3d-decores",
    name: "Plans de Vente 2D & 3D Décorés pour Promoteurs",
    subtitle: "Mise en valeur visuelle des surfaces, du mobilier et de la fluidité des espaces",
    familyId: "infographie-immobiliere",
    subCategoryId: "sub-plans-vente",
    shortDescription: "Transformation des plans techniques d'architecte (Revit/AutoCAD) en plans de commercialisation élégants, colorisés avec parquet, carrelages et cotation commerciale.",
    fullDescription: "Les plans techniques bruts sont illisibles pour un acquéreur non initié. Notre équipe d'infographie stylise chaque lot (appartement, villa, bureau) en y apportant des textures nobles, des ombrages portés doux et une mise en situation de mobilier pour déclencher le coup de cœur.",
    highlights: [
      "Tableau des surfaces habitables et annexes (terrasses, balcons, loggias)",
      "Textures soignées (bois naturel, marbre, carrelages grands formats)",
      "Rose des vents intégrée et repérage du lot sur le plan d'étage général",
      "Livrables en haute définition pour brochures de vente et format web",
    ],
    materials: ["Fichiers numériques PDF vectoriel HD + PNG transparents pour intégration web"],
    finishes: ["Ombres portées douces, calques de cotation commerciale lisible"],
    dimensions: ["Format A4 ou A3 paysage"],
    quantities: [1, 5, 10, 20, 50],
    turnaround: "3 à 5 jours ouvrés par série de lots",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé par typologie de lot",
    artworkSpecs: {
      formats: ["Plans sources DWG, DXF, RVT (Revit) ou PDF vectoriel"],
      colorProfile: "CMJN ou RVB selon destination print/web",
      resolution: "300 DPI à l'échelle A4",
      bleeds: "Sans objet",
      safetyMargin: "5 mm",
      vectorizationRequirement: "Plans côtés à l'échelle impératifs.",
    },
    configurationOptions: [
      {
        id: "style-rendu",
        label: "Style graphique du plan",
        type: "pills",
        choices: [
          { id: "2d-texture", label: "Plan 2D stylisé avec textures & mobilier", isDefault: true },
          { id: "axono-3d", label: "Axonométrie 3D écorchée (vue plongeante)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Plan de vente commercial stylisé par ADP Studio",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    isPopular: false,
    status: "complete",
  },
  {
    id: "studio-pack-commercialisation",
    slug: "dossier-de-commercialisation-immobilier-cle-en-main",
    name: "Dossier de Commercialisation Immobilier Clé en Main",
    subtitle: "La suite complète pour lancer la vente d'une opération neuve en toute sérénité",
    familyId: "infographie-immobiliere",
    subCategoryId: "sub-dossiers-commercialisation",
    shortDescription: "Pack complet regroupant l'identité du programme, la série des plans de vente stylisés, le livret d'accueil acquéreur et la plaquette commerciale grand format.",
    fullDescription: "Conçu pour les promoteurs et investisseurs recherchant une coordination sans faille : un interlocuteur unique gère l'ensemble de la chaîne graphique, de la lecture des maquettes architecturales jusqu'aux fichiers prêts pour les agences immobilières et notaires.",
    highlights: [
      "Prise en charge intégrale de l'ensemble des lots du programme",
      "Coordination directe avec les architectes concepteurs",
      "Harmonisation graphique parfaite entre plans, plaquettes et site web",
      "Gain de temps majeur pour les équipes de vente et de commercialisation",
    ],
    materials: ["Pack fichiers numériques HD + Fichiers d'impression certifiés"],
    finishes: ["Kit complet tous formats"],
    dimensions: ["Multiples (A4, A3, Web, Affiches)"],
    quantities: [1],
    turnaround: "15 à 25 jours ouvrés selon ampleur du programme",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé global",
    artworkSpecs: {
      formats: ["Maquettes sources d'architecture et pièces du permis de construire"],
      colorProfile: "CMJN Fogra 39",
      resolution: "300 DPI",
      bleeds: "Conformes à chaque support du pack",
      safetyMargin: "5 à 10 mm",
      vectorizationRequirement: "Validations réglementaires incluses.",
    },
    configurationOptions: [
      {
        id: "taille-programme",
        label: "Envergure de l'opération",
        type: "select",
        choices: [
          { id: "prog-petit", label: "Programme de 2 à 8 logements / lots", isDefault: true },
          { id: "prog-moyen", label: "Programme de 9 à 25 logements / lots" },
          { id: "prog-grand", label: "Grand ensemble ou tour d'affaires (> 25 lots)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Pack complet de commercialisation immobilière",
    },
    relatedProjectSlugs: ["workbox", "showroom-kotto"],
    isPopular: true,
    status: "complete",
  },
  // 17. Dépliants d'Architecture & Plaquettes 3 Volets
  {
    id: "studio-depliants-plaquettes-3volets",
    slug: "depliants-architecture-plaquettes-3-volets",
    name: "Dépliants d'Architecture & Plaquettes 3 Volets",
    subtitle: "Supports d'édition 3 volets (6 pages) sur papier couché satiné avec rainage mécanique soigné.",
    familyId: "supports-edition",
    subCategoryId: "sub-plaquettes",
    shortDescription: "Dépliants 3 volets format fermé 10x21 cm ou A5 sur couché satiné 170g ou demi-mat 250g avec rainage mécanique anti-craquelure.",
    fullDescription: "Support d'édition par excellence pour les cabinets d'architecture, promoteurs et bureaux d'études. Présentation équilibrée avec volet de couverture d'autorité, double page centrale panoramique et coordonnées au dos.",
    highlights: [
      "Rainage mécanique haute précision anti-craquelure sur plis",
      "Pelliculage mat soft-touch ou vernis satiné anti-traces",
      "Tirages d'atelier de 250 à 2 500 exemplaires",
      "Vérification des traits de coupe et du pliage en épreuve d'atelier",
    ],
    materials: ["Couché moderne satiné 170g", "Couché demi-mat 250g", "Papier recyclé naturel 200g"],
    finishes: ["Pelliculage mat", "Pelliculage Soft-Touch", "Vernis de protection"],
    dimensions: ["A4 ouvert (29.7x21 cm) - plié 10x21 cm", "Grand format A4 fermé (63x29.7 cm ouvert)"],
    quantities: [250, 500, 1000, 2500],
    turnaround: "4 à 6 jours ouvrés",
    pricingNotice: "Tarif atelier validé 2026 à partir de 45 000 FCFA",
    artworkSpecs: {
      formats: ["PDF certifié PDF/X-1a ou PDF/X-4 vectoriel", "Fichiers InDesign avec polices vectorisées"],
      colorProfile: "CMJN ISO Coated v2 (FOGRA39)",
      resolution: "300 DPI minimum",
      bleeds: "3 mm sur tout le pourtour",
      safetyMargin: "5 mm par rapport aux lignes de pli et bords",
      vectorizationRequirement: "Typographies intégralement vectorisées (tracés).",
    },
    configurationOptions: [
      {
        id: "finition-pelliculage",
        label: "Pelliculage & Finition",
        type: "pills",
        choices: [
          { id: "vernis-satine", label: "Vernis satiné d'atelier (Standard)", isDefault: true },
          { id: "soft-touch", label: "Pelliculage Soft-Touch soyeux (+15 000 FCFA)" },
          { id: "mat-profond", label: "Pelliculage Mat anti-traces" },
        ],
      },
      {
        id: "grammage-papier",
        label: "Grammage du support",
        type: "pills",
        choices: [
          { id: "papier-170g", label: "Couché satiné 170g (Élégance légère)", isDefault: true },
          { id: "papier-250g", label: "Couché demi-mat 250g (Tenue rigide)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Dépliants 3 volets d'architecture et plaquettes commerciales",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: true,
    status: "complete",
  },

  // 18. Affiches d'Exposition & Posters d'Architecture A2 / A1
  {
    id: "studio-affiches-grand-format",
    slug: "affiches-exposition-posters-architecture-grand-format",
    name: "Affiches d'Exposition & Posters d'Architecture A2 / A1",
    subtitle: "Tirage grand format haute fidélité sur papier photo satiné 200g pour concours et galeries.",
    familyId: "supports-edition",
    subCategoryId: "sub-papeterie",
    shortDescription: "Tirage grand format haute fidélité sur papier photo satiné 200g ou papier d'art mat pour concours, expositions et présentations d'agences.",
    fullDescription: "Reproduction fidèle des détails architecturaux, axonométries et perspectives 3D. Encres pigmentaires 12 couleurs résistantes aux UV pour une tenue longue durée des teintes sombres et des contrastes.",
    highlights: [
      "Tirage jet d'encre pigmentaire 12 couleurs haute définition",
      "Formats normalisés A2 (42x59.4 cm) et A1 (59.4x84.1 cm)",
      "Papier photo satiné anti-reflets 200g",
      "Livraison soignée sous tube protecteur renforcé d'atelier",
    ],
    materials: ["Papier photo satiné 200g", "Papier d'art mat lisse 230g"],
    finishes: ["Finition satinée anti-reflets", "Contrecollage carton plume 5mm (sur demande)"],
    dimensions: ["A2 (420 x 594 mm)", "A1 (594 x 841 mm)"],
    quantities: [5, 10, 25, 50],
    turnaround: "2 à 4 jours ouvrés",
    pricingNotice: "Tarif atelier validé 2026 à partir de 20 000 FCFA",
    artworkSpecs: {
      formats: ["PDF haute résolution 300 DPI", "TIFF / PNG 300 DPI non compressé"],
      colorProfile: "CMJN Fogra 39 ou Adobe RGB 1998",
      resolution: "300 DPI à l'échelle 1:1",
      bleeds: "2 mm de fond perdu",
      safetyMargin: "10 mm des bords",
      vectorizationRequirement: "Polices vectorisées.",
    },
    configurationOptions: [
      {
        id: "format-affiche",
        label: "Format de l'affiche",
        type: "pills",
        choices: [
          { id: "format-a2", label: "Format A2 (42 x 59.4 cm)", isDefault: true },
          { id: "format-a1", label: "Format A1 (59.4 x 84.1 cm) (+1 500 FCFA/pc)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Affiches et posters d'architecture haute précision",
    },
    relatedProjectSlugs: ["showroom-kotto"],
    status: "complete",
  },

  // 19. Panneaux de Chantier & Bâches Réglementaires
  {
    id: "studio-panneaux-chantier-permis",
    slug: "panneaux-chantier-baches-reglementaires",
    name: "Panneaux de Chantier & Bâches Réglementaires",
    subtitle: "Affichage obligatoire de permis de construire et bâches promotionnelles extérieures durables.",
    familyId: "signaletique",
    subCategoryId: "sub-fresques-murales",
    shortDescription: "Panneaux d'affichage légal de permis de construire et bâches géantes imprimées sur polypropylène alvéolaire Akilux 3.5mm ou bâche PVC 510g M1.",
    fullDescription: "Impression numérique directe UV haute résistance pour l'affichage de vos chantiers et programmes immobiliers. Résistance certifiée aux fortes chaleurs, pluies tropicales et rayons UV.",
    highlights: [
      "Support alvéolaire Akilux 3.5mm rigide et résistant aux chocs",
      "Bâche PVC 510g ignifugée M1 avec œillets métalliques périmétriques",
      "Conforme aux mentions légales obligatoires de permis de construire",
      "Encres UV durcies sous lampe LED pour tenue extérieure 24 mois+",
    ],
    materials: ["Akilux alvéolaire 3.5mm", "Akilux renforcé 5mm", "Bâche PVC 510g M1 avec œillets"],
    finishes: ["Œillets nickelés aux 4 coins", "Renforts périmétriques thermosoudés"],
    dimensions: ["80 x 120 cm (Permis légal)", "120 x 160 cm (Commercialisation)", "300 x 200 cm (Bâche géante)"],
    quantities: [1, 3, 5, 10],
    turnaround: "3 à 5 jours ouvrés",
    pricingNotice: "Tarif atelier validé 2026 à partir de 22 000 FCFA",
    artworkSpecs: {
      formats: ["PDF vectoriel", "Fichiers EPS / AI", "TIFF échelle 1:1 à 150 DPI minimum"],
      colorProfile: "CMJN Fogra 39",
      resolution: "150 à 300 DPI selon format",
      bleeds: "5 mm sur panneau / 20 mm pour ourlet de bâche",
      safetyMargin: "30 mm des bords (pour dégager les œillets)",
      vectorizationRequirement: "Typographies obligatoirement vectorisées.",
    },
    configurationOptions: [
      {
        id: "format-panneau",
        label: "Format & Support",
        type: "pills",
        choices: [
          { id: "format-80-120", label: "Panneau Akilux 80x120 cm (Standard permis)", isDefault: true },
          { id: "format-120-160", label: "Grand panneau Akilux 120x160 cm (+12 000 FCFA/pc)" },
          { id: "bache-300-200", label: "Bâche extérieure 3x2 m avec œillets (+35 000 FCFA/pc)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Panneaux de chantier et bâches d'affichage extérieur",
    },
    relatedProjectSlugs: ["workbox"],
    isPopular: true,
    status: "complete",
  },

  // 20. Gilets de Sécurité & Casquettes Corporate de Chantier
  {
    id: "studio-gilets-securite-brodes",
    slug: "gilets-securite-casquettes-corporate-chantier",
    name: "Gilets de Sécurité & Casquettes Corporate de Chantier",
    subtitle: "Gilets classe 2 certifiés EN ISO 20471 et casquettes brodées pour visites et équipes de maîtrise d'œuvre.",
    familyId: "textile-image",
    subCategoryId: "sub-polos-chemises",
    shortDescription: "Gilets de chantier haute visibilité classe 2 certifiés EN ISO 20471 et casquettes structurées avec marquage ou broderie haute densité.",
    fullDescription: "Équipez vos ingénieurs, architectes et partenaires lors des visites de chantier avec une tenue de sécurité réglementaire arborant l'image de marque de votre agence ou entreprise.",
    highlights: [
      "Conforme norme EN ISO 20471 Classe 2 pour chantiers et voiries",
      "Bandes rétroréfléchissantes 3M de 50mm haute intensité",
      "Fermeture zippée robuste et poche transparente porte-badge",
      "Casquette 6 panneaux coton sergé avec boucle métallique réglable",
    ],
    materials: ["100% Polyester fluorescent 120g", "Coton sergé lourd 260g (casquettes)"],
    finishes: ["Marquage dos grand format + broderie cœur", "Bandes rétroréfléchissantes 360°"],
    dimensions: ["Tailles M, L, XL, XXL (panachables)", "Taille unique réglable (casquettes)"],
    quantities: [10, 25, 50, 100],
    turnaround: "5 à 8 jours ouvrés",
    pricingNotice: "Tarif atelier validé 2026 à partir de 45 000 FCFA",
    artworkSpecs: {
      formats: ["Vectoriel SVG, AI ou EPS", "PDF vectoriel avec calque de séparation"],
      colorProfile: "Pantone C ou CMJN",
      resolution: "Vectoriel natif requis pour découpe flex ou programme broderie",
      bleeds: "Sans objet",
      safetyMargin: "10 mm",
      vectorizationRequirement: "Textes et logotypes vectorisés.",
    },
    configurationOptions: [
      {
        id: "type-equipement",
        label: "Type d'équipement",
        type: "pills",
        choices: [
          { id: "gilets-seuls", label: "Gilets de sécurité haute visibilité", isDefault: true },
          { id: "pack-gilet-casquette", label: "Pack Duo Gilet + Casquette brodée" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Équipements textiles de sécurité et de chantier d'atelier",
    },
    relatedProjectSlugs: ["workbox"],
    status: "complete",
  },

  // 21. Animations Vidéo & Visites Virtuelles 3D de Projet
  {
    id: "studio-video-visite-virtuelle-3d",
    slug: "animations-video-visites-virtuelles-3d",
    name: "Animations Vidéo & Visites Virtuelles 3D de Projet",
    subtitle: "Clips cinématiques 4K et visites immersives 360° scénarisées pour promoteurs et investisseurs.",
    familyId: "infographie-immobiliere",
    subCategoryId: "sub-perspectives-3d",
    shortDescription: "Vidéos de présentation cinématiques 4K et parcours virtuels immersifs restituant l'expérience spatiale du projet avant travaux.",
    fullDescription: "Mise en mouvement réaliste des volumes architecturaux avec cinématique de caméra fluide, animation de la lumière équatoriale, végétalisation tropicale vivante et habillage sonore soigné.",
    highlights: [
      "Trajectoires de caméra fluides et scénarisées par des architectes",
      "Rendu photoréaliste de la lumière naturelle, textures et reflets",
      "Formats polyvalents 16:9 paysage (écrans) et 9:16 vertical (Reels/Stories)",
      "Possibilité d'intégration d'un parcours virtuel 360° interactif",
    ],
    materials: ["Fichier Master MP4 4K / Full HD + Liens de diffusion web"],
    finishes: ["Montage avec titrage, musique libre de droit et logo animé"],
    dimensions: ["Format 16:9 4K (3840x2160)", "Format 9:16 Full HD (1080x1920)"],
    quantities: [1],
    turnaround: "10 à 20 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon durée",
    artworkSpecs: {
      formats: ["Maquette 3D Revit, SketchUp, Blender ou plans 2D complets"],
      colorProfile: "Rec. 709 / sRGB",
      resolution: "3840x2160 (4K UHD) ou 1920x1080 (Full HD)",
      bleeds: "Sans objet",
      safetyMargin: "Zone de sécurité titrage 10%",
      vectorizationRequirement: "Logotypes vectoriels pour titrage d'atelier.",
    },
    configurationOptions: [
      {
        id: "duree-video",
        label: "Durée de l'animation",
        type: "pills",
        choices: [
          { id: "teaser-30s", label: "Clip Teaser 30 secondes", isDefault: true },
          { id: "presentation-60s", label: "Vidéo immersive 60 secondes" },
          { id: "film-complet-120s", label: "Film architectural 120 secondes avec voix-off" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Animations cinématiques et visites virtuelles 3D",
    },
    relatedProjectSlugs: ["018_studio", "showroom-kotto"],
    isPopular: true,
    status: "complete",
  },

  // 22. Dossiers de Plans Permis de Construire & DAO
  {
    id: "studio-dossier-plans-permis",
    slug: "dossiers-plans-permis-de-construire-dao",
    name: "Dossiers de Plans Permis de Construire & DAO",
    subtitle: "Mise au net technique DAO et mise en page normalisée des pièces graphiques réglementaires.",
    familyId: "infographie-immobiliere",
    subCategoryId: "sub-plans-vente",
    shortDescription: "Élaboration soignée des pièces graphiques du permis de construire (situation, masse, coupes, façades) et plans techniques DAO.",
    fullDescription: "Mise au net rigoureuse des plans d'architecture pour les dossiers administratifs, dépôts de permis de construire ou plans de recollement. Conformité graphique stricte aux usages municipaux et ministériels.",
    highlights: [
      "Conforme aux exigences des collectivités urbaines et mairies du Cameroun",
      "Cotations précises, surfaces réglementaires et cartouches d'atelier",
      "Exports PDF haute résolution pour tirage traceur et archivage",
      "Coordination technique avec l'architecte signataire habilité",
    ],
    materials: ["Tirages pliés A3/A0 sous pochette + Fichiers numériques PDF/DWG"],
    finishes: ["Pliage normalisé AFNOR 21x29.7 cm avec onglet de reliure"],
    dimensions: ["Formats A3, A2, A1 et A0"],
    quantities: [1, 3, 5],
    turnaround: "7 à 12 jours ouvrés",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon échelle",
    artworkSpecs: {
      formats: ["Esquisses architecturales, fichiers DAO DWG/DXF ou relevés terrain"],
      colorProfile: "Monochrome & CMJN",
      resolution: "Vectoriel natif 300 DPI pour les cartouches",
      bleeds: "Sans objet",
      safetyMargin: "Cartouche normalisé en bas à droite",
      vectorizationRequirement: "Conforme aux chartes de dessin d'atelier.",
    },
    configurationOptions: [
      {
        id: "echelle-projet",
        label: "Échelle de l'ouvrage",
        type: "pills",
        choices: [
          { id: "surface-petite", label: "Projet < 250 m² (Villa individuelle)", isDefault: true },
          { id: "surface-moyenne", label: "Projet 250 à 800 m² (Immeuble R+2 / R+3)" },
          { id: "surface-grande", label: "Grand ensemble ou équipement (> 800 m²)" },
        ],
      },
    ],
    media: {
      coverImage: "/assets/identities/studio.webp",
      gallery: ["/assets/identities/studio.webp"],
      isAuthenticMedia: true,
      caption: "Dossiers de plans techniques DAO et permis de construire",
    },
    relatedProjectSlugs: ["workbox"],
    status: "complete",
  },
];

// -----------------------------------------------------------------------------
// FONCTIONS UTILITAIRES DE RECHERCHE ET NAVIGATION DU CATALOGUE
// -----------------------------------------------------------------------------

export function getAllStudioFamilies(): StudioFamily[] {
  return [...STUDIO_FAMILIES];
}

export function getStudioFamilyById(familyId: string): StudioFamily | undefined {
  return STUDIO_FAMILIES.find((f) => f.id === familyId);
}

export function getAllStudioProducts(): StudioProduct[] {
  return [...STUDIO_PRODUCTS];
}

export function getStudioProductBySlug(slug: string): StudioProduct | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return STUDIO_PRODUCTS.find((p) => p.slug.toLowerCase() === cleanSlug);
}

export function getStudioProductById(id: string): StudioProduct | undefined {
  if (!id) return undefined;
  return STUDIO_PRODUCTS.find((p) => p.id === id);
}

export function getStudioProductsByFamily(familyId: string): StudioProduct[] {
  if (!familyId || familyId === "all") return [...STUDIO_PRODUCTS];
  return STUDIO_PRODUCTS.filter((p) => p.familyId === familyId);
}

export function getRelatedStudioProducts(currentProductId: string, limit = 3): StudioProduct[] {
  const current = getStudioProductById(currentProductId);
  if (!current) return STUDIO_PRODUCTS.slice(0, limit);

  // Privilégier les produits de la même famille
  const sameFamily = STUDIO_PRODUCTS.filter(
    (p) => p.familyId === current.familyId && p.id !== current.id
  );
  if (sameFamily.length >= limit) {
    return sameFamily.slice(0, limit);
  }

  // Compléter avec les produits populaires d'autres familles
  const others = STUDIO_PRODUCTS.filter(
    (p) => p.familyId !== current.familyId && p.id !== current.id
  );
  return [...sameFamily, ...others].slice(0, limit);
}
