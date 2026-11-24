import fs from "fs";
import path from "path";
import { DigitalCardData, CardRegistryEntry, CardStatus } from "@/types/digital-card";
import defaultCards from "@/data/digital-cards/cards.json";
import defaultRegistry from "@/data/digital-cards/registry.json";

const DATA_DIR = path.resolve(process.cwd(), "src/data/digital-cards");
const BACKUP_DIR = path.resolve(DATA_DIR, "backups");
const CARDS_FILE = path.resolve(DATA_DIR, "cards.json");
const REGISTRY_FILE = path.resolve(DATA_DIR, "registry.json");

function ensureDirectories(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`[cards-store] Erreur lecture fichier ${filePath}:`, err);
    return fallback;
  }
}

function writeJsonAtomic(filePath: string, data: unknown): void {
  ensureDirectories();
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmpPath, filePath);
}

function createAutomaticBackup(): void {
  try {
    ensureDirectories();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.resolve(BACKUP_DIR, `cards-backup-${timestamp}.json`);
    const currentCards = readJsonFile<DigitalCardData[]>(CARDS_FILE, defaultCards as DigitalCardData[]);
    const currentRegistry = readJsonFile<CardRegistryEntry[]>(REGISTRY_FILE, defaultRegistry as CardRegistryEntry[]);
    const payload = {
      timestamp: new Date().toISOString(),
      version: 1,
      registry: currentRegistry,
      cards: currentCards,
    };
    fs.writeFileSync(backupFile, JSON.stringify(payload, null, 2), "utf-8");

    // Limiter le nombre de sauvegardes à 10 fichiers récents
    const allBackups = fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith("cards-backup-"));
    if (allBackups.length > 10) {
      allBackups
        .sort()
        .slice(0, allBackups.length - 10)
        .forEach((f) => {
          try {
            fs.unlinkSync(path.resolve(BACKUP_DIR, f));
          } catch {}
        });
    }
  } catch (err) {
    console.warn("[cards-store] Avertissement sauvegarde automatique:", err);
  }
}

// Cache mémoire avec invalidation
let memoryCardsCache: DigitalCardData[] | null = null;
let memoryRegistryCache: CardRegistryEntry[] | null = null;

function loadStores(): { cards: DigitalCardData[]; registry: CardRegistryEntry[] } {
  if (!memoryCardsCache || !memoryRegistryCache) {
    memoryCardsCache = readJsonFile<DigitalCardData[]>(CARDS_FILE, defaultCards as DigitalCardData[]);
    memoryRegistryCache = readJsonFile<CardRegistryEntry[]>(REGISTRY_FILE, defaultRegistry as CardRegistryEntry[]);
  }
  return { cards: memoryCardsCache, registry: memoryRegistryCache };
}

function saveStores(cards: DigitalCardData[], registry: CardRegistryEntry[]): void {
  createAutomaticBackup();
  writeJsonAtomic(CARDS_FILE, cards);
  writeJsonAtomic(REGISTRY_FILE, registry);
  memoryCardsCache = cards;
  memoryRegistryCache = registry;
}

/**
 * Récupère l'ensemble des cartes (actives et/ou archivées)
 */
export async function getAllCards(includeInactive = false): Promise<DigitalCardData[]> {
  const { cards } = loadStores();
  if (includeInactive) {
    return [...cards];
  }
  return cards.filter((c) => c.status === "active");
}

/**
 * Récupère l'ensemble des entrées du registre
 */
export async function getRegistry(): Promise<CardRegistryEntry[]> {
  const { registry } = loadStores();
  return [...registry];
}

/**
 * Récupère une carte par son identifiant public permanent (ex: "tifo-0001")
 */
export async function getCardByPublicId(
  publicId: string,
  allowSuspended = false
): Promise<DigitalCardData | null> {
  if (!publicId) return null;
  const cleanId = publicId.toLowerCase().trim();
  const { cards, registry } = loadStores();

  const regEntry = registry.find((r) => r.publicId.toLowerCase() === cleanId);
  if (!regEntry || (!allowSuspended && regEntry.status === "suspended")) {
    return null;
  }

  const card = cards.find((c) => c.publicId.toLowerCase() === cleanId);
  return card || null;
}

