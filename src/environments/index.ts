export const environments = {
  astro: {
    globals: {
      // Astro object
      Astro: false,
      // JSX Fragment
      Fragment: false,
    },
  },
  markdown: {
    globals: {
      // Astro object
      Astro: false,
      // JSX Fragment
      Fragment: false,

      // Markdown properties
      Layout: false,
      frontmatter: false,
      metadata: false,
      rawContent: false,
      compiledContent: false,
    },
  },
}
