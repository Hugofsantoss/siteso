"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { InvestidorLightbox } from "@/components/investidor/InvestidorLightbox";

interface AtualizacaoMidiaGridProps {
  midias: { id: string; tipo: string; url: string }[];
}

export function AtualizacaoMidiaGrid({ midias }: AtualizacaoMidiaGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fotos = midias.filter((midia) => midia.tipo !== "video");
  const videos = midias.filter((midia) => midia.tipo === "video");

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {fotos.map((foto, i) => (
          <button
            key={foto.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-stone-100 text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão */}
            <img
              src={foto.url}
              alt="Foto da atualização"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <Expand
                size={20}
                strokeWidth={1.5}
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </button>
        ))}

        {videos.map((video) => (
          <video
            key={video.id}
            src={video.url}
            className="aspect-[4/3] w-full bg-black object-cover"
            controls
          />
        ))}
      </div>

      <InvestidorLightbox
        images={fotos.map((foto) => ({ src: foto.url, alt: "Foto da atualização" }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
