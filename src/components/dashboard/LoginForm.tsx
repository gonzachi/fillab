"use client";

import { useActionState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { login, type LoginState } from "@/app/(dashboard)/login/actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <label className="block">
        <span className="u-mono mb-3 block text-[var(--fg-faint)]">Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="vos@tu-negocio.com"
          className="u-field"
        />
      </label>

      <label className="block">
        <span className="u-mono mb-3 block text-[var(--fg-faint)]">
          Contraseña
        </span>
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="u-field"
        />
      </label>

      {state.error && (
        <p role="alert" className="text-[var(--t-sm)] text-[#e66767]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group relative isolate flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-lime px-8 py-4 text-[14px] font-bold text-ink transition-opacity disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Entrando…
          </>
        ) : (
          <>
            Entrar
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
