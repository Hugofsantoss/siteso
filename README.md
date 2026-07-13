# Sólido Construções Prediais — Site Institucional

Site institucional da Sólido Construções Prediais, construtora de Belo Horizonte. Next.js 16 (App Router), TypeScript e Tailwind CSS v4.

Documentação do projeto: [CLAUDE.md](./CLAUDE.md), [PROJECT.md](./PROJECT.md), [DESIGN.md](./DESIGN.md), [RULES.md](./RULES.md), [TASKS.md](./TASKS.md).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — serve o build de produção
- `npm run lint` — ESLint

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons · React Hook Form + Zod

## Estrutura

```
src/
  app/            rotas (App Router)
  components/
    ui/           componentes base reutilizáveis
    layout/       Header, Footer, MobileNav, PageHeader
  sections/       blocos de página (Hero, Diferenciais, CtaContato, ...)
  data/           dados institucionais (empreendimentos, serviços) — única fonte de verdade
  lib/            utilitários e configuração (contato, schema de formulário)
  hooks/          hooks React customizados
  types/          tipos TypeScript compartilhados
  assets/         imagens otimizadas via import estático (ex: logo)
public/
  images/         imagens servidas por caminho direto (hero, empreendimentos, portfólio, galeria)
```

## Dados de empreendimentos

Todos os dados de obras (`src/data/empreendimentos.ts`) são extraídos literalmente do site oficial (localização, composição, andamento por etapa, área construída). Nenhum dado é inventado — campos sem informação oficial disponível (ano de início/conclusão, tecnologias, vídeos) ficam de fora do modelo até que a informação seja fornecida, em vez de exibir texto genérico.
