"use client";

import styles from "@/styles/possibility-machine.module.css";
import { quoteStore, useQuoteDraft } from "@/data/quote-store";

interface ContactDockProps {
  onOpenModal: () => void;
}

export function ContactDock({ onOpenModal }: ContactDockProps) {
  const draft = useQuoteDraft();
  const totalCount = draft.items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <button
        type="button"
        className={styles.contactDock}
        onClick={() => quoteStore.openDrawer()}
        style={{
          background: totalCount > 0 ? "var(--bg-surface, #FFFFFF)" : "var(--bg-surface, #FFFFFF)",
          borderColor: totalCount > 0 ? "var(--accent-brass, #C59B53)" : "var(--border-subtle, #E4E1D8)",
          boxShadow: "0 4px 16px rgba(26, 34, 45, 0.12)",
        }}
        aria-label={`Ouvrir mon devis d'atelier (${totalCount} prestation${totalCount > 1 ? "s" : ""})`}
      >
        <span>📋</span>
        <span>Devis</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "1.15rem",
            height: "1.15rem",
            padding: "0 0.3rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            borderRadius: "var(--radius-full, 9999px)",
            background: totalCount > 0 ? "var(--accent-brass, #C59B53)" : "var(--text-muted, #7E8B9B)",
            color: "#FFFFFF",
          }}
        >
          {totalCount}
        </span>
      </button>

      <button
        type="button"
        className={styles.contactDock}
        onClick={onOpenModal}
        aria-label="Ouvrir la fenêtre d'échange direct avec l'atelier"
      >
        <span>✦</span>
        <span>Contacter</span>
      </button>
    </div>
  );
}
