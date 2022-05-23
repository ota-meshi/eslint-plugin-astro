<script>
  export let headers = []
</script>

{#if headers.length}
  <h2 class="heading">On this page</h2>
  <ul>
    <li class="header-link depth-2">
      <a href="#overview">Overview</a>
    </li>
    {#each headers as header}
      {#if header.depth > 1 && header.depth < 4}
        <li class={`header-link depth-${header.depth}`}>
          <a href={`#${header.slug}`}>{header.text}</a>
        </li>
      {/if}
    {/each}
  </ul>
{/if}
