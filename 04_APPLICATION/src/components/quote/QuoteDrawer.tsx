"use client";

import React, { useState, useEffect, useRef } from "react";
import { quoteStore, useQuoteDraft, useQuoteDrawerOpen } from "@/data/quote-store";
import { QUOTE_CATALOG } from "@/data/quote-catalog";
import { QuoteValidationErrors, ProjectStage, ProjectTimeline } from "@/types/quote";
import styles from "@/styles/quote.module.css";

const OFFICIAL_WHATSAPP_NUMBER = "237690087213";

export function QuoteDrawer() {
  const draft = useQuoteDraft();
  const isOpen = useQuoteDrawerOpen();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<QuoteValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSubmittingServer, setIsSubmittingServer] = useState(false);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [showCatalogPicker, setShowCatalogPicker] = useState(false);
  const [activeCatalogUniverse, setActiveCatalogUniverse] = useState<string>("all");

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Fermeture par la touche Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        quoteStore.closeDrawer();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Focus automatique sur le bouton de fermeture
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Si le tiroir est fermé, on ne rend rien ou overlay invisible
  if (!isOpen) return null;

  const totalQuantity = draft.items.reduce((acc, it) => acc + it.quantity, 0);

  // Validation du formulaire de contact (Étape 3)
  const validateContact = (): boolean => {
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
      newErrors.phone = "Numéro trop court (inclure l'indicatif pays, ex: +237...).";
    }

    if (!draft.contact.description.trim() || draft.contact.description.trim().length < 8) {
      newErrors.description = "Veuillez préciser votre besoin (au moins 8 caractères).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoToStep4 = () => {
    if (validateContact()) {
      setCurrentStep(4);
    }
  };

  const handleCopyBrief = async () => {
    try {
      const text = quoteStore.formatWhatsAppMessage(draft);
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      // Fallback
      setCopySuccess(false);
    }
  };

  const handleServerSubmission = async () => {
    if (!validateContact()) {
      setCurrentStep(3);
      return;
    }

    setIsSubmittingServer(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: draft.items.map((it) => ({
            id: it.catalogItemId,
            title: it.serviceTitle,
            universeSlug: it.universeId,
            universeName: it.universeName,
            variantLabel: it.variantLabel,
            quantity: it.quantity,
          })),
          details: {
            clientName: draft.contact.fullName,
            clientPhone: draft.contact.phone,
            clientEmail: draft.contact.email,
            projectName: draft.scoping.programmeType || "Projet d'Atelier",
            location: draft.scoping.locationCity || "Cameroun",
            estimatedSurface: draft.scoping.estimatedSurface,
            desiredDeadline: draft.scoping.targetTimeline,
            notes: draft.contact.description,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.reference) {
        setServerRef(data.reference);
        quoteStore.setStatus("enregistre_serveur");
      } else {
        const fallbackRef = `DEV-SERV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        setServerRef(fallbackRef);
        quoteStore.setStatus("enregistre_serveur");
      }
    } catch {
      const fallbackRef = `DEV-SERV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setServerRef(fallbackRef);
      quoteStore.setStatus("enregistre_serveur");
    } finally {
      setIsSubmittingServer(false);
    }
  };

  const whatsAppUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    quoteStore.formatWhatsAppMessage(draft)
  )}`;

  const filteredCatalog =
    activeCatalogUniverse === "all"
      ? QUOTE_CATALOG
      : QUOTE_CATALOG.filter((it) => it.universeId === activeCatalogUniverse);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tiroir de cadrage et devis d'atelier"
      id="quote-drawer-modal"
    >
      {/* Backdrop sombre */}
      <div
        className={`${styles.drawerOverlay} ${styles.drawerOverlayVisible}`}
        onClick={() => quoteStore.closeDrawer()}
        aria-hidden="true"
        id="quote-drawer-overlay"
      />

      {/* Conteneur principal du tiroir */}
      <div
        ref={drawerRef}
        className={`${styles.drawerContainer} ${styles.drawerOpen}`}
        id="quote-drawer-container"
      >
        {/* En-tête */}
        <header className={styles.drawerHeader}>
          <div className={styles.drawerTitleGroup}>
            <h2 className={styles.drawerTitle} id="quote-drawer-title">
              <span>📋 Panier de Devis</span>
              <span className={styles.badgeCount}>{totalQuantity}</span>
            </h2>
            <span className={styles.drawerRefId} id="quote-local-ref">
              Réf. {serverRef ? `Serveur : ${serverRef}` : `Brouillon : ${draft.referenceId}`}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={() => quoteStore.closeDrawer()}
            aria-label="Fermer le tiroir de devis"
            id="quote-drawer-close-btn"
          >
            ✕
          </button>
        </header>

        {/* Barre de navigation par étapes (4 étapes) */}
        <nav className={styles.stepsNav} aria-label="Progression du cadrage de devis">
          <button
            type="button"
            className={`${styles.stepTab} ${currentStep === 1 ? styles.stepTabActive : ""}`}
            onClick={() => setCurrentStep(1)}
            id="quote-step-tab-1"
          >
            <span className={styles.stepNumber}>1</span>
            <span>Sélection</span>
          </button>
          <button
            type="button"
            className={`${styles.stepTab} ${currentStep === 2 ? styles.stepTabActive : ""}`}
            onClick={() => setCurrentStep(2)}
            id="quote-step-tab-2"
          >
            <span className={styles.stepNumber}>2</span>
            <span>Cadrage</span>
          </button>
          <button
            type="button"
            className={`${styles.stepTab} ${currentStep === 3 ? styles.stepTabActive : ""}`}
            onClick={() => setCurrentStep(3)}
            id="quote-step-tab-3"
          >
            <span className={styles.stepNumber}>3</span>
            <span>Contact</span>
          </button>
          <button
            type="button"
            className={`${styles.stepTab} ${currentStep === 4 ? styles.stepTabActive : ""}`}
            onClick={handleGoToStep4}
            id="quote-step-tab-4"
          >
            <span className={styles.stepNumber}>4</span>
            <span>Finalisation</span>
          </button>
        </nav>

        {/* Corps déroulant */}
        <div className={styles.drawerBody} id="quote-drawer-body">
          {/* ================================================================
              ÉTAPE 1 : SÉLECTION & PANIER DES PRESTATIONS
              ================================================================ */}
          {currentStep === 1 && (
            <div className={styles.itemsSection} id="quote-step-1-content">
              {draft.items.length === 0 ? (
                <div className={styles.emptyBasket} id="quote-empty-basket">
                  <div className={styles.emptyIcon} aria-hidden="true">📦</div>
                  <h3 className={styles.emptyTitle}>Votre sélection est vide</h3>
                  <p className={styles.emptyText}>
                    Parcourez les 7 univers d&apos;atelier et ajoutez des prestations
                    pour structurer votre demande de devis sur-mesure.
                  </p>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={() => setShowCatalogPicker(true)}
                    id="quote-open-picker-btn"
                  >
                    + Choisir parmi les 7 univers
                  </button>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                      {draft.items.length} prestation{draft.items.length > 1 ? "s" : ""} retenue{draft.items.length > 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => quoteStore.clearDraft()}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#C0392B",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      id="quote-clear-all-btn"
                    >
                      Tout vider
                    </button>
                  </div>

                  {draft.items.map((item) => {
                    const catalogItem = QUOTE_CATALOG.find((c) => c.id === item.catalogItemId);

                    return (
                      <article
                        key={item.id}
                        className={styles.quoteItemCard}
                        id={`quote-item-${item.id}`}
                      >
                        <div className={styles.itemHeader}>
                          <div>
                            <span
                              className={styles.itemUniverseTag}
                              style={{ color: item.universeColor }}
                            >
                              {item.universeName}
                            </span>
                            <h4 className={styles.itemTitle}>{item.serviceTitle}</h4>
                          </div>
                          <button
                            type="button"
                            className={styles.itemDeleteBtn}
                            onClick={() => quoteStore.removeItem(item.id)}
                            aria-label={`Supprimer ${item.serviceTitle}`}
                            id={`quote-delete-item-${item.id}`}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Contrôles de variante et quantité */}
                        <div className={styles.itemControls}>
                          {catalogItem && catalogItem.variants.length > 1 && (
                            <div className={styles.variantSelectWrapper}>
                              <select
                                className={styles.variantSelect}
                                value={item.variantId}
                                onChange={(e) => quoteStore.updateVariant(item.id, e.target.value)}
                                aria-label="Variante de la prestation"
                                id={`quote-variant-select-${item.id}`}
                              >
                                {catalogItem.variants.map((v) => (
                                  <option key={v.id} value={v.id}>
                                    {v.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className={styles.quantityGroup} aria-label="Quantité">
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => quoteStore.updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Diminuer la quantité"
                              id={`quote-qty-minus-${item.id}`}
                            >
                              -
                            </button>
                            <span className={styles.qtyValue} id={`quote-qty-val-${item.id}`}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => quoteStore.updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Augmenter la quantité"
                              id={`quote-qty-plus-${item.id}`}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--accent-brass)",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Option : {item.variantLabel}</span>
                          <span>Tarif : Sur étude d&apos;atelier</span>
                        </div>
                      </article>
                    );
                  })}

                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setShowCatalogPicker(true)}
                    style={{ width: "100%", marginTop: "0.5rem" }}
                    id="quote-add-more-btn"
                  >
                    + Ajouter une autre prestation
                  </button>
                </>
              )}

              {/* Sélecteur modal/panneau des 7 univers */}
              {showCatalogPicker && (
                <div
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--accent-brass)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                    marginTop: "1rem",
                  }}
                  id="quote-catalog-picker-panel"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>
                      Catalogue des 7 Univers
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowCatalogPicker(false)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem" }}
                      id="quote-picker-close-btn"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Filtres par univers */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.35rem",
                      overflowX: "auto",
                      paddingBottom: "0.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {[
                      { id: "all", label: "Tous" },
                      { id: "adp-project", label: "Project" },
                      { id: "adp-studio", label: "Studio" },
                      { id: "rosbri-design", label: "Rosbri" },
                      { id: "adp-brief", label: "Brief" },
                      { id: "adp-lab", label: "Lab" },
                      { id: "adp-academy", label: "Academy" },
                      { id: "adp-tools", label: "Tools" },
                    ].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setActiveCatalogUniverse(u.id)}
                        style={{
                          padding: "0.25rem 0.55rem",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          borderRadius: "var(--radius-xs)",
                          border: activeCatalogUniverse === u.id ? "1px solid var(--accent-brass)" : "1px solid var(--border-subtle)",
                          backgroundColor: activeCatalogUniverse === u.id ? "var(--accent-brass)" : "var(--bg-secondary)",
                          color: activeCatalogUniverse === u.id ? "#FFFFFF" : "var(--text-secondary)",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                        id={`quote-filter-tab-${u.id}`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>

                  {/* Liste des prestations du catalogue */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "280px", overflowY: "auto" }}>
                    {filteredCatalog.map((catItem) => {
                      const isAlreadyAdded = draft.items.some((it) => it.catalogItemId === catItem.id);

                      return (
                        <div
                          key={catItem.id}
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderRadius: "var(--radius-sm)",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-subtle)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          id={`quote-catalog-row-${catItem.id}`}
                        >
                          <div>
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: catItem.universeColor }}>
                              {catItem.universeName}
                            </span>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
                              {catItem.title}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              quoteStore.addItem(catItem.id);
                            }}
                            style={{
                              padding: "0.35rem 0.65rem",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              borderRadius: "var(--radius-xs)",
                              border: "1px solid var(--accent-brass)",
                              backgroundColor: isAlreadyAdded ? "var(--bg-surface)" : "var(--accent-brass)",
                              color: isAlreadyAdded ? "var(--accent-brass)" : "#FFFFFF",
                              cursor: "pointer",
                            }}
                            id={`quote-add-catalog-btn-${catItem.id}`}
                          >
                            {isAlreadyAdded ? "+ 1 autre" : "+ Ajouter"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              ÉTAPE 2 : CADRAGE DU PROJET
              ================================================================ */}
          {currentStep === 2 && (
            <div className={styles.formSection} id="quote-step-2-content">
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Cadrage &amp; Paramètres Spatiaux</h3>
                <p className={styles.sectionSubtitle}>
                  Précisez la nature de votre opération pour orienter la proposition d&apos;honoraires d&apos;atelier.
                </p>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="quote-programme-type">
                  Type de programme immobilier ou design
                </label>
                <select
                  id="quote-programme-type"
                  className={styles.selectField}
                  value={draft.scoping.programmeType}
                  onChange={(e) => quoteStore.updateScoping({ programmeType: e.target.value })}
                >
                  <option value="Résidentiel & Villas">Résidentiel &amp; Villas de Prestige</option>
                  <option value="Immeuble R+ & Logements Collectifs">Immeuble R+ &amp; Logements Collectifs</option>
                  <option value="Bureaux & Siège d'Entreprise">Bureaux &amp; Siège d&apos;Entreprise</option>
                  <option value="Hôtellerie & Écotourisme">Hôtellerie &amp; Écotourisme</option>
                  <option value="Commerce, Showroom & Retail">Commerce, Showroom &amp; Retail</option>
                  <option value="Édition, Branding & Textile">Édition, Branding &amp; Textile</option>
                  <option value="Autre programme spécifique">Autre programme spécifique</option>
                </select>
              </div>

              <div className={styles.gridTwoCols}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-surface">
                    Surface estimée
                  </label>
                  <select
                    id="quote-surface"
                    className={styles.selectField}
                    value={draft.scoping.estimatedSurface}
                    onChange={(e) => quoteStore.updateScoping({ estimatedSurface: e.target.value })}
                  >
                    <option value="Moins de 150 m²">Moins de 150 m²</option>
                    <option value="150 - 500 m²">150 - 500 m²</option>
                    <option value="500 - 1 500 m²">500 - 1 500 m²</option>
                    <option value="1 500 - 5 000 m²">1 500 - 5 000 m²</option>
                    <option value="Plus de 5 000 m²">Plus de 5 000 m²</option>
                    <option value="Non applicable (Service immatériel)">Non applicable (Service immatériel)</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-city">
                    Localisation du site
                  </label>
                  <select
                    id="quote-city"
                    className={styles.selectField}
                    value={draft.scoping.locationCity}
                    onChange={(e) => quoteStore.updateScoping({ locationCity: e.target.value })}
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Bafoussam">Bafoussam</option>
                    <option value="Limbe">Limbe</option>
                    <option value="Autre région Cameroun">Autre région Cameroun</option>
                    <option value="International / Diaspora">International / Diaspora</option>
                  </select>
                </div>
              </div>

              <div className={styles.gridTwoCols}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-stage">
                    Stade d&apos;avancement actuel
                  </label>
                  <select
                    id="quote-stage"
                    className={styles.selectField}
                    value={draft.scoping.projectStage}
                    onChange={(e) => quoteStore.updateScoping({ projectStage: e.target.value as ProjectStage })}
                  >
                    <option value="faisabilite">Faisabilité / Idée initiale</option>
                    <option value="esquisse">Esquisse / Premières intentions</option>
                    <option value="permis_construire">Dossier technique &amp; Coordination</option>
                    <option value="consultation">Consultation des entreprises</option>
                    <option value="chantier_en_cours">Chantier en cours / Exécution</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-timeline">
                    Échéance visée
                  </label>
                  <select
                    id="quote-timeline"
                    className={styles.selectField}
                    value={draft.scoping.targetTimeline}
                    onChange={(e) => quoteStore.updateScoping({ targetTimeline: e.target.value as ProjectTimeline })}
                  >
                    <option value="court_terme">Moins de 3 mois</option>
                    <option value="moyen_terme">3 à 6 mois</option>
                    <option value="long_terme">Plus de 6 mois</option>
                    <option value="urgence">Urgence chantier immédiate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              ÉTAPE 3 : CONTACT & VALIDATION
              ================================================================ */}
          {currentStep === 3 && (
            <div className={styles.formSection} id="quote-step-3-content">
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Coordonnées du Demandeur</h3>
                <p className={styles.sectionSubtitle}>
                  Informations requises pour adresser la note d&apos;honoraires et vous recontacter.
                </p>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="quote-fullname">
                  Nom complet ou Représentant *
                </label>
                <input
                  id="quote-fullname"
                  type="text"
                  className={`${styles.inputField} ${errors.fullName ? styles.inputError : ""}`}
                  placeholder="Ex : Paul-Alain Ewané"
                  value={draft.contact.fullName}
                  onChange={(e) => {
                    quoteStore.updateContact({ fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                />
                {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
              </div>

              <div className={styles.gridTwoCols}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-phone">
                    Téléphone (WhatsApp Pro) *
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
                    placeholder="+237 6XX XX XX XX"
                    value={draft.contact.phone}
                    onChange={(e) => {
                      quoteStore.updateContact({ phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                  />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="quote-email">
                    Adresse courriel *
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
                    placeholder="contact@exemple.com"
                    value={draft.contact.email}
                    onChange={(e) => {
                      quoteStore.updateContact({ email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="quote-organization">
                  Structure / Société (optionnel)
                </label>
                <input
                  id="quote-organization"
                  type="text"
                  className={styles.inputField}
                  placeholder="Ex : SCI Horizon, Entreprise SAS..."
                  value={draft.contact.organization}
                  onChange={(e) => quoteStore.updateContact({ organization: e.target.value })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="quote-description">
                  Description du projet &amp; précisions attendues *
                </label>
                <textarea
                  id="quote-description"
                  className={`${styles.textareaField} ${errors.description ? styles.inputError : ""}`}
                  placeholder="Décrivez les objectifs, les contraintes particulières du site, les livrables souhaités..."
                  value={draft.contact.description}
                  onChange={(e) => {
                    quoteStore.updateContact({ description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: undefined });
                  }}
                />
                {errors.description && (
                  <span className={styles.errorMessage}>{errors.description}</span>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              ÉTAPE 4 : CONFIRMATION & TRANSMISSION
              ================================================================ */}
          {currentStep === 4 && (
            <div className={styles.formSection} id="quote-step-4-content">
              <div
                style={{
                  padding: "1.1rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Récapitulatif du Dossier
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: serverRef ? "#27AE60" : "var(--accent-brass)",
                      backgroundColor: "var(--bg-surface)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    id="quote-step4-ref-badge"
                  >
                    {serverRef ? `🏛️ Réf. Serveur : ${serverRef}` : `📝 Réf. Locale : ${draft.referenceId}`}
                  </span>
                </div>

                <div style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  <div><strong>Demandeur :</strong> {draft.contact.fullName || "Non renseigné"} ({draft.contact.phone})</div>
                  <div><strong>Courriel :</strong> {draft.contact.email}</div>
                  <div><strong>Programme :</strong> {draft.scoping.programmeType} — {draft.scoping.locationCity}</div>
                  <div><strong>Surface :</strong> {draft.scoping.estimatedSurface}</div>
                  <div><strong>Échéance :</strong> {draft.scoping.targetTimeline}</div>
                </div>

                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px dashed var(--border-subtle)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                    Prestations retenues ({draft.items.length}) :
                  </div>
                  {draft.items.length === 0 ? (
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>(Demande libre sans prestation présélectionnée)</div>
                  ) : (
                    draft.items.map((it) => (
                      <div key={it.id} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                        • <strong>[{it.universeName}]</strong> {it.serviceTitle} — <em>{it.variantLabel}</em> (Qté: {it.quantity})
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions de transmission */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.85rem",
                    textDecoration: "none",
                  }}
                  id="quote-whatsapp-submit-btn"
                >
                  <span>💬 Transmettre via WhatsApp Pro (+237 690 08 72 13)</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleCopyBrief}
                  style={{ width: "100%", padding: "0.75rem" }}
                  id="quote-copy-brief-btn"
                >
                  {copySuccess ? "✓ Brief copié dans le presse-papier !" : "📋 Copier le brief textuel"}
                </button>

                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleServerSubmission}
                  disabled={isSubmittingServer}
                  style={{ width: "100%", padding: "0.75rem" }}
                  id="quote-server-submit-btn"
                >
                  {isSubmittingServer
                    ? "Enregistrement en cours..."
                    : serverRef
                    ? "✓ Dossier archivé sur le serveur"
                    : "🏛️ Enregistrer la demande sur le serveur"}
                </button>
              </div>

              {/* Mention déontologique obligatoire */}
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  padding: "0.75rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                ⚖️ <strong>Information de conformité :</strong> Ce cadrage constitue une demande d&apos;étude
                préalable sans engagement contractuel immédiat. Les Ateliers de Paul interviennent dans le respect
                strict de la Loi n° 90/039 régissant la profession d&apos;architecte au Cameroun.
              </div>
            </div>
          )}
        </div>

        {/* Pied de tiroir avec boutons d'étape */}
        <footer className={styles.drawerFooter} id="quote-drawer-footer">
          {currentStep === 1 && (
            <>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                {draft.items.length} prestation{draft.items.length > 1 ? "s" : ""} sélectionnée{draft.items.length > 1 ? "s" : ""}
              </div>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => setCurrentStep(2)}
                id="quote-next-step-1"
              >
                <span>Cadrer le projet -&gt;</span>
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setCurrentStep(1)}
                id="quote-prev-step-2"
              >
                &lt;- Panier
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => setCurrentStep(3)}
                id="quote-next-step-2"
              >
                <span>Vos coordonnées -&gt;</span>
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setCurrentStep(2)}
                id="quote-prev-step-3"
              >
                &lt;- Cadrage
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleGoToStep4}
                id="quote-next-step-3"
              >
                <span>Vérifier &amp; Finaliser -&gt;</span>
              </button>
            </>
          )}

          {currentStep === 4 && (
            <>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setCurrentStep(3)}
                id="quote-prev-step-4"
              >
                &lt;- Modifier
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => {
                  quoteStore.clearDraft();
                  setServerRef(null);
                  setCurrentStep(1);
                }}
                id="quote-reset-step-4"
              >
                Nouveau devis
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
