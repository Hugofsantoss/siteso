import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { InvestidorForm } from "@/components/admin/investidores/InvestidorForm";
import { InvestidorDangerZone } from "@/components/admin/investidores/InvestidorDangerZone";
import { updateInvestidorAction } from "@/lib/investidores/actions";

export const metadata: Metadata = {
  title: "Editar investidor",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarInvestidorPage({ params }: PageProps) {
  const { id } = await params;

  const [investidor, obrasDisponiveis] = await Promise.all([
    db.investidor.findUnique({
      where: { id },
      include: { obras: { select: { obraId: true } } },
    }),
    db.obra.findMany({
      where: { arquivada: false },
      orderBy: { ordem: "asc" },
      select: { id: true, nome: true, codigoInterno: true },
    }),
  ]);

  if (!investidor) notFound();

  const action = updateInvestidorAction.bind(null, investidor.id);

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">
          {investidor.nome}
        </h1>
        <p className="mt-1 text-sm text-stone-600">{investidor.email}</p>
      </div>

      <InvestidorForm
        action={action}
        obrasDisponiveis={obrasDisponiveis}
        submitLabel="Salvar alterações"
        isEdit
        defaultValues={{
          nome: investidor.nome,
          email: investidor.email,
          telefone: investidor.telefone ?? "",
          documento: investidor.documento ?? "",
          obraIds: investidor.obras.map((vinculo) => vinculo.obraId),
        }}
      />

      <InvestidorDangerZone investidorId={investidor.id} nome={investidor.nome} />
    </div>
  );
}
