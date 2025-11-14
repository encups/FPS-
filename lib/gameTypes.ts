/**
 * Core game type definitions
 */

export type TileType = 'floor' | 'wall' | 'door' | 'treasure' | 'enemy' | 'player';

export type EnemyType = 'goblin' | 'orc' | 'dragon';

export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: string;
  type: EnemyType;
  position: Position;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  goldReward: number;
  alive: boolean;
}

export interface Treasure {
  id: string;
  position: Position;
  gold: number;
  collected: boolean;
}

export interface Tile {
  type: TileType;
  position: Position;
  enemy?: Enemy;
  treasure?: Treasure;
}

export interface Room {
  width: number;
  height: number;
  tiles: Tile[][];
  enemies: Enemy[];
  treasures: Treasure[];
  doorPosition: Position | null;
  cleared: boolean;
}

export interface Player {
  position: Position;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  gold: number;
  roomsCleared: number;
  enemiesKilled: number;
}

export interface GameState {
  player: Player;
  currentRoom: Room;
  roomNumber: number;
  totalRooms: number;
  gameOver: boolean;
  victory: boolean;
  score: number;
  seed: string;
  inCombat: boolean;
  currentEnemy: Enemy | null;
}

export interface CombatAction {
  type: 'attack' | 'defend';
  playerDamage: number;
  enemyDamage: number;
  playerDefending: boolean;
}

export interface HighScore {
  date: string;
  score: number;
  gold: number;
  roomsCleared: number;
  enemiesKilled: number;
  timestamp: number;
}

// Enemy stats configuration
export const ENEMY_STATS: Record<EnemyType, { hp: number; attack: number; defense: number; gold: number }> = {
  goblin: { hp: 30, attack: 5, defense: 2, gold: 10 },
  orc: { hp: 60, attack: 12, defense: 5, gold: 25 },
  dragon: { hp: 120, attack: 20, defense: 10, gold: 100 },
};

// Game constants
export const GAME_CONSTANTS = {
  GRID_SIZE: 10,
  TOTAL_ROOMS: 5,
  PLAYER_START_HP: 100,
  PLAYER_START_ATTACK: 15,
  PLAYER_START_DEFENSE: 5,
  TREASURE_GOLD_MIN: 15,
  TREASURE_GOLD_MAX: 40,
  SCORE_PER_GOLD: 1,
  SCORE_PER_ENEMY: 50,
  SCORE_PER_ROOM: 100,
  SCORE_PER_HP: 2,
};
