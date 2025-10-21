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
          gold: "#D4AF37",
          bronze: "#CD7F32",
          stone: "#8B8680",
          parchment: "#F0E5D8",
          ink: "#2C2416",
          forest: "#2D5016",
          blood: "#8B0000",
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
