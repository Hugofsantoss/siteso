import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import {
  ADMIN_SESSION_COOKIE,
  INVESTIDOR_SESSION_COOKIE,
  SESSION_DURATION_MS,
} from "./constants";

function gerarToken(): string {
  return randomBytes(32).toString("hex");
}

const cookieOptions = (expiresAt: Date) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  expires: expiresAt,
  path: "/",
});

export async function createAdminSession(
  adminId: string,
  userAgent?: string | null,
) {
  const token = gerarToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.sessao.create({
    data: { token, tipo: "admin", adminId, userAgent: userAgent ?? null, expiresAt },
  });

  (await cookies()).set(ADMIN_SESSION_COOKIE, token, cookieOptions(expiresAt));
}

export async function createInvestidorSession(
  investidorId: string,
  userAgent?: string | null,
) {
  const token = gerarToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.sessao.create({
    data: {
      token,
      tipo: "investidor",
      investidorId,
      userAgent: userAgent ?? null,
      expiresAt,
    },
  });

  (await cookies()).set(
    INVESTIDOR_SESSION_COOKIE,
    token,
    cookieOptions(expiresAt),
  );
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    await db.sessao.deleteMany({ where: { token, tipo: "admin" } });
  }
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function deleteInvestidorSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(INVESTIDOR_SESSION_COOKIE)?.value;
  if (token) {
    await db.sessao.deleteMany({ where: { token, tipo: "investidor" } });
  }
  cookieStore.delete(INVESTIDOR_SESSION_COOKIE);
}
