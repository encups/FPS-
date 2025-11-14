/**
 * Seeded random number generator using Mulberry32
 * Ensures deterministic random generation for daily dungeons
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    // Convert string seed to number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    this.seed = Math.abs(hash);
  }

  /**
   * Generate next random number between 0 and 1
   */
  next(): number {
    this.seed = (this.seed + 0x6D2B79F5) | 0;
    let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generate random integer between min (inclusive) and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Shuffle an array in place using Fisher-Yates algorithm
   */
  shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Pick a random element from an array
   */
  choice<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)];
  }
}

/**
 * Get today's date seed (YYYY-MM-DD format)
 */
export function getTodaysSeed(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
