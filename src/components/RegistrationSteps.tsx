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

function StepMilestone({
  step,
  index,
  currentShift,
  visibleSpan,
}: {
  step: StepItem;
  index: number;
  currentShift: MotionValue<number>;
  visibleSpan: number; // 2 on desktop/tablet (3 visible: [index-2, index]), 1 on mobile (2 visible: [index-1, index])
}) {
  const Icon = step.icon;
  const isSolid = step.variant === "solid";
  const isBadgeTop = step.badgePosition === "top";

  const enterStart = index - visibleSpan - 0.65;
  const enterEnd = index - visibleSpan;
  const exitStart = index;
  const exitEnd = index + 0.65;

  const opacity = useTransform(
    currentShift,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.18, 1, 1, 0.18]
  );

  const scale = useTransform(
    currentShift,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.86, 1, 1, 0.86]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="group relative flex flex-col items-center text-center z-10 w-[12.5%] shrink-0 px-2.5 sm:px-4 lg:px-6 select-none will-change-[transform,opacity] transform-gpu"
    >
      {/* Circle Milestone Container with Alternating Top or Bottom Number Badge */}
      <div className="relative">
        {/* Outer Dashed Circle Ring */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-dashed p-2 sm:p-2.5 bg-[#FAFBFD] transition-[transform,border-color] duration-250 ease-out ${
            isSolid
              ? "border-blue-400/85 sm:group-hover:border-brand-electric sm:group-hover:scale-105"
              : "border-slate-300 sm:group-hover:border-brand-electric sm:group-hover:scale-105"
          }`}
        >
          {/* Inner Circle Disc */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-shadow duration-250 ${
              isSolid
                ? "bg-gradient-to-br from-blue-600 to-brand-electric text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]"
                : "bg-white border border-slate-200/90 text-brand-electric shadow-xs sm:group-hover:shadow-[0_10px_24px_rgba(37,99,235,0.14)]"
            }`}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 stroke-[1.8] transition-transform duration-250 ease-out sm:group-hover:scale-110" />
          </div>
        </div>

        {/* Number Badge (Alternating Top / Bottom) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs transition-colors duration-250 z-20 tabular-nums ${
            isBadgeTop
              ? "-top-3 sm:-top-3.5"
              : "-bottom-3 sm:-bottom-3.5"
          } ${
            isSolid
              ? "border-brand-electric text-brand-electric"
              : "border-slate-300 text-brand-navy sm:group-hover:border-brand-electric sm:group-hover:text-brand-electric"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Title & Description underneath */}
      <div className="mt-5 sm:mt-7 space-y-1.5 max-w-[235px]">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-brand-navy sm:group-hover:text-brand-electric transition-colors duration-200 leading-snug">
          {step.title}
        </h3>
        <p className="text-xs lg:text-sm text-slate-500 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Isolated leaf component for the live step counter so scrolling never re-renders the 8 step cards
