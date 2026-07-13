import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ObraTabs } from "@/components/admin/obras/ObraTabs";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ObraDetailLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  const obra = await db.obra.findUnique({
    where: { id },
    select: { id: true, nome: true, codigoInterno: true },
  });
  if (!obra) notFound();

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">{obra.nome}</h1>
        <p className="mt-1 text-sm text-stone-600">Código interno: {obra.codigoInterno}</p>
      </div>
      <ObraTabs obraId={obra.id} />
      {children}
    </div>
  );
}
