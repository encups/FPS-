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
              <div className="text-5xl wiggle-hover bounce-subtle">📖</div>
              <h1 className="mag-display text-3xl split-color">Frame Fables</h1>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                href="/login"
                className="mag-bold text-base hover:text-[var(--electric-blue)] transition-colors outline-text"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bold-button shine-effect"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO - Magazine Style */}
        <section className="container mx-auto px-6 py-24 relative">
          <div className="absolute top-20 right-10 sticker rotate-12 wiggle-hover bounce-subtle">
            AI POWERED ⚡
          </div>

          {/* Decorative rotating shapes */}
          <div className="absolute top-40 left-10 morph-shape w-24 h-24 opacity-20 rotate-accent"></div>
          <div className="absolute bottom-20 right-20 morph-shape w-32 h-32 opacity-20 rotate-accent-reverse bg-[var(--electric-blue)]"></div>

          <div className="magazine-grid items-center">
            <div className="span-7">
              <div className="mag-body text-sm text-gray-600 mb-6 uppercase tracking-wider">
                Revolutionary Marketing Platform
              </div>

              <h1 className="mag-display mag-hero mb-8">
                Tell Your
                <br />
                <span className="gradient-text-animated">Story.</span>
                <br />
                Win Your
                <br />
                <span className="text-[var(--hot-pink)] neon-text">Market.</span>
              </h1>

              <p className="mag-body text-xl text-gray-700 mb-12 max-w-xl leading-relaxed">
                Frame Fables turns your brand narrative into <span className="text-highlight mag-bold">powerful marketing campaigns</span> with AI-powered content generation that actually sounds like you.
              </p>

              <div className="flex gap-6 flex-wrap">
                <button className="bold-button button-3d shine-effect">
                  Start Free Trial
                </button>
                <button className="outline-bold-button tilt-hover">
                  See How It Works
                </button>
              </div>
            </div>

            <div className="span-5">
              <div className="bold-frame noise-texture">
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

        {/* FEATURES - Comic Panel Style */}
        <section className="py-32 bg-[var(--lime-green)] diagonal-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="mag-display mag-title mb-6">
                Your Complete
                <br />
                <span className="underline-squiggle gradient-text-animated">Marketing Toolkit</span>
              </h2>
              <p className="mag-body text-xl max-w-2xl mx-auto">
                Everything you need to create, deploy, and dominate
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="comic-panel p-8 wiggle-hover scale-bounce relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-6xl mb-6 float-gentle">{feature.icon}</div>
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
            <div className="inline-block sticker mb-8 pulse-scale">The Process</div>
            <h2 className="mag-display mag-title">
              4 Steps to
              <br />
              Marketing <span className="gradient-text-animated">Mastery</span>
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
                Pick Your
                <br />
                <span className="neon-text">Plan</span>
              </h2>
              <p className="mag-body text-xl text-gray-600">
                7-day free trial • No credit card • Cancel anytime
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`vibrant-card relative ${plan.popular ? 'scale-110 z-10 rainbow-shadow' : 'tilt-hover'}`}
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

        {/* CTA - Big & Bold */}
        <section className="container mx-auto px-6 py-32 relative">
          {/* Decorative background elements */}
          <div className="absolute top-10 left-10 comic-dots w-32 h-32 opacity-30"></div>
          <div className="absolute bottom-10 right-10 comic-dots w-40 h-40 opacity-30"></div>

          <div className="bold-frame text-center max-w-4xl mx-auto noise-texture">
            <div className="inline-block sticker mb-8 wiggle-hover">
              Ready? Let&apos;s Go!
            </div>

            <h2 className="mag-display mag-title mb-8">
              Start Telling
              <br />
              <span className="gradient-text-animated">Better Stories</span>
              <br />
              Today
            </h2>

            <p className="mag-body text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses who&apos;ve discovered that great marketing starts with a great story.
              And great stories start with <span className="split-color mag-bold">Frame Fables</span>.
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <button className="bold-button text-lg px-12 button-3d rainbow-shadow">
                Start Free Trial →
              </button>
              <button className="outline-bold-button text-lg px-12 squish-hover">
                Schedule Demo
              </button>
            </div>

            <p className="mag-body text-sm text-gray-600 mt-8">
              No credit card required • 7 days free • Cancel anytime
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t-4 border-black bg-black text-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl float-gentle">📖</div>
                  <div className="mag-display text-2xl gradient-text-animated">
                    Frame
                    <br />
                    Fables
                  </div>
                </div>
                <p className="mag-body text-sm text-gray-400">
                  Where stories become strategies. Marketing that actually works.
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
