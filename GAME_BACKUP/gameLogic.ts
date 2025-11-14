import { GameState, Player, Room, Enemy, Position, CombatAction, HighScore, GAME_CONSTANTS } from './gameTypes';
import { generateRoom, getPlayerStartPosition, isWalkable, areAdjacent } from './dungeonGenerator';
import { getTodaysSeed } from './seedRandom';

/**
 * Initialize a new game
 */
export function initializeGame(seed?: string): GameState {
  const gameSeed = seed || getTodaysSeed();
  const { PLAYER_START_HP, PLAYER_START_ATTACK, PLAYER_START_DEFENSE, TOTAL_ROOMS } = GAME_CONSTANTS;

  const player: Player = {
    position: getPlayerStartPosition(),
    hp: PLAYER_START_HP,
    maxHp: PLAYER_START_HP,
    attack: PLAYER_START_ATTACK,
    defense: PLAYER_START_DEFENSE,
    gold: 0,
    roomsCleared: 0,
    enemiesKilled: 0,
  };

  const currentRoom = generateRoom(0, gameSeed);

  return {
    player,
    currentRoom,
    roomNumber: 0,
    totalRooms: TOTAL_ROOMS,
    gameOver: false,
    victory: false,
    score: 0,
    seed: gameSeed,
    inCombat: false,
    currentEnemy: null,
  };
}

/**
 * Move player to a new position
 */
export function movePlayer(state: GameState, newPosition: Position): GameState {
  const { currentRoom, player } = state;
  const tile = currentRoom.tiles[newPosition.y][newPosition.x];

  // Check if position is valid
  if (!isWalkable(tile) || !areAdjacent(player.position, newPosition)) {
    console.log('🚫 Invalid move');
    return state;
  }

  // Handle stepping on enemy tile
  if (tile.type === 'enemy' && tile.enemy?.alive) {
    console.log('⚔️ Encountered enemy!');
    return {
      ...state,
      inCombat: true,
      currentEnemy: tile.enemy,
    };
  }

  // Handle collecting treasure
  if (tile.type === 'treasure' && tile.treasure && !tile.treasure.collected) {
    const gold = tile.treasure.gold;
    console.log(`💰 Collected ${gold} gold!`);
    tile.treasure.collected = true;
    currentRoom.tiles[newPosition.y][newPosition.x].type = 'floor';

    return {
      ...state,
      player: {
        ...player,
        position: newPosition,
        gold: player.gold + gold,
      },
    };
  }

  // Handle door (move to next room)
  if (tile.type === 'door' && currentRoom.cleared) {
    return moveToNextRoom(state);
  }

  // Normal movement
  return {
    ...state,
    player: {
      ...player,
      position: newPosition,
    },
  };
}

/**
 * Perform combat action
 */
export function performCombat(state: GameState, action: CombatAction): GameState {
  const { player, currentEnemy } = state;

  if (!currentEnemy || !currentEnemy.alive) {
    return state;
  }

  let newPlayer = { ...player };
  let newEnemy = { ...currentEnemy };

  // Player attacks
  const playerDamageDealt = Math.max(1, player.attack - currentEnemy.defense);
  newEnemy.hp = Math.max(0, currentEnemy.hp - playerDamageDealt);

  console.log(`⚔️ You deal ${playerDamageDealt} damage!`);

  // Check if enemy died
  if (newEnemy.hp === 0) {
    newEnemy.alive = false;
    newPlayer.gold += currentEnemy.goldReward;
    newPlayer.enemiesKilled += 1;

    console.log(`💀 Enemy defeated! +${currentEnemy.goldReward} gold`);

    // Remove enemy from room
    const enemyTile = state.currentRoom.tiles[currentEnemy.position.y][currentEnemy.position.x];
    enemyTile.type = 'floor';
    enemyTile.enemy = undefined;

    // Update room enemies
    const roomEnemies = state.currentRoom.enemies.map(e =>
      e.id === currentEnemy.id ? newEnemy : e
    );

    // Check if room is cleared
    const allEnemiesDead = roomEnemies.every(e => !e.alive);
    const newRoom = {
      ...state.currentRoom,
      enemies: roomEnemies,
      cleared: allEnemiesDead,
    };

    if (allEnemiesDead) {
      newPlayer.roomsCleared += 1;
      console.log('🎉 Room cleared!');
    }

    return {
      ...state,
      player: newPlayer,
      currentRoom: newRoom,
      inCombat: false,
      currentEnemy: null,
    };
  }

  // Enemy attacks back
  let enemyDamageDealt = Math.max(1, currentEnemy.attack - player.defense);

  // Reduce damage if defending
  if (action.type === 'defend') {
    enemyDamageDealt = Math.max(1, Math.floor(enemyDamageDealt * 0.5));
    console.log('🛡️ You brace for impact!');
  }

  newPlayer.hp = Math.max(0, player.hp - enemyDamageDealt);
  console.log(`💥 Enemy deals ${enemyDamageDealt} damage!`);

  // Check if player died
  if (newPlayer.hp === 0) {
    console.log('☠️ You have died!');
    return {
      ...state,
      player: newPlayer,
      gameOver: true,
      inCombat: false,
    };
  }

  // Update enemy in room
  const roomEnemies = state.currentRoom.enemies.map(e =>
    e.id === currentEnemy.id ? newEnemy : e
  );

  return {
    ...state,
    player: newPlayer,
    currentEnemy: newEnemy,
    currentRoom: {
      ...state.currentRoom,
      enemies: roomEnemies,
    },
  };
}

