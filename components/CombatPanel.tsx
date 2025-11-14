"use client";

import { Enemy } from '@/lib/gameTypes';

interface CombatPanelProps {
  enemy: Enemy;
  onAttack: () => void;
  onDefend: () => void;
}

export default function CombatPanel({ enemy, onAttack, onDefend }: CombatPanelProps) {
  const healthPercent = (enemy.hp / enemy.maxHp) * 100;

  const getEnemyEmoji = (type: string) => {
    switch (type) {
      case 'goblin': return '👹';
      case 'orc': return '👺';
      case 'dragon': return '🐉';
      default: return '👹';
    }
  };

  const getEnemyName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="pixel-border bg-red-900/20 p-4 space-y-4 animate-pulse">
      <h2 className="pixel-text text-lg text-red-500 text-center">
        ⚔️ COMBAT! ⚔️
      </h2>

      {/* Enemy Info */}
      <div className="pixel-border bg-black/50 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getEnemyEmoji(enemy.type)}</span>
            <span className="pixel-text text-sm text-medieval-parchment">
              {getEnemyName(enemy.type)}
            </span>
          </div>
        </div>

        {/* Enemy Health Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-pixel text-xs text-medieval-stone">HP</span>
            <span className="font-pixel text-xs text-medieval-parchment">
              {enemy.hp}/{enemy.maxHp}
            </span>
          </div>
          <div className="w-full h-4 bg-red-950 pixel-border">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>

        {/* Enemy Stats */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="font-pixel text-xs text-medieval-stone">
            ⚔️ ATK: <span className="text-red-400">{enemy.attack}</span>
          </div>
          <div className="font-pixel text-xs text-medieval-stone">
            🛡️ DEF: <span className="text-blue-400">{enemy.defense}</span>
          </div>
        </div>
      </div>

      {/* Combat Actions */}
      <div className="space-y-2">
        <button
          onClick={onAttack}
          className="w-full pixel-border medieval-shadow bg-red-600 hover:bg-red-700 text-white px-4 py-3 pixel-text text-xs transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          ⚔️ ATTACK
        </button>
        <button
          onClick={onDefend}
          className="w-full pixel-border medieval-shadow bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 pixel-text text-xs transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          🛡️ DEFEND (-50% DMG)
        </button>
      </div>

      <p className="font-pixel text-xs text-center text-medieval-stone italic">
        Choose your action wisely!
      </p>
    </div>
  );
}
