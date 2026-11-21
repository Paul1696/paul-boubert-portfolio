/**
 * Collection Prestations & Services ADP Control
 * DǸfinition conforme  l'%tape 07 et 08
 */

export interface ServiceType {
  id: string;
  slug: string;
  title: string;
  universeSlug: string;
  universeName: string;
  accentColor: string;
  shortDescription: string;
  deliverables: string[];
  typicalDuration: string;
  pricingModel: "Sur Devis Personnalisé" | "Forfait d'Atelier" | "Mission Mensuelle" | "Pack Clé en Main";
  status: "active" | "draft" | "archived";
}

export const ServicesCollection = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "universeName", "pricingModel", "status"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Intitulé de la prestation" },
    { name: "slug", type: "text", required: true, unique: true, label: "Slug" },
    { name: "universeSlug", type: "text", required: true, label: "Slug de l'univers" },
    { name: "universeName", type: "text", required: true, label: "Nom de l'univers" },
    { name: "accentColor", type: "text", label: "Couleur d'accent" },
    { name: "shortDescription", type: "textarea", required: true, label: "Description courte" },
    { name: "typicalDuration", type: "text", label: "Délai indicatif" },
    {
      name: "pricingModel",
      type: "select",
      options: [
        { label: "Sur Devis Personnalisé", value: "Sur Devis Personnalisé" },
        { label: "Forfait d'Atelier", value: "Forfait d'Atelier" },
        { label: "Mission Mensuelle", value: "Mission Mensuelle" },
        { label: "Pack Clé en Main", value: "Pack Clé en Main" },
      ],
      defaultValue: "Sur Devis Personnalisé",
      label: "Modèle tarifaire",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Actif", value: "active" },
        { label: "Brouillon", value: "draft" },
        { label: "Archivé", value: "archived" },
      ],
      defaultValue: "active",
      label: "Statut",
    },
  ],
};
