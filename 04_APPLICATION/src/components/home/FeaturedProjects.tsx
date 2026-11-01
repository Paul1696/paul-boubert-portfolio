"use client";

import Link from "next/link";
import styles from "@/styles/possibility-machine.module.css";
import { FeaturedProject } from "@/types/possibility-machine";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
  onOpenContactModal: () => void;
}

export function FeaturedProjects({ projects, onOpenContactModal }: FeaturedProjectsProps) {
  return (
    <section id="creations" className={styles.projectsSection} aria-label="Réalisations vérifiées">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Archives & Références Réelles</span>
          <h2 className={styles.sectionTitle}>Réalisations & Programmes Phares</h2>
          <p className={styles.sectionSubtitle}>
            Sélection de projets réels issus des archives d&apos;atelier et des chantiers conduits
            par Les Ateliers de Paul. Aucune donnée commerciale fictive.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={styles.projectBadge}>{project.badge}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {project.location} • {project.year}
                  </span>
                </div>

                <div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectSubtitle}>{project.subtitle}</div>
                </div>

                <p className={styles.projectExcerpt}>{project.excerpt}</p>
              </div>

              <div>
                <div className={styles.projectSpecs}>
                  <span>Spécifications :</span>
                  <span>{project.specs}</span>
                </div>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={onOpenContactModal}
                    className={styles.btnSecondary}
                    style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                  >
                    <span>Échanger sur ce type de projet</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton vers le catalogue complet des 37 projets */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/portfolio"
            className={styles.btnPrimary}
            style={{ display: "inline-flex", padding: "1rem 2rem", fontSize: "1rem" }}
          >
            <span>Explorer les 37 projets du Portfolio Architectural</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
