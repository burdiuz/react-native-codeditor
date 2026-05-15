import { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeEditor from 'react-native-codeditor';
import type { HistorySize, WebViewAPI } from 'react-native-codeditor';

const LANGUAGES = ['javascript', 'python', 'rust', 'sql', 'markdown', 'json'];

const THEMES = ['darcula', 'monokai', 'github', 'nord', 'dracula', 'vscode'];

const SAMPLES: Record<string, string> = {
  javascript: `// Welcome to CodeEditor
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));
`,
  python: `# Welcome to CodeEditor
def greet(name):
    return f'Hello, {name}!'

print(greet('World'))
`,
  rust: `// Welcome to CodeEditor
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}
`,
  sql: `-- Welcome to CodeEditor
SELECT *
FROM users
WHERE name = 'World'
ORDER BY id DESC
LIMIT 10;
`,
  markdown: `# Welcome to CodeEditor

A React Native code editor powered by **CodeMirror 6**.

## Features

- Syntax highlighting
- Multiple themes
- Offline — no CDN required
`,
  json: `{
  "name": "react-native-codeditor",
  "version": "0.1.0",
  "description": "CodeMirror 6 in a WebView",
  "features": ["offline", "cm6", "dda-bridge"]
}
`,
};

const VIEWPORT = {
  intialScale: 1,
  minimumScale: 0.5,
  maximumScale: 2,
  userScalable: true,
  viewportWidth: 'device-width',
};

export default function App() {
  const apiRef = useRef<WebViewAPI | null>(null);
  const [historySize, setHistorySize] = useState<HistorySize | null>(null);
  const [status, setStatus] = useState('Initializing...');
  const [langIndex, setLangIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const language = LANGUAGES[langIndex]!;
  const theme = THEMES[themeIndex]!;

  const handleInitialized = useCallback((api: WebViewAPI) => {
    apiRef.current = api;
    setStatus('Ready');
    void api.focus();
  }, []);

  const handleContentUpdate = useCallback((content: string) => {
    setStatus(`${content.length} chars`);
  }, []);

  const handleHistorySize = useCallback((size: HistorySize) => {
    setHistorySize(size);
  }, []);

  const handleLog = useCallback((...args: unknown[]) => {
    console.log('[Editor]', ...args);
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('[Editor Error]', error);
  }, []);

  const handleLoad = useCallback((e: unknown) => {
    console.log('[WebView] onLoad', e);
  }, []);

  const handleLoadStart = useCallback((e: unknown) => {
    console.log('[WebView] onLoadStart', e);
  }, []);

  const handleLoadEnd = useCallback((e: unknown) => {
    console.log('[WebView] onLoadEnd', e);
  }, []);

  const handleWebViewRef = useCallback((ref: unknown) => {
    console.log('[WebView] ref updated:', ref ? 'set' : 'null');
  }, []);

  const handleUndo = useCallback(async () => {
    try { await apiRef.current?.editor?.historyUndo(); } catch (e) { console.error('[Undo]', e); }
  }, []);

  const handleRedo = useCallback(async () => {
    try { await apiRef.current?.editor?.historyRedo(); } catch (e) { console.error('[Redo]', e); }
  }, []);

  const handleNextLanguage = useCallback(async () => {
    const next = (langIndex + 1) % LANGUAGES.length;
    const nextLang = LANGUAGES[next]!;
    setLangIndex(next);
    try {
      await apiRef.current?.editor?.setLanguage(nextLang);
      await apiRef.current?.editor?.resetValue(SAMPLES[nextLang]);
    } catch (e) { console.error('[Lang]', e); }
  }, [langIndex]);

  const handleNextTheme = useCallback(async () => {
    const next = (themeIndex + 1) % THEMES.length;
    setThemeIndex(next);
    try { await apiRef.current?.editor?.setTheme(THEMES[next]); } catch (e) { console.error('[Theme]', e); }
  }, [themeIndex]);

  const handleResetValue = useCallback(async () => {
    try { await apiRef.current?.editor?.resetValue(SAMPLES[language]); } catch (e) { console.error('[Reset]', e); }
  }, [language]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolbarScroll}
        contentContainerStyle={styles.toolbar}
      >
        <TouchableOpacity style={styles.button} onPress={handleUndo}>
          <Text style={styles.buttonText}>↩ Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRedo}>
          <Text style={styles.buttonText}>↪ Redo</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={handleNextLanguage}>
          <Text style={styles.buttonText}>Lang: {language}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextTheme}>
          <Text style={styles.buttonText}>Theme: {theme}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleResetValue}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.statusBar}>
        <Text style={styles.status}>
          {status}
          {historySize ? `  ↩${historySize.undo} ↪${historySize.redo}` : ''}
        </Text>
      </View>
      <CodeEditor
        content={SAMPLES[language]}
        language={language}
        theme={theme}
        viewport={VIEWPORT}
        onInitialized={handleInitialized}
        onContentUpdate={handleContentUpdate}
        onHistorySizeUpdate={handleHistorySize}
        onLog={handleLog}
        onError={handleError}
        onLoad={handleLoad}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onWebViewRefUpdated={handleWebViewRef}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#1e1e1e',
  },
  toolbarScroll: {
    height: 48,
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: '#2d2d2d',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48,
    backgroundColor: '#2d2d2d',
    gap: 8,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#555',
    marginHorizontal: 4,
  },
  statusBar: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#252525',
  },
  button: {
    backgroundColor: '#0e639c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  resetButton: {
    backgroundColor: '#6c3f3f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  status: {
    color: '#aaa',
    fontSize: 12,
  },
});
