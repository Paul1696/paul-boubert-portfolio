import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { ALL_PROJECTS } from "@/data/all-projects";
import { logActivity } from "@/lib/db-adapter";
import { readJsonStore, writeJsonStoreAtomic } from "@/lib/storage-adapter";

const OVERRIDES_FILE = "project-overrides.json";

interface ProjectOverride {
  slug: string;
  status?: string;
  creditsOnac?: string;
  isFeatured?: boolean;
}

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const overrides = readJsonStore<ProjectOverride>(OVERRIDES_FILE, []);
  const overrideMap = new Map(overrides.map((o) => [o.slug, o]));

  const enrichedProjects = ALL_PROJECTS.map((p) => {
    const ov = overrideMap.get(p.slug);
    return {
      ...p,
      status: ov?.status || p.status || "Réalisé",
      creditsOnac: ov?.creditsOnac || p.credits || "Atelier ADP",
      isFeatured: ov?.isFeatured !== undefined ? ov.isFeatured : p.featuredEditorial || false,
    };
  });

  return NextResponse.json({
    success: true,
    total: enrichedProjects.length,
    projects: enrichedProjects,
  });
}

export async function PATCH(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, status, creditsOnac, isFeatured } = body as {
      slug: string;
      status?: string;
      creditsOnac?: string;
      isFeatured?: boolean;
    };

    if (!slug) {
      return NextResponse.json({ error: "Le slug du projet est obligatoire." }, { status: 400 });
    }

    const overrides = readJsonStore<ProjectOverride>(OVERRIDES_FILE, []);
    const idx = overrides.findIndex((o) => o.slug === slug);

    if (idx !== -1) {
      if (status !== undefined) overrides[idx].status = status;
      if (creditsOnac !== undefined) overrides[idx].creditsOnac = creditsOnac;
      if (isFeatured !== undefined) overrides[idx].isFeatured = isFeatured;
    } else {
      overrides.push({
        slug,
        status,
        creditsOnac,
        isFeatured,
      });
    }

    // Protection règle des 16 projets en vedette
    const featuredCount = overrides.filter((o) => o.isFeatured).length;
    if (featuredCount > 16) {
      return NextResponse.json(
        { error: `Impossible de dépasser 16 projets « À la une » (actuellement ${featuredCount}). Veuillez en retirer un avant d'en ajouter un nouveau.` },
        { status: 400 }
      );
    }

    writeJsonStoreAtomic(OVERRIDES_FILE, overrides, 100);

    logActivity(
      "UPDATE_PROJECT_CMS",
      "portfolio_project",
      slug,
      `Mise à jour CMS projet ${slug} (statut: ${status || "inchangé"}, vedette: ${isFeatured !== undefined ? isFeatured : "inchangé"})`
    );

    return NextResponse.json({
      success: true,
      message: `Projet ${slug} mis à jour avec succès.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erreur de mise à jour du projet." }, { status: 500 });
  }
}
