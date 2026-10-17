"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  FileText,
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  Plane,
  Building2,
  Luggage,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badgePosition: "top" | "bottom";
  variant: "solid" | "outline";
}

// Exactly 8 steps matching the visual rhythm and layout of reference image
const row1Steps: StepItem[] = [
  {
    number: "01",
    title: "إستشارة مجانية وتوجيه",
    description:
      "نرافق طلابنا في اختيار الجامعة المناسبة، التخصص المثالي، والمدينة الأنسب.",
    icon: Headphones,
    badgePosition: "bottom",
    variant: "solid",
  },
  {
    number: "02",
    title: "إعداد الملف",
    description: "نتولى إجراءات تقديم الطلبات لطلابنا ومطابقتها للشروط الأكاديمية.",
    icon: FileText,
    badgePosition: "top",
    variant: "outline",
  },
  {
    number: "03",
    title: "الجامعات والمنح",
    description: "نساعد طلابنا في التسجيل بالجامعات وتأمين منحة دراسية مخفّضة أو كاملة.",
    icon: GraduationCap,
    badgePosition: "bottom",
    variant: "solid",
  },
  {
    number: "04",
    title: "100% القبول الجامعي",
    description: "نضمن استخراج القبول الجامعي الرسمي في فترة تتراوح بين 10 إلى 20 يوماً.",
    icon: BadgeCheck,
    badgePosition: "top",
    variant: "outline",
  },
];

const row2Steps: StepItem[] = [
  {
    number: "05",
    title: "التقديم للحصول على تأشيرة",
    description:
      "نعد ملف التأشيرة بواسطة خبير ونقوم بحجز موعد مع القنصلية مع ضمان تأشيرة بنسبة 100%.",
    icon: ShieldCheck,
    badgePosition: "bottom",
    variant: "solid",
  },
  {
    number: "06",
    title: "حجز تذاكر الطيران",
    description: "نحجز تذاكر الطيران لجميع الطلبة من نفس الجامعة للسفر معاً في رحلة مريحة.",
    icon: Plane,
    badgePosition: "top",
    variant: "outline",
  },
  {
    number: "07",
    title: "السكن الجامعي",
    description: "نقوم بحجز مسبق ومضمون لإقامة الطالب في السكن الجامعي أو استوديو مستقل.",
    icon: Building2,
    badgePosition: "bottom",
    variant: "solid",
  },
  {
    number: "08",
    title: "استقبال في المطار",
    description:
      "نستقبل الطلبة في المطار من قبل المرافق، ثم ننقلهم للإقامة للاستقرار وبدء الدراسة.",
    icon: Luggage,
    badgePosition: "top",
    variant: "outline",
  },
];

function StepMilestone({
  step,
  globalIndex,
}: {
  step: StepItem;
  globalIndex: number;
}) {
  const Icon = step.icon;
  const isSolid = step.variant === "solid";
  const isBadgeTop = step.badgePosition === "top";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (globalIndex % 4) * 0.1 }}
      className="group relative flex flex-col items-center text-center z-10"
    >
      {/* Circle Milestone Container with Top or Bottom Number Badge */}
      <div className="relative">
        {/* Outer Dashed Circle Ring */}
        <div
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed p-2 sm:p-2.5 transition-all duration-300 ${
            isSolid
              ? "border-blue-400/80 group-hover:border-brand-electric group-hover:scale-105"
              : "border-slate-300 group-hover:border-brand-electric group-hover:scale-105"
          }`}
        >
          {/* Inner Circle Disc */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
              isSolid
                ? "bg-gradient-to-br from-blue-600 to-brand-electric text-white shadow-[0_10px_26px_rgba(37,99,235,0.35)]"
                : "bg-white border border-slate-200/90 text-brand-electric shadow-xs group-hover:shadow-[0_10px_26px_rgba(37,99,235,0.15)]"
            }`}
          >
            <Icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Number Badge (Alternating Top / Bottom) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 flex items-center justify-center font-black text-xs sm:text-sm shadow-xs transition-all duration-300 z-20 ${
            isBadgeTop
              ? "-top-3 sm:-top-3.5"
              : "-bottom-3 sm:-bottom-3.5"
          } ${
            isSolid
              ? "border-slate-300 text-brand-navy group-hover:border-brand-electric group-hover:text-brand-electric"
              : "border-slate-300 text-brand-navy group-hover:border-brand-electric group-hover:text-brand-electric"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Title & Description underneath */}
      <div className="mt-6 sm:mt-7 space-y-1.5 max-w-[240px]">
        <h3 className="text-base sm:text-lg font-extrabold text-brand-navy group-hover:text-brand-electric transition-colors">
          {step.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function RegistrationSteps() {
  return (
    <section id="processus" className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-brand-navy tracking-tight leading-[1.25]">
            مراحل التسجيل والمرافقة{" "}
            <span className="text-brand-electric">خطوة بخطوة</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
          </p>
        </div>

        {/* --- ROW 1 (Steps 01 to 04) --- */}
        <div className="relative mb-14 sm:mb-18 pt-6 sm:pt-8">
          {/* Subtle Horizontal Dashed Track Line behind circles on Desktop */}
          <div
            className="hidden lg:block absolute top-[80px] sm:top-[88px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 pointer-events-none z-0"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-6 relative z-10">
            {row1Steps.map((step, index) => (
              <StepMilestone
                key={step.number}
                step={step}
                globalIndex={index}
              />
            ))}
          </div>
        </div>

        {/* --- ROW 2 (Steps 05 to 08) --- */}
        <div className="relative mb-16 sm:mb-20 pt-6 sm:pt-8">
          {/* Subtle Horizontal Dashed Track Line behind circles on Desktop */}
          <div
            className="hidden lg:block absolute top-[80px] sm:top-[88px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 pointer-events-none z-0"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-6 relative z-10">
            {row2Steps.map((step, index) => (
              <StepMilestone
                key={step.number}
                step={step}
                globalIndex={index + 4}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 sm:p-10 rounded-3xl apple-glass border-blue-200/80 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden"
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-right">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-black text-brand-navy">
                مستعد لبدء خطوتك الأولى نحو جامعات أوروبا؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تواصل الآن مع مستشارينا المعتمدين لبدء <strong>الخطوة 01 مجاناً</strong> وتحديد أفضل جامعة وتخصص يتناسب مع مؤهلاتك وطموحك.
              </p>
            </div>

            {/* Direct Action Single WhatsApp CTA Button */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <a
                href="https://wa.me/212775496303"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-brand-navy hover:bg-brand-electric shadow-lg shadow-navy/15 hover:shadow-glow-blue transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-brand-electric-light" />
                <span>احجز استشارة مجانية</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
