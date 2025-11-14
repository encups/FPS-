import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary Brand Colors (Modern with subtle fantasy)
          primary: "#6366F1", // Indigo - primary actions
          secondary: "#8B5CF6", // Purple - mystical/creative
          accent: "#F59E0B", // Amber - storytelling warmth

          // Neutral Modern Palette
          dark: "#0F172A", // Deep navy-black
          darker: "#020617", // Deepest
          light: "#F8FAFC", // Off-white
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
          },

          // Gradient Accents
          gradient: {
            from: "#6366F1",
            via: "#8B5CF6",
            to: "#EC4899",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
