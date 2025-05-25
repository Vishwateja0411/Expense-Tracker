// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // redirect any import of '@mui/styled-engine' → the styled-components build
      { find: '@mui/styled-engine', replacement: '@mui/styled-engine-sc' }
    ]
  },
  server: {
    // (optional) your proxy settings go here
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      }
    }
  }
})
