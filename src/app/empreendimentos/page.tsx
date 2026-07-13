import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmpreendimentoCard } from "@/components/ui/EmpreendimentoCard";
import { ObraGridComFiltro } from "@/components/ui/ObraGridComFiltro";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { lancamentos, emConstrucao } from "@/data/empreendimentos";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Conheça os lançamentos e as obras em andamento da Sólido Construções Prediais em Belo Horizonte.",
  alternates: { canonical: "/empreendimentos" },
};

export default function EmpreendimentosPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Empreendimentos"
        path="/empreendimentos"
        eyebrow="Novos Projetos"
        title="Empreendimentos"
        description="Lançamentos e obras em andamento da Sólido em Belo Horizonte."
      />

      <section className="py-section-lg">
        <Container>
          <SectionHeading eyebrow="Lançamentos" title="Novos Projetos" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {lancamentos.map((empreendimento) => (
              <EmpreendimentoCard key={empreendimento.slug} empreendimento={empreendimento} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stone-50 py-section-lg">
        <Container>
          <SectionHeading
            eyebrow="Em andamento"
            title="Obras em Construção"
            description="Acompanhe o andamento real de cada etapa da obra."
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
