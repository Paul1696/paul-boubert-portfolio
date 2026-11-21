export type CardStatus = "active" | "suspended" | "draft" | "archived";

export interface CardProductItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  icon?: string;
  image?: string;
}

export interface CardSocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  website?: string;
}

export interface DigitalCardData {
  id: string; // Identifiant technique interne
  publicId: string; // Identifiant permanent unique (ex: "tifo-0001")
  companyName: string;
  activity: string;
  slogan?: string;
  contactName: string;
  contactRole: string;
  phones: string[];
  primaryPhone: string;
  whatsappPhone: string;
  email?: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  branding: {
    primaryColor: string; // Ex: "#0D5C3A" (Vert ETS TIFO)
    accentYellow: string; // Ex: "#F5B700" (Jaune ETS TIFO)
    accentRed: string; // Ex: "#D62828" (Rouge ETS TIFO)
    backgroundColor: string; // Ex: "#F8FAF8" (Fond clair)
    textColor: string;
    logoUrl?: string;
    logoAlt?: string;
    isTemporaryLogo?: boolean;
    bannerUrl?: string;
  };
  products: CardProductItem[];
  socials?: CardSocialLinks;
  description?: string;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
  metadata?: {
    clientReference?: string;
    adpOrderReference?: string;
    printBatValidated?: boolean;
    printBatDate?: string;
  };
}

export interface CardRegistryEntry {
  publicId: string;
  cardId: string;
  companyName: string;
  contactName: string;
  permanentUrl: string;
  status: CardStatus;
  assignedAt: string;
  updatedAt: string;
  isLocked: boolean; // Si true, l'URL publique ne peut JAMAIS être modifiée ou réattribuée
}
