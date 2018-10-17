const { createMessagePortDispatcher } = MessagePortDispatcher;

let _initializeId;
let editor = null;

const augmentData = (data) => ({
  meta: {
    historySize: editor ? editor.historySize() : 0,
  },
  data,
});

const augmentEvent = ({ type, data }) => ({
  type,
  data: augmentData(data),
});

const dispatcherTarget = {
  postMessage: (data) => {
    console.log('POST:', typeof data, data);
    window.postMessage(data, '*');
  },
  addEventListener: (eventType, listener) => {
    document.addEventListener(eventType, listener);
    window.addEventListener(eventType, listener);
  },
};

const dispatcher = createMessagePortDispatcher(dispatcherTarget, null, null, augmentEvent);

window.onerror = (message, source, lineno, colno, error) => {
  const data = { message: String(message), source, lineno, colno };

  if (error) {
    data.error = Object.assign({}, error);
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

/**
 * Initialize all API event listeners
 */
const initEventListeners = () => {
  listenForAPIEvent('setValue', (event) => {
    editor.setValue(event.data);
  });

  listenForAPIEvent('getValue', () => editor.getValue());

  listenForAPIEvent('historyUndo', () => {
    editor.undo();
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

    Object.keys(settings).forEach((key) => {
      editor.setOption(key, settings[key]);
    });
  });

  listenForAPIEvent(
    'handshake',
    ({ data }) => {
      clearInterval(_initializeId);

      if (!data) {
        return;
      }

      const { content = '', history } = data;
      editor.setValue(content);
      if (history) {
        editor.setHistory(history);
      } else {
        editor.clearHistory();
      }
    },
    'initialized',
  );
};

/**
 * Entry point of WebView code editor, inits API and starts handshake
 * @param {*} settings
 */
const runEditor = (settings) => {
  initEventListeners();

  editor = new CodeMirror(document.body, settings);
  editor.setSize('100%', '100%');

  _initializeId = setInterval(() => dispatcher.dispatchEvent('initialize'), 500);
};
