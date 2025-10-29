import { rules } from "../../src/rules"

const categories = [
  "Possible Errors",
  "Security Vulnerability",
  "Best Practices",
  "Stylistic Issues",
  "A11Y Extension Rules",
  "Extension Rules",
  "System",
] as const

export const SITE = {
  title: "eslint-plugin-astro",
  description: "ESLint plugin for Astro component.",
  keywords: ["ESLint", "Astro", "astrojs"] as const,
  defaultLanguage: "en_US",
}

export const OPEN_GRAPH = {
  image: {
    src: null,
    alt: null,
  },
  twitter: "omoteota",
}

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
export const COMMUNITY_INVITE_URL = "" // `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR: {
  en: {
    text: string
    link?: string
    header?: boolean
    ignorePageNav?: boolean
  }[]
} = {
  en: [
    { text: "Introduction", link: "" },
    { text: "User Guide", link: "user-guide/" },
    { text: "Demo", link: "playground/", ignorePageNav: true },
    { text: "Rules", link: "rules/" },
    ...categories.flatMap((category) => {
      const categoryRules = rules.filter(
        (rule) => rule.meta.docs.category === category,
      )
      if (!categoryRules.length) {
        return []
      }
      return [
        { text: category, header: true },
        ...categoryRules.map((rule) => {
          return {
            text: rule.meta.docs.ruleId,
            link: `rules/${rule.meta.docs.ruleName}/`,
          }
        }),
      ]
    }),
  ],
}
