import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Ruler, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AndamentoObra } from "@/components/ui/AndamentoObra";
import { Galeria } from "@/components/ui/Galeria";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { todosEmpreendimentos, getEmpreendimentoBySlug } from "@/data/empreendimentos";
import { diferenciais } from "@/data/servicos";
import { buildWhatsAppUrl, contactInfo } from "@/lib/site-config";
import type { ImagemGaleria } from "@/types";

export function generateStaticParams() {
  return todosEmpreendimentos.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const empreendimento = getEmpreendimentoBySlug(slug);
  if (!empreendimento) return {};

  const description = `${empreendimento.nome} — ${empreendimento.status} da Sólido Construções Prediais em ${empreendimento.bairro ? `${empreendimento.bairro}, ` : ""}${empreendimento.cidade}.`;

  return {
    title: empreendimento.nome,
    description,
    alternates: { canonical: `/empreendimentos/${slug}` },
    openGraph: empreendimento.image
      ? {
          title: empreendimento.nome,
          description,
          images: [{ url: empreendimento.image, alt: empreendimento.imageAlt }],
        }
      : undefined,
  };
}

export default async function EmpreendimentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const empreendimento = getEmpreendimentoBySlug(slug);

  if (!empreendimento) {
    notFound();
  }

  const {
    nome,
    status,
    bairro,
    cidade,
    tipo,
    image,
    imageAlt,
    localizacao,
    composicao,
    areaConstruida,
    cliente,
    progresso,
    galeria,
    galeriaCompleta,
    detalhesTecnicos,
    tipologias,
  } = empreendimento;

  const voltarPorStatus = {
    "Concluído": { href: "/portfolio", label: "Voltar ao Portfólio" },
    "Em Construção": { href: "/em-andamento", label: "Voltar a Em Andamento" },
    "Lançamento": { href: "/lancamentos", label: "Voltar a Lançamentos" },
  } as const;
  const { href: voltarHref, label: voltarLabel } = voltarPorStatus[status];

  const todasImagens: ImagemGaleria[] =
    galeriaCompleta ??
    (image
      ? [{ src: image, alt: imageAlt, tipo: "fachada" as const }, ...(galeria ?? [])]
      : (galeria ?? []));
  const plantas = todasImagens.filter((img) => img.tipo === "planta");

  return (
    <>
      <PageHeader
        breadcrumb={nome}
        path={`/empreendimentos/${slug}`}
        eyebrow={status}
        title={nome}
        description={bairro ? `${bairro}, ${cidade}` : cidade}
      />

      <section className="py-section-lg">
        <Container>
          <Link
            href={voltarHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-gold-600"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            {voltarLabel}
          </Link>

          {/* Visão Geral */}
          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            <div className="md:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                {image ? (
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-stone-600">
                    Imagem em breve
                  </div>
                )}
              </div>

              {(localizacao || composicao) && (
                <div className="mt-8 flex flex-col gap-4">
                  {localizacao && (
                    <p className="text-sm leading-relaxed text-stone-600">{localizacao}</p>
                  )}
                  {composicao && (
                    <p className="text-sm leading-relaxed text-stone-600">{composicao}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <span className="inline-block rounded-sm bg-graphite-900 px-3 py-1 text-xs font-medium tracking-wide text-white">
                {status}
              </span>

              <div className="mt-6 flex flex-col gap-3 text-sm text-stone-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                  <span>
                    {bairro ? `${bairro}, ${cidade}` : cidade} · {tipo}
                  </span>
                </div>
                {areaConstruida && (
                  <div className="flex items-start gap-2.5">
                    <Ruler size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <span>{areaConstruida} de área construída</span>
                  </div>
                )}
                {cliente && (
                  <div className="flex items-start gap-2.5">
                    <Users size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <span>{cliente}</span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Button
                  href={buildWhatsAppUrl(
                    contactInfo.salesPhoneRaw,
                    `Olá! Tenho interesse no ${nome}.`,
                  )}
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar sobre este imóvel
                </Button>
              </div>

              {progresso && progresso.length > 0 && (
                <div className="mt-10 border-t border-stone-200 pt-8">
                  <h2 className="font-display text-lg font-semibold text-graphite-900">
                    Andamento da Obra
                  </h2>
                  <div className="mt-6">
                    <AndamentoObra progresso={progresso} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Diferenciais (lançamentos) */}
      {status === "Lançamento" && (
        <section className="bg-graphite-900 py-section-lg">
          <Container>
            <SectionHeading eyebrow="Por que este empreendimento" title="Diferenciais" tone="dark" />
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {diferenciais.map((item) => (
                <li key={item.titulo} className="border-t border-white/15 pt-5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.titulo}</p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-400">{item.descricao}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Detalhes Técnicos */}
      {((detalhesTecnicos && detalhesTecnicos.length > 0) || (tipologias && tipologias.length > 0)) && (
        <section className="py-section-lg">
          <Container>
            <SectionHeading eyebrow="Ficha técnica" title="Detalhes do Empreendimento" />

            {detalhesTecnicos && detalhesTecnicos.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
                {detalhesTecnicos.map((item) => (
                  <div key={item.label} className="border-t border-stone-200 pt-4">
                    <dt className="text-xs text-stone-500">{item.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-graphite-900">
                      {item.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {tipologias && tipologias.length > 0 && (
              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                {tipologias.map((item) => (
                  <div key={item.categoria} className="border border-stone-200 p-6">
                    <h3 className="font-display text-base font-semibold text-graphite-900">
                      {item.categoria}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Plantas */}
      {plantas.length > 0 && (
        <section className="bg-stone-50 py-section-lg">
          <Container>
            <SectionHeading
              eyebrow="Projetos"
              title="Plantas"
              description="Plantas técnicas reais do empreendimento, organizadas por nível. Clique para ampliar."
            />
            <div className="mt-10">
              <Galeria images={plantas} showFilter={false} />
            </div>
          </Container>
        </section>
      )}

      {/* Galeria completa */}
      {todasImagens.length > 1 && (
        <section className="py-section-lg">
          <Container>
            <SectionHeading
              eyebrow="Imagens"
              title="Galeria"
              description="Fachada, ambientes e plantas do empreendimento."
            />
            <div className="mt-10">
              <Galeria images={todasImagens} />
            </div>
          </Container>
        </section>
      )}

      <CtaContato />
    </>
  );
}
