import React from "react";
import styles from "@/styles/design-system.module.css";

export type BadgeVariant =
  | "brass"
  | "mineral"
  | "success"
  | "warning"
  | "error"
  | "info";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export function Badge({
  variant = "mineral",
  size = "md",
  icon,
  children,
  className,
  ...props
}: BadgeProps) {
  const variantClass = {
    brass: styles.badgeBrass,
    mineral: styles.badgeMineral,
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    error: styles.badgeError,
    info: styles.badgeInfo,
  }[variant];

  const sizeClass = size === "sm" ? styles.badgeSm : "";

  return (
    <span
      className={`${styles.badge} ${variantClass} ${sizeClass} ${className || ""}`}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
