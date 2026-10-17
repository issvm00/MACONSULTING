"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { portfolioVideos } from "@/data/portfolio";
import HlsVideo from "@/components/ui/HlsVideo";

// High-performance slim progress bar (updates directly via DOM for 60/120fps without React re-renders)
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
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Desktop mouse drag tracking (zero-cost: only activates on mousedown)
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (activeVideoRef.current) {
      activeVideoRef.current.muted = nextMuted;
    }
  };

  const handleCardClick = (workId: number) => {
    // If user dragged with mouse on desktop, do not trigger play/pause
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }

    if (playingId !== workId) {
      setPlayingId(workId);
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

  // Hardware-accelerated smooth navigation scroll
  const scrollPrev = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector<HTMLElement>("[data-card]");
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector<HTMLElement>("[data-card]");
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  // Auto-pause playing video if section leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          setPlayingId(null);
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

  // Desktop drag handlers (no-op on mobile touch, leaving mobile 100% native compositor)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Auto pause active video when user scrolls carousel
  const handleCarouselScroll = useCallback(() => {
    if (playingId !== null) {
      // Pause active video when scrolling away to keep performance ultra-smooth
      setPlayingId(null);
      setIsPaused(false);
      setIsVideoLoading(false);
    }
  }, [playingId]);

  // Zero-jank GPU-accelerated motion (No heavy CSS blur)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // Sort videos by ID
  const sortedWorks = [...portfolioVideos].sort((a, b) => a.id - b.id);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative pt-4 md:pt-8 pb-16 md:pb-28 flex flex-col items-center overflow-hidden"
    >
      {/* Arch Background with Royal Navy & Electric Blue Shader */}
      <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden flex justify-center z-0 pointer-events-none">
        <div
          className="w-full h-full bg-[#071228] overflow-hidden relative"
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

          {/* High-Performance 60/120FPS Electric Tech Grid (Zero CPU / 100% GPU Layer) */}
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
        className="relative z-10 w-full mt-2 md:mt-4 py-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
      >
        <motion.div variants={itemVariants} className="w-full relative">
          {/* Top Minimalist 2-Button Controls (Frosted glass controls visible on tablet/desktop, hidden on mobile for clean touch-swipe UX) */}
          <div className="max-w-[420px] sm:max-w-[500px] md:max-w-[620px] mx-auto hidden sm:flex items-center justify-between px-4 mb-4 z-30 pointer-events-none select-none">
            <button
              type="button"
              onClick={scrollPrev}
              className="pointer-events-auto group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-white/[0.14] to-white/[0.04] hover:from-white/[0.22] hover:to-white/[0.08] active:scale-95 border border-white/25 hover:border-blue-400/80 backdrop-blur-xl text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.55),inset_0_1px_1px_rgba(255,255,255,0.5)] cursor-pointer"
              aria-label="السابق"
            >
              <span className="absolute inset-0 rounded-full bg-brand-electric/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <ChevronLeft
                className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white transition-all duration-200 group-hover:-translate-x-0.5 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                strokeWidth={2.5}
              />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="pointer-events-auto group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-white/[0.14] to-white/[0.04] hover:from-white/[0.22] hover:to-white/[0.08] active:scale-95 border border-white/25 hover:border-blue-400/80 backdrop-blur-xl text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.55),inset_0_1px_1px_rgba(255,255,255,0.5)] cursor-pointer"
              aria-label="التالي"
            >
              <span className="absolute inset-0 rounded-full bg-brand-electric/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <ChevronRight
                className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Native Hardware CSS Snap Carousel (Zero JS on Touch, 120 FPS Native GPU Compositing) */}
          <div
            ref={carouselRef}
            dir="ltr"
            onScroll={handleCarouselScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="flex gap-4 sm:gap-6 md:gap-7 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-5 sm:px-10 md:px-16 py-3 w-full items-center select-none cursor-grab active:cursor-grabbing transform-gpu"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollPadding: "0 20px",
            }}
          >
            {sortedWorks.map((work) => {
              const isPlaying = playingId === work.id;

              return (
                <div
                  key={work.id}
                  data-card
                  className="group relative flex-shrink-0 snap-center w-[250px] sm:w-[285px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_40px_rgba(7,18,40,0.55)] bg-[#0B1B3D] border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform-gpu hover:scale-[1.01]"
                  onClick={() => handleCardClick(work.id)}
                >
                  {/* Skeleton Pulse Loader (Zero Layout Shift & instant visual feedback) */}
                  <div className="absolute inset-0 bg-[#071228] animate-pulse pointer-events-none rounded-3xl" />

                  {/* Persistent Base Thumbnail: Card never flashes black while buffering */}
                  {work.thumbnailUrl ? (
                    <img
                      src={work.thumbnailUrl}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <video
                      src={`${work.videoUrl}#t=0.1`}
                      preload="none"
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-black pointer-events-none"
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
                        className={`absolute inset-0 w-full h-full object-cover rounded-3xl z-20 bg-black pointer-events-none transition-opacity duration-500 ${
                          isVideoLoading ? "opacity-0" : "opacity-100"
                        }`}
                      />

                      {/* Top Right Mute / Unmute Button (Reels / TikTok Style) */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="absolute top-3.5 right-3.5 z-30 p-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center pointer-events-auto"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? (
                          <VolumeX size={17} className="text-white/90" />
                        ) : (
                          <Volume2
                            size={17}
                            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                          />
                        )}
                      </button>

                      {/* Slim Progress Bar in Cyan (Reels / Modern Video Style) */}
                      <VideoProgressBar videoRef={activeVideoRef} />
                    </>
                  )}

                  {/* Luxury Glassmorphic Loading Spinner (appears when buffering) */}
                  {isPlaying && isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300">
                        <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-brand-electric animate-spin" />
                      </div>
                    </div>
                  )}

                  {/* Resume Play Icon (if paused by user) */}
                  {isPlaying && isPaused && !isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/30 border border-white/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.4)]">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071228]/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Center Play Button with pulse glow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/25 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-brand-electric/40 relative z-10 shadow-[0_0_15px_rgba(37,99,235,0)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                          <div className="absolute inset-0 rounded-full bg-brand-electric/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />
                          <Play
                            size={24}
                            className="text-white fill-white ml-1 relative z-10"
                          />
                        </div>
                      </div>

                      {/* Bottom Info Card */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
                        <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 px-5 py-3 flex items-center justify-between shadow-lg">
                          <span className="text-sm font-bold text-brand-navy truncate pr-2">
                            {work.title}
                          </span>
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-electric/[0.08] border border-brand-electric/15 shrink-0">
                            <Eye size={14} className="text-brand-electric" />
                            <span className="text-xs font-bold text-brand-electric">
                              {work.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SelectedWorks;
