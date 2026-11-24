"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PROJECTS, getProjectStatus, getProjectResponsibleEntity } from "@/data/all-projects";
import { PROJECTS_MEDIA } from "@/data/media-manifest";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/styles/possibility-machine.module.css";

const CATEGORIES = [
  { id: "all", label: "Tous les programmes" },
  { id: "Tertiaire", label: "Tertiaire & Bureaux" },
  { id: "Résidentiel", label: "Résidentiel & Villas" },
  { id: "Hôtellerie", label: "Hôtellerie & Prestige" },
  { id: "Commerce", label: "Commerces & Espaces" },
  { id: "Équipement", label: "Équipements & Santé" },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedAttribution, setSelectedAttribution] = useState("all");

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchCategory =
        selectedCategory === "all" || p.typology === selectedCategory;

      const resp = getProjectResponsibleEntity(p).toLowerCase();
      let matchAttribution = true;
      if (selectedAttribution === "adp") {
        matchAttribution = resp.includes("ateliers") || p.universeSlug === "adp-project" || p.slug === "018-studio" || p.slug === "workbox";
      } else if (selectedAttribution === "barlabarla") {
        matchAttribution = resp.includes("barlabarla");
      } else if (selectedAttribution === "collaboration") {
        matchAttribution = resp.includes("collaboration");
      } else if (selectedAttribution === "personnel") {
        matchAttribution = resp.includes("personnel") || resp.includes("privé");
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);

      return matchCategory && matchAttribution && matchSearch;
    });
  }, [selectedCategory, selectedAttribution, searchQuery]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: "clamp(2.5rem, 5vw, 5rem) 0" }} id="main-content">
        <div className="container">
          {/* Fil d'Ariane */}
          <nav
            aria-label="Fil d'Ariane"
            style={{ marginBottom: "2rem", fontSize: "0.88rem", color: "var(--text-muted)" }}
          >
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
              Accueil
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--accent-brass)", fontWeight: 700 }}>Portfolio &amp; Archives</span>
          </nav>

          {/* En-tête de section */}
          <header style={{ maxWidth: "860px", marginBottom: "3rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "4px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(197, 155, 83, 0.12)",
                  color: "var(--accent-brass)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <span>Fonds Documentaire Certifié • 37 Références</span>
              </div>

              <Link
                href="/paul"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "4px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(2, 132, 199, 0.12)",
                  color: "#0284C7",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>★ Espace Paul Boubert (Architecte / BIM) →</span>
              </Link>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Architecture &amp; Programmes Conçus
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginTop: "1rem",
                lineHeight: 1.65,
              }}
            >
              Le fonds documentaire d&apos;Atelier réunit les créations conçues directement par Les Ateliers de Paul ainsi que les références emblématiques issues du parcours professionnel de son fondateur Paul Boubert (notamment au sein du cabinet partenaire BARLABARLA Architectes et en collaborations d&apos;ingénierie). Chaque réalisation respecte rigoureusement son attribution légale, ses crédits d&apos;origine et le cadre déontologique de la Loi ONAC n° 90/039.
            </p>
          </header>

          {/* Filtres & Recherche */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              marginBottom: "3rem",
              padding: "1.5rem",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Barre de recherche */}
            <div>
              <label
                htmlFor="portfolio-search"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                Rechercher une référence ou une ville
              </label>
              <input
                id="portfolio-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex : Douala, D-Web Holding, Bertoua, Clinique, Villa..."
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Filtres de Gouvernance & Cadre d'Attribution */}
            <div>
              <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-brass)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Cadre d&apos;Attribution &amp; Structure Responsable
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                {[
                  { id: "all", label: "Tous les contextes (37)" },
                  { id: "adp", label: "📐 Projets d'Atelier ADP" },
                  { id: "barlabarla", label: "🏛️ Cabinet Partenaire (BARLABARLA)" },
                  { id: "collaboration", label: "🤝 Collaborations Professionnelles" },
                  { id: "personnel", label: "✏️ Études Personnelles & Libres" },
                ].map((att) => (
                  <button
                    key={att.id}
                    type="button"
                    onClick={() => setSelectedAttribution(att.id)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8rem",
                      fontWeight: selectedAttribution === att.id ? 700 : 500,
                      backgroundColor: selectedAttribution === att.id ? "var(--accent-brass)" : "var(--bg-secondary)",
                      color: selectedAttribution === att.id ? "#11161F" : "var(--text-secondary)",
                      border: selectedAttribution === att.id ? "1px solid var(--accent-brass)" : "1px solid var(--border-default)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {att.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutons de typologies */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? ALL_PROJECTS.length
                    : ALL_PROJECTS.filter((p) => p.typology === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: isActive
                        ? "1px solid var(--accent-brass)"
                        : "1px solid var(--border-subtle)",
                      backgroundColor: isActive
                        ? "rgba(197, 155, 83, 0.15)"
                        : "var(--bg-secondary)",
                      color: isActive ? "var(--accent-brass)" : "var(--text-secondary)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille des projets */}
          {filteredProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>Aucun projet ne correspond à votre recherche</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Essayez d&apos;autres mots-clés ou réinitialisez les filtres.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className={styles.btnSecondary}
                style={{ marginTop: "1rem" }}
              >
                <span>Réinitialiser les filtres</span>
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.75rem",
              }}
            >
              {filteredProjects.map((project) => {
                const coverUrl =
                  PROJECTS_MEDIA[project.mediaFolder]?.cover?.url ||
                  "/assets/placeholders/project-placeholder.svg";

                return (
                  <article
                    key={project.id}
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-default)",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "var(--shadow-card)",
                      overflow: "hidden",
                      position: "relative",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    {/* Bandeau d'accent */}
                    <div
                      style={{
                        height: "4px",
                        backgroundColor: project.accentColor,
                        width: "100%",
                      }}
                    />

                    {/* VIGNETTE VISUELLE COUVERTURE */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        backgroundColor: "var(--bg-secondary)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Badge de contexte & statut */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0.75rem",
                          left: "0.75rem",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            padding: "2px 8px",
                            backgroundColor: "rgba(17, 22, 31, 0.85)",
                            backdropFilter: "blur(4px)",
                            color: "var(--accent-brass)",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                          }}
                        >
                          {getProjectResponsibleEntity(project)}
                        </span>
                        <span
                          style={{
                            padding: "2px 8px",
                            backgroundColor: "rgba(17, 22, 31, 0.85)",
                            backdropFilter: "blur(4px)",
                            color: getProjectStatus(project) === "Réalisé/livré" || getProjectStatus(project) === "Réalisé" ? "#4ECA8E" : "#CBD5E1",
                            borderRadius: "4px",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}
                        >
                          {getProjectStatus(project)}
                        </span>
                      </div>
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
                          top: "0.75rem",
                          right: "0.75rem",
                          backgroundColor: "rgba(26, 34, 45, 0.8)",
                          color: "#FFFFFF",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        {project.year}
                      </div>
                    </div>

                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: "4px",
                            backgroundColor: `${project.accentColor}18`,
                            color: project.accentColor,
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          style={{
                            fontSize: "1.25rem",
                            color: project.accentColor,
                          }}
                          aria-hidden="true"
                        >
                          {project.symbol}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          margin: "0 0 0.35rem 0",
                        }}
                      >
                        {project.title}
                      </h2>

                      <div
                        style={{
                          fontSize: "0.88rem",
                          color: project.accentColor,
                          fontWeight: 600,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {project.subtitle}
                      </div>

                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          marginBottom: "1.25rem",
                          flex: 1,
                        }}
                      >
                        {project.excerpt.length > 140
                          ? `${project.excerpt.slice(0, 140)}...`
                          : project.excerpt}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                          borderTop: "1px solid var(--border-subtle)",
                          paddingTop: "1rem",
                          marginTop: "auto",
                        }}
                      >
                        <span>📍 {project.location}</span>
                        <span>{project.bimLOD || "BIM LOD 300"}</span>
                      </div>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          padding: "0.65rem 1rem",
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          borderRadius: "var(--radius-sm)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          border: "1px solid var(--border-default)",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span>Examiner la fiche projet</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Rappel d'accréditation et conformité ONAC */}
          <footer
            style={{
              marginTop: "4rem",
              padding: "2rem",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>⚖️</div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>
              Cadre Déontologique &amp; Intégrité Professionnelle
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                maxWidth: "760px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Les interventions présentées ci-dessus ont été conduites en stricte conformité avec les règles de l&apos;Ordre National des Architectes du Cameroun (ONAC). Les missions réglementées de maîtrise d&apos;œuvre et de délivrance de permis de construire sont assurées avec des architectes agréés inscrits au Tableau de l&apos;Ordre.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <Link
                href="/cadre-deontologique"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--accent-brass)",
                  textDecoration: "underline",
                }}
              >
                Consulter notre charte et cadre déontologique complet →
              </Link>
            </div>
          </footer>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
