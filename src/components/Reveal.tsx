"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type Mode = "up" | "fade" | "blur" | "mask" | "scale" | "left";

const modes: Record<Mode, Variants> = {
  up:    { hidden: { y: 44, opacity: 0 },                       show: { y: 0, opacity: 1 } },
  fade:  { hidden: { opacity: 0 },                              show: { opacity: 1 } },
  blur:  { hidden: { opacity: 0, filter: "blur(14px)" },        show: { opacity: 1, filter: "blur(0px)" } },
  mask:  { hidden: { clipPath: "inset(0 0 100% 0)" },           show: { clipPath: "inset(0 0 0% 0)" } },
  scale: { hidden: { opacity: 0, scale: 1.08 },                 show: { opacity: 1, scale: 1 } },
  left:  { hidden: { x: -56, opacity: 0 },                      show: { x: 0, opacity: 1 } },
};

interface RevealProps {
  children: React.ReactNode;
  mode?: Mode;
  delay?: number;
  duration?: number;
  className?: string;
  /** Margen del viewport: valores más negativos disparan más tarde. */
  margin?: `${number}%` | `${number}px`;
}

/**
 * Envoltorio de entrada en viewport. Existen varios modos a propósito:
 * si todo entra con el mismo fade-up, la página se siente plantilla.
 */
export default function Reveal({
  children,
  mode = "up",
  delay = 0,
  duration = 0.95,
  className = "",
  margin = "-10%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: `${margin} 0px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={modes[mode]}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
