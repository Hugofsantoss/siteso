"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { deleteUploadedFile, saveUploadedFile } from "@/lib/storage";

export type MidiaFormState = { error?: string; ok?: boolean } | undefined;

export async function createMidiaAction(
  obraId: string,
  _state: MidiaFormState,
  formData: FormData,
): Promise<MidiaFormState> {
  await verifyAdminSession();

  const arquivo = formData.get("arquivo");
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return { error: "Selecione um arquivo." };
  }

  const obra = await db.obra.findUnique({ where: { id: obraId } });
  if (!obra) return { error: "Obra não encontrada." };

  const tipo = formData.get("tipo") === "video" ? "video" : "foto";
  const titulo = (formData.get("titulo") as string)?.trim() || null;
  const descricao = (formData.get("descricao") as string)?.trim() || null;
  const categoria = (formData.get("categoria") as string)?.trim() || null;
  const mesReferencia = (formData.get("mesReferencia") as string)?.trim() || null;

  const arquivoPath = await saveUploadedFile(arquivo, `obras/${obraId}/midias`);
  const { _max } = await db.midia.aggregate({ where: { obraId }, _max: { ordem: true } });

  await db.midia.create({
    data: {
      obraId,
      tipo,
      titulo,
      descricao,
      categoria,
      mesReferencia,
      arquivoPath,
      ordem: (_max.ordem ?? 0) + 1,
    },
  });

  revalidatePath(`/admin/obras/${obraId}/midias`);
  return { ok: true };
}

export async function deleteMidiaAction(midiaId: string) {
  await verifyAdminSession();

  const midia = await db.midia.findUnique({ where: { id: midiaId } });
  if (!midia) return;

  await deleteUploadedFile(midia.arquivoPath);
  await db.midia.delete({ where: { id: midiaId } });

  revalidatePath(`/admin/obras/${midia.obraId}/midias`);
}
