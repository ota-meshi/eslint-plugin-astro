// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import type { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/types"
import type { AST } from "astro-eslint-parser"
import type * as ESTree from "estree"

export type ASTNode =
  | AST.AstroNode
  | AST.JSXNode
  | Exclude<ESTree.Node, { type: AST.JSXNode["type"] }>
  | Exclude<
      TSESTree.Node,
      { type: ESTree.Node["type"] } | { type: AST.JSXNode["type"] }
    >
export type ASTNodeWithParent =
  | (Exclude<ASTNode, ESTree.Program> & { parent: ASTNodeWithParent })
  | AST.AstroProgram

export type ASTNodeListener = {
  AccessorProperty?: (
    node: TSESTree.AccessorProperty & ASTNodeWithParent,
  ) => void
  "AccessorProperty:exit"?: (
    node: TSESTree.AccessorProperty & ASTNodeWithParent,
  ) => void
  ArrayExpression?: (node: TSESTree.ArrayExpression & ASTNodeWithParent) => void
  "ArrayExpression:exit"?: (
    node: TSESTree.ArrayExpression & ASTNodeWithParent,
  ) => void
  ArrayPattern?: (node: TSESTree.ArrayPattern & ASTNodeWithParent) => void
  "ArrayPattern:exit"?: (
    node: TSESTree.ArrayPattern & ASTNodeWithParent,
  ) => void
  ArrowFunctionExpression?: (
    node: TSESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  "ArrowFunctionExpression:exit"?: (
    node: TSESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  AssignmentExpression?: (
    node: TSESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  "AssignmentExpression:exit"?: (
    node: TSESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  AssignmentPattern?: (
    node: TSESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  "AssignmentPattern:exit"?: (
    node: TSESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  AwaitExpression?: (node: TSESTree.AwaitExpression & ASTNodeWithParent) => void
  "AwaitExpression:exit"?: (
    node: TSESTree.AwaitExpression & ASTNodeWithParent,
  ) => void
  BinaryExpression?: (
    node: TSESTree.BinaryExpression & ASTNodeWithParent,
  ) => void
  "BinaryExpression:exit"?: (
    node: TSESTree.BinaryExpression & ASTNodeWithParent,
  ) => void
  BlockStatement?: (node: TSESTree.BlockStatement & ASTNodeWithParent) => void
  "BlockStatement:exit"?: (
    node: TSESTree.BlockStatement & ASTNodeWithParent,
  ) => void
  BreakStatement?: (node: TSESTree.BreakStatement & ASTNodeWithParent) => void
  "BreakStatement:exit"?: (
    node: TSESTree.BreakStatement & ASTNodeWithParent,
  ) => void
  CallExpression?: (node: TSESTree.CallExpression & ASTNodeWithParent) => void
  "CallExpression:exit"?: (
    node: TSESTree.CallExpression & ASTNodeWithParent,
  ) => void
  CatchClause?: (node: TSESTree.CatchClause & ASTNodeWithParent) => void
  "CatchClause:exit"?: (node: TSESTree.CatchClause & ASTNodeWithParent) => void
  ChainExpression?: (node: TSESTree.ChainExpression & ASTNodeWithParent) => void
  "ChainExpression:exit"?: (
    node: TSESTree.ChainExpression & ASTNodeWithParent,
  ) => void
  ClassBody?: (node: TSESTree.ClassBody & ASTNodeWithParent) => void
  "ClassBody:exit"?: (node: TSESTree.ClassBody & ASTNodeWithParent) => void
  ClassDeclaration?: (
    node: TSESTree.ClassDeclaration & ASTNodeWithParent,
  ) => void
  "ClassDeclaration:exit"?: (
    node: TSESTree.ClassDeclaration & ASTNodeWithParent,
  ) => void
  ClassExpression?: (node: TSESTree.ClassExpression & ASTNodeWithParent) => void
  "ClassExpression:exit"?: (
    node: TSESTree.ClassExpression & ASTNodeWithParent,
  ) => void
  ConditionalExpression?: (
    node: TSESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  "ConditionalExpression:exit"?: (
    node: TSESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  ContinueStatement?: (
    node: TSESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  "ContinueStatement:exit"?: (
    node: TSESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  DebuggerStatement?: (
    node: TSESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  "DebuggerStatement:exit"?: (
    node: TSESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  Decorator?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  "Decorator:exit"?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  DoWhileStatement?: (
    node: TSESTree.DoWhileStatement & ASTNodeWithParent,
  ) => void
  "DoWhileStatement:exit"?: (
    node: TSESTree.DoWhileStatement & ASTNodeWithParent,
  ) => void
  EmptyStatement?: (node: TSESTree.EmptyStatement & ASTNodeWithParent) => void
  "EmptyStatement:exit"?: (
    node: TSESTree.EmptyStatement & ASTNodeWithParent,
  ) => void
  ExportAllDeclaration?: (
    node: TSESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  "ExportAllDeclaration:exit"?: (
    node: TSESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  ExportDefaultDeclaration?: (
    node: TSESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  "ExportDefaultDeclaration:exit"?: (
    node: TSESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  ExportNamedDeclaration?: (
    node: TSESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  "ExportNamedDeclaration:exit"?: (
    node: TSESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  ExportSpecifier?: (node: TSESTree.ExportSpecifier & ASTNodeWithParent) => void
  "ExportSpecifier:exit"?: (
    node: TSESTree.ExportSpecifier & ASTNodeWithParent,
  ) => void
  ExpressionStatement?: (
    node: TSESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  "ExpressionStatement:exit"?: (
    node: TSESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  ForInStatement?: (node: TSESTree.ForInStatement & ASTNodeWithParent) => void
  "ForInStatement:exit"?: (
    node: TSESTree.ForInStatement & ASTNodeWithParent,
  ) => void
  ForOfStatement?: (node: TSESTree.ForOfStatement & ASTNodeWithParent) => void
  "ForOfStatement:exit"?: (
    node: TSESTree.ForOfStatement & ASTNodeWithParent,
  ) => void
  ForStatement?: (node: TSESTree.ForStatement & ASTNodeWithParent) => void
  "ForStatement:exit"?: (
    node: TSESTree.ForStatement & ASTNodeWithParent,
  ) => void
  FunctionDeclaration?: (
    node: TSESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  "FunctionDeclaration:exit"?: (
    node: TSESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  FunctionExpression?: (
    node: TSESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  "FunctionExpression:exit"?: (
    node: TSESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  Identifier?: (node: TSESTree.Identifier & ASTNodeWithParent) => void
  "Identifier:exit"?: (node: TSESTree.Identifier & ASTNodeWithParent) => void
  IfStatement?: (node: TSESTree.IfStatement & ASTNodeWithParent) => void
  "IfStatement:exit"?: (node: TSESTree.IfStatement & ASTNodeWithParent) => void
  ImportAttribute?: (node: TSESTree.ImportAttribute & ASTNodeWithParent) => void
  "ImportAttribute:exit"?: (
    node: TSESTree.ImportAttribute & ASTNodeWithParent,
  ) => void
  ImportDeclaration?: (
    node: TSESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  "ImportDeclaration:exit"?: (
    node: TSESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  ImportDefaultSpecifier?: (
    node: TSESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  "ImportDefaultSpecifier:exit"?: (
    node: TSESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  ImportExpression?: (
    node: TSESTree.ImportExpression & ASTNodeWithParent,
  ) => void
  "ImportExpression:exit"?: (
    node: TSESTree.ImportExpression & ASTNodeWithParent,
  ) => void
  ImportNamespaceSpecifier?: (
    node: TSESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  "ImportNamespaceSpecifier:exit"?: (
    node: TSESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  ImportSpecifier?: (node: TSESTree.ImportSpecifier & ASTNodeWithParent) => void
  "ImportSpecifier:exit"?: (
    node: TSESTree.ImportSpecifier & ASTNodeWithParent,
  ) => void
  LabeledStatement?: (
    node: TSESTree.LabeledStatement & ASTNodeWithParent,
  ) => void
  "LabeledStatement:exit"?: (
    node: TSESTree.LabeledStatement & ASTNodeWithParent,
  ) => void
  Literal?: (node: TSESTree.Literal & ASTNodeWithParent) => void
  "Literal:exit"?: (node: TSESTree.Literal & ASTNodeWithParent) => void
  LogicalExpression?: (
    node: TSESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  "LogicalExpression:exit"?: (
    node: TSESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  MemberExpression?: (
    node: TSESTree.MemberExpression & ASTNodeWithParent,
  ) => void
  "MemberExpression:exit"?: (
    node: TSESTree.MemberExpression & ASTNodeWithParent,
  ) => void
  MetaProperty?: (node: TSESTree.MetaProperty & ASTNodeWithParent) => void
  "MetaProperty:exit"?: (
    node: TSESTree.MetaProperty & ASTNodeWithParent,
  ) => void
  MethodDefinition?: (
    node: TSESTree.MethodDefinition & ASTNodeWithParent,
  ) => void
  "MethodDefinition:exit"?: (
    node: TSESTree.MethodDefinition & ASTNodeWithParent,
  ) => void
  NewExpression?: (node: TSESTree.NewExpression & ASTNodeWithParent) => void
  "NewExpression:exit"?: (
    node: TSESTree.NewExpression & ASTNodeWithParent,
  ) => void
  ObjectExpression?: (
    node: TSESTree.ObjectExpression & ASTNodeWithParent,
  ) => void
  "ObjectExpression:exit"?: (
    node: TSESTree.ObjectExpression & ASTNodeWithParent,
  ) => void
  ObjectPattern?: (node: TSESTree.ObjectPattern & ASTNodeWithParent) => void
  "ObjectPattern:exit"?: (
    node: TSESTree.ObjectPattern & ASTNodeWithParent,
  ) => void
  PrivateIdentifier?: (
    node: TSESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  "PrivateIdentifier:exit"?: (
    node: TSESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  Property?: (node: TSESTree.Property & ASTNodeWithParent) => void
  "Property:exit"?: (node: TSESTree.Property & ASTNodeWithParent) => void
  PropertyDefinition?: (
    node: TSESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  "PropertyDefinition:exit"?: (
    node: TSESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  RestElement?: (node: TSESTree.RestElement & ASTNodeWithParent) => void
  "RestElement:exit"?: (node: TSESTree.RestElement & ASTNodeWithParent) => void
  ReturnStatement?: (node: TSESTree.ReturnStatement & ASTNodeWithParent) => void
  "ReturnStatement:exit"?: (
    node: TSESTree.ReturnStatement & ASTNodeWithParent,
  ) => void
  SequenceExpression?: (
    node: TSESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  "SequenceExpression:exit"?: (
    node: TSESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  SpreadElement?: (node: TSESTree.SpreadElement & ASTNodeWithParent) => void
  "SpreadElement:exit"?: (
    node: TSESTree.SpreadElement & ASTNodeWithParent,
  ) => void
  StaticBlock?: (node: TSESTree.StaticBlock & ASTNodeWithParent) => void
  "StaticBlock:exit"?: (node: TSESTree.StaticBlock & ASTNodeWithParent) => void
  Super?: (node: TSESTree.Super & ASTNodeWithParent) => void
  "Super:exit"?: (node: TSESTree.Super & ASTNodeWithParent) => void
  SwitchCase?: (node: TSESTree.SwitchCase & ASTNodeWithParent) => void
  "SwitchCase:exit"?: (node: TSESTree.SwitchCase & ASTNodeWithParent) => void
  SwitchStatement?: (node: TSESTree.SwitchStatement & ASTNodeWithParent) => void
  "SwitchStatement:exit"?: (
    node: TSESTree.SwitchStatement & ASTNodeWithParent,
  ) => void
  TaggedTemplateExpression?: (
    node: TSESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  "TaggedTemplateExpression:exit"?: (
    node: TSESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  TemplateElement?: (node: TSESTree.TemplateElement & ASTNodeWithParent) => void
  "TemplateElement:exit"?: (
    node: TSESTree.TemplateElement & ASTNodeWithParent,
  ) => void
  TemplateLiteral?: (node: TSESTree.TemplateLiteral & ASTNodeWithParent) => void
  "TemplateLiteral:exit"?: (
    node: TSESTree.TemplateLiteral & ASTNodeWithParent,
  ) => void
  ThisExpression?: (node: TSESTree.ThisExpression & ASTNodeWithParent) => void
  "ThisExpression:exit"?: (
    node: TSESTree.ThisExpression & ASTNodeWithParent,
  ) => void
  ThrowStatement?: (node: TSESTree.ThrowStatement & ASTNodeWithParent) => void
  "ThrowStatement:exit"?: (
    node: TSESTree.ThrowStatement & ASTNodeWithParent,
  ) => void
  TryStatement?: (node: TSESTree.TryStatement & ASTNodeWithParent) => void
  "TryStatement:exit"?: (
    node: TSESTree.TryStatement & ASTNodeWithParent,
  ) => void
  UnaryExpression?: (node: TSESTree.UnaryExpression & ASTNodeWithParent) => void
  "UnaryExpression:exit"?: (
    node: TSESTree.UnaryExpression & ASTNodeWithParent,
  ) => void
  UpdateExpression?: (
    node: TSESTree.UpdateExpression & ASTNodeWithParent,
  ) => void
  "UpdateExpression:exit"?: (
    node: TSESTree.UpdateExpression & ASTNodeWithParent,
  ) => void
  VariableDeclaration?: (
    node: TSESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  "VariableDeclaration:exit"?: (
    node: TSESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  VariableDeclarator?: (
    node: TSESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  "VariableDeclarator:exit"?: (
    node: TSESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  WhileStatement?: (node: TSESTree.WhileStatement & ASTNodeWithParent) => void
  "WhileStatement:exit"?: (
    node: TSESTree.WhileStatement & ASTNodeWithParent,
  ) => void
  WithStatement?: (node: TSESTree.WithStatement & ASTNodeWithParent) => void
  "WithStatement:exit"?: (
    node: TSESTree.WithStatement & ASTNodeWithParent,
  ) => void
  YieldExpression?: (node: TSESTree.YieldExpression & ASTNodeWithParent) => void
  "YieldExpression:exit"?: (
    node: TSESTree.YieldExpression & ASTNodeWithParent,
  ) => void
  TSAbstractAccessorProperty?: (
    node: TSESTree.TSAbstractAccessorProperty & ASTNodeWithParent,
  ) => void
  "TSAbstractAccessorProperty:exit"?: (
    node: TSESTree.TSAbstractAccessorProperty & ASTNodeWithParent,
  ) => void
  TSAbstractKeyword?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  "TSAbstractKeyword:exit"?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  TSAbstractMethodDefinition?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  "TSAbstractMethodDefinition:exit"?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  TSAbstractPropertyDefinition?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  "TSAbstractPropertyDefinition:exit"?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  TSAnyKeyword?: (node: TSESTree.TSAnyKeyword & ASTNodeWithParent) => void
  "TSAnyKeyword:exit"?: (
    node: TSESTree.TSAnyKeyword & ASTNodeWithParent,
  ) => void
  TSArrayType?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  "TSArrayType:exit"?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  TSAsExpression?: (node: TSESTree.TSAsExpression & ASTNodeWithParent) => void
  "TSAsExpression:exit"?: (
    node: TSESTree.TSAsExpression & ASTNodeWithParent,
  ) => void
  TSAsyncKeyword?: (node: TSESTree.TSAsyncKeyword & ASTNodeWithParent) => void
  "TSAsyncKeyword:exit"?: (
    node: TSESTree.TSAsyncKeyword & ASTNodeWithParent,
  ) => void
  TSBigIntKeyword?: (node: TSESTree.TSBigIntKeyword & ASTNodeWithParent) => void
  "TSBigIntKeyword:exit"?: (
    node: TSESTree.TSBigIntKeyword & ASTNodeWithParent,
  ) => void
  TSBooleanKeyword?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  "TSBooleanKeyword:exit"?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  TSCallSignatureDeclaration?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  "TSCallSignatureDeclaration:exit"?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSClassImplements?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  "TSClassImplements:exit"?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  TSConditionalType?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  "TSConditionalType:exit"?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  TSConstructorType?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  "TSConstructorType:exit"?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  TSConstructSignatureDeclaration?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  "TSConstructSignatureDeclaration:exit"?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSDeclareFunction?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  "TSDeclareFunction:exit"?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  TSDeclareKeyword?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  "TSDeclareKeyword:exit"?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  TSEmptyBodyFunctionExpression?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  "TSEmptyBodyFunctionExpression:exit"?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  TSEnumDeclaration?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  "TSEnumDeclaration:exit"?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  TSEnumMember?: (node: TSESTree.TSEnumMember & ASTNodeWithParent) => void
  "TSEnumMember:exit"?: (
    node: TSESTree.TSEnumMember & ASTNodeWithParent,
  ) => void
  TSExportAssignment?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  "TSExportAssignment:exit"?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  TSExportKeyword?: (node: TSESTree.TSExportKeyword & ASTNodeWithParent) => void
  "TSExportKeyword:exit"?: (
    node: TSESTree.TSExportKeyword & ASTNodeWithParent,
  ) => void
  TSExternalModuleReference?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  "TSExternalModuleReference:exit"?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  TSFunctionType?: (node: TSESTree.TSFunctionType & ASTNodeWithParent) => void
  "TSFunctionType:exit"?: (
    node: TSESTree.TSFunctionType & ASTNodeWithParent,
  ) => void
  TSInstantiationExpression?: (
    node: TSESTree.TSInstantiationExpression & ASTNodeWithParent,
  ) => void
  "TSInstantiationExpression:exit"?: (
    node: TSESTree.TSInstantiationExpression & ASTNodeWithParent,
  ) => void
  TSImportEqualsDeclaration?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  "TSImportEqualsDeclaration:exit"?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  TSImportType?: (node: TSESTree.TSImportType & ASTNodeWithParent) => void
  "TSImportType:exit"?: (
    node: TSESTree.TSImportType & ASTNodeWithParent,
  ) => void
  TSIndexedAccessType?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  "TSIndexedAccessType:exit"?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  TSIndexSignature?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  "TSIndexSignature:exit"?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  TSInferType?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  "TSInferType:exit"?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  TSInterfaceBody?: (node: TSESTree.TSInterfaceBody & ASTNodeWithParent) => void
  "TSInterfaceBody:exit"?: (
    node: TSESTree.TSInterfaceBody & ASTNodeWithParent,
  ) => void
  TSInterfaceDeclaration?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  "TSInterfaceDeclaration:exit"?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  TSInterfaceHeritage?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  "TSInterfaceHeritage:exit"?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  TSIntersectionType?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  "TSIntersectionType:exit"?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  TSIntrinsicKeyword?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  "TSIntrinsicKeyword:exit"?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  TSLiteralType?: (node: TSESTree.TSLiteralType & ASTNodeWithParent) => void
  "TSLiteralType:exit"?: (
    node: TSESTree.TSLiteralType & ASTNodeWithParent,
  ) => void
  TSMappedType?: (node: TSESTree.TSMappedType & ASTNodeWithParent) => void
  "TSMappedType:exit"?: (
    node: TSESTree.TSMappedType & ASTNodeWithParent,
  ) => void
  TSMethodSignature?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  "TSMethodSignature:exit"?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  TSModuleBlock?: (node: TSESTree.TSModuleBlock & ASTNodeWithParent) => void
  "TSModuleBlock:exit"?: (
    node: TSESTree.TSModuleBlock & ASTNodeWithParent,
  ) => void
  TSModuleDeclaration?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  "TSModuleDeclaration:exit"?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  TSNamedTupleMember?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  "TSNamedTupleMember:exit"?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  TSNamespaceExportDeclaration?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  "TSNamespaceExportDeclaration:exit"?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  TSNeverKeyword?: (node: TSESTree.TSNeverKeyword & ASTNodeWithParent) => void
  "TSNeverKeyword:exit"?: (
    node: TSESTree.TSNeverKeyword & ASTNodeWithParent,
  ) => void
  TSNonNullExpression?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  "TSNonNullExpression:exit"?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  TSNullKeyword?: (node: TSESTree.TSNullKeyword & ASTNodeWithParent) => void
  "TSNullKeyword:exit"?: (
    node: TSESTree.TSNullKeyword & ASTNodeWithParent,
  ) => void
  TSNumberKeyword?: (node: TSESTree.TSNumberKeyword & ASTNodeWithParent) => void
  "TSNumberKeyword:exit"?: (
    node: TSESTree.TSNumberKeyword & ASTNodeWithParent,
  ) => void
  TSObjectKeyword?: (node: TSESTree.TSObjectKeyword & ASTNodeWithParent) => void
  "TSObjectKeyword:exit"?: (
    node: TSESTree.TSObjectKeyword & ASTNodeWithParent,
  ) => void
  TSOptionalType?: (node: TSESTree.TSOptionalType & ASTNodeWithParent) => void
  "TSOptionalType:exit"?: (
    node: TSESTree.TSOptionalType & ASTNodeWithParent,
  ) => void
  TSParameterProperty?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  "TSParameterProperty:exit"?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  TSPrivateKeyword?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  "TSPrivateKeyword:exit"?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  TSPropertySignature?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  "TSPropertySignature:exit"?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  TSProtectedKeyword?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  "TSProtectedKeyword:exit"?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  TSPublicKeyword?: (node: TSESTree.TSPublicKeyword & ASTNodeWithParent) => void
  "TSPublicKeyword:exit"?: (
    node: TSESTree.TSPublicKeyword & ASTNodeWithParent,
  ) => void
  TSQualifiedName?: (node: TSESTree.TSQualifiedName & ASTNodeWithParent) => void
  "TSQualifiedName:exit"?: (
    node: TSESTree.TSQualifiedName & ASTNodeWithParent,
  ) => void
  TSReadonlyKeyword?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  "TSReadonlyKeyword:exit"?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  TSRestType?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  "TSRestType:exit"?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  TSSatisfiesExpression?: (
    node: TSESTree.TSSatisfiesExpression & ASTNodeWithParent,
  ) => void
  "TSSatisfiesExpression:exit"?: (
    node: TSESTree.TSSatisfiesExpression & ASTNodeWithParent,
  ) => void
  TSStaticKeyword?: (node: TSESTree.TSStaticKeyword & ASTNodeWithParent) => void
  "TSStaticKeyword:exit"?: (
    node: TSESTree.TSStaticKeyword & ASTNodeWithParent,
  ) => void
  TSStringKeyword?: (node: TSESTree.TSStringKeyword & ASTNodeWithParent) => void
  "TSStringKeyword:exit"?: (
    node: TSESTree.TSStringKeyword & ASTNodeWithParent,
  ) => void
  TSSymbolKeyword?: (node: TSESTree.TSSymbolKeyword & ASTNodeWithParent) => void
  "TSSymbolKeyword:exit"?: (
    node: TSESTree.TSSymbolKeyword & ASTNodeWithParent,
  ) => void
  TSTemplateLiteralType?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  "TSTemplateLiteralType:exit"?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  TSThisType?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  "TSThisType:exit"?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  TSTupleType?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  "TSTupleType:exit"?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  TSTypeAliasDeclaration?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  "TSTypeAliasDeclaration:exit"?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeAnnotation?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  "TSTypeAnnotation:exit"?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  TSTypeAssertion?: (node: TSESTree.TSTypeAssertion & ASTNodeWithParent) => void
  "TSTypeAssertion:exit"?: (
    node: TSESTree.TSTypeAssertion & ASTNodeWithParent,
  ) => void
  TSTypeLiteral?: (node: TSESTree.TSTypeLiteral & ASTNodeWithParent) => void
  "TSTypeLiteral:exit"?: (
    node: TSESTree.TSTypeLiteral & ASTNodeWithParent,
  ) => void
  TSTypeOperator?: (node: TSESTree.TSTypeOperator & ASTNodeWithParent) => void
  "TSTypeOperator:exit"?: (
    node: TSESTree.TSTypeOperator & ASTNodeWithParent,
  ) => void
  TSTypeParameter?: (node: TSESTree.TSTypeParameter & ASTNodeWithParent) => void
  "TSTypeParameter:exit"?: (
    node: TSESTree.TSTypeParameter & ASTNodeWithParent,
  ) => void
  TSTypeParameterDeclaration?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  "TSTypeParameterDeclaration:exit"?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeParameterInstantiation?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  "TSTypeParameterInstantiation:exit"?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  TSTypePredicate?: (node: TSESTree.TSTypePredicate & ASTNodeWithParent) => void
  "TSTypePredicate:exit"?: (
    node: TSESTree.TSTypePredicate & ASTNodeWithParent,
  ) => void
  TSTypeQuery?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  "TSTypeQuery:exit"?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  TSTypeReference?: (node: TSESTree.TSTypeReference & ASTNodeWithParent) => void
  "TSTypeReference:exit"?: (
    node: TSESTree.TSTypeReference & ASTNodeWithParent,
  ) => void
  TSUndefinedKeyword?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  "TSUndefinedKeyword:exit"?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  TSUnionType?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  "TSUnionType:exit"?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  TSUnknownKeyword?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  "TSUnknownKeyword:exit"?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  TSVoidKeyword?: (node: TSESTree.TSVoidKeyword & ASTNodeWithParent) => void
  "TSVoidKeyword:exit"?: (
    node: TSESTree.TSVoidKeyword & ASTNodeWithParent,
  ) => void
  JSXAttribute?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  "JSXAttribute:exit"?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  JSXClosingElement?: (node: AST.JSXClosingElement & ASTNodeWithParent) => void
  "JSXClosingElement:exit"?: (
    node: AST.JSXClosingElement & ASTNodeWithParent,
  ) => void
  JSXClosingFragment?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  "JSXClosingFragment:exit"?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  JSXElement?: (node: AST.JSXElement & ASTNodeWithParent) => void
  "JSXElement:exit"?: (node: AST.JSXElement & ASTNodeWithParent) => void
  JSXEmptyExpression?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  "JSXEmptyExpression:exit"?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  JSXExpressionContainer?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  "JSXExpressionContainer:exit"?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  JSXFragment?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  "JSXFragment:exit"?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  JSXIdentifier?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  "JSXIdentifier:exit"?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  JSXMemberExpression?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  "JSXMemberExpression:exit"?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  JSXNamespacedName?: (node: AST.JSXNamespacedName & ASTNodeWithParent) => void
  "JSXNamespacedName:exit"?: (
    node: AST.JSXNamespacedName & ASTNodeWithParent,
  ) => void
  JSXOpeningElement?: (node: AST.JSXOpeningElement & ASTNodeWithParent) => void
  "JSXOpeningElement:exit"?: (
    node: AST.JSXOpeningElement & ASTNodeWithParent,
  ) => void
  JSXOpeningFragment?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  "JSXOpeningFragment:exit"?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  JSXSpreadAttribute?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  "JSXSpreadAttribute:exit"?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  JSXSpreadChild?: (node: AST.JSXSpreadChild & ASTNodeWithParent) => void
  "JSXSpreadChild:exit"?: (node: AST.JSXSpreadChild & ASTNodeWithParent) => void
  JSXText?: (node: AST.JSXText & ASTNodeWithParent) => void
  "JSXText:exit"?: (node: AST.JSXText & ASTNodeWithParent) => void
  Program?: (node: AST.AstroProgram & ASTNodeWithParent) => void
  "Program:exit"?: (node: AST.AstroProgram & ASTNodeWithParent) => void
  AstroFragment?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  "AstroFragment:exit"?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  AstroHTMLComment?: (node: AST.AstroHTMLComment & ASTNodeWithParent) => void
  "AstroHTMLComment:exit"?: (
    node: AST.AstroHTMLComment & ASTNodeWithParent,
  ) => void
  AstroDoctype?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  "AstroDoctype:exit"?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  AstroShorthandAttribute?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  "AstroShorthandAttribute:exit"?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  AstroTemplateLiteralAttribute?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  "AstroTemplateLiteralAttribute:exit"?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  AstroRawText?: (node: AST.AstroRawText & ASTNodeWithParent) => void
  "AstroRawText:exit"?: (node: AST.AstroRawText & ASTNodeWithParent) => void
}
export type ESNodeListener = {
  ArrayExpression?: (node: ESTree.ArrayExpression & ASTNodeWithParent) => void
  "ArrayExpression:exit"?: (
    node: ESTree.ArrayExpression & ASTNodeWithParent,
  ) => void
  ArrayPattern?: (node: ESTree.ArrayPattern & ASTNodeWithParent) => void
  "ArrayPattern:exit"?: (node: ESTree.ArrayPattern & ASTNodeWithParent) => void
  ArrowFunctionExpression?: (
    node: ESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  "ArrowFunctionExpression:exit"?: (
    node: ESTree.ArrowFunctionExpression & ASTNodeWithParent,
  ) => void
  AssignmentExpression?: (
    node: ESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  "AssignmentExpression:exit"?: (
    node: ESTree.AssignmentExpression & ASTNodeWithParent,
  ) => void
  AssignmentPattern?: (
    node: ESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  "AssignmentPattern:exit"?: (
    node: ESTree.AssignmentPattern & ASTNodeWithParent,
  ) => void
  AwaitExpression?: (node: ESTree.AwaitExpression & ASTNodeWithParent) => void
  "AwaitExpression:exit"?: (
    node: ESTree.AwaitExpression & ASTNodeWithParent,
  ) => void
  BinaryExpression?: (node: ESTree.BinaryExpression & ASTNodeWithParent) => void
  "BinaryExpression:exit"?: (
    node: ESTree.BinaryExpression & ASTNodeWithParent,
  ) => void
  BlockStatement?: (node: ESTree.BlockStatement & ASTNodeWithParent) => void
  "BlockStatement:exit"?: (
    node: ESTree.BlockStatement & ASTNodeWithParent,
  ) => void
  BreakStatement?: (node: ESTree.BreakStatement & ASTNodeWithParent) => void
  "BreakStatement:exit"?: (
    node: ESTree.BreakStatement & ASTNodeWithParent,
  ) => void
  CallExpression?: (node: ESTree.CallExpression & ASTNodeWithParent) => void
  "CallExpression:exit"?: (
    node: ESTree.CallExpression & ASTNodeWithParent,
  ) => void
  CatchClause?: (node: ESTree.CatchClause & ASTNodeWithParent) => void
  "CatchClause:exit"?: (node: ESTree.CatchClause & ASTNodeWithParent) => void
  ChainExpression?: (node: ESTree.ChainExpression & ASTNodeWithParent) => void
  "ChainExpression:exit"?: (
    node: ESTree.ChainExpression & ASTNodeWithParent,
  ) => void
  ClassBody?: (node: ESTree.ClassBody & ASTNodeWithParent) => void
  "ClassBody:exit"?: (node: ESTree.ClassBody & ASTNodeWithParent) => void
  ClassDeclaration?: (node: ESTree.ClassDeclaration & ASTNodeWithParent) => void
  "ClassDeclaration:exit"?: (
    node: ESTree.ClassDeclaration & ASTNodeWithParent,
  ) => void
  ClassExpression?: (node: ESTree.ClassExpression & ASTNodeWithParent) => void
  "ClassExpression:exit"?: (
    node: ESTree.ClassExpression & ASTNodeWithParent,
  ) => void
  ConditionalExpression?: (
    node: ESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  "ConditionalExpression:exit"?: (
    node: ESTree.ConditionalExpression & ASTNodeWithParent,
  ) => void
  ContinueStatement?: (
    node: ESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  "ContinueStatement:exit"?: (
    node: ESTree.ContinueStatement & ASTNodeWithParent,
  ) => void
  DebuggerStatement?: (
    node: ESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  "DebuggerStatement:exit"?: (
    node: ESTree.DebuggerStatement & ASTNodeWithParent,
  ) => void
  DoWhileStatement?: (node: ESTree.DoWhileStatement & ASTNodeWithParent) => void
  "DoWhileStatement:exit"?: (
    node: ESTree.DoWhileStatement & ASTNodeWithParent,
  ) => void
  EmptyStatement?: (node: ESTree.EmptyStatement & ASTNodeWithParent) => void
  "EmptyStatement:exit"?: (
    node: ESTree.EmptyStatement & ASTNodeWithParent,
  ) => void
  ExportAllDeclaration?: (
    node: ESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  "ExportAllDeclaration:exit"?: (
    node: ESTree.ExportAllDeclaration & ASTNodeWithParent,
  ) => void
  ExportDefaultDeclaration?: (
    node: ESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  "ExportDefaultDeclaration:exit"?: (
    node: ESTree.ExportDefaultDeclaration & ASTNodeWithParent,
  ) => void
  ExportNamedDeclaration?: (
    node: ESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  "ExportNamedDeclaration:exit"?: (
    node: ESTree.ExportNamedDeclaration & ASTNodeWithParent,
  ) => void
  ExportSpecifier?: (node: ESTree.ExportSpecifier & ASTNodeWithParent) => void
  "ExportSpecifier:exit"?: (
    node: ESTree.ExportSpecifier & ASTNodeWithParent,
  ) => void
  ExpressionStatement?: (
    node: ESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  "ExpressionStatement:exit"?: (
    node: ESTree.ExpressionStatement & ASTNodeWithParent,
  ) => void
  ForInStatement?: (node: ESTree.ForInStatement & ASTNodeWithParent) => void
  "ForInStatement:exit"?: (
    node: ESTree.ForInStatement & ASTNodeWithParent,
  ) => void
  ForOfStatement?: (node: ESTree.ForOfStatement & ASTNodeWithParent) => void
  "ForOfStatement:exit"?: (
    node: ESTree.ForOfStatement & ASTNodeWithParent,
  ) => void
  ForStatement?: (node: ESTree.ForStatement & ASTNodeWithParent) => void
  "ForStatement:exit"?: (node: ESTree.ForStatement & ASTNodeWithParent) => void
  FunctionDeclaration?: (
    node: ESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  "FunctionDeclaration:exit"?: (
    node: ESTree.FunctionDeclaration & ASTNodeWithParent,
  ) => void
  FunctionExpression?: (
    node: ESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  "FunctionExpression:exit"?: (
    node: ESTree.FunctionExpression & ASTNodeWithParent,
  ) => void
  Identifier?: (node: ESTree.Identifier & ASTNodeWithParent) => void
  "Identifier:exit"?: (node: ESTree.Identifier & ASTNodeWithParent) => void
  IfStatement?: (node: ESTree.IfStatement & ASTNodeWithParent) => void
  "IfStatement:exit"?: (node: ESTree.IfStatement & ASTNodeWithParent) => void
  ImportDeclaration?: (
    node: ESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  "ImportDeclaration:exit"?: (
    node: ESTree.ImportDeclaration & ASTNodeWithParent,
  ) => void
  ImportDefaultSpecifier?: (
    node: ESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  "ImportDefaultSpecifier:exit"?: (
    node: ESTree.ImportDefaultSpecifier & ASTNodeWithParent,
  ) => void
  ImportExpression?: (node: ESTree.ImportExpression & ASTNodeWithParent) => void
  "ImportExpression:exit"?: (
    node: ESTree.ImportExpression & ASTNodeWithParent,
  ) => void
  ImportNamespaceSpecifier?: (
    node: ESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  "ImportNamespaceSpecifier:exit"?: (
    node: ESTree.ImportNamespaceSpecifier & ASTNodeWithParent,
  ) => void
  ImportSpecifier?: (node: ESTree.ImportSpecifier & ASTNodeWithParent) => void
  "ImportSpecifier:exit"?: (
    node: ESTree.ImportSpecifier & ASTNodeWithParent,
  ) => void
  LabeledStatement?: (node: ESTree.LabeledStatement & ASTNodeWithParent) => void
  "LabeledStatement:exit"?: (
    node: ESTree.LabeledStatement & ASTNodeWithParent,
  ) => void
  Literal?: (node: ESTree.Literal & ASTNodeWithParent) => void
  "Literal:exit"?: (node: ESTree.Literal & ASTNodeWithParent) => void
  LogicalExpression?: (
    node: ESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  "LogicalExpression:exit"?: (
    node: ESTree.LogicalExpression & ASTNodeWithParent,
  ) => void
  MemberExpression?: (node: ESTree.MemberExpression & ASTNodeWithParent) => void
  "MemberExpression:exit"?: (
    node: ESTree.MemberExpression & ASTNodeWithParent,
  ) => void
  MetaProperty?: (node: ESTree.MetaProperty & ASTNodeWithParent) => void
  "MetaProperty:exit"?: (node: ESTree.MetaProperty & ASTNodeWithParent) => void
  MethodDefinition?: (node: ESTree.MethodDefinition & ASTNodeWithParent) => void
  "MethodDefinition:exit"?: (
    node: ESTree.MethodDefinition & ASTNodeWithParent,
  ) => void
  NewExpression?: (node: ESTree.NewExpression & ASTNodeWithParent) => void
  "NewExpression:exit"?: (
    node: ESTree.NewExpression & ASTNodeWithParent,
  ) => void
  ObjectExpression?: (node: ESTree.ObjectExpression & ASTNodeWithParent) => void
  "ObjectExpression:exit"?: (
    node: ESTree.ObjectExpression & ASTNodeWithParent,
  ) => void
  ObjectPattern?: (node: ESTree.ObjectPattern & ASTNodeWithParent) => void
  "ObjectPattern:exit"?: (
    node: ESTree.ObjectPattern & ASTNodeWithParent,
  ) => void
  PrivateIdentifier?: (
    node: ESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  "PrivateIdentifier:exit"?: (
    node: ESTree.PrivateIdentifier & ASTNodeWithParent,
  ) => void
  Property?: (node: ESTree.Property & ASTNodeWithParent) => void
  "Property:exit"?: (node: ESTree.Property & ASTNodeWithParent) => void
  PropertyDefinition?: (
    node: ESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  "PropertyDefinition:exit"?: (
    node: ESTree.PropertyDefinition & ASTNodeWithParent,
  ) => void
  RestElement?: (node: ESTree.RestElement & ASTNodeWithParent) => void
  "RestElement:exit"?: (node: ESTree.RestElement & ASTNodeWithParent) => void
  ReturnStatement?: (node: ESTree.ReturnStatement & ASTNodeWithParent) => void
  "ReturnStatement:exit"?: (
    node: ESTree.ReturnStatement & ASTNodeWithParent,
  ) => void
  SequenceExpression?: (
    node: ESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  "SequenceExpression:exit"?: (
    node: ESTree.SequenceExpression & ASTNodeWithParent,
  ) => void
  SpreadElement?: (node: ESTree.SpreadElement & ASTNodeWithParent) => void
  "SpreadElement:exit"?: (
    node: ESTree.SpreadElement & ASTNodeWithParent,
  ) => void
  StaticBlock?: (node: ESTree.StaticBlock & ASTNodeWithParent) => void
  "StaticBlock:exit"?: (node: ESTree.StaticBlock & ASTNodeWithParent) => void
  Super?: (node: ESTree.Super & ASTNodeWithParent) => void
  "Super:exit"?: (node: ESTree.Super & ASTNodeWithParent) => void
  SwitchCase?: (node: ESTree.SwitchCase & ASTNodeWithParent) => void
  "SwitchCase:exit"?: (node: ESTree.SwitchCase & ASTNodeWithParent) => void
  SwitchStatement?: (node: ESTree.SwitchStatement & ASTNodeWithParent) => void
  "SwitchStatement:exit"?: (
    node: ESTree.SwitchStatement & ASTNodeWithParent,
  ) => void
  TaggedTemplateExpression?: (
    node: ESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  "TaggedTemplateExpression:exit"?: (
    node: ESTree.TaggedTemplateExpression & ASTNodeWithParent,
  ) => void
  TemplateElement?: (node: ESTree.TemplateElement & ASTNodeWithParent) => void
  "TemplateElement:exit"?: (
    node: ESTree.TemplateElement & ASTNodeWithParent,
  ) => void
  TemplateLiteral?: (node: ESTree.TemplateLiteral & ASTNodeWithParent) => void
  "TemplateLiteral:exit"?: (
    node: ESTree.TemplateLiteral & ASTNodeWithParent,
  ) => void
  ThisExpression?: (node: ESTree.ThisExpression & ASTNodeWithParent) => void
  "ThisExpression:exit"?: (
    node: ESTree.ThisExpression & ASTNodeWithParent,
  ) => void
  ThrowStatement?: (node: ESTree.ThrowStatement & ASTNodeWithParent) => void
  "ThrowStatement:exit"?: (
    node: ESTree.ThrowStatement & ASTNodeWithParent,
  ) => void
  TryStatement?: (node: ESTree.TryStatement & ASTNodeWithParent) => void
  "TryStatement:exit"?: (node: ESTree.TryStatement & ASTNodeWithParent) => void
  UnaryExpression?: (node: ESTree.UnaryExpression & ASTNodeWithParent) => void
  "UnaryExpression:exit"?: (
    node: ESTree.UnaryExpression & ASTNodeWithParent,
  ) => void
  UpdateExpression?: (node: ESTree.UpdateExpression & ASTNodeWithParent) => void
  "UpdateExpression:exit"?: (
    node: ESTree.UpdateExpression & ASTNodeWithParent,
  ) => void
  VariableDeclaration?: (
    node: ESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  "VariableDeclaration:exit"?: (
    node: ESTree.VariableDeclaration & ASTNodeWithParent,
  ) => void
  VariableDeclarator?: (
    node: ESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  "VariableDeclarator:exit"?: (
    node: ESTree.VariableDeclarator & ASTNodeWithParent,
  ) => void
  WhileStatement?: (node: ESTree.WhileStatement & ASTNodeWithParent) => void
  "WhileStatement:exit"?: (
    node: ESTree.WhileStatement & ASTNodeWithParent,
  ) => void
  WithStatement?: (node: ESTree.WithStatement & ASTNodeWithParent) => void
  "WithStatement:exit"?: (
    node: ESTree.WithStatement & ASTNodeWithParent,
  ) => void
  YieldExpression?: (node: ESTree.YieldExpression & ASTNodeWithParent) => void
  "YieldExpression:exit"?: (
    node: ESTree.YieldExpression & ASTNodeWithParent,
  ) => void
  Program?: (node: AST.AstroProgram & ASTNodeWithParent) => void
  "Program:exit"?: (node: AST.AstroProgram & ASTNodeWithParent) => void
}
export type TSNodeListener = {
  AccessorProperty?: (
    node: TSESTree.AccessorProperty & ASTNodeWithParent,
  ) => void
  "AccessorProperty:exit"?: (
    node: TSESTree.AccessorProperty & ASTNodeWithParent,
  ) => void
  Decorator?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  "Decorator:exit"?: (node: TSESTree.Decorator & ASTNodeWithParent) => void
  ImportAttribute?: (node: TSESTree.ImportAttribute & ASTNodeWithParent) => void
  "ImportAttribute:exit"?: (
    node: TSESTree.ImportAttribute & ASTNodeWithParent,
  ) => void
  TSAbstractAccessorProperty?: (
    node: TSESTree.TSAbstractAccessorProperty & ASTNodeWithParent,
  ) => void
  "TSAbstractAccessorProperty:exit"?: (
    node: TSESTree.TSAbstractAccessorProperty & ASTNodeWithParent,
  ) => void
  TSAbstractKeyword?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  "TSAbstractKeyword:exit"?: (
    node: TSESTree.TSAbstractKeyword & ASTNodeWithParent,
  ) => void
  TSAbstractMethodDefinition?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  "TSAbstractMethodDefinition:exit"?: (
    node: TSESTree.TSAbstractMethodDefinition & ASTNodeWithParent,
  ) => void
  TSAbstractPropertyDefinition?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  "TSAbstractPropertyDefinition:exit"?: (
    node: TSESTree.TSAbstractPropertyDefinition & ASTNodeWithParent,
  ) => void
  TSAnyKeyword?: (node: TSESTree.TSAnyKeyword & ASTNodeWithParent) => void
  "TSAnyKeyword:exit"?: (
    node: TSESTree.TSAnyKeyword & ASTNodeWithParent,
  ) => void
  TSArrayType?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  "TSArrayType:exit"?: (node: TSESTree.TSArrayType & ASTNodeWithParent) => void
  TSAsExpression?: (node: TSESTree.TSAsExpression & ASTNodeWithParent) => void
  "TSAsExpression:exit"?: (
    node: TSESTree.TSAsExpression & ASTNodeWithParent,
  ) => void
  TSAsyncKeyword?: (node: TSESTree.TSAsyncKeyword & ASTNodeWithParent) => void
  "TSAsyncKeyword:exit"?: (
    node: TSESTree.TSAsyncKeyword & ASTNodeWithParent,
  ) => void
  TSBigIntKeyword?: (node: TSESTree.TSBigIntKeyword & ASTNodeWithParent) => void
  "TSBigIntKeyword:exit"?: (
    node: TSESTree.TSBigIntKeyword & ASTNodeWithParent,
  ) => void
  TSBooleanKeyword?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  "TSBooleanKeyword:exit"?: (
    node: TSESTree.TSBooleanKeyword & ASTNodeWithParent,
  ) => void
  TSCallSignatureDeclaration?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  "TSCallSignatureDeclaration:exit"?: (
    node: TSESTree.TSCallSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSClassImplements?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  "TSClassImplements:exit"?: (
    node: TSESTree.TSClassImplements & ASTNodeWithParent,
  ) => void
  TSConditionalType?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  "TSConditionalType:exit"?: (
    node: TSESTree.TSConditionalType & ASTNodeWithParent,
  ) => void
  TSConstructorType?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  "TSConstructorType:exit"?: (
    node: TSESTree.TSConstructorType & ASTNodeWithParent,
  ) => void
  TSConstructSignatureDeclaration?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  "TSConstructSignatureDeclaration:exit"?: (
    node: TSESTree.TSConstructSignatureDeclaration & ASTNodeWithParent,
  ) => void
  TSDeclareFunction?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  "TSDeclareFunction:exit"?: (
    node: TSESTree.TSDeclareFunction & ASTNodeWithParent,
  ) => void
  TSDeclareKeyword?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  "TSDeclareKeyword:exit"?: (
    node: TSESTree.TSDeclareKeyword & ASTNodeWithParent,
  ) => void
  TSEmptyBodyFunctionExpression?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  "TSEmptyBodyFunctionExpression:exit"?: (
    node: TSESTree.TSEmptyBodyFunctionExpression & ASTNodeWithParent,
  ) => void
  TSEnumDeclaration?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  "TSEnumDeclaration:exit"?: (
    node: TSESTree.TSEnumDeclaration & ASTNodeWithParent,
  ) => void
  TSEnumMember?: (node: TSESTree.TSEnumMember & ASTNodeWithParent) => void
  "TSEnumMember:exit"?: (
    node: TSESTree.TSEnumMember & ASTNodeWithParent,
  ) => void
  TSExportAssignment?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  "TSExportAssignment:exit"?: (
    node: TSESTree.TSExportAssignment & ASTNodeWithParent,
  ) => void
  TSExportKeyword?: (node: TSESTree.TSExportKeyword & ASTNodeWithParent) => void
  "TSExportKeyword:exit"?: (
    node: TSESTree.TSExportKeyword & ASTNodeWithParent,
  ) => void
  TSExternalModuleReference?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  "TSExternalModuleReference:exit"?: (
    node: TSESTree.TSExternalModuleReference & ASTNodeWithParent,
  ) => void
  TSFunctionType?: (node: TSESTree.TSFunctionType & ASTNodeWithParent) => void
  "TSFunctionType:exit"?: (
    node: TSESTree.TSFunctionType & ASTNodeWithParent,
  ) => void
  TSInstantiationExpression?: (
    node: TSESTree.TSInstantiationExpression & ASTNodeWithParent,
  ) => void
  "TSInstantiationExpression:exit"?: (
    node: TSESTree.TSInstantiationExpression & ASTNodeWithParent,
  ) => void
  TSImportEqualsDeclaration?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  "TSImportEqualsDeclaration:exit"?: (
    node: TSESTree.TSImportEqualsDeclaration & ASTNodeWithParent,
  ) => void
  TSImportType?: (node: TSESTree.TSImportType & ASTNodeWithParent) => void
  "TSImportType:exit"?: (
    node: TSESTree.TSImportType & ASTNodeWithParent,
  ) => void
  TSIndexedAccessType?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  "TSIndexedAccessType:exit"?: (
    node: TSESTree.TSIndexedAccessType & ASTNodeWithParent,
  ) => void
  TSIndexSignature?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  "TSIndexSignature:exit"?: (
    node: TSESTree.TSIndexSignature & ASTNodeWithParent,
  ) => void
  TSInferType?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  "TSInferType:exit"?: (node: TSESTree.TSInferType & ASTNodeWithParent) => void
  TSInterfaceBody?: (node: TSESTree.TSInterfaceBody & ASTNodeWithParent) => void
  "TSInterfaceBody:exit"?: (
    node: TSESTree.TSInterfaceBody & ASTNodeWithParent,
  ) => void
  TSInterfaceDeclaration?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  "TSInterfaceDeclaration:exit"?: (
    node: TSESTree.TSInterfaceDeclaration & ASTNodeWithParent,
  ) => void
  TSInterfaceHeritage?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  "TSInterfaceHeritage:exit"?: (
    node: TSESTree.TSInterfaceHeritage & ASTNodeWithParent,
  ) => void
  TSIntersectionType?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  "TSIntersectionType:exit"?: (
    node: TSESTree.TSIntersectionType & ASTNodeWithParent,
  ) => void
  TSIntrinsicKeyword?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  "TSIntrinsicKeyword:exit"?: (
    node: TSESTree.Node & {
      type: AST_NODE_TYPES.TSIntrinsicKeyword
    } & ASTNodeWithParent,
  ) => void
  TSLiteralType?: (node: TSESTree.TSLiteralType & ASTNodeWithParent) => void
  "TSLiteralType:exit"?: (
    node: TSESTree.TSLiteralType & ASTNodeWithParent,
  ) => void
  TSMappedType?: (node: TSESTree.TSMappedType & ASTNodeWithParent) => void
  "TSMappedType:exit"?: (
    node: TSESTree.TSMappedType & ASTNodeWithParent,
  ) => void
  TSMethodSignature?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  "TSMethodSignature:exit"?: (
    node: TSESTree.TSMethodSignature & ASTNodeWithParent,
  ) => void
  TSModuleBlock?: (node: TSESTree.TSModuleBlock & ASTNodeWithParent) => void
  "TSModuleBlock:exit"?: (
    node: TSESTree.TSModuleBlock & ASTNodeWithParent,
  ) => void
  TSModuleDeclaration?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  "TSModuleDeclaration:exit"?: (
    node: TSESTree.TSModuleDeclaration & ASTNodeWithParent,
  ) => void
  TSNamedTupleMember?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  "TSNamedTupleMember:exit"?: (
    node: TSESTree.TSNamedTupleMember & ASTNodeWithParent,
  ) => void
  TSNamespaceExportDeclaration?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  "TSNamespaceExportDeclaration:exit"?: (
    node: TSESTree.TSNamespaceExportDeclaration & ASTNodeWithParent,
  ) => void
  TSNeverKeyword?: (node: TSESTree.TSNeverKeyword & ASTNodeWithParent) => void
  "TSNeverKeyword:exit"?: (
    node: TSESTree.TSNeverKeyword & ASTNodeWithParent,
  ) => void
  TSNonNullExpression?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  "TSNonNullExpression:exit"?: (
    node: TSESTree.TSNonNullExpression & ASTNodeWithParent,
  ) => void
  TSNullKeyword?: (node: TSESTree.TSNullKeyword & ASTNodeWithParent) => void
  "TSNullKeyword:exit"?: (
    node: TSESTree.TSNullKeyword & ASTNodeWithParent,
  ) => void
  TSNumberKeyword?: (node: TSESTree.TSNumberKeyword & ASTNodeWithParent) => void
  "TSNumberKeyword:exit"?: (
    node: TSESTree.TSNumberKeyword & ASTNodeWithParent,
  ) => void
  TSObjectKeyword?: (node: TSESTree.TSObjectKeyword & ASTNodeWithParent) => void
  "TSObjectKeyword:exit"?: (
    node: TSESTree.TSObjectKeyword & ASTNodeWithParent,
  ) => void
  TSOptionalType?: (node: TSESTree.TSOptionalType & ASTNodeWithParent) => void
  "TSOptionalType:exit"?: (
    node: TSESTree.TSOptionalType & ASTNodeWithParent,
  ) => void
  TSParameterProperty?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  "TSParameterProperty:exit"?: (
    node: TSESTree.TSParameterProperty & ASTNodeWithParent,
  ) => void
  TSPrivateKeyword?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  "TSPrivateKeyword:exit"?: (
    node: TSESTree.TSPrivateKeyword & ASTNodeWithParent,
  ) => void
  TSPropertySignature?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  "TSPropertySignature:exit"?: (
    node: TSESTree.TSPropertySignature & ASTNodeWithParent,
  ) => void
  TSProtectedKeyword?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  "TSProtectedKeyword:exit"?: (
    node: TSESTree.TSProtectedKeyword & ASTNodeWithParent,
  ) => void
  TSPublicKeyword?: (node: TSESTree.TSPublicKeyword & ASTNodeWithParent) => void
  "TSPublicKeyword:exit"?: (
    node: TSESTree.TSPublicKeyword & ASTNodeWithParent,
  ) => void
  TSQualifiedName?: (node: TSESTree.TSQualifiedName & ASTNodeWithParent) => void
  "TSQualifiedName:exit"?: (
    node: TSESTree.TSQualifiedName & ASTNodeWithParent,
  ) => void
  TSReadonlyKeyword?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  "TSReadonlyKeyword:exit"?: (
    node: TSESTree.TSReadonlyKeyword & ASTNodeWithParent,
  ) => void
  TSRestType?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  "TSRestType:exit"?: (node: TSESTree.TSRestType & ASTNodeWithParent) => void
  TSSatisfiesExpression?: (
    node: TSESTree.TSSatisfiesExpression & ASTNodeWithParent,
  ) => void
  "TSSatisfiesExpression:exit"?: (
    node: TSESTree.TSSatisfiesExpression & ASTNodeWithParent,
  ) => void
  TSStaticKeyword?: (node: TSESTree.TSStaticKeyword & ASTNodeWithParent) => void
  "TSStaticKeyword:exit"?: (
    node: TSESTree.TSStaticKeyword & ASTNodeWithParent,
  ) => void
  TSStringKeyword?: (node: TSESTree.TSStringKeyword & ASTNodeWithParent) => void
  "TSStringKeyword:exit"?: (
    node: TSESTree.TSStringKeyword & ASTNodeWithParent,
  ) => void
  TSSymbolKeyword?: (node: TSESTree.TSSymbolKeyword & ASTNodeWithParent) => void
  "TSSymbolKeyword:exit"?: (
    node: TSESTree.TSSymbolKeyword & ASTNodeWithParent,
  ) => void
  TSTemplateLiteralType?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  "TSTemplateLiteralType:exit"?: (
    node: TSESTree.TSTemplateLiteralType & ASTNodeWithParent,
  ) => void
  TSThisType?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  "TSThisType:exit"?: (node: TSESTree.TSThisType & ASTNodeWithParent) => void
  TSTupleType?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  "TSTupleType:exit"?: (node: TSESTree.TSTupleType & ASTNodeWithParent) => void
  TSTypeAliasDeclaration?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  "TSTypeAliasDeclaration:exit"?: (
    node: TSESTree.TSTypeAliasDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeAnnotation?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  "TSTypeAnnotation:exit"?: (
    node: TSESTree.TSTypeAnnotation & ASTNodeWithParent,
  ) => void
  TSTypeAssertion?: (node: TSESTree.TSTypeAssertion & ASTNodeWithParent) => void
  "TSTypeAssertion:exit"?: (
    node: TSESTree.TSTypeAssertion & ASTNodeWithParent,
  ) => void
  TSTypeLiteral?: (node: TSESTree.TSTypeLiteral & ASTNodeWithParent) => void
  "TSTypeLiteral:exit"?: (
    node: TSESTree.TSTypeLiteral & ASTNodeWithParent,
  ) => void
  TSTypeOperator?: (node: TSESTree.TSTypeOperator & ASTNodeWithParent) => void
  "TSTypeOperator:exit"?: (
    node: TSESTree.TSTypeOperator & ASTNodeWithParent,
  ) => void
  TSTypeParameter?: (node: TSESTree.TSTypeParameter & ASTNodeWithParent) => void
  "TSTypeParameter:exit"?: (
    node: TSESTree.TSTypeParameter & ASTNodeWithParent,
  ) => void
  TSTypeParameterDeclaration?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  "TSTypeParameterDeclaration:exit"?: (
    node: TSESTree.TSTypeParameterDeclaration & ASTNodeWithParent,
  ) => void
  TSTypeParameterInstantiation?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  "TSTypeParameterInstantiation:exit"?: (
    node: TSESTree.TSTypeParameterInstantiation & ASTNodeWithParent,
  ) => void
  TSTypePredicate?: (node: TSESTree.TSTypePredicate & ASTNodeWithParent) => void
  "TSTypePredicate:exit"?: (
    node: TSESTree.TSTypePredicate & ASTNodeWithParent,
  ) => void
  TSTypeQuery?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  "TSTypeQuery:exit"?: (node: TSESTree.TSTypeQuery & ASTNodeWithParent) => void
  TSTypeReference?: (node: TSESTree.TSTypeReference & ASTNodeWithParent) => void
  "TSTypeReference:exit"?: (
    node: TSESTree.TSTypeReference & ASTNodeWithParent,
  ) => void
  TSUndefinedKeyword?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  "TSUndefinedKeyword:exit"?: (
    node: TSESTree.TSUndefinedKeyword & ASTNodeWithParent,
  ) => void
  TSUnionType?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  "TSUnionType:exit"?: (node: TSESTree.TSUnionType & ASTNodeWithParent) => void
  TSUnknownKeyword?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  "TSUnknownKeyword:exit"?: (
    node: TSESTree.TSUnknownKeyword & ASTNodeWithParent,
  ) => void
  TSVoidKeyword?: (node: TSESTree.TSVoidKeyword & ASTNodeWithParent) => void
  "TSVoidKeyword:exit"?: (
    node: TSESTree.TSVoidKeyword & ASTNodeWithParent,
  ) => void
}
export type AstroNodeListener = {
  JSXAttribute?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  "JSXAttribute:exit"?: (node: AST.JSXAttribute & ASTNodeWithParent) => void
  JSXClosingElement?: (node: AST.JSXClosingElement & ASTNodeWithParent) => void
  "JSXClosingElement:exit"?: (
    node: AST.JSXClosingElement & ASTNodeWithParent,
  ) => void
  JSXClosingFragment?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  "JSXClosingFragment:exit"?: (
    node: AST.JSXClosingFragment & ASTNodeWithParent,
  ) => void
  JSXElement?: (node: AST.JSXElement & ASTNodeWithParent) => void
  "JSXElement:exit"?: (node: AST.JSXElement & ASTNodeWithParent) => void
  JSXEmptyExpression?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  "JSXEmptyExpression:exit"?: (
    node: AST.JSXEmptyExpression & ASTNodeWithParent,
  ) => void
  JSXExpressionContainer?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  "JSXExpressionContainer:exit"?: (
    node: AST.JSXExpressionContainer & ASTNodeWithParent,
  ) => void
  JSXFragment?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  "JSXFragment:exit"?: (node: AST.JSXFragment & ASTNodeWithParent) => void
  JSXIdentifier?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  "JSXIdentifier:exit"?: (node: AST.JSXIdentifier & ASTNodeWithParent) => void
  JSXMemberExpression?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  "JSXMemberExpression:exit"?: (
    node: AST.JSXMemberExpression & ASTNodeWithParent,
  ) => void
  JSXNamespacedName?: (node: AST.JSXNamespacedName & ASTNodeWithParent) => void
  "JSXNamespacedName:exit"?: (
    node: AST.JSXNamespacedName & ASTNodeWithParent,
  ) => void
  JSXOpeningElement?: (node: AST.JSXOpeningElement & ASTNodeWithParent) => void
  "JSXOpeningElement:exit"?: (
    node: AST.JSXOpeningElement & ASTNodeWithParent,
  ) => void
  JSXOpeningFragment?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  "JSXOpeningFragment:exit"?: (
    node: AST.JSXOpeningFragment & ASTNodeWithParent,
  ) => void
  JSXSpreadAttribute?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  "JSXSpreadAttribute:exit"?: (
    node: AST.JSXSpreadAttribute & ASTNodeWithParent,
  ) => void
  JSXSpreadChild?: (node: AST.JSXSpreadChild & ASTNodeWithParent) => void
  "JSXSpreadChild:exit"?: (node: AST.JSXSpreadChild & ASTNodeWithParent) => void
  JSXText?: (node: AST.JSXText & ASTNodeWithParent) => void
  "JSXText:exit"?: (node: AST.JSXText & ASTNodeWithParent) => void
  AstroFragment?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  "AstroFragment:exit"?: (node: AST.AstroFragment & ASTNodeWithParent) => void
  AstroHTMLComment?: (node: AST.AstroHTMLComment & ASTNodeWithParent) => void
  "AstroHTMLComment:exit"?: (
    node: AST.AstroHTMLComment & ASTNodeWithParent,
  ) => void
  AstroDoctype?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  "AstroDoctype:exit"?: (node: AST.AstroDoctype & ASTNodeWithParent) => void
  AstroShorthandAttribute?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  "AstroShorthandAttribute:exit"?: (
    node: AST.AstroShorthandAttribute & ASTNodeWithParent,
  ) => void
  AstroTemplateLiteralAttribute?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  "AstroTemplateLiteralAttribute:exit"?: (
    node: AST.AstroTemplateLiteralAttribute & ASTNodeWithParent,
  ) => void
  AstroRawText?: (node: AST.AstroRawText & ASTNodeWithParent) => void
  "AstroRawText:exit"?: (node: AST.AstroRawText & ASTNodeWithParent) => void
}
