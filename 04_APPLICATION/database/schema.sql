-- =============================================================================
-- ADP WEB EXPERIENCE — SCHÉMA UNIFIÉ POSTGRESQL (PRODUCTION & STAGING)
-- Version : 1.0.0
-- Compatibilité : PostgreSQL 14+, Neon Serverless, Supabase, Vercel Postgres
-- Cadre Déontologique : Loi Camerounaise n° 90/039 (ONAC)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. TABLE : admin_users
-- Utilisateurs habilités pour l'administration ADP Control
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'technician' CHECK (role IN ('superadmin', 'admin', 'technician', 'editor')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. TABLE : clients
-- Répertoire centralisé des clients et commanditaires tous univers confondus
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(100) NOT NULL,
    organization VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Douala',
    country VARCHAR(100) DEFAULT 'Cameroun',
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients (phone);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients (email);

-- -----------------------------------------------------------------------------
-- 3. TABLE : companies
-- Entreprises clientes souscrivant aux services ADP (ex: Digital Cards)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    activity TEXT,
    slogan TEXT,
    primary_color VARCHAR(20) DEFAULT '#0D5C3A',
    accent_yellow VARCHAR(20) DEFAULT '#F5B700',
    accent_red VARCHAR(20) DEFAULT '#D62828',
    logo_url TEXT,
    cover_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. TABLE : digital_cards
-- Cartes de visite numériques NFC/QR permanentes (ADP Digital Cards)
-- Règle absolue : L'identifiant public 'tifo-0001' est réservé à ETS TIFO
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS digital_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(50) NOT NULL UNIQUE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_name VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'draft', 'archived')),
    card_type VARCHAR(50) DEFAULT 'standard',
    theme_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_digital_cards_public_id ON digital_cards (public_id);
CREATE INDEX IF NOT EXISTS idx_digital_cards_status ON digital_cards (status);

-- -----------------------------------------------------------------------------
-- 5. TABLE : digital_card_profiles
-- Coordonnées et profils nominatifs associés à une carte numérique
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS digital_card_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_id UUID NOT NULL REFERENCES digital_cards(id) ON DELETE CASCADE,
    contact_name VARCHAR(255) NOT NULL,
    contact_role VARCHAR(150),
    phone_primary VARCHAR(100) NOT NULL,
    phone_secondary VARCHAR(100),
    whatsapp_phone VARCHAR(100),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100) DEFAULT 'Douala',
    country VARCHAR(100) DEFAULT 'Cameroun',
    google_maps_url TEXT,
    website_url TEXT,
    vcard_data TEXT,
    products_catalog_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_card_profiles_card_id ON digital_card_profiles (card_id);

-- -----------------------------------------------------------------------------
-- 6. TABLE : products
-- Catalogue unifié des produits (ADP Studio & autres univers marchands)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    family_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    badge VARCHAR(100),
    universe_slug VARCHAR(50) DEFAULT 'adp-studio',
    base_price_xaf INT NOT NULL DEFAULT 0,
    price_status VARCHAR(50) NOT NULL DEFAULT 'valide' CHECK (price_status IN ('valide', 'indicatif', 'devis_obligatoire')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_family ON products (family_id);

-- -----------------------------------------------------------------------------
-- 7. TABLE : product_variants
-- Variantes de formats, supports et finitions des produits
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(100),
    price_delta_xaf INT NOT NULL DEFAULT 0,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants (product_id);

-- -----------------------------------------------------------------------------
-- 8. TABLE : pricing_rules
-- Règles et barèmes tarifaires transversaux (papiers, finitions, services, logistique)
-- Règle : Les suppléments non validés officiellement sont marqués 'indicatif'
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_category VARCHAR(100) NOT NULL,
    rule_key VARCHAR(100) NOT NULL UNIQUE,
    label VARCHAR(255) NOT NULL,
    price_xaf INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'valide' CHECK (status IN ('valide', 'indicatif', 'devis_obligatoire')),
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. TABLE : orders
-- Registre officiel des commandes d'atelier
-- Workflow contractuel strict : 7 étapes obligatoires
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(100) NOT NULL UNIQUE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'commande_soumise' CHECK (
        status IN (
            'commande_soumise',         -- 1. Demande enregistrée
            'transmission_effectuee',   -- 2. Transmission effectuée
            'verification_adp',         -- 3. Vérification technique ADP
            'bat_transmis',             -- 4. Bon À Tirer (BAT) transmis au client
            'bat_valide',               -- 5. BAT validé par le client
            'production_autorisee',     -- 6. Mise en production autorisée
            'livraison_en_cours',       -- 7a. En cours d'acheminement
            'livree',                   -- 7b. Commande réceptionnée et soldée
            'annulee'                   -- Annulation formelle
        )
    ),
    delivery_mode VARCHAR(50) NOT NULL DEFAULT 'atelier_pickup',
    delivery_address TEXT,
    total_items_count INT NOT NULL DEFAULT 0,
    total_products_xaf INT NOT NULL DEFAULT 0,
    total_delivery_xaf INT NOT NULL DEFAULT 0,
    grand_total_xaf INT NOT NULL DEFAULT 0,
    has_custom_quote_items BOOLEAN NOT NULL DEFAULT FALSE,
    current_bat_version INT NOT NULL DEFAULT 1,
    notes_production TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders (reference);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- -----------------------------------------------------------------------------
-- 10. TABLE : order_items
-- Lignes détaillées des commandes
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_slug VARCHAR(100) NOT NULL,
    product_title VARCHAR(255) NOT NULL,
    variant_name VARCHAR(150),
    quantity INT NOT NULL DEFAULT 1,
    unit_price_xaf INT NOT NULL DEFAULT 0,
    total_price_xaf INT NOT NULL DEFAULT 0,
    custom_options_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);

