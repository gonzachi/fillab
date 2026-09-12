"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#064E3B] text-white pt-24 pb-16 overflow-hidden">
      {/* Canvas interactivo del hilo y nodo */}
      <HeroCanvas />

      {/* Gradientes sutiles de fondo para profundidad visual */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#3DD6BC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#04382A]/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge de localización y categoría */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/90 backdrop-blur-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#3DD6BC] animate-pulse" />
          <span>Consultora creativa · Barcelona 2026</span>
          <span className="text-white/40">|</span>
          <span className="text-[#3DD6BC]">Diseño & Web</span>
        </div>

        {/* Titular Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Ideas en movimiento para un{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8faf5] to-[#3DD6BC]">
            futuro real.
          </span>
        </h1>

        {/* Claim secundario / Subtítulo */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Un símbolo simple para ideas complejas. Diseñamos y desarrollamos
          páginas web a medida, veloces y de alto impacto, sin las vueltas de una
          agencia grande.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#064E3B] bg-[#3DD6BC] hover:bg-white rounded-full transition-all duration-300 shadow-lg shadow-[#3DD6BC]/20 hover:shadow-[#3DD6BC]/40 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
          >
            <span>Contame tu proyecto</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#manifiesto"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-200 w-full sm:w-auto backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#3DD6BC]" />
            <span>Leer Manifiesto</span>
          </a>
        </div>

        {/* Pilares clave */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-white/60 uppercase tracking-wider">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
            <span>Pensar</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
            <span>Experimentar</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
            <span>Construir</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
            <span>Transformar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
