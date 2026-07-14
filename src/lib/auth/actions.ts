"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { verifyPassword } from "./password";
import { loginBloqueado, registrarTentativaFalha, limparTentativas } from "./rate-limit";
import {
  createAdminSession,
  createInvestidorSession,
  deleteAdminSession,
  deleteInvestidorSession,
} from "./session";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  senha: z.string().min(1, "Informe a senha."),
});

export type LoginState = { error: string } | undefined;

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

const MENSAGEM_BLOQUEIO =
  "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.";

export async function loginAdminAction(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  });
  if (!parsed.success) {
    return { error: "Preencha e-mail e senha corretamente." };
  }

  const { email, senha } = parsed.data;
  const ip = await getClientIp();
  const rateLimitKey = `admin:${email}:${ip}`;

  if (loginBloqueado(rateLimitKey)) {
    return { error: MENSAGEM_BLOQUEIO };
  }

  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin || !admin.ativo || !(await verifyPassword(senha, admin.senhaHash))) {
    registrarTentativaFalha(rateLimitKey);
    return { error: "E-mail ou senha inválidos." };
  }

  limparTentativas(rateLimitKey);
  const userAgent = (await headers()).get("user-agent");
  await createAdminSession(admin.id, userAgent);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await deleteAdminSession();
  redirect("/admin/login");
}

export async function loginInvestidorAction(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  });
  if (!parsed.success) {
    return { error: "Preencha e-mail e senha corretamente." };
  }

  const { email, senha } = parsed.data;
  const ip = await getClientIp();
  const rateLimitKey = `investidor:${email}:${ip}`;

  if (loginBloqueado(rateLimitKey)) {
    return { error: MENSAGEM_BLOQUEIO };
  }

  const investidor = await db.investidor.findUnique({ where: { email } });
  if (
    !investidor ||
    !investidor.ativo ||
    !(await verifyPassword(senha, investidor.senhaHash))
  ) {
    registrarTentativaFalha(rateLimitKey);
    return { error: "E-mail ou senha inválidos." };
  }

  limparTentativas(rateLimitKey);
  const userAgent = (await headers()).get("user-agent");
  await createInvestidorSession(investidor.id, userAgent);
  redirect("/investidor");
}

export async function logoutInvestidorAction() {
  await deleteInvestidorSession();
  redirect("/investidor/login");
}
