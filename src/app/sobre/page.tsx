import type { Metadata } from "next";
import { Compass, HeartHandshake, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHeader } from "@/components/layout/PageHeader";
import { Diferenciais } from "@/sections/Diferenciais";
import { CtaContato } from "@/sections/CtaContato";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Sólido Construções Prediais: missão, visão e valores de uma construtora consolidada em Belo Horizonte.",
};

const pilares = [
  {
    icon: Target,
    titulo: "Missão",
    texto:
      "Desenvolver empreendimentos imobiliários com fachadas modernas e layouts inteligentes que otimizem espaços e garantam rentabilidade, com atendimento personalizado e entrega dentro dos prazos estabelecidos em regiões estratégicas de Belo Horizonte.",
  },
  {
    icon: Compass,
    titulo: "Visão",
    texto:
      "Ser reconhecida como uma construtora visionária e referência no mercado de Belo Horizonte, destacando-se pela inovação, agilidade e excelência na execução de obras prediais.",
  },
  {
    icon: HeartHandshake,
    titulo: "Valores",
    texto:
      "Confiança, transparência, agilidade e compromisso com qualidade. Trabalho em equipe, escuta ativa de clientes e colaboradores, responsabilidade e estratégia em cada etapa da execução.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        breadcrumb="Sobre"
        eyebrow="Institucional"
        title="Sobre a Sólido"
        description={siteConfig.tagline + "."}
      />

      <section className="py-section-lg">
        <Container>
          <SectionHeading
            eyebrow="Quem somos"
            title="Uma construtora consolidada em Belo Horizonte"
            description="A Sólido Construções Prediais é reconhecida pela segurança e confiança que oferece a seus investidores, com obras rápidas e transparentes, entregando empreendimentos modernos em localizações estratégicas."
          />
        </Container>
      </section>

      <section className="bg-stone-50 py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <div key={pilar.titulo} className="border border-stone-200 bg-white p-8">
                  <Icon size={32} strokeWidth={1.25} className="text-gold-600" />
                  <h2 className="mt-6 font-display text-xl font-semibold text-graphite-900">
                    {pilar.titulo}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{pilar.texto}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Diferenciais />
      <CtaContato />
    </>
  );
}
