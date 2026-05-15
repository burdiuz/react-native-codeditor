# react-native-codeditor — Working Reference

A React Native code editor component that embeds **CodeMirror 6** inside a `<WebView>` and
maintains a full bidirectional RPC bridge between React Native and the web page using
`@actualwave/webview-interface` (DDA-based).

---

## Project layout

```
react-native-codeditor/          ← library root (also workspace root)
  src/
    index.tsx                    Re-exports everything public
    CodeEditor.tsx               Main component (hooks-based)
    BlockingView.tsx             Semi-transparent overlay shown until editor is ready
    WebViewAPI.ts                RN-side bridge; wraps initializeHost + DDA proxy to page
    EditorAPI.ts                 TypeScript types: EditorAPI, ExtensionSpec, HistorySize, …
    assets/
      editor.html                WebView guest page: DDA bootstrap + CM6 editor init
      webview-interface.umd.js   Self-contained UMD bundle (webview-interface + DDA)
      codemirror-editor.umd.js   Plain IIFE bundle of requireAsyncModule + createEditor
      codemirror/                CM6 module files (from js-codemirror-package dist/)
        _core.js                 Bundled core: state, view, language, commands, autocomplete…
        @codemirror_lang-*.js    Language support files (loaded lazily on demand)
        @uiw_codemirror-theme-*.js  Per-theme files (loaded lazily on demand)
        … (all other CM6 deps)
  example/
    src/App.tsx                  Demo app — language/theme switcher, undo/redo toolbar
  lib/                           Build output (react-native-builder-bob)
    module/                      ESM, consumed by Metro
    typescript/                  Type declarations
  react-native.config.js         Declares src/assets for react-native link asset copying
```

---

## Architecture

Two separate runtime environments communicate via the DDA (Deferred Data Access) RPC layer,
transported over the asymmetric WebView message channels:

```
React Native (HOST)                    WebView (GUEST — editor.html)
──────────────────────────────────     ────────────────────────────────────────
CodeEditor (React component)
  └─ WebViewAPI
       └─ initializeHost()        ◄──► WebViewInterface.initializeGuest()
            hostRoot proxy               editorTarget (EditorController methods)
            ├─ getInitialConfig()        ↕  DDA RPC over:
            ├─ onLog()              ←──  ReactNativeWebView.postMessage (GUEST→HOST)
            └─ onError()           ──►  injectJavaScript (HOST→GUEST)
                                         window.dispatchEvent(MessageEvent)
           out-of-band _rnPost:
            __contentChange__       ←── ReactNativeWebView.postMessage (one-way)
            __editorReady__         ←──
            __editorLog__           ←──
            __editorError__         ←──
```

### HOST → GUEST (React Native → WebView)
`initializeHost` uses `webView.injectJavaScript(...)` to dispatch a `MessageEvent` on `window`.
The in-page DDA receiver picks it up.

### GUEST → HOST (WebView → React Native)
The page calls `window.ReactNativeWebView.postMessage(JSON.stringify(msg))`. The `<WebView
onMessage>` handler forwards the raw event to `api.onMessage(event)` which feeds the HOST's
DDA subscriber.

### Out-of-band messages (bypass DDA)
`WebViewAPI.onMessage` intercepts these JSON packets before forwarding to DDA:

| type | Direction | Meaning |
|---|---|---|
| `__editorLog__` | GUEST→HOST | `window.log(...)` calls from the WebView |
| `__editorError__` | GUEST→HOST | `window.onerror` / `unhandledrejection` |
| `__editorReady__` | GUEST→HOST | Editor fully ready; HOST fires `onInitialized` |
| `__contentChange__` | GUEST→HOST | Content/history update on every debounced keystroke |

`__contentChange__` carries `{ value, undo, redo }`. It is a one-way fire-and-forget message
(no DDA round trip, no `injectJavaScript` response). This keeps all `injectJavaScript` calls
away from the typing hot path, preventing interference with Android IME composition.

### Message protocol
All other messages are DDA command/response envelopes. The DDA layer handles serialisation,
routing, and Promise resolution transparently on both sides.

---

## Initialisation sequence

