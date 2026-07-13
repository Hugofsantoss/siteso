import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicoDetail } from "@/sections/ServicoDetail";
import { CtaContato } from "@/sections/CtaContato";
import { servicos } from "@/lib/servicos";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Construção de edifícios, construção de casas e revitalização de fachadas em Belo Horizonte, com a Sólido Construções Prediais.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Serviços"
        path="/servicos"
        eyebrow="O que fazemos"
        title="Nossos Serviços"
        description="Da fundação ao acabamento, atuamos em cada etapa da construção com engenharia sólida e atenção aos detalhes."
      />

      {servicos.map((servico, index) => (
        <ServicoDetail
          key={servico.slug}
          servico={servico}
          reverse={index % 2 === 1}
          tone={index === servicos.length - 1 ? "dark" : "light"}
        />
      ))}

      <CtaContato />
    </>
  );
}
