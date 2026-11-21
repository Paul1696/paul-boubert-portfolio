import fs from 'fs';

const content = `/**
 * Catalogue des Articles & Publications de l'Atelier
 * Les Ateliers de Paul — Conforme aux Étapes 08, 09 et 11
 */

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Recherche Tropicale' | 'BIM & Digital' | 'Architecture' | 'Textile & Wax' | 'Vie d\'Atelier';
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  status: 'published' | 'draft' | 'scheduled';
  coverImage: string;
  coverCaption?: string;
  tags: string[];
  universeId?: string;
  relatedProjects?: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      callout?: string;
    }[];
    conclusion: string;
  };
  socialCampaign: {
    linkedin: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
    newsletter: string;
  };
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-001',
    slug: 'inertie-thermique-terre-crue-climat-tropical',
    title: 'Inertie thermique et Terre Crue en climat équatorial : Le BTC comme matière d\'avenir',
    category: 'Recherche Tropicale',
    excerpt: 'Retour sur nos protocoles d\'essais sur les Blocs de Terre Comprimée (BTC) stabilisés : comment l\'hygrométrie et le déphasage thermique transforment le confort passif.',
    readingTime: '6 min',
    publishedAt: '2026-03-15',
    updatedAt: '2026-04-10',
    author: {
      name: 'Paul Boubert',
      role: 'Directeur de Création & Chercheur Matériaux',
      avatar: '/assets/media/identities/adp-lab.webp'
    },
    status: 'published',
    coverImage: '/assets/media/projects/PROJ_004/gallery_1.webp',
    coverCaption: 'Mise en œuvre d\'appareillages en briques de terre comprimée et ventilation traversante.',
    tags: ['Terre Crue', 'BTC', 'Bioclimatique', 'ADP Lab', 'Inertie'],
    universeId: 'adp-lab',
    relatedProjects: ['PROJ_004', 'PROJ_012'],
    content: {
      intro: 'Sous les latitudes équatoriales et subéquatoriales, l\'enjeu thermique n\'est pas de retenir la chaleur, mais de réguler les amplitudes jour/nuit tout en garantissant une respiration naturelle des parois sans recours systématique à la climatisation électromécanique.',
      sections: [
        {
          heading: '1. La physique du déphasage sous 85% d\'humidité',
          body: [
            'Le bloc de terre comprimée (BTC) possède une capacité thermique volumique et une diffusivité qui ralentissent la progression de l\'onde de chaleur diurne de 8 à 11 heures selon l\'épaisseur de mur mise en œuvre (20 à 30 cm).',
            'Contrairement au parpaing de béton creux conventionnel qui rayonne la chaleur emmagasinée directement à l\'intérieur dès 14h, le mur en terre restitue les calories vers l\'extérieur lors du rafraîchissement nocturne, favorisé par la ventilation traversante.'
          ],
          callout: 'Déphasage mesuré en atelier : 9h45 pour une paroi de 22 cm avec stabilisation chaux/ciment à 6%.'
        },
        {
          heading: '2. Stabilisation raisonnée et bilan carbone',
          body: [
            'Dans le cadre des recherches menées par ADP Lab, nous privilégions des formulations locales utilisant les sols latéritiques prélevés à proximité immédiate du chantier.',
            'L\'ajout de liant est minutieusement dosé (4 à 7% maximum) pour résister aux pluies torrentielles sans altérer les facultés hygroscopiques exceptionnelles de la terre crue.'
          ]
        }
      ],
      conclusion: 'La construction minérale contemporaine en Afrique centrale ne peut se contenter de répliquer des standards occidentaux inadaptés. L\'alliance du matériau vernaculaire et de la précision d\'ingénierie moderne est le cœur battant de notre engagement.'
    },
    socialCampaign: {
      linkedin: '🌿 Pourquoi la terre crue est-elle la réponse aux défis thermiques en zone tropicale ? Nos résultats d\'essais sur le BTC : déphasage de 9h45 et confort passif sans climatisation. Découvrez l\'article complet sur Les Ateliers de Paul.',
      instagram: 'Matière en mouvement. La terre crue stabilisée sous la loupe d\'ADP Lab. Précision minérale et confort passif. 🔗 Lien en bio.',
      facebook: 'Le retour de la terre crue : découvrez notre dossier technique sur les blocs de terre comprimée pour un habitat sain et durable en Afrique.',
      whatsapp: 'Bonjour, voici notre dernière publication technique sur l\'inertie thermique et le BTC en zone tropicale : https://ateliersdepaul.com/actualites/inertie-thermique-terre-crue-climat-tropical',
      newsletter: 'Dans cette édition d\'atelier, Paul Boubert détaille la recherche menée au sein d\'ADP Lab sur le déphasage thermique des maçonneries en terre comprimée.'
    }
  },
  {
    id: 'art-002',
    slug: 'le-bim-collaboratif-en-pratique-architecturale',
    title: 'Le BIM collaboratif au service de la maîtrise d\'œuvre en Afrique centrale',
    category: 'BIM & Digital',
    excerpt: 'Comment la synthèse numérique 3D et le standard IFC permettent de sécuriser les budgets, fiabiliser les quantitatifs et coordonner les corps d\'état sur les projets complexes.',
    readingTime: '5 min',
    publishedAt: '2026-02-20',
    author: {
      name: 'Paul Boubert',
      role: 'Directeur de Création & Spécialiste BIM',
      avatar: '/assets/media/identities/adp-project.webp'
    },
    status: 'published',
    coverImage: '/assets/media/projects/PROJ_001/gallery_1.webp',
    coverCaption: 'Modélisation LOD 350 et détection des collisions structure/fluides.',
    tags: ['BIM', 'Revit', 'IFC', 'Coordination', 'ADP Project'],
    universeId: 'adp-project',
    relatedProjects: ['PROJ_001', 'PROJ_005'],
    content: {
      intro: 'La maquette numérique n\'est pas une simple image en trois dimensions : c\'est une base de données spatiale vivante qui anticipe les aléas de chantier avant même le premier coup de pioche.',
      sections: [
        {
          heading: '1. La détection des conflits en amont',
          body: [
            'Sur un projet de complexe hôtelier ou de siège institutionnel, les interférences entre gaines de fluides, poutres béton et réseaux d\'évacuation représentent 70% des surcoûts imprévus sur chantier.',
            'Grâce à la modélisation BIM coordonnée au niveau de détail LOD 300/350, ces collisions sont résolues en phase de conception.'
          ]
        },
        {
          heading: '2. Fiabilité des métrés et quantitatifs',
          body: [
            'L\'extraction automatique des volumes de béton, des surfaces de coffrage et des linéaires d\'armatures supprime l\'approximation des devis estimatifs et offre au maître d\'ouvrage une visibilité financière totale.'
          ]
        }
      ],
      conclusion: 'Le BIM n\'est pas réservé aux mégaprojets internationaux : adapté avec méthode, il est le garant de la rigueur et de l\'élégance constructive pour tous nos chantiers.'
    },
    socialCampaign: {
      linkedin: '🏗️ Modélisation 3D vs Réalité chantier : comment la synthèse BIM évite les surcoûts d\'exécution. Retour d\'expérience au sein d\'ADP Project.',
      instagram: 'Précision numérique, rigueur constructive. La maquette BIM sous tous ses angles. 📐✨',
      facebook: 'Comment sécuriser un chantier grâce à la maquette numérique ? Notre approche détaillée dans le journal des Ateliers.',
      whatsapp: 'Notre dossier BIM collaboratif et maîtrise d\'œuvre est en ligne : https://ateliersdepaul.com/actualites/le-bim-collaboratif-en-pratique-architecturale',
      newsletter: 'BIM & Synthèse : pourquoi nous modélisons chaque composant avant la pose. Découvrez notre méthodologie.'
    }
  },
  {
    id: 'art-003',
    slug: 'rosbri-wax-design-noblesse-textile-contemporaine',
    title: 'Rosbri Wax Design : Quand le textile africain rencontre la géométrie architecturale',
    category: 'Textile & Wax',
    excerpt: 'Exploration de nos collections textiles où les motifs traditionnels wax sont réinterprétés dans un dialogue subtil avec les lignes épurées et les textures minérales.',
    readingTime: '4 min',
    publishedAt: '2026-01-28',
    author: {
      name: 'Les Ateliers de Paul',
      role: 'Studio Rosbri Wax Design',
      avatar: '/assets/media/identities/rosbri-wax-design.webp'
    },
    status: 'published',
    coverImage: '/assets/media/projects/PROJ_008/cover.webp',
    coverCaption: 'Drapé et contrastes chromatiques de la collection capsule Rosbri.',
    tags: ['Wax', 'Textile', 'Rosbri', 'Design', 'Création'],
    universeId: 'rosbri-wax-design',
    relatedProjects: ['PROJ_008'],
    content: {
      intro: 'Le textile n\'est pas un accessoire : dans la spatialité africaine, il habille le corps, délimite les seuils, filtre la lumière et raconte des lignées.',
      sections: [
        {
          heading: '1. Une partition géométrique singulière',
          body: [
            'Rosbri Wax Design prend racine dans la réinterprétation des motifs emblématiques du patrimoine wax hollandais et africain, en les confrontant aux cadrages rigoureux de l\'architecture contemporaine.',
            'Les vibrations des couleurs chaudes dialoguent avec les gris calmes de la pierre et la patine du bronze.'
          ]
        }
      ],
      conclusion: 'Chaque pièce est pensée comme un pont entre la tradition artisanale de confection et une vision d\'élégance universelle.'
    },
    socialCampaign: {
      linkedin: '🎨 Quand le design textile inspire l\'aménagement d\'espace : découvrez l\'univers créatif de Rosbri Wax Design au sein des Ateliers de Paul.',
      instagram: 'Couleurs vibrantes, coupes architecturales. Rosbri Wax Design réinvente la silhouette contemporaine. 🌺📐',
      facebook: 'L\'art du wax revisité par Les Ateliers de Paul : découvrez notre manifeste créatif.',
      whatsapp: 'Découvrez la vision de Rosbri Wax Design : https://ateliersdepaul.com/actualites/rosbri-wax-design-noblesse-textile-contemporaine',
      newsletter: 'Focus création : l\'univers textile Rosbri Wax Design s\'ouvre dans notre carnet de bord.'
    }
  },
  {
    id: 'art-004',
    slug: 'transmission-pedagogique-adp-academy-2026',
    title: 'Transmettre la rigueur du geste : L\'ambition d\'ADP Academy',
    category: 'Vie d\'Atelier',
    excerpt: 'Former les futures générations de projeteurs, modélisateurs et créateurs aux standards internationaux sans jamais les couper de leurs racines territoriales.',
    readingTime: '4 min',
    publishedAt: '2026-04-02',
    author: {
      name: 'Paul Boubert',
      role: 'Fondateur',
      avatar: '/assets/media/identities/adp-academy.webp'
    },
    status: 'published',
    coverImage: '/assets/media/projects/PROJ_002/gallery_1.webp',
    coverCaption: 'Session de mentorat technique et transmission en atelier.',
    tags: ['Formation', 'Academy', 'Mentorat', 'Transmission'],
    universeId: 'adp-academy',
    content: {
      intro: 'Un savoir qui ne se transmet pas s\'éteint. Dès l\'origine des Ateliers de Paul, la vocation pédagogique a été inscrite au même rang que la production technique.',
      sections: [
        {
          heading: '1. Le pont entre théorie universitaire et réalité constructive',
          body: [
            'Trop souvent, les jeunes diplômés maîtrisent les outils informatiques sans comprendre la réalité du comportement d\'un matériau sur chantier.',
            'ADP Academy structure des modules intensifs de perfectionnement où chaque commande de dessin est reliée à un geste d\'artisan et à une responsabilité normative.'
          ]
        }
      ],
      conclusion: 'Élever les compétences locales est le plus bel investissement pour l\'avenir de notre cadre bâti.'
    },
    socialCampaign: {
      linkedin: '🎓 Comment former les talents de demain aux exigences du BIM et de l\'architecture durable ? Découvrez le programme ADP Academy.',
      instagram: 'La transmission au cœur de l\'atelier. Former, guider, propulser. 🚀🏛️',
      facebook: 'ADP Academy : les inscriptions à nos sessions de perfectionnement technique sont ouvertes.',
      whatsapp: 'Découvrez les engagements de formation d\'ADP Academy : https://ateliersdepaul.com/actualites/transmission-pedagogique-adp-academy-2026',
      newsletter: 'Former pour durer : Paul Boubert présente les nouveaux parcours de l\'Academy.'
    }
  }
];

export function getPublishedArticles(): EditorialArticle[] {
  return EDITORIAL_ARTICLES.filter(a => a.status === 'published');
}

export function getArticleBySlug(slug: string): EditorialArticle | undefined {
  return EDITORIAL_ARTICLES.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): EditorialArticle[] {
  return EDITORIAL_ARTICLES.filter(a => a.slug !== currentSlug && a.status === 'published').slice(0, limit);
}
`;

fs.writeFileSync('src/data/articles.ts', content, 'utf8');
console.log('src/data/articles.ts ecrit avec succes !');
