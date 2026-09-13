/**
 * Formato de números para el dashboard. Dos formas a propósito, según la
 * guía de la skill de dataviz: compacto para un número grande y solo (la
 * cifra de una stat tile), agrupado con comas para columnas/ejes donde
 * conviene ver el valor completo.
 */

const compact = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const grouped = new Intl.NumberFormat("es-ES");

export function formatCompact(n: number): string {
  return compact.format(n);
}

export function formatGrouped(n: number): string {
  return grouped.format(Math.round(n));
}

export function formatPercent(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`;
}

/** Segundos → "3m 12s" / "48s", para la duración promedio de sesión. */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest > 0 ? `${minutes}m ${rest}s` : `${minutes}m`;
}

/** Variación relativa entre dos valores, o null si no hay base de comparación. */
export function deltaRatio(value: number, previous: number): number | null {
  if (previous <= 0) return null;
  return (value - previous) / previous;
}
