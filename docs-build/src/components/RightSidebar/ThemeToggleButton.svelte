<script>
  const themes = ["light", "dark"]

  let theme = (() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme")
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  })()

  $: {
    if (typeof document !== "undefined") {
      const root = document.documentElement
      if (theme === "light") {
        root.classList.remove("theme-dark")
      } else {
        root.classList.add("theme-dark")
      }
    }
  }
</script>

<div class="theme-toggle">
  {#each themes as t, i}
    {@const checked = t === theme}
    <label class={checked ? " checked" : ""}>
      {#if i === 0}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      {:else if i === 1}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      {/if}
      <input
        type="radio"
        name="theme-toggle"
        {checked}
        value={t}
        title={`Use ${t} theme`}
        aria-label={`Use ${t} theme`}
        on:change={() => {
          localStorage.setItem("theme", t)
          theme = t
        }}
      />
    </label>
  {/each}
</div>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    padding: 0.33em 0.67em;
    border-radius: 99em;
    background-color: var(--theme-code-inline-bg);
  }

  .theme-toggle > label:focus-within {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 0.08em var(--theme-accent), 0 0 0 0.12em white;
  }

  .theme-toggle > label {
    color: var(--theme-code-inline-text);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
  }

  .theme-toggle .checked {
    color: var(--theme-accent);
    opacity: 1;
  }

  input[name="theme-toggle"] {
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
</style>
