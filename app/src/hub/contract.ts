// Copy of the game hub contract (C:/Dev/game-hub/src/contract.ts). Keep in sync.
// The contract every game in the hub implements, whatever its technology.
// React games export a MountFn from their `./mount` federation module;
// Python (pygbag) games get one from the hub's iframe adapter.

export type Score = { name: string; value: number; variant?: string; date: string } // date = ISO 8601

export interface HighscoreStore {
  /** All scores for a game (optionally one variant), unsorted: the caller sorts. */
  list(game: string, variant?: string): Promise<Score[]>
  add(game: string, score: Score): Promise<void>
}

export type GameContext = {
  highscore: HighscoreStore
  basePath: string
  /**
   * Report an error the hub cannot see, such as a crash during a React render
   * (pass it as createRoot's onUncaughtError). The hub then shows its error card.
   */
  onError?: (error: unknown) => void
}

/** Mounts a game into `el` and returns a function that unmounts it. */
export type MountFn = (el: HTMLElement, ctx: GameContext) => () => void
