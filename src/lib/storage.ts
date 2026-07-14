import "server-only";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "uploads";

function sanitizeExt(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : "";
}

let cachedClient: SupabaseClient | null = null;

/** Cliente com a service role key — nunca deve ser importado em código que roda no browser. */
function supabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env para habilitar uploads.",
    );
  }

  cachedClient = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  return cachedClient;
}

export async function saveUploadedFile(file: File, subdir: string): Promise<string> {
  const filename = `${randomBytes(16).toString("hex")}${sanitizeExt(file.name)}`;
  const objectPath = `${subdir}/${filename}`;

  const { error } = await supabaseAdmin()
    .storage.from(BUCKET)
    .upload(objectPath, file, { contentType: file.type || undefined, upsert: false });

  if (error) {
    throw new Error(`Falha ao enviar arquivo para o Supabase Storage: ${error.message}`);
  }

  return objectPath;
}

export async function deleteUploadedFile(objectPath: string): Promise<void> {
  const { error } = await supabaseAdmin().storage.from(BUCKET).remove([objectPath]);
  if (error) {
    // Arquivo pode já não existir (ex: exclusões concorrentes) — não interrompe o fluxo.
    console.error(`Falha ao remover "${objectPath}" do Supabase Storage:`, error.message);
  }
}

export async function downloadUploadedFile(
  objectPath: string,
): Promise<{ bytes: Buffer; contentType: string } | null> {
  const { data, error } = await supabaseAdmin().storage.from(BUCKET).download(objectPath);
  if (error || !data) return null;

  const bytes = Buffer.from(await data.arrayBuffer());
  return { bytes, contentType: data.type || "application/octet-stream" };
}
