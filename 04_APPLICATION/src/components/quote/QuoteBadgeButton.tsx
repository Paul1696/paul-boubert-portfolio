"use client";

import React from "react";
import { quoteStore, useQuoteDraft } from "@/data/quote-store";
import styles from "@/styles/quote.module.css";

interface QuoteBadgeButtonProps {
  className?: string;
  variant?: "header" | "dock";
}

export function QuoteBadgeButton({ className, variant = "header" }: QuoteBadgeButtonProps) {
  const draft = useQuoteDraft();
  const totalItems = draft.items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <button
      type="button"
      className={`${styles.quoteTriggerBtn} ${className || ""}`}
      onClick={() => quoteStore.openDrawer()}
      aria-label={`Ouvrir le devis (${totalItems} prestation${totalItems > 1 ? "s" : ""})`}
      title="Accéder au panier de devis"
      id={variant === "dock" ? "contact-dock-quote-btn" : "site-header-quote-btn"}
    >
      <span aria-hidden="true">📋</span>
      <span>{variant === "dock" ? "Demande de Devis" : "Devis"}</span>
      <span
        className={`${styles.badgeCount} ${totalItems === 0 ? styles.badgeCountEmpty : ""}`}
        aria-hidden="true"
        id={`quote-badge-count-${variant}`}
      >
        {totalItems}
      </span>
    </button>
  );
}
