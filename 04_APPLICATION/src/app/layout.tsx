import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Les Ateliers de Paul — The Possibility Machine | Une idée. Mille possibilités.",
  description:
    "Architecture bioclimatique, modélisation BIM, design d'identité et haute couture Wax. Écosystème pluridisciplinaire fondé par Paul à Douala, Cameroun. Partenaire de confrères architectes inscrits à l'ONAC.",
  keywords: [
    "Architecture bioclimatique Cameroun",
    "BIM Revit Douala",
    "Les Ateliers de Paul",
    "The Possibility Machine",
    "Rosbri Wax Design",
    "Formation BIM Afrique",
    "Architecture tropicale",
    "ONAC Cameroun",
    "Paul Boubert",
  ],
  authors: [{ name: "Les Ateliers de Paul", url: "https://ateliersdepaul.com" }],
  creator: "Paul & Les Ateliers de Paul",
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: "https://ateliersdepaul.com",
    title: "Les Ateliers de Paul — The Possibility Machine",
    description:
      "Une idée. Mille possibilités. Écosystème réunissant architecture, modélisation BIM, design textile et formation d'élite.",
    siteName: "Les Ateliers de Paul",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
