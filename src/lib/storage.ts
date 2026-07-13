import "server-only";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

export const UPLOADS_ROOT = path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.UPLOADS_DIR ?? "./uploads");

function sanitizeExt(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : "";
}

export async function saveUploadedFile(file: File, subdir: string): Promise<string> {
  const filename = `${randomBytes(16).toString("hex")}${sanitizeExt(file.name)}`;
  const relativePath = `${subdir}/${filename}`;
  const absoluteDir = path.join(UPLOADS_ROOT, subdir);

  await mkdir(absoluteDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOADS_ROOT, relativePath), buffer);

  return relativePath;
}

export async function deleteUploadedFile(relativePath: string): Promise<void> {
  const absolutePath = resolveUploadedFilePath(relativePath);
  if (!absolutePath) return;
  try {
    await unlink(absolutePath);
  } catch {
    // arquivo pode já não existir — nada a fazer
  }
}

/** Resolve um caminho relativo dentro de UPLOADS_ROOT, recusando qualquer tentativa de path traversal. */
export function resolveUploadedFilePath(relativePath: string): string | null {
  const absolute = path.normalize(path.join(UPLOADS_ROOT, relativePath));
  const rootWithSep = UPLOADS_ROOT.endsWith(path.sep) ? UPLOADS_ROOT : `${UPLOADS_ROOT}${path.sep}`;
  if (!absolute.startsWith(rootWithSep)) return null;
  return absolute;
}
