import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Multi-sport player database
const players = [
  // ========== NFL (Football) ==========
  // Quarterbacks
  { name: 'Patrick Mahomes', position: 'QB', sport: 'NFL', team: 'Chiefs', ranking: 1, bye: 6 },
  { name: 'Josh Allen', position: 'QB', sport: 'NFL', team: 'Bills', ranking: 2, bye: 12 },
  { name: 'Jalen Hurts', position: 'QB', sport: 'NFL', team: 'Eagles', ranking: 3, bye: 5 },
  { name: 'Lamar Jackson', position: 'QB', sport: 'NFL', team: 'Ravens', ranking: 4, bye: 14 },
  { name: 'Joe Burrow', position: 'QB', sport: 'NFL', team: 'Bengals', ranking: 5, bye: 7 },

  // Running Backs
  { name: 'Christian McCaffrey', position: 'RB', sport: 'NFL', team: '49ers', ranking: 6, bye: 9 },
  { name: 'Bijan Robinson', position: 'RB', sport: 'NFL', team: 'Falcons', ranking: 7, bye: 12 },
  { name: 'Breece Hall', position: 'RB', sport: 'NFL', team: 'Jets', ranking: 8, bye: 12 },
  { name: 'Saquon Barkley', position: 'RB', sport: 'NFL', team: 'Eagles', ranking: 9, bye: 5 },
  { name: 'Derrick Henry', position: 'RB', sport: 'NFL', team: 'Ravens', ranking: 10, bye: 14 },

  // Wide Receivers
  { name: 'Tyreek Hill', position: 'WR', sport: 'NFL', team: 'Dolphins', ranking: 11, bye: 6 },
  { name: 'CeeDee Lamb', position: 'WR', sport: 'NFL', team: 'Cowboys', ranking: 12, bye: 7 },
  { name: 'Justin Jefferson', position: 'WR', sport: 'NFL', team: 'Vikings', ranking: 13, bye: 6 },
  { name: 'Ja\'Marr Chase', position: 'WR', sport: 'NFL', team: 'Bengals', ranking: 14, bye: 7 },
  { name: 'Amon-Ra St. Brown', position: 'WR', sport: 'NFL', team: 'Lions', ranking: 15, bye: 5 },

  // Tight Ends
  { name: 'Travis Kelce', position: 'TE', sport: 'NFL', team: 'Chiefs', ranking: 16, bye: 6 },
  { name: 'Sam LaPorta', position: 'TE', sport: 'NFL', team: 'Lions', ranking: 17, bye: 5 },
  { name: 'Mark Andrews', position: 'TE', sport: 'NFL', team: 'Ravens', ranking: 18, bye: 14 },
  { name: 'George Kittle', position: 'TE', sport: 'NFL', team: '49ers', ranking: 19, bye: 9 },
  { name: 'TJ Hockenson', position: 'TE', sport: 'NFL', team: 'Vikings', ranking: 20, bye: 6 },

  // Kickers & Defense
  { name: 'Justin Tucker', position: 'K', sport: 'NFL', team: 'Ravens', ranking: 21, bye: 14 },
  { name: 'Harrison Butker', position: 'K', sport: 'NFL', team: 'Chiefs', ranking: 22, bye: 6 },
  { name: '49ers Defense', position: 'DEF', sport: 'NFL', team: '49ers', ranking: 23, bye: 9 },
  { name: 'Cowboys Defense', position: 'DEF', sport: 'NFL', team: 'Cowboys', ranking: 24, bye: 7 },
  { name: 'Ravens Defense', position: 'DEF', sport: 'NFL', team: 'Ravens', ranking: 25, bye: 14 },

  // ========== NBA (Basketball) ==========
  // Point Guards
  { name: 'Luka Doncic', position: 'PG', sport: 'NBA', team: 'Mavericks', ranking: 1 },
  { name: 'Shai Gilgeous-Alexander', position: 'PG', sport: 'NBA', team: 'Thunder', ranking: 2 },
  { name: 'Stephen Curry', position: 'PG', sport: 'NBA', team: 'Warriors', ranking: 3 },
  { name: 'Trae Young', position: 'PG', sport: 'NBA', team: 'Hawks', ranking: 4 },
  { name: 'Damian Lillard', position: 'PG', sport: 'NBA', team: 'Bucks', ranking: 5 },

  // Shooting Guards
  { name: 'Donovan Mitchell', position: 'SG', sport: 'NBA', team: 'Cavaliers', ranking: 6 },
  { name: 'Devin Booker', position: 'SG', sport: 'NBA', team: 'Suns', ranking: 7 },
  { name: 'Anthony Edwards', position: 'SG', sport: 'NBA', team: 'Timberwolves', ranking: 8 },
  { name: 'Kyrie Irving', position: 'SG', sport: 'NBA', team: 'Mavericks', ranking: 9 },
  { name: 'Jaylen Brown', position: 'SG', sport: 'NBA', team: 'Celtics', ranking: 10 },

  // Small Forwards
  { name: 'LeBron James', position: 'SF', sport: 'NBA', team: 'Lakers', ranking: 11 },
  { name: 'Kevin Durant', position: 'SF', sport: 'NBA', team: 'Suns', ranking: 12 },
  { name: 'Jayson Tatum', position: 'SF', sport: 'NBA', team: 'Celtics', ranking: 13 },
  { name: 'Kawhi Leonard', position: 'SF', sport: 'NBA', team: 'Clippers', ranking: 14 },
  { name: 'Jimmy Butler', position: 'SF', sport: 'NBA', team: 'Heat', ranking: 15 },

  // Power Forwards
  { name: 'Giannis Antetokounmpo', position: 'PF', sport: 'NBA', team: 'Bucks', ranking: 16 },
  { name: 'Nikola Jokic', position: 'PF', sport: 'NBA', team: 'Nuggets', ranking: 17 },
  { name: 'Anthony Davis', position: 'PF', sport: 'NBA', team: 'Lakers', ranking: 18 },
  { name: 'Paolo Banchero', position: 'PF', sport: 'NBA', team: 'Magic', ranking: 19 },
  { name: 'Zion Williamson', position: 'PF', sport: 'NBA', team: 'Pelicans', ranking: 20 },

  // Centers
  { name: 'Joel Embiid', position: 'C', sport: 'NBA', team: '76ers', ranking: 21 },
  { name: 'Victor Wembanyama', position: 'C', sport: 'NBA', team: 'Spurs', ranking: 22 },
  { name: 'Nikola Vucevic', position: 'C', sport: 'NBA', team: 'Bulls', ranking: 23 },
  { name: 'Domantas Sabonis', position: 'C', sport: 'NBA', team: 'Kings', ranking: 24 },
  { name: 'Bam Adebayo', position: 'C', sport: 'NBA', team: 'Heat', ranking: 25 },

  // ========== MLB (Baseball) ==========
  // Catchers
  { name: 'Will Smith', position: 'C', sport: 'MLB', team: 'Dodgers', ranking: 1 },
  { name: 'Salvador Perez', position: 'C', sport: 'MLB', team: 'Royals', ranking: 2 },
  { name: 'J.T. Realmuto', position: 'C', sport: 'MLB', team: 'Phillies', ranking: 3 },
  { name: 'Adley Rutschman', position: 'C', sport: 'MLB', team: 'Orioles', ranking: 4 },
  { name: 'Sean Murphy', position: 'C', sport: 'MLB', team: 'Braves', ranking: 5 },

  // First Base
  { name: 'Freddie Freeman', position: '1B', sport: 'MLB', team: 'Dodgers', ranking: 6 },
  { name: 'Matt Olson', position: '1B', sport: 'MLB', team: 'Braves', ranking: 7 },
  { name: 'Vladimir Guerrero Jr', position: '1B', sport: 'MLB', team: 'Blue Jays', ranking: 8 },
  { name: 'Pete Alonso', position: '1B', sport: 'MLB', team: 'Mets', ranking: 9 },
  { name: 'Paul Goldschmidt', position: '1B', sport: 'MLB', team: 'Cardinals', ranking: 10 },

  // Second Base
  { name: 'Jose Altuve', position: '2B', sport: 'MLB', team: 'Astros', ranking: 11 },
  { name: 'Marcus Semien', position: '2B', sport: 'MLB', team: 'Rangers', ranking: 12 },
  { name: 'Gleyber Torres', position: '2B', sport: 'MLB', team: 'Yankees', ranking: 13 },
  { name: 'Ozzie Albies', position: '2B', sport: 'MLB', team: 'Braves', ranking: 14 },
  { name: 'Jazz Chisholm Jr', position: '2B', sport: 'MLB', team: 'Marlins', ranking: 15 },

  // Shortstops
  { name: 'Bobby Witt Jr', position: 'SS', sport: 'MLB', team: 'Royals', ranking: 16 },
  { name: 'Trea Turner', position: 'SS', sport: 'MLB', team: 'Phillies', ranking: 17 },
  { name: 'Corey Seager', position: 'SS', sport: 'MLB', team: 'Rangers', ranking: 18 },
  { name: 'Francisco Lindor', position: 'SS', sport: 'MLB', team: 'Mets', ranking: 19 },
  { name: 'Dansby Swanson', position: 'SS', sport: 'MLB', team: 'Cubs', ranking: 20 },

  // Outfielders
  { name: 'Mookie Betts', position: 'OF', sport: 'MLB', team: 'Dodgers', ranking: 21 },
  { name: 'Aaron Judge', position: 'OF', sport: 'MLB', team: 'Yankees', ranking: 22 },
  { name: 'Ronald Acuna Jr', position: 'OF', sport: 'MLB', team: 'Braves', ranking: 23 },
  { name: 'Mike Trout', position: 'OF', sport: 'MLB', team: 'Angels', ranking: 24 },
  { name: 'Kyle Tucker', position: 'OF', sport: 'MLB', team: 'Astros', ranking: 25 },
  { name: 'Juan Soto', position: 'OF', sport: 'MLB', team: 'Yankees', ranking: 26 },
  { name: 'Julio Rodriguez', position: 'OF', sport: 'MLB', team: 'Mariners', ranking: 27 },

  // Starting Pitchers
  { name: 'Gerrit Cole', position: 'SP', sport: 'MLB', team: 'Yankees', ranking: 28 },
  { name: 'Spencer Strider', position: 'SP', sport: 'MLB', team: 'Braves', ranking: 29 },
  { name: 'Zac Gallen', position: 'SP', sport: 'MLB', team: 'Diamondbacks', ranking: 30 },
  { name: 'Blake Snell', position: 'SP', sport: 'MLB', team: 'Padres', ranking: 31 },
  { name: 'Corbin Burnes', position: 'SP', sport: 'MLB', team: 'Orioles', ranking: 32 },

  // Relief Pitchers
  { name: 'Josh Hader', position: 'RP', sport: 'MLB', team: 'Astros', ranking: 33 },
  { name: 'Emmanuel Clase', position: 'RP', sport: 'MLB', team: 'Guardians', ranking: 34 },
  { name: 'Edwin Diaz', position: 'RP', sport: 'MLB', team: 'Mets', ranking: 35 },

  // ========== NHL (Hockey) ==========
  // Centers
  { name: 'Connor McDavid', position: 'C', sport: 'NHL', team: 'Oilers', ranking: 1 },
  { name: 'Nathan MacKinnon', position: 'C', sport: 'NHL', team: 'Avalanche', ranking: 2 },
  { name: 'Auston Matthews', position: 'C', sport: 'NHL', team: 'Maple Leafs', ranking: 3 },
  { name: 'Sidney Crosby', position: 'C', sport: 'NHL', team: 'Penguins', ranking: 4 },
  { name: 'Leon Draisaitl', position: 'C', sport: 'NHL', team: 'Oilers', ranking: 5 },

  // Left Wing
  { name: 'Artemi Panarin', position: 'LW', sport: 'NHL', team: 'Rangers', ranking: 6 },
  { name: 'Alex Ovechkin', position: 'LW', sport: 'NHL', team: 'Capitals', ranking: 7 },
  { name: 'Matthew Tkachuk', position: 'LW', sport: 'NHL', team: 'Panthers', ranking: 8 },
  { name: 'Brad Marchand', position: 'LW', sport: 'NHL', team: 'Bruins', ranking: 9 },
  { name: 'Kirill Kaprizov', position: 'LW', sport: 'NHL', team: 'Wild', ranking: 10 },

  // Right Wing
  { name: 'Nikita Kucherov', position: 'RW', sport: 'NHL', team: 'Lightning', ranking: 11 },
  { name: 'David Pastrnak', position: 'RW', sport: 'NHL', team: 'Bruins', ranking: 12 },
  { name: 'Mitch Marner', position: 'RW', sport: 'NHL', team: 'Maple Leafs', ranking: 13 },
  { name: 'Mikko Rantanen', position: 'RW', sport: 'NHL', team: 'Avalanche', ranking: 14 },
  { name: 'Tim Stutzle', position: 'RW', sport: 'NHL', team: 'Senators', ranking: 15 },

  // Defense
  { name: 'Cale Makar', position: 'D', sport: 'NHL', team: 'Avalanche', ranking: 16 },
  { name: 'Quinn Hughes', position: 'D', sport: 'NHL', team: 'Canucks', ranking: 17 },
  { name: 'Adam Fox', position: 'D', sport: 'NHL', team: 'Rangers', ranking: 18 },
  { name: 'Roman Josi', position: 'D', sport: 'NHL', team: 'Predators', ranking: 19 },
  { name: 'Rasmus Dahlin', position: 'D', sport: 'NHL', team: 'Sabres', ranking: 20 },

  // Goalies
  { name: 'Connor Hellebuyck', position: 'G', sport: 'NHL', team: 'Jets', ranking: 21 },
  { name: 'Igor Shesterkin', position: 'G', sport: 'NHL', team: 'Rangers', ranking: 22 },
  { name: 'Andrei Vasilevskiy', position: 'G', sport: 'NHL', team: 'Lightning', ranking: 23 },
  { name: 'Juuse Saros', position: 'G', sport: 'NHL', team: 'Predators', ranking: 24 },
  { name: 'Ilya Sorokin', position: 'G', sport: 'NHL', team: 'Islanders', ranking: 25 },

  // ========== SOCCER (Premier League) ==========
  // Goalkeepers
  { name: 'Alisson Becker', position: 'GK', sport: 'SOCCER', team: 'Liverpool', ranking: 1 },
  { name: 'Ederson', position: 'GK', sport: 'SOCCER', team: 'Man City', ranking: 2 },
  { name: 'David Raya', position: 'GK', sport: 'SOCCER', team: 'Arsenal', ranking: 3 },
  { name: 'Aaron Ramsdale', position: 'GK', sport: 'SOCCER', team: 'Arsenal', ranking: 4 },
  { name: 'Nick Pope', position: 'GK', sport: 'SOCCER', team: 'Newcastle', ranking: 5 },

  // Defenders
  { name: 'Trent Alexander-Arnold', position: 'DEF', sport: 'SOCCER', team: 'Liverpool', ranking: 6 },
  { name: 'Virgil van Dijk', position: 'DEF', sport: 'SOCCER', team: 'Liverpool', ranking: 7 },
  { name: 'Ruben Dias', position: 'DEF', sport: 'SOCCER', team: 'Man City', ranking: 8 },
  { name: 'William Saliba', position: 'DEF', sport: 'SOCCER', team: 'Arsenal', ranking: 9 },
  { name: 'Ben White', position: 'DEF', sport: 'SOCCER', team: 'Arsenal', ranking: 10 },
  { name: 'Kieran Trippier', position: 'DEF', sport: 'SOCCER', team: 'Newcastle', ranking: 11 },
  { name: 'Reece James', position: 'DEF', sport: 'SOCCER', team: 'Chelsea', ranking: 12 },

  // Midfielders
  { name: 'Kevin De Bruyne', position: 'MID', sport: 'SOCCER', team: 'Man City', ranking: 13 },
  { name: 'Martin Odegaard', position: 'MID', sport: 'SOCCER', team: 'Arsenal', ranking: 14 },
  { name: 'Bruno Fernandes', position: 'MID', sport: 'SOCCER', team: 'Man United', ranking: 15 },
  { name: 'Mohamed Salah', position: 'MID', sport: 'SOCCER', team: 'Liverpool', ranking: 16 },
  { name: 'Bukayo Saka', position: 'MID', sport: 'SOCCER', team: 'Arsenal', ranking: 17 },
  { name: 'Phil Foden', position: 'MID', sport: 'SOCCER', team: 'Man City', ranking: 18 },
  { name: 'James Maddison', position: 'MID', sport: 'SOCCER', team: 'Tottenham', ranking: 19 },
  { name: 'Cole Palmer', position: 'MID', sport: 'SOCCER', team: 'Chelsea', ranking: 20 },

  // Forwards
  { name: 'Erling Haaland', position: 'FWD', sport: 'SOCCER', team: 'Man City', ranking: 21 },
  { name: 'Harry Kane', position: 'FWD', sport: 'SOCCER', team: 'Bayern Munich', ranking: 22 },
  { name: 'Son Heung-min', position: 'FWD', sport: 'SOCCER', team: 'Tottenham', ranking: 23 },
  { name: 'Alexander Isak', position: 'FWD', sport: 'SOCCER', team: 'Newcastle', ranking: 24 },
  { name: 'Ollie Watkins', position: 'FWD', sport: 'SOCCER', team: 'Aston Villa', ranking: 25 },
]

async function main() {
  console.log('🚀 Starting multi-sport player seeding...')

  let nflCount = 0
  let nbaCount = 0
  let mlbCount = 0
  let nhlCount = 0
  let soccerCount = 0

  for (const player of players) {
    await prisma.player.upsert({
      where: {
        name_position_sport: {
          name: player.name,
          position: player.position,
          sport: player.sport,
        }
      },
      update: player,
      create: player,
    })

    // Count by sport
    if (player.sport === 'NFL') nflCount++
    else if (player.sport === 'NBA') nbaCount++
    else if (player.sport === 'MLB') mlbCount++
    else if (player.sport === 'NHL') nhlCount++
    else if (player.sport === 'SOCCER') soccerCount++
  }

  console.log('\n✅ Seeding complete!')
  console.log(`🏈 NFL Players: ${nflCount}`)
  console.log(`🏀 NBA Players: ${nbaCount}`)
  console.log(`⚾ MLB Players: ${mlbCount}`)
  console.log(`🏒 NHL Players: ${nhlCount}`)
  console.log(`⚽ Soccer Players: ${soccerCount}`)
  console.log(`📊 Total: ${players.length} players\n`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
