"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import styles from "@/styles/paul-portfolio.module.css";
import BirdFlock from "./BirdFlock";
import PaulSidebar from "@/components/paul/PaulSidebar";
import {
  Layers,
  User,
  GitBranch,
  Wrench,
  Mail,
  ArrowUpRight,
  PanelLeftClose,
  PanelLeftOpen,
  Download,
  Phone,
  MessageSquare,
  Box,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

type TabKey = "portfolio" | "transversal" | "profil" | "parcours" | "competences" | "contact";
type ViewMode = "grid" | "editorial" | "list";
type CollectionMode = "featured" | "all";

const ARCHITECTURAL_PROJECTS = FULL_PORTFOLIO_REFERENCES.filter(
  (project) => project.projectType !== "digital" && project.projectType !== "design"
);

interface CategoryFilter {
  id: string;
  label: string;
  match: (p: ArchitecturalProject) => boolean;
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: "all",
    label: `Tous les projets (${ARCHITECTURAL_PROJECTS.length})`,
    match: () => true,
  },
  {
    id: "residentiel",
    label: "Résidentiel",
    match: (p) => p.typology === "Résidentiel" || /résidence|villa|duplex|appartement|studio/i.test(p.title),
  },
  {
    id: "bureaux",
    label: "Bureaux & services",
    match: (p) => /bureau|meeting|perenco|bicec/i.test(`${p.title} ${p.category}`),
  },
  {
    id: "commercial",
    label: "Commercial & restauration",
    match: (p) => /boutique|café|grill|croissanterie|showroom|bojolais|immeuble mixte/i.test(p.title),
  },
  {
    id: "industriel",
    label: "Industriel",
    match: (p) => /entrepôt|petrofor|enem|halle automobile/i.test(p.title),
  },
  {
    id: "bim",
    label: "BIM & documentation",
    match: (p) => getProjectIntervention(p) === "BIM & Documentation Technique" || /BIM|documentation/i.test(p.category),
  },
];

const FEATURED_PROJECT_IDS = [
  "018-studio",
  "studio-epure",
  "bicec-usca",
  "agence-bancaire-moderne",
  "boj",
  "restaurant-urbain",
  "enem",
  "halle-automobile",
  "mbella",
  "residence-verticale",
  "showroom-kotto",
  "showroom-elegance",
  "web-tower",
  "tour-de-verre",
  "petrofor-base",
  "pole-industriel",
];

// Sous-titres architecturaux soignés
const PROJECT_CUSTOM_SUBTITLES: Record<string, string> = {
  "018-studio": "Optimisation et Design Contemporain",
  "bahemeck": "Raffinement au Coeur du Quartier d'Affaires",
  "bicec-bafoussam": "Réhabilitation & Modernisation",
  "bicec-usca": "Agencement Institutionnel & Sécurisation",
  "boj": "Architecture Résidentielle Haute Précision",
  "boutique-biyem-assi": "Design Commercial & Vitrine de Marque",
  "bureau-dsi": "Environnement Tertiaire & Ergonomie de Travail",
  "cabinet-elena": "Espace Médical & Confort Patient",
  "croissanterie": "Boulangerie Fine & Identité Gourmande",
  "duplex-domegne": "Résidence Privée Bioclimatique",
  "emeraude": "Programme Résidentiel Contemporain",
  "enem": "Infrastructures Éducatives & Volumes Épurés",
  "entrepot": "Plateforme Logistique & Structure Métallique",
  "grill-way": "Architecture Restauration & Flux Conviviaux",
  "harmony": "Habitat Collectif & Climatisation Passive",
  "horizon": "Immeuble Mixte Bureaux & Logements",
  "hotel-berteau": "Hôtellerie Haut de Gamme & Accueil Tropical",
  "hunter": "Éco-habitat en Conteneurs Maritimes",
  "lipem": "Villa Contemporaine & Intégration Paysagère",
  "mandeng": "Habitation Familiale & Matériaux Nobles",
  "mbella": "Conception d'Intérieurs & Coordination de Chantier",
  "meeting-room": "Espace de Décision & Acoustique Traitée",
  "mme-edzigui": "Aménagement Sur-Mesure & Menuiserie d'Atelier",
  "oasis": "Résidence Écologique & Patios Frais",
  "owona": "Propriété Résidentielle & Espaces Traversants",
  "perenco-offices": "Bureaux Corporatifs de Haute Technologie",
  "petrofor-base": "Base Opérationnelle & Gestion des Flux",
  "pharmacie-studio": "Pôle Santé Mixte & Optimisation Spatiale",
  "residence-hunter": "Reconversion Modulaire & Finitions Soignées",
  "residence-soa": "Résidence Universitaire & Espaces Partagés",
  "salle-de-fete": "Espace Événementiel & Grandes Portées",
  "sequoia": "Complexe Résidentiel & Végétalisation",
  "showroom-kotto": "Espace d'Exposition Mobilier & Éclairage Muséal",
  "suka-cafe": "Coffee Shop Urbain & Ambiance Chaleureuse",
  "tonye": "Architecture Résidentielle & Lignes Intemporelles",
  "web-tower": "Tour Tertiaire & Façade Double-Peau",
  "workbox": "Tiers-lieu de Création & Coworking Collaboratif",
  "adp-bim-architect": "Plugin Revit, SketchUp Ruby & Copilot IA Autonome",
  "adp-flow": "Automatisation des Devis & Chiffrage d'Atelier",
  "adp-web-experience": "The Possibility Machine — Architecture Next.js 15",
  "rosbri-wax-design": "Collection Signature Bois Nobles & Textiles Wax",
};

