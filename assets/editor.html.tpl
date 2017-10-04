<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Code Editor</title>
    <style type="text/css">
		html, body {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}
        ${scope.css}
    </style>
    <script type="text/javascript">
        !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MessagePortDispatcher=t():e.MessagePortDispatcher=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="http://localhost:8081/dist/",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.self=t.MessagePortEvent=void 0;var r=n(1),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=i.default.self,s=i.default.create;t.default=i.default,t.MessagePortEvent=r.MessagePortEvent,t.self=o,t.create=s},function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.MessagePortDispatcher=t.MessagePortEvent=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(u),l=t.MessagePortEvent=function(){function e(t,n){o(this,e),this.event=t,this.dispatcherId=n}return s(e,[{key:"toJSON",value:function(){return{event:c.toJSON(this.event),dispatcherId:this.dispatcherId}}}],[{key:"parse",value:function(t){var n=c.parse(t);return e.isEvent(n)?n.event=c.parse(n.event):n=null,n}},{key:"isEvent",value:function(e){return a.default.isObject(e)&&Object.prototype.hasOwnProperty.call(e,"dispatcherId")&&Object.prototype.hasOwnProperty.call(e,"event")}}]),e}(),c=t.MessagePortDispatcher=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u=arguments.length>4&&void 0!==arguments[4]&&arguments[4];o(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,null,!0));return u||a.initiallize(e,n,i,s),a}return i(t,e),s(t,[{key:"initiallize",value:function(e,t,n,r){this.target=e||self,this._handlers={customPostMessageHandler:t,senderEventPreprocessor:r},this.sender=a.default.create(),this.receiver=a.default.create(n),this.dispatcherId="MP/"+Math.ceil(1e4*Math.random())+"/"+Date.now(),this.targetOrigin="*",this.addEventListener=this.receiver.addEventListener.bind(this.receiver),this.hasEventListener=this.receiver.hasEventListener.bind(this.receiver),this.removeEventListener=this.receiver.removeEventListener.bind(this.receiver),this.removeAllEventListeners=this.receiver.removeAllEventListeners.bind(this.receiver),e.addEventListener("message",this._messageEventListener.bind(this))}},{key:"dispatchEvent",value:function(e,n,r){var i=a.default.getEvent(e,n);this._handlers.senderEventPreprocessor&&(i=this._handlers.senderEventPreprocessor.call(this,i));var o=t.toJSON(new l(i,this.dispatcherId));this._postMessageHandler(o,r)}},{key:"_postMessageHandler",value:function(e,t){var n=this._handlers.customPostMessageHandler;n?n.call(this,e,this.targetOrigin,t):this.target.postMessage(e,this.targetOrigin,t)}},{key:"_messageEventListener",value:function(e){e=e.nativeEvent||e;var t=l.parse(e.data);t&&(t.dispatcherId===this.dispatcherId?this.sender.dispatchEvent(t.event):this.receiver.dispatchEvent(t.event))}}],[{key:"toJSON",value:function(e){return"function"==typeof e.toJSON?e.toJSON():JSON.stringify(e)}},{key:"parse",value:function(e){var t=void 0;if(a.default.isObject(e))t=e;else try{t=JSON.parse(e)}catch(e){}return t}},{key:"create",value:function(e,n,r,i){return new t(e,n,r,i)}}]),t}(a.default),f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return function(){return t||(t=c.create(e())),t}};c.self=f(function(){return self}),c.parent=f(function(){return parent}),c.top=f(function(){return top}),c.MessagePortEvent=l,t.default=c},function(e,t,n){"use strict";(function(e){var n,r,i,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(s,u){"object"===o(t)&&"object"===o(e)?e.exports=u():(r=[],n=u,void 0!==(i="function"==typeof n?n.apply(t,r):n)&&(e.exports=i))}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="http://localhost:8081/dist/",t(t.s=1)}([function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?function(e){return void 0===e?"undefined":o(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":o(e)},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a=t.Event=function(){function e(t,n){r(this,e),this.type=t,this.data=n||null,this.defaultPrevented=!1}return s(e,[{key:"toJSON",value:function(){return{type:this.type,data:this.data}}},{key:"isDefaultPrevented",value:function(){return this.defaultPrevented}},{key:"preventDefault",value:function(){this.defaultPrevented=!0}}]),e}(),l=function(){function e(t,n,i){var o=this;r(this,e),this.index=-1,this.immediatelyStopped=!1,this.stopImmediatePropagation=function(){o.immediatelyStopped=!0},this.listeners=t,this.onStopped=n,this.onComplete=i}return s(e,[{key:"run",value:function(e,t){var n=void 0,r=this.listeners;for(this.augmentEvent(e),this.index=0;this.index<r.length&&!this.immediatelyStopped;this.index++)n=r[this.index],n.call(t,e);this.clearEvent(e),this.onComplete(this)}},{key:"augmentEvent",value:function(e){var t=e;t.stopPropagation=this.onStopped,t.stopImmediatePropagation=this.stopImmediatePropagation}},{key:"clearEvent",value:function(e){var t=e;delete t.stopPropagation,delete t.stopImmediatePropagation}},{key:"listenerRemoved",value:function(e,t){e===this.listeners&&t<=this.index&&this.index--}}]),e}(),c=function(){function e(){var t=this;r(this,e),this._listeners={},this._runners=[],this.removeRunner=function(e){t._runners.splice(t._runners.indexOf(e),1)}}return s(e,[{key:"createList",value:function(e,t){var n=parseInt(t,10),r=this.getPrioritiesByKey(e),i=String(n),o=void 0;return u(r,i)?o=r[i]:(o=[],r[i]=o),o}},{key:"getPrioritiesByKey",value:function(e){var t=void 0;return u(this._listeners,e)?t=this._listeners[e]:(t={},this._listeners[e]=t),t}},{key:"add",value:function(e,t,n){var r=this.createList(e,n);r.indexOf(t)<0&&r.push(t)}},{key:"has",value:function(e){var t=void 0,n=!1,r=this.getPrioritiesByKey(e);if(r)for(t in r)if(u(r,t)){n=!0;break}return n}},{key:"remove",value:function(e,t){var n=this,r=this.getPrioritiesByKey(e);if(r)for(var i=Object.getOwnPropertyNames(r),o=i.length,s=0;s<o;s++)!function(e){var o=i[e],s=r[o],u=s.indexOf(t);u>=0&&(s.splice(u,1),s.length||delete r[o],n._runners.forEach(function(e){e.listenerRemoved(s,u)}))}(s)}},{key:"removeAll",value:function(e){delete this._listeners[e]}},{key:"createRunner",value:function(e,t){var n=new l(e,t,this.removeRunner);return this._runners.push(n),n}},{key:"call",value:function(e,t){var n=this.getPrioritiesByKey(e.type,this._listeners),r=!1,i=function(){r=!0};if(n)for(var o=Object.getOwnPropertyNames(n).sort(function(e,t){return e-t}),s=o.length,u=0;u<s&&!r;u++){var a=n[o[u]];if(a){var l=this.createRunner(a,i);if(l.run(e,t),l.immediatelyStopped)break}}}}]),e}(),f=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];r(this,e),n||this.initialize(t)}return s(e,[{key:"initialize",value:function(e){this._eventPreprocessor=e,this._listeners=new c}},{key:"addEventListener",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this._listeners.add(e,t,-n||0)}},{key:"hasEventListener",value:function(e){return this._listeners.has(e)}},{key:"removeEventListener",value:function(e,t){this._listeners.remove(e,t)}},{key:"removeAllEventListeners",value:function(e){this._listeners.removeAll(e)}},{key:"dispatchEvent",value:function(t,n){var r=e.getEvent(t,n);this._eventPreprocessor&&(r=this._eventPreprocessor.call(this,r)),this._listeners.call(r)}}],[{key:"isObject",value:function(e){return"object"===(void 0===e?"undefined":i(e))&&null!==e}},{key:"getEvent",value:function(t,n){var r=t;return e.isObject(t)||(r=new e.Event(String(t),n)),r}},{key:"create",value:function(t){return new e(t)}}]),e}();f.Event=a,t.default=f},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.Event=void 0;var r=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=i.default,t.Event=r.Event}])})}).call(t,n(3)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}}])});
    </script>
    <script type="text/javascript">
        ${scope.js}
    </script>
</head>
<body>
</body>
<script type="text/javascript">
var Dispatcher = MessagePortDispatcher.default;
function augmentEvent(event) {
  return {
    type: event.type,
    data: augmentData(event.data)
  };
}

function augmentData(data) {
  return {
    meta: {
      historySize: editor ? editor.historySize() : null
    },
    data: data
  };
}

Dispatcher.toJSON = function (object) {
  return JSON.stringify(object);
};

var _initializeId;
var editor = null;
var dispatcher = new Dispatcher({
  postMessage: function (data) {
    console.log('POST:', typeof(data), data);
    window.postMessage(data, '*');
  },
  addEventListener: function (eventType, listener) {
    document.addEventListener(eventType, listener);
    window.addEventListener(eventType, listener);
  }
}, null, null, augmentEvent);
window.onerror = function (message, source, lineno, colno, error) {
  var data = { message: String(message), source: source, lineno: lineno, colno: colno };
  if (error) {
    data.error = {
      columnNumber: error.columnNumber,
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      message: error.message,
      name: error.name
    };
  }
  dispatcher.dispatchEvent('wvGlobalError', data);
};
window.log = function () {
  var message = [];
  Array.prototype.push.apply(message, arguments);
  dispatcher.dispatchEvent('wvLog', message);
};

function initEventListeners() {
  dispatcher.addEventListener('setValue', function (event) {
    editor.setValue(event.data);
  });
  dispatcher.addEventListener('getValue', function () {
    var data = editor.getValue();
    dispatcher.dispatchEvent('getValueResponse', data);
  });

  dispatcher.addEventListener('historyUndo', function () {
    editor.undo();
    dispatcher.dispatchEvent('historyUndoResponse');
  });

  dispatcher.addEventListener('historyRedo', function () {
    editor.redo();
    dispatcher.dispatchEvent('historyRedoResponse');
  });

  dispatcher.addEventListener('historyClear', function () {
    editor.clearHistory();
  });

  dispatcher.addEventListener('historyRead', function () {
    var data = editor.getHistory();
    dispatcher.dispatchEvent('historyReadResponse', data);
  });

  dispatcher.addEventListener('historyWrite', function (event) {
    editor.setHistory(event.data);
  });

  dispatcher.addEventListener('historySize', function () {
    dispatcher.dispatchEvent('historySizeResponse');
  });

  dispatcher.addEventListener('scrollToCursor', function (event) {
    var margin = event.data;
    editor.scrollIntoView(null, margin);
  });

  dispatcher.addEventListener('updateSettings', function (event) {
    var settings = event.data;
    for (var name in settings) {
      if (settings.hasOwnProperty(name)) {
        editor.setOption(name, settings[name]);
      }
    }
  });
  dispatcher.addEventListener('handshake', function (event) {
    clearInterval(_initializeId);
    if (event.data) {
      editor.setValue(event.data.content || '');
      if (event.data.history) {
        editor.setHistory(event.data.history);
      } else {
        editor.clearHistory();
      }
    }
    dispatcher.dispatchEvent('initialized');
  });
}

function runEditor(settings) {
  initEventListeners();
  editor = new CodeMirror(document.body, settings);
  editor.setSize('100%', '100%');
  /*
  FIXME happens too often,after each entered symbol. need to find event that
  happens not that often to use for auto-save and history size
  editor.on('changes', function () {
    dispatcher.dispatchEvent('historySizeResponse');
  });
   */
  _initializeId = setInterval(function () {
    dispatcher.dispatchEvent('initialize');
  }, 500);
}
</script>
</html>
