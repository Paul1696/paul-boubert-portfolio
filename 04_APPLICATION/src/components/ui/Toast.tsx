"use client";

import React from "react";
import styles from "@/styles/design-system.module.css";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastProps {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  onDismiss: (id: string) => void;
}

export function Toast({
  id,
  type = "info",
  title,
  message,
  onDismiss,
}: ToastProps) {
  const icon = {
    success: "✓",
    warning: "⚠",
    error: "✕",
    info: "ℹ",
  }[type];

  const borderColor = {
    success: "var(--status-success-border)",
    warning: "var(--status-warning-border)",
    error: "var(--status-error-border)",
    info: "var(--status-info-border)",
  }[type];

  const iconBg = {
    success: "var(--status-success-bg)",
    warning: "var(--status-warning-bg)",
    error: "var(--status-error-bg)",
    info: "var(--status-info-bg)",
  }[type];

  const iconColor = {
    success: "var(--status-success)",
    warning: "var(--status-warning)",
    error: "var(--status-error)",
    info: "var(--status-info)",
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={styles.toast}
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: iconBg,
          color: iconColor,
          fontWeight: 700,
          fontSize: "0.75rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
          {title}
        </div>
        {message && (
          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "2px" }}>
            {message}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Fermer la notification"
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: "1rem",
          padding: "2px 6px",
          borderRadius: "var(--radius-xs)",
        }}
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.toastContainer}>{children}</div>;
}
