"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useIntroDone } from "./Intro";
import Button from "./Button";
import Clock from "./Clock";
import Magnetic from "./Magnetic";
import { scrollTo } from "@/lib/scroll";

const links = [
  { num: "01", label: "Premisa", href: "#premisa" },
  { num: "02", label: "Trabajo", href: "#que-hacemos" },
  { num: "03", label: "Formatos", href: "#formatos" },
  { num: "04", label: "Proceso", href: "#proceso" },
  { num: "05", label: "Precios", href: "#precios" },
];

export default function Navbar() {
  const ready = useIntroDone();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // Se esconde al bajar y vuelve al primer gesto hacia arriba.
    if (open) return;
    setHidden(y > prev && y > 320);
  });

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: ready && !hidden ? 0 : -100 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ${
          solid
            ? "border-b border-[var(--hair)] bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="u-shell flex items-center justify-between py-4 sm:py-5">
          {/* Wordmark */}
          <Magnetic strength={0.12}>
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0);
              }}
              className="group flex items-baseline gap-1.5"
              aria-label="Fil Lab, inicio"
            >
              <span className="text-[17px] font-bold tracking-[-0.03em] text-bone">
                Fil Lab
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[2.2]" />
            </a>
          </Magnetic>

          {/* Navegación */}
          <nav className="hidden items-center gap-7 xl:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="group flex items-baseline gap-2"
              >
                <span className="u-mono-num text-[10px] text-[var(--fg-faint)] transition-colors duration-300 group-hover:text-lime">
                  {l.num}
                </span>
                <span className="u-link text-[13px] font-medium tracking-[-0.01em] text-[var(--fg-dim)] transition-colors duration-300 group-hover:text-bone">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Derecha */}
          <div className="flex items-center gap-5">
            <Clock className="u-mono hidden text-[var(--fg-faint)] xl:block" />

            <div className="hidden sm:block">
              <Button href="#contacto" variant="ghost" size="sm" cursorLabel="Hablemos">
                Iniciar proyecto
              </Button>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="flex flex-col items-end gap-[5px] p-2 xl:hidden"
            >
              <span className="block h-px w-6 bg-bone" />
              <span className="block h-px w-4 bg-bone" />
            </button>
          </div>
        </div>

        {/* Progreso de lectura */}
        <motion.div
          className="h-px origin-left bg-lime"
          style={{ scaleX: progress }}
        />
      </motion.header>

      {/* ── Menú a pantalla completa ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-violet"
          >
            <div className="u-shell flex items-center justify-between py-4 sm:py-5">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[17px] font-bold tracking-[-0.03em] text-bone">
                  Fil Lab
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="u-mono p-2 text-[rgba(246,244,240,0.6)]"
              >
                Cerrar
              </button>
            </div>

            <nav className="u-shell flex flex-1 flex-col justify-center">
              {links.map((l, i) => (
                <div key={l.label} className="u-clip border-b border-white/10">
                  <motion.a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="u-mono-num text-[11px] text-lime">{l.num}</span>
                    <span
                      className="u-display text-bone"
                      style={{ fontSize: "var(--t-h3)" }}
                    >
                      {l.label}
                    </span>
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="u-shell flex flex-col gap-6 pb-10"
            >
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  go("#contacto");
                }}
                className="flex items-center justify-center rounded-full bg-lime px-8 py-4 text-[14px] font-bold text-ink"
              >
                Iniciar proyecto
              </a>
              <div className="flex items-center justify-between">
                <span className="u-mono text-[rgba(246,244,240,0.4)]">Barcelona</span>
                <Clock className="u-mono text-[rgba(246,244,240,0.4)]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
