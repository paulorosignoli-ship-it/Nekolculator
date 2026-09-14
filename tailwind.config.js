/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rounded: ["Quicksand", "Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        peach: "#FDEED9",
        apricot: "#F8D8B8",
        cream: "#FFF9F2",
        cocoa: "#2D1B14",
        coral: "#E25B45",
      },
      borderRadius: {
        cute: "28px",
      },
      boxShadow: {
        soft: "0 12px 30px -10px rgba(45, 27, 20, 0.25)",
        button: "0 4px 0 0 rgba(45, 27, 20, 0.15)",
      },
      keyframes: {
        "paw-swipe": {
          "0%": { transform: "translateX(-120%) rotate(-8deg)", opacity: "0" },
          "12%": { opacity: "1" },
          "45%": { transform: "translateX(0%) rotate(4deg)", opacity: "1" },
          "60%": { transform: "translateX(4%) rotate(0deg)" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateX(-120%) rotate(-8deg)", opacity: "0" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "purr-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        blink: {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
      },
      animation: {
        "paw-swipe": "paw-swipe 1.4s ease-in-out forwards",
        "pop-in": "pop-in 0.18s ease-out",
        "purr-bounce": "purr-bounce 0.6s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
