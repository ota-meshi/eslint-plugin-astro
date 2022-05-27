import type { CSSToken, CSSTokenizeOption } from "./tokenizer"
import { CSSTokenType, CSSTokenizer } from "./tokenizer"

class CSSTokenScanner {
  private readonly reconsuming: CSSToken[] = []

  private readonly tokenizer: CSSTokenizer

  public constructor(text: string, options: CSSTokenizeOption) {
    this.tokenizer = new CSSTokenizer(text, 0, options)
  }

  public nextToken(): CSSToken | null {
    return this.reconsuming.shift() || this.tokenizer.nextToken()
  }

  public reconsume(...tokens: CSSToken[]) {
    this.reconsuming.push(...tokens)
  }
}

/**
 * Iterate the CSS variables.
 */
export function* iterateCSSVars(
  code: string,
  cssOptions: CSSTokenizeOption,
): IterableIterator<string> {
  const tokenizer = new CSSTokenScanner(code, cssOptions)

  let token
  while ((token = tokenizer.nextToken())) {
    if (token.type === CSSTokenType.word || token.value.startsWith("--")) {
      yield token.value
    }
  }
}
