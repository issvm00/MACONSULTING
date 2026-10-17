"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  GraduationCap,
  ArrowLeft,
  Compass,
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

  // Apple & Linear Signature Easing [0.16, 1, 0.3, 1]
  const transitionEase = [0.16, 1, 0.3, 1] as const;

  // Orchestrated Stagger Container for the Text Column
  const heroTextContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  // Cinematic Blur-Glide for H1, Paragraph, and Action Buttons
  const heroItemVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: transitionEase,
      },
    },
  };

  // Visual Centerpiece (Student Image & Cloud shape)
  const visualCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 28, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.0,
        ease: transitionEase,
        delay: 0.22,
      },
    },
  };

  // Floating Glassmorphic Badges entrance variants
  const badgeVariants = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.9, y: 16, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: transitionEase,
        delay,
      },
    },
  });

  return (
    <div id="hero" className="relative min-h-screen flex flex-col text-brand-navy overflow-x-clip scroll-mt-20">
      {/* Main Hero Body (Balanced Grid with Organic Glassmorphism) */}
      <main className="flex-1 flex items-center pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ======================================================== */}
            {/* Right Column (Text & Value Proposition)                  */}
            {/* ======================================================== */}
            <motion.div
              variants={heroTextContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 text-right space-y-5 lg:pr-2"
            >
              {/* H1 Heading in IBM Plex Sans Arabic with Dynamic Destination Morph */}
              <motion.h1
                variants={heroItemVariants}
                className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-brand-navy tracking-tight leading-[1.3]"
              >
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
              </motion.h1>

              {/* Subheading with generous line-height */}
              <motion.p
                variants={heroItemVariants}
                className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl"
              >
                مرافقة متكاملة لطلاب <strong>المغرب</strong> و<strong>الجزائر</strong>: 
                من اختيار الجامعة المناسبة والتخصص، استخراج القبول المعتمد والمنح الدراسية، 
                إلى غاية الحصول على التأشيرة والاستقرار في بلد الدراسة.
              </motion.p>

              {/* Action Buttons (High-Conversion CTAs, strictly NO search bar) */}
              <motion.div
                variants={heroItemVariants}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
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
              </motion.div>
            </motion.div>

            {/* ======================================================== */}
            {/* Left Column (The Architectural Visual Centerpiece)       */}
            {/* Clean Glassmorphic Cards + Ambient Luminous Aura Depth   */}
            {/* ======================================================== */}
            <motion.div
              variants={visualCardVariants}
              initial="hidden"
              animate="visible"
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
                  variants={badgeVariants(0.4)}
                  initial="hidden"
                  animate="visible"
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
                  variants={badgeVariants(0.5)}
                  initial="hidden"
                  animate="visible"
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
                  variants={badgeVariants(0.6)}
                  initial="hidden"
                  animate="visible"
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
