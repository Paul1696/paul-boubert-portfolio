import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getLiveDatabaseStatus, getActivityLogs } from "@/lib/db-adapter";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const dbStatus = await getLiveDatabaseStatus();
  const recentLogs = await getActivityLogs(20);

  return NextResponse.json({
    success: true,
    databaseStatus: dbStatus,
    recentActivity: recentLogs,
  });
}
