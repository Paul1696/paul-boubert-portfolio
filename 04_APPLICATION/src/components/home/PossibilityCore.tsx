"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import styles from "@/styles/possibility-machine.module.css";
import { Intention } from "@/types/possibility-machine";

interface PossibilityCoreProps {
  activeIntention: Intention;
  onCoreClick?: () => void;
}

export function PossibilityCore({ activeIntention, onCoreClick }: PossibilityCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mise à jour des variables CSS dynamiques pour la couleur d'intention
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--active-intent-color", activeIntention.accentColor);
    root.style.setProperty(
      "--active-intent-glow",
      `${activeIntention.accentColor}44` // ~27% opacity hex
    );
    root.style.setProperty(
      "--active-intent-subtle",
      `${activeIntention.accentColor}1F` // ~12% opacity hex
    );
  }, [activeIntention]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Angle subtil maîtrisé (max ~15 degrés)
    const tiltX = -(y / (rect.height / 2)) * 14;
    const tiltY = (x / (rect.width / 2)) * 14;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.coreStageWrapper}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      role="region"
      aria-label="The Possibility Core — Noyau interactif"
    >
      {/* Halo radial dynamique réagissant à l'intention */}
      <div
        className={styles.coreHalo}
        style={{
          background: `radial-gradient(circle, ${activeIntention.accentColor}3A 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* Anneau céleste orbital externe (rotation horaire) */}
      <div
        className={styles.coreOrbitOuter}
        style={{
          borderColor: `${activeIntention.accentColor}40`,
        }}
      />

      {/* Anneau céleste orbital interne (rotation anti-horaire) */}
      <div className={styles.coreOrbitInner} />

      {/* Prisme 3D interactif avec micro-inclinaison */}
      <div
        className={styles.corePrismContainer}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`
            : undefined,
          transition: isHovered ? "transform 150ms ease-out" : "transform 400ms ease-in-out",
        }}
        onClick={onCoreClick}
        title={`Noyau actif : ${activeIntention.title} (Cliquer pour échanger)`}
      >
        {/* Facette extérieure minérale translucide */}
        <div
          className={styles.corePrismOuter}
          style={{
            borderColor: `${activeIntention.accentColor}70`,
            boxShadow: `0 12px 35px rgba(0, 0, 0, 0.08), inset 0 0 20px ${activeIntention.accentColor}25`,
          }}
        />

        {/* Noyau central lumineux affichant l'énergie de l'intention */}
        <div
          className={styles.corePrismInner}
          style={{
            background: `radial-gradient(circle, ${activeIntention.accentColor} 0%, rgba(26, 34, 45, 0.9) 100%)`,
            boxShadow: `0 0 30px ${activeIntention.accentColor}55`,
          }}
        >
          <span className={styles.coreSymbol} aria-hidden="true">
            ✦
          </span>
        </div>
      </div>

      {/* Indicateur d'état interactif en pied de noyau */}
      <div className={styles.coreStatusBadge}>
        <span
          className={styles.coreStatusDot}
          style={{
            backgroundColor: activeIntention.accentColor,
            boxShadow: `0 0 8px ${activeIntention.accentColor}`,
          }}
        />
        <span>
          Noyau aligné sur : <strong>{activeIntention.shortTitle}</strong>
        </span>
      </div>
    </div>
  );
}
