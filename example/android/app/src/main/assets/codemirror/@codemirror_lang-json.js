async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/json"),require$$1=await requireAsyncModule("@codemirror/language"),dist={},distExports=function requireDist(){function getErrorPosition(error,doc){let m;return(m=error.message.match(/at position (\d+)/))?Math.min(+m[1],doc.length):(m=error.message.match(/at line (\d+) column (\d+)/))?Math.min(doc.line(+m[1]).from+ +m[2]-1,doc.length):0}/**
	A language provider that provides JSON parsing.
	*/ /**
	JSON language support.
	*/function json(){return new language.LanguageSupport(jsonLanguage)}if(hasRequiredDist)return dist;hasRequiredDist=1;var json$1=require$$0,language=require$$1;/**
	Calls
	[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
	on the document and, if that throws an error, reports it as a
	single diagnostic.
	*/const jsonParseLinter=()=>view=>{try{JSON.parse(view.state.doc.toString())}catch(e){if(!(e instanceof SyntaxError))throw e;const pos=getErrorPosition(e,view.state.doc);return[{from:pos,message:e.message,severity:"error",to:pos}]}return[]},jsonLanguage=language.LRLanguage.define({name:"json",parser:json$1.parser.configure({props:[language.indentNodeProp.add({Object:language.continuedIndent({except:/^\s*\}/}),Array:language.continuedIndent({except:/^\s*\]/})}),language.foldNodeProp.add({"Object Array":language.foldInside})]}),languageData:{closeBrackets:{brackets:["[","{","\""]},indentOnInput:/^\s*[\}\]]$/}});return dist.json=json,dist.jsonLanguage=jsonLanguage,dist.jsonParseLinter=jsonParseLinter,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}