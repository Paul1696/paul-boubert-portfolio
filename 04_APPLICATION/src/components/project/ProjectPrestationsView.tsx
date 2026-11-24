"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Layers,
  Eye,
  FileCheck,
  ShieldAlert,
  Upload,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { ALL_PROJECTS } from "@/data/all-projects";
import { quoteStore } from "@/data/quote-store";

interface PrestationItem {
  id: string;
  slug: string;
  title: string;
  category: "etudes" | "bim" | "visualisation" | "execution";
  categoryLabel: string;
  description: string;
  deliverables: string[];
  tools: string[];
  deontologicalStatus: "direct_atelier" | "partenariat_onac_requis";
  deontologicalNotice: string;
  quoteItemId?: string;
}

const PROJECT_PRESTATIONS: PrestationItem[] = [
  {
    id: "proj-cadrage-amo",
    slug: "cadrage-amo-programmation",
    title: "Assistance à Maîtrise d'Ouvrage (AMO) & Cadrage Préalable",
    category: "etudes",
    categoryLabel: "Études Préalables & Stratégie",
    description:
      "Clarification des intentions programmatiques, faisabilité spatiale, ratios surfaciques, phasage prévisionnel et structuration de la consultation.",
    deliverables: [
      "Note de cadrage programmatique",
      "Tableau des surfaces & organigramme fonctionnel",
      "Planning directeur prévisionnel",
    ],
    tools: ["Recherche documentaire", "Analyse spatiale", "Tableaux normalisés"],
    deontologicalStatus: "direct_atelier",
    deontologicalNotice:
      "Prestation intellectuelle de conseil et d'assistance assurée directement par l'Atelier.",
    quoteItemId: "adp-project-faisabilite",
  },
  {
    id: "proj-bim-modelisation",
    slug: "modelisation-bim-technique",
    title: "Modélisation Numérique BIM & Maquettes 3D Techniques",
    category: "bim",
    categoryLabel: "BIM & Ingénierie Numérique",
    description:
      "Conception et modélisation de maquettes numériques Revit/Archicad de niveau LOD 200 à 350. Synthèse spatiale entre corps d'état, détection des clashs et calepinage technique.",
    deliverables: [
      "Maquette numérique paramétrique (RVT / IFC / PLN)",
      "Vues axonométriques et coupes de principe",
      "Tableaux d'extraction des quantités d'ouvrages",
    ],
    tools: ["Autodesk Revit 2024-2026", "Archicad", "Navisworks", "Dynamo"],
    deontologicalStatus: "direct_atelier",
    deontologicalNotice:
      "Modélisation technique et synthèse 3D assurée par l'Atelier pour le compte de concepteurs ou maîtres d'ouvrage.",
    quoteItemId: "adp-project-modelisation-bim",
  },
  {
    id: "proj-visualisation-4k",
    slug: "visualisation-rendus-4k",
    title: "Imagerie d'Architecture, Perspectives 4K & Visites 360°",
    category: "visualisation",
    categoryLabel: "Imagerie & Visualisation",
    description:
      "Production d'images de synthèse haut de gamme, textures PBR réalistes, ambiances lumineuses tropicales, insertion paysagère et animations cinématiques immersives.",
    deliverables: [
      "Perspectives extérieures et intérieures 4K (3840x2160)",
      "Panoramas interactifs 360° pour smartphone et casque VR",
      "Capsules vidéo cinématiques montées avec ambiance sonore",
    ],
    tools: ["Twinmotion", "Enscape", "Blender Cycles", "Photoshop", "Premiere Pro"],
    deontologicalStatus: "direct_atelier",
    deontologicalNotice:
      "Création infographique et rendu architectural assurés directement par le Studio 3D.",
    quoteItemId: "adp-project-perspective-3d",
  },
  {
    id: "proj-plans-vente-immo",
    slug: "plans-de-vente-commercialisation",
    title: "Plans de Vente Immobiliers & Dossiers Graphiques Promoteurs",
    category: "execution",
    categoryLabel: "Documentation & Promotion",
    description:
      "Mise en valeur esthétique des plans d'appartements, villas et ensembles commerciaux pour la vente sur plan (VEFA). Texturation soignée des sols, aménagement mobilier et cotations d'usage.",
    deliverables: [
      "Planches de plans 2D couleur meublés et texturés",
      "Écorchés 3D axonométriques de chaque typologie de lot",
      "Livret PDF haute définition pour équipe de commercialisation",
    ],
    tools: ["Illustrator", "InDesign", "AutoCAD", "Revit"],
    deontologicalStatus: "direct_atelier",
    deontologicalNotice:
      "Mise au net graphique et documentation de promotion immobilière assurée par l'Atelier.",
    quoteItemId: "adp-project-plans-2d",
  },
  {
    id: "proj-permis-construire-onac",
    slug: "dossier-permis-construire-onac",
    title: "Constitution Graphique de Dossier de Permis de Construire",
    category: "execution",
    categoryLabel: "Dossiers Réglementaires",
    description:
      "Établissement des pièces graphiques réglementaires (PCMI 1 à 8 : plan de situation, plan de masse, coupes, façades et insertion paysagère).",
    deliverables: [
      "Jeu complet des planches graphiques normalisées pour dépôt",
      "Notice descriptive d'insertion environnementale",
      "Dossier technique relié au format légal",
    ],
    tools: ["AutoCAD", "Revit", "Photoshop", "Suite bureautique"],
    deontologicalStatus: "partenariat_onac_requis",
    deontologicalNotice:
      "ATTENTION CADRE LÉGAL : Les Ateliers de Paul réalisent le travail de dessin et d'infographie préparatoire. Conformément à la Loi n° 90/039, le visa, la signature et le dépôt officiel du permis de construire sont obligatoirement assurés par un architecte habilité et inscrit à l'Ordre National des Architectes du Cameroun (ONAC).",
    quoteItemId: "adp-project-permis-construire",
  },
];

