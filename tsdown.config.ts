import type { UserConfig } from "tsdown"
import { defineConfig } from "tsdown"

const base: UserConfig = {
  clean: true,
  dts: true,
  outDir: "lib",
  treeshake: true,
  deps: {
    neverBundle: [
      "@typescript-eslint/parser",
      "eslint-plugin-jsx-a11y",
      "espree",
    ],
  },
  define: {
    _ESLINT_PLUGIN_ASTRO_MODULES: "undefined",
  },
}

const config: UserConfig = defineConfig({
  ...base,
  entry: ["src/index.mts"],
  format: ["esm"],
})
export default config
