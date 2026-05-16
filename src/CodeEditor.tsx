import React, { useState, useEffect, useRef, useCallback } from "react";
import { Platform, View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import WebViewAPI from "./WebViewAPI";
import BlockingView from "./BlockingView";
import type {
  EditorAPI,
  ExtensionSpec,
  HistorySize,
  ViewportSettings,
} from "./EditorAPI";

const styles = StyleSheet.create({
  container: { position: "relative", flex: 1 },
  webView: { flex: 1 },
});

// Stable empty array used as the default for the extensions prop.
// A new [] on every render would cause the extensions effect to fire every re-render,
// calling setExtensions([]) and wiping the theme from the extensionCompartment.
const DEFAULT_EXTENSIONS: ExtensionSpec[] = [];

/**
 * Default WebView source URI for the bundled editor page.
 * Android: assets are copied to android/app/src/main/assets/ by react-native link.
 * iOS: override via editorUri prop until a MainBundlePath helper is added.
 */
const DEFAULT_EDITOR_URI = Platform.select({
  android: "file:///android_asset/codeditor/editor.html",
  default: "file:///android_asset/codeditor/editor.html",
  ios: "assets/codeditor/editor.html",
});

export interface CodeEditorProps {
  onInitialized: (api: WebViewAPI) => void;
  onHistorySizeUpdate: (size: HistorySize) => void;
  onLog: (...args: unknown[]) => void;
  onError: (error: unknown) => void;
  onContentUpdate: (content: string) => void;
  onWebViewRefUpdated?: (webView: WebView | null) => void;
  onLoad?: (event: unknown) => void;
  onLoadStart?: (event: unknown) => void;
  onLoadProgress?: (event: unknown) => void;
  onLoadEnd?: (event: unknown) => void;
  onNavigationStateChange?: (event: unknown) => void;
  renderBlockingView?: () => React.ReactNode;
  /** Language name for syntax highlighting, e.g. 'javascript', 'python'. */
  language?: string;
  /** Additional CodeMirror extension specs loaded on top of the language. */
  extensions?: ExtensionSpec[];
  /** Theme name from the @uiw/codemirror-themes collection, e.g. 'darcula', 'monokai'. */
  theme?: string;
  content?: string;
  viewport?: ViewportSettings;
  allowFileAccess?: boolean;
  /** Override the default editor HTML URI (useful on iOS where the bundle path varies). */
  editorUri?: string;
}

const CodeEditor = ({
  onInitialized,
  onHistorySizeUpdate,
  onLog,
  onError,
  onContentUpdate,
  onWebViewRefUpdated,
  onLoad,
  onLoadStart,
  onLoadProgress,
  onLoadEnd,
  onNavigationStateChange,
  renderBlockingView = () => <BlockingView />,
  language,
  extensions = DEFAULT_EXTENSIONS,
  theme,
  content = "",
  viewport,
  allowFileAccess = true,
  editorUri = DEFAULT_EDITOR_URI,
}: CodeEditorProps) => {
  const [initialized, setInitialized] = useState(false);

  const apiRef = useRef<WebViewAPI | null>(null);
  const currentContentRef = useRef(content);
  const initializedRef = useRef(false);

  // Always-current prop snapshot for stable callbacks
  const callbacksRef = useRef({
    onInitialized,
    onContentUpdate,
    onHistorySizeUpdate,
    onLog,
    onError,
    onWebViewRefUpdated,
  });
  callbacksRef.current = {
    onInitialized,
    onContentUpdate,
    onHistorySizeUpdate,
    onLog,
    onError,
    onWebViewRefUpdated,
  };
  const propsRef = useRef({ content, language, extensions, theme, viewport });
  propsRef.current = { content, language, extensions, theme, viewport };

  if (apiRef.current === null) {
    apiRef.current = new WebViewAPI({
      onInitialized: (api) => {
        initializedRef.current = true;
        setInitialized(true);
        callbacksRef.current.onInitialized(api);
      },
      onContentUpdate: (value) => {
        currentContentRef.current = value;
        callbacksRef.current.onContentUpdate(value);
      },
      onHistorySizeUpdate: (size) =>
        callbacksRef.current.onHistorySizeUpdate(size),
      onLog: (...args) => callbacksRef.current.onLog(...args),
      onError: (error) => callbacksRef.current.onError(error),
    });
  }

  const callEditor = (fn: (e: EditorAPI) => Promise<unknown>) => {
    if (initializedRef.current) {
      void (async () => {
        try {
          await fn(apiRef.current!.editor);
        } catch (e) {
          callbacksRef.current.onError(e);
        }
      })();
    }
  };

  // Push content changes to live editor (skip initial render)
  const prevContentRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevContentRef.current === null) {
      prevContentRef.current = content;
      return;
    }
    if (prevContentRef.current === content) return;
    prevContentRef.current = content;

    if (initializedRef.current && currentContentRef.current !== content) {
      currentContentRef.current = content;
      callEditor((e) => e.setValue(content));
    }
  }, [content]);

  // Push language changes to live editor
  const prevLanguageRef = useRef<string | undefined | null>(null);
  useEffect(() => {
    if (prevLanguageRef.current === null) {
      prevLanguageRef.current = language;
      return;
    }
    if (prevLanguageRef.current === language) return;
    prevLanguageRef.current = language;

    if (language) callEditor((e) => e.setLanguage(language));
  }, [language]);

  // Push theme changes to live editor
  const prevThemeRef = useRef<string | undefined | null>(null);
  useEffect(() => {
    if (prevThemeRef.current === null) {
      prevThemeRef.current = theme;
      return;
    }
    if (prevThemeRef.current === theme) return;
    prevThemeRef.current = theme;

    callEditor((e) => e.setTheme(theme));
  }, [theme]);

  // Push extension changes to live editor
  const prevExtensionsRef = useRef<ExtensionSpec[] | null>(null);
  useEffect(() => {
    if (prevExtensionsRef.current === null) {
      prevExtensionsRef.current = extensions;
      return;
    }
    if (prevExtensionsRef.current === extensions) return;
    prevExtensionsRef.current = extensions;

    callEditor((e) => e.setExtensions(extensions));
  }, [extensions]);

  // Push viewport changes to live editor
  const prevViewportRef = useRef<ViewportSettings | undefined | null>(null);
  useEffect(() => {
    if (prevViewportRef.current === null) {
      prevViewportRef.current = viewport;
      return;
    }
    if (prevViewportRef.current === viewport) return;
    prevViewportRef.current = viewport;

    if (viewport) callEditor((e) => e.setViewport(viewport));
  }, [viewport]);

  const handleWebViewReference = useCallback((webView: WebView | null) => {
    setInitialized(false);
    initializedRef.current = false;

    if (webView) {
      const {
        content: c,
        language: l,
        extensions: e,
        theme: t,
        viewport: v,
      } = propsRef.current;
      currentContentRef.current = c;
      apiRef.current!.setInitialConfig({
        content: c,
        language: l,
        extensions: e,
        theme: t,
        viewport: v,
      });
      apiRef.current!.initialize(
        webView as unknown as import("./WebViewAPI").WebViewRef,
      );
    }

    callbacksRef.current.onWebViewRefUpdated?.(webView);
  }, []);

  const handleMessage = useCallback((event: unknown) => {
    apiRef.current!.onMessage(event);
  }, []);

  const handleLoadError = useCallback((...args: unknown[]) => {
    console.log("WebView Load Error:", ...args);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={handleWebViewReference}
        onMessage={
          handleMessage as (
            event: Parameters<
              NonNullable<React.ComponentProps<typeof WebView>["onMessage"]>
            >[0],
          ) => void
        }
        onError={
          handleLoadError as React.ComponentProps<typeof WebView>["onError"]
        }
        onLoad={onLoad as React.ComponentProps<typeof WebView>["onLoad"]}
        onLoadStart={
          onLoadStart as React.ComponentProps<typeof WebView>["onLoadStart"]
        }
        onLoadProgress={
          onLoadProgress as React.ComponentProps<
            typeof WebView
          >["onLoadProgress"]
        }
        onLoadEnd={
          onLoadEnd as React.ComponentProps<typeof WebView>["onLoadEnd"]
        }
        onNavigationStateChange={
          onNavigationStateChange as React.ComponentProps<
            typeof WebView
          >["onNavigationStateChange"]
        }
        allowFileAccess={allowFileAccess}
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowingReadAccessToURL={Platform.OS === "ios" ? "file://" : undefined}
        source={{ uri: editorUri }}
        style={styles.webView}
        javaScriptEnabled
        originWhitelist={["file://*", "about:*"]}
      />
      {!initialized && renderBlockingView()}
    </View>
  );
};

export default CodeEditor;
