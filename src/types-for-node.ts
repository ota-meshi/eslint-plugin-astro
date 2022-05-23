import type { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/types"
import type { AST } from "astro-eslint-parser"
import type * as ESTree from "estree"

export type ASTNode =
  | AST.AstroNode
  | AST.JSXNode
  | ESTree.Node
  | Exclude<
      TSESTree.Node,
      { type: ESTree.Node["type"] } | { type: AST.JSXNode["type"] }
    >
export type ASTNodeWithParent =
  | (Exclude<ASTNode, ESTree.Program> & { parent: ASTNodeWithParent })
  | AST.AstroProgram

export type ASTNodeListener = {
  ArrayExpression?: (node: TSESTree.ArrayExpression & ASTNodeWithParent) => void
  ArrayPattern?: (node: TSESTree.ArrayPattern & ASTNodeWithParent) => void
  ArrowFunctionExpression?: (
    node: TSESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  AssignmentExpression?: (
    node: TSESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  AssignmentPattern?: (
    node: TSESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  AwaitExpression?: (node: TSESTree.AwaitExpression & ASTNodeWithParent) => void
  BinaryExpression?: (
    node: TSESTree.BinaryExpression & ASTNodeWithParent,
  ) => void
  BlockStatement?: (node: TSESTree.BlockStatement & ASTNodeWithParent) => void
  BreakStatement?: (node: TSESTree.BreakStatement & ASTNodeWithParent) => void
  CallExpression?: (node: TSESTree.CallExpression & ASTNodeWithParent) => void
  CatchClause?: (node: TSESTree.CatchClause & ASTNodeWithParent) => void
  ChainExpression?: (node: TSESTree.ChainExpression & ASTNodeWithParent) => void
  ClassBody?: (node: TSESTree.ClassBody & ASTNodeWithParent) => void
  ClassDeclaration?: (
    node: TSESTree.ClassDeclaration & ASTNodeWithParent,
  ) => void
  ClassExpression?: (node: TSESTree.ClassExpression & ASTNodeWithParent) => void
  ConditionalExpression?: (
    node: TSESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  ContinueStatement?: (
    node: TSESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  DebuggerStatement?: (
    node: TSESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  Decorator?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  DoWhileStatement?: (
    node: TSESTree.DoWhileStatement & ASTNodeWithParent,
  ) => void
  EmptyStatement?: (node: TSESTree.EmptyStatement & ASTNodeWithParent) => void
  ExportAllDeclaration?: (
    node: TSESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  ExportDefaultDeclaration?: (
    node: TSESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  ExportNamedDeclaration?: (
    node: TSESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  ExportSpecifier?: (node: TSESTree.ExportSpecifier & ASTNodeWithParent) => void
  ExpressionStatement?: (
    node: TSESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  ForInStatement?: (node: TSESTree.ForInStatement & ASTNodeWithParent) => void
  ForOfStatement?: (node: TSESTree.ForOfStatement & ASTNodeWithParent) => void
  ForStatement?: (node: TSESTree.ForStatement & ASTNodeWithParent) => void
  FunctionDeclaration?: (
    node: TSESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  FunctionExpression?: (
    node: TSESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  Identifier?: (node: TSESTree.Identifier & ASTNodeWithParent) => void
  IfStatement?: (node: TSESTree.IfStatement & ASTNodeWithParent) => void
  ImportAttribute?: (node: TSESTree.ImportAttribute & ASTNodeWithParent) => void
  ImportDeclaration?: (
    node: TSESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  ImportDefaultSpecifier?: (
    node: TSESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  ImportExpression?: (
    node: TSESTree.ImportExpression & ASTNodeWithParent,
  ) => void
  ImportNamespaceSpecifier?: (
    node: TSESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  ImportSpecifier?: (node: TSESTree.ImportSpecifier & ASTNodeWithParent) => void
  LabeledStatement?: (
    node: TSESTree.LabeledStatement & ASTNodeWithParent,
  ) => void
  Literal?: (node: TSESTree.Literal & ASTNodeWithParent) => void
  LogicalExpression?: (
    node: TSESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  MemberExpression?: (
    node: TSESTree.MemberExpression & ASTNodeWithParent,
  ) => void
  MetaProperty?: (node: TSESTree.MetaProperty & ASTNodeWithParent) => void
  MethodDefinition?: (
    node: TSESTree.MethodDefinition & ASTNodeWithParent,
  ) => void
  NewExpression?: (node: TSESTree.NewExpression & ASTNodeWithParent) => void
  ObjectExpression?: (
    node: TSESTree.ObjectExpression & ASTNodeWithParent,
  ) => void
  ObjectPattern?: (node: TSESTree.ObjectPattern & ASTNodeWithParent) => void
  PrivateIdentifier?: (
    node: TSESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  Property?: (node: TSESTree.Property & ASTNodeWithParent) => void
  PropertyDefinition?: (
    node: TSESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  RestElement?: (node: TSESTree.RestElement & ASTNodeWithParent) => void
  ReturnStatement?: (node: TSESTree.ReturnStatement & ASTNodeWithParent) => void
  SequenceExpression?: (
    node: TSESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  SpreadElement?: (node: TSESTree.SpreadElement & ASTNodeWithParent) => void
  StaticBlock?: (node: TSESTree.StaticBlock & ASTNodeWithParent) => void
  Super?: (node: TSESTree.Super & ASTNodeWithParent) => void
  SwitchCase?: (node: TSESTree.SwitchCase & ASTNodeWithParent) => void
  SwitchStatement?: (node: TSESTree.SwitchStatement & ASTNodeWithParent) => void
  TaggedTemplateExpression?: (
    node: TSESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  TemplateElement?: (node: TSESTree.TemplateElement & ASTNodeWithParent) => void
  TemplateLiteral?: (node: TSESTree.TemplateLiteral & ASTNodeWithParent) => void
  ThisExpression?: (node: TSESTree.ThisExpression & ASTNodeWithParent) => void
  ThrowStatement?: (node: TSESTree.ThrowStatement & ASTNodeWithParent) => void
  TryStatement?: (node: TSESTree.TryStatement & ASTNodeWithParent) => void
  UnaryExpression?: (node: TSESTree.UnaryExpression & ASTNodeWithParent) => void
  UpdateExpression?: (
    node: TSESTree.UpdateExpression & ASTNodeWithParent,
  ) => void
  VariableDeclaration?: (
    node: TSESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  VariableDeclarator?: (
    node: TSESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  WhileStatement?: (node: TSESTree.WhileStatement & ASTNodeWithParent) => void
  WithStatement?: (node: TSESTree.WithStatement & ASTNodeWithParent) => void
  YieldExpression?: (node: TSESTree.YieldExpression & ASTNodeWithParent) => void
  TSAbstractKeyword?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  TSAbstractMethodDefinition?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  TSAbstractPropertyDefinition?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  TSAnyKeyword?: (node: TSESTree.TSAnyKeyword & ASTNodeWithParent) => void
  TSArrayType?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  TSAsExpression?: (node: TSESTree.TSAsExpression & ASTNodeWithParent) => void
  TSAsyncKeyword?: (node: TSESTree.TSAsyncKeyword & ASTNodeWithParent) => void
  TSBigIntKeyword?: (node: TSESTree.TSBigIntKeyword & ASTNodeWithParent) => void
  TSBooleanKeyword?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  TSCallSignatureDeclaration?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSClassImplements?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  TSConditionalType?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  TSConstructorType?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  TSConstructSignatureDeclaration?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSDeclareFunction?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  TSDeclareKeyword?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  TSEmptyBodyFunctionExpression?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  TSEnumDeclaration?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  TSEnumMember?: (node: TSESTree.TSEnumMember & ASTNodeWithParent) => void
  TSExportAssignment?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  TSExportKeyword?: (node: TSESTree.TSExportKeyword & ASTNodeWithParent) => void
  TSExternalModuleReference?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  TSFunctionType?: (node: TSESTree.TSFunctionType & ASTNodeWithParent) => void
  TSImportEqualsDeclaration?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  TSImportType?: (node: TSESTree.TSImportType & ASTNodeWithParent) => void
  TSIndexedAccessType?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  TSIndexSignature?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  TSInferType?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  TSInterfaceBody?: (node: TSESTree.TSInterfaceBody & ASTNodeWithParent) => void
  TSInterfaceDeclaration?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  TSInterfaceHeritage?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  TSIntersectionType?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  TSIntrinsicKeyword?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  TSLiteralType?: (node: TSESTree.TSLiteralType & ASTNodeWithParent) => void
  TSMappedType?: (node: TSESTree.TSMappedType & ASTNodeWithParent) => void
  TSMethodSignature?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  TSModuleBlock?: (node: TSESTree.TSModuleBlock & ASTNodeWithParent) => void
  TSModuleDeclaration?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  TSNamedTupleMember?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  TSNamespaceExportDeclaration?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  TSNeverKeyword?: (node: TSESTree.TSNeverKeyword & ASTNodeWithParent) => void
  TSNonNullExpression?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  TSNullKeyword?: (node: TSESTree.TSNullKeyword & ASTNodeWithParent) => void
  TSNumberKeyword?: (node: TSESTree.TSNumberKeyword & ASTNodeWithParent) => void
  TSObjectKeyword?: (node: TSESTree.TSObjectKeyword & ASTNodeWithParent) => void
  TSOptionalType?: (node: TSESTree.TSOptionalType & ASTNodeWithParent) => void
  TSParameterProperty?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  TSPrivateKeyword?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  TSPropertySignature?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  TSProtectedKeyword?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  TSPublicKeyword?: (node: TSESTree.TSPublicKeyword & ASTNodeWithParent) => void
  TSQualifiedName?: (node: TSESTree.TSQualifiedName & ASTNodeWithParent) => void
  TSReadonlyKeyword?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  TSRestType?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  TSStaticKeyword?: (node: TSESTree.TSStaticKeyword & ASTNodeWithParent) => void
  TSStringKeyword?: (node: TSESTree.TSStringKeyword & ASTNodeWithParent) => void
  TSSymbolKeyword?: (node: TSESTree.TSSymbolKeyword & ASTNodeWithParent) => void
  TSTemplateLiteralType?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  TSThisType?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  TSTupleType?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  TSTypeAliasDeclaration?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeAnnotation?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  TSTypeAssertion?: (node: TSESTree.TSTypeAssertion & ASTNodeWithParent) => void
  TSTypeLiteral?: (node: TSESTree.TSTypeLiteral & ASTNodeWithParent) => void
  TSTypeOperator?: (node: TSESTree.TSTypeOperator & ASTNodeWithParent) => void
  TSTypeParameter?: (node: TSESTree.TSTypeParameter & ASTNodeWithParent) => void
  TSTypeParameterDeclaration?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeParameterInstantiation?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  TSTypePredicate?: (node: TSESTree.TSTypePredicate & ASTNodeWithParent) => void
  TSTypeQuery?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  TSTypeReference?: (node: TSESTree.TSTypeReference & ASTNodeWithParent) => void
  TSUndefinedKeyword?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  TSUnionType?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  TSUnknownKeyword?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  TSVoidKeyword?: (node: TSESTree.TSVoidKeyword & ASTNodeWithParent) => void
  JSXAttribute?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  JSXClosingElement?: (node: AST.JSXClosingElement & ASTNodeWithParent) => void
  JSXElement?: (node: AST.JSXElement & ASTNodeWithParent) => void
  JSXEmptyExpression?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  JSXExpressionContainer?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  JSXIdentifier?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  JSXMemberExpression?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  JSXNamespacedName?: (node: AST.JSXNamespacedName & ASTNodeWithParent) => void
  JSXOpeningElement?: (node: AST.JSXOpeningElement & ASTNodeWithParent) => void
  JSXSpreadAttribute?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  JSXText?: (node: AST.JSXText & ASTNodeWithParent) => void
  JSXFragment?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  JSXClosingFragment?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  JSXOpeningFragment?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  Program?: (node: AST.AstroProgram & ASTNodeWithParent) => void
  AstroFragment?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  AstroHTMLComment?: (node: AST.AstroHTMLComment & ASTNodeWithParent) => void
  AstroDoctype?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  AstroShorthandAttribute?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  AstroTemplateLiteralAttribute?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  AstroRawText?: (node: AST.AstroRawText & ASTNodeWithParent) => void
}
export type ESNodeListener = {
  ArrayExpression?: (node: ESTree.ArrayExpression & ASTNodeWithParent) => void
  ArrayPattern?: (node: ESTree.ArrayPattern & ASTNodeWithParent) => void
  ArrowFunctionExpression?: (
    node: ESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  AssignmentExpression?: (
    node: ESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  AssignmentPattern?: (
    node: ESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  AwaitExpression?: (node: ESTree.AwaitExpression & ASTNodeWithParent) => void
  BinaryExpression?: (node: ESTree.BinaryExpression & ASTNodeWithParent) => void
  BlockStatement?: (node: ESTree.BlockStatement & ASTNodeWithParent) => void
  BreakStatement?: (node: ESTree.BreakStatement & ASTNodeWithParent) => void
  CallExpression?: (node: ESTree.CallExpression & ASTNodeWithParent) => void
  CatchClause?: (node: ESTree.CatchClause & ASTNodeWithParent) => void
  ChainExpression?: (node: ESTree.ChainExpression & ASTNodeWithParent) => void
  ClassBody?: (node: ESTree.ClassBody & ASTNodeWithParent) => void
  ClassDeclaration?: (node: ESTree.ClassDeclaration & ASTNodeWithParent) => void
  ClassExpression?: (node: ESTree.ClassExpression & ASTNodeWithParent) => void
  ConditionalExpression?: (
    node: ESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  ContinueStatement?: (
    node: ESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  DebuggerStatement?: (
    node: ESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  DoWhileStatement?: (node: ESTree.DoWhileStatement & ASTNodeWithParent) => void
  EmptyStatement?: (node: ESTree.EmptyStatement & ASTNodeWithParent) => void
  ExportAllDeclaration?: (
    node: ESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  ExportDefaultDeclaration?: (
    node: ESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  ExportNamedDeclaration?: (
    node: ESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  ExportSpecifier?: (node: ESTree.ExportSpecifier & ASTNodeWithParent) => void
  ExpressionStatement?: (
    node: ESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  ForInStatement?: (node: ESTree.ForInStatement & ASTNodeWithParent) => void
  ForOfStatement?: (node: ESTree.ForOfStatement & ASTNodeWithParent) => void
  ForStatement?: (node: ESTree.ForStatement & ASTNodeWithParent) => void
  FunctionDeclaration?: (
    node: ESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  FunctionExpression?: (
    node: ESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  Identifier?: (node: ESTree.Identifier & ASTNodeWithParent) => void
  IfStatement?: (node: ESTree.IfStatement & ASTNodeWithParent) => void
  ImportDeclaration?: (
    node: ESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  ImportDefaultSpecifier?: (
    node: ESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  ImportExpression?: (node: ESTree.ImportExpression & ASTNodeWithParent) => void
  ImportNamespaceSpecifier?: (
    node: ESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  ImportSpecifier?: (node: ESTree.ImportSpecifier & ASTNodeWithParent) => void
  LabeledStatement?: (node: ESTree.LabeledStatement & ASTNodeWithParent) => void
  Literal?: (node: ESTree.Literal & ASTNodeWithParent) => void
  LogicalExpression?: (
    node: ESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  MemberExpression?: (node: ESTree.MemberExpression & ASTNodeWithParent) => void
  MetaProperty?: (node: ESTree.MetaProperty & ASTNodeWithParent) => void
  MethodDefinition?: (node: ESTree.MethodDefinition & ASTNodeWithParent) => void
  NewExpression?: (node: ESTree.NewExpression & ASTNodeWithParent) => void
  ObjectExpression?: (node: ESTree.ObjectExpression & ASTNodeWithParent) => void
  ObjectPattern?: (node: ESTree.ObjectPattern & ASTNodeWithParent) => void
  PrivateIdentifier?: (
    node: ESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  Property?: (node: ESTree.Property & ASTNodeWithParent) => void
  PropertyDefinition?: (
    node: ESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  RestElement?: (node: ESTree.RestElement & ASTNodeWithParent) => void
  ReturnStatement?: (node: ESTree.ReturnStatement & ASTNodeWithParent) => void
  SequenceExpression?: (
    node: ESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  SpreadElement?: (node: ESTree.SpreadElement & ASTNodeWithParent) => void
  StaticBlock?: (node: ESTree.StaticBlock & ASTNodeWithParent) => void
  Super?: (node: ESTree.Super & ASTNodeWithParent) => void
  SwitchCase?: (node: ESTree.SwitchCase & ASTNodeWithParent) => void
  SwitchStatement?: (node: ESTree.SwitchStatement & ASTNodeWithParent) => void
  TaggedTemplateExpression?: (
    node: ESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  TemplateElement?: (node: ESTree.TemplateElement & ASTNodeWithParent) => void
  TemplateLiteral?: (node: ESTree.TemplateLiteral & ASTNodeWithParent) => void
  ThisExpression?: (node: ESTree.ThisExpression & ASTNodeWithParent) => void
  ThrowStatement?: (node: ESTree.ThrowStatement & ASTNodeWithParent) => void
  TryStatement?: (node: ESTree.TryStatement & ASTNodeWithParent) => void
  UnaryExpression?: (node: ESTree.UnaryExpression & ASTNodeWithParent) => void
  UpdateExpression?: (node: ESTree.UpdateExpression & ASTNodeWithParent) => void
  VariableDeclaration?: (
    node: ESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  VariableDeclarator?: (
    node: ESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  WhileStatement?: (node: ESTree.WhileStatement & ASTNodeWithParent) => void
  WithStatement?: (node: ESTree.WithStatement & ASTNodeWithParent) => void
  YieldExpression?: (node: ESTree.YieldExpression & ASTNodeWithParent) => void
  Program?: (node: AST.AstroProgram & ASTNodeWithParent) => void
}
export type TSNodeListener = {
  Decorator?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  ImportAttribute?: (node: TSESTree.ImportAttribute & ASTNodeWithParent) => void
  TSAbstractKeyword?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  TSAbstractMethodDefinition?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  TSAbstractPropertyDefinition?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  TSAnyKeyword?: (node: TSESTree.TSAnyKeyword & ASTNodeWithParent) => void
  TSArrayType?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  TSAsExpression?: (node: TSESTree.TSAsExpression & ASTNodeWithParent) => void
  TSAsyncKeyword?: (node: TSESTree.TSAsyncKeyword & ASTNodeWithParent) => void
  TSBigIntKeyword?: (node: TSESTree.TSBigIntKeyword & ASTNodeWithParent) => void
  TSBooleanKeyword?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  TSCallSignatureDeclaration?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSClassImplements?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  TSConditionalType?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  TSConstructorType?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  TSConstructSignatureDeclaration?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSDeclareFunction?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  TSDeclareKeyword?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  TSEmptyBodyFunctionExpression?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  TSEnumDeclaration?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  TSEnumMember?: (node: TSESTree.TSEnumMember & ASTNodeWithParent) => void
  TSExportAssignment?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  TSExportKeyword?: (node: TSESTree.TSExportKeyword & ASTNodeWithParent) => void
  TSExternalModuleReference?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  TSFunctionType?: (node: TSESTree.TSFunctionType & ASTNodeWithParent) => void
  TSImportEqualsDeclaration?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  TSImportType?: (node: TSESTree.TSImportType & ASTNodeWithParent) => void
  TSIndexedAccessType?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  TSIndexSignature?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  TSInferType?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  TSInterfaceBody?: (node: TSESTree.TSInterfaceBody & ASTNodeWithParent) => void
  TSInterfaceDeclaration?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  TSInterfaceHeritage?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  TSIntersectionType?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  TSIntrinsicKeyword?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  TSLiteralType?: (node: TSESTree.TSLiteralType & ASTNodeWithParent) => void
  TSMappedType?: (node: TSESTree.TSMappedType & ASTNodeWithParent) => void
  TSMethodSignature?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  TSModuleBlock?: (node: TSESTree.TSModuleBlock & ASTNodeWithParent) => void
  TSModuleDeclaration?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  TSNamedTupleMember?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  TSNamespaceExportDeclaration?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  TSNeverKeyword?: (node: TSESTree.TSNeverKeyword & ASTNodeWithParent) => void
  TSNonNullExpression?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  TSNullKeyword?: (node: TSESTree.TSNullKeyword & ASTNodeWithParent) => void
  TSNumberKeyword?: (node: TSESTree.TSNumberKeyword & ASTNodeWithParent) => void
  TSObjectKeyword?: (node: TSESTree.TSObjectKeyword & ASTNodeWithParent) => void
  TSOptionalType?: (node: TSESTree.TSOptionalType & ASTNodeWithParent) => void
  TSParameterProperty?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  TSPrivateKeyword?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  TSPropertySignature?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  TSProtectedKeyword?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  TSPublicKeyword?: (node: TSESTree.TSPublicKeyword & ASTNodeWithParent) => void
  TSQualifiedName?: (node: TSESTree.TSQualifiedName & ASTNodeWithParent) => void
  TSReadonlyKeyword?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  TSRestType?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  TSStaticKeyword?: (node: TSESTree.TSStaticKeyword & ASTNodeWithParent) => void
  TSStringKeyword?: (node: TSESTree.TSStringKeyword & ASTNodeWithParent) => void
  TSSymbolKeyword?: (node: TSESTree.TSSymbolKeyword & ASTNodeWithParent) => void
  TSTemplateLiteralType?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  TSThisType?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  TSTupleType?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  TSTypeAliasDeclaration?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeAnnotation?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  TSTypeAssertion?: (node: TSESTree.TSTypeAssertion & ASTNodeWithParent) => void
  TSTypeLiteral?: (node: TSESTree.TSTypeLiteral & ASTNodeWithParent) => void
  TSTypeOperator?: (node: TSESTree.TSTypeOperator & ASTNodeWithParent) => void
  TSTypeParameter?: (node: TSESTree.TSTypeParameter & ASTNodeWithParent) => void
  TSTypeParameterDeclaration?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeParameterInstantiation?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  TSTypePredicate?: (node: TSESTree.TSTypePredicate & ASTNodeWithParent) => void
  TSTypeQuery?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  TSTypeReference?: (node: TSESTree.TSTypeReference & ASTNodeWithParent) => void
  TSUndefinedKeyword?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  TSUnionType?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  TSUnknownKeyword?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  TSVoidKeyword?: (node: TSESTree.TSVoidKeyword & ASTNodeWithParent) => void
}
export type AstroNodeListener = {
  JSXAttribute?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  JSXClosingElement?: (node: AST.JSXClosingElement & ASTNodeWithParent) => void
  JSXElement?: (node: AST.JSXElement & ASTNodeWithParent) => void
  JSXEmptyExpression?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  JSXExpressionContainer?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  JSXIdentifier?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  JSXMemberExpression?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  JSXNamespacedName?: (node: AST.JSXNamespacedName & ASTNodeWithParent) => void
  JSXOpeningElement?: (node: AST.JSXOpeningElement & ASTNodeWithParent) => void
  JSXSpreadAttribute?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  JSXText?: (node: AST.JSXText & ASTNodeWithParent) => void
  JSXFragment?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  JSXClosingFragment?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  JSXOpeningFragment?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  AstroFragment?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  AstroHTMLComment?: (node: AST.AstroHTMLComment & ASTNodeWithParent) => void
  AstroDoctype?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  AstroShorthandAttribute?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  AstroTemplateLiteralAttribute?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  AstroRawText?: (node: AST.AstroRawText & ASTNodeWithParent) => void
}
