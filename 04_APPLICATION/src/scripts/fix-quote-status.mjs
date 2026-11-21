import fs from "fs";
import path from "path";

const targetPath = path.join("src", "types", "quote.ts");
let content = fs.readFileSync(targetPath, "utf8");

content = content.replace(
  '| "enregistree"                   // Enregistrée dans PostgreSQL via POST /api/quotes (Infrastructure serveur)',
  '| "enregistree"                   // Enregistrée dans PostgreSQL via POST /api/quotes (Infrastructure serveur)\n  | "enregistre_serveur"           // Synchrone avec serveur'
);

fs.writeFileSync(targetPath, content, "utf8");
console.log("src/types/quote.ts updated!");
