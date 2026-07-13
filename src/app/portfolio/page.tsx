import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ObraGridComFiltro } from "@/components/ui/ObraGridComFiltro";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { portfolio } from "@/data/empreendimentos";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Obras concluídas pela Sólido Construções Prediais em Belo Horizonte: edifícios residenciais e casas entregues.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Portfólio"
        path="/portfolio"
        eyebrow="Obras concluídas"
        title="Portfólio"
        description="Empreendimentos entregues pela Sólido Construções Prediais em Belo Horizonte."
      />

      <section className="py-section-lg">
        <Container>
          <SectionHeading eyebrow={`${portfolio.length} obras`} title="Empreendimentos Entregues" />
          <div className="mt-10">
            <ObraGridComFiltro items={portfolio} columns={3} />
          </div>
        </Container>
      </section>

      <CtaContato />
    </>
  );
}
