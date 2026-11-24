import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getStoredOrders, persistNewOrder, logActivity } from "@/lib/db-adapter";
import { OrderRecord, CartItem, OrderCustomerInfo, OrderDeliveryMode } from "@/types/cart";
import { calculateCartSummary } from "@/lib/pricing-engine";

function generateOrderReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CMD-${year}${month}-${randomSuffix}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, deliveryMode, items } = body as {
      customer?: OrderCustomerInfo;
      deliveryMode?: OrderDeliveryMode;
      items?: CartItem[];
    };

    if (!customer || !customer.fullName?.trim() || !customer.phone?.trim()) {
      return NextResponse.json(
        { error: "Le nom du commanditaire et son numéro de téléphone/WhatsApp sont obligatoires." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Le panier ne contient aucun article à commander." },
        { status: 400 }
      );
    }

    const mode = deliveryMode || "atelier_pickup";
    const summary = calculateCartSummary(items, mode, "XAF");
    const reference = generateOrderReference();
    const now = new Date().toISOString();

    const orderRecord: OrderRecord = {
      reference,
      createdAt: now,
      updatedAt: now,
      status: "commande_soumise",
      deliveryMode: mode,
      customer: {
        fullName: customer.fullName.trim(),
        organization: customer.organization?.trim() || undefined,
        phone: customer.phone.trim(),
        email: customer.email?.trim() || "",
        city: customer.city?.trim() || "Douala",
        country: "Cameroun",
        deliveryAddress: customer.deliveryAddress?.trim() || undefined,
      },
      items,
      totalItemsCount: summary.totalItemsCount,
      totalProductsXAF: summary.totalProductsXAF,
      totalDeliveryXAF: summary.deliveryFeeXAF,
      grandTotalXAF: summary.grandTotalXAF,
      hasCustomQuoteItems: summary.hasCustomQuoteItems,
      currentBATVersion: 1,
      batHistory: [
        {
          id: `bat-${Date.now()}-v1`,
          version: 1,
          createdAt: now,
          decision: "en_attente",
          technicianNotes: "Dossier reçu via le portail commercial. Contrôle des fichiers en cours par l'Atelier ADP.",
        },
      ],
      notesProduction: "Commande initialisée. BAT contractuel requis avant mise en production.",
    };

    await persistNewOrder(orderRecord);
    const formattedTotal = summary.grandTotalXAF !== null ? `${summary.grandTotalXAF.toLocaleString("fr-FR")} FCFA` : "Sur devis";
    logActivity("order_created", "order", reference, `Nouvelle commande enregistrée : ${reference} (${formattedTotal})`);

    return NextResponse.json({
      success: true,
      reference,
      status: "commande_soumise",
      createdAt: now,
      order: orderRecord,
      message: "Votre commande d'atelier a été enregistrée avec succès sous la référence " + reference + ".",
    });
  } catch (error) {
    console.error("Erreur serveur lors de la soumission de la commande:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de l'enregistrement de la commande." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedAdminRequest(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Non autorisé. Accès administrateur requis." },
        { status: 401 }
      );
    }

    const orders = await getStoredOrders();
    return NextResponse.json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de récupérer le registre des commandes." },
      { status: 500 }
    );
  }
}
