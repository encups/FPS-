"use client";

import { useState } from 'react';

interface EmailCaptureModalProps {
  onSubmit: (email: string) => void;
  onClose: () => void;
}

export default function EmailCaptureModal({ onSubmit, onClose }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);

    // Store email in localStorage
    localStorage.setItem('dailyDungeon_email', email);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    onSubmit(email);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="pixel-border medieval-shadow bg-gradient-to-b from-medieval-ink to-black p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="pixel-text text-xl text-medieval-gold mb-2">
            UNLOCK LEADERBOARD
          </h2>
          <p className="font-pixel text-sm text-medieval-parchment">
            Join the Daily Dungeon community and compete globally!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-pixel text-xs text-medieval-stone mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="knight@castle.com"
              className="w-full pixel-border bg-black/50 text-medieval-parchment px-4 py-3 font-pixel text-sm focus:outline-none focus:border-medieval-gold"
              required
            />
          </div>

          <div className="font-pixel text-xs text-medieval-stone">
            ✨ Get daily dungeon tips & Frame Fables updates
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full pixel-border medieval-shadow bg-medieval-gold hover:bg-medieval-bronze text-medieval-ink px-6 py-3 pixel-text text-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'JOINING...' : '🏆 UNLOCK LEADERBOARD'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-6 py-3 pixel-text text-xs transition-colors"
          >
            Maybe Later
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-pixel text-xs text-medieval-stone">
            No spam. Unsubscribe anytime. Privacy first. 🛡️
          </p>
        </div>
      </div>
    </div>
  );
}
