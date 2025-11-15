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
      color: "var(--electric-blue)",
    },
    {
      icon: "📜",
      title: "Scroll of Emails",
      description: "Craft compelling email campaigns with storytelling magic",
      color: "var(--hot-pink)",
    },
    {
      icon: "🏰",
      title: "Ad Campaign Castle",
      description: "Build fortress-strong ad copy that converts",
      color: "var(--vibrant-orange)",
    },
    {
      icon: "🎨",
      title: "Banner Creation",
      description: "Design pixel-perfect marketing visuals",
      color: "var(--deep-purple)",
    },
    {
      icon: "📖",
      title: "Blog Chronicles",
      description: "Write engaging blog posts with medieval flair",
      color: "var(--lime-green)",
    },
    {
      icon: "🎯",
      title: "Strategy Guild",
      description: "AI-powered marketing strategies for your kingdom",
      color: "var(--sunny-yellow)",
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
      color: "var(--vibrant-orange)",
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
      color: "var(--electric-blue)",
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
      color: "var(--hot-pink)",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Bold Navigation */}
      <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">📖</div>
              <h1 className="mag-display text-3xl">Frame Fables</h1>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                href="/login"
                className="mag-bold text-base hover:text-[var(--electric-blue)] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bold-button"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO - Mystical Quest */}
        <section className="container mx-auto px-6 py-24 relative starfield constellation-bg overflow-hidden">
          {/* Cosmic Orbs */}
          <div className="cosmic-orb" style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, var(--electric-blue), transparent)',
            top: '10%',
            left: '5%'
          }}></div>
          <div className="cosmic-orb" style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, var(--deep-purple), transparent)',
            bottom: '10%',
            right: '5%',
            animationDelay: '5s'
          }}></div>

          <div className="absolute top-20 right-10 sticker rotate-12 magic-particles">
            ⚡ QUEST BEGINS
          </div>

          <div className="magazine-grid items-center relative z-10">
            <div className="span-7">
              <div className="mag-body text-sm text-gray-600 mb-6 uppercase tracking-wider">
                🌟 Embark on Your Marketing Quest
              </div>

              <h1 className="mag-display mag-hero mb-8">
                Tell Your
                <br />
                <span className="astral-text">Legendary</span>
                <br />
                <span className="magic-glow">Story.</span>
                <br />
                Conquer Your
                <br />
                <span className="text-[var(--hot-pink)]">Market.</span>
              </h1>

              <p className="mag-body text-xl text-gray-700 mb-12 max-w-xl leading-relaxed">
                Frame Fables weaves your brand narrative into <span className="text-highlight mag-bold">epic marketing campaigns</span> with AI-powered storytelling magic that captures your unique voice.
              </p>

              <div className="flex gap-6 flex-wrap">
                <button className="bold-button mystical-shimmer">
                  Begin Your Quest
                </button>
                <button className="outline-bold-button">
                  Watch the Magic
                </button>
              </div>
            </div>

            <div className="span-5">
              <div className="bold-frame noise-texture enchanted">
                <div className="speech-bubble mb-6">
                  <p className="mag-bold text-lg">&ldquo;This AI actually gets our brand voice!&rdquo;</p>
                </div>
                <div className="mag-body space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">✓</div>
                    <div>
                      <div className="mag-bold">10,000+ businesses</div>
                      <div className="text-sm">Already telling better stories</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">✓</div>
                    <div>
                      <div className="mag-bold">500,000+ campaigns</div>
                      <div className="text-sm">Created and deployed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">✓</div>
                    <div>
                      <div className="mag-bold">4.9/5 rating</div>
                      <div className="text-sm">From actual marketers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - Epic Quest Cards */}
        <section className="py-32 bg-[var(--lime-green)] diagonal-section relative starfield">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 relative z-10">
              <h2 className="mag-display mag-title mb-6">
                Your Arsenal
                <br />
                <span className="underline-squiggle astral-text">of Marketing Magic</span>
              </h2>
              <p className="mag-body text-xl max-w-2xl mx-auto">
                ⚔️ Legendary tools for your marketing quest
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="quest-border p-8 relative bg-white mystical-shimmer"
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="mag-headline text-2xl mb-4">
                    {feature.title}
                  </h3>
                  <p className="mag-body text-gray-700">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Bold Steps */}
        <section className="container mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <div className="inline-block sticker mb-8 magic-particles">🔮 The Quest Path</div>
            <h2 className="mag-display mag-title">
              4 Legendary Steps
              <br />
              to Marketing <span className="astral-text">Victory</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {[
              {
                num: "01",
                title: "Define Your Voice",
                desc: "Tell us about your brand personality, target audience, and what makes you unique. We create a custom narrative framework.",
                color: "var(--electric-blue)",
              },
              {
                num: "02",
                title: "Choose Your Channels",
                desc: "Social media, email, ads, blogs—pick where your story needs to be told. We adapt your voice for each platform.",
                color: "var(--hot-pink)",
              },
              {
                num: "03",
                title: "AI Crafts Content",
                desc: "Our AI generates authentic, on-brand content in seconds. Edit it, tweak it, or ship it as-is. It's your call.",
                color: "var(--vibrant-orange)",
              },
              {
                num: "04",
                title: "Deploy & Dominate",
                desc: "Schedule posts, launch campaigns, track performance. Watch your story resonate with the right people.",
                color: "var(--deep-purple)",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="outline-frame relative hover:bg-gray-50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div
                    className="mag-display text-8xl opacity-20"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="mag-headline text-3xl md:text-4xl mb-4">
                      {step.title}
                    </h3>
                    <p className="mag-body text-lg text-gray-700 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING - Vibrant Cards */}
        <section className="py-32 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="mag-display mag-title mb-6">
                Choose Your
                <br />
                <span className="magic-glow">Quest Tier</span>
              </h2>
              <p className="mag-body text-xl text-gray-600">
                ⭐ 7-day free trial • No credit card • Cancel anytime
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`vibrant-card relative ${plan.popular ? 'scale-110 z-10' : ''}`}
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, var(--deep-purple))`
                      : `linear-gradient(135deg, ${plan.color}, black)`,
                  }}
                >
                  {plan.popular && (
                    <div className="badge-corner">
                      MOST
                      <br />
                      POPULAR
                    </div>
                  )}

                  <h3 className="mag-headline text-3xl mb-4">{plan.name}</h3>

                  <div className="mb-8">
                    <span className="mag-display text-6xl">{plan.price}</span>
                    <span className="mag-body text-lg opacity-80">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mag-body flex items-start gap-3">
                        <span className="text-2xl">✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className="w-full bold-button bg-white text-black hover:bg-black hover:text-[var(--lime-green)]"
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Epic Call to Adventure */}
        <section className="container mx-auto px-6 py-32 relative starfield constellation-bg">
          {/* Cosmic Orb */}
          <div className="cosmic-orb" style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, var(--hot-pink), transparent)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '3s'
          }}></div>

          <div className="bold-frame text-center max-w-4xl mx-auto noise-texture enchanted relative z-10">
            <div className="inline-block sticker mb-8 magic-particles">
              ⚡ The Adventure Awaits!
            </div>

            <h2 className="mag-display mag-title mb-8">
              Begin Weaving
              <br />
              <span className="astral-text">Legendary Tales</span>
              <br />
              Today
            </h2>

            <p className="mag-body text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of marketing heroes who&apos;ve discovered that epic campaigns begin with compelling stories.
              And legendary stories are forged with <span className="mag-bold magic-glow">Frame Fables</span>.
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <button className="bold-button text-lg px-12 mystical-shimmer">
                🌟 Start Your Quest →
              </button>
              <button className="outline-bold-button text-lg px-12">
                🔮 View the Magic
              </button>
            </div>

            <p className="mag-body text-sm text-gray-600 mt-8">
              No credit card required • 7 days free • Cancel anytime
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t-4 border-black bg-black text-white py-20 relative starfield">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl magic-particles">📖</div>
                  <div className="mag-display text-2xl astral-text">
                    Frame
                    <br />
                    Fables
                  </div>
                </div>
                <p className="mag-body text-sm text-gray-400">
                  ✨ Where stories become legends. Marketing magic that conquers markets.
                </p>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4 text-[var(--sunny-yellow)]">PRODUCT</h4>
                <ul className="space-y-2 mag-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4 text-[var(--hot-pink)]">COMPANY</h4>
                <ul className="space-y-2 mag-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4 text-[var(--electric-blue)]">LEGAL</h4>
                <ul className="space-y-2 mag-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="mag-body text-xs text-gray-500 text-center">
                © 2024 Frame Fables. Built with ❤️ and AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
