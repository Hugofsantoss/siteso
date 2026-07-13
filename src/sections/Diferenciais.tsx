"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diferenciais } from "@/lib/servicos";

export function Diferenciais() {
  return (
    <section className="bg-graphite-900 py-section-lg">
      <Container>
        <SectionHeading
          eyebrow="Por que a Sólido"
          title="Nossos Diferenciais"
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {diferenciais.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="border-t border-white/15 pt-6"
            >
              <span className="font-display text-3xl font-semibold text-gold-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{item.descricao}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
