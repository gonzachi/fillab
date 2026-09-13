import Link from "next/link";
import type { RangePreset } from "@/lib/umami/types";

const OPTIONS: { value: RangePreset; label: string }[] = [
  { value: "7d", label: "7 días" },
  { value: "30d", label: "30 días" },
  { value: "90d", label: "90 días" },
];

/**
 * Cambia el rango navegando a `?range=`, así la página del dashboard
 * (Server Component) vuelve a pedir los datos con el rango nuevo — sin
 * necesidad de un cliente de datos aparte para algo que se resuelve con
 * una navegación normal de Next.js.
 */
export default function RangeSwitcher({ active }: { active: RangePreset }) {
  return (
    <div className="inline-flex rounded-full border border-[var(--hair)] p-1">
      {OPTIONS.map((opt) => (
        <Link
          key={opt.value}
          href={`/dashboard?range=${opt.value}`}
          className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors ${
            opt.value === active
              ? "bg-lime text-ink"
              : "text-[var(--fg-dim)] hover:text-bone"
          }`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
