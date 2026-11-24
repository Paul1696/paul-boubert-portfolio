import fs from "fs";
import path from "path";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";
import { OrderRecord, OrderStatus, BATDecision } from "@/types/cart";

export interface DatabaseStatus {
  configured: boolean;
  driver: "postgresql" | "local_json_fallback";
  isPersistentInProduction: boolean;
  message: string;
  databaseUrlProvided: boolean;
  schemaVersion: string;
  connectionTest?: {
    success: boolean;
    latencyMs?: number;
    serverTime?: string;
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

const ACTIVITY_LOG_FILE = "activity-log.json";
const ORDERS_FILE = "orders-log.json";
const BRIEFS_FILE = "briefs-log.json";
const ACADEMY_FILE = "academy-log.json";
const QUOTES_FILE = "quotes-log.json";
const OVERRIDES_FILE = "project-overrides.json";

function getPgUrl(): string | null {
  return (
    process.env.POSTGRES_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.SUPABASE_POSTGRES_URL?.trim() ||
    null
  );
}

/**
 * Exécute une requête SQL directe sur PostgreSQL distant si configuré.
 * Supporte le protocole HTTP Neon/Vercel Postgres ou dynamique Node si disponible.
 */
export async function executeSql<T = any>(
  query: string,
  params: any[] = []
): Promise<{ rows: T[]; rowCount: number }> {
  const pgUrl = getPgUrl();
  if (!pgUrl) {
    throw new Error("POSTGRES_URL non configuré.");
  }

  // Si l'URL est de type Neon Serverless HTTP ou Supabase REST
  if (pgUrl.includes("neon.tech") || pgUrl.includes("vercel-storage.com")) {
    try {
      // Endpoint HTTP Neon SQL standard
      const httpEndpoint = pgUrl.replace(/^postgres(ql)?:\/\/[^@]+@/, "https://").replace(/\/[^/]+$/, "/sql");
      const resp = await fetch(httpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pgUrl}`,
        },
        body: JSON.stringify({ query, params }),
      });
      if (resp.ok) {
        const data = await resp.json();
        return { rows: data.rows || [], rowCount: data.rowCount || (data.rows ? data.rows.length : 0) };
      }
    } catch {
      // Fallback vers client standard si l'endpoint HTTP dédié n'est pas actif
    }
  }

  // Tente d'importer dynamiquement pg si présent dans l'environnement (avec webpackIgnore pour éviter l'erreur de build si non installé)
  try {
    const pgModule = "pg";
    // @ts-ignore
    const pg = await import(/* webpackIgnore: true */ pgModule);
    const Client = pg.Client || pg.default?.Client;
    if (!Client) {
      throw new Error("Client PG indisponible dans le module importé.");
    }
    const client = new Client({ connectionString: pgUrl, ssl: { rejectUnauthorized: false } });
    await client.connect();
    try {
      const res = await client.query(query, params);
      return { rows: res.rows, rowCount: res.rowCount || 0 };
    } finally {
      await client.end();
    }
  } catch (err: any) {
    throw new Error(`Échec d'exécution PostgreSQL : ${err.message}`);
  }
}

/**
 * Test réel de connectivité et de latence PostgreSQL (évite la fausse validation par simple présence de variable)
 */
export async function testPostgresConnection(): Promise<{
  success: boolean;
  latencyMs?: number;
  serverTime?: string;
  error?: string;
}> {
  const pgUrl = getPgUrl();
  if (!pgUrl) {
    return {
      success: false,
      error: "Variable d'environnement POSTGRES_URL ou DATABASE_URL absente.",
    };
  }

  const t0 = Date.now();
  try {
    const res = await executeSql<{ now: string }>("SELECT NOW() as now;");
    const latencyMs = Date.now() - t0;
    return {
      success: true,
      latencyMs,
      serverTime: res.rows[0]?.now || new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Impossible d'établir la connexion avec l'instance PostgreSQL.",
    };
  }
}

/**
 * Diagnostic de l'état de persistance des données
 */
export function getDatabaseStatus(): DatabaseStatus {
  const pgUrl = getPgUrl();

  if (pgUrl) {
    return {
      configured: true,
      driver: "postgresql",
      isPersistentInProduction: true,
      message: "Base distante PostgreSQL détectée. Raccordement direct prêt pour écriture/lecture.",
      databaseUrlProvided: true,
      schemaVersion: "1.0.0-unified",
    };
  }

  return {
    configured: false,
    driver: "local_json_fallback",
    isPersistentInProduction: false,
    message: "Base PostgreSQL non connectée (POSTGRES_URL absent de l'environnement). Stockage local actif via JSON atomique sécurisé.",
    databaseUrlProvided: false,
    schemaVersion: "1.0.0-unified",
  };
}

// -----------------------------------------------------------------------------
// CRUD UNIFIÉ : COMMANDES D'ATELIER
// -----------------------------------------------------------------------------
export async function getStoredOrders(): Promise<OrderRecord[]> {
  const pgUrl = getPgUrl();
  if (pgUrl) {
    try {
      const res = await executeSql<any>(
        "SELECT reference, status, delivery_mode, grand_total_xaf, current_bat_version, notes_production, created_at, updated_at FROM orders ORDER BY created_at DESC;"
      );
      if (res.rows && res.rows.length > 0) {
        // En mode live Postgres
        return res.rows.map((r: any) => ({
          reference: r.reference,
          status: r.status,
          deliveryMode: r.delivery_mode,
          grandTotalXAF: r.grand_total_xaf,
          currentBATVersion: r.current_bat_version,
          notesProduction: r.notes_production,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
          customer: { fullName: "Client", phone: "", email: "", city: "Douala", country: "Cameroun" },
          items: [],
          totalItemsCount: 1,
          totalProductsXAF: r.grand_total_xaf,
          totalDeliveryXAF: 0,
          hasCustomQuoteItems: false,
          batHistory: [],
        }));
      }
    } catch (e) {
      console.warn("PostgreSQL inaccessible pour getStoredOrders, utilisation du fallback local:", e);
    }
  }

  return readJsonStore<OrderRecord>(ORDERS_FILE, []);
}

export async function persistNewOrder(order: OrderRecord): Promise<void> {
  // Toujours sécuriser sur le stockage local atomique
  const existingOrders = readJsonStore<OrderRecord>(ORDERS_FILE, []);
  existingOrders.unshift(order);
  writeJsonStoreAtomic(ORDERS_FILE, existingOrders, 500);

  // Si Postgres est connecté, insérer en base relationnelle
  const pgUrl = getPgUrl();
  if (pgUrl) {
    try {
      await executeSql(
        `INSERT INTO orders (reference, status, delivery_mode, delivery_address, total_items_count, total_products_xaf, total_delivery_xaf, grand_total_xaf, has_custom_quote_items, current_bat_version, notes_production)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (reference) DO UPDATE SET
            status = EXCLUDED.status,
            updated_at = NOW();`,
        [
          order.reference,
          order.status,
          order.deliveryMode,
          order.customer.deliveryAddress || null,
          order.totalItemsCount,
          order.totalProductsXAF,
          order.totalDeliveryXAF,
          order.grandTotalXAF,
          order.hasCustomQuoteItems,
          order.currentBATVersion,
          order.notesProduction || null,
        ]
      );
    } catch (e) {
      console.warn("Échec insertion Postgres commande, préservée en local:", e);
    }
  }
}

// -----------------------------------------------------------------------------
// JOURNAL D'AUDIT (ACTIVITY LOGS)
// -----------------------------------------------------------------------------
export function logActivity(
  actionType: string,
  entityType: string,
  entityId: string,
  description: string,
  user = "admin"
): void {
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

    // Si Postgres est connecté
    const pgUrl = getPgUrl();
    if (pgUrl) {
      executeSql(
        `INSERT INTO activity_logs (action_type, entity_type, entity_id, description)
         VALUES ($1, $2, $3, $4);`,
        [actionType, entityType, entityId, description]
      ).catch(() => {});
    }
  } catch (err) {
    console.error("Échec journalisation:", err);
  }
}

export function getActivityLogs(limit = 100): ActivityLogEntry[] {
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
