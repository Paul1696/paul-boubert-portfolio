import type { Metadata } from "next";
import Link from "next/link";
import { UNIVERSES } from "@/data/universes";

export const metadata: Metadata = {
  title: "Paul Boubert | Carte de Visite Numérique Pro",
  description:
    "Carte de visite mobile de Paul Boubert — Fondateur & Concepteur Principal de Les Ateliers de Paul (Douala / Yaoundé, Cameroun). Enregistrez mon contact en un clic.",
  openGraph: {
    title: "Paul Boubert | Les Ateliers de Paul",
    description: "Fondateur & Concepteur Principal. Architecture bioclimatique, ingénierie BIM, design textile et The Possibility Machine.",
    locale: "fr_CM",
  },
};

export default function PaulDigitalCardPage() {
  const vcardUrl = "/contact/Paul_Boubert.vcf";
  const phone = "+237 690 715 403";
  const phoneRaw = "+237690715403";
  const whatsappUrl = "https://wa.me/237690087213?text=" + encodeURIComponent("Bonjour Paul, j'ai scanné votre carte de visite et souhaite échanger avec vous.");
  const email = "paul@ateliersdepaul.com";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D1117",
        color: "#F0F6FC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 4vw, 3rem) 1rem",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#161B22",
          border: "1px solid rgba(197, 155, 83, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(197, 155, 83, 0.15)",
          padding: "clamp(1.75rem, 5vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lueur d'ambiance dorée supérieure */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "240px",
            height: "160px",
            background: "radial-gradient(circle, rgba(197, 155, 83, 0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Monogramme / Avatar haute définition */}
        <div
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C59B53 0%, #8A6731 100%)",
            padding: "3px",
            boxShadow: "0 8px 24px rgba(197, 155, 83, 0.4)",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#0D1117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.85rem",
              fontWeight: 800,
              letterSpacing: "1px",
              color: "#E6C280",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            PB
          </div>
        </div>

        {/* Identité */}
        <span
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C59B53",
            marginBottom: "0.35rem",
          }}
        >
          Les Ateliers de Paul
        </span>

        <h1
          style={{
            fontSize: "1.85rem",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 0.35rem 0",
            color: "#FFFFFF",
          }}
        >
          Paul Boubert
        </h1>

        <div style={{ fontSize: "0.95rem", color: "#8B949E", fontWeight: 500, marginBottom: "0.75rem" }}>
          Fondateur &amp; Concepteur Principal
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "0.82rem",
            color: "#C9D1D9",
            marginBottom: "1.5rem",
          }}
        >
          <span>📍</span>
          <span>Douala &amp; Yaoundé, Cameroun</span>
        </div>

        {/* Bouton Majeur : Télécharger la vCard */}
        <a
          href={vcardUrl}
          download="Paul_Boubert.vcf"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            backgroundColor: "#C59B53",
            color: "#0D1117",
            padding: "0.95rem 1.25rem",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 6px 20px rgba(197, 155, 83, 0.35)",
            transition: "transform 0.15s ease, background-color 0.15s ease",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>📥</span>
          <span>Enregistrer dans mes contacts</span>
        </a>

        {/* Grille d'actions rapides directes */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Appel direct */}
          <a
            href={`tel:${phoneRaw}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              padding: "0.85rem 0.5rem",
              textDecoration: "none",
              color: "#F0F6FC",
              transition: "border-color 0.15s ease, background 0.15s ease",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>📞</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Appeler</span>
            <span style={{ fontSize: "0.72rem", color: "#8B949E" }}>{phone}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              backgroundColor: "rgba(37, 211, 102, 0.08)",
              border: "1px solid rgba(37, 211, 102, 0.25)",
              borderRadius: "14px",
              padding: "0.85rem 0.5rem",
              textDecoration: "none",
              color: "#F0F6FC",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>💬</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#25D366" }}>WhatsApp</span>
            <span style={{ fontSize: "0.72rem", color: "#8B949E" }}>Discuter en direct</span>
          </a>

          {/* Courriel Pro */}
          <a
            href={`mailto:${email}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              padding: "0.85rem 0.5rem",
              textDecoration: "none",
              color: "#F0F6FC",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>✉️</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Courriel</span>
            <span style={{ fontSize: "0.72rem", color: "#8B949E" }}>{email}</span>
          </a>

          {/* Site Officiel */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              backgroundColor: "rgba(125, 185, 220, 0.08)",
              border: "1px solid rgba(125, 185, 220, 0.25)",
              borderRadius: "14px",
              padding: "0.85rem 0.5rem",
              textDecoration: "none",
              color: "#F0F6FC",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>🌐</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#7DB9DC" }}>Site Officiel</span>
            <span style={{ fontSize: "0.72rem", color: "#8B949E" }}>The Possibility Machine</span>
          </Link>
        </div>

        {/* Section Écosystème & 7 Univers */}
        <div style={{ width: "100%", textAlign: "left", marginTop: "0.5rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#8B949E",
              marginBottom: "0.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Explorer les 7 Univers ADP</span>
            <Link href="/portfolio" style={{ color: "#C59B53", textDecoration: "none" }}>
              Portfolio →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {UNIVERSES.slice(0, 4).map((u) => (
              <Link
                key={u.id}
                href={u.targetRoute}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.65rem 0.85rem",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: "#C9D1D9",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <span style={{ color: u.accentColor, fontSize: "1.1rem" }} aria-hidden="true">
                    {u.symbol}
                  </span>
                  <span style={{ fontWeight: 600 }}>{u.name}</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#8B949E" }}>{u.subtitle}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Cadre Déontologique rappel */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            fontSize: "0.78rem",
            color: "#8B949E",
            lineHeight: 1.5,
          }}
        >
          <div>
            Structure pluridisciplinaire en partenariat avec les Architectes de l&apos;ONAC.
          </div>
          <Link href="/cadre-deontologique" style={{ color: "#C59B53", textDecoration: "underline", display: "inline-block", marginTop: "0.25rem" }}>
            Consulter notre cadre déontologique
          </Link>
        </div>
      </main>

      <footer style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#6E7681" }}>
        © {new Date().getFullYear()} Les Ateliers de Paul • Douala, Cameroun
      </footer>
    </div>
  );
}
