/**
 * Collection Utilisateurs / Administrateurs ADP Control
 * Définition conforme à l'architecture cible Étape 03A & 03B
 */

export interface UserType {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export const UsersCollection = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom complet',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Administrateur', value: 'superadmin' },
        { label: 'Administrateur Atelier', value: 'admin' },
        { label: 'Éditeur de Contenu', value: 'editor' },
      ],
      label: 'Niveau d\'accès',
    },
  ],
};
