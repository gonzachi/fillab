"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { to: 1, pad: 2, suffix: "", label: "Interlocutor", note: "Hablás con quien diseña y programa" },
  { to: 95, pad: 0, suffix: "+", label: "Lighthouse", note: "Punto de partida, no objetivo" },
  { to: 100, pad: 0, suffix: "%", label: "Código propio", note: "Sin plataformas cerradas" },
  { to: 0, pad: 1, suffix: "", label: "Plantillas", note: "Cada proyecto se escribe de cero" },
];

const reasons = [
  {
    title: "Trato directo con quien hace el trabajo",
    detail:
      "Sin ejecutivos de cuentas, sin cadenas de correos, sin teléfono roto. La persona que escucha tu problema es la que diseña la solución y la que escribe el código.",
    tag: "Sin intermediarios",
  },
  {
    title: "Tiempos reales, sin burocracia",
    detail:
      "El feedback entra en producción en días, no después de tres reuniones de coordinación interna. Es la ventaja concreta de trabajar con una estructura chica.",
    tag: "Velocidad boutique",
  },
  {
    title: "El proyecto es tuyo, siempre",
    detail:
      "Estándares abiertos, repositorio a tu nombre, despliegue en infraestructura que controlás. Si mañana querés seguir con otro equipo, podés hacerlo sin reescribir nada.",
    tag: "Sin ataduras",
  },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="relative bg-ink py-24 sm:py-32">
      <div className="u-shell">
        <SectionMarker index="07" label="Por qué Fil Lab" />

        {/* ── Encabezado asimétrico ──────────────────────────── */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal mode="up" duration={1.05}>
              <h2
                className="u-display max-w-[18ch] text-bone"
                style={{ fontSize: "var(--t-h2)" }}
              >
                Un símbolo simple para{" "}
                <span className="u-serif text-lime">ideas complejas.</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end md:col-span-5">
            <Reveal mode="blur" delay={0.15} duration={1.1}>
              <p className="max-w-[40ch] text-[var(--t-lead)] leading-[1.5] text-[var(--fg-dim)]">
                No necesitás una estructura de cincuenta personas para tener una
                web de primer nivel. Necesitás criterio, atención dedicada y
                foco en lo que mueve tu negocio.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Banda de cifras ────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 border-t border-[var(--hair)] sm:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              mode="up"
              delay={i * 0.08}
              duration={0.9}
              className="border-b border-[var(--hair)] px-5 py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              {/* La cifra es el titular de la celda */}
              <span
                className="block leading-none"
                style={{ fontSize: "clamp(2.75rem,6vw,4.5rem)" }}
              >
                <Counter
                  to={s.to}
                  pad={s.pad}
                  suffix={s.suffix}
                  className="font-light text-lime"
                />
              </span>
              <span className="u-mono mt-4 block text-[var(--fg-dim)]">
                {s.label}
              </span>
              <span className="mt-2 block max-w-[22ch] text-[var(--t-xs)] leading-relaxed text-[var(--fg-soft)]">
                {s.note}
              </span>
            </Reveal>
          ))}
        </div>

        {/* ── Razones desplegables ───────────────────────────── */}
        <div className="mt-20 sm:mt-28">
          {reasons.map((r, i) => (
            <ReasonRow key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonRow({
  reason,
  index,
}: {
  reason: (typeof reasons)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal mode="fade" duration={0.8} delay={index * 0.06}>
      <div
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
        className="group relative cursor-none border-t border-[var(--hair)] py-8 last:border-b sm:py-10"
      >
        <div className="grid items-baseline gap-4 md:grid-cols-12 md:gap-10">
          <span className="u-mono-num text-[var(--t-2xs)] text-[var(--fg-faint)] transition-colors duration-500 group-hover:text-lime md:col-span-1">
            0{index + 1}
          </span>

          <h3
            className="u-display text-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:col-span-7"
            style={{ fontSize: "var(--t-h4)" }}
          >
            {reason.title}
          </h3>

          <span className="u-mono text-[var(--fg-faint)] md:col-span-4 md:text-right">
            {reason.tag}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-6 max-w-[62ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)] md:ml-[8.33%] md:pl-10">
                {reason.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
