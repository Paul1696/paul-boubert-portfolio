"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PROJECTS, getProjectStatus, getProjectResponsibleEntity } from "@/data/all-projects";
import { UNIVERSES } from "@/data/universes";
import { SERVICES_CATALOG } from "@/data/services-catalog";
import { PROJECTS_MEDIA } from "@/data/media-manifest";
import { DigitalCardData, CardStatus } from "@/types/digital-card";
import { STUDIO_FAMILIES, STUDIO_PRODUCTS } from "@/data/studio-catalog";
import { OrderRecord, OrderStatus, BATDecision } from "@/types/cart";
import { STUDIO_PRICING_RULES, DELIVERY_LABELS } from "@/data/pricing-catalog";
import { formatCurrency } from "@/lib/pricing-engine";

type AdminTab = "overview" | "cards" | "orders" | "briefs" | "catalog" | "projects" | "quotes" | "media" | "backup";

interface QuoteServiceItem {
  title?: string;
  universe?: string;
  variant?: string;
  quantity?: number;
}

interface AdminQuoteRecord {
  reference: string;
  createdAt: string;
  status?: string;
  client?: {
    name?: string;
    phone?: string;
  };
  clientMasked?: {
    name?: string;
    phoneMasked?: string | null;
    emailMasked?: string | null;
  };
  project?: {
    name?: string;
    location?: string;
    programType?: string;
  };
  services?: QuoteServiceItem[];
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [quotesList, setQuotesList] = useState<AdminQuoteRecord[]>([]);
  const [cardsList, setCardsList] = useState<DigitalCardData[]>([]);
  const [ordersList, setOrdersList] = useState<OrderRecord[]>([]);
  const [briefsList, setBriefsList] = useState<any[]>([]);
  const [academyList, setAcademyList] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrderRef, setSelectedOrderRef] = useState<string | null>(null);
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>("all");
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [storageInfo, setStorageInfo] = useState<{
    mode: string;
    isPersistentInProduction: boolean;
    message: string;
  } | null>(null);
  const [searchProject, setSearchProject] = useState("");
  const [selectedTypology, setSelectedTypology] = useState("all");
  const [projectAttributionFilter, setProjectAttributionFilter] = useState("all");
  const [featuredProjectsSet, setFeaturedProjectsSet] = useState<Set<string>>(new Set([
    "018-studio", "studio-epure", "bahemeck", "interieur-signature",
    "bicec-usca", "agence-bancaire-moderne", "boj", "restaurant-urbain",
    "enem", "halle-automobile", "mbella", "residence-verticale",
    "showroom-kotto", "showroom-elegance", "web-tower", "tour-de-verre",
    "petrofor-base", "pole-industriel", "hunter", "residence-hunter",
    "horizon", "villa-panorama", "bicec-bafoussam", "agence-bancaire-regionale",
    "harmony", "villa-californienne", "oasis", "residence-tropicale",
    "lipem", "residence-terracotta", "perenco-offices", "bureaux-prestige"
  ]));
  const [dbStatus, setDbStatus] = useState<{
    configured: boolean;
    driver: string;
    isPersistentInProduction: boolean;
    message: string;
    schemaVersion?: string;
  } | null>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [selectedCatalogFamily, setSelectedCatalogFamily] = useState<string>("all");
  const [searchCatalog, setSearchCatalog] = useState("");

  // Digital Cards UI states
  const [actionNotice, setActionNotice] = useState<{ text: string; isError?: boolean } | null>(null);
  const [batModalResult, setBatModalResult] = useState<{
    publicId: string;
    isValid: boolean;
    targetUrl: string;
    vcfUrl: string;
    qrUrl: string;
    message: string;
  } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [editingCard, setEditingCard] = useState<DigitalCardData | null>(null);
  const [isSavingCardEdit, setIsSavingCardEdit] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    publicId: "",
    companyName: "",
    activity: "Commerce général, distribution & prestations",
    slogan: "",
    contactName: "",
    contactRole: "Directeur Général",
    primaryPhone: "+237 ",
    whatsappPhone: "+237 ",
    email: "",
    address: "Douala, Cameroun",
    city: "Douala",
    country: "Cameroun",
    googleMapsUrl: "https://maps.google.com/?q=Douala",
    primaryColor: "#0D5C3A",
    accentYellow: "#F5B700",
    accentRed: "#D62828",
  });

  // 1. Check active HttpOnly session on mount (no data leak prior to auth)
  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsCheckingSession(false);
      });
  }, []);

  const loadOrders = () => {
    setIsLoadingOrders(true);
    fetch("/api/orders")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.orders)) {
          setOrdersList(data.orders);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingOrders(false);
      });

    // Charger les briefs & candidatures
    fetch("/api/briefs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.briefs)) {
          setBriefsList(data.briefs);
        }
      })
      .catch(() => {});

    fetch("/api/academy")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.enrollments)) {
          setAcademyList(data.enrollments);
        }
      })
      .catch(() => {});
  };

  const handleUpdateOrderStatus = async (
    orderRef: string,
    status: OrderStatus,
    batDecision?: BATDecision,
    technicianNotes?: string
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, batDecision, technicianNotes }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice({ text: `Commande ${orderRef} mise à jour avec succès (${status}) !` });
        loadOrders();
      } else {
        setActionNotice({ text: data.error || "Erreur de mise à jour.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la mise à jour.", isError: true });
    }
  };

  const loadCards = () => {
    setIsLoadingCards(true);
    fetch("/api/admin/cards")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.cards)) {
          setCardsList(data.cards);
        }
        if (data?.storageStatus) {
          setStorageInfo(data.storageStatus);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingCards(false);
      });
  };

  // 2. Fetch protected quotes & cards ONLY after server-verified authentication
  useEffect(() => {
    if (!isAuthenticated) {
      setQuotesList([]);
      setCardsList([]);
      return;
    }

    fetch("/api/quotes")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { quotes?: AdminQuoteRecord[] } | null) => {
        if (data && Array.isArray(data.quotes)) {
          setQuotesList(data.quotes);
        }
      })
      .catch(() => {});

    loadCards();
    loadOrders();
    loadDbStatus();
  }, [isAuthenticated]);

  const loadDbStatus = () => {
    fetch("/api/admin/database/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.databaseStatus) {
          setDbStatus(data.databaseStatus);
        }
        if (data?.recentActivity) {
          setRecentLogs(data.recentActivity);
        }
      })
      .catch(() => {});
  };

  const handleUpdateBriefStatus = async (ref: string, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/admin/briefs/${ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, internalNotes: notes }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice({ text: `Brief ${ref} actualisé avec succès (${newStatus}) !` });
        loadOrders();
        loadDbStatus();
      } else {
        setActionNotice({ text: data.error || "Erreur de mise à jour du brief.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la mise à jour.", isError: true });
    }
  };

  const handleUpdateAcademyStatus = async (ref: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/academy/${ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice({ text: `Inscription ${ref} actualisée avec succès (${newStatus}) !` });
        loadOrders();
        loadDbStatus();
      } else {
        setActionNotice({ text: data.error || "Erreur de mise à jour de l'inscription.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la mise à jour.", isError: true });
    }
  };

  const handleToggleFeatured = async (slug: string) => {
    const isCurrentlyFeatured = featuredProjectsSet.has(slug);
    const nextSet = new Set(featuredProjectsSet);
    if (isCurrentlyFeatured) {
      nextSet.delete(slug);
    } else {
      if (nextSet.size >= 16) {
        setActionNotice({ text: "Limite de 16 projets « À la une » atteinte. Veuillez en retirer un d'abord.", isError: true });
        return;
      }
      nextSet.add(slug);
    }

    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, isFeatured: !isCurrentlyFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeaturedProjectsSet(nextSet);
        setActionNotice({ text: `Projet ${slug} : mise en avant mise à jour (${!isCurrentlyFeatured ? "Vedette" : "Standard"}).` });
        loadDbStatus();
      } else {
        setActionNotice({ text: data.error || "Erreur lors de la mise à jour.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la modification.", isError: true });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmittingAuth(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
      });
      const data = await res.json();
      if (res.ok && data?.authenticated) {
        setIsAuthenticated(true);
        setPassphrase("");
      } else {
        setAuthError(data?.error || "Clé d'autorisation non valide.");
      }
    } catch {
      setAuthError("Erreur de communication avec le serveur d'authentification.");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore network error on logout
    }
    setIsAuthenticated(false);
    setQuotesList([]);
    setCardsList([]);
  };

  // Toggle card status (active <-> suspended)
  const handleToggleCardStatus = async (publicId: string, currentStatus: CardStatus) => {
    const nextStatus: CardStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      const res = await fetch(`/api/admin/cards/${publicId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice({ text: `Statut de ${publicId} passé à "${nextStatus}".` });
        loadCards();
      } else {
        setActionNotice({ text: data.error || "Erreur de mise à jour.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors du changement de statut.", isError: true });
    }
  };

  // Execute BAT Print Verification Check
  const handleVerifyBat = async (publicId: string) => {
    try {
      const res = await fetch(`/api/admin/cards/${publicId}/bat`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.verification) {
        setBatModalResult({
          publicId,
          isValid: data.verification.isValid,
          targetUrl: data.verification.targetUrl,
          vcfUrl: data.verification.vcfUrl,
          qrUrl: data.verification.qrUrl,
          message: data.verification.message,
        });
        loadCards();
      } else {
        setActionNotice({ text: data.error || "Échec de vérification BAT.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors du test BAT.", isError: true });
    }
  };

  // Create new digital card
  const handleCreateCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingCard(true);
    setActionNotice(null);

    const payload = {
      publicId: newCardForm.publicId.trim().toLowerCase(),
      companyName: newCardForm.companyName.trim(),
      activity: newCardForm.activity.trim(),
      slogan: newCardForm.slogan.trim() || undefined,
      contactName: newCardForm.contactName.trim(),
      contactRole: newCardForm.contactRole.trim(),
      primaryPhone: newCardForm.primaryPhone.trim(),
      whatsappPhone: newCardForm.whatsappPhone.trim() || newCardForm.primaryPhone.trim(),
      email: newCardForm.email.trim() || undefined,
      address: newCardForm.address.trim(),
      city: newCardForm.city.trim(),
      country: newCardForm.country.trim(),
      googleMapsUrl: newCardForm.googleMapsUrl.trim(),
      branding: {
        primaryColor: newCardForm.primaryColor,
        accentYellow: newCardForm.accentYellow,
        accentRed: newCardForm.accentRed,
        backgroundColor: "#F8FAF8",
        textColor: "#11161F",
      },
      products: [],
      status: "active" as CardStatus,
    };

    try {
      const res = await fetch("/api/admin/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowCreateModal(false);
        setActionNotice({ text: `Carte créée avec succès (${payload.publicId}) !` });
        setNewCardForm({
          publicId: "",
          companyName: "",
          activity: "Commerce général, distribution & prestations",
          slogan: "",
          contactName: "",
          contactRole: "Directeur Général",
          primaryPhone: "+237 ",
          whatsappPhone: "+237 ",
          email: "",
          address: "Douala, Cameroun",
          city: "Douala",
          country: "Cameroun",
          googleMapsUrl: "https://maps.google.com/?q=Douala",
          primaryColor: "#0D5C3A",
          accentYellow: "#F5B700",
          accentRed: "#D62828",
        });
        loadCards();
      } else {
        setActionNotice({ text: data.error || "Erreur de création de carte.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la création de la carte.", isError: true });
    } finally {
      setIsCreatingCard(false);
    }
  };

  // Save edited digital card (logo, presentation, and detailed product gallery)
  const handleSaveEditedCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    setIsSavingCardEdit(true);
    setActionNotice(null);

    try {
      const cleanLogoUrl = editingCard.branding?.logoUrl?.trim() || undefined;
      const payload = {
        companyName: editingCard.companyName,
        activity: editingCard.activity,
        slogan: editingCard.slogan,
        description: editingCard.description,
        contactName: editingCard.contactName,
        contactRole: editingCard.contactRole,
        primaryPhone: editingCard.primaryPhone,
        whatsappPhone: editingCard.whatsappPhone,
        phones: editingCard.phones,
        email: editingCard.email,
        address: editingCard.address,
        city: editingCard.city,
        country: editingCard.country,
        googleMapsUrl: editingCard.googleMapsUrl,
        branding: {
          ...editingCard.branding,
          logoUrl: cleanLogoUrl,
          isTemporaryLogo: !cleanLogoUrl,
        },
        products: (editingCard.products || []).map((p) => ({
          ...p,
          image: p.image?.trim() || undefined,
          specs: p.specs?.trim() || undefined,
          gallery: (p.gallery || []).filter((g) => g.url && g.url.trim().length > 0),
        })),
      };

      const res = await fetch(`/api/admin/cards/${editingCard.publicId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditingCard(null);
        setActionNotice({
          text: `Vitrine & galerie de ${editingCard.publicId} enregistrées avec succès (URL permanente inchangée).`,
        });
        loadCards();
      } else {
        setActionNotice({ text: data.error || "Erreur lors de l'enregistrement.", isError: true });
      }
    } catch {
      setActionNotice({ text: "Erreur réseau lors de la sauvegarde de la fiche.", isError: true });
    } finally {
      setIsSavingCardEdit(false);
    }
  };

  // Export Cards JSON Backup
  const handleExportCardsBackup = async () => {
    try {
      const res = await fetch("/api/admin/cards/backup");
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `adp-digital-cards-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
      }
    } catch {
      setActionNotice({ text: "Échec du téléchargement de sauvegarde des cartes.", isError: true });
    }
  };

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchTypology = selectedTypology === "all" || p.typology === selectedTypology;
      const matchQuery =
        !searchProject ||
        p.title.toLowerCase().includes(searchProject.toLowerCase()) ||
        p.location.toLowerCase().includes(searchProject.toLowerCase());

      const entity = getProjectResponsibleEntity ? getProjectResponsibleEntity(p) : (p.responsibleEntity || "Personnel");
      let matchAttribution = true;
      if (projectAttributionFilter === "barlabarla") {
        matchAttribution = entity === "BARLABARLA";
      } else if (projectAttributionFilter === "adp") {
        matchAttribution = entity === "Personnel" || p.universeSlug === "adp-project";
      } else if (projectAttributionFilter === "collaboration") {
        matchAttribution = entity === "Collaboration";
      } else if (projectAttributionFilter === "etudes") {
        matchAttribution = entity === "Autre cabinet" || (entity === "Personnel" && p.status !== "Réalisé");
      }

      return matchTypology && matchQuery && matchAttribution;
    });
  }, [selectedTypology, searchProject, projectAttributionFilter]);

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "overview", label: "📊 Vue d'Ensemble" },
    { id: "orders", label: `📦 Commandes & BAT (${ordersList.length})` },
    { id: "briefs", label: `📑 Briefs & Inscriptions (${briefsList.length + academyList.length})` },
    { id: "cards", label: `📇 Cartes Pro (${cardsList.length})` },
    { id: "catalog", label: `🎨 Catalogue Studio (${STUDIO_PRODUCTS.length})` },
    { id: "projects", label: `🏛️ Projets Portfolio (${ALL_PROJECTS.length})` },
    { id: "quotes", label: `💼 Devis & Leads (${quotesList.length})` },
    { id: "media", label: `🖼️ Médiathèque (${Object.keys(PROJECTS_MEDIA).length})` },
    { id: "backup", label: "💾 Sauvegardes & Exports" },
  ];

  if (isCheckingSession) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#11161F",
          color: "#8E9AA8",
          fontFamily: "var(--font-sans, system-ui)",
          fontSize: "0.9rem",
        }}
      >
        Vérification sécurisée de la session ADP Control…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#11161F",
          color: "#FFFFFF",
          padding: "1.5rem",
          fontFamily: "var(--font-sans, system-ui)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#1A222D",
            borderRadius: "12px",
            border: "1px solid rgba(197, 155, 83, 0.3)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            padding: "2.5rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: "rgba(197, 155, 83, 0.15)",
                color: "#C59B53",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "1rem",
                border: "1px solid rgba(197, 155, 83, 0.4)",
              }}
            >
              ADP
            </div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0 0 0.25rem 0" }}>
              ADP CONTROL • Back-Office
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: 0 }}>
              Administration centrale sécurisée • Les Ateliers de Paul
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                htmlFor="admin-key"
                style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#C59B53", marginBottom: "0.4rem" }}
              >
                Clé de session d&apos;Atelier (Validation Serveur HMAC)
              </label>
              <input
                id="admin-key"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="••••••••••••••••"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "6px",
                  border: authError ? "1px solid #E05A47" : "1px solid #334050",
                  backgroundColor: "#11161F",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
              {authError && (
                <div style={{ fontSize: "0.78rem", color: "#E05A47", marginTop: "0.4rem" }} role="alert">
                  {authError}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              style={{
                padding: "0.85rem",
                backgroundColor: "#C59B53",
                color: "#11161F",
                border: "none",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: isSubmittingAuth ? "wait" : "pointer",
                marginTop: "0.5rem",
                opacity: isSubmittingAuth ? 0.7 : 1,
              }}
            >
              {isSubmittingAuth ? "Vérification en cours..." : "Accéder au Cockpit ADP Control →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link href="/" style={{ color: "#8E9AA8", fontSize: "0.8rem", textDecoration: "none" }}>
              ← Retourner au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0E131A", color: "#EBE3DB", display: "flex", flexDirection: "column" }}>
      {/* Topbar Admin */}
      <header
        style={{
          backgroundColor: "#161D26",
          borderBottom: "1px solid rgba(197, 155, 83, 0.25)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(197, 155, 83, 0.15)",
              color: "#C59B53",
              borderRadius: "4px",
              fontWeight: 800,
              fontSize: "0.9rem",
            }}
          >
            ADP CONTROL
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "#FFFFFF" }}>Cockpit Centralisé • Les Ateliers de Paul</div>
            <div style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>Session Serveur HttpOnly Active • Monolithe Next.js 15</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              padding: "6px 12px",
              backgroundColor: "#222C38",
              color: "#FFFFFF",
              borderRadius: "4px",
              fontSize: "0.82rem",
              textDecoration: "none",
            }}
          >
            Voir le site public ↗
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              backgroundColor: "transparent",
              color: "#E05A47",
              border: "1px solid #E05A47",
              borderRadius: "4px",
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Tabs Menu */}
      <nav
        style={{
          display: "flex",
          backgroundColor: "#11161F",
          borderBottom: "1px solid #222C38",
          padding: "0 2rem",
          gap: "1.5rem",
          overflowX: "auto",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid #C59B53" : "2px solid transparent",
                color: isActive ? "#C59B53" : "#8E9AA8",
                fontWeight: isActive ? 700 : 500,
                padding: "1rem 0.5rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Global Action Banner Notice */}
      {actionNotice && (
        <div
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: actionNotice.isError ? "rgba(224, 90, 71, 0.15)" : "rgba(13, 92, 58, 0.25)",
            borderBottom: actionNotice.isError ? "1px solid #E05A47" : "1px solid #0D5C3A",
            color: actionNotice.isError ? "#FF7A66" : "#4ECA8E",
            fontSize: "0.85rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{actionNotice.text}</span>
          <button
            onClick={() => setActionNotice(null)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "0 4px",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "2rem", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
              {[
                { label: "Cartes Pro Actives", value: cardsList.filter((c) => c.status === "active").length, sub: "ADP Digital Cards en circulation", color: "#0D5C3A" },
                { label: "Commandes & BAT", value: ordersList.length, sub: "Suivi commercial & production", color: "#4ECA8E" },
                { label: "Catalogue Studio 2026", value: `${STUDIO_PRODUCTS.length} réf.`, sub: "6 familles • 100% complété", color: "#C59B53" },
                { label: "Projets Réels Certifiés", value: ALL_PROJECTS.length, sub: "Fonds documentaire Legacy", color: "#7DB9DC" },
                { label: "Univers Professionnels", value: UNIVERSES.length, sub: "De ADP Brief à Rosbri Wax", color: "#E68AB3" },
                { label: "Prestations Actives", value: SERVICES_CATALOG.length, sub: "Sur les 7 pôles métiers", color: "#B1CE9A" },
                { label: "Demandes de Devis", value: quotesList.length, sub: "Archivées dans le registre", color: "#F3A66D" },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#161D26",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #222C38",
                    borderLeft: `4px solid ${card.color}`,
                  }}
                >
                  <div style={{ fontSize: "0.82rem", color: "#8E9AA8" }}>{card.label}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", margin: "0.35rem 0" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: card.color }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Persistance PostgreSQL & Diagnostic Système */}
            <div
              style={{
                backgroundColor: "#161D26",
                padding: "1.25rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid #222C38",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                borderLeft: dbStatus?.configured ? "4px solid #4ECA8E" : "4px solid #C59B53",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1rem" }}>{dbStatus?.configured ? "🟢" : "🟡"}</span>
                  <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>
                    {dbStatus?.configured
                      ? "Base Relationnelle PostgreSQL Connectée"
                      : "Stockage Local Staging Actif (JSON Atomique Sécurisé)"}
                  </strong>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: dbStatus?.isPersistentInProduction
                        ? "rgba(78, 202, 142, 0.2)"
                        : "rgba(197, 155, 83, 0.2)",
                      color: dbStatus?.isPersistentInProduction ? "#4ECA8E" : "#C59B53",
                    }}
                  >
                    {dbStatus?.isPersistentInProduction ? "PRODUCTION PERSISTANTE" : "MODE STAGING LOCAL"}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.35rem 0 0" }}>
                  {dbStatus?.message ||
                    "Les modifications sont enregistrées de façon atomique et sécurisée dans src/data. Les migrations PostgreSQL (schema.sql & seed_data.sql) sont prêtes pour le branchement d'une instance Neon/Supabase."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <a
                  href="/api/admin/database/export-sql"
                  download="adp-schema-seed-complete.sql"
                  style={{
                    padding: "0.5rem 0.9rem",
                    backgroundColor: "#222C38",
                    border: "1px solid #334050",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  📥 Export SQL Schéma &amp; Données
                </a>
              </div>
            </div>

            {/* ADP Digital Cards Summary Card */}
            <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Module Commercial • ADP Digital Cards
                  </h2>
                  <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                    Service de cartes de visite numériques QR connectées • Déployé sous ADP Studio
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("cards")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(197, 155, 83, 0.15)",
                    border: "1px solid #C59B53",
                    color: "#C59B53",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Gérer les Cartes Pro →
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {cardsList.map((card) => (
                  <div
                    key={card.publicId}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#11161F",
                      borderRadius: "6px",
                      border: "1px solid #222C38",
                      borderLeft: `4px solid ${card.branding.primaryColor || "#0D5C3A"}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#FFFFFF" }}>{card.companyName}</div>
                        <div style={{ fontSize: "0.8rem", color: "#8E9AA8", marginTop: "0.15rem" }}>
                          {card.contactName} • {card.contactRole}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          backgroundColor: card.status === "active" ? "rgba(13, 92, 58, 0.2)" : "rgba(224, 90, 71, 0.2)",
                          color: card.status === "active" ? "#4ECA8E" : "#FF7A66",
                        }}
                      >
                        {card.status === "active" ? "ACTIVE" : "SUSPENDUE"}
                      </span>
                    </div>

                    <div style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: "#C59B53", fontFamily: "monospace" }}>
                      https://ateliersdepaul.com/c/{card.publicId}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                      <Link
                        href={`/c/${card.publicId}`}
                        target="_blank"
                        style={{ fontSize: "0.78rem", color: "#7DB9DC", textDecoration: "none" }}
                      >
                        Voir la carte ↗
                      </Link>
                      <Link
                        href={`/c/${card.publicId}/vcf`}
                        target="_blank"
                        style={{ fontSize: "0.78rem", color: "#C59B53", textDecoration: "none" }}
                      >
                        vCard ↗
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADP Studio 2026 Commercial Catalog Summary Card */}
            <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Catalogue Commercial ADP Studio 2026 • 6 Familles Métiers
                  </h2>
                  <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                    16 références complètes • 100% fiches techniques &amp; spécifications PAO • Ponts devis &amp; cartes connectées
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href="/adp-studio"
                    target="_blank"
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#222C38",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                    }}
                  >
                    Voir portail Studio ↗
                  </Link>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "rgba(197, 155, 83, 0.15)",
                      border: "1px solid #C59B53",
                      color: "#C59B53",
                      borderRadius: "4px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Inspecter le Catalogue ({STUDIO_PRODUCTS.length}) →
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                {STUDIO_FAMILIES.map((fam) => {
                  const famProducts = STUDIO_PRODUCTS.filter((p) => p.familyId === fam.id);
                  return (
                    <div
                      key={fam.id}
                      style={{
                        padding: "1rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #222C38",
                        borderRadius: "6px",
                        borderLeft: "3px solid #C59B53",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF" }}>{fam.name}</span>
                        <span style={{ fontSize: "0.75rem", color: "#C59B53", fontWeight: 700 }}>
                          {famProducts.length} réf.
                        </span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#8E9AA8", marginTop: "0.35rem" }}>
                        {fam.subCategoryIds.length} sous-catégories • Spécifications PAO complètes
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Orders & BAT Summary Card in Overview */}
            <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Commandes Commerciales d&apos;Atelier &amp; Suivi BAT
                  </h2>
                  <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                    {ordersList.length} commande(s) enregistrée(s) • Suivi de conformité pré-presse &amp; décisions contractuelles
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(78, 202, 142, 0.15)",
                    border: "1px solid #4ECA8E",
                    color: "#4ECA8E",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Gérer les Commandes &amp; BAT ({ordersList.length}) →
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                  { label: "En attente BAT", count: ordersList.filter((o) => o.status === "bat_en_attente_client" || o.status === "commande_soumise").length, color: "#C59B53" },
                  { label: "BAT Validés Client", count: ordersList.filter((o) => o.status === "bat_valide_client").length, color: "#7DB9DC" },
                  { label: "En Fabrication", count: ordersList.filter((o) => o.status === "en_production").length, color: "#E68AB3" },
                  { label: "Livrées & Clôturées", count: ordersList.filter((o) => o.status === "livree_cloturee").length, color: "#4ECA8E" },
                ].map((st, idx) => (
                  <div key={idx} style={{ padding: "0.85rem 1rem", backgroundColor: "#11161F", borderRadius: "6px", border: "1px solid #222C38", borderLeft: `3px solid ${st.color}` }}>
                    <div style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>{st.label}</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", marginTop: "0.2rem" }}>{st.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Univers Summary Table */}
            <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "#FFFFFF" }}>
                État des Sept Univers d&apos;Atelier
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #222C38", textAlign: "left", color: "#8E9AA8" }}>
                    <th style={{ padding: "0.75rem" }}>N°</th>
                    <th style={{ padding: "0.75rem" }}>Nom de l&apos;Univers</th>
                    <th style={{ padding: "0.75rem" }}>Matières &amp; Identité</th>
                    <th style={{ padding: "0.75rem" }}>Prestations</th>
                    <th style={{ padding: "0.75rem" }}>Route</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIVERSES.map((u) => {
                    const servicesCount = SERVICES_CATALOG.filter((s) => s.universeSlug === u.slug).length;
                    return (
                      <tr key={u.id} style={{ borderBottom: "1px solid #1E2633" }}>
                        <td style={{ padding: "0.75rem", fontFamily: "monospace", color: u.accentColor }}>{u.number}</td>
                        <td style={{ padding: "0.75rem", fontWeight: 700, color: "#FFFFFF" }}>{u.name}</td>
                        <td style={{ padding: "0.75rem", color: "#8E9AA8" }}>{u.materials}</td>
                        <td style={{ padding: "0.75rem" }}>{servicesCount} prestation(s)</td>
                        <td style={{ padding: "0.75rem" }}>
                          <Link href={u.targetRoute} target="_blank" style={{ color: u.accentColor, textDecoration: "none" }}>
                            {u.targetRoute} ↗
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CARDS TAB — ADP DIGITAL CARDS */}
        {activeTab === "cards" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                backgroundColor: "#161D26",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #222C38",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                  📇 Registre ADP Digital Cards ({cardsList.length})
                </h1>
                <p style={{ fontSize: "0.85rem", color: "#8E9AA8", margin: "0.3rem 0 0 0" }}>
                  Gestion centralisée multi-entreprises, URLs pérennes définitives, validation BAT et exports imprimeur 300 DPI.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    padding: "0.65rem 1.25rem",
                    backgroundColor: "#C59B53",
                    color: "#11161F",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  ➕ Nouvelle Carte Entreprise
                </button>
                <button
                  onClick={handleExportCardsBackup}
                  style={{
                    padding: "0.65rem 1rem",
                    backgroundColor: "#222C38",
                    color: "#FFFFFF",
                    border: "1px solid #334050",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  💾 Exporter Backup JSON
                </button>
                <button
                  onClick={loadCards}
                  disabled={isLoadingCards}
                  style={{
                    padding: "0.65rem 1rem",
                    backgroundColor: "#11161F",
                    color: "#8E9AA8",
                    border: "1px solid #222C38",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {isLoadingCards ? "Actualisation..." : "🔄 Actualiser"}
                </button>
              </div>
            </div>

            {/* Immutable Rule Callout */}
            <div
              style={{
                backgroundColor: "rgba(197, 155, 83, 0.08)",
                border: "1px solid rgba(197, 155, 83, 0.3)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div style={{ fontSize: "1.3rem" }}>🔒</div>
              <div style={{ fontSize: "0.82rem", color: "#D1C7BD", lineHeight: 1.5 }}>
                <strong style={{ color: "#C59B53" }}>Garantie de Pérennité d&apos;Impression :</strong> Tout identifiant public attribué (ex : <code style={{ color: "#FFFFFF" }}>tifo-0001</code>) est définitif et immuable. Les QR codes générés et imprimés sur cartes physiques renvoient vers <code style={{ color: "#FFFFFF" }}>https://ateliersdepaul.com/c/[publicId]</code> et continueront de fonctionner sans interruption.
              </div>
            </div>

            {/* Storage Architecture Status Banner */}
            <div
              style={{
                backgroundColor: storageInfo?.isPersistentInProduction ? "rgba(13, 92, 58, 0.15)" : "rgba(125, 185, 220, 0.08)",
                border: storageInfo?.isPersistentInProduction ? "1px solid #0D5C3A" : "1px solid rgba(125, 185, 220, 0.25)",
                borderRadius: "8px",
                padding: "0.85rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                fontSize: "0.82rem",
                color: "#D1C7BD",
              }}
            >
              <div>
                <strong style={{ color: storageInfo?.isPersistentInProduction ? "#4ECA8E" : "#7DB9DC" }}>
                  Mode de persistance : {storageInfo?.mode === "postgres" ? "Base PostgreSQL (Production Ready)" : "Développement Local (JSON Atomique)"}
                </strong>
                <div style={{ fontSize: "0.76rem", color: "#8E9AA8", marginTop: "0.2rem" }}>
                  {storageInfo?.message || "Les fiches précompilées (ETS TIFO) sont 100% disponibles en production."}
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  backgroundColor: storageInfo?.isPersistentInProduction ? "rgba(13, 92, 58, 0.3)" : "rgba(197, 155, 83, 0.2)",
                  color: storageInfo?.isPersistentInProduction ? "#4ECA8E" : "#C59B53",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {storageInfo?.isPersistentInProduction ? "PROD DATABASE CONNECTED" : "LOCAL DEV STORAGE"}
              </span>
            </div>

            {/* Cards Table */}
            <div style={{ backgroundColor: "#161D26", borderRadius: "8px", border: "1px solid #222C38", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #222C38", textAlign: "left", color: "#8E9AA8" }}>
                    <th style={{ padding: "1rem" }}>Identifiant Pérenne</th>
                    <th style={{ padding: "1rem" }}>Entreprise &amp; Titulaire</th>
                    <th style={{ padding: "1rem" }}>Contacts &amp; Ville</th>
                    <th style={{ padding: "1rem" }}>Statut</th>
                    <th style={{ padding: "1rem" }}>Contrôle BAT</th>
                    <th style={{ padding: "1rem" }}>Fiches Publiques</th>
                    <th style={{ padding: "1rem", textAlign: "right" }}>Actions &amp; Exports</th>
                  </tr>
                </thead>
                <tbody>
                  {cardsList.map((card) => {
                    const isBatValid = card.metadata?.printBatValidated;
                    return (
                      <tr key={card.publicId} style={{ borderBottom: "1px solid #1E2633" }}>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontWeight: 700,
                              color: "#C59B53",
                              backgroundColor: "rgba(197, 155, 83, 0.1)",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: "1px solid rgba(197, 155, 83, 0.25)",
                            }}
                          >
                            🔒 {card.publicId}
                          </span>
                          <div style={{ fontSize: "0.72rem", color: "#8E9AA8", marginTop: "0.3rem" }}>
                            v{card.version || 1} • {card.branding?.primaryColor || "#0D5C3A"}
                          </div>
                        </td>

                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.95rem" }}>{card.companyName}</div>
                          <div style={{ color: "#C59B53", fontSize: "0.82rem", marginTop: "0.15rem" }}>
                            {card.contactName}
                          </div>
                          <div style={{ color: "#8E9AA8", fontSize: "0.75rem" }}>{card.contactRole}</div>
                        </td>

                        <td style={{ padding: "1rem" }}>
                          <div style={{ color: "#FFFFFF" }}>{card.primaryPhone}</div>
                          <div style={{ color: "#8E9AA8", fontSize: "0.75rem" }}>{card.city}, {card.country}</div>
                        </td>

                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              backgroundColor:
                                card.status === "active"
                                  ? "rgba(13, 92, 58, 0.25)"
                                  : "rgba(224, 90, 71, 0.25)",
                              color: card.status === "active" ? "#4ECA8E" : "#FF7A66",
                            }}
                          >
                            {card.status === "active" ? "EN SERVICE" : "SUSPENDUE"}
                          </span>
                        </td>

                        <td style={{ padding: "1rem" }}>
                          {isBatValid ? (
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "3px 8px",
                                  borderRadius: "4px",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  backgroundColor: "rgba(13, 92, 58, 0.2)",
                                  color: "#4ECA8E",
                                  border: "1px solid rgba(13, 92, 58, 0.4)",
                                }}
                              >
                                ✓ BAT VALIDÉ
                              </span>
                              <div style={{ fontSize: "0.7rem", color: "#8E9AA8", marginTop: "0.2rem" }}>
                                {card.metadata?.printBatDate || "Certifié"}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleVerifyBat(card.publicId)}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "rgba(245, 183, 0, 0.15)",
                                border: "1px solid #F5B700",
                                color: "#F5B700",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Tester &amp; Valider BAT
                            </button>
                          )}
                        </td>

                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <Link
                              href={`/c/${card.publicId}`}
                              target="_blank"
                              style={{ color: "#7DB9DC", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 }}
                            >
                              Fiche Web ↗
                            </Link>
                            <Link
                              href={`/c/${card.publicId}/vcf`}
                              target="_blank"
                              style={{ color: "#C59B53", textDecoration: "none", fontSize: "0.78rem" }}
                            >
                              Télécharger vCard (.vcf) ↗
                            </Link>
                          </div>
                        </td>

                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", flexWrap: "wrap" }}>
                            <button
                              type="button"
                              onClick={() => setEditingCard(JSON.parse(JSON.stringify(card)))}
                              style={{
                                padding: "4px 10px",
                                backgroundColor: "rgba(197, 155, 83, 0.16)",
                                border: "1px solid #C59B53",
                                color: "#C59B53",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              ✏️ Galerie &amp; Fiche
                            </button>
                            <a
                              href={`/api/cards/${card.publicId}/qr?format=svg&download=1`}
                              download={`adp-qr-${card.publicId}.svg`}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#222C38",
                                border: "1px solid #334050",
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                textDecoration: "none",
                              }}
                            >
                              SVG
                            </a>
                            <a
                              href={`/api/cards/${card.publicId}/qr?format=png&download=1`}
                              download={`adp-qr-${card.publicId}-bat-300dpi.png`}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#222C38",
                                border: "1px solid #334050",
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                textDecoration: "none",
                              }}
                            >
                              PNG 300 DPI
                            </a>
                            <button
                              onClick={() => handleToggleCardStatus(card.publicId, card.status)}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "transparent",
                                border: card.status === "active" ? "1px solid #E05A47" : "1px solid #4ECA8E",
                                color: card.status === "active" ? "#E05A47" : "#4ECA8E",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                              }}
                            >
                              {card.status === "active" ? "Suspendre" : "Activer"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: CREATE CARD */}
        {showCreateModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#161D26",
                borderRadius: "12px",
                border: "1px solid rgba(197, 155, 83, 0.4)",
                maxWidth: "680px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                    Création d&apos;une Nouvelle Carte Digitale ADP
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                    Attribution d&apos;une adresse pérenne et configuration de l&apos;entreprise
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#8E9AA8",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCardSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#C59B53", marginBottom: "0.3rem" }}>
                      Identifiant Public Unique * (Ex: ets-0002)
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="ets-0002"
                      value={newCardForm.publicId}
                      onChange={(e) => setNewCardForm({ ...newCardForm, publicId: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                    <div style={{ fontSize: "0.7rem", color: "#8E9AA8", marginTop: "0.2rem" }}>
                      URL : https://ateliersdepaul.com/c/{newCardForm.publicId || "..."}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Raison Sociale Entreprise *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nom de l'entreprise"
                      value={newCardForm.companyName}
                      onChange={(e) => setNewCardForm({ ...newCardForm, companyName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                    Activité Principale
                  </label>
                  <input
                    type="text"
                    value={newCardForm.activity}
                    onChange={(e) => setNewCardForm({ ...newCardForm, activity: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      backgroundColor: "#11161F",
                      border: "1px solid #334050",
                      borderRadius: "6px",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Nom du Titulaire *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Prénom NOM"
                      value={newCardForm.contactName}
                      onChange={(e) => setNewCardForm({ ...newCardForm, contactName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Fonction / Rôle *
                    </label>
                    <input
                      required
                      type="text"
                      value={newCardForm.contactRole}
                      onChange={(e) => setNewCardForm({ ...newCardForm, contactRole: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Téléphone Principal *
                    </label>
                    <input
                      required
                      type="text"
                      value={newCardForm.primaryPhone}
                      onChange={(e) => setNewCardForm({ ...newCardForm, primaryPhone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      WhatsApp Direct
                    </label>
                    <input
                      type="text"
                      value={newCardForm.whatsappPhone}
                      onChange={(e) => setNewCardForm({ ...newCardForm, whatsappPhone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Ville &amp; Pays
                    </label>
                    <input
                      type="text"
                      value={newCardForm.city}
                      onChange={(e) => setNewCardForm({ ...newCardForm, city: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Couleur Primaire Marque
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="color"
                        value={newCardForm.primaryColor}
                        onChange={(e) => setNewCardForm({ ...newCardForm, primaryColor: e.target.value })}
                        style={{ width: "40px", height: "35px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      />
                      <input
                        type="text"
                        value={newCardForm.primaryColor}
                        onChange={(e) => setNewCardForm({ ...newCardForm, primaryColor: e.target.value })}
                        style={{
                          flex: 1,
                          padding: "0.6rem 0.8rem",
                          backgroundColor: "#11161F",
                          border: "1px solid #334050",
                          borderRadius: "6px",
                          color: "#FFFFFF",
                          fontSize: "0.85rem",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "transparent",
                      border: "1px solid #334050",
                      color: "#8E9AA8",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingCard}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#C59B53",
                      color: "#11161F",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: isCreatingCard ? "wait" : "pointer",
                    }}
                  >
                    {isCreatingCard ? "Création en cours..." : "Enregistrer & Attribuer la Carte →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT CARD & PRODUCT GALLERY */}
        {editingCard && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.82)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#161D26",
                borderRadius: "12px",
                border: "1px solid rgba(197, 155, 83, 0.45)",
                maxWidth: "860px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2rem",
                boxShadow: "0 24px 60px rgba(0,0,0,0.65)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                    Édition de la Vitrine &amp; Galerie Produits — {editingCard.companyName}
                  </h2>
                  <p style={{ fontSize: "0.78rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                    Identifiant permanent verrouillé : <code style={{ color: "#C59B53" }}>/c/{editingCard.publicId}</code> (seuls des visuels authentiques autorisés doivent être renseignés)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  style={{ background: "none", border: "none", color: "#8E9AA8", fontSize: "1.25rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveEditedCard} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#C59B53", marginBottom: "0.3rem" }}>
                      URL du Logo Officiel (remplace le monogramme provisoire)
                    </label>
                    <input
                      type="text"
                      placeholder="https://... ou /assets/... (laisser vide = monogramme provisoire)"
                      value={editingCard.branding?.logoUrl || ""}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          branding: { ...editingCard.branding, logoUrl: e.target.value },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.84rem",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                      Slogan / Signature
                    </label>
                    <input
                      type="text"
                      value={editingCard.slogan || ""}
                      onChange={(e) => setEditingCard({ ...editingCard, slogan: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        backgroundColor: "#11161F",
                        border: "1px solid #334050",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "0.84rem",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                    Présentation courte de l&apos;entreprise
                  </label>
                  <textarea
                    rows={3}
                    value={editingCard.description || ""}
                    onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      backgroundColor: "#11161F",
                      border: "1px solid #334050",
                      borderRadius: "6px",
                      color: "#FFFFFF",
                      fontSize: "0.84rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div style={{ borderTop: "1px solid #222C38", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <strong style={{ color: "#C59B53", fontSize: "0.9rem" }}>
                      Galerie Commerciale &amp; Spécialités ({(editingCard.products || []).length})
                    </strong>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingCard({
                          ...editingCard,
                          products: [
                            ...(editingCard.products || []),
                            {
                              id: `prod-${Date.now()}`,
                              name: "Nouvelle spécialité",
                              category: "Spécialité",
                              description: "",
                              specs: "",
                              image: "",
                              gallery: [],
                            },
                          ],
                        })
                      }
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#222C38",
                        border: "1px solid #C59B53",
                        color: "#C59B53",
                        borderRadius: "5px",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Ajouter une spécialité
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                    {(editingCard.products || []).map((prod, pIdx) => (
                      <div
                        key={prod.id || pIdx}
                        style={{
                          backgroundColor: "#11161F",
                          border: "1px solid #283444",
                          borderRadius: "8px",
                          padding: "0.95rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.65rem",
                        }}
                      >
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0.65rem", alignItems: "center" }}>
                          <input
                            type="text"
                            placeholder="Titre (ex: Polos)"
                            value={prod.name}
                            onChange={(e) => {
                              const next = [...editingCard.products];
                              next[pIdx] = { ...next[pIdx], name: e.target.value };
                              setEditingCard({ ...editingCard, products: next });
                            }}
                            style={{ padding: "0.5rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #334050", borderRadius: "5px", color: "#FFFFFF", fontSize: "0.82rem" }}
                          />
                          <input
                            type="text"
                            placeholder="Catégorie"
                            value={prod.category}
                            onChange={(e) => {
                              const next = [...editingCard.products];
                              next[pIdx] = { ...next[pIdx], category: e.target.value };
                              setEditingCard({ ...editingCard, products: next });
                            }}
                            style={{ padding: "0.5rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #334050", borderRadius: "5px", color: "#C59B53", fontSize: "0.82rem" }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = editingCard.products.filter((_, i) => i !== pIdx);
                              setEditingCard({ ...editingCard, products: next });
                            }}
                            style={{ padding: "0.45rem 0.65rem", backgroundColor: "transparent", border: "1px solid #E05A47", color: "#E05A47", borderRadius: "5px", fontSize: "0.75rem", cursor: "pointer" }}
                          >
                            Retirer
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Description courte"
                          value={prod.description || ""}
                          onChange={(e) => {
                            const next = [...editingCard.products];
                            next[pIdx] = { ...next[pIdx], description: e.target.value };
                            setEditingCard({ ...editingCard, products: next });
                          }}
                          style={{ padding: "0.5rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #334050", borderRadius: "5px", color: "#D1C7BD", fontSize: "0.8rem" }}
                        />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                          <input
                            type="text"
                            placeholder="Spécifications (grammage, finition...)"
                            value={prod.specs || ""}
                            onChange={(e) => {
                              const next = [...editingCard.products];
                              next[pIdx] = { ...next[pIdx], specs: e.target.value };
                              setEditingCard({ ...editingCard, products: next });
                            }}
                            style={{ padding: "0.5rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #334050", borderRadius: "5px", color: "#8E9AA8", fontSize: "0.78rem" }}
                          />
                          <input
                            type="text"
                            placeholder="Photographie principale autorisée (URL — vide = placeholder identifié)"
                            value={prod.image || ""}
                            onChange={(e) => {
                              const next = [...editingCard.products];
                              next[pIdx] = { ...next[pIdx], image: e.target.value };
                              setEditingCard({ ...editingCard, products: next });
                            }}
                            style={{ padding: "0.5rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #334050", borderRadius: "5px", color: "#7DB9DC", fontSize: "0.78rem" }}
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Galerie détaillée : URLs de photos séparées par des virgules"
                          value={(prod.gallery || []).map((g) => g.url).join(", ")}
                          onChange={(e) => {
                            const urls = e.target.value
                              .split(",")
                              .map((u) => u.trim())
                              .filter(Boolean);
                            const next = [...editingCard.products];
                            next[pIdx] = {
                              ...next[pIdx],
                              gallery: urls.map((url, idx) => ({
                                id: `${prod.id}-g-${idx}`,
                                url,
                                caption: `${prod.name} — Visuel ${idx + 1}`,
                              })),
                            };
                            setEditingCard({ ...editingCard, products: next });
                          }}
                          style={{ padding: "0.45rem 0.65rem", backgroundColor: "#161D26", border: "1px solid #2A3646", borderRadius: "5px", color: "#8E9AA8", fontSize: "0.76rem" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.85rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setEditingCard(null)}
                    style={{ padding: "0.7rem 1.2rem", backgroundColor: "transparent", border: "1px solid #334050", color: "#8E9AA8", borderRadius: "6px", fontSize: "0.84rem", cursor: "pointer" }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCardEdit}
                    style={{ padding: "0.7rem 1.45rem", backgroundColor: "#C59B53", color: "#11161F", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.84rem", cursor: isSavingCardEdit ? "wait" : "pointer" }}
                  >
                    {isSavingCardEdit ? "Enregistrement..." : "Enregistrer la Vitrine & Galerie →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: BAT PRINT VERIFICATION */}
        {batModalResult && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#161D26",
                borderRadius: "12px",
                border: "2px solid #0D5C3A",
                maxWidth: "540px",
                width: "100%",
                padding: "2rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(13, 92, 58, 0.2)",
                    color: "#4ECA8E",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                  Validation BAT Impression Réussie
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#8E9AA8", margin: "0.35rem 0 0" }}>
                  Certificat de conformité pour impression physique • 300 DPI
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#11161F",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #222C38",
                  fontSize: "0.82rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <span style={{ color: "#8E9AA8" }}>Identifiant :</span>{" "}
                  <strong style={{ color: "#C59B53" }}>{batModalResult.publicId}</strong>
                </div>
                <div>
                  <span style={{ color: "#8E9AA8" }}>URL cible encodée dans le QR :</span>
                  <div style={{ fontFamily: "monospace", color: "#FFFFFF", marginTop: "0.2rem", wordBreak: "break-all" }}>
                    {batModalResult.targetUrl}
                  </div>
                </div>
                <div>
                  <span style={{ color: "#8E9AA8" }}>URL vCard direct :</span>
                  <div style={{ fontFamily: "monospace", color: "#7DB9DC", marginTop: "0.2rem", wordBreak: "break-all" }}>
                    {batModalResult.vcfUrl}
                  </div>
                </div>
                <div>
                  <span style={{ color: "#8E9AA8" }}>Statut contrôle :</span>{" "}
                  <span style={{ color: "#4ECA8E", fontWeight: 700 }}>{batModalResult.message}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <a
                  href={`/api/cards/${batModalResult.publicId}/qr?format=png&download=1`}
                  download={`adp-qr-${batModalResult.publicId}-bat-300dpi.png`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "0.75rem",
                    backgroundColor: "#0D5C3A",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                  }}
                >
                  Télécharger PNG BAT (300 DPI)
                </a>
                <button
                  onClick={() => setBatModalResult(null)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "#222C38",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

                        {/* ORDERS TAB — COMMANDES & CIRCUIT BAT */}
        {activeTab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Header des Commandes */}
            <div
              style={{
                backgroundColor: "#161D26",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #222C38",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                  Gestion des Commandes d&apos;Atelier &amp; Circuit BAT
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                  Supervision du cycle : Réception → Vérification PAO → Épreuve BAT → Validation Client → Production → Livraison.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <select
                  value={filterOrderStatus}
                  onChange={(e) => setFilterOrderStatus(e.target.value)}
                  style={{
                    padding: "0.55rem 0.85rem",
                    backgroundColor: "#11161F",
                    border: "1px solid #222C38",
                    borderRadius: "4px",
                    color: "#C59B53",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  <option value="all">Tous les statuts ({ordersList.length})</option>
                  <option value="commande_soumise">Commandes reçues</option>
                  <option value="en_cours_verification">En vérification PAO</option>
                  <option value="bat_en_attente_client">BAT en attente signature</option>
                  <option value="bat_valide_client">BAT validé client</option>
                  <option value="en_production">En production d&apos;atelier</option>
                  <option value="livree_cloturee">Livrées / Clôturées</option>
                </select>

                <button
                  type="button"
                  onClick={loadOrders}
                  style={{
                    padding: "0.55rem 0.85rem",
                    backgroundColor: "#222C38",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {isLoadingOrders ? "Actualisation..." : "Actualiser ⟳"}
                </button>
              </div>
            </div>

            {/* Avertissement Déontologique & Persistance */}
            <div style={{ padding: "0.85rem 1.25rem", backgroundColor: "rgba(197, 155, 83, 0.1)", border: "1px solid rgba(197, 155, 83, 0.3)", borderRadius: "6px", fontSize: "0.82rem", color: "#C59B53" }}>
              🔒 <strong>Persistance locale/staging :</strong> Les commandes sont conservées dans <code>src/data/orders-log.json</code>. En production finale (Étape 8), elles seront synchronisées de manière permanente avec la base relationnelle PostgreSQL.
            </div>

            {/* Liste des Commandes */}
            {ordersList.length === 0 ? (
              <div style={{ backgroundColor: "#161D26", padding: "3rem", borderRadius: "8px", border: "1px solid #222C38", textAlign: "center", color: "#8E9AA8" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📦</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.3rem" }}>
                  Aucune commande enregistrée pour le moment
                </div>
                <p style={{ fontSize: "0.82rem", maxWidth: "450px", margin: "0 auto" }}>
                  Les commandes passées depuis le panier commercial ou les configurateurs d&apos;atelier apparaîtront automatiquement ici avec leur référence CMD-2026-XXXX.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {ordersList
                  .filter((o) => filterOrderStatus === "all" || o.status === filterOrderStatus)
                  .map((order) => {
                    const isExpanded = selectedOrderRef === order.reference;
                    return (
                      <div
                        key={order.reference}
                        style={{
                          backgroundColor: "#161D26",
                          border: "1px solid #222C38",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        {/* Ligne principale commande */}
                        <div
                          style={{
                            padding: "1rem 1.25rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "1rem",
                            backgroundColor: isExpanded ? "#1A232E" : "#161D26",
                            cursor: "pointer",
                          }}
                          onClick={() => setSelectedOrderRef(isExpanded ? null : order.reference)}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.95rem", color: "#C59B53" }}>
                              {order.reference}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF" }}>
                                {order.customer.fullName} {order.customer.organization ? `(${order.customer.organization})` : ""}
                              </div>
                              <div style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>
                                {order.customer.phone} • {order.customer.city} • {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                            {/* Montant */}
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: order.grandTotalXAF ? "#4ECA8E" : "#C59B53" }}>
                                {order.grandTotalXAF ? formatCurrency(order.grandTotalXAF) : "Sur devis d'atelier"}
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "#8E9AA8" }}>
                                {order.items.length} article(s) • {order.totalItemsCount} ex.
                              </div>
                            </div>

                            {/* Badge Statut */}
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  backgroundColor:
                                    order.status === "livree_cloturee"
                                      ? "rgba(78, 202, 142, 0.2)"
                                      : order.status === "en_production"
                                      ? "rgba(197, 155, 83, 0.2)"
                                      : order.status === "bat_valide_client"
                                      ? "rgba(125, 185, 220, 0.2)"
                                      : "rgba(255, 255, 255, 0.08)",
                                  color:
                                    order.status === "livree_cloturee"
                                      ? "#4ECA8E"
                                      : order.status === "en_production"
                                      ? "#C59B53"
                                      : order.status === "bat_valide_client"
                                      ? "#7DB9DC"
                                      : "#EBE3DB",
                                }}
                              >
                                {order.status === "commande_soumise" && "📥 Reçue"}
                                {order.status === "en_cours_verification" && "🔍 Contrôle PAO"}
                                {order.status === "bat_en_attente_client" && "⏳ BAT en attente signature"}
                                {order.status === "bat_valide_client" && "✅ BAT Validé Client"}
                                {order.status === "en_production" && "⚙️ En Fabrication"}
                                {order.status === "expediee" && "🚚 Expédiée"}
                                {order.status === "livree_cloturee" && "🏁 Livrée & Clôturée"}
                              </span>
                            </div>

                            <span style={{ color: "#8E9AA8", fontSize: "0.85rem" }}>
                              {isExpanded ? "▲" : "▼"}
                            </span>
                          </div>
                        </div>

                        {/* Volet déroulant détaillé de la commande */}
                        {isExpanded && (
                          <div style={{ padding: "1.25rem", borderTop: "1px solid #222C38", backgroundColor: "#11161F" }}>
                            {/* Détail des articles commandés */}
                            <div style={{ marginBottom: "1.5rem" }}>
                              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#C59B53", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
                                Articles &amp; Configurations d&apos;Atelier
                              </h4>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {order.items.map((it, idx) => (
                                  <div
                                    key={it.id || idx}
                                    style={{
                                      padding: "0.75rem 1rem",
                                      backgroundColor: "#161D26",
                                      borderRadius: "6px",
                                      border: "1px solid #222C38",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#FFFFFF" }}>
                                        {it.productName} ({it.quantity} ex.)
                                      </div>
                                      <div style={{ fontSize: "0.75rem", color: "#8E9AA8", marginTop: "0.25rem" }}>
                                        {it.selectedOptionLabels &&
                                          Object.entries(it.selectedOptionLabels).map(([k, v]) => (
                                            <span key={k} style={{ marginRight: "1rem" }}>
                                              <strong>{k} :</strong> {v}
                                            </span>
                                          ))}
                                      </div>
                                      {it.needsDesignService && (
                                        <div style={{ color: "#4ECA8E", fontSize: "0.75rem", marginTop: "0.2rem" }}>
                                          ✓ Prestation graphique demandée
                                        </div>
                                      )}
                                      {it.clientFileName && (
                                        <div style={{ color: "#7DB9DC", fontSize: "0.75rem", marginTop: "0.2rem" }}>
                                          📎 Fichier client : {it.clientFileName}
                                        </div>
                                      )}
                                    </div>

                                    <div style={{ fontWeight: 700, color: "#C59B53", fontSize: "0.88rem" }}>
                                      {it.totalPriceXAF ? formatCurrency(it.totalPriceXAF) : "Sur devis"}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Circuit BAT & Actions de Statut */}
                            <div style={{ backgroundColor: "#161D26", padding: "1.25rem", borderRadius: "6px", border: "1px solid #222C38", marginBottom: "1rem" }}>
                              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#C59B53", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
                                Circuit de Validation BAT (Épreuve Contractuelle)
                              </h4>
                              <div style={{ fontSize: "0.78rem", color: "#A3B1C2", marginBottom: "1rem" }}>
                                Version BAT actuelle : <strong>v{order.currentBATVersion}</strong> • Décision :{" "}
                                <strong style={{ color: order.status === "bat_valide_client" ? "#4ECA8E" : "#C59B53" }}>
                                  {order.batHistory[0]?.decision || "en_attente"}
                                </strong>
                              </div>

                              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(order.reference, "en_cours_verification")}
                                  style={{ padding: "0.45rem 0.85rem", backgroundColor: "#222C38", color: "#FFFFFF", border: "1px solid #334050", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
                                >
                                  1. Passer en Contrôle PAO
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(order.reference, "bat_en_attente_client", "en_attente")}
                                  style={{ padding: "0.45rem 0.85rem", backgroundColor: "#222C38", color: "#C59B53", border: "1px solid #C59B53", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontWeight: 600 }}
                                >
                                  2. Émettre le BAT Client (v{order.currentBATVersion})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(order.reference, "bat_valide_client", "approuve")}
                                  style={{ padding: "0.45rem 0.85rem", backgroundColor: "rgba(78, 202, 142, 0.2)", color: "#4ECA8E", border: "1px solid #4ECA8E", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                                >
                                  3. Valider le BAT (Signature Client)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(order.reference, "en_production")}
                                  style={{ padding: "0.45rem 0.85rem", backgroundColor: "#C59B53", color: "#11161F", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                                >
                                  4. Lancer en Fabrication d&apos;Atelier
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(order.reference, "livree_cloturee")}
                                  style={{ padding: "0.45rem 0.85rem", backgroundColor: "#0D5C3A", color: "#FFFFFF", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                                >
                                  5. Marquer Livrée &amp; Clôturée
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ONGLET 3B : BRIEFS CLIENTS & INSCRIPTIONS ACADEMY */}
        {activeTab === "briefs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.25rem" }}>
                  Supervision des Expressions de Besoins &amp; Candidatures
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#8E9AA8", margin: 0 }}>
                  Dossiers collectés via le parcours interactif ADP Brief et pré-inscriptions ADP Academy.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.78rem", padding: "4px 10px", backgroundColor: "#1A222D", border: "1px solid #334050", borderRadius: "4px", color: "#C59B53" }}>
                  📋 {briefsList.length} brief(s)
                </span>
                <span style={{ fontSize: "0.78rem", padding: "4px 10px", backgroundColor: "#1A222D", border: "1px solid #334050", borderRadius: "4px", color: "#4ECA8E" }}>
                  🎓 {academyList.length} inscription(s)
                </span>
              </div>
            </div>

            {/* Avertissement persistance */}
            <div style={{ padding: "0.85rem 1.25rem", backgroundColor: "rgba(197, 155, 83, 0.08)", border: "1px solid rgba(197, 155, 83, 0.3)", borderRadius: "6px", fontSize: "0.82rem", color: "#CBD5E1" }}>
              🔒 <strong>Persistance locale/staging :</strong> Les briefs et candidatures sont enregistrés dans <code>src/data/briefs-log.json</code> et <code>src/data/academy-log.json</code>. La persistance définitive sur base PostgreSQL sera déployée à l&apos;Étape 8.
            </div>

            {/* SECTION 1 : BRIEFS */}
            <div style={{ backgroundColor: "#161D26", border: "1px solid #222C38", borderRadius: "8px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#C59B53", margin: 0 }}>
                  📋 Dossiers ADP Brief ({briefsList.length})
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>Source : /api/briefs</span>
              </div>

              {briefsList.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#8E9AA8" }}>
                  Aucun dossier de brief enregistré pour le moment. Testez le questionnaire sur <a href="/adp-brief" target="_blank" style={{ color: "#C59B53" }}>/adp-brief</a>.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {briefsList.map((b: any) => (
                    <div
                      key={b.reference}
                      style={{
                        backgroundColor: "#0F141C",
                        border: "1px solid #222C38",
                        borderRadius: "6px",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                        <div>
                          <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#C59B53", fontSize: "0.95rem" }}>
                            {b.reference}
                          </span>
                          <span style={{ fontSize: "0.8rem", color: "#8E9AA8", marginLeft: "0.75rem" }}>
                            {new Date(b.createdAt).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        <span style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, backgroundColor: "rgba(197, 155, 83, 0.15)", color: "#C59B53" }}>
                          {b.status || "reçu"}
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", fontSize: "0.85rem" }}>
                        <div>
                          <span style={{ color: "#8E9AA8", display: "block" }}>Domaine :</span>
                          <strong style={{ color: "#FFFFFF" }}>{b.domainLabel}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#8E9AA8", display: "block" }}>Commanditaire :</span>
                          <strong style={{ color: "#FFFFFF" }}>{b.customer?.fullName}</strong> ({b.customer?.phone})
                        </div>
                        <div>
                          <span style={{ color: "#8E9AA8", display: "block" }}>Objectif :</span>
                          <span style={{ color: "#CBD5E1" }}>{b.objective}</span>
                        </div>
                        <div>
                          <span style={{ color: "#8E9AA8", display: "block" }}>Échelle &amp; Ville :</span>
                          <span style={{ color: "#CBD5E1" }}>{b.scaleOrSize} — {b.location}</span>
                        </div>
                      </div>

                      {b.documentsAvailable && b.documentsAvailable.length > 0 && (
                        <div style={{ fontSize: "0.78rem", color: "#8E9AA8", borderTop: "1px solid #1A222D", paddingTop: "0.5rem" }}>
                          <strong>Documents identifiés :</strong> {b.documentsAvailable.join(", ")}
                        </div>
                      )}

                      {/* Actions Administrateur Brief */}
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", borderTop: "1px solid #1A222D", paddingTop: "0.6rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>Changer le statut :</span>
                        <select
                          defaultValue={b.status || "reçu"}
                          onChange={(e) => handleUpdateBriefStatus(b.reference, e.target.value)}
                          style={{
                            padding: "3px 8px",
                            backgroundColor: "#161D26",
                            border: "1px solid #334050",
                            borderRadius: "4px",
                            color: "#C59B53",
                            fontSize: "0.75rem",
                          }}
                        >
                          <option value="reçu">1. Reçu</option>
                          <option value="en_cours_analyse">2. En cours d&apos;analyse</option>
                          <option value="echange_programme">3. Échange programmé</option>
                          <option value="devis_transmis">4. Devis transmis</option>
                          <option value="cloture">5. Dossier clôturé</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 2 : CANDIDATURES ACADEMY */}
            <div style={{ backgroundColor: "#161D26", border: "1px solid #222C38", borderRadius: "8px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#C59B53", margin: 0 }}>
                  🎓 Candidatures ADP Academy ({academyList.length})
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>Source : /api/academy</span>
              </div>

              {academyList.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#8E9AA8" }}>
                  Aucune pré-inscription enregistrée. Testez le formulaire sur <a href="/adp-academy" target="_blank" style={{ color: "#C59B53" }}>/adp-academy</a>.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {academyList.map((a: any) => (
                    <div
                      key={a.reference}
                      style={{
                        backgroundColor: "#0F141C",
                        border: "1px solid #222C38",
                        borderRadius: "6px",
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#C59B53" }}>{a.reference}</span>
                          <span style={{ fontSize: "0.85rem", color: "#FFFFFF", fontWeight: 600 }}>{a.courseTitle}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#8E9AA8" }}>
                          Candidat : <strong>{a.candidateName}</strong> • {a.phone} • {a.formatPreference === "presentiel_atelier" ? "Présentiel Atelier" : "Visio interactive"}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <select
                          defaultValue={a.status || "pre_inscription_recue"}
                          onChange={(e) => handleUpdateAcademyStatus(a.reference, e.target.value)}
                          style={{
                            padding: "3px 8px",
                            backgroundColor: "#161D26",
                            border: "1px solid #334050",
                            borderRadius: "4px",
                            color: "#4ECA8E",
                            fontSize: "0.75rem",
                          }}
                        >
                          <option value="pre_inscription_recue">1. Pré-inscription reçue</option>
                          <option value="examen_dossier">2. Examen dossier</option>
                          <option value="entretien_orientation">3. Entretien d&apos;orientation</option>
                          <option value="session_planifiee">4. Session planifiée</option>
                          <option value="terminee">5. Formation validée</option>
                        </select>

                        <span style={{ padding: "3px 8px", borderRadius: "4px", fontSize: "0.72rem", backgroundColor: "rgba(78, 202, 142, 0.15)", color: "#4ECA8E", fontWeight: 700 }}>
                          {a.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CATALOG TAB — ADP STUDIO 2026 */}
        {activeTab === "catalog" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Catalog Header & Filters */}
            <div
              style={{
                backgroundColor: "#161D26",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #222C38",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                  Catalogue Commercial ADP Studio 2026
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#8E9AA8", margin: "0.25rem 0 0" }}>
                  16 produits certifiés • 6 familles • 12 sous-catégories • 100% fiches techniques &amp; PAO actives
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Rechercher un produit, référence..."
                  value={searchCatalog}
                  onChange={(e) => setSearchCatalog(e.target.value)}
                  style={{
                    padding: "0.55rem 0.85rem",
                    backgroundColor: "#11161F",
                    border: "1px solid #222C38",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    fontSize: "0.82rem",
                    minWidth: "220px",
                  }}
                />

                <select
                  value={selectedCatalogFamily}
                  onChange={(e) => setSelectedCatalogFamily(e.target.value)}
                  style={{
                    padding: "0.55rem 0.85rem",
                    backgroundColor: "#11161F",
                    border: "1px solid #222C38",
                    borderRadius: "4px",
                    color: "#C59B53",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  <option value="all">Toutes les familles ({STUDIO_PRODUCTS.length})</option>
                  {STUDIO_FAMILIES.map((fam) => (
                    <option key={fam.id} value={fam.id}>
                      {fam.name}
                    </option>
                  ))}
                </select>

                <Link
                  href="/adp-studio"
                  target="_blank"
                  style={{
                    padding: "0.55rem 1rem",
                    backgroundColor: "#C59B53",
                    color: "#11161F",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Voir catalogue public ↗
                </Link>
              </div>
            </div>

            {/* Products Table */}
            <div style={{ backgroundColor: "#161D26", borderRadius: "8px", border: "1px solid #222C38", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#11161F", borderBottom: "1px solid #222C38", color: "#8E9AA8", textAlign: "left" }}>
                    <th style={{ padding: "0.85rem 1rem" }}>Réf.</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Produit Commercial</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Famille &amp; Sous-Catégorie</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Groupes d&apos;Options</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Conformité PAO</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Ponts Métiers</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDIO_PRODUCTS.filter((p) => {
                    const matchFamily = selectedCatalogFamily === "all" || p.familyId === selectedCatalogFamily;
                    const matchSearch =
                      !searchCatalog ||
                      p.name.toLowerCase().includes(searchCatalog.toLowerCase()) ||
                      p.id.toLowerCase().includes(searchCatalog.toLowerCase()) ||
                      p.subtitle.toLowerCase().includes(searchCatalog.toLowerCase());
                    return matchFamily && matchSearch;
                  }).map((prod) => {
                    const family = STUDIO_FAMILIES.find((f) => f.id === prod.familyId);
                    return (
                      <tr key={prod.id} style={{ borderBottom: "1px solid #1C2430" }}>
                        <td style={{ padding: "0.85rem 1rem", fontFamily: "monospace", color: "#C59B53", fontWeight: 700 }}>
                          {prod.id}
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF" }}>{prod.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>{prod.subtitle}</div>
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div style={{ color: "#C59B53", fontWeight: 600 }}>{family?.name}</div>
                          <div style={{ fontSize: "0.74rem", color: "#6A7785" }}>{prod.subCategoryId}</div>
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "2px 8px",
                              backgroundColor: "rgba(197, 155, 83, 0.15)",
                              color: "#C59B53",
                              borderRadius: "4px",
                              fontWeight: 600,
                              fontSize: "0.74rem",
                            }}
                          >
                            {prod.configurationOptions.length} groupe(s)
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          {prod.artworkSpecs ? (
                            <span style={{ color: "#4ECA8E", fontWeight: 600, fontSize: "0.75rem" }}>
                              ✅ PAO &amp; Traits de coupe
                            </span>
                          ) : (
                            <span style={{ color: "#E05A47", fontSize: "0.75rem" }}>Incomplet</span>
                          )}
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                            {prod.digitalCardBridge && (
                              <span
                                style={{
                                  padding: "2px 6px",
                                  backgroundColor: "rgba(13, 92, 58, 0.3)",
                                  color: "#4ECA8E",
                                  borderRadius: "3px",
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                }}
                              >
                                📇 Digital Card
                              </span>
                            )}
                            {prod.relatedProjectSlugs && prod.relatedProjectSlugs.length > 0 && (
                              <span
                                style={{
                                  padding: "2px 6px",
                                  backgroundColor: "rgba(125, 185, 220, 0.15)",
                                  color: "#7DB9DC",
                                  borderRadius: "3px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                🏛️ {prod.relatedProjectSlugs[0]}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                          <Link
                            href={`/adp-studio/produit/${prod.slug}`}
                            target="_blank"
                            style={{
                              display: "inline-block",
                              padding: "4px 8px",
                              backgroundColor: "#222C38",
                              color: "#C59B53",
                              borderRadius: "4px",
                              textDecoration: "none",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            Fiche publique ↗
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Filtrer un projet ou une ville..."
                value={searchProject}
                onChange={(e) => setSearchProject(e.target.value)}
                style={{
                  padding: "0.6rem 1rem",
                  backgroundColor: "#161D26",
                  border: "1px solid #222C38",
                  borderRadius: "6px",
                  color: "#FFFFFF",
                  fontSize: "0.85rem",
                  width: "300px",
                }}
              />

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["all", "Commerce", "Résidentiel", "Équipement Public", "Bureaux"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTypology(t)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: selectedTypology === t ? "#C59B53" : "#161D26",
                      color: selectedTypology === t ? "#11161F" : "#8E9AA8",
                      border: "1px solid #222C38",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: selectedTypology === t ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {t === "all" ? "Toutes typologies" : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtres de Contexte Déontologique ONAC */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#8E9AA8" }}>Gouvernance :</span>
              {[
                { id: "all", label: "Tous les contextes (37)" },
                { id: "adp", label: "📐 Projets d'Atelier ADP" },
                { id: "barlabarla", label: "🏛️ Cabinet Partenaire (BARLABARLA)" },
                { id: "collaboration", label: "🤝 Collaborations" },
                { id: "etudes", label: "✏️ Études Libres" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProjectAttributionFilter(c.id)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    backgroundColor: projectAttributionFilter === c.id ? "#1A222D" : "#11161F",
                    color: projectAttributionFilter === c.id ? "#C59B53" : "#8E9AA8",
                    border: `1px solid ${projectAttributionFilter === c.id ? "#C59B53" : "#222C38"}`,
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                    fontWeight: projectAttributionFilter === c.id ? 700 : 500,
                    cursor: "pointer",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div style={{ backgroundColor: "#161D26", borderRadius: "8px", border: "1px solid #222C38", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #222C38", textAlign: "left", color: "#8E9AA8" }}>
                    <th style={{ padding: "0.75rem 1rem" }}>Code</th>
                    <th style={{ padding: "0.75rem 1rem" }}>Titre du Projet &amp; Cadre ONAC</th>
                    <th style={{ padding: "0.75rem 1rem" }}>Typologie</th>
                    <th style={{ padding: "0.75rem 1rem" }}>Ville &amp; Année</th>
                    <th style={{ padding: "0.75rem 1rem" }}>Statut Réel</th>
                    <th style={{ padding: "0.75rem 1rem" }}>À la une</th>
                    <th style={{ padding: "0.75rem 1rem" }}>Fiche</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => {
                    const isFeat = featuredProjectsSet.has(p.slug);
                    const entity = getProjectResponsibleEntity ? getProjectResponsibleEntity(p) : (p.responsibleEntity || "Personnel");
                    return (
                      <tr key={p.slug} style={{ borderBottom: "1px solid #1E2633" }}>
                        <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "#C59B53" }}>{p.slug}</td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF" }}>{p.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "#8E9AA8", marginTop: "0.2rem" }}>
                            {entity === "BARLABARLA" && "🏛️ Cabinet Partenaire BARLABARLA (ONAC)"}
                            {entity === "Personnel" && "📐 Étude d'Atelier Paul Boubert / ADP"}
                            {entity === "Collaboration" && "🤝 Collaboration professionnelle"}
                            {entity === "Autre cabinet" && "🏢 Étude en cabinet tiers"}
                          </div>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#8E9AA8" }}>{p.typology}</td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          {p.location} ({p.year})
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span
                            style={{
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              backgroundColor: p.status === "Réalisé" ? "rgba(13, 92, 58, 0.2)" : "rgba(197, 155, 83, 0.2)",
                              color: p.status === "Réalisé" ? "#4ECA8E" : "#C59B53",
                            }}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(p.slug)}
                            style={{
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              backgroundColor: isFeat ? "rgba(197, 155, 83, 0.2)" : "rgba(255, 255, 255, 0.05)",
                              color: isFeat ? "#C59B53" : "#8E9AA8",
                              border: `1px solid ${isFeat ? "#C59B53" : "#334050"}`,
                              cursor: "pointer",
                            }}
                          >
                            {isFeat ? "★ À la une" : "☆ Standard"}
                          </button>
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <Link
                            href={`/paul/projet/${p.slug}`}
                            target="_blank"
                            style={{ color: "#7DB9DC", textDecoration: "none", fontSize: "0.8rem" }}
                          >
                            Fiche publique ↗
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUOTES TAB */}
        {activeTab === "quotes" && (
          <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "#FFFFFF" }}>
              Registre des Demandes de Devis ({quotesList.length})
            </h2>
            {quotesList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#8E9AA8" }}>
                Aucune demande enregistrée pour le moment. Testez le tiroir latéral depuis le site public.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {quotesList.map((q, idx) => {
                  const clientName = q.clientMasked?.name || q.client?.name || "Client";
                  const clientPhone = q.clientMasked?.phoneMasked || q.client?.phone || "N/A";
                  return (
                    <div
                      key={q.reference || idx}
                      style={{
                        padding: "1rem",
                        backgroundColor: "#11161F",
                        borderRadius: "6px",
                        border: "1px solid #222C38",
                        borderLeft: "4px solid #C59B53",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <span style={{ fontFamily: "monospace", color: "#C59B53", fontWeight: 700, fontSize: "0.9rem" }}>
                            {q.reference}
                          </span>
                          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginTop: "0.2rem" }}>
                            {q.project?.name || "Projet"} • {clientName} ({clientPhone})
                          </div>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#8E9AA8" }}>
                          {new Date(q.createdAt).toLocaleString("fr-FR")}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.82rem", color: "#8E9AA8", marginTop: "0.5rem" }}>
                        Prestations : {(q.services || []).map((s: QuoteServiceItem) => s.title || "Prestation").join(", ")}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === "media" && (
          <div style={{ backgroundColor: "#161D26", padding: "1.5rem", borderRadius: "8px", border: "1px solid #222C38" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "#FFFFFF" }}>
              Médiathèque Certifiée ({Object.keys(PROJECTS_MEDIA).length} dossiers projets)
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
              {Object.values(PROJECTS_MEDIA).map((item) => {
                const coverUrl = item.cover?.url || "/assets/placeholders/project-placeholder.svg";
                return (
                  <div
                    key={item.folder}
                    style={{
                      backgroundColor: "#11161F",
                      borderRadius: "6px",
                      border: "1px solid #222C38",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", height: "130px", backgroundColor: "#0E131A" }}>
                      <Image
                        src={coverUrl}
                        alt={item.folder}
                        fill
                        sizes="240px"
                        unoptimized
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "0.75rem" }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFFFFF" }}>{item.folder}</div>
                      <div style={{ fontSize: "0.74rem", color: "#8E9AA8", marginTop: "0.2rem" }}>
                        {item.gallery.length} visuel(s) HD
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BACKUP TAB */}
        {activeTab === "backup" && (
          <div style={{ backgroundColor: "#161D26", padding: "2rem", borderRadius: "8px", border: "1px solid #222C38", maxWidth: "700px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Sauvegarde Complète &amp; Exports JSON
            </h2>
            <p style={{ color: "#8E9AA8", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Exportez instantanément l&apos;intégralité des 37 projets certifiés, des 7 univers, du catalogue de prestations, des cartes professionnelles et du registre des devis dans des instantanés JSON conformes.
            </p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const fullDump = {
                    timestamp: new Date().toISOString(),
                    version: "1.0.0-rc2",
                    projects: ALL_PROJECTS,
                    universes: UNIVERSES,
                    services: SERVICES_CATALOG,
                    quotes: quotesList,
                    digitalCards: cardsList,
                  };
                  const blob = new Blob([JSON.stringify(fullDump, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `adp-backup-global-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                }}
                style={{
                  padding: "0.85rem 1.5rem",
                  backgroundColor: "#C59B53",
                  color: "#11161F",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                📥 Télécharger l&apos;Archive Globale ADP (.json)
              </button>

              <button
                onClick={handleExportCardsBackup}
                style={{
                  padding: "0.85rem 1.5rem",
                  backgroundColor: "#222C38",
                  color: "#FFFFFF",
                  border: "1px solid #334050",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                📥 Backup Dédié Cartes Pro (.json)
              </button>

              <a
                href="/api/admin/database/export-sql"
                download="adp-database-full-dump.sql"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.85rem 1.5rem",
                  backgroundColor: "#0D5C3A",
                  color: "#FFFFFF",
                  border: "1px solid #4ECA8E",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                📥 Télécharger l&apos;Archive SQL Complète (.sql)
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
