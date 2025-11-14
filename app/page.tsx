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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const contentExamples = [
    {
      type: "Social Media Post",
      platform: "LinkedIn",
      content: "🎯 Just launched our new product line!\n\nAfter 6 months of development, we're thrilled to introduce our eco-friendly packaging solution. Made from 100% recycled materials, helping businesses reduce their carbon footprint by 40%.\n\nReady to make your business more sustainable? Link in comments! 🌱\n\n#Sustainability #GreenBusiness #Innovation",
    },
    {
      type: "Email Subject Line",
      platform: "Email Campaign",
      content: "Sarah, your exclusive 20% discount expires tonight! ⏰\n\nAlternatives:\n• Don't miss out: Your personalized offer ends today\n• [URGENT] Your cart misses you (+ special gift inside)\n• We saved something special for you, Sarah",
    },
    {
      type: "Ad Copy",
      platform: "Facebook Ads",
      content: "Tired of spending hours on marketing?\n\n✨ Frame Fables writes your content in seconds\n⚡ 10x faster than hiring a copywriter\n💰 Save $2,000+/month on content creation\n\nJoin 1,200+ businesses automating their marketing.\n\n👉 Start Free Trial (No CC Required)",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner, Chen's Bakery",
      company: "Local Bakery Chain",
      avatar: "👩‍💼",
      content: "Frame Fables saved me 15 hours a week on social media. I went from struggling to post once a week to having a full content calendar. Sales are up 34%!",
      metric: "15 hrs/week saved",
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "Tech Startup",
      avatar: "👨‍💼",
      content: "The AI understands our brand voice perfectly. We've generated over 200 posts and our engagement rate doubled in just 2 months. Best investment we've made.",
      metric: "2x engagement",
    },
    {
      name: "Emily Thompson",
      role: "Founder",
      company: "E-commerce Store",
      avatar: "👩‍💻",
      content: "I was skeptical about AI writing, but Frame Fables proved me wrong. The content is creative, on-brand, and actually converts. Our email open rates are up 47%.",
      metric: "47% open rate increase",
    },
  ];

  const companies = [
    { name: "TechCo", logo: "🏢" },
    { name: "GreenLeaf", logo: "🌿" },
    { name: "BuildRight", logo: "🏗️" },
    { name: "FreshBites", logo: "🍽️" },
    { name: "StyleHub", logo: "👔" },
    { name: "WellnessPro", logo: "💪" },
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
            AI Marketing Content
            <br />
            <span className="text-medieval-parchment">In Seconds, Not Hours</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-pixel text-2xl text-medieval-stone max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Generate professional social posts, emails, and ads instantly. Save 15+ hours/week on content creation. Perfect for small businesses who need great marketing without the hefty price tag.
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
              ⚡ Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pixel-border medieval-shadow bg-transparent text-medieval-parchment px-8 py-4 pixel-text text-sm hover:bg-medieval-parchment/10 transition-all"
            >
              📖 See Examples
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Social Proof Metrics */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-medieval-parchment-light py-16 relative z-10"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: "1,247+", label: "Active Businesses" },
                { number: "50,000+", label: "Posts Generated" },
                { number: "15hrs", label: "Avg. Time Saved/Week" },
                { number: "4.9/5", label: "Customer Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="pixel-text text-3xl md:text-4xl text-medieval-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="font-pixel text-lg text-medieval-ink">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
            Everything You Need to Market Smarter
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

        {/* Content Examples */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="bg-medieval-cream py-20 relative z-10"
        >
          <div className="container mx-auto px-4">
            <motion.h3
              variants={fadeInUp}
              className="pixel-text text-3xl text-center text-medieval-ink mb-4"
            >
              See What Our AI Can Create
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-xl text-center text-medieval-stone-dark mb-16 max-w-2xl mx-auto"
            >
              Real examples of AI-generated content. Professional, engaging, and ready to use in seconds.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {contentExamples.map((example, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="pixel-border bg-white p-6 medieval-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="pixel-text text-sm text-medieval-gold">
                      {example.type}
                    </span>
                    <span className="font-pixel text-sm text-medieval-stone-dark">
                      {example.platform}
                    </span>
                  </div>
                  <div className="font-pixel text-base text-medieval-ink leading-relaxed whitespace-pre-line">
                    {example.content}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-medieval-gold/20">
                    <span className="font-pixel text-sm text-medieval-stone-dark">
                      ✨ Generated in 3.2 seconds
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pixel-border bg-medieval-gold text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
              >
                Try It Yourself - Free
              </motion.button>
            </motion.div>
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
            How It Works - Simple as 1-2-3
          </motion.h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Tell Us About Your Business",
                desc: "Input your business details, brand voice, and goals",
              },
              {
                step: "2",
                title: "Choose Your Content Type",
                desc: "Select from social posts, emails, ads, or blog content",
              },
              {
                step: "3",
                title: "AI Generates in Seconds",
                desc: "Get multiple variations, edit if needed, and publish",
              },
              {
                step: "4",
                title: "Track & Improve",
                desc: "See what works and let AI learn your preferences",
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

        {/* Trusted By Companies */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-medieval-parchment py-16 relative z-10"
        >
          <div className="container mx-auto px-4">
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-lg text-center text-medieval-stone-dark mb-12"
            >
              Trusted by forward-thinking businesses worldwide
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-12 max-w-5xl mx-auto">
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-2">{company.logo}</div>
                  <div className="font-pixel text-sm text-medieval-stone-dark">
                    {company.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20 bg-medieval-parchment-light relative z-10"
        >
          <motion.h3
            variants={fadeInUp}
            className="pixel-text text-3xl text-center text-medieval-ink mb-4"
          >
            Simple, Transparent Pricing
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="font-pixel text-xl text-center text-medieval-stone-dark mb-16"
          >
            All plans include 7-day free trial. No credit card required. Cancel anytime.
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

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="bg-medieval-cream py-20 relative z-10"
        >
          <div className="container mx-auto px-4">
            <motion.h3
              variants={fadeInUp}
              className="pixel-text text-3xl text-center text-medieval-ink mb-4"
            >
              What Our Customers Say
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-xl text-center text-medieval-stone-dark mb-16"
            >
              Real results from real businesses
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, rotateY: 5 }}
                  className="pixel-border bg-white p-8 medieval-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    <div>
                      <div className="pixel-text text-sm text-medieval-gold mb-1">
                        {testimonial.name}
                      </div>
                      <div className="font-pixel text-xs text-medieval-stone-dark">
                        {testimonial.role}
                      </div>
                      <div className="font-pixel text-xs text-medieval-stone-dark">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <p className="font-pixel text-base text-medieval-ink leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="pt-4 border-t-2 border-medieval-gold/20">
                    <span className="pixel-text text-xs text-medieval-gold">
                      📊 {testimonial.metric}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Star Rating */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <div className="text-4xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="font-pixel text-lg text-medieval-stone-dark">
                4.9/5 from 1,247 reviews
              </p>
            </motion.div>
          </div>
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
            <motion.h3
              variants={fadeInUp}
              className="pixel-text text-3xl text-center text-medieval-ink mb-4"
            >
              Frequently Asked Questions
            </motion.h3>
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
            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
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
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="font-pixel text-xs text-medieval-stone-dark">
                    {badge.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              Ready to Save 15+ Hours Per Week?
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-pixel text-2xl text-medieval-parchment mb-8"
            >
              Join 1,247+ businesses using AI to create better marketing content faster
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
