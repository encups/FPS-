'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏈</span>
              <h1 className="text-2xl font-bold text-emerald-400">
                Pay-to-Draft Fantasy
              </h1>
            </div>
            <div className="flex gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-slate-300 hover:text-white transition-colors px-4 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/50 rounded-full px-6 py-2 mb-6">
              <span className="text-sm text-emerald-400 font-semibold">
                ⚡ Pay to Play, Draft to Win ⚡
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Fantasy Football
            <br />
            <span className="text-emerald-400">With Real Stakes</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Create competitive fantasy football leagues where members must pay league dues before they can draft.
            No payment, no draft picks. Fair, secure, and transparent.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/leagues/create"
              className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl"
            >
              🏈 Create League
            </Link>
            <Link
              href="/leagues/join"
              className="bg-slate-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-600 transition-all"
            >
              Join League
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🏆',
                title: 'Commissioner Creates League',
                description:
                  'Set league dues, team count, roster settings, and draft date. Generate an invite code.',
              },
              {
                icon: '💳',
                title: 'Members Pay Dues',
                description:
                  'Members join via invite code and pay league dues securely through Stripe. Only paid members can draft.',
              },
              {
                icon: '🎯',
                title: 'Draft & Compete',
                description:
                  'Real-time snake draft with timer. Paid members draft their team. Unpaid members can only watch.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-emerald-500/50 transition-all"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-bold text-emerald-400 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-300 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-slate-800/30 py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center text-white mb-16">
              Platform Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: '🔒',
                  title: 'Secure Payments',
                  description: 'Stripe-powered checkout with webhook verification',
                },
                {
                  icon: '⚡',
                  title: 'Real-time Draft',
                  description: 'Live draft room with WebSocket updates',
                },
                {
                  icon: '🚫',
                  title: 'Draft Gating',
                  description: 'Server-side enforcement - unpaid users cannot draft',
                },
                {
                  icon: '🐍',
                  title: 'Snake Draft',
                  description: 'Automated snake order with pick timer',
                },
                {
                  icon: '🤖',
                  title: 'Auto-Pick',
                  description: 'Best available player when timer expires',
                },
                {
                  icon: '📊',
                  title: 'Roster Management',
                  description: 'Customizable roster settings per league',
                },
                {
                  icon: '💰',
                  title: 'Refund Protection',
                  description: 'Automatic draft access revocation on refund',
                },
                {
                  icon: '📝',
                  title: 'Audit Logs',
                  description: 'Complete activity tracking for transparency',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-emerald-400 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your League?
            </h3>
            <p className="text-xl text-emerald-50 mb-8">
              Create a competitive fantasy football league in minutes
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-emerald-100 mt-4">
              No monthly fees • Pay only league dues to draft
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏈</span>
            <span className="text-xl font-bold text-emerald-400">
              Pay-to-Draft Fantasy
            </span>
          </div>
          <p className="text-slate-400">
            © 2026 Pay-to-Draft Fantasy Football. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
