"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { diferenciais } from "@/data/servicos";
import type { Empreendimento } from "@/types";

export function LancamentoSpotlight({
  empreendimento,
  reverse = false,
}: {
  empreendimento: Empreendimento;
  reverse?: boolean;
}) {
  const {
    nome,
    slug,
    status,
    bairro,
    cidade,
    image,
    imageAlt,
    localizacao,
    composicao,
    galeria,
  } = empreendimento;
  const planta = galeria?.find((img) => img.tipo === "planta");

  return (
    <section className={reverse ? "bg-stone-50 py-section-lg" : "bg-white py-section-lg"}>
      <Container>
        <div
          className={`grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-graphite-900 px-3 py-1 text-[11px] font-medium tracking-wide text-white">
                {status}
              </span>
            </div>

            {planta && (
              <div className="relative mt-4 aspect-[4/3] w-1/2 overflow-hidden">
                <Image
                  src={planta.src}
                  alt={planta.alt}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase">
              {bairro ? `${bairro}, ${cidade}` : cidade}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-graphite-900 md:text-4xl">
              {nome}
            </h2>

            {localizacao && (
              <p className="mt-5 text-sm leading-relaxed text-stone-600">{localizacao}</p>
            )}
            {composicao && (
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{composicao}</p>
            )}

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {diferenciais.map((item) => (
                <li key={item.titulo} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                  {item.titulo}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href={`/empreendimentos/${slug}`} variant="primary">
                Saiba mais
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
