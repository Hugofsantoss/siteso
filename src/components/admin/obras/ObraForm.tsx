"use client";

import { useActionState } from "react";
import type { ObraFormState } from "@/lib/obras/actions";
import { obraStatusOptions } from "@/lib/obras/schema";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";
const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

export interface ObraFormDefaultValues {
  nome: string;
  codigoInterno: string;
  endereco: string;
  bairro: string;
  cidade: string;
  status: string;
  descricao: string;
  dataInicio: string;
  previsaoEntrega: string;
  percentualExecucao: number;
  capaUrl: string | null;
}

interface ObraFormProps {
  action: (state: ObraFormState, formData: FormData) => Promise<ObraFormState>;
  defaultValues?: ObraFormDefaultValues;
  submitLabel: string;
}

function toDateInputValue(value?: string) {
  return value ? value.slice(0, 10) : "";
}

export function ObraForm({ action, defaultValues, submitLabel }: ObraFormProps) {
  const [state, formAction, pending] = useActionState<ObraFormState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.error && (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Nome da obra"
          name="nome"
          defaultValue={defaultValues?.nome}
          error={state?.fieldErrors?.nome}
          required
        />
        <Field
          label="Código interno"
          name="codigoInterno"
          defaultValue={defaultValues?.codigoInterno}
          error={state?.fieldErrors?.codigoInterno}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Endereço" name="endereco" defaultValue={defaultValues?.endereco} />
        <Field label="Bairro" name="bairro" defaultValue={defaultValues?.bairro} />
        <Field
          label="Cidade"
          name="cidade"
          defaultValue={defaultValues?.cidade}
          error={state?.fieldErrors?.cidade}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "Planejamento"}
            className={inputStyles}
          >
            {obraStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelStyles} htmlFor="percentualExecucao">
            Percentual de execução (%)
          </label>
          <input
            id="percentualExecucao"
            name="percentualExecucao"
            type="number"
            min={0}
            max={100}
            defaultValue={defaultValues?.percentualExecucao ?? 0}
            className={inputStyles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Data de início"
          name="dataInicio"
          type="date"
          defaultValue={toDateInputValue(defaultValues?.dataInicio)}
        />
        <Field
          label="Previsão de entrega"
          name="previsaoEntrega"
          type="date"
          defaultValue={toDateInputValue(defaultValues?.previsaoEntrega)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="descricao">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={5}
          defaultValue={defaultValues?.descricao}
          className={`${inputStyles} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelStyles} htmlFor="capa">
          Capa (imagem)
        </label>
        {defaultValues?.capaUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- servido por rota autenticada, next/image não envia cookies de sessão
          <img
            src={defaultValues.capaUrl}
            alt="Capa atual da obra"
            className="h-40 w-60 object-cover"
          />
        )}
        <input id="capa" name="capa" type="file" accept="image/*" className={inputStyles} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-sm bg-graphite-900 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string[];
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className={labelStyles} htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={inputStyles}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs text-red-600">
          {error[0]}
        </p>
      )}
    </div>
  );
}
