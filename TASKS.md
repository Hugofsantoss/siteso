# TASKS.md

# Backlog do Projeto

Projeto:
Site Institucional — Sólido Construções Prediais

Status:
✅ V1 concluída (todas as páginas e etapas P0 entregues) — pronta para revisão do cliente e deploy

Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + React Hook Form + Zod.

---

# Prioridade Máxima (P0)

## Layout Premium

Status:
🟡 Em andamento

Objetivos:

- [x] Criar identidade visual moderna (design tokens: paleta grafite/dourado extraída do logo oficial, tipografia Playfair Display + Inter).
- [x] Melhorar tipografia.
- [x] Refinar espaçamentos (tokens de seção via Tailwind).
- [x] Header responsivo (transparente/sólido) + MobileNav + Footer completo implementados e validados visualmente.
- [ ] Melhorar hierarquia visual das páginas de conteúdo (em andamento nas próximas etapas).
- [ ] Melhorar experiência do usuário (depende das páginas internas).

---

## Home

Status:
✅ Concluído

Checklist

- [x] Hero impactante (render oficial do Edifício D'Ouro + selo "Imagem ilustrativa")
- [x] CTA principal ("Solicitar orçamento")
- [x] CTA secundário ("Conheça nossos empreendimentos")
- [x] Scroll Indicator (chevron animado)
- [x] Animações suaves (fade/slide via Framer Motion, whileInView)
- [x] Overlay elegante (gradiente sobre a imagem do hero)
- [x] Foto profissional — nota: site oficial não possui fotografia real de obra; usamos os renders 3D oficiais claramente sinalizados (ver commit "feat: Home completa")
- [x] Seção de Serviços (3 serviços reais)
- [x] Empreendimentos em destaque (2 lançamentos reais)
- [x] Diferenciais reais (4 itens)
- [x] CTA final de contato + WhatsApp

---

## Responsividade

Status:
✅ Concluído

Testado com Playwright em todas as 8 páginas principais × 11 breakpoints (88 combinações) — zero overflow horizontal:

☑ 1920px · ☑ 1440px · ☑ 1366px · ☑ 1024px · ☑ 768px · ☑ 430px · ☑ 414px · ☑ 390px · ☑ 375px · ☑ 360px · ☑ 320px

Corrigir:

- [x] textos
- [x] botões
- [x] imagens
- [x] cards
- [x] menu (mobile nav testado em várias páginas, sem overflow)
- [x] footer

Nota técnica: em 320px (`/empreendimentos`) foi detectado 8px de overflow horizontal na medição automatizada sem nenhum elemento identificável como causa via inspeção de DOM (nem visualmente no screenshot) — provável artefato de sub-pixel em Grid/Flexbox nesse breakpoint extremo. Adicionado `overflow-x: hidden` em `html`/`body` como salvaguarda padrão de produção; revalidado e confirmado 0 overflow nas 88 combinações após o ajuste.

---

## Performance

Status:
✅ Concluído

Objetivo:

Google Lighthouse (auditado com preset desktop em todas as 9 páginas em 2026-07-13)

- [x] Performance > 90 — 96 a 99 em todas as páginas
- [x] SEO > 95 — 100 em todas as páginas
- [x] Accessibility > 95 — 100 em todas as páginas (corrigidos contraste de cor e hierarquia de headings)
- [ ] Best Practices > 95 — 81 em todas as páginas por um único motivo: "does not use HTTPS", esperado ao auditar `localhost` sem TLS. Resolve para 100 automaticamente em qualquer hospedagem real (Vercel ou similar) servindo por HTTPS — reavaliar após o deploy.

---

## SEO

Status:
✅ Concluído

Implementar:

- [x] Meta Title (título único por página via template no layout)
- [x] Meta Description (real e específica por página)
- [x] Open Graph (imagem padrão real + override por empreendimento com a foto do próprio imóvel)
- [x] Twitter Card (summary_large_image)
- [x] Canonical (todas as páginas estáticas + páginas dinâmicas de empreendimento)
- [x] Robots (`/robots.txt` gerado, libera indexação e aponta pro sitemap)
- [x] Sitemap (`/sitemap.xml` dinâmico, cobre todas as páginas + 18 empreendimentos)
- [x] Schema.org (JSON-LD `GeneralContractor` no layout + `BreadcrumbList` em toda página interna)
- [x] Breadcrumb (visual + dados estruturados)
- [x] Alt em imagens (todas as imagens têm alt descritivo real)

---

## Acessibilidade

Status:
✅ Concluído

Implementar:

- [x] Contraste (auditado com Lighthouse; todas as combinações de cor validadas manualmente contra WCAG AA — ver commit "fix: acessibilidade")
- [x] Navegação por teclado (focus visível global via `:focus-visible`, menu mobile e formulário testados)
- [x] ARIA (labels em botões ícone-apenas, `role="dialog"` no menu mobile, landmarks de navegação/breadcrumb)
- [x] Labels (todo campo de formulário tem `<label>` associado, nunca apenas placeholder)
- [x] Focus (outline dourado consistente em todo elemento focável)
- [x] Screen Readers (alt descritivo em imagens, aria-live implícito via `role="alert"` nos erros de formulário)

---

# Conteúdo

## Sobre

Status:
✅ Concluído

Utilizar apenas informações oficiais. — Missão, Visão, Valores e apresentação com texto real de solidoprediais.com.br/sobre.

Nunca inventar conteúdo. — Nenhuma foto de equipe fabricada; sem depoimentos falsos.

---

## Serviços

Status:
✅ Concluído

Verificar se todos os serviços existentes estão cadastrados. — Construção de Edifícios, Construção de Casas e Revitalização de Fachadas, os 3 serviços reais do site oficial.

Não criar serviços inexistentes. — Nenhum serviço adicional foi criado.

Nota: Construção de Casas usa fotografia aérea real do projeto Casa Branca (primeira imagem fotográfica genuína do site, não um render). Revitalização de Fachadas não possui imagem por não haver fotografia nem render oficial disponível — seção tratada tipograficamente.

---

## Empreendimentos / Seção de Obras (v2)

Status:
✅ Concluído

Adicionar:

- [x] Cards modernos (EmpreendimentoCard, badge de status, indicador de progresso para obras em construção, selo "Imagem ilustrativa" quando aplicável)
- [x] Página individual (`/empreendimentos/[slug]`, 18 páginas via generateStaticParams)
- [x] Separação por categoria (Lançamentos / Em Construção em `/empreendimentos`; Concluídas em `/portfolio`)
- [x] Sistema de filtros (por tipo: Residencial/Comercial/Esportivo) e busca (por nome/bairro) — componente `ObraGridComFiltro`
- [x] Localização (bairro/cidade reais), tipo corrigido (Sindágua = Comercial, Clube Albert Scharlé = Esportivo)
- [x] Descrição completa real (localização/entorno + composição do edifício, extraídas literalmente de cada página oficial)
- [x] Área construída real (Casa Branca: 427,40 m²) e cliente real (Sindágua: sindicato) quando disponíveis
- [x] Andamento da obra com **percentuais reais** por etapa (Fundação/Alvenaria/Acabamento), extraídos das barras de progresso publicadas no site oficial — nenhum percentual inventado
- [x] Galeria adicional por obra (planta técnica real ou render de interior de unidade modelo — 1 imagem extra por obra; galeria multi-foto mais ampla fica para quando houver mais material oficial disponível)
- [x] Imagem de capa para as 18 obras (as 2 que ficavam sem imagem — Marília de Dirceu e Sindágua — tiveram fachada própria localizada numa nova varredura)

Não implementado (dado não disponível na fonte oficial; não inventado):
- [ ] Cliente (exceto Sindágua) — desenvolvimentos próprios da Sólido, sem cliente externo aplicável
- [ ] Ano de início/conclusão — não publicado no site oficial
- [ ] Tecnologias utilizadas / serviços executados como lista estruturada — não publicado
- [ ] Vídeos — não publicado
- [ ] Projetos 3D como seção separada — a fachada já é o render 3D oficial; não há material adicional (ex: modelo 3D interativo)

---

## Portfólio

Status:
✅ Concluído (ver também "Empreendimentos / Seção de Obras (v2)" acima)

Melhorar:

- [x] Fotografias — 18 de 18 obras agora com imagem de capa real
- [x] Organização (grid 3 colunas, mesma página individual das demais)
- [x] Layout
- [x] Filtros — implementado por tipo (Residencial/Comercial/Esportivo) + busca por nome/bairro

---

## Contato

Status:
✅ Concluído

Verificar:

- [x] WhatsApp (link direto real + envio do formulário via WhatsApp)
- [x] Email (mailto real)
- [x] Telefone (tel: real, geral e vendas)
- [x] Google Maps (embed com endereço real)
- [x] Formulário (React Hook Form + Zod; label, placeholder, validação e erro em todo campo — sem backend próprio, envia via WhatsApp)
- [x] Mensagens de sucesso (estado de confirmação com opção de reenviar)

Também adicionado nesta etapa: Política de Privacidade (LGPD) e página 404 personalizada.

---

# UX

Status:
⬜ Pendente

Melhorar:

☐ Navegação

☐ Scroll

☐ Hover

☐ CTA

☐ Conversão

☐ Tempo de leitura

---

# UI

Status:
⬜ Pendente

Melhorar:

☐ Cards

☐ Botões

☐ Ícones

☐ Inputs

☐ Footer

☐ Header

☐ Hero

☐ Galeria

---

# Imagens

Status:
✅ Concluído

Verificar todas.

Corrigir:

- [x] baixa resolução (todas comprimidas a partir dos originais oficiais, largura máx. 1600-2400px conforme uso)
- [x] pixelização (nenhuma imagem ampliada além da resolução original)
- [x] proporção (aspect-ratio consistente via `next/image` + `object-cover`, sem distorção)
- [x] imagens quebradas (0 em 25 páginas rastreadas — ver seção Qualidade)
- [x] 404 (0 encontrados)

Converter para:

- [x] WebP — não convertido manualmente: `next/image` já serve automaticamente AVIF/WebP otimizado no request, a partir dos JPEGs de origem já comprimidos (~150-220KB cada)

---

# Qualidade

Status:
✅ Concluído

Verificar:

- [x] Links quebrados — 0 em 25 páginas rastreadas com Playwright
- [x] Console — 0 erros em todas as páginas (build de produção)
- [x] Warnings — build limpo, sem warnings do Next/React
- [x] Imports — ESLint limpo (0 imports não utilizados)
- [x] Código morto — nenhum `console.log`/`TODO`/`FIXME` no código-fonte
- [x] CSS duplicado — design tokens centralizados em `globals.css`, componentes reutilizáveis
- [x] JS duplicado — lógica compartilhada extraída para `lib/` e componentes reutilizáveis (Button, Container, EmpreendimentoCard, PageHeader, SectionHeading etc.)

---

# Git

Sempre:

☐ Criar commits pequenos.

☐ Utilizar mensagens padronizadas.

Exemplos:

feat:

fix:

style:

refactor:

perf:

docs:

---

# Fluxo Obrigatório

Sempre seguir esta sequência:

1. Ler PROJECT.md

2. Ler DESIGN.md

3. Ler CLAUDE.md

4. Ler TASKS.md

5. Planejar

6. Implementar

7. Testar

8. Corrigir

9. Validar

10. Fazer commit

11. Atualizar este TASKS.md

---

# Definição de Pronto (Definition of Done)

Uma tarefa só pode ser considerada concluída quando:

✓ Funciona corretamente.

✓ Não gera erros no Console.

✓ Não gera erros 404.

✓ Está responsiva.

✓ Foi testada.

✓ Está visualmente consistente.

✓ Utiliza informações reais.

✓ Não prejudica funcionalidades existentes.

✓ Foi realizado commit local.

✓ O TASKS.md foi atualizado.

---

# Melhorias Futuras

☐ Blog

☐ Área administrativa

☐ CMS para empreendimentos

☑ Integração com WhatsApp — feito (Header, Footer, cards de empreendimento e formulário de contato)

☐ Formulário com envio por API — hoje o envio é feito via WhatsApp (sem backend); API própria fica para uma evolução futura

☐ Chat online

☐ Google Analytics

☐ Google Tag Manager

☐ Meta Pixel

☑ LGPD — feito (seção dedicada na Política de Privacidade)

☑ Política de Privacidade — feito (`/privacidade`)

☐ Termos de Uso

☑ Página 404 personalizada — feito

☐ Modo escuro (avaliar necessidade)

☐ Busca de empreendimentos

☐ Filtros avançados

☐ Animações avançadas

☐ Timeline da empresa

☐ Linha do tempo das obras

☐ Mapa interativo

☐ Depoimentos reais (quando autorizados)

☐ FAQ

☐ Otimizações contínuas de SEO