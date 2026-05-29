async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@marijn/find-cluster-break"),dist={},distExports=function requireDist(){return hasRequiredDist?dist:(hasRequiredDist=1,function(exports){function textLength(text){let length=-1;for(let line of text)length+=line.length+1;return length}function appendText(text,target,from=0,to=1e9){for(let pos=0,i=0,first=!0;i<text.length&&pos<=to;i++){let line=text[i],end=pos+line.length;end>=from&&(end>to&&(line=line.slice(0,to-pos)),pos<from&&(line=line.slice(from-pos)),first?(target[target.length-1]+=line,first=!1):target.push(line)),pos=end+1}return target}function sliceText(text,from,to){return appendText(text,[""],from,to)}function clip(text,from,to){return from=Math.max(0,Math.min(text.length,from)),[from,Math.max(from,Math.min(text.length,to))]}/**
		Returns a next grapheme cluster break _after_ (not equal to)
		`pos`, if `forward` is true, or before otherwise. Returns `pos`
		itself if no further cluster break is available in the string.
		Moves across surrogate pairs, extending characters (when
		`includeExtending` is true), characters joined with zero-width
		joiners, and flag emoji.
		*/function findClusterBreak(str,pos,forward=!0,includeExtending=!0){return findClusterBreak$1.findClusterBreak(str,pos,forward,includeExtending)}function surrogateLow(ch){return 56320<=ch&&57344>ch}function surrogateHigh(ch){return 55296<=ch&&56320>ch}/**
		Find the code point at the given position in a string (like the
		[`codePointAt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
		string method).
		*/function codePointAt(str,pos){let code0=str.charCodeAt(pos);if(!surrogateHigh(code0)||pos+1==str.length)return code0;let code1=str.charCodeAt(pos+1);return surrogateLow(code1)?(code0-55296<<10)+(code1-56320)+65536:code0}/**
		Given a Unicode codepoint, return the JavaScript string that
		respresents it (like
		[`String.fromCodePoint`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)).
		*/function fromCodePoint(code){return 65535>=code?String.fromCharCode(code):(code-=65536,String.fromCharCode((code>>10)+55296,(1023&code)+56320))}/**
		The amount of positions a character takes up in a JavaScript string.
		*/function codePointSize(code){return 65536>code?1:2}function addSection(sections,len,ins,forceJoin=!1){if(!(0==len&&0>=ins)){let last=sections.length-2;0<=last&&0>=ins&&ins==sections[last+1]?sections[last]+=len:0<=last&&0==len&&0==sections[last]?sections[last+1]+=ins:forceJoin?(sections[last]+=len,sections[last+1]+=ins):sections.push(len,ins)}}function addInsert(values,sections,value){if(0!=value.length){let index=sections.length-2>>1;if(index<values.length)values[values.length-1]=values[values.length-1].append(value);else{for(;values.length<index;)values.push(Text.empty);values.push(value)}}}function iterChanges(desc,f,individual){let inserted=desc.inserted;for(let posA=0,posB=0,i=0;i<desc.sections.length;){let len=desc.sections[i++],ins=desc.sections[i++];if(0>ins)posA+=len,posB+=len;else{let endA=posA,endB=posB,text=Text.empty;for(;;){if(endA+=len,endB+=ins,ins&&inserted&&(text=text.append(inserted[i-2>>1])),individual||i==desc.sections.length||0>desc.sections[i+1])break;len=desc.sections[i++],ins=desc.sections[i++]}f(posA,endA,posB,endB,text),posA=endA,posB=endB}}}function mapSet(setA,setB,before,mkSet=!1){// Produce a copy of setA that applies to the document after setB
// has been applied (assuming both start at the same document).
let sections=[],insert=mkSet?[]:null,a=new SectionIter(setA),b=new SectionIter(setB);// Iterate over both sets in parallel. inserted tracks, for changes
// in A that have to be processed piece-by-piece, whether their
// content has been inserted already, and refers to the section
// index.
for(let inserted=-1;;)if(a.done&&b.len||b.done&&a.len)throw new Error("Mismatched change set lengths");else if(-1==a.ins&&-1==b.ins){// Move across ranges skipped by both sets.
let len=Math.min(a.len,b.len);addSection(sections,len,-1),a.forward(len),b.forward(len)}else if(0<=b.ins&&(0>a.ins||inserted==a.i||0==a.off&&(b.len<a.len||b.len==a.len&&!before))){// If there's a change in B that comes before the next change in
// A (ordered by start pos, then len, then before flag), skip
// that (and process any changes in A it covers).
let len=b.len;for(addSection(sections,b.ins,-1);len;){let piece=Math.min(a.len,len);0<=a.ins&&inserted<a.i&&a.len<=piece&&(addSection(sections,0,a.ins),insert&&addInsert(insert,sections,a.text),inserted=a.i),a.forward(piece),len-=piece}b.next()}else if(0<=a.ins){// Process the part of a change in A up to the start of the next
// non-deletion change in B (if overlapping).
let len=0,left=a.len;for(;left;)if(-1==b.ins){let piece=Math.min(left,b.len);len+=piece,left-=piece,b.forward(piece)}else if(0==b.ins&&b.len<left)left-=b.len,b.next();else break;addSection(sections,len,inserted<a.i?a.ins:0),insert&&inserted<a.i&&addInsert(insert,sections,a.text),inserted=a.i,a.forward(a.len-left)}else{if(a.done&&b.done)return insert?ChangeSet.createSet(sections,insert):ChangeDesc.create(sections);throw new Error("Mismatched change set lengths")}}function composeSets(setA,setB,mkSet=!1){let sections=[],insert=mkSet?[]:null,a=new SectionIter(setA),b=new SectionIter(setB);for(let open=!1;;){if(a.done&&b.done)return insert?ChangeSet.createSet(sections,insert):ChangeDesc.create(sections);if(0==a.ins)addSection(sections,a.len,0,open),a.next();else if(0==b.len&&!b.done)addSection(sections,0,b.ins,open),insert&&addInsert(insert,sections,b.text),b.next();else if(a.done||b.done)throw new Error("Mismatched change set lengths");else{let len=Math.min(a.len2,b.len),sectionLen=sections.length;if(-1==a.ins){let insB=-1==b.ins?-1:b.off?0:b.ins;addSection(sections,len,insB,open),insert&&insB&&addInsert(insert,sections,b.text)}else-1==b.ins?(addSection(sections,a.off?0:a.len,len,open),insert&&addInsert(insert,sections,a.textBit(len))):(addSection(sections,a.off?0:a.len,b.off?0:b.ins,open),insert&&!b.off&&addInsert(insert,sections,b.text));open=(a.ins>len||0<=b.ins&&b.len>len)&&(open||sections.length>sectionLen),a.forward2(len),b.forward(len)}}}function checkSelection(selection,docLength){for(let range of selection.ranges)if(range.to>docLength)throw new RangeError("Selection points outside of document")}function sameArray(a,b){return a==b||a.length==b.length&&a.every((e,i)=>e===b[i])}function compareArray(a,b,compare){if(a.length!=b.length)return!1;for(let i=0;i<a.length;i++)if(!compare(a[i],b[i]))return!1;return!0}function ensureAll(state,addrs){let changed=!1;for(let addr of addrs)1&ensureAddr(state,addr)/* SlotStatus.Changed */&&(changed=!0);return changed}function dynamicFacetSlot(addresses,facet,providers){function get(state){let values=[];for(let value,i=0;i<providerAddrs.length;i++)if(value=getAddr(state,providerAddrs[i]),2==providerTypes[i]/* Provider.Multi */)for(let val of value)values.push(val);else values.push(value);return facet.combine(values)}let providerAddrs=providers.map(p=>addresses[p.id]),providerTypes=providers.map(p=>p.type),dynamic=providerAddrs.filter(p=>!(1&p)),idx=addresses[facet.id]>>1;return{create(state){for(let addr of providerAddrs)ensureAddr(state,addr);return state.values[idx]=get(state),1/* SlotStatus.Changed */},update(state,tr){if(!ensureAll(state,dynamic))return 0;let value=get(state);return facet.compare(value,state.values[idx])?0:(state.values[idx]=value,1/* SlotStatus.Changed */)},reconfigure(state,oldState){let depChanged=ensureAll(state,providerAddrs),oldProviders=oldState.config.facets[facet.id],oldValue=oldState.facet(facet);if(oldProviders&&!depChanged&&sameArray(providers,oldProviders))return state.values[idx]=oldValue,0;let value=get(state);return facet.compare(value,oldValue)?(state.values[idx]=oldValue,0):(state.values[idx]=value,1/* SlotStatus.Changed */)}}}function prec(value){return ext=>new PrecExtension(ext,value)}/**
		By default extensions are registered in the order they are found
		in the flattened form of nested array that was provided.
		Individual extension values can be assigned a precedence to
		override this. Extensions that do not have a precedence set get
		the precedence of the nearest parent with a precedence, or
		[`default`](https://codemirror.net/6/docs/ref/#state.Prec.default) if there is no such parent. The
		final ordering of extensions is determined by first sorting by
		precedence and then by order within each precedence.
		*/function flatten(extension,compartments,newCompartments){function inner(ext,prec){let known=seen.get(ext);if(null!=known){if(known<=prec)return;let found=result[known].indexOf(ext);-1<found&&result[known].splice(found,1),ext instanceof CompartmentInstance&&newCompartments.delete(ext.compartment)}if(seen.set(ext,prec),Array.isArray(ext))for(let e of ext)inner(e,prec);else if(ext instanceof CompartmentInstance){if(newCompartments.has(ext.compartment))throw new RangeError(`Duplicate use of compartment in extensions`);let content=compartments.get(ext.compartment)||ext.inner;newCompartments.set(ext.compartment,content),inner(content,prec)}else if(ext instanceof PrecExtension)inner(ext.inner,ext.prec);else if(ext instanceof StateField)result[prec].push(ext),ext.provides&&inner(ext.provides,prec);else if(ext instanceof FacetProvider)result[prec].push(ext),ext.facet.extensions&&inner(ext.facet.extensions,Prec_.default);else{let content=ext.extension;if(!content)throw new Error(`Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);inner(content,prec)}}let result=[[],[],[],[],[]],seen=new Map;return inner(extension,Prec_.default),result.reduce((a,b)=>a.concat(b))}function ensureAddr(state,addr){if(1&addr)return 2/* SlotStatus.Computed */;let idx=addr>>1,status=state.status[idx];if(4==status/* SlotStatus.Computing */)throw new Error("Cyclic dependency between fields and/or facets");if(2&status/* SlotStatus.Computed */)return status;state.status[idx]=4/* SlotStatus.Computing */;let changed=state.computeSlot(state,state.config.dynamicSlots[idx]);return state.status[idx]=2/* SlotStatus.Computed */|changed}function getAddr(state,addr){return 1&addr?state.config.staticValues[addr>>1]:state.values[addr>>1]}function joinRanges(a,b){let result=[];for(let iA=0,iB=0;;){let from,to;if(iA<a.length&&(iB==b.length||b[iB]>=a[iA]))from=a[iA++],to=a[iA++];else if(iB<b.length)from=b[iB++],to=b[iB++];else return result;!result.length||result[result.length-1]<from?result.push(from,to):result[result.length-1]<to&&(result[result.length-1]=to)}}function mergeTransaction(a,b,sequential){var _a;let mapForA,mapForB,changes;return sequential?(mapForA=b.changes,mapForB=ChangeSet.empty(b.changes.length),changes=a.changes.compose(b.changes)):(mapForA=b.changes.map(a.changes),mapForB=a.changes.mapDesc(b.changes,!0),changes=a.changes.compose(mapForA)),{changes,selection:b.selection?b.selection.map(mapForB):null===(_a=a.selection)||void 0===_a?void 0:_a.map(mapForA),effects:StateEffect.mapEffects(a.effects,mapForA).concat(StateEffect.mapEffects(b.effects,mapForB)),annotations:a.annotations.length?a.annotations.concat(b.annotations):b.annotations,scrollIntoView:a.scrollIntoView||b.scrollIntoView}}function resolveTransactionInner(state,spec,docSize){let sel=spec.selection,annotations=asArray(spec.annotations);return spec.userEvent&&(annotations=annotations.concat(Transaction.userEvent.of(spec.userEvent))),{changes:spec.changes instanceof ChangeSet?spec.changes:ChangeSet.of(spec.changes||[],docSize,state.facet(lineSeparator)),selection:sel&&(sel instanceof EditorSelection?sel:EditorSelection.single(sel.anchor,sel.head)),effects:asArray(spec.effects),annotations,scrollIntoView:!!spec.scrollIntoView}}function resolveTransaction(state,specs,filter){let s=resolveTransactionInner(state,specs.length?specs[0]:{},state.doc.length);specs.length&&!1===specs[0].filter&&(filter=!1);for(let i=1;i<specs.length;i++){!1===specs[i].filter&&(filter=!1);let seq=!!specs[i].sequential;s=mergeTransaction(s,resolveTransactionInner(state,specs[i],seq?s.changes.newLength:state.doc.length),seq)}let tr=Transaction.create(state,s.changes,s.selection,s.effects,s.annotations,s.scrollIntoView);return extendTransaction(filter?filterTransaction(tr):tr)}// Finish a transaction by applying filters if necessary.
function filterTransaction(tr){let state=tr.startState,result=!0;// Change filters
for(let filter of state.facet(changeFilter)){let value=filter(tr);if(!1===value){result=!1;break}Array.isArray(value)&&(result=!0===result?value:joinRanges(result,value))}if(!0!==result){let changes,back;if(!1===result)back=tr.changes.invertedDesc,changes=ChangeSet.empty(state.doc.length);else{let filtered=tr.changes.filter(result);changes=filtered.changes,back=filtered.filtered.mapDesc(filtered.changes).invertedDesc}tr=Transaction.create(state,changes,tr.selection&&tr.selection.map(back),StateEffect.mapEffects(tr.effects,back),tr.annotations,tr.scrollIntoView)}// Transaction filters
let filters=state.facet(transactionFilter);for(let filtered,i=filters.length-1;0<=i;i--)filtered=filters[i](tr),tr=filtered instanceof Transaction?filtered:Array.isArray(filtered)&&1==filtered.length&&filtered[0]instanceof Transaction?filtered[0]:resolveTransaction(state,asArray(filtered),!1);return tr}function extendTransaction(tr){let state=tr.startState,extenders=state.facet(transactionExtender),spec=tr;for(let extension,i=extenders.length-1;0<=i;i--)extension=extenders[i](tr),extension&&Object.keys(extension).length&&(spec=mergeTransaction(spec,resolveTransactionInner(state,extension,tr.changes.newLength),!0));return spec==tr?tr:Transaction.create(state,tr.changes,tr.selection,spec.effects,spec.annotations,spec.scrollIntoView)}function asArray(value){return null==value?none:Array.isArray(value)?value:[value]}/**
		The categories produced by a [character
		categorizer](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer). These are used
		do things like selecting by word.
		*/function hasWordChar(str){if(wordChar)return wordChar.test(str);for(let ch,i=0;i<str.length;i++)if(ch=str[i],/\w/.test(ch)||"\x80"<ch&&(ch.toUpperCase()!=ch.toLowerCase()||nonASCIISingleCaseWordChar.test(ch)))return!0;return!1}function makeCategorizer(wordChars){return char=>{if(!/\S/.test(char))return exports.CharCategory.Space;if(hasWordChar(char))return exports.CharCategory.Word;for(let i=0;i<wordChars.length;i++)if(-1<char.indexOf(wordChars[i]))return exports.CharCategory.Word;return exports.CharCategory.Other}}/**
		The editor state class is a persistent (immutable) data structure.
		To update a state, you [create](https://codemirror.net/6/docs/ref/#state.EditorState.update) a
		[transaction](https://codemirror.net/6/docs/ref/#state.Transaction), which produces a _new_ state
		instance, without modifying the original object.

		As such, _never_ mutate properties of a state directly. That'll
		just break things.
		*/ /**
		Utility function for combining behaviors to fill in a config
		object from an array of provided configs. `defaults` should hold
		default values for all optional fields in `Config`.

		The function will, by default, error
		when a field gets two values that aren't `===`-equal, but you can
		provide combine functions per field to do something else.
		*/function combineConfig(configs,defaults,// Should hold only the optional properties of Config, but I haven't managed to express that
combine={}){let result={};for(let config of configs)for(let key of Object.keys(config)){let value=config[key],current=result[key];if(void 0===current)result[key]=value;else if(current===value||void 0===value);// No conflict
else if(Object.hasOwnProperty.call(combine,key))result[key]=combine[key](current,value);else throw new Error("Config merge conflict for field "+key)}for(let key in defaults)void 0===result[key]&&(result[key]=defaults[key]);return result}/**
		Each range is associated with a value, which must inherit from
		this class.
		*/function cmpVal(a,b){return a==b||a.constructor==b.constructor&&a.eq(b)}/**
		A range associates a value with a range of positions.
		*/function cmpRange(a,b){return a.from-b.from||a.value.startSide-b.value.startSide}function lazySort(ranges){if(1<ranges.length)for(let cur,prev=ranges[0],i=1;i<ranges.length;i++){if(cur=ranges[i],0<cmpRange(prev,cur))return ranges.slice().sort(cmpRange);prev=cur}return ranges}function findSharedChunks(a,b,textDiff){let inA=new Map;for(let set of a)for(let i=0;i<set.chunk.length;i++)0>=set.chunk[i].maxPoint&&inA.set(set.chunk[i],set.chunkPos[i]);let shared=new Set;for(let set of b)for(let known,i=0;i<set.chunk.length;i++)known=inA.get(set.chunk[i]),null==known||(textDiff?textDiff.mapPos(known):known)!=set.chunkPos[i]||(null===textDiff||void 0===textDiff?void 0:textDiff.touchesRange(known,known+set.chunk[i].length))||shared.add(set.chunk[i]);return shared}function heapBubble(heap,index){for(let childIndex,cur=heap[index];;){if(childIndex=(index<<1)+1,childIndex>=heap.length)break;let child=heap[childIndex];if(childIndex+1<heap.length&&0<=child.compare(heap[childIndex+1])&&(child=heap[childIndex+1],childIndex++),0>cur.compare(child))break;heap[childIndex]=cur,heap[index]=child,index=childIndex}}function compare(a,startA,b,startB,length,comparator){a.goto(startA),b.goto(startB);let endB=startB+length,pos=startB,dPos=startB-startA,bounds=!!comparator.boundChange;for(let boundChange=!1;;){let dEnd=a.to+dPos-b.to,diff=dEnd||a.endSide-b.endSide,end=0>diff?a.to+dPos:b.to,clipEnd=Math.min(end,endB),point=a.point||b.point;if(point?(!(a.point&&b.point&&cmpVal(a.point,b.point)&&sameValues(a.activeForPoint(a.to),b.activeForPoint(b.to)))&&comparator.comparePoint(pos,clipEnd,a.point,b.point),boundChange=!1):(boundChange&&comparator.boundChange(pos),clipEnd>pos&&!sameValues(a.active,b.active)&&comparator.compareRange(pos,clipEnd,a.active,b.active),bounds&&clipEnd<endB&&(dEnd||a.openEnd(end)!=b.openEnd(end))&&(boundChange=!0)),end>endB)break;pos=end,0>=diff&&a.next(),0<=diff&&b.next()}}function sameValues(a,b){if(a.length!=b.length)return!1;for(let i=0;i<a.length;i++)if(a[i]!=b[i]&&!cmpVal(a[i],b[i]))return!1;return!0}function remove(array,index){for(let i=index,e=array.length-1;i<e;i++)array[i]=array[i+1];array.pop()}function insert(array,index,value){for(let i=array.length-1;i>=index;i--)array[i+1]=array[i];array[index]=value}function findMinIndex(value,array){let found=-1,foundPos=1e9/* C.Far */;for(let i=0;i<array.length;i++)0>(array[i]-foundPos||value[i].endSide-value[found].endSide)&&(found=i,foundPos=array[i]);return found}/**
		Count the column position at the given offset into the string,
		taking extending characters and tab size into account.
		*/function countColumn(string,tabSize,to=string.length){let n=0;for(let i=0;i<to&&i<string.length;)9==string.charCodeAt(i)?(n+=tabSize-n%tabSize,i++):(n++,i=findClusterBreak(string,i));return n}/**
		Find the offset that corresponds to the given column position in a
		string, taking extending characters and tab size into account. By
		default, the string length is returned when it is too short to
		reach the column. Pass `strict` true to make it return -1 in that
		situation.
		*/function findColumn(string,col,tabSize,strict){for(let i=0,n=0;;){if(n>=col)return i;if(i==string.length)break;n+=9==string.charCodeAt(i)?tabSize-n%tabSize:1,i=findClusterBreak(string,i)}return!0===strict?-1:string.length}var findClusterBreak$1=require$$0;/**
		The data structure for documents. @nonabstract
		*/class Text{/**
		    Get the line description around the given position.
		    */lineAt(pos){if(0>pos||pos>this.length)throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);return this.lineInner(pos,!1,1,0)}/**
		    Get the description for the given (1-based) line number.
		    */line(n){if(1>n||n>this.lines)throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);return this.lineInner(n,!0,1,0)}/**
		    Replace a range of the text with the given content.
		    */replace(from,to,text){[from,to]=clip(this,from,to);let parts=[];return this.decompose(0,from,parts,2/* Open.To */),text.length&&text.decompose(0,text.length,parts,3/* Open.To */),this.decompose(to,this.length,parts,1/* Open.From */),TextNode.from(parts,this.length-(to-from)+text.length)}/**
		    Append another document to this one.
		    */append(other){return this.replace(this.length,this.length,other)}/**
		    Retrieve the text between the given points.
		    */slice(from,to=this.length){[from,to]=clip(this,from,to);let parts=[];return this.decompose(from,to,parts,0),TextNode.from(parts,to-from)}/**
		    Test whether this text is equal to another instance.
		    */eq(other){if(other==this)return!0;if(other.length!=this.length||other.lines!=this.lines)return!1;let start=this.scanIdentical(other,1),end=this.length-this.scanIdentical(other,-1),a=new RawTextCursor(this),b=new RawTextCursor(other);for(let skip=start,pos=start;;){if(a.next(skip),b.next(skip),skip=0,a.lineBreak!=b.lineBreak||a.done!=b.done||a.value!=b.value)return!1;if(pos+=a.value.length,a.done||pos>=end)return!0}}/**
		    Iterate over the text. When `dir` is `-1`, iteration happens
		    from end to start. This will return lines and the breaks between
		    them as separate strings.
		    */iter(dir=1){return new RawTextCursor(this,dir)}/**
		    Iterate over a range of the text. When `from` > `to`, the
		    iterator will run in reverse.
		    */iterRange(from,to=this.length){return new PartialTextCursor(this,from,to)}/**
		    Return a cursor that iterates over the given range of lines,
		    _without_ returning the line breaks between, and yielding empty
		    strings for empty lines.
		    
		    When `from` and `to` are given, they should be 1-based line numbers.
		    */iterLines(from,to){let inner;if(null==from)inner=this.iter();else{null==to&&(to=this.lines+1);let start=this.line(from).from;inner=this.iterRange(start,Math.max(start,to==this.lines+1?this.length:1>=to?0:this.line(to-1).to))}return new LineCursor(inner)}/**
		    Return the document as a string, using newline characters to
		    separate lines.
		    */toString(){return this.sliceString(0)}/**
		    Convert the document to an array of lines (which can be
		    deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
		    */toJSON(){let lines=[];return this.flatten(lines),lines}/**
		    @internal
		    */constructor(){}/**
		    Create a `Text` instance for the given array of lines.
		    */static of(text){if(0==text.length)throw new RangeError("A document must have at least one line");return 1!=text.length||text[0]?32>=text.length/* Tree.Branch */?new TextLeaf(text):TextNode.from(TextLeaf.split(text,[])):Text.empty}}// Leaves store an array of line strings. There are always line breaks
// between these strings. Leaves are limited in size and have to be
// contained in TextNode instances for bigger documents.
class TextLeaf extends Text{constructor(text,length=textLength(text)){super(),this.text=text,this.length=length}get lines(){return this.text.length}get children(){return null}lineInner(target,isLine,line,offset){for(let i=0;;i++){let string=this.text[i],end=offset+string.length;if((isLine?line:end)>=target)return new Line(offset,end,line,string);offset=end+1,line++}}decompose(from,to,target,open){let text=0>=from&&to>=this.length?this:new TextLeaf(sliceText(this.text,from,to),Math.min(to,this.length)-Math.max(0,from));if(1&open/* Open.From */){let prev=target.pop(),joined=appendText(text.text,prev.text.slice(),0,text.length);if(32>=joined.length/* Tree.Branch */)target.push(new TextLeaf(joined,prev.length+text.length));else{let mid=joined.length>>1;target.push(new TextLeaf(joined.slice(0,mid)),new TextLeaf(joined.slice(mid)))}}else target.push(text)}replace(from,to,text){if(!(text instanceof TextLeaf))return super.replace(from,to,text);[from,to]=clip(this,from,to);let lines=appendText(this.text,appendText(text.text,sliceText(this.text,0,from)),to),newLen=this.length+text.length-(to-from);return 32>=lines.length/* Tree.Branch */?new TextLeaf(lines,newLen):TextNode.from(TextLeaf.split(lines,[]),newLen)}sliceString(from,to=this.length,lineSep="\n"){[from,to]=clip(this,from,to);let result="";for(let pos=0,i=0;pos<=to&&i<this.text.length;i++){let line=this.text[i],end=pos+line.length;pos>from&&i&&(result+=lineSep),from<end&&to>pos&&(result+=line.slice(Math.max(0,from-pos),to-pos)),pos=end+1}return result}flatten(target){for(let line of this.text)target.push(line)}scanIdentical(){return 0}static split(text,target){let part=[],len=-1;for(let line of text)part.push(line),len+=line.length+1,32==part.length/* Tree.Branch */&&(target.push(new TextLeaf(part,len)),part=[],len=-1);return-1<len&&target.push(new TextLeaf(part,len)),target}}// Nodes provide the tree structure of the `Text` type. They store a
// number of other nodes or leaves, taking care to balance themselves
// on changes. There are implied line breaks _between_ the children of
// a node (but not before the first or after the last child).
class TextNode extends Text{constructor(children,length){super(),this.children=children,this.length=length,this.lines=0;for(let child of children)this.lines+=child.lines}lineInner(target,isLine,line,offset){for(let i=0;;i++){let child=this.children[i],end=offset+child.length,endLine=line+child.lines-1;if((isLine?endLine:end)>=target)return child.lineInner(target,isLine,line,offset);offset=end+1,line=endLine+1}}decompose(from,to,target,open){for(let i=0,pos=0;pos<=to&&i<this.children.length;i++){let child=this.children[i],end=pos+child.length;if(from<=end&&to>=pos){let childOpen=open&((pos<=from?1/* Open.From */:0)|(end>=to?2/* Open.To */:0));pos>=from&&end<=to&&!childOpen?target.push(child):child.decompose(from-pos,to-pos,target,childOpen)}pos=end+1}}replace(from,to,text){if([from,to]=clip(this,from,to),text.lines<this.lines)for(let i=0,pos=0;i<this.children.length;i++){let child=this.children[i],end=pos+child.length;// Fast path: if the change only affects one child and the
// child's size remains in the acceptable range, only update
// that child
if(from>=pos&&to<=end){let updated=child.replace(from-pos,to-pos,text),totalLines=this.lines-child.lines+updated.lines;if(updated.lines<totalLines>>4&&updated.lines>totalLines>>6){let copy=this.children.slice();return copy[i]=updated,new TextNode(copy,this.length-(to-from)+text.length)}return super.replace(pos,end,updated)}pos=end+1}return super.replace(from,to,text)}sliceString(from,to=this.length,lineSep="\n"){[from,to]=clip(this,from,to);let result="";for(let i=0,pos=0;i<this.children.length&&pos<=to;i++){let child=this.children[i],end=pos+child.length;pos>from&&i&&(result+=lineSep),from<end&&to>pos&&(result+=child.sliceString(from-pos,to-pos,lineSep)),pos=end+1}return result}flatten(target){for(let child of this.children)child.flatten(target)}scanIdentical(other,dir){if(!(other instanceof TextNode))return 0;let length=0,[iA,iB,eA,eB]=0<dir?[0,0,this.children.length,other.children.length]:[this.children.length-1,other.children.length-1,-1,-1];for(;;iA+=dir,iB+=dir){if(iA==eA||iB==eB)return length;let chA=this.children[iA],chB=other.children[iB];if(chA!=chB)return length+chA.scanIdentical(chB,dir);length+=chA.length+1}}static from(children,length=children.reduce((l,ch)=>l+ch.length+1,-1)){function add(child){let last;if(child.lines>maxChunk&&child instanceof TextNode)for(let node of child.children)add(node);else child.lines>minChunk&&(currentLines>minChunk||!currentLines)?(flush(),chunked.push(child)):child instanceof TextLeaf&&currentLines&&(last=currentChunk[currentChunk.length-1])instanceof TextLeaf&&32>=child.lines+last.lines/* Tree.Branch */?(currentLines+=child.lines,currentLen+=child.length+1,currentChunk[currentChunk.length-1]=new TextLeaf(last.text.concat(child.text),last.length+1+child.length)):(currentLines+child.lines>chunk&&flush(),currentLines+=child.lines,currentLen+=child.length+1,currentChunk.push(child))}function flush(){0==currentLines||(chunked.push(1==currentChunk.length?currentChunk[0]:TextNode.from(currentChunk,currentLen)),currentLen=-1,currentLines=currentChunk.length=0)}let lines=0;for(let ch of children)lines+=ch.lines;if(32>lines/* Tree.Branch */){let flat=[];for(let ch of children)ch.flatten(flat);return new TextLeaf(flat,length)}let chunk=Math.max(32/* Tree.Branch */,lines>>5/* Tree.BranchShift */),maxChunk=chunk<<1,minChunk=chunk>>1,chunked=[],currentLines=0,currentLen=-1,currentChunk=[];for(let child of children)add(child);return flush(),1==chunked.length?chunked[0]:new TextNode(chunked,length)}}Text.empty=new TextLeaf([""],0);class RawTextCursor{constructor(text,dir=1){this.dir=dir,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[text],this.offsets=[0<dir?1:(text instanceof TextLeaf?text.text.length:text.children.length)<<1]}nextInner(skip,dir){for(this.done=this.lineBreak=!1;;){let last=this.nodes.length-1,top=this.nodes[last],offsetValue=this.offsets[last],offset=offsetValue>>1,size=top instanceof TextLeaf?top.text.length:top.children.length;if(offset==(0<dir?size:0)){if(0==last)return this.done=!0,this.value="",this;0<dir&&this.offsets[last-1]++,this.nodes.pop(),this.offsets.pop()}else if((1&offsetValue)==(0<dir?0:1)){if(this.offsets[last]+=dir,0==skip)return this.lineBreak=!0,this.value="\n",this;skip--}else if(top instanceof TextLeaf){// Move to the next string
let next=top.text[offset+(0>dir?-1:0)];if(this.offsets[last]+=dir,next.length>Math.max(0,skip))return this.value=0==skip?next:0<dir?next.slice(skip):next.slice(0,next.length-skip),this;skip-=next.length}else{let next=top.children[offset+(0>dir?-1:0)];skip>next.length?(skip-=next.length,this.offsets[last]+=dir):(0>dir&&this.offsets[last]--,this.nodes.push(next),this.offsets.push(0<dir?1:(next instanceof TextLeaf?next.text.length:next.children.length)<<1))}}}next(skip=0){return 0>skip&&(this.nextInner(-skip,-this.dir),skip=this.value.length),this.nextInner(skip,this.dir)}}class PartialTextCursor{constructor(text,start,end){this.value="",this.done=!1,this.cursor=new RawTextCursor(text,start>end?-1:1),this.pos=start>end?text.length:0,this.from=Math.min(start,end),this.to=Math.max(start,end)}nextInner(skip,dir){if(0>dir?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;skip+=Math.max(0,0>dir?this.pos-this.to:this.from-this.pos);let limit=0>dir?this.pos-this.from:this.to-this.pos;skip>limit&&(skip=limit),limit-=skip;let{value}=this.cursor.next(skip);return this.pos+=(value.length+skip)*dir,this.value=value.length<=limit?value:0>dir?value.slice(value.length-limit):value.slice(0,limit),this.done=!this.value,this}next(skip=0){return 0>skip?skip=Math.max(skip,this.from-this.pos):0<skip&&(skip=Math.min(skip,this.to-this.pos)),this.nextInner(skip,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&""!=this.value}}class LineCursor{constructor(inner){this.inner=inner,this.afterBreak=!0,this.value="",this.done=!1}next(skip=0){let{done,lineBreak,value}=this.inner.next(skip);return done&&this.afterBreak?(this.value="",this.afterBreak=!1):done?(this.done=!0,this.value=""):lineBreak?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=value,this.afterBreak=!1),this}get lineBreak(){return!1}}"undefined"!=typeof Symbol&&(Text.prototype[Symbol.iterator]=function(){return this.iter()},RawTextCursor.prototype[Symbol.iterator]=PartialTextCursor.prototype[Symbol.iterator]=LineCursor.prototype[Symbol.iterator]=function(){return this});/**
		This type describes a line in the document. It is created
		on-demand when lines are [queried](https://codemirror.net/6/docs/ref/#state.Text.lineAt).
		*/class Line{/**
		    @internal
		    */constructor(/**
		    The position of the start of the line.
		    */from,/**
		    The position at the end of the line (_before_ the line break,
		    or at the end of document for the last line).
		    */to,/**
		    This line's line number (1-based).
		    */number,/**
		    The line's content.
		    */text){this.from=from,this.to=to,this.number=number,this.text=text}/**
		    The length of the line (not including any line break after it).
		    */get length(){return this.to-this.from}}const DefaultSplit=/\r\n?|\n/;/**
		Distinguishes different ways in which positions can be mapped.
		*/exports.MapMode=void 0,function(MapMode){MapMode[MapMode.Simple=0]="Simple",MapMode[MapMode.TrackDel=1]="TrackDel",MapMode[MapMode.TrackBefore=2]="TrackBefore",MapMode[MapMode.TrackAfter=3]="TrackAfter"}(exports.MapMode||(exports.MapMode={}));/**
		A change description is a variant of [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet)
		that doesn't store the inserted text. As such, it can't be
		applied, but is cheaper to store and manipulate.
		*/class ChangeDesc{// Sections are encoded as pairs of integers. The first is the
// length in the current document, and the second is -1 for
// unaffected sections, and the length of the replacement content
// otherwise. So an insertion would be (0, n>0), a deletion (n>0,
// 0), and a replacement two positive numbers.
/**
		    @internal
		    */constructor(/**
		    @internal
		    */sections){this.sections=sections}/**
		    The length of the document before the change.
		    */get length(){let result=0;for(let i=0;i<this.sections.length;i+=2)result+=this.sections[i];return result}/**
		    The length of the document after the change.
		    */get newLength(){let result=0;for(let ins,i=0;i<this.sections.length;i+=2)ins=this.sections[i+1],result+=0>ins?this.sections[i]:ins;return result}/**
		    False when there are actual changes in this set.
		    */get empty(){return 0==this.sections.length||2==this.sections.length&&0>this.sections[1]}/**
		    Iterate over the unchanged parts left by these changes. `posA`
		    provides the position of the range in the old document, `posB`
		    the new position in the changed document.
		    */iterGaps(f){for(let i=0,posA=0,posB=0;i<this.sections.length;){let len=this.sections[i++],ins=this.sections[i++];0>ins?(f(posA,posB,len),posB+=len):posB+=ins,posA+=len}}/**
		    Iterate over the ranges changed by these changes. (See
		    [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
		    variant that also provides you with the inserted text.)
		    `fromA`/`toA` provides the extent of the change in the starting
		    document, `fromB`/`toB` the extent of the replacement in the
		    changed document.
		    
		    When `individual` is true, adjacent changes (which are kept
		    separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
		    reported separately.
		    */iterChangedRanges(f,individual=!1){iterChanges(this,f,individual)}/**
		    Get a description of the inverted form of these changes.
		    */get invertedDesc(){let sections=[];for(let i=0;i<this.sections.length;){let len=this.sections[i++],ins=this.sections[i++];0>ins?sections.push(len,ins):sections.push(ins,len)}return new ChangeDesc(sections)}/**
		    Compute the combined effect of applying another set of changes
		    after this one. The length of the document after this set should
		    match the length before `other`.
		    */composeDesc(other){return this.empty?other:other.empty?this:composeSets(this,other)}/**
		    Map this description, which should start with the same document
		    as `other`, over another set of changes, so that it can be
		    applied after it. When `before` is true, map as if the changes
		    in `this` happened before the ones in `other`.
		    */mapDesc(other,before=!1){return other.empty?this:mapSet(this,other,before)}mapPos(pos,assoc=-1,mode=exports.MapMode.Simple){let posA=0,posB=0;for(let i=0;i<this.sections.length;){let len=this.sections[i++],ins=this.sections[i++],endA=posA+len;if(0>ins){if(endA>pos)return posB+(pos-posA);posB+=len}else{if(mode!=exports.MapMode.Simple&&endA>=pos&&(mode==exports.MapMode.TrackDel&&posA<pos&&endA>pos||mode==exports.MapMode.TrackBefore&&posA<pos||mode==exports.MapMode.TrackAfter&&endA>pos))return null;if(endA>pos||endA==pos&&0>assoc&&!len)return pos==posA||0>assoc?posB:posB+ins;posB+=ins}posA=endA}if(pos>posA)throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);return posB}/**
		    Check whether these changes touch a given range. When one of the
		    changes entirely covers the range, the string `"cover"` is
		    returned.
		    */touchesRange(from,to=from){for(let i=0,pos=0;i<this.sections.length&&pos<=to;){let len=this.sections[i++],ins=this.sections[i++],end=pos+len;if(0<=ins&&pos<=to&&end>=from)return!(pos<from&&end>to)||"cover";pos=end}return!1}/**
		    @internal
		    */toString(){let result="";for(let i=0;i<this.sections.length;){let len=this.sections[i++],ins=this.sections[i++];result+=(result?" ":"")+len+(0<=ins?":"+ins:"")}return result}/**
		    Serialize this change desc to a JSON-representable value.
		    */toJSON(){return this.sections}/**
		    Create a change desc from its JSON representation (as produced
		    by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
		    */static fromJSON(json){if(!Array.isArray(json)||json.length%2||json.some(a=>"number"!=typeof a))throw new RangeError("Invalid JSON representation of ChangeDesc");return new ChangeDesc(json)}/**
		    @internal
		    */static create(sections){return new ChangeDesc(sections)}}/**
		A change set represents a group of modifications to a document. It
		stores the document length, and can only be applied to documents
		with exactly that length.
		*/class ChangeSet extends ChangeDesc{constructor(sections,/**
		    @internal
		    */inserted){super(sections),this.inserted=inserted}/**
		    Apply the changes to a document, returning the modified
		    document.
		    */apply(doc){if(this.length!=doc.length)throw new RangeError("Applying change set to a document with the wrong length");return iterChanges(this,(fromA,toA,fromB,_toB,text)=>doc=doc.replace(fromB,fromB+(toA-fromA),text),!1),doc}mapDesc(other,before=!1){return mapSet(this,other,before,!0)}/**
		    Given the document as it existed _before_ the changes, return a
		    change set that represents the inverse of this set, which could
		    be used to go from the document created by the changes back to
		    the document as it existed before the changes.
		    */invert(doc){let sections=this.sections.slice(),inserted=[];for(let i=0,pos=0;i<sections.length;i+=2){let len=sections[i],ins=sections[i+1];if(0<=ins){sections[i]=ins,sections[i+1]=len;for(let index=i>>1;inserted.length<index;)inserted.push(Text.empty);inserted.push(len?doc.slice(pos,pos+len):Text.empty)}pos+=len}return new ChangeSet(sections,inserted)}/**
		    Combine two subsequent change sets into a single set. `other`
		    must start in the document produced by `this`. If `this` goes
		    `docA` → `docB` and `other` represents `docB` → `docC`, the
		    returned value will represent the change `docA` → `docC`.
		    */compose(other){return this.empty?other:other.empty?this:composeSets(this,other,!0)}/**
		    Given another change set starting in the same document, maps this
		    change set over the other, producing a new change set that can be
		    applied to the document produced by applying `other`. When
		    `before` is `true`, order changes as if `this` comes before
		    `other`, otherwise (the default) treat `other` as coming first.
		    
		    Given two changes `A` and `B`, `A.compose(B.map(A))` and
		    `B.compose(A.map(B, true))` will produce the same document. This
		    provides a basic form of [operational
		    transformation](https://en.wikipedia.org/wiki/Operational_transformation),
		    and can be used for collaborative editing.
		    */map(other,before=!1){return other.empty?this:mapSet(this,other,before,!0)}/**
		    Iterate over the changed ranges in the document, calling `f` for
		    each, with the range in the original document (`fromA`-`toA`)
		    and the range that replaces it in the new document
		    (`fromB`-`toB`).
		    
		    When `individual` is true, adjacent changes are reported
		    separately.
		    */iterChanges(f,individual=!1){iterChanges(this,f,individual)}/**
		    Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
		    set.
		    */get desc(){return ChangeDesc.create(this.sections)}/**
		    @internal
		    */filter(ranges){let resultSections=[],resultInserted=[],filteredSections=[],iter=new SectionIter(this);done:for(let next,i=0,pos=0;;){for(next=i==ranges.length?1e9:ranges[i++];pos<next||pos==next&&0==iter.len;){if(iter.done)break done;let len=Math.min(iter.len,next-pos);addSection(filteredSections,len,-1);let ins=-1==iter.ins?-1:0==iter.off?iter.ins:0;addSection(resultSections,len,ins),0<ins&&addInsert(resultInserted,resultSections,iter.text),iter.forward(len),pos+=len}for(let end=ranges[i++];pos<end;){if(iter.done)break done;let len=Math.min(iter.len,end-pos);addSection(resultSections,len,-1),addSection(filteredSections,len,-1==iter.ins?-1:0==iter.off?iter.ins:0),iter.forward(len),pos+=len}}return{changes:new ChangeSet(resultSections,resultInserted),filtered:ChangeDesc.create(filteredSections)}}/**
		    Serialize this change set to a JSON-representable value.
		    */toJSON(){let parts=[];for(let i=0;i<this.sections.length;i+=2){let len=this.sections[i],ins=this.sections[i+1];0>ins?parts.push(len):0==ins?parts.push([len]):parts.push([len].concat(this.inserted[i>>1].toJSON()))}return parts}/**
		    Create a change set for the given changes, for a document of the
		    given length, using `lineSep` as line separator.
		    */static of(changes,length,lineSep){function flush(force=!1){if(force||sections.length){pos<length&&addSection(sections,length-pos,-1);let set=new ChangeSet(sections,inserted);total=total?total.compose(set.map(total)):set,sections=[],inserted=[],pos=0}}function process(spec){if(Array.isArray(spec))for(let sub of spec)process(sub);else if(spec instanceof ChangeSet){if(spec.length!=length)throw new RangeError(`Mismatched change set length (got ${spec.length}, expected ${length})`);flush(),total=total?total.compose(spec.map(total)):spec}else{let{from,to=from,insert}=spec;if(from>to||0>from||to>length)throw new RangeError(`Invalid change range ${from} to ${to} (in doc of length ${length})`);let insText=insert?"string"==typeof insert?Text.of(insert.split(lineSep||DefaultSplit)):insert:Text.empty,insLen=insText.length;if(from==to&&0==insLen)return;from<pos&&flush(),from>pos&&addSection(sections,from-pos,-1),addSection(sections,to-from,insLen),addInsert(inserted,sections,insText),pos=to}}let sections=[],inserted=[],pos=0,total=null;return process(changes),flush(!total),total}/**
		    Create an empty changeset of the given length.
		    */static empty(length){return new ChangeSet(length?[length,-1]:[],[])}/**
		    Create a changeset from its JSON representation (as produced by
		    [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
		    */static fromJSON(json){if(!Array.isArray(json))throw new RangeError("Invalid JSON representation of ChangeSet");let sections=[],inserted=[];for(let part,i=0;i<json.length;i++)if(part=json[i],"number"==typeof part)sections.push(part,-1);else if(!Array.isArray(part)||"number"!=typeof part[0]||part.some((e,i)=>i&&"string"!=typeof e))throw new RangeError("Invalid JSON representation of ChangeSet");else if(1==part.length)sections.push(part[0],0);else{for(;inserted.length<i;)inserted.push(Text.empty);inserted[i]=Text.of(part.slice(1)),sections.push(part[0],inserted[i].length)}return new ChangeSet(sections,inserted)}/**
		    @internal
		    */static createSet(sections,inserted){return new ChangeSet(sections,inserted)}}class SectionIter{constructor(set){this.set=set,this.i=0,this.next()}next(){let{sections}=this.set;this.i<sections.length?(this.len=sections[this.i++],this.ins=sections[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return-2==this.ins}get len2(){return 0>this.ins?this.len:this.ins}get text(){let{inserted}=this.set,index=this.i-2>>1;return index>=inserted.length?Text.empty:inserted[index]}textBit(len){let{inserted}=this.set,index=this.i-2>>1;return index>=inserted.length&&!len?Text.empty:inserted[index].slice(this.off,null==len?void 0:this.off+len)}forward(len){len==this.len?this.next():(this.len-=len,this.off+=len)}forward2(len){-1==this.ins?this.forward(len):len==this.ins?this.next():(this.ins-=len,this.off+=len)}}/**
		A single selection range. When
		[`allowMultipleSelections`](https://codemirror.net/6/docs/ref/#state.EditorState^allowMultipleSelections)
		is enabled, a [selection](https://codemirror.net/6/docs/ref/#state.EditorSelection) may hold
		multiple ranges. By default, selections hold exactly one range.
		*/class SelectionRange{constructor(/**
		    The lower boundary of the range.
		    */from,/**
		    The upper boundary of the range.
		    */to,flags){this.from=from,this.to=to,this.flags=flags}/**
		    The anchor of the range—the side that doesn't move when you
		    extend it.
		    */get anchor(){return 32&this.flags/* RangeFlag.Inverted */?this.to:this.from}/**
		    The head of the range, which is moved when the range is
		    [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
		    */get head(){return 32&this.flags/* RangeFlag.Inverted */?this.from:this.to}/**
		    True when `anchor` and `head` are at the same position.
		    */get empty(){return this.from==this.to}/**
		    If this is a cursor that is explicitly associated with the
		    character on one of its sides, this returns the side. -1 means
		    the character before its position, 1 the character after, and 0
		    means no association.
		    */get assoc(){return 8&this.flags/* RangeFlag.AssocBefore */?-1:16&this.flags/* RangeFlag.AssocAfter */?1:0}/**
		    The bidirectional text level associated with this cursor, if
		    any.
		    */get bidiLevel(){let level=7&this.flags/* RangeFlag.BidiLevelMask */;return 7==level?null:level}/**
		    The goal column (stored vertical offset) associated with a
		    cursor. This is used to preserve the vertical position when
		    [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
		    lines of different length.
		    */get goalColumn(){let value=this.flags>>6/* RangeFlag.GoalColumnOffset */;return 16777215==value/* RangeFlag.NoGoalColumn */?void 0:value}/**
		    Map this range through a change, producing a valid range in the
		    updated document.
		    */map(change,assoc=-1){let from,to;return this.empty?from=to=change.mapPos(this.from,assoc):(from=change.mapPos(this.from,1),to=change.mapPos(this.to,-1)),from==this.from&&to==this.to?this:new SelectionRange(from,to,this.flags)}/**
		    Extend this range to cover at least `from` to `to`.
		    */extend(from,to=from,assoc=0){if(from<=this.anchor&&to>=this.anchor)return EditorSelection.range(from,to,void 0,void 0,assoc);let head=Math.abs(from-this.anchor)>Math.abs(to-this.anchor)?from:to;return EditorSelection.range(this.anchor,head,void 0,void 0,assoc)}/**
		    Compare this range to another range.
		    */eq(other,includeAssoc=!1){return this.anchor==other.anchor&&this.head==other.head&&this.goalColumn==other.goalColumn&&(!includeAssoc||!this.empty||this.assoc==other.assoc)}/**
		    Return a JSON-serializable object representing the range.
		    */toJSON(){return{anchor:this.anchor,head:this.head}}/**
		    Convert a JSON representation of a range to a `SelectionRange`
		    instance.
		    */static fromJSON(json){if(!json||"number"!=typeof json.anchor||"number"!=typeof json.head)throw new RangeError("Invalid JSON representation for SelectionRange");return EditorSelection.range(json.anchor,json.head)}/**
		    @internal
		    */static create(from,to,flags){return new SelectionRange(from,to,flags)}}/**
		An editor selection holds one or more selection ranges.
		*/class EditorSelection{constructor(/**
		    The ranges in the selection, sorted by position. Ranges cannot
		    overlap (but they may touch, if they aren't empty).
		    */ranges,/**
		    The index of the _main_ range in the selection (which is
		    usually the range that was added last).
		    */mainIndex){this.ranges=ranges,this.mainIndex=mainIndex}/**
		    Map a selection through a change. Used to adjust the selection
		    position for changes.
		    */map(change,assoc=-1){return change.empty?this:EditorSelection.create(this.ranges.map(r=>r.map(change,assoc)),this.mainIndex)}/**
		    Compare this selection to another selection. By default, ranges
		    are compared only by position. When `includeAssoc` is true,
		    cursor ranges must also have the same
		    [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
		    */eq(other,includeAssoc=!1){if(this.ranges.length!=other.ranges.length||this.mainIndex!=other.mainIndex)return!1;for(let i=0;i<this.ranges.length;i++)if(!this.ranges[i].eq(other.ranges[i],includeAssoc))return!1;return!0}/**
		    Get the primary selection range. Usually, you should make sure
		    your code applies to _all_ ranges, by using methods like
		    [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
		    */get main(){return this.ranges[this.mainIndex]}/**
		    Make sure the selection only has one range. Returns a selection
		    holding only the main range from this selection.
		    */asSingle(){return 1==this.ranges.length?this:new EditorSelection([this.main],0)}/**
		    Extend this selection with an extra range.
		    */addRange(range,main=!0){return EditorSelection.create([range].concat(this.ranges),main?0:this.mainIndex+1)}/**
		    Replace a given range with another range, and then normalize the
		    selection to merge and sort ranges if necessary.
		    */replaceRange(range,which=this.mainIndex){let ranges=this.ranges.slice();return ranges[which]=range,EditorSelection.create(ranges,this.mainIndex)}/**
		    Convert this selection to an object that can be serialized to
		    JSON.
		    */toJSON(){return{ranges:this.ranges.map(r=>r.toJSON()),main:this.mainIndex}}/**
		    Create a selection from a JSON representation.
		    */static fromJSON(json){if(!json||!Array.isArray(json.ranges)||"number"!=typeof json.main||json.main>=json.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new EditorSelection(json.ranges.map(r=>SelectionRange.fromJSON(r)),json.main)}/**
		    Create a selection holding a single range.
		    */static single(anchor,head=anchor){return new EditorSelection([EditorSelection.range(anchor,head)],0)}/**
		    Sort and merge the given set of ranges, creating a valid
		    selection.
		    */static create(ranges,mainIndex=0){if(0==ranges.length)throw new RangeError("A selection needs at least one range");for(let range,pos=0,i=0;i<ranges.length;i++){if(range=ranges[i],range.empty?range.from<=pos:range.from<pos)return EditorSelection.normalized(ranges.slice(),mainIndex);pos=range.to}return new EditorSelection(ranges,mainIndex)}/**
		    Create a cursor selection range at the given position. You can
		    safely ignore the optional arguments in most situations.
		    */static cursor(pos,assoc=0,bidiLevel,goalColumn){return SelectionRange.create(pos,pos,(0==assoc?0:0>assoc?8/* RangeFlag.AssocBefore */:16/* RangeFlag.AssocAfter */)|(null==bidiLevel?7:Math.min(6,bidiLevel))|(null!==goalColumn&&void 0!==goalColumn?goalColumn:16777215/* RangeFlag.NoGoalColumn */)<<6/* RangeFlag.GoalColumnOffset */)}/**
		    Create a selection range.
		    */static range(anchor,head,goalColumn,bidiLevel,assoc){let flags=(null!==goalColumn&&void 0!==goalColumn?goalColumn:16777215/* RangeFlag.NoGoalColumn */)<<6/* RangeFlag.GoalColumnOffset */|(null==bidiLevel?7:Math.min(6,bidiLevel));return assoc||anchor==head||(assoc=head<anchor?1:-1),head<anchor?SelectionRange.create(head,anchor,48/* RangeFlag.AssocAfter */|flags):SelectionRange.create(anchor,head,(assoc?0>assoc?8/* RangeFlag.AssocBefore */:16:0/* RangeFlag.AssocAfter */)|flags)}/**
		    @internal
		    */static normalized(ranges,mainIndex=0){let main=ranges[mainIndex];ranges.sort((a,b)=>a.from-b.from),mainIndex=ranges.indexOf(main);for(let i=1;i<ranges.length;i++){let range=ranges[i],prev=ranges[i-1];if(range.empty?range.from<=prev.to:range.from<prev.to){let from=prev.from,to=Math.max(range.to,prev.to);i<=mainIndex&&mainIndex--,ranges.splice(--i,2,range.anchor>range.head?EditorSelection.range(to,from):EditorSelection.range(from,to))}}return new EditorSelection(ranges,mainIndex)}}let nextID=0;/**
		A facet is a labeled value that is associated with an editor
		state. It takes inputs from any number of extensions, and combines
		those into a single output value.

		Examples of uses of facets are the [tab
		size](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize), [editor
		attributes](https://codemirror.net/6/docs/ref/#view.EditorView^editorAttributes), and [update
		listeners](https://codemirror.net/6/docs/ref/#view.EditorView^updateListener).

		Note that `Facet` instances can be used anywhere where
		[`FacetReader`](https://codemirror.net/6/docs/ref/#state.FacetReader) is expected.
		*/class Facet{constructor(/**
		    @internal
		    */combine,/**
		    @internal
		    */compareInput,/**
		    @internal
		    */compare,isStatic,enables){this.combine=combine,this.compareInput=compareInput,this.compare=compare,this.isStatic=isStatic,this.id=nextID++,this.default=combine([]),this.extensions="function"==typeof enables?enables(this):enables}/**
		    Returns a facet reader for this facet, which can be used to
		    [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
		    */get reader(){return this}/**
		    Define a new facet.
		    */static define(config={}){return new Facet(config.combine||(a=>a),config.compareInput||((a,b)=>a===b),config.compare||(config.combine?(a,b)=>a===b:sameArray),!!config.static,config.enables)}/**
		    Returns an extension that adds the given value to this facet.
		    */of(value){return new FacetProvider([],this,0/* Provider.Static */,value)}/**
		    Create an extension that computes a value for the facet from a
		    state. You must take care to declare the parts of the state that
		    this value depends on, since your function is only called again
		    for a new state when one of those parts changed.
		    
		    In cases where your value depends only on a single field, you'll
		    want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
		    */compute(deps,get){if(this.isStatic)throw new Error("Can't compute a static facet");return new FacetProvider(deps,this,1/* Provider.Single */,get)}/**
		    Create an extension that computes zero or more values for this
		    facet from a state.
		    */computeN(deps,get){if(this.isStatic)throw new Error("Can't compute a static facet");return new FacetProvider(deps,this,2/* Provider.Multi */,get)}from(field,get){return get||(get=x=>x),this.compute([field],state=>get(state.field(field)))}}class FacetProvider{constructor(dependencies,facet,type,value){this.dependencies=dependencies,this.facet=facet,this.type=type,this.value=value,this.id=nextID++}dynamicSlot(addresses){var _a;let getter=this.value,compare=this.facet.compareInput,id=this.id,idx=addresses[id]>>1,multi=2==this.type/* Provider.Multi */,depDoc=!1,depSel=!1,depAddrs=[];for(let dep of this.dependencies)"doc"==dep?depDoc=!0:"selection"==dep?depSel=!0:0==(1&(null!==(_a=addresses[dep.id])&&void 0!==_a?_a:1))&&depAddrs.push(addresses[dep.id]);return{create(state){return state.values[idx]=getter(state),1/* SlotStatus.Changed */},update(state,tr){if(depDoc&&tr.docChanged||depSel&&(tr.docChanged||tr.selection)||ensureAll(state,depAddrs)){let newVal=getter(state);if(multi?!compareArray(newVal,state.values[idx],compare):!compare(newVal,state.values[idx]))return state.values[idx]=newVal,1/* SlotStatus.Changed */}return 0},reconfigure:(state,oldState)=>{let newVal,oldAddr=oldState.config.address[id];if(null!=oldAddr){let oldVal=getAddr(oldState,oldAddr);if(this.dependencies.every(dep=>dep instanceof Facet?oldState.facet(dep)===state.facet(dep):!(dep instanceof StateField)||oldState.field(dep,!1)==state.field(dep,!1))||(multi?compareArray(newVal=getter(state),oldVal,compare):compare(newVal=getter(state),oldVal)))return state.values[idx]=oldVal,0}else newVal=getter(state);return state.values[idx]=newVal,1/* SlotStatus.Changed */}}}}const initField=Facet.define({static:!0});/**
		Fields can store additional information in an editor state, and
		keep it in sync with the rest of the state.
		*/class StateField{constructor(/**
		    @internal
		    */id,createF,updateF,compareF,/**
		    @internal
		    */spec){this.id=id,this.createF=createF,this.updateF=updateF,this.compareF=compareF,this.spec=spec,this.provides=void 0}/**
		    Define a state field.
		    */static define(config){let field=new StateField(nextID++,config.create,config.update,config.compare||((a,b)=>a===b),config);return config.provide&&(field.provides=config.provide(field)),field}create(state){let init=state.facet(initField).find(i=>i.field==this);return((null===init||void 0===init?void 0:init.create)||this.createF)(state)}/**
		    @internal
		    */slot(addresses){let idx=addresses[this.id]>>1;return{create:state=>(state.values[idx]=this.create(state),1/* SlotStatus.Changed */),update:(state,tr)=>{let oldVal=state.values[idx],value=this.updateF(oldVal,tr);return this.compareF(oldVal,value)?0:(state.values[idx]=value,1/* SlotStatus.Changed */)},reconfigure:(state,oldState)=>{let reInit,init=state.facet(initField),oldInit=oldState.facet(initField);return(reInit=init.find(i=>i.field==this))&&reInit!=oldInit.find(i=>i.field==this)?(state.values[idx]=reInit.create(state),1/* SlotStatus.Changed */):null==oldState.config.address[this.id]?(state.values[idx]=this.create(state),1/* SlotStatus.Changed */):(state.values[idx]=oldState.field(this),0)}}}/**
		    Returns an extension that enables this field and overrides the
		    way it is initialized. Can be useful when you need to provide a
		    non-default starting value for the field.
		    */init(create){return[this,initField.of({field:this,create})]}/**
		    State field instances can be used as
		    [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
		    given state.
		    */get extension(){return this}}const Prec_={lowest:4,low:3,default:2,high:1,highest:0},Prec={/**
		    The highest precedence level, for extensions that should end up
		    near the start of the precedence ordering.
		    */highest:prec(Prec_.highest),/**
		    A higher-than-default precedence, for extensions that should
		    come before those with default precedence.
		    */high:prec(Prec_.high),/**
		    The default precedence, which is also used for extensions
		    without an explicit precedence.
		    */default:prec(Prec_.default),/**
		    A lower-than-default precedence.
		    */low:prec(Prec_.low),/**
		    The lowest precedence level. Meant for things that should end up
		    near the end of the extension order.
		    */lowest:prec(Prec_.lowest)};class PrecExtension{constructor(inner,prec){this.inner=inner,this.prec=prec}}/**
		Extension compartments can be used to make a configuration
		dynamic. By [wrapping](https://codemirror.net/6/docs/ref/#state.Compartment.of) part of your
		configuration in a compartment, you can later
		[replace](https://codemirror.net/6/docs/ref/#state.Compartment.reconfigure) that part through a
		transaction.
		*/class Compartment{/**
		    Create an instance of this compartment to add to your [state
		    configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
		    */of(ext){return new CompartmentInstance(this,ext)}/**
		    Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
		    reconfigures this compartment.
		    */reconfigure(content){return Compartment.reconfigure.of({compartment:this,extension:content})}/**
		    Get the current content of the compartment in the state, or
		    `undefined` if it isn't present.
		    */get(state){return state.config.compartments.get(this)}}class CompartmentInstance{constructor(compartment,inner){this.compartment=compartment,this.inner=inner}}class Configuration{constructor(base,compartments,dynamicSlots,address,staticValues,facets){for(this.base=base,this.compartments=compartments,this.dynamicSlots=dynamicSlots,this.address=address,this.staticValues=staticValues,this.facets=facets,this.statusTemplate=[];this.statusTemplate.length<dynamicSlots.length;)this.statusTemplate.push(0/* SlotStatus.Unresolved */)}staticFacet(facet){let addr=this.address[facet.id];return null==addr?facet.default:this.staticValues[addr>>1]}static resolve(base,compartments,oldState){let fields=[],facets=Object.create(null),newCompartments=new Map;for(let ext of flatten(base,compartments,newCompartments))ext instanceof StateField?fields.push(ext):(facets[ext.facet.id]||(facets[ext.facet.id]=[])).push(ext);let address=Object.create(null),staticValues=[],dynamicSlots=[];for(let field of fields)address[field.id]=dynamicSlots.length<<1,dynamicSlots.push(a=>field.slot(a));let oldFacets=null===oldState||void 0===oldState?void 0:oldState.config.facets;for(let id in facets){let providers=facets[id],facet=providers[0].facet,oldProviders=oldFacets&&oldFacets[id]||[];if(!providers.every(p=>0==p.type/* Provider.Static */)){for(let p of providers)0==p.type/* Provider.Static */?(address[p.id]=1|staticValues.length<<1,staticValues.push(p.value)):(address[p.id]=dynamicSlots.length<<1,dynamicSlots.push(a=>p.dynamicSlot(a)));address[facet.id]=dynamicSlots.length<<1,dynamicSlots.push(a=>dynamicFacetSlot(a,facet,providers))}else if(address[facet.id]=1|staticValues.length<<1,sameArray(oldProviders,providers))staticValues.push(oldState.facet(facet));else{let value=facet.combine(providers.map(p=>p.value));staticValues.push(oldState&&facet.compare(value,oldState.facet(facet))?oldState.facet(facet):value)}}let dynamic=dynamicSlots.map(f=>f(address));return new Configuration(base,newCompartments,dynamic,address,staticValues,facets)}}const languageData=Facet.define(),allowMultipleSelections=Facet.define({combine:values=>values.some(v=>v),static:!0}),lineSeparator=Facet.define({combine:values=>values.length?values[0]:void 0,static:!0}),changeFilter=Facet.define(),transactionFilter=Facet.define(),transactionExtender=Facet.define(),readOnly=Facet.define({combine:values=>!!values.length&&values[0]});/**
		Annotations are tagged values that are used to add metadata to
		transactions in an extensible way. They should be used to model
		things that effect the entire transaction (such as its [time
		stamp](https://codemirror.net/6/docs/ref/#state.Transaction^time) or information about its
		[origin](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent)). For effects that happen
		_alongside_ the other changes made by the transaction, [state
		effects](https://codemirror.net/6/docs/ref/#state.StateEffect) are more appropriate.
		*/class Annotation{/**
		    @internal
		    */constructor(/**
		    The annotation type.
		    */type,/**
		    The value of this annotation.
		    */value){this.type=type,this.value=value}/**
		    Define a new type of annotation.
		    */static define(){return new AnnotationType}}/**
		Marker that identifies a type of [annotation](https://codemirror.net/6/docs/ref/#state.Annotation).
		*/class AnnotationType{/**
		    Create an instance of this annotation.
		    */of(value){return new Annotation(this,value)}}/**
		Representation of a type of state effect. Defined with
		[`StateEffect.define`](https://codemirror.net/6/docs/ref/#state.StateEffect^define).
		*/class StateEffectType{/**
		    @internal
		    */constructor(// The `any` types in these function types are there to work
// around TypeScript issue #37631, where the type guard on
// `StateEffect.is` mysteriously stops working when these properly
// have type `Value`.
/**
		    @internal
		    */map){this.map=map}/**
		    Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
		    type.
		    */of(value){return new StateEffect(this,value)}}/**
		State effects can be used to represent additional effects
		associated with a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction.effects). They
		are often useful to model changes to custom [state
		fields](https://codemirror.net/6/docs/ref/#state.StateField), when those changes aren't implicit in
		document or selection changes.
		*/class StateEffect{/**
		    @internal
		    */constructor(/**
		    @internal
		    */type,/**
		    The value of this effect.
		    */value){this.type=type,this.value=value}/**
		    Map this effect through a position mapping. Will return
		    `undefined` when that ends up deleting the effect.
		    */map(mapping){let mapped=this.type.map(this.value,mapping);return void 0===mapped?void 0:mapped==this.value?this:new StateEffect(this.type,mapped)}/**
		    Tells you whether this effect object is of a given
		    [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
		    */is(type){return this.type==type}/**
		    Define a new effect type. The type parameter indicates the type
		    of values that his effect holds. It should be a type that
		    doesn't include `undefined`, since that is used in
		    [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
		    removed.
		    */static define(spec={}){return new StateEffectType(spec.map||(v=>v))}/**
		    Map an array of effects through a change set.
		    */static mapEffects(effects,mapping){if(!effects.length)return effects;let result=[];for(let effect of effects){let mapped=effect.map(mapping);mapped&&result.push(mapped)}return result}}/**
		This effect can be used to reconfigure the root extensions of
		the editor. Doing this will discard any extensions
		[appended](https://codemirror.net/6/docs/ref/#state.StateEffect^appendConfig), but does not reset
		the content of [reconfigured](https://codemirror.net/6/docs/ref/#state.Compartment.reconfigure)
		compartments.
		*/StateEffect.reconfigure=StateEffect.define(),StateEffect.appendConfig=StateEffect.define();/**
		Changes to the editor state are grouped into transactions.
		Typically, a user action creates a single transaction, which may
		contain any number of document changes, may change the selection,
		or have other effects. Create a transaction by calling
		[`EditorState.update`](https://codemirror.net/6/docs/ref/#state.EditorState.update), or immediately
		dispatch one by calling
		[`EditorView.dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch).
		*/class Transaction{constructor(/**
		    The state from which the transaction starts.
		    */startState,/**
		    The document changes made by this transaction.
		    */changes,/**
		    The selection set by this transaction, or undefined if it
		    doesn't explicitly set a selection.
		    */selection,/**
		    The effects added to the transaction.
		    */effects,/**
		    @internal
		    */annotations,/**
		    Whether the selection should be scrolled into view after this
		    transaction is dispatched.
		    */scrollIntoView){this.startState=startState,this.changes=changes,this.selection=selection,this.effects=effects,this.annotations=annotations,this.scrollIntoView=scrollIntoView,this._doc=null,this._state=null,selection&&checkSelection(selection,changes.newLength),annotations.some(a=>a.type==Transaction.time)||(this.annotations=annotations.concat(Transaction.time.of(Date.now())))}/**
		    @internal
		    */static create(startState,changes,selection,effects,annotations,scrollIntoView){return new Transaction(startState,changes,selection,effects,annotations,scrollIntoView)}/**
		    The new document produced by the transaction. Contrary to
		    [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
		    force the entire new state to be computed right away, so it is
		    recommended that [transaction
		    filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
		    when they need to look at the new document.
		    */get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}/**
		    The new selection produced by the transaction. If
		    [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
		    this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
		    current selection through the changes made by the transaction.
		    */get newSelection(){return this.selection||this.startState.selection.map(this.changes)}/**
		    The new state created by the transaction. Computed on demand
		    (but retained for subsequent access), so it is recommended not to
		    access it in [transaction
		    filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
		    */get state(){return this._state||this.startState.applyTransaction(this),this._state}/**
		    Get the value of the given annotation type, if any.
		    */annotation(type){for(let ann of this.annotations)if(ann.type==type)return ann.value}/**
		    Indicates whether the transaction changed the document.
		    */get docChanged(){return!this.changes.empty}/**
		    Indicates whether this transaction reconfigures the state
		    (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
		    with a top-level configuration
		    [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
		    */get reconfigured(){return this.startState.config!=this.state.config}/**
		    Returns true if the transaction has a [user
		    event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
		    or more specific than `event`. For example, if the transaction
		    has `"select.pointer"` as user event, `"select"` and
		    `"select.pointer"` will match it.
		    */isUserEvent(event){let e=this.annotation(Transaction.userEvent);return!!(e&&(e==event||e.length>event.length&&e.slice(0,event.length)==event&&"."==e[event.length]))}}/**
		Annotation used to store transaction timestamps. Automatically
		added to every transaction, holding `Date.now()`.
		*/Transaction.time=Annotation.define(),Transaction.userEvent=Annotation.define(),Transaction.addToHistory=Annotation.define(),Transaction.remote=Annotation.define();const none=[];exports.CharCategory=void 0,function(CharCategory){CharCategory[CharCategory.Word=0]="Word",CharCategory[CharCategory.Space=1]="Space",CharCategory[CharCategory.Other=2]="Other"}(exports.CharCategory||(exports.CharCategory={}));const nonASCIISingleCaseWordChar=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let wordChar;try{wordChar=/[\p{Alphabetic}\p{Number}_]/u}catch(_){}class EditorState{constructor(/**
		    @internal
		    */config,/**
		    The current document.
		    */doc,/**
		    The current selection.
		    */selection,/**
		    @internal
		    */values,computeSlot,tr){this.config=config,this.doc=doc,this.selection=selection,this.values=values,this.status=config.statusTemplate.slice(),this.computeSlot=computeSlot,tr&&(tr._state=this);for(let i=0;i<this.config.dynamicSlots.length;i++)ensureAddr(this,i<<1);this.computeSlot=null}field(field,require=!0){let addr=this.config.address[field.id];if(null==addr){if(require)throw new RangeError("Field is not present in this state");return}return ensureAddr(this,addr),getAddr(this,addr)}/**
		    Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
		    state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
		    can be passed. Unless
		    [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
		    [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
		    are assumed to start in the _current_ document (not the document
		    produced by previous specs), and its
		    [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
		    [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
		    to the document created by its _own_ changes. The resulting
		    transaction contains the combined effect of all the different
		    specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
		    specs take precedence over earlier ones.
		    */update(...specs){return resolveTransaction(this,specs,!0)}/**
		    @internal
		    */applyTransaction(tr){let conf=this.config,{base,compartments}=conf;for(let effect of tr.effects)effect.is(Compartment.reconfigure)?(conf&&(compartments=new Map,conf.compartments.forEach((val,key)=>compartments.set(key,val)),conf=null),compartments.set(effect.value.compartment,effect.value.extension)):effect.is(StateEffect.reconfigure)?(conf=null,base=effect.value):effect.is(StateEffect.appendConfig)&&(conf=null,base=asArray(base).concat(effect.value));let startValues;if(!conf){conf=Configuration.resolve(base,compartments,this);let intermediateState=new EditorState(conf,this.doc,this.selection,conf.dynamicSlots.map(()=>null),(state,slot)=>slot.reconfigure(state,this),null);startValues=intermediateState.values}else startValues=tr.startState.values.slice();let selection=tr.startState.facet(allowMultipleSelections)?tr.newSelection:tr.newSelection.asSingle();new EditorState(conf,tr.newDoc,selection,startValues,(state,slot)=>slot.update(state,tr),tr)}/**
		    Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
		    replaces every selection range with the given content.
		    */replaceSelection(text){return"string"==typeof text&&(text=this.toText(text)),this.changeByRange(range=>({changes:{from:range.from,to:range.to,insert:text},range:EditorSelection.cursor(range.from+text.length)}))}/**
		    Create a set of changes and a new selection by running the given
		    function for each range in the active selection. The function
		    can return an optional set of changes (in the coordinate space
		    of the start document), plus an updated range (in the coordinate
		    space of the document produced by the call's own changes). This
		    method will merge all the changes and ranges into a single
		    changeset and selection, and return it as a [transaction
		    spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
		    [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
		    */changeByRange(f){let sel=this.selection,result1=f(sel.ranges[0]),changes=this.changes(result1.changes),ranges=[result1.range],effects=asArray(result1.effects);for(let i=1;i<sel.ranges.length;i++){let result=f(sel.ranges[i]),newChanges=this.changes(result.changes),newMapped=newChanges.map(changes);for(let j=0;j<i;j++)ranges[j]=ranges[j].map(newMapped);let mapBy=changes.mapDesc(newChanges,!0);ranges.push(result.range.map(mapBy)),changes=changes.compose(newMapped),effects=StateEffect.mapEffects(effects,newMapped).concat(StateEffect.mapEffects(asArray(result.effects),mapBy))}return{changes,selection:EditorSelection.create(ranges,sel.mainIndex),effects}}/**
		    Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
		    description, taking the state's document length and line
		    separator into account.
		    */changes(spec=[]){return spec instanceof ChangeSet?spec:ChangeSet.of(spec,this.doc.length,this.facet(EditorState.lineSeparator))}/**
		    Using the state's [line
		    separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
		    [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
		    */toText(string){return Text.of(string.split(this.facet(EditorState.lineSeparator)||DefaultSplit))}/**
		    Return the given range of the document as a string.
		    */sliceDoc(from=0,to=this.doc.length){return this.doc.sliceString(from,to,this.lineBreak)}/**
		    Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
		    */facet(facet){let addr=this.config.address[facet.id];return null==addr?facet.default:(ensureAddr(this,addr),getAddr(this,addr))}/**
		    Convert this state to a JSON-serializable object. When custom
		    fields should be serialized, you can pass them in as an object
		    mapping property names (in the resulting object, which should
		    not use `doc` or `selection`) to fields.
		    */toJSON(fields){let result={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(fields)for(let prop in fields){let value=fields[prop];value instanceof StateField&&null!=this.config.address[value.id]&&(result[prop]=value.spec.toJSON(this.field(fields[prop]),this))}return result}/**
		    Deserialize a state from its JSON representation. When custom
		    fields should be deserialized, pass the same object you passed
		    to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
		    third argument.
		    */static fromJSON(json,config={},fields){if(!json||"string"!=typeof json.doc)throw new RangeError("Invalid JSON representation for EditorState");let fieldInit=[];if(fields)for(let prop in fields)if(Object.prototype.hasOwnProperty.call(json,prop)){let field=fields[prop],value=json[prop];fieldInit.push(field.init(state=>field.spec.fromJSON(value,state)))}return EditorState.create({doc:json.doc,selection:EditorSelection.fromJSON(json.selection),extensions:config.extensions?fieldInit.concat([config.extensions]):fieldInit})}/**
		    Create a new state. You'll usually only need this when
		    initializing an editor—updated states are created by applying
		    transactions.
		    */static create(config={}){let configuration=Configuration.resolve(config.extensions||[],new Map),doc=config.doc instanceof Text?config.doc:Text.of((config.doc||"").split(configuration.staticFacet(EditorState.lineSeparator)||DefaultSplit)),selection=config.selection?config.selection instanceof EditorSelection?config.selection:EditorSelection.single(config.selection.anchor,config.selection.head):EditorSelection.single(0);return checkSelection(selection,doc.length),configuration.staticFacet(allowMultipleSelections)||(selection=selection.asSingle()),new EditorState(configuration,doc,selection,configuration.dynamicSlots.map(()=>null),(state,slot)=>slot.create(state),null)}/**
		    The size (in columns) of a tab in the document, determined by
		    the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
		    */get tabSize(){return this.facet(EditorState.tabSize)}/**
		    Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
		    string for this state.
		    */get lineBreak(){return this.facet(EditorState.lineSeparator)||"\n"}/**
		    Returns true when the editor is
		    [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
		    */get readOnly(){return this.facet(readOnly)}/**
		    Look up a translation for the given phrase (via the
		    [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
		    original string if no translation is found.
		    
		    If additional arguments are passed, they will be inserted in
		    place of markers like `$1` (for the first value) and `$2`, etc.
		    A single `$` is equivalent to `$1`, and `$$` will produce a
		    literal dollar sign.
		    */phrase(phrase,...insert){for(let map of this.facet(EditorState.phrases))if(Object.prototype.hasOwnProperty.call(map,phrase)){phrase=map[phrase];break}return insert.length&&(phrase=phrase.replace(/\$(\$|\d*)/g,(m,i)=>{if("$"==i)return"$";let n=+(i||1);return!n||n>insert.length?m:insert[n-1]})),phrase}/**
		    Find the values for a given language data field, provided by the
		    the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
		    
		    Examples of language data fields are...
		    
		    - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
		      comment syntax.
		    - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
		      for providing language-specific completion sources.
		    - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
		      characters that should be considered part of words in this
		      language.
		    - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
		      bracket closing behavior.
		    */languageDataAt(name,pos,side=-1){let values=[];for(let provider of this.facet(languageData))for(let result of provider(this,pos,side))Object.prototype.hasOwnProperty.call(result,name)&&values.push(result[name]);return values}/**
		    Return a function that can categorize strings (expected to
		    represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
		    into one of:
		    
		     - Word (contains an alphanumeric character or a character
		       explicitly listed in the local language's `"wordChars"`
		       language data, which should be a string)
		     - Space (contains only whitespace)
		     - Other (anything else)
		    */charCategorizer(at){let chars=this.languageDataAt("wordChars",at);return makeCategorizer(chars.length?chars[0]:"")}/**
		    Find the word at the given position, meaning the range
		    containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
		    around it. If no word characters are adjacent to the position,
		    this returns null.
		    */wordAt(pos){let{text,from,length}=this.doc.lineAt(pos),cat=this.charCategorizer(pos),start=pos-from,end=pos-from;for(;0<start;){let prev=findClusterBreak(text,start,!1);if(cat(text.slice(prev,start))!=exports.CharCategory.Word)break;start=prev}for(;end<length;){let next=findClusterBreak(text,end);if(cat(text.slice(end,next))!=exports.CharCategory.Word)break;end=next}return start==end?null:EditorSelection.range(start+from,end+from)}}/**
		A facet that, when enabled, causes the editor to allow multiple
		ranges to be selected. Be careful though, because by default the
		editor relies on the native DOM selection, which cannot handle
		multiple selections. An extension like
		[`drawSelection`](https://codemirror.net/6/docs/ref/#view.drawSelection) can be used to make
		secondary selections visible to the user.
		*/EditorState.allowMultipleSelections=allowMultipleSelections,EditorState.tabSize=Facet.define({combine:values=>values.length?values[0]:4}),EditorState.lineSeparator=lineSeparator,EditorState.readOnly=readOnly,EditorState.phrases=Facet.define({compare(a,b){let kA=Object.keys(a),kB=Object.keys(b);return kA.length==kB.length&&kA.every(k=>a[k]==b[k])}}),EditorState.languageData=languageData,EditorState.changeFilter=changeFilter,EditorState.transactionFilter=transactionFilter,EditorState.transactionExtender=transactionExtender,Compartment.reconfigure=StateEffect.define();class RangeValue{/**
		    Compare this value with another value. Used when comparing
		    rangesets. The default implementation compares by identity.
		    Unless you are only creating a fixed number of unique instances
		    of your value type, it is a good idea to implement this
		    properly.
		    */eq(other){return this==other}/**
		    Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
		    */range(from,to=from){return Range.create(from,to,this)}}RangeValue.prototype.startSide=RangeValue.prototype.endSide=0,RangeValue.prototype.point=!1,RangeValue.prototype.mapMode=exports.MapMode.TrackDel;class Range{constructor(/**
		    The range's start position.
		    */from,/**
		    Its end position.
		    */to,/**
		    The value associated with this range.
		    */value){this.from=from,this.to=to,this.value=value}/**
		    @internal
		    */static create(from,to,value){return new Range(from,to,value)}}class Chunk{constructor(from,to,value,// Chunks are marked with the largest point that occurs
// in them (or -1 for no points), so that scans that are
// only interested in points (such as the
// heightmap-related logic) can skip range-only chunks.
maxPoint){this.from=from,this.to=to,this.value=value,this.maxPoint=maxPoint}get length(){return this.to[this.to.length-1]}// Find the index of the given position and side. Use the ranges'
// `from` pos when `end == false`, `to` when `end == true`.
findIndex(pos,side,end,startAt=0){let arr=end?this.to:this.from;for(let lo=startAt,hi=arr.length;;){if(lo==hi)return lo;let mid=lo+hi>>1,diff=arr[mid]-pos||(end?this.value[mid].endSide:this.value[mid].startSide)-side;if(mid==lo)return 0<=diff?lo:hi;0<=diff?hi=mid:lo=mid+1}}between(offset,from,to,f){for(let i=this.findIndex(from,-1e9/* C.Far */,!0),e=this.findIndex(to,1e9/* C.Far */,!1,i);i<e;i++)if(!1===f(this.from[i]+offset,this.to[i]+offset,this.value[i]))return!1}map(offset,changes){let value=[],from=[],to=[],newPos=-1,maxPoint=-1;for(let i=0;i<this.value.length;i++){let newFrom,newTo,val=this.value[i],curFrom=this.from[i]+offset,curTo=this.to[i]+offset;if(curFrom==curTo){let mapped=changes.mapPos(curFrom,val.startSide,val.mapMode);if(null==mapped)continue;if(newFrom=newTo=mapped,val.startSide!=val.endSide&&(newTo=changes.mapPos(curFrom,val.endSide),newTo<newFrom))continue}else if(newFrom=changes.mapPos(curFrom,val.startSide),newTo=changes.mapPos(curTo,val.endSide),newFrom>newTo||newFrom==newTo&&0<val.startSide&&0>=val.endSide)continue;0>(newTo-newFrom||val.endSide-val.startSide)||(0>newPos&&(newPos=newFrom),val.point&&(maxPoint=Math.max(maxPoint,newTo-newFrom)),value.push(val),from.push(newFrom-newPos),to.push(newTo-newPos))}return{mapped:value.length?new Chunk(from,to,value,maxPoint):null,pos:newPos}}}/**
		A range set stores a collection of [ranges](https://codemirror.net/6/docs/ref/#state.Range) in a
		way that makes them efficient to [map](https://codemirror.net/6/docs/ref/#state.RangeSet.map) and
		[update](https://codemirror.net/6/docs/ref/#state.RangeSet.update). This is an immutable data
		structure.
		*/class RangeSet{constructor(/**
		    @internal
		    */chunkPos,/**
		    @internal
		    */chunk,/**
		    @internal
		    */nextLayer,/**
		    @internal
		    */maxPoint){this.chunkPos=chunkPos,this.chunk=chunk,this.nextLayer=nextLayer,this.maxPoint=maxPoint}/**
		    @internal
		    */static create(chunkPos,chunk,nextLayer,maxPoint){return new RangeSet(chunkPos,chunk,nextLayer,maxPoint)}/**
		    @internal
		    */get length(){let last=this.chunk.length-1;return 0>last?0:Math.max(this.chunkEnd(last),this.nextLayer.length)}/**
		    The number of ranges in the set.
		    */get size(){if(this.isEmpty)return 0;let size=this.nextLayer.size;for(let chunk of this.chunk)size+=chunk.value.length;return size}/**
		    @internal
		    */chunkEnd(index){return this.chunkPos[index]+this.chunk[index].length}/**
		    Update the range set, optionally adding new ranges or filtering
		    out existing ones.
		    
		    (Note: The type parameter is just there as a kludge to work
		    around TypeScript variance issues that prevented `RangeSet<X>`
		    from being a subtype of `RangeSet<Y>` when `X` is a subtype of
		    `Y`.)
		    */update(updateSpec){let{add=[],sort=!1,filterFrom=0,filterTo=this.length}=updateSpec,filter=updateSpec.filter;if(0==add.length&&!filter)return this;if(sort&&(add=add.slice().sort(cmpRange)),this.isEmpty)return add.length?RangeSet.of(add):this;let cur=new LayerCursor(this,null,-1).goto(0),i=0,spill=[],builder=new RangeSetBuilder;for(;cur.value||i<add.length;)if(i<add.length&&0<=(cur.from-add[i].from||cur.startSide-add[i].value.startSide)){let range=add[i++];builder.addInner(range.from,range.to,range.value)||spill.push(range)}else 1==cur.rangeIndex&&cur.chunkIndex<this.chunk.length&&(i==add.length||this.chunkEnd(cur.chunkIndex)<add[i].from)&&(!filter||filterFrom>this.chunkEnd(cur.chunkIndex)||filterTo<this.chunkPos[cur.chunkIndex])&&builder.addChunk(this.chunkPos[cur.chunkIndex],this.chunk[cur.chunkIndex])?cur.nextChunk():((!filter||filterFrom>cur.to||filterTo<cur.from||filter(cur.from,cur.to,cur.value))&&!builder.addInner(cur.from,cur.to,cur.value)&&spill.push(Range.create(cur.from,cur.to,cur.value)),cur.next());return builder.finishInner(this.nextLayer.isEmpty&&!spill.length?RangeSet.empty:this.nextLayer.update({add:spill,filter,filterFrom,filterTo}))}/**
		    Map this range set through a set of changes, return the new set.
		    */map(changes){if(changes.empty||this.isEmpty)return this;let chunks=[],chunkPos=[],maxPoint=-1;for(let i=0;i<this.chunk.length;i++){let start=this.chunkPos[i],chunk=this.chunk[i],touch=changes.touchesRange(start,start+chunk.length);if(!1===touch)maxPoint=Math.max(maxPoint,chunk.maxPoint),chunks.push(chunk),chunkPos.push(changes.mapPos(start));else if(!0===touch){let{mapped,pos}=chunk.map(start,changes);mapped&&(maxPoint=Math.max(maxPoint,mapped.maxPoint),chunks.push(mapped),chunkPos.push(pos))}}let next=this.nextLayer.map(changes);return 0==chunks.length?next:new RangeSet(chunkPos,chunks,next||RangeSet.empty,maxPoint)}/**
		    Iterate over the ranges that touch the region `from` to `to`,
		    calling `f` for each. There is no guarantee that the ranges will
		    be reported in any specific order. When the callback returns
		    `false`, iteration stops.
		    */between(from,to,f){if(!this.isEmpty){for(let i=0;i<this.chunk.length;i++){let start=this.chunkPos[i],chunk=this.chunk[i];if(to>=start&&from<=start+chunk.length&&!1===chunk.between(start,from-start,to-start,f))return}this.nextLayer.between(from,to,f)}}/**
		    Iterate over the ranges in this set, in order, including all
		    ranges that end at or after `from`.
		    */iter(from=0){return HeapCursor.from([this]).goto(from)}/**
		    @internal
		    */get isEmpty(){return this.nextLayer==this}/**
		    Iterate over the ranges in a collection of sets, in order,
		    starting from `from`.
		    */static iter(sets,from=0){return HeapCursor.from(sets).goto(from)}/**
		    Iterate over two groups of sets, calling methods on `comparator`
		    to notify it of possible differences.
		    */static compare(oldSets,newSets,/**
		    This indicates how the underlying data changed between these
		    ranges, and is needed to synchronize the iteration.
		    */textDiff,comparator,/**
		    Can be used to ignore all non-point ranges, and points below
		    the given size. When -1, all ranges are compared.
		    */minPointSize=-1){let a=oldSets.filter(set=>0<set.maxPoint||!set.isEmpty&&set.maxPoint>=minPointSize),b=newSets.filter(set=>0<set.maxPoint||!set.isEmpty&&set.maxPoint>=minPointSize),sharedChunks=findSharedChunks(a,b,textDiff),sideA=new SpanCursor(a,sharedChunks,minPointSize),sideB=new SpanCursor(b,sharedChunks,minPointSize);textDiff.iterGaps((fromA,fromB,length)=>compare(sideA,fromA,sideB,fromB,length,comparator)),textDiff.empty&&0==textDiff.length&&compare(sideA,0,sideB,0,0,comparator)}/**
		    Compare the contents of two groups of range sets, returning true
		    if they are equivalent in the given range.
		    */static eq(oldSets,newSets,from=0,to){null==to&&(to=999999999);let a=oldSets.filter(set=>!set.isEmpty&&0>newSets.indexOf(set)),b=newSets.filter(set=>!set.isEmpty&&0>oldSets.indexOf(set));if(a.length!=b.length)return!1;if(!a.length)return!0;let sharedChunks=findSharedChunks(a,b),sideA=new SpanCursor(a,sharedChunks,0).goto(from),sideB=new SpanCursor(b,sharedChunks,0).goto(from);for(;;){if(sideA.to!=sideB.to||!sameValues(sideA.active,sideB.active)||sideA.point&&(!sideB.point||!cmpVal(sideA.point,sideB.point)))return!1;if(sideA.to>to)return!0;sideA.next(),sideB.next()}}/**
		    Iterate over a group of range sets at the same time, notifying
		    the iterator about the ranges covering every given piece of
		    content. Returns the open count (see
		    [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
		    of the iteration.
		    */static spans(sets,from,to,iterator,/**
		    When given and greater than -1, only points of at least this
		    size are taken into account.
		    */minPointSize=-1){let cursor=new SpanCursor(sets,null,minPointSize).goto(from),pos=from,openRanges=cursor.openStart;for(;;){let curTo=Math.min(cursor.to,to);if(cursor.point){let active=cursor.activeForPoint(cursor.to),openCount=cursor.pointFrom<from?active.length+1:0>cursor.point.startSide?active.length:Math.min(active.length,openRanges);iterator.point(pos,curTo,cursor.point,active,openCount,cursor.pointRank),openRanges=Math.min(cursor.openEnd(curTo),active.length)}else curTo>pos&&(iterator.span(pos,curTo,cursor.active,openRanges),openRanges=cursor.openEnd(curTo));if(cursor.to>to)return openRanges+(cursor.point&&cursor.to>to?1:0);pos=cursor.to,cursor.next()}}/**
		    Create a range set for the given range or array of ranges. By
		    default, this expects the ranges to be _sorted_ (by start
		    position and, if two start at the same position,
		    `value.startSide`). You can pass `true` as second argument to
		    cause the method to sort them.
		    */static of(ranges,sort=!1){let build=new RangeSetBuilder;for(let range of ranges instanceof Range?[ranges]:sort?lazySort(ranges):ranges)build.add(range.from,range.to,range.value);return build.finish()}/**
		    Join an array of range sets into a single set.
		    */static join(sets){if(!sets.length)return RangeSet.empty;let result=sets[sets.length-1];for(let i=sets.length-2;0<=i;i--)for(let layer=sets[i];layer!=RangeSet.empty;layer=layer.nextLayer)result=new RangeSet(layer.chunkPos,layer.chunk,result,Math.max(layer.maxPoint,result.maxPoint));return result}}/**
		The empty set of ranges.
		*/RangeSet.empty=new RangeSet([],[],null,-1),RangeSet.empty.nextLayer=RangeSet.empty;/**
		A range set builder is a data structure that helps build up a
		[range set](https://codemirror.net/6/docs/ref/#state.RangeSet) directly, without first allocating
		an array of [`Range`](https://codemirror.net/6/docs/ref/#state.Range) objects.
		*/class RangeSetBuilder{finishChunk(newArrays){this.chunks.push(new Chunk(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,newArrays&&(this.from=[],this.to=[],this.value=[])}/**
		    Create an empty builder.
		    */constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9/* C.Far */,this.lastTo=-1e9/* C.Far */,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}/**
		    Add a range. Ranges should be added in sorted (by `from` and
		    `value.startSide`) order.
		    */add(from,to,value){this.addInner(from,to,value)||(this.nextLayer||(this.nextLayer=new RangeSetBuilder)).add(from,to,value)}/**
		    @internal
		    */addInner(from,to,value){let diff=from-this.lastTo||value.startSide-this.last.endSide;if(0>=diff&&0>(from-this.lastFrom||value.startSide-this.last.startSide))throw new Error("Ranges must be added sorted by `from` position and `startSide`");return!(0>diff)&&(250==this.from.length/* C.ChunkSize */&&this.finishChunk(!0),0>this.chunkStart&&(this.chunkStart=from),this.from.push(from-this.chunkStart),this.to.push(to-this.chunkStart),this.last=value,this.lastFrom=from,this.lastTo=to,this.value.push(value),value.point&&(this.maxPoint=Math.max(this.maxPoint,to-from)),!0)}/**
		    @internal
		    */addChunk(from,chunk){if(0>(from-this.lastTo||chunk.value[0].startSide-this.last.endSide))return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,chunk.maxPoint),this.chunks.push(chunk),this.chunkPos.push(from);let last=chunk.value.length-1;return this.last=chunk.value[last],this.lastFrom=chunk.from[last]+from,this.lastTo=chunk.to[last]+from,!0}/**
		    Finish the range set. Returns the new set. The builder can't be
		    used anymore after this has been called.
		    */finish(){return this.finishInner(RangeSet.empty)}/**
		    @internal
		    */finishInner(next){if(this.from.length&&this.finishChunk(!1),0==this.chunks.length)return next;let result=RangeSet.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(next):next,this.setMaxPoint);// Make sure further `add` calls produce errors
return this.from=null,result}}class LayerCursor{constructor(layer,skip,minPoint,rank=0){this.layer=layer,this.skip=skip,this.minPoint=minPoint,this.rank=rank}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(pos,side=-1e9/* C.Far */){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(pos,side,!1),this}gotoInner(pos,side,forward){for(;this.chunkIndex<this.layer.chunk.length;){let next=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(next)||this.layer.chunkEnd(this.chunkIndex)<pos||next.maxPoint<this.minPoint))break;this.chunkIndex++,forward=!1}if(this.chunkIndex<this.layer.chunk.length){let rangeIndex=this.layer.chunk[this.chunkIndex].findIndex(pos-this.layer.chunkPos[this.chunkIndex],side,!0);(!forward||this.rangeIndex<rangeIndex)&&this.setRangeIndex(rangeIndex)}this.next()}forward(pos,side){0>(this.to-pos||this.endSide-side)&&this.gotoInner(pos,side,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9/* C.Far */,this.value=null;break}else{let chunkPos=this.layer.chunkPos[this.chunkIndex],chunk=this.layer.chunk[this.chunkIndex],from=chunkPos+chunk.from[this.rangeIndex];if(this.from=from,this.to=chunkPos+chunk.to[this.rangeIndex],this.value=chunk.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),0>this.minPoint||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(index){if(index==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=index}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(other){return this.from-other.from||this.startSide-other.startSide||this.rank-other.rank||this.to-other.to||this.endSide-other.endSide}}class HeapCursor{constructor(heap){this.heap=heap}static from(sets,skip=null,minPoint=-1){let heap=[];for(let i=0;i<sets.length;i++)for(let cur=sets[i];!cur.isEmpty;cur=cur.nextLayer)cur.maxPoint>=minPoint&&heap.push(new LayerCursor(cur,skip,minPoint,i));return 1==heap.length?heap[0]:new HeapCursor(heap)}get startSide(){return this.value?this.value.startSide:0}goto(pos,side=-1e9/* C.Far */){for(let cur of this.heap)cur.goto(pos,side);for(let i=this.heap.length>>1;0<=i;i--)heapBubble(this.heap,i);return this.next(),this}forward(pos,side){for(let cur of this.heap)cur.forward(pos,side);for(let i=this.heap.length>>1;0<=i;i--)heapBubble(this.heap,i);0>(this.to-pos||this.value.endSide-side)&&this.next()}next(){if(0==this.heap.length)this.from=this.to=1e9/* C.Far */,this.value=null,this.rank=-1;else{let top=this.heap[0];this.from=top.from,this.to=top.to,this.value=top.value,this.rank=top.rank,top.value&&top.next(),heapBubble(this.heap,0)}}}class SpanCursor{constructor(sets,skip,minPoint){this.minPoint=minPoint,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9/* C.Far */,this.endSide=0,this.openStart=-1,this.cursor=HeapCursor.from(sets,skip,minPoint)}goto(pos,side=-1e9/* C.Far */){return this.cursor.goto(pos,side),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=pos,this.endSide=side,this.openStart=-1,this.next(),this}forward(pos,side){for(;-1<this.minActive&&0>(this.activeTo[this.minActive]-pos||this.active[this.minActive].endSide-side);)this.removeActive(this.minActive);this.cursor.forward(pos,side)}removeActive(index){remove(this.active,index),remove(this.activeTo,index),remove(this.activeRank,index),this.minActive=findMinIndex(this.active,this.activeTo)}addActive(trackOpen){let i=0,{value,to,rank}=this.cursor;// Organize active marks by rank first, then by size
for(;i<this.activeRank.length&&0<(rank-this.activeRank[i]||to-this.activeTo[i]);)i++;insert(this.active,i,value),insert(this.activeTo,i,to),insert(this.activeRank,i,rank),trackOpen&&insert(trackOpen,i,this.cursor.from),this.minActive=findMinIndex(this.active,this.activeTo)}// After calling this, if `this.point` != null, the next range is a
// point. Otherwise, it's a regular range, covered by `this.active`.
next(){let from=this.to,wasPoint=this.point;this.point=null;let trackOpen=0>this.openStart?[]:null;for(;;){let a=this.minActive;if(-1<a&&0>(this.activeTo[a]-this.cursor.from||this.active[a].endSide-this.cursor.startSide)){if(this.activeTo[a]>from){this.to=this.activeTo[a],this.endSide=this.active[a].endSide;break}this.removeActive(a),trackOpen&&remove(trackOpen,a)}else if(!this.cursor.value){this.to=this.endSide=1e9/* C.Far */;break}else if(this.cursor.from>from){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let nextVal=this.cursor.value;if(!nextVal.point)this.addActive(trackOpen),this.cursor.next();else if(wasPoint&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=nextVal,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=nextVal.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(trackOpen){this.openStart=0;for(let i=trackOpen.length-1;0<=i&&trackOpen[i]<from;i--)this.openStart++}}activeForPoint(to){if(!this.active.length)return this.active;let active=[];for(let i=this.active.length-1;0<=i&&!(this.activeRank[i]<this.pointRank);i--)(this.activeTo[i]>to||this.activeTo[i]==to&&this.active[i].endSide>=this.point.endSide)&&active.push(this.active[i]);return active.reverse()}openEnd(to){let open=0;for(let i=this.activeTo.length-1;0<=i&&this.activeTo[i]>to;i--)open++;return open}}exports.Annotation=Annotation,exports.AnnotationType=AnnotationType,exports.ChangeDesc=ChangeDesc,exports.ChangeSet=ChangeSet,exports.Compartment=Compartment,exports.EditorSelection=EditorSelection,exports.EditorState=EditorState,exports.Facet=Facet,exports.Line=Line,exports.Prec=Prec,exports.Range=Range,exports.RangeSet=RangeSet,exports.RangeSetBuilder=RangeSetBuilder,exports.RangeValue=RangeValue,exports.SelectionRange=SelectionRange,exports.StateEffect=StateEffect,exports.StateEffectType=StateEffectType,exports.StateField=StateField,exports.Text=Text,exports.Transaction=Transaction,exports.codePointAt=codePointAt,exports.codePointSize=codePointSize,exports.combineConfig=combineConfig,exports.countColumn=countColumn,exports.findClusterBreak=findClusterBreak,exports.findColumn=findColumn,exports.fromCodePoint=fromCodePoint}(dist),dist)}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}