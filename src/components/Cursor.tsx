"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer } from "@/lib/media";

/**
 * Cursor de dos cuerpos: un punto que sigue al ratón casi sin retardo y un
 * anillo que llega tarde. Cualquier elemento con `data-cursor="texto"`
 * convierte el anillo en una pastilla con esa etiqueta dentro.
 */
export default function Cursor() {
  const raw = { x: useMotionValue(-200), y: useMotionValue(-200) };

  const dotX = useSpring(raw.x, { damping: 40, stiffness: 900, mass: 0.35 });
  const dotY = useSpring(raw.y, { damping: 40, stiffness: 900, mass: 0.35 });
  const ringX = useSpring(raw.x, { damping: 26, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(raw.y, { damping: 26, stiffness: 180, mass: 0.8 });

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  // En táctil el cursor propio no aporta nada.
  const enabled = useHasFinePointer();

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      raw.x.set(e.clientX);
      raw.y.set(e.clientY);
      setVisible(true);
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE);
      if (!el) return;
      setActive(true);
      setLabel(el.getAttribute("data-cursor"));
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE);
      if (!el) return;
      // Ignorar el paso entre hijos del mismo elemento interactivo.
      const next = (e.relatedTarget as Element | null)?.closest?.(INTERACTIVE);
      if (next === el) return;
      setActive(false);
      setLabel(null);
    };

    const hide = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, raw.x, raw.y]);

  if (!enabled) return null;

  const ringSize = label ? 92 : active ? 52 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Anillo perezoso */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: label ? "#C8FF4D" : "rgba(200,255,77,0)",
          borderColor: label ? "rgba(200,255,77,0)" : "rgba(200,255,77,0.45)",
        }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-full w-full rounded-full border" style={{ borderColor: "inherit" }} />
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="u-mono absolute whitespace-nowrap text-[9px] text-ink"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Punto líder */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-lime mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible && !label ? 1 : 0,
        }}
        animate={{ width: active ? 4 : 7, height: active ? 4 : 7 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
