import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSE_DETAILS } from "@/data/universe-details";
import { UniverseDetailView } from "@/components/universe/UniverseDetailView";

export const metadata: Metadata = {
  title: "Rosbri Wax Design — Haute Couture Wax & Design Textile | Les Ateliers de Paul",
  description: "L'élégance africaine au quotidien : quand la rigueur architecturale rencontre la noblesse des motifs Wax.",
  openGraph: {
    title: "Rosbri Wax Design — Haute Couture Wax & Design Textile | Les Ateliers de Paul",
    description: "L'élégance africaine au quotidien : quand la rigueur architecturale rencontre la noblesse des motifs Wax.",
    locale: "fr_CM",
  },
};

export default function UniversePage() {
  const universe = UNIVERSE_DETAILS["rosbri-design"];

  if (!universe) {
    notFound();
  }

  return <UniverseDetailView universe={universe} />;
}
