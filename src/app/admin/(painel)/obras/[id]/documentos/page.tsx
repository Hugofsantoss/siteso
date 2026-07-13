import type { Metadata } from "next";
import { db } from "@/lib/db";
import { DocumentoUploadForm } from "@/components/admin/obras/DocumentoUploadForm";
import { DocumentoList } from "@/components/admin/obras/DocumentoList";
import { createDocumentoAction } from "@/lib/documentos/actions";

export const metadata: Metadata = {
  title: "Documentos da obra",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ObraDocumentosPage({ params }: PageProps) {
  const { id } = await params;

  const documentos = await db.documento.findMany({
    where: { obraId: id },
    orderBy: { createdAt: "desc" },
  });

  const action = createDocumentoAction.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <DocumentoUploadForm action={action} />
      <DocumentoList
        documentos={documentos.map((documento) => ({
          id: documento.id,
          titulo: documento.titulo,
          categoria: documento.categoria,
          permiteDownload: documento.permiteDownload,
          url: `/api/arquivos/${documento.arquivoPath}`,
        }))}
      />
    </div>
  );
}
