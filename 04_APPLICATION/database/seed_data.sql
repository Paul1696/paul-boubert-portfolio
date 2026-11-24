-- =============================================================================
-- ADP WEB EXPERIENCE — DONNÉES INITIALES ET MIGRATION IDEMPOTENTE (SEED)
-- Idempotent : Peut être exécuté plusieurs fois sans créer de doublons
-- =============================================================================

-- 1. Administrateur par défaut
INSERT INTO admin_users (username, email, password_hash, role, is_active)
VALUES (
    'adp-admin',
    'contact@ateliersdepaul.com',
    '$2b$12$e6xU7n2gZ8WbY8xL7g9q.e4vV5M7d8p9q0r1s2t3u4v5w6x7y8z9a',
    'superadmin',
    TRUE
)
ON CONFLICT (username) DO UPDATE SET
    role = EXCLUDED.role,
    updated_at = NOW();

-- 2. Entreprise et Carte Numérique Permanente ETS TIFO (tifo-0001)
INSERT INTO companies (id, name, slug, activity, slogan, primary_color, accent_yellow, accent_red, logo_url)
VALUES (
    'c1111111-1111-1111-1111-111111111111',
    'ETS TIFO',
    'ets-tifo',
    'Matériaux de construction, quincaillerie générale et équipements professionnels',
    'La référence des bâtisseurs au Cameroun',
    '#0D5C3A',
    '#F5B700',
    '#D62828',
    '/images/cards/tifo/logo.png'
)
ON CONFLICT (slug) DO UPDATE SET
    activity = EXCLUDED.activity,
    slogan = EXCLUDED.slogan;

INSERT INTO digital_cards (id, public_id, company_id, company_name, status, card_type)
VALUES (
    'd1111111-1111-1111-1111-111111111111',
    'tifo-0001',
    'c1111111-1111-1111-1111-111111111111',
    'ETS TIFO',
    'active',
    'premium_nfc'
)
ON CONFLICT (public_id) DO UPDATE SET
    status = EXCLUDED.status;

INSERT INTO digital_card_profiles (card_id, contact_name, contact_role, phone_primary, phone_secondary, whatsapp_phone, email, address, city, country, google_maps_url)
VALUES (
    'd1111111-1111-1111-1111-111111111111',
    'Direction Commerciale',
    'Service Commercial & Logistique',
    '+237 699 00 00 00',
    '+237 677 00 00 00',
    '+237 699 00 00 00',
    'contact@etstifo.cm',
    'Zone Industrielle Bassa',
    'Douala',
    'Cameroun',
    'https://maps.google.com/?q=Douala+Bassa'
)
ON CONFLICT DO NOTHING;

-- 3. Règles Tarifaires Transversales (PAO et Yaoundé identifiés comme indicatifs)
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('finishing', 'pelliculage_mat', 'Pelliculage Mat Soft-Touch', 2500, 'valide', 'Finition standard protégée')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('finishing', 'pelliculage_brillant', 'Pelliculage Brillant Haute Densité', 2500, 'valide', 'Protection brillante')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('finishing', 'vernis_selectif_3d', 'Vernis Sélectif 3D Scodix', 7500, 'valide', 'Relief tactile UV')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('finishing', 'dorure_a_chaud', 'Dorure à Chaud Or / Cuivre', 9500, 'valide', 'Marquage prestige')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('services', 'service_bat_express', 'Service BAT Express 24h', 5000, 'valide', 'Priorité atelier 24h ouvrées')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('services', 'service_pao_mise_en_page', 'Assistance PAO & Mise en page', 15000, 'indicatif', 'Tarif provisoire à l''étude - validation requise avant engagement')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('logistics', 'atelier_pickup', 'Retrait gratuit à l''Atelier Douala', 0, 'valide', 'Retrait immédiat dès avis de mise à disposition')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('logistics', 'coursier_douala', 'Coursier Express Douala', 2500, 'valide', 'Livraison intramuros Douala')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;
INSERT INTO pricing_rules (rule_category, rule_key, label, price_xaf, status, notes)
VALUES ('logistics', 'yaounde_navette', 'Navette Régionale Yaoundé', 5000, 'indicatif', 'Acheminement Yaoundé - soumis à confirmation de faisabilité')
ON CONFLICT (rule_key) DO UPDATE SET
    price_xaf = EXCLUDED.price_xaf,
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;

