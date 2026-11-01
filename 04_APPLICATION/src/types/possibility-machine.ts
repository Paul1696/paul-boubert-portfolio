/**
 * ADP WEB EXPERIENCE — Typage du Moteur « The Possibility Machine »
 * Structure de données séparée préparant la gestion dynamique via Payload CMS
 */

export interface Universe {
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
  targetRoute: string;
}

export interface Intention {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accentColor: string;
  connectedUniverseSlugs: string[];
  suggestedAction: {
    label: string;
    targetSection: string;
  };
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  universeSlug: string;
  location: string;
  year: string;
  specs: string;
  accentColor: string;
  symbol: string;
  excerpt: string;
  badge: string;
  isVerifiedLegacy: boolean;
}

export interface ContactChannel {
  id: string;
  name: string;
  actionText: string;
  description: string;
  icon: string;
  url: string;
  badge?: string;
  isExternal: boolean;
}
