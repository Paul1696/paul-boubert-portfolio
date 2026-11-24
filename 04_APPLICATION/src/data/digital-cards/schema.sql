-- ==============================================================================
-- ADP WEB EXPERIENCE — SCHÉMA POSTGRESQL POUR LE MODULE ADP DIGITAL CARDS
-- Table de persistance relationnelle pour le déploiement en production Vercel
-- Compatible : PostgreSQL 15+, Supabase, Neon, Vercel Postgres
-- ==============================================================================

-- 1. Table du registre d'attribution des identifiants permanents
CREATE TABLE IF NOT EXISTS card_registry (
    public_id VARCHAR(64) PRIMARY KEY,
    card_id VARCHAR(64) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    permanent_url VARCHAR(512) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    is_locked BOOLEAN NOT NULL DEFAULT true,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des cartes numériques complètes
CREATE TABLE IF NOT EXISTS digital_cards (
    id VARCHAR(64) PRIMARY KEY,
    public_id VARCHAR(64) NOT NULL UNIQUE REFERENCES card_registry(public_id) ON DELETE RESTRICT,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_role VARCHAR(255) NOT NULL,
    primary_phone VARCHAR(64) NOT NULL,
    whatsapp_phone VARCHAR(64) NOT NULL,
    city VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    version INT NOT NULL DEFAULT 1,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherches rapides et filtrage par statut
CREATE INDEX IF NOT EXISTS idx_digital_cards_public_id ON digital_cards(public_id);
CREATE INDEX IF NOT EXISTS idx_digital_cards_status ON digital_cards(status);
CREATE INDEX IF NOT EXISTS idx_card_registry_status ON card_registry(status);

-- 3. Données de référence de démarrage (Seed Immuable ETS TIFO)
INSERT INTO card_registry (public_id, card_id, company_name, contact_name, permanent_url, status, is_locked, assigned_at)
VALUES (
    'tifo-0001',
    'card-tifo-0001',
    'ETS TIFO',
    'Geordan FOKAM FOTSO',
    'https://ateliersdepaul.com/c/tifo-0001',
    'active',
    true,
    '2026-11-20T00:00:00.000Z'
) ON CONFLICT (public_id) DO NOTHING;

INSERT INTO digital_cards (id, public_id, company_name, contact_name, contactRole, primary_phone, whatsapp_phone, city, country, status, version, data)
VALUES (
    'card-tifo-0001',
    'tifo-0001',
    'ETS TIFO',
    'Geordan FOKAM FOTSO',
    'Directeur Général',
    '+237 699 92 07 20',
    '+237 699 92 07 20',
    'Douala',
    'Cameroun',
    'active',
    1,
    '{
      "id": "card-tifo-0001",
      "publicId": "tifo-0001",
      "companyName": "ETS TIFO",
      "activity": "Matériel et Confection Textile Professionnelle",
      "slogan": "Excellence textile, confection sur-mesure & fournitures d''atelier à Douala",
      "contactName": "Geordan FOKAM FOTSO",
      "contactRole": "Directeur Général",
      "phones": ["+237 699 92 07 20", "+237 677 34 56 78"],
      "primaryPhone": "+237 699 92 07 20",
      "whatsappPhone": "+237 699 92 07 20",
      "email": "contact@tifo-textile.cm",
      "address": "Akwa, Boulevard de la Liberté",
      "city": "Douala",
      "country": "Cameroun",
      "googleMapsUrl": "https://maps.google.com/?q=Akwa+Douala+Cameroun",
      "branding": {
        "primaryColor": "#0D5C3A",
        "accentYellow": "#F5B700",
        "accentRed": "#D62828",
        "backgroundColor": "#F8FAF8",
        "textColor": "#11161F",
        "isTemporaryLogo": false
      },
      "products": [
        {
          "id": "prod-1",
          "name": "Tissus & Étoffes Techniques",
          "category": "Matières Premières",
          "description": "Lin, coton lourd, toiles techniques et tissus d''ameublement pour professionnels."
        },
        {
          "id": "prod-2",
          "name": "Confection Uniformes & Vêtements Pro",
          "category": "Confection Sur-Mesure",
          "description": "Tenues de travail, uniformes institutionnels et équipements pour collectivités."
        },
        {
          "id": "prod-3",
          "name": "Accessoires de Mercerie & Fournitures",
          "category": "Mercerie Pro",
          "description": "Boutonnerie, fils haute résistance, fermetures et apprêts d''atelier."
        }
      ],
      "status": "active",
      "createdAt": "2026-11-20T00:00:00.000Z",
      "updatedAt": "2026-11-21T00:00:00.000Z",
      "version": 1,
      "metadata": {
        "clientReference": "CLI-TIFO-DLA-01",
        "adpOrderReference": "CMD-2026-089",
        "printBatValidated": true,
        "printBatDate": "2026-11-21"
      }
    }'::jsonb
) ON CONFLICT (public_id) DO NOTHING;
