import { FileText } from "lucide-react";

export interface DocumentoItem {
  id: string;
  titulo: string;
  categoria: string;
  permiteDownload: boolean;
  url: string;
}

export function DocumentoListView({ documentos }: { documentos: DocumentoItem[] }) {
  if (documentos.length === 0) {
    return (
      <p className="border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-600">
        Nenhum documento disponível ainda.
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
          </a>
          {documento.permiteDownload ? (
            <a
              href={documento.url}
              download
              className="shrink-0 text-xs font-medium text-gold-600 hover:underline"
            >
              Baixar
            </a>
          ) : (
            <span className="shrink-0 text-xs text-stone-400">Somente visualização</span>
          )}
        </li>
      ))}
    </ul>
  );
}
