import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_PROJECTS,
  getProjectStatus,
  getProjectIntervention,
  getProjectPaulRole,
  getProjectResponsibleEntity,
  getProjectTools,
} from "@/data/all-projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { PROJECTS_MEDIA } from "@/data/media-manifest";
import styles from "@/styles/possibility-machine.module.css";
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin, Calendar, Layers, Wrench, CheckCircle } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projet non trouvé | Les Ateliers de Paul",
    };
  }

  return {
    title: `${project.title} — ${project.subtitle} | Portfolio Paul Boubert`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} | Paul Boubert • Les Ateliers de Paul`,
      description: project.excerpt,
      locale: "fr_CM",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = ALL_PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = ALL_PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? ALL_PROJECTS[projectIndex - 1] : ALL_PROJECTS[ALL_PROJECTS.length - 1];
  const nextProject = projectIndex < ALL_PROJECTS.length - 1 ? ALL_PROJECTS[projectIndex + 1] : ALL_PROJECTS[0];

  const mediaInfo = PROJECTS_MEDIA[project.mediaFolder] || null;
  const coverImage = mediaInfo ? mediaInfo.cover : null;
  const galleryImages = mediaInfo ? mediaInfo.gallery : [];

  const paulRole = getProjectPaulRole(project);
  const status = getProjectStatus(project);
  const responsibleEntity = getProjectResponsibleEntity(project);
  const interventionType = getProjectIntervention(project);
  const toolsUsed = getProjectTools(project);

  const whatsappMessage = encodeURIComponent(
    `Bonjour Paul Boubert, je consulte la fiche de votre référence architecturale « ${project.title} » et souhaite échanger avec vous.`
  );

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: project.title,
    headline: project.subtitle,
    description: project.excerpt,
    creator: {
      "@type": "Person",
      name: "Paul Boubert",
      jobTitle: "Architecte de formation / Projeteur BIM",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year,
    genre: project.typology,
    image: coverImage ? `https://ateliersdepaul.com${coverImage.url}` : undefined,
  };

  const relatedProjects = ALL_PROJECTS.filter(
    (p) => p.typology === project.typology && p.slug !== project.slug
  ).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />

      <main style={{ flex: 1, padding: "clamp(2rem, 4vw, 4rem) 0" }} id="main-content">
        <div className="container">
          {/* Navigation Précédent / Suivant et Fil d'Ariane */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <nav aria-label="Fil d'Ariane" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <Link href="/paul" style={{ color: "#0284C7", textDecoration: "none", fontWeight: 600 }}>
                ← Portfolio Paul Boubert
              </Link>
              <span style={{ margin: "0 0.5rem" }}>/</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{project.title}</span>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link
                href={`/portfolio/${prevProject.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid var(--border-default)",
                }}
                title={prevProject.title}
              >
                <ArrowLeft size={14} />
                <span>Précédent</span>
              </Link>

              <Link
                href={`/portfolio/${nextProject.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid var(--border-default)",
                }}
                title={nextProject.title}
              >
                <span>Suivant</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* FICHE PROJET MAJEURE (SECTION 06) */}
          <article
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: `1px solid ${project.accentColor}35`,
              boxShadow: "var(--shadow-elevated)",
              padding: "clamp(2rem, 5vw, 4rem)",
              marginBottom: "3rem",
            }}
          >
            {/* A. PRÉSENTATION & EN-TÊTE D'ATTRIBUTION */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      backgroundColor: `${project.accentColor}18`,
                      color: project.accentColor,
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {interventionType}
                  </span>

                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    Statut : {status}
                  </span>
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
                  {project.title}
                </h1>

                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: project.accentColor,
                    marginTop: "0.4rem",
                  }}
                >
                  {project.subtitle}
                </div>
              </div>

              {/* Rôle exact et déontologie mis en exergue */}
              <div
                style={{
                  maxWidth: "360px",
                  padding: "1.25rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-default)",
                  borderLeft: "4px solid #0284C7",
                }}
              >
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "#0284C7", fontWeight: 800, letterSpacing: "0.08em" }}>
                  Attribution &amp; Rôle de Paul Boubert
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.35rem" }}>
                  {paulRole}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                  Structure responsable : {responsibleEntity}
                </div>
              </div>
            </div>

            {/* FICHE DES MÉTRÉS & SPÉCIFICATIONS TECHNIQUES */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.25rem",
                padding: "1.5rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                marginBottom: "2.5rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Localisation
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <MapPin size={15} color="#0284C7" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Année d&apos;Étude / Chantier
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Calendar size={15} color="#0284C7" />
                  <span>{project.year}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Surface / Échelle
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Layers size={15} color="#0284C7" />
                  <span>{project.surface || project.specs}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Niveau BIM &amp; Modélisation
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Wrench size={15} color="#0284C7" />
                  <span>{project.bimLOD || "LOD 300"}</span>
                </div>
              </div>
            </div>

            {/* D. GALERIE D'IMAGES HD & PLANS DU PROJET */}
            <div style={{ marginBottom: "3rem" }}>
              <ProjectGallery
                title={project.title}
                accentColor={project.accentColor}
                cover={coverImage}
                gallery={galleryImages}
              />
            </div>

            {/* B. CONTEXTE GÉNÉRAL & OBJECTIFS DU PROGRAMME */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.85rem" }}>
                B. Contexte Architectural &amp; Enjeux du Programme
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                {project.excerpt} Ce programme intègre une réponse sur-mesure aux exigences climatiques
                équatoriales (gestion de l&apos;ensoleillement direct, hygrométrie élevée, aération
                naturelle) tout en valorisant la noblesse des matériaux locaux et l&apos;épure des lignes.
              </p>
            </section>

            {/* C. CONTRIBUTION PERSONNELLE DE PAUL BOUBERT */}
            <section
              style={{
                marginBottom: "2.5rem",
                padding: "1.75rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                C. Contribution Personnelle de Paul Boubert &amp; Missions Réalisées
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <CheckCircle size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Modélisation &amp; Synthèse BIM
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      Élaboration de la maquette numérique paramétrique (Revit / SketchUp), détection des clashs et coupes de principe.
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <CheckCircle size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Plans d&apos;Exécution &amp; Détails
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      Calepinage des menuiseries, détails d&apos;assemblage acier-bois et pièces graphiques pour le chantier.
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <CheckCircle size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Coordination &amp; Suivi de Chantier
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      Assistance au visa des plans d&apos;entreprises et vérification de la conformité architecturale des ouvrages.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* STRATÉGIE BIOCLIMATIQUE */}
            {project.bioclimaticHighlights && project.bioclimaticHighlights.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Stratégie Bioclimatique &amp; Efficacité Énergétique
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {project.bioclimaticHighlights.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        backgroundColor: "var(--bg-secondary)",
                        borderRadius: "var(--radius-sm)",
                        borderLeft: `4px solid ${project.accentColor}`,
                      }}
                    >
                      <span style={{ color: project.accentColor, fontSize: "1.1rem" }} aria-hidden="true">
                        🌱
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* E. OUTILS UTILISÉS & CADRE DÉONTOLOGIQUE ONAC */}
            <section
              style={{
                padding: "1.5rem",
                backgroundColor: "rgba(2, 132, 199, 0.05)",
                border: "1px solid rgba(2, 132, 199, 0.2)",
                borderRadius: "var(--radius-md)",
                marginBottom: "2.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <ShieldCheck size={20} color="#0284C7" />
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  E. Environnement Technique &amp; Cadre Déontologique ONAC
                </h3>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1rem" }}>
                {toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                <strong>Respect de la loi n° 90/039 :</strong> Les missions d&apos;architecture
                réglementées (permis de construire et signature légale) relèvent de la maîtrise d&apos;œuvre
                de confrères architectes inscrits au Tableau de l&apos;Ordre National des Architectes du
                Cameroun. Paul Boubert intervient au titre de concepteur principal, projeteur BIM et
                assistant de maîtrise d&apos;œuvre qualifié.
              </p>
            </section>

            {/* BOUTONS D'ACTION */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <a
                href={`https://wa.me/237690087213?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <span>Échanger sur ce projet avec Paul Boubert</span>
                <span aria-hidden="true">💬</span>
              </a>

              <Link href="/paul" className={styles.btnSecondary}>
                <span>← Retour au Portfolio de Paul</span>
              </Link>
            </div>
          </article>

          {/* NAVIGATION SUIVANT / PRÉCÉDENT EN BAS DE PAGE */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <Link
              href={`/portfolio/${prevProject.slug}`}
              style={{
                textDecoration: "none",
                padding: "1.25rem",
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>
                ← Projet précédent
              </span>
              <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {prevProject.title}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{prevProject.location}</span>
            </Link>

            <Link
              href={`/portfolio/${nextProject.slug}`}
              style={{
                textDecoration: "none",
                padding: "1.25rem",
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                textAlign: "right",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>
                Projet suivant →
              </span>
              <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {nextProject.title}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{nextProject.location}</span>
            </Link>
          </div>

          {/* PROJETS SIMILAIRES */}
          {relatedProjects.length > 0 && (
            <section>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
                Autres Références en Typologie {project.typology}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/portfolio/${p.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        padding: "1.5rem",
                        backgroundColor: "var(--bg-surface)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-default)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "0.75rem", color: p.accentColor, fontWeight: 700, textTransform: "uppercase" }}>
                          {p.category}
                        </div>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0", color: "var(--text-primary)" }}>
                          {p.title}
                        </h4>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {p.excerpt.slice(0, 110)}...
                        </p>
                      </div>
                      <div style={{ marginTop: "1rem", fontSize: "0.82rem", fontWeight: 700, color: "#0284C7" }}>
                        Consulter la fiche technique →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
