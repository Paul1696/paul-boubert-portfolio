/**
 * ADP WEB EXPERIENCE — Types pour le Catalogue Commercial ADP Studio 2026
 * Modèle de données générique, extensible et compatible avec le moteur de devis.
 */

export type StudioFamilyId =
  | "cartes-visite"
  | "identite-visuelle"
  | "supports-edition"
  | "signaletique"
  | "textile-image"
  | "infographie-immobiliere";

export type ConfigOptionType = "select" | "radio" | "pills" | "counter";

export interface ConfigOptionChoice {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  isDefault?: boolean;
}

export interface ConfigOptionGroup {
  id: string;
  label: string;
  type: ConfigOptionType;
  choices: ConfigOptionChoice[];
  defaultValue?: string | number;
  helperText?: string;
}

export interface StudioSubCategory {
  id: string;
  slug: string;
  name: string;
  familyId: StudioFamilyId;
  description: string;
}

export interface StudioFamily {
  id: StudioFamilyId;
  slug: string;
  name: string;
  shortDescription: string;
  icon: string;
  accentColor: string;
  subCategoryIds: string[];
}

export interface StudioArtworkSpecs {
  formats: string[];
  colorProfile: string;
  resolution: string;
  bleeds: string;
  safetyMargin: string;
  vectorizationRequirement: string;
  notes?: string;
}

export interface StudioProductMedia {
  coverImage: string;
  gallery: string[];
  isAuthenticMedia: boolean;
  caption?: string;
}

export interface StudioProduct {
  id: string; // Identifiant pérenne (ex: "studio-brand-identity", "studio-cartes-digitales")
  slug: string; // Slug URL (ex: "cartes-visite-connectees-adp-digital")
  name: string;
  subtitle: string;
  familyId: StudioFamilyId;
  subCategoryId: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  materials: string[];
  finishes: string[];
  dimensions: string[];
  quantities: number[];
  turnaround: string; // Délais définis en atelier ou "Sur étude d'atelier"
  pricingNotice: string; // Mention transparente sans prix arbitraire inventé
  artworkSpecs: StudioArtworkSpecs;
  configurationOptions: ConfigOptionGroup[];
  media: StudioProductMedia;
  relatedProjectSlugs: string[];
  digitalCardBridge?: boolean; // Lien spécifique vers le module ADP Digital Cards (/c)
  isPopular?: boolean;
  isNew?: boolean;
  status: "complete" | "to_enrich"; // Statut de complétude éditoriale
}

export interface StudioFilterState {
  searchQuery: string;
  selectedFamily: StudioFamilyId | "all";
  selectedSubCategory: string | "all";
  sortBy: "popular" | "name" | "recent";
}
