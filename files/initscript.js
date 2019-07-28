const { createMessagePortDispatcher } = MessagePortDispatcher;

let _initializeId;
let editor = null;

const generateViewportParamsString = (intial, scalable, width, max, min) => {
  const params = {
    width,
    'initial-scale': intial,
    'maximum-scale': max,
    'minimum-scale': min,
    'user-scalable': scalable ? 'yes' : 'no',
  };

  return Object.keys(params)
    .filter((name) => params[name] !== undefined)
    .map((name) => `${name}=${params[name]}`)
    .join(', ');
};

const setViewportParams = (
  intial = 1,
  scalable = true,
  width = 'device-width',
  max = undefined,
  min = undefined,
) => {
  const content = generateViewportParamsString(intial, scalable, width, max, min);
  let meta = document.querySelector('meta[name="viewport"]');

  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', content);
    document.querySelector('head').prepend(meta);
  }
};

/*
  Set viewport scaling options
*/
const setViewport = ({
  intialScale,
  userScalable,
  viewportWidth,
  maximumScale,
  minimumScale,
} = {}) => setViewportParams(intialScale, userScalable, viewportWidth, maximumScale, minimumScale);

const augmentData = (data) => ({
  meta: {
    historySize: editor ? editor.historySize() : null,
  },
  data,
});

const augmentEvent = ({ type, data }) => ({
  type,
  data: augmentData(data),
});

const dispatcherTarget = {
  postMessage: (data) => {
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(data));
  },
  addEventListener: (eventType, listener) => {
    document.addEventListener(eventType, listener);
    window.addEventListener(eventType, listener);
  },
};

const dispatcher = createMessagePortDispatcher(dispatcherTarget, null, null, augmentEvent);

window.onerror = (message, source, lineno, colno, error) => {
  const data = {
    message: message || !error ? String(message) : error.message,
    source,
    lineno,
    colno,
  };

  if (error) {
    data.error = Object.assign({ message: message }, error);
  }

  dispatcher.dispatchEvent('wvGlobalError', data);
};

window.log = (...message) => {
  dispatcher.dispatchEvent('wvLog', message);
};

/**
 * Generate API event request/response pair
 * @param {*} type
 * @param {*} handler
 * @param {*} responseType
 */
const listenForAPIEvent = (type, handler, responseType) =>
  dispatcher.addEventListener(type, (event) => {
    if (responseType === undefined) {
      responseType = `${type}Response`;
    }

    const result = handler(event);

    if (responseType) {
      dispatcher.dispatchEvent(responseType, result);
    }
  });

const setEditorSettings = (settings) =>
  Object.keys(settings).forEach((key) => {
    editor.setOption(key, settings[key]);
  });

/**
 * Initialize all API event listeners
 */
const initEventListeners = (autoUpdateInterval) => {
  listenForAPIEvent('setViewport', (event) => {
    setViewport(event.data || {});
  });

  listenForAPIEvent('setValue', (event) => {
    const newValue = event.data || '';
    const currentValue = editor.getValue();

    if (newValue !== currentValue) {
      editor.setValue(newValue);
    }
  });

  listenForAPIEvent('getValue', () => editor.getValue());

  listenForAPIEvent('resetValue', (event) => {
    editor.setValue(event.data);
    editor.clearHistory();
  });

  listenForAPIEvent('focus', () => editor.focus());

  listenForAPIEvent('getCursor', ({ data }) => editor.getCursor(data));

  listenForAPIEvent('setCursor', ({ data: { line, ch, options } }) =>
    editor.setCursor(line, ch, options),
  );

  listenForAPIEvent('getSelection', () => editor.getSelection());

  listenForAPIEvent('setSelection', ({ data: { anchor, head, options } }) =>
    editor.setSelection(anchor, head, options),
  );

  listenForAPIEvent('replaceSelection', (event) => editor.replaceSelection(event.data));

  listenForAPIEvent('cancelSelection', (event) => editor.setSelection(editor.getCursor('head')));

  listenForAPIEvent('historyUndo', () => {
    editor.undo();
  });

  listenForAPIEvent('execCommand', ({ data: { command, args = [] } }) => {
    editor.execCommand(command, ...args);
  });

  listenForAPIEvent('historyRedo', () => {
    editor.redo();
  });

  listenForAPIEvent('historyClear', () => {
    editor.clearHistory();
  });

  listenForAPIEvent('historyRead', () => editor.getHistory());

  listenForAPIEvent('historyWrite', (event) => {
    editor.setHistory(event.data);
  });

  listenForAPIEvent('historySize', () => editor.historySize());

  listenForAPIEvent('scrollToCursor', (event) => {
    const margin = event.data;

    editor.scrollIntoView(null, margin);
  });

  listenForAPIEvent('updateSettings', (event) => {
    const settings = event.data;

    setEditorSettings(settings);
  });

  listenForAPIEvent(
    'handshake',
    ({ data }) => {
      clearInterval(_initializeId);

      if (!data) {
        return;
      }

      const { content = '', history, settings } = data;

      editor.setValue(content);

      if (history) {
        editor.setHistory(history);
      } else {
        editor.clearHistory();
      }

      if (settings) {
        setEditorSettings(settings);
      }
    },
    'initialized',
  );

  let waitingForUpdate = false;

  if (autoUpdateInterval) {
    editor.on('change', () => {
      if (!waitingForUpdate) {
        waitingForUpdate = true;

        setTimeout(() => {
          waitingForUpdate = false;
          dispatcher.dispatchEvent('autoUpdate', editor.getValue());
        }, autoUpdateInterval);
      }
    });
  }
};

/**
 * Entry point of WebView code editor, inits API and starts handshake
 * @param {*} settings
 */
const runEditor = (settings, autoUpdateInterval = 0) => {
  editor = new CodeMirror(document.body, settings);
  editor.setSize('100%', '100%');

  initEventListeners(autoUpdateInterval);

  _initializeId = setInterval(() => dispatcher.dispatchEvent('initialize'), 500);
};
