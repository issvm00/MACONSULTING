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
      className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-28 flex flex-col items-center overflow-hidden scroll-mt-20"
    >
      {/* Arch Background with Royal Navy & Electric Blue Shader */}
      {/* Slightly wider arch (w-[128%] sm:w-[118%] lg:w-[112%]) + balanced top/bottom padding ensures side cards sit 100% inside the dark arch */}
      <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden flex justify-center z-0 pointer-events-none transform-gpu">
        <div
          className="w-[128%] sm:w-[118%] lg:w-[112%] shrink-0 h-full bg-[#071228] overflow-hidden relative"
          style={{
            borderTopLeftRadius: "50% 120px",
            borderTopRightRadius: "50% 120px",
            borderBottomLeftRadius: "50% 120px",
            borderBottomRightRadius: "50% 120px",
          }}
        >
          <ShaderBackground className="absolute inset-0 w-full h-full object-cover opacity-90" />
          {/* Subtle Depth Gradients for Eye-Friendly Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071228]/50 via-transparent to-[#071228]/85 pointer-events-none" />

          {/* High-Performance 60FPS Electric Tech Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.22) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.22) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 90% 80% at 50% 20%, black 45%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at 50% 20%, black 45%, transparent 95%)",
            }}
          >
            {/* Luminous Glowing Electric Horizon Beam Line */}
            <div className="absolute top-[64px] sm:top-[128px] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/65 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.75)]" />
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full mt-2 md:mt-4 py-8 min-h-[480px] sm:min-h-[550px] md:min-h-[620px] flex items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "120px 0px" }}
      >
        <motion.div variants={itemVariants} className="w-full">
          {/* Portfolio Coverflow Carousel (dir="ltr" ensures proper 3D physics in RTL pages) */}
          <div dir="ltr" className="relative w-full">
            {isMounted && works.length > 0 && (
              <>
                {/* Top Minimalist 2-Button Controls */}
                <div className="absolute -top-4 sm:-top-6 md:-top-8 inset-x-0 max-w-[420px] sm:max-w-[500px] md:max-w-[600px] mx-auto hidden sm:flex items-center justify-between px-3 sm:px-4 z-30 pointer-events-none select-none">
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="pointer-events-auto group relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-[#0B1B3D]/80 hover:bg-[#132D63] active:scale-92 border border-white/25 hover:border-blue-400/80 text-white flex items-center justify-center transition-[background-color,border-color,transform,box-shadow] duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer"
                    aria-label="السابق"
                  >
                    <ChevronLeft
                      className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white transition-transform duration-200 group-hover:-translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="pointer-events-auto group relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-[#0B1B3D]/80 hover:bg-[#132D63] active:scale-92 border border-white/25 hover:border-blue-400/80 text-white flex items-center justify-center transition-[background-color,border-color,transform,box-shadow] duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer"
                    aria-label="التالي"
                  >
                    <ChevronRight
                      className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  speed={480}
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  loop={true}
                  slideToClickedSlide={true}
                  watchSlidesProgress={true}
                  coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 180,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow]}
                  className="w-full pt-2 sm:pt-4 [touch-action:pan-y]"
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
                        className="!w-[260px] sm:!w-[300px] md:!w-[340px]"
                      >
                        <div
                          className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_32px_rgba(7,18,40,0.5)] [.swiper-slide-active_&]:shadow-[0_18px_48px_rgba(37,99,235,0.3)] mx-auto w-full h-full bg-[#0B1B3D] transition-shadow duration-300 transform-gpu [backface-visibility:hidden]"
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
                                className="absolute top-3.5 right-3.5 z-30 p-2.5 rounded-full bg-black/65 hover:bg-black/80 border border-white/20 text-white transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center pointer-events-auto"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                              >
                                {isMuted ? (
                                  <VolumeX size={17} className="text-white/90" />
                                ) : (
                                  <Volume2
                                    size={17}
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
                              <div className="w-16 h-16 rounded-full bg-black/70 border border-white/20 flex items-center justify-center shadow-2xl">
                                <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-brand-electric animate-spin" />
                              </div>
                            </div>
                          )}

                          {/* Resume Play Icon (if paused by user) */}
                          {isPlaying && isPaused && !isVideoLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                              <div className="w-16 h-16 rounded-full bg-black/55 border border-white/40 flex items-center justify-center shadow-lg">
                                <Play
                                  size={24}
                                  className="text-white fill-white ml-1"
                                />
                              </div>
                            </div>
                          )}

                          {/* Idle Overlays (shown only when video is not active) */}
                          {!isPlaying && (
                            <>
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#071228]/85 via-black/20 to-transparent pointer-events-none" />

                              {/* Center Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-[#0B1B3D]/65 border border-white/45 flex items-center justify-center transition-[transform,background-color] duration-300 sm:group-hover:scale-110 sm:group-hover:bg-brand-electric/80 relative z-10 shadow-lg">
                                  <Play
                                    size={24}
                                    className="text-white fill-white ml-1 relative z-10"
                                  />
                                </div>
                              </div>

                              {/* Bottom Info Card */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
                                <div className="rounded-2xl bg-white/95 border border-white/80 px-5 py-3 flex items-center justify-between shadow-lg">
                                  <span className="text-sm font-bold text-brand-navy truncate pr-2">
                                    {work.title}
                                  </span>
                                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-electric/[0.08] border border-brand-electric/15 shrink-0">
                                    <Eye size={14} className="text-brand-electric" />
                                    <span className="text-xs font-bold text-brand-electric tabular-nums">
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



