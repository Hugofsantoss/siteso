import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ObraForm } from "@/components/admin/obras/ObraForm";
import { ObraDangerZone } from "@/components/admin/obras/ObraDangerZone";
import { updateObraAction } from "@/lib/obras/actions";

export const metadata: Metadata = {
  title: "Editar obra",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarObraPage({ params }: PageProps) {
  const { id } = await params;
  const obra = await db.obra.findUnique({ where: { id } });
  if (!obra) notFound();

  const action = updateObraAction.bind(null, obra.id);

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">{obra.nome}</h1>
        <p className="mt-1 text-sm text-stone-600">Código interno: {obra.codigoInterno}</p>
      </div>

      <ObraForm
        action={action}
        submitLabel="Salvar alterações"
        defaultValues={{
          nome: obra.nome,
          codigoInterno: obra.codigoInterno,
          endereco: obra.endereco ?? "",
          bairro: obra.bairro ?? "",
          cidade: obra.cidade,
          status: obra.status,
          descricao: obra.descricao ?? "",
          dataInicio: obra.dataInicio ? obra.dataInicio.toISOString() : "",
          previsaoEntrega: obra.previsaoEntrega ? obra.previsaoEntrega.toISOString() : "",
          percentualExecucao: obra.percentualExecucao,
          capaUrl: obra.capaPath ? `/api/arquivos/${obra.capaPath}` : null,
        }}
      />

      <ObraDangerZone obraId={obra.id} nome={obra.nome} />
    </div>
  );
}
