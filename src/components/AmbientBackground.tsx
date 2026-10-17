"use client";

import React from "react";

/**
 * AmbientBackground
 * 
 * Provides an ultra-clean, minimal Off-White (#FAFBFD) canvas with:
 * 1. Luminous Ambient Blur Glows (Bleu Électrique #2563EB & Bleu Nuit #0B1B3D)
 * 2. Radial vignette and atmospheric depth
 * 3. Modern architectural micro-grid pattern for crisp 2026 aesthetics
 * 4. 100% full-screen coverage edge-to-edge (fixed viewport)
 * 
 * Designed to interact seamlessly with Glassmorphic cards (.glass-card, .glass-panel).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Clean Off-White Base Canvas (#FAFBFD) */}
      <div className="absolute inset-0 bg-[#FAFBFD]" />

      {/* 2. Top-Right Ambient Glow: Luminous Electric Blue Aura */}
      <div 
        className="absolute -top-[15%] -right-[10%] w-[600px] sm:w-[850px] lg:w-[1050px] h-[550px] sm:h-[750px] lg:h-[900px] rounded-full bg-gradient-to-br from-blue-500/22 via-brand-electric/15 to-transparent blur-[120px] sm:blur-[160px] transform-gpu"
      />

      {/* 3. Top-Left / Student Backdrop Ambient Glow: Soft Azure & Sky Aura */}
      <div 
        className="absolute top-[12%] -left-[15%] w-[550px] sm:w-[750px] lg:w-[950px] h-[550px] sm:h-[800px] lg:h-[950px] rounded-full bg-gradient-to-tr from-brand-electric/18 via-sky-400/12 to-transparent blur-[130px] sm:blur-[170px] transform-gpu"
      />

      {/* 4. Bottom-Center Ambient Glow: Deep Royal Navy Depth */}
      <div 
        className="absolute -bottom-[20%] left-[10%] sm:left-[25%] w-[650px] sm:w-[900px] lg:w-[1100px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-t from-brand-navy/[0.09] via-brand-electric/[0.05] to-transparent blur-[140px] sm:blur-[180px] transform-gpu"
      />

      {/* 5. Center Atmospheric Diffuse Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(37,99,235,0.08),transparent_75%)]" />

      {/* 6. Precision Micro-Grid Pattern with Radial Mask */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#0b1b3d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_65%,transparent_100%)]" 
      />

      {/* 7. Subtle Top Horizon Linear Gradient Sheen */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
    </div>
  );
}
