import { EditorEvent } from './EditorEvent';

class EditorRequests {
  constructor(requestFactory) {
    this.requestFactory = requestFactory;
  }

  sendRequest = (eventType, data = null, responseEventType = '') =>
    this.requestFactory(eventType, data, responseEventType).then((event) => event && event.data);

  handshake = (data) => this.sendRequest(EditorEvent.HANDSHAKE, data, EditorEvent.INITIALIZED);

  setValue = (data) => this.sendRequest(EditorEvent.SET_VALUE, data);

  getValue = (data) => this.sendRequest(EditorEvent.GET_VALUE, data);

  resetValue = (data) => this.sendRequest(EditorEvent.RESET_VALUE, data);

  focus = (data) => this.sendRequest(EditorEvent.FOCUS, data);

  getSelection = (data) => this.sendRequest(EditorEvent.GET_SELECTION, data);

  replaceSelection = (data) => this.sendRequest(EditorEvent.REPLACE_SELECTION, data);

  historyUndo = (data) => this.sendRequest(EditorEvent.HISTORY_UNDO, data);

  historyRedo = (data) => this.sendRequest(EditorEvent.HISTORY_REDO, data);

  historyClear = (data) => this.sendRequest(EditorEvent.HISTORY_CLEAR, data);

  historySize = (data) => this.sendRequest(EditorEvent.HISTORY_SIZE, data);

  scrollToCursor = (margin) => this.sendRequest(EditorEvent.SCROLL_TO_CURSOR, margin);

  updateSettings = (settings) => this.sendRequest(EditorEvent.UPDATE_SETTINGS, settings);

  execCommand = (command, ...args) => this.sendRequest(EditorEvent.EXEC_COMMAND, { command, args });
}

export default EditorRequests;
