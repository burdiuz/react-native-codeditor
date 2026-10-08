# Changelog

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
