import { initializeHost } from '@actualwave/webview-interface';
import type { EditorAPI, ExtensionSpec, HistorySize, ViewportSettings } from './EditorAPI';

export interface WebViewAPIHandlers {
  onInitialized: (api: WebViewAPI) => void;
  onHistorySizeUpdate: (size: HistorySize) => void;
  onContentUpdate: (content: string) => void;
  onSelectionChange?: (text: string) => void;
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
 * WebViewAPI wires the DDA bridge between React Native and the WebView editor.
 * After onInitialized fires, call api.editor to reach the full EditorAPI proxy.
 * api.focus() is the only method kept here directly — it additionally calls
 * requestFocus() on the native WebView ref to trigger the Android soft keyboard.
 */
class WebViewAPI {
  private webView: WebViewRef | null = null;
  private _editor: EditorAPI | null = null;
  private stopFn: (() => void) | null = null;
  private _onMessage: ((event: unknown) => void) | null = null;
  private _initialConfig: InitialConfig = {};
  private handlers: WebViewAPIHandlers;

  constructor(handlers: WebViewAPIHandlers) {
    this.handlers = handlers;
  }

  /** DDA proxy to the WebView's EditorController. Available after onInitialized fires. */
  get editor(): EditorAPI {
    return this._editor!;
  }

  setInitialConfig(config: InitialConfig) {
    this._initialConfig = config;
  }

  initialize(webView: WebViewRef) {
    this.webView = webView;
    this._editor = null;
    this.stopFn?.();
    this.stopFn = null;

    // Methods exposed to the GUEST via DDA. The GUEST calls these on nativeApi.
    const hostRoot = {
      getInitialConfig: () => this._initialConfig,
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
      this._editor = pageApi as unknown as EditorAPI;
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
        if (parsed?.type === '__contentChange__') {
          // One-way notification — no DDA round trip, no injectJavaScript response.
          // Keeps content updates off the DDA channel so injectJavaScript is never
          // called while the user is typing (avoids disrupting Android IME composition).
          const { value, undo, redo } = parsed.data ?? {};
          this.handlers.onContentUpdate(value ?? '');
          this.handlers.onHistorySizeUpdate({ undo: undo ?? 0, redo: redo ?? 0 });
          return;
        }
        if (parsed?.type === '__selectionChange__') {
          this.handlers.onSelectionChange?.(typeof parsed.data === 'string' ? parsed.data : '');
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
    this._editor = null;
  }

  injectJavaScript(code: string) {
    this.webView?.injectJavaScript(code);
  }

  requestFocus() {
    this.webView?.requestFocus?.();
  }

  // focus() is kept here rather than on editor because it must also call
  // requestFocus() on the native WebView ref to raise the Android soft keyboard.
  focus = (): Promise<void> => {
    try {
      this.webView?.requestFocus?.();
    } catch {
      // requestFocus is best-effort on Android
    }
    return this._editor!.focus();
  };
}

export default WebViewAPI;