```
1. Component mounts
   → WebViewAPI constructed (bridge not yet active)
   → CodeEditor renders <WebView source={{ uri: editorUri }} />

2. WebView loads editor.html from file:///android_asset/editor.html
   → <script src="./webview-interface.umd.js"> → defines window.WebViewInterface
   → <script src="./codemirror-editor.umd.js"> → defines window.CodeMirrorEditor
   → async IIFE begins executing

3. GUEST bootstrap runs:
   → configure({ loader: xhrLoader })   ← XHR-based for file:// compatibility
   → WebViewInterface.initializeGuest({ root: editorTarget, handshakeTimeout: 30000 })
     starts sending DDA handshake pings via ReactNativeWebView.postMessage

4. HOST (CodeEditor) wires onMessage before WebView mounts:
   → initializeHost({ webView, root: hostRoot }) returns { onMessage, connection }
   → onMessage assigned to <WebView onMessage> prop immediately

5. HOST receives first GUEST ping → sends handshake response via injectJavaScript
   → DDA handshake completes on both sides

6. GUEST receives handshake response:
   → nativeApi proxy available (calls route to hostRoot methods)
   → config = await nativeApi.getInitialConfig()
   → editor = await createEditor({ doc, language, extensions, onChange })
     — loads _core.js (861 KB) via XHR, then language + theme files on demand
   → Object.assign(editorTarget, { all real methods })
   → applies config.viewport if provided
   → posts __editorReady__

7. HOST receives __editorReady__:
   → handlers.onInitialized(this) called — caller receives WebViewAPI handle
   → BlockingView disappears (editor is painted with correct theme)

8. Ongoing: onChange fires in GUEST on every keystroke (debounced 300ms)
   → _rnPost('__contentChange__', { value, undo, redo }) — out-of-band, no DDA
   → HOST.onMessage intercepts → calls onContentUpdate(value) + onHistorySizeUpdate({ undo, redo })
```

**Why `__editorReady__` instead of DDA connection:** `connection.then` resolves at step 5,
before the editor is visually ready. Delaying `onInitialized` to `__editorReady__` ensures
the BlockingView only disappears when the editor is painted with its theme.

---

## Initial config delivery

Initial editor settings are delivered to the GUEST via `nativeApi.getInitialConfig()`, which
the GUEST calls as its first DDA request. This includes:

```ts
interface InitialConfig {
  content?: string;
  language?: string;
  extensions?: ExtensionSpec[];
  theme?: string;
  viewport?: ViewportSettings;
}
```

`viewport` is in `InitialConfig` (not a separate DDA call) because `setViewport` requires
`pageApi` to be ready — calling it before the handshake completes would throw.

---

## Asset loading (`src/assets/codemirror/`)

The codemirror module system uses the `requireAsyncModule` loader from `js-codemirror-package`,
bundled into `codemirror-editor.umd.js` (plain IIFE, no ES module syntax).

1. `_core.js` — one XHR loads all 14 core packages (state, view, language, commands, etc.)
   and populates a shared `moduleCache`. All core modules share a single request.
2. All other `.js` files — fetched individually on first `requireAsyncModule(packageName)` call.
   Results are cached; repeated calls return synchronously from cache.
3. The loader uses `XMLHttpRequest` (not `fetch`) because Android WebView blocks `fetch()` for
   `file://` origins even when same-origin. XHR `status === 0` means success for `file://`.

Each module file uses the `moduleInitFunction` pattern:
```js
async function moduleInitFunction(requireAsyncModule, exports={}) { ... }
```
Loaded via XHR, executed via `eval(code + ';moduleInitFunction')` — the `;moduleInitFunction`
suffix retrieves the function reference from strict-mode eval scope.

**Codemirror version: 6.x.** All modules sourced from `@actualwave/js-codemirror-package`
(devDependency). `npm run copy-assets` (or `npm run prepare`) regenerates them from
`node_modules/@actualwave/js-codemirror-package/dist/`.

**The WebView is fully offline.** No CDN or internet access required.

---

## Theme loading — IMPORTANT

Each `@uiw` theme lives in its **own package**, not the meta-package `@uiw/codemirror-themes`
(which only exports `createTheme`). The correct spec form is:

```js
['@uiw/codemirror-theme-darcula', 'darcula']  // ✓ correct
['@uiw/codemirror-themes', 'darcula']          // ✗ wrong — returns undefined
```

Most themes export under a name matching the theme, but two use "Dark" variants:

| Theme name | Package | Export name |
|---|---|---|
| `github` | `@uiw/codemirror-theme-github` | `githubDark` |
| `vscode` | `@uiw/codemirror-theme-vscode` | `vscodeDark` |
| all others | `@uiw/codemirror-theme-{name}` | `{name}` |

In `editor.html`, `getThemeSpec(themeName)` encodes this mapping. In `editorTarget.setTheme`
the same function is used. Do not change to use `@uiw/codemirror-themes` directly.

