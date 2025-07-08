import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
// @ts-ignore
import manifest from './public/manifest.json'

export default defineConfig({
  plugins: [
    react(), // <-- This is required!
    crx({ manifest })
  ],
  build: {
    rollupOptions: {
      input: {
        content: 'src/content/index.tsx'
      }
    }
  }
})