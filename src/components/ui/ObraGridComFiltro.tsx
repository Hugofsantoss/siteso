"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmpreendimentoCard } from "@/components/ui/EmpreendimentoCard";
import type { Empreendimento } from "@/types";

const colsClass: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "sm:grid-cols-2 md:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-4",
};

export function ObraGridComFiltro({
  items,
  columns = 3,
}: {
  items: Empreendimento[];
  columns?: 2 | 3 | 4;
}) {
  const [busca, setBusca] = useState("");
  const tipos = useMemo(() => [...new Set(items.map((item) => item.tipo))], [items]);
  const [tipoAtivo, setTipoAtivo] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return items.filter((item) => {
      const combina =
        !termo ||
        item.nome.toLowerCase().includes(termo) ||
        item.bairro?.toLowerCase().includes(termo) ||
        item.cidade.toLowerCase().includes(termo);
      const combinaTipo = !tipoAtivo || item.tipo === tipoAtivo;
      return combina && combinaTipo;
    });
  }, [items, busca, tipoAtivo]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search
            size={18}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou bairro..."
            aria-label="Buscar obra por nome ou bairro"
            className="w-full border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none"
          />
        </div>

        {tipos.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTipoAtivo(null)}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                tipoAtivo === null
                  ? "bg-graphite-900 text-white"
                  : "border border-stone-300 text-stone-600 hover:border-gold-500"
              }`}
            >
              Todos
            </button>
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoAtivo(tipo)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                  tipoAtivo === tipo
                    ? "bg-graphite-900 text-white"
                    : "border border-stone-300 text-stone-600 hover:border-gold-500"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtrados.length === 0 ? (
        <p className="mt-14 text-center text-sm text-stone-500">
          Nenhuma obra encontrada para essa busca.
        </p>
      ) : (
        <div className={`mt-10 grid grid-cols-1 gap-8 ${colsClass[columns]}`}>
          {filtrados.map((empreendimento) => (
            <EmpreendimentoCard key={empreendimento.slug} empreendimento={empreendimento} />
          ))}
        </div>
      )}
    </div>
  );
}
