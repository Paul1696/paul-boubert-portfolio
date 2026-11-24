/**
 * ADP WEB EXPERIENCE — Types pour le Panier Multi-Produits, Commandes & Circuit BAT
 * Standard d'atelier pour l'ensemble des 7 univers d'ADP.
 */

export type OrderDeliveryMode =
  | "atelier_pickup"          // Retrait gratuit à l'Atelier ADP (Douala - Bonapriso)
  | "courrier_douala"         // Coursier sécurisé express Douala (intra-muros)
  | "courrier_yaounde"        // Expédition express Yaoundé
  | "shipping_other";         // Expédition régionale, nationale ou internationale

export type OrderStatus =
  | "brouillon_panier"        // Dans le navigateur du visiteur (LocalStorage)
  | "commande_soumise"        // Reçue sur serveur, en attente de prise en charge
  | "en_cours_verification"   // Vérification PAO et épreuve d'atelier
  | "bat_en_attente_client"   // Bon À Tirer (BAT) émis, en attente de signature/validation
  | "bat_valide_client"       // BAT approuvé formellement par le client
  | "en_production"           // Façonnage, tirage ou confection en atelier
  | "expediee"                // En cours d'acheminement / mise à disposition
  | "livree_cloturee"         // Commande livrée et validée
  | "annulee";

export type BATDecision = "en_attente" | "approuve" | "corrections_demandees";

export interface BATRecord {
  id: string;
  version: number;
  previewUrl?: string;
  pdfUrl?: string;
  createdAt: string;
  decision: BATDecision;
  decisionDate?: string;
  clientComments?: string;
  technicianNotes?: string;
}

export interface CartItem {
  id: string; // ID unique de ligne dans le panier (ex: item-1730000000)
  productId: string;
  productSlug: string;
  productName: string;
  familyId: string;
  universeName: string;
  coverImage: string;
  selectedOptions: { [optionGroupId: string]: string };
  selectedOptionLabels: { [optionGroupLabel: string]: string };
  quantity: number;
  needsDesignService: boolean;
  clientFileName?: string;
  clientFileUrl?: string;
  customNotes?: string;
  // Données financières calculées
  isCustomQuote: boolean;
  unitPriceXAF: number | null;
  totalPriceXAF: number | null;
  pricingNotice: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  organization?: string;
  phone: string; // WhatsApp prioritaire
  email: string;
  city: string;
  country: string;
  deliveryAddress?: string;
}

export interface OrderRecord {
  reference: string; // Format unique: CMD-2026-XXXX
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  deliveryMode: OrderDeliveryMode;
  customer: OrderCustomerInfo;
  items: CartItem[];
  // Synthèse financière
  totalItemsCount: number;
  totalProductsXAF: number;
  totalDeliveryXAF: number;
  grandTotalXAF: number | null; // null si un article est sur devis
  hasCustomQuoteItems: boolean;
  // Workflow BAT
  currentBATVersion: number;
  batHistory: BATRecord[];
  notesProduction?: string;
}

export interface CartDraft {
  referenceId: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  deliveryMode: OrderDeliveryMode;
  createdAt: string;
  updatedAt: string;
}
