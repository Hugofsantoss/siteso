import type { Empreendimento } from "@/types";

/**
 * Fonte: solidoprediais.com.br (Novos Projetos + Construções). Todas as imagens de
 * fachada são renders 3D oficiais da construtora (não fotografias) — sinalizado via
 * `isRender` para exibir o selo "Imagem ilustrativa" na interface, conforme a
 * identidade real disponível no site oficial.
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
    image: "",
    imageAlt: "Render da fachada do Edifício Concept One",
    isRender: true,
  },
  {
    slug: "vila-congonhas",
    nome: "Edifício Vila Congonhas",
    status: "Em Construção",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "",
    imageAlt: "Render da fachada do Edifício Vila Congonhas",
    isRender: true,
  },
  {
    slug: "concept-ii",
    nome: "Edifício Concept II",
    status: "Em Construção",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "",
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
    image: "",
    imageAlt: "Render da fachada do Edifício Concept Savassi",
    isRender: true,
  },
];

export const portfolio: Empreendimento[] = [
  { slug: "edificio-bahia", nome: "Edifício Bahia", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Bahia", isRender: true },
  { slug: "edificio-bernardo-guimaraes", nome: "Edifício Bernardo Guimarães", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Bernardo Guimarães", isRender: true },
  { slug: "edificio-claudio-manoel", nome: "Edifício Cláudio Manoel", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Cláudio Manoel", isRender: true },
  { slug: "edificio-orion-b", nome: "Edifício Orion B.", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Orion B.", isRender: true },
  { slug: "edificio-becheleni", nome: "Edifício Becheleni", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Becheleni", isRender: true },
  { slug: "edificio-lavras-i", nome: "Edifício Lavras I", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Lavras I", isRender: true },
  { slug: "edificio-lavras-ii", nome: "Edifício Lavras II", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Lavras II", isRender: true },
  { slug: "edificio-scoralick-view", nome: "Edifício Scoralick View", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Scoralick View", isRender: true },
  { slug: "edificio-marilia-de-dirceu", nome: "Edifício Marília de Dirceu", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Marília de Dirceu", isRender: true },
  { slug: "edificio-sindagua", nome: "Edifício Sindágua", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Edifício Sindágua", isRender: true },
  { slug: "casa-branca", nome: "Casa Branca", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Casa Branca", isRender: true },
  { slug: "clube-albert-scharle", nome: "Clube Albert Scharlé", status: "Concluído", cidade: "Belo Horizonte", tipo: "Residencial", image: "", imageAlt: "Clube Albert Scharlé", isRender: true },
];
