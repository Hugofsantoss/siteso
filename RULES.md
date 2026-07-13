# RULES.md

# Regras de Desenvolvimento

Projeto:
Sólido Construções Prediais

Estas regras devem ser seguidas em TODAS as alterações do projeto.

Nunca ignore este documento.

---

# Regra Principal

Sempre preserve a qualidade do projeto.

Toda alteração deve deixar o site melhor do que estava.

Nunca implemente algo que diminua:

- Performance
- UX
- SEO
- Responsividade
- Legibilidade
- Organização

---

# Antes de Codar

Sempre execute mentalmente este processo:

1. Ler CLAUDE.md

2. Ler PROJECT.md

3. Ler DESIGN.md

4. Ler TASKS.md

5. Ler RULES.md

6. Analisar o projeto

7. Planejar

8. Implementar

9. Testar

10. Validar

11. Commit

---

# Organização

Nunca criar arquivos desnecessários.

Nunca duplicar componentes.

Nunca duplicar CSS.

Nunca duplicar JavaScript.

Sempre reutilizar código.

---

# Estrutura

Manter organização.

Exemplo:

src/

components/

sections/

assets/

images/

icons/

fonts/

styles/

utils/

hooks/

pages/

Nunca misturar responsabilidades.

---

# HTML

Sempre utilizar HTML semântico.

Preferir:

header

nav

main

section

article

footer

button

figure

picture

Nunca utilizar div quando existir elemento semântico.

---

# CSS

Sempre organizar.

Evitar:

!important

CSS duplicado

Seletores gigantes

Especificidade exagerada

Preferir:

Flexbox

Grid

Variables

Clamp()

Min()

Max()

Container Queries quando possível.

---

# JavaScript

Sempre:

Código modular.

Funções pequenas.

Nomes claros.

Nunca utilizar código repetido.

Nunca deixar console.log.

Nunca deixar código comentado.

---

# Performance

Sempre verificar:

Lazy Loading

Compressão

Minificação

Cache

Font Loading

WebP

AVIF

Nunca carregar recursos desnecessários.

---

# Imagens

Todas as imagens devem:

Ser reais.

Alta resolução.

Excelente enquadramento.

Compressão otimizada.

Nunca utilizar imagens:

pixelizadas

esticadas

borradas

IA evidente

marca d'água

---

# Responsividade

Obrigatório testar:

1920px

1440px

1366px

1024px

768px

430px

414px

390px

375px

360px

320px

Nenhum elemento pode:

quebrar

sobrepor

sair da tela

---

# Tipografia

Sempre respeitar o Design System.

Nunca utilizar fontes diferentes sem necessidade.

Hierarquia obrigatória:

H1

H2

H3

H4

Texto

Legenda

---

# Espaçamentos

Utilizar escala consistente.

Preferência:

8

16

24

32

48

64

96

Nunca criar valores aleatórios.

---

# Componentes

Cada componente deve possuir responsabilidade única.

Componentes grandes devem ser divididos.

Nunca criar componentes gigantes.

---

# Botões

Sempre possuir:

Hover

Focus

Active

Disabled

Estados consistentes.

---

# Formulários

Todos os campos devem possuir:

Label

Placeholder

Validação

Mensagem de erro

Feedback de sucesso

Nunca utilizar apenas placeholder.

---

# SEO

Toda página deve possuir:

Title

Meta Description

Open Graph

Canonical

Heading Hierarchy

Alt

Schema.org quando necessário.

---

# Acessibilidade

Sempre verificar:

Contraste

ARIA

Focus

Teclado

Screen Readers

Alt

Labels

---

# UX

Sempre pensar:

O usuário entende isso?

Está fácil?

Existe excesso de informação?

O CTA está claro?

---

# Conteúdo

Nunca inventar.

Nunca criar:

dados

estatísticas

clientes

avaliações

empreendimentos

serviços

Utilizar apenas informações verificáveis.

---

# Código Morto

Nunca deixar:

Imports não utilizados.

Variáveis não utilizadas.

Funções mortas.

CSS morto.

Arquivos abandonados.

---

# Console

Nunca entregar:

Erros

Warnings importantes

404

500

---

# Git

Sempre criar commits pequenos.

Exemplos:

feat: adiciona seção de empreendimentos

fix: corrige imagens quebradas

style: melhora tipografia

perf: otimiza carregamento

docs: atualiza documentação

refactor: reorganiza componentes

Nunca criar commits gigantes.

---

# Testes

Antes de concluir:

✓ Abrir todas as páginas.

✓ Testar todos os botões.

✓ Testar formulários.

✓ Testar links.

✓ Testar menu.

✓ Testar mobile.

✓ Testar desktop.

✓ Verificar Console.

✓ Verificar Network.

✓ Verificar Lighthouse.

---

# Definition of Done

Uma tarefa só está pronta quando:

✓ Código limpo

✓ Responsivo

✓ Performance preservada

✓ SEO preservado

✓ Acessibilidade preservada

✓ Sem erros

✓ Sem links quebrados

✓ Sem imagens quebradas

✓ Commit realizado

✓ TASKS.md atualizado

---

# Comportamento Esperado

Nunca faça alterações apenas para cumprir a solicitação.

Sempre pense como um Desenvolvedor Sênior.

Questione soluções ruins.

Escolha a alternativa mais elegante.

Prefira simplicidade.

Prefira manutenção fácil.

Prefira performance.

Prefira acessibilidade.

Prefira código reutilizável.

---

# Qualidade Visual

Sempre compare visualmente a alteração com o restante do site.

Se a nova implementação parecer destoar do projeto:

Refatore até atingir consistência.

---

# Regra Final

Toda alteração deve deixar o projeto mais profissional.

Se existir dúvida entre duas soluções, escolha aquela que:

• gera melhor experiência para o usuário;
• é mais fácil de manter;
• melhora a performance;
• segue os padrões modernos da web;
• respeita as informações oficiais da empresa;
• mantém consistência visual e técnica em todo o projeto.

Nunca considere uma tarefa concluída apenas porque ela funciona. Ela também deve ser elegante, consistente, acessível e preparada para evolução futura.