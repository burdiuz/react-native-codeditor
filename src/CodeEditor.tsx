import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import WebViewEditor from './webview';
import WebViewAPI from './WebViewAPI';
import BlockingView from './BlockingView';
import { generateInitScript } from './utils';
import { EditorEvent, getResponseEvent } from './EditorEvent';
import type { ViewportSettings } from './EditorRequests';

const styles = StyleSheet.create({
  container: { position: 'relative', flex: 1 },
  webView: { flex: 1 },
});

const WHITELIST: string[] = [];
const BASE_URL = 'https://actualwave.com/react-native-codeditor/1';

const DEFAULT_MODULES = [
  'addon/fold/foldgutter',
  'addon/edit/matchbrackets',
  'addon/edit/matchtags',
  'addon/search/match-highlighter',
  'addon/edit/closebrackets',
  'addon/edit/closetag',
  'addon/fold/foldcode',
  'addon/fold/foldgutter',
  'addon/fold/brace-fold',
  'addon/fold/comment-fold',
  'addon/fold/indent-fold',
  'addon/fold/xml-fold',
];

const DEFAULT_SETTINGS: Record<string, unknown> = {
  inputStyle: 'contenteditable',
  styleActiveLine: true,
};

export interface CodeEditorProps {
  onInitialized: (api: WebViewAPI) => void;
  onHistorySizeUpdate: (size: unknown) => void;
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
  autoUpdateInterval?: number;
  theme?: string;
  modules?: string[];
  content?: string;
  settings?: Record<string, unknown>;
  viewport?: ViewportSettings;
  allowFileAccess?: boolean;
  forceUpdates?: boolean;
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
  autoUpdateInterval = 1000,
  theme,
  modules = DEFAULT_MODULES,
  content = '',
  settings = DEFAULT_SETTINGS,
  viewport = {},
  allowFileAccess = true,
  forceUpdates = false,
}: CodeEditorProps) => {
  const [initialized, setInitialized] = useState(false);

  const editorRef = useRef<WebViewEditor | null>(null);
  const apiRef = useRef<WebViewAPI | null>(null);
  const currentContentRef = useRef(content);
  const initializedRef = useRef(false);

  // Updated on every render so stable callbacks can always read latest prop values
  const callbacksRef = useRef({ onInitialized, onContentUpdate, onHistorySizeUpdate, onLog, onError, onWebViewRefUpdated });
  callbacksRef.current = { onInitialized, onContentUpdate, onHistorySizeUpdate, onLog, onError, onWebViewRefUpdated };
  const propsRef = useRef({ forceUpdates, viewport, settings, content, theme, modules, autoUpdateInterval });
  propsRef.current = { forceUpdates, viewport, settings, content, theme, modules, autoUpdateInterval };

  // Lazy sync initialization — runs once, before first render
  if (editorRef.current === null) {
    editorRef.current = new WebViewEditor(theme, modules);
  }

  const [source, setSource] = useState(() => ({
    html: editorRef.current!.toString(),
    baseUrl: BASE_URL,
  }));

  const [initScript, setInitScript] = useState(() =>
    generateInitScript(settings, theme, content, viewport, autoUpdateInterval),
  );

  if (apiRef.current === null) {
    const getValueHandler = (event: unknown) => {
      const newContent = (event as { data: string }).data;
      currentContentRef.current = newContent;
      callbacksRef.current.onContentUpdate(newContent);
    };

    apiRef.current = new WebViewAPI({
      onInitialized: (api) => {
        initializedRef.current = true;
        setInitialized(true);
        callbacksRef.current.onInitialized(api);

        const { forceUpdates: fUpdates, viewport: vp, settings: st } = propsRef.current;
        if (fUpdates) {
          void api.setViewport(vp);
          void api.updateSettings(st);
          void api.setValue(currentContentRef.current);
          void api.historyClear();
        }

        api.addEventListener(getResponseEvent(EditorEvent.GET_VALUE), getValueHandler);
        api.addEventListener(EditorEvent.AUTO_UPDATE, getValueHandler);
      },
      onHistorySizeUpdate: (size) => callbacksRef.current.onHistorySizeUpdate(size),
      onLog: (log) => callbacksRef.current.onLog(log),
      onError: (error) => callbacksRef.current.onError(error),
    });
  }

  // theme or modules changed → rebuild editor HTML and reload WebView
  const prevThemeRef = useRef(theme);
  const prevModulesRef = useRef(modules);
  useEffect(() => {
    if (prevThemeRef.current === theme && prevModulesRef.current === modules) return;
    prevThemeRef.current = theme;
    prevModulesRef.current = modules;

    const editor = editorRef.current!;
    editor.setTheme(theme);
    editor.resetModules([...modules]);

    setSource({ html: editor.toString(), baseUrl: BASE_URL });
    setInitScript(generateInitScript(settings, theme, content, viewport, autoUpdateInterval));
    setInitialized(false);
    initializedRef.current = false;
  }, [theme, modules, settings, content, viewport, autoUpdateInterval]);

  // settings changed → regenerate init script and push to live editor
  const prevSettingsRef = useRef(settings);
  useEffect(() => {
    if (prevSettingsRef.current === settings) return;
    prevSettingsRef.current = settings;

    setInitScript(generateInitScript(settings, theme, content, viewport, autoUpdateInterval));
    if (initializedRef.current) {
      void apiRef.current!.updateSettings(settings);
    }
  }, [settings, theme, content, viewport, autoUpdateInterval]);

  // viewport changed → push to live editor
  useEffect(() => {
    if (!initializedRef.current) return;
    void apiRef.current!.setViewport(viewport);
  }, [viewport]);

  // content changed → push to live editor
  useEffect(() => {
    if (initializedRef.current && currentContentRef.current !== content) {
      void apiRef.current!.setValue(content);
      currentContentRef.current = content;
    }
  }, [content]);

  const handleWebViewReference = useCallback((webView: WebView | null) => {
    setInitialized(false);
    initializedRef.current = false;

    if (webView) {
      apiRef.current!.initialize(webView as unknown as import('./WebViewAPI').WebViewRef, {
        content: currentContentRef.current,
        settings: propsRef.current.settings,
      });
    }

    callbacksRef.current.onWebViewRefUpdated?.(webView);
  }, []);

  const handleMessage = useCallback((event: unknown) => {
    apiRef.current!.onMessage(event);
  }, []);

  const handleLoadError = useCallback((...args: unknown[]) => {
    console.log('WebView Load Error:', ...args);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={handleWebViewReference}
        onMessage={handleMessage as (event: Parameters<NonNullable<React.ComponentProps<typeof WebView>['onMessage']>>[0]) => void}
        onError={handleLoadError as React.ComponentProps<typeof WebView>['onError']}
        onLoad={onLoad as React.ComponentProps<typeof WebView>['onLoad']}
        onLoadStart={onLoadStart as React.ComponentProps<typeof WebView>['onLoadStart']}
        onLoadProgress={onLoadProgress as React.ComponentProps<typeof WebView>['onLoadProgress']}
        onLoadEnd={onLoadEnd as React.ComponentProps<typeof WebView>['onLoadEnd']}
        onNavigationStateChange={onNavigationStateChange as React.ComponentProps<typeof WebView>['onNavigationStateChange']}
        allowFileAccess={allowFileAccess}
        source={source}
        injectedJavaScript={initScript}
        style={styles.webView}
        javaScriptEnabled
        originWhitelist={WHITELIST}
      />
      {!initialized && renderBlockingView()}
    </View>
  );
};

export default CodeEditor;
