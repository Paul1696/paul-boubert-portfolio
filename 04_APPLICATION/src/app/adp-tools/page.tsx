import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Tools — Familles Revit, Scripts Dynamo & Outils Numériques | Les Ateliers de Paul",
  description: "Bibliothèques de familles Revit tropicales normalisées, calculateurs d'espace et scripts d'automatisation BIM.",
  openGraph: {
    title: "ADP Tools — Familles Revit, Scripts Dynamo & Outils Numériques | Les Ateliers de Paul",
    description: "Bibliothèques de familles Revit tropicales normalisées, calculateurs d'espace et scripts d'automatisation BIM.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-tools"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
