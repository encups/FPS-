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
      name: "Squire's Start",
      price: "$249.99",
      period: "/month",
      features: [
        "10 AI-generated posts/month",
        "Basic email campaigns",
        "Dragon-themed templates",
        "Community support",
        "Marketing audit",
      ],
      cta: "Start Your Quest",
      tierClass: "tier-squire",
      iconClass: "pixel-icon-shield",
      dragonElement: "Tail & Lower Scales",
    },
    {
      name: "Knight's Climb",
      price: "$499.99",
      period: "/month",
      popular: true,
      features: [
        "50 AI-generated posts/month",
        "Advanced email automation",
        "Custom brand storytelling",
        "Priority support",
        "Ad copy generation",
        "Analytics dashboard",
        "Content calendar",
      ],
      cta: "Join the Order",
      tierClass: "tier-knight",
      iconClass: "pixel-icon-sword",
      dragonElement: "Mid-Body & Wings",
    },
    {
      name: "King's Command",
      price: "$999.99",
      period: "/month",
      features: [
        "Unlimited AI content",
        "Full marketing automation",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "24/7 Royal support",
        "Multi-agent AI system",
      ],
      cta: "Rule Your Market",
      tierClass: "tier-king",
      iconClass: "pixel-icon-crown",
      dragonElement: "Head, Horns & Full Wings",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Modern Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🐉</div>
              <h1 className="dragon-display text-2xl gradient-text">Frame Fables</h1>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="dragon-body font-semibold text-base hover:text-dragon-emerald transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="dragon-btn-primary px-6 py-2.5 rounded-lg text-sm"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO - Modern Dragon */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="dragon-badge mb-8">
                  <span>🐉</span>
                  <span>Powered by the Emberquill Wyrm</span>
                </div>

                <h1 className="dragon-display hero-title mb-6">
                  Tell Your
                  <br />
                  <span className="gradient-text">Legendary</span> Story.
                  <br />
                  Conquer Your Market.
                </h1>

                <p className="dragon-body text-xl mb-10 max-w-xl">
                  Frame Fables weaves your brand narrative into <span className="font-semibold text-gray-900">epic marketing campaigns</span> with AI-powered storytelling magic guided by the ancient wisdom of the Emberquill Wyrm.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <button className="dragon-btn-primary px-8 py-4 text-lg">
                    <span>Begin Your Quest →</span>
                  </button>
                  <button className="dragon-btn-secondary px-8 py-4 text-lg">
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="dragon-card p-8">
                  <div className="text-6xl mb-6 text-center">🐉</div>
                  <p className="dragon-headline text-2xl mb-6 text-center">
                    &ldquo;The wyrm understands our brand voice!&rdquo;
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl text-emerald-500">✓</div>
                      <div>
                        <div className="font-semibold text-gray-900">10,000+ businesses</div>
                        <div className="dragon-body text-sm">Guided by the Emberquill</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl text-cyan-500">✓</div>
                      <div>
                        <div className="font-semibold text-gray-900">500,000+ campaigns</div>
                        <div className="dragon-body text-sm">Forged with dragon fire</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl text-amber-500">✓</div>
                      <div>
                        <div className="font-semibold text-gray-900">4.9/5 rating</div>
                        <div className="dragon-body text-sm">From legendary marketers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - Modern Arsenal */}
        <section className="py-24 lg:py-32 dragon-bg-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="dragon-badge mx-auto mb-6">
                <span>⚔️</span>
                <span>Dragon Arsenal</span>
              </div>
              <h2 className="dragon-display section-title mb-4">
                The Wyrm&apos;s <span className="gradient-text-gold">Marketing Magic</span>
              </h2>
              <p className="dragon-body text-xl max-w-2xl mx-auto">
                Legendary tools forged with dragon fire to dominate your market
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="dragon-card"
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="dragon-headline text-2xl mb-4">
                    {feature.title}
                  </h3>
                  <p className="dragon-body">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Modern Path */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="dragon-badge mx-auto mb-6">
                <span>🐉</span>
                <span>The Dragon&apos;s Path</span>
              </div>
              <h2 className="dragon-display section-title">
                4 Legendary Steps to Marketing <span className="gradient-text-gold">Victory</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  num: "01",
                  title: "Define Your Voice",
                  desc: "Tell us about your brand personality, target audience, and what makes you unique. The wyrm creates a custom narrative framework.",
                },
                {
                  num: "02",
                  title: "Choose Your Channels",
                  desc: "Social media, email, ads, blogs—pick where your story needs to be told. We adapt your voice for each platform with dragon precision.",
                },
                {
                  num: "03",
                  title: "AI Crafts Content",
                  desc: "The Emberquill wyrm generates authentic, on-brand content in seconds. Edit it, tweak it, or ship it as-is. It's your call.",
                },
                {
                  num: "04",
                  title: "Deploy & Dominate",
                  desc: "Schedule posts, launch campaigns, track performance. Watch your story resonate with the right people, guided by dragon wisdom.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="dragon-card flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="dragon-display text-6xl gradient-text opacity-30">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="dragon-headline text-3xl mb-4">
                      {step.title}
                    </h3>
                    <p className="dragon-body text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING - Modern Tier Cards */}
        <section className="py-24 lg:py-32 dragon-bg-gradient">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="dragon-badge mx-auto mb-6">
                <span>🐉</span>
                <span>Choose Your Path</span>
              </div>
              <h2 className="dragon-display section-title mb-4">
                Ascend to <span className="gradient-text">Dragon</span> <span className="gradient-text-gold">Mastery</span>
              </h2>
              <p className="dragon-body text-xl">
                ⭐ 7-day free trial • No credit card • The wyrm protects all
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`tier-card tier-card-${plan.tierClass.split('-')[1]} relative ${plan.popular ? 'md:scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="dragon-badge text-xs">
                        <span>⭐</span>
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">
                      {plan.tierClass.includes('squire') && '🛡️'}
                      {plan.tierClass.includes('knight') && '⚔️'}
                      {plan.tierClass.includes('king') && '👑'}
                    </div>
                    <h3 className="dragon-headline text-2xl mb-2">{plan.name}</h3>
                    <p className="dragon-body text-sm italic text-gray-500">{plan.dragonElement}</p>
                  </div>

                  <div className="text-center mb-8">
                    <span className="dragon-display text-5xl block mb-2">{plan.price}</span>
                    <span className="dragon-body text-gray-600">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="dragon-body flex items-start gap-3 text-sm">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className="w-full dragon-btn-primary py-3"
                  >
                    <span>{plan.cta}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Modern Tier Pathway */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="dragon-headline text-3xl mb-3 gradient-text">
                  The Dragon&apos;s Path to Mastery
                </h3>
                <p className="dragon-body">
                  Ascend from Squire to King alongside the Emberquill Wyrm
                </p>
              </div>

              <div className="tier-pathway">
                <div className="tier-path-item">
                  <div className="tier-path-icon-wrapper">
                    <span>🛡️</span>
                  </div>
                  <div className="dragon-label">Squire&apos;s Start</div>
                  <p className="dragon-body text-sm text-center">Begin your journey under the dragon&apos;s tail</p>
                </div>

                <div className="tier-path-arrow">→</div>

                <div className="tier-path-item">
                  <div className="tier-path-icon-wrapper">
                    <span>⚔️</span>
                  </div>
                  <div className="dragon-label">Knight&apos;s Climb</div>
                  <p className="dragon-body text-sm text-center">Rise beneath the mighty wings</p>
                </div>

                <div className="tier-path-arrow">→</div>

                <div className="tier-path-item">
                  <div className="tier-path-icon-wrapper">
                    <span>👑</span>
                  </div>
                  <div className="dragon-label">King&apos;s Command</div>
                  <p className="dragon-body text-sm text-center">Stand beside the dragon&apos;s crest</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Modern Call to Adventure */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-amber-500/10"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="dragon-badge mx-auto mb-8">
                <span>🐉</span>
                <span>The Wyrm Calls!</span>
              </div>

              <h2 className="dragon-display section-title mb-6">
                Begin Weaving <span className="gradient-text">Legendary</span> <span className="gradient-text-gold">Tales</span> Today
              </h2>

              <p className="dragon-body text-xl mb-12 max-w-2xl mx-auto">
                Join thousands of marketing heroes who&apos;ve discovered that epic campaigns begin with compelling stories.
                And legendary stories are forged with the <span className="font-semibold gradient-text">Emberquill Wyrm</span>.
              </p>

              <div className="flex gap-4 justify-center flex-wrap mb-8">
                <button className="dragon-btn-primary px-10 py-4 text-lg">
                  <span>🐉 Start Your Quest →</span>
                </button>
                <button className="dragon-btn-secondary px-10 py-4 text-lg">
                  <span>⚔️ View the Magic</span>
                </button>
              </div>

              <p className="dragon-body text-sm text-gray-600">
                No credit card required • 7 days free • The wyrm protects all trials
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER - Modern */}
        <footer className="border-t border-gray-200 bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🐉</div>
                  <div className="dragon-display text-xl gradient-text">
                    Frame Fables
                  </div>
                </div>
                <p className="dragon-body text-sm text-gray-400">
                  Where ancient wisdom meets modern magic. Guided by the Emberquill Wyrm.
                </p>
              </div>

              <div>
                <h4 className="dragon-label text-amber-400 mb-4">Product</h4>
                <ul className="space-y-2 dragon-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="dragon-label text-cyan-400 mb-4">Company</h4>
                <ul className="space-y-2 dragon-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>

              <div>
                <h4 className="dragon-label text-emerald-400 mb-4">Legal</h4>
                <ul className="space-y-2 dragon-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="dragon-body text-xs text-gray-500 text-center">
                © 2024 Frame Fables. Built with ❤️ and AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
