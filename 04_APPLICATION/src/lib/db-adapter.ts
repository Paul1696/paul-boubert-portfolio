import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import { OrderRecord, OrderStatus, BATDecision, BATRecord } from "@/types/cart";

export class DatabaseUnavailableError extends Error {
  public readonly statusCode: number = 503;
  constructor(message: string) {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

export interface DatabaseStatus {
  configured: boolean;
  operational: boolean;
  driver: "neon_serverless" | "postgresql" | "local_json_fallback" | "unconfigured_serverless";
  driverPackage: string;
  environment: string;
  isPersistentInProduction: boolean;
  message: string;
  databaseUrlProvided: boolean;
  schemaVersion: string;
  connectionTest?: {
    success: boolean;
    latencyMs?: number;
    serverTime?: string;
    databaseName?: string;
    pgVersion?: string;
    error?: string;
  };
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  user?: string;
}

export interface ClientRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  city: string;
  country: string;
  deliveryAddress?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredBriefRecord {
  reference: string;
  createdAt: string;
  updatedAt?: string;
  domain: string;
  domainLabel: string;
  objective: string;
  scaleOrSize: string;
  location: string;
  timeframe: string;
  budgetNotice: string;
  documentsAvailable: string[];
  uploadedFilesSimulation: string[];
  clientNotes: string;
  customer: {
    fullName: string;
    organization?: string;
    phone: string;
    email: string;
    city: string;
  };
  status: "reçu" | "en_cours_analyse" | "echange_programme" | "devis_transmis" | "cloture";
  internalNotes?: string;
  assignedTo?: string;
}

export interface StoredAcademyRecord {
  reference: string;
  createdAt: string;
  updatedAt?: string;
  courseId: string;
  courseTitle: string;
  candidateName: string;
  phone: string;
  email: string;
  currentLevel: string;
  formatPreference: "presentiel_atelier" | "visio_interactive";
  motivation: string;
  status: "pre_inscription_recue" | "examen_dossier" | "entretien_orientation" | "session_planifiee" | "terminee";
  internalNotes?: string;
}

export interface ProjectOverrideRecord {
  slug: string;
  status?: string;
  creditsOnac?: string;
  isFeatured?: boolean;
}

const ACTIVITY_LOG_FILE = "activity-log.json";
const CLIENTS_FILE = "clients-log.json";
const ORDERS_FILE = "orders-log.json";
const BRIEFS_FILE = "briefs-log.json";
const ACADEMY_FILE = "academy-log.json";
const QUOTES_FILE = "quotes-log.json";
const OVERRIDES_FILE = "project-overrides.json";

export function isServerlessRuntime(): boolean {
  return process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;
}

export function getPgUrl(): string | null {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.DATABASE_URI?.trim() ||
    process.env.SUPABASE_POSTGRES_URL?.trim() ||
    null
  );
}

/**
 * Exige PostgreSQL dès qu'on est en environnement Vercel (Preview / Production) ou dès qu'une URL est fournie.
 * Interdit tout repli silencieux vers local_json_fallback pour les écritures sur Vercel.
 */
export function assertWritableStorage(): "postgres" | "local_dev" {
  const pgUrl = getPgUrl();
  if (pgUrl) {
    return "postgres";
  }
  if (isServerlessRuntime()) {
    throw new DatabaseUnavailableError(
      "Base PostgreSQL indisponible sur cet environnement Vercel (DATABASE_URL / POSTGRES_URL absent). Aucun repli silencieux sur fichiers locaux n'est autorisé en préproduction/production."
    );
  }
  return "local_dev";
}

/**
 * Exécute une requête SQL paramétrée via le pilote officiel @neondatabase/serverless.
 * Initialisation paresseuse pour préserver la compilation statique Next.js sans variable définie.
 */
export async function executeSql<T = Record<string, any>>(
  query: string,
  params: any[] = []
): Promise<{ rows: T[]; rowCount: number }> {
  const pgUrl = getPgUrl();
  if (!pgUrl) {
    throw new DatabaseUnavailableError(
      "Variable DATABASE_URL ou POSTGRES_URL non configurée."
    );
  }

  try {
    const sql = neon(pgUrl, { fullResults: true });
    const res = await sql.query(query, params);
    const rows = (res.rows || []) as T[];
    const rowCount = typeof res.rowCount === "number" ? res.rowCount : rows.length;
    return { rows, rowCount };
  } catch (err: any) {
    const msg = err?.message || "Erreur inconnue du pilote PostgreSQL.";
    throw new DatabaseUnavailableError(`Échec d'exécution PostgreSQL (@neondatabase/serverless) : ${msg}`);
  }
}

/**
 * Test réel de connectivité, latence et métadonnées serveur PostgreSQL.
 */
export async function testPostgresConnection(): Promise<{
  success: boolean;
  latencyMs?: number;
  serverTime?: string;
  databaseName?: string;
  pgVersion?: string;
  error?: string;
}> {
  const pgUrl = getPgUrl();
  if (!pgUrl) {
    return {
      success: false,
      error: "Variable d'environnement DATABASE_URL ou POSTGRES_URL absente.",
    };
  }

  const t0 = Date.now();
  try {
    const res = await executeSql<{
      now: string;
      db_name: string;
      pg_version: string;
    }>("SELECT NOW()::text AS now, current_database() AS db_name, split_part(version(), ',', 1) AS pg_version;");
    const latencyMs = Date.now() - t0;
    const row = res.rows[0];
    return {
      success: true,
      latencyMs,
      serverTime: row?.now || new Date().toISOString(),
      databaseName: row?.db_name,
      pgVersion: row?.pg_version,
    };
  } catch (err: any) {
    return {
      success: false,
      latencyMs: Date.now() - t0,
      error: err?.message || "Impossible d'établir la connexion avec l'instance PostgreSQL.",
    };
  }
}

/**
 * Diagnostic synchrone de base + enrichissable par testPostgresConnection()
 */
export function getDatabaseStatus(): DatabaseStatus {
  const pgUrl = getPgUrl();
  const envName = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

  if (pgUrl) {
    return {
      configured: true,
      operational: false, // Mis à true uniquement après testPostgresConnection() réussi
      driver: "neon_serverless",
      driverPackage: "@neondatabase/serverless",
      environment: envName,
      isPersistentInProduction: true,
      message: "Pilote @neondatabase/serverless configuré. Vérification live requise pour confirmer l'état opérationnel.",
      databaseUrlProvided: true,
      schemaVersion: "1.1.0-neon",
    };
  }

  if (isServerlessRuntime()) {
    return {
      configured: false,
      operational: false,
      driver: "unconfigured_serverless",
      driverPackage: "@neondatabase/serverless",
      environment: envName,
      isPersistentInProduction: false,
      message: "Environnement Vercel sans PostgreSQL connecté : écritures bloquées explicitement (aucun fallback silencieux).",
      databaseUrlProvided: false,
      schemaVersion: "1.1.0-neon",
    };
  }

  return {
    configured: false,
    operational: false,
    driver: "local_json_fallback",
    driverPackage: "@neondatabase/serverless",
    environment: envName,
    isPersistentInProduction: false,
    message: "Développement local hors-ligne (DATABASE_URL absent). Stockage JSON local actif uniquement en local.",
    databaseUrlProvided: false,
    schemaVersion: "1.1.0-neon",
  };
}

export async function getLiveDatabaseStatus(): Promise<DatabaseStatus> {
  const base = getDatabaseStatus();
  const connectionTest = await testPostgresConnection();
  base.connectionTest = connectionTest;
  if (base.databaseUrlProvided) {
    base.operational = connectionTest.success;
    base.isPersistentInProduction = connectionTest.success;
    base.message = connectionTest.success
      ? `PostgreSQL Neon opérationnel (${connectionTest.databaseName || "db"}, latence ${connectionTest.latencyMs} ms).`
      : `Erreur de connexion PostgreSQL : ${connectionTest.error}`;
  }
  return base;
}

// =============================================================================
// 1. CRUD UNIFIÉ : CLIENTS
// =============================================================================
function mapClientRow(r: any): ClientRecord {
  return {
    id: r.id,
    fullName: r.full_name,
    email: r.email || "",
    phone: r.phone,
    organization: r.organization || undefined,
    city: r.city || "Douala",
    country: r.country || "Cameroun",
    deliveryAddress: r.delivery_address || undefined,
    notes: r.notes || undefined,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
    updatedAt: r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at),
  };
}

