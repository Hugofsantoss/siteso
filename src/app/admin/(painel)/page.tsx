import Link from "next/link";
import { Building2, Users } from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [totalObras, totalInvestidores, atualizacoesRecentes, obras] = await Promise.all([
    db.obra.count({ where: { arquivada: false } }),
    db.investidor.count({ where: { ativo: true } }),
    db.atualizacao.findMany({
      take: 5,
      orderBy: { data: "desc" },
      include: { obra: { select: { nome: true } } },
    }),
    db.obra.findMany({
      where: { arquivada: false },
      orderBy: { ordem: "asc" },
      select: { id: true, nome: true, status: true, percentualExecucao: true },
    }),
  ]);

  const stats = [
    { label: "Obras ativas", value: totalObras, icon: Building2, href: "/admin/obras" },
    { label: "Investidores", value: totalInvestidores, icon: Users, href: "/admin/investidores" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">Dashboard</h1>
        <p className="mt-1 text-sm text-stone-600">
          Visão geral das obras e investidores da Sólido.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex items-center gap-4 border border-stone-200 bg-white p-6 transition-colors hover:border-gold-500"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-graphite-900 text-gold-400">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-graphite-900">{stat.value}</p>
                <p className="text-sm text-stone-600">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-stone-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-graphite-900">Obras</h2>
          {obras.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">
              Nenhuma obra cadastrada ainda.{" "}
              <Link href="/admin/obras/nova" className="text-gold-600 underline">
                Cadastrar primeira obra
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-1">
              {obras.map((obra) => (
                <li key={obra.id}>
                  <Link
                    href={`/admin/obras/${obra.id}`}
                    className="flex items-center justify-between gap-3 border-b border-stone-100 py-3 text-sm transition-colors hover:text-gold-600"
                  >
                    <span className="font-medium text-graphite-900">{obra.nome}</span>
                    <span className="shrink-0 text-stone-500">
                      {obra.status} · {obra.percentualExecucao}%
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-stone-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-graphite-900">
            Últimas atualizações
          </h2>
          {atualizacoesRecentes.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">
              Nenhuma atualização publicada ainda.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-1">
              {atualizacoesRecentes.map((atualizacao) => (
                <li key={atualizacao.id} className="border-b border-stone-100 py-3 text-sm">
                  <p className="font-medium text-graphite-900">{atualizacao.titulo}</p>
                  <p className="text-stone-500">
                    {atualizacao.obra.nome} ·{" "}
                    {atualizacao.data.toLocaleDateString("pt-BR")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
