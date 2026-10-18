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

// Mobile Stacked Card: Sits in a 3D deck; as the user scrolls, the top card lifts up and reveals the next card underneath
function MobileStackedStepCard({
  step,
  index,
  mobileCardProgress,
}: {
  step: StepItem;
  index: number;
  mobileCardProgress: MotionValue<number>;
}) {
  const Icon = step.icon;
  const isSolid = step.variant === "solid";

  // Using transformOrigin: "bottom center" so scaling down cards underneath (index - 1, index - 2)
  // keeps their bottom edges anchored at the exact +11px and +22px offsets (Apple Wallet style stack).
  // When index -> index + 0.88, the active top card holds briefly then lifts smoothly inside the masked zone (-98px).
  const y = useTransform(
    mobileCardProgress,
    [index - 3, index - 2, index - 1, index, index + 0.12, index + 0.45, index + 0.9],
    [30, 22, 11, 0, 0, -42, -98]
  );

  const scale = useTransform(
    mobileCardProgress,
    [index - 3, index - 2, index - 1, index, index + 0.12, index + 0.45, index + 0.9],
    [0.84, 0.89, 0.945, 1, 1, 0.97, 0.92]
  );

  const opacity = useTransform(
    mobileCardProgress,
    [index - 2.5, index - 2, index - 1, index, index + 0.15, index + 0.38, index + 0.82],
    [0, 0.55, 0.88, 1, 1, 0.82, 0]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        transformOrigin: "bottom center",
        zIndex: (allSteps.length - index) * 10,
      }}
      className="absolute inset-x-0 top-3 mx-auto w-full max-w-[344px] h-[230px] rounded-3xl bg-white border border-slate-200/95 shadow-[0_14px_32px_-10px_rgba(11,27,61,0.12),0_4px_10px_-2px_rgba(11,27,61,0.06)] px-5 py-4 flex flex-col items-center justify-center text-center select-none pointer-events-none will-change-[transform,opacity] transform-gpu"
    >
      {/* Subtle Top Accent Glow Bar inside Card */}
      <div
        aria-hidden="true"
        className={`absolute top-0 inset-x-10 h-[3px] rounded-b-full ${
          isSolid
            ? "bg-gradient-to-r from-transparent via-brand-electric to-transparent"
            : "bg-gradient-to-r from-transparent via-blue-300/80 to-transparent"
        }`}
      />

      {/* Circle Milestone Container with Number Badge */}
      <div className="relative shrink-0">
        <div
          className={`w-20 h-20 rounded-full border-2 border-dashed p-1.5 bg-[#FAFBFD] ${
            isSolid ? "border-blue-400/90" : "border-slate-300"
          }`}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center ${
              isSolid
                ? "bg-gradient-to-br from-blue-600 to-brand-electric text-white shadow-[0_8px_18px_rgba(37,99,235,0.26)]"
                : "bg-white border border-slate-200/90 text-brand-electric shadow-xs"
            }`}
          >
            <Icon className="w-7 h-7 stroke-[1.8]" />
          </div>
        </div>

        {/* Step Number Badge at Bottom of Circle */}
        <div
          className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center font-bold text-[11px] shadow-xs z-20 tabular-nums ${
            isSolid
              ? "border-brand-electric text-brand-electric"
              : "border-slate-300 text-brand-navy"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Step Title & Full Un-truncated Description */}
      <div className="mt-3.5 space-y-1">
        <h3 className="text-base font-bold text-brand-navy leading-snug">
          {step.title}
        </h3>
        <p className="text-xs text-slate-600 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Isolated leaf component for the live step counter so scrolling never re-renders the step cards
function ScrollStepCounter({
  desktopShift,
  mobileCardProgress,
  isMobile,
  progressBarScale,
}: {
  desktopShift: MotionValue<number>;
  mobileCardProgress: MotionValue<number>;
  isMobile: boolean;
  progressBarScale: MotionValue<number>;
}) {
  const [reachedStep, setReachedStep] = useState<number>(isMobile ? 1 : 3);

  useEffect(() => {
    if (isMobile) {
      setReachedStep(Math.min(8, Math.max(1, Math.round(mobileCardProgress.get()) + 1)));
    } else {
      setReachedStep(Math.min(8, Math.max(3, Math.round(desktopShift.get()) + 3)));
    }
  }, [isMobile, desktopShift, mobileCardProgress]);

  useMotionValueEvent(desktopShift, "change", (latest) => {
    if (isMobile) return;
    const nextStep = Math.min(8, Math.max(3, Math.round(latest) + 3));
    if (nextStep !== reachedStep) {
      setReachedStep(nextStep);
    }
  });

  useMotionValueEvent(mobileCardProgress, "change", (latest) => {
    if (!isMobile) return;
    const nextStep = Math.min(8, Math.max(1, Math.round(latest) + 1));
    if (nextStep !== reachedStep) {
      setReachedStep(nextStep);
    }
  });

  const formattedCurrent = reachedStep < 10 ? `0${reachedStep}` : `${reachedStep}`;

  return (
    <div className="mt-2 sm:mt-6 flex flex-col items-center gap-2 select-none">
      {/* Dynamic Step Counter Pill + 8 Micro Dots */}
      <div className="flex items-center gap-3 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/85 shadow-2xs">
        <span className="text-[11px] sm:text-xs font-bold text-brand-navy tabular-nums">
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
      <div className="w-36 sm:w-48 h-1.5 rounded-full bg-slate-200/80 overflow-hidden p-0 transform-gpu">
        <motion.div
          style={{ scaleX: progressBarScale, transformOrigin: "right" }}
          className="w-full h-full rounded-full bg-brand-electric"
        />
      </div>
    </div>
  );
}

export function RegistrationSteps() {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 639px)");
    const updateMatch = () => setIsMobile(mql.matches);
    updateMatch();
    mql.addEventListener("change", updateMatch);
    return () => mql.removeEventListener("change", updateMatch);
  }, []);

  // Track vertical scroll progress through the sticky container
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start 74px", "end end"],
  });

  // Weighted, controlled spring physics: absorbs fast thumb flicks so cards move with deliberate weight
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 155,
    damping: 30,
    mass: 0.42,
    restDelta: 0.0005,
  });

  // DESKTOP/TABLET (>=640px): Stepped Magnetic Dwell Curve from 0 (steps 01-03) to 5 (steps 06-08)
  // Each step has a flat dwell plateau where it locks and rests before transitioning to the next step
  const desktopShift = useTransform(
    smoothProgress,
    [
      0.0, 0.06,
      0.188, 0.248,
      0.376, 0.436,
      0.564, 0.624,
      0.752, 0.812,
      0.94, 1.0,
    ],
    [
      0, 0,
      1, 1,
      2, 2,
      3, 3,
      4, 4,
      5, 5,
    ]
  );

  // MOBILE (<640px): Stepped Magnetic Dwell Curve across all 8 cards (0 -> 7)
  // Each card has a dedicated dwell plateau (44% of scroll) where momentum is absorbed so a single swipe never skips 2 cards
  const mobileCardProgress = useTransform(
    smoothProgress,
    [
      0.0, 0.055,
      0.135, 0.19,
      0.27, 0.325,
      0.405, 0.46,
      0.54, 0.595,
      0.675, 0.73,
      0.81, 0.865,
      0.945, 1.0,
    ],
    [
      0, 0,
      1, 1,
      2, 2,
      3, 3,
      4, 4,
      5, 5,
      6, 6,
      7, 7,
    ]
  );

  // Desktop horizontal translation in RTL (5/8 = 62.5%)
  const xPercent = useTransform(desktopShift, [0, 5], ["0%", "62.5%"]);

  // Desktop active blue line along the connector between circles (grows right to left in RTL)
  const lineProgressScale = useTransform(desktopShift, [0, 5], [0.28, 1]);

  // Bottom progress pill bar fill synced directly with the active card/step
  const progressBarScale = useTransform(
    isMobile ? mobileCardProgress : desktopShift,
    isMobile ? [0, 7] : [0, 5],
    [isMobile ? 0.125 : 0.375, 1]
  );

  return (
    <section id="processus" className="relative w-full scroll-mt-20">
      {/* Extended Scroll Runway (520vh on mobile for 8 cards with magnetic dwell plateaus, 400vh on desktop) */}
      <div
        ref={scrollTrackRef}
        className="relative h-[520vh] sm:h-[400vh] w-full"
      >
        {/* Sticky Pinned Stage: Synchronized min-h-[calc(100dvh-74px)] on mobile so it unpins right as Step 08 completes */}
        <div className="sticky top-[74px] sm:top-0 min-h-[calc(100vh-74px)] supports-[min-height:100dvh]:min-h-[calc(100dvh-74px)] sm:h-screen sm:supports-[height:100dvh]:h-[100dvh] w-full flex flex-col justify-start sm:justify-center overflow-x-clip pt-4 pb-5 sm:pt-24 sm:pb-10">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-2.5 sm:mb-10 lg:mb-12 space-y-1.5 sm:space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-brand-navy tracking-tight leading-[1.25]">
                مراحل التسجيل والمرافقة{" "}
                <span className="text-brand-electric">خطوة بخطوة</span>
              </h2>
              <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
              </p>
            </div>

            {/* --- MOBILE VIEW (<640px): 3D Stacked Card Peel Deck with Top Fade Mask --- */}
            <div className="block sm:hidden relative w-full h-[264px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_11%,black_100%)]">
              {allSteps.map((step, index) => (
                <MobileStackedStepCard
                  key={step.number}
                  step={step}
                  index={index}
                  mobileCardProgress={mobileCardProgress}
                />
              ))}
            </div>

            {/* --- DESKTOP & TABLET VIEW (>=640px): Horizontal 3-Step Sliding Timeline --- */}
            <div className="hidden sm:block relative w-full overflow-hidden pt-6 pb-4 [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
              {/* Moving Track containing all 8 steps (266.6667% width = 8/3 of container) */}
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

            {/* Live Step Counter Pill + 8 Dots + Progress Bar */}
            <ScrollStepCounter
              desktopShift={desktopShift}
              mobileCardProgress={mobileCardProgress}
              isMobile={isMobile}
              progressBarScale={progressBarScale}
            />

            {/* Mobile CTA Card: Directly underneath the counter with tight 14px (mt-3.5) spacing */}
            <div className="block sm:hidden mt-3.5">
              <div
                className="p-5 rounded-3xl apple-glass border-blue-200/80 shadow-[0_14px_32px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden text-center"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 45%),
                    radial-gradient(circle at 100% 100%, rgba(96, 165, 250, 0.08) 0%, transparent 45%)
                  `,
                }}
              >
                <div className="relative z-10 flex flex-col items-center gap-3.5">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-brand-navy leading-snug">
                      مستعد لبدء خطوتك الأولى نحو جامعات أوروبا؟
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      تواصل الآن مع مستشارينا المعتمدين لبدء{" "}
                      <strong>الخطوة 01 مجاناً</strong> وتحديد أفضل جامعة وتخصص يتناسب
                      مع طموحك.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/212775496303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.98] shadow-md shadow-brand-navy/15 transition-[background-color,transform,box-shadow] duration-200 group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light shrink-0" />
                    <span>احجز استشارة مجانية</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Bottom CTA Card */}
      <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16 lg:pb-24">
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
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
                مستعد لبدء خطوتك الأولى نحو جامعات أوروبا؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تواصل الآن مع مستشارينا المعتمدين لبدء{" "}
                <strong>الخطوة 01 مجاناً</strong> وتحديد أفضل جامعة وتخصص يتناسب
                مع مؤهلاتك وطموحك.
              </p>
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
    </section>
  );
}


