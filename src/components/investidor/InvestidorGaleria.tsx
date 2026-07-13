"use client";

import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import { InvestidorLightbox } from "@/components/investidor/InvestidorLightbox";

export interface GaleriaMidia {
  id: string;
  tipo: string;
  titulo: string | null;
  categoria: string | null;
  url: string;
}

export function InvestidorGaleria({ midias }: { midias: GaleriaMidia[] }) {
  const categorias = useMemo(
    () => [...new Set(midias.map((m) => m.categoria).filter((c): c is string => !!c))],
    [midias],
  );
  const [filtro, setFiltro] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtradas = filtro ? midias.filter((m) => m.categoria === filtro) : midias;
  const fotos = filtradas.filter((m) => m.tipo !== "video");
  const videos = filtradas.filter((m) => m.tipo === "video");

  if (midias.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhuma foto ou vídeo publicado ainda.
      </p>
    );
  }

  return (
    <div>
      {categorias.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro(null)}
            className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
              filtro === null
                ? "bg-graphite-900 text-white"
                : "border border-stone-300 text-stone-600 hover:border-gold-500"
            }`}
          >
            Todas ({midias.length})
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                filtro === categoria
                  ? "bg-graphite-900 text-white"
                  : "border border-stone-300 text-stone-600 hover:border-gold-500"
              }`}
            >
              {categoria} ({midias.filter((m) => m.categoria === categoria).length})
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {fotos.map((foto, i) => (
          <button
            key={foto.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-stone-100 text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão */}
            <img
              src={foto.url}
              alt={foto.titulo ?? "Foto da obra"}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <Expand
                size={22}
                strokeWidth={1.5}
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            {foto.titulo && (
              <span className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs font-medium text-white">
                {foto.titulo}
              </span>
            )}
          </button>
        ))}

        {videos.map((video) => (
          <div key={video.id} className="relative aspect-[4/3] overflow-hidden bg-black">
            <video src={video.url} controls className="h-full w-full object-cover" />
            {video.titulo && (
              <span className="pointer-events-none absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs font-medium text-white">
                {video.titulo}
              </span>
            )}
          </div>
        ))}
      </div>

      <InvestidorLightbox
        images={fotos.map((foto) => ({
          src: foto.url,
          alt: foto.titulo ?? "Foto da obra",
          label: foto.titulo ?? undefined,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
