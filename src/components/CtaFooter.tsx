"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

// Crisp SVG Instagram Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Crisp SVG Facebook Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Crisp SVG YouTube Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Crisp SVG Country Flag Tokens for Footer Destinations Column
const FlagDot = memo(function FlagDot({ code }: { code: string }) {
  const renderFlag = () => {
    switch (code) {
      case "LT":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#FDB913" />
            <rect y="8" width="24" height="8" fill="#006A44" />
            <rect y="16" width="24" height="8" fill="#C1272D" />
          </svg>
        );
      case "RO":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#002B7F" />
            <rect x="8" width="8" height="24" fill="#FCD116" />
            <rect x="16" width="8" height="24" fill="#CE1126" />
          </svg>
        );
      case "IT":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#009246" />
            <rect x="8" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" width="8" height="24" fill="#CE2B37" />
          </svg>
        );
      case "ES":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="6" fill="#AA151B" />
            <rect y="6" width="24" height="12" fill="#F1BF00" />
            <rect y="18" width="24" height="6" fill="#AA151B" />
          </svg>
        );
      case "HU":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#CE2939" />
            <rect y="8" width="24" height="8" fill="#FFFFFF" />
            <rect y="16" width="24" height="8" fill="#477050" />
          </svg>
        );
      case "MT":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="12" height="24" fill="#FFFFFF" />
            <rect x="12" width="12" height="24" fill="#CF142B" />
            <circle cx="4" cy="4" r="2" fill="#94A3B8" />
          </svg>
        );
      case "IE":
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
    <span className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 inline-flex bg-white border border-slate-200/90 shadow-sm">
      {renderFlag()}
    </span>
  );
});

const QUICK_LINKS = [
  { labelAr: "الرئيسية", labelEn: "Home", href: "#hero" },
  {
    labelAr: "الجامعات الشريكة",
    labelEn: "Partner Universities",
    href: "#partners",
  },
  {
    labelAr: "من نحن وفريقنا",
    labelEn: "About & Leadership",
    href: "#about",
  },
  { labelAr: "دليل الوجهات", labelEn: "Destination Guides", href: "#results" },
  {
    labelAr: "مراحل التسجيل",
    labelEn: "Admission Process",
    href: "#processus",
  },
  {
    labelAr: "شهادات الطلاب الصوتية",
    labelEn: "Audio Testimonials",
    href: "#reviews",
  },
  { labelAr: "الأسئلة الشائعة", labelEn: "FAQ", href: "#faq" },
];

const STUDY_DESTINATIONS = [
  { code: "LT", labelAr: "الدراسة في ليتوانيا", labelEn: "Study in Lithuania" },
  { code: "RO", labelAr: "الدراسة في رومانيا", labelEn: "Study in Romania" },
  { code: "IT", labelAr: "الدراسة في إيطاليا", labelEn: "Study in Italy" },
  { code: "ES", labelAr: "الدراسة في إسبانيا", labelEn: "Study in Spain" },
  { code: "HU", labelAr: "الدراسة في المجر", labelEn: "Study in Hungary" },
  { code: "MT", labelAr: "الدراسة في مالطا", labelEn: "Study in Malta" },
  { code: "IE", labelAr: "الدراسة في أيرلندا", labelEn: "Study in Ireland" },
];

