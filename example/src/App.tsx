import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CodeEditor from 'react-native-codeditor';
import type { WebViewAPI } from 'react-native-codeditor';

const INITIAL_CONTENT = `// Welcome to CodeEditor
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));
`;

const MODULES = [
  'mode/javascript/javascript',
  'addon/fold/foldgutter',
  'addon/fold/foldcode',
  'addon/fold/brace-fold',
  'addon/fold/comment-fold',
  'addon/edit/matchbrackets',
  'addon/edit/closebrackets',
  'addon/search/match-highlighter',
];

const SETTINGS = {
  mode: 'javascript',
  lineNumbers: true,
  inputStyle: 'contenteditable' as const,
  styleActiveLine: true,
  matchBrackets: true,
  autoCloseBrackets: true,
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
  const [historySize, setHistorySize] = useState<{ undo: number; redo: number } | null>(null);
  const [status, setStatus] = useState('Initializing...');

  const handleInitialized = useCallback((api: WebViewAPI) => {
    apiRef.current = api;
    setStatus('Ready');
    void api.focus();
  }, []);

  const handleContentUpdate = useCallback((content: string) => {
    setStatus(`${content.length} chars`);
  }, []);

  const handleHistorySize = useCallback((size: unknown) => {
    setHistorySize(size as { undo: number; redo: number });
  }, []);

  const handleLog = useCallback((...args: unknown[]) => {
    console.log('[Editor]', ...args);
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('[Editor Error]', error);
  }, []);

  const handleUndo = useCallback(() => {
    apiRef.current?.historyUndo();
  }, []);

  const handleRedo = useCallback(() => {
    apiRef.current?.historyRedo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.button} onPress={handleUndo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRedo}>
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
        <Text style={styles.status}>
          {status}
          {historySize ? `  ↩${historySize.undo} ↪${historySize.redo}` : ''}
        </Text>
      </View>
      <CodeEditor
        content={INITIAL_CONTENT}
        theme="darcula"
        modules={MODULES}
        settings={SETTINGS}
        viewport={VIEWPORT}
        onInitialized={handleInitialized}
        onContentUpdate={handleContentUpdate}
        onHistorySizeUpdate={handleHistorySize}
        onLog={handleLog}
        onError={handleError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#1e1e1e',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2d2d2d',
    gap: 8,
  },
  button: {
    backgroundColor: '#0e639c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  status: {
    color: '#aaa',
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
});