export function ProjectPrestationsView() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activePrestation, setActivePrestation] = useState<PrestationItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  // quoteStore used directly

  const filteredPrestations =
    selectedFilter === "all"
      ? PROJECT_PRESTATIONS
      : PROJECT_PRESTATIONS.filter((p) => p.category === selectedFilter);

  // Projets autorisés du portfolio en lien direct
  const architecturalProjects = ALL_PROJECTS.filter(
    (p) => p.universeSlug === "adp-project" || p.typology === "Résidentiel" || p.typology === "Tertiaire"
  ).slice(0, 4);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* BANDEAU DEONTOLOGIQUE OFFICIEL ONAC */}
      <div
        style={{
          padding: "1.5rem 1.75rem",
          backgroundColor: "rgba(197, 155, 83, 0.08)",
          border: "1px solid var(--accent-brass)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <ShieldAlert size={28} color="var(--accent-brass)" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
        <div>
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              margin: "0 0 0.4rem",
              letterSpacing: "0.02em",
            }}
          >
            Cadre Déontologique &amp; Qualifications Professionnelles (Loi n° 90/039)
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
            Les Ateliers de Paul exercent en tant qu&apos;atelier de design, modélisation technique BIM, infographie et assistance à maîtrise d&apos;ouvrage. Conformément à la réglementation camerounaise (Loi n° 90/039), tout acte relevant strictement du monopole légal de la profession d&apos;architecte (notamment la signature de plans pour permis de construire et la maîtrise d&apos;œuvre complète) est systématiquement confié à un architecte agréé et inscrit à l&apos;Ordre National des Architectes du Cameroun (ONAC), intervenant sous convention d&apos;exercice ou mandat direct du maître d&apos;ouvrage.{" "}
            <Link
              href="/cadre-deontologique"
              style={{ color: "var(--accent-brass)", textDecoration: "underline", fontWeight: 600 }}
            >
              Consulter nos engagements légaux complets →
            </Link>
          </p>
        </div>
      </div>

      {/* FILTRES PAR FAMILLE DE PRESTATIONS */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
              Catalogue des Études Techniques
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
              Prestations d&apos;Ingénierie &amp; Modélisation
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "Toutes les études" },
              { id: "bim", label: "Modélisation BIM" },
              { id: "visualisation", label: "Rendu 3D 4K" },
              { id: "etudes", label: "Assistance & Cadrage" },
              { id: "execution", label: "Plans & Dossiers" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: selectedFilter === f.id ? 700 : 500,
                  backgroundColor: selectedFilter === f.id ? "var(--accent-brass)" : "var(--bg-surface)",
                  color: selectedFilter === f.id ? "#11161F" : "var(--text-secondary)",
                  border: selectedFilter === f.id ? "1px solid var(--accent-brass)" : "1px solid var(--border-default)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DES PRESTATIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPrestations.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--accent-brass)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: "rgba(197, 155, 83, 0.12)",
                    }}
                  >
                    {item.categoryLabel}
                  </span>

                  {item.deontologicalStatus === "partenariat_onac_requis" && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#E05A47",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(224, 90, 71, 0.12)",
                      }}
                    >
                      Convention ONAC
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    margin: "0 0 0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
                  {item.description}
                </p>

                {/* Livrables */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Livrables contractuels :
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {item.deliverables.map((del, i) => (
                      <li key={i}>{del}</li>
                    ))}
                  </ul>
                </div>

                {/* Outils & environnements */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {item.tools.map((tool, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.72rem",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Note déontologique spécifique */}
                <div
                  style={{
                    padding: "0.65rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor:
                      item.deontologicalStatus === "partenariat_onac_requis"
                        ? "rgba(224, 90, 71, 0.08)"
                        : "var(--bg-secondary)",
                    border:
                      item.deontologicalStatus === "partenariat_onac_requis"
                        ? "1px solid rgba(224, 90, 71, 0.3)"
                        : "1px solid var(--border-subtle)",
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.45,
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>Statut d&apos;exercice : </strong>
                  {item.deontologicalNotice}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      quoteStore.openDrawer();
                    }}
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--accent-brass)",
                      color: "#11161F",
                      fontWeight: 700,
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span>Ajouter au Devis</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePrestation(item)}
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Déposer des documents pour cette prestation"
                  >
                    <Upload size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SIMULATION DEPOT DE DOCUMENTS POUR UNE PRESTATION */}
      {activePrestation && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              maxWidth: "540px",
              width: "100%",
              padding: "2rem",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
              Transmission de pièces : {activePrestation.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
              Déposez ici les documents nécessaires à l&apos;étude de faisabilité de votre projet (Plans existants, esquisses, fichiers DWG ou photos).
            </p>

            <div
              style={{
                border: "2px dashed var(--border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "1.5rem",
                textAlign: "center",
                backgroundColor: "var(--bg-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              <Upload size={28} color="var(--accent-brass)" style={{ margin: "0 auto 0.5rem" }} />
              <label
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                <span>Sélectionner des fichiers (PDF, DWG, ZIP)</span>
                <input type="file" multiple onChange={handleSimulatedUpload} style={{ display: "none" }} />
              </label>

              {uploadedFiles.length > 0 && (
                <div style={{ marginTop: "1rem", textAlign: "left" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-brass)", marginBottom: "0.3rem" }}>
                    Fichiers prêts :
                  </div>
                  {uploadedFiles.map((fn, i) => (
                    <div key={i} style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                      ✓ {fn}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setActivePrestation(null)}
                style={{
                  padding: "0.6rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePrestation(null);
                  quoteStore.openDrawer();
                }}
                style={{
                  padding: "0.6rem 1.25rem",
                  backgroundColor: "var(--accent-brass)",
                  color: "#11161F",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Poursuivre sur le Devis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION RÉFÉRENCES DE PROJETS AUTORISÉES */}
      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
            Réalisations Authentiques
          </span>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
            Projets &amp; Études de Référence
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {architecturalProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}`}
              style={{
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                overflow: "hidden",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  height: "160px",
                  backgroundColor: "var(--bg-secondary)",
                  backgroundImage: "linear-gradient(135deg, rgba(197, 155, 83, 0.15) 0%, rgba(22, 29, 38, 0.8) 100%)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--accent-brass)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    {p.year} • {p.location}
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {p.subtitle}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--accent-brass)", fontWeight: 600, marginTop: "1rem" }}>
                  <span>Découvrir l&apos;étude</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
