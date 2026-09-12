"use client";

import React from "react";
import { CheckCircle2, UserCheck, ShieldCheck, Zap } from "lucide-react";

export default function WhyUs() {
  const differentiators = [
    {
      icon: UserCheck,
      title: "Trato directo con quien diseña y programa",
      description:
        "Sin ejecutivos de cuentas ni cadenas infinitas de emails. Hablás directamente con quien toma las decisiones de diseño y escribe el código.",
    },
    {
      icon: Zap,
      title: "Tiempos reales, sin burocracia",
      description:
        "Las agencias grandes tardan meses en coordinar reuniones internas. Acá el feedback se implementa en días con una velocidad boutique.",
    },
    {
      icon: ShieldCheck,
      title: "Código propio, sin ataduras",
      description:
        "Tu proyecto es tuyo. Usamos estándares abiertos (Next.js, Tailwind, Vercel) para que nunca quedes atrapado en una plataforma cerrada ni en plantillas infladas.",
    },
  ];

  return (
    <section id="por-que" className="py-24 bg-white text-[#1F2A27] border-t border-[#1F2A27]/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna izquierda: Presentación del valor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]" />
              <span>Por qué Fil Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F2A27] leading-tight">
              Un símbolo simple para <span className="text-[#064E3B]">ideas complejas.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#1F2A27]/70 leading-relaxed">
              No necesitás una estructura pesada de 50 personas para tener una web de primer nivel internacional.
              Necesitás atención dedicada, criterio visual y foco en lo que realmente mueve tu negocio.
            </p>
            <div className="p-6 rounded-2xl bg-[#F4F4F2] border border-[#1F2A27]/10">
              <div className="flex items-center gap-3 text-[#064E3B] font-semibold text-sm mb-1">
                <CheckCircle2 className="w-5 h-5 text-[#3DD6BC]" />
                <span>Compromiso boutique</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1F2A27]/70">
                Tomamos un número limitado de proyectos simultáneos para garantizar dedicación total a cada detalle.
              </p>
            </div>
          </div>

          {/* Columna derecha: Diferenciadores */}
          <div className="lg:col-span-7 space-y-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-[#F4F4F2] border border-[#1F2A27]/5 hover:border-[#064E3B]/30 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex-shrink-0 flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#3DD6BC] transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2A27] mb-2 group-hover:text-[#064E3B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#1F2A27]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
