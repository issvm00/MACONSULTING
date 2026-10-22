"use client";

import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import Hls from "hls.js";

export interface HlsAudioHandle {
  play: (src: string, fallbackDuration?: number, initialTime?: number) => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
}

interface HlsAudioProps {
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onBufferingChange?: (isBuffering: boolean) => void;
}

export const HlsAudio = forwardRef<HlsAudioHandle, HlsAudioProps>(
  ({ onTimeUpdate, onEnded, onPlayStateChange, onBufferingChange }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const simTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    // Monotonic session counter to cancel stale async play() promises when user swipes or stops
    const sessionIdRef = useRef<number>(0);

    // Store callbacks in a ref so parent re-renders never re-trigger effect cleanup or interrupt playback
    const callbacksRef = useRef({
      onTimeUpdate,
      onEnded,
      onPlayStateChange,
      onBufferingChange,
    });

    useEffect(() => {
      callbacksRef.current = {
        onTimeUpdate,
        onEnded,
        onPlayStateChange,
        onBufferingChange,
      };
    }, [onTimeUpdate, onEnded, onPlayStateChange, onBufferingChange]);

    const simStateRef = useRef<{
      active: boolean;
      currentTime: number;
      duration: number;
      currentSrc: string;
    }>({
      active: false,
      currentTime: 0,
      duration: 30,
      currentSrc: "",
    });
    const currentSrcRef = useRef<string>("");

    const clearSimTimer = useCallback(() => {
      if (simTimerRef.current) {
        clearInterval(simTimerRef.current);
        simTimerRef.current = null;
      }
    }, []);

    const startSimulatedPlayback = useCallback(
      (src: string, fallbackDuration = 30, sessionId?: number) => {
        if (
          sessionId !== undefined &&
          sessionId !== sessionIdRef.current
        ) {
          return;
        }

        clearSimTimer();
        const isResumingSame =
          simStateRef.current.active && simStateRef.current.currentSrc === src;

        if (!isResumingSame) {
          simStateRef.current = {
            active: true,
            currentTime: 0,
            duration: fallbackDuration,
            currentSrc: src,
          };
        }

        callbacksRef.current.onBufferingChange?.(false);
        callbacksRef.current.onPlayStateChange?.(true);
        callbacksRef.current.onTimeUpdate?.(
          simStateRef.current.currentTime,
          simStateRef.current.duration
        );

        simTimerRef.current = setInterval(() => {
          simStateRef.current.currentTime += 0.1;
          if (simStateRef.current.currentTime >= simStateRef.current.duration) {
            clearSimTimer();
            simStateRef.current.active = false;
            simStateRef.current.currentTime = 0;
            callbacksRef.current.onTimeUpdate?.(
              0,
              simStateRef.current.duration
            );
            callbacksRef.current.onBufferingChange?.(false);
            callbacksRef.current.onPlayStateChange?.(false);
            callbacksRef.current.onEnded?.();
          } else {
            callbacksRef.current.onTimeUpdate?.(
              simStateRef.current.currentTime,
              simStateRef.current.duration
            );
          }
        }, 100);
      },
      [clearSimTimer]
    );

    // Completely stops playback AND aborts any active background HTTP download/buffering
    const stop = useCallback(() => {
      sessionIdRef.current += 1;
      clearSimTimer();
      simStateRef.current.active = false;
      simStateRef.current.currentTime = 0;
      simStateRef.current.currentSrc = "";
      currentSrcRef.current = "";

      if (hlsRef.current) {
        try {
          hlsRef.current.stopLoad();
          hlsRef.current.detachMedia();
        } catch {
          // ignore cleanup errors
        }
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        if (audio.hasAttribute("src") || audio.src) {
          audio.removeAttribute("src");
          // Invoking load() with no src attribute immediately aborts browser network fetching
          audio.load();
        }
      }

      callbacksRef.current.onBufferingChange?.(false);
      callbacksRef.current.onPlayStateChange?.(false);
      callbacksRef.current.onTimeUpdate?.(0, 0);
    }, [clearSimTimer]);

    const pause = useCallback(() => {
      sessionIdRef.current += 1;
      if (simStateRef.current.active) {
        clearSimTimer();
        callbacksRef.current.onBufferingChange?.(false);
        callbacksRef.current.onPlayStateChange?.(false);
        return;
      }
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
      callbacksRef.current.onBufferingChange?.(false);
      callbacksRef.current.onPlayStateChange?.(false);
    }, [clearSimTimer]);

    const seek = useCallback((time: number) => {
      if (simStateRef.current.active) {
        simStateRef.current.currentTime = Math.max(
          0,
          Math.min(time, simStateRef.current.duration)
        );
        callbacksRef.current.onTimeUpdate?.(
          simStateRef.current.currentTime,
          simStateRef.current.duration
        );
        return;
      }
      const audio = audioRef.current;
      if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
        if (audio.readyState < 3 && !audio.paused) {
          callbacksRef.current.onBufferingChange?.(true);
        }
        audio.currentTime = Math.max(0, Math.min(time, audio.duration));
        callbacksRef.current.onTimeUpdate?.(audio.currentTime, audio.duration);
      }
    }, []);

    const play = useCallback(
      (src: string, fallbackDuration = 30, initialTime?: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        const sessionId = ++sessionIdRef.current;
        const encodedSrc = encodeURI(src);

        // If already in fallback simulation for this src and paused, resume simulation
        if (
          simStateRef.current.active &&
          simStateRef.current.currentSrc === encodedSrc
        ) {
          if (initialTime !== undefined && initialTime >= 0) {
            simStateRef.current.currentTime = Math.min(
              initialTime,
              simStateRef.current.duration
            );
          }
          startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
          return;
        }

        // If same real audio is already loaded and paused, resume synchronously
        if (
          currentSrcRef.current === encodedSrc &&
          audio.hasAttribute("src") &&
          audio.paused &&
          !simStateRef.current.active
        ) {
          if (audio.readyState < 3) {
            callbacksRef.current.onBufferingChange?.(true);
          }
          if (
            initialTime !== undefined &&
            initialTime >= 0 &&
            Number.isFinite(audio.duration)
          ) {
            audio.currentTime = Math.min(initialTime, audio.duration);
          }
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (sessionId !== sessionIdRef.current) return;
                callbacksRef.current.onBufferingChange?.(false);
                callbacksRef.current.onPlayStateChange?.(true);
              })
              .catch((err: unknown) => {
                if (sessionId !== sessionIdRef.current) return;
                if (err instanceof DOMException && err.name === "AbortError") {
                  return;
                }
                startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
              });
          }
          return;
        }

        // Cleanup any previous instance before starting new source
        clearSimTimer();
        simStateRef.current.active = false;
        if (hlsRef.current) {
          try {
            hlsRef.current.stopLoad();
            hlsRef.current.detachMedia();
          } catch {
            // ignore
          }
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        currentSrcRef.current = encodedSrc;
        // Immediately signal buffering state so slow-network users see instant feedback on tap
        callbacksRef.current.onBufferingChange?.(true);
        callbacksRef.current.onPlayStateChange?.(true);

        const isHls = encodedSrc.toLowerCase().endsWith(".m3u8");

        if (isHls) {
          if (Hls.isSupported()) {
            const hls = new Hls({
              maxMaxBufferLength: 10,
              maxBufferSize: 10 * 1024 * 1024, // 10MB limit
            });
            hlsRef.current = hls;
            hls.loadSource(encodedSrc);
            hls.attachMedia(audio);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (sessionId !== sessionIdRef.current) return;
              if (initialTime !== undefined && initialTime > 0) {
                audio.currentTime = initialTime;
              }
              audio
                .play()
                .then(() => {
                  if (sessionId !== sessionIdRef.current) return;
                  callbacksRef.current.onBufferingChange?.(false);
                  callbacksRef.current.onPlayStateChange?.(true);
                })
                .catch((err: unknown) => {
                  if (sessionId !== sessionIdRef.current) return;
                  if (
                    err instanceof DOMException &&
                    err.name === "AbortError"
                  ) {
                    return;
                  }
                  startSimulatedPlayback(
                    encodedSrc,
                    fallbackDuration,
                    sessionId
                  );
                });
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (sessionId !== sessionIdRef.current) return;
              if (data.fatal) {
                startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
              }
            });
          } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
            audio.src = encodedSrc;
            if (initialTime !== undefined && initialTime > 0) {
              audio.currentTime = initialTime;
            }
            audio
              .play()
              .then(() => {
                if (sessionId !== sessionIdRef.current) return;
                callbacksRef.current.onBufferingChange?.(false);
                callbacksRef.current.onPlayStateChange?.(true);
              })
              .catch((err: unknown) => {
                if (sessionId !== sessionIdRef.current) return;
                if (err instanceof DOMException && err.name === "AbortError") {
                  return;
                }
                startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
              });
          } else {
            startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
          }
        } else {
          // Standard MP3/OGG Audio file: synchronous assignment + play() for iOS Safari compatibility
          let resolvedSrc = encodedSrc;
          // Safari on iOS versions without OGG container support
          if (
            encodedSrc.toLowerCase().endsWith(".ogg") &&
            audio.canPlayType("audio/ogg") === ""
          ) {
            resolvedSrc = encodedSrc.replace(/\.ogg$/i, ".mp3");
          }

          audio.src = resolvedSrc;
          if (initialTime !== undefined && initialTime > 0) {
            const setInitialSeek = () => {
              if (
                sessionId === sessionIdRef.current &&
                Number.isFinite(audio.duration)
              ) {
                audio.currentTime = Math.min(initialTime, audio.duration);
              }
              audio.removeEventListener("loadedmetadata", setInitialSeek);
            };
            audio.addEventListener("loadedmetadata", setInitialSeek, {
              once: true,
            });
          }
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (sessionId !== sessionIdRef.current) return;
                callbacksRef.current.onBufferingChange?.(false);
                callbacksRef.current.onPlayStateChange?.(true);
              })
              .catch((err: unknown) => {
                if (sessionId !== sessionIdRef.current) return;
                if (err instanceof DOMException && err.name === "AbortError") {
                  return;
                }
                // If .ogg playback failed to decode, attempt .mp3 fallback before simulation
                if (
                  resolvedSrc.toLowerCase().endsWith(".ogg") &&
                  resolvedSrc === encodedSrc
                ) {
                  const fallbackMp3 = encodedSrc.replace(/\.ogg$/i, ".mp3");
                  audio.src = fallbackMp3;
                  audio
                    .play()
                    .then(() => {
                      if (sessionId !== sessionIdRef.current) return;
                      callbacksRef.current.onBufferingChange?.(false);
                      callbacksRef.current.onPlayStateChange?.(true);
                    })
                    .catch(() => {
                      startSimulatedPlayback(
                        encodedSrc,
                        fallbackDuration,
                        sessionId
                      );
                    });
                  return;
                }
                startSimulatedPlayback(encodedSrc, fallbackDuration, sessionId);
              });
          }
        }
      },
      [clearSimTimer, startSimulatedPlayback]
    );

    useImperativeHandle(
      ref,
      () => ({
        play,
        pause,
        stop,
        seek,
      }),
      [play, pause, stop, seek]
    );

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleTimeUpdate = () => {
        if (!simStateRef.current.active && audio.duration > 0) {
          if (!audio.paused && audio.readyState >= 3) {
            callbacksRef.current.onBufferingChange?.(false);
          }
          callbacksRef.current.onTimeUpdate?.(
            audio.currentTime,
            audio.duration
          );
        }
      };

      const handleLoadedMetadata = () => {
        if (!simStateRef.current.active && audio.duration > 0) {
          callbacksRef.current.onTimeUpdate?.(
            audio.currentTime,
            audio.duration
          );
        }
      };

      const handleWaiting = () => {
        if (!simStateRef.current.active && !audio.paused) {
          callbacksRef.current.onBufferingChange?.(true);
        }
      };

      const handlePlayingOrCanPlay = () => {
        if (!simStateRef.current.active && !audio.paused) {
          callbacksRef.current.onBufferingChange?.(false);
        }
      };

      const handleEnded = () => {
        if (!simStateRef.current.active) {
          callbacksRef.current.onBufferingChange?.(false);
          callbacksRef.current.onPlayStateChange?.(false);
          callbacksRef.current.onTimeUpdate?.(0, audio.duration || 0);
          callbacksRef.current.onEnded?.();
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate, { passive: true });
      audio.addEventListener("loadedmetadata", handleLoadedMetadata, {
        passive: true,
      });
      audio.addEventListener("waiting", handleWaiting, { passive: true });
      audio.addEventListener("stalled", handleWaiting, { passive: true });
      audio.addEventListener("playing", handlePlayingOrCanPlay, {
        passive: true,
      });
      audio.addEventListener("canplay", handlePlayingOrCanPlay, {
        passive: true,
      });
      audio.addEventListener("ended", handleEnded, { passive: true });

      return () => {
        sessionIdRef.current += 1;
        clearSimTimer();
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("stalled", handleWaiting);
        audio.removeEventListener("playing", handlePlayingOrCanPlay);
        audio.removeEventListener("canplay", handlePlayingOrCanPlay);
        audio.removeEventListener("ended", handleEnded);
        if (hlsRef.current) {
          try {
            hlsRef.current.stopLoad();
            hlsRef.current.detachMedia();
          } catch {
            // ignore
          }
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      };
    }, [clearSimTimer]);

    return <audio ref={audioRef} style={{ display: "none" }} preload="none" />;
  }
);

HlsAudio.displayName = "HlsAudio";
