"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ExamplesPage() {
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
            <Link href="/examples" className="text-primary-600 font-medium">
              Examples
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
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
              See What AI Can Create
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Real examples of AI-generated marketing content. Professional, engaging, and ready to use.
            </p>
            <p className="text-sm text-gray-500">
              All content generated in under 5 seconds
            </p>
          </motion.div>
        </section>

        {/* Examples Grid */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentExamples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-primary-600">
                      {example.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {example.platform}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line min-h-[240px] mb-6">
                    {example.content}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      ✨ Generated in 3.2 seconds
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Why Frame Fables Content Works
            </h2>
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
              ].map((item, i) => (
                <div key={i} className="text-center card">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-600 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Your Own?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your 7-day free trial. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block bg-white text-primary-600 px-12 py-5 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-2xl"
              >
                Start Free Trial →
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-primary-700 text-white px-12 py-5 rounded-lg font-bold text-lg hover:bg-primary-800 transition-colors border-2 border-white/20"
              >
                See Pricing
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
