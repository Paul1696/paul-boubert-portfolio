"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  X, 
  Trash2, 
  Copy, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  User, 
  FileCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { 
  useCartDraft, 
  useCartDrawerOpen, 
  cartStore 
} from "@/data/cart-store";
import { 
  DELIVERY_FEES_XAF, 
  DELIVERY_LABELS 
} from "@/data/pricing-catalog";
import { 
  calculateCartSummary, 
  formatCurrency 
} from "@/lib/pricing-engine";
import { OrderDeliveryMode } from "@/types/cart";
import styles from "@/styles/quote.module.css";

const OFFICIAL_WHATSAPP_NUMBER = "237690087213";

export function CartDrawer() {
  const draft = useCartDraft();
  const isOpen = useCartDrawerOpen();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [currency, setCurrency] = useState<"XAF" | "EUR" | "USD">("XAF");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrderRef, setSubmittedOrderRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Formulaire client
  const [formName, setFormName] = useState(draft.customer.fullName || "");
  const [formOrg, setFormOrg] = useState(draft.customer.organization || "");
  const [formPhone, setFormPhone] = useState(draft.customer.phone || "");
  const [formEmail, setFormEmail] = useState(draft.customer.email || "");
  const [formCity, setFormCity] = useState(draft.customer.city || "Douala");
  const [formAddress, setFormAddress] = useState(draft.customer.deliveryAddress || "");
  const [formDeliveryMode, setFormDeliveryMode] = useState<OrderDeliveryMode>(draft.deliveryMode || "atelier_pickup");

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        cartStore.closeDrawer();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const summary = calculateCartSummary(draft.items, formDeliveryMode, currency);

  const handleNextToStep2 = () => {
    if (draft.items.length === 0) return;
    setCurrentStep(2);
  };

  const handleNextToStep3 = () => {
    if (!formName.trim()) {
      setErrorMessage("Veuillez renseigner votre nom complet.");
      return;
    }
    if (!formPhone.trim() || formPhone.replace(/[^0-9]/g, "").length < 8) {
      setErrorMessage("Veuillez renseigner un numéro de téléphone/WhatsApp valide (au moins 8 chiffres).");
      return;
    }
    setErrorMessage(null);
    cartStore.setCustomer({
      fullName: formName.trim(),
      organization: formOrg.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
      city: formCity.trim(),
      country: "Cameroun",
      deliveryAddress: formAddress.trim(),
    });
    cartStore.setDeliveryMode(formDeliveryMode);
    setCurrentStep(3);
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      customer: {
        fullName: formName.trim(),
        organization: formOrg.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim(),
        city: formCity.trim(),
        country: "Cameroun",
        deliveryAddress: formAddress.trim(),
      },
      deliveryMode: formDeliveryMode,
      items: draft.items,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedOrderRef(data.reference);
        setCurrentStep(4);
        cartStore.clearCart();
      } else {
        setErrorMessage(data.error || "Erreur lors de la validation de la commande.");
      }
    } catch {
      setErrorMessage("Erreur de connexion serveur. Vous pouvez transmettre votre panier directement sur WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const text = cartStore.formatWhatsAppOrderMessage(submittedOrderRef || draft.referenceId);
    const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Overlay sombre */}
      <div 
        className={`${styles.drawerOverlay} ${styles.drawerOverlayVisible}`}
        onClick={() => cartStore.closeDrawer()}
      />

      {/* Tiroir coulissant */}
      <div 
        className={`${styles.drawerContainer} ${styles.drawerOpen}`}
        style={{ maxWidth: "620px", backgroundColor: "#0E131A", color: "#EBE3DB", borderLeft: "1px solid rgba(197, 155, 83, 0.3)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Panier et commande d'atelier"
      >
        {/* En-tête du tiroir */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #222C38", backgroundColor: "#161D26" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#C59B53", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Atelier Commercial 2026
              </span>
              <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(197, 155, 83, 0.15)", color: "#C59B53", padding: "2px 6px", borderRadius: "3px", fontFamily: "monospace" }}>
                {submittedOrderRef || draft.referenceId}
              </span>
            </div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFFFFF", margin: "0.2rem 0 0" }}>
              {currentStep === 1 && `Panier d'Atelier (${draft.items.length})`}
              {currentStep === 2 && "Coordonnées du Commanditaire"}
              {currentStep === 3 && "Mode d'Acheminement & Récapitulatif"}
              {currentStep === 4 && "Demande Enregistrée — En attente BAT"}
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            onClick={() => cartStore.closeDrawer()}
            style={{
              background: "#222C38",
              border: "none",
              color: "#8E9AA8",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Fermer le panier"
          >
            <X size={16} />
          </button>
        </div>

        {/* Corps défilable du tiroir */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {errorMessage && (
            <div style={{ padding: "0.75rem 1rem", backgroundColor: "rgba(224, 90, 71, 0.2)", border: "1px solid #E05A47", borderRadius: "6px", color: "#FF7A66", fontSize: "0.82rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ÉTAPE 1 : LISTE DES ARTICLES DANS LE PANIER */}
          {currentStep === 1 && (
            <div>
              {draft.items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#8E9AA8" }}>
                  <ShoppingBag size={48} color="#334050" style={{ margin: "0 auto 1rem" }} />
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                    Votre panier d&apos;atelier est vide
                  </div>
                  <p style={{ fontSize: "0.85rem", maxWidth: "340px", margin: "0 auto 1.5rem", lineHeight: 1.5 }}>
                    Sélectionnez un produit dans le catalogue ADP Studio pour le configurer et l&apos;ajouter ici.
                  </p>
                  <Link
                    href="/adp-studio"
                    onClick={() => cartStore.closeDrawer()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "#C59B53",
                      color: "#11161F",
                      fontWeight: 700,
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                    }}
                  >
                    Explorer le catalogue Studio →
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {draft.items.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: "#161D26",
                        border: "1px solid #222C38",
                        borderRadius: "8px",
                        padding: "1rem",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "0.7rem", color: "#C59B53", textTransform: "uppercase", fontWeight: 700 }}>
                            {item.universeName}
                          </span>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", margin: "0.2rem 0" }}>
                            {item.productName}
                          </h4>
                          
                          {/* Options sélectionnées */}
                          <div style={{ fontSize: "0.75rem", color: "#8E9AA8", marginTop: "0.35rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                            {item.selectedOptionLabels && Object.entries(item.selectedOptionLabels).map(([k, v]) => (
                              <div key={k}>• <span style={{ color: "#C2CEDA" }}>{k} :</span> {v}</div>
                            ))}
                            {item.needsDesignService && (
                              <div style={{ color: "#4ECA8E" }}>• Prestation graphique d&apos;atelier incluse</div>
                            )}
                            {item.clientFileName && (
                              <div style={{ color: "#7DB9DC" }}>• Fichier : {item.clientFileName}</div>
                            )}
                          </div>
                        </div>

                        {/* Prix unitaire ou statut devis */}
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#C59B53" }}>
                            {item.totalPriceXAF ? formatCurrency(item.totalPriceXAF, currency) : "Sur devis"}
                          </div>
                          {item.unitPriceXAF && (
                            <div style={{ fontSize: "0.7rem", color: "#8E9AA8" }}>
                              {formatCurrency(item.unitPriceXAF, currency)} / unité
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contrôles de quantité et actions de ligne */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #222C38", marginTop: "1rem", paddingTop: "0.75rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#11161F", padding: "2px 6px", borderRadius: "4px", border: "1px solid #222C38" }}>
                          <button
                            type="button"
                            onClick={() => cartStore.updateItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{ background: "none", border: "none", color: item.quantity <= 1 ? "#4A5568" : "#C59B53", cursor: item.quantity <= 1 ? "not-allowed" : "pointer" }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, minWidth: "30px", textAlign: "center", color: "#FFFFFF" }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => cartStore.updateItemQuantity(item.id, item.quantity + 1)}
                            style={{ background: "none", border: "none", color: "#C59B53", cursor: "pointer" }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem" }}>
                          <button
                            type="button"
                            onClick={() => cartStore.duplicateItem(item.id)}
                            style={{ background: "none", border: "none", color: "#8E9AA8", fontSize: "0.75rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                            title="Dupliquer cet article"
                          >
                            <Copy size={13} />
                            <span>Dupliquer</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => cartStore.removeItem(item.id)}
                            style={{ background: "none", border: "none", color: "#E05A47", fontSize: "0.75rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                            title="Supprimer cet article"
                          >
                            <Trash2 size={13} />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ÉTAPE 2 : COORDONNÉES CLIENT */}
          {currentStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ backgroundColor: "#161D26", padding: "1.25rem", borderRadius: "8px", border: "1px solid #222C38" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#C59B53", margin: "0 0 1rem", textTransform: "uppercase" }}>
                  Informations de Contact
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                      Nom et Prénom *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: Paul Boubert"
                      style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                      Entreprise / Organisation (facultatif)
                    </label>
                    <input
                      type="text"
                      value={formOrg}
                      onChange={(e) => setFormOrg(e.target.value)}
                      placeholder="Ex: ETS TIFO"
                      style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+237 6..."
                        style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                        Courriel / Email
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="contact@entreprise.cm"
                        style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                      Ville / Localité
                    </label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="Douala, Yaoundé, Kribi..."
                      style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : MODE DE LIVRAISON & VALIDATION */}
          {currentStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ backgroundColor: "#161D26", padding: "1.25rem", borderRadius: "8px", border: "1px solid #222C38" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#C59B53", margin: "0 0 1rem", textTransform: "uppercase" }}>
                  Mode d&apos;Acheminement
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {(["atelier_pickup", "courrier_douala", "courrier_yaounde", "shipping_other"] as OrderDeliveryMode[]).map((mode) => {
                    const isSelected = formDeliveryMode === mode;
                    return (
                      <label
                        key={mode}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          backgroundColor: isSelected ? "rgba(197, 155, 83, 0.1)" : "#11161F",
                          border: isSelected ? "1px solid #C59B53" : "1px solid #222C38",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="deliveryMode"
                          checked={isSelected}
                          onChange={() => setFormDeliveryMode(mode)}
                          style={{ marginTop: "3px", accentColor: "#C59B53" }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FFFFFF" }}>
                            {DELIVERY_LABELS[mode]}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#8E9AA8", marginTop: "2px" }}>
                            {mode === "atelier_pickup" && "Disponible à notre atelier de Bonapriso dès validation du tirage."}
                            {mode === "courrier_douala" && "Remise en main propre contre décharge à votre bureau ou domicile."}
                            {mode === "courrier_yaounde" && "Envoi express sécurisé sous 24h ouvrées."}
                            {mode === "shipping_other" && "Coordination avec notre transporteur agréé (CEMAC / International)."}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {formDeliveryMode !== "atelier_pickup" && (
                  <div style={{ marginTop: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#8E9AA8", marginBottom: "0.3rem" }}>
                      Adresse de livraison précise
                    </label>
                    <textarea
                      rows={2}
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      placeholder="Quartier, rue, repère, numéro de porte..."
                      style={{ width: "100%", padding: "0.65rem 0.85rem", background: "#11161F", border: "1px solid #222C38", borderRadius: "6px", color: "#FFFFFF", fontSize: "0.85rem" }}
                    />
                  </div>
                )}
              </div>

              {/* Rappel du circuit BAT */}
              <div style={{ backgroundColor: "#11161F", border: "1px solid #222C38", borderRadius: "8px", padding: "1rem", fontSize: "0.78rem", color: "#8E9AA8" }}>
                <div style={{ color: "#C59B53", fontWeight: 700, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Clock size={14} />
                  Circuit de Contrôle Qualité d&apos;Atelier
                </div>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  1. Votre commande est transmise à l&apos;équipe technique.<br />
                  2. Nous vérifions les résolutions, traits de coupe et profils de couleur.<br />
                  3. Un Bon À Tirer (BAT) numérique vous est émis pour signature formelle avant toute mise en fabrication.
                </p>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : CONFIRMATION & SUCCÈS */}
          {currentStep === 4 && (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "rgba(78, 202, 142, 0.15)", border: "2px solid #4ECA8E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#4ECA8E" }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.5rem" }}>
                Demande de Commande Enregistrée
              </h3>

              <div style={{ fontSize: "0.88rem", color: "#C59B53", fontFamily: "monospace", fontWeight: 700, padding: "6px 12px", backgroundColor: "#161D26", display: "inline-block", borderRadius: "4px", border: "1px solid #334050", marginBottom: "1rem" }}>
                Réf : {submittedOrderRef}
              </div>

              {/* RAPPEL DE DISTINCTION CONTRACTUELLE */}
              <div style={{ padding: "0.85rem 1rem", backgroundColor: "rgba(197, 155, 83, 0.08)", border: "1px solid rgba(197, 155, 83, 0.3)", borderRadius: "6px", textAlign: "left", marginBottom: "1.5rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700, color: "#C59B53", marginBottom: "0.35rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span>⚠️</span> Distinction importante du circuit de commande :
                </div>
                <div style={{ color: "#CBD5E1" }}>
                  <strong>1. Demande enregistrée :</strong> Votre panier et vos choix sont mémorisés sous cette référence.<br />
                  <strong>2. Transmission atelier :</strong> Transmettez la référence via WhatsApp pour lancer l&apos;examen de vos fichiers.<br />
                  <strong>3. Confirmation définitive :</strong> Uniquement après signature/accord de votre Bon À Tirer (BAT) contractuel.
                </div>
              </div>

              <p style={{ fontSize: "0.85rem", color: "#A3B1C2", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 2rem" }}>
                Votre demande a été enregistrée avec succès. Elle est en cours d&apos;examen technique par notre équipe d&apos;atelier afin d&apos;émettre votre Bon À Tirer (BAT) contractuel.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "380px", margin: "0 auto" }}>
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 1.25rem",
                    backgroundColor: "#0D5C3A",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  <MessageSquare size={16} />
                  Transmettre sur WhatsApp Atelier
                </button>

                <button
                  type="button"
                  onClick={() => {
                    cartStore.closeDrawer();
                    setCurrentStep(1);
                  }}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "transparent",
                    color: "#8E9AA8",
                    border: "1px solid #334050",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                  }}
                >
                  Fermer cette fenêtre
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pied de tiroir : Synthèse & Boutons de navigation */}
        {currentStep < 4 && draft.items.length > 0 && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #222C38", backgroundColor: "#161D26" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#8E9AA8", textTransform: "uppercase" }}>
                  Total estimé d&apos;atelier
                </div>
                {summary.hasCustomQuoteItems && (
                  <div style={{ fontSize: "0.72rem", color: "#C59B53" }}>
                    Articles sur mesure à chiffrer inclus
                  </div>
                )}
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#C59B53" }}>
                  {summary.formattedGrandTotal}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "#222C38",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  <ArrowLeft size={16} />
                </button>
              )}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={handleNextToStep2}
                  className={styles.btnPrimary}
                  style={{ flex: 1, justifyContent: "center", padding: "0.85rem" }}
                >
                  <span>Passer aux coordonnées</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className={styles.btnPrimary}
                  style={{ flex: 1, justifyContent: "center", padding: "0.85rem" }}
                >
                  <span>Acheminement &amp; Fichiers</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className={styles.btnPrimary}
                  style={{ flex: 1, justifyContent: "center", padding: "0.85rem", opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <span>{isSubmitting ? "Transmission en cours..." : "Valider & Enregistrer la Commande"}</span>
                  <FileCheck size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
