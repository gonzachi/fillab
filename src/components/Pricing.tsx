"use client";

import React from "react";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import Button from "./Button";

/**
 * Nada de paquetes cerrados: un catálogo de precios fijos obliga a cada
 * proyecto a encajar en una caja que no eligió. Esta sección explica qué
 * variables mueven el número y cómo se llega a él, en vez de fingir que
 * tres tarjetas genéricas cubren cualquier necesidad.
 */

const factors = [
  {
    title: "Alcance",
    detail:
      "Cuántas páginas, secciones y funciones necesita el proyecto. Una landing y un portal con áreas privadas no se cotizan igual, aunque los dos sean “un sitio web”.",
  },
  {
    title: "Integraciones",
    detail:
      "Pagos, CRM, analítica o herramientas que ya usás. Conectar con lo que ya tenés suma trabajo de investigación que varía según cada herramienta.",
  },
  {
    title: "Contenido",
    detail:
      "Quién escribe, traduce y arma el material final. Si ya está listo, vamos directo al diseño; si hay que crearlo, es una etapa propia del presupuesto.",
  },
  {
    title: "Plazo",
    detail:
      "Margen normal de trabajo o entrega contra reloj. Un plazo ajustado es una variable real del número, no una condición que se asume gratis.",
  },
  {
    title: "Acompañamiento",
    detail:
      "Lanzamiento puntual o evolución continua después. Se conversa aparte, con la frecuencia que tenga sentido para tu negocio.",
  },
];

const steps = [
  {
    num: "01",
    title: "Conversación",
    body: "Sin costo ni compromiso. Nos contás qué necesitás y por qué.",
  },
  {
    num: "02",
    title: "Alcance",
    body: "Definimos juntos qué entra, qué no, y en qué plazo tiene sentido.",
  },
  {
    num: "03",
    title: "Propuesta",
    body: "Presupuesto cerrado, por escrito, antes de empezar. Sin sorpresas después.",
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
                className="u-display max-w-[20ch] text-bone"
                style={{ fontSize: "var(--t-h2)" }}
              >
                Nada de paquetes.{" "}
                <span className="u-serif text-lime">Presupuesto a medida.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end md:col-span-5">
            <Reveal mode="blur" delay={0.15} duration={1.1}>
              <p className="max-w-[38ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                Un catálogo de precios fijos obliga a tu proyecto a encajar
                en una caja que no eligió. Preferimos partir de lo que
                realmente necesitás y cotizar eso — ni más, ni menos.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Qué mueve el número */}
        <div className="mt-16 sm:mt-20">
          <Reveal mode="fade" duration={0.7}>
            <span className="u-mono mb-2 block text-[var(--fg-faint)]">
              Qué mueve el número
            </span>
          </Reveal>

          <div>
            {factors.map((f, i) => (
              <Reveal key={f.title} mode="fade" duration={0.8} delay={i * 0.05}>
                <div className="grid items-baseline gap-3 border-t border-[var(--hair)] py-7 last:border-b sm:py-8 md:grid-cols-12 md:gap-10">
                  <span className="u-mono-num text-[var(--t-2xs)] text-[var(--fg-faint)] md:col-span-1">
                    0{i + 1}
                  </span>
                  <h3
                    className="u-display text-bone md:col-span-3"
                    style={{ fontSize: "var(--t-h4)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="max-w-[56ch] text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)] md:col-span-8">
                    {f.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Cómo llegamos al número */}
        <div className="mt-20 grid grid-cols-1 border-t border-[var(--hair)] sm:mt-28 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.num}
              mode="up"
              delay={i * 0.08}
              duration={0.9}
              className="border-b border-[var(--hair)] py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <span className="u-mono-num mb-6 block text-lime">{s.num}</span>
              <h3
                className="u-display mb-3 text-bone"
                style={{ fontSize: "var(--t-h4)" }}
              >
                {s.title}
              </h3>
              <p className="max-w-[30ch] text-[var(--t-sm)] leading-relaxed text-[var(--fg-dim)]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Cierre */}
        <Reveal mode="up" delay={0.1} duration={1} className="mt-20 sm:mt-28">
          <div className="flex flex-col items-start justify-between gap-8 border-t border-[var(--hair)] pt-12 sm:flex-row sm:items-center">
            <p className="max-w-[36ch] text-[var(--t-lead)] leading-snug text-bone">
              Contanos tu proyecto y te devolvemos un número real, no una
              estimación genérica.
            </p>
            <Button href="#contacto" size="lg" cursorLabel="Hablemos">
              Pedir presupuesto
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
