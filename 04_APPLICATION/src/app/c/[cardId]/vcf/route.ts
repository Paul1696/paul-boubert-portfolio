import { NextRequest, NextResponse } from "next/server";
import { getDigitalCardByPublicId } from "@/lib/digital-cards";
import { generateVCardString } from "@/lib/vcard";

interface RouteParams {
  params: Promise<{ cardId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { cardId } = await params;
  const card = getDigitalCardByPublicId(cardId);

  if (!card) {
    return new NextResponse("Carte numérique introuvable", { status: 404 });
  }

  const vcardContent = generateVCardString(card);
  const cleanFilename = `${card.contactName.replace(/\s+/g, "_")}_${card.companyName.replace(/\s+/g, "_")}.vcf`;

  return new NextResponse(vcardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${cleanFilename}"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
