"use strict"

const esbuild = require("esbuild")
const path = require("path")
const fs = require("fs")
// const babelCore = require("@babel/core")
// const t = require("@babel/types")

build(
  require.resolve("./src/eslint.mjs"),
  path.join(__dirname, "../shim/eslint.mjs"),
  ["assert", "util"],
)
build(
  require.resolve("../../node_modules/assert"),
  path.join(__dirname, "../shim/assert.mjs"),
)
build(
  require.resolve("./src/astro-eslint-parser.mjs"),
  path.join(__dirname, "../shim/astro-eslint-parser.mjs"),
  ["fs", "module", { name: "@typescript-eslint/parser", kind: "cjs" }],
)
build(
  require.resolve("./src/eslint-plugin-jsx-a11y.mjs"),
  path.join(__dirname, "../shim/eslint-plugin-jsx-a11y.mjs"),
)

/** build */
function build(input, out, injects = []) {
  // eslint-disable-next-line no-console -- ignore
  console.log(`build@ ${input}`)
  let code = bundle(input, ["path", ...injects.map((i) => i.name || i)])
  code = transform(code, ["path", ...injects])
  fs.writeFileSync(out, code, "utf8")
}

/** bundle */
function bundle(entryPoint, externals) {
  const result = esbuild.buildSync({
    entryPoints: [entryPoint],
    format: "esm",
    bundle: true,
    external: externals,
    write: false,
    inject: [require.resolve("./src/process-shim.mjs")],
  })

  return `${result.outputFiles[0].text}`
}

/** transform code */
function transform(code, injects) {
  const newCode = code.replace(/"[a-z]+" = "[a-z]+";/, "")
  // const newCode = babelCore.transformSync(code, {
  //   babelrc: false,
  //   plugins: [
  //     {
  //       visitor: {
  //         CallExpression(path) {
  //           const callee = path.get("callee")
  //           if (
  //             callee.type === "Identifier" &&
  //             callee.node.name === "__require"
  //           ) {
  //             callee.replaceWith(t.identifier("__$$$require"))
  //           }
  //         },
  //       },
  //     },
  //   ],
  // })
  return `
${injects
  .map((inject) => {
    const name = inject.name || inject
    if (inject.kind === "cjs") {
      return `import * as $inject_${name.replace(/\W+/g, "_")}$ from '${name}';`
    }
    return `import $inject_${name.replace(/\W+/g, "_")}$ from '${name}';`
  })
  .join("\n")}
const $_injects_$ = {${injects
    .map((inject) => {
      const name = inject.name || inject
      return `['${
        path.isAbsolute(name) ? `./${path.relative(process.cwd(), name)}` : name
      }']:$inject_${name.replace(/\W+/g, "_")}$`
    })
    .join(",\n")}};
function require(module, ...args) {
  return $_injects_$[module] || {}
}
${newCode}
`
}
