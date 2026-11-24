"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Check, 
  ShoppingCart, 
  FileText, 
  Upload, 
  Sparkles, 
  HelpCircle, 
  Calculator,
  RefreshCw,
  Info
} from "lucide-react";
import { StudioProduct, StudioFamily } from "@/types/studio-catalog";
import { calculateProductPricing, formatCurrency } from "@/lib/pricing-engine";
import { cartStore } from "@/data/cart-store";
import { quoteStore } from "@/data/quote-store";
import styles from "@/styles/studio.module.css";

interface StudioUniversalConfiguratorProps {
  product: StudioProduct;
  family?: StudioFamily;
}

export function StudioUniversalConfigurator({ product, family }: StudioUniversalConfiguratorProps) {
  // 1. Initialisation des options par défaut
  const initialOptions = useMemo(() => {
    const opts: { [groupId: string]: string } = {};
    if (product.configurationOptions) {
      product.configurationOptions.forEach((grp) => {
        const defaultChoice = grp.choices.find((c) => c.isDefault) || grp.choices[0];
        if (defaultChoice) {
          opts[grp.id] = defaultChoice.id;
        }
      });
    }
    return opts;
  }, [product]);

  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: string }>(initialOptions);
  const [quantity, setQuantity] = useState<number>(product.quantities?.[0] || 1);
  const [needsDesignService, setNeedsDesignService] = useState<boolean>(false);
  const [clientFileName, setClientFileName] = useState<string>("");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [currency, setCurrency] = useState<"XAF" | "EUR" | "USD">("XAF");
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // 2. Calcul tarifaire en temps réel
  const pricingResult = useMemo(() => {
    return calculateProductPricing({
      productId: product.id,
      quantity,
      selectedOptionChoices: selectedOptions,
      needsDesignService,
      currency,
    });
  }, [product.id, quantity, selectedOptions, needsDesignService, currency]);

  // Libellés conviviaux des choix sélectionnés
  const selectedOptionLabels = useMemo(() => {
    const labels: { [key: string]: string } = {};
    if (product.configurationOptions) {
      product.configurationOptions.forEach((grp) => {
        const choiceId = selectedOptions[grp.id];
        const choice = grp.choices.find((c) => c.id === choiceId);
        if (choice) {
          labels[grp.label] = choice.label;
        }
      });
    }
    return labels;
  }, [product, selectedOptions]);

  const handleOptionChange = (groupId: string, choiceId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: choiceId,
    }));
  };

  const handleQuantitySelect = (qty: number) => {
    setQuantity(qty);
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClientFileName(e.target.files[0].name);
    }
  };

  // Ajout au panier universel & devis
  const handleAddToCart = () => {
    // 1. Ajouter dans le panier multi-produits
    cartStore.addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      familyId: product.familyId,
      universeName: family?.name || "ADP Studio",
      coverImage: product.media.coverImage,
      selectedOptions,
      selectedOptionLabels,
      quantity,
      needsDesignService,
      clientFileName: clientFileName || undefined,
      customNotes: customNotes || undefined,
      isCustomQuote: pricingResult.isCustomQuote,
      unitPriceXAF: pricingResult.effectiveUnitPriceXAF,
      totalPriceXAF: pricingResult.totalXAF,
      pricingNotice: pricingResult.pricingNotice,
    });

    // 2. Synchroniser également dans le store historique quoteStore pour compatibilité devis
    const configNotes = Object.entries(selectedOptionLabels)
      .map(([k, v]) => `${k} : ${v}`)
      .join(" | ");
    const fullNotes = [
      configNotes,
      needsDesignService ? "Création graphique demandée" : "Fichier client fourni",
      pricingResult.totalXAF ? `Total estimé : ${formatCurrency(pricingResult.totalXAF)}` : "Sur devis",
      customNotes,
    ]
      .filter(Boolean)
      .join(" — ");

    quoteStore.addItem(product.id, "standard", fullNotes);

    // Feedback visuel & ouverture du tiroir de commande
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      cartStore.openDrawer();
    }, 400);
  };

  return (
    <div className={styles.configuratorBox}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFFFFF", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Calculator size={18} color="#C59B53" />
            Configurateur Commercial d&apos;Atelier
          </h3>
          <p style={{ fontSize: "0.78rem", color: "#8E9AA8", margin: "0.2rem 0 0" }}>
            Personnalisez vos options techniques et visualisez le barème calculé en temps réel.
          </p>
        </div>

        {/* Sélecteur de devise */}
        <div style={{ display: "inline-flex", background: "#11161F", padding: "2px", borderRadius: "4px", border: "1px solid #222C38" }}>
          {(["XAF", "EUR", "USD"] as const).map((curr) => (
            <button
              key={curr}
              type="button"
              onClick={() => setCurrency(curr)}
              style={{
                padding: "2px 8px",
                fontSize: "0.7rem",
                fontWeight: 700,
                background: currency === curr ? "#C59B53" : "transparent",
                color: currency === curr ? "#11161F" : "#8E9AA8",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              {curr === "XAF" ? "FCFA" : curr}
            </button>
          ))}
        </div>
      </div>

      {/* --- 1. SÉLECTEURS D'OPTIONS DYNAMIQUES DU PRODUIT --- */}
      {product.configurationOptions && product.configurationOptions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
          {product.configurationOptions.map((group) => (
            <div key={group.id} className={styles.configGroup}>
              <label className={styles.configGroupLabel}>
                {group.label}
              </label>

              <div className={styles.pillsGroup}>
                {group.choices.map((choice) => {
                  const isSelected = selectedOptions[group.id] === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      className={`${styles.pillBtn} ${isSelected ? styles.pillBtnActive : ""}`}
                      onClick={() => handleOptionChange(group.id, choice.id)}
                    >
                      {isSelected && <Check size={12} style={{ marginRight: "4px", display: "inline" }} />}
                      {choice.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- 2. SÉLECTION DES QUANTITÉS & PALIERS DÉGRESSIFS --- */}
      <div className={styles.configGroup}>
        <label className={styles.configGroupLabel}>
          Quantité de tirage / Volume
        </label>
        <div className={styles.pillsGroup}>
          {product.quantities && product.quantities.length > 0 ? (
            product.quantities.map((qty) => {
              const isSelected = quantity === qty;
              return (
                <button
                  key={qty}
                  type="button"
                  className={`${styles.pillBtn} ${isSelected ? styles.pillBtnActive : ""}`}
                  onClick={() => handleQuantitySelect(qty)}
                >
                  {isSelected && <Check size={12} style={{ marginRight: "4px", display: "inline" }} />}
                  {qty.toLocaleString("fr-FR")} exemplaires
                </button>
              );
            })
          ) : (
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                padding: "0.5rem 0.8rem",
                background: "#11161F",
                border: "1px solid #222C38",
                borderRadius: "6px",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                width: "120px",
              }}
            />
          )}
        </div>
      </div>

      {/* --- 3. PRESTATION GRAPHIQUE & FICHIERS CLIENTS --- */}
      <div style={{ backgroundColor: "#11161F", padding: "1.25rem", borderRadius: "8px", border: "1px solid #222C38", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#C59B53", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          Fichiers &amp; Pré-Presse PAO
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer", fontSize: "0.82rem", color: "#EBE3DB", marginBottom: "1rem" }}>
          <input
            type="checkbox"
            checked={needsDesignService}
            onChange={(e) => setNeedsDesignService(e.target.checked)}
            style={{ marginTop: "2px", accentColor: "#C59B53" }}
          />
          <div>
            <span style={{ fontWeight: 600 }}>Je n&apos;ai pas de fichier conforme : confier la création graphique à l&apos;Atelier ADP</span>
            <div style={{ color: "#8E9AA8", fontSize: "0.75rem", marginTop: "0.15rem" }}>
              Notre studio conçoit ou adapte votre maquette selon les gabarits d&apos;imprimerie et émet un BAT pour signature.
            </div>
          </div>
        </label>

        {/* Transmission de fichier client */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#161D26",
              border: "1px dashed #334050",
              borderRadius: "6px",
              fontSize: "0.78rem",
              color: "#C2CEDA",
              cursor: "pointer",
            }}
          >
            <Upload size={14} color="#C59B53" />
            <span>{clientFileName ? `Fichier : ${clientFileName}` : "Transmettre un fichier (PDF, SVG, AI, ZIP)"}</span>
            <input
              type="file"
              onChange={handleFileUploadSim}
              style={{ display: "none" }}
              accept=".pdf,.ai,.eps,.svg,.zip,.png,.jpg"
            />
          </label>

          {clientFileName && (
            <button
              type="button"
              onClick={() => setClientFileName("")}
              style={{ background: "none", border: "none", color: "#E05A47", fontSize: "0.75rem", cursor: "pointer" }}
            >
              Retirer
            </button>
          )}
        </div>
      </div>

      {/* --- 4. RÉCAPITULATIF FINANCIER DYNAMIQUE --- */}
      <div className={styles.configSummary}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div className={styles.configSummaryTitle}>Synthèse de votre configuration</div>
          <span style={{ fontSize: "0.72rem", color: "#8E9AA8", fontStyle: "italic" }}>
            Devise : {currency === "XAF" ? "FCFA (CEMAC)" : currency}
          </span>
        </div>

        {/* Détail ligne par ligne */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1rem" }}>
          {pricingResult.breakdown.map((line, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
              <span style={{ color: "#A3B1C2" }}>• {line.label}</span>
              <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                {pricingResult.isCustomQuote ? "Inclus" : formatCurrency(line.amountXAF, currency)}
              </span>
            </div>
          ))}
        </div>

        {/* Affichage du total */}
        <div style={{ borderTop: "1px solid #222C38", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#8E9AA8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Estimation d&apos;atelier
            </div>
            <div style={{ fontSize: "0.72rem", color: "#4ECA8E" }}>
              {pricingResult.isCustomQuote
                ? "Chiffrage sous 24h avec échantillonnage"
                : "Barème officiel d'atelier (TVA applicable selon statut)"}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#C59B53" }}>
              {pricingResult.formattedTotal}
            </div>
            {!pricingResult.isCustomQuote && (
              <div style={{ fontSize: "0.72rem", color: "#8E9AA8" }}>
                soit env. {pricingResult.formattedUnit} / unité
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 5. BOUTONS D'ACTION COMMERCIALE --- */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
        <button
          type="button"
          onClick={handleAddToCart}
          className={styles.btnPrimary}
          style={{ flex: 1, minWidth: "200px", justifyContent: "center" }}
        >
          {addedSuccess ? (
            <>
              <Check size={16} />
              Configuré &amp; Ajouté !
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Ajouter au panier / devis
            </>
          )}
        </button>

        <Link
          href={`/contact?subject=studio-${product.slug}`}
          className={styles.btnSecondary}
          style={{ justifyContent: "center" }}
        >
          <FileText size={16} />
          Conseil technique
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.85rem", fontSize: "0.72rem", color: "#8E9AA8" }}>
        <Info size={12} color="#C59B53" />
        <span>Aucun débit immédiat. Chaque commande fait l&apos;objet d&apos;un contrôle technique et d&apos;un BAT formel.</span>
      </div>
    </div>
  );
}
