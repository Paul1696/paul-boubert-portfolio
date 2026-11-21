import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect read access to sensitive admin API endpoints
  if (
    request.method === "GET" &&
    (pathname === "/api/quotes" || pathname === "/api/contact")
  ) {
    const authorized = await isAuthorizedAdminRequest(request);
    if (!authorized) {
      return NextResponse.json(
        {
          error:
            "Accès refusé. Une session administrateur ADP Control valide est requise.",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/quotes", "/api/contact"],
};

