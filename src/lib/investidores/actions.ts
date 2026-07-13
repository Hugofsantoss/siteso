"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { investidorBaseSchema, senhaSchema } from "./schema";

export type InvestidorFormState =
  | { error: string; fieldErrors?: Record<string, string[]> }
  | undefined;

function parseBaseForm(formData: FormData) {
  return investidorBaseSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone") || undefined,
    documento: formData.get("documento") || undefined,
  });
}

function getObraIds(formData: FormData): string[] {
  return formData.getAll("obraIds").map(String);
}

export async function createInvestidorAction(
  _state: InvestidorFormState,
  formData: FormData,
): Promise<InvestidorFormState> {
  await verifyAdminSession();

  const parsedBase = parseBaseForm(formData);
  const senhaResult = senhaSchema.safeParse(formData.get("senha"));

  if (!parsedBase.success || !senhaResult.success) {
    return {
      error: "Verifique os campos destacados.",
      fieldErrors: {
        ...(parsedBase.success ? {} : parsedBase.error.flatten().fieldErrors),
        ...(senhaResult.success ? {} : { senha: senhaResult.error.flatten().formErrors }),
      },
    };
  }

  const emailEmUso = await db.investidor.findUnique({ where: { email: parsedBase.data.email } });
  if (emailEmUso) {
    return { error: "Já existe um investidor com esse e-mail." };
  }

  const senhaHash = await hashPassword(senhaResult.data);
  const obraIds = getObraIds(formData);

  const investidor = await db.investidor.create({
    data: {
      ...parsedBase.data,
      senhaHash,
      obras: { create: obraIds.map((obraId) => ({ obraId })) },
    },
  });

  revalidatePath("/admin/investidores");
  redirect(`/admin/investidores/${investidor.id}`);
}

export async function updateInvestidorAction(
  investidorId: string,
  _state: InvestidorFormState,
  formData: FormData,
): Promise<InvestidorFormState> {
  await verifyAdminSession();

  const parsedBase = parseBaseForm(formData);
  if (!parsedBase.success) {
    return {
      error: "Verifique os campos destacados.",
      fieldErrors: parsedBase.error.flatten().fieldErrors,
    };
  }

  const senhaRaw = formData.get("senha");
  let senhaHash: string | undefined;
  if (typeof senhaRaw === "string" && senhaRaw.length > 0) {
    const senhaResult = senhaSchema.safeParse(senhaRaw);
    if (!senhaResult.success) {
      return {
        error: "Verifique os campos destacados.",
        fieldErrors: { senha: senhaResult.error.flatten().formErrors },
      };
    }
    senhaHash = await hashPassword(senhaResult.data);
  }

  const investidorExistente = await db.investidor.findUnique({ where: { id: investidorId } });
  if (!investidorExistente) {
    return { error: "Investidor não encontrado." };
  }

  const outroComMesmoEmail = await db.investidor.findFirst({
    where: { email: parsedBase.data.email, NOT: { id: investidorId } },
  });
  if (outroComMesmoEmail) {
    return { error: "Já existe outro investidor com esse e-mail." };
  }

  const obraIds = getObraIds(formData);

  await db.$transaction([
    db.investidor.update({
      where: { id: investidorId },
      data: { ...parsedBase.data, ...(senhaHash ? { senhaHash } : {}) },
    }),
    db.investidorObra.deleteMany({ where: { investidorId } }),
    ...(obraIds.length > 0
      ? [
          db.investidorObra.createMany({
            data: obraIds.map((obraId) => ({ investidorId, obraId })),
          }),
        ]
      : []),
  ]);

  revalidatePath("/admin/investidores");
  revalidatePath(`/admin/investidores/${investidorId}`);
  redirect(`/admin/investidores/${investidorId}`);
}

export async function deleteInvestidorAction(investidorId: string) {
  await verifyAdminSession();
  await db.investidor.delete({ where: { id: investidorId } }).catch(() => undefined);
  revalidatePath("/admin/investidores");
  redirect("/admin/investidores");
}

export async function toggleAtivoInvestidorAction(investidorId: string) {
  await verifyAdminSession();

  const investidor = await db.investidor.findUnique({ where: { id: investidorId } });
  if (!investidor) return;

  await db.investidor.update({
    where: { id: investidorId },
    data: { ativo: !investidor.ativo },
  });

  if (investidor.ativo) {
    // estava ativo e foi desativado agora: encerra sessões abertas imediatamente
    await db.sessao.deleteMany({ where: { tipo: "investidor", investidorId } });
  }

  revalidatePath("/admin/investidores");
}
