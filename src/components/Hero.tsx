"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#064E3B] text-white overflow-hidden">
      {/* Canvas interactivo del hilo y nodo */}
      <HeroCanvas />

      {/* Gradientes de profundidad */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#033629] to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#3DD6BC]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#022B1E]/80 rounded-full blur-3xl pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/12 text-xs font-medium text-white/80 backdrop-blur-sm mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC] animate-pulse" />
          <span>Consultora creativa · Barcelona 2026</span>
          <span className="w-px h-3 bg-white/25 mx-1" />
          <span className="text-[#3DD6BC] font-semibold">Diseño & Web</span>
        </div>

        {/* H1: máximo impacto, ritmo de lectura natural */}
        <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-8">
          Ideas en movimiento{" "}
          <br className="hidden sm:block" />
          para un{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a7f3e2] via-[#3DD6BC] to-[#14b8a6]">
            futuro real.
          </span>
        </h1>

        {/* Subtítulo: más corto, más directo */}
        <p className="text-base sm:text-lg text-white/65 max-w-xl mx-auto leading-relaxed mb-12">
          Diseñamos y construimos sitios web a medida — rápidos, cuidados y sin
          la burocracia de las agencias grandes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#064E3B] bg-[#3DD6BC] hover:bg-white rounded-full transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.04] active:scale-[0.98] w-full sm:w-auto"
          >
            <span>Contame tu proyecto</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#manifiesto"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-white/80 hover:text-white bg-transparent hover:bg-white/8 border border-white/15 hover:border-white/30 rounded-full transition-all duration-250 w-full sm:w-auto"
          >
            <span>Nuestro Manifiesto</span>
          </a>
        </div>

        {/* Pilares — separador visual inferior */}
        <div className="mt-20 pt-8 border-t border-white/8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-5 font-medium">
            Nuestra metodología
          </p>
          <div className="flex items-center justify-center gap-0">
            {["Pensar", "Experimentar", "Construir", "Transformar"].map((pilar, idx, arr) => (
              <React.Fragment key={pilar}>
                <span className="text-xs font-semibold text-white/55 tracking-wide uppercase">
                  {pilar}
                </span>
                {idx < arr.length - 1 && (
                  <span className="mx-3 sm:mx-5 text-[#3DD6BC]/40 text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
