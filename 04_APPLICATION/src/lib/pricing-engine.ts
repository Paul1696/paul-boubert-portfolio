import {
  PricingCalculationInput,
  PricingCalculationResult,
  ProductPricingRule,
} from "@/types/pricing";
import {
  STUDIO_PRICING_RULES,
  CURRENCY_RATES,
  DELIVERY_FEES_XAF,
} from "@/data/pricing-catalog";
import { CartItem, OrderDeliveryMode } from "@/types/cart";

export function formatCurrency(
  amount: number | null,
  currency: "XAF" | "EUR" | "USD" = "XAF"
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Sur étude d'atelier";
  }

  if (currency === "XAF") {
    // Format français avec séparateur de milliers : "35 000 FCFA"
    return `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;
  }

  if (currency === "EUR") {
    const inEur = amount * CURRENCY_RATES.EUR;
    return `${inEur.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  }

  if (currency === "USD") {
    const inUsd = amount * CURRENCY_RATES.USD;
    return `$${inUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return `${amount} FCFA`;
}

export function getProductPricingRule(productId: string): ProductPricingRule | undefined {
  return STUDIO_PRICING_RULES[productId];
}

export function calculateProductPricing(
  input: PricingCalculationInput
): PricingCalculationResult {
  const {
    productId,
    quantity,
    selectedOptionChoices,
    needsDesignService,
    currency = "XAF",
  } = input;

  const rule = getProductPricingRule(productId);
  const qty = Math.max(1, Number(quantity) || 1);

  // Cas 1 : Règle absente ou modèle sur devis d'atelier personnalisé
  if (!rule || !rule.isPriceApproved || rule.model === "bespoke_quote" || !rule.tiers) {
    return {
      isCustomQuote: true,
      pricingNotice: rule?.pricingNotice || "Sur étude d'atelier / Devis personnalisé",
      quantity: qty,
      baseUnitPriceXAF: null,
      effectiveUnitPriceXAF: null,
      productsSubtotalXAF: null,
      optionsSurchargeTotalXAF: null,
      designFeeXAF: null,
      totalXAF: null,
      currency,
      totalInCurrency: null,
      formattedTotal: "Sur étude d'atelier",
      formattedUnit: "Sur devis",
      breakdown: [
        {
          label: "Étude technique & devis personnalisé d'atelier",
          amountXAF: 0,
        },
      ],
    };
  }

  // Cas 2 : Modèle avec paliers dégressifs validés
  // Trouver le palier correspondant à la quantité demandée
  const sortedTiers = [...rule.tiers].sort((a, b) => b.minQuantity - a.minQuantity);
  const matchedTier = sortedTiers.find((t) => qty >= t.minQuantity) || rule.tiers[0];

  const effectiveUnitPriceXAF = matchedTier.unitPriceXAF;
  const productsSubtotalXAF = effectiveUnitPriceXAF * qty;

  const breakdown: { label: string; amountXAF: number }[] = [
    {
      label: `Tirage atelier (${qty} ex. à ${effectiveUnitPriceXAF} FCFA/ex)`,
      amountXAF: productsSubtotalXAF,
    },
  ];

  // Calcul des suppléments d'options
  let optionsSurchargeTotalXAF = 0;
  if (rule.optionSurcharges && selectedOptionChoices) {
    for (const [groupId, choiceId] of Object.entries(selectedOptionChoices)) {
      const surcharge = rule.optionSurcharges.find(
        (s) => s.optionId === groupId && s.choiceId === choiceId
      );
      if (surcharge) {
        let surchargeAmount = 0;
        if (surcharge.surchargeType === "fixed") {
          surchargeAmount = surcharge.amountXAF;
        } else if (surcharge.surchargeType === "per_unit") {
          surchargeAmount = surcharge.amountXAF * qty;
        }

        if (surchargeAmount > 0) {
          optionsSurchargeTotalXAF += surchargeAmount;
          breakdown.push({
            label: surcharge.label,
            amountXAF: surchargeAmount,
          });
        }
      }
    }
  }

  // Frais de conception graphique d'atelier
  let designFeeXAF = 0;
  if (needsDesignService && rule.defaultDesignFeeXAF) {
    designFeeXAF = rule.defaultDesignFeeXAF;
    breakdown.push({
      label: "Prestation de création & mise aux normes PAO d'atelier",
      amountXAF: designFeeXAF,
    });
  }

  const totalXAF = productsSubtotalXAF + optionsSurchargeTotalXAF + designFeeXAF;
  const rate = CURRENCY_RATES[currency] || 1;
  const totalInCurrency = totalXAF * rate;

  return {
    isCustomQuote: false,
    pricingNotice: rule.pricingNotice,
    quantity: qty,
    baseUnitPriceXAF: rule.tiers[0].unitPriceXAF,
    effectiveUnitPriceXAF,
    productsSubtotalXAF,
    optionsSurchargeTotalXAF,
    designFeeXAF,
    totalXAF,
    currency,
    totalInCurrency,
    formattedTotal: formatCurrency(totalXAF, currency),
    formattedUnit: formatCurrency(effectiveUnitPriceXAF, currency),
    breakdown,
  };
}

export function calculateCartSummary(
  items: CartItem[],
  deliveryMode: OrderDeliveryMode = "atelier_pickup",
  currency: "XAF" | "EUR" | "USD" = "XAF"
) {
  let totalProductsXAF = 0;
  let hasCustomQuoteItems = false;
  let totalItemsCount = 0;

  for (const item of items) {
    totalItemsCount += item.quantity;
    if (item.isCustomQuote || item.totalPriceXAF === null) {
      hasCustomQuoteItems = true;
    } else {
      totalProductsXAF += item.totalPriceXAF;
    }
  }

  const deliveryFeeXAF = DELIVERY_FEES_XAF[deliveryMode] || 0;
  const grandTotalXAF = hasCustomQuoteItems ? null : totalProductsXAF + deliveryFeeXAF;

  return {
    totalItemsCount,
    totalProductsXAF,
    deliveryFeeXAF,
    grandTotalXAF,
    hasCustomQuoteItems,
    formattedProductsTotal: formatCurrency(totalProductsXAF, currency),
    formattedDeliveryFee: formatCurrency(deliveryFeeXAF, currency),
    formattedGrandTotal: hasCustomQuoteItems
      ? "Sur devis d'atelier (articles sur mesure inclus)"
      : formatCurrency(grandTotalXAF, currency),
  };
}
