import fs from "fs";
import path from "path";

const sitemapContent = `import { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/data/all-projects";
import { EDITORIAL_ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ateliersdepaul.com";
  const lastModified = new Date();

  // Pages statiques maîtresses
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: \`\${baseUrl}/portfolio\`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/actualites\`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/devis\`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/paul\`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/cadre-deontologique\`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: \`\${baseUrl}/mentions-legales\`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: \`\${baseUrl}/politique-confidentialite\`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Les 7 Univers
  const universeRoutes: MetadataRoute.Sitemap = [
    "adp-brief",
    "adp-project",
    "adp-studio",
    "adp-lab",
    "adp-academy",
    "adp-tools",
    "rosbri-design",
  ].map((slug) => ({
    url: \`\${baseUrl}/\${slug}\`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Les 37 Projets réels du Portfolio
  const projectRoutes: MetadataRoute.Sitemap = ALL_PROJECTS.map((proj) => ({
    url: \`\${baseUrl}/portfolio/\${proj.slug}\`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Les Articles d'actualités
  const articleRoutes: MetadataRoute.Sitemap = EDITORIAL_ARTICLES.filter(
    (a) => a.status === "published"
  ).map((art) => ({
    url: \`\${baseUrl}/actualites/\${art.slug}\`,
    lastModified: art.updatedAt ? new Date(art.updatedAt) : new Date(art.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...universeRoutes, ...projectRoutes, ...articleRoutes];
}
`;

fs.writeFileSync(path.join("src", "app", "sitemap.ts"), sitemapContent, "utf8");
console.log("src/app/sitemap.ts generated successfully!");
