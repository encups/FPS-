'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      // Auto-login after signup
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        throw new Error('Signup successful but login failed. Please log in manually.')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
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
          <h1 className="text-5xl font-black text-white mt-6 drop-shadow-lg">JOIN THE SQUAD! 🚀</h1>
          <p className="text-green-200 mt-2 text-xl font-bold">Create your FREE account</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-6 border-yellow-400 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500 border-4 border-red-700 rounded-2xl p-4 text-white text-sm font-bold animate-shake">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label htmlFor="displayName" className="block text-lg font-black text-yellow-300 mb-2">
                🏈 YOUR NAME
              </label>
              <input
                id="displayName"
                type="text"
                required
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                className="w-full px-6 py-4 bg-white border-4 border-yellow-500 rounded-2xl text-gray-900 font-bold text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-300 outline-none shadow-inner"
                placeholder="Your epic name"
              />
            </div>

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
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-5 rounded-full font-black text-2xl hover:from-orange-400 hover:to-red-500 transition-all shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-orange-700"
            >
              {loading ? '⏳ CREATING...' : '🚀 LOCK IN!'}
            </button>
          </form>

          <p className="text-center text-green-100 mt-6 font-bold text-lg">
            Already locked in?{' '}
            <Link href="/login" className="text-yellow-300 hover:text-yellow-100 font-black underline">
              Login here! →
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center max-w-lg mx-auto">
          <p className="text-green-200 font-bold text-sm mb-3">
            🏆 Free to join • No credit card needed
          </p>
          <p className="text-green-300 text-xs opacity-80 leading-relaxed">
            * When joining a league, a 1% admin fee applies to league dues for secure payment processing and league administration.
          </p>
        </div>
      </div>
    </div>
  )
}
