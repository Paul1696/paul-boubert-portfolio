import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { logActivity } from "@/lib/db-adapter";
import fs from "fs";
import path from "path";

const ACADEMY_FILE = path.join(process.cwd(), "src", "data", "academy-log.json");

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
    const { status, internalNotes } = body;

    if (!fs.existsSync(ACADEMY_FILE)) {
      return NextResponse.json({ error: "Registre des formations introuvable." }, { status: 404 });
    }

    const data = fs.readFileSync(ACADEMY_FILE, "utf-8");
    const enrollments = JSON.parse(data);

    const index = enrollments.findIndex((e: any) => e.reference === reference);
    if (index === -1) {
      return NextResponse.json({ error: `Inscription ${reference} non trouvée.` }, { status: 404 });
    }

    if (status) enrollments[index].status = status;
    if (internalNotes !== undefined) enrollments[index].internalNotes = internalNotes;
    enrollments[index].updatedAt = new Date().toISOString();

    const tmp = `${ACADEMY_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmp, JSON.stringify(enrollments, null, 2), "utf-8");
    fs.renameSync(tmp, ACADEMY_FILE);

    logActivity(
      "UPDATE_ACADEMY_STATUS",
      "academy_enrollment",
      reference,
      `Mise à jour du statut de l'inscription ${reference} vers : ${status || "inchangé"}`
    );

    return NextResponse.json({
      success: true,
      message: `Inscription ${reference} mise à jour avec succès.`,
      enrollment: enrollments[index],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erreur lors de la mise à jour de l'inscription." }, { status: 500 });
  }
}
