"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IllustrativeBadge } from "@/components/ui/IllustrativeBadge";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-graphite-900">
      <Image
        src="/images/hero/douro-fachada.jpg"
        alt="Fachada do Edifício D'Ouro, um dos empreendimentos da Sólido Construções Prediais em Belo Horizonte"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

      <div className="absolute right-5 top-24 z-10 md:right-10">
        <IllustrativeBadge />
      </div>

      <Container className="relative z-10 pb-24 pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium tracking-[0.25em] text-gold-400 uppercase">
            {siteConfig.name}
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            {siteConfig.tagline}.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-200 md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contato" variant="primary">
              Solicitar orçamento
            </Button>
            <Button href="/empreendimentos" variant="ghost">
              Conheça nossos empreendimentos
            </Button>
          </div>
        </motion.div>
      </Container>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-white/70" size={28} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
