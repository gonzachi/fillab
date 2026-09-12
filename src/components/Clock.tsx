"use client";

import { useEffect, useState } from "react";

/**
 * Hora local de Barcelona, al segundo. Un detalle pequeño que dice
 * "hay alguien acá" mejor que cualquier frase.
 */
export default function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="u-mono-num">{time ?? "--:--:--"}</span>
    </span>
  );
}
