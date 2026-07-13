"use client";

import { useTransition } from "react";
import { FileText, Trash2 } from "lucide-react";
import { deleteDocumentoAction } from "@/lib/documentos/actions";

export interface DocumentoItem {
  id: string;
  titulo: string;
  categoria: string;
  permiteDownload: boolean;
  url: string;
}

export function DocumentoList({ documentos }: { documentos: DocumentoItem[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, titulo: string) {
    if (!window.confirm(`Excluir o documento "${titulo}" definitivamente?`)) return;
    startTransition(() => {
      deleteDocumentoAction(id);
    });
  }

  if (documentos.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhum documento enviado ainda.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {documentos.map((documento) => (
        <li
          key={documento.id}
          className="flex items-center justify-between gap-4 border border-stone-200 bg-white px-4 py-3"
        >
          <a
            href={documento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-3 text-sm text-graphite-900 hover:text-gold-600"
          >
            <FileText size={18} strokeWidth={1.5} className="shrink-0 text-stone-400" />
            <span className="truncate font-medium">{documento.titulo}</span>
            <span className="shrink-0 text-xs text-stone-500">{documento.categoria}</span>
            {!documento.permiteDownload && (
              <span className="shrink-0 text-xs text-stone-400">(somente visualização)</span>
            )}
          </a>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleDelete(documento.id, documento.titulo)}
            className="shrink-0 p-2 text-stone-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Excluir documento"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </button>
        </li>
      ))}
    </ul>
  );
}