export default function PaulBoubertPortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("portfolio");
  const [collectionMode, setCollectionMode] = useState<CollectionMode>("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sortOrder: "recent" | "oldest" = "recent";
  const viewMode = "grid" as ViewMode;

  // Synchronisation bidirectionnelle du hash d'URL avec l'onglet actif
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash.replace("#", "").toLowerCase() as TabKey;
      const validTabs: TabKey[] = ["portfolio", "transversal", "profil", "parcours", "competences", "contact"];
      if (validTabs.includes(rawHash)) {
        setActiveTab(rawHash);
        if (rawHash !== "portfolio") {
          setTimeout(() => {
            const el = document.getElementById(rawHash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 80);
        }
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  // Sélection d'un onglet avec mise à jour immédiate de l'URL et visibilité fluide
  const handleTabChange = useCallback((tab: string) => {
    const validTabs: TabKey[] = ["portfolio", "transversal", "profil", "parcours", "competences", "contact"];
    if (validTabs.includes(tab as TabKey)) {
      const selected = tab as TabKey;
      setActiveTab(selected);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${selected}`);
        if (selected !== "portfolio") {
          setTimeout(() => {
            const el = document.getElementById(selected);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 60);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  }, []);

  // Filtrage et tri de l'ensemble des références
  const filteredProjects = useMemo(() => {
    const activeFilter =
      CATEGORY_FILTERS.find((f) => f.id === selectedCategory) ||
      CATEGORY_FILTERS[0];

    const filtered = ARCHITECTURAL_PROJECTS.filter((project) => {
      const matchCat = activeFilter.match(project);
      if (!matchCat) return false;
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
      return sortOrder === "recent" ? yearB - yearA : yearA - yearB;
    });
  }, [selectedCategory, selectedYear, searchQuery, sortOrder]);

  const displayedProjects = useMemo(() => {
    if (collectionMode === "featured") {
      const featured = filteredProjects.filter(
        (project) =>
          FEATURED_PROJECT_IDS.includes(project.slug) || project.featuredEditorial
      );
      if (featured.length === 0 && filteredProjects.length > 0) {
        return filteredProjects.slice(0, visibleCount);
      }
      return featured.slice(0, 8);
    }
    return filteredProjects.slice(0, visibleCount);
  }, [collectionMode, filteredProjects, visibleCount]);

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
  const hasActiveFilters = selectedCategory !== "all" || selectedYear !== "all" || Boolean(searchQuery.trim());
  const resetFilters = () => { setSelectedCategory("all"); setSelectedYear("all"); setSearchQuery(""); setVisibleCount(12); };

  // Résolution robuste des images existantes (Section 11)
  const getCoverImage = (project: ArchitecturalProject): string => {
    // Si c'est un projet digital ou de marque
    if (project.projectType === "digital" || project.projectType === "design") {
      if (project.slug === "adp-bim-architect") return "/assets/media/identities/tools.webp";
      if (project.slug === "adp-flow") return "/assets/media/identities/brief.webp";
      if (project.slug === "adp-web-experience") return "/assets/media/identities/project.webp";
      if (project.slug === "rosbri-wax-design") return "/assets/media/identities/rosbri.webp";
    }

    const folderInfo = PROJECTS_MEDIA[project.mediaFolder];
    if (folderInfo && folderInfo.cover && folderInfo.cover.url) {
      return folderInfo.cover.url;
    }
    return "/assets/media/placeholders/project-placeholder.svg";
  };

  const getTargetUrl = (project: ArchitecturalProject): string => {
      return `/paul/projet/${project.slug}`;
    if (project.projectType === "digital") {
      if (project.slug === "adp-bim-architect") return "/adp-tools";
      if (project.slug === "adp-flow") return "/adp-brief";
      if (project.slug === "adp-web-experience") return "/adp-project";
    }
    if (project.projectType === "design") {
      return "/rosbri-design";
    }
    return `/portfolio/${project.slug}`;
  };

  const getCardCategory = (project: ArchitecturalProject): string => {
    const key = `${project.slug} ${project.title}`;
    if (/bicec|agence-bancaire|bancaire/i.test(key)) return "Banques & services";
    if (/bureau|meeting|perenco/i.test(key)) return "Bureaux & services";
    if (/boutique|café|grill|croissanterie|showroom|boj|pharmacie|immeuble-mixte/i.test(key)) return "Commercial & restauration";
    if (/entrepot|petrofor|enem|halle-automobile|salle-de-fete|hotel-bertoua/i.test(key)) return "Industriel & équipements";
    if (project.typology === "Résidentiel" || /résidence|villa|duplex|appartement|studio|horizon|mandeng|owona|sequoia|mbella/i.test(key)) return "Résidentiel";
    return project.typology;
  };

  const vcardUrl = "/contact/Paul_Boubert.vcf";
  const whatsappUrl =
    "https://wa.me/237690087213?text=" +
    encodeURIComponent(
      "Bonjour Paul Boubert, je consulte votre portfolio d'architecture et de modélisation BIM et souhaite échanger avec vous."
    );
  const transversalProjects = FULL_PORTFOLIO_REFERENCES.filter(
    (project) => project.projectType === "digital" || project.projectType === "design"
  );

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation latérale unifiée et réutilisable (Étape 2) */}
      <PaulSidebar activeTab={activeTab} onSelectTab={handleTabChange} />

      {/* ==============================================================
          ZONE PRINCIPALE
          ============================================================== */}
      <main className={styles.mainContent} style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* ==============================================================
            03 — BANNIÈRE PRINCIPALE ARCHITECTURALE & IMMERSIVE
            ============================================================== */}
        <section className={styles.heroBanner}>
          <img className={styles.heroVideo} src="/assets/personal/paul-banner.png" alt="Résidence contemporaine de Paul Boubert" />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <BirdFlock />
          <div className={styles.heroCyclist} role="img" aria-label="Cycliste traversant la bannière" />
          <div className={styles.heroContentGrid}>
            <div className={styles.heroTextCol}>
              <span className={styles.heroKickerBadge}>Portfolio professionnel</span>
              <h2 className={styles.heroTitle}>Paul Boubert</h2>
              <p className={styles.heroRole}>Assistant architecte · Projeteur BIM · Coordination de projet</p>
              <p className={styles.heroSubtitle}>De la conception architecturale à la coordination technique, une approche associant précision, créativité et technologies numériques.</p>
              <div className={styles.heroActions}>
                <a href="#portfolio" className={styles.heroPrimaryButton}>Explorer mes projets <ArrowUpRight size={16} /></a>
                <button type="button" className={styles.heroSecondaryButton} onClick={() => handleTabChange("parcours")}>Découvrir mon parcours</button>
              </div>
              <div className={styles.heroProfessionalMetrics} aria-label="Compétences principales">
                <span><strong>6+</strong><small>Années d&apos;expérience</small></span>
                <span><strong>BIM</strong><small>Modélisation &amp; coordination</small></span>
                <span><strong>EXE</strong><small>Production technique</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            ONGLET 1 : PORTFOLIO
            ============================================================== */}
        {activeTab === "portfolio" && (
          <>
            <div id="portfolio" className={styles.portfolioIntro}>
              {/* ÉTAPE 2 : EN-TÊTE EN 2 COLONNES */}
              <div className={styles.portfolioHeaderRow}>
                <div className={styles.portfolioIntroMain}>
                  <p className={styles.portfolioEyebrow}>PORTFOLIO / PROJETS SÉLECTIONNÉS</p>
                  <h2 className={styles.portfolioTitle}>Projets &amp; réalisations.</h2>
                  <span className={styles.portfolioAccentLine} />
                  <p className={styles.portfolioDescription}>
                    Une sélection de travaux en architecture, aménagement intérieur et conception BIM, entre projets personnels et collaborations professionnelles.
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

              {/* SÉPARATEUR HORIZONTAL FIN SOUS L'EN-TÊTE */}
              <div className={styles.portfolioHeaderDivider} />

              {/* ÉTAPE 3 : PREMIÈRE LIGNE (COLLECTION & FILTRE ANNUEL) */}
              <div className={styles.portfolioCollectionRow} role="tablist" aria-label="Sélectionner une collection">
                <div className={styles.portfolioCollectionButtons}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={collectionMode === "featured"}
                    className={`${styles.portfolioFilter} ${collectionMode === "featured" ? styles.portfolioFilterActive : ""}`}
                    onClick={() => { setCollectionMode("featured"); setVisibleCount(12); }}
                  >
                    À la une
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={collectionMode === "all"}
                    className={`${styles.portfolioFilter} ${collectionMode === "all" ? styles.portfolioFilterActive : ""}`}
                    onClick={() => { setCollectionMode("all"); setVisibleCount(12); }}
                  >
                    Tous les projets
                  </button>
                </div>

                <label className={styles.portfolioYearFilter}>
                  <span className={styles.portfolioYearLabel}>Filtrer par année</span>
                  <select
                    value={selectedYear}
                    onChange={(event) => { setSelectedYear(event.target.value); setVisibleCount(12); }}
                    aria-label="Filtrer par année"
                  >
                    <option value="all">Année : toutes</option>
                    {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
                  </select>
                </label>
              </div>

              {/* ÉTAPE 3 : DEUXIÈME LIGNE (CATÉGORIES) */}
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
                      {cat.id === "all" ? "Tous" : cat.label}
                    </button>
                  );
                })}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className={styles.portfolioResetLink}
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* SÉPARATEUR HORIZONTAL DISCRET SOUS LES CATÉGORIES */}
              <div className={styles.portfolioCategoryDivider} />
            </div>

            {/* CONTENEUR DE LA GALERIE */}
            <div className={styles.galleryContainer}>
              <div className={styles.galleryHeaderInfo}>
                <strong>{collectionMode === "featured" ? "Projets à la une" : "Tous les projets"}</strong>
                <span>
                  {collectionMode === "featured"
                    ? "Une sélection de projets représentatifs de mon parcours."
                    : "Explorer les projets d’architecture, d’aménagement intérieur et de BIM."}
                  {" · "}
                  {displayedProjects.length} résultat{displayedProjects.length > 1 ? "s" : ""}
                  {collectionMode === "featured" && filteredProjects.length > displayedProjects.length && (
                    <> ({filteredProjects.length} au total dans &laquo; Tous les projets &raquo;)</>
                  )}
                </span>
                {searchQuery && (
                  <span style={{ fontSize: "0.8rem", color: "#0284C7" }}>
                    Résultats pour « {searchQuery} »
                  </span>
                )}
              </div>

              {/* ==========================================================
                  MODE 1 : GRILLE ARCHITECTURALE (3 COLONNES)
                  ========================================================== */}
              {viewMode === "grid" && (
                <div className={styles.gridMode}>
                  {displayedProjects.map((project) => {
                    const coverUrl = getCoverImage(project);
                    const subtitle =
                      PROJECT_CUSTOM_SUBTITLES[project.slug] ||
                      project.subtitle ||
                      "Conception & Modélisation Architecturale";
                    const status = getProjectStatus(project);
                    const targetUrl = getTargetUrl(project);
                    const cardTitle = project.title;

                    return (
                      <article key={project.id} className={styles.archCard}>
                        {/* Image architecturale */}
                        <div className={styles.archCardMedia}>
                          <Image
                            src={coverUrl}
                            alt={cardTitle}
                            width={640}
                            height={420}
                            className={styles.archCardImg}
                            loading="lazy"
                          />

                        </div>

                        {/* Corps de carte */}
                        <div className={styles.archCardBody}>
                          <div className={styles.cardMetaRow}>
                            <span>{getCardCategory(project)}</span>
                            <span>{project.year}</span>
                          </div>
                          <h3 className={styles.cardTitle}>{cardTitle}</h3>
                          <p className={styles.cardDescription}>{project.programme || project.subtitle || subtitle}</p>
                          <div className={styles.cardCreditLine}>
                            <span>{getProjectResponsibleEntity(project)}</span>
                            {status && <span>{status}</span>}
                          </div>

                          {/* Pied de carte avec action Voir le projet */}
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

              {/* ==========================================================
                  MODE 2 : GALERIE ÉDITORIALE (ASYMÉTRIQUE)
                  ========================================================== */}
              {viewMode === "editorial" && (
                <div className={styles.editorialMode}>
                  {displayedProjects.map((project, idx) => {
                    const isFeatured = idx % 5 === 0 || project.featuredEditorial;
                    const coverUrl = getCoverImage(project);
                    const subtitle =
                      PROJECT_CUSTOM_SUBTITLES[project.slug] ||
                      project.subtitle ||
                      "Conception & Modélisation Architecturale";
                    const status = getProjectStatus(project);
                    const paulRole = getProjectPaulRole(project);
                    const targetUrl = getTargetUrl(project);

                    if (isFeatured) {
                      return (
                        <article key={project.id} className={styles.editorialCardFeatured}>
                          <div className={styles.archCardMedia} style={{ height: "100%", minHeight: 280 }}>
                            <Image
                              src={coverUrl}
                              alt={project.title}
                              width={800}
                              height={500}
                              className={styles.archCardImg}
                              loading="lazy"
                            />
                            <span className={styles.mediaCategoryBadge}>Projet Phare</span>
                          </div>

                          <div className={styles.archCardBody} style={{ padding: "1.75rem" }}>
                            <div className={styles.cardHeadRow}>
                              <h3 className={styles.cardTitle} style={{ fontSize: "1.4rem" }}>
                                {project.title}
                              </h3>
                              <span className={styles.cardYear}>{project.year}</span>
                            </div>

                            <div className={styles.cardSubtitle} style={{ fontSize: "0.95rem" }}>
                              {subtitle}
                            </div>

                            <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                              {project.excerpt}
                            </p>

                            <div className={styles.cardRoleMeta}>
                              <span className={styles.roleLabel}>Rôle officiel :</span>
                              <span className={styles.roleValue}>{paulRole}</span>
                            </div>

                            <div className={styles.cardFootRow}>
                              <span className={styles.locationTag}>
                                <MapPin size={13} color="#64748B" />
                                <span>{project.location}</span>
                              </span>

                              <Link href={targetUrl} className={styles.viewProjectLink}>
                                <span>Explorer la réalisation</span>
                                <ArrowUpRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    }

                    return (
                      <article key={project.id} className={styles.editorialCardRegular}>
                        <div className={styles.archCard}>
                          <div className={styles.archCardMedia}>
                            <Image
                              src={coverUrl}
                              alt={project.title}
                              width={600}
                              height={400}
                              className={styles.archCardImg}
                              loading="lazy"
                            />
                            <span className={styles.mediaStatusBadge}>{status}</span>
                          </div>

                          <div className={styles.archCardBody}>
                            <div className={styles.cardHeadRow}>
                              <h3 className={styles.cardTitle}>{project.title}</h3>
                              <span className={styles.cardYear}>{project.year}</span>
                            </div>
                            <div className={styles.cardSubtitle}>{subtitle}</div>

                            <div className={styles.cardRoleMeta}>
                              <span className={styles.roleLabel}>Rôle :</span>
                              <span className={styles.roleValue}>{paulRole}</span>
                            </div>

                            <div className={styles.cardFootRow}>
                              <span className={styles.locationTag}>
                                <MapPin size={13} color="#64748B" />
                                <span>{project.location}</span>
                              </span>
                              <Link href={targetUrl} className={styles.viewProjectLink}>
                                <span>Voir</span>
                                <ArrowUpRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* ==========================================================
                  MODE 3 : LISTE DÉTAILLÉE
                  ========================================================== */}
              {viewMode === "list" && (
                <div className={styles.listMode}>
                  {displayedProjects.map((project) => {
                    const coverUrl = getCoverImage(project);
                    const paulRole = getProjectPaulRole(project);
                    const status = getProjectStatus(project);
                    const targetUrl = getTargetUrl(project);

                    return (
                      <article key={project.id} className={styles.listRowCard}>
                        <div className={styles.listThumb}>
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
                          <span className={styles.listSubTitle}>{project.subtitle}</span>
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

              {displayedProjects.length === 0 && (
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
                    Aucun projet ne correspond à cette sélection.
                  </p>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Ajustez les filtres pour afficher d’autres projets.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      resetFilters();
                    }}
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
              {collectionMode === "featured" && filteredProjects.length > 0 && <button type="button" onClick={() => { setCollectionMode("all"); setVisibleCount(12); }} style={{ display: "block", margin: "2rem auto", padding: "0.8rem 1.4rem", border: "1px solid #1D4F91", borderRadius: 999, background: "transparent", color: "#1D4F91", cursor: "pointer", fontWeight: 700 }}>Voir tous les projets</button>}
              {collectionMode === "all" && visibleCount < filteredProjects.length && <button type="button" onClick={() => setVisibleCount((count) => count + 12)} style={{ display: "block", margin: "2rem auto", padding: "0.8rem 1.4rem", border: "1px solid #1D4F91", borderRadius: 999, background: "#1D4F91", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Charger davantage</button>}
            </div>
          </>
        )}

        {/* ==============================================================
            ONGLET 2 : PROJETS TRANSVERSAUX
            ============================================================== */}
        {activeTab === "transversal" && (
          <section id="transversal" className={styles.tabSectionWrapper}>
            <div className={styles.tabCard}>
              <div className={styles.tabHeaderBlock}>
                <h3 className={styles.tabMainTitle}>Projets transversaux</h3>
                <p className={styles.tabLeadText}>
                  Outils numériques, design et réalisations complémentaires à la pratique architecturale.
                </p>
              </div>
              <div className={styles.gridMode}>
                {transversalProjects.map((project) => {
                  const coverUrl = getCoverImage(project);
                  const targetUrl = getTargetUrl(project);
                  return (
                    <article key={project.id} className={styles.archCard}>
                      <div className={styles.archCardMedia}>
                        <Image src={coverUrl} alt={project.title} width={640} height={420} className={styles.archCardImg} loading="lazy" />
                        <span className={styles.mediaCategoryBadge}>
                          {project.projectType === "digital" ? "NUMÉRIQUE" : "DESIGN"}
                        </span>
                      </div>
                      <div className={styles.archCardBody}>
                        <div className={styles.cardHeadRow}>
                          <h3 className={styles.cardTitle}>{project.title}</h3>
                          <span className={styles.cardYear}>{project.year}</span>
                        </div>
                        <div className={styles.cardSubtitle}>{PROJECT_CUSTOM_SUBTITLES[project.slug] || project.subtitle}</div>
                        <div className={styles.cardRoleMeta}>
                          <span className={styles.roleLabel}>Nature du projet :</span>
                          <span className={styles.roleValue}>{getProjectIntervention(project)}</span>
                        </div>
                        <div className={styles.cardFootRow}>
                          <span className={styles.locationTag}>{project.location}</span>
                          <Link href={targetUrl} className={styles.viewProjectLink}>
                            <span>Voir le projet</span><ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ==============================================================
            ONGLET 3 : PROFIL PROFESSIONNEL & DÉONTOLOGIE
            ============================================================== */}
        {activeTab === "profil" && (
          <section id="profil" className={styles.tabSectionWrapper}>
            <div className={styles.tabCard}>
              <div className={styles.tabHeaderBlock}>
                <h3 className={styles.tabMainTitle}>Profil Professionnel</h3>
                <p className={styles.tabLeadText}>
                  Architecte de formation, projeteur BIM et concepteur principal au sein de Les Ateliers
                  de Paul (ADP).
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#334155", lineHeight: 1.75, fontSize: "0.95rem" }}>
                <p>
                  Paul Boubert conjugue la discipline du dessin d&apos;architecture, la rigueur de la
                  modélisation numérique BIM (LOD 100 à 400) et le développement de technologies
                  spatiales sur-mesure (C#, Ruby API, Web).
                </p>

                <p>
                  Spécialisé dans l&apos;adaptation climatique tropicale (ventilation transversale,
                  casquettes brise-soleil, matériaux locaux) et les programmes à fortes contraintes
                  sécuritaires ou techniques (agences bancaires BICEC, infrastructures tertiaires,
                  habitat haut de gamme), il assure la continuité entre la vision conceptuelle et
                  l&apos;exécution sur chantier.
                </p>

                {/* Cadre Déontologique ONAC (Loi 90/039) */}
                <div
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderLeft: "4px solid #0284C7",
                    borderRadius: "8px",
                    padding: "1.25rem 1.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <h4 style={{ margin: "0 0 0.5rem 0", color: "#0F172A", fontSize: "0.95rem", fontWeight: 700 }}>
                    ⚖ Rigueur Déontologique &amp; Attribution des Projets (Loi n° 90/039)
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6 }}>
                    Les références présentées dans ce portfolio distinguent rigoureusement les projets
                    conçus et réalisés en nom propre ou au sein de l&apos;Atelier (agencement, design,
                    outils) de ceux menés en collaboration ou sous la responsabilité de cabinets
                    d&apos;architecture mandataires inscrits au tableau de l&apos;Ordre National des
                    Architectes du Cameroun (ONAC). Chaque fiche technique spécifie le rôle précis de
                    Paul Boubert et la structure responsable.
                  </p>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <a
                    href={vcardUrl}
                    download="Paul_Boubert.vcf"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#0F172A",
                      color: "#FFFFFF",
                      padding: "0.85rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "0.88rem",
                    }}
                  >
                    <Download size={16} />
                    <span>Télécharger la vCard officielle (Paul_Boubert.vcf)</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==============================================================
            ONGLET 3 : PARCOURS & EXPÉRIENCE
            ============================================================== */}
        {activeTab === "parcours" && (
          <section id="parcours" className={styles.tabSectionWrapper}>
            <div className={styles.tabCard}>
              <div className={styles.tabHeaderBlock}>
                <h3 className={styles.tabMainTitle}>Parcours &amp; Repères Professionnels</h3>
                <p className={styles.tabLeadText}>
                  Plus de 6 années d&apos;exercice ininterrompu en conception, modélisation BIM et
                  coordination de projets d&apos;architecture.
                </p>
              </div>

              <div className={styles.timeline}>
                {/* 2022 - 2026 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker} />
                  <div className={styles.timelineDate}>2022 — 2026 • 4 ANS</div>
                  <h4 className={styles.timelineRole}>Fondateur &amp; Concepteur Principal</h4>
                  <div className={styles.timelineCompany}>Les Ateliers de Paul (ADP) • Douala &amp; Yaoundé</div>
                  <p className={styles.timelineDescription}>
                    Conception de plus de 37 programmes d&apos;architecture, d&apos;agencement et
                    d&apos;ingénierie (habitat résidentiel, sièges tertiaires, boutiques, réhabilitations
                    bancaires). Développement de la suite technologique interne (ADP BIM ARCHITECT, ADP
                    FLOW, The Possibility Machine) et direction d&apos;atelier.
                  </p>
                </div>

                {/* 2020 - 2022 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker} />
                  <div className={styles.timelineDate}>2020 — 2022 • 2 ANS</div>
                  <h4 className={styles.timelineRole}>Projeteur BIM &amp; Coordinateur Technique</h4>
                  <div className={styles.timelineCompany}>Cabinets Partenaires d&apos;Architecture • Cameroun</div>
                  <p className={styles.timelineDescription}>
                    Production et synthèse de maquettes numériques Revit LOD 300/350 pour le tertiaire
                    et le résidentiel. Détection des conflits de réseaux (MEP/Structure), plans
                    d&apos;exécution d&apos;ouvrages (PRO/EXE) et dossiers de permis de construire.
                  </p>
                </div>

                {/* 2018 - 2020 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker} />
                  <div className={styles.timelineDate}>2018 — 2020 • 2 ANS</div>
                  <h4 className={styles.timelineRole}>Architecte Assistant &amp; Concepteur 3D</h4>
                  <div className={styles.timelineCompany}>Agences d&apos;Études Architecturales • Afrique Centrale</div>
                  <p className={styles.timelineDescription}>
                    Études d&apos;avant-projet sommaire (APS) et détaillé (APD), modélisation des
                    enveloppes bioclimatiques, perspectives photoréalistes et calepinage des matériaux
                    nobles.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==============================================================
            ONGLET 4 : COMPÉTENCES & OUTILS
            ============================================================== */}
        {activeTab === "competences" && (
          <section id="competences" className={styles.tabSectionWrapper}>
            <div className={styles.tabCard}>
              <div className={styles.tabHeaderBlock}>
                <h3 className={styles.tabMainTitle}>Compétences Techniques &amp; Logiciels</h3>
                <p className={styles.tabLeadText}>
                  Méthodologies professionnelles et maîtrise des outils de la maquette numérique et de
                  la programmation spatiale.
                </p>
              </div>

              <div className={styles.skillsClusterGrid}>
                {/* Cluster 1 : BIM */}
                <div className={styles.skillCluster}>
                  <h4 className={styles.clusterTitle}>
                    <Box size={18} color="#0284C7" />
                    <span>Modélisation BIM &amp; CAD</span>
                  </h4>
                  <div className={styles.skillPillsList}>
                    <span className={styles.skillPillItem}>Autodesk Revit (LOD 100-400)</span>
                    <span className={styles.skillPillItem}>SketchUp Pro &amp; Ruby API</span>
                    <span className={styles.skillPillItem}>AutoCAD Architecture</span>
                    <span className={styles.skillPillItem}>Synthèse BIM IFC &amp; BCF</span>
                    <span className={styles.skillPillItem}>Nomenclatures automatiques</span>
                  </div>
                </div>

                {/* Cluster 2 : Visualisation */}
                <div className={styles.skillCluster}>
                  <h4 className={styles.clusterTitle}>
                    <Sparkles size={18} color="#0284C7" />
                    <span>Rendu &amp; Visualisation 3D</span>
                  </h4>
                  <div className={styles.skillPillsList}>
                    <span className={styles.skillPillItem}>Lumion 12 / 2024</span>
                    <span className={styles.skillPillItem}>Twinmotion</span>
                    <span className={styles.skillPillItem}>Enscape Real-Time</span>
                    <span className={styles.skillPillItem}>Post-production Photoshop</span>
                  </div>
                </div>

                {/* Cluster 3 : Bioclimatique */}
                <div className={styles.skillCluster}>
                  <h4 className={styles.clusterTitle}>
                    <CheckCircle2 size={18} color="#0284C7" />
                    <span>Conception Bioclimatique Tropicale</span>
                  </h4>
                  <div className={styles.skillPillsList}>
                    <span className={styles.skillPillItem}>Ventilation naturelle passive</span>
                    <span className={styles.skillPillItem}>Brise-soleil &amp; casquettes calculées</span>
                    <span className={styles.skillPillItem}>Inertie thermique &amp; terre cuite</span>
                    <span className={styles.skillPillItem}>Patios frais &amp; toitures ventilées</span>
                  </div>
                </div>

                {/* Cluster 4 : Développement */}
                <div className={styles.skillCluster}>
                  <h4 className={styles.clusterTitle}>
                    <Wrench size={18} color="#0284C7" />
                    <span>Développement d&apos;Outils Spatiaux</span>
                  </h4>
                  <div className={styles.skillPillsList}>
                    <span className={styles.skillPillItem}>C# .NET 10 (Revit Addin)</span>
                    <span className={styles.skillPillItem}>Ruby (Extensions SketchUp)</span>
                    <span className={styles.skillPillItem}>TypeScript &amp; Next.js 15</span>
                    <span className={styles.skillPillItem}>IPC &amp; Automatisation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==============================================================
            ONGLET 5 : CONTACT DIRECT
            ============================================================== */}
        {activeTab === "contact" && (
          <section id="contact" className={styles.tabSectionWrapper}>
            <div className={styles.tabCard}>
              <div className={styles.tabHeaderBlock}>
                <h3 className={styles.tabMainTitle}>Prendre Contact</h3>
                <p className={styles.tabLeadText}>
                  Pour une mission d&apos;architecture, une prestation de modélisation BIM ou une
                  collaboration technique.
                </p>
              </div>

              <div className={styles.contactChannelsGrid}>
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactChannelCard}
                >
                  <MessageSquare size={28} className={styles.contactChannelIcon} />
                  <span className={styles.contactChannelTitle}>WhatsApp Direct</span>
                  <span className={styles.contactChannelValue}>+237 690 087 213</span>
                </a>

                {/* Téléphone */}
                <a href="tel:+237690715403" className={styles.contactChannelCard}>
                  <Phone size={28} className={styles.contactChannelIcon} />
                  <span className={styles.contactChannelTitle}>Appel Téléphonique</span>
                  <span className={styles.contactChannelValue}>+237 690 715 403</span>
                </a>

                {/* Courriel */}
                <a href="mailto:paul@ateliersdepaul.com" className={styles.contactChannelCard}>
                  <Mail size={28} className={styles.contactChannelIcon} />
                  <span className={styles.contactChannelTitle}>Courriel Professionnel</span>
                  <span className={styles.contactChannelValue}>paul@ateliersdepaul.com</span>
                </a>

                {/* vCard */}
                <a href={vcardUrl} download="Paul_Boubert.vcf" className={styles.contactChannelCard}>
                  <Download size={28} className={styles.contactChannelIcon} />
                  <span className={styles.contactChannelTitle}>Fiche vCard</span>
                  <span className={styles.contactChannelValue}>Enregistrer le contact</span>
                </a>
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  fontSize: "0.88rem",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <MapPin size={20} color="#0284C7" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#0F172A", display: "block" }}>Localisation &amp; Mobilité</strong>
                  Douala (Bonanjo / Kotto) et Yaoundé, Cameroun. Interventions possibles sur toute la zone
                  Afrique centrale et coordination BIM à distance.
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
