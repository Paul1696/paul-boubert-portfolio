import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";

function maskEmail(email?: string | null): string | null {
  if (!email) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const [user, domain] = parts;
  return `${user.slice(0, 2)}***@${domain}`;
}

function maskPhone(phone?: string | null): string | null {
  if (!phone) return null;
  const cleaned = phone.trim();
  if (cleaned.length <= 6) return "****";
  return `${cleaned.slice(0, 4)}****${cleaned.slice(-2)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { services, details } = body || {};

    if (!details || !details.clientName || !details.clientPhone) {
      return NextResponse.json(
        { error: "Le nom et le numéro de téléphone WhatsApp sont obligatoires." },
        { status: 400 }
      );
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DEV-SERV-${year}${month}-${randomSuffix}`;

    // Record with masked sensitive data for secure storage
    const quoteRecord = {
      reference,
      type: "server_registered_quote",
      status: "enregistre_serveur",
      createdAt: now.toISOString(),
      clientMasked: {
        name: details.clientName ? `${details.clientName.slice(0, 1)}.***` : "Client",
        phoneMasked: maskPhone(details.clientPhone),
        emailMasked: maskEmail(details.clientEmail),
      },
      project: {
        name: details.projectName || "Projet d'Atelier",
        location: details.location || "Cameroun",
        programType: details.programType || "Résidentiel",
        estimatedSurface: details.estimatedSurface || null,
        deadline: details.desiredDeadline || null,
      },
      servicesCount: Array.isArray(services) ? services.length : 0,
      services: (services || []).map((s: { title?: string; universeName?: string; variantLabel?: string; quantity?: number }) => ({
        title: s.title || "Prestation",
        universe: s.universeName || "ADP",
        variant: s.variantLabel || "Standard",
        quantity: s.quantity || 1,
      })),
    };

    // Store quote log atomically with masked entries
    const existingQuotes = readJsonStore<unknown>("quotes-log.json", []);
    existingQuotes.unshift(quoteRecord);
    writeJsonStoreAtomic("quotes-log.json", existingQuotes, 500);

    return NextResponse.json({
      success: true,
      reference,
      status: "enregistre_serveur",
      createdAt: quoteRecord.createdAt,
      message: "Demande de devis enregistrée avec succès sur le serveur.",
    });
  } catch (error) {
    console.error("Erreur serveur lors de la soumission du devis:", error instanceof Error ? error.message : "Inconnue");
    return NextResponse.json(
      { error: "Erreur interne lors du traitement de la demande de devis." },
      { status: 500 }
    );
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

    const quotes = readJsonStore<unknown>("quotes-log.json", []);
    return NextResponse.json({ total: quotes.length, quotes });
  } catch {
    return NextResponse.json({ error: "Impossible de lire le registre." }, { status: 500 });
  }
}
