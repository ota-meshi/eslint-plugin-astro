import type { AST } from "astro-eslint-parser"
import type { Scope } from "eslint"
import type * as ESTree from "estree"
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

export function findVariable(
  initialScope: Scope.Scope,
  nameOrNode: ESTree.Identifier | string,
): Scope.Variable
