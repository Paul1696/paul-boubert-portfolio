import type { NextConfig } from "next";
import path from "path";

if (!process.env.NEXT_TEST_WASM_DIR) {
  process.env.NEXT_TEST_WASM_DIR = path.resolve(process.cwd(), "node_modules/next/wasm");
}

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.whatsapp.com https://wa.me",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: cspDirectives,
  },
];

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next_build",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/api/media/:path*",
      },
    ];
  },
  async redirects() {
    const redirects = [
      ["018-studio", "studio-epure"], ["bahemeck", "interieur-signature"], ["bicec-bafoussam", "agence-bancaire-regionale"], ["bicec-usca", "agence-bancaire-moderne"], ["boj", "restaurant-urbain"], ["boutique-biyem-assi", "boutique-design"], ["bureau-dsi", "bureaux-contemporains"], ["cabinet-elena", "espace-dentaire"], ["croissanterie", "la-croissanterie"], ["duplex-domegne", "villa-des-volumes"], ["emeraude", "villa-canopee"], ["enem", "halle-automobile"], ["entrepot", "halle-logistique"], ["grill-way", "restaurant-tropical"], ["harmony", "villa-californienne"], ["horizon", "villa-panorama"], ["hotel-bertoua", "hotel-des-pavillons"], ["hunter", "residence-hunter"], ["lipem", "residence-terracotta"], ["mandeng", "villa-geometrique"], ["mbella", "residence-verticale"], ["meeting-room", "salle-de-conference"], ["mme-edzigui", "villa-heritage"], ["oasis", "residence-tropicale"], ["owona", "villa-des-courbes"], ["perenco-offices", "bureaux-prestige"], ["petrofor-base", "pole-industriel"], ["pharmacie-studio", "immeuble-mixte"], ["residence-h", "residence-neo-classique"], ["residence-soa", "residence-etudiante"], ["salle-de-fete", "espace-ceremoniel"], ["sequoia", "villa-arcades"], ["showroom-kotto", "showroom-elegance"], ["suka-cafe", "cafe-terrasse"], ["tonye", "residence-urbaine"], ["web-tower", "tour-de-verre"], ["workbox", "atelier-modulaire"],
    ];
    return redirects.map(([from, to]) => ({ source: `/paul/projet/${from}`, destination: `/paul/projet/${to}`, permanent: true }));
  },
};

export default nextConfig;
