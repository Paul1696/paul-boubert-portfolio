"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FULL_PORTFOLIO_REFERENCES,
  ArchitecturalProject,
  getProjectStatus,
  getProjectIntervention,
  getProjectPaulRole,
  getProjectResponsibleEntity,
} from "@/data/all-projects";
import { PROJECTS_MEDIA } from "@/data/media-manifest";
import PaulSidebar from "@/components/paul/PaulSidebar";
import styles from "@/styles/paul-portfolio.module.css";
import {
  Search,
  MapPin,
  ArrowUpRight,
  LayoutGrid,
  List,
  ArrowLeft,
  X,
} from "lucide-react";

const ARCHITECTURAL_PROJECTS = FULL_PORTFOLIO_REFERENCES.filter(
  (project) => project.projectType !== "digital" && project.projectType !== "design"
);

const CATEGORY_FILTERS = [
  { id: "all", label: "Tous", match: () => true },
  {
    id: "residential",
    label: "Résidentiel",
    match: (p: ArchitecturalProject) =>
      p.typology === "Résidentiel" ||
      /résidence|villa|duplex|appartement|studio|horizon|mandeng|owona|sequoia|mbella/i.test(
        `${p.slug} ${p.title} ${p.category}`
      ),
  },
  {
    id: "offices",
    label: "Bureaux & services",
    match: (p: ArchitecturalProject) =>
      /bureau|siège|tertiaire|dsi|perenco|meeting|bicec|banque/i.test(
        `${p.slug} ${p.title} ${p.category} ${p.typology}`
      ),
  },
  {
    id: "commercial",
    label: "Commercial & restauration",
    match: (p: ArchitecturalProject) =>
      /commercial|commerce|boutique|restaurant|café|croissanterie|showroom|boj|suka|pharmacie|grill/i.test(
        `${p.slug} ${p.title} ${p.category} ${p.typology}`
      ),
  },
  {
    id: "industrial",
    label: "Industriel & équipements",
    match: (p: ArchitecturalProject) =>
      /industriel|logistique|entrepot|halle|base|petrofor|enem|hotel|pavillon/i.test(
        `${p.slug} ${p.title} ${p.category} ${p.typology}`
      ),
  },
  {
    id: "bim",
    label: "BIM & documentation",
    match: (p: ArchitecturalProject) =>
      /bim|lod|revit|synthèse|technique|dqe|dce|exe/i.test(
        `${p.slug} ${p.title} ${p.category} ${p.bimLOD || ""}`
      ),
  },
];

