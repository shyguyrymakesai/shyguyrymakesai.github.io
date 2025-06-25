// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [react(), mdx()],
  base: '/', // <-- CRITICAL for GitHub Pages
})
