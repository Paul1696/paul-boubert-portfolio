import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getUnifiedSqlDump, logActivity } from "@/lib/db-adapter";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { schema, seed } = getUnifiedSqlDump();
    const fullDump = [
      "-- =============================================================================",
      "-- ARCHIVE OFFICIELLE D'EXPORT SQL — ADP WEB EXPERIENCE (ADP CONTROL)",
      `-- Date de génération : ${new Date().toISOString()}`,
      "-- Cadre : PostgreSQL 14+, Neon Serverless, Supabase, Vercel Postgres",
      "-- =============================================================================\n",
      schema,
      "\n\n-- =============================================================================",
      "-- DONNÉES INITIALES ET MIGRATION (SEED)",
      "-- =============================================================================\n",
      seed,
    ].join("\n");

    logActivity("EXPORT_DATABASE_SQL", "database", "global", "Téléchargement de l'archive SQL complète schema + seed");

    return new NextResponse(fullDump, {
      status: 200,
      headers: {
        "Content-Type": "text/sql; charset=utf-8",
        "Content-Disposition": `attachment; filename="adp-database-full-dump-${new Date().toISOString().slice(0, 10)}.sql"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erreur de génération du dump SQL" }, { status: 500 });
  }
}
