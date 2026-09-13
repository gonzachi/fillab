import { formatGrouped } from "@/lib/format";
import type { RankedItem } from "@/lib/umami/types";

interface RankedListProps {
  title: string;
  items: RankedItem[];
}

// La magnitud ya la comunica el ANCHO de la barra — variar también la
// opacidad por rango sería una segunda codificación redundante, y con
// texto claro encima rompía el contraste en las filas más largas
// (verificado: lima a 100% de opacidad da 1.07:1 contra texto bone).
// Un solo lavado fijo y bajo, como pide la skill de dataviz para
// area fills: "~10% opacity, never a saturated block".
const FILL_OPACITY = 0.18;

/**
 * Lista rankeada (top páginas, referrers, países, dispositivos). Es un
 * gráfico de barras horizontal reducido a su mínima expresión: la barra
 * de fondo es la magnitud, el número es la etiqueta directa — con solo
 * 5 filas, cada una vale la pena escribirla entera, así que no hay
 * tooltip que reemplace el valor: siempre está a la vista.
 */
export default function RankedList({ title, items }: RankedListProps) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="border border-[var(--hair)] p-6 sm:p-7">
      <h3 className="u-mono mb-6 text-[var(--fg-faint)]">{title}</h3>

      {items.length === 0 ? (
        <p className="text-[13px] text-[var(--fg-faint)]">Sin datos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.label} className="relative">
              {/* Sin z-index: pinta antes que el texto por orden de DOM nomás,
                  para no depender de que el <li> forme su propio stacking context. */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 rounded-sm bg-lime transition-all"
                style={{
                  width: `${Math.max(4, (item.value / max) * 100)}%`,
                  opacity: FILL_OPACITY,
                }}
              />
              <div className="flex items-center justify-between gap-4 px-2.5 py-2">
                <span
                  title={item.label}
                  className="truncate text-[13px] font-medium text-bone"
                >
                  {item.label}
                </span>
                <span className="u-mono-num shrink-0 text-[12px] text-[var(--fg-dim)]">
                  {formatGrouped(item.value)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
