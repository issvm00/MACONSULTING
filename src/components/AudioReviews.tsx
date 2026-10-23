"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowLeft,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { AudioReview } from "@/types/audioReview";
import { audioReviews } from "@/data/audioReviews";
import { HlsAudio, HlsAudioHandle } from "@/components/ui/HlsAudio";
import { useLanguage, type Language } from "@/context/LanguageContext";

// 28-bar Simulated Waveform Equalizer heights from technical specification
const waveHeights = [
  15, 20, 35, 25, 40, 60, 45, 30, 55, 75, 60, 40, 85, 100, 90, 70, 50, 80, 95,
  65, 45, 60, 35, 25, 40, 20, 30, 15,
];

// 23 Official Admission / Acceptance Images in /public/reviewsimage
const reviewImages: string[] = Array.from(
  { length: 23 },
  (_, index) => `/reviewsimage/${index + 1}.webp`
);

// Total review cards in swiper = audio reviews + 1 final Instagram exploration card
const TOTAL_SLIDES = audioReviews.length + 1;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Memoized 28-Bar Waveform with zero box-shadow filter overhead inside 3D space
const WaveformEqualizer = memo(function WaveformEqualizer({
  isAnimating,
}: {
  isAnimating: boolean;
}) {
  return (
    <div className="w-[76%] h-6 flex items-center justify-between gap-[3px] mb-4">
      {waveHeights.map((height, i) => {
        const delay = (i * 0.05) % 0.8;
        const isCenterAccent = Math.abs(waveHeights.length / 2 - i) < 6;

        return (
          <div
            key={i}
            className={`w-[2.5px] rounded-full origin-center ${
              isCenterAccent ? "bg-[#00d2ff]" : "bg-white/30"
            }`}
            style={{
              height: `${height}%`,
              transform: isAnimating ? undefined : "scaleY(0.22)",
              animation: isAnimating
                ? `eq-play 0.8s ease-in-out ${delay.toFixed(2)}s infinite`
                : "none",
            }}
          />
        );
      })}
    </div>
  );
});

interface AudioReviewCardProps {
  review: AudioReview;
  index: number;
  language: Language;
  isRTL: boolean;
  cardIsPlaying: boolean;
  cardIsBuffering: boolean;
  cardCurrentTime: number;
  cardDuration: number;
  onPlayClick: (review: AudioReview, index: number) => void;
  onSeekToRatio: (review: AudioReview, index: number, ratio: number) => void;
}