export function CtaFooter() {
  const { language, isRTL } = useLanguage();
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full pt-2 sm:pt-6 pb-8 sm:pb-12 overflow-x-clip select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================================================================= */}
        {/* 1. FLOATING LIQUID MESH CTA BANNER (ROYAL ELECTRIC WAVE)          */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: TRANSITION_EASE }}
          className="relative w-full rounded-[28px] sm:rounded-[38px] overflow-hidden px-5 py-11 sm:px-12 sm:py-16 lg:py-20 text-center shadow-[0_24px_60px_-14px_rgba(29,78,216,0.34)] border border-blue-400/35 transform-gpu"
          style={{
            background:
              "linear-gradient(125deg, #09193A 0%, #1746B8 34%, #2563EB 66%, #38BDF8 100%)",
          }}
        >
          {/* Sculpted Silk Wave SVG Layer (Exact S-Curve Ribbon Physics from Reference Image, in Royal Blue/Cyan) */}
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient
                id="ctaSilkWavePrimary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.48" />
                <stop offset="45%" stopColor="#2563EB" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#071228" stopOpacity="0.68" />
              </linearGradient>

              <linearGradient
                id="ctaSilkWaveHighlight"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.44" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="ctaCornerSun" cx="88%" cy="18%" r="58%">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.48" />
                <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0B1B3D" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Top-Right Luminous Silk Glow */}
            <rect width="1200" height="500" fill="url(#ctaCornerSun)" />

            {/* Deep Flowing S-Curve Fold (Matches the dramatic diagonal fold in the reference image) */}
            <path
              d="M -80 -40 C 160 320, 420 60, 790 360 C 980 510, 1140 440, 1280 520 L 1280 540 L -80 540 Z"
              fill="url(#ctaSilkWavePrimary)"
            />

            {/* Secondary sweeping silk crest */}
            <path
              d="M 140 -60 C 360 210, 680 -20, 1020 310 C 1130 415, 1220 450, 1280 490 L 1280 -60 Z"
              fill="url(#ctaSilkWaveHighlight)"
            />
          </svg>

          {/* Subtle Inner Specular Rim Highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[28px] sm:rounded-[38px] pointer-events-none shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.28)]"
          />

          {/* Centered CTA Content (Pure Headline + Subtext + White Pill Button) */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.28] [text-wrap:balance]">
              {language === "ar"
                ? "ركّز على طموحك... واترك إجراءات القبول والتأشيرة علينا"
                : "Focus on Your Ambition... And Leave the Admission & Visa Process to Us"}
            </h2>

            <p className="text-xs sm:text-base text-blue-50/90 font-normal leading-relaxed max-w-xl">
              {language === "ar"
                ? "من اختيار التخصص واستخراج القبول الجامعي المضمون، إلى غاية استقبالك في المطار وتأمين سكنك في أوروبا — نرافق طلابنا في العالم العربي خطوة بخطوة."
                : "From choosing your major and securing guaranteed university admission to welcoming you at the airport and arranging your housing in Europe — we guide students across the Arab World step by step."}
            </p>

            {/* Crisp Pure White Pill Action Button */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                href="/postuler"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-brand-navy hover:bg-blue-50 active:scale-[0.97] font-bold text-xs sm:text-sm shadow-[0_14px_30px_-6px_rgba(7,18,40,0.35)] hover:shadow-[0_18px_38px_-6px_rgba(255,255,255,0.28)] transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-brand-electric shrink-0" />
                <span>
                  {language === "ar"
                    ? "احجز استشارتك المجانية الآن"
                    : "Book Your Free Consultation Now"}
                </span>
                <DirectionalArrow
                  className={`w-4 h-4 text-brand-navy transition-transform duration-200 ${
                    isRTL
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  } shrink-0`}
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. ARCHITECTURAL 4-COLUMN FOOTER GRID (2-Col Paired on Mobile)    */}
        {/* ================================================================= */}
        <div
          className={`mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 sm:gap-10 lg:gap-8 items-start ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* --------------------------------------------------------------- */}
          {/* COLUMN 1 (Start - 4 Cols): Brand Identity, Bio & Social Icons   */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link
              href="#hero"
              className="inline-flex items-center gap-3 group"
            >
              <Image
                src="/logo/logo.png"
                alt="M&A OVERSEAS CONSULTING"
                width={220}
                height={102}
                referrerPolicy="no-referrer"
                onLoad={() => setIsLogoLoaded(true)}
                className={`w-auto h-10 sm:h-11 object-contain transition-opacity duration-500 ease-out ${
                  isLogoLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              <span
                className="w-[1px] h-6 bg-slate-200/90"
                aria-hidden="true"
              />
              <div
                className={`flex flex-col ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <span className="font-bold text-brand-navy text-xs flex items-center gap-1 whitespace-nowrap">
                  <span>M&A OVERSEAS</span>
                  <CheckCircle2 className="w-3 h-3 text-brand-electric shrink-0" />
                </span>
                <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                  {language === "ar"
                    ? "مكتب معتمد للدراسة في أوروبا"
                    : "Certified Study in Europe Agency"}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-sm">
              {language === "ar"
                ? "وجهتك الأولى والموثوقة للتوجيه الأكاديمي الدولي ومرافقة الطلاب في العالم العربي نحو أفضل الجامعات والمعاهد الأوروبية، بشفافية مطلقة ومتابعة ميدانية من التوجيه حتى الاستقرار."
                : "Your premier, trusted partner for international academic counseling—guiding students across the Arab World to top European universities and institutes with full transparency and on-ground support from counseling to settlement."}
            </p>

            {/* Social Media Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/overseas_consulting_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  language === "ar"
                    ? "حساب M&A Overseas Consulting الرسمي على انستغرام"
                    : "M&A Overseas Consulting Official Instagram"
                }
                title="@overseas_consulting_"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 border border-slate-200/90 hover:border-pink-200 text-slate-600 hover:text-pink-600 shadow-2xs transition-all duration-200 active:scale-95 text-xs font-semibold group"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-500 transition-transform group-hover:scale-110 shrink-0" />
                <span>{language === "ar" ? "انستغرام" : "Instagram"}</span>
              </a>

              <a
                href="https://www.facebook.com/centremaconsulting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  language === "ar"
                    ? "صفحة M&A Overseas Consulting الرسمية على فيسبوك"
                    : "M&A Overseas Consulting Official Facebook"
                }
                title="Centre M&A Consulting"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-200 text-slate-600 hover:text-[#1877F2] shadow-2xs transition-all duration-200 active:scale-95 text-xs font-semibold group"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2] transition-transform group-hover:scale-110 shrink-0" />
                <span>{language === "ar" ? "فيسبوك" : "Facebook"}</span>
              </a>

              <a
                href="https://www.youtube.com/@ALI_IN_LITHUANIA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  language === "ar"
                    ? "القناة الرسمية على يوتيوب @ALI_IN_LITHUANIA"
                    : "Official YouTube Channel @ALI_IN_LITHUANIA"
                }
                title="@ALI_IN_LITHUANIA"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-red-50 border border-slate-200/90 hover:border-red-200 text-slate-600 hover:text-[#DC2626] shadow-2xs transition-all duration-200 active:scale-95 text-xs font-semibold group"
              >
                <YoutubeIcon className="w-4 h-4 text-[#DC2626] transition-transform group-hover:scale-110 shrink-0" />
                <span>{language === "ar" ? "يوتيوب" : "YouTube"}</span>
              </a>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 2 (1 Col on Mobile, 2 Cols on Desktop): Quick Links      */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3.5">
            <h3 className="text-sm font-bold text-brand-navy tracking-tight">
              {language === "ar" ? "تصفح سريع" : "Quick Links"}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-brand-electric transition-colors duration-150 inline-flex items-center gap-1.5"
                  >
                    <span>
                      {language === "ar" ? link.labelAr : link.labelEn}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 3 (1 Col on Mobile, 2 Cols on Desktop): 7 Destinations   */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3.5">
            <h3 className="text-sm font-bold text-brand-navy tracking-tight">
              {language === "ar" ? "الوجهات المعتمدة" : "Accredited Destinations"}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
              {STUDY_DESTINATIONS.map((dest) => (
                <li key={dest.code}>
                  <Link
                    href={`/postuler?destination=${dest.code}`}
                    className="hover:text-brand-electric transition-colors duration-150 inline-flex items-center gap-2 group"
                  >
                    <FlagDot code={dest.code} />
                    <span>
                      {language === "ar" ? dest.labelAr : dest.labelEn}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 4 (End - 4 Cols): Office & Direct Action Pill Box        */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-brand-navy tracking-tight">
              {language === "ar"
                ? "المقر الرسمي والتواصل المباشر"
                : "Official HQ & Direct Contact"}
            </h3>

            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
              {language === "ar"
                ? "تفضل بزيارة مكتبنا الرسمي في أكادير أو تواصل معنا مباشرة عبر الواتساب لحجز استشارتك الأكاديمية المجانية (حضورياً أو عن بُعد)."
                : "Visit our official office in Agadir or contact us directly via WhatsApp to book your free academic consultation (in-person or remotely)."}
            </p>

            {/* Physical Address Badges */}
            <div className="space-y-2">
              <a
                href="https://maps.app.goo.gl/6TZ6Wq55QJyhE9yf7"
                target="_blank"
                rel="noopener noreferrer"
                title={
                  language === "ar"
                    ? "فتح موقع المقر الرئيسي على خرائط جوجل"
                    : "Open Headquarters Location on Google Maps"
                }
                className="p-2.5 rounded-xl bg-white/90 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 shadow-2xs flex items-center gap-2.5 text-xs transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-brand-electric shrink-0" />
                <div className="flex flex-wrap items-center gap-1.5 text-slate-700">
                  <span className="font-bold text-brand-navy group-hover:text-brand-electric transition-colors">
                    {language === "ar" ? "المقر الرئيسي:" : "Headquarters:"}
                  </span>
                  <span className="group-hover:text-brand-navy transition-colors">
                    {language === "ar"
                      ? "إنزكان - شارع مراكش (أكادير)"
                      : "Inezgane - Marrakech Ave (Agadir)"}
                  </span>
                </div>
              </a>

              <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex flex-wrap items-center gap-1.5 text-slate-700">
                  <span className="font-bold text-brand-navy">
                    {language === "ar"
                      ? "المكاتب الأوروبية:"
                      : "European Offices:"}
                  </span>
                  <span>
                    {language === "ar"
                      ? "برشلونة (إسبانيا) · فيلنيوس (ليتوانيا)"
                      : "Barcelona (Spain) · Vilnius (Lithuania)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Capsule Bar */}
            <div className="p-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_8px_24px_-6px_rgba(11,27,61,0.05)] flex items-center justify-between gap-2 max-w-md">
              <a
                href="tel:+37066059704"
                className={`flex items-center gap-2 ${
                  isRTL ? "pr-3" : "pl-3"
                } hover:text-brand-electric transition-colors`}
                title={
                  language === "ar" ? "اتصال هاتفي مباشر" : "Direct Phone Call"
                }
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 text-brand-electric flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span
                  dir="ltr"
                  className="text-xs sm:text-[13px] font-bold text-brand-navy hover:text-brand-electric tabular-nums whitespace-nowrap transition-colors"
                >
                  +370 660 59704
                </span>
              </a>

              <a
                href="https://wa.me/37066059704"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-brand-electric hover:bg-brand-navy text-white text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 shadow-sm group whitespace-nowrap"
              >
                <span>
                  {language === "ar" ? "واتساب مباشر" : "Direct WhatsApp"}
                </span>
                <DirectionalArrow
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isRTL
                      ? "group-hover:-translate-x-0.5"
                      : "group-hover:translate-x-0.5"
                  }`}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. REFINED BOTTOM SUB-BAR (CLEAN, UNCLUTTERED, RESPONSIVE)        */}
        {/* ================================================================= */}
        <div
          className={`mt-12 sm:mt-16 px-6 py-4 sm:px-8 sm:py-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4 text-center ${
            isRTL ? "md:text-right" : "md:text-left"
          }`}
        >
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} M&A Overseas Consulting.{" "}
            {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          {/* Powered by UIDevelop */}
          <a
            href="https://wa.me/212659349471"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50/80 hover:bg-sky-100/90 border border-sky-200/70 hover:border-sky-300 text-xs transition-all duration-200 shadow-2xs hover:shadow-xs order-last md:order-none cursor-pointer"
            title="UIDevelop (WhatsApp: +212 659-349471)"
          >
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Powered by
            </span>
            <span className="font-bold text-sky-500 group-hover:text-sky-600 transition-colors inline-flex items-center gap-1">
              UIDevelop
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:bg-sky-500 animate-pulse" />
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-slate-500 font-medium">
            <a
              href="#hero"
              className="hover:text-brand-electric transition-colors"
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="#about"
              className="hover:text-brand-electric transition-colors"
            >
              {language === "ar" ? "قصة التأسيس" : "Our Story"}
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="#processus"
              className="hover:text-brand-electric transition-colors"
            >
              {language === "ar"
                ? "مراحل القبول والتأشيرة"
                : "Admission & Visa Process"}
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="#faq"
              className="hover:text-brand-electric transition-colors"
            >
              {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <Link
              href="/postuler"
              className="text-brand-electric hover:underline font-bold"
            >
              {language === "ar" ? "تقديم طلب تسجيل" : "Apply Now"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
