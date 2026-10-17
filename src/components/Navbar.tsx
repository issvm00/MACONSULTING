"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight, GraduationCap } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-0 px-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative ${
          isScrolled
            ? "h-[64px] sm:h-[68px] max-w-[1040px] bg-white/80 backdrop-blur-2xl border border-white/85 shadow-[0_14px_35px_-8px_rgba(11,27,61,0.12),0_2px_8px_rgba(11,27,61,0.04)] rounded-full px-5 sm:px-7"
            : "h-20 max-w-7xl bg-white/75 backdrop-blur-xl border-b border-white/60 px-4 sm:px-6 lg:px-8 shadow-[0_1px_3px_rgba(11,27,61,0.03)]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group select-none">
          <div className="relative flex items-center">
            <Image
              src="/logo/logo.PNG"
              alt="M&A OVERSEAS CONSULTING"
              width={352}
              height={163}
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-[1.02] ${
                isScrolled ? "h-9 sm:h-10" : "h-11 sm:h-12 lg:h-[50px]"
              }`}
              priority
            />
          </div>

          <div
            className={`hidden sm:block w-[1px] bg-slate-200/80 transition-all duration-500 ${
              isScrolled ? "h-5" : "h-7"
            }`}
          />

          <div className="hidden sm:flex flex-col text-right justify-center">
            <span
              className={`font-bold text-brand-navy leading-tight transition-all duration-500 ${
                isScrolled ? "text-[10px]" : "text-[11px]"
              }`}
            >
              مكتب معتمد
            </span>
            <span
              className={`text-slate-500 font-medium leading-tight transition-all duration-500 ${
                isScrolled ? "text-[9px]" : "text-[10px]"
              }`}
            >
              للدراسة في أوروبا
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex items-center font-medium text-slate-600 transition-all duration-500 ${
            isScrolled ? "gap-6 text-[13px]" : "gap-8 text-sm"
          }`}
        >
          <Link
            href="#destinations"
            className="hover:text-brand-electric transition-colors"
          >
            Destinations
          </Link>
          <Link
            href="#processus"
            className="hover:text-brand-electric transition-colors"
          >
            Notre Processus
          </Link>
          <Link
            href="#avantages"
            className="hover:text-brand-electric transition-colors"
          >
            Pourquoi Nous
          </Link>
          <Link
            href="#temoignages"
            className="hover:text-brand-electric transition-colors"
          >
            Témoignages
          </Link>
          <Link
            href="#contact"
            className="hover:text-brand-electric transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/212775496303"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full font-semibold text-white bg-brand-navy hover:bg-brand-electric shadow-sm hover:shadow-glow-blue transition-all duration-300 ${
              isScrolled ? "px-5 py-2 text-xs" : "px-5 py-2.5 text-xs"
            }`}
          >
            <MessageCircle className="w-4 h-4 text-brand-electric-light" />
            <span>Consultation Gratuite</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-brand-electric hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden pointer-events-auto transition-all duration-300 ${
            isScrolled
              ? "mt-2 max-w-[1040px] mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-5 space-y-4"
              : "border-b border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl"
          }`}
        >
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700">
            <Link
              href="#destinations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-electric py-1"
            >
              Destinations
            </Link>
            <Link
              href="#processus"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-electric py-1"
            >
              Notre Processus
            </Link>
            <Link
              href="#avantages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-electric py-1"
            >
              Pourquoi Nous
            </Link>
            <Link
              href="#temoignages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-electric py-1"
            >
              Témoignages
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-electric py-1"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/212775496303"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-brand-navy hover:bg-brand-electric text-center shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-brand-electric-light" />
              <span>Maroc (+212 7 75 49 63 03)</span>
            </a>
            <a
              href="https://wa.me/37062202955"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold text-brand-navy bg-slate-100 hover:bg-slate-200 text-center"
            >
              <span>Algérie (+370 622 02 955)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
