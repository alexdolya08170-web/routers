import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`
      },
    },
    devSourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: true,
  },
});