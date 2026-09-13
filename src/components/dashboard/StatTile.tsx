import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { deltaRatio, formatPercent } from "@/lib/format";

interface StatTileProps {
  label: string;
  value: string;
  previous: number;
  current: number;
  /** Si un aumento es una buena noticia para esta métrica (falso para "rebote"). */
  upIsGood?: boolean;
}

/**
 * Cifra grande + variación vs. el período anterior. El valor va en la
 * misma sans del resto del sitio, con cifras proporcionales — no mono, no
 * tabular: eso es para columnas, esto es un número que se lee solo (ver
 * la skill de dataviz, "Figures — when the form is a number").
 *
 * El color nunca es la única señal de la dirección: siempre va con una
 * flecha y con el signo en el texto.
 */
export default function StatTile({
  label,
  value,
  previous,
  current,
  upIsGood = true,
}: StatTileProps) {
  const ratio = deltaRatio(current, previous);
  const direction = ratio === null || ratio === 0 ? "flat" : ratio > 0 ? "up" : "down";
  const isGoodNews = direction === "flat" ? null : direction === "up" ? upIsGood : !upIsGood;

  const deltaColor =
    isGoodNews === null
      ? "text-[var(--fg-faint)]"
      : isGoodNews
        ? "text-[#0ca30c]"
        : "text-[#e66767]";

  const Icon = direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : Minus;

  return (
    <div className="border-b border-[var(--hair)] px-5 py-6 sm:px-7 sm:py-8">
      <span className="u-mono mb-4 block text-[var(--fg-faint)]">{label}</span>
      <span
        className="block font-bold leading-none text-bone"
        style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
      >
        {value}
      </span>
      {ratio !== null && (
        <span className={`mt-3 flex items-center gap-1.5 text-[12px] font-medium ${deltaColor}`}>
          <Icon className="h-3 w-3" strokeWidth={2.5} />
          {formatPercent(Math.abs(ratio))}
          <span className="text-[var(--fg-faint)]">vs. período anterior</span>
        </span>
      )}
    </div>
  );
}
