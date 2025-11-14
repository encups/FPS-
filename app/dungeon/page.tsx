"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GameBoard from '@/components/GameBoard';
import PlayerStats from '@/components/PlayerStats';
import CombatPanel from '@/components/CombatPanel';
import GameOverScreen from '@/components/GameOverScreen';
import Leaderboard from '@/components/Leaderboard';
import SkinsModal from '@/components/SkinsModal';
import { GameState, Position, CombatAction } from '@/lib/gameTypes';
import { initializeGame, movePlayer, performCombat, saveHighScore } from '@/lib/gameLogic';
import { getTodaysSeed } from '@/lib/seedRandom';
import { getCurrentSkin, getSkinById, KnightSkin } from '@/lib/skins';

export default function DungeonGame() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSkinsModal, setShowSkinsModal] = useState(false);
  const [todaysSeed, setTodaysSeed] = useState<string>('');
  const [currentSkin, setCurrentSkin] = useState<KnightSkin | null>(null);

  // Initialize game on mount
  useEffect(() => {
    const seed = getTodaysSeed();
    setTodaysSeed(seed);
    setGameState(initializeGame(seed));

    // Load current skin
    const skinId = getCurrentSkin();
    setCurrentSkin(getSkinById(skinId));
  }, []);

  const handleSkinChange = () => {
    const skinId = getCurrentSkin();
    setCurrentSkin(getSkinById(skinId));
  };

  const handleTileClick = (position: Position) => {
    if (!gameState || gameState.gameOver || gameState.inCombat) return;

    const newState = movePlayer(gameState, position);
    setGameState(newState);
  };

  const handleCombatAction = (actionType: 'attack' | 'defend') => {
    if (!gameState || !gameState.inCombat || !gameState.currentEnemy) return;

    const action: CombatAction = {
      type: actionType,
      playerDamage: 0,
      enemyDamage: 0,
      playerDefending: actionType === 'defend',
    };

    const newState = performCombat(gameState, action);

    // Save high score if game over
    if (newState.gameOver) {
      saveHighScore(newState);
    }

    setGameState(newState);
  };

  const handleRestart = () => {
    setGameState(initializeGame(todaysSeed));
  };

  const handleMenu = () => {
    router.push('/dungeon/menu');
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-black flex items-center justify-center">
        <div className="pixel-text text-xl text-medieval-gold">Loading dungeon...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-black py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="pixel-text text-3xl md:text-4xl text-medieval-gold mb-2">
            ⚔️ DAILY DUNGEON ⚔️
          </h1>
          <p className="font-pixel text-sm text-medieval-stone">
            📅 {todaysSeed}
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={handleMenu}
              className="pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-4 py-2 pixel-text text-xs transition-colors"
            >
              🏰 MENU
            </button>
            <button
              onClick={() => setShowSkinsModal(true)}
              className="pixel-border bg-medieval-gold/20 hover:bg-medieval-gold/30 text-medieval-gold px-4 py-2 pixel-text text-xs transition-colors"
            >
              {currentSkin?.emoji || '⚔️'} SKINS
            </button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 mb-8">
          {/* Game Board */}
          <div className="space-y-4">
            <GameBoard
              gameState={gameState}
              onTileClick={handleTileClick}
              playerSkin={currentSkin || undefined}
            />

            {/* Controls Guide */}
            <div className="pixel-border bg-black/30 p-4">
              <h3 className="pixel-text text-sm text-medieval-gold mb-2">📖 Controls</h3>
              <div className="font-pixel text-xs text-medieval-parchment space-y-1">
                {gameState.inCombat ? (
                  <>
                    <p>⚔️ Click ATTACK to deal damage</p>
                    <p>🛡️ Click DEFEND to reduce incoming damage by 50%</p>
                  </>
                ) : (
                  <>
                    <p>🖱️ Click adjacent tiles to move</p>
                    <p>💰 Walk over treasure to collect gold</p>
                    <p>⚔️ Move onto enemies to start combat</p>
                    <p>🚪 Clear all enemies to unlock the door</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Player Stats */}
            <PlayerStats
              player={gameState.player}
              roomNumber={gameState.roomNumber}
              totalRooms={gameState.totalRooms}
            />

            {/* Combat Panel */}
            {gameState.inCombat && gameState.currentEnemy && (
              <CombatPanel
                enemy={gameState.currentEnemy}
                onAttack={() => handleCombatAction('attack')}
                onDefend={() => handleCombatAction('defend')}
              />
            )}

            {/* Room Status */}
            {!gameState.inCombat && (
              <div className="pixel-border bg-black/30 p-4">
                <h3 className="pixel-text text-sm text-medieval-gold mb-3">
                  🏰 Room {gameState.roomNumber + 1}/{gameState.totalRooms}
                </h3>
                <div className="space-y-2">
                  <div className="font-pixel text-xs text-medieval-parchment">
                    👹 Enemies: {gameState.currentRoom.enemies.filter(e => e.alive).length}
                  </div>
                  <div className="font-pixel text-xs text-medieval-parchment">
                    💰 Treasures: {gameState.currentRoom.treasures.filter(t => !t.collected).length}
                  </div>
                  {gameState.currentRoom.cleared && (
                    <div className="pixel-text text-xs text-green-500 mt-2">
                      ✓ ROOM CLEARED!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Toggle Leaderboard */}
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="w-full pixel-border bg-medieval-gold/20 hover:bg-medieval-gold/30 text-medieval-gold px-4 py-2 pixel-text text-xs transition-colors"
            >
              {showLeaderboard ? '📊 HIDE SCORES' : '🏆 SHOW SCORES'}
            </button>

            {/* Leaderboard */}
            {showLeaderboard && <Leaderboard />}
          </div>
        </div>
      </div>

      {/* Game Over Screen */}
      {gameState.gameOver && (
        <GameOverScreen
          gameState={gameState}
          onRestart={handleRestart}
          onMenu={handleMenu}
        />
      )}

      {/* Skins Modal */}
      {showSkinsModal && (
        <SkinsModal
          onClose={() => setShowSkinsModal(false)}
          onSkinChange={handleSkinChange}
        />
      )}
    </div>
  );
}
