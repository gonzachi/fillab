"use client";

import React from "react";

const manifestoLines = [
  "Creemos en hacer las cosas bien, no rápido.",
  "Creemos en innovar con tecnología, no en repetir fórmulas.",
  "Creemos en hacer equipo — con vos, no para vos.",
  "Creemos en soluciones a medida. Nunca genéricas.",
  "Fil Lab nace de la curiosidad, y crece con cuidado.",
];

export default function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="py-28 bg-[#064E3B] text-white relative overflow-hidden"
    >
      {/* Luz ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#3DD6BC]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Bloque estilo Diccionario — sobre fondo verde oscuro */}
        <div className="border-l-2 border-[#3DD6BC]/60 pl-6 py-1 mb-20 space-y-7">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold tracking-tight text-white">FIL</span>
              <span className="text-xs font-mono text-white/40 italic">sust., cat. /fil/</span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-white/65 leading-relaxed max-w-lg">
              Hilo, hebra. Lo que conecta un extremo con otro, punto a punto, hasta volverse algo.
            </p>
          </div>

          <div className="pt-5 border-t border-white/10">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold tracking-tight text-white">NODO</span>
              <span className="text-xs font-mono text-white/40 italic">sust.</span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-white/65 leading-relaxed max-w-lg">
              Punto donde varios hilos se encuentran y se convierten en algo nuevo. Cada proyecto, un nodo.
            </p>
          </div>
        </div>

        {/* Label del Manifiesto */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-[#3DD6BC] text-xs font-semibold uppercase tracking-wider mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
          <span>Manifiesto</span>
        </div>

        {/* Líneas del Manifiesto */}
        <div className="space-y-5 sm:space-y-7">
          {manifestoLines.map((line, idx) => {
            const isLast = idx === manifestoLines.length - 1;
            return (
              <p
                key={idx}
                className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] transition-colors duration-300 cursor-default ${
                  isLast
                    ? "text-[#3DD6BC]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
