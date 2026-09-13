interface DemoBannerProps {
  supabaseConfigured: boolean;
  umamiConfigured: boolean;
}

/**
 * Nunca mostrar números de ejemplo sin decirlo: el mismo criterio de
 * honestidad que la sección "Formatos" del sitio público (blueprints en
 * vez de clientes inventados) se aplica acá con los datos del panel.
 */
export default function DemoBanner({
  supabaseConfigured,
  umamiConfigured,
}: DemoBannerProps) {
  if (supabaseConfigured && umamiConfigured) return null;

  const missing = [
    !supabaseConfigured && "Supabase",
    !umamiConfigured && "Umami",
  ].filter(Boolean);

  return (
    <div className="u-hair-b flex flex-wrap items-center gap-3 bg-[var(--hair-soft)] px-6 py-3 sm:px-10">
      <span className="u-mono shrink-0 rounded-full bg-lime px-2.5 py-1 text-ink">
        Modo demo
      </span>
      <p className="text-[13px] text-[var(--fg-dim)]">
        Los números de abajo son de ejemplo — falta conectar {missing.join(" y ")}.
        Ver <code className="u-mono-num text-[var(--fg-soft)]">docs/dashboard-setup.md</code>.
      </p>
    </div>
  );
}