function ScrollStepCounter({
  currentShift,
  visibleCount,
  progressBarScale,
}: {
  currentShift: MotionValue<number>;
  visibleCount: number;
  progressBarScale: MotionValue<number>;
}) {
  const [reachedStep, setReachedStep] = useState<number>(visibleCount);

  useEffect(() => {
    setReachedStep(
      Math.min(8, Math.max(visibleCount, Math.round(currentShift.get()) + visibleCount))
    );
  }, [visibleCount, currentShift]);

  useMotionValueEvent(currentShift, "change", (latest) => {
    const nextStep = Math.min(8, Math.max(visibleCount, Math.round(latest) + visibleCount));
    if (nextStep !== reachedStep) {
      setReachedStep(nextStep);
    }
  });

  const formattedCurrent = reachedStep < 10 ? `0${reachedStep}` : `${reachedStep}`;

  return (
    <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2.5 select-none">
      {/* Dynamic Step Counter Pill + 8 Micro Dots */}
      <div className="flex items-center gap-3 px-3.5 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs">
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

  // Desktop/Tablet (>=640px): 3 visible steps at a time (maxShift = 5, endX = 62.5%)
  // Mobile (<640px): 2 spacious visible steps at a time (maxShift = 6, endX = 75%)
  const visibleCount = isMobile ? 2 : 3;
  const visibleSpan = visibleCount - 1;
  const maxShift = 8 - visibleCount;
  const maxTranslatePercent = isMobile ? "75%" : "62.5%";
  const initialProgressScale = visibleCount / 8;

  // Track vertical scroll progress through the 320vh sticky container
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // Critically-damped spring: instant finger/trackpad response + silky mouse-wheel glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.18,
    restDelta: 0.0005,
  });

  // Continuous shift index from 0 to maxShift (5 on desktop/tablet, 6 on mobile)
  const currentShift = useTransform(
    smoothProgress,
    [0, 0.06, 0.92, 1],
    [0, 0, maxShift, maxShift]
  );

  // Horizontal translation in RTL
  const xPercent = useTransform(
    currentShift,
    [0, maxShift],
    ["0%", maxTranslatePercent]
  );

  // Active blue line along the connector between circles (grows from right to left in RTL)
  const lineProgressScale = useTransform(
    currentShift,
    [0, maxShift],
    [isMobile ? 0.16 : 0.28, 1]
  );

  // Bottom progress pill bar fill
  const progressBarScale = useTransform(
    currentShift,
    [0, maxShift],
    [initialProgressScale, 1]
  );

  return (
    <section id="processus" className="relative w-full scroll-mt-20">
      {/* Tall Scroll Runway (320vh): Pins the screen while scrolling through all 8 steps */}
      <div ref={scrollTrackRef} className="relative h-[320vh] w-full">
        {/* Sticky Pinned Stage: Respects fixed Navbar height with pt-20 sm:pt-24 */}
        <div className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full flex flex-col justify-center overflow-x-clip pt-20 pb-8 sm:pt-24 sm:pb-12">
          <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-2.5 sm:space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-brand-navy tracking-tight leading-[1.25]">
                مراحل التسجيل والمرافقة{" "}
                <span className="text-brand-electric">خطوة بخطوة</span>
              </h2>
              <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
              </p>
            </div>

            {/* Horizontal Sliding Viewport Box (2 spacious steps on Mobile, 3 steps on Tablet/Desktop) */}
            <div className="relative w-full overflow-hidden pt-5 pb-4 sm:pt-6 sm:pb-6 [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
              {/* Moving Track containing all 8 steps (400% on Mobile = 8/2, 266.6667% on Tablet/PC = 8/3) */}
              <motion.div
                style={{ x: xPercent }}
                className="relative flex flex-row items-start w-[400%] sm:w-[266.6667%] will-change-transform transform-gpu"
              >
                {/* Base Horizontal Dashed Connector Line across all 8 steps */}
                <div
                  className="
                    absolute
                    top-[48px] sm:top-[56px] lg:top-[64px]
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
                    top-[48px] sm:top-[56px] lg:top-[64px]
                    right-[6.25%] left-[6.25%]
                    h-[2px] bg-gradient-to-l from-brand-electric via-blue-500 to-blue-400/60
                    pointer-events-none z-0 will-change-transform transform-gpu
                  "
                  aria-hidden="true"
                />

                {allSteps.map((step, index) => (
                  <StepMilestone
                    key={step.number}
                    step={step}
                    index={index}
                    currentShift={currentShift}
                    visibleSpan={visibleSpan}
                  />
                ))}
              </motion.div>
            </div>

            {/* Live Step Counter Pill (03 / 08 -> 08 / 08) + Progress Bar */}
            <ScrollStepCounter
              currentShift={currentShift}
              visibleCount={visibleCount}
              progressBarScale={progressBarScale}
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Card (Appears naturally once all 8 steps finish and the screen unpins) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 lg:pb-24">
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


