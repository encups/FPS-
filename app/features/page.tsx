"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FeaturesPage() {
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

  const features = [
    {
      icon: "⚔️",
      title: "Social Media Content",
      description: "Create engaging posts for Facebook, Instagram, LinkedIn, and Twitter. Perfect tone, hashtags, and calls-to-action every time.",
    },
    {
      icon: "📜",
      title: "Email Campaigns",
      description: "Write compelling subject lines, body copy, and CTAs that get opened and clicked. Personalized for your audience.",
    },
    {
      icon: "🏰",
      title: "Ad Copy",
      description: "Generate high-converting ad copy for Google, Facebook, and Instagram ads. A/B test variations instantly.",
    },
    {
      icon: "🎨",
      title: "Blog Posts",
      description: "Long-form content that ranks on Google. SEO-optimized, well-structured, and engaging from start to finish.",
    },
    {
      icon: "📖",
      title: "Product Descriptions",
      description: "Sell more with compelling product copy. Highlight benefits, overcome objections, and drive conversions.",
    },
    {
      icon: "🎯",
      title: "Marketing Strategy",
      description: "Get AI-powered recommendations for campaigns, content calendars, and growth strategies tailored to your business.",
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
              Everything You Need
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-2xl text-medieval-stone-dark max-w-3xl mx-auto mb-12"
            >
              From social media to email campaigns, Frame Fables handles all your marketing content needs in one platform.
            </motion.p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="pixel-border medieval-shadow bg-medieval-stone/10 p-8 hover:bg-medieval-stone/20 transition-all cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="pixel-text text-xl text-medieval-gold mb-4">
                  {feature.title}
                </h3>
                <p className="font-pixel text-lg text-medieval-parchment leading-relaxed">
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
          className="bg-medieval-cream py-20 relative z-10"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              className="pixel-text text-4xl text-center text-medieval-ink mb-16"
            >
              How It Works
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  step: "1",
                  title: "Tell Us About Your Business",
                  desc: "Input your business details, brand voice, target audience, and marketing goals. The more context you provide, the better your content.",
                },
                {
                  step: "2",
                  title: "Choose Your Content Type",
                  desc: "Select from social posts, emails, ads, blog posts, or product descriptions. Pick your platform and content format.",
                },
                {
                  step: "3",
                  title: "AI Generates Multiple Options",
                  desc: "Get 3-5 variations instantly. Each option is unique, on-brand, and ready to use. Edit if needed or regenerate for more.",
                },
                {
                  step: "4",
                  title: "Publish & Track Results",
                  desc: "Copy to your platform or schedule directly. See what performs best and let the AI learn your preferences over time.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 pixel-border bg-white p-8 cursor-pointer medieval-shadow"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="pixel-border bg-medieval-gold text-medieval-ink w-20 h-20 flex items-center justify-center flex-shrink-0"
                  >
                    <span className="pixel-text text-3xl">{item.step}</span>
                  </motion.div>
                  <div>
                    <h4 className="pixel-text text-2xl text-medieval-ink mb-3">
                      {item.title}
                    </h4>
                    <p className="font-pixel text-lg text-medieval-stone-dark leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
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
              Ready to Try It?
            </h3>
            <p className="font-pixel text-2xl text-medieval-parchment mb-8">
              See real examples of AI-generated content
            </p>
            <Link
              href="/examples"
              className="inline-block pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              View Examples
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
