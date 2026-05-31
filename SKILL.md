---
name: react-native-codeditor
description: >
  Embed and control a CodeMirror 6 code editor inside a React Native WebView using
  @actualwave/react-native-codeditor. Use when adding a code editor to a React Native
  app, controlling editor content/language/theme/cursor/selection/history programmatically,
  registering custom keyboard shortcuts, handling editor events (content changes, history
  size, selection), or setting up native asset copying for Android/iOS.
license: MIT
compatibility: React Native ≥ 0.71, react-native-webview ≥ 11, Android WebView 61+, iOS with WKWebView. expo-file-system required for iOS URI resolution.
metadata:
  package: "@actualwave/react-native-codeditor"
  npm: "https://www.npmjs.com/package/@actualwave/react-native-codeditor"
  repository: "https://github.com/burdiuz/react-native-codeditor"
---

# @actualwave/react-native-codeditor — Agent Skill

CodeMirror 6 code editor for React Native, embedded in a WebView with a full bidirectional RPC bridge. Fully offline — all CodeMirror assets are bundled. Works on Android and iOS.

---

## Exports

```ts
import CodeEditor from '@actualwave/react-native-codeditor';
// or named:
import { CodeEditor } from '@actualwave/react-native-codeditor';

// Types
import type {
  CodeEditorProps,    // all props for <CodeEditor />
  WebViewAPI,         // api object received in onInitialized
  WebViewAPIHandlers, // handler callbacks
  WebViewRef,         // { injectJavaScript, requestFocus? }
  InitialConfig,      // { content?, language?, extensions?, theme?, viewport? }
  EditorAPI,          // full interface of api.editor proxy methods
  ExtensionSpec,      // string | [string, string] | [string, object] | unknown
  ViewportSettings,   // { intialScale?, maximumScale?, minimumScale?, userScalable?, viewportWidth? }
  CursorPosition,     // { line: number, ch: number, index: number }
  HistorySize,        // { undo: number, redo: number }
  CompletionItem,     // { label, type?, detail?, info? }
} from '@actualwave/react-native-codeditor';
```

---

## Installation

```bash
npm install @actualwave/react-native-codeditor react-native-webview
```

**Copy assets to Android** (required — WebView loads these files at runtime):

```bash
mkdir -p android/app/src/main/assets/codeditor
cp -r node_modules/@actualwave/react-native-codeditor/src/assets/* android/app/src/main/assets/codeditor/
```

**Expo (recommended)** — add plugin to `app.json`, then `expo prebuild`:

```json
{ "expo": { "plugins": ["@actualwave/react-native-codeditor"] } }
```

**iOS** — requires `expo-file-system` for the runtime bundle path:

```bash
npm install expo-file-system
```

```tsx
import * as FileSystem from 'expo-file-system';
const IOS_EDITOR_URI = Platform.OS === 'ios'
  ? (FileSystem.bundleDirectory ?? '') + 'assets/codeditor/editor.html'
  : undefined;
<CodeEditor editorUri={IOS_EDITOR_URI} ... />
```

**Android manifest** — add `adjustResize` so the editor shrinks when the keyboard appears:

```xml
<activity android:windowSoftInputMode="adjustResize" ... />
```

**After upgrading** — always re-copy assets:

```bash
cp -r node_modules/@actualwave/react-native-codeditor/src/assets/* android/app/src/main/assets/codeditor/
```

---

## Basic usage

```tsx
import { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import CodeEditor from '@actualwave/react-native-codeditor';
import type { WebViewAPI, HistorySize } from '@actualwave/react-native-codeditor';

export default function EditorScreen() {
  const apiRef = useRef<WebViewAPI | null>(null);

  const handleInitialized = useCallback((api: WebViewAPI) => {
    apiRef.current = api;
    void api.focus(); // opens Android soft keyboard
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CodeEditor
        content="const x = 42;"
        language="javascript"
        theme="darcula"
        onInitialized={handleInitialized}
        onContentUpdate={(content) => console.log(content.length)}
        onHistorySizeUpdate={(size) => console.log(size.undo, size.redo)}
        onLog={(...args) => console.log('[editor]', ...args)}
        onError={(err) => console.error('[editor]', err)}
      />
    </KeyboardAvoidingView>
  );
}
```

