"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Cpu,
  Sun,
  Layers,
  Sparkles,
  Sliders,
  Send,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

type MaturityLevel = "concept" | "demonstrateur" | "prototype" | "operationnel";

interface LabProject {
  id: string;
  title: string;
  maturity: MaturityLevel;
  maturityLabel: string;
  category: "bioclimatique" | "parametrique" | "materiaux" | "bim_scripts";
  description: string;
  hypothesis: string;
  currentResults: string;
  nextStep: string;
  interactiveDemoType?: "sun_shading" | "wood_properties";
}

const LAB_PROJECTS: LabProject[] = [
  {
    id: "lab-sun-shading-equatorial",
    title: "Brise-Soleil Paramétriques & Masques Solaires Équatoriaux",
    maturity: "demonstrateur",
    maturityLabel: "Démonstrateur PoC",
    category: "bioclimatique",
    description:
      "Algorithme d'optimisation géométrique des lames d'ombrage en fonction de l'azimut et de la hauteur solaire à Douala et Yaoundé (Lat. 3° à 4° Nord).",
    hypothesis:
      "Une inclinaison variable calculée par saison permet de bloquer 85% du rayonnement direct tout en conservant 60% d'éclairage naturel diffus.",
    currentResults:
      "Génération paramétrique opérationnelle sur Grasshopper/Dynamo. Réduction thermique mesurée de 3,2°C sur maquette d'essai.",
    nextStep: "Calibrage des profils extrudés en aluminium recyclé local.",
    interactiveDemoType: "sun_shading",
  },
  {
    id: "lab-ifc-dpgf-extractor",
    title: "Extracteur Automatique de Quantités IFC vers CCTP/DPGF",
    maturity: "prototype",
    maturityLabel: "Prototype en Test",
    category: "bim_scripts",
    description:
      "Script d'interopérabilité convertissant les entités IFC (murs, dalles, menuiseries) en lignes de métrés normalisées selon les nomenclatures de marché d'Afrique centrale.",
    hypothesis:
      "Suppression des ressaisies manuelles de métrés entre la maquette 3D et la grille de prix estimative.",
    currentResults:
      "Précision de 98% sur les volumes de béton et surfaces de maçonnerie sur 5 projets tests.",
    nextStep: "Détection automatique des armatures et des réservations de gaines.",
  },
  {
    id: "lab-materiaux-locaux-bois",
    title: "Matériauthèque Numérique & PBR des Essences Camerounaises",
    maturity: "operationnel",
    maturityLabel: "Solution Opérationnelle d'Atelier",
    category: "materiaux",
    description:
      "Base de données de textures photoréalistes PBR (Albedo, Roughness, Normal maps 4K) et fiches mécaniques d'essences de bois locales (Padouk, Iroko, Ayous, Bilinga, Tali).",
    hypothesis:
      "Faciliter la prescription de bois certifiés locaux dans les projets d'architecture et de scénographie contemporaine.",
    currentResults:
      "24 essences modélisées et intégrées dans les moteurs de rendu (Blender, Unreal, Enscape).",
    nextStep: "Mesure in situ de la décoloration sous exposition UV intense.",
    interactiveDemoType: "wood_properties",
  },
  {
    id: "lab-btc-inertie-thermique",
    title: "Calepinage & Optimisation Thermique des Briques de Terre Compressée (BTC)",
    maturity: "concept",
    maturityLabel: "Concept & Recherche Théorique",
    category: "materiaux",
    description:
      "Modélisation du déphasage thermique et algorithme de calepinage modulaire pour minimiser les découpes de briques de terre sur chantier.",
    hypothesis:
      "L'optimisation des joints et de l'épaisseur des parois en BTC stabilise l'ambiance intérieure sans recours à la climatisation continue.",
    currentResults: "Étude théorique et revue de littérature sur les sols latéritiques du Centre et de l'Ouest Cameroun.",
    nextStep: "Réalisation d'une cellule d'essai instrumentée avec sondes thermiques.",
  },
];

