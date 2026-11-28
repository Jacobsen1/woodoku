import { expect, type Locator, type Page } from '@playwright/test'
import { CELL_SIZE } from '../src/Game/constants'
import { allPieces } from '../src/Game/Pieces'

const PIECE_NAMES = allPieces.map((p) => p.name)

export type PieceName = string

/** The Math.random() values that make `Game.GetThreeRandomPieces` pick the given pieces. */
const toRandom = (names: PieceName[]) =>
  names.map((name) => {
    const index = PIECE_NAMES.indexOf(name)
    if (index === -1) throw new Error(`Unknown piece "${name}"`)
    return (index + 0.5) / PIECE_NAMES.length
  })

/**
 * Makes the random piece generator deterministic: Math.random first returns values from
 * `window.__pieceQueue` (picking the given pieces), after that a seeded PRNG takes over.
 * Must be called before `page.goto`.
 */
export async function forcePieces(page: Page, pieces: PieceName[]) {
  await page.addInitScript((queue: number[]) => {
    const w = window as unknown as { __pieceQueue: number[] }
    w.__pieceQueue = queue
    let seed = 42
    const seeded = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    Math.random = () => {
      // Only the game's own piece draws take queued values. Libraries (e.g. React
      // DOM, which Module Federation may load first) get the seeded sequence.
      const fromGame = new Error().stack?.includes('GetThreeRandomPieces')
      const next = fromGame ? w.__pieceQueue.shift() : undefined
      return next ?? seeded()
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

export const hoveredCells = (page: Page) =>
  page.locator('[data-testid="cell"][data-hover="true"]')

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

/** Position within a piece element of the centre of its [column, row] cell. */
const grabPosition = ([col, row]: [number, number]) => ({
  x: col * CELL_SIZE + CELL_SIZE / 2,
  y: row * CELL_SIZE + CELL_SIZE / 2,
})

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
  await source.dragTo(cell(page, target[0], target[1]), { sourcePosition: grabPosition(grab) })
}

/**
 * Starts a drag of `source` held at its `grab` cell without dropping it, so the board can be
 * inspected mid-drag. Returns a function that moves the drag over board cell (x, y).
 */
export async function startDrag(page: Page, source: Locator, grab: [number, number]) {
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer())
  const box = (await source.boundingBox())!
  const { x, y } = grabPosition(grab)
  await source.dispatchEvent('dragstart', { dataTransfer, clientX: box.x + x, clientY: box.y + y })
  return (x: number, y: number) => cell(page, x, y).dispatchEvent('dragenter', { dataTransfer })
}
