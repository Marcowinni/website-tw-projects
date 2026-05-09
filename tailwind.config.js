/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // TW brand — extracted from logo
        navy: {
          DEFAULT: "#1B3A6B",
          50: "#F2F5FA",
          100: "#E1E8F2",
          200: "#B6C4DD",
          300: "#8AA0C7",
          400: "#5876A8",
          500: "#1B3A6B",
          600: "#16305A",
          700: "#112648",
          800: "#0C1B33",
          900: "#0F1B2D",
        },
        ink: {
          DEFAULT: "#0F1B2D",
          soft: "#1A2538",
        },
        cloud: {
          DEFAULT: "#F5F7FA",
          warm: "#FAFAF7",
          deep: "#EFF2F6",
        },
        slate2: {
          DEFAULT: "#6B7884",
          light: "#8A93A0",
          dim: "#A8B0BA",
        },
        line: {
          DEFAULT: "#E3E6EB",
          soft: "#EDEFF3",
          strong: "#D0D5DC",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // editorial scale
        "xs": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        "sm": ["0.875rem", { lineHeight: "1.5" }],
        "base": ["1rem", { lineHeight: "1.6" }],
        "lg": ["1.125rem", { lineHeight: "1.55" }],
        "xl": ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "4xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "5xl": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "6xl": ["4rem", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "7xl": ["5rem", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display": ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3.5rem, 7.5vw, 7rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        "eyebrow": "0.16em",
      },
      spacing: {
        "section-y": "clamp(4rem, 9vw, 9rem)",
        "section-y-sm": "clamp(3rem, 6vw, 6rem)",
      },
      maxWidth: {
        "content": "1320px",
        "prose-lg": "62ch",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(15, 27, 45, 0.04), 0 4px 12px rgba(15, 27, 45, 0.06)",
        "lift": "0 4px 14px rgba(15, 27, 45, 0.08), 0 16px 32px rgba(15, 27, 45, 0.06)",
        "hover": "0 12px 32px rgba(27, 58, 107, 0.18)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "marquee": "marquee 38s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 16px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
}
