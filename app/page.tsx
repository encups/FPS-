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
    <div className="min-h-screen bg-gradient-to-br from-medieval-ink via-gray-900 to-medieval-forest relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medieval-gold rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-medieval-bronze rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <nav className="border-b-2 border-medieval-gold glass-frame relative z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 hover-glow">
              <span className="text-5xl animate-float">📖</span>
              <h1 className="fable-title text-3xl animated-gradient-text">Frame Fables</h1>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                href="/login"
                className="story-text text-lg text-medieval-parchment hover:text-medieval-gold transition-all hover:scale-110 relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-medieval-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/signup"
                className="picture-frame modern-button bg-medieval-gold text-medieval-ink px-8 py-3 fable-title text-xs relative z-10"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-32 text-center particles-bg relative">
          <div className="mb-12">
            <div className="inline-block ornate-frame glass-card px-8 py-4 mb-8 relative">
              <span className="pixel-text text-sm neon-text">
                ⚡ AI-Powered Marketing Magic ⚡
              </span>
            </div>
          </div>

          {/* Main Headline - Framed */}
          <div className="max-w-6xl mx-auto mb-12 relative">
            <div className="ornament-divider mb-10">
              <span className="text-5xl hover-glow">✦ ◆ ✦</span>
            </div>
            <h2 className="fable-title text-6xl md:text-8xl mb-6 leading-tight relative inline-block">
              <span className="animated-gradient-text">Conquer Your Market</span>
            </h2>
            <h3 className="fable-title text-5xl md:text-6xl mb-8 leading-tight">
              <span className="neon-text">One Fable at a Time</span>
            </h3>

            {/* Decorative Frame Elements */}
            <div className="absolute -top-6 -left-6 text-6xl text-medieval-gold opacity-50 animate-float">「</div>
            <div className="absolute -bottom-6 -right-6 text-6xl text-medieval-gold opacity-50 animate-float" style={{animationDelay: '1s'}}>」</div>
          </div>

          <p className="story-text text-2xl md:text-4xl text-medieval-parchment max-w-5xl mx-auto mb-16 leading-relaxed font-light">
            Automated AI marketing tools for small businesses, wrapped in
            <span className="animated-gradient-text font-bold"> storytelling charm</span>.
            <br />Generate content, run campaigns, and grow your kingdom... err, business!
          </p>

          <div className="flex gap-8 justify-center flex-wrap">
            <button className="picture-frame modern-button vibrant-gradient text-medieval-ink px-14 py-6 fable-title text-base relative overflow-hidden group">
              <span className="relative z-10">🗡️ Start Your Quest</span>
            </button>
            <button className="ornate-frame glass-card text-medieval-parchment px-14 py-6 fable-title text-base hover-frame-pop">
              📖 View Demo
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-28 gold-gradient-bg relative">
          <div className="ornament-divider mb-12">
            <span className="fable-title text-5xl neon-text">✦</span>
          </div>
          <h3 className="fable-title text-5xl md:text-6xl text-center mb-6">
            <span className="animated-gradient-text">Your Marketing Arsenal</span>
          </h3>
          <p className="story-text text-2xl text-center text-medieval-parchment mb-20 max-w-3xl mx-auto">
            ⚔️ <span className="neon-text">Powerful tools</span> for every storyteller ⚔️
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="picture-frame glass-card p-10 hover-frame-pop group relative overflow-hidden page-corner"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-7xl mb-8 hover-glow relative z-10" style={{animationDelay: `${index * 0.2}s`}}>{feature.icon}</div>
                <h4 className="fable-title text-lg text-medieval-gold mb-5 group-hover:neon-text transition-all relative z-10">
                  {feature.title}
                </h4>
                <p className="story-text text-xl text-medieval-parchment leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-32 particles-bg relative">
          <div className="ornament-divider mb-12">
            <span className="text-6xl hover-glow">🗺️</span>
          </div>
          <h3 className="fable-title text-5xl md:text-6xl text-center mb-6">
            <span className="neon-text">The Quest Begins</span>
          </h3>
          <p className="story-text text-2xl text-center text-medieval-parchment mb-20 max-w-3xl mx-auto">
            Four steps to <span className="animated-gradient-text font-bold">marketing mastery</span>
          </p>
          <div className="max-w-6xl mx-auto space-y-12">
            {[
              {
                step: "1",
                title: "Enter Your Kingdom",
                desc: "Tell us about your business and brand story - we'll create your unique narrative framework",
                icon: "🏰",
              },
              {
                step: "2",
                title: "Choose Your Weapons",
                desc: "Select from our arsenal of marketing tools and templates - each crafted for maximum impact",
                icon: "⚔️",
              },
              {
                step: "3",
                title: "AI Crafts Your Tale",
                desc: "Our AI weaves compelling content in mere seconds - powerful storytelling at your fingertips",
                icon: "✨",
              },
              {
                step: "4",
                title: "Conquer the Market",
                desc: "Deploy campaigns and witness legendary results - your brand story comes alive",
                icon: "👑",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-10 ornate-frame glass-card p-10 hover-frame-pop group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-medieval-gold/10 via-transparent to-medieval-bronze/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="picture-frame vibrant-gradient w-28 h-28 flex items-center justify-center flex-shrink-0 relative z-10 modern-button">
                  <span className="fable-title text-4xl text-medieval-ink">{item.step}</span>
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl hover-glow animate-float" style={{animationDelay: `${index * 0.3}s`}}>{item.icon}</span>
                    <h4 className="fable-title text-2xl md:text-3xl group-hover:animated-gradient-text transition-all">
                      {item.title}
                    </h4>
                  </div>
                  <p className="story-text text-xl md:text-2xl text-medieval-parchment leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-4 py-32 gold-gradient-bg">
          <div className="ornament-divider mb-12">
            <span className="text-6xl hover-glow">💰</span>
          </div>
          <h3 className="fable-title text-5xl md:text-6xl text-center mb-6">
            <span className="animated-gradient-text">Choose Your Path</span>
          </h3>
          <p className="story-text text-2xl text-center text-medieval-parchment mb-20">
            All plans include <span className="neon-text">7-day free trial</span> • Cancel anytime
          </p>
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`picture-frame glass-card p-12 hover-frame-pop relative overflow-hidden ${
                  plan.popular
                    ? "scale-110 z-10"
                    : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/10 via-transparent to-medieval-bronze/10 opacity-0 hover:opacity-100 transition-all duration-700"></div>
                {plan.popular && (
                  <div className="ornate-frame vibrant-gradient px-8 py-4 mb-8 text-center relative">
                    <span className="fable-title text-xs text-medieval-ink">⭐ MOST POPULAR ⭐</span>
                  </div>
                )}
                <h4 className="fable-title text-4xl mb-8 text-center hover:neon-text transition-all relative z-10">
                  {plan.name}
                </h4>
                <div className="mb-10 text-center relative z-10">
                  <span className="fable-title text-6xl animated-gradient-text block">
                    {plan.price}
                  </span>
                  <span className="story-text text-2xl text-medieval-stone block mt-3">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-5 mb-12 relative z-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="story-text text-lg text-medieval-parchment flex items-start gap-4"
                    >
                      <span className="text-medieval-gold text-2xl hover-glow">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full modern-button px-10 py-5 fable-title text-base relative z-10 ${
                    plan.popular
                      ? "picture-frame vibrant-gradient text-medieval-ink"
                      : "ornate-frame glass-card text-medieval-parchment"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-32 particles-bg relative">
          <div className="picture-frame glass-card gold-gradient-bg p-20 text-center max-w-6xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/20 via-transparent to-medieval-bronze/20 animate-pulse"></div>

            {/* Decorative Frame Corners */}
            <div className="absolute -top-4 -left-4 text-8xl text-medieval-gold opacity-60 animate-float">「</div>
            <div className="absolute -top-4 -right-4 text-8xl text-medieval-gold opacity-60 animate-float" style={{animationDelay: '0.5s'}}>」</div>
            <div className="absolute -bottom-4 -left-4 text-8xl text-medieval-gold opacity-60 animate-float" style={{animationDelay: '1s'}}>「</div>
            <div className="absolute -bottom-4 -right-4 text-8xl text-medieval-gold opacity-60 animate-float" style={{animationDelay: '1.5s'}}>」</div>

            <div className="ornament-divider mb-12 relative z-10">
              <span className="text-7xl hover-glow animate-float">🏰</span>
            </div>
            <h3 className="fable-title text-5xl md:text-7xl mb-8 leading-tight relative z-10">
              <span className="neon-text">Ready to Build Your Empire?</span>
            </h3>
            <p className="story-text text-3xl md:text-4xl text-medieval-parchment mb-14 leading-relaxed max-w-4xl mx-auto relative z-10 font-light">
              Join thousands of small businesses conquering their markets with
              <span className="animated-gradient-text font-bold"> AI-powered storytelling</span>
            </p>
            <button className="picture-frame modern-button vibrant-gradient text-medieval-ink px-16 py-8 fable-title text-xl relative z-10 mb-8">
              <span className="relative z-10">Start Free Trial</span>
            </button>
            <p className="story-text text-xl text-medieval-parchment relative z-10">
              <span className="neon-text">No credit card required</span> • 7-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-medieval-gold glass-frame py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="ornament-divider mb-10">
            <span className="text-6xl hover-glow">✦</span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-8 hover-glow">
            <span className="text-7xl animate-float">📖</span>
            <span className="fable-title text-5xl animated-gradient-text">Frame Fables</span>
          </div>
          <p className="story-text text-2xl text-medieval-parchment mb-6">
            Where <span className="neon-text">stories become strategies</span>
          </p>
          <div className="ornament-divider mb-6">
            <span className="text-3xl text-medieval-gold">◆</span>
          </div>
          <p className="story-text text-lg text-medieval-stone">
            © 2024 Frame Fables. All rights reserved to the realm.
          </p>
        </div>
      </footer>
    </div>
  );
}
