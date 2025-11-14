"use client";

import { Player } from '@/lib/gameTypes';

interface PlayerStatsProps {
  player: Player;
  roomNumber: number;
  totalRooms: number;
}

export default function PlayerStats({ player, roomNumber, totalRooms }: PlayerStatsProps) {
  const healthPercent = (player.hp / player.maxHp) * 100;

  return (
    <div className="pixel-border bg-medieval-stone/20 p-4 space-y-3">
      <h2 className="pixel-text text-lg text-medieval-gold mb-4">⚔️ Knight Stats</h2>

      {/* Health Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-pixel text-sm text-medieval-parchment">❤️ Health</span>
          <span className="font-pixel text-sm text-medieval-parchment">
            {player.hp}/{player.maxHp}
          </span>
        </div>
        <div className="w-full h-6 bg-red-900 pixel-border">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="pixel-border bg-black/30 p-2">
          <div className="font-pixel text-xs text-medieval-stone">Attack</div>
          <div className="pixel-text text-sm text-medieval-gold">⚔️ {player.attack}</div>
        </div>
        <div className="pixel-border bg-black/30 p-2">
          <div className="font-pixel text-xs text-medieval-stone">Defense</div>
          <div className="pixel-text text-sm text-medieval-gold">🛡️ {player.defense}</div>
        </div>
        <div className="pixel-border bg-black/30 p-2">
          <div className="font-pixel text-xs text-medieval-stone">Gold</div>
          <div className="pixel-text text-sm text-medieval-gold">💰 {player.gold}</div>
        </div>
        <div className="pixel-border bg-black/30 p-2">
          <div className="font-pixel text-xs text-medieval-stone">Room</div>
          <div className="pixel-text text-sm text-medieval-gold">
            🏰 {roomNumber + 1}/{totalRooms}
          </div>
        </div>
      </div>

      {/* Kill Count */}
      <div className="pixel-border bg-black/30 p-2">
        <div className="font-pixel text-xs text-medieval-stone">Enemies Defeated</div>
        <div className="pixel-text text-sm text-medieval-gold">💀 {player.enemiesKilled}</div>
      </div>
    </div>
  );
}
