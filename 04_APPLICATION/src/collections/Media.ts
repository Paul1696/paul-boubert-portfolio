/**
 * Collection Médias Centralisée Ateliers de Paul
 * Traitement automatisé des visuels, formats WebP optimisés et alt text obligatoire
 */

export interface MediaType {
  id: string;
  alt: string;
  caption?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  focalX?: number;
  focalY?: number;
  sizes?: {
    thumbnail?: { url: string; width: number; height: number };
    card?: { url: string; width: number; height: number };
    hero?: { url: string; width: number; height: number };
  };
  createdAt: string;
  updatedAt: string;
}

export const MediaCollection = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif d\'accessibilité (alt text)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende ou crédit photographique',
    },
  ],
};
