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
          // Royal Fantasy Palette
          gold: "#D4AF37", // Ancient gold
          goldLight: "#F4E5B8", // Light gold shimmer
          goldDark: "#9A7B2F", // Deep gold

          purple: "#6B46C1", // Royal purple
          purpleLight: "#9F7AEA", // Light mystical purple
          purpleDark: "#44337A", // Deep mystical purple

          teal: "#2D7A8E", // Mystical teal
          tealLight: "#4FB3C8", // Light magical teal
          tealDark: "#1A5566", // Deep ocean teal

          // Parchment & Neutrals
          parchment: "#F5E6D3", // Old paper
          parchmentDark: "#D4C4A8", // Aged parchment
          scroll: "#EAD8C0", // Scroll color

          dark: "#1A1625", // Deep mystical night
          darker: "#0D0B14", // Deepest void
          light: "#FFF8F0", // Warm light

          // Magic Effects
          magic: {
            blue: "#4A90E2", // Arcane blue
            violet: "#9B59B6", // Spell violet
            gold: "#FFD700", // Divine gold
            emerald: "#50C878", // Nature emerald
          },

          // Gradient for mystical effects
          gradient: {
            from: "#D4AF37", // Gold
            via: "#6B46C1", // Purple
            to: "#2D7A8E", // Teal
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cinzel", "serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      backgroundImage: {
        'parchment-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
