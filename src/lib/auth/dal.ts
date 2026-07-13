import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, INVESTIDOR_SESSION_COOKIE } from "./constants";

export const verifyAdminSession = cache(async () => {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) redirect("/admin/login");

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
    redirect("/admin/login");
  }

  return {
    adminId: sessao.admin.id,
    nome: sessao.admin.nome,
    email: sessao.admin.email,
  };
});

export const verifyInvestidorSession = cache(async () => {
  const token = (await cookies()).get(INVESTIDOR_SESSION_COOKIE)?.value;
  if (!token) redirect("/investidor/login");

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
    redirect("/investidor/login");
  }

  return {
    investidorId: sessao.investidor.id,
    nome: sessao.investidor.nome,
    email: sessao.investidor.email,
  };
});

export const getInvestidorObras = cache(async () => {
  const { investidorId } = await verifyInvestidorSession();

  return db.obra.findMany({
    where: { investidores: { some: { investidorId } }, arquivada: false },
    orderBy: { ordem: "asc" },
  });
});

export async function assertInvestidorAcessoObra(obraId: string) {
  const { investidorId } = await verifyInvestidorSession();

  const vinculo = await db.investidorObra.findUnique({
    where: { investidorId_obraId: { investidorId, obraId } },
  });

  if (!vinculo) notFound();
}
