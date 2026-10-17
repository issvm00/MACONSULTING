"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import Hls from "hls.js";

export interface HlsVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLVideoElement>) => void;
  onLoadingChange?: (loading: boolean) => void;
}

const HlsVideo = forwardRef<HTMLVideoElement, HlsVideoProps>(
  (
    {
      src,
      autoPlay = false,
      loop = false,
      muted = true,
      playsInline = true,
      className,
      onClick,
      onLoadingChange,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    const videoRef = (ref as React.RefObject<HTMLVideoElement | null>) || internalRef;

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      onLoadingChange?.(true);

      const handlePlaying = () => onLoadingChange?.(false);
      const handleWaiting = () => onLoadingChange?.(true);
      const handleCanPlay = () => onLoadingChange?.(false);
      const handlePause = () => onLoadingChange?.(false);

      video.addEventListener("playing", handlePlaying);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("pause", handlePause);

      let hls: Hls | null = null;
      const isHls = src?.endsWith(".m3u8");

      if (isHls) {
        if (Hls.isSupported()) {
          hls = new Hls({
            maxMaxBufferLength: 10,
            maxBufferSize: 10 * 1000 * 1000, // 10MB limit
          });

          hls.loadSource(src);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) {
              video.play().catch((err) => console.log("Auto-play prevented:", err));
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS for Safari / iOS
          video.src = src;
          video.addEventListener("loadedmetadata", () => {
            if (autoPlay) {
              video.play().catch((err) => console.log("Auto-play prevented:", err));
            }
          });
        }
      } else {
        // Standard MP4 fallback
        video.src = src;
        if (autoPlay) {
          video.play().catch((err) => console.log("Auto-play prevented:", err));
        }
      }

      // Aggressive Cleanup: Stops downloading immediately when unmounted or changed
      return () => {
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("pause", handlePause);

        if (hls) {
          hls.destroy();
          hls = null;
        }
        video.removeAttribute("src");
        video.load();
      };
    }, [src, autoPlay, onLoadingChange, videoRef]);

    // Keep muted state synced
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
      }
    }, [muted, videoRef]);

    return (
      <video
        ref={videoRef as React.Ref<HTMLVideoElement>}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className={className}
        onClick={onClick}
      />
    );
  }
);

HlsVideo.displayName = "HlsVideo";

export default HlsVideo;