export function LabResearchView() {
  const [activeTab, setActiveTab] = useState<MaturityLevel | "all">("all");
  const [interactiveAngle, setInteractiveAngle] = useState<number>(45);

  // Formulaire de collaboration
  const [collabName, setCollabName] = useState<string>("");
  const [collabOrg, setCollabOrg] = useState<string>("");
  const [collabEmail, setCollabEmail] = useState<string>("");
  const [collabTheme, setCollabTheme] = useState<string>("bioclimatique");
  const [collabMessage, setCollabMessage] = useState<string>("");
  const [collabSubmitted, setCollabSubmitted] = useState<boolean>(false);

  const filteredProjects =
    activeTab === "all" ? LAB_PROJECTS : LAB_PROJECTS.filter((p) => p.maturity === activeTab);

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCollabSubmitted(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* AVERTISSEMENT DE MATURITÉ DU LAB */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          backgroundColor: "rgba(87, 184, 255, 0.08)",
          border: "1px solid rgba(87, 184, 255, 0.3)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Lightbulb size={24} color="#57B8FF" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
          <strong style={{ color: "#57B8FF" }}>Démarche R&amp;D et Statut des Outils Expérimentaux : </strong>
          L&apos;univers <strong>ADP Lab</strong> constitue notre pôle d&apos;exploration prospective et de prototypage. Les démonstrateurs et prototypes présentés ci-dessous sont des travaux en cours d&apos;expérimentation et ne doivent pas être confondus avec des logiciels certifiés pour le calcul de structures critiques ou des solutions industrielles commercialisées à grande échelle.
        </div>
      </div>

      {/* TRL ET CLASSIFICATION DE MATURITÉ */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
              Exploration &amp; Ingénierie
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
              Programmes de Recherche &amp; Prototypes
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "Tous les projets" },
              { id: "concept", label: "Concepts" },
              { id: "demonstrateur", label: "Démonstrateurs" },
              { id: "prototype", label: "Prototypes" },
              { id: "operationnel", label: "Opérationnels" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as MaturityLevel | "all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  backgroundColor: activeTab === tab.id ? "var(--accent-brass)" : "var(--bg-surface)",
                  color: activeTab === tab.id ? "#11161F" : "var(--text-secondary)",
                  border: activeTab === tab.id ? "1px solid var(--accent-brass)" : "1px solid var(--border-default)",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DES PROJETS LAB */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProjects.map((p) => {
            const badgeBg =
              p.maturity === "operationnel"
                ? "rgba(78, 202, 142, 0.15)"
                : p.maturity === "prototype"
                ? "rgba(197, 155, 83, 0.15)"
                : p.maturity === "demonstrateur"
                ? "rgba(87, 184, 255, 0.15)"
                : "rgba(163, 177, 194, 0.15)";
            const badgeColor =
              p.maturity === "operationnel"
                ? "#4ECA8E"
                : p.maturity === "prototype"
                ? "#C59B53"
                : p.maturity === "demonstrateur"
                ? "#57B8FF"
                : "#A3B1C2";

            return (
              <div
                key={p.id}
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
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.maturityLabel}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      R&amp;D #{p.id.split("-")[1]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
                    {p.description}
                  </p>

                  {/* Hypothèse & Résultats */}
                  <div
                    style={{
                      padding: "0.85rem",
                      backgroundColor: "var(--bg-secondary)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.82rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <strong style={{ color: "var(--accent-brass)" }}>Hypothèse : </strong>
                      <span style={{ color: "var(--text-secondary)" }}>{p.hypothesis}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Résultats mesurés : </strong>
                      <span style={{ color: "var(--text-secondary)" }}>{p.currentResults}</span>
                    </div>
                  </div>

                  {/* Simulateur interactif de démonstration */}
                  {p.interactiveDemoType === "sun_shading" && (
                    <div
                      style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-default)",
                        backgroundColor: "rgba(197, 155, 83, 0.05)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.8rem", fontWeight: 700 }}>
                        <span style={{ color: "var(--accent-brass)" }}>Simulateur d&apos;angle de lame :</span>
                        <span style={{ fontFamily: "monospace" }}>{interactiveAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        value={interactiveAngle}
                        onChange={(e) => setInteractiveAngle(Number(e.target.value))}
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
                        <span>Ombrage direct : {Math.round(40 + (interactiveAngle / 75) * 55)}%</span>
                        <span>Flux lumineux : {Math.round(85 - (interactiveAngle / 75) * 35)}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <strong>Prochaine étape :</strong> {p.nextStep}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORMULAIRE DE PROPOSITION DE COLLABORATION R&D */}
      <div
        style={{
          padding: "clamp(1.75rem, 4vw, 3rem)",
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <div style={{ maxWidth: "680px", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
            Partenariats Scientifiques &amp; Industriels
          </span>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0.5rem" }}>
            Proposer une Collaboration R&amp;D avec l&apos;Atelier
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, margin: 0 }}>
            Vous êtes enseignant-chercheur, bureau d&apos;études, industriel des matériaux ou éditeur logiciel ? Déposez une proposition de recherche appliquée conjointe.
          </p>
        </div>

        {collabSubmitted ? (
          <div
            style={{
              padding: "2rem",
              backgroundColor: "rgba(78, 202, 142, 0.1)",
              border: "1px solid #4ECA8E",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
            }}
          >
            <CheckCircle2 size={40} color="#4ECA8E" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.5rem" }}>
              Proposition de Recherche Transmise !
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#CBD5E1", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              Merci {collabName}. Notre comité d&apos;atelier examinera votre proposition thématique sous 5 jours ouvrés afin d&apos;envisager une convention de recherche.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCollabSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  Nom &amp; Titre *
                </label>
                <input
                  type="text"
                  required
                  value={collabName}
                  onChange={(e) => setCollabName(e.target.value)}
                  placeholder="Ex : Dr. Paul Belibi"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  Institution / Entreprise *
                </label>
                <input
                  type="text"
                  required
                  value={collabOrg}
                  onChange={(e) => setCollabOrg(e.target.value)}
                  placeholder="Ex : École Nationale Supérieure Polytechnique / Bureau d'ingénierie"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  value={collabEmail}
                  onChange={(e) => setCollabEmail(e.target.value)}
                  placeholder="recherche@domaine.cm"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  Axe de Recherche
                </label>
                <select
                  value={collabTheme}
                  onChange={(e) => setCollabTheme(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.92rem",
                  }}
                >
                  <option value="bioclimatique">Conception Bioclimatique &amp; Enveloppes Solaires</option>
                  <option value="bim_scripts">Automatisation &amp; Scripts BIM (Revit/Dynamo)</option>
                  <option value="materiaux_locaux">Caractérisation de Matériaux Locaux (Bois &amp; Terre)</option>
                  <option value="autre">Autre thématique prospective</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                Description du projet de recherche conjoint
              </label>
              <textarea
                rows={4}
                required
                value={collabMessage}
                onChange={(e) => setCollabMessage(e.target.value)}
                placeholder="Exposez brièvement vos objectifs, les ressources mises en commun et le calendrier envisagé..."
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.92rem",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 1.75rem",
                  backgroundColor: "var(--accent-brass)",
                  color: "#11161F",
                  fontWeight: 700,
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                <Send size={16} />
                <span>Soumettre la demande de collaboration</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
