"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest relative overflow-hidden">
      {/* 3D Background Scene */}
      <HeroScene />

      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 py-32 text-center min-h-[80vh] flex flex-col justify-center"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-8">
            <div className="inline-block pixel-border bg-medieval-gold/10 px-4 py-2 mb-6">
              <span className="pixel-text text-sm text-medieval-gold">
                ⚡ AI-Powered Marketing Magic ⚡
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pixel-text text-5xl md:text-7xl text-medieval-gold mb-6 leading-relaxed"
          >
            AI Marketing Content
            <br />
            <span className="text-medieval-parchment">In Seconds, Not Hours</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-pixel text-2xl md:text-3xl text-medieval-stone max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Generate professional social posts, emails, and ads instantly. Save 15+ hours/week on content creation.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-5 pixel-text text-base hover:bg-medieval-bronze transition-all inline-block"
              >
                ⚡ Start Free Trial
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/examples"
                className="pixel-border medieval-shadow bg-transparent text-medieval-parchment px-10 py-5 pixel-text text-base hover:bg-medieval-parchment/10 transition-all inline-block"
              >
                📖 See Examples
              </Link>
            </motion.div>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-pixel text-base text-medieval-stone mt-8"
          >
            No credit card required • 7-day free trial • Cancel anytime
          </motion.p>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
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
                  <div className="pixel-text text-4xl md:text-5xl text-medieval-gold mb-2">
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

        {/* Value Propositions - Quick Links */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="pixel-text text-4xl text-center text-medieval-gold mb-16"
          >
            Everything You Need to Market Smarter
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "⚔️",
                title: "Powerful Features",
                desc: "Social media, emails, ads, blogs - all your content needs in one platform",
                link: "/features",
                cta: "Explore Features",
              },
              {
                icon: "📖",
                title: "See It In Action",
                desc: "Real examples of AI-generated content that actually works",
                link: "/examples",
                cta: "View Examples",
              },
              {
                icon: "💰",
                title: "Simple Pricing",
                desc: "Plans for every business size. Start free, upgrade when you're ready",
                link: "/pricing",
                cta: "View Pricing",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="pixel-border medieval-shadow bg-medieval-stone/10 p-8 hover:bg-medieval-stone/20 transition-all"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="pixel-text text-2xl text-medieval-gold mb-4">
                  {item.title}
                </h3>
                <p className="font-pixel text-lg text-medieval-parchment mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  href={item.link}
                  className="inline-block pixel-border bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
                >
                  {item.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Proof Highlight */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-medieval-cream py-20 relative z-10"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="font-pixel text-2xl text-medieval-ink mb-2">
                4.9/5 from 1,247 reviews
              </p>
              <p className="font-pixel text-lg text-medieval-stone-dark">
                See why businesses love Frame Fables
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                href="/customers"
                className="inline-block pixel-border bg-medieval-gold text-medieval-ink px-8 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-colors"
              >
                Read Customer Stories →
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-4 py-20"
        >
          <div className="pixel-border medieval-shadow bg-gradient-to-r from-medieval-gold/20 to-medieval-bronze/20 p-12 md:p-16 text-center max-w-4xl mx-auto">
            <h3 className="pixel-text text-4xl text-medieval-gold mb-6">
              Ready to Save 15+ Hours Per Week?
            </h3>
            <p className="font-pixel text-2xl text-medieval-parchment mb-8">
              Join 1,247+ businesses using AI to create better marketing content faster
            </p>
            <Link
              href="/signup"
              className="inline-block pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-12 py-5 pixel-text text-base hover:bg-medieval-bronze transition-all"
            >
              Start Free Trial
            </Link>
            <p className="font-pixel text-base text-medieval-stone mt-6">
              No credit card required • 7-day free trial
            </p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
