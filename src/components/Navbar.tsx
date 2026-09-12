"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Qué hacemos", href: "#que-hacemos" },
    { name: "Cómo trabajamos", href: "#proceso" },
    { name: "Manifiesto", href: "#manifiesto" },
    { name: "Por qué Fil Lab", href: "#por-que" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#064E3B]/92 backdrop-blur-md py-3 shadow-xl border-b border-[#3DD6BC]/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-1.5 focus:outline-none">
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#3DD6BC]">
            Fil Lab
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#3DD6BC] group-hover:scale-150 transition-transform duration-300" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#3DD6BC] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[#064E3B] bg-[#3DD6BC] hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-1 text-white/90 hover:text-white transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#064E3B] border-b border-[#3DD6BC]/20 px-6 sm:px-8 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-white/80 hover:text-[#3DD6BC] py-2.5 border-b border-white/5 last:border-none transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-[#3DD6BC]/60" />
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-3 text-sm font-semibold text-[#064E3B] bg-[#3DD6BC] hover:bg-white rounded-full transition-colors"
            >
              <span>Contame tu proyecto</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
