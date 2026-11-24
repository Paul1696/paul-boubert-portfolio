import { ProductPricingRule } from "@/types/pricing";
import { OrderDeliveryMode } from "@/types/cart";

export const CURRENCY_RATES = {
  XAF: 1,
  EUR: 1 / 655.957, // Taux fixe officiel Zone Franc BEAC
  USD: 1 / 610.0,   // Taux indicatif de référence
};

export const DELIVERY_FEES_XAF: Record<string, number> = {
  atelier_pickup: 0,        // Retrait gratuit à l'Atelier Bonapriso
  courrier_douala: 2500,    // Coursier express Douala intra-muros
  courrier_yaounde: 5000,   // Acheminement sécurisé Yaoundé
  shipping_other: 10000,    // Régions & expédition internationale (forfait indicatif)
};

export const DELIVERY_LABELS: Record<string, string> = {
  atelier_pickup: "Retrait convenu sur rendez-vous d'atelier (Douala - Bonapriso — Gratuit)",
  courrier_douala: "Livraison par coursier sécurisé (Douala intra-muros — 2 500 FCFA)",
  courrier_yaounde: "Acheminement et livraison sécurisée (Yaoundé — 5 000 FCFA)",
  shipping_other: "Expédition régionale ou internationale (Sur devis transporteur — à partir de 10 000 FCFA)",
};

/**
 * Grille de tarification officielle d'atelier pour le catalogue ADP Studio 2026.
 * Règle d'or : Les prix renseignés sont issus des barèmes de tirage réels.
 * Tout produit sans barème validé est configuré en 'bespoke_quote' (Devis personnalisé).
 */
