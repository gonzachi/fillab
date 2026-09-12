"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import confetti from "canvas-confetti";
import SectionMarker from "./SectionMarker";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";

const EMAIL = "gonzalo.chiavassa@gmail.com";
const WHATSAPP = "https://wa.me/34644634884";

const channels = [
  { label: "WhatsApp", value: "+34 644 634 884", href: WHATSAPP, note: "La vía más rápida" },
  { label: "Correo", value: EMAIL, href: `mailto:${EMAIL}`, note: "Para briefs largos" },
];

const fields = [
  { id: "name", num: "01", label: "Cómo te llamás", type: "text", placeholder: "Nombre y apellido" },
  { id: "email", num: "02", label: "Dónde te escribimos", type: "email", placeholder: "tu@correo.com" },
] as const;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* Sin backend propio: el formulario compone el correo y lo entrega al
       cliente de mail del visitante. Para recibirlo en un buzón sin salir
       de la página, reemplazar este bloque por un POST a Formspree o Resend. */
    const subject = encodeURIComponent(`Nuevo proyecto — ${form.name}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    try {
      confetti({
        particleCount: 70,
        spread: 64,
        startVelocity: 34,
        ticks: 160,
        origin: { y: 0.72 },
        colors: ["#C8FF4D", "#6B3FA8", "#F6F4F0"],
        disableForReducedMotion: true,
      });
    } catch {
      /* confetti es decorativo: si falla, el envío ya ocurrió */
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink pb-24 pt-24 sm:pb-32 sm:pt-32">
      {/* Resplandor del nodo detrás del bloque */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,255,77,0.10) 0%, rgba(107,63,168,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="u-shell relative">
        <SectionMarker index="09" label="Contacto" />

        <div className="grid gap-16 md:grid-cols-12 md:gap-14">
          {/* ── Invitación y vías directas ─────────────────────── */}
          <div className="md:col-span-5">
            <h2 className="u-display-tight text-bone" style={{ fontSize: "var(--t-h2)" }}>
              <SplitText as="span" className="block" by="char" stagger={0.03}>
                Contanos
              </SplitText>
              <span className="u-serif block text-[1.1em] text-lime">la idea.</span>
            </h2>

            <Reveal mode="up" delay={0.2} className="mt-8">
              <p className="max-w-[34ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                Contanos qué querés construir y en qué plazo. Respondemos en
                menos de 24 horas con una primera lectura del proyecto — sin
                compromiso y sin plantilla de propuesta.
              </p>
            </Reveal>

            <div className="mt-12">
              {channels.map((c, i) => (
                <Reveal key={c.label} mode="fade" delay={0.1 + i * 0.08}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-cursor="Abrir"
                    className="group flex items-center justify-between border-t border-[var(--hair)] py-6 last:border-b"
                  >
                    <span>
                      <span className="u-mono mb-2 block text-[var(--fg-faint)]">
                        {c.label} · {c.note}
                      </span>
                      <span className="text-[var(--t-h4)] font-medium tracking-[-0.02em] text-bone transition-colors duration-500 group-hover:text-lime">
                        {c.value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--fg-faint)] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── Formulario ──────────────────────────────────────── */}
          <div className="md:col-span-6 md:col-start-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[26rem] flex-col justify-center border border-[var(--hair)] p-10"
                >
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-lime">
                    <Check className="h-5 w-5 text-ink" strokeWidth={3} />
                  </span>
                  <h3 className="u-display mb-4 text-bone" style={{ fontSize: "var(--t-h4)" }}>
                    Listo, {form.name.split(" ")[0] || "gracias"}.
                  </h3>
                  <p className="max-w-[38ch] text-[var(--t-body)] leading-relaxed text-[var(--fg-dim)]">
                    Abrimos tu cliente de correo con el mensaje ya escrito —
                    solo queda darle enviar. Si no se abrió, escribinos directo
                    a{" "}
                    <a href={`mailto:${EMAIL}`} className="u-link text-lime">
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="u-mono mt-10 self-start text-[var(--fg-faint)] transition-colors duration-300 hover:text-bone"
                  >
                    ← Volver al formulario
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10"
                >
                  {fields.map((f) => (
                    <Reveal key={f.id} mode="up" duration={0.8}>
                      <label className="block">
                        <span className="u-mono mb-4 flex items-center gap-3 text-[var(--fg-faint)]">
                          <span className="u-mono-num text-lime">{f.num}</span>
                          {f.label}
                        </span>
                        <input
                          required
                          type={f.type}
                          value={form[f.id]}
                          onChange={update(f.id)}
                          placeholder={f.placeholder}
                          className="u-field"
                        />
                      </label>
                    </Reveal>
                  ))}

                  <Reveal mode="up" duration={0.8}>
                    <label className="block">
                      <span className="u-mono mb-4 flex items-center gap-3 text-[var(--fg-faint)]">
                        <span className="u-mono-num text-lime">03</span>
                        Qué querés construir
                      </span>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Contanos el proyecto, el plazo y qué tenés hoy…"
                        className="u-field"
                      />
                    </label>
                  </Reveal>

                  <Reveal mode="up" duration={0.8}>
                    <Magnetic strength={0.12}>
                      <button
                        type="submit"
                        data-cursor="Enviar"
                        className="group relative isolate flex w-full items-center justify-between overflow-hidden rounded-full bg-lime px-8 py-5 text-left"
                      >
                        <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-bone transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                        <span className="text-[15px] font-bold tracking-[-0.01em] text-ink">
                          Enviar el proyecto
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-ink transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                    </Magnetic>
                  </Reveal>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
