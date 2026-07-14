import { AtualizacaoMidiaGrid } from "@/components/investidor/AtualizacaoMidiaGrid";

export interface AtualizacaoItem {
  id: string;
  titulo: string;
  texto: string;
  data: string;
  midias: { id: string; tipo: string; url: string }[];
}

export function AtualizacaoTimelineView({ atualizacoes }: { atualizacoes: AtualizacaoItem[] }) {
  if (atualizacoes.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhuma atualização publicada ainda.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-6 border-l border-stone-200 pl-6">
      {atualizacoes.map((atualizacao) => (
        <li key={atualizacao.id} className="relative">
          <span className="absolute top-1.5 -left-[29px] h-3 w-3 rounded-full bg-gold-500" />
          <div className="border border-stone-200 bg-white p-5">
            <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
              {new Date(atualizacao.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-graphite-900">
              {atualizacao.titulo}
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-stone-700">
              {atualizacao.texto}
            </p>
            {atualizacao.midias.length > 0 && (
              <AtualizacaoMidiaGrid midias={atualizacao.midias} />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
