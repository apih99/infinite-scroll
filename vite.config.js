import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
    
    // GitHub Pages deployment configuration
    base: mode === 'production' ? '/infinite-scroll/' : '/',
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Generate source maps for better debugging
      sourcemap: false,
      // Optimize chunks for better loading
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    
    // Development server configuration
    server: {
      port: 5173,
      host: true, // Allow external connections
    },
    
    // Preview server configuration (for testing build)
    preview: {
      port: 4173,
      host: true,
    },
  }
  
  return config
})
