/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1B3D",
          "navy-dark": "#071228",
          "navy-light": "#132D63",
          electric: "#2563EB",
          "electric-hover": "#1D4ED8",
          "electric-light": "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        34: "8.5rem",
      },
      opacity: {
        85: "0.85",
        88: "0.88",
        92: "0.92",
        98: "0.98",
      },
      transitionDuration: {
        250: "250ms",
      },
      scale: {
        92: "0.92",
        97: "0.97",
        98: "0.98",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(11, 27, 61, 0.04)",
        xs: "0 1px 3px 0 rgba(11, 27, 61, 0.06), 0 1px 2px -1px rgba(11, 27, 61, 0.04)",
        "glow-blue": "0 0 50px -10px rgba(37, 99, 235, 0.25)",
        "card-modern": "0 20px 40px -15px rgba(11, 27, 61, 0.07)",
      },
    },
  },
  plugins: [],
};

