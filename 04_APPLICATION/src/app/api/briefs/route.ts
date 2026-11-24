import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface BriefSubmission {
  reference: string;
  createdAt: string;
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
}

const BRIEFS_FILE = path.join(process.cwd(), "src", "data", "briefs-log.json");

function readBriefsLog(): BriefSubmission[] {
  try {
    if (!fs.existsSync(BRIEFS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BRIEFS_FILE, "utf-8");
    return JSON.parse(data) as BriefSubmission[];
  } catch (err) {
    console.error("Erreur lecture briefs-log.json:", err);
    return [];
  }
}

function writeBriefsLog(briefs: BriefSubmission[]): boolean {
  try {
    const dir = path.dirname(BRIEFS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempFile = `${BRIEFS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(briefs, null, 2), "utf-8");
    fs.renameSync(tempFile, BRIEFS_FILE);
    return true;
  } catch (err) {
    console.error("Erreur écriture briefs-log.json:", err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  const briefs = readBriefsLog();
  return NextResponse.json({
    success: true,
    count: briefs.length,
    briefs,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.domain || !body.customer?.fullName || !body.customer?.phone) {
      return NextResponse.json(
        { success: false, error: "Données incomplètes (domaine, nom ou téléphone manquant)." },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `BRF-202611-${randomNum}`;

    const newBrief: BriefSubmission = {
      reference,
      createdAt: new Date().toISOString(),
      domain: body.domain,
      domainLabel: body.domainLabel || body.domain,
      objective: body.objective || "Non précisé",
      scaleOrSize: body.scaleOrSize || "Non précisé",
      location: body.location || "Non précisé",
      timeframe: body.timeframe || "À convenir",
      budgetNotice: body.budgetNotice || "À étudier en atelier",
      documentsAvailable: body.documentsAvailable || [],
      uploadedFilesSimulation: body.uploadedFilesSimulation || [],
      clientNotes: body.clientNotes || "",
      customer: {
        fullName: body.customer.fullName,
        organization: body.customer.organization || "",
        phone: body.customer.phone,
        email: body.customer.email || "",
        city: body.customer.city || "Cameroun",
      },
      status: "reçu",
    };

    const existingBriefs = readBriefsLog();
    existingBriefs.unshift(newBrief);
    writeBriefsLog(existingBriefs);

    return NextResponse.json({
      success: true,
      reference,
      brief: newBrief,
    });
  } catch (error) {
    console.error("Erreur création brief:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de l'enregistrement du brief." },
      { status: 500 }
    );
  }
}
