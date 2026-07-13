"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { deleteUploadedFile, saveUploadedFile } from "@/lib/storage";
import { obraSchema } from "./schema";

export type ObraFormState =
  | { error: string; fieldErrors?: Record<string, string[]> }
  | undefined;

function parseObraForm(formData: FormData) {
  return obraSchema.safeParse({
    nome: formData.get("nome"),
    codigoInterno: formData.get("codigoInterno"),
    endereco: formData.get("endereco") || undefined,
    bairro: formData.get("bairro") || undefined,
    cidade: formData.get("cidade"),
    status: formData.get("status"),
    descricao: formData.get("descricao") || undefined,
    dataInicio: formData.get("dataInicio") || undefined,
    previsaoEntrega: formData.get("previsaoEntrega") || undefined,
    percentualExecucao: formData.get("percentualExecucao") || 0,
  });
}

export async function createObraAction(
  _state: ObraFormState,
  formData: FormData,
): Promise<ObraFormState> {
  await verifyAdminSession();

  const parsed = parseObraForm(formData);
  if (!parsed.success) {
    return {
      error: "Verifique os campos destacados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const codigoEmUso = await db.obra.findUnique({
    where: { codigoInterno: parsed.data.codigoInterno },
  });
  if (codigoEmUso) {
    return { error: "Já existe uma obra com esse código interno." };
  }

  const { _max } = await db.obra.aggregate({ _max: { ordem: true } });

  const obra = await db.obra.create({
    data: {
      ...parsed.data,
      dataInicio: parsed.data.dataInicio ? new Date(parsed.data.dataInicio) : null,
      previsaoEntrega: parsed.data.previsaoEntrega
        ? new Date(parsed.data.previsaoEntrega)
        : null,
      ordem: (_max.ordem ?? 0) + 1,
    },
  });

  const capa = formData.get("capa");
  if (capa instanceof File && capa.size > 0) {
    const capaPath = await saveUploadedFile(capa, `obras/${obra.id}/capa`);
    await db.obra.update({ where: { id: obra.id }, data: { capaPath } });
  }

  revalidatePath("/admin/obras");
  redirect(`/admin/obras/${obra.id}`);
}

export async function updateObraAction(
  obraId: string,
  _state: ObraFormState,
  formData: FormData,
): Promise<ObraFormState> {
  await verifyAdminSession();

  const parsed = parseObraForm(formData);
  if (!parsed.success) {
    return {
      error: "Verifique os campos destacados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const obraExistente = await db.obra.findUnique({ where: { id: obraId } });
  if (!obraExistente) {
    return { error: "Obra não encontrada." };
  }

  const outraComMesmoCodigo = await db.obra.findFirst({
    where: { codigoInterno: parsed.data.codigoInterno, NOT: { id: obraId } },
  });
  if (outraComMesmoCodigo) {
    return { error: "Já existe outra obra com esse código interno." };
  }

  let capaPath = obraExistente.capaPath;
  const capa = formData.get("capa");
  if (capa instanceof File && capa.size > 0) {
    if (capaPath) await deleteUploadedFile(capaPath);
    capaPath = await saveUploadedFile(capa, `obras/${obraId}/capa`);
  }

  await db.obra.update({
    where: { id: obraId },
    data: {
      ...parsed.data,
      dataInicio: parsed.data.dataInicio ? new Date(parsed.data.dataInicio) : null,
      previsaoEntrega: parsed.data.previsaoEntrega
        ? new Date(parsed.data.previsaoEntrega)
        : null,
      capaPath,
    },
  });

  revalidatePath("/admin/obras");
  revalidatePath(`/admin/obras/${obraId}`);
  redirect(`/admin/obras/${obraId}`);
}

export async function deleteObraAction(obraId: string) {
  await verifyAdminSession();

  const obra = await db.obra.findUnique({
    where: { id: obraId },
    include: { midias: true, documentos: true },
  });
  if (!obra) return;

  if (obra.capaPath) await deleteUploadedFile(obra.capaPath);
  for (const midia of obra.midias) await deleteUploadedFile(midia.arquivoPath);
  for (const documento of obra.documentos) await deleteUploadedFile(documento.arquivoPath);

  await db.obra.delete({ where: { id: obraId } });

  revalidatePath("/admin/obras");
  redirect("/admin/obras");
}

export async function toggleArquivarObraAction(obraId: string) {
  await verifyAdminSession();

  const obra = await db.obra.findUnique({ where: { id: obraId } });
  if (!obra) return;

  await db.obra.update({ where: { id: obraId }, data: { arquivada: !obra.arquivada } });
  revalidatePath("/admin/obras");
}

export async function duplicateObraAction(obraId: string) {
  await verifyAdminSession();

  const obra = await db.obra.findUnique({ where: { id: obraId } });
  if (!obra) return;

  const { _max } = await db.obra.aggregate({ _max: { ordem: true } });

  let novoCodigo = `${obra.codigoInterno}-copia`;
  let contador = 2;
  while (await db.obra.findUnique({ where: { codigoInterno: novoCodigo } })) {
    novoCodigo = `${obra.codigoInterno}-copia-${contador}`;
    contador += 1;
  }

  const novaObra = await db.obra.create({
    data: {
      nome: `${obra.nome} (cópia)`,
      codigoInterno: novoCodigo,
      endereco: obra.endereco,
      bairro: obra.bairro,
      cidade: obra.cidade,
      status: obra.status,
      descricao: obra.descricao,
      dataInicio: obra.dataInicio,
      previsaoEntrega: obra.previsaoEntrega,
      percentualExecucao: obra.percentualExecucao,
      ordem: (_max.ordem ?? 0) + 1,
    },
  });

  revalidatePath("/admin/obras");
  redirect(`/admin/obras/${novaObra.id}`);
}

export async function moveObraAction(obraId: string, direction: "up" | "down") {
  await verifyAdminSession();

  const obras = await db.obra.findMany({
    where: { arquivada: false },
    orderBy: [{ ordem: "asc" }, { createdAt: "asc" }],
  });

  const index = obras.findIndex((o) => o.id === obraId);
  if (index === -1) return;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= obras.length) return;

  const atual = obras[index];
  const alvo = obras[targetIndex];

  await db.$transaction([
    db.obra.update({ where: { id: atual.id }, data: { ordem: alvo.ordem } }),
    db.obra.update({ where: { id: alvo.id }, data: { ordem: atual.ordem } }),
  ]);

  revalidatePath("/admin/obras");
}
