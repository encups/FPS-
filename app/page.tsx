"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const features = [
    {
      icon: "📖",
      title: "Story-Driven Content",
      description: "Craft compelling narratives that captivate your audience with AI-powered storytelling magic",
    },
    {
      icon: "🏰",
      title: "Brand Kingdom",
      description: "Build your empire with consistent brand voice across all your marketing realms",
    },
    {
      icon: "⚔️",
      title: "Campaign Battles",
      description: "Launch powerful marketing campaigns that conquer your competition and win customer loyalty",
    },
    {
      icon: "🔮",
      title: "Mystical Analytics",
      description: "Peer into the crystal ball of data to predict trends and optimize your strategy",
    },
    {
      icon: "📜",
      title: "Ancient Wisdom",
      description: "Access battle-tested templates and strategies from legendary marketing campaigns",
    },
    {
      icon: "✨",
      title: "Magic Automation",
      description: "Enchant your workflow with intelligent automation that works while you rest",
    },
  ];

  const pricingPlans = [
    {
      name: "Apprentice",
      price: "$29",
      period: "/moon",
      features: [
        "10 Magical Posts per month",
        "Basic Story Templates",
        "Community Guild Access",
        "Scroll Library",
      ],
      cta: "Begin Journey",
      tier: "bronze",
    },
    {
      name: "Knight",
      price: "$79",
      period: "/moon",
      popular: true,
      features: [
        "50 Legendary Posts per month",
        "Advanced Story Forge",
        "Custom Brand Voice",
        "Priority Quest Support",
        "Battle Analytics Dashboard",
        "Royal Template Collection",
      ],
      cta: "Join the Order",
      tier: "gold",
    },
    {
      name: "Archmage",
      price: "$199",
      period: "/moon",
      features: [
        "Unlimited Epic Content",
        "Full Marketing Sorcery",
        "Dedicated Wizard Advisor",
        "Custom Spell Integrations",
        "White-Label Enchantments",
        "24/7 Divine Support",
      ],
      cta: "Claim the Throne",
      tier: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-darker overflow-hidden">
      {/* Mystical Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/15 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-teal/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-brand-gold/20 fantasy-frame">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-gold via-brand-purple to-brand-teal rounded-lg golden-glow flex items-center justify-center text-2xl">
                📖
              </div>
              <span className="text-2xl font-display font-bold gradient-text">Frame Fables</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="text-sm text-brand-parchment/80 hover:text-brand-gold transition-colors font-serif"
              >
                Enter
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-brand-gold to-brand-goldDark hover:from-brand-goldLight hover:to-brand-gold text-brand-darker px-6 py-2 rounded-lg text-sm font-semibold transition-all golden-glow-hover font-display"
              >
                Begin Quest
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 scroll-card px-6 py-3 rounded-full mb-8 fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            <span className="text-sm text-brand-goldLight font-serif">Where Stories Become Legends</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">Frame Fables</span>
            <br />
            <span className="text-brand-parchment text-5xl md:text-6xl">Marketing Enchantments</span>
          </h1>

          <p className="text-xl md:text-2xl text-brand-parchment/70 max-w-3xl mx-auto mb-12 leading-relaxed font-serif fade-in-up" style={{ animationDelay: '0.2s' }}>
            Forge legendary campaigns with AI-powered storytelling.
            Transform your brand into an epic tale that captivates audiences and conquers markets.
          </p>

          <div className="flex gap-6 justify-center flex-wrap fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button className="group bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold hover:from-brand-goldLight hover:via-brand-gold hover:to-brand-goldLight text-brand-darker px-10 py-5 rounded-xl font-display font-bold text-lg transition-all golden-glow-hover shadow-2xl">
              Start Your Legend
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">⚔️</span>
            </button>
            <button className="scroll-card text-brand-parchment px-10 py-5 rounded-xl font-display font-semibold text-lg hover:border-brand-gold/50 transition-all">
              View Chronicles
            </button>
          </div>

          {/* Social Proof - Fantasy Style */}
          <div className="mt-20 flex items-center justify-center gap-12 flex-wrap text-sm">
            <div className="scroll-card px-6 py-4 rounded-lg">
              <div className="text-brand-gold font-display font-bold text-2xl">10,000+</div>
              <div className="text-brand-parchment/60 font-serif">Heroes Joined</div>
            </div>
            <div className="scroll-card px-6 py-4 rounded-lg">
              <div className="text-brand-gold font-display font-bold text-2xl">500K+</div>
              <div className="text-brand-parchment/60 font-serif">Tales Crafted</div>
            </div>
            <div className="scroll-card px-6 py-4 rounded-lg">
              <div className="text-brand-gold font-display font-bold text-2xl">4.9★</div>
              <div className="text-brand-parchment/60 font-serif">Legendary Rating</div>
            </div>
          </div>
        </section>

        {/* Ornate Divider */}
        <div className="container mx-auto px-4 my-16">
          <div className="ornate-divider"></div>
        </div>

        {/* Features - Storybook Style */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
              <span className="gradient-text">Artifacts of Power</span>
            </h2>
            <p className="text-xl text-brand-parchment/70 max-w-2xl mx-auto font-serif">
              Equip your marketing arsenal with legendary tools forged by ancient AI sorcery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="fantasy-frame p-8 rounded-2xl group hover:scale-105 transition-all duration-300"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform animate-pulse-glow">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-goldLight mb-4">
                  {feature.title}
                </h3>
                <p className="text-brand-parchment/80 leading-relaxed font-serif">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ornate Divider */}
        <div className="container mx-auto px-4 my-16">
          <div className="ornate-divider"></div>
        </div>

        {/* Pricing - Epic Tiers */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
              <span className="gradient-text">Choose Your Destiny</span>
            </h2>
            <p className="text-xl text-brand-parchment/70 font-serif">
              Select the path that matches your quest
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`scroll-card p-10 rounded-3xl transition-all duration-300 ${
                  plan.popular
                    ? "golden-glow scale-105 border-2 border-brand-gold/50"
                    : "hover:border-brand-gold/30"
                }`}
              >
                {plan.popular && (
                  <div className="inline-block bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-darker px-5 py-2 rounded-full text-xs font-display font-bold mb-6 golden-glow">
                    ⭐ MOST POPULAR ⭐
                  </div>
                )}

                <h3 className="text-3xl font-display font-black text-brand-gold mb-3">
                  {plan.name}
                </h3>

                <div className="mb-8">
                  <span className="text-6xl font-display font-black text-brand-parchment">
                    {plan.price}
                  </span>
                  <span className="text-brand-parchment/60 text-lg font-serif">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-brand-parchment/90 flex items-start gap-3 font-serif"
                    >
                      <span className="text-brand-gold text-2xl mt-1">⚡</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full py-4 rounded-xl font-display font-bold text-lg transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-darker golden-glow-hover"
                      : "scroll-card text-brand-parchment hover:border-brand-gold/50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Ornate Divider */}
        <div className="container mx-auto px-4 my-16">
          <div className="ornate-divider"></div>
        </div>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-24">
          <div className="fantasy-frame golden-glow p-16 rounded-3xl text-center max-w-5xl mx-auto">
            <div className="text-7xl mb-8 animate-pulse-glow">
              ⚔️ 🏰 📖
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8">
              <span className="gradient-text">Begin Your Epic Quest</span>
            </h2>
            <p className="text-2xl text-brand-parchment/80 mb-10 font-serif leading-relaxed">
              Join the fellowship of legendary brands crafting stories that echo through eternity
            </p>
            <button className="bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-darker px-14 py-6 rounded-xl font-display font-bold text-xl transition-all golden-glow-hover shadow-2xl hover:scale-105">
              Start Free Trial - No Gold Required ⚡
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-brand-gold/20 fantasy-frame py-16 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold via-brand-purple to-brand-teal rounded-lg golden-glow flex items-center justify-center text-2xl">
              📖
            </div>
            <span className="text-2xl font-display font-bold gradient-text">Frame Fables</span>
          </div>
          <p className="text-brand-parchment/50 font-serif text-sm">
            © MMXXIV Frame Fables. All legends reserved.
          </p>
          <p className="text-brand-parchment/30 font-serif text-xs mt-2">
            Forged with AI magic in the digital realm
          </p>
        </div>
      </footer>
    </div>
  );
}
