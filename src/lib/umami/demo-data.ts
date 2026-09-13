import type {
  ConversionSummary,
  RankedItem,
  RangePreset,
  SeriesPoint,
  StatsSummary,
} from "./types";

/**
 * Datos de ejemplo para el modo demo del dashboard — se usan cuando falta
 * Supabase, falta Umami, o ambos (ver `src/lib/dashboard/config.ts`).
 * Deliberadamente deterministas (nada de `Math.random()`): la misma fecha
 * siempre produce el mismo número, para que el panel se vea igual entre
 * recargas mientras se lo diseña o se lo muestra sin datos reales todavía.
 *
 * Es lo mismo que el patrón "blueprint" de la sección Formatos del sitio
 * público: nunca fingir un cliente real, marcar siempre lo que es ejemplo.
 */

export const DEMO_PROFILE = {
  clientName: "Cliente de ejemplo",
  domain: "tu-sitio.com",
  websiteId: "demo",
  conversionEvent: "contacto_enviado",
};

/** Generador determinista simple — mismo índice, mismo valor, siempre. */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const DAY_LABELS = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
});

function daysFor(preset: RangePreset): number {
  return preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
}

/** Curva de tráfico base: tendencia leve + estacionalidad semanal + ruido. */
function baseValue(dayIndex: number): number {
  const weekday = dayIndex % 7;
  const weekendDip = weekday === 5 || weekday === 6 ? 0.6 : 1;
  const trend = 1 + dayIndex * 0.004;
  const noise = 0.85 + pseudoRandom(dayIndex) * 0.3;
  return Math.round(140 * weekendDip * trend * noise);
}

export function getDemoSeries(preset: RangePreset): SeriesPoint[] {
  const days = daysFor(preset);
  const today = new Date();
  const points: SeriesPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayIndex = 1000 - i; // offset para que "previous" tenga su propia curva
    points.push({
      label: DAY_LABELS.format(date),
      current: baseValue(dayIndex),
      previous: baseValue(dayIndex - days),
    });
  }

  return points;
}

export function getDemoStats(preset: RangePreset): StatsSummary {
  const series = getDemoSeries(preset);
  const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);
  const currentTotal = sum(series.map((p) => p.current));
  const previousTotal = sum(series.map((p) => p.previous ?? 0));

  const ratio = (n: number, r: number) => Math.round(n * r);

  return {
    pageviews: { value: currentTotal, previous: previousTotal },
    visitors: {
      value: ratio(currentTotal, 0.62),
      previous: ratio(previousTotal, 0.6),
    },
    visits: {
      value: ratio(currentTotal, 0.78),
      previous: ratio(previousTotal, 0.76),
    },
    bounces: {
      value: ratio(currentTotal, 0.34),
      previous: ratio(previousTotal, 0.38),
    },
    totalTime: {
      value: ratio(currentTotal, 46),
      previous: ratio(previousTotal, 42),
    },
  };
}

export function getDemoRanked(
  type: "pages" | "referrers" | "countries" | "devices",
): RankedItem[] {
  const datasets: Record<typeof type, RankedItem[]> = {
    pages: [
      { label: "/", value: 1842 },
      { label: "/servicios", value: 964 },
      { label: "/proceso", value: 611 },
      { label: "/contacto", value: 448 },
      { label: "/manifiesto", value: 302 },
    ],
    referrers: [
      { label: "Directo", value: 1520 },
      { label: "google.com", value: 1188 },
      { label: "instagram.com", value: 540 },
      { label: "linkedin.com", value: 214 },
      { label: "Otros", value: 96 },
    ],
    countries: [
      { label: "España", value: 2103 },
      { label: "Argentina", value: 588 },
      { label: "México", value: 341 },
      { label: "Francia", value: 190 },
      { label: "Otros", value: 122 },
    ],
    devices: [
      { label: "Móvil", value: 2016 },
      { label: "Escritorio", value: 1204 },
      { label: "Tablet", value: 124 },
    ],
  };

  return datasets[type];
}

export function getDemoConversion(preset: RangePreset): ConversionSummary {
  const stats = getDemoStats(preset);
  const count = Math.round(stats.visits.value * 0.041);

  return {
    eventName: DEMO_PROFILE.conversionEvent,
    count,
    rate: stats.visits.value > 0 ? count / stats.visits.value : null,
  };
}
