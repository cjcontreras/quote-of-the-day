import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quote-of-the-day/', // Use the repo name if deploying to user/org GitHub Pages
})
