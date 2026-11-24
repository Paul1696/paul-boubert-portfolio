import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getAllCards, getRegistry, createCard, getStorageStatus } from "@/lib/cards-store";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const cards = await getAllCards(true);
    const registry = await getRegistry();
    const storageStatus = getStorageStatus();
    return NextResponse.json({
      success: true,
      total: cards.length,
      storageStatus,
      cards,
      registry,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur interne" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.companyName || !body.contactName || !body.publicId) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants : Nom entreprise, contact, ou identifiant permanent." },
        { status: 400 }
      );
    }

    const result = await createCard(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Carte créée avec succès.",
      card: result.card,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur de création" },
      { status: 500 }
    );
  }
}
