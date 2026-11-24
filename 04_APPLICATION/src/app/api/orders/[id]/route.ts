import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import { OrderRecord, OrderStatus, BATDecision } from "@/types/cart";
import { logActivity } from "@/lib/db-adapter";

const STORAGE_FILE = "orders-log.json";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteProps) {
  try {
    const isAuthorized = await isAuthorizedAdminRequest(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Non autorisé. Accès administrateur requis." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, batDecision, technicianNotes, notesProduction } = body as {
      status?: OrderStatus;
      batDecision?: BATDecision;
      technicianNotes?: string;
      notesProduction?: string;
    };

    const orders = readJsonStore<OrderRecord>(STORAGE_FILE, []);
    const orderIndex = orders.findIndex((o) => o.reference === id);

    if (orderIndex === -1) {
      return NextResponse.json(
        { error: `Commande ${id} introuvable.` },
        { status: 404 }
      );
    }

    const currentOrder = orders[orderIndex];
    const now = new Date().toISOString();

    const updatedOrder: OrderRecord = {
      ...currentOrder,
      updatedAt: now,
      status: status || currentOrder.status,
      notesProduction: notesProduction !== undefined ? notesProduction : currentOrder.notesProduction,
    };

    // Si une décision de BAT est soumise
    if (batDecision) {
      const currentBat = updatedOrder.batHistory[0];
      if (currentBat) {
        currentBat.decision = batDecision;
        currentBat.decisionDate = now;
        if (technicianNotes) {
          currentBat.technicianNotes = technicianNotes;
        }
      }
    }

    orders[orderIndex] = updatedOrder;
    writeJsonStoreAtomic(STORAGE_FILE, orders, 500);

    logActivity(
      "UPDATE_ORDER_STATUS",
      "order",
      id,
      `Commande ${id} : statut ${updatedOrder.status}, BAT: ${batDecision || "non modifié"}`
    );

    return NextResponse.json({
      success: true,
      message: `Commande ${id} mise à jour avec succès.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Erreur mise à jour commande:", error);
    return NextResponse.json(
      { error: "Erreur interne lors de la mise à jour." },
      { status: 500 }
    );
  }
}
