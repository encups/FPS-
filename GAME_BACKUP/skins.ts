/**
 * Knight cosmetic skins
 */

export interface KnightSkin {
  id: string;
  name: string;
  description: string;
  color: string;
  accentColor: string;
  price: number; // in dollars, 0 = free
  emoji: string;
  unlocked: boolean;
}

export const KNIGHT_SKINS: KnightSkin[] = [
  {
    id: 'default',
    name: 'Blue Knight',
    description: 'Classic hero of the realm',
    color: '#3b82f6',
    accentColor: '#60a5fa',
    price: 0,
    emoji: '🛡️',
    unlocked: true,
  },
  {
    id: 'crimson',
    name: 'Crimson Crusader',
    description: 'Forged in dragon fire',
    color: '#dc2626',
    accentColor: '#ef4444',
    price: 0.99,
    emoji: '🔥',
    unlocked: false,
  },
  {
    id: 'emerald',
    name: 'Emerald Guardian',
    description: 'Protector of the forest',
    color: '#059669',
    accentColor: '#10b981',
    price: 0.99,
    emoji: '🌲',
    unlocked: false,
  },
  {
    id: 'golden',
    name: 'Golden Champion',
    description: 'Blessed by the sun',
    color: '#d97706',
    accentColor: '#f59e0b',
    price: 1.99,
    emoji: '👑',
    unlocked: false,
  },
  {
    id: 'shadow',
    name: 'Shadow Assassin',
    description: 'Master of stealth',
    color: '#4c1d95',
    accentColor: '#7c3aed',
    price: 1.99,
    emoji: '🌙',
    unlocked: false,
  },
];

/**
 * Get current selected skin
 */
export function getCurrentSkin(): string {
  if (typeof window === 'undefined') return 'default';
  return localStorage.getItem('dailyDungeon_currentSkin') || 'default';
}

/**
 * Set current skin
 */
export function setCurrentSkin(skinId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dailyDungeon_currentSkin', skinId);
}

/**
 * Get unlocked skins
 */
export function getUnlockedSkins(): string[] {
  if (typeof window === 'undefined') return ['default'];
  const stored = localStorage.getItem('dailyDungeon_unlockedSkins');
  return stored ? JSON.parse(stored) : ['default'];
}

/**
 * Unlock a skin (simulate purchase)
 */
export function unlockSkin(skinId: string): void {
  if (typeof window === 'undefined') return;

  const unlocked = getUnlockedSkins();
  if (!unlocked.includes(skinId)) {
    unlocked.push(skinId);
    localStorage.setItem('dailyDungeon_unlockedSkins', JSON.stringify(unlocked));
  }
}

/**
 * Get skin by ID
 */
export function getSkinById(skinId: string): KnightSkin {
  const skin = KNIGHT_SKINS.find(s => s.id === skinId);
  if (!skin) return KNIGHT_SKINS[0];

  const unlocked = getUnlockedSkins();
  return {
    ...skin,
    unlocked: unlocked.includes(skinId),
  };
}

/**
 * Get all skins with unlock status
 */
export function getAllSkins(): KnightSkin[] {
  const unlocked = getUnlockedSkins();
  return KNIGHT_SKINS.map(skin => ({
    ...skin,
    unlocked: unlocked.includes(skin.id),
  }));
}
