<script>
  import { onMount } from "svelte"
  import ESLintEditor from "./eslint/ESLintEditor.svelte"
  import { loadMonacoEditor } from "./eslint/scripts/monaco-loader.mjs"
  import {
    createLinter,
    preprocess,
    postprocess,
  } from "./eslint/scripts/linter.mjs"

  const linter = loadMonacoEditor()
    .then(async () => {
      const parser = await import("@typescript-eslint/parser")
      if (typeof window !== "undefined") {
        window.require.define("@typescript-eslint/parser", parser)
      }
      const pluginJsxA11y = await import("eslint-plugin-jsx-a11y")
      if (typeof window !== "undefined") {
        window.require.define("eslint-plugin-jsx-a11y", pluginJsxA11y)
      }
      return window.waitSetupForAstroCompilerWasm
    })
    .then(() => {
      return createLinter()
    })

  let code = ""
  export let rules = {}
  export let fix = false
  let time = ""
  let optionsForAstro = {
    preprocess,
    postprocess,
  }
  let showDiff = fix

  function onLintedResult(evt) {
    time = `${evt.detail.time}ms`
  }

  let slotRoot
  onMount(() => {
    let lines = []
    for (const line of slotRoot.querySelectorAll(
      ".code-container code > .line",
    )) {
      lines.push(line.textContent)
    }
    code = lines.join("\n").trim()
  })
  $: blockHeight = `${Math.max(
    120,
    20 * (1 + code.split("\n").length) + 100,
  )}px`
</script>

<div class="eslint-code-block-default-content" bind:this={slotRoot}>
  <slot />
</div>

<div class="eslint-code-block-root" style:height={blockHeight}>
  <ESLintEditor
    {linter}
    bind:code
    filePath="exxample.astro"
    config={{
      parser: "astro-auto-eslint-parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
      },
      rules,
      env: {
        browser: true,
        es2021: true,
      },
      globals: {
        Astro: false,
      },
    }}
    options={optionsForAstro}
    on:result={onLintedResult}
    showDiff={showDiff && fix}
  />
  <div class="eslint-code-block-tools">
    {#if fix}
      <label>
        <input bind:checked={showDiff} type="checkbox" />
        Show Diff
      </label>
    {/if}
    <span style:margin-left="16px">{time}</span>
  </div>
</div>

<style>
  .eslint-code-block-default-content {
    display: none;
  }
  .eslint-code-block-root {
    height: 300px;
  }
  .eslint-code-block-tools {
    text-align: end;
  }
</style>
