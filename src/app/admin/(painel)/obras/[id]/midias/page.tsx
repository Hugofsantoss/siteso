import type { Metadata } from "next";
import { db } from "@/lib/db";
import { MidiaUploadForm } from "@/components/admin/obras/MidiaUploadForm";
import { MidiaGrid } from "@/components/admin/obras/MidiaGrid";
import { createMidiaAction } from "@/lib/midias/actions";

export const metadata: Metadata = {
  title: "Mídias da obra",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ObraMidiasPage({ params }: PageProps) {
  const { id } = await params;

  const midias = await db.midia.findMany({
    where: { obraId: id, atualizacaoId: null },
    orderBy: [{ ordem: "asc" }, { createdAt: "asc" }],
  });

  const action = createMidiaAction.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <MidiaUploadForm action={action} />
      <MidiaGrid
        midias={midias.map((midia) => ({
          id: midia.id,
          tipo: midia.tipo,
          titulo: midia.titulo,
          categoria: midia.categoria,
          mesReferencia: midia.mesReferencia,
          url: `/api/arquivos/${midia.arquivoPath}`,
        }))}
      />
    </div>
  );
}
