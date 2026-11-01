import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Project — Architecture, BIM & 3D | Les Ateliers de Paul",
  description: "Études de faisabilité, modélisation BIM LOD 300-350 et rendus 3D pour projets résidentiels et tertiaires au Cameroun.",
  openGraph: {
    title: "ADP Project — Architecture, BIM & 3D | Les Ateliers de Paul",
    description: "Études de faisabilité, modélisation BIM LOD 300-350 et rendus 3D pour projets résidentiels et tertiaires au Cameroun.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-project"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
