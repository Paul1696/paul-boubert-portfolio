import { UNIVERSES } from "@/data/universes";

export const INSTITUTIONAL_NAVIGATION = UNIVERSES.map((universe, order) => ({
  order: order + 1,
  name: universe.name,
  slug: universe.slug,
  href: universe.targetRoute,
  description: universe.description,
  color: universe.accentColor,
  logoReference: `/assets/media/identities/${universe.slug === "rosbri-wax-design" ? "rosbri" : universe.slug}.webp`,
}));

export const INSTITUTIONAL_DESTINATIONS = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/portfolio" },
  { label: "Actualités", href: "/actualites" },
  { label: "À propos", href: "/a-propos" },
  { label: "Devis d'Atelier", href: "/devis" },
  { label: "Contact", href: "/contact" },
] as const;
