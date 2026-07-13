"use client";

import { useActionState, useEffect, useRef } from "react";
import type { DocumentoFormState } from "@/lib/documentos/actions";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";
const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

interface DocumentoUploadFormProps {
  action: (state: DocumentoFormState, formData: FormData) => Promise<DocumentoFormState>;
}

export function DocumentoUploadForm({ action }: DocumentoUploadFormProps) {
  const [state, formAction, pending] = useActionState<DocumentoFormState, FormData>(
    action,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 border border-stone-200 bg-white p-6"
    >
      <p className="font-display text-lg font-semibold text-graphite-900">Enviar documento</p>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="titulo">
            Título *
          </label>
          <input id="titulo" name="titulo" type="text" required className={inputStyles} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="categoria">
            Categoria
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            placeholder="Ex: contrato, memorial, planta"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="arquivo">
          Arquivo *
        </label>
        <input id="arquivo" name="arquivo" type="file" required className={inputStyles} />
      </div>

      <label className="flex items-center gap-2 text-sm text-graphite-900">
        <input type="checkbox" name="permiteDownload" defaultChecked className="accent-gold-500" />
        Permitir download pelo investidor
      </label>

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-sm bg-graphite-900 px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Enviando..." : "Enviar documento"}
      </button>
    </form>
  );
}
