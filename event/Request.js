import EditorEvent from './EditorEvent';

class Request {
  constructor(requestFactory) {
    this.dispatch = (eventType, data = null) => {
      return requestFactory(eventType, data)
        .then((event) => (event && event.data));
    };
  }

  setValue = (data) => {
    return this.dispatch(EditorEvent.SET_VALUE, data);
  };
  getValue = (data) => {
    return this.dispatch(EditorEvent.GET_VALUE, data);
  };
  historyUndo = (data) => {
    return this.dispatch(EditorEvent.HISTORY_UNDO, data);
  };
  historyRedo = (data) => {
    return this.dispatch(EditorEvent.HISTORY_REDO, data);
  };
  historyClear = (data) => {
    return this.dispatch(EditorEvent.HISTORY_CLEAR, data);
  };
  historySize = (data) => {
    return this.dispatch(EditorEvent.HISTORY_SIZE, data);
  };
  scrollToCursor = (margin) => {
    return this.dispatch(EditorEvent.SCROLL_TO_CURSOR, margin);
  };
}

export default Request;
