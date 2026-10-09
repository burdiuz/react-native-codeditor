async function moduleInitFunction(requireAsyncModule,exports={}){function requireCodemirrorLangEmbedCss(){// Matches the bare `css` tag as well as any styled-components-shaped tag:
// `styled.View`/`styled.Text`/... (MemberExpression) and `styled(Component)`
// (CallExpression, which readIdentifierPath collapses to the callee's own
// path, so it also resolves to a `['styled', ...]` path).
function matchCssTag(tagPath){return"css"===tagPath[0]||"styled"===tagPath[0]}// css`...`/styled`...` content is a bare declaration list (`color: #fff;
// padding: 12px;`), not a full stylesheet with a `selector { ... }` wrapper.
// Parsed with cssLanguage's default "StyleSheet" top rule, the parser treats
// that content as sitting *before* any rule block, so cssCompletionSource
// (which only offers property names when the cursor's ancestor is "Block" or
// "Styles" — see @codemirror/lang-css's completion.js) falls back to
// selector/tag-name completion instead (hence "main"/"small"/"summary").
// @codemirror/lang-html hits this exact same shape for `style="..."`
// attribute values and fixes it by reparsing with the grammar's alternate
// "Styles" top rule (see its dist: `cssLanguage.parser.configure({top:
// "Styles"})`) — same grammar, same NodeSet, so the languageDataProp
// (autocomplete source) attached at cssLanguage's original definition still
// resolves correctly off the "Styles" top node. Only `.parser` is used here;
// embed-core's registry never touches other Language fields (see resolve()).
function createEmbedding(){return{matcher:matchCssTag,language:{parser:stylesParser},extension:css().support}}if(hasRequiredCodemirrorLangEmbedCss)return codemirrorLangEmbedCss;hasRequiredCodemirrorLangEmbedCss=1;const{cssLanguage,css}=require$$0,stylesParser=cssLanguage.parser.configure({top:"Styles"});return codemirrorLangEmbedCss={createEmbedding},codemirrorLangEmbedCss}const module={exports:exports};var codemirrorLangEmbedCss,hasRequiredCodemirrorLangEmbedCss,require$$0=await requireAsyncModule("@codemirror/lang-css"),codemirrorLangEmbedCssExports=requireCodemirrorLangEmbedCss(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(codemirrorLangEmbedCssExports);return module.exports=index,module.exports}