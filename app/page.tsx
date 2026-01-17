'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-900 relative overflow-hidden">
      {/* Animated football field lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-white"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
      </div>

      {/* Navigation */}
      <nav className="relative border-b-4 border-yellow-400 bg-gradient-to-r from-blue-600 to-blue-700 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl animate-bounce">🔒</div>
              <div>
                <h1 className="text-3xl font-black text-yellow-300 tracking-tight transform -skew-x-6 drop-shadow-lg">
                  LEAGUE LOCKER
                </h1>
                <p className="text-xs text-blue-200 font-bold">LOCK IT. DRAFT IT. WIN IT!</p>
              </div>
            </div>
            <div className="flex gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-black text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 border-4 border-yellow-600"
                >
                  🎮 MY LOCKER
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-yellow-300 hover:text-yellow-100 transition-colors px-4 py-2 font-bold text-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-black text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 border-4 border-yellow-600"
                  >
                    Join Free! 🚀
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="inline-block bg-yellow-400 text-gray-900 rounded-full px-8 py-3 mb-6 border-4 border-yellow-600 shadow-2xl animate-pulse">
              <span className="text-lg font-black">
                ⚡ PAY TO PLAY • DRAFT TO WIN ⚡
              </span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              LOCK YOUR ROSTER
            </span>
            <br />
            <span className="text-yellow-300 transform inline-block -skew-x-12">
              SECURE YOUR VICTORY! 🏆
            </span>
          </h2>

          <p className="text-2xl text-green-100 max-w-3xl mx-auto mb-12 leading-relaxed font-bold drop-shadow-lg">
            The <span className="text-yellow-300 font-black">ULTIMATE</span> fantasy football platform where
            <span className="text-yellow-300 font-black"> payment unlocks the draft</span>.
            <br/>No pay? <span className="text-red-400 font-black text-3xl">NO PLAY!</span> 💰🔒
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/leagues/create"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-full font-black text-2xl hover:from-orange-400 hover:to-red-500 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-110 border-4 border-orange-700 animate-bounce"
            >
              🏈 CREATE LEAGUE
            </Link>
            <Link
              href="/leagues/join"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-full font-black text-2xl hover:from-blue-400 hover:to-purple-500 transition-all shadow-2xl border-4 border-blue-700"
            >
              🎯 JOIN LEAGUE
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20">
          <h3 className="text-5xl font-black text-center text-yellow-300 mb-16 drop-shadow-lg transform -skew-x-6">
            ⚡ HOW IT WORKS ⚡
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '👑',
                title: 'COMMISH CREATES',
                description: 'Set league dues, roster rules, and draft date. Get your unique invite code!',
                color: 'from-purple-500 to-pink-600',
                borderColor: 'border-purple-700'
              },
              {
                icon: '💳',
                title: 'MEMBERS PAY UP',
                description: 'Join with invite code. Pay dues via Stripe. LOCKED until paid! 🔒',
                color: 'from-yellow-500 to-orange-600',
                borderColor: 'border-yellow-700'
              },
              {
                icon: '🎯',
                title: 'DRAFT & DOMINATE',
                description: 'Live snake draft with timer. Only PAID members can pick. Crush it! 💪',
                color: 'from-green-500 to-teal-600',
                borderColor: 'border-green-700'
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 border-6 ${step.borderColor} shadow-2xl transform hover:scale-105 transition-all hover:rotate-2`}
              >
                <div className="text-8xl mb-4 animate-bounce">{step.icon}</div>
                <h4 className="text-3xl font-black text-white mb-4 drop-shadow-lg">
                  {step.title}
                </h4>
                <p className="text-white text-xl font-bold leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-gradient-to-r from-blue-800 to-purple-900 py-20 border-y-8 border-yellow-400">
          <div className="container mx-auto px-4">
            <h3 className="text-5xl font-black text-center text-yellow-300 mb-16 drop-shadow-lg">
              🔥 LEGENDARY FEATURES 🔥
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { icon: '🔒', title: 'PAYMENT LOCK', description: 'No pay = No draft picks!' },
                { icon: '⚡', title: 'LIVE DRAFT', description: 'Real-time snake draft action' },
                { icon: '🚫', title: 'GATE KEEPER', description: 'Server blocks unpaid users' },
                { icon: '🐍', title: 'SNAKE DRAFT', description: 'Auto snake order & timer' },
                { icon: '🤖', title: 'AUTO-PICK', description: 'Timer runs out? We got you!' },
                { icon: '📊', title: 'CUSTOM ROSTERS', description: 'Your league, your rules' },
                { icon: '💰', title: 'REFUND GUARD', description: 'Refund = Access revoked' },
                { icon: '🎮', title: 'AUDIT LOGS', description: 'Track EVERYTHING' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-yellow-500 rounded-2xl p-6 text-center transform hover:scale-105 transition-all shadow-xl"
                >
                  <div className="text-6xl mb-3">{feature.icon}</div>
                  <h4 className="text-xl font-black text-yellow-300 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm font-bold">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-24">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl p-16 text-center max-w-5xl mx-auto shadow-2xl border-8 border-yellow-400 transform hover:scale-105 transition-all">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h3 className="text-6xl font-black text-white mb-6 drop-shadow-2xl">
              READY TO DOMINATE?
            </h3>
            <p className="text-3xl text-yellow-100 mb-10 font-bold">
              Lock your league. Draft your squad. WIN IT ALL! 💪
            </p>
            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 px-12 py-6 rounded-full font-black text-3xl hover:from-yellow-200 hover:to-yellow-400 transition-all shadow-2xl transform hover:scale-110 border-6 border-yellow-700"
            >
              🚀 START FOR FREE
            </Link>
            <p className="text-yellow-100 mt-6 text-xl font-bold">
              No monthly fees • Only pay league dues to unlock draft
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t-4 border-yellow-400 bg-gradient-to-r from-gray-900 to-black py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🔒</span>
            <span className="text-3xl font-black text-yellow-300 transform -skew-x-6">
              LEAGUE LOCKER
            </span>
          </div>
          <p className="text-gray-400 font-bold">
            © 2026 League Locker. Lock it. Draft it. Win it! 🏆
          </p>
        </div>
      </footer>
    </div>
  )
}
