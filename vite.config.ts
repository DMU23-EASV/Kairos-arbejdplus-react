import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  optimizeDeps: {
    include: ["pdfjs-dist"], // optionally specify dependency name
    esbuildOptions: {
      supported: {
        "top-level-await": true
      },
    },
  },


  plugins: [react()],
  server: {
    port: 6969
  }
})
