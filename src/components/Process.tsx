"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    word: "Pensar",
    claim: "Antes de diseñar, escuchamos.",
    body: "Entender el negocio, no el brief. Qué decisión querés que tome quien entra, y qué le está impidiendo tomarla hoy.",
    out: ["Sesión de descubrimiento", "Arquitectura de contenido", "Criterios de éxito"],
  },
  {
    num: "02",
    word: "Experimentar",
    claim: "Prototipamos antes de construir.",
    body: "Las ideas se defienden mal en PDF. Armamos versiones navegables y las rompemos temprano, cuando cambiar sale barato.",
    out: ["Dirección visual", "Prototipo navegable", "Dos rondas de ajuste"],
  },
  {
    num: "03",
    word: "Construir",
    claim: "Código artesanal, sin plantillas.",
    body: "Cada componente escrito para este proyecto. Accesible, rápido y legible por quien lo herede dentro de tres años.",
    out: ["Desarrollo en Next.js", "Responsive real", "Auditoría de rendimiento"],
  },
  {
    num: "04",
    word: "Transformar",
    claim: "Tu idea, en un producto vivo.",
    body: "Lanzar es el principio. Medimos qué pasa, ajustamos con datos y el sitio sigue moviéndose con el negocio.",
    out: ["Despliegue y dominio", "Analítica y medición", "Evolución continua"],
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Una línea imaginaria en la mitad del viewport decide el paso activo.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="proceso" className="relative bg-ink-2 py-24 sm:py-32">
      {/* Hilo vertical que atraviesa la sección */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--hair)] to-transparent lg:block" />

      <div className="u-shell">
        <SectionMarker index="04" label="Cómo trabajamos" />

        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          {/* ── Índice fijo ──────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[22svh]">
              <Reveal mode="up" duration={1}>
                <h2
                  className="u-display mb-10 max-w-[16ch] text-bone"
                  style={{ fontSize: "var(--t-h3)" }}
                >
                  De la idea al{" "}
                  <span className="u-serif text-lime">impacto,</span> en cuatro
                  movimientos.
                </h2>
              </Reveal>

              {/* Palabra activa */}
              <div className="u-clip hidden h-[1.05em] lg:block" style={{ fontSize: "var(--t-h2)" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    className="u-display-tight text-lime"
                  >
                    {steps[active].word}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Lista de pasos con estado */}
              <ol className="mt-10 space-y-3">
                {steps.map((s, i) => (
                  <li key={s.num} className="flex items-center gap-4">
                    <span
                      className={`u-mono-num text-[var(--t-2xs)] transition-colors duration-500 ${
                        i === active ? "text-lime" : "text-[var(--fg-faint)]"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className="h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: i === active ? "3rem" : "1rem",
                        backgroundColor:
                          i === active ? "var(--lime)" : "var(--hair)",
                      }}
                    />
                    <span
                      className={`u-mono transition-colors duration-500 ${
                        i === active ? "text-bone" : "text-[var(--fg-faint)]"
                      }`}
                    >
                      {s.word}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── Pasos ────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            {steps.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[62svh] flex-col justify-center border-t border-[var(--hair)] py-12 first:border-t-0 lg:min-h-[78svh]"
              >
                <Reveal mode="up" duration={1}>
                  <span className="u-mono mb-6 block text-lime lg:hidden">
                    {s.num} — {s.word}
                  </span>

                  <p
                    className="u-display mb-6 max-w-[20ch] text-bone"
                    style={{ fontSize: "var(--t-h4)" }}
                  >
                    {s.claim}
                  </p>

                  <p className="mb-10 max-w-[46ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                    {s.body}
                  </p>

                  <ul className="space-y-0">
                    {s.out.map((o) => (
                      <li
                        key={o}
                        className="group flex items-center justify-between border-b border-[var(--hair)] py-3.5"
                      >
                        <span className="text-[var(--t-sm)] text-[var(--fg-dim)] transition-transform duration-500 group-hover:translate-x-1">
                          {o}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--fg-faint)] transition-colors duration-500 group-hover:bg-lime" />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
