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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center">
                <span className="gallery-mono text-xs">FF</span>
              </div>
              <h1 className="gallery-display text-2xl text-gray-900">Frame Fables</h1>
            </div>
            <div className="flex gap-8 items-center">
              <Link
                href="/login"
                className="gallery-sans text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="gallery-button"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="gallery-mono text-xs text-gray-600 tracking-wider">
                AI-Powered Marketing Platform
              </span>
              <div className="minimal-divider"></div>
            </div>

            <h2 className="gallery-display hero-xl text-gray-900 mb-8">
              Turn Stories<br />
              Into Strategy
            </h2>

            <p className="gallery-serif text-2xl md:text-3xl text-gray-700 max-w-3xl mb-16 leading-relaxed">
              Frame Fables transforms your brand narrative into powerful marketing campaigns.
              <span className="text-gray-900"> AI-powered content generation meets timeless storytelling.</span>
            </p>

            <div className="flex gap-6 items-center flex-wrap mb-24">
              <button className="gallery-button">
                <span>Start Free Trial</span>
              </button>
              <button className="outline-button">
                <span>View Demo</span>
              </button>
            </div>

            {/* Featured Frame */}
            <div className="gallery-frame">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="border-accent-left">
                  <h3 className="gallery-mono text-xs mb-4">Content Generation</h3>
                  <p className="gallery-sans text-sm text-gray-600 leading-relaxed">
                    AI-crafted posts, emails, and campaigns in your brand voice
                  </p>
                </div>
                <div className="border-accent-left">
                  <h3 className="gallery-mono text-xs mb-4">Brand Storytelling</h3>
                  <p className="gallery-sans text-sm text-gray-600 leading-relaxed">
                    Weave compelling narratives that resonate with your audience
                  </p>
                </div>
                <div className="border-accent-left">
                  <h3 className="gallery-mono text-xs mb-4">Smart Automation</h3>
                  <p className="gallery-sans text-sm text-gray-600 leading-relaxed">
                    Schedule and deploy across all your marketing channels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-20">
                <span className="gallery-mono text-xs text-gray-600 tracking-wider">
                  Marketing Tools
                </span>
                <div className="minimal-divider"></div>
                <h3 className="gallery-display hero-lg text-gray-900 mt-8 mb-6">
                  Every Story Needs<br />The Right Tools
                </h3>
                <p className="gallery-sans text-lg text-gray-600 max-w-2xl">
                  Complete suite of AI-powered tools designed for modern storytellers
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="minimal-frame p-8 subtle-lift group"
                  >
                    <div className="text-4xl mb-6">{feature.icon}</div>
                    <h4 className="gallery-serif text-xl text-gray-900 mb-4">
                      {feature.title}
                    </h4>
                    <p className="gallery-sans text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <span className="gallery-mono text-xs text-gray-600 tracking-wider">
                How It Works
              </span>
              <div className="centered-divider"></div>
              <h3 className="gallery-display hero-lg text-gray-900 mt-8">
                From Blank Page<br />To Bestseller
              </h3>
            </div>

            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Define Your Narrative",
                  desc: "Tell us about your brand, voice, and audience. We build a narrative framework unique to you.",
                },
                {
                  step: "02",
                  title: "Select Your Channels",
                  desc: "Choose from social media, email, ads, blogs, and more. We adapt your story for each platform.",
                },
                {
                  step: "03",
                  title: "AI Generates Content",
                  desc: "Our AI creates authentic, on-brand content in seconds. Edit, refine, or use as-is.",
                },
                {
                  step: "04",
                  title: "Deploy & Measure",
                  desc: "Schedule posts, send campaigns, and track performance. Your story reaches the right audience.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="accent-frame group flex flex-col md:flex-row gap-8"
                >
                  <div className="md:w-32 flex-shrink-0">
                    <span className="gallery-mono text-6xl text-gray-300 group-hover:text-gray-900 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="gallery-serif text-2xl md:text-3xl text-gray-900 mb-4">
                      {item.title}
                    </h4>
                    <p className="gallery-sans text-base text-gray-600 leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gray-50 py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-20 text-center">
                <span className="gallery-mono text-xs text-gray-600 tracking-wider">
                  Pricing
                </span>
                <div className="centered-divider"></div>
                <h3 className="gallery-display hero-lg text-gray-900 mt-8 mb-6">
                  Choose Your Edition
                </h3>
                <p className="gallery-sans text-lg text-gray-600">
                  7-day free trial • No credit card required • Cancel anytime
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`contemporary-card ${
                      plan.popular
                        ? "border-2 border-gray-900 shadow-lg"
                        : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="mb-6">
                        <span className="gallery-mono text-xs bg-gray-900 text-white px-3 py-1">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    <h4 className="gallery-serif text-2xl text-gray-900 mb-2">
                      {plan.name}
                    </h4>
                    <div className="mb-8">
                      <span className="gallery-display text-5xl text-gray-900">
                        {plan.price}
                      </span>
                      <span className="gallery-sans text-sm text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="gallery-sans text-sm text-gray-600 flex items-start gap-3"
                        >
                          <span className="text-gray-900 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`w-full ${
                        plan.popular
                          ? "gallery-button"
                          : "outline-button"
                      }`}
                    >
                      <span>{plan.cta}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="gallery-frame text-center">
              <span className="gallery-mono text-xs text-gray-600 tracking-wider">
                Get Started Today
              </span>
              <div className="centered-divider"></div>
              <h3 className="gallery-display hero-lg text-gray-900 mt-8 mb-8">
                Ready to Frame<br />Your Success Story?
              </h3>
              <p className="gallery-sans text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of businesses transforming their marketing with AI-powered storytelling.
                Start your free trial today—no credit card required.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <button className="gallery-button">
                  <span>Start Free Trial</span>
                </button>
                <button className="outline-button">
                  <span>Schedule Demo</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center">
                    <span className="gallery-mono text-xs">FF</span>
                  </div>
                  <h3 className="gallery-display text-2xl text-gray-900">Frame Fables</h3>
                </div>
                <p className="gallery-sans text-sm text-gray-600 max-w-xs leading-relaxed">
                  Where stories become strategies. AI-powered marketing for modern storytellers.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="gallery-mono text-xs mb-4">Product</h4>
                  <ul className="space-y-2 gallery-sans text-sm text-gray-600">
                    <li><a href="#" className="hover:text-gray-900">Features</a></li>
                    <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                    <li><a href="#" className="hover:text-gray-900">Use Cases</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="gallery-mono text-xs mb-4">Company</h4>
                  <ul className="space-y-2 gallery-sans text-sm text-gray-600">
                    <li><a href="#" className="hover:text-gray-900">About</a></li>
                    <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                    <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="gallery-mono text-xs mb-4">Legal</h4>
                  <ul className="space-y-2 gallery-sans text-sm text-gray-600">
                    <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                    <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                    <li><a href="#" className="hover:text-gray-900">Security</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8">
              <p className="gallery-sans text-xs text-gray-500 text-center">
                © 2024 Frame Fables. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
