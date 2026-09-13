import "server-only";
import { isUmamiConfigured } from "@/lib/dashboard/config";
import {
  getDemoConversion,
  getDemoRanked,
  getDemoSeries,
  getDemoStats,
} from "./demo-data";
import type {
  ConversionSummary,
  DateRange,
  RankedItem,
  RangePreset,
  SeriesPoint,
  StatsSummary,
} from "./types";

/**
 * Cliente tipado de la API REST de Umami (self-hosted). Nunca se importa
 * desde un Client Component — vive detrás de `server-only` porque
 * `UMAMI_USERNAME`/`UMAMI_PASSWORD` no deben llegar nunca al navegador.
 *
 * Endpoints y forma de respuesta verificados contra la documentación
 * oficial (docs.umami.is/docs/api) al escribir esto. Umami no tiene una
 * API key de larga duración para instancias self-hosted (eso es solo de
 * Umami Cloud): acá se hace login con usuario y contraseña y se cachea el
 * token. Si tu versión de Umami difiere en algún nombre de campo, es el
 * único archivo que hay que tocar — el resto del dashboard solo conoce los
 * tipos de `./types`.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const TOKEN_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6h

function presetToDays(preset: RangePreset): number {
  return preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
}

function presetToRange(preset: RangePreset): DateRange {
  const endAt = Date.now();
  const startAt = endAt - presetToDays(preset) * DAY_MS;
  return { startAt, endAt };
}

function previousRange({ startAt, endAt }: DateRange): DateRange {
  const span = endAt - startAt;
  return { startAt: startAt - span, endAt: startAt };
}

// ─── Token de sesión ─────────────────────────────────────────────────────
// Vive en una variable de módulo: en un entorno serverless esto es un
// cache "best effort" por instancia tibia, no una garantía entre
// invocaciones — en el peor caso se pierde y se vuelve a loguear, nunca
// rompe nada. No lo reemplaces por una variable global compartida a mano:
// con Fluid Compute, cada request podría pisar el token de otra.
let cachedToken: { token: string; obtainedAt: number } | null = null;

async function login(): Promise<string> {
  const res = await fetch(`${process.env.UMAMI_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.UMAMI_USERNAME,
      password: process.env.UMAMI_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`No se pudo autenticar contra Umami (HTTP ${res.status})`);
  }

  const data = (await res.json()) as { token: string };
  cachedToken = { token: data.token, obtainedAt: Date.now() };
  return data.token;
}

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() - cachedToken.obtainedAt < TOKEN_MAX_AGE_MS) {
    return cachedToken.token;
  }
  return login();
}

/** Pedido autenticado; reintenta una vez con login nuevo si el token venció. */
async function umamiFetch<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const url = new URL(`${process.env.UMAMI_API_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const attempt = (token: string) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

  let token = await getToken();
  let res = await attempt(token);

  if (res.status === 401) {
    token = await login();
    res = await attempt(token);
  }

  if (!res.ok) {
    throw new Error(`Umami API error ${res.status} en ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Resumen de estadísticas ─────────────────────────────────────────────

interface RawStatMetric {
  value: number;
  prev: number;
}

export async function getStats(
  websiteId: string,
  preset: RangePreset,
): Promise<StatsSummary> {
  if (!isUmamiConfigured) return getDemoStats(preset);

  const { startAt, endAt } = presetToRange(preset);
  const raw = await umamiFetch<{
    pageviews: RawStatMetric;
    visitors: RawStatMetric;
    visits: RawStatMetric;
    bounces: RawStatMetric;
    totaltime: RawStatMetric;
  }>(`/api/websites/${websiteId}/stats`, { startAt, endAt });

  const toDelta = (m: RawStatMetric) => ({ value: m.value, previous: m.prev });

  return {
    pageviews: toDelta(raw.pageviews),
    visitors: toDelta(raw.visitors),
    visits: toDelta(raw.visits),
    bounces: toDelta(raw.bounces),
    totalTime: toDelta(raw.totaltime),
  };
}

// ─── Serie de tráfico (actual vs. período anterior) ─────────────────────

const dayLabel = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
});

export async function getSeries(
  websiteId: string,
  preset: RangePreset,
): Promise<SeriesPoint[]> {
  if (!isUmamiConfigured) return getDemoSeries(preset);

  const current = presetToRange(preset);
  const previous = previousRange(current);

  const fetchSeries = (range: DateRange) =>
    umamiFetch<{ pageviews: { x: string; y: number }[] }>(
      `/api/websites/${websiteId}/pageviews`,
      { startAt: range.startAt, endAt: range.endAt, unit: "day" },
    );

  const [currentSeries, previousSeries] = await Promise.all([
    fetchSeries(current),
    fetchSeries(previous),
  ]);

  return currentSeries.pageviews.map((point, i) => ({
    label: dayLabel.format(new Date(point.x)),
    current: point.y,
    previous: previousSeries.pageviews[i]?.y ?? null,
  }));
}

// ─── Listas rankeadas (páginas, referrers, países, dispositivos) ────────

const METRIC_TYPE = {
  pages: "url",
  referrers: "referrer",
  countries: "country",
  devices: "device",
} as const;

export type RankedKind = keyof typeof METRIC_TYPE;

export async function getRanked(
  websiteId: string,
  preset: RangePreset,
  kind: RankedKind,
): Promise<RankedItem[]> {
  if (!isUmamiConfigured) return getDemoRanked(kind);

  const { startAt, endAt } = presetToRange(preset);
  const raw = await umamiFetch<{ x: string; y: number }[]>(
    `/api/websites/${websiteId}/metrics`,
    { type: METRIC_TYPE[kind], startAt, endAt },
  );

  return raw
    .slice(0, 5)
    .map((item) => ({ label: item.x || "Directo", value: item.y }));
}

// ─── Conversión (evento custom / visitas) ───────────────────────────────

export async function getConversion(
  websiteId: string,
  preset: RangePreset,
  eventName: string | null,
): Promise<ConversionSummary> {
  if (!isUmamiConfigured) return getDemoConversion(preset);
  if (!eventName) return { eventName: null, count: 0, rate: null };

  const { startAt, endAt } = presetToRange(preset);
  const [events, stats] = await Promise.all([
    umamiFetch<{ x: string; y: number }[]>(
      `/api/websites/${websiteId}/metrics`,
      { type: "event", startAt, endAt },
    ),
    getStats(websiteId, preset),
  ]);

  const count = events.find((e) => e.x === eventName)?.y ?? 0;

  return {
    eventName,
    count,
    rate: stats.visits.value > 0 ? count / stats.visits.value : null,
  };
}
