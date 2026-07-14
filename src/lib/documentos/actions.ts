"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { deleteUploadedFile, saveUploadedFile } from "@/lib/storage";
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE, validarArquivo } from "@/lib/upload-validation";

export type DocumentoFormState = { error?: string; ok?: boolean } | undefined;

export async function createDocumentoAction(
  obraId: string,
  _state: DocumentoFormState,
  formData: FormData,
): Promise<DocumentoFormState> {
  await verifyAdminSession();

  const arquivo = formData.get("arquivo");
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return { error: "Selecione um arquivo." };
  }

  const erroValidacao = validarArquivo(arquivo, ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE);
  if (erroValidacao) return { error: erroValidacao };

  const titulo = (formData.get("titulo") as string)?.trim();
  if (!titulo) return { error: "Informe um título para o documento." };

  const obra = await db.obra.findUnique({ where: { id: obraId } });
  if (!obra) return { error: "Obra não encontrada." };

  const categoria = ((formData.get("categoria") as string) || "Geral").trim();
  const permiteDownload = formData.get("permiteDownload") === "on";

  const arquivoPath = await saveUploadedFile(arquivo, `obras/${obraId}/documentos`);

  await db.documento.create({
    data: { obraId, titulo, categoria, arquivoPath, permiteDownload },
  });

  revalidatePath(`/admin/obras/${obraId}/documentos`);
  return { ok: true };
}

export async function deleteDocumentoAction(documentoId: string) {
  await verifyAdminSession();

  const documento = await db.documento.findUnique({ where: { id: documentoId } });
  if (!documento) return;

  await deleteUploadedFile(documento.arquivoPath);
  await db.documento.delete({ where: { id: documentoId } });

  revalidatePath(`/admin/obras/${documento.obraId}/documentos`);
}