export async function getStoredClients(): Promise<ClientRecord[]> {
  if (getPgUrl()) {
    const res = await executeSql<any>(
      `SELECT id, full_name, email, phone, organization, city, country, delivery_address, notes, created_at, updated_at
       FROM clients
       ORDER BY created_at DESC;`
    );
    return res.rows.map(mapClientRow);
  }
  if (isServerlessRuntime()) return [];
  return readJsonStore<ClientRecord>(CLIENTS_FILE, []);
}

export async function createClientRecord(input: {
  fullName: string;
  phone: string;
  email?: string;
  organization?: string;
  city?: string;
  country?: string;
  deliveryAddress?: string;
  notes?: string;
}): Promise<ClientRecord> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    const res = await executeSql<any>(
      `INSERT INTO clients (full_name, email, phone, organization, city, country, delivery_address, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, full_name, email, phone, organization, city, country, delivery_address, notes, created_at, updated_at;`,
      [
        input.fullName.trim(),
        input.email?.trim() || null,
        input.phone.trim(),
        input.organization?.trim() || null,
        input.city?.trim() || "Douala",
        input.country?.trim() || "Cameroun",
        input.deliveryAddress?.trim() || null,
        input.notes?.trim() || null,
      ]
    );
    return mapClientRow(res.rows[0]);
  }

  const now = new Date().toISOString();
  const rec: ClientRecord = {
    id: `cli-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: input.fullName.trim(),
    email: input.email?.trim() || "",
    phone: input.phone.trim(),
    organization: input.organization?.trim() || undefined,
    city: input.city?.trim() || "Douala",
    country: input.country?.trim() || "Cameroun",
    deliveryAddress: input.deliveryAddress?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };
  const list = readJsonStore<ClientRecord>(CLIENTS_FILE, []);
  list.unshift(rec);
  writeJsonStoreAtomic(CLIENTS_FILE, list, 500);
  return rec;
}

export async function updateClientRecord(
  id: string,
  updates: Partial<{
    fullName: string;
    phone: string;
    email: string;
    organization: string;
    city: string;
    country: string;
    deliveryAddress: string;
    notes: string;
  }>
): Promise<ClientRecord | null> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    const existingRes = await executeSql<any>("SELECT * FROM clients WHERE id = $1;", [id]);
    if (existingRes.rowCount === 0) return null;
    const cur = existingRes.rows[0];
    const res = await executeSql<any>(
      `UPDATE clients
       SET full_name = $2,
           phone = $3,
           email = $4,
           organization = $5,
           city = $6,
           country = $7,
           delivery_address = $8,
           notes = $9,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, full_name, email, phone, organization, city, country, delivery_address, notes, created_at, updated_at;`,
      [
        id,
        updates.fullName !== undefined ? updates.fullName.trim() : cur.full_name,
        updates.phone !== undefined ? updates.phone.trim() : cur.phone,
        updates.email !== undefined ? updates.email.trim() || null : cur.email,
        updates.organization !== undefined ? updates.organization.trim() || null : cur.organization,
        updates.city !== undefined ? updates.city.trim() : cur.city,
        updates.country !== undefined ? updates.country.trim() : cur.country,
        updates.deliveryAddress !== undefined ? updates.deliveryAddress.trim() || null : cur.delivery_address,
        updates.notes !== undefined ? updates.notes.trim() || null : cur.notes,
      ]
    );
    return mapClientRow(res.rows[0]);
  }

  const list = readJsonStore<ClientRecord>(CLIENTS_FILE, []);
  const idx = list.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  list[idx] = {
    ...list[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeJsonStoreAtomic(CLIENTS_FILE, list, 500);
  return list[idx];
}

// =============================================================================
// 2. CRUD UNIFIÉ : COMMANDES D'ATELIER & BAT
// =============================================================================
export async function getStoredOrders(): Promise<OrderRecord[]> {
  if (getPgUrl()) {
    const ordersRes = await executeSql<any>(
      `SELECT o.id, o.reference, o.status, o.delivery_mode, o.delivery_address,
              o.total_items_count, o.total_products_xaf, o.total_delivery_xaf,
              o.grand_total_xaf, o.has_custom_quote_items, o.current_bat_version,
              o.notes_production, o.customer_json, o.created_at, o.updated_at,
              c.full_name AS client_name, c.phone AS client_phone, c.email AS client_email,
              c.organization AS client_org, c.city AS client_city, c.country AS client_country
       FROM orders o
       LEFT JOIN clients c ON o.client_id = c.id
       ORDER BY o.created_at DESC;`
    );

    if (ordersRes.rows.length === 0) return [];

    const itemsRes = await executeSql<any>(
      `SELECT order_id, product_slug, product_title, variant_name, quantity, unit_price_xaf, total_price_xaf, custom_options_json
       FROM order_items
       ORDER BY created_at ASC;`
    );
    const batsRes = await executeSql<any>(
      `SELECT id, order_id, version, decision, technician_notes, client_feedback, file_preview_url, validated_at, created_at
       FROM bat_records
       ORDER BY version DESC, created_at DESC;`
    );

    const itemsByOrder = new Map<string, any[]>();
    for (const it of itemsRes.rows) {
      const arr = itemsByOrder.get(it.order_id) || [];
      const storedItem = it.custom_options_json && typeof it.custom_options_json === "object" && it.custom_options_json.id
        ? it.custom_options_json
        : {
            id: `item-${it.product_slug}`,
            productSlug: it.product_slug,
            productTitle: it.product_title,
            universe: "adp-studio",
            quantity: it.quantity,
            unitPriceXAF: it.unit_price_xaf,
            lineTotalXAF: it.total_price_xaf,
            priceStatus: "valide",
            configurationSummary: it.variant_name || "Standard",
          };
      arr.push(storedItem);
      itemsByOrder.set(it.order_id, arr);
    }

    const batsByOrder = new Map<string, BATRecord[]>();
    for (const b of batsRes.rows) {
      const arr = batsByOrder.get(b.order_id) || [];
      arr.push({
        id: b.id,
        version: b.version,
        createdAt: b.created_at instanceof Date ? b.created_at.toISOString() : String(b.created_at),
        decision: b.decision as BATDecision,
        decisionDate: b.validated_at ? (b.validated_at instanceof Date ? b.validated_at.toISOString() : String(b.validated_at)) : undefined,
        technicianNotes: b.technician_notes || undefined,
        clientComments: b.client_feedback || undefined,
        previewUrl: b.file_preview_url || undefined,
      });
      batsByOrder.set(b.order_id, arr);
    }

    return ordersRes.rows.map((r: any) => {
      const customer = r.customer_json || {
        fullName: r.client_name || "Client",
        organization: r.client_org || undefined,
        phone: r.client_phone || "",
        email: r.client_email || "",
        city: r.client_city || "Douala",
        country: r.client_country || "Cameroun",
        deliveryAddress: r.delivery_address || undefined,
      };
      return {
        reference: r.reference,
        createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
        updatedAt: r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at),
        status: r.status as OrderStatus,
        deliveryMode: r.delivery_mode,
        customer,
        items: itemsByOrder.get(r.id) || [],
        totalItemsCount: r.total_items_count,
        totalProductsXAF: r.total_products_xaf,
        totalDeliveryXAF: r.total_delivery_xaf,
        grandTotalXAF: r.grand_total_xaf,
        hasCustomQuoteItems: r.has_custom_quote_items,
        currentBATVersion: r.current_bat_version,
        batHistory: batsByOrder.get(r.id) || [],
        notesProduction: r.notes_production || undefined,
      };
    });
  }

  if (isServerlessRuntime()) return [];
  return readJsonStore<OrderRecord>(ORDERS_FILE, []);
}

export async function persistNewOrder(order: OrderRecord): Promise<void> {
  const mode = assertWritableStorage();

  if (mode === "postgres") {
    // 1. Rechercher ou enregistrer le client
    let clientId: string | null = null;
    const existingClient = await executeSql<{ id: string }>(
      "SELECT id FROM clients WHERE phone = $1 ORDER BY created_at DESC LIMIT 1;",
      [order.customer.phone]
    );
    if (existingClient.rows[0]?.id) {
      clientId = existingClient.rows[0].id;
    } else {
      const insertedClient = await executeSql<{ id: string }>(
        `INSERT INTO clients (full_name, email, phone, organization, city, country, delivery_address)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id;`,
        [
          order.customer.fullName,
          order.customer.email || null,
          order.customer.phone,
          order.customer.organization || null,
          order.customer.city || "Douala",
          order.customer.country || "Cameroun",
          order.customer.deliveryAddress || null,
        ]
      );
      clientId = insertedClient.rows[0]?.id || null;
    }

    // 2. Insérer la commande
    const orderRes = await executeSql<{ id: string }>(
      `INSERT INTO orders (
         reference, client_id, customer_json, status, delivery_mode, delivery_address,
         total_items_count, total_products_xaf, total_delivery_xaf, grand_total_xaf,
         has_custom_quote_items, current_bat_version, notes_production
       )
       VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING id;`,
      [
        order.reference,
        clientId,
        JSON.stringify(order.customer),
        order.status,
        order.deliveryMode,
        order.customer.deliveryAddress || null,
        order.totalItemsCount,
        order.totalProductsXAF ?? null,
        order.totalDeliveryXAF,
        order.grandTotalXAF ?? null,
        order.hasCustomQuoteItems,
        order.currentBATVersion,
        order.notesProduction || null,
      ]
    );
    const orderId = orderRes.rows[0].id;

    // 3. Insérer les articles de la commande
    for (const item of order.items) {
      const anyItem = item as any;
      await executeSql(
        `INSERT INTO order_items (
           order_id, product_slug, product_title, variant_name,
           quantity, unit_price_xaf, total_price_xaf, custom_options_json
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb);`,
        [
          orderId,
          anyItem.productSlug || anyItem.productId || "produit-atelier",
          anyItem.productTitle || anyItem.title || "Article ADP Studio",
          anyItem.configurationSummary || anyItem.variantLabel || "Standard",
          anyItem.quantity || 1,
          anyItem.unitPriceXAF ?? 0,
          anyItem.lineTotalXAF ?? 0,
          JSON.stringify(item),
        ]
      );
    }

    // 4. Insérer l'entrée initiale BAT v1
    const firstBat = order.batHistory?.[0];
    await executeSql(
      `INSERT INTO bat_records (order_id, version, decision, technician_notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (order_id, version) DO NOTHING;`,
      [
        orderId,
        firstBat?.version || 1,
        firstBat?.decision || "en_attente",
        firstBat?.technicianNotes || "Dossier reçu via le portail commercial.",
      ]
    );
    return;
  }

  const existingOrders = readJsonStore<OrderRecord>(ORDERS_FILE, []);
  existingOrders.unshift(order);
  writeJsonStoreAtomic(ORDERS_FILE, existingOrders, 500);
}

export async function updateOrderAndBat(
  reference: string,
  updates: {
    status?: OrderStatus;
    batDecision?: BATDecision;
    technicianNotes?: string;
    notesProduction?: string;
  }
): Promise<OrderRecord | null> {
  const mode = assertWritableStorage();

  if (mode === "postgres") {
    const found = await executeSql<any>("SELECT * FROM orders WHERE reference = $1;", [reference]);
    if (found.rowCount === 0) return null;
    const cur = found.rows[0];

    const nextStatus = updates.status || cur.status;
    const nextNotes = updates.notesProduction !== undefined ? updates.notesProduction : cur.notes_production;

    await executeSql(
      `UPDATE orders
       SET status = $2,
           notes_production = $3,
           updated_at = NOW()
       WHERE id = $1;`,
      [cur.id, nextStatus, nextNotes]
    );

    if (updates.batDecision) {
      await executeSql(
        `INSERT INTO bat_records (order_id, version, decision, technician_notes, validated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (order_id, version) DO UPDATE SET
           decision = EXCLUDED.decision,
           technician_notes = COALESCE(EXCLUDED.technician_notes, bat_records.technician_notes),
           validated_at = NOW(),
           updated_at = NOW();`,
        [
          cur.id,
          cur.current_bat_version || 1,
          updates.batDecision,
          updates.technicianNotes || null,
        ]
      );
    }

    const all = await getStoredOrders();
    return all.find((o) => o.reference === reference) || null;
  }

  const orders = readJsonStore<OrderRecord>(ORDERS_FILE, []);
  const orderIndex = orders.findIndex((o) => o.reference === reference);
  if (orderIndex === -1) return null;

  const currentOrder = orders[orderIndex];
  const now = new Date().toISOString();
  const updatedOrder: OrderRecord = {
    ...currentOrder,
    updatedAt: now,
    status: updates.status || currentOrder.status,
    notesProduction: updates.notesProduction !== undefined ? updates.notesProduction : currentOrder.notesProduction,
  };
  if (updates.batDecision && updatedOrder.batHistory[0]) {
    updatedOrder.batHistory[0].decision = updates.batDecision;
    updatedOrder.batHistory[0].decisionDate = now;
    if (updates.technicianNotes) {
      updatedOrder.batHistory[0].technicianNotes = updates.technicianNotes;
    }
  }
  orders[orderIndex] = updatedOrder;
  writeJsonStoreAtomic(ORDERS_FILE, orders, 500);
  return updatedOrder;
}

// =============================================================================
// 3. CRUD UNIFIÉ : BRIEFS
// =============================================================================
function mapBriefRow(r: any): StoredBriefRecord {
  return {
    reference: r.reference,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
    updatedAt: r.updated_at ? (r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at)) : undefined,
    domain: r.domain,
    domainLabel: r.domain_label || r.domain,
    objective: r.objective || "Non précisé",
    scaleOrSize: r.scale_or_size || "Non précisé",
    location: r.location || "Non précisé",
    timeframe: r.timeframe || "À convenir",
    budgetNotice: r.budget_notice || "À étudier en atelier",
    documentsAvailable: Array.isArray(r.documents_available_json) ? r.documents_available_json : [],
    uploadedFilesSimulation: Array.isArray(r.uploaded_files_json) ? r.uploaded_files_json : [],
    clientNotes: r.client_notes || "",
    customer: {
      fullName: r.customer_name,
      organization: r.customer_organization || "",
      phone: r.customer_phone,
      email: r.customer_email || "",
      city: r.customer_city || "Cameroun",
    },
    status: r.status,
    internalNotes: r.internal_notes || undefined,
    assignedTo: r.assigned_to || undefined,
  };
}

export async function getStoredBriefs(): Promise<StoredBriefRecord[]> {
  if (getPgUrl()) {
    const res = await executeSql<any>("SELECT * FROM briefs ORDER BY created_at DESC;");
    return res.rows.map(mapBriefRow);
  }
  if (isServerlessRuntime()) return [];
  return readJsonStore<StoredBriefRecord>(BRIEFS_FILE, []);
}

export async function persistNewBrief(brief: StoredBriefRecord): Promise<void> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    await executeSql(
      `INSERT INTO briefs (
         reference, domain, domain_label, customer_name, customer_phone, customer_email,
         customer_organization, customer_city, objective, scale_or_size, location,
         timeframe, budget_notice, documents_available_json, uploaded_files_json,
         client_notes, status
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb, $15::jsonb, $16, $17);`,
      [
        brief.reference,
        brief.domain,
        brief.domainLabel,
        brief.customer.fullName,
        brief.customer.phone,
        brief.customer.email || null,
        brief.customer.organization || null,
        brief.customer.city || "Douala",
        brief.objective,
        brief.scaleOrSize,
        brief.location,
        brief.timeframe,
        brief.budgetNotice,
        JSON.stringify(brief.documentsAvailable || []),
        JSON.stringify(brief.uploadedFilesSimulation || []),
        brief.clientNotes || null,
        brief.status,
      ]
    );
    return;
  }

  const list = readJsonStore<StoredBriefRecord>(BRIEFS_FILE, []);
  list.unshift(brief);
  writeJsonStoreAtomic(BRIEFS_FILE, list, 500);
}

export async function updateStoredBrief(
  reference: string,
  updates: { status?: StoredBriefRecord["status"]; internalNotes?: string; assignedTo?: string }
): Promise<StoredBriefRecord | null> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    const existing = await executeSql<any>("SELECT * FROM briefs WHERE reference = $1;", [reference]);
    if (existing.rowCount === 0) return null;
    const cur = existing.rows[0];
    const res = await executeSql<any>(
      `UPDATE briefs
       SET status = $2,
           internal_notes = $3,
           assigned_to = $4,
           updated_at = NOW()
       WHERE reference = $1
       RETURNING *;`,
      [
        reference,
        updates.status || cur.status,
        updates.internalNotes !== undefined ? updates.internalNotes : cur.internal_notes,
        updates.assignedTo !== undefined ? updates.assignedTo : cur.assigned_to,
      ]
    );
    return mapBriefRow(res.rows[0]);
  }

  const list = readJsonStore<StoredBriefRecord>(BRIEFS_FILE, []);
  const idx = list.findIndex((b) => b.reference === reference);
  if (idx === -1) return null;
  if (updates.status) list[idx].status = updates.status;
  if (updates.internalNotes !== undefined) list[idx].internalNotes = updates.internalNotes;
  if (updates.assignedTo !== undefined) list[idx].assignedTo = updates.assignedTo;
  list[idx].updatedAt = new Date().toISOString();
  writeJsonStoreAtomic(BRIEFS_FILE, list, 500);
  return list[idx];
}

// =============================================================================
// 4. CRUD UNIFIÉ : ACADEMY ENROLLMENTS
// =============================================================================
function mapAcademyRow(r: any): StoredAcademyRecord {
  return {
    reference: r.reference,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
    updatedAt: r.updated_at ? (r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at)) : undefined,
    courseId: r.course_id,
    courseTitle: r.course_title,
    candidateName: r.candidate_name,
    phone: r.phone,
    email: r.email || "",
    currentLevel: r.current_level || "Non précisé",
    formatPreference: r.format_preference || "presentiel_atelier",
    motivation: r.motivation || "",
    status: r.status,
    internalNotes: r.internal_notes || undefined,
  };
}

export async function getStoredAcademyEnrollments(): Promise<StoredAcademyRecord[]> {
  if (getPgUrl()) {
    const res = await executeSql<any>("SELECT * FROM academy_enrollments ORDER BY created_at DESC;");
    return res.rows.map(mapAcademyRow);
  }
  if (isServerlessRuntime()) return [];
  return readJsonStore<StoredAcademyRecord>(ACADEMY_FILE, []);
}

export async function persistNewAcademyEnrollment(rec: StoredAcademyRecord): Promise<void> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    await executeSql(
      `INSERT INTO academy_enrollments (
         reference, course_id, course_title, candidate_name, phone, email,
         current_level, format_preference, motivation, status
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
        rec.reference,
        rec.courseId,
        rec.courseTitle,
        rec.candidateName,
        rec.phone,
        rec.email || null,
        rec.currentLevel,
        rec.formatPreference,
        rec.motivation || null,
        rec.status,
      ]
    );
    return;
  }

  const list = readJsonStore<StoredAcademyRecord>(ACADEMY_FILE, []);
  list.unshift(rec);
  writeJsonStoreAtomic(ACADEMY_FILE, list, 500);
}

