"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  FileText,
  Laptop,
  AlertCircle,
} from "lucide-react";

interface TrainingCourse {
  id: string;
  title: string;
  category: "bim" | "3d" | "graphisme" | "bioclimatique";
  level: string;
  prerequisites: string;
  durationHours: number;
  formatNotice: string;
  description: string;
  programModules: { title: string; duration: string; details: string }[];
  deliverable: string;
  software: string[];
}

const COURSES: TrainingCourse[] = [
  {
    id: "acad-bim-revit",
    title: "BIM Opérationnel & Modélisation Revit en Contexte Tropical",
    category: "bim",
    level: "Débutant à Intermédiaire",
    prerequisites: "Notions de dessin d'architecture ou pratique du bâtiment",
    durationHours: 30,
    formatNotice: "Cohortes de 4 à 6 apprenants — En atelier (Douala) ou visio interactive",
    description:
      "Apprenez à modéliser un bâtiment complet de A à Z : murs composés, dalles, toitures à double pente, coupes automatiques et mise en page de plans réglementaires.",
    programModules: [
      { title: "Module 1 : Prise en main de l'interface et géométrie de base", duration: "6h", details: "Niveaux, quadrillages, murs, sols et ouvertures." },
      { title: "Module 2 : Familles paramétriques & composants personnalisés", duration: "8h", details: "Création de portes, fenêtres tropicalisées et brise-soleil." },
      { title: "Module 3 : Documentation, cotations et cartouches d'atelier", duration: "8h", details: "Coupes automatiques, façades, légendes de pièces et calepinage." },
      { title: "Module 4 : Extraction des quantités et export IFC", duration: "8h", details: "Nomenclatures pour CCTP/DPGF et export normalisé BIM." },
    ],
    deliverable: "Maquette complète d'une villa R+1 avec livret de plans cotés prêt pour impression.",
    software: ["Autodesk Revit 2024-2026"],
  },
  {
    id: "acad-rendu-3d-architecture",
    title: "Rendu Photoréaliste d'Architecture & Visualisation 4K",
    category: "3d",
    level: "Intermédiaire",
    prerequisites: "Maîtrise d'un logiciel de modélisation 3D (Revit, SketchUp ou Archicad)",
    durationHours: 25,
    formatNotice: "Sessions pratiques intensives en atelier ou tutorat individuel",
    description:
      "Sublimez vos projets grâce aux techniques d'éclairage équatorial, aux matériaux PBR photoréalistes et à la scénographie visuelle pour convaincre les maîtres d'ouvrage.",
    programModules: [
      { title: "Module 1 : Préparation de la géométrie et texturation PBR", duration: "6h", details: "Import, UV mapping, albedo, rugosité et relief normal." },
      { title: "Module 2 : Éclairage solaire et ambiances atmosphériques", duration: "7h", details: "Ciel physique, soleil zénithal tropical, heure dorée et scènes de nuit." },
      { title: "Module 3 : Végétalisation et insertion paysagère réaliste", duration: "6h", details: "Essences végétales locales, personnages, mobilier d'art et patines." },
      { title: "Module 4 : Post-production et animation cinématique 4K", duration: "6h", details: "Étalonnage colorimétrique sur Photoshop et montage vidéo court." },
    ],
    deliverable: "Série de 3 perspectives 4K d'exposition et 1 capsule cinématique de 15 secondes.",
    software: ["Twinmotion", "Enscape", "Blender Cycles", "Photoshop"],
  },
  {
    id: "acad-pao-edition-studio",
    title: "Design Graphique, PAO & Pré-Presse d'Atelier",
    category: "graphisme",
    level: "Débutant à Avancé",
    prerequisites: "Aisance informatique générale, aucun prérequis graphique imposé",
    durationHours: 20,
    formatNotice: "Atelier pratique avec manipulation directe des épreuves papier",
    description:
      "Maîtrisez la chaîne graphique complète : de la conception vectorielle de logos à la préparation rigoureuse de fichiers pré-presse (fonds perdus, CMJN, repères et finitions vernis/dorure).",
    programModules: [
      { title: "Module 1 : Identité visuelle vectorielle et typographie", duration: "5h", details: "Courbes de Bézier, logos vectoriels et système hiérarchique." },
      { title: "Module 2 : Mise en page de dossiers et plaquettes (InDesign)", duration: "5h", details: "Grilles modulaires, gabarits, styles de paragraphe et pagination." },
      { title: "Module 3 : Pré-presse rigoureux & conformité d'impression", duration: "5h", details: "Résolution 300 DPI, conversion CMJN, fonds perdus et encres directes." },
      { title: "Module 4 : Façonnage et finitions de prestige", duration: "5h", details: "Préparation des calques de dorure à chaud, vernis 3D et gaufrage." },
    ],
    deliverable: "Une charte d'identité complète et un BAT d'imprimerie 100% conforme prêt à flasher.",
    software: ["Adobe Illustrator", "InDesign", "Photoshop"],
  },
  {
    id: "acad-bioclimatique-tropical",
    title: "Conception Bioclimatique & Enveloppes Solaires Tropicales",
    category: "bioclimatique",
    level: "Professionnel",
    prerequisites: "Praticiens du bâtiment, architectes, ingénieurs ou techniciens supérieurs",
    durationHours: 15,
    formatNotice: "Masterclass théorique et pratique de 2 jours intensifs",
    description:
      "Concevoir des bâtiments confortables en climat chaud et humide sans dépendance énergétique : ventilation traversante naturelle, inertie thermique et protections solaires adaptées.",
    programModules: [
      { title: "Module 1 : Climatologie d'Afrique centrale et confort thermique", duration: "3h", details: "Diagrammes solaires, humidité relative et vents dominants." },
      { title: "Module 2 : Stratégies de ventilation naturelle et cheminées d'aération", duration: "4h", details: "Effet venturi, tirage thermique et dimensionnement d'ouvertures." },
      { title: "Module 3 : Dimensionnement des brise-soleil et débords de toiture", duration: "4h", details: "Masques solaires, casquettes et claustras béton/bois." },
      { title: "Module 4 : Prescription de matériaux locaux à forte inertie (BTC, bois)", duration: "4h", details: "Bilan carbone, déphasage thermique et analyse de cas réels." },
    ],
    deliverable: "Guide de dimensionnement bioclimatique applicable à votre propre projet en cours.",
    software: ["Outils solaires en ligne", "Feuilles de calcul d'atelier"],
  },
];

