import { notFound, redirect } from "next/navigation";
import { UNIVERSES } from "@/data/universes";

interface SlugProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SlugRedirectPage({ params }: SlugProps) {
  const { slug } = await params;
  const universe = UNIVERSES.find((u) => u.slug === slug);

  if (universe) {
    redirect(universe.targetRoute);
  }

  notFound();
}
