"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/possibility-machine.module.css";
import { FeaturedProject } from "@/types/possibility-machine";
import { PROJECTS_MEDIA } from "@/data/media-manifest";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
  onOpenContactModal: () => void;
}

export function FeaturedProjects({ projects, onOpenContactModal }: FeaturedProjectsProps) {
  return (
    <section id="creations" className={styles.projectsSection} aria-label="Réalisations vérifiées">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Archives &amp; Références Réelles</span>
          <h2 className={styles.sectionTitle}>Réalisations &amp; Programmes Phares</h2>
          <p className={styles.sectionSubtitle}>
            Sélection de projets réels issus des archives d&apos;atelier et des chantiers conduits
            par Les Ateliers de Paul. Aucune donnée commerciale fictive.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => {
            // Find media folder
            const folderMatch = Object.values(PROJECTS_MEDIA).find(
              (f) => f.folder.replace(/_/g, "-") === project.id.replace("proj-", "") ||
                     project.title.toLowerCase().includes(f.folder.replace(/_/g, " "))
            );
            const coverUrl = folderMatch?.cover?.url || "/assets/placeholders/project-placeholder.svg";

            return (
              <article key={project.id} className={styles.projectCard}>
                {/* Vignette Couverture */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "170px",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    marginBottom: "1rem",
                  }}
                >
                  <Image
                    src={coverUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      backgroundColor: "rgba(26, 34, 45, 0.75)",
                      color: "#FFFFFF",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                    }}
                  >
                    {project.location}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={styles.projectBadge}>{project.badge}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {project.year}
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
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bouton vers le catalogue complet des 37 projets */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/portfolio"
            className={styles.btnPrimary}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.85rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            <span>Explorer les 37 Projets Réels du Portfolio</span>
            <span aria-hidden="true">🏛️</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
