"use client";

import { useActionState, useEffect, useRef } from "react";
import type { AtualizacaoFormState } from "@/lib/atualizacoes/actions";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";
const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

interface AtualizacaoFormProps {
  action: (state: AtualizacaoFormState, formData: FormData) => Promise<AtualizacaoFormState>;
}

export function AtualizacaoForm({ action }: AtualizacaoFormProps) {
  const [state, formAction, pending] = useActionState<AtualizacaoFormState, FormData>(
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
      <p className="font-display text-lg font-semibold text-graphite-900">Nova atualização</p>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="titulo">
            Título *
          </label>
          <input id="titulo" name="titulo" type="text" required className={inputStyles} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="data">
            Data
          </label>
          <input id="data" name="data" type="date" className={inputStyles} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="texto">
          Texto *
        </label>
        <textarea id="texto" name="texto" rows={4} required className={`${inputStyles} resize-none`} />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="midias">
          Fotos / vídeos (opcional)
        </label>
        <input
          id="midias"
          name="midias"
          type="file"
          accept="image/*,video/*"
          multiple
          className={inputStyles}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-sm bg-graphite-900 px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Publicando..." : "Publicar atualização"}
      </button>
    </form>
  );
}
