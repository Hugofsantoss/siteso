import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { contactInfo, navLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite-900 text-stone-300">
      <Container className="grid grid-cols-1 gap-12 py-20 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-1">
          <p className="font-display text-2xl font-semibold text-white">Sólido</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">{siteConfig.tagline}</p>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="@solidoprediais no Instagram"
            className="mt-6 inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-gold-400"
          >
            <InstagramIcon size={18} />
            @solidoprediais
          </a>
        </div>

        <div>
          <h2 className="text-xs font-medium tracking-[0.15em] text-stone-400 uppercase">
            Navegação
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-300 transition-colors hover:text-gold-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium tracking-[0.15em] text-stone-400 uppercase">
            Contato
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-stone-300">
            <li className="flex items-start gap-2.5">
              <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-400" />
              <a href={`tel:+${contactInfo.phoneRaw}`} className="hover:text-gold-400">
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-400" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-400">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-400" />
              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400"
              >
                {contactInfo.address.full}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium tracking-[0.15em] text-stone-400 uppercase">
            Institucional
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link
                href="/privacidade"
                className="text-sm text-stone-300 transition-colors hover:text-gold-400"
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-stone-400 md:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <p>CNPJ {siteConfig.cnpj}</p>
        </Container>
      </div>
    </footer>
  );
}
