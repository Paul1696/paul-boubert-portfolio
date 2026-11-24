import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  Download,
  Share2,
  ExternalLink,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ADP Digital Cards — Cartes de Visite Connectées | ADP Studio",
  description:
    "Solution de cartes de visite professionnelles connectées par Les Ateliers de Paul. QR code permanent, vCard instantanée 1-clic et mise à jour dynamique garantie.",
  openGraph: {
    title: "ADP Digital Cards | Les Ateliers de Paul • ADP Studio",
    description:
      "Cartes de visite connectées avec QR code permanent et profil vCard certifié.",
    locale: "fr_CM",
  },
};

export default function DigitalCardsIndexPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg, #F9F8F5)" }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: "clamp(3rem, 6vw, 6rem) 1.5rem" }} id="main-content">
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {/* Fil d'Ariane */}
          <nav
            aria-label="Fil d'Ariane"
            style={{ marginBottom: "2rem", fontSize: "0.85rem", color: "var(--text-muted, #64748B)" }}
          >
            <Link href="/" style={{ color: "var(--text-secondary, #475569)", textDecoration: "none" }}>
              Accueil
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <Link href="/adp-studio" style={{ color: "var(--text-secondary, #475569)", textDecoration: "none" }}>
              ADP Studio
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "#F3A66D", fontWeight: 700 }}>ADP Digital Cards</span>
          </nav>

          {/* En-tête Hero */}
          <header style={{ marginBottom: "4rem", textAlign: "left" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "6px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(243, 166, 109, 0.15)",
                color: "#C26D2B",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1.25rem",
              }}
            >
              <span>ADP Studio</span>
              <span>•</span>
              <span>Solution d&apos;Identité Connectée</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif, 'Century', Georgia, serif)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "var(--color-text, #08243F)",
                lineHeight: 1.12,
                margin: "0 0 1.25rem",
                maxWidth: "850px",
              }}
            >
              ADP Digital Cards.
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: "var(--color-text-muted, #526571)",
                lineHeight: 1.6,
                maxWidth: "760px",
                margin: 0,
              }}
            >
              Vos coordonnées d&apos;affaires toujours à jour, encodées sur carte physique de prestige et profil web pérenne. QR code définitif certifié et intégration carnet d&apos;adresses en un clic.
            </p>
          </header>

          {/* Profil certifié actif : ETS TIFO */}
          <section
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(8, 36, 63, 0.12)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              padding: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "4rem",
              position: "relative",
              overflow: "hidden",
            }}
            aria-label="Profil actif certifié"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: "100%",
                backgroundColor: "#1D4F91",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
              <div style={{ maxWidth: "600px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <ShieldCheck size={18} color="#1D4F91" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1D4F91" }}>
                    Profil Public Actif &amp; Déployé
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif, 'Century', Georgia, serif)",
                    fontSize: "1.85rem",
                    fontWeight: 700,
                    color: "#08243F",
                    margin: "0 0 0.5rem",
                  }}
                >
                  ETS TIFO — Bâtiment &amp; Travaux Publics
                </h2>

                <p style={{ fontSize: "0.95rem", color: "#64748B", margin: "0 0 1.25rem", lineHeight: 1.55 }}>
                  Direction Générale : <strong>Geordan FOKAM FOTSO</strong>. Carte numérique permanente avec téléchargement direct vCard 3.0, raccourcis d&apos;appel, WhatsApp et itinéraire GPS vers Bonabéri, Douala.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <Link
                    href="/c/tifo-0001"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "#08243F",
                      color: "#FFFFFF",
                      padding: "0.75rem 1.4rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>Consulter le profil ETS TIFO</span>
                    <ExternalLink size={14} />
                  </Link>

                  <a
                    href="/c/tifo-0001/vcf"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "transparent",
                      color: "#1D4F91",
                      border: "1px solid #1D4F91",
                      padding: "0.72rem 1.3rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <Download size={14} />
                    <span>Télécharger la vCard (Direct)</span>
                  </a>
                </div>
              </div>

              {/* Encadré technique URL permanente */}
              <div
                style={{
                  backgroundColor: "rgba(249, 248, 245, 0.8)",
                  border: "1px dashed #CBD5E1",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  minWidth: "260px",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.35rem" }}>
                  URL Imprimée Permanente
                </div>
                <code style={{ fontSize: "0.85rem", color: "#08243F", fontWeight: 700, fontFamily: "monospace" }}>
                  ateliersdepaul.com/c/tifo-0001
                </code>
                <div style={{ fontSize: "0.72rem", color: "#059669", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>✓</span> Réservée définitivement
                </div>
              </div>
            </div>
          </section>

          {/* Les 3 piliers du service ADP Digital Cards */}
          <section style={{ marginBottom: "4rem" }} aria-label="Fonctionnalités du service">
            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#08243F",
                marginBottom: "1.5rem",
              }}
            >
              Pourquoi adopter les cartes numériques ADP Studio ?
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.75rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(8, 36, 63, 0.08)",
                }}
              >
                <div style={{ color: "#F3A66D", marginBottom: "0.85rem" }}>
                  <QrCode size={28} />
                </div>
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 700, color: "#08243F" }}>
                  QR Code Vectoriel Inaltérable
                </h4>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6 }}>
                  Un QR code BAT haute résolution prêt pour l&apos;imprimerie de prestige. Même si vos numéros changent, le QR imprimé reste valide à vie.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.75rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(8, 36, 63, 0.08)",
                }}
              >
                <div style={{ color: "#1D4F91", marginBottom: "0.85rem" }}>
                  <Smartphone size={28} />
                </div>
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 700, color: "#08243F" }}>
                  Ajout Répertoire 1 Clic (vCard 3.0)
                </h4>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6 }}>
                  Aucune application requise pour vos interlocuteurs. Compatible nativement avec iPhone (iOS Contacts) et Android (Google Contacts).
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.75rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(8, 36, 63, 0.08)",
                }}
              >
                <div style={{ color: "#C59B53", marginBottom: "0.85rem" }}>
                  <Sparkles size={28} />
                </div>
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 700, color: "#08243F" }}>
                  Conception &amp; Finitions Minérales
                </h4>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748B", lineHeight: 1.6 }}>
                  Design d&apos;interface exclusif supervisé par ADP Studio. Déclinaison sur papiers de création 400g, gaufrage, dorure ou PVC noir mat.
                </p>
              </div>
            </div>
          </section>

          {/* CTA de commande */}
          <section
            style={{
              backgroundColor: "#08243F",
              borderRadius: "18px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif, 'Century', Georgia, serif)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                margin: "0 0 0.85rem",
                fontWeight: 700,
              }}
            >
              Équiper votre entreprise en cartes connectées
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#94A3B8",
                maxWidth: "600px",
                margin: "0 auto 1.75rem",
                lineHeight: 1.6,
              }}
            >
              Commandez votre lot de cartes physiques avec profil numérique hébergé sur ateliersdepaul.com. Configuration de vos collaborateurs en quelques jours.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/devis"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#C59B53",
                  color: "#08243F",
                  padding: "0.85rem 1.6rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                <span>Demander un devis Cartes Pro</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/adp-studio"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "0.85rem 1.6rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                <span>Découvrir l&apos;univers ADP Studio</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
