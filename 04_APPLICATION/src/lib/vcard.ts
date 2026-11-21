import { DigitalCardData } from "@/types/digital-card";

/**
 * Générateur de carte de visite vCard 3.0 standard universel (iOS, Android, macOS, Windows).
 */
export function generateVCardString(card: DigitalCardData): string {
  const parts: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.contactName.split(" ").slice(1).join(" ")};${card.contactName.split(" ")[0]};;;`,
    `FN:${card.contactName}`,
    `ORG:${card.companyName}`,
    `TITLE:${card.contactRole}`,
  ];

  // Numéros de téléphone
  if (card.phones && card.phones.length > 0) {
    card.phones.forEach((phone, idx) => {
      const cleanPhone = phone.replace(/\s+/g, "");
      if (idx === 0) {
        parts.push(`TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`);
      } else {
        parts.push(`TEL;TYPE=WORK,VOICE:${cleanPhone}`);
      }
    });
  }

  // Email si renseigné
  if (card.email) {
    parts.push(`EMAIL;TYPE=INTERNET,WORK:${card.email}`);
  }

  // Adresse
  parts.push(`ADR;TYPE=WORK:;;${card.address};${card.city};;;${card.country}`);

  // URL permanente
  parts.push(`URL:https://ateliersdepaul.com/c/${card.publicId}`);

  // Note descriptive
  const productsSummary = card.products.map((p) => p.name).join(", ");
  parts.push(
    `NOTE:${card.activity} — Produits : ${productsSummary}. Carte numérique : https://ateliersdepaul.com/c/${card.publicId}`
  );

  parts.push("END:VCARD");
  return parts.join("\r\n");
}
