import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { verifyBatDestination, updateCard } from "@/lib/cards-store";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { publicId } = await params;
  try {
    const testResult = await verifyBatDestination(publicId);

    if (testResult.isValid) {
      await updateCard(publicId, {
        metadata: {
          printBatValidated: true,
          printBatDate: new Date().toISOString().split("T")[0],
        },
      });
    }

    return NextResponse.json({
      success: true,
      verification: testResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erreur de test BAT" },
      { status: 500 }
    );
  }
}
