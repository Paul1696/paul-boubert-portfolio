import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAllowedAdminKeys,
} from "@/lib/admin-auth";

const loginAttempts = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const history = (loginAttempts.get(ip) || []).filter(
      (t) => now - t < WINDOW_MS
    );

    if (history.length >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          authenticated: false,
          error:
            "Trop de tentatives de connexion. Veuillez patienter 5 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const passphrase =
      typeof body?.passphrase === "string" ? body.passphrase.trim() : "";

    const allowedKeys = getAllowedAdminKeys();
    if (!passphrase || !allowedKeys.includes(passphrase)) {
      history.push(now);
      loginAttempts.set(ip, history);
      return NextResponse.json(
        { authenticated: false, error: "Clé d'autorisation non valide." },
        { status: 401 }
      );
    }

    loginAttempts.delete(ip);
    const { token, expiresAt } = await createAdminSessionToken();

    const response = NextResponse.json({
      authenticated: true,
      expiresAt,
    });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { authenticated: false, error: "Erreur lors de l'authentification." },
      { status: 500 }
    );
  }
}

