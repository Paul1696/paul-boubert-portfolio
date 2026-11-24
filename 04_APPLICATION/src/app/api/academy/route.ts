import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface AcademyEnrollment {
  reference: string;
  createdAt: string;
  courseId: string;
  courseTitle: string;
  candidateName: string;
  phone: string;
  email: string;
  currentLevel: string;
  formatPreference: "presentiel_atelier" | "visio_interactive";
  motivation: string;
  status: "pre_inscription_recue" | "examen_dossier" | "entretien_orientation" | "session_planifiee";
}

const ACADEMY_FILE = path.join(process.cwd(), "src", "data", "academy-log.json");

function readAcademyLog(): AcademyEnrollment[] {
  try {
    if (!fs.existsSync(ACADEMY_FILE)) return [];
    return JSON.parse(fs.readFileSync(ACADEMY_FILE, "utf-8")) as AcademyEnrollment[];
  } catch {
    return [];
  }
}

function writeAcademyLog(log: AcademyEnrollment[]): boolean {
  try {
    const dir = path.dirname(ACADEMY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const tmp = `${ACADEMY_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmp, JSON.stringify(log, null, 2), "utf-8");
    fs.renameSync(tmp, ACADEMY_FILE);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const list = readAcademyLog();
  return NextResponse.json({ success: true, count: list.length, enrollments: list });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.courseId || !body.candidateName || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Nom, téléphone et formation sont obligatoires." },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `ACAD-202611-${randomNum}`;

    const newEnrollment: AcademyEnrollment = {
      reference,
      createdAt: new Date().toISOString(),
      courseId: body.courseId,
      courseTitle: body.courseTitle || body.courseId,
      candidateName: body.candidateName,
      phone: body.phone,
      email: body.email || "",
      currentLevel: body.currentLevel || "Non précisé",
      formatPreference: body.formatPreference || "presentiel_atelier",
      motivation: body.motivation || "",
      status: "pre_inscription_recue",
    };

    const existing = readAcademyLog();
    existing.unshift(newEnrollment);
    writeAcademyLog(existing);

    return NextResponse.json({ success: true, reference, enrollment: newEnrollment });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur enregistrement inscription." }, { status: 500 });
  }
}
