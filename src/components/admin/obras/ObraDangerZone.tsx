"use client";

import { useTransition } from "react";
import { deleteObraAction } from "@/lib/obras/actions";

export function ObraDangerZone({ obraId, nome }: { obraId: string; nome: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Excluir definitivamente a obra "${nome}"? Essa ação não pode ser desfeita e removerá todos os dados vinculados.`,
      )
    ) {
      return;
    }
    startTransition(() => {
      deleteObraAction(obraId);
    });
  }

  return (
    <div className="border border-red-200 bg-red-50 p-6">
      <p className="font-display text-lg font-semibold text-red-800">Zona de risco</p>
      <p className="mt-1 text-sm text-red-700">
        Excluir esta obra é permanente e remove todos os dados vinculados (mídias, documentos,
        atualizações, vínculos com investidores).
      </p>
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="mt-4 rounded-sm border border-red-300 bg-white px-5 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Excluindo..." : "Excluir obra"}
      </button>
    </div>
  );
}