---

## Architecture

Two runtimes connected via DDA (Deferred Data Access) RPC over the WebView bridge:

```
React Native (HOST)                WebView (GUEST)
──────────────────                 ───────────────
CodeEditor component
  └─ WebViewAPI
       └─ initializeHost()   ◄──►  initializeGuest()
            api.editor.*  ──────►  EditorController methods
            (DDA proxy)   ◄──────  Promise results
```

**Out-of-band messages** (bypass DDA, sent via `ReactNativeWebView.postMessage`):

| Type | Direction | Meaning |
|---|---|---|
| `__editorReady__` | WebView→RN | Editor fully painted; `onInitialized` fires |
| `__contentChange__` | WebView→RN | Keystroke — carries `{ value, undo, redo }` |
| `__selectionChange__` | WebView→RN | Selection changed — carries selected text |
| `__shortcut__` | WebView→RN | Registered shortcut triggered — carries name string |
| `__editorLog__` | WebView→RN | `window.log(...)` from WebView |
| `__editorError__` | WebView→RN | `window.onerror` from WebView |

---

## DDA lazy mode — critical rule

DDA operates in **lazy mode**: a proxy call builds a command chain but does NOT send it until the returned value is awaited. **Every `api.editor.*` call MUST be awaited.**

```ts
// ✅ correct
await apiRef.current?.editor?.historyUndo();

// ✅ correct — async IIFE in useEffect
void (async () => { await apiRef.current!.editor.setLanguage('python'); })();

// ❌ wrong — command is never sent
void apiRef.current?.editor.historyUndo();
apiRef.current?.editor.historyUndo();
```

---

## Props

### Required callbacks

| Prop | Type | Description |
|---|---|---|
| `onInitialized` | `(api: WebViewAPI) => void` | Fires when editor is fully ready. Store `api` here. Call `api.focus()` for Android keyboard. |
| `onContentUpdate` | `(content: string) => void` | Every keystroke, full document text. |
| `onHistorySizeUpdate` | `(size: HistorySize) => void` | Every keystroke, `{ undo, redo }` depths. |
| `onLog` | `(...args: unknown[]) => void` | `window.log()` from the WebView. |
| `onError` | `(error: unknown) => void` | `window.onerror` from the WebView. |

### Optional callbacks

| Prop | Type | Description |
|---|---|---|
| `onSelectionChange` | `(text: string) => void` | Called when selection changes; receives selected text (empty string when collapsed). |
| `onShortcut` | `(name: string) => void` | Called when a shortcut registered via `api.editor.registerShortcut()` is triggered. Receives the name string passed at registration time. |

### Editor configuration

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | `''` | Initial document content. Uncontrolled — don't write `onContentUpdate` output back to this prop. |
| `language` | `string` | — | Syntax language, e.g. `'javascript'`, `'python'`. Loaded on demand. |
| `extensions` | `ExtensionSpec[]` | `[]` | CM6 extension specs. |
| `theme` | `string` | — | Theme name, e.g. `'darcula'`, `'monokai'`. |
| `viewport` | `ViewportSettings` | — | `<meta name="viewport">` options. |

### WebView / layout

| Prop | Type | Default | Description |
|---|---|---|---|
| `editorUri` | `string` | `'file:///android_asset/codeditor/editor.html'` | Override for iOS — use `FileSystem.bundleDirectory`. |
| `allowFileAccess` | `boolean` | `true` | Required for `file://` asset loading. |
| `renderBlockingView` | `() => ReactNode` | `() => <BlockingView />` | Loading overlay while editor initialises. |

---

## `WebViewAPI` — editor control

`api` is received in `onInitialized`. `api.editor` is a DDA proxy — all its methods return Promises.

### Focus

