"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { deleteUploadedFile, saveUploadedFile } from "@/lib/storage";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
  validarArquivo,
} from "@/lib/upload-validation";

export type AtualizacaoFormState = { error?: string; ok?: boolean } | undefined;

export async function createAtualizacaoAction(
  obraId: string,
  _state: AtualizacaoFormState,
  formData: FormData,
): Promise<AtualizacaoFormState> {
  await verifyAdminSession();

  const titulo = (formData.get("titulo") as string)?.trim();
  const texto = (formData.get("texto") as string)?.trim();
  const dataRaw = formData.get("data") as string;

  if (!titulo || !texto) {
    return { error: "Preencha título e texto da atualização." };
  }

  const arquivos = formData
    .getAll("midias")
    .filter((item): item is File => item instanceof File && item.size > 0);

  for (const arquivo of arquivos) {
    const ehVideo = arquivo.type.startsWith("video");
    const erroValidacao = ehVideo
      ? validarArquivo(arquivo, ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE)
      : validarArquivo(arquivo, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE);
    if (erroValidacao) return { error: erroValidacao };
  }

  const obra = await db.obra.findUnique({ where: { id: obraId } });
  if (!obra) return { error: "Obra não encontrada." };

  const atualizacao = await db.atualizacao.create({
    data: { obraId, titulo, texto, data: dataRaw ? new Date(dataRaw) : new Date() },
  });

  for (const [index, arquivo] of arquivos.entries()) {
    const tipo = arquivo.type.startsWith("video") ? "video" : "foto";
    const arquivoPath = await saveUploadedFile(
      arquivo,
      `obras/${obraId}/atualizacoes/${atualizacao.id}`,
    );
    await db.midia.create({
      data: { obraId, atualizacaoId: atualizacao.id, tipo, arquivoPath, ordem: index },
    });
  }

  revalidatePath(`/admin/obras/${obraId}/atualizacoes`);
  return { ok: true };
}

export async function deleteAtualizacaoAction(atualizacaoId: string) {
  await verifyAdminSession();

  const atualizacao = await db.atualizacao.findUnique({
    where: { id: atualizacaoId },
    include: { midias: true },
  });
  if (!atualizacao) return;

  for (const midia of atualizacao.midias) {
    await deleteUploadedFile(midia.arquivoPath);
  }
  await db.midia.deleteMany({ where: { atualizacaoId } });
  await db.atualizacao.delete({ where: { id: atualizacaoId } });

  revalidatePath(`/admin/obras/${atualizacao.obraId}/atualizacoes`);
}
