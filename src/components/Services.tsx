"use client";

import React from "react";
import { Palette, Code2, Gauge, RefreshCw, ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="que-hacemos" className="py-24 bg-[#F4F4F2] text-[#1F2A27]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Encabezado de sección */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/8 text-[#064E3B] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
            <span>Qué hacemos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2A27] leading-tight">
            Páginas web a medida.{" "}
            <span className="text-[#064E3B]">Rápidas y sin vueltas.</span>
          </h2>
          <p className="mt-4 text-base text-[#1F2A27]/60 leading-relaxed">
            Combinamos una dirección de arte cuidada con ingeniería de vanguardia.
            Sin capas de gestión innecesarias.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Destacada (Span 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-[#1F2A27]/8 hover:border-[#064E3B]/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
            {/* Decoración de fondo sutil */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#064E3B]/3 rounded-full blur-2xl pointer-events-none" />

            <div className="w-11 h-11 rounded-xl bg-[#064E3B] text-[#3DD6BC] flex items-center justify-center mb-6 shadow-sm">
              <Palette className="w-5 h-5" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#064E3B]/60">
                  01 / Explorar & Crear
                </span>
                <h3 className="text-xl font-bold mt-1 mb-3 text-[#1F2A27]">
                  Diseño de Interfaz & Identidad Digital
                </h3>
              </div>
              <span className="text-[#888888]/50 group-hover:text-[#064E3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm text-[#1F2A27]/60 leading-relaxed max-w-xl">
              Diseño web centrado en la personalidad única de tu marca. Estructuras claras,
              microinteracciones pensadas y una jerarquía visual que guía a tus usuarios directo a la acción.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/70 font-medium border border-[#1F2A27]/6">UI / UX</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/70 font-medium border border-[#1F2A27]/6">Design Systems</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/70 font-medium border border-[#1F2A27]/6">Prototipos</span>
            </div>
          </div>

          {/* Card 2: Desarrollo Web — fondo verde oscuro */}
          <div className="bg-[#064E3B] text-white rounded-2xl p-8 hover:bg-[#033629] transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#3DD6BC]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/10 text-[#3DD6BC] flex items-center justify-center mb-6">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3DD6BC]/80">
              02 / Construir
            </span>
            <h3 className="text-xl font-bold mt-1 mb-3 text-white">
              Desarrollo Frontend de Vanguardia
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              Sitios construidos en Next.js, React y Tailwind. Código limpio, semántico y preparado para escalar.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/8 text-white/80 border border-white/10">Next.js</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/8 text-white/80 border border-white/10">TypeScript</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3DD6BC]/15 text-[#3DD6BC] border border-[#3DD6BC]/20">React 19</span>
            </div>
          </div>

          {/* Card 3: Optimización & Rendimiento */}
          <div className="bg-white rounded-2xl p-8 border border-[#1F2A27]/8 hover:border-[#064E3B]/20 hover:shadow-lg transition-all duration-300 group">
            <div className="w-11 h-11 rounded-xl bg-[#F4F4F2] text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#3DD6BC] flex items-center justify-center mb-6 transition-colors duration-300">
              <Gauge className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#064E3B]/60">
              03 / Medir
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2 text-[#1F2A27]">
              Velocidad & SEO
            </h3>
            <p className="text-sm text-[#1F2A27]/60 leading-relaxed">
              95+ en Google Lighthouse. Carga instantánea, SEO sólido y conversión real desde el primer segundo.
            </p>
          </div>

          {/* Card 4: Mantenimiento (Span 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-[#1F2A27]/8 hover:border-[#064E3B]/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#3DD6BC]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-[#3DD6BC]/15 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#3DD6BC] flex items-center justify-center mb-6 transition-colors duration-300">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#064E3B]/60">
                  04 / Evolucionar
                </span>
                <h3 className="text-xl font-bold mt-1 mb-3 text-[#1F2A27]">
                  Acompañamiento & Mantenimiento
                </h3>
              </div>
              <span className="text-[#888888]/50 group-hover:text-[#064E3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm text-[#1F2A27]/60 leading-relaxed max-w-xl">
              No entregamos una web y desaparecemos. Soporte continuo, mejoras de contenido,
              actualizaciones de seguridad y nuevas funcionalidades cuando las necesites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
