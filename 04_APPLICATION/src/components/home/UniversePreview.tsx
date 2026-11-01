"use client";

import Link from "next/link";
import styles from "@/styles/possibility-machine.module.css";
import { Universe } from "@/types/possibility-machine";

interface UniversePreviewProps {
  universes: Universe[];
  connectedUniverseSlugs: string[];
}

export function UniversePreview({ universes, connectedUniverseSlugs }: UniversePreviewProps) {
  return (
    <section id="univers" className={styles.universeSection} aria-label="Les Sept Univers ADP">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Écosystème Créatif</span>
          <h2 className={styles.sectionTitle}>Les Sept Univers des Ateliers</h2>
          <p className={styles.sectionSubtitle}>
            Une cartographie transversale sans frontière : de la matière brute au code,
            chaque univers dialogue avec les autres pour porter vos ambitions.
          </p>
        </div>

        <div className={styles.universeGrid}>
          {universes.map((univ) => {
            const isHighlighted = connectedUniverseSlugs.includes(univ.slug);
            return (
              <div
                key={univ.id}
                className={`${styles.universeCard} ${
                  isHighlighted ? styles.universeCardHighlighted : ""
                }`}
                style={
                  isHighlighted
                    ? {
                        borderColor: univ.accentColor,
                      }
                    : undefined
                }
              >
                <div>
                  <div className={styles.universeCardTop}>
                    <span className={styles.universeNumber}>UNIVERS {univ.number}</span>
                    <span
                      className={styles.universeSymbol}
                      style={{ color: univ.accentColor }}
                      aria-hidden="true"
                    >
                      {univ.symbol}
                    </span>
                  </div>

                  <h3 className={styles.universeName}>{univ.name}</h3>
                  <div className={styles.universeTagline}>{univ.tagline}</div>

                  <div className={styles.universeMaterials} style={{ margin: "0.5rem 0" }}>
                    <span>Matières :</span> {univ.materials}
                  </div>

                  <p className={styles.universeDescription}>{univ.description}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {isHighlighted && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: univ.accentColor,
                        textTransform: "uppercase",
                      }}
                    >
                      ✦ Mobilisé par votre intention
                    </span>
                  )}

                  <Link
                    href={univ.targetRoute}
                    className={styles.universeCardLink}
                    style={{ color: univ.accentColor }}
                    title={`Découvrir ${univ.name} (Espace dédié)`}
                  >
                    <span>Explorer cet univers</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
