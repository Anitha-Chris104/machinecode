/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D244D",
        maroon: "#852E47",
        industrial: "#AA542B",
        ember: "#C2441C",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(194, 68, 28, 0.25)",
      },
    },
  },
  plugins: [],
};
