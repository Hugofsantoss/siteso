import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import {
  getAdminFromSession,
  getInvestidorFromSession,
  investidorTemAcessoObra,
} from "@/lib/auth/dal";
import { resolveUploadedFilePath } from "@/lib/storage";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

async function arquivoPertenceAInvestidor(
  relativePath: string,
  investidorId: string,
): Promise<boolean> {
  const [obraPorCapa, midia, documento] = await Promise.all([
    db.obra.findFirst({ where: { capaPath: relativePath }, select: { id: true } }),
    db.midia.findFirst({ where: { arquivoPath: relativePath }, select: { obraId: true } }),
    db.documento.findFirst({ where: { arquivoPath: relativePath }, select: { obraId: true } }),
  ]);

  const obraId = obraPorCapa?.id ?? midia?.obraId ?? documento?.obraId;
  if (!obraId) return false;

  return investidorTemAcessoObra(investidorId, obraId);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const relativePath = segments.join("/");

  const admin = await getAdminFromSession();
  const investidor = admin ? null : await getInvestidorFromSession();

  if (!admin && !investidor) {
    return new NextResponse(null, { status: 401 });
  }

  if (investidor) {
    const autorizado = await arquivoPertenceAInvestidor(relativePath, investidor.investidorId);
    if (!autorizado) {
      return new NextResponse(null, { status: 403 });
    }
  }

  const absolutePath = resolveUploadedFilePath(relativePath);
  if (!absolutePath) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const buffer = await readFile(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