/**
 * Move to next room
 */
function moveToNextRoom(state: GameState): GameState {
  const nextRoomNumber = state.roomNumber + 1;

  // Check if this was the last room
  if (nextRoomNumber >= state.totalRooms) {
    console.log('👑 Victory! You conquered the dungeon!');
    return {
      ...state,
      victory: true,
      gameOver: true,
      score: calculateScore(state.player),
    };
  }

  const nextRoom = generateRoom(nextRoomNumber, state.seed);

  return {
    ...state,
    currentRoom: nextRoom,
    roomNumber: nextRoomNumber,
    player: {
      ...state.player,
      position: getPlayerStartPosition(),
    },
  };
}

/**
 * Calculate final score
 */
export function calculateScore(player: Player): number {
  const { SCORE_PER_GOLD, SCORE_PER_ENEMY, SCORE_PER_ROOM, SCORE_PER_HP } = GAME_CONSTANTS;

  return (
    player.gold * SCORE_PER_GOLD +
    player.enemiesKilled * SCORE_PER_ENEMY +
    player.roomsCleared * SCORE_PER_ROOM +
    player.hp * SCORE_PER_HP
  );
}

/**
 * Save high score to local storage
 */
export function saveHighScore(state: GameState): void {
  if (typeof window === 'undefined') return;

  const score: HighScore = {
    date: state.seed,
    score: calculateScore(state.player),
    gold: state.player.gold,
    roomsCleared: state.player.roomsCleared,
    enemiesKilled: state.player.enemiesKilled,
    timestamp: Date.now(),
  };

  const scores = getHighScores();
  scores.push(score);

  // Sort by score descending and keep top 10
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);

  localStorage.setItem('dailyDungeon_highScores', JSON.stringify(topScores));
}

/**
 * Get high scores from local storage
 */
export function getHighScores(): HighScore[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem('dailyDungeon_highScores');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get today's best score
 */
export function getTodaysBestScore(): HighScore | null {
  const today = getTodaysSeed();
  const scores = getHighScores();
  const todaysScores = scores.filter(s => s.date === today);

  if (todaysScores.length === 0) return null;

  return todaysScores.reduce((best, current) =>
    current.score > best.score ? current : best
  );
}

/**
 * Generate shareable score text
 */
export function generateShareText(state: GameState): string {
  const score = calculateScore(state.player);
  const emoji = state.victory ? '👑' : '☠️';

  return `Daily Dungeon ${state.seed}
${emoji} Score: ${score}
💰 Gold: ${state.player.gold}
⚔️ Enemies: ${state.player.enemiesKilled}
🏰 Rooms: ${state.player.roomsCleared}/${state.totalRooms}
❤️ HP Left: ${state.player.hp}

Play at: [your-domain]/dungeon`;
}

/**
 * Copy score to clipboard
 */
export async function copyScoreToClipboard(state: GameState): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const text = generateShareText(state);
    await navigator.clipboard.writeText(text);
    console.log('📋 Score copied to clipboard!');
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}
