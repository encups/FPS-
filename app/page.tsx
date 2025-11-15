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
      {/* Bold Navigation */}
      <nav className="border-b-4 bg-white sticky top-0 z-50" style={{ borderColor: 'var(--shadow-black)' }}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl pixel-sparkle">🐉</div>
              <h1 className="mag-display text-3xl pixel-text" style={{ color: 'var(--dragon-emerald)' }}>Frame Fables</h1>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                href="/login"
                className="mag-bold text-base transition-colors"
                style={{ color: 'var(--shadow-black)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--dragon-turquoise)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--shadow-black)'}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="dragon-button"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO - Dragon Quest */}
        <section className="container mx-auto px-6 py-24 relative pixel-sky overflow-hidden">
          {/* Pixel Clouds */}
          <div className="pixel-clouds"></div>

          {/* Dragon Runes */}
          <div className="dragon-rune" style={{ top: '10%', left: '10%' }}></div>
          <div className="dragon-rune" style={{ top: '20%', right: '15%', animationDelay: '1s' }}></div>
          <div className="dragon-rune" style={{ bottom: '15%', left: '20%', animationDelay: '2s' }}></div>

          <div className="absolute top-20 right-10 sticker rotate-12 pixel-sparkle">
            🐉 THE WYRM AWAITS
          </div>

          <div className="magazine-grid items-center relative z-10">
            <div className="span-7">
              <div className="mag-body text-sm mb-6 uppercase tracking-wider pixel-text" style={{ color: 'var(--dragon-emerald)' }}>
                🐉 The Emberquill Wyrm Welcomes You
              </div>

              <h1 className="mag-display mag-hero mb-8">
                Tell Your
                <br />
                <span style={{ color: 'var(--dragon-emerald)' }}>Legendary</span>
                <br />
                <span style={{ color: 'var(--molten-gold)' }}>Story.</span>
                <br />
                Conquer Your
                <br />
                <span style={{ color: 'var(--flame-orange)' }}>Market.</span>
              </h1>

              <p className="mag-body text-xl text-gray-700 mb-12 max-w-xl leading-relaxed">
                Frame Fables weaves your brand narrative into <span className="mag-bold" style={{ color: 'var(--dragon-fire)' }}>epic marketing campaigns</span> with AI-powered storytelling magic guided by the ancient wisdom of the Emberquill Wyrm.
              </p>

              <div className="flex gap-6 flex-wrap">
                <button className="dragon-button">
                  Begin Your Quest
                </button>
                <button className="dragon-button-outline">
                  Watch the Magic
                </button>
              </div>
            </div>

            <div className="span-5">
              {/* Dragon Silhouette */}
              <div className="dragon-silhouette mb-8 mx-auto"></div>

              <div className="bold-frame noise-texture" style={{ borderColor: 'var(--shadow-black)' }}>
                <div className="speech-bubble mb-6">
                  <p className="mag-bold text-lg">&ldquo;The wyrm understands our brand voice!&rdquo;</p>
                </div>
                <div className="mag-body space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl" style={{ color: 'var(--dragon-emerald)' }}>✓</div>
                    <div>
                      <div className="mag-bold">10,000+ businesses</div>
                      <div className="text-sm">Guided by the Emberquill</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl" style={{ color: 'var(--dragon-turquoise)' }}>✓</div>
                    <div>
                      <div className="mag-bold">500,000+ campaigns</div>
                      <div className="text-sm">Forged with dragon fire</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl" style={{ color: 'var(--molten-gold)' }}>✓</div>
                    <div>
                      <div className="mag-bold">4.9/5 rating</div>
                      <div className="text-sm">From legendary marketers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - Dragon Arsenal */}
        <section className="py-32 diagonal-section relative pixel-sky" style={{ backgroundColor: 'var(--cloud-white)' }}>
          <div className="pixel-clouds"></div>

          <div className="container mx-auto px-6">
            <div className="text-center mb-20 relative z-10">
              <div className="inline-block sticker mb-8 pixel-sparkle" style={{ background: 'var(--dragon-emerald)', color: 'white' }}>
                ⚔️ DRAGON ARSENAL
              </div>
              <h2 className="mag-display mag-title mb-6">
                The Wyrm&apos;s
                <br />
                <span style={{ color: 'var(--molten-gold)' }}>Marketing Magic</span>
              </h2>
              <p className="mag-body text-xl max-w-2xl mx-auto">
                🐉 Legendary tools forged with dragon fire
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="quest-border p-8 relative bg-white"
                  style={{ borderColor: 'var(--shadow-black)' }}
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="mag-headline text-2xl mb-4 pixel-text" style={{ color: 'var(--dragon-fire)' }}>
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

        {/* HOW IT WORKS - Dragon's Path */}
        <section className="container mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <div className="inline-block sticker mb-8 pixel-sparkle" style={{ background: 'var(--dragon-fire)', color: 'white' }}>🐉 The Dragon&apos;s Path</div>
            <h2 className="mag-display mag-title">
              4 Legendary Steps
              <br />
              to Marketing <span style={{ color: 'var(--molten-gold)' }}>Victory</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {[
              {
                num: "01",
                title: "Define Your Voice",
                desc: "Tell us about your brand personality, target audience, and what makes you unique. The wyrm creates a custom narrative framework.",
                color: "var(--dragon-emerald)",
              },
              {
                num: "02",
                title: "Choose Your Channels",
                desc: "Social media, email, ads, blogs—pick where your story needs to be told. We adapt your voice for each platform with dragon precision.",
                color: "var(--dragon-turquoise)",
              },
              {
                num: "03",
                title: "AI Crafts Content",
                desc: "The Emberquill wyrm generates authentic, on-brand content in seconds. Edit it, tweak it, or ship it as-is. It's your call.",
                color: "var(--molten-gold)",
              },
              {
                num: "04",
                title: "Deploy & Dominate",
                desc: "Schedule posts, launch campaigns, track performance. Watch your story resonate with the right people, guided by dragon wisdom.",
                color: "var(--flame-orange)",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="outline-frame relative hover:bg-gray-50 transition-all"
                style={{ borderColor: 'var(--shadow-black)' }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div
                    className="mag-display text-8xl opacity-20 pixel-text"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="mag-headline text-3xl md:text-4xl mb-4 pixel-text" style={{ color: 'var(--dragon-fire)' }}>
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

        {/* PRICING - Dragon Tier Cards */}
        <section className="py-32 bg-gray-50 relative">
          {/* Background Dragon Elements */}
          <div className="absolute inset-0 opacity-5 pixel-sky"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block sticker mb-8 pixel-sparkle" style={{ background: 'var(--molten-gold)', color: 'var(--shadow-black)' }}>
                🐉 CHOOSE YOUR PATH
              </div>
              <h2 className="mag-display mag-title mb-6">
                Ascend to
                <br />
                <span style={{ color: 'var(--dragon-emerald)' }}>Dragon</span> <span style={{ color: 'var(--molten-gold)' }}>Mastery</span>
              </h2>
              <p className="mag-body text-xl text-gray-600">
                ⭐ 7-day free trial • No credit card • The wyrm protects all
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`tier-card-dragon ${plan.tierClass} relative ${plan.popular ? 'scale-105 z-10' : ''}`}
                >
                  {plan.popular && (
                    <div className="badge-corner" style={{ background: 'var(--dragon-turquoise)', color: 'var(--shadow-black)' }}>
                      MOST
                      <br />
                      POPULAR
                    </div>
                  )}

                  {/* Pixel Icon */}
                  <div className={`${plan.iconClass} mx-auto mb-6`}></div>

                  <h3 className="mag-headline text-2xl mb-2 pixel-text">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 italic">{plan.dragonElement}</p>

                  <div className="mb-8">
                    <span className="mag-display text-5xl">{plan.price}</span>
                    <span className="mag-body text-lg opacity-80">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mag-body flex items-start gap-3 text-sm">
                        <span className="text-xl">🐉</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className="w-full dragon-button"
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Dragon Tier Pathway Visualization */}
            <div className="mt-20 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="mag-headline text-3xl mb-4" style={{ color: 'var(--dragon-fire)' }}>
                  The Dragon&apos;s Path to Mastery
                </h3>
                <p className="mag-body text-gray-600">
                  Ascend from Squire to King alongside the Emberquill Wyrm
                </p>
              </div>

              <div className="dragon-tier-pathway">
                <div className="tier-path-segment">
                  <div className="tier-path-icon pixel-icon-shield"></div>
                  <div className="tier-path-label pixel-text">Squire&apos;s Start</div>
                  <div className="tier-path-description">Begin your journey under the dragon&apos;s tail</div>
                </div>

                <div className="tier-path-arrow">→</div>

                <div className="tier-path-segment">
                  <div className="tier-path-icon pixel-icon-sword"></div>
                  <div className="tier-path-label pixel-text">Knight&apos;s Climb</div>
                  <div className="tier-path-description">Rise beneath the mighty wings</div>
                </div>

                <div className="tier-path-arrow">→</div>

                <div className="tier-path-segment">
                  <div className="tier-path-icon pixel-icon-crown"></div>
                  <div className="tier-path-label pixel-text">King&apos;s Command</div>
                  <div className="tier-path-description">Stand beside the dragon&apos;s crest</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Epic Call to Adventure */}
        <section className="container mx-auto px-6 py-32 relative pixel-sky">
          {/* Pixel Clouds */}
          <div className="pixel-clouds"></div>

          {/* Dragon Flames */}
          <div className="dragon-flame" style={{ top: '20%', left: '10%' }}></div>
          <div className="dragon-flame" style={{ top: '60%', right: '10%', animationDelay: '1.5s' }}></div>

          <div className="bold-frame text-center max-w-4xl mx-auto noise-texture relative z-10" style={{ borderColor: 'var(--shadow-black)', background: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="inline-block sticker mb-8 pixel-sparkle" style={{ background: 'var(--dragon-fire)', color: 'white' }}>
              🐉 The Wyrm Calls!
            </div>

            <h2 className="mag-display mag-title mb-8">
              Begin Weaving
              <br />
              <span style={{ color: 'var(--dragon-emerald)' }}>Legendary</span> <span style={{ color: 'var(--molten-gold)' }}>Tales</span>
              <br />
              Today
            </h2>

            <p className="mag-body text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of marketing heroes who&apos;ve discovered that epic campaigns begin with compelling stories.
              And legendary stories are forged with the <span className="mag-bold" style={{ color: 'var(--dragon-fire)' }}>Emberquill Wyrm</span>.
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <button className="dragon-button text-lg px-12">
                🐉 Start Your Quest →
              </button>
              <button className="dragon-button-outline text-lg px-12">
                ⚔️ View the Magic
              </button>
            </div>

            <p className="mag-body text-sm text-gray-600 mt-8">
              No credit card required • 7 days free • The wyrm protects all trials
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t-4 bg-black text-white py-20 relative pixel-sky" style={{ borderColor: 'var(--shadow-black)' }}>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl pixel-sparkle">🐉</div>
                  <div className="mag-display text-2xl pixel-text" style={{ color: 'var(--dragon-emerald)' }}>
                    Frame
                    <br />
                    Fables
                  </div>
                </div>
                <p className="mag-body text-sm text-gray-400">
                  🐉 Where ancient wisdom meets modern magic. Guided by the Emberquill Wyrm.
                </p>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4" style={{ color: 'var(--molten-gold)' }}>PRODUCT</h4>
                <ul className="space-y-2 mag-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4" style={{ color: 'var(--dragon-turquoise)' }}>COMPANY</h4>
                <ul className="space-y-2 mag-body text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mag-bold text-sm mb-4" style={{ color: 'var(--flame-orange)' }}>LEGAL</h4>
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
