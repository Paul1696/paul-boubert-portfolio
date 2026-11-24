"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Download,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  Terminal,
  Compass,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

type ToolStatus = "disponible" | "beta" | "developpement" | "concept";

interface ToolItem {
  id: string;
  title: string;
  category: "gabarit" | "script" | "bim" | "webcalc";
  categoryLabel: string;
  version: string;
  status: ToolStatus;
  statusLabel: string;
  compatibility: string;
  description: string;
  features: string[];
  documentationSummary: string;
  downloadUrl?: string; // Uniquement si le fichier existe réellement
  isDirectDownloadAvailable: boolean;
}

const TOOLS_CATALOG: ToolItem[] = [
  {
    id: "tool-dpgf-excel-template",
    title: "Gabarit CCTP / DPGF Normalisé Bâtiment Afrique Centrale",
    category: "gabarit",
    categoryLabel: "Gabarit Métier",
    version: "v2.4.0",
    status: "disponible",
    statusLabel: "Disponible Immédiatement",
    compatibility: "Microsoft Excel 2016+, Office 365, LibreOffice",
    description:
      "Feuille de calcul professionnelle structurée selon les 14 corps d'état du bâtiment. Formules dynamiques intégrées pour le récapitulatif Tous Corps d'État (TCE), ratios au m² et TVA légale.",
    features: [
      "14 onglets pré-configurés par lot (Gros-œuvre, charpente, menuiserie, électricité, etc.)",
      "Tableau récapitulatif automatique avec calcul du coût au m² habitable",
      "Protection des cellules de formule pour éviter les erreurs de saisie",
      "Guide d'utilisation et glossaire des unités de mesure (m³, m², ml, u, f)",
    ],
    documentationSummary:
      "Ce gabarit est issu des standards contractuels d'ADP Brief. Il permet aux maîtres d'œuvre, promoteurs et entrepreneurs d'éditer un dossier de consultation clair sans erreurs de calcul.",
    downloadUrl: "#telechargement-gabarit-dpgf",
    isDirectDownloadAvailable: true,
  },
  {
    id: "tool-cad-styles-library",
    title: "Charte de Calques & Épaisseurs de Plumes CAO d'Atelier",
    category: "gabarit",
    categoryLabel: "Charte Graphique CAO",
    version: "v1.8.0",
    status: "disponible",
    statusLabel: "Disponible Immédiatement",
    compatibility: "AutoCAD 2018 à 2026, BricsCAD, ZWCAD",
    description:
      "Système complet de calques normalisés avec code couleur rigoureux et fichier de table des styles de tracé (CTB). Garantit des tirages papier aux traits nets et contrastes parfaits.",
    features: [
      "Nomenclature hiérarchique de calques : A-MUR-PORT, A-CLOI, A-COTE, A-TEXT",
      "Table de plumes CTB optimisée pour impression monochrome et demi-teintes",
      "Gabarit DWT pré-configuré avec échelles d'annotation 1/50, 1/100 et 1/200",
    ],
    documentationSummary:
      "Harmonisez vos plans d'architecture pour une lisibilité parfaite sur table traçante et écran.",
    downloadUrl: "#telechargement-charte-cao",
    isDirectDownloadAvailable: true,
  },
  {
    id: "tool-dynamo-revit-renamer",
    title: "Script Dynamo de Renommage Automatisé de Vues & Feuilles Revit",
    category: "script",
    categoryLabel: "Automatisation BIM",
    version: "v0.9.2-beta",
    status: "beta",
    statusLabel: "Bêta Privée d'Atelier",
    compatibility: "Autodesk Revit 2023 à 2026 & Dynamo 2.16+",
    description:
      "Script visuel Dynamo automatisant le renommage et la codification de centaines de vues et feuilles selon la convention internationale ISO 19650 et le protocole d'Atelier.",
    features: [
      "Renommage par lot avec préfixes de phase, niveau et discipline",
      "Renumérotation séquentielle des planches de permis de construire",
      "Journal d'erreurs en temps réel évitant les doublons de numéros",
    ],
    documentationSummary:
      "ATTENTION : Outil en cours de bêta-test. Ne pas déployer sur des projets de production sans sauvegarde préalable de la maquette centrale.",
    isDirectDownloadAvailable: false,
  },
  {
    id: "tool-solar-mask-webcalc",
    title: "Calculateur d'Ombrage Solaire Équatorial Web",
    category: "webcalc",
    categoryLabel: "Outil Web R&D",
    version: "v0.4.0-alpha",
    status: "developpement",
    statusLabel: "En Cours de Développement",
    compatibility: "Navigateurs modernes (WebAssembly / Three.js)",
    description:
      "Module web interactif développé par ADP Lab pour modéliser la projection d'ombre portée des casquettes et brise-soleil aux latitudes équatoriales (0° à 5° Nord).",
    features: [
      "Calcul des coordonnées solaires instantanées pour Douala, Yaoundé et Kribi",
      "Visualisation 3D de l'ensoleillement sur une baie vitrée orientée",
      "Calcul du pourcentage de vitrage ombragé aux heures critiques (10h-15h)",
    ],
    documentationSummary:
      "Prototype en cours de validation métrologique. Accessible prochainement en libre accès sur le portail ADP Tools.",
    isDirectDownloadAvailable: false,
  },
];

