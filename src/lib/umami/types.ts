/**
 * Formas de datos propias del dashboard — desacopladas de la respuesta
 * cruda de la API de Umami. `src/lib/umami/client.ts` traduce la respuesta
 * real a estos tipos; `src/lib/umami/demo-data.ts` los rellena a mano para
 * el modo demo. El resto de la app (páginas, componentes) solo conoce
 * estas formas, nunca el JSON de Umami directamente.
 */

export interface MetricWithDelta {
  value: number;
  previous: number;
}

export interface StatsSummary {
  pageviews: MetricWithDelta;
  visitors: MetricWithDelta;
  visits: MetricWithDelta;
  bounces: MetricWithDelta;
  /** Segundos totales de permanencia, sumados. */
  totalTime: MetricWithDelta;
}

export interface SeriesPoint {
  /** Fecha en formato corto para el eje X, ej. "12 sep". */
  label: string;
  current: number;
  previous: number | null;
}

export interface RankedItem {
  label: string;
  value: number;
}

export interface ConversionSummary {
  eventName: string | null;
  count: number;
  rate: number | null;
}

export interface DateRange {
  startAt: number;
  endAt: number;
}

export type RangePreset = "7d" | "30d" | "90d";
