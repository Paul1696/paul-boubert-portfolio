import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UNIVERSES } from "@/data/universes";
import styles from "@/styles/possibility-machine.module.css";

export const metadata: Metadata = {
  title: "Mentions Légales | Les Ateliers de Paul",
  description:
    "Informations légales, éditeur du site, hébergement et propriété intellectuelle de Les Ateliers de Paul — The Possibility Machine.",
  openGraph: {
    title: "Mentions Légales | Les Ateliers de Paul",
    description: "Mentions légales officielles d'Ateliers de Paul (Douala / Yaoundé, Cameroun).",
    locale: "fr_CM",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: "clamp(3rem, 6vw, 5rem) 0" }} id="main-content">
        <div className="container">
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: "2rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Accueil</Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--accent-brass)", fontWeight: 600 }}>Mentions Légales</span>
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
                Informations Réglementaires
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)" }}>
                Mentions Légales
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                En vigueur au 1er janvier 2026 • Plateforme officielle ateliersdepaul.com
              </p>
            </header>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                1. Éditeur de la plateforme
              </h2>
              <div style={{ backgroundColor: "var(--bg-secondary)", padding: "1.25rem", borderRadius: "var(--radius-sm)", lineHeight: 1.8, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <div><strong>Dénomination :</strong> Les Ateliers de Paul (ADP)</div>
                <div><strong>Fondateur &amp; Responsable de la publication :</strong> Paul Boubert</div>
                <div><strong>Implantation :</strong> Douala &amp; Yaoundé, République du Cameroun</div>
                <div><strong>Téléphone direct :</strong> <a href="tel:+237690715403" style={{ color: "var(--accent-brass)" }}>+237 690 715 403</a></div>
                <div><strong>Ligne WhatsApp Pro :</strong> <a href="https://wa.me/237690087213" style={{ color: "var(--accent-brass)" }}>+237 690 087 213</a></div>
                <div><strong>Courriel officiel :</strong> <a href="mailto:paul@ateliersdepaul.com" style={{ color: "var(--accent-brass)" }}>paul@ateliersdepaul.com</a></div>
              </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                2. Hébergement &amp; Sécurité des Infrastructures
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Le présent site web et ses applications associées sont hébergés sur des serveurs haute disponibilité à dimensionnement mondial garantissant chiffrement HTTPS (SSL/TLS 1.3), protection DDoS et sauvegarde continue.
              </p>
              <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Réseaux de diffusion de contenu (CDN) sécurisés avec présence en Afrique centrale et Europe.
              </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                3. Propriété Intellectuelle &amp; Marques
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                L&apos;intégralité des éléments figurant sur le site <em>ateliersdepaul.com</em> — notamment le concept <strong>The Possibility Machine™</strong>, les textes, formulations, identités des 7 Univers, logotypes, pictogrammes, maquettes numériques 3D, plans de principe, photographies et créations textiles de la marque <strong>Rosbri Wax Design</strong> — sont la propriété exclusive de Paul Boubert et d&apos;Ateliers de Paul.
              </p>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Toute reproduction intégrale ou partielle, extraction de bases de données, rétro-ingénierie ou diffusion non expressément autorisée par écrit est constitutive de contrefaçon sanctionnée par la législation camerounaise et les traités de l&apos;Organisation Africaine de la Propriété Intellectuelle (OAPI).
              </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                4. Droit Applicable &amp; Juridiction Compétente
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Les présentes mentions légales sont régies par le droit en vigueur en République du Cameroun. En cas de différend relatif à l&apos;interprétation ou à l&apos;exécution du présent service, les parties s&apos;engagent à rechercher une solution amiable avant toute action judiciaire devant les tribunaux compétents du ressort de Douala.
              </p>
            </section>

            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/cadre-deontologique" className={styles.btnSecondary}>
                <span>Consulter le Cadre Déontologique ONAC</span>
              </Link>
              <Link href="/politique-confidentialite" className={styles.btnSecondary}>
                <span>Politique de Confidentialité</span>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
