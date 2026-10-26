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
  ArrowRight,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { id: "hero", labelAr: "الرئيسية", labelEn: "Home", href: "#hero" },
  {
    id: "partners",
    labelAr: "الجامعات الشريكة",
    labelEn: "Partner Universities",
    href: "#partners",
  },
  {
    id: "about",
    labelAr: "من نحن وفريقنا",
    labelEn: "About & Team",
    href: "#about",
  },
  {
    id: "results",
    labelAr: "دليل الوجهات",
    labelEn: "Destination Guides",
    href: "#results",
  },
  {
    id: "processus",
    labelAr: "مراحل التسجيل",
    labelEn: "Admission Process",
    href: "#processus",
  },
  { id: "faq", labelAr: "الأسئلة الشائعة", labelEn: "FAQ", href: "#faq" },
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
  const { language, isRTL, toggleLanguage } = useLanguage();
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

  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 transform-gpu"
    >
      {/* 
        Zero-Reflow Floating Architectural Pill Container:
        Dimensions remain 100% constant during scroll. Only paint/compositor properties transition.
      */}
      <div
        className={`max-w-7xl mx-auto h-[58px] sm:h-[66px] rounded-full ${
          isRTL ? "pr-4 pl-2.5" : "pl-4 pr-2.5"
        } sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto transform-gpu transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative ${
          isScrolled
            ? "bg-white/95 md:backdrop-blur-md border border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(11,27,61,0.12),0_2px_6px_rgba(11,27,61,0.04)]"
            : "bg-white/90 md:backdrop-blur-md border border-slate-200/80 shadow-[0_6px_24px_-6px_rgba(11,27,61,0.06)]"
        }`}
      >
        {/* ========================================================= */}
        {/* ZONE 1 (Start): Brand Logo + Desktop Language Switcher     */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 xl:gap-3.5 shrink-0">
          <Link
            href="#hero"
            onClick={() => handleNavClick("hero")}
            className={`flex items-center select-none active:scale-[0.98] transition-transform duration-150 ease-out shrink-0 ${
              isRTL ? "pr-1" : "pl-1"
            }`}
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

          {/* Desktop Language Switcher Pill next to Logo (Matches reference design) */}
          <button
            type="button"
            dir="ltr"
            onClick={toggleLanguage}
            title={
              language === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
            aria-label={
              language === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
            className="hidden lg:inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-[#F3F6FB] hover:bg-[#EBF1FA] border border-[#DCE5F2] shadow-[0_2px_6px_rgba(11,27,61,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-[0.97] transition-all duration-200 cursor-pointer select-none shrink-0"
          >
            <Globe className="w-4 h-4 text-[#7A92B4] stroke-[1.9] shrink-0" />
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] xl:text-xs font-extrabold tracking-tight transition-all duration-200 ${
                language === "en"
                  ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                  : "text-[#334E68] hover:text-brand-navy"
              }`}
            >
              EN
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-200 ${
                language === "ar"
                  ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                  : "text-[#334E68] hover:text-brand-navy"
              }`}
            >
              العربية
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* ZONE 2 (Center - Desktop lg+): Capsule Navigation Track   */}
        {/* ========================================================= */}
        <nav
          aria-label={isRTL ? "التنقل الرئيسي" : "Main Navigation"}
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/70"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-bold transition-[background-color,color,box-shadow,transform] duration-200 whitespace-nowrap shrink-0 active:scale-[0.97] ${
                  isActive
                    ? "bg-white text-brand-electric shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-white/55"
                }`}
              >
                {language === "ar" ? link.labelAr : link.labelEn}
              </a>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* ZONE 3A (End - Desktop lg+): Pure Primary CTA             */}
        {/* ========================================================= */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/postuler"
            className="inline-flex items-center gap-2 px-5 xl:px-6 py-2.5 rounded-full text-xs xl:text-[13px] font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.97] shadow-sm transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
            <span>
              {language === "ar"
                ? "احجز استشارة مجانية"
                : "Book a Free Consultation"}
            </span>
            <DirectionalArrow
              className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                isRTL
                  ? "group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              } shrink-0`}
            />
          </Link>
        </div>

        {/* ========================================================= */}
        {/* ZONE 3B (End - Mobile & Tablet <lg): Clean Action + Menu  */}
        {/* ========================================================= */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          {/* Quick Consultation Funnel Pill */}
          <Link
            href="/postuler"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-95 shadow-sm transition-[background-color,transform] duration-150 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
            <span>
              {language === "ar" ? "استشارة مجانية" : "Free Consultation"}
            </span>
          </Link>

          {/* Tactile Circular Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen
                ? language === "ar"
                  ? "إغلاق القائمة"
                  : "Close menu"
                : language === "ar"
                ? "فتح القائمة الرئيسية"
                : "Open main menu"
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
                {/* Drawer Top Identity Strip + Language Switcher */}
                <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-brand-navy flex items-center gap-1.5 truncate">
                      <span className="truncate">M&A OVERSEAS CONSULTING</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                    </span>
                  </div>

                  {/* Segmented Language Switcher inside Mobile Menu */}
                  <button
                    type="button"
                    dir="ltr"
                    onClick={toggleLanguage}
                    aria-label={
                      language === "ar"
                        ? "Switch to English"
                        : "التبديل إلى العربية"
                    }
                    className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-[#F3F6FB] border border-[#DCE5F2] shadow-[0_2px_6px_rgba(11,27,61,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] shrink-0 cursor-pointer active:scale-95 transition-transform select-none"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#7A92B4] stroke-[1.9] shrink-0" />
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-200 ${
                        language === "en"
                          ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                          : "text-[#334E68] hover:text-brand-navy"
                      }`}
                    >
                      EN
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                        language === "ar"
                          ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                          : "text-[#334E68] hover:text-brand-navy"
                      }`}
                    >
                      العربية
                    </span>
                  </button>
                </div>

                {/* Navigation Links Grid (Clean 1-col on phone, 2-col on tablet) */}
                <nav
                  aria-label={
                    language === "ar" ? "قائمة الموبايل" : "Mobile Navigation"
                  }
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
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
                        <span>
                          {language === "ar" ? link.labelAr : link.labelEn}
                        </span>
                        <DirectionalArrow
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
                    <span>
                      {language === "ar"
                        ? "تقييم الملف وحجز استشارة مجانية"
                        : "Profile Assessment & Free Consultation"}
                    </span>
                    <DirectionalArrow className="w-4 h-4 shrink-0" />
                  </Link>
                </div>

                {/* Official Office Address Footnote inside Mobile Drawer */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 text-center font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                  <span>
                    {language === "ar"
                      ? "المكتب الرسمي: إنزكان - شارع مراكش (أكادير)"
                      : "Official HQ: Inezgane - Marrakech Ave (Agadir)"}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
