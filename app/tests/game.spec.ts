import { expect, test } from '@playwright/test'
import {
  cell,
  dragPiece,
  expectFilled,
  expectScore,
  expectTray,
  filledCells,
  hoveredCells,
  openGame,
  piece,
  queueNextPieces,
  startDrag,
} from './helpers'

test.describe('Woodoku', () => {
  test('starts with an empty 9x9 board, zero score and three pieces', async ({ page }) => {
    await openGame(page)

    await expect(page).toHaveTitle('Woodoku')
    await expect(page.getByRole('heading', { name: 'Woodoku' })).toBeVisible()
    await expectScore(page, 0, 0)
    await expect(page.getByTestId('cell')).toHaveCount(81)
    await expect(filledCells(page)).toHaveCount(0)

    const tray = page.getByTestId('piece')
    await expect(tray).toHaveCount(3)
    await expect(page.locator('[data-testid="piece"][draggable="true"]')).toHaveCount(3)
    for (const p of await tray.all()) await expect(p).toBeVisible()
    const names = await tray.evaluateAll((els) => els.map((el) => el.getAttribute('data-piece-name')))
    expect(new Set(names).size).toBe(3)
  })

  test('places a piece on the board by drag and drop', async ({ page }) => {
    await openGame(page, ['Craig', 'Mac', 'Dot'])

    await dragPiece(page, piece(page, 'Craig'), [0, 0], [3, 4])

    await expectFilled(page, [[3, 4], [4, 4], [3, 5], [4, 5]])
    await expectScore(page, 0, 4)
    await expectTray(page, ['Mac', 'Dot'])
  })

  test('respects the grabbed cell offset when dropping', async ({ page }) => {
    await openGame(page, ['Joe', 'Mac', 'Dot'])

    // Grab Joe (a plus shape) by its centre and drop it on the centre of the board.
    await dragPiece(page, piece(page, 'Joe'), [1, 1], [4, 4])

    await expectFilled(page, [[4, 3], [3, 4], [4, 4], [5, 4], [4, 5]])
    await expectScore(page, 0, 5)
    await expectTray(page, ['Mac', 'Dot'])
  })

  test('rejects a piece that does not fit inside the board', async ({ page }) => {
    await openGame(page, ['Craig', 'Mac', 'Dot'])

    await dragPiece(page, piece(page, 'Craig'), [0, 0], [8, 8])

    await expect(filledCells(page)).toHaveCount(0)
    await expectScore(page, 0, 0)
    await expectTray(page, ['Craig', 'Mac', 'Dot'])
  })

  test('rejects a piece that overlaps filled cells', async ({ page }) => {
    await openGame(page, ['Craig', 'Mac', 'Dot'])
    await dragPiece(page, piece(page, 'Craig'), [0, 0], [0, 0])
    await expectScore(page, 0, 4)

    // Mac is an L-shape [[1,0],[1,1]]; placing its origin at (1,1) overlaps Craig.
    await dragPiece(page, piece(page, 'Mac'), [0, 0], [1, 1])

    await expectFilled(page, [[0, 0], [1, 0], [0, 1], [1, 1]])
    await expectScore(page, 0, 4)
    await expectTray(page, ['Mac', 'Dot'])
  })

  test('clears a full row, awards a bonus and tracks the combo', async ({ page }) => {
    await openGame(page, ['FiveDot', 'FourDot', 'Dot'])

    // FiveDot/FourDot are horizontal bars on the third row of their bounding box.
    await dragPiece(page, piece(page, 'FiveDot'), [0, 2], [0, 0])
    await expectFilled(page, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])
    await expectScore(page, 0, 5)

    await dragPiece(page, piece(page, 'FourDot'), [0, 2], [5, 0])
    // Row 0 is full and removed: 4 points for the piece + 18 for one cleared line.
    await expect(filledCells(page)).toHaveCount(0)
    await expectScore(page, 1, 5 + 4 + 18)

    // A placement without clearing resets the combo.
    await dragPiece(page, piece(page, 'Dot'), [0, 0], [8, 8])
    await expectFilled(page, [[8, 8]])
    await expectScore(page, 0, 28)
  })

  test('clears a full 3x3 square', async ({ page }) => {
    await openGame(page, ['Craig', 'Caden', 'Joe'])

    // Caden [[1,0,0],[1,0,0],[1,1,1]] fills the left column and bottom row of the top-left box.
    await dragPiece(page, piece(page, 'Caden'), [0, 0], [0, 0])
    // Craig (2x2) fills the remaining top-right 2x2 of the box.
    await dragPiece(page, piece(page, 'Craig'), [0, 0], [1, 0])

    await expect(filledCells(page)).toHaveCount(0)
    await expectScore(page, 1, 5 + 4 + 18)
    await expectTray(page, ['Joe'])
  })

  test('deals three new pieces after all pieces have been used', async ({ page }) => {
    await openGame(page, ['Dot', 'TwoDot', 'ThreeDot'])
    await queueNextPieces(page, ['Craig', 'Mac', 'Joe'])

    await dragPiece(page, piece(page, 'Dot'), [0, 0], [0, 0])
    await expectTray(page, ['TwoDot', 'ThreeDot'])
    // TwoDot [[0,0],[1,1]] and ThreeDot (middle row) — grab their filled cell.
    await dragPiece(page, piece(page, 'TwoDot'), [0, 1], [0, 2])
    await expectTray(page, ['ThreeDot'])
    await dragPiece(page, piece(page, 'ThreeDot'), [0, 1], [0, 4])

    await expectFilled(page, [[0, 0], [0, 2], [1, 2], [0, 4], [1, 4], [2, 4]])
    await expectScore(page, 0, 6)
    await expectTray(page, ['Craig', 'Mac', 'Joe'])
  })

  test('previews the placement and highlights lines that will be cleared', async ({ page }) => {
    await openGame(page, ['FiveDot', 'FourDot', 'Dot'])
    await dragPiece(page, piece(page, 'FiveDot'), [0, 2], [0, 0])

    const dragOver = await startDrag(page, piece(page, 'FourDot'), [0, 2])
    await dragOver(5, 0)

    for (let x = 5; x < 9; x++) {
      await expect(cell(page, x, 0)).toHaveAttribute('data-hover', 'true')
    }
    await expect(hoveredCells(page)).toHaveCount(4)
    // Already filled cells in the row that would be cleared are dimmed.
    for (let x = 0; x < 5; x++) {
      await expect(cell(page, x, 0)).toHaveCSS('filter', 'brightness(0.65)')
    }

    // Moving to a position where the piece does not fit removes the preview.
    await dragOver(7, 5)
    await expect(hoveredCells(page)).toHaveCount(0)
    await expect(cell(page, 0, 0)).toHaveCSS('filter', 'none')
  })
})
