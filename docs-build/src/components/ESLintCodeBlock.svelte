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
      return window.waitSetupForAstroCompilerWasm
    })
    .then(() => {
      return createLinter()
    })

  let code = ""
  export let rules = {}
  export let fix = false
  let time = ""
  let options = {
    filename: "example.astro",
    preprocess,
    postprocess,
  }
  let showDiff = fix

  function onLintedResult(evt) {
    time = `${evt.detail.time}ms`
  }

  let slotRoot
  onMount(() => {
    code = slotRoot.textContent.trim()
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
    config={{
      parser: "astro-auto-eslint-parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
      },
      rules,
      env: {
        browser: true,
        es2021: true,
      },
    }}
    {options}
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
