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

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "الجامعات الشريكة", href: "#partners" },
  { label: "من نحن وفريقنا", href: "#about" },
  { label: "تجارب الطلاب", href: "#results" },
  { label: "مراحل التسجيل", href: "#processus" },
];

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-2.5 sm:pt-3.5 px-3 sm:px-6 transform-gpu">
      {/* 
        Zero-Reflow Floating Pill Container:
        Dimensions (max-width, height, padding) remain 100% constant during scroll.
        Only compositor/paint properties (background, border, shadow) transition!
      */}
      <div
        className={`max-w-6xl mx-auto h-16 sm:h-[68px] rounded-full px-4 sm:px-6 flex items-center justify-between pointer-events-auto transform-gpu transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative ${
          isScrolled
            ? "bg-white/95 md:backdrop-blur-md border border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(11,27,61,0.12),0_2px_6px_rgba(11,27,61,0.04)]"
            : "bg-white/90 md:backdrop-blur-md border border-slate-200/75 shadow-[0_4px_20px_-4px_rgba(11,27,61,0.05)]"
        }`}
      >
        {/* ========================================================= */}
        {/* Brand Logo & Official Accreditation Badge                */}
        {/* ========================================================= */}
        <Link
          href="#hero"
          className="flex items-center gap-3 sm:gap-3.5 group select-none active:scale-[0.98] transition-transform duration-150 ease-out shrink-0"
        >
          <div className="relative flex items-center">
            <Image
              src="/logo/logo.png"
              alt="M&A OVERSEAS CONSULTING"
              width={352}
              height={163}
              referrerPolicy="no-referrer"
              className="w-auto object-contain h-9 sm:h-10"
              priority
            />
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-slate-200/80" />

          <div className="hidden sm:flex flex-col text-right justify-center">
            <span className="font-bold text-brand-navy leading-tight text-[11px] flex items-center gap-1 whitespace-nowrap">
              <span>مكتب معتمد</span>
              <CheckCircle2 className="w-2.5 h-2.5 text-brand-electric shrink-0" />
            </span>
            <span className="text-slate-500 font-medium leading-tight text-[10px] whitespace-nowrap">
              للدراسة في أوروبا
            </span>
          </div>
        </Link>

        {/* ========================================================= */}
        {/* Desktop Navigation Links (Arabic RTL)                     */}
        {/* ========================================================= */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-bold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-slate-600 hover:text-brand-electric active:scale-[0.97] transition-[color,transform] duration-150 group whitespace-nowrap"
            >
              <span>{link.label}</span>
              {/* Hardware-accelerated scaleX underline */}
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-electric rounded-full origin-right scale-x-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* ========================================================= */}
        {/* Office Location + Single Focused CTA Button               */}
        {/* ========================================================= */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {/* Physical Office Location */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
            <span>إنزكان - شارع مراكش</span>
          </div>

          {/* Single Focused CTA Button with Instant Pointer Feedback */}
          <a
            href="https://wa.me/212775496303"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.97] shadow-sm transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
            <span>احجز استشارة مجانية</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1 shrink-0" />
          </a>
        </div>

        {/* ========================================================= */}
        {/* Mobile Hamburger Toggle                                   */}
        {/* ========================================================= */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full text-slate-700 hover:text-brand-electric hover:bg-slate-100 active:scale-[0.92] transition-[color,background-color,transform] duration-150"
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
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/30 pointer-events-auto z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto md:hidden pt-2 relative z-50"
            >
              <div className="max-w-6xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(11,27,61,0.18)] p-6 space-y-5">
                
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-brand-navy">
                      M&A OVERSEAS CONSULTING
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
                    aria-label="إغلاق القائمة"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1.5 text-base font-bold text-slate-800 text-right">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-blue-50/80 hover:text-brand-electric active:scale-[0.98] transition-[background-color,color,transform]"
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
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.97] shadow-lg shadow-brand-navy/15 transition-[background-color,transform]"
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

