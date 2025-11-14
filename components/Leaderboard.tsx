"use client";

import { HighScore } from '@/lib/gameTypes';
import { useEffect, useState } from 'react';
import { getHighScores } from '@/lib/gameLogic';

export default function Leaderboard() {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setScores(getHighScores());
  }, []);

  if (scores.length === 0) {
    return (
      <div className="pixel-border bg-medieval-stone/20 p-6">
        <h2 className="pixel-text text-lg text-medieval-gold mb-4 text-center">
          🏆 Top Scores
        </h2>
        <p className="font-pixel text-sm text-medieval-stone text-center">
          No scores yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="pixel-border bg-medieval-stone/20 p-6">
      <h2 className="pixel-text text-lg text-medieval-gold mb-4 text-center">
        🏆 Top Scores
      </h2>

      <div className="space-y-2">
        {scores.map((score, index) => (
          <div
            key={score.timestamp}
            className={`pixel-border p-3 flex items-center justify-between ${
              index === 0
                ? 'bg-medieval-gold/20 border-medieval-gold'
                : 'bg-black/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="pixel-text text-sm text-medieval-gold w-6">
                #{index + 1}
              </span>
              <div>
                <div className="pixel-text text-xs text-medieval-parchment">
                  {score.score}
                </div>
                <div className="font-pixel text-xs text-medieval-stone">
                  {score.date}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-pixel text-xs text-medieval-stone">
                💰 {score.gold} | 💀 {score.enemiesKilled}
              </div>
              <div className="font-pixel text-xs text-medieval-stone">
                🏰 {score.roomsCleared}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