export const STUDIO_PRICING_RULES: Record<string, ProductPricingRule> = {
  // 1. Cartes Connectées ADP Digital Cards
  "studio-cartes-digitales": {
    productId: "studio-cartes-digitales",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tarif atelier validé 2026 (Impression physique + Profil web permanent)",
    defaultDesignFeeXAF: 15000,
    minimumOrderQuantity: 100,
    tiers: [
      { minQuantity: 100, unitPriceXAF: 350, label: "Tirage initial (100 ex) — 35 000 FCFA" },
      { minQuantity: 250, unitPriceXAF: 240, discountPercentage: 31, label: "Série entreprise (250 ex) — 60 000 FCFA" },
      { minQuantity: 500, unitPriceXAF: 190, discountPercentage: 45, label: "Série corporate (500 ex) — 95 000 FCFA" },
      { minQuantity: 1000, unitPriceXAF: 160, discountPercentage: 54, label: "Grand compte (1 000 ex) — 160 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "finition-prestige", choiceId: "dorure-chaud", surchargeType: "fixed", amountXAF: 15000, label: "Dorure à chaud (Or mat / Cuivre satiné)" },
      { optionId: "finition-prestige", choiceId: "vernis-3d", surchargeType: "fixed", amountXAF: 12000, label: "Vernis Sélectif UV 3D relief" },
      { optionId: "support-matiere", choiceId: "papier-700g-duplex", surchargeType: "fixed", amountXAF: 20000, label: "Contrecollage Duplex 700g tranche colorée" },
    ],
  },

  // 2. Cartes de Visite Prestige Papier d'Art
  "studio-cartes-prestige": {
    productId: "studio-cartes-prestige",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tarif atelier validé 2026",
    defaultDesignFeeXAF: 15000,
    minimumOrderQuantity: 100,
    tiers: [
      { minQuantity: 100, unitPriceXAF: 300, label: "100 ex — 30 000 FCFA" },
      { minQuantity: 250, unitPriceXAF: 200, discountPercentage: 33, label: "250 ex — 50 000 FCFA" },
      { minQuantity: 500, unitPriceXAF: 170, discountPercentage: 43, label: "500 ex — 85 000 FCFA" },
      { minQuantity: 1000, unitPriceXAF: 140, discountPercentage: 53, label: "1 000 ex — 140 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "dorure-frappe", choiceId: "dorure-or", surchargeType: "fixed", amountXAF: 15000, label: "Dorure à chaud Or / Cuivre" },
      { optionId: "dorure-frappe", choiceId: "gaufrage-relief", surchargeType: "fixed", amountXAF: 15000, label: "Gaufrage à sec" },
      { optionId: "grammage-papier", choiceId: "grammage-700g", surchargeType: "fixed", amountXAF: 20000, label: "Contrecollage Triplex 700g" },
    ],
  },

  // 3. Badges et Cartes PVC Rigides
  "studio-badges-pvc": {
    productId: "studio-badges-pvc",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "indicatif",
    pricingNotice: "Tarif atelier validé 2026",
    defaultDesignFeeXAF: 10000,
    minimumOrderQuantity: 50,
    tiers: [
      { minQuantity: 50, unitPriceXAF: 700, label: "50 badges — 35 000 FCFA" },
      { minQuantity: 100, unitPriceXAF: 600, discountPercentage: 14, label: "100 badges — 60 000 FCFA" },
      { minQuantity: 250, unitPriceXAF: 500, discountPercentage: 28, label: "250 badges — 125 000 FCFA" },
      { minQuantity: 500, unitPriceXAF: 420, discountPercentage: 40, label: "500 badges — 210 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "accessoires-badge", choiceId: "tour-cou-mousqueton", surchargeType: "per_unit", amountXAF: 500, label: "Tour de cou satiné avec mousqueton" },
      { optionId: "accessoires-badge", choiceId: "attache-aimantee", surchargeType: "per_unit", amountXAF: 600, label: "Attache magnétique invisible" },
    ],
  },

  // 4. Polos Brodés Signature Atelier
  "studio-polos-atelier": {
    productId: "studio-polos-atelier",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tarif confection & broderie haute densité 2026",
    defaultDesignFeeXAF: 10000,
    minimumOrderQuantity: 10,
    tiers: [
      { minQuantity: 10, unitPriceXAF: 9500, label: "10 polos — 95 000 FCFA (9 500 FCFA/pc)" },
      { minQuantity: 25, unitPriceXAF: 8500, discountPercentage: 10, label: "25 polos — 212 500 FCFA (8 500 FCFA/pc)" },
      { minQuantity: 50, unitPriceXAF: 7500, discountPercentage: 21, label: "50 polos — 375 000 FCFA (7 500 FCFA/pc)" },
      { minQuantity: 100, unitPriceXAF: 6500, discountPercentage: 31, label: "100 polos — 650 000 FCFA (6 500 FCFA/pc)" },
    ],
    optionSurcharges: [
      { optionId: "emplacements-broderie", choiceId: "coeur-dos", surchargeType: "per_unit", amountXAF: 1800, label: "Broderie Poitrine + Grand Dos" },
      { optionId: "emplacements-broderie", choiceId: "coeur-dos-manche", surchargeType: "per_unit", amountXAF: 2500, label: "Broderie Poitrine + Dos + Manche" },
    ],
  },

  // 5. Chemises d'Affaires Brodées Atelier
  "studio-chemises-affaires": {
    productId: "studio-chemises-affaires",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tarif popeline d'affaires & broderie fine 2026",
    defaultDesignFeeXAF: 10000,
    minimumOrderQuantity: 10,
    tiers: [
      { minQuantity: 10, unitPriceXAF: 14000, label: "10 chemises — 140 000 FCFA (14 000 FCFA/pc)" },
      { minQuantity: 25, unitPriceXAF: 12500, discountPercentage: 11, label: "25 chemises — 312 500 FCFA (12 500 FCFA/pc)" },
      { minQuantity: 50, unitPriceXAF: 11000, discountPercentage: 21, label: "50 chemises — 550 000 FCFA (11 000 FCFA/pc)" },
    ],
    optionSurcharges: [],
  },

  // 6. Dépliants & Flyers d'Architecture 3 Volets (Nouveau Produit Réf 17)
  "studio-depliants-plaquettes-3volets": {
    productId: "studio-depliants-plaquettes-3volets",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tarif impression quadri & rainage mécanique 2026",
    defaultDesignFeeXAF: 25000,
    minimumOrderQuantity: 250,
    tiers: [
      { minQuantity: 250, unitPriceXAF: 180, label: "250 ex — 45 000 FCFA" },
      { minQuantity: 500, unitPriceXAF: 150, discountPercentage: 16, label: "500 ex — 75 000 FCFA" },
      { minQuantity: 1000, unitPriceXAF: 120, discountPercentage: 33, label: "1 000 ex — 120 000 FCFA" },
      { minQuantity: 2500, unitPriceXAF: 90, discountPercentage: 50, label: "2 500 ex — 225 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "finition-pelliculage", choiceId: "soft-touch", surchargeType: "fixed", amountXAF: 15000, label: "Pelliculage Soft-Touch mat soyeux" },
    ],
  },

  // 7. Affiches Posters d'Exposition A2 / A1 (Nouveau Produit Réf 18)
  "studio-affiches-grand-format": {
    productId: "studio-affiches-grand-format",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Tirage grand format haute fidélité 2026",
    defaultDesignFeeXAF: 15000,
    minimumOrderQuantity: 5,
    tiers: [
      { minQuantity: 5, unitPriceXAF: 4000, label: "5 affiches — 20 000 FCFA" },
      { minQuantity: 10, unitPriceXAF: 3500, discountPercentage: 12, label: "10 affiches — 35 000 FCFA" },
      { minQuantity: 25, unitPriceXAF: 3000, discountPercentage: 25, label: "25 affiches — 75 000 FCFA" },
      { minQuantity: 50, unitPriceXAF: 2400, discountPercentage: 40, label: "50 affiches — 120 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "format-affiche", choiceId: "format-a1", surchargeType: "per_unit", amountXAF: 1500, label: "Format Grand A1 (594 x 841 mm)" },
    ],
  },

  // 8. Panneaux de Chantier & Bâches Réglementaires (Nouveau Produit Réf 19)
  "studio-panneaux-chantier-permis": {
    productId: "studio-panneaux-chantier-permis",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "valide",
    pricingNotice: "Impression directe UV extérieure résistante aux intempéries",
    defaultDesignFeeXAF: 15000,
    minimumOrderQuantity: 1,
    tiers: [
      { minQuantity: 1, unitPriceXAF: 22000, label: "1 panneau 80x120 cm — 22 000 FCFA" },
      { minQuantity: 3, unitPriceXAF: 19000, discountPercentage: 13, label: "3 panneaux — 57 000 FCFA" },
      { minQuantity: 5, unitPriceXAF: 17000, discountPercentage: 22, label: "5 panneaux — 85 000 FCFA" },
    ],
    optionSurcharges: [
      { optionId: "format-panneau", choiceId: "format-120-160", surchargeType: "per_unit", amountXAF: 12000, label: "Grand format 120x160 cm" },
      { optionId: "format-panneau", choiceId: "bache-300-200", surchargeType: "per_unit", amountXAF: 35000, label: "Bâche géante 3x2 m avec œillets" },
    ],
  },

  // 9. Gilets de Chantier Haute Visibilité Brodés (Nouveau Produit Réf 20)
  "studio-gilets-securite-brodes": {
    productId: "studio-gilets-securite-brodes",
    model: "tiered_pricing",
    isPriceApproved: true,
    pricingStatus: "indicatif",
    pricingNotice: "Conforme norme EN ISO 20471 classe 2 & marquage indélébile",
    defaultDesignFeeXAF: 10000,
    minimumOrderQuantity: 10,
    tiers: [
      { minQuantity: 10, unitPriceXAF: 4500, label: "10 gilets — 45 000 FCFA (4 500 FCFA/pc)" },
      { minQuantity: 25, unitPriceXAF: 3800, discountPercentage: 15, label: "25 gilets — 95 000 FCFA (3 800 FCFA/pc)" },
      { minQuantity: 50, unitPriceXAF: 3200, discountPercentage: 28, label: "50 gilets — 160 000 FCFA (3 200 FCFA/pc)" },
    ],
    optionSurcharges: [],
  },

  // TOUTES LES AUTRES PRESTATIONS : Sur Devis Personnalisé d'Atelier
  // (Identités visuelles, Chartes, Plaquettes d'exception, Enseignes, Totems, Plans 2D, Perspectives 3D)
  "studio-brand-identity": {
    productId: "studio-brand-identity",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé sous 24-48h",
  },
  "studio-charte-complete": {
    productId: "studio-charte-complete",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon périmètre",
  },
  "studio-refonte-marque": {
    productId: "studio-refonte-marque",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé après audit patrimonial",
  },
  "studio-plaquette": {
    productId: "studio-plaquette",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon tirage et finitions",
  },
  "studio-chemises-rabat": {
    productId: "studio-chemises-rabat",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon forme de découpe",
  },
  "studio-brochures-catalogues": {
    productId: "studio-brochures-catalogues",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon pagination et papier",
  },
  "studio-totems-lettrages": {
    productId: "studio-totems-lettrages",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé après relevé spatial",
  },
  "studio-plaques-murales": {
    productId: "studio-plaques-murales",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon matériau (Inox/Plexi)",
  },
  "studio-vitrophanie-adhesif": {
    productId: "studio-vitrophanie-adhesif",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé au mètre linéaire",
  },
  "studio-plans-vente": {
    productId: "studio-plans-vente",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé par lot",
  },
  "studio-perspectives-3d": {
    productId: "studio-perspectives-3d",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé par vue 4K",
  },
  "studio-video-visite-virtuelle-3d": {
    productId: "studio-video-visite-virtuelle-3d",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon durée et immersion",
  },
  "studio-dossier-plans-permis": {
    productId: "studio-dossier-plans-permis",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé selon échelle du projet",
  },
  "studio-pack-commercialisation-immo": {
    productId: "studio-pack-commercialisation-immo",
    model: "bespoke_quote",
    isPriceApproved: false,
    pricingStatus: "devis_obligatoire",
    pricingNotice: "Sur étude d'atelier / Devis personnalisé pour ensemble du programme",
  },
};
