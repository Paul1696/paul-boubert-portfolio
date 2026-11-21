import fs from "fs";
import path from "path";

const targetPath = path.join("src", "app", "portfolio", "[slug]", "page.tsx");
let content = fs.readFileSync(targetPath, "utf8");

// Vérifier si le JSON-LD est déjà présent
if (!content.includes("application/ld+json")) {
  // Enrichir generateMetadata
  const oldMeta = `  return {
    title: \`\${project.title} - \${project.subtitle} | Portfolio ADP\`,
    description: project.excerpt,
    openGraph: {
      title: \`\${project.title} | Les Ateliers de Paul\`,
      description: project.excerpt,
      locale: "fr_CM",
    },
  };`;

  const newMeta = `  const mediaInfo = PROJECTS_MEDIA[project.mediaFolder] || null;
  const coverUrl = mediaInfo?.cover || "/assets/media/identities/adp-project.webp";

  return {
    title: \`\${project.title} — \${project.subtitle} | Portfolio ADP\`,
    description: project.excerpt,
    alternates: {
      canonical: \`https://ateliersdepaul.com/portfolio/\${project.slug}\`,
    },
    openGraph: {
      title: \`\${project.title} | Les Ateliers de Paul\`,
      description: project.excerpt,
      locale: "fr_CM",
      type: "article",
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [coverUrl],
    },
  };`;

  content = content.replace(oldMeta, newMeta);

  // Injecter le script JSON-LD avant le retour de JSX
  const jsonLdCode = `
  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: project.title,
    headline: project.subtitle,
    description: project.excerpt,
    creator: {
      "@type": "Organization",
      name: "Les Ateliers de Paul",
      url: "https://ateliersdepaul.com",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year,
    genre: project.typology,
    image: coverImage ? \`https://ateliersdepaul.com\${coverImage}\` : undefined,
  };
`;

  content = content.replace(
    "  const relatedProjects = ALL_PROJECTS.filter(",
    `${jsonLdCode}
  const relatedProjects = ALL_PROJECTS.filter(`
  );

  content = content.replace(
    "<SiteHeader />",
    `<SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />`
  );

  fs.writeFileSync(targetPath, content, "utf8");
  console.log("portfolio/[slug]/page.tsx successfully enriched with SEO & JSON-LD!");
} else {
  console.log("JSON-LD already present in portfolio/[slug]/page.tsx");
}
