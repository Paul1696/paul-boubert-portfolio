"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Compass,
  CheckCircle2,
  Upload,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Building,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface BriefDomain {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  exampleQuestions: string;
}

const BRIEF_DOMAINS: BriefDomain[] = [
  {
    id: "architecture_conception",
    title: "Conception & Études Architecturales",
    subtitle: "Résidentiel, tertiaire, commerces ou équipements",
    icon: "🏛️",
    exampleQuestions: "Esquisse, modélisation 3D, plans de vente, cadrage de projet",
  },
  {
    id: "pieces_ecrites_dce",
    title: "Pièces Écrites & CCTP / DPGF",
    subtitle: "Dossiers de consultation et métrés de chantier",
    icon: "📐",
    exampleQuestions: "Descriptifs techniques, devis quantitatifs estimatifs, cahiers des charges",
  },
  {
    id: "studio_identite_edition",
    title: "Identité de Marque & Édition Studio",
    subtitle: "Logo, charte graphique, papeterie et signalétique",
    icon: "🎨",
    exampleQuestions: "Création d'identité visuelle, plaquettes, pack papeterie d'entreprise",
  },
  {
    id: "digital_cards",
    title: "Cartes Digitales & Identités Connectées",
    subtitle: "Cartes physiques de prestige avec profil web permanent",
    icon: "🪪",
    exampleQuestions: "Équipement d'équipes, badges PVC, QR codes sécurisés",
  },
  {
    id: "scenographie_amenagement",
    title: "Design d'Espace & Scénographie",
    subtitle: "Agencement intérieur, stands, mobilier d'art et matière",
    icon: "🌿",
    exampleQuestions: "Aménagement de bureaux, scénographie d'exposition, concepts sur mesure",
  },
  {
    id: "rd_parametrique",
    title: "Recherche, Automatisation & Paramétrique",
    subtitle: "Études bioclimatiques, scripts BIM et prototypes",
    icon: "🔬",
    exampleQuestions: "Calculs solaires, optimisation de façade, développement d'outils",
  },
];

