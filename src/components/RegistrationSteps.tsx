"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
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

// All 8 steps unified into a single continuous horizontal timeline (01 -> 08)
const allSteps: StepItem[] = [
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
    description:
      "نتولى إجراءات تقديم الطلبات لطلابنا ومطابقتها للشروط الأكاديمية.",
    icon: FileText,
    badgePosition: "top",
    variant: "outline",
  },
  {
    number: "03",
    title: "الجامعات والمنح",
    description:
      "نساعد طلابنا في التسجيل بالجامعات وتأمين منحة دراسية مخفّضة أو كاملة.",
    icon: GraduationCap,
    badgePosition: "bottom",
    variant: "solid",
  },
  {
    number: "04",
    title: "100% القبول الجامعي",
    description:
      "نضمن استخراج القبول الجامعي الرسمي في فترة تتراوح بين 10 إلى 20 يوماً.",
    icon: BadgeCheck,
    badgePosition: "top",
    variant: "outline",
  },
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
    description:
      "نحجز تذاكر الطيران لجميع الطلبة من نفس الجامعة للسفر معاً في رحلة مريحة.",
    icon: Plane,
    badgePosition: "top",
    variant: "outline",
  },
  {
    number: "07",
    title: "السكن الجامعي",
    description:
      "نقوم بحجز مسبق ومضمون لإقامة الطالب في السكن الجامعي أو استوديو مستقل.",
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

function DesktopStepMilestone({
  step,
  index,
  desktopShift,
}: {
  step: StepItem;
  index: number;
  desktopShift: MotionValue<number>;
}) {
  const Icon = step.icon;
  const isSolid = step.variant === "solid";
  const isBadgeTop = step.badgePosition === "top";

  // Desktop shows 3 steps at once: step `index` is inside the 3 visible slots when `desktopShift` is in [index - 2, index]
  const opacity = useTransform(
    desktopShift,
    [index - 2.65, index - 2, index, index + 0.65],
    [0.18, 1, 1, 0.18]
  );

  const scale = useTransform(
    desktopShift,
    [index - 2.65, index - 2, index, index + 0.65],
    [0.86, 1, 1, 0.86]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="group relative flex flex-col items-center text-center z-10 w-[12.5%] shrink-0 px-3 sm:px-4 lg:px-6 select-none will-change-[transform,opacity] transform-gpu"
    >
      {/* Circle Milestone Container with Alternating Top or Bottom Number Badge */}
      <div className="relative">
        {/* Outer Dashed Circle Ring */}
        <div
          className={`w-28 h-28 lg:w-32 lg:h-32 rounded-full border-2 border-dashed p-2.5 bg-[#FAFBFD] transition-[transform,border-color] duration-250 ease-out ${
            isSolid
              ? "border-blue-400/85 group-hover:border-brand-electric group-hover:scale-105"
              : "border-slate-300 group-hover:border-brand-electric group-hover:scale-105"
          }`}
        >
          {/* Inner Circle Disc */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-shadow duration-250 ${
              isSolid
                ? "bg-gradient-to-br from-blue-600 to-brand-electric text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]"
                : "bg-white border border-slate-200/90 text-brand-electric shadow-xs group-hover:shadow-[0_10px_24px_rgba(37,99,235,0.14)]"
            }`}
          >
            <Icon className="w-8 h-8 lg:w-9 lg:h-9 stroke-[1.8] transition-transform duration-250 ease-out group-hover:scale-110" />
          </div>
        </div>

        {/* Number Badge (Alternating Top / Bottom) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center font-bold text-sm shadow-xs transition-colors duration-250 z-20 tabular-nums ${
            isBadgeTop ? "-top-3.5" : "-bottom-3.5"
          } ${
            isSolid
              ? "border-brand-electric text-brand-electric"
              : "border-slate-300 text-brand-navy group-hover:border-brand-electric group-hover:text-brand-electric"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Title & Description underneath */}
      <div className="mt-7 space-y-1.5 max-w-[235px]">
        <h3 className="text-base lg:text-lg font-bold text-brand-navy group-hover:text-brand-electric transition-colors duration-200 leading-snug">
          {step.title}
        </h3>
        <p className="text-xs lg:text-sm text-slate-500 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Mobile Step Milestone: Exact UI/UX from commit c53dae0 (used ONLY on phone <640px)
function MobileStepMilestone({
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
          className={`w-28 h-28 rounded-full border-2 border-dashed p-2 transition-all duration-300 ${
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
            <Icon className="w-8 h-8 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Number Badge (Alternating Top / Bottom) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center font-black text-xs shadow-xs transition-all duration-300 z-20 ${
            isBadgeTop ? "-top-3" : "-bottom-3"
          } border-slate-300 text-brand-navy group-hover:border-brand-electric group-hover:text-brand-electric`}
        >
          {step.number}
        </div>
      </div>

      {/* Title & Description underneath */}
      <div className="mt-6 space-y-1.5 max-w-[240px]">
        <h3 className="text-base font-extrabold text-brand-navy group-hover:text-brand-electric transition-colors">
          {step.title}
        </h3>
        <p className="text-xs text-slate-500 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Isolated leaf component for the live step counter on Desktop
function ScrollStepCounter({
  desktopShift,
  desktopProgressScale,
}: {
  desktopShift: MotionValue<number>;
  desktopProgressScale: MotionValue<number>;
}) {
  const [reachedStep, setReachedStep] = useState<number>(3);

  useEffect(() => {
    setReachedStep(Math.min(8, Math.max(3, Math.round(desktopShift.get()) + 3)));
  }, [desktopShift]);

  useMotionValueEvent(desktopShift, "change", (latest) => {
    const nextStep = Math.min(8, Math.max(3, Math.round(latest) + 3));
    setReachedStep((prev) => (prev !== nextStep ? nextStep : prev));
  });

  const formattedCurrent = reachedStep < 10 ? `0${reachedStep}` : `${reachedStep}`;

  return (
    <div className="mt-6 flex flex-col items-center gap-2 select-none">
      {/* Dynamic Step Counter Pill + 8 Micro Dots */}
      <div className="flex items-center gap-3 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/85 shadow-2xs">
        <span className="text-xs font-bold text-brand-navy tabular-nums">
          المرحلة{" "}
          <span className="text-brand-electric">{formattedCurrent}</span>{" "}
          <span className="text-slate-400 font-medium">من 08</span>
        </span>

        <span className="w-[1px] h-3 bg-slate-200" aria-hidden="true" />

        {/* 8 Step Dots (RTL right-to-left) */}
        <div className="flex items-center gap-1" aria-hidden="true">
          {allSteps.map((s, idx) => {
            const stepNum = idx + 1;
            const isReached = stepNum <= reachedStep;
            const isCurrentHead = stepNum === reachedStep;
            return (
              <span
                key={s.number}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  isCurrentHead
                    ? "w-3.5 bg-brand-electric"
                    : isReached
                    ? "w-1.5 bg-blue-400/75"
                    : "w-1.5 bg-slate-200"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Smooth Continuous Progress Bar */}
      <div className="w-48 h-1.5 rounded-full bg-slate-200/80 overflow-hidden p-0 transform-gpu">
        <motion.div
          style={{
            scaleX: desktopProgressScale,
            transformOrigin: "right",
          }}
          className="w-full h-full rounded-full bg-brand-electric"
        />
      </div>
    </div>
  );
}

const row1Steps = allSteps.slice(0, 4);
const row2Steps = allSteps.slice(4, 8);

export function RegistrationSteps() {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Desktop scroll tracking
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // Critically-damped spring for Desktop timeline
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    mass: 0.14,
    restDelta: 0.0005,
  });

  // DESKTOP/TABLET (>=640px): 10% entry hold buffer so Steps 01-03 rest calmly when entering the section
  const desktopShift = useTransform(
    smoothProgress,
    [0, 0.1, 0.94, 1],
    [0, 0, 5, 5]
  );

  // Desktop horizontal translation in RTL (5/8 = 62.5%)
  const xPercent = useTransform(desktopShift, [0, 5], ["0%", "62.5%"]);

  // Desktop active blue line along the connector between circles (grows right to left in RTL)
  const lineProgressScale = useTransform(desktopShift, [0, 5], [0.28, 1]);

  // Dedicated progress bar MotionValue for Desktop
  const desktopProgressScale = useTransform(desktopShift, [0, 5], [0.375, 1]);

  return (
    <section id="processus" className="relative w-full scroll-mt-20">
      {/* ===================================================================== */}
      {/* MOBILE VERSION (<640px): Exact UI/UX from commit c53dae0              */}
      {/* ===================================================================== */}
      <div className="block sm:hidden w-full pt-8 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl font-extrabold text-brand-navy tracking-tight leading-[1.25]">
              مراحل التسجيل والمرافقة{" "}
              <span className="text-brand-electric">خطوة بخطوة</span>
            </h2>
            <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
            </p>
          </div>

          {/* --- ROW 1 (Steps 01 to 04) --- */}
          <div className="relative mb-14 pt-6">
            <div className="grid grid-cols-1 gap-12 relative z-10">
              {row1Steps.map((step, index) => (
                <MobileStepMilestone
                  key={step.number}
                  step={step}
                  globalIndex={index}
                />
              ))}
            </div>
          </div>

          {/* --- ROW 2 (Steps 05 to 08) --- */}
          <div className="relative mb-16 pt-6">
            <div className="grid grid-cols-1 gap-12 relative z-10">
              {row2Steps.map((step, index) => (
                <MobileStepMilestone
                  key={step.number}
                  step={step}
                  globalIndex={index + 4}
                />
              ))}
            </div>
          </div>

          {/* Mobile Bottom CTA Card (Exact c53dae0 layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl apple-glass border-blue-200/80 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center">
              <div className="max-w-2xl">
                <h3 className="text-xl font-black text-brand-navy">
                  مستعد لبدء خطوتك الأولى نحو جامعات أوروبا؟
                </h3>
              </div>

              <div className="w-full flex justify-center">
                <a
                  href="https://wa.me/212775496303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric shadow-lg shadow-navy/15 hover:shadow-glow-blue transition-all duration-300 group"
                >
                  <MessageCircle className="w-4 h-4 text-brand-electric-light" />
                  <span>احجز استشارة مجانية</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP & TABLET VERSION (>=640px): 100% Untouched Sticky Timeline    */}
      {/* ===================================================================== */}
      <div className="hidden sm:block">
        <div
          ref={scrollTrackRef}
          className="relative h-[360vh] w-full"
        >
          <div className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full flex flex-col justify-center overflow-x-clip pt-24 pb-10">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-3">
                <h2 className="text-4xl lg:text-[42px] font-bold text-brand-navy tracking-tight leading-[1.25]">
                  مراحل التسجيل والمرافقة{" "}
                  <span className="text-brand-electric">خطوة بخطوة</span>
                </h2>
                <p className="text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                  مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
                </p>
              </div>

              {/* Horizontal 3-Step Sliding Timeline */}
              <div className="relative w-full overflow-hidden pt-6 pb-4 [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
                <motion.div
                  style={{ x: xPercent }}
                  className="relative flex flex-row items-start w-[266.6667%] will-change-transform transform-gpu"
                >
                  {/* Base Horizontal Dashed Connector Line across all 8 steps */}
                  <div
                    className="
                      absolute
                      top-[56px] lg:top-[64px]
                      right-[6.25%] left-[6.25%]
                      h-[2px] border-t-2 border-dashed border-slate-200
                      pointer-events-none z-0
                    "
                    aria-hidden="true"
                  />

                  {/* Active Electric-Blue Connector Line that fills right-to-left with scroll */}
                  <motion.div
                    style={{ scaleX: lineProgressScale, transformOrigin: "right" }}
                    className="
                      absolute
                      top-[56px] lg:top-[64px]
                      right-[6.25%] left-[6.25%]
                      h-[2px] bg-gradient-to-l from-brand-electric via-blue-500 to-blue-400/60
                      pointer-events-none z-0 will-change-transform transform-gpu
                    "
                    aria-hidden="true"
                  />

                  {allSteps.map((step, index) => (
                    <DesktopStepMilestone
                      key={step.number}
                      step={step}
                      index={index}
                      desktopShift={desktopShift}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Desktop Live Step Counter */}
              <ScrollStepCounter
                desktopShift={desktopShift}
                desktopProgressScale={desktopProgressScale}
              />
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Bottom CTA Card */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-10 rounded-3xl apple-glass border-blue-200/80 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 45%),
                radial-gradient(circle at 100% 100%, rgba(96, 165, 250, 0.08) 0%, transparent 45%)
              `,
            }}
          >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-right">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
                  مستعد لبدء خطوتك الأولى نحو جامعات أوروبا؟
                </h3>
              </div>

              {/* Direct Action Single WhatsApp CTA Button */}
              <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                <a
                  href="https://wa.me/212775496303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.98] shadow-lg shadow-brand-navy/15 transition-[background-color,transform,box-shadow] duration-200 group"
                >
                  <MessageCircle className="w-4 h-4 text-brand-electric-light shrink-0" />
                  <span>احجز استشارة مجانية</span>
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


