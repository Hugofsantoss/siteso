"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMidiaAction } from "@/lib/midias/actions";

export interface MidiaItem {
  id: string;
  tipo: string;
  titulo: string | null;
  categoria: string | null;
  mesReferencia: string | null;
  url: string;
}

export function MidiaGrid({ midias }: { midias: MidiaItem[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!window.confirm("Excluir esta mídia definitivamente?")) return;
    startTransition(() => {
      deleteMidiaAction(id);
    });
  }

  if (midias.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhuma mídia enviada ainda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {midias.map((midia) => (
        <div
          key={midia.id}
          className="group relative overflow-hidden border border-stone-200 bg-white"
        >
          {midia.tipo === "video" ? (
            <video src={midia.url} className="h-40 w-full bg-black object-cover" controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão
            <img
              src={midia.url}
              alt={midia.titulo ?? "Mídia da obra"}
              className="h-40 w-full object-cover"
            />
          )}
          <div className="p-3">
            {midia.titulo && (
              <p className="truncate text-sm font-medium text-graphite-900">{midia.titulo}</p>
            )}
            <p className="text-xs text-stone-500">
              {[midia.categoria, midia.mesReferencia].filter(Boolean).join(" · ") || "—"}
            </p>
          </div>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleDelete(midia.id)}
            className="absolute top-2 right-2 bg-white/90 p-1.5 text-stone-600 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Excluir mídia"
          >
            <Trash2 size={14} strokeWidth={1.5} />
          </button>
        </div>
      ))}
    </div>
  );
}
