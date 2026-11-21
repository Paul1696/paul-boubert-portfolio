import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";

// Simple in-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const [user, domain] = parts;
  return `${user.slice(0, 2)}***@${domain}`;
}

function maskPhone(phone: string): string {
  const cleaned = phone.trim();
  if (!cleaned) return "";
  if (cleaned.length <= 6) return "****";
  return `${cleaned.slice(0, 4)}****${cleaned.slice(-2)}`;
}

export interface ContactMessageRecord {
  id: string;
  createdAt: string;
  status: string;
  senderMasked: {
    name: string;
    emailMasked: string;
    phoneMasked: string;
  };
  subject: string;
  universe: string;
  messagePreview: string;
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();

    // 1. Rate limiting check
    const timestamps = rateLimitMap.get(ip) || [];
    const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Trop de requêtes soumises. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }
    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);

    const body = await request.json();
    const { name, email, phone, subject, message, universe, honeypot, consent } = body || {};

    // 2. Anti-spam honeypot detection
    if (honeypot && honeypot.trim().length > 0) {
      // Silently discard spam submission without revealing detection
      return NextResponse.json({ success: true, message: "Message reçu." });
    }

    // 3. Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Le nom complet est obligatoire." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Une adresse courriel valide est obligatoire." }, { status: 400 });
    }
    if (!message || message.trim().length < 8) {
      return NextResponse.json({ error: "Le message doit comporter au moins 8 caractères." }, { status: 400 });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanPhone = String(phone || "").trim();
    const cleanMessage = String(message).trim();

    const messageRecord: ContactMessageRecord = {
      id: `MSG-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: "nouveau",
      senderMasked: {
        name: `${cleanName.slice(0, 1)}.***`,
        emailMasked: maskEmail(cleanEmail),
        phoneMasked: maskPhone(cleanPhone),
      },
      subject: subject || "Contact général",
      universe: universe || "general",
      messagePreview: cleanMessage.slice(0, 280),
      consent: !!consent,
    };

    // 4. Atomic persistence into messages log (masked PII)
    const existingMessages = readJsonStore<ContactMessageRecord>("messages-log.json", []);
    existingMessages.unshift(messageRecord);
    writeJsonStoreAtomic("messages-log.json", existingMessages, 500);

    return NextResponse.json({
      success: true,
      messageId: messageRecord.id,
      message: "Votre message a été transmis avec succès à l'atelier.",
    });
  } catch (error) {
    console.error("Erreur serveur lors de l'envoi du message:", error);
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authorized = await isAuthorizedAdminRequest(request);
    if (!authorized) {
      return NextResponse.json(
        { error: "Non autorisé. Authentification administrateur requise." },
        { status: 401 }
      );
    }

    const messages = readJsonStore<ContactMessageRecord>("messages-log.json", []);
    return NextResponse.json({ total: messages.length, messages });
  } catch {
    return NextResponse.json({ error: "Impossible de lire la boîte de réception." }, { status: 500 });
  }
}
