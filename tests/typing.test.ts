import type { Linter } from "eslint"
import { expectTypeOf } from "expect-type"
import tseslint from "typescript-eslint"
import * as plugin from "../src/index.mts"

expectTypeOf([...plugin.configs["flat/base"]]).toMatchTypeOf<Linter.Config[]>()
expectTypeOf([...plugin.configs["flat/all"]]).toMatchTypeOf<Linter.Config[]>()
expectTypeOf([...plugin.configs["flat/recommended"]]).toMatchTypeOf<
  Linter.Config[]
>()
expectTypeOf([...plugin.configs.base]).toMatchTypeOf<Linter.Config[]>()
expectTypeOf([...plugin.configs.all]).toMatchTypeOf<Linter.Config[]>()
expectTypeOf([...plugin.configs.recommended]).toMatchTypeOf<Linter.Config[]>()

tseslint.config(...plugin.configs.base)
tseslint.config(...plugin.configs.all)
tseslint.config(...plugin.configs.recommended)
tseslint.config(...plugin.configs["flat/base"])
tseslint.config(...plugin.configs["flat/all"])
tseslint.config(...plugin.configs["flat/recommended"])

tseslint.config({ extends: [...plugin.configs.base] })
tseslint.config({ extends: [...plugin.configs.all] })
tseslint.config({ extends: [...plugin.configs.recommended] })
tseslint.config({ extends: [...plugin.configs["flat/base"]] })
tseslint.config({ extends: [...plugin.configs["flat/all"]] })
tseslint.config({ extends: [...plugin.configs["flat/recommended"]] })
