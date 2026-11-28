import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// Shared as singletons with the game hub, so the hub and the game use one React.
const shared = {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@mui/material': { singleton: true },
  '@emotion/react': { singleton: true },
  '@emotion/styled': { singleton: true },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Also a Module Federation remote: the game hub loads ./mount from remoteEntry.js.
    federation({
      name: 'woodoku',
      filename: 'remoteEntry.js',
      exposes: { './mount': './src/mount.tsx' },
      shared,
      dts: false,
    }),
  ],
  // VITE_BASE sets the public path when published under a sub-path.
  base: process.env.VITE_BASE ?? './',
  build: {
    outDir: 'build',
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
})
