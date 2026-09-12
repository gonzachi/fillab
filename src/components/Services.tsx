"use client";

import React from "react";
import { Palette, Code2, Gauge, RefreshCw, ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="que-hacemos" className="py-24 bg-[#F4F4F2] text-[#1F2A27]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado de sección */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
            <span>Qué hacemos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F2A27] leading-tight">
            Páginas web a medida. <br />
            <span className="text-[#064E3B]">Rápidas, limpias y sin vueltas.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1F2A27]/70 leading-relaxed">
            Creamos productos digitales que combinan una dirección de arte
            cuidada con ingeniería de vanguardia. Sin capas de gestión innecesarias.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Destacada (Span 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-[#1F2A27]/10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-[#3DD6BC] flex items-center justify-center mb-6 shadow-sm">
              <Palette className="w-6 h-6" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  01 / Explorar & Crear
                </span>
                <h3 className="text-2xl font-bold mt-1 mb-3 text-[#1F2A27]">
                  Diseño de Interfaz & Identidad Digital
                </h3>
              </div>
              <span className="text-[#888888] group-hover:text-[#064E3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#1F2A27]/70 leading-relaxed max-w-xl">
              Diseño web centrado en la personalidad única de tu marca. Estructuras claras,
              microinteracciones pensadas y una jerarquía visual que guía a tus usuarios directo a la acción.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/80 font-medium">UI / UX</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/80 font-medium">Design Systems</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F4F2] text-[#1F2A27]/80 font-medium">Prototipos interactivos</span>
            </div>
          </div>

          {/* Card 2: Desarrollo Web */}
          <div className="bg-[#064E3B] text-white rounded-3xl p-8 sm:p-10 border border-[#064E3B] shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#3DD6BC] flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3DD6BC]">
              02 / Construir
            </span>
            <h3 className="text-2xl font-bold mt-1 mb-3 text-white">
              Desarrollo Frontend de Vanguardia
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Sitios web construidos en Next.js, React y Tailwind. Código limpio, semántico, accesible y preparado para escalar sin dolores de cabeza.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90">Next.js</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90">TypeScript</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3DD6BC]/20 text-[#3DD6BC]">React 19</span>
            </div>
          </div>

          {/* Card 3: Optimización & Rendimiento */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1F2A27]/10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F4F2] text-[#064E3B] flex items-center justify-center mb-6">
              <Gauge className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              03 / Medir
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2 text-[#1F2A27]">
              Velocidad & SEO
            </h3>
            <p className="text-sm text-[#1F2A27]/70 leading-relaxed">
              Puntajes de 95+ en Google Lighthouse. Carga instantánea, optimización para buscadores y conversión real desde el primer segundo.
            </p>
          </div>

          {/* Card 4: Mantenimiento (Span 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-[#1F2A27]/10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#3DD6BC]/20 text-[#064E3B] flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  04 / Evolucionar
                </span>
                <h3 className="text-2xl font-bold mt-1 mb-3 text-[#1F2A27]">
                  Acompañamiento & Mantenimiento
                </h3>
              </div>
              <span className="text-[#888888] group-hover:text-[#064E3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#1F2A27]/70 leading-relaxed max-w-xl">
              No entregamos una web y desaparecemos. Brindamos soporte continuo, mejoras de contenido, actualizaciones de seguridad y nuevas funcionalidades cuando tu proyecto las necesite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
