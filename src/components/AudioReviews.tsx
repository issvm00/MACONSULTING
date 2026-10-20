"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowLeft,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { audioReviews } from "@/data/audioReviews";
import { HlsAudio, HlsAudioHandle } from "@/components/ui/HlsAudio";

// 28-bar Simulated Waveform Equalizer heights from technical specification
const waveHeights = [
  15, 20, 35, 25, 40, 60, 45, 30, 55, 75, 60, 40, 85, 100, 90, 70, 50, 80, 95,
  65, 45, 60, 35, 25, 40, 20, 30, 15,
];

// 20 Official Admission / Acceptance Images in /public/reviewsimage
const reviewImages: string[] = Array.from(
  { length: 20 },
  (_, index) => `/reviewsimage/${index + 1}.webp`
);

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AudioReviews() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loadedDurations, setLoadedDurations] = useState<Record<number, number>>(
    {}
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const hlsAudioRef = useRef<HlsAudioHandle | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Preload real MP3 durations with full memory cleanup so detached Audio nodes never leak
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isCancelled = false;
    const tempAudios: HTMLAudioElement[] = [];

    audioReviews.forEach((item) => {
      if (item.audioUrl && !item.audioUrl.toLowerCase().endsWith(".m3u8")) {
        const tempAudio = new Audio();
        tempAudio.preload = "metadata";

        const cleanupAudio = () => {
          tempAudio.onloadedmetadata = null;
          tempAudio.onerror = null;
          tempAudio.removeAttribute("src");
          tempAudio.load();
        };

        tempAudio.onloadedmetadata = () => {
          if (
            !isCancelled &&
            Number.isFinite(tempAudio.duration) &&
            tempAudio.duration > 0
          ) {
            const exactDuration = tempAudio.duration;
            setLoadedDurations((prev) => ({
              ...prev,
              [item.id]: exactDuration,
            }));
          }
          cleanupAudio();
        };

        tempAudio.onerror = () => {
          cleanupAudio();
        };

        tempAudio.src = encodeURI(item.audioUrl);
        tempAudios.push(tempAudio);
      }
    });

    return () => {
      isCancelled = true;
      tempAudios.forEach((audio) => {
        audio.onloadedmetadata = null;
        audio.onerror = null;
        audio.removeAttribute("src");
        audio.load();
      });
    };
  }, []);

  // Auto-Stop on Slide (guarantees audio never keeps playing in background when card changes)
  const stopCurrentAudio = useCallback(() => {
    setActiveAudioId(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    hlsAudioRef.current?.stop();
  }, []);

  const handleNext = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    stopCurrentAudio();
    if (swiper.activeIndex >= audioReviews.length - 1) {
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
      swiper.slideTo(audioReviews.length - 1);
    } else {
      swiper.slidePrev();
    }
  }, [stopCurrentAudio]);

  const togglePlay = useCallback(
    (reviewId: number, audioUrl: string, fallbackDuration?: number) => {
      const targetDuration =
        loadedDurations[reviewId] || fallbackDuration || 32;

      if (activeAudioId === reviewId) {
        if (isPlaying) {
          hlsAudioRef.current?.pause();
          setIsPlaying(false);
        } else {
          hlsAudioRef.current?.play(audioUrl, targetDuration);
        }
      } else {
        setActiveAudioId(reviewId);
        setCurrentTime(0);
        setDuration(targetDuration);
        hlsAudioRef.current?.play(audioUrl, targetDuration);
      }
    },
    [activeAudioId, isPlaying, loadedDurations]
  );

  const handleSeek = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      cardIsActive: boolean,
      reviewId: number,
      cardDuration: number
    ) => {
      if (!cardIsActive || activeAudioId !== reviewId || cardDuration <= 0) {
        return;
      }
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = ratio * cardDuration;
      setCurrentTime(targetTime);
      hlsAudioRef.current?.seek(targetTime);
    },
    [activeAudioId]
  );

  const handleTimeUpdate = useCallback((cur: number, dur: number) => {
    setCurrentTime(cur);
    if (dur > 0) setDuration(dur);
  }, []);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleAudioEnded = useCallback(() => {
    setActiveAudioId(null);
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  // Observe section visibility to pause audio and infinite marquee when offscreen
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          stopCurrentAudio();
        }
      },
      { rootMargin: "100px 0px", threshold: 0 }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, [stopCurrentAudio]);

  // Close image preview on Escape key
  useEffect(() => {
    if (!previewImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  const renderReviewImageCard = (
    src: string,
    keyPrefix: string,
    index: number
  ) => (
    <div
      key={`${keyPrefix}-${index}`}
      onClick={() => setPreviewImage(src)}
      className="apple-glass group relative w-[185px] h-[230px] sm:w-[225px] sm:h-[280px] p-2 sm:p-2.5 rounded-2xl flex-shrink-0 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white ring-1 ring-slate-100/90">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 185px, 225px"
          referrerPolicy="no-referrer"
          className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      dir="rtl"
      className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-20 lg:pb-24 bg-transparent overflow-hidden select-none scroll-mt-20"
    >
      {/* Subtle Dot Grid Pattern Background with smooth top fade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.055] [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(#0B1B3D 1.25px, transparent 1.25px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Soft Cyan / Light Blue Organic Ambient Waves */}
      <div
        aria-hidden="true"
        className="absolute top-0 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-[#38bdf8]/15 via-[#2563EB]/8 to-transparent blur-[90px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-[#00d2ff]/10 blur-[100px] pointer-events-none"
      />

      {/* Singleton Hidden Audio Engine */}
      <HlsAudio
        ref={hlsAudioRef}
        onTimeUpdate={handleTimeUpdate}
        onPlayStateChange={handlePlayStateChange}
        onEnded={handleAudioEnded}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          {/* =============================================================== */}
          {/* RIGHT COLUMN (RTL): ARABIC CALLIGRAPHIC TYPOGRAPHY & PROMPT     */}
          {/* =============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-right">
            {/* Top Kicker in Arabic with Blue Dot */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
              <span className="text-xs font-bold tracking-wide text-[#0066FF]">
                شهادات وتجارب موثقة
              </span>
            </div>

            {/* Decorative Calligraphic Arabic Title (Aref Ruqaa) with Swash Flourish */}
            <div className="relative mb-7">
              <h2 className="font-calligraphy text-6xl sm:text-7xl lg:text-[88px] leading-[1.12] font-normal text-[#0d1626] select-none">
                <span className="block">آرَاءُ</span>
                <span className="block -mt-1 text-[#0B1B3D] pr-2 sm:pr-4">
                  طُلَّابِنَا
                </span>
              </h2>

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

            {/* Description Paragraph in Arabic */}
            <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-md mb-8 text-center lg:text-right">
              استمع لآراء وتجارب الطلاب وأولياء الأمور الذين رافقناهم نحو أفضل
              الجامعات الأوروبية. نتائج حقيقية، وأصوات حقيقية.
            </p>

            {/* Bottom Interactive Swipe / Click Prompt in Arabic RTL */}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#0066FF] hover:text-[#0B1B3D] transition-colors duration-200 group cursor-pointer"
            >
              <span>اسحب للاستماع للتجارب</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </button>
          </div>

          {/* =============================================================== */}
          {/* LEFT COLUMN (RTL): 3D COVERFLOW SWIPER (PC & PHONE)             */}
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
                    aria-label="التقييم السابق"
                    className="hidden sm:flex w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-[#0B1B3D] items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_6px_20px_rgba(11,27,61,0.08)] border border-slate-100 shrink-0 mr-3 md:mr-5 cursor-pointer z-30 group"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </button>

                  {/* 3D Coverflow Swiper Viewport (Exact smooth physics as Team section) */}
                  <div className="relative w-full max-w-[360px] sm:max-w-[520px] overflow-hidden py-6 px-2 sm:[mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]">
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
                      coverflowEffect={{
                        rotate: 6,
                        stretch: 14,
                        depth: 90,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      modules={[EffectCoverflow]}
                      className="w-full !overflow-visible [touch-action:pan-y]"
                      onSlideChange={(swiper) => {
                        stopCurrentAudio();
                        setCurrentIndex(swiper.activeIndex);
                      }}
                    >
                      {audioReviews.map((review, index) => {
                        const isActive = currentIndex === index;
                        const cardIsPlaying =
                          isActive && activeAudioId === review.id && isPlaying;
                        const cardDuration =
                          isActive && activeAudioId === review.id && duration > 0
                            ? duration
                            : loadedDurations[review.id] ||
                              review.fallbackDuration ||
                              32;
                        const cardCurrentTime =
                          isActive && activeAudioId === review.id
                            ? currentTime
                            : 0;
                        const progressPercent =
                          isActive &&
                          activeAudioId === review.id &&
                          cardDuration > 0
                            ? Math.min(
                                100,
                                (cardCurrentTime / cardDuration) * 100
                              )
                            : 0;

                        return (
                          <SwiperSlide
                            key={review.id}
                            className="!w-[288px] sm:!w-[325px] md:!w-[340px] transition-transform duration-300"
                          >
                            <div
                              className={`
                                relative w-full h-[400px] sm:h-[430px] rounded-[32px] px-7 py-8 sm:px-8 sm:py-9
                                bg-gradient-to-b from-[#162338] via-[#101929] to-[#0a101d]
                                border transition-all duration-300
                                flex flex-col items-center justify-between overflow-hidden transform-gpu
                                ${
                                  isActive
                                    ? "border-white/15 shadow-[0_24px_50px_-12px_rgba(7,14,28,0.55)]"
                                    : "border-white/10 shadow-[0_14px_30px_-10px_rgba(7,14,28,0.35)] opacity-90 cursor-pointer"
                                }
                              `}
                            >
                              {/* Subtle Top Inner Specular Highlight */}
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[32px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]"
                              />

                              {/* Cinematic Glowing Cyan/Blue Halo Behind Center Play Button */}
                              <div
                                aria-hidden="true"
                                className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#00b4d8] blur-[65px] pointer-events-none transition-opacity duration-500 ${
                                  cardIsPlaying ? "opacity-45" : "opacity-25"
                                }`}
                              />

                              {/* Watermark Quote (&rdquo;) Bottom Right */}
                              <div
                                aria-hidden="true"
                                className="absolute bottom-6 right-5 text-[150px] leading-none text-white/[0.04] font-serif pointer-events-none select-none"
                              >
                                &rdquo;
                              </div>

                              {/* ============================================= */}
                              {/* 1. TOP CENTER: GLASS PILL BADGE IN ARABIC     */}
                              {/* ============================================= */}
                              <div
                                dir="rtl"
                                className="relative z-10 flex justify-center w-full"
                              >
                                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#09101d]/85 backdrop-blur-md border border-white/10 shadow-inner">
                                  <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse shadow-[0_0_10px_#00d2ff]" />
                                  <span className="font-sans text-xs font-bold tracking-wide text-[#38bdf8]">
                                    {review.title}
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
                                    if (!isActive) return;
                                    e.stopPropagation();
                                    togglePlay(
                                      review.id,
                                      review.audioUrl,
                                      review.fallbackDuration
                                    );
                                  }}
                                  aria-label={
                                    cardIsPlaying
                                      ? "إيقاف التسجيل الصوتي"
                                      : "تشغيل التسجيل الصوتي"
                                  }
                                  className={`swiper-no-swiping relative w-28 h-28 sm:w-[118px] sm:h-[118px] rounded-full border border-[#00d2ff]/35 bg-[#0e1b2e]/50 shadow-[0_0_35px_rgba(0,210,255,0.18)] hover:shadow-[0_0_45px_rgba(0,210,255,0.32)] hover:border-[#00d2ff]/60 flex items-center justify-center transition-all duration-300 active:scale-95 group ${
                                    isActive
                                      ? "cursor-pointer"
                                      : "pointer-events-none"
                                  }`}
                                >
                                  {/* Inner Concentric Circle */}
                                  <div className="w-[88px] h-[88px] sm:w-[94px] sm:h-[94px] rounded-full border border-[#00d2ff]/20 bg-[#122036]/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
                                    {cardIsPlaying ? (
                                      <Pause className="w-8 h-8 text-white fill-white transition-transform duration-200" />
                                    ) : (
                                      <Play className="w-8 h-8 text-white fill-white ml-1 transition-transform duration-200" />
                                    )}
                                  </div>
                                </button>
                              </div>

                              {/* ============================================= */}
                              {/* 3. WAVEFORM + PROGRESS BAR + 5.0 STAR RATING  */}
                              {/* ============================================= */}
                              <div className="relative z-10 w-full flex flex-col items-center">
                                {/* 28-Bar Simulated Waveform Equalizer */}
                                <div className="w-[76%] h-6 flex items-center justify-between gap-[3px] mb-4">
                                  {waveHeights.map((height, i) => {
                                    const delay = (i * 0.05) % 0.8;
                                    const isCenterAccent =
                                      Math.abs(waveHeights.length / 2 - i) < 6;

                                    return (
                                      <div
                                        key={i}
                                        className={`w-[2.5px] rounded-full transition-colors duration-300 origin-center ${
                                          isCenterAccent
                                            ? "bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.9)]"
                                            : "bg-white/30"
                                        }`}
                                        style={{
                                          height: `${height}%`,
                                          transform: cardIsPlaying
                                            ? undefined
                                            : "scaleY(0.22)",
                                          animation: cardIsPlaying
                                            ? `eq-play 0.8s ease-in-out ${delay.toFixed(
                                                2
                                              )}s infinite`
                                            : "none",
                                        }}
                                      />
                                    );
                                  })}
                                </div>

                                {/* Interactive Progress Bar */}
                                <div className="swiper-no-swiping w-full space-y-2 mb-5">
                                  <div
                                    onClick={(e) =>
                                      handleSeek(
                                        e,
                                        isActive,
                                        review.id,
                                        cardDuration
                                      )
                                    }
                                    className={`relative w-full h-1.5 rounded-full bg-[#153259] flex items-center ${
                                      isActive && activeAudioId === review.id
                                        ? "cursor-pointer"
                                        : ""
                                    }`}
                                  >
                                    {/* Active Fill */}
                                    <div
                                      className="h-full rounded-full bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.75)] transition-[width] duration-100 ease-linear relative"
                                      style={{ width: `${progressPercent}%` }}
                                    >
                                      {/* Glowing Cyan Thumb Indicator */}
                                      <div className="w-3.5 h-3.5 rounded-full bg-[#00d2ff] shadow-[0_0_12px_#00d2ff] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
                                    </div>
                                  </div>

                                  {/* Monospace Timestamps (0:00 ... 2:19) */}
                                  <div className="flex items-center justify-between font-mono tracking-widest text-[11px] text-slate-300/85 tabular-nums px-0.5">
                                    <span>{formatTime(cardCurrentTime)}</span>
                                    <span>{formatTime(cardDuration)}</span>
                                  </div>
                                </div>

                                {/* 5 Golden Stars + 5.0 Score Centered at Bottom */}
                                <div className="flex items-center justify-center gap-1.5 pt-1">
                                  {Array.from({ length: review.rating }).map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)]"
                                      />
                                    )
                                  )}
                                  <span className="text-white font-bold text-sm sm:text-[15px] ml-1.5 tabular-nums">
                                    5.0
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  {/* Desktop / Tablet Right (Next) Electric Blue Circle Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="التقييم التالي"
                    className="hidden sm:flex w-12 h-12 rounded-full bg-[#0066FF] hover:bg-[#2563EB] text-white items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_8px_24px_rgba(0,102,255,0.38)] shrink-0 ml-3 md:ml-5 cursor-pointer z-30 group"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Interactive Pagination Dots Indicator (Exact Team Section Style) */}
                <div
                  className="flex items-center justify-center gap-1.5 mt-2"
                  aria-hidden="true"
                >
                  {audioReviews.map((r, idx) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        stopCurrentAudio();
                        swiperRef.current?.slideTo(idx);
                      }}
                      aria-label={`عرض التقييم ${idx + 1}`}
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
                    aria-label="التقييم السابق"
                    className="w-11 h-11 rounded-full bg-white text-[#0B1B3D] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-[0_6px_20px_rgba(11,27,61,0.08)] border border-slate-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="التقييم التالي"
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
      <div
        dir="ltr"
        className="relative z-10 w-full mt-10 sm:mt-14 lg:mt-16 overflow-hidden select-none"
      >
        {/* Left & Right Horizon Edge Fades (Matches PartnersMarquee) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-28 z-10 bg-gradient-to-r from-[#FAFBFD] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-28 z-10 bg-gradient-to-l from-[#FAFBFD] to-transparent"
        />

        {/* Continuous Seamless Infinite Track (Pauses when offscreen or hovered) */}
        <div
          className="animate-marquee-infinite flex items-center py-3"
          style={{
            animationDuration: "68s",
            animationPlayState:
              isInView && !previewImage ? "running" : "paused",
          }}
        >
          <div className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
            {reviewImages.map((src, index) =>
              renderReviewImageCard(src, "reviews-track-a", index)
            )}
          </div>
          <div
            aria-hidden="true"
            className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0"
          >
            {reviewImages.map((src, index) =>
              renderReviewImageCard(src, "reviews-track-b", index)
            )}
          </div>
        </div>
      </div>

      {/* Zero-Text Clean Lightbox Preview when a user clicks an image */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071228]/80 backdrop-blur-md p-4 sm:p-6 cursor-pointer"
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            aria-label="إغلاق"
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl h-[78vh] sm:h-[84vh] bg-white rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden cursor-default"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
              <Image
                src={previewImage}
                alt=""
                fill
                sizes="(max-width: 768px) 95vw, 672px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
