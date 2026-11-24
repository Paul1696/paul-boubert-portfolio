import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getCardByPublicId, updateCard, setCardStatus, deleteCard } from "@/lib/cards-store";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { publicId } = await params;
  const card = await getCardByPublicId(publicId, true);
  if (!card) {
    return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
  }

  return NextResponse.json({ success: true, card });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { publicId } = await params;
  try {
    const updates = await request.json();
    const result = await updateCard(publicId, updates);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      message: "Carte mise à jour avec succès.",
      card: result.card,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur de mise à jour" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { publicId } = await params;
  try {
    const { status } = await request.json();
    if (!status || !["active", "suspended", "draft", "archived"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    const result = await setCardStatus(publicId, status);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Statut mis à jour vers : ${status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur de mise à jour du statut" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { publicId } = await params;
  try {
    const result = await deleteCard(publicId);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: `Carte ${publicId} supprimée avec succès.` });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
