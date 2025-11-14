"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Frame Fables
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-primary-600 font-medium">
              Features
            </Link>
            <Link href="/examples" className="text-gray-600 hover:text-gray-900 font-medium">
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
              Everything You Need to Scale Your Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Powerful AI-driven tools to create professional marketing content in seconds
            </p>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "📱",
                  title: "Social Media Content",
                  description: "Create engaging posts for Facebook, Instagram, LinkedIn, and Twitter with perfect tone and hashtags.",
                },
                {
                  icon: "✉️",
                  title: "Email Campaigns",
                  description: "Write compelling subject lines and body copy that get opened and clicked. Personalized for your audience.",
                },
                {
                  icon: "📢",
                  title: "Ad Copy",
                  description: "Generate high-converting ad copy for Google, Facebook, and Instagram ads. A/B test variations instantly.",
                },
                {
                  icon: "📝",
                  title: "Blog Posts",
                  description: "Long-form content that ranks on Google. SEO-optimized, well-structured, and engaging.",
                },
                {
                  icon: "🛍️",
                  title: "Product Descriptions",
                  description: "Sell more with compelling product copy that highlights benefits and drives conversions.",
                },
                {
                  icon: "📊",
                  title: "Marketing Strategy",
                  description: "Get AI-powered recommendations for campaigns and content calendars tailored to your business.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              How It Works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Tell Us About Your Business",
                  desc: "Input your business details, brand voice, and target audience. The more context, the better your content.",
                },
                {
                  step: "2",
                  title: "Choose Your Content Type",
                  desc: "Select from social posts, emails, ads, blog posts, or product descriptions.",
                },
                {
                  step: "3",
                  title: "AI Generates Multiple Options",
                  desc: "Get 3-5 variations instantly. Each option is unique, on-brand, and ready to use.",
                },
                {
                  step: "4",
                  title: "Publish & Track Results",
                  desc: "Copy to your platform or schedule directly. See what performs best.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-primary-600 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Why Frame Fables?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Save 15+ Hours Per Week",
                  desc: "Stop spending hours on content creation. Generate professional copy in seconds.",
                },
                {
                  title: "Always On-Brand",
                  desc: "AI learns your brand voice and maintains consistency across all content.",
                },
                {
                  title: "Proven Results",
                  desc: "1,247+ businesses using Frame Fables have seen average engagement increase of 2x.",
                },
              ].map((benefit, i) => (
                <div key={i} className="text-center text-white">
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="opacity-90">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to see it in action?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              View real examples of AI-generated content
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/examples" className="btn-primary">
                View Examples
              </Link>
              <Link href="/signup" className="btn-secondary">
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
