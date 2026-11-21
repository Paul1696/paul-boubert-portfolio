import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ateliersdepaul.com"),
  title: {
    default: "Les Ateliers de Paul • The Possibility Machine | Une idée. Mille possibilités.",
    template: "%s | Les Ateliers de Paul",
  },
  description:
    "Architecture bioclimatique, modélisation BIM, design d'identité et haute couture Wax. Écosystème pluridisciplinaire fondé par Paul à Douala et Yaoundé, Cameroun. Partenaire de confrères architectes inscrits à l'ONAC.",
  keywords: [
    "Architecture bioclimatique Cameroun",
    "BIM Revit Douala Yaoundé",
    "Les Ateliers de Paul",
    "The Possibility Machine",
    "Rosbri Wax Design",
    "Formation BIM Afrique",
    "Architecture tropicale",
    "Terre crue BTC",
    "ONAC Cameroun",
    "Paul Boubert",
  ],
  authors: [{ name: "Paul Boubert", url: "https://ateliersdepaul.com/paul" }],
  creator: "Paul Boubert & Les Ateliers de Paul",
  publisher: "Les Ateliers de Paul",
  alternates: {
    canonical: "https://ateliersdepaul.com",
  },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: "https://ateliersdepaul.com",
    title: "Les Ateliers de Paul • The Possibility Machine",
    description:
      "Une idée. Mille possibilités. Écosystème réunissant architecture, modélisation BIM, design textile et formation d'élite.",
    siteName: "Les Ateliers de Paul",
    images: [
      {
        url: "/assets/media/identities/adp-project.webp",
        width: 1200,
        height: 630,
        alt: "Les Ateliers de Paul — The Possibility Machine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Ateliers de Paul • The Possibility Machine",
    description: "Une idée. Mille possibilités. Architecture, BIM & Matière en mouvement.",
    images: ["/assets/media/identities/adp-project.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F8F5",
  width: "device-width",
  initialScale: 1,
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Les Ateliers de Paul",
  alternateName: "The Possibility Machine",
  url: "https://ateliersdepaul.com",
  logo: "https://ateliersdepaul.com/assets/media/identities/adp-project.webp",
  image: "https://ateliersdepaul.com/assets/media/identities/adp-project.webp",
  description:
    "Écosystème pluridisciplinaire d'architecture bioclimatique, modélisation BIM, design d'identité et haute couture Wax au Cameroun.",
  founder: {
    "@type": "Person",
    name: "Paul Boubert",
    jobTitle: "Directeur de Création & Spécialiste BIM",
    url: "https://ateliersdepaul.com/paul",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Douala / Yaoundé",
    addressCountry: "CM",
  },
  telephone: "+237690087213",
  priceRange: "Sur devis personnalisé",
  knowsAbout: [
    "Architecture bioclimatique",
    "Building Information Modeling (BIM)",
    "Revit & ArchiCAD",
    "Terre crue & BTC",
    "Design textile Wax",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