-- 4. Catalogue des 22 Produits ADP Studio 2026
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('cartes-visite-connectees-adp-digital', 'cartes-visite', 'Cartes d''Affaires Connectées — ADP Digital Cards', 'L''alliance de l''impression physique de luxe et du QR code permanent certifié', 'La solution signature d''ADP Studio : cartes imprimées sur papier d''art 400g avec QR code définitif scannable reliant vers votre profil professionnel interactif et téléchargement vCard.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('cartes-de-visite-prestige-papier-d-art', 'cartes-visite', 'Cartes d''Affaires Prestige & Finitions d''Atelier', 'L''artisanat de l''imprimerie noble pour signatures de premier rang', 'Cartes de visite traditionnelles de haute facture : papiers de création Fedrigoni ou Arches, gaufrage en creux, marquage à chaud et tranche dorée.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('badges-et-cartes-pvc-rigides', 'cartes-visite', 'Badges Membres & Cartes PVC Rigides', 'Cartes durables indéchirables pour résidences privées, clubs & accès corporate', 'Cartes plastique PVC 760 microns (format carte bancaire) personnalisées avec QR code sécurisé, puce NFC optionnelle ou vernis sélectif.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('creation-logotype-identite-visuelle', 'identite-visuelle', 'Création de Logotype Maître & Emblème Vectoriel', 'La signature graphique essentielle de votre marque ou de votre cabinet', 'Recherche sémantique approfondie, esquisses de géométrie sacrée et livrables vectoriels complets tous formats (SVG, EPS, PDF, PNG transparents HD).', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('charte-graphique-complete-brand-guidelines', 'identite-visuelle', 'Charte Graphique Complète & Brand Guidelines d''Atelier', 'Le document d''autorité fixant l''intégralité des règles visuelles de l''entreprise', 'Ouvrage de référence de 30 à 60 pages détaillant les principes de construction, la grille de mise en page, les interdits et les applications multi-supports.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('branding-de-programme-immobilier', 'identite-visuelle', 'Pack Branding & Identité de Programme Immobilier', 'Valoriser vos opérations foncières et séduire acquéreurs et investisseurs', 'Création complète de l''univers d''une opération immobilière : nommage (naming), identité visuelle du programme, charte des plans de vente et signalétique de chantier.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('plaquettes-commerciales-et-brochures-de-vente', 'supports-edition', 'Plaquettes Commerciales & Brochures de Vente', 'Mise en page éditoriale rigoureuse pour sublimer vos réalisations et produits', 'Brochures agrafées (piqûre à cheval) ou 3 volets grand format, alliant photographies d''architecture, plans stylisés et typographie soignée.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('rapports-annuels-et-dossiers-investisseurs', 'supports-edition', 'Rapports Annuels & Dossiers d''Investissement', 'L''édition institutionnelle de prestige pour assemblées générales et bailleurs', 'Mise en forme graphique de données complexes, infographies chiffrées, tableaux financiers et reliure dos carré collé de haute tenue.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('papeterie-d-affaires-coordonnee', 'supports-edition', 'Pack Papeterie d''Affaires Coordonnée', 'Têtes de lettre, chemises à rabat, enveloppes filigranées et blocs-notes', 'L''ensemble indispensable des fournitures d''affaires de direction : chemises à rabat avec encoches pour cartes, papier à en-tête compatible imprimantes laser et enveloppes imprimées.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('signaletique-architecturale-et-plaques-de-reperage', 'signaletique', 'Signalétique Architecturale & Plaques de Repérage', 'Orientation spatiale, plaques d''étage et repérage élégant intégré au bâti', 'Système complet de guidage visuel pour sièges d''entreprises, résidences et cliniques : plaques de porte, repérage d''étages et plans d''évacuation esthétiques.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('totems-d-accueil-et-lettrages-3d-en-relief', 'signaletique', 'Totems d''Accueil & Lettrages 3D en Relief', 'Enseignes volumétriques monumentales et signalétique extérieure d''autorité', 'Conception de totems directionnels extérieurs en aluminium dibond thermolaqué et lettrages métalliques en relief découpés au laser avec rétro-éclairage LED.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('habillages-muraux-et-vitrophanies-d-atelier', 'signaletique', 'Habillages Muraux & Vitrophanie Décorative', 'Graphisme d''espace, vitrophanie d''intimité dépolie et fresques murales', 'Films dépolis pour cloisons vitrées de bureaux, motifs géométriques architecturaux découpés et toiles murales grand format imprimées.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('polos-et-chemises-d-entreprise-brodees', 'textile-image', 'Polos & Chemises d''Entreprise Brodés', 'Vêtements d''image corporate avec broderie de précision cœur et dos', 'Polos en maille piquée 100% coton peigné lourd (220g) ou chemises de coupe soignée, personnalisés par broderie industrielle haute tenue.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('tabliers-d-atelier-et-tenues-de-service', 'textile-image', 'Tabliers d''Atelier & Tenues de Métier Stylisées', 'Confection artisanale robuste pour ateliers d''art, cafés, réceptions et hôtellerie', 'Tabliers à bavette en toile forte de coton, lin épais ou denim brut, avec lanières en cuir véritable ou attaches croisées dans le dos pour un port confortable prolongé.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('plans-de-vente-2d-et-3d-decores', 'infographie-immobiliere', 'Plans de Vente 2D & 3D Décorés pour Promoteurs', 'Mise en valeur visuelle des surfaces, du mobilier et de la fluidité des espaces', 'Transformation des plans techniques d''architecte (Revit/AutoCAD) en plans de commercialisation élégants, colorisés avec parquet, carrelages et cotation commerciale.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('dossier-de-commercialisation-immobilier-cle-en-main', 'infographie-immobiliere', 'Dossier de Commercialisation Immobilier Clé en Main', 'La suite complète pour lancer la vente d''une opération neuve en toute sérénité', 'Pack complet regroupant l''identité du programme, la série des plans de vente stylisés, le livret d''accueil acquéreur et la plaquette commerciale grand format.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('depliants-architecture-plaquettes-3-volets', 'supports-edition', 'Dépliants d''Architecture & Plaquettes 3 Volets', 'Supports d''édition 3 volets (6 pages) sur papier couché satiné avec rainage mécanique soigné.', 'Dépliants 3 volets format fermé 10x21 cm ou A5 sur couché satiné 170g ou demi-mat 250g avec rainage mécanique anti-craquelure.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('affiches-exposition-posters-architecture-grand-format', 'supports-edition', 'Affiches d''Exposition & Posters d''Architecture A2 / A1', 'Tirage grand format haute fidélité sur papier photo satiné 200g pour concours et galeries.', 'Tirage grand format haute fidélité sur papier photo satiné 200g ou papier d''art mat pour concours, expositions et présentations d''agences.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('panneaux-chantier-baches-reglementaires', 'signaletique', 'Panneaux de Chantier & Bâches Réglementaires', 'Affichage obligatoire de permis de construire et bâches promotionnelles extérieures durables.', 'Panneaux d''affichage légal de permis de construire et bâches géantes imprimées sur polypropylène alvéolaire Akilux 3.5mm ou bâche PVC 510g M1.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('gilets-securite-casquettes-corporate-chantier', 'textile-image', 'Gilets de Sécurité & Casquettes Corporate de Chantier', 'Gilets classe 2 certifiés EN ISO 20471 et casquettes brodées pour visites et équipes de maîtrise d''œuvre.', 'Gilets de chantier haute visibilité classe 2 certifiés EN ISO 20471 et casquettes structurées avec marquage ou broderie haute densité.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('animations-video-visites-virtuelles-3d', 'infographie-immobiliere', 'Animations Vidéo & Visites Virtuelles 3D de Projet', 'Clips cinématiques 4K et visites immersives 360° scénarisées pour promoteurs et investisseurs.', 'Vidéos de présentation cinématiques 4K et parcours virtuels immersifs restituant l''expérience spatiale du projet avant travaux.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;
INSERT INTO products (slug, family_id, title, subtitle, description, badge, base_price_xaf, price_status, universe_slug)
VALUES ('dossiers-plans-permis-de-construire-dao', 'infographie-immobiliere', 'Dossiers de Plans Permis de Construire & DAO', 'Mise au net technique DAO et mise en page normalisée des pièces graphiques réglementaires.', 'Élaboration soignée des pièces graphiques du permis de construire (situation, masse, coupes, façades) et plans techniques DAO.', NULL, 0, 'valide', 'adp-studio')
ON CONFLICT (slug) DO UPDATE SET
    family_id = EXCLUDED.family_id,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    base_price_xaf = EXCLUDED.base_price_xaf,
    price_status = EXCLUDED.price_status;

-- 5. Les 37 Projets Canoniques du Portfolio (Conformité Déontologique Loi ONAC 90/039)
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('018-studio', 'Studio Graphite', 'Résidentiel', 'Douala, Cameroun', '2026', 'Personnel', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude d''architecture et de design d''espace développée par Paul Boubert / Les Ateliers de Paul.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('bahemeck', 'Appartement Bonanjo', 'Résidentiel', 'Douala, Cameroun', 'Janvier–septembre 2023', 'Personnel', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude d''architecture et de design d''espace développée par Paul Boubert / Les Ateliers de Paul.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('bicec-bafoussam', 'BICEC Bafoussam', 'Tertiaire', 'Bafoussam, Cameroun', '2023–2026', 'BARLABARLA', 'Étude/conception', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('bicec-usca', 'BICEC USCA', 'Résidentiel', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('boj', 'Le Bojolais', 'Tertiaire', 'Douala, Cameroun', '2026', 'Autre cabinet', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude menée en partenariat avec un cabinet tiers agréé.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('boutique-biyem-assi', 'Boutique Biyem', 'Tertiaire', 'Yaoundé, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('bureau-dsi', 'Bureaux DSI', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('cabinet-elena', 'Cabinet Dentaire Elena', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('croissanterie', 'La Croissanterie', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('duplex-domegne', 'Duplex Domegne', 'Tertiaire', 'Douala, Cameroun', '2022', 'Personnel', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude d''architecture et de design d''espace développée par Paul Boubert / Les Ateliers de Paul.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('emeraude', 'Villa Emeraude', 'Tertiaire', 'Douala, Cameroun', '2021', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('enem', 'Concession Enem', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('entrepot', 'Entrepôt Logistique', 'Tertiaire', 'Douala, Cameroun', '2024', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('grill-way', 'Grill Way', 'Tertiaire', 'Douala, Cameroun', '2024', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('harmony', 'Villa Harmony', 'Résidentiel', 'Édéa, Cameroun', 'Septembre–décembre 2024', 'BARLABARLA', 'En chantier', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('horizon', 'Villa Horizon', 'Tertiaire', 'Douala, Cameroun', '2026', 'Collaboration', 'Étude/conception', 'Chef de projet / Architecte concepteur', 'Collaboration professionnelle en association de maîtrise d''œuvre.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('hotel-bertoua', 'Hôtel de Bertoua', 'Tertiaire', 'Bertoua, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('hunter', 'Résidence Hunter', 'Tertiaire', 'Bonapriso, Douala — Cameroun', '2024', 'Collaboration', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Collaboration professionnelle en association de maîtrise d''œuvre.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('lipem', 'Résidence Lipem', 'Tertiaire', 'Douala, Cameroun', '2024', 'Personnel', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude d''architecture et de design d''espace développée par Paul Boubert / Les Ateliers de Paul.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('mandeng', 'Villa Mandeng', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('mbella', 'Résidence Mbella', 'Tertiaire', 'Douala, Cameroun', '2026', 'Collaboration', 'En chantier', 'Chef de projet / Architecte concepteur', 'Collaboration professionnelle en association de maîtrise d''œuvre.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('meeting-room', 'Meeting Room Corporate', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('mme-edzigui', 'Résidence Mme Edzigui', 'Tertiaire', 'Douala, Cameroun', '2021', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('oasis', 'Résidence Oasis', 'Tertiaire', 'Kribi, Cameroun', '2026', 'Autre cabinet', 'Étude/conception', 'Chef de projet / Architecte concepteur', 'Étude menée en partenariat avec un cabinet tiers agréé.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('owona', 'Villa M. Owona', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('perenco-offices', 'Bureaux Perenco', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Étude/conception', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('petrofor-base', 'Base Industrielle Petrofor', 'Tertiaire', 'Douala, Cameroun', '2023', 'BARLABARLA', 'En chantier', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('pharmacie-studio', 'Pharmacie & Studio', 'Tertiaire', 'Douala, Cameroun', '2026', 'Personnel', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Étude d''architecture et de design d''espace développée par Paul Boubert / Les Ateliers de Paul.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('residence-h', 'Résidence H', 'Tertiaire', 'Yaoundé, Cameroun', '2025', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('residence-soa', 'Résidence Universitaire SOA', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('salle-de-fete', 'Salle de Fêtes & Événements', 'Tertiaire', 'Bonanjo, Douala, Cameroun', 'Juin 2024', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('sequoia', 'Duplex Séquoia', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('showroom-kotto', 'Showroom Kotto', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('suka-cafe', 'SUKA Café Terrasse', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('tonye', 'Immeuble Tonye', 'Résidentiel', 'Bonapriso, Douala, Cameroun', '2022 — provisoire', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('web-tower', 'D', 'Tertiaire', 'Douala, Cameroun', '2026', 'BARLABARLA', 'Suspendu/abandonné', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;
INSERT INTO portfolio_projects (slug, title, typology, location, year, responsible_entity, status, paul_role, credits_onac, is_featured)
VALUES ('workbox', 'Workbox', 'Tertiaire', 'Douala, Cameroun', '2024', 'BARLABARLA', 'Réalisé/livré', 'Chef de projet / Architecte concepteur', 'Projet réalisé au sein du cabinet d''architecture BARLABARLA Architectes sous la direction de l''architecte en chef ONAC.', FALSE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    is_featured = EXCLUDED.is_featured,
    credits_onac = EXCLUDED.credits_onac;