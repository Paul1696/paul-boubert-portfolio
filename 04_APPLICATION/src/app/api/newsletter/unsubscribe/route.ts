import { NextRequest, NextResponse } from "next/server";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import type { SubscriberRecord } from "../subscribe/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Veuillez fournir une adresse courriel valide." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    let existingSubscribers = readJsonStore<SubscriberRecord>(
      "subscribers-log.json",
      []
    );
    let found = false;
    existingSubscribers = existingSubscribers.map((s) => {
      if (s.email === cleanEmail) {
        found = true;
        return {
          ...s,
          status: "unsubscribed",
          unsubscribedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    if (found) {
      writeJsonStoreAtomic("subscribers-log.json", existingSubscribers, 500);
    }

    return NextResponse.json({
      success: true,
      message:
        "Votre désinscription a été prise en compte avec succès. Vous ne recevrez plus nos communications.",
    });
  } catch (error) {
    console.error("Erreur serveur désinscription newsletter:", error);
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}
