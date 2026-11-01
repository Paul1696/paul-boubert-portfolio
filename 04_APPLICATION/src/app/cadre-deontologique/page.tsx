import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UNIVERSES } from "@/data/universes";
import styles from "@/styles/possibility-machine.module.css";

export const metadata: Metadata = {
  title: "Cadre Déontologique & Exercice Réglementé | Les Ateliers de Paul",
  description:
    "Engagement déontologique, respect strict de la loi n° 90/039 régissant la profession d'architecte au Cameroun et cadre de partenariat avec l'ONAC.",
  openGraph: {
    title: "Cadre Déontologique | Les Ateliers de Paul",
    description: "Positionnement d'ADP et respect strict du cadre réglementaire de l'Ordre National des Architectes du Cameroun (ONAC).",
    locale: "fr_CM",
  },
};

export default function CadreDeontologiquePage() {
  const whatsappUrl = "https://wa.me/237690087213?text=" + encodeURIComponent("Bonjour Les Ateliers de Paul, je souhaite échanger au sujet d'un partenariat ou d'une mission conjointe.");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: "clamp(3rem, 6vw, 5rem) 0" }} id="main-content">
        <div className="container">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: "2rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Accueil</Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--accent-brass)", fontWeight: 600 }}>Cadre Déontologique</span>
          </nav>

          <article
            style={{
              maxWidth: "920px",
              margin: "0 auto",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-elevated)",
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Header de l'article */}
            <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "2rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "4px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(197, 155, 83, 0.12)",
                  color: "var(--accent-brass)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                <span>⚖</span>
                <span>Réglementation &amp; Éthique Professionnelle</span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, color: "var(--text-primary)" }}>
                Cadre Déontologique &amp; Exercice Confraternel
              </h1>

              <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginTop: "1rem", lineHeight: 1.6 }}>
                Transparence absolue, respect strict de la loi camerounaise régissant la profession d&apos;architecte, et principes de collaboration confraternelle.
              </p>

              <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Dernière mise à jour : <strong>Janvier 2026</strong> • Référence légale : <strong>Loi n° 90/039 du 10 août 1990</strong>
              </div>
            </header>

            {/* Avertissement solennel */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--status-info-bg)",
                border: "1px solid var(--status-info)",
                borderRadius: "var(--radius-md)",
                marginBottom: "2.5rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }} aria-hidden="true">🏛️</span>
              <div style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)" }}>
                <strong>Déclaration fondamentale :</strong> Les Ateliers de Paul (ADP) est une structure pluridisciplinaire d&apos;ingénierie créative, de modélisation BIM, de design et de formation. 
                <strong> ADP n&apos;est pas un cabinet d&apos;architecture et ne délivre aucun titre réservé.</strong> Pour toute mission réglementée (permis de construire, signature légale, direction de chantier réglementée), nous collaborons obligatoirement avec des confrères architectes inscrits au Tableau de l&apos;Ordre National des Architectes du Cameroun (ONAC).
              </div>
            </div>

            {/* Corps du texte en sections claires */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                1. Positionnement institutionnel d&apos;Ateliers de Paul
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Fondé par Paul Boubert, <strong>Les Ateliers de Paul (ADP)</strong> opère comme un écosystème de compétences avancées dédié à la conception visuelle, à l&apos;assistance technique à maîtrise d&apos;ouvrage (AMO), à la coordination spatiale numérique (BIM LOD 200 à 400), au design textile de prestige (Rosbri) et à la formation continue des professionnels du cadre bâti.
              </p>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Notre mission est d&apos;apporter de la rigueur méthodologique, de la clarté technique et de l&apos;innovation durable aux acteurs du bâtiment, tout en nous interdisant formellement d&apos;usurper le titre d&apos;architecte ou d&apos;exercer des prérogatives exclusivement dévolues aux membres de l&apos;ONAC.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                2. Délimitation des missions réglementées (Loi n° 90/039)
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                En application de la loi camerounaise régissant l&apos;exercice et la profession d&apos;architecte, constituent des <strong>missions réglementées exclusives</strong> :
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
                <li>L&apos;établissement et la signature des plans architecturaux requis pour le dépôt du <strong>Permis de Construire</strong> ;</li>
                <li>La <strong>Direction de l&apos;Exécution des Travaux (DET)</strong> investie de la responsabilité légale de maîtrise d&apos;œuvre d&apos;architecture ;</li>
                <li>La signature des procès-verbaux de <strong>Réception des Ouvrages</strong> à titre d&apos;architecte de l&apos;opération.</li>
              </ul>
              <div
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderLeft: "4px solid var(--accent-brass)",
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  fontSize: "0.92rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                ✦ <strong>Protocole d&apos;intervention ADP :</strong> Dès lors qu&apos;un client sollicite une mission incluant ces prestations, ADP organise ou requiert l&apos;intervention directe d&apos;un Architecte inscrit à l&apos;ONAC, signataire et responsable de plein droit de la mission réglementée.
              </div>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                3. Missions directes d&apos;assistance &amp; services non réglementés
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Les prestations suivantes sont exécutées directement par l&apos;équipe ADP en qualité d&apos;experts techniques et créatifs :
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-brass)", marginBottom: "0.5rem" }}>BIM &amp; Maquette Numérique</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Modélisation 3D sous Autodesk Revit (LOD 100 à 350), détection de conflits, génération de nomenclatures quantitatives et jumeaux numériques.</p>
                </div>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-brass)", marginBottom: "0.5rem" }}>Assistance Maîtrise d&apos;Ouvrage (AMO)</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Cadrage d&apos;intention, études de faisabilité spatiale, rédaction de briefs programmatiques et aide au choix des partenaires constructifs.</p>
                </div>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-brass)", marginBottom: "0.5rem" }}>Dossiers Techniques &amp; Pièces Écrites</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Rédaction de CCTP, DPGF et dossiers de consultation des entreprises (DCE) adaptés aux réalités du marché camerounais.</p>
                </div>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-brass)", marginBottom: "0.5rem" }}>Imagerie 3D &amp; Design Visuel</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Rendus photoréalistes d&apos;atmosphère, visites virtuelles, chartes d&apos;identité immobilière et valorisation de programmes.</p>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                4. Partenariat confraternel avec les Architectes ONAC
              </h2>
              <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Nous considérons les architectes inscrits à l&apos;ONAC non comme des concurrents, mais comme des <strong>partenaires d&apos;excellence</strong>. ADP met à la disposition des cabinets d&apos;architecture sa puissance de production numérique, sa maîtrise du BIM et ses outils d&apos;automatisation pour démultiplier leur productivité et sécuriser leurs livrables d&apos;exécution.
              </p>
            </section>

            {/* Footer de l'article avec CTA */}
            <div
              style={{
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>Une question déontologique ou un projet à cadrer ?</div>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Paul Boubert et l&apos;équipe ADP sont à votre écoute directe.</div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                  <span>Échanger sur WhatsApp</span>
                  <span aria-hidden="true">💬</span>
                </a>
                <Link href="/mentions-legales" className={styles.btnSecondary}>
                  <span>Mentions Légales</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
