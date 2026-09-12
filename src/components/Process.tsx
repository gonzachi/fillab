"use client";

import React from "react";
import { Lightbulb, FlaskConical, Layers, Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Pensar",
    icon: Lightbulb,
    description: "Entendemos la esencia de tu negocio, tu audiencia y tus objetivos antes de tirar una sola línea de código.",
  },
  {
    num: "02",
    title: "Experimentar",
    icon: FlaskConical,
    description: "Prototipamos opciones visuales, testeamos interacciones y definimos la arquitectura sin atarnos a plantillas.",
  },
  {
    num: "03",
    title: "Construir",
    icon: Layers,
    description: "Desarrollo artesanal con Next.js y código modular. Rápido, accesible y optimizado para móviles y retina.",
  },
  {
    num: "04",
    title: "Transformar",
    icon: Zap,
    description: "Publicación en Vercel, optimización de métricas clave y lanzamiento de un sitio que impulsa tu futuro.",
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      className="py-24 border-y"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#2E1A47] text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: "var(--surface-pill)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E1A47]" />
            <span>Cómo trabajamos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            De la idea al impacto
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Un proceso lineal, transparente y sin burocracia que te mantiene al tanto en cada etapa.
          </p>
        </div>

        {/* Pasos */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
          style={{ backgroundColor: "var(--card-border)", borderColor: "var(--card-border)" }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={step.title}
                className="relative flex flex-col p-7 transition-colors duration-300 group"
                style={{ backgroundColor: "var(--card-bg)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-muted)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--card-bg)")}
              >
                {/* Número y flecha */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[11px] font-bold tracking-[0.12em] font-mono"
                    style={{ color: "var(--surface)", opacity: 0.5 }}
                  >
                    {step.num}
                  </span>
                  {!isLast && (
                    <span className="hidden lg:block text-xs font-light" style={{ color: "var(--text-secondary)", opacity: 0.3 }}>
                      →
                    </span>
                  )}
                </div>

                {/* Ícono */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:bg-[#2E1A47] group-hover:text-[#C8FF4D]"
                  style={{ backgroundColor: "var(--surface-pill)", color: "var(--surface)" }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3
                  className="text-lg font-bold mb-2 transition-colors duration-200 group-hover:text-[#2E1A47]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>

                {/* Acento inferior en hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#C8FF4D] group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
