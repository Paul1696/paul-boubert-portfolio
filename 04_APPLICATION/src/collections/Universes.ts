/**
 * Collection des Sept Univers Ateliers de Paul
 * Structure éditoriale centralisée pour The Possibility Machine
 */

export interface UniverseType {
  id: string;
  order: number;
  slug: string;
  name: string;
  signatureMaterials: string;
  headline: string;
  summary: string;
  featuredMedia?: string;
  isActive: boolean;
}

export const UniversesCollection = {
  slug: 'universes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'name', 'slug', 'isActive'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Ordre d\'affichage (1 à 7)',
      min: 1,
      max: 7,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Intitulé de l\'univers',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Identifiant URL (slug)',
    },
    {
      name: 'signatureMaterials',
      type: 'text',
      required: true,
      label: 'Matières & matériaux signatures',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Accroche architecturale',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Description détaillée',
    },
    {
      name: 'featuredMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Visuel signature de l\'univers',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Univers actif et visible en ligne',
    },
  ],
};
