import { expect, test } from '@playwright/test'

// woodoku is also a Module Federation remote for the game hub.

test('build emits remoteEntry.js', async ({ request }) => {
  const res = await request.get('/remoteEntry.js')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toMatch(/javascript/)
})

test('remoteEntry is CORS-enabled', async ({ request }) => {
  const res = await request.get('/remoteEntry.js', { headers: { Origin: 'http://localhost:5000' } })
  expect(res.headers()['access-control-allow-origin']).toBeTruthy()
})

test('all bundled CSS is scoped to the game root', async ({ page }) => {
  // The hub keeps a game's stylesheet after it unmounts, so every rule must be
  // under .game-woodoku or it can restyle the hub and the other games.
  await page.goto('./')
  await page.locator('.game-woodoku').waitFor()
  const unscoped = await page.evaluate(() => {
    const selectors: string[] = []
    const walk = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (rule instanceof CSSStyleRule) selectors.push(...rule.selectorText.split(',').map((s) => s.trim()))
        else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules)
      }
    }
    for (const sheet of document.styleSheets) if (sheet.href !== null) walk(sheet.cssRules) // bundled CSS only
    return selectors
  })
  expect(unscoped.filter((s) => !s.startsWith('.game-woodoku'))).toEqual([])
})