```ts
api.focus(): Promise<void>
// Also calls webView.requestFocus() for Android keyboard.
```

### Content

```ts
api.editor.getValue(): Promise<string>
api.editor.setValue(value: string): Promise<void>        // preserves history
api.editor.resetValue(value?: string): Promise<void>     // clears history
```

### Language / theme / extensions

```ts
api.editor.setLanguage(name: string): Promise<void>
api.editor.setTheme(themeName?: string): Promise<void>   // undefined removes theme
api.editor.setExtensions(specs: ExtensionSpec[]): Promise<void>
```

### Cursor and selection

```ts
api.editor.getCursor(where?: 'from' | 'to' | 'head'): Promise<CursorPosition>
// CursorPosition = { line: number, ch: number, index: number }  (line is 0-based)
api.editor.setCursor(line: number, ch?: number): Promise<void>
api.editor.getSelection(): Promise<string>
api.editor.setSelection(anchor: number, head?: number): Promise<void>
api.editor.replaceSelection(text: string): Promise<void>
api.editor.cancelSelection(): Promise<void>
```

### History

```ts
api.editor.historyUndo(): Promise<boolean>
api.editor.historyRedo(): Promise<boolean>
api.editor.historyClear(): Promise<void>
api.editor.historySize(): Promise<HistorySize>  // { undo, redo }
```

### Editing commands

```ts
api.editor.indentMore(): Promise<boolean>
api.editor.indentLess(): Promise<boolean>
api.editor.toggleComment(): Promise<boolean>
api.editor.moveLineUp(): Promise<boolean>
api.editor.moveLineDown(): Promise<boolean>
api.editor.deleteLine(): Promise<boolean>
api.editor.selectLine(): Promise<boolean>
api.editor.selectParentSyntax(): Promise<boolean>
```

### Autocomplete

```ts
api.editor.startCompletion(): Promise<void>
api.editor.setCompletions(items: CompletionItem[]): Promise<void>
// CompletionItem = { label, type?, detail?, info? }
```

### Custom shortcuts (hardware keyboard)

Register key bindings from the React Native side. When triggered in the editor, fires `onShortcut` on the `<CodeEditor>` component with the given name. Shortcuts use `Prec.highest` priority, overriding all built-in keymaps.

```ts
api.editor.registerShortcut(key: string, name: string): Promise<void>
api.editor.unregisterShortcut(key: string): Promise<void>
```

Key notation: `Mod` = Cmd on macOS/iOS, Ctrl on Android/Windows. Examples: `'Mod-s'`, `'Mod-Enter'`, `'Mod-Shift-f'`, `'F5'`.

```tsx
// Register in onInitialized, handle in onShortcut
<CodeEditor
  onInitialized={async (api) => {
    await api.editor.registerShortcut('Mod-s', 'save');
    await api.editor.registerShortcut('Mod-Enter', 'run');
  }}
  onShortcut={(name) => {
    if (name === 'save') handleSave();
    if (name === 'run') handleRun();
  }}
  ...
/>
```

### Font / keyboard / scroll / advanced

```ts
api.editor.setFontSize(size: number): Promise<void>
api.editor.setSoftKeyboard(enabled: boolean): Promise<void>
api.editor.setViewport(options: ViewportSettings): Promise<void>
api.editor.scrollToCursor(margin?: number): Promise<void>
api.editor.loadExtension(moduleName: string): Promise<object>
api.editor.destroy(): Promise<void>
```

### Synchronous RN-side only

```ts
api.injectJavaScript(code: string): void
api.requestFocus(): void
```

---

## Content model

`content` prop is **uncontrolled** — it sets the initial document once. Do not write `onContentUpdate` output back to it (causes feedback loop + cursor reset on every keystroke).

To push content programmatically use the API:

```ts
await api.editor.setValue(newCode);      // preserve history
await api.editor.resetValue(newCode);    // clear history (e.g. opening new file)
```

---

## Extension specs

`ExtensionSpec` accepted by `extensions` prop and `api.editor.setExtensions()`:

