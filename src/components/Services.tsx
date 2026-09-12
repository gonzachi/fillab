"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/media";

const services = [
  {
    num: "01",
    title: "Diseño de",
    accent: "interfaz",
    lead: "Identidad digital",
    body: "Estructura, jerarquía y microinteracciones al servicio de una sola cosa: que se entienda en tres segundos y se recuerde al día siguiente.",
    tags: ["UI / UX", "Design systems", "Dirección de arte"],
  },
  {
    num: "02",
    title: "Desarrollo",
    accent: "frontend",
    lead: "Código artesanal",
    body: "Next.js, React y TypeScript. Sin constructores visuales, sin deuda técnica heredada, sin sorpresas cuando el proyecto crece.",
    tags: ["Next.js 16", "TypeScript", "React 19"],
  },
  {
    num: "03",
    title: "Velocidad",
    accent: "y SEO",
    lead: "Medible",
    body: "Core Web Vitals en verde y 95+ en Lighthouse como punto de partida, no como objetivo. La velocidad es parte del diseño.",
    tags: ["Core Web Vitals", "SEO técnico", "Analítica"],
  },
  {
    num: "04",
    title: "Evolución",
    accent: "continua",
    lead: "Después del lanzamiento",
    body: "No entregamos y desaparecemos. El sitio sigue creciendo con tu negocio: contenido, funciones nuevas, ajustes con datos reales.",
    tags: ["Soporte", "Iteración", "Infraestructura"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [overflow, setOverflow] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // Cuánto sobresale la tira más allá del viewport: ese es exactamente
      // el scroll vertical que le vamos a pedir a la sección.
      setOverflow(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // El resorte quita la rigidez del mapeo directo scroll → posición.
  const eased = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const x = useTransform(eased, [0, 1], [0, -overflow]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const activeIndex = useTransform(eased, (v) =>
    String(Math.min(services.length, Math.floor(v * services.length) + 1)).padStart(2, "0"),
  );

  /* Movimiento reducido: la misma información, apilada. */
  if (reduced) {
    return (
      <section id="que-hacemos" className="bg-ink py-24 sm:py-32">
        <div className="u-shell">
          <SectionMarker index="02" label="Lo que hacemos" />
          <div className="grid gap-16 md:grid-cols-2">
            {services.map((s) => (
              <Panel key={s.num} service={s} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="que-hacemos"
      ref={sectionRef}
      className="relative bg-ink"
      style={{ height: `calc(100svh + ${overflow}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Cabecera fija de la sección */}
        <div className="u-shell pt-[calc(var(--gut)+2rem)]">
          <div className="flex items-start justify-between gap-8">
            <SectionMarker index="02" label="Lo que hacemos" />
            <div className="hidden items-baseline gap-2 sm:flex">
              <motion.span className="u-mono-num text-[var(--t-sm)] text-lime">
                {activeIndex}
              </motion.span>
              <span className="u-mono text-[var(--fg-faint)]">
                / 0{services.length}
              </span>
            </div>
          </div>

          <Reveal mode="up" duration={1}>
            <h2
              className="u-display max-w-[18ch] text-bone"
              style={{ fontSize: "var(--t-h3)" }}
            >
              Cuatro oficios, <span className="u-serif text-lime">un solo criterio.</span>
            </h2>
          </Reveal>
        </div>

        {/* Tira horizontal */}
        <div className="flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-[clamp(1.5rem,4vw,5rem)] pl-[var(--gut)] pr-[max(var(--gut),8vw)]"
          >
            {services.map((s) => (
              <div
                key={s.num}
                className="w-[min(80vw,34rem)] shrink-0 border-l border-[var(--hair)] pl-6 sm:pl-10"
              >
                <Panel service={s} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progreso */}
        <div className="u-shell pb-[var(--gut)]">
          <div className="h-px w-full bg-[var(--hair)]">
            <motion.div
              className="h-full origin-left bg-lime"
              style={{ scaleX: barScale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ service }: { service: (typeof services)[number] }) {
  return (
    <article className="group">
      <div className="mb-8 flex items-baseline justify-between">
        <span
          className="u-display-tight u-outline block leading-none"
          style={{ fontSize: "clamp(3.5rem,9vw,7rem)" }}
        >
          {service.num}
        </span>
        <span className="u-mono text-right text-[var(--fg-faint)]">
          {service.lead}
        </span>
      </div>

      <h3
        className="u-display mb-5 text-bone"
        style={{ fontSize: "clamp(1.75rem,4.2vw,2.75rem)" }}
      >
        {service.title}{" "}
        <span className="u-serif text-[1.1em] text-lime">{service.accent}</span>
      </h3>

      <p className="mb-8 max-w-[42ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
        {service.body}
      </p>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--hair)] pt-5">
        {service.tags.map((tag) => (
          <li key={tag} className="u-mono text-[var(--fg-soft)]">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
