async function moduleInitFunction(requireAsyncModule,exports={}){function requireCodemirrorLangEmbedCore(){// A registry of (tagPath -> Language) matchers, tried in registration order.
// `tagPath` is the array produced by readIdentifierPath below, e.g. ['sql'],
// ['gql'], ['styled', 'View'] (for `styled.View` tags), or ['styled'] (for
// `styled(Component)` — the call collapses to its callee's own path).
function createTagRegistry(){const entries=[];return{register(matcher,language){entries.push({matcher,language})},resolve(tagPath){for(const{matcher,language}of entries)if(matcher(tagPath))return language;return null}}}// Walks a tag expression's SyntaxNode down to a flat identifier path.
// Only VariableName / MemberExpression(.prop) / CallExpression(callee) shapes
// are recognized — anything else (bracket access, computed member, etc.)
// is rejected by returning null, since tag-name matching is purely textual
// (see SINGLE_FILE_PROTOTYPES.md open question 2).
function readIdentifierPath(node,input){switch(node.name){case"VariableName":return[input.read(node.from,node.to)];case"MemberExpression":{const object=node.firstChild,property=node.lastChild;if(!object||!property)return null;if("PropertyName"!==property.name&&"PrivatePropertyName"!==property.name)// bracket-access form (styled['View']) — not a supported tag shape
return null;const objectPath=readIdentifierPath(object,input);return objectPath?[...objectPath,input.read(property.from,property.to)]:null}case"CallExpression":{// styled(Component)`...` collapses to the callee's own path, so
// `styled(Foo)` and bare `styled` both match a matcher for ['styled'].
const callee=node.firstChild;return callee?readIdentifierPath(callee,input):null}default:return null}}// Given a `TemplateString` node (materialized SyntaxNode, i.e. already
// `.node`), finds its tag identifier path if it's the template of a
// TaggedTemplateExpression, or null otherwise (plain, untagged templates).
function getTaggedTemplateTagPath(templateStringNode,input){const tagged=templateStringNode.parent;if(!tagged||"TaggedTemplateExpression"!==tagged.name)return null;// SyntaxNode accessors (.lastChild etc.) don't return reference-stable
// objects — compare by range instead of `===` to check this is really
// the tagged expression's own template (not, in principle, some other
// child at the same tree position).
const last=tagged.lastChild;if(!last||last.from!==templateStringNode.from||last.to!==templateStringNode.to)return null;const tagNode=tagged.firstChild;return tagNode?readIdentifierPath(tagNode,input):null}// A `TemplateString` node's own range spans the opening and closing backtick
// characters, and any `${...}` interpolations appear as `Interpolation` child
// nodes interleaved with the literal text. Nested DSL parsers only understand
// the literal text, so the overlay must exclude both the delimiters and any
// interpolation ranges — otherwise the nested parser sees stray backtick/`${`
// characters it doesn't recognize and produces spurious error nodes.
function templateContentRanges(templateStringNode){const ranges=[];let pos=templateStringNode.from+1;// skip opening backtick
for(let child=templateStringNode.firstChild;child;child=child.nextSibling)"Interpolation"===child.name&&(child.from>pos&&ranges.push({from:pos,to:child.from}),pos=child.to);const end=templateStringNode.to-1;// exclude closing backtick
return end>pos&&ranges.push({from:pos,to:end}),ranges}// Wraps a JS/TSX LanguageSupport (as returned by @codemirror/lang-javascript's
// javascript()) so that TaggedTemplateExpression templates whose tag matches
// an entry in `registry` get parsed by that entry's nested Language.
function embedTaggedTemplates(languageSupport,registry){const wrappedLanguage=languageSupport.language.configure({wrap:parseMixed((node,input)=>{if("TemplateString"!==node.name)return null;const tagPath=getTaggedTemplateTagPath(node.node,input);if(!tagPath)return null;const language=registry.resolve(tagPath);return language?{parser:language.parser,overlay:templateContentRanges(node.node)}:null})});return new LanguageSupport(wrappedLanguage,languageSupport.support)}// Convenience matcher factory for the common case: a bare identifier tag
// (e.g. `sql`, `gql`, `css`) with no member/call wrapping.
function matchTagName(name){return tagPath=>1===tagPath.length&&tagPath[0]===name}// Adapts a CM6 `Text` (`state.doc`) to the minimal Lezer `Input` shape
// (`.read(from, to)`) that readIdentifierPath/getTaggedTemplateTagPath need.
// Inside a `parseMixed` callback (embedTaggedTemplates above), Lezer already
// supplies a real Input, so this isn't needed there — it's for call sites
// walking an already-built tree directly against `state.doc`, e.g. a
// CompletionSource or a decoration ViewPlugin (see embed-tailwind).
function docAsInput(doc){return{read:(from,to)=>doc.sliceString(from,to)}}if(hasRequiredCodemirrorLangEmbedCore)return codemirrorLangEmbedCore;hasRequiredCodemirrorLangEmbedCore=1;const{parseMixed}=require$$0,{LanguageSupport}=require$$1;return codemirrorLangEmbedCore={createTagRegistry,readIdentifierPath,getTaggedTemplateTagPath,templateContentRanges,embedTaggedTemplates,matchTagName,docAsInput},codemirrorLangEmbedCore}const module={exports:exports};var codemirrorLangEmbedCore,hasRequiredCodemirrorLangEmbedCore,require$$0=await requireAsyncModule("@lezer/common"),require$$1=await requireAsyncModule("@codemirror/language"),codemirrorLangEmbedCoreExports=requireCodemirrorLangEmbedCore(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(codemirrorLangEmbedCoreExports);return module.exports=index,module.exports}