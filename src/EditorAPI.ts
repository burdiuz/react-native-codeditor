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

export interface EditorAPI {
  getValue(): Promise<string>;
  setValue(value: string): Promise<void>;
  resetValue(value?: string): Promise<void>;
  setLanguage(name: string): Promise<void>;
  setExtensions(specs: ExtensionSpec[]): Promise<void>;
  setTheme(themeName?: string): Promise<void>;
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
  scrollToCursor(margin?: number): Promise<void>;
  startCompletion(): Promise<void>;
  setCompletions(items: CompletionItem[]): Promise<void>;
  setSoftKeyboard(enabled: boolean): Promise<void>;
  loadExtension(moduleName: string): Promise<object>;
  destroy(): Promise<void>;
}
