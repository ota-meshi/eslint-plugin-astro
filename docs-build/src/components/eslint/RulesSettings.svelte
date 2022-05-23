<script>
  import { categories } from "./scripts/linter.mjs"

  export let rules = {}

  let filterValue = ""
  let filteredCategories = categories
  $: {
    filteredCategories = []
    for (const category of categories) {
      let filteredRules = category.rules
      if (filterValue) {
        // eslint-disable-next-line no-loop-func -- ignore
        filteredRules = filteredRules.filter((r) =>
          r.ruleId.includes(filterValue),
        )
      }
      filteredCategories.push({
        ...category,
        rules: filteredRules,
      })
    }
  }
  let categoryState = Object.fromEntries(
    categories.map((c) => {
      return [
        c.title,
        {
          close: true,
        },
      ]
    }),
  )

  function onCategoryClick(category, e) {
    const checked = e.target.checked
    const newRules = Object.assign({}, rules)
    for (const rule of category.rules) {
      if (checked) {
        newRules[rule.ruleId] = "error"
      } else {
        delete newRules[rule.ruleId]
      }
    }
    rules = newRules
  }
  function onClick(ruleId, e) {
    const checked = e.target.checked
    const newRules = Object.assign({}, rules)
    if (checked) {
      newRules[ruleId] = "error"
    } else {
      delete newRules[ruleId]
    }
    rules = newRules
  }
  function isErrorState(rules, ruleId) {
    return rules[ruleId] === "error" || rules[ruleId] === 2
  }

  function onAllClick(e) {
    const checked = e.target.checked
    const newRules = Object.assign({}, rules)
    for (const category of filteredCategories) {
      for (const rule of category.rules) {
        if (checked) {
          newRules[rule.ruleId] = "error"
        } else {
          delete newRules[rule.ruleId]
        }
      }
    }
    rules = newRules
  }
</script>

<div class="rules-settings">
  <div class="tools">
    <label class="tool">
      <span class="tool-label">Filter:</span>
      <input
        type="search"
        placeholder="Rule Filter"
        class="tool-form"
        bind:value={filterValue}
      />
    </label>
    <label class="tool">
      <input
        type="checkbox"
        on:click={onAllClick}
        checked={filteredCategories.every((category) =>
          category.rules.every((rule) => isErrorState(rules, rule.ruleId)),
        )}
        indeterminate={filteredCategories.some((category) =>
          category.rules.some((rule) => isErrorState(rules, rule.ruleId)),
        ) &&
          filteredCategories.some((category) =>
            category.rules.some((rule) => !isErrorState(rules, rule.ruleId)),
          )}
      />
      <span>All Rules</span>
    </label>
  </div>
  <ul class="categories">
    {#each filteredCategories as category (category.title)}
      {#if category.rules.length}
        <li class="category {category.classes}">
          <button
            class="category-button"
            class:category-button--close={categoryState[category.title].close}
            on:click={() => {
              categoryState = Object.fromEntries(
                categories.map((c) => {
                  const close = categoryState[c.title].close
                  return [
                    c.title,
                    {
                      close: category.title === c.title ? !close : close,
                    },
                  ]
                }),
              )
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              viewBox="0 0 10 10"
              width="10"
            >
              <path d="M2.5 10l5-5-5-5v10z" fill="#ddd" />
            </svg>
          </button>
          <div class="category-title-wrapper">
            <label class="category-title">
              <input
                type="checkbox"
                checked={category.rules.every((rule) =>
                  isErrorState(rules, rule.ruleId),
                )}
                indeterminate={!category.rules.every((rule) =>
                  isErrorState(rules, rule.ruleId),
                ) &&
                  !category.rules.every(
                    (rule) => !isErrorState(rules, rule.ruleId),
                  )}
                on:input={(e) => onCategoryClick(category, e)}
              />
              {category.title}
            </label>
          </div>

          {#if !categoryState[category.title].close}
            <ul class="rules">
              {#each category.rules as rule (rule.ruleId)}
                <li class="rule">
                  <label>
                    <input
                      type="checkbox"
                      checked={isErrorState(rules, rule.ruleId)}
                      on:input={(e) => onClick(rule.ruleId, e)}
                    />
                    {rule.ruleId}
                  </label>
                  <a href={rule.url} target="_blank" rel="noopener noreferrer"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      width="15"
                      height="15"
                      class="icon outbound"
                    >
                      <path
                        fill="currentColor"
                        d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                      />
                      <polygon
                        fill="currentColor"
                        points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                      /></svg
                    ></a
                  >
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .rules-settings {
    height: 100%;
    overflow: auto;
    width: 25%;
    box-sizing: border-box;
  }

  .categories {
    font-size: 14px;
    list-style-type: none;
    padding-left: 32px;
  }
  .category {
    position: relative;
  }
  .category-button {
    position: absolute;
    left: -24px;
    top: 2px;

    background-color: transparent;
    color: #ddd;
    border: none;
    appearance: none;
    cursor: pointer;
    padding: 0;
  }
  .category-button--close {
    transform: rotate(90deg);
  }

  .category-title {
    font-size: 14px;
    font-weight: bold;
  }

  .rules {
    padding-left: 0;
  }

  .rule {
    font-size: 12px;
    line-height: 24px;
    vertical-align: top;
    list-style-type: none;
    display: flex;
  }

  .rule a {
    margin-left: auto;
  }

  a {
    text-decoration: none;
  }

  .tools {
    background-color: #676778;
  }
  .tool {
    padding: 4px;
    display: flex;
    align-items: center;
  }
  .tool-label {
    width: 3.5rem;
    flex-shrink: 0;
  }
  .tool-form {
    width: 100%;
  }

  .category {
    color: #fff;
  }

  .svelte-category .category-title {
    color: #40b3ff;
  }
  .svelte-category a > svg {
    color: #40b3ff;
  }
  .core-category .category-title {
    color: #8080f2;
  }
  .core-category a > svg {
    color: #8080f2;
  }
</style>
