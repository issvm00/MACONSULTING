"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  GraduationCap,
  ArrowLeft,
  Compass,
  MapPin,
  Menu,
  X,
} from "lucide-react";

// Crisp SVG Country Flag Tokens (Works 100% on Windows, Mac, iOS, Android)
function FlagCircle({ code, name }: { code: string; name: string }) {
  const renderFlagContent = () => {
    switch (code) {
      case "LT": // Lithuania: Yellow, Green, Red
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#FDB913" />
            <rect y="8" width="24" height="8" fill="#006A44" />
            <rect y="16" width="24" height="8" fill="#C1272D" />
          </svg>
        );
      case "RO": // Romania: Blue, Yellow, Red
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#002B7F" />
            <rect x="8" width="8" height="24" fill="#FCD116" />
            <rect x="16" width="8" height="24" fill="#CE1126" />
          </svg>
        );
      case "IT": // Italy: Green, White, Red
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#009246" />
            <rect x="8" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" width="8" height="24" fill="#CE2B37" />
          </svg>
        );
      case "ES": // Spain: Red, Yellow, Red
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="6" fill="#AA151B" />
            <rect y="6" width="24" height="12" fill="#F1BF00" />
            <rect y="18" width="24" height="6" fill="#AA151B" />
          </svg>
        );
      case "HU": // Hungary: Red, White, Green
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#CE2939" />
            <rect y="8" width="24" height="8" fill="#FFFFFF" />
            <rect y="16" width="24" height="8" fill="#477050" />
          </svg>
        );
      case "MT": // Malta: White, Red
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="12" height="24" fill="#FFFFFF" />
            <rect x="12" width="12" height="24" fill="#CF142B" />
            <circle cx="4" cy="4" r="2" fill="#94A3B8" />
          </svg>
        );
      case "IE": // Ireland: Green, White, Orange
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#169B62" />
            <rect x="8" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" width="8" height="24" fill="#FF883E" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      title={name}
      className="relative w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full overflow-hidden border border-slate-200/90 shadow-2xs flex-shrink-0 bg-white"
    >
      {renderFlagContent()}
    </div>
  );
}

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic rotating destination words for H1 requested by user:
  // "ليتوانيا " ➔ "إيطاليا " ➔ "رومانيا " ➔ "إسبانيا " ➔ "المجر " ➔ "أوروبا"
  const rotatingWords = [
    "ليتوانيا",
    "إيطاليا",
    "رومانيا",
    "إسبانيا",
    "المجر",
    "أوروبا",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  // The 7 official European study destinations
  const destinations = [
    { code: "LT", name: "ليتوانيا" },
    { code: "RO", name: "رومانيا" },
    { code: "IT", name: "إيطاليا" },
    { code: "ES", name: "إسبانيا" },
    { code: "HU", name: "هنغاريا" },
    { code: "MT", name: "مالطا" },
    { code: "IE", name: "أيرلندا" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col text-brand-navy overflow-x-clip">
      
      {/* Top Navbar with Scroll-Adaptive Floating Pill Morphing */}
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
          {/* Logo & Identity */}
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

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center font-bold text-slate-700 transition-all duration-500 ${
              isScrolled ? "gap-6 text-[13px]" : "gap-8 text-sm"
            }`}
          >
            <a href="#destinations" className="hover:text-brand-electric transition-colors">
              الوجهات الأوروبية
            </a>
            <a href="#services" className="hover:text-brand-electric transition-colors">
              خدماتنا
            </a>
            <a href="#processus" className="hover:text-brand-electric transition-colors">
              مراحل التسجيل
            </a>
            <a href="#about" className="hover:text-brand-electric transition-colors">
              لماذا نحن؟
            </a>
            <a href="#contact" className="hover:text-brand-electric transition-colors">
              اتصل بنا
            </a>
          </nav>

          {/* Action Button & Location */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            <div
              className={`items-center gap-1.5 text-xs text-slate-500 font-medium transition-all duration-500 ${
                isScrolled ? "hidden" : "hidden xl:flex"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-brand-electric" />
              <span>إنزكان - شارع مراكش</span>
            </div>
            <a
              href="https://wa.me/212775496303"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full font-bold text-white bg-brand-navy hover:bg-brand-electric shadow-sm hover:shadow-glow-blue transition-all duration-300 ${
                isScrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-xs"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-brand-electric-light" />
              <span>استشارة مجانية</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-electric hover:bg-slate-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden pointer-events-auto transition-all duration-300 ${
              isScrolled
                ? "mt-2 max-w-[1040px] mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-5 space-y-4"
                : "border-b border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 shadow-xl"
            }`}
          >
            <nav className="flex flex-col space-y-3 text-base font-bold text-slate-700 text-right">
              <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-electric py-1">
                الوجهات الأوروبية
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-electric py-1">
                خدماتنا
              </a>
              <a href="#processus" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-electric py-1">
                مراحل التسجيل
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-electric py-1">
                لماذا نحن؟
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-electric py-1">
                اتصل بنا
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/212775496303"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب طلاب المغرب (0775496303)</span>
              </a>
              <a
                href="https://wa.me/37062202955"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold text-brand-navy bg-slate-100"
              >
                <span>واتساب طلاب الجزائر (+37062202955)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Hero Body (Balanced Grid with Organic Glassmorphism) */}
      <main className="flex-1 flex items-center pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ======================================================== */}
            {/* Right Column (Text & Value Proposition)                  */}
            {/* ======================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 text-right space-y-5 lg:pr-2"
            >
              {/* H1 Heading in IBM Plex Sans Arabic with Dynamic Destination Morph */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-brand-navy tracking-tight leading-[1.3]">
                <span className="block text-brand-navy">طريقك نحو الدراسة في</span>
                <span className="relative inline-flex items-center min-h-[1.35em] mt-1 sm:mt-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[currentWordIndex]}
                      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="relative inline-block text-brand-electric font-black drop-shadow-[0_4px_24px_rgba(37,99,235,0.35)] pb-2.5"
                    >
                      {/* Active Destination Word */}
                      <span className="relative z-10">
                        {rotatingWords[currentWordIndex]}
                      </span>

                      {/* Ambient Blur Glow behind the rotating word */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -inset-x-6 -inset-y-3 -z-10 bg-brand-electric/15 blur-xl rounded-full scale-110 pointer-events-none"
                      />

                      {/* السطر المقوس الأنيق (Human Hand-Drawn Curved Swoosh Underline) */}
                      <div className="absolute -bottom-1.5 sm:-bottom-2 right-0 left-0 w-full h-3 sm:h-3.5 pointer-events-none select-none">
                        <svg
                          viewBox="0 0 140 16"
                          fill="none"
                          preserveAspectRatio="none"
                          className="w-full h-full overflow-visible"
                        >
                          {/* Ambient soft glow aura behind the curved stroke */}
                          <motion.path
                            key={`glow-${rotatingWords[currentWordIndex]}`}
                            d="M 138 3 C 95 15, 45 15, 2 5"
                            stroke="#2563EB"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            className="opacity-25 blur-[2.5px]"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          />

                          {/* Primary Hand-Drawn Elegant Curved Path (Animates Right-to-Left in RTL) */}
                          <motion.path
                            key={`curve-${rotatingWords[currentWordIndex]}`}
                            d="M 138 3 C 95 15, 45 15, 2 5"
                            stroke="#2563EB"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                      </div>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Subheading with generous line-height */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                مرافقة متكاملة لطلاب <strong>المغرب</strong> و<strong>الجزائر</strong>: 
                من اختيار الجامعة المناسبة والتخصص، استخراج القبول المعتمد والمنح الدراسية، 
                إلى غاية الحصول على التأشيرة والاستقرار في بلد الدراسة.
              </p>

              {/* Action Buttons (High-Conversion CTAs, strictly NO search bar) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://wa.me/212775496303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-brand-navy hover:bg-brand-electric shadow-lg shadow-navy/10 hover:shadow-glow-blue transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 text-brand-electric-light" />
                  <span>تحدث مع مستشار معتمد</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </a>

                <a
                  href="#destinations"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-brand-navy bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/80 shadow-xs transition-all"
                >
                  <Compass className="w-4 h-4 text-brand-electric" />
                  <span>استكشف الوجهات والمنح</span>
                </a>
              </div>
            </motion.div>

            {/* ======================================================== */}
            {/* Left Column (The Architectural Visual Centerpiece)       */}
            {/* Clean Glassmorphic Cards + Ambient Luminous Aura Depth   */}
            {/* ======================================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              {/* Standalone Visual Unit with dedicated bounds - SCALED TO BALANCE WITH RIGHT COLUMN */}
              <div className="relative w-full max-w-[370px] sm:max-w-[390px] lg:max-w-[400px] aspect-[4/4.9] flex items-center justify-center">

                {/* 1. Organic Backdrop Cloud Shape with Soft Fluid Outlines & Glass Depth */}
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-b from-[#EBF3FE]/85 via-[#E2EFFF]/75 to-[#D6E7FA]/80 backdrop-blur-md rounded-[45px] sm:rounded-[55px] z-0 overflow-hidden border border-white/90 shadow-[0_16px_40px_-12px_rgba(37,99,235,0.08),inset_0_2px_4px_rgba(255,255,255,0.9)]">
                  {/* Subtle inner luminous aura reflections */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/50 blur-xl" />
                  <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-40 h-40 rounded-full bg-[#CCE2FA]/60 blur-md" />
                  <div className="absolute -bottom-8 right-6 w-36 h-36 rounded-full bg-white/50 blur-xl" />
                </div>

                {/* 2. Student Avatar Image (Crisp, centered, perfectly grounded) */}
                <div className="relative w-full h-full flex items-end justify-center z-10 select-none pointer-events-none">
                  <div className="relative w-[88%] h-[92%]">
                    <Image
                      src="/hero-image.png"
                      alt="طالب في أوروبا - M&A Overseas Consulting"
                      fill
                      className="object-contain object-bottom drop-shadow-xl"
                      priority
                    />
                  </div>
                </div>

                {/* 3. Badge "قبول جامعي مضمون" (Glassmorphism with Inner Light Reflection) */}
                <motion.div
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-[12%] -left-2 sm:-left-5 z-20 p-2 sm:p-2.5 px-3 rounded-xl sm:rounded-2xl glass-card text-right animate-float"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center text-brand-electric flex-shrink-0 shadow-2xs">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold text-brand-navy whitespace-nowrap">
                        قبول جامعي مضمون
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                        دورة 2026 / 2027
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Badge "7 وجهات أوروبية" (Glassmorphism with Clean 7 Flags) */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute top-[40%] -right-1 sm:-right-3 z-20 p-2 sm:p-2.5 px-3 rounded-xl sm:rounded-2xl glass-card text-right animate-float-delayed"
                >
                  {/* Clean 7 Flags Row */}
                  <div className="flex items-center gap-1 mb-1">
                    {destinations.map((d) => (
                      <FlagCircle key={d.code} code={d.code} name={d.name} />
                    ))}
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-brand-navy whitespace-nowrap">
                    7 وجهات أوروبية معتمدة
                  </p>
                </motion.div>

                {/* 5. Badge "نسبة قبول التأشيرة" (Glassmorphism with Luminous Sparkline) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-4 -left-1 sm:-left-3 z-20 p-2 sm:p-2.5 px-3 rounded-xl sm:rounded-2xl glass-card text-right"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-medium text-slate-500 whitespace-nowrap">
                        نسبة قبول التأشيرة
                      </p>
                      <p className="text-xs sm:text-sm font-black text-brand-navy font-sans tracking-tight">
                        98.4%
                      </p>
                    </div>

                    {/* Mini SVG Sparkline Chart */}
                    <div className="w-11 h-6 flex items-end">
                      <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 2 24 Q 15 22, 25 14 T 45 12 T 58 4"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="58" cy="4" r="3.5" fill="#2563EB" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
