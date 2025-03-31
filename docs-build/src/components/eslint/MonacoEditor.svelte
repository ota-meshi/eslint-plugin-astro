<script context="module">
  const appStarting = new Promise((resolve) => setTimeout(resolve, 300))
</script>

<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte"
  import { language as astroLanguage } from "./scripts/languages/astro/astro.mjs"

  const dispatch = createEventDispatcher()

  import { loadMonacoEditor } from "./scripts/monaco-loader.mjs"
  export let code = ""
  export let rightCode = ""
  export let language = "javascript"
  export let readOnly = false
  export let diffEditor = false
  export let markers = []
  export let rightMarkers = []
  export let provideCodeActions = null
  export let monacoOptions = {}

  export let waiting = null
  let rootElement,
    editor,
    setLeftValue,
    setRightValue,
    setLeftMarkers,
    setRightMarkers,
    getLeftEditor,
    getRightEditor,
    codeActionProviderDisposable
  const loadingMonaco = loadMonacoEditor()
  const starting = appStarting

  $: loading = Promise.all([waiting, loadingMonaco, starting])
  $: {
    if (setLeftValue) {
      setLeftValue(code)
    }
  }
  $: {
    if (setRightValue) {
      setRightValue(rightCode)
    }
  }
  $: {
    if (setLeftMarkers) {
      setLeftMarkers(markers)
    }
  }
  $: {
    if (setRightMarkers) {
      setRightMarkers(rightMarkers)
    }
  }
  function setCodeActionsProvider(monaco) {
    codeActionProviderDisposable = monaco.languages.registerCodeActionProvider(
      language,
      {
        provideCodeActions(model, range, context) {
          const editor = getLeftEditor?.()
          if (editor?.getModel().url !== model.url) {
            return {
              actions: [],
              dispose() {
                /* nop */
              },
            }
          }
          return provideCodeActions(model, range, context)
        },
      },
    )
  }
  $: {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- reactive
    language
    disposeCodeActionProvider()
    if (provideCodeActions) {
      loadingMonaco.then(setCodeActionsProvider)
    }
  }
  $: {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- reactive
    language
    // Set the language to the current editors.
    for (const editor of [getLeftEditor?.(), getRightEditor?.()]) {
      if (editor != null) {
        loadingMonaco.then((monaco) => {
          monaco.editor.setModelLanguage(editor.getModel(), language)
        })
      }
    }
  }

  let started = false
  $: if (started) {
    destroy()
    setup(diffEditor)
  }

  async function setup(diffEditor) {
    await loading
    const monaco = await loadingMonaco
    const options = {
      value: code,
      readOnly,
      theme: "vs-dark",
      language,
      automaticLayout: true,
      fontSize: 14,
      fontFamily:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      minimap: {
        enabled: false,
      },
      renderControlCharacters: true,
      renderIndentGuides: true,
      renderValidationDecorations: "on",
      renderWhitespace: "boundary",
      scrollBeyondLastLine: false,
      scrollbar: { alwaysConsumeMouseWheel: false },
      ...monacoOptions,
    }

    if (diffEditor) {
      editor = monaco.editor.createDiffEditor(rootElement, {
        originalEditable: true,
        useInlineViewWhenSpaceIsLimited: false,
        ...options,
      })
      const original = monaco.editor.createModel(code, language)
      const modified = monaco.editor.createModel(rightCode, language)
      const leftEditor = editor.getOriginalEditor()
      const rightEditor = editor.getModifiedEditor()
      rightEditor.updateOptions({ readOnly: true })
      editor.setModel({ original, modified })
      original.onDidChangeContent(() => {
        const value = original.getValue()
        code = value
      })

      setLeftValue = (code) => {
        const value = original.getValue()
        if (code !== value) {
          original.setValue(code)
        }
      }
      setRightValue = (code) => {
        const value = modified.getValue()
        if (code !== value) {
          modified.setValue(code)
        }
      }
      setLeftMarkers = (markers) => {
        updateMarkers(leftEditor, markers)
      }
      setRightMarkers = (markers) => {
        updateMarkers(rightEditor, markers)
      }
      getLeftEditor = () => leftEditor
      getRightEditor = () => rightEditor

      setLeftMarkers(markers)
      setRightMarkers(rightMarkers)
    } else {
      editor = monaco.editor.create(rootElement, options)
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue()
        code = value
      })
      editor.onDidChangeCursorPosition((evt) => {
        dispatch("changeCursorPosition", evt)
      })
      editor.onDidFocusEditorText((evt) => {
        dispatch("focusEditorText", evt)
      })
      setLeftValue = (code) => {
        const value = editor.getValue()
        if (code !== value) {
          editor.setValue(code)
        }
      }
      setRightValue = () => {
        /* noop */
      }
      setLeftMarkers = (markers) => {
        updateMarkers(editor, markers)
      }
      setRightMarkers = () => {
        /* noop */
      }
      getLeftEditor = () => editor
      getRightEditor = () => null

      setLeftMarkers(markers)
    }
  }

  function destroy() {
    disposeCodeActionProvider()
    dispose(editor)
    // rootElement.innerHTML = ""
    editor = null
  }

  onMount(async () => {
    started = true
    await loading
    const monaco = await loadingMonaco

    monaco.languages.register({ id: "astro" })
    monaco.languages.setMonarchTokensProvider("astro", astroLanguage)
  })
  onDestroy(() => {
    destroy()
  })

  export function setCursorPosition(loc) {
    if (editor) {
      const leftEditor = diffEditor ? editor?.getOriginalEditor() : editor
      leftEditor.setSelection({
        startLineNumber: loc.start.line,
        startColumn: loc.start.column,
        endLineNumber: loc.end.line,
        endColumn: loc.end.column,
      })
      leftEditor.revealLineInCenter(loc.start.line)
    }
  }
  async function updateMarkers(editor, markers) {
    const monaco = await loadingMonaco
    const model = editor.getModel()
    const id = editor.getId()
    monaco.editor.setModelMarkers(
      model,
      id,
      JSON.parse(JSON.stringify(markers)),
    )
  }

  /**
   * Dispose.
   * @param {any} x The target object.
   * @returns {void}
   */
  function dispose(x) {
    if (x == null) {
      return
    }
    if (x.getOriginalEditor) {
      dispose(x.getOriginalEditor())
    }
    if (x.getModifiedEditor) {
      dispose(x.getModifiedEditor())
    }
    if (x.getModel) {
      dispose(x.getModel())
    }
    if (x.dispose) {
      x.dispose()
    }
  }

  function disposeCodeActionProvider() {
    if (codeActionProviderDisposable) {
      codeActionProviderDisposable.dispose()
    }
  }

  function loadingTypewriter(node) {
    const text = "Loading..."
    const duration = 300

    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t)
        node.textContent = text.slice(0, i)
      },
    }
  }
</script>

{#await loading}
  {#if started}
    <div
      class="eslint-editor-monaco-root eslint-editor-monaco-root--wait"
      in:loadingTypewriter
    ></div>
  {/if}
{:then}
  <div bind:this={rootElement} class="eslint-editor-monaco-root"></div>
{/await}

<style>
  .eslint-editor-monaco-root {
    width: 100%;
    height: 100%;
  }

  .eslint-editor-monaco-root--wait {
    color: #9cdcfe;
    border: 1px solid #cfd4db;
    background-color: #282c34;
    font-family: Menlo, Monaco, "Courier New", monospace;
    font-size: 14px;
    line-height: 21px;
    padding-left: 52px;
    box-sizing: border-box;
  }
</style>
