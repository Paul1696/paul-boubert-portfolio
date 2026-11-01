"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/design-system.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-desc" : undefined}
        className={`${styles.modalContent} ${className || ""}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la boîte de dialogue"
          className={styles.modalCloseBtn}
        >
          ✕
        </button>

        <div style={{ padding: "var(--space-6)" }}>
          {title && (
            <h2
              id="modal-title"
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: description ? "var(--space-1)" : "var(--space-4)",
              }}
            >
              {title}
            </h2>
          )}

          {description && (
            <p
              id="modal-desc"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                marginBottom: "var(--space-5)",
              }}
            >
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
