import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Studio — Design, Image de Marque & Print | Les Ateliers de Paul",
  description: "Identités visuelles haut de gamme, logotypes de prestige et dossiers de commercialisation immobilière.",
  openGraph: {
    title: "ADP Studio — Design, Image de Marque & Print | Les Ateliers de Paul",
    description: "Identités visuelles haut de gamme, logotypes de prestige et dossiers de commercialisation immobilière.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-studio"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
