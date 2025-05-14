import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      "@shared": path.resolve(__dirname, "./src/features/shared"),
      "@core": path.resolve(__dirname, "./src/features/core"),
      "@weather": path.resolve(__dirname, "./src/features/weather"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: [...configDefaults.exclude],
  },
});
