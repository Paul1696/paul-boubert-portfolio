"use client";

import { useEffect, useCallback } from "react";
import styles from "@/styles/possibility-machine.module.css";
import { Intention } from "@/types/possibility-machine";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeIntention: Intention;
}

export function ContactModal({ isOpen, onClose, activeIntention }: ContactModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Bonjour Les Ateliers de Paul,\n\nJe vous contacte au sujet de mon intention : "${activeIntention.title}".\n\nPourriez-vous m'accompagner dans ce projet ?`
  );
  const whatsappUrl = `https://wa.me/237690087213?text=${whatsappMessage}`;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Fermer la boîte de dialogue"
        >
          ✕
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: activeIntention.accentColor,
            }}
          >
            ✦ Échange Direct Atelier
          </span>
          <h2 id="contact-modal-title" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Concrétiser votre vision
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
            Intention active sélectionnée : <strong>{activeIntention.title}</strong> ({activeIntention.shortTitle}).
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          💡 <strong>Canal privilégié :</strong> Échange direct sur WhatsApp avec Paul et l&apos;équipe de coordination pour une première estimation et vérification de disponibilité.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              borderColor: "transparent",
            }}
          >
            💬 Démarrer la conversation WhatsApp
          </a>

          <a
            href={`mailto:contact@ateliersdepaul.com?subject=Projet%20${encodeURIComponent(activeIntention.title)}`}
            className={styles.btnSecondary}
            style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
          >
            ✉ Envoyer un e-mail avec cahier des charges
          </a>

          <a
            href="tel:+237690715403"
            className={styles.btnSecondary}
            style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
          >
            📞 Appeler directement l&apos;atelier (+237 690 715 403)
          </a>
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.5rem" }}>
          Atelier situé à Douala, Cameroun • Exercice conforme aux regles deontologiques de l&apos;ONAC
        </div>
      </div>
    </div>
  );
}