export default function PaulCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    ARCHITECTURAL_PROJECTS.forEach((project) => {
      const matches = project.year.match(/\b(20\d\d)\b/g);
      if (matches) {
        matches.forEach((y) => yearsSet.add(y));
      }
    });
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, []);

  const filteredProjects = useMemo(() => {
    const activeFilter =
      CATEGORY_FILTERS.find((f) => f.id === selectedCategory) ||
      CATEGORY_FILTERS[0];

    const filtered = ARCHITECTURAL_PROJECTS.filter((project) => {
      if (!activeFilter.match(project)) return false;
      if (selectedYear !== "all" && !project.year.includes(selectedYear)) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.excerpt.toLowerCase().includes(q) ||
        getProjectPaulRole(project).toLowerCase().includes(q)
      );
    });

    return filtered.sort((a, b) => {
      const matchA = a.year.match(/\b(20\d\d)\b/);
      const matchB = b.year.match(/\b(20\d\d)\b/);
      const yearA = matchA ? parseInt(matchA[1], 10) : 2026;
      const yearB = matchB ? parseInt(matchB[1], 10) : 2026;
      return yearB - yearA;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedYear !== "all" ||
    Boolean(searchQuery.trim());

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedYear("all");
    setSearchQuery("");
  };

  const getCoverImage = (project: ArchitecturalProject): string => {
    const folderInfo = PROJECTS_MEDIA[project.mediaFolder];
    if (folderInfo && folderInfo.cover && folderInfo.cover.url) {
      return folderInfo.cover.url;
    }
    return "/assets/media/placeholders/project-placeholder.svg";
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation latérale unifiée */}
      <PaulSidebar isCatalogPage={true} />

      {/* Zone Principale */}
      <main className={styles.mainContent} style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Bandeau d'en-tête du catalogue */}
        <div className={styles.portfolioIntro}>
          {/* Fil d'Ariane & retour */}
          <div style={{ marginBottom: "1.25rem" }}>
            <Link
              href="/paul"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                color: "#1d4f91",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={14} />
              <span>Retour à la présentation personnelle</span>
            </Link>
          </div>

          {/* En-tête en 2 colonnes */}
          <div className={styles.portfolioHeaderRow}>
            <div className={styles.portfolioIntroMain}>
              <p className={styles.portfolioEyebrow}>PORTFOLIO / CATALOGUE COMPLET</p>
              <h1 className={styles.portfolioTitle}>Catalogue des projets &amp; réalisations.</h1>
              <span className={styles.portfolioAccentLine} />
              <p className={styles.portfolioDescription}>
                L&apos;intégralité des 37 projets d&apos;architecture, de conception bioclimatique,
                d&apos;aménagement intérieur et de production BIM développés par Paul Boubert et ses partenaires.
              </p>
            </div>
            <div className={styles.portfolioCountBlock} aria-label={`${ARCHITECTURAL_PROJECTS.length} projets au catalogue`}>
              <span className={styles.portfolioCountDivider} aria-hidden="true" />
              <div className={styles.portfolioCountContent}>
                <strong className={styles.portfolioCountNumber}>{ARCHITECTURAL_PROJECTS.length}</strong>
                <span className={styles.portfolioCountLabel}>PROJETS</span>
              </div>
            </div>
          </div>

          {/* Séparateur horizontal fin */}
          <div className={styles.portfolioHeaderDivider} />

          {/* Rangée 1 : Recherche en direct + Filtre par année + Switcher de vue */}
          <div className={styles.portfolioCollectionRow}>
            <div style={{ position: "relative", minWidth: "260px", flex: 1, maxWidth: "420px" }}>
              <Search
                size={16}
                color="#64748B"
                style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, ville, programme..."
                aria-label="Rechercher dans le catalogue"
                style={{
                  width: "100%",
                  padding: "0.52rem 2.2rem 0.52rem 2.4rem",
                  borderRadius: "999px",
                  border: "1px solid #CBD5E1",
                  fontSize: "0.82rem",
                  color: "#08243F",
                  outline: "none",
                  backgroundColor: "#FFFFFF",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#94A3B8",
                  }}
                  aria-label="Effacer la recherche"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto", flexWrap: "wrap" }}>
              <label className={styles.portfolioYearFilter}>
                <span className={styles.portfolioYearLabel}>Filtrer par année</span>
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value)}
                  aria-label="Filtrer par année"
                >
                  <option value="all">Année : toutes</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              {/* Vue Grille / Liste */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#F1F5F9",
                  borderRadius: "8px",
                  padding: "2px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  style={{
                    border: "none",
                    background: viewMode === "grid" ? "#FFFFFF" : "transparent",
                    color: viewMode === "grid" ? "#08243F" : "#64748B",
                    padding: "0.38rem 0.65rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                  aria-label="Affichage en grille"
                  title="Grille"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  style={{
                    border: "none",
                    background: viewMode === "list" ? "#FFFFFF" : "transparent",
                    color: viewMode === "list" ? "#08243F" : "#64748B",
                    padding: "0.38rem 0.65rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                  aria-label="Affichage en liste"
                  title="Liste"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Rangée 2 : Filtres de catégories */}
          <div className={styles.portfolioCategoryRow} role="tablist" aria-label="Filtrer les projets par catégorie">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.portfolioFilter} ${isActive ? styles.portfolioFilterActive : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className={styles.portfolioResetLink}
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>

          {/* Séparateur horizontal discret avant la grille */}
          <div className={styles.portfolioCategoryDivider} />
        </div>

        {/* Conteneur de la galerie */}
        <div className={styles.galleryContainer}>
          <div className={styles.galleryHeaderInfo}>
            <strong>Catalogue exhaustif</strong>
            <span>
              Affichage de {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} sur {ARCHITECTURAL_PROJECTS.length}
              {selectedYear !== "all" && ` (Année : ${selectedYear})`}
              {selectedCategory !== "all" && ` • ${CATEGORY_FILTERS.find((c) => c.id === selectedCategory)?.label}`}
            </span>
          </div>

          {/* Mode Grille */}
          {viewMode === "grid" && (
            <div className={styles.gridMode}>
              {filteredProjects.map((project) => {
                const coverUrl = getCoverImage(project);
                const status = getProjectStatus(project);
                const targetUrl = `/paul/projet/${project.slug}`;

                return (
                  <article key={project.id} className={styles.archCard}>
                    <div className={styles.archCardMedia}>
                      <Image
                        src={coverUrl}
                        alt={project.title}
                        width={640}
                        height={420}
                        className={styles.archCardImg}
                        loading="lazy"
                      />
                    </div>

                    <div className={styles.archCardBody}>
                      <div className={styles.cardMetaRow}>
                        <span>{project.category || project.typology}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.cardDescription}>
                        {project.programme || project.subtitle || project.excerpt}
                      </p>
                      <div className={styles.cardCreditLine}>
                        <span>{getProjectResponsibleEntity(project)}</span>
                        {status && <span>{status}</span>}
                      </div>

                      <div className={styles.cardFootRow}>
                        <span className={styles.locationTag}>
                          <MapPin size={13} color="#64748B" />
                          <span>{project.location}</span>
                        </span>

                        <Link
                          href={targetUrl}
                          className={styles.viewProjectLink}
                          aria-label={`Consulter le projet ${project.title}`}
                        >
                          <span>Découvrir</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Mode Liste */}
          {viewMode === "list" && (
            <div className={styles.listMode}>
              {filteredProjects.map((project) => {
                const coverUrl = getCoverImage(project);
                const status = getProjectStatus(project);
                const paulRole = getProjectPaulRole(project);
                const targetUrl = `/paul/projet/${project.slug}`;

                return (
                  <article key={project.id} className={styles.archListRow}>
                    <div className={styles.listColThumb}>
                      <Image
                        src={coverUrl}
                        alt={project.title}
                        width={120}
                        height={80}
                        className={styles.listThumbImg}
                      />
                    </div>

                    <div className={styles.listColTitle}>
                      <h4 className={styles.listMainTitle}>{project.title}</h4>
                      <span className={styles.listSubTitle}>{project.subtitle || project.programme}</span>
                    </div>

                    <div className={styles.listColRole}>
                      <span style={{ fontWeight: 600, color: "#0F172A" }}>{paulRole}</span>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>
                        {getProjectResponsibleEntity(project)}
                      </div>
                    </div>

                    <div className={styles.listColMeta}>
                      <span>{project.location}</span>
                      <span style={{ fontFamily: "var(--font-mono, monospace)" }}>
                        {project.year} • {status}
                      </span>
                    </div>

                    <div>
                      <Link href={targetUrl} className={styles.viewProjectLink}>
                        <span>Détails</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Message si aucun projet ne correspond */}
          {filteredProjects.length === 0 && (
            <div
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px dashed #CBD5E1",
                marginTop: "2rem",
              }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Aucun projet ne correspond à cette recherche.
              </p>
              <p style={{ color: "#64748B", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Modifiez vos filtres ou réinitialisez la sélection pour afficher les projets.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1.25rem",
                  backgroundColor: "#0F172A",
                  color: "#FFFFFF",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
