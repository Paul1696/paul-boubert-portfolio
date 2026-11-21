"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PROJECTS } from "@/data/all-projects";
import { UNIVERSES } from "@/data/universes";
import { SERVICES_CATALOG } from "@/data/services-catalog";
import { PROJECTS_MEDIA } from "@/data/media-manifest";

type AdminTab = "overview" | "projects" | "quotes" | "media" | "backup";

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
  const [searchProject, setSearchProject] = useState("");
  const [selectedTypology, setSelectedTypology] = useState("all");

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

  // 2. Fetch protected quotes ONLY after server-verified authentication
  useEffect(() => {
    if (!isAuthenticated) {
      setQuotesList([]);
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
  }, [isAuthenticated]);

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
  };

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchTypology = selectedTypology === "all" || p.typology === selectedTypology;
      const matchQuery =
        !searchProject ||
        p.title.toLowerCase().includes(searchProject.toLowerCase()) ||
        p.location.toLowerCase().includes(searchProject.toLowerCase());
      return matchTypology && matchQuery;
    });
  }, [selectedTypology, searchProject]);

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "overview", label: "📊 Vue d'Ensemble" },
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
              backgroundColor: "rgba(255, 255, 255, 0.08)",
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
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "2rem", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {[
                { label: "Projets Réels Certifiés", value: ALL_PROJECTS.length, sub: "Fonds documentaire Legacy", color: "#7DB9DC" },
                { label: "Univers Professionnels", value: UNIVERSES.length, sub: "De ADP Brief à Rosbri Wax", color: "#E68AB3" },
                { label: "Prestations Actives", value: SERVICES_CATALOG.length, sub: "Sur les 7 pôles métiers", color: "#B1CE9A" },
                { label: "Demandes de Devis", value: quotesList.length, sub: "Archivées dans le registre", color: "#C59B53" },
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
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["all", "Tertiaire", "Résidentiel", "Hôtellerie", "Commerce", "Équipement"].map((typ) => (
                  <button
                    key={typ}
                    onClick={() => setSelectedTypology(typ)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: selectedTypology === typ ? "#C59B53" : "#1A222D",
                      color: selectedTypology === typ ? "#11161F" : "#8E9AA8",
                      fontWeight: 600,
                    }}
                  >
                    {typ}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#161D26", borderRadius: "8px", border: "1px solid #222C38", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #222C38", textAlign: "left", color: "#8E9AA8" }}>
                    <th style={{ padding: "0.75rem 1rem" }}>Titre du Projet</th>
                    <th style={{ padding: "0.75rem" }}>Typologie</th>
                    <th style={{ padding: "0.75rem" }}>Localisation</th>
                    <th style={{ padding: "0.75rem" }}>Année</th>
                    <th style={{ padding: "0.75rem" }}>LOD BIM</th>
                    <th style={{ padding: "0.75rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #1E2633" }}>
                      <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#FFFFFF" }}>{p.title}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <span style={{ color: p.accentColor, fontWeight: 600 }}>{p.typology}</span>
                      </td>
                      <td style={{ padding: "0.75rem", color: "#8E9AA8" }}>{p.location}</td>
                      <td style={{ padding: "0.75rem", fontFamily: "monospace" }}>{p.year}</td>
                      <td style={{ padding: "0.75rem", color: "#C59B53" }}>{p.bimLOD || "LOD 300"}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <Link
                          href={`/portfolio/${p.slug}`}
                          target="_blank"
                          style={{ color: "#7DB9DC", textDecoration: "none", fontSize: "0.8rem" }}
                        >
                          Fiche publique ↗
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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

        {activeTab === "backup" && (
          <div style={{ backgroundColor: "#161D26", padding: "2rem", borderRadius: "8px", border: "1px solid #222C38", maxWidth: "700px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Sauvegarde Complète &amp; Export JSON
            </h2>
            <p style={{ color: "#8E9AA8", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Exportez instantanément l&apos;intégralité des 37 projets certifiés, des 7 univers, du catalogue de prestations et du registre des devis dans un instantané JSON conforme.
            </p>

            <button
              onClick={() => {
                const fullDump = {
                  timestamp: new Date().toISOString(),
                  version: "1.0.0-rc2",
                  projects: ALL_PROJECTS,
                  universes: UNIVERSES,
                  services: SERVICES_CATALOG,
                  quotes: quotesList,
                };
                const blob = new Blob([JSON.stringify(fullDump, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `adp-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
              }}
              style={{
                marginTop: "1.5rem",
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
              📥 Télécharger l&apos;Archive JSON Complète
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
