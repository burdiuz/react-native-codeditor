async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredStyleMod,styleMod$1={},styleModExports=function requireStyleMod(){if(hasRequiredStyleMod)return styleMod$1;hasRequiredStyleMod=1;var C="\u037C",COUNT="undefined"==typeof Symbol?"__\u037C":Symbol.for("\u037C"),SET="undefined"==typeof Symbol?"__styleSet"+Math.floor(1e8*Math.random()):Symbol("styleSet"),top="undefined"==typeof globalThis?"undefined"==typeof window?{}:window:globalThis,StyleModule=styleMod$1.StyleModule=function StyleModule(spec,options){function splitSelector(selector){return /^@/.test(selector)?[selector]:selector.split(/,\s*/)}function render(selectors,spec,target,isKeyframes){var local=[],isAt=/^@(\w+)\b/.exec(selectors[0]),keyframes=isAt&&"keyframes"==isAt[1];if(isAt&&null==spec)return target.push(selectors[0]+";");for(var prop in spec){var value=spec[prop];if(/&/.test(prop))render(prop.split(/,\s*/).map(function(part){return selectors.map(function(sel){return part.replace(/&/,sel)})}).reduce(function(a,b){return a.concat(b)}),value,target);else if(value&&"object"==typeof value){if(!isAt)throw new RangeError("The value of a property ("+prop+") should be a primitive value.");render(splitSelector(prop),value,local,keyframes)}else null!=value&&local.push(prop.replace(/_.*/,"").replace(/[A-Z]/g,function(l){return"-"+l.toLowerCase()})+": "+value+";")}(local.length||keyframes)&&target.push((!finish||isAt||isKeyframes?selectors:selectors.map(finish)).join(", ")+" {"+local.join(" ")+"}")}this.rules=[];var ref=options||{},finish=ref.finish;for(var prop in spec)render(splitSelector(prop),spec[prop],this.rules)};// :: - Style modules encapsulate a set of CSS rules defined from
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