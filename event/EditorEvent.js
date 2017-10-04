export const EditorEvent = {
  INIT: 'initialize',
  HANDSHAKE: 'handshake',
  SET_VALUE: 'setValue',
  GET_VALUE: 'getValue',
  HISTORY_UNDO: 'historyUndo',
  HISTORY_REDO: 'historyRedo',
  HISTORY_CLEAR: 'historyClear',
  HISTORY_SIZE: 'historySize',
  WV_GLOBAL_ERROR: 'wvGlobalError',
  WV_LOG: 'wvLog',
  SCROLL_TO_CURSOR: 'scrollToCursor',
  UPDATE_SETTINGS: 'updateSettings',
};

export const EditorResponseEvent = {
  INIT_COMPLETE: 'initialized',
  GET_VALUE_RESPONSE: 'getValueResponse',
  HISTORY_UNDO_RESPONSE: 'historyUndoResponse',
  HISTORY_REDO_RESPONSE: 'historyRedoResponse',
  HISTORY_SIZE_RESPONSE: 'historySizeResponse',
};

export const getResponseEvent = (eventType) => {
  let responseType;
  switch (eventType) {
    case EditorEvent.HANDSHAKE: {
      responseType = EditorResponseEvent.INIT_COMPLETE;
      break;
    }
    case EditorEvent.GET_VALUE: {
      responseType = EditorResponseEvent.GET_VALUE_RESPONSE;
      break;
    }
    case EditorEvent.HISTORY_UNDO: {
      responseType = EditorResponseEvent.HISTORY_UNDO_RESPONSE;
      break;
    }
    case EditorEvent.HISTORY_REDO: {
      responseType = EditorResponseEvent.HISTORY_REDO_RESPONSE;
      break;
    }
    case EditorEvent.HISTORY_SIZE: {
      responseType = EditorResponseEvent.HISTORY_SIZE_RESPONSE;
      break;
    }
  }
  return responseType;
};

export default EditorEvent;
