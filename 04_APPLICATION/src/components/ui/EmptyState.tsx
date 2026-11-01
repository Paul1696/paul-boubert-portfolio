import React from "react";
import styles from "@/styles/design-system.module.css";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = "✦",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={`${styles.emptyState} ${className || ""}`}>
      <div className={styles.emptyStateIcon} aria-hidden="true">
        {icon}
      </div>
      <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: "42ch" }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} style={{ marginTop: "var(--space-2)" }}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
