import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROJECTS } from "@/data/all-projects";
import { UNIVERSES } from "@/data/universes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/styles/possibility-machine.module.css";

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
    title: `${project.title} — ${project.subtitle} | Portfolio ADP`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} | Les Ateliers de Paul`,
      description: project.excerpt,
      locale: "fr_CM",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Bonjour Les Ateliers de Paul, je souhaite des informations concernant votre référence architecturale : ${project.title}.`
  );

  const relatedProjects = ALL_PROJECTS.filter(
    (p) => p.typology === project.typology && p.slug !== project.slug
  ).slice(0, 3);

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
            <Link href="/portfolio" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
              Portfolio
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: project.accentColor, fontWeight: 700 }}>{project.title}</span>
          </nav>

          {/* FICHE PROJET MAJEURE */}
          <article
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: `1px solid ${project.accentColor}40`,
              boxShadow: "var(--shadow-elevated)",
              padding: "clamp(2rem, 5vw, 4rem)",
              marginBottom: "3rem",
            }}
          >
            {/* Header Projet */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "4px 14px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: `${project.accentColor}18`,
                    color: project.accentColor,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1rem",
                  }}
                >
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.typology}</span>
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
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: project.accentColor,
                    marginTop: "0.5rem",
                  }}
                >
                  {project.subtitle}
                </div>
              </div>

              <div
                style={{
                  fontSize: "3rem",
                  color: project.accentColor,
                  lineHeight: 1,
                  padding: "0.75rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: `${project.accentColor}12`,
                  border: `1px solid ${project.accentColor}30`,
                }}
                aria-hidden="true"
              >
                {project.symbol}
              </div>
            </div>

            {/* Fiche des métadonnées techniques */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                padding: "1.5rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                marginBottom: "2.5rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Localisation
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  📍 {project.location}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Année d&apos;Étude / Réalisation
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  📅 {project.year}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Surface / Échelle
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  📐 {project.surface || project.specs}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Niveau BIM
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  💻 {project.bimLOD || "LOD 300"}
                </div>
              </div>
            </div>

            {/* Description générale */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Parti Architectural &amp; Contexte du Programme
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {project.excerpt}
              </p>
            </section>

            {/* Points forts bioclimatiques */}
            {project.bioclimaticHighlights && project.bioclimaticHighlights.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Stratégie Bioclimatique &amp; Énergétique
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {project.bioclimaticHighlights.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "1rem",
                        backgroundColor: "var(--bg-secondary)",
                        borderRadius: "var(--radius-sm)",
                        borderLeft: `4px solid ${project.accentColor}`,
                      }}
                    >
                      <span style={{ color: project.accentColor, fontSize: "1.1rem" }} aria-hidden="true">🌿</span>
                      <span style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.5 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Mission ADP & Cadre Déontologique */}
            <section
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--status-info-bg)",
                border: "1px solid var(--status-info)",
                borderRadius: "var(--radius-md)",
                marginBottom: "2.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                🏛️ Cadre d&apos;Intervention &amp; Partenariat ONAC
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                <strong>Nature de la mission :</strong> {project.missionType || "Assistance technique, modélisation BIM & conception visuelle"}. Conformément à la législation en vigueur, les démarches administratives réglementées et les visas légaux ont été assurés en étroite synergie avec des confrères architectes inscrits au Tableau de l&apos;Ordre National des Architectes du Cameroun.
              </p>
            </section>

            {/* Boutons d'action */}
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

              <Link href="/portfolio" className={styles.btnSecondary}>
                <span>← Retourner au Portfolio</span>
              </Link>
            </div>
          </article>

          {/* PROJETS SIMILAIRES */}
          {relatedProjects.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
                Autres Projets en Typologie {project.typology}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/portfolio/${p.slug}`}
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-default)",
                      padding: "1.5rem",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: p.accentColor }}>{p.category}</span>
                      <span style={{ color: p.accentColor }}>{p.symbol}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.25rem 0" }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{p.location} • {p.year}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
