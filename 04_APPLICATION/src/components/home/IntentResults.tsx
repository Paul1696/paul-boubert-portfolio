"use client";

import styles from "@/styles/possibility-machine.module.css";
import { Intention, Universe } from "@/types/possibility-machine";

interface IntentResultsProps {
  activeIntention: Intention;
  allUniverses: Universe[];
  onOpenContactModal: () => void;
}

export function IntentResults({
  activeIntention,
  allUniverses,
  onOpenContactModal,
}: IntentResultsProps) {
  const connectedUniverses = allUniverses.filter((u) =>
    activeIntention.connectedUniverseSlugs.includes(u.slug)
  );

  const handleActionClick = () => {
    if (activeIntention.suggestedAction.targetSection) {
      const el = document.getElementById(activeIntention.suggestedAction.targetSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    onOpenContactModal();
  };

  return (
    <div
      className={styles.resultsBanner}
      role="region"
      aria-live="polite"
      aria-label={`Résultats de l'intention : ${activeIntention.title}`}
    >
      <div className={styles.resultsInfo}>
        <div className={styles.resultsBadge}>
          <span style={{ color: activeIntention.accentColor }}>✦</span>
          <span>Cadrage d&apos;intention sélectionné</span>
        </div>

        <h3 className={styles.resultsTitle}>
          {activeIntention.title} — {activeIntention.shortTitle}
        </h3>

        <p className={styles.resultsDesc}>{activeIntention.description}</p>

        <div className={styles.resultsTags}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center" }}>
            Univers mobilisés :
          </span>
          {connectedUniverses.map((u) => (
            <span
              key={u.id}
              className={styles.universeTag}
              style={{
                borderLeft: `3px solid ${u.accentColor}`,
              }}
            >
              {u.symbol} {u.name}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.resultsActions}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={handleActionClick}
          style={{
            borderColor: activeIntention.accentColor,
          }}
        >
          <span>{activeIntention.suggestedAction.label}</span>
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onOpenContactModal}
        >
          <span>Échanger sur ce besoin direct</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