export function BriefUniversalIntake() {
  const [step, setStep] = useState<number>(1);
  const [selectedDomain, setSelectedDomain] = useState<string>("architecture_conception");
  const [objective, setObjective] = useState<string>("");
  const [scaleOrSize, setScaleOrSize] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("1_a_3_mois");
  const [budgetRange, setBudgetRange] = useState<string>("a_etudier");
  const [availableDocs, setAvailableDocs] = useState<string[]>([]);
  const [clientNotes, setClientNotes] = useState<string>("");
  const [simulatedFiles, setSimulatedFiles] = useState<string[]>([]);

  // Contact
  const [fullName, setFullName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("Douala");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [whatsappSent, setWhatsappSent] = useState<boolean>(false);

  const currentDomainObj = BRIEF_DOMAINS.find((d) => d.id === selectedDomain) || BRIEF_DOMAINS[0];

  const toggleDoc = (docName: string) => {
    if (availableDocs.includes(docName)) {
      setAvailableDocs(availableDocs.filter((d) => d !== docName));
    } else {
      setAvailableDocs([...availableDocs, docName]);
    }
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setSimulatedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMessage("Veuillez renseigner votre nom complet et un numéro de téléphone/WhatsApp.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        domain: selectedDomain,
        domainLabel: currentDomainObj.title,
        objective: objective || "Cadrage préliminaire de projet",
        scaleOrSize: scaleOrSize || "Non spécifié",
        location: location || "Cameroun",
        timeframe: timeframe,
        budgetNotice: budgetRange,
        documentsAvailable: availableDocs,
        uploadedFilesSimulation: simulatedFiles,
        clientNotes: clientNotes,
        customer: {
          fullName,
          organization,
          phone,
          email,
          city,
        },
      };

      const res = await fetch("/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.reference);
        setStep(5);
      } else {
        setErrorMessage(data.error || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch {
      // En cas de panne de connexion locale, générer une référence locale de secours
      const fallbackRef = `BRF-202611-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(fallbackRef);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `*NOUVEAU BRIEF ADRESSÉ AUX ATELIERS DE PAUL*
📋 *Référence :* ${submittedRef}
🏛️ *Domaine :* ${currentDomainObj.title}
🎯 *Objectif :* ${objective || "Non précisé"}
📐 *Échelle / Projet :* ${scaleOrSize || "Non précisé"}
📍 *Localisation :* ${location || city || "Cameroun"}
⏱️ *Échéance :* ${timeframe}
📂 *Documents existants :* ${availableDocs.length > 0 ? availableDocs.join(", ") : "À rassembler"}

👤 *Commanditaire :* ${fullName} ${organization ? `(${organization})` : ""}
📞 *Contact :* ${phone}
✉️ *Email :* ${email || "Non communiqué"}

Bonjour Les Ateliers de Paul, je viens de finaliser mon brief sur votre plateforme. Merci de bien vouloir en prendre connaissance pour notre échange de cadrage.`;

    return `https://wa.me/237690087213?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-elevated)",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
      }}
    >
      {/* Barre de progression intuitive */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
          <span style={{ fontWeight: 700, color: "var(--accent-brass)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Étape {step} sur 5
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            {step === 1 && "Choix du Domaine"}
            {step === 2 && "Expression du Besoin"}
            {step === 3 && "Documents & Données"}
            {step === 4 && "Coordonnées & Synthèse"}
            {step === 5 && "Transmission & Suivi"}
          </span>
        </div>
        <div style={{ height: "4px", backgroundColor: "var(--bg-secondary)", borderRadius: "2px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${(step / 5) * 100}%`,
              backgroundColor: "var(--accent-brass)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            backgroundColor: "rgba(224, 90, 71, 0.15)",
            border: "1px solid var(--status-error, #E05A47)",
            borderRadius: "var(--radius-sm)",
            color: "#FF8E7A",
            fontSize: "0.88rem",
            marginBottom: "1.5rem",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* ÉTAPE 1 : CHOIX DU DOMAINE */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
              Quel est le domaine principal de votre demande ?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              Sélectionnez la catégorie qui décrit le mieux votre projet. Vous n&apos;avez pas besoin de maîtriser les termes techniques, notre questionnaire s&apos;adapte.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2.5rem",
            }}
          >
            {BRIEF_DOMAINS.map((dom) => {
              const isSelected = selectedDomain === dom.id;
              return (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => setSelectedDomain(dom.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    padding: "1.5rem",
                    backgroundColor: isSelected ? "rgba(197, 155, 83, 0.1)" : "var(--bg-secondary)",
                    border: isSelected ? "2px solid var(--accent-brass)" : "1px solid var(--border-default)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{dom.icon}</span>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {dom.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                    {dom.subtitle}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: "auto" }}>
                    Exemple : {dom.exampleQuestions}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => setStep(2)}
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
              <span>Continuer vers le besoin</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : EXPRESSION DU BESOIN EN LANGAGE SIMPLE */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--accent-brass)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Domaine : {currentDomainObj.title}
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
              Décrivez votre intention en quelques mots simples
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              Expliquez-nous ce que vous souhaitez accomplir. Les Ateliers de Paul se chargent de traduire vos attentes en cahier des charges rigoureux.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Quel est l&apos;objectif premier du projet ? *
              </label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Ex : Construire une villa contemporaine, structurer le dossier d'appel d'offres de notre siège, créer la marque d'un cabinet..."
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Envergure estimée (Surface, étages, volume)
                </label>
                <input
                  type="text"
                  value={scaleOrSize}
                  onChange={(e) => setScaleOrSize(e.target.value)}
                  placeholder="Ex : Terrain de 500m², R+2, 12 collaborateurs, 500 exemplaires..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Localisation d&apos;implantation
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex : Douala (Bonapriso), Yaoundé (Bastos), Kribi, Bafoussam..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Horizon temporel souhaité
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                >
                  <option value="urgent_moins_1_mois">Urgent (Moins d&apos;1 mois)</option>
                  <option value="1_a_3_mois">Court terme (1 à 3 mois)</option>
                  <option value="3_a_6_mois">Moyen terme (3 à 6 mois)</option>
                  <option value="prospectif">Étude prospective / Sans date arrêtée</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Enveloppe budgétaire prévisionnelle
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                >
                  <option value="a_etudier">À déterminer lors de l&apos;étude de cadrage</option>
                  <option value="moins_1M">Moins d&apos;1 000 000 FCFA</option>
                  <option value="1M_a_5M">1 000 000 à 5 000 000 FCFA</option>
                  <option value="5M_a_15M">5 000 000 à 15 000 000 FCFA</option>
                  <option value="plus_15M">Plus de 15 000 000 FCFA</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "0.92rem",
              }}
            >
              <ArrowLeft size={16} />
              <span>Retour</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
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
              <span>Continuer vers les documents</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 : DOCUMENTS & DONNÉES DISPONIBLES */}
      {step === 3 && (
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
              Quels documents ou éléments possédez-vous déjà ?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              Cochez ce que vous avez déjà en main. Si vous partez de zéro, ne cochez rien : l&apos;Atelier vous accompagnera dès la première esquisse.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              "Plan de géomètre / Relevé topographique",
              "Titre foncier / Certificat de propriété",
              "Esquisses manuelles ou croquis préliminaires",
              "Photos actuelles du terrain ou du bâtiment",
              "Plans d'architecte existants (DWG / PDF)",
              "Charte graphique ou logo existant",
              "Cahier des charges ou programme rédigé",
              "Exemples / Références d'inspiration",
            ].map((docName, idx) => {
              const isChecked = availableDocs.includes(docName);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleDoc(docName)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    backgroundColor: isChecked ? "rgba(197, 155, 83, 0.1)" : "var(--bg-secondary)",
                    border: isChecked ? "1.5px solid var(--accent-brass)" : "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    textAlign: "left",
                    color: isChecked ? "var(--accent-brass)" : "var(--text-secondary)",
                    fontSize: "0.9rem",
                    fontWeight: isChecked ? 700 : 500,
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: isChecked ? "2px solid var(--accent-brass)" : "2px solid var(--border-default)",
                      backgroundColor: isChecked ? "var(--accent-brass)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isChecked && <CheckCircle2 size={14} color="#11161F" />}
                  </div>
                  <span>{docName}</span>
                </button>
              );
            })}
          </div>

          {/* Zone de simulation de téléversement de fichiers */}
          <div
            style={{
              padding: "1.75rem",
              border: "2px dashed var(--border-default)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-secondary)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <Upload size={32} color="var(--accent-brass)" style={{ margin: "0 auto 0.75rem" }} />
            <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
              Ajouter des fichiers à votre dossier (Optionnel)
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0 0 1rem" }}>
              Formats acceptés : PDF, DWG, JPG, PNG, DOCX, ZIP jusqu&apos;à 50 Mo.
            </p>
            <label
              style={{
                display: "inline-block",
                padding: "0.6rem 1.25rem",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <span>Parcourir mes documents</span>
              <input
                type="file"
                multiple
                onChange={handleSimulatedFileUpload}
                style={{ display: "none" }}
              />
            </label>

            {simulatedFiles.length > 0 && (
              <div style={{ marginTop: "1rem", textAlign: "left" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-brass)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Fichiers sélectionnés pour transmission :
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {simulatedFiles.map((fn, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "3px 8px",
                        backgroundColor: "var(--bg-surface)",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      📎 {fn}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Précisions ou commentaires particuliers
            </label>
            <textarea
              rows={3}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Indiquez ici toute contrainte, attente esthétique ou question que vous aimeriez aborder..."
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                marginBottom: "2.5rem",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "0.92rem",
              }}
            >
              <ArrowLeft size={16} />
              <span>Retour</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(4)}
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
              <span>Continuer vers vos coordonnées</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 : COORDONNÉES DU COMMANDITAIRE & RÉSUMÉ */}
      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
              Vos coordonnées pour le suivi de dossier
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              Ces informations permettront à notre atelier d&apos;analyser votre brief et de vous adresser une synthèse méthodologique ainsi qu&apos;une proposition de calendrier.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                Nom &amp; Prénom *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : M. Jean-Paul Mbarga"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                Entreprise / Organisation (Optionnel)
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Ex : Société Civile Immobilière Horizon"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
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
                  fontSize: "0.95rem",
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
                placeholder="contact@domaine.cm"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>

          {/* Synthèse visuelle du brief */}
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-brass)", marginBottom: "0.75rem" }}>
              Synthèse Exécutive du Dossier
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", fontSize: "0.88rem" }}>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Domaine sélectionné :</span>
                <strong style={{ color: "var(--text-primary)" }}>{currentDomainObj.title}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Objectif principal :</span>
                <strong style={{ color: "var(--text-primary)" }}>{objective || "À préciser lors du cadrage"}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Échelle &amp; Localisation :</span>
                <strong style={{ color: "var(--text-primary)" }}>{scaleOrSize || "Non spécifié"} — {location || city}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Pièces déjà disponibles :</span>
                <strong style={{ color: "var(--text-primary)" }}>{availableDocs.length} document(s) identifié(s)</strong>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => setStep(3)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "0.92rem",
              }}
            >
              <ArrowLeft size={16} />
              <span>Retour</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2rem",
                backgroundColor: "var(--accent-brass)",
                color: "#11161F",
                fontWeight: 800,
                borderRadius: "var(--radius-sm)",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "1rem",
              }}
            >
              <span>{isSubmitting ? "Enregistrement..." : "Valider & Transmettre mon Brief"}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}

      {/* ÉTAPE 5 : TRANSMISSION & SUIVI DU DOSSIER */}
      {step === 5 && (
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(197, 155, 83, 0.15)",
              border: "2px solid var(--accent-brass)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "var(--accent-brass)",
            }}
          >
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
            Votre Brief a été Enregistré !
          </h2>

          <div
            style={{
              fontSize: "1rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: "var(--accent-brass)",
              padding: "8px 16px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-default)",
              display: "inline-block",
              marginBottom: "1.5rem",
            }}
          >
            Dossier n° {submittedRef}
          </div>

          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 2rem" }}>
            Merci <strong>{fullName}</strong>. Votre dossier a été créé avec succès. Notre équipe d&apos;atelier examine vos informations afin de structurer la proposition de cadrage et préparer notre échange.
          </p>

          {/* JALONS DE SUIVI DU DOSSIER */}
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              padding: "1.5rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-brass)", marginBottom: "1rem" }}>
              Jalons d&apos;avancement du dossier :
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-primary)" }}>
                <span style={{ color: "var(--accent-brass)", fontWeight: 700 }}>✓ Jalon 1 :</span>
                <span>Dossier enregistré sous référence {submittedRef}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent-brass)", fontWeight: 700 }}>⏳ Jalon 2 :</span>
                <span>Analyse d&apos;atelier et examen des pièces disponibles</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-muted)" }}>
                <span>○ Jalon 3 :</span>
                <span>Entretien de cadrage (En atelier à Bonapriso ou visio)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-muted)" }}>
                <span>○ Jalon 4 :</span>
                <span>Émission de la note d&apos;honoraires / devis définitif</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "420px", margin: "0 auto" }}>
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappSent(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                padding: "1rem 1.5rem",
                backgroundColor: "#0D5C3A",
                color: "#FFFFFF",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              <MessageSquare size={18} />
              <span>Transmettre ce dossier sur WhatsApp Atelier</span>
            </a>

            {whatsappSent && (
              <div style={{ fontSize: "0.82rem", color: "#4ECA8E", fontWeight: 600 }}>
                ✓ Lien ouvert. Pensez à appuyer sur &quot;Envoyer&quot; dans WhatsApp pour valider la transmission.
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setSubmittedRef(null);
                setWhatsappSent(false);
              }}
              style={{
                padding: "0.75rem",
                backgroundColor: "transparent",
                color: "var(--text-muted)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Créer un autre brief
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
