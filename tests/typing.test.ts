import type { Linter } from "eslint"
import { expectTypeOf } from "expect-type"
import tseslint from "typescript-eslint"
import * as plugin from "../src/index.mts"

expectTypeOf([...plugin.configs["flat/base"]]).toMatchTypeOf<
  Linter.FlatConfig[]
>()
expectTypeOf([...plugin.configs["flat/all"]]).toMatchTypeOf<
  Linter.FlatConfig[]
>()
expectTypeOf([...plugin.configs["flat/recommended"]]).toMatchTypeOf<
  Linter.FlatConfig[]
>()

tseslint.config(...plugin.configs["flat/base"])
tseslint.config(...plugin.configs["flat/all"])
tseslint.config(...plugin.configs["flat/recommended"])

tseslint.config({ extends: [...plugin.configs["flat/base"]] })
tseslint.config({ extends: [...plugin.configs["flat/all"]] })
tseslint.config({ extends: [...plugin.configs["flat/recommended"]] })
