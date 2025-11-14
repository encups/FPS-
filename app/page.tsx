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
      <nav className="border-b-4 border-medieval-gold artistic-backdrop">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-float">
              <span className="text-4xl">📖</span>
              <h1 className="fable-title text-2xl text-medieval-gold">Frame Fables</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="story-text text-base text-medieval-parchment hover:text-medieval-gold transition-all hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="pixel-border pixel-text bg-medieval-gold text-medieval-ink px-6 py-3 text-xs hover:bg-medieval-bronze transition-all hover:translate-x-1 hover:translate-y-1"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center particles-bg">
          <div className="mb-8">
            <div className="inline-block story-frame bg-medieval-gold/10 px-6 py-3 mb-6 animate-pulse-glow">
              <span className="pixel-text text-sm shimmer-text">
                ⚡ AI-Powered Marketing Magic ⚡
              </span>
            </div>
          </div>
          <div className="ornament-divider mb-8">
            <span className="text-3xl">✦ ◆ ✦</span>
          </div>
          <h2 className="fable-title text-5xl md:text-7xl text-medieval-gold mb-4 leading-tight">
            Conquer Your Market
          </h2>
          <h3 className="fable-title text-4xl md:text-5xl gradient-text mb-8 leading-tight">
            One Fable at a Time
          </h3>
          <p className="story-text text-2xl md:text-3xl text-medieval-parchment max-w-4xl mx-auto mb-12 leading-relaxed">
            Automated AI marketing tools for small businesses, wrapped in storytelling charm.
            Generate content, run campaigns, and grow your kingdom... err, business!
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="story-frame artistic-shadow bg-medieval-gold text-medieval-ink px-10 py-5 fable-title text-sm hover:bg-medieval-bronze transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none hover-lift">
              🗡️ Start Your Quest
            </button>
            <button className="fable-border glow-shadow bg-transparent text-medieval-parchment px-10 py-5 fable-title text-sm hover:bg-medieval-parchment/10 transition-all hover-lift">
              📖 View Demo
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <div className="ornament-divider mb-8">
            <span className="fable-title text-3xl text-medieval-gold">✦</span>
          </div>
          <h3 className="fable-title text-4xl text-center gradient-text mb-4">
            Your Marketing Arsenal
          </h3>
          <p className="story-text text-xl text-center text-medieval-stone mb-16">
            ⚔️ Powerful tools for every storyteller ⚔️
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="story-frame artistic-shadow bg-medieval-stone/10 p-8 hover:bg-medieval-stone/20 transition-all hover-lift group"
              >
                <div className="text-6xl mb-6 animate-float" style={{animationDelay: `${index * 0.2}s`}}>{feature.icon}</div>
                <h4 className="fable-title text-base text-medieval-gold mb-4 group-hover:shimmer-text transition-all">
                  {feature.title}
                </h4>
                <p className="story-text text-lg text-medieval-parchment">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20 particles-bg">
          <div className="ornament-divider mb-8">
            <span className="text-4xl">🗺️</span>
          </div>
          <h3 className="fable-title text-4xl text-center text-medieval-gold mb-4">
            The Quest Begins
          </h3>
          <p className="story-text text-xl text-center text-medieval-stone mb-16">
            Four steps to marketing mastery
          </p>
          <div className="max-w-5xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Enter Your Kingdom",
                desc: "Tell us about your business and brand story",
                icon: "🏰",
              },
              {
                step: "2",
                title: "Choose Your Weapons",
                desc: "Select from our arsenal of marketing tools and templates",
                icon: "⚔️",
              },
              {
                step: "3",
                title: "AI Crafts Your Tale",
                desc: "Our AI weaves compelling content in mere seconds",
                icon: "✨",
              },
              {
                step: "4",
                title: "Conquer the Market",
                desc: "Deploy campaigns and witness legendary results",
                icon: "👑",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-8 fable-border bg-black/30 p-8 hover-lift group"
              >
                <div className="story-frame glow-shadow bg-medieval-gold text-medieval-ink w-20 h-20 flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-glow">
                  <span className="fable-title text-2xl">{item.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl animate-float">{item.icon}</span>
                    <h4 className="fable-title text-xl text-medieval-gold group-hover:gradient-text transition-all">
                      {item.title}
                    </h4>
                  </div>
                  <p className="story-text text-lg text-medieval-parchment leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-4 py-20">
          <div className="ornament-divider mb-8">
            <span className="text-4xl">💰</span>
          </div>
          <h3 className="fable-title text-4xl text-center gradient-text mb-4">
            Choose Your Path
          </h3>
          <p className="story-text text-xl text-center text-medieval-stone mb-16">
            All plans include 7-day free trial • Cancel anytime
          </p>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`story-frame artistic-shadow p-10 transition-all hover-lift ${
                  plan.popular
                    ? "bg-medieval-gold/20 scale-105"
                    : "bg-medieval-stone/10"
                }`}
              >
                {plan.popular && (
                  <div className="story-frame bg-medieval-gold text-medieval-ink px-6 py-3 mb-6 text-center animate-pulse-glow">
                    <span className="fable-title text-xs shimmer-text">⭐ MOST POPULAR ⭐</span>
                  </div>
                )}
                <h4 className="fable-title text-3xl text-medieval-gold mb-6 text-center">
                  {plan.name}
                </h4>
                <div className="mb-8 text-center">
                  <span className="fable-title text-5xl gradient-text">
                    {plan.price}
                  </span>
                  <span className="story-text text-xl text-medieval-stone block mt-2">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="story-text text-base text-medieval-parchment flex items-start gap-3"
                    >
                      <span className="text-medieval-gold text-xl">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className="w-full fable-border glow-shadow bg-medieval-gold text-medieval-ink px-8 py-4 fable-title text-sm hover:bg-medieval-bronze transition-all hover:scale-105"
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 particles-bg">
          <div className="story-frame artistic-shadow bg-gradient-to-br from-medieval-gold/20 via-medieval-bronze/15 to-medieval-gold/20 p-16 text-center max-w-5xl mx-auto">
            <div className="ornament-divider mb-8">
              <span className="text-5xl animate-float">🏰</span>
            </div>
            <h3 className="fable-title text-4xl md:text-5xl gradient-text mb-6 leading-tight">
              Ready to Build Your Empire?
            </h3>
            <p className="story-text text-2xl md:text-3xl text-medieval-parchment mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of small businesses conquering their markets with AI-powered storytelling
            </p>
            <button className="story-frame glow-shadow bg-medieval-gold text-medieval-ink px-12 py-6 fable-title text-base hover:bg-medieval-bronze transition-all hover:scale-110 animate-pulse-glow">
              Start Free Trial
            </button>
            <p className="story-text text-lg text-medieval-stone mt-6">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-medieval-gold artistic-backdrop py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-4xl">✦</span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6 animate-float">
            <span className="text-5xl">📖</span>
            <span className="fable-title text-3xl gradient-text">Frame Fables</span>
          </div>
          <p className="story-text text-xl text-medieval-parchment mb-4">
            Where stories become strategies
          </p>
          <p className="story-text text-base text-medieval-stone">
            © 2024 Frame Fables. All rights reserved to the realm.
          </p>
        </div>
      </footer>
    </div>
  );
}
