import fs from "fs";
import path from "path";

const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-");
const backupDir = path.resolve(process.cwd(), "src/data/backups");

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

function safeReadJson(relPath) {
  try {
    const full = path.resolve(process.cwd(), relPath);
    if (fs.existsSync(full)) {
      return JSON.parse(fs.readFileSync(full, "utf8"));
    }
  } catch (err) {
    console.warn(`Warn: Could not read ${relPath}:`, err.message);
  }
  return null;
}

const backupPayload = {
  meta: {
    system: "ADP WEB EXPERIENCE — The Possibility Machine",
    site: "ateliersdepaul.com",
    backupCreatedAt: now.toISOString(),
    version: "1.0.0-rc1",
  },
  cmsDatabaseSeed: safeReadJson("src/data/cms-database-seed.json"),
  quotesLog: safeReadJson("src/data/quotes-log.json") || [],
  messagesLog: safeReadJson("src/data/messages-log.json") || [],
  subscribersLog: safeReadJson("src/data/subscribers-log.json") || [],
};

const backupFilename = `adp-backup-${timestamp}.json`;
const backupFilePath = path.join(backupDir, backupFilename);

fs.writeFileSync(backupFilePath, JSON.stringify(backupPayload, null, 2), "utf8");
console.log(`[BACKUP SUCCEEDED] Archive saved to: ${backupFilePath}`);
console.log(`Projects: ${backupPayload.cmsDatabaseSeed?.collections?.projects?.length || 0}`);
console.log(`Universes: ${backupPayload.cmsDatabaseSeed?.collections?.universes?.length || 0}`);
