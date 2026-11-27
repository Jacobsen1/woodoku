import { test, expect } from '@playwright/test';

// Seed used by the Playwright agents (planner/generator/healer):
// opens the game and waits until the board and the piece tray are rendered.
test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Woodoku' })).toBeVisible();
    await expect(page.getByTestId('cell')).toHaveCount(81);
    await expect(page.getByTestId('piece')).toHaveCount(3);
  });
});
