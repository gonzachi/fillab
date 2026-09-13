"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompact, formatGrouped } from "@/lib/format";
import type { SeriesPoint } from "@/lib/umami/types";

const LIME = "#C8FF4D";
// Línea de contexto neutra (gris-violeta), no un segundo hue: validada
// contra la lima con el validador de la skill de dataviz (ΔE normal-vision
// 43.6, muy por encima del piso de 15) — ver el resumen de contraste en el
// commit. Distinguible por trazo punteado + color, nunca por color solo.
const CONTEXT = "#7A7288";

interface TrafficChartProps {
  data: SeriesPoint[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
  const hasPrevious = data.some((d) => d.previous !== null);

  return (
    <div className="border border-[var(--hair)] p-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="u-mono text-[var(--fg-faint)]">Tráfico en el tiempo</h3>

        {/* Legend manual: con 2 series, siempre visible — nunca solo color. */}
        {hasPrevious && (
          <div className="flex items-center gap-5 text-[12px] text-[var(--fg-dim)]">
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: LIME }} />
              Período actual
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="2" aria-hidden="true">
                <line x1="0" y1="1" x2="16" y2="1" stroke={CONTEXT} strokeWidth="2" strokeDasharray="3 3" />
              </svg>
              Período anterior
            </span>
          </div>
        )}
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={LIME} stopOpacity={0.18} />
                <stop offset="100%" stopColor={LIME} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(246,244,240,0.08)"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(246,244,240,0.34)", fontSize: 11 }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(246,244,240,0.34)", fontSize: 11 }}
              width={36}
              tickFormatter={(v: number) => formatCompact(v)}
            />

            <Tooltip content={ChartTooltip} cursor={{ stroke: "rgba(246,244,240,0.18)" }} />

            {hasPrevious && (
              <Line
                type="monotone"
                dataKey="previous"
                stroke={CONTEXT}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            )}

            <Area
              type="monotone"
              dataKey="current"
              stroke={LIME}
              strokeWidth={2}
              fill="url(#trafficFill)"
              dot={false}
              activeDot={{ r: 4, fill: LIME, stroke: "#0D0715", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Tooltip a medida: el valor va primero y en negrita, el nombre de la
 * serie va segundo y en tono secundario (la jerarquía del tooltip es al
 * revés que la de la leyenda — acá el lector ya tiene la serie identificada
 * por dónde puso el cursor, y lo que quiere es el número).
 */
interface ChartTooltipEntry {
  dataKey?: string | number | ((obj: unknown) => unknown);
  value?: unknown;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: readonly ChartTooltipEntry[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="border border-[var(--hair)] bg-[#0D0715] px-4 py-3 shadow-xl">
      <p className="u-mono mb-2 text-[var(--fg-faint)]">{label}</p>
      {payload.map((entry) => (
        <div key={String(entry.dataKey)} className="flex items-center gap-2.5 py-0.5">
          <span
            className="h-0.5 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="u-mono-num text-[13px] font-semibold text-bone">
            {formatGrouped(Number(entry.value ?? 0))}
          </span>
          <span className="text-[11px] text-[var(--fg-faint)]">
            {entry.dataKey === "current" ? "actual" : "anterior"}
          </span>
        </div>
      ))}
    </div>
  );
}
