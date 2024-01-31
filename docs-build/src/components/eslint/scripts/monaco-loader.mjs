/* global MONACO_EDITOR_VERSION -- defined */
async function setupMonaco() {
  if (typeof window !== "undefined") {
    const monacoScript =
      Array.from(document.head.querySelectorAll("script")).find(
        (script) =>
          script.src &&
          script.src.includes("monaco") &&
          script.src.includes("vs/loader"),
      ) || (await appendMonacoEditorScript())
    // @ts-ignore
    window.require.config({
      paths: {
        vs: monacoScript.src.replace(/\/vs\/.*$/u, "/vs"),
      },
    })
  }
}

function appendMonacoEditorScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script")

    if (typeof MONACO_EDITOR_VERSION !== "undefined") {
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MONACO_EDITOR_VERSION}/min/vs/loader.min.js`
    } else {
      script.src = "https://unpkg.com/monaco-editor@latest/min/vs/loader.js"
    }
    script.onload = () => {
      script.onload = null

      watch()

      function watch() {
        // @ts-ignore
        if (window.require) {
          resolve(script)
          return
        }
        setTimeout(watch, 200)
      }
    }
    document.head.append(script)
  })
}

class Scope {
  constructor() {
    /** @type {any} */
    this._setupedMonaco = null
    /** @type {any} */
    this._editorLoaded = null
  }

  get setupedMonaco() {
    return this._setupedMonaco
  }

  set setupedMonaco(v) {
    this._setupedMonaco = v
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.setupedMonaco = v
    }
  }

  get editorLoaded() {
    return this._editorLoaded
  }

  set editorLoaded(v) {
    this._editorLoaded = v
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.editorLoaded = v
    }
  }
}
const scope = new Scope()

export async function loadMonacoEditor() {
  await (scope.setupedMonaco || (scope.setupedMonaco = setupMonaco()))
  return (
    scope.editorLoaded ||
    (scope.editorLoaded = new Promise((resolve) => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.require(
          // eslint-disable-next-line n/no-missing-require -- Demo
          ["vs/editor/editor.main"],
          (r) => {
            resolve(r)
          },
        )
      }
    }))
  )
}
