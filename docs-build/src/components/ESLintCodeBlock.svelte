<script>
  import { onMount } from "svelte"
  import ESLintEditor from "./eslint/ESLintEditor.svelte"
  import { loadMonacoEditor } from "./eslint/scripts/monaco-loader.mjs"
  import { Linter } from "eslint"
  import { createLinterConfig } from "./eslint/scripts/linter.mts"

  let tsParser = undefined
  const linter = loadMonacoEditor().then(async () => {
    tsParser = await import("@typescript-eslint/parser")
    const pluginJsxA11y = await import("eslint-plugin-jsx-a11y")
    if (typeof window !== "undefined") {
      window.require.define("@typescript-eslint/parser", tsParser)
      window.require.define("eslint-plugin-jsx-a11y", pluginJsxA11y)
    }

    return new Linter()
  })

  let code = ""
  export let rules = {}
  export let fix = false
  let time = ""
  let showDiff = fix

  function onLintedResult(evt) {
    time = `${evt.detail.time}ms`
  }

  let slotRoot
  onMount(() => {
    const lines = []
    for (const line of slotRoot.querySelectorAll("code > .line")) {
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
    filePath="example.astro"
    config={createLinterConfig().then((configs) => [
      ...configs,
      {
        rules,
      },
    ])}
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
