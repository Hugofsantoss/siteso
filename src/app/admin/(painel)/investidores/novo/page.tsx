import type { Metadata } from "next";
import { db } from "@/lib/db";
import { InvestidorForm } from "@/components/admin/investidores/InvestidorForm";
import { createInvestidorAction } from "@/lib/investidores/actions";

export const metadata: Metadata = {
  title: "Novo investidor",
  robots: { index: false, follow: false },
};

export default async function NovoInvestidorPage() {
  const obrasDisponiveis = await db.obra.findMany({
    where: { arquivada: false },
    orderBy: { ordem: "asc" },
    select: { id: true, nome: true, codigoInterno: true },
  });

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">
          Novo investidor
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Cadastre um investidor e vincule as obras às quais ele terá acesso.
        </p>
      </div>
      <InvestidorForm
        action={createInvestidorAction}
        obrasDisponiveis={obrasDisponiveis}
        submitLabel="Cadastrar investidor"
      />
    </div>
  );
}