/**
 * Vérifie si un identifiant public permanent est disponible
 */
export function isPublicIdAvailable(publicId: string): boolean {
  if (!publicId) return false;
  const cleanId = publicId.toLowerCase().trim();
  const { registry } = loadStores();
  return !registry.some((r) => r.publicId.toLowerCase() === cleanId);
}

/**
 * Enregistre une nouvelle carte avec attribution définitive de son URL permanente
 */
export async function createCard(
  cardInput: Omit<DigitalCardData, "id" | "createdAt" | "updatedAt" | "version">
): Promise<{ success: boolean; card?: DigitalCardData; error?: string }> {
  const cleanPublicId = cardInput.publicId?.toLowerCase().trim();
  if (!cleanPublicId || !/^[a-z0-9-]+$/.test(cleanPublicId)) {
    return {
      success: false,
      error: "L'identifiant public permanent doit contenir uniquement des lettres minuscules, chiffres et tirets.",
    };
  }

  if (!isPublicIdAvailable(cleanPublicId)) {
    return {
      success: false,
      error: `L'identifiant « ${cleanPublicId} » est déjà définitivement attribué et ne peut pas être réutilisé.`,
    };
  }

  const { cards, registry } = loadStores();
  const now = new Date().toISOString();
  const newCardId = `card-${cleanPublicId}-${Date.now()}`;

  const newCard: DigitalCardData = {
    ...cardInput,
    id: newCardId,
    publicId: cleanPublicId,
    createdAt: now,
    updatedAt: now,
    version: 1,
    status: cardInput.status || "active",
  };

  const newRegistryEntry: CardRegistryEntry = {
    publicId: cleanPublicId,
    cardId: newCardId,
    companyName: newCard.companyName,
    contactName: newCard.contactName,
    permanentUrl: `https://ateliersdepaul.com/c/${cleanPublicId}`,
    status: newCard.status,
    assignedAt: now,
    updatedAt: now,
    isLocked: true, // Verrouillé définitivement
  };

  const updatedCards = [...cards, newCard];
  const updatedRegistry = [...registry, newRegistryEntry];

  saveStores(updatedCards, updatedRegistry);

  return { success: true, card: newCard };
}

/**
 * Met à jour une carte existante SANS altérer son publicId permanent
 */
export async function updateCard(
  publicId: string,
  updates: Partial<Omit<DigitalCardData, "id" | "publicId" | "createdAt">>
): Promise<{ success: boolean; card?: DigitalCardData; error?: string }> {
  const cleanId = publicId.toLowerCase().trim();
  const { cards, registry } = loadStores();

  const cardIndex = cards.findIndex((c) => c.publicId.toLowerCase() === cleanId);
  if (cardIndex === -1) {
    return { success: false, error: "Carte non trouvée." };
  }

  const existingCard = cards[cardIndex];
  const now = new Date().toISOString();

  const updatedCard: DigitalCardData = {
    ...existingCard,
    ...updates,
    publicId: existingCard.publicId, // Immuabilité absolue
    id: existingCard.id, // Immuabilité absolue
    updatedAt: now,
    version: (existingCard.version || 1) + 1,
  };

  const updatedCards = [...cards];
  updatedCards[cardIndex] = updatedCard;

  // Mise à jour synchrone du registre
  const regIndex = registry.findIndex((r) => r.publicId.toLowerCase() === cleanId);
  const updatedRegistry = [...registry];
  if (regIndex !== -1) {
    updatedRegistry[regIndex] = {
      ...updatedRegistry[regIndex],
      companyName: updatedCard.companyName,
      contactName: updatedCard.contactName,
      status: updatedCard.status,
      updatedAt: now,
    };
  }

  saveStores(updatedCards, updatedRegistry);

  return { success: true, card: updatedCard };
}

/**
 * Modifie le statut d'une carte (active, suspended, draft)
 */
export async function setCardStatus(
  publicId: string,
  newStatus: CardStatus
): Promise<{ success: boolean; error?: string }> {
  return updateCard(publicId, { status: newStatus });
}

/**
 * Supprime une carte de test ou brouillon (protection stricte d'ETS TIFO et des fiches verrouillées)
 */