---

## `codemirror-editor.umd.js`

A plain IIFE bundle **generated by `scripts/copy-assets.js`** from
`node_modules/@actualwave/js-codemirror-package/dist/requireAsyncModule.js` +
`node_modules/@actualwave/js-codemirror-package/dist/index.js`. All `export`/`import`
keywords are stripped by the script. Do not edit the file directly — run `npm run copy-assets`.

Why not ES modules: `<script type="module">` in Android WebView causes silent failures when
imported files are missing, making debugging extremely difficult. A plain `<script>` tag with
an IIFE shows errors via `window.onerror` instead of silently aborting.

Exposes: `window.CodeMirrorEditor = { configure, createEditor, requireAsyncModule, registerExtension }`

`createEditor` uses a custom `mobileSetup` instead of CM6's `basicSetup`. The only
difference is that `drawSelection()` is omitted — it replaces the native browser cursor
with a custom overlay which breaks Android IME composition tracking (causes ghost text
and cursor not advancing when typing fast). All other `basicSetup` extensions are present.
`foldKeymap` is sourced from `@codemirror/language` (not `@codemirror/commands`), which
is where CM6 actually exports it.

`EditorView.EDIT_CONTEXT = false` is set inside `createEditor` (in `js-codemirror-package/index.js`)
immediately after the `Promise.all` destructuring resolves, before `new EditorView()` is called.
Chrome 126+ WebView uses the EditContext API for IME; Chrome 147 has a race condition where
successive `textupdate` events arrive faster than CM6 can sync back via
`editContext.updateText/updateSelection`, causing characters to appear after the cursor during
fast typing. Setting `EDIT_CONTEXT = false` makes CM6 fall back to the `contenteditable` +
MutationObserver path, which is stable when `drawSelection()` is omitted (native cursor stays
visible for the IME to track). The flag must be set on the real `EditorView` class extracted
from the `Promise.all` result — setting it on the module stub before `_core.js` loads would be
overwritten by `Object.assign(stub, actualExports)` when loading completes.

---

## Asset linking — IMPORTANT for Expo

**`expo prebuild` does NOT copy `react-native.config.js` assets from workspace packages.**
The `assets` field in `react-native.config.js` is only processed by `npx react-native link`
(bare RN CLI). With Expo you must copy assets manually:

```bash
# Full copy (first time or after any asset changes)
mkdir -p example/android/app/src/main/assets
cp -r src/assets/* example/android/app/src/main/assets/

# Or after updating webview-interface, regenerate all assets:
npm run copy-assets
cp -r src/assets/* example/android/app/src/main/assets/
```

A proper Expo config plugin should be added to the library to automate this during
`expo prebuild`. This is a known gap.

---

## DDA lazy mode — always `await` calls

DDA operates in **lazy mode** by default. A proxy method call (e.g. `api.editor.historyUndo()`)
builds a command chain but does NOT dispatch it until `.then` is accessed on the returned
value — i.e. until the call is `await`-ed. Discarding the result with `void` or ignoring it
entirely silently does nothing; no command is ever sent to the WebView.

**Every call to `api.editor.*` must be awaited.** Example patterns:

```typescript
// ✓ correct — dispatches the command
await apiRef.current?.editor?.historyUndo();

// ✓ also correct — fire and forget inside useEffect
void (async () => { await apiRef.current!.editor.setLanguage(language); })();

// ✗ wrong — command is never sent
void apiRef.current?.editor.historyUndo();
apiRef.current?.editor.historyUndo();
```

---

## Effect structure in `CodeEditor.tsx`

Each prop change is guarded by a `prevRef` that starts as `null` — the first render is
always skipped, preventing redundant pushes when the editor is already initialized with
the correct initial config. Effects also check `initializedRef.current` before calling API
methods, so they are no-ops until the editor is ready.

| Prop changed | Action |
|---|---|
| `content` | `api.editor.setValue(content)` if value differs from `currentContentRef` |
| `language` | `api.editor.setLanguage(language)` |
| `theme` | `api.editor.setTheme(theme)` |
| `extensions` | `api.editor.setExtensions(extensions)` |
| `viewport` | `api.editor.setViewport(viewport)` |

Each effect wraps the DDA call in `void (async () => { await ... })()` — `useEffect` callbacks
must be synchronous, so the async IIFE pattern is used to enable `await` inside them.

Initial values are delivered once during handshake via `nativeApi.getInitialConfig()` —
not re-pushed as prop-change effects.

