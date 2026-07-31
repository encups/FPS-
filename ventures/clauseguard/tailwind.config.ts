import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0F14",
          panel: "#121821",
          border: "#1F2A37",
          accent: "#3DD68C",
          warn: "#F0B429",
          danger: "#EF4444",
          text: "#E5EDF5",
          muted: "#8A97A6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
