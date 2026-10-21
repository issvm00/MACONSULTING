"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { id: "hero", label: "الرئيسية", href: "#hero" },
  { id: "partners", label: "الجامعات الشريكة", href: "#partners" },
  { id: "about", label: "من نحن وفريقنا", href: "#about" },
  { id: "results", label: "تجارب الطلاب", href: "#results" },
  { id: "processus", label: "مراحل التسجيل", href: "#processus" },
  { id: "faq", label: "الأسئلة الشائعة", href: "#faq" },
];

const SECTION_IDS = [
  "hero",
  "partners",
  "about",
  "results",
  "processus",
  "reviews",
  "faq",
] as const;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Cached section top offsets so scroll frames perform ZERO DOM queries and ZERO layout reflows
  const sectionOffsetsRef = useRef<Array<{ id: string; top: number }>>([]);

  useEffect(() => {
    let ticking = false;

    const measureSectionOffsets = () => {
      const scrollY = window.scrollY;
      const measured: Array<{ id: string; top: number }> = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          measured.push({
            id: id === "reviews" ? "processus" : id,
            top: rect.top + scrollY,
          });
        }
      }
      sectionOffsetsRef.current = measured;
    };

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      const triggerPoint = scrollY + 180;
      const offsets = sectionOffsetsRef.current;
      let currentId = "hero";

      for (let i = 0; i < offsets.length; i++) {
        if (triggerPoint >= offsets[i].top) {
          currentId = offsets[i].id;
        }
      }

      setActiveSection((prev) => (prev !== currentId ? currentId : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Initial measurement & scroll sync
    measureSectionOffsets();
    updateScrollState();

    // Recalculate cached offsets only when document height or window size changes (e.g. FAQ accordion toggle)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measureSectionOffsets();
      });
      resizeObserver.observe(document.body);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureSectionOffsets, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureSectionOffsets);
      resizeObserver?.disconnect();
    };
  }, []);

  // Lock body scroll and support Escape key when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((id: string) => {
    document.body.style.overflow = "unset";
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      dir="rtl"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 transform-gpu"
    >
      {/* 
        Zero-Reflow Floating Architectural Pill Container:
        Dimensions remain 100% constant during scroll. Only paint/compositor properties transition.
      */}
      <div
        className={`max-w-7xl mx-auto h-[58px] sm:h-[66px] rounded-full pr-4 pl-2.5 sm:px-5 lg:px-6 flex items-center justify-between gap-3 pointer-events-auto transform-gpu transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative ${
          isScrolled
            ? "bg-white/95 md:backdrop-blur-md border border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(11,27,61,0.12),0_2px_6px_rgba(11,27,61,0.04)]"
            : "bg-white/90 md:backdrop-blur-md border border-slate-200/80 shadow-[0_6px_24px_-6px_rgba(11,27,61,0.06)]"
        }`}
      >
        {/* ========================================================= */}
        {/* ZONE 1 (Right): Pure Brand Logo (Zero Text Clutter)       */}
        {/* ========================================================= */}
        <Link
          href="#hero"
          onClick={() => handleNavClick("hero")}
          className="flex items-center select-none active:scale-[0.98] transition-transform duration-150 ease-out shrink-0 pr-1"
        >
          <Image
            src="/logo/logo.png"
            alt="M&A OVERSEAS CONSULTING"
            width={352}
            height={163}
            referrerPolicy="no-referrer"
            className="w-auto object-contain h-8 sm:h-9 lg:h-10"
            priority
          />
        </Link>

        {/* ========================================================= */}
        {/* ZONE 2 (Center - Desktop lg+): Capsule Navigation Track   */}
        {/* ========================================================= */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/70"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 xl:px-4 py-1.5 rounded-full text-xs xl:text-[13px] font-bold transition-[background-color,color,box-shadow,transform] duration-200 whitespace-nowrap shrink-0 active:scale-[0.97] ${
                  isActive
                    ? "bg-white text-brand-electric shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-white/55"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* ZONE 3A (Left - Desktop lg+): Pure Focused Primary CTA    */}
        {/* ========================================================= */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/postuler"
            className="inline-flex items-center gap-2 px-5 xl:px-6 py-2.5 rounded-full text-xs xl:text-[13px] font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.97] shadow-sm transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
            <span>احجز استشارة مجانية</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1 shrink-0" />
          </Link>
        </div>

        {/* ========================================================= */}
        {/* ZONE 3B (Left - Mobile & Tablet <lg): Action + Menu Pill  */}
        {/* ========================================================= */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          {/* Quick Consultation Funnel Pill */}
          <Link
            href="/postuler"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-95 shadow-sm transition-[background-color,transform] duration-150 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
            <span>استشارة مجانية</span>
          </Link>

          {/* Tactile Circular Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة الرئيسية"
            }
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center active:scale-90 transition-[background-color,border-color,color,transform] duration-150 cursor-pointer shrink-0 ${
              isMobileMenuOpen
                ? "bg-brand-electric border-brand-electric text-white shadow-sm"
                : "bg-slate-100/90 hover:bg-blue-50/80 border-slate-200/85 text-brand-navy"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.3]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.3]" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* High-End Mobile & Tablet Drawer Overlay (<1024px)         */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Zero-Blur GPU Backdrop Dimmer Overlay (Tap outside to dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/40 pointer-events-auto z-40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto lg:hidden pt-2.5 relative z-50 transform-gpu"
            >
              <div className="max-w-7xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-[0_24px_54px_rgba(11,27,61,0.18)] p-5 sm:p-6 space-y-4">
                {/* Drawer Top Identity Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-brand-navy flex items-center gap-1.5">
                      <span>M&A OVERSEAS CONSULTING</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-electric bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    مكتب معتمد
                  </span>
                </div>

                {/* Navigation Links Grid (Clean 1-col on phone, 2-col on tablet) */}
                <nav
                  aria-label="قائمة الموبايل"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-right"
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => handleNavClick(link.id)}
                        className={`flex items-center justify-between py-3 px-4 rounded-2xl text-sm font-bold transition-[background-color,color,transform] active:scale-[0.98] ${
                          isActive
                            ? "bg-blue-50/90 text-brand-electric border border-blue-200/70"
                            : "text-slate-700 hover:bg-slate-50 hover:text-brand-electric border border-transparent"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowLeft
                          className={`w-4 h-4 transition-transform ${
                            isActive ? "text-brand-electric" : "text-slate-300"
                          }`}
                        />
                      </a>
                    );
                  })}
                </nav>

                {/* Primary Consultation CTA Button inside Drawer */}
                <div className="pt-1">
                  <Link
                    href="/postuler"
                    onClick={() => {
                      document.body.style.overflow = "unset";
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.98] shadow-md shadow-brand-navy/15 transition-[background-color,transform]"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-electric-light shrink-0" />
                    <span>تقييم الملف وحجز استشارة مجانية</span>
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                  </Link>
                </div>

                {/* Official Office Address Footnote inside Mobile Drawer */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 text-center font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                  <span>المكتب الرسمي: إنزكان - شارع مراكش (أكادير)</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
