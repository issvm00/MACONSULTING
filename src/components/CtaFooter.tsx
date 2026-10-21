"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowLeft,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

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
  { label: "الرئيسية", href: "#hero" },
  { label: "الجامعات الشريكة", href: "#partners" },
  { label: "من نحن وفريقنا", href: "#about" },
  { label: "تجارب الطلاب", href: "#results" },
  { label: "مراحل التسجيل", href: "#processus" },
  { label: "شهادات الطلاب الصوتية", href: "#reviews" },
  { label: "الأسئلة الشائعة", href: "#faq" },
];

const STUDY_DESTINATIONS = [
  { code: "LT", label: "الدراسة في ليتوانيا" },
  { code: "RO", label: "الدراسة في رومانيا" },
  { code: "IT", label: "الدراسة في إيطاليا" },
  { code: "ES", label: "الدراسة في إسبانيا" },
  { code: "HU", label: "الدراسة في المجر" },
  { code: "MT", label: "الدراسة في مالطا" },
  { code: "IE", label: "الدراسة في أيرلندا" },
];

export function CtaFooter() {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <footer
      dir="rtl"
      className="relative w-full pt-2 sm:pt-6 pb-8 sm:pb-12 overflow-hidden select-none"
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
              ركّز على طموحك... واترك إجراءات القبول والتأشيرة علينا
            </h2>

            <p className="text-xs sm:text-base text-blue-50/90 font-normal leading-relaxed max-w-xl">
              من اختيار التخصص واستخراج القبول الجامعي المضمون، إلى غاية
              استقبالك في المطار وتأمين سكنك في أوروبا — نرافق طلابنا في المغرب
              والجزائر خطوة بخطوة.
            </p>

            {/* Crisp Pure White Pill Action Button */}
            <div className="pt-1.5 sm:pt-2">
              <a
                href="https://wa.me/212775496303?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%81%D8%B1%D9%8A%D9%82%20M%26A%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%84%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D9%81%D9%8A%20%D8%A3%D9%88%D8%B1%D9%88%D8%A8%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-brand-navy hover:bg-blue-50 active:scale-[0.97] font-bold text-xs sm:text-sm shadow-[0_14px_30px_-6px_rgba(7,18,40,0.35)] hover:shadow-[0_18px_38px_-6px_rgba(255,255,255,0.28)] transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-brand-electric shrink-0" />
                <span>احجز استشارتك المجانية الآن</span>
                <ArrowLeft className="w-4 h-4 text-brand-navy transition-transform duration-200 group-hover:-translate-x-1 shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. ARCHITECTURAL 4-COLUMN FOOTER GRID (2-Col Paired on Mobile)    */}
        {/* ================================================================= */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 sm:gap-10 lg:gap-8 items-start text-right">
          {/* --------------------------------------------------------------- */}
          {/* COLUMN 1 (Right - 4 Cols): Brand Identity, Bio & Social Icons   */}
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
              <div className="flex flex-col text-right">
                <span className="font-bold text-brand-navy text-xs flex items-center gap-1 whitespace-nowrap">
                  <span>M&A OVERSEAS</span>
                  <CheckCircle2 className="w-3 h-3 text-brand-electric shrink-0" />
                </span>
                <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                  مكتب معتمد للدراسة في أوروبا
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-sm">
              وجهتك الأولى والموثوقة للتوجيه الأكاديمي الدولي ومرافقة الطلاب من
              المغرب والجزائر نحو أفضل الجامعات والمعاهد الأوروبية، بشفافية
              مطلقة ومتابعة ميدانية من التوجيه حتى الاستقرار.
            </p>

            {/* Social Media Action Row */}
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/overseas_consulting_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="حساب M&A Overseas Consulting الرسمي على انستغرام"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-brand-electric hover:border-blue-200 shadow-sm transition-all duration-200 active:scale-95 text-xs font-bold group"
              >
                <InstagramIcon className="w-4 h-4 text-slate-500 group-hover:text-brand-electric transition-colors" />
                <span dir="ltr" className="text-[11px] tracking-tight">
                  @overseas_consulting_
                </span>
                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-brand-electric transition-colors" />
              </a>

              <a
                href="https://wa.me/212775496303"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="التواصل عبر واتساب"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-brand-electric hover:border-blue-200 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 2 (1 Col on Mobile, 2 Cols on Desktop): Quick Links      */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3.5">
            <h3 className="text-sm font-bold text-brand-navy tracking-tight">
              تصفح سريع
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-brand-electric transition-colors duration-150 inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
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
              الوجهات المعتمدة
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
              {STUDY_DESTINATIONS.map((dest) => {
                const whatsappQuery = encodeURIComponent(
                  `السلام عليكم فريق M&A، أرغب في استشارة مجانية حول ${dest.label}`
                );
                return (
                  <li key={dest.code}>
                    <a
                      href={`https://wa.me/212775496303?text=${whatsappQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-electric transition-colors duration-150 inline-flex items-center gap-2 group"
                    >
                      <FlagDot code={dest.code} />
                      <span>{dest.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 4 (Left - 4 Cols): Office & Direct Action Pill Box       */}
          {/* --------------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-brand-navy tracking-tight">
              المقر الرسمي والتواصل المباشر
            </h3>

            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
              تفضل بزيارة مكتبنا الرسمي في أكادير أو تواصل معنا مباشرة عبر
              الواتساب لحجز استشارتك الأكاديمية المجانية (حضورياً أو عن بُعد).
            </p>

            {/* Physical Address Info Line */}
            <div className="flex items-start gap-2 text-xs text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
              <span>
                المكتب الرسمي: إنزكان - شارع مراكش (أكادير)، المملكة المغربية
              </span>
            </div>

            {/* Interactive Capsule Bar (Matches the exact pill-input aesthetic of the reference image) */}
            <div className="p-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_8px_24px_-6px_rgba(11,27,61,0.05)] flex items-center justify-between gap-2 max-w-md">
              <a
                href="tel:+212775496303"
                className="flex items-center gap-2 pr-3 hover:text-brand-electric transition-colors"
                title="اتصال هاتفي مباشر"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 text-brand-electric flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span
                  dir="ltr"
                  className="text-xs sm:text-[13px] font-bold text-brand-navy hover:text-brand-electric tabular-nums whitespace-nowrap transition-colors"
                >
                  +212 775-496303
                </span>
              </a>

              <a
                href="https://wa.me/212775496303"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-brand-electric hover:bg-brand-navy text-white text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 shadow-sm group whitespace-nowrap"
              >
                <span>واتساب مباشر</span>
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. BOTTOM SOFT WHITE PILL BAR (EXACT REFERENCE FOOTER STRIP)      */}
        {/* ================================================================= */}
        <div className="mt-12 sm:mt-14 px-5 py-4 sm:px-7 sm:py-4 rounded-2xl sm:rounded-full bg-white/90 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} M&A Overseas Consulting. جميع الحقوق
            محفوظة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-500 font-medium">
            <a
              href="#about"
              className="hover:text-brand-electric transition-colors"
            >
              قصة التأسيس
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="#processus"
              className="hover:text-brand-electric transition-colors"
            >
              مراحل القبول والتأشيرة
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="#faq"
              className="hover:text-brand-electric transition-colors"
            >
              الأسئلة الشائعة
            </a>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <a
              href="https://www.instagram.com/overseas_consulting_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-electric transition-colors font-semibold text-brand-navy"
            >
              انستغرام الرسمي
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
