import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, INVESTIDOR_SESSION_COOKIE } from "./constants";

export const getAdminFromSession = cache(async () => {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const sessao = await db.sessao.findUnique({
    where: { token },
    include: { admin: true },
  });

  if (
    !sessao ||
    sessao.tipo !== "admin" ||
    !sessao.admin ||
    !sessao.admin.ativo ||
    sessao.expiresAt < new Date()
  ) {
    return null;
  }

  return {
    adminId: sessao.admin.id,
    nome: sessao.admin.nome,
    email: sessao.admin.email,
  };
});

export const getInvestidorFromSession = cache(async () => {
  const token = (await cookies()).get(INVESTIDOR_SESSION_COOKIE)?.value;
  if (!token) return null;

  const sessao = await db.sessao.findUnique({
    where: { token },
    include: { investidor: true },
  });

  if (
    !sessao ||
    sessao.tipo !== "investidor" ||
    !sessao.investidor ||
    !sessao.investidor.ativo ||
    sessao.expiresAt < new Date()
  ) {
    return null;
  }

  return {
    investidorId: sessao.investidor.id,
    nome: sessao.investidor.nome,
    email: sessao.investidor.email,
  };
});

export async function verifyAdminSession() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function verifyInvestidorSession() {
  const investidor = await getInvestidorFromSession();
  if (!investidor) redirect("/investidor/login");
  return investidor;
}

export const getInvestidorObras = cache(async () => {
  const { investidorId } = await verifyInvestidorSession();

  return db.obra.findMany({
    where: { investidores: { some: { investidorId } }, arquivada: false },
    orderBy: { ordem: "asc" },
  });
});

export async function investidorTemAcessoObra(
  investidorId: string,
  obraId: string,
): Promise<boolean> {
  const vinculo = await db.investidorObra.findUnique({
    where: { investidorId_obraId: { investidorId, obraId } },
  });
  return !!vinculo;
}

export async function assertInvestidorAcessoObra(obraId: string) {
  const { investidorId } = await verifyInvestidorSession();
  const autorizado = await investidorTemAcessoObra(investidorId, obraId);
  if (!autorizado) notFound();
}
