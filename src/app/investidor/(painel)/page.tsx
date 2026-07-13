import type { Metadata } from "next";
import Link from "next/link";
import { getInvestidorObras } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Minhas Obras",
  robots: { index: false, follow: false },
};

function formatDate(date: Date | null) {
  if (!date) return null;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function InvestidorDashboardPage() {
  const obras = await getInvestidorObras();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">Minhas Obras</h1>
        <p className="mt-1 text-sm text-stone-600">
          Acompanhe o andamento das obras vinculadas à sua conta.
        </p>
      </div>

      {obras.length === 0 ? (
        <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center text-sm text-stone-600">
          Nenhuma obra vinculada à sua conta ainda. Entre em contato com a Sólido caso acredite
          que isso seja um engano.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {obras.map((obra) => (
            <Link
              key={obra.id}
              href={`/investidor/obras/${obra.id}`}
              className="group flex flex-col overflow-hidden border border-stone-200 bg-white transition-colors hover:border-gold-500"
            >
              <div className="relative h-40 w-full bg-stone-100">
                {obra.capaPath ? (
                  // eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão
                  <img
                    src={`/api/arquivos/${obra.capaPath}`}
                    alt={obra.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                    Sem imagem
                  </div>
                )}
                <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-graphite-900">
                  {obra.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <p className="font-display text-lg font-semibold text-graphite-900 group-hover:text-gold-600">
                    {obra.nome}
                  </p>
                  <p className="text-sm text-stone-500">
                    {[obra.bairro, obra.cidade].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Execução</span>
                    <span className="font-medium text-graphite-900">
                      {obra.percentualExecucao}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-full bg-gold-500"
                      style={{ width: `${obra.percentualExecucao}%` }}
                    />
                  </div>
                </div>
                {obra.previsaoEntrega && (
                  <p className="mt-auto text-xs text-stone-500">
                    Previsão de entrega: {formatDate(obra.previsaoEntrega)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
