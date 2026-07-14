import "server-only";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
export const ALLOWED_DOCUMENT_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];

const MB = 1024 * 1024;
export const MAX_IMAGE_SIZE = 8 * MB;
export const MAX_VIDEO_SIZE = 9 * MB;
export const MAX_DOCUMENT_SIZE = 9 * MB;

/**
 * Valida tipo (allowlist de MIME types) e tamanho de um arquivo enviado.
 * Retorna uma mensagem de erro amigável, ou null se o arquivo for válido.
 */
export function validarArquivo(
  file: File,
  allowedTypes: string[],
  maxSize: number,
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return "Tipo de arquivo não permitido.";
  }
  if (file.size > maxSize) {
    return `Arquivo muito grande (máximo ${Math.round(maxSize / MB)}MB).`;
  }
  return null;
}
