export interface Empreendimento {
  slug: string;
  nome: string;
  status: "Lançamento" | "Em Construção" | "Concluído";
  bairro?: string;
  cidade: string;
  tipo: "Residencial";
  image: string;
  imageAlt: string;
  isRender: boolean;
  linkOficial?: string;
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
