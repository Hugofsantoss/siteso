"use client";

import Link from "next/link";
import { useTransition } from "react";
import { PencilLine, Power, PowerOff, Trash2 } from "lucide-react";
import { deleteInvestidorAction, toggleAtivoInvestidorAction } from "@/lib/investidores/actions";

interface InvestidorRow {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  totalObras: number;
}

const actionButtonStyles =
  "p-2 text-stone-500 transition-colors hover:text-gold-600 disabled:cursor-not-allowed disabled:opacity-40";

export function InvestidorTable({ investidores }: { investidores: InvestidorRow[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, nome: string) {
    if (
      !window.confirm(
        `Excluir definitivamente o investidor "${nome}"? Essa ação não pode ser desfeita.`,
      )
    ) {
      return;
    }
    startTransition(() => {
      deleteInvestidorAction(id);
    });
  }

  if (investidores.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhum investidor cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-stone-200 bg-white">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50 text-xs tracking-wide text-stone-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Nome</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Obras vinculadas</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {investidores.map((investidor) => (
            <tr key={investidor.id} className="border-b border-stone-100 last:border-0">
              <td className="px-4 py-3 font-medium text-graphite-900">{investidor.nome}</td>
              <td className="px-4 py-3 text-stone-600">{investidor.email}</td>
              <td className="px-4 py-3 text-stone-600">{investidor.totalObras}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    investidor.ativo
                      ? "bg-institutional-green/10 text-institutional-green"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {investidor.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/investidores/${investidor.id}`}
                    title="Ver / editar"
                    aria-label="Ver / editar"
                    className={actionButtonStyles}
                  >
                    <PencilLine size={16} strokeWidth={1.5} />
                  </Link>
                  <button
                    type="button"
                    title={investidor.ativo ? "Desativar" : "Ativar"}
                    aria-label={investidor.ativo ? "Desativar" : "Ativar"}
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => toggleAtivoInvestidorAction(investidor.id))
                    }
                    className={actionButtonStyles}
                  >
                    {investidor.ativo ? (
                      <PowerOff size={16} strokeWidth={1.5} />
                    ) : (
                      <Power size={16} strokeWidth={1.5} />
                    )}
                  </button>
                  <button
                    type="button"
                    title="Excluir"
                    aria-label="Excluir"
                    disabled={isPending}
                    onClick={() => handleDelete(investidor.id, investidor.nome)}
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
