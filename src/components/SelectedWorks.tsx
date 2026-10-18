"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { portfolioVideos } from "@/data/portfolio";
import HlsVideo from "@/components/ui/HlsVideo";

// High-performance slim progress bar (updates directly via DOM for 60fps without React re-renders)
interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ videoRef }) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (barRef.current && video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        barRef.current.style.width = `${percent}%`;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate, { passive: true });
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-30 pointer-events-none overflow-hidden rounded-b-3xl">
      <div
        ref={barRef}
        className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-[width] duration-100 ease-linear"
        style={{ width: "0%" }}
      />
    </div>
  );
};

export const SelectedWorks: React.FC = () => {
  const [playingSlideIndex, setPlayingSlideIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Speculative Background Pre-caching in idle time so side cards never flash blank when swiping
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sorted = [...portfolioVideos].sort((a, b) => a.id - b.id);
    if (sorted.length === 0) return;

    const prioritizedUrls: string[] = [];
    if (sorted[0]?.thumbnailUrl) prioritizedUrls.push(sorted[0].thumbnailUrl);
    if (sorted[1]?.thumbnailUrl) prioritizedUrls.push(sorted[1].thumbnailUrl);
    if (sorted[sorted.length - 1]?.thumbnailUrl)
      prioritizedUrls.push(sorted[sorted.length - 1].thumbnailUrl);

    sorted.forEach((w) => {
      if (w.thumbnailUrl && !prioritizedUrls.includes(w.thumbnailUrl)) {
        prioritizedUrls.push(w.thumbnailUrl);
      }
    });

    let isCancelled = false;
    const queue = [...prioritizedUrls];

    const preloadNext = () => {
      if (isCancelled || queue.length === 0) return;
      const nextUrl = queue.shift();
      if (!nextUrl) return;

      const img = new Image();
      img.decoding = "async";
      img.onload = () => scheduleNext();
      img.onerror = () => scheduleNext();
      img.src = nextUrl;
    };

    const scheduleNext = () => {
      if (isCancelled) return;
      type IdleCallbackWindow = Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number }
        ) => number;
      };
      const idleWin = window as IdleCallbackWindow;
      if (typeof idleWin.requestIdleCallback === "function") {
        idleWin.requestIdleCallback(preloadNext, { timeout: 1500 });
      } else {
        setTimeout(preloadNext, 80);
      }
    };

    const kickOffTimer = setTimeout(() => {
      scheduleNext();
    }, 800);

    return () => {
      isCancelled = true;
      clearTimeout(kickOffTimer);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (activeVideoRef.current) {
      activeVideoRef.current.muted = nextMuted;
    }
  };

  const handleCardClick = (
    slideIndex: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const slideEl = e.currentTarget.closest(".swiper-slide");
    const isActiveSlide = slideEl?.classList.contains("swiper-slide-active");

    // If the user clicked a tilted side card, Swiper's slideToClickedSlide smoothly centers it first
    if (!isActiveSlide) {
      return;
    }

    if (playingSlideIndex !== slideIndex) {
      setPlayingSlideIndex(slideIndex);
      setIsPaused(false);
      setIsVideoLoading(true);
    } else {
      if (activeVideoRef.current) {
        if (activeVideoRef.current.paused) {
          activeVideoRef.current.play().catch(() => {});
          setIsPaused(false);
        } else {
          activeVideoRef.current.pause();
          setIsPaused(true);
        }
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Stop playing video when the section leaves the viewport
        if (!entry.isIntersecting) {
          setPlayingSlideIndex(null);
          setIsPaused(false);
          setIsVideoLoading(false);
        }
      },
      { threshold: 0 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

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

  // Sort videos by ID
  const sortedWorks = [...portfolioVideos].sort((a, b) => a.id - b.id);

  // Duplicate to 18 slides so wide screens showing 7 cards in 3D Coverflow never run out of offscreen buffer slides on the sides
  const works =
    sortedWorks.length > 0 && sortedWorks.length < 16
      ? Array.from({ length: Math.ceil(16 / sortedWorks.length) }).flatMap(
          () => sortedWorks
        )
      : sortedWorks;

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative pt-7 sm:pt-8 md:pt-10 pb-8 sm:pb-9 md:pb-11 flex flex-col items-center overflow-hidden scroll-mt-20"
    >
      {/* Sleek Architectural Arch Background with Symmetrical Parabolic Curve & Curved Rim Glow */}
      <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden flex justify-center z-0 pointer-events-none transform-gpu">
        <div
          className="w-[146%] sm:w-[134%] lg:w-[126%] shrink-0 h-full bg-[#071228] overflow-hidden relative"
          style={{
            borderTopLeftRadius: "50% clamp(38px, 4.8vw, 66px)",
            borderTopRightRadius: "50% clamp(38px, 4.8vw, 66px)",
            borderBottomLeftRadius: "50% clamp(38px, 4.8vw, 66px)",
            borderBottomRightRadius: "50% clamp(38px, 4.8vw, 66px)",
          }}
        >
          <ShaderBackground className="absolute inset-0 w-full h-full object-cover opacity-90" />
          {/* Subtle Depth Gradients for Eye-Friendly Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071228]/45 via-transparent to-[#071228]/85 pointer-events-none" />

          {/* High-Performance 60FPS Electric Tech Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              backgroundPosition: "center center",
              maskImage:
                "radial-gradient(ellipse 75% 72% at 50% 50%, black 35%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 72% at 50% 50%, black 35%, transparent 90%)",
            }}
          />

          {/* Curved Specular Rim Highlight that follows the exact contour of the top and bottom arch */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              boxShadow:
                "inset 0 1.5px 0 0 rgba(96, 165, 250, 0.55), inset 0 14px 28px -10px rgba(37, 99, 235, 0.38), inset 0 -1.5px 0 0 rgba(96, 165, 250, 0.32), inset 0 -14px 28px -10px rgba(37, 99, 235, 0.22)",
              maskImage:
                "linear-gradient(to right, transparent 8%, black 24%, black 76%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 8%, black 24%, black 76%, transparent 92%)",
            }}
          />
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1240px] mx-auto py-1.5 sm:py-2 min-h-[355px] sm:min-h-[395px] md:min-h-[436px] flex items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "120px 0px" }}
      >
        <motion.div variants={itemVariants} className="w-full">
          {/* Portfolio Coverflow Carousel (dir="ltr" ensures proper 3D physics in RTL pages) */}
          <div
            dir="ltr"
            className="relative w-full lg:[mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]"
          >
            {isMounted && works.length > 0 && (
              <>
                {/* Top Minimalist 2-Button Controls (Tightly framing the compacted center card shoulders) */}
                <div className="absolute -top-2.5 sm:-top-3.5 md:-top-4 inset-x-0 max-w-[310px] sm:max-w-[365px] md:max-w-[410px] mx-auto hidden sm:flex items-center justify-between px-3 sm:px-4 z-30 pointer-events-none select-none">
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="pointer-events-auto group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B1B3D]/85 hover:bg-[#132D63] active:scale-92 border border-white/25 hover:border-blue-400/80 text-white flex items-center justify-center transition-[background-color,border-color,transform,box-shadow] duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer"
                    aria-label="السابق"
                  >
                    <ChevronLeft
                      className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white transition-transform duration-200 group-hover:-translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="pointer-events-auto group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B1B3D]/85 hover:bg-[#132D63] active:scale-92 border border-white/25 hover:border-blue-400/80 text-white flex items-center justify-center transition-[background-color,border-color,transform,box-shadow] duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer"
                    aria-label="التالي"
                  >
                    <ChevronRight
                      className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  speed={460}
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  loop={true}
                  slideToClickedSlide={true}
                  watchSlidesProgress={true}
                  coverflowEffect={{
                    rotate: 8,
                    stretch: 22,
                    depth: 135,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow]}
                  className="w-full pt-1 pb-1 [touch-action:pan-y]"
                  threshold={6}
                  touchAngle={42}
                  resistanceRatio={0.85}
                  preventClicks={true}
                  preventClicksPropagation={true}
                  touchStartPreventDefault={false}
                  onSlideChangeTransitionStart={() => {
                    setPlayingSlideIndex(null);
                    setIsPaused(false);
                    setIsVideoLoading(false);
                  }}
                >
                  {works.map((work, index) => {
                    const isPlaying = playingSlideIndex === index;

                    return (
                      <SwiperSlide
                        key={`${work.id}-${index}`}
                        className="!w-[196px] sm:!w-[216px] md:!w-[232px] lg:!w-[242px]"
                      >
                        <div
                          className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_30px_rgba(7,18,40,0.5)] [.swiper-slide-active_&]:shadow-[0_16px_42px_rgba(37,99,235,0.3)] mx-auto w-full h-full bg-[#0B1B3D] transition-shadow duration-300 transform-gpu [backface-visibility:hidden]"
                          onClick={(e) => handleCardClick(index, e)}
                        >
                          {/* Crisp Top-Layer Border Ring so image/video layers never cover up the rounded-3xl border */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-3xl border border-white/15 [.swiper-slide-active_&]:border-blue-400/55 z-30 transition-colors duration-300"
                          />

                          {/* Persistent Base Thumbnail: Card never flashes black while buffering */}
                          {work.thumbnailUrl ? (
                            <img
                              src={work.thumbnailUrl}
                              alt={work.title}
                              loading="eager"
                              decoding="async"
                              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out sm:group-hover:scale-105 pointer-events-none"
                            />
                          ) : (
                            <video
                              src={`${work.videoUrl}#t=0.1`}
                              preload="metadata"
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out sm:group-hover:scale-105 bg-black pointer-events-none"
                            />
                          )}

                          {/* Active Video Player with smooth cross-fade */}
                          {isPlaying && (
                            <>
                              <HlsVideo
                                ref={activeVideoRef}
                                src={work.videoUrl}
                                autoPlay={true}
                                loop={true}
                                muted={isMuted}
                                playsInline={true}
                                onLoadingChange={setIsVideoLoading}
                                className={`absolute inset-0 w-full h-full object-cover rounded-3xl z-20 bg-black pointer-events-none transition-opacity duration-300 ${
                                  isVideoLoading ? "opacity-0" : "opacity-100"
                                }`}
                              />

                              {/* Top Right Mute / Unmute Button */}
                              <button
                                type="button"
                                onClick={toggleMute}
                                className="absolute top-2.5 right-2.5 z-30 p-2 rounded-full bg-black/65 hover:bg-black/80 border border-white/20 text-white transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center pointer-events-auto"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                              >
                                {isMuted ? (
                                  <VolumeX size={15} className="text-white/90" />
                                ) : (
                                  <Volume2
                                    size={15}
                                    className="text-cyan-400"
                                  />
                                )}
                              </button>

                              {/* Slim Progress Bar in Cyan */}
                              <VideoProgressBar videoRef={activeVideoRef} />
                            </>
                          )}

                          {/* Loading Spinner (appears when buffering) */}
                          {isPlaying && isVideoLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                              <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center shadow-2xl">
                                <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-brand-electric animate-spin" />
                              </div>
                            </div>
                          )}

                          {/* Resume Play Icon (if paused by user) */}
                          {isPlaying && isPaused && !isVideoLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                              <div className="w-12 h-12 rounded-full bg-black/55 border border-white/40 flex items-center justify-center shadow-lg">
                                <Play
                                  size={20}
                                  className="text-white fill-white ml-0.5"
                                />
                              </div>
                            </div>
                          )}

                          {/* Idle Overlays (shown only when video is not active) */}
                          {!isPlaying && (
                            <>
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#071228]/85 via-black/15 to-transparent pointer-events-none" />

                              {/* Center Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0B1B3D]/65 border border-white/45 flex items-center justify-center transition-[transform,background-color] duration-300 sm:group-hover:scale-110 sm:group-hover:bg-brand-electric/80 relative z-10 shadow-lg">
                                  <Play
                                    size={20}
                                    className="text-white fill-white ml-0.5 relative z-10"
                                  />
                                </div>
                              </div>

                              {/* Bottom Info Card */}
                              <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 z-10 pointer-events-none">
                                <div className="rounded-2xl bg-white/95 border border-white/80 px-3 py-2 flex items-center justify-between shadow-lg">
                                  <span className="text-[11px] sm:text-xs font-bold text-brand-navy truncate pr-1.5">
                                    {work.title}
                                  </span>
                                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-electric/[0.08] border border-brand-electric/15 shrink-0">
                                    <Eye size={12} className="text-brand-electric" />
                                    <span className="text-[10px] sm:text-[11px] font-bold text-brand-electric tabular-nums">
                                      {work.views}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SelectedWorks;




