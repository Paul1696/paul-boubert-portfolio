/**
 * Collection Publications & Actualités Éditioriales ADP Control
 * Conforme à l'Étape 08 et 11
 */

export interface ArticleType {
  id: string;
  slug: string;
  title: string;
  category: "Architecture" | "BIM & Digital" | "Recherche Tropicale" | "Textile & Wax" | "Vie d'Atelier";
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  coverImage?: string;
  status: "draft" | "published" | "scheduled";
  tags: string[];
}

export const ArticlesCollection = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "author", "status", "publishedAt"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Titre de la publication" },
    { name: "slug", type: "text", required: true, unique: true, label: "Slug URL" },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Architecture", value: "Architecture" },
        { label: "BIM & Digital", value: "BIM & Digital" },
        { label: "Recherche Tropicale", value: "Recherche Tropicale" },
        { label: "Textile & Wax", value: "Textile & Wax" },
        { label: "Vie d'Atelier", value: "Vie d'Atelier" },
      ],
      label: "Catégorie",
    },
    { name: "excerpt", type: "textarea", required: true, label: "Chapô / Résumé court" },
    { name: "content", type: "richText", required: true, label: "Corps du texte" },
    { name: "author", type: "text", defaultValue: "Paul Boubert", label: "Auteur" },
    { name: "coverImage", type: "upload", relationTo: "media", label: "Image de couverture" },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Brouillon", value: "draft" },
        { label: "Publié", value: "published" },
        { label: "Planifié", value: "scheduled" },
      ],
      defaultValue: "draft",
      label: "Statut de publication",
    },
  ],
};
