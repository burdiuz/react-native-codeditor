import { initializeHost } from '@actualwave/webview-interface';
import type { EditorAPI, ExtensionSpec, HistorySize, ViewportSettings } from './EditorAPI';

export interface WebViewAPIHandlers {
  onInitialized: (api: WebViewAPI) => void;
  onHistorySizeUpdate: (size: HistorySize) => void;
  onContentUpdate: (content: string) => void;
  onLog: (...args: unknown[]) => void;
  onError: (error: unknown) => void;
}

export interface WebViewRef {
  injectJavaScript: (js: string) => void;
  requestFocus?: () => void;
}

export interface InitialConfig {
  content?: string;
  language?: string;
  extensions?: ExtensionSpec[];
  theme?: string;
  viewport?: ViewportSettings;
}

/**
 * WebViewAPI wraps the DDA proxy to the WebView's EditorController.
 * All editor methods are async DDA calls; focus() additionally calls requestFocus()
 * on the native WebView ref to ensure the Android soft keyboard appears.
 */
class WebViewAPI implements EditorAPI {
  private webView: WebViewRef | null = null;
  private pageApi: EditorAPI | null = null;
  private stopFn: (() => void) | null = null;
  private _onMessage: ((event: unknown) => void) | null = null;
  private _initialConfig: InitialConfig = {};
  private handlers: WebViewAPIHandlers;

  constructor(handlers: WebViewAPIHandlers) {
    this.handlers = handlers;
  }

  setInitialConfig(config: InitialConfig) {
    this._initialConfig = config;
  }

  initialize(webView: WebViewRef) {
    this.webView = webView;
    this.pageApi = null;
    this.stopFn?.();
    this.stopFn = null;

    // Methods exposed to the GUEST via DDA. The GUEST calls these on nativeApi.
    const hostRoot = {
      getInitialConfig: () => this._initialConfig,
      onContentChange: (value: string, historySize?: HistorySize) => {
        this.handlers.onContentUpdate(value);
        if (historySize) {
          this.handlers.onHistorySizeUpdate(historySize);
        }
      },
      onLog: (...args: unknown[]) => this.handlers.onLog(...args),
      onError: (error: unknown) => this.handlers.onError(error),
    };

    const { onMessage, connection } = initializeHost({
      webView,
      root: hostRoot,
      handshakeTimeout: 30000,
    });

    this._onMessage = onMessage as unknown as (event: unknown) => void;

    void connection.then(({ root: pageApi, stop }) => {
      this.pageApi = pageApi as unknown as EditorAPI;
      this.stopFn = stop;
      // onInitialized is called when __editorReady__ arrives (after createEditor completes)
    });
  }

  // Intercepts out-of-band messages before DDA sees them:
  //   __editorLog__   — window.log() calls from the WebView
  //   __editorError__ — window.onerror / unhandledrejection from the WebView
  //   __editorReady__ — sent after createEditor + theme/language load; fires onInitialized
  // Everything else is forwarded to the DDA subscriber.
  onMessage = (event: unknown) => {
    const raw = (event as { nativeEvent?: { data?: string }; data?: string })?.nativeEvent?.data ?? (event as { data?: string })?.data;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.type === '__editorError__') {
          this.handlers.onError(parsed.data);
          return;
        }
        if (parsed?.type === '__editorLog__') {
          this.handlers.onLog(...(Array.isArray(parsed.data) ? parsed.data : [parsed.data]));
          return;
        }
        if (parsed?.type === '__editorReady__') {
          // Fires only after the GUEST finishes createEditor (theme + language applied),
          // so the BlockingView is removed only when the editor is visually complete.
          this.handlers.onInitialized(this);
          return;
        }
      } catch {
        // not JSON — fall through to DDA
      }
    }
    this._onMessage?.(event);
  };

  stop() {
    this.stopFn?.();
    this.stopFn = null;
    this._onMessage = null;
    this.pageApi = null;
  }

  injectJavaScript(code: string) {
    this.webView?.injectJavaScript(code);
  }

  requestFocus() {
    this.webView?.requestFocus?.();
  }

  // --- EditorAPI delegation ---

  getValue = () => this.pageApi!.getValue();

  setValue = (value: string) => this.pageApi!.setValue(value);

  resetValue = (value?: string) => this.pageApi!.resetValue(value);

  setLanguage = (name: string) => this.pageApi!.setLanguage(name);

  setExtensions = (specs: ExtensionSpec[]) => this.pageApi!.setExtensions(specs);

  setTheme = (themeName?: string) => this.pageApi!.setTheme(themeName);

  setViewport = (options: ViewportSettings) => this.pageApi!.setViewport(options);

  focus = () => {
    try {
      this.webView?.requestFocus?.();
    } catch {
      // requestFocus is best-effort on Android
    }
    return this.pageApi!.focus();
  };

  getCursor = (where?: 'from' | 'to' | 'head') => this.pageApi!.getCursor(where);

  setCursor = (line: number, ch?: number) => this.pageApi!.setCursor(line, ch);

  getSelection = () => this.pageApi!.getSelection();

  setSelection = (anchor: number, head?: number) => this.pageApi!.setSelection(anchor, head);

  replaceSelection = (text: string) => this.pageApi!.replaceSelection(text);

  cancelSelection = () => this.pageApi!.cancelSelection();

  historyUndo = () => this.pageApi!.historyUndo();

  historyRedo = () => this.pageApi!.historyRedo();

  historyClear = () => this.pageApi!.historyClear();

  historySize = () => this.pageApi!.historySize();

  scrollToCursor = (margin?: number) => this.pageApi!.scrollToCursor(margin);

  loadExtension = (moduleName: string) => this.pageApi!.loadExtension(moduleName);

  destroy = () => this.pageApi!.destroy();
}

export default WebViewAPI;