---

## `CodeEditor` props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `onInitialized` | `(api: WebViewAPI) => void` | **required** | Fires when editor is fully ready (theme + language loaded). Call `api.focus()` here to show Android keyboard. |
| `onHistorySizeUpdate` | `(size: HistorySize) => void` | **required** | Fired on every edit; `HistorySize = { undo, redo }` |
| `onLog` | `(...args) => void` | **required** | `window.log(...)` calls from inside the WebView |
| `onError` | `(error) => void` | **required** | Errors from inside the WebView |
| `onContentUpdate` | `(content: string) => void` | **required** | Fired on every keystroke (CM6 onChange) |
| `language` | `string` | `undefined` | CM6 language name, e.g. `'javascript'`, `'python'` |
| `extensions` | `ExtensionSpec[]` | `[]` | CM6 extension specs — see ExtensionSpec below |
| `theme` | `string` | `undefined` | Theme name, e.g. `'darcula'`, `'github'`. Loaded from per-theme package. |
| `content` | `string` | `''` | Controlled document content |
| `viewport` | `ViewportSettings` | `undefined` | Viewport meta scaling |
| `allowFileAccess` | `boolean` | `true` | WebView prop; required for file:// asset loading |
| `editorUri` | `string` | `'file:///android_asset/editor.html'` | Override for iOS or custom servers |
| `renderBlockingView` | `() => ReactNode` | `() => <BlockingView />` | Loading overlay |
| `onWebViewRefUpdated` | `(ref) => void` | — | Called when internal WebView ref changes |
| `onLoad/Start/Progress/End` | func | — | WebView event pass-throughs |
| `onNavigationStateChange` | func | — | WebView event pass-through |

### ExtensionSpec

```ts
type ExtensionSpec =
  | string                  // package name → resolved via built-in registry
  | [string, string]        // [packageName, exportName] → mod[exportName]
  | [string, object]        // [packageName, options] → resolver(mod, options)
  | unknown                 // pre-built CM6 Extension, used as-is
```

### Theme names
`androidstudio` `andromeda` `atomone` `aura` `basic` `bbedit` `copilot` `darcula`
`dracula` `duotone` `eclipse` `github` `material` `monokai` `nord` `okaidia`
`solarized` `sublime` `vscode` `xcode`

---

## `WebViewAPI` — editor API

`WebViewAPI` is returned in `onInitialized`. It wraps the DDA proxy to the GUEST-side
`EditorController` and adds RN-side side-effects (`requestFocus`, `injectJavaScript`).

All methods except `injectJavaScript` and `requestFocus` are DDA calls — they return
Promises resolved by the GUEST.

```ts
// Content
api.getValue()                         → Promise<string>
api.setValue(value)                    → Promise<void>
api.resetValue(value?)                 → Promise<void>   (setValue + historyClear)

// Language / extensions / theme
api.setLanguage(name)                  → Promise<void>   (loads lang module on demand)
api.setExtensions(specs)              → Promise<void>   (replaces extension compartment)
api.setTheme(themeName?)               → Promise<void>   (loads from per-theme package)

// Viewport
api.setViewport(options)               → Promise<void>   (updates <meta name="viewport">)

// Focus
api.focus()                            → Promise<void>   (+ calls webView.requestFocus())

// Cursor / selection
api.getCursor(where?)                  → Promise<CursorPosition>  // { line, ch, index }
api.setCursor(line, ch?)               → Promise<void>
api.getSelection()                     → Promise<string>
api.setSelection(anchor, head?)        → Promise<void>
api.replaceSelection(text)             → Promise<void>
api.cancelSelection()                  → Promise<void>

// History
api.historyUndo()                      → Promise<boolean>
api.historyRedo()                      → Promise<boolean>
api.historyClear()                     → Promise<void>
api.historySize()                      → Promise<HistorySize>   // { undo, redo }

// Scroll
api.scrollToCursor(margin?)            → Promise<void>

// Advanced
api.loadExtension(moduleName)          → Promise<object>   (raw module exports)
api.destroy()                          → Promise<void>

// RN-side only (synchronous, no DDA)
api.injectJavaScript(code)             → void
api.requestFocus()                     → void
```

---

## Keyboard handling

`android:windowSoftInputMode="adjustResize"` is set in `AndroidManifest.xml`. Wrap the
screen in `KeyboardAvoidingView` to make the editor shrink when the keyboard appears:

```tsx
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <CodeEditor ... />
</KeyboardAvoidingView>
```

