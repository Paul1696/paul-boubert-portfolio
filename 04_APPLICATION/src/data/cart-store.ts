"use client";

import { useSyncExternalStore } from "react";
import {
  CartDraft,
  CartItem,
  OrderCustomerInfo,
  OrderDeliveryMode,
} from "@/types/cart";
import { DELIVERY_LABELS } from "@/data/pricing-catalog";
import { calculateCartSummary, formatCurrency } from "@/lib/pricing-engine";

const STORAGE_KEY = "adp_cart_draft_v2";

function generateCartReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CMD-LOCAL-${year}${month}-${random}`;
}

const DEFAULT_CUSTOMER: OrderCustomerInfo = {
  fullName: "",
  organization: "",
  phone: "",
  email: "",
  city: "Douala",
  country: "Cameroun",
  deliveryAddress: "",
};

const DEFAULT_DRAFT: CartDraft = {
  referenceId: generateCartReference(),
  items: [],
  customer: DEFAULT_CUSTOMER,
  deliveryMode: "atelier_pickup",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

let currentDraft: CartDraft = DEFAULT_DRAFT;
let isDrawerOpen = false;
let isInitialized = false;

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function loadFromStorage(): CartDraft {
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
          customer: { ...DEFAULT_CUSTOMER, ...(parsed.customer || {}) },
        };
      }
    }
  } catch (e) {
    console.warn("Échec lecture panier local:", e);
  }
  return DEFAULT_DRAFT;
}

function saveToStorage(draft: CartDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn("Échec sauvegarde panier local:", e);
  }
}

export const cartStore = {
  getSnapshot(): CartDraft {
    if (!isInitialized && typeof window !== "undefined") {
      currentDraft = loadFromStorage();
      isInitialized = true;
    }
    return currentDraft;
  },

  getServerSnapshot(): CartDraft {
    return DEFAULT_DRAFT;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

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

  // --- ACTIONS SUR LE PANIER ---

  addItem(itemData: Omit<CartItem, "id">): string {
    const draft = this.getSnapshot();
    const id = `cart-line-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newItem: CartItem = {
      ...itemData,
      id,
    };

    const nextDraft: CartDraft = {
      ...draft,
      items: [newItem, ...draft.items],
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
    return id;
  },

  updateItemQuantity(itemId: string, quantity: number) {
    const draft = this.getSnapshot();
    const qty = Math.max(1, Math.min(10000, Number(quantity) || 1));

    const nextItems = draft.items.map((item) => {
      if (item.id === itemId) {
        const unitPrice = item.unitPriceXAF;
        const nextTotal = unitPrice ? unitPrice * qty : null;
        return {
          ...item,
          quantity: qty,
          totalPriceXAF: nextTotal,
        };
      }
      return item;
    });

    const nextDraft: CartDraft = {
      ...draft,
      items: nextItems,
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  duplicateItem(itemId: string) {
    const draft = this.getSnapshot();
    const existing = draft.items.find((i) => i.id === itemId);
    if (!existing) return;

    const newId = `cart-line-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const duplicated: CartItem = {
      ...existing,
      id: newId,
      customNotes: existing.customNotes ? `${existing.customNotes} (Copie)` : "Copie de configuration",
    };

    const nextDraft: CartDraft = {
      ...draft,
      items: [duplicated, ...draft.items],
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  removeItem(itemId: string) {
    const draft = this.getSnapshot();
    const nextDraft: CartDraft = {
      ...draft,
      items: draft.items.filter((i) => i.id !== itemId),
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  clearCart() {
    const nextDraft: CartDraft = {
      ...currentDraft,
      items: [],
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  setCustomer(customerData: Partial<OrderCustomerInfo>) {
    const draft = this.getSnapshot();
    const nextDraft: CartDraft = {
      ...draft,
      customer: {
        ...draft.customer,
        ...customerData,
      },
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  setDeliveryMode(mode: OrderDeliveryMode) {
    const draft = this.getSnapshot();
    const nextDraft: CartDraft = {
      ...draft,
      deliveryMode: mode,
      updatedAt: new Date().toISOString(),
    };

    currentDraft = nextDraft;
    saveToStorage(nextDraft);
    notify();
  },

  formatWhatsAppOrderMessage(orderRef?: string): string {
    const draft = this.getSnapshot();
    const ref = orderRef || draft.referenceId;
    const summary = calculateCartSummary(draft.items, draft.deliveryMode);

    let msg = `*LES ATELIERS DE PAUL — COMMANDE D'ATELIER*\n`;
    msg += `*Réf. :* ${ref}\n`;
    msg += `*Date :* ${new Date().toLocaleDateString("fr-FR")}\n\n`;

    msg += `*CLIENT & CONTACT :*\n`;
    msg += `• Nom : ${draft.customer.fullName || "Non renseigné"}\n`;
    if (draft.customer.organization) {
      msg += `• Entreprise : ${draft.customer.organization}\n`;
    }
    msg += `• Tél / WhatsApp : ${draft.customer.phone || "Non renseigné"}\n`;
    msg += `• Email : ${draft.customer.email || "Non renseigné"}\n`;
    msg += `• Ville : ${draft.customer.city}, ${draft.customer.country}\n\n`;

    msg += `*MODE DE LIVRAISON :*\n`;
    msg += `• ${DELIVERY_LABELS[draft.deliveryMode] || draft.deliveryMode}\n`;
    if (draft.customer.deliveryAddress) {
      msg += `• Adresse de livraison : ${draft.customer.deliveryAddress}\n`;
    }
    msg += `\n`;

    msg += `*ARTICLES COMMANDÉS (${draft.items.length}) :*\n`;
    draft.items.forEach((it, idx) => {
      msg += `\n${idx + 1}. *${it.productName}* (${it.quantity} ex.)\n`;
      msg += `   • Pôle : ${it.universeName}\n`;
      if (it.selectedOptionLabels) {
        Object.entries(it.selectedOptionLabels).forEach(([optGroup, optChoice]) => {
          msg += `   • ${optGroup} : ${optChoice}\n`;
        });
      }
      if (it.needsDesignService) {
        msg += `   • Prestation graphique atelier : Oui (Fichiers à créer / adapter)\n`;
      }
      if (it.clientFileName) {
        msg += `   • Fichier client transmis : ${it.clientFileName}\n`;
      }
      msg += `   • Montant : ${it.totalPriceXAF ? formatCurrency(it.totalPriceXAF) : "Sur étude d'atelier"}\n`;
    });

    msg += `\n*SYNTHÈSE FINANCIÈRE :*\n`;
    if (summary.hasCustomQuoteItems) {
      msg += `• Total provisoire : ${summary.formattedGrandTotal}\n`;
      msg += `(Inclut des articles sur mesure nécessitant chiffrage d'atelier sous 24-48h)\n`;
    } else {
      msg += `• Sous-total articles : ${summary.formattedProductsTotal}\n`;
      msg += `• Frais d'acheminement : ${summary.formattedDeliveryFee}\n`;
      msg += `• *TOTAL COMMANDE : ${summary.formattedGrandTotal}*\n`;
    }

    msg += `\n*Circuit de validation :* Commande reçue → Vérification PAO → Émission BAT pour signature.`;
    return msg;
  },
};

export function useCartDraft(): CartDraft {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
}

export function useCartDrawerOpen(): boolean {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.isDrawerOpen,
    () => false
  );
}

export function useCartItemsCount(): number {
  const draft = useCartDraft();
  return draft.items.reduce((acc, it) => acc + it.quantity, 0);
}
