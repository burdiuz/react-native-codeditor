async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredTiddlywiki,tiddlywiki$1={},tiddlywikiExports=function requireTiddlywiki(){function chain(stream,state,f){return state.tokenize=f,f(stream,state)}function tokenBase(stream,state){var sol=stream.sol(),ch=stream.peek();// indicates the start of a code block.
// check start of  blocks
if(state.block=!1,sol&&/[<\/\*{}\-]/.test(ch)){if(stream.match(reCodeBlockStart))return state.block=!0,chain(stream,state,twTokenCode);if(stream.match(reBlockQuote))return"quote";if(stream.match(reWikiCommentStart)||stream.match(reWikiCommentStop))return"comment";if(stream.match(reJsCodeStart)||stream.match(reJsCodeStop)||stream.match(reXmlCodeStart)||stream.match(reXmlCodeStop))return"comment";if(stream.match(reHR))return"contentSeparator"}if(stream.next(),sol&&/[\/\*!#;:>|]/.test(ch)){if("!"==ch)return stream.skipToEnd(),"header";if("*"==ch)return stream.eatWhile("*"),"comment";if("#"==ch)return stream.eatWhile("#"),"comment";if(";"==ch)return stream.eatWhile(";"),"comment";if(":"==ch)return stream.eatWhile(":"),"comment";if(">"==ch)return stream.eatWhile(">"),"quote";if("|"==ch)return"header"}if("{"==ch&&stream.match("{{"))return chain(stream,state,twTokenCode);// rudimentary html:// file:// link matching. TW knows much more ...
if(/[hf]/i.test(ch)&&/[ti]/i.test(stream.peek())&&stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i))return"link";// just a little string indicator, don't want to have the whole string covered
if("\""==ch)return"string";if("~"==ch)// _no_ CamelCase indicator should be bold
return"brace";if(/[\[\]]/.test(ch)&&stream.match(ch))// check for [[..]]
return"brace";if("@"==ch)return stream.eatWhile(isSpaceName),"link";if(/\d/.test(ch))return stream.eatWhile(/\d/),"number";if("/"==ch){// tw invisible comment
if(stream.eat("%"))return chain(stream,state,twTokenComment);if(stream.eat("/"))//
return chain(stream,state,twTokenEm)}if("_"==ch&&stream.eat("_"))// tw underline
return chain(stream,state,twTokenUnderline);// strikethrough and mdash handling
if("-"==ch&&stream.eat("-")){// if strikethrough looks ugly, change CSS.
if(" "!=stream.peek())return chain(stream,state,twTokenStrike);// mdash
if(" "==stream.peek())return"brace"}return"'"==ch&&stream.eat("'")?chain(stream,state,twTokenStrong):"<"==ch&&stream.eat("<")?chain(stream,state,twTokenMacro):(stream.eatWhile(/[\w\$_]/),textwords.propertyIsEnumerable(stream.current())?"keyword":null);// core macro handling
}// tw invisible comment
function twTokenComment(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("/"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="%"==ch}return"comment"}// tw strong / bold
function twTokenStrong(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("'"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="'"==ch}return"strong"}// tw code
function twTokenCode(stream,state){var sb=state.block;return sb&&stream.current()?"comment":!sb&&stream.match(reUntilCodeStop)?(state.tokenize=tokenBase,"comment"):sb&&stream.sol()&&stream.match(reCodeBlockStop)?(state.tokenize=tokenBase,"comment"):(stream.next(),"comment")}// tw em / italic
function twTokenEm(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("/"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="/"==ch}return"emphasis"}// tw underlined text
function twTokenUnderline(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("_"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="_"==ch}return"link"}// tw strike through text looks ugly
// change CSS if needed
function twTokenStrike(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("-"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="-"==ch}return"deleted"}// macro
function twTokenMacro(stream,state){if("<<"==stream.current())return"meta";var ch=stream.next();return ch?">"==ch&&">"==stream.peek()?(stream.next(),state.tokenize=tokenBase,"meta"):(stream.eatWhile(/[\w\$_]/),keywords.propertyIsEnumerable(stream.current())?"keyword":null):(state.tokenize=tokenBase,null)}// Interface
if(hasRequiredTiddlywiki)return tiddlywiki$1;hasRequiredTiddlywiki=1,Object.defineProperty(tiddlywiki$1,"__esModule",{value:!0});// Tokenizer
var textwords={},keywords={allTags:!0,closeAll:!0,list:!0,newJournal:!0,newTiddler:!0,permaview:!0,saveChanges:!0,search:!0,slider:!0,tabs:!0,tag:!0,tagging:!0,tags:!0,tiddler:!0,timeline:!0,today:!0,version:!0,option:!0,with:!0,filter:!0},isSpaceName=/[\w_\-]/i,reHR=/^\-\-\-\-+$/,// <hr>
reWikiCommentStart=/^\/\*\*\*$/,// /***
reWikiCommentStop=/^\*\*\*\/$/,// ***/
reBlockQuote=/^<<<$/,reJsCodeStart=/^\/\/\{\{\{$/,// //{{{ js block start
reJsCodeStop=/^\/\/\}\}\}$/,// //}}} js stop
reXmlCodeStart=/^<!--\{\{\{-->$/,// xml block start
reXmlCodeStop=/^<!--\}\}\}-->$/,// xml stop
reCodeBlockStart=/^\{\{\{$/,// {{{ TW text div block start
reCodeBlockStop=/^\}\}\}$/,// }}} TW text stop
reUntilCodeStop=/.*?\}\}\}/;const tiddlyWiki={name:"tiddlywiki",startState:function(){return{tokenize:tokenBase}},token:function(stream,state){if(stream.eatSpace())return null;var style=state.tokenize(stream,state);return style}};return tiddlywiki$1.tiddlyWiki=tiddlyWiki,tiddlywiki$1}(),tiddlywiki=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(tiddlywikiExports);return module.exports=tiddlywiki,module.exports}