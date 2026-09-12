"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

/* ─── Datos ────────────────────────────────────────────────── */
const dictionary = [
  {
    word: "FIL",
    grammar: "sust., cat. /fil/",
    definition:
      "Hilo, hebra. Lo que conecta un extremo con otro, punto a punto, hasta volverse algo.",
  },
  {
    word: "LAB",
    grammar: "sust., ingl. /læb/",
    definition:
      "Laboratorio. Espacio donde las ideas se prueban, se rompen y se reconstruyen hasta convertirse en algo real.",
  },
];

const beliefs = [
  { text: "Creemos en hacer las cosas bien,", accent: "no rápido." },
  { text: "Creemos en innovar con tecnología,", accent: "no en repetir fórmulas." },
  { text: "Creemos en hacer equipo —", accent: "con vos, no para vos." },
  { text: "Creemos en soluciones a medida.", accent: "Nunca genéricas." },
];

const closing = "Fil Lab nace de la curiosidad, y crece con cuidado.";

/* ─── Sub-componente: línea del manifiesto con reveal al scroll ─ */
function BeliefLine({
  text,
  accent,
  index,
}: {
  text: string;
  accent: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-b border-white/8 pb-6"
    >
      <span className="text-2xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight text-white/80 leading-[1.12]">
        {text}
      </span>
      <span className="text-2xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight text-[#C8FF4D] leading-[1.12] sm:whitespace-nowrap">
        {accent}
      </span>
    </motion.div>
  );
}

/* ─── Sub-componente: entrada de diccionario ─────────────────── */
function DictEntry({
  word,
  grammar,
  definition,
  index,
}: {
  word: string;
  grammar: string;
  definition: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="group"
    >
      {/* Palabra + gramática */}
      <div className="flex items-baseline gap-4 mb-3">
        <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-bold leading-none tracking-tight text-white group-hover:text-[#C8FF4D] transition-colors duration-500">
          {word}
        </span>
        <span className="text-xs sm:text-sm font-mono text-white/30 italic self-end mb-3 sm:mb-5">
          {grammar}
        </span>
      </div>
      {/* Definición */}
      <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl pl-1 border-l-2 border-[#C8FF4D]/40 ml-1 pl-5">
        {definition}
      </p>
    </motion.div>
  );
}

/* ─── Componente principal ───────────────────────────────────── */
export default function Manifesto() {
  const sectionRef = useRef(null);
  const closingRef = useRef(null);
  const closingInView = useInView(closingRef, { once: true, margin: "-15% 0px" });

  // Parallax sutil en el watermark de fondo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      id="manifiesto"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2E1A47]"
    >
      {/* ── Watermark de fondo: "FIL" gigante ─────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[40vw] font-bold leading-none text-white/[0.025] tracking-tight"
          style={{ fontFeatureSettings: "'ss01'" }}
        >
          FIL
        </span>
      </motion.div>

      {/* ── Luz ambiental ──────────────────────────────────────── */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#C8FF4D]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-[#120A1C]/80 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Contenido ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">

        {/* ╔══ BLOQUE I: DICCIONARIO ══════════════════════════════╗ */}
        <div className="pt-24 pb-20 border-b border-white/8">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-[0.16em] mb-16"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF4D]" />
            Léxico Fil Lab
          </motion.div>

          {/* Entradas de diccionario */}
          <div className="space-y-14">
            {dictionary.map((entry, i) => (
              <DictEntry key={entry.word} {...entry} index={i} />
            ))}
          </div>
        </div>

        {/* ╔══ BLOQUE II: MANIFIESTO ══════════════════════════════╗ */}
        <div className="py-24">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF4D]/10 border border-[#C8FF4D]/20 text-[#C8FF4D] text-[10px] font-bold uppercase tracking-[0.16em] mb-16"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF4D]" />
            Manifiesto
          </motion.div>

          {/* Líneas de creencias */}
          <div className="space-y-6">
            {beliefs.map((b, i) => (
              <BeliefLine key={i} {...b} index={i} />
            ))}
          </div>

          {/* Cierre — tipografía diferenciada, full reveal */}
          <motion.div
            ref={closingRef}
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={closingInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-12 pt-12 border-t border-white/8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/70 leading-relaxed italic max-w-2xl">
              &ldquo;{closing}&rdquo;
            </p>
            {/* Firma visual */}
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full bg-[#C8FF4D] flex items-center justify-center">
                <span className="text-[#2E1A47] font-bold text-sm">F</span>
              </span>
              <span className="text-xs text-white/30 font-medium tracking-wider uppercase">
                Fil Lab · Barcelona 2026
              </span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ── Separador inferior decorativo ─────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8FF4D]/30 to-transparent" />
    </section>
  );
}
