import fs from "fs";
import path from "path";

const robotsContent = `import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ateliersdepaul.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  };
}
`;

fs.writeFileSync(path.join("src", "app", "robots.ts"), robotsContent, "utf8");
console.log("src/app/robots.ts generated successfully!");
