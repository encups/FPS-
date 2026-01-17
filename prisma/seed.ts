import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Top 200 NFL players for 2024 fantasy season (PPR scoring)
const players = [
  // Quarterbacks
  { name: 'Patrick Mahomes', position: 'QB', nflTeam: 'KC', ranking: 1, bye: 6 },
  { name: 'Josh Allen', position: 'QB', nflTeam: 'BUF', ranking: 2, bye: 12 },
  { name: 'Jalen Hurts', position: 'QB', nflTeam: 'PHI', ranking: 3, bye: 5 },
  { name: 'Lamar Jackson', position: 'QB', nflTeam: 'BAL', ranking: 4, bye: 14 },
  { name: 'Joe Burrow', position: 'QB', nflTeam: 'CIN', ranking: 5, bye: 7 },
  { name: 'Justin Herbert', position: 'QB', nflTeam: 'LAC', ranking: 6, bye: 5 },
  { name: 'Dak Prescott', position: 'QB', nflTeam: 'DAL', ranking: 7, bye: 7 },
  { name: 'Trevor Lawrence', position: 'QB', nflTeam: 'JAX', ranking: 8, bye: 9 },
  { name: 'Tua Tagovailoa', position: 'QB', nflTeam: 'MIA', ranking: 9, bye: 6 },
  { name: 'Anthony Richardson', position: 'QB', nflTeam: 'IND', ranking: 10, bye: 14 },
  { name: 'CJ Stroud', position: 'QB', nflTeam: 'HOU', ranking: 11, bye: 14 },
  { name: 'Jordan Love', position: 'QB', nflTeam: 'GB', ranking: 12, bye: 10 },
  { name: 'Brock Purdy', position: 'QB', nflTeam: 'SF', ranking: 13, bye: 9 },
  { name: 'Geno Smith', position: 'QB', nflTeam: 'SEA', ranking: 14, bye: 10 },
  { name: 'Kirk Cousins', position: 'QB', nflTeam: 'ATL', ranking: 15, bye: 12 },

  // Running Backs
  { name: 'Christian McCaffrey', position: 'RB', nflTeam: 'SF', ranking: 16, bye: 9 },
  { name: 'Bijan Robinson', position: 'RB', nflTeam: 'ATL', ranking: 17, bye: 12 },
  { name: 'Breece Hall', position: 'RB', nflTeam: 'NYJ', ranking: 18, bye: 12 },
  { name: 'Jonathan Taylor', position: 'RB', nflTeam: 'IND', ranking: 19, bye: 14 },
  { name: 'Saquon Barkley', position: 'RB', nflTeam: 'PHI', ranking: 20, bye: 5 },
  { name: 'Jahmyr Gibbs', position: 'RB', nflTeam: 'DET', ranking: 21, bye: 5 },
  { name: 'Travis Etienne', position: 'RB', nflTeam: 'JAX', ranking: 22, bye: 9 },
  { name: 'Derrick Henry', position: 'RB', nflTeam: 'BAL', ranking: 23, bye: 14 },
  { name: 'Josh Jacobs', position: 'RB', nflTeam: 'GB', ranking: 24, bye: 10 },
  { name: 'Kenneth Walker', position: 'RB', nflTeam: 'SEA', ranking: 25, bye: 10 },
  { name: 'Alvin Kamara', position: 'RB', nflTeam: 'NO', ranking: 26, bye: 12 },
  { name: 'De\'Von Achane', position: 'RB', nflTeam: 'MIA', ranking: 27, bye: 6 },
  { name: 'Kyren Williams', position: 'RB', nflTeam: 'LAR', ranking: 28, bye: 6 },
  { name: 'Isiah Pacheco', position: 'RB', nflTeam: 'KC', ranking: 29, bye: 6 },
  { name: 'Rachaad White', position: 'RB', nflTeam: 'TB', ranking: 30, bye: 11 },
  { name: 'Rhamondre Stevenson', position: 'RB', nflTeam: 'NE', ranking: 31, bye: 14 },
  { name: 'Aaron Jones', position: 'RB', nflTeam: 'MIN', ranking: 32, bye: 6 },
  { name: 'David Montgomery', position: 'RB', nflTeam: 'DET', ranking: 33, bye: 5 },
  { name: 'James Cook', position: 'RB', nflTeam: 'BUF', ranking: 34, bye: 12 },
  { name: 'Joe Mixon', position: 'RB', nflTeam: 'HOU', ranking: 35, bye: 14 },
  { name: 'Najee Harris', position: 'RB', nflTeam: 'PIT', ranking: 36, bye: 9 },
  { name: 'Tony Pollard', position: 'RB', nflTeam: 'TEN', ranking: 37, bye: 5 },
  { name: 'James Conner', position: 'RB', nflTeam: 'ARI', ranking: 38, bye: 11 },
  { name: 'Zamir White', position: 'RB', nflTeam: 'LV', ranking: 39, bye: 10 },
  { name: 'Javonte Williams', position: 'RB', nflTeam: 'DEN', ranking: 40, bye: 14 },

  // Wide Receivers
  { name: 'Tyreek Hill', position: 'WR', nflTeam: 'MIA', ranking: 41, bye: 6 },
  { name: 'CeeDee Lamb', position: 'WR', nflTeam: 'DAL', ranking: 42, bye: 7 },
  { name: 'Justin Jefferson', position: 'WR', nflTeam: 'MIN', ranking: 43, bye: 6 },
  { name: 'Ja\'Marr Chase', position: 'WR', nflTeam: 'CIN', ranking: 44, bye: 7 },
  { name: 'Amon-Ra St. Brown', position: 'WR', nflTeam: 'DET', ranking: 45, bye: 5 },
  { name: 'AJ Brown', position: 'WR', nflTeam: 'PHI', ranking: 46, bye: 5 },
  { name: 'Garrett Wilson', position: 'WR', nflTeam: 'NYJ', ranking: 47, bye: 12 },
  { name: 'Puka Nacua', position: 'WR', nflTeam: 'LAR', ranking: 48, bye: 6 },
  { name: 'Davante Adams', position: 'WR', nflTeam: 'LV', ranking: 49, bye: 10 },
  { name: 'Cooper Kupp', position: 'WR', nflTeam: 'LAR', ranking: 50, bye: 6 },
  { name: 'Stefon Diggs', position: 'WR', nflTeam: 'HOU', ranking: 51, bye: 14 },
  { name: 'DeVonta Smith', position: 'WR', nflTeam: 'PHI', ranking: 52, bye: 5 },
  { name: 'Chris Olave', position: 'WR', nflTeam: 'NO', ranking: 53, bye: 12 },
  { name: 'DK Metcalf', position: 'WR', nflTeam: 'SEA', ranking: 54, bye: 10 },
  { name: 'Deebo Samuel', position: 'WR', nflTeam: 'SF', ranking: 55, bye: 9 },
  { name: 'Brandon Aiyuk', position: 'WR', nflTeam: 'SF', ranking: 56, bye: 9 },
  { name: 'Michael Pittman Jr', position: 'WR', nflTeam: 'IND', ranking: 57, bye: 14 },
  { name: 'DJ Moore', position: 'WR', nflTeam: 'CHI', ranking: 58, bye: 7 },
  { name: 'Mike Evans', position: 'WR', nflTeam: 'TB', ranking: 59, bye: 11 },
  { name: 'Amari Cooper', position: 'WR', nflTeam: 'CLE', ranking: 60, bye: 10 },
  { name: 'Chris Godwin', position: 'WR', nflTeam: 'TB', ranking: 61, bye: 11 },
  { name: 'Drake London', position: 'WR', nflTeam: 'ATL', ranking: 62, bye: 12 },
  { name: 'Keenan Allen', position: 'WR', nflTeam: 'CHI', ranking: 63, bye: 7 },
  { name: 'Marquise Brown', position: 'WR', nflTeam: 'KC', ranking: 64, bye: 6 },
  { name: 'Terry McLaurin', position: 'WR', nflTeam: 'WAS', ranking: 65, bye: 14 },
  { name: 'Calvin Ridley', position: 'WR', nflTeam: 'TEN', ranking: 66, bye: 5 },
  { name: 'Christian Watson', position: 'WR', nflTeam: 'GB', ranking: 67, bye: 10 },
  { name: 'Jaylen Waddle', position: 'WR', nflTeam: 'MIA', ranking: 68, bye: 6 },
  { name: 'Tee Higgins', position: 'WR', nflTeam: 'CIN', ranking: 69, bye: 7 },
  { name: 'George Pickens', position: 'WR', nflTeam: 'PIT', ranking: 70, bye: 9 },
  { name: 'Christian Kirk', position: 'WR', nflTeam: 'JAX', ranking: 71, bye: 9 },
  { name: 'Zay Flowers', position: 'WR', nflTeam: 'BAL', ranking: 72, bye: 14 },
  { name: 'Jordan Addison', position: 'WR', nflTeam: 'MIN', ranking: 73, bye: 6 },
  { name: 'Jakobi Meyers', position: 'WR', nflTeam: 'LV', ranking: 74, bye: 10 },
  { name: 'Tyler Lockett', position: 'WR', nflTeam: 'SEA', ranking: 75, bye: 10 },

  // Tight Ends
  { name: 'Travis Kelce', position: 'TE', nflTeam: 'KC', ranking: 76, bye: 6 },
  { name: 'Sam LaPorta', position: 'TE', nflTeam: 'DET', ranking: 77, bye: 5 },
  { name: 'Mark Andrews', position: 'TE', nflTeam: 'BAL', ranking: 78, bye: 14 },
  { name: 'TJ Hockenson', position: 'TE', nflTeam: 'MIN', ranking: 79, bye: 6 },
  { name: 'Evan Engram', position: 'TE', nflTeam: 'JAX', ranking: 80, bye: 9 },
  { name: 'Dallas Goedert', position: 'TE', nflTeam: 'PHI', ranking: 81, bye: 5 },
  { name: 'Kyle Pitts', position: 'TE', nflTeam: 'ATL', ranking: 82, bye: 12 },
  { name: 'George Kittle', position: 'TE', nflTeam: 'SF', ranking: 83, bye: 9 },
  { name: 'Trey McBride', position: 'TE', nflTeam: 'ARI', ranking: 84, bye: 11 },
  { name: 'David Njoku', position: 'TE', nflTeam: 'CLE', ranking: 85, bye: 10 },
  { name: 'Dalton Kincaid', position: 'TE', nflTeam: 'BUF', ranking: 86, bye: 12 },
  { name: 'Jake Ferguson', position: 'TE', nflTeam: 'DAL', ranking: 87, bye: 7 },
  { name: 'Pat Freiermuth', position: 'TE', nflTeam: 'PIT', ranking: 88, bye: 9 },
  { name: 'Cole Kmet', position: 'TE', nflTeam: 'CHI', ranking: 89, bye: 7 },
  { name: 'Tyler Conklin', position: 'TE', nflTeam: 'NYJ', ranking: 90, bye: 12 },

  // Kickers
  { name: 'Justin Tucker', position: 'K', nflTeam: 'BAL', ranking: 91, bye: 14 },
  { name: 'Harrison Butker', position: 'K', nflTeam: 'KC', ranking: 92, bye: 6 },
  { name: 'Tyler Bass', position: 'K', nflTeam: 'BUF', ranking: 93, bye: 12 },
  { name: 'Jake Elliott', position: 'K', nflTeam: 'PHI', ranking: 94, bye: 5 },
  { name: 'Brandon Aubrey', position: 'K', nflTeam: 'DAL', ranking: 95, bye: 7 },
  { name: 'Evan McPherson', position: 'K', nflTeam: 'CIN', ranking: 96, bye: 7 },
  { name: 'Cameron Dicker', position: 'K', nflTeam: 'LAC', ranking: 97, bye: 5 },
  { name: 'Daniel Carlson', position: 'K', nflTeam: 'LV', ranking: 98, bye: 10 },
  { name: 'Jake Moody', position: 'K', nflTeam: 'SF', ranking: 99, bye: 9 },
  { name: 'Jason Sanders', position: 'K', nflTeam: 'MIA', ranking: 100, bye: 6 },

  // Defenses
  { name: '49ers Defense', position: 'DEF', nflTeam: 'SF', ranking: 101, bye: 9 },
  { name: 'Cowboys Defense', position: 'DEF', nflTeam: 'DAL', ranking: 102, bye: 7 },
  { name: 'Browns Defense', position: 'DEF', nflTeam: 'CLE', ranking: 103, bye: 10 },
  { name: 'Bills Defense', position: 'DEF', nflTeam: 'BUF', ranking: 104, bye: 12 },
  { name: 'Ravens Defense', position: 'DEF', nflTeam: 'BAL', ranking: 105, bye: 14 },
  { name: 'Jets Defense', position: 'DEF', nflTeam: 'NYJ', ranking: 106, bye: 12 },
  { name: 'Chiefs Defense', position: 'DEF', nflTeam: 'KC', ranking: 107, bye: 6 },
  { name: 'Eagles Defense', position: 'DEF', nflTeam: 'PHI', ranking: 108, bye: 5 },
  { name: 'Steelers Defense', position: 'DEF', nflTeam: 'PIT', ranking: 109, bye: 9 },
  { name: 'Dolphins Defense', position: 'DEF', nflTeam: 'MIA', ranking: 110, bye: 6 },

  // More depth players (WR/RB/QB)
  { name: 'Diontae Johnson', position: 'WR', nflTeam: 'CAR', ranking: 111, bye: 11 },
  { name: 'DeAndre Hopkins', position: 'WR', nflTeam: 'TEN', ranking: 112, bye: 5 },
  { name: 'Courtland Sutton', position: 'WR', nflTeam: 'DEN', ranking: 113, bye: 14 },
  { name: 'Brandin Cooks', position: 'WR', nflTeam: 'DAL', ranking: 114, bye: 7 },
  { name: 'Romeo Doubs', position: 'WR', nflTeam: 'GB', ranking: 115, bye: 10 },
  { name: 'Jaxon Smith-Njigba', position: 'WR', nflTeam: 'SEA', ranking: 116, bye: 10 },
  { name: 'Rashee Rice', position: 'WR', nflTeam: 'KC', ranking: 117, bye: 6 },
  { name: 'Josh Downs', position: 'WR', nflTeam: 'IND', ranking: 118, bye: 14 },
  { name: 'Rashid Shaheed', position: 'WR', nflTeam: 'NO', ranking: 119, bye: 12 },
  { name: 'Curtis Samuel', position: 'WR', nflTeam: 'BUF', ranking: 120, bye: 12 },

  { name: 'Zack Moss', position: 'RB', nflTeam: 'CIN', ranking: 121, bye: 7 },
  { name: 'Gus Edwards', position: 'RB', nflTeam: 'LAC', ranking: 122, bye: 5 },
  { name: 'Jerome Ford', position: 'RB', nflTeam: 'CLE', ranking: 123, bye: 10 },
  { name: 'Tyler Allgeier', position: 'RB', nflTeam: 'ATL', ranking: 124, bye: 12 },
  { name: 'AJ Dillon', position: 'RB', nflTeam: 'GB', ranking: 125, bye: 10 },
  { name: 'Tyjae Spears', position: 'RB', nflTeam: 'TEN', ranking: 126, bye: 5 },
  { name: 'Jaylen Warren', position: 'RB', nflTeam: 'PIT', ranking: 127, bye: 9 },
  { name: 'Khalil Herbert', position: 'RB', nflTeam: 'CHI', ranking: 128, bye: 7 },
  { name: 'Samaje Perine', position: 'RB', nflTeam: 'DEN', ranking: 129, bye: 14 },
  { name: 'Elijah Mitchell', position: 'RB', nflTeam: 'SF', ranking: 130, bye: 9 },

  { name: 'Aaron Rodgers', position: 'QB', nflTeam: 'NYJ', ranking: 131, bye: 12 },
  { name: 'Deshaun Watson', position: 'QB', nflTeam: 'CLE', ranking: 132, bye: 10 },
  { name: 'Matthew Stafford', position: 'QB', nflTeam: 'LAR', ranking: 133, bye: 6 },
  { name: 'Russell Wilson', position: 'QB', nflTeam: 'PIT', ranking: 134, bye: 9 },
  { name: 'Derek Carr', position: 'QB', nflTeam: 'NO', ranking: 135, bye: 12 },
  { name: 'Baker Mayfield', position: 'QB', nflTeam: 'TB', ranking: 136, bye: 11 },
  { name: 'Jared Goff', position: 'QB', nflTeam: 'DET', ranking: 137, bye: 5 },
  { name: 'Daniel Jones', position: 'QB', nflTeam: 'NYG', ranking: 138, bye: 11 },
  { name: 'Kyler Murray', position: 'QB', nflTeam: 'ARI', ranking: 139, bye: 11 },
  { name: 'Justin Fields', position: 'QB', nflTeam: 'CHI', ranking: 140, bye: 7 },

  // Additional depth
  { name: 'Quentin Johnston', position: 'WR', nflTeam: 'LAC', ranking: 141, bye: 5 },
  { name: 'Elijah Moore', position: 'WR', nflTeam: 'CLE', ranking: 142, bye: 10 },
  { name: 'Wan\'Dale Robinson', position: 'WR', nflTeam: 'NYG', ranking: 143, bye: 11 },
  { name: 'Tutu Atwell', position: 'WR', nflTeam: 'LAR', ranking: 144, bye: 6 },
  { name: 'Marvin Mims', position: 'WR', nflTeam: 'DEN', ranking: 145, bye: 14 },
  { name: 'Tank Dell', position: 'WR', nflTeam: 'HOU', ranking: 146, bye: 14 },
  { name: 'Michael Wilson', position: 'WR', nflTeam: 'ARI', ranking: 147, bye: 11 },
  { name: 'Darnell Mooney', position: 'WR', nflTeam: 'ATL', ranking: 148, bye: 12 },
  { name: 'Kadarius Toney', position: 'WR', nflTeam: 'KC', ranking: 149, bye: 6 },
  { name: 'Jameson Williams', position: 'WR', nflTeam: 'DET', ranking: 150, bye: 5 },

  { name: 'Rico Dowdle', position: 'RB', nflTeam: 'DAL', ranking: 151, bye: 7 },
  { name: 'Clyde Edwards-Helaire', position: 'RB', nflTeam: 'KC', ranking: 152, bye: 6 },
  { name: 'Roschon Johnson', position: 'RB', nflTeam: 'CHI', ranking: 153, bye: 7 },
  { name: 'Ty Chandler', position: 'RB', nflTeam: 'MIN', ranking: 154, bye: 6 },
  { name: 'Kenneth Gainwell', position: 'RB', nflTeam: 'PHI', ranking: 155, bye: 5 },
  { name: 'Justice Hill', position: 'RB', nflTeam: 'BAL', ranking: 156, bye: 14 },
  { name: 'Chuba Hubbard', position: 'RB', nflTeam: 'CAR', ranking: 157, bye: 11 },
  { name: 'Michael Carter', position: 'RB', nflTeam: 'ARI', ranking: 158, bye: 11 },
  { name: 'Dameon Pierce', position: 'RB', nflTeam: 'HOU', ranking: 159, bye: 14 },
  { name: 'Raheem Mostert', position: 'RB', nflTeam: 'MIA', ranking: 160, bye: 6 },

  { name: 'Hunter Henry', position: 'TE', nflTeam: 'NE', ranking: 161, bye: 14 },
  { name: 'Chigoziem Okonkwo', position: 'TE', nflTeam: 'TEN', ranking: 162, bye: 5 },
  { name: 'Juwan Johnson', position: 'TE', nflTeam: 'NO', ranking: 163, bye: 12 },
  { name: 'Luke Musgrave', position: 'TE', nflTeam: 'GB', ranking: 164, bye: 10 },
  { name: 'Gerald Everett', position: 'TE', nflTeam: 'CHI', ranking: 165, bye: 7 },
  { name: 'Taysom Hill', position: 'TE', nflTeam: 'NO', ranking: 166, bye: 12 },
  { name: 'Noah Fant', position: 'TE', nflTeam: 'SEA', ranking: 167, bye: 10 },
  { name: 'Dawson Knox', position: 'TE', nflTeam: 'BUF', ranking: 168, bye: 12 },
  { name: 'Michael Mayer', position: 'TE', nflTeam: 'LV', ranking: 169, bye: 10 },
  { name: 'Jonnu Smith', position: 'TE', nflTeam: 'MIA', ranking: 170, bye: 6 },

  { name: 'Will Lutz', position: 'K', nflTeam: 'DEN', ranking: 171, bye: 14 },
  { name: 'Younghoe Koo', position: 'K', nflTeam: 'ATL', ranking: 172, bye: 12 },
  { name: 'Greg Joseph', position: 'K', nflTeam: 'GB', ranking: 173, bye: 10 },
  { name: 'Ka\'imi Fairbairn', position: 'K', nflTeam: 'HOU', ranking: 174, bye: 14 },
  { name: 'Matt Gay', position: 'K', nflTeam: 'IND', ranking: 175, bye: 14 },
  { name: 'Jake Bates', position: 'K', nflTeam: 'DET', ranking: 176, bye: 5 },
  { name: 'Cairo Santos', position: 'K', nflTeam: 'CHI', ranking: 177, bye: 7 },
  { name: 'Chase McLaughlin', position: 'K', nflTeam: 'TB', ranking: 178, bye: 11 },
  { name: 'Greg Zuerlein', position: 'K', nflTeam: 'NYJ', ranking: 179, bye: 12 },
  { name: 'Chris Boswell', position: 'K', nflTeam: 'PIT', ranking: 180, bye: 9 },

  { name: 'Packers Defense', position: 'DEF', nflTeam: 'GB', ranking: 181, bye: 10 },
  { name: 'Saints Defense', position: 'DEF', nflTeam: 'NO', ranking: 182, bye: 12 },
  { name: 'Chargers Defense', position: 'DEF', nflTeam: 'LAC', ranking: 183, bye: 5 },
  { name: 'Seahawks Defense', position: 'DEF', nflTeam: 'SEA', ranking: 184, bye: 10 },
  { name: 'Bengals Defense', position: 'DEF', nflTeam: 'CIN', ranking: 185, bye: 7 },
  { name: 'Commanders Defense', position: 'DEF', nflTeam: 'WAS', ranking: 186, bye: 14 },
  { name: 'Lions Defense', position: 'DEF', nflTeam: 'DET', ranking: 187, bye: 5 },
  { name: 'Rams Defense', position: 'DEF', nflTeam: 'LAR', ranking: 188, bye: 6 },
  { name: 'Colts Defense', position: 'DEF', nflTeam: 'IND', ranking: 189, bye: 14 },
  { name: 'Falcons Defense', position: 'DEF', nflTeam: 'ATL', ranking: 190, bye: 12 },

  // Last 10 for 200 total
  { name: 'Will Levis', position: 'QB', nflTeam: 'TEN', ranking: 191, bye: 5 },
  { name: 'Bryce Young', position: 'QB', nflTeam: 'CAR', ranking: 192, bye: 11 },
  { name: 'Sam Howell', position: 'QB', nflTeam: 'WAS', ranking: 193, bye: 14 },
  { name: 'Aidan O\'Connell', position: 'QB', nflTeam: 'LV', ranking: 194, bye: 10 },
  { name: 'Joshua Palmer', position: 'WR', nflTeam: 'LAC', ranking: 195, bye: 5 },
  { name: 'KJ Osborn', position: 'WR', nflTeam: 'NE', ranking: 196, bye: 14 },
  { name: 'Jaleel McLaughlin', position: 'RB', nflTeam: 'DEN', ranking: 197, bye: 14 },
  { name: 'Kareem Hunt', position: 'RB', nflTeam: 'CLE', ranking: 198, bye: 10 },
  { name: 'Texans Defense', position: 'DEF', nflTeam: 'HOU', ranking: 199, bye: 14 },
  { name: 'Jaguars Defense', position: 'DEF', nflTeam: 'JAX', ranking: 200, bye: 9 },
]

async function main() {
  console.log('Start seeding players...')

  for (const player of players) {
    await prisma.player.upsert({
      where: { ranking: player.ranking },
      update: player,
      create: player,
    })
  }

  console.log('Seeding finished.')
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
