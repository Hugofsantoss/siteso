import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AtualizacaoForm } from "@/components/admin/obras/AtualizacaoForm";
import { AtualizacaoTimeline } from "@/components/admin/obras/AtualizacaoTimeline";
import { createAtualizacaoAction } from "@/lib/atualizacoes/actions";

export const metadata: Metadata = {
  title: "Atualizações da obra",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ObraAtualizacoesPage({ params }: PageProps) {
  const { id } = await params;

  const atualizacoes = await db.atualizacao.findMany({
    where: { obraId: id },
    orderBy: { data: "desc" },
    include: { midias: true },
  });

  const action = createAtualizacaoAction.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <AtualizacaoForm action={action} />
      <AtualizacaoTimeline
        atualizacoes={atualizacoes.map((atualizacao) => ({
          id: atualizacao.id,
          titulo: atualizacao.titulo,
          texto: atualizacao.texto,
          data: atualizacao.data.toISOString(),
          midias: atualizacao.midias.map((midia) => ({
            id: midia.id,
            tipo: midia.tipo,
            url: `/api/arquivos/${midia.arquivoPath}`,
          })),
        }))}
      />
    </div>
  );
}
