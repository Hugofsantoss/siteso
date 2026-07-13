import type { Servico } from "@/types";

export const servicos: Servico[] = [
  {
    slug: "construcao-de-edificios",
    titulo: "Construção de Edifícios",
    descricao:
      "Empreendimentos residenciais e prediais desenvolvidos com engenharia sólida, fachadas modernas e layouts inteligentes que otimizam espaço e rentabilidade.",
    descricaoLonga:
      "Experiência consolidada na construção de edificações residenciais e prediais, com compromisso constante com a qualidade — do projeto estrutural ao acabamento final, sempre em regiões estratégicas de Belo Horizonte.",
    image: "/images/servicos/construcao-de-edificios.jpg",
    imageAlt: "Render da fachada de um edifício residencial construído pela Sólido",
    isRender: true,
  },
  {
    slug: "construcao-de-casas",
    titulo: "Construção de Casas",
    descricao:
      "Construção de residências personalizadas, com acompanhamento próximo do cliente do projeto à entrega, dentro do prazo estabelecido.",
    descricaoLonga:
      "Construção de residências personalizadas, com atendimento próximo ao cliente em cada etapa — do projeto à entrega — sempre com atenção aos detalhes construtivos e ao prazo combinado.",
    image: "/images/servicos/construcao-de-casas.jpg",
    imageAlt: "Vista aérea de residência construída pela Sólido, projeto Casa Branca",
    isRender: false,
  },
  {
    slug: "revitalizacao-de-fachadas",
    titulo: "Revitalização de Fachadas",
    descricao:
      "Recuperação e modernização de fachadas prediais, unindo qualidade construtiva e valorização estética e patrimonial do imóvel.",
    descricaoLonga:
      "Recuperação e modernização de fachadas prediais, unindo qualidade construtiva e valorização estética e patrimonial do imóvel — com o mesmo padrão de qualidade aplicado às novas construções.",
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
