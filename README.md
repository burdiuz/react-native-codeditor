# react-native-codeditor

A React Native code editor component powered by [CodeMirror 6](https://codemirror.net/), embedded inside a `<WebView>`
with full bidirectional RPC. Syntax highlighting, themes, history, cursor/selection control —
all offline, no CDN required.

---

## Features

- CodeMirror 6 with `basicSetup` (line numbers, bracket matching, search, autocomplete, …)
- 20+ syntax languages loaded on demand (`javascript`, `python`, `rust`, `sql`, …)
- 20+ themes from `@uiw/codemirror-themes` (`darcula`, `monokai`, `github`, `nord`, …)
- Fully offline — all CM6 assets bundled into the library
- Real-time `onChange` content updates (no polling)
- Full editor API: getValue, setValue, cursor, selection, history undo/redo, viewport
- Transparent RPC bridge via `@actualwave/webview-interface` (DDA)

---

## Requirements

- React Native ≥ 0.71
- `react-native-webview` ≥ 11
- Android: WebView 61+ (Chromium-based)
- iOS: WebView with file:// access; bundle path must be provided via the `editorUri` prop

---

## Installation

### 1. Install the packages

```sh
npm install react-native-codeditor react-native-webview
```

### 2. Link native assets

The library ships CodeMirror 6 as static files that must be copied into your app's native
asset directories. How you do this depends on your setup:

**React Native CLI (bare workflow):**
```sh
npx react-native link
```
This copies `src/assets/` to `android/app/src/main/assets/` (Android) and your Xcode
project's bundle resources (iOS).

**Expo managed / prebuild:**

`expo prebuild` does not process `react-native.config.js` asset declarations from npm
packages. Copy the assets manually after running prebuild:

```sh
npx expo prebuild

# Android
mkdir -p android/app/src/main/assets
cp -r node_modules/react-native-codeditor/src/assets/* android/app/src/main/assets/
```

For iOS, copy the files into your Xcode project's Copy Bundle Resources phase and add them
to the target. The required files are:
- `editor.html`
- `webview-interface.umd.js`
- `codemirror-editor.umd.js`
- `codemirror/` directory (entire folder)

> Re-run the copy after every library upgrade to refresh the bundled assets.

### 3. Android: keyboard resize mode

Add `adjustResize` to your Activity in `AndroidManifest.xml` so the editor shrinks when the
soft keyboard appears (instead of being hidden behind it):

```xml
<activity
  android:windowSoftInputMode="adjustResize"
  ...
/>
```

### 4. iOS: provide the editor URI

On Android the editor page loads from `file:///android_asset/editor.html` (the default).
On iOS the bundle path varies per device. Compute it at runtime and pass it via the
`editorUri` prop:

```tsx
import { Platform } from 'react-native';
import RNFS from 'react-native-fs'; // react-native-fs or equivalent

const editorUri = Platform.select({
  android: 'file:///android_asset/editor.html',
  ios: `file://${RNFS.MainBundlePath}/editor.html`,
});

