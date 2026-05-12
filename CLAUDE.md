# react-native-codeditor — Working Reference

A React Native code editor component that embeds **CodeMirror 5** inside a `<WebView>` and maintains a full bidirectional message-passing bridge between React Native and the web page running inside it.

---

## Project layout

```
react-native-codeditor/          ← library root (also workspace root)
  src/
    index.tsx                    Re-exports everything public
    CodeEditor.tsx               Main component (hooks-based)
    BlockingView.tsx             Semi-transparent overlay shown until handshake completes
    utils.ts                     generateInitScript() — builds the injectedJavaScript string
    webview.ts                   WebViewEditor class — assembles the full WebView HTML
    WebViewAPI.ts                RN↔WebView bridge; owns MessagePortDispatcher
    EditorRequests.ts            All editor API methods (setValue, getCursor, …)
    EditorEvent.ts               Event-type string constants + getResponseEvent()
    Request.ts                   One-shot promise wrapper around a dispatched event
    ResponseListener.ts          Resolves a promise when a matching response event arrives
    declarations.d.ts            Empty — @actualwave/messageport-dispatcher ships its own .d.ts
    assets/
      webview_bundle.json        Pre-bundled assets: editor.html, initscript.js,
                                 messageport-dispatcher.min.js
  example/
    src/App.tsx                  Demo app — JS editor with darcula theme, toolbar, undo/redo
  lib/                           Build output (react-native-builder-bob)
    module/                      ESM, consumed by Metro
    typescript/                  Type declarations
```

---

## Architecture

Two separate runtime environments communicate through a message bridge:

```
React Native                          WebView (CodeMirror page)
───────────────────────────────────   ──────────────────────────────────────
CodeEditor (React component)
  └─ WebViewAPI
       └─ MessagePortDispatcher ◄──── MessagePortDispatcher (initscript.js)
            └─ MessagePortDummy        ▲
                 postMessage ──────────┘  injectJavaScript (RN→WV)
                 callMessageListeners ◄── ReactNativeWebView.postMessage (WV→RN)
```

### RN → WebView
`MessagePortDummy.postMessage` calls `webView.injectJavaScript(...)` which dispatches a `CustomEvent` on the window. The in-page `MessagePortDispatcher` receives it.

### WebView → RN
The page calls `window.ReactNativeWebView.postMessage(data)`. The `<WebView onMessage>` handler forwards the raw event to `api.onMessage` → `port.callMessageListeners`.

### Message envelope
Every message is `{ type, data }`. Messages from the WebView may carry optional metadata:
```js
{ meta: { historySize: number }, data: <actual payload> }
```
`WebViewAPI.preprocessIncomingMessages` strips `meta` before routing and calls `onHistorySizeUpdate` as a side-effect.

---

## Initialisation sequence

```
1. Component mounts (synchronous)
   → WebViewEditor.toString() builds full HTML string (CDN links + inline scripts)
   → WebViewAPI constructed (dispatcher not yet active)
   → <WebView source={html} injectedJavaScript={initScript}> renders

2. WebView page loads; all <script> tags execute (CodeMirror, addons, initscript)
   initscript defines setViewport / runEditor / event listeners

3. injectedJavaScript fires (after page load)
   → setViewport(viewportOptions)
   → runEditor(settings, autoUpdateInterval)
   → CodeMirror created; setInterval dispatches 'initialize' every 500 ms

4. RN receives 'initialize' → sends 'handshake' with { content, settings }

5. WebView receives 'handshake' → applies content/settings, clears interval
   → sends 'initialized'

6. RN receives 'initialized'
   → initializedRef = true, setInitialized(true)
   → onInitialized(api) called — caller now holds the API handle
   → if forceUpdates: pushes viewport, settings, content via api
   → registers GET_VALUE response listener + AUTO_UPDATE listener
   → BlockingView disappears
```

---

## WebView HTML assembly (`src/webview.ts`)

`WebViewEditor.toString()` builds the HTML by:
1. Starting from `editor.html` template in `webview_bundle.json`
2. Inserting CDN `<link>` tags for CodeMirror CSS (and theme CSS) before `</head>`
3. Inserting CDN `<script src>` tags for CodeMirror core + addon modules before `</body>`
4. Injecting `messageport-dispatcher.min.js` and `initscript.js` as inline `<script>` tags at the end of body

**CodeMirror version: 5.65.16 from cdnjs.cloudflare.com.**

The `@actualwave/codemirror-package` is NOT used. Its master and `#next` branches were
rewritten for CodeMirror 6 before migration, making them incompatible with the CodeMirror 5
`Editor.bundle()` API the old code relied on. CDN loading is the replacement.

**Implication: the WebView requires internet access.** For offline use, CodeMirror 5 would need
to be embedded as a string asset.

