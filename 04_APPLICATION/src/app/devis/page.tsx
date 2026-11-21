"use client";

import React, { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AddPrestationButton } from "@/components/quote/AddPrestationButton";
import { useQuoteDraft, quoteStore } from "@/data/quote-store";
import { QUOTE_CATALOG } from "@/data/quote-catalog";
import { UNIVERSES } from "@/data/universes";
import { QuoteValidationErrors, ProjectStage, ProjectTimeline } from "@/types/quote";
import styles from "@/styles/quote.module.css";

const OFFICIAL_WHATSAPP_NUMBER = "237690087213";

export default function DevisPage() {
  const draft = useQuoteDraft();
  const [selectedUniverseId, setSelectedUniverseId] = useState<string>("all");
  const [errors, setErrors] = useState<QuoteValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  // Filtrage du catalogue selon l'univers sélectionné
  const filteredCatalog =
    selectedUniverseId === "all"
      ? QUOTE_CATALOG
      : QUOTE_CATALOG.filter((it) => it.universeId === selectedUniverseId);

  const totalQuantity = draft.items.reduce((acc, it) => acc + it.quantity, 0);

  // Validation du formulaire de contact
  const validateForm = (): boolean => {
    const newErrors: QuoteValidationErrors = {};

    if (!draft.contact.fullName.trim()) {
      newErrors.fullName = "Veuillez renseigner votre nom complet.";
    }

    if (!draft.contact.email.trim()) {
      newErrors.email = "Veuillez renseigner une adresse courriel valide.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.contact.email)) {
      newErrors.email = "Format de courriel invalide (ex: nom@domaine.com).";
    }

    if (!draft.contact.phone.trim()) {
      newErrors.phone = "Veuillez renseigner votre numéro de téléphone / WhatsApp.";
    } else if (draft.contact.phone.replace(/[^0-9]/g, "").length < 8) {
      newErrors.phone = "Le numéro semble trop court (inclure l'indicatif, ex: +237...).";
    }

    if (!draft.contact.description.trim() || draft.contact.description.trim().length < 10) {
      newErrors.description = "Veuillez décrire votre projet (au moins 10 caractères).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyBrief = async () => {
    try {
      const text = quoteStore.formatWhatsAppMessage(draft);
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.warn("Échec de copie:", err);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!validateForm()) {
      const el = document.getElementById("contact-form-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const text = quoteStore.formatWhatsAppMessage(draft);
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encoded}`;

    quoteStore.setStatus("ouverture_whatsapp_proposee");
    setWhatsappOpened(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SiteHeader />

      <main className={styles.quotePageContainer}>
        <div className={styles.quotePageInner}>
          {/* En-tête éditorial */}
          <section className={styles.quotePageHero}>
            <span
              style={{
                fontSize: "var(--text-xs, 0.75rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent-brass, #C59B53)",
                fontWeight: 700,
              }}
            >
              ✦ Cadrage &amp; Devis d&apos;Atelier
            </span>
            <h1 className={styles.quotePageTitle}>
              Composez votre Devis sur-mesure
            </h1>
            <p className={styles.quotePageSubtitle}>
              Sélectionnez vos prestations d&apos;ingénierie, de design ou de métrés parmi les Sept Univers.
              Ajustez vos options et transmettez votre brief d&apos;atelier directement à Paul Boubert.
            </p>
          </section>

          {/* Disposition en 2 colonnes : Catalogue à gauche, Synthèse et Cadrage à droite */}
          <div className={styles.quoteTwoColumnsLayout}>
            {/* =============================================================
                COLONNE GAUCHE : EXPLORATEUR DE PRESTATIONS
                ============================================================= */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Filtres par Univers */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  padding: "0.5rem",
                  background: "var(--bg-secondary, #F0EFEA)",
                  borderRadius: "var(--radius-md, 10px)",
                }}
                role="group"
                aria-label="Filtrer les prestations par univers"
              >
                <button
                  type="button"
                  onClick={() => setSelectedUniverseId("all")}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "var(--radius-sm, 6px)",
                    border: "none",
                    background: selectedUniverseId === "all" ? "var(--bg-surface, #FFFFFF)" : "transparent",
                    color: selectedUniverseId === "all" ? "var(--accent-brass, #C59B53)" : "var(--text-secondary, #4A5568)",
                    fontWeight: selectedUniverseId === "all" ? 600 : 500,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    boxShadow: selectedUniverseId === "all" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  Tous les Univers ({QUOTE_CATALOG.length})
                </button>

                {UNIVERSES.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setSelectedUniverseId(u.id)}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: "var(--radius-sm, 6px)",
                      border: "none",
                      background: selectedUniverseId === u.id ? "var(--bg-surface, #FFFFFF)" : "transparent",
                      color: selectedUniverseId === u.id ? "var(--accent-brass, #C59B53)" : "var(--text-secondary, #4A5568)",
                      fontWeight: selectedUniverseId === u.id ? 600 : 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      boxShadow: selectedUniverseId === u.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <span style={{ color: u.accentColor, marginRight: "0.3rem" }}>●</span>
                    {u.name}
                  </button>
                ))}
              </div>

              {/* Grille des cartes prestations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {filteredCatalog.map((item) => {
                  return (
                    <article
                      key={item.id}
                      style={{
                        background: "var(--bg-surface, #FFFFFF)",
                        border: "1px solid var(--border-subtle, #E4E1D8)",
                        borderRadius: "var(--radius-md, 10px)",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04))",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--text-secondary, #4A5568)",
                              background: "var(--bg-secondary, #F0EFEA)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-xs, 3px)",
                              marginBottom: "0.35rem",
                            }}
                          >
                            <span style={{ color: item.universeColor }}>●</span>
                            {item.universeName} · {item.category}
                          </span>
                          <h2
                            style={{
                              fontFamily: "var(--font-primary, inherit)",
                              fontSize: "1.05rem",
                              fontWeight: 600,
                              color: "var(--text-primary, #1A222D)",
                              margin: 0,
                            }}
                          >
                            {item.title}
                          </h2>
                        </div>

                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontStyle: "italic",
                            color: "var(--text-muted, #7E8B9B)",
                            whiteSpace: "nowrap",
                            background: "var(--bg-primary, #F9F8F5)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "var(--radius-xs, 3px)",
                          }}
                        >
                          {item.pricingNotice}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary, #4A5568)",
                          margin: 0,
                          lineHeight: 1.45,
                        }}
                      >
                        {item.shortDescription}
                      </p>

                      {/* Variantes et bouton d'action */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "0.75rem",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid var(--bg-secondary, #F0EFEA)",
                        }}
                      >
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {item.variants.map((v) => (
                            <span
                              key={v.id}
                              style={{
                                fontSize: "0.72rem",
                                padding: "0.2rem 0.45rem",
                                background: "var(--bg-primary, #F9F8F5)",
                                border: "1px solid var(--border-subtle, #E4E1D8)",
                                borderRadius: "var(--radius-xs, 3px)",
                                color: "var(--text-secondary, #4A5568)",
                              }}
                            >
                              {v.badge ? `[${v.badge}] ` : ""}
                              {v.label}
                            </span>
                          ))}
                        </div>

                        <AddPrestationButton catalogItemId={item.id} autoOpenDrawer={false} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* =============================================================
                COLONNE DROITE : SYNTHÈSE, CADRAGE & TRANSMISSION
                ============================================================= */}
            <div
              id="contact-form-anchor"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                position: "sticky",
                top: "6rem",
              }}
            >
              {/* Panier résumé rapide */}
              <div
                style={{
                  background: "var(--bg-surface, #FFFFFF)",
                  border: "1px solid var(--border-subtle, #E4E1D8)",
                  borderRadius: "var(--radius-md, 10px)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-primary, inherit)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary, #1A222D)",
                      margin: 0,
                    }}
                  >
                    Votre Sélection ({totalQuantity} prestation{totalQuantity > 1 ? "s" : ""})
                  </h2>

                  <button
                    type="button"
                    onClick={() => quoteStore.openDrawer()}
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent-brass, #C59B53)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Ouvrir le panneau complet ↗
                  </button>
                </div>

                {draft.items.length === 0 ? (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #7E8B9B)", margin: 0 }}>
                    Aucune prestation sélectionnée pour le moment. Cliquez sur &quot;+ Ajouter au devis&quot; sur les prestations à gauche.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {draft.items.map((it) => (
                      <div
                        key={it.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "0.8rem",
                          padding: "0.4rem 0",
                          borderBottom: "1px solid var(--bg-secondary, #F0EFEA)",
                        }}
                      >
                        <span style={{ fontWeight: 500, color: "var(--text-primary, #1A222D)" }}>
                          {it.quantity}x {it.serviceTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => quoteStore.removeItem(it.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-muted, #7E8B9B)",
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formulaire de Cadrage Rapide */}
              <div
                style={{
                  background: "var(--bg-surface, #FFFFFF)",
                  border: "1px solid var(--border-subtle, #E4E1D8)",
                  borderRadius: "var(--radius-md, 10px)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-primary, inherit)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary, #1A222D)",
                    margin: 0,
                  }}
                >
                  Cadrage du Projet
                </h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="devis-programme" className={styles.inputLabel}>
                    Programme :
                  </label>
                  <select
                    id="devis-programme"
                    className={styles.selectField}
                    value={draft.scoping.programmeType || ""}
                    onChange={(e) => quoteStore.updateScoping({ programmeType: e.target.value })}
                  >
                    <option value="Résidentiel & Villas">Résidentiel & Villas de prestige</option>
                    <option value="Immeuble Tertiaire & Bureaux">Immeuble Tertiaire & Bureaux</option>
                    <option value="Hôtellerie & Restauration">Hôtellerie & Restauration</option>
                    <option value="Équipement Public / Commercial">Équipement Public ou Commercial</option>
                    <option value="Autre programme">Autre besoin d&apos;atelier</option>
                  </select>
                </div>

                <div className={styles.gridTwoCols}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-surface" className={styles.inputLabel}>
                      Surface estimée :
                    </label>
                    <select
                      id="devis-surface"
                      className={styles.selectField}
                      value={draft.scoping.estimatedSurface || ""}
                      onChange={(e) => quoteStore.updateScoping({ estimatedSurface: e.target.value })}
                    >
                      <option value="Moins de 150 m²">&lt; 150 m²</option>
                      <option value="150 - 500 m²">150 à 500 m²</option>
                      <option value="500 - 2 000 m²">500 à 2 000 m²</option>
                      <option value="Plus de 2 000 m²">&gt; 2 000 m²</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-city" className={styles.inputLabel}>
                      Ville / Localisation :
                    </label>
                    <select
                      id="devis-city"
                      className={styles.selectField}
                      value={draft.scoping.locationCity || "Douala"}
                      onChange={(e) => quoteStore.updateScoping({ locationCity: e.target.value })}
                    >
                      <option value="Douala">Douala</option>
                      <option value="Yaoundé">Yaoundé</option>
                      <option value="Kribi">Kribi</option>
                      <option value="Autre">Autre Cameroun</option>
                      <option value="International">International</option>
                    </select>
                  </div>
                </div>

                <div className={styles.gridTwoCols}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-stage" className={styles.inputLabel}>
                      Stade du projet :
                    </label>
                    <select
                      id="devis-stage"
                      className={styles.selectField}
                      value={draft.scoping.projectStage || "faisabilite"}
                      onChange={(e) => quoteStore.updateScoping({ projectStage: e.target.value as ProjectStage })}
                    >
                      <option value="esquisse">Idée / Esquisse</option>
                      <option value="faisabilite">Faisabilité</option>
                      <option value="permis">Permis de construire</option>
                      <option value="execution">Exécution</option>
                      <option value="rehabilitation">Rénovation</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-timeline" className={styles.inputLabel}>
                      Échéance :
                    </label>
                    <select
                      id="devis-timeline"
                      className={styles.selectField}
                      value={draft.scoping.targetTimeline || "court_terme"}
                      onChange={(e) => quoteStore.updateScoping({ targetTimeline: e.target.value as ProjectTimeline })}
                    >
                      <option value="urgent">Urgent (&lt; 1 mois)</option>
                      <option value="court_terme">1 à 3 mois</option>
                      <option value="moyen_terme">3 à 6 mois</option>
                      <option value="exploration">Exploration</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Formulaire de coordonnées */}
              <div
                style={{
                  background: "var(--bg-surface, #FFFFFF)",
                  border: "1px solid var(--border-subtle, #E4E1D8)",
                  borderRadius: "var(--radius-md, 10px)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-primary, inherit)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary, #1A222D)",
                    margin: 0,
                  }}
                >
                  Vos Coordonnées Professionnelles
                </h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="devis-name" className={styles.inputLabel}>
                    Nom &amp; Prénom <span style={{ color: "#C0392B" }}>*</span> :
                  </label>
                  <input
                    id="devis-name"
                    type="text"
                    className={`${styles.inputField} ${errors.fullName ? styles.inputError : ""}`}
                    placeholder="Ex: Paul Mbarga"
                    value={draft.contact.fullName}
                    onChange={(e) => {
                      quoteStore.updateContact({ fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    aria-required="true"
                  />
                  {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                </div>

                <div className={styles.gridTwoCols}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-email" className={styles.inputLabel}>
                      Courriel <span style={{ color: "#C0392B" }}>*</span> :
                    </label>
                    <input
                      id="devis-email"
                      type="email"
                      className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
                      placeholder="contact@domaine.cm"
                      value={draft.contact.email}
                      onChange={(e) => {
                        quoteStore.updateContact({ email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-required="true"
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="devis-phone" className={styles.inputLabel}>
                      Téléphone / WhatsApp <span style={{ color: "#C0392B" }}>*</span> :
                    </label>
                    <input
                      id="devis-phone"
                      type="tel"
                      className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
                      placeholder="+237 6..."
                      value={draft.contact.phone}
                      onChange={(e) => {
                        quoteStore.updateContact({ phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      aria-required="true"
                    />
                    {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="devis-desc" className={styles.inputLabel}>
                    Description du besoin &amp; objectifs <span style={{ color: "#C0392B" }}>*</span> :
                  </label>
                  <textarea
                    id="devis-desc"
                    className={`${styles.textareaField} ${errors.description ? styles.inputError : ""}`}
                    placeholder="Précisez vos objectifs, le site d'implantation et les contraintes techniques particulières..."
                    value={draft.contact.description}
                    onChange={(e) => {
                      quoteStore.updateContact({ description: e.target.value });
                      if (errors.description) setErrors({ ...errors, description: undefined });
                    }}
                    aria-required="true"
                  />
                  {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
                </div>

                {/* AVERTISSEMENT DE RIGUEUR ET TRANSPARENCE ABSOLUE (RÈGLE WHATSAPP) */}
                <div className={styles.transparencyBox} role="alert">
                  <span className={styles.transparencyIcon} aria-hidden="true">
                    ℹ️
                  </span>
                  <div className={styles.transparencyContent}>
                    <p className={styles.transparencyTitle}>Mode Brouillon d&apos;Atelier Local (MVP)</p>
                    <p className={styles.transparencyText}>
                      Vos données sont conservées dans votre navigateur. Aucune base de données distante n&apos;étant
                      reliée à cette version locale, <strong>cette demande n&apos;est pas encore enregistrée sur un serveur</strong>.
                      Pour transmettre ce brief à Paul Boubert, cliquez sur le bouton vert ci-dessous pour ouvrir WhatsApp,
                      puis <strong>appuyez sur le bouton &apos;Envoyer&apos; dans WhatsApp</strong>.
                    </p>
                  </div>
                </div>

                {/* Actions de transmission */}
                <div className={styles.whatsappActionBlock}>
                  <button
                    type="button"
                    className={styles.whatsappSubmitBtn}
                    onClick={handleOpenWhatsApp}
                  >
                    <span aria-hidden="true">💬</span>
                    <span>Transmettre mon brief via WhatsApp Pro ↗</span>
                  </button>

                  <button
                    type="button"
                    className={styles.copyBriefBtn}
                    onClick={handleCopyBrief}
                  >
                    <span aria-hidden="true">📋</span>
                    <span>{copySuccess ? "✓ Brief copié dans le presse-papier !" : "Copier le texte intégral du brief"}</span>
                  </button>

                  {whatsappOpened && (
                    <div
                      style={{
                        padding: "0.75rem",
                        background: "var(--bg-secondary, #F0EFEA)",
                        borderRadius: "var(--radius-sm, 6px)",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary, #4A5568)",
                        textAlign: "center",
                      }}
                    >
                      WhatsApp s&apos;est ouvert. <strong>Pensez à appuyer sur le bouton vert d&apos;envoi dans WhatsApp</strong> pour valider l&apos;expédition.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
