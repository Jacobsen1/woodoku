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

test('no global body styles leak', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Woodoku' })).toBeVisible()
  const globalSelectors = await page.evaluate(() =>
    [...document.styleSheets]
      .flatMap((sheet) => [...sheet.cssRules])
      .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule)
      .flatMap((rule) => rule.selectorText.split(',').map((s) => s.trim()))
      .filter((s) => /^(html|body|#root|code)\b/.test(s)),
  )
  expect(globalSelectors).toEqual([])
})
