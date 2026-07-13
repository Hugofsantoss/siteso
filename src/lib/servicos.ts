import type { Servico } from "@/types";

export const servicos: Servico[] = [
  {
    slug: "construcao-de-edificios",
    titulo: "Construção de Edifícios",
    descricao:
      "Empreendimentos residenciais e prediais desenvolvidos com engenharia sólida, fachadas modernas e layouts inteligentes que otimizam espaço e rentabilidade.",
  },
  {
    slug: "construcao-de-casas",
    titulo: "Construção de Casas",
    descricao:
      "Construção de residências personalizadas, com acompanhamento próximo do cliente do projeto à entrega, dentro do prazo estabelecido.",
  },
  {
    slug: "revitalizacao-de-fachadas",
    titulo: "Revitalização de Fachadas",
    descricao:
      "Recuperação e modernização de fachadas prediais, unindo qualidade construtiva e valorização estética e patrimonial do imóvel.",
  },
];

export const diferenciais = [
  {
    titulo: "Obras Rápidas",
    descricao: "Execução ágil, sem abrir mão da qualidade em cada etapa da construção.",
  },
  {
    titulo: "Alta Rentabilidade",
    descricao: "Empreendimentos pensados para valorização e retorno seguro do investimento.",
  },
  {
    titulo: "Melhores Localizações",
    descricao: "Terrenos selecionados em regiões estratégicas de Belo Horizonte.",
  },
  {
    titulo: "Qualidade dos Acabamentos",
    descricao: "Atenção aos detalhes construtivos do subsolo à cobertura.",
  },
] as const;
