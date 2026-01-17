'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Football field lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-white"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <span className="text-6xl animate-bounce group-hover:scale-110 transition-transform">🔒</span>
            <div>
              <span className="text-4xl font-black text-yellow-300 transform -skew-x-6 drop-shadow-lg">
                LEAGUE LOCKER
              </span>
              <p className="text-xs text-green-200 font-bold">LOCK IT. DRAFT IT. WIN IT!</p>
            </div>
          </Link>
          <h1 className="text-5xl font-black text-white mt-6 drop-shadow-lg">WELCOME BACK! 🎮</h1>
          <p className="text-green-200 mt-2 text-xl font-bold">Sign in to your locker</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-6 border-yellow-400 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500 border-4 border-red-700 rounded-2xl p-4 text-white text-sm font-bold animate-shake">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-lg font-black text-yellow-300 mb-2">
                📧 EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-6 py-4 bg-white border-4 border-yellow-500 rounded-2xl text-gray-900 font-bold text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-300 outline-none shadow-inner"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-black text-yellow-300 mb-2">
                🔒 PASSWORD
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-6 py-4 bg-white border-4 border-yellow-500 rounded-2xl text-gray-900 font-bold text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-300 outline-none shadow-inner"
                placeholder="Super secure password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-5 rounded-full font-black text-2xl hover:from-orange-400 hover:to-red-500 transition-all shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-orange-700"
            >
              {loading ? '⏳ UNLOCKING...' : '🚀 UNLOCK LOCKER!'}
            </button>
          </form>

          <p className="text-center text-green-100 mt-6 font-bold text-lg">
            Need a locker?{' '}
            <Link href="/signup" className="text-yellow-300 hover:text-yellow-100 font-black underline">
              Join here! →
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-green-200 font-bold text-sm">
            🔐 Secure login • Your squad awaits
          </p>
        </div>
      </div>
    </div>
  )
}
