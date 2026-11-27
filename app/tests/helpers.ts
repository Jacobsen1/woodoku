import { expect, type Locator, type Page } from '@playwright/test'

/** Piece names in the same order as `allPieces` in src/Game/Pieces.ts. */
export const PIECE_NAMES = [
  'Joe', 'Mac', 'Richard', 'LilRichie', 'Craig', 'Caden', 'TheWork', 'Dot', 'TwoDot',
  'ThreeDot', 'FourDot', 'FiveDot', 'Luigi', 'Waluigi', 'EvilWork', 'Stair', 'ThreeStair',
  'FourStair', 'TheHelmet',
] as const

export type PieceName = (typeof PIECE_NAMES)[number]

const PIECE_CELL_SIZE = 50

const toRandom = (names: PieceName[]) =>
  names.map((name) => (PIECE_NAMES.indexOf(name) + 0.5) / PIECE_NAMES.length)

/**
 * Makes the random piece generator deterministic: Math.random first returns values from
 * `window.__pieceQueue` (picking the given pieces), after that a seeded PRNG takes over.
 * Must be called before `page.goto`. Only queue as many pieces as the game draws at
 * that moment, since libraries may call Math.random as well.
 */
export async function forcePieces(page: Page, pieces: PieceName[]) {
  await page.addInitScript((queue: number[]) => {
    const w = window as unknown as { __pieceQueue: number[] }
    w.__pieceQueue = queue
    let seed = 42
    Math.random = () => {
      const next = w.__pieceQueue.shift()
      if (next !== undefined) return next
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
  }, toRandom(pieces))
}

/** Queues the pieces the next refill of the tray will deal. */
export async function queueNextPieces(page: Page, pieces: PieceName[]) {
  await page.evaluate((queue: number[]) => {
    (window as unknown as { __pieceQueue: number[] }).__pieceQueue.push(...queue)
  }, toRandom(pieces))
}

export async function openGame(page: Page, pieces?: PieceName[]) {
  if (pieces) await forcePieces(page, pieces)
  await page.goto('/')
  await expect(page.getByTestId('cell')).toHaveCount(81)
  if (pieces) await expectTray(page, pieces.slice(0, 3))
}

export const cell = (page: Page, x: number, y: number) =>
  page.locator(`[data-testid="cell"][data-x="${x}"][data-y="${y}"]`)

export const filledCells = (page: Page) =>
  page.locator('[data-testid="cell"][data-filled="true"]')

export const piece = (page: Page, name: PieceName) =>
  page.locator(`[data-testid="piece"][data-piece-name="${name}"]`)

export async function expectTray(page: Page, names: string[]) {
  const tray = page.getByTestId('piece')
  await expect(tray).toHaveCount(names.length)
  for (const [i, name] of names.entries()) {
    await expect(tray.nth(i)).toHaveAttribute('data-piece-name', name)
  }
}

export async function expectScore(page: Page, combo: number, score: number) {
  await expect(page.getByTestId('score')).toHaveText(`combo: ${combo} | score: ${score}`)
}

export async function expectFilled(page: Page, coords: [number, number][]) {
  await expect(filledCells(page)).toHaveCount(coords.length)
  for (const [x, y] of coords) {
    await expect(cell(page, x, y)).toHaveAttribute('data-filled', 'true')
  }
}

/**
 * Drags a piece from the tray onto the board using native HTML5 drag and drop.
 * `grab` is the [column, row] of the piece cell the mouse holds, `target` is the board
 * cell [x, y] that cell is dropped on.
 */
export async function dragPiece(
  page: Page,
  source: Locator,
  grab: [number, number],
  target: [number, number],
) {
  await source.dragTo(cell(page, target[0], target[1]), {
    sourcePosition: {
      x: grab[0] * PIECE_CELL_SIZE + PIECE_CELL_SIZE / 2,
      y: grab[1] * PIECE_CELL_SIZE + PIECE_CELL_SIZE / 2,
    },
  })
}
