import { EditorEvent } from './EditorEvent';

class EditorRequests {
  constructor(requestFactory) {
    this.requestFactory = requestFactory;
  }

  sendRequest = (eventType, data = null, responseEventType = '') =>
    this.requestFactory(eventType, data, responseEventType).then((event) => event && event.data);

  handshake = (data) => this.sendRequest(EditorEvent.HANDSHAKE, data, EditorEvent.INITIALIZED);

  setViewport = ({ maximumScale, minimumScale, intialScale, userScalable, viewportWidth }) =>
    this.sendRequest(EditorEvent.SET_VIEWPORT, {
      maximumScale,
      minimumScale,
      intialScale,
      userScalable,
      viewportWidth,
    });

  setOption = (option, value) => this.sendRequest(EditorEvent.SET_OPTION, { option, value });

  getOption = (option) => this.sendRequest(EditorEvent.GET_OPTION, option);

  setValue = (data) => this.sendRequest(EditorEvent.SET_VALUE, data);

  getValue = (data) => this.sendRequest(EditorEvent.GET_VALUE, data);

  resetValue = (data) => this.sendRequest(EditorEvent.RESET_VALUE, data);

  focus = (data) => this.sendRequest(EditorEvent.FOCUS, data);

  getCursor = (data) => this.sendRequest(EditorEvent.GET_CURSOR, data);

  setCursor = (lineOrIndex, ch, options) =>
    this.sendRequest(
      EditorEvent.SET_CURSOR,
      ch === undefined ? lineOrIndex : { line: lineOrIndex, ch, options },
    );

  getSelection = (data) => this.sendRequest(EditorEvent.GET_SELECTION, data);

  setSelection = (anchor, head, options) =>
    this.sendRequest(EditorEvent.SET_SELECTION, { anchor, head, options });

  replaceSelection = (data) => this.sendRequest(EditorEvent.REPLACE_SELECTION, data);

  cancelSelection = () => this.sendRequest(EditorEvent.CANCEL_SELECTION);

  historyRead = () => this.sendRequest(EditorEvent.HISTORY_READ);

  historyWrite = (data) => this.sendRequest(EditorEvent.HISTORY_WRITE, data);

  historyUndo = (data) => this.sendRequest(EditorEvent.HISTORY_UNDO, data);

  historyRedo = (data) => this.sendRequest(EditorEvent.HISTORY_REDO, data);

  historyClear = (data) => this.sendRequest(EditorEvent.HISTORY_CLEAR, data);

  historySize = (data) => this.sendRequest(EditorEvent.HISTORY_SIZE, data);

  scrollToCursor = (margin) => this.sendRequest(EditorEvent.SCROLL_TO_CURSOR, margin);

  updateSettings = (settings) => this.sendRequest(EditorEvent.UPDATE_SETTINGS, settings);

  execCommand = (command, ...args) => this.sendRequest(EditorEvent.EXEC_COMMAND, { command, args });
}

export default EditorRequests;