Call `api.focus()` inside `onInitialized` to trigger the Android soft keyboard.

---

## Dependencies

| Package | Where | Why |
|---|---|---|
| `@actualwave/webview-interface` | `dependencies` (yalc) | HOST/GUEST DDA bridge over injectJavaScript / postMessage |
| `@actualwave/deferred-data-access` | `dependencies` (yalc) | DDA core (transitive via webview-interface) |
| `@actualwave/weak-storage` | `dependencies` (npm `^0.1.1`) | Transitive dep of DDA; must be explicit because DDA is yalc-linked |
| `react-native-webview` | `peerDependencies` (≥11) | The actual WebView component |
| `react`, `react-native` | `peerDependencies` | — |

**No `@actualwave/messageport-dispatcher`** — replaced by webview-interface.
**No CDN dependencies** — CM6 served from bundled assets.

---

## Dependency update procedure (yalc packages)

When `@actualwave/weak-storage`, `@actualwave/deferred-data-access`, or
`@actualwave/webview-interface` are changed:

```bash
# 1. In the changed package repo:
yalc push

# 2. In this project root:
yalc update
npm install

# 3. Regenerate all assets (includes webview-interface.umd.js) and rebuild:
npm run prepare
cp -r src/assets/* example/android/app/src/main/assets/

# 4. Run:
cd example && npx expo run:android
```

---

## Known platform issues

### `FinalizationRegistry` not available in Hermes (Android)

Hermes does not expose `FinalizationRegistry` as a global.

**Fix applied in `@actualwave/weak-storage`:** `WeakValueMap` constructor now accepts an
optional registry class as its second argument. Callers can pass `null`/`undefined` to disable
auto-cleanup.

**Fix applied in `@actualwave/deferred-data-access`:** `ResourcePool` passes
`FinalizationRegistry` (which is `undefined` in Hermes, triggering the graceful fallback).

### Metro can't process DDA ESM subpackage files

`@actualwave/webview-interface` (CJS) requires `@actualwave/deferred-data-access/interface`.
Metro falls through to the ESM source files when a subpackage `package.json` has no `main`
field. Babel's CJS transform of ESM `export *` chains creates getter-based live bindings
that break React Fast Refresh:
```
ReferenceError: Property 'IdOwner' doesn't exist
```

**Fix applied in `@actualwave/deferred-data-access`:** All importable subpackages now have
CJS bundles and `"main"` fields (`interface.js`, `proxy.js`, `resource.js`, etc.).

### `Event` global not available in Hermes

DDA's `getMessageEventData` used `event instanceof Event`. `Event` is a DOM global absent
in Hermes.

**Fix applied in `@actualwave/deferred-data-access`** (`interface/src/utils.ts`):
```ts
// Before (DOM-only):
event instanceof Event ? event.data : event
// After (structural check, works everywhere):
event != null && typeof event === 'object' && 'data' in event ? event.data : event
```

---

## Build & install

```bash
# Install (--ignore-scripts avoids broken postinstall in transitive git deps)
# Note: @actualwave/js-codemirror-package has its own postinstall (node start.js) that
# rebuilds dist/. Run it explicitly once after install if dist/ is missing:
npm install --ignore-scripts
node node_modules/@actualwave/js-codemirror-package/start.js  # only if dist/ missing

# Generate codemirror assets + build lib/ (prepare runs copy-assets first)
npm run prepare

# Or regenerate only the WebView assets without rebuilding lib/:
npm run copy-assets

# Type-check
npx tsc --noEmit

# Copy assets to Android project (expo prebuild does NOT do this automatically)
mkdir -p example/android/app/src/main/assets
cp -r src/assets/* example/android/app/src/main/assets/

# Run example on Android
cd example && npx expo run:android
```

Metro resolves `react-native-codeditor` → workspace root → `lib/module/index.js`.
**After any source change, run `npm run prepare` before reloading the app.**

**Do NOT use `./gradlew clean`** — it fails because `react-native-webview` codegen JNI
directory doesn't exist until after first build. Use `npx expo run:android` directly.

---

## Known limitations / future work

1. **iOS asset URI** — Default `editorUri` points to `file:///android_asset/editor.html`
   (Android only). For iOS, compute the bundle path (e.g. via `react-native-fs`
   `MainBundlePath`) and pass it via the `editorUri` prop.

2. **Expo asset plugin missing** — `react-native.config.js` assets are ignored by
   `expo prebuild`. A proper Expo config plugin should be written to copy `src/assets/`
   during prebuild automatically.

