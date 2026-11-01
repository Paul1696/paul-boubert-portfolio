import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Academy — Formation d'Élite BIM & Revit | Les Ateliers de Paul",
  description: "Ateliers pratiques et formations d'excellence sur Autodesk Revit, la coordination BIM et Dynamo à Douala et Yaoundé.",
  openGraph: {
    title: "ADP Academy — Formation d'Élite BIM & Revit | Les Ateliers de Paul",
    description: "Ateliers pratiques et formations d'excellence sur Autodesk Revit, la coordination BIM et Dynamo à Douala et Yaoundé.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-academy"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
