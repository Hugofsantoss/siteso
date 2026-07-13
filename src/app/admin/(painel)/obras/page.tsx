import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { ObraTable } from "@/components/admin/obras/ObraTable";

export const metadata: Metadata = {
  title: "Obras",
  robots: { index: false, follow: false },
};

export default async function AdminObrasPage() {
  const obras = await db.obra.findMany({
    orderBy: [{ arquivada: "asc" }, { ordem: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      nome: true,
      codigoInterno: true,
      cidade: true,
      status: true,
      percentualExecucao: true,
      arquivada: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-graphite-900">Obras</h1>
          <p className="mt-1 text-sm text-stone-600">
            Gerencie as obras cadastradas no sistema.
          </p>
        </div>
        <Link
          href="/admin/obras/nova"
          className="inline-flex items-center justify-center gap-2 self-start rounded-sm bg-graphite-900 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
        >
          <Plus size={16} strokeWidth={2} />
          Nova obra
        </Link>
      </div>

      <ObraTable obras={obras} />
    </div>
  );
}