-- -----------------------------------------------------------------------------
-- 11. TABLE : bat_records
-- Historique traçable des versions et validations de BAT contractuels
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bat_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    version INT NOT NULL DEFAULT 1,
    decision VARCHAR(50) NOT NULL DEFAULT 'en_attente' CHECK (
        decision IN ('en_attente', 'valide', 'modifications_demandees', 'rejete')
    ),
    technician_notes TEXT,
    client_feedback TEXT,
    file_preview_url TEXT,
    validated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bat_order_version ON bat_records (order_id, version);

-- -----------------------------------------------------------------------------
-- 12. TABLE : quotes
-- Registre des devis de prestations transversales
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'enregistre_serveur',
    client_name_masked VARCHAR(100),
    client_phone_masked VARCHAR(50),
    client_email_masked VARCHAR(100),
    project_name VARCHAR(255),
    location VARCHAR(100),
    program_type VARCHAR(100),
    services_count INT NOT NULL DEFAULT 0,
    services_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotes_reference ON quotes (reference);

-- -----------------------------------------------------------------------------
-- 13. TABLE : briefs
-- Dossiers de cadrage interactifs issus d'ADP Brief
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS briefs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(100) NOT NULL UNIQUE,
    domain VARCHAR(100) NOT NULL,
    domain_label VARCHAR(150),
    customer_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255),
    customer_organization VARCHAR(255),
    objective TEXT,
    scale_or_size VARCHAR(150),
    location VARCHAR(150),
    timeframe VARCHAR(150),
    budget_notice VARCHAR(150),
    documents_available_json JSONB,
    client_notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'reçu' CHECK (
        status IN ('reçu', 'en_cours_analyse', 'echange_programme', 'devis_transmis', 'cloture')
    ),
    internal_notes TEXT,
    assigned_to VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_briefs_reference ON briefs (reference);
CREATE INDEX IF NOT EXISTS idx_briefs_status ON briefs (status);

-- -----------------------------------------------------------------------------
-- 14. TABLE : academy_enrollments
-- Pré-inscriptions et candidatures aux formations ADP Academy
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS academy_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(100) NOT NULL UNIQUE,
    course_id VARCHAR(100) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    candidate_name VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    current_level VARCHAR(100),
    format_preference VARCHAR(50) DEFAULT 'presentiel_atelier',
    motivation TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pre_inscription_recue' CHECK (
        status IN ('pre_inscription_recue', 'examen_dossier', 'entretien_orientation', 'session_planifiee', 'terminee')
    ),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academy_reference ON academy_enrollments (reference);
CREATE INDEX IF NOT EXISTS idx_academy_status ON academy_enrollments (status);

-- -----------------------------------------------------------------------------
-- 15. TABLE : portfolio_projects
-- Répertoire des 37 projets canoniques avec séparation stricte et conformité ONAC
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    public_alias VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    typology VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    year VARCHAR(20) NOT NULL,
    responsible_entity VARCHAR(50) NOT NULL CHECK (
        responsible_entity IN ('BARLABARLA', 'Personnel', 'Collaboration', 'Autre cabinet')
    ),
    status VARCHAR(50) NOT NULL CHECK (
        status IN ('Réalisé/livré', 'En chantier', 'Étude/conception', 'Suspendu/abandonné', 'Non précisé')
    ),
    paul_role VARCHAR(255),
    credits_onac TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    universe_slug VARCHAR(50) DEFAULT 'adp-project',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON portfolio_projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_entity ON portfolio_projects (responsible_entity);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON portfolio_projects (is_featured);

-- -----------------------------------------------------------------------------
-- 16. TABLE : activity_logs
-- Journal d'audit des opérations administratives et modifications sensibles
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    description TEXT NOT NULL,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs (created_at DESC);

-- -----------------------------------------------------------------------------
-- TRIGGERS DE MISE À JOUR AUTOMATIQUE (updated_at)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN
        SELECT table_name
        FROM information_schema.columns
        WHERE column_name = 'updated_at'
          AND table_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_update_timestamp ON %I;', tbl);
        EXECUTE format('CREATE TRIGGER trg_update_timestamp BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', tbl);
    END LOOP;
END;
$$;
