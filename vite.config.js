import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  esbuild: {
    // Quita console.* y debugger del bundle de producción
    drop: ["console", "debugger"],
  },
  build: {
    // Avisa si algún chunk se vuelve a disparar de tamaño
    chunkSizeWarningLimit: 600,
  },
})
