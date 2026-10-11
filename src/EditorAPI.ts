export interface ViewportSettings {
  maximumScale?: number;
  minimumScale?: number;
  intialScale?: number;
  userScalable?: boolean;
  viewportWidth?: string | number;
}

export interface CursorPosition {
  line: number;
  ch: number;
  index: number;
}

export interface HistorySize {
  undo: number;
  redo: number;
}

/**
 * Extension spec forms accepted by createEditor / setExtensions / setTheme:
 *   - string → package name loaded via the registry, e.g. '@codemirror/autocomplete'
 *   - [string, string] → [packageName, exportName], e.g. ['@uiw/codemirror-theme-darcula', 'darcula']
 *   - [string, object] → [packageName, options] passed to the registered resolver
 *   - anything else → treated as a pre-built CodeMirror Extension and used as-is
 */
export type ExtensionSpec = string | [string, unknown] | unknown;

export interface CompletionItem {
  label: string;
  type?: 'function' | 'class' | 'variable' | 'keyword' | 'namespace' | 'type' | 'text';
  detail?: string;
  info?: string;
}

/**
 * Tagged-template DSL embedding config for the 'javascript' language (e.g.
 * `` sql`...` ``, `` gql`...` ``), passed per-call to setLanguage/createEditor
 * and merged with whatever's been registered globally via
 * registerTaggedTemplate/registerSupportExtension.
 *   - taggedTemplates: package names exporting createEmbedding(), e.g.
 *     '@actualwave/codemirror-lang-embed-sql'.
 *   - supportExtensions: package names (or [name, config] tuples) exporting
 *     createSupportExtension(), e.g. '@actualwave/codemirror-lang-embed-tailwind',
 *     or ['@actualwave/codemirror-lang-embed-react-native', { modules }]. Not
 *     JS-specific by name or contract — currently only mixed into 'javascript'.
 */
export interface EmbedsConfig {
  taggedTemplates?: string[];
  supportExtensions?: Array<string | [string, Record<string, unknown>]>;
}

/** Opaque, JSON-serializable snapshot produced by `saveState()`. */
export interface EditorStateSnapshot {
  state: unknown;
  scrollTop: number;
  scrollLeft: number;
}

export interface EditorAPI {
  getValue(): Promise<string>;
  setValue(value: string): Promise<void>;
  resetValue(value?: string): Promise<void>;
  setLanguage(name: string, config?: Record<string, unknown>, embeds?: EmbedsConfig): Promise<void>;
  setExtensions(specs: ExtensionSpec[]): Promise<void>;
  setTheme(themeName?: string): Promise<void>;
  setFontSize(size: number): Promise<void>;
  setViewport(options: ViewportSettings): Promise<void>;
  focus(): Promise<void>;
  getCursor(where?: 'from' | 'to' | 'head'): Promise<CursorPosition>;
  setCursor(line: number, ch?: number): Promise<void>;
  getSelection(): Promise<string>;
  setSelection(anchor: number, head?: number): Promise<void>;
  replaceSelection(text: string): Promise<void>;
  cancelSelection(): Promise<void>;
  indentMore(): Promise<boolean>;
  indentLess(): Promise<boolean>;
  toggleComment(): Promise<boolean>;
  moveLineUp(): Promise<boolean>;
  moveLineDown(): Promise<boolean>;
  deleteLine(): Promise<boolean>;
  selectLine(): Promise<boolean>;
  selectParentSyntax(): Promise<boolean>;
  historyUndo(): Promise<boolean>;
  historyRedo(): Promise<boolean>;
  historyClear(): Promise<void>;
  historySize(): Promise<HistorySize>;
  /**
   * Snapshot of document, selection, undo/redo history and scroll offset. Plain JSON, so it
   * can be kept in memory or persisted. Restore with `restoreState()`.
   */
  saveState(): Promise<EditorStateSnapshot>;
  /**
   * Replaces the editor state with a `saveState()` snapshot, keeping the live extensions
   * (language, theme, shortcuts, completions). Set language/theme first. The content and
   * history-size callbacks fire afterwards.
   */
  restoreState(snapshot: EditorStateSnapshot): Promise<void>;
  scrollToCursor(margin?: number): Promise<void>;
  startCompletion(): Promise<void>;
  setCompletions(items: CompletionItem[]): Promise<void>;
  setSoftKeyboard(enabled: boolean): Promise<void>;
  registerShortcut(key: string, name: string): Promise<void>;
  unregisterShortcut(key: string): Promise<void>;
  /**
   * Maps a language name to an npm package that doesn't follow the
   * `@codemirror/lang-{name}` convention (e.g. `'sksl'` → `'@actualwave/codemirror-lang-sksl'`),
   * for the lifetime of this editor page. The package must be one bundled in the
   * WebView assets. Takes effect on the next setLanguage() call — follow it with
   * setLanguage(name) to apply. Alternative to the `languages` prop on CodeEditor,
   * which registers before the initial language is resolved.
   */
  registerLanguage(name: string, packageName: string): Promise<void>;
  /**
   * Registers a tagged-template DSL embedding package globally, for the lifetime of
   * this editor page — picked up by any subsequent setLanguage('javascript', ...) call
   * (including the one already resolved at createEditor time, so call this before the
   * language is first set to 'javascript' if you want it included immediately, or follow
   * it with setLanguage('javascript', ...) to re-resolve). Alternative to passing
   * `embeds.taggedTemplates` per-call.
   */
  registerTaggedTemplate(packageName: string): Promise<void>;
  /**
   * Registers a support-extension package (e.g. a completion source with no nested
   * grammar) globally — same timing/re-resolve caveat as registerTaggedTemplate.
   * Alternative to passing `embeds.supportExtensions` per-call. Not JS-specific by
   * name or contract — currently only mixed into the 'javascript' language.
   */
  registerSupportExtension(packageName: string, config?: Record<string, unknown>): Promise<void>;
  loadExtension(moduleName: string): Promise<object>;
  destroy(): Promise<void>;
}
