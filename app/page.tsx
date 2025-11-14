"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const features = [
    {
      icon: "⚔️",
      title: "Social Media Quests",
      description: "Generate epic social media posts that engage your followers",
    },
    {
      icon: "📜",
      title: "Scroll of Emails",
      description: "Craft compelling email campaigns with storytelling magic",
    },
    {
      icon: "🏰",
      title: "Ad Campaign Castle",
      description: "Build fortress-strong ad copy that converts",
    },
    {
      icon: "🎨",
      title: "Banner Creation",
      description: "Design pixel-perfect marketing visuals",
    },
    {
      icon: "📖",
      title: "Blog Chronicles",
      description: "Write engaging blog posts with medieval flair",
    },
    {
      icon: "🎯",
      title: "Strategy Guild",
      description: "AI-powered marketing strategies for your kingdom",
    },
  ];

  const pricingPlans = [
    {
      name: "Squire",
      price: "$29",
      period: "/month",
      features: [
        "10 AI-generated posts/month",
        "Basic email campaigns",
        "Medieval-themed templates",
        "Community support",
      ],
      cta: "Start Your Quest",
    },
    {
      name: "Knight",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "50 AI-generated posts/month",
        "Advanced email automation",
        "Custom brand storytelling",
        "Priority support",
        "Ad copy generation",
        "Analytics dashboard",
      ],
      cta: "Join the Order",
    },
    {
      name: "King",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited AI content",
        "Full marketing automation",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "24/7 Royal support",
      ],
      cta: "Rule Your Market",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest">
      {/* Hero Section */}
      <nav className="border-b-4 border-medieval-gold bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏰</span>
              <h1 className="pixel-text text-xl text-medieval-gold">Frame Fables</h1>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/dungeon/menu"
                className="pixel-text text-xs text-medieval-gold hover:text-medieval-bronze transition-colors flex items-center gap-1"
              >
                ⚔️ Play Game
              </Link>
              <Link
                href="/login"
                className="pixel-text text-sm text-medieval-parchment hover:text-medieval-gold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="pixel-border pixel-text bg-medieval-gold text-medieval-ink px-4 py-2 text-sm hover:bg-medieval-bronze transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="inline-block pixel-border bg-medieval-gold/10 px-4 py-2 mb-6">
              <span className="pixel-text text-sm text-medieval-gold">
                ⚡ AI-Powered Marketing Magic ⚡
              </span>
            </div>
          </div>
          <h2 className="pixel-text text-4xl md:text-6xl text-medieval-gold mb-6 leading-relaxed">
            Conquer Your Market
            <br />
            <span className="text-medieval-parchment">One Fable at a Time</span>
          </h2>
          <p className="font-pixel text-2xl text-medieval-stone max-w-3xl mx-auto mb-12 leading-relaxed">
            Automated AI marketing tools for small businesses, wrapped in medieval charm.
            Generate content, run campaigns, and grow your kingdom... err, business!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              🗡️ Start Your Quest
            </button>
            <button className="pixel-border medieval-shadow bg-transparent text-medieval-parchment px-8 py-4 pixel-text text-sm hover:bg-medieval-parchment/10 transition-all">
              📖 View Demo
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <h3 className="pixel-text text-3xl text-center text-medieval-gold mb-16">
            ⚔️ Your Marketing Arsenal ⚔️
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="pixel-border medieval-shadow bg-medieval-stone/10 p-6 hover:bg-medieval-stone/20 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="pixel-text text-lg text-medieval-gold mb-3">
                  {feature.title}
                </h4>
                <p className="font-pixel text-xl text-medieval-parchment">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20">
          <h3 className="pixel-text text-3xl text-center text-medieval-gold mb-16">
            🗺️ The Quest Begins 🗺️
          </h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Enter Your Kingdom",
                desc: "Tell us about your business and brand",
              },
              {
                step: "2",
                title: "Choose Your Weapons",
                desc: "Select marketing tools and templates",
              },
              {
                step: "3",
                title: "AI Crafts Your Tale",
                desc: "Our AI generates content in seconds",
              },
              {
                step: "4",
                title: "Conquer the Market",
                desc: "Deploy campaigns and watch results",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 pixel-border bg-black/30 p-6"
              >
                <div className="pixel-border bg-medieval-gold text-medieval-ink w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <span className="pixel-text text-2xl">{item.step}</span>
                </div>
                <div>
                  <h4 className="pixel-text text-xl text-medieval-gold mb-2">
                    {item.title}
                  </h4>
                  <p className="font-pixel text-xl text-medieval-parchment">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-4 py-20">
          <h3 className="pixel-text text-3xl text-center text-medieval-gold mb-4">
            💰 Choose Your Path 💰
          </h3>
          <p className="font-pixel text-xl text-center text-medieval-stone mb-16">
            All plans include 7-day free trial. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pixel-border medieval-shadow p-8 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none ${
                  plan.popular
                    ? "bg-medieval-gold/20 border-medieval-gold"
                    : "bg-medieval-stone/10"
                }`}
              >
                {plan.popular && (
                  <div className="pixel-border bg-medieval-gold text-medieval-ink px-4 py-2 mb-4 text-center">
                    <span className="pixel-text text-xs">⭐ MOST POPULAR ⭐</span>
                  </div>
                )}
                <h4 className="pixel-text text-2xl text-medieval-gold mb-4">
                  {plan.name}
                </h4>
                <div className="mb-6">
                  <span className="pixel-text text-4xl text-medieval-parchment">
                    {plan.price}
                  </span>
                  <span className="font-pixel text-xl text-medieval-stone">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="font-pixel text-lg text-medieval-parchment flex items-start gap-2"
                    >
                      <span className="text-medieval-gold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className="w-full pixel-border bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="pixel-border medieval-shadow bg-gradient-to-r from-medieval-gold/20 to-medieval-bronze/20 p-12 text-center max-w-4xl mx-auto">
            <h3 className="pixel-text text-3xl text-medieval-gold mb-6">
              🏰 Ready to Build Your Empire? 🏰
            </h3>
            <p className="font-pixel text-2xl text-medieval-parchment mb-8">
              Join thousands of small businesses conquering their markets with AI
            </p>
            <button className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              Start Free Trial
            </button>
            <p className="font-pixel text-lg text-medieval-stone mt-4">
              No credit card required • 7-day free trial
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-medieval-gold bg-black/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏰</span>
            <span className="pixel-text text-xl text-medieval-gold">Frame Fables</span>
          </div>
          <p className="font-pixel text-lg text-medieval-stone">
            © 2024 Frame Fables. All rights reserved to the realm.
          </p>
        </div>
      </footer>
    </div>
  );
}
