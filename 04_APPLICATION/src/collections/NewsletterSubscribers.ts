/**
 * Collection Abonnés Newsletter / Lettre d'Atelier
 * Conforme à l'Étape 08 et 11
 */

export interface SubscriberType {
  id: string;
  email: string;
  fullName?: string;
  subscribedAt: string;
  status: "subscribed" | "unconfirmed" | "unsubscribed";
  consentGiven: boolean;
  ipHash?: string;
}

export const NewsletterSubscribersCollection = {
  slug: "newsletter_subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "subscribedAt", "consentGiven"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, label: "Adresse courriel" },
    { name: "fullName", type: "text", label: "Nom ou organisation" },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Abonné confirmé", value: "subscribed" },
        { label: "En attente de confirmation", value: "unconfirmed" },
        { label: "Désabonné", value: "unsubscribed" },
      ],
      defaultValue: "subscribed",
      label: "Statut d'abonnement",
    },
    { name: "consentGiven", type: "checkbox", defaultValue: true, label: "Consentement RGPD / Législation locale" },
    { name: "subscribedAt", type: "date", label: "Date d'inscription" },
  ],
};
