"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteAtualizacaoAction } from "@/lib/atualizacoes/actions";

export interface AtualizacaoItem {
  id: string;
  titulo: string;
  texto: string;
  data: string;
  midias: { id: string; tipo: string; url: string }[];
}

export function AtualizacaoTimeline({ atualizacoes }: { atualizacoes: AtualizacaoItem[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!window.confirm("Excluir esta atualização definitivamente?")) return;
    startTransition(() => {
      deleteAtualizacaoAction(id);
    });
  }

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
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                  {new Date(atualizacao.data).toLocaleDateString("pt-BR")}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-graphite-900">
                  {atualizacao.titulo}
                </p>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDelete(atualizacao.id)}
                className="p-2 text-stone-400 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Excluir atualização"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-stone-700">
              {atualizacao.texto}
            </p>
            {atualizacao.midias.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {atualizacao.midias.map((midia) =>
                  midia.tipo === "video" ? (
                    <video
                      key={midia.id}
                      src={midia.url}
                      className="h-20 w-full bg-black object-cover"
                      controls
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão
                    <img
                      key={midia.id}
                      src={midia.url}
                      alt=""
                      className="h-20 w-full object-cover"
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
