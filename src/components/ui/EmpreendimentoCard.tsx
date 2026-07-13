import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Empreendimento } from "@/types";
import { IllustrativeBadge } from "@/components/ui/IllustrativeBadge";

export function EmpreendimentoCard({ empreendimento }: { empreendimento: Empreendimento }) {
  const { nome, status, bairro, cidade, image, imageAlt, isRender, slug } = empreendimento;

  return (
    <Link
      href={`/empreendimentos/${slug}`}
      className="group block overflow-hidden border border-stone-200 transition-colors duration-300 hover:border-gold-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">
            Imagem em breve
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-sm bg-graphite-900 px-3 py-1 text-[11px] font-medium tracking-wide text-white">
          {status}
        </span>
        {isRender && image && (
          <IllustrativeBadge className="absolute right-4 top-4" />
        )}
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-graphite-900">{nome}</h3>
          <p className="mt-1 text-sm text-stone-500">
            {bairro ? `${bairro}, ${cidade}` : cidade}
          </p>
        </div>
        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-stone-400 transition-colors group-hover:text-gold-600"
        />
      </div>
    </Link>
  );
}
