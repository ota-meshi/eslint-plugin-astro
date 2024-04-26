import type { Options } from "tsup"
import { defineConfig } from "tsup"

const base: Options = {
  clean: true,
  dts: true,
  outDir: "lib",
  treeshake: true,
  external: ["@typescript-eslint/parser", "eslint-plugin-jsx-a11y", "espree"],
}

export default defineConfig([
  {
    ...base,
    entry: ["src/index.mts"],
    format: ["esm"],
  },
  {
    ...base,
    entry: ["src/index.cts"],
    format: ["cjs"],
  },
])
