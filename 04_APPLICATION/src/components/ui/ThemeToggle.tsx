"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/possibility-machine.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("adp-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("adp-theme", nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={styles.themeToggleBtn}
        aria-label="Basculer le thème visuel"
        disabled
      >
        <span>☼</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.themeToggleBtn}
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Passer en mode Nuit d'Atelier" : "Passer en mode Minéral Clair"}
      title={theme === "light" ? "Mode Nuit d'Atelier" : "Mode Minéral Clair"}
    >
      <span>{theme === "light" ? "☽" : "☼"}</span>
    </button>
  );
}
