export interface UniverseService {
  title: string;
  description: string;
  icon: string;
}

export interface UniverseDeliverable {
  title: string;
  format: string;
  detail: string;
}

export interface UniverseDetailData {
  id: string;
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  tagline: string;
  materials: string;
  accentColor: string;
  symbol: string;
  description: string;
  philosophy: string;
  pillars: {
    title: string;
    description: string;
  }[];
  services: UniverseService[];
  deliverables: UniverseDeliverable[];
  deontologicalNote?: string;
  relatedProjectSlugs: string[];
}

export const UNIVERSE_DETAILS: Record<string, UniverseDetailData> = {
  "adp-project": {
    id: "univ-01",
    slug: "adp-project",
    number: "01",
    name: "ADP Project",
    subtitle: "Architecture · BIM · 3D",
    tagline: "Concevoir l'espace bâti avec rigueur technique et sensibilité bioclimatique",
    materials: "Pierre de Bourgogne, noyer massif & verre structurel",
    accentColor: "#7DB9DC",
    symbol: "⌂",
    description:
      "Études de faisabilité, plans d'exécution, coordination BIM LOD 300-350 et imagerie 3D photoréaliste pour projets résidentiels et tertiaires au Cameroun.",
    philosophy:
      "Un projet architectural d'exception naît de la convergence entre rigueur constructive et intelligence contextuelle. En climat tropical humide ou équatorial, chaque ouverture, chaque brise-soleil et chaque mètre cube modélisé répond à un impératif d'aération passive, d'isolation thermique et de durabilité.",
    pillars: [
      {
        title: "Modélisation BIM de Précision",
        description: "Maquettes numériques 3D natives sous Autodesk Revit intégrant toutes les disciplines du bâtiment (structure, fluides, architecture) pour éradiquer les conflits de chantier avant le premier coup de pioche."
      },
      {
        title: "Architecture Bioclimatique Tropicale",
        description: "Orientation calculée selon la course solaire équatoriale, brise-soleil verticaux et horizontaux, coursives d'ombrage et ventilation naturelle traversante pour un confort thermique passif sans surconsommation énergétique."
      },
      {
        title: "Assistance Maîtrise d'Ouvrage (AMO)",
        description: "Accompagnement rigoureux des investisseurs privés, promoteurs et entreprises : faisabilité technico-financière, respect des budgets d'objectifs et suivi méthodique des jalons."
      }
    ],
    services: [
      {
        title: "Études Préliminaires & Faisabilité Spatiale",
        description: "Analyse du site, topographie, contraintes d'ensoleillement et programmation volumétrique pour valider la rentabilité et la pertinence du terrain.",
        icon: "📐"
      },
      {
        title: "Modélisation Numérique BIM (LOD 200 à 350)",
        description: "Création de la maquette numérique complète, détection automatique des clashs et extraction des nomenclatures quantitatives exactes.",
        icon: "💻"
      },
      {
        title: "Plans d'Exécution & Carnets de Détails",
        description: "Plans de pose, coupes techniques, détails d'étanchéité et calepinages de façades indispensables aux corps d'état du gros œuvre.",
        icon: "📋"
      },
      {
        title: "Rendus 3D Photoréalistes & Vidéos d'Immersion",
        description: "Perspectives d'atmosphère de jour et de nuit, textures réelles et visites virtuelles pour séduire les investisseurs et acquéreurs.",
        icon: "✨"
      }
    ],
    deliverables: [
      {
        title: "Maquette Numérique BIM",
        format: "RVT / IFC 4.0",
        detail: "Fichier BIM paramétrique complet intégrant matériaux, réservations et niveaux."
      },
      {
        title: "Dossier de Plans d'Exécution",
        format: "PDF Vectoriel & DWG",
        detail: "Plans cotés à l'échelle, coupes transversales, élévations et détails constructifs."
      },
      {
        title: "Imagerie Photoréaliste Haute Résolution",
        format: "JPEG / PNG 4K",
        detail: "Perspectives intérieures et extérieures avec rendu des lumières naturelles."
      }
    ],
    deontologicalNote:
      "Important : Conformément à la loi camerounaise n° 90/039, les missions de maîtrise d'œuvre architecturale réglementées (dépôt de Permis de Construire, signature légale et direction de chantier) sont réalisées en partenariat obligatoire avec des confrères architectes inscrits au Tableau de l'ONAC.",
    relatedProjectSlugs: [
      "d-web-holding-tower",
      "immeuble-tonye",
      "hotel-de-bertoua",
      "residence-hunter",
      "residence-universitaire-soa"
    ]
  },

  "adp-studio": {
    id: "univ-02",
    slug: "adp-studio",
    number: "02",
    name: "ADP Studio",
    subtitle: "Design · Image de marque · Print",
    tagline: "Donner une présence visuelle inoubliable aux espaces et aux marques",
    materials: "Papier d'art vergé, marquage à chaud & cuivre satiné",
    accentColor: "#C59B53",
    symbol: "◈",
    description:
      "Identités visuelles haut de gamme, logotypes de prestige, chartes graphiques complètes et supports d'édition pour promoteurs immobiliers et marques ambitieuses.",
    philosophy:
      "Un grand bâtiment ou une marque de prestige mérite une signature graphique à la hauteur de son ambition spatiale. ADP Studio conçoit des identités visuelles pérennes, alliant géométrie rigoureuse, élégance typographique et narration authentique.",
    pillars: [
      {
        title: "Branding Immobilier & Programmes de Prestige",
        description: "Nom de programme, logotype emblématique, plaquette commerciale et signalétique pour valoriser vos investissements fonciers auprès des acquéreurs exigeants."
      },
      {
        title: "Identités d'Entreprise Durables",
        description: "Chartes graphiques complètes, systèmes typographiques, palettes chromatiques harmonisées et règles de déclinaison print et digital."
      },
      {
        title: "Édition & Supports d'Exception",
        description: "Rapports d'activité annuels, livres de marque (Brand Books), dossiers de présentation pour investisseurs et papeterie d'affaires de luxe."
      }
    ],
    services: [
      {
        title: "Création de Logotype & Emblème",
        description: "Recherche sémantique, esquisses vectorielles et livrables en formats maîtres tous supports (SVG, EPS, PDF vectoriel, PNG haute définition).",
        icon: "✒️"
      },
      {
        title: "Charte Graphique Complète (Brand Guidelines)",
        description: "Guide méthodologique détaillant les règles de composition, zones d'exclusion, typographies corporate et variantes de couleurs.",
        icon: "📖"
      },
      {
        title: "Brochures Commerciales & Plaquettes de Vente",
        description: "Mise en page éditoriale élégante mariant visuels 3D, plans de vente clairs et argumentaires percutants.",
        icon: "📑"
      },
      {
        title: "Signalétique Spatiale & Habillage Architectural",
        description: "Conception graphique des totems d'entrée, plaques de signalétique intérieure, marquages muraux et lettrages métalliques en relief.",
        icon: "🏢"
      }
    ],
    deliverables: [
      {
        title: "Brand Book & Normes Graphiques",
        format: "PDF Haute Définition",
        detail: "Document complet de 30 à 60 pages fixant l'intégralité des règles d'identité."
      },
      {
        title: "Pack Fichiers Vectoriels Maîtres",
        format: "AI, EPS, SVG, PNG",
        detail: "Tous formats pour impression grand format, broderie, enseignes et web."
      },
      {
        title: "Plaquette Commerciale d'Édition",
        format: "Fichiers prêts pour imprimeur",
        detail: "Fichiers certifiés CMJN avec repères de coupe, vernis sélectifs et gaufrage."
      }
    ],
    relatedProjectSlugs: ["workbox", "showroom-kotto", "le-bojolais-boj"]
  },

  "rosbri-design": {
    id: "univ-03",
    slug: "rosbri-design",
    number: "03",
    name: "Rosbri Wax Design",
    subtitle: "Haute Couture Wax · Architecture Textile",
    tagline: "L'élégance africaine au quotidien : quand la structure architecturale rencontre la noblesse du Wax",
    materials: "Wax hollandais grand teint, lin naturel & boutons en corne sculptée",
    accentColor: "#E07A5F",
    symbol: "✦",
    description:
      "Maison de création textile fondée sur la rencontre entre rigueur géométrique et motifs ancestraux africains. Pièces sur-mesure, collections capsules et mobilier textile.",
    philosophy:
      "Chez Rosbri Wax Design, le textile est abordé comme une façade vivante. Chaque motif de Wax est une trame géométrique porteuse d'histoire, chaque coupe est un exercice de volumétrie et de proportion. Nous sublimons l'art vestimentaire africain par une exigence de finition digne de la haute couture.",
    pillars: [
      {
        title: "Rigueur Géométrique & Volumes Structurés",
        description: "Des coupes nettes, des cols architecturés et des lignes affirmées qui sculptent la silhouette avec distinction et aisance."
      },
      {
        title: "Authenticité des Motifs & Matières Nobles",
        description: "Sélection exclusive de tissus Wax de haute qualité, cotons peignés et lins naturels teints dans le respect des traditions artisanales."
      },
      {
        title: "Sur-Mesure & Pièces Uniques",
        description: "Création personnalisée sur rendez-vous pour les cérémonies, galas et tenues de prestige du quotidien."
      }
    ],
    services: [
      {
        title: "Haute Couture Sur-Mesure",
        description: "Prise de mesures minutieuse, essayages d'ajustement et confection soignée par nos maîtres tailleurs et couturiers d'atelier.",
        icon: "✂️"
      },
      {
        title: "Collections Capsules Saisonnières",
        description: "Séries limitées de vestes, chemises d'apparat, robes sculptées et ensembles contemporains prêts-à-porter de prestige.",
        icon: "👗"
      },
      {
        title: "Design Textile d'Intérieur & Coussins d'Architecte",
        description: "Création de coussins, tentures murales et chemins de table associant Wax géométrique et mobilier contemporain.",
        icon: "🛋️"
      },
      {
        title: "Accessoires & Maroquinerie Textile",
        description: "Pochettes, étuis et cravates coordonnées en Wax pour une touche d'élégance discrète mais mémorable.",
        icon: "👜"
      }
    ],
    deliverables: [
      {
        title: "Pièce Vestimentaire Sur-Mesure",
        format: "Confection Atelier",
        detail: "Vêtement confectionné avec coutures anglaises, doublures respirantes et finitions main."
      },
      {
        title: "Certificat d'Authenticité Rosbri",
        format: "Document Scellé",
        detail: "Attestation de pièce unique ou de série limitée certifiant l'origine des tissus."
      },
      {
        title: "Housse de Protection & Guide d'Entretien",
        format: "Accessoire de Soin",
        detail: "Housse respirante et recommandations pour préserver l'éclat des couleurs Wax."
      }
    ],
    relatedProjectSlugs: ["le-bojolais-boj", "suka-cafe-terrasse"]
  },

  "adp-brief": {
    id: "univ-04",
    slug: "adp-brief",
    number: "04",
    name: "ADP Brief",
    subtitle: "Documents de Projet · CCTP & DPGF",
    tagline: "Sécuriser les chantiers et verrouiller les coûts par des pièces écrites irréprochables",
    materials: "Papier parchemin, encre carbone & reliure mécanique",
    accentColor: "#3D8B7A",
    symbol: "◈",
    description:
      "Rédaction experte de Cahiers des Clauses Techniques Particulières (CCTP), Décompositions du Prix Global et Forfaitaire (DPGF) et Dossiers de Consultation des Entreprises (DCE).",
    philosophy:
      "80 % des litiges et surcoûts sur les chantiers camerounais proviennent de devis imprécis et de pièces contractuelles lacunaires. ADP Brief protège les maîtres d'ouvrage et les constructeurs en traduisant chaque intention spatiale en prescriptions techniques univoques et métrés inattaquables.",
    pillars: [
      {
        title: "Zéro Ambiguïté Contractuelle",
        description: "Définition rigoureuse des tolérances d'exécution, des classes de béton, des normes de ferraillage et des méthodes d'application des revêtements."
      },
      {
        title: "Métrés Précis Issus du BIM",
        description: "Extraction directe des cubatures et surfaces à partir des maquettes Revit pour garantir une corrélation mathématique parfaite entre plans et devis."
      },
      {
        title: "Adéquation au Marché Camerounais",
        description: "Prise en compte des prix réels des matériaux locaux (sable Sanaga, ciments CEM II, aciers FeE500, bois locaux) pour des budgets réalistes."
      }
    ],
    services: [
      {
        title: "CCTP Tous Corps d'État (TCE)",
        description: "Rédaction détaillée des spécifications techniques pour le gros œuvre, la charpente, l'électricité, la plomberie et les finitions.",
        icon: "📑"
      },
      {
        title: "Cadres de Bordereau DPGF / DQE",
        description: "Tableaux quantitatifs pré-remplis permettant de mettre en concurrence équitable les entreprises de construction candidates.",
        icon: "📊"
      },
      {
        title: "Dossier de Consultation des Entreprises (DCE)",
        description: "Constitution du dossier complet d'appel d'offres : règlement de consultation, calendrier d'exécution et critères de sélection.",
        icon: "📁"
      },
      {
        title: "Audit de Devis d'Entreprises",
        description: "Analyse critique des offres reçues pour détecter les surévaluations, les postes oubliés et les risques d'avenants imprévus.",
        icon: "🔍"
      }
    ],
    deliverables: [
      {
        title: "Cahier CCTP Structuré",
        format: "Word / PDF Indexé",
        detail: "Document technique complet organisé par lot avec clauses de mise en œuvre."
      },
      {
        title: "Tableau DPGF Dynamique",
        format: "Excel / Calc Formulé",
        detail: "Tableur paramétré avec calculs automatiques des sous-totaux et TVA."
      },
      {
        title: "Rapport d'Analyse Comparative des Offres",
        format: "Synthèse Décisionnelle",
        detail: "Grille d'évaluation technique et financière pour éclairer le choix du constructeur."
      }
    ],
    relatedProjectSlugs: ["d-web-holding-tower", "immeuble-tonye", "base-industrielle-petrofor"]
  },

  "adp-lab": {
    id: "univ-05",
    slug: "adp-lab",
    number: "05",
    name: "ADP Lab",
    subtitle: "R&D Tropicale · Matériaux Locaux",
    tagline: "Expérimenter les solutions constructives d'avenir adaptées aux climats d'Afrique centrale",
    materials: "Terre crue stabilisée, bambou de forêt & composites biosourcés",
    accentColor: "#2E7D52",
    symbol: "▲",
    description:
      "Laboratoire d'expérimentation constructive dédié à la terre stabilisée (BTC), au bois camerounais, à la ventilation naturelle et aux technologies frugales.",
    philosophy:
      "Construire en Afrique tropicale avec les solutions standardisées des pays tempérés mène à des hérésies thermiques et écologiques. ADP Lab explore les potentiels immenses de nos ressources locales : terre latéritique, pouzzolane, essences de bois durables et circulation convective de l'air.",
    pillars: [
      {
        title: "Valorisation des Matériaux Géosourcés & Biosourcés",
        description: "Recherche sur la brique de terre compressée (BTC), les bétons de pouzzolane et les charpentes en bois d'ingénierie locale."
      },
      {
        title: "Simulations Thermiques Dynamiques Tropicales",
        description: "Modélisation de la chaleur rayonnante, de l'humidité relative et de l'écoulement des flux d'air pour concevoir des bâtiments frais sans climatiseur permanent."
      },
      {
        title: "Frugalité & Éco-Conception",
        description: "Minimisation de l'empreinte carbone constructive et réemploi intelligent des ressources disponibles dans le bassin du fleuve Congo."
      }
    ],
    services: [
      {
        title: "Étude d'Optimisation Bioclimatique de Projet",
        description: "Analyse des masques solaires, trajectoires des vents dominants et dimensionnement optimal des ouvertures.",
        icon: "☀️"
      },
      {
        title: "Formulation & Essais de Matériaux Locaux",
        description: "Accompagnement au choix des dosages terre-ciment-chaux pour la fabrication sur site de blocs de terre compressée.",
        icon: "🧱"
      },
      {
        title: "Prototypage Numérique & Éléments d'Ombrage",
        description: "Conception paramétrique de claustras géométriques en terre cuite ou béton fibré alliant esthétique et filtration lumineuse.",
        icon: "🔬"
      },
      {
        title: "Publications Techniques & Livres Blancs",
        description: "Partage en open-access de retours d'expérience et guides pratiques pour les praticiens de l'architecture tropicale.",
        icon: "📚"
      }
    ],
    deliverables: [
      {
        title: "Rapport d'Ingénierie Thermique Passive",
        format: "PDF Analytique avec Cartographies",
        detail: "Diagrammes de confort bioclimatique (Givoni) et calculs des débits de ventilation."
      },
      {
        title: "Fiche Technique de Prescription Éco-Matériaux",
        format: "Document de Spécification",
        detail: "Directives de fabrication et contrôles qualité pour briques de terre et enduits à la chaux."
      },
      {
        title: "Fichiers de Découpe & Gabarits de Claustras",
        format: "DXF / STEP / STL",
        detail: "Modèles numériques 3D pour la fabrication industrielle ou artisanale de moules."
      }
    ],
    relatedProjectSlugs: ["residence-universitaire-soa", "residence-hunter", "villa-owona"]
  },

  "adp-academy": {
    id: "univ-06",
    slug: "adp-academy",
    number: "06",
    name: "ADP Academy",
    subtitle: "Formation d'Élite BIM & Revit",
    tagline: "Transmettre l'excellence méthodologique aux ingénieurs, architectes et techniciens de demain",
    materials: "Écrans calibrés, carnets de notes reliés & stations de travail BIM",
    accentColor: "#E09F3E",
    symbol: "◈",
    description:
      "Formations professionnelles intensives sur Autodesk Revit, la coordination BIM, Dynamo et la production de plans d'exécution selon les normes internationales.",
    philosophy:
      "La maîtrise des outils numériques n'est pas une fin en soi, mais un catalyseur d'indépendance et d'excellence. ADP Academy forme les praticiens du bâtiment aux méthodes de travail collaboratives les plus exigeantes, éliminant les mauvaises pratiques de dessin 2D au profit d'une pensée spatiale rigoureuse.",
    pillars: [
      {
        title: "Pédagogie 100 % Orientée Projets Réels",
        description: "Pas d'exercices théoriques abstraits : nos apprenants travaillent sur de véritables dossiers de bâtiments collectifs et tertiaires camerounais."
      },
      {
        title: "Du Débutant au BIM Manager",
        description: "Des parcours progressifs adaptés aux étudiants, collaborateurs d'architectes, ingénieurs structure et chefs d'entreprises du BTP."
      },
      {
        title: "Mentorat Continu & Communauté d'Échange",
        description: "Accès à notre forum technique privé, revues de projets en direct et partage régulier de familles et de scripts d'automatisation."
      }
    ],
    services: [
      {
        title: "Revit Architecture : Fondamentaux & Bonnes Pratiques",
        description: "Prise en main de l'interface, modélisation des murs, dalles, toitures complexes, gestion des vues et mise en page de plans.",
        icon: "🎓"
      },
      {
        title: "Revit Perfectionnement & Familles Paramétriques",
        description: "Création de portes, fenêtres, garde-corps et composants 3D paramétriques intelligents adaptés aux contraintes du marché local.",
        icon: "⚡"
      },
      {
        title: "BIM Management & Coordination Spatiale",
        description: "Mise en place d'une convention BIM, gestion des liens IFC, détection de collisions sous Navisworks et travail en équipe centrale.",
        icon: "🤝"
      },
      {
        title: "Automatisation avec Dynamo pour Revit",
        description: "Initiation au visual scripting pour automatiser la numérotation des pièces, le calcul des surfaces et l'export des métrés.",
        icon: "⚙️"
      }
    ],
    deliverables: [
      {
        title: "Attestation de Formation Professionnelle ADP",
        format: "Certificat Numérique Sécurisé",
        detail: "Document officiel attestant des compétences acquises et des heures d'atelier réalisées."
      },
      {
        title: "Pack de Gabarits Revit Prêts à l'Emploi",
        format: "Gabarits .RTE & Familles .RFA",
        detail: "Gabarit de départ normalisé avec annotations, épaisseurs de lignes et cartouches d'agence."
      },
      {
        title: "Accès Privilégié aux Tutoriels Vidéo",
        format: "Espace Membre Privé",
        detail: "Accès illimité aux enregistrements des sessions et fiches de synthèse pas-à-pas."
      }
    ],
    relatedProjectSlugs: ["d-web-holding-tower", "immeuble-tonye"]
  },

  "adp-tools": {
    id: "univ-07",
    slug: "adp-tools",
    number: "07",
    name: "ADP Tools",
    subtitle: "Outils Digitaux & Familles Revit",
    tagline: "Des solutions logicielles et bibliothèques techniques conçues pour accélérer la production",
    materials: "Code source compilé, métadonnées IFC & connecteurs d'API spatiales",
    accentColor: "#457B9D",
    symbol: "▰",
    description:
      "Bibliothèque de familles Revit paramétriques, scripts Dynamo d'automatisation et connecteurs logiciels novateurs (dont le moteur spatial ADP Revit Connector).",
    philosophy:
      "Pourquoi réinventer la roue sur chaque projet ? ADP Tools capitalise des années d'expérience en chantier et en agence dans des outils prêts à l'emploi qui permettent aux professionnels d'économiser des centaines d'heures de travail répétitif.",
    pillars: [
      {
        title: "Familles Paramétriques Normalisées",
        description: "Des fenêtres à lames persiennes, des portes à imposte d'aération, des claustras et des réservations de gaines conçues pour le contexte africain."
      },
      {
        title: "Scripts Dynamo & Automatisations Pratiques",
        description: "Automatisation instantanée des tâches fastidieuses : renommage de feuilles, vérification d'altimétries, calcul automatique de SHON/SHOB."
      },
      {
        title: "Connecteurs & Moteurs Spatiaux Avancés",
        description: "Recherche active sur le pont Revit MCP (AdpSpatialPreview) permettant l'interopérabilité directe entre intelligence artificielle et maquette BIM."
      }
    ],
    services: [
      {
        title: "Bibliothèque de Familles Revit Tropicales (.RFA)",
        description: "Objets paramétriques légers, géométriquement précis et dotés des propriétés IFC pour des exports sans perte.",
        icon: "📦"
      },
      {
        title: "Boîte à Outils Scripts Dynamo (.DYN)",
        description: "Routines d'optimisation testées en agence pour nettoyer les maquettes et accélérer la mise en conformité des livrables.",
        icon: "⚡"
      },
      {
        title: "Gabarits de Projet Normalisés (.RTE)",
        description: "Templates de démarrage avec styles d'objets, filtres de vue, cartouches et nomenclatures automatisées clé-en-main.",
        icon: "📐"
      },
      {
        title: "Développement d'Add-ins & Connecteurs sur-mesure",
        description: "Conception de plugins C# / .NET et connecteurs API sur-mesure pour agences d'architecture et bureaux d'études.",
        icon: "🔌"
      }
    ],
    deliverables: [
      {
        title: "Package Complet de Composants Paramétriques",
        format: "Archive ZIP de familles .RFA",
        detail: "Plus de 150 composants optimisés avec catalogue de types et guide d'intégration."
      },
      {
        title: "Bibliothèque de Scripts Dynamo Commentés",
        format: "Fichiers .DYN et nœuds personnalisés",
        detail: "Scripts prêts à l'exécution avec documentation des entrées/sorties requises."
      },
      {
        title: "Mises à Jour Régulières & Support Technique",
        format: "Support & Mises à niveau annuelles",
        detail: "Compatibilité assurée avec les versions récentes d'Autodesk Revit (2022 à 2026)."
      }
    ],
    relatedProjectSlugs: ["d-web-holding-tower", "base-industrielle-petrofor"]
  }
};
