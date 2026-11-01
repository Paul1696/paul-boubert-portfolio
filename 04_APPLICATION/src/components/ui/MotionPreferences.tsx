"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/possibility-machine.module.css";

export function MotionPreferences() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const systemPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const savedPref = localStorage.getItem("adp-reduced-motion");
    const isReduced = savedPref !== null ? savedPref === "true" : systemPrefersReduced;

    setReducedMotion(isReduced);
    if (isReduced) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, []);

  const toggleMotion = () => {
    const nextVal = !reducedMotion;
    setReducedMotion(nextVal);
    if (nextVal) {
      document.documentElement.classList.add("reduced-motion");
      localStorage.setItem("adp-reduced-motion", "true");
    } else {
      document.documentElement.classList.remove("reduced-motion");
      localStorage.setItem("adp-reduced-motion", "false");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.motionToggleBtn}
      onClick={toggleMotion}
      aria-label={reducedMotion ? "Activer les animations du noyau" : "Désactiver les animations (mode calme)"}
      title={reducedMotion ? "Animations réduites (Cliquer pour animer)" : "Animations actives (Cliquer pour figer)"}
    >
      <span>{reducedMotion ? "⏸" : "▶"}</span>
    </button>
  );
}
