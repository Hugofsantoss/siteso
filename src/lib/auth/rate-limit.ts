import "server-only";

interface Tentativa {
  count: number;
  resetAt: number;
}

const MAX_TENTATIVAS = 5;
const JANELA_MS = 15 * 60 * 1000;

// Limitador em memória por instância de função serverless. Não é distribuído entre
// instâncias/regiões da Vercel (cada uma tem sua própria memória), então não é uma
// garantia absoluta contra brute-force em larga escala — mas eleva bastante o custo
// de tentativas automatizadas contra um mesmo email a partir de um mesmo IP, sem
// exigir infraestrutura nova (Redis/Upstash) ou migração de schema.
const tentativas = new Map<string, Tentativa>();

function limpar() {
  const agora = Date.now();
  for (const [chave, valor] of tentativas) {
    if (valor.resetAt < agora) tentativas.delete(chave);
  }
}

export function loginBloqueado(chave: string): boolean {
  limpar();
  const registro = tentativas.get(chave);
  if (!registro) return false;
  return registro.resetAt > Date.now() && registro.count >= MAX_TENTATIVAS;
}

export function registrarTentativaFalha(chave: string): void {
  const agora = Date.now();
  const registro = tentativas.get(chave);
  if (!registro || registro.resetAt < agora) {
    tentativas.set(chave, { count: 1, resetAt: agora + JANELA_MS });
    return;
  }
  registro.count += 1;
}

export function limparTentativas(chave: string): void {
  tentativas.delete(chave);
}
