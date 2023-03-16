export * from "../../../node_modules/@types/eslint-utils"
import type { AST } from "astro-eslint-parser"
import type { Scope } from "eslint"
import type * as ESTree from "estree"
import type { TSESTree } from "@typescript-eslint/types"
import type { SourceCode } from "../../../src/types"
type Token = { type: string; value: string }
export function isArrowToken(token: Token): boolean
export function isCommaToken(token: Token): boolean
export function isSemicolonToken(token: Token): boolean
export function isColonToken(token: Token): boolean
export function isOpeningParenToken(token: Token): boolean
export function isClosingParenToken(token: Token): boolean
export function isOpeningBracketToken(token: Token): boolean
export function isClosingBracketToken(token: Token): boolean
export function isOpeningBraceToken(token: Token): boolean
export function isClosingBraceToken(token: Token): boolean
export function isCommentToken(token: Token): token is AST.Comment
export function isNotArrowToken(token: Token): boolean
export function isNotCommaToken(token: Token): boolean
export function isNotSemicolonToken(token: Token): boolean
export function isNotColonToken(token: Token): boolean
export function isNotOpeningParenToken(token: Token): boolean
export function isNotClosingParenToken(token: Token): boolean
export function isNotOpeningBracketToken(token: Token): boolean
export function isNotClosingBracketToken(token: Token): boolean
export function isNotOpeningBraceToken(token: Token): boolean
export function isNotClosingBraceToken(token: Token): boolean
export function isNotCommentToken(token: Token): boolean

export function isParenthesized(
  times: number,
  node: ESTree.Node | TSESTree.Node,
  sourceCode: SourceCode,
): boolean
export function isParenthesized(
  node: ESTree.Node | TSESTree.Node,
  sourceCode: SourceCode,
): boolean

export function getPropertyName(
  node:
    | ESTree.MemberExpression
    | ESTree.MethodDefinition
    | ESTree.Property
    | ESTree.PropertyDefinition
    | TSESTree.MemberExpression
    | TSESTree.MethodDefinition
    | TSESTree.Property
    | TSESTree.PropertyDefinition,
  initialScope?: Scope.Scope,
): string | null

export function findVariable(
  initialScope: Scope.Scope,
  nameOrNode: ESTree.Identifier | string,
): Scope.Variable
