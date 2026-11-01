import React, { forwardRef, useId } from "react";
import styles from "@/styles/design-system.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, required, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={styles.formGroup}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${styles.label} ${required ? styles.labelRequired : ""}`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`${styles.input} ${error ? styles.inputError : ""} ${className || ""}`}
          {...props}
        />
        {error && (
          <span id={errorId} className={styles.errorText} role="alert">
            ⚠ {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
