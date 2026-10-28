/**
 * Collection Projets Ateliers de Paul (38 projets architecturaux)
 * Définition conforme à la matrice de migration 02B-07 et au rapport 03A-03
 */

export interface ProjectType {
  id: string;
  title: string;
  slug: string;
  universe: string;
  year: number;
  location: string;
  clientType: 'particulier' | 'professionnel' | 'institutionnel';
  summary: string;
  challenge: string;
  solution: string;
  materials: string[];
  coverImage?: string;
  gallery?: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

export const ProjectsCollection = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'universe', 'year', 'status', 'featured'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre du projet',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
    },
    {
      name: 'universe',
      type: 'relationship',
      relationTo: 'universes',
      required: true,
      label: 'Univers de rattachement',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Année de réalisation',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Localisation / Ville',
    },
    {
      name: 'clientType',
      type: 'select',
      options: [
        { label: 'Particulier', value: 'particulier' },
        { label: 'Professionnel / Entreprise', value: 'professionnel' },
        { label: 'Institutionnel / Collectivité', value: 'institutionnel' },
      ],
      label: 'Typologie de client',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Synthèse du projet',
    },
    {
      name: 'challenge',
      type: 'textarea',
      label: 'Enjeu & Problématique initiale',
    },
    {
      name: 'solution',
      type: 'textarea',
      label: 'Solution technique et architecturale apportée',
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Image de couverture',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Galerie photographique',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mettre en avant sur la page d\'accueil',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié en ligne', value: 'published' },
        { label: 'Archivé', value: 'archived' },
      ],
      label: 'Statut de publication',
    },
  ],
};
