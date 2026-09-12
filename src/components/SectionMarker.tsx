"use client";

import Reveal from "./Reveal";

interface SectionMarkerProps {
  index: string;
  label: string;
  /** Sobre fondo claro invierte los tonos del hilo y el texto. */
  tone?: "dark" | "light";
}

/**
 * Cabecera de sección al estilo de una ficha: número, hilo, nombre.
 * Repetirla en todas las secciones es lo que le da a la página la
 * sensación de índice editorial en vez de lista de bloques.
 */
export default function SectionMarker({
  index,
  label,
  tone = "dark",
}: SectionMarkerProps) {
  const dim = tone === "dark" ? "text-[var(--fg-faint)]" : "text-[var(--on-paper-faint)]";
  const strong = tone === "dark" ? "text-[var(--fg-dim)]" : "text-[var(--on-paper-dim)]";
  const hair = tone === "dark" ? "bg-[var(--hair)]" : "bg-[var(--hair-paper)]";

  return (
    <Reveal mode="fade" duration={0.8}>
      <div className="mb-12 flex items-center gap-5 sm:mb-16">
        <span className={`u-mono-num text-[var(--t-2xs)] tracking-[0.2em] ${dim}`}>
          {index}
        </span>
        <span className={`h-px w-10 sm:w-16 ${hair}`} />
        <span className={`u-mono ${strong}`}>{label}</span>
        <span className="h-1 w-1 rounded-full bg-lime u-pulse" />
      </div>
    </Reveal>
  );
}