---

## `injectedJavaScript` (`src/utils.ts`)

```js
(function () {
  setViewport({ intialScale, userScalable, viewportWidth, maximumScale, minimumScale });
  runEditor({ ...defaultSettings, ...userSettings, theme, value: content }, autoUpdateInterval);
})();
```

Both functions are defined by `initscript.js` running inside the WebView before `injectedJavaScript` fires (because `<script>` tags in the HTML are synchronous-blocking, so they finish before the page load event).

---

## Effect structure in `CodeEditor.tsx`

| Effect deps | Action |
|---|---|
| `[theme, modules]` | Rebuild HTML, reset `initialized` to false (triggers WebView reload) |
| `[settings]` | Regenerate `initScript`, push `updateSettings` to live editor if ready |
| `[viewport]` | Push `setViewport` to live editor |
| `[content]` | Push `setValue` if value differs from `currentContentRef` |

All effects use a `prevRef` guard to skip the initial render — they only fire on actual changes.

---

## `CodeEditor` props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `onInitialized` | `(api: WebViewAPI) => void` | **required** | Call `api.focus()` here to show keyboard on Android |
| `onHistorySizeUpdate` | `(size) => void` | **required** | Fired on every edit; size is `{ undo, redo }` |
| `onLog` | `(...args) => void` | **required** | `window.log(...)` calls from inside the WebView |
| `onError` | `(error) => void` | **required** | `window.onerror` from inside the WebView |
| `onContentUpdate` | `(content: string) => void` | **required** | Fired on auto-update tick and `getValue` response |
| `theme` | `string` | `undefined` | CodeMirror 5 theme name, e.g. `'darcula'`, `'monokai'` |
| `modules` | `string[]` | see below | CDN paths relative to CM root, e.g. `'mode/javascript/javascript'` |
| `content` | `string` | `''` | Controlled content |
| `settings` | `object` | see below | Merged with internal defaults and passed to CodeMirror |
| `viewport` | `ViewportSettings` | `{}` | Viewport meta scaling; always pass `intialScale: 1` |
| `autoUpdateInterval` | `number` | `1000` | Ms between auto content ticks; `0` disables |
| `forceUpdates` | `boolean` | `false` | Re-push viewport/settings/content after every re-init |
| `renderBlockingView` | `() => ReactNode` | `() => <BlockingView />` | Loading overlay |
| `allowFileAccess` | `boolean` | `true` | WebView prop pass-through |
| `onWebViewRefUpdated` | `(ref) => void` | — | Called when internal WebView ref changes |
| `onLoad/Start/Progress/End` | func | — | WebView event pass-throughs |
| `onNavigationStateChange` | func | — | WebView event pass-through |

### Default modules
```
addon/fold/foldgutter        addon/edit/matchbrackets
addon/edit/matchtags         addon/search/match-highlighter
addon/edit/closebrackets     addon/edit/closetag
addon/fold/foldcode          addon/fold/brace-fold
addon/fold/comment-fold      addon/fold/indent-fold
addon/fold/xml-fold
```
**No language mode is included by default.** Always pass the mode explicitly, e.g.:
```tsx
modules={['mode/javascript/javascript', ...DEFAULT_MODULES_FROM_LIB]}
settings={{ mode: 'javascript' }}
```

### Default settings (merged in `utils.ts`)
```js
{ gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  inputStyle: 'contenteditable',   // required for Android WebView editability
  styleActiveLine: true,
  autofocus: true }
```

---

## `WebViewAPI` — editor API

All methods return Promises resolving to `event.data` from the response.

```ts
api.getValue()                         → Promise<string>
api.setValue(content)                  → Promise
api.resetValue(content)                → Promise  (also clears history)
api.setOption(name, value)             → Promise
api.getOption(name)                    → Promise
api.updateSettings(settings)           → Promise
api.setViewport(options)               → Promise
api.getCursor(where?)                  → Promise<{ line, ch, index }>
api.setCursor(line, ch?, options?)     → Promise
api.getSelection()                     → Promise<string>
api.setSelection(anchor, head, opts?)  → Promise
api.replaceSelection(text)             → Promise
api.cancelSelection()                  → Promise
api.historyRead()                      → Promise<object>
api.historyWrite(history)              → Promise
api.historyUndo()                      → Promise
api.historyRedo()                      → Promise
api.historyClear()                     → Promise
api.historySize()                      → Promise<{ undo, redo }>
api.scrollToCursor(margin?)            → Promise
api.execCommand(command, ...args)      → Promise
api.focus()                            → Promise  (+ calls webView.requestFocus())
api.handshake(initData)                → Promise  (internal — called during init)

// Event pass-through to MessagePortDispatcher:
api.addEventListener(type, listener)
api.removeEventListener(type, listener)
api.hasEventListener(type)
api.dispatchEvent(type, data)
api.injectJavaScript(jsCode)
```

