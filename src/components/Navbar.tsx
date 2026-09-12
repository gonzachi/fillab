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
    window.addEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#064E3B]/90 backdrop-blur-md py-3 shadow-lg border-b border-[#3DD6BC]/15"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-1.5 focus:outline-none">
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-200">
            Fil Lab
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#3DD6BC] group-hover:scale-125 transition-transform duration-200" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-[#3DD6BC] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#064E3B] bg-[#3DD6BC] hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/90 hover:text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#064E3B] border-b border-[#3DD6BC]/20 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white/90 hover:text-[#3DD6BC] py-1"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 w-full mt-3 px-4 py-2.5 text-sm font-semibold text-[#064E3B] bg-[#3DD6BC] rounded-full"
          >
            <span>Contame tu proyecto</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
