import { expect, test } from '@playwright/test'
import {
  cell,
  dragPiece,
  expectFilled,
  expectScore,
  expectTray,
  hoveredCells,
  openGame,
  piece,
  startDrag,
} from './helpers'

test.describe('Drag state', () => {
  test('clears the placement preview after a piece is dropped', async ({ page }) => {
    await openGame(page, ['Dot', 'Craig', 'Mac'])

    await dragPiece(page, piece(page, 'Dot'), [0, 0], [4, 4])

    await expectFilled(page, [[4, 4]])
    await expect(hoveredCells(page)).toHaveCount(0)
    await expect(cell(page, 4, 4)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })

  test('clears the placement preview when a drag is cancelled', async ({ page }) => {
    await openGame(page, ['FiveDot', 'FourDot', 'Dot'])
    await dragPiece(page, piece(page, 'FiveDot'), [0, 2], [0, 0])

    const source = piece(page, 'FourDot')
    const dragOver = await startDrag(page, source, [0, 2])
    await dragOver(5, 0)
    await expect(hoveredCells(page)).toHaveCount(4)

    // Releasing outside the board (or pressing Esc) ends the drag without a drop.
    await source.dispatchEvent('dragend')

    await expect(hoveredCells(page)).toHaveCount(0)
    await expect(cell(page, 0, 0)).toHaveCSS('filter', 'none')
    await expectTray(page, ['FourDot', 'Dot'])
  })

  test('ignores drags that do not come from the piece tray', async ({ page }) => {
    await openGame(page, ['FiveDot', 'FourDot', 'Dot'])
    await dragPiece(page, piece(page, 'FiveDot'), [0, 2], [0, 0])
    await expectScore(page, 0, 5)

    // Simulate dropping something else (e.g. a file or selected text) on an empty cell.
    const dataTransfer = await page.evaluateHandle(() => new DataTransfer())
    await cell(page, 0, 4).dispatchEvent('dragenter', { dataTransfer })
    await expect(hoveredCells(page)).toHaveCount(0)
    await cell(page, 0, 4).dispatchEvent('drop', { dataTransfer })

    await expectFilled(page, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])
    await expectScore(page, 0, 5)
    await expectTray(page, ['FourDot', 'Dot'])
  })
})
