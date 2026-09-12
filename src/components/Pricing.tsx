"use client";

import React from "react";
import { Check } from "lucide-react";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import Button from "./Button";

/**
 * Precios orientativos, no una tarifa cerrada: lo dice el propio texto de
 * cierre. Sirven para que quien visita la página pueda autocalificarse
 * antes de escribir, no como cotización final — eso siempre sale de una
 * conversación real sobre el alcance.
 */

const tiers = [
  {
    name: "Arranque",
    price: "1.200€",
    unit: "desde",
    pitch: "Una landing lista para convertir, de punta a punta.",
    features: [
      "Diseño a medida, no plantilla",
      "Desarrollo en Next.js",
      "Responsive completo",
      "Una ronda de revisión",
      "Dominio y despliegue incluidos",
    ],
    featured: false,
  },
  {
    name: "Estándar",
    price: "2.800€",
    unit: "desde",
    pitch: "El sitio completo de un negocio que ya sabe lo que quiere decir.",
    features: [
      "Todo lo de Arranque",
      "Hasta 6 secciones a medida",
      "Panel de contenido (CMS)",
      "SEO técnico y Core Web Vitals",
      "Dos rondas de revisión",
      "30 días de soporte post-lanzamiento",
    ],
    featured: true,
  },
  {
    name: "A medida",
    price: "A consultar",
    unit: "",
    pitch: "Producto, e-commerce o integración con alcance propio.",
    features: [
      "Alcance definido en discovery",
      "Arquitectura pensada para escalar",
      "Integraciones — pagos, CRM, API",
      "Soporte continuo",
      "Roadmap de evolución",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="bg-ink py-24 sm:py-32">
      <div className="u-shell">
        <SectionMarker index="08" label="Precios" />

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <Reveal mode="up" duration={1.05}>
              <h2
                className="u-display max-w-[18ch] text-bone"
                style={{ fontSize: "var(--t-h2)" }}
              >
                Precios claros,{" "}
                <span className="u-serif text-lime">sin sorpresas.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end md:col-span-5">
            <Reveal mode="blur" delay={0.15} duration={1.1}>
              <p className="max-w-[38ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                Tres puntos de partida orientativos. La cifra final sale
                siempre de una primera conversación sobre el alcance real —
                nunca de una tabla genérica.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:mt-20 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} mode="up" delay={i * 0.08} duration={0.9}>
              <TierCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <Reveal mode="fade" delay={0.3} duration={0.8}>
          <p className="mt-10 max-w-[60ch] text-[var(--t-xs)] leading-relaxed text-[var(--fg-faint)]">
            * Precios orientativos en euros, sin IVA. Cada proyecto se
            cotiza según su alcance real después de la primera llamada — lo
            de arriba es para que sepas si encajamos antes de escribir.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <article
      className={`group relative flex h-full flex-col border p-8 transition-colors duration-500 sm:p-10 ${
        tier.featured
          ? "border-lime/40 bg-[var(--hair-soft)]"
          : "border-[var(--hair)] hover:border-[var(--fg-faint)]"
      }`}
    >
      {tier.featured && (
        <span className="u-mono absolute right-8 top-8 text-lime sm:right-10 sm:top-10">
          Más elegido
        </span>
      )}

      <span className="u-mono mb-6 block text-[var(--fg-faint)]">
        {tier.name}
      </span>

      <div className="mb-6">
        {tier.unit && (
          <span className="u-mono mr-2 text-[var(--fg-faint)]">
            {tier.unit}
          </span>
        )}
        <span
          className="u-display-tight text-bone"
          style={{ fontSize: "var(--t-h3)" }}
        >
          {tier.price}
        </span>
      </div>

      <p className="mb-8 min-h-[3em] max-w-[32ch] text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)]">
        {tier.pitch}
      </p>

      <ul className="mb-10 flex-1 space-y-3.5 border-t border-[var(--hair)] pt-7">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check
              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                tier.featured ? "text-lime" : "text-[var(--fg-faint)]"
              }`}
              strokeWidth={2.5}
            />
            <span className="text-[var(--t-sm)] text-[var(--fg-dim)]">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        href="#contacto"
        variant={tier.featured ? "lime" : "ghost"}
        size="md"
        cursorLabel="Hablemos"
        className="w-full"
      >
        Iniciar conversación
      </Button>
    </article>
  );
}
