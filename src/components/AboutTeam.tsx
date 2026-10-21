"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

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

// Official Instagram Verified Badge SVG
function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label="حساب موثق"
      className="w-4 h-4 text-brand-electric fill-brand-electric shrink-0"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.8-3.8 1.4-1.4 2.4 2.4 5.4-5.4 1.4 1.4-6.8 6.8z" />
    </svg>
  );
}

interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  tagline: string;
  image: string;
  instagram: {
    handle: string;
    url: string;
    followers?: string;
  };
  isVerified: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "ali",
    name: "علي بنعمر",
    nameEn: "Ali Benamar",
    role: "المؤسس ومستشار التعليم الدولي",
    tagline: "مرافقة وتوجيه الطلبة نحو كبرى جامعات أوروبا مع حضور ميداني دائم.",
    image: "/team/ali_benamar.jpg",
    instagram: {
      handle: "benamar_a34",
      url: "https://www.instagram.com/benamar_a34/",
      followers: "19K+",
    },
    isVerified: true,
  },
  {
    id: "marouan",
    name: "مروان بنعمر",
    nameEn: "Marouan Ben Amar",
    role: "مدير العمليات والتنسيق الإداري",
    tagline: "إشراف دقيق على ملفات القبول والتأشيرات والتواصل المباشر مع العائلات.",
    image: "/team/marouan_ben_amar.jpg",
    instagram: {
      handle: "marouan.ben.amar",
      url: "https://www.instagram.com/marouan.ben.amar/",
      followers: "6K+",
    },
    isVerified: true,
  },
  {
    id: "amine",
    name: "محمد أمين جبون",
    nameEn: "M'Amine Jaboune",
    role: "المدير التنفيذي ومستشار التعليم الدولي",
    tagline: "التخطيط الأكاديمي الاستراتيجي وتأمين القبولات والمنح المخفّضة للطلبة.",
    image: "/team/amine_jaboune.jpg",
    instagram: {
      handle: "amine_jaboune",
      url: "https://www.instagram.com/amine_jaboune/",
    },
    isVerified: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Reusable Pure Card UI used identically in both Desktop Grid and Mobile 3D Coverflow
function MemberCard({
  member,
}: {
  member: TeamMember;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      dir="rtl"
      className="apple-glass rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between h-full group hover:border-blue-300 hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.14)] transition-all duration-300 select-none text-right"
    >
      {/* Outer Bezel Content */}
      <div>
        {/* Pure Portrait Image Frame (No badges or obstructions) */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-3 select-none">
          <Image
            src={member.image}
            alt={`${member.name} (${member.nameEn}) - ${member.role}`}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 240px"
            onLoad={() => setIsImageLoaded(true)}
            className={`object-cover object-top group-hover:scale-105 transition-[transform,opacity] duration-500 ease-out ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Member Meta */}
        <div className="space-y-1.5 px-1 text-right">
          {/* Name + Verified Badge immediately following the name */}
          <div className="flex items-center gap-1.5 justify-start">
            <h4 className="text-base font-bold text-brand-navy group-hover:text-brand-electric transition-colors duration-200">
              {member.name}
            </h4>
            {member.isVerified && <VerifiedBadge />}
          </div>

          {/* Official Role */}
          <p className="text-xs font-semibold text-brand-electric leading-snug">
            {member.role}
          </p>

          {/* Tagline / Responsibility */}
          <p className="text-[11px] text-slate-500 font-normal leading-relaxed pt-0.5">
            {member.tagline}
          </p>
        </div>
      </div>

      {/* Social Profile Footer Pill */}
      <div className="pt-3 mt-3 border-t border-slate-100 px-1">
        <a
          href={member.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 text-slate-600 hover:text-brand-electric transition-colors duration-150 text-[11px] font-semibold group/link"
          title={`زيارة حساب ${member.name} على انستغرام`}
        >
          <div className="flex items-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-brand-electric transition-colors" />
            <span dir="ltr" className="tracking-tight">
              @{member.instagram.handle}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {member.instagram.followers && (
              <span className="text-[10px] text-slate-400 font-medium">
                {member.instagram.followers}
              </span>
            )}
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-brand-electric transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
}

export function AboutTeam() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when Story Modal is open
  useEffect(() => {
    if (isStoryModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isStoryModalOpen]);

  // Handle ESC key to dismiss Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsStoryModalOpen(false);
      }
    };
    if (isStoryModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStoryModalOpen]);

  return (
    <section
      id="about"
      className="relative w-full pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ================================================================= */}
        {/* TOP EDITORIAL HEADER & VALUE PROPOSITION                          */}
        {/* ================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center max-w-4xl mx-auto mb-7 sm:mb-9"
        >
          {/* Section Title (Exact PartnersMarquee typographic style) */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight"
          >
            خلف كل قبول جامعي ناجح... فريق ميداني يرافقك
          </motion.h2>

          {/* Subtitle (Exact PartnersMarquee typographic style) */}
          <motion.p
            variants={itemVariants}
            className="mt-2 text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed"
          >
            مستشارون متواجدون ميدانياً بين المغرب وأوروبا لتأمين قبولك ومرافقتك باحترافية كاملة.
          </motion.p>
        </motion.div>

        {/* ================================================================= */}
        {/* THE ASYMMETRICAL ARCHITECTURAL BENTO GRID                         */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* --------------------------------------------------------------- */}
          {/* RIGHT COLUMN (Bento Authority & Trust Anchor - 5 cols)           */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Primary Trust Anchor Card */}
            <div className="apple-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-slate-200/90 shadow-[0_12px_32px_-10px_rgba(11,27,61,0.06)]">
              {/* Subtle Ambient Radial Glow (Zero filter:blur GPU cost) */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)",
                }}
              />

              <div className="relative z-10 space-y-4 text-right">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-electric">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
                    من واقع التجربة إلى التأسيس
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    لم تُبنَ M&A Overseas Consulting من فراغ، بل انطلقت من تجربة ذاتية خاضها مؤسسونا (علي ومحمد أمين) خلال رحلتهما الدراسية في أوروبا. اختبرا حجم التحديات في أوراق القبول ومساطر التأشيرة، فجعلا من تلك المعاناة جسراً أميناً نرافق به مئات الطلاب اليوم خطوة بخطوة نحو مقاعدهم الجامعية.
                  </p>

                  <div className="pt-0.5">
                    <button
                      type="button"
                      onClick={() => setIsStoryModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-electric hover:text-brand-navy active:scale-95 transition-all group cursor-pointer"
                    >
                      <span>اقرأ قصة التأسيس الكاملة</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* 3 Micro Trust Features */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      <strong>مقر رسمي مرخص:</strong> إنزكان - شارع مراكش (أكادير).
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      <strong>حضور مباشر في أوروبا:</strong> إرشاد ميداني واستقبال للطلبة في ليتوانيا وباقي الوجهات.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      <strong>مرافقة شخصية دون وسطاء:</strong> نأخذ بيدك من التوجيه واختيار التخصص حتى الاستقرار.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Quick CTA Card (Desktop / PC View: exactly as originally designed) */}
            <div className="hidden sm:flex p-5 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light text-white relative overflow-hidden shadow-sm items-center justify-between gap-4">
              <div className="space-y-1 text-right">
                <span className="text-[11px] font-bold text-brand-electric-light flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>تواصل مباشر مع المؤسسين</span>
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  احجز جلسة توجيه مجانية لمناقشة تخصصك المناسب في أوروبا.
                </p>
              </div>

              <Link
                href="/postuler"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-brand-navy hover:bg-brand-electric hover:text-white text-xs font-bold transition-all duration-200 shrink-0 group shadow-sm active:scale-95"
              >
                <span>احجز الآن</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* LEFT COLUMN (The Leadership Trio - 7 cols)                      */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-7 w-full">
            
            {/* ============================================================= */}
            {/* 1. DESKTOP & TABLET VIEW: Fixed 3-Column Bento Grid (>= 640px) */}
            {/* ============================================================= */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-[18px]">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>

            {/* ============================================================= */}
            {/* 2. MOBILE VIEW: 3D Coverflow Swipe Carousel (< 640px)          */}
            {/* ============================================================= */}
            <div className="block sm:hidden w-full">
              {isMounted && (
                <div dir="ltr" className="relative w-full overflow-hidden select-none py-1">
                  
                  {/* Top Minimalist Prev / Next Micro Arrows for Mobile */}
                  <div className="flex items-center justify-between px-2 mb-2">
                    <button
                      type="button"
                      onClick={() => mobileSwiperRef.current?.slidePrev()}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200/90 text-brand-navy flex items-center justify-center active:scale-90 shadow-sm transition-transform"
                      aria-label="السابق"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-[11px] font-bold text-slate-500 tabular-nums" dir="rtl">
                      {activeMobileIndex + 1} من {teamMembers.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => mobileSwiperRef.current?.slideNext()}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200/90 text-brand-navy flex items-center justify-center active:scale-90 shadow-sm transition-transform"
                      aria-label="التالي"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3D Coverflow Swiper */}
                  <Swiper
                    onSwiper={(swiper) => {
                      mobileSwiperRef.current = swiper;
                    }}
                    speed={420}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    slideToClickedSlide={true}
                    initialSlide={0}
                    watchSlidesProgress={true}
                    coverflowEffect={{
                      rotate: 6,
                      stretch: 14,
                      depth: 90,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    modules={[EffectCoverflow]}
                    className="w-full !overflow-visible [touch-action:pan-y]"
                    onSlideChange={(swiper) => setActiveMobileIndex(swiper.activeIndex)}
                  >
                    {teamMembers.map((member) => (
                      <SwiperSlide
                        key={member.id}
                        className="!w-[272px]"
                      >
                        <MemberCard member={member} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* 3 Interactive Pagination Dots Indicator */}
                  <div className="flex items-center justify-center gap-1.5 mt-4" aria-hidden="true">
                    {teamMembers.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => mobileSwiperRef.current?.slideTo(idx)}
                        aria-label={`عرض بطاقة ${m.name}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeMobileIndex === idx
                            ? "w-6 bg-brand-electric"
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                </div>
              )}
            </div>

            {/* Mobile Only: Direct Consultation CTA Card placed under Team Swiper (<640px) */}
            <div className="block sm:hidden mt-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light text-white relative overflow-hidden shadow-sm flex flex-col items-center text-center gap-3.5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-electric-light flex items-center justify-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>تواصل مباشر مع المؤسسين</span>
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    احجز جلسة توجيه مجانية لمناقشة تخصصك المناسب في أوروبا.
                  </p>
                </div>

                <Link
                  href="/postuler"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-brand-navy hover:bg-brand-electric hover:text-white text-xs font-bold transition-all duration-200 shrink-0 group shadow-sm active:scale-95"
                >
                  <span>احجز الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================================================================= */}
      {/* HIGH-END STORY MODAL (APPLE-GRADE LIQUID GLASS OVERLAY)           */}
      {/* ================================================================= */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-x-hidden overflow-y-auto">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsStoryModalOpen(false)}
              className="fixed inset-0 bg-[#071228]/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Window Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="story-modal-title"
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(11,27,61,0.3)] flex flex-col overflow-hidden text-right z-10"
              dir="rtl"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                  <span className="text-xs font-bold text-brand-navy">
                    عن M&A Overseas Consulting
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    قصة التأسيس
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-brand-navy hover:bg-slate-200/70 active:scale-90 transition-all cursor-pointer"
                  aria-label="إغلاق النافذة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Story Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
                {/* Visual Identity Capsule: Founders Cluster */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-100/80">
                  <div className="flex -space-x-2 space-x-reverse overflow-hidden shrink-0">
                    {teamMembers.map((m) => (
                      <div
                        key={m.id}
                        className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm"
                      >
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="36px"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-brand-navy">
                      فريق قيادة M&A Overseas Consulting
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      علي بنعمر • مروان بنعمر • محمد أمين جبون
                    </p>
                  </div>
                </div>

                {/* Main Heading */}
                <h3
                  id="story-modal-title"
                  className="text-lg sm:text-2xl font-bold text-brand-navy tracking-tight leading-snug"
                >
                  من واقع التجربة إلى التأسيس: كيف تحولت المعاناة إلى جسر أمين؟
                </h3>

                {/* Paragraphs from the client */}
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <p>
                    تُعتبر <strong>M&A Overseas Consulting</strong> وجهتك الأولى والموثوقة للتوجيه الأكاديمي الدولي، حيث نكرس خبراتنا الميدانية لمساعدة الطلاب على الالتحاق بأبرز الجامعات والأكاديميات الأوروبية. تسعى رؤيتنا إلى جعل التعليم العالي عالمي المستوى في متناول اليد، عبر تقديم حلول متكاملة واستشارات مخصصة تلبي طموح كل طالب وعائلته.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border-r-4 border-brand-electric border-y border-l border-slate-100 text-slate-700 italic">
                    «لم تُبْنَ M&A من فراغ، بل انطلقت من واقع تجربة ذاتية خاضها كل من علي ومحمد أمين أثناء رحلتهما الدراسية في الخارج. فقد اختبرا بنفسيهما حجم التحديات والمتاعب التي تواجه الشباب الراغبين في الهجرة التعليمية — بدءاً من تعقيدات أوراق القبول، ووصولاً إلى مساطر الفيزا وخطوات الاستقرار الأولية.»
                  </div>

                  <p>
                    دفعهما هذا التحدي الشخصي إلى تأسيس منصة استشارية متخصصة تُشكل جسراً أميناً بين الطلاب وأحلامهم الأكاديمية في أوروبا. نحن لا نكتفي بتقديم النصح النظري، بل نأخذ بيد الطالب خطوة بخطوة، بدءاً من رسم الخطة الدراسية المناسبة واختيار التخصص والجامعة، ووصولاً إلى تأمين المقعد الجامعي والمنح التنافسية وتجهيز ملف التأشيرة باحترافية تامة.
                  </p>

                  <p>
                    بفضل هذه الرؤية الميدانية الشاملة وتواجدنا الفعلي بين المغرب وأوروبا، تفخر مؤسستنا اليوم بتقديم الدعم لمئات الطلاب مع المحافظة على نسبة نجاح عالية في استصدار القبولات وتأشيرات السفر، لنظل الخيار الأمثل والداعم الأول لرحلتك نحو النجاح والتميز.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <Link
                  href="/postuler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-95 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light" />
                  <span>احجز استشارتك مع المؤسسين</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
