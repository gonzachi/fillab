"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  /** Dígitos mínimos: `pad={2}` muestra 01 en lugar de 1. */
  pad?: number;
  duration?: number;
  className?: string;
}

/**
 * Número que cuenta hasta su valor al entrar en pantalla.
 * Escribe directo en el nodo para no provocar un render por frame.
 */
export default function Counter({
  to,
  suffix = "",
  pad = 0,
  duration = 1.8,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const format = (v: number) =>
      Math.round(v).toString().padStart(pad, "0") + suffix;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.textContent = format(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });

    return () => controls.stop();
  }, [inView, to, suffix, pad, duration]);

  return (
    <span ref={ref} className={`u-mono-num ${className}`}>
      {"0".repeat(Math.max(pad, 1)) + suffix}
    </span>
  );
}
