"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/all-projects";
import { UNIVERSES } from "@/data/universes";
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

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchCategory =
        selectedCategory === "all" || p.typology === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
                marginBottom: "1rem",
              }}
            >
              <span>🏛️</span>
              <span>Archives Certifiées d&apos;Atelier &amp; Chantiers</span>
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
              Portfolio Architectural &amp; Programmes Réalisés
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginTop: "1rem", lineHeight: 1.6 }}>
              Découvrez la sélection de 37 références d&apos;architecture, modélisations BIM et aménagements spatiaux conduits au Cameroun par Les Ateliers de Paul et ses confrères partenaires.
            </p>
          </header>

          {/* Barre de filtres et recherche */}
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              padding: "1.25rem",
              marginBottom: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Input de recherche */}
            <div>
              <label htmlFor="portfolio-search" className="sr-only">
                Rechercher un projet, une ville ou un matériau
              </label>
              <input
                id="portfolio-search"
                type="search"
                placeholder="Rechercher par projet, ville (Douala, Yaoundé, Bertoua...), typologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Boutons de catégories */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
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
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-default)",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow-sm)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Bandeau d'en-tête de carte */}
                  <div
                    style={{
                      height: "6px",
                      backgroundColor: project.accentColor,
                      width: "100%",
                    }}
                  />

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

                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                      📍 {project.location} • 📅 {project.year}
                      {project.surface && ` • 📐 ${project.surface}`}
                    </div>

                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        margin: "0 0 1.25rem 0",
                        flex: 1,
                      }}
                    >
                      {project.excerpt}
                    </p>

                    {/* Badge certifié Legacy */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--border-subtle)",
                        marginTop: "auto",
                      }}
                    >
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ color: "var(--status-success)" }}>✓</span> Référence vérifiée
                      </span>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: project.accentColor,
                          textDecoration: "none",
                        }}
                      >
                        Fiche technique →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Rappel déontologique discret */}
          <div
            style={{
              marginTop: "4rem",
              padding: "1.5rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            <strong>Note déontologique :</strong> L&apos;ensemble des projets d&apos;architecture réglementés (dépôts de permis de construire, maîtrise d&apos;œuvre complète) figurant dans nos archives ont été réalisés en collaboration étroite avec des architectes inscrits au Tableau de l&apos;Ordre National des Architectes du Cameroun (ONAC).{" "}
            <Link href="/cadre-deontologique" style={{ color: "var(--accent-brass)", textDecoration: "underline" }}>
              En savoir plus sur notre cadre déontologique
            </Link>.
          </div>
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
