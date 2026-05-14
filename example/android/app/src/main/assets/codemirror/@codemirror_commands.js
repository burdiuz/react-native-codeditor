async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/state"),require$$1=await requireAsyncModule("@codemirror/view"),require$$2=await requireAsyncModule("@codemirror/language"),require$$3=await requireAsyncModule("@lezer/common"),dist={},distExports=function requireDist(){function command(f,option){return({state,dispatch})=>{if(state.readOnly)return!1;let tr=f(option,state);return!!tr&&(dispatch(state.update(tr)),!0)}}/**
	Comment or uncomment the current selection using line comments.
	The line comment syntax is taken from the
	[`commentTokens`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) [language
	data](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt).
	*/function getConfig(state,pos){let data=state.languageDataAt("commentTokens",pos,1);return data.length?data[0]:{}}/**
	Determines if the given range is block-commented in the given
	state.
	*/function findBlockComment(state,{open,close},from,to){let textBefore=state.sliceDoc(from-SearchMargin,from),textAfter=state.sliceDoc(to,to+SearchMargin),spaceBefore=/\s*$/.exec(textBefore)[0].length,spaceAfter=/^\s*/.exec(textAfter)[0].length,beforeOff=textBefore.length-spaceBefore;if(textBefore.slice(beforeOff-open.length,beforeOff)==open&&textAfter.slice(spaceAfter,spaceAfter+close.length)==close)return{open:{pos:from-spaceBefore,margin:spaceBefore&&1},close:{pos:to+spaceAfter,margin:spaceAfter&&1}};let startText,endText;100>=to-from?startText=endText=state.sliceDoc(from,to):(startText=state.sliceDoc(from,from+SearchMargin),endText=state.sliceDoc(to-SearchMargin,to));let startSpace=/^\s*/.exec(startText)[0].length,endSpace=/\s*$/.exec(endText)[0].length,endOff=endText.length-endSpace-close.length;return startText.slice(startSpace,startSpace+open.length)==open&&endText.slice(endOff,endOff+close.length)==close?{open:{pos:from+startSpace+open.length,margin:/\s/.test(startText.charAt(startSpace+open.length))?1:0},close:{pos:to-endSpace-close.length,margin:/\s/.test(endText.charAt(endOff-1))?1:0}}:null}function selectedLineRanges(state){let ranges=[];for(let r of state.selection.ranges){let fromLine=state.doc.lineAt(r.from),toLine=r.to<=fromLine.to?fromLine:state.doc.lineAt(r.to);toLine.from>fromLine.from&&toLine.from==r.to&&(toLine=r.to==fromLine.to+1?fromLine:state.doc.lineAt(r.to-1));let last=ranges.length-1;0<=last&&ranges[last].to>fromLine.from?ranges[last].to=toLine.to:ranges.push({from:fromLine.from+/^\s*/.exec(fromLine.text)[0].length,to:toLine.to})}return ranges}// Performs toggle, comment and uncomment of block comments in
// languages that support them.
function changeBlockComment(option,state,ranges=state.selection.ranges){let tokens=ranges.map(r=>getConfig(state,r.from).block);if(!tokens.every(c=>c))return null;let comments=ranges.map((r,i)=>findBlockComment(state,tokens[i],r.from,r.to));if(2!=option/* CommentOption.Uncomment */&&!comments.every(c=>c))return{changes:state.changes(ranges.map((range,i)=>comments[i]?[]:[{from:range.from,insert:tokens[i].open+" "},{from:range.to,insert:" "+tokens[i].close}]))};if(1!=option/* CommentOption.Comment */&&comments.some(c=>c)){let changes=[];for(let comment,i=0;i<comments.length;i++)if(comment=comments[i]){let token=tokens[i],{open,close}=comment;changes.push({from:open.pos-token.open.length,to:open.pos+open.margin},{from:close.pos-close.margin,to:close.pos+token.close.length})}return{changes}}return null}// Performs toggle, comment and uncomment of line comments.
function changeLineComment(option,state,ranges=state.selection.ranges){let lines=[],prevLine=-1;ranges:for(let{from,to}of ranges){let token,startI=lines.length,minIndent=1e9;for(let line,pos=from;pos<=to;){if(line=state.doc.lineAt(pos),null==token&&(token=getConfig(state,line.from).line,!token))continue ranges;if(line.from>prevLine&&(from==to||to>line.from)){prevLine=line.from;let indent=/^\s*/.exec(line.text)[0].length,empty=indent==line.length,comment=line.text.slice(indent,indent+token.length)==token?indent:-1;indent<line.text.length&&indent<minIndent&&(minIndent=indent),lines.push({line,comment,token,indent,empty,single:!1})}pos=line.to+1}if(1e9>minIndent)for(let i=startI;i<lines.length;i++)lines[i].indent<lines[i].line.text.length&&(lines[i].indent=minIndent);lines.length==startI+1&&(lines[startI].single=!0)}if(2!=option/* CommentOption.Uncomment */&&lines.some(l=>0>l.comment&&(!l.empty||l.single))){let changes=[];for(let{line,token,indent,empty,single}of lines)(single||!empty)&&changes.push({from:line.from+indent,insert:token+" "});let changeSet=state.changes(changes);return{changes:changeSet,selection:state.selection.map(changeSet,1)}}if(1!=option/* CommentOption.Comment */&&lines.some(l=>0<=l.comment)){let changes=[];for(let{line,comment,token}of lines)if(0<=comment){let from=line.from+comment,to=from+token.length;" "==line.text[to-line.from]&&to++,changes.push({from,to})}return{changes}}return null}/**
	Create a history extension with the given configuration.
	*/function history(config={}){return[historyField_,historyConfig.of(config),view.EditorView.domEventHandlers({beforeinput(e,view){let command="historyUndo"==e.inputType?undo:"historyRedo"==e.inputType?redo:null;return!!command&&(e.preventDefault(),command(view))}})]}/**
	The state field used to store the history data. Should probably
	only be used when you want to
	[serialize](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) or
	[deserialize](https://codemirror.net/6/docs/ref/#state.EditorState^fromJSON) state objects in a way
	that preserves history.
	*/function cmd(side,selection){return function({state,dispatch}){if(!selection&&state.readOnly)return!1;let historyState=state.field(historyField_,!1);if(!historyState)return!1;let tr=historyState.pop(side,state,selection);return!!tr&&(dispatch(tr),!0)}}/**
	Undo a single group of history events. Returns false if no group
	was available.
	*/function depth(side){return function(state){let histState=state.field(historyField_,!1);if(!histState)return 0;let branch=0==side/* BranchName.Done */?histState.done:histState.undone;return branch.length-(branch.length&&!branch[0].changes?1:0)}}/**
	The amount of undoable change events available in a given state.
	*/function updateBranch(branch,to,maxLen,newEvent){let start=to+1>maxLen+20?to-maxLen-1:0,newBranch=branch.slice(start,to);return newBranch.push(newEvent),newBranch}function isAdjacent(a,b){let ranges=[],isAdjacent=!1;return a.iterChangedRanges((f,t)=>ranges.push(f,t)),b.iterChangedRanges((_f,_t,f,t)=>{for(let i=0;i<ranges.length;){let from=ranges[i++],to=ranges[i++];t>=from&&f<=to&&(isAdjacent=!0)}}),isAdjacent}function eqSelectionShape(a,b){return a.ranges.length==b.ranges.length&&0===a.ranges.filter((r,i)=>r.empty!=b.ranges[i].empty).length}function conc(a,b){return a.length?b.length?a.concat(b):a:b}function addSelection(branch,selection){if(!branch.length)return[HistEvent.selection([selection])];else{let lastEvent=branch[branch.length-1],sels=lastEvent.selectionsAfter.slice(Math.max(0,lastEvent.selectionsAfter.length-MaxSelectionsPerEvent));return sels.length&&sels[sels.length-1].eq(selection)?branch:(sels.push(selection),updateBranch(branch,branch.length-1,1e9,lastEvent.setSelAfter(sels)))}}// Assumes the top item has one or more selectionAfter values
