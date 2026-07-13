export interface EtapaProgresso {
  etapa: string;
  percentual: number;
}

export interface ImagemGaleria {
  src: string;
  alt: string;
  tipo: "planta" | "interior" | "fachada";
}

export interface Empreendimento {
  slug: string;
  nome: string;
  status: "Lançamento" | "Em Construção" | "Concluído";
  bairro?: string;
  cidade: string;
  tipo: "Residencial" | "Comercial" | "Esportivo";
  image: string;
  imageAlt: string;
  isRender: boolean;
  linkOficial?: string;
  /** Texto real sobre a localização/entorno, extraído da página oficial do empreendimento. */
  localizacao?: string;
  /** Composição do edifício (pavimentos, unidades), extraída da página oficial. */
  composicao?: string;
  areaConstruida?: string;
  cliente?: string;
  progresso?: EtapaProgresso[];
  galeria?: ImagemGaleria[];
}

export interface Servico {
  slug: string;
  titulo: string;
  descricao: string;
  descricaoLonga?: string;
  image?: string;
  imageAlt?: string;
  isRender?: boolean;
}
