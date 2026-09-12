"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de envío fluido (se puede conectar directamente a Formspree, Resend o mailto)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#3DD6BC", "#064E3B", "#ffffff"],
        });
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 bg-[#064E3B] text-white relative overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3DD6BC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info y Vías Directas */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#3DD6BC] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DD6BC]" />
                <span>Contacto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Empecemos a conectar ideas.
              </h2>
              <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed">
                Contame qué tenés en mente. Ya sea un proyecto nuevo desde cero,
                un rediseño o una idea que busca forma.
              </p>
            </div>

            {/* Accesos rápidos sin formulario */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <p className="text-xs uppercase font-semibold tracking-wider text-white/60">
                ¿Preferís saltear el formulario? Escribime directo:
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/34644634884"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-medium text-white transition-all duration-200 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#3DD6BC]" />
                  <span>WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="mailto:gonzalo.chiavassa@gmail.com"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-medium text-white transition-all duration-200 group"
                >
                  <Mail className="w-4 h-4 text-[#3DD6BC]" />
                  <span>gonzalo.chiavassa@gmail.com</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Ubicación */}
            <div className="text-xs text-white/60 space-y-1">
              <p>📍 Barcelona, España</p>
              <p>⚡ Respuesta garantizada en menos de 24 horas hábiles.</p>
            </div>
          </div>

          {/* Formulario en Card blanca/clara */}
          <div className="lg:col-span-7 bg-white text-[#1F2A27] rounded-3xl p-8 sm:p-10 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10">

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#3DD6BC]/20 text-[#064E3B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#064E3B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2A27]">
                  ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-sm text-[#1F2A27]/70 max-w-md mx-auto">
                  Gracias por escribir. Voy a revisar los detalles de tu idea y te responderé en breve.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="inline-block mt-4 text-xs font-semibold text-[#064E3B] hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#1F2A27]/70 mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Martín Soler"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F2] border border-[#1F2A27]/10 text-[#1F2A27] text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors placeholder:text-[#888888]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#1F2A27]/70 mb-2">
                    Tu correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="martin@empresa.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F2] border border-[#1F2A27]/10 text-[#1F2A27] text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors placeholder:text-[#888888]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#1F2A27]/70 mb-2">
                    Contame sobre el proyecto o tu idea
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿Qué necesitás construir? ¿Tenés una fecha estimada o un sitio de referencia?"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F2] border border-[#1F2A27]/10 text-[#1F2A27] text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors placeholder:text-[#888888] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#064E3B] text-white font-semibold text-sm hover:bg-[#033629] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 active:scale-[0.99]"
                >
                  {loading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <Send className="w-4 h-4 text-[#3DD6BC]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
