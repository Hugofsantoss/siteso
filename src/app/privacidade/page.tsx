import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { contactInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da Sólido Construções Prediais.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        breadcrumb="Política de Privacidade"
        path="/privacidade"
        title="Política de Privacidade"
      />

      <section className="py-section-lg">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-10 text-sm leading-relaxed text-stone-600">
            <p>
              Esta Política de Privacidade descreve como a {siteConfig.legalName} (CNPJ{" "}
              {siteConfig.cnpj}) trata as informações de visitantes deste site.
            </p>

            <div>
              <h2 className="font-display text-xl font-semibold text-graphite-900">
                1. Dados coletados
              </h2>
              <p className="mt-3">
                Coletamos apenas os dados que você nos fornece voluntariamente ao preencher o
                formulário de contato: nome, email, telefone, assunto e mensagem. Este site não
                utiliza cookies próprios de rastreamento nem mantém banco de dados de visitantes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-graphite-900">
                2. Como usamos seus dados
              </h2>
              <p className="mt-3">
                Ao enviar o formulário de contato, os dados preenchidos são utilizados
                exclusivamente para gerar uma mensagem pré-formatada, encaminhada ao WhatsApp da
                nossa equipe de vendas para que possamos responder ao seu contato. Não
                armazenamos essas informações em servidores próprios.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-graphite-900">
                3. Serviços de terceiros
              </h2>
              <p className="mt-3">
                Este site incorpora um mapa do Google Maps e links para o WhatsApp e Instagram.
                Esses serviços possuem suas próprias políticas de privacidade e podem coletar
                dados de uso conforme os termos de cada provedor.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-graphite-900">
                4. Seus direitos (LGPD)
              </h2>
              <p className="mt-3">
                Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode
                solicitar informações sobre eventuais dados que tenha nos enviado, bem como sua
                correção ou exclusão, entrando em contato pelo email{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-graphite-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-600"
                >
                  {contactInfo.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-graphite-900">
                5. Contato
              </h2>
              <p className="mt-3">
                Dúvidas sobre esta política podem ser enviadas para{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-graphite-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-600"
                >
                  {contactInfo.email}
                </a>{" "}
                ou pelo telefone {contactInfo.phoneDisplay}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
