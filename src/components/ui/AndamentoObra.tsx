"use client";

import { motion } from "framer-motion";
import type { EtapaProgresso } from "@/types";

export function AndamentoObra({ progresso }: { progresso: EtapaProgresso[] }) {
  return (
    <div className="flex flex-col gap-5">
      {progresso.map((etapa, index) => (
        <div key={etapa.etapa}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-medium text-graphite-900">{etapa.etapa}</span>
            <span className="font-display text-sm font-semibold text-gold-600">
              {etapa.percentual}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${etapa.percentual}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gold-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
