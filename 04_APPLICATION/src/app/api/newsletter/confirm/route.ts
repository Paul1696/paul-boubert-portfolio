import { NextRequest, NextResponse } from "next/server";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import type { SubscriberRecord } from "../subscribe/route";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")?.trim();
    if (!token || token.length < 16) {
      return NextResponse.json(
        { error: "Jeton de confirmation manquant ou invalide." },
        { status: 400 }
      );
    }

    const existingSubscribers = readJsonStore<SubscriberRecord>(
      "subscribers-log.json",
      []
    );
    if (existingSubscribers.length === 0) {
      return NextResponse.json(
        { error: "Aucune demande d'inscription trouvée." },
        { status: 404 }
      );
    }

    let confirmedEmail: string | null = null;
    const updatedSubscribers = existingSubscribers.map((sub) => {
      if (sub.confirmationToken === token) {
        confirmedEmail = sub.email;
        return {
          ...sub,
          status: "confirmed" as const,
          confirmedAt: new Date().toISOString(),
          confirmationToken: undefined,
        };
      }
      return sub;
    });

    if (!confirmedEmail) {
      return NextResponse.json(
        { error: "Ce jeton de confirmation est expiré ou déjà utilisé." },
        { status: 404 }
      );
    }

    writeJsonStoreAtomic("subscribers-log.json", updatedSubscribers, 500);

    return NextResponse.json({
      success: true,
      status: "confirmed",
      message: "Votre abonnement à la lettre d'information ADP est désormais confirmé.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de la validation de l'inscription." },
      { status: 500 }
    );
  }
}

