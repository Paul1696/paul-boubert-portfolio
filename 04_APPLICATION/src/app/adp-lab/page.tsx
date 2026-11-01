import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Lab — Recherche & Innovation Bioclimatique Tropicale | Les Ateliers de Paul",
  description: "Laboratoire d'expérimentation constructive : brique de terre compressée (BTC), bois locaux et ventilation passive.",
  openGraph: {
    title: "ADP Lab — Recherche & Innovation Bioclimatique Tropicale | Les Ateliers de Paul",
    description: "Laboratoire d'expérimentation constructive : brique de terre compressée (BTC), bois locaux et ventilation passive.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-lab"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
