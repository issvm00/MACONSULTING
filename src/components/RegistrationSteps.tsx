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
  ChevronUp,
  ChevronDown,
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

// Mobile Stacked Card: True opaque physical card deck with synchronized lift & rise phases
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

  // Synchronized transition windows for every step k -> k + 1:
  // - [k, k + 0.14]: All cards in the deck hold steady (settling zone so small thumb movements don't jitter)
  // - [k + 0.14, k + 0.88]: Top card lifts cleanly upward while cards underneath rise by one slot in lockstep
  // - [k + 0.88, k + 1.0]: Next card is already settled at y = 0, scale = 1
  const y = useTransform(
    mobileCardProgress,
    [
      index - 3,
      index - 2.86,
      index - 2.12,
      index - 2,
      index - 1.86,
      index - 1.12,
      index - 1,
      index - 0.86,
      index - 0.12,
      index,
      index + 0.14,
      index + 0.52,
      index + 0.88,
    ],
    [32, 32, 22, 22, 22, 11, 11, 11, 0, 0, 0, -115, -245]
  );

  const scale = useTransform(
    mobileCardProgress,
    [
      index - 3,
      index - 2.86,
      index - 2.12,
      index - 2,
      index - 1.86,
      index - 1.12,
      index - 1,
      index - 0.86,
      index - 0.12,
      index,
      index + 0.14,
      index + 0.88,
    ],
    [0.85, 0.85, 0.9, 0.9, 0.9, 0.95, 0.95, 0.95, 1, 1, 1, 0.93]
  );

  // CRITICAL: Cards waiting at index - 1 and index - 2 stay 100% opaque (opacity: 1) so cards never bleed through each other.
  // The lifting card (index -> index + 0.88) stays 100% opaque until index + 0.48 (after it has already cleared the card below).
  const opacity = useTransform(
    mobileCardProgress,
    [
      index - 2.85,
      index - 2.15,
      index - 2,
      index - 1,
      index,
      index + 0.48,
      index + 0.86,
    ],
    [0, 1, 1, 1, 1, 1, 0]
  );

  // Subtle dimming overlay for cards tucked underneath (index - 1, index - 2) to create physical 3D deck contrast without transparency bleed
  const deckShadeOpacity = useTransform(
    mobileCardProgress,
    [index - 2, index - 1, index - 0.12, index],
    [0.07, 0.035, 0, 0]
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
      className="absolute inset-x-0 top-[18px] mx-auto w-full max-w-[294px] h-[224px] rounded-3xl bg-white border border-slate-200/95 shadow-[0_12px_28px_-8px_rgba(11,27,61,0.12),0_2px_6px_rgba(11,27,61,0.05)] px-4 py-3.5 flex flex-col items-center justify-center text-center select-none pointer-events-none overflow-hidden will-change-[transform,opacity] transform-gpu"
    >
      {/* Solid Depth Shade Overlay for underlying deck cards (prevents white-on-white blending while keeping card 100% opaque) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: deckShadeOpacity }}
        className="absolute inset-0 bg-brand-navy pointer-events-none z-30"
      />

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
          className={`w-[76px] h-[76px] rounded-full border-2 border-dashed p-1.5 bg-[#FAFBFD] ${
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
            <Icon className="w-6 h-6 stroke-[1.8]" />
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
        <h3 className="text-[15px] font-bold text-brand-navy leading-snug">
          {step.title}
        </h3>
        <p className="text-[11.5px] text-slate-600 font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Right-side vertical Up/Down navigation pill on mobile: drives the exact sticky scroll position
function MobileCardNavArrows({
  mobileCardProgress,
  scrollTrackRef,
}: {
  mobileCardProgress: MotionValue<number>;
  scrollTrackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setActiveIndex(Math.min(7, Math.max(0, Math.round(mobileCardProgress.get()))));
  }, [mobileCardProgress]);

  useMotionValueEvent(mobileCardProgress, "change", (latest) => {
    const nextIdx = Math.min(7, Math.max(0, Math.round(latest)));
    setActiveIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
  });

  const scrollToStep = (targetIdx: number) => {
    if (typeof window === "undefined" || !scrollTrackRef.current) return;
    const rect = scrollTrackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const trackHeight = rect.height;

    // Matches useScroll offset: ["start 74px", "end 510px"]
    const startScrollY = trackTop - 74;
    const endScrollY = trackTop + trackHeight - 510;
    const totalScrollable = Math.max(1, endScrollY - startScrollY);

    // If user is at Step 08 (index 7) and taps Down (targetIdx > 7), smoothly unpin and scroll to the CTA card
    if (targetIdx > 7) {
      window.scrollTo({
        top: endScrollY + 210,
        behavior: "smooth",
      });
      return;
    }

    const clampedIdx = Math.min(7, Math.max(0, targetIdx));
    let targetProgress = 0;
    if (clampedIdx === 0) {
      targetProgress = 0;
    } else if (clampedIdx === 7) {
      targetProgress = 0.96;
    } else {
      targetProgress = 0.08 + (clampedIdx / 7) * (0.95 - 0.08);
    }

    const targetScrollY = startScrollY + targetProgress * totalScrollable;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const isAtStart = activeIndex <= 0;

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_10px_24px_-6px_rgba(11,27,61,0.10),0_2px_6px_rgba(11,27,61,0.04)] shrink-0 z-30 select-none">
      {/* Up Arrow: Previous Step */}
      <button
        type="button"
        onClick={() => scrollToStep(activeIndex - 1)}
        disabled={isAtStart}
        aria-label="المرحلة السابقة"
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          isAtStart
            ? "opacity-35 cursor-not-allowed bg-slate-50 text-slate-400 border border-slate-200/60"
            : "bg-slate-50 hover:bg-blue-50/80 text-brand-navy hover:text-brand-electric active:scale-90 border border-slate-200/90 shadow-2xs"
        }`}
      >
        <ChevronUp className="w-4 h-4 stroke-[2.4]" />
      </button>

      {/* Center Step Indicator Pill Divider */}
      <span className="text-[10px] font-bold text-slate-400 tabular-nums leading-none py-0.5">
        0{activeIndex + 1}
      </span>

      {/* Down Arrow: Next Step (or scroll to CTA when at Step 08) */}
      <button
        type="button"
        onClick={() => scrollToStep(activeIndex + 1)}
        aria-label="المرحلة التالية"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-brand-electric text-white shadow-[0_6px_14px_rgba(37,99,235,0.28)] hover:brightness-105 active:scale-90 transition-all duration-200"
      >
        <ChevronDown className="w-4 h-4 stroke-[2.4]" />
      </button>
    </div>
  );
}

// Isolated leaf component for the live step counter so scrolling never re-renders the step cards
function ScrollStepCounter({
  desktopShift,
  mobileCardProgress,
  isMobile,
  desktopProgressScale,
  mobileProgressScale,
}: {
  desktopShift: MotionValue<number>;
  mobileCardProgress: MotionValue<number>;
  isMobile: boolean;
  desktopProgressScale: MotionValue<number>;
  mobileProgressScale: MotionValue<number>;
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
    setReachedStep((prev) => (prev !== nextStep ? nextStep : prev));
  });

  useMotionValueEvent(mobileCardProgress, "change", (latest) => {
    if (!isMobile) return;
    const nextStep = Math.min(8, Math.max(1, Math.round(latest) + 1));
    setReachedStep((prev) => (prev !== nextStep ? nextStep : prev));
  });

  const formattedCurrent = reachedStep < 10 ? `0${reachedStep}` : `${reachedStep}`;

  return (
    <div className="mt-2.5 sm:mt-6 flex flex-col items-center gap-2 select-none">
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

      {/* Smooth Continuous Progress Bar (Separate stable MotionValues for mobile vs desktop) */}
      <div className="w-36 sm:w-48 h-1.5 rounded-full bg-slate-200/80 overflow-hidden p-0 transform-gpu">
        <motion.div
          style={{
            scaleX: isMobile ? mobileProgressScale : desktopProgressScale,
            transformOrigin: "right",
          }}
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

  // ============================================================================
  // Entry Scroll Gate ("Scroll Momentum Arrest" / "Inertia Catch on Pin")
  // When the user scrolls down rapidly from the section above, we arrest the
  // incoming scroll momentum right at the pin point of this section so no steps
  // are skipped. The user must perform a fresh scroll gesture to advance steps.
  // ============================================================================
  useEffect(() => {
    if (typeof window === "undefined") return;

    let wasAboveEntry = true;
    let isArresting = false;
    let arrestTargetY = 0;
    let arrestTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let wheelIdleTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const getEntryPinY = () => {
      if (!scrollTrackRef.current) return null;
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const pinOffset = window.innerWidth < 640 ? 74 : 0;
      return trackTop - pinOffset;
    };

    const releaseArrest = () => {
      isArresting = false;
      if (arrestTimeoutId) {
        clearTimeout(arrestTimeoutId);
        arrestTimeoutId = null;
      }
      if (wheelIdleTimeoutId) {
        clearTimeout(wheelIdleTimeoutId);
        wheelIdleTimeoutId = null;
      }
    };

    const handleScroll = () => {
      const entryPinY = getEntryPinY();
      if (entryPinY === null) return;

      const currentY = window.scrollY;

      // Reset gate armed state when user is clearly above the section
      if (currentY < entryPinY - 60) {
        wasAboveEntry = true;
        if (isArresting) releaseArrest();
        return;
      }

      // If currently arresting incoming momentum, lock scrollY at the exact entry pin point
      if (isArresting) {
        if (currentY > arrestTargetY) {
          window.scrollTo(0, arrestTargetY);
        }
        return;
      }

      // Detect downward crossing from above into the pinned section
      if (wasAboveEntry && currentY >= entryPinY) {
        wasAboveEntry = false;

        // If the scroll jumped past the entry point with momentum, engage the mandatory stop
        if (currentY > entryPinY + 4) {
          isArresting = true;
          arrestTargetY = Math.round(entryPinY);
          window.scrollTo(0, arrestTargetY);

          // Automatically release after momentum decays (420ms), or immediately on a fresh touch/wheel gesture
          arrestTimeoutId = setTimeout(() => {
            releaseArrest();
          }, 420);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isArresting) return;

      // Absorb ongoing trackpad/mouse-wheel inertia from the previous section
      if (e.deltaY > 0) {
        e.preventDefault();
        window.scrollTo(0, arrestTargetY);

        // Once the user pauses wheel/trackpad input for 120ms, release the gate for their next scroll
        if (wheelIdleTimeoutId) clearTimeout(wheelIdleTimeoutId);
        wheelIdleTimeoutId = setTimeout(() => {
          releaseArrest();
        }, 120);
      } else if (e.deltaY < 0) {
        releaseArrest();
      }
    };

    // On mobile: touching the screen again after the section stops immediately opens the gate for the new swipe
    const handleTouchStart = () => {
      if (isArresting) {
        releaseArrest();
      }
    };

    // Initialize wasAboveEntry based on current scroll position on mount
    const initialEntryY = getEntryPinY();
    if (initialEntryY !== null) {
      wasAboveEntry = window.scrollY < initialEntryY - 10;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      releaseArrest();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // On mobile, the sticky box is ~430px tall pinned at 74px (bottom at ~504px),
  // so ending scroll tracking at "end 510px" on mobile ensures Step 08 completes at the exact pixel the CTA card meets the counter!
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: isMobile ? ["start 74px", "end 510px"] : ["start start", "end end"],
  });

  // Critically-damped, responsive spring (zero rubber-banding, instant touch tracking)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.16,
    restDelta: 0.0005,
  });

  // DESKTOP/TABLET (>=640px): Smooth continuous shift from 0 (steps 01-03) to 5 (steps 06-08)
  // Includes a generous 10% entry hold buffer so Steps 01-03 stay firmly anchored upon arrival
  const desktopShift = useTransform(
    smoothProgress,
    [0, 0.1, 0.94, 1],
    [0, 0, 5, 5]
  );

  // MOBILE (<640px): Smooth continuous progression from 0 (Card 01) to 7 (Card 08)
  // Includes a generous 8% entry hold buffer so Card 01 stays firmly anchored upon arrival
  const mobileCardProgress = useTransform(
    smoothProgress,
    [0, 0.08, 0.95, 1],
    [0, 0, 7, 7]
  );

  // Desktop horizontal translation in RTL (5/8 = 62.5%)
  const xPercent = useTransform(desktopShift, [0, 5], ["0%", "62.5%"]);

  // Desktop active blue line along the connector between circles (grows right to left in RTL)
  const lineProgressScale = useTransform(desktopShift, [0, 5], [0.28, 1]);

  // Dedicated progress bar MotionValues for Desktop and Mobile
  const desktopProgressScale = useTransform(desktopShift, [0, 5], [0.375, 1]);
  const mobileProgressScale = useTransform(mobileCardProgress, [0, 7], [0.125, 1]);

  return (
    <section id="processus" className="relative w-full scroll-mt-20">
      {/* Scroll Runway: 420vh on mobile (~450px per card so 1 swipe = 1 card), 350vh on desktop */}
      <div
        ref={scrollTrackRef}
        className="relative h-[420vh] sm:h-[350vh] w-full"
      >
        {/*
          Sticky Pinned Stage:
          - On Mobile (<640px): h-auto (430px) pinned at top-[74px] so it NEVER overflows small phone screens,
            and has zero invisible dead space below the counter!
          - On Desktop (>=640px): Full viewport height centered stage.
        */}
        <div className="sticky top-[74px] sm:top-0 h-auto sm:h-screen sm:supports-[height:100dvh]:h-[100dvh] w-full flex flex-col justify-start sm:justify-center overflow-x-clip pt-5 pb-3 sm:pt-24 sm:pb-10">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-10 lg:mb-12 space-y-1.5 sm:space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-brand-navy tracking-tight leading-[1.25]">
                مراحل التسجيل والمرافقة{" "}
                <span className="text-brand-electric">خطوة بخطوة</span>
              </h2>
              <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                مرافقة قانونية وأكاديمية دقيقة تضمن لك ولعائلتك راحة البال التامة من أول جلسة استشارة إلى غاية استقرارك في بلد دراستك.
              </p>
            </div>

            {/* --- MOBILE VIEW (<640px): Right-Side Vertical Arrows + Narrowed 3D Stacked Card Peel Deck --- */}
            <div className="flex sm:hidden flex-row items-center justify-center gap-2.5 w-full max-w-[356px] mx-auto">
              {/* Right-Side Vertical Navigation Pill (First child in RTL = Right side) */}
              <MobileCardNavArrows
                mobileCardProgress={mobileCardProgress}
                scrollTrackRef={scrollTrackRef}
              />

              {/* Stacked Card Stage (Flex-1 next to the right-side arrows) */}
              <div className="relative flex-1 h-[270px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_100%)]">
                {allSteps.map((step, index) => (
                  <MobileStackedStepCard
                    key={step.number}
                    step={step}
                    index={index}
                    mobileCardProgress={mobileCardProgress}
                  />
                ))}
              </div>
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
              desktopProgressScale={desktopProgressScale}
              mobileProgressScale={mobileProgressScale}
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Card: Glides up right underneath the counter (pt-2 on mobile, -mt-6 on desktop) with zero dead gap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-0 sm:-mt-6 pb-14 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-10 rounded-3xl apple-glass border-blue-200/80 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 45%),
              radial-gradient(circle at 100% 100%, rgba(96, 165, 250, 0.08) 0%, transparent 45%)
            `,
          }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-right">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <h3 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-base font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.98] shadow-lg shadow-brand-navy/15 transition-[background-color,transform,box-shadow] duration-200 group"
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


