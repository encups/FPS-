"use client";

import { useEffect, useRef } from 'react';
import { GameState, Position } from '@/lib/gameTypes';
import { KnightSkin } from '@/lib/skins';

interface GameBoardProps {
  gameState: GameState;
  onTileClick: (position: Position) => void;
  playerSkin?: KnightSkin;
}

// Color scheme
const COLORS = {
  wall: '#4a4a4a',
  floor: '#2a2a2a',
  player: '#3b82f6', // Blue
  goblin: '#ef4444', // Red
  orc: '#dc2626', // Dark red
  dragon: '#7c2d12', // Darker red
  treasure: '#fbbf24', // Gold
  door: '#8b5cf6', // Purple
  healthBar: '#22c55e', // Green
  healthBarBg: '#991b1b', // Dark red
};

export default function GameBoard({ gameState, onTileClick, playerSkin }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentRoom, player, inCombat, currentEnemy } = gameState;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const tileSize = 40;
    const gridSize = currentRoom.width;
    canvas.width = gridSize * tileSize;
    canvas.height = gridSize * tileSize;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw tiles
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const tile = currentRoom.tiles[y][x];
        const pixelX = x * tileSize;
        const pixelY = y * tileSize;

        // Draw base tile
        if (tile.type === 'wall') {
          ctx.fillStyle = COLORS.wall;
          ctx.fillRect(pixelX, pixelY, tileSize, tileSize);
          // Add border to walls
          ctx.strokeStyle = '#666666';
          ctx.lineWidth = 1;
          ctx.strokeRect(pixelX, pixelY, tileSize, tileSize);
        } else if (tile.type === 'door') {
          ctx.fillStyle = COLORS.door;
          ctx.fillRect(pixelX, pixelY, tileSize, tileSize);
          // Door symbol
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(pixelX + 15, pixelY + 10, 10, 20);
        } else {
          ctx.fillStyle = COLORS.floor;
          ctx.fillRect(pixelX, pixelY, tileSize, tileSize);

          // Draw treasure
          if (tile.type === 'treasure' && tile.treasure && !tile.treasure.collected) {
            ctx.fillStyle = COLORS.treasure;
            ctx.fillRect(pixelX + 10, pixelY + 10, 20, 20);
            // Treasure highlight
            ctx.fillStyle = '#fef3c7';
            ctx.fillRect(pixelX + 12, pixelY + 12, 8, 8);
          }

          // Draw enemy
          if (tile.type === 'enemy' && tile.enemy?.alive) {
            const enemy = tile.enemy;
            let enemyColor = COLORS.goblin;
            if (enemy.type === 'orc') enemyColor = COLORS.orc;
            if (enemy.type === 'dragon') enemyColor = COLORS.dragon;

            ctx.fillStyle = enemyColor;
            ctx.fillRect(pixelX + 8, pixelY + 8, 24, 24);

            // Enemy eyes
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(pixelX + 12, pixelY + 14, 4, 4);
            ctx.fillRect(pixelX + 24, pixelY + 14, 4, 4);

            // Health bar for enemies
            const healthPercent = enemy.hp / enemy.maxHp;
            ctx.fillStyle = COLORS.healthBarBg;
            ctx.fillRect(pixelX + 4, pixelY + 2, 32, 3);
            ctx.fillStyle = COLORS.healthBar;
            ctx.fillRect(pixelX + 4, pixelY + 2, 32 * healthPercent, 3);
          }
        }

        // Grid lines
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        ctx.strokeRect(pixelX, pixelY, tileSize, tileSize);
      }
    }

    // Draw player
    const playerX = player.position.x * tileSize;
    const playerY = player.position.y * tileSize;
    const playerColor = playerSkin?.color || COLORS.player;
    const playerAccent = playerSkin?.accentColor || '#60a5fa';

    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX + 6, playerY + 6, 28, 28);

    // Player helmet
    ctx.fillStyle = playerAccent;
    ctx.fillRect(playerX + 10, playerY + 8, 20, 8);

    // Player visor
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(playerX + 12, playerY + 14, 16, 4);

    // Highlight current enemy in combat
    if (inCombat && currentEnemy) {
      const enemyX = currentEnemy.position.x * tileSize;
      const enemyY = currentEnemy.position.y * tileSize;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.strokeRect(enemyX + 2, enemyY + 2, tileSize - 4, tileSize - 4);
    }

    // Highlight walkable tiles adjacent to player
    if (!inCombat) {
      const adjacentPositions = [
        { x: player.position.x - 1, y: player.position.y },
        { x: player.position.x + 1, y: player.position.y },
        { x: player.position.x, y: player.position.y - 1 },
        { x: player.position.x, y: player.position.y + 1 },
      ];

      adjacentPositions.forEach(pos => {
        if (pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize) {
          const tile = currentRoom.tiles[pos.y][pos.x];
          if (tile.type !== 'wall') {
            ctx.strokeStyle = '#60a5fa44';
            ctx.lineWidth = 2;
            ctx.strokeRect(pos.x * tileSize + 1, pos.y * tileSize + 1, tileSize - 2, tileSize - 2);
          }
        }
      });
    }
  }, [gameState, currentRoom, player, inCombat, currentEnemy, playerSkin]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || inCombat) return;

    const rect = canvas.getBoundingClientRect();
    const tileSize = canvas.width / currentRoom.width;

    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    onTileClick({ x, y });
  };

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="border-4 border-medieval-gold cursor-pointer"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
