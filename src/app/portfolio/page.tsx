import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmpreendimentoCard } from "@/components/ui/EmpreendimentoCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { portfolio } from "@/lib/empreendimentos";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Obras concluídas pela Sólido Construções Prediais em Belo Horizonte: edifícios residenciais e casas entregues.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Portfólio"
        eyebrow="Obras concluídas"
        title="Portfólio"
        description="Empreendimentos entregues pela Sólido Construções Prediais em Belo Horizonte."
      />

      <section className="py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {portfolio.map((empreendimento) => (
              <EmpreendimentoCard key={empreendimento.slug} empreendimento={empreendimento} />
            ))}
          </div>
        </Container>
      </section>

      <CtaContato />
    </>
  );
}
