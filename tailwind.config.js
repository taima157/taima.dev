/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)"],
        mono: ["var(--font-sans-code)"],
      },

      colors: {
        background: "#0c0c0c",
        foreground: "#e5e7eb",
      },

      animation: {
        pulseSlow: "pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
