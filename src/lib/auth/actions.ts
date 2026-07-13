"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { verifyPassword } from "./password";
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
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin || !admin.ativo || !(await verifyPassword(senha, admin.senhaHash))) {
    return { error: "E-mail ou senha inválidos." };
  }

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
  const investidor = await db.investidor.findUnique({ where: { email } });
  if (
    !investidor ||
    !investidor.ativo ||
    !(await verifyPassword(senha, investidor.senhaHash))
  ) {
    return { error: "E-mail ou senha inválidos." };
  }

  const userAgent = (await headers()).get("user-agent");
  await createInvestidorSession(investidor.id, userAgent);
  redirect("/investidor");
}

export async function logoutInvestidorAction() {
  await deleteInvestidorSession();
  redirect("/investidor/login");
}
