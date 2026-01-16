import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'esbuild',
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Optimize chunk splitting
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        pgp: path.resolve(__dirname, 'pgp.html'),
        donate: path.resolve(__dirname, 'donate.html'),
      },
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'motion': ['motion'],
          'icons': ['@iconify/react'],
        },
      },
    },
    // Reduce source map size in production
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion'],
  },
})
