"use client";

import React from "react";
import { quoteStore, useQuoteDraft } from "@/data/quote-store";
import { QUOTE_CATALOG } from "@/data/quote-catalog";
import styles from "@/styles/possibility-machine.module.css";

interface AddPrestationButtonProps {
  catalogItemId?: string;
  variantId?: string;
  label?: string;
  autoOpenDrawer?: boolean;
  className?: string;
}

export function AddPrestationButton({
  catalogItemId,
  variantId,
  label = "Sélectionner pour devis",
  autoOpenDrawer = false,
  className,
}: AddPrestationButtonProps) {
  const draft = useQuoteDraft();

  if (!catalogItemId) return null;

  const catalogItem = QUOTE_CATALOG.find((it) => it.id === catalogItemId);
  if (!catalogItem) return null;

  const targetVariantId = variantId || catalogItem.defaultVariantId;
  const existingItem = draft.items.find(
    (it) => it.catalogItemId === catalogItemId && it.variantId === targetVariantId
  );
  const isSelected = Boolean(existingItem);
  const quantity = existingItem ? existingItem.quantity : 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSelected && existingItem) {
      // Toggle off / remove if already selected
      quoteStore.removeItem(existingItem.id);
    } else {
      quoteStore.addItem(catalogItemId, targetVariantId);
      if (autoOpenDrawer) {
        quoteStore.openDrawer();
      }
    }
  };

  return (
    <button
      type="button"
      className={className || styles.btnSecondary}
      onClick={handleClick}
      aria-label={
        isSelected
          ? `Retirer ${catalogItem.title} (${catalogItem.universeName}) du devis`
          : `Ajouter ${catalogItem.title} (${catalogItem.universeName}) au devis`
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.5rem 0.9rem",
        fontSize: "0.82rem",
        fontWeight: 600,
        borderRadius: "var(--radius-sm, 6px)",
        cursor: "pointer",
        transition: "all var(--transition-fast, 0.2s ease)",
        backgroundColor: isSelected ? "var(--accent-brass, #C59B53)" : "var(--bg-surface, #FFFFFF)",
        color: isSelected ? "#FFFFFF" : "var(--text-primary, #1A222D)",
        border: `1px solid ${isSelected ? "var(--accent-brass, #C59B53)" : "var(--border-subtle, #E4E1D8)"}`,
      }}
    >
      <span aria-hidden="true">{isSelected ? "✓" : "+"}</span>
      <span>{isSelected ? `Dans le devis (${quantity})` : label}</span>
    </button>
  );
}
