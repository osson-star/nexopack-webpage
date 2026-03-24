import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        paperMaterial: 'paper-material.html',
        pulpMaterial: 'pulp-material.html'
      }
    }
  }
})