// Pure GPU-Cached Card Component:
// Notice it does NOT depend on `currentIndex` / `isActive`, so swiping between cards
// causes ZERO React re-renders and ZERO shadow/opacity repaints on the 5 slides!
const AudioReviewCard = memo(function AudioReviewCard({
  review,
  index,
  language,
  isRTL,
  cardIsPlaying,
  cardIsBuffering,
  cardCurrentTime,
  cardDuration,
  onPlayClick,
  onSeekToRatio,
}: AudioReviewCardProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isScrubbingRef = useRef<boolean>(false);

  const progressPercent =
    cardDuration > 0 && cardCurrentTime > 0
      ? Math.min(100, Math.max(0, (cardCurrentTime / cardDuration) * 100))
      : 0;

  const computeRatioFromClientX = (clientX: number): number | null => {
    const el = progressBarRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return null;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isScrubbingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const ratio = computeRatioFromClientX(e.clientX);
    if (ratio !== null) {
      onSeekToRatio(review, index, ratio);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbingRef.current) return;
    e.stopPropagation();
    const ratio = computeRatioFromClientX(e.clientX);
    if (ratio !== null) {
      onSeekToRatio(review, index, ratio);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbingRef.current) return;
    e.stopPropagation();
    isScrubbingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const isAudioActuallyFlowing = cardIsPlaying && !cardIsBuffering;

  return (
    <div className="relative w-full h-[400px] sm:h-[430px] rounded-[32px] px-7 py-8 sm:px-8 sm:py-9 bg-gradient-to-b from-[#162338] via-[#101929] to-[#0a101d] border border-white/15 shadow-[0_18px_36px_-10px_rgba(7,14,28,0.45)] flex flex-col items-center justify-between overflow-hidden transform-gpu [backface-visibility:hidden]">
      {/* Zero-Blur-Filter Hardware-Accelerated Radial Halo Behind Center Play Button */}
      <div
        aria-hidden="true"
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 180, 216, 0.28) 0%, rgba(0, 180, 216, 0.09) 44%, rgba(0, 180, 216, 0) 70%)",
        }}
      />

      {/* Watermark Quote (&rdquo;) Bottom Right */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-5 text-[150px] leading-none text-white/[0.04] font-serif pointer-events-none select-none"
      >
        &rdquo;
      </div>

      {/* ============================================= */}
      {/* 1. TOP CENTER: GLASS PILL BADGE               */}
      {/* ============================================= */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative z-10 flex justify-center w-full"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#09101d]/90 border border-white/10">
          <span
            className={`w-2 h-2 rounded-full bg-[#00d2ff] ${
              isAudioActuallyFlowing ? "animate-ping" : ""
            }`}
          />
          <span className="font-sans text-xs font-bold tracking-wide text-[#38bdf8]">
            {language === "ar" ? review.title : "Student Testimonial"}
          </span>
        </div>
      </div>

      {/* ============================================= */}
      {/* 2. CENTER: CONCENTRIC DOUBLE-RING PLAY BUTTON */}
      {/* ============================================= */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayClick(review, index);
          }}
          aria-label={
            cardIsPlaying
              ? language === "ar"
                ? "إيقاف التسجيل الصوتي"
                : "Pause audio testimonial"
              : language === "ar"
              ? "تشغيل التسجيل الصوتي"
              : "Play audio testimonial"
          }
          className="swiper-no-swiping relative w-28 h-28 sm:w-[118px] sm:h-[118px] rounded-full border border-[#00d2ff]/35 bg-[#0e1b2e]/70 hover:border-[#00d2ff]/60 flex items-center justify-center transition-transform duration-150 active:scale-95 group cursor-pointer"
        >
          {/* Animated Outer Ring when buffering on slow network */}
          {cardIsBuffering && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00d2ff] border-r-[#00d2ff]/50 animate-spin pointer-events-none"
            />
          )}

          {/* Inner Concentric Circle */}
          <div className="w-[88px] h-[88px] sm:w-[94px] sm:h-[94px] rounded-full border border-[#00d2ff]/20 bg-[#122036]/90 flex items-center justify-center transition-transform duration-150 group-hover:scale-[1.03]">
            {cardIsBuffering ? (
              <Loader2 className="w-8 h-8 text-[#00d2ff] animate-spin" />
            ) : cardIsPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            )}
          </div>
        </button>
      </div>

      {/* ============================================= */}
      {/* 3. WAVEFORM + PROGRESS BAR + 5.0 STAR RATING  */}
      {/* ============================================= */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 28-Bar Simulated Waveform Equalizer */}
        <WaveformEqualizer isAnimating={isAudioActuallyFlowing} />

        {/* Interactive Progress Bar with Touch-Scrubbing Hit Area */}
        <div className="swiper-no-swiping w-full space-y-2 mb-5">
          <div
            ref={progressBarRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full py-2.5 -my-2.5 flex items-center touch-none cursor-pointer"
          >
            <div className="relative w-full h-1.5 rounded-full bg-[#153259] flex items-center">
              {/* Active Fill */}
              <div
                className="h-full rounded-full bg-[#00d2ff] relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Cyan Thumb Indicator */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#00d2ff] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>

          {/* Monospace Timestamps (0:00 ... 2:19) */}
          <div className="flex items-center justify-between font-mono tracking-widest text-[11px] text-slate-300/85 tabular-nums px-0.5">
            <span>{formatTime(cardCurrentTime)}</span>
            <span>{formatTime(cardDuration)}</span>
          </div>
        </div>

        {/* 5 Golden Stars + 5.0 Score Centered at Bottom (Zero SVG drop-shadow filter cost) */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
            />
          ))}
          <span className="text-white font-bold text-sm sm:text-[15px] ml-1.5 tabular-nums">
            5.0
          </span>
        </div>
      </div>
    </div>
  );
});

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
function VerifiedBadge({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label={label}
      className="w-3.5 h-3.5 text-brand-electric fill-brand-electric shrink-0"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.8-3.8 1.4-1.4 2.4 2.4 5.4-5.4 1.4 1.4-6.8 6.8z" />
    </svg>
  );
}

