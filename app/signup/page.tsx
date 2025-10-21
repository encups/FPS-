"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just redirect to dashboard
    // In production, implement proper authentication
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🏰</span>
          <h1 className="pixel-text text-2xl text-medieval-gold">Frame Fables</h1>
        </Link>

        <div className="pixel-border medieval-shadow bg-medieval-stone/10 p-8">
          <h2 className="pixel-text text-2xl text-medieval-gold mb-2 text-center">
            🏰 Build Your Kingdom 🏰
          </h2>
          <p className="font-pixel text-sm text-medieval-stone text-center mb-6">
            Start your 7-day free quest
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="pixel-text text-xs text-medieval-parchment mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="Sir/Lady..."
                required
              />
            </div>

            <div>
              <label className="pixel-text text-xs text-medieval-parchment mb-2 block">
                Email Scroll
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="pixel-text text-xs text-medieval-parchment mb-2 block">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="Your Kingdom..."
                required
              />
            </div>

            <div>
              <label className="pixel-text text-xs text-medieval-parchment mb-2 block">
                Secret Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-3 focus:outline-none focus:border-medieval-gold"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              ⚡ Start Free Quest
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="font-pixel text-sm text-medieval-stone hover:text-medieval-gold"
            >
              Already have a kingdom? Enter here →
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-medieval-stone/30">
            <p className="font-pixel text-xs text-medieval-stone text-center">
              By creating a kingdom, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="font-pixel text-sm text-medieval-gold">
            ✓ No credit card required
          </p>
          <p className="font-pixel text-sm text-medieval-gold">
            ✓ 7-day free trial
          </p>
          <p className="font-pixel text-sm text-medieval-gold">
            ✓ Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
