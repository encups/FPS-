"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just redirect to dashboard
    // In production, implement proper authentication
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🏰</span>
          <h1 className="pixel-text text-2xl text-medieval-gold">Frame Fables</h1>
        </Link>

        <div className="pixel-border medieval-shadow bg-medieval-stone/10 p-8">
          <h2 className="pixel-text text-2xl text-medieval-gold mb-6 text-center">
            🗡️ Enter Your Kingdom 🗡️
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="pixel-text text-sm text-medieval-parchment mb-2 block">
                Email Scroll
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="pixel-text text-sm text-medieval-parchment mb-2 block">
                Secret Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              ⚔️ Enter Kingdom
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="font-pixel text-sm text-medieval-stone hover:text-medieval-gold"
            >
              Don&apos;t have a kingdom? Create one →
            </Link>
          </div>

          <div className="mt-4 text-center">
            <button className="font-pixel text-sm text-medieval-stone hover:text-medieval-gold">
              Forgot your secret password?
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-pixel text-sm text-medieval-stone">
            🛡️ Demo Mode: Any credentials will work 🛡️
          </p>
        </div>
      </div>
    </div>
  );
}
