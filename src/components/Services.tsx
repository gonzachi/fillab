"use client";

import React from "react";
import { Palette, Code2, Gauge, RefreshCw, ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="que-hacemos" className="py-24 text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Encabezado */}
        <div className="max-w-2xl mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#2E1A47] text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: "var(--surface-pill)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E1A47]" />
            <span>Qué hacemos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
            Páginas web a medida.{" "}
            <span style={{ color: "var(--surface)" }}>Rápidas y sin vueltas.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Combinamos una dirección de arte cuidada con ingeniería de vanguardia.
            Sin capas de gestión innecesarias.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Destacada (Span 2) */}
          <div
            className="md:col-span-2 rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C8FF4D]/6 rounded-full blur-2xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-[#2E1A47] text-[#C8FF4D] flex items-center justify-center mb-6 shadow-sm">
              <Palette className="w-5 h-5" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--surface)" }}>
                  01 / Explorar & Crear
                </span>
                <h3 className="text-xl font-bold mt-1 mb-3" style={{ color: "var(--text-primary)" }}>
                  Diseño de Interfaz & Identidad Digital
                </h3>
              </div>
              <span className="opacity-30 group-hover:opacity-80 group-hover:text-[#2E1A47] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1" style={{ color: "var(--text-secondary)" }}>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
              Diseño web centrado en la personalidad única de tu marca. Estructuras claras,
              microinteracciones pensadas y jerarquía visual que guía a tus usuarios directo a la acción.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["UI / UX", "Design Systems", "Prototipos"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium border"
                  style={{ backgroundColor: "var(--surface-pill)", color: "var(--text-primary)", borderColor: "var(--card-border)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Desarrollo — fondo violeta oscuro */}
          <div className="bg-[#2E1A47] text-white rounded-2xl p-8 hover:bg-[#3d2460] transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#C8FF4D]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/10 text-[#C8FF4D] flex items-center justify-center mb-6">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#C8FF4D]/80">
              02 / Construir
            </span>
            <h3 className="text-xl font-bold mt-1 mb-3 text-white">
              Desarrollo Frontend de Vanguardia
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Sitios construidos en Next.js, React y Tailwind. Código limpio, semántico y preparado para escalar.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[["Next.js", false], ["TypeScript", false], ["React 19", true]].map(([tag, accent]) => (
                <span
                  key={tag as string}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    accent
                      ? "bg-[#C8FF4D]/15 text-[#C8FF4D] border-[#C8FF4D]/20"
                      : "bg-white/8 text-white/80 border-white/10"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: SEO & Velocidad */}
          <div
            className="rounded-2xl p-8 border hover:shadow-lg transition-all duration-300 group"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#2E1A47] group-hover:text-[#C8FF4D]"
              style={{ backgroundColor: "var(--surface-pill)", color: "var(--surface)" }}
            >
              <Gauge className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--surface)" }}>
              03 / Medir
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2" style={{ color: "var(--text-primary)" }}>
              Velocidad & SEO
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              95+ en Google Lighthouse. Carga instantánea, SEO sólido y conversión real desde el primer segundo.
            </p>
          </div>

          {/* Card 4: Mantenimiento (Span 2) */}
          <div
            className="md:col-span-2 rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C8FF4D]/5 rounded-full blur-2xl pointer-events-none" />
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#2E1A47] group-hover:text-[#C8FF4D]"
              style={{ backgroundColor: "rgba(200, 255, 77, 0.12)", color: "var(--surface)" }}
            >
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--surface)" }}>
                  04 / Evolucionar
                </span>
                <h3 className="text-xl font-bold mt-1 mb-3" style={{ color: "var(--text-primary)" }}>
                  Acompañamiento & Mantenimiento
                </h3>
              </div>
              <span className="opacity-30 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1" style={{ color: "var(--surface)" }}>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
              No entregamos una web y desaparecemos. Soporte continuo, mejoras de contenido,
              actualizaciones de seguridad y nuevas funcionalidades cuando las necesites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
