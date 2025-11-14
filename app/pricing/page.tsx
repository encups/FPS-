"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "10 AI-generated posts/month",
        "Basic email campaigns",
        "All content types",
        "Community support",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "50 AI-generated posts/month",
        "Advanced email automation",
        "Custom brand voice training",
        "Priority support",
        "Ad copy generation",
        "Analytics dashboard",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Business",
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
      cta: "Start Free Trial",
    },
  ];

  const faqs = [
    {
      question: "How does the AI content generation work?",
      answer: "Our AI is powered by GPT-4 and trained specifically on marketing content. Simply input your business details, choose your content type, and our AI generates professional copy in seconds. You can edit and refine until it's perfect.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level 256-bit encryption for all data. Your business information and content are never shared with third parties. We're GDPR compliant and SOC 2 certified.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! There are no long-term contracts. You can cancel your subscription at any time from your dashboard. If you cancel, you'll retain access until the end of your billing period.",
    },
    {
      question: "What if I don't like the generated content?",
      answer: "Our AI generates multiple variations for each request, and you can regenerate unlimited times. Plus, you have full editing control. If you're not satisfied within the first 7 days, we offer a full money-back guarantee.",
    },
    {
      question: "Do I need any technical skills?",
      answer: "Not at all! Frame Fables is designed for non-technical users. If you can use email, you can use our platform. We also offer free onboarding support to help you get started.",
    },
    {
      question: "What platforms does Frame Fables support?",
      answer: "We support all major platforms including Facebook, Instagram, LinkedIn, Twitter, email campaigns, blog posts, Google Ads, and more. New integrations are added monthly based on user requests.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Frame Fables
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 font-medium">
              Features
            </Link>
            <Link href="/examples" className="text-gray-600 hover:text-gray-900 font-medium">
              Examples
            </Link>
            <Link href="/pricing" className="text-primary-600 font-medium">
              Pricing
            </Link>
            <Link href="/customers" className="text-gray-600 hover:text-gray-900 font-medium">
              Customers
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Choose the plan that fits your business needs
            </p>
            <p className="text-sm text-gray-500">
              All plans include 7-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border p-8 transition-all ${
                    plan.popular
                      ? "border-primary-600 shadow-2xl shadow-primary-600/20 scale-105"
                      : "border-gray-100 hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-lg mb-4 text-center text-sm font-bold">
                      ⭐ MOST POPULAR ⭐
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-600">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-primary-600 text-xl">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`w-full block text-center px-6 py-4 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-12 mt-16">
              {[
                { icon: "🔒", label: "256-bit Encryption" },
                { icon: "✅", label: "GDPR Compliant" },
                { icon: "🛡️", label: "SOC 2 Certified" },
                { icon: "💳", label: "Secure Payments" },
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-sm text-gray-600">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16">
              Everything you need to know
            </p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-primary-600 flex-shrink-0">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See examples of what you can create or start your free trial
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/examples" className="btn-secondary">
                View Examples
              </Link>
              <Link href="/signup" className="btn-primary">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
            <p>© 2024 Frame Fables. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
