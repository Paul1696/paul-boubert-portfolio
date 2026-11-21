"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { EditorialArticle } from "@/data/articles";

interface ActualitesClientViewProps {
  initialArticles: EditorialArticle[];
}

const CATEGORIES = [
  "Toutes",
  "Recherche Tropicale",
  "BIM & Digital",
  "Textile & Wax",
  "Vie d'Atelier",
] as const;

export default function ActualitesClientView({ initialArticles }: ActualitesClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchCategory =
        selectedCategory === "Toutes" || article.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, consent: true }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage("Merci ! Votre inscription à la lettre de l'atelier est confirmée.");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.error || "Une erreur est survenue.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div>
      {/* Search and filters bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {/* Categories */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                border: "1px solid",
                borderColor:
                  selectedCategory === cat ? "#9E7D2B" : "rgba(194, 155, 56, 0.25)",
                backgroundColor:
                  selectedCategory === cat ? "#9E7D2B" : "var(--color-surface, #FFFFFF)",
                color: selectedCategory === cat ? "#FFFFFF" : "var(--color-text, #1A1917)",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="search"
            placeholder="Rechercher par mot-clé, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.25rem",
              borderRadius: "8px",
              border: "1px solid rgba(194, 155, 56, 0.3)",
              backgroundColor: "var(--color-surface, #FFFFFF)",
              color: "var(--color-text, #1A1917)",
              fontSize: "0.875rem",
              outline: "none",
            }}
          />
          <svg
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "16px",
              height: "16px",
              color: "#9E7D2B",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            backgroundColor: "var(--color-surface, #FFFFFF)",
            borderRadius: "12px",
            border: "1px dashed rgba(194, 155, 56, 0.4)",
          }}
        >
          <p style={{ fontSize: "1.125rem", color: "var(--color-text-muted, #5A564E)" }}>
            Aucun article ne correspond à votre recherche.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Toutes");
              setSearchQuery("");
            }}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.25rem",
              backgroundColor: "#9E7D2B",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--color-surface, #FFFFFF)",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(194, 155, 56, 0.2)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {/* Cover Image */}
              <Link
                href={`/actualites/${article.slug}`}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  display: "block",
                  backgroundColor: "#EFECE4",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px)"
                  style={{ objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(26, 25, 23, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "#EFECE4",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {article.category}
                </span>
              </Link>

              {/* Card Body */}
              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted, #7A756B)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span>{new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                    <span>•</span>
                    <span>{article.readingTime} de lecture</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif, Georgia, serif)",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                      color: "var(--color-text, #1A1917)",
                    }}
                  >
                    <Link
                      href={`/actualites/${article.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-muted, #5A564E)",
                      lineHeight: 1.55,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer info & link */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.7rem",
                          backgroundColor: "#F4F1EA",
                          color: "#5A564E",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(194, 155, 56, 0.15)",
                      paddingTop: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text, #1A1917)" }}>
                      {article.author.name}
                    </span>
                    <Link
                      href={`/actualites/${article.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#9E7D2B",
                        textDecoration: "none",
                      }}
                    >
                      Lire l&apos;article
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter Section */}
      <section
        style={{
          marginTop: "5rem",
          padding: "3.5rem 2rem",
          backgroundColor: "#1A1917",
          color: "#F9F8F5",
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid rgba(194, 155, 56, 0.3)",
        }}
      >
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#C29B38",
              fontWeight: 700,
            }}
          >
            La Lettre de l&apos;Atelier
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 400,
              marginTop: "0.5rem",
              marginBottom: "1rem",
              color: "#FFFFFF",
            }}
          >
            Recevez nos carnets de recherche & manifestes
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#BDB8AE",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Une publication mensuelle consacrée à l&apos;architecture tropicale, aux innovations de chantier, à l&apos;art du wax et aux réflexions d&apos;atelier. Zéro spam, désinscription en un clic.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              required
              placeholder="votre.courriel@domaine.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: "1 1 260px",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid rgba(194, 155, 56, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={newsletterStatus === "loading"}
              style={{
                padding: "0.75rem 1.75rem",
                backgroundColor: "#C29B38",
                color: "#1A1917",
                fontWeight: 600,
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              {newsletterStatus === "loading" ? "Inscription..." : "S'abonner"}
            </button>
          </form>

          {newsletterMessage && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.875rem",
                color: newsletterStatus === "success" ? "#4ADE80" : "#F87171",
              }}
            >
              {newsletterMessage}
            </p>
          )}

          <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#8E887D" }}>
            Conformité RGPD. Vous pouvez vous désinscrire à tout moment via notre formulaire de désabonnement.
          </p>
        </div>
      </section>
    </div>
  );
}
