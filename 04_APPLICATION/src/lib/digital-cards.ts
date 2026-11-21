import cardsData from "@/data/digital-cards/cards.json";
import registryData from "@/data/digital-cards/registry.json";
import { DigitalCardData, CardRegistryEntry } from "@/types/digital-card";

const CARDS: DigitalCardData[] = cardsData as DigitalCardData[];
const REGISTRY: CardRegistryEntry[] = registryData as CardRegistryEntry[];

/**
 * Résolution garantie de la carte par identifiant public permanent
 * (ex: "tifo-0001").
 */
export function getDigitalCardByPublicId(publicId: string): DigitalCardData | null {
  if (!publicId) return null;
  const cleanId = publicId.toLowerCase().trim();

  // 1. Vérification dans le registre central permanent
  const registryEntry = REGISTRY.find(
    (entry) => entry.publicId.toLowerCase() === cleanId && entry.status === "active"
  );
  if (!registryEntry) return null;

  // 2. Récupération des données associées
  const card = CARDS.find((c) => c.publicId.toLowerCase() === cleanId);
  return card || null;
}

/**
 * Récupère tous les identifiants publics enregistrés pour la génération SSG
 */
export function getAllPermanentPublicIds(): string[] {
  return REGISTRY.filter((entry) => entry.status === "active").map((e) => e.publicId);
}

/**
 * Récupère l'entrée de registre pour un identifiant
 */
export function getRegistryEntry(publicId: string): CardRegistryEntry | null {
  const cleanId = publicId.toLowerCase().trim();
  return REGISTRY.find((e) => e.publicId.toLowerCase() === cleanId) || null;
}
