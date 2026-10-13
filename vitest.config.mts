/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.{ts,js}"],
      exclude: ["**/*.d.ts", "src/content/**/*", "**/*.astro", ".astro", "src/scripts/**/*"],
    },
  },
});
