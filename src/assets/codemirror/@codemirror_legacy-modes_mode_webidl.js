async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredWebidl,webidl$1={},webidlExports=function requireWebidl(){function wordRegexp(words){return new RegExp("^(("+words.join(")|(")+"))\\b")}function readToken(stream,state){// whitespace
if(stream.eatSpace())return null;// comment
if(state.inComment)return stream.match(multilineCommentsEnd)?(state.inComment=!1,"comment"):(stream.skipToEnd(),"comment");if(stream.match("//"))return stream.skipToEnd(),"comment";if(stream.match(multilineComments))return"comment";if(stream.match(multilineCommentsStart))return state.inComment=!0,"comment";// integer and float
if(stream.match(/^-?[0-9\.]/,!1)&&(stream.match(integers)||stream.match(floats)))return"number";// string
if(stream.match(strings))return"string";// identifier
if(state.startDef&&stream.match(identifiers))return"def";if(state.endDef&&stream.match(identifiersEnd))return state.endDef=!1,"def";if(stream.match(keywords))return"keyword";if(stream.match(types)){var lastToken=state.lastToken,nextToken=(stream.match(/^\s*(.+?)\b/,!1)||[])[1];return":"===lastToken||"implements"===lastToken||"implements"===nextToken||"="===nextToken?"builtin":"type"}return stream.match(builtins)?"builtin":stream.match(atoms)?"atom":stream.match(identifiers)?"variable":stream.match(singleOperators)?"operator":(stream.next(),null);// other
// unrecognized
}if(hasRequiredWebidl)return webidl$1;hasRequiredWebidl=1,Object.defineProperty(webidl$1,"__esModule",{value:!0});var builtinArray=["Clamp","Constructor","EnforceRange","Exposed","ImplicitThis","Global","PrimaryGlobal","LegacyArrayClass","LegacyUnenumerableNamedProperties","LenientThis","NamedConstructor","NewObject","NoInterfaceObject","OverrideBuiltins","PutForwards","Replaceable","SameObject","TreatNonObjectAsNull","TreatNullAs","EmptyString","Unforgeable","Unscopeable"],builtins=wordRegexp(builtinArray),typeArray=["unsigned","short","long",// UnsignedIntegerType
"unrestricted","float","double",// UnrestrictedFloatType
"boolean","byte","octet",// Rest of PrimitiveType
"Promise",// PromiseType
"ArrayBuffer","DataView","Int8Array","Int16Array","Int32Array","Uint8Array","Uint16Array","Uint32Array","Uint8ClampedArray","Float32Array","Float64Array",// BufferRelatedType
"ByteString","DOMString","USVString","sequence","object","RegExp","Error","DOMException","FrozenArray",// Rest of NonAnyType
"any",// Rest of SingleType
"void"// Rest of ReturnType
],types=wordRegexp(typeArray),keywordArray=["attribute","callback","const","deleter","dictionary","enum","getter","implements","inherit","interface","iterable","legacycaller","maplike","partial","required","serializer","setlike","setter","static","stringifier","typedef",// ArgumentNameKeyword except
// "unrestricted"
"optional","readonly","or"],keywords=wordRegexp(keywordArray),atomArray=["true","false",// BooleanLiteral
"Infinity","NaN",// FloatLiteral
"null"// Rest of ConstValue
],atoms=wordRegexp(atomArray),startDefArray=["callback","dictionary","enum","interface"],startDefs=wordRegexp(startDefArray),endDefArray=["typedef"],endDefs=wordRegexp(endDefArray),singleOperators=/^[:<=>?]/,integers=/^-?([1-9][0-9]*|0[Xx][0-9A-Fa-f]+|0[0-7]*)/,floats=/^-?(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)/,identifiers=/^_?[A-Za-z][0-9A-Z_a-z-]*/,identifiersEnd=/^_?[A-Za-z][0-9A-Z_a-z-]*(?=\s*;)/,strings=/^"[^"]*"/,multilineComments=/^\/\*.*?\*\//,multilineCommentsStart=/^\/\*.*/,multilineCommentsEnd=/^.*?\*\//;const webIDL={name:"webidl",startState:function(){return{// Is in multiline comment
inComment:!1,// Last non-whitespace, matched token
lastToken:"",// Next token is a definition
startDef:!1,// Last token of the statement is a definition
endDef:!1}},token:function(stream,state){var style=readToken(stream,state);if(style){var cur=stream.current();state.lastToken=cur,"keyword"===style?(state.startDef=startDefs.test(cur),state.endDef=state.endDef||endDefs.test(cur)):state.startDef=!1}return style},languageData:{autocomplete:builtinArray.concat(typeArray).concat(keywordArray).concat(atomArray)}};return webidl$1.webIDL=webIDL,webidl$1}(),webidl=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(webidlExports);return module.exports=webidl,module.exports}