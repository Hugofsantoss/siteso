"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, contactInfo } from "@/lib/site-config";

export function CtaContato() {
  return (
    <section className="py-section-lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 border border-stone-200 px-8 py-16 text-center md:px-16"
        >
          <span className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase">
            Investindo no seu sonho
          </span>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-graphite-900 md:text-4xl">
            Vamos construir o seu próximo projeto?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-stone-600">
            Fale com a nossa equipe e receba um atendimento personalizado para o seu
            empreendimento, construção ou revitalização de fachada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contato" variant="primary">
              Solicitar orçamento
            </Button>
            <Button
              href={buildWhatsAppUrl(contactInfo.salesPhoneRaw, "Olá! Gostaria de mais informações.")}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
