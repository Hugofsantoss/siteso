"use client";

import { useActionState } from "react";
import type { LoginState } from "@/lib/auth/actions";

const inputStyles =
  "w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-gold-400 focus:outline-none";

const labelStyles = "text-xs font-medium tracking-wide text-stone-300 uppercase";

interface LoginFormProps {
  action: (state: LoginState, formData: FormData) => Promise<LoginState>;
  emailPlaceholder?: string;
}

export function LoginForm({ action, emailPlaceholder = "voce@email.com" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={emailPlaceholder}
          className={inputStyles}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="senha" className={labelStyles}>
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputStyles}
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-sm bg-gold-500 px-7 py-3.5 text-sm font-medium tracking-wide text-graphite-900 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