<CodeEditor editorUri={editorUri} ... />
```

---

## Basic usage

```tsx
import { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import CodeEditor from 'react-native-codeditor';
import type { WebViewAPI, HistorySize } from 'react-native-codeditor';

export default function EditorScreen() {
  const apiRef = useRef<WebViewAPI | null>(null);

  const handleInitialized = useCallback((api: WebViewAPI) => {
    apiRef.current = api;
    void api.focus(); // show soft keyboard on Android
  }, []);

  return (
    // Shrinks the editor when the soft keyboard appears.
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CodeEditor
        content="const x = 42;"
        language="javascript"
        theme="darcula"
        onInitialized={handleInitialized}
        onContentUpdate={(content) => console.log('length:', content.length)}
        onHistorySizeUpdate={(size) => console.log('undo:', size.undo)}
        onLog={(...args) => console.log('[editor]', ...args)}
        onError={(err) => console.error('[editor]', err)}
      />
    </KeyboardAvoidingView>
  );
}
```

---

## Props

### Required callbacks

| Prop | Type | Description |
|---|---|---|
| `onInitialized` | `(api: WebViewAPI) => void` | Called once the editor is fully ready — after the theme and language modules have loaded and the editor is painted. Store the `api` handle here. Call `api.focus()` to open the Android keyboard. |
| `onContentUpdate` | `(content: string) => void` | Called on every keystroke with the full document text. |
| `onHistorySizeUpdate` | `(size: HistorySize) => void` | Called on every keystroke with `{ undo: number, redo: number }`. |
| `onLog` | `(...args: unknown[]) => void` | Receives `window.log(...)` calls from inside the WebView. |
| `onError` | `(error: unknown) => void` | Receives `window.onerror` events from inside the WebView. |

### Editor configuration

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | `''` | Initial document content (see [Content model](#content-model) below). |
| `language` | `string` | `undefined` | Syntax language, e.g. `'javascript'`, `'python'`, `'sql'`. The language module is loaded from the bundled assets on first use. |
| `extensions` | `ExtensionSpec[]` | `[]` | Additional CodeMirror 6 extension specs. See [Extension specs](#extension-specs). |
| `theme` | `string` | `undefined` | Theme name. See [Themes](#themes). |
| `viewport` | `ViewportSettings` | `undefined` | Controls the `<meta name="viewport">` tag inside the WebView. |

### WebView / layout

| Prop | Type | Default | Description |
|---|---|---|---|
| `editorUri` | `string` | `'file:///android_asset/editor.html'` | URI of the editor HTML page. Override for iOS — see [iOS: provide the editor URI](#4-ios-provide-the-editor-uri). |
| `allowFileAccess` | `boolean` | `true` | Passed to `<WebView>`. Required for `file://` asset loading. |
| `renderBlockingView` | `() => ReactNode` | `() => <BlockingView />` | Overlay rendered while the editor is initialising. Replace with your own loading UI. |
| `onWebViewRefUpdated` | `(ref) => void` | — | Called when the internal WebView ref changes. |
| `onLoad` | func | — | WebView `onLoad` pass-through. |
| `onLoadStart` | func | — | WebView `onLoadStart` pass-through. |
| `onLoadProgress` | func | — | WebView `onLoadProgress` pass-through. |
| `onLoadEnd` | func | — | WebView `onLoadEnd` pass-through. |
| `onNavigationStateChange` | func | — | WebView `onNavigationStateChange` pass-through. |

---

## Content model

`CodeEditor` is **uncontrolled** — the editor owns its document state after the first render,
similar to an `<input defaultValue="…">`. The `content` prop sets the initial document content
once (delivered via the DDA handshake), but it is not kept in sync with what the user types.

```tsx
// Initial content is set once; subsequent user edits are not reflected back to the prop.
<CodeEditor content="const x = 42;" ... />
```

Changes are reported out via `onContentUpdate` on every keystroke, but writing them back to
`content` would create a feedback loop where every keystroke triggers a `setValue` call that
resets the cursor — so **don't** pass user-typed content back as the `content` prop.

To push new content into the editor programmatically, use the API:

```ts
// Replace content, preserve undo/redo history:
await api.editor.setValue(newCode);

// Replace content AND clear history (e.g. when opening a new file):
await api.editor.resetValue(newCode);
```

`content` prop changes after the initial render do call `api.editor.setValue` internally, so
prop-driven replacement works (e.g. switching between files stored in React state). Just don't
do it in response to `onContentUpdate` — only in response to an external event like a file load
or language switch.

---

## `WebViewAPI` — editor control

The `api` object received in `onInitialized` provides:

- `api.focus()` — focuses the editor and triggers the Android soft keyboard.
- `api.editor` — a DDA proxy to the live CM6 editor inside the WebView. All `api.editor.*`
  methods return Promises resolved by the WebView.
- `api.injectJavaScript(code)` / `api.requestFocus()` — synchronous, React Native side only.

### Focus

```ts
api.focus(): Promise<void>
// Focuses the editor. Also calls webView.requestFocus() to trigger the Android keyboard.
```

### Content

```ts
api.editor.getValue(): Promise<string>
// Returns the current document text.

api.editor.setValue(value: string): Promise<void>
// Replaces the document content. Preserves history.

api.editor.resetValue(value?: string): Promise<void>
// Replaces content AND clears undo/redo history.
```

### Language, extensions, theme

```ts
api.editor.setLanguage(name: string): Promise<void>
// Switches syntax language. Loads the language module on demand.
// e.g. await api.editor.setLanguage('python')

api.editor.setExtensions(specs: ExtensionSpec[]): Promise<void>
// Replaces the active extension set.
// e.g. await api.editor.setExtensions(['@codemirror/search'])

api.editor.setTheme(themeName?: string): Promise<void>
// Switches theme. Pass undefined to remove the theme.
// e.g. await api.editor.setTheme('monokai')
```

### Viewport

```ts
api.editor.setViewport(options: ViewportSettings): Promise<void>
// Updates <meta name="viewport"> inside the WebView.
// options: { intialScale?, maximumScale?, minimumScale?, userScalable?, viewportWidth? }
```

### Cursor and selection

```ts
api.editor.getCursor(where?: 'from' | 'to' | 'head'): Promise<CursorPosition>
// Returns { line, ch, index } of the cursor (or selection boundary).
// line is 0-based; index is the absolute character offset.

api.editor.setCursor(line: number, ch?: number): Promise<void>
// Moves the cursor to line (0-based) + character offset.

api.editor.getSelection(): Promise<string>
// Returns the currently selected text.

api.editor.setSelection(anchor: number, head?: number): Promise<void>
// Sets the selection by absolute character offsets.

api.editor.replaceSelection(text: string): Promise<void>
// Replaces the current selection with text.

api.editor.cancelSelection(): Promise<void>
// Collapses the selection to the cursor position.
```

### History

```ts
api.editor.historyUndo(): Promise<boolean>
// Undoes the last change. Returns true if an undo was performed.

api.editor.historyRedo(): Promise<boolean>
// Redoes the last undone change. Returns true if a redo was performed.

api.editor.historyClear(): Promise<void>
// Clears the undo/redo history without changing the document.

api.editor.historySize(): Promise<HistorySize>
// Returns the current { undo, redo } depth.
// Note: history size is also reported automatically via onHistorySizeUpdate.
```

### Scroll

```ts
api.editor.scrollToCursor(margin?: number): Promise<void>
// Scrolls the editor so the cursor is visible.
```

### Advanced

```ts
api.editor.loadExtension(moduleName: string): Promise<object>
// Loads a CM6 module by package name and returns its raw exports.
// Useful for building custom features on top of bundled modules.

api.editor.destroy(): Promise<void>
// Destroys the CM6 EditorView and removes it from the DOM.

api.injectJavaScript(code: string): void
// Runs arbitrary JavaScript inside the WebView. Synchronous, no return value.

api.requestFocus(): void
// Calls webView.requestFocus() on the native WebView ref (Android keyboard hint).
```

---

## Extension specs

The `extensions` prop and `api.setExtensions()` accept an array of **extension specs**.
Each item can be:

| Form | Example | Behaviour |
|---|---|---|
| Package name string | `'@codemirror/search'` | Loaded and resolved via the built-in registry |
| `[packageName, exportName]` | `['@uiw/codemirror-theme-nord', 'nord']` | `mod[exportName]` returned directly |
| `[packageName, options]` | `['@codemirror/search', { top: true }]` | Resolver called with options |
| Any other value | `myCustomExtension` | Used as-is (a pre-built CM6 `Extension`) |

### Built-in extension registry

| Package | Resolver |
|---|---|
| `@codemirror/autocomplete` | `mod.autocompletion(options)` |
| `@codemirror/search` | `mod.search(options)` |
| `@codemirror/lint` | `mod.lintGutter(options)` |
| `@codemirror/collab` | `mod.collab(options)` |
| `@codemirror/theme-one-dark` | `mod.oneDark` |

### Examples

```tsx
// Search panel at the top + autocomplete
<CodeEditor
  extensions={[
    ['@codemirror/search', { top: true }],
    '@codemirror/autocomplete',
  ]}
  ...
/>

// One Dark theme (from @codemirror, not @uiw)
<CodeEditor
  extensions={[['@codemirror/theme-one-dark', 'oneDark']]}
  ...
/>

// @uiw theme via per-package spec (NOT the meta-package @uiw/codemirror-themes)
<CodeEditor
  extensions={[['@uiw/codemirror-theme-monokai', 'monokai']]}
  ...
/>
```

---

## Themes

Pass a theme name string to the `theme` prop:

| | | | |
|---|---|---|---|
| `androidstudio` | `andromeda` | `atomone` | `aura` |
| `basic` | `bbedit` | `copilot` | `darcula` |
| `dracula` | `duotone` | `eclipse` | `github` |
| `material` | `monokai` | `nord` | `okaidia` |
| `solarized` | `sublime` | `vscode` | `xcode` |

```tsx
<CodeEditor theme="nord" ... />
```

Switch theme at runtime:

```ts
await api.setTheme('monokai');
await api.setTheme(undefined); // remove theme, use CM6 default
```

---

## Supported languages

Pass any of these to the `language` prop or `api.setLanguage()`:

`angular` `cpp` `css` `go` `html` `java` `javascript` `jinja` `json`
`less` `lezer` `liquid` `markdown` `php` `python` `rust` `sass` `sql`
`vue` `wast` `xml` `yaml`

Legacy modes (100+ additional languages via `@codemirror/legacy-modes`) can be loaded
manually with `api.loadExtension()`:

```ts
const { swift } = await api.loadExtension('@codemirror/legacy-modes/mode/swift');
```

---

## Viewport settings

```ts
interface ViewportSettings {
  intialScale?: number;      // note: matches viewport meta attribute spelling
  maximumScale?: number;
  minimumScale?: number;
  userScalable?: boolean;
  viewportWidth?: string | number;  // e.g. 'device-width'
}
```

```tsx
<CodeEditor
  viewport={{
    intialScale: 1,
    minimumScale: 0.5,
    maximumScale: 3,
    userScalable: true,
    viewportWidth: 'device-width',
  }}
  ...
/>
```

---

## Full example

```tsx
import { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeEditor from 'react-native-codeditor';
import type { WebViewAPI, HistorySize } from 'react-native-codeditor';

const INITIAL_CODE = `function greet(name) {
  return 'Hello, ' + name + '!';
}
`;

const VIEWPORT = {
  intialScale: 1,
  minimumScale: 0.5,
  maximumScale: 3,
  userScalable: true,
  viewportWidth: 'device-width',
};

export default function EditorScreen() {
  const apiRef = useRef<WebViewAPI | null>(null);
  const [status, setStatus] = useState('Loading…');
  const [historySize, setHistorySize] = useState<HistorySize | null>(null);

  const handleInitialized = useCallback((api: WebViewAPI) => {
    apiRef.current = api;
    setStatus('Ready');
    void api.focus();
  }, []);

  const handleUndo = useCallback(() => { apiRef.current?.editor.historyUndo(); }, []);
  const handleRedo = useCallback(() => { apiRef.current?.editor.historyRedo(); }, []);

  const handleSwitchLanguage = useCallback(async () => {
    await apiRef.current?.editor.setLanguage('python');
    await apiRef.current?.editor.setTheme('github');
  }, []);

  return (
    // KeyboardAvoidingView shrinks the editor when the soft keyboard appears.
    // Requires android:windowSoftInputMode="adjustResize" in AndroidManifest.xml.
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.btn} onPress={handleUndo}>
          <Text style={styles.btnText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleRedo}>
          <Text style={styles.btnText}>Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSwitchLanguage}>
          <Text style={styles.btnText}>→ Python</Text>
        </TouchableOpacity>
        <Text style={styles.status}>
          {status}{historySize ? `  ↩${historySize.undo} ↪${historySize.redo}` : ''}
        </Text>
      </View>

      <CodeEditor
        content={INITIAL_CODE}
        language="javascript"
        theme="darcula"
        viewport={VIEWPORT}
        onInitialized={handleInitialized}
        onContentUpdate={(text) => setStatus(`${text.length} chars`)}
        onHistorySizeUpdate={setHistorySize}
        onLog={(...args) => console.log('[editor]', ...args)}
        onError={(err) => console.error('[editor]', err)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
    backgroundColor: '#2d2d2d',
  },
  btn: {
    backgroundColor: '#0e639c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  btnText: { color: '#fff', fontSize: 13 },
  status: { color: '#aaa', fontSize: 12, flex: 1, textAlign: 'right' },
});
```

---

## How to run example

```bash
# 1. Generate WebView assets from node_modules
npm run copy-assets

# 2. Build lib/ (ESM + type declarations)
npm run prepare

# 3. Copy assets to the Android project
cp -r src/assets/* example/android/app/src/main/assets/

# 4. Launch the example app
cd example && npx expo run:android
```

Re-run steps 3–4 after any change to `src/assets/`. Re-run step 2 as well after any TypeScript source change.

---

## Building the library (contributors)

### Initial setup

```bash
git clone https://github.com/burdiuz/react-native-codeditor.git
cd react-native-codeditor

# Install dependencies.
# --ignore-scripts prevents broken postinstall scripts in transitive git deps,
# but @actualwave/js-codemirror-package needs its postinstall to build dist/.
# Run it explicitly once after install:
npm install --ignore-scripts
node node_modules/@actualwave/js-codemirror-package/start.js
```

### Prepare the library

```bash
# Generate WebView assets from node_modules + build lib/ (ESM + type declarations).
# Both steps run together via prepare:
npm run prepare

# Or run only the asset generation (faster, skips TypeScript compilation):
npm run copy-assets
```

`copy-assets` reads from `node_modules/@actualwave/js-codemirror-package/dist/` and writes:
- `src/assets/codemirror-editor.umd.js` — plain IIFE bundle (no `import`/`export`)
- `src/assets/codemirror/` — individual CM6 module files

### Copy assets to the example app

`expo prebuild` does not handle the `react-native.config.js` asset declarations from a
workspace-linked package. Copy manually instead:

```bash
mkdir -p example/android/app/src/main/assets
cp -r src/assets/* example/android/app/src/main/assets/
```

Run this after `npm run copy-assets` or any time the assets change.

### Run the example

```bash
cd example && npx expo run:android
```

Metro resolves `react-native-codeditor` from the workspace root via `lib/module/index.js`.
**Run `npm run prepare` after every TypeScript source change.**

Do NOT use `./gradlew clean` — it fails because `react-native-webview` codegen JNI
directories don't exist until after the first successful build. Use `npx expo run:android` directly.

### Type-check

```bash
npx tsc --noEmit
```

---

## Updating dependencies

### Updating CodeMirror assets

`src/assets/codemirror/` and `src/assets/codemirror-editor.umd.js` are generated from
`@actualwave/js-codemirror-package` (a devDependency). To update to a new version:

```bash
# 1. Update the version in package.json, then:
npm install --ignore-scripts
node node_modules/@actualwave/js-codemirror-package/start.js

# 2. Regenerate the assets:
npm run copy-assets

# 3. Copy to the example app:
cp -r src/assets/* example/android/app/src/main/assets/
```

---

## Known issues

### Android: ghost text / cursor not advancing when typing fast

On Android, the soft keyboard communicates with the WebView via the IME (Input Method
Editor) composition protocol — a sequence of `compositionstart` / `compositionupdate` /
`compositionend` events that CM6 tracks internally. If anything disrupts the composition
window (such as a synchronous `MessageEvent` dispatched into the WebView via
`injectJavaScript`, which is how the DDA HOST→GUEST transport works), the IME and CM6 can
end up with different views of the document. Symptoms:

- Characters appear to the right of the cursor instead of advancing it.
- "Ghost" text that cannot be deleted — selecting it and pressing delete deletes adjacent
  text instead because CM6's internal state doesn't contain those characters.

This is a WebView + IME interaction issue and does not have a simple fix at the library
level. If you hit it reliably, the workaround is to call `api.editor.setValue(await api.editor.getValue())`
to resync CM6's state with what is displayed, which clears the ghost text (at the cost of
collapsing undo history for that edit).

### iOS: editor URI must be provided manually

The default `editorUri` points to `file:///android_asset/editor.html` (Android only). On
iOS you must compute the main bundle path at runtime and pass it via the `editorUri` prop
(see [iOS: provide the editor URI](#4-ios-provide-the-editor-uri)).

---

## License

MIT
