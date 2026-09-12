"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollTo } from "@/lib/scroll";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "lime" | "ghost" | "paper";
  size?: "sm" | "md" | "lg";
  magnetic?: number;
  className?: string;
  cursorLabel?: string;
}

const sizes = {
  sm: "px-5 py-2.5 text-[12px]",
  md: "px-7 py-3.5 text-[13px]",
  lg: "px-9 py-5 text-[14px]",
};

/**
 * Botón con relleno que sube desde abajo al hover. El texto se duplica y se
 * desplaza en bloque, así el color cambia sin que se lea un cross-fade.
 */
export default function Button({
  children,
  href,
  variant = "lime",
  size = "md",
  magnetic = 0.22,
  className = "",
  cursorLabel,
}: ButtonProps) {
  const isAnchor = href.startsWith("#");

  const skin =
    variant === "lime"
      ? "text-ink bg-lime"
      : variant === "paper"
        ? "text-paper-ink bg-paper"
        : "text-bone border border-[var(--hair)] bg-transparent";

  const swipe = variant === "ghost" ? "bg-lime" : "bg-bone";
  // Solo el fantasma cambia de color de texto: los otros ya son oscuros sobre claro.
  const swipeText = variant === "ghost" ? "group-hover:text-ink" : "";

  return (
    <Magnetic strength={magnetic} className={`inline-block ${className}`}>
      <a
        href={href}
        data-cursor={cursorLabel}
        onClick={
          isAnchor
            ? (e) => {
                e.preventDefault();
                scrollTo(href);
              }
            : undefined
        }
        className={`group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full font-semibold tracking-[-0.01em] ${sizes[size]} ${skin}`}
      >
        {/* Relleno que sube */}
        <span
          className={`absolute inset-0 -z-10 translate-y-full rounded-full transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${swipe}`}
        />
        <span className={`transition-colors duration-500 ${swipeText}`}>
          {children}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </Magnetic>
  );
}
