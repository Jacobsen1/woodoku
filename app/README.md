# Woodoku app

React 19 + TypeScript + Vite + MUI + Zustand.

Requires Node.js 22.12+ (CI uses Node 26 LTS, see `/.nvmrc`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` / `npm start` | Start the Vite dev server on http://localhost:3000 |
| `npm run build` | Type-check and build to `build/` |
| `npm run preview` | Serve the production build on http://localhost:4173 |
| `npm run typecheck` | Run the TypeScript compiler |
| `npm run test:e2e` | Run the Playwright UI tests (builds and serves the app automatically) |

First time running the UI tests locally: `npx playwright install chromium`.
