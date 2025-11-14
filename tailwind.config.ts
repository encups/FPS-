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
          // Primary Fantasy Colors
          gold: "#FFD700", // Treasure gold
          bronze: "#CD7F32", // Armor/copper
          silver: "#C0C0C0", // Silver items

          // Dungeon & Castle
          stone: "#6B7280", // Castle stone walls
          dungeon: "#1F2937", // Dark dungeon depths
          ink: "#0F172A", // Darkest black-blue
          parchment: "#F5E6D3", // Aged paper

          // Elemental Magic
          fire: "#FF6B35", // Torch/fire magic
          ice: "#3B82F6", // Ice/mana blue
          poison: "#22C55E", // Poison/goblin green
          arcane: "#9333EA", // Purple mystical magic
          lightning: "#FBBF24", // Lightning yellow

          // Combat & Danger
          blood: "#DC2626", // Blood red
          danger: "#EF4444", // Danger/warning

          // Nature & Forest
          forest: "#166534", // Deep forest
          moss: "#84CC16", // Moss/nature

          // NPCs & Creatures
          goblin: "#86EFAC", // Goblin skin
          dragon: "#7C2D12", // Dragon scales
          undead: "#A78BFA", // Undead purple
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
