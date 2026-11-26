import { DigitalCardData } from "@/types/digital-card";

/**
 * Générateur de carte de visite vCard 3.0 standard universel (iOS, Android, macOS, Windows).
 */
export function generateVCardString(card: DigitalCardData): string {
  const contactName = card.contactName || "Contact";
  const companyName = card.companyName || "Entreprise";
  const parts: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${contactName.split(" ").slice(1).join(" ")};${contactName.split(" ")[0]};;;`,
    `FN:${contactName}`,
    `ORG:${companyName}`,
    `TITLE:${card.contactRole || ""}`,
  ];

  const phones =
    Array.isArray(card.phones) && card.phones.length > 0
      ? card.phones
      : card.primaryPhone
      ? [card.primaryPhone]
      : [];

  phones.forEach((phone, idx) => {
    const cleanPhone = phone.replace(/\s+/g, "");
    if (idx === 0) {
      parts.push(`TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`);
    } else {
      parts.push(`TEL;TYPE=WORK,VOICE:${cleanPhone}`);
    }
  });

  if (card.email) {
    parts.push(`EMAIL;TYPE=INTERNET,WORK:${card.email}`);
  }

  parts.push(`ADR;TYPE=WORK:;;${card.address || ""};${card.city || "Douala"};;;${card.country || "Cameroun"}`);
  parts.push(`URL:https://ateliersdepaul.com/c/${card.publicId}`);

  const productsSummary = (card.products || []).map((p) => p.name).join(", ");
  parts.push(
    `NOTE:${card.activity || ""}${productsSummary ? ` — Spécialités : ${productsSummary}` : ""}. Carte numérique : https://ateliersdepaul.com/c/${card.publicId}`
  );

  parts.push("END:VCARD");
  return parts.join("\r\n");
}
