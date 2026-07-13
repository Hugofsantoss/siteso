"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import type { ImagemGaleria } from "@/types";

const tipoLabels: Record<ImagemGaleria["tipo"], string> = {
  fachada: "Fachada",
  interior: "Ambientes",
  planta: "Plantas",
};

export function Galeria({
  images,
  showFilter = true,
}: {
  images: ImagemGaleria[];
  showFilter?: boolean;
}) {
  const tipos = useMemo(() => [...new Set(images.map((img) => img.tipo))], [images]);
  const [filtro, setFiltro] = useState<ImagemGaleria["tipo"] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtradas = filtro ? images.filter((img) => img.tipo === filtro) : images;

  return (
    <div>
      {showFilter && tipos.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro(null)}
            className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
              filtro === null
                ? "bg-graphite-900 text-white"
                : "border border-stone-300 text-stone-600 hover:border-gold-500"
            }`}
          >
            Todas ({images.length})
          </button>
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                filtro === tipo
                  ? "bg-graphite-900 text-white"
                  : "border border-stone-300 text-stone-600 hover:border-gold-500"
              }`}
            >
              {tipoLabels[tipo]} ({images.filter((img) => img.tipo === tipo).length})
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {filtradas.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-stone-100 text-left"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <Expand
                size={22}
                strokeWidth={1.5}
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            {img.label && (
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs font-medium text-white">
                {img.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        images={filtradas.map((img) => ({ src: img.src, alt: img.alt, label: img.label }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
