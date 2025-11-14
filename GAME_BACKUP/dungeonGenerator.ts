import { SeededRandom } from './seedRandom';
import { Room, Tile, Enemy, Treasure, Position, EnemyType, ENEMY_STATS, GAME_CONSTANTS } from './gameTypes';

/**
 * Generate a dungeon room with enemies and treasures
 */
export function generateRoom(roomNumber: number, seed: string): Room {
  const rng = new SeededRandom(`${seed}-room-${roomNumber}`);
  const { GRID_SIZE, TOTAL_ROOMS, TREASURE_GOLD_MIN, TREASURE_GOLD_MAX } = GAME_CONSTANTS;

  // Initialize empty room
  const tiles: Tile[][] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    tiles[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      // Create walls around edges, floor in the middle
      const isWall = x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1;
      tiles[y][x] = {
        type: isWall ? 'wall' : 'floor',
        position: { x, y },
      };
    }
  }

  // Generate enemies based on room number
  const enemies: Enemy[] = [];
  const enemyCount = Math.min(roomNumber + 1, 4); // 2-5 enemies per room

  for (let i = 0; i < enemyCount; i++) {
    let enemyType: EnemyType;

    // Room 5 always has dragon, others have goblins/orcs
    if (roomNumber === TOTAL_ROOMS - 1 && i === enemyCount - 1) {
      enemyType = 'dragon';
    } else if (roomNumber >= 3 && rng.next() > 0.6) {
      enemyType = 'orc';
    } else {
      enemyType = 'goblin';
    }

    const position = getRandomFloorPosition(tiles, rng, enemies, []);
    const stats = ENEMY_STATS[enemyType];

    enemies.push({
      id: `enemy-${roomNumber}-${i}`,
      type: enemyType,
      position,
      hp: stats.hp,
      maxHp: stats.hp,
      attack: stats.attack,
      defense: stats.defense,
      goldReward: stats.gold,
      alive: true,
    });

    // Mark tile as having enemy
    tiles[position.y][position.x].type = 'enemy';
    tiles[position.y][position.x].enemy = enemies[enemies.length - 1];
  }

  // Generate treasures
  const treasures: Treasure[] = [];
  const treasureCount = rng.nextInt(1, 3);

  for (let i = 0; i < treasureCount; i++) {
    const position = getRandomFloorPosition(tiles, rng, enemies, treasures);
    const gold = rng.nextInt(TREASURE_GOLD_MIN, TREASURE_GOLD_MAX);

    treasures.push({
      id: `treasure-${roomNumber}-${i}`,
      position,
      gold,
      collected: false,
    });

    tiles[position.y][position.x].type = 'treasure';
    tiles[position.y][position.x].treasure = treasures[treasures.length - 1];
  }

  // Add door to next room (on right wall if not last room)
  let doorPosition: Position | null = null;
  if (roomNumber < TOTAL_ROOMS - 1) {
    const doorY = Math.floor(GRID_SIZE / 2);
    doorPosition = { x: GRID_SIZE - 1, y: doorY };
    tiles[doorY][GRID_SIZE - 1].type = 'door';
  }

  return {
    width: GRID_SIZE,
    height: GRID_SIZE,
    tiles,
    enemies,
    treasures,
    doorPosition,
    cleared: false,
  };
}

/**
 * Get a random floor position that doesn't have enemies or treasures
 */
function getRandomFloorPosition(
  tiles: Tile[][],
  rng: SeededRandom,
  enemies: Enemy[],
  treasures: Treasure[]
): Position {
  const gridSize = tiles.length;
  let position: Position;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    // Get random position in inner area (not on walls or edges)
    position = {
      x: rng.nextInt(2, gridSize - 3),
      y: rng.nextInt(2, gridSize - 3),
    };
    attempts++;
  } while (
    attempts < maxAttempts &&
    (tiles[position.y][position.x].type !== 'floor' ||
      enemies.some(e => e.position.x === position.x && e.position.y === position.y) ||
      treasures.some(t => t.position.x === position.x && t.position.y === position.y))
  );

  return position;
}

/**
 * Get player starting position (always bottom-left area)
 */
export function getPlayerStartPosition(): Position {
  return { x: 1, y: 1 };
}

/**
 * Check if a position is walkable
 */
export function isWalkable(tile: Tile): boolean {
  return tile.type === 'floor' || tile.type === 'treasure' || tile.type === 'door';
}

/**
 * Check if positions are adjacent (for movement/combat)
 */
export function areAdjacent(pos1: Position, pos2: Position): boolean {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

/**
 * Get distance between two positions (Manhattan distance)
 */
export function getDistance(pos1: Position, pos2: Position): number {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}
