import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Sólido Construções Prediais em Belo Horizonte. Telefone, WhatsApp, email, endereço e formulário de contato.",
  alternates: { canonical: "/contato" },
};

const mapEmbedSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("Rua Aquiles Lobo, 446, Floresta, Belo Horizonte - MG, 30150-160") +
  "&output=embed";

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Contato"
        path="/contato"
        eyebrow="Fale conosco"
        title="Contato"
        description="Estamos prontos para conversar sobre o seu próximo empreendimento, construção ou revitalização de fachada."
      />

      <section className="py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-graphite-900">
                Envie uma mensagem
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Preencha o formulário abaixo — sua mensagem será enviada diretamente pelo
                WhatsApp da nossa equipe de vendas.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-graphite-900">
                  Informações
                </h2>
                <ul className="mt-6 flex flex-col gap-5 text-sm text-stone-600">
                  <li className="flex items-start gap-3">
                    <Phone size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <div>
                      <a href={`tel:+${contactInfo.phoneRaw}`} className="hover:text-gold-600">
                        {contactInfo.phoneDisplay}
                      </a>
                      <span className="block text-xs text-stone-400">Atendimento geral</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <div>
                      <a
                        href={`tel:+${contactInfo.salesPhoneRaw}`}
                        className="hover:text-gold-600"
                      >
                        {contactInfo.salesPhoneDisplay}
                      </a>
                      <span className="block text-xs text-stone-400">Vendas</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-600">
                      {contactInfo.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-600" />
                    <span>{contactInfo.address.full}</span>
                  </li>
                </ul>
              </div>

              <div className="aspect-[4/3] w-full overflow-hidden border border-stone-200">
                <iframe
                  src={mapEmbedSrc}
                  title="Localização da Sólido Construções Prediais no Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
