import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://open-sci-tools.github.io/atikur-demo-shop/
  base: '/atikur-demo-shop/',
  plugins: [react()],
})