| Form | Example | Behaviour |
|---|---|---|
| Package name string | `'@codemirror/search'` | Loaded via built-in registry |
| `[packageName, exportName]` | `['@uiw/codemirror-theme-nord', 'nord']` | Returns `mod[exportName]` |
| `[packageName, options]` | `['@codemirror/search', { top: true }]` | Resolver called with options |
| Pre-built extension | `myExtension` | Used as-is |

Built-in registry: `@codemirror/autocomplete`, `@codemirror/search`, `@codemirror/lint`, `@codemirror/collab`, `@codemirror/theme-one-dark`.

---

## Supported languages

`angular` `cpp` `css` `go` `html` `java` `javascript` `jinja` `json` `less` `lezer`
`liquid` `markdown` `php` `python` `rust` `sass` `sksl` `sql` `vue` `wast` `xml` `yaml`

Legacy modes (100+ more) via `loadExtension`:

```ts
const { swift } = await api.editor.loadExtension('@codemirror/legacy-modes/mode/swift');
```

---

## Themes

`androidstudio` `andromeda` `atomone` `aura` `basic` `bbedit` `copilot` `darcula`
`dracula` `duotone` `eclipse` `github` `monokai` `nord` `okaidia` `solarized`
`sublime` `tokyoNight` `vscode` `xcode`

Two-word themes use camelCase: `tokyoNight`, `githubDark`, `githubLight`, `vscodeDark`, `xcodeDark`, `xcodeLight`, `solarizedDark`, `solarizedLight`.

---

## Built-in keyboard shortcuts

The editor ships with standard CodeMirror 6 keymaps active by default.

### Editing (`defaultKeymap`)
| Key | Action |
|---|---|
| `Enter` | Insert newline |
| `Backspace` / `Delete` | Delete character |
| `Tab` | Indent |
| `Shift-Tab` | Unindent |
| `Mod-a` | Select all |

### History (`historyKeymap`)
| Key | Action |
|---|---|
| `Mod-z` | Undo |
| `Mod-y` / `Mod-Shift-z` | Redo |

### Search (`searchKeymap`)
| Key | Action |
|---|---|
| `Mod-f` | Open search panel |
| `F3` / `Mod-g` | Find next |
| `Escape` | Close search panel |

### Code folding (`foldKeymap`)
| Key | Action |
|---|---|
| `Mod-Shift-[` | Fold at cursor |
| `Mod-Shift-]` | Unfold at cursor |

### Autocomplete (`completionKeymap`)
| Key | Action |
|---|---|
| `Ctrl-Space` | Trigger completion |
| `Enter` / `Tab` | Accept completion |
| `Escape` | Close completion |

> On mobile, most shortcuts require a hardware keyboard. Use `api.editor.*` commands programmatically instead.

---

## Keyboard / layout

Wrap in `KeyboardAvoidingView` so the editor shrinks when the soft keyboard appears:

```tsx
<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <CodeEditor ... />
</KeyboardAvoidingView>
```

Call `api.focus()` inside `onInitialized` to trigger the Android soft keyboard immediately.

---

## Common pitfalls

**DDA calls not dispatched** — forgetting `await` silently does nothing. Every `api.editor.*` must be awaited.

**`onInitialized` timing** — `api` is not available until this fires. Guard all API calls with `if (!apiRef.current) return`.

**Content feedback loop** — do not pass `onContentUpdate` output back to the `content` prop.

**Android assets not copied** — if the WebView shows "Error loading page", the `src/assets/` files haven't been copied to `android/app/src/main/assets/codeditor/`. Re-run the copy command.

**iOS URI** — the default `editorUri` is Android-only. iOS requires `FileSystem.bundleDirectory + 'assets/codeditor/editor.html'` from `expo-file-system`.

**Upgrading the library** — always re-copy assets after upgrading:

```bash
cp -r node_modules/@actualwave/react-native-codeditor/src/assets/* android/app/src/main/assets/codeditor/
```
