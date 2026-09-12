"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#120A1C] text-white/50 py-12 border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/6">
          {/* Wordmark */}
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white">Fil Lab</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#C8FF4D]" />
            <span className="text-xs text-white/30 ml-3">Ideas en movimiento para un futuro real.</span>
          </div>

          {/* Links + scroll top */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="mailto:gonzalo.chiavassa@gmail.com" className="hover:text-[#C8FF4D] transition-colors">
              Email
            </a>
            <a
              href="https://wa.me/34644634884"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8FF4D] transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-white hover:text-[#C8FF4D] transition-colors ml-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Fil Lab · Barcelona. Todos los derechos reservados.</p>
          <p className="font-mono text-[11px] text-[#C8FF4D]/50">
            Diseñado & programado con Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
