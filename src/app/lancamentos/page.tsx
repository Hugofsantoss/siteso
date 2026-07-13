import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LancamentoSpotlight } from "@/components/ui/LancamentoSpotlight";
import { CtaContato } from "@/sections/CtaContato";
import { lancamentos } from "@/data/empreendimentos";

export const metadata: Metadata = {
  title: "Lançamentos",
  description:
    "Conheça os lançamentos da Sólido Construções Prediais em Belo Horizonte: novos empreendimentos residenciais.",
  alternates: { canonical: "/lancamentos" },
};

export default function LancamentosPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Lançamentos"
        path="/lancamentos"
        eyebrow="Obras"
        title="Lançamentos"
        description="Novos empreendimentos da Sólido em Belo Horizonte, do projeto ao lançamento."
      />

      {lancamentos.map((empreendimento, index) => (
        <LancamentoSpotlight
          key={empreendimento.slug}
          empreendimento={empreendimento}
          reverse={index % 2 === 1}
        />
      ))}

      <CtaContato />
    </>
  );
}
