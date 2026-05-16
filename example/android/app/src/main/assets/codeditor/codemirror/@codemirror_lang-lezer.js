async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/lezer"),require$$1=await requireAsyncModule("@codemirror/language"),dist={},distExports=function requireDist(){/**
	Language support for Lezer grammars.
	*/function lezer(){return new language.LanguageSupport(lezerLanguage)}if(hasRequiredDist)return dist;hasRequiredDist=1;var lezer$1=require$$0,language=require$$1;/**
	A language provider based on the [Lezer Lezer
	parser](https://github.com/lezer-parser/lezer-grammar), extended
	with highlighting and indentation information.
	*/const lezerLanguage=language.LRLanguage.define({name:"lezer",parser:lezer$1.parser.configure({props:[language.foldNodeProp.add({"Body TokensBody SkipBody PrecedenceBody":language.foldInside})]}),languageData:{commentTokens:{block:{open:"/*",close:"*/"},line:"//"},indentOnInput:/^\s*\}$/}});return dist.lezer=lezer,dist.lezerLanguage=lezerLanguage,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}