function popSelection(branch){let last=branch[branch.length-1],newBranch=branch.slice();return newBranch[branch.length-1]=last.setSelAfter(last.selectionsAfter.slice(0,last.selectionsAfter.length-1)),newBranch}// Add a mapping to the top event in the given branch. If this maps
// away all the changes and effects in that item, drop it and
// propagate the mapping to the next item.
function addMappingToBranch(branch,mapping){if(!branch.length)return branch;let length=branch.length,selections=none;for(;length;){let event=mapEvent(branch[length-1],mapping,selections);if(event.changes&&!event.changes.empty||event.effects.length){// Event survived mapping
let result=branch.slice(0,length);return result[length-1]=event,result}mapping=event.mapped,length--,selections=event.selectionsAfter}return selections.length?[HistEvent.selection(selections)]:none}function mapEvent(event,mapping,extraSelections){let selections=conc(event.selectionsAfter.length?event.selectionsAfter.map(s=>s.map(mapping)):none,extraSelections);// Change-less events don't store mappings (they are always the last event in a branch)
if(!event.changes)return HistEvent.selection(selections);let mappedChanges=event.changes.map(mapping),before=mapping.mapDesc(event.changes,!0),fullMapping=event.mapped?event.mapped.composeDesc(before):before;return new HistEvent(mappedChanges,state.StateEffect.mapEffects(event.effects,mapping),fullMapping,event.startSelection.map(before),selections)}function updateSel(sel,by){return state.EditorSelection.create(sel.ranges.map(by),sel.mainIndex)}function setSel(state,selection){return state.update({selection,scrollIntoView:!0,userEvent:"select"})}function moveSel({state,dispatch},how){let selection=updateSel(state.selection,how);return!selection.eq(state.selection,!0)&&(dispatch(setSel(state,selection)),!0)}function rangeEnd(range,forward){return state.EditorSelection.cursor(forward?range.to:range.from)}function cursorByChar(view,forward){return moveSel(view,range=>range.empty?view.moveByChar(range,forward):rangeEnd(range,forward))}function ltrAtCursor(view$1){return view$1.textDirectionAt(view$1.state.selection.main.head)==view.Direction.LTR}/**
	Move the selection one character to the left (which is backward in
	left-to-right text, forward in right-to-left text).
	*/function byCharLogical(state$1,range,forward){let pos=range.head,line=state$1.doc.lineAt(pos);return pos=pos==(forward?line.to:line.from)?forward?Math.min(state$1.doc.length,line.to+1):Math.max(0,line.from-1):line.from+state.findClusterBreak(line.text,pos-line.from,forward),state.EditorSelection.cursor(pos,forward?-1:1)}function moveByCharLogical(target,forward){return moveSel(target,range=>range.empty?byCharLogical(target.state,range,forward):rangeEnd(range,forward))}/**
	Move the selection one character forward, in logical
	(non-text-direction-aware) string index order.
	*/function cursorByGroup(view,forward){return moveSel(view,range=>range.empty?view.moveByGroup(range,forward):rangeEnd(range,forward))}/**
	Move the selection to the left across one group of word or
	non-word (but also non-space) characters.
	*/function toGroupStart(view,pos,start){let categorize=view.state.charCategorizer(pos),cat=categorize(start),initial=cat!=state.CharCategory.Space;return next=>{let nextCat=categorize(next);return nextCat==state.CharCategory.Space?(initial=!1,!0):initial&&nextCat==cat}}/**
	Move the cursor one group forward in the default Windows style,
	where it moves to the start of the next group.
	*/function moveBySubword(view,range,forward){let categorize=view.state.charCategorizer(range.from),cat=state.CharCategory.Space,pos=range.from,steps=0,done=!1,sawUpper=!1,sawLower=!1,step=next=>{if(done)return!1;pos+=forward?next.length:-next.length;let ahead,nextCat=categorize(next);if(nextCat==state.CharCategory.Word&&128>next.charCodeAt(0)&&/[\W_]/.test(next)&&(nextCat=-1),cat==state.CharCategory.Space&&(cat=nextCat),cat!=nextCat)return!1;if(cat==state.CharCategory.Word)if(next.toLowerCase()==next){if(!forward&&sawUpper)return!1;sawLower=!0}else if(sawLower){if(forward)return!1;done=!0}else{if(sawUpper&&forward&&categorize(ahead=view.state.sliceDoc(pos,pos+1))==state.CharCategory.Word&&ahead.toLowerCase()==ahead)return!1;sawUpper=!0}return steps++,!0},end=view.moveByChar(range,forward,start=>(step(start),step));if(segmenter&&cat==state.CharCategory.Word&&end.from==range.from+steps*(forward?1:-1)){let from=Math.min(range.head,end.head),to=Math.max(range.head,end.head),skipped=view.state.sliceDoc(from,to);if(1<skipped.length&&/[\u4E00-\uffff]/.test(skipped)){let segments=Array.from(segmenter.segment(skipped));if(1<segments.length)return forward?state.EditorSelection.cursor(range.head+segments[1].index,-1):state.EditorSelection.cursor(end.head+segments[segments.length-1].index,1)}}return end}function cursorBySubword(view,forward){return moveSel(view,range=>range.empty?moveBySubword(view,range,forward):rangeEnd(range,forward))}/**
	Move the selection one group or camel-case subword forward.
	*/function interestingNode(state,node,bracketProp){if(node.type.prop(bracketProp))return!0;let len=node.to-node.from;return len&&(2<len||/[^\s,.;:]/.test(state.sliceDoc(node.from,node.to)))||node.firstChild}function moveBySyntax(state$1,start,forward){let pos=language.syntaxTree(state$1).resolveInner(start.head),bracketProp=forward?common.NodeProp.closedBy:common.NodeProp.openedBy;// Scan forward through child nodes to see if there's an interesting
// node ahead.
for(let next,at=start.head;;){if(next=forward?pos.childAfter(at):pos.childBefore(at),!next)break;interestingNode(state$1,next,bracketProp)?pos=next:at=forward?next.to:next.from}let match,newPos,bracket=pos.type.prop(bracketProp);return newPos=bracket&&(match=forward?language.matchBrackets(state$1,pos.from,1):language.matchBrackets(state$1,pos.to,-1))&&match.matched?forward?match.end.to:match.end.from:forward?pos.to:pos.from,state.EditorSelection.cursor(newPos,forward?-1:1)}/**
	Move the cursor over the next syntactic element to the left.
	*/function cursorByLine(view,forward){return moveSel(view,range=>{if(!range.empty)return rangeEnd(range,forward);let moved=view.moveVertically(range,forward);return moved.head==range.head?view.moveToLineBoundary(range,forward):moved})}/**
	Move the selection one line up.
	*/function pageInfo(view$1){let height,selfScroll=view$1.scrollDOM.clientHeight<view$1.scrollDOM.scrollHeight-2,marginTop=0,marginBottom=0;if(selfScroll){for(let source of view$1.state.facet(view.EditorView.scrollMargins)){let margins=source(view$1);(null===margins||void 0===margins?void 0:margins.top)&&(marginTop=Math.max(null===margins||void 0===margins?void 0:margins.top,marginTop)),(null===margins||void 0===margins?void 0:margins.bottom)&&(marginBottom=Math.max(null===margins||void 0===margins?void 0:margins.bottom,marginBottom))}height=view$1.scrollDOM.clientHeight-marginTop-marginBottom}else height=(view$1.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop,marginBottom,selfScroll,height:Math.max(view$1.defaultLineHeight,height-5)}}function cursorByPage(view$1,forward){let page=pageInfo(view$1),{state}=view$1,selection=updateSel(state.selection,range=>range.empty?view$1.moveVertically(range,forward,page.height):rangeEnd(range,forward));if(selection.eq(state.selection))return!1;let effect;if(page.selfScroll){let startPos=view$1.coordsAtPos(state.selection.main.head),scrollRect=view$1.scrollDOM.getBoundingClientRect(),scrollTop=scrollRect.top+page.marginTop,scrollBottom=scrollRect.bottom-page.marginBottom;startPos&&startPos.top>scrollTop&&startPos.bottom<scrollBottom&&(effect=view.EditorView.scrollIntoView(selection.main.head,{y:"start",yMargin:startPos.top-scrollTop}))}return view$1.dispatch(setSel(state,selection),{effects:effect}),!0}/**
	Move the selection one page up.
	*/function moveByLineBoundary(view,start,forward){let line=view.lineBlockAt(start.head),moved=view.moveToLineBoundary(start,forward);if(moved.head==start.head&&moved.head!=(forward?line.to:line.from)&&(moved=view.moveToLineBoundary(start,forward,!1)),!forward&&moved.head==line.from&&line.length){let space=/^\s*/.exec(view.state.sliceDoc(line.from,Math.min(line.from+100,line.to)))[0].length;space&&start.head!=line.from+space&&(moved=state.EditorSelection.cursor(line.from+space))}return moved}/**
	Move the selection to the next line wrap point, or to the end of
	the line if there isn't one left on this line.
	*/function toMatchingBracket(state$1,dispatch,extend){let found=!1,selection=updateSel(state$1.selection,range=>{let matching=language.matchBrackets(state$1,range.head,-1)||language.matchBrackets(state$1,range.head,1)||0<range.head&&language.matchBrackets(state$1,range.head-1,1)||range.head<state$1.doc.length&&language.matchBrackets(state$1,range.head+1,-1);if(!matching||!matching.end)return range;found=!0;let head=matching.start.from==range.head?matching.end.to:matching.end.from;return extend?state.EditorSelection.range(range.anchor,head):state.EditorSelection.cursor(head)});return!!found&&(dispatch(setSel(state$1,selection)),!0)}/**
	Move the selection to the bracket matching the one it is currently
	on, if any.
	*/function extendSel(target,how){let selection=updateSel(target.state.selection,range=>{let head=how(range);return state.EditorSelection.range(range.anchor,head.head,head.goalColumn,head.bidiLevel||void 0,head.assoc)});return!selection.eq(target.state.selection)&&(target.dispatch(setSel(target.state,selection)),!0)}function selectByChar(view,forward){return extendSel(view,range=>view.moveByChar(range,forward))}/**
	Move the selection head one character to the left, while leaving
	the anchor in place.
	*/function selectByGroup(view,forward){return extendSel(view,range=>view.moveByGroup(range,forward))}/**
	Move the selection head one [group](https://codemirror.net/6/docs/ref/#commands.cursorGroupLeft) to
	the left.
	*/function selectBySubword(view,forward){return extendSel(view,range=>moveBySubword(view,range,forward))}/**
	Move the selection head one group or camel-case subword forward.
	*/function selectByLine(view,forward){return extendSel(view,range=>view.moveVertically(range,forward))}/**
	Move the selection head one line up.
	*/function selectByPage(view,forward){return extendSel(view,range=>view.moveVertically(range,forward,pageInfo(view).height))}/**
	Move the selection head one page up.
	*/function addCursorVertically(view,forward){let{state:state$1}=view,sel=state$1.selection,ranges=state$1.selection.ranges.slice();for(let range of state$1.selection.ranges){let line=state$1.doc.lineAt(range.head);if(forward?line.to<view.state.doc.length:0<line.from)for(let next,cur=range;;)if(next=view.moveVertically(cur,forward),next.head<line.from||next.head>line.to){ranges.some(r=>r.head==next.head)||ranges.push(next);break}else if(next.head==cur.head)break;else cur=next}return ranges.length!=sel.ranges.length&&(view.dispatch(setSel(state$1,state.EditorSelection.create(ranges,ranges.length-1))),!0)}/**
	Expand the selection by adding a cursor above the heads of
	currently selected ranges.
	*/function deleteBy(target,by){if(target.state.readOnly)return!1;let event="delete.selection",{state:state$1}=target,changes=state$1.changeByRange(range=>{let{from,to}=range;if(from==to){let towards=by(range);towards<from?(event="delete.backward",towards=skipAtomic(target,towards,!1)):towards>from&&(event="delete.forward",towards=skipAtomic(target,towards,!0)),from=Math.min(from,towards),to=Math.max(to,towards)}else from=skipAtomic(target,from,!1),to=skipAtomic(target,to,!0);return from==to?{range}:{changes:{from,to},range:state.EditorSelection.cursor(from,from<range.head?-1:1)}});return!changes.changes.empty&&(target.dispatch(state$1.update(changes,{scrollIntoView:!0,userEvent:event,effects:"delete.selection"==event?view.EditorView.announce.of(state$1.phrase("Selection deleted")):void 0})),!0)}function skipAtomic(target,pos,forward){if(target instanceof view.EditorView)for(let ranges of target.state.facet(view.EditorView.atomicRanges).map(f=>f(target)))ranges.between(pos,pos,(from,to)=>{from<pos&&to>pos&&(pos=forward?to:from)});return pos}function selectedLineBlocks(state){let blocks=[],upto=-1;for(let range of state.selection.ranges){let startLine=state.doc.lineAt(range.from),endLine=state.doc.lineAt(range.to);if(range.empty||range.to!=endLine.from||(endLine=state.doc.lineAt(range.to-1)),upto>=startLine.number){let prev=blocks[blocks.length-1];prev.to=endLine.to,prev.ranges.push(range)}else blocks.push({from:startLine.from,to:endLine.to,ranges:[range]});upto=endLine.number+1}return blocks}function moveLine(state$1,dispatch,forward){if(state$1.readOnly)return!1;let changes=[],ranges=[];for(let block of selectedLineBlocks(state$1)){if(forward?block.to==state$1.doc.length:0==block.from)continue;let nextLine=state$1.doc.lineAt(forward?block.to+1:block.from-1),size=nextLine.length+1;if(forward){changes.push({from:block.to,to:nextLine.to},{from:block.from,insert:nextLine.text+state$1.lineBreak});for(let r of block.ranges)ranges.push(state.EditorSelection.range(Math.min(state$1.doc.length,r.anchor+size),Math.min(state$1.doc.length,r.head+size)))}else{changes.push({from:nextLine.from,to:block.from},{from:block.to,insert:state$1.lineBreak+nextLine.text});for(let r of block.ranges)ranges.push(state.EditorSelection.range(r.anchor-size,r.head-size))}}return!!changes.length&&(dispatch(state$1.update({changes,scrollIntoView:!0,selection:state.EditorSelection.create(ranges,state$1.selection.mainIndex),userEvent:"move.line"})),!0)}/**
	Move the selected lines up one line.
	*/function copyLine(state,dispatch,forward){if(state.readOnly)return!1;let changes=[];for(let block of selectedLineBlocks(state))forward?changes.push({from:block.from,insert:state.doc.slice(block.from,block.to)+state.lineBreak}):changes.push({from:block.to,insert:state.lineBreak+state.doc.slice(block.from,block.to)});let changeSet=state.changes(changes);return dispatch(state.update({changes:changeSet,selection:state.selection.map(changeSet,forward?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}/**
	Create a copy of the selected lines. Keep the selection in the top copy.
	*/function isBetweenBrackets(state,pos){if(/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos-1,pos+1)))return{from:pos,to:pos};let closedBy,context=language.syntaxTree(state).resolveInner(pos),before=context.childBefore(pos),after=context.childAfter(pos);return before&&after&&before.to<=pos&&after.from>=pos&&(closedBy=before.type.prop(common.NodeProp.closedBy))&&-1<closedBy.indexOf(after.name)&&state.doc.lineAt(before.to).from==state.doc.lineAt(after.from).from&&!/\S/.test(state.sliceDoc(before.to,after.from))?{from:before.to,to:after.from}:null}/**
	Replace the selection with a newline and indent the newly created
	line(s). If the current line consists only of whitespace, this
	will also delete that whitespace. When the cursor is between
	matching brackets, an additional newline will be inserted after
	the cursor.
	*/function newlineAndIndent(atEof){return({state:state$1,dispatch})=>{if(state$1.readOnly)return!1;let changes=state$1.changeByRange(range=>{let{from,to}=range,line=state$1.doc.lineAt(from),explode=!atEof&&from==to&&isBetweenBrackets(state$1,from);atEof&&(from=to=(to<=line.to?line:state$1.doc.lineAt(to)).to);let cx=new language.IndentContext(state$1,{simulateBreak:from,simulateDoubleBreak:!!explode}),indent=language.getIndentation(cx,from);for(null==indent&&(indent=state.countColumn(/^\s*/.exec(state$1.doc.lineAt(from).text)[0],state$1.tabSize));to<line.to&&/\s/.test(line.text[to-line.from]);)to++;explode?({from,to}=explode):from>line.from&&from<line.from+100&&!/\S/.test(line.text.slice(0,from))&&(from=line.from);let insert=["",language.indentString(state$1,indent)];return explode&&insert.push(language.indentString(state$1,cx.lineIndent(line.from,-1))),{changes:{from,to,insert:state.Text.of(insert)},range:state.EditorSelection.cursor(from+1+insert[1].length)}});return dispatch(state$1.update(changes,{scrollIntoView:!0,userEvent:"input"})),!0}}function changeBySelectedLine(state$1,f){let atLine=-1;return state$1.changeByRange(range=>{let changes=[];for(let line,pos=range.from;pos<=range.to;)line=state$1.doc.lineAt(pos),line.number>atLine&&(range.empty||range.to>line.from)&&(f(line,changes,range),atLine=line.number),pos=line.to+1;let changeSet=state$1.changes(changes);return{changes,range:state.EditorSelection.range(changeSet.mapPos(range.anchor,1),changeSet.mapPos(range.head,1))}})}/**
	Auto-indent the selected lines. This uses the [indentation service
	facet](https://codemirror.net/6/docs/ref/#language.indentService) as source for auto-indent
	information.
	*/if(hasRequiredDist)return dist;hasRequiredDist=1;var state=require$$0,view=require$$1,language=require$$2,common=require$$3;/**
	Comment or uncomment the current selection. Will use line comments
	if available, otherwise falling back to block comments.
	*/const toggleComment=target=>{let{state}=target,line=state.doc.lineAt(state.selection.main.from),config=getConfig(target.state,line.from);return config.line?toggleLineComment(target):!!config.block&&toggleBlockCommentByLine(target)},toggleLineComment=command(changeLineComment,0/* CommentOption.Toggle */),lineComment=command(changeLineComment,1/* CommentOption.Comment */),lineUncomment=command(changeLineComment,2/* CommentOption.Uncomment */),toggleBlockComment=command(changeBlockComment,0/* CommentOption.Toggle */),blockComment=command(changeBlockComment,1/* CommentOption.Comment */),blockUncomment=command(changeBlockComment,2/* CommentOption.Uncomment */),toggleBlockCommentByLine=command((o,s)=>changeBlockComment(o,s,selectedLineRanges(s)),0/* CommentOption.Toggle */),SearchMargin=50,fromHistory=state.Annotation.define(),isolateHistory=state.Annotation.define(),invertedEffects=state.Facet.define(),historyConfig=state.Facet.define({combine(configs){return state.combineConfig(configs,{minDepth:100,newGroupDelay:500,joinToEvent:(_t,isAdjacent)=>isAdjacent},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(a,b)=>(tr,adj)=>a(tr,adj)||b(tr,adj)})}}),historyField_=state.StateField.define({create(){return HistoryState.empty},update(state$1,tr){let config=tr.state.facet(historyConfig),fromHist=tr.annotation(fromHistory);if(fromHist){let item=HistEvent.fromTransaction(tr,fromHist.selection),from=fromHist.side,other=0==from/* BranchName.Done */?state$1.undone:state$1.done;return other=item?updateBranch(other,other.length,config.minDepth,item):addSelection(other,tr.startState.selection),new HistoryState(0==from/* BranchName.Done */?fromHist.rest:other,0==from/* BranchName.Done */?other:fromHist.rest)}let isolate=tr.annotation(isolateHistory);if(("full"==isolate||"before"==isolate)&&(state$1=state$1.isolate()),!1===tr.annotation(state.Transaction.addToHistory))return tr.changes.empty?state$1:state$1.addMapping(tr.changes.desc);let event=HistEvent.fromTransaction(tr),time=tr.annotation(state.Transaction.time),userEvent=tr.annotation(state.Transaction.userEvent);return event?state$1=state$1.addChanges(event,time,userEvent,config,tr):tr.selection&&(state$1=state$1.addSelection(tr.startState.selection,time,userEvent,config.newGroupDelay)),("full"==isolate||"after"==isolate)&&(state$1=state$1.isolate()),state$1},toJSON(value){return{done:value.done.map(e=>e.toJSON()),undone:value.undone.map(e=>e.toJSON())}},fromJSON(json){return new HistoryState(json.done.map(HistEvent.fromJSON),json.undone.map(HistEvent.fromJSON))}}),historyField=historyField_,undo=cmd(0/* BranchName.Done */,!1),redo=cmd(1/* BranchName.Undone */,!1),undoSelection=cmd(0/* BranchName.Done */,!0),redoSelection=cmd(1/* BranchName.Undone */,!0),undoDepth=depth(0/* BranchName.Done */),redoDepth=depth(1/* BranchName.Undone */);/**
	Comment the current selection using line comments.
	*/ /**
	Uncomment the current selection using line comments.
	*/ /**
	Comment or uncomment the current selection using block comments.
	The block comment syntax is taken from the
	[`commentTokens`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) [language
	data](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt).
	*/ /**
	Comment the current selection using block comments.
	*/ /**
	Uncomment the current selection using block comments.
	*/ /**
	Comment or uncomment the lines around the current selection using
	block comments.
	*/ /**
	Transaction annotation that will prevent that transaction from
	being combined with other transactions in the undo history. Given
	`"before"`, it'll prevent merging with previous transactions. With
	`"after"`, subsequent transactions won't be combined with this
	one. With `"full"`, the transaction is isolated on both sides.
	*/ /**
	This facet provides a way to register functions that, given a
	transaction, provide a set of effects that the history should
	store when inverting the transaction. This can be used to
	integrate some kinds of effects in the history, so that they can
	be undone (and redone again).
	*/ /**
	Redo a group of history events. Returns false if no group was
	available.
	*/ /**
	Undo a change or selection change.
	*/ /**
	Redo a change or selection change.
	*/ /**
	The amount of redoable change events available in a given state.
	*/ // History events store groups of changes or effects that need to be
// undone/redone together.
class HistEvent{constructor(// The changes in this event. Normal events hold at least one
// change or effect. But it may be necessary to store selection
// events before the first change, in which case a special type of
// instance is created which doesn't hold any changes, with
// changes == startSelection == undefined
changes,// The effects associated with this event
effects,// Accumulated mapping (from addToHistory==false) that should be
// applied to events below this one.
mapped,// The selection before this event
startSelection,// Stores selection changes after this event, to be used for
// selection undo/redo.
selectionsAfter){this.changes=changes,this.effects=effects,this.mapped=mapped,this.startSelection=startSelection,this.selectionsAfter=selectionsAfter}setSelAfter(after){return new HistEvent(this.changes,this.effects,this.mapped,this.startSelection,after)}toJSON(){var _a,_b,_c;return{changes:null===(_a=this.changes)||void 0===_a?void 0:_a.toJSON(),mapped:null===(_b=this.mapped)||void 0===_b?void 0:_b.toJSON(),startSelection:null===(_c=this.startSelection)||void 0===_c?void 0:_c.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(json){return new HistEvent(json.changes&&state.ChangeSet.fromJSON(json.changes),[],json.mapped&&state.ChangeDesc.fromJSON(json.mapped),json.startSelection&&state.EditorSelection.fromJSON(json.startSelection),json.selectionsAfter.map(state.EditorSelection.fromJSON))}// This does not check `addToHistory` and such, it assumes the
// transaction needs to be converted to an item. Returns null when
// there are no changes or effects in the transaction.
static fromTransaction(tr,selection){let effects=none;for(let invert of tr.startState.facet(invertedEffects)){let result=invert(tr);result.length&&(effects=effects.concat(result))}return!effects.length&&tr.changes.empty?null:new HistEvent(tr.changes.invert(tr.startState.doc),effects,void 0,selection||tr.startState.selection,none)}static selection(selections){return new HistEvent(void 0,none,void 0,void 0,selections)}}const none=[],MaxSelectionsPerEvent=200,joinableUserEvent=/^(input\.type|delete)($|\.)/;class HistoryState{constructor(done,undone,prevTime=0,prevUserEvent=void 0){this.done=done,this.undone=undone,this.prevTime=prevTime,this.prevUserEvent=prevUserEvent}isolate(){return this.prevTime?new HistoryState(this.done,this.undone):this}addChanges(event,time,userEvent,config,tr){let done=this.done,lastEvent=done[done.length-1];return done=lastEvent&&lastEvent.changes&&!lastEvent.changes.empty&&event.changes&&(!userEvent||joinableUserEvent.test(userEvent))&&(!lastEvent.selectionsAfter.length&&time-this.prevTime<config.newGroupDelay&&config.joinToEvent(tr,isAdjacent(lastEvent.changes,event.changes))||// For compose (but not compose.start) events, always join with previous event
"input.type.compose"==userEvent)?updateBranch(done,done.length-1,config.minDepth,new HistEvent(event.changes.compose(lastEvent.changes),conc(state.StateEffect.mapEffects(event.effects,lastEvent.changes),lastEvent.effects),lastEvent.mapped,lastEvent.startSelection,none)):updateBranch(done,done.length,config.minDepth,event),new HistoryState(done,none,time,userEvent)}addSelection(selection,time,userEvent,newGroupDelay){let last=this.done.length?this.done[this.done.length-1].selectionsAfter:none;return 0<last.length&&time-this.prevTime<newGroupDelay&&userEvent==this.prevUserEvent&&userEvent&&/^select($|\.)/.test(userEvent)&&eqSelectionShape(last[last.length-1],selection)?this:new HistoryState(addSelection(this.done,selection),this.undone,time,userEvent)}addMapping(mapping){return new HistoryState(addMappingToBranch(this.done,mapping),addMappingToBranch(this.undone,mapping),this.prevTime,this.prevUserEvent)}pop(side,state,onlySelection){let branch=0==side/* BranchName.Done */?this.done:this.undone;if(0==branch.length)return null;let event=branch[branch.length-1],selection=event.selectionsAfter[0]||(event.startSelection?event.startSelection.map(event.changes.invertedDesc,1):state.selection);if(onlySelection&&event.selectionsAfter.length)return state.update({selection:event.selectionsAfter[event.selectionsAfter.length-1],annotations:fromHistory.of({side,rest:popSelection(branch),selection}),userEvent:0==side/* BranchName.Done */?"select.undo":"select.redo",scrollIntoView:!0});if(!event.changes)return null;else{let rest=1==branch.length?none:branch.slice(0,branch.length-1);return event.mapped&&(rest=addMappingToBranch(rest,event.mapped)),state.update({changes:event.changes,selection:event.startSelection,effects:event.effects,annotations:fromHistory.of({side,rest,selection}),filter:!1,userEvent:0==side/* BranchName.Done */?"undo":"redo",scrollIntoView:!0})}}}HistoryState.empty=new HistoryState(none,none);/**
	Default key bindings for the undo history.

	- Mod-z: [`undo`](https://codemirror.net/6/docs/ref/#commands.undo).
	- Mod-y (Mod-Shift-z on macOS) + Ctrl-Shift-z on Linux: [`redo`](https://codemirror.net/6/docs/ref/#commands.redo).
	- Mod-u: [`undoSelection`](https://codemirror.net/6/docs/ref/#commands.undoSelection).
	- Alt-u (Mod-Shift-u on macOS): [`redoSelection`](https://codemirror.net/6/docs/ref/#commands.redoSelection).
	*/const historyKeymap=[{key:"Mod-z",run:undo,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:redo,preventDefault:!0},{linux:"Ctrl-Shift-z",run:redo,preventDefault:!0},{key:"Mod-u",run:undoSelection,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:redoSelection,preventDefault:!0}],cursorCharLeft=view=>cursorByChar(view,!ltrAtCursor(view)),cursorCharRight=view=>cursorByChar(view,ltrAtCursor(view)),cursorCharForward=view=>cursorByChar(view,!0),cursorCharBackward=view=>cursorByChar(view,!1),cursorCharForwardLogical=target=>moveByCharLogical(target,!0),cursorCharBackwardLogical=target=>moveByCharLogical(target,!1),cursorGroupLeft=view=>cursorByGroup(view,!ltrAtCursor(view)),cursorGroupRight=view=>cursorByGroup(view,ltrAtCursor(view)),cursorGroupForward=view=>cursorByGroup(view,!0),cursorGroupBackward=view=>cursorByGroup(view,!1),cursorGroupForwardWin=view=>moveSel(view,range=>range.empty?view.moveByChar(range,!0,start=>toGroupStart(view,range.head,start)):rangeEnd(range,!0)),segmenter="undefined"!=typeof Intl&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null,cursorSubwordForward=view=>cursorBySubword(view,!0),cursorSubwordBackward=view=>cursorBySubword(view,!1),cursorSyntaxLeft=view=>moveSel(view,range=>moveBySyntax(view.state,range,!ltrAtCursor(view))),cursorSyntaxRight=view=>moveSel(view,range=>moveBySyntax(view.state,range,ltrAtCursor(view))),cursorLineUp=view=>cursorByLine(view,!1),cursorLineDown=view=>cursorByLine(view,!0),cursorPageUp=view=>cursorByPage(view,!1),cursorPageDown=view=>cursorByPage(view,!0),cursorLineBoundaryForward=view=>moveSel(view,range=>moveByLineBoundary(view,range,!0)),cursorLineBoundaryBackward=view=>moveSel(view,range=>moveByLineBoundary(view,range,!1)),cursorLineBoundaryLeft=view=>moveSel(view,range=>moveByLineBoundary(view,range,!ltrAtCursor(view))),cursorLineBoundaryRight=view=>moveSel(view,range=>moveByLineBoundary(view,range,ltrAtCursor(view))),cursorLineStart=view=>moveSel(view,range=>state.EditorSelection.cursor(view.lineBlockAt(range.head).from,1)),cursorLineEnd=view=>moveSel(view,range=>state.EditorSelection.cursor(view.lineBlockAt(range.head).to,-1)),cursorMatchingBracket=({state,dispatch})=>toMatchingBracket(state,dispatch,!1),selectMatchingBracket=({state,dispatch})=>toMatchingBracket(state,dispatch,!0),selectCharLeft=view=>selectByChar(view,!ltrAtCursor(view)),selectCharRight=view=>selectByChar(view,ltrAtCursor(view)),selectCharForward=view=>selectByChar(view,!0),selectCharBackward=view=>selectByChar(view,!1),selectCharForwardLogical=target=>extendSel(target,range=>byCharLogical(target.state,range,!0)),selectCharBackwardLogical=target=>extendSel(target,range=>byCharLogical(target.state,range,!1)),selectGroupLeft=view=>selectByGroup(view,!ltrAtCursor(view)),selectGroupRight=view=>selectByGroup(view,ltrAtCursor(view)),selectGroupForward=view=>selectByGroup(view,!0),selectGroupBackward=view=>selectByGroup(view,!1),selectGroupForwardWin=view=>extendSel(view,range=>view.moveByChar(range,!0,start=>toGroupStart(view,range.head,start))),selectSubwordForward=view=>selectBySubword(view,!0),selectSubwordBackward=view=>selectBySubword(view,!1),selectSyntaxLeft=view=>extendSel(view,range=>moveBySyntax(view.state,range,!ltrAtCursor(view))),selectSyntaxRight=view=>extendSel(view,range=>moveBySyntax(view.state,range,ltrAtCursor(view))),selectLineUp=view=>selectByLine(view,!1),selectLineDown=view=>selectByLine(view,!0),selectPageUp=view=>selectByPage(view,!1),selectPageDown=view=>selectByPage(view,!0),selectLineBoundaryForward=view=>extendSel(view,range=>moveByLineBoundary(view,range,!0)),selectLineBoundaryBackward=view=>extendSel(view,range=>moveByLineBoundary(view,range,!1)),selectLineBoundaryLeft=view=>extendSel(view,range=>moveByLineBoundary(view,range,!ltrAtCursor(view))),selectLineBoundaryRight=view=>extendSel(view,range=>moveByLineBoundary(view,range,ltrAtCursor(view))),selectLineStart=view=>extendSel(view,range=>state.EditorSelection.cursor(view.lineBlockAt(range.head).from)),selectLineEnd=view=>extendSel(view,range=>state.EditorSelection.cursor(view.lineBlockAt(range.head).to)),cursorDocStart=({state,dispatch})=>(dispatch(setSel(state,{anchor:0})),!0),cursorDocEnd=({state,dispatch})=>(dispatch(setSel(state,{anchor:state.doc.length})),!0),selectDocStart=({state,dispatch})=>(dispatch(setSel(state,{anchor:state.selection.main.anchor,head:0})),!0),selectDocEnd=({state,dispatch})=>(dispatch(setSel(state,{anchor:state.selection.main.anchor,head:state.doc.length})),!0),selectAll=({state,dispatch})=>(dispatch(state.update({selection:{anchor:0,head:state.doc.length},userEvent:"select"})),!0),selectLine=({state:state$1,dispatch})=>{let ranges=selectedLineBlocks(state$1).map(({from,to})=>state.EditorSelection.range(from,Math.min(to+1,state$1.doc.length)));return dispatch(state$1.update({selection:state.EditorSelection.create(ranges),userEvent:"select"})),!0},selectParentSyntax=({state:state$1,dispatch})=>{let selection=updateSel(state$1.selection,range=>{let tree=language.syntaxTree(state$1),stack=tree.resolveStack(range.from,1);if(range.empty){let stackBefore=tree.resolveStack(range.from,-1);stackBefore.node.from>=stack.node.from&&stackBefore.node.to<=stack.node.to&&(stack=stackBefore)}for(let cur=stack;cur;cur=cur.next){let{node}=cur;if((node.from<range.from&&node.to>=range.to||node.to>range.to&&node.from<=range.from)&&cur.next)return state.EditorSelection.range(node.to,node.from)}return range});return!selection.eq(state$1.selection)&&(dispatch(setSel(state$1,selection)),!0)},addCursorAbove=view=>addCursorVertically(view,!1),addCursorBelow=view=>addCursorVertically(view,!0),simplifySelection=({state:state$1,dispatch})=>{let cur=state$1.selection,selection=null;return(1<cur.ranges.length?selection=state.EditorSelection.create([cur.main]):!cur.main.empty&&(selection=state.EditorSelection.create([state.EditorSelection.cursor(cur.main.head)])),!!selection)&&(dispatch(setSel(state$1,selection)),!0)},deleteByChar=(target,forward,byIndentUnit)=>deleteBy(target,range=>{let before,targetPos,pos=range.from,{state:state$1}=target,line=state$1.doc.lineAt(pos);if(byIndentUnit&&!forward&&pos>line.from&&pos<line.from+200&&!/[^ \t]/.test(before=line.text.slice(0,pos-line.from))){if("\t"==before[before.length-1])return pos-1;let col=state.countColumn(before,state$1.tabSize),drop=col%language.getIndentUnit(state$1)||language.getIndentUnit(state$1);for(let i=0;i<drop&&" "==before[before.length-1-i];i++)pos--;targetPos=pos}else targetPos=state.findClusterBreak(line.text,pos-line.from,forward,forward)+line.from,targetPos==pos&&line.number!=(forward?state$1.doc.lines:1)?targetPos+=forward?1:-1:!forward&&/[\ufe00-\ufe0f]/.test(line.text.slice(targetPos-line.from,pos-line.from))&&(targetPos=state.findClusterBreak(line.text,targetPos-line.from,!1,!1)+line.from);return targetPos}),deleteCharBackward=view=>deleteByChar(view,!1,!0),deleteCharBackwardStrict=view=>deleteByChar(view,!1,!1),deleteCharForward=view=>deleteByChar(view,!0,!1),deleteByGroup=(target,forward)=>deleteBy(target,range=>{let pos=range.head,{state:state$1}=target,line=state$1.doc.lineAt(pos),categorize=state$1.charCategorizer(pos);for(let cat=null;;){if(pos==(forward?line.to:line.from)){pos==range.head&&line.number!=(forward?state$1.doc.lines:1)&&(pos+=forward?1:-1);break}let next=state.findClusterBreak(line.text,pos-line.from,forward)+line.from,nextChar=line.text.slice(Math.min(pos,next)-line.from,Math.max(pos,next)-line.from),nextCat=categorize(nextChar);if(null!=cat&&nextCat!=cat)break;(" "!=nextChar||pos!=range.head)&&(cat=nextCat),pos=next}return pos}),deleteGroupBackward=target=>deleteByGroup(target,!1),deleteGroupForward=target=>deleteByGroup(target,!0),deleteGroupForwardWin=view=>deleteBy(view,range=>view.moveByChar(range,!0,start=>toGroupStart(view,range.head,start)).head),deleteToLineEnd=view=>deleteBy(view,range=>{let lineEnd=view.lineBlockAt(range.head).to;return range.head<lineEnd?lineEnd:Math.min(view.state.doc.length,range.head+1)}),deleteToLineStart=view=>deleteBy(view,range=>{let lineStart=view.lineBlockAt(range.head).from;return range.head>lineStart?lineStart:Math.max(0,range.head-1)}),deleteLineBoundaryBackward=view=>deleteBy(view,range=>{let lineStart=view.moveToLineBoundary(range,!1).head;return range.head>lineStart?lineStart:Math.max(0,range.head-1)}),deleteLineBoundaryForward=view=>deleteBy(view,range=>{let lineStart=view.moveToLineBoundary(range,!0).head;return range.head<lineStart?lineStart:Math.min(view.state.doc.length,range.head+1)}),deleteTrailingWhitespace=({state,dispatch})=>{if(state.readOnly)return!1;let changes=[];for(let pos=0,prev="",iter=state.doc.iter();;){if(iter.next(),iter.lineBreak||iter.done){let trailing=prev.search(/\s+$/);if(-1<trailing&&changes.push({from:pos-(prev.length-trailing),to:pos}),iter.done)break;prev=""}else prev=iter.value;pos+=iter.value.length}return!!changes.length&&(dispatch(state.update({changes,userEvent:"delete"})),!0)},splitLine=({state:state$1,dispatch})=>{if(state$1.readOnly)return!1;let changes=state$1.changeByRange(range=>({changes:{from:range.from,to:range.to,insert:state.Text.of(["",""])},range:state.EditorSelection.cursor(range.from)}));return dispatch(state$1.update(changes,{scrollIntoView:!0,userEvent:"input"})),!0},transposeChars=({state:state$1,dispatch})=>{if(state$1.readOnly)return!1;let changes=state$1.changeByRange(range=>{if(!range.empty||0==range.from||range.from==state$1.doc.length)return{range};let pos=range.from,line=state$1.doc.lineAt(pos),from=pos==line.from?pos-1:state.findClusterBreak(line.text,pos-line.from,!1)+line.from,to=pos==line.to?pos+1:state.findClusterBreak(line.text,pos-line.from,!0)+line.from;return{changes:{from,to,insert:state$1.doc.slice(pos,to).append(state$1.doc.slice(from,pos))},range:state.EditorSelection.cursor(to)}});return!changes.changes.empty&&(dispatch(state$1.update(changes,{scrollIntoView:!0,userEvent:"move.character"})),!0)},moveLineUp=({state,dispatch})=>moveLine(state,dispatch,!1),moveLineDown=({state,dispatch})=>moveLine(state,dispatch,!0),copyLineUp=({state,dispatch})=>copyLine(state,dispatch,!1),copyLineDown=({state,dispatch})=>copyLine(state,dispatch,!0),deleteLine=view=>{if(view.state.readOnly)return!1;let{state}=view,changes=state.changes(selectedLineBlocks(state).map(({from,to})=>(0<from?from--:to<state.doc.length&&to++,{from,to}))),selection=updateSel(state.selection,range=>{let dist;if(view.lineWrapping){let block=view.lineBlockAt(range.head),pos=view.coordsAtPos(range.head,range.assoc||1);pos&&(dist=block.bottom+view.documentTop-pos.bottom+view.defaultLineHeight/2)}return view.moveVertically(range,!0,dist)}).map(changes);return view.dispatch({changes,selection,scrollIntoView:!0,userEvent:"delete.line"}),!0},insertNewline=({state,dispatch})=>(dispatch(state.update(state.replaceSelection(state.lineBreak),{scrollIntoView:!0,userEvent:"input"})),!0),insertNewlineKeepIndent=({state:state$1,dispatch})=>(dispatch(state$1.update(state$1.changeByRange(range=>{let indent=/^\s*/.exec(state$1.doc.lineAt(range.from).text)[0];return{changes:{from:range.from,to:range.to,insert:state$1.lineBreak+indent},range:state.EditorSelection.cursor(range.from+indent.length+1)}}),{scrollIntoView:!0,userEvent:"input"})),!0),insertNewlineAndIndent=newlineAndIndent(!1),insertBlankLine=newlineAndIndent(!0),indentSelection=({state,dispatch})=>{if(state.readOnly)return!1;let updated=Object.create(null),context=new language.IndentContext(state,{overrideIndentation:start=>{let found=updated[start];return null==found?-1:found}}),changes=changeBySelectedLine(state,(line,changes,range)=>{let indent=language.getIndentation(context,line.from);if(null==indent)return;/\S/.test(line.text)||(indent=0);let cur=/^\s*/.exec(line.text)[0],norm=language.indentString(state,indent);(cur!=norm||range.from<line.from+cur.length)&&(updated[line.from]=indent,changes.push({from:line.from,to:line.from+cur.length,insert:norm}))});return changes.changes.empty||dispatch(state.update(changes,{userEvent:"indent"})),!0},indentMore=({state,dispatch})=>!state.readOnly&&(dispatch(state.update(changeBySelectedLine(state,(line,changes)=>{changes.push({from:line.from,insert:state.facet(language.indentUnit)})}),{userEvent:"input.indent"})),!0),indentLess=({state:state$1,dispatch})=>!state$1.readOnly&&(dispatch(state$1.update(changeBySelectedLine(state$1,(line,changes)=>{let space=/^\s*/.exec(line.text)[0];if(!space)return;let col=state.countColumn(space,state$1.tabSize),keep=0,insert=language.indentString(state$1,Math.max(0,col-language.getIndentUnit(state$1)));for(;keep<space.length&&keep<insert.length&&space.charCodeAt(keep)==insert.charCodeAt(keep);)keep++;changes.push({from:line.from+keep,to:line.from+space.length,insert:insert.slice(keep)})}),{userEvent:"delete.dedent"})),!0),toggleTabFocusMode=view=>(view.setTabFocusMode(),!0),temporarilySetTabFocusMode=view=>(view.setTabFocusMode(2e3),!0),insertTab=({state,dispatch})=>state.selection.ranges.some(r=>!r.empty)?indentMore({state,dispatch}):(dispatch(state.update(state.replaceSelection("\t"),{scrollIntoView:!0,userEvent:"input"})),!0),emacsStyleKeymap=[{key:"Ctrl-b",run:cursorCharLeft,shift:selectCharLeft,preventDefault:!0},{key:"Ctrl-f",run:cursorCharRight,shift:selectCharRight},{key:"Ctrl-p",run:cursorLineUp,shift:selectLineUp},{key:"Ctrl-n",run:cursorLineDown,shift:selectLineDown},{key:"Ctrl-a",run:cursorLineStart,shift:selectLineStart},{key:"Ctrl-e",run:cursorLineEnd,shift:selectLineEnd},{key:"Ctrl-d",run:deleteCharForward},{key:"Ctrl-h",run:deleteCharBackward},{key:"Ctrl-k",run:deleteToLineEnd},{key:"Ctrl-Alt-h",run:deleteGroupBackward},{key:"Ctrl-o",run:splitLine},{key:"Ctrl-t",run:transposeChars},{key:"Ctrl-v",run:cursorPageDown}],standardKeymap=[{key:"ArrowLeft",run:cursorCharLeft,shift:selectCharLeft,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:cursorGroupLeft,shift:selectGroupLeft,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:cursorLineBoundaryLeft,shift:selectLineBoundaryLeft,preventDefault:!0},{key:"ArrowRight",run:cursorCharRight,shift:selectCharRight,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:cursorGroupRight,shift:selectGroupRight,preventDefault:!0},{mac:"Cmd-ArrowRight",run:cursorLineBoundaryRight,shift:selectLineBoundaryRight,preventDefault:!0},{key:"ArrowUp",run:cursorLineUp,shift:selectLineUp,preventDefault:!0},{mac:"Cmd-ArrowUp",run:cursorDocStart,shift:selectDocStart},{mac:"Ctrl-ArrowUp",run:cursorPageUp,shift:selectPageUp},{key:"ArrowDown",run:cursorLineDown,shift:selectLineDown,preventDefault:!0},{mac:"Cmd-ArrowDown",run:cursorDocEnd,shift:selectDocEnd},{mac:"Ctrl-ArrowDown",run:cursorPageDown,shift:selectPageDown},{key:"PageUp",run:cursorPageUp,shift:selectPageUp},{key:"PageDown",run:cursorPageDown,shift:selectPageDown},{key:"Home",run:cursorLineBoundaryBackward,shift:selectLineBoundaryBackward,preventDefault:!0},{key:"Mod-Home",run:cursorDocStart,shift:selectDocStart},{key:"End",run:cursorLineBoundaryForward,shift:selectLineBoundaryForward,preventDefault:!0},{key:"Mod-End",run:cursorDocEnd,shift:selectDocEnd},{key:"Enter",run:insertNewlineAndIndent,shift:insertNewlineAndIndent},{key:"Mod-a",run:selectAll},{key:"Backspace",run:deleteCharBackward,shift:deleteCharBackward,preventDefault:!0},{key:"Delete",run:deleteCharForward,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:deleteGroupBackward,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:deleteGroupForward,preventDefault:!0},{mac:"Mod-Backspace",run:deleteLineBoundaryBackward,preventDefault:!0},{mac:"Mod-Delete",run:deleteLineBoundaryForward,preventDefault:!0}].concat(emacsStyleKeymap.map(b=>({mac:b.key,run:b.run,shift:b.shift}))),defaultKeymap=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:cursorSyntaxLeft,shift:selectSyntaxLeft},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:cursorSyntaxRight,shift:selectSyntaxRight},{key:"Alt-ArrowUp",run:moveLineUp},{key:"Shift-Alt-ArrowUp",run:copyLineUp},{key:"Alt-ArrowDown",run:moveLineDown},{key:"Shift-Alt-ArrowDown",run:copyLineDown},{key:"Mod-Alt-ArrowUp",run:addCursorAbove},{key:"Mod-Alt-ArrowDown",run:addCursorBelow},{key:"Escape",run:simplifySelection},{key:"Mod-Enter",run:insertBlankLine},{key:"Alt-l",mac:"Ctrl-l",run:selectLine},{key:"Mod-i",run:selectParentSyntax,preventDefault:!0},{key:"Mod-[",run:indentLess},{key:"Mod-]",run:indentMore},{key:"Mod-Alt-\\",run:indentSelection},{key:"Shift-Mod-k",run:deleteLine},{key:"Shift-Mod-\\",run:cursorMatchingBracket},{key:"Mod-/",run:toggleComment},{key:"Alt-A",run:toggleBlockComment},{key:"Ctrl-m",mac:"Shift-Alt-m",run:toggleTabFocusMode}].concat(standardKeymap),indentWithTab={key:"Tab",run:indentMore,shift:indentLess};/**
	Move the selection one character to the right.
	*/ /**
	Move the selection one character forward.
	*/ /**
	Move the selection one character backward.
	*/ /**
	Move the selection one character backward, in logical string index
	order.
	*/ /**
	Move the selection one group to the right.
	*/ /**
	Move the selection one group forward.
	*/ /**
	Move the selection one group backward.
	*/ /**
	Move the selection one group or camel-case subword backward.
	*/ /**
	Move the cursor over the next syntactic element to the right.
	*/ /**
	Move the selection one line down.
	*/ /**
	Move the selection one page down.
	*/ /**
	Move the selection to previous line wrap point, or failing that to
	the start of the line. If the line is indented, and the cursor
	isn't already at the end of the indentation, this will move to the
	end of the indentation instead of the start of the line.
	*/ /**
	Move the selection one line wrap point to the left.
	*/ /**
	Move the selection one line wrap point to the right.
	*/ /**
	Move the selection to the start of the line.
	*/ /**
	Move the selection to the end of the line.
	*/ /**
	Extend the selection to the bracket matching the one the selection
	head is currently on, if any.
	*/ /**
	Move the selection head one character to the right.
	*/ /**
	Move the selection head one character forward.
	*/ /**
	Move the selection head one character backward.
	*/ /**
	Move the selection head one character forward by logical
	(non-direction aware) string index order.
	*/ /**
	Move the selection head one character backward by logical string
	index order.
	*/ /**
	Move the selection head one group to the right.
	*/ /**
	Move the selection head one group forward.
	*/ /**
	Move the selection head one group backward.
	*/ /**
	Move the selection head one group forward in the default Windows
	style, skipping to the start of the next group.
	*/ /**
	Move the selection head one group or subword backward.
	*/ /**
	Move the selection head over the next syntactic element to the left.
	*/ /**
	Move the selection head over the next syntactic element to the right.
	*/ /**
	Move the selection head one line down.
	*/ /**
	Move the selection head one page down.
	*/ /**
	Move the selection head to the next line boundary.
	*/ /**
	Move the selection head to the previous line boundary.
	*/ /**
	Move the selection head one line boundary to the left.
	*/ /**
	Move the selection head one line boundary to the right.
	*/ /**
	Move the selection head to the start of the line.
	*/ /**
	Move the selection head to the end of the line.
	*/ /**
	Move the selection to the start of the document.
	*/ /**
	Move the selection to the end of the document.
	*/ /**
	Move the selection head to the start of the document.
	*/ /**
	Move the selection head to the end of the document.
	*/ /**
	Select the entire document.
	*/ /**
	Expand the selection to cover entire lines.
	*/ /**
	Select the next syntactic construct that is larger than the
	selection. Note that this will only work insofar as the language
	[provider](https://codemirror.net/6/docs/ref/#language.language) you use builds up a full
	syntax tree.
	*/ /**
	Expand the selection by adding a cursor below the heads of
	currently selected ranges.
	*/ /**
	Simplify the current selection. When multiple ranges are selected,
	reduce it to its main range. Otherwise, if the selection is
	non-empty, convert it to a cursor selection.
	*/ /**
	Delete the selection, or, for cursor selections, the character or
	indentation unit before the cursor.
	*/ /**
	Delete the selection or the character before the cursor. Does not
	implement any extended behavior like deleting whole indentation
	units in one go.
	*/ /**
	Delete the selection or the character after the cursor.
	*/ /**
	Delete the selection or backward until the end of the next
	[group](https://codemirror.net/6/docs/ref/#view.EditorView.moveByGroup), only skipping groups of
	whitespace when they consist of a single space.
	*/ /**
	Delete the selection or forward until the end of the next group.
	*/ /**
	Variant of [`deleteGroupForward`](https://codemirror.net/6/docs/ref/#commands.deleteGroupForward)
	that uses the Windows convention of also deleting the whitespace
	after a word.
	*/ /**
	Delete the selection, or, if it is a cursor selection, delete to
	the end of the line. If the cursor is directly at the end of the
	line, delete the line break after it.
	*/ /**
	Delete the selection, or, if it is a cursor selection, delete to
	the start of the line. If the cursor is directly at the start of the
	line, delete the line break before it.
	*/ /**
	Delete the selection, or, if it is a cursor selection, delete to
	the start of the line or the next line wrap before the cursor.
	*/ /**
	Delete the selection, or, if it is a cursor selection, delete to
	the end of the line or the next line wrap after the cursor.
	*/ /**
	Delete all whitespace directly before a line end from the
	document.
	*/ /**
	Replace each selection range with a line break, leaving the cursor
	on the line before the break.
	*/ /**
	Flip the characters before and after the cursor(s).
	*/ /**
	Move the selected lines down one line.
	*/ /**
	Create a copy of the selected lines. Keep the selection in the bottom copy.
	*/ /**
	Delete selected lines.
	*/ /**
	Replace the selection with a newline.
	*/ /**
	Replace the selection with a newline and the same amount of
	indentation as the line above.
	*/ /**
	Create a blank, indented line below the current line.
	*/ /**
	Add a [unit](https://codemirror.net/6/docs/ref/#language.indentUnit) of indentation to all selected
	lines.
	*/ /**
	Remove a [unit](https://codemirror.net/6/docs/ref/#language.indentUnit) of indentation from all
	selected lines.
	*/ /**
	Enables or disables
	[tab-focus mode](https://codemirror.net/6/docs/ref/#view.EditorView.setTabFocusMode). While on, this
	prevents the editor's key bindings from capturing Tab or
	Shift-Tab, making it possible for the user to move focus out of
	the editor with the keyboard.
	*/ /**
	Temporarily enables [tab-focus
	mode](https://codemirror.net/6/docs/ref/#view.EditorView.setTabFocusMode) for two seconds or until
	another key is pressed.
	*/ /**
	Insert a tab character at the cursor or, if something is selected,
	use [`indentMore`](https://codemirror.net/6/docs/ref/#commands.indentMore) to indent the entire
	selection.
	*/ /**
	Array of key bindings containing the Emacs-style bindings that are
	available on macOS by default.

	 - Ctrl-b: [`cursorCharLeft`](https://codemirror.net/6/docs/ref/#commands.cursorCharLeft) ([`selectCharLeft`](https://codemirror.net/6/docs/ref/#commands.selectCharLeft) with Shift)
	 - Ctrl-f: [`cursorCharRight`](https://codemirror.net/6/docs/ref/#commands.cursorCharRight) ([`selectCharRight`](https://codemirror.net/6/docs/ref/#commands.selectCharRight) with Shift)
	 - Ctrl-p: [`cursorLineUp`](https://codemirror.net/6/docs/ref/#commands.cursorLineUp) ([`selectLineUp`](https://codemirror.net/6/docs/ref/#commands.selectLineUp) with Shift)
	 - Ctrl-n: [`cursorLineDown`](https://codemirror.net/6/docs/ref/#commands.cursorLineDown) ([`selectLineDown`](https://codemirror.net/6/docs/ref/#commands.selectLineDown) with Shift)
	 - Ctrl-a: [`cursorLineStart`](https://codemirror.net/6/docs/ref/#commands.cursorLineStart) ([`selectLineStart`](https://codemirror.net/6/docs/ref/#commands.selectLineStart) with Shift)
	 - Ctrl-e: [`cursorLineEnd`](https://codemirror.net/6/docs/ref/#commands.cursorLineEnd) ([`selectLineEnd`](https://codemirror.net/6/docs/ref/#commands.selectLineEnd) with Shift)
	 - Ctrl-d: [`deleteCharForward`](https://codemirror.net/6/docs/ref/#commands.deleteCharForward)
	 - Ctrl-h: [`deleteCharBackward`](https://codemirror.net/6/docs/ref/#commands.deleteCharBackward)
	 - Ctrl-k: [`deleteToLineEnd`](https://codemirror.net/6/docs/ref/#commands.deleteToLineEnd)
	 - Ctrl-Alt-h: [`deleteGroupBackward`](https://codemirror.net/6/docs/ref/#commands.deleteGroupBackward)
	 - Ctrl-o: [`splitLine`](https://codemirror.net/6/docs/ref/#commands.splitLine)
	 - Ctrl-t: [`transposeChars`](https://codemirror.net/6/docs/ref/#commands.transposeChars)
	 - Ctrl-v: [`cursorPageDown`](https://codemirror.net/6/docs/ref/#commands.cursorPageDown)
	 - Alt-v: [`cursorPageUp`](https://codemirror.net/6/docs/ref/#commands.cursorPageUp)
	*/ /**
	An array of key bindings closely sticking to platform-standard or
	widely used bindings. (This includes the bindings from
	[`emacsStyleKeymap`](https://codemirror.net/6/docs/ref/#commands.emacsStyleKeymap), with their `key`
	property changed to `mac`.)

	 - ArrowLeft: [`cursorCharLeft`](https://codemirror.net/6/docs/ref/#commands.cursorCharLeft) ([`selectCharLeft`](https://codemirror.net/6/docs/ref/#commands.selectCharLeft) with Shift)
	 - ArrowRight: [`cursorCharRight`](https://codemirror.net/6/docs/ref/#commands.cursorCharRight) ([`selectCharRight`](https://codemirror.net/6/docs/ref/#commands.selectCharRight) with Shift)
	 - Ctrl-ArrowLeft (Alt-ArrowLeft on macOS): [`cursorGroupLeft`](https://codemirror.net/6/docs/ref/#commands.cursorGroupLeft) ([`selectGroupLeft`](https://codemirror.net/6/docs/ref/#commands.selectGroupLeft) with Shift)
	 - Ctrl-ArrowRight (Alt-ArrowRight on macOS): [`cursorGroupRight`](https://codemirror.net/6/docs/ref/#commands.cursorGroupRight) ([`selectGroupRight`](https://codemirror.net/6/docs/ref/#commands.selectGroupRight) with Shift)
	 - Cmd-ArrowLeft (on macOS): [`cursorLineStart`](https://codemirror.net/6/docs/ref/#commands.cursorLineStart) ([`selectLineStart`](https://codemirror.net/6/docs/ref/#commands.selectLineStart) with Shift)
	 - Cmd-ArrowRight (on macOS): [`cursorLineEnd`](https://codemirror.net/6/docs/ref/#commands.cursorLineEnd) ([`selectLineEnd`](https://codemirror.net/6/docs/ref/#commands.selectLineEnd) with Shift)
	 - ArrowUp: [`cursorLineUp`](https://codemirror.net/6/docs/ref/#commands.cursorLineUp) ([`selectLineUp`](https://codemirror.net/6/docs/ref/#commands.selectLineUp) with Shift)
	 - ArrowDown: [`cursorLineDown`](https://codemirror.net/6/docs/ref/#commands.cursorLineDown) ([`selectLineDown`](https://codemirror.net/6/docs/ref/#commands.selectLineDown) with Shift)
	 - Cmd-ArrowUp (on macOS): [`cursorDocStart`](https://codemirror.net/6/docs/ref/#commands.cursorDocStart) ([`selectDocStart`](https://codemirror.net/6/docs/ref/#commands.selectDocStart) with Shift)
	 - Cmd-ArrowDown (on macOS): [`cursorDocEnd`](https://codemirror.net/6/docs/ref/#commands.cursorDocEnd) ([`selectDocEnd`](https://codemirror.net/6/docs/ref/#commands.selectDocEnd) with Shift)
	 - Ctrl-ArrowUp (on macOS): [`cursorPageUp`](https://codemirror.net/6/docs/ref/#commands.cursorPageUp) ([`selectPageUp`](https://codemirror.net/6/docs/ref/#commands.selectPageUp) with Shift)
	 - Ctrl-ArrowDown (on macOS): [`cursorPageDown`](https://codemirror.net/6/docs/ref/#commands.cursorPageDown) ([`selectPageDown`](https://codemirror.net/6/docs/ref/#commands.selectPageDown) with Shift)
	 - PageUp: [`cursorPageUp`](https://codemirror.net/6/docs/ref/#commands.cursorPageUp) ([`selectPageUp`](https://codemirror.net/6/docs/ref/#commands.selectPageUp) with Shift)
	 - PageDown: [`cursorPageDown`](https://codemirror.net/6/docs/ref/#commands.cursorPageDown) ([`selectPageDown`](https://codemirror.net/6/docs/ref/#commands.selectPageDown) with Shift)
	 - Home: [`cursorLineBoundaryBackward`](https://codemirror.net/6/docs/ref/#commands.cursorLineBoundaryBackward) ([`selectLineBoundaryBackward`](https://codemirror.net/6/docs/ref/#commands.selectLineBoundaryBackward) with Shift)
	 - End: [`cursorLineBoundaryForward`](https://codemirror.net/6/docs/ref/#commands.cursorLineBoundaryForward) ([`selectLineBoundaryForward`](https://codemirror.net/6/docs/ref/#commands.selectLineBoundaryForward) with Shift)
	 - Ctrl-Home (Cmd-Home on macOS): [`cursorDocStart`](https://codemirror.net/6/docs/ref/#commands.cursorDocStart) ([`selectDocStart`](https://codemirror.net/6/docs/ref/#commands.selectDocStart) with Shift)
	 - Ctrl-End (Cmd-Home on macOS): [`cursorDocEnd`](https://codemirror.net/6/docs/ref/#commands.cursorDocEnd) ([`selectDocEnd`](https://codemirror.net/6/docs/ref/#commands.selectDocEnd) with Shift)
	 - Enter and Shift-Enter: [`insertNewlineAndIndent`](https://codemirror.net/6/docs/ref/#commands.insertNewlineAndIndent)
	 - Ctrl-a (Cmd-a on macOS): [`selectAll`](https://codemirror.net/6/docs/ref/#commands.selectAll)
	 - Backspace: [`deleteCharBackward`](https://codemirror.net/6/docs/ref/#commands.deleteCharBackward)
	 - Delete: [`deleteCharForward`](https://codemirror.net/6/docs/ref/#commands.deleteCharForward)
	 - Ctrl-Backspace (Alt-Backspace on macOS): [`deleteGroupBackward`](https://codemirror.net/6/docs/ref/#commands.deleteGroupBackward)
	 - Ctrl-Delete (Alt-Delete on macOS): [`deleteGroupForward`](https://codemirror.net/6/docs/ref/#commands.deleteGroupForward)
	 - Cmd-Backspace (macOS): [`deleteLineBoundaryBackward`](https://codemirror.net/6/docs/ref/#commands.deleteLineBoundaryBackward).
	 - Cmd-Delete (macOS): [`deleteLineBoundaryForward`](https://codemirror.net/6/docs/ref/#commands.deleteLineBoundaryForward).
	*/ /**
	The default keymap. Includes all bindings from
	[`standardKeymap`](https://codemirror.net/6/docs/ref/#commands.standardKeymap) plus the following:

	- Alt-ArrowLeft (Ctrl-ArrowLeft on macOS): [`cursorSyntaxLeft`](https://codemirror.net/6/docs/ref/#commands.cursorSyntaxLeft) ([`selectSyntaxLeft`](https://codemirror.net/6/docs/ref/#commands.selectSyntaxLeft) with Shift)
	- Alt-ArrowRight (Ctrl-ArrowRight on macOS): [`cursorSyntaxRight`](https://codemirror.net/6/docs/ref/#commands.cursorSyntaxRight) ([`selectSyntaxRight`](https://codemirror.net/6/docs/ref/#commands.selectSyntaxRight) with Shift)
	- Alt-ArrowUp: [`moveLineUp`](https://codemirror.net/6/docs/ref/#commands.moveLineUp)
	- Alt-ArrowDown: [`moveLineDown`](https://codemirror.net/6/docs/ref/#commands.moveLineDown)
	- Shift-Alt-ArrowUp: [`copyLineUp`](https://codemirror.net/6/docs/ref/#commands.copyLineUp)
	- Shift-Alt-ArrowDown: [`copyLineDown`](https://codemirror.net/6/docs/ref/#commands.copyLineDown)
	- Ctrl-Alt-ArrowUp (Cmd-Alt-ArrowUp on macOS): [`addCursorAbove`](https://codemirror.net/6/docs/ref/#commands.addCursorAbove).
	- Ctrl-Alt-ArrowDown (Cmd-Alt-ArrowDown on macOS): [`addCursorBelow`](https://codemirror.net/6/docs/ref/#commands.addCursorBelow).
	- Escape: [`simplifySelection`](https://codemirror.net/6/docs/ref/#commands.simplifySelection)
	- Ctrl-Enter (Cmd-Enter on macOS): [`insertBlankLine`](https://codemirror.net/6/docs/ref/#commands.insertBlankLine)
	- Alt-l (Ctrl-l on macOS): [`selectLine`](https://codemirror.net/6/docs/ref/#commands.selectLine)
	- Ctrl-i (Cmd-i on macOS): [`selectParentSyntax`](https://codemirror.net/6/docs/ref/#commands.selectParentSyntax)
	- Ctrl-[ (Cmd-[ on macOS): [`indentLess`](https://codemirror.net/6/docs/ref/#commands.indentLess)
	- Ctrl-] (Cmd-] on macOS): [`indentMore`](https://codemirror.net/6/docs/ref/#commands.indentMore)
	- Ctrl-Alt-\\ (Cmd-Alt-\\ on macOS): [`indentSelection`](https://codemirror.net/6/docs/ref/#commands.indentSelection)
	- Shift-Ctrl-k (Shift-Cmd-k on macOS): [`deleteLine`](https://codemirror.net/6/docs/ref/#commands.deleteLine)
	- Shift-Ctrl-\\ (Shift-Cmd-\\ on macOS): [`cursorMatchingBracket`](https://codemirror.net/6/docs/ref/#commands.cursorMatchingBracket)
	- Ctrl-/ (Cmd-/ on macOS): [`toggleComment`](https://codemirror.net/6/docs/ref/#commands.toggleComment).
	- Shift-Alt-a: [`toggleBlockComment`](https://codemirror.net/6/docs/ref/#commands.toggleBlockComment).
	- Ctrl-m (Alt-Shift-m on macOS): [`toggleTabFocusMode`](https://codemirror.net/6/docs/ref/#commands.toggleTabFocusMode).
	*/ /**
	A binding that binds Tab to [`indentMore`](https://codemirror.net/6/docs/ref/#commands.indentMore) and
	Shift-Tab to [`indentLess`](https://codemirror.net/6/docs/ref/#commands.indentLess).
	Please see the [Tab example](../../examples/tab/) before using
	this.
	*/return dist.addCursorAbove=addCursorAbove,dist.addCursorBelow=addCursorBelow,dist.blockComment=blockComment,dist.blockUncomment=blockUncomment,dist.copyLineDown=copyLineDown,dist.copyLineUp=copyLineUp,dist.cursorCharBackward=cursorCharBackward,dist.cursorCharBackwardLogical=cursorCharBackwardLogical,dist.cursorCharForward=cursorCharForward,dist.cursorCharForwardLogical=cursorCharForwardLogical,dist.cursorCharLeft=cursorCharLeft,dist.cursorCharRight=cursorCharRight,dist.cursorDocEnd=cursorDocEnd,dist.cursorDocStart=cursorDocStart,dist.cursorGroupBackward=cursorGroupBackward,dist.cursorGroupForward=cursorGroupForward,dist.cursorGroupForwardWin=cursorGroupForwardWin,dist.cursorGroupLeft=cursorGroupLeft,dist.cursorGroupRight=cursorGroupRight,dist.cursorLineBoundaryBackward=cursorLineBoundaryBackward,dist.cursorLineBoundaryForward=cursorLineBoundaryForward,dist.cursorLineBoundaryLeft=cursorLineBoundaryLeft,dist.cursorLineBoundaryRight=cursorLineBoundaryRight,dist.cursorLineDown=cursorLineDown,dist.cursorLineEnd=cursorLineEnd,dist.cursorLineStart=cursorLineStart,dist.cursorLineUp=cursorLineUp,dist.cursorMatchingBracket=cursorMatchingBracket,dist.cursorPageDown=cursorPageDown,dist.cursorPageUp=cursorPageUp,dist.cursorSubwordBackward=cursorSubwordBackward,dist.cursorSubwordForward=cursorSubwordForward,dist.cursorSyntaxLeft=cursorSyntaxLeft,dist.cursorSyntaxRight=cursorSyntaxRight,dist.defaultKeymap=defaultKeymap,dist.deleteCharBackward=deleteCharBackward,dist.deleteCharBackwardStrict=deleteCharBackwardStrict,dist.deleteCharForward=deleteCharForward,dist.deleteGroupBackward=deleteGroupBackward,dist.deleteGroupForward=deleteGroupForward,dist.deleteGroupForwardWin=deleteGroupForwardWin,dist.deleteLine=deleteLine,dist.deleteLineBoundaryBackward=deleteLineBoundaryBackward,dist.deleteLineBoundaryForward=deleteLineBoundaryForward,dist.deleteToLineEnd=deleteToLineEnd,dist.deleteToLineStart=deleteToLineStart,dist.deleteTrailingWhitespace=deleteTrailingWhitespace,dist.emacsStyleKeymap=emacsStyleKeymap,dist.history=history,dist.historyField=historyField,dist.historyKeymap=historyKeymap,dist.indentLess=indentLess,dist.indentMore=indentMore,dist.indentSelection=indentSelection,dist.indentWithTab=indentWithTab,dist.insertBlankLine=insertBlankLine,dist.insertNewline=insertNewline,dist.insertNewlineAndIndent=insertNewlineAndIndent,dist.insertNewlineKeepIndent=insertNewlineKeepIndent,dist.insertTab=insertTab,dist.invertedEffects=invertedEffects,dist.isolateHistory=isolateHistory,dist.lineComment=lineComment,dist.lineUncomment=lineUncomment,dist.moveLineDown=moveLineDown,dist.moveLineUp=moveLineUp,dist.redo=redo,dist.redoDepth=redoDepth,dist.redoSelection=redoSelection,dist.selectAll=selectAll,dist.selectCharBackward=selectCharBackward,dist.selectCharBackwardLogical=selectCharBackwardLogical,dist.selectCharForward=selectCharForward,dist.selectCharForwardLogical=selectCharForwardLogical,dist.selectCharLeft=selectCharLeft,dist.selectCharRight=selectCharRight,dist.selectDocEnd=selectDocEnd,dist.selectDocStart=selectDocStart,dist.selectGroupBackward=selectGroupBackward,dist.selectGroupForward=selectGroupForward,dist.selectGroupForwardWin=selectGroupForwardWin,dist.selectGroupLeft=selectGroupLeft,dist.selectGroupRight=selectGroupRight,dist.selectLine=selectLine,dist.selectLineBoundaryBackward=selectLineBoundaryBackward,dist.selectLineBoundaryForward=selectLineBoundaryForward,dist.selectLineBoundaryLeft=selectLineBoundaryLeft,dist.selectLineBoundaryRight=selectLineBoundaryRight,dist.selectLineDown=selectLineDown,dist.selectLineEnd=selectLineEnd,dist.selectLineStart=selectLineStart,dist.selectLineUp=selectLineUp,dist.selectMatchingBracket=selectMatchingBracket,dist.selectPageDown=selectPageDown,dist.selectPageUp=selectPageUp,dist.selectParentSyntax=selectParentSyntax,dist.selectSubwordBackward=selectSubwordBackward,dist.selectSubwordForward=selectSubwordForward,dist.selectSyntaxLeft=selectSyntaxLeft,dist.selectSyntaxRight=selectSyntaxRight,dist.simplifySelection=simplifySelection,dist.splitLine=splitLine,dist.standardKeymap=standardKeymap,dist.temporarilySetTabFocusMode=temporarilySetTabFocusMode,dist.toggleBlockComment=toggleBlockComment,dist.toggleBlockCommentByLine=toggleBlockCommentByLine,dist.toggleComment=toggleComment,dist.toggleLineComment=toggleLineComment,dist.toggleTabFocusMode=toggleTabFocusMode,dist.transposeChars=transposeChars,dist.undo=undo,dist.undoDepth=undoDepth,dist.undoSelection=undoSelection,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}