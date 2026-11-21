import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  EDITORIAL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import ArticleShareBar from "./ArticleShareBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDITORIAL_ARTICLES.filter((a) => a.status === "published").map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article non trouve | Les Ateliers de Paul" };
  }

  return {
    title: `${article.title} | Les Ateliers de Paul`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 2);

  return (
    <article
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg, #F9F8F5)",
        paddingBottom: "6rem",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "2rem 1.5rem 1rem",
          fontSize: "0.85rem",
          color: "var(--color-text-muted, #7A756B)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Accueil
        </Link>
        <span>/</span>
        <Link href="/actualites" style={{ color: "inherit", textDecoration: "none" }}>
          Actualites
        </Link>
        <span>/</span>
        <span style={{ color: "#9E7D2B", fontWeight: 500 }}>{article.category}</span>
      </div>

      <header
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 3rem",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#9E7D2B",
              fontWeight: 700,
            }}
          >
            {article.category}
          </span>
          <span style={{ width: "24px", height: "1px", backgroundColor: "#9E7D2B" }}></span>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted, #7A756B)" }}>
            {article.readingTime} de lecture
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "var(--color-text, #1A1917)",
            marginBottom: "1.5rem",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: 1.6,
            color: "var(--color-text-muted, #4A463E)",
            fontStyle: "italic",
            marginBottom: "2rem",
            borderLeft: "3px solid #9E7D2B",
            paddingLeft: "1.25rem",
          }}
        >
          {article.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(194, 155, 56, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#1A1917",
                color: "#EFECE4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                border: "2px solid #C29B38",
              }}
            >
              PB
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--color-text, #1A1917)" }}>
                {article.author.name}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted, #7A756B)" }}>
                {article.author.role} • Publie le{" "}
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <ArticleShareBar title={article.title} slug={article.slug} />
        </div>
      </header>

      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto 3.5rem",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(300px, 50vw, 520px)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#EFECE4",
          }}
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1120px"
            style={{ objectFit: "cover" }}
          />
        </div>
        {article.coverCaption && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted, #7A756B)",
              fontStyle: "italic",
              marginTop: "0.75rem",
              textAlign: "center",
            }}
          >
            {article.coverCaption}
          </p>
        )}
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 1.5rem",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "var(--color-text, #2C2A26)",
        }}
      >
        <p style={{ fontSize: "1.2rem", fontWeight: 400, marginBottom: "2.5rem" }}>
          {article.content.intro}
        </p>

        {article.content.sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "var(--color-text, #1A1917)",
                marginBottom: "1.25rem",
              }}
            >
              {section.heading}
            </h2>

            {section.body.map((p, pIdx) => (
              <p key={pIdx} style={{ marginBottom: "1.25rem" }}>
                {p}
              </p>
            ))}

            {section.callout && (
              <div
                style={{
                  margin: "2rem 0",
                  padding: "1.5rem",
                  backgroundColor: "rgba(194, 155, 56, 0.08)",
                  borderLeft: "4px solid #C29B38",
                  borderRadius: "0 8px 8px 0",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "#3A342B",
                }}
              >
                <strong>Constat d atelier :</strong> {section.callout}
              </div>
            )}
          </section>
        ))}

        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            backgroundColor: "#F4F1EA",
            borderRadius: "12px",
            border: "1px solid rgba(194, 155, 56, 0.2)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "1.35rem",
              color: "#1A1917",
              marginBottom: "0.75rem",
            }}
          >
            En conclusion
          </h3>
          <p style={{ margin: 0, fontStyle: "italic" }}>{article.content.conclusion}</p>
        </div>

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#7A756B" }}>
            Thematiques :
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.8rem",
                backgroundColor: "#EFECE4",
                color: "#1A1917",
                padding: "0.25rem 0.6rem",
                borderRadius: "4px",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid rgba(194, 155, 56, 0.3)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
          }}
        >
          <h4
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#9E7D2B",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Campagne Editoriale Multi-Formats
          </h4>
          <p style={{ fontSize: "0.85rem", color: "#6A665E", marginBottom: "1.25rem" }}>
            Contenu harmonise pour l ecosysteme numerique des Ateliers de Paul :
          </p>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "#F9F8F5",
                borderRadius: "6px",
                borderLeft: "3px solid #0A66C2",
                fontSize: "0.85rem",
              }}
            >
              <strong style={{ color: "#0A66C2" }}>LinkedIn :</strong> {article.socialCampaign.linkedin}
            </div>
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "#F9F8F5",
                borderRadius: "6px",
                borderLeft: "3px solid #25D366",
                fontSize: "0.85rem",
              }}
            >
              <strong style={{ color: "#25D366" }}>WhatsApp :</strong> {article.socialCampaign.whatsapp}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "3.5rem",
            padding: "2.5rem 2rem",
            backgroundColor: "#1A1917",
            color: "#F9F8F5",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "1.6rem",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            Un projet architectural ou une recherche sur mesure ?
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#BDB8AE",
              maxWidth: "500px",
              margin: "0 auto 1.75rem",
            }}
          >
            Nos equipes modelisent, testent et accompagnent vos realisations avec rigueur et sensibilite minerale.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              backgroundColor: "#C29B38",
              color: "#1A1917",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Prendre contact avec l Atelier
          </Link>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section
          style={{
            maxWidth: "960px",
            margin: "5rem auto 0",
            padding: "0 1.5rem",
            borderTop: "1px solid rgba(194, 155, 56, 0.2)",
            paddingTop: "3rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "1.6rem",
              color: "#1A1917",
              marginBottom: "2rem",
            }}
          >
            Poursuivre la lecture
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(194, 155, 56, 0.2)",
                  padding: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9E7D2B",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {rel.category}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontSize: "1.15rem",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Link
                    href={`/actualites/${rel.slug}`}
                    style={{ color: "#1A1917", textDecoration: "none" }}
                  >
                    {rel.title}
                  </Link>
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#5A564E" }}>{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
