import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { logActivity } from "@/lib/db-adapter";
import fs from "fs";
import path from "path";

const BRIEFS_FILE = path.join(process.cwd(), "src", "data", "briefs-log.json");

interface RouteParams {
  params: Promise<{ reference: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé. Accès administrateur requis." }, { status: 401 });
  }

  const { reference } = await params;

  try {
    const body = await request.json();
    const { status, internalNotes, assignedTo } = body;

    if (!fs.existsSync(BRIEFS_FILE)) {
      return NextResponse.json({ error: "Registre des briefs introuvable." }, { status: 404 });
    }

    const data = fs.readFileSync(BRIEFS_FILE, "utf-8");
    const briefs = JSON.parse(data);

    const index = briefs.findIndex((b: any) => b.reference === reference);
    if (index === -1) {
      return NextResponse.json({ error: `Brief ${reference} non trouvé.` }, { status: 404 });
    }

    if (status) briefs[index].status = status;
    if (internalNotes !== undefined) briefs[index].internalNotes = internalNotes;
    if (assignedTo !== undefined) briefs[index].assignedTo = assignedTo;
    briefs[index].updatedAt = new Date().toISOString();

    const tmp = `${BRIEFS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmp, JSON.stringify(briefs, null, 2), "utf-8");
    fs.renameSync(tmp, BRIEFS_FILE);

    logActivity(
      "UPDATE_BRIEF_STATUS",
      "brief",
      reference,
      `Mise à jour du statut du brief ${reference} vers : ${status || "inchangé"}`
    );

    return NextResponse.json({
      success: true,
      message: `Brief ${reference} mis à jour avec succès.`,
      brief: briefs[index],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erreur lors de la mise à jour du brief." }, { status: 500 });
  }
}
