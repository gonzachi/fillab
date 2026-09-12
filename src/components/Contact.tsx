"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#C8FF4D", "#2E1A47", "#ffffff"],
        });
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 bg-[#2E1A47] text-white relative overflow-hidden">
      {/* Luz ambiental */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8FF4D]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#120A1C]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info y vías directas */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/12 text-[#C8FF4D] text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF4D]" />
                <span>Contacto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Empecemos a conectar ideas.
              </h2>
              <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
                Contame qué tenés en mente. Ya sea un proyecto nuevo desde cero,
                un rediseño o una idea que busca forma.
              </p>
            </div>

            {/* Accesos directos */}
            <div className="space-y-4 pt-4 border-t border-white/8">
              <p className="text-xs uppercase font-semibold tracking-wider text-white/40">
                ¿Preferís saltear el formulario? Escribime directo:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/34644634884"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/12 text-sm font-medium text-white transition-all duration-200 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#C8FF4D]" />
                  <span>WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="mailto:gonzalo.chiavassa@gmail.com"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/12 text-sm font-medium text-white transition-all duration-200 group"
                >
                  <Mail className="w-4 h-4 text-[#C8FF4D]" />
                  <span className="truncate">gonzalo.chiavassa@gmail.com</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Metadatos */}
            <div className="text-xs text-white/35 space-y-1">
              <p>📍 Barcelona, España</p>
              <p>⚡ Respuesta garantizada en menos de 24 horas hábiles.</p>
            </div>
          </div>

          {/* Formulario en Card */}
          <div
            className="lg:col-span-7 rounded-3xl p-8 sm:p-10 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/8"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#C8FF4D]/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#2E1A47]" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                  Gracias por escribir. Voy a revisar los detalles de tu idea y te responderé en breve.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                  className="inline-block mt-4 text-xs font-semibold text-[#2E1A47] hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Tu nombre", type: "text", placeholder: "Ej. Martín Soler" },
                  { id: "email", label: "Tu correo electrónico", type: "email", placeholder: "martin@empresa.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      required
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E1A47] transition-all"
                      style={{
                        backgroundColor: "var(--surface-pill)",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                    Contame sobre el proyecto o tu idea
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿Qué necesitás construir? ¿Tenés una fecha estimada o un sitio de referencia?"
                    className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E1A47] transition-all resize-none"
                    style={{
                      backgroundColor: "var(--surface-pill)",
                      border: "1px solid var(--card-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2E1A47] text-white font-bold text-sm hover:bg-[#3d2460] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 active:scale-[0.99]"
                >
                  {loading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <Send className="w-4 h-4 text-[#C8FF4D]" />
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
