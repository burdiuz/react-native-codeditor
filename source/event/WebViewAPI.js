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

  // original implementation using WebView.postMessage
  // postMessage = (event) => this.target.postMessage(JSON.stringify(event));

  postMessage = (event) => {
    const eventStr = JSON.stringify(event);
    this.target.injectJavaScript(`(
      (target, data) => {
        const e = new CustomEvent('message');
        e.data = data;
        target.dispatchEvent(e);
      }
    )(window, ${JSON.stringify(eventStr)})`);
  };

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

class WebViewAPI extends EditorRequests {
  webView = null;

  dispatcher = null;

  initialized = false;

  constructor({ onInitialized, onHistorySizeUpdate, onLog, onError }) {
    const requiestFactory = (eventType, data = null, responseEventType = '') =>
      new Request(this.dispatcher, eventType, data, responseEventType);

    super(requiestFactory);

    this.handlers = { onInitialized, onHistorySizeUpdate, onLog, onError };
  }

  initialize(webView, { content, history, settings } = {}) {
    this.initialized = false;
    this.webView = webView;
    this.initData = { content, history, settings };
    this.port = new MessagePortDummy(webView);
    this.dispatcher = new MessagePortDispatcher(this.port, null, this.preprocessIncomingMessages);

    this.dispatcher.addEventListener(EditorEvent.INITIALIZE, this.webViewInitializeHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_GLOBAL_ERROR, this.webViewGlobalErrorHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_LOG, this.webViewLogHandler);
  }

  /**
   * @private
   */
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

  /**
   * @private
   */
  readMessageMetaData(meta) {
    const { historySize } = meta;
    const { onHistorySizeUpdate } = this.handlers;

    if (onHistorySizeUpdate) {
      onHistorySizeUpdate(historySize);
    }
  }

  /**
   * @private
   */
  webViewInitializeHandler = () => {
    this.handshake(this.initData).then(this.webViewInitializedHandler);
  };

  /**
   * @private
   */
  webViewInitializedHandler = () => {
    this.initialized = true;
    this.initData = {};

    this.handlers.onInitialized(this);
  };

  /**
   * @private
   */
  webViewLogHandler = (event) => {
    const { onLog } = this.handlers;

    if (!onLog) {
      return;
    }

    onLog(...event.data);
  };

  /**
   * @private
   */
  webViewGlobalErrorHandler = (event) => {
    const { onError } = this.handlers;

    if (!onError) {
      return;
    }

    onError(composeErrorMessage(event));
  };

  addEventListener = (eventType, listener) => this.dispatcher.addEventListener(eventType, listener);

  hasEventListener = (eventType) => this.dispatcher.hasEventListener(eventType);

  removeEventListener = (eventType, listener) =>
    this.dispatcher.removeEventListener(eventType, listener);

  dispatchEvent = (event, data = null) => this.dispatcher.dispatchEvent(event, data);

  onMessage = (event) => this.port.callMessageListeners(event);
}

export default WebViewAPI;
