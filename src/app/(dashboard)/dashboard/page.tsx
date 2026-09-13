import { verifySession } from "@/lib/dashboard/dal";
import { isSupabaseConfigured, isUmamiConfigured } from "@/lib/dashboard/config";
import { getConversion, getRanked, getSeries, getStats } from "@/lib/umami/client";
import { DEMO_PROFILE } from "@/lib/umami/demo-data";
import type { RangePreset } from "@/lib/umami/types";
import { formatCompact, formatDuration, formatPercent } from "@/lib/format";
import DemoBanner from "@/components/dashboard/DemoBanner";
import RangeSwitcher from "@/components/dashboard/RangeSwitcher";
import StatTile from "@/components/dashboard/StatTile";
import TrafficChart from "@/components/dashboard/TrafficChart";
import RankedList from "@/components/dashboard/RankedList";

export const metadata = { title: "Resumen" };

function parseRange(value: string | undefined): RangePreset {
  return value === "7d" || value === "30d" || value === "90d" ? value : "30d";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  // El chequeo real de sesión: se repite acá (y no solo en el layout)
  // porque un layout no vuelve a correr en cada navegación del mismo
  // segmento — ver la nota en dashboard/layout.tsx y en dal.ts.
  const profile = await verifySession();
  const range = parseRange((await searchParams).range);

  // Perfil "unprovisioned": el usuario existe en Supabase Auth pero Fil
  // Lab todavía no le creó la fila en `client_profiles` (alta manual
  // pendiente, ver docs/dashboard-setup.md).
  if (profile.mode === "unprovisioned") {
    return (
      <main className="flex min-h-[60svh] items-center justify-center px-6 py-16 text-center">
        <div className="max-w-sm">
          <p className="u-mono mb-4 text-lime">Cuenta sin sitio asignado</p>
          <p className="text-[14px] leading-relaxed text-[var(--fg-dim)]">
            Tu cuenta ({profile.email}) todavía no tiene un sitio de Umami
            asociado. Escribinos y lo activamos.
          </p>
        </div>
      </main>
    );
  }

  const websiteId = profile.mode === "live" ? profile.websiteId : DEMO_PROFILE.websiteId;
  const conversionEvent =
    profile.mode === "live" ? profile.conversionEvent : DEMO_PROFILE.conversionEvent;
  const domain = profile.mode === "live" ? profile.domain : DEMO_PROFILE.domain;

  const [stats, series, pages, referrers, countries, devices, conversion] =
    await Promise.all([
      getStats(websiteId, range),
      getSeries(websiteId, range),
      getRanked(websiteId, range, "pages"),
      getRanked(websiteId, range, "referrers"),
      getRanked(websiteId, range, "countries"),
      getRanked(websiteId, range, "devices"),
      getConversion(websiteId, range, conversionEvent),
    ]);

  return (
    <main>
      <DemoBanner
        supabaseConfigured={isSupabaseConfigured}
        umamiConfigured={isUmamiConfigured}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-10">
        <div>
          <h1 className="u-display text-bone" style={{ fontSize: "var(--t-h4)" }}>
            Resumen
          </h1>
          {domain && (
            <p className="mt-1 text-[13px] text-[var(--fg-faint)]">{domain}</p>
          )}
        </div>
        <RangeSwitcher active={range} />
      </div>

      {/* Cifras principales */}
      <div className="grid grid-cols-2 border-t border-[var(--hair)] lg:grid-cols-5">
        <StatTile
          label="Visitas"
          value={formatCompact(stats.visits.value)}
          current={stats.visits.value}
          previous={stats.visits.previous}
        />
        <StatTile
          label="Visitantes únicos"
          value={formatCompact(stats.visitors.value)}
          current={stats.visitors.value}
          previous={stats.visitors.previous}
        />
        <StatTile
          label="Páginas vistas"
          value={formatCompact(stats.pageviews.value)}
          current={stats.pageviews.value}
          previous={stats.pageviews.previous}
        />
        <StatTile
          label="Rebote"
          value={
            stats.visits.value > 0
              ? formatPercent(stats.bounces.value / stats.visits.value)
              : "—"
          }
          current={stats.bounces.value}
          previous={stats.bounces.previous}
          upIsGood={false}
        />
        <StatTile
          label="Duración media"
          value={
            stats.visits.value > 0
              ? formatDuration(stats.totalTime.value / stats.visits.value)
              : "—"
          }
          current={stats.totalTime.value}
          previous={stats.totalTime.previous}
        />
      </div>

      {/* Conversión, si el cliente tiene un evento definido */}
      {conversion.eventName && (
        <div className="border-t border-[var(--hair)] px-6 py-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border border-[var(--hair)] bg-[var(--hair-soft)] px-6 py-5">
            <div>
              <span className="u-mono mb-2 block text-[var(--fg-faint)]">
                Conversión · {conversion.eventName}
              </span>
              <span className="text-[13px] text-[var(--fg-dim)]">
                {conversion.count} eventos sobre {formatCompact(stats.visits.value)} visitas
              </span>
            </div>
            <span
              className="font-bold text-lime"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {conversion.rate !== null ? formatPercent(conversion.rate) : "—"}
            </span>
          </div>
        </div>
      )}

      {/* Tráfico en el tiempo */}
      <div className="px-6 py-6 sm:px-10">
        <TrafficChart data={series} />
      </div>

      {/* Listas rankeadas */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-16 sm:px-10 lg:grid-cols-2">
        <RankedList title="Páginas más visitadas" items={pages} />
        <RankedList title="De dónde viene el tráfico" items={referrers} />
        <RankedList title="País" items={countries} />
        <RankedList title="Dispositivo" items={devices} />
      </div>
    </main>
  );
}
