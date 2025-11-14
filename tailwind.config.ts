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
        medieval: {
          gold: "#4ade80", // Bright green (was gold)
          bronze: "#22c55e", // Medium green (was bronze)
          stone: "#8B8680",
          parchment: "#F0E5D8",
          ink: "#1a2e05", // Dark forest green (was brown)
          forest: "#2D5016", // Deep forest green
          blood: "#8B0000",
          emerald: "#10b981", // Additional green
          lime: "#84cc16", // Light green accent
        },
      },
      fontFamily: {
        medieval: ["Press Start 2P", "cursive"],
        pixel: ["VT323", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
