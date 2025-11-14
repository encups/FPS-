"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest relative overflow-hidden">
      {/* 3D Background Scene */}
      <HeroScene />

      {/* Hero Section */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b-4 border-medieval-gold bg-black/50 backdrop-blur relative z-10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏰</span>
              <h1 className="pixel-text text-xl text-medieval-gold">Frame Fables</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="pixel-text text-sm text-medieval-parchment hover:text-medieval-gold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="pixel-border pixel-text bg-medieval-gold text-medieval-ink px-4 py-2 text-sm hover:bg-medieval-bronze transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 py-20 text-center"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-8">
            <div className="inline-block pixel-border bg-medieval-gold/10 px-4 py-2 mb-6">
              <span className="pixel-text text-sm text-medieval-gold">
                ⚡ AI-Powered Marketing Magic ⚡
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pixel-text text-4xl md:text-6xl text-medieval-gold mb-6 leading-relaxed"
          >
            Conquer Your Market
            <br />
            <span className="text-medieval-parchment">One Fable at a Time</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-pixel text-2xl text-medieval-stone max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Automated AI marketing tools for small businesses, wrapped in medieval charm.
            Generate content, run campaigns, and grow your kingdom... err, business!
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              🗡️ Start Your Quest
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pixel-border medieval-shadow bg-transparent text-medieval-parchment px-8 py-4 pixel-text text-sm hover:bg-medieval-parchment/10 transition-all"
            >
              📖 View Demo
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h3
            variants={fadeInUp}
            className="pixel-text text-3xl text-center text-medieval-gold mb-16"
          >
            ⚔️ Your Marketing Arsenal ⚔️
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="pixel-border medieval-shadow bg-medieval-stone/10 p-6 hover:bg-medieval-stone/20 transition-all cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h4 className="pixel-text text-lg text-medieval-gold mb-3">
                  {feature.title}
                </h4>
                <p className="font-pixel text-xl text-medieval-parchment">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h3
            variants={fadeInUp}
            className="pixel-text text-3xl text-center text-medieval-gold mb-16"
          >
            🗺️ The Quest Begins 🗺️
          </motion.h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Enter Your Kingdom",
                desc: "Tell us about your business and brand",
              },
              {
                step: "2",
                title: "Choose Your Weapons",
                desc: "Select marketing tools and templates",
              },
              {
                step: "3",
                title: "AI Crafts Your Tale",
                desc: "Our AI generates content in seconds",
              },
              {
                step: "4",
                title: "Conquer the Market",
                desc: "Deploy campaigns and watch results",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 pixel-border bg-black/30 p-6 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="pixel-border bg-medieval-gold text-medieval-ink w-16 h-16 flex items-center justify-center flex-shrink-0"
                >
                  <span className="pixel-text text-2xl">{item.step}</span>
                </motion.div>
                <div>
                  <h4 className="pixel-text text-xl text-medieval-gold mb-2">
                    {item.title}
                  </h4>
                  <p className="font-pixel text-xl text-medieval-parchment">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h3
            variants={fadeInUp}
            className="pixel-text text-3xl text-center text-medieval-gold mb-4"
          >
            💰 Choose Your Path 💰
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="font-pixel text-xl text-center text-medieval-stone mb-16"
          >
            All plans include 7-day free trial. Cancel anytime.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
                className={`pixel-border medieval-shadow p-8 transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-medieval-gold/20 border-medieval-gold"
                    : "bg-medieval-stone/10"
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
                <h4 className="pixel-text text-2xl text-medieval-gold mb-4">
                  {plan.name}
                </h4>
                <div className="mb-6">
                  <span className="pixel-text text-4xl text-medieval-parchment">
                    {plan.price}
                  </span>
                  <span className="font-pixel text-xl text-medieval-stone">
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
                      className="font-pixel text-lg text-medieval-parchment flex items-start gap-2"
                    >
                      <span className="text-medieval-gold">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => setSelectedPlan(plan.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full pixel-border bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pixel-border medieval-shadow bg-gradient-to-r from-medieval-gold/20 to-medieval-bronze/20 p-12 text-center max-w-4xl mx-auto"
          >
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pixel-text text-3xl text-medieval-gold mb-6"
            >
              🏰 Ready to Build Your Empire? 🏰
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-pixel text-2xl text-medieval-parchment mb-8"
            >
              Join thousands of small businesses conquering their markets with AI
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.6 }}
              className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-pixel text-lg text-medieval-stone mt-4"
            >
              No credit card required • 7-day free trial
            </motion.p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t-4 border-medieval-gold bg-black/50 py-12 relative z-10"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-3xl">🏰</span>
            <span className="pixel-text text-xl text-medieval-gold">Frame Fables</span>
          </motion.div>
          <p className="font-pixel text-lg text-medieval-stone">
            © 2024 Frame Fables. All rights reserved to the realm.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
