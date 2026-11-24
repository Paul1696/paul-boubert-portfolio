/**
 * ADP WEB EXPERIENCE — Types pour le Moteur de Tarification Commerciale 2026
 * Devise de référence : FCFA (XAF) — Zone CEMAC/BEAC.
 * Taux officiel fixe : 1 EUR = 655,957 XAF. Taux indicatif : 1 USD ≈ 610 XAF.
 */

export type PricingModelType =
  | "tiered_pricing"       // Tarification calculée avec paliers dégressifs
  | "bespoke_quote";       // Prestation sur mesure / Étude d'atelier obligatoire

export interface QuantityDiscountTier {
  minQuantity: number;
  maxQuantity?: number;
  unitPriceXAF: number;
  discountPercentage?: number;
  label?: string;
}

export interface OptionSurchargeRule {
  optionId: string;
  choiceId: string;
  surchargeType: "fixed" | "per_unit";
  amountXAF: number;
  label: string;
}

export interface ProductPricingRule {
  productId: string;
  model: PricingModelType;
  basePriceXAF?: number;
  tiers?: QuantityDiscountTier[];
  optionSurcharges?: OptionSurchargeRule[];
  defaultDesignFeeXAF?: number;
  minimumOrderQuantity?: number;
  pricingNotice: string;
  isPriceApproved: boolean; // true si tarif officiel d'atelier validé, false si sur devis
  pricingStatus?: "valide" | "indicatif" | "devis_obligatoire"; // Statut éditorial d'atelier
}

export interface PricingCalculationInput {
  productId: string;
  quantity: number;
  selectedOptionChoices: { [optionGroupId: string]: string };
  needsDesignService: boolean;
  currency?: "XAF" | "EUR" | "USD";
}

export interface PricingCalculationResult {
  isCustomQuote: boolean;
  pricingNotice: string;
  quantity: number;
  baseUnitPriceXAF: number | null;
  effectiveUnitPriceXAF: number | null;
  productsSubtotalXAF: number | null;
  optionsSurchargeTotalXAF: number | null;
  designFeeXAF: number | null;
  totalXAF: number | null;
  // Multidevise
  currency: "XAF" | "EUR" | "USD";
  totalInCurrency: number | null;
  formattedTotal: string;
  formattedUnit: string;
  breakdown: {
    label: string;
    amountXAF: number;
  }[];
}
