import React from "react";
import { Metadata } from "next";
import { getPublishedArticles } from "@/data/articles";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import ActualitesClientView from "./ActualitesClientView";

export const metadata: Metadata = {
  title: "Actualités & Recherches de l'Atelier | Les Ateliers de Paul",
  description:
    "Carnet de bord, essais sur les matériaux tropicaux, modélisation BIM avancée, design textile Rosbri et transmissions pédagogiques des Ateliers de Paul.",
  openGraph: {
    title: "Actualités & Recherches | Les Ateliers de Paul",
    description:
      "Essais techniques, publications d'atelier et manifestes de création.",
    type: "website",
  },
};

export default function ActualitesPage() {
  const articles = getPublishedArticles();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg, #F9F8F5)" }}>
      <SiteHeader />

      {/* Hero header */}
      <section
        style={{
          padding: "4rem 1.5rem 3rem",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          borderBottom: "1px solid rgba(194, 155, 56, 0.2)",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#9E7D2B",
              fontWeight: 700,
            }}
          >
            Édition &amp; Carnet d&apos;Atelier
          </span>
          <span style={{ width: "32px", height: "1px", backgroundColor: "#9E7D2B" }}></span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            fontWeight: 400,
            color: "var(--color-text, #1A1917)",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
            maxWidth: "900px",
          }}
        >
          Recherches, Manifestes &amp; Matière en mouvement
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text-muted, #5A564E)",
            maxWidth: "750px",
            lineHeight: 1.6,
          }}
        >
          Découvrez les protocoles d&apos;essais sur les matériaux équatoriaux, les retours d&apos;expérience BIM, les créations textiles Rosbri et la vie de notre atelier polytechnique.
        </p>
      </section>

      {/* Client view with filters, search, and articles list */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem", width: "100%", flex: 1 }}>
        <ActualitesClientView initialArticles={articles} />
      </main>

      <SiteFooter />
    </div>
  );
}
