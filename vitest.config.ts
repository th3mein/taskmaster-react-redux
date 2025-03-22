import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
