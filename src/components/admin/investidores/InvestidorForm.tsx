"use client";

import { useActionState } from "react";
import type { InvestidorFormState } from "@/lib/investidores/actions";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";
const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

export interface InvestidorFormDefaultValues {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  obraIds: string[];
}

interface ObraOption {
  id: string;
  nome: string;
  codigoInterno: string;
}

interface InvestidorFormProps {
  action: (state: InvestidorFormState, formData: FormData) => Promise<InvestidorFormState>;
  obrasDisponiveis: ObraOption[];
  defaultValues?: InvestidorFormDefaultValues;
  submitLabel: string;
  isEdit?: boolean;
}

export function InvestidorForm({
  action,
  obrasDisponiveis,
  defaultValues,
  submitLabel,
  isEdit = false,
}: InvestidorFormProps) {
  const [state, formAction, pending] = useActionState<InvestidorFormState, FormData>(
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
          label="Nome completo"
          name="nome"
          defaultValue={defaultValues?.nome}
          error={state?.fieldErrors?.nome}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          defaultValue={defaultValues?.email}
          error={state?.fieldErrors?.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Telefone" name="telefone" defaultValue={defaultValues?.telefone} />
        <Field
          label="CPF / Documento"
          name="documento"
          defaultValue={defaultValues?.documento}
        />
      </div>

      <Field
        label={isEdit ? "Nova senha (deixe em branco para manter a atual)" : "Senha"}
        name="senha"
        type="password"
        error={state?.fieldErrors?.senha}
        required={!isEdit}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className={labelStyles}>Obras vinculadas</legend>
        {obrasDisponiveis.length === 0 ? (
          <p className="text-sm text-stone-500">Nenhuma obra cadastrada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {obrasDisponiveis.map((obra) => (
              <label
                key={obra.id}
                className="flex items-center gap-2 border border-stone-200 px-3 py-2 text-sm text-graphite-900"
              >
                <input
                  type="checkbox"
                  name="obraIds"
                  value={obra.id}
                  defaultChecked={defaultValues?.obraIds.includes(obra.id)}
                  className="accent-gold-500"
                />
                {obra.nome} <span className="text-stone-400">({obra.codigoInterno})</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

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
        autoComplete={type === "password" ? "new-password" : undefined}
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