// Dedicated Final Slide: High-Converting Instagram Discovery Card
const InstagramReviewCard = memo(function InstagramReviewCard({
  language,
  isRTL,
}: {
  language: Language;
  isRTL: boolean;
}) {
  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full h-[400px] sm:h-[430px] rounded-[32px] px-6 py-7 sm:px-8 sm:py-8 bg-gradient-to-b from-[#162338] via-[#101929] to-[#0a101d] border border-white/15 shadow-[0_18px_36px_-10px_rgba(7,14,28,0.45)] flex flex-col items-center justify-between overflow-hidden transform-gpu [backface-visibility:hidden] select-none text-center"
    >
      {/* Zero-Blur-Filter Hardware-Accelerated Radial Halo Behind Center Emblem */}
      <div
        aria-hidden="true"
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(225, 48, 108, 0.22) 0%, rgba(37, 99, 235, 0.16) 45%, rgba(11, 27, 61, 0) 70%)",
        }}
      />

      {/* Watermark Quote (&rdquo;) Bottom Right */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-5 text-[150px] leading-none text-white/[0.04] font-serif pointer-events-none select-none"
      >
        &rdquo;
      </div>

      {/* ============================================= */}
      {/* 1. TOP CENTER: GLASS PILL BADGE               */}
      {/* ============================================= */}
      <div className="relative z-10 flex justify-center w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09101d]/90 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-wide text-slate-200">
            {language === "ar"
              ? "تجارب وشهادات حية"
              : "Live Stories & Testimonials"}
          </span>
        </div>
      </div>

      {/* ============================================= */}
      {/* 2. CENTER: CONCENTRIC INSTAGRAM ICON & COPY   */}
      {/* ============================================= */}
      <div className="relative z-10 my-auto flex flex-col items-center px-1 space-y-3.5">
        {/* Concentric Double-Ring Circle matching the Play Button proportions */}
        <a
          href="https://www.instagram.com/overseas_consulting_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            language === "ar"
              ? "زيارة حساب إنستغرام لـ M&A Overseas Consulting"
              : "Visit M&A Overseas Consulting on Instagram"
          }
          className="swiper-no-swiping relative w-24 h-24 sm:w-26 sm:h-26 rounded-full border border-pink-500/30 bg-gradient-to-tr from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 group cursor-pointer shadow-[0_0_24px_rgba(225,48,108,0.25)]"
        >
          <div className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] rounded-full border border-white/20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-inner">
            <InstagramIcon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2] drop-shadow-sm" />
          </div>
        </a>

        {/* Catchy Headline */}
        <div className="space-y-1.5 max-w-[270px]">
          <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
            {language === "ar"
              ? "واش باغي تشوف شهادات وتجارب طلاب أكثر؟"
              : "Want to see more student stories and visa approvals?"}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-300/90 leading-relaxed font-normal">
            {language === "ar"
              ? "كنوثقوا يومياً فيديوهات حصرية، مقابلات مع الطلبة، وتأشيرات القبول في كبرى جامعات أوروبا عبر حسابنا الرسمي."
              : "We share daily exclusive videos, student interviews, and official university admissions across Europe on our official Instagram."}
          </p>
        </div>
      </div>

      {/* ============================================= */}
      {/* 3. BOTTOM: INSTAGRAM CTA BUTTON & HANDLE      */}
      {/* ============================================= */}
      <div className="relative z-10 w-full flex flex-col items-center gap-2 pt-1">
        <a
          href="https://www.instagram.com/overseas_consulting_"
          target="_blank"
          rel="noopener noreferrer"
          className="swiper-no-swiping w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#bc1888] via-[#dc2743] to-[#e6683c] text-white text-xs font-bold shadow-[0_6px_20px_rgba(220,39,67,0.35)] hover:shadow-[0_8px_24px_rgba(220,39,67,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-200 group/btn"
        >
          <InstagramIcon className="w-3.5 h-3.5 text-white" />
          <span>
            {language === "ar" ? "تابعنا على إنستغرام" : "Follow Us on Instagram"}
          </span>
          <DirectionalArrow
            className={`w-3.5 h-3.5 ${
              isRTL
                ? "group-hover/btn:-translate-x-1"
                : "group-hover/btn:translate-x-1"
            } transition-transform`}
          />
        </a>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <span dir="ltr" className="tracking-tight text-slate-300">
            @overseas_consulting_
          </span>
          <VerifiedBadge
            label={language === "ar" ? "حساب موثق" : "Verified Account"}
          />
        </div>
      </div>
    </div>
  );
});

