"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmpreendimentoCard } from "@/components/ui/EmpreendimentoCard";
import { lancamentos } from "@/data/empreendimentos";

export function LancamentosDestaque() {
  return (
    <section className="bg-stone-50 py-section-lg">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Obras"
            title="Lançamentos"
            description="Conheça os novos empreendimentos da Sólido em Belo Horizonte."
          />
          <Link
            href="/lancamentos"
            className="shrink-0 text-sm font-medium tracking-wide text-graphite-900 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
          >
            Ver todos os lançamentos
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {lancamentos.map((empreendimento, index) => (
            <motion.div
              key={empreendimento.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            >
              <EmpreendimentoCard empreendimento={empreendimento} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
