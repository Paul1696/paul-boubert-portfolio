/**
 * Collection des Demandes de Devis & Intentions (Leads)
 * Enregistrement préalable obligatoire avant dispatch WhatsApp / Email (Audit 03A-04 & 03A-13)
 */

export interface QuoteRequestType {
  id: string;
  reference: string;
  intentions: string[];
  universes: string[];
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  projectBudget?: string;
  projectTimeline?: string;
  message?: string;
  source: 'possibility_machine' | 'contact_form' | 'direct';
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

export const QuoteRequestsCollection = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'contactName', 'contactEmail', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      label: 'Numéro de référence',
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
      label: 'Nom du contact',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Email professionnel',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Numéro de téléphone / WhatsApp',
    },
    {
      name: 'intentions',
      type: 'json',
      label: 'Intentions sélectionnées (Possibility Machine)',
    },
    {
      name: 'universes',
      type: 'relationship',
      relationTo: 'universes',
      hasMany: true,
      label: 'Univers concernés',
    },
    {
      name: 'projectBudget',
      type: 'select',
      options: [
        { label: 'Moins de 20 000 €', value: 'sub_20k' },
        { label: '20 000 € — 50 000 €', value: '20k_50k' },
        { label: '50 000 € — 150 000 €', value: '50k_150k' },
        { label: '150 000 € — 500 000 €', value: '150k_500k' },
        { label: 'Plus de 500 000 €', value: 'above_500k' },
      ],
      label: 'Enveloppe budgétaire indicative',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Détails ou précisions du projet',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'possibility_machine',
      options: [
        { label: 'The Possibility Machine', value: 'possibility_machine' },
        { label: 'Formulaire de contact', value: 'contact_form' },
        { label: 'Contact direct / Téléphone', value: 'direct' },
      ],
      label: 'Origine du contact',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nouveau lead à qualifier', value: 'new' },
        { label: 'Contact établi', value: 'contacted' },
        { label: 'Devis transmis', value: 'quoted' },
        { label: 'Clôturé / Validé', value: 'closed' },
      ],
      label: 'Statut du traitement',
    },
  ],
};