export async function updateStoredAcademyEnrollment(
  reference: string,
  updates: { status?: StoredAcademyRecord["status"]; internalNotes?: string }
): Promise<StoredAcademyRecord | null> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    const existing = await executeSql<any>("SELECT * FROM academy_enrollments WHERE reference = $1;", [reference]);
    if (existing.rowCount === 0) return null;
    const cur = existing.rows[0];
    const res = await executeSql<any>(
      `UPDATE academy_enrollments
       SET status = $2,
           internal_notes = $3,
           updated_at = NOW()
       WHERE reference = $1
       RETURNING *;`,
      [
        reference,
        updates.status || cur.status,
        updates.internalNotes !== undefined ? updates.internalNotes : cur.internal_notes,
      ]
    );
    return mapAcademyRow(res.rows[0]);
  }

  const list = readJsonStore<StoredAcademyRecord>(ACADEMY_FILE, []);
  const idx = list.findIndex((e) => e.reference === reference);
  if (idx === -1) return null;
  if (updates.status) list[idx].status = updates.status;
  if (updates.internalNotes !== undefined) list[idx].internalNotes = updates.internalNotes;
  list[idx].updatedAt = new Date().toISOString();
  writeJsonStoreAtomic(ACADEMY_FILE, list, 500);
  return list[idx];
}

