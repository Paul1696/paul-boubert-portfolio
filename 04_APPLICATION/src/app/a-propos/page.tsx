import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UNIVERSES } from "@/data/universes";

export const metadata: Metadata = {
  title: "À propos | Les Ateliers de Paul",
  description: "Découvrez l'écosystème pluridisciplinaire des Ateliers de Paul et ses sept univers.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main-content" className="container" style={{ flex: 1, padding: "clamp(3rem, 7vw, 7rem) 0" }}>
        <p style={{ color: "var(--accent-brass)", fontWeight: 700 }}>L&apos;écosystème ADP</p>
        <h1 style={{ maxWidth: 820, fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, margin: "1rem 0" }}>
          Une idée. Mille possibilités.
        </h1>
        <p style={{ maxWidth: 760, fontSize: "1.15rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          Les Ateliers de Paul sont un écosystème créatif, technique et entrepreneurial. ADP réunit conception,
          design, documentation, recherche, formation, outils numériques et création textile au sein d&apos;une même
          plateforme.
        </p>
        <section aria-labelledby="univers-title" style={{ marginTop: "4rem" }}>
          <h2 id="univers-title">Les sept univers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
            {UNIVERSES.map((universe) => (
              <Link key={universe.slug} href={universe.targetRoute} style={{ padding: "1.25rem", border: "1px solid var(--border-subtle)", borderRadius: "12px", textDecoration: "none" }}>
                <strong style={{ color: universe.accentColor }}>{universe.name}</strong>
                <p style={{ margin: "0.5rem 0 0", color: "var(--text-secondary)", lineHeight: 1.5 }}>{universe.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
