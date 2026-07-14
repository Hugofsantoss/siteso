import type { Metadata } from "next";
import { ShieldCheck, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Área do Investidor",
  description:
    "Acesse o painel administrativo da Sólido ou acompanhe o andamento das suas obras como investidor.",
  alternates: { canonical: "/area-do-investidor" },
};

const opcoes = [
  {
    icon: ShieldCheck,
    titulo: "Administrador",
    descricao:
      "Acesso da equipe Sólido para gerenciar obras, investidores, mídias e atualizações.",
    href: "/admin/login",
    cta: "Entrar como Administrador",
  },
  {
    icon: Building2,
    titulo: "Investidor",
    descricao:
      "Acompanhe o andamento, fotos, documentos e atualizações das obras vinculadas à sua conta.",
    href: "/investidor/login",
    cta: "Entrar como Investidor",
  },
];

export default function AreaDoInvestidorPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Área do Investidor"
        path="/area-do-investidor"
        title="Área do Investidor"
        description="Um espaço dedicado para a equipe Sólido e para quem investe com a gente acompanhar cada etapa das obras."
      />

      <section className="py-section-lg">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            {opcoes.map((opcao) => {
              const Icon = opcao.icon;
              return (
                <div
                  key={opcao.href}
                  className="flex flex-col items-center gap-4 border border-stone-200 p-10 text-center transition-colors hover:border-gold-500"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-graphite-900 text-gold-400">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-xl font-semibold text-graphite-900">
                    {opcao.titulo}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-600">{opcao.descricao}</p>
                  <Button href={opcao.href} variant="primary" className="mt-2">
                    {opcao.cta}
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
