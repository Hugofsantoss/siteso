import type { Empreendimento } from "@/types";

/**
 * Fonte: solidoprediais.com.br (Novos Projetos, Construções e Portfólio). Textos de
 * localização/composição e percentuais de andamento são extraídos literalmente das
 * páginas oficiais de cada empreendimento. Imagens de fachada são renders 3D oficiais,
 * exceto Casa Branca e Clube Albert Scharlé (fotografia aérea real). `isRender` controla
 * o selo "Imagem ilustrativa". Imagens de "planta" são desenhos técnicos reais (não
 * renders); imagens de "interior" são renders 3D de unidade modelo.
 */
const interioresModelo: Empreendimento["galeriaCompleta"] = [
  { src: "/images/empreendimentos/interior-modelo/quarto.jpg", alt: "Render do quarto de unidade modelo", tipo: "interior", label: "Quarto" },
  { src: "/images/empreendimentos/interior-modelo/cozinha.jpg", alt: "Render da cozinha de unidade modelo", tipo: "interior", label: "Cozinha" },
  { src: "/images/empreendimentos/interior-modelo/sala-cozinha-1.jpg", alt: "Render da sala e cozinha de unidade modelo", tipo: "interior", label: "Sala e Cozinha" },
  { src: "/images/empreendimentos/interior-modelo/sala-cozinha-2.jpg", alt: "Render da sala e cozinha de unidade modelo, outro ângulo", tipo: "interior", label: "Sala e Cozinha" },
  { src: "/images/empreendimentos/interior-modelo/banho-social.jpg", alt: "Render do banheiro social de unidade modelo", tipo: "interior", label: "Banho Social" },
  { src: "/images/empreendimentos/interior-modelo/cobertura-suite.jpg", alt: "Render da suíte da cobertura", tipo: "interior", label: "Suíte (Cobertura)" },
  { src: "/images/empreendimentos/interior-modelo/banho-suite.jpg", alt: "Render do banheiro da suíte da cobertura", tipo: "interior", label: "Banho da Suíte (Cobertura)" },
  { src: "/images/empreendimentos/interior-modelo/cobertura-sala-cozinha-1.jpg", alt: "Render da sala e cozinha da cobertura", tipo: "interior", label: "Sala e Cozinha (Cobertura)" },
  { src: "/images/empreendimentos/interior-modelo/cobertura-sala-cozinha-2.jpg", alt: "Render da sala e cozinha da cobertura, outro ângulo", tipo: "interior", label: "Sala e Cozinha (Cobertura)" },
];

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
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao:
      "Edifício com 11 pavimentos, sendo um subsolo. 24 unidades sendo: 04 privativas, 18 tipos e 02 coberturas.",
    detalhesTecnicos: [
      { label: "Pavimentos", valor: "11, sendo um subsolo" },
      { label: "Total de Unidades", valor: "24" },
      { label: "Apartamentos com Área Privativa", valor: "04" },
      { label: "Apartamentos Tipo", valor: "18" },
      { label: "Coberturas", valor: "02" },
    ],
    tipologias: [
      { categoria: "Área Privativa", descricao: "01 ou 02 quartos, sala, cozinha, terraço e área de serviço externa. 1 vaga." },
      { categoria: "Apartamento Tipo", descricao: "01 ou 02 quartos, sala, cozinha, terraço e área de serviço interna. Alguns tipos possuem terraços/varandas pequenos. 1 vaga." },
      { categoria: "Cobertura", descricao: "02 suítes, sala, cozinha, lavabo, terraço e área de serviço externa. 1 vaga." },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/concept-funcionarios/plantas/6o-nivel.jpg",
        alt: "Planta do 6º nível do Edifício Concept Funcionários",
        tipo: "planta",
      },
    ],
    galeriaCompleta: [
      { src: "/images/empreendimentos/concept-funcionarios/fachada.jpg", alt: "Render da fachada do Edifício Concept Funcionários", tipo: "fachada", label: "Fachada" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/2o-nivel.jpg", alt: "Planta do 2º nível", tipo: "planta", label: "2º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/3o-4o-nivel.jpg", alt: "Planta do 3º e 4º nível", tipo: "planta", label: "3º e 4º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/5o-nivel.jpg", alt: "Planta do 5º nível", tipo: "planta", label: "5º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/6o-nivel.jpg", alt: "Planta do 6º nível", tipo: "planta", label: "6º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/7o-8o-nivel.jpg", alt: "Planta do 7º e 8º nível", tipo: "planta", label: "7º e 8º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/9o-nivel.jpg", alt: "Planta do 9º nível", tipo: "planta", label: "9º Nível" },
      { src: "/images/empreendimentos/concept-funcionarios/plantas/10o-nivel.jpg", alt: "Planta do 10º nível", tipo: "planta", label: "10º Nível" },
      ...interioresModelo,
    ],
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
    localizacao:
      "O Ed. D'Ouro edifício conta com excelente estrutura comercial local, rede bancária, escolar, shopping e fácil acesso ao centro da cidade.",
    composicao: "Edifício com 07 pavimentos, sendo um subsolo. 12 unidades sendo: 09 tipos e 03 coberturas.",
    detalhesTecnicos: [
      { label: "Pavimentos", valor: "07, sendo um subsolo" },
      { label: "Total de Unidades", valor: "12" },
      { label: "Apartamentos Tipo", valor: "09" },
      { label: "Coberturas", valor: "03" },
    ],
    tipologias: [
      { categoria: "Apartamentos Tipo — final 01", descricao: "01 suíte, varanda pequena, sala, cozinha e área de serviço interna." },
      { categoria: "Apartamentos Tipo — final 02", descricao: "01 suíte, 01 quarto, 01 banho social, sala, cozinha e área de serviço interna." },
      { categoria: "Apartamentos Tipo — final 03", descricao: "01 suíte, 01 quarto, 01 banho social, sala, cozinha, área de serviço interna (máquina de lavar) e varanda pequena com área para tanque." },
      { categoria: "Cobertura — final 01", descricao: "02 quartos." },
      { categoria: "Coberturas — final 02 e 03", descricao: "02 suítes." },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/douro/plantas/3o-nivel.jpg",
        alt: "Planta do 3º nível do Edifício D'Ouro",
        tipo: "planta",
      },
    ],
    galeriaCompleta: [
      { src: "/images/empreendimentos/douro/fachada.jpg", alt: "Render da fachada do Edifício D'Ouro ao entardecer", tipo: "fachada", label: "Fachada" },
      { src: "/images/empreendimentos/douro/plantas/0-subsolo.jpg", alt: "Planta do subsolo", tipo: "planta", label: "Subsolo" },
      { src: "/images/empreendimentos/douro/plantas/1o-nivel.jpg", alt: "Planta do 1º nível", tipo: "planta", label: "1º Nível" },
      { src: "/images/empreendimentos/douro/plantas/2o-nivel.jpg", alt: "Planta do 2º nível", tipo: "planta", label: "2º Nível" },
      { src: "/images/empreendimentos/douro/plantas/3o-nivel.jpg", alt: "Planta do 3º nível", tipo: "planta", label: "3º Nível" },
      { src: "/images/empreendimentos/douro/plantas/4o-nivel.jpg", alt: "Planta do 4º nível", tipo: "planta", label: "4º Nível" },
      { src: "/images/empreendimentos/douro/plantas/5o-nivel.jpg", alt: "Planta do 5º nível", tipo: "planta", label: "5º Nível" },
      { src: "/images/empreendimentos/douro/plantas/6o-nivel.jpg", alt: "Planta do 6º nível", tipo: "planta", label: "6º Nível" },
      ...interioresModelo,
    ],
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
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "Edifício com 09 pavimentos, 42 unidades sendo 07 privativas, 28 apartamentos tipos e 07 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 47 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/concept-one-interior.jpg",
        alt: "Render de interior de unidade do Edifício Concept One",
        tipo: "interior",
      },
    ],
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
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao:
      "Edifício com 07 pavimentos, 09 unidades sendo 02 privativas, 01 studio, 05 apartamentos tipos e 01 cobertura linear.",
    progresso: [{ etapa: "Fundação", percentual: 70 }],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/vila-congonhas-interior.jpg",
        alt: "Render de interior de unidade do Edifício Vila Congonhas",
        tipo: "interior",
      },
    ],
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
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "Edifício com 12 pavimentos, 01 loja e 22 unidades sendo 20 tipos com varanda e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 65 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/concept-ii-planta.jpg",
        alt: "Planta de nível do Edifício Concept II",
        tipo: "planta",
      },
    ],
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
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "Edifício com 12 pavimentos, 01 loja e 29 unidades sendo 01 privativa, 26 apartamentos tipos e 02 coberturas.",
    progresso: [{ etapa: "Fundação", percentual: 55 }],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/concept-savassi-planta.jpg",
        alt: "Planta de nível do Edifício Concept Savassi",
        tipo: "planta",
      },
    ],
  },
];

