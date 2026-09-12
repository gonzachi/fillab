"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

const lexicon = [
  {
    word: "Fil",
    phon: "/fil/",
    kind: "sust., catalán",
    def: "Hilo, hebra. Lo que conecta un extremo con otro, punto a punto, hasta volverse algo.",
    note: "El material",
  },
  {
    word: "Lab",
    phon: "/læb/",
    kind: "sust., inglés",
    def: "Laboratorio. Espacio donde las ideas se prueban, se rompen y se reconstruyen hasta convertirse en algo real.",
    note: "El método",
  },
];

const beliefs = [
  { lead: "Creemos en hacer las cosas bien,", accent: "no rápido." },
  { lead: "Creemos en innovar con tecnología,", accent: "no en repetir fórmulas." },
  { lead: "Creemos en hacer equipo —", accent: "con vos, no para vos." },
  { lead: "Creemos en soluciones a medida.", accent: "Nunca genéricas." },
];

/**
 * El único respiro claro de la página. La inversión de tono es deliberada:
 * el manifiesto se lee como una doble página impresa en medio de una
 * proyección oscura.
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="manifiesto"
      ref={ref}
      className="relative overflow-hidden bg-paper text-[var(--on-paper)]"
    >
      {/* Filigrana: el wordmark gigantesco recortado por el borde */}
      <motion.span
        aria-hidden="true"
        style={{ y: markY, fontSize: "var(--t-mega)" }}
        className="u-display-tight pointer-events-none absolute -right-[6vw] top-[6vh] select-none text-[rgba(21,17,14,0.035)]"
      >
        FIL
      </motion.span>

      <div className="u-shell relative">
        {/* ── Léxico ─────────────────────────────────────────── */}
        <div className="pt-24 sm:pt-36">
          <SectionMarker index="04" label="Léxico" tone="light" />

          <div className="divide-y" style={{ borderColor: "var(--hair-paper)" }}>
            {lexicon.map((entry, i) => (
              <Entry key={entry.word} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* ── Manifiesto ─────────────────────────────────────── */}
        <div className="border-t py-24 sm:py-32" style={{ borderColor: "var(--hair-paper)" }}>
          <SectionMarker index="05" label="Manifiesto" tone="light" />

          <div>
            {beliefs.map((b, i) => (
              <Belief key={i} {...b} index={i} />
            ))}
          </div>

          {/* Cierre firmado */}
          <Reveal mode="up" delay={0.1} duration={1.1}>
            <div
              className="mt-20 grid gap-10 border-t pt-12 sm:mt-28 md:grid-cols-12"
              style={{ borderColor: "var(--hair-paper)" }}
            >
              <p
                className="u-serif md:col-span-8"
                style={{ fontSize: "var(--t-h4)", lineHeight: 1.35 }}
              >
                &ldquo;Fil Lab nace de la curiosidad, y crece con cuidado.&rdquo;
              </p>

              <div className="flex items-center gap-4 md:col-span-4 md:justify-end">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet">
                  <span className="text-[13px] font-bold text-paper">F</span>
                  <span className="ml-[2px] h-1 w-1 rounded-full bg-lime" />
                </span>
                <span>
                  <span className="u-mono block text-[var(--on-paper-dim)]">
                    Gonzalo Chiavassa
                  </span>
                  <span className="u-mono mt-1.5 block text-[var(--on-paper-faint)]">
                    Fundador · Barcelona
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cinta de cierre, ya en tono oscuro: prepara la vuelta */}
      <div className="border-t bg-violet py-4" style={{ borderColor: "var(--hair-paper)" }}>
        <Marquee
          items={["Pensar", "Experimentar", "Construir", "Transformar"]}
          seconds={38}
          dir="right"
          separator={<span className="text-lime">/</span>}
          className="u-mono text-[rgba(246,244,240,0.5)]"
        />
      </div>
    </section>
  );
}

/* ─── Entrada de diccionario ───────────────────────────────── */

function Entry({
  entry,
  index,
}: {
  entry: (typeof lexicon)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="grid gap-6 py-14 sm:py-20 md:grid-cols-12 md:gap-10">
      {/* Nota al margen */}
      <div className="md:col-span-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="u-mono text-[var(--on-paper-faint)]"
        >
          {entry.note}
        </motion.span>
      </div>

      {/* Palabra */}
      <div className="md:col-span-5">
        <div className="u-clip">
          <motion.h3
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            className="u-display-tight"
            style={{ fontSize: "var(--t-h2)" }}
          >
            {entry.word}
            <span className="u-dot" />
          </motion.h3>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 flex items-baseline gap-3"
        >
          <span className="u-serif text-[var(--t-body)] text-[var(--on-paper-dim)]">
            {entry.kind}
          </span>
          <span className="u-mono-num text-[var(--t-xs)] text-[var(--on-paper-faint)]">
            {entry.phon}
          </span>
        </motion.p>
      </div>

      {/* Definición */}
      <div className="md:col-span-5">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[38ch] text-[var(--t-lead)] leading-[1.45] text-[var(--on-paper)]"
        >
          {entry.def}
        </motion.p>
      </div>
    </div>
  );
}

/* ─── Línea del manifiesto ─────────────────────────────────── */

function Belief({
  lead,
  accent,
  index,
}: {
  lead: string;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <div
      ref={ref}
      className="group flex items-baseline gap-6 border-b py-7 sm:gap-10 sm:py-9"
      style={{ borderColor: "var(--hair-paper)" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="u-mono-num hidden shrink-0 text-[var(--t-2xs)] text-[var(--on-paper-faint)] sm:block"
      >
        0{index + 1}
      </motion.span>

      <div className="u-clip flex-1">
        <motion.p
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="u-display"
          style={{ fontSize: "var(--t-h3)" }}
        >
          <span className="text-[var(--on-paper)]">{lead} </span>
          <span className="u-serif text-[1.06em] text-violet-2">{accent}</span>
        </motion.p>
      </div>
    </div>
  );
}
