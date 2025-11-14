"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest">
      <Navigation />

      <main className="pt-24">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-medieval-parchment-light py-20 relative z-10"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              variants={fadeInUp}
              className="pixel-text text-5xl md:text-6xl text-medieval-ink mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-2xl text-medieval-stone-dark max-w-3xl mx-auto mb-4"
            >
              Choose the plan that fits your business needs
            </motion.p>
            <motion.p variants={fadeInUp} className="font-pixel text-lg text-medieval-stone-dark">
              All plans include 7-day free trial • No credit card required • Cancel anytime
            </motion.p>
          </div>
        </motion.section>

        {/* Pricing Cards */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20 bg-medieval-cream relative z-10"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                transition={{ duration: 0.3 }}
                className={`pixel-border medieval-shadow p-8 transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-medieval-gold/20 border-medieval-gold"
                    : "bg-white"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="pixel-border bg-medieval-gold text-medieval-ink px-4 py-2 mb-4 text-center"
                  >
                    <span className="pixel-text text-xs">⭐ MOST POPULAR ⭐</span>
                  </motion.div>
                )}
                <h3 className="pixel-text text-3xl text-medieval-gold mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="pixel-text text-5xl text-medieval-ink">
                    {plan.price}
                  </span>
                  <span className="font-pixel text-xl text-medieval-stone-dark">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="font-pixel text-base text-medieval-ink flex items-start gap-2"
                    >
                      <span className="text-medieval-gold text-xl">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => setSelectedPlan(plan.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full pixel-border bg-medieval-gold text-medieval-ink px-6 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
          >
            {[
              { icon: "🔒", label: "256-bit Encryption" },
              { icon: "✅", label: "GDPR Compliant" },
              { icon: "🛡️", label: "SOC 2 Certified" },
              { icon: "💳", label: "Secure Payments" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-pixel text-sm text-medieval-stone-dark">
                  {badge.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="bg-medieval-parchment-light py-20 relative z-10"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.h2
              variants={fadeInUp}
              className="pixel-text text-4xl text-center text-medieval-ink mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-xl text-center text-medieval-stone-dark mb-16"
            >
              Everything you need to know
            </motion.p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="pixel-border bg-white overflow-hidden"
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    whileHover={{ backgroundColor: "#F0E5D8" }}
                    className="w-full text-left p-6 flex items-center justify-between transition-colors"
                  >
                    <span className="pixel-text text-sm text-medieval-gold pr-4">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl text-medieval-gold flex-shrink-0"
                    >
                      {openFaq === index ? "−" : "+"}
                    </motion.span>
                  </motion.button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 font-pixel text-lg text-medieval-ink leading-relaxed border-t-2 border-medieval-gold/20 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-4 py-20"
        >
          <div className="pixel-border medieval-shadow bg-gradient-to-r from-medieval-gold/20 to-medieval-bronze/20 p-12 text-center max-w-4xl mx-auto">
            <h3 className="pixel-text text-3xl text-medieval-gold mb-6">
              Still Have Questions?
            </h3>
            <p className="font-pixel text-2xl text-medieval-parchment mb-8">
              See examples of what you can create or talk to our team
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/examples"
                className="inline-block pixel-border bg-white text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-parchment transition-all"
              >
                View Examples
              </Link>
              <Link
                href="/signup"
                className="inline-block pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
