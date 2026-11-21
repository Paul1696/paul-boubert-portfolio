import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function CardNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAF8",
        padding: "2rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          border: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#FEF2F2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <AlertCircle size={28} color="#DC2626" />
        </div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.5rem" }}>
          Carte numérique indisponible
        </h1>
        <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
          Cette carte de visite numérique est temporairement suspendue ou son identifiant n&apos;a pas encore été attribué.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            backgroundColor: "#0D5C3A",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={15} />
          <span>Retour à l&apos;accueil ADP</span>
        </Link>
      </div>
    </div>
  );
}
