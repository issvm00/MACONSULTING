"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Menu,
  X,
  MapPin,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Apple-grade display-synced scroll tracking (Zero latency, 60fps/120fps)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "الجامعات الشريكة", href: "#partners" },
    { label: "مراحل التسجيل", href: "#processus" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-0 px-0"
      }`}
    >
      {/* 
        Single continuous morphing container (Apple Fluid Interface Principle)
        - Top state: Edge-to-edge full width (w-full max-w-full rounded-none), flush with screen edges, zero side gaps
        - Scrolled state: Contracts smoothly into floating island pill (max-w-[1080px] rounded-full) with Apple glass refraction
      */}
      <div
        className={`mx-auto flex items-center justify-between pointer-events-auto transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
          isScrolled
            ? "h-[64px] sm:h-[68px] max-w-[1080px] bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_16px_40px_-8px_rgba(11,27,61,0.12),0_2px_8px_rgba(11,27,61,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-full px-5 sm:px-7"
            : "h-20 w-full max-w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(11,27,61,0.03)] rounded-none px-4 sm:px-8 lg:px-12 xl:px-16"
        }`}
      >
        {/* ========================================================= */}
        {/* Brand Logo & Official Accreditation Badge                */}
        {/* ========================================================= */}
        <Link
          href="#hero"
          className="flex items-center gap-3 sm:gap-3.5 group select-none active:scale-[0.98] transition-transform duration-100 ease-out"
        >
          <div className="relative flex items-center">
            <Image
              src="/logo/logo.PNG"
              alt="M&A OVERSEAS CONSULTING"
              width={352}
              height={163}
              className={`w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] ${
                isScrolled ? "h-9 sm:h-10" : "h-11 sm:h-12 lg:h-[48px]"
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
              className={`font-extrabold text-brand-navy leading-tight transition-all duration-500 flex items-center gap-1 ${
                isScrolled ? "text-[10px]" : "text-[11px]"
              }`}
            >
              <span>مكتب معتمد</span>
              <CheckCircle2 className="w-2.5 h-2.5 text-brand-electric" />
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

        {/* ========================================================= */}
        {/* Desktop Navigation Links (Arabic RTL)                     */}
        {/* ========================================================= */}
        <nav
          className={`hidden md:flex items-center font-bold text-slate-700 transition-all duration-500 ${
            isScrolled ? "gap-6 text-[13px]" : "gap-8 text-sm"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-slate-600 hover:text-brand-electric active:scale-[0.96] transition-all duration-150 group"
            >
              <span>{link.label}</span>
              {/* Apple-style animated underline effect */}
              <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-brand-electric rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:right-0" />
            </a>
          ))}
        </nav>

        {/* ========================================================= */}
        {/* Office Location + Single Focused CTA Button               */}
        {/* ========================================================= */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Physical Office Location */}
          <div
            className={`items-center gap-1.5 text-xs text-slate-500 font-medium transition-all duration-500 ${
              isScrolled ? "hidden" : "hidden xl:flex"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-brand-electric" />
            <span>إنزكان - شارع مراكش</span>
          </div>

          {/* Single Focused CTA Button with Instant Pointer Feedback */}
          <a
            href="https://wa.me/212775496303"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.96] shadow-sm hover:shadow-glow-blue transition-all duration-300 group ${
              isScrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-xs"
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light" />
            <span>احجز استشارة مجانية</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
          </a>
        </div>

        {/* ========================================================= */}
        {/* Mobile Hamburger Toggle                                   */}
        {/* ========================================================= */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-brand-electric hover:bg-slate-100/80 active:scale-[0.92] transition-all duration-150"
            aria-label="القائمة الرئيسية"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2.2]" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* High-End Mobile Drawer / Modal Overlay                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Dimmer Overlay (Tap outside to dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/25 backdrop-blur-[2px] pointer-events-auto z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto md:hidden px-4 pt-2 relative z-50"
            >
              <div className="max-w-[1080px] mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(11,27,61,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] p-6 space-y-5">
                
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-brand-navy">
                      M&A OVERSEAS CONSULTING
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 active:scale-90 transition-all"
                    aria-label="إغلاق القائمة"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2 text-base font-bold text-slate-800 text-right">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-blue-50/80 hover:text-brand-electric active:scale-[0.98] transition-all"
                    >
                      <span>{link.label}</span>
                      <ArrowLeft className="w-4 h-4 text-slate-300" />
                    </a>
                  ))}
                </nav>

                {/* Single CTA Button on Mobile */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/212775496303"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.97] shadow-lg shadow-navy/15 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-electric-light" />
                    <span>احجز استشارة مجانية</span>
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                </div>

                {/* Agency Credentials Footer Card in Mobile Menu */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 text-center">
                  <div className="flex items-center justify-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-brand-electric" />
                    <span>المكتب الرسمي: إنزكان - شارع مراكش (أكادير)</span>
                  </div>
                  <p>مرافقة أكاديمية وقانونية معتمدة 100% نحو جامعات أوروبا</p>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
