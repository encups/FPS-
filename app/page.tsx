"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation */}
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
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Trusted by 1,247+ businesses
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Create Marketing Content
              <br />
              <span className="text-primary-600">10x Faster with AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Generate professional social posts, emails, and ads in seconds. Save 15+ hours per week and never face writer&apos;s block again.
            </p>

            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Link href="/signup" className="btn-primary">
                Start Free Trial →
              </Link>
              <Link href="/examples" className="btn-secondary">
                See Examples
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </motion.div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-24">
            {[
              { stat: "1,247+", label: "Active Users" },
              { stat: "50,000+", label: "Posts Generated" },
              { stat: "15hrs", label: "Saved Per Week" },
              { stat: "4.9★", label: "Customer Rating" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">{item.stat}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
              Everything you need to scale your marketing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Content",
                  desc: "Generate professional social posts, emails, and ads instantly with GPT-4.",
                  icon: "⚡",
                },
                {
                  title: "Save Time & Money",
                  desc: "15+ hours saved per week. Replace expensive copywriters and agencies.",
                  icon: "💰",
                },
                {
                  title: "Always On-Brand",
                  desc: "AI learns your brand voice and maintains consistency across all content.",
                  icon: "🎯",
                },
              ].map((feature, i) => (
                <div key={i} className="card text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              &ldquo;Frame Fables saved me 15 hours a week. Sales are up 34% and I finally have time to focus on my business instead of social media.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                👩‍💼
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-sm text-gray-600">Owner, Chen&apos;s Bakery</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to save 15+ hours per week?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,247+ businesses creating better content faster
            </p>
            <Link href="/signup" className="inline-block bg-white text-primary-600 px-12 py-5 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-2xl">
              Start Free Trial →
            </Link>
            <p className="text-sm mt-6 opacity-75">
              No credit card required • 7-day free trial
            </p>
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
