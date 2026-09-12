"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";

/**
 * Fil Lab es un estudio nuevo: todavía no hay una batería de clientes para
 * mostrar como casos de éxito. En vez de simular capturas de proyectos que
 * no existen, esta sección muestra los formatos reales en los que trabajamos
 * — cada uno con su propio blueprint abstracto en lugar de una pantalla
 * inventada. Cuando haya trabajo entregado, esta es la sección que se
 * reemplaza por casos concretos.
 */

const formats = [
  {
    num: "01",
    title: "Landing de",
    accent: "producto",
    pitch: "Para lanzar algo nuevo y validarlo rápido, sin sumar peso.",
    time: "2–3 semanas",
    tags: ["Una página", "Alto impacto", "Conversión"],
    big: true,
    blueprint: "landing" as const,
  },
  {
    num: "02",
    title: "Sitio",
    accent: "corporativo",
    pitch: "La carta de presentación completa de un negocio o estudio.",
    time: "4–6 semanas",
    tags: ["Multi-sección", "CMS opcional", "SEO"],
    big: false,
    blueprint: "corporate" as const,
  },
  {
    num: "03",
    title: "Producto",
    accent: "digital",
    pitch: "Interfaces de producto, paneles y portales de cliente.",
    time: "6–10 semanas",
    tags: ["Next.js", "Diseño de producto", "Escalable"],
    big: false,
    blueprint: "product" as const,
  },
  {
    num: "04",
    title: "Tienda",
    accent: "a medida",
    pitch: "E-commerce propio, sin comisión de plataforma ni límite de plantilla.",
    time: "5–8 semanas",
    tags: ["Pagos", "Inventario", "Rendimiento"],
    big: false,
    blueprint: "commerce" as const,
  },
];

