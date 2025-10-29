import type { UserConfig } from "tsdown"
import { defineConfig } from "tsdown"

const base: UserConfig = {
  clean: true,
  dts: true,
  outDir: "lib",
  treeshake: true,
  external: ["@typescript-eslint/parser", "eslint-plugin-jsx-a11y", "espree"],
}

const config: UserConfig = defineConfig([
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
export default config
