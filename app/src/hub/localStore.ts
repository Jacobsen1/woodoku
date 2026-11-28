import type { HighscoreStore, Score } from './contract'

// Standalone HighscoreStore, same storage format as the game hub's, so scores
// are shared when the game runs on its own on the same origin.
const keyFor = (game: string) => `game-hub:highscore:${game}`

const isScore = (v: unknown): v is Score =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as Score).name === 'string' &&
  typeof (v as Score).value === 'number' &&
  typeof (v as Score).date === 'string'

function read(game: string): Score[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(keyFor(game)) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isScore) : []
  } catch {
    return []
  }
}

export const localStore: HighscoreStore = {
  async list(game, variant) {
    const scores = read(game)
    return variant === undefined ? scores : scores.filter((s) => s.variant === variant)
  },
  async add(game, score) {
    localStorage.setItem(keyFor(game), JSON.stringify([...read(game), score]))
  },
}
