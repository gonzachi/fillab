"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const LEAD = "No hacemos páginas web.";
const BODY = "Construimos el lugar exacto donde tu idea";
const ACCENT = "deja de ser una idea.";

/**
 * La frase se enciende palabra por palabra al ritmo del scroll. No es una
 * animación que se dispara: es el propio scroll leyendo el texto en voz alta.
 */
export default function Premise() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.65"],
  });

  const lead = LEAD.split(" ");
  const body = BODY.split(" ");
  const accent = ACCENT.split(" ");
  const all = [...lead, ...body, ...accent];
  const total = all.length;

  let cursor = 0;
  const next = () => cursor++;

  return (
    <section
      id="premisa"
      ref={ref}
      className="relative bg-ink"
      style={{ height: "240svh" }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Marca de agua: el hilo como trazo gigante detrás del texto */}
        <Watermark progress={scrollYProgress} />

        <div className="u-shell relative">
          <p
            className="u-display max-w-[22ch] sm:max-w-[26ch]"
            style={{ fontSize: "var(--t-h2)" }}
          >
            {lead.map((w, i) => (
              <Word key={`l${i}`} progress={scrollYProgress} index={next()} total={total}>
                {w}
              </Word>
            ))}
            <span className="inline-block w-full" />
            {body.map((w, i) => (
              <Word key={`b${i}`} progress={scrollYProgress} index={next()} total={total}>
                {w}
              </Word>
            ))}
            {accent.map((w, i) => (
              <Word
                key={`a${i}`}
                progress={scrollYProgress}
                index={next()}
                total={total}
                accent
              >
                {w}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  index,
  total,
  accent = false,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  accent?: boolean;
}) {
  // Cada palabra ocupa su tramo del scroll, con solape para que la ola
  // avance de forma continua en vez de a saltos.
  const start = index / total;
  const end = Math.min(1, start + 1.8 / total);

  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.24em] inline-block ${
        accent ? "u-serif text-[1.08em] text-lime" : "text-bone"
      }`}
    >
      {children}
    </motion.span>
  );
}

/** Trazo que se dibuja detrás del texto a medida que avanza la sección. */
function Watermark({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0, 0.9], [0, 1]);
  const x = useTransform(progress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
      style={{ x }}
    >
      <motion.path
        d="M-50 420 C 220 420, 260 140, 520 200 S 780 480, 1000 300 S 1180 120, 1260 180"
        fill="none"
        stroke="url(#threadGrad)"
        strokeWidth="1.5"
        style={{ pathLength: draw }}
      />
      <defs>
        <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#452873" stopOpacity="0" />
          <stop offset="45%" stopColor="#6B3FA8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C8FF4D" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
