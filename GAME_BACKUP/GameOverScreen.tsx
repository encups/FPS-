"use client";

import { GameState, HighScore } from '@/lib/gameTypes';
import { calculateScore, copyScoreToClipboard } from '@/lib/gameLogic';
import { useState } from 'react';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onMenu: () => void;
}

export default function GameOverScreen({ gameState, onRestart, onMenu }: GameOverScreenProps) {
  const [copied, setCopied] = useState(false);
  const { player, victory } = gameState;
  const finalScore = calculateScore(player);

  const handleShare = async () => {
    const success = await copyScoreToClipboard(gameState);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="pixel-border medieval-shadow bg-gradient-to-b from-medieval-ink to-black p-8 max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-6">
          {victory ? (
            <>
              <div className="text-6xl mb-4">👑</div>
              <h1 className="pixel-text text-2xl text-medieval-gold mb-2">
                VICTORY!
              </h1>
              <p className="font-pixel text-sm text-medieval-parchment">
                You conquered the dungeon!
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">☠️</div>
              <h1 className="pixel-text text-2xl text-red-500 mb-2">
                GAME OVER
              </h1>
              <p className="font-pixel text-sm text-medieval-stone">
                You have fallen in battle...
              </p>
            </>
          )}
        </div>

        {/* Score Card */}
        <div className="pixel-border bg-black/50 p-6 mb-6 space-y-3">
          <div className="text-center mb-4">
            <div className="font-pixel text-xs text-medieval-stone mb-1">FINAL SCORE</div>
            <div className="pixel-text text-3xl text-medieval-gold">{finalScore}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="pixel-border bg-medieval-stone/10 p-3">
              <div className="font-pixel text-xs text-medieval-stone">💰 Gold</div>
              <div className="pixel-text text-lg text-medieval-gold">{player.gold}</div>
            </div>
            <div className="pixel-border bg-medieval-stone/10 p-3">
              <div className="font-pixel text-xs text-medieval-stone">💀 Kills</div>
              <div className="pixel-text text-lg text-medieval-gold">{player.enemiesKilled}</div>
            </div>
            <div className="pixel-border bg-medieval-stone/10 p-3">
              <div className="font-pixel text-xs text-medieval-stone">🏰 Rooms</div>
              <div className="pixel-text text-lg text-medieval-gold">
                {player.roomsCleared}/{gameState.totalRooms}
              </div>
            </div>
            <div className="pixel-border bg-medieval-stone/10 p-3">
              <div className="font-pixel text-xs text-medieval-stone">❤️ HP Left</div>
              <div className="pixel-text text-lg text-medieval-gold">{player.hp}</div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="text-center mb-6">
          <div className="font-pixel text-xs text-medieval-stone">
            📅 {gameState.seed}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full pixel-border medieval-shadow bg-medieval-gold hover:bg-medieval-bronze text-medieval-ink px-6 py-3 pixel-text text-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            {copied ? '✓ COPIED!' : '📋 SHARE SCORE'}
          </button>

          <button
            onClick={onRestart}
            className="w-full pixel-border medieval-shadow bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 pixel-text text-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            🔄 TRY AGAIN
          </button>

          <button
            onClick={onMenu}
            className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-6 py-3 pixel-text text-sm transition-colors"
          >
            🏰 MAIN MENU
          </button>
        </div>

        {/* Subtle Frame Fables CTA */}
        <div className="mt-6 pixel-border bg-gradient-to-r from-medieval-gold/10 to-medieval-bronze/10 p-4 text-center">
          <div className="font-pixel text-xs text-medieval-stone mb-2">
            Enjoyed the game? 🎮
          </div>
          <a
            href="/"
            className="font-pixel text-sm text-medieval-gold hover:text-medieval-bronze transition-colors underline"
          >
            Check out Frame Fables AI Marketing →
          </a>
        </div>
      </div>
    </div>
  );
}
