import MessagePortDispatcher from '@actualwave/messageport-dispatcher';
import Request from './Request';
import { EditorEvent } from './EditorEvent';
import EditorRequests from './EditorRequests';

const rawEvents = {
  // FIXME don't really remember why I added this
};

const composeErrorMessage = (event) => {
  const { data } = event;

  if (data.error) {
    return data.error;
  }

  const { message, source, lineno, colno } = data;

  return { name: 'Error', message, fileName: source, lineNumber: lineno, columnNumber: colno };
};

class MessagePortDummy {
  constructor(target) {
    this.listeners = new Set();
    this.target = target;
  }

  postMessage = (...args) => this.target.postMessage(...args);

  addEventListener = (type, listener) => {
    if (type !== 'message') {
      throw new Error(`MessagePortDummy is intended for single event type and its not "${type}"`);
    }

    this.listeners.add(listener);
  };

  callMessageListeners = (message) => {
    this.listeners.forEach((listener) => listener(message));
  };
}

class EditorCommunication extends EditorRequests {
  webView = null;

  dispatcher = null;

  initialized = false;

  constructor({ onInitialized, onHistorySizeUpdate, onLog, onError }) {
    super((eventType, data = null) => new Request(this.dispatcher, eventType, data));
    this.handlers = { onInitialized, onHistorySizeUpdate, onLog, onError };
  }

  initialize(webView) {
    this.initialized = false;
    this.webView = webView;
    this.port = new MessagePortDummy(webView);
    this.dispatcher = new MessagePortDispatcher(this.port, null, this.preprocessIncomingMessages);

    this.dispatcher.addEventListener(EditorEvent.INIT, this.webViewInitializeHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_GLOBAL_ERROR, this.webViewGlobalErrorHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_LOG, this.webViewLogHandler);
  }

  preprocessIncomingMessages = (event) => {
    const { data: eventData } = event;
    if (rawEvents[event.type]) {
      return event;
    }

    if (eventData && typeof eventData === 'object') {
      const { meta, data } = eventData;

      if (meta) {
        this.readMessageMetaData(meta);
        event.data = data;
      }
    }

    return event;
  };

  readMessageMetaData(meta) {
    const { historySize } = meta;
    const { onHistorySizeUpdate } = this.handlers;

    if (onHistorySizeUpdate) {
      onHistorySizeUpdate(historySize);
    }
  }

  webViewInitializeHandler = (content = '') => {
    this.request
      .dispatch(EditorEvent.HANDSHAKE, {
        content,
        //history: ...
      })
      .then(this.webViewInitializedHandler);
  };

  webViewInitializedHandler = () => {
    this.initialized = true;

    this.handlers.onInitialized(this);
  };

  webViewLogHandler = (event) => {
    const { onLog } = this.handlers;

    if (!onLog) {
      return;
    }

    onLog(...event.data);
  };

  webViewGlobalErrorHandler = (event) => {
    const { onError } = this.handlers;

    if (!onError) {
      return;
    }

    onError(composeErrorMessage(event));
  };

  onWebViewMessage = (event) => {
    const { nativeEvent } = event;

    this.port.callMessageListeners(nativeEvent);
  };
}

export default EditorCommunication;
