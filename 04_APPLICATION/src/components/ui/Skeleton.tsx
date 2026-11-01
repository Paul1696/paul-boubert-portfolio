import React from "react";
import styles from "@/styles/design-system.module.css";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export function Skeleton({
  width,
  height = "1rem",
  circle = false,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.skeleton} ${className || ""}`}
      style={{
        width: width ?? "100%",
        height,
        borderRadius: circle ? "50%" : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export function LoadingSpinner({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pixelSize = {
    sm: "16px",
    md: "24px",
    lg: "36px",
  }[size];

  return (
    <div
      role="status"
      aria-label="Chargement en cours"
      style={{
        width: pixelSize,
        height: pixelSize,
        border: "2px solid var(--border-default)",
        borderRightColor: "var(--accent-brass)",
        borderRadius: "50%",
        animation: "spin 0.65s linear infinite",
      }}
      className={className}
    >
      <span style={{ display: "none" }}>Chargement...</span>
    </div>
  );
}
