import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { getDatabaseStatus, getActivityLogs, testPostgresConnection } from "@/lib/db-adapter";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthorizedAdminRequest(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const dbStatus = getDatabaseStatus();
  const connectionTest = await testPostgresConnection();
  dbStatus.connectionTest = connectionTest;

  const recentLogs = getActivityLogs(20);

  return NextResponse.json({
    success: true,
    databaseStatus: dbStatus,
    recentActivity: recentLogs,
  });
}
