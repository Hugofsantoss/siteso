import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { assertInvestidorAcessoObra } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { InvestidorGaleria } from "@/components/investidor/InvestidorGaleria";
import { AtualizacaoTimelineView } from "@/components/investidor/AtualizacaoTimelineView";
import { DocumentoListView } from "@/components/investidor/DocumentoListView";

export const metadata: Metadata = {
  title: "Detalhes da obra",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function InvestidorObraDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Barreira de seguranca: 404 se o investidor logado nao tiver vinculo com esta obra.
  await assertInvestidorAcessoObra(id);

  const obra = await db.obra.findUnique({
    where: { id },
    include: {
      midias: { where: { atualizacaoId: null }, orderBy: [{ ordem: "asc" }, { createdAt: "asc" }] },
      documentos: { orderBy: { createdAt: "desc" } },
      atualizacoes: { orderBy: { data: "desc" }, include: { midias: true } },
    },
  });

  if (!obra) notFound();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold text-graphite-900">{obra.nome}</h1>
          <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-graphite-900">
            {obra.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-stone-600">
          {[obra.bairro, obra.cidade].filter(Boolean).join(", ")}
        </p>
      </div>

      {obra.descricao && (
        <p className="max-w-3xl text-sm leading-relaxed text-stone-700">{obra.descricao}</p>
      )}

      <section className="border border-stone-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-graphite-900">
          Andamento da obra
        </h2>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>Execução</span>
            <span className="font-display text-lg font-semibold text-gold-600">
              {obra.percentualExecucao}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-gold-500"
              style={{ width: `${obra.percentualExecucao}%` }}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          {obra.dataInicio && (
            <div>
              <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                Início da obra
              </p>
              <p className="mt-1 text-graphite-900">{formatDate(obra.dataInicio)}</p>
            </div>
          )}
          {obra.previsaoEntrega && (
            <div>
              <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                Previsão de entrega
              </p>
              <p className="mt-1 text-graphite-900">{formatDate(obra.previsaoEntrega)}</p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-graphite-900">Atualizações</h2>
        <AtualizacaoTimelineView
          atualizacoes={obra.atualizacoes.map((atualizacao) => ({
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-graphite-900">Galeria</h2>
        <InvestidorGaleria
          midias={obra.midias.map((midia) => ({
            id: midia.id,
            tipo: midia.tipo,
            titulo: midia.titulo,
            categoria: midia.categoria,
            url: `/api/arquivos/${midia.arquivoPath}`,
          }))}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-graphite-900">Documentos</h2>
        <DocumentoListView
          documentos={obra.documentos.map((documento) => ({
            id: documento.id,
            titulo: documento.titulo,
            categoria: documento.categoria,
            permiteDownload: documento.permiteDownload,
            url: `/api/arquivos/${documento.arquivoPath}`,
          }))}
        />
      </section>
    </div>
  );
}
