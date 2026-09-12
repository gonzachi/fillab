"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import Clock from "./Clock";
import Reveal from "./Reveal";
import { scrollTo } from "@/lib/scroll";

const columns = [
  {
    title: "Secciones",
    links: [
      { label: "Premisa", href: "#premisa" },
      { label: "Lo que hacemos", href: "#que-hacemos" },
      { label: "Proceso", href: "#proceso" },
      { label: "Manifiesto", href: "#manifiesto" },
    ],
  },
  {
    title: "Directo",
    links: [
      { label: "WhatsApp", href: "https://wa.me/34644634884", external: true },
      { label: "gonzalo.chiavassa@gmail.com", href: "mailto:gonzalo.chiavassa@gmail.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24">
      <div className="u-shell">
        {/* ── Columnas ───────────────────────────────────────── */}
        <div className="grid gap-12 border-t border-[var(--hair)] pt-12 md:grid-cols-12">
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <span className="u-mono mb-6 block text-[var(--fg-faint)]">
                {col.title}
              </span>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={
                        l.href.startsWith("#")
                          ? (e) => {
                              e.preventDefault();
                              scrollTo(l.href);
                            }
                          : undefined
                      }
                      className="u-link text-[var(--t-sm)] text-[var(--fg-dim)] transition-colors duration-300 hover:text-bone"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <span className="u-mono mb-6 block text-[var(--fg-faint)]">Lugar</span>
            <p className="text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)]">
              Barcelona, España
              <br />
              <Clock className="text-[var(--fg-soft)]" /> CET
            </p>
          </div>

          <div className="md:col-span-3 md:text-right">
            <span className="u-mono mb-6 block text-[var(--fg-faint)]">Estado</span>
            <p className="inline-flex items-center gap-2.5 text-[var(--t-sm)] text-[var(--fg-dim)]">
              <span className="u-pulse h-1.5 w-1.5 rounded-full bg-lime" />
              Tomando proyectos
            </p>
          </div>
        </div>

        {/* ── Wordmark de cierre ─────────────────────────────── */}
        <Reveal mode="mask" duration={1.3} margin="-5%">
          <div className="u-outline-hover mt-20 cursor-none select-none">
            <h2
              className="u-display-tight u-outline whitespace-nowrap text-center"
              style={{ fontSize: "clamp(4rem,19.5vw,22rem)" }}
              aria-label="Fil Lab"
            >
              FIL LAB
            </h2>
          </div>
        </Reveal>
      </div>

      {/* ── Barra legal ──────────────────────────────────────── */}
      <div className="u-shell">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--hair)] py-7 sm:flex-row">
          <p className="u-mono text-[var(--fg-faint)]">
            © {new Date().getFullYear()} Fil Lab · Todos los derechos reservados
          </p>

          <p className="u-mono text-[var(--fg-faint)]">
            Diseñado y programado en Barcelona
          </p>

          <button
            onClick={() => scrollTo(0)}
            data-cursor="Arriba"
            aria-label="Volver arriba"
            className="group flex items-center gap-2.5 rounded-full border border-[var(--hair)] px-4 py-2 transition-colors duration-500 hover:border-lime"
          >
            <span className="u-mono text-[var(--fg-soft)] transition-colors duration-500 group-hover:text-lime">
              Arriba
            </span>
            <ArrowUp className="h-3 w-3 text-[var(--fg-soft)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-lime" />
          </button>
        </div>
      </div>
    </footer>
  );
}
