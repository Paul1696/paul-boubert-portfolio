"use client";

import React, { forwardRef } from "react";
import styles from "@/styles/design-system.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "universe";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      primary: styles.btnPrimary,
      secondary: styles.btnSecondary,
      tertiary: styles.btnTertiary,
      outline: styles.btnOutline,
      ghost: styles.btnGhost,
      danger: styles.btnDanger,
      universe: styles.btnUniverse,
    }[variant];

    const sizeClass = {
      sm: styles.btnSm,
      md: styles.btnMd,
      lg: styles.btnLg,
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${styles.btn} ${variantClass} ${sizeClass} ${
          isLoading ? styles.btnLoading : ""
        } ${disabled ? styles.btnDisabled : ""} ${className || ""}`}
        {...props}
      >
        {isLoading && <span className={styles.btnSpinner} aria-hidden="true" />}
        {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
