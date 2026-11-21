"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MediaItem } from "@/data/media-manifest";

interface ProjectGalleryProps {
  title: string;
  accentColor: string;
  cover: MediaItem | null;
  gallery: MediaItem[];
}

export function ProjectGallery({
  title,
  accentColor,
  cover,
  gallery,
}: ProjectGalleryProps) {
  const allImages = [cover, ...gallery].filter(Boolean) as MediaItem[];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % allImages.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
        );
      }
    },
    [selectedIndex, allImages.length]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleKeyDown]);

  if (allImages.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--border-default)",
          padding: "2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--accent-brass)", marginBottom: "0.5rem" }}>
          📐
        </div>
        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          Documentation Graphique en Numérisation
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          Les rendus HD et plans techniques de {title} sont en cours d&apos;intégration dans la médiathèque.
        </div>
      </div>
    );
  }

  const primaryImage = allImages[0];
  const secondaryImages = allImages.slice(1);

  return (
    <section aria-label={`Galerie visuelle de ${title}`} style={{ marginBottom: "3rem" }}>
      {/* VUE PRINCIPALE HAUTE DÉFINITION */}
      <div
        onClick={() => setSelectedIndex(0)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          maxHeight: "580px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          cursor: "pointer",
          border: `1px solid ${accentColor}35`,
          boxShadow: "var(--shadow-card)",
          marginBottom: "1rem",
        }}
      >
        <Image
          src={primaryImage.url}
          alt={`Perspective principale — ${title}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          unoptimized
          style={{
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.025)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        />

        {/* Badge Plein Écran */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            backgroundColor: "rgba(26, 34, 45, 0.75)",
            backdropFilter: "blur(8px)",
            color: "#FFFFFF",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.82rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>🔍</span>
          <span>Agrandir (Plein écran)</span>
        </div>
      </div>

      {/* VIGNETTES COMPLÉMENTAIRES */}
      {secondaryImages.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {secondaryImages.map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <div
                key={img.filename || actualIndex}
                onClick={() => setSelectedIndex(actualIndex)}
                style={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid var(--border-default)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Image
                  src={img.url}
                  alt={`Vue détaillée ${actualIndex} — ${title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  unoptimized
                  style={{
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* LIGHTBOX MODALE PLEIN ÉCRAN ACCESSIBLE */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualisation plein écran : ${title}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(10, 14, 20, 0.94)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          {/* Header Lightbox */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#FFFFFF",
            }}
          >
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{title}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.65)" }}>
                Image {selectedIndex + 1} sur {allImages.length}
              </div>
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Fermer la vue plein écran (Échap)"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "none",
                color: "#FFFFFF",
                fontSize: "1.25rem",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
            >
              ✕
            </button>
          </div>

          {/* Zone Image Centrale */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "1rem 0",
            }}
          >
            {/* Flèche Précédent */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
                  );
                }}
                aria-label="Image précédente (Flèche gauche)"
                style={{
                  position: "absolute",
                  left: "0.5rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#FFFFFF",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  zIndex: 10,
                }}
              >
                ‹
              </button>
            )}

            <Image
              src={allImages[selectedIndex].url}
              alt={`${title} — Vue ${selectedIndex + 1}`}
              width={1600}
              height={900}
              unoptimized
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "92vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            />

            {/* Flèche Suivant */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev !== null ? (prev + 1) % allImages.length : 0
                  );
                }}
                aria-label="Image suivante (Flèche droite)"
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#FFFFFF",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  zIndex: 10,
                }}
              >
                ›
              </button>
            )}
          </div>

          {/* Footer Lightbox avec Raccourci Clavier */}
          <div
            style={{
              textAlign: "center",
              fontSize: "0.82rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Utilisez les flèches du clavier ‹ › pour naviguer • Touche Échap pour quitter
          </div>
        </div>
      )}
    </section>
  );
}
