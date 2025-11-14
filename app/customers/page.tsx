"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CustomersPage() {
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
              Loved by 1,247+ Businesses
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-pixel text-2xl text-medieval-stone-dark max-w-3xl mx-auto mb-8"
            >
              Real businesses getting real results with AI-powered marketing content
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center gap-1 text-5xl mb-4">
              ⭐⭐⭐⭐⭐
            </motion.div>
            <motion.p variants={fadeInUp} className="font-pixel text-lg text-medieval-stone-dark">
              4.9/5 from 1,247 reviews
            </motion.p>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-medieval-cream py-16 relative z-10"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: "1,247+", label: "Active Businesses" },
                { number: "50,000+", label: "Posts Generated" },
                { number: "15hrs", label: "Avg. Time Saved/Week" },
                { number: "96%", label: "Customer Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="pixel-text text-4xl md:text-5xl text-medieval-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="font-pixel text-base text-medieval-ink">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="container mx-auto px-4 py-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="pixel-text text-4xl text-center text-medieval-gold mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-pixel text-xl text-center text-medieval-parchment mb-16"
          >
            Real results from real businesses
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
        </motion.section>

        {/* Trusted By */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
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
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-2">{company.logo}</div>
                  <div className="font-pixel text-sm text-medieval-stone-dark">
                    {company.name}
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
              Join 1,247+ Happy Customers
            </h3>
            <p className="font-pixel text-2xl text-medieval-parchment mb-8">
              Start your 7-day free trial today. No credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-block pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-10 py-4 pixel-text text-sm hover:bg-medieval-bronze transition-all"
            >
              Start Free Trial
            </Link>
            <p className="font-pixel text-base text-medieval-parchment mt-6">
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
