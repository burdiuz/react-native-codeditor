import { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { File, Paths } from 'expo-file-system';
import CodeEditor from '@actualwave/react-native-codeditor';
import type { CompletionItem, EmbedsConfig, HistorySize, WebViewAPI } from '@actualwave/react-native-codeditor';

// On iOS the editor HTML lives in the app bundle. Paths.bundle gives the
// file:// path to the .app folder; assets/codeditor/ is copied there by the
// library Expo config plugin (app.plugin.js).
const IOS_EDITOR_URI = Platform.OS === 'ios'
  ? new File(Paths.bundle, 'assets/codeditor/editor.html').uri
  : undefined;

// Not following the @codemirror/lang-{name} convention, so must be registered.
const CUSTOM_LANGUAGES = { sksl: '@actualwave/codemirror-lang-sksl' };

// Module-level constants on purpose: a new `embeds` reference re-resolves the language.
const EMBEDS: EmbedsConfig = {
  taggedTemplates: [
    '@actualwave/codemirror-lang-embed-sql',
    '@actualwave/codemirror-lang-embed-graphql',
    '@actualwave/codemirror-lang-embed-css',
    '@actualwave/codemirror-lang-embed-sksl',
    '@actualwave/codemirror-lang-embed-glsl',
    '@actualwave/codemirror-lang-embed-icu-messageformat',
  ],
  supportExtensions: [
    '@actualwave/codemirror-lang-embed-tailwind',
    '@actualwave/codemirror-lang-embed-react-native',
    '@actualwave/codemirror-lang-js-completion',
  ],
};
const JAVASCRIPT_CONFIG = { jsx: true, typescript: true };

// Static list pushed via setCompletions() — must NOT show up inside sql`` / sksl``.
const STATIC_COMPLETIONS: CompletionItem[] = [
  { label: 'useState', type: 'function', detail: 'react' },
  { label: 'useLayoutEffect', type: 'function', detail: 'react' },
  { label: 'KeyboardAvoidingView', type: 'class', detail: 'react-native' },
];

const LANGUAGES = ['javascript', 'sksl', 'python', 'rust', 'sql', 'markdown', 'json'];

const THEMES = ['darcula', 'monokai', 'github', 'nord', 'dracula', 'vscode'];

const SAMPLES: Record<string, string> = {
  javascript: `// Welcome to CodeEditor
// Embeds check: type inside the templates, e.g. "vo" -> void, "fl" -> float, "SE" -> SELECT.
// Outside them the static list (use...) and React Native suggestions should still work.
import { View, Text } from 'react-native';

const shader = sksl\`

\`;

const query = sql\`

\`;

function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));
`,
  sksl: `// Welcome to CodeEditor
// Returns a solid red color (RGBA)
half4 main(vec2 coords) {
    // coords are in pixel units (0 to width, 0 to height)
    return half4(1.0, 0.0, 0.0, 1.0);
}
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
    void api.editor.setCompletions(STATIC_COMPLETIONS);
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
      // <CodeEditor> pushes `language` (with languageConfig/embeds) itself; a direct
      // setLanguage(nextLang) here would race it and drop the embeds.
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
        languages={CUSTOM_LANGUAGES}
        languageConfig={language === 'javascript' ? JAVASCRIPT_CONFIG : undefined}
        embeds={EMBEDS}
        theme={theme}
        viewport={VIEWPORT}
        editorUri={IOS_EDITOR_URI}
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
