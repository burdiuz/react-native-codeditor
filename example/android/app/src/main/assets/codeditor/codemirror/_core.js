async function _coreInit_crelt(requireAsyncModule,exports={}){function requireDist(){function crelt(){var elt=arguments[0];"string"==typeof elt&&(elt=document.createElement(elt));var i=1,next=arguments[1];if(next&&"object"==typeof next&&null==next.nodeType&&!Array.isArray(next)){for(var name in next)if(Object.prototype.hasOwnProperty.call(next,name)){var value=next[name];"string"==typeof value?elt.setAttribute(name,value):null!=value&&(elt[name]=value)}i++}for(;i<arguments.length;i++)add(elt,arguments[i]);return elt}function add(elt,child){if("string"==typeof child)elt.appendChild(document.createTextNode(child));else if(null==child);else if(null!=child.nodeType)elt.appendChild(child);else if(Array.isArray(child))for(var i=0;i<child.length;i++)add(elt,child[i]);else throw new RangeError("Unsupported child node: "+child)}return hasRequiredDist?dist:(hasRequiredDist=1,dist=crelt,dist)}const module={exports:exports};var dist,hasRequiredDist,distExports=requireDist(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit_style_mod(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredStyleMod,styleMod$1={},styleModExports=function requireStyleMod(){if(hasRequiredStyleMod)return styleMod$1;hasRequiredStyleMod=1;var C="\u037C",COUNT="undefined"==typeof Symbol?"__\u037C":Symbol.for("\u037C"),SET="undefined"==typeof Symbol?"__styleSet"+Math.floor(1e8*Math.random()):Symbol("styleSet"),top="undefined"==typeof globalThis?"undefined"==typeof window?{}:window:globalThis,StyleModule=styleMod$1.StyleModule=function StyleModule(spec,options){function splitSelector(selector){return /^@/.test(selector)?[selector]:selector.split(/,\s*/)}function render(selectors,spec,target,isKeyframes){var local=[],isAt=/^@(\w+)\b/.exec(selectors[0]),keyframes=isAt&&"keyframes"==isAt[1];if(isAt&&null==spec)return target.push(selectors[0]+";");for(var prop in spec){var value=spec[prop];if(/&/.test(prop))render(prop.split(/,\s*/).map(function(part){return selectors.map(function(sel){return part.replace(/&/,sel)})}).reduce(function(a,b){return a.concat(b)}),value,target);else if(value&&"object"==typeof value){if(!isAt)throw new RangeError("The value of a property ("+prop+") should be a primitive value.");render(splitSelector(prop),value,local,keyframes)}else null!=value&&local.push(prop.replace(/_.*/,"").replace(/[A-Z]/g,function(l){return"-"+l.toLowerCase()})+": "+value+";")}(local.length||keyframes)&&target.push((!finish||isAt||isKeyframes?selectors:selectors.map(finish)).join(", ")+" {"+local.join(" ")+"}")}this.rules=[];var ref=options||{},finish=ref.finish;for(var prop in spec)render(splitSelector(prop),spec[prop],this.rules)};// :: - Style modules encapsulate a set of CSS rules defined from
// JavaScript. Their definitions are only available in a given DOM
// root after it has been _mounted_ there with `StyleModule.mount`.
//
// Style modules should be created once and stored somewhere, as
// opposed to re-creating them every time you need them. The amount of
// CSS rules generated for a given DOM root is bounded by the amount
// of style modules that were used. So to avoid leaking rules, don't
// create these dynamically, but treat them as one-time allocations.
StyleModule.prototype.getRules=function getRules(){return this.rules.join("\n")},StyleModule.newName=function newName(){var id=top[COUNT]||1;return top[COUNT]=id+1,"\u037C"+id.toString(36)},StyleModule.mount=function mount(root,modules,options){var set=root[SET],nonce=options&&options.nonce;set?nonce&&set.setNonce(nonce):set=new StyleSet(root,nonce),set.mount(Array.isArray(modules)?modules:[modules],root)};var adoptedSet=new Map,StyleSet=function StyleSet(root,nonce){var doc=root.ownerDocument||root,win=doc.defaultView;if(!root.head&&root.adoptedStyleSheets&&win.CSSStyleSheet){var adopted=adoptedSet.get(doc);if(adopted)return root[SET]=adopted;this.sheet=new win.CSSStyleSheet,adoptedSet.set(doc,this)}else this.styleTag=doc.createElement("style"),nonce&&this.styleTag.setAttribute("nonce",nonce);this.modules=[],root[SET]=this};//<Document, StyleSet>
// Style::Object<union<Style,string>>
//
// A style is an object that, in the simple case, maps CSS property
// names to strings holding their values, as in `{color: "red",
// fontWeight: "bold"}`. The property names can be given in
// camel-case—the library will insert a dash before capital letters
// when converting them to CSS.
//
// If you include an underscore in a property name, it and everything
// after it will be removed from the output, which can be useful when
// providing a property multiple times, for browser compatibility
// reasons.
//
// A property in a style object can also be a sub-selector, which
// extends the current context to add a pseudo-selector or a child
// selector. Such a property should contain a `&` character, which
// will be replaced by the current selector. For example `{"&:before":
// {content: '"hi"'}}`. Sub-selectors and regular properties can
// freely be mixed in a given object. Any property containing a `&` is
// assumed to be a sub-selector.
//
// Finally, a property can specify an @-block to be wrapped around the
// styles defined inside the object that's the property's value. For
// example to create a media query you can do `{"@media screen and
// (min-width: 400px)": {...}}`.
return StyleSet.prototype.mount=function mount(modules,root){/* Index into this.modules */for(var sheet=this.sheet,pos=0/* Current rule offset */,j=0,i=0;i<modules.length;i++){var mod=modules[i],index=this.modules.indexOf(mod);if(index<j&&-1<index&&(this.modules.splice(index,1),j--,index=-1),-1!=index){for(;j<index;)pos+=this.modules[j++].rules.length;pos+=mod.rules.length,j++}else if(this.modules.splice(j++,0,mod),sheet)for(var k=0;k<mod.rules.length;k++)sheet.insertRule(mod.rules[k],pos++)}if(sheet)0>root.adoptedStyleSheets.indexOf(this.sheet)&&(root.adoptedStyleSheets=[this.sheet].concat(root.adoptedStyleSheets));else{for(var text="",i$1=0;i$1<this.modules.length;i$1++)text+=this.modules[i$1].getRules()+"\n";this.styleTag.textContent=text;var target=root.head||root;this.styleTag.parentNode!=target&&target.insertBefore(this.styleTag,target.firstChild)}},StyleSet.prototype.setNonce=function setNonce(nonce){this.styleTag&&this.styleTag.getAttribute("nonce")!=nonce&&this.styleTag.setAttribute("nonce",nonce)},styleMod$1}(),styleMod=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(styleModExports);return module.exports=styleMod,module.exports}
async function _coreInit_w3c_keyname(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredW3cKeyname,w3cKeyname={},w3cKeynameExports=function requireW3cKeyname(){function keyName(event){// On macOS, keys held with Shift and Cmd don't reflect the effect of Shift in `.key`.
// On IE, shift effect is never included in `.key`.
var ignoreKey=mac&&event.metaKey&&event.shiftKey&&!event.ctrlKey&&!event.altKey||ie&&event.shiftKey&&event.key&&1==event.key.length||"Unidentified"==event.key,name=!ignoreKey&&event.key||(event.shiftKey?shift:base)[event.keyCode]||event.key||"Unidentified";// Edge sometimes produces wrong names (Issue #3)
return"Esc"==name&&(name="Escape"),"Del"==name&&(name="Delete"),"Left"==name&&(name="ArrowLeft"),"Up"==name&&(name="ArrowUp"),"Right"==name&&(name="ArrowRight"),"Down"==name&&(name="ArrowDown"),name}if(hasRequiredW3cKeyname)return w3cKeyname;hasRequiredW3cKeyname=1,Object.defineProperty(w3cKeyname,"__esModule",{value:!0});// Fill in the digit keys
for(var base={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},shift={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:"\""},mac="undefined"!=typeof navigator&&/Mac/.test(navigator.platform),ie="undefined"!=typeof navigator&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),i=0;10>i;i++)base[48+i]=base[96+i]=i+"";// The function keys
for(var i=1;24>=i;i++)base[i+111]="F"+i;// And the alphabetic keys
for(var i=65;90>=i;i++)base[i]=String.fromCharCode(i+32),shift[i]=String.fromCharCode(i);// For each code that doesn't have a shift-equivalent, copy the base name
for(var code in base)shift.hasOwnProperty(code)||(shift[code]=base[code]);return w3cKeyname.base=base,w3cKeyname.keyName=keyName,w3cKeyname.shift=shift,w3cKeyname}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(w3cKeynameExports);return module.exports=index,module.exports}
async function _coreInit__marijn_find_cluster_break(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,dist={},distExports=function requireDist(){function isExtendingChar(code){if(768>code)return!1;for(let mid,from=0,to=rangeFrom.length;;){if(mid=from+to>>1,code<rangeFrom[mid])to=mid;else if(code>=rangeTo[mid])from=mid+1;else return!0;if(from==to)return!1}}function isRegionalIndicator(code){return 127462<=code&&127487>=code}function findClusterBreak(str,pos,forward=!0,includeExtending=!0){return(forward?nextClusterBreak:prevClusterBreak)(str,pos,includeExtending)}function nextClusterBreak(str,pos,includeExtending){if(pos==str.length)return pos;// If pos is in the middle of a surrogate pair, move to its start
pos&&surrogateLow(str.charCodeAt(pos))&&surrogateHigh(str.charCodeAt(pos-1))&&pos--;let prev=codePointAt(str,pos);for(pos+=codePointSize(prev);pos<str.length;){let next=codePointAt(str,pos);if(prev==ZWJ||next==ZWJ||includeExtending&&isExtendingChar(next))pos+=codePointSize(next),prev=next;else if(isRegionalIndicator(next)){let countBefore=0,i=pos-2;for(;0<=i&&isRegionalIndicator(codePointAt(str,i));)countBefore++,i-=2;if(0==countBefore%2)break;else pos+=2}else break}return pos}function prevClusterBreak(str,pos,includeExtending){for(;0<pos;){let found=nextClusterBreak(str,pos-2,includeExtending);if(found<pos)return found;pos--}return 0}function codePointAt(str,pos){let code0=str.charCodeAt(pos);if(!surrogateHigh(code0)||pos+1==str.length)return code0;let code1=str.charCodeAt(pos+1);return surrogateLow(code1)?(code0-55296<<10)+(code1-56320)+65536:code0}function surrogateLow(ch){return 56320<=ch&&57344>ch}function surrogateHigh(ch){return 55296<=ch&&56320>ch}function codePointSize(code){return 65536>code?1:2}if(hasRequiredDist)return dist;hasRequiredDist=1;// These are filled with ranges (rangeFrom[i] up to but not including
// rangeTo[i]) of code points that count as extending characters.
let rangeFrom=[],rangeTo=[];(()=>{// Compressed representation of the Grapheme_Cluster_Break=Extend
// information from
// http://www.unicode.org/Public/16.0.0/ucd/auxiliary/GraphemeBreakProperty.txt.
// Each pair of elements represents a range, as an offet from the
// previous range and a length. Numbers are in base-36, with the empty
// string being a shorthand for 1.
let numbers=["lc","34","7n","7","7b","19","","","","2","","2","","","20","b","1c","l","g","","2t","7","2","6","2","2","","4","z","","u","r","2j","b","1m","9","9","","o","4","","9","","3","","5","17","3","3b","f","","w","1j","","","","4","8","4","","3","7","a","2","t","","1m","","","","2","4","8","","9","","a","2","q","","2","2","1l","","4","2","4","2","2","3","3","","u","2","3","","b","2","1l","","4","5","","2","4","","k","2","m","6","","","1m","","","2","","4","8","","7","3","a","2","u","","1n","","","","c","","9","","14","","3","","1l","3","5","3","","4","7","2","b","2","t","","1m","","2","","2","","3","","5","2","7","2","b","2","s","2","1l","2","","","2","4","8","","9","","a","2","t","","20","","4","","2","3","","","8","","29","","2","7","c","8","2q","","2","9","b","6","22","2","r","","","","","","1j","e","","5","","2","5","b","","10","9","","2u","4","","6","","2","2","2","p","2","4","3","g","4","d","","2","2","6","","f","","jj","3","qa","3","t","3","t","2","u","2","1s","2","","7","8","","2","b","9","","19","3","3b","2","y","","3a","3","4","2","9","","6","3","63","2","2","","1m","","","7","","","","","2","8","6","a","2","","1c","h","1r","4","1c","7","","","5","","14","9","c","2","w","4","2","2","","3","1k","","","2","3","","","3","1m","8","2","2","48","3","","d","","7","4","","6","","3","2","5i","1m","","5","ek","","5f","x","2da","3","3x","","2o","w","fe","6","2x","2","n9w","4","","a","w","2","28","2","7k","","3","","4","","p","2","5","","47","2","q","i","d","","12","8","p","b","1a","3","1c","","2","4","2","2","13","","1v","6","2","2","2","2","c","","8","","1b","","1f","","","3","2","2","5","2","","","16","2","8","","6m","","2","","4","","fn4","","kh","g","g","g","a6","2","gt","","6a","","45","5","1ae","3","","2","5","4","14","3","4","","4l","2","fx","4","ar","2","49","b","4w","","1i","f","1k","3","1d","4","2","2","1x","3","10","5","","8","1q","","c","2","1g","9","a","4","2","","2n","3","2","","","2","6","","4g","","3","8","l","2","1l","2","","","","","m","","e","7","3","5","5f","8","2","3","","","n","","29","","2","6","","","2","","","2","","2","6j","","2","4","6","2","","2","r","2","2d","8","2","","","2","2y","","","","2","6","","","2t","3","2","4","","5","77","9","","2","6t","","a","2","","","4","","40","4","2","2","4","","w","a","14","6","2","4","8","","9","6","2","3","1a","d","","2","ba","7","","6","","","2a","m","2","7","","2","","2","3e","6","3","","","2","","7","","","20","2","3","","","","9n","2","f0b","5","1n","7","t4","","1r","4","29","","f5k","2","43q","","","3","4","5","8","8","2","7","u","4","44","3","1iz","1j","4","1e","8","","e","","m","5","","f","11s","7","","h","2","7","","2","","5","79","7","c5","4","15s","7","31","7","240","5","gx7k","2o","3k","6o"].map(s=>s?parseInt(s,36):1);for(let i=0,n=0;i<numbers.length;i++)(i%2?rangeTo:rangeFrom).push(n+=numbers[i])})();const ZWJ=8205;return dist.findClusterBreak=findClusterBreak,dist.isExtendingChar=isExtendingChar,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__lezer_common(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,dist={},distExports=function requireDist(){return hasRequiredDist?dist:(hasRequiredDist=1,function(exports){function checkSide(side,pos,from,to){return-2/* Side.Before */===side?from<pos:-1/* Side.AtOrBefore */===side?to>=pos&&from<pos:0/* Side.Around */===side?from<pos&&to>pos:1/* Side.AtOrAfter */===side?from<=pos&&to>pos:2/* Side.After */===side?to>pos:4/* Side.DontCare */==side||void 0}function resolveNode(node,pos,side,overlays){// Move up to a node that actually holds the position, if possible
for(var _a;node.from==node.to||(1>side?node.from>=pos:node.from>pos)||(-1<side?node.to<=pos:node.to<pos);){let parent=!overlays&&node instanceof TreeNode&&0>node.index?null:node.parent;if(!parent)return node;node=parent}let mode=overlays?0:exports.IterMode.IgnoreOverlays;// Must go up out of overlays when those do not overlap with pos
if(overlays)for(let scan=node,parent=scan.parent;parent;scan=parent,parent=scan.parent)scan instanceof TreeNode&&0>scan.index&&(null===(_a=parent.enter(pos,side,mode))||void 0===_a?void 0:_a.from)!=scan.from&&(node=parent);for(;;){let inner=node.enter(pos,side,mode);if(!inner)return node;node=inner}}function getChildren(node,type,before,after){let cur=node.cursor(),result=[];if(!cur.firstChild())return result;if(null!=before)for(let found=!1;!found;)if(found=cur.type.is(before),!cur.nextSibling())return result;for(;;){if(null!=after&&cur.type.is(after))return result;if(cur.type.is(type)&&result.push(cur.node),!cur.nextSibling())return null==after?result:[]}}function matchNodeContext(node,context,i=context.length-1){for(let p=node;0<=i;p=p.parent){if(!p)return!1;if(!p.type.isAnonymous){if(context[i]&&context[i]!=p.name)return!1;i--}}return!0}function iterStack(heads){if(!heads.length)return null;let pick=0,picked=heads[0];for(let node,i=1;i<heads.length;i++)node=heads[i],(node.from>picked.from||node.to<picked.to)&&(picked=node,pick=i);let next=picked instanceof TreeNode&&0>picked.index?null:picked.parent,newHeads=heads.slice();return next?newHeads[pick]=next:newHeads.splice(pick,1),new StackIterator(newHeads,picked)}function stackIterator(tree,pos,side){let inner=tree.resolveInner(pos,side),layers=null;for(let scan=inner instanceof TreeNode?inner:inner.context.parent;scan;scan=scan.parent)if(0>scan.index){// This is an overlay root
let parent=scan.parent;(layers||(layers=[inner])).push(parent.resolve(pos,side)),scan=parent}else{let mount=MountedTree.get(scan.tree);// Relevant overlay branching off
if(mount&&mount.overlay&&mount.overlay[0].from<=pos&&mount.overlay[mount.overlay.length-1].to>=pos){let root=new TreeNode(mount.tree,mount.overlay[0].from+scan.from,-1,scan);(layers||(layers=[inner])).push(resolveNode(root,pos,side,!1))}}return layers?iterStack(layers):inner}/**
		A tree cursor object focuses on a given node in a syntax tree, and
		allows you to move to adjacent nodes.
		*/function hasChild(tree){return tree.children.some(ch=>ch instanceof TreeBuffer||!ch.type.isAnonymous||hasChild(ch))}function buildTree(data){function takeNode(parentStart,minPos,children,positions,inRepeat,depth){let{id,start,end,size}=cursor,lookAheadAtStart=lookAhead,contextAtStart=contextHash;if(0>size){if(cursor.next(),-1==size/* SpecialRecord.Reuse */){let node=reused[id];return children.push(node),void positions.push(start-parentStart)}if(-3==size/* SpecialRecord.ContextChange */)return void(contextHash=id);if(-4==size/* SpecialRecord.LookAhead */)return void(lookAhead=id);throw new RangeError(`Unrecognized record size: ${size}`)}let node,buffer,type=types[id],startPos=start-parentStart;if(end-start<=maxBufferLength&&(buffer=findBufferSize(cursor.pos-minPos,inRepeat))){// Small enough for a buffer, and no reused nodes inside
let data=new Uint16Array(buffer.size-buffer.skip),endPos=cursor.pos-buffer.size,index=data.length;for(;cursor.pos>endPos;)index=copyToBuffer(buffer.start,data,index);node=new TreeBuffer(data,end-buffer.start,nodeSet),startPos=buffer.start-parentStart}else{// Make it a node
let endPos=cursor.pos-size;cursor.next();let localChildren=[],localPositions=[],localInRepeat=id>=minRepeatType?id:-1,lastGroup=0,lastEnd=end;for(;cursor.pos>endPos;)0<=localInRepeat&&cursor.id==localInRepeat&&0<=cursor.size?(cursor.end<=lastEnd-maxBufferLength&&(makeRepeatLeaf(localChildren,localPositions,start,lastGroup,cursor.end,lastEnd,localInRepeat,lookAheadAtStart,contextAtStart),lastGroup=localChildren.length,lastEnd=cursor.end),cursor.next()):2500<depth/* CutOff.Depth */?takeFlatNode(start,endPos,localChildren,localPositions):takeNode(start,endPos,localChildren,localPositions,localInRepeat,depth+1);if(0<=localInRepeat&&0<lastGroup&&lastGroup<localChildren.length&&makeRepeatLeaf(localChildren,localPositions,start,lastGroup,start,lastEnd,localInRepeat,lookAheadAtStart,contextAtStart),localChildren.reverse(),localPositions.reverse(),-1<localInRepeat&&0<lastGroup){let make=makeBalanced(type,contextAtStart);node=balanceRange(type,localChildren,localPositions,0,localChildren.length,0,end-start,make,make)}else node=makeTree(type,localChildren,localPositions,end-start,lookAheadAtStart-end,contextAtStart)}children.push(node),positions.push(startPos)}function takeFlatNode(parentStart,minPos,children,positions){let nodes=[],nodeCount=0,stopAt=-1;// Temporary, inverted array of leaf nodes found, with absolute positions
for(;cursor.pos>minPos;){let{id,start,end,size}=cursor;if(4<size)cursor.next();else if(-1<stopAt&&start<stopAt)break;else 0>stopAt&&(stopAt=end-maxBufferLength),nodes.push(id,start,end),nodeCount++,cursor.next()}if(nodeCount){let buffer=new Uint16Array(4*nodeCount),start=nodes[nodes.length-2];for(let i=nodes.length-3,j=0;0<=i;i-=3)buffer[j++]=nodes[i],buffer[j++]=nodes[i+1]-start,buffer[j++]=nodes[i+2]-start,buffer[j++]=j;children.push(new TreeBuffer(buffer,nodes[2]-start,nodeSet)),positions.push(start-parentStart)}}function makeBalanced(type,contextHash){return(children,positions,length)=>{let last,lookAheadProp,lookAhead=0,lastI=children.length-1;if(0<=lastI&&(last=children[lastI])instanceof Tree){if(!lastI&&last.type==type&&last.length==length)return last;(lookAheadProp=last.prop(NodeProp.lookAhead))&&(lookAhead=positions[lastI]+last.length+lookAheadProp)}return makeTree(type,children,positions,length,lookAhead,contextHash)}}function makeRepeatLeaf(children,positions,base,i,from,to,type,lookAhead,contextHash){let localChildren=[],localPositions=[];for(;children.length>i;)localChildren.push(children.pop()),localPositions.push(positions.pop()+base-from);children.push(makeTree(nodeSet.types[type],localChildren,localPositions,to-from,lookAhead-to,contextHash)),positions.push(from-base)}function makeTree(type,children,positions,length,lookAhead,contextHash,props){if(contextHash){let pair=[NodeProp.contextHash,contextHash];props=props?[pair].concat(props):[pair]}if(25<lookAhead){let pair=[NodeProp.lookAhead,lookAhead];props=props?[pair].concat(props):[pair]}return new Tree(type,children,positions,length,props)}function findBufferSize(maxSize,inRepeat){// Scan through the buffer to find previous siblings that fit
// together in a TreeBuffer, and don't contain any reused nodes
// (which can't be stored in a buffer).
// If `inRepeat` is > -1, ignore node boundaries of that type for
// nesting, but make sure the end falls either at the start
// (`maxSize`) or before such a node.
let fork=cursor.fork(),size=0,start=0,skip=0,minStart=fork.end-maxBufferLength,result={size:0,start:0,skip:0};scan:for(let nodeSize,minPos=fork.pos-maxSize;fork.pos>minPos;){// Pretend nested repeat nodes of the same type don't exist
if(nodeSize=fork.size,fork.id==inRepeat&&0<=nodeSize){result.size=size,result.start=start,result.skip=skip,skip+=4,size+=4,fork.next();continue}let startPos=fork.pos-nodeSize;if(0>nodeSize||startPos<minPos||fork.start<minStart)break;let localSkipped=fork.id>=minRepeatType?4:0,nodeStart=fork.start;for(fork.next();fork.pos>startPos;){if(!(0>fork.size))fork.id>=minRepeatType&&(localSkipped+=4);else if(-3==fork.size/* SpecialRecord.ContextChange */||-4==fork.size/* SpecialRecord.LookAhead */)localSkipped+=4;else break scan;fork.next()}start=nodeStart,size+=nodeSize,skip+=localSkipped}return(0>inRepeat||size==maxSize)&&(result.size=size,result.start=start,result.skip=skip),4<result.size?result:void 0}function copyToBuffer(bufferStart,buffer,index){let{id,start,end,size}=cursor;if(cursor.next(),0<=size&&id<minRepeatType){let startIndex=index;if(4<size)for(let endPos=cursor.pos-(size-4);cursor.pos>endPos;)index=copyToBuffer(bufferStart,buffer,index);buffer[--index]=startIndex,buffer[--index]=end-bufferStart,buffer[--index]=start-bufferStart,buffer[--index]=id}else-3==size/* SpecialRecord.ContextChange */?contextHash=id:-4==size/* SpecialRecord.LookAhead */&&(lookAhead=id);return index}var _a;let{buffer,nodeSet,maxBufferLength=DefaultBufferLength,reused=[],minRepeatType=nodeSet.types.length}=data,cursor=Array.isArray(buffer)?new FlatBufferCursor(buffer,buffer.length):buffer,types=nodeSet.types,contextHash=0,lookAhead=0,children=[],positions=[];for(;0<cursor.pos;)takeNode(data.start||0,data.bufferStart||0,children,positions,-1,0);let length=null!==(_a=data.length)&&void 0!==_a?_a:children.length?positions[0]+children[0].length:0;return new Tree(types[data.topID],children.reverse(),positions.reverse(),length)}function nodeSize(balanceType,node){if(!balanceType.isAnonymous||node instanceof TreeBuffer||node.type!=balanceType)return 1;let size=nodeSizeCache.get(node);if(null==size){size=1;for(let child of node.children){if(child.type!=balanceType||!(child instanceof Tree)){size=1;break}size+=nodeSize(balanceType,child)}nodeSizeCache.set(node,size)}return size}function balanceRange(// The type the balanced tree's inner nodes.
balanceType,// The direct children and their positions
children,positions,// The index range in children/positions to use
from,to,// The start position of the nodes, relative to their parent.
start,// Length of the outer node
length,// Function to build the top node of the balanced tree
mkTop,// Function to build internal nodes for the balanced tree
mkTree){function divide(children,positions,from,to,offset){for(let i=from;i<to;){let groupFrom=i,groupStart=positions[i],groupSize=nodeSize(balanceType,children[i]);for(i++;i<to;i++){let nextSize=nodeSize(balanceType,children[i]);if(groupSize+nextSize>=maxChild)break;groupSize+=nextSize}if(i==groupFrom+1){if(groupSize>maxChild){let only=children[groupFrom];// Only trees can have a size > 1
divide(only.children,only.positions,0,only.children.length,positions[groupFrom]+offset);continue}localChildren.push(children[groupFrom])}else{let length=positions[i-1]+children[i-1].length-groupStart;localChildren.push(balanceRange(balanceType,children,positions,groupFrom,i,groupStart,length,null,mkTree))}localPositions.push(groupStart+offset-start)}}let total=0;for(let i=from;i<to;i++)total+=nodeSize(balanceType,children[i]);let maxChild=Math.ceil(1.5*total/8/* Balance.BranchFactor */),localChildren=[],localPositions=[];return divide(children,positions,from,to,0),(mkTop||mkTree)(localChildren,localPositions,length)}/**
		Provides a way to associate values with pieces of trees. As long
		as that part of the tree is reused, the associated values can be
		retrieved from an updated tree.
		*/ /**
		Create a parse wrapper that, after the inner parse completes,
		scans its tree for mixed language regions with the `nest`
		function, runs the resulting [inner parses](#common.NestedParse),
		and then [mounts](#common.NodeProp^mounted) their results onto the
		tree.
		*/function parseMixed(nest){return(parse,input,fragments,ranges)=>new MixedParse(parse,nest,input,fragments,ranges)}function checkRanges(ranges){if(!ranges.length||ranges.some(r=>r.from>=r.to))throw new RangeError("Invalid inner parse ranges given: "+JSON.stringify(ranges))}function checkCover(covered,from,to){for(let range of covered){if(range.from>=to)break;if(range.to>from)return range.from<=from&&range.to>=to?2/* Cover.Full */:1/* Cover.Partial */}return 0/* Cover.None */}// Take a piece of buffer and convert it into a stand-alone
// TreeBuffer.
function sliceBuf(buf,startI,endI,nodes,positions,off){if(startI<endI){let from=buf.buffer[startI+1];nodes.push(buf.slice(startI,endI,from)),positions.push(from-off)}}// This function takes a node that's in a buffer, and converts it, and
// its parent buffer nodes, into a Tree. This is again acting on the
// assumption that the trees and buffers have been constructed by the
// parse that was ran via the mix parser, and thus aren't shared with
// any other code, making violations of the immutability safe.
function materialize(cursor){// Split a level in the buffer, putting the nodes before and after
// the child that contains `node` into new buffers.
function split(startI,endI,type,innerOffset,length,stackPos){let targetI=stack[stackPos],children=[],positions=[];sliceBuf(buf,startI,targetI,children,positions,innerOffset);let from=b[targetI+1],to=b[targetI+2];newStack.push(children.length);let child=stackPos?split(targetI+4,b[targetI+3],buf.set.types[b[targetI]],from,to-from,stackPos-1):node.toTree();return children.push(child),positions.push(from-innerOffset),sliceBuf(buf,b[targetI+3],endI,children,positions,innerOffset),new Tree(type,children,positions,length)}let{node}=cursor,stack=[],buffer=node.context.buffer;// Scan up to the nearest tree
do stack.push(cursor.index),cursor.parent();while(!cursor.tree);// Find the index of the buffer in that tree
let base=cursor.tree,i=base.children.indexOf(buffer),buf=base.children[i],b=buf.buffer,newStack=[i];base.children[i]=split(0,b.length,NodeType.none,0,buf.length,stack.length-1);// Move the cursor back to the target node
for(let index of newStack){let tree=cursor.tree.children[index],pos=cursor.tree.positions[index];cursor.yield(new TreeNode(tree,pos+cursor.from,index,cursor._tree))}}function punchRanges(outer,ranges){let copy=null,current=ranges;for(let i=1,j=0;i<outer.length;i++)for(let r,gapFrom=outer[i-1].to,gapTo=outer[i].from;j<current.length&&(r=current[j],!(r.from>=gapTo));j++)r.to<=gapFrom||(copy||(current=copy=ranges.slice()),r.from<gapFrom?(copy[j]=new Range(r.from,gapFrom),r.to>gapTo&&copy.splice(j+1,0,new Range(gapTo,r.to))):r.to>gapTo?copy[j--]=new Range(gapTo,r.to):copy.splice(j--,1));return current}function findCoverChanges(a,b,from,to){let iA=0,iB=0,inA=!1,inB=!1,pos=-1e9,result=[];for(;;){let nextA=iA==a.length?1e9:inA?a[iA].to:a[iA].from,nextB=iB==b.length?1e9:inB?b[iB].to:b[iB].from;if(inA!=inB){let start=Math.max(pos,from),end=Math.min(nextA,nextB,to);start<end&&result.push(new Range(start,end))}if(pos=Math.min(nextA,nextB),1e9==pos)break;nextA==pos&&(inA?(inA=!1,iA++):inA=!0),nextB==pos&&(inB?(inB=!1,iB++):inB=!0)}return result}// Given a number of fragments for the outer tree, and a set of ranges
// to parse, find fragments for inner trees mounted around those
// ranges, if any.
function enterFragments(mounts,ranges){let result=[];for(let{pos,mount,frag}of mounts){let startPos=pos+(mount.overlay?mount.overlay[0].from:0),endPos=startPos+mount.tree.length,from=Math.max(frag.from,startPos),to=Math.min(frag.to,endPos);if(mount.overlay){let overlay=mount.overlay.map(r=>new Range(r.from+pos,r.to+pos)),changes=findCoverChanges(ranges,overlay,from,to);for(let i=0,pos=from;;i++){let last=i==changes.length,end=last?to:changes[i].from;if(end>pos&&result.push(new TreeFragment(pos,end,mount.tree,-startPos,frag.from>=pos||frag.openStart,frag.to<=end||frag.openEnd)),last)break;pos=changes[i].to}}else result.push(new TreeFragment(from,to,mount.tree,-startPos,frag.from>=startPos||frag.openStart,frag.to<=endPos||frag.openEnd))}return result}/**
		The default maximum length of a `TreeBuffer` node.
		*/const DefaultBufferLength=1024;let nextPropID=0;class Range{constructor(from,to){this.from=from,this.to=to}}/**
		Each [node type](#common.NodeType) or [individual tree](#common.Tree)
		can have metadata associated with it in props. Instances of this
		class represent prop names.
		*/class NodeProp{/**
		    Create a new node prop type.
		    */constructor(config={}){this.id=nextPropID++,this.perNode=!!config.perNode,this.deserialize=config.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=config.combine||null}/**
		    This is meant to be used with
		    [`NodeSet.extend`](#common.NodeSet.extend) or
		    [`LRParser.configure`](#lr.ParserConfig.props) to compute
		    prop values for each node type in the set. Takes a [match
		    object](#common.NodeType^match) or function that returns undefined
		    if the node type doesn't get this prop, and the prop's value if
		    it does.
		    */add(match){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return"function"!=typeof match&&(match=NodeType.match(match)),type=>{let result=match(type);return void 0===result?null:[this,result]}}}/**
		Prop that is used to describe matching delimiters. For opening
		delimiters, this holds an array of node names (written as a
		space-separated string when declaring this prop in a grammar)
		for the node types of closing delimiters that match it.
		*/NodeProp.closedBy=new NodeProp({deserialize:str=>str.split(" ")}),NodeProp.openedBy=new NodeProp({deserialize:str=>str.split(" ")}),NodeProp.group=new NodeProp({deserialize:str=>str.split(" ")}),NodeProp.isolate=new NodeProp({deserialize:value=>{if(value&&"rtl"!=value&&"ltr"!=value&&"auto"!=value)throw new RangeError("Invalid value for isolate: "+value);return value||"auto"}}),NodeProp.contextHash=new NodeProp({perNode:!0}),NodeProp.lookAhead=new NodeProp({perNode:!0}),NodeProp.mounted=new NodeProp({perNode:!0});/**
		A mounted tree, which can be [stored](#common.NodeProp^mounted) on
		a tree node to indicate that parts of its content are
		represented by another tree.
		*/class MountedTree{constructor(/**
		    The inner tree.
		    */tree,/**
		    If this is null, this tree replaces the entire node (it will
		    be included in the regular iteration instead of its host
		    node). If not, only the given ranges are considered to be
		    covered by this tree. This is used for trees that are mixed in
		    a way that isn't strictly hierarchical. Such mounted trees are
		    only entered by [`resolveInner`](#common.Tree.resolveInner)
		    and [`enter`](#common.SyntaxNode.enter).
		    */overlay,/**
		    The parser used to create this subtree.
		    */parser,/**
		    [Indicates](#common.IterMode.EnterBracketed) that the nested
		    content is delineated with some kind
		    of bracket token.
		    */bracketed=!1){this.tree=tree,this.overlay=overlay,this.parser=parser,this.bracketed=bracketed}/**
		    @internal
		    */static get(tree){return tree&&tree.props&&tree.props[NodeProp.mounted.id]}}const noProps=Object.create(null);/**
		Each node in a syntax tree has a node type associated with it.
		*/class NodeType{/**
		    @internal
		    */constructor(/**
		    The name of the node type. Not necessarily unique, but if the
		    grammar was written properly, different node types with the
		    same name within a node set should play the same semantic
		    role.
		    */name,/**
		    @internal
		    */props,/**
		    The id of this node in its set. Corresponds to the term ids
		    used in the parser.
		    */id,/**
		    @internal
		    */flags=0){this.name=name,this.props=props,this.id=id,this.flags=flags}/**
		    Define a node type.
		    */static define(spec){let props=spec.props&&spec.props.length?Object.create(null):noProps,flags=(spec.top?1/* NodeFlag.Top */:0)|(spec.skipped?2/* NodeFlag.Skipped */:0)|(spec.error?4/* NodeFlag.Error */:0)|(null==spec.name?8/* NodeFlag.Anonymous */:0),type=new NodeType(spec.name||"",props,spec.id,flags);if(spec.props)for(let src of spec.props)if(Array.isArray(src)||(src=src(type)),src){if(src[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");props[src[0].id]=src[1]}return type}/**
		    Retrieves a node prop for this type. Will return `undefined` if
		    the prop isn't present on this node.
		    */prop(prop){return this.props[prop.id]}/**
		    True when this is the top node of a grammar.
		    */get isTop(){return 0<(1&this.flags/* NodeFlag.Top */)}/**
		    True when this node is produced by a skip rule.
		    */get isSkipped(){return 0<(2&this.flags/* NodeFlag.Skipped */)}/**
		    Indicates whether this is an error node.
		    */get isError(){return 0<(4&this.flags/* NodeFlag.Error */)}/**
		    When true, this node type doesn't correspond to a user-declared
		    named node, for example because it is used to cache repetition.
		    */get isAnonymous(){return 0<(8&this.flags/* NodeFlag.Anonymous */)}/**
		    Returns true when this node's name or one of its
		    [groups](#common.NodeProp^group) matches the given string.
		    */is(name){if("string"==typeof name){if(this.name==name)return!0;let group=this.prop(NodeProp.group);return!!group&&-1<group.indexOf(name)}return this.id==name}/**
		    Create a function from node types to arbitrary values by
		    specifying an object whose property names are node or
		    [group](#common.NodeProp^group) names. Often useful with
		    [`NodeProp.add`](#common.NodeProp.add). You can put multiple
		    names, separated by spaces, in a single property name to map
		    multiple node names to a single value.
		    */static match(map){let direct=Object.create(null);for(let prop in map)for(let name of prop.split(" "))direct[name]=map[prop];return node=>{for(let found,groups=node.prop(NodeProp.group),i=-1;i<(groups?groups.length:0);i++)if(found=direct[0>i?node.name:groups[i]],found)return found}}}/**
		An empty dummy node type to use when no actual type is available.
		*/NodeType.none=new NodeType("",Object.create(null),0,8/* NodeFlag.Anonymous */);/**
		A node set holds a collection of node types. It is used to
		compactly represent trees by storing their type ids, rather than a
		full pointer to the type object, in a numeric array. Each parser
		[has](#lr.LRParser.nodeSet) a node set, and [tree
		buffers](#common.TreeBuffer) can only store collections of nodes
		from the same set. A set can have a maximum of 2**16 (65536) node
		types in it, so that the ids fit into 16-bit typed array slots.
		*/class NodeSet{/**
		    Create a set with the given types. The `id` property of each
		    type should correspond to its position within the array.
		    */constructor(/**
		    The node types in this set, by id.
		    */types){this.types=types;for(let i=0;i<types.length;i++)if(types[i].id!=i)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}/**
		    Create a copy of this set with some node properties added. The
		    arguments to this method can be created with
		    [`NodeProp.add`](#common.NodeProp.add).
		    */extend(...props){let newTypes=[];for(let type of this.types){let newProps=null;for(let source of props){let add=source(type);if(add){newProps||(newProps=Object.assign({},type.props));let value=add[1],prop=add[0];prop.combine&&prop.id in newProps&&(value=prop.combine(newProps[prop.id],value)),newProps[prop.id]=value}}newTypes.push(newProps?new NodeType(type.name,newProps,type.id,type.flags):type)}return new NodeSet(newTypes)}}const CachedNode=new WeakMap,CachedInnerNode=new WeakMap;/**
		Options that control iteration. Can be combined with the `|`
		operator to enable multiple ones.
		*/exports.IterMode=void 0,function(IterMode){IterMode[IterMode.ExcludeBuffers=1]="ExcludeBuffers",IterMode[IterMode.IncludeAnonymous=2]="IncludeAnonymous",IterMode[IterMode.IgnoreMounts=4]="IgnoreMounts",IterMode[IterMode.IgnoreOverlays=8]="IgnoreOverlays",IterMode[IterMode.EnterBracketed=16]="EnterBracketed"}(exports.IterMode||(exports.IterMode={}));/**
		A piece of syntax tree. There are two ways to approach these
		trees: the way they are actually stored in memory, and the
		convenient way.

		Syntax trees are stored as a tree of `Tree` and `TreeBuffer`
		objects. By packing detail information into `TreeBuffer` leaf
		nodes, the representation is made a lot more memory-efficient.

		However, when you want to actually work with tree nodes, this
		representation is very awkward, so most client code will want to
		use the [`TreeCursor`](#common.TreeCursor) or
		[`SyntaxNode`](#common.SyntaxNode) interface instead, which provides
		a view on some part of this data structure, and can be used to
		move around to adjacent nodes.
		*/class Tree{/**
		    Construct a new tree. See also [`Tree.build`](#common.Tree^build).
		    */constructor(/**
		    The type of the top node.
		    */type,/**
		    This node's child nodes.
		    */children,/**
		    The positions (offsets relative to the start of this tree) of
		    the children.
		    */positions,/**
		    The total length of this tree
		    */length,/**
		    Per-node [node props](#common.NodeProp) to associate with this node.
		    */props){if(this.type=type,this.children=children,this.positions=positions,this.length=length,this.props=null,props&&props.length){this.props=Object.create(null);for(let[prop,value]of props)this.props["number"==typeof prop?prop:prop.id]=value}}/**
		    @internal
		    */toString(){let mounted=MountedTree.get(this);if(mounted&&!mounted.overlay)return mounted.tree.toString();let children="";for(let ch of this.children){let str=ch.toString();str&&(children&&(children+=","),children+=str)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(children.length?"("+children+")":""):children}/**
		    Get a [tree cursor](#common.TreeCursor) positioned at the top of
		    the tree. Mode can be used to [control](#common.IterMode) which
		    nodes the cursor visits.
		    */cursor(mode=0){return new TreeCursor(this.topNode,mode)}/**
		    Get a [tree cursor](#common.TreeCursor) pointing into this tree
		    at the given position and side (see
		    [`moveTo`](#common.TreeCursor.moveTo).
		    */cursorAt(pos,side=0,mode=0){let scope=CachedNode.get(this)||this.topNode,cursor=new TreeCursor(scope);return cursor.moveTo(pos,side),CachedNode.set(this,cursor._tree),cursor}/**
		    Get a [syntax node](#common.SyntaxNode) object for the top of the
		    tree.
		    */get topNode(){return new TreeNode(this,0,0,null)}/**
		    Get the [syntax node](#common.SyntaxNode) at the given position.
		    If `side` is -1, this will move into nodes that end at the
		    position. If 1, it'll move into nodes that start at the
		    position. With 0, it'll only enter nodes that cover the position
		    from both sides.
		    
		    Note that this will not enter
		    [overlays](#common.MountedTree.overlay), and you often want
		    [`resolveInner`](#common.Tree.resolveInner) instead.
		    */resolve(pos,side=0){let node=resolveNode(CachedNode.get(this)||this.topNode,pos,side,!1);return CachedNode.set(this,node),node}/**
		    Like [`resolve`](#common.Tree.resolve), but will enter
		    [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
		    pointing into the innermost overlaid tree at the given position
		    (with parent links going through all parent structure, including
		    the host trees).
		    */resolveInner(pos,side=0){let node=resolveNode(CachedInnerNode.get(this)||this.topNode,pos,side,!0);return CachedInnerNode.set(this,node),node}/**
		    In some situations, it can be useful to iterate through all
		    nodes around a position, including those in overlays that don't
		    directly cover the position. This method gives you an iterator
		    that will produce all nodes, from small to big, around the given
		    position.
		    */resolveStack(pos,side=0){return stackIterator(this,pos,side)}/**
		    Iterate over the tree and its children, calling `enter` for any
		    node that touches the `from`/`to` region (if given) before
		    running over such a node's children, and `leave` (if given) when
		    leaving the node. When `enter` returns `false`, that node will
		    not have its children iterated over (or `leave` called).
		    */iterate(spec){let{enter,leave,from=0,to=this.length}=spec,mode=spec.mode||0,anon=0<(mode&exports.IterMode.IncludeAnonymous);for(let entered,c=this.cursor(mode|exports.IterMode.IncludeAnonymous);;){if(entered=!1,c.from<=to&&c.to>=from&&(!anon&&c.type.isAnonymous||!1!==enter(c))){if(c.firstChild())continue;entered=!0}for(;;){if(entered&&leave&&(anon||!c.type.isAnonymous)&&leave(c),c.nextSibling())break;if(!c.parent())return;entered=!0}}}/**
		    Get the value of the given [node prop](#common.NodeProp) for this
		    node. Works with both per-node and per-type props.
		    */prop(prop){return prop.perNode?this.props?this.props[prop.id]:void 0:this.type.prop(prop)}/**
		    Returns the node's [per-node props](#common.NodeProp.perNode) in a
		    format that can be passed to the [`Tree`](#common.Tree)
		    constructor.
		    */get propValues(){let result=[];if(this.props)for(let id in this.props)result.push([+id,this.props[id]]);return result}/**
		    Balance the direct children of this tree, producing a copy of
		    which may have children grouped into subtrees with type
		    [`NodeType.none`](#common.NodeType^none).
		    */balance(config={}){return 8>=this.children.length/* Balance.BranchFactor */?this:balanceRange(NodeType.none,this.children,this.positions,0,this.children.length,0,this.length,(children,positions,length)=>new Tree(this.type,children,positions,length,this.propValues),config.makeTree||((children,positions,length)=>new Tree(NodeType.none,children,positions,length)))}/**
		    Build a tree from a postfix-ordered buffer of node information,
		    or a cursor over such a buffer.
		    */static build(data){return buildTree(data)}}/**
		The empty tree
		*/Tree.empty=new Tree(NodeType.none,[],[],0);class FlatBufferCursor{constructor(buffer,index){this.buffer=buffer,this.index=index}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new FlatBufferCursor(this.buffer,this.index)}}/**
		Tree buffers contain (type, start, end, endIndex) quads for each
		node. In such a buffer, nodes are stored in prefix order (parents
		before children, with the endIndex of the parent indicating which
		children belong to it).
		*/class TreeBuffer{/**
		    Create a tree buffer.
		    */constructor(/**
		    The buffer's content.
		    */buffer,/**
		    The total length of the group of nodes in the buffer.
		    */length,/**
		    The node set used in this buffer.
		    */set){this.buffer=buffer,this.length=length,this.set=set}/**
		    @internal
		    */get type(){return NodeType.none}/**
		    @internal
		    */toString(){let result=[];for(let index=0;index<this.buffer.length;)result.push(this.childString(index)),index=this.buffer[index+3];return result.join(",")}/**
		    @internal
		    */childString(index){let id=this.buffer[index],endIndex=this.buffer[index+3],type=this.set.types[id],result=type.name;if(/\W/.test(result)&&!type.isError&&(result=JSON.stringify(result)),index+=4,endIndex==index)return result;let children=[];for(;index<endIndex;)children.push(this.childString(index)),index=this.buffer[index+3];return result+"("+children.join(",")+")"}/**
		    @internal
		    */findChild(startIndex,endIndex,dir,pos,side){let{buffer}=this,pick=-1;for(let i=startIndex;i!=endIndex&&!(checkSide(side,pos,buffer[i+1],buffer[i+2])&&(pick=i,0<dir));i=buffer[i+3]);return pick}/**
		    @internal
		    */slice(startI,endI,from){let b=this.buffer,copy=new Uint16Array(endI-startI),len=0;for(let i=startI,j=0;i<endI;){copy[j++]=b[i++],copy[j++]=b[i++]-from;let to=copy[j++]=b[i++]-from;copy[j++]=b[i++]-startI,len=Math.max(len,to)}return new TreeBuffer(copy,len,this.set)}}class BaseNode{cursor(mode=0){return new TreeCursor(this,mode)}getChild(type,before=null,after=null){let r=getChildren(this,type,before,after);return r.length?r[0]:null}getChildren(type,before=null,after=null){return getChildren(this,type,before,after)}resolve(pos,side=0){return resolveNode(this,pos,side,!1)}resolveInner(pos,side=0){return resolveNode(this,pos,side,!0)}matchContext(context){return matchNodeContext(this.parent,context)}enterUnfinishedNodesBefore(pos){let scan=this.childBefore(pos),node=this;for(;scan;){let last=scan.lastChild;if(!last||last.to!=scan.to)break;last.type.isError&&last.from==last.to?(node=scan,scan=last.prevSibling):scan=last}return node}get node(){return this}get next(){return this.parent}}class TreeNode extends BaseNode{constructor(_tree,from,// Index in parent node, set to -1 if the node is not a direct child of _parent.node (overlay)
index,_parent){super(),this._tree=_tree,this.from=from,this.index=index,this._parent=_parent}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(i,dir,pos,side,mode=0){for(let parent=this;;){for(let{children,positions}=parent._tree,e=0<dir?children.length:-1;i!=e;i+=dir){let mounted,next=children[i],start=positions[i]+parent.from;if(mode&exports.IterMode.EnterBracketed&&next instanceof Tree&&(mounted=MountedTree.get(next))&&!mounted.overlay&&mounted.bracketed&&pos>=start&&pos<=start+next.length||checkSide(side,pos,start,start+next.length))if(next instanceof TreeBuffer){if(mode&exports.IterMode.ExcludeBuffers)continue;let index=next.findChild(0,next.buffer.length,dir,pos-start,side);if(-1<index)return new BufferNode(new BufferContext(parent,next,i,start),null,index)}else if(mode&exports.IterMode.IncludeAnonymous||!next.type.isAnonymous||hasChild(next)){let mounted;if(!(mode&exports.IterMode.IgnoreMounts)&&(mounted=MountedTree.get(next))&&!mounted.overlay)return new TreeNode(mounted.tree,start,i,parent);let inner=new TreeNode(next,start,i,parent);return mode&exports.IterMode.IncludeAnonymous||!inner.type.isAnonymous?inner:inner.nextChild(0>dir?next.children.length-1:0,dir,pos,side,mode)}}if(mode&exports.IterMode.IncludeAnonymous||!parent.type.isAnonymous)return null;if(i=0<=parent.index?parent.index+dir:0>dir?-1:parent._parent._tree.children.length,parent=parent._parent,!parent)return null}}get firstChild(){return this.nextChild(0,1,0,4/* Side.DontCare */)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4/* Side.DontCare */)}childAfter(pos){return this.nextChild(0,1,pos,2/* Side.After */)}childBefore(pos){return this.nextChild(this._tree.children.length-1,-1,pos,-2/* Side.Before */)}prop(prop){return this._tree.prop(prop)}enter(pos,side,mode=0){let mounted;if(!(mode&exports.IterMode.IgnoreOverlays)&&(mounted=MountedTree.get(this._tree))&&mounted.overlay){let rPos=pos-this.from,enterBracketed=mode&exports.IterMode.EnterBracketed&&mounted.bracketed;for(let{from,to}of mounted.overlay)if((0<side||enterBracketed?from<=rPos:from<rPos)&&(0>side||enterBracketed?to>=rPos:to>rPos))return new TreeNode(mounted.tree,mounted.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,pos,side,mode)}nextSignificantParent(){let val=this;for(;val.type.isAnonymous&&val._parent;)val=val._parent;return val}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&0<=this.index?this._parent.nextChild(this.index+1,1,0,4/* Side.DontCare */):null}get prevSibling(){return this._parent&&0<=this.index?this._parent.nextChild(this.index-1,-1,0,4/* Side.DontCare */):null}get tree(){return this._tree}toTree(){return this._tree}/**
		    @internal
		    */toString(){return this._tree.toString()}}class BufferContext{constructor(parent,buffer,index,start){this.parent=parent,this.buffer=buffer,this.index=index,this.start=start}}class BufferNode extends BaseNode{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(context,_parent,index){super(),this.context=context,this._parent=_parent,this.index=index,this.type=context.buffer.set.types[context.buffer.buffer[index]]}child(dir,pos,side){let{buffer}=this.context,index=buffer.findChild(this.index+4,buffer.buffer[this.index+3],dir,pos-this.context.start,side);return 0>index?null:new BufferNode(this.context,this,index)}get firstChild(){return this.child(1,0,4/* Side.DontCare */)}get lastChild(){return this.child(-1,0,4/* Side.DontCare */)}childAfter(pos){return this.child(1,pos,2/* Side.After */)}childBefore(pos){return this.child(-1,pos,-2/* Side.Before */)}prop(prop){return this.type.prop(prop)}enter(pos,side,mode=0){if(mode&exports.IterMode.ExcludeBuffers)return null;let{buffer}=this.context,index=buffer.findChild(this.index+4,buffer.buffer[this.index+3],0<side?1:-1,pos-this.context.start,side);return 0>index?null:new BufferNode(this.context,this,index)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(dir){return this._parent?null:this.context.parent.nextChild(this.context.index+dir,dir,0,4/* Side.DontCare */)}get nextSibling(){let{buffer}=this.context,after=buffer.buffer[this.index+3];return after<(this._parent?buffer.buffer[this._parent.index+3]:buffer.buffer.length)?new BufferNode(this.context,this._parent,after):this.externalSibling(1)}get prevSibling(){let{buffer}=this.context,parentStart=this._parent?this._parent.index+4:0;return this.index==parentStart?this.externalSibling(-1):new BufferNode(this.context,this._parent,buffer.findChild(parentStart,this.index,-1,0,4/* Side.DontCare */))}get tree(){return null}toTree(){let children=[],positions=[],{buffer}=this.context,startI=this.index+4,endI=buffer.buffer[this.index+3];if(endI>startI){let from=buffer.buffer[this.index+1];children.push(buffer.slice(startI,endI,from)),positions.push(0)}return new Tree(this.type,children,positions,this.to-this.from)}/**
		    @internal
		    */toString(){return this.context.buffer.childString(this.index)}}class StackIterator{constructor(heads,node){this.heads=heads,this.node=node}get next(){return iterStack(this.heads)}}class TreeCursor{/**
		    Shorthand for `.type.name`.
		    */get name(){return this.type.name}/**
		    @internal
		    */constructor(node,mode=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=mode&~exports.IterMode.EnterBracketed,node instanceof TreeNode)this.yieldNode(node);else{this._tree=node.context.parent,this.buffer=node.context;for(let n=node._parent;n;n=n._parent)this.stack.unshift(n.index);this.bufferNode=node,this.yieldBuf(node.index)}}yieldNode(node){return!!node&&(this._tree=node,this.type=node.type,this.from=node.from,this.to=node.to,!0)}yieldBuf(index,type){this.index=index;let{start,buffer}=this.buffer;return this.type=type||buffer.set.types[buffer.buffer[index]],this.from=start+buffer.buffer[index+1],this.to=start+buffer.buffer[index+2],!0}/**
		    @internal
		    */yield(node){return!!node&&(node instanceof TreeNode?(this.buffer=null,this.yieldNode(node)):(this.buffer=node.context,this.yieldBuf(node.index,node.type)))}/**
		    @internal
		    */toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}/**
		    @internal
		    */enterChild(dir,pos,side){if(!this.buffer)return this.yield(this._tree.nextChild(0>dir?this._tree._tree.children.length-1:0,dir,pos,side,this.mode));let{buffer}=this.buffer,index=buffer.findChild(this.index+4,buffer.buffer[this.index+3],dir,pos-this.buffer.start,side);return!(0>index)&&(this.stack.push(this.index),this.yieldBuf(index))}/**
		    Move the cursor to this node's first child. When this returns
		    false, the node has no child, and the cursor has not been moved.
		    */firstChild(){return this.enterChild(1,0,4/* Side.DontCare */)}/**
		    Move the cursor to this node's last child.
		    */lastChild(){return this.enterChild(-1,0,4/* Side.DontCare */)}/**
		    Move the cursor to the first child that ends after `pos`.
		    */childAfter(pos){return this.enterChild(1,pos,2/* Side.After */)}/**
		    Move to the last child that starts before `pos`.
		    */childBefore(pos){return this.enterChild(-1,pos,-2/* Side.Before */)}/**
		    Move the cursor to the child around `pos`. If side is -1 the
		    child may end at that position, when 1 it may start there. This
		    will also enter [overlaid](#common.MountedTree.overlay)
		    [mounted](#common.NodeProp^mounted) trees unless `overlays` is
		    set to false.
		    */enter(pos,side,mode=this.mode){return this.buffer?!(mode&exports.IterMode.ExcludeBuffers)&&this.enterChild(1,pos,side):this.yield(this._tree.enter(pos,side,mode))}/**
		    Move to the node's parent node, if this isn't the top node.
		    */parent(){if(!this.buffer)return this.yieldNode(this.mode&exports.IterMode.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let parent=this.mode&exports.IterMode.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(parent)}/**
		    @internal
		    */sibling(dir){if(!this.buffer)return!!this._tree._parent&&this.yield(0>this._tree.index?null:this._tree._parent.nextChild(this._tree.index+dir,dir,0,4/* Side.DontCare */,this.mode));let{buffer}=this.buffer,d=this.stack.length-1;if(0>dir){let parentStart=0>d?0:this.stack[d]+4;if(this.index!=parentStart)return this.yieldBuf(buffer.findChild(parentStart,this.index,-1,0,4/* Side.DontCare */))}else{let after=buffer.buffer[this.index+3];if(after<(0>d?buffer.buffer.length:buffer.buffer[this.stack[d]+3]))return this.yieldBuf(after)}return!!(0>d)&&this.yield(this.buffer.parent.nextChild(this.buffer.index+dir,dir,0,4/* Side.DontCare */,this.mode))}/**
		    Move to this node's next sibling, if any.
		    */nextSibling(){return this.sibling(1)}/**
		    Move to this node's previous sibling, if any.
		    */prevSibling(){return this.sibling(-1)}atLastNode(dir){let index,parent,{buffer}=this;if(buffer){if(!(0<dir)){for(let i=0;i<this.index;i++)if(buffer.buffer.buffer[i+3]<this.index)return!1;}else if(this.index<buffer.buffer.buffer.length)return!1;({index,parent}=buffer)}else({index,_parent:parent}=this._tree);for(;parent;({index,_parent:parent}=parent))if(-1<index)for(let child,i=index+dir,e=0>dir?-1:parent._tree.children.length;i!=e;i+=dir)if(child=parent._tree.children[i],this.mode&exports.IterMode.IncludeAnonymous||child instanceof TreeBuffer||!child.type.isAnonymous||hasChild(child))return!1;return!0}move(dir,enter){if(enter&&this.enterChild(dir,0,4/* Side.DontCare */))return!0;for(;;){if(this.sibling(dir))return!0;if(this.atLastNode(dir)||!this.parent())return!1}}/**
		    Move to the next node in a
		    [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
		    traversal, going from a node to its first child or, if the
		    current node is empty or `enter` is false, its next sibling or
		    the next sibling of the first parent node that has one.
		    */next(enter=!0){return this.move(1,enter)}/**
		    Move to the next node in a last-to-first pre-order traversal. A
		    node is followed by its last child or, if it has none, its
		    previous sibling or the previous sibling of the first parent
		    node that has one.
		    */prev(enter=!0){return this.move(-1,enter)}/**
		    Move the cursor to the innermost node that covers `pos`. If
		    `side` is -1, it will enter nodes that end at `pos`. If it is 1,
		    it will enter nodes that start at `pos`.
		    */moveTo(pos,side=0){// Move up to a node that actually holds the position, if possible
for(;(this.from==this.to||(1>side?this.from>=pos:this.from>pos)||(-1<side?this.to<=pos:this.to<pos))&&!!this.parent(););// Then scan down into child nodes as far as possible
for(;this.enterChild(1,pos,side););return this}/**
		    Get a [syntax node](#common.SyntaxNode) at the cursor's current
		    position.
		    */get node(){if(!this.buffer)return this._tree;let cache=this.bufferNode,result=null,depth=0;if(cache&&cache.context==this.buffer)scan:for(let index=this.index,d=this.stack.length;0<=d;){for(let c=cache;c;c=c._parent)if(c.index==index){if(index==this.index)return c;result=c,depth=d+1;break scan}index=this.stack[--d]}for(let i=depth;i<this.stack.length;i++)result=new BufferNode(this.buffer,result,this.stack[i]);return this.bufferNode=new BufferNode(this.buffer,result,this.index)}/**
		    Get the [tree](#common.Tree) that represents the current node, if
		    any. Will return null when the node is in a [tree
		    buffer](#common.TreeBuffer).
		    */get tree(){return this.buffer?null:this._tree._tree}/**
		    Iterate over the current node and all its descendants, calling
		    `enter` when entering a node and `leave`, if given, when leaving
		    one. When `enter` returns `false`, any children of that node are
		    skipped, and `leave` isn't called for it.
		    */iterate(enter,leave){for(let mustLeave,depth=0;;){if(mustLeave=!1,this.type.isAnonymous||!1!==enter(this)){if(this.firstChild()){depth++;continue}this.type.isAnonymous||(mustLeave=!0)}for(;;){if(mustLeave&&leave&&leave(this),mustLeave=this.type.isAnonymous,!depth)return;if(this.nextSibling())break;this.parent(),depth--,mustLeave=!0}}}/**
		    Test whether the current node matches a given context—a sequence
		    of direct parent node names. Empty strings in the context array
		    are treated as wildcards.
		    */matchContext(context){if(!this.buffer)return matchNodeContext(this.node.parent,context);let{buffer}=this.buffer,{types}=buffer.set;for(let i=context.length-1,d=this.stack.length-1;0<=i;d--){if(0>d)return matchNodeContext(this._tree,context,i);let type=types[buffer.buffer[this.stack[d]]];if(!type.isAnonymous){if(context[i]&&context[i]!=type.name)return!1;i--}}return!0}}const nodeSizeCache=new WeakMap;class NodeWeakMap{constructor(){this.map=new WeakMap}setBuffer(buffer,index,value){let inner=this.map.get(buffer);inner||this.map.set(buffer,inner=new Map),inner.set(index,value)}getBuffer(buffer,index){let inner=this.map.get(buffer);return inner&&inner.get(index)}/**
		    Set the value for this syntax node.
		    */set(node,value){node instanceof BufferNode?this.setBuffer(node.context.buffer,node.index,value):node instanceof TreeNode&&this.map.set(node.tree,value)}/**
		    Retrieve value for this syntax node, if it exists in the map.
		    */get(node){return node instanceof BufferNode?this.getBuffer(node.context.buffer,node.index):node instanceof TreeNode?this.map.get(node.tree):void 0}/**
		    Set the value for the node that a cursor currently points to.
		    */cursorSet(cursor,value){cursor.buffer?this.setBuffer(cursor.buffer.buffer,cursor.index,value):this.map.set(cursor.tree,value)}/**
		    Retrieve the value for the node that a cursor currently points
		    to.
		    */cursorGet(cursor){return cursor.buffer?this.getBuffer(cursor.buffer.buffer,cursor.index):this.map.get(cursor.tree)}}/**
		Tree fragments are used during [incremental
		parsing](#common.Parser.startParse) to track parts of old trees
		that can be reused in a new parse. An array of fragments is used
		to track regions of an old tree whose nodes might be reused in new
		parses. Use the static
		[`applyChanges`](#common.TreeFragment^applyChanges) method to
		update fragments for document changes.
		*/class TreeFragment{/**
		    Construct a tree fragment. You'll usually want to use
		    [`addTree`](#common.TreeFragment^addTree) and
		    [`applyChanges`](#common.TreeFragment^applyChanges) instead of
		    calling this directly.
		    */constructor(/**
		    The start of the unchanged range pointed to by this fragment.
		    This refers to an offset in the _updated_ document (as opposed
		    to the original tree).
		    */from,/**
		    The end of the unchanged range.
		    */to,/**
		    The tree that this fragment is based on.
		    */tree,/**
		    The offset between the fragment's tree and the document that
		    this fragment can be used against. Add this when going from
		    document to tree positions, subtract it to go from tree to
		    document positions.
		    */offset,openStart=!1,openEnd=!1){this.from=from,this.to=to,this.tree=tree,this.offset=offset,this.open=(openStart?1/* Open.Start */:0)|(openEnd?2/* Open.End */:0)}/**
		    Whether the start of the fragment represents the start of a
		    parse, or the end of a change. (In the second case, it may not
		    be safe to reuse some nodes at the start, depending on the
		    parsing algorithm.)
		    */get openStart(){return 0<(1&this.open/* Open.Start */)}/**
		    Whether the end of the fragment represents the end of a
		    full-document parse, or the start of a change.
		    */get openEnd(){return 0<(2&this.open/* Open.End */)}/**
		    Create a set of fragments from a freshly parsed tree, or update
		    an existing set of fragments by replacing the ones that overlap
		    with a tree with content from the new tree. When `partial` is
		    true, the parse is treated as incomplete, and the resulting
		    fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
		    true.
		    */static addTree(tree,fragments=[],partial=!1){let result=[new TreeFragment(0,tree.length,tree,0,!1,partial)];for(let f of fragments)f.to>tree.length&&result.push(f);return result}/**
		    Apply a set of edits to an array of fragments, removing or
		    splitting fragments as necessary to remove edited ranges, and
		    adjusting offsets for fragments that moved.
		    */static applyChanges(fragments,changes,minGap=128){if(!changes.length)return fragments;let result=[],fI=1,nextF=fragments.length?fragments[0]:null;for(let cI=0,pos=0,off=0;;cI++){let nextC=cI<changes.length?changes[cI]:null,nextPos=nextC?nextC.fromA:1e9;if(nextPos-pos>=minGap)for(;nextF&&nextF.from<nextPos;){let cut=nextF;if(pos>=cut.from||nextPos<=cut.to||off){let fFrom=Math.max(cut.from,pos)-off,fTo=Math.min(cut.to,nextPos)-off;cut=fFrom>=fTo?null:new TreeFragment(fFrom,fTo,cut.tree,cut.offset+off,0<cI,!!nextC)}if(cut&&result.push(cut),nextF.to>nextPos)break;nextF=fI<fragments.length?fragments[fI++]:null}if(!nextC)break;pos=nextC.toA,off=nextC.toA-nextC.toB}return result}}/**
		A superclass that parsers should extend.
		*/class Parser{/**
		    Start a parse, returning a [partial parse](#common.PartialParse)
		    object. [`fragments`](#common.TreeFragment) can be passed in to
		    make the parse incremental.
		    
		    By default, the entire input is parsed. You can pass `ranges`,
		    which should be a sorted array of non-empty, non-overlapping
		    ranges, to parse only those ranges. The tree returned in that
		    case will start at `ranges[0].from`.
		    */startParse(input,fragments,ranges){return"string"==typeof input&&(input=new StringInput(input)),ranges=ranges?ranges.length?ranges.map(r=>new Range(r.from,r.to)):[new Range(0,0)]:[new Range(0,input.length)],this.createParse(input,fragments||[],ranges)}/**
		    Run a full parse, returning the resulting tree.
		    */parse(input,fragments,ranges){for(let done,parse=this.startParse(input,fragments,ranges);;)if(done=parse.advance(),done)return done}}class StringInput{constructor(string){this.string=string}get length(){return this.string.length}chunk(from){return this.string.slice(from)}get lineChunks(){return!1}read(from,to){return this.string.slice(from,to)}}class InnerParse{constructor(parser,parse,overlay,bracketed,target,from){this.parser=parser,this.parse=parse,this.overlay=overlay,this.bracketed=bracketed,this.target=target,this.from=from}}class ActiveOverlay{constructor(parser,predicate,mounts,index,start,bracketed,target,prev){this.parser=parser,this.predicate=predicate,this.mounts=mounts,this.index=index,this.start=start,this.bracketed=bracketed,this.target=target,this.prev=prev,this.depth=0,this.ranges=[]}}const stoppedInner=new NodeProp({perNode:!0});class MixedParse{constructor(base,nest,input,fragments,ranges){this.nest=nest,this.input=input,this.fragments=fragments,this.ranges=ranges,this.inner=[],this.innerDone=0,this.baseTree=null,this.stoppedAt=null,this.baseParse=base}advance(){if(this.baseParse){let done=this.baseParse.advance();if(!done)return null;if(this.baseParse=null,this.baseTree=done,this.startInner(),null!=this.stoppedAt)for(let inner of this.inner)inner.parse.stopAt(this.stoppedAt)}if(this.innerDone==this.inner.length){let result=this.baseTree;return null!=this.stoppedAt&&(result=new Tree(result.type,result.children,result.positions,result.length,result.propValues.concat([[stoppedInner,this.stoppedAt]]))),result}let inner=this.inner[this.innerDone],done=inner.parse.advance();if(done){this.innerDone++;// This is a somewhat dodgy but super helpful hack where we
// patch up nodes created by the inner parse (and thus
// presumably not aliased anywhere else) to hold the information
// about the inner parse.
let props=Object.assign(Object.create(null),inner.target.props);props[NodeProp.mounted.id]=new MountedTree(done,inner.overlay,inner.parser,inner.bracketed),inner.target.props=props}return null}get parsedPos(){if(this.baseParse)return 0;let pos=this.input.length;for(let i=this.innerDone;i<this.inner.length;i++)this.inner[i].from<pos&&(pos=Math.min(pos,this.inner[i].parse.parsedPos));return pos}stopAt(pos){if(this.stoppedAt=pos,this.baseParse)this.baseParse.stopAt(pos);else for(let i=this.innerDone;i<this.inner.length;i++)this.inner[i].parse.stopAt(pos)}startInner(){let fragmentCursor=new FragmentCursor(this.fragments),overlay=null,covered=null,cursor=new TreeCursor(new TreeNode(this.baseTree,this.ranges[0].from,0,null),exports.IterMode.IncludeAnonymous|exports.IterMode.IgnoreMounts);scan:for(let nest,isCovered;;){let range,enter=!0;if(null!=this.stoppedAt&&cursor.from>=this.stoppedAt)enter=!1;else if(fragmentCursor.hasNode(cursor)){if(overlay){let match=overlay.mounts.find(m=>m.frag.from<=cursor.from&&m.frag.to>=cursor.to&&m.mount.overlay);if(match)for(let r of match.mount.overlay){let from=r.from+match.pos,to=r.to+match.pos;from>=cursor.from&&to<=cursor.to&&!overlay.ranges.some(r=>r.from<to&&r.to>from)&&overlay.ranges.push({from,to})}}enter=!1}else if(covered&&(isCovered=checkCover(covered.ranges,cursor.from,cursor.to)))enter=2!=isCovered/* Cover.Full */;else if(!cursor.type.isAnonymous&&(nest=this.nest(cursor,this.input))&&(cursor.from<cursor.to||!nest.overlay)){cursor.tree||(materialize(cursor),overlay&&overlay.depth++,covered&&covered.depth++);let oldMounts=fragmentCursor.findMounts(cursor.from,nest.parser);if("function"==typeof nest.overlay)overlay=new ActiveOverlay(nest.parser,nest.overlay,oldMounts,this.inner.length,cursor.from,!!nest.bracketed,cursor.tree,overlay);else{let ranges=punchRanges(this.ranges,nest.overlay||(cursor.from<cursor.to?[new Range(cursor.from,cursor.to)]:[]));ranges.length&&checkRanges(ranges),(ranges.length||!nest.overlay)&&this.inner.push(new InnerParse(nest.parser,ranges.length?nest.parser.startParse(this.input,enterFragments(oldMounts,ranges),ranges):nest.parser.startParse(""),nest.overlay?nest.overlay.map(r=>new Range(r.from-cursor.from,r.to-cursor.from)):null,!!nest.bracketed,cursor.tree,ranges.length?ranges[0].from:cursor.from)),nest.overlay?ranges.length&&(covered={ranges,depth:0,prev:covered}):enter=!1}}else if(overlay&&(range=overlay.predicate(cursor))&&(!0===range&&(range=new Range(cursor.from,cursor.to)),range.from<range.to)){let last=overlay.ranges.length-1;0<=last&&overlay.ranges[last].to==range.from?overlay.ranges[last]={from:overlay.ranges[last].from,to:range.to}:overlay.ranges.push(range)}if(enter&&cursor.firstChild())overlay&&overlay.depth++,covered&&covered.depth++;else for(;;){if(cursor.nextSibling())break;if(!cursor.parent())break scan;if(overlay&&! --overlay.depth){let ranges=punchRanges(this.ranges,overlay.ranges);ranges.length&&(checkRanges(ranges),this.inner.splice(overlay.index,0,new InnerParse(overlay.parser,overlay.parser.startParse(this.input,enterFragments(overlay.mounts,ranges),ranges),overlay.ranges.map(r=>new Range(r.from-overlay.start,r.to-overlay.start)),overlay.bracketed,overlay.target,ranges[0].from))),overlay=overlay.prev}covered&&! --covered.depth&&(covered=covered.prev)}}}}class StructureCursor{constructor(root,offset){this.offset=offset,this.done=!1,this.cursor=root.cursor(exports.IterMode.IncludeAnonymous|exports.IterMode.IgnoreMounts)}// Move to the first node (in pre-order) that starts at or after `pos`.
moveTo(pos){for(let{cursor}=this,p=pos-this.offset;!this.done&&cursor.from<p;)if(cursor.to>=pos&&cursor.enter(p,1,exports.IterMode.IgnoreOverlays|exports.IterMode.ExcludeBuffers));else if(cursor.to<=pos)cursor.next(!1)||(this.done=!0);else break}hasNode(cursor){if(this.moveTo(cursor.from),!this.done&&this.cursor.from+this.offset==cursor.from&&this.cursor.tree)for(let tree=this.cursor.tree;;){if(tree==cursor.tree)return!0;if(tree.children.length&&0==tree.positions[0]&&tree.children[0]instanceof Tree)tree=tree.children[0];else break}return!1}}class FragmentCursor{constructor(fragments){var _a;if(this.fragments=fragments,this.curTo=0,this.fragI=0,fragments.length){let first=this.curFrag=fragments[0];this.curTo=null!==(_a=first.tree.prop(stoppedInner))&&void 0!==_a?_a:first.to,this.inner=new StructureCursor(first.tree,-first.offset)}else this.curFrag=this.inner=null}hasNode(node){for(;this.curFrag&&node.from>=this.curTo;)this.nextFrag();return this.curFrag&&this.curFrag.from<=node.from&&this.curTo>=node.to&&this.inner.hasNode(node)}nextFrag(){var _a;if(this.fragI++,this.fragI==this.fragments.length)this.curFrag=this.inner=null;else{let frag=this.curFrag=this.fragments[this.fragI];this.curTo=null!==(_a=frag.tree.prop(stoppedInner))&&void 0!==_a?_a:frag.to,this.inner=new StructureCursor(frag.tree,-frag.offset)}}findMounts(pos,parser){var _a;let result=[];if(this.inner){this.inner.cursor.moveTo(pos,1);for(let mount,pos=this.inner.cursor.node;pos;pos=pos.parent)if(mount=null===(_a=pos.tree)||void 0===_a?void 0:_a.prop(NodeProp.mounted),mount&&mount.parser==parser)for(let frag,i=this.fragI;i<this.fragments.length&&(frag=this.fragments[i],!(frag.from>=pos.to));i++)frag.tree==this.curFrag.tree&&result.push({frag,pos:pos.from-frag.offset,mount})}return result}}exports.DefaultBufferLength=1024,exports.MountedTree=MountedTree,exports.NodeProp=NodeProp,exports.NodeSet=NodeSet,exports.NodeType=NodeType,exports.NodeWeakMap=NodeWeakMap,exports.Parser=Parser,exports.Tree=Tree,exports.TreeBuffer=TreeBuffer,exports.TreeCursor=TreeCursor,exports.TreeFragment=TreeFragment,exports.parseMixed=parseMixed}(dist),dist)}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__lezer_highlight(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/common"),dist={},distExports=function requireDist(){function sameArray(a,b){return a.length==b.length&&a.every((x,i)=>x==b[i])}function powerSet(array){let sets=[[]];for(let i=0;i<array.length;i++)for(let j=0,e=sets.length;j<e;j++)sets.push(sets[j].concat(array[i]));return sets.sort((a,b)=>b.length-a.length)}/**
	This function is used to add a set of tags to a language syntax
	via [`NodeSet.extend`](#common.NodeSet.extend) or
	[`LRParser.configure`](#lr.LRParser.configure).

	The argument object maps node selectors to [highlighting
	tags](#highlight.Tag) or arrays of tags.

	Node selectors may hold one or more (space-separated) node paths.
	Such a path can be a [node name](#common.NodeType.name), or
	multiple node names (or `*` wildcards) separated by slash
	characters, as in `"Block/Declaration/VariableName"`. Such a path
	matches the final node but only if its direct parent nodes are the
	other nodes mentioned. A `*` in such a path matches any parent,
	but only a single level—wildcards that match multiple parents
	aren't supported, both for efficiency reasons and because Lezer
	trees make it rather hard to reason about what they would match.)

	A path can be ended with `/...` to indicate that the tag assigned
	to the node should also apply to all child nodes, even if they
	match their own style (by default, only the innermost style is
	used).

	When a path ends in `!`, as in `Attribute!`, no further matching
	happens for the node's child nodes, and the entire node gets the
	given style.

	In this notation, node names that contain `/`, `!`, `*`, or `...`
	must be quoted as JSON strings.

	For example:

	```javascript
	parser.configure({props: [
	  styleTags({
	    // Style Number and BigNumber nodes
	    "Number BigNumber": tags.number,
	    // Style Escape nodes whose parent is String
	    "String/Escape": tags.escape,
	    // Style anything inside Attributes nodes
	    "Attributes!": tags.meta,
	    // Add a style to all content inside Italic nodes
	    "Italic/...": tags.emphasis,
	    // Style InvalidString nodes as both `string` and `invalid`
	    "InvalidString": [tags.string, tags.invalid],
	    // Style the node named "/" as punctuation
	    '"/"': tags.punctuation
	  })
	]})
	```
	*/function styleTags(spec){let byName=Object.create(null);for(let prop in spec){let tags=spec[prop];Array.isArray(tags)||(tags=[tags]);for(let part of prop.split(" "))if(part){let pieces=[],mode=2/* Mode.Normal */,rest=part;for(let pos=0;;){if("..."==rest&&0<pos&&pos+3==part.length){mode=1/* Mode.Inherit */;break}let m=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);if(!m)throw new RangeError("Invalid path: "+part);if(pieces.push("*"==m[0]?"":"\""==m[0][0]?JSON.parse(m[0]):m[0]),pos+=m[0].length,pos==part.length)break;let next=part[pos++];if(pos==part.length&&"!"==next){mode=0/* Mode.Opaque */;break}if("/"!=next)throw new RangeError("Invalid path: "+part);rest=part.slice(pos)}let last=pieces.length-1,inner=pieces[last];if(!inner)throw new RangeError("Invalid path: "+part);let rule=new Rule(tags,mode,0<last?pieces.slice(0,last):null);byName[inner]=rule.sort(byName[inner])}}return ruleNodeProp.add(byName)}/**
	Define a [highlighter](#highlight.Highlighter) from an array of
	tag/class pairs. Classes associated with more specific tags will
	take precedence.
	*/function tagHighlighter(tags,options){let map=Object.create(null);for(let style of tags)if(!Array.isArray(style.tag))map[style.tag.id]=style.class;else for(let tag of style.tag)map[tag.id]=style.class;let{scope,all=null}=options||{};return{style:tags=>{let cls=all;for(let tag of tags)for(let sub of tag.set){let tagClass=map[sub.id];if(tagClass){cls=cls?cls+" "+tagClass:tagClass;break}}return cls},scope}}function highlightTags(highlighters,tags){let result=null;for(let highlighter of highlighters){let value=highlighter.style(tags);value&&(result=result?result+" "+value:value)}return result}/**
	Highlight the given [tree](#common.Tree) with the given
	[highlighter](#highlight.Highlighter). Often, the higher-level
	[`highlightCode`](#highlight.highlightCode) function is easier to
	use.
	*/function highlightTree(tree,highlighter,/**
	Assign styling to a region of the text. Will be called, in order
	of position, for any ranges where more than zero classes apply.
	`classes` is a space separated string of CSS classes.
	*/putStyle,/**
	The start of the range to highlight.
	*/from=0,/**
	The end of the range.
	*/to=tree.length){let builder=new HighlightBuilder(from,Array.isArray(highlighter)?highlighter:[highlighter],putStyle);builder.highlightRange(tree.cursor(),from,to,"",builder.highlighters),builder.flush(to)}/**
	Highlight the given tree with the given highlighter, calling
	`putText` for every piece of text, either with a set of classes or
	with the empty string when unstyled, and `putBreak` for every line
	break.
	*/function highlightCode(code,tree,highlighter,putText,putBreak,from=0,to=code.length){function writeTo(p,classes){if(!(p<=pos)){for(let text=code.slice(pos,p),i=0;;){let nextBreak=text.indexOf("\n",i),upto=0>nextBreak?text.length:nextBreak;if(upto>i&&putText(text.slice(i,upto),classes),0>nextBreak)break;putBreak(),i=nextBreak+1}pos=p}}let pos=from;highlightTree(tree,highlighter,(from,to,classes)=>{writeTo(from,""),writeTo(to,classes)},from,to),writeTo(to,"")}/**
	Match a syntax node's [highlight rules](#highlight.styleTags). If
	there's a match, return its set of tags, and whether it is
	opaque (uses a `!`) or applies to all child nodes (`/...`).
	*/function getStyleTags(node){let rule=node.type.prop(ruleNodeProp);for(;rule&&rule.context&&!node.matchContext(rule.context);)rule=rule.next;return rule||null}if(hasRequiredDist)return dist;hasRequiredDist=1;var common=require$$0;let nextTagID=0;/**
	Highlighting tags are markers that denote a highlighting category.
	They are [associated](#highlight.styleTags) with parts of a syntax
	tree by a language mode, and then mapped to an actual CSS style by
	a [highlighter](#highlight.Highlighter).

	Because syntax tree node types and highlight styles have to be
	able to talk the same language, CodeMirror uses a mostly _closed_
	[vocabulary](#highlight.tags) of syntax tags (as opposed to
	traditional open string-based systems, which make it hard for
	highlighting themes to cover all the tokens produced by the
	various languages).

	It _is_ possible to [define](#highlight.Tag^define) your own
	highlighting tags for system-internal use (where you control both
	the language package and the highlighter), but such tags will not
	be picked up by regular highlighters (though you can derive them
	from standard tags to allow highlighters to fall back to those).
	*/class Tag{/**
	    @internal
	    */constructor(/**
	    The optional name of the base tag @internal
	    */name,/**
	    The set of this tag and all its parent tags, starting with
	    this one itself and sorted in order of decreasing specificity.
	    */set,/**
	    The base unmodified tag that this one is based on, if it's
	    modified @internal
	    */base,/**
	    The modifiers applied to this.base @internal
	    */modified){this.name=name,this.set=set,this.base=base,this.modified=modified,this.id=nextTagID++}toString(){let{name}=this;for(let mod of this.modified)mod.name&&(name=`${mod.name}(${name})`);return name}static define(nameOrParent,parent){let name="string"==typeof nameOrParent?nameOrParent:"?";if(nameOrParent instanceof Tag&&(parent=nameOrParent),null===parent||void 0===parent?void 0:parent.base)throw new Error("Can not derive from a modified tag");let tag=new Tag(name,[],null,[]);if(tag.set.push(tag),parent)for(let t of parent.set)tag.set.push(t);return tag}/**
	    Define a tag _modifier_, which is a function that, given a tag,
	    will return a tag that is a subtag of the original. Applying the
	    same modifier to a twice tag will return the same value (`m1(t1)
	    == m1(t1)`) and applying multiple modifiers will, regardless or
	    order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
	    
	    When multiple modifiers are applied to a given base tag, each
	    smaller set of modifiers is registered as a parent, so that for
	    example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
	    `m1(m3(t1)`, and so on.
	    */static defineModifier(name){let mod=new Modifier(name);return tag=>-1<tag.modified.indexOf(mod)?tag:Modifier.get(tag.base||tag,tag.modified.concat(mod).sort((a,b)=>a.id-b.id))}}let nextModifierID=0;class Modifier{constructor(name){this.name=name,this.instances=[],this.id=nextModifierID++}static get(base,mods){if(!mods.length)return base;let exists=mods[0].instances.find(t=>t.base==base&&sameArray(mods,t.modified));if(exists)return exists;let set=[],tag=new Tag(base.name,set,base,mods);for(let m of mods)m.instances.push(tag);let configs=powerSet(mods);for(let parent of base.set)if(!parent.modified.length)for(let config of configs)set.push(Modifier.get(parent,config));return tag}}const ruleNodeProp=new common.NodeProp({combine(a,b){let cur,root,take;for(;a||b;){if(!a||b&&a.depth>=b.depth?(take=b,b=b.next):(take=a,a=a.next),cur&&cur.mode==take.mode&&!take.context&&!cur.context)continue;let copy=new Rule(take.tags,take.mode,take.context);cur?cur.next=copy:root=copy,cur=copy}return root}});class Rule{constructor(tags,mode,context,next){this.tags=tags,this.mode=mode,this.context=context,this.next=next}get opaque(){return 0==this.mode/* Mode.Opaque */}get inherit(){return 1==this.mode/* Mode.Inherit */}sort(other){return!other||other.depth<this.depth?(this.next=other,this):(other.next=this.sort(other.next),other)}get depth(){return this.context?this.context.length:0}}Rule.empty=new Rule([],2/* Mode.Normal */,null);class HighlightBuilder{constructor(at,highlighters,span){this.at=at,this.highlighters=highlighters,this.span=span,this.class=""}startSpan(at,cls){cls!=this.class&&(this.flush(at),at>this.at&&(this.at=at),this.class=cls)}flush(to){to>this.at&&this.class&&this.span(this.at,to,this.class)}highlightRange(cursor,from,to,inheritedClass,highlighters){let{type,from:start,to:end}=cursor;if(start>=to||end<=from)return;type.isTop&&(highlighters=this.highlighters.filter(h=>!h.scope||h.scope(type)));let cls=inheritedClass,rule=getStyleTags(cursor)||Rule.empty,tagCls=highlightTags(highlighters,rule.tags);if(tagCls&&(cls&&(cls+=" "),cls+=tagCls,1==rule.mode/* Mode.Inherit */&&(inheritedClass+=(inheritedClass?" ":"")+tagCls)),this.startSpan(Math.max(from,start),cls),rule.opaque)return;let mounted=cursor.tree&&cursor.tree.prop(common.NodeProp.mounted);if(mounted&&mounted.overlay){let inner=cursor.node.enter(mounted.overlay[0].from+start,1),innerHighlighters=this.highlighters.filter(h=>!h.scope||h.scope(mounted.tree.type)),hasChild=cursor.firstChild();for(let i=0,pos=start;;i++){let next=i<mounted.overlay.length?mounted.overlay[i]:null,nextPos=next?next.from+start:end,rangeFrom=Math.max(from,pos),rangeTo=Math.min(to,nextPos);if(rangeFrom<rangeTo&&hasChild)for(;cursor.from<rangeTo&&(this.highlightRange(cursor,rangeFrom,rangeTo,inheritedClass,highlighters),this.startSpan(Math.min(rangeTo,cursor.to),cls),!(cursor.to>=nextPos)&&cursor.nextSibling()););if(!next||nextPos>to)break;pos=next.to+start,pos>from&&(this.highlightRange(inner.cursor(),Math.max(from,next.from+start),Math.min(to,pos),"",innerHighlighters),this.startSpan(Math.min(to,pos),cls))}hasChild&&cursor.parent()}else if(cursor.firstChild()){mounted&&(inheritedClass="");do{if(cursor.to<=from)continue;if(cursor.from>=to)break;this.highlightRange(cursor,from,to,inheritedClass,highlighters),this.startSpan(Math.min(to,cursor.to),cls)}while(cursor.nextSibling());cursor.parent()}}}const t=Tag.define,comment=t(),name=t(),typeName=t(name),propertyName=t(name),literal=t(),string=t(literal),number=t(literal),content=t(),heading=t(content),keyword=t(),operator=t(),punctuation=t(),bracket=t(punctuation),meta=t(),tags={/**
	    A comment.
	    */comment,/**
	    A line [comment](#highlight.tags.comment).
	    */lineComment:t(comment),/**
	    A block [comment](#highlight.tags.comment).
	    */blockComment:t(comment),/**
	    A documentation [comment](#highlight.tags.comment).
	    */docComment:t(comment),/**
	    Any kind of identifier.
	    */name,/**
	    The [name](#highlight.tags.name) of a variable.
	    */variableName:t(name),/**
	    A type [name](#highlight.tags.name).
	    */typeName:typeName,/**
	    A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
	    */tagName:t(typeName),/**
	    A property or field [name](#highlight.tags.name).
	    */propertyName:propertyName,/**
	    An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
	    */attributeName:t(propertyName),/**
	    The [name](#highlight.tags.name) of a class.
	    */className:t(name),/**
	    A label [name](#highlight.tags.name).
	    */labelName:t(name),/**
	    A namespace [name](#highlight.tags.name).
	    */namespace:t(name),/**
	    The [name](#highlight.tags.name) of a macro.
	    */macroName:t(name),/**
	    A literal value.
	    */literal,/**
	    A string [literal](#highlight.tags.literal).
	    */string,/**
	    A documentation [string](#highlight.tags.string).
	    */docString:t(string),/**
	    A character literal (subtag of [string](#highlight.tags.string)).
	    */character:t(string),/**
	    An attribute value (subtag of [string](#highlight.tags.string)).
	    */attributeValue:t(string),/**
	    A number [literal](#highlight.tags.literal).
	    */number,/**
	    An integer [number](#highlight.tags.number) literal.
	    */integer:t(number),/**
	    A floating-point [number](#highlight.tags.number) literal.
	    */float:t(number),/**
	    A boolean [literal](#highlight.tags.literal).
	    */bool:t(literal),/**
	    Regular expression [literal](#highlight.tags.literal).
	    */regexp:t(literal),/**
	    An escape [literal](#highlight.tags.literal), for example a
	    backslash escape in a string.
	    */escape:t(literal),/**
	    A color [literal](#highlight.tags.literal).
	    */color:t(literal),/**
	    A URL [literal](#highlight.tags.literal).
	    */url:t(literal),/**
	    A language keyword.
	    */keyword,/**
	    The [keyword](#highlight.tags.keyword) for the self or this
	    object.
	    */self:t(keyword),/**
	    The [keyword](#highlight.tags.keyword) for null.
	    */null:t(keyword),/**
	    A [keyword](#highlight.tags.keyword) denoting some atomic value.
	    */atom:t(keyword),/**
	    A [keyword](#highlight.tags.keyword) that represents a unit.
	    */unit:t(keyword),/**
	    A modifier [keyword](#highlight.tags.keyword).
	    */modifier:t(keyword),/**
	    A [keyword](#highlight.tags.keyword) that acts as an operator.
	    */operatorKeyword:t(keyword),/**
	    A control-flow related [keyword](#highlight.tags.keyword).
	    */controlKeyword:t(keyword),/**
	    A [keyword](#highlight.tags.keyword) that defines something.
	    */definitionKeyword:t(keyword),/**
	    A [keyword](#highlight.tags.keyword) related to defining or
	    interfacing with modules.
	    */moduleKeyword:t(keyword),/**
	    An operator.
	    */operator,/**
	    An [operator](#highlight.tags.operator) that dereferences something.
	    */derefOperator:t(operator),/**
	    Arithmetic-related [operator](#highlight.tags.operator).
	    */arithmeticOperator:t(operator),/**
	    Logical [operator](#highlight.tags.operator).
	    */logicOperator:t(operator),/**
	    Bit [operator](#highlight.tags.operator).
	    */bitwiseOperator:t(operator),/**
	    Comparison [operator](#highlight.tags.operator).
	    */compareOperator:t(operator),/**
	    [Operator](#highlight.tags.operator) that updates its operand.
	    */updateOperator:t(operator),/**
	    [Operator](#highlight.tags.operator) that defines something.
	    */definitionOperator:t(operator),/**
	    Type-related [operator](#highlight.tags.operator).
	    */typeOperator:t(operator),/**
	    Control-flow [operator](#highlight.tags.operator).
	    */controlOperator:t(operator),/**
	    Program or markup punctuation.
	    */punctuation,/**
	    [Punctuation](#highlight.tags.punctuation) that separates
	    things.
	    */separator:t(punctuation),/**
	    Bracket-style [punctuation](#highlight.tags.punctuation).
	    */bracket,/**
	    Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
	    tokens).
	    */angleBracket:t(bracket),/**
	    Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
	    tokens).
	    */squareBracket:t(bracket),/**
	    Parentheses (usually `(` and `)` tokens). Subtag of
	    [bracket](#highlight.tags.bracket).
	    */paren:t(bracket),/**
	    Braces (usually `{` and `}` tokens). Subtag of
	    [bracket](#highlight.tags.bracket).
	    */brace:t(bracket),/**
	    Content, for example plain text in XML or markup documents.
	    */content,/**
	    [Content](#highlight.tags.content) that represents a heading.
	    */heading,/**
	    A level 1 [heading](#highlight.tags.heading).
	    */heading1:t(heading),/**
	    A level 2 [heading](#highlight.tags.heading).
	    */heading2:t(heading),/**
	    A level 3 [heading](#highlight.tags.heading).
	    */heading3:t(heading),/**
	    A level 4 [heading](#highlight.tags.heading).
	    */heading4:t(heading),/**
	    A level 5 [heading](#highlight.tags.heading).
	    */heading5:t(heading),/**
	    A level 6 [heading](#highlight.tags.heading).
	    */heading6:t(heading),/**
	    A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
	    */contentSeparator:t(content),/**
	    [Content](#highlight.tags.content) that represents a list.
	    */list:t(content),/**
	    [Content](#highlight.tags.content) that represents a quote.
	    */quote:t(content),/**
	    [Content](#highlight.tags.content) that is emphasized.
	    */emphasis:t(content),/**
	    [Content](#highlight.tags.content) that is styled strong.
	    */strong:t(content),/**
	    [Content](#highlight.tags.content) that is part of a link.
	    */link:t(content),/**
	    [Content](#highlight.tags.content) that is styled as code or
	    monospace.
	    */monospace:t(content),/**
	    [Content](#highlight.tags.content) that has a strike-through
	    style.
	    */strikethrough:t(content),/**
	    Inserted text in a change-tracking format.
	    */inserted:t(),/**
	    Deleted text.
	    */deleted:t(),/**
	    Changed text.
	    */changed:t(),/**
	    An invalid or unsyntactic element.
	    */invalid:t(),/**
	    Metadata or meta-instruction.
	    */meta,/**
	    [Metadata](#highlight.tags.meta) that applies to the entire
	    document.
	    */documentMeta:t(meta),/**
	    [Metadata](#highlight.tags.meta) that annotates or adds
	    attributes to a given syntactic element.
	    */annotation:t(meta),/**
	    Processing instruction or preprocessor directive. Subtag of
	    [meta](#highlight.tags.meta).
	    */processingInstruction:t(meta),/**
	    [Modifier](#highlight.Tag^defineModifier) that indicates that a
	    given element is being defined. Expected to be used with the
	    various [name](#highlight.tags.name) tags.
	    */definition:Tag.defineModifier("definition"),/**
	    [Modifier](#highlight.Tag^defineModifier) that indicates that
	    something is constant. Mostly expected to be used with
	    [variable names](#highlight.tags.variableName).
	    */constant:Tag.defineModifier("constant"),/**
	    [Modifier](#highlight.Tag^defineModifier) used to indicate that
	    a [variable](#highlight.tags.variableName) or [property
	    name](#highlight.tags.propertyName) is being called or defined
	    as a function.
	    */function:Tag.defineModifier("function"),/**
	    [Modifier](#highlight.Tag^defineModifier) that can be applied to
	    [names](#highlight.tags.name) to indicate that they belong to
	    the language's standard environment.
	    */standard:Tag.defineModifier("standard"),/**
	    [Modifier](#highlight.Tag^defineModifier) that indicates a given
	    [names](#highlight.tags.name) is local to some scope.
	    */local:Tag.defineModifier("local"),/**
	    A generic variant [modifier](#highlight.Tag^defineModifier) that
	    can be used to tag language-specific alternative variants of
	    some common tag. It is recommended for themes to define special
	    forms of at least the [string](#highlight.tags.string) and
	    [variable name](#highlight.tags.variableName) tags, since those
	    come up a lot.
	    */special:Tag.defineModifier("special")};/**
	The default set of highlighting [tags](#highlight.Tag).

	This collection is heavily biased towards programming languages,
	and necessarily incomplete. A full ontology of syntactic
	constructs would fill a stack of books, and be impractical to
	write themes for. So try to make do with this set. If all else
	fails, [open an
	issue](https://github.com/codemirror/codemirror.next) to propose a
	new tag, or [define](#highlight.Tag^define) a local custom tag for
	your use case.

	Note that it is not obligatory to always attach the most specific
	tag possible to an element—if your grammar can't easily
	distinguish a certain type of element (such as a local variable),
	it is okay to style it as its more general variant (a variable).

	For tags that extend some parent tag, the documentation links to
	the parent.
	*/for(let name in tags){let val=tags[name];val instanceof Tag&&(val.name=name)}/**
	This is a highlighter that adds stable, predictable classes to
	tokens, for styling with external CSS.

	The following tags are mapped to their name prefixed with `"tok-"`
	(for example `"tok-comment"`):

	* [`link`](#highlight.tags.link)
	* [`heading`](#highlight.tags.heading)
	* [`emphasis`](#highlight.tags.emphasis)
	* [`strong`](#highlight.tags.strong)
	* [`keyword`](#highlight.tags.keyword)
	* [`atom`](#highlight.tags.atom)
	* [`bool`](#highlight.tags.bool)
	* [`url`](#highlight.tags.url)
	* [`labelName`](#highlight.tags.labelName)
	* [`inserted`](#highlight.tags.inserted)
	* [`deleted`](#highlight.tags.deleted)
	* [`literal`](#highlight.tags.literal)
	* [`string`](#highlight.tags.string)
	* [`number`](#highlight.tags.number)
	* [`variableName`](#highlight.tags.variableName)
	* [`typeName`](#highlight.tags.typeName)
	* [`namespace`](#highlight.tags.namespace)
	* [`className`](#highlight.tags.className)
	* [`macroName`](#highlight.tags.macroName)
	* [`propertyName`](#highlight.tags.propertyName)
	* [`operator`](#highlight.tags.operator)
	* [`comment`](#highlight.tags.comment)
	* [`meta`](#highlight.tags.meta)
	* [`punctuation`](#highlight.tags.punctuation)
	* [`invalid`](#highlight.tags.invalid)

	In addition, these mappings are provided:

	* [`regexp`](#highlight.tags.regexp),
	  [`escape`](#highlight.tags.escape), and
	  [`special`](#highlight.tags.special)[`(string)`](#highlight.tags.string)
	  are mapped to `"tok-string2"`
	* [`special`](#highlight.tags.special)[`(variableName)`](#highlight.tags.variableName)
	  to `"tok-variableName2"`
	* [`local`](#highlight.tags.local)[`(variableName)`](#highlight.tags.variableName)
	  to `"tok-variableName tok-local"`
	* [`definition`](#highlight.tags.definition)[`(variableName)`](#highlight.tags.variableName)
	  to `"tok-variableName tok-definition"`
	* [`definition`](#highlight.tags.definition)[`(propertyName)`](#highlight.tags.propertyName)
	  to `"tok-propertyName tok-definition"`
	*/const classHighlighter=tagHighlighter([{tag:tags.link,class:"tok-link"},{tag:tags.heading,class:"tok-heading"},{tag:tags.emphasis,class:"tok-emphasis"},{tag:tags.strong,class:"tok-strong"},{tag:tags.keyword,class:"tok-keyword"},{tag:tags.atom,class:"tok-atom"},{tag:tags.bool,class:"tok-bool"},{tag:tags.url,class:"tok-url"},{tag:tags.labelName,class:"tok-labelName"},{tag:tags.inserted,class:"tok-inserted"},{tag:tags.deleted,class:"tok-deleted"},{tag:tags.literal,class:"tok-literal"},{tag:tags.string,class:"tok-string"},{tag:tags.number,class:"tok-number"},{tag:[tags.regexp,tags.escape,tags.special(tags.string)],class:"tok-string2"},{tag:tags.variableName,class:"tok-variableName"},{tag:tags.local(tags.variableName),class:"tok-variableName tok-local"},{tag:tags.definition(tags.variableName),class:"tok-variableName tok-definition"},{tag:tags.special(tags.variableName),class:"tok-variableName2"},{tag:tags.definition(tags.propertyName),class:"tok-propertyName tok-definition"},{tag:tags.typeName,class:"tok-typeName"},{tag:tags.namespace,class:"tok-namespace"},{tag:tags.className,class:"tok-className"},{tag:tags.macroName,class:"tok-macroName"},{tag:tags.propertyName,class:"tok-propertyName"},{tag:tags.operator,class:"tok-operator"},{tag:tags.comment,class:"tok-comment"},{tag:tags.meta,class:"tok-meta"},{tag:tags.invalid,class:"tok-invalid"},{tag:tags.punctuation,class:"tok-punctuation"}]);return dist.Tag=Tag,dist.classHighlighter=classHighlighter,dist.getStyleTags=getStyleTags,dist.highlightCode=highlightCode,dist.highlightTree=highlightTree,dist.styleTags=styleTags,dist.tagHighlighter=tagHighlighter,dist.tags=tags,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__lezer_lr(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/common"),dist={},distExports=function requireDist(){// See lezer-generator/src/encode.ts for comments about the encoding
// used here
function decodeArray(input,Type=Uint16Array){if("string"!=typeof input)return input;let array=null;for(let value,pos=0,out=0;pos<input.length;){for(value=0;;){let next=input.charCodeAt(pos++),stop=!1;if(126==next/* Encode.BigValCode */){value=65535/* Encode.BigVal */;break}92<=next/* Encode.Gap2 */&&next--,34<=next/* Encode.Gap1 */&&next--;let digit=next-32/* Encode.Start */;if(46<=digit/* Encode.Base */&&(digit-=46/* Encode.Base */,stop=!0),value+=digit,stop)break;value*=46/* Encode.Base */}array?array[out++]=value:array=new Type(value)}return array}// Tokenizer data is stored a big uint16 array containing, for each
// state:
//
//  - A group bitmask, indicating what token groups are reachable from
//    this state, so that paths that can only lead to tokens not in
//    any of the current groups can be cut off early.
//
//  - The position of the end of the state's sequence of accepting
//    tokens
//
//  - The number of outgoing edges for the state
//
//  - The accepting tokens, as (token id, group mask) pairs
//
//  - The outgoing edges, as (start character, end character, state
//    index) triples, with end character being exclusive
//
// This function interprets that data, running through a stream as
// long as new states with the a matching group mask can be reached,
// and updating `input.token` when it matches a token.
function readToken(data,input,stack,group,precTable,precOffset){let state=0,groupMask=1<<group,{dialect}=stack.p.parser;scan:for(;;){if(0==(groupMask&data[state]))break;let accEnd=data[state+1];// Check whether this state can lead to a token in the current group
// Accept tokens in this state, possibly overwriting
// lower-precedence / shorter tokens
for(let i=state+3;i<accEnd;i+=2)if(0<(data[i+1]&groupMask)){let term=data[i];if(dialect.allows(term)&&(-1==input.token.value||input.token.value==term||overrides(term,input.token.value,precTable,precOffset))){input.acceptToken(term);break}}let next=input.next,low=0,high=data[state+2];// Special case for EOF
if(0>input.next&&high>low&&65535==data[accEnd+3*high-3]/* Seq.End */){state=data[accEnd+3*high-1];continue scan}// Do a binary search on the state's edges
for(;low<high;){let mid=low+high>>1,index=accEnd+mid+(mid<<1),from=data[index],to=data[index+1]||65536;if(next<from)high=mid;else if(next>=to)low=mid+1;else{state=data[index+2],input.advance();continue scan}}break}}function findOffset(data,start,term){for(let next,i=start;65535!=(next=data[i])/* Seq.End */;i++)if(next==term)return i-start;return-1}function overrides(token,prev,tableData,tableOffset){let iPrev=findOffset(tableData,tableOffset,prev);return 0>iPrev||findOffset(tableData,tableOffset,token)<iPrev}// Environment variable used to control console output
function cutAt(tree,pos,side){let cursor=tree.cursor(common.IterMode.IncludeAnonymous);for(cursor.moveTo(pos);;)if(0>side?!cursor.childBefore(pos):!cursor.childAfter(pos))for(;;){if((0>side?cursor.to<pos:cursor.from>pos)&&!cursor.type.isError)return 0>side?Math.max(0,Math.min(cursor.to-1,pos-25/* Lookahead.Margin */)):Math.min(tree.length,Math.max(cursor.from+1,pos+25/* Lookahead.Margin */));if(0>side?cursor.prevSibling():cursor.nextSibling())break;if(!cursor.parent())return 0>side?0:tree.length}}function pushStackDedup(stack,newStacks){for(let other,i=0;i<newStacks.length;i++)if(other=newStacks[i],other.pos==stack.pos&&other.sameState(stack))return void(newStacks[i].score<stack.score&&(newStacks[i]=stack));newStacks.push(stack)}function pair(data,off){return data[off]|data[off+1]<<16}function findFinished(stacks){let best=null;for(let stack of stacks){let stopped=stack.p.stoppedAt;(stack.pos==stack.p.stream.end||null!=stopped&&stack.pos>stopped)&&stack.p.parser.stateFlag(stack.state,2/* StateFlag.Accepting */)&&(!best||best.score<stack.score)&&(best=stack)}return best}function getSpecializer(spec){if(spec.external){let mask=spec.extend?1/* Specialize.Extend */:0/* Specialize.Specialize */;return(value,stack)=>spec.external(value,stack)<<1|mask}return spec.get}if(hasRequiredDist)return dist;hasRequiredDist=1;var common=require$$0;/**
	A parse stack. These are used internally by the parser to track
	parsing progress. They also provide some properties and methods
	that external code such as a tokenizer can use to get information
	about the parse state.
	*/class Stack{/**
	    @internal
	    */constructor(/**
	    The parse that this stack is part of @internal
	    */p,/**
	    Holds state, input pos, buffer index triplets for all but the
	    top state @internal
	    */stack,/**
	    The current parse state @internal
	    */state,// The position at which the next reduce should take place. This
// can be less than `this.pos` when skipped expressions have been
// added to the stack (which should be moved outside of the next
// reduction)
/**
	    @internal
	    */reducePos,/**
	    The input position up to which this stack has parsed.
	    */pos,/**
	    The dynamic score of the stack, including dynamic precedence
	    and error-recovery penalties
	    @internal
	    */score,// The output buffer. Holds (type, start, end, size) quads
// representing nodes created by the parser, where `size` is
// amount of buffer array entries covered by this node.
/**
	    @internal
	    */buffer,// The base offset of the buffer. When stacks are split, the split
// instance shared the buffer history with its parent up to
// `bufferBase`, which is the absolute offset (including the
// offset of previous splits) into the buffer at which this stack
// starts writing.
/**
	    @internal
	    */bufferBase,/**
	    @internal
	    */curContext,/**
	    @internal
	    */lookAhead=0,// A parent stack from which this was split off, if any. This is
// set up so that it always points to a stack that has some
// additional buffer content, never to a stack with an equal
// `bufferBase`.
/**
	    @internal
	    */parent){this.p=p,this.stack=stack,this.state=state,this.reducePos=reducePos,this.pos=pos,this.score=score,this.buffer=buffer,this.bufferBase=bufferBase,this.curContext=curContext,this.lookAhead=lookAhead,this.parent=parent}/**
	    @internal
	    */toString(){return`[${this.stack.filter((_,i)=>0==i%3).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`}// Start an empty stack
/**
	    @internal
	    */static start(p,state,pos=0){let cx=p.parser.context;return new Stack(p,[],state,pos,pos,0,[],0,cx?new StackContext(cx,cx.start):null,0,null)}/**
	    The stack's current [context](#lr.ContextTracker) value, if
	    any. Its type will depend on the context tracker's type
	    parameter, or it will be `null` if there is no context
	    tracker.
	    */get context(){return this.curContext?this.curContext.context:null}// Push a state onto the stack, tracking its start position as well
// as the buffer base at that point.
/**
	    @internal
	    */pushState(state,start){this.stack.push(this.state,start,this.bufferBase+this.buffer.length),this.state=state}// Apply a reduce action
/**
	    @internal
	    */reduce(action){var _a;let depth=action>>19/* Action.ReduceDepthShift */,type=65535&action/* Action.ValueMask */,{parser}=this.p,lookaheadRecord=this.reducePos<this.pos-25/* Lookahead.Margin */&&this.setLookAhead(this.pos),dPrec=parser.dynamicPrecedence(type);if(dPrec&&(this.score+=dPrec),0==depth)return type<parser.minRepeatTerm&&this.reducePos<this.pos&&(this.reducePos=this.pos),this.pushState(parser.getGoto(this.state,type,!0),this.reducePos),type<parser.minRepeatTerm&&this.storeNode(type,this.reducePos,this.reducePos,lookaheadRecord?8:4,!0),void this.reduceContext(type,this.reducePos);// Find the base index into `this.stack`, content after which will
// be dropped. Note that with `StayFlag` reductions we need to
// consume two extra frames (the dummy parent node for the skipped
// expression and the state that we'll be staying in, which should
// be moved to `this.state`).
let base=this.stack.length-3*(depth-1)-(262144&action/* Action.StayFlag */?6:0),start=base?this.stack[base-2]:this.p.ranges[0].from;type<parser.minRepeatTerm&&start==this.reducePos&&this.reducePos<this.pos&&(this.reducePos=this.pos);let size=this.reducePos-start;// This is a kludge to try and detect overly deep left-associative
// trees, which will not increase the parse stack depth and thus
// won't be caught by the regular stack-depth limit check.
!(2e3<=size/* Recover.MinBigReduction */)||null!==(_a=this.p.parser.nodeSet.types[type])&&void 0!==_a&&_a.isAnonymous||(start==this.p.lastBigReductionStart?(this.p.bigReductionCount++,this.p.lastBigReductionSize=size):this.p.lastBigReductionSize<size&&(this.p.bigReductionCount=1,this.p.lastBigReductionStart=start,this.p.lastBigReductionSize=size));let bufferBase=base?this.stack[base-1]:0,count=this.bufferBase+this.buffer.length-bufferBase;// Store normal terms or `R -> R R` repeat reductions
if(type<parser.minRepeatTerm||131072&action/* Action.RepeatFlag */){let pos=parser.stateFlag(this.state,1/* StateFlag.Skipped */)?this.pos:this.reducePos;this.storeNode(type,start,pos,count+4,!0)}if(262144&action/* Action.StayFlag */)this.state=this.stack[base];else{let baseStateID=this.stack[base-3];this.state=parser.getGoto(baseStateID,type,!0)}for(;this.stack.length>base;)this.stack.pop();this.reduceContext(type,start)}// Shift a value into the buffer
/**
	    @internal
	    */storeNode(term,start,end,size=4,mustSink=!1){if(0==term/* Term.Err */&&(!this.stack.length||this.stack[this.stack.length-1]<this.buffer.length+this.bufferBase)){// Try to omit/merge adjacent error nodes
let top=this.buffer.length;if(0<top&&0==this.buffer[top-4]/* Term.Err */&&-1<this.buffer[top-1]){if(start==end)return;if(this.buffer[top-2]>=start)return void(this.buffer[top-2]=end)}}if(!mustSink||this.pos==end)this.buffer.push(term,start,end,size);else{// There may be skipped nodes that have to be moved forward
let index=this.buffer.length;if(0<index&&(0!=this.buffer[index-4]/* Term.Err */||0>this.buffer[index-1])){let mustMove=!1;for(let scan=index;0<scan&&this.buffer[scan-2]>end;scan-=4)if(0<=this.buffer[scan-1]){mustMove=!0;break}if(mustMove)for(;0<index&&this.buffer[index-2]>end;)// Move this record forward
this.buffer[index]=this.buffer[index-4],this.buffer[index+1]=this.buffer[index-3],this.buffer[index+2]=this.buffer[index-2],this.buffer[index+3]=this.buffer[index-1],index-=4,4<size&&(size-=4)}this.buffer[index]=term,this.buffer[index+1]=start,this.buffer[index+2]=end,this.buffer[index+3]=size}}// Apply a shift action
/**
	    @internal
	    */shift(action,type,start,end){if(131072&action/* Action.GotoFlag */)this.pushState(65535&action/* Action.ValueMask */,this.pos);else if(0==(262144&action/* Action.StayFlag */)){// Regular shift
let nextState=action,{parser}=this.p;this.pos=end;let skipped=parser.stateFlag(nextState,1/* StateFlag.Skipped */);// Skipped or zero-length non-tree tokens don't move reducePos
!skipped&&(end>start||type<=parser.maxNode)&&(this.reducePos=end),this.pushState(nextState,skipped?start:Math.min(start,this.reducePos)),this.shiftContext(type,start),type<=parser.maxNode&&this.buffer.push(type,start,end,4)}else// Shift-and-stay, which means this is a skipped token
this.pos=end,this.shiftContext(type,start),type<=this.p.parser.maxNode&&this.buffer.push(type,start,end,4)}// Apply an action
/**
	    @internal
	    */apply(action,next,nextStart,nextEnd){65536&action/* Action.ReduceFlag */?this.reduce(action):this.shift(action,next,nextStart,nextEnd)}// Add a prebuilt (reused) node into the buffer.
/**
	    @internal
	    */useNode(value,next){let index=this.p.reused.length-1;(0>index||this.p.reused[index]!=value)&&(this.p.reused.push(value),index++);let start=this.pos;this.reducePos=this.pos=start+value.length,this.pushState(next,start),this.buffer.push(index,start,this.reducePos,-1/* size == -1 means this is a reused value */),this.curContext&&this.updateContext(this.curContext.tracker.reuse(this.curContext.context,value,this,this.p.stream.reset(this.pos-value.length)))}// Split the stack. Due to the buffer sharing and the fact
// that `this.stack` tends to stay quite shallow, this isn't very
// expensive.
/**
	    @internal
	    */split(){let parent=this,off=parent.buffer.length;// Leave off top error node, if there, because that might be
// merged with other nodes.
// Because the top of the buffer (after this.pos) may be mutated
// to reorder reductions and skipped tokens, and shared buffers
// should be immutable, this copies any outstanding skipped tokens
// to the new buffer, and puts the base pointer before them.
for(off&&0==parent.buffer[off-4]/* Term.Err */&&(off-=4);0<off&&parent.buffer[off-2]>parent.reducePos;)off-=4;let buffer=parent.buffer.slice(off),base=parent.bufferBase+off;// Make sure parent points to an actual parent with content, if there is such a parent.
for(;parent&&base==parent.bufferBase;)parent=parent.parent;return new Stack(this.p,this.stack.slice(),this.state,this.reducePos,this.pos,this.score,buffer,base,this.curContext,this.lookAhead,parent)}// Try to recover from an error by 'deleting' (ignoring) one token.
/**
	    @internal
	    */recoverByDelete(next,nextEnd){let isNode=next<=this.p.parser.maxNode;isNode&&this.storeNode(next,this.pos,nextEnd,4),this.storeNode(0/* Term.Err */,this.pos,nextEnd,isNode?8:4),this.pos=this.reducePos=nextEnd,this.score-=190/* Recover.Delete */}/**
	    Check if the given term would be able to be shifted (optionally
	    after some reductions) on this stack. This can be useful for
	    external tokenizers that want to make sure they only provide a
	    given token when it applies.
	    */canShift(term){for(let action,sim=new SimulatedStack(this);;){if(action=this.p.parser.stateSlot(sim.state,4/* ParseState.DefaultReduce */)||this.p.parser.hasAction(sim.state,term),0==action)return!1;if(0==(65536&action/* Action.ReduceFlag */))return!0;sim.reduce(action)}}// Apply up to Recover.MaxNext recovery actions that conceptually
// inserts some missing token or rule.
/**
	    @internal
	    */recoverByInsert(next){if(300<=this.stack.length/* Recover.MaxInsertStackDepth */)return[];let nextStates=this.p.parser.nextStates(this.state);if(8<nextStates.length||120<=this.stack.length/* Recover.DampenInsertStackDepth */){let best=[];for(let s,i=0;i<nextStates.length;i+=2)(s=nextStates[i+1])!=this.state&&this.p.parser.hasAction(s,next)&&best.push(nextStates[i],s);if(120>this.stack.length/* Recover.DampenInsertStackDepth */)for(let s,i=0;8>best.length&&i<nextStates.length;i+=2)s=nextStates[i+1],best.some((v,i)=>1&i&&v==s)||best.push(nextStates[i],s);nextStates=best}let result=[];for(let s,i=0;i<nextStates.length&&4>result.length/* Recover.MaxNext */;i+=2){if(s=nextStates[i+1],s==this.state)continue;let stack=this.split();stack.pushState(s,this.pos),stack.storeNode(0/* Term.Err */,stack.pos,stack.pos,4,!0),stack.shiftContext(nextStates[i],this.pos),stack.reducePos=this.pos,stack.score-=200/* Recover.Insert */,result.push(stack)}return result}// Force a reduce, if possible. Return false if that can't
// be done.
/**
	    @internal
	    */forceReduce(){let{parser}=this.p,reduce=parser.stateSlot(this.state,5/* ParseState.ForcedReduce */);if(0==(65536&reduce/* Action.ReduceFlag */))return!1;if(!parser.validAction(this.state,reduce)){let depth=reduce>>19/* Action.ReduceDepthShift */,term=65535&reduce/* Action.ValueMask */,target=this.stack.length-3*depth;if(0>target||0>parser.getGoto(this.stack[target],term,!1)){let backup=this.findForcedReduction();if(null==backup)return!1;reduce=backup}this.storeNode(0/* Term.Err */,this.pos,this.pos,4,!0),this.score-=100/* Recover.Reduce */}return this.reducePos=this.pos,this.reduce(reduce),!0}/**
	    Try to scan through the automaton to find some kind of reduction
	    that can be applied. Used when the regular ForcedReduce field
	    isn't a valid action. @internal
	    */findForcedReduction(){let{parser}=this.p,seen=[],explore=(state,depth)=>{if(!seen.includes(state))return seen.push(state),parser.allActions(state,action=>{if(393216/* Action.GotoFlag */&action);else if(65536&action/* Action.ReduceFlag */){let rDepth=(action>>19/* Action.ReduceDepthShift */)-depth;if(1<rDepth){let term=65535&action/* Action.ValueMask */,target=this.stack.length-3*rDepth;if(0<=target&&0<=parser.getGoto(this.stack[target],term,!1))return 65536|rDepth<<19/* Action.ReduceDepthShift */ /* Action.ReduceFlag */|term}}else{let found=explore(action,depth+1);if(null!=found)return found}})};return explore(this.state,0)}/**
	    @internal
	    */forceAll(){for(;!this.p.parser.stateFlag(this.state,2/* StateFlag.Accepting */);)if(!this.forceReduce()){this.storeNode(0/* Term.Err */,this.pos,this.pos,4,!0);break}return this}/**
	    Check whether this state has no further actions (assumed to be a direct descendant of the
	    top state, since any other states must be able to continue
	    somehow). @internal
	    */get deadEnd(){if(3!=this.stack.length)return!1;let{parser}=this.p;return 65535==parser.data[parser.stateSlot(this.state,1/* ParseState.Actions */)]/* Seq.End */&&!parser.stateSlot(this.state,4/* ParseState.DefaultReduce */)}/**
	    Restart the stack (put it back in its start state). Only safe
	    when this.stack.length == 3 (state is directly below the top
	    state). @internal
	    */restart(){this.storeNode(0/* Term.Err */,this.pos,this.pos,4,!0),this.state=this.stack[0],this.stack.length=0}/**
	    @internal
	    */sameState(other){if(this.state!=other.state||this.stack.length!=other.stack.length)return!1;for(let i=0;i<this.stack.length;i+=3)if(this.stack[i]!=other.stack[i])return!1;return!0}/**
	    Get the parser used by this stack.
	    */get parser(){return this.p.parser}/**
	    Test whether a given dialect (by numeric ID, as exported from
	    the terms file) is enabled.
	    */dialectEnabled(dialectID){return this.p.parser.dialect.flags[dialectID]}shiftContext(term,start){this.curContext&&this.updateContext(this.curContext.tracker.shift(this.curContext.context,term,this,this.p.stream.reset(start)))}reduceContext(term,start){this.curContext&&this.updateContext(this.curContext.tracker.reduce(this.curContext.context,term,this,this.p.stream.reset(start)))}/**
	    @internal
	    */emitContext(){let last=this.buffer.length-1;(0>last||-3!=this.buffer[last])&&this.buffer.push(this.curContext.hash,this.pos,this.pos,-3)}/**
	    @internal
	    */emitLookAhead(){let last=this.buffer.length-1;(0>last||-4!=this.buffer[last])&&this.buffer.push(this.lookAhead,this.pos,this.pos,-4)}updateContext(context){if(context!=this.curContext.context){let newCx=new StackContext(this.curContext.tracker,context);newCx.hash!=this.curContext.hash&&this.emitContext(),this.curContext=newCx}}/**
	    @internal
	    */setLookAhead(lookAhead){return!(lookAhead<=this.lookAhead)&&(this.emitLookAhead(),this.lookAhead=lookAhead,!0)}/**
	    @internal
	    */close(){this.curContext&&this.curContext.tracker.strict&&this.emitContext(),0<this.lookAhead&&this.emitLookAhead()}}class StackContext{constructor(tracker,context){this.tracker=tracker,this.context=context,this.hash=tracker.strict?tracker.hash(context):0}}// Used to cheaply run some reductions to scan ahead without mutating
// an entire stack
class SimulatedStack{constructor(start){this.start=start,this.state=start.state,this.stack=start.stack,this.base=this.stack.length}reduce(action){let term=65535&action/* Action.ValueMask */,depth=action>>19/* Action.ReduceDepthShift */;0==depth?(this.stack==this.start.stack&&(this.stack=this.stack.slice()),this.stack.push(this.state,0,0),this.base+=3):this.base-=3*(depth-1);let goto=this.start.p.parser.getGoto(this.stack[this.base-3],term,!0);this.state=goto}}// This is given to `Tree.build` to build a buffer, and encapsulates
// the parent-stack-walking necessary to read the nodes.
class StackBufferCursor{constructor(stack,pos,index){this.stack=stack,this.pos=pos,this.index=index,this.buffer=stack.buffer,0==this.index&&this.maybeNext()}static create(stack,pos=stack.bufferBase+stack.buffer.length){return new StackBufferCursor(stack,pos,pos-stack.bufferBase)}maybeNext(){let next=this.stack.parent;null!=next&&(this.index=this.stack.bufferBase-next.bufferBase,this.stack=next,this.buffer=next.buffer)}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}next(){this.index-=4,this.pos-=4,0==this.index&&this.maybeNext()}fork(){return new StackBufferCursor(this.stack,this.pos,this.index)}}class CachedToken{constructor(){this.start=-1,this.value=-1,this.end=-1,this.extended=-1,this.lookAhead=0,this.mask=0,this.context=0}}const nullToken=new CachedToken;/**
	[Tokenizers](#lr.ExternalTokenizer) interact with the input
	through this interface. It presents the input as a stream of
	characters, tracking lookahead and hiding the complexity of
	[ranges](#common.Parser.parse^ranges) from tokenizer code.
	*/class InputStream{/**
	    @internal
	    */constructor(/**
	    @internal
	    */input,/**
	    @internal
	    */ranges){this.input=input,this.ranges=ranges,this.chunk="",this.chunkOff=0,this.chunk2="",this.chunk2Pos=0,this.next=-1,this.token=nullToken,this.rangeIndex=0,this.pos=this.chunkPos=ranges[0].from,this.range=ranges[0],this.end=ranges[ranges.length-1].to,this.readNext()}/**
	    @internal
	    */resolveOffset(offset,assoc){let range=this.range,index=this.rangeIndex,pos=this.pos+offset;for(;pos<range.from;){if(!index)return null;let next=this.ranges[--index];pos-=range.from-next.to,range=next}for(;0>assoc?pos>range.to:pos>=range.to;){if(index==this.ranges.length-1)return null;let next=this.ranges[++index];pos+=next.from-range.to,range=next}return pos}/**
	    @internal
	    */clipPos(pos){if(pos>=this.range.from&&pos<this.range.to)return pos;for(let range of this.ranges)if(range.to>pos)return Math.max(pos,range.from);return this.end}/**
	    Look at a code unit near the stream position. `.peek(0)` equals
	    `.next`, `.peek(-1)` gives you the previous character, and so
	    on.
	    
	    Note that looking around during tokenizing creates dependencies
	    on potentially far-away content, which may reduce the
	    effectiveness incremental parsing—when looking forward—or even
	    cause invalid reparses when looking backward more than 25 code
	    units, since the library does not track lookbehind.
	    */peek(offset){let pos,result,idx=this.chunkOff+offset;if(0<=idx&&idx<this.chunk.length)pos=this.pos+offset,result=this.chunk.charCodeAt(idx);else{let resolved=this.resolveOffset(offset,1);if(null==resolved)return-1;if(pos=resolved,pos>=this.chunk2Pos&&pos<this.chunk2Pos+this.chunk2.length)result=this.chunk2.charCodeAt(pos-this.chunk2Pos);else{let i=this.rangeIndex,range=this.range;for(;range.to<=pos;)range=this.ranges[++i];this.chunk2=this.input.chunk(this.chunk2Pos=pos),pos+this.chunk2.length>range.to&&(this.chunk2=this.chunk2.slice(0,range.to-pos)),result=this.chunk2.charCodeAt(0)}}return pos>=this.token.lookAhead&&(this.token.lookAhead=pos+1),result}/**
	    Accept a token. By default, the end of the token is set to the
	    current stream position, but you can pass an offset (relative to
	    the stream position) to change that.
	    */acceptToken(token,endOffset=0){let end=endOffset?this.resolveOffset(endOffset,-1):this.pos;if(null==end||end<this.token.start)throw new RangeError("Token end out of bounds");this.token.value=token,this.token.end=end}/**
	    Accept a token ending at a specific given position.
	    */acceptTokenTo(token,endPos){this.token.value=token,this.token.end=endPos}getChunk(){if(this.pos>=this.chunk2Pos&&this.pos<this.chunk2Pos+this.chunk2.length){let{chunk,chunkPos}=this;this.chunk=this.chunk2,this.chunkPos=this.chunk2Pos,this.chunk2=chunk,this.chunk2Pos=chunkPos,this.chunkOff=this.pos-this.chunkPos}else{this.chunk2=this.chunk,this.chunk2Pos=this.chunkPos;let nextChunk=this.input.chunk(this.pos),end=this.pos+nextChunk.length;this.chunk=end>this.range.to?nextChunk.slice(0,this.range.to-this.pos):nextChunk,this.chunkPos=this.pos,this.chunkOff=0}}readNext(){return this.chunkOff>=this.chunk.length&&(this.getChunk(),this.chunkOff==this.chunk.length)?this.next=-1:this.next=this.chunk.charCodeAt(this.chunkOff)}/**
	    Move the stream forward N (defaults to 1) code units. Returns
	    the new value of [`next`](#lr.InputStream.next).
	    */advance(n=1){for(this.chunkOff+=n;this.pos+n>=this.range.to;){if(this.rangeIndex==this.ranges.length-1)return this.setDone();n-=this.range.to-this.pos,this.range=this.ranges[++this.rangeIndex],this.pos=this.range.from}return this.pos+=n,this.pos>=this.token.lookAhead&&(this.token.lookAhead=this.pos+1),this.readNext()}setDone(){return this.pos=this.chunkPos=this.end,this.range=this.ranges[this.rangeIndex=this.ranges.length-1],this.chunk="",this.next=-1}/**
	    @internal
	    */reset(pos,token){if(token?(this.token=token,token.start=pos,token.lookAhead=pos+1,token.value=token.extended=-1):this.token=nullToken,this.pos!=pos){if(this.pos=pos,pos==this.end)return this.setDone(),this;for(;pos<this.range.from;)this.range=this.ranges[--this.rangeIndex];for(;pos>=this.range.to;)this.range=this.ranges[++this.rangeIndex];pos>=this.chunkPos&&pos<this.chunkPos+this.chunk.length?this.chunkOff=pos-this.chunkPos:(this.chunk="",this.chunkOff=0),this.readNext()}return this}/**
	    @internal
	    */read(from,to){if(from>=this.chunkPos&&to<=this.chunkPos+this.chunk.length)return this.chunk.slice(from-this.chunkPos,to-this.chunkPos);if(from>=this.chunk2Pos&&to<=this.chunk2Pos+this.chunk2.length)return this.chunk2.slice(from-this.chunk2Pos,to-this.chunk2Pos);if(from>=this.range.from&&to<=this.range.to)return this.input.read(from,to);let result="";for(let r of this.ranges){if(r.from>=to)break;r.to>from&&(result+=this.input.read(Math.max(r.from,from),Math.min(r.to,to)))}return result}}/**
	@internal
	*/class TokenGroup{constructor(data,id){this.data=data,this.id=id}token(input,stack){let{parser}=stack.p;readToken(this.data,input,stack,this.id,parser.data,parser.tokenPrecTable)}}TokenGroup.prototype.contextual=TokenGroup.prototype.fallback=TokenGroup.prototype.extend=!1;/**
	@hide
	*/class LocalTokenGroup{constructor(data,precTable,elseToken){this.precTable=precTable,this.elseToken=elseToken,this.data="string"==typeof data?decodeArray(data):data}token(input,stack){let start=input.pos,skipped=0;for(;;){let atEof=0>input.next,nextPos=input.resolveOffset(1,1);if(readToken(this.data,input,stack,0,this.data,this.precTable),-1<input.token.value)break;if(null==this.elseToken)return;if(atEof||skipped++,null==nextPos)break;input.reset(nextPos,input.token)}skipped&&(input.reset(start,input.token),input.acceptToken(this.elseToken,skipped))}}LocalTokenGroup.prototype.contextual=TokenGroup.prototype.fallback=TokenGroup.prototype.extend=!1;/**
	`@external tokens` declarations in the grammar should resolve to
	an instance of this class.
	*/class ExternalTokenizer{/**
	    Create a tokenizer. The first argument is the function that,
	    given an input stream, scans for the types of tokens it
	    recognizes at the stream's position, and calls
	    [`acceptToken`](#lr.InputStream.acceptToken) when it finds
	    one.
	    */constructor(/**
	    @internal
	    */token,options={}){this.token=token,this.contextual=!!options.contextual,this.fallback=!!options.fallback,this.extend=!!options.extend}}const verbose="undefined"!=typeof process&&process.env&&/\bparse\b/.test(process.env.LOG);let stackIDs=null;class FragmentCursor{constructor(fragments,nodeSet){this.fragments=fragments,this.nodeSet=nodeSet,this.i=0,this.fragment=null,this.safeFrom=-1,this.safeTo=-1,this.trees=[],this.start=[],this.index=[],this.nextFragment()}nextFragment(){let fr=this.fragment=this.i==this.fragments.length?null:this.fragments[this.i++];if(fr){for(this.safeFrom=fr.openStart?cutAt(fr.tree,fr.from+fr.offset,1)-fr.offset:fr.from,this.safeTo=fr.openEnd?cutAt(fr.tree,fr.to+fr.offset,-1)-fr.offset:fr.to;this.trees.length;)this.trees.pop(),this.start.pop(),this.index.pop();this.trees.push(fr.tree),this.start.push(-fr.offset),this.index.push(0),this.nextStart=this.safeFrom}else this.nextStart=1e9}// `pos` must be >= any previously given `pos` for this cursor
nodeAt(pos){if(pos<this.nextStart)return null;for(;this.fragment&&this.safeTo<=pos;)this.nextFragment();if(!this.fragment)return null;for(;;){let last=this.trees.length-1;if(0>last)return this.nextFragment(),null;let top=this.trees[last],index=this.index[last];if(index==top.children.length){this.trees.pop(),this.start.pop(),this.index.pop();continue}let next=top.children[index],start=this.start[last]+top.positions[index];if(start>pos)return this.nextStart=start,null;if(next instanceof common.Tree){if(start==pos){if(start<this.safeFrom)return null;let end=start+next.length;if(end<=this.safeTo){let lookAhead=next.prop(common.NodeProp.lookAhead);if(!lookAhead||end+lookAhead<this.fragment.to)return next}}this.index[last]++,start+next.length>=Math.max(this.safeFrom,pos)&&(this.trees.push(next),this.start.push(start),this.index.push(0))}else this.index[last]++,this.nextStart=start+next.length}}}class TokenCache{constructor(parser,stream){this.stream=stream,this.tokens=[],this.mainToken=null,this.actions=[],this.tokens=parser.tokenizers.map(_=>new CachedToken)}getActions(stack){let actionIndex=0,main=null,{parser}=stack.p,{tokenizers}=parser,mask=parser.stateSlot(stack.state,3/* ParseState.TokenizerMask */),context=stack.curContext?stack.curContext.hash:0,lookAhead=0;for(let i=0;i<tokenizers.length;i++){if(0==(1<<i&mask))continue;let tokenizer=tokenizers[i],token=this.tokens[i];if((!main||tokenizer.fallback)&&((tokenizer.contextual||token.start!=stack.pos||token.mask!=mask||token.context!=context)&&(this.updateCachedToken(token,tokenizer,stack),token.mask=mask,token.context=context),token.lookAhead>token.end+25/* Lookahead.Margin */&&(lookAhead=Math.max(token.lookAhead,lookAhead)),0!=token.value/* Term.Err */)){let startIndex=actionIndex;if(-1<token.extended&&(actionIndex=this.addActions(stack,token.extended,token.end,actionIndex)),actionIndex=this.addActions(stack,token.value,token.end,actionIndex),!tokenizer.extend&&(main=token,actionIndex>startIndex))break}}for(;this.actions.length>actionIndex;)this.actions.pop();return lookAhead&&stack.setLookAhead(lookAhead),main||stack.pos!=this.stream.end||(main=new CachedToken,main.value=stack.p.parser.eofTerm,main.start=main.end=stack.pos,actionIndex=this.addActions(stack,main.value,main.end,actionIndex)),this.mainToken=main,this.actions}getMainToken(stack){if(this.mainToken)return this.mainToken;let main=new CachedToken,{pos,p}=stack;return main.start=pos,main.end=Math.min(pos+1,p.stream.end),main.value=pos==p.stream.end?p.parser.eofTerm:0/* Term.Err */,main}updateCachedToken(token,tokenizer,stack){let start=this.stream.clipPos(stack.pos);if(tokenizer.token(this.stream.reset(start,token),stack),-1<token.value){let{parser}=stack.p;for(let i=0;i<parser.specialized.length;i++)if(parser.specialized[i]==token.value){let result=parser.specializers[i](this.stream.read(token.start,token.end),stack);if(0<=result&&stack.p.parser.dialect.allows(result>>1)){0==(1&result)/* Specialize.Specialize */?token.value=result>>1:token.extended=result>>1;break}}}else token.value=0/* Term.Err */,token.end=this.stream.clipPos(start+1)}putAction(action,token,end,index){// Don't add duplicate actions
for(let i=0;i<index;i+=3)if(this.actions[i]==action)return index;return this.actions[index++]=action,this.actions[index++]=token,this.actions[index++]=end,index}addActions(stack,token,end,index){let{state}=stack,{parser}=stack.p,{data}=parser;for(let set=0;2>set;set++)for(let i=parser.stateSlot(state,set?2/* ParseState.Skip */:1/* ParseState.Actions */);;i+=3){if(65535==data[i]/* Seq.End */)if(1==data[i+1]/* Seq.Next */)i=pair(data,i+2);else{0==index&&2==data[i+1]/* Seq.Other */&&(index=this.putAction(pair(data,i+2),token,end,index));break}data[i]==token&&(index=this.putAction(pair(data,i+1),token,end,index))}return index}}class Parse{constructor(parser,input,fragments,ranges){this.parser=parser,this.input=input,this.ranges=ranges,this.recovering=0,this.nextStackID=9812,this.minStackPos=0,this.reused=[],this.stoppedAt=null,this.lastBigReductionStart=-1,this.lastBigReductionSize=0,this.bigReductionCount=0,this.stream=new InputStream(input,ranges),this.tokens=new TokenCache(parser,this.stream),this.topTerm=parser.top[1];let{from}=ranges[0];this.stacks=[Stack.start(this,parser.top[0],from)],this.fragments=fragments.length&&this.stream.end-from>4*parser.bufferLength?new FragmentCursor(fragments,parser.nodeSet):null}get parsedPos(){return this.minStackPos}// Move the parser forward. This will process all parse stacks at
// `this.pos` and try to advance them to a further position. If no
// stack for such a position is found, it'll start error-recovery.
//
// When the parse is finished, this will return a syntax tree. When
// not, it returns `null`.
advance(){let stopped,stoppedTokens,stacks=this.stacks,pos=this.minStackPos,newStacks=this.stacks=[];// This will hold stacks beyond `pos`.
// If a large amount of reductions happened with the same start
// position, force the stack out of that production in order to
// avoid creating a tree too deep to recurse through.
// (This is an ugly kludge, because unfortunately there is no
// straightforward, cheap way to check for this happening, due to
// the history of reductions only being available in an
// expensive-to-access format in the stack buffers.)
if(300<this.bigReductionCount/* Rec.MaxLeftAssociativeReductionCount */&&1==stacks.length){for(let[s]=stacks;s.forceReduce()&&s.stack.length&&s.stack[s.stack.length-2]>=this.lastBigReductionStart;);this.bigReductionCount=this.lastBigReductionSize=0}// Keep advancing any stacks at `pos` until they either move
// forward or can't be advanced. Gather stacks that can't be
// advanced further in `stopped`.
for(let stack,i=0;i<stacks.length;i++)for(stack=stacks[i];;){if(this.tokens.mainToken=null,stack.pos>pos)newStacks.push(stack);else if(this.advanceStack(stack,newStacks,stacks))continue;else{stopped||(stopped=[],stoppedTokens=[]),stopped.push(stack);let tok=this.tokens.getMainToken(stack);stoppedTokens.push(tok.value,tok.end)}break}if(!newStacks.length){let finished=stopped&&findFinished(stopped);if(finished)return verbose&&console.log("Finish with "+this.stackID(finished)),this.stackToTree(finished);if(this.parser.strict)throw verbose&&stopped&&console.log("Stuck with token "+(this.tokens.mainToken?this.parser.getName(this.tokens.mainToken.value):"none")),new SyntaxError("No parse at "+pos);this.recovering||(this.recovering=5/* Rec.Distance */)}if(this.recovering&&stopped){let finished=null!=this.stoppedAt&&stopped[0].pos>this.stoppedAt?stopped[0]:this.runRecovery(stopped,stoppedTokens,newStacks);if(finished)return verbose&&console.log("Force-finish "+this.stackID(finished)),this.stackToTree(finished.forceAll())}if(this.recovering){let maxRemaining=1==this.recovering?1:3*this.recovering/* Rec.MaxRemainingPerStep */;if(newStacks.length>maxRemaining)for(newStacks.sort((a,b)=>b.score-a.score);newStacks.length>maxRemaining;)newStacks.pop();newStacks.some(s=>s.reducePos>pos)&&this.recovering--}else if(1<newStacks.length){// Prune stacks that are in the same state, or that have been
// running without splitting for a while, to avoid getting stuck
// with multiple successful stacks running endlessly on.
outer:for(let stack,i=0;i<newStacks.length-1;i++){stack=newStacks[i];for(let other,j=i+1;j<newStacks.length;j++)if(other=newStacks[j],stack.sameState(other)||500<stack.buffer.length/* Rec.MinBufferLengthPrune */&&500<other.buffer.length/* Rec.MinBufferLengthPrune */)if(0<(stack.score-other.score||stack.buffer.length-other.buffer.length))newStacks.splice(j--,1);else{newStacks.splice(i--,1);continue outer}}12<newStacks.length/* Rec.MaxStackCount */&&(newStacks.sort((a,b)=>b.score-a.score),newStacks.splice(12/* Rec.MaxStackCount */,newStacks.length-12/* Rec.MaxStackCount */))}this.minStackPos=newStacks[0].pos;for(let i=1;i<newStacks.length;i++)newStacks[i].pos<this.minStackPos&&(this.minStackPos=newStacks[i].pos);return null}stopAt(pos){if(null!=this.stoppedAt&&this.stoppedAt<pos)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=pos}// Returns an updated version of the given stack, or null if the
// stack can't advance normally. When `split` and `stacks` are
// given, stacks split off by ambiguous operations will be pushed to
// `split`, or added to `stacks` if they move `pos` forward.
advanceStack(stack,stacks,split){let start=stack.pos,{parser}=this,base=verbose?this.stackID(stack)+" -> ":"";if(null!=this.stoppedAt&&start>this.stoppedAt)return stack.forceReduce()?stack:null;if(this.fragments){let strictCx=stack.curContext&&stack.curContext.tracker.strict,cxHash=strictCx?stack.curContext.hash:0;for(let match,cached=this.fragments.nodeAt(start);cached;){if(match=this.parser.nodeSet.types[cached.type.id]==cached.type?parser.getGoto(stack.state,cached.type.id):-1,-1<match&&cached.length&&(!strictCx||(cached.prop(common.NodeProp.contextHash)||0)==cxHash))return stack.useNode(cached,match),verbose&&console.log(base+this.stackID(stack)+` (via reuse of ${parser.getName(cached.type.id)})`),!0;if(!(cached instanceof common.Tree)||0==cached.children.length||0<cached.positions[0])break;let inner=cached.children[0];if(inner instanceof common.Tree&&0==cached.positions[0])cached=inner;else break}}let defaultReduce=parser.stateSlot(stack.state,4/* ParseState.DefaultReduce */);if(0<defaultReduce)return stack.reduce(defaultReduce),verbose&&console.log(base+this.stackID(stack)+` (via always-reduce ${parser.getName(65535&defaultReduce/* Action.ValueMask */)})`),!0;if(8400<=stack.stack.length/* Rec.CutDepth */)for(;6e3<stack.stack.length/* Rec.CutTo */&&stack.forceReduce(););let actions=this.tokens.getActions(stack);for(let i=0;i<actions.length;){let action=actions[i++],term=actions[i++],end=actions[i++],last=i==actions.length||!split,localStack=last?stack:stack.split(),main=this.tokens.mainToken;if(localStack.apply(action,term,main?main.start:localStack.pos,end),verbose&&console.log(base+this.stackID(localStack)+` (via ${0==(65536&action/* Action.ReduceFlag */)?"shift":`reduce of ${parser.getName(65535&action/* Action.ValueMask */)}`} for ${parser.getName(term)} @ ${start}${localStack==stack?"":", split"})`),last)return!0;localStack.pos>start?stacks.push(localStack):split.push(localStack)}return!1}// Advance a given stack forward as far as it will go. Returns the
// (possibly updated) stack if it got stuck, or null if it moved
// forward and was given to `pushStackDedup`.
advanceFully(stack,newStacks){for(let pos=stack.pos;;){if(!this.advanceStack(stack,null,null))return!1;if(stack.pos>pos)return pushStackDedup(stack,newStacks),!0}}runRecovery(stacks,tokens,newStacks){let finished=null,restarted=!1;for(let i=0;i<stacks.length;i++){let stack=stacks[i],token=tokens[i<<1],tokenEnd=tokens[(i<<1)+1],base=verbose?this.stackID(stack)+" -> ":"";if(stack.deadEnd){if(restarted)continue;restarted=!0,stack.restart(),verbose&&console.log(base+this.stackID(stack)+" (restarted)");let done=this.advanceFully(stack,newStacks);if(done)continue}let force=stack.split(),forceBase=base;for(let j=0;10>j/* Rec.ForceReduceLimit */&&force.forceReduce();j++){verbose&&console.log(forceBase+this.stackID(force)+" (via force-reduce)");let done=this.advanceFully(force,newStacks);if(done)break;verbose&&(forceBase=this.stackID(force)+" -> ")}for(let insert of stack.recoverByInsert(token))verbose&&console.log(base+this.stackID(insert)+" (via recover-insert)"),this.advanceFully(insert,newStacks);this.stream.end>stack.pos?(tokenEnd==stack.pos&&(tokenEnd++,token=0/* Term.Err */),stack.recoverByDelete(token,tokenEnd),verbose&&console.log(base+this.stackID(stack)+` (via recover-delete ${this.parser.getName(token)})`),pushStackDedup(stack,newStacks)):(!finished||finished.score<force.score)&&(finished=force)}return finished}// Convert the stack's buffer to a syntax tree.
stackToTree(stack){return stack.close(),common.Tree.build({buffer:StackBufferCursor.create(stack),nodeSet:this.parser.nodeSet,topID:this.topTerm,maxBufferLength:this.parser.bufferLength,reused:this.reused,start:this.ranges[0].from,length:stack.pos-this.ranges[0].from,minRepeatType:this.parser.minRepeatTerm})}stackID(stack){let id=(stackIDs||(stackIDs=new WeakMap)).get(stack);return id||stackIDs.set(stack,id=String.fromCodePoint(this.nextStackID++)),id+stack}}class Dialect{constructor(source,flags,disabled){this.source=source,this.flags=flags,this.disabled=disabled}allows(term){return!this.disabled||0==this.disabled[term]}}const id=x=>x;/**
	Context trackers are used to track stateful context (such as
	indentation in the Python grammar, or parent elements in the XML
	grammar) needed by external tokenizers. You declare them in a
	grammar file as `@context exportName from "module"`.

	Context values should be immutable, and can be updated (replaced)
	on shift or reduce actions.

	The export used in a `@context` declaration should be of this
	type.
	*/class ContextTracker{/**
	    Define a context tracker.
	    */constructor(spec){this.start=spec.start,this.shift=spec.shift||id,this.reduce=spec.reduce||id,this.reuse=spec.reuse||id,this.hash=spec.hash||(()=>0),this.strict=!1!==spec.strict}}/**
	Holds the parse tables for a given grammar, as generated by
	`lezer-generator`, and provides [methods](#common.Parser) to parse
	content with.
	*/class LRParser extends common.Parser{/**
	    @internal
	    */constructor(spec){function setProp(nodeID,prop,value){nodeProps[nodeID].push([prop,prop.deserialize(value+"")])}if(super(),this.wrappers=[],14!=spec.version/* File.Version */)throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${14/* File.Version */})`);let nodeNames=spec.nodeNames.split(" ");this.minRepeatTerm=nodeNames.length;for(let i=0;i<spec.repeatNodeCount;i++)nodeNames.push("");let topTerms=Object.keys(spec.topRules).map(r=>spec.topRules[r][1]),nodeProps=[];for(let i=0;i<nodeNames.length;i++)nodeProps.push([]);if(spec.nodeProps)for(let propSpec of spec.nodeProps){let prop=propSpec[0];"string"==typeof prop&&(prop=common.NodeProp[prop]);for(let next,i=1;i<propSpec.length;)if(next=propSpec[i++],0<=next)setProp(next,prop,propSpec[i++]);else{let value=propSpec[i+-next];for(let j=-next;0<j;j--)setProp(propSpec[i++],prop,value);i++}}this.nodeSet=new common.NodeSet(nodeNames.map((name,i)=>common.NodeType.define({name:i>=this.minRepeatTerm?void 0:name,id:i,props:nodeProps[i],top:-1<topTerms.indexOf(i),error:0==i,skipped:spec.skippedNodes&&-1<spec.skippedNodes.indexOf(i)}))),spec.propSources&&(this.nodeSet=this.nodeSet.extend(...spec.propSources)),this.strict=!1,this.bufferLength=common.DefaultBufferLength;let tokenArray=decodeArray(spec.tokenData);this.context=spec.context,this.specializerSpecs=spec.specialized||[],this.specialized=new Uint16Array(this.specializerSpecs.length);for(let i=0;i<this.specializerSpecs.length;i++)this.specialized[i]=this.specializerSpecs[i].term;this.specializers=this.specializerSpecs.map(getSpecializer),this.states=decodeArray(spec.states,Uint32Array),this.data=decodeArray(spec.stateData),this.goto=decodeArray(spec.goto),this.maxTerm=spec.maxTerm,this.tokenizers=spec.tokenizers.map(value=>"number"==typeof value?new TokenGroup(tokenArray,value):value),this.topRules=spec.topRules,this.dialects=spec.dialects||{},this.dynamicPrecedences=spec.dynamicPrecedences||null,this.tokenPrecTable=spec.tokenPrec,this.termNames=spec.termNames||null,this.maxNode=this.nodeSet.types.length-1,this.dialect=this.parseDialect(),this.top=this.topRules[Object.keys(this.topRules)[0]]}createParse(input,fragments,ranges){let parse=new Parse(this,input,fragments,ranges);for(let w of this.wrappers)parse=w(parse,input,fragments,ranges);return parse}/**
	    Get a goto table entry @internal
	    */getGoto(state,term,loose=!1){let table=this.goto;if(term>=table[0])return-1;for(let pos=table[term+1];;){let groupTag=table[pos++],last=1&groupTag,target=table[pos++];if(last&&loose)return target;for(let end=pos+(groupTag>>1);pos<end;pos++)if(table[pos]==state)return target;if(last)return-1}}/**
	    Check if this state has an action for a given terminal @internal
	    */hasAction(state,terminal){let data=this.data;for(let set=0;2>set;set++)for(let next,i=this.stateSlot(state,set?2/* ParseState.Skip */:1/* ParseState.Actions */);;i+=3){if(65535==(next=data[i])/* Seq.End */)if(1==data[i+1]/* Seq.Next */)next=data[i=pair(data,i+2)];else{if(2==data[i+1]/* Seq.Other */)return pair(data,i+2);break}if(next==terminal||0==next/* Term.Err */)return pair(data,i+1)}return 0}/**
	    @internal
	    */stateSlot(state,slot){return this.states[6*state/* ParseState.Size */+slot]}/**
	    @internal
	    */stateFlag(state,flag){return 0<(this.stateSlot(state,0/* ParseState.Flags */)&flag)}/**
	    @internal
	    */validAction(state,action){return!!this.allActions(state,a=>a==action||null)}/**
	    @internal
	    */allActions(state,action){let deflt=this.stateSlot(state,4/* ParseState.DefaultReduce */),result=deflt?action(deflt):void 0;for(let i=this.stateSlot(state,1/* ParseState.Actions */);null==result;i+=3){if(65535==this.data[i]/* Seq.End */)if(1==this.data[i+1]/* Seq.Next */)i=pair(this.data,i+2);else break;result=action(pair(this.data,i+1))}return result}/**
	    Get the states that can follow this one through shift actions or
	    goto jumps. @internal
	    */nextStates(state){let result=[];for(let i=this.stateSlot(state,1/* ParseState.Actions */);;i+=3){if(65535==this.data[i]/* Seq.End */)if(1==this.data[i+1]/* Seq.Next */)i=pair(this.data,i+2);else break;if(0==(1&this.data[i+2])){let value=this.data[i+1];result.some((v,i)=>1&i&&v==value)||result.push(this.data[i],value)}}return result}/**
	    Configure the parser. Returns a new parser instance that has the
	    given settings modified. Settings not provided in `config` are
	    kept from the original parser.
	    */configure(config){// Hideous reflection-based kludge to make it easy to create a
// slightly modified copy of a parser.
let copy=Object.assign(Object.create(LRParser.prototype),this);if(config.props&&(copy.nodeSet=this.nodeSet.extend(...config.props)),config.top){let info=this.topRules[config.top];if(!info)throw new RangeError(`Invalid top rule name ${config.top}`);copy.top=info}return config.tokenizers&&(copy.tokenizers=this.tokenizers.map(t=>{let found=config.tokenizers.find(r=>r.from==t);return found?found.to:t})),config.specializers&&(copy.specializers=this.specializers.slice(),copy.specializerSpecs=this.specializerSpecs.map((s,i)=>{let found=config.specializers.find(r=>r.from==s.external);if(!found)return s;let spec=Object.assign(Object.assign({},s),{external:found.to});return copy.specializers[i]=getSpecializer(spec),spec})),config.contextTracker&&(copy.context=config.contextTracker),config.dialect&&(copy.dialect=this.parseDialect(config.dialect)),null!=config.strict&&(copy.strict=config.strict),config.wrap&&(copy.wrappers=copy.wrappers.concat(config.wrap)),null!=config.bufferLength&&(copy.bufferLength=config.bufferLength),copy}/**
	    Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
	    are registered for this parser.
	    */hasWrappers(){return 0<this.wrappers.length}/**
	    Returns the name associated with a given term. This will only
	    work for all terms when the parser was generated with the
	    `--names` option. By default, only the names of tagged terms are
	    stored.
	    */getName(term){return this.termNames?this.termNames[term]:(term<=this.maxNode&&this.nodeSet.types[term].name||term)+""}/**
	    The eof term id is always allocated directly after the node
	    types. @internal
	    */get eofTerm(){return this.maxNode+1}/**
	    The type of top node produced by the parser.
	    */get topNode(){return this.nodeSet.types[this.top[1]]}/**
	    @internal
	    */dynamicPrecedence(term){let prec=this.dynamicPrecedences;return null==prec?0:prec[term]||0}/**
	    @internal
	    */parseDialect(dialect){let values=Object.keys(this.dialects),flags=values.map(()=>!1);if(dialect)for(let part of dialect.split(" ")){let id=values.indexOf(part);0<=id&&(flags[id]=!0)}let disabled=null;for(let i=0;i<values.length;i++)if(!flags[i])for(let id,j=this.dialects[values[i]];65535!=(id=this.data[j++])/* Seq.End */;)(disabled||(disabled=new Uint8Array(this.maxTerm+1)))[id]=1;return new Dialect(dialect,flags,disabled)}/**
	    Used by the output of the parser generator. Not available to
	    user code. @hide
	    */static deserialize(spec){return new LRParser(spec)}}return dist.ContextTracker=ContextTracker,dist.ExternalTokenizer=ExternalTokenizer,dist.InputStream=InputStream,dist.LRParser=LRParser,dist.LocalTokenGroup=LocalTokenGroup,dist.Stack=Stack,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__codemirror_state(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@marijn/find-cluster-break"),dist={},distExports=function requireDist(){return hasRequiredDist?dist:(hasRequiredDist=1,function(exports){function textLength(text){let length=-1;for(let line of text)length+=line.length+1;return length}function appendText(text,target,from=0,to=1e9){for(let pos=0,i=0,first=!0;i<text.length&&pos<=to;i++){let line=text[i],end=pos+line.length;end>=from&&(end>to&&(line=line.slice(0,to-pos)),pos<from&&(line=line.slice(from-pos)),first?(target[target.length-1]+=line,first=!1):target.push(line)),pos=end+1}return target}function sliceText(text,from,to){return appendText(text,[""],from,to)}function clip(text,from,to){return from=Math.max(0,Math.min(text.length,from)),[from,Math.max(from,Math.min(text.length,to))]}/**
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
async function _coreInit__codemirror_view(requireAsyncModule,exports={}){const module={exports:exports};var require$$0=await requireAsyncModule("@codemirror/state"),require$$1=await requireAsyncModule("style-mod"),require$$2=await requireAsyncModule("w3c-keyname"),require$$3=await requireAsyncModule("crelt"),dist={},distExports=function requireDist(){return hasRequiredDist?dist:(hasRequiredDist=1,function(exports){function combineAttrs(source,target){for(let name in source)"class"==name&&target.class?target.class+=" "+source.class:"style"==name&&target.style?target.style+=";"+source.style:target[name]=source[name];return target}function attrsEq(a,b,ignore){if(a==b)return!0;a||(a=noAttrs),b||(b=noAttrs);let keysA=Object.keys(a),keysB=Object.keys(b);if(keysA.length-0!=keysB.length-0)return!1;for(let key of keysA)if(key!=ignore&&(-1==keysB.indexOf(key)||a[key]!==b[key]))return!1;return!0}function setAttrs(dom,attrs){for(let i=dom.attributes.length-1,name;0<=i;i--)name=dom.attributes[i].name,null==attrs[name]&&dom.removeAttribute(name);for(let name in attrs){let value=attrs[name];"style"==name?dom.style.cssText=value:dom.getAttribute(name)!=value&&dom.setAttribute(name,value)}}function updateAttrs(dom,prev,attrs){let changed=!1;if(prev)for(let name in prev)attrs&&name in attrs||(changed=!0,"style"==name?dom.style.cssText="":dom.removeAttribute(name));if(attrs)for(let name in attrs)prev&&prev[name]==attrs[name]||(changed=!0,"style"==name?dom.style.cssText=attrs[name]:dom.setAttribute(name,attrs[name]));return changed}function getAttrs(dom){let attrs=Object.create(null);for(let i=0,attr;i<dom.attributes.length;i++)attr=dom.attributes[i],attrs[attr.name]=attr.value;return attrs}/**
		Widgets added to the content are described by subclasses of this
		class. Using a description object like that makes it possible to
		delay creating of the DOM structure for a widget until it is
		needed, and to avoid redrawing widgets even if the decorations
		that define them are recreated.
		*/function getInclusive(spec,block=!1){let{inclusiveStart:start,inclusiveEnd:end}=spec;return null==start&&(start=spec.inclusive),null==end&&(end=spec.inclusive),{start:null!==start&&void 0!==start?start:block,end:null!==end&&void 0!==end?end:block}}function widgetsEq(a,b){return a==b||!!(a&&b&&a.compare(b))}function addRange(from,to,ranges,margin=0){let last=ranges.length-1;0<=last&&ranges[last]+margin>=from?ranges[last]=Math.max(ranges[last],to):ranges.push(from,to)}/**
		A block wrapper defines a DOM node that wraps lines or other block
		wrappers at the top of the document. It affects any line or block
		widget that starts inside its range, including blocks starting
		directly at `from` but not including `to`.
		*/function getSelection(root){let target;// Browsers differ on whether shadow roots have a getSelection
// method. If it exists, use that, otherwise, call it on the
// document.
return target=11==root.nodeType?root.getSelection?root:root.ownerDocument:root,target.getSelection()}function contains(dom,node){return!!node&&(dom==node||dom.contains(1==node.nodeType?node:node.parentNode))}function hasSelection(dom,selection){if(!selection.anchorNode)return!1;try{// Firefox will raise 'permission denied' errors when accessing
// properties of `sel.anchorNode` when it's in a generated CSS
// element.
return contains(dom,selection.anchorNode)}catch(_){return!1}}function clientRectsFor(dom){return 3==dom.nodeType?textRange(dom,0,dom.nodeValue.length).getClientRects():1==dom.nodeType?dom.getClientRects():[]}// Scans forward and backward through DOM positions equivalent to the
// given one to see if the two are in the same place (i.e. after a
// text node vs at the end of that text node)
function isEquivalentPosition(node,off,targetNode,targetOff){return!!targetNode&&(scanFor(node,off,targetNode,targetOff,-1)||scanFor(node,off,targetNode,targetOff,1))}function domIndex(node){for(var index=0;;index++)if(node=node.previousSibling,!node)return index}function isBlockElement(node){return 1==node.nodeType&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName)}function scanFor(node,off,targetNode,targetOff,dir){for(;;){if(node==targetNode&&off==targetOff)return!0;if(off==(0>dir?0:maxOffset(node))){if("DIV"==node.nodeName)return!1;let parent=node.parentNode;if(!parent||1!=parent.nodeType)return!1;off=domIndex(node)+(0>dir?0:1),node=parent}else if(1==node.nodeType){if(node=node.childNodes[off+(0>dir?-1:0)],1==node.nodeType&&"false"==node.contentEditable)return!1;off=0>dir?maxOffset(node):0}else return!1}}function maxOffset(node){return 3==node.nodeType?node.nodeValue.length:node.childNodes.length}function flattenRect(rect,left){let x=left?rect.left:rect.right;return{left:x,right:x,top:rect.top,bottom:rect.bottom}}function windowRect(win){let vp=win.visualViewport;return vp?{left:0,right:vp.width,top:0,bottom:vp.height}:{left:0,right:win.innerWidth,top:0,bottom:win.innerHeight}}function getScale(elt,rect){let scaleX=rect.width/elt.offsetWidth,scaleY=rect.height/elt.offsetHeight;return(.995<scaleX&&1.005>scaleX||!isFinite(scaleX)||1>Math.abs(rect.width-elt.offsetWidth))&&(scaleX=1),(.995<scaleY&&1.005>scaleY||!isFinite(scaleY)||1>Math.abs(rect.height-elt.offsetHeight))&&(scaleY=1),{scaleX,scaleY}}function scrollRectIntoView(dom,rect,side,x,y,xMargin,yMargin,ltr){let doc=dom.ownerDocument,win=doc.defaultView||window;for(let cur=dom,stop=!1;cur&&!stop;)if(1==cur.nodeType){// Element
let top=cur==doc.body,scaleX=1,scaleY=1,bounding;if(top)bounding=windowRect(win);else{if(/^(fixed|sticky)$/.test(getComputedStyle(cur).position)&&(stop=!0),cur.scrollHeight<=cur.clientHeight&&cur.scrollWidth<=cur.clientWidth){cur=cur.assignedSlot||cur.parentNode;continue}let rect=cur.getBoundingClientRect();({scaleX,scaleY}=getScale(cur,rect)),bounding={left:rect.left,right:rect.left+cur.clientWidth*scaleX,top:rect.top,bottom:rect.top+cur.clientHeight*scaleY}}let moveX=0,moveY=0;if("nearest"==y)rect.top<bounding.top+yMargin?(moveY=rect.top-(bounding.top+yMargin),0<side&&rect.bottom>bounding.bottom+moveY&&(moveY=rect.bottom-bounding.bottom+yMargin)):rect.bottom>bounding.bottom-yMargin&&(moveY=rect.bottom-bounding.bottom+yMargin,0>side&&rect.top-moveY<bounding.top&&(moveY=rect.top-(bounding.top+yMargin)));else{let rectHeight=rect.bottom-rect.top,boundingHeight=bounding.bottom-bounding.top,targetTop="center"==y&&rectHeight<=boundingHeight?rect.top+rectHeight/2-boundingHeight/2:"start"==y||"center"==y&&0>side?rect.top-yMargin:rect.bottom-boundingHeight+yMargin;moveY=targetTop-bounding.top}if("nearest"==x)rect.left<bounding.left+xMargin?(moveX=rect.left-(bounding.left+xMargin),0<side&&rect.right>bounding.right+moveX&&(moveX=rect.right-bounding.right+xMargin)):rect.right>bounding.right-xMargin&&(moveX=rect.right-bounding.right+xMargin,0>side&&rect.left<bounding.left+moveX&&(moveX=rect.left-(bounding.left+xMargin)));else{let targetLeft="center"==x?rect.left+(rect.right-rect.left)/2-(bounding.right-bounding.left)/2:"start"==x==ltr?rect.left-xMargin:rect.right-(bounding.right-bounding.left)+xMargin;moveX=targetLeft-bounding.left}if(moveX||moveY)if(top)win.scrollBy(moveX,moveY);else{let movedX=0,movedY=0;if(moveY){let start=cur.scrollTop;cur.scrollTop+=moveY/scaleY,movedY=(cur.scrollTop-start)*scaleY}if(moveX){let start=cur.scrollLeft;cur.scrollLeft+=moveX/scaleX,movedX=(cur.scrollLeft-start)*scaleX}rect={left:rect.left-movedX,top:rect.top-movedY,right:rect.right-movedX,bottom:rect.bottom-movedY},movedX&&1>Math.abs(movedX-moveX)&&(x="nearest"),movedY&&1>Math.abs(movedY-moveY)&&(y="nearest")}if(top)break;(rect.top<bounding.top||rect.bottom>bounding.bottom||rect.left<bounding.left||rect.right>bounding.right)&&(rect={left:Math.max(rect.left,bounding.left),right:Math.min(rect.right,bounding.right),top:Math.max(rect.top,bounding.top),bottom:Math.min(rect.bottom,bounding.bottom)}),cur=cur.assignedSlot||cur.parentNode}else if(11==cur.nodeType)// A shadow root
cur=cur.host;else break}function scrollableParents(dom,getX=!0){let doc=dom.ownerDocument,x=null,y=null;for(let cur=dom.parentNode;cur&&!(cur==doc.body||(!getX||x)&&y);)if(1==cur.nodeType)!y&&cur.scrollHeight>cur.clientHeight&&(y=cur),getX&&!x&&cur.scrollWidth>cur.clientWidth&&(x=cur),cur=cur.assignedSlot||cur.parentNode;else if(11==cur.nodeType)cur=cur.host;else break;return{x,y}}// Feature-detects support for .focus({preventScroll: true}), and uses
// a fallback kludge when not supported.
function focusPreventScroll(dom){if(dom.setActive)return dom.setActive();// in IE
if(preventScrollSupported)return dom.focus(preventScrollSupported);let stack=[];for(let cur=dom;cur&&(stack.push(cur,cur.scrollTop,cur.scrollLeft),cur!=cur.ownerDocument);cur=cur.parentNode);if(dom.focus(null==preventScrollSupported?{get preventScroll(){return preventScrollSupported={preventScroll:!0},!0}}:void 0),!preventScrollSupported){preventScrollSupported=!1;for(let i=0;i<stack.length;){let elt=stack[i++],top=stack[i++],left=stack[i++];elt.scrollTop!=top&&(elt.scrollTop=top),elt.scrollLeft!=left&&(elt.scrollLeft=left)}}}function textRange(node,from,to=from){let range=scratchRange||(scratchRange=document.createRange());return range.setEnd(node,to),range.setStart(node,from),range}function dispatchKey(elt,name,code,mods){let options={key:name,code:name,keyCode:code,which:code,cancelable:!0};mods&&({altKey:options.altKey,ctrlKey:options.ctrlKey,shiftKey:options.shiftKey,metaKey:options.metaKey}=mods);let down=new KeyboardEvent("keydown",options);down.synthetic=!0,elt.dispatchEvent(down);let up=new KeyboardEvent("keyup",options);return up.synthetic=!0,elt.dispatchEvent(up),down.defaultPrevented||up.defaultPrevented}function getRoot(node){for(;node;){if(node&&(9==node.nodeType||11==node.nodeType&&node.host))return node;node=node.assignedSlot||node.parentNode}return null}function atElementStart(doc,selection){let node=selection.focusNode,offset=selection.focusOffset;if(!node||selection.anchorNode!=node||selection.anchorOffset!=offset)return!1;// Safari can report bogus offsets (#1152)
for(offset=Math.min(offset,maxOffset(node));;)if(offset){if(1!=node.nodeType)return!1;let prev=node.childNodes[offset-1];"false"==prev.contentEditable?offset--:(node=prev,offset=maxOffset(node))}else{if(node==doc)return!0;offset=domIndex(node),node=node.parentNode}}function isScrolledToBottom(elt){return elt instanceof Window?elt.pageYOffset>Math.max(0,elt.document.documentElement.scrollHeight-elt.innerHeight-4):elt.scrollTop>Math.max(1,elt.scrollHeight-elt.clientHeight-4)}function textNodeBefore(startNode,startOffset){for(let node=startNode,offset=startOffset;;){if(3==node.nodeType&&0<offset)return{node:node,offset:offset};if(1==node.nodeType&&0<offset){if("false"==node.contentEditable)return null;node=node.childNodes[offset-1],offset=maxOffset(node)}else if(node.parentNode&&!isBlockElement(node))offset=domIndex(node),node=node.parentNode;else return null}}function textNodeAfter(startNode,startOffset){for(let node=startNode,offset=startOffset;;){if(3==node.nodeType&&offset<node.nodeValue.length)return{node:node,offset:offset};if(1==node.nodeType&&offset<node.childNodes.length){if("false"==node.contentEditable)return null;node=node.childNodes[offset],offset=0}else if(node.parentNode&&!isBlockElement(node))offset=domIndex(node)+1,node=node.parentNode;else return null}}// Decode a string with each type encoded as log2(type)
function dec(str){let result=[];for(let i=0;i<str.length;i++)result.push(1<<+str[i]);return result}// Character types for codepoints 0 to 0xf8
function charType(ch){return 247>=ch?LowTypes[ch]:1424<=ch&&1524>=ch?2/* T.R */:1536<=ch&&1785>=ch?ArabicTypes[ch-1536]:1774<=ch&&2220>=ch?4/* T.AL */:8192<=ch&&8204>=ch?256/* T.NI */:64336<=ch&&65023>=ch?4/* T.AL */:1/* T.L */}function isolatesEq(a,b){if(a.length!=b.length)return!1;for(let i=0;i<a.length;i++){let iA=a[i],iB=b[i];if(iA.from!=iB.from||iA.to!=iB.to||iA.direction!=iB.direction||!isolatesEq(iA.inner,iB.inner))return!1}return!0}// Reused array of character types
// Fill in the character types (in `types`) from `from` to `to` and
// apply W normalization rules.
function computeCharTypes(line,rFrom,rTo,isolates,outerType){for(let iI=0;iI<=isolates.length;iI++){let from=iI?isolates[iI-1].to:rFrom,to=iI<isolates.length?isolates[iI].from:rTo,prevType=iI?256/* T.NI */:outerType;// W1. Examine each non-spacing mark (NSM) in the level run, and
// change the type of the NSM to the type of the previous
// character. If the NSM is at the start of the level run, it will
// get the type of sor.
// W2. Search backwards from each instance of a European number
// until the first strong type (R, L, AL, or sor) is found. If an
// AL is found, change the type of the European number to Arabic
// number.
// W3. Change all ALs to R.
// (Left after this: L, R, EN, AN, ET, CS, NI)
for(let i=from,prev=prevType,prevStrong=prevType,type;i<to;i++)type=charType(line.charCodeAt(i)),512==type/* T.NSM */?type=prev:8==type/* T.EN */&&4==prevStrong/* T.AL */&&(type=16/* T.AN */),types[i]=4==type/* T.AL */?2/* T.R */:type,7&type/* T.Strong */&&(prevStrong=type),prev=type;// W5. A sequence of European terminators adjacent to European
// numbers changes to all European numbers.
// W6. Otherwise, separators and terminators change to Other
// Neutral.
// W7. Search backwards from each instance of a European number
// until the first strong type (R, L, or sor) is found. If an L is
// found, then change the type of the European number to L.
// (Left after this: L, R, EN+AN, NI)
for(let i=from,prev=prevType,prevStrong=prevType,type;i<to;i++){if(type=types[i],128==type/* T.CS */)i<to-1&&prev==types[i+1]&&24&prev/* T.Num */?type=types[i]=prev:types[i]=256/* T.NI */;else if(64==type/* T.ET */){let end=i+1;for(;end<to&&64==types[end]/* T.ET */;)end++;let replace=i&&8==prev/* T.EN */||end<rTo&&8==types[end]/* T.EN */?1==prevStrong/* T.L */?1/* T.L */:8/* T.EN */:256/* T.NI */;for(let j=i;j<end;j++)types[j]=replace;i=end-1}else 8==type/* T.EN */&&1==prevStrong/* T.L */&&(types[i]=1/* T.L */);prev=type,7&type/* T.Strong */&&(prevStrong=type)}}}// Process brackets throughout a run sequence.
function processBracketPairs(line,rFrom,rTo,isolates,outerType){let oppositeType=1==outerType/* T.L */?2/* T.R */:1/* T.L */;for(let iI=0,sI=0,context=0;iI<=isolates.length;iI++){let from=iI?isolates[iI-1].to:rFrom,to=iI<isolates.length?isolates[iI].from:rTo;// N0. Process bracket pairs in an isolating run sequence
// sequentially in the logical order of the text positions of the
// opening paired brackets using the logic given below. Within this
// scope, bidirectional types EN and AN are treated as R.
for(let i=from,ch,br,type;i<to;i++)// Keeps [startIndex, type, strongSeen] triples for each open
// bracket on BracketStack.
if(br=Brackets[ch=line.charCodeAt(i)]){if(0>br){// Closing bracket
for(let sJ=sI-3;0<=sJ;sJ-=3)if(BracketStack[sJ+1]==-br){let flags=BracketStack[sJ+2],type=2&flags/* Bracketed.EmbedInside */?outerType:4&flags/* Bracketed.OppositeInside */?1&flags/* Bracketed.OppositeBefore */?oppositeType:outerType:0;type&&(types[i]=types[BracketStack[sJ]]=type),sI=sJ;break}}else if(189==BracketStack.length/* Bracketed.MaxDepth */)break;else BracketStack[sI++]=i,BracketStack[sI++]=ch,BracketStack[sI++]=context;}else if(2==(type=types[i])/* T.R */||1==type/* T.L */){let embed=type==outerType;context=embed?0:1/* Bracketed.OppositeBefore */;for(let sJ=sI-3,cur;0<=sJ&&(cur=BracketStack[sJ+2],!(2&cur/* Bracketed.EmbedInside */));sJ-=3)if(embed)BracketStack[sJ+2]|=2/* Bracketed.EmbedInside */;else{if(4&cur/* Bracketed.OppositeInside */)break;BracketStack[sJ+2]|=4/* Bracketed.OppositeInside */}}}}function processNeutrals(rFrom,rTo,isolates,outerType){for(let iI=0,prev=outerType;iI<=isolates.length;iI++){let from=iI?isolates[iI-1].to:rFrom,to=iI<isolates.length?isolates[iI].from:rTo;// N1. A sequence of neutrals takes the direction of the
// surrounding strong text if the text on both sides has the same
// direction. European and Arabic numbers act as if they were R in
// terms of their influence on neutrals. Start-of-level-run (sor)
// and end-of-level-run (eor) are used at level run boundaries.
// N2. Any remaining neutrals take the embedding direction.
// (Left after this: L, R, EN+AN)
for(let i=from,type;i<to;)if(type=types[i],256==type/* T.NI */){let end=i+1;for(;;)if(end==to){if(iI==isolates.length)break;end=isolates[iI++].to,to=iI<isolates.length?isolates[iI].from:rTo}else if(256==types[end]/* T.NI */)end++;else break;let beforeL=1==prev/* T.L */,afterL=1==(end<rTo?types[end]:outerType)/* T.L */,replace=beforeL==afterL?beforeL?1/* T.L */:2/* T.R */:outerType;for(let j=end,jI=iI,fromJ=jI?isolates[jI-1].to:rFrom;j>i;)j==fromJ&&(j=isolates[--jI].from,fromJ=jI?isolates[jI-1].to:rFrom),types[--j]=replace;i=end}else prev=type,i++}}// Find the contiguous ranges of character types in a given range, and
// emit spans for them. Flip the order of the spans as appropriate
// based on the level, and call through to compute the spans for
// isolates at the proper point.
function emitSpans(line,from,to,level,baseLevel,isolates,order){let ourType=level%2?2/* T.R */:1/* T.L */;if(level%2==baseLevel%2)// Same dir as base direction, don't flip
for(let iCh=from,iI=0;iCh<to;){// Scan a section of characters in direction ourType, unless
// there's another type of char right after iCh, in which case
// we scan a section of other characters (which, if ourType ==
// T.L, may contain both T.R and T.AN chars).
let sameDir=!0,isNum=!1;if(iI==isolates.length||iCh<isolates[iI].from){let next=types[iCh];next!=ourType&&(sameDir=!1,isNum=16==next/* T.AN */)}// Holds an array of isolates to pass to a recursive call if we
// must recurse (to distinguish T.AN inside an RTL section in
// LTR text), null if we can emit directly
let recurse=sameDir||1!=ourType/* T.L */?null:[],localLevel=sameDir?level:level+1,iScan=iCh;run:for(;;)if(iI<isolates.length&&iScan==isolates[iI].from){if(isNum)break run;let iso=isolates[iI];// Scan ahead to verify that there is another char in this dir after the isolate(s)
if(!sameDir)for(let upto=iso.to,jI=iI+1;;){if(upto==to)break run;if(jI<isolates.length&&isolates[jI].from==upto)upto=isolates[jI++].to;else if(types[upto]==ourType)break run;else break}if(iI++,recurse)recurse.push(iso);else{iso.from>iCh&&order.push(new BidiSpan(iCh,iso.from,localLevel));let dirSwap=iso.direction==LTR!=!(localLevel%2);computeSectionOrder(line,dirSwap?level+1:level,baseLevel,iso.inner,iso.from,iso.to,order),iCh=iso.to}iScan=iso.to}else if(iScan==to||(sameDir?types[iScan]!=ourType:types[iScan]==ourType))break;else iScan++;recurse?emitSpans(line,iCh,iScan,level+1,baseLevel,recurse,order):iCh<iScan&&order.push(new BidiSpan(iCh,iScan,localLevel)),iCh=iScan}else// Iterate in reverse to flip the span order. Same code again, but
// going from the back of the section to the front
for(let iCh=to,iI=isolates.length;iCh>from;){let sameDir=!0,isNum=!1;if(!iI||iCh>isolates[iI-1].to){let next=types[iCh-1];next!=ourType&&(sameDir=!1,isNum=16==next/* T.AN */)}let recurse=sameDir||1!=ourType/* T.L */?null:[],localLevel=sameDir?level:level+1,iScan=iCh;run:for(;;)if(iI&&iScan==isolates[iI-1].to){if(isNum)break run;let iso=isolates[--iI];// Scan ahead to verify that there is another char in this dir after the isolate(s)
if(!sameDir)for(let upto=iso.from,jI=iI;;){if(upto==from)break run;if(jI&&isolates[jI-1].to==upto)upto=isolates[--jI].from;else if(types[upto-1]==ourType)break run;else break}if(recurse)recurse.push(iso);else{iso.to<iCh&&order.push(new BidiSpan(iso.to,iCh,localLevel));let dirSwap=iso.direction==LTR!=!(localLevel%2);computeSectionOrder(line,dirSwap?level+1:level,baseLevel,iso.inner,iso.from,iso.to,order),iCh=iso.from}iScan=iso.from}else if(iScan==from||(sameDir?types[iScan-1]!=ourType:types[iScan-1]==ourType))break;else iScan--;recurse?emitSpans(line,iScan,iCh,level+1,baseLevel,recurse,order):iScan<iCh&&order.push(new BidiSpan(iScan,iCh,localLevel)),iCh=iScan}}function computeSectionOrder(line,level,baseLevel,isolates,from,to,order){let outerType=level%2?2/* T.R */:1/* T.L */;computeCharTypes(line,from,to,isolates,outerType),processBracketPairs(line,from,to,isolates,outerType),processNeutrals(from,to,isolates,outerType),emitSpans(line,from,to,level,baseLevel,isolates,order)}function computeOrder(line,direction,isolates){if(!line)return[new BidiSpan(0,0,direction==RTL?1:0)];if(direction==LTR&&!isolates.length&&!BidiRE.test(line))return trivialOrder(line.length);if(isolates.length)for(;line.length>types.length;)types[types.length]=256/* T.NI */;// Make sure types array has no gaps
let order=[],level=direction==LTR?0:1;return computeSectionOrder(line,level,level,isolates,0,line.length,order),order}function trivialOrder(length){return[new BidiSpan(0,length,0)]}// This implementation moves strictly visually, without concern for a
// traversal visiting every logical position in the string. It will
// still do so for simple input, but situations like multiple isolates
// with the same level next to each other, or text going against the
// main dir at the end of the line, will make some positions
// unreachable with this motion. Each visible cursor position will
// correspond to the lower-level bidi span that touches it.
//
// The alternative would be to solve an order globally for a given
// line, making sure that it includes every position, but that would
// require associating non-canonical (higher bidi span level)
// positions with a given visual position, which is likely to confuse
// people. (And would generally be a lot more complicated.)
function moveVisually(line,order,dir,start,forward){var _a;let startIndex=start.head-line.from,spanI=BidiSpan.find(order,startIndex,null!==(_a=start.bidiLevel)&&void 0!==_a?_a:-1,start.assoc),span=order[spanI],spanEnd=span.side(forward,dir);// End of span
if(startIndex==spanEnd){let nextI=spanI+=forward?1:-1;if(0>nextI||nextI>=order.length)return null;span=order[spanI=nextI],startIndex=span.side(!forward,dir),spanEnd=span.side(forward,dir)}let nextIndex=state.findClusterBreak(line.text,startIndex,span.forward(forward,dir));(nextIndex<span.from||nextIndex>span.to)&&(nextIndex=spanEnd),movedOver=line.text.slice(Math.min(startIndex,nextIndex),Math.max(startIndex,nextIndex));let nextSpan=spanI==(forward?order.length-1:0)?null:order[spanI+(forward?1:-1)];return nextSpan&&nextIndex==spanEnd&&nextSpan.level+(forward?0:1)<span.level?state.EditorSelection.cursor(nextSpan.side(!forward,dir)+line.from,nextSpan.forward(forward,dir)?1:-1,nextSpan.level):state.EditorSelection.cursor(nextIndex+line.from,span.forward(forward,dir)?-1:1,span.level)}function autoDirection(text,from,to){for(let i=from,type;i<to;i++){if(type=charType(text.charCodeAt(i)),1==type/* T.L */)return LTR;if(2==type/* T.R */||4==type/* T.AL */)return RTL}return LTR}/**
		Log or report an unhandled exception in client code. Should
		probably only be used by extension code that allows client code to
		provide functions, and calls those functions in a context where an
		exception can't be propagated to calling code in a reasonable way
		(for example when in an event handler).

		Either calls a handler registered with
		[`EditorView.exceptionSink`](https://codemirror.net/6/docs/ref/#view.EditorView^exceptionSink),
		`window.onerror`, if defined, or `console.error` (in which case
		it'll pass `context`, when given, as first argument).
		*/function logException(state,exception,context){let handler=state.facet(exceptionSink);if(handler.length)handler[0](exception);else if(window.onerror&&window.onerror(exception+"",context,void 0,void 0,exception));else context?console.error(context+":",exception):console.error(exception)}function getIsolatedRanges(view,line){let isolates=view.state.facet(bidiIsolatedRanges);if(!isolates.length)return isolates;let sets=isolates.map(i=>i instanceof Function?i(view):i),result=[];return state.RangeSet.spans(sets,line.from,line.to,{point(){},span(fromDoc,toDoc,active,open){let from=fromDoc-line.from,to=toDoc-line.from,level=result;for(let i=active.length-1;0<=i;i--,open--){let direction=active[i].spec.bidiIsolate,update;if(null==direction&&(direction=autoDirection(line.text,from,to)),0<open&&level.length&&(update=level[level.length-1]).to==from&&update.direction==direction)update.to=to,level=update.inner;else{let add={from,to,direction,inner:[]};level.push(add),level=add.inner}}}}),result}function getScrollMargins(view){let left=0,right=0,top=0,bottom=0;for(let source of view.state.facet(scrollMargins)){let m=source(view);m&&(null!=m.left&&(left=Math.max(left,m.left)),null!=m.right&&(right=Math.max(right,m.right)),null!=m.top&&(top=Math.max(top,m.top)),null!=m.bottom&&(bottom=Math.max(bottom,m.bottom)))}return{left,right,top,bottom}}// Remove a DOM node and return its next sibling.
function rm$1(dom){let next=dom.nextSibling;return dom.parentNode.removeChild(dom),next}// The top-level tile. Its dom property equals view.contentDOM.
function fallbackRect(tile){let last=tile.dom.lastChild;if(!last)return tile.dom.getBoundingClientRect();let rects=clientRectsFor(last);return rects[rects.length-1]||null}function onSameLine(a,b){let posA=a.coordsIn(0,1),posB=b.coordsIn(0,1);return posA&&posB&&posB.top<posA.bottom}function hasContent(tile,requireText){let scan=tile=>{for(let ch of tile.children)if((requireText?ch.isText():ch.length)||scan(ch))return!0;return!1};return scan(tile)}function widgetFlags(deco){let flags=deco.isReplace?(0>deco.startSide?64/* TileFlag.IncStart */:0)|(0<deco.endSide?128/* TileFlag.IncEnd */:0):0<deco.startSide?32/* TileFlag.After */:16/* TileFlag.Before */;return deco.block&&(flags|=256/* TileFlag.Block */),flags}function addLineDeco(value,deco){let attrs=deco.spec.attributes,cls=deco.spec.class;return attrs||cls?(value||(value={class:"cm-line"}),attrs&&combineAttrs(attrs,value),cls&&(value.class+=" "+cls),value):value}function getMarks(ptr){let found=[];for(let i=ptr.parents.length,tile;1<i;i--)tile=i==ptr.parents.length?ptr.tile:ptr.parents[i].tile,tile instanceof MarkTile&&found.push(tile.mark);return found}function freeNode(node){let tile=Tile.get(node);return tile&&tile.setDOM(node.cloneNode()),node}function destroyDropped(tile,reused){let r=null===reused||void 0===reused?void 0:reused.get(tile);if(1!=r/* Reused.Full */){null==r&&tile.destroy();for(let ch of tile.children)destroyDropped(ch,reused)}}function betweenUneditable(pos){return 1==pos.node.nodeType&&pos.node.firstChild&&(0==pos.offset||"false"==pos.node.childNodes[pos.offset-1].contentEditable)&&(pos.offset==pos.node.childNodes.length||"false"==pos.node.childNodes[pos.offset].contentEditable)}function findCompositionNode(view,headPos){let sel=view.observer.selectionRange;if(!sel.focusNode)return null;let textBefore=textNodeBefore(sel.focusNode,sel.focusOffset),textAfter=textNodeAfter(sel.focusNode,sel.focusOffset),textNode=textBefore||textAfter;if(textAfter&&textBefore&&textAfter.node!=textBefore.node){let tileAfter=Tile.get(textAfter.node);if(!tileAfter||tileAfter.isText()&&tileAfter.text!=textAfter.node.nodeValue)textNode=textAfter;else if(view.docView.lastCompositionAfterCursor){let tileBefore=Tile.get(textBefore.node);!tileBefore||tileBefore.isText()&&tileBefore.text!=textBefore.node.nodeValue||(textNode=textAfter)}}if(view.docView.lastCompositionAfterCursor=textNode!=textBefore,!textNode)return null;let from=headPos-textNode.offset;return{from,to:from+textNode.node.nodeValue.length,node:textNode.node}}function findCompositionRange(view,changes,headPos){let found=findCompositionNode(view,headPos);if(!found)return null;let{node:textNode,from,to}=found,text=textNode.nodeValue;// Don't try to preserve multi-line compositions
if(/[\n\r]/.test(text))return null;if(view.state.doc.sliceString(found.from,found.to)!=text)return null;let inv=changes.invertedDesc;return{range:new ChangedRange(inv.mapPos(from),inv.mapPos(to),from,to),text:textNode}}function nextToUneditable(node,offset){return 1==node.nodeType?(offset&&"false"==node.childNodes[offset-1].contentEditable?1/* NextTo.Before */:0)|(offset<node.childNodes.length&&"false"==node.childNodes[offset].contentEditable?2/* NextTo.After */:0):0}function findChangedDeco(a,b,diff){let comp=new DecorationComparator$1;return state.RangeSet.compare(a,b,diff,comp),comp.changes}function findChangedWrappers(a,b,diff){let comp=new WrapperComparator;return state.RangeSet.compare(a,b,diff,comp),comp.changes}function inUneditable(node,inside){for(let cur=node;cur&&cur!=inside;cur=cur.assignedSlot||cur.parentNode)if(1==cur.nodeType&&"false"==cur.contentEditable)return!0;return!1}function touchesComposition(changes,composition){let touched=!1;return composition&&changes.iterChangedRanges((from,to)=>{from<composition.to&&to>composition.from&&(touched=!0)}),touched}function groupAt(state$1,pos,bias=1){let categorize=state$1.charCategorizer(pos),line=state$1.doc.lineAt(pos),linePos=pos-line.from;if(0==line.length)return state.EditorSelection.cursor(pos);0==linePos?bias=1:linePos==line.length&&(bias=-1);let from=linePos,to=linePos;0>bias?from=state.findClusterBreak(line.text,linePos,!1):to=state.findClusterBreak(line.text,linePos);let cat=categorize(line.text.slice(from,to));for(;0<from;){let prev=state.findClusterBreak(line.text,from,!1);if(categorize(line.text.slice(prev,from))!=cat)break;from=prev}for(;to<line.length;){let next=state.findClusterBreak(line.text,to);if(categorize(line.text.slice(to,next))!=cat)break;to=next}return state.EditorSelection.range(from+line.from,to+line.from)}function posAtCoordsImprecise(view,contentRect,block,x,y){let into=Math.round((x-contentRect.left)*view.defaultCharacterWidth);if(view.lineWrapping&&block.height>1.5*view.defaultLineHeight){let textHeight=view.viewState.heightOracle.textHeight,line=Math.floor((y-block.top-.5*(view.defaultLineHeight-textHeight))/textHeight);into+=line*view.viewState.heightOracle.lineLength}let content=view.state.sliceDoc(block.from,block.to);return block.from+state.findColumn(content,into,view.state.tabSize)}function blockAt(view,pos,side){let line=view.lineBlockAt(pos);if(Array.isArray(line.type)){let best;for(let l of line.type){if(l.from>pos)break;if(!(l.to<pos)){if(l.from<pos&&l.to>pos)return l;(!best||l.type==exports.BlockType.Text&&(best.type!=l.type||(0>side?l.from<pos:l.to>pos)))&&(best=l)}}return best||line}return line}function moveToLineBoundary(view,start,forward,includeWrap){let line=blockAt(view,start.head,start.assoc||-1),coords=includeWrap&&line.type==exports.BlockType.Text&&(view.lineWrapping||line.widgetLineBreaks)?view.coordsAtPos(0>start.assoc&&start.head>line.from?start.head-1:start.head):null;if(coords){let editorRect=view.dom.getBoundingClientRect(),direction=view.textDirectionAt(line.from),pos=view.posAtCoords({x:forward==(direction==exports.Direction.LTR)?editorRect.right-1:editorRect.left+1,y:(coords.top+coords.bottom)/2});if(null!=pos)return state.EditorSelection.cursor(pos,forward?-1:1)}return state.EditorSelection.cursor(forward?line.to:line.from,forward?-1:1)}function moveByChar(view,start,forward,by){let line=view.state.doc.lineAt(start.head),spans=view.bidiSpans(line),direction=view.textDirectionAt(line.from);for(let cur=start,check=null;;){let next=moveVisually(line,spans,direction,cur,forward),char=movedOver;if(!next){if(line.number==(forward?view.state.doc.lines:1))return cur;char="\n",line=view.state.doc.line(line.number+(forward?1:-1)),spans=view.bidiSpans(line),next=view.visualLineSide(line,!forward)}if(!check){if(!by)return next;check=by(char)}else if(!check(char))return cur;cur=next}}function byGroup(view,pos,start){let categorize=view.state.charCategorizer(pos),cat=categorize(start);return next=>{let nextCat=categorize(next);return cat==state.CharCategory.Space&&(cat=nextCat),cat==nextCat}}function moveVertically(view,start,forward,distance){let startPos=start.head,dir=forward?1:-1;if(startPos==(forward?view.state.doc.length:0))return state.EditorSelection.cursor(startPos,start.assoc);let goal=start.goalColumn,rect=view.contentDOM.getBoundingClientRect(),startCoords=view.coordsAtPos(startPos,start.assoc||((start.empty?forward:start.head==start.from)?1:-1)),docTop=view.documentTop,startY;if(startCoords)null==goal&&(goal=startCoords.left-rect.left),startY=0>dir?startCoords.top:startCoords.bottom;else{let line=view.viewState.lineBlockAt(startPos);null==goal&&(goal=Math.min(rect.right-rect.left,view.defaultCharacterWidth*(startPos-line.from))),startY=(0>dir?line.top:line.bottom)+docTop}let resolvedGoal=rect.left+goal,halfText=view.viewState.heightOracle.textHeight>>1,dist=null!==distance&&void 0!==distance?distance:halfText;for(let scan=0;;scan+=halfText){let y=startY+(dist+scan)*dir,pos=posAtCoords(view,{x:resolvedGoal,y},!1,dir);if(forward?y>rect.bottom:y<rect.top)return state.EditorSelection.cursor(pos.pos,pos.assoc);let posCoords=view.coordsAtPos(pos.pos,pos.assoc),mid=posCoords?(posCoords.top+posCoords.bottom)/2:0;if(!posCoords||(forward?mid>startY:mid<startY))return state.EditorSelection.cursor(pos.pos,pos.assoc,void 0,goal)}}function skipAtomicRanges(atoms,pos,bias){for(;;){let moved=0;for(let set of atoms)set.between(pos-1,pos+1,(from,to,value)=>{if(pos>from&&pos<to){let side=moved||bias||(pos-from<to-pos?-1:1);pos=0>side?from:to,moved=side}});if(!moved)return pos}}function skipAtomsForSelection(atoms,sel){let ranges=null;for(let i=0;i<sel.ranges.length;i++){let range=sel.ranges[i],updated=null;if(range.empty){let pos=skipAtomicRanges(atoms,range.from,0);pos!=range.from&&(updated=state.EditorSelection.cursor(pos,-1))}else{let from=skipAtomicRanges(atoms,range.from,-1),to=skipAtomicRanges(atoms,range.to,1);(from!=range.from||to!=range.to)&&(updated=state.EditorSelection.range(range.from==range.anchor?from:to,range.from==range.head?from:to))}updated&&(!ranges&&(ranges=sel.ranges.slice()),ranges[i]=updated)}return ranges?state.EditorSelection.create(ranges,sel.mainIndex):sel}function skipAtoms(view,oldPos,pos){let newPos=skipAtomicRanges(view.state.facet(atomicRanges).map(f=>f(view)),pos.from,oldPos.head>pos.from?-1:1);return newPos==pos.from?pos:state.EditorSelection.cursor(newPos,newPos<pos.from?1:-1)}function posAtCoords(view,coords,precise,scanY){let content=view.contentDOM.getBoundingClientRect(),docTop=content.top+view.viewState.paddingTop,{x,y}=coords,yOffset=y-docTop,block;// First find the block at the given Y position, if any. If scanY is
// given (used for vertical cursor motion), try to skip widgets and
// line padding.
for(;;){if(0>yOffset)return new PosAssoc(0,1);if(yOffset>view.viewState.docHeight)return new PosAssoc(view.state.doc.length,-1);if(block=view.elementAtHeight(yOffset),null==scanY)break;if(block.type==exports.BlockType.Text){if(0>scanY?block.to<view.viewport.from:block.from>view.viewport.to)break;// Check whether we aren't landing on the top/bottom padding of the line
let rect=view.docView.coordsAt(0>scanY?block.from:block.to,0<scanY?-1:1);if(rect&&(0>scanY?rect.top<=yOffset+docTop:rect.bottom>=yOffset+docTop))break}let halfLine=view.viewState.heightOracle.textHeight/2;yOffset=0<scanY?block.bottom+halfLine:block.top-halfLine}// If outside the viewport, return null if precise==true, an
// estimate otherwise.
if(view.viewport.from>=block.to||view.viewport.to<=block.from){if(precise)return null;if(block.type==exports.BlockType.Text){let pos=posAtCoordsImprecise(view,content,block,x,y);return new PosAssoc(pos,pos==block.from?1:-1)}}if(block.type!=exports.BlockType.Text)return yOffset<(block.top+block.bottom)/2?new PosAssoc(block.from,1):new PosAssoc(block.to,-1);// Here we know we're in a line, so run the logic for inline layout
let line=view.docView.lineAt(block.from,2);return line&&line.length==block.length||(line=view.docView.lineAt(block.from,-2)),new InlineCoordsScan(view,x,y,view.textDirectionAt(block.from)).scanTile(line,block.from)}function isAtEnd(parent,node,offset){for(;;){if(!node||offset<maxOffset(node))return!1;if(node==parent)return!0;offset=domIndex(node)+1,node=node.parentNode}}function isEmptyToEnd(node,end){let widgets;for(;;node=node.nextSibling){if(node==end||!node)break;let view=Tile.get(node);if(null===view||void 0===view||!view.isWidget())return!1;view&&(widgets||(widgets=[])).push(view)}if(widgets)for(let w of widgets){let override=w.overrideDOMText;if(null===override||void 0===override?void 0:override.length)return!1}return!0}function domBoundsAround(tile,from,to,offset){if(tile.isComposite()){let fromI=-1,fromStart=-1,toI=-1,toEnd=-1;for(let i=0,pos=offset,prevEnd=offset;i<tile.children.length;i++){let child=tile.children[i],end=pos+child.length;if(pos<from&&end>to)return domBoundsAround(child,from,to,pos);if(end>=from&&-1==fromI&&(fromI=i,fromStart=pos),pos>to&&child.dom.parentNode==tile.dom){toI=i,toEnd=prevEnd;break}prevEnd=end,pos=end+child.breakAfter}return{from:fromStart,to:0>toEnd?offset+tile.length:toEnd,startDOM:(fromI?tile.children[fromI-1].dom.nextSibling:null)||tile.dom.firstChild,endDOM:toI<tile.children.length&&0<=toI?tile.children[toI].dom:null}}return tile.isText()?{from:offset,to:offset+tile.length,startDOM:tile.dom,endDOM:tile.dom.nextSibling}:null}function applyDOMChange(view,domChange){let{newSel}=domChange,{state:state$1}=view,sel=state$1.selection.main,lastKey=view.inputState.lastKeyTime>Date.now()-100?view.inputState.lastKeyCode:-1,change;if(domChange.bounds){let{from,to}=domChange.bounds,preferredPos=sel.from,preferredSide=null;(8===lastKey||browser.android&&domChange.text.length<to-from)&&(preferredPos=sel.to,preferredSide="end");let cmp=state$1.doc.sliceString(from,to,LineBreakPlaceholder),selEnd,diff;!sel.empty&&sel.from>=from&&sel.to<=to&&(domChange.typeOver||cmp!=domChange.text)&&cmp.slice(0,sel.from-from)==domChange.text.slice(0,sel.from-from)&&cmp.slice(sel.to-from)==domChange.text.slice(selEnd=domChange.text.length-(cmp.length-(sel.to-from)))?change={from:sel.from,to:sel.to,insert:state.Text.of(domChange.text.slice(sel.from-from,selEnd).split(LineBreakPlaceholder))}:(diff=findDiff(cmp,domChange.text,preferredPos-from,preferredSide))&&(browser.chrome&&13==lastKey&&diff.toB==diff.from+2&&"\uFFFF\uFFFF"==domChange.text.slice(diff.from,diff.toB)&&diff.toB--,change={from:from+diff.from,to:from+diff.toA,insert:state.Text.of(domChange.text.slice(diff.from,diff.toB).split(LineBreakPlaceholder))})}else newSel&&(!view.hasFocus&&state$1.facet(editable)||sameSelPos(newSel,sel))&&(newSel=null);if(!change&&!newSel)return!1;if((browser.mac||browser.android)&&change&&change.from==change.to&&change.from==sel.head-1&&/^\. ?$/.test(change.insert.toString())&&"off"==view.contentDOM.getAttribute("autocorrect")?(newSel&&2==change.insert.length&&(newSel=state.EditorSelection.single(newSel.main.anchor-1,newSel.main.head-1)),change={from:change.from,to:change.to,insert:state.Text.of([change.insert.toString().replace("."," ")])}):state$1.doc.lineAt(sel.from).to<sel.to&&view.docView.lineHasWidget(sel.to)&&view.inputState.insertingTextAt>Date.now()-50?change={from:sel.from,to:sel.to,insert:state$1.toText(view.inputState.insertingText)}:browser.chrome&&change&&change.from==change.to&&change.from==sel.head&&"\n "==change.insert.toString()&&view.lineWrapping&&(newSel&&(newSel=state.EditorSelection.single(newSel.main.anchor-1,newSel.main.head-1)),change={from:sel.from,to:sel.to,insert:state.Text.of([" "])}),change)return applyDOMChangeInner(view,change,newSel,lastKey);if(newSel&&!sameSelPos(newSel,sel)){let scrollIntoView=!1,userEvent="select";return view.inputState.lastSelectionTime>Date.now()-50&&("select"==view.inputState.lastSelectionOrigin&&(scrollIntoView=!0),userEvent=view.inputState.lastSelectionOrigin,"select.pointer"==userEvent&&(newSel=skipAtomsForSelection(state$1.facet(atomicRanges).map(f=>f(view)),newSel))),view.dispatch({selection:newSel,scrollIntoView,userEvent}),!0}return!1}function applyDOMChangeInner(view,change,newSel,lastKey=-1){if(browser.ios&&view.inputState.flushIOSKey(change))return!0;let sel=view.state.selection.main;// Android browsers don't fire reasonable key events for enter,
// backspace, or delete. So this detects changes that look like
// they're caused by those keys, and reinterprets them as key
// events. (Some of these keys are also handled by beforeinput
// events and the pendingAndroidKey mechanism, but that's not
// reliable in all situations.)
if(browser.android&&(change.to==sel.to&&(// GBoard will sometimes remove a space it just inserted
// after a completion when you press enter
change.from==sel.from||change.from==sel.from-1&&" "==view.state.sliceDoc(change.from,sel.from))&&1==change.insert.length&&2==change.insert.lines&&dispatchKey(view.contentDOM,"Enter",13)||(change.from==sel.from-1&&change.to==sel.to&&0==change.insert.length||8==lastKey&&change.insert.length<change.to-change.from&&change.to>sel.head)&&dispatchKey(view.contentDOM,"Backspace",8)||change.from==sel.from&&change.to==sel.to+1&&0==change.insert.length&&dispatchKey(view.contentDOM,"Delete",46)))return!0;let text=change.insert.toString();0<=view.inputState.composing&&view.inputState.composing++;let defaultInsert=()=>defaultTr||(defaultTr=applyDefaultInsert(view,change,newSel)),defaultTr;return view.state.facet(inputHandler).some(h=>h(view,change.from,change.to,text,defaultInsert))||view.dispatch(defaultInsert()),!0}function applyDefaultInsert(view,change,newSel){let startState=view.state,sel=startState.selection.main,inAtomic=-1,tr;if(change.from==change.to&&change.from<sel.from||change.from>sel.to){let side=change.from<sel.from?-1:1,pos=0>side?sel.from:sel.to,moved=skipAtomicRanges(startState.facet(atomicRanges).map(f=>f(view)),pos,side);change.from==moved&&(inAtomic=moved)}if(-1<inAtomic)tr={changes:change,selection:state.EditorSelection.cursor(change.from+change.insert.length,-1)};else if(change.from>=sel.from&&change.to<=sel.to&&change.to-change.from>=(sel.to-sel.from)/3&&(!newSel||newSel.main.empty&&newSel.main.from==change.from+change.insert.length)&&0>view.inputState.composing){let before=sel.from<change.from?startState.sliceDoc(sel.from,change.from):"",after=sel.to>change.to?startState.sliceDoc(change.to,sel.to):"";tr=startState.replaceSelection(view.state.toText(before+change.insert.sliceString(0,void 0,view.state.lineBreak)+after))}else{let changes=startState.changes(change),mainSel=newSel&&newSel.main.to<=changes.newLength?newSel.main:void 0;// Try to apply a composition change to all cursors
if(1<startState.selection.ranges.length&&(0<=view.inputState.composing||view.inputState.compositionPendingChange)&&change.to<=sel.to+10&&change.to>=sel.to-10){let replaced=view.state.sliceDoc(change.from,change.to),composition=newSel&&findCompositionNode(view,newSel.main.head),compositionRange;if(composition){let dLen=change.insert.length-(change.to-change.from);compositionRange={from:composition.from,to:composition.to-dLen}}else compositionRange=view.state.doc.lineAt(sel.head);let offset=sel.to-change.to;tr=startState.changeByRange(range=>{if(range.from==sel.from&&range.to==sel.to)return{changes,range:mainSel||range.map(changes)};let to=range.to-offset,from=to-replaced.length;if(view.state.sliceDoc(from,to)!=replaced||// Unfortunately, there's no way to make multiple
// changes in the same node work without aborting
// composition, so cursors in the composition range are
// ignored.
to>=compositionRange.from&&from<=compositionRange.to)return{range};let rangeChanges=startState.changes({from,to,insert:change.insert}),selOff=range.to-sel.to;return{changes:rangeChanges,range:mainSel?state.EditorSelection.range(Math.max(0,mainSel.anchor+selOff),Math.max(0,mainSel.head+selOff)):range.map(rangeChanges)}})}else tr={changes,selection:mainSel&&startState.selection.replaceRange(mainSel)}}let userEvent="input.type";return(view.composing||view.inputState.compositionPendingChange&&view.inputState.compositionEndedAt>Date.now()-50)&&(view.inputState.compositionPendingChange=!1,userEvent+=".compose",view.inputState.compositionFirstChange&&(userEvent+=".start",view.inputState.compositionFirstChange=!1)),startState.update(tr,{userEvent,scrollIntoView:!0})}function findDiff(a,b,preferredPos,preferredSide){let minLen=Math.min(a.length,b.length),from=0;for(;from<minLen&&a.charCodeAt(from)==b.charCodeAt(from);)from++;if(from==minLen&&a.length==b.length)return null;let toA=a.length,toB=b.length;for(;0<toA&&0<toB&&a.charCodeAt(toA-1)==b.charCodeAt(toB-1);)toA--,toB--;if("end"==preferredSide){let adjust=Math.max(0,from-Math.min(toA,toB));preferredPos-=toA+adjust-from}if(toA<from&&a.length<b.length){let move=preferredPos<=from&&preferredPos>=toA?from-preferredPos:0;from-=move,toB=from+(toB-toA),toA=from}else if(toB<from){let move=preferredPos<=from&&preferredPos>=toB?from-preferredPos:0;from-=move,toA=from+(toA-toB),toB=from}return{from,toA,toB}}function selectionPoints(view){let result=[];if(view.root.activeElement!=view.contentDOM)return result;let{anchorNode,anchorOffset,focusNode,focusOffset}=view.observer.selectionRange;return anchorNode&&(result.push(new DOMPoint(anchorNode,anchorOffset)),(focusNode!=anchorNode||focusOffset!=anchorOffset)&&result.push(new DOMPoint(focusNode,focusOffset))),result}function selectionFromPoints(points,base){if(0==points.length)return null;let anchor=points[0].pos,head=2==points.length?points[1].pos:anchor;return-1<anchor&&-1<head?state.EditorSelection.single(anchor+base,head+base):null}function sameSelPos(selection,range){return range.head==selection.main.head&&range.anchor==selection.main.anchor}function bindHandler(plugin,handler){return(view,event)=>{try{return handler.call(plugin,event,view)}catch(e){logException(view.state,e)}}}function computeHandlers(plugins){function record(type){return result[type]||(result[type]={observers:[],handlers:[]})}let result=Object.create(null);for(let plugin of plugins){let spec=plugin.spec,handlers=spec&&spec.plugin.domEventHandlers,observers=spec&&spec.plugin.domEventObservers;if(handlers)for(let type in handlers){let f=handlers[type];f&&record(type).handlers.push(bindHandler(plugin.value,f))}if(observers)for(let type in observers){let f=observers[type];f&&record(type).observers.push(bindHandler(plugin.value,f))}}for(let type in handlers)record(type).handlers.push(handlers[type]);for(let type in observers)record(type).observers.push(observers[type]);return result}function dragScrollSpeed(dist){return .7*Math.max(0,dist)+8}function dist(a,b){return Math.max(Math.abs(a.clientX-b.clientX),Math.abs(a.clientY-b.clientY))}function addsSelectionRange(view,event){let facet=view.state.facet(clickAddsSelectionRange);return facet.length?facet[0](event):browser.mac?event.metaKey:event.ctrlKey}function dragMovesSelection(view,event){let facet=view.state.facet(dragMovesSelection$1);return facet.length?facet[0](event):browser.mac?!event.altKey:!event.ctrlKey}function isInPrimarySelection(view,event){let{main}=view.state.selection;if(main.empty)return!1;// On boundary clicks, check whether the coordinates are inside the
// selection's client rectangles
let sel=getSelection(view.root);if(!sel||0==sel.rangeCount)return!0;let rects=sel.getRangeAt(0).getClientRects();for(let i=0,rect;i<rects.length;i++)if(rect=rects[i],rect.left<=event.clientX&&rect.right>=event.clientX&&rect.top<=event.clientY&&rect.bottom>=event.clientY)return!0;return!1}function eventBelongsToEditor(view,event){if(!event.bubbles)return!0;if(event.defaultPrevented)return!1;for(let node=event.target,tile;node!=view.contentDOM;node=node.parentNode)if(!node||11==node.nodeType||(tile=Tile.get(node))&&tile.isWidget()&&!tile.isHidden&&tile.widget.ignoreEvent(event))return!1;return!0}function capturePaste(view){let parent=view.dom.parentNode;if(!parent)return;let target=parent.appendChild(document.createElement("textarea"));target.style.cssText="position: fixed; left: -10000px; top: 10px",target.focus(),setTimeout(()=>{view.focus(),target.remove(),doPaste(view,target.value)},50)}function textFilter(state,facet,text){for(let filter of state.facet(facet))text=filter(text,state);return text}function doPaste(view,input){input=textFilter(view.state,clipboardInputFilter,input);let{state:state$1}=view,i=1,text=state$1.toText(input),byLine=text.lines==state$1.selection.ranges.length,linewise=null!=lastLinewiseCopy&&state$1.selection.ranges.every(r=>r.empty)&&lastLinewiseCopy==text.toString(),changes;if(linewise){let lastLine=-1;changes=state$1.changeByRange(range=>{let line=state$1.doc.lineAt(range.from);if(line.from==lastLine)return{range};lastLine=line.from;let insert=state$1.toText((byLine?text.line(i++).text:input)+state$1.lineBreak);return{changes:{from:line.from,insert},range:state.EditorSelection.cursor(range.from+insert.length)}})}else changes=byLine?state$1.changeByRange(range=>{let line=text.line(i++);return{changes:{from:range.from,to:range.to,insert:line.text},range:state.EditorSelection.cursor(range.from+line.length)}}):state$1.replaceSelection(text);view.dispatch(changes,{userEvent:"input.paste",scrollIntoView:!0})}function rangeForClick(view,pos,bias,type){if(1==type)// Single click
return state.EditorSelection.cursor(pos,bias);if(2==type)// Double click
return groupAt(view.state,pos,bias);else{// Triple click
let visual=view.docView.lineAt(pos,bias),line=view.state.doc.lineAt(visual?visual.posAtEnd:pos),from=visual?visual.posAtStart:line.from,to=visual?visual.posAtEnd:line.to;return to<view.state.doc.length&&to==line.to&&to++,state.EditorSelection.range(from,to)}}function getClickType(event){if(!BadMouseDetail)return event.detail;let last=lastMouseDown,lastTime=lastMouseDownTime;return lastMouseDown=event,lastMouseDownTime=Date.now(),lastMouseDownCount=!last||lastTime>Date.now()-400&&2>Math.abs(last.clientX-event.clientX)&&2>Math.abs(last.clientY-event.clientY)?(lastMouseDownCount+1)%3:1}function basicMouseSelection(view,event){let start=view.posAndSideAtCoords({x:event.clientX,y:event.clientY},!1),type=getClickType(event),startSel=view.state.selection;return{update(update){update.docChanged&&(start.pos=update.changes.mapPos(start.pos),startSel=startSel.map(update.changes))},get(event,extend,multiple){let cur=view.posAndSideAtCoords({x:event.clientX,y:event.clientY},!1),range=rangeForClick(view,cur.pos,cur.assoc,type),removed;if(start.pos!=cur.pos&&!extend){let startRange=rangeForClick(view,start.pos,start.assoc,type),from=Math.min(startRange.from,range.from),to=Math.max(startRange.to,range.to);range=from<range.from?state.EditorSelection.range(from,to,range.assoc):state.EditorSelection.range(to,from,range.assoc)}return extend?startSel.replaceRange(startSel.main.extend(range.from,range.to,range.assoc)):multiple&&1==type&&1<startSel.ranges.length&&(removed=removeRangeAround(startSel,cur.pos))?removed:multiple?startSel.addRange(range):state.EditorSelection.create([range])}}}function removeRangeAround(sel,pos){for(let i=0;i<sel.ranges.length;i++){let{from,to}=sel.ranges[i];if(from<=pos&&to>=pos)return state.EditorSelection.create(sel.ranges.slice(0,i).concat(sel.ranges.slice(i+1)),sel.mainIndex==i?0:sel.mainIndex-(sel.mainIndex>i?1:0))}return null}function dropText(view,event,text,direct){if(text=textFilter(view.state,clipboardInputFilter,text),!text)return;let dropPos=view.posAtCoords({x:event.clientX,y:event.clientY},!1),{draggedContent}=view.inputState,del=direct&&draggedContent&&dragMovesSelection(view,event)?{from:draggedContent.from,to:draggedContent.to}:null,ins={from:dropPos,insert:text},changes=view.state.changes(del?[del,ins]:ins);view.focus(),view.dispatch({changes,selection:{anchor:changes.mapPos(dropPos,-1),head:changes.mapPos(dropPos,1)},userEvent:del?"move.drop":"input.drop"}),view.inputState.draggedContent=null}function captureCopy(view,text){// The extra wrapper is somehow necessary on IE/Edge to prevent the
// content from being mangled when it is put onto the clipboard
let parent=view.dom.parentNode;if(!parent)return;let target=parent.appendChild(document.createElement("textarea"));target.style.cssText="position: fixed; left: -10000px; top: 10px",target.value=text,target.focus(),target.selectionEnd=text.length,target.selectionStart=0,setTimeout(()=>{target.remove(),view.focus()},50)}function copiedRange(state){let content=[],ranges=[],linewise=!1;for(let range of state.selection.ranges)range.empty||(content.push(state.sliceDoc(range.from,range.to)),ranges.push(range));if(!content.length){// Nothing selected, do a line-wise copy
let upto=-1;for(let{from}of state.selection.ranges){let line=state.doc.lineAt(from);line.number>upto&&(content.push(line.text),ranges.push({from:line.from,to:Math.min(state.doc.length,line.to+1)})),upto=line.number}linewise=!0}return{text:textFilter(state,clipboardOutputFilter,content.join(state.lineBreak)),ranges,linewise}}function focusChangeTransaction(state,focus){let effects=[];for(let getEffect of state.facet(focusChangeEffect)){let effect=getEffect(state,focus);effect&&effects.push(effect)}return effects.length?state.update({effects,annotations:isFocusChange.of(!0)}):null}function updateForFocusChange(view){setTimeout(()=>{let focus=view.hasFocus;if(focus!=view.inputState.notifiedFocused){let tr=focusChangeTransaction(view.state,focus);tr?view.dispatch(tr):view.update([])}},10)}// In Firefox, when cut/copy handlers are added to the document, that
// somehow avoids a bug where those events aren't fired when the
// selection is empty. See issue #1082 and
// https://bugzilla.mozilla.org/show_bug.cgi?id=995961
function firefoxCopyCutHack(doc){appliedFirefoxHack.has(doc)||(appliedFirefoxHack.add(doc),doc.addEventListener("copy",()=>{}),doc.addEventListener("cut",()=>{}))}function clearHeightChangeFlag(){heightChangeFlag=!1}function replace(old,val){return old==val?old:(old.constructor!=val.constructor&&(heightChangeFlag=!0),val)}function mergeGaps(nodes,around){let before,after;null==nodes[around]&&(before=nodes[around-1])instanceof HeightMapGap&&(after=nodes[around+1])instanceof HeightMapGap&&nodes.splice(around-1,3,new HeightMapGap(before.length+1+after.length))}function heightRelevantDecoChanges(a,b,diff){let comp=new DecorationComparator;return state.RangeSet.compare(a,b,diff,comp,0),comp.changes}function visiblePixelRange(dom,paddingTop){let rect=dom.getBoundingClientRect(),doc=dom.ownerDocument,win=doc.defaultView||window,left=Math.max(0,rect.left),right=Math.min(win.innerWidth,rect.right),top=Math.max(0,rect.top),bottom=Math.min(win.innerHeight,rect.bottom);for(let parent=dom.parentNode;parent&&parent!=doc.body;)if(1==parent.nodeType){let elt=parent,style=window.getComputedStyle(elt);if((elt.scrollHeight>elt.clientHeight||elt.scrollWidth>elt.clientWidth)&&"visible"!=style.overflow){let parentRect=elt.getBoundingClientRect();left=Math.max(left,parentRect.left),right=Math.min(right,parentRect.right),top=Math.max(top,parentRect.top),bottom=Math.min(parent==dom.parentNode?win.innerHeight:bottom,parentRect.bottom)}parent="absolute"==style.position||"fixed"==style.position?elt.offsetParent:elt.parentNode}else if(11==parent.nodeType)// Shadow root
parent=parent.host;else break;return{left:left-rect.left,right:Math.max(left,right)-rect.left,top:top-(rect.top+paddingTop),bottom:Math.max(top,bottom)-(rect.top+paddingTop)}}function inWindow(elt){let rect=elt.getBoundingClientRect(),win=elt.ownerDocument.defaultView||window;return rect.left<win.innerWidth&&0<rect.right&&rect.top<win.innerHeight&&0<rect.bottom}function fullPixelRange(dom,paddingTop){let rect=dom.getBoundingClientRect();return{left:0,right:rect.right-rect.left,top:paddingTop,bottom:rect.bottom-(rect.top+paddingTop)}}// Line gaps are placeholder widgets used to hide pieces of overlong
// lines within the viewport, as a kludge to keep the editor
// responsive when a ridiculously long line is loaded into it.
function lineStructure(from,to,stateDeco){let ranges=[],pos=from,total=0;return state.RangeSet.spans(stateDeco,from,to,{span(){},point(from,to){from>pos&&(ranges.push({from:pos,to:from}),total+=from-pos),pos=to}},20),pos<to&&(ranges.push({from:pos,to}),total+=to-pos),{total,ranges}}function findPosition({total,ranges},ratio){if(0>=ratio)return ranges[0].from;if(1<=ratio)return ranges[ranges.length-1].to;let dist=Math.floor(total*ratio);for(let i=0;;i++){let{from,to}=ranges[i],size=to-from;if(dist<=size)return from+dist;dist-=size}}function findFraction(structure,pos){let counted=0;for(let{from,to}of structure.ranges){if(pos<=to){counted+=pos-from;break}counted+=to-from}return counted/structure.total}function find(array,f){for(let val of array)if(f(val))return val}// Don't scale when the document height is within the range of what
// the DOM can handle.
function staticDeco(state$1){let deco=state$1.facet(decorations).filter(d=>"function"!=typeof d),outer=state$1.facet(outerDecorations).filter(d=>"function"!=typeof d);return outer.length&&deco.push(state.RangeSet.join(outer)),deco}// When the height is too big (> VP.MaxDOMHeight), scale down the
// regions outside the viewports so that the total height is
// VP.MaxDOMHeight.
function scaleBlock(block,scaler){if(1==scaler.scale)return block;let bTop=scaler.toDOM(block.top),bBottom=scaler.toDOM(block.bottom);return new BlockInfo(block.from,block.length,bTop,bBottom-bTop,Array.isArray(block._content)?block._content.map(b=>scaleBlock(b,scaler)):block._content)}function buildTheme(main,spec,scopes){return new styleMod.StyleModule(spec,{finish(sel){return /&/.test(sel)?sel.replace(/&\w*/,m=>{if("&"==m)return main;if(!scopes||!scopes[m])throw new RangeError(`Unsupported selector: ${m}`);return scopes[m]}):main+" "+sel}})}function findChild(tile,dom,dir){for(;dom;){let curTile=Tile.get(dom);if(curTile&&curTile.parent==tile)return curTile;let parent=dom.parentNode;dom=parent==tile.dom?0<dir?dom.nextSibling:dom.previousSibling:parent}return null}function buildSelectionRangeFromRange(view,range){let anchorNode=range.startContainer,anchorOffset=range.startOffset,focusNode=range.endContainer,focusOffset=range.endOffset,curAnchor=view.docView.domAtPos(view.state.selection.main.anchor,1);// Since such a range doesn't distinguish between anchor and head,
// use a heuristic that flips it around if its end matches the
// current anchor.
return isEquivalentPosition(curAnchor.node,curAnchor.offset,focusNode,focusOffset)&&([anchorNode,anchorOffset,focusNode,focusOffset]=[focusNode,focusOffset,anchorNode,anchorOffset]),{anchorNode,anchorOffset,focusNode,focusOffset}}// Used to work around a Safari Selection/shadow DOM bug (#414)
function safariSelectionRangeHack(view,selection){// Because Safari (at least in 2018-2021) doesn't provide regular
// access to the selection inside a shadowroot, we have to perform a
// ridiculous hack to get at it—using `execCommand` to trigger a
// `beforeInput` event so that we can read the target range from the
// event.
function read(event){event.preventDefault(),event.stopImmediatePropagation(),found=event.getTargetRanges()[0]}if(selection.getComposedRanges){let range=selection.getComposedRanges(view.root)[0];if(range)return buildSelectionRangeFromRange(view,range)}let found=null;return view.contentDOM.addEventListener("beforeinput",read,!0),view.dom.ownerDocument.execCommand("indent"),view.contentDOM.removeEventListener("beforeinput",read,!0),found?buildSelectionRangeFromRange(view,found):null}function attrsFromFacet(view,facet,base){for(let sources=view.state.facet(facet),i=sources.length-1;0<=i;i--){let source=sources[i],value="function"==typeof source?source(view):source;value&&combineAttrs(value,base)}return base}function normalizeKeyName(name,platform){const parts=name.split(/-(?!$)/);let result=parts[parts.length-1];"Space"==result&&(result=" ");let alt,ctrl,shift,meta;for(let i=0;i<parts.length-1;++i){const mod=parts[i];if(/^(cmd|meta|m)$/i.test(mod))meta=!0;else if(/^a(lt)?$/i.test(mod))alt=!0;else if(/^(c|ctrl|control)$/i.test(mod))ctrl=!0;else if(/^s(hift)?$/i.test(mod))shift=!0;else if(/^mod$/i.test(mod))"mac"==platform?meta=!0:ctrl=!0;else throw new Error("Unrecognized modifier name: "+mod)}return alt&&(result="Alt-"+result),ctrl&&(result="Ctrl-"+result),meta&&(result="Meta-"+result),shift&&(result="Shift-"+result),result}function modifiers(name,event,shift){return event.altKey&&(name="Alt-"+name),event.ctrlKey&&(name="Ctrl-"+name),event.metaKey&&(name="Meta-"+name),!1!==shift&&event.shiftKey&&(name="Shift-"+name),name}// This is hidden behind an indirection, rather than directly computed
// by the facet, to keep internal types out of the facet's type.
function getKeymap(state){let bindings=state.facet(keymap),map=Keymaps.get(bindings);return map||Keymaps.set(bindings,map=buildKeymap(bindings.reduce((a,b)=>a.concat(b),[]))),map}/**
		Run the key handlers registered for a given scope. The event
		object should be a `"keydown"` event. Returns true if any of the
		handlers handled it.
		*/function runScopeHandlers(view,event,scope){return runHandlers(getKeymap(view.state),event,view,scope)}function buildKeymap(bindings,platform=currentPlatform){let bound=Object.create(null),isPrefix=Object.create(null),checkPrefix=(name,is)=>{let current=isPrefix[name];if(null==current)isPrefix[name]=is;else if(current!=is)throw new Error("Key binding "+name+" is used both as a regular binding and as a multi-stroke prefix")},add=(scope,key,command,preventDefault,stopPropagation)=>{var _a,_b;let scopeObj=bound[scope]||(bound[scope]=Object.create(null)),parts=key.split(/ (?!$)/).map(k=>normalizeKeyName(k,platform));for(let i=1,prefix;i<parts.length;i++)prefix=parts.slice(0,i).join(" "),checkPrefix(prefix,!0),scopeObj[prefix]||(scopeObj[prefix]={preventDefault:!0,stopPropagation:!1,run:[view=>{let ourObj=storedPrefix={view,prefix,scope};return setTimeout(()=>{storedPrefix==ourObj&&(storedPrefix=null)},PrefixTimeout),!0}]});let full=parts.join(" ");checkPrefix(full,!1);let binding=scopeObj[full]||(scopeObj[full]={preventDefault:!1,stopPropagation:!1,run:(null===(_b=null===(_a=scopeObj._any)||void 0===_a?void 0:_a.run)||void 0===_b?void 0:_b.slice())||[]});command&&binding.run.push(command),preventDefault&&(binding.preventDefault=!0),stopPropagation&&(binding.stopPropagation=!0)};for(let b of bindings){let scopes=b.scope?b.scope.split(" "):["editor"];if(b.any)for(let scope of scopes){let scopeObj=bound[scope]||(bound[scope]=Object.create(null));scopeObj._any||(scopeObj._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any}=b;for(let key in scopeObj)scopeObj[key].run.push(view=>any(view,currentKeyEvent))}let name=b[platform]||b.key;if(name)for(let scope of scopes)add(scope,name,b.run,b.preventDefault,b.stopPropagation),b.shift&&add(scope,"Shift-"+name,b.shift,b.preventDefault,b.stopPropagation)}return bound}function runHandlers(map,event,view,scope){currentKeyEvent=event;let name=w3cKeyname.keyName(event),charCode=state.codePointAt(name,0),isChar=state.codePointSize(charCode)==name.length&&" "!=name,prefix="",handled=!1,prevented=!1,stopPropagation=!1;storedPrefix&&storedPrefix.view==view&&storedPrefix.scope==scope&&(prefix=storedPrefix.prefix+" ",0>modifierCodes.indexOf(event.keyCode)&&(prevented=!0,storedPrefix=null));let ran=new Set,runFor=binding=>{if(binding){for(let cmd of binding.run)if(!ran.has(cmd)&&(ran.add(cmd),cmd(view)))return binding.stopPropagation&&(stopPropagation=!0),!0;binding.preventDefault&&(binding.stopPropagation&&(stopPropagation=!0),prevented=!0)}return!1},scopeObj=map[scope],baseName,shiftName;return scopeObj&&(runFor(scopeObj[prefix+modifiers(name,event,!isChar)])?handled=!0:isChar&&(event.altKey||event.metaKey||event.ctrlKey)&&// Ctrl-Alt may be used for AltGr on Windows
!(browser.windows&&event.ctrlKey&&event.altKey)&&// Alt-combinations on macOS tend to be typed characters
!(browser.mac&&event.altKey&&!(event.ctrlKey||event.metaKey))&&(baseName=w3cKeyname.base[event.keyCode])&&baseName!=name?runFor(scopeObj[prefix+modifiers(baseName,event,!0)])?handled=!0:event.shiftKey&&(shiftName=w3cKeyname.shift[event.keyCode])!=name&&shiftName!=baseName&&runFor(scopeObj[prefix+modifiers(shiftName,event,!1)])&&(handled=!0):isChar&&event.shiftKey&&runFor(scopeObj[prefix+modifiers(name,event,!0)])&&(handled=!0),!handled&&runFor(scopeObj._any)&&(handled=!0)),prevented&&(handled=!0),handled&&stopPropagation&&event.stopPropagation(),currentKeyEvent=null,handled}/**
		Implementation of [`LayerMarker`](https://codemirror.net/6/docs/ref/#view.LayerMarker) that creates
		a rectangle at a given set of coordinates.
		*/function getBase(view){let rect=view.scrollDOM.getBoundingClientRect(),left=view.textDirection==exports.Direction.LTR?rect.left:rect.right-view.scrollDOM.clientWidth*view.scaleX;return{left:left-view.scrollDOM.scrollLeft*view.scaleX,top:rect.top-view.scrollDOM.scrollTop*view.scaleY}}function wrappedLine(view,pos,side,inside){let coords=view.coordsAtPos(pos,2*side);if(!coords)return inside;let editorRect=view.dom.getBoundingClientRect(),y=(coords.top+coords.bottom)/2,left=view.posAtCoords({x:editorRect.left+1,y}),right=view.posAtCoords({x:editorRect.right-1,y});return null==left||null==right?inside:{from:Math.max(inside.from,Math.min(left,right)),to:Math.min(inside.to,Math.max(left,right))}}function rectanglesForRange(view,className,range){function piece(left,top,right,bottom){return new RectangleMarker(className,left-base.left,top-base.top,Math.max(0,right-left),bottom-top)}function pieces({top,bottom,horizontal}){let pieces=[];for(let i=0;i<horizontal.length;i+=2)pieces.push(piece(horizontal[i],top,horizontal[i+1],bottom));return pieces}// Gets passed from/to in line-local positions
function drawForLine(from,to,line){function addSpan(from,fromOpen,to,toOpen,dir){// Passing 2/-2 is a kludge to force the view to return
// coordinates on the proper side of block widgets, since
// normalizing the side there, though appropriate for most
// coordsAtPos queries, would break selection drawing.
let fromCoords=view.coordsAtPos(from,from==line.to?-2:2),toCoords=view.coordsAtPos(to,to==line.from?2:-2);fromCoords&&toCoords&&(top=Math.min(fromCoords.top,toCoords.top,top),bottom=Math.max(fromCoords.bottom,toCoords.bottom,bottom),dir==exports.Direction.LTR?horizontal.push(ltr&&fromOpen?leftSide:fromCoords.left,ltr&&toOpen?rightSide:toCoords.right):horizontal.push(!ltr&&toOpen?leftSide:toCoords.left,!ltr&&fromOpen?rightSide:fromCoords.right))}let top=1e9,bottom=-1e9,horizontal=[],start=null!==from&&void 0!==from?from:line.from,end=null!==to&&void 0!==to?to:line.to;// Split the range by visible range and document line
for(let r of view.visibleRanges)if(r.to>start&&r.from<end)for(let pos=Math.max(r.from,start),endPos=Math.min(r.to,end),docLine;;){docLine=view.state.doc.lineAt(pos);for(let span of view.bidiSpans(docLine)){let spanFrom=span.from+docLine.from,spanTo=span.to+docLine.from;if(spanFrom>=endPos)break;spanTo>pos&&addSpan(Math.max(spanFrom,pos),null==from&&spanFrom<=start,Math.min(spanTo,endPos),null==to&&spanTo>=end,span.dir)}if(pos=docLine.to+1,pos>=endPos)break}return 0==horizontal.length&&addSpan(start,null==from,end,null==to,view.textDirection),{top,bottom,horizontal}}function drawForWidget(block,top){let y=contentRect.top+(top?block.top:block.bottom);return{top:y,bottom:y,horizontal:[]}}if(range.to<=view.viewport.from||range.from>=view.viewport.to)return[];let from=Math.max(range.from,view.viewport.from),to=Math.min(range.to,view.viewport.to),ltr=view.textDirection==exports.Direction.LTR,content=view.contentDOM,contentRect=content.getBoundingClientRect(),base=getBase(view),lineElt=content.querySelector(".cm-line"),lineStyle=lineElt&&window.getComputedStyle(lineElt),leftSide=contentRect.left+(lineStyle?parseInt(lineStyle.paddingLeft)+Math.min(0,parseInt(lineStyle.textIndent)):0),rightSide=contentRect.right-(lineStyle?parseInt(lineStyle.paddingRight):0),startBlock=blockAt(view,from,1),endBlock=blockAt(view,to,-1),visualStart=startBlock.type==exports.BlockType.Text?startBlock:null,visualEnd=endBlock.type==exports.BlockType.Text?endBlock:null;if(visualStart&&(view.lineWrapping||startBlock.widgetLineBreaks)&&(visualStart=wrappedLine(view,from,1,visualStart)),visualEnd&&(view.lineWrapping||endBlock.widgetLineBreaks)&&(visualEnd=wrappedLine(view,to,-1,visualEnd)),visualStart&&visualEnd&&visualStart.from==visualEnd.from&&visualStart.to==visualEnd.to)return pieces(drawForLine(range.from,range.to,visualStart));else{let top=visualStart?drawForLine(range.from,null,visualStart):drawForWidget(startBlock,!1),bottom=visualEnd?drawForLine(null,range.to,visualEnd):drawForWidget(endBlock,!0),between=[];return(visualStart||startBlock).to<(visualEnd||endBlock).from-(visualStart&&visualEnd?1:0)||1<startBlock.widgetLineBreaks&&top.bottom+view.defaultLineHeight/2<bottom.top?between.push(piece(leftSide,top.bottom,rightSide,bottom.top)):top.bottom<bottom.top&&view.elementAtHeight((top.bottom+bottom.top)/2).type==exports.BlockType.Text&&(top.bottom=bottom.top=(top.bottom+bottom.top)/2),pieces(top).concat(between).concat(pieces(bottom))}}function sameMarker(a,b){return a.constructor==b.constructor&&a.eq(b)}/**
		Define a layer.
		*/function layer(config){return[ViewPlugin.define(v=>new LayerView(v,config)),layerOrder.of(config)]}/**
		Returns an extension that hides the browser's native selection and
		cursor, replacing the selection with a background behind the text
		(with the `cm-selectionBackground` class), and the
		cursors with elements overlaid over the code (using
		`cm-cursor-primary` and `cm-cursor-secondary`).

		This allows the editor to display secondary selection ranges, and
		tends to produce a type of selection more in line with that users
		expect in a text editor (the native selection styling will often
		leave gaps between lines and won't fill the horizontal space after
		a line when the selection continues past it).

		It does have a performance cost, in that it requires an extra DOM
		layout cycle for many updates (the selection is drawn based on DOM
		layout information that's only available after laying out the
		content).
		*/function drawSelection(config={}){return[selectionConfig.of(config),cursorLayer,selectionLayer,hideNativeSelection,nativeSelectionHidden.of(!0)]}/**
		Retrieve the [`drawSelection`](https://codemirror.net/6/docs/ref/#view.drawSelection) configuration
		for this state. (Note that this will return a set of defaults even
		if `drawSelection` isn't enabled.)
		*/function getDrawSelectionConfig(state){return state.facet(selectionConfig)}function configChanged(update){return update.startState.facet(selectionConfig)!=update.state.facet(selectionConfig)}function setBlinkRate(state,dom){dom.style.animationDuration=state.facet(selectionConfig).cursorBlinkRate+"ms"}/**
		Draws a cursor at the current drop position when something is
		dragged over the editor.
		*/function dropCursor(){return[dropCursorPos,drawDropCursor]}function iterMatches(doc,re,from,to,f){re.lastIndex=0;for(let cursor=doc.iterRange(from,to),pos=from,m;!cursor.next().done;pos+=cursor.value.length)if(!cursor.lineBreak)for(;m=re.exec(cursor.value);)f(pos+m.index,m)}function matchRanges(view,maxLength){let visible=view.visibleRanges;if(1==visible.length&&visible[0].from==view.viewport.from&&visible[0].to==view.viewport.to)return visible;let result=[];for(let{from,to}of visible)from=Math.max(view.state.doc.lineAt(from).from,from-maxLength),to=Math.min(view.state.doc.lineAt(to).to,to+maxLength),result.length&&result[result.length-1].to>=from?result[result.length-1].to=to:result.push({from,to});return result}/**
		Helper class used to make it easier to maintain decorations on
		visible code that matches a given regular expression. To be used
		in a [view plugin](https://codemirror.net/6/docs/ref/#view.ViewPlugin). Instances of this object
		represent a matching configuration.
		*/function supportsTabSize(){var _a;if(null==_supportsTabSize&&"undefined"!=typeof document&&document.body){let styles=document.body.style;_supportsTabSize=null!=(null!==(_a=styles.tabSize)&&void 0!==_a?_a:styles.MozTabSize)}return _supportsTabSize||!1}/**
		Returns an extension that installs highlighting of special
		characters.
		*/function highlightSpecialChars(/**
		Configuration options.
		*/config={}){return[specialCharConfig.of(config),specialCharPlugin()]}function specialCharPlugin(){return _plugin||(_plugin=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.decorations=Decoration.none,this.decorationCache=Object.create(null),this.decorator=this.makeDecorator(view.state.facet(specialCharConfig)),this.decorations=this.decorator.createDeco(view)}makeDecorator(conf){return new MatchDecorator({regexp:conf.specialChars,decoration:(m,view,pos)=>{let{doc}=view.state,code=state.codePointAt(m[0],0);if(9==code){let line=doc.lineAt(pos),size=view.state.tabSize,col=state.countColumn(line.text,size,pos-line.from);return Decoration.replace({widget:new TabWidget((size-col%size)*this.view.defaultCharacterWidth/this.view.scaleX)})}return this.decorationCache[code]||(this.decorationCache[code]=Decoration.replace({widget:new SpecialCharWidget(conf,code)}))},boundary:conf.replaceTabs?void 0:/[^]/})}update(update){let conf=update.state.facet(specialCharConfig);update.startState.facet(specialCharConfig)==conf?this.decorations=this.decorator.updateDeco(update,this.decorations):(this.decorator=this.makeDecorator(conf),this.decorations=this.decorator.createDeco(update.view))}},{decorations:v=>v.decorations}))}// Assigns placeholder characters from the Control Pictures block to
// ASCII control characters
function placeholder$1(code){return 32<=code?"\u2022":10==code?"\u2424":String.fromCharCode(9216+code)}/**
		Returns an extension that makes sure the content has a bottom
		margin equivalent to the height of the editor, minus one line
		height, so that every line in the document can be scrolled to the
		top of the editor.

		This is only meaningful when the editor is scrollable, and should
		not be enabled in editors that take the size of their content.
		*/function scrollPastEnd(){return[plugin,contentAttributes.of(view=>{var _a;return(null===(_a=view.plugin(plugin))||void 0===_a?void 0:_a.attrs)||null})]}/**
		Mark lines that have a cursor on them with the `"cm-activeLine"`
		DOM class.
		*/function highlightActiveLine(){return activeLineHighlighter}/**
		Extension that enables a placeholder—a piece of example content
		to show when the editor is empty.
		*/function placeholder(content){let plugin=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.placeholder=content?Decoration.set([Decoration.widget({widget:new Placeholder(content),side:1}).range(0)]):Decoration.none}get decorations(){return this.view.state.doc.length?Decoration.none:this.placeholder}},{decorations:v=>v.decorations});return"string"==typeof content?[plugin,EditorView.contentAttributes.of({"aria-placeholder":content})]:plugin}// Don't compute precise column positions for line offsets above this
// (since it could get expensive). Assume offset==column for them.
function rectangleFor(state$1,a,b){let startLine=Math.min(a.line,b.line),endLine=Math.max(a.line,b.line),ranges=[];if(a.off>MaxOff||b.off>MaxOff||0>a.col||0>b.col){let startOff=Math.min(a.off,b.off),endOff=Math.max(a.off,b.off);for(let i=startLine,line;i<=endLine;i++)line=state$1.doc.line(i),line.length<=endOff&&ranges.push(state.EditorSelection.range(line.from+startOff,line.to+endOff))}else{let startCol=Math.min(a.col,b.col),endCol=Math.max(a.col,b.col);for(let i=startLine;i<=endLine;i++){let line=state$1.doc.line(i),start=state.findColumn(line.text,startCol,state$1.tabSize,!0);if(0>start)ranges.push(state.EditorSelection.cursor(line.to));else{let end=state.findColumn(line.text,endCol,state$1.tabSize);ranges.push(state.EditorSelection.range(line.from+start,line.from+end))}}}return ranges}function absoluteColumn(view,x){let ref=view.coordsAtPos(view.viewport.from);return ref?Math.round(Math.abs((ref.left-x)/view.defaultCharacterWidth)):-1}function getPos(view,event){let offset=view.posAtCoords({x:event.clientX,y:event.clientY},!1),line=view.state.doc.lineAt(offset),off=offset-line.from,col=off>MaxOff?-1:off==line.length?absoluteColumn(view,event.clientX):state.countColumn(line.text,view.state.tabSize,offset-line.from);return{line:line.number,col,off}}function rectangleSelectionStyle(view,event){let start=getPos(view,event),startSel=view.state.selection;return start?{update(update){if(update.docChanged){let newStart=update.changes.mapPos(update.startState.doc.line(start.line).from),newLine=update.state.doc.lineAt(newStart);start={line:newLine.number,col:start.col,off:Math.min(start.off,newLine.length)},startSel=startSel.map(update.changes)}},get(event,_extend,multiple){let cur=getPos(view,event);if(!cur)return startSel;let ranges=rectangleFor(view.state,start,cur);return ranges.length?multiple?state.EditorSelection.create(ranges.concat(startSel.ranges)):state.EditorSelection.create(ranges):startSel}}:null}/**
		Create an extension that enables rectangular selections. By
		default, it will react to left mouse drag with the Alt key held
		down. When such a selection occurs, the text within the rectangle
		that was dragged over will be selected, as one selection
		[range](https://codemirror.net/6/docs/ref/#state.SelectionRange) per line.
		*/function rectangularSelection(options){let filter=(null===options||void 0===options?void 0:options.eventFilter)||(e=>e.altKey&&0==e.button);return EditorView.mouseSelectionStyle.of((view,event)=>filter(event)?rectangleSelectionStyle(view,event):null)}/**
		Returns an extension that turns the pointer cursor into a
		crosshair when a given modifier key, defaulting to Alt, is held
		down. Can serve as a visual hint that rectangular selection is
		going to happen when paired with
		[`rectangularSelection`](https://codemirror.net/6/docs/ref/#view.rectangularSelection).
		*/function crosshairCursor(options={}){let[code,getter]=keys[options.key||"Alt"],plugin=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.isDown=!1}set(isDown){this.isDown!=isDown&&(this.isDown=isDown,this.view.update([]))}},{eventObservers:{keydown(e){this.set(e.keyCode==code||getter(e))},keyup(e){e.keyCode!=code&&getter(e)||this.set(!1)},mousemove(e){this.set(getter(e))}}});return[plugin,EditorView.contentAttributes.of(view=>{var _a;return(null===(_a=view.plugin(plugin))||void 0===_a?void 0:_a.isDown)?showCrosshair:null})]}/**
		Creates an extension that configures tooltip behavior.
		*/function tooltips(config={}){return tooltipConfig.of(config)}function windowSpace(view){let docElt=view.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:docElt.clientHeight,right:docElt.clientWidth}}function setLeftStyle(elt,value){let current=parseInt(elt.style.left,10);(isNaN(current)||1<Math.abs(value-current))&&(elt.style.left=value+"px")}function isInTooltip(tooltip,event){let{left,right,top,bottom}=tooltip.getBoundingClientRect(),arrow;if(arrow=tooltip.querySelector(".cm-tooltip-arrow")){let arrowRect=arrow.getBoundingClientRect();top=Math.min(arrowRect.top,top),bottom=Math.max(arrowRect.bottom,bottom)}return event.clientX>=left-tooltipMargin&&event.clientX<=right+tooltipMargin&&event.clientY>=top-tooltipMargin&&event.clientY<=bottom+tooltipMargin}function isOverRange(view,from,to,x,y,margin){let rect=view.scrollDOM.getBoundingClientRect(),docBottom=view.documentTop+view.documentPadding.top+view.contentHeight;if(rect.left>x||rect.right<x||rect.top>y||Math.min(rect.bottom,docBottom)<y)return!1;let pos=view.posAtCoords({x,y},!1);return pos>=from&&pos<=to}/**
		Set up a hover tooltip, which shows up when the pointer hovers
		over ranges of text. The callback is called when the mouse hovers
		over the document text. It should, if there is a tooltip
		associated with position `pos`, return the tooltip description
		(either directly or in a promise). The `side` argument indicates
		on which side of the position the pointer is—it will be -1 if the
		pointer is before the position, 1 if after the position.

		Note that all hover tooltips are hosted within a single tooltip
		container element. This allows multiple tooltips over the same
		range to be "merged" together without overlapping.

		The return value is a valid [editor extension](https://codemirror.net/6/docs/ref/#state.Extension)
		but also provides an `active` property holding a state field that
		can be used to read the currently active tooltips produced by this
		extension.
		*/function hoverTooltip(source,options={}){let setHover=state.StateEffect.define(),locked=new WeakMap,hoverState=state.StateField.define({create(){return[]},update(value,tr){let lock=locked.get(value);if(value.length&&(options.hideOnChange&&(tr.docChanged||tr.selection)?value=[]:lock&&lock(tr)?value=[]:options.hideOn&&(value=value.filter(v=>!options.hideOn(tr,v)))),tr.docChanged&&value.length){let mapped=[];for(let tooltip of value){let newPos=tr.changes.mapPos(tooltip.pos,-1,state.MapMode.TrackDel);if(null!=newPos){let copy=Object.assign(Object.create(null),tooltip);copy.pos=newPos,null!=copy.end&&(copy.end=tr.changes.mapPos(copy.end)),mapped.push(copy)}}value=mapped}for(let effect of tr.effects)effect.is(setHover)&&(value=effect.value,lock=void 0),(effect.is(closeHoverTooltipEffect)&&!effect.value||effect.value==hoverState)&&(value=[]);return value.length&&lock&&locked.set(value,lock),value},provide:f=>showHoverTooltip.from(f)});// This would be better stored in the state field, but we've set
// down the type of the field in our interface, so it's indirectly
// stored by array identity.
const plugin=ViewPlugin.define(view=>new HoverPlugin(view,source,hoverState,locked,setHover,options.hoverTime||300/* Hover.Time */));return{active:hoverState,extension:[hoverState,plugin,hoverPlugin.of(plugin),showHoverTooltipHost]}}/**
		Activate hover tooltips for the given position and side. If you
		provide a specific hover tooltip (the value returned from
		[`hoverTooltip`](https://codemirror.net/6/docs/ref/#view.hoverTooltip)), only that one will be
		activated. If not given, all hover tooltips at the given position
		are triggered.

		Note that tooltips opened this way don't close automatically, and
		you'll want to pass an `until` callback or use
		[`closeHoverTooltip`](https://codemirror.net/6/docs/ref/#view.closeHoverTooltip)/[`closeHoverTooltips`](https://codemirror.net/6/docs/ref/#view.closeHoverTooltips)
		to deactivate them.
		*/function activateHover(view,pos,side,options={}){var _a;let plugins=view.state.facet(hoverPlugin).map(p=>view.plugin(p)).filter(p=>!!p);if(options.tooltip&&options.tooltip.active){let found=plugins.find(p=>p.field==options.tooltip.active);found&&(plugins=[found])}for(let plugin of plugins)plugin.activateHover(view,pos,side,null!==(_a=options.until)&&void 0!==_a?_a:()=>!1)}/**
		Get the active tooltip view for a given tooltip, if available.
		*/function getTooltip(view,tooltip){let plugin=view.plugin(tooltipPlugin);if(!plugin)return null;let found=plugin.manager.tooltips.indexOf(tooltip);return 0>found?null:plugin.manager.tooltipViews[found]}/**
		Returns true if any hover tooltips are currently active.
		*/function hasHoverTooltips(state){return state.facet(showHoverTooltip).some(x=>x)}/**
		Transaction effect that closes a specific hover tooltip.
		*/function closeHoverTooltip(tooltip){return closeHoverTooltipEffect.of(tooltip.active)}/**
		Tell the tooltip extension to recompute the position of the active
		tooltips. This can be useful when something happens (such as a
		re-positioning or CSS change affecting the editor) that could
		invalidate the existing tooltip positions.
		*/function repositionTooltips(view){let plugin=view.plugin(tooltipPlugin);plugin&&plugin.maybeMeasure()}/**
		Configures the panel-managing extension.
		*/function panels(config){return config?[panelConfig.of(config)]:[]}/**
		Get the active panel created by the given constructor, if any.
		This can be useful when you need access to your panels' DOM
		structure.
		*/function getPanel(view,panel){let plugin=view.plugin(panelPlugin),index=plugin?plugin.specs.indexOf(panel):-1;return-1<index?plugin.panels[index]:null}function rm(node){let next=node.nextSibling;return node.remove(),next}/**
		Opening a panel is done by providing a constructor function for
		the panel through this facet. (The panel is closed again when its
		constructor is no longer provided.) Values of `null` are ignored.
		*/ /**
		Show a panel above or below the editor to show the user a message
		or prompt them for input. Returns an effect that can be dispatched
		to close the dialog, and a promise that resolves when the dialog
		is closed or a form inside of it is submitted.

		You are encouraged, if your handling of the result of the promise
		dispatches a transaction, to include the `close` effect in it. If
		you don't, this function will automatically dispatch a separate
		transaction right after.
		*/function showDialog(view,config){let promise=new Promise(r=>resolve=r),panelCtor=view=>createDialog(view,config,resolve),resolve;view.state.field(dialogField,!1)?view.dispatch({effects:openDialogEffect.of(panelCtor)}):view.dispatch({effects:state.StateEffect.appendConfig.of(dialogField.init(()=>[panelCtor]))});let close=closeDialogEffect.of(panelCtor);return{close,result:promise.then(form=>{let queue=view.win.queueMicrotask||(f=>view.win.setTimeout(f,10));return queue(()=>{-1<view.state.field(dialogField).indexOf(panelCtor)&&view.dispatch({effects:close})}),form})}}/**
		Find the [`Panel`](https://codemirror.net/6/docs/ref/#view.Panel) for an open dialog, using a class
		name as identifier.
		*/function getDialog(view,className){let dialogs=view.state.field(dialogField,!1)||[];for(let open of dialogs){let panel=getPanel(view,open);if(panel&&panel.dom.classList.contains(className))return panel}return null}function createDialog(view,config,result){function done(form){panel.contains(panel.ownerDocument.activeElement)&&view.focus(),result(form)}let content=config.content?config.content(view,()=>done(null)):null;if(!content){if(content=elt("form"),config.input){let input=elt("input",config.input);/^(text|password|number|email|tel|url)$/.test(input.type)&&input.classList.add("cm-textfield"),input.name||(input.name="input"),content.appendChild(elt("label",(config.label||"")+": ",input))}else content.appendChild(document.createTextNode(config.label||""));content.appendChild(document.createTextNode(" ")),content.appendChild(elt("button",{class:"cm-button",type:"submit"},config.submitLabel||"OK"))}let forms="FORM"==content.nodeName?[content]:content.querySelectorAll("form");for(let i=0,form;i<forms.length;i++)form=forms[i],form.addEventListener("keydown",event=>{27==event.keyCode?(event.preventDefault(),done(null)):13==event.keyCode&&(event.preventDefault(),done(form))}),form.addEventListener("submit",event=>{event.preventDefault(),done(form)});let panel=elt("div",content,elt("button",{onclick:()=>done(null),"aria-label":view.state.phrase("close"),class:"cm-dialog-close",type:"button"},["\xD7"]));return config.class&&(panel.className=config.class),panel.classList.add("cm-dialog"),{dom:panel,top:config.top,mount:()=>{if(config.focus){let focus;focus="string"==typeof config.focus?content.querySelector(config.focus):content.querySelector("input")||content.querySelector("button"),focus&&"select"in focus?focus.select():focus&&"focus"in focus&&focus.focus()}}}}/**
		A gutter marker represents a bit of information attached to a line
		in a specific gutter. Your own custom markers have to extend this
		class.
		*/ /**
		Define an editor gutter. The order in which the gutters appear is
		determined by their extension priority.
		*/function gutter(config){return[gutters(),activeGutters.of({...defaults,...config})]}/**
		The gutter-drawing plugin is automatically enabled when you add a
		gutter, but you can use this function to explicitly configure it.

		Unless `fixed` is explicitly set to `false`, the gutters are
		fixed, meaning they don't scroll along with the content
		horizontally (except on Internet Explorer, which doesn't support
		CSS [`position:
		sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky)).
		*/function gutters(config){let result=[gutterView];return config&&!1===config.fixed&&result.push(unfixGutters.of(!0)),result}function asArray(val){return Array.isArray(val)?val:[val]}function advanceCursor(cursor,collect,pos){for(;cursor.value&&cursor.from<=pos;)cursor.from==pos&&collect.push(cursor.value),cursor.next()}function sameMarkers(a,b){if(a.length!=b.length)return!1;for(let i=0;i<a.length;i++)if(!a[i].compare(b[i]))return!1;return!0}/**
		Facet used to provide markers to the line number gutter.
		*/function formatNumber(view,number){return view.state.facet(lineNumberConfig).formatNumber(number,view.state)}/**
		Create a line number gutter extension.
		*/function lineNumbers(config={}){return[lineNumberConfig.of(config),gutters(),lineNumberGutter]}function maxLineNumber(lines){let last=9;for(;last<lines;)last=10*last+9;return last}/**
		Returns an extension that adds a `cm-activeLineGutter` class to
		all gutter elements on the [active
		line](https://codemirror.net/6/docs/ref/#view.highlightActiveLine).
		*/function highlightActiveLineGutter(){return activeLineGutterHighlighter}function matcher(decorator){return ViewPlugin.define(view=>({decorations:decorator.createDeco(view),update(u){this.decorations=decorator.updateDeco(u,this.decorations)}}),{decorations:v=>v.decorations})}/**
		Returns an extension that highlights whitespace, adding a
		`cm-highlightSpace` class to stretches of spaces, and a
		`cm-highlightTab` class to individual tab characters. By default,
		the former are shown as faint dots, and the latter as arrows.
		*/function highlightWhitespace(){return whitespaceHighlighter}/**
		Returns an extension that adds a `cm-trailingSpace` class to all
		trailing whitespace.
		*/function highlightTrailingWhitespace(){return trailingHighlighter}/**
		@internal
		*/var state=require$$0,styleMod=require$$1,w3cKeyname=require$$2,elt=require$$3;let nav="undefined"==typeof navigator?{userAgent:"",vendor:"",platform:""}:navigator,doc="undefined"==typeof document?{documentElement:{style:{}}}:document;const ie_edge=/Edge\/(\d+)/.exec(nav.userAgent),ie_upto10=/MSIE \d/.test(nav.userAgent),ie_11up=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent),ie=!!(ie_upto10||ie_11up||ie_edge),gecko=!ie&&/gecko\/(\d+)/i.test(nav.userAgent),chrome=!ie&&/Chrome\/(\d+)/.exec(nav.userAgent),webkit=("webkitFontSmoothing"in doc.documentElement.style),safari=!ie&&/Apple Computer/.test(nav.vendor),ios=safari&&(/Mobile\/\w+/.test(nav.userAgent)||2<nav.maxTouchPoints);var browser={mac:ios||/Mac/.test(nav.platform),windows:/Win/.test(nav.platform),linux:/Linux|X11/.test(nav.platform),ie,ie_version:ie_upto10?doc.documentMode||6:ie_11up?+ie_11up[1]:ie_edge?+ie_edge[1]:0,gecko,gecko_version:gecko?+(/Firefox\/(\d+)/.exec(nav.userAgent)||[0,0])[1]:0,chrome:!!chrome,chrome_version:chrome?+chrome[1]:0,ios,android:/Android\b/.test(nav.userAgent),webkit,webkit_version:webkit?+(/\bAppleWebKit\/(\d+)/.exec(nav.userAgent)||[0,0])[1]:0,safari,safari_version:safari?+(/\bVersion\/(\d+(\.\d+)?)/.exec(nav.userAgent)||[0,0])[1]:0,tabSize:null==doc.documentElement.style.tabSize?"-moz-tab-size":"tab-size"};const noAttrs=Object.create(null);class WidgetType{/**
		    Compare this instance to another instance of the same type.
		    (TypeScript can't express this, but only instances of the same
		    specific class will be passed to this method.) This is used to
		    avoid redrawing widgets when they are replaced by a new
		    decoration of the same type. The default implementation just
		    returns `false`, which will cause new instances of the widget to
		    always be redrawn.
		    */eq(widget){return!1}/**
		    Update a DOM element created by a widget of the same type (but
		    different, non-`eq` content) to reflect this widget. May return
		    true to indicate that it could update, false to indicate it
		    couldn't (in which case the widget will be redrawn). The default
		    implementation just returns false.
		    */updateDOM(dom,view,from){return!1}/**
		    @internal
		    */compare(other){return this==other||this.constructor==other.constructor&&this.eq(other)}/**
		    The estimated height this widget will have, to be used when
		    estimating the height of content that hasn't been drawn. May
		    return -1 to indicate you don't know. The default implementation
		    returns -1.
		    */get estimatedHeight(){return-1}/**
		    For inline widgets that are displayed inline (as opposed to
		    `inline-block`) and introduce line breaks (through `<br>` tags
		    or textual newlines), this must indicate the amount of line
		    breaks they introduce. Defaults to 0.
		    */get lineBreaks(){return 0}/**
		    Can be used to configure which kinds of events inside the widget
		    should be ignored by the editor. The default is to ignore all
		    events.
		    */ignoreEvent(event){return!0}/**
		    Override the way screen coordinates for positions at/in the
		    widget are found. `pos` will be the offset into the widget, and
		    `side` the side of the position that is being queried—less than
		    zero for before, greater than zero for after, and zero for
		    directly at that position.
		    */coordsAt(dom,pos,side){return null}/**
		    @internal
		    */get isHidden(){return!1}/**
		    @internal
		    */get editable(){return!1}/**
		    This is called when the an instance of the widget is removed
		    from the editor view.
		    */destroy(dom){}}/**
		The different types of blocks that can occur in an editor view.
		*/exports.BlockType=void 0,function(BlockType){BlockType[BlockType.Text=0]="Text",BlockType[BlockType.WidgetBefore=1]="WidgetBefore",BlockType[BlockType.WidgetAfter=2]="WidgetAfter",BlockType[BlockType.WidgetRange=3]="WidgetRange"}(exports.BlockType||(exports.BlockType={}));/**
		A decoration provides information on how to draw or style a piece
		of content. You'll usually use it wrapped in a
		[`Range`](https://codemirror.net/6/docs/ref/#state.Range), which adds a start and end position.
		@nonabstract
		*/class Decoration extends state.RangeValue{constructor(/**
		    @internal
		    */startSide,/**
		    @internal
		    */endSide,/**
		    @internal
		    */widget,/**
		    The config object used to create this decoration. You can
		    include additional properties in there to store metadata about
		    your decoration.
		    */spec){super(),this.startSide=startSide,this.endSide=endSide,this.widget=widget,this.spec=spec}/**
		    @internal
		    */get heightRelevant(){return!1}/**
		    Create a mark decoration, which influences the styling of the
		    content in its range. Nested mark decorations will cause nested
		    DOM elements to be created. Nesting order is determined by
		    precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
		    the higher-precedence decorations creating the inner DOM nodes.
		    Such elements are split on line boundaries and on the boundaries
		    of lower-precedence decorations.
		    */static mark(spec){return new MarkDecoration(spec)}/**
		    Create a widget decoration, which displays a DOM element at the
		    given position.
		    */static widget(spec){let side=Math.max(-1e4,Math.min(1e4,spec.side||0)),block=!!spec.block;return side+=block&&!spec.inlineOrder?0<side?3e8/* Side.BlockAfter */:-4e8/* Side.BlockBefore */:0<side?1e8/* Side.InlineAfter */:-1e8/* Side.InlineBefore */,new PointDecoration(spec,side,side,block,spec.widget||null,!1)}/**
		    Create a replace decoration which replaces the given range with
		    a widget, or simply hides it.
		    */static replace(spec){let block=!!spec.block,startSide,endSide;if(spec.isBlockGap)startSide=-5e8/* Side.GapStart */,endSide=4e8/* Side.GapEnd */;else{let{start,end}=getInclusive(spec,block);startSide=(start?block?-3e8/* Side.BlockIncStart */:-1/* Side.InlineIncStart */:5e8/* Side.NonIncStart */)-1,endSide=(end?block?2e8/* Side.BlockIncEnd */:1/* Side.InlineIncEnd */:-6e8/* Side.NonIncEnd */)+1}return new PointDecoration(spec,startSide,endSide,block,spec.widget||null,!0)}/**
		    Create a line decoration, which can add DOM attributes to the
		    line starting at the given position.
		    */static line(spec){return new LineDecoration(spec)}/**
		    Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
		    decorated range or ranges. If the ranges aren't already sorted,
		    pass `true` for `sort` to make the library sort them for you.
		    */static set(of,sort=!1){return state.RangeSet.of(of,sort)}/**
		    @internal
		    */hasHeight(){return!!this.widget&&-1<this.widget.estimatedHeight}}/**
		The empty set of decorations.
		*/Decoration.none=state.RangeSet.empty;class MarkDecoration extends Decoration{constructor(spec){let{start,end}=getInclusive(spec);super(start?-1/* Side.InlineIncStart */:5e8/* Side.NonIncStart */,end?1/* Side.InlineIncEnd */:-6e8/* Side.NonIncEnd */,null,spec),this.tagName=spec.tagName||"span",this.attrs=spec.class&&spec.attributes?combineAttrs(spec.attributes,{class:spec.class}):spec.class?{class:spec.class}:spec.attributes||noAttrs}eq(other){return this==other||other instanceof MarkDecoration&&this.tagName==other.tagName&&attrsEq(this.attrs,other.attrs)}range(from,to=from){if(from>=to)throw new RangeError("Mark decorations may not be empty");return super.range(from,to)}}MarkDecoration.prototype.point=!1;class LineDecoration extends Decoration{constructor(spec){super(-2e8/* Side.Line */,-2e8/* Side.Line */,null,spec)}eq(other){return other instanceof LineDecoration&&this.spec.class==other.spec.class&&attrsEq(this.spec.attributes,other.spec.attributes)}range(from,to=from){if(to!=from)throw new RangeError("Line decoration ranges must be zero-length");return super.range(from,to)}}LineDecoration.prototype.mapMode=state.MapMode.TrackBefore,LineDecoration.prototype.point=!0;class PointDecoration extends Decoration{constructor(spec,startSide,endSide,block,widget,isReplace){super(startSide,endSide,widget,spec),this.block=block,this.isReplace=isReplace,this.mapMode=block?0>=startSide?state.MapMode.TrackBefore:state.MapMode.TrackAfter:state.MapMode.TrackDel}// Only relevant when this.block == true
get type(){return this.startSide==this.endSide?0>=this.startSide?exports.BlockType.WidgetBefore:exports.BlockType.WidgetAfter:exports.BlockType.WidgetRange}get heightRelevant(){return this.block||!!this.widget&&(5<=this.widget.estimatedHeight||0<this.widget.lineBreaks)}eq(other){return other instanceof PointDecoration&&widgetsEq(this.widget,other.widget)&&this.block==other.block&&this.startSide==other.startSide&&this.endSide==other.endSide}range(from,to=from){if(this.isReplace&&(from>to||from==to&&0<this.startSide&&0>=this.endSide))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&to!=from)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(from,to)}}PointDecoration.prototype.point=!0;class BlockWrapper extends state.RangeValue{constructor(tagName,attributes){super(),this.tagName=tagName,this.attributes=attributes}eq(other){return other==this||other instanceof BlockWrapper&&this.tagName==other.tagName&&attrsEq(this.attributes,other.attributes)}/**
		    Create a block wrapper object with the given tag name and
		    attributes.
		    */static create(spec){return new BlockWrapper(spec.tagName,spec.attributes||noAttrs)}/**
		    Create a range set from the given block wrapper ranges.
		    */static set(of,sort=!1){return state.RangeSet.of(of,sort)}}BlockWrapper.prototype.startSide=BlockWrapper.prototype.endSide=-1;class DOMSelectionState{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(domSel){return this.anchorNode==domSel.anchorNode&&this.anchorOffset==domSel.anchorOffset&&this.focusNode==domSel.focusNode&&this.focusOffset==domSel.focusOffset}setRange(range){let{anchorNode,focusNode}=range;// Clip offsets to node size to avoid crashes when Safari reports bogus offsets (#1152)
this.set(anchorNode,Math.min(range.anchorOffset,anchorNode?maxOffset(anchorNode):0),focusNode,Math.min(range.focusOffset,focusNode?maxOffset(focusNode):0))}set(anchorNode,anchorOffset,focusNode,focusOffset){this.anchorNode=anchorNode,this.anchorOffset=anchorOffset,this.focusNode=focusNode,this.focusOffset=focusOffset}}let preventScrollSupported=null;// Safari 26 breaks preventScroll support
browser.safari&&26<=browser.safari_version&&(preventScrollSupported=!1);let scratchRange;class DOMPos{constructor(node,offset,precise=!0){this.node=node,this.offset=offset,this.precise=precise}static before(dom,precise){return new DOMPos(dom.parentNode,domIndex(dom),precise)}static after(dom,precise){return new DOMPos(dom.parentNode,domIndex(dom)+1,precise)}}/**
		Used to indicate [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
		*/exports.Direction=void 0,function(Direction){Direction[Direction.LTR=0]="LTR",Direction[Direction.RTL=1]="RTL"}(exports.Direction||(exports.Direction={}));const LTR=exports.Direction.LTR,RTL=exports.Direction.RTL,LowTypes=dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),ArabicTypes=dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),Brackets=Object.create(null),BracketStack=[];// Character types for codepoints 0x600 to 0x6f9
// There's a lot more in
// https://www.unicode.org/Public/UCD/latest/ucd/BidiBrackets.txt,
// which are left out to keep code size down.
for(let p of["()","[]","{}"]){let l=p.charCodeAt(0),r=p.charCodeAt(1);Brackets[l]=r,Brackets[r]=-l}const BidiRE=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;/**
		Represents a contiguous range of text that has a single direction
		(as in left-to-right or right-to-left).
		*/class BidiSpan{/**
		    The direction of this span.
		    */get dir(){return this.level%2?RTL:LTR}/**
		    @internal
		    */constructor(/**
		    The start of the span (relative to the start of the line).
		    */from,/**
		    The end of the span.
		    */to,/**
		    The ["bidi
		    level"](https://unicode.org/reports/tr9/#Basic_Display_Algorithm)
		    of the span (in this context, 0 means
		    left-to-right, 1 means right-to-left, 2 means left-to-right
		    number inside right-to-left text).
		    */level){this.from=from,this.to=to,this.level=level}/**
		    @internal
		    */side(end,dir){return this.dir==dir==end?this.to:this.from}/**
		    @internal
		    */forward(forward,dir){return forward==(this.dir==dir)}/**
		    @internal
		    */static find(order,index,level,assoc){let maybe=-1;for(let i=0,span;i<order.length;i++)if(span=order[i],span.from<=index&&span.to>=index){if(span.level==level)return i;// When multiple spans match, if assoc != 0, take the one that
// covers that side, otherwise take the one with the minimum
// level.
(0>maybe||(0==assoc?order[maybe].level>span.level:0>assoc?span.from<index:span.to>index))&&(maybe=i)}if(0>maybe)throw new RangeError("Index out of range");return maybe}}const types=[];let movedOver="";const clickAddsSelectionRange=state.Facet.define(),dragMovesSelection$1=state.Facet.define(),mouseSelectionStyle=state.Facet.define(),exceptionSink=state.Facet.define(),updateListener=state.Facet.define(),inputHandler=state.Facet.define(),focusChangeEffect=state.Facet.define(),clipboardInputFilter=state.Facet.define(),clipboardOutputFilter=state.Facet.define(),perLineTextDirection=state.Facet.define({combine:values=>values.some(x=>x)}),nativeSelectionHidden=state.Facet.define({combine:values=>values.some(x=>x)}),scrollHandler=state.Facet.define();class ScrollTarget{constructor(range,y,x,yMargin,xMargin,// This data structure is abused to also store precise scroll
// snapshots, instead of a `scrollIntoView` request. When this
// flag is `true`, `range` points at a position in the reference
// line, `yMargin` holds the difference between the top of that
// line and the top of the editor, and `xMargin` holds the
// editor's `scrollLeft`.
isSnapshot=!1){this.range=range,this.y=y,this.x=x,this.yMargin=yMargin,this.xMargin=xMargin,this.isSnapshot=isSnapshot}map(changes){return changes.empty?this:new ScrollTarget(this.range.map(changes),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(state$1){return this.range.to<=state$1.doc.length?this:new ScrollTarget(state.EditorSelection.cursor(state$1.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const scrollIntoView=state.StateEffect.define({map:(t,ch)=>t.map(ch)}),setEditContextFormatting=state.StateEffect.define(),editable=state.Facet.define({combine:values=>!values.length||values[0]});let nextPluginID=0;const viewPlugin=state.Facet.define({combine(plugins){return plugins.filter((p,i)=>{for(let j=0;j<i;j++)if(plugins[j].plugin==p.plugin)return!1;return!0})}});/**
		View plugins associate stateful values with a view. They can
		influence the way the content is drawn, and are notified of things
		that happen in the view. They optionally take an argument, in
		which case you need to call [`of`](https://codemirror.net/6/docs/ref/#view.ViewPlugin.of) to create
		an extension for the plugin. When the argument type is undefined,
		you can use the plugin instance as an extension directly.
		*/class ViewPlugin{constructor(/**
		    @internal
		    */id,/**
		    @internal
		    */create,/**
		    @internal
		    */domEventHandlers,/**
		    @internal
		    */domEventObservers,buildExtensions){this.id=id,this.create=create,this.domEventHandlers=domEventHandlers,this.domEventObservers=domEventObservers,this.baseExtensions=buildExtensions(this),this.extension=this.baseExtensions.concat(viewPlugin.of({plugin:this,arg:void 0}))}/**
		    Create an extension for this plugin with the given argument.
		    */of(arg){return this.baseExtensions.concat(viewPlugin.of({plugin:this,arg}))}/**
		    Define a plugin from a constructor function that creates the
		    plugin's value, given an editor view.
		    */static define(create,spec){const{eventHandlers,eventObservers,provide,decorations:deco}=spec||{};return new ViewPlugin(nextPluginID++,create,eventHandlers,eventObservers,plugin=>{let ext=[];return deco&&ext.push(decorations.of(view=>{let pluginInst=view.plugin(plugin);return pluginInst?deco(pluginInst):Decoration.none})),provide&&ext.push(provide(plugin)),ext})}/**
		    Create a plugin for a class whose constructor takes a single
		    editor view as argument.
		    */static fromClass(cls,spec){return ViewPlugin.define((view,arg)=>new cls(view,arg),spec)}}class PluginInstance{constructor(spec){this.spec=spec,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(view){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(view,this.spec.arg)}catch(e){logException(view.state,e,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let update=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(update)}catch(e){if(logException(update.state,e,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(_){}this.deactivate()}}return this}destroy(view){var _a;if(null===(_a=this.value)||void 0===_a?void 0:_a.destroy)try{this.value.destroy()}catch(e){logException(view.state,e,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const editorAttributes=state.Facet.define(),contentAttributes=state.Facet.define(),decorations=state.Facet.define(),blockWrappers=state.Facet.define(),outerDecorations=state.Facet.define(),atomicRanges=state.Facet.define(),bidiIsolatedRanges=state.Facet.define(),scrollMargins=state.Facet.define(),styleModule=state.Facet.define();// Provide decorations
class ChangedRange{constructor(fromA,toA,fromB,toB){this.fromA=fromA,this.toA=toA,this.fromB=fromB,this.toB=toB}join(other){return new ChangedRange(Math.min(this.fromA,other.fromA),Math.max(this.toA,other.toA),Math.min(this.fromB,other.fromB),Math.max(this.toB,other.toB))}addToSet(set){let i=set.length,me=this;for(;0<i;i--){let range=set[i-1];if(!(range.fromA>me.toA)){if(range.toA<me.fromA)break;me=me.join(range),set.splice(i-1,1)}}return set.splice(i,0,me),set}// Extend a set to cover all the content in `ranges`, which is a
// flat array with each pair of numbers representing fromB/toB
// positions. These pairs are generated in unchanged ranges, so the
// offset between doc A and doc B is the same for their start and
// end points.
static extendWithRanges(diff,ranges){if(0==ranges.length)return diff;let result=[];for(let dI=0,rI=0,off=0;;){let nextD=dI<diff.length?diff[dI].fromB:1e9,nextR=rI<ranges.length?ranges[rI]:1e9,fromB=Math.min(nextD,nextR);if(1e9==fromB)break;let fromA=fromB+off,toB=fromB,toA=fromA;for(;;)if(rI<ranges.length&&ranges[rI]<=toB){let end=ranges[rI+1];rI+=2,toB=Math.max(toB,end);for(let i=dI;i<diff.length&&diff[i].fromB<=toB;i++)off=diff[i].toA-diff[i].toB;toA=Math.max(toA,end+off)}else if(dI<diff.length&&diff[dI].fromB<=toB){let next=diff[dI++];toB=Math.max(toB,next.toB),toA=Math.max(toA,next.toA),off=next.toA-next.toB}else break;result.push(new ChangedRange(fromA,toA,fromB,toB))}return result}}/**
		View [plugins](https://codemirror.net/6/docs/ref/#view.ViewPlugin) are given instances of this
		class, which describe what happened, whenever the view is updated.
		*/class ViewUpdate{constructor(/**
		    The editor view that the update is associated with.
		    */view,/**
		    The new editor state.
		    */state$1,/**
		    The transactions involved in the update. May be empty.
		    */transactions){this.view=view,this.state=state$1,this.transactions=transactions,this.flags=0,this.startState=view.state,this.changes=state.ChangeSet.empty(this.startState.doc.length);for(let tr of transactions)this.changes=this.changes.compose(tr.changes);let changedRanges=[];this.changes.iterChangedRanges((fromA,toA,fromB,toB)=>changedRanges.push(new ChangedRange(fromA,toA,fromB,toB))),this.changedRanges=changedRanges}/**
		    @internal
		    */static create(view,state,transactions){return new ViewUpdate(view,state,transactions)}/**
		    Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
		    [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
		    update.
		    */get viewportChanged(){return 0<(4&this.flags/* UpdateFlag.Viewport */)}/**
		    Returns true when
		    [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
		    and the viewport change is not just the result of mapping it in
		    response to document changes.
		    */get viewportMoved(){return 0<(8&this.flags/* UpdateFlag.ViewportMoved */)}/**
		    Indicates whether the height of a block element in the editor
		    changed in this update.
		    */get heightChanged(){return 0<(2&this.flags/* UpdateFlag.Height */)}/**
		    Returns true when the document was modified or the size of the
		    editor, or elements within the editor, changed.
		    */get geometryChanged(){return this.docChanged||0<(18/* UpdateFlag.Height */&this.flags)}/**
		    True when this update indicates a focus change.
		    */get focusChanged(){return 0<(1&this.flags/* UpdateFlag.Focus */)}/**
		    Whether the document changed in this update.
		    */get docChanged(){return!this.changes.empty}/**
		    Whether the selection was explicitly set in this update.
		    */get selectionSet(){return this.transactions.some(tr=>tr.selection)}/**
		    @internal
		    */get empty(){return 0==this.flags&&0==this.transactions.length}}const noChildren=[];class Tile{constructor(dom,length,flags=0){this.dom=dom,this.length=length,this.flags=flags,this.parent=null,dom.cmTile=this}get breakAfter(){return 1&this.flags/* TileFlag.BreakAfter */}get children(){return noChildren}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(track){if(this.flags|=2/* TileFlag.Synced */,4&this.flags/* TileFlag.AttrsDirty */){this.flags&=-5/* TileFlag.AttrsDirty */;let attrs=this.domAttrs;attrs&&setAttrs(this.dom,attrs)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(dom){this.dom=dom,dom.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(tile,start=this.posAtStart){let pos=start;for(let child of this.children){if(child==tile)return pos;pos+=child.length+child.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(tile){return this.posBefore(tile)+tile.length}covers(side){return!0}coordsIn(pos,side){return null}domPosFor(off,side){let index=domIndex(this.dom),after=this.length?0<off:0<side;return new DOMPos(this.parent.dom,index+(after?1:0),0==off||off==this.length)}markDirty(attrs){this.flags&=-3/* TileFlag.Synced */,attrs&&(this.flags|=4/* TileFlag.AttrsDirty */),this.parent&&2&this.parent.flags/* TileFlag.Synced */&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let t=this;t;t=t.parent)if(t instanceof DocTile)return t;return null}static get(dom){return dom.cmTile}}class CompositeTile extends Tile{constructor(dom){super(dom,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(child){this.children.push(child),child.parent=this}sync(track){if(2&this.flags/* TileFlag.Synced */)return;super.sync(track);let parent=this.dom,prev=null,tracking=(null===track||void 0===track?void 0:track.node)==parent?track:null,length=0,next;for(let child of this.children){if(child.sync(track),length+=child.length+child.breakAfter,next=prev?prev.nextSibling:parent.firstChild,tracking&&next!=child.dom&&(tracking.written=!0),child.dom.parentNode==parent)for(;next&&next!=child.dom;)next=rm$1(next);else parent.insertBefore(child.dom,next);prev=child.dom}for(next=prev?prev.nextSibling:parent.firstChild,tracking&&next&&(tracking.written=!0);next;)next=rm$1(next);this.length=length}}class DocTile extends CompositeTile{constructor(view,dom){super(dom),this.view=view}owns(tile){for(;tile;tile=tile.parent)if(tile==this)return!0;return!1}isBlock(){return!0}nearest(dom){for(;;){if(!dom)return null;let tile=Tile.get(dom);if(tile&&this.owns(tile))return tile;dom=dom.parentNode}}blockTiles(f){for(let stack=[],cur=this,i=0,pos=0;;)if(i==cur.children.length){if(!stack.length)return;cur=cur.parent,cur.breakAfter&&pos++,i=stack.pop()}else{let next=cur.children[i++];if(next instanceof BlockWrapperTile)stack.push(i),cur=next,i=0;else{let end=pos+next.length,result=f(next,pos);if(void 0!==result)return result;pos=end+next.breakAfter}}}// Find the block at the given position. If side < -1, make sure to
// stay before block widgets at that position, if side > 1, after
// such widgets (used for selection drawing, which needs to be able
// to get coordinates for positions that aren't valid cursor positions).
resolveBlock(pos,side){let beforeOff=-1,afterOff=-1,before,after;if(this.blockTiles((tile,off)=>{let end=off+tile.length;if(pos>=off&&pos<=end){if(tile.isWidget()&&-1<=side&&1>=side){if(32&tile.flags/* TileFlag.After */)return!0;16&tile.flags/* TileFlag.Before */&&(before=void 0)}(off<pos||pos==end&&(-1>side?tile.length:tile.covers(1)))&&(!before||!tile.isWidget()&&before.isWidget())&&(before=tile,beforeOff=pos-off),(end>pos||pos==off&&(1<side?tile.length:tile.covers(-1)))&&(!after||!tile.isWidget()&&after.isWidget())&&(after=tile,afterOff=pos-off)}}),!before&&!after)throw new Error("No tile at position "+pos);return before&&0>side||!after?{tile:before,offset:beforeOff}:{tile:after,offset:afterOff}}}class BlockWrapperTile extends CompositeTile{constructor(dom,wrapper){super(dom),this.wrapper=wrapper}isBlock(){return!0}covers(side){return!!this.children.length&&(0>side?this.children[0].covers(-1):this.lastChild.covers(1))}get domAttrs(){return this.wrapper.attributes}static of(wrapper,dom){let tile=new BlockWrapperTile(dom||document.createElement(wrapper.tagName),wrapper);return dom||(tile.flags|=4/* TileFlag.AttrsDirty */),tile}}class LineTile extends CompositeTile{constructor(dom,attrs){super(dom),this.attrs=attrs}isLine(){return!0}static start(attrs,dom,keepAttrs){let line=new LineTile(dom||document.createElement("div"),attrs);return dom&&keepAttrs||(line.flags|=4/* TileFlag.AttrsDirty */),line}get domAttrs(){return this.attrs}// Find the tile associated with a given position in this line.
resolveInline(pos,side,forCoords){function scan(tile,pos){for(let i=0,off=0;i<tile.children.length&&off<=pos;i++){let child=tile.children[i],end=off+child.length;end>=pos&&(child.isComposite()?scan(child,pos-off):(!after||after.isHidden&&(0<side||forCoords&&onSameLine(after,child)))&&(end>pos||32&child.flags/* TileFlag.After */)?(after=child,afterOff=pos-off):(off<pos||16&child.flags/* TileFlag.Before */&&!child.isHidden)&&(before=child,beforeOff=pos-off)),off=end}}let before=null,beforeOff=-1,after=null,afterOff=-1;scan(this,pos);let target=(0>side?before:after)||before||after;return target?{tile:target,offset:target==before?beforeOff:afterOff}:null}coordsIn(pos,side){let found=this.resolveInline(pos,side,!0);return found?found.tile.coordsIn(Math.max(0,found.offset),side):fallbackRect(this)}domIn(pos,side){let found=this.resolveInline(pos,side);if(found){let{tile,offset}=found;if(this.dom.contains(tile.dom))return tile.isText()?new DOMPos(tile.dom,Math.min(tile.dom.nodeValue.length,offset)):tile.domPosFor(offset,16&tile.flags/* TileFlag.Before */?1:32&tile.flags/* TileFlag.After */?-1:side);let parent=found.tile.parent,saw=!1;for(let ch of parent.children){if(saw)return new DOMPos(ch.dom,0);ch==found.tile&&(saw=!0)}}return new DOMPos(this.dom,0)}}class MarkTile extends CompositeTile{constructor(dom,mark){super(dom),this.mark=mark}get domAttrs(){return this.mark.attrs}static of(mark,dom){let tile=new MarkTile(dom||document.createElement(mark.tagName),mark);return dom||(tile.flags|=4/* TileFlag.AttrsDirty */),tile}}class TextTile extends Tile{constructor(dom,text){super(dom,text.length),this.text=text}sync(track){2&this.flags/* TileFlag.Synced */||(super.sync(track),this.dom.nodeValue!=this.text&&(track&&track.node==this.dom&&(track.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(pos,side){let length=this.dom.nodeValue.length;pos>length&&(pos=length);let from=pos,to=pos,flatten=0;0==pos&&0>side||pos==length&&0<=side?!(browser.chrome||browser.gecko)&&(pos?(from--,flatten=1):to<length&&(to++,flatten=-1)):0>side?from--:to<length&&to++;let rects=textRange(this.dom,from,to).getClientRects();if(!rects.length)return null;let rect=rects[(flatten?0>flatten:0<=side)?0:rects.length-1];return browser.safari&&!flatten&&0==rect.width&&(rect=Array.prototype.find.call(rects,r=>r.width)||rect),flatten?flattenRect(rect,0>flatten):rect||null}static of(text,dom){let tile=new TextTile(dom||document.createTextNode(text),text);return dom||(tile.flags|=2/* TileFlag.Synced */),tile}}class WidgetTile extends Tile{constructor(dom,length,widget,flags){super(dom,length,flags),this.widget=widget}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(side){return!(48&this.flags/* TileFlag.PointWidget */)&&0<(this.flags&(0>side?64/* TileFlag.IncStart */:128/* TileFlag.IncEnd */))}coordsIn(pos,side){return this.coordsInWidget(pos,side,!1)}coordsInWidget(pos,side,block){let custom=this.widget.coordsAt(this.dom,pos,side);if(custom)return custom;if(block)return flattenRect(this.dom.getBoundingClientRect(),this.length?0==pos:0>=side);else{let rects=this.dom.getClientRects(),rect=null;if(!rects.length)return null;let fromBack=!!(16&this.flags/* TileFlag.Before */)||!(32&this.flags/* TileFlag.After */)&&0<pos;for(let i=fromBack?rects.length-1:0;;i+=fromBack?-1:1)if(rect=rects[i],0<pos?0==i:i==rects.length-1||rect.top<rect.bottom)break;return flattenRect(rect,!fromBack)}}get overrideDOMText(){if(!this.length)return state.Text.empty;let{root}=this;if(!root)return state.Text.empty;let start=this.posAtStart;return root.view.state.doc.slice(start,start+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(widget,view,length,flags,dom){return dom||(dom=widget.toDOM(view),!widget.editable&&(dom.contentEditable="false")),new WidgetTile(dom,length,widget,flags)}}// These are drawn around uneditable widgets to avoid a number of
// browser bugs that show up when the cursor is directly next to
// uneditable inline content.
class WidgetBufferTile extends Tile{constructor(flags){let img=document.createElement("img");img.className="cm-widgetBuffer",img.setAttribute("aria-hidden","true"),super(img,0,flags)}get isHidden(){return!0}get overrideDOMText(){return state.Text.empty}coordsIn(pos){return this.dom.getBoundingClientRect()}}// Represents a position in the tile tree.
class TilePointer{constructor(top){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=top}// Advance by the given distance. If side is -1, stop leaving or
// entering tiles, or skipping zero-length tiles, once the distance
// has been traversed. When side is 1, leave, enter, or skip
// everything at the end position.
advance(dist,side,walker){let{tile,index,beforeBreak,parents}=this;for(;dist||0<side;)if(!tile.isComposite()){if(index==tile.length)beforeBreak=!!tile.breakAfter,({tile,index}=parents.pop()),index++;else if(!dist)break;else{let take=Math.min(dist,tile.length-index);walker&&walker.skip(tile,index,index+take),dist-=take,index+=take}}else if(beforeBreak){if(!dist)break;walker&&walker.break(),dist--,beforeBreak=!1}else if(index==tile.children.length){if(!dist&&!parents.length)break;walker&&walker.leave(tile),beforeBreak=!!tile.breakAfter,({tile,index}=parents.pop()),index++}else{let next=tile.children[index],brk=next.breakAfter;(0<side?!(next.length<=dist):!(next.length<dist))||walker&&!1===walker.skip(next,0,next.length)&&next.isComposite?(parents.push({tile,index}),tile=next,index=0,walker&&next.isComposite()&&walker.enter(next)):(beforeBreak=!!brk,index++,dist-=next.length)}return this.tile=tile,this.index=index,this.beforeBreak=beforeBreak,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}// Used to track open block wrappers
class OpenWrapper{constructor(from,to,wrapper,rank){this.from=from,this.to=to,this.wrapper=wrapper,this.rank=rank}}// This class builds up a new document tile using input from either
// iteration over the old tree or iteration over the document +
// decorations. The add* methods emit elements into the tile
// structure. To avoid awkward synchronization issues, marks and block
// wrappers are treated as belonging to to their content, rather than
// opened/closed independently.
//
// All composite tiles that are touched by changes are rebuilt,
// reusing as much of the old tree (either whole nodes or just DOM
// elements) as possible. The new tree is built without the Synced
// flag, and then synced (during which DOM parent/child relations are
// fixed up, text nodes filled in, and attributes added) in a second
// phase.
class TileBuilder{constructor(cache,root,blockWrappers){this.cache=cache,this.root=root,this.blockWrappers=blockWrappers,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(text,marks,openStart,tile){var _a;this.flushBuffer();let parent=this.ensureMarks(marks,openStart),prev=parent.lastChild;if(prev&&prev.isText()&&!(8&prev.flags/* TileFlag.Composition */)&&512>prev.length+text.length/* C.Chunk */){this.cache.reused.set(prev,2/* Reused.DOM */);let tile=parent.children[parent.children.length-1]=new TextTile(prev.dom,prev.text+text);tile.parent=parent}else parent.append(tile||TextTile.of(text,null===(_a=this.cache.find(TextTile))||void 0===_a?void 0:_a.dom));this.pos+=text.length,this.afterWidget=null}addComposition(composition,context){let line=this.curLine;line.dom!=context.line.dom&&(line.setDOM(this.cache.reused.has(context.line)?freeNode(context.line.dom):context.line.dom),this.cache.reused.set(context.line,2/* Reused.DOM */));let head=line;for(let i=context.marks.length-1;0<=i;i--){let mark=context.marks[i],last=head.lastChild;if(last instanceof MarkTile&&last.mark.eq(mark.mark))last.dom!=mark.dom&&last.setDOM(freeNode(mark.dom)),head=last;else{if(this.cache.reused.get(mark)){let tile=Tile.get(mark.dom);tile&&tile.setDOM(freeNode(mark.dom))}let nw=MarkTile.of(mark.mark,mark.dom);head.append(nw),head=nw}this.cache.reused.set(mark,2/* Reused.DOM */)}let oldTile=Tile.get(composition.text);oldTile&&this.cache.reused.set(oldTile,2/* Reused.DOM */);let text=new TextTile(composition.text,composition.text.nodeValue);text.flags|=8/* TileFlag.Composition */,this.pos=composition.range.toB,head.append(text)}addInlineWidget(widget,marks,openStart){// Adjacent same-side-facing non-replacing widgets don't need buffers between them
let noSpace=this.afterWidget&&48&widget.flags/* TileFlag.PointWidget */&&(48&this.afterWidget.flags/* TileFlag.PointWidget */)==(48&widget.flags/* TileFlag.PointWidget */);noSpace||this.flushBuffer();let parent=this.ensureMarks(marks,openStart);noSpace||16&widget.flags/* TileFlag.Before */||parent.append(this.getBuffer(1)),parent.append(widget),this.pos+=widget.length,this.afterWidget=widget}addMark(tile,marks,openStart){this.flushBuffer();let parent=this.ensureMarks(marks,openStart);parent.append(tile),this.pos+=tile.length,this.afterWidget=null}addBlockWidget(widget){this.getBlockPos().append(widget),this.pos+=widget.length,this.lastBlock=widget,this.endLine()}continueWidget(length){let widget=this.afterWidget||this.lastBlock;widget.length+=length,this.pos+=length}addLineStart(attrs,dom){var _a;attrs||(attrs=lineBaseAttrs);let tile=LineTile.start(attrs,dom||(null===(_a=this.cache.find(LineTile))||void 0===_a?void 0:_a.dom),!!dom);this.getBlockPos().append(this.lastBlock=this.curLine=tile)}addLine(tile){this.getBlockPos().append(tile),this.pos+=tile.length,this.lastBlock=tile,this.endLine()}addBreak(){this.lastBlock.flags|=1/* TileFlag.BreakAfter */,this.endLine(),this.pos++}addLineStartIfNotCovered(attrs){this.blockPosCovered()||this.addLineStart(attrs)}ensureLine(attrs){this.curLine||this.addLineStart(attrs)}ensureMarks(marks,openStart){var _a;let parent=this.curLine;for(let i=marks.length-1;0<=i;i--){let mark=marks[i],last;if(0<openStart&&(last=parent.lastChild)&&last instanceof MarkTile&&last.mark.eq(mark))parent=last,openStart--;else{let tile=MarkTile.of(mark,null===(_a=this.cache.find(MarkTile,m=>m.mark.eq(mark)))||void 0===_a?void 0:_a.dom);parent.append(tile),parent=tile,openStart=0}}return parent}endLine(){if(this.curLine){this.flushBuffer();let last=this.curLine.lastChild;last&&hasContent(this.curLine,!1)&&("BR"==last.dom.nodeName||!last.isWidget()||browser.ios&&hasContent(this.curLine,!0))||this.curLine.append(this.cache.findWidget(BreakWidget,0,32/* TileFlag.After */)||new WidgetTile(BreakWidget.toDOM(),0,BreakWidget,32/* TileFlag.After */)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4/* C.WrapperReset */&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let i=this.wrappers.length-1;0<=i;i--)this.wrappers[i].to<this.pos&&this.wrappers.splice(i,1);for(let cur=this.blockWrappers;cur.value&&cur.from<=this.pos;cur.next())if(cur.to>=this.pos){let wrap=new OpenWrapper(cur.from,cur.to,cur.value,cur.rank),i=this.wrappers.length;for(;0<i&&0>(this.wrappers[i-1].rank-wrap.rank||this.wrappers[i-1].to-wrap.to);)i--;this.wrappers.splice(i,0,wrap)}this.wrapperPos=this.pos}getBlockPos(){var _a;this.updateBlockWrappers();let parent=this.root;for(let wrap of this.wrappers){let last=parent.lastChild;if(wrap.from<this.pos&&last instanceof BlockWrapperTile&&last.wrapper.eq(wrap.wrapper))parent=last;else{let tile=BlockWrapperTile.of(wrap.wrapper,null===(_a=this.cache.find(BlockWrapperTile,t=>t.wrapper.eq(wrap.wrapper)))||void 0===_a?void 0:_a.dom);parent.append(tile),parent=tile}}return parent}blockPosCovered(){let last=this.lastBlock;return null!=last&&!last.breakAfter&&(!last.isWidget()||0<(160/* TileFlag.IncEnd */&last.flags))}getBuffer(side){let flags=2/* TileFlag.Synced */|(0>side?16/* TileFlag.Before */:32/* TileFlag.After */),found=this.cache.find(WidgetBufferTile,void 0,1/* Reused.Full */);return found&&(found.flags=flags),found||new WidgetBufferTile(flags)}flushBuffer(){this.afterWidget&&!(32&this.afterWidget.flags/* TileFlag.After */)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}// Helps getting efficient access to the document text.
class TextStream{constructor(doc){this.skipCount=0,this.text="",this.textOff=0,this.cursor=doc.iter()}skip(len){this.textOff+len<=this.text.length?this.textOff+=len:(this.skipCount+=len-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(maxLen){if(this.textOff==this.text.length){let{value,lineBreak,done}=this.cursor.next(this.skipCount);if(this.skipCount=0,done)throw new Error("Ran out of text content when drawing inline views");this.text=value;let len=this.textOff=Math.min(maxLen,value.length);return lineBreak?null:value.slice(0,len)}let end=Math.min(this.text.length,this.textOff+maxLen),chars=this.text.slice(this.textOff,end);return this.textOff=end,chars}}// Assign the tile classes bucket numbers for caching.
const buckets=[WidgetTile,LineTile,TextTile,MarkTile,WidgetBufferTile,BlockWrapperTile,DocTile];for(let i=0;i<buckets.length;i++)buckets[i].bucket=i;// Leaf tiles and line tiles may be reused in their entirety. All
// others will get new tiles allocated, using the old DOM when
// possible.
class TileCache{constructor(view){this.view=view,this.buckets=buckets.map(()=>[]),this.index=buckets.map(()=>0),this.reused=new Map}// Put a tile in the cache.
add(tile){let i=tile.constructor.bucket,bucket=this.buckets[i];6>bucket.length/* C.Bucket */?bucket.push(tile):bucket[this.index[i]=(this.index[i]+1)%6/* C.Bucket */]=tile}find(cls,test,type=2/* Reused.DOM */){let i=cls.bucket,bucket=this.buckets[i],off=this.index[i];for(let j=bucket.length-1;0<=j;j--){// Look at the most recently added items first (last-in, first-out)
let index=(j+off)%bucket.length,tile=bucket[index];if((!test||test(tile))&&!this.reused.has(tile))return bucket.splice(index,1),index<off&&this.index[i]--,this.reused.set(tile,type),tile}return null}findWidget(widget,length,flags){let widgets=this.buckets[0];if(widgets.length)for(let i=0,pass=0;;i++){if(i==widgets.length){if(pass)return null;pass=1,i=0}let tile=widgets[i];if(!this.reused.has(tile)&&(0==pass?tile.widget.compare(widget):tile.widget.constructor==widget.constructor&&widget.updateDOM(tile.dom,this.view,tile.widget)))return widgets.splice(i,1),i<this.index[0]&&this.index[0]--,tile.widget==widget&&tile.length==length&&(497/* TileFlag.BreakAfter */&tile.flags)==flags?(this.reused.set(tile,1/* Reused.Full */),tile):(this.reused.set(tile,2/* Reused.DOM */),new WidgetTile(tile.dom,length,widget,-498&tile.flags|flags))}}reuse(tile){return this.reused.set(tile,1/* Reused.Full */),tile}maybeReuse(tile,type=2/* Reused.DOM */){if(!this.reused.has(tile))return this.reused.set(tile,type),tile.dom}clear(){for(let i=0;i<this.buckets.length;i++)this.buckets[i].length=this.index[i]=0}}// This class organizes a pass over the document, guided by the array
// of replaced ranges. For ranges that haven't changed, it iterates
// the old tree and copies its content into the new document. For
// changed ranges, it runs a decoration iterator to guide generation
// of content.
class TileUpdate{constructor(view,old,blockWrappers,decorations,disallowBlockEffectsFor){this.view=view,this.decorations=decorations,this.disallowBlockEffectsFor=disallowBlockEffectsFor,this.openWidget=!1,this.openMarks=0,this.cache=new TileCache(view),this.text=new TextStream(view.state.doc),this.builder=new TileBuilder(this.cache,new DocTile(view,view.contentDOM),state.RangeSet.iter(blockWrappers)),this.cache.reused.set(old,2/* Reused.DOM */),this.old=new TilePointer(old),this.reuseWalker={skip:(tile,from,to)=>{if(this.cache.add(tile),tile.isComposite())return!1},enter:tile=>this.cache.add(tile),leave:()=>{},break:()=>{}}}run(changes,composition){let compositionContext=composition&&this.getCompositionContext(composition.text);for(let posA=0,posB=0,i=0;;){let next=i<changes.length?changes[i++]:null,skipA=next?next.fromA:this.old.root.length;if(skipA>posA){let len=skipA-posA;this.preserve(len,!i,!next),posA=skipA,posB+=len}if(!next)break;// Compositions need to be handled specially, forcing the
// focused text node and its parent nodes to remain stable at
// that point in the document.
composition&&next.fromA<=composition.range.fromA&&next.toA>=composition.range.toA?(this.forward(next.fromA,composition.range.fromA,composition.range.fromA<composition.range.toA?1:-1),this.emit(posB,composition.range.fromB),this.cache.clear(),this.builder.addComposition(composition,compositionContext),this.text.skip(composition.range.toB-composition.range.fromB),this.forward(composition.range.fromA,next.toA),this.emit(composition.range.toB,next.toB)):(this.forward(next.fromA,next.toA),this.emit(posB,next.toB)),posB=next.toB,posA=next.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(length,incStart,incEnd){let activeMarks=getMarks(this.old),openMarks=this.openMarks;this.old.advance(length,incEnd?1:-1,{skip:(tile,from,to)=>{if(tile.isWidget()){if(this.openWidget)this.builder.continueWidget(to-from);else{let widget=0<to||from<tile.length?WidgetTile.of(tile.widget,this.view,to-from,496&tile.flags/* TileFlag.Widget */,this.cache.maybeReuse(tile)):this.cache.reuse(tile);256&widget.flags/* TileFlag.Block */?(widget.flags&=-2/* TileFlag.BreakAfter */,this.builder.addBlockWidget(widget)):(this.builder.ensureLine(null),this.builder.addInlineWidget(widget,activeMarks,openMarks),openMarks=activeMarks.length)}}else if(tile.isText())this.builder.ensureLine(null),from||to!=tile.length||this.cache.reused.has(tile)?(this.cache.add(tile),this.builder.addText(tile.text.slice(from,to),activeMarks,openMarks)):this.builder.addText(tile.text,activeMarks,openMarks,this.cache.reuse(tile)),openMarks=activeMarks.length;else if(tile.isLine())tile.flags&=-2/* TileFlag.BreakAfter */,this.cache.reused.set(tile,1/* Reused.Full */),this.builder.addLine(tile);else if(tile instanceof WidgetBufferTile)this.cache.add(tile);else if(tile instanceof MarkTile)this.builder.ensureLine(null),this.builder.addMark(tile,activeMarks,openMarks),this.cache.reused.set(tile,1/* Reused.Full */),openMarks=activeMarks.length;else return!1;this.openWidget=!1},enter:tile=>{tile.isLine()?this.builder.addLineStart(tile.attrs,this.cache.maybeReuse(tile)):(this.cache.add(tile),tile instanceof MarkTile&&activeMarks.unshift(tile.mark)),this.openWidget=!1},leave:tile=>{tile.isLine()?activeMarks.length&&(activeMarks.length=openMarks=0):tile instanceof MarkTile&&(activeMarks.shift(),openMarks=Math.min(openMarks,activeMarks.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(length)}emit(from,to){let pendingLineAttrs=null,b=this.builder,markCount=0,openEnd=state.RangeSet.spans(this.decorations,from,to,{point:(from,to,deco,active,openStart,index)=>{if(deco instanceof PointDecoration){if(this.disallowBlockEffectsFor[index]){if(deco.block)throw new RangeError("Block decorations may not be specified via plugins");if(to>this.view.state.doc.lineAt(from).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(markCount=active.length,openStart>active.length)b.continueWidget(to-from);else{let widget=deco.widget||(deco.block?NullWidget.block:NullWidget.inline),flags=widgetFlags(deco),tile=this.cache.findWidget(widget,to-from,flags)||WidgetTile.of(widget,this.view,to-from,flags);deco.block?(0<deco.startSide&&b.addLineStartIfNotCovered(pendingLineAttrs),b.addBlockWidget(tile)):(b.ensureLine(pendingLineAttrs),b.addInlineWidget(tile,active,openStart))}pendingLineAttrs=null}else pendingLineAttrs=addLineDeco(pendingLineAttrs,deco);to>from&&this.text.skip(to-from)},span:(from,to,active,openStart)=>{for(let pos=from,chars;pos<to;)chars=this.text.next(Math.min(512/* C.Chunk */,to-pos)),null==chars?(b.addLineStartIfNotCovered(pendingLineAttrs),b.addBreak(),pos++):(b.ensureLine(pendingLineAttrs),b.addText(chars,active,pos==from?openStart:active.length),pos+=chars.length),pendingLineAttrs=null}});b.addLineStartIfNotCovered(pendingLineAttrs),this.openWidget=openEnd>markCount,this.openMarks=openEnd}forward(from,to,side=1){10>=to-from?this.old.advance(to-from,side,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(to-from-10,-1),this.old.advance(5,side,this.reuseWalker))}getCompositionContext(text){let marks=[],line=null;for(let parent=text.parentNode,tile;;parent=parent.parentNode){if(tile=Tile.get(parent),parent==this.view.contentDOM)break;if(tile instanceof MarkTile)marks.push(tile);else if(null===tile||void 0===tile?void 0:tile.isLine())line=tile;else if(tile instanceof BlockWrapperTile);// Ignore
else"DIV"!=parent.nodeName||line||parent==this.view.contentDOM?line||marks.push(MarkTile.of(new MarkDecoration({tagName:parent.nodeName.toLowerCase(),attributes:getAttrs(parent)}),parent)):line=new LineTile(parent,lineBaseAttrs)}return{line:line,marks}}}const lineBaseAttrs={class:"cm-line"};class NullWidget extends WidgetType{constructor(tag){super(),this.tag=tag}eq(other){return other.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(elt){return elt.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}NullWidget.inline=new NullWidget("span"),NullWidget.block=new NullWidget("div");const BreakWidget=new class extends WidgetType{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class DocView{constructor(view){this.view=view,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=Decoration.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new DocTile(view,view.contentDOM),this.updateInner([new ChangedRange(0,0,0,view.state.doc.length)],null)}// Update the document view to a given state.
update(update){var _a;let changedRanges=update.changedRanges;0<this.minWidth&&changedRanges.length&&(changedRanges.every(({fromA,toA})=>toA<this.minWidthFrom||fromA>this.minWidthTo)?(this.minWidthFrom=update.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=update.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(update);let readCompositionAt=-1;0<=this.view.inputState.composing&&!this.view.observer.editContext&&((null===(_a=this.domChanged)||void 0===_a?void 0:_a.newSel)?readCompositionAt=this.domChanged.newSel.head:!touchesComposition(update.changes,this.hasComposition)&&!update.selectionSet&&(readCompositionAt=update.state.selection.main.head));let composition=-1<readCompositionAt?findCompositionRange(this.view,update.changes,readCompositionAt):null;if(this.domChanged=null,this.hasComposition){let{from,to}=this.hasComposition;changedRanges=new ChangedRange(from,to,update.changes.mapPos(from,-1),update.changes.mapPos(to,1)).addToSet(changedRanges.slice())}this.hasComposition=composition?{from:composition.range.fromB,to:composition.range.toB}:null,(browser.ie||browser.chrome)&&!composition&&update&&update.state.doc.lines!=update.startState.doc.lines&&(this.forceSelection=!0);let prevDeco=this.decorations,prevWrappers=this.blockWrappers;this.updateDeco();let decoDiff=findChangedDeco(prevDeco,this.decorations,update.changes);decoDiff.length&&(changedRanges=ChangedRange.extendWithRanges(changedRanges,decoDiff));let blockDiff=findChangedWrappers(prevWrappers,this.blockWrappers,update.changes);return blockDiff.length&&(changedRanges=ChangedRange.extendWithRanges(changedRanges,blockDiff)),composition&&!changedRanges.some(r=>r.fromA<=composition.range.fromA&&r.toA>=composition.range.toA)&&(changedRanges=composition.range.addToSet(changedRanges.slice())),!(2&this.tile.flags/* TileFlag.Synced */&&0==changedRanges.length)&&(this.updateInner(changedRanges,composition),update.transactions.length&&(this.lastUpdate=Date.now()),!0)}// Used by update and the constructor do perform the actual DOM
// update
updateInner(changes,composition){this.view.viewState.mustMeasureContent=!0;let{observer}=this.view;observer.ignore(()=>{if(composition||changes.length){let oldTile=this.tile,builder=new TileUpdate(this.view,oldTile,this.blockWrappers,this.decorations,this.dynamicDecorationMap);composition&&Tile.get(composition.text)&&builder.cache.reused.set(Tile.get(composition.text),2/* Reused.DOM */),this.tile=builder.run(changes,composition),destroyDropped(oldTile,builder.cache.reused)}// Lock the height during redrawing, since Chrome sometimes
// messes with the scroll position during DOM mutation (though
// no relayout is triggered and I cannot imagine how it can
// recompute the scroll position without a layout)
this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";// Chrome will sometimes, when DOM mutations occur directly
// around the selection, get confused and report a different
// selection from the one it displays (issue #218). This tries
// to detect that situation.
let track=browser.chrome||browser.ios?{node:observer.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(track),track&&(track.written||observer.selectionRange.focusNode!=track.node||!this.tile.dom.contains(track.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let gaps=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let child of this.tile.children)child.isWidget()&&child.widget instanceof BlockGapWidget&&gaps.push(child.dom);observer.updateGaps(gaps)}updateEditContextFormatting(update){this.editContextFormatting=this.editContextFormatting.map(update.changes);for(let tr of update.transactions)for(let effect of tr.effects)effect.is(setEditContextFormatting)&&(this.editContextFormatting=effect.value)}// Sync the DOM selection to this.state.selection
updateSelection(mustRead=!1,fromPointer=!1){(mustRead||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom}=this.tile,activeElt=this.view.root.activeElement,focused=activeElt==dom,selectionNotFocus=!focused&&!(this.view.state.facet(editable)||-1<dom.tabIndex)&&hasSelection(dom,this.view.observer.selectionRange)&&!(activeElt&&dom.contains(activeElt));if(!(focused||fromPointer||selectionNotFocus))return;let force=this.forceSelection;this.forceSelection=!1;let main=this.view.state.selection.main,anchor,head;// Always reset on Firefox when next to an uneditable node to
// avoid invisible cursor bugs (#111)
if(main.empty?head=anchor=this.inlineDOMNearPos(main.anchor,main.assoc||1):(head=this.inlineDOMNearPos(main.head,main.head==main.from?1:-1),anchor=this.inlineDOMNearPos(main.anchor,main.anchor==main.from?1:-1)),browser.gecko&&main.empty&&!this.hasComposition&&betweenUneditable(anchor)){let dummy=document.createTextNode("");this.view.observer.ignore(()=>anchor.node.insertBefore(dummy,anchor.node.childNodes[anchor.offset]||null)),anchor=head=new DOMPos(dummy,0),force=!0}let domSel=this.view.observer.selectionRange;// If the selection is already here, or in an equivalent position, don't touch it
!force&&domSel.focusNode&&(isEquivalentPosition(anchor.node,anchor.offset,domSel.anchorNode,domSel.anchorOffset)&&isEquivalentPosition(head.node,head.offset,domSel.focusNode,domSel.focusOffset)||this.suppressWidgetCursorChange(domSel,main))||(this.view.observer.ignore(()=>{browser.android&&browser.chrome&&dom.contains(domSel.focusNode)&&inUneditable(domSel.focusNode,dom)&&(dom.blur(),dom.focus({preventScroll:!0}));let rawSel=getSelection(this.view.root);if(!rawSel);else if(main.empty){// Work around https://bugzilla.mozilla.org/show_bug.cgi?id=1612076
if(browser.gecko){let nextTo=nextToUneditable(anchor.node,anchor.offset);if(nextTo&&3/* NextTo.After */!=nextTo){let text=(1==nextTo/* NextTo.Before */?textNodeBefore:textNodeAfter)(anchor.node,anchor.offset);text&&(anchor=new DOMPos(text.node,text.offset))}}rawSel.collapse(anchor.node,anchor.offset),null!=main.bidiLevel&&void 0!==rawSel.caretBidiLevel&&(rawSel.caretBidiLevel=main.bidiLevel)}else if(rawSel.extend){rawSel.collapse(anchor.node,anchor.offset);// Safari will ignore the call above when the editor is
// hidden, and then raise an error on the call to extend
// (#940).
try{rawSel.extend(head.node,head.offset)}catch(_){}}else{// Primitive (IE) way
let range=document.createRange();main.anchor>main.head&&([anchor,head]=[head,anchor]),range.setEnd(head.node,head.offset),range.setStart(anchor.node,anchor.offset),rawSel.removeAllRanges(),rawSel.addRange(range)}selectionNotFocus&&this.view.root.activeElement==dom&&(dom.blur(),activeElt&&activeElt.focus())}),this.view.observer.setSelectionRange(anchor,head)),this.impreciseAnchor=anchor.precise?null:new DOMPos(domSel.anchorNode,domSel.anchorOffset),this.impreciseHead=head.precise?null:new DOMPos(domSel.focusNode,domSel.focusOffset)}// If a zero-length widget is inserted next to the cursor during
// composition, avoid moving it across it and disrupting the
// composition.
suppressWidgetCursorChange(sel,cursor){return this.hasComposition&&cursor.empty&&isEquivalentPosition(sel.focusNode,sel.focusOffset,sel.anchorNode,sel.anchorOffset)&&this.posFromDOM(sel.focusNode,sel.focusOffset)==cursor.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view}=this,cursor=view.state.selection.main,sel=getSelection(view.root),{anchorNode,anchorOffset}=view.observer.selectionRange;if(sel&&cursor.empty&&cursor.assoc&&sel.modify){let line=this.lineAt(cursor.head,cursor.assoc);if(line){let lineStart=line.posAtStart;if(cursor.head!=lineStart&&cursor.head!=lineStart+line.length){let before=this.coordsAt(cursor.head,-1),after=this.coordsAt(cursor.head,1);if(before&&after&&!(before.bottom>after.top)){let dom=this.domAtPos(cursor.head+cursor.assoc,cursor.assoc);sel.collapse(dom.node,dom.offset),sel.modify("move",0>cursor.assoc?"forward":"backward","lineboundary"),view.observer.readSelectionRange();let newRange=view.observer.selectionRange;view.docView.posFromDOM(newRange.anchorNode,newRange.anchorOffset)!=cursor.from&&sel.collapse(anchorNode,anchorOffset)}}}}}posFromDOM(node,offset){let tile=this.tile.nearest(node);if(!tile)return 2&this.tile.dom.compareDocumentPosition(node)/* PRECEDING */?0:this.view.state.doc.length;let start=tile.posAtStart;if(tile.isComposite()){let after;if(node==tile.dom)after=tile.dom.childNodes[offset];else{let bias=0==maxOffset(node)?0:0==offset?-1:1;for(;;){let parent=node.parentNode;if(parent==tile.dom)break;0==bias&&parent.firstChild!=parent.lastChild&&(node==parent.firstChild?bias=-1:bias=1),node=parent}after=0>bias?node:node.nextSibling}if(after==tile.dom.firstChild)return start;for(;after&&!Tile.get(after);)after=after.nextSibling;if(!after)return start+tile.length;for(let i=0,pos=start,child;;i++){if(child=tile.children[i],child.dom==after)return pos;pos+=child.length+child.breakAfter}}else return tile.isText()?node==tile.dom?start+offset:start+(offset?tile.length:0):start}domAtPos(pos,side){let{tile,offset}=this.tile.resolveBlock(pos,side);return tile.isWidget()?tile.domPosFor(pos,side):tile.domIn(offset,side)}inlineDOMNearPos(pos,side){let beforeOff=-1,beforeBad=!1,afterOff=-1,afterBad=!1,before,after;return(this.tile.blockTiles((tile,off)=>{if(tile.isWidget()){if(32&tile.flags/* TileFlag.After */&&off>=pos)return!0;16&tile.flags/* TileFlag.Before */&&(beforeBad=!0)}else{let end=off+tile.length;if(off<=pos&&(before=tile,beforeOff=pos-off,beforeBad=end<pos),end>=pos&&!after&&(after=tile,afterOff=pos-off,afterBad=off>pos),off>pos&&after)return!0}}),!before&&!after)?this.domAtPos(pos,side):(beforeBad&&after?before=null:afterBad&&before&&(after=null),before&&0>side||!after?before.domIn(beforeOff,side):after.domIn(afterOff,side))}coordsAt(pos,side){let{tile,offset}=this.tile.resolveBlock(pos,side);return tile.isWidget()?tile.widget instanceof BlockGapWidget?null:tile.coordsInWidget(offset,side,!0):tile.coordsIn(offset,side)}lineAt(pos,side){let{tile}=this.tile.resolveBlock(pos,side);return tile.isLine()?tile:null}coordsForChar(pos){function scan(tile,offset){if(tile.isComposite())for(let ch of tile.children){if(ch.length>=offset){let found=scan(ch,offset);if(found)return found}if(offset-=ch.length,0>offset)break}else if(tile.isText()&&offset<tile.length){let end=state.findClusterBreak(tile.text,offset);if(end==offset)return null;let rects=textRange(tile.dom,offset,end).getClientRects();for(let i=0,rect;i<rects.length;i++)if(rect=rects[i],i==rects.length-1||rect.top<rect.bottom&&rect.left<rect.right)return rect}return null}let{tile,offset}=this.tile.resolveBlock(pos,1);return tile.isLine()?scan(tile,offset):null}measureVisibleLineHeights(viewport){let result=[],{from,to}=viewport,contentWidth=this.view.contentDOM.clientWidth,isWider=contentWidth>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,widest=-1,ltr=this.view.textDirection==exports.Direction.LTR,spaceAbove=0,scan=(tile,pos,measureBounds)=>{for(let i=0;i<tile.children.length&&!(pos>to);i++){let child=tile.children[i],end=pos+child.length,childRect=child.dom.getBoundingClientRect(),{height}=childRect;if(measureBounds&&!i&&(spaceAbove+=childRect.top-measureBounds.top),child instanceof BlockWrapperTile)end>from&&scan(child,pos,childRect);else if(pos>=from&&(0<spaceAbove&&result.push(-spaceAbove),result.push(height+spaceAbove),spaceAbove=0,isWider)){let last=child.dom.lastChild,rects=last?clientRectsFor(last):[];if(rects.length){let rect=rects[rects.length-1],width=ltr?rect.right-childRect.left:childRect.right-rect.left;width>widest&&(widest=width,this.minWidth=contentWidth,this.minWidthFrom=pos,this.minWidthTo=end)}}measureBounds&&i==tile.children.length-1&&(spaceAbove+=measureBounds.bottom-childRect.bottom),pos=end+child.breakAfter}};return scan(this.tile,0,null),result}textDirectionAt(pos){let{tile}=this.tile.resolveBlock(pos,1);return"rtl"==getComputedStyle(tile.dom).direction?exports.Direction.RTL:exports.Direction.LTR}measureTextSize(){let lineMeasure=this.tile.blockTiles(tile=>{if(tile.isLine()&&tile.children.length&&20>=tile.length){let totalWidth=0,textHeight;for(let child of tile.children){if(!child.isText()||/[^ -~]/.test(child.text))return;let rects=clientRectsFor(child.dom);if(1!=rects.length)return;totalWidth+=rects[0].width,textHeight=rects[0].height}if(totalWidth)return{lineHeight:tile.dom.getBoundingClientRect().height,charWidth:totalWidth/tile.length,textHeight}}});if(lineMeasure)return lineMeasure;// If no workable line exists, force a layout of a measurable element
let dummy=document.createElement("div"),lineHeight,charWidth,textHeight;return dummy.className="cm-line",dummy.style.width="99999px",dummy.style.position="absolute",dummy.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(dummy);let rect=clientRectsFor(dummy.firstChild)[0];lineHeight=dummy.getBoundingClientRect().height,charWidth=rect&&rect.width?rect.width/27:7,textHeight=rect&&rect.height?rect.height:lineHeight,dummy.remove()}),{lineHeight,charWidth,textHeight}}computeBlockGapDeco(){let deco=[],vs=this.view.viewState;for(let pos=0,i=0;;i++){let next=i==vs.viewports.length?null:vs.viewports[i],end=next?next.from-1:this.view.state.doc.length;if(end>pos){let height=(vs.lineBlockAt(end).bottom-vs.lineBlockAt(pos).top)/this.view.scaleY;deco.push(Decoration.replace({widget:new BlockGapWidget(height),block:!0,inclusive:!0,isBlockGap:!0}).range(pos,end))}if(!next)break;pos=next.to+1}return Decoration.set(deco)}updateDeco(){let i=1,allDeco=this.view.state.facet(decorations).map(d=>{let dynamic=this.dynamicDecorationMap[i++]="function"==typeof d;return dynamic?d(this.view):d}),dynamicOuter=!1,outerDeco=this.view.state.facet(outerDecorations).map((d,i)=>{let dynamic="function"==typeof d;return dynamic&&(dynamicOuter=!0),dynamic?d(this.view):d});for(outerDeco.length&&(this.dynamicDecorationMap[i++]=dynamicOuter,allDeco.push(state.RangeSet.join(outerDeco))),this.decorations=[this.editContextFormatting,...allDeco,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];i<this.decorations.length;)this.dynamicDecorationMap[i++]=!1;this.blockWrappers=this.view.state.facet(blockWrappers).map(v=>"function"==typeof v?v(this.view):v)}scrollIntoView(target){var _a;if(target.isSnapshot){let ref=this.view.viewState.lineBlockAt(target.range.head);return this.view.scrollDOM.scrollTop=ref.top-target.yMargin,void(this.view.scrollDOM.scrollLeft=target.xMargin)}for(let handler of this.view.state.facet(scrollHandler))try{if(handler(this.view,target.range,target))return!0}catch(e){logException(this.view.state,e,"scroll handler")}let{range}=target,rect=this.coordsAt(range.head,null!==(_a=range.assoc)&&void 0!==_a?_a:range.empty?0:range.head>range.anchor?-1:1),other;if(!rect)return;!range.empty&&(other=this.coordsAt(range.anchor,range.anchor>range.head?-1:1))&&(rect={left:Math.min(rect.left,other.left),top:Math.min(rect.top,other.top),right:Math.max(rect.right,other.right),bottom:Math.max(rect.bottom,other.bottom)});let margins=getScrollMargins(this.view),targetRect={left:rect.left-margins.left,top:rect.top-margins.top,right:rect.right+margins.right,bottom:rect.bottom+margins.bottom},{offsetWidth,offsetHeight}=this.view.scrollDOM;// On mobile browsers, the visual viewport may be smaller than the
// actual reported viewport, causing scrollRectIntoView to fail to
// scroll properly. Unfortunately, this visual viewport cannot be
// updated directly, and scrollIntoView is the only way a script
// can affect it. So this tries to kludge around the problem by
// calling scrollIntoView on the scroll target's line.
if(scrollRectIntoView(this.view.scrollDOM,targetRect,range.head<range.anchor?-1:1,target.x,target.y,Math.max(Math.min(target.xMargin,offsetWidth),-offsetWidth),Math.max(Math.min(target.yMargin,offsetHeight),-offsetHeight),this.view.textDirection==exports.Direction.LTR),window.visualViewport&&1<window.innerHeight-window.visualViewport.height&&(rect.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||rect.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let line=this.view.docView.lineAt(range.head,1);line&&line.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(pos){let scan=child=>child.isWidget()||child.children.some(scan);return scan(this.tile.resolveBlock(pos,1).tile)}destroy(){destroyDropped(this.tile)}}let DecorationComparator$1=class DecorationComparator{constructor(){this.changes=[]}compareRange(from,to){addRange(from,to,this.changes)}comparePoint(from,to){addRange(from,to,this.changes)}boundChange(pos){addRange(pos,pos,this.changes)}};class WrapperComparator{constructor(){this.changes=[]}compareRange(from,to){addRange(from,to,this.changes)}comparePoint(){}boundChange(pos){addRange(pos,pos,this.changes)}}class BlockGapWidget extends WidgetType{constructor(height){super(),this.height=height}toDOM(){let elt=document.createElement("div");return elt.className="cm-gap",this.updateDOM(elt),elt}eq(other){return other.height==this.height}updateDOM(elt){return elt.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}class PosAssoc{constructor(pos,assoc){this.pos=pos,this.assoc=assoc}}class InlineCoordsScan{constructor(view,x,y,baseDir){this.view=view,this.x=x,this.y=y,this.baseDir=baseDir,this.line=null,this.spans=null}bidiSpansAt(pos){return(!this.line||this.line.from>pos||this.line.to<pos)&&(this.line=this.view.state.doc.lineAt(pos),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(pos,side){let{line,spans}=this.bidiSpansAt(pos),level=spans[BidiSpan.find(spans,pos-line.from,-1,side)].level;return level==this.baseDir}dirAt(pos,side){let{line,spans}=this.bidiSpansAt(pos);return spans[BidiSpan.find(spans,pos-line.from,-1,side)].dir}// Used to short-circuit bidi tests for content with a uniform direction
bidiIn(from,to){let{spans,line}=this.bidiSpansAt(from);return 1<spans.length||spans.length&&(spans[0].level!=this.baseDir||spans[0].to+line.from<to)}// Scan through the rectangles for the content of a tile with inline
// content, looking for one that overlaps the queried position
// vertically andis
// closest horizontally. The caller is responsible for dividing its
// content into N pieces, and pass an array with N+1 positions
// (including the position after the last piece). For a text tile,
// these will be character clusters, for a composite tile, these
// will be child tiles.
scan(positions,getRects,recursed=!1){let lo=0,hi=positions.length-1,seen=new Set,bidi=this.bidiIn(positions[0],positions[hi]),closestI=-1,closestDx=1e9,above,below,closestRect;// Because, when the content is bidirectional, a regular binary
// search is hard to perform (the content order does not
// correspond to visual order), this loop does something between a
// regular binary search and a full scan, depending on what it can
// get away with. The outer hi/lo bounds are only adjusted for
// elements that are part of the base order.
//
// To make sure all elements inside those bounds are visited,
// eventually, we keep a set of seen indices, and if the midpoint
// has already been handled, we start in a random index within the
// current bounds and scan forward until we find an index that
// hasn't been seen yet.
search:for(;lo<hi;){let dist=hi-lo,mid=lo+hi>>1;adjust:if(seen.has(mid)){let scan=lo+Math.floor(Math.random()*dist);for(let i=0;i<dist;i++){if(!seen.has(scan)){mid=scan;break adjust}scan++,scan==hi&&(scan=lo)}break search;// No index found, we're done
}seen.add(mid);let rects=getRects(mid);if(rects)for(let i=0;i<rects.length;i++){let rect=rects[i],side=0;// Ignore empty rectangles when there are other rectangles
if(!(0==rect.width&&1<rects.length)){if(rect.bottom<this.y)(!above||above.bottom<rect.bottom)&&(above=rect),side=1;else if(rect.top>this.y)(!below||below.top>rect.top)&&(below=rect),side=-1;else{let off=rect.left>this.x?this.x-rect.left:rect.right<this.x?this.x-rect.right:0,dx=Math.abs(off);dx<closestDx&&(closestI=mid,closestDx=dx,closestRect=rect),off&&(side=0>off==(this.baseDir==exports.Direction.LTR)?-1:1)}// Narrow binary search when it is safe to do so
-1==side&&(!bidi||this.baseDirAt(positions[mid],1))?hi=mid:1==side&&(!bidi||this.baseDirAt(positions[mid+1],-1))&&(lo=mid+1)}}}// If no element with y overlap is found, find the nearest element
// on the y axis, move this.y into it, and retry the scan.
if(!closestRect){let side=above&&(!below||this.y-above.bottom<below.top-this.y)?above:below;return this.y=(side.top+side.bottom)/2,this.scan(positions,getRects,!0)}// Handle the case where closest matched a higher element on the
// same line as an element below/above the coords
if(closestDx&&!recursed){let{top,bottom}=closestRect;if(above&&above.bottom>(top+top+bottom)/3)return this.y=above.bottom-1,this.scan(positions,getRects,!0);if(below&&below.top<(top+bottom+bottom)/3)return this.y=below.top+1,this.scan(positions,getRects,!0)}let ltr=(bidi?this.dirAt(positions[closestI],1):this.baseDir)==exports.Direction.LTR;return{i:closestI,// Test whether x is closes to the start or end of this element
after:this.x>(closestRect.left+closestRect.right)/2==ltr}}scanText(tile,offset){let positions=[];for(let i=0;i<tile.length;i=state.findClusterBreak(tile.text,i))positions.push(offset+i);positions.push(offset+tile.length);let scan=this.scan(positions,i=>{let off=positions[i]-offset,end=positions[i+1]-offset;return textRange(tile.dom,off,end).getClientRects()});return scan.after?new PosAssoc(positions[scan.i+1],-1):new PosAssoc(positions[scan.i],1)}scanTile(tile,offset){if(!tile.length)return new PosAssoc(offset,1);if(1==tile.children.length){// Short-circuit single-child tiles
let child=tile.children[0];if(child.isText())return this.scanText(child,offset);if(child.isComposite())return this.scanTile(child,offset)}let positions=[offset];for(let i=0,pos=offset;i<tile.children.length;i++)positions.push(pos+=tile.children[i].length);let scan=this.scan(positions,i=>{let child=tile.children[i];return 48&child.flags/* TileFlag.PointWidget */?null:(1==child.dom.nodeType?child.dom:textRange(child.dom,0,child.length)).getClientRects()}),child=tile.children[scan.i],pos=positions[scan.i];return child.isText()?this.scanText(child,pos):child.isComposite()?this.scanTile(child,pos):scan.after?new PosAssoc(positions[scan.i+1],-1):new PosAssoc(pos,1)}}const LineBreakPlaceholder="\uFFFF";class DOMReader{constructor(points,view){this.points=points,this.view=view,this.text="",this.lineSeparator=view.state.facet(state.EditorState.lineSeparator)}append(text){this.text+=text}lineBreak(){this.text+=LineBreakPlaceholder}readRange(start,end){if(!start)return this;let parent=start.parentNode;for(let cur=start;;){this.findPointBefore(parent,cur);let oldLen=this.text.length;this.readNode(cur);let tile=Tile.get(cur),next=cur.nextSibling;if(next==end){(null===tile||void 0===tile?void 0:tile.breakAfter)&&!next&&parent!=this.view.contentDOM&&this.lineBreak();break}let nextTile=Tile.get(next);(tile&&nextTile?tile.breakAfter:(tile?tile.breakAfter:isBlockElement(cur))||isBlockElement(next)&&("BR"!=cur.nodeName||(null===tile||void 0===tile?void 0:tile.isWidget()))&&this.text.length>oldLen)&&!isEmptyToEnd(next,end)&&this.lineBreak(),cur=next}return this.findPointBefore(parent,end),this}readTextNode(node){let text=node.nodeValue;for(let point of this.points)point.node==node&&(point.pos=this.text.length+Math.min(point.offset,text.length));for(let off=0,re=this.lineSeparator?null:/\r\n?|\n/g;;){let nextBreak=-1,breakSize=1,m;if(this.lineSeparator?(nextBreak=text.indexOf(this.lineSeparator,off),breakSize=this.lineSeparator.length):(m=re.exec(text))&&(nextBreak=m.index,breakSize=m[0].length),this.append(text.slice(off,0>nextBreak?text.length:nextBreak)),0>nextBreak)break;if(this.lineBreak(),1<breakSize)for(let point of this.points)point.node==node&&point.pos>this.text.length&&(point.pos-=breakSize-1);off=nextBreak+breakSize}}readNode(node){let tile=Tile.get(node),fromView=tile&&tile.overrideDOMText;if(null!=fromView){this.findPointInside(node,fromView.length);for(let i=fromView.iter();!i.next().done;)i.lineBreak?this.lineBreak():this.append(i.value)}else 3==node.nodeType?this.readTextNode(node):"BR"==node.nodeName?node.nextSibling&&this.lineBreak():1==node.nodeType&&this.readRange(node.firstChild,null)}findPointBefore(node,next){for(let point of this.points)point.node==node&&node.childNodes[point.offset]==next&&(point.pos=this.text.length)}findPointInside(node,length){for(let point of this.points)(3==node.nodeType?point.node==node:node.contains(point.node))&&(point.pos=this.text.length+(isAtEnd(node,point.node,point.offset)?length:0))}}class DOMPoint{constructor(node,offset){this.node=node,this.offset=offset,this.pos=-1}}class DOMChange{constructor(view,start,end,typeOver){this.typeOver=typeOver,this.bounds=null,this.text="",this.domChanged=-1<start;let{impreciseHead:iHead,impreciseAnchor:iAnchor}=view.docView,curSel=view.state.selection;if(view.state.readOnly&&-1<start)this.newSel=null;else if(-1<start&&(this.bounds=domBoundsAround(view.docView.tile,start,end,0))){let selPoints=iHead||iAnchor?[]:selectionPoints(view),reader=new DOMReader(selPoints,view);reader.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=reader.text,this.newSel=selectionFromPoints(selPoints,this.bounds.from)}else{let domSel=view.observer.selectionRange,head=iHead&&iHead.node==domSel.focusNode&&iHead.offset==domSel.focusOffset||!contains(view.contentDOM,domSel.focusNode)?curSel.main.head:view.docView.posFromDOM(domSel.focusNode,domSel.focusOffset),anchor=iAnchor&&iAnchor.node==domSel.anchorNode&&iAnchor.offset==domSel.anchorOffset||!contains(view.contentDOM,domSel.anchorNode)?curSel.main.anchor:view.docView.posFromDOM(domSel.anchorNode,domSel.anchorOffset),vp=view.viewport;// iOS will refuse to select the block gaps when doing
// select-all.
// Chrome will put the selection *inside* them, confusing
// posFromDOM
if((browser.ios||browser.chrome)&&curSel.main.empty&&head!=anchor&&(0<vp.from||vp.to<view.state.doc.length)){let from=Math.min(head,anchor),to=Math.max(head,anchor),offFrom=vp.from-from,offTo=vp.to-to;(0==offFrom||1==offFrom||0==from)&&(0==offTo||-1==offTo||to==view.state.doc.length)&&(head=0,anchor=view.state.doc.length)}if(-1<view.inputState.composing&&1<curSel.ranges.length)this.newSel=curSel.replaceRange(state.EditorSelection.range(anchor,head));else if(view.lineWrapping&&anchor==head&&!(curSel.main.empty&&curSel.main.head==head)&&view.inputState.lastTouchTime>Date.now()-100){// If this is a cursor selection change in a line-wrapping
// editor that may have been a touch, use the last touch
// position to assign a side to the cursor.
let before=view.coordsAtPos(head,-1),assoc=0;before&&(assoc=view.inputState.lastTouchY<=before.bottom?-1:1),this.newSel=state.EditorSelection.create([state.EditorSelection.cursor(head,assoc)])}else this.newSel=state.EditorSelection.single(anchor,head)}}}class InputState{setSelectionOrigin(origin){this.lastSelectionOrigin=origin,this.lastSelectionTime=Date.now()}constructor(view){this.view=view,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=view.hasFocus,browser.safari&&view.contentDOM.addEventListener("input",()=>null),browser.gecko&&firefoxCopyCutHack(view.contentDOM.ownerDocument)}handleEvent(event){!eventBelongsToEditor(this.view,event)||this.ignoreDuringComposition(event)||"keydown"==event.type&&this.keydown(event)||(0==this.view.updateState/* UpdateState.Idle */?this.runHandlers(event.type,event):Promise.resolve().then(()=>this.runHandlers(event.type,event)))}runHandlers(type,event){let handlers=this.handlers[type];if(handlers){for(let observer of handlers.observers)observer(this.view,event);for(let handler of handlers.handlers){if(event.defaultPrevented)break;if(handler(this.view,event)){event.preventDefault();break}}}}ensureHandlers(plugins){let handlers=computeHandlers(plugins),prev=this.handlers,dom=this.view.contentDOM;for(let type in handlers)if("scroll"!=type){let passive=!handlers[type].handlers.length,exists=prev[type];exists&&passive!=!exists.handlers.length&&(dom.removeEventListener(type,this.handleEvent),exists=null),exists||dom.addEventListener(type,this.handleEvent,{passive})}for(let type in prev)"scroll"==type||handlers[type]||dom.removeEventListener(type,this.handleEvent);this.handlers=handlers}keydown(event){if(this.lastKeyCode=event.keyCode,this.lastKeyTime=Date.now(),9==event.keyCode&&-1<this.tabFocusMode&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;// Chrome for Android usually doesn't fire proper key events, but
// occasionally does, usually surrounded by a bunch of complicated
// composition changes. When an enter or backspace key event is
// seen, hold off on handling DOM events for a bit, and then
// dispatch it.
if(0<this.tabFocusMode&&27!=event.keyCode&&0>modifierCodes.indexOf(event.keyCode)&&(this.tabFocusMode=-1),browser.android&&browser.chrome&&!event.synthetic&&(13==event.keyCode||8==event.keyCode))return this.view.observer.delayAndroidKey(event.key,event.keyCode),!0;// Preventing the default behavior of Enter on iOS makes the
// virtual keyboard get stuck in the wrong (lowercase)
// state. So we let it go through, and then, in
// applyDOMChange, notify key handlers of it and reset to
// the state they produce.
let pending;return!browser.ios||event.synthetic||event.altKey||event.metaKey||event.shiftKey||(!(pending=PendingKeys.find(key=>key.keyCode==event.keyCode))||event.ctrlKey)&&(!(-1<EmacsyPendingKeys.indexOf(event.key))||!event.ctrlKey)?(229!=event.keyCode&&this.view.observer.forceFlush(),!1):(this.pendingIOSKey=pending||event,setTimeout(()=>this.flushIOSKey(),250),!0)}flushIOSKey(change){let key=this.pendingIOSKey;return!!key&&!("Enter"==key.key&&change&&change.from<change.to&&/^\S+$/.test(change.insert.toString()))&&(this.pendingIOSKey=void 0,dispatchKey(this.view.contentDOM,key.key,key.keyCode,key instanceof KeyboardEvent?key:void 0));// This looks like an autocorrection before Enter
}ignoreDuringComposition(event){return /^key/.test(event.type)&&!event.synthetic&&(!!(0<this.composing)||!!(browser.safari&&!browser.ios&&this.compositionPendingKey&&100>Date.now()-this.compositionEndedAt)&&(this.compositionPendingKey=!1,!0));// See https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/.
// On some input method editors (IMEs), the Enter key is used to
// confirm character selection. On Safari, when Enter is pressed,
// compositionend and keydown events are sometimes emitted in the
// wrong order. The key event should still be ignored, even when
// it happens after the compositionend event.
}startMouseSelection(mouseSelection){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=mouseSelection}update(update){this.view.observer.update(update),this.mouseSelection&&this.mouseSelection.update(update),this.draggedContent&&update.docChanged&&(this.draggedContent=this.draggedContent.map(update.changes)),update.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}const PendingKeys=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],EmacsyPendingKeys="dthko",modifierCodes=[16,17,18,20,91,92,224,225],dragScrollMargin=6;// Key codes for modifier keys
class MouseSelection{constructor(view,startEvent,style,mustSelect){this.view=view,this.startEvent=startEvent,this.style=style,this.mustSelect=mustSelect,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=startEvent,this.scrollParents=scrollableParents(view.contentDOM),this.atoms=view.state.facet(atomicRanges).map(f=>f(view));let doc=view.contentDOM.ownerDocument;doc.addEventListener("mousemove",this.move=this.move.bind(this)),doc.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=startEvent.shiftKey,this.multiple=view.state.facet(state.EditorState.allowMultipleSelections)&&addsSelectionRange(view,startEvent),this.dragging=!!(isInPrimarySelection(view,startEvent)&&1==getClickType(startEvent))&&null}start(event){!1===this.dragging&&this.select(event)}move(event){if(0==event.buttons)return this.destroy();if(this.dragging||null==this.dragging&&10>dist(this.startEvent,event))return;this.select(this.lastEvent=event);let sx=0,sy=0,left=0,top=0,right=this.view.win.innerWidth,bottom=this.view.win.innerHeight;this.scrollParents.x&&({left,right}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top,bottom}=this.scrollParents.y.getBoundingClientRect());let margins=getScrollMargins(this.view);event.clientX-margins.left<=left+dragScrollMargin?sx=-dragScrollSpeed(left-event.clientX):event.clientX+margins.right>=right-dragScrollMargin&&(sx=dragScrollSpeed(event.clientX-right)),event.clientY-margins.top<=top+dragScrollMargin?sy=-dragScrollSpeed(top-event.clientY):event.clientY+margins.bottom>=bottom-dragScrollMargin&&(sy=dragScrollSpeed(event.clientY-bottom)),this.setScrollSpeed(sx,sy)}up(event){null==this.dragging&&this.select(this.lastEvent),this.dragging||event.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let doc=this.view.contentDOM.ownerDocument;doc.removeEventListener("mousemove",this.move),doc.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(sx,sy){this.scrollSpeed={x:sx,y:sy},sx||sy?0>this.scrolling&&(this.scrolling=setInterval(()=>this.scroll(),50)):-1<this.scrolling&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x,y}=this.scrollSpeed;x&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=x,x=0),y&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=y,y=0),(x||y)&&this.view.win.scrollBy(x,y),!1===this.dragging&&this.select(this.lastEvent)}select(event){let{view}=this,selection=skipAtomsForSelection(this.atoms,this.style.get(event,this.extend,this.multiple));(this.mustSelect||!selection.eq(view.state.selection,!1===this.dragging))&&this.view.dispatch({selection,userEvent:"select.pointer"}),this.mustSelect=!1}update(update){update.transactions.some(tr=>tr.isUserEvent("input.type"))?this.destroy():this.style.update(update)&&setTimeout(()=>this.select(this.lastEvent),20)}}const handlers=Object.create(null),observers=Object.create(null),brokenClipboardAPI=browser.ie&&15>browser.ie_version||browser.ios&&604>browser.webkit_version;// This is very crude, but unfortunately both these browsers _pretend_
// that they have a clipboard API—all the objects and methods are
// there, they just don't work, and they are hard to test.
observers.scroll=view=>{view.inputState.lastScrollTop=view.scrollDOM.scrollTop,view.inputState.lastScrollLeft=view.scrollDOM.scrollLeft},observers.wheel=observers.mousewheel=view=>{view.inputState.lastWheelEvent=Date.now()},handlers.keydown=(view,event)=>(view.inputState.setSelectionOrigin("select"),27==event.keyCode&&0!=view.inputState.tabFocusMode&&(view.inputState.tabFocusMode=Date.now()+2e3),!1),observers.touchstart=(view,e)=>{let iState=view.inputState,touch=e.targetTouches[0];iState.lastTouchTime=Date.now(),touch&&(iState.lastTouchX=touch.clientX,iState.lastTouchY=touch.clientY),iState.setSelectionOrigin("select.pointer")},observers.touchmove=view=>{view.inputState.setSelectionOrigin("select.pointer")},handlers.mousedown=(view,event)=>{if(view.observer.flush(),view.inputState.lastTouchTime>Date.now()-2e3)return!1;// Ignore touch interaction
let style=null;for(let makeStyle of view.state.facet(mouseSelectionStyle))if(style=makeStyle(view,event),style)break;if(style||0!=event.button||(style=basicMouseSelection(view,event)),style){let mustFocus=!view.hasFocus;view.inputState.startMouseSelection(new MouseSelection(view,event,style,mustFocus)),mustFocus&&view.observer.ignore(()=>{focusPreventScroll(view.contentDOM);let active=view.root.activeElement;active&&!active.contains(view.contentDOM)&&active.blur()});let mouseSel=view.inputState.mouseSelection;if(mouseSel)return mouseSel.start(event),!1===mouseSel.dragging}else view.inputState.setSelectionOrigin("select.pointer");return!1};const BadMouseDetail=browser.ie&&11>=browser.ie_version;let lastMouseDown=null,lastMouseDownCount=0,lastMouseDownTime=0;handlers.dragstart=(view,event)=>{let{selection:{main:range}}=view.state;if(event.target.draggable){let tile=view.docView.tile.nearest(event.target);if(tile&&tile.isWidget()){let from=tile.posAtStart,to=from+tile.length;(from>=range.to||to<=range.from)&&(range=state.EditorSelection.range(from,to))}}let{inputState}=view;return inputState.mouseSelection&&(inputState.mouseSelection.dragging=!0),inputState.draggedContent=range,event.dataTransfer&&(event.dataTransfer.setData("Text",textFilter(view.state,clipboardOutputFilter,view.state.sliceDoc(range.from,range.to))),event.dataTransfer.effectAllowed="copyMove"),!1},handlers.dragend=view=>(view.inputState.draggedContent=null,!1),handlers.drop=(view,event)=>{if(!event.dataTransfer)return!1;if(view.state.readOnly)return!0;let files=event.dataTransfer.files;if(files&&files.length){// For a file drop, read the file's text.
let text=Array(files.length),read=0,finishFile=()=>{++read==files.length&&dropText(view,event,text.filter(s=>null!=s).join(view.state.lineBreak),!1)};for(let i=0,reader;i<files.length;i++)reader=new FileReader,reader.onerror=finishFile,reader.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result)||(text[i]=reader.result),finishFile()},reader.readAsText(files[i]);return!0}else{let text=event.dataTransfer.getData("Text");if(text)return dropText(view,event,text,!0),!0}return!1},handlers.paste=(view,event)=>{if(view.state.readOnly)return!0;view.observer.flush();let data=brokenClipboardAPI?null:event.clipboardData;return data?(doPaste(view,data.getData("text/plain")||data.getData("text/uri-list")),!0):(capturePaste(view),!1)};let lastLinewiseCopy=null;handlers.copy=handlers.cut=(view,event)=>{// If the DOM selection is outside this editor, don't intercept.
// This happens when a parent editor (like ProseMirror) selects content that
// spans multiple elements including this CodeMirror. The copy event may
// bubble through CodeMirror (e.g. when CodeMirror is the first or the last
// element in the selection), but we should let the parent handle it.
if(!hasSelection(view.contentDOM,view.observer.selectionRange))return!1;let{text,ranges,linewise}=copiedRange(view.state);if(!text&&!linewise)return!1;lastLinewiseCopy=linewise?text:null,"cut"!=event.type||view.state.readOnly||view.dispatch({changes:ranges,scrollIntoView:!0,userEvent:"delete.cut"});let data=brokenClipboardAPI?null:event.clipboardData;return data?(data.clearData(),data.setData("text/plain",text),!0):(captureCopy(view,text),!1)};const isFocusChange=state.Annotation.define();observers.focus=view=>{view.inputState.lastFocusTime=Date.now(),!view.scrollDOM.scrollTop&&(view.inputState.lastScrollTop||view.inputState.lastScrollLeft)&&(view.scrollDOM.scrollTop=view.inputState.lastScrollTop,view.scrollDOM.scrollLeft=view.inputState.lastScrollLeft),updateForFocusChange(view)},observers.blur=view=>{view.observer.clearSelectionRange(),updateForFocusChange(view)},observers.compositionstart=observers.compositionupdate=view=>{view.observer.editContext||(null==view.inputState.compositionFirstChange&&(view.inputState.compositionFirstChange=!0),0>view.inputState.composing&&(view.inputState.composing=0))},observers.compositionend=view=>{view.observer.editContext||(// Composition handled by edit context
view.inputState.composing=-1,view.inputState.compositionEndedAt=Date.now(),view.inputState.compositionPendingKey=!0,view.inputState.compositionPendingChange=0<view.observer.pendingRecords().length,view.inputState.compositionFirstChange=null,browser.chrome&&browser.android?view.observer.flushSoon():view.inputState.compositionPendingChange?Promise.resolve().then(()=>view.observer.flush()):setTimeout(()=>{0>view.inputState.composing&&view.docView.hasComposition&&view.update([])},50))},observers.contextmenu=view=>{view.inputState.lastContextMenu=Date.now()},handlers.beforeinput=(view,event)=>{var _a,_b;// In EditContext mode, we must handle insertReplacementText events
// directly, to make spell checking corrections work
if(("insertText"==event.inputType||"insertCompositionText"==event.inputType)&&(view.inputState.insertingText=event.data,view.inputState.insertingTextAt=Date.now()),"insertReplacementText"==event.inputType&&view.observer.editContext){let text=null===(_a=event.dataTransfer)||void 0===_a?void 0:_a.getData("text/plain"),ranges=event.getTargetRanges();if(text&&ranges.length){let r=ranges[0],from=view.posAtDOM(r.startContainer,r.startOffset),to=view.posAtDOM(r.endContainer,r.endOffset);return applyDOMChangeInner(view,{from,to,insert:view.state.toText(text)},null),!0}}// Because Chrome Android doesn't fire useful key events, use
// beforeinput to detect backspace (and possibly enter and delete,
// but those usually don't even seem to fire beforeinput events at
// the moment) and fake a key event for it.
//
// (preventDefault on beforeinput, though supported in the spec,
// seems to do nothing at all on Chrome).
let pending;if(browser.chrome&&browser.android&&(pending=PendingKeys.find(key=>key.inputType==event.inputType))&&(view.observer.delayAndroidKey(pending.key,pending.keyCode),"Backspace"==pending.key||"Delete"==pending.key)){let startViewHeight=(null===(_b=window.visualViewport)||void 0===_b?void 0:_b.height)||0;setTimeout(()=>{var _a;// Backspacing near uneditable nodes on Chrome Android sometimes
// closes the virtual keyboard. This tries to crudely detect
// that and refocus to get it back.
((null===(_a=window.visualViewport)||void 0===_a?void 0:_a.height)||0)>startViewHeight+10&&view.hasFocus&&(view.contentDOM.blur(),view.focus())},100)}return browser.ios&&"deleteContentForward"==event.inputType&&view.observer.flushSoon(),browser.safari&&"insertText"==event.inputType&&0<=view.inputState.composing&&setTimeout(()=>observers.compositionend(view,event),20),!1};const appliedFirefoxHack=new Set,wrappingWhiteSpace=["pre-wrap","normal","pre-line","break-spaces"];// Used to track, during updateHeight, if any actual heights changed
let heightChangeFlag=!1;class HeightOracle{constructor(lineWrapping){this.lineWrapping=lineWrapping,this.doc=state.Text.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(from,to){let lines=this.doc.lineAt(to).number-this.doc.lineAt(from).number+1;return this.lineWrapping&&(lines+=Math.max(0,Math.ceil((to-from-.5*(lines*this.lineLength))/this.lineLength))),this.lineHeight*lines}heightForLine(length){if(!this.lineWrapping)return this.lineHeight;let lines=1+Math.max(0,Math.ceil((length-this.lineLength)/Math.max(1,this.lineLength-5)));return lines*this.lineHeight}setDoc(doc){return this.doc=doc,this}mustRefreshForWrapping(whiteSpace){return-1<wrappingWhiteSpace.indexOf(whiteSpace)!=this.lineWrapping}mustRefreshForHeights(lineHeights){let newHeight=!1;for(let i=0,h;i<lineHeights.length;i++)h=lineHeights[i],0>h?i++:!this.heightSamples[Math.floor(10*h)]&&(newHeight=!0,this.heightSamples[Math.floor(10*h)]=!0);return newHeight}refresh(whiteSpace,lineHeight,charWidth,textHeight,lineLength,knownHeights){let lineWrapping=-1<wrappingWhiteSpace.indexOf(whiteSpace),changed=.3<Math.abs(lineHeight-this.lineHeight)||this.lineWrapping!=lineWrapping;if(this.lineWrapping=lineWrapping,this.lineHeight=lineHeight,this.charWidth=charWidth,this.textHeight=textHeight,this.lineLength=lineLength,changed){this.heightSamples={};for(let i=0,h;i<knownHeights.length;i++)h=knownHeights[i],0>h?i++:this.heightSamples[Math.floor(10*h)]=!0}return changed}}// This object is used by `updateHeight` to make DOM measurements
// arrive at the right nodes. The `heights` array is a sequence of
// block heights, starting from position `from`.
class MeasuredHeights{constructor(from,heights){this.from=from,this.heights=heights,this.index=0}get more(){return this.index<this.heights.length}}/**
		Record used to represent information about a block-level element
		in the editor view.
		*/class BlockInfo{/**
		    @internal
		    */constructor(/**
		    The start of the element in the document.
		    */from,/**
		    The length of the element.
		    */length,/**
		    The top position of the element (relative to the top of the
		    document).
		    */top,/**
		    Its height.
		    */height,/**
		    @internal Weird packed field that holds an array of children
		    for composite blocks, a decoration for block widgets, and a
		    number indicating the amount of widget-created line breaks for
		    text blocks.
		    */_content){this.from=from,this.length=length,this.top=top,this.height=height,this._content=_content}/**
		    The type of element this is. When querying lines, this may be
		    an array of all the blocks that make up the line.
		    */get type(){return"number"==typeof this._content?exports.BlockType.Text:Array.isArray(this._content)?this._content:this._content.type}/**
		    The end of the element as a document position.
		    */get to(){return this.from+this.length}/**
		    The bottom position of the element.
		    */get bottom(){return this.top+this.height}/**
		    If this is a widget block, this will return the widget
		    associated with it.
		    */get widget(){return this._content instanceof PointDecoration?this._content.widget:null}/**
		    If this is a textblock, this holds the number of line breaks
		    that appear in widgets inside the block.
		    */get widgetLineBreaks(){return"number"==typeof this._content?this._content:0}/**
		    @internal
		    */join(other){let content=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(other._content)?other._content:[other]);return new BlockInfo(this.from,this.length+other.length,this.top,this.height+other.height,content)}}var QueryType;(function(QueryType){QueryType[QueryType.ByPos=0]="ByPos",QueryType[QueryType.ByHeight=1]="ByHeight",QueryType[QueryType.ByPosNoHeight=2]="ByPosNoHeight"})(QueryType||(QueryType={}));const Epsilon=1e-3;class HeightMap{constructor(length,// The number of characters covered
height,// Height of this part of the document
flags=2/* Flag.Outdated */){this.length=length,this.height=height,this.flags=flags}get outdated(){return 0<(2&this.flags/* Flag.Outdated */)}set outdated(value){this.flags=(value?2/* Flag.Outdated */:0)|-3&this.flags/* Flag.Outdated */}setHeight(height){this.height!=height&&(Math.abs(this.height-height)>Epsilon&&(heightChangeFlag=!0),this.height=height)}// Base case is to replace a leaf node, which simply builds a tree
// from the new nodes and returns that (HeightMapBranch and
// HeightMapGap override this to actually use from/to)
replace(_from,_to,nodes){return HeightMap.of(nodes)}// Again, these are base cases, and are overridden for branch and gap nodes.
decomposeLeft(_to,result){result.push(this)}decomposeRight(_from,result){result.push(this)}applyChanges(decorations,oldDoc,oracle,changes){let me=this,doc=oracle.doc;for(let i=changes.length-1;0<=i;i--){let{fromA,toA,fromB,toB}=changes[i],start=me.lineAt(fromA,QueryType.ByPosNoHeight,oracle.setDoc(oldDoc),0,0),end=start.to>=toA?start:me.lineAt(toA,QueryType.ByPosNoHeight,oracle,0,0);for(toB+=end.to-toA,toA=end.to;0<i&&start.from<=changes[i-1].toA;)fromA=changes[i-1].fromA,fromB=changes[i-1].fromB,i--,fromA<start.from&&(start=me.lineAt(fromA,QueryType.ByPosNoHeight,oracle,0,0));fromB+=start.from-fromA,fromA=start.from;let nodes=NodeBuilder.build(oracle.setDoc(doc),decorations,fromB,toB);me=replace(me,me.replace(fromA,toA,nodes))}return me.updateHeight(oracle,0)}static empty(){return new HeightMapText(0,0,0)}// nodes uses null values to indicate the position of line breaks.
// There are never line breaks at the start or end of the array, or
// two line breaks next to each other, and the array isn't allowed
// to be empty (same restrictions as return value from the builder).
static of(nodes){if(1==nodes.length)return nodes[0];let i=0,j=nodes.length,before=0,after=0;for(;;)if(i==j){if(before>2*after){let split=nodes[i-1];split.break?nodes.splice(--i,1,split.left,null,split.right):nodes.splice(--i,1,split.left,split.right),j+=1+split.break,before-=split.size}else if(after>2*before){let split=nodes[j];split.break?nodes.splice(j,1,split.left,null,split.right):nodes.splice(j,1,split.left,split.right),j+=2+split.break,after-=split.size}else break;}else if(before<after){let next=nodes[i++];next&&(before+=next.size)}else{let next=nodes[--j];next&&(after+=next.size)}let brk=0;return null==nodes[i-1]?(brk=1,i--):null==nodes[i]&&(brk=1,j++),new HeightMapBranch(HeightMap.of(nodes.slice(0,i)),brk,HeightMap.of(nodes.slice(j)))}}HeightMap.prototype.size=1;const SpaceDeco=Decoration.replace({});class HeightMapBlock extends HeightMap{constructor(length,height,deco){super(length,height),this.deco=deco,this.spaceAbove=0}mainBlock(top,offset){return new BlockInfo(offset,this.length,top+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(height,_oracle,top,offset){return this.spaceAbove&&height<top+this.spaceAbove?new BlockInfo(offset,0,top,this.spaceAbove,SpaceDeco):this.mainBlock(top,offset)}lineAt(_value,_type,oracle,top,offset){let main=this.mainBlock(top,offset);return this.spaceAbove?this.blockAt(0,oracle,top,offset).join(main):main}forEachLine(from,to,oracle,top,offset,f){from<=offset+this.length&&to>=offset&&f(this.lineAt(0,QueryType.ByPos,oracle,top,offset))}setMeasuredHeight(measured){let next=measured.heights[measured.index++];0>next?(this.spaceAbove=-next,next=measured.heights[measured.index++]):this.spaceAbove=0,this.setHeight(next)}updateHeight(oracle,offset=0,_force=!1,measured){return measured&&measured.from<=offset&&measured.more&&this.setMeasuredHeight(measured),this.outdated=!1,this}toString(){return`block(${this.length})`}}class HeightMapText extends HeightMapBlock{constructor(length,height,above){super(length,height,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=above}mainBlock(top,offset){return new BlockInfo(offset,this.length,top+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(_from,_to,nodes){let node=nodes[0];return 1==nodes.length&&(node instanceof HeightMapText||node instanceof HeightMapGap&&4&node.flags/* Flag.SingleLine */)&&10>Math.abs(this.length-node.length)?(node instanceof HeightMapGap?node=new HeightMapText(node.length,this.height,this.spaceAbove):node.height=this.height,this.outdated||(node.outdated=!1),node):HeightMap.of(nodes)}updateHeight(oracle,offset=0,force=!1,measured){return measured&&measured.from<=offset&&measured.more?this.setMeasuredHeight(measured):(force||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,oracle.heightForLine(this.length-this.collapsed))+this.breaks*oracle.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class HeightMapGap extends HeightMap{constructor(length){super(length,0)}heightMetrics(oracle,offset){let firstLine=oracle.doc.lineAt(offset).number,lastLine=oracle.doc.lineAt(offset+this.length).number,lines=lastLine-firstLine+1,perChar=0,perLine;if(oracle.lineWrapping){let totalPerLine=Math.min(this.height,oracle.lineHeight*lines);perLine=totalPerLine/lines,this.length>lines+1&&(perChar=(this.height-totalPerLine)/(this.length-lines-1))}else perLine=this.height/lines;return{firstLine,lastLine,perLine,perChar}}blockAt(height,oracle,top,offset){let{firstLine,lastLine,perLine,perChar}=this.heightMetrics(oracle,offset);if(oracle.lineWrapping){let guess=offset+(height<oracle.lineHeight?0:Math.round(Math.max(0,Math.min(1,(height-top)/this.height))*this.length)),line=oracle.doc.lineAt(guess),lineHeight=perLine+line.length*perChar,lineTop=Math.max(top,height-lineHeight/2);return new BlockInfo(line.from,line.length,lineTop,lineHeight,0)}else{let line=Math.max(0,Math.min(lastLine-firstLine,Math.floor((height-top)/perLine))),{from,length}=oracle.doc.line(firstLine+line);return new BlockInfo(from,length,top+perLine*line,perLine,0)}}lineAt(value,type,oracle,top,offset){if(type==QueryType.ByHeight)return this.blockAt(value,oracle,top,offset);if(type==QueryType.ByPosNoHeight){let{from,to}=oracle.doc.lineAt(value);return new BlockInfo(from,to-from,0,0,0)}let{firstLine,perLine,perChar}=this.heightMetrics(oracle,offset),line=oracle.doc.lineAt(value),lineHeight=perLine+line.length*perChar,linesAbove=line.number-firstLine,lineTop=top+perLine*linesAbove+perChar*(line.from-offset-linesAbove);return new BlockInfo(line.from,line.length,Math.max(top,Math.min(lineTop,top+this.height-lineHeight)),lineHeight,0)}forEachLine(from,to,oracle,top,offset,f){from=Math.max(from,offset),to=Math.min(to,offset+this.length);let{firstLine,perLine,perChar}=this.heightMetrics(oracle,offset);for(let pos=from,lineTop=top,line;pos<=to;){if(line=oracle.doc.lineAt(pos),pos==from){let linesAbove=line.number-firstLine;lineTop+=perLine*linesAbove+perChar*(from-offset-linesAbove)}let lineHeight=perLine+perChar*line.length;f(new BlockInfo(line.from,line.length,lineTop,lineHeight,0)),lineTop+=lineHeight,pos=line.to+1}}replace(from,to,nodes){let after=this.length-to;if(0<after){let last=nodes[nodes.length-1];last instanceof HeightMapGap?nodes[nodes.length-1]=new HeightMapGap(last.length+after):nodes.push(null,new HeightMapGap(after-1))}if(0<from){let first=nodes[0];first instanceof HeightMapGap?nodes[0]=new HeightMapGap(from+first.length):nodes.unshift(new HeightMapGap(from-1),null)}return HeightMap.of(nodes)}decomposeLeft(to,result){result.push(new HeightMapGap(to-1),null)}decomposeRight(from,result){result.push(null,new HeightMapGap(this.length-from-1))}updateHeight(oracle,offset=0,force=!1,measured){let end=offset+this.length;if(measured&&measured.from<=offset+this.length&&measured.more){// Fill in part of this gap with measured lines. We know there
// can't be widgets or collapsed ranges in those lines, because
// they would already have been added to the heightmap (gaps
// only contain plain text).
let nodes=[],pos=Math.max(offset,measured.from),singleHeight=-1;for(measured.from>offset&&nodes.push(new HeightMapGap(measured.from-offset-1).updateHeight(oracle,offset));pos<=end&&measured.more;){let len=oracle.doc.lineAt(pos).length;nodes.length&&nodes.push(null);let height=measured.heights[measured.index++],above=0;0>height&&(above=-height,height=measured.heights[measured.index++]),-1==singleHeight?singleHeight=height:Math.abs(height-singleHeight)>=Epsilon&&(singleHeight=-2);let line=new HeightMapText(len,height,above);line.outdated=!1,nodes.push(line),pos+=len+1}pos<=end&&nodes.push(null,new HeightMapGap(end-pos).updateHeight(oracle,pos));let result=HeightMap.of(nodes);return(0>singleHeight||Math.abs(result.height-this.height)>=Epsilon||Math.abs(singleHeight-this.heightMetrics(oracle,offset).perLine)>=Epsilon)&&(heightChangeFlag=!0),replace(this,result)}return(force||this.outdated)&&(this.setHeight(oracle.heightForGap(offset,offset+this.length)),this.outdated=!1),this}toString(){return`gap(${this.length})`}}class HeightMapBranch extends HeightMap{constructor(left,brk,right){super(left.length+brk+right.length,left.height+right.height,brk|(left.outdated||right.outdated?2/* Flag.Outdated */:0)),this.left=left,this.right=right,this.size=left.size+right.size}get break(){return 1&this.flags/* Flag.Break */}blockAt(height,oracle,top,offset){let mid=top+this.left.height;return height<mid?this.left.blockAt(height,oracle,top,offset):this.right.blockAt(height,oracle,mid,offset+this.left.length+this.break)}lineAt(value,type,oracle,top,offset){let rightTop=top+this.left.height,rightOffset=offset+this.left.length+this.break,left=type==QueryType.ByHeight?value<rightTop:value<rightOffset,base=left?this.left.lineAt(value,type,oracle,top,offset):this.right.lineAt(value,type,oracle,rightTop,rightOffset);if(this.break||(left?base.to<rightOffset:base.from>rightOffset))return base;let subQuery=type==QueryType.ByPosNoHeight?QueryType.ByPosNoHeight:QueryType.ByPos;return left?base.join(this.right.lineAt(rightOffset,subQuery,oracle,rightTop,rightOffset)):this.left.lineAt(rightOffset,subQuery,oracle,top,offset).join(base)}forEachLine(from,to,oracle,top,offset,f){let rightTop=top+this.left.height,rightOffset=offset+this.left.length+this.break;if(this.break)from<rightOffset&&this.left.forEachLine(from,to,oracle,top,offset,f),to>=rightOffset&&this.right.forEachLine(from,to,oracle,rightTop,rightOffset,f);else{let mid=this.lineAt(rightOffset,QueryType.ByPos,oracle,top,offset);from<mid.from&&this.left.forEachLine(from,mid.from-1,oracle,top,offset,f),mid.to>=from&&mid.from<=to&&f(mid),to>mid.to&&this.right.forEachLine(mid.to+1,to,oracle,rightTop,rightOffset,f)}}replace(from,to,nodes){let rightStart=this.left.length+this.break;if(to<rightStart)return this.balanced(this.left.replace(from,to,nodes),this.right);if(from>this.left.length)return this.balanced(this.left,this.right.replace(from-rightStart,to-rightStart,nodes));let result=[];0<from&&this.decomposeLeft(from,result);let left=result.length;for(let node of nodes)result.push(node);if(0<from&&mergeGaps(result,left-1),to<this.length){let right=result.length;this.decomposeRight(to,result),mergeGaps(result,right)}return HeightMap.of(result)}decomposeLeft(to,result){let left=this.left.length;return to<=left?this.left.decomposeLeft(to,result):void(result.push(this.left),this.break&&(left++,to>=left&&result.push(null)),to>left&&this.right.decomposeLeft(to-left,result))}decomposeRight(from,result){let left=this.left.length,right=left+this.break;return from>=right?this.right.decomposeRight(from-right,result):void(from<left&&this.left.decomposeRight(from,result),this.break&&from<right&&result.push(null),result.push(this.right))}balanced(left,right){return left.size>2*right.size||right.size>2*left.size?HeightMap.of(this.break?[left,null,right]:[left,right]):(this.left=replace(this.left,left),this.right=replace(this.right,right),this.setHeight(left.height+right.height),this.outdated=left.outdated||right.outdated,this.size=left.size+right.size,this.length=left.length+this.break+right.length,this)}updateHeight(oracle,offset=0,force=!1,measured){let{left,right}=this,rightStart=offset+left.length+this.break,rebalance=null;return(measured&&measured.from<=offset+left.length&&measured.more?rebalance=left=left.updateHeight(oracle,offset,force,measured):left.updateHeight(oracle,offset,force),measured&&measured.from<=rightStart+right.length&&measured.more?rebalance=right=right.updateHeight(oracle,rightStart,force,measured):right.updateHeight(oracle,rightStart,force),rebalance)?this.balanced(left,right):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}const relevantWidgetHeight=5;class NodeBuilder{constructor(pos,oracle){this.pos=pos,this.oracle=oracle,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=pos}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(_from,to){if(-1<this.lineStart){let end=Math.min(to,this.lineEnd),last=this.nodes[this.nodes.length-1];last instanceof HeightMapText?last.length+=end-this.pos:(end>this.pos||!this.isCovered)&&this.nodes.push(new HeightMapText(end-this.pos,-1,0)),this.writtenTo=end,to>end&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=to}point(from,to,deco){if(from<to||deco.heightRelevant){let height=deco.widget?deco.widget.estimatedHeight:0,breaks=deco.widget?deco.widget.lineBreaks:0;0>height&&(height=this.oracle.lineHeight);let len=to-from;deco.block?this.addBlock(new HeightMapBlock(len,height,deco)):(len||breaks||height>=relevantWidgetHeight)&&this.addLineDeco(height,breaks,len)}else to>from&&this.span(from,to);-1<this.lineEnd&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(!(-1<this.lineStart)){let{from,to}=this.oracle.doc.lineAt(this.pos);this.lineStart=from,this.lineEnd=to,this.writtenTo<from&&((this.writtenTo<from-1||null==this.nodes[this.nodes.length-1])&&this.nodes.push(this.blankContent(this.writtenTo,from-1)),this.nodes.push(null)),this.pos>from&&this.nodes.push(new HeightMapText(this.pos-from,-1,0)),this.writtenTo=this.pos}}blankContent(from,to){let gap=new HeightMapGap(to-from);return this.oracle.doc.lineAt(from).to==to&&(gap.flags|=4/* Flag.SingleLine */),gap}ensureLine(){this.enterLine();let last=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(last instanceof HeightMapText)return last;let line=new HeightMapText(0,-1,0);return this.nodes.push(line),line}addBlock(block){this.enterLine();let deco=block.deco;deco&&0<deco.startSide&&!this.isCovered&&this.ensureLine(),this.nodes.push(block),this.writtenTo=this.pos+=block.length,deco&&0<deco.endSide&&(this.covering=block)}addLineDeco(height,breaks,length){let line=this.ensureLine();line.length+=length,line.collapsed+=length,line.widgetHeight=Math.max(line.widgetHeight,height),line.breaks+=breaks,this.writtenTo=this.pos+=length}finish(from){let last=0==this.nodes.length?null:this.nodes[this.nodes.length-1];!(-1<this.lineStart)||last instanceof HeightMapText||this.isCovered?(this.writtenTo<this.pos||null==last)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos)):this.nodes.push(new HeightMapText(0,-1,0));let pos=from;for(let node of this.nodes)node instanceof HeightMapText&&node.updateHeight(this.oracle,pos),pos+=node?node.length:1;return this.nodes}// Always called with a region that on both sides either stretches
// to a line break or the end of the document.
// The returned array uses null to indicate line breaks, but never
// starts or ends in a line break, or has multiple line breaks next
// to each other.
static build(oracle,decorations,from,to){let builder=new NodeBuilder(from,oracle);return state.RangeSet.spans(decorations,from,to,builder,0),builder.finish(from)}}class DecorationComparator{constructor(){this.changes=[]}compareRange(){}comparePoint(from,to,a,b){(from<to||a&&a.heightRelevant||b&&b.heightRelevant)&&addRange(from,to,this.changes,5)}}class LineGap{constructor(from,to,size,displaySize){this.from=from,this.to=to,this.size=size,this.displaySize=displaySize}static same(a,b){if(a.length!=b.length)return!1;for(let i=0;i<a.length;i++){let gA=a[i],gB=b[i];if(gA.from!=gB.from||gA.to!=gB.to||gA.size!=gB.size)return!1}return!0}draw(viewState,wrapping){return Decoration.replace({widget:new LineGapWidget(this.displaySize*(wrapping?viewState.scaleY:viewState.scaleX),wrapping)}).range(this.from,this.to)}}class LineGapWidget extends WidgetType{constructor(size,vertical){super(),this.size=size,this.vertical=vertical}eq(other){return other.size==this.size&&other.vertical==this.vertical}toDOM(){let elt=document.createElement("div");return this.vertical?elt.style.height=this.size+"px":(elt.style.width=this.size+"px",elt.style.height="2px",elt.style.display="inline-block"),elt}get estimatedHeight(){return this.vertical?this.size:-1}}class ViewState{constructor(view,state$1){this.view=view,this.state=state$1,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=IdScaler,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=exports.Direction.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let guessWrapping=state$1.facet(contentAttributes).some(v=>"function"!=typeof v&&"cm-lineWrapping"==v.class);this.heightOracle=new HeightOracle(guessWrapping),this.stateDeco=staticDeco(state$1),this.heightMap=HeightMap.empty().applyChanges(this.stateDeco,state.Text.empty,this.heightOracle.setDoc(state$1.doc),[new ChangedRange(0,0,0,state$1.doc.length)]);for(let i=0;2>i&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());i++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=Decoration.set(this.lineGaps.map(gap=>gap.draw(this,!1))),this.scrollParent=view.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let viewports=[this.viewport],{main}=this.state.selection;for(let i=0,pos;1>=i;i++)if(pos=i?main.head:main.anchor,!viewports.some(({from,to})=>pos>=from&&pos<=to)){let{from,to}=this.lineBlockAt(pos);viewports.push(new Viewport(from,to))}return this.viewports=viewports.sort((a,b)=>a.from-b.from),this.updateScaler()}updateScaler(){let scaler=this.scaler;return this.scaler=7e6>=this.heightMap.height/* VP.MaxDOMHeight */?IdScaler:new BigScaler(this.heightOracle,this.heightMap,this.viewports),scaler.eq(this.scaler)?0:2/* UpdateFlag.Height */}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,block=>{this.viewportLines.push(scaleBlock(block,this.scaler))})}update(update,scrollTarget=null){this.state=update.state;let prevDeco=this.stateDeco;this.stateDeco=staticDeco(this.state);let contentChanges=update.changedRanges,heightChanges=ChangedRange.extendWithRanges(contentChanges,heightRelevantDecoChanges(prevDeco,this.stateDeco,update?update.changes:state.ChangeSet.empty(this.state.doc.length))),prevHeight=this.heightMap.height,scrollAnchor=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);clearHeightChangeFlag(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,update.startState.doc,this.heightOracle.setDoc(this.state.doc),heightChanges),(this.heightMap.height!=prevHeight||heightChangeFlag)&&(update.flags|=2/* UpdateFlag.Height */),scrollAnchor?(this.scrollAnchorPos=update.changes.mapPos(scrollAnchor.from,-1),this.scrollAnchorHeight=scrollAnchor.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=prevHeight);let viewport=heightChanges.length?this.mapViewport(this.viewport,update.changes):this.viewport;(scrollTarget&&(scrollTarget.range.head<viewport.from||scrollTarget.range.head>viewport.to)||!this.viewportIsAppropriate(viewport))&&(viewport=this.getViewport(0,scrollTarget));let viewportChange=viewport.from!=this.viewport.from||viewport.to!=this.viewport.to;this.viewport=viewport,update.flags|=this.updateForViewport(),(viewportChange||!update.changes.empty||2&update.flags/* UpdateFlag.Height */)&&this.updateViewportLines(),(this.lineGaps.length||4000<this.viewport.to-this.viewport.from)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,update.changes))),update.flags|=this.computeVisibleRanges(update.changes),scrollTarget&&(this.scrollTarget=scrollTarget),!this.mustEnforceCursorAssoc&&(update.selectionSet||update.focusChanged)&&update.view.lineWrapping&&update.state.selection.main.empty&&update.state.selection.main.assoc&&!update.state.facet(nativeSelectionHidden)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view}=this,dom=view.contentDOM,style=window.getComputedStyle(dom),oracle=this.heightOracle,whiteSpace=style.whiteSpace;this.defaultTextDirection="rtl"==style.direction?exports.Direction.RTL:exports.Direction.LTR;let refresh=this.heightOracle.mustRefreshForWrapping(whiteSpace)||"refresh"===this.mustMeasureContent,domRect=dom.getBoundingClientRect(),measureContent=refresh||this.mustMeasureContent||this.contentDOMHeight!=domRect.height;this.contentDOMHeight=domRect.height,this.mustMeasureContent=!1;let result=0,bias=0;if(domRect.width&&domRect.height){let{scaleX,scaleY}=getScale(dom,domRect);(.005<scaleX&&.005<Math.abs(this.scaleX-scaleX)||.005<scaleY&&.005<Math.abs(this.scaleY-scaleY))&&(this.scaleX=scaleX,this.scaleY=scaleY,result|=16/* UpdateFlag.Geometry */,refresh=measureContent=!0)}// Vertical padding
let paddingTop=(parseInt(style.paddingTop)||0)*this.scaleY,paddingBottom=(parseInt(style.paddingBottom)||0)*this.scaleY;(this.paddingTop!=paddingTop||this.paddingBottom!=paddingBottom)&&(this.paddingTop=paddingTop,this.paddingBottom=paddingBottom,result|=18/* UpdateFlag.Height */),this.editorWidth!=view.scrollDOM.clientWidth&&(oracle.lineWrapping&&(measureContent=!0),this.editorWidth=view.scrollDOM.clientWidth,result|=16/* UpdateFlag.Geometry */);let scrollParent=scrollableParents(this.view.contentDOM,!1).y;scrollParent!=this.scrollParent&&(this.scrollParent=scrollParent,this.scrollAnchorHeight=-1,this.scrollOffset=0);let scrollOffset=this.getScrollOffset();this.scrollOffset!=scrollOffset&&(this.scrollAnchorHeight=-1,this.scrollOffset=scrollOffset),this.scrolledToBottom=isScrolledToBottom(this.scrollParent||view.win);// Pixel viewport
let pixelViewport=(this.printing?fullPixelRange:visiblePixelRange)(dom,this.paddingTop),dTop=pixelViewport.top-this.pixelViewport.top,dBottom=pixelViewport.bottom-this.pixelViewport.bottom;this.pixelViewport=pixelViewport;let inView=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(inView!=this.inView&&(this.inView=inView,inView&&(measureContent=!0)),!this.inView&&!this.scrollTarget&&!inWindow(view.dom))return 0;let contentWidth=domRect.width;if((this.contentDOMWidth!=contentWidth||this.editorHeight!=view.scrollDOM.clientHeight)&&(this.contentDOMWidth=domRect.width,this.editorHeight=view.scrollDOM.clientHeight,result|=16/* UpdateFlag.Geometry */),measureContent){let lineHeights=view.docView.measureVisibleLineHeights(this.viewport);if(oracle.mustRefreshForHeights(lineHeights)&&(refresh=!0),refresh||oracle.lineWrapping&&Math.abs(contentWidth-this.contentDOMWidth)>oracle.charWidth){let{lineHeight,charWidth,textHeight}=view.docView.measureTextSize();refresh=0<lineHeight&&oracle.refresh(whiteSpace,lineHeight,charWidth,textHeight,Math.max(5,contentWidth/charWidth),lineHeights),refresh&&(view.docView.minWidth=0,result|=16/* UpdateFlag.Geometry */)}0<dTop&&0<dBottom?bias=Math.max(dTop,dBottom):0>dTop&&0>dBottom&&(bias=Math.min(dTop,dBottom)),clearHeightChangeFlag();for(let vp of this.viewports){let heights=vp.from==this.viewport.from?lineHeights:view.docView.measureVisibleLineHeights(vp);this.heightMap=(refresh?HeightMap.empty().applyChanges(this.stateDeco,state.Text.empty,this.heightOracle,[new ChangedRange(0,0,0,view.state.doc.length)]):this.heightMap).updateHeight(oracle,0,refresh,new MeasuredHeights(vp.from,heights))}heightChangeFlag&&(result|=2/* UpdateFlag.Height */)}let viewportChange=!this.viewportIsAppropriate(this.viewport,bias)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return viewportChange&&(2&result/* UpdateFlag.Height */&&(result|=this.updateScaler()),this.viewport=this.getViewport(bias,this.scrollTarget),result|=this.updateForViewport()),(2&result/* UpdateFlag.Height */||viewportChange)&&this.updateViewportLines(),(this.lineGaps.length||4000<this.viewport.to-this.viewport.from)&&this.updateLineGaps(this.ensureLineGaps(refresh?[]:this.lineGaps,view)),result|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,view.docView.enforceCursorAssoc()),result}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(bias,scrollTarget){// This will divide VP.Margin between the top and the
// bottom, depending on the bias (the change in viewport position
// since the last update). It'll hold a number between 0 and 1
let marginTop=.5-Math.max(-.5,Math.min(.5,bias/1e3/* VP.Margin *//2)),map=this.heightMap,oracle=this.heightOracle,{visibleTop,visibleBottom}=this,viewport=new Viewport(map.lineAt(visibleTop-1e3*marginTop/* VP.Margin */,QueryType.ByHeight,oracle,0,0).from,map.lineAt(visibleBottom+1e3*(1-marginTop)/* VP.Margin */,QueryType.ByHeight,oracle,0,0).to);// If scrollTarget is given, make sure the viewport includes that position
if(scrollTarget){let{head}=scrollTarget.range;if(head<viewport.from||head>viewport.to){let viewHeight=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),block=map.lineAt(head,QueryType.ByPos,oracle,0,0),topPos;topPos="center"==scrollTarget.y?(block.top+block.bottom)/2-viewHeight/2:"start"==scrollTarget.y||"nearest"==scrollTarget.y&&head<viewport.from?block.top:block.bottom-viewHeight,viewport=new Viewport(map.lineAt(topPos-500,QueryType.ByHeight,oracle,0,0).from,map.lineAt(topPos+viewHeight+500,QueryType.ByHeight,oracle,0,0).to)}}return viewport}mapViewport(viewport,changes){let from=changes.mapPos(viewport.from,-1),to=changes.mapPos(viewport.to,1);return new Viewport(this.heightMap.lineAt(from,QueryType.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(to,QueryType.ByPos,this.heightOracle,0,0).to)}// Checks if a given viewport covers the visible part of the
// document and not too much beyond that.
viewportIsAppropriate({from,to},bias=0){if(!this.inView)return!0;let{top}=this.heightMap.lineAt(from,QueryType.ByPos,this.heightOracle,0,0),{bottom}=this.heightMap.lineAt(to,QueryType.ByPos,this.heightOracle,0,0),{visibleTop,visibleBottom}=this;return(0==from||top<=visibleTop-Math.max(10/* VP.MinCoverMargin */,Math.min(-bias,250/* VP.MaxCoverMargin */)))&&(to==this.state.doc.length||bottom>=visibleBottom+Math.max(10/* VP.MinCoverMargin */,Math.min(bias,250/* VP.MaxCoverMargin */)))&&top>visibleTop-2000/* VP.Margin */&&bottom<visibleBottom+2000/* VP.Margin */}mapLineGaps(gaps,changes){if(!gaps.length||changes.empty)return gaps;let mapped=[];for(let gap of gaps)changes.touchesRange(gap.from,gap.to)||mapped.push(new LineGap(changes.mapPos(gap.from),changes.mapPos(gap.to),gap.size,gap.displaySize));return mapped}// Computes positions in the viewport where the start or end of a
// line should be hidden, trying to reuse existing line gaps when
// appropriate to avoid unneccesary redraws.
// Uses crude character-counting for the positioning and sizing,
// since actual DOM coordinates aren't always available and
// predictable. Relies on generous margins (see LG.Margin) to hide
// the artifacts this might produce from the user.
ensureLineGaps(current,mayMeasure){let wrapping=this.heightOracle.lineWrapping,margin=wrapping?1e4/* LG.MarginWrap */:2e3/* LG.Margin */,halfMargin=margin>>1,doubleMargin=margin<<1;// The non-wrapping logic won't work at all in predominantly right-to-left text.
if(this.defaultTextDirection!=exports.Direction.LTR&&!wrapping)return[];let gaps=[],addGap=(from,to,line,structure)=>{if(to-from<halfMargin)return;let sel=this.state.selection.main,avoid=[sel.from];sel.empty||avoid.push(sel.to);for(let pos of avoid)if(pos>from&&pos<to)return addGap(from,pos-10/* LG.SelectionMargin */,line,structure),void addGap(pos+10/* LG.SelectionMargin */,to,line,structure);let gap=find(current,gap=>gap.from>=line.from&&gap.to<=line.to&&Math.abs(gap.from-from)<halfMargin&&Math.abs(gap.to-to)<halfMargin&&!avoid.some(pos=>gap.from<pos&&gap.to>pos));if(!gap){// When scrolling down, snap gap ends to line starts to avoid shifts in wrapping
if(to<line.to&&mayMeasure&&wrapping&&mayMeasure.visibleRanges.some(r=>r.from<=to&&r.to>=to)){let lineStart=mayMeasure.moveToLineBoundary(state.EditorSelection.cursor(to),!1,!0).head;lineStart>from&&(to=lineStart)}let size=this.gapSize(line,from,to,structure),displaySize=wrapping||2e6>size/* VP.MaxHorizGap */?size:2e6/* VP.MaxHorizGap */;gap=new LineGap(from,to,size,displaySize)}gaps.push(gap)},checkLine=line=>{if(line.length<doubleMargin||line.type!=exports.BlockType.Text)return;let structure=lineStructure(line.from,line.to,this.stateDeco);if(structure.total<doubleMargin)return;let target=this.scrollTarget?this.scrollTarget.range.head:null,viewFrom,viewTo;if(wrapping){let marginHeight=margin/this.heightOracle.lineLength*this.heightOracle.lineHeight,top,bot;if(null!=target){let targetFrac=findFraction(structure,target),spaceFrac=((this.visibleBottom-this.visibleTop)/2+marginHeight)/line.height;top=targetFrac-spaceFrac,bot=targetFrac+spaceFrac}else top=(this.visibleTop-line.top-marginHeight)/line.height,bot=(this.visibleBottom-line.top+marginHeight)/line.height;viewFrom=findPosition(structure,top),viewTo=findPosition(structure,bot)}else{let totalWidth=structure.total*this.heightOracle.charWidth,marginWidth=margin*this.heightOracle.charWidth,horizOffset=0;if(2e6<totalWidth/* VP.MaxHorizGap */)for(let old of current)old.from>=line.from&&old.from<line.to&&old.size!=old.displaySize&&old.from*this.heightOracle.charWidth+horizOffset<this.pixelViewport.left&&(horizOffset=old.size-old.displaySize);let pxLeft=this.pixelViewport.left+horizOffset,pxRight=this.pixelViewport.right+horizOffset,left,right;if(null!=target){let targetFrac=findFraction(structure,target),spaceFrac=((pxRight-pxLeft)/2+marginWidth)/totalWidth;left=targetFrac-spaceFrac,right=targetFrac+spaceFrac}else left=(pxLeft-marginWidth)/totalWidth,right=(pxRight+marginWidth)/totalWidth;viewFrom=findPosition(structure,left),viewTo=findPosition(structure,right)}viewFrom>line.from&&addGap(line.from,viewFrom,line,structure),viewTo<line.to&&addGap(viewTo,line.to,line,structure)};for(let line of this.viewportLines)Array.isArray(line.type)?line.type.forEach(checkLine):checkLine(line);return gaps}gapSize(line,from,to,structure){let fraction=findFraction(structure,to)-findFraction(structure,from);return this.heightOracle.lineWrapping?line.height*fraction:structure.total*this.heightOracle.charWidth*fraction}updateLineGaps(gaps){LineGap.same(gaps,this.lineGaps)||(this.lineGaps=gaps,this.lineGapDeco=Decoration.set(gaps.map(gap=>gap.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(changes){let deco=this.stateDeco;this.lineGaps.length&&(deco=deco.concat(this.lineGapDeco));let ranges=[];state.RangeSet.spans(deco,this.viewport.from,this.viewport.to,{span(from,to){ranges.push({from,to})},point(){}},20);let changed=0;if(ranges.length!=this.visibleRanges.length)changed=12/* UpdateFlag.Viewport */;else for(let i=0;i<ranges.length&&!(8&changed/* UpdateFlag.ViewportMoved */);i++){let old=this.visibleRanges[i],nw=ranges[i];(old.from!=nw.from||old.to!=nw.to)&&(changed|=4/* UpdateFlag.Viewport */,!(changes&&changes.mapPos(old.from,-1)==nw.from&&changes.mapPos(old.to,1)==nw.to)&&(changed|=8/* UpdateFlag.ViewportMoved */))}return this.visibleRanges=ranges,changed}lineBlockAt(pos){return pos>=this.viewport.from&&pos<=this.viewport.to&&this.viewportLines.find(b=>b.from<=pos&&b.to>=pos)||scaleBlock(this.heightMap.lineAt(pos,QueryType.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(height){return height>=this.viewportLines[0].top&&height<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(l=>l.top<=height&&l.bottom>=height)||scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height),QueryType.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){let base=this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top;return base*this.scaleY}scrollAnchorAt(scrollOffset){let block=this.lineBlockAtHeight(scrollOffset+8);return block.from>=this.viewport.from||200<this.viewportLines[0].top-scrollOffset?block:this.viewportLines[0]}elementAtHeight(height){return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class Viewport{constructor(from,to){this.from=from,this.to=to}}const IdScaler={toDOM(n){return n},fromDOM(n){return n},scale:1,eq(other){return other==this}};class BigScaler{constructor(oracle,heightMap,viewports){let vpHeight=0,base=0,domBase=0;this.viewports=viewports.map(({from,to})=>{let top=heightMap.lineAt(from,QueryType.ByPos,oracle,0,0).top,bottom=heightMap.lineAt(to,QueryType.ByPos,oracle,0,0).bottom;return vpHeight+=bottom-top,{from,to,top,bottom,domTop:0,domBottom:0}}),this.scale=(7e6/* VP.MaxDOMHeight */-vpHeight)/(heightMap.height-vpHeight);for(let obj of this.viewports)obj.domTop=domBase+(obj.top-base)*this.scale,domBase=obj.domBottom=obj.domTop+(obj.bottom-obj.top),base=obj.bottom}toDOM(n){for(let i=0,base=0,domBase=0,vp;;i++){if(vp=i<this.viewports.length?this.viewports[i]:null,!vp||n<vp.top)return domBase+(n-base)*this.scale;if(n<=vp.bottom)return vp.domTop+(n-vp.top);base=vp.bottom,domBase=vp.domBottom}}fromDOM(n){for(let i=0,base=0,domBase=0,vp;;i++){if(vp=i<this.viewports.length?this.viewports[i]:null,!vp||n<vp.domTop)return base+(n-domBase)/this.scale;if(n<=vp.domBottom)return vp.top+(n-vp.domTop);base=vp.bottom,domBase=vp.domBottom}}eq(other){return!!(other instanceof BigScaler)&&this.scale==other.scale&&this.viewports.length==other.viewports.length&&this.viewports.every((vp,i)=>vp.from==other.viewports[i].from&&vp.to==other.viewports[i].to)}}const theme=state.Facet.define({combine:strs=>strs.join(" ")}),darkTheme=state.Facet.define({combine:values=>-1<values.indexOf(!0)}),baseThemeID=styleMod.StyleModule.newName(),baseLightID=styleMod.StyleModule.newName(),baseDarkID=styleMod.StyleModule.newName(),lightDarkIDs={"&light":"."+baseLightID,"&dark":"."+baseDarkID},baseTheme$1=buildTheme("."+baseThemeID,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{// Provide a simple default outline to make sure a focused
// editor is visually distinct. Can't leave the default behavior
// because that will apply to the content element, which is
// inside the scrollable container and doesn't include the
// gutters. We also can't use an 'auto' outline, since those
// are, for some reason, drawn behind the element content, which
// will cause things like the active line background to cover
// the outline (#297).
outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",// Issue #456
boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",// For IE
whiteSpace:"break-spaces",wordBreak:"break-word",// For Safari, which doesn't support overflow-wrap: anywhere
overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},// Two animations defined so that we can switch between them to
// restart the animation without forcing another style
// recomputation.
"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:"\"\"",backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",// Necessary -- prevents margin collapsing
flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},lightDarkIDs),observeOptions={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},useCharData=browser.ie&&11>=browser.ie_version;// IE11 has very broken mutation observers, so we also listen to
// DOMCharacterDataModified there
class DOMObserver{constructor(view){this.view=view,this.active=!1,this.editContext=null,this.selectionRange=new DOMSelectionState,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=view.contentDOM,this.observer=new MutationObserver(mutations=>{for(let mut of mutations)this.queue.push(mut);// IE11 will sometimes (on typing over a selection or
// backspacing out a single character text node) call the
// observer callback before actually updating the DOM.
//
// Unrelatedly, iOS Safari will, when ending a composition,
// sometimes first clear it, deliver the mutations, and then
// reinsert the finished text. CodeMirror's handling of the
// deletion will prevent the reinsertion from happening,
// breaking composition.
(browser.ie&&11>=browser.ie_version||browser.ios&&view.composing)&&mutations.some(m=>"childList"==m.type&&m.removedNodes.length||"characterData"==m.type&&m.oldValue.length>m.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&browser.android&&!1!==view.constructor.EDIT_CONTEXT&&// Chrome <126 doesn't support inverted selections in edit context (#1392)
!(browser.chrome&&126>browser.chrome_version)&&(this.editContext=new EditContextManager(view),view.state.facet(editable)&&(view.contentDOM.editContext=this.editContext.editContext)),useCharData&&(this.onCharData=event=>{this.queue.push({target:event.target,type:"characterData",oldValue:event.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),"function"==typeof ResizeObserver&&(this.resizeScroll=new ResizeObserver(()=>{var _a;(null===(_a=this.view.docView)||void 0===_a?void 0:_a.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(view.scrollDOM)),this.addWindowListeners(this.win=view.win),this.start(),"function"==typeof IntersectionObserver&&(this.intersection=new IntersectionObserver(entries=>{0>this.parentCheck&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),0<entries.length&&0<entries[entries.length-1].intersectionRatio!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(entries=>{0<entries.length&&0<entries[entries.length-1].intersectionRatio&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){0>this.resizeTimeout&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(event){("change"!=event.type&&event.type||event.matches)&&(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(gaps){if(this.gapIntersection&&(gaps.length!=this.gaps.length||this.gaps.some((g,i)=>g!=gaps[i]))){this.gapIntersection.disconnect();for(let gap of gaps)this.gapIntersection.observe(gap);this.gaps=gaps}}onSelectionChange(event){let wasChanged=this.selectionChanged;if(this.readSelectionRange()&&!this.delayedAndroidKey){let{view}=this,sel=this.selectionRange;if(view.state.facet(editable)?view.root.activeElement==this.dom:!!hasSelection(this.dom,sel)){let context=sel.anchorNode&&view.docView.tile.nearest(sel.anchorNode);// Deletions on IE11 fire their events in the wrong order, giving
// us a selection change event before the DOM changes are
// reported.
// Chrome Android has a similar issue when backspacing out a
// selection (#645).
return context&&context.isWidget()&&context.widget.ignoreEvent(event)?void(wasChanged||(this.selectionChanged=!1)):void((browser.ie&&11>=browser.ie_version||browser.android&&browser.chrome)&&!view.state.selection.main.empty&&// (Selection.isCollapsed isn't reliable on IE)
sel.focusNode&&isEquivalentPosition(sel.focusNode,sel.focusOffset,sel.anchorNode,sel.anchorOffset)?this.flushSoon():this.flush(!1))}}}readSelectionRange(){let{view}=this,selection=getSelection(view.root);// The Selection object is broken in shadow roots in Safari. See
// issue #414
if(!selection)return!1;let range=browser.safari&&11==view.root.nodeType&&view.root.activeElement==this.dom&&safariSelectionRangeHack(this.view,selection)||selection;if(!range||this.selectionRange.eq(range))return!1;let local=hasSelection(this.dom,range);// Detect the situation where the browser has, on focus, moved the
// selection to the start of the content element. Reset it to the
// position from the editor state.
return local&&!this.selectionChanged&&view.inputState.lastFocusTime>Date.now()-200&&view.inputState.lastTouchTime<Date.now()-300&&atElementStart(this.dom,range)?(this.view.inputState.lastFocusTime=0,view.docView.updateSelection(),!1):(this.selectionRange.setRange(range),local&&(this.selectionChanged=!0),!0)}setSelectionRange(anchor,head){this.selectionRange.set(anchor.node,anchor.offset,head.node,head.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let i=0,changed=null;for(let dom=this.dom;dom;)if(1==dom.nodeType)!changed&&i<this.scrollTargets.length&&this.scrollTargets[i]==dom?i++:!changed&&(changed=this.scrollTargets.slice(0,i)),changed&&changed.push(dom),dom=dom.assignedSlot||dom.parentNode;else if(11==dom.nodeType)// Shadow root
dom=dom.host;else break;if(i<this.scrollTargets.length&&!changed&&(changed=this.scrollTargets.slice(0,i)),changed){for(let dom of this.scrollTargets)dom.removeEventListener("scroll",this.onScroll);for(let dom of this.scrollTargets=changed)dom.addEventListener("scroll",this.onScroll)}}ignore(f){if(!this.active)return f();try{return this.stop(),f()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,observeOptions),useCharData&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),useCharData&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}// Throw away any pending changes
clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}// Chrome Android, especially in combination with GBoard, not only
// doesn't reliably fire regular key events, but also often
// surrounds the effect of enter or backspace with a bunch of
// composition events that, when interrupted, cause text duplication
// or other kinds of corruption. This hack makes the editor back off
// from handling DOM changes for a moment when such a key is
// detected (via beforeinput or keydown), and then tries to flush
// them or, if that has no effect, dispatches the given key.
delayAndroidKey(key,keyCode){var _a;if(!this.delayedAndroidKey){let flush=()=>{let key=this.delayedAndroidKey;if(key){this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=key.keyCode,this.view.inputState.lastKeyTime=Date.now();let flushed=this.flush();!flushed&&key.force&&dispatchKey(this.dom,key.key,key.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(flush)}// Since backspace beforeinput is sometimes signalled spuriously,
// Enter always takes precedence.
this.delayedAndroidKey&&"Enter"!=key||(this.delayedAndroidKey={key,keyCode,// Only run the key handler when no changes are detected if
// this isn't coming right after another change, in which case
// it is probably part of a weird chain of updates, and should
// be ignored if it returns the DOM to its previous state.
force:this.lastChange<Date.now()-50||null!==(_a=this.delayedAndroidKey)&&void 0!==_a&&_a.force})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){0>this.delayedFlush&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){0<=this.delayedFlush&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let mut of this.observer.takeRecords())this.queue.push(mut);return this.queue}processRecords(){let records=this.pendingRecords();records.length&&(this.queue=[]);let from=-1,to=-1,typeOver=!1;for(let record of records){let range=this.readMutation(record);range&&(range.typeOver&&(typeOver=!0),-1==from?({from,to}=range):(from=Math.min(range.from,from),to=Math.max(range.to,to)))}return{from,to,typeOver}}readChange(){let{from,to,typeOver}=this.processRecords(),newSel=this.selectionChanged&&hasSelection(this.dom,this.selectionRange);if(0>from&&!newSel)return null;-1<from&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let change=new DOMChange(this.view,from,to,typeOver);return this.view.docView.domChanged={newSel:change.newSel?change.newSel.main:null},change}// Apply pending changes, if any
flush(readSelection=!0){// Completely hold off flushing when pending keys are set—the code
// managing those will make sure processRecords is called and the
// view is resynchronized after
if(0<=this.delayedFlush||this.delayedAndroidKey)return!1;readSelection&&this.readSelectionRange();let domChange=this.readChange();if(!domChange)return this.view.requestMeasure(),!1;let startState=this.view.state,handled=applyDOMChange(this.view,domChange);// The view wasn't updated but DOM/selection changes were seen. Reset the view.
return this.view.state==startState&&(domChange.domChanged||domChange.newSel&&!sameSelPos(this.view.state.selection,domChange.newSel.main))&&this.view.update([]),handled}readMutation(rec){let tile=this.view.docView.tile.nearest(rec.target);if(!tile||tile.isWidget())return null;if(tile.markDirty("attributes"==rec.type),"childList"==rec.type){let childBefore=findChild(tile,rec.previousSibling||rec.target.previousSibling,-1),childAfter=findChild(tile,rec.nextSibling||rec.target.nextSibling,1);return{from:childBefore?tile.posAfter(childBefore):tile.posAtStart,to:childAfter?tile.posBefore(childAfter):tile.posAtEnd,typeOver:!1}}return"characterData"==rec.type?{from:tile.posAtStart,to:tile.posAtEnd,typeOver:rec.target.nodeValue==rec.oldValue}:null}setWindow(win){win!=this.win&&(this.removeWindowListeners(this.win),this.win=win,this.addWindowListeners(this.win))}addWindowListeners(win){win.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):win.addEventListener("beforeprint",this.onPrint),win.addEventListener("scroll",this.onScroll),win.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(win){win.removeEventListener("scroll",this.onScroll),win.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):win.removeEventListener("beforeprint",this.onPrint),win.document.removeEventListener("selectionchange",this.onSelectionChange)}update(update){this.editContext&&(this.editContext.update(update),update.startState.facet(editable)!=update.state.facet(editable)&&(update.view.contentDOM.editContext=update.state.facet(editable)?this.editContext.editContext:null))}destroy(){var _a,_b,_c;this.stop(),null===(_a=this.intersection)||void 0===_a?void 0:_a.disconnect(),null===(_b=this.gapIntersection)||void 0===_b?void 0:_b.disconnect(),null===(_c=this.resizeScroll)||void 0===_c?void 0:_c.disconnect();for(let dom of this.scrollTargets)dom.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}class EditContextManager{constructor(view){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(view.state);let context=this.editContext=new window.EditContext({text:view.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,view.state.selection.main.anchor))),selectionEnd:this.toContextPos(view.state.selection.main.head)});for(let event in this.handlers.textupdate=e=>{let main=view.state.selection.main,{anchor,head}=main,from=this.toEditorPos(e.updateRangeStart),to=this.toEditorPos(e.updateRangeEnd);0<=view.inputState.composing&&!this.composing&&(this.composing={contextBase:e.updateRangeStart,editorBase:from,drifted:!1});let deletes=to-from>e.text.length;// If the window doesn't include the anchor, assume changes
// adjacent to a side go up to the anchor.
from==this.from&&anchor<this.from?from=anchor:to==this.to&&anchor>this.to&&(to=anchor);let diff=findDiff(view.state.sliceDoc(from,to),e.text,(deletes?main.from:main.to)-from,deletes?"end":null);// Edit contexts sometimes fire empty changes
if(!diff){let newSel=state.EditorSelection.single(this.toEditorPos(e.selectionStart),this.toEditorPos(e.selectionEnd));return void(sameSelPos(newSel,main)||view.dispatch({selection:newSel,userEvent:"select"}))}let change={from:diff.from+from,to:diff.toA+from,insert:state.Text.of(e.text.slice(diff.from,diff.toB).split("\n"))};if((browser.mac||browser.android)&&change.from==head-1&&/^\. ?$/.test(e.text)&&"off"==view.contentDOM.getAttribute("autocorrect")&&(change={from,to,insert:state.Text.of([e.text.replace("."," ")])}),this.pendingContextChange=change,!view.state.readOnly){let newLen=this.to-this.from+(change.to-change.from+change.insert.length);applyDOMChangeInner(view,change,state.EditorSelection.single(this.toEditorPos(e.selectionStart,newLen),this.toEditorPos(e.selectionEnd,newLen)))}// If the transaction didn't flush our change, revert it so
// that the context is in sync with the editor state again.
this.pendingContextChange&&(this.revertPending(view.state),this.setSelection(view.state)),change.from<change.to&&!change.insert.length&&0<=view.inputState.composing&&!/[\\p{Alphabetic}\\p{Number}_]/.test(context.text.slice(Math.max(0,e.updateRangeStart-1),Math.min(context.text.length,e.updateRangeStart+1)))&&this.handlers.compositionend(e)},this.handlers.characterboundsupdate=e=>{let rects=[],prev=null;for(let i=this.toEditorPos(e.rangeStart),end=this.toEditorPos(e.rangeEnd),rect;i<end;i++)rect=view.coordsForChar(i),prev=rect&&new DOMRect(rect.left,rect.top,rect.right-rect.left,rect.bottom-rect.top)||prev||new DOMRect,rects.push(prev);context.updateCharacterBounds(e.rangeStart,rects)},this.handlers.textformatupdate=e=>{let deco=[];for(let format of e.getTextFormats()){let lineStyle=format.underlineStyle,thickness=format.underlineThickness;if(!/none/i.test(lineStyle)&&!/none/i.test(thickness)){let from=this.toEditorPos(format.rangeStart),to=this.toEditorPos(format.rangeEnd);if(from<to){// These values changed from capitalized custom strings to lower-case CSS keywords in 2025
let style=`text-decoration: underline ${/^[a-z]/.test(lineStyle)?lineStyle+" ":"Dashed"==lineStyle?"dashed ":"Squiggle"==lineStyle?"wavy ":""}${/thin/i.test(thickness)?1:2}px`;deco.push(Decoration.mark({attributes:{style}}).range(from,to))}}}view.dispatch({effects:setEditContextFormatting.of(Decoration.set(deco))})},this.handlers.compositionstart=()=>{0>view.inputState.composing&&(view.inputState.composing=0,view.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(view.inputState.composing=-1,view.inputState.compositionFirstChange=null,this.composing){let{drifted}=this.composing;this.composing=null,drifted&&this.reset(view.state)}},this.handlers)context.addEventListener(event,this.handlers[event]);this.measureReq={read:view=>{this.editContext.updateControlBounds(view.contentDOM.getBoundingClientRect());let sel=getSelection(view.root);sel&&sel.rangeCount&&this.editContext.updateSelectionBounds(sel.getRangeAt(0).getBoundingClientRect())}}}applyEdits(update){let off=0,abort=!1,pending=this.pendingContextChange;return update.changes.iterChanges((fromA,toA,_fromB,_toB,insert)=>{if(!abort){let dLen=insert.length-(toA-fromA);if(pending&&toA>=pending.to){if(pending.from==fromA&&pending.to==toA&&pending.insert.eq(insert))return pending=this.pendingContextChange=null,off+=dLen,void(this.to+=dLen);pending=null,this.revertPending(update.state)}if(fromA+=off,toA+=off,toA<=this.from)this.from+=dLen,this.to+=dLen;else if(fromA<this.to){// Overlaps with window
if(fromA<this.from||toA>this.to||3e4<this.to-this.from+insert.length/* CxVp.MaxSize */)return void(abort=!0);this.editContext.updateText(this.toContextPos(fromA),this.toContextPos(toA),insert.toString()),this.to+=dLen}off+=dLen}}),pending&&!abort&&this.revertPending(update.state),!abort}update(update){let reverted=this.pendingContextChange,startSel=update.startState.selection.main;this.composing&&(this.composing.drifted||!update.changes.touchesRange(startSel.from,startSel.to)&&update.transactions.some(tr=>!tr.isUserEvent("input.type")&&tr.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=update.changes.mapPos(this.composing.editorBase)):this.applyEdits(update)&&this.rangeIsValid(update.state)?(update.docChanged||update.selectionSet||reverted)&&this.setSelection(update.state):(this.pendingContextChange=null,this.reset(update.state)),(update.geometryChanged||update.docChanged||update.selectionSet)&&update.view.requestMeasure(this.measureReq)}resetRange(state){let{head}=state.selection.main;this.from=Math.max(0,head-1e4/* CxVp.Margin */),this.to=Math.min(state.doc.length,head+1e4/* CxVp.Margin */)}reset(state){this.resetRange(state),this.editContext.updateText(0,this.editContext.text.length,state.doc.sliceString(this.from,this.to)),this.setSelection(state)}revertPending(state){let pending=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(pending.from),this.toContextPos(pending.from+pending.insert.length),state.doc.sliceString(pending.from,pending.to))}setSelection(state){let{main}=state.selection,start=this.toContextPos(Math.max(this.from,Math.min(this.to,main.anchor))),end=this.toContextPos(main.head);(this.editContext.selectionStart!=start||this.editContext.selectionEnd!=end)&&this.editContext.updateSelection(start,end)}rangeIsValid(state){let{head}=state.selection.main;return!(0<this.from&&500>head-this.from/* CxVp.MinMargin */||this.to<state.doc.length&&500>this.to-head/* CxVp.MinMargin */||30000<this.to-this.from)}toEditorPos(contextPos,clipLen=this.to-this.from){contextPos=Math.min(contextPos,clipLen);let c=this.composing;return c&&c.drifted?c.editorBase+(contextPos-c.contextBase):contextPos+this.from}toContextPos(editorPos){let c=this.composing;return c&&c.drifted?c.contextBase+(editorPos-c.editorBase):editorPos-this.from}destroy(){for(let event in this.handlers)this.editContext.removeEventListener(event,this.handlers[event])}}// The editor's update state machine looks something like this:
//
//     Idle → Updating ⇆ Idle (unchecked) → Measuring → Idle
//                                         ↑      ↓
//                                         Updating (measure)
//
// The difference between 'Idle' and 'Idle (unchecked)' lies in
// whether a layout check has been scheduled. A regular update through
// the `update` method updates the DOM in a write-only fashion, and
// relies on a check (scheduled with `requestAnimationFrame`) to make
// sure everything is where it should be and the viewport covers the
// visible code. That check continues to measure and then optionally
// update until it reaches a coherent state.
/**
		An editor view represents the editor's user interface. It holds
		the editable DOM surface, and possibly other elements such as the
		line number gutter. It handles events and dispatches state
		transactions for editing actions.
		*/class EditorView{/**
		    The current editor state.
		    */get state(){return this.viewState.state}/**
		    To be able to display large documents without consuming too much
		    memory or overloading the browser, CodeMirror only draws the
		    code that is visible (plus a margin around it) to the DOM. This
		    property tells you the extent of the current drawn viewport, in
		    document positions.
		    */get viewport(){return this.viewState.viewport}/**
		    When there are, for example, large collapsed ranges in the
		    viewport, its size can be a lot bigger than the actual visible
		    content. Thus, if you are doing something like styling the
		    content in the viewport, it is preferable to only do so for
		    these ranges, which are the subset of the viewport that is
		    actually drawn.
		    */get visibleRanges(){return this.viewState.visibleRanges}/**
		    Returns false when the editor is entirely scrolled out of view
		    or otherwise hidden.
		    */get inView(){return this.viewState.inView}/**
		    Indicates whether the user is currently composing text via
		    [IME](https://en.wikipedia.org/wiki/Input_method), and at least
		    one change has been made in the current composition.
		    */get composing(){return!!this.inputState&&0<this.inputState.composing}/**
		    Indicates whether the user is currently in composing state. Note
		    that on some platforms, like Android, this will be the case a
		    lot, since just putting the cursor on a word starts a
		    composition there.
		    */get compositionStarted(){return!!this.inputState&&0<=this.inputState.composing}/**
		    The document or shadow root that the view lives in.
		    */get root(){return this._root}/**
		    @internal
		    */get win(){return this.dom.ownerDocument.defaultView||window}/**
		    Construct a new view. You'll want to either provide a `parent`
		    option, or put `view.dom` into your document after creating a
		    view, so that the user can see the editor.
		    */constructor(config={}){var _a;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2/* UpdateState.Updating */,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),config.parent&&config.parent.appendChild(this.dom);let{dispatch}=config;this.dispatchTransactions=config.dispatchTransactions||dispatch&&(trs=>trs.forEach(tr=>dispatch(tr,this)))||(trs=>this.update(trs)),this.dispatch=this.dispatch.bind(this),this._root=config.root||getRoot(config.parent)||document,this.viewState=new ViewState(this,config.state||state.EditorState.create(config)),config.scrollTo&&config.scrollTo.is(scrollIntoView)&&(this.viewState.scrollTarget=config.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(viewPlugin).map(spec=>new PluginInstance(spec));for(let plugin of this.plugins)plugin.update(this);this.observer=new DOMObserver(this),this.inputState=new InputState(this),this.inputState.ensureHandlers(this.plugins),this.docView=new DocView(this),this.mountStyles(),this.updateAttrs(),this.updateState=0/* UpdateState.Idle */,this.requestMeasure(),(null===(_a=document.fonts)||void 0===_a?void 0:_a.ready)&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...input){let trs=1==input.length&&input[0]instanceof state.Transaction?input:1==input.length&&Array.isArray(input[0])?input[0]:[this.state.update(...input)];this.dispatchTransactions(trs,this)}/**
		    Update the view for the given array of transactions. This will
		    update the visible document and selection to match the state
		    produced by the transactions, and notify view plugins of the
		    change. You should usually call
		    [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
		    as a primitive.
		    */update(transactions){if(0!=this.updateState/* UpdateState.Idle */)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let redrawn=!1,attrsChanged=!1,state$1=this.state,update;for(let tr of transactions){if(tr.startState!=state$1)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");state$1=tr.state}if(this.destroyed)return void(this.viewState.state=state$1);let focus=this.hasFocus,focusFlag=0,dispatchFocus=null;transactions.some(tr=>tr.annotation(isFocusChange))?(this.inputState.notifiedFocused=focus,focusFlag=1/* UpdateFlag.Focus */):focus!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=focus,dispatchFocus=focusChangeTransaction(state$1,focus),!dispatchFocus&&(focusFlag=1/* UpdateFlag.Focus */));// If there was a pending DOM change, eagerly read it and try to
// apply it after the given transactions.
let pendingKey=this.observer.delayedAndroidKey,domChange=null;// When the phrases change, redraw the editor
if(pendingKey?(this.observer.clearDelayedAndroidKey(),domChange=this.observer.readChange(),(domChange&&!this.state.doc.eq(state$1.doc)||!this.state.selection.eq(state$1.selection))&&(domChange=null)):this.observer.clear(),state$1.facet(state.EditorState.phrases)!=this.state.facet(state.EditorState.phrases))return this.setState(state$1);update=ViewUpdate.create(this,state$1,transactions),update.flags|=focusFlag;let scrollTarget=this.viewState.scrollTarget;try{this.updateState=2/* UpdateState.Updating */;for(let tr of transactions){if(scrollTarget&&(scrollTarget=scrollTarget.map(tr.changes)),tr.scrollIntoView){let{main}=tr.state.selection,{x,y}=this.state.facet(EditorView.cursorScrollMargin);scrollTarget=new ScrollTarget(main.empty?main:state.EditorSelection.cursor(main.head,main.head>main.anchor?-1:1),"nearest","nearest",y,x)}for(let e of tr.effects)e.is(scrollIntoView)&&(scrollTarget=e.value.clip(this.state))}this.viewState.update(update,scrollTarget),this.bidiCache=CachedOrder.update(this.bidiCache,update.changes),update.empty||(this.updatePlugins(update),this.inputState.update(update)),redrawn=this.docView.update(update),this.state.facet(styleModule)!=this.styleModules&&this.mountStyles(),attrsChanged=this.updateAttrs(),this.showAnnouncements(transactions),this.docView.updateSelection(redrawn,transactions.some(tr=>tr.isUserEvent("select.pointer")))}finally{this.updateState=0/* UpdateState.Idle */}if(update.startState.facet(theme)!=update.state.facet(theme)&&(this.viewState.mustMeasureContent=!0),(redrawn||attrsChanged||scrollTarget||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),redrawn&&this.docViewUpdate(),!update.empty)for(let listener of this.state.facet(updateListener))try{listener(update)}catch(e){logException(this.state,e,"update listener")}(dispatchFocus||domChange)&&Promise.resolve().then(()=>{dispatchFocus&&this.state==dispatchFocus.startState&&this.dispatch(dispatchFocus),domChange&&!applyDOMChange(this,domChange)&&pendingKey.force&&dispatchKey(this.contentDOM,pendingKey.key,pendingKey.keyCode)})}/**
		    Reset the view to the given state. (This will cause the entire
		    document to be redrawn and all view plugins to be reinitialized,
		    so you should probably only use it when the new state isn't
		    derived from the old state. Otherwise, use
		    [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
		    */setState(newState){if(0!=this.updateState/* UpdateState.Idle */)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed)return void(this.viewState.state=newState);this.updateState=2/* UpdateState.Updating */;let hadFocus=this.hasFocus;try{for(let plugin of this.plugins)plugin.destroy(this);this.viewState=new ViewState(this,newState),this.plugins=newState.facet(viewPlugin).map(spec=>new PluginInstance(spec)),this.pluginMap.clear();for(let plugin of this.plugins)plugin.update(this);this.docView.destroy(),this.docView=new DocView(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0/* UpdateState.Idle */}hadFocus&&this.focus(),this.requestMeasure()}updatePlugins(update){let prevSpecs=update.startState.facet(viewPlugin),specs=update.state.facet(viewPlugin);if(prevSpecs!=specs){let newPlugins=[];for(let spec of specs){let found=prevSpecs.indexOf(spec);if(0>found)newPlugins.push(new PluginInstance(spec));else{let plugin=this.plugins[found];plugin.mustUpdate=update,newPlugins.push(plugin)}}for(let plugin of this.plugins)plugin.mustUpdate!=update&&plugin.destroy(this);this.plugins=newPlugins,this.pluginMap.clear()}else for(let p of this.plugins)p.mustUpdate=update;for(let i=0;i<this.plugins.length;i++)this.plugins[i].update(this);prevSpecs!=specs&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let plugin of this.plugins){let val=plugin.value;if(val&&val.docViewUpdate)try{val.docViewUpdate(this)}catch(e){logException(this.state,e,"doc view update listener")}}}/**
		    @internal
		    */measure(flush=!0){if(this.destroyed)return;if(-1<this.measureScheduled&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey)return this.measureScheduled=-1,void this.requestMeasure();this.measureScheduled=0,flush&&this.observer.forceFlush();let updated=null,scroll=this.viewState.scrollParent,scrollOffset=this.viewState.getScrollOffset(),{scrollAnchorPos,scrollAnchorHeight}=this.viewState;1<Math.abs(scrollOffset-this.viewState.scrollOffset)&&(scrollAnchorHeight=-1),this.viewState.scrollAnchorHeight=-1;try{for(let i=0;;i++){if(0>scrollAnchorHeight)if(isScrolledToBottom(scroll||this.win))scrollAnchorPos=-1,scrollAnchorHeight=this.viewState.heightMap.height;else{let block=this.viewState.scrollAnchorAt(scrollOffset);scrollAnchorPos=block.from,scrollAnchorHeight=block.top}this.updateState=1/* UpdateState.Measuring */;let changed=this.viewState.measure();if(!changed&&!this.measureRequests.length&&null==this.viewState.scrollTarget)break;if(5<i){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let measuring=[];// Only run measure requests in this cycle when the viewport didn't change
4&changed/* UpdateFlag.Viewport */||([this.measureRequests,measuring]=[measuring,this.measureRequests]);let measured=measuring.map(m=>{try{return m.read(this)}catch(e){return logException(this.state,e),BadMeasure}}),update=ViewUpdate.create(this,this.state,[]),redrawn=!1;update.flags|=changed,updated?updated.flags|=changed:updated=update,this.updateState=2/* UpdateState.Updating */,update.empty||(this.updatePlugins(update),this.inputState.update(update),this.updateAttrs(),redrawn=this.docView.update(update),redrawn&&this.docViewUpdate());for(let i=0;i<measuring.length;i++)if(measured[i]!=BadMeasure)try{let m=measuring[i];m.write&&m.write(measured[i],this)}catch(e){logException(this.state,e)}if(redrawn&&this.docView.updateSelection(!0),!update.viewportChanged&&0==this.measureRequests.length){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,scrollAnchorHeight=-1;continue}else{let newAnchorHeight=0>scrollAnchorPos?this.viewState.heightMap.height:this.viewState.lineBlockAt(scrollAnchorPos).top,diff=(newAnchorHeight-scrollAnchorHeight)/this.scaleY;if((1<diff||-1>diff)&&(scroll==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){scrollOffset+=diff,scroll?scroll.scrollTop+=diff:this.win.scrollBy(0,diff),scrollAnchorHeight=-1;continue}}break}}}finally{this.updateState=0/* UpdateState.Idle */,this.measureScheduled=-1}if(updated&&!updated.empty)for(let listener of this.state.facet(updateListener))listener(updated)}/**
		    Get the CSS classes for the currently active editor themes.
		    */get themeClasses(){return baseThemeID+" "+(this.state.facet(darkTheme)?baseDarkID:baseLightID)+" "+this.state.facet(theme)}updateAttrs(){let editorAttrs=attrsFromFacet(this,editorAttributes,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),contentAttrs={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(editable)?"true":"false",class:"cm-content",style:`${browser.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(contentAttrs["aria-readonly"]="true"),attrsFromFacet(this,contentAttributes,contentAttrs);let changed=this.observer.ignore(()=>{let changedContent=updateAttrs(this.contentDOM,this.contentAttrs,contentAttrs),changedEditor=updateAttrs(this.dom,this.editorAttrs,editorAttrs);return changedContent||changedEditor});return this.editorAttrs=editorAttrs,this.contentAttrs=contentAttrs,changed}showAnnouncements(trs){let first=!0;for(let tr of trs)for(let effect of tr.effects)if(effect.is(EditorView.announce)){first&&(this.announceDOM.textContent=""),first=!1;let div=this.announceDOM.appendChild(document.createElement("div"));div.textContent=effect.value}}mountStyles(){this.styleModules=this.state.facet(styleModule);let nonce=this.state.facet(EditorView.cspNonce);styleMod.StyleModule.mount(this.root,this.styleModules.concat(baseTheme$1).reverse(),nonce?{nonce}:void 0)}readMeasured(){if(2==this.updateState/* UpdateState.Updating */)throw new Error("Reading the editor layout isn't allowed during an update");0==this.updateState/* UpdateState.Idle */&&-1<this.measureScheduled&&this.measure(!1)}/**
		    Schedule a layout measurement, optionally providing callbacks to
		    do custom DOM measuring followed by a DOM write phase. Using
		    this is preferable reading DOM layout directly from, for
		    example, an event handler, because it'll make sure measuring and
		    drawing done by other components is synchronized, avoiding
		    unnecessary DOM layout computations.
		    */requestMeasure(request){if(0>this.measureScheduled&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),request){if(-1<this.measureRequests.indexOf(request))return;if(null!=request.key)for(let i=0;i<this.measureRequests.length;i++)if(this.measureRequests[i].key===request.key)return void(this.measureRequests[i]=request);this.measureRequests.push(request)}}/**
		    Get the value of a specific plugin, if present. Note that
		    plugins that crash can be dropped from a view, so even when you
		    know you registered a given plugin, it is recommended to check
		    the return value of this method.
		    */plugin(plugin){let known=this.pluginMap.get(plugin);return(void 0===known||known&&known.plugin!=plugin)&&this.pluginMap.set(plugin,known=this.plugins.find(p=>p.plugin==plugin)||null),known&&known.update(this).value}/**
		    The top position of the document, in screen coordinates. This
		    may be negative when the editor is scrolled down. Points
		    directly to the top of the first line, not above the padding.
		    */get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}/**
		    Reports the padding above and below the document.
		    */get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}/**
		    If the editor is transformed with CSS, this provides the scale
		    along the X axis. Otherwise, it will just be 1. Note that
		    transforms other than translation and scaling are not supported.
		    */get scaleX(){return this.viewState.scaleX}/**
		    Provide the CSS transformed scale along the Y axis.
		    */get scaleY(){return this.viewState.scaleY}/**
		    Find the text line or block widget at the given vertical
		    position (which is interpreted as relative to the [top of the
		    document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
		    */elementAtHeight(height){return this.readMeasured(),this.viewState.elementAtHeight(height)}/**
		    Find the line block (see
		    [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
		    height, again interpreted relative to the [top of the
		    document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
		    */lineBlockAtHeight(height){return this.readMeasured(),this.viewState.lineBlockAtHeight(height)}/**
		    Get the extent and vertical position of all [line
		    blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
		    are relative to the [top of the
		    document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
		    */get viewportLineBlocks(){return this.viewState.viewportLines}/**
		    Find the line block around the given document position. A line
		    block is a range delimited on both sides by either a
		    non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
		    start/end of the document. It will usually just hold a line of
		    text, but may be broken into multiple textblocks by block
		    widgets.
		    */lineBlockAt(pos){return this.viewState.lineBlockAt(pos)}/**
		    The editor's total content height.
		    */get contentHeight(){return this.viewState.contentHeight}/**
		    Move a cursor position by [grapheme
		    cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
		    the motion is away from the line start, or towards it. In
		    bidirectional text, the line is traversed in visual order, using
		    the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
		    When the start position was the last one on the line, the
		    returned position will be across the line break. If there is no
		    further line, the original position is returned.
		    
		    By default, this method moves over a single cluster. The
		    optional `by` argument can be used to move across more. It will
		    be called with the first cluster as argument, and should return
		    a predicate that determines, for each subsequent cluster,
		    whether it should also be moved over.
		    */moveByChar(start,forward,by){return skipAtoms(this,start,moveByChar(this,start,forward,by))}/**
		    Move a cursor position across the next group of either
		    [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
		    non-whitespace characters.
		    */moveByGroup(start,forward){return skipAtoms(this,start,moveByChar(this,start,forward,initial=>byGroup(this,start.head,initial)))}/**
		    Get the cursor position visually at the start or end of a line.
		    Note that this may differ from the _logical_ position at its
		    start or end (which is simply at `line.from`/`line.to`) if text
		    at the start or end goes against the line's base text direction.
		    */visualLineSide(line,end){let order=this.bidiSpans(line),dir=this.textDirectionAt(line.from),span=order[end?order.length-1:0];return state.EditorSelection.cursor(span.side(end,dir)+line.from,span.forward(!end,dir)?1:-1)}/**
		    Move to the next line boundary in the given direction. If
		    `includeWrap` is true, line wrapping is on, and there is a
		    further wrap point on the current line, the wrap point will be
		    returned. Otherwise this function will return the start or end
		    of the line.
		    */moveToLineBoundary(start,forward,includeWrap=!0){return moveToLineBoundary(this,start,forward,includeWrap)}/**
		    Move a cursor position vertically. When `distance` isn't given,
		    it defaults to moving to the next line (including wrapped
		    lines). Otherwise, `distance` should provide a positive distance
		    in pixels.
		    
		    When `start` has a
		    [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
		    motion will use that as a target horizontal position. Otherwise,
		    the cursor's own horizontal position is used. The returned
		    cursor will have its goal column set to whichever column was
		    used.
		    */moveVertically(start,forward,distance){return skipAtoms(this,start,moveVertically(this,start,forward,distance))}/**
		    Find the DOM parent node and offset (child offset if `node` is
		    an element, character offset when it is a text node) at the
		    given document position.
		    
		    Note that for positions that aren't currently in
		    `visibleRanges`, the resulting DOM position isn't necessarily
		    meaningful (it may just point before or after a placeholder
		    element).
		    */domAtPos(pos,side=1){return this.docView.domAtPos(pos,side)}/**
		    Find the document position at the given DOM node. Can be useful
		    for associating positions with DOM events. Will raise an error
		    when `node` isn't part of the editor content.
		    */posAtDOM(node,offset=0){return this.docView.posFromDOM(node,offset)}posAtCoords(coords,precise=!0){this.readMeasured();let found=posAtCoords(this,coords,precise);return found&&found.pos}posAndSideAtCoords(coords,precise=!0){return this.readMeasured(),posAtCoords(this,coords,precise)}/**
		    Get the screen coordinates at the given document position.
		    `side` determines whether the coordinates are based on the
		    element before (-1) or after (1) the position (if no element is
		    available on the given side, the method will transparently use
		    another strategy to get reasonable coordinates).
		    */coordsAtPos(pos,side=1){this.readMeasured();let rect=this.docView.coordsAt(pos,side);if(!rect||rect.left==rect.right)return rect;let line=this.state.doc.lineAt(pos),order=this.bidiSpans(line),span=order[BidiSpan.find(order,pos-line.from,-1,side)];return flattenRect(rect,span.dir==exports.Direction.LTR==0<side)}/**
		    Return the rectangle around a given character. If `pos` does not
		    point in front of a character that is in the viewport and
		    rendered (i.e. not replaced, not a line break), this will return
		    null. For space characters that are a line wrap point, this will
		    return the position before the line break.
		    */coordsForChar(pos){return this.readMeasured(),this.docView.coordsForChar(pos)}/**
		    The default width of a character in the editor. May not
		    accurately reflect the width of all characters (given variable
		    width fonts or styling of invididual ranges).
		    */get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}/**
		    The default height of a line in the editor. May not be accurate
		    for all lines.
		    */get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}/**
		    The text direction
		    ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
		    CSS property) of the editor's content element.
		    */get textDirection(){return this.viewState.defaultTextDirection}/**
		    Find the text direction of the block at the given position, as
		    assigned by CSS. If
		    [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
		    isn't enabled, or the given position is outside of the viewport,
		    this will always return the same as
		    [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
		    this may trigger a DOM layout.
		    */textDirectionAt(pos){let perLine=this.state.facet(perLineTextDirection);return!perLine||pos<this.viewport.from||pos>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(pos))}/**
		    Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
		    (as determined by the
		    [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
		    CSS property of its content element).
		    */get lineWrapping(){return this.viewState.heightOracle.lineWrapping}/**
		    Returns the bidirectional text structure of the given line
		    (which should be in the current document) as an array of span
		    objects. The order of these spans matches the [text
		    direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
		    left-to-right, the leftmost spans come first, otherwise the
		    rightmost spans come first.
		    */bidiSpans(line){if(line.length>MaxBidiLine)return trivialOrder(line.length);let dir=this.textDirectionAt(line.from),isolates;for(let entry of this.bidiCache)if(entry.from==line.from&&entry.dir==dir&&(entry.fresh||isolatesEq(entry.isolates,isolates=getIsolatedRanges(this,line))))return entry.order;isolates||(isolates=getIsolatedRanges(this,line));let order=computeOrder(line.text,dir,isolates);return this.bidiCache.push(new CachedOrder(line.from,line.to,dir,isolates,!0,order)),order}/**
		    Check whether the editor has focus.
		    */get hasFocus(){var _a;// Safari return false for hasFocus when the context menu is open
// or closing, which leads us to ignore selection changes from the
// context menu because it looks like the editor isn't focused.
// This kludges around that.
return(this.dom.ownerDocument.hasFocus()||browser.safari&&(null===(_a=this.inputState)||void 0===_a?void 0:_a.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}/**
		    Put focus on the editor.
		    */focus(){this.observer.ignore(()=>{focusPreventScroll(this.contentDOM),this.docView.updateSelection()})}/**
		    Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
		    necessary when moving the editor's existing DOM to a new window or shadow root.
		    */setRoot(root){this._root!=root&&(this._root=root,this.observer.setWindow((9==root.nodeType?root:root.ownerDocument).defaultView||window),this.mountStyles())}/**
		    Clean up this editor view, removing its element from the
		    document, unregistering event handlers, and notifying
		    plugins. The view instance can no longer be used after
		    calling this.
		    */destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let plugin of this.plugins)plugin.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),-1<this.measureScheduled&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}/**
		    Returns an effect that can be
		    [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
		    cause it to scroll the given position or range into view.
		    */static scrollIntoView(pos,options={}){var _a,_b,_c,_d;return scrollIntoView.of(new ScrollTarget("number"==typeof pos?state.EditorSelection.cursor(pos):pos,null!==(_a=options.y)&&void 0!==_a?_a:"nearest",null!==(_b=options.x)&&void 0!==_b?_b:"nearest",null!==(_c=options.yMargin)&&void 0!==_c?_c:5,null!==(_d=options.xMargin)&&void 0!==_d?_d:5))}/**
		    Return an effect that resets the editor to its current (at the
		    time this method was called) scroll position. Note that this
		    only affects the editor's own scrollable element, not parents.
		    See also
		    [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
		    
		    The effect should be used with a document identical to the one
		    it was created for. Failing to do so is not an error, but may
		    not scroll to the expected position. You can
		    [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
		    */scrollSnapshot(){let{scrollTop,scrollLeft}=this.scrollDOM,ref=this.viewState.scrollAnchorAt(scrollTop);return scrollIntoView.of(new ScrollTarget(state.EditorSelection.cursor(ref.from),"start","start",ref.top-scrollTop,scrollLeft,!0))}/**
		    Enable or disable tab-focus mode, which disables key bindings
		    for Tab and Shift-Tab, letting the browser's default
		    focus-changing behavior go through instead. This is useful to
		    prevent trapping keyboard users in your editor.
		    
		    Without argument, this toggles the mode. With a boolean, it
		    enables (true) or disables it (false). Given a number, it
		    temporarily enables the mode until that number of milliseconds
		    have passed or another non-Tab key is pressed.
		    */setTabFocusMode(to){null==to?this.inputState.tabFocusMode=0>this.inputState.tabFocusMode?0:-1:"boolean"==typeof to?this.inputState.tabFocusMode=to?0:-1:0!=this.inputState.tabFocusMode&&(this.inputState.tabFocusMode=Date.now()+to)}/**
		    Returns an extension that can be used to add DOM event handlers.
		    The value should be an object mapping event names to handler
		    functions. For any given event, such functions are ordered by
		    extension precedence, and the first handler to return true will
		    be assumed to have handled that event, and no other handlers or
		    built-in behavior will be activated for it. These are registered
		    on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
		    for `scroll` handlers, which will be called any time the
		    editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
		    its parent nodes is scrolled.
		    */static domEventHandlers(handlers){return ViewPlugin.define(()=>({}),{eventHandlers:handlers})}/**
		    Create an extension that registers DOM event observers. Contrary
		    to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
		    observers can't be prevented from running by a higher-precedence
		    handler returning true. They also don't prevent other handlers
		    and observers from running when they return true, and should not
		    call `preventDefault`.
		    */static domEventObservers(observers){return ViewPlugin.define(()=>({}),{eventObservers:observers})}/**
		    Create a theme extension. The first argument can be a
		    [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
		    style spec providing the styles for the theme. These will be
		    prefixed with a generated class for the style.
		    
		    Because the selectors will be prefixed with a scope class, rule
		    that directly match the editor's [wrapper
		    element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
		    added—need to be explicitly differentiated by adding an `&` to
		    the selector for that element—for example
		    `&.cm-focused`.
		    
		    When `dark` is set to true, the theme will be marked as dark,
		    which will cause the `&dark` rules from [base
		    themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
		    `&light` when a light theme is active).
		    */static theme(spec,options){let prefix=styleMod.StyleModule.newName(),result=[theme.of(prefix),styleModule.of(buildTheme(`.${prefix}`,spec))];return options&&options.dark&&result.push(darkTheme.of(!0)),result}/**
		    Create an extension that adds styles to the base theme. Like
		    with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
		    place of the editor wrapper element when directly targeting
		    that. You can also use `&dark` or `&light` instead to only
		    target editors with a dark or light theme.
		    */static baseTheme(spec){return state.Prec.lowest(styleModule.of(buildTheme("."+baseThemeID,spec,lightDarkIDs)))}/**
		    Retrieve an editor view instance from the view's DOM
		    representation.
		    */static findFromDOM(dom){var _a;let content=dom.querySelector(".cm-content"),tile=content&&Tile.get(content)||Tile.get(dom);return(null===(_a=null===tile||void 0===tile?void 0:tile.root)||void 0===_a?void 0:_a.view)||null}}/**
		Facet to add a [style
		module](https://code.haverbeke.berlin/marijn/style-mod#documentation) to
		an editor view. The view will ensure that the module is
		mounted in its [document
		root](https://codemirror.net/6/docs/ref/#view.EditorView.constructor^config.root).
		*/EditorView.styleModule=styleModule,EditorView.inputHandler=inputHandler,EditorView.clipboardInputFilter=clipboardInputFilter,EditorView.clipboardOutputFilter=clipboardOutputFilter,EditorView.scrollHandler=scrollHandler,EditorView.focusChangeEffect=focusChangeEffect,EditorView.perLineTextDirection=perLineTextDirection,EditorView.exceptionSink=exceptionSink,EditorView.updateListener=updateListener,EditorView.editable=editable,EditorView.mouseSelectionStyle=mouseSelectionStyle,EditorView.dragMovesSelection=dragMovesSelection$1,EditorView.clickAddsSelectionRange=clickAddsSelectionRange,EditorView.decorations=decorations,EditorView.blockWrappers=blockWrappers,EditorView.outerDecorations=outerDecorations,EditorView.atomicRanges=atomicRanges,EditorView.bidiIsolatedRanges=bidiIsolatedRanges,EditorView.cursorScrollMargin=state.Facet.define({combine:inputs=>{let x=5,y=5;for(let i of inputs)"number"==typeof i?x=y=i:({x,y}=i);return{x,y}}}),EditorView.scrollMargins=scrollMargins,EditorView.darkTheme=darkTheme,EditorView.cspNonce=state.Facet.define({combine:values=>values.length?values[0]:""}),EditorView.contentAttributes=contentAttributes,EditorView.editorAttributes=editorAttributes,EditorView.lineWrapping=EditorView.contentAttributes.of({class:"cm-lineWrapping"}),EditorView.announce=state.StateEffect.define();// Maximum line length for which we compute accurate bidi info
const MaxBidiLine=4096,BadMeasure={};class CachedOrder{constructor(from,to,dir,isolates,fresh,order){this.from=from,this.to=to,this.dir=dir,this.isolates=isolates,this.fresh=fresh,this.order=order}static update(cache,changes){if(changes.empty&&!cache.some(c=>c.fresh))return cache;let result=[],lastDir=cache.length?cache[cache.length-1].dir:exports.Direction.LTR;for(let i=Math.max(0,cache.length-10),entry;i<cache.length;i++)entry=cache[i],entry.dir!=lastDir||changes.touchesRange(entry.from,entry.to)||result.push(new CachedOrder(changes.mapPos(entry.from,1),changes.mapPos(entry.to,-1),entry.dir,entry.isolates,!1,entry.order));return result}}const currentPlatform=browser.mac?"mac":browser.windows?"win":browser.linux?"linux":"key",handleKeyEvents=state.Prec.default(EditorView.domEventHandlers({keydown(event,view){return runHandlers(getKeymap(view.state),event,view,"editor")}})),keymap=state.Facet.define({enables:handleKeyEvents}),Keymaps=new WeakMap;/**
		Facet used for registering keymaps.

		You can add multiple keymaps to an editor. Their priorities
		determine their precedence (the ones specified early or with high
		priority get checked first). When a handler has returned `true`
		for a given key, no further handlers are called.
		*/let storedPrefix=null;const PrefixTimeout=4e3;let currentKeyEvent=null;class RectangleMarker{/**
		    Create a marker with the given class and dimensions. If `width`
		    is null, the DOM element will get no width style.
		    */constructor(className,/**
		    The left position of the marker (in pixels, document-relative).
		    */left,/**
		    The top position of the marker.
		    */top,/**
		    The width of the marker, or null if it shouldn't get a width assigned.
		    */width,/**
		    The height of the marker.
		    */height){this.className=className,this.left=left,this.top=top,this.width=width,this.height=height}draw(){let elt=document.createElement("div");return elt.className=this.className,this.adjust(elt),elt}update(elt,prev){return prev.className==this.className&&(this.adjust(elt),!0)}adjust(elt){elt.style.left=this.left+"px",elt.style.top=this.top+"px",null!=this.width&&(elt.style.width=this.width+"px"),elt.style.height=this.height+"px"}eq(p){return this.left==p.left&&this.top==p.top&&this.width==p.width&&this.height==p.height&&this.className==p.className}/**
		    Create a set of rectangles for the given selection range,
		    assigning them theclass`className`. Will create a single
		    rectangle for empty ranges, and a set of selection-style
		    rectangles covering the range's content (in a bidi-aware
		    way) for non-empty ones.
		    */static forRange(view,className,range){if(range.empty){let pos=view.coordsAtPos(range.head,range.assoc||1);if(!pos)return[];let base=getBase(view);return[new RectangleMarker(className,pos.left-base.left,pos.top-base.top,null,pos.bottom-pos.top)]}return rectanglesForRange(view,className,range)}}class LayerView{constructor(view,layer){this.view=view,this.layer=layer,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=view.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),layer.above&&this.dom.classList.add("cm-layer-above"),layer.class&&this.dom.classList.add(layer.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(view.state),view.requestMeasure(this.measureReq),layer.mount&&layer.mount(this.dom,view)}update(update){update.startState.facet(layerOrder)!=update.state.facet(layerOrder)&&this.setOrder(update.state),(this.layer.update(update,this.dom)||update.geometryChanged)&&(this.scale(),update.view.requestMeasure(this.measureReq))}docViewUpdate(view){!1!==this.layer.updateOnDocViewUpdate&&view.requestMeasure(this.measureReq)}setOrder(state){let pos=0,order=state.facet(layerOrder);for(;pos<order.length&&order[pos]!=this.layer;)pos++;this.dom.style.zIndex=(this.layer.above?150:-1)-pos+""}measure(){return this.layer.markers(this.view)}scale(){let{scaleX,scaleY}=this.view;(scaleX!=this.scaleX||scaleY!=this.scaleY)&&(this.scaleX=scaleX,this.scaleY=scaleY,this.dom.style.transform=`scale(${1/scaleX}, ${1/scaleY})`)}draw(markers){if(markers.length!=this.drawn.length||markers.some((p,i)=>!sameMarker(p,this.drawn[i]))){let old=this.dom.firstChild,oldI=0;for(let marker of markers)marker.update&&old&&marker.constructor&&this.drawn[oldI].constructor&&marker.update(old,this.drawn[oldI])?(old=old.nextSibling,oldI++):this.dom.insertBefore(marker.draw(),old);for(;old;){let next=old.nextSibling;old.remove(),old=next}this.drawn=markers,browser.webkit&&(// Issue #1600, 1627, 1686
this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const layerOrder=state.Facet.define(),selectionConfig=state.Facet.define({combine(configs){return state.combineConfig(configs,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(a,b)=>Math.min(a,b),drawRangeCursor:(a,b)=>a||b})}}),cursorLayer=layer({above:!0,markers(view){let{state:state$1}=view,conf=state$1.facet(selectionConfig),cursors=[];for(let r of state$1.selection.ranges){let prim=r==state$1.selection.main;if(r.empty||conf.drawRangeCursor&&!(prim&&browser.ios&&conf.iosSelectionHandles)){let className=prim?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",cursor=r.empty?r:state.EditorSelection.cursor(r.head,r.assoc);for(let piece of RectangleMarker.forRange(view,className,cursor))cursors.push(piece)}}return cursors},update(update,dom){update.transactions.some(tr=>tr.selection)&&(dom.style.animationName="cm-blink"==dom.style.animationName?"cm-blink2":"cm-blink");let confChange=configChanged(update);return confChange&&setBlinkRate(update.state,dom),update.docChanged||update.selectionSet||confChange},mount(dom,view){setBlinkRate(view.state,dom)},class:"cm-cursorLayer"}),selectionLayer=layer({above:!1,markers(view){let markers=[],{main,ranges}=view.state.selection;for(let r of ranges)if(!r.empty)for(let marker of RectangleMarker.forRange(view,"cm-selectionBackground",r))markers.push(marker);if(browser.ios&&!main.empty&&view.state.facet(selectionConfig).iosSelectionHandles){for(let piece of RectangleMarker.forRange(view,"cm-selectionHandle cm-selectionHandle-start",state.EditorSelection.cursor(main.from,1)))markers.push(piece);for(let piece of RectangleMarker.forRange(view,"cm-selectionHandle cm-selectionHandle-end",state.EditorSelection.cursor(main.to,1)))markers.push(piece)}return markers},update(update,dom){return update.docChanged||update.selectionSet||update.viewportChanged||configChanged(update)},class:"cm-selectionLayer"}),hideNativeSelection=state.Prec.highest(EditorView.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}})),setDropCursorPos=state.StateEffect.define({map(pos,mapping){return null==pos?null:mapping.mapPos(pos)}}),dropCursorPos=state.StateField.define({create(){return null},update(pos,tr){return null!=pos&&(pos=tr.changes.mapPos(pos)),tr.effects.reduce((pos,e)=>e.is(setDropCursorPos)?e.value:pos,pos)}}),drawDropCursor=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.cursor=null,this.measureReq={read:this.readPos.bind(this),write:this.drawCursor.bind(this)}}update(update){var _a;let cursorPos=update.state.field(dropCursorPos);null==cursorPos?null!=this.cursor&&(null===(_a=this.cursor)||void 0===_a?void 0:_a.remove(),this.cursor=null):(!this.cursor&&(this.cursor=this.view.scrollDOM.appendChild(document.createElement("div")),this.cursor.className="cm-dropCursor"),(update.startState.field(dropCursorPos)!=cursorPos||update.docChanged||update.geometryChanged)&&this.view.requestMeasure(this.measureReq))}readPos(){let{view}=this,pos=view.state.field(dropCursorPos),rect=null!=pos&&view.coordsAtPos(pos);if(!rect)return null;let outer=view.scrollDOM.getBoundingClientRect();return{left:rect.left-outer.left+view.scrollDOM.scrollLeft*view.scaleX,top:rect.top-outer.top+view.scrollDOM.scrollTop*view.scaleY,height:rect.bottom-rect.top}}drawCursor(pos){if(this.cursor){let{scaleX,scaleY}=this.view;pos?(this.cursor.style.left=pos.left/scaleX+"px",this.cursor.style.top=pos.top/scaleY+"px",this.cursor.style.height=pos.height/scaleY+"px"):this.cursor.style.left="-100000px"}}destroy(){this.cursor&&this.cursor.remove()}setDropPos(pos){this.view.state.field(dropCursorPos)!=pos&&this.view.dispatch({effects:setDropCursorPos.of(pos)})}},{eventObservers:{dragover(event){this.setDropPos(this.view.posAtCoords({x:event.clientX,y:event.clientY}))},dragleave(event){event.target!=this.view.contentDOM&&this.view.contentDOM.contains(event.relatedTarget)||this.setDropPos(null)},dragend(){this.setDropPos(null)},drop(){this.setDropPos(null)}}});class MatchDecorator{/**
		    Create a decorator.
		    */constructor(config){const{regexp,decoration,decorate,boundary,maxLength=1e3}=config;if(!regexp.global)throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");if(this.regexp=regexp,decorate)this.addMatch=(match,view,from,add)=>decorate(add,from,from+match[0].length,match,view);else if("function"==typeof decoration)this.addMatch=(match,view,from,add)=>{let deco=decoration(match,view,from);deco&&add(from,from+match[0].length,deco)};else if(decoration)this.addMatch=(match,_view,from,add)=>add(from,from+match[0].length,decoration);else throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");this.boundary=boundary,this.maxLength=maxLength}/**
		    Compute the full set of decorations for matches in the given
		    view's viewport. You'll want to call this when initializing your
		    plugin.
		    */createDeco(view){let build=new state.RangeSetBuilder,add=build.add.bind(build);for(let{from,to}of matchRanges(view,this.maxLength))iterMatches(view.state.doc,this.regexp,from,to,(from,m)=>this.addMatch(m,view,from,add));return build.finish()}/**
		    Update a set of decorations for a view update. `deco` _must_ be
		    the set of decorations produced by _this_ `MatchDecorator` for
		    the view state before the update.
		    */updateDeco(update,deco){let changeFrom=1e9,changeTo=-1;return update.docChanged&&update.changes.iterChanges((_f,_t,from,to)=>{to>=update.view.viewport.from&&from<=update.view.viewport.to&&(changeFrom=Math.min(from,changeFrom),changeTo=Math.max(to,changeTo))}),update.viewportMoved||1e3<changeTo-changeFrom?this.createDeco(update.view):-1<changeTo?this.updateRange(update.view,deco.map(update.changes),changeFrom,changeTo):deco}updateRange(view,deco,updateFrom,updateTo){for(let r of view.visibleRanges){let from=Math.max(r.from,updateFrom),to=Math.min(r.to,updateTo);if(to>=from){let fromLine=view.state.doc.lineAt(from),toLine=fromLine.to<to?view.state.doc.lineAt(to):fromLine,start=Math.max(r.from,fromLine.from),end=Math.min(r.to,toLine.to);if(this.boundary){for(;from>fromLine.from;from--)if(this.boundary.test(fromLine.text[from-1-fromLine.from])){start=from;break}for(;to<toLine.to;to++)if(this.boundary.test(toLine.text[to-toLine.from])){end=to;break}}let ranges=[],add=(from,to,deco)=>ranges.push(deco.range(from,to)),m;if(fromLine==toLine)for(this.regexp.lastIndex=start-fromLine.from;(m=this.regexp.exec(fromLine.text))&&m.index<end-fromLine.from;)this.addMatch(m,view,m.index+fromLine.from,add);else iterMatches(view.state.doc,this.regexp,start,end,(from,m)=>this.addMatch(m,view,from,add));deco=deco.update({filterFrom:start,filterTo:end,filter:(from,to)=>from<start||to>end,add:ranges})}}return deco}}const UnicodeRegexpSupport=null==/x/.unicode?"g":"gu",Specials=new RegExp("[\0-\b\n-\x1F\x7F-\x9F\xAD\u061C\u200B\u200E\u200F\u2028\u2029\u202D\u202E\u2066\u2067\u2069\uFEFF\uFFF9-\uFFFC]",UnicodeRegexpSupport),Names={0:"null",7:"bell",8:"backspace",10:"newline",11:"vertical tab",13:"carriage return",27:"escape",8203:"zero width space",8204:"zero width non-joiner",8205:"zero width joiner",8206:"left-to-right mark",8207:"right-to-left mark",8232:"line separator",8237:"left-to-right override",8238:"right-to-left override",8294:"left-to-right isolate",8295:"right-to-left isolate",8297:"pop directional isolate",8233:"paragraph separator",65279:"zero width no-break space",65532:"object replacement"};let _supportsTabSize=null;const specialCharConfig=state.Facet.define({combine(configs){let config=state.combineConfig(configs,{render:null,specialChars:Specials,addSpecialChars:null});return(config.replaceTabs=!supportsTabSize())&&(config.specialChars=new RegExp("\t|"+config.specialChars.source,UnicodeRegexpSupport)),config.addSpecialChars&&(config.specialChars=new RegExp(config.specialChars.source+"|"+config.addSpecialChars.source,UnicodeRegexpSupport)),config}});let _plugin=null;const DefaultPlaceholder="\u2022";class SpecialCharWidget extends WidgetType{constructor(options,code){super(),this.options=options,this.code=code}eq(other){return other.code==this.code}toDOM(view){let ph=placeholder$1(this.code),desc=view.state.phrase("Control character")+" "+(Names[this.code]||"0x"+this.code.toString(16)),custom=this.options.render&&this.options.render(this.code,desc,ph);if(custom)return custom;let span=document.createElement("span");return span.textContent=ph,span.title=desc,span.setAttribute("aria-label",desc),span.className="cm-specialChar",span}ignoreEvent(){return!1}}class TabWidget extends WidgetType{constructor(width){super(),this.width=width}eq(other){return other.width==this.width}toDOM(){let span=document.createElement("span");return span.textContent="\t",span.className="cm-tab",span.style.width=this.width+"px",span}ignoreEvent(){return!1}}const plugin=ViewPlugin.fromClass(class{constructor(){this.height=1e3,this.attrs={style:"padding-bottom: 1000px"}}update(update){let{view}=update,height=view.viewState.editorHeight-view.defaultLineHeight-view.documentPadding.top-.5;0<=height&&height!=this.height&&(this.height=height,this.attrs={style:`padding-bottom: ${height}px`})}}),lineDeco=Decoration.line({class:"cm-activeLine"}),activeLineHighlighter=ViewPlugin.fromClass(class{constructor(view){this.decorations=this.getDeco(view)}update(update){(update.docChanged||update.selectionSet)&&(this.decorations=this.getDeco(update.view))}getDeco(view){let lastLineStart=-1,deco=[];for(let r of view.state.selection.ranges){let line=view.lineBlockAt(r.head);line.from>lastLineStart&&(deco.push(lineDeco.range(line.from)),lastLineStart=line.from)}return Decoration.set(deco)}},{decorations:v=>v.decorations});class Placeholder extends WidgetType{constructor(content){super(),this.content=content}toDOM(view){let wrap=document.createElement("span");return wrap.className="cm-placeholder",wrap.style.pointerEvents="none",wrap.appendChild("string"==typeof this.content?document.createTextNode(this.content):"function"==typeof this.content?this.content(view):this.content.cloneNode(!0)),wrap.setAttribute("aria-hidden","true"),wrap}coordsAt(dom){let rects=dom.firstChild?clientRectsFor(dom.firstChild):[];if(!rects.length)return null;let style=window.getComputedStyle(dom.parentNode),rect=flattenRect(rects[0],"rtl"!=style.direction),lineHeight=parseInt(style.lineHeight);return rect.bottom-rect.top>1.5*lineHeight?{left:rect.left,right:rect.right,top:rect.top,bottom:rect.top+lineHeight}:rect}ignoreEvent(){return!1}}const MaxOff=2e3,keys={Alt:[18,e=>!!e.altKey],Control:[17,e=>!!e.ctrlKey],Shift:[16,e=>!!e.shiftKey],Meta:[91,e=>!!e.metaKey]},showCrosshair={style:"cursor: crosshair"},Outside="-10000px";class TooltipViewManager{constructor(view,facet,createTooltipView,removeTooltipView){this.facet=facet,this.createTooltipView=createTooltipView,this.removeTooltipView=removeTooltipView,this.input=view.state.facet(facet),this.tooltips=this.input.filter(t=>t);let prev=null;this.tooltipViews=this.tooltips.map(t=>prev=createTooltipView(t,prev))}update(update,above){var _a;let input=update.state.facet(this.facet),tooltips=input.filter(x=>x);if(input===this.input){for(let t of this.tooltipViews)t.update&&t.update(update);return!1}let tooltipViews=[],newAbove=above?[]:null;for(let i=0;i<tooltips.length;i++){let tip=tooltips[i],known=-1;if(tip){for(let i=0,other;i<this.tooltips.length;i++)other=this.tooltips[i],other&&other.create==tip.create&&(known=i);if(0>known)tooltipViews[i]=this.createTooltipView(tip,i?tooltipViews[i-1]:null),newAbove&&(newAbove[i]=!!tip.above);else{let tooltipView=tooltipViews[i]=this.tooltipViews[known];newAbove&&(newAbove[i]=above[known]),tooltipView.update&&tooltipView.update(update)}}}for(let t of this.tooltipViews)0>tooltipViews.indexOf(t)&&(this.removeTooltipView(t),null===(_a=t.destroy)||void 0===_a?void 0:_a.call(t));return above&&(newAbove.forEach((val,i)=>above[i]=val),above.length=newAbove.length),this.input=input,this.tooltips=tooltips,this.tooltipViews=tooltipViews,!0}}const tooltipConfig=state.Facet.define({combine:values=>{var _a,_b,_c;return{position:browser.ios?"absolute":(null===(_a=values.find(conf=>conf.position))||void 0===_a?void 0:_a.position)||"fixed",parent:(null===(_b=values.find(conf=>conf.parent))||void 0===_b?void 0:_b.parent)||null,tooltipSpace:(null===(_c=values.find(conf=>conf.tooltipSpace))||void 0===_c?void 0:_c.tooltipSpace)||windowSpace}}}),knownHeight=new WeakMap,tooltipPlugin=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let config=view.state.facet(tooltipConfig);this.position=config.position,this.parent=config.parent,this.classes=view.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver="function"==typeof ResizeObserver?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new TooltipViewManager(view,showTooltip,(t,p)=>this.createTooltip(t,p),t=>{this.resizeObserver&&this.resizeObserver.unobserve(t.dom),t.dom.remove()}),this.above=this.manager.tooltips.map(t=>!!t.above),this.intersectionObserver="function"==typeof IntersectionObserver?new IntersectionObserver(entries=>{Date.now()>this.lastTransaction-50&&0<entries.length&&1>entries[entries.length-1].intersectionRatio&&this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),view.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){this.parent?(this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container)):this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let tooltip of this.manager.tooltipViews)this.intersectionObserver.observe(tooltip.dom)}}measureSoon(){0>this.measureTimeout&&(this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50))}update(update){update.transactions.length&&(this.lastTransaction=Date.now());let updated=this.manager.update(update,this.above);updated&&this.observeIntersection();let shouldMeasure=updated||update.geometryChanged,newConfig=update.state.facet(tooltipConfig);if(newConfig.position!=this.position&&!this.madeAbsolute){this.position=newConfig.position;for(let t of this.manager.tooltipViews)t.dom.style.position=this.position;shouldMeasure=!0}if(newConfig.parent!=this.parent){this.parent&&this.container.remove(),this.parent=newConfig.parent,this.createContainer();for(let t of this.manager.tooltipViews)this.container.appendChild(t.dom);shouldMeasure=!0}else this.parent&&this.view.themeClasses!=this.classes&&(this.classes=this.container.className=this.view.themeClasses);shouldMeasure&&this.maybeMeasure()}createTooltip(tooltip,prev){let tooltipView=tooltip.create(this.view),before=prev?prev.dom:null;if(tooltipView.dom.classList.add("cm-tooltip"),tooltip.arrow&&!tooltipView.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let arrow=document.createElement("div");arrow.className="cm-tooltip-arrow",tooltipView.dom.appendChild(arrow)}return tooltipView.dom.style.position=this.position,tooltipView.dom.style.top=Outside,tooltipView.dom.style.left="0px",this.container.insertBefore(tooltipView.dom,before),tooltipView.mount&&tooltipView.mount(this.view),this.resizeObserver&&this.resizeObserver.observe(tooltipView.dom),tooltipView}destroy(){var _a,_b,_c;this.view.win.removeEventListener("resize",this.measureSoon);for(let tooltipView of this.manager.tooltipViews)tooltipView.dom.remove(),null===(_a=tooltipView.destroy)||void 0===_a?void 0:_a.call(tooltipView);this.parent&&this.container.remove(),null===(_b=this.resizeObserver)||void 0===_b?void 0:_b.disconnect(),null===(_c=this.intersectionObserver)||void 0===_c?void 0:_c.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let scaleX=1,scaleY=1,makeAbsolute=!1;if("fixed"==this.position&&this.manager.tooltipViews.length){let{dom}=this.manager.tooltipViews[0];if(browser.safari){// Safari always sets offsetParent to null, even if a fixed
// element is positioned relative to a transformed parent. So
// we use this kludge to try and detect this.
let rect=dom.getBoundingClientRect();makeAbsolute=1<Math.abs(rect.top+1e4)||1<Math.abs(rect.left)}else// More conforming browsers will set offsetParent to the
// transformed element.
makeAbsolute=!!dom.offsetParent&&dom.offsetParent!=this.container.ownerDocument.body}if(makeAbsolute||"absolute"==this.position)if(this.parent){let rect=this.parent.getBoundingClientRect();rect.width&&rect.height&&(scaleX=rect.width/this.parent.offsetWidth,scaleY=rect.height/this.parent.offsetHeight)}else({scaleX,scaleY}=this.view.viewState);let visible=this.view.scrollDOM.getBoundingClientRect(),margins=getScrollMargins(this.view);return{visible:{left:visible.left+margins.left,top:visible.top+margins.top,right:visible.right-margins.right,bottom:visible.bottom-margins.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((t,i)=>{let tv=this.manager.tooltipViews[i];return tv.getCoords?tv.getCoords(t.pos):this.view.coordsAtPos(t.pos)}),size:this.manager.tooltipViews.map(({dom})=>dom.getBoundingClientRect()),space:this.view.state.facet(tooltipConfig).tooltipSpace(this.view),scaleX,scaleY,makeAbsolute}}writeMeasure(measured){var _a;if(measured.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let t of this.manager.tooltipViews)t.dom.style.position="absolute"}let{visible,space,scaleX,scaleY}=measured,others=[];for(let i=0;i<this.manager.tooltips.length;i++){let tooltip=this.manager.tooltips[i],tView=this.manager.tooltipViews[i],{dom}=tView,pos=measured.pos[i],size=measured.size[i];// Hide tooltips that are outside of the editor.
if(!pos||!1!==tooltip.clip&&(pos.bottom<=Math.max(visible.top,space.top)||pos.top>=Math.min(visible.bottom,space.bottom)||pos.right<Math.max(visible.left,space.left)-.1||pos.left>Math.min(visible.right,space.right)+.1)){dom.style.top=Outside;continue}let arrow=tooltip.arrow?tView.dom.querySelector(".cm-tooltip-arrow"):null,arrowHeight=arrow?7/* Arrow.Size */:0,width=size.right-size.left,height=null!==(_a=knownHeight.get(tView))&&void 0!==_a?_a:size.bottom-size.top,offset=tView.offset||noOffset,ltr=this.view.textDirection==exports.Direction.LTR,left=size.width>space.right-space.left?ltr?space.left:space.right-size.width:ltr?Math.max(space.left,Math.min(pos.left-(arrow?14/* Arrow.Offset */:0)+offset.x,space.right-width)):Math.min(Math.max(space.left,pos.left-width+(arrow?14/* Arrow.Offset */:0)-offset.x),space.right-width),above=this.above[i];!tooltip.strictSide&&(above?pos.top-height-arrowHeight-offset.y<space.top:pos.bottom+height+arrowHeight+offset.y>space.bottom)&&above==space.bottom-pos.bottom>pos.top-space.top&&(above=this.above[i]=!above);let spaceVert=(above?pos.top-space.top:space.bottom-pos.bottom)-arrowHeight;if(spaceVert<height&&!1!==tView.resize){if(spaceVert<this.view.defaultLineHeight){dom.style.top=Outside;continue}knownHeight.set(tView,height),dom.style.height=(height=spaceVert)/scaleY+"px"}else dom.style.height&&(dom.style.height="");let top=above?pos.top-height-arrowHeight-offset.y:pos.bottom+arrowHeight+offset.y,right=left+width;if(!0!==tView.overlap)for(let r of others)r.left<right&&r.right>left&&r.top<top+height&&r.bottom>top&&(top=above?r.top-height-2-arrowHeight:r.bottom+arrowHeight+2);if("absolute"==this.position?(dom.style.top=(top-measured.parent.top)/scaleY+"px",setLeftStyle(dom,(left-measured.parent.left)/scaleX)):(dom.style.top=top/scaleY+"px",setLeftStyle(dom,left/scaleX)),arrow){let arrowLeft=pos.left+(ltr?offset.x:-offset.x)-(left+14/* Arrow.Offset */-7/* Arrow.Size */);arrow.style.left=arrowLeft/scaleX+"px"}!0!==tView.overlap&&others.push({left,top,right,bottom:top+height}),dom.classList.toggle("cm-tooltip-above",above),dom.classList.toggle("cm-tooltip-below",!above),tView.positioned&&tView.positioned(measured.space)}}maybeMeasure(){if(this.manager.tooltips.length&&(this.view.inView&&this.view.requestMeasure(this.measureReq),this.inView!=this.view.inView&&(this.inView=this.view.inView,!this.inView)))for(let tv of this.manager.tooltipViews)tv.dom.style.top=Outside}},{eventObservers:{scroll(){this.maybeMeasure()}}}),baseTheme=EditorView.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:`${7/* Arrow.Size */}px`,width:`${14}px`,position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:`${7/* Arrow.Size */}px solid transparent`,borderRight:`${7/* Arrow.Size */}px solid transparent`},".cm-tooltip-above &":{bottom:`-${7/* Arrow.Size */}px`,"&:before":{borderTop:`${7/* Arrow.Size */}px solid #bbb`},"&:after":{borderTop:`${7/* Arrow.Size */}px solid #f5f5f5`,bottom:"1px"}},".cm-tooltip-below &":{top:`-${7/* Arrow.Size */}px`,"&:before":{borderBottom:`${7/* Arrow.Size */}px solid #bbb`},"&:after":{borderBottom:`${7/* Arrow.Size */}px solid #f5f5f5`,top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),noOffset={x:0,y:0},showTooltip=state.Facet.define({enables:[tooltipPlugin,baseTheme]}),showHoverTooltip=state.Facet.define({combine:inputs=>inputs.reduce((a,i)=>a.concat(i),[])});/**
		Facet to which an extension can add a value to show a tooltip.
		*/class HoverTooltipHost{// Needs to be static so that host tooltip instances always match
static create(view){return new HoverTooltipHost(view)}constructor(view){this.view=view,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new TooltipViewManager(view,showHoverTooltip,(t,p)=>this.createHostedView(t,p),t=>t.dom.remove())}createHostedView(tooltip,prev){let hostedView=tooltip.create(this.view);return hostedView.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(hostedView.dom,prev?prev.dom.nextSibling:this.dom.firstChild),this.mounted&&hostedView.mount&&hostedView.mount(this.view),hostedView}mount(view){for(let hostedView of this.manager.tooltipViews)hostedView.mount&&hostedView.mount(view);this.mounted=!0}positioned(space){for(let hostedView of this.manager.tooltipViews)hostedView.positioned&&hostedView.positioned(space)}update(update){this.manager.update(update)}destroy(){var _a;for(let t of this.manager.tooltipViews)null===(_a=t.destroy)||void 0===_a?void 0:_a.call(t)}passProp(name){let value;for(let view of this.manager.tooltipViews){let given=view[name];if(void 0!==given)if(void 0===value)value=given;else if(value!==given)return}return value}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}const showHoverTooltipHost=showTooltip.compute([showHoverTooltip],state=>{let tooltips=state.facet(showHoverTooltip);return 0===tooltips.length?null:{pos:Math.min(...tooltips.map(t=>t.pos)),end:Math.max(...tooltips.map(t=>{var _a;return null!==(_a=t.end)&&void 0!==_a?_a:t.pos})),create:HoverTooltipHost.create,above:tooltips[0].above,arrow:tooltips.some(t=>t.arrow)}}),hoverPlugin=state.Facet.define();class HoverPlugin{constructor(view,source,field,locked,setHover,hoverTime){this.view=view,this.source=source,this.field=field,this.locked=locked,this.setHover=setHover,this.hoverTime=hoverTime,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:view.dom,time:0},this.checkHover=this.checkHover.bind(this),view.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),view.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(update){this.pending&&(this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20))}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,!this.active.length){let hovered=Date.now()-this.lastMove.time;hovered<this.hoverTime?this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-hovered):this.startHover()}}startHover(){clearTimeout(this.restartTimeout);let{view,lastMove}=this,tile=view.docView.tile.nearest(lastMove.target);if(!tile)return;let side=1,pos;if(tile.isWidget())pos=tile.posAtStart;else{if(pos=view.posAtCoords(lastMove),null==pos)return;let posCoords=view.coordsAtPos(pos);if(!posCoords||lastMove.y<posCoords.top||lastMove.y>posCoords.bottom||lastMove.x<posCoords.left-view.defaultCharacterWidth||lastMove.x>posCoords.right+view.defaultCharacterWidth)return;let bidi=view.bidiSpans(view.state.doc.lineAt(pos)).find(s=>s.from<=pos&&s.to>=pos),rtl=bidi&&bidi.dir==exports.Direction.RTL?-1:1;side=lastMove.x<posCoords.left?-rtl:rtl}this.activateHover(view,pos,side)}activateHover(view,pos,side,locked){let open=this.source(view,pos,side),done=value=>{if(value&&(!Array.isArray(value)||value.length)){let tooltips=Array.isArray(value)?value:[value];locked&&this.locked.set(tooltips,locked),view.dispatch({effects:this.setHover.of(tooltips)})}};if(open&&"then"in open){let pending=this.pending={pos};open.then(result=>{this.pending==pending&&(this.pending=null,done(result))},e=>logException(view.state,e,"hover tooltip"))}else done(open)}get tooltip(){let plugin=this.view.plugin(tooltipPlugin),index=plugin?plugin.manager.tooltips.findIndex(t=>t.create==HoverTooltipHost.create):-1;return-1<index?plugin.manager.tooltipViews[index]:null}mousemove(event){var _a,_b;this.lastMove={x:event.clientX,y:event.clientY,target:event.target,time:Date.now()},0>this.hoverTimeout&&(this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime));let{active,tooltip}=this;if(active.length&&!this.locked.has(active)&&tooltip&&!isInTooltip(tooltip.dom,event)||this.pending){let{pos}=active[0]||this.pending,end=null!==(_b=null===(_a=active[0])||void 0===_a?void 0:_a.end)&&void 0!==_b?_b:pos;(pos==end?this.view.posAtCoords(this.lastMove)!=pos:!isOverRange(this.view,pos,end,event.clientX,event.clientY))&&(this.view.dispatch({effects:this.setHover.of([])}),this.pending=null)}}mouseleave(event){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active}=this;if(active.length&&!this.locked.has(active)){let{tooltip}=this,inTooltip=tooltip&&tooltip.dom.contains(event.relatedTarget);inTooltip?this.watchTooltipLeave(tooltip.dom):this.view.dispatch({effects:this.setHover.of([])})}}watchTooltipLeave(tooltip){let watch=event=>{tooltip.removeEventListener("mouseleave",watch);let{active}=this;!active.length||this.locked.has(active)||this.view.dom.contains(event.relatedTarget)||this.view.dispatch({effects:this.setHover.of([])})};tooltip.addEventListener("mouseleave",watch)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}const tooltipMargin=4,closeHoverTooltipEffect=state.StateEffect.define(),closeHoverTooltips=closeHoverTooltipEffect.of(null),panelConfig=state.Facet.define({combine(configs){let topContainer,bottomContainer;for(let c of configs)topContainer=topContainer||c.topContainer,bottomContainer=bottomContainer||c.bottomContainer;return{topContainer,bottomContainer}}}),panelPlugin=ViewPlugin.fromClass(class{constructor(view){this.input=view.state.facet(showPanel),this.specs=this.input.filter(s=>s),this.panels=this.specs.map(spec=>spec(view));let conf=view.state.facet(panelConfig);this.top=new PanelGroup(view,!0,conf.topContainer),this.bottom=new PanelGroup(view,!1,conf.bottomContainer),this.top.sync(this.panels.filter(p=>p.top)),this.bottom.sync(this.panels.filter(p=>!p.top));for(let p of this.panels)p.dom.classList.add("cm-panel"),p.mount&&p.mount()}update(update){let conf=update.state.facet(panelConfig);this.top.container!=conf.topContainer&&(this.top.sync([]),this.top=new PanelGroup(update.view,!0,conf.topContainer)),this.bottom.container!=conf.bottomContainer&&(this.bottom.sync([]),this.bottom=new PanelGroup(update.view,!1,conf.bottomContainer)),this.top.syncClasses(),this.bottom.syncClasses();let input=update.state.facet(showPanel);if(input!=this.input){let specs=input.filter(x=>x),panels=[],top=[],bottom=[],mount=[];for(let spec of specs){let known=this.specs.indexOf(spec),panel;0>known?(panel=spec(update.view),mount.push(panel)):(panel=this.panels[known],panel.update&&panel.update(update)),panels.push(panel),(panel.top?top:bottom).push(panel)}this.specs=specs,this.panels=panels,this.top.sync(top),this.bottom.sync(bottom);for(let p of mount)p.dom.classList.add("cm-panel"),p.mount&&p.mount()}else for(let p of this.panels)p.update&&p.update(update)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:plugin=>EditorView.scrollMargins.of(view=>{let value=view.plugin(plugin);return value&&{top:value.top.scrollMargin(),bottom:value.bottom.scrollMargin()}})});/**
		Transaction effect that closes all hover tooltips.
		*/class PanelGroup{constructor(view,top,container){this.view=view,this.top=top,this.container=container,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(panels){for(let p of this.panels)p.destroy&&0>panels.indexOf(p)&&p.destroy();this.panels=panels,this.syncDOM()}syncDOM(){if(0==this.panels.length)return void(this.dom&&(this.dom.remove(),this.dom=void 0));if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom",this.dom.style[this.top?"top":"bottom"]="0";let parent=this.container||this.view.dom;parent.insertBefore(this.dom,this.top?parent.firstChild:null)}let curDOM=this.dom.firstChild;for(let panel of this.panels)if(panel.dom.parentNode==this.dom){for(;curDOM!=panel.dom;)curDOM=rm(curDOM);curDOM=curDOM.nextSibling}else this.dom.insertBefore(panel.dom,curDOM);for(;curDOM;)curDOM=rm(curDOM)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(this.container&&this.classes!=this.view.themeClasses){for(let cls of this.classes.split(" "))cls&&this.container.classList.remove(cls);for(let cls of(this.classes=this.view.themeClasses).split(" "))cls&&this.container.classList.add(cls)}}}const showPanel=state.Facet.define({enables:panelPlugin}),dialogField=state.StateField.define({create(){return[]},update(dialogs,tr){for(let e of tr.effects)e.is(openDialogEffect)?dialogs=[e.value].concat(dialogs):e.is(closeDialogEffect)&&(dialogs=dialogs.filter(d=>d!=e.value));return dialogs},provide:f=>showPanel.computeN([f],state=>state.field(f))}),openDialogEffect=state.StateEffect.define(),closeDialogEffect=state.StateEffect.define();class GutterMarker extends state.RangeValue{/**
		    @internal
		    */compare(other){return this==other||this.constructor==other.constructor&&this.eq(other)}/**
		    Compare this marker to another marker of the same type.
		    */eq(other){return!1}/**
		    Called if the marker has a `toDOM` method and its representation
		    was removed from a gutter.
		    */destroy(dom){}}GutterMarker.prototype.elementClass="",GutterMarker.prototype.toDOM=void 0,GutterMarker.prototype.mapMode=state.MapMode.TrackBefore,GutterMarker.prototype.startSide=GutterMarker.prototype.endSide=-1,GutterMarker.prototype.point=!0;/**
		Facet used to add a class to all gutter elements for a given line.
		Markers given to this facet should _only_ define an
		[`elementclass`](https://codemirror.net/6/docs/ref/#view.GutterMarker.elementClass), not a
		[`toDOM`](https://codemirror.net/6/docs/ref/#view.GutterMarker.toDOM) (or the marker will appear
		in all gutters for the line).
		*/const gutterLineClass=state.Facet.define(),gutterWidgetClass=state.Facet.define(),defaults={class:"",renderEmptyElements:!1,elementStyle:"",markers:()=>state.RangeSet.empty,lineMarker:()=>null,widgetMarker:()=>null,lineMarkerChange:null,initialSpacer:null,updateSpacer:null,domEventHandlers:{},side:"before"},activeGutters=state.Facet.define(),unfixGutters=state.Facet.define({combine:values=>values.some(x=>x)}),gutterView=ViewPlugin.fromClass(class{constructor(view){this.view=view,this.domAfter=null,this.prevViewport=view.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=view.state.facet(activeGutters).map(conf=>new SingleGutterView(view,conf)),this.fixed=!view.state.facet(unfixGutters);for(let gutter of this.gutters)"after"==gutter.config.side?this.getDOMAfter().appendChild(gutter.dom):this.dom.appendChild(gutter.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),view.scrollDOM.insertBefore(this.dom,view.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(update){if(this.updateGutters(update)){// Detach during sync when the viewport changed significantly
// (such as during scrolling), since for large updates that is
// faster.
let vpA=this.prevViewport,vpB=update.view.viewport,vpOverlap=Math.min(vpA.to,vpB.to)-Math.max(vpA.from,vpB.from);this.syncGutters(vpOverlap<.8*(vpB.to-vpB.from))}if(update.geometryChanged){let min=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=min,this.domAfter&&(this.domAfter.style.minHeight=min)}this.view.state.facet(unfixGutters)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=update.view.viewport}syncGutters(detach){let after=this.dom.nextSibling;detach&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let lineClasses=state.RangeSet.iter(this.view.state.facet(gutterLineClass),this.view.viewport.from),classSet=[],contexts=this.gutters.map(gutter=>new UpdateContext(gutter,this.view.viewport,-this.view.documentPadding.top));for(let line of this.view.viewportLineBlocks)if(classSet.length&&(classSet=[]),Array.isArray(line.type)){let first=!0;for(let b of line.type)if(b.type==exports.BlockType.Text&&first){advanceCursor(lineClasses,classSet,b.from);for(let cx of contexts)cx.line(this.view,b,classSet);first=!1}else if(b.widget)for(let cx of contexts)cx.widget(this.view,b)}else if(line.type==exports.BlockType.Text){advanceCursor(lineClasses,classSet,line.from);for(let cx of contexts)cx.line(this.view,line,classSet)}else if(line.widget)for(let cx of contexts)cx.widget(this.view,line);for(let cx of contexts)cx.finish();detach&&(this.view.scrollDOM.insertBefore(this.dom,after),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(update){let prev=update.startState.facet(activeGutters),cur=update.state.facet(activeGutters),change=update.docChanged||update.heightChanged||update.viewportChanged||!state.RangeSet.eq(update.startState.facet(gutterLineClass),update.state.facet(gutterLineClass),update.view.viewport.from,update.view.viewport.to);if(prev==cur)for(let gutter of this.gutters)gutter.update(update)&&(change=!0);else{change=!0;let gutters=[];for(let conf of cur){let known=prev.indexOf(conf);0>known?gutters.push(new SingleGutterView(this.view,conf)):(this.gutters[known].update(update),gutters.push(this.gutters[known]))}for(let g of this.gutters)g.dom.remove(),0>gutters.indexOf(g)&&g.destroy();for(let g of gutters)"after"==g.config.side?this.getDOMAfter().appendChild(g.dom):this.dom.appendChild(g.dom);this.gutters=gutters}return change}destroy(){for(let view of this.gutters)view.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:plugin=>EditorView.scrollMargins.of(view=>{let value=view.plugin(plugin);if(!value||0==value.gutters.length||!value.fixed)return null;let before=value.dom.offsetWidth*view.scaleX,after=value.domAfter?value.domAfter.offsetWidth*view.scaleX:0;return view.textDirection==exports.Direction.LTR?{left:before,right:after}:{right:before,left:after}})});/**
		Facet used to add a class to all gutter elements next to a widget.
		Should not provide widgets with a `toDOM` method.
		*/class UpdateContext{constructor(gutter,viewport,height){this.gutter=gutter,this.height=height,this.i=0,this.cursor=state.RangeSet.iter(gutter.markers,viewport.from)}addElement(view,block,markers){let{gutter}=this,above=(block.top-this.height)/view.scaleY,height=block.height/view.scaleY;if(this.i==gutter.elements.length){let newElt=new GutterElement(view,height,above,markers);gutter.elements.push(newElt),gutter.dom.appendChild(newElt.dom)}else gutter.elements[this.i].update(view,height,above,markers);this.height=block.bottom,this.i++}line(view,line,extraMarkers){let localMarkers=[];advanceCursor(this.cursor,localMarkers,line.from),extraMarkers.length&&(localMarkers=localMarkers.concat(extraMarkers));let forLine=this.gutter.config.lineMarker(view,line,localMarkers);forLine&&localMarkers.unshift(forLine);let gutter=this.gutter;(0!=localMarkers.length||gutter.config.renderEmptyElements)&&this.addElement(view,line,localMarkers)}widget(view,block){let marker=this.gutter.config.widgetMarker(view,block.widget,block),markers=marker?[marker]:null;for(let cls of view.state.facet(gutterWidgetClass)){let marker=cls(view,block.widget,block);marker&&(markers||(markers=[])).push(marker)}markers&&this.addElement(view,block,markers)}finish(){for(let gutter=this.gutter,last;gutter.elements.length>this.i;)last=gutter.elements.pop(),gutter.dom.removeChild(last.dom),last.destroy()}}class SingleGutterView{constructor(view,config){for(let prop in this.view=view,this.config=config,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:""),config.domEventHandlers)this.dom.addEventListener(prop,event=>{let target=event.target,y;if(target!=this.dom&&this.dom.contains(target)){for(;target.parentNode!=this.dom;)target=target.parentNode;let rect=target.getBoundingClientRect();y=(rect.top+rect.bottom)/2}else y=event.clientY;let line=view.lineBlockAtHeight(y-view.documentTop);config.domEventHandlers[prop](view,line,event)&&event.preventDefault()});this.markers=asArray(config.markers(view)),config.initialSpacer&&(this.spacer=new GutterElement(view,0,0,[config.initialSpacer(view)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(update){let prevMarkers=this.markers;if(this.markers=asArray(this.config.markers(update.view)),this.spacer&&this.config.updateSpacer){let updated=this.config.updateSpacer(this.spacer.markers[0],update);updated!=this.spacer.markers[0]&&this.spacer.update(update.view,0,0,[updated])}let vp=update.view.viewport;return!state.RangeSet.eq(this.markers,prevMarkers,vp.from,vp.to)||!!this.config.lineMarkerChange&&this.config.lineMarkerChange(update)}destroy(){for(let elt of this.elements)elt.destroy()}}class GutterElement{constructor(view,height,above,markers){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(view,height,above,markers)}update(view,height,above,markers){this.height!=height&&(this.height=height,this.dom.style.height=height+"px"),this.above!=above&&(this.dom.style.marginTop=(this.above=above)?above+"px":""),sameMarkers(this.markers,markers)||this.setMarkers(view,markers)}setMarkers(view,markers){let cls="cm-gutterElement",domPos=this.dom.firstChild;for(let iNew=0,iOld=0;;){let skipTo=iOld,marker=iNew<markers.length?markers[iNew++]:null,matched=!1;if(marker){let c=marker.elementClass;c&&(cls+=" "+c);for(let i=iOld;i<this.markers.length;i++)if(this.markers[i].compare(marker)){skipTo=i,matched=!0;break}}else skipTo=this.markers.length;for(;iOld<skipTo;){let next=this.markers[iOld++];if(next.toDOM){next.destroy(domPos);let after=domPos.nextSibling;domPos.remove(),domPos=after}}if(!marker)break;marker.toDOM&&(matched?domPos=domPos.nextSibling:this.dom.insertBefore(marker.toDOM(view),domPos)),matched&&iOld++}this.dom.className=cls,this.markers=markers}destroy(){this.setMarkers(null,[])}}const lineNumberMarkers=state.Facet.define(),lineNumberWidgetMarker=state.Facet.define(),lineNumberConfig=state.Facet.define({combine(values){return state.combineConfig(values,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(a,b){let result=Object.assign({},a);for(let event in b){let exists=result[event],add=b[event];result[event]=exists?(view,line,event)=>exists(view,line,event)||add(view,line,event):add}return result}})}});/**
		Facet used to create markers in the line number gutter next to widgets.
		*/class NumberMarker extends GutterMarker{constructor(number){super(),this.number=number}eq(other){return this.number==other.number}toDOM(){return document.createTextNode(this.number)}}const lineNumberGutter=activeGutters.compute([lineNumberConfig],state=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(view){return view.state.facet(lineNumberMarkers)},lineMarker(view,line,others){return others.some(m=>m.toDOM)?null:new NumberMarker(formatNumber(view,view.state.doc.lineAt(line.from).number))},widgetMarker:(view,widget,block)=>{for(let m of view.state.facet(lineNumberWidgetMarker)){let result=m(view,widget,block);if(result)return result}return null},lineMarkerChange:update=>update.startState.facet(lineNumberConfig)!=update.state.facet(lineNumberConfig),initialSpacer(view){return new NumberMarker(formatNumber(view,maxLineNumber(view.state.doc.lines)))},updateSpacer(spacer,update){let max=formatNumber(update.view,maxLineNumber(update.view.state.doc.lines));return max==spacer.number?spacer:new NumberMarker(max)},domEventHandlers:state.facet(lineNumberConfig).domEventHandlers,side:"before"})),activeLineGutterMarker=new class extends GutterMarker{constructor(){super(...arguments),this.elementClass="cm-activeLineGutter"}},activeLineGutterHighlighter=gutterLineClass.compute(["selection"],state$1=>{let marks=[],last=-1;for(let range of state$1.selection.ranges){let linePos=state$1.doc.lineAt(range.head).from;linePos>last&&(last=linePos,marks.push(activeLineGutterMarker.range(linePos)))}return state.RangeSet.of(marks)}),tabDeco=Decoration.mark({class:"cm-highlightTab"}),spaceDeco=Decoration.mark({class:"cm-highlightSpace"}),whitespaceHighlighter=matcher(new MatchDecorator({regexp:/\t| /g,decoration:match=>"\t"==match[0]?tabDeco:spaceDeco,boundary:/\S/})),trailingHighlighter=matcher(new MatchDecorator({regexp:/\s+$/g,decoration:Decoration.mark({class:"cm-trailingSpace"})})),__test={HeightMap,HeightOracle,MeasuredHeights,QueryType,ChangedRange,computeOrder,moveVisually,clearHeightChangeFlag,getHeightChangeFlag:()=>heightChangeFlag};exports.BidiSpan=BidiSpan,exports.BlockInfo=BlockInfo,exports.BlockWrapper=BlockWrapper,exports.Decoration=Decoration,exports.EditorView=EditorView,exports.GutterMarker=GutterMarker,exports.MatchDecorator=MatchDecorator,exports.RectangleMarker=RectangleMarker,exports.ViewPlugin=ViewPlugin,exports.ViewUpdate=ViewUpdate,exports.WidgetType=WidgetType,exports.__test=__test,exports.activateHover=activateHover,exports.closeHoverTooltip=closeHoverTooltip,exports.closeHoverTooltips=closeHoverTooltips,exports.crosshairCursor=crosshairCursor,exports.drawSelection=drawSelection,exports.dropCursor=dropCursor,exports.getDialog=getDialog,exports.getDrawSelectionConfig=getDrawSelectionConfig,exports.getPanel=getPanel,exports.getTooltip=getTooltip,exports.gutter=gutter,exports.gutterLineClass=gutterLineClass,exports.gutterWidgetClass=gutterWidgetClass,exports.gutters=gutters,exports.hasHoverTooltips=hasHoverTooltips,exports.highlightActiveLine=highlightActiveLine,exports.highlightActiveLineGutter=highlightActiveLineGutter,exports.highlightSpecialChars=highlightSpecialChars,exports.highlightTrailingWhitespace=highlightTrailingWhitespace,exports.highlightWhitespace=highlightWhitespace,exports.hoverTooltip=hoverTooltip,exports.keymap=keymap,exports.layer=layer,exports.lineNumberMarkers=lineNumberMarkers,exports.lineNumberWidgetMarker=lineNumberWidgetMarker,exports.lineNumbers=lineNumbers,exports.logException=logException,exports.panels=panels,exports.placeholder=placeholder,exports.rectangularSelection=rectangularSelection,exports.repositionTooltips=repositionTooltips,exports.runScopeHandlers=runScopeHandlers,exports.scrollPastEnd=scrollPastEnd,exports.showDialog=showDialog,exports.showPanel=showPanel,exports.showTooltip=showTooltip,exports.tooltips=tooltips}(dist),dist)}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports),hasRequiredDist;return module.exports=index,module.exports}
async function _coreInit__codemirror_language(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@lezer/common"),require$$1=await requireAsyncModule("@codemirror/state"),require$$2=await requireAsyncModule("@codemirror/view"),require$$3=await requireAsyncModule("@lezer/highlight"),require$$4=await requireAsyncModule("style-mod"),dist={},distExports=function requireDist(){/**
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
async function _coreInit__codemirror_commands(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/state"),require$$1=await requireAsyncModule("@codemirror/view"),require$$2=await requireAsyncModule("@codemirror/language"),require$$3=await requireAsyncModule("@lezer/common"),dist={},distExports=function requireDist(){function command(f,option){return({state,dispatch})=>{if(state.readOnly)return!1;let tr=f(option,state);return!!tr&&(dispatch(state.update(tr)),!0)}}/**
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
async function _coreInit__codemirror_autocomplete(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/state"),require$$1=await requireAsyncModule("@codemirror/view"),require$$2=await requireAsyncModule("@codemirror/language"),dist={},distExports=function requireDist(){function toSet(chars){let flat=Object.keys(chars).join(""),words=/\w/.test(flat);return words&&(flat=flat.replace(/\w/g,"")),`[${words?"\\w":""}${flat.replace(/[^\w\s]/g,"\\$&")}]`}function prefixMatch(options){let first=Object.create(null),rest=Object.create(null);for(let{label}of options){first[label[0]]=!0;for(let i=1;i<label.length;i++)rest[label[i]]=!0}let source=toSet(first)+toSet(rest)+"*$";return[new RegExp("^"+source),new RegExp(source)]}/**
	Given a a fixed array of options, return an autocompleter that
	completes them.
	*/function completeFromList(list){let options=list.map(o=>"string"==typeof o?{label:o}:o),[validFor,match]=options.every(o=>/^\w+$/.test(o.label))?[/\w*$/,/\w+$/]:prefixMatch(options);return context=>{let token=context.matchBefore(match);return token||context.explicit?{from:token?token.from:context.pos,options,validFor}:null}}/**
	Wrap the given completion source so that it will only fire when the
	cursor is in a syntax node with one of the given names.
	*/function ifIn(nodes,source){return context=>{for(let pos=language.syntaxTree(context.state).resolveInner(context.pos,-1);pos;pos=pos.parent){if(-1<nodes.indexOf(pos.name))return source(context);if(pos.type.isTop)break}return null}}/**
	Wrap the given completion source so that it will not fire when the
	cursor is in a syntax node with one of the given names.
	*/function ifNotIn(nodes,source){return context=>{for(let pos=language.syntaxTree(context.state).resolveInner(context.pos,-1);pos;pos=pos.parent){if(-1<nodes.indexOf(pos.name))return null;if(pos.type.isTop)break}return source(context)}}function cur(state){return state.selection.main.from}// Make sure the given regexp has a $ at its end and, if `start` is
// true, a ^ at its start.
function ensureAnchor(expr,start){var _a;let{source}=expr,addStart=start&&"^"!=source[0],addEnd="$"!=source[source.length-1];return addStart||addEnd?new RegExp(`${addStart?"^":""}(?:${source})${addEnd?"$":""}`,null!==(_a=expr.flags)&&void 0!==_a?_a:expr.ignoreCase?"i":""):expr}/**
	This annotation is added to transactions that are produced by
	picking a completion.
	*/ /**
	Helper function that returns a transaction spec which inserts a
	completion's text in the main selection range, and any other
	selection range that has the same text in front of it.
	*/function insertCompletionText(state$1,text,from,to){let{main}=state$1.selection,fromOff=from-main.from,toOff=to-main.from;return{...state$1.changeByRange(range=>{if(range!=main&&from!=to&&state$1.sliceDoc(range.from+fromOff,range.from+toOff)!=state$1.sliceDoc(from,to))return{range};let lines=state$1.toText(text);return{changes:{from:range.from+fromOff,to:to==main.from?range.to:range.from+toOff,insert:lines},range:state.EditorSelection.cursor(range.from+fromOff+lines.length)}}),scrollIntoView:!0,userEvent:"input.complete"}}function asSource(source){if(!Array.isArray(source))return source;let known=SourceCache.get(source);return known||SourceCache.set(source,known=completeFromList(source)),known}function joinClass(a,b){return a?b?a+" "+b:a:b}function defaultPositionInfo(view$1,list,option,info,space,tooltip){let offset,maxWidth,rtl=view$1.textDirection==view.Direction.RTL,left=rtl,narrow=!1,side="top",spaceLeft=list.left-space.left,spaceRight=space.right-list.right,infoWidth=info.right-info.left,infoHeight=info.bottom-info.top;if(left&&spaceLeft<Math.min(infoWidth,spaceRight)?left=!1:!left&&spaceRight<Math.min(infoWidth,spaceLeft)&&(left=!0),infoWidth<=(left?spaceLeft:spaceRight))offset=Math.max(space.top,Math.min(option.top,space.bottom-infoHeight))-list.top,maxWidth=Math.min(400/* Info.Width */,left?spaceLeft:spaceRight);else{narrow=!0,maxWidth=Math.min(400/* Info.Width */,(rtl?list.right:space.right-list.left)-30/* Info.Margin */);let spaceBelow=space.bottom-list.bottom;spaceBelow>=infoHeight||spaceBelow>list.top?offset=option.bottom-list.top:(side="bottom",offset=list.bottom-option.top)}let scaleY=(list.bottom-list.top)/tooltip.offsetHeight,scaleX=(list.right-list.left)/tooltip.offsetWidth;return{style:`${side}: ${offset/scaleY}px; max-width: ${maxWidth/scaleX}px`,class:"cm-completionInfo-"+(narrow?rtl?"left-narrow":"right-narrow":left?"left":"right")}}function optionContent(config){let content=config.addToOptions.slice();return config.icons&&content.push({render(completion){let icon=document.createElement("div");return icon.classList.add("cm-completionIcon"),completion.type&&icon.classList.add(...completion.type.split(/\s+/g).map(cls=>"cm-completionIcon-"+cls)),icon.setAttribute("aria-hidden","true"),icon},position:20}),content.push({render(completion,_s,_v,match){let labelElt=document.createElement("span");labelElt.className="cm-completionLabel";let label=completion.displayLabel||completion.label,off=0;for(let j=0;j<match.length;){let from=match[j++],to=match[j++];from>off&&labelElt.appendChild(document.createTextNode(label.slice(off,from)));let span=labelElt.appendChild(document.createElement("span"));span.appendChild(document.createTextNode(label.slice(from,to))),span.className="cm-completionMatchedText",off=to}return off<label.length&&labelElt.appendChild(document.createTextNode(label.slice(off))),labelElt},position:50},{render(completion){if(!completion.detail)return null;let detailElt=document.createElement("span");return detailElt.className="cm-completionDetail",detailElt.textContent=completion.detail,detailElt},position:80}),content.sort((a,b)=>a.position-b.position).map(a=>a.render)}function rangeAroundSelected(total,selected,max){if(total<=max)return{from:0,to:total};if(0>selected&&(selected=0),selected<=total>>1){let off=Math.floor(selected/max);return{from:off*max,to:(off+1)*max}}let off=Math.ceil((total-selected)/max);return{from:total-off*max,to:total-(off-1)*max}}function completionTooltip(stateField,applyCompletion){return view=>new CompletionTooltip(view,stateField,applyCompletion)}function scrollIntoView(container,element){let parent=container.getBoundingClientRect(),self=element.getBoundingClientRect(),scaleY=parent.height/container.offsetHeight;self.top<parent.top?container.scrollTop-=(parent.top-self.top)/scaleY:self.bottom>parent.bottom&&(container.scrollTop+=(self.bottom-parent.bottom)/scaleY)}// Used to pick a preferred option when two options with the same
// label occur in the result.
function score(option){return 100*(option.boost||0)+(option.apply?10:0)+(option.info?5:0)+(option.type?1:0)}function sortOptions(active,state){let options=[],sections=null,dynamicSectionScore=null,addOption=option=>{options.push(option);let{section}=option.completion;if(section){sections||(sections=[]);let name="string"==typeof section?section:section.name;sections.some(s=>s.name==name)||sections.push("string"==typeof section?{name}:section)}},conf=state.facet(completionConfig);for(let a of active)if(a.hasResult()){let getMatch=a.result.getMatch;if(!1===a.result.filter)for(let option of a.result.options)addOption(new Option(option,a.source,getMatch?getMatch(option):[],1e9-options.length));else{let match,pattern=state.sliceDoc(a.from,a.to),matcher=conf.filterStrict?new StrictMatcher(pattern):new FuzzyMatcher(pattern);for(let option of a.result.options)if(match=matcher.match(option.label)){let matched=option.displayLabel?getMatch?getMatch(option,match.matched):[]:match.matched,score=match.score+(option.boost||0);if(addOption(new Option(option,a.source,matched,score)),"object"==typeof option.section&&"dynamic"===option.section.rank){let{name}=option.section;dynamicSectionScore||(dynamicSectionScore=Object.create(null)),dynamicSectionScore[name]=Math.max(score,dynamicSectionScore[name]||-1e9)}}}}if(sections){let sectionOrder=Object.create(null),pos=0,cmp=(a,b)=>("dynamic"===a.rank&&"dynamic"===b.rank?dynamicSectionScore[b.name]-dynamicSectionScore[a.name]:0)||("number"==typeof a.rank?a.rank:1e9)-("number"==typeof b.rank?b.rank:1e9)||(a.name<b.name?-1:1);for(let s of sections.sort(cmp))pos-=1e5,sectionOrder[s.name]=pos;for(let option of options){let{section}=option.completion;section&&(option.score+=sectionOrder["string"==typeof section?section:section.name])}}let result=[],prev=null,compare=conf.compareCompletions;for(let opt of options.sort((a,b)=>b.score-a.score||compare(a.completion,b.completion))){let cur=opt.completion;prev&&prev.label==cur.label&&prev.detail==cur.detail&&(null==prev.type||null==cur.type||prev.type==cur.type)&&prev.apply==cur.apply&&prev.boost==cur.boost?score(opt.completion)>score(prev)&&(result[result.length-1]=opt):result.push(opt),prev=opt.completion}return result}function sameResults(a,b){if(a==b)return!0;for(let iA=0,iB=0;;){for(;iA<a.length&&!a[iA].hasResult();)iA++;for(;iB<b.length&&!b[iB].hasResult();)iB++;let endA=iA==a.length,endB=iB==b.length;if(endA||endB)return endA==endB;if(a[iA++].result!=b[iB++].result)return!1}}function makeAttrs(id,selected){let result={"aria-autocomplete":"list","aria-haspopup":"listbox","aria-controls":id};return-1<selected&&(result["aria-activedescendant"]=id+"-"+selected),result}function getUpdateType(tr,conf){if(tr.isUserEvent("input.complete")){let completion=tr.annotation(pickedCompletion);if(completion&&conf.activateOnCompletion(completion))return 12/* UpdateType.Reset */}let typing=tr.isUserEvent("input.type");return typing&&conf.activateOnTyping?5/* UpdateType.Typing */:typing?1/* UpdateType.Typing */:tr.isUserEvent("delete.backward")?2/* UpdateType.Backspacing */:tr.selection?8/* UpdateType.Reset */:tr.docChanged?16/* UpdateType.ResetIfTouching */:0/* UpdateType.None */}function checkValid(validFor,state,from,to){if(!validFor)return!1;let text=state.sliceDoc(from,to);return"function"==typeof validFor?validFor(text,from,to,state):ensureAnchor(validFor,!0).test(text)}function applyCompletion(view,option){const apply=option.completion.apply||option.completion.label;let result=view.state.field(completionState).active.find(a=>a.source==option.source);return!!(result instanceof ActiveResult)&&("string"==typeof apply?view.dispatch({...insertCompletionText(view.state,apply,result.from,result.to),annotations:pickedCompletion.of(option.completion)}):apply(view,option.completion,result.from,result.to),!0)}/**
	Returns a command that moves the completion selection forward or
	backward by the given amount.
	*/function moveCompletionSelection(forward,by="option"){return view$1=>{let cState=view$1.state.field(completionState,!1);if(!cState||!cState.open||cState.open.disabled||Date.now()-cState.open.timestamp<view$1.state.facet(completionConfig).interactionDelay)return!1;let tooltip,step=1;"page"==by&&(tooltip=view.getTooltip(view$1,cState.open.tooltip))&&(step=Math.max(2,Math.floor(tooltip.dom.offsetHeight/tooltip.dom.querySelector("li").offsetHeight)-1));let{length}=cState.open.options,selected=-1<cState.open.selected?cState.open.selected+step*(forward?1:-1):forward?0:length-1;return 0>selected?selected="page"==by?0:length-1:selected>=length&&(selected="page"==by?length-1:0),view$1.dispatch({effects:setSelectedEffect.of(selected)}),!0}}/**
	Accept the current completion.
	*/function fieldSelection(ranges,field){return state.EditorSelection.create(ranges.filter(r=>r.field==field).map(r=>state.EditorSelection.range(r.from,r.to)))}/**
	Convert a snippet template to a function that can
	[apply](https://codemirror.net/6/docs/ref/#autocomplete.Completion.apply) it. Snippets are written
	using syntax like this:

	    "for (let ${index} = 0; ${index} < ${end}; ${index}++) {\n\t${}\n}"

	Each `${}` placeholder (you may also use `#{}`) indicates a field
	that the user can fill in. Its name, if any, will be the default
	content for the field.

	When the snippet is activated by calling the returned function,
	the code is inserted at the given position. Newlines in the
	template are indented by the indentation of the start line, plus
	one [indent unit](https://codemirror.net/6/docs/ref/#language.indentUnit) per tab character after
	the newline.

	On activation, (all instances of) the first field are selected.
	The user can move between fields with Tab and Shift-Tab as long as
	the fields are active. Moving to the last field or moving the
	cursor out of the current field deactivates the fields.

	The order of fields defaults to textual order, but you can add
	numbers to placeholders (`${1}` or `${1:defaultText}`) to provide
	a custom order.

	To include a literal `{` or `}` in your template, put a backslash
	in front of it. This will be removed and the brace will not be
	interpreted as indicating a placeholder.
	*/function snippet(template){let snippet=Snippet.parse(template);return(editor,completion,from,to)=>{let{text,ranges}=snippet.instantiate(editor.state,from),{main}=editor.state.selection,spec={changes:{from,to:to==main.from?main.to:to,insert:state.Text.of(text)},scrollIntoView:!0,annotations:completion?[pickedCompletion.of(completion),state.Transaction.userEvent.of("input.complete")]:void 0};if(ranges.length&&(spec.selection=fieldSelection(ranges,0)),ranges.some(r=>0<r.field)){let active=new ActiveSnippet(ranges,0),effects=spec.effects=[setActive.of(active)];void 0===editor.state.field(snippetState,!1)&&effects.push(state.StateEffect.appendConfig.of([snippetState,addSnippetKeymap,snippetPointerHandler,baseTheme]))}editor.dispatch(editor.state.update(spec))}}function moveField(dir){return({state,dispatch})=>{let active=state.field(snippetState,!1);if(!active||0>dir&&0==active.active)return!1;let next=active.active+dir,last=0<dir&&!active.ranges.some(r=>r.field==next+dir);return dispatch(state.update({selection:fieldSelection(active.ranges,next),effects:setActive.of(last?null:new ActiveSnippet(active.ranges,next)),scrollIntoView:!0})),!0}}/**
	A command that clears the active snippet, if any.
	*/ /**
	Check if there is an active snippet with a next field for
	`nextSnippetField` to move to.
	*/function hasNextSnippetField(state){let active=state.field(snippetState,!1);return!!(active&&active.ranges.some(r=>r.field==active.active+1))}/**
	Returns true if there is an active snippet and a previous field
	for `prevSnippetField` to move to.
	*/function hasPrevSnippetField(state){let active=state.field(snippetState,!1);return!!(active&&0<active.active)}/**
	Create a completion from a snippet. Returns an object with the
	properties from `completion`, plus an `apply` function that
	applies the snippet.
	*/function snippetCompletion(template,completion){return{...completion,apply:snippet(template)}}function wordRE(wordChars){let escaped=wordChars.replace(/[\]\-\\]/g,"\\$&");try{return new RegExp(`[\\p{Alphabetic}\\p{Number}_${escaped}]+`,"ug")}catch(_a){return new RegExp(`[\w${escaped}]`,"g")}}function mapRE(re,f){return new RegExp(f(re.source),re.unicode?"u":"")}function wordCache(wordChars){return wordCaches[wordChars]||(wordCaches[wordChars]=new WeakMap)}function storeWords(doc,wordRE,result,seen,ignoreAt){for(let lines=doc.iterLines(),pos=0;!lines.next().done;){let m,{value}=lines;for(wordRE.lastIndex=0;m=wordRE.exec(value);)if(!seen[m[0]]&&pos+m.index!=ignoreAt&&(result.push({type:"text",label:m[0]}),seen[m[0]]=!0,2e3<=result.length/* C.MaxList */))return;pos+=value.length+1}}function collectWords(doc,cache,wordRE,to,ignoreAt){let big=1e3<=doc.length/* C.MinCacheLen */,cached=big&&cache.get(doc);if(cached)return cached;let result=[],seen=Object.create(null);if(doc.children){let pos=0;for(let ch of doc.children){if(1e3<=ch.length/* C.MinCacheLen */)for(let c of collectWords(ch,cache,wordRE,to-pos,ignoreAt-pos))seen[c.label]||(seen[c.label]=!0,result.push(c));else storeWords(ch,wordRE,result,seen,ignoreAt-pos);pos+=ch.length+1}}else storeWords(doc,wordRE,result,seen,ignoreAt);return big&&2e3>result.length/* C.MaxList */&&cache.set(doc,result),result}/**
	A completion source that will scan the document for words (using a
	[character categorizer](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer)), and
	return those as completions.
	*/ /**
	Extension to enable bracket-closing behavior. When a closeable
	bracket is typed, its closing bracket is immediately inserted
	after the cursor. When closing a bracket directly in front of a
	closing bracket inserted by the extension, the cursor moves over
	that bracket.
	*/function closeBrackets(){return[inputHandler,bracketState]}function closing(ch){for(let i=0;i<definedClosing.length;i+=2)if(definedClosing.charCodeAt(i)==ch)return definedClosing.charAt(i+1);return state.fromCodePoint(128>ch?ch:ch+1)}function config(state,pos){return state.languageDataAt("closeBrackets",pos)[0]||defaults}/**
	Implements the extension's behavior on text insertion. If the
	given string counts as a bracket in the language around the
	selection, and replacing the selection with it requires custom
	behavior (inserting a closing version or skipping past a
	previously-closed bracket), this function returns a transaction
	representing that custom behavior. (You only need this if you want
	to programmatically insert brackets—the
	[`closeBrackets`](https://codemirror.net/6/docs/ref/#autocomplete.closeBrackets) extension will
	take care of running this for user input.)
	*/function insertBracket(state$1,bracket){let conf=config(state$1,state$1.selection.main.head),tokens=conf.brackets||defaults.brackets;for(let tok of tokens){let closed=closing(state.codePointAt(tok,0));if(bracket==tok)return closed==tok?handleSame(state$1,tok,-1<tokens.indexOf(tok+tok+tok),conf):handleOpen(state$1,tok,closed,conf.before||defaults.before);if(bracket==closed&&closedBracketAt(state$1,state$1.selection.main.from))return handleClose(state$1,tok,closed)}return null}function closedBracketAt(state,pos){let found=!1;return state.field(bracketState).between(0,state.doc.length,from=>{from==pos&&(found=!0)}),found}function nextChar(doc,pos){let next=doc.sliceString(pos,pos+2);return next.slice(0,state.codePointSize(state.codePointAt(next,0)))}function prevChar(doc,pos){let prev=doc.sliceString(pos-2,pos);return state.codePointSize(state.codePointAt(prev,0))==prev.length?prev:prev.slice(1)}function handleOpen(state$1,open,close,closeBefore){let dont=null,changes=state$1.changeByRange(range=>{if(!range.empty)return{changes:[{insert:open,from:range.from},{insert:close,from:range.to}],effects:closeBracketEffect.of(range.to+open.length),range:state.EditorSelection.range(range.anchor+open.length,range.head+open.length)};let next=nextChar(state$1.doc,range.head);return!next||/\s/.test(next)||-1<closeBefore.indexOf(next)?{changes:{insert:open+close,from:range.head},effects:closeBracketEffect.of(range.head+open.length),range:state.EditorSelection.cursor(range.head+open.length)}:{range:dont=range}});return dont?null:state$1.update(changes,{scrollIntoView:!0,userEvent:"input.type"})}function handleClose(state$1,_open,close){let dont=null,changes=state$1.changeByRange(range=>range.empty&&nextChar(state$1.doc,range.head)==close?{changes:{from:range.head,to:range.head+close.length,insert:close},range:state.EditorSelection.cursor(range.head+close.length)}:dont={range});return dont?null:state$1.update(changes,{scrollIntoView:!0,userEvent:"input.type"})}// Handles cases where the open and close token are the same, and
// possibly triple quotes (as in `"""abc"""`-style quoting).
function handleSame(state$1,token,allowTriple,config){let stringPrefixes=config.stringPrefixes||defaults.stringPrefixes,dont=null,changes=state$1.changeByRange(range=>{if(!range.empty)return{changes:[{insert:token,from:range.from},{insert:token,from:range.to}],effects:closeBracketEffect.of(range.to+token.length),range:state.EditorSelection.range(range.anchor+token.length,range.head+token.length)};let start,pos=range.head,next=nextChar(state$1.doc,pos);if(next==token){if(nodeStart(state$1,pos))return{changes:{insert:token+token,from:pos},effects:closeBracketEffect.of(pos+token.length),range:state.EditorSelection.cursor(pos+token.length)};if(closedBracketAt(state$1,pos)){let isTriple=allowTriple&&state$1.sliceDoc(pos,pos+3*token.length)==token+token+token,content=isTriple?token+token+token:token;return{changes:{from:pos,to:pos+content.length,insert:content},range:state.EditorSelection.cursor(pos+content.length)}}}else{if(allowTriple&&state$1.sliceDoc(pos-2*token.length,pos)==token+token&&-1<(start=canStartStringAt(state$1,pos-2*token.length,stringPrefixes))&&nodeStart(state$1,start))return{changes:{insert:token+token+token+token,from:pos},effects:closeBracketEffect.of(pos+token.length),range:state.EditorSelection.cursor(pos+token.length)};if(state$1.charCategorizer(pos)(next)!=state.CharCategory.Word&&-1<canStartStringAt(state$1,pos,stringPrefixes)&&!probablyInString(state$1,pos,token,stringPrefixes))return{changes:{insert:token+token,from:pos},effects:closeBracketEffect.of(pos+token.length),range:state.EditorSelection.cursor(pos+token.length)}}return{range:dont=range}});return dont?null:state$1.update(changes,{scrollIntoView:!0,userEvent:"input.type"})}function nodeStart(state,pos){let tree=language.syntaxTree(state).resolveInner(pos+1);return tree.parent&&tree.from==pos}function probablyInString(state,pos,quoteToken,prefixes){let node=language.syntaxTree(state).resolveInner(pos,-1),maxPrefix=prefixes.reduce((m,p)=>Math.max(m,p.length),0);for(let i=0;5>i;i++){let start=state.sliceDoc(node.from,Math.min(node.to,node.from+quoteToken.length+maxPrefix)),quotePos=start.indexOf(quoteToken);if(!quotePos||-1<quotePos&&-1<prefixes.indexOf(start.slice(0,quotePos))){for(let first=node.firstChild;first&&first.from==node.from&&first.to-first.from>quoteToken.length+quotePos;){if(state.sliceDoc(first.to-quoteToken.length,first.to)==quoteToken)return!1;first=first.firstChild}return!0}let parent=node.to==pos&&node.parent;if(!parent)break;node=parent}return!1}function canStartStringAt(state$1,pos,prefixes){let charCat=state$1.charCategorizer(pos);if(charCat(state$1.sliceDoc(pos-1,pos))!=state.CharCategory.Word)return pos;for(let prefix of prefixes){let start=pos-prefix.length;if(state$1.sliceDoc(start,pos)==prefix&&charCat(state$1.sliceDoc(start-1,start))!=state.CharCategory.Word)return start}return-1}/**
	Returns an extension that enables autocompletion.
	*/function autocompletion(config={}){return[commitCharacters,completionState,completionConfig.of(config),completionPlugin,completionKeymapExt,baseTheme]}/**
	Basic keybindings for autocompletion.

	 - Ctrl-Space (and Alt-\` or Alt-i on macOS): [`startCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.startCompletion)
	 - Escape: [`closeCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.closeCompletion)
	 - ArrowDown: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(true)`
	 - ArrowUp: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(false)`
	 - PageDown: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(true, "page")`
	 - PageUp: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(false, "page")`
	 - Enter: [`acceptCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.acceptCompletion)
	*/ /**
	Get the current completion status. When completions are available,
	this will return `"active"`. When completions are pending (in the
	process of being queried), this returns `"pending"`. Otherwise, it
	returns `null`.
	*/function completionStatus(state){let cState=state.field(completionState,!1);return cState&&cState.active.some(a=>a.isPending)?"pending":cState&&cState.active.some(a=>0!=a.state/* State.Inactive */)?"active":null}/**
	Returns the available completions as an array.
	*/function currentCompletions(state){var _a;let open=null===(_a=state.field(completionState,!1))||void 0===_a?void 0:_a.open;if(!open||open.disabled)return[];let completions=completionArrayCache.get(open.options);return completions||completionArrayCache.set(open.options,completions=open.options.map(o=>o.completion)),completions}/**
	Return the currently selected completion, if any.
	*/function selectedCompletion(state){var _a;let open=null===(_a=state.field(completionState,!1))||void 0===_a?void 0:_a.open;return open&&!open.disabled&&0<=open.selected?open.options[open.selected].completion:null}/**
	Returns the currently selected position in the active completion
	list, or null if no completions are active.
	*/function selectedCompletionIndex(state){var _a;let open=null===(_a=state.field(completionState,!1))||void 0===_a?void 0:_a.open;return open&&!open.disabled&&0<=open.selected?open.selected:null}/**
	Create an effect that can be attached to a transaction to change
	the currently selected completion.
	*/function setSelectedCompletion(index){return setSelectedEffect.of(index)}if(hasRequiredDist)return dist;hasRequiredDist=1;var state=require$$0,view=require$$1,language=require$$2;/**
	An instance of this is passed to completion source functions.
	*/class CompletionContext{/**
	    Create a new completion context. (Mostly useful for testing
	    completion sources—in the editor, the extension will create
	    these for you.)
	    */constructor(/**
	    The editor state that the completion happens in.
	    */state,/**
	    The position at which the completion is happening.
	    */pos,/**
	    Indicates whether completion was activated explicitly, or
	    implicitly by typing. The usual way to respond to this is to
	    only return completions when either there is part of a
	    completable entity before the cursor, or `explicit` is true.
	    */explicit,/**
	    The editor view. May be undefined if the context was created
	    in a situation where there is no such view available, such as
	    in synchronous updates via
	    [`CompletionResult.update`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.update)
	    or when called by test code.
	    */view){this.state=state,this.pos=pos,this.explicit=explicit,this.view=view,this.abortListeners=[],this.abortOnDocChange=!1}/**
	    Get the extent, content, and (if there is a token) type of the
	    token before `this.pos`.
	    */tokenBefore(types){let token=language.syntaxTree(this.state).resolveInner(this.pos,-1);for(;token&&0>types.indexOf(token.name);)token=token.parent;return token?{from:token.from,to:this.pos,text:this.state.sliceDoc(token.from,this.pos),type:token.type}:null}/**
	    Get the match of the given expression directly before the
	    cursor.
	    */matchBefore(expr){let line=this.state.doc.lineAt(this.pos),start=Math.max(line.from,this.pos-250),str=line.text.slice(start-line.from,this.pos-line.from),found=str.search(ensureAnchor(expr,!1));return 0>found?null:{from:start+found,to:this.pos,text:str.slice(found)}}/**
	    Yields true when the query has been aborted. Can be useful in
	    asynchronous queries to avoid doing work that will be ignored.
	    */get aborted(){return null==this.abortListeners}/**
	    Allows you to register abort handlers, which will be called when
	    the query is
	    [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
	    
	    By default, running queries will not be aborted for regular
	    typing or backspacing, on the assumption that they are likely to
	    return a result with a
	    [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
	    allows the result to be used after all. Passing `onDocChange:
	    true` will cause this query to be aborted for any document
	    change.
	    */addEventListener(type,listener,options){"abort"==type&&this.abortListeners&&(this.abortListeners.push(listener),options&&options.onDocChange&&(this.abortOnDocChange=!0))}}class Option{constructor(completion,source,match,score){this.completion=completion,this.source=source,this.match=match,this.score=score}}const pickedCompletion=state.Annotation.define(),SourceCache=new WeakMap,startCompletionEffect=state.StateEffect.define(),closeCompletionEffect=state.StateEffect.define();// A pattern matcher for fuzzy completion matching. Create an instance
// once for a pattern, and then use that to match any number of
// completions.
class FuzzyMatcher{constructor(pattern){this.pattern=pattern,this.chars=[],this.folded=[],this.any=[],this.precise=[],this.byWord=[],this.score=0,this.matched=[];for(let p=0;p<pattern.length;){let char=state.codePointAt(pattern,p),size=state.codePointSize(char);this.chars.push(char);let part=pattern.slice(p,p+size),upper=part.toUpperCase();this.folded.push(state.codePointAt(upper==part?part.toLowerCase():upper,0)),p+=size}this.astral=pattern.length!=this.chars.length}ret(score,matched){return this.score=score,this.matched=matched,this}// Matches a given word (completion) against the pattern (input).
// Will return a boolean indicating whether there was a match and,
// on success, set `this.score` to the score, `this.matched` to an
// array of `from, to` pairs indicating the matched parts of `word`.
//
// The score is a number that is more negative the worse the match
// is. See `Penalty` above.
match(word){if(0==this.pattern.length)return this.ret(-100/* Penalty.NotFull */,[]);if(word.length<this.pattern.length)return null;let{chars,folded,any,precise,byWord}=this;// For single-character queries, only match when they occur right
// at the start
if(1==chars.length){let first=state.codePointAt(word,0),firstSize=state.codePointSize(first),score=firstSize==word.length?0:-100/* Penalty.NotFull */;if(first==chars[0]);else if(first==folded[0])score+=-200/* Penalty.CaseFold */;else return null;return this.ret(score,[0,firstSize])}let direct=word.indexOf(this.pattern);if(0==direct)return this.ret(word.length==this.pattern.length?0:-100/* Penalty.NotFull */,[0,this.pattern.length]);let len=chars.length,anyTo=0;if(0>direct){for(let next,i=0,e=Math.min(word.length,200);i<e&&anyTo<len;)next=state.codePointAt(word,i),(next==chars[anyTo]||next==folded[anyTo])&&(any[anyTo++]=i),i+=state.codePointSize(next);// No match, exit immediately
if(anyTo<len)return null}// This tracks the extent of the precise (non-folded, not
// necessarily adjacent) match
let preciseTo=0,byWordTo=0,byWordFolded=!1,adjacentTo=0,adjacentStart=-1,adjacentEnd=-1,hasLower=/[a-z]/.test(word),wordAdjacent=!0;// Tracks whether there is a match that hits only characters that
// appear to be starting words. `byWordFolded` is set to true when
// a case folded character is encountered in such a match
// If we've found a partial adjacent match, these track its state
// Go over the option's text, scanning for the various kinds of matches
for(let next,i=0,e=Math.min(word.length,200),prevType=0/* Tp.NonWord */;i<e&&byWordTo<len;){next=state.codePointAt(word,i),0>direct&&(preciseTo<len&&next==chars[preciseTo]&&(precise[preciseTo++]=i),adjacentTo<len&&(next==chars[adjacentTo]||next==folded[adjacentTo]?(0==adjacentTo&&(adjacentStart=i),adjacentEnd=i+1,adjacentTo++):adjacentTo=0));let ch,type=255>next?48<=next&&57>=next||97<=next&&122>=next?2/* Tp.Lower */:65<=next&&90>=next?1/* Tp.Upper */:0/* Tp.NonWord */:(ch=state.fromCodePoint(next))==ch.toLowerCase()?ch==ch.toUpperCase()?0:2/* Tp.Lower */:1/* Tp.Upper */ /* Tp.NonWord */;(!i||1==type/* Tp.Upper */&&hasLower||0==prevType/* Tp.NonWord */&&0!=type/* Tp.NonWord */)&&(chars[byWordTo]==next||folded[byWordTo]==next&&(byWordFolded=!0)?byWord[byWordTo++]=i:byWord.length&&(wordAdjacent=!1)),prevType=type,i+=state.codePointSize(next)}return byWordTo==len&&0==byWord[0]&&wordAdjacent?this.result(-100/* Penalty.ByWord */+(byWordFolded?-200/* Penalty.CaseFold */:0),byWord,word):adjacentTo==len&&0==adjacentStart?this.ret(-200/* Penalty.CaseFold */-word.length+(adjacentEnd==word.length?0:-100/* Penalty.NotFull */),[0,adjacentEnd]):-1<direct?this.ret(-700/* Penalty.NotStart */-word.length,[direct,direct+this.pattern.length]):adjacentTo==len?this.ret(-900/* Penalty.NotStart */-word.length,[adjacentStart,adjacentEnd]):byWordTo==len?this.result(-100/* Penalty.ByWord */+(byWordFolded?-200/* Penalty.CaseFold */:0)+-700/* Penalty.NotStart */+(wordAdjacent?0:-1100/* Penalty.Gap */),byWord,word):2==chars.length?null:this.result((any[0]?-700/* Penalty.NotStart */:0)+-200/* Penalty.CaseFold */+-1100/* Penalty.Gap */,any,word)}result(score,positions,word){let result=[],i=0;for(let pos of positions){let to=pos+(this.astral?state.codePointSize(state.codePointAt(word,pos)):1);i&&result[i-1]==pos?result[i-1]=to:(result[i++]=pos,result[i++]=to)}return this.ret(score-word.length,result)}}class StrictMatcher{constructor(pattern){this.pattern=pattern,this.matched=[],this.score=0,this.folded=pattern.toLowerCase()}match(word){if(word.length<this.pattern.length)return null;let start=word.slice(0,this.pattern.length),match=start==this.pattern?0:start.toLowerCase()==this.folded?-200/* Penalty.CaseFold */:null;return null==match?null:(this.matched=[0,start.length],this.score=match+(word.length==this.pattern.length?0:-100/* Penalty.NotFull */),this)}}const completionConfig=state.Facet.define({combine(configs){return state.combineConfig(configs,{activateOnTyping:!0,activateOnCompletion:()=>!1,activateOnTypingDelay:100,selectOnOpen:!0,override:null,closeOnBlur:!0,maxRenderedOptions:100,defaultKeymap:!0,tooltipClass:()=>"",optionClass:()=>"",aboveCursor:!1,icons:!0,addToOptions:[],positionInfo:defaultPositionInfo,filterStrict:!1,compareCompletions:(a,b)=>(a.sortText||a.label).localeCompare(b.sortText||b.label),interactionDelay:75,updateSyncTime:100},{defaultKeymap:(a,b)=>a&&b,closeOnBlur:(a,b)=>a&&b,icons:(a,b)=>a&&b,tooltipClass:(a,b)=>c=>joinClass(a(c),b(c)),optionClass:(a,b)=>c=>joinClass(a(c),b(c)),addToOptions:(a,b)=>a.concat(b),filterStrict:(a,b)=>a||b})}}),setSelectedEffect=state.StateEffect.define();class CompletionTooltip{constructor(view,stateField,applyCompletion){this.view=view,this.stateField=stateField,this.applyCompletion=applyCompletion,this.info=null,this.infoDestroy=null,this.placeInfoReq={read:()=>this.measureInfo(),write:pos=>this.placeInfo(pos),key:this},this.space=null,this.currentClass="";let cState=view.state.field(stateField),{options,selected}=cState.open,config=view.state.facet(completionConfig);this.optionContent=optionContent(config),this.optionClass=config.optionClass,this.tooltipClass=config.tooltipClass,this.range=rangeAroundSelected(options.length,selected,config.maxRenderedOptions),this.dom=document.createElement("div"),this.dom.className="cm-tooltip-autocomplete",this.updateTooltipClass(view.state),this.dom.addEventListener("mousedown",e=>{let{options}=view.state.field(stateField).open;for(let match,dom=e.target;dom&&dom!=this.dom;dom=dom.parentNode)if("LI"==dom.nodeName&&(match=/-(\d+)$/.exec(dom.id))&&+match[1]<options.length)return this.applyCompletion(view,options[+match[1]]),void e.preventDefault();if(e.target==this.list){let move=this.list.classList.contains("cm-completionListIncompleteTop")&&e.clientY<this.list.firstChild.getBoundingClientRect().top?this.range.from-1:this.list.classList.contains("cm-completionListIncompleteBottom")&&e.clientY>this.list.lastChild.getBoundingClientRect().bottom?this.range.to:null;null!=move&&(view.dispatch({effects:setSelectedEffect.of(move)}),e.preventDefault())}}),this.dom.addEventListener("focusout",e=>{let state=view.state.field(this.stateField,!1);state&&state.tooltip&&view.state.facet(completionConfig).closeOnBlur&&e.relatedTarget!=view.contentDOM&&view.dispatch({effects:closeCompletionEffect.of(null)})}),this.showOptions(options,cState.id)}mount(){this.updateSel()}showOptions(options,id){this.list&&this.list.remove(),this.list=this.dom.appendChild(this.createListBox(options,id,this.range)),this.list.addEventListener("scroll",()=>{this.info&&this.view.requestMeasure(this.placeInfoReq)})}update(update){var _a;let cState=update.state.field(this.stateField),prevState=update.startState.field(this.stateField);if(this.updateTooltipClass(update.state),cState!=prevState){let{options,selected,disabled}=cState.open;prevState.open&&prevState.open.options==options||(this.range=rangeAroundSelected(options.length,selected,update.state.facet(completionConfig).maxRenderedOptions),this.showOptions(options,cState.id)),this.updateSel(),disabled!=(null===(_a=prevState.open)||void 0===_a?void 0:_a.disabled)&&this.dom.classList.toggle("cm-tooltip-autocomplete-disabled",!!disabled)}}updateTooltipClass(state){let cls=this.tooltipClass(state);if(cls!=this.currentClass){for(let c of this.currentClass.split(" "))c&&this.dom.classList.remove(c);for(let c of cls.split(" "))c&&this.dom.classList.add(c);this.currentClass=cls}}positioned(space){this.space=space,this.info&&this.view.requestMeasure(this.placeInfoReq)}updateSel(){let cState=this.view.state.field(this.stateField),open=cState.open;(-1<open.selected&&open.selected<this.range.from||open.selected>=this.range.to)&&(this.range=rangeAroundSelected(open.options.length,open.selected,this.view.state.facet(completionConfig).maxRenderedOptions),this.showOptions(open.options,cState.id));let newSel=this.updateSelectedOption(open.selected);if(newSel){this.destroyInfo();let{completion}=open.options[open.selected],{info}=completion;if(!info)return;let infoResult="string"==typeof info?document.createTextNode(info):info(completion);if(!infoResult)return;"then"in infoResult?infoResult.then(obj=>{obj&&this.view.state.field(this.stateField,!1)==cState&&this.addInfoPane(obj,completion)}).catch(e=>view.logException(this.view.state,e,"completion info")):(this.addInfoPane(infoResult,completion),newSel.setAttribute("aria-describedby",this.info.id))}}addInfoPane(content,completion){this.destroyInfo();let wrap=this.info=document.createElement("div");if(wrap.className="cm-tooltip cm-completionInfo",wrap.id="cm-completionInfo-"+Math.floor(65535*Math.random()).toString(16),null!=content.nodeType)wrap.appendChild(content),this.infoDestroy=null;else{let{dom,destroy}=content;wrap.appendChild(dom),this.infoDestroy=destroy||null}this.dom.appendChild(wrap),this.view.requestMeasure(this.placeInfoReq)}updateSelectedOption(selected){let set=null;for(let opt=this.list.firstChild,i=this.range.from;opt;opt=opt.nextSibling,i++)"LI"==opt.nodeName&&opt.id?i==selected?opt.hasAttribute("aria-selected")||(opt.setAttribute("aria-selected","true"),set=opt):opt.hasAttribute("aria-selected")&&(opt.removeAttribute("aria-selected"),opt.removeAttribute("aria-describedby")):i--;return set&&scrollIntoView(this.list,set),set}measureInfo(){let sel=this.dom.querySelector("[aria-selected]");if(!sel||!this.info)return null;let listRect=this.dom.getBoundingClientRect(),infoRect=this.info.getBoundingClientRect(),selRect=sel.getBoundingClientRect(),space=this.space;if(!space){let docElt=this.dom.ownerDocument.documentElement;space={left:0,top:0,right:docElt.clientWidth,bottom:docElt.clientHeight}}return selRect.top>Math.min(space.bottom,listRect.bottom)-10||selRect.bottom<Math.max(space.top,listRect.top)+10?null:this.view.state.facet(completionConfig).positionInfo(this.view,listRect,selRect,infoRect,space,this.dom)}placeInfo(pos){this.info&&(pos?(pos.style&&(this.info.style.cssText=pos.style),this.info.className="cm-tooltip cm-completionInfo "+(pos.class||"")):this.info.style.cssText="top: -1e6px")}createListBox(options,id,range){const ul=document.createElement("ul");ul.id=id,ul.setAttribute("role","listbox"),ul.setAttribute("aria-expanded","true"),ul.setAttribute("aria-label",this.view.state.phrase("Completions")),ul.addEventListener("mousedown",e=>{e.target==ul&&e.preventDefault()});let curSection=null;for(let i=range.from;i<range.to;i++){let{completion,match}=options[i],{section}=completion;if(section){let name="string"==typeof section?section:section.name;if(name!=curSection&&(i>range.from||0==range.from))if(curSection=name,"string"!=typeof section&&section.header)ul.appendChild(section.header(section));else{let header=ul.appendChild(document.createElement("completion-section"));header.textContent=name}}const li=ul.appendChild(document.createElement("li"));li.id=id+"-"+i,li.setAttribute("role","option");let cls=this.optionClass(completion);cls&&(li.className=cls);for(let source of this.optionContent){let node=source(completion,this.view.state,this.view,match);node&&li.appendChild(node)}}return range.from&&ul.classList.add("cm-completionListIncompleteTop"),range.to<options.length&&ul.classList.add("cm-completionListIncompleteBottom"),ul}destroyInfo(){this.info&&(this.infoDestroy&&this.infoDestroy(),this.info.remove(),this.info=null)}destroy(){this.destroyInfo()}}class CompletionDialog{constructor(options,attrs,tooltip,timestamp,selected,disabled){this.options=options,this.attrs=attrs,this.tooltip=tooltip,this.timestamp=timestamp,this.selected=selected,this.disabled=disabled}setSelected(selected,id){return selected==this.selected||selected>=this.options.length?this:new CompletionDialog(this.options,makeAttrs(id,selected),this.tooltip,this.timestamp,selected,this.disabled)}static build(active,state,id,prev,conf,didSetActive){if(prev&&!didSetActive&&active.some(s=>s.isPending))return prev.setDisabled();let options=sortOptions(active,state);if(!options.length)return prev&&active.some(a=>a.isPending)?prev.setDisabled():null;let selected=state.facet(completionConfig).selectOnOpen?0:-1;if(prev&&prev.selected!=selected&&-1!=prev.selected){let selectedValue=prev.options[prev.selected].completion;for(let i=0;i<options.length;i++)if(options[i].completion==selectedValue){selected=i;break}}return new CompletionDialog(options,makeAttrs(id,selected),{pos:active.reduce((a,b)=>b.hasResult()?Math.min(a,b.from):a,1e8),create:createTooltip,above:conf.aboveCursor},prev?prev.timestamp:Date.now(),selected,!1)}map(changes){return new CompletionDialog(this.options,this.attrs,{...this.tooltip,pos:changes.mapPos(this.tooltip.pos)},this.timestamp,this.selected,this.disabled)}setDisabled(){return new CompletionDialog(this.options,this.attrs,this.tooltip,this.timestamp,this.selected,!0)}}class CompletionState{constructor(active,id,open){this.active=active,this.id=id,this.open=open}static start(){return new CompletionState(none,"cm-ac-"+Math.floor(2e6*Math.random()).toString(36),null)}update(tr){let{state}=tr,conf=state.facet(completionConfig),sources=conf.override||state.languageDataAt("autocomplete",cur(state)).map(asSource),active=sources.map(source=>{let value=this.active.find(s=>s.source==source)||new ActiveSource(source,this.active.some(a=>0!=a.state/* State.Inactive */)?1/* State.Pending */:0/* State.Inactive */);return value.update(tr,conf)});active.length==this.active.length&&active.every((a,i)=>a==this.active[i])&&(active=this.active);let open=this.open,didSet=tr.effects.some(e=>e.is(setActiveEffect));open&&tr.docChanged&&(open=open.map(tr.changes)),tr.selection||active.some(a=>a.hasResult()&&tr.changes.touchesRange(a.from,a.to))||!sameResults(active,this.active)||didSet?open=CompletionDialog.build(active,state,this.id,open,conf,didSet):open&&open.disabled&&!active.some(a=>a.isPending)&&(open=null),!open&&active.every(a=>!a.isPending)&&active.some(a=>a.hasResult())&&(active=active.map(a=>a.hasResult()?new ActiveSource(a.source,0/* State.Inactive */):a));for(let effect of tr.effects)effect.is(setSelectedEffect)&&(open=open&&open.setSelected(effect.value,this.id));return active==this.active&&open==this.open?this:new CompletionState(active,this.id,open)}get tooltip(){return this.open?this.open.tooltip:null}get attrs(){return this.open?this.open.attrs:this.active.length?baseAttrs:noAttrs}}const baseAttrs={"aria-autocomplete":"list"},noAttrs={},none=[];class ActiveSource{constructor(source,state,explicit=!1){this.source=source,this.state=state,this.explicit=explicit}hasResult(){return!1}get isPending(){return 1==this.state/* State.Pending */}update(tr,conf){let type=getUpdateType(tr,conf),value=this;(8&type/* UpdateType.Reset */||16&type/* UpdateType.ResetIfTouching */&&this.touches(tr))&&(value=new ActiveSource(value.source,0/* State.Inactive */)),4&type/* UpdateType.Activate */&&0==value.state/* State.Inactive */&&(value=new ActiveSource(this.source,1/* State.Pending */)),value=value.updateFor(tr,type);for(let effect of tr.effects)if(effect.is(startCompletionEffect))value=new ActiveSource(value.source,1/* State.Pending */,effect.value);else if(effect.is(closeCompletionEffect))value=new ActiveSource(value.source,0/* State.Inactive */);else if(effect.is(setActiveEffect))for(let active of effect.value)active.source==value.source&&(value=active);return value}updateFor(tr,type){return this.map(tr.changes)}map(changes){return this}touches(tr){return tr.changes.touchesRange(cur(tr.state))}}class ActiveResult extends ActiveSource{constructor(source,explicit,limit,result,from,to){super(source,3/* State.Result */,explicit),this.limit=limit,this.result=result,this.from=from,this.to=to}hasResult(){return!0}updateFor(tr,type){var _a;if(!(3&type/* UpdateType.SimpleInteraction */))return this.map(tr.changes);let result=this.result;result.map&&!tr.changes.empty&&(result=result.map(result,tr.changes));let from=tr.changes.mapPos(this.from),to=tr.changes.mapPos(this.to,1),pos=cur(tr.state);if(pos>to||!result||2&type/* UpdateType.Backspacing */&&(cur(tr.startState)==this.from||pos<this.limit))return new ActiveSource(this.source,4&type/* UpdateType.Activate */?1/* State.Pending */:0/* State.Inactive */);let limit=tr.changes.mapPos(this.limit);return checkValid(result.validFor,tr.state,from,to)?new ActiveResult(this.source,this.explicit,limit,result,from,to):result.update&&(result=result.update(result,from,to,new CompletionContext(tr.state,pos,!1)))?new ActiveResult(this.source,this.explicit,limit,result,result.from,null!==(_a=result.to)&&void 0!==_a?_a:cur(tr.state)):new ActiveSource(this.source,1/* State.Pending */,this.explicit)}map(mapping){if(mapping.empty)return this;let result=this.result.map?this.result.map(this.result,mapping):this.result;return result?new ActiveResult(this.source,this.explicit,mapping.mapPos(this.limit),this.result,mapping.mapPos(this.from),mapping.mapPos(this.to,1)):new ActiveSource(this.source,0/* State.Inactive */)}touches(tr){return tr.changes.touchesRange(this.from,this.to)}}const setActiveEffect=state.StateEffect.define({map(sources,mapping){return sources.map(s=>s.map(mapping))}}),completionState=state.StateField.define({create(){return CompletionState.start()},update(value,tr){return value.update(tr)},provide:f=>[view.showTooltip.from(f,val=>val.tooltip),view.EditorView.contentAttributes.from(f,state=>state.attrs)]}),createTooltip=completionTooltip(completionState,applyCompletion),acceptCompletion=view=>{let cState=view.state.field(completionState,!1);return!(view.state.readOnly||!cState||!cState.open||0>cState.open.selected||cState.open.disabled||Date.now()-cState.open.timestamp<view.state.facet(completionConfig).interactionDelay)&&applyCompletion(view,cState.open.options[cState.open.selected])},startCompletion=view=>{let cState=view.state.field(completionState,!1);return!!cState&&(view.dispatch({effects:startCompletionEffect.of(!0)}),!0)},closeCompletion=view=>{let cState=view.state.field(completionState,!1);return!!(cState&&cState.active.some(a=>0!=a.state/* State.Inactive */))&&(view.dispatch({effects:closeCompletionEffect.of(null)}),!0)};/**
	Explicitly start autocompletion.
	*/ /**
	Close the currently active completion.
	*/class RunningQuery{constructor(active,context){this.active=active,this.context=context,this.time=Date.now(),this.updates=[],this.done=void 0}}const MaxUpdateCount=50,MinAbortTime=1e3,completionPlugin=view.ViewPlugin.fromClass(class{constructor(view){this.view=view,this.debounceUpdate=-1,this.running=[],this.debounceAccept=-1,this.pendingStart=!1,this.composing=0/* CompositionState.None */;for(let active of view.state.field(completionState).active)active.isPending&&this.startQuery(active)}update(update){let cState=update.state.field(completionState),conf=update.state.facet(completionConfig);if(update.selectionSet||update.docChanged||update.startState.field(completionState)!=cState){let doesReset=update.transactions.some(tr=>{let type=getUpdateType(tr,conf);return 8&type/* UpdateType.Reset */||(tr.selection||tr.docChanged)&&!(3&type/* UpdateType.SimpleInteraction */)});for(let query,i=0;i<this.running.length;i++)if(query=this.running[i],doesReset||query.context.abortOnDocChange&&update.docChanged||query.updates.length+update.transactions.length>MaxUpdateCount&&Date.now()-query.time>MinAbortTime){for(let handler of query.context.abortListeners)try{handler()}catch(e){view.logException(this.view.state,e)}query.context.abortListeners=null,this.running.splice(i--,1)}else query.updates.push(...update.transactions);-1<this.debounceUpdate&&clearTimeout(this.debounceUpdate),update.transactions.some(tr=>tr.effects.some(e=>e.is(startCompletionEffect)))&&(this.pendingStart=!0);let delay=this.pendingStart?50:conf.activateOnTypingDelay;if(this.debounceUpdate=cState.active.some(a=>a.isPending&&!this.running.some(q=>q.active.source==a.source))?setTimeout(()=>this.startUpdate(),delay):-1,0!=this.composing/* CompositionState.None */)for(let tr of update.transactions)tr.isUserEvent("input.type")?this.composing=2/* CompositionState.Changed */:2==this.composing/* CompositionState.Changed */&&tr.selection&&(this.composing=3/* CompositionState.ChangedAndMoved */)}}startUpdate(){this.debounceUpdate=-1,this.pendingStart=!1;let{state}=this.view,cState=state.field(completionState);for(let active of cState.active)active.isPending&&!this.running.some(r=>r.active.source==active.source)&&this.startQuery(active);this.running.length&&cState.open&&cState.open.disabled&&(this.debounceAccept=setTimeout(()=>this.accept(),this.view.state.facet(completionConfig).updateSyncTime))}startQuery(active){let{state}=this.view,pos=cur(state),context=new CompletionContext(state,pos,active.explicit,this.view),pending=new RunningQuery(active,context);this.running.push(pending),Promise.resolve(active.source(context)).then(result=>{pending.context.aborted||(pending.done=result||null,this.scheduleAccept())},err=>{this.view.dispatch({effects:closeCompletionEffect.of(null)}),view.logException(this.view.state,err)})}scheduleAccept(){this.running.every(q=>void 0!==q.done)?this.accept():0>this.debounceAccept&&(this.debounceAccept=setTimeout(()=>this.accept(),this.view.state.facet(completionConfig).updateSyncTime))}// For each finished query in this.running, try to create a result
// or, if appropriate, restart the query.
accept(){var _a;-1<this.debounceAccept&&clearTimeout(this.debounceAccept),this.debounceAccept=-1;let updated=[],conf=this.view.state.facet(completionConfig),cState=this.view.state.field(completionState);for(let query,i=0;i<this.running.length;i++){if(query=this.running[i],void 0===query.done)continue;if(this.running.splice(i--,1),query.done){let pos=cur(query.updates.length?query.updates[0].startState:this.view.state),limit=Math.min(pos,query.done.from+(query.active.explicit?0:1)),active=new ActiveResult(query.active.source,query.active.explicit,limit,query.done,query.done.from,null!==(_a=query.done.to)&&void 0!==_a?_a:pos);// Replay the transactions that happened since the start of
// the request and see if that preserves the result
for(let tr of query.updates)active=active.update(tr,conf);if(active.hasResult()){updated.push(active);continue}}let current=cState.active.find(a=>a.source==query.active.source);if(current&&current.isPending)if(null==query.done){// Explicitly failed. Should clear the pending status if it
// hasn't been re-set in the meantime.
let active=new ActiveSource(query.active.source,0/* State.Inactive */);for(let tr of query.updates)active=active.update(tr,conf);active.isPending||updated.push(active)}else// Cleared by subsequent transactions. Restart.
this.startQuery(current)}(updated.length||cState.open&&cState.open.disabled)&&this.view.dispatch({effects:setActiveEffect.of(updated)})}},{eventHandlers:{blur(event){let state=this.view.state.field(completionState,!1);if(state&&state.tooltip&&this.view.state.facet(completionConfig).closeOnBlur){let dialog=state.open&&view.getTooltip(this.view,state.open.tooltip);dialog&&dialog.dom.contains(event.relatedTarget)||setTimeout(()=>this.view.dispatch({effects:closeCompletionEffect.of(null)}),10)}},compositionstart(){this.composing=1/* CompositionState.Started */},compositionend(){3==this.composing/* CompositionState.ChangedAndMoved */&&setTimeout(()=>this.view.dispatch({effects:startCompletionEffect.of(!1)}),20),this.composing=0/* CompositionState.None */}}}),windows="object"==typeof navigator&&/Win/.test(navigator.platform),commitCharacters=state.Prec.highest(view.EditorView.domEventHandlers({keydown(event,view){let field=view.state.field(completionState,!1);if(!field||!field.open||field.open.disabled||0>field.open.selected||1<event.key.length||event.ctrlKey&&!(windows&&event.altKey)||event.metaKey)return!1;let option=field.open.options[field.open.selected],result=field.active.find(a=>a.source==option.source),commitChars=option.completion.commitCharacters||result.result.commitCharacters;return commitChars&&-1<commitChars.indexOf(event.key)&&applyCompletion(view,option),!1}})),baseTheme=view.EditorView.baseTheme({".cm-tooltip.cm-tooltip-autocomplete":{"& > ul":{fontFamily:"monospace",whiteSpace:"nowrap",overflow:"hidden auto",maxWidth_fallback:"700px",maxWidth:"min(700px, 95vw)",minWidth:"250px",maxHeight:"10em",height:"100%",listStyle:"none",margin:0,padding:0,"& > li, & > completion-section":{padding:"1px 3px",lineHeight:1.2},"& > li":{overflowX:"hidden",textOverflow:"ellipsis",cursor:"pointer"},"& > completion-section":{display:"list-item",borderBottom:"1px solid silver",paddingLeft:"0.5em",opacity:.7}}},"&light .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#17c",color:"white"},"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#777"},"&dark .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#347",color:"white"},"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#444"},".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after":{content:"\"\xB7\xB7\xB7\"",opacity:.5,display:"block",textAlign:"center",cursor:"pointer"},".cm-tooltip.cm-completionInfo":{position:"absolute",padding:"3px 9px",width:"max-content",maxWidth:`${400/* Info.Width */}px`,boxSizing:"border-box",whiteSpace:"pre-line"},".cm-completionInfo.cm-completionInfo-left":{right:"100%"},".cm-completionInfo.cm-completionInfo-right":{left:"100%"},".cm-completionInfo.cm-completionInfo-left-narrow":{right:`${30/* Info.Margin */}px`},".cm-completionInfo.cm-completionInfo-right-narrow":{left:`${30/* Info.Margin */}px`},"&light .cm-snippetField":{backgroundColor:"#00000022"},"&dark .cm-snippetField":{backgroundColor:"#ffffff22"},".cm-snippetFieldPosition":{verticalAlign:"text-top",width:0,height:"1.15em",display:"inline-block",margin:"0 -0.7px -.7em",borderLeft:"1.4px dotted #888"},".cm-completionMatchedText":{textDecoration:"underline"},".cm-completionDetail":{marginLeft:"0.5em",fontStyle:"italic"},".cm-completionIcon":{fontSize:"90%",width:".8em",display:"inline-block",textAlign:"center",paddingRight:".6em",opacity:"0.6",boxSizing:"content-box"},".cm-completionIcon-function, .cm-completionIcon-method":{"&:after":{content:"'\u0192'"}},".cm-completionIcon-class":{"&:after":{content:"'\u25CB'"}},".cm-completionIcon-interface":{"&:after":{content:"'\u25CC'"}},".cm-completionIcon-variable":{"&:after":{content:"'\uD835\uDC65'"}},".cm-completionIcon-constant":{"&:after":{content:"'\uD835\uDC36'"}},".cm-completionIcon-type":{"&:after":{content:"'\uD835\uDC61'"}},".cm-completionIcon-enum":{"&:after":{content:"'\u222A'"}},".cm-completionIcon-property":{"&:after":{content:"'\u25A1'"}},".cm-completionIcon-keyword":{"&:after":{content:"'\uD83D\uDD11\uFE0E'"}// Disable emoji rendering
},".cm-completionIcon-namespace":{"&:after":{content:"'\u25A2'"}},".cm-completionIcon-text":{"&:after":{content:"'abc'",fontSize:"50%",verticalAlign:"middle"}}});class FieldPos{constructor(field,line,from,to){this.field=field,this.line=line,this.from=from,this.to=to}}class FieldRange{constructor(field,from,to){this.field=field,this.from=from,this.to=to}map(changes){let from=changes.mapPos(this.from,-1,state.MapMode.TrackDel),to=changes.mapPos(this.to,1,state.MapMode.TrackDel);return null==from||null==to?null:new FieldRange(this.field,from,to)}}class Snippet{constructor(lines,fieldPositions){this.lines=lines,this.fieldPositions=fieldPositions}instantiate(state,pos){let text=[],lineStart=[pos],lineObj=state.doc.lineAt(pos),baseIndent=/^\s*/.exec(lineObj.text)[0];for(let line of this.lines){if(text.length){let indent=baseIndent,tabs=/^\t*/.exec(line)[0].length;for(let i=0;i<tabs;i++)indent+=state.facet(language.indentUnit);lineStart.push(pos+indent.length-tabs),line=indent+line.slice(tabs)}text.push(line),pos+=line.length+1}let ranges=this.fieldPositions.map(pos=>new FieldRange(pos.field,lineStart[pos.line]+pos.from,lineStart[pos.line]+pos.to));return{text,ranges}}static parse(template){let m,fields=[],lines=[],positions=[];for(let line of template.split(/\r\n?|\n/)){for(;m=/[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(line);){let seq=m[1]?+m[1]:null,rawName=m[2]||m[3]||"",found=-1,name=rawName.replace(/\\[{}]/g,m=>m[1]);for(let i=0;i<fields.length;i++)(null==seq?!!name&&fields[i].name==name:fields[i].seq==seq)&&(found=i);if(0>found){let i=0;for(;i<fields.length&&(null==seq||null!=fields[i].seq&&fields[i].seq<seq);)i++;fields.splice(i,0,{seq,name}),found=i;for(let pos of positions)pos.field>=found&&pos.field++}for(let pos of positions)if(pos.line==lines.length&&pos.from>m.index){let snip=m[2]?3+(m[1]||"").length:2;pos.from-=snip,pos.to-=snip}positions.push(new FieldPos(found,lines.length,m.index,m.index+name.length)),line=line.slice(0,m.index)+rawName+line.slice(m.index+m[0].length)}line=line.replace(/\\([{}])/g,(_,brace,index)=>{for(let pos of positions)pos.line==lines.length&&pos.from>index&&(pos.from--,pos.to--);return brace}),lines.push(line)}return new Snippet(lines,positions)}}let fieldMarker=view.Decoration.widget({widget:new class extends view.WidgetType{toDOM(){let span=document.createElement("span");return span.className="cm-snippetFieldPosition",span}ignoreEvent(){return!1}}}),fieldRange=view.Decoration.mark({class:"cm-snippetField"});class ActiveSnippet{constructor(ranges,active){this.ranges=ranges,this.active=active,this.deco=view.Decoration.set(ranges.map(r=>(r.from==r.to?fieldMarker:fieldRange).range(r.from,r.to)),!0)}map(changes){let ranges=[];for(let r of this.ranges){let mapped=r.map(changes);if(!mapped)return null;ranges.push(mapped)}return new ActiveSnippet(ranges,this.active)}selectionInsideField(sel){return sel.ranges.every(range=>this.ranges.some(r=>r.field==this.active&&r.from<=range.from&&r.to>=range.to))}}const setActive=state.StateEffect.define({map(value,changes){return value&&value.map(changes)}}),moveToField=state.StateEffect.define(),snippetState=state.StateField.define({create(){return null},update(value,tr){for(let effect of tr.effects){if(effect.is(setActive))return effect.value;if(effect.is(moveToField)&&value)return new ActiveSnippet(value.ranges,effect.value)}return value&&tr.docChanged&&(value=value.map(tr.changes)),value&&tr.selection&&!value.selectionInsideField(tr.selection)&&(value=null),value},provide:f=>view.EditorView.decorations.from(f,val=>val?val.deco:view.Decoration.none)}),clearSnippet=({state,dispatch})=>{let active=state.field(snippetState,!1);return!!active&&(dispatch(state.update({effects:setActive.of(null)})),!0)},nextSnippetField=moveField(1),prevSnippetField=moveField(-1),defaultSnippetKeymap=[{key:"Tab",run:nextSnippetField,shift:prevSnippetField},{key:"Escape",run:clearSnippet}],snippetKeymap=state.Facet.define({combine(maps){return maps.length?maps[0]:defaultSnippetKeymap}}),addSnippetKeymap=state.Prec.highest(view.keymap.compute([snippetKeymap],state=>state.facet(snippetKeymap))),snippetPointerHandler=view.EditorView.domEventHandlers({mousedown(event,view){let pos,active=view.state.field(snippetState,!1);if(!active||null==(pos=view.posAtCoords({x:event.clientX,y:event.clientY})))return!1;let match=active.ranges.find(r=>r.from<=pos&&r.to>=pos);return!!(match&&match.field!=active.active)&&(view.dispatch({selection:fieldSelection(active.ranges,match.field),effects:setActive.of(active.ranges.some(r=>r.field>match.field)?new ActiveSnippet(active.ranges,match.field):null),scrollIntoView:!0}),!0)}}),wordCaches=Object.create(null),completeAnyWord=context=>{var _a;let wordChars=null!==(_a=context.state.languageDataAt("wordChars",context.pos)[0])&&void 0!==_a?_a:"",re=wordRE(wordChars),token=context.matchBefore(mapRE(re,s=>s+"$"));if(!token&&!context.explicit)return null;let from=token?token.from:context.pos,options=collectWords(context.state.doc,wordCache(wordChars),re,5e4/* C.Range */,from);return{from,options,validFor:mapRE(re,s=>"^"+s)}},defaults={brackets:["(","[","{","'","\""],before:")]}:;>",stringPrefixes:[]},closeBracketEffect=state.StateEffect.define({map(value,mapping){let mapped=mapping.mapPos(value,-1,state.MapMode.TrackAfter);return null==mapped?void 0:mapped}}),closedBracket=new class extends state.RangeValue{};/**
	Move to the next snippet field, if available.
	*/ /**
	Move to the previous snippet field, if available.
	*/ /**
	A facet that can be used to configure the key bindings used by
	snippets. The default binds Tab to
	[`nextSnippetField`](https://codemirror.net/6/docs/ref/#autocomplete.nextSnippetField), Shift-Tab to
	[`prevSnippetField`](https://codemirror.net/6/docs/ref/#autocomplete.prevSnippetField), and Escape
	to [`clearSnippet`](https://codemirror.net/6/docs/ref/#autocomplete.clearSnippet).
	*/closedBracket.startSide=1,closedBracket.endSide=-1;const bracketState=state.StateField.define({create(){return state.RangeSet.empty},update(value,tr){if(value=value.map(tr.changes),tr.selection){let line=tr.state.doc.lineAt(tr.selection.main.head);value=value.update({filter:from=>from>=line.from&&from<=line.to})}for(let effect of tr.effects)effect.is(closeBracketEffect)&&(value=value.update({add:[closedBracket.range(effect.value,effect.value+1)]}));return value}}),definedClosing="()[]{}<>\xAB\xBB\xBB\xAB\uFF3B\uFF3D\uFF5B\uFF5D",android="object"==typeof navigator&&/Android\b/.test(navigator.userAgent),inputHandler=view.EditorView.inputHandler.of((view,from,to,insert)=>{if((android?view.composing:view.compositionStarted)||view.state.readOnly)return!1;let sel=view.state.selection.main;if(2<insert.length||2==insert.length&&1==state.codePointSize(state.codePointAt(insert,0))||from!=sel.from||to!=sel.to)return!1;let tr=insertBracket(view.state,insert);return!!tr&&(view.dispatch(tr),!0)}),deleteBracketPair=({state:state$1,dispatch})=>{if(state$1.readOnly)return!1;let conf=config(state$1,state$1.selection.main.head),tokens=conf.brackets||defaults.brackets,dont=null,changes=state$1.changeByRange(range=>{if(range.empty){let before=prevChar(state$1.doc,range.head);for(let token of tokens)if(token==before&&nextChar(state$1.doc,range.head)==closing(state.codePointAt(token,0)))return{changes:{from:range.head-token.length,to:range.head+token.length},range:state.EditorSelection.cursor(range.head-token.length)}}return{range:dont=range}});return dont||dispatch(state$1.update(changes,{scrollIntoView:!0,userEvent:"delete.backward"})),!dont},closeBracketsKeymap=[{key:"Backspace",run:deleteBracketPair}],completionKeymap=[{key:"Ctrl-Space",run:startCompletion},{mac:"Alt-`",run:startCompletion},{mac:"Alt-i",run:startCompletion},{key:"Escape",run:closeCompletion},{key:"ArrowDown",run:moveCompletionSelection(!0)},{key:"ArrowUp",run:moveCompletionSelection(!1)},{key:"PageDown",run:moveCompletionSelection(!0,"page")},{key:"PageUp",run:moveCompletionSelection(!1,"page")},{key:"Enter",run:acceptCompletion}],completionKeymapExt=state.Prec.highest(view.keymap.computeN([completionConfig],state=>state.facet(completionConfig).defaultKeymap?[completionKeymap]:[])),completionArrayCache=new WeakMap;/**
	Command that implements deleting a pair of matching brackets when
	the cursor is between them.
	*/ /**
	Close-brackets related key bindings. Binds Backspace to
	[`deleteBracketPair`](https://codemirror.net/6/docs/ref/#autocomplete.deleteBracketPair).
	*/return dist.CompletionContext=CompletionContext,dist.acceptCompletion=acceptCompletion,dist.autocompletion=autocompletion,dist.clearSnippet=clearSnippet,dist.closeBrackets=closeBrackets,dist.closeBracketsKeymap=closeBracketsKeymap,dist.closeCompletion=closeCompletion,dist.completeAnyWord=completeAnyWord,dist.completeFromList=completeFromList,dist.completionKeymap=completionKeymap,dist.completionStatus=completionStatus,dist.currentCompletions=currentCompletions,dist.deleteBracketPair=deleteBracketPair,dist.hasNextSnippetField=hasNextSnippetField,dist.hasPrevSnippetField=hasPrevSnippetField,dist.ifIn=ifIn,dist.ifNotIn=ifNotIn,dist.insertBracket=insertBracket,dist.insertCompletionText=insertCompletionText,dist.moveCompletionSelection=moveCompletionSelection,dist.nextSnippetField=nextSnippetField,dist.pickedCompletion=pickedCompletion,dist.prevSnippetField=prevSnippetField,dist.selectedCompletion=selectedCompletion,dist.selectedCompletionIndex=selectedCompletionIndex,dist.setSelectedCompletion=setSelectedCompletion,dist.snippet=snippet,dist.snippetCompletion=snippetCompletion,dist.snippetKeymap=snippetKeymap,dist.startCompletion=startCompletion,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__codemirror_search(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/view"),require$$1=await requireAsyncModule("@codemirror/state"),require$$2=await requireAsyncModule("crelt"),dist={},distExports=function requireDist(){function validRegExp(source){try{return new RegExp(source,baseFlags),!0}catch(_a){return!1}}function toCharEnd(text,pos){if(pos>=text.length)return pos;for(let next,line=text.lineAt(pos);pos<line.to&&56320<=(next=line.text.charCodeAt(pos-line.from))&&57344>next;)pos++;return pos}/**
	Command that shows a dialog asking the user for a line number, and
	when a valid position is provided, moves the cursor to that line.

	Supports line numbers, relative line offsets prefixed with `+` or
	`-`, document percentages suffixed with `%`, and an optional
	column position by adding `:` and a second number after the line
	number.
	*/ /**
	This extension highlights text that matches the selection. It uses
	the `"cm-selectionMatch"` class for the highlighting. When
	`highlightWordAroundCursor` is enabled, the word at the cursor
	itself will be highlighted with `"cm-selectionMatch-main"`.
	*/function highlightSelectionMatches(options){let ext=[defaultTheme,matchHighlighter];return options&&ext.push(highlightConfig.of(options)),ext}// Whether the characters directly outside the given positions are non-word characters
function insideWordBoundaries(check,state$1,from,to){return(0==from||check(state$1.sliceDoc(from-1,from))!=state.CharCategory.Word)&&(to==state$1.doc.length||check(state$1.sliceDoc(to,to+1))!=state.CharCategory.Word)}// Whether the characters directly at the given positions are word characters
function insideWord(check,state$1,from,to){return check(state$1.sliceDoc(from,from+1))==state.CharCategory.Word&&check(state$1.sliceDoc(to-1,to))==state.CharCategory.Word}// Find next occurrence of query relative to last cursor. Wrap around
// the document if there are no more matches.
function findNextOccurrence(state,query){let{main,ranges}=state.selection,word=state.wordAt(main.head),fullWord=word&&word.from==main.from&&word.to==main.to;for(let cycled=!1,cursor=new SearchCursor(state.doc,query,ranges[ranges.length-1].to);;)if(cursor.next(),cursor.done){if(cycled)return null;cursor=new SearchCursor(state.doc,query,0,Math.max(0,ranges[ranges.length-1].from-1)),cycled=!0}else{if(cycled&&ranges.some(r=>r.from==cursor.value.from))continue;if(fullWord){let word=state.wordAt(cursor.value.from);if(!word||word.from!=cursor.value.from||word.to!=cursor.value.to)continue}return cursor.value}}/**
	Select next occurrence of the current selection. Expand selection
	to the surrounding word when the selection is empty.
	*/ /**
	Add search state to the editor configuration, and optionally
	configure the search extension.
	([`openSearchPanel`](https://codemirror.net/6/docs/ref/#search.openSearchPanel) will automatically
	enable this if it isn't already on).
	*/function search(config){return config?[searchConfigFacet.of(config),searchExtensions]:searchExtensions}/**
	A search query. Part of the editor's search state.
	*/function wrapStringTest(test,state,inner){return(from,to,buffer,bufferPos)=>{if(inner&&!inner(from,to,buffer,bufferPos))return!1;let match=from>=bufferPos&&to<=bufferPos+buffer.length?buffer.slice(from-bufferPos,to-bufferPos):state.doc.sliceString(from,to);return test(match,state,from,to)}}function stringCursor(spec,state,from,to){let test;return spec.wholeWord&&(test=stringWordTest(state.doc,state.charCategorizer(state.selection.main.head))),spec.test&&(test=wrapStringTest(spec.test,state,test)),new SearchCursor(state.doc,spec.unquoted,from,to,spec.caseSensitive?void 0:x=>x.toLowerCase(),test)}function stringWordTest(doc,categorizer){return(from,to,buf,bufPos)=>((bufPos>from||bufPos+buf.length<to)&&(bufPos=Math.max(0,from-2),buf=doc.sliceString(bufPos,Math.min(doc.length,to+2))),(categorizer(charBefore(buf,from-bufPos))!=state.CharCategory.Word||categorizer(charAfter(buf,from-bufPos))!=state.CharCategory.Word)&&(categorizer(charAfter(buf,to-bufPos))!=state.CharCategory.Word||categorizer(charBefore(buf,to-bufPos))!=state.CharCategory.Word))}function wrapRegexpTest(test,state,inner){return(from,to,match)=>(!inner||inner(from,to,match))&&test(match[0],state,from,to)}function regexpCursor(spec,state,from,to){let test;return spec.wholeWord&&(test=regexpWordTest(state.charCategorizer(state.selection.main.head))),spec.test&&(test=wrapRegexpTest(spec.test,state,test)),new RegExpCursor(state.doc,spec.search,{ignoreCase:!spec.caseSensitive,test},from,to)}function charBefore(str,index){return str.slice(state.findClusterBreak(str,index,!1),index)}function charAfter(str,index){return str.slice(index,state.findClusterBreak(str,index))}function regexpWordTest(categorizer){return(_from,_to,match)=>!match[0].length||(categorizer(charBefore(match.input,match.index))!=state.CharCategory.Word||categorizer(charAfter(match.input,match.index))!=state.CharCategory.Word)&&(categorizer(charAfter(match.input,match.index+match[0].length))!=state.CharCategory.Word||categorizer(charBefore(match.input,match.index+match[0].length))!=state.CharCategory.Word)}/**
	Get the current search query from an editor state.
	*/function getSearchQuery(state){let curState=state.field(searchState,!1);return curState?curState.query.spec:defaultQuery(state)}/**
	Query whether the search panel is open in the given editor state.
	*/function searchPanelOpen(state){var _a;return null!=(null===(_a=state.field(searchState,!1))||void 0===_a?void 0:_a.panel)}function searchCommand(f){return view=>{let state=view.state.field(searchState,!1);return state&&state.query.spec.valid?f(view,state):openSearchPanel(view)}}/**
	Open the search panel if it isn't already open, and move the
	selection to the first match after the current main selection.
	Will wrap around to the start of the document when it reaches the
	end.
	*/function createSearchPanel(view){return view.state.facet(searchConfigFacet).createPanel(view)}function defaultQuery(state,fallback){var _a,_b,_c,_d,_e;let sel=state.selection.main,selText=sel.empty||sel.to>sel.from+100?"":state.sliceDoc(sel.from,sel.to);if(fallback&&!selText)return fallback;let config=state.facet(searchConfigFacet);return new SearchQuery({search:(null!==(_a=null===fallback||void 0===fallback?void 0:fallback.literal)&&void 0!==_a?_a:config.literal)?selText:selText.replace(/\n/g,"\\n"),caseSensitive:null!==(_b=null===fallback||void 0===fallback?void 0:fallback.caseSensitive)&&void 0!==_b?_b:config.caseSensitive,literal:null!==(_c=null===fallback||void 0===fallback?void 0:fallback.literal)&&void 0!==_c?_c:config.literal,regexp:null!==(_d=null===fallback||void 0===fallback?void 0:fallback.regexp)&&void 0!==_d?_d:config.regexp,wholeWord:null!==(_e=null===fallback||void 0===fallback?void 0:fallback.wholeWord)&&void 0!==_e?_e:config.wholeWord})}function getSearchInput(view$1){let panel=view.getPanel(view$1,createSearchPanel);return panel&&panel.dom.querySelector("[main-field]")}function selectSearchInput(view){let input=getSearchInput(view);input&&input==view.root.activeElement&&input.select()}/**
	Make sure the search panel is open and focused.
	*/function phrase(view,phrase){return view.state.phrase(phrase)}function announceMatch(view$1,{from,to}){let line=view$1.state.doc.lineAt(from),lineEnd=view$1.state.doc.lineAt(to).to,start=Math.max(line.from,from-AnnounceMargin),end=Math.min(lineEnd,to+AnnounceMargin),text=view$1.state.sliceDoc(start,end);if(start!=line.from)for(let i=0;i<AnnounceMargin;i++)if(!Break.test(text[i+1])&&Break.test(text[i])){text=text.slice(i);break}if(end!=lineEnd)for(let i=text.length-1;i>text.length-AnnounceMargin;i--)if(!Break.test(text[i-1])&&Break.test(text[i])){text=text.slice(0,i);break}return view.EditorView.announce.of(`${view$1.state.phrase("current match")}. ${text} ${view$1.state.phrase("on line")} ${line.number}.`)}if(hasRequiredDist)return dist;hasRequiredDist=1;var view=require$$0,state=require$$1,elt=require$$2;const basicNormalize="function"==typeof String.prototype.normalize?x=>x.normalize("NFKD"):x=>x;/**
	A search cursor provides an iterator over text matches in a
	document.
	*/class SearchCursor{/**
	    Create a text cursor. The query is the search string, `from` to
	    `to` provides the region to search.
	    
	    When `normalize` is given, it will be called, on both the query
	    string and the content it is matched against, before comparing.
	    You can, for example, create a case-insensitive search by
	    passing `s => s.toLowerCase()`.
	    
	    Text is always normalized with
	    [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
	    (when supported).
	    */constructor(text,query,from=0,to=text.length,normalize,test){this.test=test,this.value={from:0,to:0,precise:!1},this.done=!1,this.matches=[],this.buffer="",this.bufferPos=0,this.iter=text.iterRange(from,to),this.bufferStart=from,this.normalize=normalize?x=>normalize(basicNormalize(x)):basicNormalize,this.query=this.normalize(query)}peek(){if(this.bufferPos==this.buffer.length){if(this.bufferStart+=this.buffer.length,this.iter.next(),this.iter.done)return-1;this.bufferPos=0,this.buffer=this.iter.value}return state.codePointAt(this.buffer,this.bufferPos)}/**
	    Look for the next match. Updates the iterator's
	    [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
	    [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
	    at least once before using the cursor.
	    */next(){for(;this.matches.length;)this.matches.pop();return this.nextOverlapping()}/**
	    The `next` method will ignore matches that partially overlap a
	    previous match. This method behaves like `next`, but includes
	    such matches.
	    */nextOverlapping(){for(;;){let next=this.peek();if(0>next)return this.done=!0,this;let str=state.fromCodePoint(next),start=this.bufferStart+this.bufferPos;this.bufferPos+=state.codePointSize(next);let norm=this.normalize(str);if(norm.length)for(let i=0,pos=start,posPrecise=!0;;i++){let code=norm.charCodeAt(i),match=this.match(code,pos,posPrecise,this.bufferPos+this.bufferStart,i==norm.length-1);if(match)return this.value=match,this;if(i==norm.length-1)break;posPrecise&&i<str.length&&str.charCodeAt(i)==code?pos++:posPrecise=!1}}}match(code,pos,posPrecise,end,endPrecise){let match=null;for(let i=0;i<this.matches.length;){let partial=this.matches[i],keep=!1;this.query.charCodeAt(partial.index)==code&&(partial.index==this.query.length-1?match={from:partial.from,to:end,precise:endPrecise&&partial.precise}:(partial.index++,keep=!0)),keep?i++:this.matches.splice(i,1)}return this.query.charCodeAt(0)==code&&(1==this.query.length?match={from:pos,to:end,precise:posPrecise&&endPrecise}:this.matches.push({from:pos,index:1,precise:posPrecise})),match&&this.test&&!this.test(match.from,match.to,this.buffer,this.bufferStart)&&(match=null),match}}"undefined"!=typeof Symbol&&(SearchCursor.prototype[Symbol.iterator]=function(){return this});const empty={from:-1,to:-1,match:/.*/.exec(""),precise:!0},baseFlags="gm"+(null==/x/.unicode?"":"u");/**
	This class is similar to [`SearchCursor`](https://codemirror.net/6/docs/ref/#search.SearchCursor)
	but searches for a regular expression pattern instead of a plain
	string.
	*/class RegExpCursor{/**
	    Create a cursor that will search the given range in the given
	    document. `query` should be the raw pattern (as you'd pass it to
	    `new RegExp`).
	    */constructor(text,query,options,from=0,to=text.length){if(this.text=text,this.to=to,this.curLine="",this.done=!1,this.value=empty,/\\[sWDnr]|\n|\r|\[\^/.test(query))return new MultilineRegExpCursor(text,query,options,from,to);this.re=new RegExp(query,baseFlags+((null===options||void 0===options?void 0:options.ignoreCase)?"i":"")),this.test=null===options||void 0===options?void 0:options.test,this.iter=text.iter();let startLine=text.lineAt(from);this.curLineStart=startLine.from,this.matchPos=toCharEnd(text,from),this.getLine(this.curLineStart)}getLine(skip){this.iter.next(skip),this.iter.lineBreak?this.curLine="":(this.curLine=this.iter.value,this.curLineStart+this.curLine.length>this.to&&(this.curLine=this.curLine.slice(0,this.to-this.curLineStart)),this.iter.next())}nextLine(){this.curLineStart=this.curLineStart+this.curLine.length+1,this.curLineStart>this.to?this.curLine="":this.getLine(0)}/**
	    Move to the next match, if there is one.
	    */next(){for(let off=this.matchPos-this.curLineStart;;){this.re.lastIndex=off;let match=this.matchPos<=this.to&&this.re.exec(this.curLine);if(match){let from=this.curLineStart+match.index,to=from+match[0].length;if(this.matchPos=toCharEnd(this.text,to+(from==to?1:0)),from==this.curLineStart+this.curLine.length&&this.nextLine(),(from<to||from>this.value.to)&&(!this.test||this.test(from,to,match)))return this.value={from,to,precise:!0,match},this;off=this.matchPos-this.curLineStart}else if(this.curLineStart+this.curLine.length<this.to)this.nextLine(),off=0;else return this.done=!0,this}}}const flattened=new WeakMap;// Reusable (partially) flattened document strings
class FlattenedDoc{constructor(from,text){this.from=from,this.text=text}get to(){return this.from+this.text.length}static get(doc,from,to){let cached=flattened.get(doc);if(!cached||cached.from>=to||cached.to<=from){let flat=new FlattenedDoc(from,doc.sliceString(from,to));return flattened.set(doc,flat),flat}if(cached.from==from&&cached.to==to)return cached;let{text,from:cachedFrom}=cached;return cachedFrom>from&&(text=doc.sliceString(from,cachedFrom)+text,cachedFrom=from),cached.to<to&&(text+=doc.sliceString(cached.to,to)),flattened.set(doc,new FlattenedDoc(cachedFrom,text)),new FlattenedDoc(from,text.slice(from-cachedFrom,to-cachedFrom))}}class MultilineRegExpCursor{constructor(text,query,options,from,to){this.text=text,this.to=to,this.done=!1,this.value=empty,this.matchPos=toCharEnd(text,from),this.re=new RegExp(query,baseFlags+((null===options||void 0===options?void 0:options.ignoreCase)?"i":"")),this.test=null===options||void 0===options?void 0:options.test,this.flat=FlattenedDoc.get(text,from,this.chunkEnd(from+5e3/* Chunk.Base */))}chunkEnd(pos){return pos>=this.to?this.to:this.text.lineAt(pos).to}next(){for(;;){let off=this.re.lastIndex=this.matchPos-this.flat.from,match=this.re.exec(this.flat.text);// Skip empty matches directly after the last match
if(match&&!match[0]&&match.index==off&&(this.re.lastIndex=off+1,match=this.re.exec(this.flat.text)),match){let from=this.flat.from+match.index,to=from+match[0].length;// If a match goes almost to the end of a noncomplete chunk, try
// again, since it'll likely be able to match more
if((this.flat.to>=this.to||match.index+match[0].length<=this.flat.text.length-10)&&(!this.test||this.test(from,to,match)))return this.value={from,to,precise:!0,match},this.matchPos=toCharEnd(this.text,to+(from==to?1:0)),this}if(this.flat.to==this.to)return this.done=!0,this;// Grow the flattened doc
this.flat=FlattenedDoc.get(this.text,this.flat.from,this.chunkEnd(this.flat.from+2*this.flat.text.length))}}}"undefined"!=typeof Symbol&&(RegExpCursor.prototype[Symbol.iterator]=MultilineRegExpCursor.prototype[Symbol.iterator]=function(){return this});const gotoLine=view$1=>{let{state:state$1}=view$1,line=state$1.doc.lineAt(view$1.state.selection.main.head).number+"",{close,result}=view.showDialog(view$1,{label:state$1.phrase("Go to line"),input:{type:"text",name:"line",value:line},focus:!0,submitLabel:state$1.phrase("go")});return result.then(form=>{let match=form&&/^([+-])?(\d+)?(:\d+)?(%)?$/.exec(form.elements.line.value);if(!match)return void view$1.dispatch({effects:close});let startLine=state$1.doc.lineAt(state$1.selection.main.head),[,sign,ln,cl,percent]=match,col=cl?+cl.slice(1):0,line=ln?+ln:startLine.number;if(ln&&percent){let pc=line/100;sign&&(pc=pc*("-"==sign?-1:1)+startLine.number/state$1.doc.lines),line=Math.round(state$1.doc.lines*pc)}else ln&&sign&&(line=line*("-"==sign?-1:1)+startLine.number);let docLine=state$1.doc.line(Math.max(1,Math.min(state$1.doc.lines,line))),selection=state.EditorSelection.cursor(docLine.from+Math.max(0,Math.min(col,docLine.length)));view$1.dispatch({effects:[close,view.EditorView.scrollIntoView(selection.from,{y:"center"})],selection})}),!0},defaultHighlightOptions={highlightWordAroundCursor:!1,minSelectionLength:1,maxMatches:100,wholeWords:!1},highlightConfig=state.Facet.define({combine(options){return state.combineConfig(options,defaultHighlightOptions,{highlightWordAroundCursor:(a,b)=>a||b,minSelectionLength:Math.min,maxMatches:Math.min})}}),matchDeco=view.Decoration.mark({class:"cm-selectionMatch"}),mainMatchDeco=view.Decoration.mark({class:"cm-selectionMatch cm-selectionMatch-main"}),matchHighlighter=view.ViewPlugin.fromClass(class{constructor(view){this.decorations=this.getDeco(view)}update(update){(update.selectionSet||update.docChanged||update.viewportChanged)&&(this.decorations=this.getDeco(update.view))}getDeco(view$1){let conf=view$1.state.facet(highlightConfig),{state}=view$1,sel=state.selection;if(1<sel.ranges.length)return view.Decoration.none;let query,range=sel.main,check=null;if(range.empty){if(!conf.highlightWordAroundCursor)return view.Decoration.none;let word=state.wordAt(range.head);if(!word)return view.Decoration.none;check=state.charCategorizer(range.head),query=state.sliceDoc(word.from,word.to)}else{let len=range.to-range.from;if(len<conf.minSelectionLength||200<len)return view.Decoration.none;if(conf.wholeWords){if(query=state.sliceDoc(range.from,range.to),check=state.charCategorizer(range.head),!(insideWordBoundaries(check,state,range.from,range.to)&&insideWord(check,state,range.from,range.to)))return view.Decoration.none;}else if(query=state.sliceDoc(range.from,range.to),!query)return view.Decoration.none}let deco=[];for(let part of view$1.visibleRanges)for(let cursor=new SearchCursor(state.doc,query,part.from,part.to);!cursor.next().done;){let{from,to}=cursor.value;if((!check||insideWordBoundaries(check,state,from,to))&&(range.empty&&from<=range.from&&to>=range.to?deco.push(mainMatchDeco.range(from,to)):(from>=range.to||to<=range.from)&&deco.push(matchDeco.range(from,to)),deco.length>conf.maxMatches))return view.Decoration.none}return view.Decoration.set(deco)}},{decorations:v=>v.decorations}),defaultTheme=view.EditorView.baseTheme({".cm-selectionMatch":{backgroundColor:"#99ff7780"},".cm-searchMatch .cm-selectionMatch":{backgroundColor:"transparent"}}),selectWord=({state:state$1,dispatch})=>{let{selection}=state$1,newSel=state.EditorSelection.create(selection.ranges.map(range=>state$1.wordAt(range.head)||state.EditorSelection.cursor(range.head)),selection.mainIndex);return!newSel.eq(selection)&&(dispatch(state$1.update({selection:newSel})),!0)},selectNextOccurrence=({state:state$1,dispatch})=>{let{ranges}=state$1.selection;if(ranges.some(sel=>sel.from===sel.to))return selectWord({state:state$1,dispatch});let searchedText=state$1.sliceDoc(ranges[0].from,ranges[0].to);if(state$1.selection.ranges.some(r=>state$1.sliceDoc(r.from,r.to)!=searchedText))return!1;let range=findNextOccurrence(state$1,searchedText);return!!range&&(dispatch(state$1.update({selection:state$1.selection.addRange(state.EditorSelection.range(range.from,range.to),!1),effects:view.EditorView.scrollIntoView(range.to)})),!0)},searchConfigFacet=state.Facet.define({combine(configs){return state.combineConfig(configs,{top:!1,caseSensitive:!1,literal:!1,regexp:!1,wholeWord:!1,createPanel:view=>new SearchPanel(view),scrollToMatch:range=>view.EditorView.scrollIntoView(range)})}});// Select the words around the cursors.
class SearchQuery{/**
	    Create a query object.
	    */constructor(config){this.search=config.search,this.caseSensitive=!!config.caseSensitive,this.literal=!!config.literal,this.regexp=!!config.regexp,this.replace=config.replace||"",this.valid=!!this.search&&(!this.regexp||validRegExp(this.search)),this.unquoted=this.unquote(this.search),this.wholeWord=!!config.wholeWord,this.test=config.test}/**
	    @internal
	    */unquote(text){return this.literal?text:text.replace(/\\([nrt\\])/g,(_,ch)=>"n"==ch?"\n":"r"==ch?"\r":"t"==ch?"\t":"\\")}/**
	    Compare this query to another query.
	    */eq(other){return this.search==other.search&&this.replace==other.replace&&this.caseSensitive==other.caseSensitive&&this.regexp==other.regexp&&this.wholeWord==other.wholeWord&&this.test==other.test}/**
	    @internal
	    */create(){return this.regexp?new RegExpQuery(this):new StringQuery(this)}/**
	    Get a search cursor for this query, searching through the given
	    range in the given state.
	    */getCursor(state$1,from=0,to){let st=state$1.doc?state$1:state.EditorState.create({doc:state$1});return null==to&&(to=st.doc.length),this.regexp?regexpCursor(this,st,from,to):stringCursor(this,st,from,to)}}class QueryType{constructor(spec){this.spec=spec}}class StringQuery extends QueryType{constructor(spec){super(spec)}nextMatch(state,curFrom,curTo){let cursor=stringCursor(this.spec,state,curTo,state.doc.length).nextOverlapping();if(cursor.done){let end=Math.min(state.doc.length,curFrom+this.spec.unquoted.length);cursor=stringCursor(this.spec,state,0,end).nextOverlapping()}return cursor.done||cursor.value.from==curFrom&&cursor.value.to==curTo?null:cursor.value}// Searching in reverse is, rather than implementing an inverted search
// cursor, done by scanning chunk after chunk forward.
prevMatchInRange(state,from,to){for(let pos=to;;){let start=Math.max(from,pos-1e4/* FindPrev.ChunkSize */-this.spec.unquoted.length),cursor=stringCursor(this.spec,state,start,pos),range=null;for(;!cursor.nextOverlapping().done;)range=cursor.value;if(range)return range;if(start==from)return null;pos-=1e4/* FindPrev.ChunkSize */}}prevMatch(state,curFrom,curTo){let found=this.prevMatchInRange(state,0,curFrom);return found||(found=this.prevMatchInRange(state,Math.max(0,curTo-this.spec.unquoted.length),state.doc.length)),found&&(found.from!=curFrom||found.to!=curTo)?found:null}getReplacement(_result){return this.spec.unquote(this.spec.replace)}matchAll(state,limit){let cursor=stringCursor(this.spec,state,0,state.doc.length),ranges=[];for(;!cursor.next().done;){if(ranges.length>=limit)return null;ranges.push(cursor.value)}return ranges}highlight(state,from,to,add){for(let cursor=stringCursor(this.spec,state,Math.max(0,from-this.spec.unquoted.length),Math.min(to+this.spec.unquoted.length,state.doc.length));!cursor.next().done;)add(cursor.value.from,cursor.value.to)}}class RegExpQuery extends QueryType{nextMatch(state,curFrom,curTo){let cursor=regexpCursor(this.spec,state,curTo,state.doc.length).next();return cursor.done&&(cursor=regexpCursor(this.spec,state,0,curFrom).next()),cursor.done?null:cursor.value}prevMatchInRange(state,from,to){for(let size=1;;size++){let start=Math.max(from,to-1e4*size/* FindPrev.ChunkSize */),cursor=regexpCursor(this.spec,state,start,to),range=null;for(;!cursor.next().done;)range=cursor.value;if(range&&(start==from||range.from>start+10))return range;if(start==from)return null}}prevMatch(state,curFrom,curTo){return this.prevMatchInRange(state,0,curFrom)||this.prevMatchInRange(state,curTo,state.doc.length)}getReplacement(result){return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g,(m,i)=>{if("&"==i)return result.match[0];if("$"==i)return"$";for(let n,l=i.length;0<l;l--)if(n=+i.slice(0,l),0<n&&n<result.match.length)return result.match[n]+i.slice(l);return m})}matchAll(state,limit){let cursor=regexpCursor(this.spec,state,0,state.doc.length),ranges=[];for(;!cursor.next().done;){if(ranges.length>=limit)return null;ranges.push(cursor.value)}return ranges}highlight(state,from,to,add){for(let cursor=regexpCursor(this.spec,state,Math.max(0,from-250/* RegExp.HighlightMargin */),Math.min(to+250/* RegExp.HighlightMargin */,state.doc.length));!cursor.next().done;)add(cursor.value.from,cursor.value.to)}}/**
	A state effect that updates the current search query. Note that
	this only has an effect if the search state has been initialized
	(by including [`search`](https://codemirror.net/6/docs/ref/#search.search) in your configuration or
	by running [`openSearchPanel`](https://codemirror.net/6/docs/ref/#search.openSearchPanel) at least
	once).
	*/const setSearchQuery=state.StateEffect.define(),togglePanel=state.StateEffect.define(),searchState=state.StateField.define({create(state){return new SearchState(defaultQuery(state).create(),null)},update(value,tr){for(let effect of tr.effects)effect.is(setSearchQuery)?value=new SearchState(effect.value.create(),value.panel):effect.is(togglePanel)&&(value=new SearchState(value.query,effect.value?createSearchPanel:null));return value},provide:f=>view.showPanel.from(f,val=>val.panel)});class SearchState{constructor(query,panel){this.query=query,this.panel=panel}}const matchMark=view.Decoration.mark({class:"cm-searchMatch"}),selectedMatchMark=view.Decoration.mark({class:"cm-searchMatch cm-searchMatch-selected"}),searchHighlighter=view.ViewPlugin.fromClass(class{constructor(view){this.view=view,this.decorations=this.highlight(view.state.field(searchState))}update(update){let state=update.state.field(searchState);(state!=update.startState.field(searchState)||update.docChanged||update.selectionSet||update.viewportChanged)&&(this.decorations=this.highlight(state))}highlight({query,panel}){if(!panel||!query.spec.valid)return view.Decoration.none;let{view:view$1}=this,builder=new state.RangeSetBuilder;for(let i=0,ranges=view$1.visibleRanges,l=ranges.length;i<l;i++){let{from,to}=ranges[i];for(;i<l-1&&to>ranges[i+1].from-500/* RegExp.HighlightMargin */;)to=ranges[++i].to;query.highlight(view$1.state,from,to,(from,to)=>{let selected=view$1.state.selection.ranges.some(r=>r.from==from&&r.to==to);builder.add(from,to,selected?selectedMatchMark:matchMark)})}return builder.finish()}},{decorations:v=>v.decorations}),findNext=searchCommand((view,{query})=>{let{to}=view.state.selection.main,next=query.nextMatch(view.state,to,to);if(!next)return!1;let selection=state.EditorSelection.single(next.from,next.to),config=view.state.facet(searchConfigFacet);return view.dispatch({selection,effects:[announceMatch(view,next),config.scrollToMatch(selection.main,view)],userEvent:"select.search"}),selectSearchInput(view),!0}),findPrevious=searchCommand((view,{query})=>{let{state:state$1}=view,{from}=state$1.selection.main,prev=query.prevMatch(state$1,from,from);if(!prev)return!1;let selection=state.EditorSelection.single(prev.from,prev.to),config=view.state.facet(searchConfigFacet);return view.dispatch({selection,effects:[announceMatch(view,prev),config.scrollToMatch(selection.main,view)],userEvent:"select.search"}),selectSearchInput(view),!0}),selectMatches=searchCommand((view,{query})=>{let ranges=query.matchAll(view.state,1e3);return!!(ranges&&ranges.length)&&(view.dispatch({selection:state.EditorSelection.create(ranges.map(r=>state.EditorSelection.range(r.from,r.to))),userEvent:"select.search.matches"}),!0)}),selectSelectionMatches=({state:state$1,dispatch})=>{let sel=state$1.selection;if(1<sel.ranges.length||sel.main.empty)return!1;let{from,to}=sel.main,ranges=[],main=0;for(let cur=new SearchCursor(state$1.doc,state$1.sliceDoc(from,to));!cur.next().done;){if(1e3<ranges.length)return!1;cur.value.from==from&&(main=ranges.length),ranges.push(state.EditorSelection.range(cur.value.from,cur.value.to))}return dispatch(state$1.update({selection:state.EditorSelection.create(ranges,main),userEvent:"select.search.matches"})),!0},replaceNext=searchCommand((view$1,{query})=>{let{state:state$1}=view$1,{from,to}=state$1.selection.main;if(state$1.readOnly)return!1;let match=query.nextMatch(state$1,from,from);if(!match)return!1;let selection,replacement,next=match,changes=[],effects=[];next.precise?next.from==from&&next.to==to&&(replacement=state$1.toText(query.getReplacement(next)),changes.push({from:next.from,to:next.to,insert:replacement}),effects.push(view.EditorView.announce.of(state$1.phrase("replaced match on line $",state$1.doc.lineAt(from).number)+"."))):next=query.nextMatch(state$1,next.from,next.to);let changeSet=view$1.state.changes(changes);return next&&(selection=state.EditorSelection.single(next.from,next.to).map(changeSet),effects.push(announceMatch(view$1,next)),effects.push(state$1.facet(searchConfigFacet).scrollToMatch(selection.main,view$1))),view$1.dispatch({changes:changeSet,selection,effects,userEvent:"input.replace"}),!0}),replaceAll=searchCommand((view$1,{query})=>{if(view$1.state.readOnly)return!1;let changes=[];for(let match of query.matchAll(view$1.state,1e9)){let{from,to,precise}=match;precise&&changes.push({from,to,insert:query.getReplacement(match)})}if(!changes.length)return!1;let announceText=view$1.state.phrase("replaced $ matches",changes.length)+".";return view$1.dispatch({changes,effects:view.EditorView.announce.of(announceText),userEvent:"input.replace.all"}),!0}),openSearchPanel=view=>{let state$1=view.state.field(searchState,!1);if(state$1&&state$1.panel){let searchInput=getSearchInput(view);if(searchInput&&searchInput!=view.root.activeElement){let query=defaultQuery(view.state,state$1.query.spec);query.valid&&view.dispatch({effects:setSearchQuery.of(query)}),searchInput.focus(),searchInput.select()}}else view.dispatch({effects:[togglePanel.of(!0),state$1?setSearchQuery.of(defaultQuery(view.state,state$1.query.spec)):state.StateEffect.appendConfig.of(searchExtensions)]});return!0},closeSearchPanel=view$1=>{let state=view$1.state.field(searchState,!1);if(!state||!state.panel)return!1;let panel=view.getPanel(view$1,createSearchPanel);return panel&&panel.dom.contains(view$1.root.activeElement)&&view$1.focus(),view$1.dispatch({effects:togglePanel.of(!1)}),!0},searchKeymap=[{key:"Mod-f",run:openSearchPanel,scope:"editor search-panel"},{key:"F3",run:findNext,shift:findPrevious,scope:"editor search-panel",preventDefault:!0},{key:"Mod-g",run:findNext,shift:findPrevious,scope:"editor search-panel",preventDefault:!0},{key:"Escape",run:closeSearchPanel,scope:"editor search-panel"},{key:"Mod-Shift-l",run:selectSelectionMatches},{key:"Mod-Alt-g",run:gotoLine},{key:"Mod-d",run:selectNextOccurrence,preventDefault:!0}];/**
	Move the selection to the previous instance of the search query,
	before the current main selection. Will wrap past the start
	of the document to start searching at the end again.
	*/ /**
	Select all instances of the search query.
	*/ /**
	Select all instances of the currently selected text.
	*/ /**
	Replace the current match of the search query.
	*/ /**
	Replace all instances of the search query with the given
	replacement.
	*/ /**
	Close the search panel.
	*/ /**
	Default search-related key bindings.

	 - Mod-f: [`openSearchPanel`](https://codemirror.net/6/docs/ref/#search.openSearchPanel)
	 - F3, Mod-g: [`findNext`](https://codemirror.net/6/docs/ref/#search.findNext)
	 - Shift-F3, Shift-Mod-g: [`findPrevious`](https://codemirror.net/6/docs/ref/#search.findPrevious)
	 - Mod-Alt-g: [`gotoLine`](https://codemirror.net/6/docs/ref/#search.gotoLine)
	 - Mod-d: [`selectNextOccurrence`](https://codemirror.net/6/docs/ref/#search.selectNextOccurrence)
	*/class SearchPanel{constructor(view){function button(name,onclick,content){return elt("button",{class:"cm-button",name,onclick,type:"button"},content)}this.view=view;let query=this.query=view.state.field(searchState).query.spec;this.commit=this.commit.bind(this),this.searchField=elt("input",{value:query.search,placeholder:phrase(view,"Find"),"aria-label":phrase(view,"Find"),class:"cm-textfield",name:"search",form:"","main-field":"true",onchange:this.commit,onkeyup:this.commit}),this.replaceField=elt("input",{value:query.replace,placeholder:phrase(view,"Replace"),"aria-label":phrase(view,"Replace"),class:"cm-textfield",name:"replace",form:"",onchange:this.commit,onkeyup:this.commit}),this.caseField=elt("input",{type:"checkbox",name:"case",form:"",checked:query.caseSensitive,onchange:this.commit}),this.reField=elt("input",{type:"checkbox",name:"re",form:"",checked:query.regexp,onchange:this.commit}),this.wordField=elt("input",{type:"checkbox",name:"word",form:"",checked:query.wholeWord,onchange:this.commit}),this.dom=elt("div",{onkeydown:e=>this.keydown(e),class:"cm-search"},[this.searchField,button("next",()=>findNext(view),[phrase(view,"next")]),button("prev",()=>findPrevious(view),[phrase(view,"previous")]),button("select",()=>selectMatches(view),[phrase(view,"all")]),elt("label",null,[this.caseField,phrase(view,"match case")]),elt("label",null,[this.reField,phrase(view,"regexp")]),elt("label",null,[this.wordField,phrase(view,"by word")]),...(view.state.readOnly?[]:[elt("br"),this.replaceField,button("replace",()=>replaceNext(view),[phrase(view,"replace")]),button("replaceAll",()=>replaceAll(view),[phrase(view,"replace all")])]),elt("button",{name:"close",onclick:()=>closeSearchPanel(view),"aria-label":phrase(view,"close"),type:"button"},["\xD7"])])}commit(){let query=new SearchQuery({search:this.searchField.value,caseSensitive:this.caseField.checked,regexp:this.reField.checked,wholeWord:this.wordField.checked,replace:this.replaceField.value});query.eq(this.query)||(this.query=query,this.view.dispatch({effects:setSearchQuery.of(query)}))}keydown(e){view.runScopeHandlers(this.view,e,"search-panel")?e.preventDefault():13==e.keyCode&&e.target==this.searchField?(e.preventDefault(),(e.shiftKey?findPrevious:findNext)(this.view)):13==e.keyCode&&e.target==this.replaceField&&(e.preventDefault(),replaceNext(this.view))}update(update){for(let tr of update.transactions)for(let effect of tr.effects)effect.is(setSearchQuery)&&!effect.value.eq(this.query)&&this.setQuery(effect.value)}setQuery(query){this.query=query,this.searchField.value=query.search,this.replaceField.value=query.replace,this.caseField.checked=query.caseSensitive,this.reField.checked=query.regexp,this.wordField.checked=query.wholeWord}mount(){this.searchField.select()}get pos(){return 80}get top(){return this.view.state.facet(searchConfigFacet).top}}const AnnounceMargin=30,Break=/[\s\.,:;?!]/,baseTheme=view.EditorView.baseTheme({".cm-panel.cm-search":{padding:"2px 6px 4px",position:"relative","& [name=close]":{position:"absolute",top:"0",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",padding:0,margin:0},"& input, & button, & label":{margin:".2em .6em .2em 0"},"& input[type=checkbox]":{marginRight:".2em"},"& label":{fontSize:"80%",whiteSpace:"pre"}},"&light .cm-searchMatch":{backgroundColor:"#ffff0054"},"&dark .cm-searchMatch":{backgroundColor:"#00ffff8a"},"&light .cm-searchMatch-selected":{backgroundColor:"#ff6a0054"},"&dark .cm-searchMatch-selected":{backgroundColor:"#ff00ff8a"}}),searchExtensions=[searchState,state.Prec.low(searchHighlighter),baseTheme];return dist.RegExpCursor=RegExpCursor,dist.SearchCursor=SearchCursor,dist.SearchQuery=SearchQuery,dist.closeSearchPanel=closeSearchPanel,dist.findNext=findNext,dist.findPrevious=findPrevious,dist.getSearchQuery=getSearchQuery,dist.gotoLine=gotoLine,dist.highlightSelectionMatches=highlightSelectionMatches,dist.openSearchPanel=openSearchPanel,dist.replaceAll=replaceAll,dist.replaceNext=replaceNext,dist.search=search,dist.searchKeymap=searchKeymap,dist.searchPanelOpen=searchPanelOpen,dist.selectMatches=selectMatches,dist.selectNextOccurrence=selectNextOccurrence,dist.selectSelectionMatches=selectSelectionMatches,dist.setSearchQuery=setSearchQuery,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function _coreInit__codemirror_lint(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/view"),require$$1=await requireAsyncModule("@codemirror/state"),require$$2=await requireAsyncModule("crelt"),dist={},distExports=function requireDist(){function findDiagnostic(diagnostics,diagnostic=null,after=0){let found=null;return diagnostics.between(after,1e9,(from,to,{spec})=>{if(!(diagnostic&&0>spec.diagnostics.indexOf(diagnostic)))if(!found)found=new SelectedDiagnostic(from,to,diagnostic||spec.diagnostics[0]);else{if(0>spec.diagnostics.indexOf(found.diagnostic))return!1;found=new SelectedDiagnostic(found.from,to,found.diagnostic)}}),found}function hideTooltip(tr,tooltip){let from=tooltip.pos,to=tooltip.end||from,result=tr.state.facet(lintConfig).hideOn(tr,from,to);if(null!=result)return result;let line=tr.startState.doc.lineAt(tooltip.pos);return!!(tr.effects.some(e=>e.is(setDiagnosticsEffect))||tr.changes.touchesRange(line.from,Math.max(line.to,to)))}function maybeEnableLint(state$1,effects){return state$1.field(lintState,!1)?effects:effects.concat(state.StateEffect.appendConfig.of(lintExtensions))}/**
	Returns a transaction spec which updates the current set of
	diagnostics, and enables the lint extension if if wasn't already
	active.
	*/function setDiagnostics(state,diagnostics){return{effects:maybeEnableLint(state,[setDiagnosticsEffect.of(diagnostics)])}}/**
	The state effect that updates the set of active diagnostics. Can
	be useful when writing an extension that needs to track these.
	*/ /**
	Returns the number of active lint diagnostics in the given state.
	*/function diagnosticCount(state){let lint=state.field(lintState,!1);return lint?lint.diagnostics.size:0}function lintTooltip(view,pos,side){let found,{diagnostics}=view.state.field(lintState),start=-1,end=-1;diagnostics.between(pos-(0>side?1:0),pos+(0<side?1:0),(from,to,{spec})=>{if(pos>=from&&pos<=to&&(from==to||(pos>from||0<side)&&(pos<to||0>side)))return found=spec.diagnostics,start=from,end=to,!1});let diagnosticFilter=view.state.facet(lintConfig).tooltipFilter;return found&&diagnosticFilter&&(found=diagnosticFilter(found,view.state)),found?{pos:start,end:end,above:view.state.doc.lineAt(start).to<end,create(){return{dom:diagnosticsTooltip(view,found)}}}:null}function diagnosticsTooltip(view,diagnostics){return elt("ul",{class:"cm-tooltip-lint"},diagnostics.map(d=>renderDiagnostic(view,d,!1)))}/**
	Command to open and focus the lint panel.
	*/function batchResults(promises,sink,error){let collected=[],timeout=-1;for(let p of promises)p.then(value=>{collected.push(value),clearTimeout(timeout),collected.length==promises.length?sink(collected):timeout=setTimeout(()=>sink(collected),200)},error)}function combineFilter(a,b){return a?b?(d,s)=>b(a(d,s),s):a:b}/**
	Given a diagnostic source, this function returns an extension that
	enables linting with that source. It will be called whenever the
	editor is idle (after its content changed).

	Note that settings given here will apply to all linters active in
	the editor. If `null` is given as source, this only configures the
	lint extension.
	*/function linter(source,config={}){return[lintConfig.of({source,config}),lintPlugin,lintExtensions]}/**
	Forces any linters [configured](https://codemirror.net/6/docs/ref/#lint.linter) to run when the
	editor is idle to run right away.
	*/function forceLinting(view){let plugin=view.plugin(lintPlugin);plugin&&plugin.force()}function assignKeys(actions){let assigned=[];if(actions)actions:for(let{name}of actions){for(let ch,i=0;i<name.length;i++)if(ch=name[i],/[a-zA-Z]/.test(ch)&&!assigned.some(c=>c.toLowerCase()==ch.toLowerCase())){assigned.push(ch);continue actions}assigned.push("")}return assigned}function renderDiagnostic(view,diagnostic,inPanel){var _a;let keys=inPanel?assignKeys(diagnostic.actions):[];return elt("li",{class:"cm-diagnostic cm-diagnostic-"+diagnostic.severity},elt("span",{class:"cm-diagnosticText"},diagnostic.renderMessage?diagnostic.renderMessage(view):diagnostic.message),null===(_a=diagnostic.actions)||void 0===_a?void 0:_a.map((action,i)=>{let fired=!1,click=e=>{if(e.preventDefault(),!fired){fired=!0;let found=findDiagnostic(view.state.field(lintState).diagnostics,diagnostic);found&&action.apply(view,found.from,found.to)}},{name}=action,keyIndex=keys[i]?name.indexOf(keys[i]):-1,nameElt=0>keyIndex?name:[name.slice(0,keyIndex),elt("u",name.slice(keyIndex,keyIndex+1)),name.slice(keyIndex+1)],markClass=action.markClass?" "+action.markClass:"";return elt("button",{type:"button",class:"cm-diagnosticAction"+markClass,onclick:click,onmousedown:click,"aria-label":` Action: ${name}${0>keyIndex?"":` (access key "${keys[i]})"`}.`},nameElt)}),diagnostic.source&&elt("div",{class:"cm-diagnosticSource"},diagnostic.source))}function svg(content,attrs=`viewBox="0 0 40 40"`){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`}function underline(color){return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`,`width="6" height="3"`)}function severityWeight(sev){return"error"==sev?4:"warning"==sev?3:"info"==sev?2:1}function maxSeverity(diagnostics){let sev="hint",weight=1;for(let d of diagnostics){let w=severityWeight(d.severity);w>weight&&(weight=w,sev=d.severity)}return sev}function trackHoverOn(view,marker){let mousemove=event=>{let rect=marker.getBoundingClientRect();if(!(event.clientX>rect.left-10/* Hover.Margin */&&event.clientX<rect.right+10/* Hover.Margin */&&event.clientY>rect.top-10/* Hover.Margin */&&event.clientY<rect.bottom+10/* Hover.Margin */)){for(let target=event.target;target;target=target.parentNode)if(1==target.nodeType&&target.classList.contains("cm-tooltip-lint"))return;window.removeEventListener("mousemove",mousemove),view.state.field(lintGutterTooltip)&&view.dispatch({effects:setLintGutterTooltip.of(null)})}};window.addEventListener("mousemove",mousemove)}function gutterMarkerMouseOver(view,marker,diagnostics){function hovered(){let line=view.elementAtHeight(marker.getBoundingClientRect().top+5-view.documentTop);const linePos=view.coordsAtPos(line.from);linePos&&view.dispatch({effects:setLintGutterTooltip.of({pos:line.from,above:!1,clip:!1,create(){return{dom:diagnosticsTooltip(view,diagnostics),getCoords:()=>marker.getBoundingClientRect()}}})}),marker.onmouseout=marker.onmousemove=null,trackHoverOn(view,marker)}let{hoverTime}=view.state.facet(lintGutterConfig),hoverTimeout=setTimeout(hovered,hoverTime);marker.onmouseout=()=>{clearTimeout(hoverTimeout),marker.onmouseout=marker.onmousemove=null},marker.onmousemove=()=>{clearTimeout(hoverTimeout),hoverTimeout=setTimeout(hovered,hoverTime)}}function markersForDiagnostics(doc,diagnostics){let byLine=Object.create(null);for(let diagnostic of diagnostics){let line=doc.lineAt(diagnostic.from);(byLine[line.from]||(byLine[line.from]=[])).push(diagnostic)}let markers=[];for(let line in byLine)markers.push(new LintGutterMarker(byLine[line]).range(+line));return state.RangeSet.of(markers,!0)}/**
	Returns an extension that installs a gutter showing markers for
	each line that has diagnostics, which can be hovered over to see
	the diagnostics.
	*/function lintGutter(config={}){return[lintGutterConfig.of(config),lintGutterMarkers,lintGutterExtension,lintGutterTheme,lintGutterTooltip]}/**
	Iterate over the marked diagnostics for the given editor state,
	calling `f` for each of them. Note that, if the document changed
	since the diagnostics were created, the `Diagnostic` object will
	hold the original outdated position, whereas the `to` and `from`
	arguments hold the diagnostic's current position.
	*/function forEachDiagnostic(state$1,f){let lState=state$1.field(lintState,!1);if(lState&&lState.diagnostics.size){let pending=[],pendingStart=[],lastEnd=-1;for(let iter=state.RangeSet.iter([lState.diagnostics]);;iter.next()){for(let i=0;i<pending.length;i++)(!iter.value||0>iter.value.spec.diagnostics.indexOf(pending[i]))&&(f(pending[i],pendingStart[i],lastEnd),pending.splice(i,1),pendingStart.splice(i--,1));if(!iter.value)break;for(let d of iter.value.spec.diagnostics)0>pending.indexOf(d)&&(pending.push(d),pendingStart.push(iter.from));lastEnd=iter.to}}}if(hasRequiredDist)return dist;hasRequiredDist=1;var view=require$$0,state=require$$1,elt=require$$2;class SelectedDiagnostic{constructor(from,to,diagnostic){this.from=from,this.to=to,this.diagnostic=diagnostic}}class LintState{constructor(diagnostics,panel,selected){this.diagnostics=diagnostics,this.panel=panel,this.selected=selected}static init(diagnostics,panel,state$1){// Filter the list of diagnostics for which to create markers
let diagnosticFilter=state$1.facet(lintConfig).markerFilter;diagnosticFilter&&(diagnostics=diagnosticFilter(diagnostics,state$1));let sorted=diagnostics.slice().sort((a,b)=>a.from-b.from||a.to-b.to),deco=new state.RangeSetBuilder,active=[],pos=0,scan=state$1.doc.iter(),scanPos=0,docLen=state$1.doc.length;for(let next,i=0;;){if(next=i==sorted.length?null:sorted[i],!next&&!active.length)break;let from,to;if(active.length)from=pos,to=active.reduce((p,d)=>Math.min(p,d.to),next&&next.from>from?next.from:1e8);else{if(from=next.from,from>docLen)break;to=next.to,active.push(next),i++}for(;i<sorted.length;){let next=sorted[i];if(next.from==from&&(next.to>next.from||next.to==from))active.push(next),i++,to=Math.min(next.to,to);else{to=Math.min(next.from,to);break}}to=Math.min(to,docLen);let widget=!1;if(active.some(d=>d.from==from&&(d.to==to||to==docLen))&&(widget=from==to,!widget&&10>to-from)){let behind=from-(scanPos+scan.value.length);0<behind&&(scan.next(behind),scanPos=from);for(let check=from;;){if(check>=to){widget=!0;break}if(!scan.lineBreak&&scanPos+scan.value.length>check)break;check=scanPos+scan.value.length,scanPos+=scan.value.length,scan.next()}}let sev=maxSeverity(active);if(widget)deco.add(from,from,view.Decoration.widget({widget:new DiagnosticWidget(sev),diagnostics:active.slice()}));else{let markClass=active.reduce((c,d)=>d.markClass?c+" "+d.markClass:c,"");deco.add(from,to,view.Decoration.mark({class:"cm-lintRange cm-lintRange-"+sev+markClass,diagnostics:active.slice(),inclusiveEnd:active.some(a=>a.to>to)}))}if(pos=to,pos==docLen)break;for(let i=0;i<active.length;i++)active[i].to<=pos&&active.splice(i--,1)}let set=deco.finish();return new LintState(set,panel,findDiagnostic(set))}}const setDiagnosticsEffect=state.StateEffect.define(),togglePanel=state.StateEffect.define(),movePanelSelection=state.StateEffect.define(),lintState=state.StateField.define({create(){return new LintState(view.Decoration.none,null,null)},update(value,tr){if(tr.docChanged&&value.diagnostics.size){let mapped=value.diagnostics.map(tr.changes),selected=null,panel=value.panel;if(value.selected){let selPos=tr.changes.mapPos(value.selected.from,1);selected=findDiagnostic(mapped,value.selected.diagnostic,selPos)||findDiagnostic(mapped,null,selPos)}!mapped.size&&panel&&tr.state.facet(lintConfig).autoPanel&&(panel=null),value=new LintState(mapped,panel,selected)}for(let effect of tr.effects)if(effect.is(setDiagnosticsEffect)){let panel=tr.state.facet(lintConfig).autoPanel?effect.value.length?LintPanel.open:null:value.panel;value=LintState.init(effect.value,panel,tr.state)}else effect.is(togglePanel)?value=new LintState(value.diagnostics,effect.value?LintPanel.open:null,value.selected):effect.is(movePanelSelection)&&(value=new LintState(value.diagnostics,value.panel,effect.value));return value},provide:f=>[view.showPanel.from(f,val=>val.panel),view.EditorView.decorations.from(f,s=>s.diagnostics)]}),activeMark=view.Decoration.mark({class:"cm-lintRange cm-lintRange-active"}),openLintPanel=view$1=>{let field=view$1.state.field(lintState,!1);field&&field.panel||view$1.dispatch({effects:maybeEnableLint(view$1.state,[togglePanel.of(!0)])});let panel=view.getPanel(view$1,LintPanel.open);return panel&&panel.dom.querySelector(".cm-panel-lint ul").focus(),!0},closeLintPanel=view=>{let field=view.state.field(lintState,!1);return!!(field&&field.panel)&&(view.dispatch({effects:togglePanel.of(!1)}),!0)},nextDiagnostic=view$1=>{let field=view$1.state.field(lintState,!1);if(!field)return!1;let sel=view$1.state.selection.main,next=findDiagnostic(field.diagnostics,null,sel.to+1);return(next||(next=findDiagnostic(field.diagnostics,null,0),next&&(next.from!=sel.from||next.to!=sel.to)))&&(view$1.dispatch({selection:{anchor:next.from,head:next.to},scrollIntoView:!0}),view.activateHover(view$1,next.from,1,{tooltip:lintHover,until:tr=>tr.docChanged||tr.newSelection.main.head<next.from||tr.newSelection.main.head>next.to}),!0)},previousDiagnostic=view$1=>{var _a;let{state}=view$1,field=state.field(lintState,!1);if(!field)return!1;let prevFrom,prevTo,lastFrom,lastTo,sel=state.selection.main;if(field.diagnostics.between(0,state.doc.length,(from,to)=>{to<sel.to&&(null==prevFrom||prevFrom<from)&&(prevFrom=from,prevTo=to),(null==lastFrom||from>lastFrom)&&(lastFrom=from,lastTo=to)}),null==lastFrom||null==prevFrom&&lastFrom==sel.from)return!1;let from=null!==prevFrom&&void 0!==prevFrom?prevFrom:lastFrom,to=null!==(_a=null!==prevTo&&void 0!==prevTo?prevTo:lastTo)&&void 0!==_a?_a:from;return view$1.dispatch({selection:{anchor:from,head:to},scrollIntoView:!0}),view.activateHover(view$1,from,1,{tooltip:lintHover,until:tr=>tr.docChanged||tr.newSelection.main.head<from||tr.newSelection.main.head>to}),!0},lintKeymap=[{key:"Mod-Shift-m",run:openLintPanel,preventDefault:!0},{key:"F8",run:nextDiagnostic}],lintPlugin=view.ViewPlugin.fromClass(class{constructor(view){this.view=view,this.timeout=-1,this.set=!0;let{delay}=view.state.facet(lintConfig);this.lintTime=Date.now()+delay,this.run=this.run.bind(this),this.timeout=setTimeout(this.run,delay)}run(){clearTimeout(this.timeout);let now=Date.now();if(now<this.lintTime-10)this.timeout=setTimeout(this.run,this.lintTime-now);else{this.set=!1;let{state}=this.view,{sources}=state.facet(lintConfig);sources.length&&batchResults(sources.map(s=>Promise.resolve(s(this.view))),annotations=>{this.view.state.doc==state.doc&&this.view.dispatch(setDiagnostics(this.view.state,annotations.reduce((a,b)=>a.concat(b))))},error=>{view.logException(this.view.state,error)})}}update(update){let config=update.state.facet(lintConfig);(update.docChanged||config!=update.startState.facet(lintConfig)||config.needsRefresh&&config.needsRefresh(update))&&(this.lintTime=Date.now()+config.delay,!this.set&&(this.set=!0,this.timeout=setTimeout(this.run,config.delay)))}force(){this.set&&(this.lintTime=Date.now(),this.run())}destroy(){clearTimeout(this.timeout)}}),lintConfig=state.Facet.define({combine(input){return{sources:input.map(i=>i.source).filter(x=>null!=x),...state.combineConfig(input.map(i=>i.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:combineFilter,tooltipFilter:combineFilter,needsRefresh:(a,b)=>a?b?u=>a(u)||b(u):a:b,hideOn:(a,b)=>a?b?(t,x,y)=>a(t,x,y)||b(t,x,y):a:b,autoPanel:(a,b)=>a||b})}}});/**
	Command to close the lint panel, when open.
	*/ /**
	Move the selection to the next diagnostic.
	*/ /**
	Move the selection to the previous diagnostic.
	*/ /**
	A set of default key bindings for the lint functionality.

	- Ctrl-Shift-m (Cmd-Shift-m on macOS): [`openLintPanel`](https://codemirror.net/6/docs/ref/#lint.openLintPanel)
	- F8: [`nextDiagnostic`](https://codemirror.net/6/docs/ref/#lint.nextDiagnostic)
	*/class DiagnosticWidget extends view.WidgetType{constructor(sev){super(),this.sev=sev}eq(other){return other.sev==this.sev}toDOM(){return elt("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class PanelItem{constructor(view,diagnostic){this.diagnostic=diagnostic,this.id="item_"+Math.floor(4294967295*Math.random()).toString(16),this.dom=renderDiagnostic(view,diagnostic,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class LintPanel{constructor(view){this.view=view,this.items=[];let onkeydown=event=>{if(!(event.ctrlKey||event.altKey||event.metaKey)){if(27==event.keyCode)closeLintPanel(this.view),this.view.focus();else if(38==event.keyCode||33==event.keyCode)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(40==event.keyCode||34==event.keyCode)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(36==event.keyCode)this.moveSelection(0);else if(35==event.keyCode)this.moveSelection(this.items.length-1);else if(13==event.keyCode)this.view.focus();else if(65<=event.keyCode&&90>=event.keyCode&&0<=this.selectedIndex){// A-Z
let{diagnostic}=this.items[this.selectedIndex],keys=assignKeys(diagnostic.actions);for(let i=0;i<keys.length;i++)if(keys[i].toUpperCase().charCodeAt(0)==event.keyCode){let found=findDiagnostic(this.view.state.field(lintState).diagnostics,diagnostic);found&&diagnostic.actions[i].apply(view,found.from,found.to)}}else return;event.preventDefault()}},onclick=event=>{for(let i=0;i<this.items.length;i++)this.items[i].dom.contains(event.target)&&this.moveSelection(i)};this.list=elt("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown,onclick}),this.dom=elt("div",{class:"cm-panel-lint"},this.list,elt("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>closeLintPanel(this.view)},"\xD7")),this.update()}get selectedIndex(){let selected=this.view.state.field(lintState).selected;if(!selected)return-1;for(let i=0;i<this.items.length;i++)if(this.items[i].diagnostic==selected.diagnostic)return i;return-1}update(){let{diagnostics,selected}=this.view.state.field(lintState),i=0,needsSync=!1,newSelectedItem=null,seen=new Set;for(diagnostics.between(0,this.view.state.doc.length,(_start,_end,{spec})=>{for(let diagnostic of spec.diagnostics){if(seen.has(diagnostic))continue;seen.add(diagnostic);let item,found=-1;for(let j=i;j<this.items.length;j++)if(this.items[j].diagnostic==diagnostic){found=j;break}0>found?(item=new PanelItem(this.view,diagnostic),this.items.splice(i,0,item),needsSync=!0):(item=this.items[found],found>i&&(this.items.splice(i,found-i),needsSync=!0)),selected&&item.diagnostic==selected.diagnostic?!item.dom.hasAttribute("aria-selected")&&(item.dom.setAttribute("aria-selected","true"),newSelectedItem=item):item.dom.hasAttribute("aria-selected")&&item.dom.removeAttribute("aria-selected"),i++}});i<this.items.length&&!(1==this.items.length&&0>this.items[0].diagnostic.from);)needsSync=!0,this.items.pop();0==this.items.length&&(this.items.push(new PanelItem(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),needsSync=!0),newSelectedItem?(this.list.setAttribute("aria-activedescendant",newSelectedItem.id),this.view.requestMeasure({key:this,read:()=>({sel:newSelectedItem.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel,panel})=>{let scaleY=panel.height/this.list.offsetHeight;sel.top<panel.top?this.list.scrollTop-=(panel.top-sel.top)/scaleY:sel.bottom>panel.bottom&&(this.list.scrollTop+=(sel.bottom-panel.bottom)/scaleY)}})):0>this.selectedIndex&&this.list.removeAttribute("aria-activedescendant"),needsSync&&this.sync()}sync(){function rm(){let prev=domPos;domPos=prev.nextSibling,prev.remove()}let domPos=this.list.firstChild;for(let item of this.items)if(item.dom.parentNode==this.list){for(;domPos!=item.dom;)rm();domPos=item.dom.nextSibling}else this.list.insertBefore(item.dom,domPos);for(;domPos;)rm()}moveSelection(selectedIndex){if(0>this.selectedIndex)return;let field=this.view.state.field(lintState),selection=findDiagnostic(field.diagnostics,this.items[selectedIndex].diagnostic);selection&&this.view.dispatch({selection:{anchor:selection.from,head:selection.to},scrollIntoView:!0,effects:movePanelSelection.of(selection)})}static open(view){return new LintPanel(view)}}const baseTheme=view.EditorView.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:underline("#f11")},".cm-lintRange-warning":{backgroundImage:underline("orange")},".cm-lintRange-info":{backgroundImage:underline("#999")},".cm-lintRange-hint":{backgroundImage:underline("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:"\"\"",position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});class LintGutterMarker extends view.GutterMarker{constructor(diagnostics){super(),this.diagnostics=diagnostics,this.severity=maxSeverity(diagnostics)}toDOM(view){let elt=document.createElement("div");elt.className="cm-lint-marker cm-lint-marker-"+this.severity;let diagnostics=this.diagnostics,diagnosticsFilter=view.state.facet(lintGutterConfig).tooltipFilter;return diagnosticsFilter&&(diagnostics=diagnosticsFilter(diagnostics,view.state)),diagnostics.length&&(elt.onmouseover=()=>gutterMarkerMouseOver(view,elt,diagnostics)),elt}}const lintGutterExtension=view.gutter({class:"cm-gutter-lint",markers:view=>view.state.field(lintGutterMarkers),widgetMarker:(view,widget,block)=>{let diagnostics=[];return view.state.field(lintGutterMarkers).between(block.from,block.to,(from,to,value)=>{from>block.from&&from<block.to&&diagnostics.push(...value.diagnostics)}),diagnostics.length?new LintGutterMarker(diagnostics):null}}),lintGutterMarkers=state.StateField.define({create(){return state.RangeSet.empty},update(markers,tr){markers=markers.map(tr.changes);let diagnosticFilter=tr.state.facet(lintGutterConfig).markerFilter;for(let effect of tr.effects)if(effect.is(setDiagnosticsEffect)){let diagnostics=effect.value;diagnosticFilter&&(diagnostics=diagnosticFilter(diagnostics||[],tr.state)),markers=markersForDiagnostics(tr.state.doc,diagnostics.slice(0))}return markers}}),setLintGutterTooltip=state.StateEffect.define(),lintGutterTooltip=state.StateField.define({create(){return null},update(tooltip,tr){return tooltip&&tr.docChanged&&(tooltip=hideTooltip(tr,tooltip)?null:{...tooltip,pos:tr.changes.mapPos(tooltip.pos)}),tr.effects.reduce((t,e)=>e.is(setLintGutterTooltip)?e.value:t,tooltip)},provide:field=>view.showTooltip.from(field)}),lintGutterTheme=view.EditorView.baseTheme({".cm-gutter-lint":{width:"1.4em","& .cm-gutterElement":{padding:".2em"}},".cm-lint-marker":{width:"1em",height:"1em"},".cm-lint-marker-info":{content:svg(`<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`)},".cm-lint-marker-warning":{content:svg(`<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`)},".cm-lint-marker-error":{content:svg(`<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>`)}}),lintHover=view.hoverTooltip(lintTooltip,{hideOn:hideTooltip}),lintExtensions=[lintState,view.EditorView.decorations.compute([lintState],state=>{let{selected,panel}=state.field(lintState);return selected&&panel&&selected.from!=selected.to?view.Decoration.set([activeMark.range(selected.from,selected.to)]):view.Decoration.none}),lintHover,baseTheme],lintGutterConfig=state.Facet.define({combine(configs){return state.combineConfig(configs,{hoverTime:300/* Hover.Time */,markerFilter:null,tooltipFilter:null})}});return dist.closeLintPanel=closeLintPanel,dist.diagnosticCount=diagnosticCount,dist.forEachDiagnostic=forEachDiagnostic,dist.forceLinting=forceLinting,dist.lintGutter=lintGutter,dist.lintKeymap=lintKeymap,dist.linter=linter,dist.nextDiagnostic=nextDiagnostic,dist.openLintPanel=openLintPanel,dist.previousDiagnostic=previousDiagnostic,dist.setDiagnostics=setDiagnostics,dist.setDiagnosticsEffect=setDiagnosticsEffect,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}
async function moduleInitFunction(_g){const r={};const _req=(n)=>{if(Object.prototype.hasOwnProperty.call(r,n))return r[n];return _g(n);};
  r["crelt"]=await _coreInit_crelt(_req,{});
  r["style-mod"]=await _coreInit_style_mod(_req,{});
  r["w3c-keyname"]=await _coreInit_w3c_keyname(_req,{});
  r["@marijn/find-cluster-break"]=await _coreInit__marijn_find_cluster_break(_req,{});
  r["@lezer/common"]=await _coreInit__lezer_common(_req,{});
  r["@lezer/highlight"]=await _coreInit__lezer_highlight(_req,{});
  r["@lezer/lr"]=await _coreInit__lezer_lr(_req,{});
  r["@codemirror/state"]=await _coreInit__codemirror_state(_req,{});
  r["@codemirror/view"]=await _coreInit__codemirror_view(_req,{});
  r["@codemirror/language"]=await _coreInit__codemirror_language(_req,{});
  r["@codemirror/commands"]=await _coreInit__codemirror_commands(_req,{});
  r["@codemirror/autocomplete"]=await _coreInit__codemirror_autocomplete(_req,{});
  r["@codemirror/search"]=await _coreInit__codemirror_search(_req,{});
  r["@codemirror/lint"]=await _coreInit__codemirror_lint(_req,{});
return r;}