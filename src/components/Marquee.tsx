"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  /** Duración de un ciclo completo. Más alto = más lento. */
  seconds?: number;
  dir?: "left" | "right";
  className?: string;
  separator?: React.ReactNode;
}

/**
 * Cinta infinita sin costura: el contenido se duplica y la animación
 * desplaza exactamente el 50% del ancho, así el salto es invisible.
 */
export default function Marquee({
  items,
  seconds = 44,
  dir = "left",
  className = "",
  separator,
}: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="u-marquee"
        data-dir={dir}
        style={{ ["--marquee-dur" as string]: `${seconds}s` }}
      >
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap">{item}</span>
            <span className="mx-[1.5em] shrink-0 opacity-40">
              {separator ?? "✦"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
