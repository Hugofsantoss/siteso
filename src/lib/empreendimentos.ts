import type { Empreendimento } from "@/types";

/**
 * Fonte: solidoprediais.com.br (Novos Projetos, Construções e Portfólio). As imagens de
 * fachada são renders 3D oficiais da construtora, exceto Casa Branca e Clube Albert
 * Scharlé, que possuem fotografia real (drone). `isRender` controla o selo "Imagem
 * ilustrativa" exibido na interface. Marília de Dirceu e Sindágua não possuem imagem
 * própria disponível no site oficial (galeria publicada incorretamente aponta para
 * outros empreendimentos) — mantidas sem imagem para não exibir conteúdo incorreto.
 */
export const lancamentos: Empreendimento[] = [
  {
    slug: "concept-funcionarios",
    nome: "Edifício Concept Funcionários",
    status: "Lançamento",
    bairro: "Funcionários",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/concept-funcionarios/fachada.jpg",
    imageAlt: "Render da fachada do Edifício Concept Funcionários",
    isRender: true,
    linkOficial: "https://solidoprediais.com.br/edificio-concept-funcionarios/",
  },
  {
    slug: "douro",
    nome: "Edifício D'Ouro",
    status: "Lançamento",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/douro/fachada.jpg",
    imageAlt: "Render da fachada do Edifício D'Ouro ao entardecer",
    isRender: true,
    linkOficial: "https://solidoprediais.com.br/edificio-douro/",
  },
];

export const emConstrucao: Empreendimento[] = [
  {
    slug: "concept-one",
    nome: "Edifício Concept One",
    status: "Em Construção",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/concept-one/fachada.jpg",
    imageAlt: "Render da fachada do Edifício Concept One",
    isRender: true,
  },
  {
    slug: "vila-congonhas",
    nome: "Edifício Vila Congonhas",
    status: "Em Construção",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/vila-congonhas/fachada.jpg",
    imageAlt: "Render da fachada do Edifício Vila Congonhas",
    isRender: true,
  },
  {
    slug: "concept-ii",
    nome: "Edifício Concept II",
    status: "Em Construção",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/concept-ii/fachada.jpg",
    imageAlt: "Render da fachada do Edifício Concept II",
    isRender: true,
  },
  {
    slug: "concept-savassi",
    nome: "Edifício Concept Savassi",
    status: "Em Construção",
    bairro: "Savassi",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/empreendimentos/concept-savassi/fachada.jpg",
    imageAlt: "Render da fachada do Edifício Concept Savassi ao entardecer",
    isRender: true,
  },
];

export const portfolio: Empreendimento[] = [
  { slug: "edificio-bahia", nome: "Edifício Bahia", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-bahia.jpg", imageAlt: "Render da fachada do Edifício Bahia", isRender: true },
  { slug: "edificio-bernardo-guimaraes", nome: "Edifício Bernardo Guimarães", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-bernardo-guimaraes.jpg", imageAlt: "Render da fachada do Edifício Bernardo Guimarães", isRender: true },
  { slug: "edificio-claudio-manoel", nome: "Edifício Cláudio Manoel", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-claudio-manoel.jpg", imageAlt: "Render da fachada do Edifício Cláudio Manoel", isRender: true },
  { slug: "edificio-orion-b", nome: "Edifício Orion B.", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-orion-b.jpg", imageAlt: "Render da fachada do Edifício Orion B.", isRender: true },
  { slug: "edificio-becheleni", nome: "Edifício Becheleni", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-becheleni.jpg", imageAlt: "Render da fachada do Edifício Becheleni", isRender: true },
  { slug: "edificio-lavras-i", nome: "Edifício Lavras I", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-lavras-i.jpg", imageAlt: "Render da fachada do Edifício Lavras I", isRender: true },
  { slug: "edificio-lavras-ii", nome: "Edifício Lavras II", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-lavras-ii.jpg", imageAlt: "Render da fachada do Edifício Lavras II", isRender: true },
  { slug: "edificio-scoralick-view", nome: "Edifício Scoralick View", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/edificio-scoralick-view.jpg", imageAlt: "Render da fachada do Edifício Scoralick View", isRender: true },
  { slug: "edificio-marilia-de-dirceu", nome: "Edifício Marília de Dirceu", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Marília de Dirceu", isRender: true },
  { slug: "edificio-sindagua", nome: "Edifício Sindágua", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Sindágua", isRender: true },
  { slug: "casa-branca", nome: "Casa Branca", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/casa-branca.jpg", imageAlt: "Vista aérea da residência Casa Branca", isRender: false },
  { slug: "clube-albert-scharle", nome: "Clube Albert Scharlé", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "/images/portfolio/clube-albert-scharle.jpg", imageAlt: "Vista aérea das quadras do Clube Albert Scharlé", isRender: false },
];

export const todosEmpreendimentos: Empreendimento[] = [
  ...lancamentos,
  ...emConstrucao,
  ...portfolio,
];

export function getEmpreendimentoBySlug(slug: string): Empreendimento | undefined {
  return todosEmpreendimentos.find((item) => item.slug === slug);
}
