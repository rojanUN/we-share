import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    pool: "forks",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/validators/**/*.ts", "src/middlewares/buildError.ts", "src/middlewares/guard.ts", "src/middlewares/exceptionHandler.ts"],
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
});
