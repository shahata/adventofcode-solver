import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 0,
    exclude: ["templates", "node_modules"],
  },
});
