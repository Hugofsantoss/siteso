"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  Archive,
  ArchiveRestore,
  ArrowDown,
  ArrowUp,
  Copy,
  PencilLine,
  Trash2,
} from "lucide-react";
import {
  deleteObraAction,
  duplicateObraAction,
  moveObraAction,
  toggleArquivarObraAction,
} from "@/lib/obras/actions";

interface ObraRow {
  id: string;
  nome: string;
  codigoInterno: string;
  cidade: string;
  status: string;
  percentualExecucao: number;
  arquivada: boolean;
}

const actionButtonStyles =
  "p-2 text-stone-500 transition-colors hover:text-gold-600 disabled:cursor-not-allowed disabled:opacity-40";

export function ObraTable({ obras }: { obras: ObraRow[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, nome: string) {
    if (
      !window.confirm(
        `Excluir definitivamente a obra "${nome}"? Essa ação não pode ser desfeita.`,
      )
    ) {
      return;
    }
    startTransition(() => {
      deleteObraAction(id);
    });
  }

  if (obras.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhuma obra cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-stone-200 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50 text-xs tracking-wide text-stone-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Obra</th>
            <th className="px-4 py-3 font-medium">Código</th>
            <th className="px-4 py-3 font-medium">Cidade</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Execução</th>
            <th className="px-4 py-3 text-right font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id} className="border-b border-stone-100 last:border-0">
              <td className="px-4 py-3 font-medium text-graphite-900">
                {obra.nome}
                {obra.arquivada && (
                  <span className="ml-2 text-xs font-normal text-stone-400">(arquivada)</span>
                )}
              </td>
              <td className="px-4 py-3 text-stone-600">{obra.codigoInterno}</td>
              <td className="px-4 py-3 text-stone-600">{obra.cidade}</td>
              <td className="px-4 py-3 text-stone-600">{obra.status}</td>
              <td className="px-4 py-3 text-stone-600">{obra.percentualExecucao}%</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    title="Mover para cima"
                    aria-label="Mover para cima"
                    disabled={isPending}
                    onClick={() => startTransition(() => moveObraAction(obra.id, "up"))}
                    className={actionButtonStyles}
                  >
                    <ArrowUp size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    title="Mover para baixo"
                    aria-label="Mover para baixo"
                    disabled={isPending}
                    onClick={() => startTransition(() => moveObraAction(obra.id, "down"))}
                    className={actionButtonStyles}
                  >
                    <ArrowDown size={16} strokeWidth={1.5} />
                  </button>
                  <Link
                    href={`/admin/obras/${obra.id}`}
                    title="Ver / editar"
                    aria-label="Ver / editar"
                    className={actionButtonStyles}
                  >
                    <PencilLine size={16} strokeWidth={1.5} />
                  </Link>
                  <button
                    type="button"
                    title="Duplicar"
                    aria-label="Duplicar"
                    disabled={isPending}
                    onClick={() => startTransition(() => duplicateObraAction(obra.id))}
                    className={actionButtonStyles}
                  >
                    <Copy size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    title={obra.arquivada ? "Reativar" : "Arquivar"}
                    aria-label={obra.arquivada ? "Reativar" : "Arquivar"}
                    disabled={isPending}
                    onClick={() => startTransition(() => toggleArquivarObraAction(obra.id))}
                    className={actionButtonStyles}
                  >
                    {obra.arquivada ? (
                      <ArchiveRestore size={16} strokeWidth={1.5} />
                    ) : (
                      <Archive size={16} strokeWidth={1.5} />
                    )}
                  </button>
                  <button
                    type="button"
                    title="Excluir"
                    aria-label="Excluir"
                    disabled={isPending}
                    onClick={() => handleDelete(obra.id, obra.nome)}
                    className={`${actionButtonStyles} hover:text-red-600`}
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
