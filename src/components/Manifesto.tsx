"use client";

import React from "react";

export default function Manifesto() {
  const manifestoLines = [
    "Creemos en hacer las cosas bien, no rápido.",
    "Creemos en innovar con tecnología, no en repetir fórmulas.",
    "Creemos en hacer equipo — con vos, no para vos.",
    "Creemos en soluciones a medida. Nunca genéricas.",
    "Fil Lab nace de la curiosidad, y crece con cuidado.",
  ];

  return (
    <section id="manifiesto" className="py-28 bg-[#F4F4F2] text-[#1F2A27] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Bloque estilo Diccionario */}
        <div className="border-l-2 border-[#064E3B] pl-6 py-2 mb-20 space-y-6">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-[#064E3B]">FIL</span>
              <span className="text-xs font-mono text-[#888888] italic">sust., cat. /fil/</span>
            </div>
            <p className="mt-1 text-sm sm:text-base text-[#1F2A27]/80 leading-relaxed font-normal">
              Hilo, hebra. Lo que conecta un extremo con otro, punto a punto, hasta volverse algo.
            </p>
          </div>

          <div className="pt-2 border-t border-[#1F2A27]/10">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-[#064E3B]">NODO</span>
              <span className="text-xs font-mono text-[#888888] italic">sust.</span>
            </div>
            <p className="mt-1 text-sm sm:text-base text-[#1F2A27]/80 leading-relaxed font-normal">
              Punto donde varios hilos se encuentran y se convierten en algo nuevo. Cada proyecto, un nodo.
            </p>
          </div>
        </div>

        {/* Declaraciones editoriales del Manifiesto */}
        <div className="space-y-8 sm:space-y-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
            <span>Manifiesto</span>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {manifestoLines.map((line, idx) => (
              <p
                key={idx}
                className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight transition-all duration-300 ${
                  idx === manifestoLines.length - 1
                    ? "text-[#064E3B]"
                    : "text-[#1F2A27]/90 hover:text-[#064E3B]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
