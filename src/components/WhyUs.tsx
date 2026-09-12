"use client";

import React from "react";
import { CheckCircle2, UserCheck, ShieldCheck, Zap } from "lucide-react";

const differentiators = [
  {
    icon: UserCheck,
    title: "Trato directo con quien diseña y programa",
    description:
      "Sin ejecutivos de cuentas ni cadenas infinitas de emails. Hablás directamente con quien toma las decisiones de diseño y escribe el código.",
  },
  {
    icon: Zap,
    title: "Tiempos reales, sin burocracia",
    description:
      "Las agencias grandes tardan meses en coordinar reuniones internas. Acá el feedback se implementa en días con una velocidad boutique.",
  },
  {
    icon: ShieldCheck,
    title: "Código propio, sin ataduras",
    description:
      "Tu proyecto es tuyo. Usamos estándares abiertos (Next.js, Tailwind, Vercel) para que nunca quedes atrapado en plataformas cerradas.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="por-que"
      className="py-24 border-t"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna izquierda */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#2E1A47] text-xs font-semibold uppercase tracking-wider"
              style={{ backgroundColor: "var(--surface-pill)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E1A47]" />
              <span>Por qué Fil Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
              Un símbolo simple para{" "}
              <span style={{ color: "var(--surface)" }}>ideas complejas.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              No necesitás una estructura pesada de 50 personas para tener una web de primer nivel internacional.
              Necesitás atención dedicada, criterio visual y foco en lo que realmente mueve tu negocio.
            </p>

            {/* Tarjeta de compromiso */}
            <div
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: "var(--surface-pill)", borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center gap-3 font-semibold text-sm mb-1 text-[#2E1A47]">
                <CheckCircle2 className="w-5 h-5 text-[#C8FF4D] bg-[#2E1A47] rounded-full p-0.5" />
                <span>Compromiso boutique</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Tomamos un número limitado de proyectos simultáneos para garantizar dedicación total a cada detalle.
              </p>
            </div>
          </div>

          {/* Columna derecha: diferenciadores */}
          <div className="lg:col-span-7 space-y-4">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-7 rounded-2xl border flex items-start gap-6 group transition-all duration-300 hover:shadow-lg hover:border-[#2E1A47]/30"
                  style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#2E1A47] group-hover:text-[#C8FF4D]"
                    style={{ backgroundColor: "var(--surface-pill)", color: "var(--surface)" }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-[#2E1A47]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
