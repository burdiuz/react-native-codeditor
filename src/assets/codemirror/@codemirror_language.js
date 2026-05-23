async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/common"),require$$1=await requireAsyncModule("@codemirror/state"),require$$2=await requireAsyncModule("@codemirror/view"),require$$3=await requireAsyncModule("@lezer/highlight"),require$$4=await requireAsyncModule("style-mod"),dist={},distExports=function requireDist(){/**
	Helper function to define a facet (to be added to the top syntax
	node(s) for a language via
	[`languageDataProp`](https://codemirror.net/6/docs/ref/#language.languageDataProp)), that will be
	used to associate language data with the language. You
	probably only need this when subclassing
	[`Language`](https://codemirror.net/6/docs/ref/#language.Language).
	*/function defineLanguageFacet(baseData){return state.Facet.define({combine:baseData?values=>values.concat(baseData):void 0})}/**
	Syntax node prop used to register sublanguages. Should be added to
	the top level node type for the language.
	*/function topNodeAt(state,pos,side){let topLang=state.facet(language),tree=syntaxTree(state).topNode;if(!topLang||topLang.allowsNesting)for(let node=tree;node;node=node.enter(pos,side,common.IterMode.ExcludeBuffers|common.IterMode.EnterBracketed))node.type.isTop&&(tree=node);return tree}/**
	A subclass of [`Language`](https://codemirror.net/6/docs/ref/#language.Language) for use with Lezer
	[LR parsers](https://lezer.codemirror.net/docs/ref#lr.LRParser)
	parsers.
	*/ /**
	Get the syntax tree for a state, which is the current (possibly
	incomplete) parse tree of the active
	[language](https://codemirror.net/6/docs/ref/#language.Language), or the empty tree if there is no
	language available.
	*/function syntaxTree(state){let field=state.field(Language.state,!1);return field?field.tree:common.Tree.empty}/**
	Try to get a parse tree that spans at least up to `upto`. The
	method will do at most `timeout` milliseconds of work to parse
	up to that point if the tree isn't already available.
	*/function ensureSyntaxTree(state,upto,timeout=50){var _a;let parse=null===(_a=state.field(Language.state,!1))||void 0===_a?void 0:_a.context;if(!parse)return null;let oldVieport=parse.viewport;parse.updateViewport({from:0,to:upto});let result=parse.isDone(upto)||parse.work(timeout,upto)?parse.tree:null;return parse.updateViewport(oldVieport),result}/**
	Queries whether there is a full syntax tree available up to the
	given document position. If there isn't, the background parse
	process _might_ still be working and update the tree further, but
	there is no guarantee of that—the parser will [stop
	working](https://codemirror.net/6/docs/ref/#language.syntaxParserRunning) when it has spent a
	certain amount of time or has moved beyond the visible viewport.
	Always returns false if no language has been enabled.
	*/function syntaxTreeAvailable(state,upto=state.doc.length){var _a;return(null===(_a=state.field(Language.state,!1))||void 0===_a?void 0:_a.context.isDone(upto))||!1}/**
	Move parsing forward, and update the editor state afterwards to
	reflect the new tree. Will work for at most `timeout`
	milliseconds. Returns true if the parser managed get to the given
	position in that time.
	*/function forceParsing(view,upto=view.viewport.to,timeout=100){let success=ensureSyntaxTree(view.state,upto,timeout);return success!=syntaxTree(view.state)&&view.dispatch({}),!!success}/**
	Tells you whether the language parser is planning to do more
	parsing work (in a `requestIdleCallback` pseudo-thread) or has
	stopped running, either because it parsed the entire document,
	because it spent too much time and was cut off, or because there
	is no language parser enabled.
	*/function syntaxParserRunning(view){var _a;return(null===(_a=view.plugin(parseWorker))||void 0===_a?void 0:_a.isWorking())||!1}/**
	Lezer-style
	[`Input`](https://lezer.codemirror.net/docs/ref#common.Input)
	object for a [`Text`](https://codemirror.net/6/docs/ref/#state.Text) object.
	*/function cutFragments(fragments,from,to){return common.TreeFragment.applyChanges(fragments,[{fromA:from,toA:to,fromB:from,toB:to}])}/**
	Return the _column width_ of an indent unit in the state.
	Determined by the [`indentUnit`](https://codemirror.net/6/docs/ref/#language.indentUnit)
	facet, and [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) when that
	contains tabs.
	*/function getIndentUnit(state){let unit=state.facet(indentUnit);return 9==unit.charCodeAt(0)?state.tabSize*unit.length:unit.length}/**
	Create an indentation string that covers columns 0 to `cols`.
	Will use tabs for as much of the columns as possible when the
	[`indentUnit`](https://codemirror.net/6/docs/ref/#language.indentUnit) facet contains
	tabs.
	*/function indentString(state,cols){let result="",ts=state.tabSize,ch=state.facet(indentUnit)[0];if("\t"==ch){for(;cols>=ts;)result+="\t",cols-=ts;ch=" "}for(let i=0;i<cols;i++)result+=ch;return result}/**
	Get the indentation, as a column number, at the given position.
	Will first consult any [indent services](https://codemirror.net/6/docs/ref/#language.indentService)
	that are registered, and if none of those return an indentation,
	this will check the syntax tree for the [indent node
	prop](https://codemirror.net/6/docs/ref/#language.indentNodeProp) and use that if found. Returns a
	number when an indentation could be determined, and null
	otherwise.
	*/function getIndentation(context,pos){context instanceof state.EditorState&&(context=new IndentContext(context));for(let service of context.state.facet(indentService)){let result=service(context,pos);if(void 0!==result)return result}let tree=syntaxTree(context.state);return tree.length>=pos?syntaxIndentation(context,tree,pos):null}/**
	Create a change set that auto-indents all lines touched by the
	given document range.
	*/function indentRange(state,from,to){let updated=Object.create(null),context=new IndentContext(state,{overrideIndentation:start=>{var _a;return null!==(_a=updated[start])&&void 0!==_a?_a:-1}}),changes=[];for(let line,pos=from;pos<=to;){line=state.doc.lineAt(pos),pos=line.to+1;let indent=getIndentation(context,line.from);if(null==indent)continue;/\S/.test(line.text)||(indent=0);let cur=/^\s*/.exec(line.text)[0],norm=indentString(state,indent);cur!=norm&&(updated[line.from]=indent,changes.push({from:line.from,to:line.from+cur.length,insert:norm}))}return state.changes(changes)}/**
	Indentation contexts are used when calling [indentation
	services](https://codemirror.net/6/docs/ref/#language.indentService). They provide helper utilities
	useful in indentation logic, and can selectively override the
	indentation reported for some lines.
	*/ // Compute the indentation for a given position from the syntax tree.
function syntaxIndentation(cx,ast,pos){let stack=ast.resolveStack(pos),inner=ast.resolveInner(pos,-1).resolve(pos,0).enterUnfinishedNodesBefore(pos);if(inner!=stack.node){let add=[];for(let cur=inner;cur&&!(cur.from<stack.node.from||cur.to>stack.node.to||cur.from==stack.node.from&&cur.type==stack.node.type);cur=cur.parent)add.push(cur);for(let i=add.length-1;0<=i;i--)stack={node:add[i],next:stack}}return indentFor(stack,cx,pos)}function indentFor(stack,cx,pos){for(let strategy,cur=stack;cur;cur=cur.next)if(strategy=indentStrategy(cur.node),strategy)return strategy(TreeIndentContext.create(cx,pos,cur));return 0}function ignoreClosed(cx){return cx.pos==cx.options.simulateBreak&&cx.options.simulateDoubleBreak}function indentStrategy(tree){let strategy=tree.type.prop(indentNodeProp);if(strategy)return strategy;let close,first=tree.firstChild;if(first&&(close=first.type.prop(common.NodeProp.closedBy))){let last=tree.lastChild,closed=last&&-1<close.indexOf(last.name);return cx=>delimitedStrategy(cx,!0,1,void 0,closed&&!ignoreClosed(cx)?last.from:void 0)}return null==tree.parent?topIndent:null}function topIndent(){return 0}/**
	Objects of this type provide context information and helper
	methods to indentation functions registered on syntax nodes.
	*/function isParent(parent,of){for(let cur=of;cur;cur=cur.parent)if(parent==cur)return!0;return!1}// Check whether a delimited node is aligned (meaning there are
// non-skipped nodes on the same line as the opening delimiter). And
// if so, return the opening token.
function bracketedAligned(context){let tree=context.node,openToken=tree.childAfter(tree.from),last=tree.lastChild;if(!openToken)return null;let sim=context.options.simulateBreak,openLine=context.state.doc.lineAt(openToken.from),lineEnd=null==sim||sim<=openLine.from?openLine.to:Math.min(openLine.to,sim);for(let next,pos=openToken.to;;){if(next=tree.childAfter(pos),!next||next==last)return null;if(!next.type.isSkipped){if(next.from>=lineEnd)return null;let space=/^ */.exec(openLine.text.slice(openToken.to-openLine.from))[0].length;return{from:openToken.from,to:openToken.to+space}}pos=next.to}}/**
	An indentation strategy for delimited (usually bracketed) nodes.
	Will, by default, indent one unit more than the parent's base
	indent unless the line starts with a closing token. When `align`
	is true and there are non-skipped nodes on the node's opening
	line, the content of the node will be aligned with the end of the
	opening node, like this:

	    foo(bar,
	        baz)
	*/function delimitedIndent({closing,align=!0,units=1}){return context=>delimitedStrategy(context,align,units,closing)}function delimitedStrategy(context,align,units,closing,closedAt){let after=context.textAfter,space=after.match(/^\s*/)[0].length,closed=closing&&after.slice(space,space+closing.length)==closing||closedAt==context.pos+space,aligned=align?bracketedAligned(context):null;return aligned?closed?context.column(aligned.from):context.column(aligned.to):context.baseIndent+(closed?0:context.unit*units)}/**
	An indentation strategy that aligns a node's content to its base
	indentation.
	*/ /**
	Creates an indentation strategy that, by default, indents
	continued lines one unit more than the node's base indentation.
	You can provide `except` to prevent indentation of lines that
	match a pattern (for example `/^else\b/` in `if`/`else`
	constructs), and you can change the amount of units used with the
	`units` option.
	*/function continuedIndent({except,units=1}={}){return context=>{let matchExcept=except&&except.test(context.textAfter);return context.baseIndent+(matchExcept?0:units*context.unit)}}/**
	Enables reindentation on input. When a language defines an
	`indentOnInput` field in its [language
	data](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt), which must hold a regular
	expression, the line at the cursor will be reindented whenever new
	text is typed and the input from the start of the line up to the
	cursor matches that regexp.

	To avoid unneccesary reindents, it is recommended to start the
	regexp with `^` (usually followed by `\s*`), and end it with `$`.
	For example, `/^\s*\}$/` will reindent when a closing brace is
	added at the start of a line.
	*/function indentOnInput(){return state.EditorState.transactionFilter.of(tr=>{if(!tr.docChanged||!tr.isUserEvent("input.type")&&!tr.isUserEvent("input.complete"))return tr;let rules=tr.startState.languageDataAt("indentOnInput",tr.startState.selection.main.head);if(!rules.length)return tr;let doc=tr.newDoc,{head}=tr.newSelection.main,line=doc.lineAt(head);if(head>line.from+DontIndentBeyond)return tr;let lineStart=doc.sliceString(line.from,head);if(!rules.some(r=>r.test(lineStart)))return tr;let{state}=tr,last=-1,changes=[];for(let{head}of state.selection.ranges){let line=state.doc.lineAt(head);if(line.from==last)continue;last=line.from;let indent=getIndentation(state,line.from);if(null==indent)continue;let cur=/^\s*/.exec(line.text)[0],norm=indentString(state,indent);cur!=norm&&changes.push({from:line.from,to:line.from+cur.length,insert:norm})}return changes.length?[tr,{changes,sequential:!0}]:tr})}/**
	A facet that registers a code folding service. When called with
	the extent of a line, such a function should return a foldable
	range that starts on that line (but continues beyond it), if one
	can be found.
	*/ /**
	[Fold](https://codemirror.net/6/docs/ref/#language.foldNodeProp) function that folds everything but
	the first and the last child of a syntax node. Useful for nodes
	that start and end with delimiters.
	*/function foldInside(node){let first=node.firstChild,last=node.lastChild;return first&&first.to<last.from?{from:first.to,to:last.type.isError?node.to:last.from}:null}function syntaxFolding(state,start,end){let tree=syntaxTree(state);if(tree.length<end)return null;let stack=tree.resolveStack(end,1),found=null;for(let cur,iter=stack;iter;iter=iter.next){if(cur=iter.node,cur.to<=end||cur.from>end)continue;if(found&&cur.from<start)break;let prop=cur.type.prop(foldNodeProp);if(prop&&(cur.to<tree.length-50||tree.length==state.doc.length||!isUnfinished(cur))){let value=prop(cur,state);value&&value.from<=end&&value.from>=start&&value.to>end&&(found=value)}}return found}function isUnfinished(node){let ch=node.lastChild;return ch&&ch.to==node.to&&ch.type.isError}/**
	Check whether the given line is foldable. First asks any fold
	services registered through
	[`foldService`](https://codemirror.net/6/docs/ref/#language.foldService), and if none of them return
	a result, tries to query the [fold node
	prop](https://codemirror.net/6/docs/ref/#language.foldNodeProp) of syntax nodes that cover the end
	of the line.
	*/function foldable(state,lineStart,lineEnd){for(let service of state.facet(foldService)){let result=service(state,lineStart,lineEnd);if(result)return result}return syntaxFolding(state,lineStart,lineEnd)}function mapRange(range,mapping){let from=mapping.mapPos(range.from,1),to=mapping.mapPos(range.to,-1);return from>=to?void 0:{from,to}}/**
	State effect that can be attached to a transaction to fold the
	given range. (You probably only need this in exceptional
	circumstances—usually you'll just want to let
	[`foldCode`](https://codemirror.net/6/docs/ref/#language.foldCode) and the [fold
	gutter](https://codemirror.net/6/docs/ref/#language.foldGutter) create the transactions.)
	*/function selectedLines(view){let lines=[];for(let{head}of view.state.selection.ranges)lines.some(l=>l.from<=head&&l.to>=head)||lines.push(view.lineBlockAt(head));return lines}/**
	The state field that stores the folded ranges (as a [decoration
	set](https://codemirror.net/6/docs/ref/#view.DecorationSet)). Can be passed to
	[`EditorState.toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) and
	[`fromJSON`](https://codemirror.net/6/docs/ref/#state.EditorState^fromJSON) to serialize the fold
	state.
	*/function clearTouchedFolds(folded,from,to=from){let touched=!1;return folded.between(from,to,(a,b)=>{a<to&&b>from&&(touched=!0)}),touched?folded.update({filterFrom:from,filterTo:to,filter:(a,b)=>a>=to||b<=from}):folded}/**
	Get a [range set](https://codemirror.net/6/docs/ref/#state.RangeSet) containing the folded ranges
	in the given state.
	*/function foldedRanges(state$1){return state$1.field(foldState,!1)||state.RangeSet.empty}function findFold(state,from,to){var _a;let found=null;return null===(_a=state.field(foldState,!1))||void 0===_a?void 0:_a.between(from,to,(from,to)=>{(!found||found.from>from)&&(found={from,to})}),found}function foldExists(folded,from,to){let found=!1;return folded.between(from,from,(a,b)=>{a==from&&b==to&&(found=!0)}),found}function maybeEnable(state$1,other){return state$1.field(foldState,!1)?other:other.concat(state.StateEffect.appendConfig.of(codeFolding()))}/**
	Fold the lines that are selected, if possible.
	*/function announceFold(view$1,range,fold=!0){let lineFrom=view$1.state.doc.lineAt(range.from).number,lineTo=view$1.state.doc.lineAt(range.to).number;return view.EditorView.announce.of(`${view$1.state.phrase(fold?"Folded lines":"Unfolded lines")} ${lineFrom} ${view$1.state.phrase("to")} ${lineTo}.`)}/**
	Fold all top-level foldable ranges. Note that, in most cases,
	folding information will depend on the [syntax
	tree](https://codemirror.net/6/docs/ref/#language.syntaxTree), and folding everything may not work
	reliably when the document hasn't been fully parsed (either
	because the editor state was only just initialized, or because the
	document is so big that the parser decided not to parse it
	entirely).
	*/ // Find the foldable region containing the given line, if one exists
function foldableContainer(view,lineBlock){// Look backwards through line blocks until we find a foldable region that
// intersects with the line
for(let foldableRegion,line=lineBlock;;){if(foldableRegion=foldable(view.state,line.from,line.to),foldableRegion&&foldableRegion.to>lineBlock.from)return foldableRegion;if(!line.from)return null;line=view.lineBlockAt(line.from-1)}}/**
	Toggle folding at cursors. Unfolds if there is an existing fold
	starting in that line, tries to find a foldable range around it
	otherwise.
	*/ /**
	Create an extension that configures code folding.
	*/function codeFolding(config){let result=[foldState,baseTheme$1];return config&&result.push(foldConfig.of(config)),result}function widgetToDOM(view,prepared){let{state}=view,conf=state.facet(foldConfig),onclick=event=>{let line=view.lineBlockAt(view.posAtDOM(event.target)),folded=findFold(view.state,line.from,line.to);folded&&view.dispatch({effects:unfoldEffect.of(folded)}),event.preventDefault()};if(conf.placeholderDOM)return conf.placeholderDOM(view,onclick,prepared);let element=document.createElement("span");return element.textContent=conf.placeholderText,element.setAttribute("aria-label",state.phrase("folded code")),element.title=state.phrase("unfold"),element.className="cm-foldPlaceholder",element.onclick=onclick,element}/**
	Create an extension that registers a fold gutter, which shows a
	fold status indicator before foldable lines (which can be clicked
	to fold or unfold the line).
	*/function foldGutter(config={}){let fullConfig={...foldGutterDefaults,...config},canFold=new FoldMarker(fullConfig,!0),canUnfold=new FoldMarker(fullConfig,!1),markers=view.ViewPlugin.fromClass(class{constructor(view){this.from=view.viewport.from,this.markers=this.buildMarkers(view)}update(update){(update.docChanged||update.viewportChanged||update.startState.facet(language)!=update.state.facet(language)||update.startState.field(foldState,!1)!=update.state.field(foldState,!1)||syntaxTree(update.startState)!=syntaxTree(update.state)||fullConfig.foldingChanged(update))&&(this.markers=this.buildMarkers(update.view))}buildMarkers(view){let builder=new state.RangeSetBuilder;for(let line of view.viewportLineBlocks){let mark=findFold(view.state,line.from,line.to)?canUnfold:foldable(view.state,line.from,line.to)?canFold:null;mark&&builder.add(line.from,line.from,mark)}return builder.finish()}}),{domEventHandlers}=fullConfig;return[markers,view.gutter({class:"cm-foldGutter",markers(view){var _a;return(null===(_a=view.plugin(markers))||void 0===_a?void 0:_a.markers)||state.RangeSet.empty},initialSpacer(){return new FoldMarker(fullConfig,!1)},domEventHandlers:{...domEventHandlers,click:(view,line,event)=>{if(domEventHandlers.click&&domEventHandlers.click(view,line,event))return!0;let folded=findFold(view.state,line.from,line.to);if(folded)return view.dispatch({effects:unfoldEffect.of(folded)}),!0;let range=foldable(view.state,line.from,line.to);return!!range&&(view.dispatch({effects:foldEffect.of(range)}),!0)}}}),codeFolding()]}function getHighlighters(state){let main=state.facet(highlighterFacet);return main.length?main:state.facet(fallbackHighlighter)}/**
	Wrap a highlighter in an editor extension that uses it to apply
	syntax highlighting to the editor content.

	When multiple (non-fallback) styles are provided, the styling
	applied is the union of the classes they emit.
	*/function syntaxHighlighting(highlighter,options){let themeType,ext=[treeHighlighter];return highlighter instanceof HighlightStyle&&(highlighter.module&&ext.push(view.EditorView.styleModule.of(highlighter.module)),themeType=highlighter.themeType),(null===options||void 0===options?void 0:options.fallback)?ext.push(fallbackHighlighter.of(highlighter)):themeType?ext.push(highlighterFacet.computeN([view.EditorView.darkTheme],state=>state.facet(view.EditorView.darkTheme)==("dark"==themeType)?[highlighter]:[])):ext.push(highlighterFacet.of(highlighter)),ext}/**
	Returns the CSS classes (if any) that the highlighters active in
	the state would assign to the given style
	[tags](https://lezer.codemirror.net/docs/ref#highlight.Tag) and
	(optional) language
	[scope](https://codemirror.net/6/docs/ref/#language.HighlightStyle^define^options.scope).
	*/function highlightingFor(state,tags,scope){let highlighters=getHighlighters(state),result=null;if(highlighters)for(let highlighter of highlighters)if(!highlighter.scope||scope&&highlighter.scope(scope)){let cls=highlighter.style(tags);cls&&(result=result?result+" "+cls:cls)}return result}function defaultRenderMatch(match){let decorations=[],mark=match.matched?matchingMark:nonmatchingMark;return decorations.push(mark.range(match.start.from,match.start.to)),match.end&&decorations.push(mark.range(match.end.from,match.end.to)),decorations}function bracketDeco(state){let decorations=[],config=state.facet(bracketMatchingConfig);for(let range of state.selection.ranges){if(!range.empty)continue;let match=matchBrackets(state,range.head,-1,config)||0<range.head&&matchBrackets(state,range.head-1,1,config)||config.afterCursor&&(matchBrackets(state,range.head,1,config)||range.head<state.doc.length&&matchBrackets(state,range.head+1,-1,config));match&&(decorations=decorations.concat(config.renderMatch(match,state)))}return view.Decoration.set(decorations,!0)}/**
	Create an extension that enables bracket matching. Whenever the
	cursor is next to a bracket, that bracket and the one it matches
	are highlighted. Or, when no matching bracket is found, another
	highlighting style is used to indicate this.
	*/function bracketMatching(config={}){return[bracketMatchingConfig.of(config),bracketMatchingUnique]}/**
	When larger syntax nodes, such as HTML tags, are marked as
	opening/closing, it can be a bit messy to treat the whole node as
	a matchable bracket. This node prop allows you to define, for such
	a node, a ‘handle’—the part of the node that is highlighted, and
	that the cursor must be on to activate highlighting in the first
	place.
	*/function matchingNodes(node,dir,brackets){let byProp=node.prop(0>dir?common.NodeProp.openedBy:common.NodeProp.closedBy);if(byProp)return byProp;if(1==node.name.length){let index=brackets.indexOf(node.name);if(-1<index&&index%2==(0>dir?1:0))return[brackets[index+dir]]}return null}function findHandle(node){let hasHandle=node.type.prop(bracketMatchingHandle);return hasHandle?hasHandle(node.node):node}/**
	Find the matching bracket for the token at `pos`, scanning
	direction `dir`. Only the `brackets` and `maxScanDistance`
	properties are used from `config`, if given. Returns null if no
	bracket was found at `pos`, or a match result otherwise.
	*/function matchBrackets(state,pos,dir,config={}){let maxScanDistance=config.maxScanDistance||DefaultScanDist,brackets=config.brackets||DefaultBrackets,tree=syntaxTree(state),node=tree.resolveInner(pos,dir);for(let matches,cur=node;cur;cur=cur.parent)if(matches=matchingNodes(cur.type,dir,brackets),matches&&cur.from<cur.to){let handle=findHandle(cur);if(handle&&(0<dir?pos>=handle.from&&pos<handle.to:pos>handle.from&&pos<=handle.to))return matchMarkedBrackets(state,pos,dir,cur,handle,matches,brackets)}return matchPlainBrackets(state,pos,dir,tree,node.type,maxScanDistance,brackets)}function matchMarkedBrackets(_state,_pos,dir,token,handle,matching,brackets){let parent=token.parent,firstToken={from:handle.from,to:handle.to},depth=0,cursor=null===parent||void 0===parent?void 0:parent.cursor();if(cursor&&(0>dir?cursor.childBefore(token.from):cursor.childAfter(token.to)))do if(0>dir?cursor.to<=token.from:cursor.from>=token.to){if(0==depth&&-1<matching.indexOf(cursor.type.name)&&cursor.from<cursor.to){let endHandle=findHandle(cursor);return{start:firstToken,end:endHandle?{from:endHandle.from,to:endHandle.to}:void 0,matched:!0}}if(matchingNodes(cursor.type,dir,brackets))depth++;else if(matchingNodes(cursor.type,-dir,brackets)){if(0==depth){let endHandle=findHandle(cursor);return{start:firstToken,end:endHandle&&endHandle.from<endHandle.to?{from:endHandle.from,to:endHandle.to}:void 0,matched:!1}}depth--}}while(0>dir?cursor.prevSibling():cursor.nextSibling());return{start:firstToken,matched:!1}}function matchPlainBrackets(state,pos,dir,tree,tokenType,maxScanDistance,brackets){if(0>dir?!pos:pos==state.doc.length)return null;let startCh=0>dir?state.sliceDoc(pos-1,pos):state.sliceDoc(pos,pos+1),bracket=brackets.indexOf(startCh);if(0>bracket||0==bracket%2!=0<dir)return null;let startToken={from:0>dir?pos-1:pos,to:0<dir?pos+1:pos},iter=state.doc.iterRange(pos,0<dir?state.doc.length:0),depth=0;for(let text,distance=0;!iter.next().done&&distance<=maxScanDistance;){text=iter.value,0>dir&&(distance+=text.length);let basePos=pos+distance*dir;for(let found,pos=0<dir?0:text.length-1,end=0<dir?text.length:-1;pos!=end;pos+=dir)if(found=brackets.indexOf(text[pos]),!(0>found||tree.resolveInner(basePos+pos,1).type!=tokenType))if(0==found%2==0<dir)depth++;else{if(1==depth)// Closing
return{start:startToken,end:{from:basePos+pos,to:basePos+pos+1},matched:found>>1==bracket>>1};depth--}0<dir&&(distance+=text.length)}return iter.done?{start:startToken,matched:!1}:null}// Counts the column offset in a string, taking tabs into account.
// Used mostly to find indentation.
function countCol(string,end,tabSize,startIndex=0,startValue=0){null==end&&(end=string.search(/[^\s\u00a0]/),-1==end&&(end=string.length));let n=startValue;for(let i=startIndex;i<end;i++)9==string.charCodeAt(i)?n+=tabSize-n%tabSize:n++;return n}/**
	Encapsulates a single line of input. Given to stream syntax code,
	which uses it to tokenize the content.
	*/function fullParser(spec){return{name:spec.name||"",token:spec.token,blankLine:spec.blankLine||(()=>{}),startState:spec.startState||(()=>!0),copyState:spec.copyState||defaultCopyState,indent:spec.indent||(()=>null),languageData:spec.languageData||{},tokenTable:spec.tokenTable||noTokens,mergeTokens:!1!==spec.mergeTokens}}function defaultCopyState(state){if("object"!=typeof state)return state;let newState={};for(let prop in state){let val=state[prop];newState[prop]=val instanceof Array?val.slice():val}return newState}function findState(lang,tree,off,startPos,before){let state=off>=startPos&&off+tree.length<=before&&tree.prop(lang.stateAfter);if(state)return{state:lang.streamParser.copyState(state),pos:off+tree.length};for(let i=tree.children.length-1;0<=i;i--){let child=tree.children[i],pos=off+tree.positions[i],found=child instanceof common.Tree&&pos<before&&findState(lang,child,pos,startPos,before);if(found)return found}return null}function cutTree(lang,tree,from,to,inside){if(inside&&0>=from&&to>=tree.length)return tree;inside||0!=from||tree.type!=lang.topNode||(inside=!0);for(let i=tree.children.length-1;0<=i;i--){let inner,pos=tree.positions[i],child=tree.children[i];if(pos<to&&child instanceof common.Tree){if(!(inner=cutTree(lang,child,from-pos,to-pos,inside)))break;return inside?new common.Tree(tree.type,tree.children.slice(0,i).concat(inner),tree.positions.slice(0,i+1),pos+inner.length):inner}}return null}function findStartInFragments(lang,fragments,startPos,endPos,editorState){for(let f of fragments){let tree,from=f.from+(f.openStart?25:0),to=f.to-(f.openEnd?25:0),found=from<=startPos&&to>startPos&&findState(lang,f.tree,0-f.offset,startPos,to);if(found&&found.pos<=endPos&&(tree=cutTree(lang,f.tree,startPos+f.offset,found.pos+f.offset,!1)))return{state:found.state,tree}}return{state:lang.streamParser.startState(editorState?getIndentUnit(editorState):4),tree:common.Tree.empty}}function readToken(token,stream,state){stream.start=stream.pos;for(let result,i=0;10>i;i++)if(result=token(stream,state),stream.pos>stream.start)return result;throw new Error("Stream parser failed to advance stream.")}function warnForPart(part,msg){-1<warned.indexOf(part)||(warned.push(part),console.warn(msg))}function createTokenType(extra,tagStr){let tags=[];for(let name of tagStr.split(" ")){let found=[];for(let part of name.split(".")){let value=extra[part]||highlight.tags[part];value?"function"==typeof value?found.length?found=found.map(value):warnForPart(part,`Modifier ${part} used at start of tag`):found.length?warnForPart(part,`Tag ${part} used as modifier`):found=Array.isArray(value)?value:[value]:warnForPart(part,`Unknown highlighting tag ${part}`)}for(let tag of found)tags.push(tag)}if(!tags.length)return 0;let name=tagStr.replace(/ /g,"_"),key=name+" "+tags.map(t=>t.id),known=byTag[key];if(known)return known.id;let type=byTag[key]=common.NodeType.define({id:typeArray.length,name,props:[highlight.styleTags({[name]:tags})]});return typeArray.push(type),type.id}function docID(data,lang){let type=common.NodeType.define({id:typeArray.length,name:"Document",props:[languageDataProp.add(()=>data),indentNodeProp.add(()=>cx=>lang.getIndent(cx))],top:!0});return typeArray.push(type),type}function buildForLine(line){return 4096>=line.length&&/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/.test(line)}function textHasRTL(text){for(let i=text.iter();!i.next().done;)if(buildForLine(i.value))return!0;return!1}function changeAddsRTL(change){let added=!1;return change.iterChanges((fA,tA,fB,tB,ins)=>{!added&&textHasRTL(ins)&&(added=!0)}),added}/**
	Make sure nodes
	[marked](https://lezer.codemirror.net/docs/ref/#common.NodeProp^isolate)
	as isolating for bidirectional text are rendered in a way that
	isolates them from the surrounding text.
	*/function bidiIsolates(options={}){let extensions=[isolateMarks];return options.alwaysIsolate&&extensions.push(alwaysIsolate.of(!0)),extensions}function buildDeco(view,tree,always){let deco=new state.RangeSetBuilder,ranges=view.visibleRanges;always||(ranges=clipRTLLines(ranges,view.state.doc));for(let{from,to}of ranges)tree.iterate({enter:node=>{let iso=node.type.prop(common.NodeProp.isolate);iso&&deco.add(node.from,node.to,marks[iso])},from,to});return deco.finish()}function clipRTLLines(ranges,doc){let cur=doc.iter(),pos=0,result=[],last=null;for(let{from,to}of ranges)if(!(last&&last.to>from&&(from=last.to,from>=to)))for(pos+cur.value.length<from&&(cur.next(from-(pos+cur.value.length)),pos=from);;){let start=pos,end=pos+cur.value.length;if(!cur.lineBreak&&buildForLine(cur.value)&&(last&&last.to>start-10?last.to=Math.min(to,end):result.push(last={from:start,to:Math.min(to,end)})),end>=to)break;pos=end,cur.next()}return result}if(hasRequiredDist)return dist;hasRequiredDist=1;var _a,common=require$$0,state=require$$1,view=require$$2,highlight=require$$3,styleMod=require$$4;/**
	Node prop stored in a parser's top syntax node to provide the
	facet that stores language-specific data for that language.
	*/const languageDataProp=new common.NodeProp,sublanguageProp=new common.NodeProp;/**
	A language object manages parsing and per-language
	[metadata](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt). Parse data is
	managed as a [Lezer](https://lezer.codemirror.net) tree. The class
	can be used directly, via the [`LRLanguage`](https://codemirror.net/6/docs/ref/#language.LRLanguage)
	subclass for [Lezer](https://lezer.codemirror.net/) LR parsers, or
	via the [`StreamLanguage`](https://codemirror.net/6/docs/ref/#language.StreamLanguage) subclass
	for stream parsers.
	*/class Language{/**
	    Construct a language object. If you need to invoke this
	    directly, first define a data facet with
	    [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
	    configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
	    to the language's outer syntax node.
	    */constructor(/**
	    The [language data](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt) facet
	    used for this language.
	    */data,parser,extraExtensions=[],/**
	    A language name.
	    */name=""){this.data=data,this.name=name,state.EditorState.prototype.hasOwnProperty("tree")||Object.defineProperty(state.EditorState.prototype,"tree",{get(){return syntaxTree(this)}}),this.parser=parser,this.extension=[language.of(this),state.EditorState.languageData.of((state,pos,side)=>{let top=topNodeAt(state,pos,side),data=top.type.prop(languageDataProp);if(!data)return[];let base=state.facet(data),sub=top.type.prop(sublanguageProp);if(sub){let innerNode=top.resolve(pos-top.from,side);for(let sublang of sub)if(sublang.test(innerNode,state)){let data=state.facet(sublang.facet);return"replace"==sublang.type?data:data.concat(base)}}return base})].concat(extraExtensions)}/**
	    Query whether this language is active at the given position.
	    */isActiveAt(state,pos,side=-1){return topNodeAt(state,pos,side).type.prop(languageDataProp)==this.data}/**
	    Find the document regions that were parsed using this language.
	    The returned regions will _include_ any nested languages rooted
	    in this language, when those exist.
	    */findRegions(state){let lang=state.facet(language);if((null===lang||void 0===lang?void 0:lang.data)==this.data)return[{from:0,to:state.doc.length}];if(!lang||!lang.allowsNesting)return[];let result=[],explore=(tree,from)=>{if(tree.prop(languageDataProp)==this.data)return void result.push({from,to:from+tree.length});let mount=tree.prop(common.NodeProp.mounted);if(mount){if(mount.tree.prop(languageDataProp)==this.data){if(mount.overlay)for(let r of mount.overlay)result.push({from:r.from+from,to:r.to+from});else result.push({from:from,to:from+tree.length});return}if(mount.overlay){let size=result.length;if(explore(mount.tree,mount.overlay[0].from+from),result.length>size)return}}for(let ch,i=0;i<tree.children.length;i++)ch=tree.children[i],ch instanceof common.Tree&&explore(ch,tree.positions[i]+from)};return explore(syntaxTree(state),0),result}/**
	    Indicates whether this language allows nested languages. The
	    default implementation returns true.
	    */get allowsNesting(){return!0}}/**
	@internal
	*/Language.setState=state.StateEffect.define();class LRLanguage extends Language{constructor(data,parser,name){super(data,parser,[],name),this.parser=parser}/**
	    Define a language from a parser.
	    */static define(spec){let data=defineLanguageFacet(spec.languageData);return new LRLanguage(data,spec.parser.configure({props:[languageDataProp.add(type=>type.isTop?data:void 0)]}),spec.name)}/**
	    Create a new instance of this language with a reconfigured
	    version of its parser and optionally a new name.
	    */configure(options,name){return new LRLanguage(this.data,this.parser.configure(options),name||this.name)}get allowsNesting(){return this.parser.hasWrappers()}}class DocInput{/**
	    Create an input object for the given document.
	    */constructor(doc){this.doc=doc,this.cursorPos=0,this.string="",this.cursor=doc.iter()}get length(){return this.doc.length}syncTo(pos){return this.string=this.cursor.next(pos-this.cursorPos).value,this.cursorPos=pos+this.string.length,this.cursorPos-this.string.length}chunk(pos){return this.syncTo(pos),this.string}get lineChunks(){return!0}read(from,to){let stringStart=this.cursorPos-this.string.length;return from<stringStart||to>=this.cursorPos?this.doc.sliceString(from,to):this.string.slice(from-stringStart,to-stringStart)}}let currentContext=null;/**
	A parse context provided to parsers working on the editor content.
	*/class ParseContext{constructor(parser,/**
	    The current editor state.
	    */state,/**
	    Tree fragments that can be reused by incremental re-parses.
	    */fragments=[],/**
	    @internal
	    */tree,/**
	    @internal
	    */treeLen,/**
	    The current editor viewport (or some overapproximation
	    thereof). Intended to be used for opportunistically avoiding
	    work (in which case
	    [`skipUntilInView`](https://codemirror.net/6/docs/ref/#language.ParseContext.skipUntilInView)
	    should be called to make sure the parser is restarted when the
	    skipped region becomes visible).
	    */viewport,/**
	    @internal
	    */skipped,/**
	    This is where skipping parsers can register a promise that,
	    when resolved, will schedule a new parse. It is cleared when
	    the parse worker picks up the promise. @internal
	    */scheduleOn){this.parser=parser,this.state=state,this.fragments=fragments,this.tree=tree,this.treeLen=treeLen,this.viewport=viewport,this.skipped=skipped,this.scheduleOn=scheduleOn,this.parse=null,this.tempSkipped=[]}/**
	    @internal
	    */static create(parser,state,viewport){return new ParseContext(parser,state,[],common.Tree.empty,0,viewport,[],null)}startParse(){return this.parser.startParse(new DocInput(this.state.doc),this.fragments)}/**
	    @internal
	    */work(until,upto){return null!=upto&&upto>=this.state.doc.length&&(upto=void 0),this.tree!=common.Tree.empty&&this.isDone(null!==upto&&void 0!==upto?upto:this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var _a;if("number"==typeof until){let endTime=Date.now()+until;until=()=>Date.now()>endTime}for(this.parse||(this.parse=this.startParse()),null!=upto&&(null==this.parse.stoppedAt||this.parse.stoppedAt>upto)&&upto<this.state.doc.length&&this.parse.stopAt(upto);;){let done=this.parse.advance();if(done)if(this.fragments=this.withoutTempSkipped(common.TreeFragment.addTree(done,this.fragments,null!=this.parse.stoppedAt)),this.treeLen=null!==(_a=this.parse.stoppedAt)&&void 0!==_a?_a:this.state.doc.length,this.tree=done,this.parse=null,this.treeLen<(null!==upto&&void 0!==upto?upto:this.state.doc.length))this.parse=this.startParse();else return!0;if(until())return!1}})}/**
	    @internal
	    */takeTree(){let pos,tree;this.parse&&(pos=this.parse.parsedPos)>=this.treeLen&&((null==this.parse.stoppedAt||this.parse.stoppedAt>pos)&&this.parse.stopAt(pos),this.withContext(()=>{for(;!(tree=this.parse.advance()););}),this.treeLen=pos,this.tree=tree,this.fragments=this.withoutTempSkipped(common.TreeFragment.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(f){let prev=currentContext;currentContext=this;try{return f()}finally{currentContext=prev}}withoutTempSkipped(fragments){for(let r;r=this.tempSkipped.pop();)fragments=cutFragments(fragments,r.from,r.to);return fragments}/**
	    @internal
	    */changes(changes,newState){let{fragments,tree,treeLen,viewport,skipped}=this;if(this.takeTree(),!changes.empty){let ranges=[];if(changes.iterChangedRanges((fromA,toA,fromB,toB)=>ranges.push({fromA,toA,fromB,toB})),fragments=common.TreeFragment.applyChanges(fragments,ranges),tree=common.Tree.empty,treeLen=0,viewport={from:changes.mapPos(viewport.from,-1),to:changes.mapPos(viewport.to,1)},this.skipped.length){skipped=[];for(let r of this.skipped){let from=changes.mapPos(r.from,1),to=changes.mapPos(r.to,-1);from<to&&skipped.push({from,to})}}}return new ParseContext(this.parser,newState,fragments,tree,treeLen,viewport,skipped,this.scheduleOn)}/**
	    @internal
	    */updateViewport(viewport){if(this.viewport.from==viewport.from&&this.viewport.to==viewport.to)return!1;this.viewport=viewport;let startLen=this.skipped.length;for(let i=0;i<this.skipped.length;i++){let{from,to}=this.skipped[i];from<viewport.to&&to>viewport.from&&(this.fragments=cutFragments(this.fragments,from,to),this.skipped.splice(i--,1))}return!(this.skipped.length>=startLen)&&(this.reset(),!0)}/**
	    @internal
	    */reset(){this.parse&&(this.takeTree(),this.parse=null)}/**
	    Notify the parse scheduler that the given region was skipped
	    because it wasn't in view, and the parse should be restarted
	    when it comes into view.
	    */skipUntilInView(from,to){this.skipped.push({from,to})}/**
	    Returns a parser intended to be used as placeholder when
	    asynchronously loading a nested parser. It'll skip its input and
	    mark it as not-really-parsed, so that the next update will parse
	    it again.
	    
	    When `until` is given, a reparse will be scheduled when that
	    promise resolves.
	    */static getSkippingParser(until){return new class extends common.Parser{createParse(input,fragments,ranges){let from=ranges[0].from,to=ranges[ranges.length-1].to,parser={parsedPos:from,advance(){let cx=currentContext;if(cx){for(let r of ranges)cx.tempSkipped.push(r);until&&(cx.scheduleOn=cx.scheduleOn?Promise.all([cx.scheduleOn,until]):until)}return this.parsedPos=to,new common.Tree(common.NodeType.none,[],[],to-from)},stoppedAt:null,stopAt(){}};return parser}}}/**
	    @internal
	    */isDone(upto){upto=Math.min(upto,this.state.doc.length);let frags=this.fragments;return this.treeLen>=upto&&frags.length&&0==frags[0].from&&frags[0].to>=upto}/**
	    Get the context for the current parse, or `null` if no editor
	    parse is in progress.
	    */static get(){return currentContext}}class LanguageState{constructor(// A mutable parse state that is used to preserve work done during
// the lifetime of a state when moving to the next state.
context){this.context=context,this.tree=context.tree}apply(tr){if(!tr.docChanged&&this.tree==this.context.tree)return this;let newCx=this.context.changes(tr.changes,tr.state),upto=this.context.treeLen==tr.startState.doc.length?void 0:Math.max(tr.changes.mapPos(this.context.treeLen),newCx.viewport.to);// If the previous parse wasn't done, go forward only up to its
// end position or the end of the viewport, to avoid slowing down
// state updates with parse work beyond the viewport.
return newCx.work(20/* Work.Apply */,upto)||newCx.takeTree(),new LanguageState(newCx)}static init(state){let vpTo=Math.min(3e3/* Work.InitViewport */,state.doc.length),parseState=ParseContext.create(state.facet(language).parser,state,{from:0,to:vpTo});return parseState.work(20/* Work.Apply */,vpTo)||parseState.takeTree(),new LanguageState(parseState)}}Language.state=state.StateField.define({create:LanguageState.init,update(value,tr){for(let e of tr.effects)if(e.is(Language.setState))return e.value;return tr.startState.facet(language)==tr.state.facet(language)?value.apply(tr):LanguageState.init(tr.state)}});let requestIdle=callback=>{let timeout=setTimeout(()=>callback(),500/* Work.MaxPause */);return()=>clearTimeout(timeout)};"undefined"!=typeof requestIdleCallback&&(requestIdle=callback=>{let idle=-1,timeout=setTimeout(()=>{idle=requestIdleCallback(callback,{timeout:400/* Work.MinPause */})},100/* Work.MinPause */);return()=>0>idle?clearTimeout(timeout):cancelIdleCallback(idle)});const isInputPending="undefined"!=typeof navigator&&(null===(_a=navigator.scheduling)||void 0===_a?void 0:_a.isInputPending)?()=>navigator.scheduling.isInputPending():null,parseWorker=view.ViewPlugin.fromClass(class ParseWorker{constructor(view){this.view=view,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(update){let cx=this.view.state.field(Language.state).context;(cx.updateViewport(update.view.viewport)||this.view.viewport.to>cx.treeLen)&&this.scheduleWork(),(update.docChanged||update.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50/* Work.ChangeBonus */),this.scheduleWork()),this.checkAsyncSchedule(cx)}scheduleWork(){if(!this.working){let{state}=this.view,field=state.field(Language.state);field.tree==field.context.tree&&field.context.isDone(state.doc.length)||(this.working=requestIdle(this.work))}}work(deadline){this.working=null;let now=Date.now();if(this.chunkEnd<now&&(0>this.chunkEnd||this.view.hasFocus)&&(this.chunkEnd=now+3e4/* Work.ChunkTime */,this.chunkBudget=3e3/* Work.ChunkBudget */),0>=this.chunkBudget)return;// No more budget
let{state,viewport:{to:vpTo}}=this.view,field=state.field(Language.state);if(field.tree==field.context.tree&&field.context.isDone(vpTo+1e5/* Work.MaxParseAhead */))return;let endTime=Date.now()+Math.min(this.chunkBudget,100/* Work.Slice */,deadline&&!isInputPending?Math.max(25/* Work.MinSlice */,deadline.timeRemaining()-5):1e9),viewportFirst=field.context.treeLen<vpTo&&state.doc.length>vpTo+1e3,done=field.context.work(()=>isInputPending&&isInputPending()||Date.now()>endTime,vpTo+(viewportFirst?0:1e5/* Work.MaxParseAhead */));this.chunkBudget-=Date.now()-now,(done||0>=this.chunkBudget)&&(field.context.takeTree(),this.view.dispatch({effects:Language.setState.of(new LanguageState(field.context))})),0<this.chunkBudget&&(!done||viewportFirst)&&this.scheduleWork(),this.checkAsyncSchedule(field.context)}checkAsyncSchedule(cx){cx.scheduleOn&&(this.workScheduled++,cx.scheduleOn.then(()=>this.scheduleWork()).catch(err=>view.logException(this.view.state,err)).then(()=>this.workScheduled--),cx.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||0<this.workScheduled)}},{eventHandlers:{focus(){this.scheduleWork()}}}),language=state.Facet.define({combine(languages){return languages.length?languages[0]:null},enables:language=>[Language.state,parseWorker,view.EditorView.contentAttributes.compute([language],state=>{let lang=state.facet(language);return lang&&lang.name?{"data-language":lang.name}:{}})]});/**
	The facet used to associate a language with an editor state. Used
	by `Language` object's `extension` property (so you don't need to
	manually wrap your languages in this). Can be used to access the
	current language on a state.
	*/ /**
	This class bundles a [language](https://codemirror.net/6/docs/ref/#language.Language) with an
	optional set of supporting extensions. Language packages are
	encouraged to export a function that optionally takes a
	configuration object and returns a `LanguageSupport` instance, as
	the main way for client code to use the package.
	*/class LanguageSupport{/**
	    Create a language support object.
	    */constructor(/**
	    The language object.
	    */language,/**
	    An optional set of supporting extensions. When nesting a
	    language in another language, the outer language is encouraged
	    to include the supporting extensions for its inner languages
	    in its own set of support extensions.
	    */support=[]){this.language=language,this.support=support,this.extension=[language,support]}}/**
	Language descriptions are used to store metadata about languages
	and to dynamically load them. Their main role is finding the
	appropriate language for a filename or dynamically loading nested
	parsers.
	*/class LanguageDescription{constructor(/**
	    The name of this language.
	    */name,/**
	    Alternative names for the mode (lowercased, includes `this.name`).
	    */alias,/**
	    File extensions associated with this language.
	    */extensions,/**
	    Optional filename pattern that should be associated with this
	    language.
	    */filename,loadFunc,/**
	    If the language has been loaded, this will hold its value.
	    */support=void 0){this.name=name,this.alias=alias,this.extensions=extensions,this.filename=filename,this.loadFunc=loadFunc,this.support=support,this.loading=null}/**
	    Start loading the the language. Will return a promise that
	    resolves to a [`LanguageSupport`](https://codemirror.net/6/docs/ref/#language.LanguageSupport)
	    object when the language successfully loads.
	    */load(){return this.loading||(this.loading=this.loadFunc().then(support=>this.support=support,err=>{throw this.loading=null,err}))}/**
	    Create a language description.
	    */static of(spec){let{load,support}=spec;if(!load){if(!support)throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");load=()=>Promise.resolve(support)}return new LanguageDescription(spec.name,(spec.alias||[]).concat(spec.name).map(s=>s.toLowerCase()),spec.extensions||[],spec.filename,load,support)}/**
	    Look for a language in the given array of descriptions that
	    matches the filename. Will first match
	    [`filename`](https://codemirror.net/6/docs/ref/#language.LanguageDescription.filename) patterns,
	    and then [extensions](https://codemirror.net/6/docs/ref/#language.LanguageDescription.extensions),
	    and return the first language that matches.
	    */static matchFilename(descs,filename){for(let d of descs)if(d.filename&&d.filename.test(filename))return d;let ext=/\.([^.]+)$/.exec(filename);if(ext)for(let d of descs)if(-1<d.extensions.indexOf(ext[1]))return d;return null}/**
	    Look for a language whose name or alias matches the the given
	    name (case-insensitively). If `fuzzy` is true, and no direct
	    matchs is found, this'll also search for a language whose name
	    or alias occurs in the string (for names shorter than three
	    characters, only when surrounded by non-word characters).
	    */static matchLanguageName(descs,name,fuzzy=!0){name=name.toLowerCase();for(let d of descs)if(d.alias.some(a=>a==name))return d;if(fuzzy)for(let d of descs)for(let a of d.alias){let found=name.indexOf(a);if(-1<found&&(2<a.length||!/\w/.test(name[found-1])&&!/\w/.test(name[found+a.length])))return d}return null}}/**
	Facet that defines a way to provide a function that computes the
	appropriate indentation depth, as a column number (see
	[`indentString`](https://codemirror.net/6/docs/ref/#language.indentString)), at the start of a given
	line. A return value of `null` indicates no indentation can be
	determined, and the line should inherit the indentation of the one
	above it. A return value of `undefined` defers to the next indent
	service.
	*/const indentService=state.Facet.define(),indentUnit=state.Facet.define({combine:values=>{if(!values.length)return"  ";let unit=values[0];if(!unit||/\S/.test(unit)||Array.from(unit).some(e=>e!=unit[0]))throw new Error("Invalid indent unit: "+JSON.stringify(values[0]));return unit}});/**
	Facet for overriding the unit by which indentation happens. Should
	be a string consisting entirely of the same whitespace character.
	When not set, this defaults to 2 spaces.
	*/class IndentContext{/**
	    Create an indent context.
	    */constructor(/**
	    The editor state.
	    */state,/**
	    @internal
	    */options={}){this.state=state,this.options=options,this.unit=getIndentUnit(state)}/**
	    Get a description of the line at the given position, taking
	    [simulated line
	    breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
	    into account. If there is such a break at `pos`, the `bias`
	    argument determines whether the part of the line line before or
	    after the break is used.
	    */lineAt(pos,bias=1){let line=this.state.doc.lineAt(pos),{simulateBreak,simulateDoubleBreak}=this.options;return null!=simulateBreak&&simulateBreak>=line.from&&simulateBreak<=line.to?simulateDoubleBreak&&simulateBreak==pos?{text:"",from:pos}:(0>bias?simulateBreak<pos:simulateBreak<=pos)?{text:line.text.slice(simulateBreak-line.from),from:simulateBreak}:{text:line.text.slice(0,simulateBreak-line.from),from:line.from}:line}/**
	    Get the text directly after `pos`, either the entire line
	    or the next 100 characters, whichever is shorter.
	    */textAfterPos(pos,bias=1){if(this.options.simulateDoubleBreak&&pos==this.options.simulateBreak)return"";let{text,from}=this.lineAt(pos,bias);return text.slice(pos-from,Math.min(text.length,pos+100-from))}/**
	    Find the column for the given position.
	    */column(pos,bias=1){let{text,from}=this.lineAt(pos,bias),result=this.countColumn(text,pos-from),override=this.options.overrideIndentation?this.options.overrideIndentation(from):-1;return-1<override&&(result+=override-this.countColumn(text,text.search(/\S|$/))),result}/**
	    Find the column position (taking tabs into account) of the given
	    position in the given string.
	    */countColumn(line,pos=line.length){return state.countColumn(line,this.state.tabSize,pos)}/**
	    Find the indentation column of the line at the given point.
	    */lineIndent(pos,bias=1){let{text,from}=this.lineAt(pos,bias),override=this.options.overrideIndentation;if(override){let overriden=override(from);if(-1<overriden)return overriden}return this.countColumn(text,text.search(/\S|$/))}/**
	    Returns the [simulated line
	    break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
	    for this context, if any.
	    */get simulatedBreak(){return this.options.simulateBreak||null}}/**
	A syntax tree node prop used to associate indentation strategies
	with node types. Such a strategy is a function from an indentation
	context to a column number (see also
	[`indentString`](https://codemirror.net/6/docs/ref/#language.indentString)) or null, where null
	indicates that no definitive indentation can be determined.
	*/const indentNodeProp=new common.NodeProp;class TreeIndentContext extends IndentContext{constructor(base,/**
	    The position at which indentation is being computed.
	    */pos,/**
	    @internal
	    */context){super(base.state,base.options),this.base=base,this.pos=pos,this.context=context}/**
	    The syntax tree node to which the indentation strategy
	    applies.
	    */get node(){return this.context.node}/**
	    @internal
	    */static create(base,pos,context){return new TreeIndentContext(base,pos,context)}/**
	    Get the text directly after `this.pos`, either the entire line
	    or the next 100 characters, whichever is shorter.
	    */get textAfter(){return this.textAfterPos(this.pos)}/**
	    Get the indentation at the reference line for `this.node`, which
	    is the line on which it starts, unless there is a node that is
	    _not_ a parent of this node covering the start of that line. If
	    so, the line at the start of that node is tried, again skipping
	    on if it is covered by another such node.
	    */get baseIndent(){return this.baseIndentFor(this.node)}/**
	    Get the indentation for the reference line of the given node
	    (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
	    */baseIndentFor(node){let line=this.state.doc.lineAt(node.from);// Skip line starts that are covered by a sibling (or cousin, etc)
for(;;){let atBreak=node.resolve(line.from);for(;atBreak.parent&&atBreak.parent.from==atBreak.from;)atBreak=atBreak.parent;if(isParent(atBreak,node))break;line=this.state.doc.lineAt(atBreak.from)}return this.lineIndent(line.from)}/**
	    Continue looking for indentations in the node's parent nodes,
	    and return the result of that.
	    */continue(){return indentFor(this.context.next,this.base,this.pos)}}const flatIndent=context=>context.baseIndent,DontIndentBeyond=200,foldService=state.Facet.define(),foldNodeProp=new common.NodeProp,foldEffect=state.StateEffect.define({map:mapRange}),unfoldEffect=state.StateEffect.define({map:mapRange}),foldState=state.StateField.define({create(){return view.Decoration.none},update(folded,tr){tr.isUserEvent("delete")&&tr.changes.iterChangedRanges((fromA,toA)=>folded=clearTouchedFolds(folded,fromA,toA)),folded=folded.map(tr.changes);for(let e of tr.effects)if(e.is(foldEffect)&&!foldExists(folded,e.value.from,e.value.to)){let{preparePlaceholder}=tr.state.facet(foldConfig),widget=preparePlaceholder?view.Decoration.replace({widget:new PreparedFoldWidget(preparePlaceholder(tr.state,e.value))}):foldWidget;folded=folded.update({add:[widget.range(e.value.from,e.value.to)]})}else e.is(unfoldEffect)&&(folded=folded.update({filter:(from,to)=>e.value.from!=from||e.value.to!=to,filterFrom:e.value.from,filterTo:e.value.to}));// Clear folded ranges that cover the selection head
return tr.selection&&(folded=clearTouchedFolds(folded,tr.selection.main.head)),folded},provide:f=>view.EditorView.decorations.from(f),toJSON(folded,state){let ranges=[];return folded.between(0,state.doc.length,(from,to)=>{ranges.push(from,to)}),ranges},fromJSON(value){if(!Array.isArray(value)||value.length%2)throw new RangeError("Invalid JSON for fold state");let ranges=[];for(let i=0;i<value.length;){let from=value[i++],to=value[i++];if("number"!=typeof from||"number"!=typeof to)throw new RangeError("Invalid JSON for fold state");ranges.push(foldWidget.range(from,to))}return view.Decoration.set(ranges,!0)}}),foldCode=view=>{for(let line of selectedLines(view)){let range=foldable(view.state,line.from,line.to);if(range)return view.dispatch({effects:maybeEnable(view.state,[foldEffect.of(range),announceFold(view,range)])}),!0}return!1},unfoldCode=view=>{if(!view.state.field(foldState,!1))return!1;let effects=[];for(let line of selectedLines(view)){let folded=findFold(view.state,line.from,line.to);folded&&effects.push(unfoldEffect.of(folded),announceFold(view,folded,!1))}return effects.length&&view.dispatch({effects}),0<effects.length},foldAll=view=>{let{state}=view,effects=[];for(let pos=0;pos<state.doc.length;){let line=view.lineBlockAt(pos),range=foldable(state,line.from,line.to);range&&effects.push(foldEffect.of(range)),pos=(range?view.lineBlockAt(range.to):line).to+1}return effects.length&&view.dispatch({effects:maybeEnable(view.state,effects)}),!!effects.length},unfoldAll=view=>{let field=view.state.field(foldState,!1);if(!field||!field.size)return!1;let effects=[];return field.between(0,view.state.doc.length,(from,to)=>{effects.push(unfoldEffect.of({from,to}))}),view.dispatch({effects}),!0},toggleFold=view=>{let effects=[];for(let line of selectedLines(view)){let folded=findFold(view.state,line.from,line.to);if(folded)effects.push(unfoldEffect.of(folded),announceFold(view,folded,!1));else{let foldRange=foldableContainer(view,line);foldRange&&effects.push(foldEffect.of(foldRange),announceFold(view,foldRange))}}return 0<effects.length&&view.dispatch({effects:maybeEnable(view.state,effects)}),!!effects.length},foldKeymap=[{key:"Ctrl-Shift-[",mac:"Cmd-Alt-[",run:foldCode},{key:"Ctrl-Shift-]",mac:"Cmd-Alt-]",run:unfoldCode},{key:"Ctrl-Alt-[",run:foldAll},{key:"Ctrl-Alt-]",run:unfoldAll}],defaultConfig={placeholderDOM:null,preparePlaceholder:null,placeholderText:"\u2026"},foldConfig=state.Facet.define({combine(values){return state.combineConfig(values,defaultConfig)}}),foldWidget=view.Decoration.replace({widget:new class extends view.WidgetType{toDOM(view){return widgetToDOM(view,null)}}});/**
	This node prop is used to associate folding information with
	syntax node types. Given a syntax node, it should check whether
	that tree is foldable and return the range that can be collapsed
	when it is.
	*/ /**
	State effect that unfolds the given range (if it was folded).
	*/ /**
	Unfold folded ranges on selected lines.
	*/ /**
	Unfold all folded code.
	*/ /**
	Default fold-related key bindings.

	 - Ctrl-Shift-[ (Cmd-Alt-[ on macOS): [`foldCode`](https://codemirror.net/6/docs/ref/#language.foldCode).
	 - Ctrl-Shift-] (Cmd-Alt-] on macOS): [`unfoldCode`](https://codemirror.net/6/docs/ref/#language.unfoldCode).
	 - Ctrl-Alt-[: [`foldAll`](https://codemirror.net/6/docs/ref/#language.foldAll).
	 - Ctrl-Alt-]: [`unfoldAll`](https://codemirror.net/6/docs/ref/#language.unfoldAll).
	*/class PreparedFoldWidget extends view.WidgetType{constructor(value){super(),this.value=value}eq(other){return this.value==other.value}toDOM(view){return widgetToDOM(view,this.value)}}const foldGutterDefaults={openText:"\u2304",closedText:"\u203A",markerDOM:null,domEventHandlers:{},foldingChanged:()=>!1};class FoldMarker extends view.GutterMarker{constructor(config,open){super(),this.config=config,this.open=open}eq(other){return this.config==other.config&&this.open==other.open}toDOM(view){if(this.config.markerDOM)return this.config.markerDOM(this.open);let span=document.createElement("span");return span.textContent=this.open?this.config.openText:this.config.closedText,span.title=view.state.phrase(this.open?"Fold line":"Unfold line"),span}}const baseTheme$1=view.EditorView.baseTheme({".cm-foldPlaceholder":{backgroundColor:"#eee",border:"1px solid #ddd",color:"#888",borderRadius:".2em",margin:"0 1px",padding:"0 1px",cursor:"pointer"},".cm-foldGutter span":{padding:"0 1px",cursor:"pointer"}});/**
	A highlight style associates CSS styles with highlighting
	[tags](https://lezer.codemirror.net/docs/ref#highlight.Tag).
	*/class HighlightStyle{constructor(/**
	    The tag styles used to create this highlight style.
	    */specs,options){function def(spec){let cls=styleMod.StyleModule.newName();return(modSpec||(modSpec=Object.create(null)))["."+cls]=spec,cls}this.specs=specs;let modSpec;const all="string"==typeof options.all?options.all:options.all?def(options.all):void 0,scopeOpt=options.scope;this.scope=scopeOpt instanceof Language?type=>type.prop(languageDataProp)==scopeOpt.data:scopeOpt?type=>type==scopeOpt:void 0,this.style=highlight.tagHighlighter(specs.map(style=>({tag:style.tag,class:style.class||def(Object.assign({},style,{tag:null}))})),{all}).style,this.module=modSpec?new styleMod.StyleModule(modSpec):null,this.themeType=options.themeType}/**
	    Create a highlighter style that associates the given styles to
	    the given tags. The specs must be objects that hold a style tag
	    or array of tags in their `tag` property, and either a single
	    `class` property providing a static CSS class (for highlighter
	    that rely on external styling), or a
	    [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
	    set of CSS properties (which define the styling for those tags).
	    
	    The CSS rules created for a highlighter will be emitted in the
	    order of the spec's properties. That means that for elements that
	    have multiple tags associated with them, styles defined further
	    down in the list will have a higher CSS precedence than styles
	    defined earlier.
	    */static define(specs,options){return new HighlightStyle(specs,options||{})}}const highlighterFacet=state.Facet.define(),fallbackHighlighter=state.Facet.define({combine(values){return values.length?[values[0]]:null}});class TreeHighlighter{constructor(view){this.markCache=Object.create(null),this.tree=syntaxTree(view.state),this.decorations=this.buildDeco(view,getHighlighters(view.state)),this.decoratedTo=view.viewport.to}update(update){let tree=syntaxTree(update.state),highlighters=getHighlighters(update.state),styleChange=highlighters!=getHighlighters(update.startState),{viewport}=update.view,decoratedToMapped=update.changes.mapPos(this.decoratedTo,1);tree.length<viewport.to&&!styleChange&&tree.type==this.tree.type&&decoratedToMapped>=viewport.to?(this.decorations=this.decorations.map(update.changes),this.decoratedTo=decoratedToMapped):(tree!=this.tree||update.viewportChanged||styleChange)&&(this.tree=tree,this.decorations=this.buildDeco(update.view,highlighters),this.decoratedTo=viewport.to)}buildDeco(view$1,highlighters){if(!highlighters||!this.tree.length)return view.Decoration.none;let builder=new state.RangeSetBuilder;for(let{from,to}of view$1.visibleRanges)highlight.highlightTree(this.tree,highlighters,(from,to,style)=>{builder.add(from,to,this.markCache[style]||(this.markCache[style]=view.Decoration.mark({class:style})))},from,to);return builder.finish()}}const treeHighlighter=state.Prec.high(view.ViewPlugin.fromClass(TreeHighlighter,{decorations:v=>v.decorations})),defaultHighlightStyle=HighlightStyle.define([{tag:highlight.tags.meta,color:"#404740"},{tag:highlight.tags.link,textDecoration:"underline"},{tag:highlight.tags.heading,textDecoration:"underline",fontWeight:"bold"},{tag:highlight.tags.emphasis,fontStyle:"italic"},{tag:highlight.tags.strong,fontWeight:"bold"},{tag:highlight.tags.strikethrough,textDecoration:"line-through"},{tag:highlight.tags.keyword,color:"#708"},{tag:[highlight.tags.atom,highlight.tags.bool,highlight.tags.url,highlight.tags.contentSeparator,highlight.tags.labelName],color:"#219"},{tag:[highlight.tags.literal,highlight.tags.inserted],color:"#164"},{tag:[highlight.tags.string,highlight.tags.deleted],color:"#a11"},{tag:[highlight.tags.regexp,highlight.tags.escape,highlight.tags.special(highlight.tags.string)],color:"#e40"},{tag:highlight.tags.definition(highlight.tags.variableName),color:"#00f"},{tag:highlight.tags.local(highlight.tags.variableName),color:"#30a"},{tag:[highlight.tags.typeName,highlight.tags.namespace],color:"#085"},{tag:highlight.tags.className,color:"#167"},{tag:[highlight.tags.special(highlight.tags.variableName),highlight.tags.macroName],color:"#256"},{tag:highlight.tags.definition(highlight.tags.propertyName),color:"#00c"},{tag:highlight.tags.comment,color:"#940"},{tag:highlight.tags.invalid,color:"#f00"}]),baseTheme=view.EditorView.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),DefaultScanDist=1e4,DefaultBrackets="()[]{}",bracketMatchingConfig=state.Facet.define({combine(configs){return state.combineConfig(configs,{afterCursor:!0,brackets:DefaultBrackets,maxScanDistance:DefaultScanDist,renderMatch:defaultRenderMatch})}}),matchingMark=view.Decoration.mark({class:"cm-matchingBracket"}),nonmatchingMark=view.Decoration.mark({class:"cm-nonmatchingBracket"}),bracketMatcher=view.ViewPlugin.fromClass(class{constructor(view){this.paused=!1,this.decorations=bracketDeco(view.state)}update(update){(update.docChanged||update.selectionSet||this.paused)&&(update.view.composing?(this.decorations=this.decorations.map(update.changes),this.paused=!0):(this.decorations=bracketDeco(update.state),this.paused=!1))}},{decorations:v=>v.decorations}),bracketMatchingUnique=[bracketMatcher,baseTheme],bracketMatchingHandle=new common.NodeProp;/**
	A default highlight style (works well with light themes).
	*/class StringStream{/**
	    Create a stream.
	    */constructor(/**
	    The line.
	    */string,tabSize,/**
	    The current indent unit size.
	    */indentUnit,overrideIndent){this.string=string,this.tabSize=tabSize,this.indentUnit=indentUnit,this.overrideIndent=overrideIndent,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}/**
	    True if we are at the end of the line.
	    */eol(){return this.pos>=this.string.length}/**
	    True if we are at the start of the line.
	    */sol(){return 0==this.pos}/**
	    Get the next code unit after the current position, or undefined
	    if we're at the end of the line.
	    */peek(){return this.string.charAt(this.pos)||void 0}/**
	    Read the next code unit and advance `this.pos`.
	    */next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}/**
	    Match the next character against the given string, regular
	    expression, or predicate. Consume and return it if it matches.
	    */eat(match){let ok,ch=this.string.charAt(this.pos);if(ok="string"==typeof match?ch==match:ch&&(match instanceof RegExp?match.test(ch):match(ch)),ok)return++this.pos,ch}/**
	    Continue matching characters that match the given string,
	    regular expression, or predicate function. Return true if any
	    characters were consumed.
	    */eatWhile(match){let start=this.pos;for(;this.eat(match););return this.pos>start}/**
	    Consume whitespace ahead of `this.pos`. Return true if any was
	    found.
	    */eatSpace(){let start=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>start}/**
	    Move to the end of the line.
	    */skipToEnd(){this.pos=this.string.length}/**
	    Move to directly before the given character, if found on the
	    current line.
	    */skipTo(ch){let found=this.string.indexOf(ch,this.pos);if(-1<found)return this.pos=found,!0}/**
	    Move back `n` characters.
	    */backUp(n){this.pos-=n}/**
	    Get the column position at `this.pos`.
	    */column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=countCol(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}/**
	    Get the indentation column of the current line.
	    */indentation(){var _a;return null!==(_a=this.overrideIndent)&&void 0!==_a?_a:countCol(this.string,null,this.tabSize)}/**
	    Match the input against the given string or regular expression
	    (which should start with a `^`). Return true or the regexp match
	    if it matches.
	    
	    Unless `consume` is set to `false`, this will move `this.pos`
	    past the matched text.
	    
	    When matching a string `caseInsensitive` can be set to true to
	    make the match case-insensitive.
	    */match(pattern,consume,caseInsensitive){if("string"==typeof pattern){let cased=str=>caseInsensitive?str.toLowerCase():str,substr=this.string.substr(this.pos,pattern.length);return cased(substr)==cased(pattern)?(!1!==consume&&(this.pos+=pattern.length),!0):null}else{let match=this.string.slice(this.pos).match(pattern);return match&&0<match.index?null:(match&&!1!==consume&&(this.pos+=match[0].length),match)}}/**
	    Get the current token.
	    */current(){return this.string.slice(this.start,this.pos)}}const IndentedFrom=new WeakMap;/**
	A [language](https://codemirror.net/6/docs/ref/#language.Language) class based on a CodeMirror
	5-style [streaming parser](https://codemirror.net/6/docs/ref/#language.StreamParser).
	*/class StreamLanguage extends Language{constructor(parser){let self,data=defineLanguageFacet(parser.languageData),p=fullParser(parser),impl=new class extends common.Parser{createParse(input,fragments,ranges){return new Parse(self,input,fragments,ranges)}};super(data,impl,[],parser.name),this.topNode=docID(data,this),self=this,this.streamParser=p,this.stateAfter=new common.NodeProp({perNode:!0}),this.tokenTable=parser.tokenTable?new TokenTable(p.tokenTable):defaultTokenTable}/**
	    Define a stream language.
	    */static define(spec){return new StreamLanguage(spec)}/**
	    @internal
	    */getIndent(cx){let from,{overrideIndentation}=cx.options;overrideIndentation&&(from=IndentedFrom.get(cx.state),null!=from&&from<cx.pos-1e4&&(from=void 0));let statePos,state,start=findState(this,cx.node.tree,cx.node.from,cx.node.from,null!==from&&void 0!==from?from:cx.pos);if(start?(state=start.state,statePos=start.pos+1):(state=this.streamParser.startState(cx.unit),statePos=cx.node.from),1e4<cx.pos-statePos/* C.MaxIndentScanDist */)return null;for(;statePos<cx.pos;){let line=cx.state.doc.lineAt(statePos),end=Math.min(cx.pos,line.to);if(line.length){let indentation=overrideIndentation?overrideIndentation(line.from):-1,stream=new StringStream(line.text,cx.state.tabSize,cx.unit,0>indentation?void 0:indentation);for(;stream.pos<end-line.from;)readToken(this.streamParser.token,stream,state)}else this.streamParser.blankLine(state,cx.unit);if(end==cx.pos)break;statePos=line.to+1}let line=cx.lineAt(cx.pos);return overrideIndentation&&null==from&&IndentedFrom.set(cx.state,line.from),this.streamParser.indent(state,/^\s*(.*)/.exec(line.text)[1],cx)}get allowsNesting(){return!1}}class Parse{constructor(lang,input,fragments,ranges){this.lang=lang,this.input=input,this.fragments=fragments,this.ranges=ranges,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=ranges[ranges.length-1].to;let context=ParseContext.get(),from=ranges[0].from,{state,tree}=findStartInFragments(lang,fragments,from,this.to,null===context||void 0===context?void 0:context.state);this.state=state,this.parsedPos=this.chunkStart=from+tree.length;for(let i=0;i<tree.children.length;i++)this.chunks.push(tree.children[i]),this.chunkPos.push(tree.positions[i]);context&&this.parsedPos<context.viewport.from-1e5/* C.MaxDistanceBeforeViewport */&&ranges.some(r=>r.from<=context.viewport.from&&r.to>=context.viewport.from)&&(this.state=this.lang.streamParser.startState(getIndentUnit(context.state)),context.skipUntilInView(this.parsedPos,context.viewport.from),this.parsedPos=context.viewport.from),this.moveRangeIndex()}advance(){let context=ParseContext.get(),parseEnd=null==this.stoppedAt?this.to:Math.min(this.to,this.stoppedAt),end=Math.min(parseEnd,this.chunkStart+512/* C.ChunkSize */);for(context&&(end=Math.min(end,context.viewport.to));this.parsedPos<end;)this.parseLine(context);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=parseEnd?this.finish():context&&this.parsedPos>=context.viewport.to?(context.skipUntilInView(this.parsedPos,parseEnd),this.finish()):null}stopAt(pos){this.stoppedAt=pos}lineAfter(pos){let chunk=this.input.chunk(pos);if(!this.input.lineChunks){let eol=chunk.indexOf("\n");-1<eol&&(chunk=chunk.slice(0,eol))}else"\n"==chunk&&(chunk="");return pos+chunk.length<=this.to?chunk:chunk.slice(0,this.to-pos)}nextLine(){let from=this.parsedPos,line=this.lineAfter(from),end=from+line.length;for(let rangeEnd,index=this.rangeIndex;;){if(rangeEnd=this.ranges[index].to,rangeEnd>=end)break;if(line=line.slice(0,rangeEnd-(end-line.length)),index++,index==this.ranges.length)break;let rangeStart=this.ranges[index].from,after=this.lineAfter(rangeStart);line+=after,end=rangeStart+after.length}return{line,end}}skipGapsTo(pos,offset,side){for(;;){let end=this.ranges[this.rangeIndex].to,offPos=pos+offset;if(0<side?end>offPos:end>=offPos)break;let start=this.ranges[++this.rangeIndex].from;offset+=start-end}return offset}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(id,from,to,offset){let size=4;if(1<this.ranges.length){offset=this.skipGapsTo(from,offset,1),from+=offset;let len0=this.chunk.length;offset=this.skipGapsTo(to,offset,-1),to+=offset,size+=this.chunk.length-len0}let last=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&4==size&&0<=last&&this.chunk[last]==id&&this.chunk[last+2]==from?this.chunk[last+2]=to:this.chunk.push(id,from,to,size),offset}parseLine(context){let{line,end}=this.nextLine(),offset=0,{streamParser}=this.lang,stream=new StringStream(line,context?context.state.tabSize:4,context?getIndentUnit(context.state):2);if(stream.eol())streamParser.blankLine(this.state,stream.indentUnit);else for(;!stream.eol();){let token=readToken(streamParser.token,stream,this.state);if(token&&(offset=this.emitToken(this.lang.tokenTable.resolve(token),this.parsedPos+stream.start,this.parsedPos+stream.pos,offset)),1e4<stream.start/* C.MaxLineLength */)break}this.parsedPos=end,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let tree=common.Tree.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet,topID:0,maxBufferLength:512/* C.ChunkSize */,reused:this.chunkReused});tree=new common.Tree(tree.type,tree.children,tree.positions,tree.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(tree),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new common.Tree(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}const noTokens=Object.create(null),typeArray=[common.NodeType.none],nodeSet=new common.NodeSet(typeArray),warned=[],byTag=Object.create(null),defaultTable=Object.create(null);// Cache of node types by name and tags
for(let[legacyName,name]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])defaultTable[legacyName]=createTokenType(noTokens,name);class TokenTable{constructor(extra){this.extra=extra,this.table=Object.assign(Object.create(null),defaultTable)}resolve(tag){return tag?this.table[tag]||(this.table[tag]=createTokenType(this.extra,tag)):0}}const defaultTokenTable=new TokenTable(noTokens),alwaysIsolate=state.Facet.define({combine:values=>values.some(x=>x)}),isolateMarks=view.ViewPlugin.fromClass(class{constructor(view$1){this.always=view$1.state.facet(alwaysIsolate)||view$1.textDirection!=view.Direction.LTR||view$1.state.facet(view.EditorView.perLineTextDirection),this.hasRTL=!this.always&&textHasRTL(view$1.state.doc),this.tree=syntaxTree(view$1.state),this.decorations=this.always||this.hasRTL?buildDeco(view$1,this.tree,this.always):view.Decoration.none}update(update){let always=update.state.facet(alwaysIsolate)||update.view.textDirection!=view.Direction.LTR||update.state.facet(view.EditorView.perLineTextDirection);if(always||this.hasRTL||!changeAddsRTL(update.changes)||(this.hasRTL=!0),always||this.hasRTL){let tree=syntaxTree(update.state);(always!=this.always||tree!=this.tree||update.docChanged||update.viewportChanged)&&(this.tree=tree,this.always=always,this.decorations=buildDeco(update.view,tree,always))}}},{provide:plugin=>{function access(view$1){var _a,_b;return null!==(_b=null===(_a=view$1.plugin(plugin))||void 0===_a?void 0:_a.decorations)&&void 0!==_b?_b:view.Decoration.none}return[view.EditorView.outerDecorations.of(access),state.Prec.lowest(view.EditorView.bidiIsolatedRanges.of(access))]}}),marks={rtl:view.Decoration.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:view.Direction.RTL}),ltr:view.Decoration.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:view.Direction.LTR}),auto:view.Decoration.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};return dist.DocInput=DocInput,dist.HighlightStyle=HighlightStyle,dist.IndentContext=IndentContext,dist.LRLanguage=LRLanguage,dist.Language=Language,dist.LanguageDescription=LanguageDescription,dist.LanguageSupport=LanguageSupport,dist.ParseContext=ParseContext,dist.StreamLanguage=StreamLanguage,dist.StringStream=StringStream,dist.TreeIndentContext=TreeIndentContext,dist.bidiIsolates=bidiIsolates,dist.bracketMatching=bracketMatching,dist.bracketMatchingHandle=bracketMatchingHandle,dist.codeFolding=codeFolding,dist.continuedIndent=continuedIndent,dist.defaultHighlightStyle=defaultHighlightStyle,dist.defineLanguageFacet=defineLanguageFacet,dist.delimitedIndent=delimitedIndent,dist.ensureSyntaxTree=ensureSyntaxTree,dist.flatIndent=flatIndent,dist.foldAll=foldAll,dist.foldCode=foldCode,dist.foldEffect=foldEffect,dist.foldGutter=foldGutter,dist.foldInside=foldInside,dist.foldKeymap=foldKeymap,dist.foldNodeProp=foldNodeProp,dist.foldService=foldService,dist.foldState=foldState,dist.foldable=foldable,dist.foldedRanges=foldedRanges,dist.forceParsing=forceParsing,dist.getIndentUnit=getIndentUnit,dist.getIndentation=getIndentation,dist.highlightingFor=highlightingFor,dist.indentNodeProp=indentNodeProp,dist.indentOnInput=indentOnInput,dist.indentRange=indentRange,dist.indentService=indentService,dist.indentString=indentString,dist.indentUnit=indentUnit,dist.language=language,dist.languageDataProp=languageDataProp,dist.matchBrackets=matchBrackets,dist.sublanguageProp=sublanguageProp,dist.syntaxHighlighting=syntaxHighlighting,dist.syntaxParserRunning=syntaxParserRunning,dist.syntaxTree=syntaxTree,dist.syntaxTreeAvailable=syntaxTreeAvailable,dist.toggleFold=toggleFold,dist.unfoldAll=unfoldAll,dist.unfoldCode=unfoldCode,dist.unfoldEffect=unfoldEffect,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}