/* global MONACO_EDITOR_VERSION -- defined */

export const DARK_THEME_NAME = "dark-plus"
export const LIGHT_THEME_NAME = "light-plus"
const ALL_LANGUAGES = [
  "javascript",
  "typescript",
  "json",
  "html",
  "markdown",
  "astro",
  "css",
  "scss",
  "less",
  "stylus",
]

let monacoPromise = null

function importFromEsmSh(path) {
  return importFromCDN(`https://esm.sh/${path}`)
}

function importFromCDN(path) {
  return import(/* @vite-ignore */ path)
}

/** Load the Monaco editor object. */
export function loadMonacoEditor() {
  return (
    monacoPromise ||
    (monacoPromise = (async () => {
      let rawMonaco, monaco
      try {
        rawMonaco = await loadMonacoFromEsmCdn()
      } catch {
        rawMonaco = await loadModuleFromMonaco("vs/editor/editor.main")
      }
      if ("m" in rawMonaco) {
        monaco = rawMonaco.m || rawMonaco
      } else {
        monaco = rawMonaco
      }

      await setupEnhancedLanguages(monaco)

      return monaco
    })())
  )
}

/** Load the Monaco editor. */
async function loadMonacoFromEsmCdn() {
  let error = new Error()
  const urlList = [
    {
      script: "https://cdn.jsdelivr.net/npm/monaco-editor/+esm",
      style:
        "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs/editor/editor.main.css",
    },
  ]

  if (typeof MONACO_EDITOR_VERSION !== "undefined") {
    urlList.unshift({
      script: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/+esm`,
      style: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/min/vs/editor/editor.main.css`,
    })
  }
  for (const url of urlList) {
    try {
      const result = await importFromCDN(url.script)

      if (typeof document !== "undefined") {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = url.style
        document.head.append(link)
      }
      return result
    } catch (e) {
      // eslint-disable-next-line no-console -- OK
      console.warn(`Failed to retrieve resource from ${url}`)
      error = e
    }
  }
  throw error
}

async function loadModuleFromMonaco(moduleName) {
  await setupMonaco()

  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      // @ts-expect-error -- global Monaco's require
      window.require([moduleName], (r) => {
        resolve(r)
      })
    }
  })
}

async function setupMonaco() {
  if (typeof window !== "undefined") {
    const monacoScript =
      Array.from(document.head.querySelectorAll("script")).find(
        (script) =>
          script.src &&
          script.src.includes("monaco") &&
          script.src.includes("vs/loader"),
      ) ||
      // If the script tag that loads the Monaco editor is not found, insert the script tag.
      (await appendMonacoEditorScript())

    // @ts-expect-error -- global Monaco's require
    window.require.config({
      paths: {
        vs: monacoScript.src.replace(/\/vs\/.*$/u, "/vs"),
      },
    })
  }
}

/** Appends a script tag that loads the Monaco editor. */
async function appendMonacoEditorScript() {
  let error = new Error()
  const urlList = [
    "https://cdn.jsdelivr.net/npm/monaco-editor/dev/vs/loader.min.js",
    "https://unpkg.com/monaco-editor@latest/min/vs/loader.js",
  ]

  if (typeof MONACO_EDITOR_VERSION !== "undefined") {
    urlList.unshift(
      `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MONACO_EDITOR_VERSION}/min/vs/loader.min.js`,
      `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/dev/vs/loader.min.js`,
      `https://unpkg.com/monaco-editor/${MONACO_EDITOR_VERSION}/min/vs/loader.min.js`,
    )
  }
  for (const url of urlList) {
    try {
      return await appendScript(url)
    } catch (e) {
      // eslint-disable-next-line no-console -- OK
      console.warn(`Failed to retrieve resource from ${url}`)
      error = e
    }
  }
  throw error
}

/** Appends a script tag. */
function appendScript(src) {
  const script = document.createElement("script")

  return new Promise((resolve, reject) => {
    script.src = src
    script.onload = () => {
      script.onload = null

      watch()

      function watch() {
        // @ts-expect-error -- global Monaco's require
        if (window.require) {
          resolve(script)

          return
        }

        setTimeout(watch, 200)
      }
    }
    script.onerror = (e) => {
      reject(e)
      document.head.removeChild(script)
    }
    document.head.append(script)
  })
}

async function setupEnhancedLanguages(monaco) {
  const monacoLanguageIds = new Set(
    monaco.languages.getLanguages().map((l) => l.id),
  )
  const [shikiWeb, shikiMonaco, oniguruma] = await Promise.all([
    importFromEsmSh("shiki/bundle/web"),
    importFromEsmSh("@shikijs/monaco"),
    importFromEsmSh("shiki/engine/oniguruma"),
  ])
  const highlighter = await shikiWeb.createHighlighter({
    themes: [DARK_THEME_NAME, LIGHT_THEME_NAME],
    langs: [],
    engine: oniguruma.createOnigurumaEngine(importFromEsmSh("shiki/wasm")),
  })
  // Register the themes from Shiki, and provide syntax highlighting for Monaco.
  shikiMonaco.shikiToMonaco(highlighter, monaco)
  await Promise.all(
    ALL_LANGUAGES.map(async (id) => {
      if (!monacoLanguageIds.has(id)) {
        monaco.languages.register({ id })
      }
      await registerShikiHighlighter(monaco, highlighter, id)
    }),
  )

  await Promise.all([
    registerLanguageConfiguration(monaco, "astro", async () => {
      const module = await importFromEsmSh(
        "@ota-meshi/site-kit-monarch-syntaxes/astro",
      )
      return module.loadAstroLanguageConfig()
    }),
  ])
}

async function registerLanguageConfiguration(monaco, languageId, loadConfig) {
  const models = monaco.editor
    .getModels()
    .filter((model) => model.getLanguageId() === languageId)
  if (!models.length) {
    monaco.languages.onLanguageEncountered(languageId, () => {
      void Promise.resolve(loadConfig()).then((conf) => {
        monaco.languages.setLanguageConfiguration(languageId, conf)
      })
    })
  } else {
    await Promise.resolve(loadConfig()).then((config) => {
      monaco.languages.setLanguageConfiguration(languageId, config)
    })
  }
}

async function registerShikiHighlighter(monaco, highlighter, languageId) {
  const models = monaco.editor
    .getModels()
    .filter((model) => model.getLanguageId() === languageId)

  if (!models.length) {
    monaco.languages.onLanguageEncountered(languageId, () => {
      setTimeout(() => {
        void registerShikiHighlighterLanguage(monaco, highlighter, languageId)
      }, 500)
    })
  } else {
    await registerShikiHighlighterLanguage(monaco, highlighter, languageId)
  }
}

async function registerShikiHighlighterLanguage(
  monaco,
  highlighter,
  languageId,
) {
  const languageRegistration = Promise.resolve(languageId)

  const [shikiMonaco] = await Promise.all([importFromEsmSh("@shikijs/monaco")])
  await highlighter.loadLanguage(await languageRegistration)
  const editorThemes = monaco.editor.getEditors().map((editor) => {
    return [editor, editor.getRawOptions().theme]
  })
  // Register the themes from Shiki, and provide syntax highlighting for Monaco.
  shikiMonaco.shikiToMonaco(highlighter, monaco)
  for (const [editor, theme] of editorThemes) {
    editor.updateOptions({ theme })
  }
}