// =============================================================================
// 5. CRUD UNIFIÉ : DEVIS (QUOTES) & CMS PROJETS
// =============================================================================
export async function getStoredQuotes(): Promise<any[]> {
  if (getPgUrl()) {
    const res = await executeSql<any>("SELECT * FROM quotes ORDER BY created_at DESC;");
    return res.rows.map((r: any) => ({
      reference: r.reference,
      type: "server_registered_quote",
      status: r.status,
      createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
      clientMasked: {
        name: r.client_name_masked || "Client",
        phoneMasked: r.client_phone_masked,
        emailMasked: r.client_email_masked,
      },
      project: {
        name: r.project_name || "Projet d'Atelier",
        location: r.location || "Cameroun",
        programType: r.program_type || "Résidentiel",
      },
      servicesCount: r.services_count,
      services: Array.isArray(r.services_json) ? r.services_json : [],
    }));
  }
  if (isServerlessRuntime()) return [];
  return readJsonStore<any>(QUOTES_FILE, []);
}

export async function persistNewQuote(quoteRecord: any): Promise<void> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    await executeSql(
      `INSERT INTO quotes (
         reference, status, client_name_masked, client_phone_masked, client_email_masked,
         project_name, location, program_type, services_count, services_json
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb);`,
      [
        quoteRecord.reference,
        quoteRecord.status,
        quoteRecord.clientMasked?.name || null,
        quoteRecord.clientMasked?.phoneMasked || null,
        quoteRecord.clientMasked?.emailMasked || null,
        quoteRecord.project?.name || null,
        quoteRecord.project?.location || null,
        quoteRecord.project?.programType || null,
        quoteRecord.servicesCount || 0,
        JSON.stringify(quoteRecord.services || []),
      ]
    );
    return;
  }

  const existing = readJsonStore<any>(QUOTES_FILE, []);
  existing.unshift(quoteRecord);
  writeJsonStoreAtomic(QUOTES_FILE, existing, 500);
}

