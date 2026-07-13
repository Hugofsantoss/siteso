"use client";

import { motion } from "framer-motion";
import { Building2, Home, PaintRoller } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicos } from "@/lib/servicos";

const icons = [Building2, Home, PaintRoller];

export function ServicosGrid() {
  return (
    <section className="py-section-lg">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Nossos Serviços"
          description="Da fundação ao acabamento, atuamos em cada etapa da construção com engenharia sólida e atenção aos detalhes."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {servicos.map((servico, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={servico.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group border border-stone-200 p-8 transition-colors duration-300 hover:border-gold-500"
              >
                <Icon size={32} strokeWidth={1.25} className="text-gold-600" />
                <h3 className="mt-6 font-display text-xl font-semibold text-graphite-900">
                  {servico.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{servico.descricao}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/servicos"
            className="text-sm font-medium tracking-wide text-graphite-900 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
          >
            Ver todos os serviços
          </Link>
        </div>
      </Container>
    </section>
  );
}
