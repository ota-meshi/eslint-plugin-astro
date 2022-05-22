export const language = {
  defaultToken: "",
  tokenPostfix: ".astro",
  ignoreCase: false,

  // non matched elements
  empty: [
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "link",
    "meta",
    "param",
  ],

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [/<!DOCTYPE/, "metatag", "@doctype"],
      [/<!--/, "comment", "@comment"],
      [/^---/, "comment", "@frontmatter"],
      [/\{/, "", "@expression"],
      [
        /(<)((?:[\w-]+:)?[\w-]+)(\s*)(\/>)/,
        ["delimiter", "tag", "", "delimiter"],
      ],
      [/(<)(script)/, ["delimiter", { token: "tag", next: "@script" }]],
      [/(<)(style)/, ["delimiter", { token: "tag", next: "@style" }]],
      [
        /(<)((?:[\w-]+:)?[\w-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [
        /(<\/)((?:[\w-]+:)?[\w-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [/</, "delimiter"],
      [/[^<{]+/], // text
    ],

    doctype: [
      [/[^>]+/, "metatag.content"],
      [/>/, "metatag", "@pop"],
    ],

    frontmatter: [
      [/^---/, { token: "comment", next: "@pop", nextEmbedded: "@pop" }],
      [
        /./,
        {
          token: "@rematch",
          next: "@frontmatterEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
    ],

    frontmatterEmbedded: [
      [/[^-]+|-[^-]{2,}/, { token: "@rematch", next: "@pop" }],
      [/^---/, { token: "comment", next: "@root", nextEmbedded: "@pop" }],
    ],

    expression: [
      [
        /[^<{}]/,
        {
          token: "@rematch",
          next: "@expressionEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
      [/</, { token: "@rematch", next: "@pop" }],
      [/\}/, { token: "", next: "@pop" }],
    ],

    expressionEmbedded: [
      [/\{/, "@rematch", "@push"],
      [/</, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/\}/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
    ],

    comment: [
      [/-->/, "comment", "@pop"],
      [/[^-]+/, "comment.content"],
      [/./, "comment.content"],
    ],

    otherTag: [
      [/\/?>/, "delimiter", "@pop"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w-]+/, "attribute.name"],
      [/[=]/, "delimiter"],
      [/[\t\n\r ]+/], // whitespace
    ],

    // -- BEGIN <script> tags handling

    // After <script
    script: [
      [/type/, "attribute.name", "@scriptAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w-]+/, "attribute.name"],
      [/[=]/, "delimiter"],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
      [/[\t\n\r ]+/], // whitespace
      [
        /(<\/)(script\s*)(>)/,
        ["delimiter", "tag", { token: "delimiter", next: "@pop" }],
      ],
    ],

    // After <script ... type
    scriptAfterType: [
      [/[=]/, "delimiter", "@scriptAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ], // cover invalid e.g. <script type>
      [/[\t\n\r ]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <script ... type =
    scriptAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" },
      ],
      [
        /'([^']*)'/,
        { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" },
      ],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ], // cover invalid e.g. <script type=>
      [/[\t\n\r ]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <script ... type = $S2
    scriptWithCustomType: [
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded.$S2",
          nextEmbedded: "$S2",
        },
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w-]+/, "attribute.name"],
      [/[=]/, "delimiter"],
      [/[\t\n\r ]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    scriptEmbedded: [
      [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],

    // -- END <script> tags handling

    // -- BEGIN <style> tags handling

    // After <style
    style: [
      [/type/, "attribute.name", "@styleAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w-]+/, "attribute.name"],
      [/[=]/, "delimiter"],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ],
      [/[\t\n\r ]+/], // whitespace
      [
        /(<\/)(style\s*)(>)/,
        ["delimiter", "tag", { token: "delimiter", next: "@pop" }],
      ],
    ],

    // After <style ... type
    styleAfterType: [
      [/[=]/, "delimiter", "@styleAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ], // cover invalid e.g. <style type>
      [/[\t\n\r ]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <style ... type =
    styleAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: "attribute.value", switchTo: "@styleWithCustomType.$1" },
      ],
      [
        /'([^']*)'/,
        { token: "attribute.value", switchTo: "@styleWithCustomType.$1" },
      ],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ], // cover invalid e.g. <style type=>
      [/[\t\n\r ]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <style ... type = $S2
    styleWithCustomType: [
      [
        />/,
        { token: "delimiter", next: "@styleEmbedded.$S2", nextEmbedded: "$S2" },
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w-]+/, "attribute.name"],
      [/[=]/, "delimiter"],
      [/[\t\n\r ]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    styleEmbedded: [
      [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],

    // -- END <style> tags handling
  },
}
