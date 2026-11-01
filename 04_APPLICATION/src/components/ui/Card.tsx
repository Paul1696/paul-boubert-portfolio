import React from "react";
import styles from "@/styles/design-system.module.css";

export type CardVariant = "default" | "mineral" | "elevated" | "glass";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

export function Card({
  variant = "default",
  interactive = false,
  children,
  className,
  ...props
}: CardProps) {
  const variantClass = {
    default: "",
    mineral: styles.cardMineral,
    elevated: styles.cardElevated,
    glass: styles.cardGlass,
  }[variant];

  return (
    <div
      className={`${styles.card} ${variantClass} ${
        interactive ? styles.cardInteractive : ""
      } ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardHeader} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  as: Component = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Component className={`${styles.cardTitle} ${className || ""}`} {...props}>
      {children}
    </Component>
  );
}

export function CardSubtitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`${styles.cardSubtitle} ${className || ""}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardContent} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardFooter} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
