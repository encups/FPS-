"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Leaderboard from '@/components/Leaderboard';
import { getTodaysSeed } from '@/lib/seedRandom';
import { getTodaysBestScore } from '@/lib/gameLogic';

export default function DungeonMenu() {
  const router = useRouter();
  const [todaysSeed, setTodaysSeed] = useState<string>('');
  const [todaysBest, setTodaysBest] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const seed = getTodaysSeed();
    setTodaysSeed(seed);

    const best = getTodaysBestScore();
    setTodaysBest(best?.score || null);
  }, []);

  const handlePlayGame = () => {
    router.push('/dungeon');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-black">
      {/* Navigation */}
      <nav className="border-b-4 border-medieval-gold bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🏰</span>
              <h1 className="pixel-text text-xl text-medieval-gold">Frame Fables</h1>
            </Link>
            <Link
              href="/"
              className="pixel-text text-sm text-medieval-parchment hover:text-medieval-gold transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6">⚔️</div>
          <h1 className="pixel-text text-4xl md:text-6xl text-medieval-gold mb-4">
            DAILY DUNGEON
          </h1>
          <p className="font-pixel text-lg text-medieval-parchment mb-2">
            Everyone plays the same dungeon. One day. One chance to top the leaderboard.
          </p>
          <p className="font-pixel text-sm text-medieval-stone">
            📅 Today&apos;s Dungeon: {todaysSeed}
          </p>
          {todaysBest !== null && (
            <p className="font-pixel text-sm text-medieval-gold mt-2">
              🏆 Your Best Today: {todaysBest}
            </p>
          )}
        </div>

        {/* Main Action */}
        <div className="max-w-2xl mx-auto mb-12">
          <button
            onClick={handlePlayGame}
            className="w-full pixel-border medieval-shadow bg-medieval-gold hover:bg-medieval-bronze text-medieval-ink px-8 py-6 pixel-text text-xl transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none mb-4"
          >
            ⚔️ PLAY TODAY&apos;S DUNGEON ⚔️
          </button>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-6 py-3 pixel-text text-sm transition-colors"
          >
            {showInstructions ? '📕 HIDE INSTRUCTIONS' : '📖 HOW TO PLAY'}
          </button>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="max-w-3xl mx-auto mb-12 pixel-border medieval-shadow bg-medieval-stone/20 p-8">
            <h2 className="pixel-text text-2xl text-medieval-gold mb-6 text-center">
              📖 HOW TO PLAY
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">🎯 OBJECTIVE</h3>
                <p className="font-pixel text-sm text-medieval-parchment">
                  Survive 5 procedurally-generated rooms, defeat all enemies, collect treasure, and earn the highest score possible!
                </p>
              </div>

              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">🕹️ CONTROLS</h3>
                <ul className="font-pixel text-sm text-medieval-parchment space-y-1">
                  <li>• Click adjacent tiles to move your knight</li>
                  <li>• Click on enemies to engage in combat</li>
                  <li>• Walk over treasure chests to collect gold</li>
                  <li>• Clear all enemies to unlock the door to the next room</li>
                </ul>
              </div>

              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">⚔️ COMBAT</h3>
                <ul className="font-pixel text-sm text-medieval-parchment space-y-1">
                  <li>• <span className="text-red-400">ATTACK:</span> Deal damage to the enemy</li>
                  <li>• <span className="text-blue-400">DEFEND:</span> Reduce incoming damage by 50%</li>
                  <li>• Turn-based: You attack, then the enemy attacks</li>
                  <li>• Damage = Attack - Enemy Defense (minimum 1)</li>
                </ul>
              </div>

              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">👹 ENEMIES</h3>
                <ul className="font-pixel text-sm text-medieval-parchment space-y-1">
                  <li>• <span className="text-red-400">Goblin:</span> Weak but numerous (30 HP, 5 ATK)</li>
                  <li>• <span className="text-red-600">Orc:</span> Tough warriors (60 HP, 12 ATK)</li>
                  <li>• <span className="text-red-800">Dragon:</span> Final boss in room 5 (120 HP, 20 ATK)</li>
                </ul>
              </div>

              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">🏆 SCORING</h3>
                <ul className="font-pixel text-sm text-medieval-parchment space-y-1">
                  <li>• Gold collected: 1 point per gold</li>
                  <li>• Enemies defeated: 50 points each</li>
                  <li>• Rooms cleared: 100 points each</li>
                  <li>• Health remaining: 2 points per HP</li>
                </ul>
              </div>

              <div>
                <h3 className="pixel-text text-sm text-medieval-gold mb-2">💡 TIPS</h3>
                <ul className="font-pixel text-sm text-medieval-parchment space-y-1">
                  <li>• Use DEFEND when low on health to survive longer</li>
                  <li>• Collect all treasure before moving to the next room</li>
                  <li>• Every dungeon is the same for everyone today!</li>
                  <li>• Unlimited attempts - practice makes perfect!</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Game Features */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="pixel-text text-2xl text-medieval-gold mb-8 text-center">
            ✨ GAME FEATURES
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="pixel-border medieval-shadow bg-medieval-stone/10 p-6 hover:bg-medieval-stone/20 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              <div className="text-5xl mb-4 text-center">🎲</div>
              <h3 className="pixel-text text-sm text-medieval-gold mb-2 text-center">
                Daily Challenge
              </h3>
              <p className="font-pixel text-xs text-medieval-parchment text-center">
                Everyone plays the same procedurally-generated dungeon each day
              </p>
            </div>

            <div className="pixel-border medieval-shadow bg-medieval-stone/10 p-6 hover:bg-medieval-stone/20 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              <div className="text-5xl mb-4 text-center">⚔️</div>
              <h3 className="pixel-text text-sm text-medieval-gold mb-2 text-center">
                Turn-Based Combat
              </h3>
              <p className="font-pixel text-xs text-medieval-parchment text-center">
                Strategic battles with attack and defend mechanics
              </p>
            </div>

            <div className="pixel-border medieval-shadow bg-medieval-stone/10 p-6 hover:bg-medieval-stone/20 transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              <div className="text-5xl mb-4 text-center">🏆</div>
              <h3 className="pixel-text text-sm text-medieval-gold mb-2 text-center">
                Leaderboards
              </h3>
              <p className="font-pixel text-xs text-medieval-parchment text-center">
                Compete for the highest score and share your achievements
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-2xl mx-auto">
          <Leaderboard />
        </div>

        {/* Footer CTA */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <button
            onClick={handlePlayGame}
            className="pixel-border medieval-shadow bg-red-600 hover:bg-red-700 text-white px-8 py-4 pixel-text text-lg transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
          >
            🎮 START PLAYING NOW
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-medieval-gold bg-black/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-pixel text-sm text-medieval-stone mb-4">
            A Frame Fables mini-game • New dungeon every day at midnight
          </p>

          {/* Support Button */}
          <a
            href="https://buymeacoffee.com/framefables"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block pixel-border bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 pixel-text text-xs transition-colors"
          >
            ☕ SUPPORT THE GAME
          </a>
        </div>
      </footer>
    </div>
  );
}
