"use client";

import React from "react";
import { Lightbulb, FlaskConical, Layers, Zap } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Pensar",
      icon: Lightbulb,
      description:
        "Entendemos la esencia de tu negocio, tu audiencia y tus objetivos antes de tirar una sola línea de código.",
    },
    {
      num: "02",
      title: "Experimentar",
      icon: FlaskConical,
      description:
        "Prototipamos opciones visuales, testeamos interacciones y definimos la arquitectura sin atarnos a plantillas preconcebidas.",
    },
    {
      num: "03",
      title: "Construir",
      icon: Layers,
      description:
        "Desarrollo artesanal con Next.js y código modular. Rápido, accesible, optimizado para móviles y pantallas retina.",
    },
    {
      num: "04",
      title: "Transformar",
      icon: Zap,
      description:
        "Publicación en Vercel, optimización de métricas clave y lanzamiento de un sitio que impulsa tu futuro.",
    },
  ];

  return (
    <section id="proceso" className="py-24 bg-white text-[#1F2A27] border-y border-[#1F2A27]/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
            <span>Cómo trabajamos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F2A27]">
            De la idea al impacto en 4 pasos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1F2A27]/70">
            Un proceso lineal, transparente y sin burocracia que te mantiene al tanto en cada etapa.
          </p>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col p-6 rounded-2xl bg-[#F4F4F2] border border-[#1F2A27]/5 hover:border-[#064E3B]/30 transition-all duration-300 group"
              >
                {/* Conector decorativo entre pasos en desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-[2px] bg-[#1F2A27]/15" />
                )}

                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold tracking-widest text-[#064E3B] font-mono">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#3DD6BC] transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1F2A27] mb-2 group-hover:text-[#064E3B] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#1F2A27]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
