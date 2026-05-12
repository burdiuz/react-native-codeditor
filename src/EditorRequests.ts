import { EditorEvent } from './EditorEvent';

export type RequestFactory = (
  eventType: string,
  data?: unknown,
  responseEventType?: string,
) => { then: (handler: (value: unknown) => unknown) => Promise<unknown> };

export interface ViewportSettings {
  maximumScale?: number;
  minimumScale?: number;
  intialScale?: number;
  userScalable?: boolean;
  viewportWidth?: string | number;
}

export interface CursorPosition {
  line: number;
  ch: number;
  options?: unknown;
}

class EditorRequests {
  protected requestFactory: RequestFactory;

  constructor(requestFactory: RequestFactory) {
    this.requestFactory = requestFactory;
  }

  sendRequest = (eventType: string, data: unknown = null, responseEventType = '') =>
    this.requestFactory(eventType, data, responseEventType).then(
      (event: unknown) => (event as { data: unknown } | null)?.data,
    );

  handshake = (data: unknown) =>
    this.sendRequest(EditorEvent.HANDSHAKE, data, EditorEvent.INITIALIZED);

  setViewport = ({
    maximumScale,
    minimumScale,
    intialScale,
    userScalable,
    viewportWidth,
  }: ViewportSettings) =>
    this.sendRequest(EditorEvent.SET_VIEWPORT, {
      maximumScale,
      minimumScale,
      intialScale,
      userScalable,
      viewportWidth,
    });

  setOption = (option: string, value: unknown) =>
    this.sendRequest(EditorEvent.SET_OPTION, { option, value });

  getOption = (option: string) => this.sendRequest(EditorEvent.GET_OPTION, option);

  setValue = (data: string) => this.sendRequest(EditorEvent.SET_VALUE, data);

  getValue = (data?: unknown) => this.sendRequest(EditorEvent.GET_VALUE, data);

  resetValue = (data?: string) => this.sendRequest(EditorEvent.RESET_VALUE, data);

  focus = (data?: unknown) => this.sendRequest(EditorEvent.FOCUS, data);

  getCursor = (data?: unknown) => this.sendRequest(EditorEvent.GET_CURSOR, data);

  setCursor = (lineOrIndex: number | CursorPosition, ch?: number, options?: unknown) =>
    this.sendRequest(
      EditorEvent.SET_CURSOR,
      ch === undefined ? lineOrIndex : { line: lineOrIndex, ch, options },
    );

  getSelection = (data?: unknown) => this.sendRequest(EditorEvent.GET_SELECTION, data);

  setSelection = (anchor: unknown, head: unknown, options?: unknown) =>
    this.sendRequest(EditorEvent.SET_SELECTION, { anchor, head, options });

  replaceSelection = (data: string) => this.sendRequest(EditorEvent.REPLACE_SELECTION, data);

  cancelSelection = () => this.sendRequest(EditorEvent.CANCEL_SELECTION);

  historyRead = () => this.sendRequest(EditorEvent.HISTORY_READ);

  historyWrite = (data: unknown) => this.sendRequest(EditorEvent.HISTORY_WRITE, data);

  historyUndo = (data?: unknown) => this.sendRequest(EditorEvent.HISTORY_UNDO, data);

  historyRedo = (data?: unknown) => this.sendRequest(EditorEvent.HISTORY_REDO, data);

  historyClear = (data?: unknown) => this.sendRequest(EditorEvent.HISTORY_CLEAR, data);

  historySize = (data?: unknown) => this.sendRequest(EditorEvent.HISTORY_SIZE, data);

  scrollToCursor = (margin?: number) => this.sendRequest(EditorEvent.SCROLL_TO_CURSOR, margin);

  updateSettings = (settings: Record<string, unknown>) =>
    this.sendRequest(EditorEvent.UPDATE_SETTINGS, settings);

  execCommand = (command: string, ...args: unknown[]) =>
    this.sendRequest(EditorEvent.EXEC_COMMAND, { command, args });
}

export default EditorRequests;
