import type { Metadata } from "next";
import { ObraForm } from "@/components/admin/obras/ObraForm";
import { createObraAction } from "@/lib/obras/actions";

export const metadata: Metadata = {
  title: "Nova obra",
  robots: { index: false, follow: false },
};

export default function NovaObraPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-graphite-900">Nova obra</h1>
        <p className="mt-1 text-sm text-stone-600">Cadastre uma nova obra no sistema.</p>
      </div>
      <ObraForm action={createObraAction} submitLabel="Cadastrar obra" />
    </div>
  );
}
