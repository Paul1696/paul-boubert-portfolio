import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { exportCardsBackup, restoreCardsBackup } from "@/lib/cards-store";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const backup = exportCardsBackup();
    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="adp-digital-cards-backup-${Date.now()}.json"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur d'export de sauvegarde" },
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
    const payload = await request.json();
    const result = restoreCardsBackup(payload);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${result.importedCount} cartes restaurées avec succès.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur de restauration de sauvegarde" },
      { status: 500 }
    );
  }
}
