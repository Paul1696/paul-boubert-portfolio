/**
 * ADP WEB EXPERIENCE — Types pour le Moteur de Devis & Cadrage de Projet
 * Architecture cible : Compatible Payload CMS 3.0 (collections `quote_requests` et `quote_items`)
 * et base relationnelle PostgreSQL.
 */

export type QuoteStatus =
  | "brouillon_local"               // Sélection en cours dans le navigateur (LocalStorage)
  | "enregistree"                   // Enregistrée dans PostgreSQL via POST /api/quotes (Infrastructure serveur)
  | "enregistre_serveur"           // Synchrone avec serveur
  | "ouverture_whatsapp_proposee"   // Lien wa.me ouvert dans l'application / onglet du visiteur
  | "envoyee_declaree";             // Le visiteur a confirmé avoir validé l'envoi dans WhatsApp

export type PreferredContactChannel = "whatsapp" | "email" | "telephone";

export type ProjectTimeline =
  | "urgent"       // < 1 mois
  | "court_terme"  // 1 à 3 mois
  | "moyen_terme"  // 3 à 6 mois
  | "exploration"; // Phase de cadrage préliminaire

export type ProjectStage =
  | "esquisse"      // Idée initiale / Terrain vierge
  | "faisabilite"   // Étude de faisabilité en cours
  | "permis"        // Permis de construire à déposer ou déposé
  | "execution"     // Projet prêt pour exécution / Chantier
  | "rehabilitation"// Rénovation / Réhabilitation
  | "autre";

export interface QuoteServiceVariant {
  id: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface QuoteCatalogItem {
  id: string;
  universeId: string;
  universeName: string;
  universeColor: string;
  universeSymbol: string;
  title: string;
  shortDescription: string;
  category: string;
  variants: QuoteServiceVariant[];
  defaultVariantId: string;
  pricingNotice: string; // Ex: "Sur étude d'atelier / Devis personnalisé"
}

export interface QuoteItem {
  id: string;                    // Identifiant unique dans le panier (ex: item-1730460000)
  catalogItemId: string;         // Référence au catalogue (ex: "proj-bim-lod")
  universeId: string;
  universeName: string;
  universeColor: string;
  serviceTitle: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  customNotes?: string;
}

export interface ProjectScoping {
  primaryUniverse: string;       // Univers dominant (ex: "adp-project")
  programmeType?: string;        // Résidentiel, Tertiaire, Équipement, Textile, Formation...
  estimatedSurface?: string;     // Ex: "< 150 m²", "150 - 500 m²", "500 - 2 000 m²", "> 2 000 m²"
  projectStage?: ProjectStage;
  targetTimeline?: ProjectTimeline;
  locationCity?: string;         // Douala, Yaoundé, Kribi, Autre ville Cameroun, International
  specificNeeds?: string[];      // Tags de besoins spécifiques
}

export interface ClientContact {
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  preferredChannel: PreferredContactChannel;
  description: string;
}

export interface QuoteDraft {
  referenceId: string;           // Ex: "DEV-LOCAL-202611-042"
  createdAt: string;
  updatedAt: string;
  status: QuoteStatus;
  items: QuoteItem[];
  scoping: ProjectScoping;
  contact: ClientContact;
}

export interface QuoteValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  description?: string;
  items?: string;
}
