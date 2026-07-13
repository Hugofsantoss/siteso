# TASKS.md

# Backlog do Projeto

Projeto:
Site Institucional — Sólido Construções Prediais

Status:
🚧 Em Desenvolvimento

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
🟡 Em andamento (Home validada; demais páginas pendentes conforme forem criadas)

Testar (Home — sem overflow horizontal em nenhum breakpoint):

☑ 1920px

☑ 1440px

☑ 1366px

☑ 1024px

☑ 768px

☑ 430px

☑ 414px

☑ 390px

☑ 375px

☑ 360px

☑ 320px

Corrigir:

☑ textos (Home)

☑ botões (Home)

☑ imagens (Home)

☑ cards (Home)

☐ menu (mobile nav ok na Home; revalidar quando todas as páginas existirem)

☐ footer

---

## Performance

Status:
⬜ Pendente

Objetivo:

Google Lighthouse

Performance > 90

SEO > 95

Accessibility > 95

Best Practices > 95

---

## SEO

Status:
⬜ Pendente

Implementar:

☐ Meta Title

☐ Meta Description

☐ Open Graph

☐ Twitter Card

☐ Canonical

☐ Robots

☐ Sitemap

☐ Schema.org

☐ Breadcrumb

☐ Alt em imagens

---

## Acessibilidade

Status:
⬜ Pendente

Implementar:

☐ Contraste

☐ Navegação por teclado

☐ ARIA

☐ Labels

☐ Focus

☐ Screen Readers

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

## Empreendimentos

Status:
✅ Concluído

Adicionar:

- [x] Cards modernos (EmpreendimentoCard, badge de status + selo "Imagem ilustrativa" quando aplicável)
- [x] Página individual (`/empreendimentos/[slug]`, 18 páginas via generateStaticParams)
- [ ] Galeria — apenas 1 imagem por empreendimento no momento; galeria multi-foto fica para melhoria futura quando houver mais material oficial
- [x] Localização (bairro/cidade reais)
- [x] Informações reais (2 lançamentos + 4 em construção reais; link "Ver ficha completa no site oficial" quando disponível)

---

## Portfólio

Status:
✅ Concluído

Melhorar:

- [x] Fotografias — 10 das 12 obras com render/foto oficial real; 2 (Marília de Dirceu, Sindágua) sem imagem própria disponível na fonte oficial (galeria da fonte aponta para outros empreendimentos por erro de cadastro do site original) — exibem "Imagem em breve" em vez de foto incorreta
- [x] Organização (grid 3 colunas, mesma página individual das demais)
- [x] Layout
- [ ] Filtros — avaliado e descartado por ora: todas as 12 obras são do mesmo tipo/status, sem ganho real de UX; reavaliar se o portfólio crescer

---

## Contato

Status:
⬜ Pendente

Verificar:

☐ WhatsApp

☐ Email

☐ Telefone

☐ Google Maps

☐ Formulário

☐ Mensagens de sucesso

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
⬜ Pendente

Verificar todas.

Corrigir:

☐ baixa resolução

☐ pixelização

☐ proporção

☐ imagens quebradas

☐ 404

Converter para:

☐ WebP

quando possível.

---

# Qualidade

Status:
⬜ Pendente

Verificar:

☐ Links quebrados

☐ Console

☐ Warnings

☐ Imports

☐ Código morto

☐ CSS duplicado

☐ JS duplicado

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

☐ Integração com WhatsApp

☐ Formulário com envio por API

☐ Chat online

☐ Google Analytics

☐ Google Tag Manager

☐ Meta Pixel

☐ LGPD

☐ Política de Privacidade

☐ Termos de Uso

☐ Página 404 personalizada

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