export const portfolio: Empreendimento[] = [
  {
    slug: "edificio-bahia",
    nome: "Edifício Bahia",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-bahia.jpg",
    imageAlt: "Render da fachada do Edifício Bahia",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "02 (duas) áreas privativas, 18 (dezoito) apartamentos tipo e 03 (três) coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      { src: "/images/empreendimentos/galeria/bahia-planta.jpg", alt: "Planta de nível do Edifício Bahia", tipo: "planta" },
    ],
  },
  {
    slug: "edificio-bernardo-guimaraes",
    nome: "Edifício Bernardo Guimarães",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-bernardo-guimaraes.jpg",
    imageAlt: "Render da fachada do Edifício Bernardo Guimarães",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "Edifício com 10 pavimentos, 21 unidades sendo 03 privativas, 15 apartamentos tipos e 03 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/bernardo-guimaraes-interior.jpg",
        alt: "Render de interior de unidade do Edifício Bernardo Guimarães",
        tipo: "interior",
      },
    ],
  },
  {
    slug: "edificio-claudio-manoel",
    nome: "Edifício Cláudio Manoel",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-claudio-manoel.jpg",
    imageAlt: "Render da fachada do Edifício Cláudio Manoel",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "Edifício com 08 pavimentos e 1 subsolo, 12 unidades sendo 02 privativas, 08 apartamentos tipos e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/claudio-manoel-planta.jpg",
        alt: "Planta de nível do Edifício Cláudio Manoel",
        tipo: "planta",
      },
    ],
  },
  {
    slug: "edificio-orion-b",
    nome: "Edifício Orion B.",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-orion-b.jpg",
    imageAlt: "Render da fachada do Edifício Orion B.",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao:
      "Edifício com 07 pavimentos, 10 unidades sendo 01 studio privativa, 01 área privativa, 06 apartamentos tipos e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/orion-b-interior.jpg",
        alt: "Render de interior de unidade do Edifício Orion B.",
        tipo: "interior",
      },
    ],
  },
  {
    slug: "edificio-becheleni",
    nome: "Edifício Becheleni",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-becheleni.jpg",
    imageAlt: "Render da fachada do Edifício Becheleni",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "Edifício com 06 pavimentos, 11 unidades sendo 03 privativas, 05 apartamentos tipos, 01 studio e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/becheleni-interior.jpg",
        alt: "Render de interior de unidade do Edifício Becheleni",
        tipo: "interior",
      },
    ],
  },
  {
    slug: "edificio-lavras-i",
    nome: "Edifício Lavras I",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-lavras-i.jpg",
    imageAlt: "Render da fachada do Edifício Lavras I",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "Edifício com 7 pavimentos, com 02 (duas) áreas privativas, 05 (cinco) apartamentos tipos e 02 (duas) coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/lavras-i-interior.jpg",
        alt: "Render de interior de unidade do Edifício Lavras I",
        tipo: "interior",
      },
    ],
  },
  {
    slug: "edificio-lavras-ii",
    nome: "Edifício Lavras II",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-lavras-ii.jpg",
    imageAlt: "Render da fachada do Edifício Lavras II",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "Edifício com 07 pavimentos e 1 subsolo, 10 unidades sendo 02 privativas, 06 apartamentos tipos e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/lavras-ii-planta.jpg",
        alt: "Planta de nível do Edifício Lavras II",
        tipo: "planta",
      },
    ],
  },
  {
    slug: "edificio-scoralick-view",
    nome: "Edifício Scoralick View",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-scoralick-view.jpg",
    imageAlt: "Render da fachada do Edifício Scoralick View",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "Edifício com 09 pavimentos e 1 subsolo, 12 unidades sendo 02 privativas, 08 apartamentos tipos e 02 coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 80 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/scoralick-planta.jpg",
        alt: "Planta de nível do Edifício Scoralick View",
        tipo: "planta",
      },
    ],
  },
  {
    slug: "edificio-marilia-de-dirceu",
    nome: "Edifício Marília de Dirceu",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Residencial",
    image: "/images/portfolio/edificio-marilia-de-dirceu.jpg",
    imageAlt: "Render da fachada do Edifício Marília de Dirceu",
    isRender: true,
    localizacao:
      "Localizado em excelente ponto residencial, contando com uma boa estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade de Belo Horizonte.",
    composicao: "02 (duas) áreas privativas, 12 (doze) apartamentos tipos e 02 (duas) coberturas.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      {
        src: "/images/empreendimentos/galeria/marilia-planta.jpg",
        alt: "Planta de nível do Edifício Marília de Dirceu",
        tipo: "planta",
      },
    ],
  },
  {
    slug: "edificio-sindagua",
    nome: "Edifício Sindágua",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Comercial",
    image: "/images/portfolio/edificio-sindagua.jpg",
    imageAlt: "Render da fachada do Edifício Sindágua",
    isRender: true,
    cliente: "Sindicato dos Trabalhadores nas Indústrias de Purificação e Distribuição de Água e em Serviços de Esgotos do Estado de Minas Gerais",
    localizacao: "Localizado em excelente ponto com uma ótima estrutura de comércio local, rede bancária, hospitalar, escolas, e fácil acesso ao centro da cidade.",
    composicao: "Edifício comercial para atender o Sindicato dos Trabalhadores nas Indústrias de Purificação e Distribuição de Água e em Serviços de Esgotos do Estado de Minas Gerais.",
    galeria: [
      {
        src: "/images/empreendimentos/galeria/sindagua-planta.jpg",
        alt: "Planta de nível do Edifício Sindágua",
        tipo: "planta",
      },
    ],
  },
  {
    slug: "casa-branca",
    nome: "Casa Branca",
    status: "Concluído",
    cidade: "Brumadinho",
    tipo: "Residencial",
    image: "/images/portfolio/casa-branca.jpg",
    imageAlt: "Vista aérea da residência Casa Branca",
    isRender: false,
    areaConstruida: "427,40 m²",
    localizacao:
      "Residência de alto padrão construída em Brumadinho, com 427,40m² de área construída distribuídos em 02 pavimentos, desenvolvida para proporcionar sofisticação, conforto e integração entre os ambientes.",
    composicao:
      "04 suítes amplas, salas de estar e jantar integradas, cozinha funcional, área de serviço, espaço gourmet completo, piscina e sauna.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      { src: "/images/empreendimentos/galeria/casa-branca-extra.jpg", alt: "Vista aérea da residência Casa Branca", tipo: "fachada" },
    ],
  },
  {
    slug: "clube-albert-scharle",
    nome: "Clube Albert Scharlé",
    status: "Concluído",
    cidade: "Belo Horizonte",
    tipo: "Esportivo",
    image: "/images/portfolio/clube-albert-scharle.jpg",
    imageAlt: "Vista aérea das quadras do Clube Albert Scharlé",
    isRender: false,
    composicao: "Construção de 03 quadras de beach tennis, com atenção aos detalhes, funcionalidade, durabilidade e excelência nos acabamentos.",
    progresso: [
      { etapa: "Fundação", percentual: 100 },
      { etapa: "Alvenaria", percentual: 100 },
      { etapa: "Acabamento", percentual: 100 },
    ],
    galeria: [
      { src: "/images/empreendimentos/galeria/albert-scharle-extra.jpg", alt: "Quadras do Clube Albert Scharlé", tipo: "fachada" },
    ],
  },
];

export const todosEmpreendimentos: Empreendimento[] = [
  ...lancamentos,
  ...emConstrucao,
  ...portfolio,
];

export function getEmpreendimentoBySlug(slug: string): Empreendimento | undefined {
  return todosEmpreendimentos.find((item) => item.slug === slug);
}
