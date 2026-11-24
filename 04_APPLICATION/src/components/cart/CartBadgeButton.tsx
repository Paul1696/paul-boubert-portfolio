"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { cartStore, useCartItemsCount } from "@/data/cart-store";
import styles from "@/styles/quote.module.css";

interface CartBadgeButtonProps {
  className?: string;
  variant?: "header" | "dock";
}

export function CartBadgeButton({ className, variant = "header" }: CartBadgeButtonProps) {
  const totalItems = useCartItemsCount();

  return (
    <button
      type="button"
      className={`${styles.quoteTriggerBtn} ${className || ""}`}
      onClick={() => cartStore.openDrawer()}
      aria-label={`Ouvrir le panier commercial (${totalItems} article${totalItems > 1 ? "s" : ""})`}
      title="Accéder au panier commercial et commandes"
      id={variant === "dock" ? "contact-dock-cart-btn" : "site-header-cart-btn"}
      style={{
        borderColor: totalItems > 0 ? "rgba(197, 155, 83, 0.6)" : undefined,
        backgroundColor: totalItems > 0 ? "rgba(197, 155, 83, 0.08)" : undefined,
      }}
    >
      <ShoppingBag size={14} color="#C59B53" />
      <span>{variant === "dock" ? "Panier d'Atelier" : "Panier"}</span>
      <span
        className={`${styles.badgeCount} ${totalItems === 0 ? styles.badgeCountEmpty : ""}`}
        aria-hidden="true"
        id={`cart-badge-count-${variant}`}
      >
        {totalItems}
      </span>
    </button>
  );
}
