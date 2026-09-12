"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#2E1A47] text-white overflow-hidden">
      {/* Canvas interactivo */}
      <HeroCanvas accentColor="#C8FF4D" baseColor="128, 77, 255" />

      {/* Gradientes de profundidad */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#1E0A30] to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#C8FF4D]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#120A1C]/70 rounded-full blur-3xl pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/12 text-xs font-medium text-white/75 backdrop-blur-sm mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF4D] animate-pulse" />
          <span>Consultora creativa · Barcelona 2026</span>
          <span className="w-px h-3 bg-white/20 mx-1" />
          <span className="text-[#C8FF4D] font-semibold">Diseño & Web</span>
        </div>

        {/* H1 */}
        <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-8">
          Ideas en movimiento{" "}
          <br className="hidden sm:block" />
          para un{" "}
          <span className="text-[#C8FF4D]">
            futuro real.
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed mb-12">
          Diseñamos y construimos sitios web a medida — rápidos, cuidados y sin
          la burocracia de las agencias grandes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-[#2E1A47] bg-[#C8FF4D] hover:bg-white rounded-full transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.04] active:scale-[0.98] w-full sm:w-auto"
          >
            <span>Contame tu proyecto</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#manifiesto"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-white/75 hover:text-white bg-transparent hover:bg-white/8 border border-white/15 hover:border-white/30 rounded-full transition-all duration-250 w-full sm:w-auto"
          >
            <span>Nuestro Manifiesto</span>
          </a>
        </div>

        {/* Pilares */}
        <div className="mt-20 pt-8 border-t border-white/8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-5 font-medium">
            Nuestra metodología
          </p>
          <div className="flex items-center justify-center gap-0">
            {["Pensar", "Experimentar", "Construir", "Transformar"].map((pilar, idx, arr) => (
              <React.Fragment key={pilar}>
                <span className="text-xs font-semibold text-white/50 tracking-wide uppercase">
                  {pilar}
                </span>
                {idx < arr.length - 1 && (
                  <span className="mx-3 sm:mx-5 text-[#C8FF4D]/40 text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/25 animate-bounce">
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
