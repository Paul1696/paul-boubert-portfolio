import { NextRequest, NextResponse } from "next/server";
import { getCardByPublicId } from "@/lib/cards-store";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;
  const card = await getCardByPublicId(publicId);

  if (!card) {
    return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "svg";
  const isDownload = searchParams.get("download") === "1";

  const permanentUrl = `https://ateliersdepaul.com/c/${card.publicId}`;

  // Format 1000x1000px correspond à une résolution 300 DPI pour impression 8.5x8.5cm
  const size = format === "png" ? "1000x1000" : "600x600";
  const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(
    permanentUrl
  )}&margin=2&format=${format === "png" ? "png" : "svg"}`;

  try {
    const res = await fetch(qrServiceUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Échec de génération du QR code" }, { status: 502 });
    }

    const contentType = format === "png" ? "image/png" : "image/svg+xml";
    const buffer = await res.arrayBuffer();

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400");
    if (isDownload) {
      const ext = format === "png" ? "png" : "svg";
      headers.set("Content-Disposition", `attachment; filename="adp-qr-${card.publicId}-bat-300dpi.${ext}"`);
    }

    return new NextResponse(buffer, { status: 200, headers });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erreur réseau" }, { status: 500 });
  }
}
