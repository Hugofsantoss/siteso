import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin, Ruler, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IllustrativeBadge } from "@/components/ui/IllustrativeBadge";
import { AndamentoObra } from "@/components/ui/AndamentoObra";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaContato } from "@/sections/CtaContato";
import { todosEmpreendimentos, getEmpreendimentoBySlug } from "@/data/empreendimentos";
import { buildWhatsAppUrl, contactInfo } from "@/lib/site-config";

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
    isRender,
    linkOficial,
    localizacao,
    composicao,
    areaConstruida,
    cliente,
    progresso,
    galeria,
  } = empreendimento;
  const voltarPorStatus = {
    "Concluído": { href: "/portfolio", label: "Voltar ao Portfólio" },
    "Em Construção": { href: "/em-andamento", label: "Voltar a Em Andamento" },
    "Lançamento": { href: "/lancamentos", label: "Voltar a Lançamentos" },
  } as const;
  const { href: voltarHref, label: voltarLabel } = voltarPorStatus[status];

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

          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            <div className="md:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 768px) 66vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    {isRender && <IllustrativeBadge className="absolute right-4 top-4" />}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-stone-600">
                    Imagem em breve
                  </div>
                )}
              </div>

              {galeria && galeria.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {galeria.map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-cover"
                      />
                      {img.tipo === "interior" && (
                        <IllustrativeBadge className="absolute right-3 top-3" />
                      )}
                    </div>
                  ))}
                </div>
              )}

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

              <div className="mt-8 flex flex-col gap-3">
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

                {linkOficial && (
                  <a
                    href={linkOficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-stone-600 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
                  >
                    Ver ficha completa no site oficial
                    <ExternalLink size={14} strokeWidth={1.5} />
                  </a>
                )}
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

      <CtaContato />
    </>
  );
}
