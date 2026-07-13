export const siteConfig = {
  name: "Sólido Construções Prediais",
  shortName: "Sólido",
  legalName: "Sólido Construções Prediais LTDA",
  cnpj: "42.225.079/0001-07",
  tagline: "Edifícios sinônimo de qualidade",
  description:
    "Construtora consolidada em Belo Horizonte, especializada em construção de edifícios, casas e revitalização de fachadas.",
  url: "https://solidoprediais.com.br",
  locale: "pt_BR",
  instagram: "https://www.instagram.com/solidoprediais",
} as const;

export const contactInfo = {
  phoneDisplay: "(31) 97366-9449",
  phoneRaw: "5531973669449",
  salesPhoneDisplay: "(31) 99704-7021",
  salesPhoneRaw: "5531997047021",
  email: "sac@solidoprediais.com.br",
  address: {
    street: "Rua Aquiles Lobo, 446",
    neighborhood: "Floresta",
    city: "Belo Horizonte",
    state: "MG",
    zip: "30150-160",
    full: "Rua Aquiles Lobo, 446 - Floresta, Belo Horizonte - MG, CEP 30150-160",
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Aquiles+Lobo+446+Floresta+Belo+Horizonte+MG",
} as const;

export function buildWhatsAppUrl(phone: string, message?: string) {
  const base = `https://api.whatsapp.com/send?phone=${phone}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}

export const obrasLinks = [
  { label: "Portfólio", href: "/portfolio" },
  { label: "Em Andamento", href: "/em-andamento" },
  { label: "Lançamentos", href: "/lancamentos" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Obras", children: obrasLinks },
  { label: "Contato", href: "/contato" },
] as const;
