import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "ADP Brief — CCTP, DPGF & Documents Contractuels | Les Ateliers de Paul",
  description: "Rédaction experte de pièces écrites, métrés et dossiers de consultation des entreprises (DCE) au Cameroun.",
  openGraph: {
    title: "ADP Brief — CCTP, DPGF & Documents Contractuels | Les Ateliers de Paul",
    description: "Rédaction experte de pièces écrites, métrés et dossiers de consultation des entreprises (DCE) au Cameroun.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["adp-brief"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
