"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type Unit = "word" | "char";

interface SplitTextProps {
  children: string;
  /** Etiqueta HTML a renderizar. */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: Unit;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Empieza en cuanto monta, sin esperar al viewport (para el hero). */
  immediate?: boolean;
  /** Mientras sea `false` el texto no se revela, aunque esté en viewport. */
  gate?: boolean;
}

const piece: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Revela texto empujándolo desde debajo de una máscara, pieza por pieza.
 * El desfase entre piezas es lo que hace que se lea como una frase que
 * entra, no como un bloque que aparece.
 */
export default function SplitText({
  children,
  as: Tag = "span",
  by = "word",
  className = "",
  delay = 0,
  stagger = 0.055,
  immediate = false,
  gate = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const go = gate && (immediate || inView);

  const words = children.split(" ");

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLSpanElement>}
      aria-label={children}
      className={className}
      initial="hidden"
      animate={go ? "show" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          className="inline-block"
          style={{ marginRight: wi === words.length - 1 ? 0 : "0.26em" }}
        >
          {by === "word" ? (
            <span className="u-clip inline-block align-bottom pb-[0.08em]">
              <motion.span variants={piece} className="inline-block">
                {word}
              </motion.span>
            </span>
          ) : (
            word.split("").map((char, ci) => (
              <span
                key={`${char}-${ci}`}
                className="u-clip inline-block align-bottom pb-[0.08em]"
              >
                <motion.span variants={piece} className="inline-block">
                  {char}
                </motion.span>
              </span>
            ))
          )}
        </span>
      ))}
    </MotionTag>
  );
}
