import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UNIVERSES } from "@/data/universes";
import styles from "@/styles/possibility-machine.module.css";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Les Ateliers de Paul",
  description:
    "Protection de vos données personnelles, engagement de non-divulgation des projets architecturaux et respect de votre vie privée.",
  openGraph: {
    title: "Politique de Confidentialité | Les Ateliers de Paul",
    description: "Protection des données et confidentialité stricte des projets d'atelier.",
    locale: "fr_CM",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: "clamp(3rem, 6vw, 5rem) 0" }} id="main-content">
        <div className="container">
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: "2rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Accueil</Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--accent-brass)", fontWeight: 600 }}>Politique de Confidentialité</span>
          </nav>

          <article
            style={{
              maxWidth: "880px",
              margin: "0 auto",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-elevated)",
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-xs)",
                  backgroundColor: "rgba(197, 155, 83, 0.12)",
                  color: "var(--accent-brass)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.75rem",
                }}
              >
                Vie Privée &amp; Données
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)" }}>
                Politique de Confidentialité &amp; NDA
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                En vigueur au 1er janvier 2026 • Ateliers de Paul, Douala / Yaoundé
              </p>
            </header>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                1. Responsable du Traitement
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Les données transmises lors de vos échanges sont traitées sous la responsabilité directe de <strong>Paul Boubert</strong>, Fondateur de Les Ateliers de Paul. Courriel de contact dédié à la protection des données : <strong>paul@ateliersdepaul.com</strong>.
              </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                2. Nature des Données Collectées
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                Nous collectons exclusivement les données strictement nécessaires à l&apos;étude de vos besoins professionnels et à la réalisation de vos missions :
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <li>Données d&apos;identité et de contact (Nom, Prénom, Téléphone, Adresse courriel) ;</li>
                <li>Données programmatiques de projet (Localisation du terrain, typologie souhaitée, budget estimé, calendrier visé) ;</li>
                <li>Fichiers techniques transmis pour étude (plans DWG, relevés géomètres, maquettes IFC).</li>
              </ul>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                3. Engagement Strict de Non-Divulgation (NDA)
              </h2>
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "var(--radius-sm)",
                  borderLeft: "4px solid var(--accent-brass)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                Conscients du caractère stratégique et confidentiel des investissements immobiliers et projets architecturaux, <strong>Les Ateliers de Paul s&apos;engagent formellement à ne jamais divulguer, commercialiser ni partager vos plans, documents fonciers et données financières</strong> à des tiers non habilités. Un accord de confidentialité bilatéral (NDA) est systématiquement proposé avant le démarrage de tout dossier sensible.
              </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                4. Durée de Conservation &amp; Droits d&apos;Accès
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                Les données de prospection et briefs initiaux sont conservés pour une durée maximale de <strong>3 ans</strong> à compter du dernier échange. Les dossiers d&apos;exécution technique sont archivés de manière sécurisée conformément aux obligations légales de traçabilité décennale.
              </p>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Vous disposez d&apos;un droit permanent d&apos;accès, de rectification, de portabilité et d&apos;effacement de vos données personnelles par simple demande écrite adressée à <strong>paul@ateliersdepaul.com</strong>.
              </p>
            </section>

            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/mentions-legales" className={styles.btnSecondary}>
                <span>Mentions Légales</span>
              </Link>
              <Link href="/cadre-deontologique" className={styles.btnSecondary}>
                <span>Cadre Déontologique</span>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