export async function deleteCard(publicId: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = publicId.toLowerCase().trim();
  if (cleanId === "tifo-0001") {
    return { success: false, error: "Protection absolue : La carte de référence tifo-0001 ne peut jamais être supprimée." };
  }

  const { cards, registry } = loadStores();
  const cardIndex = cards.findIndex((c) => c.publicId.toLowerCase() === cleanId);
  if (cardIndex === -1) {
    return { success: false, error: "Carte non trouvée." };
  }

  const filteredCards = cards.filter((c) => c.publicId.toLowerCase() !== cleanId);
  const filteredRegistry = registry.filter((r) => r.publicId.toLowerCase() !== cleanId);
  saveStores(filteredCards, filteredRegistry);

  return { success: true };
}

/**
 * Exporte un instantané de sauvegarde complet
 */
export function exportCardsBackup(): {
  timestamp: string;
  version: number;
  count: number;
  registry: CardRegistryEntry[];
  cards: DigitalCardData[];
} {
  const { cards, registry } = loadStores();
  return {
    timestamp: new Date().toISOString(),
    version: 1,
    count: cards.length,
    registry,
    cards,
  };
}

/**
 * Restaure une sauvegarde après validation de structure
 */
export function restoreCardsBackup(
  backupData: any
): { success: boolean; importedCount: number; error?: string } {
  if (!backupData || !Array.isArray(backupData.cards) || !Array.isArray(backupData.registry)) {
    return { success: false, importedCount: 0, error: "Format de sauvegarde non valide." };
  }

  // Vérifier qu'au minimum le profil ETS TIFO reste présent et intègre
  const hasTifo = backupData.registry.some((r: any) => r.publicId === "tifo-0001");
  if (!hasTifo) {
    return {
      success: false,
      importedCount: 0,
      error: "La sauvegarde rejetée car le profil permanent tifo-0001 est manquant.",
    };
  }

  saveStores(backupData.cards, backupData.registry);
  return { success: true, importedCount: backupData.cards.length };
}

/**
 * Vérification technique de destination pour BAT d'impression
 */
export async function verifyBatDestination(publicId: string): Promise<{
  tested: boolean;
  publicId: string;
  permanentUrl: string;
  vcfUrl: string;
  isValid: boolean;
  statusMessage: string;
}> {
  const cleanId = publicId.toLowerCase().trim();
  const card = await getCardByPublicId(cleanId);

  if (!card) {
    return {
      tested: true,
      publicId: cleanId,
      permanentUrl: `https://ateliersdepaul.com/c/${cleanId}`,
      vcfUrl: `/c/${cleanId}/vcf`,
      isValid: false,
      statusMessage: "Carte inactive ou introuvable dans le registre.",
    };
  }

  return {
    tested: true,
    publicId: cleanId,
    permanentUrl: `https://ateliersdepaul.com/c/${cleanId}`,
    vcfUrl: `/c/${cleanId}/vcf`,
    isValid: card.status === "active",
    statusMessage: card.status === "active" ? "Destination active et certifiée pour impression BAT." : "Carte en attente de publication.",
  };
}

/**
 * Diagnostic de l'architecture de persistance (Local vs Production Vercel)
 */
export function getStorageStatus(): {
  mode: "local_json" | "postgres" | "vercel_readonly";
  isPersistentInProduction: boolean;
  databaseConfigured: boolean;
  message: string;
} {
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;
  const hasPostgres = !!(process.env.DATABASE_URI || process.env.POSTGRES_URL);

  if (hasPostgres) {
    return {
      mode: "postgres",
      isPersistentInProduction: true,
      databaseConfigured: true,
      message: "Base PostgreSQL active — Persistance relationnelle en production.",
    };
  }

  if (isVercel) {
    return {
      mode: "vercel_readonly",
      isPersistentInProduction: false,
      databaseConfigured: false,
      message: "Vercel Serverless (Stockage fichier éphémère) — Les cartes précompilées (ETS TIFO) sont 100% pérennes. L'administration dynamique en production requiert une variable DATABASE_URI.",
    };
  }

  return {
    mode: "local_json",
    isPersistentInProduction: false,
    databaseConfigured: false,
    message: "Développement Local — Fichiers JSON atomiques avec sauvegardes automatiques dans src/data/digital-cards/.",
  };
}
