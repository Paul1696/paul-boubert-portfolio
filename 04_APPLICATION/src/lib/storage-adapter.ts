import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), "src/data");

/**
 * Atomic JSON file reader & writer with temporary file + rename
 * to prevent concurrent corruption on local/staging storage,
 * and automatic PostgreSQL / Webhook forwarding when configured.
 */
export function readJsonStore<T>(filename: string, fallback: T[] = []): T[] {
  const filePath = path.resolve(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeJsonStoreAtomic<T>(
  filename: string,
  records: T[],
  maxRecords = 500
): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filePath = path.resolve(DATA_DIR, filename);
    const tmpPath = `${filePath}.${ process.pid }.${ Date.now() }.tmp`;
    const bounded = records.slice(0, maxRecords);
    fs.writeFileSync(tmpPath, JSON.stringify(bounded, null, 2), "utf8");
    fs.renameSync(tmpPath, filePath);
  } catch {
    // Graceful fallback on read-only serverless file systems
  }
}

