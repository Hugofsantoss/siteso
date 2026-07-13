"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { Servico } from "@/types";

export function ServicoDetail({
  servico,
  reverse = false,
  tone = "light",
}: {
  servico: Servico;
  reverse?: boolean;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  if (!servico.image) {
    return (
      <section className={isDark ? "bg-graphite-900 py-section-lg" : "bg-white py-section-lg"}>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className={`font-display text-3xl font-semibold md:text-4xl ${isDark ? "text-white" : "text-graphite-900"}`}
            >
              {servico.titulo}
            </h2>
            <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-stone-300" : "text-stone-600"}`}>
              {servico.descricaoLonga ?? servico.descricao}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={isDark ? "bg-graphite-900 py-section-lg" : "bg-white py-section-lg"}>
      <Container>
        <div
          className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={servico.image}
              alt={servico.imageAlt ?? servico.titulo}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h2
              className={`font-display text-3xl font-semibold md:text-4xl ${isDark ? "text-white" : "text-graphite-900"}`}
            >
              {servico.titulo}
            </h2>
            <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-stone-300" : "text-stone-600"}`}>
              {servico.descricaoLonga ?? servico.descricao}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
