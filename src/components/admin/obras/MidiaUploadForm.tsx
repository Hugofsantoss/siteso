"use client";

import { useActionState, useEffect, useRef } from "react";
import type { MidiaFormState } from "@/lib/midias/actions";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";
const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

interface MidiaUploadFormProps {
  action: (state: MidiaFormState, formData: FormData) => Promise<MidiaFormState>;
}

export function MidiaUploadForm({ action }: MidiaUploadFormProps) {
  const [state, formAction, pending] = useActionState<MidiaFormState, FormData>(
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
      <p className="font-display text-lg font-semibold text-graphite-900">Enviar mídia</p>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="tipo">
            Tipo
          </label>
          <select id="tipo" name="tipo" defaultValue="foto" className={inputStyles}>
            <option value="foto">Foto</option>
            <option value="video">Vídeo</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="categoria">
            Categoria
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            placeholder="Ex: fachada, interior, planta"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="titulo">
            Título
          </label>
          <input id="titulo" name="titulo" type="text" className={inputStyles} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="mesReferencia">
            Mês de referência
          </label>
          <input
            id="mesReferencia"
            name="mesReferencia"
            type="month"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="descricao">
          Descrição
        </label>
        <textarea id="descricao" name="descricao" rows={2} className={`${inputStyles} resize-none`} />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="arquivo">
          Arquivo *
        </label>
        <input
          id="arquivo"
          name="arquivo"
          type="file"
          accept="image/*,video/*"
          required
          className={inputStyles}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-sm bg-graphite-900 px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Enviando..." : "Enviar mídia"}
      </button>
    </form>
  );
}