export function ToolsCatalogView() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [betaToolTarget, setBetaToolTarget] = useState<ToolItem | null>(null);

  // Formulaire d'accès bêta
  const [applicantName, setApplicantName] = useState<string>("");
  const [applicantEmail, setApplicantEmail] = useState<string>("");
  const [applicantSoftware, setApplicantSoftware] = useState<string>("");
  const [betaSuccess, setBetaSuccess] = useState<boolean>(false);

  // Simulation téléchargement
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const handleDirectDownload = (tool: ToolItem) => {
    setDownloadSuccessMessage(
      `Le fichier « ${tool.title} » (${tool.version}) a été généré et mis à disposition pour votre session.`
    );
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 6000);
  };

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBetaSuccess(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* BANDEAU HONNETETE TECHNIQUE SUR LES STATUTS */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          backgroundColor: "rgba(197, 155, 83, 0.08)",
          border: "1px solid var(--accent-brass)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <ShieldCheck size={28} color="var(--accent-brass)" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
        <div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.35rem" }}>
            Transparence sur les Versions &amp; Statuts Logiciels
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Les ressources proposées par <strong>ADP Tools</strong> font l&apos;objet d&apos;une stricte classification technique. Les <strong>gabarits stabilisés</strong> sont en téléchargement direct immédiat. Les scripts et outils en statut <strong>Bêta</strong> ou <strong>En développement</strong> ne sont pas commercialisés comme des suites logicielles prêtes à l&apos;emploi et nécessitent une demande d&apos;évaluation.
          </p>
        </div>
      </div>

      {downloadSuccessMessage && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(78, 202, 142, 0.15)",
            border: "1px solid #4ECA8E",
            borderRadius: "var(--radius-sm)",
            color: "#4ECA8E",
            fontSize: "0.9rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <CheckCircle2 size={18} />
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      {/* CATALOGUE DES OUTILS */}
      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
            Écosystème Numérique d&apos;Atelier
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
            Bibliothèque d&apos;Outils, Gabarits &amp; Scripts
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TOOLS_CATALOG.map((tool) => {
            const isAvailable = tool.status === "disponible";
            const isBeta = tool.status === "beta";

            return (
              <div
                key={tool.id}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-default)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        backgroundColor: isAvailable
                          ? "rgba(78, 202, 142, 0.15)"
                          : isBeta
                          ? "rgba(197, 155, 83, 0.15)"
                          : "rgba(163, 177, 194, 0.15)",
                        color: isAvailable ? "#4ECA8E" : isBeta ? "#C59B53" : "#A3B1C2",
                      }}
                    >
                      {tool.statusLabel}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {tool.version}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
                    {tool.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
                    {tool.description}
                  </p>

                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                    <strong>Compatibilité :</strong> {tool.compatibility}
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-brass)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                      Fonctionnalités clés :
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {tool.features.slice(0, 3).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
                  {isAvailable ? (
                    <button
                      type="button"
                      onClick={() => handleDirectDownload(tool)}
                      style={{
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.8rem 1.25rem",
                        backgroundColor: "var(--accent-brass)",
                        color: "#11161F",
                        fontWeight: 700,
                        borderRadius: "var(--radius-sm)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Download size={16} />
                      <span>Télécharger le gabarit vérifié</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setBetaToolTarget(tool)}
                      style={{
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.8rem 1.25rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Key size={15} color="var(--accent-brass)" />
                      <span>Demander l&apos;accès à la Bêta</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL DEMANDE D'ACCÈS BÊTA */}
      {betaToolTarget && (
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
              maxWidth: "520px",
              width: "100%",
              padding: "2rem",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--accent-brass)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Évaluation Technique d&apos;Atelier
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
              Demande d&apos;accès : {betaToolTarget.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 1.5rem" }}>
              Cet outil est en cours de validation par notre équipe d&apos;ingénierie. Renseignez votre profil pour recevoir une version d&apos;évaluation et participer aux tests.
            </p>

            {betaSuccess ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <CheckCircle2 size={36} color="#4ECA8E" style={{ margin: "0 auto 0.75rem" }} />
                <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                  Demande d&apos;évaluation transmise !
                </div>
                <p style={{ fontSize: "0.82rem", color: "#CBD5E1", margin: "0 0 1.25rem" }}>
                  Notre responsable technique examinera la compatibilité de votre environnement de travail sous 48h.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBetaSuccess(false);
                    setBetaToolTarget(null);
                  }}
                  style={{
                    padding: "0.5rem 1.25rem",
                    backgroundColor: "var(--accent-brass)",
                    color: "#11161F",
                    fontWeight: 700,
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleBetaSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Ex : M. Thomas Manga"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                      Adresse Email professionnelle *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="t.manga@agence-archi.cm"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                      Version logicielle utilisée
                    </label>
                    <input
                      type="text"
                      value={applicantSoftware}
                      onChange={(e) => setApplicantSoftware(e.target.value)}
                      placeholder="Ex : Autodesk Revit 2025.2 / Excel 365"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={() => setBetaToolTarget(null)}
                    style={{
                      padding: "0.6rem 1.25rem",
                      backgroundColor: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "0.6rem 1.25rem",
                      backgroundColor: "var(--accent-brass)",
                      color: "#11161F",
                      fontWeight: 700,
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Envoyer ma demande d&apos;accès
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
