import MessagePortDispatcher from '@actualwave/messageport-dispatcher';
import Request from './Request';
import { EditorEvent } from './EditorEvent';
import EditorRequests from './EditorRequests';

export interface WebViewAPIHandlers {
  onInitialized: (api: WebViewAPI) => void;
  onHistorySizeUpdate: (size: unknown) => void;
  onLog: (log: unknown) => void;
  onError: (error: unknown) => void;
}

export interface WebViewRef {
  injectJavaScript: (js: string) => void;
  requestFocus: () => void;
}

const composeErrorMessage = (event: unknown) => {
  const { data } = event as { data: Record<string, unknown> };
  if (data['error']) {
    return data['error'];
  }
  const { message, source, lineno, colno } = data;
  return { name: 'Error', message, fileName: source, lineNumber: lineno, columnNumber: colno };
};

class MessagePortDummy {
  private listeners: Set<(event: unknown) => void>;
  private target: WebViewRef;

  constructor(target: WebViewRef) {
    this.listeners = new Set();
    this.target = target;
  }

  postMessage = (event: unknown) => {
    const eventStr = JSON.stringify(event);
    this.target.injectJavaScript(`(
      (target, data) => {
        const e = new CustomEvent('message');
        e.data = data;
        target.dispatchEvent(e);
      }
    )(window, ${JSON.stringify(eventStr)})`);
  };

  addEventListener = (type: string, listener: (event: unknown) => void) => {
    if (type !== 'message') {
      throw new Error(`MessagePortDummy is intended for single event type and its not "${type}"`);
    }
    this.listeners.add(listener);
  };

  callMessageListeners = (message: unknown) => {
    this.listeners.forEach((listener) => listener(message));
  };
}

class WebViewAPI extends EditorRequests {
  webView: WebViewRef | null = null;
  dispatcher: MessagePortDispatcher | null = null;
  initialized = false;

  private port: MessagePortDummy | null = null;
  private initData: unknown = {};
  private handlers: WebViewAPIHandlers;

  constructor(handlers: WebViewAPIHandlers) {
    const requestFactory = (eventType: string, data: unknown = null, responseEventType = '') =>
      new Request(
        // dispatcher is set in initialize() before any requests are made
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.dispatcher!,
        eventType,
        data,
        responseEventType,
      );

    super(requestFactory);
    this.handlers = handlers;
  }

  initialize(
    webView: WebViewRef,
    { content, settings }: { content?: string; settings?: unknown } = {},
  ) {
    this.initialized = false;
    this.webView = webView;
    this.initData = { content, settings };
    this.port = new MessagePortDummy(webView);
    this.dispatcher = new MessagePortDispatcher(this.port, null, this.preprocessIncomingMessages);

    this.dispatcher.addEventListener(EditorEvent.INITIALIZE, this.webViewInitializeHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_GLOBAL_ERROR, this.webViewGlobalErrorHandler);
    this.dispatcher.addEventListener(EditorEvent.WV_LOG, this.webViewLogHandler);
  }

  private preprocessIncomingMessages = (event: {
    type: string;
    data: unknown;
  }): { type: string; data: unknown } => {
    const { data: eventData } = event;

    if (eventData && typeof eventData === 'object') {
      const { meta, data } = eventData as { meta?: unknown; data?: unknown };
      if (meta) {
        this.readMessageMetaData(meta as Record<string, unknown>);
        return { ...event, data };
      }
    }

    return event;
  };

  private readMessageMetaData(meta: Record<string, unknown>) {
    const { historySize } = meta;
    this.handlers.onHistorySizeUpdate(historySize);
  }

  private webViewInitializeHandler = () => {
    void this.handshake(this.initData).then(this.webViewInitializedHandler);
  };

  private webViewInitializedHandler = () => {
    this.initialized = true;
    this.handlers.onInitialized(this);
  };

  private webViewLogHandler = (event: unknown) => {
    this.handlers.onLog((event as { data: unknown }).data);
  };

  private webViewGlobalErrorHandler = (event: unknown) => {
    this.handlers.onError(composeErrorMessage(event));
  };

  addEventListener = (eventType: string, listener: (event: unknown) => void) =>
    this.dispatcher?.addEventListener(eventType, listener);

  hasEventListener = (eventType: string) => this.dispatcher?.hasEventListener(eventType) ?? false;

  removeEventListener = (eventType: string, listener: (event: unknown) => void) =>
    this.dispatcher?.removeEventListener(eventType, listener);

  dispatchEvent = (eventType: string, data: unknown = null) =>
    this.dispatcher?.dispatchEvent(eventType, data);

  onMessage = (event: unknown) => this.port?.callMessageListeners(event);

  injectJavaScript = (jsCode: string) => this.webView?.injectJavaScript(jsCode);

  requestFocus = () => this.webView?.requestFocus();

  focus = (data?: unknown) => {
    try {
      this.webView?.requestFocus();
    } catch (error) {
      console.error(error);
    }
    return this.sendRequest(EditorEvent.FOCUS, data);
  };
}

export default WebViewAPI;
