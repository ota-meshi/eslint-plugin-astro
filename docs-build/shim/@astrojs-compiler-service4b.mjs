let service

if (typeof atob !== "undefined" && typeof window !== "undefined") {
  window.waitSetupForAstroCompilerWasm = setup()
}

/**
 * Parse code by `@astrojs/compiler`
 */
export function parse(code, options) {
  if (!service) {
    service = globalThis["@astrojs/compiler"]
  }
  const { ast } = service.parse(code, options)
  return { ast: JSON.parse(ast) }
}
export default { parse }

/** setup */
async function setup() {
  let bkProcess
  if (typeof globalThis.process !== "undefined") {
    bkProcess = globalThis.process
  }
  const { default: Go } = await import(
    "../../node_modules/@astrojs/compiler/browser/wasm_exec.js"
  )
  // Adjust process object
  if (bkProcess) {
    // eslint-disable-next-line require-atomic-updates -- ignore
    globalThis.process = bkProcess
  } else {
    // eslint-disable-next-line no-process-env -- ignore
    process.env = {}
    process.cwd = () => ""
    process.hrtime = () => Date.now()
  }
  const go = new Go()
  const { default: wasmURL } = await import("@astrojs/compiler/astro.wasm?url")
  const wasmBuffer = await fetch(wasmURL).then((res) => res.arrayBuffer())

  try {
    const mod = await WebAssembly.compile(wasmBuffer)
    const instance = await WebAssembly.instantiate(mod, go.importObject)
    go.run(instance)

    return watch()
  } catch (e) {
    // eslint-disable-next-line no-console -- log
    console.log(e)
    throw e
  }

  function watch() {
    return new Promise((resolve) => {
      if (globalThis["@astrojs/compiler"]) {
        resolve()
      } else {
        setTimeout(() => {
          resolve(watch())
        }, 100)
      }
    })
  }
}
