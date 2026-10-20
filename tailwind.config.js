/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
          "electric-light": "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        calligraphy: ["var(--font-calligraphy)", "serif"],
      },
      spacing: {
        13: "3.25rem",
      },
      transitionDuration: {
        250: "250ms",
      },
      scale: {
        92: "0.92",
        97: "0.97",
        98: "0.98",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(11, 27, 61, 0.04)",
        xs: "0 1px 3px 0 rgba(11, 27, 61, 0.06), 0 1px 2px -1px rgba(11, 27, 61, 0.04)",
        "glow-blue": "0 0 50px -10px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [],
};


