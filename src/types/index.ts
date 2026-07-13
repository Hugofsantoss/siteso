export interface EtapaProgresso {
  etapa: string;
  percentual: number;
}

export interface ImagemGaleria {
  src: string;
  alt: string;
  tipo: "planta" | "interior" | "fachada";
  /** Rótulo de exibição (ex: "6º Nível", "Cozinha"). */
  label?: string;
}

export interface DetalheTecnico {
  label: string;
  valor: string;
}

export interface Tipologia {
  categoria: string;
  descricao: string;
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
  /** Texto real sobre a localização/entorno, extraído da página oficial do empreendimento. */
  localizacao?: string;
  /** Composição do edifício (pavimentos, unidades), extraída da página oficial. */
  composicao?: string;
  areaConstruida?: string;
  cliente?: string;
  progresso?: EtapaProgresso[];
  /** Imagem extra de destaque (usada nas páginas de listagem/spotlight). */
  galeria?: ImagemGaleria[];
  /** Galeria completa (fachada + plantas + interiores), usada na página de detalhe. */
  galeriaCompleta?: ImagemGaleria[];
  detalhesTecnicos?: DetalheTecnico[];
  tipologias?: Tipologia[];
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