export async function getStoredProjectOverrides(): Promise<ProjectOverrideRecord[]> {
  if (getPgUrl()) {
    const res = await executeSql<any>(
      "SELECT slug, status, credits_onac, is_featured FROM portfolio_projects;"
    );
    return res.rows.map((r: any) => ({
      slug: r.slug,
      status: r.status,
      creditsOnac: r.credits_onac,
      isFeatured: r.is_featured,
    }));
  }
  return readJsonStore<ProjectOverrideRecord>(OVERRIDES_FILE, []);
}

export async function upsertProjectOverride(override: ProjectOverrideRecord): Promise<void> {
  const mode = assertWritableStorage();
  if (mode === "postgres") {
    const existing = await executeSql<any>("SELECT * FROM portfolio_projects WHERE slug = $1;", [override.slug]);
    if (existing.rowCount > 0) {
      const cur = existing.rows[0];
      await executeSql(
        `UPDATE portfolio_projects
         SET status = $2,
             credits_onac = $3,
             is_featured = $4,
             updated_at = NOW()
         WHERE slug = $1;`,
        [
          override.slug,
          override.status !== undefined ? override.status : cur.status,
          override.creditsOnac !== undefined ? override.creditsOnac : cur.credits_onac,
          override.isFeatured !== undefined ? override.isFeatured : cur.is_featured,
        ]
      );
      return;
    }
  }

  const overrides = readJsonStore<ProjectOverrideRecord>(OVERRIDES_FILE, []);
  const idx = overrides.findIndex((o) => o.slug === override.slug);
  if (idx !== -1) {
    if (override.status !== undefined) overrides[idx].status = override.status;
    if (override.creditsOnac !== undefined) overrides[idx].creditsOnac = override.creditsOnac;
    if (override.isFeatured !== undefined) overrides[idx].isFeatured = override.isFeatured;
  } else {
    overrides.push(override);
  }
  writeJsonStoreAtomic(OVERRIDES_FILE, overrides, 100);
}

