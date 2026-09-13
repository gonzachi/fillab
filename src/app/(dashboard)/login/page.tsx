import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/dashboard/config";
import LoginForm from "@/components/dashboard/LoginForm";

export const metadata = { title: "Ingresar" };

export default function LoginPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex items-baseline gap-1.5">
          <span className="text-[17px] font-bold tracking-[-0.03em]">
            Fil Lab
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="u-mono ml-2 text-[var(--fg-faint)]">Panel</span>
        </div>

        <h1
          className="u-display mb-2 text-bone"
          style={{ fontSize: "var(--t-h4)" }}
        >
          Entrá a tu panel.
        </h1>
        <p className="mb-10 text-[var(--t-sm)] text-[var(--fg-dim)]">
          Analíticas de tu sitio, en un solo lugar.
        </p>

        {isSupabaseConfigured ? (
          <LoginForm />
        ) : (
          <div className="border border-[var(--hair)] p-6">
            <p className="u-mono mb-4 text-lime">Modo demo</p>
            <p className="mb-6 text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)]">
              Todavía no hay una cuenta de Supabase conectada, así que no hay
              nada que loguear de verdad. Entrá directo a ver el panel con
              datos de ejemplo.
            </p>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-lime"
            >
              Ver el panel demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