---

## Event constants (`src/EditorEvent.ts`)

`EditorEvent.INITIALIZE / HANDSHAKE / INITIALIZED / AUTO_UPDATE / SET_VALUE / GET_VALUE /
RESET_VALUE / SET_OPTION / GET_OPTION / UPDATE_SETTINGS / SET_VIEWPORT / FOCUS /
GET_CURSOR / SET_CURSOR / GET_SELECTION / SET_SELECTION / REPLACE_SELECTION /
CANCEL_SELECTION / HISTORY_READ / HISTORY_WRITE / HISTORY_UNDO / HISTORY_REDO /
HISTORY_CLEAR / HISTORY_SIZE / SCROLL_TO_CURSOR / EXEC_COMMAND / WV_GLOBAL_ERROR / WV_LOG`

`getResponseEvent(type)` → `'initialized'` for HANDSHAKE, `'${type}Response'` for everything else.

---

## Request / response pattern

```
RN  ──► dispatchEvent('getValue', null)        ──►  WebView
    ◄── dispatchEvent('getValueResponse', str) ◄──
```

`Request` creates a one-shot `ResponseListener` for the response event, then dispatches the command. `ResponseListener` wraps a native `Promise` (`@actualwave/deferred` was replaced). When the response fires the promise resolves, the listener unregisters itself.

---

## Dependencies

| Package | Where | Why |
|---|---|---|
| `@actualwave/messageport-dispatcher` | `dependencies` | Event dispatcher over MessagePort-like interface; ships its own `.d.ts` |
| `react-native-webview` | `peerDependencies` (≥11) | The actual WebView component |
| `react`, `react-native` | `peerDependencies` | — |

**No `@actualwave/deferred`** — replaced with native Promise in `ResponseListener.ts`.
**No `@actualwave/codemirror-package`** — incompatible rewrite; CDN used instead.
**No `prop-types`** — TypeScript interfaces used instead.

---

## Build & install

```bash
# Install (--ignore-scripts avoids broken postinstall in transitive git deps)
npm install --ignore-scripts

# Build lib/ (required before Metro can pick up changes)
npm run prepare

# Type-check
npx tsc --noEmit

# Run example on Android
cd example && npx expo run:android
```

Metro resolves `react-native-codeditor` → workspace root → `lib/module/index.js` (via `main` field).
**After any source change, run `npm run prepare` before reloading the app.**

---

## Known limitations / future work

1. **CodeMirror version** — Uses CM5 via CDN. Requires internet. For offline use, CM5 needs to be bundled as a string asset in `webview_bundle.json` or similar.

2. **CDN upgrade** — Currently pinned to `5.65.16`. To upgrade, change `CM_VERSION` in `src/webview.ts`.

3. **`autoUpdateInterval` not reconfigurable after mount** — Baked into `injectedJavaScript` at init time. A theme/modules change causes a full reload (which re-bakes it), but changing just `autoUpdateInterval` prop has no effect.

4. **No language mode in defaults** — Callers must always pass `modules` with the mode file and `settings.mode`. Consider whether a default mode makes sense.

5. **No `forwardRef`** — The `api` handle is delivered via `onInitialized(api)`. No imperative ref forwarding.

6. **Android keyboard** — Call `api.focus()` inside `onInitialized` to reliably trigger the soft keyboard. `autofocus: true` in settings helps but is not always sufficient on Android WebView.

7. **No tests** — `WebViewAPI` and `CodeEditor` require a React Native + WebView mock environment. `EditorEvent` and `utils` are straightforward to test (see old project's `*.spec.js` for reference).

8. **`originWhitelist={[]}` on WebView** — Inherited from old project. Affects only navigation (link clicks), not resource loading or editability. Safe to leave, but worth documenting.

9. **Viewport flash** — The HTML template in `webview_bundle.json` has `initial-scale=0.25`. `injectedJavaScript` overrides it to the caller's `viewport` prop (default `intialScale: 1`). Always pass an explicit `viewport` prop to avoid the flash.

---

## Migration notes (May 2026)

Migrated from `/Users/burdiuz/Documents/GitHub/react-native-codeditor-old/` (plain JS, Rollup, CodeMirror 5) to this project (TypeScript, react-native-builder-bob, Expo example). See the old project's `CURRENT_VERSION.md` for the pre-migration architecture notes.

Key changes made during migration:
- JS → TypeScript, PropTypes → TS interfaces
- `@actualwave/deferred` → native Promise
- `@actualwave/codemirror-package` dropped; CDN loading added in `webview.ts`
- `npm` used instead of Yarn (Yarn 4 berry had workspace resolution issues with local path deps)