// Single Marquee Document Card with smooth progressive fade-in and eager preloading when near section
const MarqueeDocumentCard = memo(function MarqueeDocumentCard({
  src,
  index,
  language,
  shouldEagerLoad,
  onSelectImage,
}: {
  src: string;
  index: number;
  language: Language;
  shouldEagerLoad: boolean;
  onSelectImage: (src: string) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onSelectImage(src)}
      className="apple-glass group relative w-[185px] h-[230px] sm:w-[225px] sm:h-[280px] p-2 sm:p-2.5 rounded-2xl flex-shrink-0 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white ring-1 ring-slate-100/90">
        {!isLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-2 rounded-lg bg-slate-100/75"
          />
        )}
        <Image
          src={src}
          alt={
            language === "ar"
              ? `وثيقة قبول جامعي ${index + 1}`
              : `Official University Admission Document ${index + 1}`
          }
          fill
          sizes="(max-width: 640px) 185px, 225px"
          loading={shouldEagerLoad ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`object-contain p-1 transition-[transform,opacity] duration-300 group-hover:scale-[1.03] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
});

// Memoized Infinite Loop Marquee with direct DOM ref so we can freeze it in 0ms during touch-swipe
const ReviewImagesMarquee = memo(function ReviewImagesMarquee({
  trackRef,
  language,
  isPaused,
  shouldEagerLoad,
  onSelectImage,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  language: Language;
  isPaused: boolean;
  shouldEagerLoad: boolean;
  onSelectImage: (src: string) => void;
}) {
  return (
    <div
      dir="ltr"
      className="relative z-10 w-full mt-10 sm:mt-14 lg:mt-16 overflow-hidden select-none"
    >
      {/* Left & Right Horizon Edge Fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-28 z-10 bg-gradient-to-r from-[#FAFBFD] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-28 z-10 bg-gradient-to-l from-[#FAFBFD] to-transparent"
      />

      {/* Continuous Seamless Infinite Track */}
      <div
        ref={trackRef}
        className="animate-marquee-infinite flex items-center py-3"
        style={{
          animationDuration: "68s",
          animationPlayState: isPaused ? "paused" : undefined,
        }}
      >
        <div className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
          {reviewImages.map((src, index) => (
            <MarqueeDocumentCard
              key={`reviews-track-a-${index}`}
              src={src}
              index={index}
              language={language}
              shouldEagerLoad={shouldEagerLoad}
              onSelectImage={onSelectImage}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0"
        >
          {reviewImages.map((src, index) => (
            <MarqueeDocumentCard
              key={`reviews-track-b-${index}`}
              src={src}
              index={index}
              language={language}
              shouldEagerLoad={shouldEagerLoad}
              onSelectImage={onSelectImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export function AudioReviews() {
  const { language, isRTL } = useLanguage();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isMarqueeInView, setIsMarqueeInView] = useState<boolean>(true);
  const [shouldPreloadMarquee, setShouldPreloadMarquee] =
    useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isHighResPreviewLoaded, setIsHighResPreviewLoaded] =
    useState<boolean>(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const hlsAudioRef = useRef<HlsAudioHandle | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioDeckRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const activeAudioIdRef = useRef<number | null>(null);
  const isMarqueeInViewRef = useRef<boolean>(true);
  const hasPreviewRef = useRef<boolean>(false);

  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    activeAudioIdRef.current = activeAudioId;
  }, [activeAudioId]);

  useEffect(() => {
    isMarqueeInViewRef.current = isMarqueeInView;
  }, [isMarqueeInView]);

  useEffect(() => {
    hasPreviewRef.current = Boolean(previewImage);
  }, [previewImage]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Direct 0ms DOM helper to freeze marquee animation while user's finger is swiping the 3D cards
  const setMarqueeSwipingPause = useCallback((swiping: boolean) => {
    const trackEl = marqueeTrackRef.current;
    if (!trackEl) return;
    if (swiping) {
      trackEl.style.animationPlayState = "paused";
    } else if (isMarqueeInViewRef.current && !hasPreviewRef.current) {
      trackEl.style.animationPlayState = "";
    }
  }, []);

  // Completely stops audio AND aborts background network downloading
  const stopCurrentAudio = useCallback(() => {
    if (activeAudioIdRef.current !== null) {
      activeAudioIdRef.current = null;
      setActiveAudioId(null);
      setIsPlaying(false);
      setIsBuffering(false);
      setCurrentTime(0);
      setDuration(0);
    }
    hlsAudioRef.current?.stop();
  }, []);

  const handleNext = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    stopCurrentAudio();
    if (swiper.activeIndex >= TOTAL_SLIDES - 1) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
  }, [stopCurrentAudio]);

  const handlePrev = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    stopCurrentAudio();
    if (swiper.activeIndex <= 0) {
      swiper.slideTo(TOTAL_SLIDES - 1);
    } else {
      swiper.slidePrev();
    }
  }, [stopCurrentAudio]);

  const handlePlayClick = useCallback(
    (review: AudioReview, slideIndex: number) => {
      const swiper = swiperRef.current;
      const targetDuration = review.fallbackDuration || 32;

      // If user clicked Play on a peeking side card, smoothly slide to it and play it
      if (swiper && swiper.activeIndex !== slideIndex) {
        stopCurrentAudio();
        swiper.slideTo(slideIndex);
        activeAudioIdRef.current = review.id;
        setActiveAudioId(review.id);
        setCurrentTime(0);
        setDuration(targetDuration);
        hlsAudioRef.current?.play(review.audioUrl, targetDuration);
        return;
      }

      if (activeAudioIdRef.current === review.id) {
        if (isPlaying) {
          hlsAudioRef.current?.pause();
          setIsPlaying(false);
          setIsBuffering(false);
        } else {
          hlsAudioRef.current?.play(review.audioUrl, targetDuration);
        }
      } else {
        activeAudioIdRef.current = review.id;
        setActiveAudioId(review.id);
        setCurrentTime(0);
        setDuration(targetDuration);
        hlsAudioRef.current?.play(review.audioUrl, targetDuration);
      }
    },
    [isPlaying, stopCurrentAudio]
  );

  const handleSeekToRatio = useCallback(
    (review: AudioReview, slideIndex: number, ratio: number) => {
      const swiper = swiperRef.current;
      if (swiper && swiper.activeIndex !== slideIndex) return;

      const targetDuration =
        activeAudioIdRef.current === review.id && duration > 0
          ? duration
          : review.fallbackDuration || 32;
      const targetTime = ratio * targetDuration;

      if (activeAudioIdRef.current === review.id) {
        setCurrentTime(targetTime);
        hlsAudioRef.current?.seek(targetTime);
      } else {
        activeAudioIdRef.current = review.id;
        setActiveAudioId(review.id);
        setCurrentTime(targetTime);
        setDuration(targetDuration);
        hlsAudioRef.current?.play(review.audioUrl, targetDuration, targetTime);
      }
    },
    [duration]
  );

  const handleTimeUpdate = useCallback((cur: number, dur: number) => {
    setCurrentTime(cur);
    if (dur > 0) setDuration(dur);
  }, []);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleBufferingChange = useCallback((buffering: boolean) => {
    setIsBuffering(buffering);
  }, []);

  const handleAudioEnded = useCallback(() => {
    activeAudioIdRef.current = null;
    setActiveAudioId(null);
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
  }, []);

  const handleSelectPreviewImage = useCallback(
    (src: string) => {
      stopCurrentAudio();
      setIsHighResPreviewLoaded(false);
      setPreviewImage(src);
    },
    [stopCurrentAudio]
  );

  // 1. Observe the Audio Deck specifically: the moment the audio cards scroll out of view,
  // immediately stop playback AND abort any background network download
  useEffect(() => {
    const deckEl = audioDeckRef.current;
    if (!deckEl || typeof IntersectionObserver === "undefined") return;

    const deckObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stopCurrentAudio();
        }
      },
      { threshold: 0.15 }
    );

    deckObserver.observe(deckEl);
    return () => deckObserver.disconnect();
  }, [stopCurrentAudio]);

  // 2. Observe the section to preload marquee images when user is within 700px
  // and pause marquee animation when offscreen
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof IntersectionObserver === "undefined") return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsMarqueeInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px", threshold: 0 }
    );

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPreloadMarquee(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "700px 0px", threshold: 0 }
    );

    visibilityObserver.observe(sectionEl);
    preloadObserver.observe(sectionEl);
    return () => {
      visibilityObserver.disconnect();
      preloadObserver.disconnect();
    };
  }, []);

  // 3. Stop audio & abort background download if user switches browser tabs or locks phone
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCurrentAudio();
      }
    };
    const handlePageHide = () => {
      stopCurrentAudio();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [stopCurrentAudio]);

  // Close image preview on Escape key and lock background scroll while open
  useEffect(() => {
    if (!previewImage) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-20 lg:pb-24 bg-transparent overflow-hidden select-none scroll-mt-20"
    >
      {/* Zero-Blur-Filter Ambient Radial Lighting (0ms Mobile GPU Cost) */}
      <div
        aria-hidden="true"
        className="absolute top-0 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.11) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Singleton Hidden Audio Engine */}
      <HlsAudio
        ref={hlsAudioRef}
        onTimeUpdate={handleTimeUpdate}
        onPlayStateChange={handlePlayStateChange}
        onBufferingChange={handleBufferingChange}
        onEnded={handleAudioEnded}
      />

      <div
        ref={audioDeckRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          {/* =============================================================== */}
          {/* START COLUMN: CALLIGRAPHIC / EDITORIAL TYPOGRAPHY & PROMPT      */}
          {/* =============================================================== */}
          <div
            className={`lg:col-span-5 flex flex-col items-center lg:items-start text-center ${
              isRTL ? "lg:text-right" : "lg:text-left"
            }`}
          >
            {/* Top Kicker with Blue Dot */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
              <span className="text-xs font-bold tracking-wide text-[#0066FF]">
                {language === "ar"
                  ? "شهادات وتجارب موثقة"
                  : "Verified Testimonials & Stories"}
              </span>
            </div>

            {/* Decorative Calligraphic Arabic Title (Aref Ruqaa) or Editorial English Display Title */}
            <div className="relative mb-7">
              {language === "ar" ? (
                <h2 className="font-calligraphy text-6xl sm:text-7xl lg:text-[88px] leading-[1.12] font-normal text-[#0d1626] select-none">
                  <span className="block">آرَاءُ</span>
                  <span className="block -mt-1 text-[#0B1B3D] pr-2 sm:pr-4">
                    طُلَّابِنَا
                  </span>
                </h2>
              ) : (
                <h2 className="font-sans text-5xl sm:text-6xl lg:text-[68px] leading-[1.04] font-extrabold tracking-tight text-[#0d1626] select-none">
                  <span className="block">Student</span>
                  <span className="block text-[#0B1B3D]">Voices</span>
                </h2>
              )}

              {/* Subtle Calligraphic Decorative Swash Flourish Underneath */}
              <svg
                viewBox="0 0 180 22"
                fill="none"
                aria-hidden="true"
                className="w-36 sm:w-44 h-5 mt-1 text-[#0066FF]/75 mx-auto lg:mx-0"
              >
                <path
                  d="M172 6C132 18 64 19 8 8"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M140 14C108 20 58 20 28 14"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeOpacity="0.55"
                />
              </svg>
            </div>

            {/* Description Paragraph */}
            <p
              className={`text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-md mb-8 text-center ${
                isRTL ? "lg:text-right" : "lg:text-left"
              }`}
            >
              {language === "ar"
                ? "استمع لآراء وتجارب الطلاب وأولياء الأمور الذين رافقناهم نحو أفضل الجامعات الأوروبية. نتائج حقيقية، وأصوات حقيقية."
                : "Listen to real feedback and experiences from students and parents we guided to top European universities. Real results, real voices."}
            </p>

            {/* Bottom Interactive Swipe / Click Prompt */}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#0066FF] hover:text-[#0B1B3D] transition-colors duration-200 group cursor-pointer"
            >
              <span>
                {language === "ar"
                  ? "اسحب للاستماع للتجارب"
                  : "Swipe to listen to experiences"}
              </span>
              <DirectionalArrow
                className={`w-4 h-4 transition-transform duration-200 ${
                  isRTL
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* =============================================================== */}
          {/* END COLUMN: 3D COVERFLOW SWIPER (PC & PHONE)                    */}
          {/* =============================================================== */}
          <div className="lg:col-span-7 w-full flex flex-col items-center justify-center">
            {isMounted && (
              <div
                dir="ltr"
                className="relative w-full flex flex-col items-center justify-center select-none"
              >
                <div className="relative w-full flex items-center justify-center">
                  {/* Desktop / Tablet Left (Prev) Pure White Circle Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={
                      language === "ar" ? "التقييم السابق" : "Previous review"
                    }
                    className="hidden sm:flex w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-[#0B1B3D] items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_6px_20px_rgba(11,27,61,0.08)] border border-slate-100 shrink-0 mr-3 md:mr-5 cursor-pointer z-30 group"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </button>

                  {/* 3D Coverflow Swiper Viewport (Zero mask-image alpha buffer overhead) */}
                  <div className="relative w-full max-w-[360px] sm:max-w-[520px] overflow-hidden py-6 px-2">
                    <Swiper
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      speed={420}
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView={"auto"}
                      slideToClickedSlide={true}
                      initialSlide={0}
                      watchSlidesProgress={true}
                      keyboard={{
                        enabled: true,
                        onlyInViewport: true,
                      }}
                      coverflowEffect={{
                        rotate: 6,
                        stretch: 14,
                        depth: 90,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      modules={[EffectCoverflow, Keyboard]}
                      className="w-full !overflow-visible [touch-action:pan-y]"
                      onTouchStart={() => {
                        // Freeze bottom 40-image marquee in 0ms while user's finger is on the cards
                        setMarqueeSwipingPause(true);
                      }}
                      onSliderFirstMove={() => {
                        setMarqueeSwipingPause(true);
                        if (activeAudioIdRef.current !== null) {
                          stopCurrentAudio();
                        }
                      }}
                      onTouchEnd={() => {
                        setMarqueeSwipingPause(false);
                      }}
                      onTransitionEnd={() => {
                        setMarqueeSwipingPause(false);
                      }}
                      onSlideChange={(swiper) => {
                        if (activeAudioIdRef.current !== null) {
                          stopCurrentAudio();
                        }
                        setCurrentIndex(swiper.activeIndex);
                      }}
                    >
                      {audioReviews.map((review, index) => {
                        const isThisCardActiveAudio =
                          activeAudioId === review.id;
                        const cardIsPlaying =
                          isThisCardActiveAudio && isPlaying;
                        const cardIsBuffering =
                          isThisCardActiveAudio && isBuffering;
                        const cardDuration =
                          isThisCardActiveAudio && duration > 0
                            ? duration
                            : review.fallbackDuration || 32;
                        const cardCurrentTime = isThisCardActiveAudio
                          ? currentTime
                          : 0;

                        return (
                          <SwiperSlide
                            key={review.id}
                            className="!w-[288px] sm:!w-[325px] md:!w-[340px]"
                          >
                            <AudioReviewCard
                              review={review}
                              index={index}
                              language={language}
                              isRTL={isRTL}
                              cardIsPlaying={cardIsPlaying}
                              cardIsBuffering={cardIsBuffering}
                              cardCurrentTime={cardCurrentTime}
                              cardDuration={cardDuration}
                              onPlayClick={handlePlayClick}
                              onSeekToRatio={handleSeekToRatio}
                            />
                          </SwiperSlide>
                        );
                      })}

                      {/* Final Slide: High-Converting Instagram Discovery Card */}
                      <SwiperSlide
                        key="instagram-card-slide"
                        className="!w-[288px] sm:!w-[325px] md:!w-[340px]"
                      >
                        <InstagramReviewCard
                          language={language}
                          isRTL={isRTL}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  {/* Desktop / Tablet Right (Next) Electric Blue Circle Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={
                      language === "ar" ? "التقييم التالي" : "Next review"
                    }
                    className="hidden sm:flex w-12 h-12 rounded-full bg-[#0066FF] hover:bg-[#2563EB] text-white items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_8px_24px_rgba(0,102,255,0.38)] shrink-0 ml-3 md:ml-5 cursor-pointer z-30 group"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Interactive Pagination Dots Indicator */}
                <div
                  className="flex items-center justify-center gap-1.5 mt-2"
                  aria-hidden="true"
                >
                  {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
                    <button
                      key={`review-dot-${idx}`}
                      type="button"
                      onClick={() => {
                        stopCurrentAudio();
                        swiperRef.current?.slideTo(idx);
                      }}
                      aria-label={
                        language === "ar"
                          ? `عرض التقييم ${idx + 1}`
                          : `View review ${idx + 1}`
                      }
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? "w-6 bg-brand-electric"
                          : "w-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Mobile Navigation Arrows (Bottom Center for Easy Thumb Reach) */}
                <div className="mt-6 flex sm:hidden items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={
                      language === "ar" ? "التقييم السابق" : "Previous review"
                    }
                    className="w-11 h-11 rounded-full bg-white text-[#0B1B3D] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_6px_20px_rgba(11,27,61,0.08)] border border-slate-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={
                      language === "ar" ? "التقييم التالي" : "Next review"
                    }
                    className="w-11 h-11 rounded-full bg-[#0066FF] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_8px_24px_rgba(0,102,255,0.38)] cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* INTEGRATED INFINITE LOOP STRIP FOR ACCEPTANCE & REVIEW IMAGES       */}
      {/* =================================================================== */}
      <ReviewImagesMarquee
        trackRef={marqueeTrackRef}
        language={language}
        isPaused={!isMarqueeInView || Boolean(previewImage)}
        shouldEagerLoad={shouldPreloadMarquee}
        onSelectImage={handleSelectPreviewImage}
      />

      {/* Zero-Text Progressive Lightbox Preview (0ms cached preview + HD crossfade) */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071228]/80 backdrop-blur-md p-4 sm:p-6 cursor-pointer"
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            aria-label={language === "ar" ? "إغلاق" : "Close"}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl h-[78vh] sm:h-[84vh] bg-white rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden cursor-default"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
              {/* Layer 1: Instant 0ms Cached Thumbnail from Marquee */}
              <Image
                src={previewImage}
                alt={
                  language === "ar"
                    ? "وثيقة قبول جامعي"
                    : "University Admission Document"
                }
                fill
                sizes="(max-width: 640px) 185px, 225px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />

              {/* Layer 2: High-Resolution Version Crossfading Over Top */}
              <Image
                src={previewImage}
                alt={
                  language === "ar"
                    ? "وثيقة قبول جامعي عالية الدقة"
                    : "High-Resolution University Admission Document"
                }
                fill
                sizes="(max-width: 768px) 95vw, 672px"
                priority
                referrerPolicy="no-referrer"
                onLoad={() => setIsHighResPreviewLoaded(true)}
                className={`object-contain transition-opacity duration-300 ${
                  isHighResPreviewLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Subtle Corner Spinner while HD layer is sharpening on slow 3G */}
              {!isHighResPreviewLoaded && (
                <div
                  aria-hidden="true"
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-brand-navy/10 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                >
                  <Loader2 className="w-4 h-4 text-brand-electric animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
