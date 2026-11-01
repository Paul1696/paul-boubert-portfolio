import Link from "next/link";
import { UniverseDetailData } from "@/data/universe-details";
import { UNIVERSES } from "@/data/universes";
import { ALL_PROJECTS } from "@/data/all-projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/styles/possibility-machine.module.css";

interface UniverseDetailViewProps {
  universe: UniverseDetailData;
}

export function UniverseDetailView({ universe }: UniverseDetailViewProps) {
  const whatsappUrl = `https://wa.me/237690087213?text=${encodeURIComponent(
    `Bonjour Les Ateliers de Paul, je souhaite échanger avec vous concernant l'univers ${universe.name}.`
  )}`;

  // Projets associés
  const relatedProjects = ALL_PROJECTS.filter((p) =>
    universe.relatedProjectSlugs.includes(p.slug)
  );

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
            <span style={{ color: "var(--text-secondary)" }}>Les Sept Univers</span>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: universe.accentColor, fontWeight: 700 }}>{universe.name}</span>
          </nav>

          {/* HÉRO DE L'UNIVERS */}
          <header
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: `1px solid ${universe.accentColor}40`,
              boxShadow: "var(--shadow-elevated)",
              padding: "clamp(2rem, 5vw, 4rem)",
              position: "relative",
              overflow: "hidden",
              marginBottom: "3rem",
            }}
          >
            {/* Arrière-plan lueur thématique */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-120px",
                right: "-100px",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${universe.accentColor}25 0%, transparent 70%)`,
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "4px 14px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: `${universe.accentColor}18`,
                    color: universe.accentColor,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1rem",
                  }}
                >
                  <span>UNIVERS {universe.number}</span>
                  <span>•</span>
                  <span>{universe.subtitle}</span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {universe.name}
                </h1>
              </div>

              {/* Grand symbole géométrique */}
              <div
                style={{
                  fontSize: "3.5rem",
                  color: universe.accentColor,
                  lineHeight: 1,
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: `${universe.accentColor}10`,
                  border: `1px solid ${universe.accentColor}30`,
                }}
                aria-hidden="true"
              >
                {universe.symbol}
              </div>
            </div>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 600,
                color: universe.accentColor,
                margin: "1.25rem 0 1.5rem 0",
                maxWidth: "750px",
                lineHeight: 1.4,
              }}
            >
              « {universe.tagline} »
            </p>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "820px",
                margin: "0 0 1.75rem 0",
              }}
            >
              {universe.description}
            </p>

            {/* Matières signatures */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1.25rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-default)",
                fontSize: "0.92rem",
                color: "var(--text-primary)",
              }}
            >
              <strong style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.05em" }}>
                Matières &amp; Signatures :
              </strong>
              <span>{universe.materials}</span>
            </div>

            {/* Actions principales */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                <span>Échanger sur un projet avec {universe.name}</span>
                <span aria-hidden="true">↗</span>
              </a>

              <Link href="/portfolio" className={styles.btnSecondary}>
                <span>Consulter les réalisations</span>
              </Link>
            </div>
          </header>

          {/* NOTE DEONTOLOGIQUE SI PRESENTE */}
          {universe.deontologicalNote && (
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--status-info-bg)",
                border: "1px solid var(--status-info)",
                borderRadius: "var(--radius-md)",
                marginBottom: "3rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">🏛️</span>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  Respect du Cadre Réglementaire ONAC
                </div>
                <div style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  {universe.deontologicalNote}{" "}
                  <Link href="/cadre-deontologique" style={{ color: "var(--accent-brass)", textDecoration: "underline", fontWeight: 600 }}>
                    Consulter notre cadre déontologique complet
                  </Link>.
                </div>
              </div>
            </div>
          )}

          {/* SECTION PHILOSOPHIE & PILIERS */}
          <section style={{ marginBottom: "4rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "2rem" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: universe.accentColor,
                }}
              >
                Approche Méthodologique
              </span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginTop: "0.35rem", color: "var(--text-primary)" }}>
                La Philosophie de l&apos;Univers {universe.name}
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, marginTop: "0.75rem" }}>
                {universe.philosophy}
              </p>
            </div>

            {/* Grille des 3 piliers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {universe.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-default)",
                    padding: "1.75rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: universe.accentColor,
                      marginBottom: "0.75rem",
                    }}
                  >
                    PILIER 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION SERVICES & PRESTATIONS */}
          <section style={{ marginBottom: "4rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "2rem" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: universe.accentColor,
                }}
              >
                Champs d&apos;Intervention
              </span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginTop: "0.35rem", color: "var(--text-primary)" }}>
                Services &amp; Prestations d&apos;Atelier
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {universe.services.map((service, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-default)",
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }} aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0, flex: 1 }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION LIVRABLES */}
          <section
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              padding: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "4rem",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: universe.accentColor,
                }}
              >
                Garantie de Clarté
              </span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginTop: "0.35rem", color: "var(--text-primary)" }}>
                Livrables Concrets Remis au Client
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {universe.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: `${universe.accentColor}18`,
                      color: universe.accentColor,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {del.format}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.35rem 0" }}>
                    {del.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.55 }}>
                    {del.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION PROJETS ASSOCIÉS SI EXISTANTS */}
          {relatedProjects.length > 0 && (
            <section style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: universe.accentColor,
                    }}
                  >
                    Archives &amp; Références
                  </span>
                  <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginTop: "0.35rem", color: "var(--text-primary)" }}>
                    Réalisations Associées à cet Univers
                  </h2>
                </div>
                <Link href="/portfolio" style={{ color: universe.accentColor, fontWeight: 700, textDecoration: "none" }}>
                  Voir les 37 projets du Portfolio →
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
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
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          backgroundColor: `${p.accentColor}18`,
                          color: p.accentColor,
                        }}
                      >
                        {p.category}
                      </span>
                      <span style={{ fontSize: "1.2rem", color: p.accentColor }} aria-hidden="true">
                        {p.symbol}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.35rem 0" }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                      {p.location} • {p.year}
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1rem 0", flex: 1 }}>
                      {p.excerpt}
                    </p>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: p.accentColor }}>
                      Découvrir la fiche technique →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* DÉCOUVRIR LES AUTRES UNIVERS */}
          <section
            style={{
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--border-subtle)",
              marginBottom: "3rem",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Explorer les autres univers de The Possibility Machine :
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {UNIVERSES.filter((u) => u.slug !== universe.slug).map((u) => (
                <Link
                  key={u.id}
                  href={u.targetRoute}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-default)",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: u.accentColor }} aria-hidden="true">{u.symbol}</span>
                  <span style={{ fontWeight: 600 }}>{u.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