3. **`_core.js` cold-start cost** — The core bundle is 861 KB. First load downloads and
   `eval()`s it synchronously on the DDA-resolved Promise chain. On slow devices the
   initial editor appearance may take 1–2 seconds after the WebView loads.

4. **No `forwardRef`** — The `api` handle is delivered via `onInitialized(api)`.

5. **No tests** — `WebViewAPI` and `CodeEditor` require a React Native + WebView mock
   environment.

6. **Updating codemirror assets** — Update `@actualwave/js-codemirror-package` in
   `package.json`, run `npm install`, then `npm run copy-assets`. Both
   `src/assets/codemirror-editor.umd.js` and `src/assets/codemirror/` are regenerated
   automatically by `scripts/copy-assets.js`.

7. **Initial theme flash** — `onInitialized` fires after `createEditor` completes (via
   `__editorReady__`), so the BlockingView disappears only when the editor is painted.
   However there may still be a brief flash on very slow devices if the WebView renders
   before `createEditor` finishes. No known fix yet.

---

## Migration notes (May 2026)

### Phase 1 — JS → TypeScript (May 2026)
Migrated from the old project (plain JS, Rollup, CodeMirror 5) to TypeScript +
react-native-builder-bob + Expo example.

### Phase 2 — CM6 + webview-interface (May 2026)
Rebuilt to use CodeMirror 6 and the DDA-based bridge:

- CM5 CDN → CM6 from `js-codemirror-package` dist (offline, bundled assets)
- `MessagePortDispatcher` + `MessagePortDummy` → `@actualwave/webview-interface`
- Manual request/response event system → DDA proxy (deleted)
- `modules[]` + `settings{}` props → `language` + `extensions[]` props
- `autoUpdateInterval` polling → CM6 `onChange` callback (real-time)
- Theme: CM5 theme name (CDN CSS) → `@uiw/codemirror-themes` extension (offline)

### Phase 3 — DDA fixes + bundling (May 2026)
Resolved all startup failures and made the editor work end-to-end:

- Replaced `<script type="module">` with plain IIFE — silent ES module failures in WebView
  made debugging impossible; `window.onerror` catches errors from plain scripts
- Created `codemirror-editor.umd.js` — inlines `requireAsyncModule.js` + `index.js` from
  js-codemirror-package as a plain IIFE (no `import`/`export`)
- Fixed `@actualwave/deferred-data-access`: `FinalizationRegistry` fallback, CJS subpackage
  bundles, `getMessageEventData` using structural check instead of `instanceof Event`
- Added out-of-band message protocol (`__editorLog__`, `__editorError__`, `__editorReady__`)
- Moved `onInitialized` trigger to `__editorReady__` (fires after editor is fully painted)
- Fixed theme loading to use per-package specs (`@uiw/codemirror-theme-{name}`)

### Phase 4 — Automated asset pipeline (May 2026)
`@actualwave/js-codemirror-package` added as a devDependency. `scripts/copy-assets.js` now
generates both `src/assets/codemirror-editor.umd.js` and `src/assets/codemirror/` from
`node_modules/@actualwave/js-codemirror-package/dist/` automatically. `npm run prepare`
runs the script before `bob build`, so assets are always in sync with the package version.

### Phase 5 — Android IME + DDA call fixes (May 2026)
Resolved Android typing issues and silent DDA call failures:

- `mobileSetup`: replaced `basicSetup` with custom setup that omits `drawSelection()` — this
  fixes Android IME ghost text (drawSelection hides the native cursor the IME tracks)
- `foldKeymap` moved to correct import (`@codemirror/language`, not `@codemirror/commands`)
- `__contentChange__` out-of-band message: replaced DDA `nativeApi.onContentChange()` call
  with `_rnPost('__contentChange__', ...)` — eliminates all `injectJavaScript` calls during
  typing, preventing IME composition disruption; added 300ms debounce
- All `api.editor.*` calls in `App.tsx` and `CodeEditor.tsx` effects changed to properly
  `await` — DDA lazy mode silently drops commands that are never awaited (`void x` does not
  trigger `.then` and therefore never dispatches the command to the WebView)
- `EditorView.EDIT_CONTEXT = false` set in `createEditor` (after `Promise.all` resolves, before
  `new EditorView()`) — disables Chrome 126+ EditContext API which has a race condition in
  Chrome 147 WebView during fast typing (characters appearing after cursor); falls back to
  contenteditable + MutationObserver path which is stable without `drawSelection()`