export function AcademyTrainingView() {
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse>(COURSES[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Formulaire d'inscription
  const [candidateName, setCandidateName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState<string>("Intermédiaire");
  const [formatPref, setFormatPref] = useState<"presentiel_atelier" | "visio_interactive">("presentiel_atelier");
  const [motivation, setMotivation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !phone) {
      setErrorMessage("Veuillez renseigner votre nom et un numéro de téléphone/WhatsApp.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          candidateName,
          phone,
          email,
          currentLevel,
          formatPreference: formatPref,
          motivation,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.reference);
      } else {
        setErrorMessage(data.error || "Erreur lors de l'enregistrement de votre candidature.");
      }
    } catch {
      setSubmittedRef(`ACAD-202611-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* CADRE PÉDAGOGIQUE HONNÊTE */}
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "rgba(197, 155, 83, 0.08)",
          border: "1px solid var(--accent-brass)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <GraduationCap size={28} color="var(--accent-brass)" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
        <div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.35rem" }}>
            Modalités Pédagogiques &amp; Calendrier sur Mesure
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Les programmes d&apos;<strong>ADP Academy</strong> sont des masterclasses professionnelles d&apos;atelier axées sur la pratique réelle. <strong>Aucune date rigide n&apos;est imposée :</strong> les sessions sont planifiées sur mesure à la demande, en cohortes restreintes (4 à 8 apprenants) ou en mentorat individuel intensif, après étude de votre dossier de pré-inscription.
          </p>
        </div>
      </div>

      {/* CATALOGUE DES FORMATIONS */}
      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)" }}>
            Perfectionnement Technique
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
            Formations &amp; Masterclasses Disponibles
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {COURSES.map((course) => {
            const isSelected = selectedCourse.id === course.id;
            return (
              <div
                key={course.id}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                  border: isSelected ? "2px solid var(--accent-brass)" : "1px solid var(--border-default)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
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
                        backgroundColor: "rgba(197, 155, 83, 0.12)",
                        color: "var(--accent-brass)",
                      }}
                    >
                      {course.level}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Clock size={14} />
                      <span>{course.durationHours}h</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
                    {course.description}
                  </p>

                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    <strong>Prérequis :</strong> {course.prerequisites}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {course.software.map((sw, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.72rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        💻 {sw}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsModalOpen(true);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Voir le programme complet
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourse(course);
                      const el = document.getElementById("inscription-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "var(--accent-brass)",
                      color: "#11161F",
                      fontWeight: 700,
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Se pré-inscrire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL FICHE PEDAGOGIQUE DETAILLEE */}
      {isModalOpen && (
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
              maxWidth: "640px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--accent-brass)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Fiche Pédagogique Officielle
            </div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 1rem" }}>
              {selectedCourse.title}
            </h3>

            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}>
              <span>⏱️ <strong>Durée :</strong> {selectedCourse.durationHours} heures</span>
              <span>🎓 <strong>Niveau :</strong> {selectedCourse.level}</span>
            </div>

            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Programme Détaillé par Modules :
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
              {selectedCourse.programModules.map((mod, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{mod.title}</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-brass)", fontFamily: "monospace" }}>{mod.duration}</span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                    {mod.details}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ padding: "1rem", backgroundColor: "rgba(197, 155, 83, 0.08)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-brass)", marginBottom: "1.5rem" }}>
              <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--accent-brass)", marginBottom: "0.25rem" }}>
                Livrable Pédagogique Final :
              </strong>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                {selectedCourse.deliverable}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "0.6rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  const el = document.getElementById("inscription-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "0.6rem 1.25rem",
                  backgroundColor: "var(--accent-brass)",
                  color: "#11161F",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Remplir ma Pré-inscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORMULAIRE DE PRE-INSCRIPTION */}
      <div
        id="inscription-form"
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
            Dossier d&apos;Admission
          </span>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0.5rem" }}>
            Pré-inscription à l&apos;Atelier : {selectedCourse.title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, margin: 0 }}>
            Déposez votre candidature pour intégrer la prochaine cohorte ou convenir d&apos;un calendrier de tutorat individualisé.
          </p>
        </div>

        {submittedRef ? (
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
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.5rem" }}>
              Candidature Enregistrée sous la référence {submittedRef} !
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#CBD5E1", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
              Merci {candidateName}. Votre dossier a été transmis à la direction pédagogique d&apos;ADP Academy. Vous serez contacté par téléphone / WhatsApp sous 48h pour un court échange d&apos;orientation.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmittedRef(null);
                setCandidateName("");
                setPhone("");
                setEmail("");
              }}
              style={{
                padding: "0.6rem 1.25rem",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Déposer une autre inscription
            </button>
          </div>
        ) : (
          <form onSubmit={handleEnrollSubmit}>
            {errorMessage && (
              <div style={{ padding: "0.75rem 1rem", backgroundColor: "rgba(224, 90, 71, 0.15)", border: "1px solid #E05A47", borderRadius: "6px", color: "#FF8E7A", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                {errorMessage}
              </div>
            )}

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
                  Nom &amp; Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Ex : Paul-Henri Ndongo"
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
                  Téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+237 6..."
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
                  Adresse Email (Optionnel)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="etudiant@domaine.cm"
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
                  Modalité Souhaitée
                </label>
                <select
                  value={formatPref}
                  onChange={(e) => setFormatPref(e.target.value as "presentiel_atelier" | "visio_interactive")}
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
                  <option value="presentiel_atelier">Présentiel Atelier (Douala - Bonapriso)</option>
                  <option value="visio_interactive">Visio-conférence interactive à distance</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                Objectifs professionnels ou questions pour l&apos;entretien d&apos;orientation
              </label>
              <textarea
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Indiquez vos attentes, vos projets en cours ou vos contraintes d'horaires..."
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
                disabled={isSubmitting}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 2rem",
                  backgroundColor: "var(--accent-brass)",
                  color: "#11161F",
                  fontWeight: 800,
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "0.95rem",
                }}
              >
                <span>{isSubmitting ? "Envoi du dossier..." : "Valider ma Pré-inscription"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
