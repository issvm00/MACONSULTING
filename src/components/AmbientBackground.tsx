"use client";

import React from "react";

/**
 * AmbientBackground
 * 
 * Ultra-lightweight, zero-blur GPU-composited Off-White (#FAFBFD) canvas.
 * Uses pure radial-gradient lighting instead of expensive CSS Gaussian filter:blur()
 * so mobile and desktop scrolling runs at locked 60fps/120fps.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transform-gpu"
      style={{ contain: "strict" }}
    >
      {/* 1. Single-Layer Multi-Radial Atmospheric Canvas (Zero Gaussian Blur Shader Cost) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FAFBFD",
          backgroundImage: `
            radial-gradient(circle at 90% 8%, rgba(37, 99, 235, 0.14) 0%, rgba(37, 99, 235, 0.05) 28%, transparent 55%),
            radial-gradient(circle at 8% 32%, rgba(56, 189, 248, 0.12) 0%, rgba(37, 99, 235, 0.05) 30%, transparent 58%),
            radial-gradient(circle at 50% 95%, rgba(11, 27, 61, 0.06) 0%, rgba(37, 99, 235, 0.03) 32%, transparent 62%),
            radial-gradient(ellipse 80% 50% at 50% 18%, rgba(37, 99, 235, 0.06) 0%, transparent 70%)
          `,
        }}
      />

      {/* 2. Precision Micro-Grid Pattern with Radial Mask */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#0b1b3d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_65%,transparent_100%)]"
      />

      {/* 3. Subtle Top Horizon Linear Gradient Sheen */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-white/75 via-white/25 to-transparent" />
    </div>
  );
}
