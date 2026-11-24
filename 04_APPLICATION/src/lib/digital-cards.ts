import fs from "fs";
import path from "path";
import defaultCards from "@/data/digital-cards/cards.json";
import defaultRegistry from "@/data/digital-cards/registry.json";
import { DigitalCardData, CardRegistryEntry } from "@/types/digital-card";

function getLiveCards(): DigitalCardData[] {
  try {
    const p = path.resolve(process.cwd(), "src/data/digital-cards/cards.json");
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      if (Array.isArray(data)) return data;
    }
  } catch {}
  return defaultCards as DigitalCardData[];
}

function getLiveRegistry(): CardRegistryEntry[] {
  try {
    const p = path.resolve(process.cwd(), "src/data/digital-cards/registry.json");
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      if (Array.isArray(data)) return data;
    }
  } catch {}
  return defaultRegistry as CardRegistryEntry[];
}

/**
 * Résolution garantie de la carte par identifiant public permanent (ex: "tifo-0001").
 */
export function getDigitalCardByPublicId(publicId: string): DigitalCardData | null {
  if (!publicId) return null;
  const cleanId = publicId.toLowerCase().trim();

  const registry = getLiveRegistry();
  const cards = getLiveCards();

  // 1. Vérification dans le registre central permanent
  const registryEntry = registry.find(
    (entry) => entry.publicId.toLowerCase() === cleanId && entry.status === "active"
  );
  if (!registryEntry) return null;

  // 2. Récupération des données associées
  const card = cards.find((c) => c.publicId.toLowerCase() === cleanId);
  return card || null;
}

/**
 * Récupère tous les identifiants publics enregistrés pour la génération SSG
 */
export function getAllPermanentPublicIds(): string[] {
  const registry = getLiveRegistry();
  return registry.filter((entry) => entry.status === "active").map((e) => e.publicId);
}

/**
 * Récupère l'entrée de registre pour un identifiant
 */
export function getRegistryEntry(publicId: string): CardRegistryEntry | null {
  if (!publicId) return null;
  const cleanId = publicId.toLowerCase().trim();
  const registry = getLiveRegistry();
  return registry.find((e) => e.publicId.toLowerCase() === cleanId) || null;
}
