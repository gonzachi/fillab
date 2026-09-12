"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreadField from "./ThreadField";
import SplitText from "./SplitText";
import Marquee from "./Marquee";
import Button from "./Button";
import Clock from "./Clock";
import { useIntroDone } from "./Intro";

const META = [
  { k: "Disciplina", v: "Diseño + Desarrollo" },
  { k: "Base", v: "Barcelona, ES" },
  { k: "Disponibilidad", v: "Q1 2026" },
];

export default function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);

  // La sección se aleja en vez de desaparecer: el scroll la trata como
  // una capa de película, no como un bloque de HTML.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(9px)"]);

  const chrome = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* ── Fondo ───────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 -z-10" style={{ opacity, scale }}>
        <div className="u-grid-bg absolute inset-0 opacity-70" />
        <ThreadField className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 30%, rgba(7,4,11,0.7) 100%)",
          }}
        />
      </motion.div>

      <motion.div style={{ y, opacity, filter: blur }} className="relative flex flex-1 flex-col justify-between">
        {/* ── Metadatos superiores ──────────────────────────── */}
        <motion.div
          variants={chrome}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="u-shell flex items-start justify-between pt-[calc(var(--gut)+3.5rem)]"
        >
          <p className="u-mono max-w-[16ch] leading-[1.8] text-[var(--fg-soft)]">
            Consultora creativa
            <br />
            boutique
          </p>
          <div className="hidden text-right sm:block">
            <p className="u-mono mb-2 text-[var(--fg-faint)]">Hora local</p>
            <Clock className="u-mono text-[var(--fg-dim)]" />
          </div>
        </motion.div>

        {/* ── Titular ───────────────────────────────────────── */}
        <div className="u-shell pb-10 sm:pb-14">
          <h1
            className="u-display-tight text-bone"
            style={{ fontSize: "var(--t-h1)" }}
          >
            <SplitText as="span" className="block" gate={ready} immediate by="char" stagger={0.028} delay={0.1}>
              Ideas en
            </SplitText>
            <SplitText
              as="span"
              className="block"
              gate={ready}
              immediate
              by="char"
              stagger={0.028}
              delay={0.24}
            >
              movimiento
            </SplitText>
            <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
              <SplitText
                as="span"
                className="text-[var(--fg-soft)]"
                gate={ready}
                immediate
                by="char"
                stagger={0.028}
                delay={0.42}
              >
                para un
              </SplitText>
              <span className="u-clip inline-block align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 1.15, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="u-serif inline-block pb-[0.12em] text-[1.14em] leading-[0.9] text-lime"
                >
                  futuro real.
                </motion.span>
              </span>
            </span>
          </h1>
        </div>

        {/* ── Pie del hero ──────────────────────────────────── */}
        <motion.div
          variants={chrome}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="u-shell"
        >
          <div className="u-hair-t grid grid-cols-1 items-end gap-8 py-7 md:grid-cols-12">
            <dl className="col-span-1 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:col-span-8">
              {META.map((m) => (
                <div key={m.k}>
                  <dt className="u-mono mb-2 text-[var(--fg-faint)]">{m.k}</dt>
                  <dd className="text-[var(--t-sm)] font-medium text-[var(--fg-dim)]">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="md:col-span-4 md:flex md:justify-end">
              <Button href="#contacto" size="lg" cursorLabel="Hablemos">
                Empecemos
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Cinta inferior ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="u-hair-t relative border-b border-[var(--hair)] bg-ink/40 py-3.5 backdrop-blur-sm"
      >
        <Marquee
          items={[
            "Diseño de interfaz",
            "Next.js",
            "Identidad digital",
            "Core Web Vitals",
            "Dirección de arte",
            "Sin plantillas",
          ]}
          seconds={52}
          separator={<span className="text-lime">✦</span>}
          className="u-mono text-[var(--fg-soft)]"
        />
      </motion.div>

    </section>
  );
}
