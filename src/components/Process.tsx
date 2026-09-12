"use client";

import React from "react";
import { Lightbulb, FlaskConical, Layers, Zap } from "lucide-react";

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
      "Prototipamos opciones visuales, testeamos interacciones y definimos la arquitectura sin atarnos a plantillas.",
  },
  {
    num: "03",
    title: "Construir",
    icon: Layers,
    description:
      "Desarrollo artesanal con Next.js y código modular. Rápido, accesible y optimizado para móviles y retina.",
  },
  {
    num: "04",
    title: "Transformar",
    icon: Zap,
    description:
      "Publicación en Vercel, optimización de métricas clave y lanzamiento de un sitio que impulsa tu futuro.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 bg-white text-[#1F2A27] border-y border-[#1F2A27]/8">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/8 text-[#064E3B] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
            <span>Cómo trabajamos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2A27]">
            De la idea al impacto
          </h2>
          <p className="mt-4 text-base text-[#1F2A27]/60 leading-relaxed">
            Un proceso lineal, transparente y sin burocracia que te mantiene al tanto en cada etapa.
          </p>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1F2A27]/6 rounded-2xl overflow-hidden border border-[#1F2A27]/6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={step.title}
                className={`relative flex flex-col p-7 bg-white hover:bg-[#F4F4F2] transition-colors duration-300 group ${
                  isLast ? "lg:rounded-br-2xl sm:rounded-br-2xl" : ""
                }`}
              >
                {/* Número y flecha de progreso */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-bold tracking-[0.12em] text-[#064E3B]/50 font-mono">
                    {step.num}
                  </span>
                  {/* Flecha conector — solo en desktop y no en último */}
                  {!isLast && (
                    <span className="hidden lg:block text-[#1F2A27]/15 text-xs font-light">
                      →
                    </span>
                  )}
                </div>

                {/* Ícono */}
                <div className="w-11 h-11 rounded-xl bg-[#F4F4F2] group-hover:bg-[#064E3B] flex items-center justify-center text-[#064E3B] group-hover:text-[#3DD6BC] transition-all duration-300 mb-5 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-[#1F2A27] mb-2 group-hover:text-[#064E3B] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-[#1F2A27]/60 leading-relaxed">
                  {step.description}
                </p>

                {/* Acento de color en hover en borde inferior */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#3DD6BC] group-hover:w-full transition-all duration-400 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
