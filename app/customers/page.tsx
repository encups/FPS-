"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomersPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner",
      company: "Chen's Bakery",
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
    {
      name: "David Kim",
      role: "CEO",
      company: "Software Company",
      avatar: "👨‍💼",
      content: "We used to outsource our content for $3,000/month. Frame Fables does better work for a fraction of the cost. ROI was immediate.",
      metric: "85% cost savings",
    },
    {
      name: "Lisa Martinez",
      role: "Social Media Manager",
      company: "Fashion Brand",
      avatar: "👩‍💼",
      content: "Managing 5 social accounts was overwhelming. Now I can plan a month of content in an afternoon. My boss thinks I hired an assistant!",
      metric: "5x productivity",
    },
    {
      name: "James Wilson",
      role: "Owner",
      company: "Consulting Firm",
      avatar: "👨‍💼",
      content: "The content quality is indistinguishable from what we paid copywriters $200/hour for. And it's ready in seconds, not days.",
      metric: "$8K saved monthly",
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
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
              Pricing
            </Link>
            <Link href="/customers" className="text-primary-600 font-medium">
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
              Loved by 1,247+ Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Real businesses getting real results with AI-powered marketing content
            </p>
            <div className="flex justify-center gap-1 text-5xl mb-4">
              ⭐⭐⭐⭐⭐
            </div>
            <p className="text-lg text-gray-600">
              4.9/5 from 1,247 reviews
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "1,247+", label: "Active Businesses" },
                { number: "50,000+", label: "Posts Generated" },
                { number: "15hrs", label: "Avg. Time Saved/Week" },
                { number: "96%", label: "Customer Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-base text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16">
              Real results from real businesses
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-primary-600">
                      📊 {testimonial.metric}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-lg text-center text-gray-600 mb-12">
              Trusted by forward-thinking businesses worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {companies.map((company, i) => (
                <div key={i} className="text-center">
                  <div className="text-6xl mb-2">{company.logo}</div>
                  <div className="text-sm text-gray-600">
                    {company.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join 1,247+ Happy Customers
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start your 7-day free trial today. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="btn-primary">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="btn-secondary">
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
