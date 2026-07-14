import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  getAdminFromSession,
  getInvestidorFromSession,
  investidorTemAcessoObra,
} from "@/lib/auth/dal";
import { downloadUploadedFile } from "@/lib/storage";

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

  const arquivo = await downloadUploadedFile(relativePath);
  if (!arquivo) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(arquivo.bytes), {
    headers: {
      "Content-Type": arquivo.contentType,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