export default function Formats() {
  return (
    <section id="formatos" className="bg-ink py-24 sm:py-32">
      <div className="u-shell">
        <SectionMarker index="03" label="Formatos" />

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <Reveal mode="up" duration={1.05}>
              <h2
                className="u-display max-w-[18ch] text-bone"
                style={{ fontSize: "var(--t-h2)" }}
              >
                Cuatro formas de{" "}
                <span className="u-serif text-lime">tomar forma.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end md:col-span-5">
            <Reveal mode="blur" delay={0.15} duration={1.1}>
              <p className="max-w-[38ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                Estudio nuevo, sin catálogo de clientes todavía que enseñar
                con orgullo falso. Esto es lo que sí podemos mostrar hoy: los
                formatos que dominamos y el criterio con el que los armamos.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bento: una tarjeta grande, tres chicas */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-2">
          {formats.map((f, i) => (
            <FormatCard key={f.num} format={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FormatCard({
  format,
  index,
}: {
  format: (typeof formats)[number];
  index: number;
}) {
  return (
    <Reveal
      mode="up"
      delay={index * 0.08}
      duration={0.9}
      className={format.big ? "lg:col-span-2" : ""}
    >
      <article className="group relative h-full overflow-hidden border border-[var(--hair)] p-8 transition-colors duration-500 hover:border-[var(--fg-faint)] sm:p-10">
        <div
          className={`grid gap-8 ${
            format.big ? "lg:grid-cols-2 lg:items-center" : ""
          }`}
        >
          {/* Texto */}
          <div>
            <div className="mb-8 flex items-baseline justify-between">
              <span className="u-mono-num text-[var(--t-xs)] text-[var(--fg-faint)]">
                {format.num}
              </span>
              <span className="u-mono text-[var(--fg-faint)]">
                {format.time}
              </span>
            </div>

            <h3
              className="u-display mb-4 text-bone"
              style={{ fontSize: format.big ? "var(--t-h3)" : "var(--t-h4)" }}
            >
              {format.title}{" "}
              <span className="u-serif text-[1.05em] text-lime">
                {format.accent}
              </span>
            </h3>

            <p className="mb-8 max-w-[36ch] text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)]">
              {format.pitch}
            </p>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--hair)] pt-5">
              {format.tags.map((tag) => (
                <li key={tag} className="u-mono text-[var(--fg-soft)]">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Blueprint abstracto: el formato dibujado, no un cliente inventado */}
          <div
            className={`relative overflow-hidden rounded-sm bg-[var(--hair-soft)] ${
              format.big ? "h-56 sm:h-64" : "h-40 sm:h-48"
            }`}
          >
            <Blueprint kind={format.blueprint} />
          </div>
        </div>

        <ArrowUpRight className="pointer-events-none absolute right-8 top-8 h-4 w-4 text-[var(--fg-faint)] opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:right-10 sm:top-10" />
      </article>
    </Reveal>
  );
}

/* ─── Blueprints ───────────────────────────────────────────────
   Maquetas de trazo, al estilo de un plano técnico: comunican la
   estructura de cada formato sin simular la pantalla de un cliente
   real que no existe.                                            */

const STROKE = "rgba(246,244,240,0.16)";
const ACCENT = "#C8FF4D";

function Blueprint({
  kind,
}: {
  kind: "landing" | "corporate" | "product" | "commerce";
}) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="399" height="239" fill="none" stroke={STROKE} />
      {kind === "landing" && (
        <>
          <rect x="24" y="28" width="120" height="10" fill={STROKE} />
          <rect x="24" y="52" width="200" height="18" fill="none" stroke={STROKE} />
          <rect x="24" y="82" width="150" height="8" fill={STROKE} opacity="0.6" />
          <rect x="24" y="110" width="90" height="26" rx="13" fill={ACCENT} opacity="0.85" />
          <circle cx="300" cy="150" r="46" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.5" />
          <circle cx="300" cy="150" r="4" fill={ACCENT} />
        </>
      )}
      {kind === "corporate" && (
        <>
          <rect x="24" y="24" width="352" height="28" fill="none" stroke={STROKE} />
          <rect x="24" y="66" width="110" height="60" fill="none" stroke={STROKE} />
          <rect x="145" y="66" width="110" height="60" fill="none" stroke={STROKE} />
          <rect x="266" y="66" width="110" height="60" fill="none" stroke={ACCENT} opacity="0.7" />
          <rect x="24" y="140" width="352" height="8" fill={STROKE} opacity="0.5" />
          <rect x="24" y="160" width="230" height="8" fill={STROKE} opacity="0.3" />
        </>
      )}
      {kind === "product" && (
        <>
          <rect x="24" y="24" width="90" height="192" fill="none" stroke={STROKE} />
          <rect x="36" y="40" width="66" height="8" fill={STROKE} opacity="0.6" />
          <rect x="36" y="58" width="66" height="8" fill={STROKE} opacity="0.4" />
          <rect x="36" y="76" width="40" height="8" fill={ACCENT} opacity="0.7" />
          <rect x="130" y="24" width="246" height="90" fill="none" stroke={STROKE} />
          <polyline
            points="146,96 178,66 210,80 242,48 274,70 306,40 338,58"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.5"
            opacity="0.8"
          />
          <rect x="130" y="128" width="118" height="88" fill="none" stroke={STROKE} />
          <rect x="260" y="128" width="116" height="88" fill="none" stroke={STROKE} />
        </>
      )}
      {kind === "commerce" && (
        <>
          {[0, 1, 2].map((col) => (
            <g key={col} transform={`translate(${24 + col * 122}, 24)`}>
              <rect width="102" height="102" fill="none" stroke={STROKE} />
              <rect x="10" y="116" width="82" height="8" fill={STROKE} opacity="0.6" />
              <rect x="10" y="134" width="46" height="8" fill={ACCENT} opacity="0.7" />
            </g>
          ))}
          <rect x="24" y="176" width="352" height="36" rx="4" fill="none" stroke={ACCENT} opacity="0.6" />
        </>
      )}
    </svg>
  );
}