// =============================================================================
// 6. JOURNAL D'AUDIT (ACTIVITY LOGS)
// =============================================================================
export async function logActivity(
  actionType: string,
  entityType: string,
  entityId: string,
  description: string,
  user = "admin"
): Promise<void> {
  if (getPgUrl()) {
    try {
      await executeSql(
        `INSERT INTO activity_logs (action_type, entity_type, entity_id, description)
         VALUES ($1, $2, $3, $4);`,
        [actionType, entityType, entityId, description]
      );
      return;
    } catch (err) {
      console.error("Échec journalisation PostgreSQL:", err);
      return;
    }
  }

  if (isServerlessRuntime()) return;

  try {
    const entry: ActivityLogEntry = {
      id: `act-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      actionType,
      entityType,
      entityId,
      description,
      user,
    };
    const logs = readJsonStore<ActivityLogEntry>(ACTIVITY_LOG_FILE, []);
    logs.unshift(entry);
    writeJsonStoreAtomic(ACTIVITY_LOG_FILE, logs, 500);
  } catch (err) {
    console.error("Échec journalisation locale:", err);
  }
}

export async function getActivityLogs(limit = 50): Promise<ActivityLogEntry[]> {
  if (getPgUrl()) {
    try {
      const res = await executeSql<any>(
        `SELECT id, action_type, entity_type, entity_id, description, created_at
         FROM activity_logs
         ORDER BY created_at DESC
         LIMIT $1;`,
        [limit]
      );
      return res.rows.map((r: any) => ({
        id: r.id,
        timestamp: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
        actionType: r.action_type,
        entityType: r.entity_type,
        entityId: r.entity_id || "",
        description: r.description,
        user: "admin",
      }));
    } catch {
      return [];
    }
  }
  const logs = readJsonStore<ActivityLogEntry>(ACTIVITY_LOG_FILE, []);
  return logs.slice(0, limit);
}

export function getUnifiedSqlDump(): { schema: string; seed: string } {
  const basePath = path.resolve(process.cwd(), "database");
  const schemaPath = path.join(basePath, "schema.sql");
  const seedPath = path.join(basePath, "seed_data.sql");

  const schema = fs.existsSync(schemaPath)
    ? fs.readFileSync(schemaPath, "utf-8")
    : "-- Fichier schema.sql manquant";

  const seed = fs.existsSync(seedPath)
    ? fs.readFileSync(seedPath, "utf-8")
    : "-- Fichier seed_data.sql manquant";

  return { schema, seed };
}
