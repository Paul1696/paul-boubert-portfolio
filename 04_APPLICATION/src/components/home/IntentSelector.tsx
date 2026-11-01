"use client";

import styles from "@/styles/possibility-machine.module.css";
import { Intention, Universe } from "@/types/possibility-machine";
import { IntentResults } from "./IntentResults";

interface IntentSelectorProps {
  intentions: Intention[];
  activeIntentId: string;
  onSelectIntent: (id: string) => void;
  allUniverses: Universe[];
  onOpenContactModal: () => void;
}

export function IntentSelector({
  intentions,
  activeIntentId,
  onSelectIntent,
  allUniverses,
  onOpenContactModal,
}: IntentSelectorProps) {
  const activeIntention =
    intentions.find((it) => it.id === activeIntentId) || intentions[0];

  return (
    <section id="intentions" className={styles.intentSection} aria-label="Navigation par intentions">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Orientation Projet</span>
          <h2 className={styles.sectionTitle}>Que souhaitez-vous imaginer ?</h2>
          <p className={styles.sectionSubtitle}>
            Choisissez votre porte d&apos;entrée pour adapter la réactivité du noyau
            et découvrir les expertises réunies pour vous accompagner.
          </p>
        </div>

        {/* Grille des 6 intentions */}
        <div className={styles.intentGrid} role="radiogroup" aria-label="Sélectionnez votre intention">
          {intentions.map((intent) => {
            const isActive = intent.id === activeIntentId;
            return (
              <button
                key={intent.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={0}
                className={`${styles.intentCard} ${isActive ? styles.intentCardActive : ""}`}
                onClick={() => onSelectIntent(intent.id)}
                style={
                  isActive
                    ? {
                        borderColor: intent.accentColor,
                      }
                    : undefined
                }
              >
                <div className={styles.intentCardTop}>
                  <span className={styles.intentNumber}>INTENTION {intent.number}</span>
                  <span
                    className={styles.intentDot}
                    style={{
                      backgroundColor: intent.accentColor,
                      boxShadow: isActive ? `0 0 8px ${intent.accentColor}` : undefined,
                    }}
                  />
                </div>

                <div>
                  <h3 className={styles.intentTitle}>{intent.shortTitle}</h3>
                  <p className={styles.intentDescription}>{intent.description}</p>
                </div>

                <div className={styles.intentActionLabel}>
                  <span>{isActive ? "Intention active" : "Activer cette intention"}</span>
                  <span aria-hidden="true">{isActive ? "●" : "→"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de résultats et d'actions dynamiques */}
        <IntentResults
          activeIntention={activeIntention}
          allUniverses={allUniverses}
          onOpenContactModal={onOpenContactModal}
        />
      </div>
    </section>
  );
}
