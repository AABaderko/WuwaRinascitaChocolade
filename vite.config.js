import { defineConfig } from 'vite';

// Для GitHub Pages нужно указать base = имя репозитория
export default defineConfig({
  base: '/', // ← поменяй на название своего репозитория
  server: {
    port: 3000
  }
});