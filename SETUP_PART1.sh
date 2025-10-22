# Frame Fables - Complete Setup Commands
# Copy and paste these commands into your terminal/command prompt

# STEP 1: Create project directory and navigate to it
mkdir frame-fables
cd frame-fables

# STEP 2: Initialize npm and create package.json
cat > package.json << 'EOF'
{
  "name": "frame-fables",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "openai": "^4.20.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
EOF

# STEP 3: Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# STEP 4: Create Tailwind config
cat > tailwind.config.ts << 'EOF'
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
EOF

# STEP 5: Create PostCSS config
cat > postcss.config.mjs << 'EOF'
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
EOF

# STEP 6: Create Next.js config
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
EOF

# STEP 7: Create .gitignore
cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# STEP 8: Create .env.example
cat > .env.example << 'EOF'
# OpenAI API Key for AI content generation
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API Key (alternative AI provider)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Stripe Keys for payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# STEP 9: Create ESLint config
cat > .eslintrc.json << 'EOF'
{
  "extends": "next/core-web-vitals"
}
EOF

# STEP 10: Create Vercel config
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
EOF

# STEP 11: Create app directory structure
mkdir -p app/api/generate
mkdir -p app/dashboard
mkdir -p app/login
mkdir -p app/signup
mkdir -p public

# STEP 12: Create app/globals.css
cat > app/globals.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --medieval-gold: 41 73 55%;
    --medieval-bronze: 30 62 50%;
    --medieval-stone: 40 7 54%;
    --medieval-parchment: 40 43 94%;
    --medieval-ink: 34 29 14%;
  }

  body {
    @apply bg-medieval-ink text-medieval-parchment;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
}

@layer utilities {
  .pixel-border {
    border: 4px solid;
    border-image: repeating-linear-gradient(
      90deg,
      #D4AF37 0,
      #D4AF37 4px,
      transparent 4px,
      transparent 8px
    ) 4;
  }

  .medieval-shadow {
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.5);
  }

  .pixel-text {
    font-family: 'Press Start 2P', cursive;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
  }
}
EOF

# STEP 13: Create app/layout.tsx
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frame Fables - AI Marketing for Small Businesses",
  description: "Automated AI-powered marketing tools with medieval storytelling charm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
EOF

# STEP 14: Create public/.gitkeep
touch public/.gitkeep

echo "✅ All configuration files created!"
echo "📝 Now copy-paste the PAGE FILES from the next response..."
