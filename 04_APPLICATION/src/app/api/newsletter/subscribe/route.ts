import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import { sendTransactionalEmail } from "@/lib/email-adapter";

export interface SubscriberRecord {
  id: string;
  email: string;
  status: "pending_confirmation" | "confirmed" | "unsubscribed";
  confirmationToken?: string;
  subscribedAt: string;
  confirmedAt?: string;
  unsubscribedAt?: string;
  consentGiven: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, consent } = body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Veuillez fournir une adresse courriel valide." },
        { status: 400 }
      );
    }

    const confirmationToken = crypto.randomBytes(24).toString("hex");
    const subscriber: SubscriberRecord = {
      id: `SUB-${Date.now()}`,
      email: String(email).trim().toLowerCase(),
      status: "pending_confirmation",
      confirmationToken,
      subscribedAt: new Date().toISOString(),
      consentGiven: consent !== false,
    };

    const existingSubscribers = readJsonStore<SubscriberRecord>(
      "subscribers-log.json",
      []
    );
    const existingIdx = existingSubscribers.findIndex(
      (s) => s.email === subscriber.email
    );
    if (existingIdx === -1) {
      existingSubscribers.unshift(subscriber);
    } else if (existingSubscribers[existingIdx].status !== "confirmed") {
      existingSubscribers[existingIdx] = subscriber;
    }
    writeJsonStoreAtomic("subscribers-log.json", existingSubscribers, 500);

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const confirmationUrl = `${baseUrl}/api/newsletter/confirm?token=${confirmationToken}`;

    const emailDispatch = await sendTransactionalEmail({
      to: subscriber.email,
      subject: "Confirmation d'inscription • Les Ateliers de Paul",
      html: `<p>Bonjour,</p><p>Merci de votre intérêt pour Les Ateliers de Paul. Veuillez confirmer votre inscription en cliquant sur ce lien : <a href="${confirmationUrl}">${confirmationUrl}</a></p>`,
      text: `Confirmez votre inscription aux Ateliers de Paul : ${confirmationUrl}`,
    });

    return NextResponse.json({
      success: true,
      status: "pending_confirmation",
      emailProvider: emailDispatch.provider,
      confirmationUrl,
      message:
        "Pré-inscription enregistrée (Double Opt-In). Veuillez confirmer votre adresse via le lien de validation.",
    });
  } catch (error) {
    console.error("Erreur serveur inscription newsletter:", error);
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}
