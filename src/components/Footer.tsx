"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#033629] text-white/70 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Wordmark */}
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white">
              Fil Lab
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#3DD6BC]" />
            <span className="text-xs text-white/50 ml-3">
              Ideas en movimiento para un futuro real.
            </span>
          </div>

          {/* Enlaces y scroll to top */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <a
              href="mailto:gonzalo.chiavassa@gmail.com"
              className="hover:text-[#3DD6BC] transition-colors"
            >
              Email
            </a>
            <a
              href="https://wa.me/34644634884"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3DD6BC] transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-white hover:text-[#3DD6BC] transition-colors ml-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Fil Lab · Barcelona. Todos los derechos reservados.</p>
          <p className="font-mono text-[11px] text-[#3DD6BC]/80">
            Diseñado & programado con Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
