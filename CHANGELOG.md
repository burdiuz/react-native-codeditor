# Changelog

## 1.2.6

### Fixed
- `resetValue()` also resets the vertical and horizontal scroll, which `view.setState()` leaves at the previous
  document's offsets. `historyClear()` still keeps the scroll.
- Unmounting `CodeEditor` while the WebView handshake is still pending no longer produces an unhandled
  promise rejection 30 s later. `WebViewAPI.stop()` (now also called when the WebView unmounts) abandons the
  pending handshake; a handshake that fails while the WebView is still mounted is reported as before.

## 1.2.4

### Fixed
- `react`, `react-native` and `expo` are no longer in `dependencies`. `react` and `react-native` were
  pinned to exact versions next to the peer entries, so a project on any other version got a second nested
  copy; `expo` was pulled into bare React Native projects although only `app.plugin.js` uses it.
  `react` / `react-native` stay peers; `expo` is now an optional peer (needed only for the Expo config plugin).

## 1.2.2

### Fixed
- A `content` change that arrives while the WebView is still booting is now applied on initialization instead of being dropped.
- `resetValue()` and `historyClear()` now really empty the undo history (they rebuild the editor
  state, keeping the live extensions). Before, they only dispatched an unrecorded transaction, so
  earlier undo steps survived and were applied on top of the new document.

### Added
- `saveState()` / `restoreState(snapshot)`: JSON snapshot of document, selection, undo/redo history
  and scroll offset, so a document can leave and re-enter an editor without losing its history.
  `restoreState` keeps the live extensions (language, theme, shortcuts, completions) and fires the
  content / history-size callbacks. Exports the `EditorStateSnapshot` type.
  If a snapshot's undo history does not match its document (undo/redo would throw "Applying change
  set to a document with the wrong length"), `restoreState` logs a warning and restores the text,
  selection and scroll only, with an empty history.

## 1.2.1

### Changed
- Updated bundled `@actualwave/codemirror-package` assets to 0.1.5, which adds the
  `@actualwave/codemirror-lang-js-completion` language package for JavaScript completion.
- `js-completion` is added to the example app's `supportExtensions`.
- Static completions set via `setCompletions()` are now registered as language data instead of
  `autocompletion({ override })`, so they merge with the language's own completion sources
  (including embedded-language ones such as `sql`/`sksl` tagged templates, Tailwind, React Native)
  and are suppressed inside embedded languages.

## 1.2.0

### Added
- `languages` prop on `<CodeEditor>` and `api.editor.registerLanguage(name, packageName)` for
  language packages that don't follow the `@codemirror/lang-{name}` naming convention
  (e.g. `{ sksl: '@actualwave/codemirror-lang-sksl' }`). The prop registers before the initial
  `language` is resolved.
- `languageConfig` prop and `setLanguage(name, config?, embeds?)` — options passed to the
  language factory (e.g. `{ jsx: true, typescript: true }`).
- `embeds` prop, `api.editor.registerTaggedTemplate()` and `api.editor.registerSupportExtension()`
  for tagged-template DSL embeddings and support extensions in `javascript`.
- `CompletionItem` and `EmbedsConfig` types are now exported.
- `THIRD_PARTY_NOTICES`, `SKILL.md` and `CHANGELOG.md` are included in the package.

### Changed
- Updated bundled `@actualwave/codemirror-package` assets to 0.1.4.
- `sksl` (and other `@actualwave/codemirror-lang-*` packages) are no longer pre-registered by the
  bundled codemirror-package (it was an undocumented built-in in 1.1.0). Pass
  `languages={{ sksl: '@actualwave/codemirror-lang-sksl' }}` or call `api.editor.registerLanguage()`
  before using them; otherwise `setLanguage` rejects with "No language support found".
- `lib/typescript` no longer contains declaration files for repo config files.

### Fixed
- Documentation and example for the iOS `editorUri` used `FileSystem.bundleDirectory`, which is not
  available from the default `expo-file-system` entry point in Expo SDK 55. Use
  `new File(Paths.bundle, 'assets/codeditor/editor.html').uri`.
