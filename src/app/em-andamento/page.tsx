import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ObraGridComFiltro } from "@/components/ui/ObraGridComFiltro";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { emConstrucao } from "@/data/empreendimentos";

export const metadata: Metadata = {
  title: "Em Andamento",
  description:
    "Acompanhe o andamento real das obras em construção da Sólido Construções Prediais em Belo Horizonte.",
  alternates: { canonical: "/em-andamento" },
};

export default function EmAndamentoPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Em Andamento"
        path="/em-andamento"
        eyebrow="Obras"
        title="Em Andamento"
        description="Acompanhe o progresso real de cada etapa das obras em construção da Sólido em Belo Horizonte."
      />

      <section className="py-section-lg">
        <Container>
          <SectionHeading
            eyebrow={`${emConstrucao.length} obras`}
            title="Construções em Execução"
            description="Percentual de execução por etapa, atualizado conforme o andamento real de cada obra."
          />
          <div className="mt-10">
            <ObraGridComFiltro items={emConstrucao} columns={4} />
          </div>
        </Container>
      </section>

      <CtaContato />
    </>
  );
}
