export type Sport = 'NFL' | 'NBA' | 'MLB' | 'NHL' | 'SOCCER'

export interface SportConfig {
  id: Sport
  name: string
  emoji: string
  positions: string[]
  defaultRoster: Record<string, number>
  defaultTeamCount: number
  defaultRounds: number
}

export const SPORTS: Record<Sport, SportConfig> = {
  NFL: {
    id: 'NFL',
    name: 'Football (NFL)',
    emoji: '🏈',
    positions: ['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'FLEX'],
    defaultRoster: {
      QB: 1,
      RB: 2,
      WR: 2,
      TE: 1,
      FLEX: 1,
      K: 1,
      DEF: 1,
      BENCH: 7,
    },
    defaultTeamCount: 10,
    defaultRounds: 16,
  },
  NBA: {
    id: 'NBA',
    name: 'Basketball (NBA)',
    emoji: '🏀',
    positions: ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'],
    defaultRoster: {
      PG: 1,
      SG: 1,
      SF: 1,
      PF: 1,
      C: 1,
      G: 1,   // Guard (PG/SG)
      F: 1,   // Forward (SF/PF)
      UTIL: 1, // Any position
      BENCH: 5,
    },
    defaultTeamCount: 10,
    defaultRounds: 13,
  },
  MLB: {
    id: 'MLB',
    name: 'Baseball (MLB)',
    emoji: '⚾',
    positions: ['C', '1B', '2B', '3B', 'SS', 'OF', 'SP', 'RP', 'P', 'UTIL'],
    defaultRoster: {
      C: 1,
      '1B': 1,
      '2B': 1,
      '3B': 1,
      SS: 1,
      OF: 3,
      UTIL: 1,
      SP: 2,  // Starting Pitcher
      RP: 2,  // Relief Pitcher
      P: 2,   // Any Pitcher
      BENCH: 5,
    },
    defaultTeamCount: 10,
    defaultRounds: 20,
  },
  NHL: {
    id: 'NHL',
    name: 'Hockey (NHL)',
    emoji: '🏒',
    positions: ['C', 'LW', 'RW', 'D', 'G', 'F', 'UTIL'],
    defaultRoster: {
      C: 2,   // Center
      LW: 2,  // Left Wing
      RW: 2,  // Right Wing
      D: 4,   // Defense
      G: 2,   // Goalie
      BENCH: 4,
    },
    defaultTeamCount: 10,
    defaultRounds: 16,
  },
  SOCCER: {
    id: 'SOCCER',
    name: 'Soccer (Premier League)',
    emoji: '⚽',
    positions: ['GK', 'DEF', 'MID', 'FWD'],
    defaultRoster: {
      GK: 1,   // Goalkeeper
      DEF: 4,  // Defenders
      MID: 4,  // Midfielders
      FWD: 2,  // Forwards
      BENCH: 4,
    },
    defaultTeamCount: 10,
    defaultRounds: 15,
  },
}

export const SPORT_OPTIONS = Object.values(SPORTS).map((sport) => ({
  value: sport.id,
  label: `${sport.emoji} ${sport.name}`,
  emoji: sport.emoji,
}))

export function getSportConfig(sport: Sport): SportConfig {
  return SPORTS[sport]
}

export function getSportEmoji(sport: Sport): string {
  return SPORTS[sport]?.emoji || '🏈'
}

export function getSportName(sport: Sport): string {
  return SPORTS[sport]?.name || 'Football'
}
