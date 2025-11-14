"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ExamplesPage() {
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
      type: "Facebook Ad",
      platform: "Facebook Ads",
      content: "Tired of spending hours on marketing?\n\n✨ Frame Fables writes your content in seconds\n⚡ 10x faster than hiring a copywriter\n💰 Save $2,000+/month on content creation\n\nJoin 1,200+ businesses automating their marketing.\n\n👉 Start Free Trial (No CC Required)",
    },
    {
      type: "Blog Post Intro",
      platform: "Website Blog",
      content: "5 Marketing Mistakes That Are Costing You Sales (And How to Fix Them)\n\nYou're posting on social media. You're sending emails. You're running ads. But your sales aren't growing. What's going wrong?\n\nAfter analyzing 500+ small business marketing campaigns, we discovered these 5 critical mistakes that kill conversions...",
    },
    {
      type: "Product Description",
      platform: "E-commerce",
      content: "Organic Cotton Baby Blanket - Cloud Soft & Hypoallergenic\n\nGive your little one the comfort they deserve. Our GOTS-certified organic cotton blanket is so soft, it's like wrapping them in a cloud.\n\n✓ 100% organic cotton (no chemicals or pesticides)\n✓ Hypoallergenic - perfect for sensitive skin\n✓ Machine washable - stays soft wash after wash\n✓ Breathable weave keeps baby comfortable year-round",
    },
    {
      type: "Instagram Caption",
      platform: "Instagram",
      content: "Morning coffee hits different when you know your work is done ☕✨\n\nLet AI handle your marketing content while you focus on what you love. No more writer's block, no more scrambling for post ideas.\n\nJust good coffee and peace of mind.\n\n#SmallBusinessOwner #MarketingMadeEasy #EntrepreneurLife #ContentCreation",
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
              See What AI Can Create
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-2xl text-medieval-stone-dark max-w-3xl mx-auto mb-8"
            >
              Real examples of AI-generated marketing content. Professional, engaging, and ready to use in seconds.
            </motion.p>
            <motion.p variants={fadeInUp} className="font-pixel text-lg text-medieval-stone-dark">
              All content generated in under 5 seconds
            </motion.p>
          </div>
        </motion.section>

        {/* Examples Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="bg-medieval-cream py-20 relative z-10"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {contentExamples.map((example, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="pixel-border bg-white p-6 medieval-shadow"
                >
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-medieval-gold/20">
                    <span className="pixel-text text-sm text-medieval-gold">
                      {example.type}
                    </span>
                    <span className="font-pixel text-xs text-medieval-stone-dark">
                      {example.platform}
                    </span>
                  </div>
                  <div className="font-pixel text-base text-medieval-ink leading-relaxed whitespace-pre-line min-h-[240px]">
                    {example.content}
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-medieval-gold/20">
                    <span className="font-pixel text-xs text-medieval-stone-dark">
                      ✨ Generated in 3.2 seconds
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Highlight */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="pixel-text text-4xl text-center text-medieval-gold mb-16"
          >
            Why Frame Fables Content Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "On-Brand Every Time",
                desc: "AI learns your brand voice and maintains consistency across all content",
              },
              {
                icon: "⚡",
                title: "Multiple Variations",
                desc: "Get 3-5 unique options per request. Pick your favorite or regenerate",
              },
              {
                icon: "✏️",
                title: "Fully Editable",
                desc: "Use as-is or make quick edits. You have complete control",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center pixel-border bg-medieval-stone/10 p-8"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="pixel-text text-lg text-medieval-gold mb-3">{item.title}</h3>
                <p className="font-pixel text-base text-medieval-parchment">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-medieval-parchment-light py-20 relative z-10"
        >
          <div className="container mx-auto px-4 text-center">
            <h3 className="pixel-text text-4xl text-medieval-ink mb-6">
              Ready to Create Your Own?
            </h3>
            <p className="font-pixel text-2xl text-medieval-stone-dark mb-8 max-w-2xl mx-auto">
              Start your 7-day free trial. No credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-block pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              Start Free Trial
            </Link>
            <p className="font-pixel text-base text-medieval-stone-dark mt-6">
              or{" "}
              <Link href="/pricing" className="text-medieval-gold hover:underline">
                see pricing
              </Link>
            </p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
