"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const features = [
    {
      icon: "✨",
      title: "AI-Powered Content",
      description: "Generate engaging social media posts, emails, and ad copy in seconds with advanced AI storytelling",
    },
    {
      icon: "📊",
      title: "Campaign Analytics",
      description: "Track performance with real-time insights and data-driven recommendations",
    },
    {
      icon: "🎯",
      title: "Brand Voice",
      description: "Maintain consistent brand storytelling across all your marketing channels",
    },
    {
      icon: "⚡",
      title: "Automation",
      description: "Schedule and automate your content pipeline for maximum efficiency",
    },
    {
      icon: "🎨",
      title: "Design Tools",
      description: "Create stunning visuals and banners with built-in design templates",
    },
    {
      icon: "🔗",
      title: "Integrations",
      description: "Connect with your favorite tools and platforms seamlessly",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "10 AI-generated posts/month",
        "Basic email campaigns",
        "Standard templates",
        "Community support",
      ],
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "50 AI-generated posts/month",
        "Advanced automation",
        "Custom brand voice",
        "Priority support",
        "Ad copy generation",
        "Analytics dashboard",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited AI content",
        "Full marketing automation",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "24/7 Premium support",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-darker via-brand-dark to-brand-darker">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-brand-dark/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg" />
              <span className="text-xl font-bold gradient-text">Frame Fables</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all glow-hover"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="text-sm text-gray-300">AI-Powered Marketing Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Transform Your Marketing</span>
            <br />
            <span className="text-white">With AI Storytelling</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Create compelling content, run powerful campaigns, and grow your brand with
            AI-powered marketing tools designed for modern businesses.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="group bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all glow-hover">
              Start Free Trial
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="glass glass-hover text-white px-8 py-4 rounded-lg font-medium text-lg">
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap text-sm text-gray-500">
            <div>
              <span className="text-white font-semibold">10,000+</span> Active Users
            </div>
            <div>
              <span className="text-white font-semibold">500K+</span> Posts Generated
            </div>
            <div>
              <span className="text-white font-semibold">4.9/5</span> Rating
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Everything You Need</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools to create, manage, and optimize your marketing campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass glass-hover p-8 rounded-2xl group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Simple, Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">
              Choose the perfect plan for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`glass p-8 rounded-2xl transition-all ${
                  plan.popular
                    ? "glow border-brand-primary scale-105"
                    : "glass-hover"
                }`}
              >
                {plan.popular && (
                  <div className="inline-block bg-brand-primary text-white px-4 py-1 rounded-full text-xs font-medium mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 flex items-start gap-3"
                    >
                      <span className="text-brand-primary text-xl">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? "bg-brand-primary hover:bg-brand-primary/90 text-white glow-hover"
                      : "glass glass-hover text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-24">
          <div className="glass glow p-12 rounded-3xl text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Ready to Transform</span>
              <br />
              <span className="text-white">Your Marketing?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of businesses using AI to create better content
            </p>
            <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-4 rounded-lg font-medium text-lg transition-all glow-hover">
              Start Free Trial - No Credit Card Required
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-brand-dark/50 backdrop-blur-xl py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg" />
            <span className="text-xl font-bold gradient-text">Frame Fables</span>
          </div>
          <p className="text-gray-500">
            © 2024 Frame Fables. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
