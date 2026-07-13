import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { InvestidorTable } from "@/components/admin/investidores/InvestidorTable";

export const metadata: Metadata = {
  title: "Investidores",
  robots: { index: false, follow: false },
};

export default async function AdminInvestidoresPage() {
  const investidoresRaw = await db.investidor.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nome: true,
      email: true,
      ativo: true,
      _count: { select: { obras: true } },
    },
  });

  const investidores = investidoresRaw.map((investidor) => ({
    id: investidor.id,
    nome: investidor.nome,
    email: investidor.email,
    ativo: investidor.ativo,
    totalObras: investidor._count.obras,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-graphite-900">
            Investidores
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Gerencie os investidores com acesso ao painel.
          </p>
        </div>
        <Link
          href="/admin/investidores/novo"
          className="inline-flex items-center justify-center gap-2 self-start rounded-sm bg-graphite-900 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
        >
          <Plus size={16} strokeWidth={2} />
          Novo investidor
        </Link>
      </div>

      <InvestidorTable investidores={investidores} />
    </div>
  );
}
