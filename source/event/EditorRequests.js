import { EditorEvent } from './EditorEvent';

class EditorRequests {
  constructor(requestFactory) {
    this.requestFactory = requestFactory;
  }

  dispatch = (eventType, data = null) =>
    this.requestFactory(eventType, data).then((event) => event && event.data);

  setValue = (data) => this.dispatch(EditorEvent.SET_VALUE, data);

  getValue = (data) => this.dispatch(EditorEvent.GET_VALUE, data);

  historyUndo = (data) => this.dispatch(EditorEvent.HISTORY_UNDO, data);

  historyRedo = (data) => this.dispatch(EditorEvent.HISTORY_REDO, data);

  historyClear = (data) => this.dispatch(EditorEvent.HISTORY_CLEAR, data);

  historySize = (data) => this.dispatch(EditorEvent.HISTORY_SIZE, data);

  scrollToCursor = (margin) => this.dispatch(EditorEvent.SCROLL_TO_CURSOR, margin);
}

export default EditorRequests;
