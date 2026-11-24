"use client";

import React from "react";
import Link from "next/link";
import { StudioProduct, StudioFamily } from "@/types/studio-catalog";
import { StudioUniversalConfigurator } from "./StudioUniversalConfigurator";
import styles from "@/styles/studio.module.css";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  FileCheck,
  Clock,
} from "lucide-react";

interface StudioProductDetailViewProps {
  product: StudioProduct;
  family?: StudioFamily;
  relatedProducts: StudioProduct[];
}

export function StudioProductDetailView({
  product,
  family,
  relatedProducts,
}: StudioProductDetailViewProps) {
  return (
    <div className={styles.detailContainer}>
      {/* Fil d'Ariane */}
      <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/adp-studio">ADP Studio</Link>
        <span>/</span>
        <Link href={`/adp-studio#${product.familyId}`}>{family?.name || "Catalogue"}</Link>
        <span>/</span>
        <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{product.name}</span>
      </nav>

      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/adp-studio#catalogue-interactif"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#C59B53",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Retour au catalogue complet</span>
        </Link>
      </div>

      {/* Grille principale produit : Visuel/Spécifications à gauche, Configurateur/Action à droite */}
      <div className={styles.detailGrid}>
        {/* COLONNE GAUCHE : Média & Spécifications */}
        <div className={styles.detailMediaCol}>
          <div className={styles.mainMediaBox}>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>{family?.icon || "◈"}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>{product.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#C59B53", marginTop: "0.3rem" }}>
                Ateliers de Paul • Pôle Studio
              </div>
            </div>
            {product.isPopular && (
              <span className={styles.popularBadge} style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                Produit Vedette
              </span>
            )}
          </div>

          {/* Description complète */}
          <div style={{ backgroundColor: "#161D26", border: "1px solid #222C38", borderRadius: "8px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.75rem" }}>
              Présentation &amp; Approche d&apos;Atelier
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#A3B1C2", lineHeight: 1.65, margin: 0 }}>
              {product.fullDescription}
            </p>
          </div>

          {/* Fiche Technique d'Atelier */}
          <div className={styles.specsBox}>
            <h3 className={styles.specsTitle}>Fiche Technique &amp; Caractéristiques</h3>
            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Famille Commerciale</span>
                <span className={styles.specVal}>{family?.name}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Matières &amp; Supports</span>
                <span className={styles.specVal}>{product.materials.join(", ")}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Finitions d&apos;Atelier</span>
                <span className={styles.specVal}>{product.finishes.join(", ")}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Formats / Dimensions</span>
                <span className={styles.specVal}>{product.dimensions.join(" • ")}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Délai Estimatif</span>
                <span className={styles.specVal}>{product.turnaround}</span>
              </div>
            </div>
          </div>

          {/* Spécifications Fichiers PAO & Impression */}
          <div className={styles.specsBox}>
            <h3 className={styles.specsTitle}>Préparation des Fichiers PAO</h3>
            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Formats acceptés</span>
                <span className={styles.specVal}>{product.artworkSpecs.formats.join(", ")}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Profil Colorimétrique</span>
                <span className={styles.specVal}>{product.artworkSpecs.colorProfile}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Résolution minimale</span>
                <span className={styles.specVal}>{product.artworkSpecs.resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Fonds perdus</span>
                <span className={styles.specVal}>{product.artworkSpecs.bleeds}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Marge de sécurité</span>
                <span className={styles.specVal}>{product.artworkSpecs.safetyMargin}</span>
              </div>
            </div>
            {product.artworkSpecs.notes && (
              <p style={{ fontSize: "0.76rem", color: "#C59B53", margin: "1rem 0 0", lineHeight: 1.5 }}>
                💡 <em>{product.artworkSpecs.notes}</em>
              </p>
            )}
          </div>
        </div>

        {/* COLONNE DROITE : Configurateur d'Options & Action Devis */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Configurateur Universel Réactif */}
          <StudioUniversalConfigurator product={product} family={family} />

          {/* PASSERELLE SPÉCIFIQUE ADP DIGITAL CARDS */}
          {product.digitalCardBridge && (
            <div
              style={{
                backgroundColor: "rgba(13, 92, 58, 0.15)",
                border: "1px solid #0D5C3A",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ECA8E", fontWeight: 700, fontSize: "0.85rem" }}>
                <Sparkles size={16} />
                <span>Démonstration en Ligne Active</span>
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF", margin: "0.5rem 0 0.25rem" }}>
                Découvrez la Carte Numérique d&apos;ETS TIFO
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#A3B1C2", lineHeight: 1.5, margin: "0 0 1rem" }}>
                Consultez le rendu réel responsive, le fonctionnement du vCard et l&apos;encodage du QR code permanent pour notre premier client professionnel certifié.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link
                  href="/c/tifo-0001"
                  target="_blank"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#0D5C3A",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <span>Tester la carte ETS TIFO</span>
                  <ExternalLink size={13} />
                </Link>
                <Link
                  href="/c"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#161D26",
                    color: "#C59B53",
                    border: "1px solid #334050",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>Portail Cartes Numériques</span>
                </Link>
              </div>
            </div>
          )}

          {/* Garanties d'atelier */}
          <div style={{ backgroundColor: "#161D26", border: "1px solid #222C38", borderRadius: "8px", padding: "1.25rem" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.5rem" }}>
              Engagements d&apos;Atelier &amp; Déontologie
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.78rem", color: "#8E9AA8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={14} color="#C59B53" />
                <span>BAT numérique haute définition obligatoirement soumis avant tout tirage</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileCheck size={14} color="#C59B53" />
                <span>Respect strict du cadre déontologique et de la propriété intellectuelle</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={14} color="#C59B53" />
                <span>Contrôle qualité individuel des épreuves et livrables d&apos;impression</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUITS SIMILAIRES RECOMMANDÉS */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid #222C38" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "1.5rem" }}>
            Prestations &amp; Produits Complémentaires
          </h3>
          <div className={styles.productsGrid}>
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/adp-studio/produit/${rel.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.productCard} style={{ height: "100%" }}>
                  <div className={styles.productCardHeader} style={{ height: "120px" }}>
                    <div style={{ fontSize: "2.5rem" }}>{family?.icon || "◈"}</div>
                  </div>
                  <div className={styles.productCardBody}>
                    <div className={styles.productCategoryLabel}>{family?.name}</div>
                    <h4 className={styles.productName} style={{ fontSize: "0.95rem" }}>
                      {rel.name}
                    </h4>
                    <p className={styles.productSubtitle} style={{ fontSize: "0.78rem", marginBottom: "0.5rem" }}>
                      {rel.subtitle}
                    </p>
                    <div style={{ marginTop: "auto", color: "#C59B53", fontSize: "0.78rem", fontWeight: 600 }}>
                      Découvrir la fiche →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
