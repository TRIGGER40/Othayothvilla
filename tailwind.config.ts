import type { Config } from "tailwindcss";

/**
 * Othayoth Villa design system.
 * Warm neutral base (linen / sand / stone) with deep-palm greens,
 * brass accents and a monsoon slate. Tuned for a calm, premium,
 * Kerala-rooted boutique feel.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral base
        linen: {
          50: "#FBF8F2",
          100: "#F6F1E7",
          200: "#EFE7D6",
          300: "#E3D6BE",
        },
        sand: {
          100: "#EEE3CE",
          200: "#E0CFB0",
          300: "#CDB48A",
          400: "#B8996A",
        },
        stone: {
          100: "#D8D2C6",
          200: "#B9B1A1",
          300: "#8C8577",
          400: "#5F5A50",
          500: "#403C35",
        },
        // Deep palm greens
        palm: {
          50: "#EAF0EC",
          100: "#C9D8CE",
          200: "#8FB09B",
          300: "#4F7A62",
          400: "#345C48",
          500: "#264536",
          600: "#1C3529",
          700: "#14261E",
        },
        // Brass accents
        brass: {
          100: "#EBD9B4",
          200: "#D8BE85",
          300: "#C6A15B",
          400: "#B08D57",
          500: "#8F6F3E",
        },
        // Monsoon slate/teal
        monsoon: {
          100: "#D5DEDD",
          200: "#9DB2B1",
          300: "#5E7C7B",
          400: "#3C5655",
        },
        ink: "#2B2723",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,39,35,0.04), 0 8px 24px rgba(43,39,35,0.06)",
        lift: "0 2px 6px rgba(43,39,35,0.06), 0 18px 48px rgba(43,39,35,0.10)",
        brass: "0 8px 30px rgba(176,141,87,0.18)",
      },
      letterSpacing: {
        widest: "0.24em",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "kenburns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1s ease both",
        kenburns: "kenburns 18s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
