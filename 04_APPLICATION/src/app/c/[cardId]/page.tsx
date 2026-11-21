import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDigitalCardByPublicId,
  getAllPermanentPublicIds,
} from "@/lib/digital-cards";
import DigitalCardView from "@/components/cards/DigitalCardView";

interface PageProps {
  params: Promise<{ cardId: string }>;
}

export function generateStaticParams() {
  return getAllPermanentPublicIds().map((cardId) => ({ cardId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cardId } = await params;
  const card = getDigitalCardByPublicId(cardId);

  if (!card) {
    return {
      title: "Carte numérique non trouvée | ADP Studio",
      robots: { index: false, follow: false },
    };
  }

  const title = `${card.companyName} — ${card.contactName} (${card.contactRole})`;
  const description = `${card.companyName} (${card.activity}) • Contact direct : ${card.contactName}, ${card.contactRole}. Localisation : ${card.address}, ${card.city}.`;
  const canonicalUrl = `https://ateliersdepaul.com/c/${card.publicId}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ADP Digital Cards — Les Ateliers de Paul",
      type: "profile",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PublicDigitalCardPage({ params }: PageProps) {
  const { cardId } = await params;
  const card = getDigitalCardByPublicId(cardId);

  if (!card || card.status !== "active") {
    notFound();
  }

  return <DigitalCardView card={card} />;
}
