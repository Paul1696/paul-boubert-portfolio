"use client";

/**
 * ADP WEB EXPERIENCE — Store Réactif du Moteur de Devis
 * Implémenté selon le pattern React 19 `useSyncExternalStore` avec persistance `localStorage`.
 * Zéro dépendance tierce, compatibilité SSR garantie, zéro flash d'hydratation.
 */

import { useSyncExternalStore } from "react";
import {
  QuoteDraft,
  QuoteItem,
  ProjectScoping,
  ClientContact,
  QuoteStatus,
} from "@/types/quote";
import { QUOTE_CATALOG } from "./quote-catalog";

const STORAGE_KEY = "adp_quote_draft_v1";

function generateLocalReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DEV-LOCAL-${year}${month}-${random}`;
}

const DEFAULT_DRAFT: QuoteDraft = {
  referenceId: generateLocalReference(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: "brouillon_local",
  items: [],
  scoping: {
    primaryUniverse: "adp-project",
    programmeType: "Résidentiel & Villas",
    estimatedSurface: "150 - 500 m²",
    projectStage: "faisabilite",
    targetTimeline: "court_terme",
    locationCity: "Douala",
    specificNeeds: [],
  },
  contact: {
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    preferredChannel: "whatsapp",
    description: "",
  },
};

// État mémoire
let currentDraft: QuoteDraft = DEFAULT_DRAFT;
let isDrawerOpen = false;
let isInitialized = false;

// Auditeurs d'abonnements
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

// Initialisation depuis le stockage local (côté client uniquement)
function loadFromStorage(): QuoteDraft {
  if (typeof window === "undefined") {
    return DEFAULT_DRAFT;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        return {
          ...DEFAULT_DRAFT,
          ...parsed,
          contact: { ...DEFAULT_DRAFT.contact, ...(parsed.contact || {}) },
          scoping: { ...DEFAULT_DRAFT.scoping, ...(parsed.scoping || {}) },
        };
      }
    }
  } catch (error) {
    console.warn("Échec de lecture du brouillon dans localStorage:", error);
  }
  return DEFAULT_DRAFT;
}

function saveToStorage(draft: QuoteDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn("Échec d'écriture du brouillon dans localStorage:", error);
  }
}

// Actions du store
export const quoteStore = {
  getSnapshot(): QuoteDraft {
    if (!isInitialized && typeof window !== "undefined") {
      currentDraft = loadFromStorage();
      isInitialized = true;
    }
    return currentDraft;
  },

  getServerSnapshot(): QuoteDraft {
    return DEFAULT_DRAFT;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Gestion du tiroir
  isDrawerOpen(): boolean {
    return isDrawerOpen;
  },

  openDrawer() {
    isDrawerOpen = true;
    notify();
  },

  closeDrawer() {
    isDrawerOpen = false;
    notify();
  },

  toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    notify();
  },

  // Opérations sur les articles
  addItem(catalogItemId: string, variantId?: string, customNotes?: string) {
    const catalogItem = QUOTE_CATALOG.find((it) => it.id === catalogItemId);
    if (!catalogItem) return;

    const chosenVariantId = variantId || catalogItem.defaultVariantId;
    const variant = catalogItem.variants.find((v) => v.id === chosenVariantId) || catalogItem.variants[0];

    // Vérifier si la prestation avec cette même variante est déjà dans le panier
    const existingIndex = currentDraft.items.findIndex(
      (it) => it.catalogItemId === catalogItemId && it.variantId === chosenVariantId
    );

    let updatedItems: QuoteItem[];
    if (existingIndex >= 0) {
      updatedItems = currentDraft.items.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem: QuoteItem = {
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        catalogItemId: catalogItem.id,
        universeId: catalogItem.universeId,
        universeName: catalogItem.universeName,
        universeColor: catalogItem.universeColor,
        serviceTitle: catalogItem.title,
        variantId: variant.id,
        variantLabel: variant.label,
        quantity: 1,
        customNotes,
      };
      updatedItems = [...currentDraft.items, newItem];
    }

    currentDraft = {
      ...currentDraft,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
      scoping: {
        ...currentDraft.scoping,
        primaryUniverse: catalogItem.universeId,
      },
    };

    saveToStorage(currentDraft);
    notify();
  },

  removeItem(itemId: string) {
    const updatedItems = currentDraft.items.filter((it) => it.id !== itemId);
    currentDraft = {
      ...currentDraft,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  updateQuantity(itemId: string, quantity: number) {
    const validQuantity = Math.max(1, Math.min(99, quantity));
    const updatedItems = currentDraft.items.map((it) =>
      it.id === itemId ? { ...it, quantity: validQuantity } : it
    );
    currentDraft = {
      ...currentDraft,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  updateVariant(itemId: string, variantId: string) {
    const item = currentDraft.items.find((it) => it.id === itemId);
    if (!item) return;

    const catalogItem = QUOTE_CATALOG.find((it) => it.id === item.catalogItemId);
    if (!catalogItem) return;

    const variant = catalogItem.variants.find((v) => v.id === variantId);
    if (!variant) return;

    const updatedItems = currentDraft.items.map((it) =>
      it.id === itemId
        ? { ...it, variantId: variant.id, variantLabel: variant.label }
        : it
    );

    currentDraft = {
      ...currentDraft,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  updateScoping(partial: Partial<ProjectScoping>) {
    currentDraft = {
      ...currentDraft,
      scoping: {
        ...currentDraft.scoping,
        ...partial,
      },
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  updateContact(partial: Partial<ClientContact>) {
    currentDraft = {
      ...currentDraft,
      contact: {
        ...currentDraft.contact,
        ...partial,
      },
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  setStatus(status: QuoteStatus) {
    currentDraft = {
      ...currentDraft,
      status,
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  clearDraft() {
    currentDraft = {
      ...DEFAULT_DRAFT,
      referenceId: generateLocalReference(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(currentDraft);
    notify();
  },

  // Génération du texte structuré WhatsApp pour transmission manuelle
  formatWhatsAppMessage(draft: QuoteDraft): string {
    const lines: string[] = [];

    lines.push(`🏛️ *DEMANDE DE DEVIS D'ATELIER — LES ATELIERS DE PAUL*`);
    lines.push(`Réf. brouillon : ${draft.referenceId}`);
    lines.push(``);

    // Coordonnées
    lines.push(`👤 *DEMANDEUR :*`);
    lines.push(`• Nom : ${draft.contact.fullName || "Non renseigné"}`);
    if (draft.contact.organization) {
      lines.push(`• Structure / Société : ${draft.contact.organization}`);
    }
    lines.push(`• Courriel : ${draft.contact.email || "Non renseigné"}`);
    lines.push(`• Téléphone : ${draft.contact.phone || "Non renseigné"}`);
    lines.push(`• Localisation : ${draft.scoping.locationCity || "Cameroun"}`);
    lines.push(``);

    // Cadrage du projet
    lines.push(`📐 *CADRAGE DU PROJET :*`);
    lines.push(`• Univers principal : ${draft.scoping.primaryUniverse}`);
    if (draft.scoping.programmeType) {
      lines.push(`• Programme : ${draft.scoping.programmeType}`);
    }
    if (draft.scoping.estimatedSurface) {
      lines.push(`• Surface approximative : ${draft.scoping.estimatedSurface}`);
    }
    if (draft.scoping.projectStage) {
      lines.push(`• Stade du projet : ${draft.scoping.projectStage}`);
    }
    if (draft.scoping.targetTimeline) {
      lines.push(`• Échéance visée : ${draft.scoping.targetTimeline}`);
    }
    lines.push(``);

    // Prestations sélectionnées
    lines.push(`📦 *PRESTATIONS SÉLECTIONNÉES (${draft.items.length}) :*`);
    if (draft.items.length === 0) {
      lines.push(`(Aucune prestation présélectionnée — Demande libre)`);
    } else {
      draft.items.forEach((item, index) => {
        lines.push(`${index + 1}. *[${item.universeName}]* ${item.serviceTitle}`);
        lines.push(`   └ Option : ${item.variantLabel} | Qté : ${item.quantity}`);
        if (item.customNotes) {
          lines.push(`   └ Précision : ${item.customNotes}`);
        }
      });
    }
    lines.push(``);

    // Description du besoin
    if (draft.contact.description) {
      lines.push(`📝 *DESCRIPTION DU BESOIN & OBJECTIFS :*`);
      lines.push(`${draft.contact.description}`);
      lines.push(``);
    }

    // Mention déontologique & transparence
    lines.push(`⚖️ *NOTE D'ENGAGEMENT :*`);
    lines.push(`Ce brief d'atelier est transmis pour examen de faisabilité et proposition d'honoraires sur-mesure.`);
    lines.push(`ADP n'est pas un cabinet d'architecture d'exercice réglementé (Loi ONAC n° 90/039).`);

    return lines.join("\n");
  },
};

// Hook React pour consommer le store avec réactivité
export function useQuoteDraft(): QuoteDraft {
  return useSyncExternalStore(
    quoteStore.subscribe,
    quoteStore.getSnapshot,
    quoteStore.getServerSnapshot
  );
}

// Hook pour écouter l'état d'ouverture du Drawer
export function useQuoteDrawerOpen(): boolean {
  return useSyncExternalStore(
    quoteStore.subscribe,
    quoteStore.isDrawerOpen,
    () => false
  );
}
