import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  STUDIO_PRODUCTS, 
  getStudioProductBySlug, 
  getStudioFamilyById, 
  getRelatedStudioProducts 
} from "@/data/studio-catalog";
import { StudioProductDetailView } from "@/components/studio/StudioProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STUDIO_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getStudioProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé | ADP Studio",
    };
  }

  return {
    title: `${product.name} — Catalogue ADP Studio 2026 | Les Ateliers de Paul`,
    description: `${product.subtitle} — ${product.shortDescription}`,
    openGraph: {
      title: `${product.name} — ADP Studio`,
      description: product.subtitle,
      locale: "fr_CM",
    },
  };
}

export default async function StudioProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getStudioProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const family = getStudioFamilyById(product.familyId);
  const relatedProducts = getRelatedStudioProducts(product.id, 3);

  return (
    <StudioProductDetailView 
      product={product} 
      family={family} 
      relatedProducts={relatedProducts} 
    />
  );
}
