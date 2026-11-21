import { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "adp_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecretKey(): string {
  return (
    process.env.ADP_ADMIN_SECRET ||
    process.env.PAYLOAD_SECRET ||
    "adp-control-server-secret-2026-hmac-key"
  );
}

export function getAllowedAdminKeys(): string[] {
  const envKey = process.env.ADP_ADMIN_PASSPHRASE;
  if (envKey && envKey.trim().length > 0) {
    return [envKey.trim()];
  }
  // Default server-only keys for local staging/recette (never bundled on client)
  return ["ateliersdepaul-control-2026", "adp2026"];
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payload)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSessionToken(): Promise<{
  token: string;
  expiresAt: number;
}> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = `adp-admin.${expiresAt}`;
  const sig = await hmacSign(payload, getSecretKey());
  return {
    token: `${payload}.${sig}`,
    expiresAt,
  };
}

export async function verifyAdminSessionToken(
  token?: string | null
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [prefix, expiresStr, providedSig] = parts;
  if (prefix !== "adp-admin") return false;

  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const payload = `${prefix}.${expiresStr}`;
  const expectedSig = await hmacSign(payload, getSecretKey());

  if (providedSig.length !== expectedSig.length) return false;
  let mismatch = 0;
  for (let i = 0; i < providedSig.length; i++) {
    mismatch |= providedSig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isAuthorizedAdminRequest(
  request: NextRequest
): Promise<boolean> {
  // 1. Check HttpOnly session cookie
  const cookieToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (cookieToken && (await verifyAdminSessionToken(cookieToken))) {
    return true;
  }

  // 2. Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.slice(7).trim();
    if (await verifyAdminSessionToken(bearerToken)) {
      return true;
    }
    const allowedKeys = getAllowedAdminKeys();
    if (allowedKeys.includes(bearerToken)) {
      return true;
    }
  }

  return false;
}

